import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted py-12 px-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl font-bold">Email Verification</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">Thank you for registering! A verification link has been sent to your email.</p>
          <p className="text-sm text-muted-foreground">Please check your email and click the verification link to activate your account.</p>
          <Button asChild className="w-full">
            <Link href="/login">Return to Login</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
