import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

export async function GET({ params }) {
  const { id } = params;

  try {
    const match = await prisma.match.find((match) => match.id === id);

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

    // hay que hacer una Validación de datos

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

export async function PATCH(req) {
  try {
    const body = await req.json();
    const { match } = body;

    if (!match.id) {
      return Response.json(
        { error: "matchId es obligatorio" },
        { status: 400 }
      );
    }

    const updatedMatch = await prisma.match.update({
      where: { id: match.id },
      data: match,
    });

    return Response.json(
      { message: "Match actualizado correctamente", updatedMatch },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error actualizando el match:", error);
    return Response.json(
      { error: "Error procesando la solicitud" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
