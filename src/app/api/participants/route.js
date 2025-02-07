import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { matchId, name, phone, email, paymentReceiptUrl } = req.body;
    const participant = await prisma.participant.create({
      data: {
        matchId,
        name,
        phone,
        email,
        paymentReceiptUrl,
      },
    });
    res.status(200).json(participant);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}