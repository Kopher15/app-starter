import Link from "next/link";
import { signIn } from "@/auth";
import { SiteHeader } from "@/components/site-header";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { isAuthConfigured } from "@/lib/env";
import { cn } from "@/lib/utils";

export default function SignInPage() {
  const ready = isAuthConfigured();

  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-4 py-12">
        <Card>
          <CardHeader>
            <CardTitle>Sign in</CardTitle>
            <CardDescription>
              {ready
                ? "Continue with Google to access the dashboard."
                : "Auth env vars are missing. Add them to .env.local — see .env.example."}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {ready ? (
              <form
                action={async () => {
                  "use server";
                  await signIn("google", { redirectTo: "/dashboard" });
                }}
              >
                <Button type="submit" className="w-full">
                  Continue with Google
                </Button>
              </form>
            ) : (
              <Button className="w-full" disabled>
                Google sign-in unavailable
              </Button>
            )}
            <Link
              href="/"
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "w-full justify-center",
              )}
            >
              Back home
            </Link>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
