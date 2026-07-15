// Formulário 1 — Autoavaliação do Colaborador (autopercepção do liderado).
(function () {
  const NS = window.CicloDeDesenvolvimentoDesignSystem_cb4518;
  const { Card, Banner, SectionTitle, TextArea, Field, Button, Pane } = NS;
  const { Icon, fmtDate } = window.CicloHelpers;

  function FormColaboradorScreen({ colab, historico, logoSrc, onToast, onBack, onSubmit, onUpdateAction, readOnly = false }) {
    const c = colab;
    const d = c.colabForm || {};
    const av = c.avaliacaoForm || {};
    const fb = c.feedbackForm || {};
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

    // ----- Ciclo encerrado: colaborador visualiza tudo e atualiza a conclusão das ações de PDI -----
    if (readOnly) {
      const temPdi = (fb.rowsTec || []).length || (fb.rowsComp || []).length;
      const roField = (label, val, role) => (
        <Card spine={role || "colab"} style={{ marginBottom: 0 }}>
          <Pane role={role || "colab"} heading={label} style={{ borderLeft: "none", paddingLeft: 0 }}>
            <div style={{ whiteSpace: "pre-wrap", fontSize: 13, color: "var(--text-body)", lineHeight: 1.55 }}>{val || "—"}</div>
          </Pane>
        </Card>
      );
      return (
        <div style={{ background: "var(--surface-canvas)", minHeight: "100%" }}>
          {renderHero(`Olá, ${c.nome.split(" ")[0]}! Ciclo encerrado — confira o resultado completo e acompanhe seu PDI.`)}
          <div style={{ maxWidth: 820, margin: "0 auto", padding: "22px 18px", display: "flex", flexDirection: "column", gap: 16 }}>
            <Banner tone="accent" icon={<Icon name="route" size={16} />} title="Ciclo encerrado — acompanhe seu PDI">
              Este é o Plano de Desenvolvimento Individual acordado na reunião de feedback. Marque cada ação como <strong>realizada</strong> e informe a <strong>data de conclusão</strong>. Suas atualizações aparecem automaticamente para o seu gestor.
            </Banner>
            {c.alvo && <Banner tone="accent" icon={<Icon name="target" size={16} />} title="Alvo a ser Atingido">{c.alvo}</Banner>}
            <Banner tone="info" icon={<Icon name="calendar-check" size={16} />} title="Data da reunião de feedback">{fmtDate(c.data)}</Banner>

            <SectionTitle icon={<Icon name="refresh-cw" size={15} />}>Jornada de Reflexão e Evolução</SectionTitle>
            {roField("Retrospectiva — Percepção do Gestor", av.retro, "gestor")}
            {roField("Retrospectiva — Sua Percepção", d.retro)}
            {roField("Foco no Futuro — Percepção do Gestor", av.futuro, "gestor")}
            {roField("Foco no Futuro — Seu Plano", d.futuro)}

            <SectionTitle highlight="Técnico" icon={<Icon name="wrench" size={15} />}>PDI</SectionTitle>
            {roField("Percepção do Gestor — Técnico", av.pdiTec, "gestor")}
            {roField("Sua Autoanálise Técnica", d.pdiTec)}
            <SectionTitle highlight="Comportamental" icon={<Icon name="brain" size={15} />}>PDI</SectionTitle>
            {roField("Percepção do Gestor — Comportamental", av.pdiComp, "gestor")}
            {roField("Sua Autoanálise Comportamental", d.pdiComp)}

            {fb.conexao && <Banner tone="info" icon={<Icon name="handshake" size={16} />} title="Conexão com o Líder">{fb.conexao}</Banner>}

            {temPdi ? (
              <>
                <SectionTitle highlight="Técnico" icon={<Icon name="wrench" size={15} />}>Melhoria Acordada</SectionTitle>
                <Card>
                  {AcaoTable ? <AcaoTable rows={fb.rowsTec} tipo="tec" colabId={c.id} onUpdate={onUpdateAction} locked={false} /> : null}
                </Card>
                <SectionTitle highlight="Comportamental" icon={<Icon name="brain" size={15} />}>Melhoria Acordada</SectionTitle>
                <Card>
                  {AcaoTable ? <AcaoTable rows={fb.rowsComp} tipo="comp" colabId={c.id} onUpdate={onUpdateAction} locked={false} /> : null}
                </Card>
              </>
            ) : (
              <Banner tone="info" icon={<Icon name="info" size={16} />}>Nenhuma ação de PDI foi registrada neste ciclo.</Banner>
            )}

            {historico && historico.length > 0 && (
              <>
                <SectionTitle icon={<Icon name="history" size={15} />}>Histórico de ciclos anteriores</SectionTitle>
                <Card>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {historico.map((h) => (
                      <div key={h.id} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, padding: "8px 10px", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-sm)" }}>
                        <span><strong>{h.cicloNum}</strong> · aplicação {fmtDate(h.data)}</span>
                        <span style={{ color: "var(--text-muted)" }}>{h.encerrado ? "Encerrado" : "Em andamento"}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </>
            )}

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
          <Banner tone="info" icon={<Icon name="info" size={16} />}>
            Preencha os campos referentes à <strong>sua percepção como liderado</strong>. Ao enviar, seu gestor fará a avaliação dele — depois vocês se encontram para a reunião de feedback.
          </Banner>
          {c.alvo && <Banner tone="accent" icon={<Icon name="target" size={16} />} title="Alvo a ser Atingido">{c.alvo}</Banner>}

          <SectionTitle icon={<Icon name="refresh-cw" size={15} />}>Jornada de Reflexão e Evolução</SectionTitle>
          <Card spine="colab">
            <Pane role="colab" heading="Retrospectiva — Sua Percepção" style={{ borderLeft: "none", paddingLeft: 0 }}>
              <Field hint="1) Que resultados concretos você alcançou com suas entregas nos últimos 6 meses? 2) De que forma essas entregas contribuíram para o atingimento dos objetivos da equipe/empresa? 3) Quais desafios você superou para entregar seus objetivos/projetos e como isso impactou seus resultados?">
                <TextArea autoGrow minRows={4} value={form.retro} onChange={(e) => set("retro", e.target.value)} placeholder="Resultados, contribuições, desafios superados..." style={errs.retro ? invalid : undefined} />
              </Field>
            </Pane>
          </Card>
          <Card spine="colab">
            <Pane role="colab" heading="Foco no Futuro — Seu Plano" style={{ borderLeft: "none", paddingLeft: 0 }}>
              <Field hint="Espero que você atinja/entregue tais objetivos até x tempo (o que a empresa espera de você). O que você planeja fazer para alcançar? Que recursos você acredita ser necessários para atingir os objetivos?">
                <TextArea autoGrow minRows={4} value={form.futuro} onChange={(e) => set("futuro", e.target.value)} placeholder="Suas metas, planos e recursos necessários..." style={errs.futuro ? invalid : undefined} />
              </Field>
            </Pane>
          </Card>

          <SectionTitle highlight="Técnico" icon={<Icon name="wrench" size={15} />}>PDI</SectionTitle>
          <Card spine="colab">
            <Pane role="colab" heading="Sua Autoanálise Técnica" style={{ borderLeft: "none", paddingLeft: 0 }}>
              <Field hint="O que você tem de bom? O que você acha que precisa melhorar para atingir a meta?">
                <TextArea autoGrow minRows={3} value={form.pdiTec} onChange={(e) => set("pdiTec", e.target.value)} placeholder="Seus pontos fortes técnicos e o que precisa desenvolver..." style={errs.pdiTec ? invalid : undefined} />
              </Field>
            </Pane>
          </Card>

          <SectionTitle highlight="Comportamental" icon={<Icon name="brain" size={15} />}>PDI</SectionTitle>
          <Card spine="colab">
            <Pane role="colab" heading="Sua Autoanálise Comportamental" style={{ borderLeft: "none", paddingLeft: 0 }}>
              <Field hint="O que você tem de bom? O que você acha que precisa melhorar para atingir a meta?">
                <TextArea autoGrow minRows={3} value={form.pdiComp} onChange={(e) => set("pdiComp", e.target.value)} placeholder="Seus pontos fortes comportamentais e o que precisa desenvolver..." style={errs.pdiComp ? invalid : undefined} />
              </Field>
            </Pane>
          </Card>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            {onBack
              ? <Button variant="ghost" onClick={onBack} iconLeft={<Icon name="arrow-left" size={15} />}>Voltar ao painel</Button>
              : <span style={{ fontSize: 12, color: "var(--text-muted)" }}>Grupo Águia Branca · Divisão Comércio</span>}
            <Button variant="primary" iconLeft={<Icon name="check" size={15} />} onClick={enviar}>Enviar Minhas Respostas</Button>
          </div>
        </div>
      </div>
    );
  }

  window.FormColaboradorScreen = FormColaboradorScreen;
})();
