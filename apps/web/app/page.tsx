import Link from 'next/link';
import {
  CalendarDays,
  Users2,
  Mic2,
  ArrowRight,
  Check,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LandingPage() {
  const categories = [
    {
      id: 'planner',
      title: 'Event Planner',
      description:
        'Experienced coordinators and planners to manage vendors, styling, guest logistics, and day-of execution.',
      icon: CalendarDays,
      features: ['Full or partial planning', 'Vendor coordination', 'Guest & catering logistics'],
    },
    {
      id: 'performer',
      title: 'Performer',
      description:
        'Live bands, solo vocalists, DJs, comedians, and hosts tailored specifically to your event and audience.',
      icon: Mic2,
      features: ['Live bands & singers', 'DJs & sound sets', 'Emcees & entertainers'],
    },
    {
      id: 'crew',
      title: 'Crew',
      description:
        'Skilled sound engineers, lighting technicians, camera operators, security, and on-site support crew.',
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
        'Answer questions tailored to your chosen category — services, roles, budgets, and specific requirements.',
    },
    {
      step: '03',
      title: 'Submit your requirement',
      description:
        'Review the complete summary, submit safely with idempotency, and receive your instant reference ID.',
    },
  ];

  return (
    <div className="flex flex-col min-h-full">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 md:pt-28 md:pb-24 overflow-hidden border-b border-[#E8E8ED] bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#1D1D24] tracking-tight leading-[1.12] mb-6">
            Bring Your Event <br className="hidden sm:inline" />
            <span>to Life.</span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#585866] leading-relaxed mb-10">
            A streamlined platform designed for event organizers to specify exact requirements and connect seamlessly with top planners, performers, and technical crew.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/requirements/new">
              <Button size="lg" className="w-full sm:w-auto px-8 shadow-subtle hover:shadow-card font-semibold">
                Create a Requirement
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
            <a
              href="#categories"
              className="text-sm font-semibold text-[#585866] hover:text-[#1D1D24] px-4 py-2 transition-colors"
            >
              Explore service categories &darr;
            </a>
          </div>
        </div>
      </section>

      {/* Category Cards Section */}
      <section id="categories" className="py-20 md:py-24 max-w-6xl mx-auto px-4 sm:px-6 w-full">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1D1D24] tracking-tight mb-3">
            Tailored for Every Event Need
          </h2>
          <p className="text-[#585866] text-sm sm:text-base leading-relaxed">
            Select one of three primary service categories. The studio automatically adjusts every question to match what you are hiring for.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                className="group relative bg-white rounded-3xl border border-[#E8E8ED] p-7 sm:p-8 shadow-card hover:border-[var(--color-primary)] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[var(--color-primary-light)] text-[var(--color-primary)] flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-xl font-bold text-[#1D1D24] mb-2.5">
                    {cat.title}
                  </h3>

                  <p className="text-sm text-[#585866] leading-relaxed mb-6">
                    {cat.description}
                  </p>

                  <ul className="space-y-2.5 mb-8">
                    {cat.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center text-xs text-[#585866] font-medium gap-2">
                        <Check className="w-3.5 h-3.5 text-[var(--color-primary)] shrink-0 stroke-[2.5]" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link href="/requirements/new">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full group-hover:bg-[var(--color-primary)] group-hover:text-white group-hover:border-[var(--color-primary)] transition-all rounded-2xl"
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
      <section className="py-20 bg-white border-t border-[#E8E8ED]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1D1D24] tracking-tight mb-3">
              How GoPratle Works
            </h2>
            <p className="text-[#585866] text-sm sm:text-base leading-relaxed">
              A friction-free, three-stage guided posting flow designed to capture structured requirements without overwhelm.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {steps.map((item, index) => (
              <div
                key={index}
                className="flex flex-col p-7 rounded-3xl bg-[#FBFBFC] border border-[#E8E8ED]"
              >
                <div className="text-2xl font-black text-[var(--color-primary)] mb-3 tracking-tight">
                  {item.step}
                </div>
                <h3 className="text-base font-bold text-[#1D1D24] mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-[#585866] leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link href="/requirements/new">
              <Button size="lg" className="px-8 shadow-subtle font-semibold">
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
