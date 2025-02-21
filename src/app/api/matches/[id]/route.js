import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(req, { params }) {
  try {
    const { id } = await params;

    if (!id) {
      return Response.json({ error: "Match ID is required" }, { status: 400 });
    }

    const match = await prisma.match.findUnique({
      where: { id: id },
    });

    if (!match) {
      return Response.json({ error: "Match not found" }, { status: 404 });
    }

    return Response.json(match);
  } catch (error) {
    console.error("Error fetching match:", error);
    return Response.json({ error: "Error processing request" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function PATCH(req, { params }) {
  try {
    const { id } = await params;

    const body = await req.json();
    const { match } = body;

    if (!id) {
      return Response.json(
        { error: "matchId es obligatorio" },
        { status: 400 }
      );
    }

    const updatedMatch = await prisma.match.update({
      where: { id: id },
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
