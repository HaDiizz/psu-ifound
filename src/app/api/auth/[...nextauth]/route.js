import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { extractEmail } from "@/utils/emailValidation";
import axios from "axios";
import User from "@/models/user";
import { findOneUserByEmail } from "@/utils/services";

export const dynamic = "force-dynamic";

export const authOptions = {
  session: {
    jwt: true,
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60,
    // updateAge: 24 * 60 * 60,
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      async profile(profile) {
        try {
          let response;
          const headers = {
            credential: process.env.PSU_OPEN_API_SECRET_KEY,
          };
          const data = await extractEmail(profile?.email);
          if (data) {
            const { role, username } = await data;
            if (role === "student") {
              response = await axios.get(
                `${process.env.PSU_OPEN_API_URL}/regist/Student/${username}`,
                { headers }
              );
            }
            // else if (role === "personnel") {
            //   response = await axios.get(
            //     `${process.env.PSU_OPEN_API_URL}/Personnel/GetStaffDetailsByStaffNameOrSurName/${given_name} ${family_name}`,
            //     { headers }
            //   );
            // }
          }
          return {
            id: profile.sub,
            username: profile.given_name,
            fullName: profile.name,
            email: profile.email,
            picture: profile.picture,
            role: profile.role ?? "user",
            studentId: response?.data[0]?.studentId || "",
            titleName: response?.data[0]?.titleName || "",
            yearStatus: response?.data[0]?.yearStatus || "",
            majorNameThai: response?.data[0]?.majorNameThai || "",
            deptNameThai: response?.data[0]?.deptNameThai || "",
            campusNameThai: response?.data[0]?.campusNameThai || "",
            studyLevelName: response?.data[0]?.studyLevelName || "",
          };
        } catch (error) {
          return {
            id: profile.sub,
            username: profile.given_name,
            fullName: profile.name,
            email: profile.email,
            picture: profile.picture,
            role: profile.role ?? "user",
            studentId: "",
            titleName: "",
            yearStatus: "",
            majorNameThai: "",
            deptNameThai: "",
            campusNameThai: "",
            studyLevelName: "",
          };
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      const isUserExits = await User.findOne({ email: user.email });
      // if (isUserExits && isUserExits.status === "INACTIVE") {
      //   return false;
      // }
      if (!isUserExits) {
        await User.create({
          sub: user.id,
          username: user.username,
          fullName: user.fullName,
          email: user.email,
          picture: user.picture,
          role: user.role ?? "user",
          studentId: user.studentId || "",
          titleName: user.titleName || "",
          yearStatus: user.yearStatus || "",
          majorNameThai: user.majorNameThai || "",
          deptNameThai: user.deptNameThai || "",
          campusNameThai: user.campusNameThai || "",
          studyLevelName: user.studyLevelName || "",
        });
      }
      user.accessToken = account.access_token;
      user.expires_at = account.expires_at;
      return true;
    },
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update") {
        return { ...token, ...session.user };
      }
      if (user) {
        return { ...token, ...user };
      }
      return { ...token };
    },
    async session({ session, token }) {
      if (token) {
        session.user = token.user || token;
      }
      let sessionUser = await findOneUserByEmail({ email: session.user.email });
      if (sessionUser) {
        session.user = sessionUser.user;
        session.user.id = sessionUser.user._id;
      }
      if (session.user) return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
