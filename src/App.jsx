import { useEffect, useMemo, useState } from 'react'

// Simple, friendly badge
function Badge({ children, tone = 'emerald' }) {
  const tones = useMemo(
    () => ({
      emerald: 'bg-emerald-500/15 text-emerald-300 ring-emerald-500/30',
      indigo: 'bg-indigo-500/15 text-indigo-300 ring-indigo-500/30',
      amber: 'bg-amber-500/15 text-amber-300 ring-amber-500/30',
      sky: 'bg-sky-500/15 text-sky-300 ring-sky-500/30',
      slate: 'bg-slate-700/60 text-slate-300 ring-slate-500/30',
      rose: 'bg-rose-500/15 text-rose-300 ring-rose-500/30',
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
  )
}

function FeatureCard({ title, desc, emoji }) {
  return (
    <div className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 hover:bg-white/[0.05] transition-colors">
      <div className="text-3xl mb-3 select-none">{emoji}</div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 text-slate-300 leading-relaxed">{desc}</p>
    </div>
  )
}

function Stat({ label, value }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 text-center">
      <div className="text-2xl font-extrabold text-white">{value}</div>
      <div className="mt-1 text-slate-400 text-sm">{label}</div>
    </div>
  )
}

function ModrinthIcon({ className = 'h-5 w-5' }) {
  // Stylized Modrinth-like glyph (not official logo)
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="4" fill="#24d07a" />
      <path d="M7 17V7h3.5l2 3 2-3H18v10h-2V10.8l-2 3-2-3V17H7z" fill="#0b1f14" />
    </svg>
  )
}

// Tabs primitive
function Tabs({ tabs, value, onChange }) {
  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 bg-white/[0.03] p-1 rounded-xl border border-white/10 w-full">
        {tabs.map((t) => (
          <button
            key={t.value}
            onClick={() => onChange(t.value)}
            className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              value === t.value
                ? 'bg-emerald-500 text-slate-950'
                : 'text-slate-300 hover:bg-white/10'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
  )
}

// Toggle switch
function Switch({ checked, onChange, label }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer select-none">
      <span className="text-slate-300 text-sm">{label}</span>
      <span
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          checked ? 'bg-emerald-500' : 'bg-white/10'
        }`}
        onClick={() => onChange(!checked)}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
            checked ? 'translate-x-5' : 'translate-x-1'
          }`}
        />
      </span>
    </label>
  )
}

// Slider
function Slider({ value, onChange, min = 0, max = 100, step = 1 }) {
  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full accent-emerald-500"
    />
  )
}

// Select
function Select({ value, onChange, options }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
    >
      {options.map((o) => (
        <option className="bg-slate-900" key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  )
}

// Input
function Input({ value, onChange, placeholder }) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
    />
  )
}

// TextArea
function TextArea({ value, onChange, rows = 4 }) {
  return (
    <textarea
      rows={rows}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
    />
  )
}

