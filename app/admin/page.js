'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useRouter } from 'next/navigation';
import { useToast } from "@/hooks/use-toast";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const router = useRouter();
  const { toast } = useToast();

  async function handleLogout() {
    try {
      const response = await fetch('/api/auth/logout', { method: 'POST' });
      if (response.ok) {
        router.push("/login")
    } else {
        alert('Logout failed. Please try again.');
      }
    } catch (error) {
      console.error('Error logging out:', error);
      toast({
        variant: 'destructive',
        title: 'Logout failed',
        description: 'An unexpected error occurred. Please try again.',
      });
    }
  }

  // Fetch users and roles
  useEffect(() => {
    
    async function fetchData() {
      try {
        const usersResponse = await fetch('/api/users'); // Updated to match new structure
        const rolesResponse = await fetch('/api/roles'); // Updated to match new structure
  
        if (!usersResponse.ok || !rolesResponse.ok) {
          throw new Error("Failed to fetch users or roles");
        }
  
        const usersData = await usersResponse.json();
        const rolesData = await rolesResponse.json();
  
        setUsers(usersData);
        setRoles(rolesData);
      } catch (error) {
        toast({
            variant: 'destructive',
            title: 'Error fetching data',
            description: 'Unable to fetch users or roles. Please try again later.',
          });
      }
    }
    fetchData();
  }, [toast]);

  // Handle role update
  async function handleRoleUpdate(event) {
    event.preventDefault();
    try {
      const response = await fetch('/api/users/role', {
        method: 'POST',
        body: JSON.stringify({ userId: selectedUser, roleId: selectedRole }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        alert("Role updated successfully!");
        setSelectedUser("");
        setSelectedRole("");
      } else {
        const errorMessage = await response.text();
        alert(`Failed to update role: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Error updating role:", error);
      alert("An error occurred while updating the role.");
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Card className="w-[600px]">
        <CardHeader>
          <CardTitle>Admin Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <h2 className="text-lg font-bold mb-4">Update User Role</h2>
          <form onSubmit={handleRoleUpdate} className="space-y-4">
            <div>
              <Select onValueChange={setSelectedUser} value={selectedUser} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select a user" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {users.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.email}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select onValueChange={setSelectedRole} value={selectedRole} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {roles.map((role) => (
                    <SelectItem key={role.id} value={role.id}>
                      {role.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full">
              Update Role
            </Button>
          </form>
          <Button
            className="w-full mt-4"
            variant="destructive"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}