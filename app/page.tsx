'use client'

import { useState, useEffect, useRef } from 'react'
import { ArrowRight, ArrowUpRight, Copy, Check, Globe, Workflow, Server, Calendar, Clock, Github, Mail } from 'lucide-react'

/* ============================================================
   HOOKS
   ============================================================ */
const useInView = (options = { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }) => {
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); obs.disconnect() }
    }, options)
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return [ref, visible] as const
}

/* ============================================================
   PRIMITIVES
   ============================================================ */
const Reveal = ({ children, delay = 0, as: Tag = 'div', className = '', ...rest }: any) => {
  const [ref, visible] = useInView()
  return (
    <Tag
      ref={ref}
      className={`r-fade ${visible ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

const RevealLines = ({ lines, delay = 0, lineDelay = 110, className = '' }: any) => {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  return (
    <span className={className}>
      {lines.map((line: any, i: number) => (
        <span key={i} className="reveal-mask block">
          <span
            className={`reveal-line ${mounted ? 'is-visible' : ''}`}
            style={{ animationDelay: `${delay + i * lineDelay}ms` }}
          >
            {line}
          </span>
        </span>
      ))}
    </span>
  )
}

const OsloClock = () => {
  const [time, setTime] = useState('--:--')
  useEffect(() => {
    const update = () => {
      setTime(
        new Intl.DateTimeFormat('nb-NO', {
          hour: '2-digit', minute: '2-digit',
          hour12: false, timeZone: 'Europe/Oslo',
        }).format(new Date())
      )
    }
    update()
    const id = setInterval(update, 30000)
    return () => clearInterval(id)
  }, [])
  return <span className="font-mono tabular-nums">{time}</span>
}

/* ============================================================
   SCROLL PROGRESS
   ============================================================ */
const ScrollProgress = () => {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const handle = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0)
    }
    handle()
    window.addEventListener('scroll', handle, { passive: true })
    return () => window.removeEventListener('scroll', handle)
  }, [])
  return (
    <div className="fixed top-0 left-0 right-0 h-px z-[60] pointer-events-none">
      <div className="h-full bg-[var(--pink)]" style={{ width: `${progress}%`, transition: 'width 0.08s linear' }} />
    </div>
  )
}

/* ============================================================
   HEADER
   ============================================================ */
const Header = () => (
  <header className="fixed top-0 inset-x-0 z-50 border-b border-[var(--border)] bg-[var(--paper)]/85 backdrop-blur-md">
    <div className="max-w-[1200px] mx-auto px-6 lg:px-10 h-14 flex items-center justify-between">
      <a href="#" className="group flex items-baseline font-display text-[22px] tracking-tight">
        <span>joachim</span>
        <span className="text-[var(--pink)] group-hover:scale-150 transition-transform duration-300 origin-bottom inline-block">.</span>
        <span className="text-[var(--ink-muted)] group-hover:text-[var(--ink)] transition-colors">design</span>
      </a>

      <nav className="hidden md:flex items-center gap-7 text-[13px] text-[var(--ink-muted)]">
        {[
          { label: 'Work',     href: '#work' },
          { label: 'Services', href: '#services' },
          { label: 'Process',  href: '#process' },
          { label: 'About',    href: '/about' },
          { label: 'Notes',    href: '#notes' },
        ].map((item) => (
          <a key={item.label} href={item.href} className="hover:text-[var(--ink)] transition-colors">
            {item.label}
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-1.5 font-mono text-[11px] text-[var(--ink-muted)]">
          <span className="size-1.5 rounded-full bg-[var(--olive)] animate-pulse-dot" />
          Oslo · <OsloClock />
        </div>
        <a
          href="#contact"
          className="group inline-flex items-center gap-1.5 text-[13px] text-[var(--ink)] hover:text-[var(--pink)] transition-colors"
        >
          <span className="link-underline">Say hi</span>
          <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </div>
  </header>
)

/* ============================================================
   HERO
   ============================================================ */
const Hero = () => (
  <section className="relative pt-28 pb-20 px-6 lg:px-10 overflow-hidden">
    <div className="max-w-[1200px] mx-auto relative">
      <Reveal className="mb-12 flex flex-wrap items-center gap-3">
        <span className="tag text-[var(--olive)] border-[var(--olive)]/40">
          <span className="size-1.5 rounded-full bg-[var(--olive)] animate-pulse-dot" />
          Accepting 1 project · June start
        </span>
        <span className="tag">Based in Oslo · works remotely</span>
        <span className="tag">Freelance · solo studio</span>
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        <div className="lg:col-span-8">
          <h1 className="font-display text-[clamp(48px,9vw,128px)] leading-[0.96] tracking-[-0.025em]">
            <RevealLines
              lines={[
                <>Hi, I'm Joachim.</>,
                <>I build <span className="hand-underline">websites<svg viewBox="0 0 300 12" preserveAspectRatio="none"><path d="M 5 8 Q 80 2, 150 6 T 295 5" /></svg></span>, ship</>,
                <><span className="italic">AI agents</span>, and keep</>,
                <>them alive on <span className="font-mono text-[0.72em] tracking-tight bg-[var(--ink)] text-[var(--paper)] px-3 py-1 inline-block align-middle mt-2">railway</span>.</>,
              ]}
              delay={250}
              lineDelay={140}
            />
          </h1>

          <Reveal delay={1050} as="p" className="mt-10 text-[18px] leading-[1.6] text-[var(--ink)]/78 max-w-[580px]">
            I'm a freelance developer working with founders, small teams, and other agencies. Most of
            what I do sits somewhere between "this needs to look good" and "this needs to actually run in
            production on Monday." I handle both ends and everything between.
          </Reveal>

          <Reveal delay={1200} className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="group inline-flex items-center gap-3 bg-[var(--ink)] text-[var(--paper)] px-6 py-3.5 text-[14px] font-medium rounded-full hover:bg-[var(--pink)] transition-colors"
            >
              Start a project
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#work"
              className="group inline-flex items-center gap-2 text-[14px] text-[var(--ink)]/70 hover:text-[var(--ink)] transition-colors"
            >
              <span className="link-underline">Or see recent work</span>
              <ArrowRight size={14} />
            </a>
          </Reveal>
        </div>

        <Reveal delay={600} className="lg:col-span-4">
          <PortraitCard />
        </Reveal>
      </div>

      <Reveal delay={1400} className="mt-24 border-t border-[var(--border)] pt-6 grid grid-cols-2 lg:grid-cols-4 gap-y-6 gap-x-10">
        <MiniStat n="38" label="Projects shipped" />
        <MiniStat n="6 yrs" label="Full-stack freelance" />
        <MiniStat n="< 24h" label="Reply time · weekdays" />
        <MiniStat n="99.95%" label="Uptime · hosted clients" />
      </Reveal>
    </div>
  </section>
)

const MiniStat = ({ n, label }: { n: string; label: string }) => (
  <div className="flex flex-col gap-1">
    <span className="font-display text-[36px] leading-none">{n}</span>
    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--ink-subtle)]">{label}</span>
  </div>
)

/* ============================================================
   PORTRAIT CARD
   ============================================================ */
const PortraitCard = () => (
  <div className="relative" style={{ transform: 'rotate(1.5deg)' }}>
    <div className="absolute -top-6 -left-2 font-hand text-[22px] text-[var(--pink)] -rotate-6 z-10 pointer-events-none">
      ← that's me
    </div>

    <div className="bg-[var(--paper-warm)] border border-[var(--border-strong)] p-4 pb-6 shadow-[4px_8px_0_rgba(20,18,15,0.08)] hover:shadow-[6px_12px_0_rgba(20,18,15,0.12)] hover:-translate-y-0.5 transition-all duration-500">
      <div className="aspect-[4/5] bg-gradient-to-br from-[var(--pink-soft)] to-[var(--paper-warm)] border border-[var(--border)] relative overflow-hidden mb-4">
        <svg viewBox="0 0 200 250" className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="110" r="85" fill="var(--pink)" opacity="0.12" />
          <path d="M 30 250 Q 30 180, 100 175 Q 170 180, 170 250 Z" fill="var(--ink)" />
          <rect x="88" y="155" width="24" height="25" fill="#C9A88A" />
          <ellipse cx="100" cy="115" rx="42" ry="50" fill="#D9B896" />
          <path d="M 58 95 Q 60 60, 100 55 Q 140 60, 142 95 Q 140 70, 100 68 Q 62 70, 58 95 Z" fill="#2C2419" />
          <path d="M 58 95 Q 60 75, 75 70 L 70 95 Z" fill="#2C2419" />
          <circle cx="85" cy="115" r="2.5" fill="var(--ink)" />
          <circle cx="115" cy="115" r="2.5" fill="var(--ink)" />
          <path d="M 78 106 L 92 105" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" />
          <path d="M 108 105 L 122 106" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" />
          <path d="M 100 120 L 98 132 L 102 132" stroke="var(--ink)" strokeWidth="1" fill="none" opacity="0.5" strokeLinecap="round" />
          <path d="M 88 142 Q 100 148, 112 142" stroke="var(--ink)" strokeWidth="2" fill="none" strokeLinecap="round" />
          <circle cx="85" cy="115" r="10" fill="none" stroke="var(--ink)" strokeWidth="1.2" opacity="0.4" />
          <circle cx="115" cy="115" r="10" fill="none" stroke="var(--ink)" strokeWidth="1.2" opacity="0.4" />
          <line x1="95" y1="115" x2="105" y2="115" stroke="var(--ink)" strokeWidth="1.2" opacity="0.4" />
        </svg>

        <div className="absolute -bottom-3 -right-3 size-20 animate-spin-slow">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <path id="circle-path" d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0" />
            </defs>
            <circle cx="50" cy="50" r="40" fill="var(--ink)" />
            <text fontFamily="JetBrains Mono, monospace" fontSize="8.5" fill="var(--paper)" letterSpacing="1.5">
              <textPath href="#circle-path">
                · AVAILABLE · AVAILABLE · AVAILABLE
              </textPath>
            </text>
            <circle cx="50" cy="50" r="6" fill="var(--pink)" />
          </svg>
        </div>
      </div>

      <div className="flex items-start justify-between px-2">
        <div>
          <div className="font-display text-[22px] leading-tight flex items-baseline">
            <span>joachim</span>
            <span className="text-[var(--pink)]">.</span>
            <span>design</span>
          </div>
          <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--ink-subtle)] mt-0.5">
            Full-stack · freelance
          </div>
        </div>
        <div className="text-right">
          <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--ink-subtle)]">
            Oslo, NO
          </div>
          <div className="font-mono text-[10px] text-[var(--ink-subtle)] mt-0.5">
            59.91°N 10.75°E
          </div>
        </div>
      </div>
    </div>
  </div>
)

/* ============================================================
   MARQUEE
   ============================================================ */
const Marquee = () => {
  const items = [
    'SaaS founders', 'AI startups', 'Other agencies', 'E-commerce brands',
    'Media companies', 'Fintech teams', 'Non-profits', 'Solo operators',
    'Seed-stage teams', 'Dev tool makers', 'Norwegian scaleups',
  ]
  const row = [...items, ...items]
  return (
    <section className="border-y border-[var(--border)] py-5 overflow-hidden relative bg-[var(--paper-warm)]">
      <div className="relative">
        <div className="flex gap-8 animate-marquee whitespace-nowrap items-center">
          {row.map((c, i) => (
            <span key={i} className="inline-flex items-center gap-8">
              <span className="font-display italic text-[26px] text-[var(--ink)]/75">{c}</span>
              <span className="text-[var(--pink)] text-[18px]">✦</span>
            </span>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[var(--paper-warm)] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[var(--paper-warm)] to-transparent" />
      </div>
    </section>
  )
}

/* ============================================================
   SECTION HEADER
   ============================================================ */
const SectionHeader = ({ eyebrow, title, kicker }: any) => (
  <div className="mb-14 lg:mb-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
    <Reveal as="div" className="lg:col-span-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--pink)]">
      {eyebrow}
    </Reveal>
    <Reveal as="h2" delay={100} className="lg:col-span-7 font-display text-[42px] lg:text-[72px] leading-[1] tracking-[-0.02em]">
      {title}
    </Reveal>
    {kicker && (
      <Reveal as="p" delay={200} className="lg:col-span-3 text-[14px] leading-[1.6] text-[var(--ink-muted)]">
        {kicker}
      </Reveal>
    )}
  </div>
)

/* ============================================================
   SERVICES
   ============================================================ */
const services = [
  {
    no: '01',
    icon: Globe,
    title: 'Websites',
    price: 'from 35k NOK',
    desc: "Marketing sites, product landing pages, portfolios, and editorial sites. Design and build — I do both. Fast, accessible, good on mobile. React + Next.js unless there's a reason not to.",
    includes: ['Figma → code', 'CMS setup (Sanity / Payload)', 'Performance budget < 1s LCP', 'Analytics + SEO basics'],
    timeline: '2–4 weeks',
  },
  {
    no: '02',
    icon: Workflow,
    title: 'Agents & workflows',
    price: 'from 60k NOK',
    desc: 'I build AI agents that do actual work — email triage, data enrichment, internal tools, customer-facing chat. Proper evals, proper observability, proper escalation paths. No toy demos.',
    includes: ['LangGraph / custom orchestration', 'Tool integrations', 'Eval harness from day one', 'Cost + latency guardrails'],
    timeline: '3–6 weeks',
  },
  {
    no: '03',
    icon: Server,
    title: 'Railway hosting & infra',
    price: 'from 15k NOK setup',
    desc: "I set up your Railway project properly — services, databases, queues, env vars, preview environments, health checks, alerting. Then I hand it over with runbooks, or I stay on retainer to keep it alive.",
    includes: ['Multi-service setup', 'Postgres / Redis / workers', 'Preview envs on PRs', 'Ongoing retainer optional'],
    timeline: '3–10 days',
  },
]

const Services = () => (
  <section id="services" className="px-6 lg:px-10 py-24 lg:py-32">
    <div className="max-w-[1200px] mx-auto">
      <SectionHeader
        eyebrow="[ what i do ]"
        title={<>Three things. <span className="italic">Done properly.</span></>}
        kicker="I don't try to be everything. Most projects fall into one of these — sometimes two. If you're not sure, ask."
      />
      <div className="space-y-px bg-[var(--border)] border border-[var(--border)]">
        {services.map((s, i) => (
          <Reveal key={s.no} delay={i * 100}>
            <ServiceRow {...s} />
          </Reveal>
        ))}
      </div>
    </div>
  </section>
)

const ServiceRow = ({ no, icon: Icon, title, price, desc, includes, timeline }: any) => (
  <div className="bg-[var(--paper)] p-8 lg:p-12 group hover:bg-[var(--paper-warm)] transition-colors duration-500 relative overflow-hidden">
    <div className="absolute top-0 left-0 right-0 h-px bg-[var(--pink)] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-[900ms] ease-out" />
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
      <div className="lg:col-span-4 flex items-start gap-4">
        <div className="size-12 border border-[var(--border-strong)] rounded-full flex items-center justify-center text-[var(--ink)] group-hover:bg-[var(--ink)] group-hover:text-[var(--paper)] group-hover:border-[var(--ink)] transition-all duration-500 flex-shrink-0 mt-1">
          <Icon size={18} strokeWidth={1.5} />
        </div>
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ink-subtle)] group-hover:text-[var(--pink)] transition-colors mb-1.5">
            {no} / service
          </div>
          <h3 className="font-display text-[40px] lg:text-[52px] leading-[0.95] group-hover:translate-x-1 transition-transform duration-500">
            {title}
          </h3>
          <div className="flex items-center gap-3 mt-3">
            <span className="font-mono text-[12px] text-[var(--ink)]/75">{price}</span>
            <span className="text-[var(--ink-subtle)]">·</span>
            <span className="font-mono text-[12px] text-[var(--ink-muted)] flex items-center gap-1.5">
              <Clock size={11} />
              {timeline}
            </span>
          </div>
        </div>
      </div>
      <div className="lg:col-span-5">
        <p className="text-[15px] leading-[1.7] text-[var(--ink)]/75 max-w-[520px]">{desc}</p>
      </div>
      <div className="lg:col-span-3">
        <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--ink-subtle)] mb-3">Includes</div>
        <ul className="space-y-1.5">
          {includes.map((inc: string) => (
            <li key={inc} className="flex items-start gap-2 text-[13px] text-[var(--ink)]/80">
              <Check size={12} className="mt-1 flex-shrink-0 text-[var(--pink)]" strokeWidth={2.5} />
              <span>{inc}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
    <ArrowUpRight
      size={24}
      className="absolute right-10 top-10 text-[var(--ink-subtle)] opacity-0 translate-x-3 -translate-y-3 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:text-[var(--pink)] transition-all duration-500 hidden lg:block"
    />
  </div>
)

/* ============================================================
   SELECTED WORK
   ============================================================ */
const projects = [
  { year: '2026', name: 'Nordlys Commerce', kind: 'E-commerce · Next.js + Sanity', role: 'design + build',      accent: 'var(--pink)' },
  { year: '2026', name: 'Almanakk AI',       kind: 'Agent system · scheduling',    role: 'full build + ongoing', accent: 'var(--olive)' },
  { year: '2025', name: 'Fjordkart Studio',  kind: 'Portfolio · React + Framer',   role: 'design + build',      accent: 'var(--rust)' },
  { year: '2025', name: 'Brygg Software',    kind: 'SaaS dashboard · retainer',    role: 'hosting + iterative',  accent: 'var(--pink)' },
  { year: '2025', name: 'Tinde Labs',        kind: 'AI workflow · doc processing', role: 'greenfield build',    accent: 'var(--olive)' },
  { year: '2024', name: 'Sagabrev',          kind: 'Newsletter · editorial site',  role: 'design + build',      accent: 'var(--rust)' },
  { year: '2024', name: 'Kveld Studio',      kind: 'Agency site · dark editorial', role: 'design + build',      accent: 'var(--pink)' },
  { year: '2024', name: 'Hav & Heim',        kind: 'Landing page · launch',        role: 'fast turnaround',     accent: 'var(--olive)' },
]

const Work = () => {
  const [hovered, setHovered] = useState<number | null>(null)
  return (
    <section id="work" className="px-6 lg:px-10 py-24 lg:py-32 border-t border-[var(--border)]">
      <div className="max-w-[1200px] mx-auto">
        <SectionHeader
          eyebrow="[ selected work ]"
          title={<>Some recent <span className="italic">projects</span>.</>}
          kicker="A mix of what I can show publicly. Most client work is under NDA — happy to walk through the rest on a call."
        />
        <div className="border-t border-[var(--border)]">
          {projects.map((p, i) => (
            <Reveal key={p.name} delay={i * 50}>
              <div
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className="grid grid-cols-12 gap-4 py-5 lg:py-6 border-b border-[var(--border)] items-baseline group cursor-pointer transition-colors"
                style={{ color: hovered === i ? 'var(--pink)' : 'var(--ink)' }}
              >
                <span className="col-span-2 lg:col-span-1 font-mono text-[12px] text-[var(--ink-subtle)] tabular-nums">{p.year}</span>
                <span className="col-span-6 lg:col-span-4 font-display text-[24px] lg:text-[32px] leading-none transition-transform duration-300" style={{ transform: hovered === i ? 'translateX(8px)' : 'translateX(0)' }}>{p.name}</span>
                <span className="col-span-12 lg:col-span-4 text-[13px] text-[var(--ink-muted)] italic font-display">{p.kind}</span>
                <span className="hidden lg:flex col-span-2 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--ink-subtle)] items-center gap-2">
                  <span className="size-1.5 rounded-full" style={{ background: p.accent }} />
                  {p.role}
                </span>
                <span className="col-span-4 lg:col-span-1 flex justify-end">
                  <ArrowUpRight
                    size={18}
                    className="transition-all duration-300"
                    style={{
                      transform: hovered === i ? 'translate(2px, -2px)' : 'translate(0, 0)',
                      color: hovered === i ? 'var(--pink)' : 'var(--ink-subtle)',
                    }}
                  />
                </span>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={200} className="mt-12 flex items-center gap-3">
          <span className="font-hand text-[20px] text-[var(--ink-muted)] -rotate-2">plus ~30 more</span>
          <span className="text-[var(--pink)] text-[16px]">→</span>
          <a href="#contact" className="text-[14px] text-[var(--ink)] link-underline">Ask me about a specific kind of project</a>
        </Reveal>
      </div>
    </section>
  )
}

/* ============================================================
   PROCESS
   ============================================================ */
const steps = [
  { n: '01', t: 'You send me a message',      d: 'Email, LinkedIn, whatever. Tell me the rough shape of the thing. No formal brief needed. I reply within 24 hours on weekdays.' },
  { n: '02', t: 'We talk for 30 minutes',      d: "A call to figure out if I'm the right person. I'm often not — I'll tell you, and sometimes recommend someone better." },
  { n: '03', t: 'I send you a written proposal', d: 'Scope, timeline, fixed price or T&M, payment schedule. Readable. No 30-page decks. Usually within a few days.' },
  { n: '04', t: 'We ship',                     d: 'Weekly demos, a shared Linear or GitHub project, and a standing Slack channel. You see progress every week, not at the end.' },
  { n: '05', t: 'Handover + optional retainer', d: "Runbooks, docs, a Loom walkthrough. If you want me to stay on to keep things alive — monthly retainer, cancel anytime." },
]

const Process = () => (
  <section id="process" className="px-6 lg:px-10 py-24 lg:py-32 border-t border-[var(--border)] bg-[var(--paper-warm)]">
    <div className="max-w-[1200px] mx-auto">
      <SectionHeader
        eyebrow="[ how we work ]"
        title={<>No calls about calls. <br /><span className="italic">Just the work.</span></>}
        kicker="I've stripped the process down to the things that actually matter. Five steps from 'hello' to shipped."
      />
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-px bg-[var(--border)] border border-[var(--border)]">
        {steps.map((s, i) => (
          <Reveal key={s.n} delay={i * 90}>
            <div className="bg-[var(--paper)] p-6 lg:p-7 h-full group hover:bg-[var(--paper-warm)] transition-colors duration-500 min-h-[260px] flex flex-col">
              <div className="font-display text-[56px] leading-none text-[var(--ink)]/25 group-hover:text-[var(--pink)] transition-colors duration-500 mb-8">{s.n}</div>
              <h3 className="font-display text-[22px] leading-tight mb-3">{s.t}</h3>
              <p className="text-[13px] leading-[1.6] text-[var(--ink)]/70 flex-1">{s.d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
)

/* ============================================================
   TESTIMONIALS
   ============================================================ */
const testimonials = [
  {
    author: 'Mathias L.',
    role: 'co-founder · SaaS (Stockholm)',
    time: '3 days ago',
    text: "joachim just turned around a landing page in 4 days that our in-house team couldn't finish in 6 weeks. and it's good??? bonkers turnaround",
    reaction: '🔥',
    count: 5,
  },
  {
    author: 'Ingrid B.',
    role: 'head of product · agency (Oslo)',
    time: 'last week',
    text: 'we hired joachim to clean up a langgraph agent that kept falling over in prod. he rebuilt it properly with evals in 2 weeks. the retry logic alone saved us ~400k NOK/month in wasted model calls.',
    reaction: '🙏',
    count: 4,
  },
  {
    author: 'Priya K.',
    role: 'solo founder · fintech (Berlin)',
    time: 'may',
    text: 'the railway setup he built for us is still running untouched 8 months later. preview envs on every PR, postgres with pgbouncer, workers on a separate service — the whole thing. a real engineer.',
    reaction: '💯',
    count: 6,
  },
]

const Testimonials = () => (
  <section className="px-6 lg:px-10 py-24 lg:py-32 border-t border-[var(--border)]">
    <div className="max-w-[1200px] mx-auto">
      <SectionHeader
        eyebrow="[ what people say ]"
        title={<>Nice things, from the <span className="italic">Slacks</span>.</>}
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <Reveal key={t.author} delay={i * 120}>
            <SlackQuote {...t} />
          </Reveal>
        ))}
      </div>
    </div>
  </section>
)

const SlackQuote = ({ author, role, time, text, reaction, count }: any) => (
  <div className="bg-[var(--paper-warm)] border border-[var(--border)] p-5 hover:-translate-y-1 hover:shadow-[4px_8px_0_rgba(20,18,15,0.08)] transition-all duration-500 group">
    <div className="flex items-start gap-3 mb-3">
      <div className="size-10 rounded-md bg-[var(--ink)] text-[var(--paper)] flex items-center justify-center font-display text-[18px] flex-shrink-0">
        {author[0]}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2">
          <span className="font-semibold text-[14px] text-[var(--ink)]">{author}</span>
          <span className="font-mono text-[10px] text-[var(--ink-subtle)]">{time}</span>
        </div>
        <div className="text-[11px] text-[var(--ink-muted)] italic truncate">{role}</div>
      </div>
    </div>
    <p className="text-[14px] leading-[1.6] text-[var(--ink)]/90 mb-4">{text}</p>
    <div className="inline-flex items-center gap-1.5 bg-[var(--paper)] border border-[var(--border)] rounded-full px-2 py-0.5 text-[12px] group-hover:scale-110 transition-transform duration-300 origin-left">
      <span>{reaction}</span>
      <span className="font-mono text-[10px] text-[var(--ink-muted)]">{count}</span>
    </div>
  </div>
)

/* ============================================================
   NOW
   ============================================================ */
const Now = () => (
  <section id="notes" className="px-6 lg:px-10 py-24 lg:py-32 border-t border-[var(--border)]">
    <div className="max-w-[1200px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        <div className="lg:col-span-5">
          <Reveal className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--pink)] mb-6">[ /now ]</Reveal>
          <Reveal delay={100} as="h2" className="font-display text-[44px] lg:text-[64px] leading-[1] mb-6">
            What I'm <span className="italic">working on</span>, right now.
          </Reveal>
          <Reveal delay={200} as="p" className="text-[15px] leading-[1.65] text-[var(--ink)]/75 max-w-[420px]">
            Updated whenever I remember to. Think of it as a public changelog for my week.
          </Reveal>
          <Reveal delay={300} className="mt-8 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--ink-subtle)]">
            <Calendar size={12} />
            <span>Last updated · 14 April 2026</span>
          </Reveal>
        </div>

        <Reveal delay={200} className="lg:col-span-7">
          <div className="space-y-6">
            {[
              { state: 'building',  text: 'A small AI agent that reviews my inbox every morning and drafts replies for the boring ones. Currently 73% accuracy on "would Joachim actually send this" — aiming for 90%.' },
              { state: 'migrating', text: "Moving a client's production app from Heroku to Railway. Two services, a Postgres, and a Redis queue. Zero downtime cutover planned for Thursday." },
              { state: 'reading',   text: '"Designing Data-Intensive Applications" (again). Third time. Different stuff lands each pass.' },
              { state: 'drinking',  text: 'An embarrassing amount of filter coffee from Tim Wendelboe. Not sponsored. Sadly.' },
            ].map((n, i) => (
              <div key={i} className="flex items-start gap-4 group">
                <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--ink-subtle)] pt-1.5 min-w-[90px] group-hover:text-[var(--pink)] transition-colors">
                  / {n.state}
                </div>
                <p className="text-[16px] leading-[1.6] text-[var(--ink)]/85 flex-1 border-l-2 border-[var(--border)] group-hover:border-[var(--pink)] pl-5 transition-colors duration-500">
                  {n.text}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  </section>
)

/* ============================================================
   FAQ
   ============================================================ */
const faqs = [
  { q: 'Are you a company or just you?',
    a: "Just me. I run this as a one-person studio. For bigger projects I sometimes bring in a designer or second developer I've worked with for years — you'll always know who's doing what." },
  { q: 'Do you work with agencies?',
    a: 'Yes — about 40% of my work is white-labelled for other agencies. I can sub-contract under your brand, attend client calls as "the developer," or stay fully behind the scenes. No ego.' },
  { q: 'Do you code AND design, or just one?',
    a: "Both, to a point. I do solid product and marketing design. For heavy brand systems or complex illustration work I partner with specialists. I'll tell you up front which camp your project falls in." },
  { q: "What's your stack?",
    a: 'TypeScript, React / Next.js, Node, Python, Postgres. For agents: LangGraph, OpenAI/Anthropic SDKs, custom orchestrations. Hosting on Railway by default, AWS/Vercel/Cloudflare when it makes sense.' },
  { q: 'How do you price?',
    a: "Fixed price for well-scoped work. Time & materials for open-ended or retainer work (rate on request). I'll always give you a written quote before you commit to anything." },
  { q: 'Norwegian only, or international too?',
    a: 'Mostly EU clients, with a handful in the US. I invoice in NOK, EUR, or USD. Contracts in English.' },
]

const FAQ = () => {
  const [open, setOpen] = useState(0)
  return (
    <section className="px-6 lg:px-10 py-24 lg:py-32 border-t border-[var(--border)] bg-[var(--paper-warm)]">
      <div className="max-w-[1000px] mx-auto">
        <SectionHeader
          eyebrow="[ faq ]"
          title={<>Common <span className="italic">questions</span>.</>}
        />
        <div className="border-t border-[var(--border)]">
          {faqs.map((f, i) => (
            <Reveal key={i} delay={i * 60}>
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                className="w-full text-left border-b border-[var(--border)] py-5 group transition-colors"
              >
                <div className="flex items-start justify-between gap-6">
                  <span className={`font-display text-[22px] lg:text-[26px] leading-tight transition-colors ${open === i ? 'text-[var(--pink)]' : 'text-[var(--ink)] group-hover:text-[var(--pink)]'}`}>
                    {f.q}
                  </span>
                  <span className={`font-mono text-[18px] flex-shrink-0 mt-1 transition-transform duration-300 ${open === i ? 'rotate-45 text-[var(--pink)]' : 'text-[var(--ink-subtle)]'}`}>
                    +
                  </span>
                </div>
                <div
                  className="overflow-hidden transition-[max-height,opacity,margin] duration-500"
                  style={{
                    maxHeight: open === i ? '200px' : '0px',
                    opacity: open === i ? 1 : 0,
                    marginTop: open === i ? '14px' : '0px',
                  }}
                >
                  <p className="text-[15px] leading-[1.65] text-[var(--ink)]/75 max-w-[620px]">{f.a}</p>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ============================================================
   CONTACT
   ============================================================ */
const Contact = () => {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard?.writeText('hei@joachim.design')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="contact" className="px-6 lg:px-10 py-28 lg:py-40 border-t border-[var(--border)] relative overflow-hidden">
      <div aria-hidden className="absolute top-20 right-10 font-hand text-[28px] text-[var(--pink)]/70 rotate-6 hidden lg:block">
        ↓ start here ↓
      </div>
      <div className="max-w-[1000px] mx-auto relative">
        <Reveal as="h2" className="font-display text-[clamp(52px,10vw,148px)] leading-[0.95] tracking-[-0.025em] mb-12">
          <RevealLines
            lines={[<>Have a project?</>, <><span className="italic">Let's talk</span>.</>]}
            delay={100}
          />
        </Reveal>

        <Reveal delay={400} className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="group">
            <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--ink-subtle)] mb-3">▸ Email — the best way</div>
            <button
              onClick={copy}
              className="group/b flex items-center gap-3 font-display text-[30px] lg:text-[40px] leading-none text-[var(--ink)] hover:text-[var(--pink)] transition-colors"
            >
              <span className="link-underline">hei@joachim.design</span>
              {copied ? (
                <span className="text-[var(--olive)] text-[14px] font-mono animate-pulse-dot">✓ copied</span>
              ) : (
                <Copy size={18} className="opacity-40 group-hover/b:opacity-100 transition-opacity" />
              )}
            </button>
            <p className="mt-4 text-[14px] text-[var(--ink-muted)] leading-[1.6] max-w-[360px]">
              A paragraph or two about the project, a rough timeline, and whether you have a budget range in mind. That's enough to start.
            </p>
          </div>

          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--ink-subtle)] mb-3">▸ Or find me at</div>
            <ul className="space-y-3">
              {[
                { icon: Github,   label: 'github.com/joachim-design',      h: 'Code and side projects' },
                { icon: Mail,     label: 'linkedin.com/in/joachim-design',  h: 'Boring professional stuff' },
                { icon: Calendar, label: 'cal.com/joachim',                 h: '30-min intro call (free)' },
              ].map((l) => (
                <li key={l.label}>
                  <a href="#" className="group/a flex items-center gap-3 text-[16px] text-[var(--ink)]/85 hover:text-[var(--pink)] transition-colors">
                    <l.icon size={15} className="text-[var(--ink-subtle)] group-hover/a:text-[var(--pink)] transition-colors" />
                    <span className="link-underline font-mono text-[13px]">{l.label}</span>
                    <span className="font-hand text-[16px] text-[var(--ink-muted)] opacity-0 group-hover/a:opacity-100 transition-opacity ml-2">— {l.h}</span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-10 pt-6 border-t border-[var(--border)]">
              <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--ink-subtle)] mb-3">▸ Availability</div>
              <div className="text-[14px] text-[var(--ink)]/85 leading-[1.6]">
                <div className="flex items-center gap-2 mb-1">
                  <span className="size-1.5 rounded-full bg-[var(--olive)] animate-pulse-dot" />
                  <span className="font-medium">1 project slot open — June 2026</span>
                </div>
                <div className="text-[var(--ink-muted)] text-[13px]">
                  Booked solid through May. Short retainer work and weekend emergencies still possible.
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ============================================================
   FOOTER
   ============================================================ */
const Footer = () => (
  <footer className="px-6 lg:px-10 pt-16 pb-8 border-t border-[var(--border)] overflow-hidden">
    <div className="max-w-[1200px] mx-auto">
      <Reveal>
        <div className="font-display text-[clamp(72px,16vw,200px)] leading-[0.9] tracking-[-0.035em] mb-10 select-none flex items-baseline">
          <span>joachim</span>
          <span className="text-[var(--pink)]">.</span>
          <span className="italic">design</span>
        </div>
      </Reveal>
      <div className="pt-8 border-t border-[var(--border)] flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
        <div className="flex flex-col gap-1">
          <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--ink-subtle)]">
            © 2026 · joachim.design · ENK · Oslo, Norway
          </div>
          <div className="font-hand text-[16px] text-[var(--ink-muted)]">built this site myself, obviously</div>
        </div>
        <div className="flex items-center gap-6 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--ink-subtle)]">
          <span className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-[var(--olive)] animate-pulse-dot" />
            Oslo · <OsloClock />
          </span>
          <a href="/imprint" className="hover:text-[var(--ink)] transition-colors">Imprint</a>
          <a href="/rss.xml" className="hover:text-[var(--ink)] transition-colors">RSS</a>
        </div>
      </div>
    </div>
  </footer>
)

/* ============================================================
   PAGE
   ============================================================ */
export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      <ScrollProgress />
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <Work />
        <Process />
        <Testimonials />
        <Now />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
