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
    <header className="w-full">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <Link href="/" className="font-semibold text-white">
          Sigma GPT Advisor
        </Link>
        <nav className="flex items-center gap-4">
          {session ? (
            <UserButton user={session.user} />
          ) : (
            <>
              <Button variant="ghost" className="text-white hover:text-white hover:bg-white/10" asChild>
                <Link href="/login">Log in</Link>
              </Button>
              <Button className="bg-white text-black hover:bg-white/90" asChild>
                <Link href="/sign-up">Sign up</Link>
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
