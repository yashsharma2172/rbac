'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
export default function DashboardClient({ role }) {
  const router = useRouter();
  const {toast} = useToast();
  async function handleLogout() {
    try {
      const response = await fetch('/api/auth/logout', { method: 'POST' });
      if (response.ok) {
        router.push('/login');
      } else {
        toast({
            variant: 'destructive',
            title: 'Logout failed',
            description: 'An unexpected error occurred. Please try again.',
          });
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
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>
            {role === 'Admin' ? 'Welcome Admin' : 'Welcome User'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 text-sm mb-4">
            {role === 'Admin'
              ? 'You have access to administrative tools.'
              : 'Explore the features available to you.'}
          </p>
          <Button
            className="w-full"
            onClick={() => role === 'Admin' && router.push('/admin')}
            disabled={role !== 'Admin'} // Disable the button for non-admins
          >
            Go to Admin Dashboard
          </Button>
          {role !== 'Admin' && (
            <p className="text-sm text-gray-500 mt-2">
              You do not have access to the Admin Dashboard.
            </p>
          )}
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