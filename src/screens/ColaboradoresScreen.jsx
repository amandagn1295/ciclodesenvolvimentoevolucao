// Colaboradores — cadastro do quadro de funcionários do gestor.
(function () {
  const NS = window.CicloDeDesenvolvimentoDesignSystem_cb4518;
  const { Card, FormGrid, Field, TextField, Button, Avatar, Banner, StatusBadge } = NS;
  const { Icon, fmtDate, tempoEmpresa } = window.CicloHelpers;

  function FuncionariosScreen({ funcionarios, ciclos, auditLog, gestorNome, onAdd, onUpdate, onDelete, onToast }) {
    const [histId, setHistId] = React.useState(null);
    const movimentacoesDe = (nome) => (auditLog || []).filter((a) => a.tipo === "funcionario" && a.alvo === nome);
    const [q, setQ] = React.useState("");
    const [editId, setEditId] = React.useState(null);
    const [editForm, setEditForm] = React.useState({});
    const setE = (k, v) => setEditForm((s) => ({ ...s, [k]: v }));
    const startEdit = (c) => { setEditId(c.id); setEditForm({ ...c }); };
    const cancelEdit = () => setEditId(null);
    const saveEdit = () => {
      if (!String(editForm.nome || "").trim()) { onToast("Informe o nome completo do colaborador.", "danger"); return; }
      const { id, ...patch } = editForm;
      onUpdate(editId, patch);
      onToast("Cadastro atualizado.", "success");
      setEditId(null);
    };
    const empty = { nome: "", admissao: "", departamento: "", cargo: "", whatsapp: "" };
    const [f, setF] = React.useState(empty);
    const set = (k, v) => setF((s) => ({ ...s, [k]: v }));

    const cadastrar = () => {
      if (!f.nome.trim()) { onToast("Informe o nome completo do colaborador.", "danger"); return; }
      onAdd({ ...f });
      setF(empty);
    };

    const list = funcionarios.filter((x) =>
      !q || x.nome.toLowerCase().includes(q.toLowerCase()) ||
      (x.cargo || "").toLowerCase().includes(q.toLowerCase()) ||
      (x.departamento || "").toLowerCase().includes(q.toLowerCase())
    ).slice().sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));

    const ciclosDe = (fid) => (ciclos || []).filter((c) => c.funcionarioId === fid);

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <Card title="Cadastrar Colaborador" action={<Icon name="user-plus" size={18} color="var(--ab-azul-claro)" />}>
          <FormGrid columns={3}>
            <Field label="Nome Completo" required><TextField placeholder="Nome completo do colaborador" value={f.nome} onChange={(e) => set("nome", e.target.value)} /></Field>
            <Field label="Data de Admissão"><TextField type="date" value={f.admissao} onChange={(e) => set("admissao", e.target.value)} /></Field>
            <Field label="Cargo"><TextField placeholder="Ex: Consultor de Vendas" value={f.cargo} onChange={(e) => set("cargo", e.target.value)} /></Field>
            <Field label="Departamento"><TextField placeholder="Ex: Pessoas e Cultura" value={f.departamento} onChange={(e) => set("departamento", e.target.value)} /></Field>
            <Field label="WhatsApp" hint="Com DDD. Ex: (27) 99999-9999"><TextField placeholder="(27) 99999-9999" value={f.whatsapp} onChange={(e) => set("whatsapp", e.target.value)} /></Field>
            <Field label="Tempo de Empresa" hint="Calculado a partir da admissão.">
              <div style={{ display: "flex", alignItems: "center", gap: 8, height: 38, padding: "0 12px", background: "var(--surface-brand-soft)", border: "1px solid var(--role-feedback)", borderRadius: "var(--radius-sm)", color: "var(--ab-azul-escuro)", fontWeight: 700, fontSize: 13 }}>
                <Icon name="clock" size={15} /> {f.admissao ? tempoEmpresa(f.admissao) : "—"}
              </div>
            </Field>
          </FormGrid>
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 18 }}>
            <Button variant="accent" iconLeft={<Icon name="user-check" size={15} />} onClick={cadastrar}>Cadastrar Colaborador</Button>
          </div>
        </Card>

        <Card title="Quadro de Colaboradores">
          <Banner tone="info" icon={<Icon name="info" size={16} />} style={{ marginBottom: 14 }}>
            Cadastre aqui todos os seus colaboradores. Depois, na aba <strong>Cadastro de Ciclo</strong>, você seleciona um colaborador e abre um ciclo de desenvolvimento para ele.
          </Banner>
          <div style={{ position: "relative", marginBottom: 16 }}>
            <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", pointerEvents: "none" }}><Icon name="search" size={15} /></span>
            <TextField placeholder="Buscar por nome, cargo ou departamento..." value={q} onChange={(e) => setQ(e.target.value)} style={{ paddingLeft: 32 }} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {list.length === 0 && (
              <div style={{ textAlign: "center", padding: 30, color: "var(--text-muted)", fontSize: 13 }}>Nenhum colaborador cadastrado ainda. Use o formulário acima para começar.</div>
            )}
            {list.map((c) => (
              editId === c.id ? (
                <div key={c.id} style={{ border: "1.5px solid var(--ab-azul-claro)", borderRadius: "var(--radius-lg)", padding: "16px", background: "var(--surface-brand-soft)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, fontWeight: 700, color: "var(--ab-azul-escuro)" }}>
                    <Icon name="pencil" size={15} /> Editando: {c.nome}
                  </div>
                  <FormGrid columns={3}>
                    <Field label="Nome Completo" required><TextField value={editForm.nome || ""} onChange={(e) => setE("nome", e.target.value)} /></Field>
                    <Field label="Data de Admissão"><TextField type="date" value={editForm.admissao || ""} onChange={(e) => setE("admissao", e.target.value)} /></Field>
                    <Field label="Cargo"><TextField value={editForm.cargo || ""} onChange={(e) => setE("cargo", e.target.value)} /></Field>
                    <Field label="Departamento"><TextField value={editForm.departamento || ""} onChange={(e) => setE("departamento", e.target.value)} /></Field>
                    <Field label="WhatsApp" hint="Com DDD. Ex: (27) 99999-9999"><TextField value={editForm.whatsapp || ""} onChange={(e) => setE("whatsapp", e.target.value)} /></Field>
                    <Field label="Tempo de Empresa" hint="Calculado a partir da admissão.">
                      <div style={{ display: "flex", alignItems: "center", gap: 8, height: 38, padding: "0 12px", background: "#fff", border: "1px solid var(--role-feedback)", borderRadius: "var(--radius-sm)", color: "var(--ab-azul-escuro)", fontWeight: 700, fontSize: 13 }}>
                        <Icon name="clock" size={15} /> {editForm.admissao ? tempoEmpresa(editForm.admissao) : "—"}
                      </div>
                    </Field>
                  </FormGrid>
                  <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 16 }}>
                    <Button variant="ghost" onClick={cancelEdit}>Cancelar</Button>
                    <Button variant="primary" iconLeft={<Icon name="save" size={15} />} onClick={saveEdit}>Salvar Alterações</Button>
                  </div>
                </div>
              ) : (
              <div key={c.id} style={{ border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-lg)", padding: "14px 16px", display: "flex", gap: 14, alignItems: "flex-start", opacity: c.demitido ? 0.72 : 1 }}>
                <Avatar name={c.nome} size={42} tone={c.demitido ? "soft" : "brand"} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                    <span style={{ fontWeight: 700, fontSize: 14, cursor: "pointer", color: "var(--ab-azul-escuro)", textDecoration: "underline dotted" }} onClick={() => setHistId(c.id)}>{c.nome}</span>
                    {c.cargo && <span style={{ fontSize: 12, color: "var(--text-muted)" }}>· {c.cargo}</span>}
                    {c.demitido
                      ? <StatusBadge status="pendente" label="Desligado" />
                      : <StatusBadge status="completo" label="Ativo" />}
                    {ciclosDe(c.id).length > 0 && <span style={{ fontSize: 11, color: "var(--ab-azul-escuro)", background: "var(--surface-brand-soft)", padding: "2px 8px", borderRadius: 999, fontWeight: 700 }}>{ciclosDe(c.id).length} ciclo(s)</span>}
                  </div>
                  <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4, display: "flex", gap: 14, flexWrap: "wrap" }}>
                    <span><strong>Depto:</strong> {c.departamento || "—"}</span>
                    {c.whatsapp && <span><strong>WhatsApp:</strong> {c.whatsapp}</span>}
                    <span><strong>Admissão:</strong> {fmtDate(c.admissao)}</span>
                    <span style={{ color: "var(--ab-azul-escuro)", fontWeight: 700 }}><Icon name="clock" size={12} style={{ marginRight: 3, verticalAlign: "-2px" }} />{tempoEmpresa(c.admissao, c.demitido ? c.demissao : null)}</span>
                    {c.demitido && <span style={{ color: "var(--danger)", fontWeight: 700 }}><strong>Demissão:</strong> {fmtDate(c.demissao)}</span>}
                  </div>

                  {/* Desligamento */}
                  <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                    <label style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 13, cursor: "pointer", color: "var(--text-body)" }}>
                      <input
                        type="checkbox"
                        checked={c.demitido}
                        onChange={(e) => onUpdate(c.id, e.target.checked ? { demitido: true, demissao: c.demissao || new Date().toISOString().slice(0, 10) } : { demitido: false, demissao: "" })}
                        style={{ width: 16, height: 16, accentColor: "var(--danger)", cursor: "pointer" }}
                      />
                      Colaborador desligado
                    </label>
                    {c.demitido && (
                      <label style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 12, color: "var(--text-muted)" }}>
                        Data da demissão:
                        <TextField type="date" value={c.demissao || ""} onChange={(e) => onUpdate(c.id, { demissao: e.target.value })} style={{ width: 160, height: 34 }} />
                      </label>
                    )}
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <Button size="sm" variant="secondary" onClick={() => startEdit(c)} iconLeft={<Icon name="pencil" size={14} />}>Editar</Button>
                  <Button size="sm" variant="ghost" onClick={() => setHistId(c.id)} iconLeft={<Icon name="history" size={14} />}>Histórico</Button>
                  <Button size="sm" variant="danger" onClick={() => { if (window.confirm(`Excluir ${c.nome}? Os ciclos vinculados também serão removidos.`)) onDelete(c.id); }} iconLeft={<Icon name="trash-2" size={14} />}>Excluir</Button>
                </div>
              </div>
              )
            ))}
          </div>
        </Card>
        {list.filter((c) => c.id === histId).map((c) => (
          <window.ColaboradorHistoricoView key={c.id} colab={c} gestorNome={gestorNome} ciclosDoColab={ciclosDe(c.id)} movimentacoes={movimentacoesDe(c.nome)} onClose={() => setHistId(null)} />
        ))}
      </div>
    );
  }

  window.FuncionariosScreen = FuncionariosScreen;
})();
