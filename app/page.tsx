import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getConfigStatus } from "@/lib/env";
import { cn } from "@/lib/utils";

export default function HomePage() {
  const config = getConfigStatus();

  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-10 px-4 py-12">
        <section className="space-y-4">
          <Badge variant="outline">Default stack</Badge>
          <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            Ship modern apps on a free, debuggable stack.
          </h1>
          <p className="max-w-xl text-lg text-muted-foreground">
            Next.js + TypeScript + Tailwind + shadcn/ui + Auth.js + Drizzle/Neon
            + Vercel. Clone this starter for every new product.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/dashboard" className={cn(buttonVariants())}>
              Open dashboard
            </Link>
            <Link
              href="/signin"
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              Sign in
            </Link>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Auth</CardTitle>
              <CardDescription>Auth.js + Google OAuth</CardDescription>
            </CardHeader>
            <CardContent>
              <Badge variant={config.auth ? "default" : "secondary"}>
                {config.auth ? "Configured" : "Needs env"}
              </Badge>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Database</CardTitle>
              <CardDescription>Drizzle + Neon Postgres</CardDescription>
            </CardHeader>
            <CardContent>
              <Badge variant={config.database ? "default" : "secondary"}>
                {config.database ? "Configured" : "Needs env"}
              </Badge>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">UI</CardTitle>
              <CardDescription>Tailwind + shadcn/ui</CardDescription>
            </CardHeader>
            <CardContent>
              <Badge>Ready</Badge>
            </CardContent>
          </Card>
        </section>
      </main>
    </>
  );
}
