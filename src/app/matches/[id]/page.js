"use client";

import { useParams } from "next/navigation";

import ParticipantForm from "@/components/ParticipantForm";

export default function MatchDetail() {
  const { id } = useParams(); // Obtener el ID del partido de la URL
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Detalle del Partido</h1>

      <ParticipantForm matchId={id} />
      {/* <p>Lugar: {match.location}</p> */}
      {/* <p>Fecha: {match.date}</p> */}
      {/* <p>Hora: {match.time}</p> */}
      {/* Más detalles del partido */}
    </div>
  );
}