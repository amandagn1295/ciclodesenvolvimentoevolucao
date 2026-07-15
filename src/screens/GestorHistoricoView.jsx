// Histórico do Gestor — ciclos abertos e concluídos da sua equipe, visto pelo RH.
(function () {
  const { fmtDate, prazoFinal, statusLabel, statusColaboradorCiclo } = window.CicloHelpers;
  const AZUL = "#0f4b87", LARANJA = "#ff931e";

  function GestorHistoricoView({ gestor, ciclosDoGestor, funcionariosDoGestor, onClose }) {
    if (!gestor) return null;
    const ciclos = (ciclosDoGestor || []).slice().sort((a, b) => (b.data || "").localeCompare(a.data || ""));
    const abertos = ciclos.filter((c) => !c.encerrado);
    const concluidos = ciclos.filter((c) => c.encerrado);
    const ativos = (funcionariosDoGestor || []).filter((f) => !f.demitido);
    const statusPorColaborador = ativos.map((f) => statusColaboradorCiclo(f.admissao, ciclos.filter((c) => c.funcionarioId === f.id)));
    const realizados = statusPorColaborador.filter((s) => s === "realizado").length;
    const pendentesElegiveis = statusPorColaborador.filter((s) => s === "pendente").length;
    const totalElegivel = realizados + pendentesElegiveis;
    const listaPendentes = ativos.filter((f) => statusColaboradorCiclo(f.admissao, ciclos.filter((c) => c.funcionarioId === f.id)) === "pendente");
    return (
      <div id="gestor-hist-overlay" style={{ position: "fixed", inset: 0, background: "#525659", zIndex: 4000, overflowY: "auto", padding: "24px 0" }}>
        <style>{`@media print {
          body * { visibility: hidden !important; }
          #gestor-hist, #gestor-hist * { visibility: visible !important; }
          #gestor-hist { position: absolute !important; inset: 0 !important; margin: 0 !important; box-shadow: none !important; width: auto !important; }
          #gestor-hist-overlay { background: #fff !important; padding: 0 !important; }
          .no-print { display: none !important; }
          @page { size: A4; margin: 14mm; }
        }`}</style>

        <div className="no-print" style={{ position: "sticky", top: 0, display: "flex", justifyContent: "center", gap: 12, marginBottom: 20, zIndex: 1 }}>
          <button onClick={() => window.print()} style={{ background: LARANJA, color: "#fff", border: "none", borderRadius: 8, padding: "10px 20px", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>Baixar PDF</button>
          <button onClick={onClose} style={{ background: "#fff", color: AZUL, border: "none", borderRadius: 8, padding: "10px 20px", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>Fechar</button>
        </div>

        <div id="gestor-hist" style={{ background: "#fff", width: 820, maxWidth: "94vw", margin: "0 auto", padding: 40, fontFamily: "var(--font-sans)", boxShadow: "0 4px 24px rgba(0,0,0,.3)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "3px solid " + LARANJA, paddingBottom: 14, marginBottom: 18 }}>
            <div>
              <div style={{ fontSize: 20, fontWeight: 800, color: AZUL }}>{gestor.nome}</div>
              <div style={{ fontSize: 12, color: "#666" }}>{gestor.cargo || "—"} · {gestor.diretoria || "—"}{gestor.desligado ? " · Desligado" : ""}</div>
            </div>
            <div style={{ fontSize: 12, color: "#666", textAlign: "right" }}>Histórico do Gestor<br />Ciclo de Desenvolvimento e Evolução</div>
          </div>

          <div style={{ display: "flex", gap: 20, marginBottom: 12 }}>
            <div style={{ flex: 1, textAlign: "center", background: "#eef6fc", borderRadius: 8, padding: "12px 8px" }}><div style={{ fontSize: 24, fontWeight: 800, color: AZUL }}>{ativos.length}</div><div style={{ fontSize: 11, color: "#666", textTransform: "uppercase" }}>Colaboradores Ativos</div></div>
            <div style={{ flex: 1, textAlign: "center", background: "#fff6e9", borderRadius: 8, padding: "12px 8px" }}><div style={{ fontSize: 24, fontWeight: 800, color: "#e07d09" }}>{totalElegivel}</div><div style={{ fontSize: 11, color: "#666", textTransform: "uppercase" }}>Elegíveis</div></div>
            <div style={{ flex: 1, textAlign: "center", background: "#fbeaea", borderRadius: 8, padding: "12px 8px" }}><div style={{ fontSize: 24, fontWeight: 800, color: "#c81e28" }}>{pendentesElegiveis}</div><div style={{ fontSize: 11, color: "#666", textTransform: "uppercase" }}>Pendentes</div></div>
          </div>

          <div style={{ display: "flex", gap: 20, marginBottom: 20 }}>
            <div style={{ flex: 1, textAlign: "center", background: "#f5f7fa", borderRadius: 8, padding: "12px 8px" }}><div style={{ fontSize: 24, fontWeight: 800, color: AZUL }}>{ciclos.length}</div><div style={{ fontSize: 11, color: "#666", textTransform: "uppercase" }}>Total de Ciclos</div></div>
            <div style={{ flex: 1, textAlign: "center", background: "#fff6e9", borderRadius: 8, padding: "12px 8px" }}><div style={{ fontSize: 24, fontWeight: 800, color: "#e07d09" }}>{abertos.length}</div><div style={{ fontSize: 11, color: "#666", textTransform: "uppercase" }}>Abertos</div></div>
            <div style={{ flex: 1, textAlign: "center", background: "#e7f4ee", borderRadius: 8, padding: "12px 8px" }}><div style={{ fontSize: 24, fontWeight: 800, color: "#1f8a5b" }}>{concluidos.length}</div><div style={{ fontSize: 11, color: "#666", textTransform: "uppercase" }}>Concluídos</div></div>
          </div>

          {listaPendentes.length > 0 && (
            <div style={{ marginBottom: 20 }}>
              <div style={{ background: "#fbeaea", color: "#c81e28", padding: "8px 14px", borderRadius: 6, fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em", margin: "0 0 12px" }}>Colaboradores Pendentes ({listaPendentes.length})</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {listaPendentes.map((f) => (
                  <div key={f.id} style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, padding: "6px 10px", border: "1px solid #e2e7ee", borderRadius: 8 }}>
                    <span>{f.nome}</span>
                    <span style={{ color: "#888" }}>{f.cargo || "—"}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ background: AZUL, color: "#fff", padding: "8px 14px", borderRadius: 6, fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em", margin: "0 0 12px" }}>Ciclos Abertos</div>
          {abertos.length === 0
            ? <div style={{ fontSize: 12, color: "#888", marginBottom: 20 }}>Nenhum ciclo em aberto.</div>
            : <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
                {abertos.map((c) => (
                  <div key={c.id} style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, padding: "8px 10px", border: "1px solid #e2e7ee", borderRadius: 8 }}>
                    <span><strong>{c.nome}</strong> · {c.cicloNum} · aplicação {fmtDate(c.data)} · prazo {fmtDate(prazoFinal(c))}</span>
                    <span style={{ fontWeight: 700, color: "#e07d09" }}>{statusLabel(c)}</span>
                  </div>
                ))}
              </div>}

          <div style={{ background: AZUL, color: "#fff", padding: "8px 14px", borderRadius: 6, fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em", margin: "0 0 12px" }}>Ciclos Concluídos</div>
          {concluidos.length === 0
            ? <div style={{ fontSize: 12, color: "#888" }}>Nenhum ciclo concluído ainda.</div>
            : <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {concluidos.map((c) => (
                  <div key={c.id} style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, padding: "8px 10px", border: "1px solid #e2e7ee", borderRadius: 8 }}>
                    <span><strong>{c.nome}</strong> · {c.cicloNum} · aplicação {fmtDate(c.data)}</span>
                    <span style={{ fontWeight: 700, color: "#1f8a5b" }}>Encerrado</span>
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

  window.GestorHistoricoView = GestorHistoricoView;
})();
