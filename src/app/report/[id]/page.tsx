import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { runAudit, AuditRequest } from '@/lib/audit-engine';

// Mock data retrieval for MVP
function getMockAuditResult() {
  const request: AuditRequest = {
    teamSize: 5,
    useCase: 'Software Development',
    tools: [
      {
        id: '1',
        name: 'ChatGPT',
        category: 'chat',
        planName: 'Team',
        seats: 5,
        monthlySpend: 150,
      }
    ]
  };
  return runAudit(request);
}

export default async function ReportPage({ params }: { params: { id: string } }) {
  // In a real app, we'd fetch the audit request by ID from Supabase here
  const result = getMockAuditResult();

  return (
    <div className="container max-w-4xl mx-auto py-12 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Your AI Spend Audit</h1>
        <p className="text-xl text-muted-foreground">We found potential savings in your current stack.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Current Monthly Spend</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">${result.totalCurrentMonthlySpend}</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Opportunities</h2>
        {result.opportunities.length > 0 ? (
          <div className="grid gap-4">
            {result.opportunities.map((opp, idx) => (
              <Card key={idx} className="border-green-200 bg-green-50/50 dark:bg-green-950/10">
                <CardHeader>
                  <CardTitle className="text-green-700 dark:text-green-400">{opp.title}</CardTitle>
                  <CardDescription>{opp.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <p className="font-medium text-green-700 dark:text-green-400">
                    Est. Savings: ${opp.estimatedMonthlySavings}/mo
                  </p>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="pt-6">
              <p>Your AI stack is perfectly optimized! Great job.</p>
            </CardContent>
          </Card>
        )}
      </div>

      <Card className="bg-slate-900 text-white">
        <CardHeader>
          <CardTitle>Unlock Credex Startup Discounts</CardTitle>
          <CardDescription className="text-slate-300">
            Get personalized advice and bulk discounts for your startup.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Book a free consultation with a Credex advisor to review your entire software stack.</p>
        </CardContent>
        <CardFooter>
          <Button variant="secondary" className="w-full sm:w-auto">Book Consultation</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
