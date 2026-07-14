// Dashboard — consolidated control view for the gestão.
(function () {
  const NS = window.CicloDeDesenvolvimentoDesignSystem_cb4518;
  const { MetricCard, Card, DataTable, FilterBar, TextField, Select, StatusBadge, Button, Avatar } = NS;
  const { Icon, statusFromForms, statusLabel, pdiStats, fmtDate, prazoFinal } = window.CicloHelpers;

  function DashboardScreen({ colabs, funcionarios = [], onOpen }) {
    const [q, setQ] = React.useState("");
    const [status, setStatus] = React.useState("");
    const [area, setArea] = React.useState("");

    const areas = [...new Set(colabs.map((c) => c.revenda).filter(Boolean))];

    const total = colabs.length;
    const completos = colabs.filter((c) => statusFromForms(c) === "completo").length;
    const aguardando = colabs.filter((c) => statusFromForms(c) === "parcial").length;
    const pct = total ? Math.round((completos / total) * 100) : 0;
    const s = pdiStats(colabs);
    const pdiTotal = s.tecTotal + s.compTotal;
    const pdiDone = s.tecDone + s.compDone;
    const pdiGeralPct = pdiTotal ? Math.round((pdiDone / pdiTotal) * 100) : 0;

    const rows = colabs.filter((c) => {
      const mq = !q || c.nome.toLowerCase().includes(q.toLowerCase()) || (c.cargo || "").toLowerCase().includes(q.toLowerCase());
      const ms = !status || statusFromForms(c) === status;
      const ma = !area || c.revenda === area;
      return mq && ms && ma;
    });
    const ativos = funcionarios.filter((x) => !x.demitido).length;

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "14px" }}>
          <MetricCard value={ativos} label="Colaboradores Ativos" icon={<Icon name="users" size={20} />} />
          <MetricCard value={total} label="Total de Ciclos" tone="default" icon={<Icon name="repeat" size={20} />} />
          <MetricCard value={completos} label="Ciclos Completos" tone="completo" icon={<Icon name="check-circle-2" size={20} />} />
          <MetricCard value={pct + "%"} label="Taxa de Conclusão" tone="accent" icon={<Icon name="trending-up" size={20} />} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "14px" }}>
          <MetricCard value={s.tecTotal + s.compTotal} label="PDIs Cadastrados (Téc + Comp)" tone="default" icon={<Icon name="list-checks" size={20} />} />
          <MetricCard value={s.tecTotal} label="PDIs Técnicos" tone="default" icon={<Icon name="wrench" size={20} />} />
          <MetricCard value={s.compTotal} label="PDIs Comportamentais" tone="default" icon={<Icon name="brain" size={20} />} />
          <MetricCard value={pdiGeralPct + "%"} label="Conclusão dos PDIs" tone="accent" icon={<Icon name="trending-up" size={20} />} />
        </div>

        <Card title="Controle Unificado — Gestor × Colaborador">
          <FilterBar>
            <div style={{ flex: 2, minWidth: 200, position: "relative" }}>
              <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", pointerEvents: "none" }}>
                <Icon name="search" size={15} />
              </span>
              <TextField placeholder="Buscar colaborador ou cargo..." value={q} onChange={(e) => setQ(e.target.value)} style={{ paddingLeft: 32 }} />
            </div>
            <div style={{ flex: 1, minWidth: 150 }}>
              <Select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="">Todos os status</option>
                <option value="completo">Completo</option>
                <option value="parcial">Em andamento</option>
                <option value="pendente">Pendente</option>
              </Select>
            </div>
            <div style={{ flex: 1, minWidth: 150 }}>
              <Select value={area} onChange={(e) => setArea(e.target.value)}>
                <option value="">Todas as áreas</option>
                {areas.map((a) => <option key={a} value={a}>{a}</option>)}
              </Select>
            </div>
          </FilterBar>

          <DataTable
            rowKey={(r) => r.id}
            empty="Nenhum ciclo encontrado."
            columns={[
              {
                key: "nome", header: "Colaborador", render: (r) => (
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Avatar name={r.nome} size={30} tone="soft" />
                    <div>
                      <div style={{ fontWeight: 700 }}>{r.nome}</div>
                      <div style={{ fontSize: 11, color: "var(--text-muted)" }}>
                        {[r.cargo, r.revenda, r.cicloNum, `aplicação ${fmtDate(r.data)}`, `prazo ${fmtDate(prazoFinal(r))}`].filter(Boolean).join(" · ")}
                      </div>
                    </div>
                  </div>
                )
              },
              { key: "gestor", header: "Gestor", render: (r) => <span style={{ fontSize: 13 }}>{r.gestor || "—"}</span> },
              { key: "g", header: "Form. Gestor", align: "center", render: (r) => <Icon name={r.gestorForm ? "check-circle-2" : "circle-dashed"} size={18} color={r.gestorForm ? "var(--positive)" : "var(--ab-gray-400)"} /> },
              { key: "c", header: "Form. Colab.", align: "center", render: (r) => <Icon name={r.colabForm ? "check-circle-2" : "circle-dashed"} size={18} color={r.colabForm ? "var(--positive)" : "var(--ab-gray-400)"} /> },
              { key: "status", header: "Status", render: (r) => <StatusBadge status={statusFromForms(r)} label={statusLabel(r)} /> },
              {
                key: "acoes", header: "", align: "right", render: (r) => (
                  <Button size="sm" variant="ghost" onClick={() => onOpen(r)} iconLeft={<Icon name="eye" size={14} />}>Ver</Button>
                )
              },
            ]}
            rows={rows}
          />
        </Card>
      </div>
    );
  }

  window.DashboardScreen = DashboardScreen;
})();
