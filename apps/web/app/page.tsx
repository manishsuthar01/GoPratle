import Link from 'next/link';
import {
  CalendarDays,
  Sparkles,
  Users2,
  Mic2,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function LandingPage() {
  const categories = [
    {
      id: 'planner',
      title: 'Event Planner',
      badge: 'Coordination & Styling',
      description:
        'Professional planners to orchestrate schedules, manage vendors, design themes, and oversee your event from start to finish.',
      icon: CalendarDays,
      features: ['Full or partial planning', 'Vendor coordination', 'Guest & catering logistics'],
    },
    {
      id: 'performer',
      title: 'Performer',
      badge: 'Artists & Entertainment',
      description:
        'Top-tier live bands, solo vocalists, energetic DJs, comedians, and specialty performers tailored to your audience.',
      icon: Mic2,
      features: ['Live bands & singers', 'DJs & sound sets', 'Emcees & entertainers'],
    },
    {
      id: 'crew',
      title: 'Crew',
      badge: 'Technical & On-site Staff',
      description:
        'Skilled sound engineers, lighting technicians, camera operators, security personnel, and hands-on stage assistants.',
      icon: Users2,
      features: ['Sound & lighting operators', 'Camera & video crew', 'Hospitality & security'],
    },
  ];

  const steps = [
    {
      step: '01',
      title: 'Describe your event',
      description:
        'Enter event name, dates, location, and choose whether you need a planner, performers, or operational crew.',
    },
    {
      step: '02',
      title: 'Tell us what you need',
      description:
        'Answer smart questions tailored to your chosen category — services, roles, budgets, and specific requirements.',
    },
    {
      step: '03',
      title: 'Submit your requirement',
      description:
        'Review the complete summary, submit safely with built-in idempotency, and receive your instant reference ID.',
    },
  ];

  return (
    <div className="flex flex-col min-h-full">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 md:pt-28 md:pb-24 overflow-hidden border-b border-slate-200/60 bg-gradient-to-b from-white to-[#FAF9F6]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100/80 text-accent font-medium text-xs mb-6 shadow-xs animate-fade-in">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span>Event Requirement Studio</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12] mb-6">
            Bring Your Event <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-indigo-950 to-indigo-600">
              to Life.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-600 leading-relaxed mb-10">
            A streamlined platform designed for event organizers to specify exact requirements and connect seamlessly with top planners, performers, and technical crew.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/requirements/new">
              <Button size="lg" className="w-full sm:w-auto px-8 shadow-md hover:shadow-lg">
                Create a Requirement
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
            <a
              href="#categories"
              className="text-sm font-semibold text-slate-600 hover:text-slate-900 px-4 py-2 transition-colors"
            >
              Explore service categories &darr;
            </a>
          </div>

          {/* Social Proof / Value tags */}
          <div className="mt-14 pt-8 border-t border-slate-200/60 flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-xs font-medium text-slate-500">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Dynamic Schema Adaptation
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-indigo-600" /> Idempotent Submissions
            </span>
            <span className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-600" /> Instant Reference Tracking
            </span>
          </div>
        </div>
      </section>

      {/* Category Cards Section */}
      <section id="categories" className="py-20 md:py-24 max-w-6xl mx-auto px-4 sm:px-6 w-full">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-3">
            Tailored for Every Event Need
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Select one of three primary service categories. The requirement studio automatically adjusts every question to match what you are hiring for.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                className="group relative bg-white rounded-2xl border border-slate-200 p-8 shadow-subtle hover:shadow-card hover:border-indigo-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-accent mb-6 group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>

                  <Badge variant="accent" className="mb-3">
                    {cat.badge}
                  </Badge>

                  <h3 className="text-xl font-bold text-slate-900 mb-2.5">
                    {cat.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {cat.description}
                  </p>

                  <ul className="space-y-2 mb-8">
                    {cat.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center text-xs text-slate-600 font-medium gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link href={`/requirements/new`}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all"
                  >
                    Post for {cat.title}
                  </Button>
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3-Step Process Section */}
      <section className="py-20 bg-white border-y border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-3">
              How GoPratle Works
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              A friction-free, three-stage guided posting flow designed to capture structured requirements without overwhelm.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {steps.map((item, index) => (
              <div
                key={index}
                className="relative flex flex-col p-6 rounded-2xl bg-[#FAF9F6] border border-slate-200/70"
              >
                <div className="text-2xl font-black text-indigo-600 mb-4 tracking-tighter">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link href="/requirements/new">
              <Button size="lg" className="px-8 shadow-md">
                Get Started Now
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

