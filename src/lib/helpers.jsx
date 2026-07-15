// Shared helpers for the Ciclo UI kit.
// Lucide icon wrapper — renders a single icon per instance, refreshed on prop change.
function Icon({ name, size = 16, color, style }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const host = ref.current;
    if (!host || !window.lucide) return;
    host.innerHTML = "";
    const i = document.createElement("i");
    i.setAttribute("data-lucide", name);
    host.appendChild(i);
    try {
      window.lucide.createIcons({ attrs: { width: size, height: size, "stroke-width": 2 } });
    } catch (e) {}
  }, [name, size]);
  return <span ref={ref} aria-hidden style={{ display: "inline-flex", alignItems: "center", color, ...style }} />;
}

function statusFromForms(c) {
  if (c.feedbackForm) return "completo";
  if (c.avaliacaoForm || c.colabForm) return "parcial";
  return "pendente";
}

function statusLabel(c) {
  if (c.feedbackForm) return "Completo";
  if (c.avaliacaoForm) return "Feedback Agendado";
  if (c.colabForm) return "Aguard. Avaliação do Gestor";
  return "Aguard. Autoavaliação";
}

// ---- Pipeline do ciclo (12 etapas sugeridas) ----
const PIPELINE_STAGES = [
  { key: "pendente", label: "Pendente" },
  { key: "atraso", label: "Ciclo em Atraso" },
  { key: "criado", label: "Ciclo Criado" },
  { key: "autoaval_pendente", label: "Autoavaliação Pendente" },
  { key: "autoaval_concluida", label: "Autoavaliação Concluída" },
  { key: "gestor_pendente", label: "Avaliação do Gestor Pendente" },
  { key: "avaliacao_concluida", label: "Avaliação Concluída" },
  { key: "feedback_agendado", label: "Feedback Agendado" },
  { key: "feedback_realizado", label: "Feedback Realizado" },
  { key: "pdi_criado", label: "PDI Criado" },
  { key: "pdi_andamento", label: "PDI em Andamento" },
  { key: "finalizado", label: "Ciclo Finalizado" },
];

// Etapa do pipeline para um ciclo já aberto.
function pipelineStageCiclo(c) {
  if (c.encerrado) return "finalizado";
  const fb = c.feedbackForm;
  const rows = fb ? [...(fb.rowsTec || []), ...(fb.rowsComp || [])] : [];
  if (rows.length) return rows.some((r) => r.done) ? "pdi_andamento" : "pdi_criado";
  if (c.avaliacaoForm && c.colabForm) return "feedback_agendado";
  if (c.colabForm) return "gestor_pendente";
  return "autoaval_pendente";
}

// Etapa para um colaborador ativo que ainda não tem ciclo aberto (usa a previsão de 6 em 6 meses).
function pipelineStageSemCiclo(admissao, realizados) {
  const prox = proximoCicloPrevisto(admissao, realizados);
  if (!prox) return "pendente";
  return prox.dias < 0 ? "atraso" : "pendente";
}

// Status de ciclo do colaborador, em termos de PESSOA (não de ciclo cumulativo). Cada 6 meses gera uma
// nova "rodada" de elegibilidade — então alguém que já concluiu um ciclo mas já passou 6 meses desde
// então volta a ficar "pendente" (nova rodada), em vez de ficar marcado como "realizado" para sempre.
function statusColaboradorCiclo(admissao, ciclosDoFuncionario) {
  const ordenados = (ciclosDoFuncionario || []).slice().sort((a, b) => (b.data || "").localeCompare(a.data || ""));
  const aberto = ordenados.find((c) => !c.encerrado);
  if (aberto) return "pendente";
  const ultimoEncerrado = ordenados.find((c) => c.encerrado);
  const baseData = ultimoEncerrado ? ultimoEncerrado.data : admissao;
  if (!baseData) return "naoElegivel";
  const prazo = addMonths(baseData, 6);
  const venceu = diasPara(prazo) <= 0;
  if (!venceu) return ultimoEncerrado ? "realizado" : "naoElegivel";
  return "pendente";
}

