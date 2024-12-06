import { hasPermission } from "@/utils/rbac";

export async function GET(req) {
  const userId = req.headers.get('x-user-id');
  const role = req.headers.get('x-role');

  if (!role || !(await hasPermission(userId, 'VIEW_DASHBOARD'))) {
    return new Response('Forbidden', { status: 403 });
  }

  return new Response(JSON.stringify({ data: 'Secure Data' }), { status: 200 });
}