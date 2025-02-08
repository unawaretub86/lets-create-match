"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function MatchForm() {
  const [formData, setFormData] = useState({
    creatorName: "",
    creatorPhone: "",
    creatorEmail: "",
    numberPlayers: 1,
    registeredPlayers: 0,
    confirmedPlayers: 0,
    location: "",
    date: "",
    time: "",
    duration: 60, // Duración por defecto en minutos
    isFree: false,
    pricePerPerson: 0,
    accountType: "",
    accountNumber: "",
    additionalInfo: "",
    mapLink: "",
  });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/matches", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      const responseData = await response.json();
      router.push(`/matches/${responseData.id}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-md mx-auto p-4 bg-white shadow-md rounded-lg"
    >
      <h1 className="text-2xl font-bold text-center mb-6 text-black">
        Crear Partido
      </h1>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Nombre del Creador"
          value={formData.creatorName}
          onChange={(e) =>
            setFormData({ ...formData, creatorName: e.target.value })
          }
          className="text-black w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Teléfono del Creador"
          value={formData.creatorPhone}
          onChange={(e) =>
            setFormData({ ...formData, creatorPhone: e.target.value })
          }
          className="text-black w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          placeholder="Correo del Creador"
          value={formData.creatorEmail}
          onChange={(e) =>
            setFormData({ ...formData, creatorEmail: e.target.value })
          }
          className="text-black w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="number"
          placeholder="Número de Jugadores"
          value={formData.numberPlayers === 0 ? "" : formData.numberPlayers}
          min={0}
          inputMode="numeric"
          pattern="[0-9]*"
          onChange={(e) => {
            const value = e.target.value;
            setFormData({
              ...formData,
              numberPlayers: value === "" ? "" : parseInt(value),
            });
          }}
          className="text-black w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          placeholder="Ubicación"
          value={formData.location}
          onChange={(e) =>
            setFormData({ ...formData, location: e.target.value })
          }
          className="text-black w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="date"
          placeholder="Fecha"
          value={formData.date ? formData.date : ""}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          className="text-black w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="time"
          value={formData.time}
          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
          className="text-black w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="number"
          placeholder="Duración (minutos)"
          value={formData.duration}
          onChange={(e) =>
            setFormData({ ...formData, duration: parseInt(e.target.value) })
          }
          className="text-black w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={formData.isFree}
            onChange={(e) =>
              setFormData({ ...formData, isFree: e.target.checked })
            }
            className="text-black w-5 h-5 border border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="text-black">¿El partido es gratis?</span>
        </label>
        {!formData.isFree && (
          <>
            <input
              type="number"
              placeholder="Precio por persona"
              value={
                formData.pricePerPerson === 0 || formData.pricePerPerson === ""
                  ? ""
                  : formData.pricePerPerson
              }
              onChange={(e) => {
                const value = e.target.value;
                setFormData({
                  ...formData,
                  pricePerPerson: value === "" ? "" : parseFloat(value),
                });
              }}
              className="text-black w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="text"
              placeholder="Tipo de cuenta (ej: Ahorros, Corriente)"
              value={formData.accountType}
              onChange={(e) =>
                setFormData({ ...formData, accountType: e.target.value })
              }
              className="text-black w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Número de cuenta"
              value={formData.accountNumber}
              onChange={(e) =>
                setFormData({ ...formData, accountNumber: e.target.value })
              }
              className="text-black w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </>
        )}
        <input
          type="text"
          placeholder="Información adicional"
          value={formData.additionalInfo}
          onChange={(e) =>
            setFormData({ ...formData, additionalInfo: e.target.value })
          }
          className="text-black w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Enlace a Google Maps o Waze"
          value={formData.mapLink}
          onChange={(e) =>
            setFormData({ ...formData, mapLink: e.target.value })
          }
          className="text-black w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Crear Partido
      </button>
    </form>
  );
}
