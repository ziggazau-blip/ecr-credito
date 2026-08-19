import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { motion, useScroll, useSpring, type Variants } from "framer-motion";
import {
  Gift, UserCheck, Sparkles, HandHeart, Scale, Zap,
  Home as HomeIcon, Repeat, TrendingDown, CreditCard, FileSearch, Handshake,
  Mail, Phone, MessageCircle, ArrowUp, ChevronDown, ShieldCheck, Landmark,
  Facebook, Instagram, CheckCircle2, ArrowRight,
} from "lucide-react";
import elisabeteImg from "../assets/elisabete-rocha.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

const WHATSAPP_URL = "https://wa.me/351912230198";
const PHONE = "+351 912 230 198";
const EMAIL = "elisabete@ecrcredito.pt";
const FORM_TO = EMAIL; // destinatário dos pedidos do formulário

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};

function Section({ id, className = "", children }: { id?: string; className?: string; children: React.ReactNode }) {
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={{ show: { transition: { staggerChildren: 0.08 } } }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

function fmtEUR(v: number) {
  return new Intl.NumberFormat("pt-PT", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(v);
}

const FINALIDADES = [
  "Consolidação de Crédito",
  "Veículo Novo",
  "Veículo Usado",
  "Veículo Elétrico Novo",
  "Obras",
  "Férias",
  "Decorações e Mobiliário",
  "Casamento",
  "Educação",
  "Energia Renovável",
  "Saúde",
  "Outros",
] as const;

function Index() {
  const [showTop, setShowTop] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Simulator state
  const [creditType, setCreditType] = useState<"habitacao" | "pessoal">("habitacao");
  const CONFIG = {
    habitacao: { rate: 2.7, min: 25_000, max: 500_000, step: 1_000, minYears: 5, maxYears: 40, defAmount: 125_000, defYears: 30, formTipo: "Crédito Habitação" },
    pessoal: { rate: 6.9, min: 1_000, max: 75_000, step: 500, minYears: 1, maxYears: 10, defAmount: 15_000, defYears: 7, formTipo: "Crédito Pessoal" },
  } as const;
  const cfg = CONFIG[creditType];
  const rate = cfg.rate;
  const [amount, setAmount] = useState<number>(CONFIG.habitacao.defAmount);
  const [years, setYears] = useState<number>(CONFIG.habitacao.defYears);
  const [finalidade, setFinalidade] = useState<string>(FINALIDADES[0]);

  const switchType = (t: "habitacao" | "pessoal") => {
    setCreditType(t);
    setAmount(CONFIG[t].defAmount);
    setYears(CONFIG[t].defYears);
  };

  const { monthly, totalInterest, totalPaid } = useMemo(() => {
    const n = years * 12;
    const i = rate / 100 / 12;
    const m = i === 0 ? amount / n : (amount * i) / (1 - Math.pow(1 + i, -n));
    const total = m * n;
    return { monthly: m, totalInterest: total - amount, totalPaid: total };
  }, [amount, years, rate]);

  // Form
  const [form, setForm] = useState({
    nome: "", telefone: "", email: "",
    tipo: "Crédito Habitação",
    valor: 125_000, prazo: 30, finalidade: FINALIDADES[0] as string, rendimento: "", observacoes: "",
    aceito: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  const prefillFromSimulator = () => {
    setForm(f => ({
      ...f,
      valor: amount,
      prazo: years,
      tipo: cfg.formTipo,
      ...(creditType === "pessoal" ? { finalidade } : {}),
    }));
    document.getElementById("pedido")?.scrollIntoView({ behavior: "smooth" });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.aceito || sending) return;
    setSending(true);
    setSendError(null);
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${FORM_TO}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `Novo pedido — ${form.tipo} — ${form.nome}`,
          _template: "table",
          _captcha: "false",
          Nome: form.nome,
          Telefone: form.telefone,
          Email: form.email,
          "Tipo de crédito": form.tipo,
          ...(form.tipo === "Crédito Pessoal" ? { Finalidade: form.finalidade } : {}),
          "Valor pretendido (€)": form.valor,
          "Prazo (anos)": form.prazo,
          "Rendimento mensal (€)": form.rendimento,
          Observações: form.observacoes || "—",
        }),
      });
      if (!res.ok) throw new Error("falhou");
      setSubmitted(true);
    } catch {
      setSendError("Não foi possível enviar. Tente novamente ou contacte-nos por telefone/WhatsApp.");
    } finally {
      setSending(false);
    }
  };

  const navLinks = [
    { href: "#sobre", label: "Sobre" },
    { href: "#servicos", label: "Serviços" },
    { href: "#simulador", label: "Simulador" },
    { href: "#como-funciona", label: "Como funciona" },
    { href: "#faq", label: "FAQ" },
    { href: "#contactos", label: "Contactos" },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-[color:var(--color-brand-navy)] antialiased scroll-smooth">
      {/* Scroll progress */}
      <motion.div
        style={{ scaleX }}
        className="fixed left-0 top-0 z-50 h-[3px] w-full origin-left bg-[color:var(--color-brand-gold)]"
      />

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-black/5 bg-white/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <a href="#top" className="flex items-baseline gap-2">
            <span className="text-xl font-extrabold tracking-tight text-[color:var(--color-brand-navy)]">ECR</span>
            <span className="text-xl font-light tracking-[0.25em] text-[color:var(--color-brand-gold)]">CRÉDITO</span>
          </a>
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map(l => (
              <a key={l.href} href={l.href} className="text-sm font-medium text-[color:var(--color-brand-navy)]/80 transition-colors hover:text-[color:var(--color-brand-gold)]">
                {l.label}
              </a>
            ))}
            <a href="#pedido" className="rounded-full bg-[color:var(--color-brand-gold)] px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[color:var(--color-brand-gold-soft)]">
              Análise Gratuita
            </a>
          </nav>
          <button
            aria-label="Menu"
            onClick={() => setNavOpen(v => !v)}
            className="grid h-10 w-10 place-items-center rounded-md border border-black/10 md:hidden"
          >
            <span className="i">☰</span>
          </button>
        </div>
        {navOpen && (
          <div className="border-t border-black/5 bg-white md:hidden">
            <div className="mx-auto flex max-w-6xl flex-col px-5 py-3">
              {navLinks.map(l => (
                <a key={l.href} href={l.href} onClick={() => setNavOpen(false)} className="border-b border-black/5 py-3 text-sm font-medium">
                  {l.label}
                </a>
              ))}
              <a href="#pedido" onClick={() => setNavOpen(false)} className="mt-3 rounded-full bg-[color:var(--color-brand-gold)] px-5 py-3 text-center text-sm font-semibold text-white">
                Análise Gratuita
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section id="top" className="relative overflow-hidden bg-[color:var(--color-brand-cream)]">
        <div className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-[color:var(--color-brand-gold)]/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-[color:var(--color-brand-navy)]/5 blur-3xl" />
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:grid-cols-2 md:items-center md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="order-2 md:order-1"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[color:var(--color-brand-gold)]/30 bg-white px-3 py-1 text-xs font-medium text-[color:var(--color-brand-gold)]">
              <ShieldCheck className="h-3.5 w-3.5" />
              Registada no Banco de Portugal · nº 8612
            </div>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-[color:var(--color-brand-navy)] md:text-5xl lg:text-6xl">
              ECR Crédito
              <span className="mt-2 block text-lg font-medium tracking-[0.3em] text-[color:var(--color-brand-gold)] md:text-xl">
                INTERMEDIÁRIA DE CRÉDITO
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-[color:var(--color-brand-navy)]/80 md:text-lg">
              Sou <strong>Elisabete Rocha</strong>, Intermediária de Crédito Vinculada, registada no Banco de Portugal sob o nº 8612.
            </p>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-[color:var(--color-brand-navy)]/70">
              Acompanho clientes em todo o processo de obtenção de crédito, procurando as melhores soluções para cada situação. O meu serviço é <strong>totalmente gratuito</strong> e inclui acompanhamento personalizado desde o primeiro contacto até à assinatura.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#pedido" className="group inline-flex items-center gap-2 rounded-full bg-[color:var(--color-brand-gold)] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[color:var(--color-brand-gold)]/25 transition hover:-translate-y-0.5 hover:bg-[color:var(--color-brand-gold-soft)]">
                Pedir Análise Gratuita
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[color:var(--color-brand-whatsapp)] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:-translate-y-0.5">
                <MessageCircle className="h-4 w-4" /> Falar no WhatsApp
              </a>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative order-1 mx-auto w-full max-w-md md:order-2"
          >
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-[color:var(--color-brand-gold)]/25 to-transparent blur-2xl" />
            <div className="relative overflow-hidden rounded-3xl border border-white shadow-2xl shadow-[color:var(--color-brand-navy)]/15">
              <img
                src={elisabeteImg}
                alt="Elisabete Rocha, Intermediária de Crédito"
                width={912}
                height={1104}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 rounded-2xl bg-white p-4 shadow-xl">
              <div className="text-xs uppercase tracking-widest text-[color:var(--color-brand-navy)]/60">Banco de Portugal</div>
              <div className="mt-1 text-lg font-bold text-[color:var(--color-brand-navy)]">Reg. nº 8612</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sobre */}
      <Section id="sobre" className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <motion.div variants={fadeUp} className="mx-auto max-w-2xl text-center">
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--color-brand-gold)]">Sobre</div>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">Porque escolher a ECR Crédito?</h2>
          <p className="mt-4 text-[color:var(--color-brand-navy)]/70">
            Acompanhamento próximo, transparente e sem custos para o cliente. Um único ponto de contacto do primeiro contacto à assinatura.
          </p>
        </motion.div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: Gift, title: "Serviço Gratuito", text: "Sem custos para o cliente em qualquer fase do processo." },
            { icon: UserCheck, title: "Atendimento Personalizado", text: "Um único ponto de contacto, sempre disponível." },
            { icon: Sparkles, title: "Processo Simples", text: "Reduzimos a burocracia e explicamos cada passo." },
            { icon: HandHeart, title: "Apoio do início ao fim", text: "Acompanhamento até à assinatura da escritura." },
            { icon: Scale, title: "Comparação entre bancos", text: "Analisamos várias propostas para escolher a melhor." },
            { icon: Zap, title: "Resposta rápida", text: "Feedback e decisões em poucos dias úteis." },
          ].map(({ icon: Icon, title, text }) => (
            <motion.div
              key={title}
              variants={fadeUp}
              className="group rounded-2xl border border-black/5 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-[color:var(--color-brand-gold)]/30 hover:shadow-xl hover:shadow-[color:var(--color-brand-navy)]/5"
            >
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-[color:var(--color-brand-navy)] text-[color:var(--color-brand-gold)] transition group-hover:bg-[color:var(--color-brand-gold)] group-hover:text-white">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[color:var(--color-brand-navy)]/70">{text}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Serviços */}
      <Section id="servicos" className="bg-[color:var(--color-brand-cream)]">
        <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
          <motion.div variants={fadeUp} className="mx-auto max-w-2xl text-center">
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--color-brand-gold)]">Serviços</div>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">Soluções de crédito adaptadas a si</h2>
          </motion.div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: HomeIcon, title: "Crédito Habitação", text: "Financie a compra ou construção da sua casa com as melhores condições." },
              { icon: Repeat, title: "Transferência de Crédito Habitação", text: "Reduza a sua prestação transferindo para outro banco." },
              { icon: TrendingDown, title: "Crédito Consolidado", text: "Junte vários créditos num só e alivie o orçamento mensal." },
              { icon: CreditCard, title: "Crédito ao Consumo", text: "Financiamento pessoal, automóvel ou obras em casa." },
              { icon: FileSearch, title: "Análise Gratuita", text: "Estudo detalhado da sua situação, sem custos e sem compromisso." },
              { icon: Handshake, title: "Acompanhamento Personalizado", text: "Desde a simulação à escritura — sempre ao seu lado." },
            ].map(({ icon: Icon, title, text }) => (
              <motion.div
                key={title}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 transition-shadow duration-300 hover:shadow-2xl hover:shadow-[color:var(--color-brand-navy)]/10"
              >
                <div className="absolute right-0 top-0 h-24 w-24 -translate-y-8 translate-x-8 rounded-full bg-[color:var(--color-brand-gold)]/10 transition-transform duration-500 group-hover:scale-150" />
                <div className="relative">
                  <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-[color:var(--color-brand-navy)] to-[color:var(--color-brand-navy-soft)] text-[color:var(--color-brand-gold)]">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-5 text-lg font-bold">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[color:var(--color-brand-navy)]/70">{text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Simulador */}
      <Section id="simulador" className="relative overflow-hidden bg-[color:var(--color-brand-navy)] text-white">
        <div className="pointer-events-none absolute -right-20 top-10 h-96 w-96 rounded-full bg-[color:var(--color-brand-gold)]/20 blur-3xl" />
        <div className="mx-auto max-w-6xl px-5 py-20 md:py-28">
          <motion.div variants={fadeUp} className="mx-auto max-w-2xl text-center">
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--color-brand-gold)]">Simulador</div>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">Simule o seu financiamento</h2>
            <p className="mt-4 text-white/70">Ajuste os valores e veja a estimativa em tempo real. Sem compromisso.</p>
            <div className="mx-auto mt-8 inline-flex rounded-full bg-white/10 p-1 ring-1 ring-white/15">
              {([
                { key: "habitacao", label: "Crédito Habitação" },
                { key: "pessoal", label: "Crédito Pessoal" },
              ] as const).map(t => (
                <button
                  key={t.key}
                  onClick={() => switchType(t.key)}
                  className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                    creditType === t.key
                      ? "bg-[color:var(--color-brand-gold)] text-[color:var(--color-brand-navy)]"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </motion.div>

          <div className="mt-12 grid gap-8 lg:grid-cols-5">
            <motion.div variants={fadeUp} className="lg:col-span-3 rounded-3xl bg-white/5 p-6 backdrop-blur ring-1 ring-white/10 md:p-8">
              <SliderField
                label="Valor do financiamento"
                value={amount}
                min={cfg.min}
                max={cfg.max}
                step={cfg.step}
                onChange={setAmount}
                display={fmtEUR(amount)}
              />
              <div className="mt-8">
                <SliderField
                  label="Prazo"
                  value={years}
                  min={cfg.minYears}
                  max={cfg.maxYears}
                  step={1}
                  onChange={setYears}
                  display={`${years} anos`}
                />
              </div>
              {creditType === "habitacao" ? (
                <div className="mt-8 flex items-center justify-between rounded-2xl bg-white/5 px-5 py-4 ring-1 ring-white/10">
                  <span className="text-sm text-white/70">Taxa de juro (fixa)</span>
                  <span className="text-lg font-bold text-[color:var(--color-brand-gold)]">{rate.toFixed(1)}%</span>
                </div>
              ) : (
                <div className="mt-8">
                  <label className="mb-2 block text-sm font-medium text-white/70">Finalidade</label>
                  <select
                    value={finalidade}
                    onChange={e => setFinalidade(e.target.value)}
                    className="w-full rounded-2xl bg-white/5 px-5 py-4 text-sm font-semibold text-white ring-1 ring-white/15 outline-none transition focus:ring-[color:var(--color-brand-gold)]"
                  >
                    {FINALIDADES.map(f => (
                      <option key={f} value={f} className="text-[color:var(--color-brand-navy)]">{f}</option>
                    ))}
                  </select>
                  <p className="mt-3 text-xs text-white/50">Taxa sob consulta — definida pelo banco após análise. A estimativa apresentada é indicativa.</p>
                </div>
              )}
              <button
                onClick={prefillFromSimulator}
                className="mt-10 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[color:var(--color-brand-gold)] px-6 py-4 text-sm font-semibold text-[color:var(--color-brand-navy)] shadow-lg shadow-[color:var(--color-brand-gold)]/30 transition hover:-translate-y-0.5 hover:bg-[color:var(--color-brand-gold-soft)]"
              >
                Quero pedir este financiamento
                <ArrowRight className="h-4 w-4" />
              </button>
            </motion.div>

            <motion.div variants={fadeUp} className="lg:col-span-2 space-y-4">
              {creditType === "habitacao" ? (
                <>
                  <ResultCard label="Prestação mensal estimada" value={fmtEUR(monthly)} highlight />
                  <ResultCard label="Total de juros" value={fmtEUR(totalInterest)} />
                  <ResultCard label="Total a pagar" value={fmtEUR(totalPaid)} />
                  <p className="text-xs leading-relaxed text-white/50">
                    Valores meramente indicativos, calculados com juros constantes. A proposta final depende da análise do banco.
                  </p>
                </>
              ) : (
                <div className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
                  <p className="text-sm leading-relaxed text-white/80">
                    No Crédito Pessoal a taxa de juro e a prestação mensal são definidas pelo banco após análise do pedido, consoante a finalidade e o perfil do cliente.
                  </p>
                  <p className="mt-3 text-xs text-white/50">
                    Preencha o formulário para receber uma proposta personalizada sem compromisso.
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </Section>

      {/* Como funciona */}
      <Section id="como-funciona" className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <motion.div variants={fadeUp} className="mx-auto max-w-2xl text-center">
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--color-brand-gold)]">Processo</div>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">Como funciona</h2>
        </motion.div>
        <div className="relative mt-14 grid gap-8 md:grid-cols-4">
          <div className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-[color:var(--color-brand-gold)]/40 to-transparent md:block" />
          {[
            { n: "01", title: "Pedido", text: "Preenche o formulário com os seus dados." },
            { n: "02", title: "Análise", text: "É feita uma análise gratuita da sua situação." },
            { n: "03", title: "Comparação", text: "São comparadas propostas dos vários bancos." },
            { n: "04", title: "Aprovação", text: "Acompanhamento até à assinatura da escritura." },
          ].map((s) => (
            <motion.div key={s.n} variants={fadeUp} className="relative">
              <div className="relative z-10 mx-auto grid h-16 w-16 place-items-center rounded-full bg-white text-lg font-bold text-[color:var(--color-brand-navy)] shadow-lg ring-4 ring-[color:var(--color-brand-cream)]">
                {s.n}
              </div>
              <div className="mt-6 rounded-2xl border border-black/5 bg-white p-6 text-center shadow-sm">
                <h3 className="text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-sm text-[color:var(--color-brand-navy)]/70">{s.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Pedido */}
      <Section id="pedido" className="bg-[color:var(--color-brand-cream)]">
        <div className="mx-auto max-w-4xl px-5 py-20 md:py-28">
          <motion.div variants={fadeUp} className="mx-auto max-w-2xl text-center">
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--color-brand-gold)]">Pedido</div>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">Peça a sua análise gratuita</h2>
            <p className="mt-4 text-[color:var(--color-brand-navy)]/70">Preencha o formulário e entrarei em contacto o mais brevemente possível.</p>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-12 rounded-3xl bg-white p-6 shadow-xl shadow-[color:var(--color-brand-navy)]/5 ring-1 ring-black/5 md:p-10">
            {submitted ? (
              <div className="py-12 text-center">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-100 text-emerald-600">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="mt-6 text-2xl font-bold">Pedido recebido</h3>
                <p className="mt-2 text-[color:var(--color-brand-navy)]/70">A sua análise será iniciada em breve.</p>
              </div>
            ) : (
              <form onSubmit={submit} className="grid gap-4 md:grid-cols-2">
                <Field label="Nome"><input required value={form.nome} onChange={e => setForm({ ...form, nome: e.target.value })} className={inputCls} /></Field>
                <Field label="Telefone"><input required type="tel" value={form.telefone} onChange={e => setForm({ ...form, telefone: e.target.value })} className={inputCls} /></Field>
                <Field label="Email" full><input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className={inputCls} /></Field>
                <Field label="Tipo de Crédito" full>
                  <select value={form.tipo} onChange={e => setForm({ ...form, tipo: e.target.value })} className={inputCls}>
                    <option>Crédito Habitação</option>
                    <option>Transferência</option>
                    <option>Consolidado</option>
                    <option>Crédito Pessoal</option>
                  </select>
                </Field>
                {form.tipo === "Crédito Pessoal" && (
                  <Field label="Finalidade" full>
                    <select value={form.finalidade} onChange={e => setForm({ ...form, finalidade: e.target.value })} className={inputCls}>
                      {FINALIDADES.map(f => <option key={f}>{f}</option>)}
                    </select>
                  </Field>
                )}
                <Field label="Valor Pretendido (€)"><input type="number" value={form.valor} onChange={e => setForm({ ...form, valor: Number(e.target.value) })} className={inputCls} /></Field>
                <Field label="Prazo (anos)"><input type="number" value={form.prazo} onChange={e => setForm({ ...form, prazo: Number(e.target.value) })} className={inputCls} /></Field>
                <Field label="Rendimento Mensal (€)" full><input type="number" value={form.rendimento} onChange={e => setForm({ ...form, rendimento: e.target.value })} className={inputCls} /></Field>
                <Field label="Observações" full>
                  <textarea rows={4} value={form.observacoes} onChange={e => setForm({ ...form, observacoes: e.target.value })} className={inputCls} />
                </Field>
                <label className="md:col-span-2 flex items-start gap-3 text-sm text-[color:var(--color-brand-navy)]/80">
                  <input type="checkbox" required checked={form.aceito} onChange={e => setForm({ ...form, aceito: e.target.checked })} className="mt-1 h-4 w-4 accent-[color:var(--color-brand-gold)]" />
                  Li e aceito a <a href="#rgpd" className="underline underline-offset-2">Política de Privacidade</a>.
                </label>
                <div className="md:col-span-2">
                  <button type="submit" disabled={sending} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[color:var(--color-brand-navy)] px-6 py-4 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[color:var(--color-brand-navy-soft)] disabled:opacity-60">
                    {sending ? "A enviar…" : "Enviar Pedido"} <ArrowRight className="h-4 w-4" />
                  </button>
                  {sendError && <p className="mt-3 text-sm text-red-600">{sendError}</p>}
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </Section>

      {/* Contactos */}
      <Section id="contactos" className="mx-auto max-w-6xl px-5 py-20 md:py-28">
        <motion.div variants={fadeUp} className="mx-auto max-w-2xl text-center">
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--color-brand-gold)]">Contactos</div>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">Vamos falar</h2>
        </motion.div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          <ContactCard icon={Mail} title="Email" value={EMAIL} href={`mailto:${EMAIL}`} />
          <ContactCard icon={Phone} title="Telefone" value={PHONE} href="tel:+351912230198" />
          <ContactCard icon={MessageCircle} title="WhatsApp" value="Abrir conversa" href={WHATSAPP_URL} external accent />
        </div>
        <motion.p variants={fadeUp} className="mt-8 text-center text-sm text-[color:var(--color-brand-navy)]/70">
          Atendimento online para todo o território nacional. Atendimento presencial apenas por marcação.
        </motion.p>
        <motion.div variants={fadeUp} className="mt-10 overflow-hidden rounded-3xl shadow-lg ring-1 ring-black/5">
          <iframe
            title="Localização"
            src="https://www.google.com/maps?q=Portugal&output=embed"
            width="100%"
            height="360"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block w-full border-0"
          />
        </motion.div>
      </Section>

      {/* FAQ */}
      <Section id="faq" className="bg-[color:var(--color-brand-cream)]">
        <div className="mx-auto max-w-3xl px-5 py-20 md:py-28">
          <motion.div variants={fadeUp} className="text-center">
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--color-brand-gold)]">FAQ</div>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">Perguntas frequentes</h2>
          </motion.div>
          <div className="mt-10 space-y-3">
            {[
              { q: "O serviço é pago?", a: "Não. É totalmente gratuito para o cliente." },
              { q: "Quanto demora?", a: "Depende do processo, mas normalmente poucos dias úteis para a análise inicial." },
              { q: "Posso pedir só uma simulação?", a: "Sim. Pode pedir apenas uma simulação, sem qualquer compromisso." },
              { q: "Trabalham com vários bancos?", a: "Sim. Comparamos propostas entre as instituições mutuantes com quem trabalhamos." },
            ].map((item, i) => (
              <FAQItem key={i} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </Section>

      {/* Informação Legal */}
      <Section id="legal" className="mx-auto max-w-5xl px-5 py-20 md:py-28">
        <motion.div variants={fadeUp} className="text-center">
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--color-brand-gold)]">Legal</div>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">Informação Legal</h2>
        </motion.div>
        <motion.div variants={fadeUp} className="mt-10 grid gap-6 rounded-3xl border border-black/5 bg-white p-8 shadow-sm md:grid-cols-2 md:p-10">
          <LegalRow title="Estatuto">
            <p>Intermediária de Crédito Vinculada. Registada no Banco de Portugal sob o nº <strong>8612</strong>.</p>
            <p className="mt-2 text-sm text-[color:var(--color-brand-navy)]/60">Nos termos do Decreto-Lei nº 81-C/2017 de 7 de julho.</p>
          </LegalRow>
          <LegalRow title="Categoria">Intermediária de crédito vinculada.</LegalRow>
          <LegalRow title="NIF">215735269</LegalRow>
          <LegalRow title="Mutuantes">
            <ul className="space-y-1">
              <li className="flex items-center gap-2"><Landmark className="h-4 w-4 text-[color:var(--color-brand-gold)]" /> NOVO BANCO</li>
              <li className="flex items-center gap-2"><Landmark className="h-4 w-4 text-[color:var(--color-brand-gold)]" /> BANCO SANTANDER TOTTA</li>
              <li className="flex items-center gap-2"><Landmark className="h-4 w-4 text-[color:var(--color-brand-gold)]" /> CAIXA GERAL DE DEPÓSITOS</li>
              <li className="flex items-center gap-2"><Landmark className="h-4 w-4 text-[color:var(--color-brand-gold)]" /> BANKINTER</li>
            </ul>
          </LegalRow>
          <LegalRow title="Regime de exclusividade">Não.</LegalRow>
          <LegalRow title="Serviços" full>
            Apresentação e proposta de contratos de crédito. Assistência aos consumidores durante todo o processo.
          </LegalRow>
          <LegalRow title="Serviços de consultoria">Não.</LegalRow>
          <LegalRow title="Seguro de Responsabilidade Civil">
            Hiscox S.A. — Sucursal em Portugal.<br />
            Apólices: 2555010 e 2555012.<br />
            Validade: 08/10/2025 a 07/10/2026.
          </LegalRow>
          <LegalRow title="Resolução Alternativa de Litígios" full>
            Em caso de litígio de consumo, o consumidor poderá recorrer ao <strong>CNIACC</strong> ou à <strong>TRIAVE</strong> para resolução alternativa de litígios.
          </LegalRow>
          <div className="md:col-span-2">
            <a
              href="https://www.livroreclamacoes.pt/Inicio/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-brand-navy)] px-5 py-3 text-sm font-semibold text-[color:var(--color-brand-navy)] transition hover:bg-[color:var(--color-brand-navy)] hover:text-white"
            >
              Livro de Reclamações Online <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </motion.div>
      </Section>

      {/* RGPD */}
      <Section id="rgpd" className="bg-[color:var(--color-brand-navy)] text-white">
        <div className="mx-auto max-w-4xl px-5 py-16 text-center">
          <motion.div variants={fadeUp}>
            <div className="text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--color-brand-gold)]">Proteção de Dados</div>
            <h2 className="mt-3 text-2xl font-bold md:text-3xl">RGPD</h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/70">
              Os dados pessoais recolhidos destinam-se exclusivamente à comunicação com os clientes e à análise dos pedidos de crédito, sendo tratados em conformidade com o Regulamento Geral de Proteção de Dados (RGPD).
            </p>
          </motion.div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="bg-[color:var(--color-brand-navy)] text-white/80">
        <div className="mx-auto grid max-w-6xl gap-10 border-t border-white/10 px-5 py-14 md:grid-cols-3">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-extrabold text-white">ECR</span>
              <span className="text-xl font-light tracking-[0.25em] text-[color:var(--color-brand-gold)]">CRÉDITO</span>
            </div>
            <p className="mt-3 text-sm">Elisabete Rocha</p>
            <p className="text-sm text-white/60">Intermediária de Crédito</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-white">Links</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a href="#servicos" className="hover:text-[color:var(--color-brand-gold)]">Serviços</a></li>
              <li><a href="#contactos" className="hover:text-[color:var(--color-brand-gold)]">Contactos</a></li>
              <li><a href="#rgpd" className="hover:text-[color:var(--color-brand-gold)]">Política de Privacidade</a></li>
              <li><a href="https://www.livroreclamacoes.pt/Inicio/" target="_blank" rel="noreferrer" className="hover:text-[color:var(--color-brand-gold)]">Livro de Reclamações</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-white">Siga-nos</h4>
            <div className="mt-4 flex gap-3">
              {[
                { icon: Facebook, href: "#", label: "Facebook" },
                { icon: Instagram, href: "#", label: "Instagram" },
                { icon: MessageCircle, href: WHATSAPP_URL, label: "WhatsApp" },
                { icon: Mail, href: `mailto:${EMAIL}`, label: "Email" },
              ].map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} aria-label={label} target="_blank" rel="noreferrer" className="grid h-10 w-10 place-items-center rounded-full bg-white/10 transition hover:bg-[color:var(--color-brand-gold)] hover:text-[color:var(--color-brand-navy)]">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 py-6 text-center text-xs text-white/50">
          <p>
            A ECR não concede crédito. Atua como intermediária de crédito vinculada, nos termos do Decreto-Lei nº 81-C/2017.
          </p>
          <p className="mt-2">
            © {new Date().getFullYear()} ECR Crédito · NIF 215735269 · Reg. Banco de Portugal nº 8612
          </p>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp"
        className="fixed bottom-6 right-6 z-40 grid h-14 w-14 place-items-center rounded-full bg-[color:var(--color-brand-whatsapp)] text-white shadow-2xl shadow-emerald-500/30 transition hover:scale-105"
      >
        <MessageCircle className="h-6 w-6" />
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--color-brand-whatsapp)] opacity-30" />
      </a>

      {/* Back to top */}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Voltar ao topo"
          className="fixed bottom-24 right-6 z-40 grid h-11 w-11 place-items-center rounded-full bg-[color:var(--color-brand-navy)] text-white shadow-lg transition hover:-translate-y-0.5"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}

