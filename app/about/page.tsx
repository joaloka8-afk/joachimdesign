'use client'

import { useState, useEffect, useRef } from 'react'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import type { Metadata } from 'next'

/* ---- shared hooks ---- */
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

const OsloClock = () => {
  const [time, setTime] = useState('--:--')
  useEffect(() => {
    const update = () =>
      setTime(
        new Intl.DateTimeFormat('nb-NO', {
          hour: '2-digit', minute: '2-digit',
          hour12: false, timeZone: 'Europe/Oslo',
        }).format(new Date())
      )
    update()
    const id = setInterval(update, 30000)
    return () => clearInterval(id)
  }, [])
  return <span className="font-mono tabular-nums">{time}</span>
}

/* ---- header ---- */
const Header = () => (
  <header className="fixed top-0 inset-x-0 z-50 border-b border-[var(--border)] bg-[var(--paper)]/85 backdrop-blur-md">
    <div className="max-w-[1200px] mx-auto px-6 lg:px-10 h-14 flex items-center justify-between">
      <a href="/" className="group flex items-baseline font-display text-[22px] tracking-tight">
        <span>joachim</span>
        <span className="text-[var(--pink)] group-hover:scale-150 transition-transform duration-300 origin-bottom inline-block">.</span>
        <span className="text-[var(--ink-muted)] group-hover:text-[var(--ink)] transition-colors">design</span>
      </a>

      <nav className="hidden md:flex items-center gap-7 text-[13px] text-[var(--ink-muted)]">
        {[
          { label: 'Work',     href: '/#work' },
          { label: 'Services', href: '/#services' },
          { label: 'Process',  href: '/#process' },
          { label: 'About',    href: '/about' },
          { label: 'Notes',    href: '/#notes' },
        ].map((item) => (
          <a
            key={item.label}
            href={item.href}
            className={`hover:text-[var(--ink)] transition-colors ${item.href === '/about' ? 'text-[var(--ink)]' : ''}`}
          >
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
          href="/#contact"
          className="group inline-flex items-center gap-1.5 text-[13px] text-[var(--ink)] hover:text-[var(--pink)] transition-colors"
        >
          <span className="link-underline">Say hi</span>
          <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </div>
  </header>
)

/* ---- stack items ---- */
const stack = [
  { category: 'Frontend',   items: ['React', 'Next.js', 'TypeScript', 'Tailwind'] },
  { category: 'Backend',    items: ['Node.js', 'Python', 'Postgres', 'Redis'] },
  { category: 'AI / Agents',items: ['LangGraph', 'OpenAI SDK', 'Anthropic SDK', 'custom evals'] },
  { category: 'Infra',      items: ['Railway', 'Vercel', 'Cloudflare', 'AWS (when needed)'] },
]

const values = [
  { n: '01', t: 'Ship first, polish after',   d: "A good thing in production beats a perfect thing in Figma. I bias toward getting something live and iterating from real feedback." },
  { n: '02', t: 'Write it down',               d: "Code is read 10× more than it's written. I write clear names, meaningful commits, and runbooks you can actually follow at 2am." },
  { n: '03', t: 'One client at a time',         d: "When I'm on your project, I'm on your project. No juggling five clients and disappearing for weeks. Weekly demos, a shared channel." },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      <Header />

      <main className="pt-28">
        {/* ---- INTRO ---- */}
        <section className="px-6 lg:px-10 py-16 lg:py-24">
          <div className="max-w-[1200px] mx-auto">
            <Reveal className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--pink)] mb-8">
              [ about ]
            </Reveal>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
              <div className="lg:col-span-7">
                <Reveal as="h1" delay={80} className="font-display text-[clamp(42px,7vw,96px)] leading-[0.97] tracking-[-0.025em] mb-10">
                  Developer.<br /><span className="italic">Not a vendor.</span>
                </Reveal>

                <Reveal delay={180} as="p" className="text-[18px] leading-[1.65] text-[var(--ink)]/80 mb-6 max-w-[580px]">
                  I'm Joachim — a freelance full-stack developer based in Oslo. I've been building things
                  for the web for six years, mostly for founders and small teams who need a developer who
                  can think, not just execute tickets.
                </Reveal>

                <Reveal delay={260} as="p" className="text-[16px] leading-[1.65] text-[var(--ink)]/70 mb-6 max-w-[580px]">
                  My work sits at the overlap of design and engineering. I can take a rough idea, turn it
                  into a working spec, design it in Figma, build it in Next.js, deploy it on Railway, and
                  hand it over with documentation you'll actually read.
                </Reveal>

                <Reveal delay={340} as="p" className="text-[16px] leading-[1.65] text-[var(--ink)]/70 max-w-[580px]">
                  Lately a big chunk of my work involves AI agents — real production systems with evals,
                  observability, and proper error handling. Not demos, not wrappers. Agents that do actual
                  work and don't cost a fortune in wasted inference.
                </Reveal>
              </div>

              <Reveal delay={200} className="lg:col-span-5 lg:sticky lg:top-28">
                <div className="bg-[var(--paper-warm)] border border-[var(--border-strong)] p-6 lg:p-8">
                  <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--ink-subtle)] mb-5">
                    Quick facts
                  </div>
                  {[
                    { k: 'Location',    v: 'Oslo, Norway (59.91°N)' },
                    { k: 'Available',   v: '1 slot open — June 2026' },
                    { k: 'Experience',  v: '6 years freelance' },
                    { k: 'Languages',   v: 'Norwegian, English' },
                    { k: 'Time zone',   v: 'CET/CEST (UTC+1/+2)' },
                    { k: 'Reply time',  v: '< 24h weekdays' },
                  ].map(({ k, v }) => (
                    <div key={k} className="flex items-start justify-between gap-4 py-3 border-b border-[var(--border)] last:border-0">
                      <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--ink-subtle)]">{k}</span>
                      <span className="text-[13px] text-[var(--ink)]/85 text-right">{v}</span>
                    </div>
                  ))}
                  <a
                    href="/#contact"
                    className="mt-6 flex items-center justify-center gap-2 bg-[var(--ink)] text-[var(--paper)] px-5 py-3 text-[13px] font-medium rounded-full hover:bg-[var(--pink)] transition-colors w-full"
                  >
                    Start a conversation
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ---- VALUES ---- */}
        <section className="px-6 lg:px-10 py-16 lg:py-24 border-t border-[var(--border)] bg-[var(--paper-warm)]">
          <div className="max-w-[1200px] mx-auto">
            <Reveal className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--pink)] mb-14">
              [ how i work ]
            </Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-[var(--border)] border border-[var(--border)]">
              {values.map((v, i) => (
                <Reveal key={v.n} delay={i * 90}>
                  <div className="bg-[var(--paper)] p-7 lg:p-8 group hover:bg-[var(--paper-warm)] transition-colors duration-500 h-full flex flex-col">
                    <div className="font-display text-[48px] leading-none text-[var(--ink)]/20 group-hover:text-[var(--pink)] transition-colors duration-500 mb-6">
                      {v.n}
                    </div>
                    <h3 className="font-display text-[24px] leading-tight mb-4">{v.t}</h3>
                    <p className="text-[14px] leading-[1.65] text-[var(--ink)]/70 flex-1">{v.d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---- STACK ---- */}
        <section className="px-6 lg:px-10 py-16 lg:py-24 border-t border-[var(--border)]">
          <div className="max-w-[1200px] mx-auto">
            <Reveal className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--pink)] mb-14">
              [ stack ]
            </Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-px bg-[var(--border)] border border-[var(--border)]">
              {stack.map((s, i) => (
                <Reveal key={s.category} delay={i * 80}>
                  <div className="bg-[var(--paper)] p-6 lg:p-7 group hover:bg-[var(--paper-warm)] transition-colors duration-500">
                    <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--pink)] mb-5">
                      {s.category}
                    </div>
                    <ul className="space-y-2.5">
                      {s.items.map((item) => (
                        <li key={item} className="text-[15px] text-[var(--ink)]/85 font-display">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---- CTA ---- */}
        <section className="px-6 lg:px-10 py-20 lg:py-28 border-t border-[var(--border)]">
          <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-8 lg:gap-16 items-start lg:items-end justify-between">
            <Reveal>
              <div className="font-display text-[clamp(36px,6vw,72px)] leading-[1] tracking-[-0.025em]">
                Heard enough?<br /><span className="italic">Let's build something.</span>
              </div>
            </Reveal>
            <Reveal delay={120} className="flex flex-col gap-4">
              <a
                href="/#contact"
                className="group inline-flex items-center gap-3 bg-[var(--ink)] text-[var(--paper)] px-7 py-4 text-[14px] font-medium rounded-full hover:bg-[var(--pink)] transition-colors whitespace-nowrap"
              >
                Start a project
                <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a href="/" className="inline-flex items-center gap-2 text-[13px] text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors">
                <ArrowLeft size={13} />
                <span className="link-underline">Back to home</span>
              </a>
            </Reveal>
          </div>
        </section>
      </main>

      {/* ---- FOOTER ---- */}
      <footer className="px-6 lg:px-10 pt-12 pb-8 border-t border-[var(--border)]">
        <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
          <div className="flex flex-col gap-1">
            <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--ink-subtle)]">
              © 2026 · joachim.design · ENK · Oslo, Norway
            </div>
          </div>
          <div className="flex items-center gap-6 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--ink-subtle)]">
            <span className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-[var(--olive)] animate-pulse-dot" />
              Oslo · <OsloClock />
            </span>
            <a href="/imprint" className="hover:text-[var(--ink)] transition-colors">Imprint</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
