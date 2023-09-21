import { useState } from "react";
import { PiDotsThreeOutlineDuotone } from "react-icons/pi";
import FaseItem from "../FasesItem/FaseItem";
import ParticipanteItem from "../ParticipanteItem/ParticipanteItem";

export default function ParticipanteList({ participantes }) {
  console.log(participantes);

  if (!participantes) {
    return <></>;
  }

  return (
    <ul className="fases-list">
      {participantes.map((participante) => (
        <ParticipanteItem participante={participante} />
      ))}
    </ul>
  );
}