const inputCls =
  "w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-[color:var(--color-brand-navy)] outline-none transition focus:border-[color:var(--color-brand-gold)] focus:ring-2 focus:ring-[color:var(--color-brand-gold)]/20";

function Field({ label, children, full }: { label: string; children: React.ReactNode; full?: boolean }) {
  return (
    <label className={`flex flex-col gap-1.5 ${full ? "md:col-span-2" : ""}`}>
      <span className="text-xs font-semibold uppercase tracking-wider text-[color:var(--color-brand-navy)]/60">{label}</span>
      {children}
    </label>
  );
}

function SliderField({
  label, value, min, max, step, onChange, display,
}: {
  label: string; value: number; min: number; max: number; step: number; onChange: (n: number) => void; display: string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="text-xs font-semibold uppercase tracking-widest text-white/60">{label}</span>
        <span className="text-3xl font-extrabold text-[color:var(--color-brand-gold)] md:text-4xl">{display}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="ecr-slider mt-4 w-full"
        style={{
          background: `linear-gradient(to right, var(--color-brand-gold) 0%, var(--color-brand-gold) ${pct}%, rgba(255,255,255,0.15) ${pct}%, rgba(255,255,255,0.15) 100%)`,
        }}
      />
      <div className="mt-2 flex justify-between text-xs text-white/50">
        <span>{typeof min === "number" && min >= 1000 ? fmtEUR(min) : min}</span>
        <span>{typeof max === "number" && max >= 1000 ? fmtEUR(max) : max}</span>
      </div>
    </div>
  );
}

