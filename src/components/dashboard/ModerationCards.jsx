"use client";
import ModerationCardItem from "./ModerationCardItem";

const ModerationCards = ({ data }) => {
  return (
    <>
      <div className="grid md:grid-cols-12 grid-cols-1 gap-10 pb-[7rem]">
        {data?.length > 0 ? (
          data.map((item) => <ModerationCardItem key={item._id} item={item} />)
        ) : (
          <span className="text-default-400 text-lg text-center col-span-1 md:col-span-12">
            - No data -
          </span>
        )}
      </div>
    </>
  );
};

export default ModerationCards;
