import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function MatchDetail({ params }) {
  const match = await prisma.match.findUnique({
    where: { id: parseInt(params.id) },
    include: { participants: true },
  });

  if (!match) {
    return <div>Partido no encontrado</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Detalle del Partido</h1>
      <p>Equipo A: {match.teamA}</p>
      <p>Equipo B: {match.teamB}</p>
      <p>Lugar: {match.location}</p>
      <p>Fecha: {match.date}</p>
      <p>Hora: {match.time}</p>
      {/* Más detalles del partido */}
    </div>
  );
}