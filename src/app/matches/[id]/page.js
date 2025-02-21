"use client";

import ParticipantForm from "@/components/ParticipantForm";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function MatchDetail() {
  const { id } = useParams();
  
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const matchDetails = useGetMatch(id, refreshTrigger);
  const participants = useGetParticipants(id, refreshTrigger);

  const handleFormSubmitSuccess = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  // Renderizar los detalles del partido
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Detalle del Partido</h1>
      {matchDetails ? (
        <>
          <p>Lugar: {matchDetails.location}</p>
          <p>Fecha: {matchDetails.date}</p>
          <p>Hora: {matchDetails.time}</p>
          <p>Jugadores registrados: {matchDetails.registeredPlayers}</p>
          <p>Jugadores confirmados: {matchDetails.confirmedPlayers}</p>
          <p>Hora: {matchDetails.time}</p>
          <p>Duracion: {matchDetails.duration}</p>
          <p>Link Ubicacion: {matchDetails.mapLink}</p>

          {/* Participants Table */}
          <div className="mt-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Participantes</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300 text-black">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-2 px-4 border-b">Nombre</th>
                    <th className="py-2 px-4 border-b">Estado</th>
                    <th className="py-2 px-4 border-b">Posición</th>
                    <th className="py-2 px-4 border-b">Teléfono</th>
                    <th className="py-2 px-4 border-b">Comprobante</th>
                  </tr>
                </thead>
                <tbody>
                  {participants && participants.map((participant) => (
                    <tr key={participant.id} className="hover:bg-gray-50 text-black">
                      <td className="py-2 px-4 border-b">{participant.name}</td>
                      <td className="py-2 px-4 border-b">{participant.status}</td>
                      <td className="py-2 px-4 border-b">{participant.role}</td>
                      <td className="py-2 px-4 border-b">{participant.phone}</td>
                      <td className="py-2 px-4 border-b">
                        {participant.paymentReceiptUrl ? (
                          <span className="text-green-500">Confirmado</span>
                        ) : (
                          <div className="flex items-center space-x-2">
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleImageUpload(e, participant.id)}
                              className="hidden"
                              id={`upload-${participant.id}`}
                            />
                            <label
                              htmlFor={`upload-${participant.id}`}
                              className="bg-blue-500 text-white px-3 py-1 rounded cursor-pointer hover:bg-blue-600"
                            >
                              Subir Comprobante
                            </label>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <ParticipantForm 
            matchId={matchDetails.id} 
            onSubmitSuccess={handleFormSubmitSuccess}
          />
        </>
      ) : (
        <p>No se encontraron detalles del partido.</p>
      )}
    </div>
  );
}

function useGetParticipants(id, refreshTrigger) {
  const [participants, setParticipants] = useState(null);

  useEffect(() => {
    async function fetchMatch() {
      if (!id) return;

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/participants/${id}`
        );

        if (!res.ok) {
          throw new Error("No se pudo obtener los participantes");
        }

        const data = await res.json();
        setParticipants(data);
      } catch (err) {
        console.error("Error obteniendo participantes:", err);

        return;
      }
    }

    fetchMatch();
  }, [id, refreshTrigger]);

  return participants;
}

function useGetMatch(id, refreshTrigger) {
  const [matchDetails, setMatchDetails] = useState(null);

  useEffect(() => {
    async function fetchParticipant() {
      if (!id) return;

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/matches/${id}`
        );

        if (!res.ok) {
          throw new Error("No se pudo obtener el partido");
        }

        const data = await res.json();
        setMatchDetails(data);
      } catch (err) {
        console.error("Error obteniendo partido:", err);
        return;
      }
    }

    fetchParticipant();
  }, [id, refreshTrigger]);

  return matchDetails;
}
