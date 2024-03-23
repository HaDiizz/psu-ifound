import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/mongoClient";
import { extractEmail } from "@/utils/emailValidation";
import axios from "axios";
import User from "@/models/user";

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  session: {
    jwt: true,
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
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
          const data = await extractEmail(profile.email);
          if (data) {
            const { role, username } = await data;
            if (role === "student") {
              response = await axios.get(
                `${process.env.PSU_OPEN_API_URL}/regist/Student/${username}`,
                { headers }
              );
            } else if (role === "personnel") {
              response = await axios.get(
                `${process.env.PSU_OPEN_API_URL}/Personnel/GetStaffDetailsByStaffNameOrSurName/${given_name} ${family_name}`,
                { headers }
              );
            }
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
          if (error.response.status === 404) {
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
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      const checkDuplicateEmail = await User.find({ email: user.email });
      if (checkDuplicateEmail.length > 1) return false;
      user.accessToken = account.access_token;
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        return { ...token, ...user };
      }
      return { ...token };
    },
    async session({ session, token }) {
      if (token) {
        session.user = token.user || token;
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
