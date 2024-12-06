import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function UnauthorizedPage() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Card className="w-[400px] text-center">
        <CardHeader>
          <CardTitle className="text-red-600 text-2xl">Access Denied</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 text-sm">
            You do not have permission to access this page. Please contact your
            administrator if you believe this is a mistake.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}