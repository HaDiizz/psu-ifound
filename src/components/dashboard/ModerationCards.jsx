"use client";
import ModerationCardItem from "./ModerationCardItem";

const ModerationCards = ({ data }) => {
  return (
    <>
      <div className="grid md:grid-cols-12 grid-cols-1 gap-10 pb-10">
        {Array.from({ length: 6 }, (_, index) => (
          <ModerationCardItem key={index} />
        ))}
      </div>
    </>
  );
};

export default ModerationCards;
