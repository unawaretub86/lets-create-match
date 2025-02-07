import ParticipantForm from "@/components/ParticipantForm";

export default async function MatchDetail() {

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Detalle del Partido</h1>

      <ParticipantForm />
      {/* <p>Lugar: {match.location}</p> */}
      {/* <p>Fecha: {match.date}</p> */}
      {/* <p>Hora: {match.time}</p> */}
      {/* Más detalles del partido */}
    </div>
  );
}