window.CicloHelpers = {
  Icon, statusFromForms, statusLabel, addMonths, addDays, fmtDate, prazoFinal, pdiStats, tempoEmpresa, mergeCiclo,
  genId, slugUsuario, genSenhaInicial, diasPara, addAuditEntry, EditableSelect, titleCase, normalizeCatalogos, mergeCatalogos, parseDataBR, ciclosPrevistos, proximoCicloPrevisto,
  PIPELINE_STAGES, pipelineStageCiclo, pipelineStageSemCiclo, statusColaboradorCiclo,
};
window.Icon = Icon;

// Quantos ciclos de 6 em 6 meses já se passaram desde a admissão até hoje (ou até "referencia").
function ciclosPrevistos(admissao, referencia) {
  if (!admissao) return 0;
  const ini = new Date(admissao + "T00:00:00");
  const fim = referencia ? new Date(referencia + "T00:00:00") : new Date();
  if (isNaN(ini) || isNaN(fim) || fim < ini) return 0;
  let meses = (fim.getFullYear() - ini.getFullYear()) * 12 + (fim.getMonth() - ini.getMonth());
  if (fim.getDate() < ini.getDate()) meses -= 1;
  return Math.max(0, Math.floor(meses / 6));
}

// Dados do próximo ciclo previsto (o de número "realizados + 1"): data alvo (admissão + 6 meses
// por ciclo) e quantos dias faltam (negativo = já deveria ter sido aberto).
function proximoCicloPrevisto(admissao, realizados) {
  if (!admissao) return null;
  const numero = (realizados || 0) + 1;
  const data = addMonths(admissao, numero * 6);
  return { numero, data, dias: diasPara(data) };
}

// Converte uma data vinda de planilha (DD/MM/AAAA, D/M/AAAA, AAAA-MM-DD ou serial do Excel)
// para o formato ISO (AAAA-MM-DD) usado internamente. Retorna "" se não reconhecer.
function parseDataBR(valor) {
  if (valor === null || valor === undefined || valor === "") return "";
  if (valor instanceof Date && !isNaN(valor)) return valor.toISOString().slice(0, 10);
  const s = String(valor).trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s;
  const m = s.match(/^(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{2,4})$/);
  if (m) {
    let [, d, mo, y] = m;
    if (y.length === 2) y = (Number(y) > 50 ? "19" : "20") + y;
    d = d.padStart(2, "0"); mo = mo.padStart(2, "0");
    return `${y}-${mo}-${d}`;
  }
  // Número serial de data do Excel (contagem de dias desde 1899-12-30).
  if (/^\d+(\.\d+)?$/.test(s)) {
    const serial = Number(s);
    const d = new Date(Date.UTC(1899, 11, 30) + serial * 86400000);
    if (!isNaN(d)) return d.toISOString().slice(0, 10);
  }
  return "";
}

// Primeira letra maiúscula de cada palavra (padroniza itens digitados em CAIXA ALTA ou minúsculas).
function titleCase(str) {
  return String(str || "").toLowerCase().replace(/(^|[\s\/\-])([a-zà-ÿ])/g, (m, sep, ch) => sep + ch.toUpperCase());
}

// Padroniza um catálogo inteiro (Regional/Diretoria/Departamento/Setor/Unidade): capitaliza
// cada item e ordena de A a Z — usado ao carregar dados antigos que ainda estejam em CAIXA ALTA.
function normalizeCatalogos(cat) {
  const out = {};
  Object.keys(cat || {}).forEach((k) => {
    const seen = new Set();
    out[k] = (cat[k] || [])
      .map(titleCase)
      .filter((v) => { const key = v.toLowerCase(); if (seen.has(key)) return false; seen.add(key); return true; })
      .sort((a, b) => a.localeCompare(b, "pt-BR"));
  });
  return out;
}

// Une o catálogo salvo na nuvem com os padrões definidos em data.js, por campo (união, não
// substituição total) — assim novas listas ou itens acrescentados no código nunca "somem"
// por causa de um registro antigo já salvo no banco.
function mergeCatalogos(remote, defaults) {
  const keys = new Set([...Object.keys(remote || {}), ...Object.keys(defaults || {})]);
  const merged = {};
  keys.forEach((k) => {
    const uniao = [...((remote && remote[k]) || []), ...((defaults && defaults[k]) || [])];
    merged[k] = uniao;
  });
  return normalizeCatalogos(merged);
}

