import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();

    const { matchId, name, phone, email, paymentReceiptUrl } = body;

    const match = await prisma.match.findUnique({
      where: { id: matchId },
    });

    if (!match) {
      return response.json({ error: "El partido no existe" }, { status: 404 });
    }

    if (match.confirmedPlayers >= match.numberPlayers) {
      return response.json({ error: "El partido esta lleno" }, { status: 409 });
    }

    const participant = await prisma.participant.create({
      data: {
        matchId,
        name,
        phone,
        email,
        paymentReceiptUrl,
      },
    });

    match.registeredPlayers += 1;

    // Actualizar partido en la base de datos
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/matches`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          match,
        }),
      }
    );

    if (!response.ok) {
      return Response.json(
        { error: "Error actualizando el partido" },
        { status: 500 }
      );
    }

    return Response.json(
      {
        message: "Participante creado y partido actualizado correctamente",
        match,
        participant,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creando el participant:", error);
    return Response.json(
      { error: "Error procesando la solicitud" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect(); // Cerrar la conexión con la base de datos
  }
}
