import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(req, { params }) {
  try {
    const { id } = await params;

    if (!id) {
      return Response.json({ error: "Match ID is required" }, { status: 400 });
    }
    const participants = await prisma.participant.findMany({
      where: { matchId: id },
    });

    if (!participants) {
      return Response.json({ error: "Match not found" }, { status: 404 });
    }

    return Response.json(participants);
  } catch (error) {
    console.error("Error fetching match:", error);
    return Response.json({ error: "Error processing request" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
