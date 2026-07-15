// Comparison modal — "Visão Lado a Lado" (gestor × colaborador).
(function () {
  const NS = window.CicloDeDesenvolvimentoDesignSystem_cb4518;
  const { Modal, DualPane, Pane, Banner, PdiTable, StatusBadge, Button, SectionTitle } = NS;
  const { Icon, statusFromForms, statusLabel } = window.CicloHelpers;

  function Block({ label, gestor, colab }) {
    return (
      <div style={{ marginBottom: 18 }}>
        <div style={{ fontSize: "var(--fs-label)", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".05em", color: "var(--ab-azul-escuro)", marginBottom: 8 }}>{label}</div>
        <DualPane>
          <Pane role="gestor" heading="Líder">
            <p style={{ margin: 0, fontSize: 13, color: gestor ? "var(--text-strong)" : "var(--text-muted)", lineHeight: 1.6, background: "var(--surface-sunken)", borderRadius: "var(--radius-sm)", padding: "10px 12px" }}>{gestor || "—"}</p>
          </Pane>
          <Pane role="colab" heading="Liderado">
            <p style={{ margin: 0, fontSize: 13, color: colab ? "var(--text-strong)" : "var(--text-muted)", lineHeight: 1.6, background: "var(--surface-accent-soft)", borderRadius: "var(--radius-sm)", padding: "10px 12px" }}>{colab || "—"}</p>
          </Pane>
        </DualPane>
      </div>
    );
  }

  function ComparisonModal({ colab, open, onClose, onOpenColabForm, onPrint, onFinalize }) {
    if (!colab) return null;
    const g = colab.avaliacaoForm || {};
    const co = colab.colabForm || {};
    const fb = colab.feedbackForm || {};
    return (
      <Modal
        open={open}
        onClose={onClose}
        width={900}
        title={colab.nome}
        subtitle={`${colab.cargo || "—"} · ${colab.area || "—"} · ${colab.departamento || "—"} · ${colab.cicloNum}`}
        footer={<>
          <Button variant="ghost" onClick={() => onOpenColabForm(colab)} iconLeft={<Icon name="external-link" size={14} />}>Form do colaborador</Button>
          <Button variant="secondary" onClick={() => onPrint(colab)} iconLeft={<Icon name="file-down" size={14} />}>Gerar PDF</Button>
          <Button variant="primary" onClick={onClose}>Fechar</Button>
        </>}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
          <StatusBadge status={statusFromForms(colab)} label={statusLabel(colab)} />
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, color: g.retro ? "var(--positive)" : "var(--text-muted)" }}>
            <Icon name={g.retro ? "check-circle-2" : "circle-dashed"} size={15} /> Percepção do Gestor
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, color: co.retro ? "var(--positive)" : "var(--text-muted)" }}>
            <Icon name={co.retro ? "check-circle-2" : "circle-dashed"} size={15} /> Percepção do Colaborador
          </span>
        </div>

        <Banner tone="accent" icon={<Icon name="target" size={16} />} title="Alvo a ser Atingido" style={{ marginBottom: 18 }}>{colab.alvo}</Banner>

        <Block label="Retrospectiva" gestor={g.retro} colab={co.retro} />
        <Block label="Foco no Futuro" gestor={g.futuro} colab={co.futuro} />
        <Block label="PDI Técnico — Percepção" gestor={g.pdiTec} colab={co.pdiTec} />
        <Block label="PDI Comportamental — Percepção" gestor={g.pdiComp} colab={co.pdiComp} />

        {fb.rowsTec && fb.rowsTec.length > 0 && (
          <div style={{ marginBottom: 18 }}>
            <div style={{ fontSize: "var(--fs-label)", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".05em", color: "var(--ab-azul-escuro)", marginBottom: 8 }}>Melhoria Acordada — Técnico</div>
            <PdiTable rows={fb.rowsTec} readOnly />
          </div>
        )}
        {fb.rowsComp && fb.rowsComp.length > 0 && (
          <div style={{ marginBottom: 18 }}>
            <div style={{ fontSize: "var(--fs-label)", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".05em", color: "var(--ab-azul-escuro)", marginBottom: 8 }}>Melhoria Acordada — Comportamental</div>
            <PdiTable rows={fb.rowsComp} readOnly />
          </div>
        )}
        {fb.conexao && (
          <Banner tone="info" icon={<Icon name="handshake" size={16} />} title="Conexão Líder">{fb.conexao}</Banner>
        )}
      </Modal>
    );
  }

  window.ComparisonModal = ComparisonModal;
})();
