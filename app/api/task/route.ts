import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

// GET API
export async function GET() {
  const task = await prisma.task.findMany();
  return NextResponse.json(task);
}

// POST API
export async function POST(req: Request) {
  const { title } = await req.json();
  const newTask = await prisma.task.create({ data: { title } });
  return NextResponse.json(newTask);
}


