// Login do gestor (multi-gestor, cadastrado pelo RH) + troca de senha forçada no 1º acesso.
(function () {
  const NS = window.CicloDeDesenvolvimentoDesignSystem_cb4518;
  const { Card, Field, TextField, Button, Banner } = NS;
  const { Icon } = window.CicloHelpers;

  function Shell({ logoSrc, children, subtitle }) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--ab-azul-escuro)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <div style={{ width: "100%", maxWidth: 420 }}>
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <img src={logoSrc} alt="Grupo Águia Branca — Divisão Comércio" style={{ height: 40 }} />
            <div style={{ color: "rgba(255,255,255,.7)", fontSize: 13, marginTop: 12 }}>Ciclo de Desenvolvimento e Evolução</div>
          </div>
          <div style={{ background: "#fff", borderRadius: "var(--radius-xl)", boxShadow: "var(--shadow-lg)", padding: 26 }}>
            {children}
          </div>
          <div style={{ textAlign: "center", color: "rgba(255,255,255,.5)", fontSize: 11, marginTop: 16 }}>{subtitle || "Acesso restrito à gestão"}</div>
        </div>
      </div>
    );
  }
  window.CicloShell = Shell;

  const RH_USERNAME = "pessoascultura.gabcomercio";
  const RH_DEFAULT_PASSWORD = "AguiaRH@2026";
  window.CICLO_RH_USERNAME = RH_USERNAME;

  // Login único: reconhece automaticamente se o usuário digitado é o do RH
  // (acesso administrativo) ou o de um gestor cadastrado (acesso escopado).
  // props: gestores, onUpdateGestor(id,patch), onAuthenticatedGestor(gestorId),
  //        rhAuth ({changed,password}|null), onUpdateRhAuth(newAuth), onAuthenticatedRh()
  function LoginScreen({ logoSrc, gestores, onUpdateGestor, onAuthenticatedGestor, rhAuth, onUpdateRhAuth, onAuthenticatedRh }) {
    const [stage, setStage] = React.useState("login"); // login | change-gestor | change-rh
    const [user, setUser] = React.useState("");
    const [pass, setPass] = React.useState("");
    const [err, setErr] = React.useState("");
    const [np1, setNp1] = React.useState("");
    const [np2, setNp2] = React.useState("");
    const [pendingGestor, setPendingGestor] = React.useState(null);

    const submitLogin = (e) => {
      e && e.preventDefault();
      setErr("");
      const digitado = user.trim().toLowerCase();

      if (digitado === RH_USERNAME) {
        const auth = rhAuth || { changed: false, password: RH_DEFAULT_PASSWORD };
        if (pass !== auth.password && pass !== RH_DEFAULT_PASSWORD) { setErr("Senha incorreta."); return; }
        if (!auth.changed && pass === RH_DEFAULT_PASSWORD) { setStage("change-rh"); return; }
        onAuthenticatedRh();
        return;
      }

      const g = (gestores || []).find((x) => (x.usuario || "").toLowerCase() === digitado);
      if (!g) { setErr("Usuário não encontrado. Confira com o RH."); return; }
      if (g.desligado) { setErr("Este acesso foi desligado. Fale com o RH."); return; }
      if (pass !== g.senha) { setErr("Senha incorreta."); return; }
      if (!g.senhaAlterada) { setPendingGestor(g); setStage("change-gestor"); return; }
      onAuthenticatedGestor(g.id);
    };

    const submitChangeGestor = (e) => {
      e && e.preventDefault();
      setErr("");
      if (np1.length < 6) { setErr("A nova senha deve ter ao menos 6 caracteres."); return; }
      if (np1 !== np2) { setErr("As senhas não coincidem."); return; }
      onUpdateGestor(pendingGestor.id, { senha: np1, senhaAlterada: true });
      onAuthenticatedGestor(pendingGestor.id);
    };

    const submitChangeRh = (e) => {
      e && e.preventDefault();
      setErr("");
      if (np1.length < 6) { setErr("A nova senha deve ter ao menos 6 caracteres."); return; }
      if (np1 !== np2) { setErr("As senhas não coincidem."); return; }
      onUpdateRhAuth({ changed: true, password: np1 });
      onAuthenticatedRh();
    };

    if (stage === "change-gestor" || stage === "change-rh") {
      const submit = stage === "change-rh" ? submitChangeRh : submitChangeGestor;
      return (
        <Shell logoSrc={logoSrc}>
          <h2 style={{ fontSize: "var(--fs-h2)", color: "var(--ab-azul-escuro)", marginBottom: 6 }}>Defina sua nova senha</h2>
          <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 18 }}>Por segurança, é necessário trocar a senha padrão no primeiro acesso.</p>
          <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <Field label="Nova senha"><TextField type="password" value={np1} onChange={(e) => setNp1(e.target.value)} placeholder="Mínimo 6 caracteres" autoFocus /></Field>
            <Field label="Confirmar nova senha"><TextField type="password" value={np2} onChange={(e) => setNp2(e.target.value)} placeholder="Repita a nova senha" /></Field>
            {err && <Banner tone="neutral" icon={<Icon name="alert-circle" size={16} color="var(--danger)" />} style={{ borderColor: "var(--danger)" }}>{err}</Banner>}
            <Button type="submit" variant="primary" full iconLeft={<Icon name="shield-check" size={16} />}>Salvar e Entrar</Button>
          </form>
        </Shell>
      );
    }

    return (
      <Shell logoSrc={logoSrc}>
        <h2 style={{ fontSize: "var(--fs-h2)", color: "var(--ab-azul-escuro)", marginBottom: 6 }}>Entrar</h2>
        <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 18 }}>Painel de gestão do Ciclo de Desenvolvimento.</p>
        <form onSubmit={submitLogin} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <Field label="Usuário"><TextField value={user} onChange={(e) => setUser(e.target.value)} placeholder="Recebido do RH" autoFocus /></Field>
          <Field label="Senha"><TextField type="password" value={pass} onChange={(e) => setPass(e.target.value)} placeholder="••••••••" /></Field>
          {err && <Banner tone="neutral" icon={<Icon name="alert-circle" size={16} color="var(--danger)" />} style={{ borderColor: "var(--danger)" }}>{err}</Banner>}
          <Button type="submit" variant="primary" full iconLeft={<Icon name="log-in" size={16} />}>Entrar</Button>
        </form>
        <div style={{ marginTop: 16, padding: "10px 12px", background: "var(--surface-brand-soft)", borderRadius: "var(--radius-sm)", fontSize: 12, color: "var(--ab-azul-escuro)" }}>
          Colaborador de RH ou gestor(a): use o usuário e senha recebidos. Dúvidas, fale com <strong>Pessoas &amp; Cultura</strong>.
        </div>
      </Shell>
    );
  }

  window.LoginScreen = LoginScreen;

  // Modal para o gestor alterar a própria senha a qualquer momento (após login).
  function ChangePasswordModal({ open, onClose, onToast, gestor, onUpdateGestor }) {
    const [cur, setCur] = React.useState("");
    const [np1, setNp1] = React.useState("");
    const [np2, setNp2] = React.useState("");
    const [err, setErr] = React.useState("");
    React.useEffect(() => { if (open) { setCur(""); setNp1(""); setNp2(""); setErr(""); } }, [open]);
    if (!open || !gestor) return null;

    const submit = (e) => {
      e && e.preventDefault();
      setErr("");
      if (cur !== gestor.senha) { setErr("Senha atual incorreta."); return; }
      if (np1.length < 6) { setErr("A nova senha deve ter ao menos 6 caracteres."); return; }
      if (np1 !== np2) { setErr("As senhas não coincidem."); return; }
      if (np1 === cur) { setErr("A nova senha deve ser diferente da atual."); return; }
      onUpdateGestor(gestor.id, { senha: np1, senhaAlterada: true });
      onToast && onToast("Senha alterada com sucesso!", "success");
      onClose && onClose();
    };

    return (
      <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(15,32,58,.55)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, zIndex: 60 }}>
        <div onClick={(e) => e.stopPropagation()} style={{ background: "#fff", borderRadius: "var(--radius-xl)", boxShadow: "var(--shadow-lg)", padding: 26, width: "100%", maxWidth: 420 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <Icon name="key-round" size={20} color="var(--ab-azul-escuro)" />
            <h2 style={{ fontSize: "var(--fs-h2)", color: "var(--ab-azul-escuro)", margin: 0 }}>Alterar senha</h2>
          </div>
          <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 18 }}>Defina uma nova senha de acesso ao painel de gestão.</p>
          <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <Field label="Senha atual"><TextField type="password" value={cur} onChange={(e) => setCur(e.target.value)} placeholder="••••••••" autoFocus /></Field>
            <Field label="Nova senha"><TextField type="password" value={np1} onChange={(e) => setNp1(e.target.value)} placeholder="Mínimo 6 caracteres" /></Field>
            <Field label="Confirmar nova senha"><TextField type="password" value={np2} onChange={(e) => setNp2(e.target.value)} placeholder="Repita a nova senha" /></Field>
            {err && <Banner tone="neutral" icon={<Icon name="alert-circle" size={16} color="var(--danger)" />} style={{ borderColor: "var(--danger)" }}>{err}</Banner>}
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 4 }}>
              <Button type="button" variant="ghost" onClick={onClose}>Cancelar</Button>
              <Button type="submit" variant="primary" iconLeft={<Icon name="shield-check" size={16} />}>Salvar nova senha</Button>
            </div>
          </form>
        </div>
      </div>
    );
  }
  window.ChangePasswordModal = ChangePasswordModal;

  // Gate de acesso do colaborador — sem login, apenas senha do link gerado. (Inalterado.)
  function ColabGate({ colab, logoSrc, onUnlock }) {
    const [pin, setPin] = React.useState("");
    const [err, setErr] = React.useState("");
    const submit = (e) => {
      e && e.preventDefault();
      if (pin.trim() === String(colab.acesso)) { onUnlock(); }
      else { setErr("Senha de acesso incorreta. Confira com seu gestor."); }
    };
    return (
      <Shell logoSrc={logoSrc}>
        <h2 style={{ fontSize: "var(--fs-h2)", color: "var(--ab-azul-escuro)", marginBottom: 6 }}>Olá, {colab.nome.split(" ")[0]}!</h2>
        <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 18 }}>Para acessar o seu formulário do Ciclo de Desenvolvimento e Evolução, informe a <strong>senha de acesso</strong> enviada junto com o seu link.</p>
        <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <Field label="Senha de acesso"><TextField value={pin} onChange={(e) => { setPin(e.target.value); setErr(""); }} placeholder="Ex: 4700" autoFocus /></Field>
          {err && <Banner tone="neutral" icon={<Icon name="alert-circle" size={16} color="var(--danger)" />} style={{ borderColor: "var(--danger)" }}>{err}</Banner>}
          <Button type="submit" variant="primary" full iconLeft={<Icon name="unlock" size={16} />}>Acessar meu formulário</Button>
        </form>
      </Shell>
    );
  }
  window.ColabGate = ColabGate;
})();
