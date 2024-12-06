import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const roles = await prisma.role.findMany({
      select: { id: true, name: true },
    });
    return new Response(JSON.stringify(roles), { status: 200 });
  } catch (error) {
    console.error("Error fetching roles:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}