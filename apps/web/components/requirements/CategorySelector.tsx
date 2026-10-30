import React from 'react';
import { CalendarDays, Mic2, Users2, CheckCircle2 } from 'lucide-react';
import { RequirementCategory } from '@gopratle/shared';
import { cn } from '@/lib/utils';

interface CategorySelectorProps {
  value: RequirementCategory;
  onChange: (category: RequirementCategory) => void;
  error?: string;
}

const categories = [
  {
    id: 'planner' as const,
    title: 'Event Planner',
    subtitle: 'Coordination & Styling',
    description:
      'For users looking for professionals to organize, coordinate, and manage an event end-to-end.',
    icon: CalendarDays,
  },
  {
    id: 'performer' as const,
    title: 'Performer',
    subtitle: 'Artists & Entertainment',
    description:
      'For users looking for solo artists, musicians, DJs, live bands, comedians, or entertainment hosts.',
    icon: Mic2,
  },
  {
    id: 'crew' as const,
    title: 'Crew',
    subtitle: 'Technical & Operational',
    description:
      'For users looking for technical staff, sound/light operators, photographers, setup crew, and security.',
    icon: Users2,
  },
];

export function CategorySelector({
  value,
  onChange,
  error,
}: CategorySelectorProps) {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {categories.map((cat) => {
          const isSelected = value === cat.id;
          const Icon = cat.icon;

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onChange(cat.id)}
              className={cn(
                'relative flex flex-col text-left p-5 rounded-2xl border-2 transition-all duration-200 select-none cursor-pointer',
                isSelected
                  ? 'border-accent bg-indigo-50/40 shadow-sm ring-1 ring-accent'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/60'
              )}
            >
              <div className="flex items-center justify-between w-full mb-3.5">
                <div
                  className={cn(
                    'w-10 h-10 rounded-xl flex items-center justify-center transition-colors',
                    isSelected
                      ? 'bg-accent text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600'
                  )}
                >
                  <Icon className="w-5 h-5" />
                </div>
                {isSelected ? (
                  <CheckCircle2 className="w-5 h-5 text-accent fill-indigo-100" />
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-slate-300" />
                )}
              </div>

              <div className="font-bold text-base text-slate-900 mb-0.5">
                {cat.title}
              </div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-accent mb-2">
                {cat.subtitle}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {cat.description}
              </p>
            </button>
          );
        })}
      </div>
      {error && (
        <p className="mt-2 text-xs text-rose-600 font-medium">{error}</p>
      )}
    </div>
  );
}

