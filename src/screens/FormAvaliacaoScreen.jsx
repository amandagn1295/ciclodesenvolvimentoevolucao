// Formulário 2 — Avaliação do Gestor (percepção do líder; exclusiva do gestor). O colaborador só
// visualiza esta avaliação depois que o ciclo for encerrado (3º formulário).
(function () {
  const NS = window.CicloDeDesenvolvimentoDesignSystem_cb4518;
  const { Card, Field, Select, Banner, SectionTitle, DualPane, Pane, TextArea, Button } = NS;
  const { Icon, fmtDate, prazoFinal } = window.CicloHelpers;

  const blankForm = () => ({ retro: "", futuro: "", pdiTec: "", pdiComp: "" });

  function FormAvaliacaoScreen({ colabs, onSave, onToast }) {
    const pendentes = colabs.filter((c) => !c.encerrado);
    if (!pendentes.length) {
      return (
        <Card title="Avaliação do Gestor">
          <div style={{ textAlign: "center", padding: 30, color: "var(--text-muted)", fontSize: 13 }}>
            Nenhum ciclo em aberto. Cadastre um ciclo na aba <strong>Cadastro de Ciclo</strong> para poder avaliar.
          </div>
        </Card>
      );
    }

    const [id, setId] = React.useState(pendentes[0].id);
    const c = colabs.find((x) => x.id === id) || pendentes[0];

    const fromColab = (cc) => {
      const a = cc.avaliacaoForm;
      if (!a) return blankForm();
      return { ...blankForm(), ...a };
    };

    const [form, setForm] = React.useState(() => fromColab(c));
    const [errs, setErrs] = React.useState({});
    const set = (k, v) => { setForm((s) => ({ ...s, [k]: v })); if (v.trim()) setErrs((e) => ({ ...e, [k]: false })); };
    const invalid = { border: "1.5px solid var(--danger)", boxShadow: "0 0 0 2px rgba(200,30,40,.12)" };

    React.useEffect(() => { setForm(fromColab(colabs.find((x) => x.id === id) || pendentes[0])); setErrs({}); }, [id]);

    const salvar = () => {
      const faltando = {};
      Object.keys(blankForm()).forEach((k) => { if (!String(form[k]).trim()) faltando[k] = true; });
      if (Object.keys(faltando).length) {
        setErrs(faltando);
        onToast && onToast("Preencha todos os campos antes de salvar.", "danger");
        return;
      }
      onSave(id, { ...form });
    };

    const d = c.colabForm || {};

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <Card title="Selecionar Colaborador">
          <Field label="Colaborador">
            <Select value={id} onChange={(e) => setId(e.target.value)}>
              {pendentes.map((x) => <option key={x.id} value={x.id}>{x.nome}{x.revenda ? ` — ${x.revenda}` : ""}{x.avaliacaoForm ? " (já avaliado)" : ""}{!x.colabForm ? " · autoavaliação pendente" : ""}</option>)}
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
        <Card spine="gestor">
          <Pane role="gestor" heading="Retrospectiva — Percepção do Líder">
            <Field hint="1) Que resultados concretos o colaborador alcançou com suas entregas nos últimos 6 meses? 2) De que forma essas entregas contribuíram para o atingimento dos objetivos da equipe/empresa? 3) Quais desafios ele superou e como isso impactou seus resultados?">
              <TextArea autoGrow minRows={4} value={form.retro} onChange={(e) => set("retro", e.target.value)} placeholder="Resultados, impacto, desafios superados..." style={errs.retro ? invalid : undefined} />
            </Field>
          </Pane>
        </Card>
        <Card spine="gestor">
          <Pane role="gestor" heading="Foco no Futuro — Visão do Líder">
            <Field hint="Espero que você atinja/entregue tais objetivos até x tempo (o que a empresa espera do funcionário). O que você planeja fazer para alcançar? Que recursos você acredita ser necessários para atingir os objetivos?">
              <TextArea autoGrow minRows={4} value={form.futuro} onChange={(e) => set("futuro", e.target.value)} placeholder="Objetivos, recursos disponíveis..." style={errs.futuro ? invalid : undefined} />
            </Field>
          </Pane>
        </Card>

        <SectionTitle highlight="Técnico" icon={<Icon name="wrench" size={15} />}>PDI</SectionTitle>
        <Card spine="gestor">
          <Pane role="gestor" heading="Percepção do Líder — Pontos Fortes e a Desenvolver (Técnico)">
            <Field hint="1) Quais são os maiores pontos fortes e a desenvolver do funcionário?">
              <TextArea autoGrow minRows={3} value={form.pdiTec} onChange={(e) => set("pdiTec", e.target.value)} placeholder="Pontos fortes e a desenvolver..." style={errs.pdiTec ? invalid : undefined} />
            </Field>
          </Pane>
        </Card>

        <SectionTitle highlight="Comportamental" icon={<Icon name="brain" size={15} />}>PDI</SectionTitle>
        <Card spine="gestor">
          <Pane role="gestor" heading="Percepção do Líder — Pontos Fortes e a Desenvolver (Comportamental)">
            <Field hint="1) Quais são os maiores pontos fortes e a desenvolver do funcionário?">
              <TextArea autoGrow minRows={3} value={form.pdiComp} onChange={(e) => set("pdiComp", e.target.value)} placeholder="Pontos fortes e a desenvolver..." style={errs.pdiComp ? invalid : undefined} />
            </Field>
          </Pane>
        </Card>

        <Banner tone="info" icon={<Icon name="info" size={16} />}>
          Ao salvar, o status do ciclo muda para <strong>Feedback Agendado</strong>. O colaborador ainda não visualiza sua avaliação — ela só é liberada quando o ciclo for encerrado, ao final da reunião de feedback.
        </Banner>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
          <Button variant="primary" iconLeft={<Icon name="save" size={15} />} onClick={salvar}>Salvar Avaliação do Gestor</Button>
        </div>
      </div>
    );
  }

  window.FormAvaliacaoScreen = FormAvaliacaoScreen;
})();