// Command GUI core
function CommandGUI() {
  const [mode, setMode] = useState('current') // current | coords
  const [x, setX] = useState('')
  const [y, setY] = useState('')
  const [z, setZ] = useState('')
  const [duration, setDuration] = useState(60) // minutes
  const [world, setWorld] = useState('overworld')
  const [limit, setLimit] = useState(2)
  const [notify, setNotify] = useState(true)
  const [name, setName] = useState('Farm Loader')
  const [notes, setNotes] = useState('Keeps the pumpkin farm active while offline.')
  const [presets, setPresets] = useState([])

  // load presets
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('cl_presets') || '[]')
      setPresets(stored)
    } catch (e) {
      // ignore
    }
  }, [])

  // save presets
  const savePreset = () => {
    const preset = {
      id: crypto.randomUUID(),
      mode,
      coords: { x, y, z },
      duration,
      world,
      limit,
      notify,
      name,
      notes,
      createdAt: Date.now(),
    }
    const next = [preset, ...presets].slice(0, 20)
    setPresets(next)
    localStorage.setItem('cl_presets', JSON.stringify(next))
  }

  const deletePreset = (id) => {
    const next = presets.filter((p) => p.id !== id)
    setPresets(next)
    localStorage.setItem('cl_presets', JSON.stringify(next))
  }

  const command = useMemo(() => {
    const base = ['/chunkloader', 'set']
    if (mode === 'coords' && x && y && z) base.push(x, y, z)
    if (world && world !== 'overworld') base.push(`--world ${world}`)
    if (duration) base.push(`--minutes ${duration}`)
    if (limit) base.push(`--limit ${limit}`)
    if (notify === false) base.push('--silent')
    if (name) base.push(`--name "${name}"`)
    return base.join(' ')
  }, [mode, x, y, z, world, duration, limit, notify, name])

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-6">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <Tabs
              value={mode}
              onChange={setMode}
              tabs={[
                { value: 'current', label: 'Use Current Chunk' },
                { value: 'coords', label: 'Pick Coordinates' },
              ]}
            />
            <Badge tone="sky">Paper 1.21.x</Badge>
          </div>

          {mode === 'coords' && (
            <div className="mt-6 grid sm:grid-cols-3 gap-3">
              <Input value={x} onChange={setX} placeholder="x" />
              <Input value={y} onChange={setY} placeholder="y" />
              <Input value={z} onChange={setZ} placeholder="z" />
            </div>
          )}

          <div className="mt-6 grid sm:grid-cols-2 gap-6">
            <div>
              <label className="text-sm text-slate-400">World</label>
              <div className="mt-2">
                <Select
                  value={world}
                  onChange={setWorld}
                  options={[
                    { label: 'Overworld', value: 'overworld' },
                    { label: 'Nether', value: 'the_nether' },
                    { label: 'End', value: 'the_end' },
                  ]}
                />
              </div>
            </div>
            <div>
              <label className="text-sm text-slate-400">Duration (minutes)</label>
              <div className="mt-2">
                <Slider value={duration} onChange={setDuration} min={5} max={720} step={5} />
                <div className="mt-1 text-sm text-slate-400">{duration} min</div>
              </div>
            </div>
          </div>

          <div className="mt-6 grid sm:grid-cols-2 gap-6">
            <div>
              <label className="text-sm text-slate-400">Per-player limit</label>
              <div className="mt-2">
                <Slider value={limit} onChange={setLimit} min={1} max={10} step={1} />
                <div className="mt-1 text-sm text-slate-400">{limit} loaders</div>
              </div>
            </div>
            <div className="flex items-end">
              <Switch checked={notify} onChange={setNotify} label="Notify on create/remove" />
            </div>
          </div>

          <div className="mt-6 grid sm:grid-cols-2 gap-6">
            <div>
              <label className="text-sm text-slate-400">Name</label>
              <div className="mt-2"><Input value={name} onChange={setName} placeholder="Name your loader" /></div>
            </div>
            <div>
              <label className="text-sm text-slate-400">Notes</label>
              <div className="mt-2"><TextArea value={notes} onChange={setNotes} rows={2} /></div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="text-xs uppercase tracking-wider text-emerald-300">Command Preview</div>
              <code className="mt-1 block rounded-lg bg-black/40 px-3 py-2 text-emerald-200 whitespace-pre-wrap break-words">{command}</code>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => navigator.clipboard.writeText(command)}
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 text-slate-950 px-4 py-2 font-semibold hover:brightness-95"
              >
                Copy
              </button>
              <button
                onClick={savePreset}
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.02] px-4 py-2 font-semibold text-white hover:bg-white/[0.05]"
              >
                Save Preset
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h3 className="font-semibold text-white">Saved presets</h3>
          <p className="mt-1 text-sm text-slate-400">Quickly reuse your common setups.</p>
          {presets.length === 0 ? (
            <p className="mt-4 text-slate-400">No presets yet. Configure a loader and click "Save Preset".</p>
          ) : (
            <ul className="mt-4 space-y-3">
              {presets.map((p) => (
                <li key={p.id} className="rounded-lg border border-white/10 bg-white/[0.02] p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-medium text-white">{p.name || 'Preset'}</div>
                      <div className="text-xs text-slate-400">{new Date(p.createdAt).toLocaleString()}</div>
                      <div className="mt-2 text-sm text-slate-300 break-words">
                        /chunkloader set {p.mode === 'coords' && p.coords?.x && p.coords?.y && p.coords?.z ? `${p.coords.x} ${p.coords.y} ${p.coords.z} ` : ''}
                        {p.world && p.world !== 'overworld' ? `--world ${p.world} ` : ''}
                        {p.duration ? `--minutes ${p.duration} ` : ''}
                        {p.limit ? `--limit ${p.limit} ` : ''}
                        {p.notify === false ? '--silent ' : ''}
                        {p.name ? `--name "${p.name}"` : ''}
                      </div>
                      {p.notes && <div className="mt-2 text-xs text-slate-400">{p.notes}</div>}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => navigator.clipboard.writeText(
                          ['/chunkloader', 'set']
                            .concat(p.mode === 'coords' && p.coords?.x && p.coords?.y && p.coords?.z ? [p.coords.x, p.coords.y, p.coords.z] : [])
                            .concat(p.world && p.world !== 'overworld' ? [`--world ${p.world}`] : [])
                            .concat(p.duration ? [`--minutes ${p.duration}`] : [])
                            .concat(p.limit ? [`--limit ${p.limit}`] : [])
                            .concat(p.notify === false ? ['--silent'] : [])
                            .concat(p.name ? [`--name "${p.name}"`] : [])
                            .join(' ')
                        )}
                        className="rounded-md bg-emerald-500 text-slate-950 px-3 py-1.5 text-sm font-semibold hover:brightness-95"
                      >
                        Copy
                      </button>
                      <button
                        onClick={() => deletePreset(p.id)}
                        className="rounded-md border border-white/10 bg-white/[0.02] px-3 py-1.5 text-sm font-semibold text-white hover:bg-white/[0.05]"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h3 className="font-semibold text-white">Quick tips</h3>
          <ul className="mt-3 list-disc pl-5 text-slate-300 space-y-2">
            <li>Use names that describe the build (e.g., "Iron Farm East").</li>
            <li>Set a reasonable time limit to avoid forgotten loaders.</li>
            <li>Keep Nether and End loaders restricted to trusted roles.</li>
          </ul>
        </div>
      </div>
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
            <a href="#gui" className="hover:text-white">GUI</a>
            <a href="#perms" className="hover:text-white">Permissions</a>
            <a href="#limits" className="hover:text-white">Limits</a>
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
            <div className="mb-4 flex items-center gap-2 flex-wrap">
              <Badge tone="indigo">For Paper MC 1.21.x</Badge>
              <Badge tone="amber">Admin-first</Badge>
              <Badge tone="emerald">Farm-friendly</Badge>
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white">
              /chunkloader — elegant admin control
            </h1>
            <p className="mt-5 text-lg sm:text-xl leading-8 text-slate-300">
              Power a chosen spot or chunk to stay active. Configure everything in an easy, in-game GUI — no guesswork, no messy commands.
            </p>
            <p className="mt-3 text-slate-400">Crafted by a solo developer, <span className="font-semibold text-white">senzore</span>.</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#download" className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 text-slate-950 px-5 py-3 font-semibold shadow-lg shadow-emerald-500/25 hover:brightness-95">
                <ModrinthIcon className="h-6 w-6" />
                Modrinth — SOON
              </a>
              <a href="#gui" className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.02] px-5 py-3 font-semibold text-white hover:bg-white/[0.05]">
                Open GUI Preview
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats / badges */}
      <section className="mx-auto max-w-6xl px-4 py-6" id="badges">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Stat value="1.21.x" label="Paper Ready" />
          <Stat value="GUI" label="In-Game Controls" />
          <Stat value="Low" label="Overhead" />
          <Stat value="1 Dev" label="Built by senzore" />
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-6xl px-4 pb-2 sm:pb-4">
        <SectionTitle
          kicker="Why ChunkLoader"
          title="Keep the important stuff ticking"
          subtitle="Precise controls, guardrails, and performance-friendly design."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <FeatureCard emoji="🧭" title="Point & load" desc="Use current chunk or type exact coordinates in a couple of clicks." />
          <FeatureCard emoji="🔐" title="Role-aware" desc="Grant creation and management to trusted roles only." />
          <FeatureCard emoji="⏱️" title="Timed loaders" desc="Auto-expire after minutes or hours to prevent forgotten loaders." />
          <FeatureCard emoji="🌍" title="World rules" desc="Allow or deny loaders per world for safer policies." />
          <FeatureCard emoji="📣" title="Clear feedback" desc="Readable messages for create, list, and remove." />
          <FeatureCard emoji="⚡" title="Predictable TPS" desc="Lightweight scheduling and sensible defaults." />
        </div>
      </section>

      {/* GUI Builder */}
      <section id="gui" className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
        <SectionTitle
          kicker="In‑game GUI"
          title="Easy configured commands — stored in the GUI"
          subtitle="Build your /chunkloader actions visually. Copy the exact command if you want, or just click in the menu."
        />
        <div className="mt-10">
          <CommandGUI />
        </div>
      </section>

      {/* Permissions Matrix */}
      <section id="perms" className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
        <SectionTitle
          kicker="Permissions"
          title="Granular admin control"
          subtitle="Define who creates, who manages, and where they can do it."
        />
        <div className="mt-8 grid sm:grid-cols-3 gap-6">
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
            <h3 className="font-semibold text-white">Create</h3>
            <p className="mt-2 text-slate-300">Allow chosen roles to create loaders via GUI or command.</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
            <h3 className="font-semibold text-white">Manage</h3>
            <p className="mt-2 text-slate-300">List, rename, extend, and remove — with audit-friendly logs.</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
            <h3 className="font-semibold text-white">Scope</h3>
            <p className="mt-2 text-slate-300">World allow/deny lists and per-role caps keep things safe.</p>
          </div>
        </div>
      </section>

      {/* Limits & Guardrails */}
      <section id="limits" className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
        <SectionTitle
          kicker="Guardrails"
          title="Built to be predictable"
          subtitle="Keep farms running without risking server health."
        />
        <div className="mt-8 grid sm:grid-cols-2 gap-6">
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
            <h3 className="font-semibold text-white">Caps & quotas</h3>
            <p className="mt-2 text-slate-300">Per-player and per-role limits, plus optional expirations.</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
            <h3 className="font-semibold text-white">Server-friendly</h3>
            <p className="mt-2 text-slate-300">Lightweight tick hooks and batched updates reduce churn.</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
        <SectionTitle kicker="Good to know" title="FAQ" subtitle="Quick answers for server owners and admins" />
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
            <h3 className="font-semibold text-white">Is it compatible with 1.21.x?</h3>
            <p className="mt-2 text-slate-300">Yes — built for Paper MC 1.21.x.</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
            <h3 className="font-semibold text-white">Where can I download it?</h3>
            <p className="mt-2 text-slate-300">It will be available on Modrinth soon.</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
            <h3 className="font-semibold text-white">Who builds it?</h3>
            <p className="mt-2 text-slate-300">Developed by one developer: <span className="font-semibold text-white">senzore</span>.</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
            <h3 className="font-semibold text-white">Will there be docs?</h3>
            <p className="mt-2 text-slate-300">Yes — setup, permissions, and config examples ship with release.</p>
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
            <Badge tone="emerald">Modrinth: SOON</Badge>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
