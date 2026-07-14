// Painel do Gestor — escopado ao gestor autenticado (só vê seus próprios colaboradores/ciclos).
(function () {
  const NS = window.CicloDeDesenvolvimentoDesignSystem_cb4518;
  const { AppHeader, Toast } = NS;
  const { Icon } = window.CicloHelpers;

  function GestorPanel({
    gestor, logoSrc, funcionarios, ciclosView,
    onAddFuncionario, onUpdateFuncionario, onDeleteFuncionario,
    onAddCiclo, onDeleteCiclo, onUpdateAction, onSaveGestorForm, onSubmitColabForm,
    onFinalize, onUpdateGestorSelf, onLogout, renderTweaks,
  }) {
    const [view, setView] = React.useState("dashboard");
    const [modalColab, setModalColab] = React.useState(null);
    const [colabFormFor, setColabFormFor] = React.useState(null);
    const [printColab, setPrintColab] = React.useState(null);
    const [pwOpen, setPwOpen] = React.useState(false);

    const [toastState, setToastState] = React.useState({ open: false, message: "", tone: "default" });
    const toastTimer = React.useRef(null);
    const toast = React.useCallback((message, tone = "default") => {
      setToastState({ open: true, message, tone });
      clearTimeout(toastTimer.current);
      toastTimer.current = setTimeout(() => setToastState((s) => ({ ...s, open: false })), 2800);
    }, []);
    const toastNode = <Toast open={toastState.open} message={toastState.message} tone={toastState.tone} />;

    const findView = (id) => ciclosView.find((x) => x.id === id);

    if (colabFormFor) {
      const live = findView(colabFormFor.id) || colabFormFor;
      return (<>
        <window.FormColaboradorScreen colab={live} logoSrc={logoSrc} readOnly={live.encerrado} onToast={toast} onBack={() => setColabFormFor(null)} onUpdateAction={onUpdateAction} onSubmit={(form) => onSubmitColabForm(live.id, form)} />
        {toastNode}
        {renderTweaks()}
      </>);
    }

    return (
      <div style={{ minHeight: "100vh", background: "var(--surface-canvas)" }}>
        <AppHeader
          logoSrc={logoSrc}
          productName="Ciclo de Desenvolvimento e Evolução"
          active={view}
          onSelect={setView}
          tabs={[
            { id: "dashboard", label: "Visão Geral", icon: <Icon name="layout-dashboard" size={15} /> },
            { id: "colaboradores", label: "Colaboradores", icon: <Icon name="users" size={15} /> },
            { id: "ciclos", label: "Cadastro de Ciclo", icon: <Icon name="calendar-plus" size={15} /> },
            { id: "pdi", label: "PDI", icon: <Icon name="route" size={15} /> },
            { id: "form", label: "Form. Gestor", icon: <Icon name="clipboard-list" size={15} /> },
          ]}
          right={<>
            <span style={{ color: "rgba(255,255,255,.72)", fontSize: 12, marginRight: 4 }}>{gestor.nome}</span>
            <button onClick={() => setPwOpen(true)} title="Alterar senha" style={{ border: "none", background: "transparent", color: "rgba(255,255,255,.72)", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12 }}><Icon name="key-round" size={15} /></button>
            <button onClick={onLogout} title="Sair" style={{ marginLeft: 8, border: "none", background: "transparent", color: "rgba(255,255,255,.72)", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12 }}><Icon name="log-out" size={15} /></button>
          </>}
        />
        <main style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "24px" }}>
          {view === "dashboard" && <window.DashboardScreen colabs={ciclosView} funcionarios={funcionarios} onOpen={setModalColab} />}
          {view === "colaboradores" && <window.FuncionariosScreen funcionarios={funcionarios} ciclos={ciclosView} onAdd={onAddFuncionario} onUpdate={onUpdateFuncionario} onDelete={onDeleteFuncionario} onToast={toast} />}
          {view === "ciclos" && <window.CicloCadastroScreen funcionarios={funcionarios} ciclos={ciclosView} onAddCiclo={onAddCiclo} onDeleteCiclo={onDeleteCiclo} onOpen={setModalColab} onOpenColabForm={setColabFormFor} onPrint={setPrintColab} onToast={toast} />}
          {view === "pdi" && <window.PdiScreen colabs={ciclosView} onUpdateAction={onUpdateAction} />}
          {view === "form" && <window.FormGestorScreen colabs={ciclosView} onSave={onSaveGestorForm} onToast={toast} />}
        </main>

        <window.ComparisonModal
          colab={modalColab && findView(modalColab.id)}
          open={!!modalColab}
          onClose={() => setModalColab(null)}
          onOpenColabForm={(c) => { setModalColab(null); setColabFormFor(c); }}
          onPrint={(c) => { setModalColab(null); setPrintColab(c); }}
          onFinalize={onFinalize}
        />
        <window.CicloPrintView colab={printColab} onClose={() => setPrintColab(null)} />
        <window.ChangePasswordModal open={pwOpen} onClose={() => setPwOpen(false)} onToast={toast} gestor={gestor} onUpdateGestor={onUpdateGestorSelf} />
        {toastNode}
        {renderTweaks()}
      </div>
    );
  }

  window.GestorPanel = GestorPanel;
})();
