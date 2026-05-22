import Link from "next/link";
import { ArrowRight, CheckCircle2, BarChart3, ShieldCheck, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50">
      <header className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-zinc-900 dark:bg-white rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white dark:text-zinc-900" />
            </div>
            <span className="font-semibold text-lg tracking-tight">Credex</span>
          </div>
          <nav className="hidden md:flex gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-400">
            <Link href="#features" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Features</Link>
            <Link href="#how-it-works" className="hover:text-zinc-900 dark:hover:text-white transition-colors">How it works</Link>
            <Link href="#pricing" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Pricing</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/audit" className="text-sm font-medium hover:underline hidden sm:block">Sign in</Link>
            <Link href="/audit" className="inline-flex h-7 items-center justify-center rounded-full bg-primary px-5 text-[0.8rem] font-medium text-primary-foreground hover:bg-primary/80">
              Run Audit
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-24 pb-32 md:pt-32 md:pb-40 px-4">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-200 via-zinc-50 to-zinc-50 dark:from-zinc-800/40 dark:via-zinc-950 dark:to-zinc-950 -z-10" />
          
          <div className="container mx-auto max-w-5xl text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="inline-flex items-center rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 px-3 py-1 text-sm font-medium shadow-sm backdrop-blur-sm mb-4">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 mr-2"></span>
              Average savings of $2,400/yr per team
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-zinc-900 to-zinc-500 dark:from-white dark:to-zinc-500">
              Stop overpaying for AI.
              <br /> Optimize your SaaS stack.
            </h1>
            
            <p className="mx-auto max-w-2xl text-lg md:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Identify redundant tools, underutilized seats, and hidden discounts. 
              Get a financially defensible audit of your AI spend in seconds—no credit card required.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link href="/audit" className="inline-flex items-center justify-center bg-primary text-primary-foreground hover:bg-primary/80 rounded-full px-8 h-12 text-base w-full sm:w-auto font-medium">
                Start Free Audit <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link href="#features" className="inline-flex items-center justify-center rounded-full px-8 h-12 text-base w-full sm:w-auto bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm border border-input font-medium hover:bg-muted hover:text-foreground">
                View Example Report
              </Link>
            </div>
            
            <div className="pt-12 flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm text-zinc-500 font-medium">
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> No installation required</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Instant results</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4" /> Privacy-first</div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-white dark:bg-zinc-900 border-y border-zinc-200 dark:border-zinc-800">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Financial rigor for modern engineering.</h2>
              <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                Our audit engine goes beyond simple math. We analyze usage patterns, seat minimums, and hidden vendor discounts.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Zap className="w-6 h-6 text-amber-500" />,
                  title: "Identify Redundancies",
                  desc: "Automatically detect overlapping capabilities across coding assistants, chat interfaces, and API usage."
                },
                {
                  icon: <BarChart3 className="w-6 h-6 text-blue-500" />,
                  title: "Seat Optimization",
                  desc: "Find underutilized licenses and recommend exact downgrades that won't disrupt developer velocity."
                },
                {
                  icon: <ShieldCheck className="w-6 h-6 text-emerald-500" />,
                  title: "Enterprise Discounts",
                  desc: "Unlock bulk pricing tiers and negotiated rates typically reserved for Fortune 500 companies."
                }
              ].map((feature, i) => (
                <div key={i} className="p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/50 shadow-sm transition-all hover:shadow-md">
                  <div className="w-12 h-12 bg-white dark:bg-zinc-900 rounded-2xl flex items-center justify-center border border-zinc-100 dark:border-zinc-800 shadow-sm mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-200 dark:border-zinc-800 py-12 bg-zinc-50 dark:bg-zinc-950">
        <div className="container mx-auto px-4 max-w-6xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-zinc-900 dark:text-white" />
            <span className="font-semibold tracking-tight">Credex Audit Engine</span>
          </div>
          <p className="text-sm text-zinc-500">
            © {new Date().getFullYear()} Credex. Built for the modern SaaS stack.
          </p>
        </div>
      </footer>
    </div>
  );
}
