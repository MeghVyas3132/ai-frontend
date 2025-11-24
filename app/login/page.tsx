'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import Image from "next/image";
import logo from "@/assets/aigenthix-logo.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user, login, isLoading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    try {
      const result = await login(email, password);
      
      if (result.success) {
        toast.success("Login successful!");
        // Small delay to allow state update
        setTimeout(() => router.push("/dashboard"), 500);
      } else {
        toast.error(result.error || "Login failed");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      {/* Left side - Login Form */}
      <div className="flex w-full flex-col justify-center px-8 py-12 lg:w-1/2 lg:px-16">
        <div className="mx-auto w-full max-w-md">
          <div className="mb-8">
            <Image src={logo} alt="Aigenthix" className="mb-8 h-12 object-contain object-left" />
            <h1 className="text-3xl font-bold text-foreground">Welcome back</h1>
            <p className="mt-2 text-muted-foreground">Sign in to your Aigenthix account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="text-sm text-primary hover:underline">
                  Forgot password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                className="h-11"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                disabled={isLoading}
              />
              <Label htmlFor="remember" className="cursor-pointer text-sm font-normal">
                Remember me for 30 days
              </Label>
            </div>

            <Button type="submit" className="h-11 w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          <div className="mt-8 rounded-lg border border-border bg-muted/30 p-4">
            <p className="mb-2 text-sm font-medium">Demo Credentials:</p>
            <div className="space-y-1 text-xs text-muted-foreground">
              <p>Admin: admin@aiinterviewer.com / AdminPass123!@</p>
              <p>HR: hr@testcorp.com / HRPass123!@</p>
              <p>Employee: john@testcorp.com / EmpPass123!@</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Brand Image */}
      <div className="hidden lg:block lg:w-1/2 bg-gradient-to-br from-primary to-primary/80">
        <div className="flex h-full flex-col items-center justify-center p-16 text-primary-foreground">
          <div className="max-w-md text-center">
            <h2 className="mb-4 text-4xl font-bold">Empower Your Team</h2>
            <p className="text-lg opacity-90">
              Streamline operations, manage employees, and grow your business with Aigenthix's
              intelligent admin platform.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
