// Pipeline do Ciclo — visão Kanban das 12 etapas, filtrável por diretoria/regional/setor/gestor/status/período.
(function () {
  const NS = window.CicloDeDesenvolvimentoDesignSystem_cb4518;
  const { Card, Select, TextField, FilterBar, Avatar, Banner } = NS;
  const { Icon, fmtDate, diasPara, PIPELINE_STAGES, pipelineStageCiclo, pipelineStageSemCiclo, ciclosPrevistos } = window.CicloHelpers;

  const STAGE_COLOR = {
    pendente: "var(--text-muted)", atraso: "var(--danger)", criado: "var(--ab-azul-claro)",
    autoaval_pendente: "var(--ab-laranja-600)", autoaval_concluida: "var(--ab-azul-claro)",
    gestor_pendente: "var(--ab-laranja-600)", avaliacao_concluida: "var(--ab-azul-claro)",
    feedback_agendado: "var(--ab-laranja-600)", feedback_realizado: "var(--ab-azul-claro)",
    pdi_criado: "var(--ab-azul-claro)", pdi_andamento: "var(--ab-laranja-600)", finalizado: "var(--positive)",
  };

  function PipelineScreen({ funcionarios, gestores, ciclosView, mostrarFiltrosOrg = true }) {
    const [diretoria, setDiretoria] = React.useState("");
    const [regional, setRegional] = React.useState("");
    const [unidade, setUnidade] = React.useState("");
    const [setor, setSetor] = React.useState("");
    const [gestorId, setGestorId] = React.useState("");
    const [periodo, setPeriodo] = React.useState("");

    const gestorNome = (gid) => { const g = (gestores || []).find((x) => x.id === gid); return g ? g.nome : "—"; };
    const gestorDiretoria = (gid) => { const g = (gestores || []).find((x) => x.id === gid); return g ? g.diretoria : ""; };

    // Um cartão por colaborador ativo: usa o ciclo mais recente (se houver) ou uma etapa sintética.
    const cards = (funcionarios || []).filter((f) => !f.demitido).map((f) => {
      const ciclosDoFunc = (ciclosView || []).filter((c) => c.funcionarioId === f.id).sort((a, b) => (b.data || "").localeCompare(a.data || ""));
      const atual = ciclosDoFunc[0];
      const stage = atual ? pipelineStageCiclo(atual) : pipelineStageSemCiclo(f.admissao, ciclosDoFunc.length);
      return { f, ciclo: atual, stage, gestor: gestorNome(f.gestorId), diretoriaGestor: gestorDiretoria(f.gestorId) };
    }).filter((x) =>
      (!diretoria || x.diretoriaGestor === diretoria) &&
      (!regional || (x.ciclo && x.ciclo.orgRegional === regional)) &&
      (!unidade || (x.ciclo && x.ciclo.orgUnidade === unidade)) &&
      (!setor || x.f.setor === setor) &&
      (!gestorId || x.f.gestorId === gestorId) &&
      (!periodo || (x.ciclo && x.ciclo.data && x.ciclo.data.slice(0, 7) === periodo))
    );

    const diretorias = [...new Set((gestores || []).map((g) => g.diretoria).filter(Boolean))];
    const regionais = [...new Set((ciclosView || []).map((c) => c.orgRegional).filter(Boolean))];
    const unidades = [...new Set((ciclosView || []).map((c) => c.orgUnidade).filter(Boolean))];
    const setores = [...new Set((funcionarios || []).map((f) => f.setor).filter(Boolean))];
    const gestoresAtivos = (gestores || []).filter((g) => !g.desligado);

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Card title="Pipeline do Ciclo" action={<Icon name="git-branch" size={18} color="var(--ab-azul-claro)" />}>
          <Banner tone="info" icon={<Icon name="info" size={16} />} style={{ marginBottom: 14 }}>
            Cada card representa o colaborador na etapa mais avançada do seu ciclo atual. Role horizontalmente para ver todas as {PIPELINE_STAGES.length} etapas.
          </Banner>
          {mostrarFiltrosOrg && (
            <FilterBar>
              <div style={{ flex: 1, minWidth: 150 }}>
                <Select value={diretoria} onChange={(e) => setDiretoria(e.target.value)}>
                  <option value="">Todas as diretorias</option>
                  {diretorias.map((d) => <option key={d} value={d}>{d}</option>)}
                </Select>
              </div>
              <div style={{ flex: 1, minWidth: 150 }}>
                <Select value={regional} onChange={(e) => setRegional(e.target.value)}>
                  <option value="">Todas as regionais</option>
                  {regionais.map((r) => <option key={r} value={r}>{r}</option>)}
                </Select>
              </div>
              <div style={{ flex: 1, minWidth: 150 }}>
                <Select value={unidade} onChange={(e) => setUnidade(e.target.value)}>
                  <option value="">Todas as unidades</option>
                  {unidades.map((u) => <option key={u} value={u}>{u}</option>)}
                </Select>
              </div>

              <div style={{ flex: 1, minWidth: 150 }}>
                <Select value={setor} onChange={(e) => setSetor(e.target.value)}>
                  <option value="">Todos os setores</option>
                  {setores.map((s) => <option key={s} value={s}>{s}</option>)}
                </Select>
              </div>
              <div style={{ flex: 1, minWidth: 150 }}>
                <Select value={gestorId} onChange={(e) => setGestorId(e.target.value)}>
                  <option value="">Todos os gestores</option>
                  {gestoresAtivos.map((g) => <option key={g.id} value={g.id}>{g.nome}</option>)}
                </Select>
              </div>
              <div style={{ flex: 1, minWidth: 150 }}>
                <TextField type="month" value={periodo} onChange={(e) => setPeriodo(e.target.value)} />
              </div>
            </FilterBar>
          )}
        </Card>

        <div style={{ display: "flex", gap: 12, overflowX: "auto", paddingBottom: 8 }}>
          {PIPELINE_STAGES.map((stage) => {
            const list = cards.filter((x) => x.stage === stage.key);
            return (
              <div key={stage.key} style={{ minWidth: 230, flex: "0 0 230px", background: "var(--surface-sunken)", borderRadius: "var(--radius-lg)", border: "1px solid var(--border-subtle)", display: "flex", flexDirection: "column" }}>
                <div style={{ padding: "10px 12px", borderBottom: "1px solid var(--border-subtle)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "var(--ab-azul-escuro)" }}>{stage.label}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "#fff", background: STAGE_COLOR[stage.key], borderRadius: 999, padding: "1px 8px" }}>{list.length}</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, padding: 10, maxHeight: 520, overflowY: "auto" }}>
                  {list.length === 0 && <div style={{ fontSize: 11, color: "var(--text-muted)", textAlign: "center", padding: "10px 0" }}>—</div>}
                  {list.map((x) => (
                    <div key={x.f.id} style={{ background: "#fff", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)", padding: "8px 10px", display: "flex", gap: 8, alignItems: "center" }}>
                      <Avatar name={x.f.nome} size={26} />
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: 12.5, fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{x.f.nome}</div>
                        <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{x.gestor}{x.ciclo ? ` · ${fmtDate(x.ciclo.data)}` : ""}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  window.PipelineScreen = PipelineScreen;
})();
