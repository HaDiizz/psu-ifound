"use client";
import { campusData } from "@/utils/constants";
import { Button, User, Link } from "@nextui-org/react";

const ModerationCardItem = ({ item }) => {
  return (
    <div className="col-span-6 rounded overflow-hidden shadow-lg border border-gray-200 dark:bg-slate-900/50 dark:border-slate-800">
      <div className="p-5 flex flex-col gap-y-3">
        <table className="table-auto text-small border-separate border-spacing-y-3">
          <tbody>
            <tr>
              <td>Post</td>
              <td className="text-pretty">{item.title}</td>
            </tr>
            <tr>
              <td>Total</td>
              <td>{item.totalReports}</td>
            </tr>
            <tr>
              <td>Campus</td>
              <td>
                {campusData
                  .find((campus) => campus.campId === item.campId)
                  .campNameEng.split("Prince of Songkla University ")[1] || "-"}
              </td>
            </tr>
            <tr>
              <td>Owner</td>
              <td>
                <User
                  description={item.owner.email}
                  name={item.owner.fullName}
                  avatarProps={{
                    size: "sm",
                    src: `${item.owner.picture}`,
                  }}
                >
                  {item.owner.username}
                </User>
              </td>
            </tr>
          </tbody>
        </table>
        <Button href={`/admin/issue/post/${item._id}`} as={Link}>
          See more
        </Button>
      </div>
    </div>
  );
};

export default ModerationCardItem;