// Combo "select + cadastrar novo": lista suspensa alimentada por um catálogo compartilhado
// (Regional, Diretoria, Departamento, Setor, Unidade). Ao digitar um item novo, ele é
// adicionado ao catálogo (via onAddOption) e passa a aparecer para todo mundo depois.
function EditableSelect({ value, options, onChange, onAddOption, placeholder }) {
  const NS = window.CicloDeDesenvolvimentoDesignSystem_cb4518;
  const { Select, TextField, Button } = NS;
  const [adding, setAdding] = React.useState(false);
  const [novo, setNovo] = React.useState("");
  const ADD_FLAG = "__novo__";

  if (adding) {
    return (
      <div style={{ display: "flex", gap: 6 }}>
        <TextField
          autoFocus
          placeholder={placeholder || "Digite o novo item"}
          value={novo}
          onChange={(e) => setNovo(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") { e.preventDefault(); confirmar(); }
            if (e.key === "Escape") { setAdding(false); setNovo(""); }
          }}
        />
        <Button type="button" size="sm" variant="secondary" onClick={() => { setAdding(false); setNovo(""); }}>Cancelar</Button>
        <Button type="button" size="sm" variant="primary" onClick={confirmar}>OK</Button>
      </div>
    );
  }

  function confirmar() {
    const v = titleCase(novo.trim());
    if (!v) { setAdding(false); return; }
    if (!(options || []).some((o) => o.toLowerCase() === v.toLowerCase())) onAddOption(v);
    onChange(v);
    setAdding(false);
    setNovo("");
  }

  return (
    <Select
      value={value || ""}
      onChange={(e) => { if (e.target.value === ADD_FLAG) { setAdding(true); } else { onChange(e.target.value); } }}
    >
      <option value="">Selecione...</option>
      {(options || []).map((o) => <option key={o} value={o}>{o}</option>)}
      <option value={ADD_FLAG}>+ Cadastrar novo...</option>
    </Select>
  );
}

// ---- Identificadores e credenciais ----
function genId(prefix) { return (prefix || "c") + Date.now().toString(36) + Math.random().toString(36).slice(2, 6); }

// Gera um "usuário" a partir do nome: primeiro nome + primeira letra do primeiro sobrenome
// (ex.: "Juliana Barbosa Lima" -> "julianab"), evitando colisão com existentes.
function slugUsuario(nome, existentes) {
  const base = String(nome || "")
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .toLowerCase().trim().split(/\s+/).filter(Boolean);
  let slug = base.length > 1 ? base[0] + base[1][0] : (base[0] || "gestor");
  slug = slug.replace(/[^a-z0-9]/g, "") || "gestor";
  const lista = (existentes || []).map((x) => String(x).toLowerCase());
  let candidato = slug, i = 1;
  while (lista.includes(candidato)) { i += 1; candidato = slug + i; }
  return candidato;
}

// Senha inicial aleatória e legível (o RH repassa ao gestor; troca é forçada no 1º acesso).
function genSenhaInicial() {
  const letras = "ABCDEFGHJKMNPQRSTUVWXYZ";
  const numeros = "23456789";
  let s = "";
  for (let i = 0; i < 3; i++) s += letras[Math.floor(Math.random() * letras.length)];
  s += "@";
  for (let i = 0; i < 3; i++) s += numeros[Math.floor(Math.random() * numeros.length)];
  return s;
}

// Dias entre hoje e uma data ISO (negativo se já passou).
function diasPara(iso) {
  if (!iso) return null;
  const alvo = new Date(iso + "T00:00:00");
  if (isNaN(alvo)) return null;
  const hoje = new Date(); hoje.setHours(0, 0, 0, 0);
  return Math.round((alvo - hoje) / 86400000);
}

