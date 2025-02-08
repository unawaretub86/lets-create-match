"use client";

import { useParams } from "next/navigation";

import ParticipantForm from "@/components/ParticipantForm";

async function getMatch(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/matches/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) return null;

  return res.json();
}

export async function generateMetadata({ params }) {
  const match = await getMatch(params.id);

  if (!match) return { title: "Partido no encontrado" };

  return { title: `Partido en ${match.location} - ${match.date}` };
}

export default async function MatchDetailPage({ params }) {
  const match = await getMatch(params.id);
  if (!match) return notFound();

  return <MatchDetail match={match} matchId={params.id} />;
}

// Componente puro sin async (Ahora es Client-Friendly)
function MatchDetail({ match, matchId }) {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Detalle del Partido</h1>
      <ParticipantForm matchId={matchId} /> {/* Este sigue siendo un Client Component */}
      <p>Lugar: {match.location}</p>
      <p>Fecha: {match.date}</p>
      <p>Hora: {match.time}</p>
    </div>
  );
}