// Painel do RH — shell com abas: Dashboard Geral, Gestores, Colaboradores, Histórico.
(function () {
  const NS = window.CicloDeDesenvolvimentoDesignSystem_cb4518;
  const { AppHeader, Toast, Card, Avatar } = NS;
  const { Icon, fmtDate } = window.CicloHelpers;

  function HistoricoScreen({ auditLog }) {
    const log = auditLog || [];
    return (
      <Card title={`Histórico de Alterações (${log.length})`}>
        {log.length === 0 ? (
          <div style={{ textAlign: "center", padding: 30, color: "var(--text-muted)", fontSize: 13 }}>Nenhuma ação registrada ainda.</div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 8, maxHeight: 640, overflowY: "auto" }}>
            {log.slice(0, 200).map((a) => (
              <div key={a.id} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "10px 12px", border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-sm)" }}>
                <Icon name={a.acao === "excluir" ? "trash-2" : a.acao === "criar" ? "plus-circle" : a.acao === "importar" ? "upload" : "pencil"} size={16} color="var(--ab-azul-claro)" style={{ marginTop: 2 }} />
                <div style={{ flex: 1, fontSize: 13 }}>
                  <strong>{a.ator}</strong> {a.acao === "criar" ? "cadastrou" : a.acao === "editar" ? "editou" : a.acao === "excluir" ? "excluiu" : "importou"} {a.tipo === "gestor" ? "o gestor" : a.tipo === "funcionario" ? "o colaborador" : "o ciclo"} <strong>{a.alvo}</strong>
                  {a.detalhe && <span style={{ color: "var(--text-muted)" }}> — {a.detalhe}</span>}
                </div>
                <span style={{ fontSize: 11, color: "var(--text-muted)", whiteSpace: "nowrap" }}>{new Date(a.ts).toLocaleString("pt-BR")}</span>
              </div>
            ))}
          </div>
        )}
      </Card>
    );
  }

  function RhAdminApp({
    logoSrc, gestores, funcionarios, ciclosView, auditLog, catalogos, onAddCatalogoItem,
    onAddGestor, onUpdateGestor, onDeleteGestor, onImportGestoresBulk,
    onAddFuncionario, onDeleteFuncionario, onUpdateFuncionario, onImportFuncionariosBulk,
    onChangePassword, onLogout, rhAuth, onUpdateRhAuth,
  }) {
    const [view, setView] = React.useState("dashboard");
    const [pwOpen, setPwOpen] = React.useState(false);
    const [toastState, setToastState] = React.useState({ open: false, message: "", tone: "default" });
    const toastTimer = React.useRef(null);
    const toast = React.useCallback((message, tone = "default") => {
      setToastState({ open: true, message, tone });
      clearTimeout(toastTimer.current);
      toastTimer.current = setTimeout(() => setToastState((s) => ({ ...s, open: false })), 3600);
    }, []);

    return (
      <div style={{ minHeight: "100vh", background: "var(--surface-canvas)" }}>
        <AppHeader
          logoSrc={logoSrc}
          productName="Ciclo de Desenvolvimento — Painel do RH"
          active={view}
          onSelect={setView}
          tabs={[
            { id: "dashboard", label: "Visão Geral", icon: <Icon name="layout-dashboard" size={15} /> },
            { id: "gestores", label: "Gestores", icon: <Icon name="shield" size={15} /> },
            { id: "colaboradores", label: "Colaboradores", icon: <Icon name="users" size={15} /> },
            { id: "historico", label: "Histórico", icon: <Icon name="history" size={15} /> },
          ]}
          right={<>
            <button onClick={() => setPwOpen(true)} title="Alterar senha" style={{ border: "none", background: "transparent", color: "rgba(255,255,255,.72)", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12 }}><Icon name="key-round" size={15} /></button>
            <button onClick={onLogout} title="Sair" style={{ marginLeft: 8, border: "none", background: "transparent", color: "rgba(255,255,255,.72)", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12 }}><Icon name="log-out" size={15} /></button>
          </>}
        />
        <main style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "24px" }}>
          {view === "dashboard" && <RhDashboardScreen colabs={ciclosView} gestores={gestores} funcionarios={funcionarios} onNavigate={setView} />}
          {view === "gestores" && <window.RhGestoresScreen gestores={gestores} funcionarios={funcionarios} ciclos={ciclosView} catalogos={catalogos} onAddCatalogoItem={onAddCatalogoItem} onAdd={onAddGestor} onUpdate={onUpdateGestor} onDelete={onDeleteGestor} onImportBulk={onImportGestoresBulk} onToast={toast} />}
          {view === "colaboradores" && <window.RhColaboradoresScreen funcionarios={funcionarios} gestores={gestores} ciclos={ciclosView} catalogos={catalogos} auditLog={auditLog} onAddCatalogoItem={onAddCatalogoItem} onAdd={onAddFuncionario} onUpdate={onUpdateFuncionario} onDelete={onDeleteFuncionario} onImportBulk={onImportFuncionariosBulk} onToast={toast} />}
          {view === "historico" && <HistoricoScreen auditLog={auditLog} />}
        </main>
        <window.RhChangePasswordModal open={pwOpen} onClose={() => setPwOpen(false)} onToast={toast} rhAuth={rhAuth} onUpdateAuth={onUpdateRhAuth} />
        <Toast open={toastState.open} message={toastState.message} tone={toastState.tone} />
      </div>
    );
  }

  window.RhAdminApp = RhAdminApp;
})();
