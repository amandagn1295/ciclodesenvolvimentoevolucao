// Dashboard — consolidated control view for the gestão.
(function () {
  const NS = window.CicloDeDesenvolvimentoDesignSystem_cb4518;
  const { MetricCard, Card, DataTable, FilterBar, TextField, Select, StatusBadge, Button, Avatar } = NS;
  const { Icon, statusFromForms, statusLabel, pdiStats, fmtDate, prazoFinal, diasPara, titleCase, statusColaboradorCiclo } = window.CicloHelpers;
  const COR_OK = "#1f8a5b", COR_ALERTA = "#e07d09", COR_RUIM = "#c81e28";

  function DashboardScreen({ colabs, funcionarios = [], onOpen, gestor, todosGestores, ciclosViewGeral, todosFuncionarios, onNavigate }) {
    const [q, setQ] = React.useState("");
    const [status, setStatus] = React.useState("");
    const [area, setArea] = React.useState("");

    const areas = [...new Set(colabs.map((c) => c.revenda).filter(Boolean))];

    const total = colabs.length;
    const completos = colabs.filter((c) => statusFromForms(c) === "completo").length;
    const aguardando = colabs.filter((c) => statusFromForms(c) === "parcial").length;
    const pctConclusaoCiclo = total ? Math.round((completos / total) * 100) : 0;
    const statusPorColaborador = funcionarios.filter((f) => !f.demitido).map((f) => { const ciclosDoFunc = colabs.filter((c) => c.funcionarioId === f.id); return { f, status: statusColaboradorCiclo(f.admissao, ciclosDoFunc), temCicloAberto: ciclosDoFunc.some((c) => !c.encerrado) }; });
    const realizados = statusPorColaborador.filter((x) => x.status === "realizado").length;
    const pendentesElegiveis = statusPorColaborador.filter((x) => x.status === "pendente").length;
    const pendentesSemAbrir = statusPorColaborador.filter((x) => x.status === "pendente" && !x.temCicloAberto).length;
    const iniciados = realizados + (pendentesElegiveis - pendentesSemAbrir);
    const totalElegivel = realizados + pendentesElegiveis;
    const pctRealizacao = totalElegivel ? Math.round((realizados / totalElegivel) * 100) : 0;
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
    const atrasados = colabs.filter((c) => !c.encerrado && diasPara(prazoFinal(c)) !== null && diasPara(prazoFinal(c)) < 0);
    const vencidos = atrasados.map((c) => ({ ...c, dias: diasPara(prazoFinal(c)) })).sort((a, b) => a.dias - b.dias).slice(0, 6);
    const proximos = colabs.filter((c) => !c.encerrado).map((c) => ({ ...c, dias: diasPara(prazoFinal(c)) })).filter((c) => c.dias !== null && c.dias >= 0 && c.dias <= 7).sort((a, b) => a.dias - b.dias).slice(0, 6);

    // Posição do gestor dentro da diretoria (ranking por Taxa de Realização: elegíveis × realizados).
    const diretoriaAtual = gestor ? titleCase(gestor.diretoria) : "";
    const paresDiretoria = (todosGestores || []).filter((g) => !g.desligado && titleCase(g.diretoria) === diretoriaAtual);
    const rankingDiretoria = paresDiretoria.map((g) => {
      const seusFuncs = (todosFuncionarios || []).filter((f) => !f.demitido && f.gestorId === g.id);
      const seusCiclos = (ciclosViewGeral || []).filter((c) => c.funcionarioGestorId === g.id);
      const statusSeus = seusFuncs.map((f) => statusColaboradorCiclo(f.admissao, seusCiclos.filter((c) => c.funcionarioId === f.id)));
      const realizadosG = statusSeus.filter((s) => s === "realizado").length;
      const elegivelG = realizadosG + statusSeus.filter((s) => s === "pendente").length;
      return { id: g.id, nome: g.nome, pct: elegivelG ? Math.round((realizadosG / elegivelG) * 100) : 0 };
    }).sort((a, b) => b.pct - a.pct);
    const minhaPosicao = gestor ? rankingDiretoria.findIndex((x) => x.id === gestor.id) + 1 : 0;
    const mediaDiretoria = rankingDiretoria.length ? Math.round(rankingDiretoria.reduce((a, x) => a + x.pct, 0) / rankingDiretoria.length) : 0;

    // PDI da equipe.
    const pdiRows = (c) => { const g = c.feedbackForm || {}; return [...(g.rowsTec || []), ...(g.rowsComp || [])]; };
    const comPdi = colabs.filter((c) => pdiRows(c).length > 0);
    const pdiPendentes = comPdi.filter((c) => pdiRows(c).every((r) => !r.done)).length;
    const pdiAndamento = comPdi.filter((c) => pdiRows(c).some((r) => r.done) && !pdiRows(c).every((r) => r.done)).length;
    const pdiConcluidos = comPdi.filter((c) => pdiRows(c).every((r) => r.done)).length;

    // Colaboradores elegíveis (já completaram 6 meses) sem nenhum ciclo encerrado ainda.
    const semCiclo = statusPorColaborador.filter((x) => x.status === "pendente").map((x) => x.f);

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <Card title="Taxa de Realização (Previsto × Realizado)" style={{ background: "var(--surface-brand-soft)", border: "1px solid var(--role-feedback)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div style={{ fontSize: 44, fontWeight: 800, color: "var(--ab-azul-escuro)" }}>{pctRealizacao}%</div>
            <div style={{ fontSize: 12.5, color: "var(--text-muted)", lineHeight: 1.6 }}>
              <strong>{realizados}</strong> colaboradores com ciclo em dia de <strong>{totalElegivel}</strong> elegíveis (já passaram 6 meses desde a admissão ou desde o último ciclo concluído).
            </div>
          </div>
        </Card>

        <Card title="Funil do Ciclo">
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[{ label: "Elegíveis", value: totalElegivel, color: "var(--ab-azul-claro)" }, { label: "Iniciados", value: iniciados, color: COR_ALERTA }, { label: "Concluídos", value: realizados, color: COR_OK }].map((s, i) => (
              <div key={s.label} style={{ display: "grid", gridTemplateColumns: "110px 1fr 34px", gap: 10, alignItems: "center" }}>
                <span style={{ fontSize: 12.5, color: "var(--text-muted)" }}>{s.label}</span>
                <div style={{ height: 18, borderRadius: 6, background: "var(--surface-sunken)", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: totalElegivel ? `${(s.value / totalElegivel) * 100}%` : "0%", background: s.color, borderRadius: 6 }} />
                </div>
                <span style={{ fontSize: 13, fontWeight: 700, color: "var(--ab-azul-escuro)", textAlign: "right" }}>{s.value}</span>
              </div>
            ))}
          </div>
        </Card>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "14px" }}>
          <MetricCard value={ativos} label="Colaboradores Ativos" icon={<Icon name="users" size={20} />} />
          <MetricCard value={totalElegivel} label="Elegíveis" icon={<Icon name="calendar-clock" size={20} />} />
          <MetricCard value={pendentesSemAbrir} label="Pendentes sem Ciclo Aberto" tone={pendentesSemAbrir > 0 ? "accent" : "default"} icon={<Icon name="user-x" size={20} />} />
          <MetricCard value={realizados} label="Concluídos" tone="completo" icon={<Icon name="check-circle-2" size={20} />} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 1fr", gap: 14 }}>
          <Card title="Sua Posição na Diretoria">
            {gestor && paresDiretoria.length > 0 ? (
              <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                <div style={{ fontSize: 32, fontWeight: 800, color: "var(--ab-azul-escuro)" }}>{minhaPosicao}º<span style={{ fontSize: 16, color: "var(--text-muted)", fontWeight: 600 }}> de {paresDiretoria.length}</span></div>
                <div style={{ fontSize: 12.5, color: "var(--text-muted)", lineHeight: 1.6 }}>
                  Diretoria <strong>{diretoriaAtual || "—"}</strong><br />
                  Sua Taxa de Realização: <strong style={{ color: pctRealizacao >= mediaDiretoria ? COR_OK : COR_RUIM }}>{pctRealizacao}%</strong> · Média da diretoria: {mediaDiretoria}%
                </div>
              </div>
            ) : <div style={{ fontSize: 12, color: "var(--text-muted)" }}>Sem outros gestores na mesma diretoria para comparar ainda.</div>}
          </Card>
          <Card title="Alertas — Vencidos">
            <div style={{ display: "flex", flexDirection: "column", gap: 6, maxHeight: 190, overflowY: "auto" }}>
              {vencidos.map((c) => <div key={c.id} style={{ fontSize: 12, padding: "6px 8px", border: "1px solid var(--border-subtle)", borderRadius: 8 }}><strong>{c.nome}</strong> · {Math.abs(c.dias)} dia(s)</div>)}
              {vencidos.length === 0 && <div style={{ fontSize: 12, color: "var(--text-muted)" }}>Nenhum ciclo vencido.</div>}
            </div>
          </Card>
          <Card title="Alertas — Próximos 7 dias">
            <div style={{ display: "flex", flexDirection: "column", gap: 6, maxHeight: 190, overflowY: "auto" }}>
              {proximos.map((c) => <div key={c.id} style={{ fontSize: 12, padding: "6px 8px", border: "1px solid var(--border-subtle)", borderRadius: 8 }}><strong>{c.nome}</strong> · {c.dias === 0 ? "vence hoje" : c.dias === 1 ? "vence amanhã" : `vence em ${c.dias} dias`}</div>)}
              {proximos.length === 0 && <div style={{ fontSize: 12, color: "var(--text-muted)" }}>Nenhum vencimento próximo.</div>}
            </div>
          </Card>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <Card title="PDI da Equipe">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
              <MetricCard value={pdiPendentes} label="Pendentes" tone={pdiPendentes > 0 ? "accent" : "default"} icon={<Icon name="circle-dashed" size={18} />} />
              <MetricCard value={pdiAndamento} label="Em Andamento" tone="accent" icon={<Icon name="route" size={18} />} />
              <MetricCard value={pdiConcluidos} label="Concluídos" tone="completo" icon={<Icon name="check-circle-2" size={18} />} />
            </div>
          </Card>
          <Card title="Colaboradores Elegíveis sem Ciclo Encerrado">
            {semCiclo.length === 0 ? <div style={{ fontSize: 12, color: "var(--text-muted)" }}>Nenhum colaborador elegível aguardando abertura de ciclo.</div> : (
              <div style={{ display: "flex", flexDirection: "column", gap: 6, maxHeight: 160, overflowY: "auto" }}>
                {semCiclo.slice(0, 8).map((f) => (
                  <div key={f.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, fontSize: 12.5, padding: "6px 8px", border: "1px solid var(--border-subtle)", borderRadius: 8 }}>
                    <span>{f.nome}</span>
                    <Button size="sm" variant="accent" iconLeft={<Icon name="calendar-plus" size={13} />} onClick={() => onNavigate && onNavigate("ciclos")}>Cadastrar Ciclo</Button>
                  </div>
                ))}
                {semCiclo.length > 8 && <div style={{ fontSize: 11, color: "var(--text-muted)" }}>+ {semCiclo.length - 8} outro(s).</div>}
              </div>
            )}
          </Card>
        </div>

        <Card title="Ações Rápidas">
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Button variant="accent" iconLeft={<Icon name="user-plus" size={14} />} onClick={() => onNavigate && onNavigate("colaboradores")}>Cadastrar Colaborador</Button>
            <Button variant="secondary" iconLeft={<Icon name="calendar-plus" size={14} />} onClick={() => onNavigate && onNavigate("ciclos")}>Cadastrar Ciclo</Button>
          </div>
        </Card>

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
              { key: "c", header: "Autoaval.", align: "center", render: (r) => <Icon name={r.colabForm ? "check-circle-2" : "circle-dashed"} size={18} color={r.colabForm ? "var(--positive)" : "var(--ab-gray-400)"} /> },
              { key: "g", header: "Aval. Gestor", align: "center", render: (r) => <Icon name={r.avaliacaoForm ? "check-circle-2" : "circle-dashed"} size={18} color={r.avaliacaoForm ? "var(--positive)" : "var(--ab-gray-400)"} /> },
              { key: "f", header: "Feedback", align: "center", render: (r) => <Icon name={r.feedbackForm ? "check-circle-2" : "circle-dashed"} size={18} color={r.feedbackForm ? "var(--positive)" : "var(--ab-gray-400)"} /> },
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
