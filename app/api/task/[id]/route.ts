import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// PUT API
export async function PUT(
    req: Response,
    { params }: { params: { id: string } }
  ) {
    const { completed } = await req.json();
    const updateTask = await prisma.task.update({
      where: { id: Number(params.id) },
      data: { completed },
    });
    return NextResponse.json(updateTask);
  }
  
  // DELETE API
  export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
  ) {
    await prisma.task.delete({
      where: { id: Number(params.id) },
    });
    return NextResponse.json({ message: "Task deleted successully" });
  }