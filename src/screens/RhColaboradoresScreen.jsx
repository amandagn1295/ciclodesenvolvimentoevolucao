// RH — visão geral de todos os colaboradores (de todos os gestores) + cadastro e importação em massa.
(function () {
  const NS = window.CicloDeDesenvolvimentoDesignSystem_cb4518;
  const { Card, FormGrid, Field, TextField, Select, Button, Avatar, Banner, StatusBadge } = NS;
  const { Icon, fmtDate, tempoEmpresa, EditableSelect, parseDataBR, titleCase } = window.CicloHelpers;

  const HEADERS = ["Nome", "Usuário do Gestor", "Cargo", "Departamento", "Diretoria | Negócios", "Setor", "Regional", "Admissão (DD/MM/AAAA)", "WhatsApp"];

  function RhColaboradoresScreen({ funcionarios, gestores, ciclos, catalogos, auditLog, onAddCatalogoItem, onAdd, onUpdate, onDelete, onImportBulk, onToast }) {
    const cat = catalogos || { regionais: [], diretorias: [], departamentos: [], setores: [], unidades: [] };
    const gestoresAtivos = (gestores || []).filter((g) => !g.desligado).slice().sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));
    const empty = { nome: "", gestorId: gestoresAtivos[0] ? gestoresAtivos[0].id : "", admissao: "", departamento: "", cargo: "", diretoria: "", setor: "", regional: "", whatsapp: "" };
    const [f, setF] = React.useState(empty);
    const set = (k, v) => setF((s) => ({ ...s, [k]: v }));
    const [q, setQ] = React.useState("");
    const [filtroGestor, setFiltroGestor] = React.useState("");
    const fileRef = React.useRef(null);
    const [importando, setImportando] = React.useState(false);

    const gestorNome = (gid) => { const g = (gestores || []).find((x) => x.id === gid); return g ? g.nome : "—"; };
    const ciclosDe = (fid) => (ciclos || []).filter((c) => c.funcionarioId === fid);
    const [editId, setEditId] = React.useState(null);
    const [editForm, setEditForm] = React.useState(null);
    const [histId, setHistId] = React.useState(null);
    const movimentacoesDe = (nome) => (auditLog || []).filter((a) => a.tipo === "funcionario" && a.alvo === nome);
    const abrirEdicao = (c) => { setEditId(c.id); setEditForm({ gestorId: c.gestorId, cargo: titleCase(c.cargo || ""), departamento: titleCase(c.departamento || ""), diretoria: titleCase(c.diretoria || ""), setor: titleCase(c.setor || ""), regional: titleCase(c.regional || "") }); };
    const salvarEdicao = (c) => {
      const gestorAntigo = gestorNome(c.gestorId);
      onUpdate(c.id, editForm);
      if (editForm.gestorId !== c.gestorId) onToast(`${c.nome} transferido de ${gestorAntigo} para ${gestorNome(editForm.gestorId)}. Histórico de ciclos preservado.`, "success");
      else onToast("Cadastro atualizado.", "success");
      setEditId(null); setEditForm(null);
    };

    const cadastrar = () => {
      if (!f.nome.trim()) { onToast("Informe o nome completo do colaborador.", "danger"); return; }
      if (!f.gestorId) { onToast("Selecione um gestor.", "danger"); return; }
      if (!f.admissao) { onToast("Informe a data de admissão.", "danger"); return; }
      if (!f.cargo.trim()) { onToast("Informe o cargo.", "danger"); return; }
      if (!f.departamento.trim()) { onToast("Informe o Departamento.", "danger"); return; }
      if (!f.diretoria) { onToast("Selecione a Diretoria | Negócios.", "danger"); return; }
      if (!f.setor) { onToast("Selecione o Setor.", "danger"); return; }
      if (!f.regional) { onToast("Selecione a Regional.", "danger"); return; }
      if (!f.whatsapp.trim()) { onToast("Informe o WhatsApp.", "danger"); return; }
      onAdd({ ...f });
      onToast(`${f.nome} cadastrado.`, "success");
      setF({ ...empty, gestorId: f.gestorId });
    };

    const list = (funcionarios || []).filter((x) =>
      (!filtroGestor || x.gestorId === filtroGestor) &&
      (!q || x.nome.toLowerCase().includes(q.toLowerCase()) || (x.cargo || "").toLowerCase().includes(q.toLowerCase()))
    ).slice().sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));

    const baixarModelo = () => window.CicloBulk.downloadTemplate(HEADERS, "modelo-colaboradores.xlsx", ["Ex: João Silva", gestoresAtivos[0] ? gestoresAtivos[0].usuario : "usuario-do-gestor", "Consultor de Vendas", "Comércio", "Vitoria Motors Byd", "Adm Central De Vendas", "Byd Es", "01/03/2024", "(27) 99999-9999"]);

    const importar = async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      setImportando(true);
      try {
        const rows = await window.CicloBulk.parseFile(file);
        let ok = 0, semGestor = 0, semNome = 0, dataInvalida = 0;
        rows.forEach((r) => {
          const nome = String(r["Nome"] || "").trim();
          if (!nome) { semNome++; return; }
          const usuarioGestor = String(r["Usuário do Gestor"] || "").trim().toLowerCase();
          const gestor = (gestores || []).find((g) => (g.usuario || "").toLowerCase() === usuarioGestor);
          if (!gestor) { semGestor++; return; }
          const admissao = parseDataBR(r["Admissão (DD/MM/AAAA)"]);
          if (r["Admissão (DD/MM/AAAA)"] && !admissao) dataInvalida++;
          onAdd({
            nome, gestorId: gestor.id, cargo: String(r["Cargo"] || ""), departamento: String(r["Departamento"] || ""),
            diretoria: String(r["Diretoria | Negócios"] || ""), setor: String(r["Setor"] || ""),
            regional: String(r["Regional"] || ""), admissao, whatsapp: String(r["WhatsApp"] || ""),
          });
          ok++;
        });
        onToast(`Importação concluída: ${ok} colaborador(es) cadastrado(s)${semGestor ? `, ${semGestor} sem gestor reconhecido` : ""}${semNome ? `, ${semNome} sem nome` : ""}${dataInvalida ? `, ${dataInvalida} com data de admissão inválida` : ""}.`, ok ? "success" : "danger");
      } catch (err) {
        onToast("Não foi possível ler a planilha: " + err.message, "danger");
      }
      setImportando(false);
      if (fileRef.current) fileRef.current.value = "";
    };

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <Card title="Cadastrar Colaborador" action={<Icon name="user-plus" size={18} color="var(--ab-azul-claro)" />}>
          {gestoresAtivos.length === 0 ? (
            <Banner tone="accent" icon={<Icon name="alert-circle" size={16} />}>Cadastre ao menos um gestor antes de adicionar colaboradores.</Banner>
          ) : (
            <>
              <FormGrid columns={3}>
                <Field label="Nome Completo" required><TextField placeholder="Nome completo" value={f.nome} onChange={(e) => set("nome", e.target.value)} /></Field>
                <Field label="Gestor" required>
                  <Select value={f.gestorId} onChange={(e) => set("gestorId", e.target.value)}>
                    {gestoresAtivos.map((g) => <option key={g.id} value={g.id}>{g.nome}{g.diretoria ? ` — ${g.diretoria}` : ""}</option>)}
                  </Select>
                </Field>
                <Field label="Data de Admissão" required><TextField type="date" value={f.admissao} onChange={(e) => set("admissao", e.target.value)} /></Field>
                <Field label="Cargo" required><TextField placeholder="Ex: Consultor de Vendas" value={f.cargo} onChange={(e) => set("cargo", e.target.value)} /></Field>
                <Field label="Departamento" required><TextField placeholder="Ex: Comércio" value={f.departamento} onChange={(e) => set("departamento", e.target.value)} /></Field>
                <Field label="Diretoria | Negócios" required><EditableSelect value={f.diretoria} options={cat.diretorias} onChange={(v) => set("diretoria", v)} onAddOption={(v) => onAddCatalogoItem("diretorias", v)} placeholder="Nova diretoria" /></Field>
                <Field label="Setor" required><EditableSelect value={f.setor} options={cat.setores} onChange={(v) => set("setor", v)} onAddOption={(v) => onAddCatalogoItem("setores", v)} placeholder="Novo setor" /></Field>
                <Field label="Regional" required><EditableSelect value={f.regional} options={cat.regionais} onChange={(v) => set("regional", v)} onAddOption={(v) => onAddCatalogoItem("regionais", v)} placeholder="Nova regional" /></Field>
                <Field label="WhatsApp" required hint="Com DDD."><TextField placeholder="(27) 99999-9999" value={f.whatsapp} onChange={(e) => set("whatsapp", e.target.value)} /></Field>
              </FormGrid>
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 18 }}>
                <Button variant="accent" iconLeft={<Icon name="user-check" size={15} />} onClick={cadastrar}>Cadastrar Colaborador</Button>
              </div>
            </>
          )}
        </Card>

        <Card title="Importação em massa" action={<Icon name="upload" size={18} color="var(--ab-azul-claro)" />}>
          <Banner tone="info" icon={<Icon name="info" size={16} />} style={{ marginBottom: 14 }}>
            A coluna <strong>Usuário do Gestor</strong> deve corresponder ao login já cadastrado do gestor (veja na aba Gestores). A data de admissão aceita o formato <strong>DD/MM/AAAA</strong>.
          </Banner>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Button variant="secondary" iconLeft={<Icon name="file-down" size={15} />} onClick={baixarModelo}>Baixar modelo (Excel)</Button>
            <Button variant="primary" iconLeft={<Icon name="upload" size={15} />} onClick={() => fileRef.current && fileRef.current.click()} disabled={importando}>{importando ? "Importando..." : "Importar planilha"}</Button>
            <input ref={fileRef} type="file" accept=".xlsx,.xls,.csv" onChange={importar} style={{ display: "none" }} />
          </div>
        </Card>

        <Card title={`Todos os Colaboradores (${list.length})`} action={<Button size="sm" variant="secondary" iconLeft={<Icon name="file-down" size={14} />} onClick={() => window.CicloBulk.exportRows(list, [
          { label: "Nome", key: "nome" }, { label: "Gestor", value: (r) => gestorNome(r.gestorId) }, { label: "Cargo", key: "cargo" },
          { label: "Departamento", key: "departamento" }, { label: "Diretoria", key: "diretoria" }, { label: "Setor", key: "setor" }, { label: "Regional", key: "regional" },
          { label: "Admissão", value: (r) => fmtDate(r.admissao) }, { label: "Ciclos", value: (r) => ciclosDe(r.id).length }, { label: "Status", value: (r) => (r.demitido ? "Desligado" : "Ativo") },
        ], "colaboradores.xlsx", "Colaboradores")}>Exportar (Excel)</Button>}>
          <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
            <div style={{ position: "relative", flex: 2, minWidth: 220 }}>
              <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", pointerEvents: "none" }}><Icon name="search" size={15} /></span>
              <TextField placeholder="Buscar por nome ou cargo..." value={q} onChange={(e) => setQ(e.target.value)} style={{ paddingLeft: 32 }} />
            </div>
            <div style={{ flex: 1, minWidth: 180 }}>
              <Select value={filtroGestor} onChange={(e) => setFiltroGestor(e.target.value)}>
                <option value="">Todos os gestores</option>
                {gestoresAtivos.map((g) => <option key={g.id} value={g.id}>{g.nome}</option>)}
              </Select>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {list.length === 0 && <div style={{ textAlign: "center", padding: 30, color: "var(--text-muted)", fontSize: 13 }}>Nenhum colaborador encontrado.</div>}
            {list.map((c) => (
              <div key={c.id} style={{ border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-lg)", padding: "14px 16px", display: "flex", gap: 14, alignItems: "flex-start", opacity: c.demitido ? 0.72 : 1 }}>
                <Avatar name={c.nome} size={42} tone={c.demitido ? "soft" : "brand"} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                    <span style={{ fontWeight: 700, fontSize: 14, cursor: "pointer", color: "var(--ab-azul-escuro)", textDecoration: "underline dotted" }} onClick={() => setHistId(c.id)}>{c.nome}</span>
                    {c.cargo && <span style={{ fontSize: 12, color: "var(--text-muted)" }}>· {c.cargo}</span>}
                    {c.demitido ? <StatusBadge status="pendente" label="Desligado" /> : <StatusBadge status="completo" label="Ativo" />}
                    {ciclosDe(c.id).length > 0 && <span style={{ fontSize: 11, color: "var(--ab-azul-escuro)", background: "var(--surface-brand-soft)", padding: "2px 8px", borderRadius: 999, fontWeight: 700 }}>{ciclosDe(c.id).length} ciclo(s)</span>}
                  </div>
                  <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4, display: "flex", gap: 14, flexWrap: "wrap" }}>
                    <span><strong>Gestor:</strong> {gestorNome(c.gestorId)}</span>
                    <span><strong>Depto:</strong> {c.departamento || "—"}</span>
                    {c.diretoria && <span><strong>Diretoria | Negócios:</strong> {c.diretoria}</span>}
                    {c.setor && <span><strong>Setor:</strong> {c.setor}</span>}
                    {c.regional && <span><strong>Regional:</strong> {c.regional}</span>}
                    <span><strong>Admissão:</strong> {fmtDate(c.admissao)}</span>
                    <span style={{ color: "var(--ab-azul-escuro)", fontWeight: 700 }}>{tempoEmpresa(c.admissao, c.demitido ? c.demissao : null)}</span>
                    {c.demitido && <span style={{ color: "var(--danger)", fontWeight: 700 }}><strong>Demissão:</strong> {fmtDate(c.demissao)}</span>}
                  </div>

                  <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                    <label style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 13, cursor: "pointer", color: "var(--text-body)" }}>
                      <input
                        type="checkbox"
                        checked={!!c.demitido}
                        onChange={(e) => onUpdate(c.id, e.target.checked ? { demitido: true, demissao: c.demissao || new Date().toISOString().slice(0, 10) } : { demitido: false, demissao: "" })}
                        style={{ width: 16, height: 16, accentColor: "var(--danger)", cursor: "pointer" }}
                      />
                      Colaborador desligado
                    </label>
                    {c.demitido && (
                      <label style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 12, color: "var(--text-muted)" }}>
                        Data do desligamento:
                        <TextField type="date" value={c.demissao || ""} onChange={(e) => onUpdate(c.id, { demissao: e.target.value })} style={{ width: 160, height: 34 }} />
                      </label>
                    )}
                  </div>

                  {editId === c.id && editForm && (
                    <div style={{ marginTop: 12, padding: 12, background: "var(--surface-sunken)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-subtle)" }}>
                      <FormGrid columns={3}>
                        <Field label="Gestor"><Select value={editForm.gestorId} onChange={(e) => setEditForm((s) => ({ ...s, gestorId: e.target.value }))}>{gestoresAtivos.map((g) => <option key={g.id} value={g.id}>{g.nome}</option>)}</Select></Field>
                        <Field label="Cargo"><TextField value={editForm.cargo} onChange={(e) => setEditForm((s) => ({ ...s, cargo: e.target.value }))} /></Field>
                        <Field label="Departamento"><TextField value={editForm.departamento} onChange={(e) => setEditForm((s) => ({ ...s, departamento: e.target.value }))} /></Field>
                        <Field label="Diretoria | Negócios"><EditableSelect value={editForm.diretoria} options={cat.diretorias} onChange={(v) => setEditForm((s) => ({ ...s, diretoria: v }))} onAddOption={(v) => onAddCatalogoItem("diretorias", v)} /></Field>
                        <Field label="Setor"><EditableSelect value={editForm.setor} options={cat.setores} onChange={(v) => setEditForm((s) => ({ ...s, setor: v }))} onAddOption={(v) => onAddCatalogoItem("setores", v)} /></Field>
                        <Field label="Regional"><EditableSelect value={editForm.regional} options={cat.regionais} onChange={(v) => setEditForm((s) => ({ ...s, regional: v }))} onAddOption={(v) => onAddCatalogoItem("regionais", v)} /></Field>
                      </FormGrid>
                      <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 12 }}>
                        <Button size="sm" variant="secondary" onClick={() => { setEditId(null); setEditForm(null); }}>Cancelar</Button>
                        <Button size="sm" variant="accent" onClick={() => salvarEdicao(c)}>Salvar</Button>
                      </div>
                    </div>
                  )}

                  {histId === c.id && (
                    <window.ColaboradorHistoricoView colab={c} gestorNome={gestorNome(c.gestorId)} ciclosDoColab={ciclosDe(c.id)} movimentacoes={movimentacoesDe(c.nome)} onClose={() => setHistId(null)} />
                  )}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <Button size="sm" variant="secondary" onClick={() => abrirEdicao(c)} iconLeft={<Icon name="pencil" size={14} />}>Editar</Button>
                  <Button size="sm" variant="ghost" onClick={() => setHistId(histId === c.id ? null : c.id)} iconLeft={<Icon name="history" size={14} />}>Histórico</Button>
                  <Button size="sm" variant="danger" onClick={() => { if (window.confirm(`Excluir ${c.nome}? Os ciclos vinculados também serão removidos.`)) onDelete(c.id); }} iconLeft={<Icon name="trash-2" size={14} />}>Excluir</Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    );
  }

  window.RhColaboradoresScreen = RhColaboradoresScreen;
})();
