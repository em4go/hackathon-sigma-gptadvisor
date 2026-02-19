import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { UserButton } from "@/components/auth/user-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export async function Header() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <header className="w-full border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <Link href="/" className="font-semibold text-foreground flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center">
            <span className="text-white font-bold text-sm">Σ</span>
          </div>
          <span className="hidden sm:inline">Finance AI</span>
        </Link>
        <nav className="flex items-center gap-2 sm:gap-4">
          {session ? (
            <UserButton user={session.user} />
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/login">Log in</Link>
              </Button>
              <Button className="bg-emerald-500 hover:bg-emerald-600 text-white" asChild>
                <Link href="/login">Get Started</Link>
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
