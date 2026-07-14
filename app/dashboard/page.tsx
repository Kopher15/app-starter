import { auth } from "@/auth";
import { SiteHeader } from "@/components/site-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getConfigStatus } from "@/lib/env";

export default async function DashboardPage() {
  const session = await auth();
  const config = getConfigStatus();

  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-6 px-4 py-10">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Protected route — only signed-in users reach here.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Session</CardTitle>
              <CardDescription>From Auth.js JWT session</CardDescription>
            </CardHeader>
            <CardContent className="space-y-1 text-sm">
              <p>
                <span className="text-muted-foreground">Name:</span>{" "}
                {session?.user?.name ?? "—"}
              </p>
              <p>
                <span className="text-muted-foreground">Email:</span>{" "}
                {session?.user?.email ?? "—"}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Stack status</CardTitle>
              <CardDescription>Env readiness for this deploy</CardDescription>
            </CardHeader>
            <CardContent className="space-y-1 text-sm">
              <p>Auth configured: {config.auth ? "yes" : "no"}</p>
              <p>Database configured: {config.database ? "yes" : "no"}</p>
              <p>
                Probe session API:{" "}
                <a className="underline" href="/api/me">
                  /api/me
                </a>
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
