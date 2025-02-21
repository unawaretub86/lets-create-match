import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

export async function GET(req, { params }) {
  const { id } = params;

  try {
    const match = await prisma.match.find((match) => match.id === id, log);

    if (!match) {
      return Response.json(
        { message: "Partido no encontrado" },
        { status: 404 }
      );
    }

    return Response.json(match, { status: 200 });
  } catch (error) {
    console.error("Error obteniendo el match:", error);
    return Response.json(
      { error: "Error procesando la solicitud" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      creatorName,
      creatorPhone,
      creatorEmail,
      numberPlayers,
      registeredPlayers,
      confirmedPlayers,
      location,
      date,
      time,
      duration,
      isFree,
      pricePerPerson,
      accountType,
      accountNumber,
      additionalInfo,
      mapLink,
    } = body;

    const id = uuidv4();

    const match = await prisma.match.create({
      data: {
        id,
        creatorName,
        creatorPhone,
        creatorEmail,
        numberPlayers,
        registeredPlayers,
        confirmedPlayers,
        location,
        date: new Date(date),
        time,
        duration,
        isFree,
        pricePerPerson,
        accountType,
        accountNumber,
        additionalInfo,
        mapLink,
      },
    });

    const participant = {
      matchId: match.id,
      name: creatorName,
      phone: creatorPhone,
      email: creatorEmail,
      paymentReceiptUrl: "",
      isConfirmed: true,
      role: "jugador",
    }

    // Crear participante del creador del partido
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/participants`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          participant,
        ),
      }
    );

    if (!response.ok) {
      return Response.json(
        { error: "Error creando participante" },
        { status: 500 }
      );
    }

    return Response.json(
      { message: "Match creado correctamente", id, match },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creando el match:", error);
    return Response.json(
      { error: "Error procesando la solicitud" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect(); // Cerrar la conexión con la base de datos
  }
}
