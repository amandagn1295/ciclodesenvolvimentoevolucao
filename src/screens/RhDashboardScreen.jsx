// RH — Dashboard Executivo: KPIs, percentuais, gráficos, heatmap por diretoria, alertas e ranking de gestores.
(function () {
  const NS = window.CicloDeDesenvolvimentoDesignSystem_cb4518;
  const { MetricCard, Card, FilterBar, TextField, Select, Button, Avatar, Banner, DataTable, StatusBadge } = NS;
  const { Icon, fmtDate, prazoFinal, diasPara, ciclosPrevistos, proximoCicloPrevisto, titleCase, statusColaboradorCiclo, statusFromForms, statusLabel } = window.CicloHelpers;

  const AZUL = "var(--ab-azul-escuro)", LARANJA = "var(--ab-laranja)";
  const COR_OK = "#1f8a5b", COR_ALERTA = "#e07d09", COR_RUIM = "#c81e28";
  function corPct(p) { return p >= 80 ? COR_OK : p >= 50 ? COR_ALERTA : COR_RUIM; }
  function normKey(v) { return titleCase(v).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase(); }

  function Bar({ pct, label, value, color }) {
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
          <span style={{ color: "var(--text-muted)" }}>{label}</span>
          <span style={{ fontWeight: 700, color: AZUL }}>{value}</span>
        </div>
        <div style={{ height: 8, borderRadius: 999, background: "var(--surface-sunken)", overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${Math.min(100, pct)}%`, background: color || LARANJA, borderRadius: 999 }} />
        </div>
      </div>
    );
  }

  function Donut({ segments, size = 140 }) {
    let acc = 0;
    const stops = segments.map((s) => { const start = acc; acc += s.pct; return `${s.color} ${start}% ${acc}%`; }).join(", ");
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <div style={{ width: size, height: size, borderRadius: "50%", background: `conic-gradient(${stops})`, position: "relative", flexShrink: 0 }}>
          <div style={{ position: "absolute", inset: size * 0.22, borderRadius: "50%", background: "#fff", display: "grid", placeItems: "center", fontSize: 13, fontWeight: 800, color: AZUL }}>{Math.round(segments[0]?.pct || 0)}%</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {segments.map((s) => (
            <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12.5 }}>
              <span style={{ width: 10, height: 10, borderRadius: 3, background: s.color }} />
              <span style={{ color: "var(--text-muted)" }}>{s.label}</span>
              <strong style={{ color: AZUL }}>{Math.round(s.pct)}%</strong>
            </div>
          ))}
        </div>
      </div>
    );
  }

  function BarChart({ data, max, suffix }) {
    const m = max || Math.max(1, ...data.map((d) => d.value));
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {data.map((d) => (
          <div key={d.label} style={{ display: "grid", gridTemplateColumns: "110px 1fr 34px", gap: 8, alignItems: "center" }}>
            <span style={{ fontSize: 12, color: "var(--text-muted)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{d.label}</span>
            <div style={{ height: 12, borderRadius: 6, background: "var(--surface-sunken)", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${(d.value / m) * 100}%`, background: LARANJA, borderRadius: 6 }} />
            </div>
            <span style={{ fontSize: 12, fontWeight: 700, color: AZUL, textAlign: "right" }}>{d.value}{suffix || ""}</span>
          </div>
        ))}
        {data.length === 0 && <div style={{ fontSize: 12, color: "var(--text-muted)" }}>Sem dados.</div>}
      </div>
    );
  }

  function Sparkline({ data }) {
    const m = Math.max(1, ...data.map((d) => d.value));
    return (
      <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 110 }}>
        {data.map((d) => (
          <div key={d.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, flex: 1 }}>
            <div style={{ width: "100%", maxWidth: 28, height: Math.max(4, (d.value / m) * 78), background: "var(--ab-azul-claro)", borderRadius: "4px 4px 0 0" }} title={d.value} />
            <span style={{ fontSize: 10.5, color: "var(--text-muted)" }}>{d.label}</span>
          </div>
        ))}
      </div>
    );
  }

  function RhDashboardScreen({ colabs, gestores, funcionarios, onNavigate }) {
    const [printOpen, setPrintOpen] = React.useState(false);
    const [qTabela, setQTabela] = React.useState("");
    const [statusTabela, setStatusTabela] = React.useState("");
    const [diretoria, setDiretoria] = React.useState("");
    const [departamento, setDepartamento] = React.useState("");
    const [regional, setRegional] = React.useState("");
    const [unidade, setUnidade] = React.useState("");
    const [gestorId, setGestorId] = React.useState("");
    const [periodo, setPeriodo] = React.useState("");

    const diretoriaLabel = {};
    (gestores || []).forEach((g) => { if (g.diretoria) diretoriaLabel[normKey(g.diretoria)] = titleCase(g.diretoria); });
    const diretorias = Object.values(diretoriaLabel).sort((a, b) => a.localeCompare(b, "pt-BR"));
    const departamentos = [...new Set((gestores || []).map((g) => g.departamento).filter(Boolean))];
    const regionais = [...new Set((gestores || []).map((g) => g.regional).filter(Boolean))];
    const unidades = [...new Set((gestores || []).map((g) => g.unidade).filter(Boolean))];
    const gestoresAtivos = (gestores || []).filter((g) => !g.desligado);
    const gestorNome = (gid) => { const g = (gestores || []).find((x) => x.id === gid); return g ? g.nome : "—"; };
    const gestorDiretoria = (gid) => { const g = (gestores || []).find((x) => x.id === gid); return g ? normKey(g.diretoria) : ""; };
    const gestorObj = (gid) => (gestores || []).find((x) => x.id === gid);

    const matchOrg = (gid) => {
      const g = gestorObj(gid);
      if (!g) return false;
      if (diretoria && normKey(g.diretoria) !== normKey(diretoria)) return false;
      if (departamento && g.departamento !== departamento) return false;
      if (regional && g.regional !== regional) return false;
      if (unidade && g.unidade !== unidade) return false;
      if (gestorId && g.id !== gestorId) return false;
      return true;
    };

    const rows = colabs.filter((c) => matchOrg(c.funcionarioGestorId) && (!periodo || (c.data && c.data.slice(0, 7) === periodo)));
    const colaboradoresAtivosLista = (funcionarios || []).filter((f) => !f.demitido && matchOrg(f.gestorId));

    const previsaoPorColaborador = colaboradoresAtivosLista.map((f) => {
      const ciclosDoFunc = colabs.filter((c) => c.funcionarioId === f.id);
      const status = statusColaboradorCiclo(f.admissao, ciclosDoFunc);
      const temCicloAberto = ciclosDoFunc.some((c) => !c.encerrado);
      return { f, status, temCicloAberto };
    });

    const realizados = previsaoPorColaborador.filter((x) => x.status === "realizado").length;
    const pendentesElegiveis = previsaoPorColaborador.filter((x) => x.status === "pendente").length;
    const pendentesSemAbrir = previsaoPorColaborador.filter((x) => x.status === "pendente" && !x.temCicloAberto).length;
    const iniciadosPessoas = realizados + (pendentesElegiveis - pendentesSemAbrir);
    const totalElegivel = realizados + pendentesElegiveis;
    const iniciados = rows.length;
    const concluidos = rows.filter((c) => c.encerrado).length;
    const abertosAtrasados = rows.filter((c) => !c.encerrado && diasPara(prazoFinal(c)) !== null && diasPara(prazoFinal(c)) < 0);
    const atrasados = abertosAtrasados.length;

    const pctRealizacao = totalElegivel ? Math.round((realizados / totalElegivel) * 100) : 0;
    const pctConclusaoCiclo = iniciados ? Math.round((concluidos / iniciados) * 100) : 0;

    // Gestores em dia x com atraso (têm ao menos 1 colaborador atrasado ou pendente).
    const gestoresFiltrados = gestoresAtivos.filter((g) => matchOrg(g.id));
    const gestorTemAtraso = (gid) => abertosAtrasados.some((c) => c.funcionarioGestorId === gid) || previsaoPorColaborador.some((x) => x.f.gestorId === gid && x.status === "pendente");
    const gestoresComAtraso = gestoresFiltrados.filter((g) => gestorTemAtraso(g.id)).length;
    const pctGestoresEmDia = gestoresFiltrados.length ? Math.round(((gestoresFiltrados.length - gestoresComAtraso) / gestoresFiltrados.length) * 100) : 0;
    const pctGestoresAtraso = 100 - pctGestoresEmDia;

    // Ciclos por diretoria (colaboradores elegíveis pendentes + realizados).
    const porDiretoria = {};
    previsaoPorColaborador.forEach((x) => {
      const d = gestorDiretoria(x.f.gestorId) || "—";
      if (!porDiretoria[d]) porDiretoria[d] = { previstos: 0, concluidos: 0 };
      if (x.status === "realizado" || x.status === "pendente") porDiretoria[d].previstos += 1;
      if (x.status === "realizado") porDiretoria[d].concluidos += 1;
    });
    const diretoriaData = Object.keys(porDiretoria).map((d) => ({ label: diretoriaLabel[d] || d, value: porDiretoria[d].previstos, concluidos: porDiretoria[d].concluidos })).sort((a, b) => b.value - a.value);

    // Ciclos por unidade (colaboradores elegíveis pendentes + realizados).
    const unidadeLabel = {};
    (gestores || []).forEach((g) => { if (g.unidade) unidadeLabel[normKey(g.unidade)] = titleCase(g.unidade); });
    const gestorUnidade = (gid) => { const g = gestorObj(gid); return g ? normKey(g.unidade) : ""; };
    const porUnidade = {};
    previsaoPorColaborador.forEach((x) => {
      const u = gestorUnidade(x.f.gestorId) || "—";
      if (!porUnidade[u]) porUnidade[u] = { previstos: 0, concluidos: 0 };
      if (x.status === "realizado" || x.status === "pendente") porUnidade[u].previstos += 1;
      if (x.status === "realizado") porUnidade[u].concluidos += 1;
    });
    const unidadeData = Object.keys(porUnidade).map((u) => ({ label: unidadeLabel[u] || u, value: porUnidade[u].previstos ? Math.round((porUnidade[u].concluidos / porUnidade[u].previstos) * 100) : 0 })).sort((a, b) => b.value - a.value);

    // Evolução mensal (últimos 6 meses com ciclo cadastrado).
    const porMes = {};
    rows.forEach((c) => { if (!c.data) return; const m = c.data.slice(0, 7); porMes[m] = (porMes[m] || 0) + 1; });
    const mesesOrdenados = Object.keys(porMes).sort().slice(-6);
    const evolucaoData = mesesOrdenados.map((m) => ({ label: new Date(m + "-01T00:00:00").toLocaleDateString("pt-BR", { month: "short" }), value: porMes[m] }));

    // Alertas.
    const vencidos = abertosAtrasados.map((c) => ({ ...c, dias: diasPara(prazoFinal(c)) })).sort((a, b) => a.dias - b.dias).slice(0, 10);
    const proximos = rows.filter((c) => !c.encerrado).map((c) => ({ ...c, dias: diasPara(prazoFinal(c)) })).filter((c) => c.dias !== null && c.dias >= 0 && c.dias <= 7).sort((a, b) => a.dias - b.dias).slice(0, 8);
    const liberados = previsaoPorColaborador.filter((x) => x.status === "pendente");

    // Previstos por gestor (para ranking por Taxa de Realização).
    const previstoPorGestor = {};
    previsaoPorColaborador.forEach((x) => { if (x.status === "realizado" || x.status === "pendente") previstoPorGestor[x.f.gestorId] = (previstoPorGestor[x.f.gestorId] || 0) + 1; });

    // Ranking de gestores por Taxa de Realização (colaboradores realizados ÷ elegíveis).
    const rankingGestores = gestoresFiltrados.map((g) => {
      const seus = rows.filter((c) => c.funcionarioGestorId === g.id);
      const totalG = seus.length;
      const concG = seus.filter((c) => c.encerrado).length;
      const pendG = previsaoPorColaborador.filter((x) => x.f.gestorId === g.id && x.status === "pendente").length;
      const previstoG = previstoPorGestor[g.id] || 0;
      const realizadosG = previsaoPorColaborador.filter((x) => x.f.gestorId === g.id && x.status === "realizado").length;
      return { g, pct: previstoG ? Math.round((realizadosG / previstoG) * 100) : 0, pendG, totalG, previstoG };
    }).filter((x) => x.previstoG > 0);
    const melhores = [...rankingGestores].sort((a, b) => b.pct - a.pct).slice(0, 5);
    const piores = [...rankingGestores].sort((a, b) => b.pendG - a.pendG).slice(0, 5);

    const exportar = () => {
      window.CicloBulk.exportRows(rows, [
        { label: "Colaborador", key: "nome" }, { label: "Gestor", key: "gestor" }, { label: "Diretoria", key: "orgDiretoria" },
        { label: "Regional", key: "orgRegional" }, { label: "Ciclo", key: "cicloNum" }, { label: "Data de Aplicação", value: (r) => fmtDate(r.data) },
        { label: "Prazo Final", value: (r) => fmtDate(prazoFinal(r)) }, { label: "Encerrado", value: (r) => (r.encerrado ? "Sim" : "Não") },
      ], "dashboard-rh.xlsx", "Ciclos");
    };

    const filtrosResumo = [
      diretoria && `Diretoria: ${diretoria}`, departamento && `Departamento: ${departamento}`, regional && `Regional: ${regional}`,
      unidade && `Unidade: ${unidade}`, gestorId && `Gestor: ${gestorNome(gestorId)}`, periodo && `Período: ${periodo}`,
    ].filter(Boolean).join(" · ");
    const dadosPrint = {
      colaboradoresAtivos: colaboradoresAtivosLista.length, gestoresAtivos: gestoresFiltrados.length,
      pendentesSemAbrir, realizados, pctRealizacao, totalElegivel, iniciadosPessoas, pctConclusaoCiclo, pctGestoresEmDia,
      diretoriaData, melhores, piores,
    };

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Card>
          <FilterBar>
            <div style={{ flex: 1, minWidth: 140 }}><Select value={diretoria} onChange={(e) => setDiretoria(e.target.value)}><option value="">Todas as diretorias</option>{diretorias.map((d) => <option key={d} value={d}>{d}</option>)}</Select></div>
            <div style={{ flex: 1, minWidth: 140 }}><Select value={departamento} onChange={(e) => setDepartamento(e.target.value)}><option value="">Todos os departamentos</option>{departamentos.map((d) => <option key={d} value={d}>{d}</option>)}</Select></div>
            <div style={{ flex: 1, minWidth: 140 }}><Select value={regional} onChange={(e) => setRegional(e.target.value)}><option value="">Todas as regionais</option>{regionais.map((r) => <option key={r} value={r}>{r}</option>)}</Select></div>
            <div style={{ flex: 1, minWidth: 140 }}><Select value={unidade} onChange={(e) => setUnidade(e.target.value)}><option value="">Todas as unidades</option>{unidades.map((u) => <option key={u} value={u}>{u}</option>)}</Select></div>
            <div style={{ flex: 1, minWidth: 140 }}><Select value={gestorId} onChange={(e) => setGestorId(e.target.value)}><option value="">Todos os gestores</option>{gestoresAtivos.map((g) => <option key={g.id} value={g.id}>{g.nome}</option>)}</Select></div>
            <div style={{ flex: 1, minWidth: 140 }}><TextField type="month" value={periodo} onChange={(e) => setPeriodo(e.target.value)} /></div>
          </FilterBar>
        </Card>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Card title="Taxa de Realização (Previsto × Realizado)" style={{ background: "var(--surface-brand-soft)", border: "1px solid var(--role-feedback)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <div style={{ fontSize: 44, fontWeight: 800, color: AZUL }}>{pctRealizacao}%</div>
            <div style={{ fontSize: 12.5, color: "var(--text-muted)", lineHeight: 1.6 }}>
              <strong>{realizados}</strong> colaboradores com ciclo em dia de <strong>{totalElegivel}</strong> elegíveis (já passaram 6 meses desde a admissão ou desde o último ciclo concluído).
            </div>
          </div>
        </Card>

        <Card title="Funil do Ciclo">
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[{ label: "Elegíveis", value: totalElegivel, color: "var(--ab-azul-claro)" }, { label: "Iniciados", value: iniciadosPessoas, color: COR_ALERTA }, { label: "Concluídos", value: realizados, color: COR_OK }].map((s) => (
              <div key={s.label} style={{ display: "grid", gridTemplateColumns: "110px 1fr 34px", gap: 10, alignItems: "center" }}>
                <span style={{ fontSize: 12.5, color: "var(--text-muted)" }}>{s.label}</span>
                <div style={{ height: 18, borderRadius: 6, background: "var(--surface-sunken)", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: totalElegivel ? `${(s.value / totalElegivel) * 100}%` : "0%", background: s.color, borderRadius: 6 }} />
                </div>
                <span style={{ fontSize: 13, fontWeight: 700, color: AZUL, textAlign: "right" }}>{s.value}</span>
              </div>
            ))}
          </div>
        </Card>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
          <MetricCard value={colaboradoresAtivosLista.length} label="Colaboradores Ativos" icon={<Icon name="users" size={20} />} />
          <MetricCard value={gestoresFiltrados.length} label="Gestores Ativos" icon={<Icon name="shield" size={20} />} />
          <MetricCard value={pendentesSemAbrir} label="Pendentes sem Ciclo Aberto" tone={pendentesSemAbrir > 0 ? "accent" : "default"} icon={<Icon name="user-x" size={20} />} />
          <MetricCard value={realizados} label="Colaboradores com Ciclo Realizado" tone="default" icon={<Icon name="check-circle-2" size={20} />} />
        </div>

        <Card title="Indicadores Percentuais">
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
                <Bar label="Taxa de Conclusão do Ciclo (iniciado → concluído)" value={pctConclusaoCiclo + "%"} pct={pctConclusaoCiclo} color={corPct(pctConclusaoCiclo)} />
                <Bar label="Elegíveis sem Ciclo Encerrado" value={pendentesElegiveis} pct={totalElegivel ? Math.round((pendentesElegiveis / totalElegivel) * 100) : 0} color={corPct(100 - (totalElegivel ? Math.round((pendentesElegiveis / totalElegivel) * 100) : 0))} />
                <Bar label="Gestores em Dia" value={pctGestoresEmDia + "%"} pct={pctGestoresEmDia} color={corPct(pctGestoresEmDia)} />
                <Bar label="Gestores com Atraso" value={pctGestoresAtraso + "%"} pct={pctGestoresAtraso} color={corPct(100 - pctGestoresAtraso)} />
              </div>
            </Card>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <Card title="% Previsto × Realizado por Unidade">
                <BarChart data={unidadeData.slice(0, 6)} max={100} suffix="%" />
              </Card>
              <Card title="Ciclos por Diretoria">
                <BarChart data={diretoriaData.slice(0, 6)} />
              </Card>
            </div>

            <Card title="Diretoria × Ciclos (Heatmap)">
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                  <thead><tr style={{ textAlign: "left", color: "var(--text-muted)", fontSize: 11, textTransform: "uppercase" }}>
                    <th style={{ padding: "6px 8px" }}>Diretoria</th><th style={{ padding: "6px 8px" }}>Elegíveis</th><th style={{ padding: "6px 8px" }}>Realizados</th><th style={{ padding: "6px 8px" }}>Pendentes</th><th style={{ padding: "6px 8px" }}>% Realização</th>
                  </tr></thead>
                  <tbody>
                    {diretoriaData.map((d) => {
                      const pend = Math.max(d.value - d.concluidos, 0);
                      const pct = d.value ? Math.round((d.concluidos / d.value) * 100) : 0;
                      return (
                        <tr key={d.label} style={{ borderTop: "1px solid var(--border-subtle)" }}>
                          <td style={{ padding: "8px" }}>{d.label}</td><td style={{ padding: "8px" }}>{d.value}</td><td style={{ padding: "8px" }}>{d.concluidos}</td><td style={{ padding: "8px" }}>{pend}</td>
                          <td style={{ padding: "8px" }}><span style={{ background: corPct(pct), color: "#fff", fontWeight: 700, borderRadius: 6, padding: "3px 10px" }}>{pct}%</span></td>
                        </tr>
                      );
                    })}
                    {diretoriaData.length === 0 && <tr><td colSpan={5} style={{ padding: 16, textAlign: "center", color: "var(--text-muted)" }}>Sem dados.</td></tr>}
                  </tbody>
                </table>
              </div>
            </Card>

            <Card title="Alertas Inteligentes" action={<Icon name="alarm-clock" size={18} color={LARANJA} />}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: COR_RUIM, marginBottom: 8 }}>🔴 Ciclos Vencidos</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6, maxHeight: 190, overflowY: "auto" }}>
                    {vencidos.map((c) => (
                      <div key={c.id} style={{ fontSize: 12, padding: "6px 8px", border: "1px solid var(--border-subtle)", borderRadius: 8 }}>
                        <strong>{c.nome}</strong> · {Math.abs(c.dias)} dia(s)<br /><span style={{ color: "var(--text-muted)" }}>Resp.: {c.gestor || "—"}</span>
                      </div>
                    ))}
                    {vencidos.length === 0 && <div style={{ fontSize: 12, color: "var(--text-muted)" }}>Nenhum ciclo vencido.</div>}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: COR_ALERTA, marginBottom: 8 }}>🟠 Próximos Vencimentos (7 dias)</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6, maxHeight: 190, overflowY: "auto" }}>
                    {proximos.map((c) => (
                      <div key={c.id} style={{ fontSize: 12, padding: "6px 8px", border: "1px solid var(--border-subtle)", borderRadius: 8 }}>
                        <strong>{c.nome}</strong> · {c.dias === 0 ? "vence hoje" : c.dias === 1 ? "vence amanhã" : `vence em ${c.dias} dias`}
                      </div>
                    ))}
                    {proximos.length === 0 && <div style={{ fontSize: 12, color: "var(--text-muted)" }}>Nenhum vencimento próximo.</div>}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#b7791f", marginBottom: 8 }}>🟡 Elegíveis sem Ciclo Encerrado</div>
                  {liberados.length > 0 ? (
                    <div style={{ fontSize: 12.5, padding: "10px", border: "1px solid var(--border-subtle)", borderRadius: 8 }}>
                      {liberados.length} colaborador(es) completaram 6 meses e ainda não têm ciclo encerrado.
                      <div style={{ marginTop: 8 }}><Button size="sm" variant="accent" onClick={() => onNavigate && onNavigate("colaboradores")}>Ver colaboradores</Button></div>
                    </div>
                  ) : <div style={{ fontSize: 12, color: "var(--text-muted)" }}>Nenhum colaborador pendente.</div>}
                </div>
              </div>
            </Card>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <Card title="Gestores com Melhor Taxa de Realização">
                <div style={{ display: "flex", flexDirection: "column", gap: 8, maxHeight: 190, overflowY: "auto" }}>
                  {melhores.map((x) => (
                    <div key={x.g.id} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <Avatar name={x.g.nome} size={26} /><span style={{ flex: 1, fontSize: 13 }}>{x.g.nome}</span><strong style={{ color: COR_OK }}>{x.pct}%</strong>
                    </div>
                  ))}
                  {melhores.length === 0 && <div style={{ fontSize: 12, color: "var(--text-muted)" }}>Sem dados suficientes.</div>}
                </div>
              </Card>
              <Card title="Gestores com Mais Pendências">
                <div style={{ display: "flex", flexDirection: "column", gap: 8, maxHeight: 190, overflowY: "auto" }}>
                  {piores.filter((x) => x.pendG > 0).map((x) => (
                    <div key={x.g.id} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <Avatar name={x.g.nome} size={26} /><span style={{ flex: 1, fontSize: 13 }}>{x.g.nome}</span><strong style={{ color: COR_RUIM }}>{x.pendG}</strong>
                    </div>
                  ))}
                  {piores.filter((x) => x.pendG > 0).length === 0 && <div style={{ fontSize: 12, color: "var(--text-muted)" }}>Nenhuma pendência.</div>}
                </div>
              </Card>
            </div>
        </div>

        <Card title="Ações Rápidas">
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Button variant="secondary" iconLeft={<Icon name="user-plus" size={14} />} onClick={() => onNavigate && onNavigate("gestores")}>Novo Gestor</Button>
            <Button variant="secondary" iconLeft={<Icon name="user-plus" size={14} />} onClick={() => onNavigate && onNavigate("colaboradores")}>Novo Colaborador</Button>
            <Button variant="ghost" iconLeft={<Icon name="upload" size={14} />} onClick={() => onNavigate && onNavigate("gestores")}>Importar Gestores</Button>
              <Button variant="ghost" iconLeft={<Icon name="upload" size={14} />} onClick={() => onNavigate && onNavigate("colaboradores")}>Importar Colaboradores</Button>
              <Button variant="accent" iconLeft={<Icon name="file-down" size={14} />} onClick={exportar}>Exportar Dashboard</Button>
              <Button variant="secondary" iconLeft={<Icon name="presentation" size={14} />} onClick={() => setPrintOpen(true)}>Gerar PDF (One Pager)</Button>
          </div>
        </Card>

        <Card title="Controle Unificado — Gestor × Colaborador">
          <FilterBar>
            <div style={{ flex: 2, minWidth: 200, position: "relative" }}>
              <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", pointerEvents: "none" }}><Icon name="search" size={15} /></span>
              <TextField placeholder="Buscar colaborador, cargo ou gestor..." value={qTabela} onChange={(e) => setQTabela(e.target.value)} style={{ paddingLeft: 32 }} />
            </div>
            <div style={{ flex: 1, minWidth: 150 }}>
              <Select value={statusTabela} onChange={(e) => setStatusTabela(e.target.value)}>
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
              { key: "c", header: "Autoaval.", align: "center", render: (r) => <Icon name={r.colabForm ? "check-circle-2" : "circle-dashed"} size={18} color={r.colabForm ? "var(--positive)" : "var(--ab-gray-400)"} /> },
              { key: "g", header: "Aval. Gestor", align: "center", render: (r) => <Icon name={r.avaliacaoForm ? "check-circle-2" : "circle-dashed"} size={18} color={r.avaliacaoForm ? "var(--positive)" : "var(--ab-gray-400)"} /> },
              { key: "f", header: "Feedback", align: "center", render: (r) => <Icon name={r.feedbackForm ? "check-circle-2" : "circle-dashed"} size={18} color={r.feedbackForm ? "var(--positive)" : "var(--ab-gray-400)"} /> },
              { key: "status", header: "Status", render: (r) => <StatusBadge status={statusFromForms(r)} label={statusLabel(r)} /> },
            ]}
            rows={rows.filter((r) => (!qTabela || r.nome.toLowerCase().includes(qTabela.toLowerCase()) || (r.cargo || "").toLowerCase().includes(qTabela.toLowerCase()) || (r.gestor || "").toLowerCase().includes(qTabela.toLowerCase())) && (!statusTabela || statusFromForms(r) === statusTabela))}
          />
        </Card>
        {printOpen && <window.RhDashboardPrintView filtrosResumo={filtrosResumo} dados={dadosPrint} onClose={() => setPrintOpen(false)} />}
      </div>
    );
  }

  window.RhDashboardScreen = RhDashboardScreen;
})();
