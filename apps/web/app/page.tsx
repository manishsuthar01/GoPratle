import Link from 'next/link';
import {
  CalendarDays,
  Users2,
  Mic2,
  ArrowRight,
  Check,
  MapPin,
  Clock,
  Music2,
  Sliders,
  ShieldCheck,
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
    <div className="flex flex-col min-h-full tech-grid-canvas">
      {/* Hero Section with Dira-Style Technical Grid & Interactive Card Deck */}
      <section className="relative pt-12 pb-20 md:pt-16 md:pb-28 overflow-hidden">
        {/* Floating Cursor Pill 1 (Left - Crimson/Brand Token, No Green) */}
        <div className="hidden lg:flex items-center gap-2 absolute top-20 left-[10%] z-20">
          <div className="px-3.5 py-1.5 rounded-full bg-[var(--color-primary-light)] border border-[var(--color-primary-border)] text-[var(--color-primary)] text-xs font-semibold shadow-xs flex items-center gap-1.5 select-none">
            <span className="w-2 h-2 rounded-full bg-[var(--color-primary)]" />
            <span>Event Planner Confirmed</span>
          </div>
          {/* Custom SVG pointer cursor */}
          <svg
            className="w-5 h-5 text-[#1D1D24] -rotate-12 drop-shadow-xs"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M4 2l6 18 3-7 7-3L4 2z" />
          </svg>
        </div>

        {/* Floating Cursor Pill 2 (Right - Warm Coral Token) */}
        <div className="hidden lg:flex items-center gap-2 absolute top-16 right-[10%] z-20">
          {/* Custom SVG pointer cursor */}
          <svg
            className="w-5 h-5 text-[#1D1D24] rotate-45 drop-shadow-xs"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M4 2l6 18 3-7 7-3L4 2z" />
          </svg>
          <div className="px-3.5 py-1.5 rounded-full bg-[#FFF3E0] border border-[#FFE0B2] text-[#E65100] text-xs font-semibold shadow-xs flex items-center gap-1.5 select-none">
            <span className="w-2 h-2 rounded-full bg-[#E65100]" />
            <span>Crew: 5 Sound Technicians</span>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#1D1D24] tracking-tight leading-[1.12] mb-6">
            Bring Your Event <br className="hidden sm:inline" />
            <span>to Life.</span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#585866] leading-relaxed mb-10">
            A streamlined platform designed for event organizers to specify exact requirements and connect seamlessly with top planners, performers, and technical crew.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link href="/requirements/new">
              <Button size="lg" className="w-full sm:w-auto px-8 shadow-subtle hover:shadow-card font-semibold rounded-full">
                Create a Requirement
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
            <a
              href="#categories"
              className="text-sm font-semibold text-[#585866] hover:text-[#1D1D24] px-5 py-3 transition-colors rounded-full bg-white/90 border border-[#E8E8ED] hover:bg-white shadow-2xs"
            >
              Explore service categories &darr;
            </a>
          </div>

          {/* Fanned-out Card Deck (Dira Reference Showcase) */}
          <div className="relative max-w-4xl mx-auto pt-4 pb-6 sm:pb-8">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0 relative">
              {/* Card 1: Left Tilted (Planner Spec Card) */}
              <div className="w-full md:w-[320px] bg-white rounded-3xl border border-[#E8E8ED] p-5 shadow-card md:-rotate-6 md:translate-y-6 md:translate-x-8 md:hover:rotate-0 md:hover:translate-y-0 transition-all duration-300 z-10 text-left">
                <div className="flex items-center justify-between mb-3.5">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-[var(--color-primary-light)] text-[var(--color-primary)] flex items-center justify-center">
                      <CalendarDays className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-[#1D1D24]">Wedding & Gala</span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[var(--color-primary)] bg-[var(--color-primary-light)] px-2.5 py-0.5 rounded-full border border-[var(--color-primary-border)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]" /> Matched
                  </span>
                </div>

                <div className="text-xs text-[#585866] flex items-center gap-1 mb-3">
                  <MapPin className="w-3.5 h-3.5 text-[#8E8E9C]" />
                  <span>Jaipur Palace, Rajasthan</span>
                </div>

                <div className="space-y-1.5 mb-4">
                  <div className="text-[11px] font-semibold text-[#8E8E9C]">Services Needed:</div>
                  <div className="flex flex-wrap gap-1">
                    <span className="text-[11px] bg-[#F2F2F5] text-[#1D1D24] px-2 py-0.5 rounded-md font-medium">
                      Full Planning
                    </span>
                    <span className="text-[11px] bg-[#F2F2F5] text-[#1D1D24] px-2 py-0.5 rounded-md font-medium">
                      Decor Styling
                    </span>
                    <span className="text-[11px] bg-[#F2F2F5] text-[#1D1D24] px-2 py-0.5 rounded-md font-medium">
                      Catering
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#F0F0F3] flex items-center justify-between text-xs">
                  <span className="text-[#8E8E9C]">Guest Count</span>
                  <span className="font-bold text-[#1D1D24]">350 Guests</span>
                </div>
              </div>

              {/* Card 2: Center Elevated (Live Studio Requirement Snapshot) */}
              <div className="w-full md:w-[380px] bg-white rounded-3xl border-2 border-[var(--color-primary)] p-6 shadow-floating z-20 text-left relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl bg-[var(--color-primary)] text-white flex items-center justify-center font-black text-sm">
                      GP
                    </div>
                    <div>
                      <div className="text-xs font-extrabold text-[#1D1D24]">Tech Conclave 2027</div>
                      <div className="text-[10px] text-[#8E8E9C] font-mono">Ref: GPR-A81F92C4</div>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[var(--color-primary)] bg-[var(--color-primary-light)] px-2.5 py-1 rounded-full border border-[var(--color-primary-border)]">
                    <span className="w-2 h-2 rounded-full bg-[var(--color-primary)]" />
                    <span>Submitted</span>
                  </span>
                </div>

                <div className="bg-[#FBFBFC] rounded-2xl p-3.5 border border-[#E8E8ED] mb-4 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#8E8E9C] flex items-center gap-1">
                      <Music2 className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                      Category:
                    </span>
                    <span className="font-bold text-[#1D1D24]">Performer (Live Band & DJ)</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#8E8E9C] flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#8E8E9C]" />
                      Set Duration:
                    </span>
                    <span className="font-semibold text-[#1D1D24]">2–4 Hours</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#8E8E9C] flex items-center gap-1">
                      <Sliders className="w-3.5 h-3.5 text-[#8E8E9C]" />
                      Budget Range:
                    </span>
                    <span className="font-bold text-[var(--color-primary)]">₹3,00,000 – ₹5,00,000</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-[#585866] pt-1">
                  <span className="flex items-center gap-1.5 text-[11px] text-[#1D1D24] font-semibold">
                    <ShieldCheck className="w-4 h-4 text-[var(--color-primary)]" />
                    Idempotent Key Verified
                  </span>
                  <span className="text-[10px] text-[#8E8E9C]">Mumbai, India</span>
                </div>
              </div>

              {/* Card 3: Right Tilted (Crew & Staff Card) */}
              <div className="w-full md:w-[320px] bg-white rounded-3xl border border-[#E8E8ED] p-5 shadow-card md:rotate-6 md:translate-y-6 md:-translate-x-8 md:hover:rotate-0 md:hover:translate-y-0 transition-all duration-300 z-10 text-left">
                <div className="flex items-center justify-between mb-3.5">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-[#FFF3E0] text-[#E65100] flex items-center justify-center">
                      <Users2 className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-[#1D1D24]">Stage & Audio Crew</span>
                  </div>
                  <span className="text-[10px] font-bold text-[#585866] bg-[#F2F2F5] px-2 py-0.5 rounded-full">
                    5 Members
                  </span>
                </div>

                <div className="space-y-1.5 mb-4 text-xs">
                  <div className="flex items-center justify-between text-[#585866]">
                    <span>Sound Engineer</span>
                    <span className="font-semibold text-[#1D1D24]">2 Members</span>
                  </div>
                  <div className="flex items-center justify-between text-[#585866]">
                    <span>Lighting Tech</span>
                    <span className="font-semibold text-[#1D1D24]">2 Members</span>
                  </div>
                  <div className="flex items-center justify-between text-[#585866]">
                    <span>Camera Operator</span>
                    <span className="font-semibold text-[#1D1D24]">1 Member</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#F0F0F3] space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[#8E8E9C]">Shift Length</span>
                    <span className="font-semibold text-[#1D1D24]">Full Day (8–12 hrs)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#8E8E9C]">Experience</span>
                    <span className="font-bold text-[#1D1D24]">3–5 Years</span>
                  </div>
                </div>
              </div>
            </div>
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
                    className="w-full group-hover:bg-[var(--color-primary)] group-hover:text-white group-hover:border-[var(--color-primary)] transition-all rounded-2xl font-semibold"
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
      <section id="how-it-works" className="py-20 bg-white/70 border-t border-[#E8E8ED]">
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
                className="flex flex-col p-7 rounded-3xl bg-white border border-[#E8E8ED] shadow-subtle"
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
              <Button size="lg" className="px-8 shadow-subtle font-semibold rounded-full">
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
