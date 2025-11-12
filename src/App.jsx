import { useMemo } from 'react'

function Badge({ children, tone = 'emerald' }) {
  const tones = useMemo(
    () => ({
      emerald: 'bg-emerald-500/15 text-emerald-300 ring-emerald-500/30',
      indigo: 'bg-indigo-500/15 text-indigo-300 ring-indigo-500/30',
      amber: 'bg-amber-500/15 text-amber-300 ring-amber-500/30',
      slate: 'bg-slate-700/60 text-slate-300 ring-slate-500/30',
      sky: 'bg-sky-500/15 text-sky-300 ring-sky-500/30',
    }),
    []
  )
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium ring-1 ring-inset ${tones[tone]}`}>
      {children}
    </span>
  )
}

function SectionTitle({ kicker, title, subtitle }) {
  return (
    <div className="text-center max-w-3xl mx-auto">
      {kicker && (
        <div className="mb-3">
          <Badge tone="indigo">{kicker}</Badge>
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-lg text-slate-300">{subtitle}</p>
      )}
    </div>
  )}

function FeatureCard({ title, desc, emoji }) {
  return (
    <div className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-sm hover:shadow-md hover:bg-white/[0.05] transition-all">
      <div className="text-3xl mb-3 select-none">{emoji}</div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 text-slate-300 leading-relaxed">{desc}</p>
    </div>
  )
}

function ModrinthIcon({ className = 'h-5 w-5' }) {
  // Simple stylized Modrinth-like glyph (not trademark exact), suitable as a placeholder
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="4" fill="#24d07a" />
      <path d="M7 17V7h3.5l2 3 2-3H18v10h-2V10.8l-2 3-2-3V17H7z" fill="#0b1f14" />
    </svg>
  )
}

function VoxelChunk() {
  // Pure CSS 3D: a floating, rotating voxel chunk made of stacked cubes
  return (
    <div className="relative mx-auto h-[320px] sm:h-[380px] md:h-[420px]">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_rgba(56,189,248,0.15),_transparent_60%)]" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 [perspective:1200px]">
        <div className="relative [transform-style:preserve-3d] animate-[spin_18s_linear_infinite]">
          {Array.from({ length: 4 }).map((_, layer) => (
            <div key={layer} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 [transform-style:preserve-3d]" style={{ transform: `translateZ(${layer * 26 - 26}px)` }}>
              {Array.from({ length: 3 }).map((_, x) => (
                Array.from({ length: 3 }).map((_, y) => (
                  <Cube key={`${layer}-${x}-${y}`} x={x} y={y} layer={layer} />
                ))
              ))}
            </div>
          ))}
          {/* floating particle glows */}
          {Array.from({ length: 18 }).map((_, i) => (
            <span
              key={i}
              className="absolute block rounded-full bg-sky-400/40 blur-[2px]"
              style={{
                width: 6,
                height: 6,
                left: `${10 + (i * 127) % 260}px`,
                top: `${10 + (i * 73) % 220}px`,
                transform: `translateZ(${(i % 6) * 20 - 40}px)`,
                opacity: 0.6,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function Cube({ x, y, layer }) {
  const size = 28
  const baseX = (x - 1) * size
  const baseY = (y - 1) * size
  const depth = layer
  const tint = ['#22d3ee', '#10b981', '#f59e0b', '#38bdf8'][layer] || '#22d3ee'
  const dark = 'rgba(0,0,0,0.45)'

  return (
    <div
      className="absolute [transform-style:preserve-3d]"
      style={{ transform: `translateX(${baseX}px) translateY(${baseY}px) rotateX(60deg) rotateZ(45deg)` }}
    >
      {/* top */}
      <div
        className="absolute"
        style={{
          width: size,
          height: size,
          background: tint,
          transform: `translateZ(${size / 2}px)`,
          opacity: 0.95,
          borderRadius: 4,
          boxShadow: `0 6px 18px rgba(0,0,0,.35)`,
        }}
      />
      {/* left */}
      <div
        className="absolute"
        style={{
          width: size,
          height: size,
          background: dark,
          transform: `rotateY(-90deg) translateZ(${size / 2}px)`,
          filter: 'brightness(0.9)',
          borderRadius: 4,
        }}
      />
      {/* right */}
      <div
        className="absolute"
        style={{
          width: size,
          height: size,
          background: 'rgba(255,255,255,0.06)',
          transform: `rotateX(90deg) translateZ(${size / 2}px)`,
          borderRadius: 4,
        }}
      />
    </div>
  )
}

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-emerald-500/30 selection:text-emerald-100">
      {/* Nav */}
      <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-slate-900/70 bg-slate-900/80 border-b border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 grid place-items-center rounded-md bg-emerald-500 text-slate-950 font-extrabold shadow-lg shadow-emerald-500/20">CL</div>
            <span className="font-semibold text-white">ChunkLoader</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm text-slate-300">
            <a href="#features" className="hover:text-white">Features</a>
            <a href="#visual" className="hover:text-white">3D</a>
            <a href="#how" className="hover:text-white">How</a>
            <a href="#controls" className="hover:text-white">Controls</a>
            <a href="#perf" className="hover:text-white">Performance</a>
            <a href="#faq" className="hover:text-white">FAQ</a>
          </nav>
          <div className="flex items-center gap-3">
            <a
              href="#download"
              className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 text-slate-950 px-4 py-2 font-semibold shadow hover:shadow-emerald-500/30 hover:brightness-95"
            >
              <ModrinthIcon />
              Modrinth — SOON
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-[28rem] w-[28rem] rounded-full bg-sky-500/20 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(56,189,248,0.12),_transparent_45%)]" />
        </div>
        <div className="mx-auto max-w-6xl px-4 pt-16 sm:pt-24 pb-10">
          <div className="max-w-3xl">
            <div className="mb-4"><Badge tone="indigo">For Paper MC 1.21.x</Badge></div>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white">
              /chunkloader for Admins
            </h1>
            <p className="mt-5 text-lg sm:text-xl leading-8 text-slate-300">
              Power your chosen spot or chunk to stay active — ideal for farms, sorters, and the contraptions you need ticking even when players are away.
            </p>
            <p className="mt-3 text-slate-400">Crafted by a solo developer, <span className="font-semibold text-white">senzore</span>.</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#download" className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 text-slate-950 px-5 py-3 font-semibold shadow-lg shadow-emerald-500/25 hover:brightness-95">
                <ModrinthIcon className="h-6 w-6" />
                Modrinth — SOON
              </a>
              <a href="#features" className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.02] px-5 py-3 font-semibold text-white hover:bg-white/[0.05]">
                Explore Features
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Social proof / badges */}
      <section className="mx-auto max-w-6xl px-4 py-6" id="badges">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Badge tone="sky">Paper 1.21.x</Badge>
          <Badge tone="emerald">Lightweight overhead</Badge>
          <Badge tone="slate">Admin-first</Badge>
          <Badge tone="amber">Farm-friendly</Badge>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-6xl px-4 pb-8 sm:pb-12">
        <SectionTitle
          kicker="Why ChunkLoader"
          title="Keep the important stuff ticking"
          subtitle="Precise controls, guardrails, and performance-friendly design."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard
            emoji="🛡️"
            title="Admin-first control"
            desc="Grant access via permissions. Set per-user caps, durations, and world policies to prevent abuse."
          />
          <FeatureCard
            emoji="🌾"
            title="Farm-friendly"
            desc="Keep crop and mob farms, sorters, and storage running while the rest of the server sleeps."
          />
          <FeatureCard
            emoji="🎯"
            title="Precise targeting"
            desc="Lock to the chunk you’re in or specify exact coordinates with simple commands."
          />
          <FeatureCard
            emoji="⚡"
            title="Performance-aware"
            desc="Smart caps, timeouts, and efficient schedulers keep server load predictable."
          />
          <FeatureCard
            emoji="🧭"
            title="Clear feedback"
            desc="Readable messages and logging so you always know what’s loaded and who controls it."
          />
          <FeatureCard
            emoji="🔧"
            title="Paper-ready"
            desc="Built for Paper MC 1.21.x using modern APIs and safe practices."
          />
        </div>
      </section>

      {/* 3D Visual */}
      <section id="visual" className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
        <SectionTitle
          kicker="Visual"
          title="A tiny chunk that never sleeps"
          subtitle="An isometric voxel preview, just for vibes."
        />
        <div className="mt-10 rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-white/[0.02] p-4 sm:p-8">
          <VoxelChunk />
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
        <SectionTitle
          kicker="How it works"
          title="Simple commands, powerful results"
          subtitle="Create, list, and remove persistent chunk loaders with a few clear commands."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
            <h3 className="font-semibold text-white">Command examples</h3>
            <ul className="mt-4 space-y-3 text-slate-300">
              <li><code className="rounded bg-white/10 px-2 py-1">/chunkloader set</code> – keep your current chunk active</li>
              <li><code className="rounded bg-white/10 px-2 py-1">/chunkloader set x y z</code> – target by coordinates</li>
              <li><code className="rounded bg-white/10 px-2 py-1">/chunkloader list</code> – see active loaders you control</li>
              <li><code className="rounded bg-white/10 px-2 py-1">/chunkloader remove</code> – clean up when you’re done</li>
            </ul>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
            <h3 className="font-semibold text-white">Permissions & limits</h3>
            <ul className="mt-4 space-y-3 text-slate-300 list-disc pl-5">
              <li>Permission nodes for create, remove, and manage</li>
              <li>Per-role maximum loaders and optional expirations</li>
              <li>World allow/deny list for safer policies</li>
              <li>Server-friendly defaults you can tune later</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Controls & Management */}
      <section id="controls" className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
        <SectionTitle
          kicker="Management"
          title="Granular admin controls"
          subtitle="Give trusted players power without risking server health."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
            <h3 className="font-semibold text-white">Roles & scopes</h3>
            <p className="mt-2 text-slate-300">Define who can create, extend, or remove loaders. Scope permissions per world or region.</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
            <h3 className="font-semibold text-white">Limits & quotas</h3>
            <p className="mt-2 text-slate-300">Per-player caps and automatic expiry ensure ticking doesn’t spiral out of control.</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
            <h3 className="font-semibold text-white">Audit & insights</h3>
            <p className="mt-2 text-slate-300">Logs and simple listings for quick oversight of what’s active and why.</p>
          </div>
        </div>
      </section>

      {/* Performance */}
      <section id="perf" className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
        <SectionTitle
          kicker="Performance"
          title="Built to be predictable"
          subtitle="Lightweight mechanics and sensible defaults keep your TPS happy."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
            <h3 className="font-semibold text-white">Overhead</h3>
            <p className="mt-2 text-slate-300">Minimal tick hooks and batched updates reduce scheduler churn on busy servers.</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
            <h3 className="font-semibold text-white">Guardrails</h3>
            <p className="mt-2 text-slate-300">Caps, timeouts, and world policies ensure stability even under heavy automation.</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
        <SectionTitle
          kicker="Good to know"
          title="FAQ"
          subtitle="Quick answers for server owners and admins"
        />
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
            <h3 className="font-semibold text-white">Is it compatible with 1.21.x?</h3>
            <p className="mt-2 text-slate-300">Yes — it’s designed for Paper MC 1.21.x specifically.</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
            <h3 className="font-semibold text-white">Where can I download it?</h3>
            <p className="mt-2 text-slate-300">It will be available on Modrinth soon. Keep an eye on this page.</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
            <h3 className="font-semibold text-white">Who builds it?</h3>
            <p className="mt-2 text-slate-300">Everything is developed by one developer: <span className="font-semibold text-white">senzore</span>.</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
            <h3 className="font-semibold text-white">Will there be docs?</h3>
            <p className="mt-2 text-slate-300">Yes. Setup, permissions, and config examples will ship with the first release.</p>
          </div>
        </div>
      </section>

      {/* CTA + Footer */}
      <section id="download" className="mx-auto max-w-6xl px-4 pb-16">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-emerald-500/15 to-sky-500/15 p-8 sm:p-12 text-center">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">Ready when you are</h3>
          <p className="mt-3 text-slate-300">The first release will land on Modrinth soon. Be the first to try it on your server.</p>
          <div className="mt-6 flex justify-center">
            <a className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 text-slate-950 px-6 py-3 font-semibold shadow-lg shadow-emerald-500/25 hover:brightness-95" href="#">
              <ModrinthIcon className="h-6 w-6" />
              Modrinth — SOON
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-slate-950/80">
        <div className="mx-auto max-w-6xl px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-400 text-sm">© {new Date().getFullYear()} ChunkLoader. Built by senzore.</p>
          <div className="flex items-center gap-3">
            <Badge tone="sky">Paper 1.21.x</Badge>
            <Badge tone="emerald">Modrinth — SOON</Badge>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
