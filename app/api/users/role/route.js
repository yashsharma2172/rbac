import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const { userId, roleId } = await req.json();

    // Decode the current user's token to get their ID
    const token = cookies().get("auth_token")?.value;
    if (!token) {
      return new Response("Unauthorized", { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const currentUserId = decoded.userId;

    // Validate the user and role
    const user = await prisma.user.findUnique({ where: { id: userId } });
    const role = await prisma.role.findUnique({ where: { id: roleId } });

    if (!user) {
      return new Response("User not found", { status: 404 });
    }
    if (!role) {
      return new Response("Role not found", { status: 404 });
    }

    // Prevent admin from changing their own role to 'User'
    if (userId === currentUserId) {
      const adminRole = await prisma.role.findUnique({ where: { name: "Admin" } });
      if (roleId !== adminRole.id) {
        return new Response("Admins cannot change their own role", { status: 403 });
      }
    }

    // Update the user's role
    await prisma.user.update({
      where: { id: userId },
      data: { roleId },
    });

    return new Response(
      JSON.stringify({ message: "User role updated successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user role:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}