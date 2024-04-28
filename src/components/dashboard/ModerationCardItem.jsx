"use client";
import { Button, User } from "@nextui-org/react";

const ModerationCardItem = ({ item }) => {
  return (
    <div className="col-span-6 rounded overflow-hidden shadow-lg border border-gray-200 dark:bg-slate-900/50 dark:border-slate-800">
      <div className="p-5 flex flex-col gap-y-3">
        <table className="table-auto text-small border-separate border-spacing-y-3">
          <tbody>
            <tr>
              <td>Post</td>
              <td className="text-pretty">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id,
                doloribus?
              </td>
            </tr>
            <tr>
              <td>Total</td>
              <td>14</td>
            </tr>
            <tr>
              <td>Campus</td>
              <td>Hat Yai</td>
            </tr>
            <tr>
              <td>Reported By</td>
              <td>
                <User
                  description={"test@email.com"}
                  name={"Nattapol Singhad"}
                  avatarProps={{
                    size: "sm",
                  }}
                >
                  {"Dis Nattapol"}
                </User>
              </td>
            </tr>
          </tbody>
        </table>
        <Button>See more</Button>
      </div>
    </div>
  );
};

export default ModerationCardItem;
