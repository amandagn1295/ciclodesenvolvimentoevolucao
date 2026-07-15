// Aba PDI — acompanhamento do PDI técnico e comportamental por colaborador.
(function () {
  const NS = window.CicloDeDesenvolvimentoDesignSystem_cb4518;
  const { Card, MetricCard, Select, Field, StatusBadge, Avatar, Banner, DateField, Button } = NS;
  const { Icon, fmtDate, prazoFinal, pdiStats, diasPara } = window.CicloHelpers;

  function pdiRows(c) { const g = c.feedbackForm || {}; return [...(g.rowsTec || []), ...(g.rowsComp || [])]; }
  function pdiSituacao(c) {
    const rows = pdiRows(c);
    if (!rows.length) return "pendente";
    return rows.every((r) => r.done) ? "concluido" : "andamento";
  }
  function acoesVencidas(c) { return pdiRows(c).filter((r) => !r.done && r.data && diasPara(r.data) < 0).length; }
  const SITUACAO_LABEL = { pendente: "Pendente", andamento: "Em Andamento", concluido: "Concluído" };

  function countActions(c) {
    const g = c.feedbackForm || {};
    return ((g.rowsTec || []).length) + ((g.rowsComp || []).length);
  }

  // Tabela de acompanhamento: Ação · Data Acordada · Realizada? · Data de Conclusão
  function AcaoTable({ rows, tipo, colabId, onUpdate, locked }) {
    if (!rows || !rows.length) {
      return <span style={{ fontSize: 12, color: "var(--text-muted)" }}>Nenhuma ação registrada.</span>;
    }
    const cols = "1fr 118px 96px 150px";
    const head = { fontSize: "var(--fs-label)", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".03em", color: "var(--ab-azul-escuro)" };
    return (
      <div>
        <div style={{ display: "grid", gridTemplateColumns: cols, gap: 8, marginBottom: 6, alignItems: "end" }}>
          <span style={head}>Ação</span>
          <span style={{ ...head, color: "var(--ab-laranja-600)" }}>Data Acordada</span>
          <span style={{ ...head, textAlign: "center" }}>Realizada</span>
          <span style={head}>Data de Conclusão</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {rows.map((r, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: cols, gap: 8, alignItems: "center", padding: "8px 10px", borderRadius: "var(--radius-sm)", background: r.done ? "var(--positive-bg)" : "var(--ab-gray-50)", border: "1px solid " + (r.done ? "var(--positive)" : "var(--border-subtle)") }}>
              <div style={{ fontSize: 13, color: "var(--text-strong)" }}>
                <div style={{ fontWeight: 600 }}>{r.acao || "—"}</div>
                {r.desdobramento && <div style={{ fontSize: 11.5, color: "var(--text-muted)", marginTop: 2 }}>{r.desdobramento}</div>}
              </div>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "var(--ab-laranja-600)" }}>{fmtDate(r.data)}</div>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <button
                  onClick={() => !locked && onUpdate(colabId, tipo, i, r.done ? { done: false, doneDate: "" } : { done: true, doneDate: r.doneDate || new Date().toISOString().slice(0, 10) })}
                  disabled={locked}
                  title={r.done ? "Marcar como não realizada" : "Marcar como realizada"}
                  style={{ width: 26, height: 26, borderRadius: 6, cursor: locked ? "default" : "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", border: "1.5px solid " + (r.done ? "var(--positive)" : "var(--border-default)"), background: r.done ? "var(--positive)" : "#fff", color: "#fff", padding: 0 }}
                >
                  {r.done && <Icon name="check" size={15} color="#fff" />}
                </button>
              </div>
              <div>
                {r.done
                  ? <DateField value={r.doneDate || ""} disabled={locked} onChange={(e) => onUpdate(colabId, tipo, i, { done: true, doneDate: e.target.value })} style={{ height: 34 }} />
                  : <span style={{ fontSize: 12, color: "var(--text-muted)" }}>—</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  window.AcaoTable = AcaoTable;

  function PdiScreen({ colabs, onUpdateAction }) {
    const withPdi = colabs.filter((c) => countActions(c) > 0);
    const [sel, setSel] = React.useState("todos");
    const [situacao, setSituacao] = React.useState("todas");
    const porSituacao = situacao === "todas" ? withPdi : withPdi.filter((c) => pdiSituacao(c) === situacao);
    const list = sel === "todos" ? porSituacao : porSituacao.filter((c) => c.id === sel);
    const s = pdiStats(sel === "todos" ? withPdi : list);
    const vencidos = withPdi.filter((c) => acoesVencidas(c) > 0).length;
    const contagem = { pendente: 0, andamento: 0, concluido: 0 };
    withPdi.forEach((c) => contagem[pdiSituacao(c)]++);

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
          <MetricCard value={contagem.pendente} label="PDIs Pendentes" tone="default" icon={<Icon name="circle-dashed" size={20} />} />
          <MetricCard value={contagem.andamento} label="PDIs em Andamento" tone="accent" icon={<Icon name="route" size={20} />} />
          <MetricCard value={contagem.concluido} label="PDIs Concluídos" tone="completo" icon={<Icon name="check-circle-2" size={20} />} />
          <MetricCard value={vencidos} label="Colaboradores com Ações Vencidas" tone={vencidos > 0 ? "accent" : "default"} icon={<Icon name="alarm-clock" size={20} />} />
        </div>

        <Card title="Acompanhamento de PDI" action={<Icon name="route" size={18} color="var(--ab-azul-claro)" />}>
          <Banner tone="info" icon={<Icon name="info" size={16} />} style={{ marginBottom: 14 }}>
            Planos de Desenvolvimento Individual acordados no ciclo. O <strong>colaborador</strong> atualiza cada ação como realizada e registra a <strong>data de conclusão</strong> pelo link dele; o <strong>gestor</strong> acompanha o progresso aqui.
          </Banner>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 14 }}>
            {["todas", "pendente", "andamento", "concluido"].map((k) => (
              <Button key={k} size="sm" variant={situacao === k ? "primary" : "secondary"} onClick={() => setSituacao(k)}>{k === "todas" ? "Todas" : SITUACAO_LABEL[k]}</Button>
            ))}
          </div>
          <Field label="Colaborador">
            <Select value={sel} onChange={(e) => setSel(e.target.value)}>
              <option value="todos">Todos os colaboradores ({porSituacao.length})</option>
              {porSituacao.map((c) => <option key={c.id} value={c.id}>{c.nome} — {c.revenda}</option>)}
            </Select>
          </Field>
        </Card>

        {list.length === 0 && (
          <Card><div style={{ textAlign: "center", padding: 30, color: "var(--text-muted)" }}>Nenhum PDI registrado ainda.</div></Card>
        )}

        {list.map((c) => {
          const g = c.feedbackForm || {};
          return (
            <Card key={c.id}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4, flexWrap: "wrap" }}>
                <Avatar name={c.nome} size={36} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>{c.nome}</div>
                  <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{c.revenda} · {c.cicloNum} · prazo {fmtDate(prazoFinal(c))}</div>
                </div>
                {c.encerrado
                  ? <StatusBadge status="completo" label="Ciclo Encerrado" />
                  : <StatusBadge status="parcial" label="Em Andamento" />}
                <StatusBadge status={pdiSituacao(c) === "concluido" ? "completo" : pdiSituacao(c) === "andamento" ? "parcial" : "pendente"} label={"PDI " + SITUACAO_LABEL[pdiSituacao(c)]} />
                {acoesVencidas(c) > 0 && <StatusBadge status="pendente" label={`${acoesVencidas(c)} ação(ões) vencida(s)`} />}
              </div>

              {c.alvo && (
                <Banner tone="accent" icon={<Icon name="target" size={15} />} title="Alvo" style={{ marginTop: 4 }}>{c.alvo}</Banner>
              )}

              <div style={{ marginTop: 14 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 8, fontSize: "var(--fs-label)", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".05em", color: "var(--ab-azul-escuro)" }}>
                  <Icon name="wrench" size={14} color="var(--ab-azul-claro)" /> PDI Técnico
                </div>
                <AcaoTable rows={g.rowsTec} tipo="tec" colabId={c.id} onUpdate={onUpdateAction} locked={true} />
              </div>

              <div style={{ marginTop: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 8, fontSize: "var(--fs-label)", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".05em", color: "var(--ab-azul-escuro)" }}>
                  <Icon name="brain" size={14} color="var(--ab-laranja)" /> PDI Comportamental
                </div>
                <AcaoTable rows={g.rowsComp} tipo="comp" colabId={c.id} onUpdate={onUpdateAction} locked={true} />
              </div>
            </Card>
          );
        })}
      </div>
    );
  }

  window.PdiScreen = PdiScreen;
})();
