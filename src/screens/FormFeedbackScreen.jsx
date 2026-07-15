// Formulário 3 — Reunião de Feedback (Acordo de Metas / PDI). Preenchido em conjunto por gestor e
// colaborador, durante a conversa. Ao concluir, o ciclo é oficialmente encerrado.
(function () {
  const NS = window.CicloDeDesenvolvimentoDesignSystem_cb4518;
  const { Card, Field, Select, Banner, SectionTitle, DualPane, Pane, TextArea, PdiTable, Legend, Button } = NS;
  const { Icon, fmtDate, prazoFinal } = window.CicloHelpers;

  const emptyRow = () => ({ acao: "", desdobramento: "", evidencia: "", data: "" });
  const blankForm = () => ({ conexao: "", rowsTec: [emptyRow()], rowsComp: [emptyRow()] });

  function FormFeedbackScreen({ colabs, onSave, onToast }) {
    const pendentes = colabs.filter((c) => c.colabForm && c.avaliacaoForm && !c.encerrado);
    if (!pendentes.length) {
      return (
        <Card title="Reunião de Feedback">
          <div style={{ textAlign: "center", padding: 30, color: "var(--text-muted)", fontSize: 13 }}>
            Nenhum ciclo pronto para a reunião de feedback. Ela libera assim que a autoavaliação e a avaliação do gestor estiverem concluídas.
          </div>
        </Card>
      );
    }

    const [id, setId] = React.useState(pendentes[0].id);
    const c = colabs.find((x) => x.id === id) || pendentes[0];

    const fromColab = (cc) => {
      const g = cc.feedbackForm;
      if (!g) return blankForm();
      return {
        conexao: g.conexao || "",
        rowsTec: g.rowsTec && g.rowsTec.length ? g.rowsTec : [emptyRow()],
        rowsComp: g.rowsComp && g.rowsComp.length ? g.rowsComp : [emptyRow()],
      };
    };

    const [form, setForm] = React.useState(() => fromColab(c));
    const [errs, setErrs] = React.useState({});
    const set = (k, v) => { setForm((s) => ({ ...s, [k]: v })); if (typeof v === "string" && v.trim()) setErrs((e) => ({ ...e, [k]: false })); };
    const invalid = { border: "1.5px solid var(--danger)", boxShadow: "0 0 0 2px rgba(200,30,40,.12)" };

    React.useEffect(() => { setForm(fromColab(colabs.find((x) => x.id === id) || pendentes[0])); setErrs({}); }, [id]);

    const d = c.colabForm || {};
    const av = c.avaliacaoForm || {};

    const concluir = () => {
      const clean = (rows) => rows.filter((r) => r.acao || r.desdobramento || r.evidencia || r.data);
      const rowsTec = clean(form.rowsTec);
      const rowsComp = clean(form.rowsComp);
      const faltando = {};
      if (!String(form.conexao).trim()) faltando.conexao = true;
      const rowsIncompletas = (rows) => rows.some((r) => (r.acao || r.desdobramento || r.evidencia || r.data) && (!String(r.acao).trim() || !String(r.data).trim()));
      if (rowsTec.length === 0) faltando.rowsTec = true;
      if (rowsComp.length === 0) faltando.rowsComp = true;
      const pdiIncompleto = rowsIncompletas(form.rowsTec) || rowsIncompletas(form.rowsComp);
      if (Object.keys(faltando).length || pdiIncompleto) {
        setErrs(faltando);
        const msg = pdiIncompleto
          ? "Cada ação de PDI precisa ter Ação e Data Acordada preenchidas."
          : "Preencha todos os campos antes de concluir (inclusive ao menos uma ação em cada PDI).";
        onToast && onToast(msg, "danger");
        return;
      }
      onSave(id, { ...form, rowsTec, rowsComp });
    };

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <Card title="Selecionar Colaborador">
          <Field label="Colaborador">
            <Select value={id} onChange={(e) => setId(e.target.value)}>
              {pendentes.map((x) => <option key={x.id} value={x.id}>{x.nome}{x.revenda ? ` — ${x.revenda}` : ""}</option>)}
            </Select>
          </Field>
          <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 10 }}>
            <Banner tone="info" icon={<Icon name="user" size={16} />}>
              <strong>{c.nome}</strong>{c.gestor ? ` · Gestor: ${c.gestor}` : ""}{c.revenda ? ` · ${c.revenda}` : ""} · {c.cicloNum} · prazo {fmtDate(prazoFinal(c))}
            </Banner>
            {c.alvo && <Banner tone="accent" icon={<Icon name="target" size={16} />} title="Alvo a ser Atingido">{c.alvo}</Banner>}
          </div>
        </Card>

        <SectionTitle highlight="Técnica" icon={<Icon name="wrench" size={15} />}>Plano de Desenvolvimento Individual — Técnica (com base no alvo definido)</SectionTitle>
        <DualPane>
          <Pane role="gestor" heading="Percepção do Líder"><div style={{ whiteSpace: "pre-wrap", fontSize: 13, lineHeight: 1.55 }}>{av.pdiTec || "—"}</div></Pane>
          <Pane role="colab" heading="Percepção do Liderado"><div style={{ whiteSpace: "pre-wrap", fontSize: 13, lineHeight: 1.55 }}>{d.pdiTec || "—"}</div></Pane>
        </DualPane>
        <Card>
          <Pane role="feedback" heading="Melhoria Acordada">
            <Field hint="1) O que você gostaria de aprender ou desenvolver nos próximos meses? 2) Quais conhecimentos técnicos estão faltando para você desempenhar suas funções com excelência?">
              <div style={{ height: 4 }} />
            </Field>
            <PdiTable rows={form.rowsTec} onChange={(r) => set("rowsTec", r)} addLabel="+ Adicionar Ação Técnica" />
          </Pane>
        </Card>

        <SectionTitle highlight="Comportamental" icon={<Icon name="brain" size={15} />}>Plano de Desenvolvimento Individual — Comportamental (com base no alvo definido)</SectionTitle>
        <DualPane>
          <Pane role="gestor" heading="Percepção do Líder"><div style={{ whiteSpace: "pre-wrap", fontSize: 13, lineHeight: 1.55 }}>{av.pdiComp || "—"}</div></Pane>
          <Pane role="colab" heading="Percepção do Liderado"><div style={{ whiteSpace: "pre-wrap", fontSize: 13, lineHeight: 1.55 }}>{d.pdiComp || "—"}</div></Pane>
        </DualPane>
        <Card>
          <Pane role="feedback" heading="Melhoria Acordada">
            <Field hint="1) O que você gostaria de aprender ou desenvolver nos próximos meses? 2) Quais comportamentos você precisa desenvolver para ter um melhor desempenho?">
              <div style={{ height: 4 }} />
            </Field>
            <PdiTable rows={form.rowsComp} onChange={(r) => set("rowsComp", r)} addLabel="+ Adicionar Ação Comportamental" />
          </Pane>
        </Card>

        <SectionTitle icon={<Icon name="handshake" size={15} />}>Conexão Líder</SectionTitle>
        <Card spine="gestor">
          <Pane role="gestor" heading="O que eu, como líder, posso contribuir para o seu crescimento?">
            <TextArea autoGrow minRows={3} value={form.conexao} onChange={(e) => set("conexao", e.target.value)} placeholder="Compromissos e contribuições do líder..." style={errs.conexao ? invalid : undefined} />
          </Pane>
        </Card>

        <Banner tone="accent" icon={<Icon name="flag" size={16} />}>
          <strong>Este formulário encerra o ciclo.</strong> Ao concluir, o colaborador passa a visualizar toda a avaliação do gestor e este acordo, e o PDI entra na fase de acompanhamento.
        </Banner>
        <Legend />

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
          <Button variant="primary" iconLeft={<Icon name="flag" size={15} />} onClick={concluir}>Concluir Reunião e Encerrar Ciclo</Button>
        </div>
      </div>
    );
  }

  window.FormFeedbackScreen = FormFeedbackScreen;
})();
