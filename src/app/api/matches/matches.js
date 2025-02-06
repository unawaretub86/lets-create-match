import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
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
    } = req.body;

    const match = await prisma.match.create({
      data: {
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
    res.status(200).json(match);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}