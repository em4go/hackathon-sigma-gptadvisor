import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { PortfolioClient } from "./portfolio-client";

export default async function PortfolioPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  return <PortfolioClient user={session.user} />;
}
