import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const body = await req.json();
      const {
        creatorName,
        creatorPhone,
        creatorEmail,
        players,
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

    // Validación simple
    // if (!players || !pricePerPerson) {
    //   console.error("Faltan datos requeridos");
    //   return Response.json({ error: "Faltan datos requeridos" }, { status: 400 });
    // }

    const id = uuidv4();

    // Crear un nuevo "match" en la base de datos usando Prisma
    const match = await prisma.match.create({
      data: {
        id,
        creatorName,
        creatorPhone,
        creatorEmail,
        players,
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

    return Response.json({ message: "Match creado correctamente", id, match }, { status: 200 });
  } catch (error) {
    console.error("Error creando el match:", error);
    return Response.json({ error: "Error procesando la solicitud" }, { status: 500 });
  } finally {
    await prisma.$disconnect(); // Cerrar la conexión con la base de datos
  }
}
