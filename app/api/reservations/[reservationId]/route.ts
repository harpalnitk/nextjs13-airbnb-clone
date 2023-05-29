import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
  reservationId?: string;
}

export async function DELETE(
  request: Request, 
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { reservationId } = params;

  if (!reservationId || typeof reservationId !== 'string') {
    throw new Error('Invalid ID');
  }

  const reservation = await prisma.reservation.deleteMany({
    where: {
      id: reservationId,
      OR: [
        { userId: currentUser.id },// only creator of reservation can delete listing OR
        // creator of listing where reservation is done can delete reservation
        { listing: { userId: currentUser.id } }
      ]
    }
  });

  return NextResponse.json(reservation);
}
