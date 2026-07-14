// Cadastro de Ciclo — vincula um ciclo de desenvolvimento a um funcionário.
(function () {
  const NS = window.CicloDeDesenvolvimentoDesignSystem_cb4518;
  const { Card, FormGrid, Field, TextField, Select, Button, LinkBox, StatusBadge, Avatar, Banner } = NS;
  const { Icon, fmtDate, addDays, prazoFinal, statusFromForms, statusLabel, tempoEmpresa } = window.CicloHelpers;

  function colabLink(id) {
    const base = location.href.split("#")[0];
    return `${base}#colab=${id}`;
  }

  // Mensagem padrão + link do WhatsApp para o gestor enviar ao colaborador.
  function waMessage(c) {
    const primeiro = (c.nome || "").split(" ")[0];
    return (
      `Olá ${primeiro}! Chegou o momento para falarmos sobre você, sobre a sua evolução e como estaremos juntas a construir um caminho de êxito e vitórias.\n\n` +
      `*Instruções:*\n` +
      `Acesse seu formulário: ${colabLink(c.id)}\n` +
      `Senha de acesso: ${c.acesso}\n` +
      `Data de aplicação do ciclo: ${fmtDate(c.data)}\n\n` +
      `Por favor, preencha o formulário de autopercepção *antes* da nossa conversa, respondendo com calma cada campo, assim aproveitaremos melhor o nosso momento.\n\n` +
      `Qualquer dúvida, estou à disposição!`
    );
  }
  function waLink(c) {
    const digits = String(c.whatsapp || "").replace(/\D/g, "");
    const num = digits ? (digits.startsWith("55") ? digits : "55" + digits) : "";
    return `https://wa.me/${num}?text=${encodeURIComponent(waMessage(c))}`;
  }

  function CicloCadastroScreen({ funcionarios, ciclos, onAddCiclo, onDeleteCiclo, onOpen, onOpenColabForm, onPrint, onToast }) {
    const ativos = funcionarios.filter((f) => !f.demitido).slice().sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));
    const empty = { funcionarioId: "", cicloNum: "1º Ciclo", data: "", alvo: "" };
    const [f, setF] = React.useState(empty);
    const set = (k, v) => setF((s) => ({ ...s, [k]: v }));
    const sel = funcionarios.find((x) => x.id === f.funcionarioId);
    const prazo = f.data ? fmtDate(addDays(f.data, 180)) : "—";

    const cadastrar = () => {
      if (!f.funcionarioId) { onToast("Selecione um colaborador.", "danger"); return; }
      if (!f.data) { onToast("Informe a data de aplicação.", "danger"); return; }
      if (!f.alvo.trim()) { onToast("Cadastre o alvo a ser atingido.", "danger"); return; }
      onAddCiclo({ ...f });
      setF(empty);
    };

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <Card title="Cadastrar Novo Ciclo" action={<Icon name="calendar-plus" size={18} color="var(--ab-azul-claro)" />}>
          {funcionarios.length === 0 ? (
            <Banner tone="accent" icon={<Icon name="alert-circle" size={16} />}>
              Nenhum colaborador cadastrado. Cadastre seus colaboradores na aba <strong>Colaboradores</strong> antes de abrir um ciclo.
            </Banner>
          ) : (
            <>
              <Field label="Colaborador" required>
                <Select value={f.funcionarioId} onChange={(e) => set("funcionarioId", e.target.value)}>
                  <option value="">Selecione um colaborador...</option>
                  {ativos.map((x) => (
                    <option key={x.id} value={x.id}>{x.nome}{x.cargo ? ` — ${x.cargo}` : ""}{x.area ? ` (${x.area})` : ""}</option>
                  ))}
                </Select>
              </Field>

              {sel && (
                <Banner tone="info" icon={<Icon name="user" size={16} />} style={{ marginTop: 12 }}>
                  <strong>{sel.nome}</strong>{sel.cargo ? ` · ${sel.cargo}` : ""}{sel.departamento ? ` · ${sel.departamento}` : ""}{sel.area ? ` · ${sel.area}` : ""} · Admissão {fmtDate(sel.admissao)} · <strong>{tempoEmpresa(sel.admissao)}</strong> de empresa
                </Banner>
              )}

              <FormGrid columns={3} style={{ marginTop: 14 }}>
                <Field label="Ciclo">
                  <Select value={f.cicloNum} onChange={(e) => set("cicloNum", e.target.value)}>
                    <option value="1º Ciclo">1º Ciclo</option>
                    <option value="2º Ciclo">2º Ciclo</option>
                  </Select>
                </Field>
                <Field label="Data de Aplicação" required>
                  <TextField type="date" value={f.data} onChange={(e) => set("data", e.target.value)} />
                </Field>
                <Field label="Próximo ciclo previsto: 180 dias" hint="Calculado automaticamente.">
                  <div style={{ display: "flex", alignItems: "center", gap: 8, height: 38, padding: "0 12px", background: "var(--surface-accent-soft)", border: "1px solid var(--ab-laranja)", borderRadius: "var(--radius-sm)", color: "var(--ab-laranja-600)", fontWeight: 700, fontSize: 13 }}>
                    <Icon name="calendar-clock" size={15} /> {prazo}
                  </div>
                </Field>
                <Field label="Alvo a ser Atingido" full required hint="Objetivo norteador deste ciclo de 180 dias.">
                  <TextField placeholder="Ex: Aumentar a conversão de vendas em 15%." value={f.alvo} onChange={(e) => set("alvo", e.target.value)} />
                </Field>
              </FormGrid>
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 18 }}>
                <Button variant="accent" iconLeft={<Icon name="link" size={15} />} onClick={cadastrar}>Cadastrar Ciclo e Gerar Link</Button>
              </div>
            </>
          )}
        </Card>

        <Card title="Ciclos Cadastrados">
          <Banner tone="info" icon={<Icon name="info" size={16} />} style={{ marginBottom: 14 }}>
            Cada ciclo tem um <strong>link único</strong> e uma <strong>senha de acesso</strong> — o colaborador acessa sem login, apenas com os dois. Envie-os juntos. O link continua válido para consulta mesmo após o ciclo encerrado.
          </Banner>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {ciclos.length === 0 && (
              <div style={{ textAlign: "center", padding: 30, color: "var(--text-muted)", fontSize: 13 }}>Nenhum ciclo cadastrado ainda.</div>
            )}
            {ciclos.map((c) => (
              <div key={c.id} style={{ border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-lg)", padding: "14px 16px", display: "flex", gap: 14, alignItems: "flex-start" }}>
                <Avatar name={c.nome} size={40} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                    <span style={{ fontWeight: 700, fontSize: 14 }}>{c.nome}</span>
                    <StatusBadge status={statusFromForms(c)} label={statusLabel(c)} />
                    {c.encerrado && <StatusBadge status="completo" label="Encerrado" />}
                  </div>
                  <div style={{ fontSize: 12, color: "var(--text-muted)", margin: "3px 0 10px" }}>
                    {c.cargo ? `${c.cargo} · ` : ""}{c.area ? `${c.area} · ` : ""}{c.cicloNum} · aplicação {fmtDate(c.data)} · prazo {fmtDate(prazoFinal(c))}
                  </div>
                  <div style={{ display: "flex", gap: 8, alignItems: "stretch", flexWrap: "wrap" }}>
                    <div style={{ flex: 1, minWidth: 240 }}><LinkBox value={colabLink(c.id)} /></div>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "0 12px", background: "var(--surface-brand-soft)", border: "1px solid var(--role-feedback)", borderRadius: "var(--radius-md)", color: "var(--ab-azul-escuro)", fontSize: 12, fontWeight: 700, whiteSpace: "nowrap" }}>
                      <Icon name="key-round" size={14} /> Senha: <span style={{ fontFamily: "var(--font-mono)" }}>{c.acesso}</span>
                    </div>
                    <Button size="md" variant="secondary" onClick={() => onOpenColabForm(c)} iconLeft={<Icon name="external-link" size={14} />}>Abrir</Button>
                    <Button size="md" variant="accent" onClick={() => window.open(waLink(c), "_blank", "noopener")} iconLeft={<Icon name="message-circle" size={14} />}>Enviar no WhatsApp</Button>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <Button size="sm" variant="ghost" onClick={() => onOpen(c)} iconLeft={<Icon name="eye" size={14} />}>Detalhes</Button>
                  <Button size="sm" variant="ghost" onClick={() => onPrint(c)} iconLeft={<Icon name="file-down" size={14} />}>PDF</Button>
                  <Button size="sm" variant="danger" onClick={() => { if (window.confirm(`Excluir o ciclo de ${c.nome}?`)) onDeleteCiclo(c.id); }} iconLeft={<Icon name="trash-2" size={14} />}>Excluir</Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    );
  }

  window.CicloCadastroScreen = CicloCadastroScreen;
})();
