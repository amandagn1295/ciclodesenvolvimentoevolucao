// Formulário do Colaborador (modo link) — autopercepção do liderado.
(function () {
  const NS = window.CicloDeDesenvolvimentoDesignSystem_cb4518;
  const { Card, Banner, SectionTitle, TextArea, Field, Button, Pane } = NS;
  const { Icon } = window.CicloHelpers;

  function FormColaboradorScreen({ colab, logoSrc, onToast, onBack, onSubmit, onUpdateAction, readOnly = false }) {
    const c = colab;
    const d = c.colabForm || {};
    const g = c.gestorForm || {};
    const AcaoTable = window.AcaoTable;
    const [form, setForm] = React.useState({ retro: d.retro || "", futuro: d.futuro || "", pdiTec: d.pdiTec || "", pdiComp: d.pdiComp || "" });
    const [errs, setErrs] = React.useState({});
    const set = (k, v) => { setForm((s) => ({ ...s, [k]: v })); if (v.trim()) setErrs((e) => ({ ...e, [k]: false })); };
    const enviar = () => {
      const campos = ["retro", "futuro", "pdiTec", "pdiComp"];
      const faltando = {};
      campos.forEach((k) => { if (!String(form[k]).trim()) faltando[k] = true; });
      if (Object.keys(faltando).length) {
        setErrs(faltando);
        onToast && onToast("Preencha todos os campos antes de enviar.", "danger");
        return;
      }
      onSubmit && onSubmit({ ...form });
    };
    const invalid = { border: "1.5px solid var(--danger)", boxShadow: "0 0 0 2px rgba(200,30,40,.12)" };

    const renderHero = (sub) => (
      <div style={{ background: "var(--ab-azul-escuro)", borderBottom: "3px solid var(--ab-laranja)", padding: "26px 24px", textAlign: "center", color: "#fff" }}>
        <img src={logoSrc} alt="Grupo Águia Branca — Divisão Comércio" style={{ height: 34, marginBottom: 14 }} />
        <h1 style={{ fontSize: "var(--fs-h1)", color: "#fff" }}>Ciclo de Desenvolvimento e Evolução</h1>
        <p style={{ fontSize: 14, opacity: 0.82, marginTop: 4 }}>{sub}</p>
      </div>
    );

    // ----- Ciclo encerrado: o colaborador atualiza a conclusão das ações de PDI -----
    if (readOnly) {
      const temPdi = (g.rowsTec || []).length || (g.rowsComp || []).length;
      const roField = (label, val) => (
        <Card spine="colab" style={{ marginBottom: 0 }}>
          <Pane role="colab" heading={label} style={{ borderLeft: "none", paddingLeft: 0 }}>
            <div style={{ whiteSpace: "pre-wrap", fontSize: 13, color: "var(--text-body)", lineHeight: 1.55 }}>{val || "—"}</div>
          </Pane>
        </Card>
      );
      return (
        <div style={{ background: "var(--surface-canvas)", minHeight: "100%" }}>
          {renderHero(`Olá, ${c.nome.split(" ")[0]}! Atualize a conclusão das suas ações de PDI.`)}
          <div style={{ maxWidth: 820, margin: "0 auto", padding: "22px 18px", display: "flex", flexDirection: "column", gap: 16 }}>
            <Banner tone="accent" icon={<Icon name="route" size={16} />} title="Ciclo encerrado — acompanhe seu PDI">
              Este é o Plano de Desenvolvimento Individual que você construiu com seu gestor. Marque cada ação como <strong>realizada</strong> e informe a <strong>data de conclusão</strong>. Suas atualizações aparecem automaticamente para o seu gestor.
            </Banner>
            {c.alvo && <Banner tone="accent" icon={<Icon name="target" size={16} />} title="Alvo a ser Atingido">{c.alvo}</Banner>}

            {temPdi ? (
              <>
                <SectionTitle highlight="Técnico" icon={<Icon name="wrench" size={15} />}>PDI</SectionTitle>
                <Card>
                  {AcaoTable
                    ? <AcaoTable rows={g.rowsTec} tipo="tec" colabId={c.id} onUpdate={onUpdateAction} locked={false} />
                    : null}
                </Card>
                <SectionTitle highlight="Comportamental" icon={<Icon name="brain" size={15} />}>PDI</SectionTitle>
                <Card>
                  {AcaoTable
                    ? <AcaoTable rows={g.rowsComp} tipo="comp" colabId={c.id} onUpdate={onUpdateAction} locked={false} />
                    : null}
                </Card>
              </>
            ) : (
              <Banner tone="info" icon={<Icon name="info" size={16} />}>Nenhuma ação de PDI foi registrada neste ciclo.</Banner>
            )}

            <SectionTitle icon={<Icon name="file-text" size={15} />}>Suas respostas do ciclo</SectionTitle>
            {roField("Retrospectiva — Sua Percepção", d.retro)}
            {roField("Foco no Futuro — Seu Plano", d.futuro)}
            {roField("Autoanálise Técnica", d.pdiTec)}
            {roField("Autoanálise Comportamental", d.pdiComp)}

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              {onBack
                ? <Button variant="ghost" onClick={onBack} iconLeft={<Icon name="arrow-left" size={15} />}>Voltar ao painel</Button>
                : <span style={{ fontSize: 12, color: "var(--text-muted)" }}>Grupo Águia Branca · Divisão Comércio</span>}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div style={{ background: "var(--surface-canvas)", minHeight: "100%" }}>
        {renderHero(`Olá, ${c.nome.split(" ")[0]}! Preencha sua autopercepção abaixo.`)}

        <div style={{ maxWidth: 820, margin: "0 auto", padding: "22px 18px", display: "flex", flexDirection: "column", gap: 16 }}>
          {readOnly
            ? <Banner tone="neutral" icon={<Icon name="lock" size={16} />} title="Ciclo encerrado — somente leitura">Este ciclo foi finalizado. Você pode consultar suas respostas e o PDI acordado, mas não é possível editá-las.</Banner>
            : <Banner tone="info" icon={<Icon name="info" size={16} />}>
              Preencha os campos referentes à <strong>sua percepção como liderado</strong>. Ao enviar, seu gestor receberá suas respostas e agendará um momento de feedback.
            </Banner>}
          {c.alvo && <Banner tone="accent" icon={<Icon name="target" size={16} />} title="Alvo a ser Atingido">{c.alvo}</Banner>}

          <SectionTitle icon={<Icon name="refresh-cw" size={15} />}>Jornada de Reflexão e Evolução</SectionTitle>
          <Card spine="colab">
            <Pane role="colab" heading="Retrospectiva — Sua Percepção" style={{ borderLeft: "none", paddingLeft: 0 }}>
              <Field hint="Que resultados concretos você alcançou nos últimos 6 meses? Como impactaram a equipe/empresa?">
                <TextArea autoGrow minRows={4} value={form.retro} onChange={(e) => set("retro", e.target.value)} readOnly={readOnly} placeholder="Resultados, contribuições, desafios superados..." style={errs.retro ? invalid : undefined} />
              </Field>
            </Pane>
          </Card>
          <Card spine="colab">
            <Pane role="colab" heading="Foco no Futuro — Seu Plano" style={{ borderLeft: "none", paddingLeft: 0 }}>
              <Field hint="O que você planeja fazer para alcançar os objetivos? Quais recursos acredita serem necessários?">
                <TextArea autoGrow minRows={4} value={form.futuro} onChange={(e) => set("futuro", e.target.value)} readOnly={readOnly} placeholder="Suas metas, planos e recursos necessários..." style={errs.futuro ? invalid : undefined} />
              </Field>
            </Pane>
          </Card>

          <SectionTitle highlight="Técnico" icon={<Icon name="wrench" size={15} />}>PDI</SectionTitle>
          <Card spine="colab">
            <Pane role="colab" heading="Sua Autoanálise Técnica" style={{ borderLeft: "none", paddingLeft: 0 }}>
              <Field hint="O que você tem de bom tecnicamente? O que precisa melhorar para atingir a meta?">
                <TextArea autoGrow minRows={3} value={form.pdiTec} onChange={(e) => set("pdiTec", e.target.value)} readOnly={readOnly} placeholder="Seus pontos fortes técnicos e o que precisa desenvolver..." style={errs.pdiTec ? invalid : undefined} />
              </Field>
            </Pane>
          </Card>

          <SectionTitle highlight="Comportamental" icon={<Icon name="brain" size={15} />}>PDI</SectionTitle>
          <Card spine="colab">
            <Pane role="colab" heading="Sua Autoanálise Comportamental" style={{ borderLeft: "none", paddingLeft: 0 }}>
              <Field hint="Quais comportamentos você precisa desenvolver para um melhor desempenho?">
                <TextArea autoGrow minRows={3} value={form.pdiComp} onChange={(e) => set("pdiComp", e.target.value)} readOnly={readOnly} placeholder="Seus pontos fortes comportamentais e o que precisa desenvolver..." style={errs.pdiComp ? invalid : undefined} />
              </Field>
            </Pane>
          </Card>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            {onBack
              ? <Button variant="ghost" onClick={onBack} iconLeft={<Icon name="arrow-left" size={15} />}>Voltar ao painel</Button>
              : <span style={{ fontSize: 12, color: "var(--text-muted)" }}>Grupo Águia Branca · Divisão Comércio</span>}
            {!readOnly && (
              <Button variant="primary" iconLeft={<Icon name="check" size={15} />} onClick={enviar}>Enviar Minhas Respostas</Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  window.FormColaboradorScreen = FormColaboradorScreen;
})();
