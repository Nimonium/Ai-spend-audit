import { notFound } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getAuditFromDatabase } from '@/lib/supabase';
import { AlertTriangle, ArrowDownRight, CheckCircle2, XCircle, ArrowRightLeft, Sparkles } from 'lucide-react';
import Link from 'next/link';

function ActionIcon({ type }: { type: string }) {
  switch (type) {
    case 'cancel': return <XCircle className="w-5 h-5 text-red-500" />;
    case 'downgrade': return <ArrowDownRight className="w-5 h-5 text-amber-500" />;
    case 'consolidate': return <ArrowRightLeft className="w-5 h-5 text-blue-500" />;
    case 'switch': return <Sparkles className="w-5 h-5 text-emerald-500" />;
    default: return <CheckCircle2 className="w-5 h-5 text-zinc-500" />;
  }
}

export default async function ReportPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const auditData = await getAuditFromDatabase(id);

  if (!auditData) {
    notFound();
  }

  const { result } = auditData;
  const percentageSaved = result.totalCurrentMonthlySpend > 0 
    ? Math.round((result.totalEstimatedMonthlySavings / result.totalCurrentMonthlySpend) * 100) 
    : 0;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pb-24">
      {/* Header Bar */}
      <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <span className="font-semibold tracking-tight">Credex Audit Result</span>
          <Link href="/audit" className="inline-flex h-7 items-center justify-center rounded-md border border-input bg-background px-2.5 text-[0.8rem] font-medium hover:bg-muted hover:text-foreground">
             Run New Audit
          </Link>
        </div>
      </header>

      <div className="container max-w-4xl mx-auto pt-12 px-4 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        {/* Top Summary Section */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="md:col-span-2 border-zinc-200 dark:border-zinc-800 shadow-sm bg-gradient-to-br from-white to-zinc-50 dark:from-zinc-900 dark:to-zinc-950/50">
            <CardHeader className="pb-2">
              <CardDescription className="text-zinc-500 font-medium tracking-wide uppercase text-xs">Estimated Monthly Savings</CardDescription>
              <CardTitle className="text-5xl font-bold tracking-tighter text-emerald-600 dark:text-emerald-400">
                ${result.totalEstimatedMonthlySavings.toLocaleString()}
                <span className="text-lg text-zinc-400 dark:text-zinc-600 font-normal tracking-normal"> / mo</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 text-sm font-medium text-zinc-600 dark:text-zinc-400">
                <div className="h-2 w-full max-w-[200px] bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-emerald-500 rounded-full" 
                    style={{ width: `${Math.min(percentageSaved, 100)}%` }} 
                  />
                </div>
                <span>Reduces your ${result.totalCurrentMonthlySpend.toLocaleString()}/mo spend by {percentageSaved}%</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col justify-center">
             <CardHeader>
               <CardDescription className="text-zinc-500 font-medium tracking-wide uppercase text-xs">Opportunities Found</CardDescription>
               <CardTitle className="text-4xl font-bold tracking-tighter">{result.opportunities.length}</CardTitle>
             </CardHeader>
          </Card>
        </div>

        {/* Opportunities List */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold tracking-tight border-b border-zinc-200 dark:border-zinc-800 pb-2">Optimization Plan</h2>
          
          {result.opportunities.length > 0 ? (
            <div className="grid gap-4">
              {result.opportunities.map((opp, idx) => (
                <Card key={idx} className="border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow group overflow-hidden">
                  <div className="flex flex-col sm:flex-row">
                    
                    {/* Left Icon & Savings */}
                    <div className="bg-zinc-100/50 dark:bg-zinc-900/50 p-6 flex sm:flex-col items-center sm:justify-center border-b sm:border-b-0 sm:border-r border-zinc-200 dark:border-zinc-800 min-w-[140px] gap-4 sm:gap-2">
                       <div className="bg-white dark:bg-zinc-950 p-2 rounded-full shadow-sm border border-zinc-200 dark:border-zinc-800">
                         <ActionIcon type={opp.actionType} />
                       </div>
                       <div className="text-center">
                          <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider mb-1">{opp.actionType}</p>
                          <p className="font-bold text-lg text-emerald-600 dark:text-emerald-400">+${opp.estimatedMonthlySavings}</p>
                       </div>
                    </div>

                    {/* Right Content */}
                    <div className="p-6 flex-1 space-y-3">
                      <h3 className="font-semibold text-lg tracking-tight">{opp.title}</h3>
                      <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                        {opp.description}
                      </p>
                      
                      {opp.caveat && (
                        <div className="mt-4 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 rounded-md p-3 flex gap-3 items-start">
                          <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-500 shrink-0 mt-0.5" />
                          <p className="text-xs text-amber-800 dark:text-amber-400 leading-relaxed font-medium">
                            <span className="font-bold uppercase tracking-wider mr-1">Caveat:</span>
                            {opp.caveat}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="border-zinc-200 dark:border-zinc-800 shadow-sm border-dashed">
              <CardContent className="pt-12 pb-12 flex flex-col items-center justify-center text-center space-y-3">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mb-2">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold">Your stack is perfectly optimized.</h3>
                <p className="text-zinc-500 max-w-sm">We couldn&apos;t find any clear redundancies or cost-saving measures in your current AI subscriptions. Great job!</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* CTA Card */}
        <Card className="mt-12 bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 overflow-hidden relative border-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-zinc-800 to-zinc-900 dark:from-zinc-200 dark:to-zinc-50 opacity-50"></div>
          <div className="relative p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center sm:text-left">
              <h3 className="text-2xl font-bold tracking-tight">Need help implementing this?</h3>
              <p className="text-zinc-400 dark:text-zinc-600 max-w-md text-sm">
                Book a consultation with a Credex advisor to review your entire software stack and negotiate bulk discounts on your behalf.
              </p>
            </div>
            <Button className="bg-white text-zinc-900 hover:bg-zinc-100 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800 shrink-0 w-full sm:w-auto h-12 px-6 shadow-xl">
              Book Free Consultation
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
