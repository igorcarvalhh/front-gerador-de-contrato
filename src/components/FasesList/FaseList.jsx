import { useState } from "react";
import { PiDotsThreeOutlineDuotone } from "react-icons/pi";
import FaseItem from "../FasesItem/FaseItem";

export default function FaseList({ fases }) {
  console.log(fases);

  if (!fases) {
    return <></>;
  }

  return (
    <ul className="fases-list">
      {fases.map((fase) => (
        <FaseItem fase={fase} />
      ))}
    </ul>
  );
}
