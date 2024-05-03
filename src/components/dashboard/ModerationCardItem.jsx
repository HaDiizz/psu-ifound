"use client";
import { capitalize } from "@/utils/capitalize";
import { campusData } from "@/utils/constants";
import { Button, User, Link } from "@nextui-org/react";

const ModerationCardItem = ({ item, moderationType }) => {
  return (
    <>
      {item?.deleted ? (
        <div className="col-span-6 rounded overflow-hidden shadow-lg border border-gray-200 dark:bg-slate-900/50 dark:border-slate-800">
          <div className="p-5 flex flex-col justify-between h-full">
            <div className="h-full flex justify-center items-center">
              <div className="flex flex-col justify-center items-center gap-y-3">
                <span className="text-red-500 font-bold text-2xl">DELETED</span>
                <span className="text-small text-default-400">
                  There are {item.totalReports} issue reports
                </span>
              </div>
            </div>
            <div className="mt-5">
              <Button
                className="w-full"
                href={`/admin/issue/${moderationType}/${item._id}`}
                as={Link}
              >
                See more
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="col-span-6 rounded overflow-hidden shadow-lg border border-gray-200 dark:bg-slate-900/50 dark:border-slate-800">
          <div className="p-5 flex flex-col justify-between h-full">
            <div>
              <table className="table-auto text-small border-separate border-spacing-y-3 border-spacing-x-3">
                <tbody>
                  <tr>
                    <td>{capitalize(moderationType)}</td>
                    <td className="text-pretty w-[18rem] md:w-[30rem]">
                      {item.title.length > 60
                        ? `${item.title.slice(0, 60)}...`
                        : item.title}
                    </td>
                  </tr>
                  <tr>
                    <td>Total</td>
                    <td>
                      {item.totalReports}
                      {item.totalReports === item.totalResolved && (
                        <span className="text-green-500 font-bold pl-5">
                          ( All issues have been resolved.)
                        </span>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>Statuses</td>
                    <td>
                      <div className="flex flex-col laptop:flex-row gap-8">
                        <table>
                          <tbody>
                            <tr>
                              <td className="py-2 w-[8rem]">Pending</td>
                              <td className="py-2">{item.totalPending}</td>
                            </tr>
                            <tr>
                              <td className="py-2 w-[8rem]">In Progress</td>
                              <td className="py-2">{item.totalInProgress}</td>
                            </tr>
                          </tbody>
                        </table>
                        <table>
                          <tbody>
                            <tr>
                              <td className="py-2 w-[8rem]">Rejected</td>
                              <td className="py-2">{item.totalRejected}</td>
                            </tr>
                            <tr>
                              <td className="py-2 w-[8rem]">Resolved</td>
                              <td className="py-2">{item.totalResolved}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>

                  {moderationType !== "comment" ? (
                    <tr>
                      <td>Campus</td>
                      <td>
                        {campusData
                          .find((campus) => campus?.campId === item?.campId)
                          ?.campNameEng.split(
                            "Prince of Songkla University "
                          )[1] || "-"}
                      </td>
                    </tr>
                  ) : null}
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
            </div>
            <div className="mt-5 flex">
              <Button
                href={`/admin/issue/${moderationType}/${item._id}`}
                as={Link}
                className="w-full"
              >
                See more
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModerationCardItem;
