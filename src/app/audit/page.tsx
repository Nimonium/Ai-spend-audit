import { submitAuditAction } from './actions';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export default function AuditPage() {
  return (
    <div className="container max-w-2xl mx-auto py-12">
      <Card>
        <CardHeader>
          <CardTitle>AI Spend Audit</CardTitle>
          <CardDescription>Enter your startup's AI usage to uncover savings.</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={submitAuditAction} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="teamSize">Team Size</Label>
              <Input id="teamSize" name="teamSize" type="number" required defaultValue={5} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="useCase">Primary Use Case</Label>
              <Input id="useCase" name="useCase" placeholder="e.g. Software Development" required />
            </div>
            
            <div className="border p-4 rounded-md space-y-4">
              <h3 className="font-medium">Primary AI Tool</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tool1Name">Tool Name</Label>
                  <Input id="tool1Name" name="tool1Name" defaultValue="ChatGPT" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tool1Plan">Plan</Label>
                  <Input id="tool1Plan" name="tool1Plan" defaultValue="Team" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tool1Seats">Seats</Label>
                  <Input id="tool1Seats" name="tool1Seats" type="number" defaultValue={5} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tool1Spend">Monthly Spend ($)</Label>
                  <Input id="tool1Spend" name="tool1Spend" type="number" defaultValue={150} required />
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full">Run Audit</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
