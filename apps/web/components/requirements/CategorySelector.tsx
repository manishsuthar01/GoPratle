import React from 'react';
import { CalendarDays, Mic2, Users2, Check } from 'lucide-react';
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
    description:
      'For users looking for professionals to organize, coordinate, and manage an event end-to-end.',
    icon: CalendarDays,
  },
  {
    id: 'performer' as const,
    title: 'Performer',
    description:
      'For users looking for solo artists, musicians, DJs, live bands, comedians, or entertainment hosts.',
    icon: Mic2,
  },
  {
    id: 'crew' as const,
    title: 'Crew',
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
                'relative flex flex-col text-left p-5 rounded-2xl border-2 transition-all duration-150 select-none cursor-pointer',
                isSelected
                  ? 'border-[var(--color-primary)] bg-[var(--color-primary-light)] shadow-xs'
                  : 'border-[#E8E8ED] bg-white hover:border-[#D6D6DC] hover:bg-[#FBFBFC]'
              )}
            >
              <div className="flex items-center justify-between w-full mb-3.5">
                <div
                  className={cn(
                    'w-10 h-10 rounded-xl flex items-center justify-center transition-colors',
                    isSelected
                      ? 'bg-[var(--color-primary)] text-white shadow-xs'
                      : 'bg-[#F2F2F5] text-[#585866]'
                  )}
                >
                  <Icon className="w-5 h-5" />
                </div>
                {isSelected ? (
                  <div className="w-5 h-5 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-[#D6D6DC]" />
                )}
              </div>

              <div className="font-bold text-base text-[#1D1D24] mb-1.5">
                {cat.title}
              </div>
              <p className="text-xs text-[#585866] leading-relaxed">
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
