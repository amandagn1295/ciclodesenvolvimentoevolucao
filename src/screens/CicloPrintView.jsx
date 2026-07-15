// Documento imprimível do ciclo — formato do formulário (Gerar PDF).
(function () {
  const { fmtDate, prazoFinal } = window.CicloHelpers;
  const LOGO = window.CICLO_LOGO_COLORIDA || "../../assets/logo-colorida.png";

  const AZUL = "#0f4b87";
  const LARANJA = "#ff931e";

  function Section({ children }) {
    return <div style={{ background: AZUL, color: "#fff", padding: "8px 14px", borderRadius: 6, fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em", margin: "20px 0 12px" }}>{children}</div>;
  }
  function Dual({ label, gestor, colab }) {
    return (
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".04em", color: AZUL, marginBottom: 6 }}>{label}</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div style={{ borderLeft: "3px solid " + AZUL, paddingLeft: 10 }}>
            <div style={{ fontSize: 10, color: "#666", textTransform: "uppercase", marginBottom: 3 }}>Percepção do Líder</div>
            <div style={{ fontSize: 12.5, color: "#1a2230", lineHeight: 1.5, whiteSpace: "pre-wrap" }}>{gestor || "—"}</div>
          </div>
          <div style={{ borderLeft: "3px solid " + LARANJA, paddingLeft: 10 }}>
            <div style={{ fontSize: 10, color: "#666", textTransform: "uppercase", marginBottom: 3 }}>Percepção do Liderado</div>
            <div style={{ fontSize: 12.5, color: "#1a2230", lineHeight: 1.5, whiteSpace: "pre-wrap" }}>{colab || "—"}</div>
          </div>
        </div>
      </div>
    );
  }
  function Table({ rows }) {
    if (!rows || !rows.length) return <div style={{ fontSize: 12, color: "#888" }}>Nenhuma ação registrada.</div>;
    const th = { background: AZUL, color: "#fff", padding: "6px 10px", textAlign: "left", fontSize: 10.5, textTransform: "uppercase", letterSpacing: ".03em" };
    const td = { padding: "7px 10px", borderBottom: "1px solid #e2e7ee", fontSize: 12, verticalAlign: "top" };
    return (
      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 4 }}>
        <thead><tr><th style={th}>Ação</th><th style={th}>Desdobramento</th><th style={th}>Evidência</th><th style={{ ...th, background: LARANJA }}>Data Acordada</th></tr></thead>
        <tbody>{rows.map((r, i) => (
          <tr key={i}><td style={td}>{r.acao || "—"}</td><td style={td}>{r.desdobramento || "—"}</td><td style={td}>{r.evidencia || "—"}</td><td style={{ ...td, fontWeight: 700, color: "#e07d09" }}>{fmtDate(r.data)}</td></tr>
        ))}</tbody>
      </table>
    );
  }
  function Info({ label, value }) {
    return <div><div style={{ fontSize: 10, color: "#666", textTransform: "uppercase", letterSpacing: ".04em" }}>{label}</div><div style={{ fontSize: 13, fontWeight: 600, color: "#1a2230" }}>{value || "—"}</div></div>;
  }

  function CicloPrintView({ colab, onClose }) {
    if (!colab) return null;
    const g = colab.avaliacaoForm || {};
    const co = colab.colabForm || {};
    const fb = colab.feedbackForm || {};
    return (
      <div id="ciclo-print-overlay" style={{ position: "fixed", inset: 0, background: "#525659", zIndex: 4000, overflowY: "auto", padding: "24px 0" }}>
        <style>{`@media print {
          body * { visibility: hidden !important; }
          #ciclo-print, #ciclo-print * { visibility: visible !important; }
          #ciclo-print { position: absolute !important; inset: 0 !important; margin: 0 !important; box-shadow: none !important; width: auto !important; }
          #ciclo-print-overlay { background: #fff !important; padding: 0 !important; }
          .no-print { display: none !important; }
          @page { size: A4; margin: 14mm; }
        }`}</style>

        <div className="no-print" style={{ position: "sticky", top: 0, display: "flex", justifyContent: "center", gap: 12, marginBottom: 20, zIndex: 1 }}>
          <button onClick={() => window.print()} style={{ background: LARANJA, color: "#fff", border: "none", borderRadius: 8, padding: "10px 20px", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>Imprimir / Salvar PDF</button>
          <button onClick={onClose} style={{ background: "#fff", color: AZUL, border: "none", borderRadius: 8, padding: "10px 20px", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>Fechar</button>
        </div>

        <div id="ciclo-print" style={{ background: "#fff", width: 820, maxWidth: "94vw", margin: "0 auto", padding: 40, fontFamily: "var(--font-sans)", boxShadow: "0 4px 24px rgba(0,0,0,.3)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "3px solid " + LARANJA, paddingBottom: 14, marginBottom: 18 }}>
            <img src={LOGO} alt="Grupo Águia Branca — Divisão Comércio" style={{ height: 40 }} />
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: AZUL }}>Ciclo de Desenvolvimento e Evolução</div>
              <div style={{ fontSize: 12, color: "#666" }}>{colab.cicloNum}{colab.encerrado ? " · Encerrado" : ""}</div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 6 }}>
            <Info label="Nome do Colaborador" value={colab.nome} />
            <Info label="Cargo" value={colab.cargo} />
            <Info label="Departamento" value={colab.departamento} />
            <Info label="Área" value={colab.revenda} />
            <Info label="Data de Aplicação" value={fmtDate(colab.data)} />
            <Info label="Próximo ciclo previsto: 180 dias" value={fmtDate(prazoFinal(colab))} />
          </div>
          <div style={{ background: "#fff6e9", border: "1px solid " + LARANJA, borderRadius: 8, padding: "10px 14px", margin: "12px 0", fontSize: 12.5 }}>
            <strong style={{ color: "#e07d09" }}>Alvo a ser Atingido:</strong> {colab.alvo || "—"}
          </div>

          <Section>Jornada de Reflexão e Evolução</Section>
          <Dual label="Retrospectiva" gestor={g.retro} colab={co.retro} />
          <Dual label="Foco no Futuro" gestor={g.futuro} colab={co.futuro} />

          <Section>Plano de Desenvolvimento Individual — Técnico</Section>
          <Dual label="Percepção — Pontos fortes e a desenvolver" gestor={g.pdiTec} colab={co.pdiTec} />
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: AZUL, margin: "8px 0 2px" }}>Melhoria Acordada</div>
          <Table rows={fb.rowsTec} />

          <Section>Plano de Desenvolvimento Individual — Comportamental</Section>
          <Dual label="Percepção — Pontos fortes e a desenvolver" gestor={g.pdiComp} colab={co.pdiComp} />
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", color: AZUL, margin: "8px 0 2px" }}>Melhoria Acordada</div>
          <Table rows={fb.rowsComp} />

          <Section>Conexão Líder</Section>
          <div style={{ fontSize: 12.5, color: "#1a2230", lineHeight: 1.5, whiteSpace: "pre-wrap" }}>{fb.conexao || "—"}</div>

          <div style={{ marginTop: 28, paddingTop: 14, borderTop: "1px solid #e2e7ee", display: "flex", justifyContent: "space-between", fontSize: 11, color: "#888" }}>
            <span>Grupo Águia Branca · Divisão Comércio</span>
            <span>Documento gerado pelo sistema do Ciclo de Desenvolvimento</span>
          </div>
        </div>
      </div>
    );
  }

  window.CicloPrintView = CicloPrintView;
})();
