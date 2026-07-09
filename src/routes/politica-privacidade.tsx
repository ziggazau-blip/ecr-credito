import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/politica-privacidade")({
  head: () => ({
    meta: [
      { title: "Política de Privacidade | ECR Crédito" },
      {
        name: "description",
        content:
          "Política de Privacidade da ECR Crédito — Elisabete Rocha, Intermediária de Crédito Vinculada registada no Banco de Portugal nº 8612.",
      },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[color:var(--color-brand-light)] text-[color:var(--color-brand-navy)]">
      <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-[color:var(--color-brand-navy)]/70 transition hover:text-[color:var(--color-brand-gold)]"
        >
          <ArrowLeft className="h-4 w-4" /> Voltar ao início
        </Link>

        <h1 className="mt-6 text-4xl font-extrabold tracking-tight md:text-5xl">
          Política de Privacidade
        </h1>
        <p className="mt-3 text-sm text-[color:var(--color-brand-navy)]/60">
          Última atualização: {new Date().toLocaleDateString("pt-PT", { day: "2-digit", month: "long", year: "numeric" })}
        </p>

        <div className="prose prose-slate mt-10 max-w-none space-y-8 text-[15px] leading-relaxed text-[color:var(--color-brand-navy)]/85">
          <section>
            <h2 className="text-xl font-bold text-[color:var(--color-brand-navy)]">1. Identificação do Responsável pelo Tratamento</h2>
            <p className="mt-2">
              A presente Política de Privacidade aplica-se aos dados recolhidos através do website da{" "}
              <strong>ECR Crédito</strong>, representada por <strong>Elisabete Rocha</strong>,
              Intermediária de Crédito Vinculada, registada no Banco de Portugal sob o nº <strong>8612</strong>.
            </p>
            <ul className="mt-3 list-disc pl-6">
              <li>Email: <a href="mailto:elisabete@ecrcredito.pt" className="text-[color:var(--color-brand-gold)] underline">elisabete@ecrcredito.pt</a></li>
              <li>Telefone / WhatsApp: +351 912 230 198</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[color:var(--color-brand-navy)]">2. Dados Recolhidos</h2>
            <p className="mt-2">Podemos recolher os seguintes dados pessoais quando utiliza o formulário de contacto ou o simulador:</p>
            <ul className="mt-3 list-disc pl-6">
              <li>Nome completo</li>
              <li>Telefone e email</li>
              <li>Tipo de crédito pretendido, valor, prazo e rendimento mensal</li>
              <li>Observações fornecidas voluntariamente</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[color:var(--color-brand-navy)]">3. Finalidade do Tratamento</h2>
            <p className="mt-2">Os seus dados são utilizados exclusivamente para:</p>
            <ul className="mt-3 list-disc pl-6">
              <li>Responder ao seu pedido de contacto ou simulação de crédito;</li>
              <li>Elaborar uma análise personalizada e apresentar propostas de financiamento;</li>
              <li>Cumprir obrigações legais aplicáveis à atividade de intermediação de crédito.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[color:var(--color-brand-navy)]">4. Fundamento Legal</h2>
            <p className="mt-2">
              O tratamento é feito com base no seu <strong>consentimento</strong> (art. 6.º, n.º 1, al. a) do RGPD)
              e/ou nas <strong>diligências pré-contratuais</strong> por si solicitadas (art. 6.º, n.º 1, al. b) do RGPD).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[color:var(--color-brand-navy)]">5. Partilha de Dados</h2>
            <p className="mt-2">
              Os seus dados podem ser partilhados exclusivamente com <strong>instituições de crédito parceiras</strong> autorizadas
              pelo Banco de Portugal, com o único objetivo de analisar e apresentar propostas de financiamento adequadas ao seu perfil.
              Nunca serão vendidos ou cedidos a terceiros para fins comerciais.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[color:var(--color-brand-navy)]">6. Prazo de Conservação</h2>
            <p className="mt-2">
              Os dados são conservados pelo período estritamente necessário para as finalidades acima descritas
              e cumprimento das obrigações legais aplicáveis, sendo eliminados após esse prazo.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[color:var(--color-brand-navy)]">7. Direitos do Titular</h2>
            <p className="mt-2">Nos termos do RGPD, tem direito a:</p>
            <ul className="mt-3 list-disc pl-6">
              <li>Aceder, retificar ou apagar os seus dados;</li>
              <li>Limitar ou opor-se ao tratamento;</li>
              <li>Retirar o consentimento a qualquer momento;</li>
              <li>Solicitar a portabilidade dos dados;</li>
              <li>Apresentar reclamação junto da{" "}
                <a href="https://www.cnpd.pt" target="_blank" rel="noreferrer" className="text-[color:var(--color-brand-gold)] underline">
                  Comissão Nacional de Proteção de Dados (CNPD)
                </a>.
              </li>
            </ul>
            <p className="mt-2">
              Para exercer qualquer destes direitos, contacte-nos através do email{" "}
              <a href="mailto:elisabete@ecrcredito.pt" className="text-[color:var(--color-brand-gold)] underline">
                elisabete@ecrcredito.pt
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[color:var(--color-brand-navy)]">8. Segurança</h2>
            <p className="mt-2">
              Adotamos medidas técnicas e organizativas adequadas para proteger os seus dados contra acesso não autorizado,
              perda, alteração ou divulgação indevida.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[color:var(--color-brand-navy)]">9. Cookies</h2>
            <p className="mt-2">
              Este website pode utilizar cookies estritamente necessários ao seu funcionamento. Não são utilizados cookies
              de marketing ou perfilagem sem o seu consentimento prévio.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[color:var(--color-brand-navy)]">10. Alterações</h2>
            <p className="mt-2">
              Esta Política de Privacidade pode ser atualizada a qualquer momento. A versão em vigor será sempre a
              publicada nesta página, sendo recomendada a sua consulta periódica.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