// Adiciona uma entrada ao histórico/auditoria (mais recente primeiro, cap de 500 registros).
function addAuditEntry(setAuditLog, ator, tipo, acao, alvo, detalhe) {
  setAuditLog((log) => [{ id: genId("a"), ts: new Date().toISOString(), ator, tipo, acao, alvo, detalhe: detalhe || "" }, ...log].slice(0, 500));
}

// Tempo de empresa a partir da admissão até hoje (ou até a demissão).
function tempoEmpresa(admissao, demissao) {
  if (!admissao) return "—";
  const ini = new Date(admissao + "T00:00:00");
  const fim = demissao ? new Date(demissao + "T00:00:00") : new Date();
  if (isNaN(ini) || isNaN(fim) || fim < ini) return "—";
  let anos = fim.getFullYear() - ini.getFullYear();
  let meses = fim.getMonth() - ini.getMonth();
  if (fim.getDate() < ini.getDate()) meses -= 1;
  if (meses < 0) { anos -= 1; meses += 12; }
  const pa = anos === 1 ? "1 ano" : anos + " anos";
  const pm = meses === 1 ? "1 mês" : meses + " meses";
  if (anos <= 0) return pm;
  if (meses <= 0) return pa;
  return `${pa} e ${pm}`;
}

// Une um ciclo às informações do funcionário (e do gestor dele), produzindo o objeto
// usado pelas telas (Visão Geral, PDI, Form. Gestor, Comparação, PDF, Painel do RH).
function mergeCiclo(ciclo, funcionarios, gestores) {
  const f = (funcionarios || []).find((x) => x.id === ciclo.funcionarioId) || {};
  const g = (gestores || []).find((x) => x.id === f.gestorId) || null;
  return {
    ...ciclo,
    nome: f.nome || "(funcionário removido)",
    cargo: f.cargo || "",
    departamento: f.departamento || "",
    area: f.area || "",
    admissao: f.admissao || "",
    demitido: !!f.demitido,
    demissao: f.demissao || "",
    funcionarioGestorId: f.gestorId || "",
    // Aliases usados por telas legadas:
    gestor: (g && g.nome) || f.gestor || "",
    whatsapp: f.whatsapp || "",
    diretoria: f.departamento || "",
    revenda: f.area || "",
    // Hierarquia organizacional (cadastrada pelo RH no gestor):
    orgDiretoria: (g && g.diretoria) || "",
    orgRegional: (g && g.regional) || "",
    orgUnidade: (g && g.unidade) || "",
    orgSetor: (g && g.setor) || "",
    orgDepartamento: (g && g.departamento) || "",
  };
}

// Date helpers ----------------------------------------------------
function addMonths(iso, months) {
  if (!iso) return "";
  const d = new Date(iso + "T00:00:00");
  if (isNaN(d)) return "";
  d.setMonth(d.getMonth() + months);
  return d.toISOString().slice(0, 10);
}
function fmtDate(iso) {
  if (!iso) return "—";
  const d = new Date(iso + "T00:00:00");
  if (isNaN(d)) return "—";
  return d.toLocaleDateString("pt-BR");
}
// Prazo final do ciclo = data de aplicação + 180 dias completos.
function prazoFinal(c) {
  return addDays(c.data, 180);
}
function addDays(iso, days) {
  if (!iso) return "";
  const d = new Date(iso + "T00:00:00");
  if (isNaN(d)) return "";
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}
// Estatísticas de PDI (técnico/comportamental) sobre uma lista de colaboradores.
function pdiStats(colabs) {
  const acc = { tecTotal: 0, tecDone: 0, compTotal: 0, compDone: 0 };
  colabs.forEach((c) => {
    const g = c.feedbackForm || {};
    (g.rowsTec || []).forEach((r) => { acc.tecTotal++; if (r.done) acc.tecDone++; });
    (g.rowsComp || []).forEach((r) => { acc.compTotal++; if (r.done) acc.compDone++; });
  });
  acc.tecPct = acc.tecTotal ? Math.round((acc.tecDone / acc.tecTotal) * 100) : 0;
  acc.compPct = acc.compTotal ? Math.round((acc.compDone / acc.compTotal) * 100) : 0;
  return acc;
}
