'use client';

import React, { useEffect, useState, use } from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  Copy,
  Check,
  Calendar,
  Sparkles,
  ArrowRight,
  Home,
  Tag,
} from 'lucide-react';
import { toast } from 'sonner';
import { CATEGORY_LABELS } from '@gopratle/shared';
import { fetchRequirement } from '@/lib/api-client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface SuccessPageProps {
  params: Promise<{ reference: string }>;
}

export default function SuccessPage({ params }: SuccessPageProps) {
  const unwrappedParams = use(params);
  const reference = unwrappedParams.reference;

  const [copied, setCopied] = useState(false);
  const [details, setDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDetails() {
      try {
        const data = await fetchRequirement(reference);
        setDetails(data);
      } catch (err) {
        // Safe fallback if API cannot be reached immediately
      } finally {
        setLoading(false);
      }
    }
    loadDetails();
  }, [reference]);

  const handleCopy = () => {
    navigator.clipboard.writeText(reference);
    setCopied(true);
    toast.success('Reference ID copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-1 flex items-center justify-center py-16 px-4 sm:px-6">
      <div className="w-full max-w-lg bg-white rounded-3xl border border-slate-200/90 shadow-card p-8 sm:p-10 text-center relative overflow-hidden">
        {/* Top Decorative accent banner */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-accent via-indigo-500 to-emerald-400" />

        {/* Success Icon */}
        <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mx-auto mb-6 shadow-xs">
          <CheckCircle2 className="w-9 h-9 stroke-[2.2]" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold mb-3 border border-emerald-200">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          Submission Confirmed
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
          Your requirement has been submitted.
        </h1>

        <p className="text-sm text-slate-600 leading-relaxed mb-8">
          We have safely registered your event requirement in GoPratle. Qualified professionals matching your exact criteria will be notified.
        </p>

        {/* Unique Reference Card */}
        <div className="bg-[#FAF9F6] border border-slate-200/90 rounded-2xl p-5 mb-8 text-left space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Requirement Reference
            </span>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1 text-xs font-bold text-accent hover:text-accent-hover transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" /> Copied
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" /> Copy ID
                </>
              )}
            </button>
          </div>

          <div className="font-mono text-xl sm:text-2xl font-black text-slate-900 tracking-wider">
            {reference}
          </div>

          <div className="pt-3 border-t border-slate-200/70 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-1.5 text-slate-600 font-medium">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>Event:</span>
              <strong className="text-slate-900">
                {details?.event?.eventName || 'Registered Event'}
              </strong>
            </div>

            <div className="flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-slate-400" />
              <Badge variant="accent" className="font-semibold text-[11px]">
                {details?.category
                  ? (CATEGORY_LABELS as any)[details.category] || details.category
                  : 'Categorized'}
              </Badge>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <Link href="/requirements/new" className="w-full sm:w-1/2">
            <Button variant="primary" className="w-full py-2.5">
              Post Another
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </Link>
          <Link href="/" className="w-full sm:w-1/2">
            <Button variant="outline" className="w-full py-2.5">
              <Home className="w-4 h-4 mr-1.5" />
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

