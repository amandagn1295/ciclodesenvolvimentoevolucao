// One-pager da Visão Geral do RH — respeita os filtros aplicados na tela, pronto para "Salvar como PDF".
(function () {
  const AZUL = "#0f4b87", LARANJA = "#ff931e";
  const COR_OK = "#1f8a5b", COR_ALERTA = "#e07d09", COR_RUIM = "#c81e28";
  function corPct(p) { return p >= 80 ? COR_OK : p >= 50 ? COR_ALERTA : COR_RUIM; }

  function Kpi({ value, label }) {
    return <div style={{ flex: 1, textAlign: "center", background: "#f5f7fa", borderRadius: 8, padding: "14px 8px" }}><div style={{ fontSize: 26, fontWeight: 800, color: AZUL }}>{value}</div><div style={{ fontSize: 10.5, color: "#666", textTransform: "uppercase", letterSpacing: ".03em" }}>{label}</div></div>;
  }

  function Quadrant({ title, color, children }) {
    return (
      <div style={{ display: "flex", flexDirection: "column", background: "#fafbfc", border: "1px solid #e2e7ee", borderRadius: 10, padding: 14, minHeight: 0, overflow: "hidden" }}>
        <div style={{ background: color || AZUL, color: "#fff", padding: "6px 12px", borderRadius: 6, fontSize: 11.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".03em", marginBottom: 10 }}>{title}</div>
        <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column", justifyContent: "flex-start", gap: 8 }}>{children}</div>
      </div>
    );
  }

  function RhDashboardPrintView({ filtrosResumo, dados, onClose }) {
    if (!dados) return null;
    const d = dados;
    return (
      <div id="rh-print-overlay" style={{ position: "fixed", inset: 0, background: "#525659", zIndex: 4000, overflowY: "auto", padding: "24px 0" }}>
        <style>{`@media print {
          html, body { height: 100% !important; overflow: hidden !important; }
          body * { visibility: hidden !important; }
          #rh-print-overlay, #rh-print-overlay * { visibility: visible !important; }
          #rh-print-overlay { position: fixed !important; inset: 0 !important; background: #fff !important; padding: 0 !important; overflow: hidden !important; }
          #rh-print { position: absolute !important; inset: 0 !important; width: 100% !important; height: 100% !important; max-width: none !important; margin: 0 !important; box-shadow: none !important; overflow: hidden !important; }
          .no-print { display: none !important; }
          @page { size: 297mm 167mm; margin: 8mm; }
        }`}</style>

        <div className="no-print" style={{ position: "sticky", top: 0, display: "flex", justifyContent: "center", gap: 12, marginBottom: 20, zIndex: 1 }}>
          <button onClick={() => window.print()} style={{ background: LARANJA, color: "#fff", border: "none", borderRadius: 8, padding: "10px 20px", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>Baixar PDF</button>
          <button onClick={onClose} style={{ background: "#fff", color: AZUL, border: "none", borderRadius: 8, padding: "10px 20px", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>Fechar</button>
        </div>

        <div id="rh-print" style={{ background: "#fff", width: 1200, height: 675, maxWidth: "96vw", margin: "0 auto", padding: 26, fontFamily: "var(--font-sans)", boxShadow: "0 4px 24px rgba(0,0,0,.3)", display: "flex", flexDirection: "column", gap: 14, boxSizing: "border-box", overflow: "hidden" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "3px solid " + LARANJA, paddingBottom: 10, flex: "0 0 auto" }}>
            <div>
              <div style={{ fontSize: 20, fontWeight: 800, color: AZUL }}>Ciclo de Desenvolvimento e Evolução — Visão Geral do RH</div>
              <div style={{ fontSize: 11, color: "#666", marginTop: 2 }}>Filtros aplicados: {filtrosResumo || "nenhum"}</div>
            </div>
            <div style={{ fontSize: 11, color: "#666", textAlign: "right" }}>Gerado em {new Date().toLocaleDateString("pt-BR")}<br />Grupo Águia Branca · Divisão Comércio</div>
          </div>

          <div style={{ display: "flex", gap: 12, flex: "0 0 auto" }}>
            <Kpi value={d.colaboradoresAtivos} label="Colaboradores Ativos" />
            <Kpi value={d.gestoresAtivos} label="Gestores Ativos" />
            <Kpi value={d.pendentesSemAbrir} label="Pendentes sem Ciclo Aberto" />
            <Kpi value={d.realizados} label="Ciclo Realizado" />
            <Kpi value={d.pctRealizacao + "%"} label="Taxa de Realização" />
          </div>

          <div style={{ flex: 1, minHeight: 0, display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr", gap: 14 }}>
            <Quadrant title="Funil do Ciclo e Indicadores">
              {[{ label: "Elegíveis", value: d.totalElegivel, color: "#0f7cb9" }, { label: "Iniciados", value: d.iniciadosPessoas, color: COR_ALERTA }, { label: "Concluídos", value: d.realizados, color: COR_OK }].map((s) => (
                <div key={s.label} style={{ display: "grid", gridTemplateColumns: "90px 1fr 30px", gap: 10, alignItems: "center" }}>
                  <span style={{ fontSize: 12, color: "#666" }}>{s.label}</span>
                  <div style={{ height: 16, borderRadius: 6, background: "#eef1f5", overflow: "hidden" }}><div style={{ height: "100%", width: d.totalElegivel ? `${(s.value / d.totalElegivel) * 100}%` : "0%", background: s.color, borderRadius: 6 }} /></div>
                  <span style={{ fontSize: 13, fontWeight: 700, color: AZUL, textAlign: "right" }}>{s.value}</span>
                </div>
              ))}
              <div style={{ display: "flex", gap: 24, marginTop: 10, borderTop: "1px solid #e2e7ee", paddingTop: 10 }}>
                <div style={{ fontSize: 13 }}>Conclusão do Ciclo<br /><strong style={{ fontSize: 20, color: corPct(d.pctConclusaoCiclo) }}>{d.pctConclusaoCiclo}%</strong></div>
                <div style={{ fontSize: 13 }}>Gestores em Dia<br /><strong style={{ fontSize: 20, color: corPct(d.pctGestoresEmDia) }}>{d.pctGestoresEmDia}%</strong></div>
              </div>
            </Quadrant>

            <Quadrant title="Diretoria × Realização" color={AZUL}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12.5 }}>
                <thead><tr style={{ textAlign: "left", color: "#888" }}><th style={{ padding: "4px 6px" }}>Diretoria</th><th style={{ padding: "4px 6px" }}>Eleg.</th><th style={{ padding: "4px 6px" }}>Real.</th><th style={{ padding: "4px 6px" }}>%</th></tr></thead>
                <tbody>
                  {(d.diretoriaData || []).slice(0, 6).map((x) => {
                    const pct = x.value ? Math.round((x.concluidos / x.value) * 100) : 0;
                    return (
                      <tr key={x.label} style={{ borderTop: "1px solid #eee" }}>
                        <td style={{ padding: "5px 6px" }}>{x.label}</td><td style={{ padding: "5px 6px" }}>{x.value}</td><td style={{ padding: "5px 6px" }}>{x.concluidos}</td>
                        <td style={{ padding: "5px 6px" }}><span style={{ background: corPct(pct), color: "#fff", fontWeight: 700, borderRadius: 4, padding: "2px 8px", fontSize: 11 }}>{pct}%</span></td>
                      </tr>
                    );
                  })}
                  {(!d.diretoriaData || d.diretoriaData.length === 0) && <tr><td colSpan={4} style={{ padding: 10, color: "#888" }}>Sem dados.</td></tr>}
                </tbody>
              </table>
            </Quadrant>

            <Quadrant title="Melhor Taxa de Realização" color={COR_OK}>
              {(d.melhores || []).length === 0 && <div style={{ fontSize: 12, color: "#888" }}>Sem dados suficientes.</div>}
              {(d.melhores || []).slice(0, 5).map((x) => <div key={x.g.id} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, borderBottom: "1px solid #eee", padding: "5px 2px" }}><span>{x.g.nome}</span><strong style={{ color: COR_OK }}>{x.pct}%</strong></div>)}
            </Quadrant>

            <Quadrant title="Mais Pendências" color={COR_RUIM}>
              {(d.piores || []).filter((x) => x.pendG > 0).length === 0 && <div style={{ fontSize: 12, color: "#888" }}>Nenhuma pendência.</div>}
              {(d.piores || []).filter((x) => x.pendG > 0).slice(0, 5).map((x) => <div key={x.g.id} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, borderBottom: "1px solid #eee", padding: "5px 2px" }}><span>{x.g.nome}</span><strong style={{ color: COR_RUIM }}>{x.pendG}</strong></div>)}
            </Quadrant>
          </div>
        </div>
      </div>
    );
  }

  window.RhDashboardPrintView = RhDashboardPrintView;
})();
