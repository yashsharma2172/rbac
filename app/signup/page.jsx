'use client'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function SignupPage() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [role, setRole] = React.useState("");
  const {toast} = useToast();
  const router = useRouter();
  async function handleSignup(event) {
    event.preventDefault();

    const response = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password, roleId: role }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      toast({
        title: 'Signup Successful',
        description: `Your account has been created. Please log in.`,
      });
      router.push('/login');
    } else {
      const errorMessage = await response.text();
        toast({
          variant: 'destructive',
          title: 'Signup Failed',
          description: errorMessage,
        });
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Signup</CardTitle>
          <CardDescription>Create your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup}>
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
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="role">Role</Label>
                <Select onValueChange={setRole} value={role} required>
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button type="submit" className="mt-4 w-full">
              Signup
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600">
              Log in
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}