function ResultCard({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`rounded-2xl p-6 ring-1 ${highlight ? "bg-[color:var(--color-brand-gold)] text-[color:var(--color-brand-navy)] ring-transparent shadow-xl" : "bg-white/5 text-white ring-white/10"}`}>
      <div className={`text-xs font-semibold uppercase tracking-widest ${highlight ? "text-[color:var(--color-brand-navy)]/70" : "text-white/60"}`}>{label}</div>
      <div className="mt-2 text-2xl font-extrabold md:text-3xl">{value}</div>
    </div>
  );
}

function ContactCard({ icon: Icon, title, value, href, external, accent }: { icon: typeof Mail; title: string; value: string; href: string; external?: boolean; accent?: boolean }) {
  return (
    <motion.a
      variants={fadeUp}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      whileHover={{ y: -4 }}
      className={`group flex items-center gap-4 rounded-2xl border border-black/5 bg-white p-6 shadow-sm transition hover:shadow-xl ${accent ? "hover:border-emerald-500/30" : "hover:border-[color:var(--color-brand-gold)]/30"}`}
    >
      <div className={`grid h-12 w-12 place-items-center rounded-xl ${accent ? "bg-[color:var(--color-brand-whatsapp)] text-white" : "bg-[color:var(--color-brand-navy)] text-[color:var(--color-brand-gold)]"}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <div className="text-xs font-semibold uppercase tracking-widest text-[color:var(--color-brand-navy)]/60">{title}</div>
        <div className="mt-1 font-semibold text-[color:var(--color-brand-navy)]">{value}</div>
      </div>
    </motion.a>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div variants={fadeUp} className="overflow-hidden rounded-2xl border border-black/5 bg-white">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="font-semibold text-[color:var(--color-brand-navy)]">{q}</span>
        <ChevronDown className={`h-5 w-5 shrink-0 text-[color:var(--color-brand-gold)] transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        className="overflow-hidden"
      >
        <p className="px-6 pb-5 text-sm text-[color:var(--color-brand-navy)]/70">{a}</p>
      </motion.div>
    </motion.div>
  );
}

function LegalRow({ title, children, full }: { title: string; children: React.ReactNode; full?: boolean }) {
  return (
    <div className={full ? "md:col-span-2" : ""}>
      <div className="text-xs font-semibold uppercase tracking-widest text-[color:var(--color-brand-gold)]">{title}</div>
      <div className="mt-2 text-sm leading-relaxed text-[color:var(--color-brand-navy)]/80">{children}</div>
    </div>
  );
}
