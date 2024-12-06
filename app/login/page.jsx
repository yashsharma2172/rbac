"use client"

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
export default function LoginPage() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const {toast} = useToast();
  const router = useRouter();
  async function handleLogin(event) {
    event.preventDefault();

    const response = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      const data = await response.json();
      document.cookie = `auth_token=${data.token}; path=/;`;
      localStorage.setItem("role", data.role); // Save role
      localStorage.setItem("permissions", JSON.stringify(data.permissions)); // Save permissions
      toast({
        title: 'Login Successful',
        description: `Welcome back, ${email}!`,
      });
      router.push("/dashboard") // Redirect to dashboard
    } else {
      const errorMessage = await response.text();

      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description: errorMessage,
      });
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Sign in to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <Button type="submit" className="mt-4 w-full">
              Login
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <p className="text-sm text-muted-foreground">
            Don&#39;t have an account? <a href="/signup" className="text-blue-600">Sign up</a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}