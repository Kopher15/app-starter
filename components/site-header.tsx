import Link from "next/link";
import { auth, signOut } from "@/auth";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export async function SiteHeader() {
  const session = await auth();

  return (
    <header className="border-b border-border/80 bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-4">
        <Link href="/" className="font-semibold tracking-tight">
          App Starter
        </Link>
        <nav className="flex items-center gap-2">
          <Link
            href="/api/health"
            className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
          >
            Health
          </Link>
          {session?.user ? (
            <>
              <Badge variant="secondary" className="hidden sm:inline-flex">
                {session.user.email ?? session.user.name}
              </Badge>
              <Link
                href="/dashboard"
                className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
              >
                Dashboard
              </Link>
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <Button type="submit" variant="outline" size="sm">
                  Sign out
                </Button>
              </form>
            </>
          ) : (
            <Link href="/signin" className={cn(buttonVariants({ size: "sm" }))}>
              Sign in
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
