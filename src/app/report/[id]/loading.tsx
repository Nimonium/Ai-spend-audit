export default function Loading() {
  return (
    <div className="container max-w-4xl mx-auto py-12 space-y-8 animate-pulse">
      <div className="text-center space-y-4 flex flex-col items-center">
        <div className="h-10 bg-zinc-200 dark:bg-zinc-800 rounded w-1/2"></div>
        <div className="h-6 bg-zinc-200 dark:bg-zinc-800 rounded w-1/3"></div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="h-32 bg-zinc-200 dark:bg-zinc-800 rounded-xl"></div>
      </div>

      <div className="space-y-4">
        <div className="h-8 bg-zinc-200 dark:bg-zinc-800 rounded w-1/4"></div>
        <div className="grid gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-zinc-200 dark:bg-zinc-800 rounded-xl"></div>
          ))}
        </div>
      </div>
    </div>
  );
}
