import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, email: true },
    });
    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}