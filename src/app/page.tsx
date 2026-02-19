import Link from "next/link";
import { Header } from "@/components/auth/header";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { ArrowRight } from "lucide-react";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 md:py-24">
        {/* Logo */}
        <div className="mb-12">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#27272a] text-white font-semibold text-lg">
            Σ
          </div>
        </div>

        {/* Headline */}
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-semibold text-foreground leading-[1.1] tracking-tight mb-4">
            Founder & Maker
          </h1>
          <h1 className="text-5xl md:text-7xl font-semibold text-muted-foreground leading-[1.1] tracking-tight">
            Products and open source tools.
          </h1>
        </div>

        {/* Subtitle */}
        <p className="mt-8 text-lg md:text-xl text-[#71717a] max-w-xl">
          Software for logistics, market research, and AI.
        </p>

        {/* CTA Button */}
        <div className="mt-10">
          {session ? (
            <Button asChild className="bg-white text-black hover:bg-white/90 gap-2" size="lg">
              <Link href="/dashboard">
                Go to App
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          ) : (
            <Button asChild className="bg-white text-black hover:bg-white/90" size="lg">
              <Link href="/login">Get Started</Link>
            </Button>
          )}
        </div>
      </section>

      {/* Featured Work Section */}
      <section className="container mx-auto px-6 pb-24">
        <p className="text-xs font-medium text-[#71717a] uppercase tracking-widest mb-8">
          Featured Work
        </p>

        <div className="grid grid-cols-2 gap-6">
          {/* Raqi - Full width on mobile, spans 2 cols on desktop */}
          <div className="col-span-2 group cursor-pointer">
            <div className="relative overflow-hidden rounded-2xl bg-[#f4f4f5] transition-transform duration-300 hover:scale-[1.02]">
              <div className="aspect-[21/9] relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#e4e4e7] to-[#d4d4d8]" />
                {/* Mockup content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-48 md:w-64 transform rotate-[-5deg] group-hover:rotate-0 transition-transform duration-500">
                    <div className="bg-white rounded-3xl shadow-2xl p-3">
                      <div className="bg-[#f4f4f5] rounded-2xl h-48 md:h-64 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-12 h-12 mx-auto mb-3 bg-black rounded-xl flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 7m0 13V7m7 0a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 7m0 13V7m7 0a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-[#18181b]">Raqi</h3>
                </div>
                <p className="text-[#71717a]">Enterprise logistics intelligence with WhatsApp-based proof of delivery.</p>
              </div>
            </div>
          </div>

          {/* IdeaApe */}
          <div className="group cursor-pointer">
            <div className="relative overflow-hidden rounded-2xl bg-[#fafafa] transition-transform duration-300 hover:scale-[1.02]">
              <div className="aspect-[4/3] relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#fefce8] to-[#fef9c3]" />
                <div className="absolute inset-4 flex gap-3">
                  <div className="flex-1 bg-white rounded-xl shadow-sm p-3">
                    <div className="text-xs font-medium text-[#a16207] mb-2">References</div>
                    <div className="space-y-2">
                      <div className="h-2 bg-[#fef9c3] rounded w-full" />
                      <div className="h-2 bg-[#fef9c3] rounded w-3/4" />
                      <div className="h-2 bg-[#fef9c3] rounded w-5/6" />
                    </div>
                  </div>
                  <div className="flex-1 bg-white rounded-xl shadow-sm p-3">
                    <div className="text-xs font-medium text-[#a16207] mb-2">Trends</div>
                    <div className="h-16 flex items-end gap-1">
                      <div className="flex-1 bg-[#fde047] rounded-t h-1/3" />
                      <div className="flex-1 bg-[#fde047] rounded-t h-2/3" />
                      <div className="flex-1 bg-[#fde047] rounded-t h-full" />
                      <div className="flex-1 bg-[#fde047] rounded-t h-1/2" />
                      <div className="flex-1 bg-[#fde047] rounded-t h-3/4" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-[#eab308] rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-[#18181b]">IdeaApe</h3>
                </div>
                <p className="text-[#71717a]">AI market research from real Reddit conversations.</p>
              </div>
            </div>
          </div>

          {/* PostCrawl */}
          <div className="group cursor-pointer">
            <div className="relative overflow-hidden rounded-2xl bg-[#fafafa] transition-transform duration-300 hover:scale-[1.02]">
              <div className="aspect-[4/3] relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#fff7ed] to-[#fed7aa]" />
                <div className="absolute inset-4 flex flex-col gap-3">
                  <div className="bg-white rounded-xl shadow-sm p-3 flex items-center gap-2">
                    <div className="w-6 h-6 bg-[#f97316] rounded-full" />
                    <div className="flex-1">
                      <div className="h-2 bg-[#fed7aa] rounded w-3/4 mb-1" />
                      <div className="h-1.5 bg-[#fed7aa] rounded w-1/2" />
                    </div>
                  </div>
                  <div className="bg-white/80 rounded-xl shadow-sm p-3">
                    <div className="font-mono text-xs text-[#ea580c]">{"{ "}</div>
                    <div className="font-mono text-xs text-[#ea580c] ml-2">&quot;title&quot;: &quot;How to...&quot;</div>
                    <div className="font-mono text-xs text-[#ea580c] ml-2">&quot;description&quot;: &quot;Scraping Reddit...&quot;</div>
                    <div className="font-mono text-xs text-[#ea580c]">{"}"}</div>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-[#f97316] rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-[#18181b]">PostCrawl</h3>
                </div>
                <p className="text-[#71717a]">LLM-ready social data API.</p>
              </div>
            </div>
          </div>

          {/* OpenDictation */}
          <div className="col-span-2 group cursor-pointer">
            <div className="relative overflow-hidden rounded-2xl bg-[#f8fafc] transition-transform duration-300 hover:scale-[1.02]">
              <div className="aspect-[21/9] relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#e0f2fe] to-[#bae6fd]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex gap-8 items-center">
                    <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center shadow-2xl">
                      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                      </svg>
                    </div>
                    <div className="flex gap-1">
                      <div className="w-1 h-8 bg-black rounded-full animate-pulse" />
                      <div className="w-1 h-12 bg-black rounded-full animate-pulse delay-75" />
                      <div className="w-1 h-6 bg-black rounded-full animate-pulse delay-150" />
                      <div className="w-1 h-10 bg-black rounded-full animate-pulse delay-100" />
                      <div className="w-1 h-8 bg-black rounded-full animate-pulse delay-200" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-[#18181b]">OpenDictation</h3>
                </div>
                <p className="text-[#71717a]">Voice-to-text for any macOS app, powered by local or cloud AI.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
