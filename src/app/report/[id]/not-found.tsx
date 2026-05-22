import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container max-w-2xl mx-auto py-24 px-4 text-center">
      <Card className="border-dashed shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Audit Not Found</CardTitle>
          <CardDescription>
            We couldn&apos;t find the AI spend audit you&apos;re looking for. It may have expired or the link is incorrect.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/audit" className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 mt-4">
            Run a New Audit
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
