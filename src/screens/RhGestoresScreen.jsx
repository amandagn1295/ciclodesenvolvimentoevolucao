// RH — Cadastro de Gestores (Nome, Diretoria, Setor, Departamento, Unidade, Regional) + login gerado.
(function () {
  const NS = window.CicloDeDesenvolvimentoDesignSystem_cb4518;
  const { Card, FormGrid, Field, TextField, Button, Avatar, Banner, StatusBadge, DataTable } = NS;
  const { Icon, slugUsuario, genSenhaInicial, EditableSelect } = window.CicloHelpers;

  const HEADERS = ["Nome", "Cargo", "Diretoria | Negócios", "Departamento", "Setor", "Unidade", "Regional"];

  function RhGestoresScreen({ gestores, funcionarios, catalogos, onAddCatalogoItem, onAdd, onUpdate, onDelete, onImportBulk, onToast }) {
    const empty = { nome: "", cargo: "", diretoria: "", setor: "", departamento: "", unidade: "", regional: "" };
    const cat = catalogos || { regionais: [], diretorias: [], departamentos: [], setores: [], unidades: [] };
    const [f, setF] = React.useState(empty);
    const set = (k, v) => setF((s) => ({ ...s, [k]: v }));
    const [q, setQ] = React.useState("");
    const [editId, setEditId] = React.useState(null);
    const [editForm, setEditForm] = React.useState({});
    const fileRef = React.useRef(null);
    const [importando, setImportando] = React.useState(false);
    const [novoLogin, setNovoLogin] = React.useState(null); // { nome, usuario, senha } — exibido após cadastrar

    const cadastrar = () => {
      if (!f.nome.trim()) { onToast("Informe o nome do gestor.", "danger"); return; }
      if (!f.cargo.trim()) { onToast("Informe o cargo do gestor.", "danger"); return; }
      if (!f.diretoria) { onToast("Selecione a Diretoria | Negócios.", "danger"); return; }
      if (!f.departamento) { onToast("Selecione o Departamento.", "danger"); return; }
      if (!f.setor) { onToast("Selecione o Setor.", "danger"); return; }
      if (!f.unidade) { onToast("Selecione a Unidade.", "danger"); return; }
      if (!f.regional) { onToast("Selecione a Regional.", "danger"); return; }
      const usuario = slugUsuario(f.nome, gestores.map((g) => g.usuario));
      const senha = genSenhaInicial();
      onAdd({ ...f, usuario, senha, senhaAlterada: false, desligado: false, desligamento: "" });
      onToast(`Gestor cadastrado! Usuário: ${usuario} · Senha inicial: ${senha}`, "success");
      setF(empty);
      setNovoLogin({ nome: f.nome, usuario, senha });
    };

    const startEdit = (g) => { setEditId(g.id); setEditForm({ ...g }); };
    const saveEdit = () => {
      if (!String(editForm.nome || "").trim()) { onToast("Informe o nome do gestor.", "danger"); return; }
      if (!String(editForm.cargo || "").trim()) { onToast("Informe o cargo do gestor.", "danger"); return; }
      if (!editForm.diretoria) { onToast("Selecione a Diretoria | Negócios.", "danger"); return; }
      if (!editForm.departamento) { onToast("Selecione o Departamento.", "danger"); return; }
      if (!editForm.setor) { onToast("Selecione o Setor.", "danger"); return; }
      if (!editForm.unidade) { onToast("Selecione a Unidade.", "danger"); return; }
      if (!editForm.regional) { onToast("Selecione a Regional.", "danger"); return; }
      const { id, usuario, senha, senhaAlterada, ...patch } = editForm;
      onUpdate(editId, patch);
      onToast("Cadastro atualizado.", "success");
      setEditId(null);
    };
    const resetarSenha = (g) => {
      if (!window.confirm(`Gerar nova senha inicial para ${g.nome}?`)) return;
      const nova = genSenhaInicial();
      onUpdate(g.id, { senha: nova, senhaAlterada: false });
      onToast(`Nova senha de ${g.nome}: ${nova}`, "success");
      setNovoLogin({ nome: g.nome, usuario: g.usuario, senha: nova });
    };

    const qtdColabs = (gid) => (funcionarios || []).filter((x) => x.gestorId === gid).length;

    const list = (gestores || []).filter((g) =>
      !q || g.nome.toLowerCase().includes(q.toLowerCase()) || (g.diretoria || "").toLowerCase().includes(q.toLowerCase())
    ).slice().sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));

    const baixarModelo = () => window.CicloBulk.downloadTemplate(HEADERS, "modelo-gestores.xlsx", ["Ex: Ana Souza", "Gerente Regional", "Comercial", "Comércio", "Vendas", "Grande Vitória", "Sudeste"]);

    const importar = async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      setImportando(true);
      try {
        const rows = await window.CicloBulk.parseFile(file);
        let ok = 0, ignoradas = 0;
        rows.forEach((r) => {
          const nome = String(r["Nome"] || "").trim();
          if (!nome) { ignoradas++; return; }
          const usuario = slugUsuario(nome, gestores.map((g) => g.usuario).concat(ok ? [] : []));
          const senha = genSenhaInicial();
          onAdd({
            nome, cargo: String(r["Cargo"] || ""), diretoria: String(r["Diretoria | Negócios"] || ""), departamento: String(r["Departamento"] || ""),
            setor: String(r["Setor"] || ""), unidade: String(r["Unidade"] || ""), regional: String(r["Regional"] || ""),
            usuario, senha, senhaAlterada: false, desligado: false, desligamento: "",
          });
          ok++;
        });
        onToast(`Importação concluída: ${ok} gestor(es) cadastrado(s)${ignoradas ? `, ${ignoradas} linha(s) ignorada(s)` : ""}.`, "success");
      } catch (err) {
        onToast("Não foi possível ler a planilha: " + err.message, "danger");
      }
      setImportando(false);
      if (fileRef.current) fileRef.current.value = "";
    };

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {novoLogin && (
          <Banner tone="accent" icon={<Icon name="key-round" size={16} />}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
              <span>Login gerado para <strong>{novoLogin.nome}</strong>: usuário <strong>{novoLogin.usuario}</strong> · senha <strong style={{ fontFamily: "var(--font-mono)" }}>{novoLogin.senha}</strong> — repasse ao gestor; será solicitada a troca no 1º acesso.</span>
              <Button size="sm" variant="ghost" onClick={() => setNovoLogin(null)}>Fechar</Button>
            </div>
          </Banner>
        )}
        <Card title="Cadastrar Gestor" action={<Icon name="user-plus" size={18} color="var(--ab-azul-claro)" />}>
          <FormGrid columns={3}>
            <Field label="Nome Completo" required><TextField placeholder="Nome do gestor" value={f.nome} onChange={(e) => set("nome", e.target.value)} /></Field>
            <Field label="Cargo" required><TextField placeholder="Ex: Gerente Regional" value={f.cargo} onChange={(e) => set("cargo", e.target.value)} /></Field>
            <Field label="Diretoria | Negócios" required><EditableSelect value={f.diretoria} options={cat.diretorias} onChange={(v) => set("diretoria", v)} onAddOption={(v) => onAddCatalogoItem("diretorias", v)} placeholder="Nova diretoria" /></Field>
            <Field label="Departamento" required><EditableSelect value={f.departamento} options={cat.departamentos} onChange={(v) => set("departamento", v)} onAddOption={(v) => onAddCatalogoItem("departamentos", v)} placeholder="Novo departamento" /></Field>
            <Field label="Setor" required><EditableSelect value={f.setor} options={cat.setores} onChange={(v) => set("setor", v)} onAddOption={(v) => onAddCatalogoItem("setores", v)} placeholder="Novo setor" /></Field>
            <Field label="Unidade" required><EditableSelect value={f.unidade} options={cat.unidades} onChange={(v) => set("unidade", v)} onAddOption={(v) => onAddCatalogoItem("unidades", v)} placeholder="Nova unidade" /></Field>
            <Field label="Regional" required><EditableSelect value={f.regional} options={cat.regionais} onChange={(v) => set("regional", v)} onAddOption={(v) => onAddCatalogoItem("regionais", v)} placeholder="Nova regional" /></Field>
          </FormGrid>
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 18 }}>
            <Button variant="accent" iconLeft={<Icon name="user-check" size={15} />} onClick={cadastrar}>Cadastrar Gestor e Gerar Login</Button>
          </div>
        </Card>

        <Card title="Importação em massa" action={<Icon name="upload" size={18} color="var(--ab-azul-claro)" />}>
          <Banner tone="info" icon={<Icon name="info" size={16} />} style={{ marginBottom: 14 }}>
            Baixe o modelo, preencha uma linha por gestor e envie de volta. Login e senha inicial são gerados automaticamente para cada um.
          </Banner>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Button variant="secondary" iconLeft={<Icon name="file-down" size={15} />} onClick={baixarModelo}>Baixar modelo (Excel)</Button>
            <Button variant="primary" iconLeft={<Icon name="upload" size={15} />} onClick={() => fileRef.current && fileRef.current.click()} disabled={importando}>{importando ? "Importando..." : "Importar planilha"}</Button>
            <input ref={fileRef} type="file" accept=".xlsx,.xls,.csv" onChange={importar} style={{ display: "none" }} />
          </div>
        </Card>

        <Card title="Gestores Cadastrados">
          <div style={{ position: "relative", marginBottom: 16 }}>
            <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", pointerEvents: "none" }}><Icon name="search" size={15} /></span>
            <TextField placeholder="Buscar por nome ou diretoria..." value={q} onChange={(e) => setQ(e.target.value)} style={{ paddingLeft: 32 }} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {list.length === 0 && <div style={{ textAlign: "center", padding: 30, color: "var(--text-muted)", fontSize: 13 }}>Nenhum gestor cadastrado ainda.</div>}
            {list.map((g) => editId === g.id ? (
              <div key={g.id} style={{ border: "1.5px solid var(--ab-azul-claro)", borderRadius: "var(--radius-lg)", padding: 16, background: "var(--surface-brand-soft)" }}>
                <FormGrid columns={3}>
                  <Field label="Nome Completo" required><TextField value={editForm.nome || ""} onChange={(e) => setEditForm((s) => ({ ...s, nome: e.target.value }))} /></Field>
                  <Field label="Cargo" required><TextField value={editForm.cargo || ""} onChange={(e) => setEditForm((s) => ({ ...s, cargo: e.target.value }))} /></Field>
                  <Field label="Diretoria | Negócios" required><EditableSelect value={editForm.diretoria} options={cat.diretorias} onChange={(v) => setEditForm((s) => ({ ...s, diretoria: v }))} onAddOption={(v) => onAddCatalogoItem("diretorias", v)} /></Field>
                  <Field label="Departamento" required><EditableSelect value={editForm.departamento} options={cat.departamentos} onChange={(v) => setEditForm((s) => ({ ...s, departamento: v }))} onAddOption={(v) => onAddCatalogoItem("departamentos", v)} /></Field>
                  <Field label="Setor" required><EditableSelect value={editForm.setor} options={cat.setores} onChange={(v) => setEditForm((s) => ({ ...s, setor: v }))} onAddOption={(v) => onAddCatalogoItem("setores", v)} /></Field>
                  <Field label="Unidade" required><EditableSelect value={editForm.unidade} options={cat.unidades} onChange={(v) => setEditForm((s) => ({ ...s, unidade: v }))} onAddOption={(v) => onAddCatalogoItem("unidades", v)} /></Field>
                  <Field label="Regional" required><EditableSelect value={editForm.regional} options={cat.regionais} onChange={(v) => setEditForm((s) => ({ ...s, regional: v }))} onAddOption={(v) => onAddCatalogoItem("regionais", v)} /></Field>
                </FormGrid>
                <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 16 }}>
                  <Button variant="ghost" onClick={() => setEditId(null)}>Cancelar</Button>
                  <Button variant="primary" iconLeft={<Icon name="save" size={15} />} onClick={saveEdit}>Salvar Alterações</Button>
                </div>
              </div>
            ) : (
              <div key={g.id} style={{ border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-lg)", padding: "14px 16px", display: "flex", gap: 14, alignItems: "flex-start", opacity: g.desligado ? 0.72 : 1 }}>
                <Avatar name={g.nome} size={42} tone={g.desligado ? "soft" : "brand"} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                    <span style={{ fontWeight: 700, fontSize: 14 }}>{g.nome}</span>
                    {g.desligado ? <StatusBadge status="pendente" label="Desligado" /> : <StatusBadge status="completo" label="Ativo" />}
                    <span style={{ fontSize: 11, color: "var(--ab-azul-escuro)", background: "var(--surface-brand-soft)", padding: "2px 8px", borderRadius: 999, fontWeight: 700 }}>{qtdColabs(g.id)} colaborador(es)</span>
                  </div>
                  <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4, display: "flex", gap: 14, flexWrap: "wrap" }}>
                    {g.cargo && <span><strong>Cargo:</strong> {g.cargo}</span>}
                    <span><strong>Diretoria | Negócios:</strong> {g.diretoria || "—"}</span>
                    <span><strong>Depto:</strong> {g.departamento || "—"}</span>
                    <span><strong>Setor:</strong> {g.setor || "—"}</span>
                    <span><strong>Unidade:</strong> {g.unidade || "—"}</span>
                    <span><strong>Regional:</strong> {g.regional || "—"}</span>
                    {g.desligado && <span style={{ color: "var(--danger)", fontWeight: 700 }}><strong>Deslig.:</strong> {g.desligamento ? new Date(g.desligamento + "T00:00:00").toLocaleDateString("pt-BR") : "—"}</span>}
                  </div>
                  <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "4px 10px", background: "var(--surface-sunken)", borderRadius: "var(--radius-sm)", fontSize: 12, fontWeight: 700, color: "var(--ab-azul-escuro)" }}>
                      <Icon name="user" size={13} /> {g.usuario}
                    </div>
                    {!g.senhaAlterada && (
                      <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "4px 10px", background: "var(--surface-accent-soft)", border: "1px solid var(--ab-laranja)", borderRadius: "var(--radius-sm)", fontSize: 12, fontWeight: 700, color: "var(--ab-laranja-600)" }}>
                        <Icon name="key-round" size={13} /> Senha: <span style={{ fontFamily: "var(--font-mono)" }}>{g.senha}</span> · 1º acesso pendente
                      </div>
                    )}
                  </div>
                  <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                    <label style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 13, cursor: "pointer", color: "var(--text-body)" }}>
                      <input
                        type="checkbox"
                        checked={!!g.desligado}
                        onChange={(e) => onUpdate(g.id, e.target.checked ? { desligado: true, desligamento: g.desligamento || new Date().toISOString().slice(0, 10) } : { desligado: false, desligamento: "" })}
                        style={{ width: 16, height: 16, accentColor: "var(--danger)", cursor: "pointer" }}
                      />
                      Gestor desligado
                    </label>
                    {g.desligado && (
                      <label style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 12, color: "var(--text-muted)" }}>
                        Data do desligamento:
                        <TextField type="date" value={g.desligamento || ""} onChange={(e) => onUpdate(g.id, { desligamento: e.target.value })} style={{ width: 160, height: 34 }} />
                      </label>
                    )}
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <Button size="sm" variant="secondary" onClick={() => startEdit(g)} iconLeft={<Icon name="pencil" size={14} />}>Editar</Button>
                  <Button size="sm" variant="ghost" onClick={() => resetarSenha(g)} iconLeft={<Icon name="key-round" size={14} />}>Nova senha</Button>
                  <Button size="sm" variant="danger" onClick={() => { if (window.confirm(`Excluir ${g.nome}? Colaboradores e ciclos vinculados também serão removidos.`)) onDelete(g.id); }} iconLeft={<Icon name="trash-2" size={14} />}>Excluir</Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    );
  }

  window.RhGestoresScreen = RhGestoresScreen;
})();
