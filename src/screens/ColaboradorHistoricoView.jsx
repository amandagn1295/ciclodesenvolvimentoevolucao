// Histórico do Colaborador — perfil, movimentações (gestor/cargo/área) e ciclos, com opção de baixar em PDF.
(function () {
  const { fmtDate, tempoEmpresa, prazoFinal, statusFromForms, statusLabel } = window.CicloHelpers;
  const AZUL = "#0f4b87", LARANJA = "#ff931e";

  function Info({ label, value }) {
    return <div><div style={{ fontSize: 10, color: "#666", textTransform: "uppercase", letterSpacing: ".04em" }}>{label}</div><div style={{ fontSize: 13, fontWeight: 600, color: "#1a2230" }}>{value || "—"}</div></div>;
  }

  function ColaboradorHistoricoView({ colab, gestorNome, ciclosDoColab, movimentacoes, onClose }) {
    if (!colab) return null;
    const ciclos = (ciclosDoColab || []).slice().sort((a, b) => (b.data || "").localeCompare(a.data || ""));
    const movs = (movimentacoes || []).slice().sort((a, b) => new Date(b.ts) - new Date(a.ts));
    return (
      <div id="colab-hist-overlay" style={{ position: "fixed", inset: 0, background: "#525659", zIndex: 4000, overflowY: "auto", padding: "24px 0" }}>
        <style>{`@media print {
          body * { visibility: hidden !important; }
          #colab-hist, #colab-hist * { visibility: visible !important; }
          #colab-hist { position: absolute !important; inset: 0 !important; margin: 0 !important; box-shadow: none !important; width: auto !important; }
          #colab-hist-overlay { background: #fff !important; padding: 0 !important; }
          .no-print { display: none !important; }
          @page { size: A4; margin: 14mm; }
        }`}</style>

        <div className="no-print" style={{ position: "sticky", top: 0, display: "flex", justifyContent: "center", gap: 12, marginBottom: 20, zIndex: 1 }}>
          <button onClick={() => window.print()} style={{ background: LARANJA, color: "#fff", border: "none", borderRadius: 8, padding: "10px 20px", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>Baixar PDF</button>
          <button onClick={onClose} style={{ background: "#fff", color: AZUL, border: "none", borderRadius: 8, padding: "10px 20px", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>Fechar</button>
        </div>

        <div id="colab-hist" style={{ background: "#fff", width: 820, maxWidth: "94vw", margin: "0 auto", padding: 40, fontFamily: "var(--font-sans)", boxShadow: "0 4px 24px rgba(0,0,0,.3)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "3px solid " + LARANJA, paddingBottom: 14, marginBottom: 18 }}>
            <div>
              <div style={{ fontSize: 20, fontWeight: 800, color: AZUL }}>{colab.nome}</div>
              <div style={{ fontSize: 12, color: "#666" }}>{colab.cargo || "—"}{colab.demitido ? " · Desligado" : ""}</div>
            </div>
            <div style={{ fontSize: 12, color: "#666", textAlign: "right" }}>Histórico do Colaborador<br />Ciclo de Desenvolvimento e Evolução</div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 20 }}>
            <Info label="Gestor Atual" value={gestorNome} />
            <Info label="Departamento" value={colab.departamento} />
            <Info label="Diretoria | Negócios" value={colab.diretoria} />
            <Info label="Setor" value={colab.setor} />
            <Info label="Regional" value={colab.regional} />
            <Info label="Admissão" value={fmtDate(colab.admissao) + " · " + tempoEmpresa(colab.admissao, colab.demitido ? colab.demissao : null)} />
          </div>

          <div style={{ background: AZUL, color: "#fff", padding: "8px 14px", borderRadius: 6, fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em", margin: "0 0 12px" }}>Movimentações (gestor, cargo, área)</div>
          {movs.length === 0
            ? <div style={{ fontSize: 12, color: "#888", marginBottom: 20 }}>Nenhuma movimentação registrada.</div>
            : <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
                {movs.map((m) => (
                  <div key={m.id} style={{ borderLeft: "3px solid " + LARANJA, paddingLeft: 10, fontSize: 12.5 }}>
                    <div style={{ color: "#1a2230" }}>{m.detalhe || "Cadastro atualizado"}</div>
                    <div style={{ color: "#888", fontSize: 11 }}>{new Date(m.ts).toLocaleString("pt-BR")} · por {m.ator}</div>
                  </div>
                ))}
              </div>}

          <div style={{ background: AZUL, color: "#fff", padding: "8px 14px", borderRadius: 6, fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em", margin: "0 0 12px" }}>Ciclos de Desenvolvimento</div>
          {ciclos.length === 0
            ? <div style={{ fontSize: 12, color: "#888" }}>Nenhum ciclo registrado ainda.</div>
            : <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {ciclos.map((c) => (
                  <div key={c.id} style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, padding: "8px 10px", border: "1px solid #e2e7ee", borderRadius: 8 }}>
                    <span><strong>{c.cicloNum}</strong> · aplicação {fmtDate(c.data)} · prazo {fmtDate(prazoFinal(c))} · {c.alvo || "—"}</span>
                    <span style={{ fontWeight: 700, color: c.encerrado ? "#1f8a5b" : "#e07d09" }}>{c.encerrado ? "Encerrado" : statusLabel(c)}</span>
                  </div>
                ))}
              </div>}

          <div style={{ marginTop: 28, paddingTop: 14, borderTop: "1px solid #e2e7ee", display: "flex", justifyContent: "space-between", fontSize: 11, color: "#888" }}>
            <span>Grupo Águia Branca · Divisão Comércio</span>
            <span>Documento gerado pelo sistema do Ciclo de Desenvolvimento</span>
          </div>
        </div>
      </div>
    );
  }

  window.ColaboradorHistoricoView = ColaboradorHistoricoView;
})();
