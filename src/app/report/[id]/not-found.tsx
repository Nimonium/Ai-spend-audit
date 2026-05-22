import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container max-w-2xl mx-auto py-24 px-4 text-center">
      <Card className="border-dashed shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Audit Not Found</CardTitle>
          <CardDescription>
            We couldn't find the AI spend audit you're looking for. It may have expired or the link is incorrect.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild className="mt-4">
            <Link href="/audit">Run a New Audit</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
