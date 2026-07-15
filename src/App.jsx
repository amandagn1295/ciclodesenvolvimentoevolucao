// App — orquestra sincronização em nuvem, roteamento (colaborador / RH / gestor) e CRUD.
(function () {
  const NS = window.CicloDeDesenvolvimentoDesignSystem_cb4518;
  const { Toast } = NS;
  const { Icon, mergeCiclo, genId, addAuditEntry, normalizeCatalogos, mergeCatalogos, titleCase } = window.CicloHelpers;
  const LOGO_BRANCA = window.CICLO_LOGO_BRANCA || "../../assets/logo-branca.png";

  const K_FUNC = "ciclo_funcionarios_v1";
  const K_CICLOS = "ciclo_ciclos_v1";
  const K_GESTORES = "ciclo_gestores_v1";
  const K_AUDIT = "ciclo_audit_v1";
  const K_RHAUTH = "ciclo_rhauth_v1";
  const K_CATALOGOS = "ciclo_catalogos_v1";
  const K_SESSION = "ciclo_sessao_v1";

  function load(key, fallback) {
    try { const raw = localStorage.getItem(key); if (raw) return JSON.parse(raw); } catch (e) {}
    return fallback;
  }
  function save(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) {} }
  function genAcesso() { return String(Math.floor(1000 + Math.random() * 9000)); }

  const TWEAK_DEFAULTS = { statusMode: "marca", accent: "#ff931e", corners: "suave" };

  function applyTweaks(t) {
    const r = document.documentElement.style;
    r.setProperty("--ab-laranja", t.accent);
    r.setProperty("--action-accent", t.accent);
    if (t.corners === "reto") {
      r.setProperty("--radius-sm", "2px"); r.setProperty("--radius-md", "3px");
      r.setProperty("--radius-lg", "4px"); r.setProperty("--radius-xl", "5px");
    } else {
      r.setProperty("--radius-sm", "6px"); r.setProperty("--radius-md", "8px");
      r.setProperty("--radius-lg", "10px"); r.setProperty("--radius-xl", "14px");
    }
    if (t.statusMode === "semaforo") {
      r.setProperty("--status-completo-fg", "#1f8a5b"); r.setProperty("--status-completo-bg", "#e7f4ee"); r.setProperty("--status-completo-dot", "#1f8a5b");
      r.setProperty("--status-parcial-fg", "#b7791f"); r.setProperty("--status-parcial-bg", "#fef9c3"); r.setProperty("--status-parcial-dot", "#eab308");
      r.setProperty("--status-pendente-fg", "#b91c1c"); r.setProperty("--status-pendente-bg", "#fbeaea"); r.setProperty("--status-pendente-dot", "#dc2626");
    } else {
      r.setProperty("--status-completo-fg", "#0f4b87"); r.setProperty("--status-completo-bg", "#eef6fc"); r.setProperty("--status-completo-dot", "#0f7cb9");
      r.setProperty("--status-parcial-fg", "#e07d09"); r.setProperty("--status-parcial-bg", "#fff6e9"); r.setProperty("--status-parcial-dot", t.accent);
      r.setProperty("--status-pendente-fg", "#6b7686"); r.setProperty("--status-pendente-bg", "#eef1f5"); r.setProperty("--status-pendente-dot", "#9aa5b4");
    }
  }

  function App() {
    const [t, setTweak] = window.useTweaks(TWEAK_DEFAULTS);
    React.useEffect(() => { applyTweaks(t); }, [t]);

    const [funcionarios, setFuncionarios] = React.useState(() => load(K_FUNC, (window.CICLO_DATA.funcionarios || [])));
    const [ciclos, setCiclos] = React.useState(() => load(K_CICLOS, (window.CICLO_DATA.ciclos || [])));
    const [gestores, setGestores] = React.useState(() => load(K_GESTORES, (window.CICLO_DATA.gestores || [])));
    const [auditLog, setAuditLog] = React.useState(() => load(K_AUDIT, (window.CICLO_DATA.auditLog || [])));
    const [rhAuth, setRhAuth] = React.useState(() => load(K_RHAUTH, (window.CICLO_DATA.rhAuth || null)));
    const [catalogos, setCatalogos] = React.useState(() => mergeCatalogos(load(K_CATALOGOS, null), window.CICLO_DATA.catalogos || { regionais: [], diretorias: [], departamentos: [], setores: [], unidades: [] }));
    const [session, setSession] = React.useState(() => load(K_SESSION, { gestorId: null, rhAuthed: false }));
    React.useEffect(() => { save(K_SESSION, session); }, [session]);

    // ---- Sincronização em nuvem (Supabase) ----
    const cloudOn = !!(window.CicloSupabase && window.CicloSupabase.isConfigured());
    const [cloudReady, setCloudReady] = React.useState(!cloudOn);
    const remoteJsonRef = React.useRef(null);

    React.useEffect(() => {
      if (!cloudOn) return;
      let cancelled = false;
      const failsafe = setTimeout(() => { if (!cancelled) setCloudReady(true); }, 6000);
      window.CicloSupabase.loadState().then((remote) => {
        clearTimeout(failsafe);
        if (cancelled || !remote) { setCloudReady(true); return; }
        remoteJsonRef.current = JSON.stringify(remote);
        setFuncionarios(remote.funcionarios); setCiclos(remote.ciclos);
        setGestores(remote.gestores); setAuditLog(remote.auditLog); setRhAuth(remote.rhAuth);
        setCatalogos(mergeCatalogos(remote.catalogos, window.CICLO_DATA.catalogos));
        setCloudReady(true);
      }).catch((err) => {
        console.error("Ciclo: falha ao carregar dados da nuvem, seguindo com dados locais.", err);
        clearTimeout(failsafe);
        if (!cancelled) setCloudReady(true);
      });
      const unsubscribe = window.CicloSupabase.subscribe((remote) => {
        const json = JSON.stringify(remote);
        if (json === remoteJsonRef.current) return;
        remoteJsonRef.current = json;
        setFuncionarios(remote.funcionarios); setCiclos(remote.ciclos);
        setGestores(remote.gestores); setAuditLog(remote.auditLog); setRhAuth(remote.rhAuth);
        setCatalogos(mergeCatalogos(remote.catalogos, window.CICLO_DATA.catalogos));
      });
      return () => { cancelled = true; clearTimeout(failsafe); unsubscribe(); };
    }, []);

    React.useEffect(() => { save(K_FUNC, funcionarios); }, [funcionarios]);
    React.useEffect(() => { save(K_CICLOS, ciclos); }, [ciclos]);
    React.useEffect(() => { save(K_GESTORES, gestores); }, [gestores]);
    React.useEffect(() => { save(K_AUDIT, auditLog); }, [auditLog]);
    React.useEffect(() => { save(K_RHAUTH, rhAuth); }, [rhAuth]);
    React.useEffect(() => { save(K_CATALOGOS, catalogos); }, [catalogos]);
    React.useEffect(() => {
      if (!cloudOn || !cloudReady) return;
      const state = { funcionarios, ciclos, gestores, auditLog, rhAuth, catalogos };
      const json = JSON.stringify(state);
      if (json === remoteJsonRef.current) return;
      remoteJsonRef.current = json;
      const tmr = setTimeout(() => {
        window.CicloSupabase.saveState(state).then((ok) => {
          if (!ok) toast("Falha ao salvar na nuvem — verifique sua conexão. Os dados ficaram salvos só neste navegador.", "danger");
        });
      }, 400);
      return () => clearTimeout(tmr);
    }, [funcionarios, ciclos, gestores, auditLog, rhAuth, catalogos, cloudReady]);

    // Ciclos enriquecidos com dados do funcionário + gestor (usado pelas telas de acompanhamento).
    const ciclosView = React.useMemo(() => ciclos.map((cy) => mergeCiclo(cy, funcionarios, gestores)), [ciclos, funcionarios, gestores]);
    const findView = (id) => ciclosView.find((x) => x.id === id);

    // Link público do colaborador (#colab=<cicloId>).
    const hashId = (location.hash.match(/colab=([^&]+)/) || [])[1];
    const [publicColabId] = React.useState(hashId || null);
    const [colabUnlocked, setColabUnlocked] = React.useState(false);

    const [toastState, setToastState] = React.useState({ open: false, message: "", tone: "default" });
    const toastTimer = React.useRef(null);
    const toast = React.useCallback((message, tone = "default") => {
      setToastState({ open: true, message, tone });
      clearTimeout(toastTimer.current);
      toastTimer.current = setTimeout(() => setToastState((s) => ({ ...s, open: false })), 2800);
    }, []);
    const toastNode = <Toast open={toastState.open} message={toastState.message} tone={toastState.tone} />;

    const audit = (ator, tipo, acao, alvo, detalhe) => addAuditEntry(setAuditLog, ator, tipo, acao, alvo, detalhe);

    // ---- Catálogos (listas suspensas Regional/Diretoria/Departamento/Setor/Unidade) ----
    const addCatalogoItem = (campo, valorDigitado) => {
      const valor = titleCase(valorDigitado);
      setCatalogos((cs) => {
        const lista = cs[campo] || [];
        if (lista.some((x) => x.toLowerCase() === valor.toLowerCase())) return cs;
        return { ...cs, [campo]: [...lista, valor].sort((a, b) => a.localeCompare(b, "pt-BR")) };
      });
      return valor;
    };

    // ---- Gestores (RH) ----
    const addGestor = (dados) => {
      const novo = { id: genId("g"), ...dados, nome: titleCase(dados.nome), cargo: titleCase(dados.cargo) };
      setGestores((gs) => [novo, ...gs]);
      audit("RH", "gestor", "criar", novo.nome, `usuário ${novo.usuario}`);
    };
    const updateGestor = (id, patch) => {
      const patchNorm = { ...patch };
      if (patchNorm.nome !== undefined) patchNorm.nome = titleCase(patchNorm.nome);
      if (patchNorm.cargo !== undefined) patchNorm.cargo = titleCase(patchNorm.cargo);
      setGestores((gs) => gs.map((x) => (x.id === id ? { ...x, ...patchNorm } : x)));
      const g = gestores.find((x) => x.id === id);
      audit(g ? g.nome : id, "gestor", "editar", g ? g.nome : id);
    };
    const deleteGestor = (id) => {
      const g = gestores.find((x) => x.id === id);
      const funcs = funcionarios.filter((f) => f.gestorId === id).map((f) => f.id);
      setGestores((gs) => gs.filter((x) => x.id !== id));
      setFuncionarios((fs) => fs.filter((x) => x.gestorId !== id));
      setCiclos((cs) => cs.filter((c) => !funcs.includes(c.funcionarioId)));
      audit("RH", "gestor", "excluir", g ? g.nome : id);
    };

    // ---- Funcionários ----
    const addFuncionario = (dados, ator) => {
      const novo = {
        id: genId(), demitido: false, demissao: "", ...dados,
        nome: titleCase(dados.nome), cargo: titleCase(dados.cargo), departamento: titleCase(dados.departamento),
      };
      setFuncionarios((fs) => [novo, ...fs]);
      audit(ator || "RH", "funcionario", "criar", novo.nome);
      return novo;
    };
    const updateFuncionario = (id, patch, ator) => {
      const antes = funcionarios.find((x) => x.id === id);
      setFuncionarios((fs) => fs.map((x) => (x.id === id ? { ...x, ...patch } : x)));
      if (antes) {
        const labels = { gestorId: "Gestor", cargo: "Cargo", departamento: "Departamento", diretoria: "Diretoria", setor: "Setor", regional: "Regional" };
        const fmt = (k, v) => (k === "gestorId" ? ((gestores.find((g) => g.id === v) || {}).nome || "—") : (v || "—"));
        const mudancas = Object.keys(patch).filter((k) => labels[k] && patch[k] !== antes[k]).map((k) => `${labels[k]}: ${fmt(k, antes[k])} → ${fmt(k, patch[k])}`);
        if (mudancas.length) audit(ator || "RH", "funcionario", "editar", antes.nome, mudancas.join("; "));
      }
    };
    const deleteFuncionario = (id, ator) => {
      const f = funcionarios.find((x) => x.id === id);
      setFuncionarios((fs) => fs.filter((x) => x.id !== id));
      setCiclos((cs) => cs.filter((c) => c.funcionarioId !== id));
      audit(ator || "RH", "funcionario", "excluir", f ? f.nome : id);
      toast("Colaborador e ciclos vinculados excluídos.", "default");
    };

    // ---- Ciclos ----
    const addCiclo = (dados) => {
      const novo = {
        id: genId(), acesso: genAcesso(), encerrado: false, colabForm: null, avaliacaoForm: null, feedbackForm: null,
        funcionarioId: dados.funcionarioId, cicloNum: dados.cicloNum || "1º Ciclo", data: dados.data, alvo: dados.alvo,
      };
      setCiclos((cs) => [novo, ...cs]);
      const f = funcionarios.find((x) => x.id === dados.funcionarioId);
      toast(`Ciclo de ${f ? f.nome : "colaborador"} criado! Senha de acesso: ${novo.acesso}.`, "success");
    };
    const deleteCiclo = (id) => {
      setCiclos((cs) => cs.filter((c) => c.id !== id));
      toast("Ciclo excluído.", "default");
    };
    const finalize = (id) => {
      setCiclos((cs) => cs.map((c) => (c.id === id ? { ...c, encerrado: true, dataFinalizacao: new Date().toISOString().slice(0, 10) } : c)));
      toast("Ciclo encerrado. PDF disponível e link liberado para consulta.", "success");
    };
    const updateAction = (cicloId, tipo, index, patch) => {
      const key = tipo === "tec" ? "rowsTec" : "rowsComp";
      setCiclos((cs) => cs.map((c) => {
        if (c.id !== cicloId || !c.feedbackForm) return c;
        const rows = (c.feedbackForm[key] || []).map((r, i) => (i === index ? { ...r, ...patch } : r));
        return { ...c, feedbackForm: { ...c.feedbackForm, [key]: rows } };
      }));
    };
    const saveAvaliacaoForm = (cicloId, avaliacaoForm) => {
      setCiclos((cs) => cs.map((c) => (c.id === cicloId ? { ...c, avaliacaoForm } : c)));
      toast("Avaliação do gestor salva! Status: Feedback Agendado.", "success");
    };
    const saveFeedbackForm = (cicloId, feedbackForm) => {
      setCiclos((cs) => cs.map((c) => (c.id === cicloId ? { ...c, feedbackForm, encerrado: true, dataFinalizacao: new Date().toISOString().slice(0, 10) } : c)));
      toast("Reunião de feedback concluída — ciclo encerrado!", "success");
    };
    const submitColabForm = (cicloId, colabForm) => {
      setCiclos((cs) => cs.map((c) => (c.id === cicloId ? { ...c, colabForm } : c)));
      toast("Suas respostas foram enviadas com sucesso!", "success");
    };

    function renderTweaks() {
      const { TweaksPanel, TweakSection, TweakRadio, TweakColor } = window;
      return (
        <TweaksPanel>
          <TweakSection label="Aparência" />
          <TweakRadio label="Cores de status" value={t.statusMode} options={[{ value: "marca", label: "Marca" }, { value: "semaforo", label: "Semáforo" }]} onChange={(v) => setTweak("statusMode", v)} />
          <TweakColor label="Cor de destaque" value={t.accent} options={["#ff931e", "#e8630a", "#0f7cb9"]} onChange={(v) => setTweak("accent", v)} />
          <TweakRadio label="Cantos" value={t.corners} options={[{ value: "suave", label: "Arredondado" }, { value: "reto", label: "Reto" }]} onChange={(v) => setTweak("corners", v)} />
        </TweaksPanel>
      );
    }

    if (cloudOn && !cloudReady) {
      return <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", color: "var(--text-muted)", fontSize: 14 }}>Carregando dados da nuvem…</div>;
    }

    // 1) Link público do colaborador — protegido por senha de acesso.
    if (publicColabId) {
      const c = findView(publicColabId);
      if (!c) {
        return <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", color: "var(--text-muted)" }}>Link inválido ou expirado.</div>;
      }
      if (!colabUnlocked) {
        return <window.ColabGate colab={c} logoSrc={LOGO_BRANCA} onUnlock={() => setColabUnlocked(true)} />;
      }
      const historicoColab = ciclosView.filter((x) => x.funcionarioId === c.funcionarioId && x.id !== c.id).sort((a, b) => (b.data || "").localeCompare(a.data || ""));
      return (<>
        <window.FormColaboradorScreen colab={c} historico={historicoColab} logoSrc={LOGO_BRANCA} readOnly={c.encerrado} onToast={toast} onBack={null} onUpdateAction={updateAction} onSubmit={(form) => submitColabForm(c.id, form)} />
        {toastNode}
      </>);
    }

    // 2) Painel do RH — autenticado a partir do mesmo login (usuário da Pessoas & Cultura).
    if (session.rhAuthed) {
      return (<>
        <window.RhAdminApp
          logoSrc={LOGO_BRANCA}
          gestores={gestores} funcionarios={funcionarios} ciclosView={ciclosView} auditLog={auditLog}
          catalogos={catalogos} onAddCatalogoItem={addCatalogoItem}
          onAddGestor={addGestor} onUpdateGestor={updateGestor} onDeleteGestor={deleteGestor}
          onAddFuncionario={(dados) => addFuncionario(dados, "RH")} onDeleteFuncionario={(id) => deleteFuncionario(id, "RH")}
          onUpdateFuncionario={(id, patch) => updateFuncionario(id, patch, "RH")}
          onLogout={() => setSession((s) => ({ ...s, rhAuthed: false }))}
          rhAuth={rhAuth} onUpdateRhAuth={setRhAuth}
        />
        {toastNode}
      </>);
    }

    // 3) Painel do gestor (login por gestor, cadastrado pelo RH).
    const gestorLogado = gestores.find((g) => g.id === session.gestorId) || null;
    if (!gestorLogado) {
      return (
        <window.LoginScreen
          logoSrc={LOGO_BRANCA}
          gestores={gestores} onUpdateGestor={updateGestor}
          onAuthenticatedGestor={(gid) => setSession((s) => ({ ...s, gestorId: gid }))}
          rhAuth={rhAuth} onUpdateRhAuth={setRhAuth}
          onAuthenticatedRh={() => setSession((s) => ({ ...s, rhAuthed: true }))}
        />
      );
    }
    const meusFuncionarios = funcionarios.filter((f) => f.gestorId === gestorLogado.id);
    const meusIds = meusFuncionarios.map((f) => f.id);
    const meusCiclosView = ciclosView.filter((c) => meusIds.includes(c.funcionarioId));

    return (<>
      <window.GestorPanel
        gestor={gestorLogado} logoSrc={LOGO_BRANCA}
        funcionarios={meusFuncionarios} ciclosView={meusCiclosView} auditLog={auditLog}
        todosGestores={gestores} ciclosViewGeral={ciclosView} todosFuncionarios={funcionarios}
        onAddFuncionario={(dados) => addFuncionario({ ...dados, gestorId: gestorLogado.id }, gestorLogado.nome)}
        onUpdateFuncionario={(id, patch) => updateFuncionario(id, patch, gestorLogado.nome)}
        onDeleteFuncionario={(id) => deleteFuncionario(id, gestorLogado.nome)}
        onAddCiclo={addCiclo} onDeleteCiclo={deleteCiclo} onUpdateAction={updateAction}
        onSaveAvaliacaoForm={saveAvaliacaoForm} onSaveFeedbackForm={saveFeedbackForm} onSubmitColabForm={submitColabForm} onFinalize={finalize}
        onUpdateGestorSelf={updateGestor}
        onLogout={() => setSession((s) => ({ ...s, gestorId: null }))}
        renderTweaks={renderTweaks}
      />
      {toastNode}
    </>);
  }

  window.CicloApp = App;
})();
