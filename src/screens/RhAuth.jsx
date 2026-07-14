// Troca de senha da administração do RH (login em si acontece pelo LoginScreen unificado).
(function () {
  const NS = window.CicloDeDesenvolvimentoDesignSystem_cb4518;
  const { Field, TextField, Button, Banner } = NS;
  const { Icon } = window.CicloHelpers;

  const DEFAULT_PASSWORD = "AguiaRH@2026";

  function RhChangePasswordModal({ open, onClose, onToast, rhAuth, onUpdateAuth }) {
    const [cur, setCur] = React.useState("");
    const [np1, setNp1] = React.useState("");
    const [np2, setNp2] = React.useState("");
    const [err, setErr] = React.useState("");
    React.useEffect(() => { if (open) { setCur(""); setNp1(""); setNp2(""); setErr(""); } }, [open]);
    if (!open) return null;
    const auth = rhAuth || { changed: false, password: DEFAULT_PASSWORD };

    const submit = (e) => {
      e && e.preventDefault();
      setErr("");
      if (cur !== auth.password) { setErr("Senha atual incorreta."); return; }
      if (np1.length < 6) { setErr("A nova senha deve ter ao menos 6 caracteres."); return; }
      if (np1 !== np2) { setErr("As senhas não coincidem."); return; }
      onUpdateAuth({ changed: true, password: np1 });
      onToast && onToast("Senha do RH alterada com sucesso!", "success");
      onClose && onClose();
    };

    return (
      <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(15,32,58,.55)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, zIndex: 60 }}>
        <div onClick={(e) => e.stopPropagation()} style={{ background: "#fff", borderRadius: "var(--radius-xl)", boxShadow: "var(--shadow-lg)", padding: 26, width: "100%", maxWidth: 420 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <Icon name="key-round" size={20} color="var(--ab-azul-escuro)" />
            <h2 style={{ fontSize: "var(--fs-h2)", color: "var(--ab-azul-escuro)", margin: 0 }}>Alterar senha do RH</h2>
          </div>
          <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 18 }}>
            <Field label="Senha atual"><TextField type="password" value={cur} onChange={(e) => setCur(e.target.value)} autoFocus /></Field>
            <Field label="Nova senha"><TextField type="password" value={np1} onChange={(e) => setNp1(e.target.value)} placeholder="Mínimo 6 caracteres" /></Field>
            <Field label="Confirmar nova senha"><TextField type="password" value={np2} onChange={(e) => setNp2(e.target.value)} /></Field>
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
  window.RhChangePasswordModal = RhChangePasswordModal;
})();
