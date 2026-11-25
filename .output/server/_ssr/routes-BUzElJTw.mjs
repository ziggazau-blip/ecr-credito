import { a as __toESM } from "../_runtime.mjs";
import { n as useScroll, r as motion, t as useSpring } from "../_libs/framer-motion.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
import { C as ArrowRight, S as ArrowUp, _ as FileSearch, a as ShieldCheck, b as CircleCheck, c as Phone, d as Landmark, f as Instagram, g as Gift, h as HandHeart, i as Sparkles, l as MessageCircle, m as Handshake, n as UserCheck, o as Scale, p as House, r as TrendingDown, s as Repeat, t as Zap, u as Mail, v as Facebook, x as ChevronDown, y as CreditCard } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BUzElJTw.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var elisabete_rocha_default = "/assets/elisabete-rocha-D5YEng4Y.jpg";
var WHATSAPP_URL = "https://wa.me/351912230198";
var PHONE = "+351 912 230 198";
var EMAIL = "elisabete@ecrcredito.pt";
var FORM_TO = EMAIL;
var fadeUp = {
	hidden: {
		opacity: 0,
		y: 28
	},
	show: {
		opacity: 1,
		y: 0,
		transition: {
			duration: .6,
			ease: [
				.22,
				1,
				.36,
				1
			]
		}
	}
};
function Section({ id, className = "", children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.section, {
		id,
		initial: "hidden",
		whileInView: "show",
		viewport: {
			once: true,
			amount: .15
		},
		variants: { show: { transition: { staggerChildren: .08 } } },
		className,
		children
	});
}
function fmtEUR(v) {
	return new Intl.NumberFormat("pt-PT", {
		style: "currency",
		currency: "EUR",
		maximumFractionDigits: 0
	}).format(v);
}
var FINALIDADES = [
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
	"Outros"
];
var EURIBOR = {
	"3M": {
		label: "Euribor 3 meses",
		value: 2.425
	},
	"6M": {
		label: "Euribor 6 meses",
		value: 2.647
	},
	"12M": {
		label: "Euribor 12 meses",
		value: 2.855
	}
};
var EURIBOR_REF = "Taxas médias de julho 2026";
function Index() {
	const [showTop, setShowTop] = (0, import_react.useState)(false);
	const [navOpen, setNavOpen] = (0, import_react.useState)(false);
	const { scrollYProgress } = useScroll();
	const scaleX = useSpring(scrollYProgress, {
		stiffness: 120,
		damping: 24,
		mass: .3
	});
	(0, import_react.useEffect)(() => {
		const onScroll = () => setShowTop(window.scrollY > 500);
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	const [creditType, setCreditType] = (0, import_react.useState)("habitacao");
	const CONFIG = {
		habitacao: {
			rate: 2.7,
			min: 25e3,
			max: 5e5,
			step: 1e3,
			minYears: 5,
			maxYears: 40,
			defAmount: 125e3,
			defYears: 30,
			formTipo: "Crédito Habitação"
		},
		pessoal: {
			rate: 6.9,
			min: 1e3,
			max: 75e3,
			step: 500,
			minYears: 1,
			maxYears: 10,
			defAmount: 15e3,
			defYears: 7,
			formTipo: "Crédito Pessoal"
		}
	};
	const cfg = CONFIG[creditType];
	const [amount, setAmount] = (0, import_react.useState)(CONFIG.habitacao.defAmount);
	const [years, setYears] = (0, import_react.useState)(CONFIG.habitacao.defYears);
	const [finalidade, setFinalidade] = (0, import_react.useState)(FINALIDADES[0]);
	const [taxaTipo, setTaxaTipo] = (0, import_react.useState)("fixa");
	const [euriborKey, setEuriborKey] = (0, import_react.useState)("12M");
	const [spread, setSpread] = (0, import_react.useState)(.5);
	const euriborRate = EURIBOR[euriborKey].value;
	const tan = +(euriborRate + spread).toFixed(3);
	const rate = creditType === "habitacao" && taxaTipo === "variavel" ? tan : cfg.rate;
	const switchType = (t) => {
		setCreditType(t);
		setAmount(CONFIG[t].defAmount);
		setYears(CONFIG[t].defYears);
	};
	const { monthly, totalInterest, totalPaid } = (0, import_react.useMemo)(() => {
		const n = years * 12;
		const i = rate / 100 / 12;
		const m = i === 0 ? amount / n : amount * i / (1 - Math.pow(1 + i, -n));
		const total = m * n;
		return {
			monthly: m,
			totalInterest: total - amount,
			totalPaid: total
		};
	}, [
		amount,
		years,
		rate
	]);
	const [form, setForm] = (0, import_react.useState)({
		nome: "",
		telefone: "",
		email: "",
		tipo: "Crédito Habitação",
		valor: 125e3,
		prazo: 30,
		finalidade: FINALIDADES[0],
		taxa: "",
		rendimento: "",
		observacoes: "",
		aceito: false
	});
	const [submitted, setSubmitted] = (0, import_react.useState)(false);
	const [sending, setSending] = (0, import_react.useState)(false);
	const [sendError, setSendError] = (0, import_react.useState)(null);
	const prefillFromSimulator = () => {
		setForm((f) => ({
			...f,
			valor: amount,
			prazo: years,
			tipo: cfg.formTipo,
			taxa: creditType === "habitacao" ? taxaTipo === "fixa" ? `Fixa ${cfg.rate.toFixed(1)}%` : `Variável — ${EURIBOR[euriborKey].label} (${euriborRate.toFixed(3)}%) + spread ${spread.toFixed(2)}% = TAN ${tan.toFixed(2)}%` : "",
			...creditType === "pessoal" ? { finalidade } : {}
		}));
		document.getElementById("pedido")?.scrollIntoView({ behavior: "smooth" });
	};
	const submit = async (e) => {
		e.preventDefault();
		if (!form.aceito || sending) return;
		setSending(true);
		setSendError(null);
		try {
			if (!(await fetch(`https://formsubmit.co/ajax/${FORM_TO}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json"
				},
				body: JSON.stringify({
					_subject: `Novo pedido — ${form.tipo} — ${form.nome}`,
					_template: "table",
					_captcha: "false",
					Nome: form.nome,
					Telefone: form.telefone,
					Email: form.email,
					"Tipo de crédito": form.tipo,
					...form.tipo === "Crédito Pessoal" ? { Finalidade: form.finalidade } : {},
					...form.taxa ? { "Tipo de taxa": form.taxa } : {},
					"Valor pretendido (€)": form.valor,
					"Prazo (anos)": form.prazo,
					"Rendimento mensal (€)": form.rendimento,
					Observações: form.observacoes || "—"
				})
			})).ok) throw new Error("falhou");
			setSubmitted(true);
		} catch {
			setSendError("Não foi possível enviar. Tente novamente ou contacte-nos por telefone/WhatsApp.");
		} finally {
			setSending(false);
		}
	};
	const navLinks = [
		{
			href: "#sobre",
			label: "Sobre"
		},
		{
			href: "#servicos",
			label: "Serviços"
		},
		{
			href: "#simulador",
			label: "Simulador"
		},
		{
			href: "#como-funciona",
			label: "Como funciona"
		},
		{
			href: "#faq",
			label: "FAQ"
		},
		{
			href: "#contactos",
			label: "Contactos"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-white font-sans text-[color:var(--color-brand-navy)] antialiased scroll-smooth",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				style: { scaleX },
				className: "fixed left-0 top-0 z-50 h-[3px] w-full origin-left bg-[color:var(--color-brand-gold)]"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "sticky top-0 z-40 border-b border-black/5 bg-white/85 backdrop-blur-md",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-6xl items-center justify-between px-5 py-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: "#top",
							className: "flex items-baseline gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xl font-extrabold tracking-tight text-[color:var(--color-brand-navy)]",
								children: "ECR"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xl font-light tracking-[0.25em] text-[color:var(--color-brand-gold)]",
								children: "CRÉDITO"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
							className: "hidden items-center gap-8 md:flex",
							children: [navLinks.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: l.href,
								className: "text-sm font-medium text-[color:var(--color-brand-navy)]/80 transition-colors hover:text-[color:var(--color-brand-gold)]",
								children: l.label
							}, l.href)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#pedido",
								className: "rounded-full bg-[color:var(--color-brand-gold)] px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[color:var(--color-brand-gold-soft)]",
								children: "Análise Gratuita"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							"aria-label": "Menu",
							onClick: () => setNavOpen((v) => !v),
							className: "grid h-10 w-10 place-items-center rounded-md border border-black/10 md:hidden",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "i",
								children: "☰"
							})
						})
					]
				}), navOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border-t border-black/5 bg-white md:hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto flex max-w-6xl flex-col px-5 py-3",
						children: [navLinks.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: l.href,
							onClick: () => setNavOpen(false),
							className: "border-b border-black/5 py-3 text-sm font-medium",
							children: l.label
						}, l.href)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "#pedido",
							onClick: () => setNavOpen(false),
							className: "mt-3 rounded-full bg-[color:var(--color-brand-gold)] px-5 py-3 text-center text-sm font-semibold text-white",
							children: "Análise Gratuita"
						})]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "top",
				className: "relative overflow-hidden bg-[color:var(--color-brand-cream)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-[color:var(--color-brand-gold)]/10 blur-3xl" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-[color:var(--color-brand-navy)]/5 blur-3xl" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mx-auto grid max-w-6xl gap-12 px-5 py-16 md:grid-cols-2 md:items-center md:py-24",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								y: 30
							},
							animate: {
								opacity: 1,
								y: 0
							},
							transition: {
								duration: .8,
								ease: [
									.22,
									1,
									.36,
									1
								]
							},
							className: "order-2 md:order-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: "https://www.bportugal.pt/intermediarios-credito",
									target: "_blank",
									rel: "noreferrer",
									className: "mb-4 inline-flex items-center gap-2 rounded-full border border-[color:var(--color-brand-gold)]/30 bg-white px-3 py-1 text-xs font-medium text-[color:var(--color-brand-gold)] transition hover:border-[color:var(--color-brand-gold)]",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-3.5 w-3.5" }), "Registada no Banco de Portugal · nº 8612"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
									className: "text-4xl font-extrabold leading-tight tracking-tight text-[color:var(--color-brand-navy)] md:text-5xl lg:text-6xl",
									children: ["ECR Crédito", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mt-2 block text-lg font-medium tracking-[0.3em] text-[color:var(--color-brand-gold)] md:text-xl",
										children: "INTERMEDIÁRIA DE CRÉDITO"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-6 max-w-xl text-base leading-relaxed text-[color:var(--color-brand-navy)]/80 md:text-lg",
									children: [
										"Sou ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Elisabete Rocha" }),
										", Intermediária de Crédito Vinculada, registada no Banco de Portugal sob o nº 8612."
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-4 max-w-xl text-base leading-relaxed text-[color:var(--color-brand-navy)]/70",
									children: [
										"Acompanho clientes em todo o processo de obtenção de crédito, procurando as melhores soluções para cada situação. ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "O serviço de intermediação de crédito é gratuito por lei" }),
										" e inclui acompanhamento personalizado desde o primeiro contacto até à assinatura."
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 max-w-xl text-xs leading-relaxed text-[color:var(--color-brand-navy)]/50",
									children: "A gratuitidade diz respeito apenas ao serviço de intermediação de crédito, não incluindo eventuais custos, comissões ou encargos associados ao contrato de crédito. Esta gratuitidade resulta de uma obrigação legal."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-8 flex flex-wrap gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: "#pedido",
										className: "group inline-flex items-center gap-2 rounded-full bg-[color:var(--color-brand-gold)] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[color:var(--color-brand-gold)]/25 transition hover:-translate-y-0.5 hover:bg-[color:var(--color-brand-gold-soft)]",
										children: ["Pedir Análise Gratuita", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4 transition-transform group-hover:translate-x-0.5" })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: WHATSAPP_URL,
										target: "_blank",
										rel: "noreferrer",
										className: "inline-flex items-center gap-2 rounded-full bg-[color:var(--color-brand-whatsapp)] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:-translate-y-0.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-4 w-4" }), " Falar no WhatsApp"]
									})]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								scale: .96
							},
							animate: {
								opacity: 1,
								scale: 1
							},
							transition: {
								duration: .9,
								ease: [
									.22,
									1,
									.36,
									1
								]
							},
							className: "relative order-1 mx-auto w-full max-w-md md:order-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -inset-4 rounded-3xl bg-gradient-to-br from-[color:var(--color-brand-gold)]/25 to-transparent blur-2xl" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "relative overflow-hidden rounded-3xl border border-white shadow-2xl shadow-[color:var(--color-brand-navy)]/15",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: elisabete_rocha_default,
										alt: "Elisabete Rocha, Intermediária de Crédito",
										width: 912,
										height: 1104,
										className: "h-full w-full object-cover"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "absolute -bottom-6 -left-6 rounded-2xl bg-white p-4 shadow-xl",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-xs uppercase tracking-widest text-[color:var(--color-brand-navy)]/60",
										children: "Banco de Portugal"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-1 text-lg font-bold text-[color:var(--color-brand-navy)]",
										children: "Reg. nº 8612"
									})]
								})
							]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
				id: "sobre",
				className: "mx-auto max-w-6xl px-5 py-20 md:py-28",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					variants: fadeUp,
					className: "mx-auto max-w-2xl text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--color-brand-gold)]",
							children: "Sobre"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-3 text-3xl font-extrabold tracking-tight md:text-4xl",
							children: "Porque escolher a ECR Crédito?"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-[color:var(--color-brand-navy)]/70",
							children: "Acompanhamento próximo, transparente e sem custos para o cliente. Um único ponto de contacto do primeiro contacto à assinatura."
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
					children: [
						{
							icon: Gift,
							title: "Serviço Gratuito por Lei",
							text: "A intermediação de crédito é gratuita por obrigação legal. Custos do contrato de crédito, se existirem, são do banco."
						},
						{
							icon: UserCheck,
							title: "Atendimento Personalizado",
							text: "Um único ponto de contacto, sempre disponível."
						},
						{
							icon: Sparkles,
							title: "Processo Simples",
							text: "Reduzimos a burocracia e explicamos cada passo."
						},
						{
							icon: HandHeart,
							title: "Apoio do início ao fim",
							text: "Acompanhamento até à assinatura da escritura."
						},
						{
							icon: Scale,
							title: "Comparação entre bancos",
							text: "Apresentamos opções com base nas entidades mutuantes com quem temos acordo, para encontrar a melhor proposta."
						},
						{
							icon: Zap,
							title: "Resposta rápida",
							text: "Feedback e decisões em poucos dias úteis."
						}
					].map(({ icon: Icon, title, text }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						variants: fadeUp,
						className: "group rounded-2xl border border-black/5 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-[color:var(--color-brand-gold)]/30 hover:shadow-xl hover:shadow-[color:var(--color-brand-navy)]/5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid h-12 w-12 place-items-center rounded-xl bg-[color:var(--color-brand-navy)] text-[color:var(--color-brand-gold)] transition group-hover:bg-[color:var(--color-brand-gold)] group-hover:text-white",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-6 w-6" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-5 text-lg font-bold",
								children: title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm leading-relaxed text-[color:var(--color-brand-navy)]/70",
								children: text
							})
						]
					}, title))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				id: "servicos",
				className: "bg-[color:var(--color-brand-cream)]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-6xl px-5 py-20 md:py-28",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						variants: fadeUp,
						className: "mx-auto max-w-2xl text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--color-brand-gold)]",
								children: "Serviços"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-3 text-3xl font-extrabold tracking-tight md:text-4xl",
								children: "Intermediação de crédito adaptada a si"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-4 text-[color:var(--color-brand-navy)]/70",
								children: [
									"A ECR Crédito não concede crédito — faz ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "intermediação de crédito" }),
									" junto das entidades mutuantes com quem tem acordo. O serviço de intermediação de crédito é ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "gratuito por lei" }),
									"."
								]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
						children: [
							{
								icon: House,
								title: "Compra de Casa",
								text: "Intermediação de crédito habitação para a compra ou construção da sua casa."
							},
							{
								icon: Repeat,
								title: "Transferência de Crédito Habitação",
								text: "Intermediação para transferir o seu crédito para outro banco e reduzir a prestação."
							},
							{
								icon: TrendingDown,
								title: "Consolidação de Crédito",
								text: "Intermediação para juntar vários créditos num só e aliviar o orçamento mensal."
							},
							{
								icon: CreditCard,
								title: "Crédito ao Consumo",
								text: "Intermediação de crédito pessoal, automóvel ou para obras em casa."
							},
							{
								icon: FileSearch,
								title: "Análise Gratuita",
								text: "Estudo detalhado da sua situação — a intermediação de crédito é gratuita por lei."
							},
							{
								icon: Handshake,
								title: "Acompanhamento Personalizado",
								text: "Desde a simulação à escritura — sempre ao seu lado."
							}
						].map(({ icon: Icon, title, text }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							variants: fadeUp,
							whileHover: { y: -6 },
							className: "group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 transition-shadow duration-300 hover:shadow-2xl hover:shadow-[color:var(--color-brand-navy)]/10",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute right-0 top-0 h-24 w-24 -translate-y-8 translate-x-8 rounded-full bg-[color:var(--color-brand-gold)]/10 transition-transform duration-500 group-hover:scale-150" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-[color:var(--color-brand-navy)] to-[color:var(--color-brand-navy-soft)] text-[color:var(--color-brand-gold)]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-7 w-7" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "mt-5 text-lg font-bold",
										children: title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-sm leading-relaxed text-[color:var(--color-brand-navy)]/70",
										children: text
									})
								]
							})]
						}, title))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
				id: "simulador",
				className: "relative overflow-hidden bg-[color:var(--color-brand-navy)] text-white",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -right-20 top-10 h-96 w-96 rounded-full bg-[color:var(--color-brand-gold)]/20 blur-3xl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-6xl px-5 py-20 md:py-28",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						variants: fadeUp,
						className: "mx-auto max-w-2xl text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--color-brand-gold)]",
								children: "Simulador"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-3 text-3xl font-extrabold tracking-tight md:text-4xl",
								children: "Simule o seu financiamento"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-white/70",
								children: "Ajuste os valores e veja a estimativa em tempo real. Sem compromisso."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mx-auto mt-8 inline-flex rounded-full bg-white/10 p-1 ring-1 ring-white/15",
								children: [{
									key: "habitacao",
									label: "Crédito Habitação"
								}, {
									key: "pessoal",
									label: "Crédito Pessoal"
								}].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => switchType(t.key),
									className: `rounded-full px-5 py-2.5 text-sm font-semibold transition ${creditType === t.key ? "bg-[color:var(--color-brand-gold)] text-[color:var(--color-brand-navy)]" : "text-white/70 hover:text-white"}`,
									children: t.label
								}, t.key))
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-12 grid gap-8 lg:grid-cols-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							variants: fadeUp,
							className: "lg:col-span-3 rounded-3xl bg-white/5 p-6 backdrop-blur ring-1 ring-white/10 md:p-8",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderField, {
									label: "Valor do financiamento",
									value: amount,
									min: cfg.min,
									max: cfg.max,
									step: cfg.step,
									onChange: setAmount,
									display: fmtEUR(amount)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-8",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderField, {
										label: "Prazo",
										value: years,
										min: cfg.minYears,
										max: cfg.maxYears,
										step: 1,
										onChange: setYears,
										display: `${years} anos`
									})
								}),
								creditType === "habitacao" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-8 space-y-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mb-2 block text-sm font-medium text-white/70",
										children: "Tipo de taxa"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "inline-flex w-full rounded-2xl bg-white/5 p-1 ring-1 ring-white/10",
										children: [{
											key: "fixa",
											label: "Fixa"
										}, {
											key: "variavel",
											label: "Variável"
										}].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setTaxaTipo(t.key),
											className: `flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${taxaTipo === t.key ? "bg-[color:var(--color-brand-gold)] text-[color:var(--color-brand-navy)]" : "text-white/70 hover:text-white"}`,
											children: t.label
										}, t.key))
									})] }), taxaTipo === "fixa" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between rounded-2xl bg-white/5 px-5 py-4 ring-1 ring-white/10",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm text-white/70",
											children: "Taxa de juro (fixa)"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-lg font-bold text-[color:var(--color-brand-gold)]",
											children: [cfg.rate.toFixed(1), "%"]
										})]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-2xl bg-white/5 p-5 ring-1 ring-white/10",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
												className: "mb-2 block text-sm font-medium text-white/70",
												children: "Indexante Euribor"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
												value: euriborKey,
												onChange: (e) => setEuriborKey(e.target.value),
												className: "w-full rounded-xl bg-white/5 px-4 py-3 text-sm font-semibold text-white ring-1 ring-white/15 outline-none transition focus:ring-[color:var(--color-brand-gold)]",
												children: [
													"3M",
													"6M",
													"12M"
												].map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
													value: k,
													className: "text-[color:var(--color-brand-navy)]",
													children: [
														EURIBOR[k].label,
														" — ",
														EURIBOR[k].value.toFixed(3),
														"%"
													]
												}, k))
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mt-5 flex items-center justify-between",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-sm font-medium text-white/70",
													children: "Spread"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-3",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
															type: "button",
															onClick: () => setSpread((s) => Math.max(0, +(s - .05).toFixed(2))),
															className: "h-8 w-8 rounded-full bg-white/10 text-white transition hover:bg-white/20",
															children: "−"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: "w-16 text-center text-base font-bold text-[color:var(--color-brand-gold)]",
															children: [spread.toFixed(2), "%"]
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
															type: "button",
															onClick: () => setSpread((s) => Math.min(5, +(s + .05).toFixed(2))),
															className: "h-8 w-8 rounded-full bg-white/10 text-white transition hover:bg-white/20",
															children: "+"
														})
													]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mt-5 grid grid-cols-3 gap-3 border-t border-white/10 pt-4",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "text-xs uppercase tracking-wide text-white/50",
														children: EURIBOR[euriborKey].label
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "text-base font-bold text-[color:var(--color-brand-gold)]",
														children: [euriborRate.toFixed(3), "%"]
													})] }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "text-xs uppercase tracking-wide text-white/50",
														children: "TAN"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "text-base font-bold text-[color:var(--color-brand-gold)]",
														children: [tan.toFixed(2), "%"]
													})] }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "text-xs uppercase tracking-wide text-white/50",
														children: "TAN +1,5%"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "text-base font-bold text-[color:var(--color-brand-gold)]",
														children: [(tan + 1.5).toFixed(2), "%"]
													})] })
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-2 text-xs text-white/50",
												children: "TAN +1,5% — cenário de stress usado pelos bancos para testar a subida de taxas."
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "mt-3 text-xs text-white/50",
												children: [EURIBOR_REF, ". A Euribor é revista periodicamente (3, 6 ou 12 meses), pelo que a prestação pode variar."]
											})
										]
									})]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-8",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
											className: "mb-2 block text-sm font-medium text-white/70",
											children: "Finalidade"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
											value: finalidade,
											onChange: (e) => setFinalidade(e.target.value),
											className: "w-full rounded-2xl bg-white/5 px-5 py-4 text-sm font-semibold text-white ring-1 ring-white/15 outline-none transition focus:ring-[color:var(--color-brand-gold)]",
											children: FINALIDADES.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: f,
												className: "text-[color:var(--color-brand-navy)]",
												children: f
											}, f))
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-3 text-xs text-white/50",
											children: "Taxa sob consulta — definida pelo banco após análise. A estimativa apresentada é indicativa."
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									onClick: prefillFromSimulator,
									className: "mt-10 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[color:var(--color-brand-gold)] px-6 py-4 text-sm font-semibold text-[color:var(--color-brand-navy)] shadow-lg shadow-[color:var(--color-brand-gold)]/30 transition hover:-translate-y-0.5 hover:bg-[color:var(--color-brand-gold-soft)]",
									children: ["Quero pedir este financiamento", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							variants: fadeUp,
							className: "lg:col-span-2 space-y-4",
							children: creditType === "habitacao" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResultCard, {
									label: "Prestação mensal estimada",
									value: fmtEUR(monthly),
									highlight: true
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResultCard, {
									label: "Total de juros",
									value: fmtEUR(totalInterest)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResultCard, {
									label: "Total a pagar",
									value: fmtEUR(totalPaid)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs leading-relaxed text-white/50",
									children: "Valores meramente indicativos, calculados com juros constantes. A proposta final depende da análise do banco."
								})
							] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-2xl bg-white/5 p-6 ring-1 ring-white/10",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm leading-relaxed text-white/80",
									children: "No Crédito Pessoal a taxa de juro e a prestação mensal são definidas pelo banco após análise do pedido, consoante a finalidade e o perfil do cliente."
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-xs text-white/50",
									children: "Preencha o formulário para receber uma proposta personalizada sem compromisso."
								})]
							})
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
				id: "como-funciona",
				className: "mx-auto max-w-6xl px-5 py-20 md:py-28",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					variants: fadeUp,
					className: "mx-auto max-w-2xl text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--color-brand-gold)]",
						children: "Processo"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 text-3xl font-extrabold tracking-tight md:text-4xl",
						children: "Como funciona"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mt-14 grid gap-8 md:grid-cols-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-[color:var(--color-brand-gold)]/40 to-transparent md:block" }), [
						{
							n: "01",
							title: "Pedido",
							text: "Preenche o formulário com os seus dados."
						},
						{
							n: "02",
							title: "Análise",
							text: "É feita uma análise gratuita da sua situação."
						},
						{
							n: "03",
							title: "Comparação",
							text: "São comparadas propostas dos vários bancos."
						},
						{
							n: "04",
							title: "Aprovação",
							text: "Acompanhamento até à assinatura da escritura."
						}
					].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						variants: fadeUp,
						className: "relative",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "relative z-10 mx-auto grid h-16 w-16 place-items-center rounded-full bg-white text-lg font-bold text-[color:var(--color-brand-navy)] shadow-lg ring-4 ring-[color:var(--color-brand-cream)]",
							children: s.n
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 rounded-2xl border border-black/5 bg-white p-6 text-center shadow-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-lg font-bold",
								children: s.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-[color:var(--color-brand-navy)]/70",
								children: s.text
							})]
						})]
					}, s.n))]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				id: "pedido",
				className: "bg-[color:var(--color-brand-cream)]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-4xl px-5 py-20 md:py-28",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						variants: fadeUp,
						className: "mx-auto max-w-2xl text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--color-brand-gold)]",
								children: "Pedido"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-3 text-3xl font-extrabold tracking-tight md:text-4xl",
								children: "Peça a sua análise gratuita"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-[color:var(--color-brand-navy)]/70",
								children: "Preencha o formulário e entrarei em contacto o mais brevemente possível."
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						variants: fadeUp,
						className: "mt-12 rounded-3xl bg-white p-6 shadow-xl shadow-[color:var(--color-brand-navy)]/5 ring-1 ring-black/5 md:p-10",
						children: submitted ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "py-12 text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-100 text-emerald-600",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-8 w-8" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-6 text-2xl font-bold",
									children: "Pedido recebido"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-[color:var(--color-brand-navy)]/70",
									children: "A sua análise será iniciada em breve."
								})
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: submit,
							className: "grid gap-4 md:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Nome",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										required: true,
										value: form.nome,
										onChange: (e) => setForm({
											...form,
											nome: e.target.value
										}),
										className: inputCls
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Telefone",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										required: true,
										type: "tel",
										value: form.telefone,
										onChange: (e) => setForm({
											...form,
											telefone: e.target.value
										}),
										className: inputCls
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Email",
									full: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										required: true,
										type: "email",
										value: form.email,
										onChange: (e) => setForm({
											...form,
											email: e.target.value
										}),
										className: inputCls
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Tipo de Crédito",
									full: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: form.tipo,
										onChange: (e) => setForm({
											...form,
											tipo: e.target.value
										}),
										className: inputCls,
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Crédito Habitação" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Transferência" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Consolidado" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Crédito Pessoal" })
										]
									})
								}),
								form.tipo === "Crédito Pessoal" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Finalidade",
									full: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
										value: form.finalidade,
										onChange: (e) => setForm({
											...form,
											finalidade: e.target.value
										}),
										className: inputCls,
										children: FINALIDADES.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: f }, f))
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Valor Pretendido (€)",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										value: form.valor,
										onChange: (e) => setForm({
											...form,
											valor: Number(e.target.value)
										}),
										className: inputCls
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Prazo (anos)",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										value: form.prazo,
										onChange: (e) => setForm({
											...form,
											prazo: Number(e.target.value)
										}),
										className: inputCls
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Rendimento Mensal (€)",
									full: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "number",
										value: form.rendimento,
										onChange: (e) => setForm({
											...form,
											rendimento: e.target.value
										}),
										className: inputCls
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Observações",
									full: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										rows: 4,
										value: form.observacoes,
										onChange: (e) => setForm({
											...form,
											observacoes: e.target.value
										}),
										className: inputCls
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "md:col-span-2 flex items-start gap-3 text-sm text-[color:var(--color-brand-navy)]/80",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "checkbox",
											required: true,
											checked: form.aceito,
											onChange: (e) => setForm({
												...form,
												aceito: e.target.checked
											}),
											className: "mt-1 h-4 w-4 accent-[color:var(--color-brand-gold)]"
										}),
										"Li e aceito a ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											href: "#rgpd",
											className: "underline underline-offset-2",
											children: "Política de Privacidade"
										}),
										"."
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "md:col-span-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "submit",
										disabled: sending,
										className: "inline-flex w-full items-center justify-center gap-2 rounded-full bg-[color:var(--color-brand-navy)] px-6 py-4 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[color:var(--color-brand-navy-soft)] disabled:opacity-60",
										children: [
											sending ? "A enviar…" : "Enviar Pedido",
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })
										]
									}), sendError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-3 text-sm text-red-600",
										children: sendError
									})]
								})
							]
						})
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
				id: "contactos",
				className: "mx-auto max-w-6xl px-5 py-20 md:py-28",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						variants: fadeUp,
						className: "mx-auto max-w-2xl text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--color-brand-gold)]",
							children: "Contactos"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-3 text-3xl font-extrabold tracking-tight md:text-4xl",
							children: "Vamos falar"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-12 grid gap-5 md:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactCard, {
								icon: Mail,
								title: "Email",
								value: EMAIL,
								href: `mailto:${EMAIL}`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactCard, {
								icon: Phone,
								title: "Telefone",
								value: PHONE,
								href: "tel:+351912230198"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactCard, {
								icon: MessageCircle,
								title: "WhatsApp",
								value: "Abrir conversa",
								href: WHATSAPP_URL,
								external: true,
								accent: true
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
						variants: fadeUp,
						className: "mt-8 text-center text-sm text-[color:var(--color-brand-navy)]/70",
						children: "Atendimento online para todo o território nacional. Atendimento presencial apenas por marcação."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						variants: fadeUp,
						className: "mt-10 overflow-hidden rounded-3xl shadow-lg ring-1 ring-black/5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
							title: "Localização",
							src: "https://www.google.com/maps?q=Rio+de+Moinhos,+Penafiel,+Portugal&output=embed",
							width: "100%",
							height: "360",
							loading: "lazy",
							referrerPolicy: "no-referrer-when-downgrade",
							className: "block w-full border-0"
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				id: "faq",
				className: "bg-[color:var(--color-brand-cream)]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-3xl px-5 py-20 md:py-28",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						variants: fadeUp,
						className: "text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--color-brand-gold)]",
							children: "FAQ"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-3 text-3xl font-extrabold tracking-tight md:text-4xl",
							children: "Perguntas frequentes"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-10 space-y-3",
						children: [
							{
								q: "O serviço é pago?",
								a: "Não. O serviço de intermediação de crédito é gratuito por lei. A gratuitidade diz respeito apenas à intermediação, não incluindo eventuais custos, comissões ou encargos associados ao contrato de crédito."
							},
							{
								q: "Quanto demora?",
								a: "Depende do processo, mas normalmente poucos dias úteis para a análise inicial."
							},
							{
								q: "Posso pedir só uma simulação?",
								a: "Sim. Pode pedir apenas uma simulação, sem qualquer compromisso."
							},
							{
								q: "Trabalham com vários bancos?",
								a: "Sim. Apresentamos opções com base nas entidades mutuantes com quem temos acordo, comparando as propostas disponíveis."
							}
						].map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FAQItem, {
							q: item.q,
							a: item.a
						}, i))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
				id: "legal",
				className: "mx-auto max-w-5xl px-5 py-20 md:py-28",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					variants: fadeUp,
					className: "text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--color-brand-gold)]",
						children: "Legal"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-3 text-3xl font-extrabold tracking-tight md:text-4xl",
						children: "Informação Legal"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					variants: fadeUp,
					className: "mt-10 grid gap-6 rounded-3xl border border-black/5 bg-white p-8 shadow-sm md:grid-cols-2 md:p-10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LegalRow, {
							title: "Estatuto",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
								"Intermediária de Crédito Vinculada. Registada no Banco de Portugal sob o nº",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "https://www.bportugal.pt/intermediarios-credito",
									target: "_blank",
									rel: "noreferrer",
									className: "font-bold text-[color:var(--color-brand-gold)] underline underline-offset-2 hover:text-[color:var(--color-brand-navy)]",
									children: "8612"
								}),
								"."
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-[color:var(--color-brand-navy)]/60",
								children: "Nos termos do Decreto-Lei nº 81-C/2017 de 7 de julho."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LegalRow, {
							title: "Categoria",
							children: "Intermediária de crédito vinculada."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LegalRow, {
							title: "NIF",
							children: "215735269"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LegalRow, {
							title: "Mutuantes",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
								className: "space-y-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Landmark, { className: "h-4 w-4 text-[color:var(--color-brand-gold)]" }), " NOVO BANCO"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Landmark, { className: "h-4 w-4 text-[color:var(--color-brand-gold)]" }), " BANCO SANTANDER TOTTA"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Landmark, { className: "h-4 w-4 text-[color:var(--color-brand-gold)]" }), " CAIXA GERAL DE DEPÓSITOS"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Landmark, { className: "h-4 w-4 text-[color:var(--color-brand-gold)]" }), " BANKINTER"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Landmark, { className: "h-4 w-4 text-[color:var(--color-brand-gold)]" }), " BBVA "]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Landmark, { className: "h-4 w-4 text-[color:var(--color-brand-gold)]" }), " UNION DE CRÉDITOS INMOBILIÁRIOS, S.A., ESTABLECIMIENTO FINANCIERO DE CRÉDITO (SOCIEDAD UNIPERSONAL) - SUCURSAL EM PORTUGAL"]
									})
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LegalRow, {
							title: "Regime de exclusividade",
							children: "Não."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LegalRow, {
							title: "Serviços",
							full: true,
							children: "Apresentação e proposta de contratos de crédito. Assistência aos consumidores durante todo o processo."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LegalRow, {
							title: "Serviços de consultoria",
							children: "Não."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LegalRow, {
							title: "Seguro de Responsabilidade Civil",
							children: [
								"Hiscox S.A. — Sucursal em Portugal.",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"Apólices: 2555010 e 2555012.",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"Validade: 08/10/2025 a 07/10/2026."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LegalRow, {
							title: "Resolução Alternativa de Litígios",
							full: true,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Em caso de litígio de consumo, o consumidor poderá recorrer às seguintes entidades de resolução alternativa de litígios:" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex flex-wrap gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: "https://www.cniacc.pt/pt/",
									target: "_blank",
									rel: "noreferrer",
									className: "inline-flex items-center gap-2 rounded-full border border-[color:var(--color-brand-navy)]/20 px-4 py-2 text-sm font-semibold text-[color:var(--color-brand-navy)] transition hover:border-[color:var(--color-brand-gold)] hover:text-[color:var(--color-brand-gold)]",
									children: ["CNIACC ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3.5 w-3.5" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: "https://www.triave.pt/",
									target: "_blank",
									rel: "noreferrer",
									className: "inline-flex items-center gap-2 rounded-full border border-[color:var(--color-brand-navy)]/20 px-4 py-2 text-sm font-semibold text-[color:var(--color-brand-navy)] transition hover:border-[color:var(--color-brand-gold)] hover:text-[color:var(--color-brand-gold)]",
									children: ["TRIAVE ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-3.5 w-3.5" })]
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "md:col-span-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: "https://www.livroreclamacoes.pt/Inicio/",
								target: "_blank",
								rel: "noreferrer",
								className: "inline-flex items-center gap-2 rounded-full border border-[color:var(--color-brand-navy)] px-5 py-3 text-sm font-semibold text-[color:var(--color-brand-navy)] transition hover:bg-[color:var(--color-brand-navy)] hover:text-white",
								children: ["Livro de Reclamações Online ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4" })]
							})
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
				id: "rgpd",
				className: "bg-[color:var(--color-brand-navy)] text-white",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto max-w-4xl px-5 py-16 text-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						variants: fadeUp,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--color-brand-gold)]",
								children: "Proteção de Dados"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-3 text-2xl font-bold md:text-3xl",
								children: "RGPD"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mx-auto mt-4 max-w-2xl text-white/70",
								children: "Os dados pessoais recolhidos destinam-se exclusivamente à comunicação com os clientes e à análise dos pedidos de crédito, sendo tratados em conformidade com o Regulamento Geral de Proteção de Dados (RGPD)."
							})
						]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "bg-[color:var(--color-brand-navy)] text-white/80",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto grid max-w-6xl gap-10 border-t border-white/10 px-5 py-14 md:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-baseline gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xl font-extrabold text-white",
									children: "ECR"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xl font-light tracking-[0.25em] text-[color:var(--color-brand-gold)]",
									children: "CRÉDITO"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm",
								children: "Elisabete Rocha"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-white/60",
								children: "Intermediária de Crédito"
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "text-sm font-semibold uppercase tracking-widest text-white",
							children: "Links"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "mt-4 space-y-2 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#servicos",
									className: "hover:text-[color:var(--color-brand-gold)]",
									children: "Serviços"
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#contactos",
									className: "hover:text-[color:var(--color-brand-gold)]",
									children: "Contactos"
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#rgpd",
									className: "hover:text-[color:var(--color-brand-gold)]",
									children: "Política de Privacidade"
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "https://www.livroreclamacoes.pt/Inicio/",
									target: "_blank",
									rel: "noreferrer",
									className: "hover:text-[color:var(--color-brand-gold)]",
									children: "Livro de Reclamações"
								}) })
							]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "text-sm font-semibold uppercase tracking-widest text-white",
							children: "Siga-nos"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 flex gap-3",
							children: [
								{
									icon: Facebook,
									href: "#",
									label: "Facebook"
								},
								{
									icon: Instagram,
									href: "#",
									label: "Instagram"
								},
								{
									icon: MessageCircle,
									href: WHATSAPP_URL,
									label: "WhatsApp"
								},
								{
									icon: Mail,
									href: `mailto:${EMAIL}`,
									label: "Email"
								}
							].map(({ icon: Icon, href, label }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href,
								"aria-label": label,
								target: "_blank",
								rel: "noreferrer",
								className: "grid h-10 w-10 place-items-center rounded-full bg-white/10 transition hover:bg-[color:var(--color-brand-gold)] hover:text-[color:var(--color-brand-navy)]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4" })
							}, label))
						})] })
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-t border-white/10 py-6 text-center text-xs text-white/50",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "A ECR não concede crédito. Atua como intermediária de crédito vinculada, nos termos do Decreto-Lei nº 81-C/2017." }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2",
						children: [
							"© ",
							(/* @__PURE__ */ new Date()).getFullYear(),
							" ECR Crédito · NIF 215735269 · Reg. Banco de Portugal nº",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "https://www.bportugal.pt/intermediarios-credito",
								target: "_blank",
								rel: "noreferrer",
								className: "underline underline-offset-2 hover:text-[color:var(--color-brand-gold)]",
								children: "8612"
							})
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
				href: WHATSAPP_URL,
				target: "_blank",
				rel: "noreferrer",
				"aria-label": "WhatsApp",
				className: "fixed bottom-6 right-6 z-40 grid h-14 w-14 place-items-center rounded-full bg-[color:var(--color-brand-whatsapp)] text-white shadow-2xl shadow-emerald-500/30 transition hover:scale-105",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, { className: "h-6 w-6" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--color-brand-whatsapp)] opacity-30" })]
			}),
			showTop && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => window.scrollTo({
					top: 0,
					behavior: "smooth"
				}),
				"aria-label": "Voltar ao topo",
				className: "fixed bottom-24 right-6 z-40 grid h-11 w-11 place-items-center rounded-full bg-[color:var(--color-brand-navy)] text-white shadow-lg transition hover:-translate-y-0.5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, { className: "h-5 w-5" })
			})
		]
	});
}
var inputCls = "w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm text-[color:var(--color-brand-navy)] outline-none transition focus:border-[color:var(--color-brand-gold)] focus:ring-2 focus:ring-[color:var(--color-brand-gold)]/20";
function Field({ label, children, full }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: `flex flex-col gap-1.5 ${full ? "md:col-span-2" : ""}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-xs font-semibold uppercase tracking-wider text-[color:var(--color-brand-navy)]/60",
			children: label
		}), children]
	});
}
function SliderField({ label, value, min, max, step, onChange, display }) {
	const pct = (value - min) / (max - min) * 100;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-baseline justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs font-semibold uppercase tracking-widest text-white/60",
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-3xl font-extrabold text-[color:var(--color-brand-gold)] md:text-4xl",
				children: display
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type: "range",
			min,
			max,
			step,
			value,
			onChange: (e) => onChange(Number(e.target.value)),
			className: "ecr-slider mt-4 w-full",
			style: { background: `linear-gradient(to right, var(--color-brand-gold) 0%, var(--color-brand-gold) ${pct}%, rgba(255,255,255,0.15) ${pct}%, rgba(255,255,255,0.15) 100%)` }
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-2 flex justify-between text-xs text-white/50",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: typeof min === "number" && min >= 1e3 ? fmtEUR(min) : min }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: typeof max === "number" && max >= 1e3 ? fmtEUR(max) : max })]
		})
	] });
}
function ResultCard({ label, value, highlight }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `rounded-2xl p-6 ring-1 ${highlight ? "bg-[color:var(--color-brand-gold)] text-[color:var(--color-brand-navy)] ring-transparent shadow-xl" : "bg-white/5 text-white ring-white/10"}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `text-xs font-semibold uppercase tracking-widest ${highlight ? "text-[color:var(--color-brand-navy)]/70" : "text-white/60"}`,
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-2 text-2xl font-extrabold md:text-3xl",
			children: value
		})]
	});
}
function ContactCard({ icon: Icon, title, value, href, external, accent }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.a, {
		variants: fadeUp,
		href,
		target: external ? "_blank" : void 0,
		rel: external ? "noreferrer" : void 0,
		whileHover: { y: -4 },
		className: `group flex items-center gap-4 rounded-2xl border border-black/5 bg-white p-6 shadow-sm transition hover:shadow-xl ${accent ? "hover:border-emerald-500/30" : "hover:border-[color:var(--color-brand-gold)]/30"}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `grid h-12 w-12 place-items-center rounded-xl ${accent ? "bg-[color:var(--color-brand-whatsapp)] text-white" : "bg-[color:var(--color-brand-navy)] text-[color:var(--color-brand-gold)]"}`,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-xs font-semibold uppercase tracking-widest text-[color:var(--color-brand-navy)]/60",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-1 font-semibold text-[color:var(--color-brand-navy)]",
			children: value
		})] })]
	});
}
function FAQItem({ q, a }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
		variants: fadeUp,
		className: "overflow-hidden rounded-2xl border border-black/5 bg-white",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			onClick: () => setOpen((v) => !v),
			className: "flex w-full items-center justify-between gap-4 px-6 py-5 text-left",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-semibold text-[color:var(--color-brand-navy)]",
				children: q
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: `h-5 w-5 shrink-0 text-[color:var(--color-brand-gold)] transition-transform ${open ? "rotate-180" : ""}` })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			initial: false,
			animate: {
				height: open ? "auto" : 0,
				opacity: open ? 1 : 0
			},
			transition: { duration: .25 },
			className: "overflow-hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "px-6 pb-5 text-sm text-[color:var(--color-brand-navy)]/70",
				children: a
			})
		})]
	});
}
function LegalRow({ title, children, full }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: full ? "md:col-span-2" : "",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-xs font-semibold uppercase tracking-widest text-[color:var(--color-brand-gold)]",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-2 text-sm leading-relaxed text-[color:var(--color-brand-navy)]/80",
			children
		})]
	});
}
//#endregion
export { Index as component };
