// Form. Gestor — a jornada de reflexão e evolução preenchida pelo líder.
(function () {
  const NS = window.CicloDeDesenvolvimentoDesignSystem_cb4518;
  const { Card, Field, Select, Banner, SectionTitle, DualPane, Pane, TextArea, PdiTable, Legend, Button } = NS;
  const { Icon, fmtDate, prazoFinal } = window.CicloHelpers;

  const emptyRow = () => ({ acao: "", desdobramento: "", evidencia: "", data: "" });
  const blankForm = () => ({ retro: "", futuro: "", pdiTec: "", pdiComp: "", conexao: "", rowsTec: [emptyRow()], rowsComp: [emptyRow()] });

  function FormGestorScreen({ colabs, onSave, onToast }) {
    if (!colabs.length) {
      return (
        <Card title="Formulário do Gestor">
          <div style={{ textAlign: "center", padding: 30, color: "var(--text-muted)", fontSize: 13 }}>
            Nenhum colaborador cadastrado. Cadastre um colaborador na aba <strong>Colaboradores</strong> para preencher a percepção do gestor.
          </div>
        </Card>
      );
    }

    const [id, setId] = React.useState(colabs[0].id);
    const c = colabs.find((x) => x.id === id) || colabs[0];

    const fromColab = (cc) => {
      const g = cc.gestorForm;
      if (!g) return blankForm();
      return {
        retro: g.retro || "", futuro: g.futuro || "", pdiTec: g.pdiTec || "", pdiComp: g.pdiComp || "", conexao: g.conexao || "",
        rowsTec: g.rowsTec && g.rowsTec.length ? g.rowsTec : [emptyRow()],
        rowsComp: g.rowsComp && g.rowsComp.length ? g.rowsComp : [emptyRow()],
      };
    };

    const [form, setForm] = React.useState(() => fromColab(c));
    const [errs, setErrs] = React.useState({});
    const set = (k, v) => { setForm((s) => ({ ...s, [k]: v })); if (typeof v === "string" && v.trim()) setErrs((e) => ({ ...e, [k]: false })); };
    const invalid = { border: "1.5px solid var(--danger)", boxShadow: "0 0 0 2px rgba(200,30,40,.12)" };

    React.useEffect(() => { setForm(fromColab(colabs.find((x) => x.id === id) || colabs[0])); setErrs({}); }, [id]);

    const salvar = () => {
      const clean = (rows) => rows.filter((r) => r.acao || r.desdobramento || r.evidencia || r.data);
      const rowsTec = clean(form.rowsTec);
      const rowsComp = clean(form.rowsComp);
      const faltando = {};
      ["retro", "futuro", "pdiTec", "pdiComp", "conexao"].forEach((k) => { if (!String(form[k]).trim()) faltando[k] = true; });
      // Toda ação de PDI adicionada precisa ter Ação e Data Acordada.
      const rowsIncompletas = (rows) => rows.some((r) => (r.acao || r.desdobramento || r.evidencia || r.data) && (!String(r.acao).trim() || !String(r.data).trim()));
      if (rowsTec.length === 0) faltando.rowsTec = true;
      if (rowsComp.length === 0) faltando.rowsComp = true;
      const pdiIncompleto = rowsIncompletas(form.rowsTec) || rowsIncompletas(form.rowsComp);
      if (Object.keys(faltando).length || pdiIncompleto) {
        setErrs(faltando);
        const msg = pdiIncompleto
          ? "Cada ação de PDI precisa ter Ação e Data Acordada preenchidas."
          : "Preencha todos os campos antes de salvar (inclusive ao menos uma ação em cada PDI).";
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
              {colabs.map((x) => <option key={x.id} value={x.id}>{x.nome}{x.revenda ? ` — ${x.revenda}` : ""}</option>)}
            </Select>
          </Field>
          <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 10 }}>
            <Banner tone="info" icon={<Icon name="user" size={16} />}>
              <strong>{c.nome}</strong>{c.gestor ? ` · Gestor: ${c.gestor}` : ""}{c.revenda ? ` · ${c.revenda}` : ""} · {c.cicloNum} · prazo {fmtDate(prazoFinal(c))}
            </Banner>
            {c.alvo && <Banner tone="accent" icon={<Icon name="target" size={16} />} title="Alvo a ser Atingido">{c.alvo}</Banner>}
          </div>
        </Card>

        <SectionTitle icon={<Icon name="refresh-cw" size={15} />}>Jornada de Reflexão e Evolução</SectionTitle>
        <DualPane>
          <Card spine="gestor">
            <Pane role="gestor" heading="Retrospectiva — Percepção do Líder">
              <Field hint="Análise do gestor referente à performance (resultado e impacto) nos últimos 6 meses.">
                <TextArea autoGrow minRows={4} value={form.retro} onChange={(e) => set("retro", e.target.value)} placeholder="Resultados, impacto, desafios superados..." style={errs.retro ? invalid : undefined} />
              </Field>
            </Pane>
          </Card>
          <Card spine="feedback">
            <Pane role="feedback" heading="Foco no Futuro — Visão do Líder">
              <Field hint="O que é esperado para o próximo ciclo (alvo de 6 meses).">
                <TextArea autoGrow minRows={4} value={form.futuro} onChange={(e) => set("futuro", e.target.value)} placeholder="Objetivos, recursos disponíveis..." style={errs.futuro ? invalid : undefined} />
              </Field>
            </Pane>
          </Card>
        </DualPane>

        <SectionTitle highlight="Técnico" icon={<Icon name="wrench" size={15} />}>PDI</SectionTitle>
        <Card>
          <Pane role="gestor" heading="Percepção do Líder — Pontos Fortes e a Desenvolver (Técnico)">
            <TextArea autoGrow minRows={3} value={form.pdiTec} onChange={(e) => set("pdiTec", e.target.value)} placeholder="Principais pontos fortes técnicos e o que precisa desenvolver..." style={errs.pdiTec ? invalid : undefined} />
          </Pane>
          <div style={{ height: 16 }} />
          <Pane role="feedback" heading="Melhoria Acordada — PDI Técnico">
            <PdiTable rows={form.rowsTec} onChange={(r) => set("rowsTec", r)} addLabel="+ Adicionar Ação Técnica" />
          </Pane>
        </Card>

        <SectionTitle highlight="Comportamental" icon={<Icon name="brain" size={15} />}>PDI</SectionTitle>
        <Card>
          <Pane role="gestor" heading="Percepção do Líder — Pontos Fortes e a Desenvolver (Comportamental)">
            <TextArea autoGrow minRows={3} value={form.pdiComp} onChange={(e) => set("pdiComp", e.target.value)} placeholder="Principais pontos fortes comportamentais e o que precisa desenvolver..." style={errs.pdiComp ? invalid : undefined} />
          </Pane>
          <div style={{ height: 16 }} />
          <Pane role="feedback" heading="Melhoria Acordada — PDI Comportamental">
            <PdiTable rows={form.rowsComp} onChange={(r) => set("rowsComp", r)} addLabel="+ Adicionar Ação Comportamental" />
          </Pane>
        </Card>

        <Card spine="accent">
          <Pane role="colab" heading="Conexão Líder — O que posso contribuir para seu crescimento?" style={{ borderLeft: "none", paddingLeft: 0 }}>
            <TextArea autoGrow minRows={3} value={form.conexao} onChange={(e) => set("conexao", e.target.value)} placeholder="Compromissos e contribuições do líder..." style={errs.conexao ? invalid : undefined} />
          </Pane>
        </Card>

        <Banner tone="info" icon={<Icon name="info" size={16} />}>
          <strong>Etapas do preenchimento:</strong> o colaborador responde sua autopercepção (laranja); o gestor registra a percepção do líder (azul escuro). Os campos em <strong>azul claro</strong> — Foco no Futuro e a Melhoria Acordada do PDI — são consolidados <strong>em conjunto, no momento da conversa de feedback</strong>.
        </Banner>
        <Legend />

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
          <Button variant="secondary" onClick={() => setForm(blankForm())}>Limpar</Button>
          <Button variant="primary" iconLeft={<Icon name="save" size={15} />} onClick={salvar}>Salvar Percepção do Gestor</Button>
        </div>
      </div>
    );
  }

  window.FormGestorScreen = FormGestorScreen;
})();
