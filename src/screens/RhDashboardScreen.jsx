// RH — Dashboard geral: métricas, filtro por diretoria/gestor, alertas de ciclo vencendo, export Excel.
(function () {
  const NS = window.CicloDeDesenvolvimentoDesignSystem_cb4518;
  const { MetricCard, Card, DataTable, FilterBar, TextField, Select, StatusBadge, Button, Avatar, Banner } = NS;
  const { Icon, statusFromForms, statusLabel, fmtDate, prazoFinal, diasPara, ciclosPrevistos, proximoCicloPrevisto } = window.CicloHelpers;

  function RhDashboardScreen({ colabs, gestores, funcionarios }) {
    const [q, setQ] = React.useState("");
    const [status, setStatus] = React.useState("");
    const [diretoria, setDiretoria] = React.useState("");
    const [gestorId, setGestorId] = React.useState("");

    const diretorias = [...new Set((gestores || []).map((g) => g.diretoria).filter(Boolean))];
    const gestoresDaDiretoria = (gestores || []).filter((g) => !diretoria || g.diretoria === diretoria);
    const gestorNome = (gid) => { const g = (gestores || []).find((x) => x.id === gid); return g ? g.nome : "—"; };
    const gestorDiretoria = (gid) => { const g = (gestores || []).find((x) => x.id === gid); return g ? g.diretoria : ""; };

    const rows = colabs.filter((c) => {
      const mq = !q || c.nome.toLowerCase().includes(q.toLowerCase()) || (c.cargo || "").toLowerCase().includes(q.toLowerCase()) || (c.gestor || "").toLowerCase().includes(q.toLowerCase());
      const ms = !status || statusFromForms(c) === status;
      const md = !diretoria || c.orgDiretoria === diretoria;
      const mg = !gestorId || c.funcionarioGestorId === gestorId;
      return mq && ms && md && mg;
    });

    const total = rows.length;
    const completos = rows.filter((c) => statusFromForms(c) === "completo").length;
    const pct = total ? Math.round((completos / total) * 100) : 0;
    const gestoresAtivos = (gestores || []).filter((g) => !g.desligado).length;

    // Colaboradores ativos (respeitando os filtros de diretoria/gestor da tela).
    const colaboradoresAtivosLista = (funcionarios || []).filter((f) =>
      !f.demitido && (!gestorId || f.gestorId === gestorId) && (!diretoria || gestorDiretoria(f.gestorId) === diretoria)
    );
    const colaboradoresAtivos = colaboradoresAtivosLista.length;

    // Ciclos previstos x realizados: cada colaborador ativo "gera" um novo ciclo previsto a
    // cada 6 meses completos desde a admissão. Comparamos com quantos ciclos já foram
    // efetivamente cadastrados para ele (em qualquer status).
    const previsaoPorColaborador = colaboradoresAtivosLista.map((f) => {
      const realizados = colabs.filter((c) => c.funcionarioId === f.id).length;
      const previstos = ciclosPrevistos(f.admissao);
      const proximo = proximoCicloPrevisto(f.admissao, realizados);
      return { f, realizados, previstos, pendente: Math.max(previstos - realizados, 0), proximo };
    });
    const totalPrevistos = previsaoPorColaborador.reduce((acc, x) => acc + x.previstos, 0);
    const totalRealizados = previsaoPorColaborador.reduce((acc, x) => acc + x.realizados, 0);
    const totalPendentes = previsaoPorColaborador.reduce((acc, x) => acc + x.pendente, 0);

    // Alertas de ciclos JÁ ABERTOS vencendo (prazo de 180 dias do preenchimento).
    const alertasAbertos = rows
      .filter((c) => !c.encerrado)
      .map((c) => ({ ...c, dias: diasPara(prazoFinal(c)) }))
      .filter((c) => c.dias !== null && c.dias <= 30)
      .sort((a, b) => a.dias - b.dias);

    // Alertas de NOVOS ciclos previstos (colaborador completou +6 meses e ainda não tem
    // o próximo ciclo cadastrado) — vencendo em até 30 dias ou já atrasados.
    const alertasPrevistos = previsaoPorColaborador
      .filter((x) => x.pendente > 0 && x.proximo && x.proximo.dias <= 30)
      .sort((a, b) => a.proximo.dias - b.proximo.dias);

    const exportar = () => {
      window.CicloBulk.exportRows(
        rows,
        [
          { label: "Colaborador", key: "nome" },
          { label: "Gestor", key: "gestor" },
          { label: "Diretoria", key: "orgDiretoria" },
          { label: "Regional", key: "orgRegional" },
          { label: "Cargo", key: "cargo" },
          { label: "Ciclo", key: "cicloNum" },
          { label: "Data de Aplicação", value: (r) => fmtDate(r.data) },
          { label: "Prazo Final", value: (r) => fmtDate(prazoFinal(r)) },
          { label: "Status", value: (r) => statusLabel(r) },
          { label: "Encerrado", value: (r) => (r.encerrado ? "Sim" : "Não") },
        ],
        "relatorio-ciclos.xlsx",
        "Ciclos"
      );
    };

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "14px" }}>
          <MetricCard value={colaboradoresAtivos} label="Colaboradores Ativos" icon={<Icon name="users" size={20} />} />
          <MetricCard value={gestoresAtivos} label="Gestores Ativos" icon={<Icon name="shield" size={20} />} />
          <MetricCard value={pct + "%"} label="Taxa de Conclusão (formulários)" tone="accent" icon={<Icon name="trending-up" size={20} />} />
          <MetricCard value={totalPrevistos} label="Ciclos Previstos (desde a admissão)" icon={<Icon name="calendar-clock" size={20} />} />
          <MetricCard value={totalRealizados} label="Ciclos Realizados" tone="default" icon={<Icon name="check-circle-2" size={20} />} />
          <MetricCard value={totalPendentes} label="Ciclos Pendentes de Abertura" tone={totalPendentes > 0 ? "accent" : "default"} icon={<Icon name="alarm-clock" size={20} />} />
        </div>

        {alertasPrevistos.length > 0 && (
          <Card title="Alertas — novos ciclos previstos (a cada 6 meses)" action={<Icon name="calendar-clock" size={18} color="var(--ab-laranja)" />}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {alertasPrevistos.slice(0, 8).map((x) => (
                <Banner key={x.f.id} tone={x.proximo.dias < 0 ? "neutral" : "accent"} icon={<Icon name={x.proximo.dias < 0 ? "alert-circle" : "calendar-clock"} size={16} color={x.proximo.dias < 0 ? "var(--danger)" : "var(--ab-laranja-600)"} />} style={x.proximo.dias < 0 ? { borderColor: "var(--danger)" } : undefined}>
                  <strong>{x.f.nome}</strong> ({gestorNome(x.f.gestorId)}) — {x.proximo.numero}º ciclo {x.proximo.dias < 0 ? `atrasado há ${Math.abs(x.proximo.dias)} dia(s)` : x.proximo.dias === 0 ? "previsto para hoje" : `previsto em ${x.proximo.dias} dia(s)`}, a partir de {fmtDate(x.proximo.data)}
                </Banner>
              ))}
              {alertasPrevistos.length > 8 && <div style={{ fontSize: 12, color: "var(--text-muted)" }}>+ {alertasPrevistos.length - 8} outro(s) colaborador(es) com novo ciclo previsto.</div>}
            </div>
          </Card>
        )}

        {alertasAbertos.length > 0 && (
          <Card title="Alertas — ciclos abertos chegando para vencer" action={<Icon name="alarm-clock" size={18} color="var(--ab-laranja)" />}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {alertasAbertos.slice(0, 8).map((c) => (
                <Banner key={c.id} tone={c.dias < 0 ? "neutral" : "accent"} icon={<Icon name={c.dias < 0 ? "alert-circle" : "alarm-clock"} size={16} color={c.dias < 0 ? "var(--danger)" : "var(--ab-laranja-600)"} />} style={c.dias < 0 ? { borderColor: "var(--danger)" } : undefined}>
                  <strong>{c.nome}</strong> ({c.gestor || "—"}) — {c.dias < 0 ? `venceu há ${Math.abs(c.dias)} dia(s)` : c.dias === 0 ? "vence hoje" : `vence em ${c.dias} dia(s)`}, prazo {fmtDate(prazoFinal(c))}
                </Banner>
              ))}
              {alertasAbertos.length > 8 && <div style={{ fontSize: 12, color: "var(--text-muted)" }}>+ {alertasAbertos.length - 8} outro(s) ciclo(s) próximos do vencimento.</div>}
            </div>
          </Card>
        )}
        <Card title="Controle Geral — Todos os Gestores" action={<Button size="sm" variant="secondary" iconLeft={<Icon name="file-down" size={14} />} onClick={exportar}>Exportar (Excel)</Button>}>
          <FilterBar>
            <div style={{ flex: 2, minWidth: 200, position: "relative" }}>
              <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", pointerEvents: "none" }}><Icon name="search" size={15} /></span>
              <TextField placeholder="Buscar colaborador, cargo ou gestor..." value={q} onChange={(e) => setQ(e.target.value)} style={{ paddingLeft: 32 }} />
            </div>
            <div style={{ flex: 1, minWidth: 150 }}>
              <Select value={diretoria} onChange={(e) => { setDiretoria(e.target.value); setGestorId(""); }}>
                <option value="">Todas as diretorias</option>
                {diretorias.map((d) => <option key={d} value={d}>{d}</option>)}
              </Select>
            </div>
            <div style={{ flex: 1, minWidth: 150 }}>
              <Select value={gestorId} onChange={(e) => setGestorId(e.target.value)}>
                <option value="">Todos os gestores</option>
                {gestoresDaDiretoria.map((g) => <option key={g.id} value={g.id}>{g.nome}</option>)}
              </Select>
            </div>
            <div style={{ flex: 1, minWidth: 150 }}>
              <Select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="">Todos os status</option>
                <option value="completo">Completo</option>
                <option value="parcial">Em andamento</option>
                <option value="pendente">Pendente</option>
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
                      <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{[r.cargo, r.orgDiretoria, r.cicloNum, `prazo ${fmtDate(prazoFinal(r))}`].filter(Boolean).join(" · ")}</div>
                    </div>
                  </div>
                )
              },
              { key: "gestor", header: "Gestor", render: (r) => <span style={{ fontSize: 13 }}>{r.gestor || "—"}</span> },
              { key: "status", header: "Status", render: (r) => <StatusBadge status={statusFromForms(r)} label={statusLabel(r)} /> },
            ]}
            rows={rows}
          />
        </Card>
      </div>
    );
  }

  window.RhDashboardScreen = RhDashboardScreen;
})();
