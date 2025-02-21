import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ParticipantForm({ matchId, onSubmitSuccess  }) {
  const [formData, setFormData] = useState({
    matchId: matchId,
    name: "",
    phone: "",
    email: "",
    paymentReceiptUrl: "",
    role: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/participants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      setFormData({
        matchId: matchId,
        name: "",
        phone: "",
        email: "",
        paymentReceiptUrl: "",
        role: "",
      });

      // Call the success callback
      if (onSubmitSuccess) {
        onSubmitSuccess();
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Nombre del Participante"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className="w-full p-2 border rounded text-black"
      />
      <input
        type="text"
        placeholder="Teléfono del Participante"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        className="w-full p-2 border rounded"
      />
      <input
        type="email"
        placeholder="Correo del Participante"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        className="w-full p-2 border rounded"
      />
      <select
        value={formData.role}
        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
        className="w-full p-2 border rounded text-black"
      >
        <option value="">Seleccionar Posición</option>
        <option value="portero">Portero</option>
        <option value="jugador">Jugador</option>
      </select>
      {/* <input
        type="text"
        placeholder="URL del Comprobante de Pago"
        value={formData.paymentReceiptUrl}
        onChange={(e) =>
          setFormData({ ...formData, paymentReceiptUrl: e.target.value })
        }
        className="w-full p-2 border rounded"
      /> */}
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Inscribirse
      </button>
    </form>
  );
}
