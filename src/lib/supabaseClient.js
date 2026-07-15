// Ponte com o Supabase: carrega/salva o estado (funcionários + ciclos) em nuvem
// e propaga mudanças em tempo real entre todos os navegadores conectados.
(function () {
  const ROW_ID = "default";
  const TABLE = "ciclo_dados";
  let client = null;

  function getClient() {
    if (client) return client;
    const url = window.CICLO_SUPABASE_URL;
    const key = window.CICLO_SUPABASE_ANON_KEY;
    if (!url || !key || url.indexOf("COLE_AQUI") === 0 || !window.supabase) return null;
    client = window.supabase.createClient(url, key);
    return client;
  }

  function isConfigured() {
    return !!getClient();
  }

  function withDefaults(data) {
    return {
      funcionarios: (data && data.funcionarios) || [],
      ciclos: (data && data.ciclos) || [],
      gestores: (data && data.gestores) || [],
      auditLog: (data && data.auditLog) || [],
      rhAuth: (data && data.rhAuth) || null,
      catalogos: (data && data.catalogos) || (window.CICLO_DATA && window.CICLO_DATA.catalogos) || { regionais: [], diretorias: [], departamentos: [], setores: [], unidades: [] },
    };
  }

  async function loadState() {
    const sb = getClient();
    if (!sb) return null;
    const { data, error } = await sb.from(TABLE).select("funcionarios,ciclos,gestores,auditLog,rhAuth,catalogos").eq("id", ROW_ID).maybeSingle();
    if (error) { console.error("Supabase (load):", error.message); return null; }
    if (!data) {
      const fresh = withDefaults(null);
      const { error: insErr } = await sb.from(TABLE).insert({ id: ROW_ID, ...fresh });
      if (insErr) console.error("Supabase (insert inicial):", insErr.message);
      return fresh;
    }
    return withDefaults(data);
  }

  async function saveState(state) {
    const sb = getClient();
    if (!sb) return;
    const { error } = await sb.from(TABLE).upsert({
      id: ROW_ID,
      funcionarios: state.funcionarios,
      ciclos: state.ciclos,
      gestores: state.gestores || [],
      auditLog: state.auditLog || [],
      rhAuth: state.rhAuth || null,
      catalogos: state.catalogos || {},
      updated_at: new Date().toISOString(),
    });
    if (error) console.error("Supabase (save):", error.message);
    return !error;
  }

  // Chama onRemoteChange sempre que OUTRO navegador salvar uma mudança.
  function subscribe(onRemoteChange) {
    const sb = getClient();
    if (!sb) return function () {};
    const channel = sb
      .channel("ciclo_dados_changes")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: TABLE, filter: "id=eq." + ROW_ID },
        function (payload) {
          onRemoteChange(withDefaults(payload.new));
        }
      )
      .subscribe();
    return function () { sb.removeChannel(channel); };
  }

  window.CicloSupabase = { isConfigured, loadState, saveState, subscribe };
})();
