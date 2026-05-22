'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { processAuditPayload } from './actions';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlusCircle, Trash2, Loader2, ArrowRight } from 'lucide-react';

const toolSchema = z.object({
  name: z.string().min(1, 'Tool name is required'),
  category: z.enum(['chat', 'coding', 'api', 'other']),
  planName: z.string().min(1, 'Plan name is required'),
  seats: z.coerce.number().min(1, 'Must have at least 1 seat'),
  monthlySpend: z.coerce.number().min(0, 'Spend cannot be negative'),
});

const formSchema = z.object({
  teamSize: z.coerce.number().min(1, 'Team size must be at least 1'),
  useCase: z.string().min(2, 'Please describe your use case'),
  tools: z.array(toolSchema).min(1, 'Please add at least one tool'),
});

type FormValues = z.infer<typeof formSchema>;

export default function AuditPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      teamSize: 5,
      useCase: '',
      tools: [
        { name: 'ChatGPT', category: 'chat', planName: 'Team', seats: 5, monthlySpend: 150 },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'tools',
  });

  async function onSubmit(data: FormValues) {
    setIsSubmitting(true);
    try {
      // We pass the parsed data to the server action as JSON string
      const formData = new FormData();
      formData.append('payload', JSON.stringify(data));
      const res = await processAuditPayload(data);
      if (res?.id) {
         router.push(`/report/${res.id}`);
      }
    } catch (error) {
      console.error('Submission failed', error);
      setIsSubmitting(false);
    }
  }

  return (
    <div className="container max-w-3xl mx-auto py-16 px-4">
      <div className="mb-8 text-center space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h1 className="text-4xl font-bold tracking-tight">AI Spend Audit</h1>
        <p className="text-lg text-muted-foreground">
          Enter your current AI subscriptions to uncover hidden savings and optimization opportunities.
        </p>
      </div>

      <Card className="shadow-lg border-zinc-200/60 dark:border-zinc-800/60 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
        <CardContent className="pt-6">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="teamSize">Total Team Size</Label>
                <Input
                  id="teamSize"
                  type="number"
                  {...form.register('teamSize')}
                  className={form.formState.errors.teamSize ? 'border-red-500' : ''}
                />
                {form.formState.errors.teamSize && (
                  <p className="text-sm text-red-500">{form.formState.errors.teamSize.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="useCase">Primary Use Case</Label>
                <Input
                  id="useCase"
                  placeholder="e.g. Software Development, Marketing"
                  {...form.register('useCase')}
                  className={form.formState.errors.useCase ? 'border-red-500' : ''}
                />
                 {form.formState.errors.useCase && (
                  <p className="text-sm text-red-500">{form.formState.errors.useCase.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">AI Tools</h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => append({ name: '', category: 'chat', planName: '', seats: 1, monthlySpend: 0 })}
                >
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Add Tool
                </Button>
              </div>

              {fields.map((field, index) => (
                <Card key={field.id} className="relative bg-zinc-50 dark:bg-zinc-900/50">
                  <CardContent className="p-4 grid md:grid-cols-5 gap-4">
                    {fields.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute -right-3 -top-3 h-8 w-8 rounded-full bg-background border shadow-sm text-muted-foreground hover:text-red-500"
                        onClick={() => remove(index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                    
                    <div className="space-y-2 md:col-span-2">
                      <Label>Tool Name</Label>
                      <Input
                        placeholder="e.g. ChatGPT"
                        {...form.register(`tools.${index}.name`)}
                        className={form.formState.errors.tools?.[index]?.name ? 'border-red-500' : ''}
                      />
                    </div>
                    
                    <div className="space-y-2 md:col-span-1">
                      <Label>Category</Label>
                      <select
                        className="flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        {...form.register(`tools.${index}.category`)}
                      >
                        <option value="chat">Chat</option>
                        <option value="coding">Coding</option>
                        <option value="api">API</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div className="space-y-2 md:col-span-1">
                      <Label>Plan</Label>
                      <Input
                         placeholder="e.g. Team"
                        {...form.register(`tools.${index}.planName`)}
                      />
                    </div>
                    
                    <div className="space-y-2 md:col-span-1">
                      <Label>Seats</Label>
                      <Input
                        type="number"
                        {...form.register(`tools.${index}.seats`)}
                      />
                    </div>

                    <div className="space-y-2 md:col-span-1">
                      <Label>Total Spend/mo ($)</Label>
                      <Input
                        type="number"
                        {...form.register(`tools.${index}.monthlySpend`)}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
              {form.formState.errors.tools?.root && (
                 <p className="text-sm text-red-500">{form.formState.errors.tools.root.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full h-12 text-lg" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Analyzing Stack...
                </>
              ) : (
                <>
                  Run Audit <ArrowRight className="ml-2 w-5 h-5" />
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
