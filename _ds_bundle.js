/* @ds-bundle: {"format":4,"namespace":"CicloDeDesenvolvimentoDesignSystem_cb4518","components":[{"name":"DataTable","sourcePath":"components/data/DataTable.jsx"},{"name":"FilterBar","sourcePath":"components/data/DataTable.jsx"},{"name":"Pane","sourcePath":"components/data/DualPane.jsx"},{"name":"DualPane","sourcePath":"components/data/DualPane.jsx"},{"name":"LinkBox","sourcePath":"components/data/LinkBox.jsx"},{"name":"PdiTable","sourcePath":"components/data/PdiTable.jsx"},{"name":"Avatar","sourcePath":"components/display/Avatar.jsx"},{"name":"Banner","sourcePath":"components/display/Banner.jsx"},{"name":"RoleTag","sourcePath":"components/display/Legend.jsx"},{"name":"Legend","sourcePath":"components/display/Legend.jsx"},{"name":"MetricCard","sourcePath":"components/display/MetricCard.jsx"},{"name":"ProgressBar","sourcePath":"components/display/ProgressBar.jsx"},{"name":"StatusBadge","sourcePath":"components/display/StatusBadge.jsx"},{"name":"Modal","sourcePath":"components/feedback/Modal.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"Button","sourcePath":"components/forms/Button.jsx"},{"name":"Field","sourcePath":"components/forms/Field.jsx"},{"name":"FormGrid","sourcePath":"components/forms/Field.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"TextArea","sourcePath":"components/forms/TextArea.jsx"},{"name":"TextField","sourcePath":"components/forms/TextField.jsx"},{"name":"DateField","sourcePath":"components/forms/TextField.jsx"},{"name":"AppHeader","sourcePath":"components/layout/AppHeader.jsx"},{"name":"Card","sourcePath":"components/layout/Card.jsx"},{"name":"SectionTitle","sourcePath":"components/layout/SectionTitle.jsx"}],"sourceHashes":{"components/data/DataTable.jsx":"f289714f244a","components/data/DualPane.jsx":"8806d67f5998","components/data/LinkBox.jsx":"85c82a64cd2e","components/data/PdiTable.jsx":"4f38e935269a","components/display/Avatar.jsx":"60f7411807d0","components/display/Banner.jsx":"45e77c6aa05c","components/display/Legend.jsx":"42478d1c871d","components/display/MetricCard.jsx":"979205088057","components/display/ProgressBar.jsx":"73cf75cea7d6","components/display/StatusBadge.jsx":"cf698d1da928","components/feedback/Modal.jsx":"9bcb04552775","components/feedback/Toast.jsx":"20c8698f8b6c","components/forms/Button.jsx":"10625cc1abea","components/forms/Field.jsx":"5b5de23f559d","components/forms/Select.jsx":"d33333142e1e","components/forms/TextArea.jsx":"9b814e0a7dc3","components/forms/TextField.jsx":"839adb752ccb","components/layout/AppHeader.jsx":"7eba98566c2e","components/layout/Card.jsx":"f07976ab43c0","components/layout/SectionTitle.jsx":"4138e9bd8210","ui_kits/ciclo/App.jsx":"5ea1c242f52c","ui_kits/ciclo/CicloCadastroScreen.jsx":"3e9d1839aaab","ui_kits/ciclo/CicloPrintView.jsx":"87e1be199db7","ui_kits/ciclo/ColaboradoresScreen.jsx":"0b12f24ae3a1","ui_kits/ciclo/ComparisonModal.jsx":"0cd6d72bbcb5","ui_kits/ciclo/DashboardScreen.jsx":"0a49e82bd7c2","ui_kits/ciclo/FormColaboradorScreen.jsx":"268a822669d3","ui_kits/ciclo/FormGestorScreen.jsx":"866f9a97ca66","ui_kits/ciclo/GestorPanel.jsx":"1d81e6a984d4","ui_kits/ciclo/LoginScreen.jsx":"12ecd07510b8","ui_kits/ciclo/PdiScreen.jsx":"501186c2c0f1","ui_kits/ciclo/RhAdminApp.jsx":"2dd576d94eeb","ui_kits/ciclo/RhAuth.jsx":"40ddca235f4f","ui_kits/ciclo/RhColaboradoresScreen.jsx":"5432cf2a7182","ui_kits/ciclo/RhDashboardScreen.jsx":"0af52972cd38","ui_kits/ciclo/RhGestoresScreen.jsx":"86e82b6ec556","ui_kits/ciclo/bulkImport.js":"8cc0ef407478","ui_kits/ciclo/data.js":"573916610ae1","ui_kits/ciclo/helpers.jsx":"d57e3ceb01c1","ui_kits/ciclo/logo.js":"d0ccf4bbcb11","ui_kits/ciclo/supabase-config.js":"0bd00e1a9fb4","ui_kits/ciclo/supabaseClient.js":"f7f8727ac216","ui_kits/ciclo/tweaks-panel.jsx":"6591467622ed"},"inlinedExternals":[],"unexposedExports":[{"name":"useToast","sourcePath":"components/feedback/Toast.jsx"}]} */

(() => {

const __ds_ns = (window.CicloDeDesenvolvimentoDesignSystem_cb4518 = window.CicloDeDesenvolvimentoDesignSystem_cb4518 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/data/DataTable.jsx
try { (() => {
/**
 * DataTable — readable data table with azul-escuro header and hover rows.
 * `columns`: [{ key, header, width, render }]. `rows`: array of records.
 */
function DataTable({
  columns = [],
  rows = [],
  rowKey = (r, i) => i,
  empty = "Nenhum registro encontrado.",
  style
}) {
  const [hover, setHover] = React.useState(-1);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: "auto",
      borderRadius: "var(--radius-md)",
      border: "1px solid var(--border-subtle)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse",
      minWidth: "560px"
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, columns.map(c => /*#__PURE__*/React.createElement("th", {
    key: c.key,
    style: {
      background: "var(--ab-azul-escuro)",
      color: "#fff",
      textAlign: c.align || "left",
      padding: "10px 14px",
      fontSize: "var(--fs-label)",
      fontWeight: "var(--fw-bold)",
      textTransform: "uppercase",
      letterSpacing: "0.03em",
      width: c.width,
      whiteSpace: "nowrap"
    }
  }, c.header)))), /*#__PURE__*/React.createElement("tbody", null, rows.length === 0 ? /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    colSpan: columns.length,
    style: {
      padding: "36px",
      textAlign: "center",
      color: "var(--text-muted)",
      fontSize: "var(--fs-body-sm)"
    }
  }, empty)) : rows.map((r, i) => /*#__PURE__*/React.createElement("tr", {
    key: rowKey(r, i),
    onMouseEnter: () => setHover(i),
    onMouseLeave: () => setHover(-1),
    style: {
      background: hover === i ? "var(--surface-brand-soft)" : "#fff",
      transition: "background var(--dur-fast)"
    }
  }, columns.map(c => /*#__PURE__*/React.createElement("td", {
    key: c.key,
    style: {
      padding: "10px 14px",
      borderBottom: "1px solid var(--border-subtle)",
      fontSize: "var(--fs-body-sm)",
      color: "var(--text-strong)",
      textAlign: c.align || "left",
      verticalAlign: "middle"
    }
  }, c.render ? c.render(r, i) : r[c.key])))))));
}

/** FilterBar — row of search + select filters above a table. */
function FilterBar({
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: "10px",
      marginBottom: "16px",
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { DataTable, FilterBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/DataTable.jsx", error: String((e && e.message) || e) }); }

// components/data/DualPane.jsx
try { (() => {
/**
 * DualPane — the side-by-side Líder × Liderado layout that anchors the
 * journey and the comparison modal ("Visão Lado a Lado"). Each side gets
 * a colored spine in its role color and a dotted heading.
 */
const SPINE = {
  gestor: "var(--role-gestor)",
  colab: "var(--role-colab)",
  feedback: "var(--role-feedback)"
};
function Pane({
  role = "gestor",
  heading,
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      borderLeft: `var(--border-accent-width) solid ${SPINE[role] || SPINE.gestor}`,
      paddingLeft: "14px",
      ...style
    }
  }, heading && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "7px",
      marginBottom: "10px",
      fontSize: "var(--fs-label)",
      fontWeight: "var(--fw-bold)",
      textTransform: "uppercase",
      letterSpacing: "var(--ls-label)",
      color: "var(--text-strong)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: "10px",
      height: "10px",
      borderRadius: "50%",
      background: SPINE[role] || SPINE.gestor,
      flexShrink: 0
    }
  }), heading), children);
}
function DualPane({
  children,
  gap = "16px",
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap,
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Pane, DualPane });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/DualPane.jsx", error: String((e && e.message) || e) }); }

// components/data/LinkBox.jsx
try { (() => {
/**
 * LinkBox — the unique self-assessment link given to each colaborador,
 * with a copy button. Azul-claro (feedback) accent.
 */
function LinkBox({
  label = "Link do Colaborador",
  value = "",
  onCopy,
  style
}) {
  const [copied, setCopied] = React.useState(false);
  const inputRef = React.useRef(null);
  const copy = () => {
    const el = inputRef.current;
    if (el) {
      el.select();
      try {
        document.execCommand("copy");
      } catch (e) {}
    }
    if (navigator.clipboard) navigator.clipboard.writeText(value).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
    onCopy && onCopy(value);
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      background: "var(--surface-brand-soft)",
      border: "1.5px solid var(--role-feedback)",
      borderRadius: "var(--radius-md)",
      padding: "8px 10px 8px 14px",
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--ab-azul-escuro)",
      fontWeight: "var(--fw-bold)",
      fontSize: "var(--fs-caption)",
      whiteSpace: "nowrap",
      display: "inline-flex",
      alignItems: "center",
      gap: "6px"
    }
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "link",
    style: {
      width: "14px",
      height: "14px"
    }
  }), label), /*#__PURE__*/React.createElement("input", {
    ref: inputRef,
    readOnly: true,
    value: value,
    style: {
      flex: 1,
      minWidth: 0,
      background: "#fff",
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-sm)",
      padding: "7px 10px",
      fontSize: "var(--fs-caption)",
      fontFamily: "var(--font-mono)",
      color: "var(--ab-azul-escuro)"
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: copy,
    style: {
      background: copied ? "var(--positive)" : "var(--ab-laranja)",
      color: "#fff",
      border: "none",
      borderRadius: "var(--radius-sm)",
      padding: "8px 14px",
      fontSize: "var(--fs-caption)",
      fontWeight: "var(--fw-bold)",
      cursor: "pointer",
      whiteSpace: "nowrap",
      transition: "background var(--dur-fast)"
    }
  }, copied ? "Copiado!" : "Copiar"));
}
Object.assign(__ds_scope, { LinkBox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/LinkBox.jsx", error: String((e && e.message) || e) }); }

// components/display/Avatar.jsx
try { (() => {
/** Avatar — initials chip for collaborators/managers. */
function Avatar({
  name = "",
  size = 36,
  tone = "brand",
  style
}) {
  const initials = name.split(" ").filter(Boolean).slice(0, 2).map(w => w[0]).join("").toUpperCase();
  const tones = {
    brand: {
      bg: "var(--ab-azul-escuro)",
      fg: "#fff"
    },
    accent: {
      bg: "var(--ab-laranja)",
      fg: "#fff"
    },
    soft: {
      bg: "var(--ab-azul-claro-50)",
      fg: "var(--ab-azul-escuro)"
    }
  };
  const t = tones[tone] || tones.brand;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: size,
      height: size,
      borderRadius: "50%",
      background: t.bg,
      color: t.fg,
      fontSize: size * 0.4,
      fontWeight: "var(--fw-bold)",
      fontFamily: "var(--font-display)",
      flexShrink: 0,
      ...style
    }
  }, initials || "?");
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/display/Banner.jsx
try { (() => {
/**
 * Banner — inline contextual note. Tones:
 *  info (azul claro), accent (laranja, e.g. the "Alvo a ser Atingido"),
 *  feedback (azul claro soft), neutral.
 */
function Banner({
  tone = "info",
  icon = null,
  title,
  children,
  style
}) {
  const tones = {
    info: {
      bg: "var(--surface-brand-soft)",
      border: "var(--ab-azul-claro)",
      fg: "var(--ab-azul-escuro)"
    },
    accent: {
      bg: "var(--ab-laranja-50)",
      border: "var(--ab-laranja)",
      fg: "var(--ab-laranja-600)"
    },
    success: {
      bg: "var(--positive-bg)",
      border: "var(--positive)",
      fg: "var(--positive)"
    },
    neutral: {
      bg: "var(--surface-sunken)",
      border: "var(--border-default)",
      fg: "var(--text-body)"
    }
  };
  const t = tones[tone] || tones.info;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      gap: "10px",
      background: t.bg,
      border: `1px solid ${t.border}`,
      borderRadius: "var(--radius-md)",
      padding: "12px 16px",
      fontSize: "var(--fs-body-sm)",
      color: "var(--text-strong)",
      lineHeight: "var(--lh-snug)",
      ...style
    }
  }, icon && /*#__PURE__*/React.createElement("span", {
    style: {
      color: t.fg,
      flexShrink: 0,
      display: "inline-flex",
      marginTop: "1px"
    }
  }, icon), /*#__PURE__*/React.createElement("div", null, title && /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: "var(--fw-bold)",
      color: t.fg,
      marginBottom: children ? "2px" : 0
    }
  }, title), children));
}
Object.assign(__ds_scope, { Banner });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Banner.jsx", error: String((e && e.message) || e) }); }

// components/display/Legend.jsx
try { (() => {
const ROLES = {
  gestor: {
    color: "var(--role-gestor)",
    label: "Percepção do Gestor"
  },
  colab: {
    color: "var(--role-colab)",
    label: "Percepção do Liderado"
  },
  feedback: {
    color: "var(--role-feedback)",
    label: "Preenchido no Feedback"
  }
};

/** A single role dot + label. */
function RoleTag({
  role = "gestor",
  label,
  style
}) {
  const r = ROLES[role] || ROLES.gestor;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "7px",
      fontSize: "var(--fs-caption)",
      color: "var(--text-muted)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: "10px",
      height: "10px",
      borderRadius: "50%",
      background: r.color,
      flexShrink: 0
    }
  }), label || r.label);
}

/**
 * Legend — the three-role key (Gestor / Liderado / Feedback) mapped to the
 * three brand colors. Sits above forms to explain who fills what.
 */
function Legend({
  roles = ["gestor", "colab", "feedback"],
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: "20px",
      padding: "10px 14px",
      background: "var(--surface-sunken)",
      borderRadius: "var(--radius-md)",
      ...style
    }
  }, roles.map(r => /*#__PURE__*/React.createElement(RoleTag, {
    key: r,
    role: r
  })));
}
Object.assign(__ds_scope, { RoleTag, Legend });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Legend.jsx", error: String((e && e.message) || e) }); }

// components/display/MetricCard.jsx
try { (() => {
/**
 * MetricCard — minimalist KPI card for the dashboard
 * (Total de Ciclos, Completos, Aguardando, Taxa de Conclusão).
 */
function MetricCard({
  value,
  label,
  tone = "default",
  icon = null,
  style
}) {
  const tones = {
    default: "var(--ab-azul-escuro)",
    completo: "var(--status-completo-fg)",
    parcial: "var(--status-parcial-fg)",
    accent: "var(--ab-laranja)"
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface-card)",
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-lg)",
      padding: "18px 20px",
      boxShadow: "var(--shadow-sm)",
      display: "flex",
      flexDirection: "column",
      gap: "4px",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--fs-stat)",
      fontWeight: 800,
      lineHeight: 1,
      color: tones[tone] || tones.default,
      fontFamily: "var(--font-display)"
    }
  }, value), icon && /*#__PURE__*/React.createElement("span", {
    style: {
      color: tones[tone] || tones.default,
      opacity: 0.5
    }
  }, icon)), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--fs-caption)",
      color: "var(--text-muted)"
    }
  }, label));
}
Object.assign(__ds_scope, { MetricCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/MetricCard.jsx", error: String((e && e.message) || e) }); }

// components/display/ProgressBar.jsx
try { (() => {
/** ProgressBar — slim completion bar for cycle progress. */
function ProgressBar({
  value = 0,
  tone = "completo",
  height = 8,
  showLabel = false,
  style
}) {
  const pct = Math.max(0, Math.min(100, value));
  const tones = {
    completo: "var(--status-completo-dot)",
    accent: "var(--ab-laranja)",
    brand: "var(--ab-azul-escuro)"
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      width: "100%",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      background: "var(--ab-gray-200)",
      borderRadius: "var(--radius-pill)",
      height,
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: `${pct}%`,
      height: "100%",
      borderRadius: "var(--radius-pill)",
      background: tones[tone] || tones.completo,
      transition: "width var(--dur-base) var(--ease-standard)"
    }
  })), showLabel && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--fs-caption)",
      color: "var(--text-muted)",
      fontWeight: "var(--fw-bold)",
      minWidth: "34px",
      textAlign: "right"
    }
  }, pct, "%"));
}
Object.assign(__ds_scope, { ProgressBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/ProgressBar.jsx", error: String((e && e.message) || e) }); }

// components/display/StatusBadge.jsx
try { (() => {
/**
 * StatusBadge — collaborator/cycle status pill.
 * Status colors built from the brand palette:
 * completo (azul), parcial (laranja), pendente (cinza).
 */
const STATUS = {
  completo: {
    fg: "var(--status-completo-fg)",
    bg: "var(--status-completo-bg)",
    dot: "var(--status-completo-dot)",
    label: "Completo"
  },
  parcial: {
    fg: "var(--status-parcial-fg)",
    bg: "var(--status-parcial-bg)",
    dot: "var(--status-parcial-dot)",
    label: "Parcial"
  },
  pendente: {
    fg: "var(--status-pendente-fg)",
    bg: "var(--status-pendente-bg)",
    dot: "var(--status-pendente-dot)",
    label: "Pendente"
  }
};
function StatusBadge({
  status = "pendente",
  label,
  dot = true,
  style
}) {
  const s = STATUS[status] || STATUS.pendente;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
      padding: "3px 10px",
      borderRadius: "var(--radius-pill)",
      background: s.bg,
      color: s.fg,
      fontSize: "var(--fs-label)",
      fontWeight: "var(--fw-bold)",
      textTransform: "uppercase",
      letterSpacing: "0.03em",
      lineHeight: 1.5,
      whiteSpace: "nowrap",
      ...style
    }
  }, dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: "7px",
      height: "7px",
      borderRadius: "50%",
      background: s.dot,
      flexShrink: 0
    }
  }), label || s.label);
}
Object.assign(__ds_scope, { StatusBadge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/StatusBadge.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Modal.jsx
try { (() => {
/**
 * Modal — fluid centered dialog. Used for the "Visão Lado a Lado"
 * comparison and detail views. Closes on overlay click or ✕.
 */
function Modal({
  open,
  onClose,
  title,
  subtitle,
  width = 860,
  children,
  footer,
  style
}) {
  React.useEffect(() => {
    if (!open) return;
    const onKey = e => {
      if (e.key === "Escape") onClose && onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    onClick: e => {
      if (e.target === e.currentTarget) onClose && onClose();
    },
    style: {
      position: "fixed",
      inset: 0,
      background: "rgba(8, 42, 77, 0.55)",
      zIndex: 1000,
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "center",
      padding: "32px 16px",
      overflowY: "auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    role: "dialog",
    "aria-modal": "true",
    style: {
      background: "#fff",
      borderRadius: "var(--radius-xl)",
      maxWidth: `${width}px`,
      width: "100%",
      padding: "26px 28px",
      position: "relative",
      boxShadow: "var(--shadow-lg)",
      animation: "abModalIn var(--dur-base) var(--ease-standard)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("style", null, `@keyframes abModalIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}`), /*#__PURE__*/React.createElement("button", {
    onClick: () => onClose && onClose(),
    "aria-label": "Fechar",
    style: {
      position: "absolute",
      top: "16px",
      right: "18px",
      border: "none",
      background: "transparent",
      color: "var(--text-muted)",
      fontSize: "20px",
      cursor: "pointer",
      lineHeight: 1
    }
  }, "\u2715"), title && /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: "var(--fs-h2)",
      color: "var(--ab-azul-escuro)",
      marginBottom: subtitle ? "4px" : "18px",
      paddingRight: "28px"
    }
  }, title), subtitle && /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--fs-caption)",
      color: "var(--text-muted)",
      marginBottom: "20px"
    }
  }, subtitle), children, footer && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "flex-end",
      gap: "12px",
      marginTop: "22px"
    }
  }, footer)));
}
Object.assign(__ds_scope, { Modal });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Modal.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
/**
 * Toast — transient confirmation message, bottom-right.
 * Render once and drive via the `message`/`open` props, or use the
 * `useToast` helper for imperative calls.
 */
function Toast({
  open,
  message,
  tone = "default",
  style
}) {
  const tones = {
    default: "var(--ab-azul-escuro)",
    success: "var(--positive)",
    danger: "var(--danger)"
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      bottom: "24px",
      right: "24px",
      background: tones[tone] || tones.default,
      color: "#fff",
      padding: "13px 20px",
      borderRadius: "var(--radius-lg)",
      fontSize: "var(--fs-body-sm)",
      fontWeight: "var(--fw-bold)",
      boxShadow: "var(--shadow-lg)",
      transform: open ? "translateY(0)" : "translateY(90px)",
      opacity: open ? 1 : 0,
      pointerEvents: "none",
      transition: "transform var(--dur-base) var(--ease-standard), opacity var(--dur-base)",
      zIndex: 2000,
      ...style
    }
  }, message);
}

/** Imperative toast helper: const { toast, node } = useToast(); */
function useToast() {
  const [state, setState] = React.useState({
    open: false,
    message: "",
    tone: "default"
  });
  const timer = React.useRef(null);
  const toast = React.useCallback((message, tone = "default") => {
    setState({
      open: true,
      message,
      tone
    });
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setState(s => ({
      ...s,
      open: false
    })), 2800);
  }, []);
  const node = /*#__PURE__*/React.createElement(Toast, {
    open: state.open,
    message: state.message,
    tone: state.tone
  });
  return {
    toast,
    node
  };
}
Object.assign(__ds_scope, { Toast, useToast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/forms/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Button — primary action control for the Ciclo app.
 * Variants follow the brand: primary (azul escuro), accent (laranja CTA),
 * secondary (outline) and ghost.
 */
function Button({
  variant = "primary",
  size = "md",
  iconLeft = null,
  iconRight = null,
  full = false,
  disabled = false,
  type = "button",
  children,
  style,
  ...rest
}) {
  const sizes = {
    sm: {
      padding: "6px 12px",
      fontSize: "var(--fs-caption)",
      gap: "6px"
    },
    md: {
      padding: "9px 18px",
      fontSize: "var(--fs-body-sm)",
      gap: "8px"
    },
    lg: {
      padding: "12px 24px",
      fontSize: "var(--fs-body)",
      gap: "8px"
    }
  };
  const variants = {
    primary: {
      background: "var(--action-primary)",
      color: "var(--text-on-brand)",
      border: "1px solid var(--action-primary)"
    },
    accent: {
      background: "var(--action-accent)",
      color: "#fff",
      border: "1px solid var(--action-accent)"
    },
    secondary: {
      background: "transparent",
      color: "var(--action-primary)",
      border: "1.5px solid var(--action-primary)"
    },
    ghost: {
      background: "transparent",
      color: "var(--action-primary)",
      border: "1px solid transparent"
    },
    danger: {
      background: "transparent",
      color: "var(--danger)",
      border: "1px solid var(--danger)"
    }
  };
  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "var(--font-sans)",
    fontWeight: "var(--fw-bold)",
    borderRadius: "var(--radius-md)",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    width: full ? "100%" : "auto",
    transition: "background var(--dur-fast) var(--ease-standard), opacity var(--dur-fast)",
    whiteSpace: "nowrap",
    lineHeight: 1,
    ...sizes[size],
    ...variants[variant],
    ...style
  };
  const [hover, setHover] = React.useState(false);
  const hoverStyle = !disabled && hover ? hoverFor(variant) : null;
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      ...base,
      ...hoverStyle
    }
  }, rest), iconLeft, children, iconRight);
}
function hoverFor(variant) {
  switch (variant) {
    case "primary":
      return {
        background: "var(--action-primary-hover)",
        borderColor: "var(--action-primary-hover)"
      };
    case "accent":
      return {
        background: "var(--action-accent-hover)",
        borderColor: "var(--action-accent-hover)"
      };
    case "secondary":
      return {
        background: "var(--action-primary)",
        color: "#fff"
      };
    case "ghost":
      return {
        background: "var(--surface-sunken)"
      };
    case "danger":
      return {
        background: "var(--danger)",
        color: "#fff"
      };
    default:
      return null;
  }
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Button.jsx", error: String((e && e.message) || e) }); }

// components/forms/Field.jsx
try { (() => {
/**
 * Field — label + control wrapper used across the forms.
 * Labels are uppercase, small, brand-muted per the visual language.
 */
function Field({
  label,
  hint,
  required = false,
  full = false,
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "5px",
      gridColumn: full ? "1 / -1" : "auto",
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    style: {
      fontSize: "var(--fs-label)",
      fontWeight: "var(--fw-bold)",
      color: "var(--text-muted)",
      textTransform: "uppercase",
      letterSpacing: "var(--ls-label)"
    }
  }, label, required && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--ab-laranja)",
      marginLeft: "3px"
    }
  }, "*")), children, hint && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--fs-caption)",
      color: "var(--text-muted)",
      lineHeight: 1.4
    }
  }, hint));
}

/** FormGrid — responsive 1/2/3 column grid for fields. */
function FormGrid({
  columns = 2,
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
      gap: "14px",
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Field, FormGrid });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Field.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Brand-styled native select. */
function Select({
  style,
  children,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement("select", _extends({
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      width: "100%",
      appearance: "none",
      WebkitAppearance: "none",
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-sm)",
      padding: "9px 34px 9px 12px",
      fontSize: "var(--fs-body-sm)",
      fontFamily: "var(--font-sans)",
      color: "var(--text-strong)",
      background: focus ? "#fff" : "var(--ab-gray-50)",
      cursor: "pointer",
      outline: "none",
      transition: "border-color var(--dur-fast), background var(--dur-fast), box-shadow var(--dur-fast)",
      ...(focus ? {
        borderColor: "var(--border-focus)",
        boxShadow: "var(--shadow-focus)"
      } : null),
      ...style
    }
  }, rest), children), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": true,
    style: {
      position: "absolute",
      right: "12px",
      top: "50%",
      transform: "translateY(-50%)",
      pointerEvents: "none",
      color: "var(--text-muted)",
      fontSize: "10px",
      lineHeight: 1
    }
  }, "\u25BC"));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/TextArea.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Expandable multi-line text area — the reflection / self-perception fields.
 * Auto-grows with content when `autoGrow` is set (the "campos de texto
 * expansíveis" called for in the brief).
 */
function TextArea({
  style,
  autoGrow = false,
  minRows = 3,
  onChange,
  value,
  ...rest
}) {
  const ref = React.useRef(null);
  const [focus, setFocus] = React.useState(false);
  const resize = React.useCallback(() => {
    const el = ref.current;
    if (!el || !autoGrow) return;
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  }, [autoGrow]);
  React.useEffect(() => {
    resize();
  }, [value, resize]);
  return /*#__PURE__*/React.createElement("textarea", _extends({
    ref: ref,
    rows: minRows,
    value: value,
    onChange: e => {
      resize();
      onChange && onChange(e);
    },
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      width: "100%",
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-sm)",
      padding: "10px 12px",
      fontSize: "var(--fs-body-sm)",
      lineHeight: "var(--lh-body)",
      fontFamily: "var(--font-sans)",
      color: "var(--text-strong)",
      background: focus ? "#fff" : "var(--ab-gray-50)",
      resize: autoGrow ? "none" : "vertical",
      minHeight: autoGrow ? "auto" : `${minRows * 22 + 20}px`,
      overflow: autoGrow ? "hidden" : "auto",
      transition: "border-color var(--dur-fast), background var(--dur-fast), box-shadow var(--dur-fast)",
      outline: "none",
      ...(focus ? {
        borderColor: "var(--border-focus)",
        boxShadow: "var(--shadow-focus)"
      } : null),
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { TextArea });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/TextArea.jsx", error: String((e && e.message) || e) }); }

// components/forms/TextField.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const fieldControlBase = {
  width: "100%",
  border: "1px solid var(--border-subtle)",
  borderRadius: "var(--radius-sm)",
  padding: "9px 12px",
  fontSize: "var(--fs-body-sm)",
  fontFamily: "var(--font-sans)",
  color: "var(--text-strong)",
  background: "var(--ab-gray-50)",
  transition: "border-color var(--dur-fast), background var(--dur-fast), box-shadow var(--dur-fast)",
  outline: "none"
};
function useFocusStyle() {
  const [focus, setFocus] = React.useState(false);
  const focusStyle = focus ? {
    borderColor: "var(--border-focus)",
    background: "#fff",
    boxShadow: "var(--shadow-focus)"
  } : null;
  return {
    focusStyle,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false)
  };
}

/** Single-line text input. */
function TextField({
  style,
  invalid = false,
  ...rest
}) {
  const {
    focusStyle,
    onFocus,
    onBlur
  } = useFocusStyle();
  return /*#__PURE__*/React.createElement("input", _extends({
    type: "text",
    onFocus: onFocus,
    onBlur: onBlur,
    style: {
      ...fieldControlBase,
      ...(invalid ? {
        borderColor: "var(--danger)"
      } : null),
      ...focusStyle,
      ...style
    }
  }, rest));
}

/** Date input — used for the highlighted "Data Acordada" column. */
function DateField({
  style,
  ...rest
}) {
  const {
    focusStyle,
    onFocus,
    onBlur
  } = useFocusStyle();
  return /*#__PURE__*/React.createElement("input", _extends({
    type: "date",
    onFocus: onFocus,
    onBlur: onBlur,
    style: {
      ...fieldControlBase,
      height: "38px",
      ...focusStyle,
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { TextField, DateField });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/TextField.jsx", error: String((e && e.message) || e) }); }

// components/data/PdiTable.jsx
try { (() => {
const emptyRow = () => ({
  acao: "",
  desdobramento: "",
  evidencia: "",
  data: ""
});

/**
 * PdiTable — dynamic action table for the PDI blocks (Técnico / Comportamental).
 * Columns: Ação · Desdobramento · Evidência · Data Acordada (highlighted).
 * Rows can be added and removed; fully controlled if `rows`/`onChange` given,
 * otherwise it manages its own state.
 */
function PdiTable({
  rows: controlledRows,
  onChange,
  addLabel = "+ Adicionar Ação",
  readOnly = false,
  style
}) {
  const [internal, setInternal] = React.useState([emptyRow()]);
  const rows = controlledRows ?? internal;
  const update = next => {
    if (onChange) onChange(next);
    if (controlledRows == null) setInternal(next);
  };
  const setCell = (i, key, val) => {
    const next = rows.map((r, idx) => idx === i ? {
      ...r,
      [key]: val
    } : r);
    update(next);
  };
  const addRow = () => update([...rows, emptyRow()]);
  const removeRow = i => update(rows.filter((_, idx) => idx !== i));
  const gridCols = readOnly ? "1fr 1fr 1fr 130px" : "1fr 1fr 1fr 130px 32px";
  const headStyle = {
    fontSize: "var(--fs-label)",
    fontWeight: "var(--fw-bold)",
    color: "var(--ab-azul-escuro)",
    textTransform: "uppercase",
    letterSpacing: "0.03em"
  };
  return /*#__PURE__*/React.createElement("div", {
    style: style
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: gridCols,
      gap: "8px",
      marginBottom: "6px",
      alignItems: "end"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: headStyle
  }, "A\xE7\xE3o"), /*#__PURE__*/React.createElement("span", {
    style: headStyle
  }, "Desdobramento"), /*#__PURE__*/React.createElement("span", {
    style: headStyle
  }, "Evid\xEAncia"), /*#__PURE__*/React.createElement("span", {
    style: {
      ...headStyle,
      color: "var(--ab-laranja-600)"
    }
  }, "Data Acordada"), !readOnly && /*#__PURE__*/React.createElement("span", null)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "8px"
    }
  }, rows.map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "grid",
      gridTemplateColumns: gridCols,
      gap: "8px",
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.TextArea, {
    minRows: 2,
    placeholder: "A\xE7\xE3o a ser feita",
    value: r.acao,
    readOnly: readOnly,
    onChange: e => setCell(i, "acao", e.target.value)
  }), /*#__PURE__*/React.createElement(__ds_scope.TextArea, {
    minRows: 2,
    placeholder: "Detalhar caso necess\xE1rio",
    value: r.desdobramento,
    readOnly: readOnly,
    onChange: e => setCell(i, "desdobramento", e.target.value)
  }), /*#__PURE__*/React.createElement(__ds_scope.TextArea, {
    minRows: 2,
    placeholder: "Como ser\xE1 monitorado?",
    value: r.evidencia,
    readOnly: readOnly,
    onChange: e => setCell(i, "evidencia", e.target.value)
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--ab-laranja-50)",
      border: "1px solid var(--ab-laranja)",
      borderRadius: "var(--radius-sm)",
      padding: "4px"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.DateField, {
    value: r.data,
    readOnly: readOnly,
    style: {
      border: "none",
      background: "transparent",
      padding: "5px 6px",
      height: "auto"
    },
    onChange: e => setCell(i, "data", e.target.value)
  })), !readOnly && /*#__PURE__*/React.createElement("button", {
    onClick: () => removeRow(i),
    "aria-label": "Remover linha",
    style: {
      border: "none",
      background: "transparent",
      color: "var(--danger)",
      cursor: "pointer",
      fontSize: "16px",
      lineHeight: 1,
      alignSelf: "center",
      padding: "6px"
    }
  }, "\u2715")))), !readOnly && /*#__PURE__*/React.createElement("button", {
    onClick: addRow,
    style: {
      marginTop: "10px",
      background: "transparent",
      border: "1.5px dashed var(--ab-laranja)",
      color: "var(--ab-laranja-600)",
      borderRadius: "var(--radius-sm)",
      padding: "8px 14px",
      cursor: "pointer",
      fontSize: "var(--fs-caption)",
      fontWeight: "var(--fw-bold)",
      transition: "background var(--dur-fast), color var(--dur-fast)"
    },
    onMouseEnter: e => {
      e.currentTarget.style.background = "var(--ab-laranja)";
      e.currentTarget.style.color = "#fff";
    },
    onMouseLeave: e => {
      e.currentTarget.style.background = "transparent";
      e.currentTarget.style.color = "var(--ab-laranja-600)";
    }
  }, addLabel));
}
Object.assign(__ds_scope, { PdiTable });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/PdiTable.jsx", error: String((e && e.message) || e) }); }

// components/layout/AppHeader.jsx
try { (() => {
/**
 * AppHeader — the top navigation bar for the management views.
 * Azul-escuro band, white logo on the left, tab navigation on the right,
 * and a thin laranja rule along the bottom edge (brand signature).
 *
 * Pass `logoSrc` (white version of the logo) from the consuming page so
 * the path resolves correctly; falls back to a text wordmark.
 */
function AppHeader({
  logoSrc,
  productName = "Ciclo de Desenvolvimento",
  tabs = [],
  active,
  onSelect,
  right = null,
  style
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      background: "var(--ab-azul-escuro)",
      borderBottom: "3px solid var(--ab-laranja)",
      height: "var(--header-height)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 24px",
      gap: "16px",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "14px",
      minWidth: 0
    }
  }, logoSrc ? /*#__PURE__*/React.createElement("img", {
    src: logoSrc,
    alt: "Grupo \xC1guia Branca \u2014 Divis\xE3o Com\xE9rcio",
    style: {
      height: "30px",
      display: "block"
    }
  }) : /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#fff",
      fontWeight: "var(--fw-bold)",
      letterSpacing: "0.04em",
      fontSize: "15px"
    }
  }, "\xC1GUIA", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--ab-laranja)"
    }
  }, "BRANCA")), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "rgba(255,255,255,0.55)",
      fontSize: "13px",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, productName)), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "4px"
    }
  }, tabs.map(t => {
    const isActive = (t.id ?? t) === active;
    const label = t.label ?? t;
    const id = t.id ?? t;
    return /*#__PURE__*/React.createElement("button", {
      key: id,
      onClick: () => onSelect && onSelect(id),
      style: {
        border: "none",
        background: isActive ? "var(--ab-laranja)" : "transparent",
        color: isActive ? "#fff" : "rgba(255,255,255,0.72)",
        fontWeight: isActive ? "var(--fw-bold)" : "var(--fw-medium)",
        fontSize: "var(--fs-caption)",
        padding: "7px 16px",
        borderRadius: "var(--radius-sm)",
        cursor: "pointer",
        transition: "background var(--dur-fast), color var(--dur-fast)",
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        whiteSpace: "nowrap"
      }
    }, t.icon, label);
  }), right));
}
Object.assign(__ds_scope, { AppHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/AppHeader.jsx", error: String((e && e.message) || e) }); }

// components/layout/Card.jsx
try { (() => {
/**
 * Card — the base surface used across the app. Optional title row
 * with the signature azul-escuro label + laranja underline.
 */
function Card({
  title,
  action,
  spine,
  padding = "20px",
  children,
  style
}) {
  const spineColors = {
    gestor: "var(--role-gestor)",
    colab: "var(--role-colab)",
    feedback: "var(--role-feedback)",
    accent: "var(--ab-laranja)"
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface-card)",
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-lg)",
      padding,
      boxShadow: "var(--shadow-sm)",
      borderLeft: spine ? `var(--border-accent-width) solid ${spineColors[spine] || spineColors.accent}` : undefined,
      ...style
    }
  }, title && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "12px",
      marginBottom: "16px",
      paddingBottom: "10px",
      borderBottom: "2px solid var(--ab-laranja)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--fs-label)",
      fontWeight: "var(--fw-bold)",
      textTransform: "uppercase",
      letterSpacing: "var(--ls-label)",
      color: "var(--ab-azul-escuro)"
    }
  }, title), action), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/Card.jsx", error: String((e && e.message) || e) }); }

// components/layout/SectionTitle.jsx
try { (() => {
/**
 * SectionTitle — the azul-escuro banner that separates the journey
 * sections (Jornada de Reflexão, PDI Técnico, PDI Comportamental…).
 * Supports a laranja-highlighted word via `highlight`.
 */
function SectionTitle({
  children,
  highlight,
  icon = null,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--ab-azul-escuro)",
      color: "#fff",
      padding: "11px 16px",
      borderRadius: "var(--radius-md)",
      fontSize: "var(--fs-caption)",
      fontWeight: "var(--fw-bold)",
      textTransform: "uppercase",
      letterSpacing: "var(--ls-label)",
      display: "flex",
      alignItems: "center",
      gap: "9px",
      ...style
    }
  }, icon && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      color: "var(--ab-laranja)"
    }
  }, icon), /*#__PURE__*/React.createElement("span", null, children, highlight && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--ab-laranja)"
    }
  }, " ", highlight)));
}
Object.assign(__ds_scope, { SectionTitle });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/SectionTitle.jsx", error: String((e && e.message) || e) }); }

// ui_kits/ciclo/App.jsx
try { (() => {
// App — orquestra sincronização em nuvem, roteamento (colaborador / RH / gestor) e CRUD.
(function () {
  const NS = window.CicloDeDesenvolvimentoDesignSystem_cb4518;
  const {
    Toast
  } = NS;
  const {
    Icon,
    mergeCiclo,
    genId,
    addAuditEntry,
    normalizeCatalogos,
    mergeCatalogos,
    titleCase
  } = window.CicloHelpers;
  const LOGO_BRANCA = window.CICLO_LOGO_BRANCA || "../../assets/logo-branca.png";
  const K_FUNC = "ciclo_funcionarios_v1";
  const K_CICLOS = "ciclo_ciclos_v1";
  const K_GESTORES = "ciclo_gestores_v1";
  const K_AUDIT = "ciclo_audit_v1";
  const K_RHAUTH = "ciclo_rhauth_v1";
  const K_CATALOGOS = "ciclo_catalogos_v1";
  const K_SESSION = "ciclo_sessao_v1";
  function load(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return fallback;
  }
  function save(key, val) {
    try {
      localStorage.setItem(key, JSON.stringify(val));
    } catch (e) {}
  }
  function genAcesso() {
    return String(Math.floor(1000 + Math.random() * 9000));
  }
  const TWEAK_DEFAULTS = {
    statusMode: "marca",
    accent: "#ff931e",
    corners: "suave"
  };
  function applyTweaks(t) {
    const r = document.documentElement.style;
    r.setProperty("--ab-laranja", t.accent);
    r.setProperty("--action-accent", t.accent);
    if (t.corners === "reto") {
      r.setProperty("--radius-sm", "2px");
      r.setProperty("--radius-md", "3px");
      r.setProperty("--radius-lg", "4px");
      r.setProperty("--radius-xl", "5px");
    } else {
      r.setProperty("--radius-sm", "6px");
      r.setProperty("--radius-md", "8px");
      r.setProperty("--radius-lg", "10px");
      r.setProperty("--radius-xl", "14px");
    }
    if (t.statusMode === "semaforo") {
      r.setProperty("--status-completo-fg", "#1f8a5b");
      r.setProperty("--status-completo-bg", "#e7f4ee");
      r.setProperty("--status-completo-dot", "#1f8a5b");
      r.setProperty("--status-parcial-fg", "#b7791f");
      r.setProperty("--status-parcial-bg", "#fef9c3");
      r.setProperty("--status-parcial-dot", "#eab308");
      r.setProperty("--status-pendente-fg", "#b91c1c");
      r.setProperty("--status-pendente-bg", "#fbeaea");
      r.setProperty("--status-pendente-dot", "#dc2626");
    } else {
      r.setProperty("--status-completo-fg", "#0f4b87");
      r.setProperty("--status-completo-bg", "#eef6fc");
      r.setProperty("--status-completo-dot", "#0f7cb9");
      r.setProperty("--status-parcial-fg", "#e07d09");
      r.setProperty("--status-parcial-bg", "#fff6e9");
      r.setProperty("--status-parcial-dot", t.accent);
      r.setProperty("--status-pendente-fg", "#6b7686");
      r.setProperty("--status-pendente-bg", "#eef1f5");
      r.setProperty("--status-pendente-dot", "#9aa5b4");
    }
  }
  function App() {
    const [t, setTweak] = window.useTweaks(TWEAK_DEFAULTS);
    React.useEffect(() => {
      applyTweaks(t);
    }, [t]);
    const [funcionarios, setFuncionarios] = React.useState(() => load(K_FUNC, window.CICLO_DATA.funcionarios || []));
    const [ciclos, setCiclos] = React.useState(() => load(K_CICLOS, window.CICLO_DATA.ciclos || []));
    const [gestores, setGestores] = React.useState(() => load(K_GESTORES, window.CICLO_DATA.gestores || []));
    const [auditLog, setAuditLog] = React.useState(() => load(K_AUDIT, window.CICLO_DATA.auditLog || []));
    const [rhAuth, setRhAuth] = React.useState(() => load(K_RHAUTH, window.CICLO_DATA.rhAuth || null));
    const [catalogos, setCatalogos] = React.useState(() => mergeCatalogos(load(K_CATALOGOS, null), window.CICLO_DATA.catalogos || {
      regionais: [],
      diretorias: [],
      departamentos: [],
      setores: [],
      unidades: []
    }));
    const [session, setSession] = React.useState(() => load(K_SESSION, {
      gestorId: null,
      rhAuthed: false
    }));
    React.useEffect(() => {
      save(K_SESSION, session);
    }, [session]);

    // ---- Sincronização em nuvem (Supabase) ----
    const cloudOn = !!(window.CicloSupabase && window.CicloSupabase.isConfigured());
    const [cloudReady, setCloudReady] = React.useState(!cloudOn);
    const remoteJsonRef = React.useRef(null);
    React.useEffect(() => {
      if (!cloudOn) return;
      let cancelled = false;
      const failsafe = setTimeout(() => {
        if (!cancelled) setCloudReady(true);
      }, 6000);
      window.CicloSupabase.loadState().then(remote => {
        clearTimeout(failsafe);
        if (cancelled || !remote) {
          setCloudReady(true);
          return;
        }
        remoteJsonRef.current = JSON.stringify(remote);
        setFuncionarios(remote.funcionarios);
        setCiclos(remote.ciclos);
        setGestores(remote.gestores);
        setAuditLog(remote.auditLog);
        setRhAuth(remote.rhAuth);
        setCatalogos(mergeCatalogos(remote.catalogos, window.CICLO_DATA.catalogos));
        setCloudReady(true);
      }).catch(err => {
        console.error("Ciclo: falha ao carregar dados da nuvem, seguindo com dados locais.", err);
        clearTimeout(failsafe);
        if (!cancelled) setCloudReady(true);
      });
      const unsubscribe = window.CicloSupabase.subscribe(remote => {
        const json = JSON.stringify(remote);
        if (json === remoteJsonRef.current) return;
        remoteJsonRef.current = json;
        setFuncionarios(remote.funcionarios);
        setCiclos(remote.ciclos);
        setGestores(remote.gestores);
        setAuditLog(remote.auditLog);
        setRhAuth(remote.rhAuth);
        setCatalogos(mergeCatalogos(remote.catalogos, window.CICLO_DATA.catalogos));
      });
      return () => {
        cancelled = true;
        clearTimeout(failsafe);
        unsubscribe();
      };
    }, []);
    React.useEffect(() => {
      save(K_FUNC, funcionarios);
    }, [funcionarios]);
    React.useEffect(() => {
      save(K_CICLOS, ciclos);
    }, [ciclos]);
    React.useEffect(() => {
      save(K_GESTORES, gestores);
    }, [gestores]);
    React.useEffect(() => {
      save(K_AUDIT, auditLog);
    }, [auditLog]);
    React.useEffect(() => {
      save(K_RHAUTH, rhAuth);
    }, [rhAuth]);
    React.useEffect(() => {
      save(K_CATALOGOS, catalogos);
    }, [catalogos]);
    React.useEffect(() => {
      if (!cloudOn || !cloudReady) return;
      const state = {
        funcionarios,
        ciclos,
        gestores,
        auditLog,
        rhAuth,
        catalogos
      };
      const json = JSON.stringify(state);
      if (json === remoteJsonRef.current) return;
      remoteJsonRef.current = json;
      const tmr = setTimeout(() => {
        window.CicloSupabase.saveState(state).then(ok => {
          if (!ok) toast("Falha ao salvar na nuvem — verifique sua conexão. Os dados ficaram salvos só neste navegador.", "danger");
        });
      }, 400);
      return () => clearTimeout(tmr);
    }, [funcionarios, ciclos, gestores, auditLog, rhAuth, catalogos, cloudReady]);

    // Ciclos enriquecidos com dados do funcionário + gestor (usado pelas telas de acompanhamento).
    const ciclosView = React.useMemo(() => ciclos.map(cy => mergeCiclo(cy, funcionarios, gestores)), [ciclos, funcionarios, gestores]);
    const findView = id => ciclosView.find(x => x.id === id);

    // Link público do colaborador (#colab=<cicloId>).
    const hashId = (location.hash.match(/colab=([^&]+)/) || [])[1];
    const [publicColabId] = React.useState(hashId || null);
    const [colabUnlocked, setColabUnlocked] = React.useState(false);
    const [toastState, setToastState] = React.useState({
      open: false,
      message: "",
      tone: "default"
    });
    const toastTimer = React.useRef(null);
    const toast = React.useCallback((message, tone = "default") => {
      setToastState({
        open: true,
        message,
        tone
      });
      clearTimeout(toastTimer.current);
      toastTimer.current = setTimeout(() => setToastState(s => ({
        ...s,
        open: false
      })), 2800);
    }, []);
    const toastNode = /*#__PURE__*/React.createElement(Toast, {
      open: toastState.open,
      message: toastState.message,
      tone: toastState.tone
    });
    const audit = (ator, tipo, acao, alvo, detalhe) => addAuditEntry(setAuditLog, ator, tipo, acao, alvo, detalhe);

    // ---- Catálogos (listas suspensas Regional/Diretoria/Departamento/Setor/Unidade) ----
    const addCatalogoItem = (campo, valorDigitado) => {
      const valor = titleCase(valorDigitado);
      setCatalogos(cs => {
        const lista = cs[campo] || [];
        if (lista.some(x => x.toLowerCase() === valor.toLowerCase())) return cs;
        return {
          ...cs,
          [campo]: [...lista, valor].sort((a, b) => a.localeCompare(b, "pt-BR"))
        };
      });
      return valor;
    };

    // ---- Gestores (RH) ----
    const addGestor = dados => {
      const novo = {
        id: genId("g"),
        ...dados,
        nome: titleCase(dados.nome),
        cargo: titleCase(dados.cargo)
      };
      setGestores(gs => [novo, ...gs]);
      audit("RH", "gestor", "criar", novo.nome, `usuário ${novo.usuario}`);
    };
    const updateGestor = (id, patch) => {
      const patchNorm = {
        ...patch
      };
      if (patchNorm.nome !== undefined) patchNorm.nome = titleCase(patchNorm.nome);
      if (patchNorm.cargo !== undefined) patchNorm.cargo = titleCase(patchNorm.cargo);
      setGestores(gs => gs.map(x => x.id === id ? {
        ...x,
        ...patchNorm
      } : x));
      const g = gestores.find(x => x.id === id);
      audit(g ? g.nome : id, "gestor", "editar", g ? g.nome : id);
    };
    const deleteGestor = id => {
      const g = gestores.find(x => x.id === id);
      const funcs = funcionarios.filter(f => f.gestorId === id).map(f => f.id);
      setGestores(gs => gs.filter(x => x.id !== id));
      setFuncionarios(fs => fs.filter(x => x.gestorId !== id));
      setCiclos(cs => cs.filter(c => !funcs.includes(c.funcionarioId)));
      audit("RH", "gestor", "excluir", g ? g.nome : id);
    };

    // ---- Funcionários ----
    const addFuncionario = (dados, ator) => {
      const novo = {
        id: genId(),
        demitido: false,
        demissao: "",
        ...dados,
        nome: titleCase(dados.nome),
        cargo: titleCase(dados.cargo),
        departamento: titleCase(dados.departamento)
      };
      setFuncionarios(fs => [novo, ...fs]);
      audit(ator || "RH", "funcionario", "criar", novo.nome);
      return novo;
    };
    const updateFuncionario = (id, patch) => {
      setFuncionarios(fs => fs.map(x => x.id === id ? {
        ...x,
        ...patch
      } : x));
    };
    const deleteFuncionario = (id, ator) => {
      const f = funcionarios.find(x => x.id === id);
      setFuncionarios(fs => fs.filter(x => x.id !== id));
      setCiclos(cs => cs.filter(c => c.funcionarioId !== id));
      audit(ator || "RH", "funcionario", "excluir", f ? f.nome : id);
      toast("Colaborador e ciclos vinculados excluídos.", "default");
    };

    // ---- Ciclos ----
    const addCiclo = dados => {
      const novo = {
        id: genId(),
        acesso: genAcesso(),
        encerrado: false,
        gestorForm: null,
        colabForm: null,
        funcionarioId: dados.funcionarioId,
        cicloNum: dados.cicloNum || "1º Ciclo",
        data: dados.data,
        alvo: dados.alvo
      };
      setCiclos(cs => [novo, ...cs]);
      const f = funcionarios.find(x => x.id === dados.funcionarioId);
      toast(`Ciclo de ${f ? f.nome : "colaborador"} criado! Senha de acesso: ${novo.acesso}.`, "success");
    };
    const deleteCiclo = id => {
      setCiclos(cs => cs.filter(c => c.id !== id));
      toast("Ciclo excluído.", "default");
    };
    const finalize = id => {
      setCiclos(cs => cs.map(c => c.id === id ? {
        ...c,
        encerrado: true
      } : c));
      toast("Ciclo encerrado. PDF disponível e link liberado para consulta.", "success");
    };
    const updateAction = (cicloId, tipo, index, patch) => {
      const key = tipo === "tec" ? "rowsTec" : "rowsComp";
      setCiclos(cs => cs.map(c => {
        if (c.id !== cicloId || !c.gestorForm) return c;
        const rows = (c.gestorForm[key] || []).map((r, i) => i === index ? {
          ...r,
          ...patch
        } : r);
        return {
          ...c,
          gestorForm: {
            ...c.gestorForm,
            [key]: rows
          }
        };
      }));
    };
    const saveGestorForm = (cicloId, gestorForm) => {
      setCiclos(cs => cs.map(c => c.id === cicloId ? {
        ...c,
        gestorForm
      } : c));
      toast("Percepção do gestor salva!", "success");
    };
    const submitColabForm = (cicloId, colabForm) => {
      setCiclos(cs => cs.map(c => c.id === cicloId ? {
        ...c,
        colabForm
      } : c));
      toast("Suas respostas foram enviadas com sucesso!", "success");
    };
    function renderTweaks() {
      const {
        TweaksPanel,
        TweakSection,
        TweakRadio,
        TweakColor
      } = window;
      return /*#__PURE__*/React.createElement(TweaksPanel, null, /*#__PURE__*/React.createElement(TweakSection, {
        label: "Apar\xEAncia"
      }), /*#__PURE__*/React.createElement(TweakRadio, {
        label: "Cores de status",
        value: t.statusMode,
        options: [{
          value: "marca",
          label: "Marca"
        }, {
          value: "semaforo",
          label: "Semáforo"
        }],
        onChange: v => setTweak("statusMode", v)
      }), /*#__PURE__*/React.createElement(TweakColor, {
        label: "Cor de destaque",
        value: t.accent,
        options: ["#ff931e", "#e8630a", "#0f7cb9"],
        onChange: v => setTweak("accent", v)
      }), /*#__PURE__*/React.createElement(TweakRadio, {
        label: "Cantos",
        value: t.corners,
        options: [{
          value: "suave",
          label: "Arredondado"
        }, {
          value: "reto",
          label: "Reto"
        }],
        onChange: v => setTweak("corners", v)
      }));
    }
    if (cloudOn && !cloudReady) {
      return /*#__PURE__*/React.createElement("div", {
        style: {
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          color: "var(--text-muted)",
          fontSize: 14
        }
      }, "Carregando dados da nuvem\u2026");
    }

    // 1) Link público do colaborador — protegido por senha de acesso.
    if (publicColabId) {
      const c = findView(publicColabId);
      if (!c) {
        return /*#__PURE__*/React.createElement("div", {
          style: {
            minHeight: "100vh",
            display: "grid",
            placeItems: "center",
            color: "var(--text-muted)"
          }
        }, "Link inv\xE1lido ou expirado.");
      }
      if (!colabUnlocked) {
        return /*#__PURE__*/React.createElement(window.ColabGate, {
          colab: c,
          logoSrc: LOGO_BRANCA,
          onUnlock: () => setColabUnlocked(true)
        });
      }
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(window.FormColaboradorScreen, {
        colab: c,
        logoSrc: LOGO_BRANCA,
        readOnly: c.encerrado,
        onToast: toast,
        onBack: null,
        onUpdateAction: updateAction,
        onSubmit: form => submitColabForm(c.id, form)
      }), toastNode);
    }

    // 2) Painel do RH — autenticado a partir do mesmo login (usuário da Pessoas & Cultura).
    if (session.rhAuthed) {
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(window.RhAdminApp, {
        logoSrc: LOGO_BRANCA,
        gestores: gestores,
        funcionarios: funcionarios,
        ciclosView: ciclosView,
        auditLog: auditLog,
        catalogos: catalogos,
        onAddCatalogoItem: addCatalogoItem,
        onAddGestor: addGestor,
        onUpdateGestor: updateGestor,
        onDeleteGestor: deleteGestor,
        onAddFuncionario: dados => addFuncionario(dados, "RH"),
        onDeleteFuncionario: id => deleteFuncionario(id, "RH"),
        onLogout: () => setSession(s => ({
          ...s,
          rhAuthed: false
        })),
        rhAuth: rhAuth,
        onUpdateRhAuth: setRhAuth
      }), toastNode);
    }

    // 3) Painel do gestor (login por gestor, cadastrado pelo RH).
    const gestorLogado = gestores.find(g => g.id === session.gestorId) || null;
    if (!gestorLogado) {
      return /*#__PURE__*/React.createElement(window.LoginScreen, {
        logoSrc: LOGO_BRANCA,
        gestores: gestores,
        onUpdateGestor: updateGestor,
        onAuthenticatedGestor: gid => setSession(s => ({
          ...s,
          gestorId: gid
        })),
        rhAuth: rhAuth,
        onUpdateRhAuth: setRhAuth,
        onAuthenticatedRh: () => setSession(s => ({
          ...s,
          rhAuthed: true
        }))
      });
    }
    const meusFuncionarios = funcionarios.filter(f => f.gestorId === gestorLogado.id);
    const meusIds = meusFuncionarios.map(f => f.id);
    const meusCiclosView = ciclosView.filter(c => meusIds.includes(c.funcionarioId));
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(window.GestorPanel, {
      gestor: gestorLogado,
      logoSrc: LOGO_BRANCA,
      funcionarios: meusFuncionarios,
      ciclosView: meusCiclosView,
      onAddFuncionario: dados => addFuncionario({
        ...dados,
        gestorId: gestorLogado.id
      }, gestorLogado.nome),
      onUpdateFuncionario: updateFuncionario,
      onDeleteFuncionario: id => deleteFuncionario(id, gestorLogado.nome),
      onAddCiclo: addCiclo,
      onDeleteCiclo: deleteCiclo,
      onUpdateAction: updateAction,
      onSaveGestorForm: saveGestorForm,
      onSubmitColabForm: submitColabForm,
      onFinalize: finalize,
      onUpdateGestorSelf: updateGestor,
      onLogout: () => setSession(s => ({
        ...s,
        gestorId: null
      })),
      renderTweaks: renderTweaks
    }), toastNode);
  }
  window.CicloApp = App;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/ciclo/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/ciclo/CicloCadastroScreen.jsx
try { (() => {
// Cadastro de Ciclo — vincula um ciclo de desenvolvimento a um funcionário.
(function () {
  const NS = window.CicloDeDesenvolvimentoDesignSystem_cb4518;
  const {
    Card,
    FormGrid,
    Field,
    TextField,
    Select,
    Button,
    LinkBox,
    StatusBadge,
    Avatar,
    Banner
  } = NS;
  const {
    Icon,
    fmtDate,
    addDays,
    prazoFinal,
    statusFromForms,
    statusLabel,
    tempoEmpresa
  } = window.CicloHelpers;
  function colabLink(id) {
    const base = location.href.split("#")[0];
    return `${base}#colab=${id}`;
  }

  // Mensagem padrão + link do WhatsApp para o gestor enviar ao colaborador.
  function waMessage(c) {
    const primeiro = (c.nome || "").split(" ")[0];
    return `Olá ${primeiro}! Chegou o momento para falarmos sobre você, sobre a sua evolução e como estaremos juntas a construir um caminho de êxito e vitórias.\n\n` + `*Instruções:*\n` + `Acesse seu formulário: ${colabLink(c.id)}\n` + `Senha de acesso: ${c.acesso}\n` + `Data de aplicação do ciclo: ${fmtDate(c.data)}\n\n` + `Por favor, preencha o formulário de autopercepção *antes* da nossa conversa, respondendo com calma cada campo, assim aproveitaremos melhor o nosso momento.\n\n` + `Qualquer dúvida, estou à disposição!`;
  }
  function waLink(c) {
    const digits = String(c.whatsapp || "").replace(/\D/g, "");
    const num = digits ? digits.startsWith("55") ? digits : "55" + digits : "";
    return `https://wa.me/${num}?text=${encodeURIComponent(waMessage(c))}`;
  }
  function CicloCadastroScreen({
    funcionarios,
    ciclos,
    onAddCiclo,
    onDeleteCiclo,
    onOpen,
    onOpenColabForm,
    onPrint,
    onToast
  }) {
    const ativos = funcionarios.filter(f => !f.demitido).slice().sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));
    const empty = {
      funcionarioId: "",
      cicloNum: "1º Ciclo",
      data: "",
      alvo: ""
    };
    const [f, setF] = React.useState(empty);
    const set = (k, v) => setF(s => ({
      ...s,
      [k]: v
    }));
    const sel = funcionarios.find(x => x.id === f.funcionarioId);
    const prazo = f.data ? fmtDate(addDays(f.data, 180)) : "—";
    const cadastrar = () => {
      if (!f.funcionarioId) {
        onToast("Selecione um colaborador.", "danger");
        return;
      }
      if (!f.data) {
        onToast("Informe a data de aplicação.", "danger");
        return;
      }
      if (!f.alvo.trim()) {
        onToast("Cadastre o alvo a ser atingido.", "danger");
        return;
      }
      onAddCiclo({
        ...f
      });
      setF(empty);
    };
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "16px"
      }
    }, /*#__PURE__*/React.createElement(Card, {
      title: "Cadastrar Novo Ciclo",
      action: /*#__PURE__*/React.createElement(Icon, {
        name: "calendar-plus",
        size: 18,
        color: "var(--ab-azul-claro)"
      })
    }, funcionarios.length === 0 ? /*#__PURE__*/React.createElement(Banner, {
      tone: "accent",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "alert-circle",
        size: 16
      })
    }, "Nenhum colaborador cadastrado. Cadastre seus colaboradores na aba ", /*#__PURE__*/React.createElement("strong", null, "Colaboradores"), " antes de abrir um ciclo.") : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Field, {
      label: "Colaborador",
      required: true
    }, /*#__PURE__*/React.createElement(Select, {
      value: f.funcionarioId,
      onChange: e => set("funcionarioId", e.target.value)
    }, /*#__PURE__*/React.createElement("option", {
      value: ""
    }, "Selecione um colaborador..."), ativos.map(x => /*#__PURE__*/React.createElement("option", {
      key: x.id,
      value: x.id
    }, x.nome, x.cargo ? ` — ${x.cargo}` : "", x.area ? ` (${x.area})` : "")))), sel && /*#__PURE__*/React.createElement(Banner, {
      tone: "info",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "user",
        size: 16
      }),
      style: {
        marginTop: 12
      }
    }, /*#__PURE__*/React.createElement("strong", null, sel.nome), sel.cargo ? ` · ${sel.cargo}` : "", sel.departamento ? ` · ${sel.departamento}` : "", sel.area ? ` · ${sel.area}` : "", " \xB7 Admiss\xE3o ", fmtDate(sel.admissao), " \xB7 ", /*#__PURE__*/React.createElement("strong", null, tempoEmpresa(sel.admissao)), " de empresa"), /*#__PURE__*/React.createElement(FormGrid, {
      columns: 3,
      style: {
        marginTop: 14
      }
    }, /*#__PURE__*/React.createElement(Field, {
      label: "Ciclo"
    }, /*#__PURE__*/React.createElement(Select, {
      value: f.cicloNum,
      onChange: e => set("cicloNum", e.target.value)
    }, /*#__PURE__*/React.createElement("option", {
      value: "1\xBA Ciclo"
    }, "1\xBA Ciclo"), /*#__PURE__*/React.createElement("option", {
      value: "2\xBA Ciclo"
    }, "2\xBA Ciclo"))), /*#__PURE__*/React.createElement(Field, {
      label: "Data de Aplica\xE7\xE3o",
      required: true
    }, /*#__PURE__*/React.createElement(TextField, {
      type: "date",
      value: f.data,
      onChange: e => set("data", e.target.value)
    })), /*#__PURE__*/React.createElement(Field, {
      label: "Pr\xF3ximo ciclo previsto: 180 dias",
      hint: "Calculado automaticamente."
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        height: 38,
        padding: "0 12px",
        background: "var(--surface-accent-soft)",
        border: "1px solid var(--ab-laranja)",
        borderRadius: "var(--radius-sm)",
        color: "var(--ab-laranja-600)",
        fontWeight: 700,
        fontSize: 13
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "calendar-clock",
      size: 15
    }), " ", prazo)), /*#__PURE__*/React.createElement(Field, {
      label: "Alvo a ser Atingido",
      full: true,
      required: true,
      hint: "Objetivo norteador deste ciclo de 180 dias."
    }, /*#__PURE__*/React.createElement(TextField, {
      placeholder: "Ex: Aumentar a convers\xE3o de vendas em 15%.",
      value: f.alvo,
      onChange: e => set("alvo", e.target.value)
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "flex-end",
        marginTop: 18
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "accent",
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        name: "link",
        size: 15
      }),
      onClick: cadastrar
    }, "Cadastrar Ciclo e Gerar Link")))), /*#__PURE__*/React.createElement(Card, {
      title: "Ciclos Cadastrados"
    }, /*#__PURE__*/React.createElement(Banner, {
      tone: "info",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "info",
        size: 16
      }),
      style: {
        marginBottom: 14
      }
    }, "Cada ciclo tem um ", /*#__PURE__*/React.createElement("strong", null, "link \xFAnico"), " e uma ", /*#__PURE__*/React.createElement("strong", null, "senha de acesso"), " \u2014 o colaborador acessa sem login, apenas com os dois. Envie-os juntos. O link continua v\xE1lido para consulta mesmo ap\xF3s o ciclo encerrado."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 12
      }
    }, ciclos.length === 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "center",
        padding: 30,
        color: "var(--text-muted)",
        fontSize: 13
      }
    }, "Nenhum ciclo cadastrado ainda."), ciclos.map(c => /*#__PURE__*/React.createElement("div", {
      key: c.id,
      style: {
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-lg)",
        padding: "14px 16px",
        display: "flex",
        gap: 14,
        alignItems: "flex-start"
      }
    }, /*#__PURE__*/React.createElement(Avatar, {
      name: c.nome,
      size: 40
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        flexWrap: "wrap"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 700,
        fontSize: 14
      }
    }, c.nome), /*#__PURE__*/React.createElement(StatusBadge, {
      status: statusFromForms(c),
      label: statusLabel(c)
    }), c.encerrado && /*#__PURE__*/React.createElement(StatusBadge, {
      status: "completo",
      label: "Encerrado"
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: "var(--text-muted)",
        margin: "3px 0 10px"
      }
    }, c.cargo ? `${c.cargo} · ` : "", c.area ? `${c.area} · ` : "", c.cicloNum, " \xB7 aplica\xE7\xE3o ", fmtDate(c.data), " \xB7 prazo ", fmtDate(prazoFinal(c))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 8,
        alignItems: "stretch",
        flexWrap: "wrap"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 240
      }
    }, /*#__PURE__*/React.createElement(LinkBox, {
      value: colabLink(c.id)
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 7,
        padding: "0 12px",
        background: "var(--surface-brand-soft)",
        border: "1px solid var(--role-feedback)",
        borderRadius: "var(--radius-md)",
        color: "var(--ab-azul-escuro)",
        fontSize: 12,
        fontWeight: 700,
        whiteSpace: "nowrap"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "key-round",
      size: 14
    }), " Senha: ", /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-mono)"
      }
    }, c.acesso)), /*#__PURE__*/React.createElement(Button, {
      size: "md",
      variant: "secondary",
      onClick: () => onOpenColabForm(c),
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        name: "external-link",
        size: 14
      })
    }, "Abrir"), /*#__PURE__*/React.createElement(Button, {
      size: "md",
      variant: "accent",
      onClick: () => window.open(waLink(c), "_blank", "noopener"),
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        name: "message-circle",
        size: 14
      })
    }, "Enviar no WhatsApp"))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 6
      }
    }, /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "ghost",
      onClick: () => onOpen(c),
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        name: "eye",
        size: 14
      })
    }, "Detalhes"), /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "ghost",
      onClick: () => onPrint(c),
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        name: "file-down",
        size: 14
      })
    }, "PDF"), /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "danger",
      onClick: () => {
        if (window.confirm(`Excluir o ciclo de ${c.nome}?`)) onDeleteCiclo(c.id);
      },
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        name: "trash-2",
        size: 14
      })
    }, "Excluir")))))));
  }
  window.CicloCadastroScreen = CicloCadastroScreen;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/ciclo/CicloCadastroScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/ciclo/CicloPrintView.jsx
try { (() => {
// Documento imprimível do ciclo — formato do formulário (Gerar PDF).
(function () {
  const {
    fmtDate,
    prazoFinal
  } = window.CicloHelpers;
  const LOGO = window.CICLO_LOGO_COLORIDA || "../../assets/logo-colorida.png";
  const AZUL = "#0f4b87";
  const LARANJA = "#ff931e";
  function Section({
    children
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        background: AZUL,
        color: "#fff",
        padding: "8px 14px",
        borderRadius: 6,
        fontSize: 12,
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: ".06em",
        margin: "20px 0 12px"
      }
    }, children);
  }
  function Dual({
    label,
    gestor,
    colab
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: 14
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: ".04em",
        color: AZUL,
        marginBottom: 6
      }
    }, label), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 12
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        borderLeft: "3px solid " + AZUL,
        paddingLeft: 10
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        color: "#666",
        textTransform: "uppercase",
        marginBottom: 3
      }
    }, "Percep\xE7\xE3o do L\xEDder"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12.5,
        color: "#1a2230",
        lineHeight: 1.5,
        whiteSpace: "pre-wrap"
      }
    }, gestor || "—")), /*#__PURE__*/React.createElement("div", {
      style: {
        borderLeft: "3px solid " + LARANJA,
        paddingLeft: 10
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        color: "#666",
        textTransform: "uppercase",
        marginBottom: 3
      }
    }, "Percep\xE7\xE3o do Liderado"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12.5,
        color: "#1a2230",
        lineHeight: 1.5,
        whiteSpace: "pre-wrap"
      }
    }, colab || "—"))));
  }
  function Table({
    rows
  }) {
    if (!rows || !rows.length) return /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: "#888"
      }
    }, "Nenhuma a\xE7\xE3o registrada.");
    const th = {
      background: AZUL,
      color: "#fff",
      padding: "6px 10px",
      textAlign: "left",
      fontSize: 10.5,
      textTransform: "uppercase",
      letterSpacing: ".03em"
    };
    const td = {
      padding: "7px 10px",
      borderBottom: "1px solid #e2e7ee",
      fontSize: 12,
      verticalAlign: "top"
    };
    return /*#__PURE__*/React.createElement("table", {
      style: {
        width: "100%",
        borderCollapse: "collapse",
        marginTop: 4
      }
    }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
      style: th
    }, "A\xE7\xE3o"), /*#__PURE__*/React.createElement("th", {
      style: th
    }, "Desdobramento"), /*#__PURE__*/React.createElement("th", {
      style: th
    }, "Evid\xEAncia"), /*#__PURE__*/React.createElement("th", {
      style: {
        ...th,
        background: LARANJA
      }
    }, "Data Acordada"))), /*#__PURE__*/React.createElement("tbody", null, rows.map((r, i) => /*#__PURE__*/React.createElement("tr", {
      key: i
    }, /*#__PURE__*/React.createElement("td", {
      style: td
    }, r.acao || "—"), /*#__PURE__*/React.createElement("td", {
      style: td
    }, r.desdobramento || "—"), /*#__PURE__*/React.createElement("td", {
      style: td
    }, r.evidencia || "—"), /*#__PURE__*/React.createElement("td", {
      style: {
        ...td,
        fontWeight: 700,
        color: "#e07d09"
      }
    }, fmtDate(r.data))))));
  }
  function Info({
    label,
    value
  }) {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 10,
        color: "#666",
        textTransform: "uppercase",
        letterSpacing: ".04em"
      }
    }, label), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        fontWeight: 600,
        color: "#1a2230"
      }
    }, value || "—"));
  }
  function CicloPrintView({
    colab,
    onClose
  }) {
    if (!colab) return null;
    const g = colab.gestorForm || {};
    const co = colab.colabForm || {};
    return /*#__PURE__*/React.createElement("div", {
      id: "ciclo-print-overlay",
      style: {
        position: "fixed",
        inset: 0,
        background: "#525659",
        zIndex: 4000,
        overflowY: "auto",
        padding: "24px 0"
      }
    }, /*#__PURE__*/React.createElement("style", null, `@media print {
          body * { visibility: hidden !important; }
          #ciclo-print, #ciclo-print * { visibility: visible !important; }
          #ciclo-print { position: absolute !important; inset: 0 !important; margin: 0 !important; box-shadow: none !important; width: auto !important; }
          #ciclo-print-overlay { background: #fff !important; padding: 0 !important; }
          .no-print { display: none !important; }
          @page { size: A4; margin: 14mm; }
        }`), /*#__PURE__*/React.createElement("div", {
      className: "no-print",
      style: {
        position: "sticky",
        top: 0,
        display: "flex",
        justifyContent: "center",
        gap: 12,
        marginBottom: 20,
        zIndex: 1
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => window.print(),
      style: {
        background: LARANJA,
        color: "#fff",
        border: "none",
        borderRadius: 8,
        padding: "10px 20px",
        fontWeight: 700,
        fontSize: 13,
        cursor: "pointer"
      }
    }, "Imprimir / Salvar PDF"), /*#__PURE__*/React.createElement("button", {
      onClick: onClose,
      style: {
        background: "#fff",
        color: AZUL,
        border: "none",
        borderRadius: 8,
        padding: "10px 20px",
        fontWeight: 700,
        fontSize: 13,
        cursor: "pointer"
      }
    }, "Fechar")), /*#__PURE__*/React.createElement("div", {
      id: "ciclo-print",
      style: {
        background: "#fff",
        width: 820,
        maxWidth: "94vw",
        margin: "0 auto",
        padding: 40,
        fontFamily: "var(--font-sans)",
        boxShadow: "0 4px 24px rgba(0,0,0,.3)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "3px solid " + LARANJA,
        paddingBottom: 14,
        marginBottom: 18
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: LOGO,
      alt: "Grupo \xC1guia Branca \u2014 Divis\xE3o Com\xE9rcio",
      style: {
        height: 40
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "right"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 18,
        fontWeight: 800,
        color: AZUL
      }
    }, "Ciclo de Desenvolvimento e Evolu\xE7\xE3o"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: "#666"
      }
    }, colab.cicloNum, colab.encerrado ? " · Encerrado" : ""))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: 12,
        marginBottom: 6
      }
    }, /*#__PURE__*/React.createElement(Info, {
      label: "Nome do Colaborador",
      value: colab.nome
    }), /*#__PURE__*/React.createElement(Info, {
      label: "Cargo",
      value: colab.cargo
    }), /*#__PURE__*/React.createElement(Info, {
      label: "Departamento",
      value: colab.departamento
    }), /*#__PURE__*/React.createElement(Info, {
      label: "\xC1rea",
      value: colab.revenda
    }), /*#__PURE__*/React.createElement(Info, {
      label: "Data de Aplica\xE7\xE3o",
      value: fmtDate(colab.data)
    }), /*#__PURE__*/React.createElement(Info, {
      label: "Pr\xF3ximo ciclo previsto: 180 dias",
      value: fmtDate(prazoFinal(colab))
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        background: "#fff6e9",
        border: "1px solid " + LARANJA,
        borderRadius: 8,
        padding: "10px 14px",
        margin: "12px 0",
        fontSize: 12.5
      }
    }, /*#__PURE__*/React.createElement("strong", {
      style: {
        color: "#e07d09"
      }
    }, "Alvo a ser Atingido:"), " ", colab.alvo || "—"), /*#__PURE__*/React.createElement(Section, null, "Jornada de Reflex\xE3o e Evolu\xE7\xE3o"), /*#__PURE__*/React.createElement(Dual, {
      label: "Retrospectiva",
      gestor: g.retro,
      colab: co.retro
    }), /*#__PURE__*/React.createElement(Dual, {
      label: "Foco no Futuro",
      gestor: g.futuro,
      colab: co.futuro
    }), /*#__PURE__*/React.createElement(Section, null, "Plano de Desenvolvimento Individual \u2014 T\xE9cnico"), /*#__PURE__*/React.createElement(Dual, {
      label: "Percep\xE7\xE3o \u2014 Pontos fortes e a desenvolver",
      gestor: g.pdiTec,
      colab: co.pdiTec
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        fontWeight: 700,
        textTransform: "uppercase",
        color: AZUL,
        margin: "8px 0 2px"
      }
    }, "Melhoria Acordada"), /*#__PURE__*/React.createElement(Table, {
      rows: g.rowsTec
    }), /*#__PURE__*/React.createElement(Section, null, "Plano de Desenvolvimento Individual \u2014 Comportamental"), /*#__PURE__*/React.createElement(Dual, {
      label: "Percep\xE7\xE3o \u2014 Pontos fortes e a desenvolver",
      gestor: g.pdiComp,
      colab: co.pdiComp
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        fontWeight: 700,
        textTransform: "uppercase",
        color: AZUL,
        margin: "8px 0 2px"
      }
    }, "Melhoria Acordada"), /*#__PURE__*/React.createElement(Table, {
      rows: g.rowsComp
    }), /*#__PURE__*/React.createElement(Section, null, "Conex\xE3o L\xEDder"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12.5,
        color: "#1a2230",
        lineHeight: 1.5,
        whiteSpace: "pre-wrap"
      }
    }, g.conexao || "—"), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 28,
        paddingTop: 14,
        borderTop: "1px solid #e2e7ee",
        display: "flex",
        justifyContent: "space-between",
        fontSize: 11,
        color: "#888"
      }
    }, /*#__PURE__*/React.createElement("span", null, "Grupo \xC1guia Branca \xB7 Divis\xE3o Com\xE9rcio"), /*#__PURE__*/React.createElement("span", null, "Documento gerado pelo sistema do Ciclo de Desenvolvimento"))));
  }
  window.CicloPrintView = CicloPrintView;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/ciclo/CicloPrintView.jsx", error: String((e && e.message) || e) }); }

// ui_kits/ciclo/ColaboradoresScreen.jsx
try { (() => {
// Colaboradores — cadastro do quadro de funcionários do gestor.
(function () {
  const NS = window.CicloDeDesenvolvimentoDesignSystem_cb4518;
  const {
    Card,
    FormGrid,
    Field,
    TextField,
    Button,
    Avatar,
    Banner,
    StatusBadge
  } = NS;
  const {
    Icon,
    fmtDate,
    tempoEmpresa
  } = window.CicloHelpers;
  function FuncionariosScreen({
    funcionarios,
    ciclos,
    onAdd,
    onUpdate,
    onDelete,
    onToast
  }) {
    const [q, setQ] = React.useState("");
    const [editId, setEditId] = React.useState(null);
    const [editForm, setEditForm] = React.useState({});
    const setE = (k, v) => setEditForm(s => ({
      ...s,
      [k]: v
    }));
    const startEdit = c => {
      setEditId(c.id);
      setEditForm({
        ...c
      });
    };
    const cancelEdit = () => setEditId(null);
    const saveEdit = () => {
      if (!String(editForm.nome || "").trim()) {
        onToast("Informe o nome completo do colaborador.", "danger");
        return;
      }
      const {
        id,
        ...patch
      } = editForm;
      onUpdate(editId, patch);
      onToast("Cadastro atualizado.", "success");
      setEditId(null);
    };
    const empty = {
      nome: "",
      admissao: "",
      departamento: "",
      cargo: "",
      whatsapp: ""
    };
    const [f, setF] = React.useState(empty);
    const set = (k, v) => setF(s => ({
      ...s,
      [k]: v
    }));
    const cadastrar = () => {
      if (!f.nome.trim()) {
        onToast("Informe o nome completo do colaborador.", "danger");
        return;
      }
      onAdd({
        ...f
      });
      setF(empty);
    };
    const list = funcionarios.filter(x => !q || x.nome.toLowerCase().includes(q.toLowerCase()) || (x.cargo || "").toLowerCase().includes(q.toLowerCase()) || (x.departamento || "").toLowerCase().includes(q.toLowerCase())).slice().sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));
    const ciclosDe = fid => (ciclos || []).filter(c => c.funcionarioId === fid).length;
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "16px"
      }
    }, /*#__PURE__*/React.createElement(Card, {
      title: "Cadastrar Colaborador",
      action: /*#__PURE__*/React.createElement(Icon, {
        name: "user-plus",
        size: 18,
        color: "var(--ab-azul-claro)"
      })
    }, /*#__PURE__*/React.createElement(FormGrid, {
      columns: 3
    }, /*#__PURE__*/React.createElement(Field, {
      label: "Nome Completo",
      required: true
    }, /*#__PURE__*/React.createElement(TextField, {
      placeholder: "Nome completo do colaborador",
      value: f.nome,
      onChange: e => set("nome", e.target.value)
    })), /*#__PURE__*/React.createElement(Field, {
      label: "Data de Admiss\xE3o"
    }, /*#__PURE__*/React.createElement(TextField, {
      type: "date",
      value: f.admissao,
      onChange: e => set("admissao", e.target.value)
    })), /*#__PURE__*/React.createElement(Field, {
      label: "Cargo"
    }, /*#__PURE__*/React.createElement(TextField, {
      placeholder: "Ex: Consultor de Vendas",
      value: f.cargo,
      onChange: e => set("cargo", e.target.value)
    })), /*#__PURE__*/React.createElement(Field, {
      label: "Departamento"
    }, /*#__PURE__*/React.createElement(TextField, {
      placeholder: "Ex: Pessoas e Cultura",
      value: f.departamento,
      onChange: e => set("departamento", e.target.value)
    })), /*#__PURE__*/React.createElement(Field, {
      label: "WhatsApp",
      hint: "Com DDD. Ex: (27) 99999-9999"
    }, /*#__PURE__*/React.createElement(TextField, {
      placeholder: "(27) 99999-9999",
      value: f.whatsapp,
      onChange: e => set("whatsapp", e.target.value)
    })), /*#__PURE__*/React.createElement(Field, {
      label: "Tempo de Empresa",
      hint: "Calculado a partir da admiss\xE3o."
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        height: 38,
        padding: "0 12px",
        background: "var(--surface-brand-soft)",
        border: "1px solid var(--role-feedback)",
        borderRadius: "var(--radius-sm)",
        color: "var(--ab-azul-escuro)",
        fontWeight: 700,
        fontSize: 13
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "clock",
      size: 15
    }), " ", f.admissao ? tempoEmpresa(f.admissao) : "—"))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "flex-end",
        marginTop: 18
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "accent",
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        name: "user-check",
        size: 15
      }),
      onClick: cadastrar
    }, "Cadastrar Colaborador"))), /*#__PURE__*/React.createElement(Card, {
      title: "Quadro de Colaboradores"
    }, /*#__PURE__*/React.createElement(Banner, {
      tone: "info",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "info",
        size: 16
      }),
      style: {
        marginBottom: 14
      }
    }, "Cadastre aqui todos os seus colaboradores. Depois, na aba ", /*#__PURE__*/React.createElement("strong", null, "Cadastro de Ciclo"), ", voc\xEA seleciona um colaborador e abre um ciclo de desenvolvimento para ele."), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative",
        marginBottom: 16
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        position: "absolute",
        left: 10,
        top: "50%",
        transform: "translateY(-50%)",
        color: "var(--text-muted)",
        pointerEvents: "none"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "search",
      size: 15
    })), /*#__PURE__*/React.createElement(TextField, {
      placeholder: "Buscar por nome, cargo ou departamento...",
      value: q,
      onChange: e => setQ(e.target.value),
      style: {
        paddingLeft: 32
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 12
      }
    }, list.length === 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "center",
        padding: 30,
        color: "var(--text-muted)",
        fontSize: 13
      }
    }, "Nenhum colaborador cadastrado ainda. Use o formul\xE1rio acima para come\xE7ar."), list.map(c => editId === c.id ? /*#__PURE__*/React.createElement("div", {
      key: c.id,
      style: {
        border: "1.5px solid var(--ab-azul-claro)",
        borderRadius: "var(--radius-lg)",
        padding: "16px",
        background: "var(--surface-brand-soft)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        marginBottom: 12,
        fontWeight: 700,
        color: "var(--ab-azul-escuro)"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "pencil",
      size: 15
    }), " Editando: ", c.nome), /*#__PURE__*/React.createElement(FormGrid, {
      columns: 3
    }, /*#__PURE__*/React.createElement(Field, {
      label: "Nome Completo",
      required: true
    }, /*#__PURE__*/React.createElement(TextField, {
      value: editForm.nome || "",
      onChange: e => setE("nome", e.target.value)
    })), /*#__PURE__*/React.createElement(Field, {
      label: "Data de Admiss\xE3o"
    }, /*#__PURE__*/React.createElement(TextField, {
      type: "date",
      value: editForm.admissao || "",
      onChange: e => setE("admissao", e.target.value)
    })), /*#__PURE__*/React.createElement(Field, {
      label: "Cargo"
    }, /*#__PURE__*/React.createElement(TextField, {
      value: editForm.cargo || "",
      onChange: e => setE("cargo", e.target.value)
    })), /*#__PURE__*/React.createElement(Field, {
      label: "Departamento"
    }, /*#__PURE__*/React.createElement(TextField, {
      value: editForm.departamento || "",
      onChange: e => setE("departamento", e.target.value)
    })), /*#__PURE__*/React.createElement(Field, {
      label: "WhatsApp",
      hint: "Com DDD. Ex: (27) 99999-9999"
    }, /*#__PURE__*/React.createElement(TextField, {
      value: editForm.whatsapp || "",
      onChange: e => setE("whatsapp", e.target.value)
    })), /*#__PURE__*/React.createElement(Field, {
      label: "Tempo de Empresa",
      hint: "Calculado a partir da admiss\xE3o."
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8,
        height: 38,
        padding: "0 12px",
        background: "#fff",
        border: "1px solid var(--role-feedback)",
        borderRadius: "var(--radius-sm)",
        color: "var(--ab-azul-escuro)",
        fontWeight: 700,
        fontSize: 13
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "clock",
      size: 15
    }), " ", editForm.admissao ? tempoEmpresa(editForm.admissao) : "—"))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "flex-end",
        gap: 10,
        marginTop: 16
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      onClick: cancelEdit
    }, "Cancelar"), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        name: "save",
        size: 15
      }),
      onClick: saveEdit
    }, "Salvar Altera\xE7\xF5es"))) : /*#__PURE__*/React.createElement("div", {
      key: c.id,
      style: {
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-lg)",
        padding: "14px 16px",
        display: "flex",
        gap: 14,
        alignItems: "flex-start",
        opacity: c.demitido ? 0.72 : 1
      }
    }, /*#__PURE__*/React.createElement(Avatar, {
      name: c.nome,
      size: 42,
      tone: c.demitido ? "soft" : "brand"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        flexWrap: "wrap"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 700,
        fontSize: 14
      }
    }, c.nome), c.cargo && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: "var(--text-muted)"
      }
    }, "\xB7 ", c.cargo), c.demitido ? /*#__PURE__*/React.createElement(StatusBadge, {
      status: "pendente",
      label: "Desligado"
    }) : /*#__PURE__*/React.createElement(StatusBadge, {
      status: "completo",
      label: "Ativo"
    }), ciclosDe(c.id) > 0 && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        color: "var(--ab-azul-escuro)",
        background: "var(--surface-brand-soft)",
        padding: "2px 8px",
        borderRadius: 999,
        fontWeight: 700
      }
    }, ciclosDe(c.id), " ciclo(s)")), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: "var(--text-muted)",
        marginTop: 4,
        display: "flex",
        gap: 14,
        flexWrap: "wrap"
      }
    }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", null, "Depto:"), " ", c.departamento || "—"), c.whatsapp && /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", null, "WhatsApp:"), " ", c.whatsapp), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", null, "Admiss\xE3o:"), " ", fmtDate(c.admissao)), /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--ab-azul-escuro)",
        fontWeight: 700
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "clock",
      size: 12,
      style: {
        marginRight: 3,
        verticalAlign: "-2px"
      }
    }), tempoEmpresa(c.admissao, c.demitido ? c.demissao : null)), c.demitido && /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--danger)",
        fontWeight: 700
      }
    }, /*#__PURE__*/React.createElement("strong", null, "Demiss\xE3o:"), " ", fmtDate(c.demissao))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 10,
        display: "flex",
        alignItems: "center",
        gap: 10,
        flexWrap: "wrap"
      }
    }, /*#__PURE__*/React.createElement("label", {
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 7,
        fontSize: 13,
        cursor: "pointer",
        color: "var(--text-body)"
      }
    }, /*#__PURE__*/React.createElement("input", {
      type: "checkbox",
      checked: c.demitido,
      onChange: e => onUpdate(c.id, e.target.checked ? {
        demitido: true,
        demissao: c.demissao || new Date().toISOString().slice(0, 10)
      } : {
        demitido: false,
        demissao: ""
      }),
      style: {
        width: 16,
        height: 16,
        accentColor: "var(--danger)",
        cursor: "pointer"
      }
    }), "Colaborador desligado"), c.demitido && /*#__PURE__*/React.createElement("label", {
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 7,
        fontSize: 12,
        color: "var(--text-muted)"
      }
    }, "Data da demiss\xE3o:", /*#__PURE__*/React.createElement(TextField, {
      type: "date",
      value: c.demissao || "",
      onChange: e => onUpdate(c.id, {
        demissao: e.target.value
      }),
      style: {
        width: 160,
        height: 34
      }
    })))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 6
      }
    }, /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "secondary",
      onClick: () => startEdit(c),
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        name: "pencil",
        size: 14
      })
    }, "Editar"), /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "danger",
      onClick: () => {
        if (window.confirm(`Excluir ${c.nome}? Os ciclos vinculados também serão removidos.`)) onDelete(c.id);
      },
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        name: "trash-2",
        size: 14
      })
    }, "Excluir")))))));
  }
  window.FuncionariosScreen = FuncionariosScreen;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/ciclo/ColaboradoresScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/ciclo/ComparisonModal.jsx
try { (() => {
// Comparison modal — "Visão Lado a Lado" (gestor × colaborador).
(function () {
  const NS = window.CicloDeDesenvolvimentoDesignSystem_cb4518;
  const {
    Modal,
    DualPane,
    Pane,
    Banner,
    PdiTable,
    StatusBadge,
    Button,
    SectionTitle
  } = NS;
  const {
    Icon,
    statusFromForms,
    statusLabel
  } = window.CicloHelpers;
  function Block({
    label,
    gestor,
    colab
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: 18
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: "var(--fs-label)",
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: ".05em",
        color: "var(--ab-azul-escuro)",
        marginBottom: 8
      }
    }, label), /*#__PURE__*/React.createElement(DualPane, null, /*#__PURE__*/React.createElement(Pane, {
      role: "gestor",
      heading: "L\xEDder"
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        fontSize: 13,
        color: gestor ? "var(--text-strong)" : "var(--text-muted)",
        lineHeight: 1.6,
        background: "var(--surface-sunken)",
        borderRadius: "var(--radius-sm)",
        padding: "10px 12px"
      }
    }, gestor || "—")), /*#__PURE__*/React.createElement(Pane, {
      role: "colab",
      heading: "Liderado"
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        fontSize: 13,
        color: colab ? "var(--text-strong)" : "var(--text-muted)",
        lineHeight: 1.6,
        background: "var(--surface-accent-soft)",
        borderRadius: "var(--radius-sm)",
        padding: "10px 12px"
      }
    }, colab || "—"))));
  }
  function ComparisonModal({
    colab,
    open,
    onClose,
    onOpenColabForm,
    onPrint,
    onFinalize
  }) {
    if (!colab) return null;
    const g = colab.gestorForm || {};
    const co = colab.colabForm || {};
    return /*#__PURE__*/React.createElement(Modal, {
      open: open,
      onClose: onClose,
      width: 900,
      title: colab.nome,
      subtitle: `${colab.cargo || "—"} · ${colab.area || "—"} · ${colab.departamento || "—"} · ${colab.cicloNum}`,
      footer: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
        variant: "ghost",
        onClick: () => onOpenColabForm(colab),
        iconLeft: /*#__PURE__*/React.createElement(Icon, {
          name: "external-link",
          size: 14
        })
      }, "Form do colaborador"), /*#__PURE__*/React.createElement(Button, {
        variant: "secondary",
        onClick: () => onPrint(colab),
        iconLeft: /*#__PURE__*/React.createElement(Icon, {
          name: "file-down",
          size: 14
        })
      }, "Gerar PDF"), !colab.encerrado ? /*#__PURE__*/React.createElement(Button, {
        variant: "primary",
        onClick: () => onFinalize(colab.id),
        iconLeft: /*#__PURE__*/React.createElement(Icon, {
          name: "flag",
          size: 14
        })
      }, "Finalizar Ciclo") : /*#__PURE__*/React.createElement(Button, {
        variant: "primary",
        onClick: onClose
      }, "Fechar"))
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        marginBottom: 16,
        flexWrap: "wrap"
      }
    }, /*#__PURE__*/React.createElement(StatusBadge, {
      status: statusFromForms(colab),
      label: statusLabel(colab)
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        fontSize: 12,
        color: g.retro ? "var(--positive)" : "var(--text-muted)"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: g.retro ? "check-circle-2" : "circle-dashed",
      size: 15
    }), " Percep\xE7\xE3o do Gestor"), /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        fontSize: 12,
        color: co.retro ? "var(--positive)" : "var(--text-muted)"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: co.retro ? "check-circle-2" : "circle-dashed",
      size: 15
    }), " Percep\xE7\xE3o do Colaborador")), /*#__PURE__*/React.createElement(Banner, {
      tone: "accent",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "target",
        size: 16
      }),
      title: "Alvo a ser Atingido",
      style: {
        marginBottom: 18
      }
    }, colab.alvo), /*#__PURE__*/React.createElement(Block, {
      label: "Retrospectiva",
      gestor: g.retro,
      colab: co.retro
    }), /*#__PURE__*/React.createElement(Block, {
      label: "Foco no Futuro",
      gestor: g.futuro,
      colab: co.futuro
    }), /*#__PURE__*/React.createElement(Block, {
      label: "PDI T\xE9cnico \u2014 Percep\xE7\xE3o",
      gestor: g.pdiTec,
      colab: co.pdiTec
    }), /*#__PURE__*/React.createElement(Block, {
      label: "PDI Comportamental \u2014 Percep\xE7\xE3o",
      gestor: g.pdiComp,
      colab: co.pdiComp
    }), g.rowsTec && g.rowsTec.length > 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: 18
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: "var(--fs-label)",
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: ".05em",
        color: "var(--ab-azul-escuro)",
        marginBottom: 8
      }
    }, "Melhoria Acordada \u2014 T\xE9cnico"), /*#__PURE__*/React.createElement(PdiTable, {
      rows: g.rowsTec,
      readOnly: true
    })), g.rowsComp && g.rowsComp.length > 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        marginBottom: 18
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: "var(--fs-label)",
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: ".05em",
        color: "var(--ab-azul-escuro)",
        marginBottom: 8
      }
    }, "Melhoria Acordada \u2014 Comportamental"), /*#__PURE__*/React.createElement(PdiTable, {
      rows: g.rowsComp,
      readOnly: true
    })), g.conexao && /*#__PURE__*/React.createElement(Banner, {
      tone: "info",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "handshake",
        size: 16
      }),
      title: "Conex\xE3o L\xEDder"
    }, g.conexao));
  }
  window.ComparisonModal = ComparisonModal;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/ciclo/ComparisonModal.jsx", error: String((e && e.message) || e) }); }

// ui_kits/ciclo/DashboardScreen.jsx
try { (() => {
// Dashboard — consolidated control view for the gestão.
(function () {
  const NS = window.CicloDeDesenvolvimentoDesignSystem_cb4518;
  const {
    MetricCard,
    Card,
    DataTable,
    FilterBar,
    TextField,
    Select,
    StatusBadge,
    Button,
    Avatar
  } = NS;
  const {
    Icon,
    statusFromForms,
    statusLabel,
    pdiStats,
    fmtDate,
    prazoFinal
  } = window.CicloHelpers;
  function DashboardScreen({
    colabs,
    funcionarios = [],
    onOpen
  }) {
    const [q, setQ] = React.useState("");
    const [status, setStatus] = React.useState("");
    const [area, setArea] = React.useState("");
    const areas = [...new Set(colabs.map(c => c.revenda).filter(Boolean))];
    const total = colabs.length;
    const completos = colabs.filter(c => statusFromForms(c) === "completo").length;
    const aguardando = colabs.filter(c => statusFromForms(c) === "parcial").length;
    const pct = total ? Math.round(completos / total * 100) : 0;
    const s = pdiStats(colabs);
    const pdiTotal = s.tecTotal + s.compTotal;
    const pdiDone = s.tecDone + s.compDone;
    const pdiGeralPct = pdiTotal ? Math.round(pdiDone / pdiTotal * 100) : 0;
    const rows = colabs.filter(c => {
      const mq = !q || c.nome.toLowerCase().includes(q.toLowerCase()) || (c.cargo || "").toLowerCase().includes(q.toLowerCase());
      const ms = !status || statusFromForms(c) === status;
      const ma = !area || c.revenda === area;
      return mq && ms && ma;
    });
    const ativos = funcionarios.filter(x => !x.demitido).length;
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "16px"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "14px"
      }
    }, /*#__PURE__*/React.createElement(MetricCard, {
      value: ativos,
      label: "Colaboradores Ativos",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "users",
        size: 20
      })
    }), /*#__PURE__*/React.createElement(MetricCard, {
      value: total,
      label: "Total de Ciclos",
      tone: "default",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "repeat",
        size: 20
      })
    }), /*#__PURE__*/React.createElement(MetricCard, {
      value: completos,
      label: "Ciclos Completos",
      tone: "completo",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "check-circle-2",
        size: 20
      })
    }), /*#__PURE__*/React.createElement(MetricCard, {
      value: pct + "%",
      label: "Taxa de Conclus\xE3o",
      tone: "accent",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "trending-up",
        size: 20
      })
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "14px"
      }
    }, /*#__PURE__*/React.createElement(MetricCard, {
      value: s.tecTotal + s.compTotal,
      label: "PDIs Cadastrados (T\xE9c + Comp)",
      tone: "default",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "list-checks",
        size: 20
      })
    }), /*#__PURE__*/React.createElement(MetricCard, {
      value: s.tecTotal,
      label: "PDIs T\xE9cnicos",
      tone: "default",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "wrench",
        size: 20
      })
    }), /*#__PURE__*/React.createElement(MetricCard, {
      value: s.compTotal,
      label: "PDIs Comportamentais",
      tone: "default",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "brain",
        size: 20
      })
    }), /*#__PURE__*/React.createElement(MetricCard, {
      value: pdiGeralPct + "%",
      label: "Conclus\xE3o dos PDIs",
      tone: "accent",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "trending-up",
        size: 20
      })
    })), /*#__PURE__*/React.createElement(Card, {
      title: "Controle Unificado \u2014 Gestor \xD7 Colaborador"
    }, /*#__PURE__*/React.createElement(FilterBar, null, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 2,
        minWidth: 200,
        position: "relative"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        position: "absolute",
        left: 10,
        top: "50%",
        transform: "translateY(-50%)",
        color: "var(--text-muted)",
        pointerEvents: "none"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "search",
      size: 15
    })), /*#__PURE__*/React.createElement(TextField, {
      placeholder: "Buscar colaborador ou cargo...",
      value: q,
      onChange: e => setQ(e.target.value),
      style: {
        paddingLeft: 32
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 150
      }
    }, /*#__PURE__*/React.createElement(Select, {
      value: status,
      onChange: e => setStatus(e.target.value)
    }, /*#__PURE__*/React.createElement("option", {
      value: ""
    }, "Todos os status"), /*#__PURE__*/React.createElement("option", {
      value: "completo"
    }, "Completo"), /*#__PURE__*/React.createElement("option", {
      value: "parcial"
    }, "Em andamento"), /*#__PURE__*/React.createElement("option", {
      value: "pendente"
    }, "Pendente"))), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 150
      }
    }, /*#__PURE__*/React.createElement(Select, {
      value: area,
      onChange: e => setArea(e.target.value)
    }, /*#__PURE__*/React.createElement("option", {
      value: ""
    }, "Todas as \xE1reas"), areas.map(a => /*#__PURE__*/React.createElement("option", {
      key: a,
      value: a
    }, a))))), /*#__PURE__*/React.createElement(DataTable, {
      rowKey: r => r.id,
      empty: "Nenhum ciclo encontrado.",
      columns: [{
        key: "nome",
        header: "Colaborador",
        render: r => /*#__PURE__*/React.createElement("div", {
          style: {
            display: "flex",
            alignItems: "center",
            gap: 10
          }
        }, /*#__PURE__*/React.createElement(Avatar, {
          name: r.nome,
          size: 30,
          tone: "soft"
        }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
          style: {
            fontWeight: 700
          }
        }, r.nome), /*#__PURE__*/React.createElement("div", {
          style: {
            fontSize: 11,
            color: "var(--text-muted)"
          }
        }, [r.cargo, r.revenda, r.cicloNum, `aplicação ${fmtDate(r.data)}`, `prazo ${fmtDate(prazoFinal(r))}`].filter(Boolean).join(" · "))))
      }, {
        key: "gestor",
        header: "Gestor",
        render: r => /*#__PURE__*/React.createElement("span", {
          style: {
            fontSize: 13
          }
        }, r.gestor || "—")
      }, {
        key: "g",
        header: "Form. Gestor",
        align: "center",
        render: r => /*#__PURE__*/React.createElement(Icon, {
          name: r.gestorForm ? "check-circle-2" : "circle-dashed",
          size: 18,
          color: r.gestorForm ? "var(--positive)" : "var(--ab-gray-400)"
        })
      }, {
        key: "c",
        header: "Form. Colab.",
        align: "center",
        render: r => /*#__PURE__*/React.createElement(Icon, {
          name: r.colabForm ? "check-circle-2" : "circle-dashed",
          size: 18,
          color: r.colabForm ? "var(--positive)" : "var(--ab-gray-400)"
        })
      }, {
        key: "status",
        header: "Status",
        render: r => /*#__PURE__*/React.createElement(StatusBadge, {
          status: statusFromForms(r),
          label: statusLabel(r)
        })
      }, {
        key: "acoes",
        header: "",
        align: "right",
        render: r => /*#__PURE__*/React.createElement(Button, {
          size: "sm",
          variant: "ghost",
          onClick: () => onOpen(r),
          iconLeft: /*#__PURE__*/React.createElement(Icon, {
            name: "eye",
            size: 14
          })
        }, "Ver")
      }],
      rows: rows
    })));
  }
  window.DashboardScreen = DashboardScreen;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/ciclo/DashboardScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/ciclo/FormColaboradorScreen.jsx
try { (() => {
// Formulário do Colaborador (modo link) — autopercepção do liderado.
(function () {
  const NS = window.CicloDeDesenvolvimentoDesignSystem_cb4518;
  const {
    Card,
    Banner,
    SectionTitle,
    TextArea,
    Field,
    Button,
    Pane
  } = NS;
  const {
    Icon
  } = window.CicloHelpers;
  function FormColaboradorScreen({
    colab,
    logoSrc,
    onToast,
    onBack,
    onSubmit,
    onUpdateAction,
    readOnly = false
  }) {
    const c = colab;
    const d = c.colabForm || {};
    const g = c.gestorForm || {};
    const AcaoTable = window.AcaoTable;
    const [form, setForm] = React.useState({
      retro: d.retro || "",
      futuro: d.futuro || "",
      pdiTec: d.pdiTec || "",
      pdiComp: d.pdiComp || ""
    });
    const [errs, setErrs] = React.useState({});
    const set = (k, v) => {
      setForm(s => ({
        ...s,
        [k]: v
      }));
      if (v.trim()) setErrs(e => ({
        ...e,
        [k]: false
      }));
    };
    const enviar = () => {
      const campos = ["retro", "futuro", "pdiTec", "pdiComp"];
      const faltando = {};
      campos.forEach(k => {
        if (!String(form[k]).trim()) faltando[k] = true;
      });
      if (Object.keys(faltando).length) {
        setErrs(faltando);
        onToast && onToast("Preencha todos os campos antes de enviar.", "danger");
        return;
      }
      onSubmit && onSubmit({
        ...form
      });
    };
    const invalid = {
      border: "1.5px solid var(--danger)",
      boxShadow: "0 0 0 2px rgba(200,30,40,.12)"
    };
    const renderHero = sub => /*#__PURE__*/React.createElement("div", {
      style: {
        background: "var(--ab-azul-escuro)",
        borderBottom: "3px solid var(--ab-laranja)",
        padding: "26px 24px",
        textAlign: "center",
        color: "#fff"
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: logoSrc,
      alt: "Grupo \xC1guia Branca \u2014 Divis\xE3o Com\xE9rcio",
      style: {
        height: 34,
        marginBottom: 14
      }
    }), /*#__PURE__*/React.createElement("h1", {
      style: {
        fontSize: "var(--fs-h1)",
        color: "#fff"
      }
    }, "Ciclo de Desenvolvimento e Evolu\xE7\xE3o"), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 14,
        opacity: 0.82,
        marginTop: 4
      }
    }, sub));

    // ----- Ciclo encerrado: o colaborador atualiza a conclusão das ações de PDI -----
    if (readOnly) {
      const temPdi = (g.rowsTec || []).length || (g.rowsComp || []).length;
      const roField = (label, val) => /*#__PURE__*/React.createElement(Card, {
        spine: "colab",
        style: {
          marginBottom: 0
        }
      }, /*#__PURE__*/React.createElement(Pane, {
        role: "colab",
        heading: label,
        style: {
          borderLeft: "none",
          paddingLeft: 0
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          whiteSpace: "pre-wrap",
          fontSize: 13,
          color: "var(--text-body)",
          lineHeight: 1.55
        }
      }, val || "—")));
      return /*#__PURE__*/React.createElement("div", {
        style: {
          background: "var(--surface-canvas)",
          minHeight: "100%"
        }
      }, renderHero(`Olá, ${c.nome.split(" ")[0]}! Atualize a conclusão das suas ações de PDI.`), /*#__PURE__*/React.createElement("div", {
        style: {
          maxWidth: 820,
          margin: "0 auto",
          padding: "22px 18px",
          display: "flex",
          flexDirection: "column",
          gap: 16
        }
      }, /*#__PURE__*/React.createElement(Banner, {
        tone: "accent",
        icon: /*#__PURE__*/React.createElement(Icon, {
          name: "route",
          size: 16
        }),
        title: "Ciclo encerrado \u2014 acompanhe seu PDI"
      }, "Este \xE9 o Plano de Desenvolvimento Individual que voc\xEA construiu com seu gestor. Marque cada a\xE7\xE3o como ", /*#__PURE__*/React.createElement("strong", null, "realizada"), " e informe a ", /*#__PURE__*/React.createElement("strong", null, "data de conclus\xE3o"), ". Suas atualiza\xE7\xF5es aparecem automaticamente para o seu gestor."), c.alvo && /*#__PURE__*/React.createElement(Banner, {
        tone: "accent",
        icon: /*#__PURE__*/React.createElement(Icon, {
          name: "target",
          size: 16
        }),
        title: "Alvo a ser Atingido"
      }, c.alvo), temPdi ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(SectionTitle, {
        highlight: "T\xE9cnico",
        icon: /*#__PURE__*/React.createElement(Icon, {
          name: "wrench",
          size: 15
        })
      }, "PDI"), /*#__PURE__*/React.createElement(Card, null, AcaoTable ? /*#__PURE__*/React.createElement(AcaoTable, {
        rows: g.rowsTec,
        tipo: "tec",
        colabId: c.id,
        onUpdate: onUpdateAction,
        locked: false
      }) : null), /*#__PURE__*/React.createElement(SectionTitle, {
        highlight: "Comportamental",
        icon: /*#__PURE__*/React.createElement(Icon, {
          name: "brain",
          size: 15
        })
      }, "PDI"), /*#__PURE__*/React.createElement(Card, null, AcaoTable ? /*#__PURE__*/React.createElement(AcaoTable, {
        rows: g.rowsComp,
        tipo: "comp",
        colabId: c.id,
        onUpdate: onUpdateAction,
        locked: false
      }) : null)) : /*#__PURE__*/React.createElement(Banner, {
        tone: "info",
        icon: /*#__PURE__*/React.createElement(Icon, {
          name: "info",
          size: 16
        })
      }, "Nenhuma a\xE7\xE3o de PDI foi registrada neste ciclo."), /*#__PURE__*/React.createElement(SectionTitle, {
        icon: /*#__PURE__*/React.createElement(Icon, {
          name: "file-text",
          size: 15
        })
      }, "Suas respostas do ciclo"), roField("Retrospectiva — Sua Percepção", d.retro), roField("Foco no Futuro — Seu Plano", d.futuro), roField("Autoanálise Técnica", d.pdiTec), roField("Autoanálise Comportamental", d.pdiComp), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }
      }, onBack ? /*#__PURE__*/React.createElement(Button, {
        variant: "ghost",
        onClick: onBack,
        iconLeft: /*#__PURE__*/React.createElement(Icon, {
          name: "arrow-left",
          size: 15
        })
      }, "Voltar ao painel") : /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 12,
          color: "var(--text-muted)"
        }
      }, "Grupo \xC1guia Branca \xB7 Divis\xE3o Com\xE9rcio"))));
    }
    return /*#__PURE__*/React.createElement("div", {
      style: {
        background: "var(--surface-canvas)",
        minHeight: "100%"
      }
    }, renderHero(`Olá, ${c.nome.split(" ")[0]}! Preencha sua autopercepção abaixo.`), /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: 820,
        margin: "0 auto",
        padding: "22px 18px",
        display: "flex",
        flexDirection: "column",
        gap: 16
      }
    }, readOnly ? /*#__PURE__*/React.createElement(Banner, {
      tone: "neutral",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "lock",
        size: 16
      }),
      title: "Ciclo encerrado \u2014 somente leitura"
    }, "Este ciclo foi finalizado. Voc\xEA pode consultar suas respostas e o PDI acordado, mas n\xE3o \xE9 poss\xEDvel edit\xE1-las.") : /*#__PURE__*/React.createElement(Banner, {
      tone: "info",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "info",
        size: 16
      })
    }, "Preencha os campos referentes \xE0 ", /*#__PURE__*/React.createElement("strong", null, "sua percep\xE7\xE3o como liderado"), ". Ao enviar, seu gestor receber\xE1 suas respostas e agendar\xE1 um momento de feedback."), c.alvo && /*#__PURE__*/React.createElement(Banner, {
      tone: "accent",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "target",
        size: 16
      }),
      title: "Alvo a ser Atingido"
    }, c.alvo), /*#__PURE__*/React.createElement(SectionTitle, {
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "refresh-cw",
        size: 15
      })
    }, "Jornada de Reflex\xE3o e Evolu\xE7\xE3o"), /*#__PURE__*/React.createElement(Card, {
      spine: "colab"
    }, /*#__PURE__*/React.createElement(Pane, {
      role: "colab",
      heading: "Retrospectiva \u2014 Sua Percep\xE7\xE3o",
      style: {
        borderLeft: "none",
        paddingLeft: 0
      }
    }, /*#__PURE__*/React.createElement(Field, {
      hint: "Que resultados concretos voc\xEA alcan\xE7ou nos \xFAltimos 6 meses? Como impactaram a equipe/empresa?"
    }, /*#__PURE__*/React.createElement(TextArea, {
      autoGrow: true,
      minRows: 4,
      value: form.retro,
      onChange: e => set("retro", e.target.value),
      readOnly: readOnly,
      placeholder: "Resultados, contribui\xE7\xF5es, desafios superados...",
      style: errs.retro ? invalid : undefined
    })))), /*#__PURE__*/React.createElement(Card, {
      spine: "colab"
    }, /*#__PURE__*/React.createElement(Pane, {
      role: "colab",
      heading: "Foco no Futuro \u2014 Seu Plano",
      style: {
        borderLeft: "none",
        paddingLeft: 0
      }
    }, /*#__PURE__*/React.createElement(Field, {
      hint: "O que voc\xEA planeja fazer para alcan\xE7ar os objetivos? Quais recursos acredita serem necess\xE1rios?"
    }, /*#__PURE__*/React.createElement(TextArea, {
      autoGrow: true,
      minRows: 4,
      value: form.futuro,
      onChange: e => set("futuro", e.target.value),
      readOnly: readOnly,
      placeholder: "Suas metas, planos e recursos necess\xE1rios...",
      style: errs.futuro ? invalid : undefined
    })))), /*#__PURE__*/React.createElement(SectionTitle, {
      highlight: "T\xE9cnico",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "wrench",
        size: 15
      })
    }, "PDI"), /*#__PURE__*/React.createElement(Card, {
      spine: "colab"
    }, /*#__PURE__*/React.createElement(Pane, {
      role: "colab",
      heading: "Sua Autoan\xE1lise T\xE9cnica",
      style: {
        borderLeft: "none",
        paddingLeft: 0
      }
    }, /*#__PURE__*/React.createElement(Field, {
      hint: "O que voc\xEA tem de bom tecnicamente? O que precisa melhorar para atingir a meta?"
    }, /*#__PURE__*/React.createElement(TextArea, {
      autoGrow: true,
      minRows: 3,
      value: form.pdiTec,
      onChange: e => set("pdiTec", e.target.value),
      readOnly: readOnly,
      placeholder: "Seus pontos fortes t\xE9cnicos e o que precisa desenvolver...",
      style: errs.pdiTec ? invalid : undefined
    })))), /*#__PURE__*/React.createElement(SectionTitle, {
      highlight: "Comportamental",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "brain",
        size: 15
      })
    }, "PDI"), /*#__PURE__*/React.createElement(Card, {
      spine: "colab"
    }, /*#__PURE__*/React.createElement(Pane, {
      role: "colab",
      heading: "Sua Autoan\xE1lise Comportamental",
      style: {
        borderLeft: "none",
        paddingLeft: 0
      }
    }, /*#__PURE__*/React.createElement(Field, {
      hint: "Quais comportamentos voc\xEA precisa desenvolver para um melhor desempenho?"
    }, /*#__PURE__*/React.createElement(TextArea, {
      autoGrow: true,
      minRows: 3,
      value: form.pdiComp,
      onChange: e => set("pdiComp", e.target.value),
      readOnly: readOnly,
      placeholder: "Seus pontos fortes comportamentais e o que precisa desenvolver...",
      style: errs.pdiComp ? invalid : undefined
    })))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }
    }, onBack ? /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      onClick: onBack,
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        name: "arrow-left",
        size: 15
      })
    }, "Voltar ao painel") : /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: "var(--text-muted)"
      }
    }, "Grupo \xC1guia Branca \xB7 Divis\xE3o Com\xE9rcio"), !readOnly && /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        name: "check",
        size: 15
      }),
      onClick: enviar
    }, "Enviar Minhas Respostas"))));
  }
  window.FormColaboradorScreen = FormColaboradorScreen;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/ciclo/FormColaboradorScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/ciclo/FormGestorScreen.jsx
try { (() => {
// Form. Gestor — a jornada de reflexão e evolução preenchida pelo líder.
(function () {
  const NS = window.CicloDeDesenvolvimentoDesignSystem_cb4518;
  const {
    Card,
    Field,
    Select,
    Banner,
    SectionTitle,
    DualPane,
    Pane,
    TextArea,
    PdiTable,
    Legend,
    Button
  } = NS;
  const {
    Icon,
    fmtDate,
    prazoFinal
  } = window.CicloHelpers;
  const emptyRow = () => ({
    acao: "",
    desdobramento: "",
    evidencia: "",
    data: ""
  });
  const blankForm = () => ({
    retro: "",
    futuro: "",
    pdiTec: "",
    pdiComp: "",
    conexao: "",
    rowsTec: [emptyRow()],
    rowsComp: [emptyRow()]
  });
  function FormGestorScreen({
    colabs,
    onSave,
    onToast
  }) {
    if (!colabs.length) {
      return /*#__PURE__*/React.createElement(Card, {
        title: "Formul\xE1rio do Gestor"
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          textAlign: "center",
          padding: 30,
          color: "var(--text-muted)",
          fontSize: 13
        }
      }, "Nenhum colaborador cadastrado. Cadastre um colaborador na aba ", /*#__PURE__*/React.createElement("strong", null, "Colaboradores"), " para preencher a percep\xE7\xE3o do gestor."));
    }
    const [id, setId] = React.useState(colabs[0].id);
    const c = colabs.find(x => x.id === id) || colabs[0];
    const fromColab = cc => {
      const g = cc.gestorForm;
      if (!g) return blankForm();
      return {
        retro: g.retro || "",
        futuro: g.futuro || "",
        pdiTec: g.pdiTec || "",
        pdiComp: g.pdiComp || "",
        conexao: g.conexao || "",
        rowsTec: g.rowsTec && g.rowsTec.length ? g.rowsTec : [emptyRow()],
        rowsComp: g.rowsComp && g.rowsComp.length ? g.rowsComp : [emptyRow()]
      };
    };
    const [form, setForm] = React.useState(() => fromColab(c));
    const [errs, setErrs] = React.useState({});
    const set = (k, v) => {
      setForm(s => ({
        ...s,
        [k]: v
      }));
      if (typeof v === "string" && v.trim()) setErrs(e => ({
        ...e,
        [k]: false
      }));
    };
    const invalid = {
      border: "1.5px solid var(--danger)",
      boxShadow: "0 0 0 2px rgba(200,30,40,.12)"
    };
    React.useEffect(() => {
      setForm(fromColab(colabs.find(x => x.id === id) || colabs[0]));
      setErrs({});
    }, [id]);
    const salvar = () => {
      const clean = rows => rows.filter(r => r.acao || r.desdobramento || r.evidencia || r.data);
      const rowsTec = clean(form.rowsTec);
      const rowsComp = clean(form.rowsComp);
      const faltando = {};
      ["retro", "futuro", "pdiTec", "pdiComp", "conexao"].forEach(k => {
        if (!String(form[k]).trim()) faltando[k] = true;
      });
      // Toda ação de PDI adicionada precisa ter Ação e Data Acordada.
      const rowsIncompletas = rows => rows.some(r => (r.acao || r.desdobramento || r.evidencia || r.data) && (!String(r.acao).trim() || !String(r.data).trim()));
      if (rowsTec.length === 0) faltando.rowsTec = true;
      if (rowsComp.length === 0) faltando.rowsComp = true;
      const pdiIncompleto = rowsIncompletas(form.rowsTec) || rowsIncompletas(form.rowsComp);
      if (Object.keys(faltando).length || pdiIncompleto) {
        setErrs(faltando);
        const msg = pdiIncompleto ? "Cada ação de PDI precisa ter Ação e Data Acordada preenchidas." : "Preencha todos os campos antes de salvar (inclusive ao menos uma ação em cada PDI).";
        onToast && onToast(msg, "danger");
        return;
      }
      onSave(id, {
        ...form,
        rowsTec,
        rowsComp
      });
    };
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "16px"
      }
    }, /*#__PURE__*/React.createElement(Card, {
      title: "Selecionar Colaborador"
    }, /*#__PURE__*/React.createElement(Field, {
      label: "Colaborador"
    }, /*#__PURE__*/React.createElement(Select, {
      value: id,
      onChange: e => setId(e.target.value)
    }, colabs.map(x => /*#__PURE__*/React.createElement("option", {
      key: x.id,
      value: x.id
    }, x.nome, x.revenda ? ` — ${x.revenda}` : "")))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 14,
        display: "flex",
        flexDirection: "column",
        gap: 10
      }
    }, /*#__PURE__*/React.createElement(Banner, {
      tone: "info",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "user",
        size: 16
      })
    }, /*#__PURE__*/React.createElement("strong", null, c.nome), c.gestor ? ` · Gestor: ${c.gestor}` : "", c.revenda ? ` · ${c.revenda}` : "", " \xB7 ", c.cicloNum, " \xB7 prazo ", fmtDate(prazoFinal(c))), c.alvo && /*#__PURE__*/React.createElement(Banner, {
      tone: "accent",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "target",
        size: 16
      }),
      title: "Alvo a ser Atingido"
    }, c.alvo))), /*#__PURE__*/React.createElement(SectionTitle, {
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "refresh-cw",
        size: 15
      })
    }, "Jornada de Reflex\xE3o e Evolu\xE7\xE3o"), /*#__PURE__*/React.createElement(DualPane, null, /*#__PURE__*/React.createElement(Card, {
      spine: "gestor"
    }, /*#__PURE__*/React.createElement(Pane, {
      role: "gestor",
      heading: "Retrospectiva \u2014 Percep\xE7\xE3o do L\xEDder"
    }, /*#__PURE__*/React.createElement(Field, {
      hint: "An\xE1lise do gestor referente \xE0 performance (resultado e impacto) nos \xFAltimos 6 meses."
    }, /*#__PURE__*/React.createElement(TextArea, {
      autoGrow: true,
      minRows: 4,
      value: form.retro,
      onChange: e => set("retro", e.target.value),
      placeholder: "Resultados, impacto, desafios superados...",
      style: errs.retro ? invalid : undefined
    })))), /*#__PURE__*/React.createElement(Card, {
      spine: "feedback"
    }, /*#__PURE__*/React.createElement(Pane, {
      role: "feedback",
      heading: "Foco no Futuro \u2014 Vis\xE3o do L\xEDder"
    }, /*#__PURE__*/React.createElement(Field, {
      hint: "O que \xE9 esperado para o pr\xF3ximo ciclo (alvo de 6 meses)."
    }, /*#__PURE__*/React.createElement(TextArea, {
      autoGrow: true,
      minRows: 4,
      value: form.futuro,
      onChange: e => set("futuro", e.target.value),
      placeholder: "Objetivos, recursos dispon\xEDveis...",
      style: errs.futuro ? invalid : undefined
    }))))), /*#__PURE__*/React.createElement(SectionTitle, {
      highlight: "T\xE9cnico",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "wrench",
        size: 15
      })
    }, "PDI"), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(Pane, {
      role: "gestor",
      heading: "Percep\xE7\xE3o do L\xEDder \u2014 Pontos Fortes e a Desenvolver (T\xE9cnico)"
    }, /*#__PURE__*/React.createElement(TextArea, {
      autoGrow: true,
      minRows: 3,
      value: form.pdiTec,
      onChange: e => set("pdiTec", e.target.value),
      placeholder: "Principais pontos fortes t\xE9cnicos e o que precisa desenvolver...",
      style: errs.pdiTec ? invalid : undefined
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 16
      }
    }), /*#__PURE__*/React.createElement(Pane, {
      role: "feedback",
      heading: "Melhoria Acordada \u2014 PDI T\xE9cnico"
    }, /*#__PURE__*/React.createElement(PdiTable, {
      rows: form.rowsTec,
      onChange: r => set("rowsTec", r),
      addLabel: "+ Adicionar A\xE7\xE3o T\xE9cnica"
    }))), /*#__PURE__*/React.createElement(SectionTitle, {
      highlight: "Comportamental",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "brain",
        size: 15
      })
    }, "PDI"), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(Pane, {
      role: "gestor",
      heading: "Percep\xE7\xE3o do L\xEDder \u2014 Pontos Fortes e a Desenvolver (Comportamental)"
    }, /*#__PURE__*/React.createElement(TextArea, {
      autoGrow: true,
      minRows: 3,
      value: form.pdiComp,
      onChange: e => set("pdiComp", e.target.value),
      placeholder: "Principais pontos fortes comportamentais e o que precisa desenvolver...",
      style: errs.pdiComp ? invalid : undefined
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        height: 16
      }
    }), /*#__PURE__*/React.createElement(Pane, {
      role: "feedback",
      heading: "Melhoria Acordada \u2014 PDI Comportamental"
    }, /*#__PURE__*/React.createElement(PdiTable, {
      rows: form.rowsComp,
      onChange: r => set("rowsComp", r),
      addLabel: "+ Adicionar A\xE7\xE3o Comportamental"
    }))), /*#__PURE__*/React.createElement(Card, {
      spine: "accent"
    }, /*#__PURE__*/React.createElement(Pane, {
      role: "colab",
      heading: "Conex\xE3o L\xEDder \u2014 O que posso contribuir para seu crescimento?",
      style: {
        borderLeft: "none",
        paddingLeft: 0
      }
    }, /*#__PURE__*/React.createElement(TextArea, {
      autoGrow: true,
      minRows: 3,
      value: form.conexao,
      onChange: e => set("conexao", e.target.value),
      placeholder: "Compromissos e contribui\xE7\xF5es do l\xEDder...",
      style: errs.conexao ? invalid : undefined
    }))), /*#__PURE__*/React.createElement(Banner, {
      tone: "info",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "info",
        size: 16
      })
    }, /*#__PURE__*/React.createElement("strong", null, "Etapas do preenchimento:"), " o colaborador responde sua autopercep\xE7\xE3o (laranja); o gestor registra a percep\xE7\xE3o do l\xEDder (azul escuro). Os campos em ", /*#__PURE__*/React.createElement("strong", null, "azul claro"), " \u2014 Foco no Futuro e a Melhoria Acordada do PDI \u2014 s\xE3o consolidados ", /*#__PURE__*/React.createElement("strong", null, "em conjunto, no momento da conversa de feedback"), "."), /*#__PURE__*/React.createElement(Legend, null), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "flex-end",
        gap: 12
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      onClick: () => setForm(blankForm())
    }, "Limpar"), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        name: "save",
        size: 15
      }),
      onClick: salvar
    }, "Salvar Percep\xE7\xE3o do Gestor")));
  }
  window.FormGestorScreen = FormGestorScreen;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/ciclo/FormGestorScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/ciclo/GestorPanel.jsx
try { (() => {
// Painel do Gestor — escopado ao gestor autenticado (só vê seus próprios colaboradores/ciclos).
(function () {
  const NS = window.CicloDeDesenvolvimentoDesignSystem_cb4518;
  const {
    AppHeader,
    Toast
  } = NS;
  const {
    Icon
  } = window.CicloHelpers;
  function GestorPanel({
    gestor,
    logoSrc,
    funcionarios,
    ciclosView,
    onAddFuncionario,
    onUpdateFuncionario,
    onDeleteFuncionario,
    onAddCiclo,
    onDeleteCiclo,
    onUpdateAction,
    onSaveGestorForm,
    onSubmitColabForm,
    onFinalize,
    onUpdateGestorSelf,
    onLogout,
    renderTweaks
  }) {
    const [view, setView] = React.useState("dashboard");
    const [modalColab, setModalColab] = React.useState(null);
    const [colabFormFor, setColabFormFor] = React.useState(null);
    const [printColab, setPrintColab] = React.useState(null);
    const [pwOpen, setPwOpen] = React.useState(false);
    const [toastState, setToastState] = React.useState({
      open: false,
      message: "",
      tone: "default"
    });
    const toastTimer = React.useRef(null);
    const toast = React.useCallback((message, tone = "default") => {
      setToastState({
        open: true,
        message,
        tone
      });
      clearTimeout(toastTimer.current);
      toastTimer.current = setTimeout(() => setToastState(s => ({
        ...s,
        open: false
      })), 2800);
    }, []);
    const toastNode = /*#__PURE__*/React.createElement(Toast, {
      open: toastState.open,
      message: toastState.message,
      tone: toastState.tone
    });
    const findView = id => ciclosView.find(x => x.id === id);
    if (colabFormFor) {
      const live = findView(colabFormFor.id) || colabFormFor;
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(window.FormColaboradorScreen, {
        colab: live,
        logoSrc: logoSrc,
        readOnly: live.encerrado,
        onToast: toast,
        onBack: () => setColabFormFor(null),
        onUpdateAction: onUpdateAction,
        onSubmit: form => onSubmitColabForm(live.id, form)
      }), toastNode, renderTweaks());
    }
    return /*#__PURE__*/React.createElement("div", {
      style: {
        minHeight: "100vh",
        background: "var(--surface-canvas)"
      }
    }, /*#__PURE__*/React.createElement(AppHeader, {
      logoSrc: logoSrc,
      productName: "Ciclo de Desenvolvimento e Evolu\xE7\xE3o",
      active: view,
      onSelect: setView,
      tabs: [{
        id: "dashboard",
        label: "Visão Geral",
        icon: /*#__PURE__*/React.createElement(Icon, {
          name: "layout-dashboard",
          size: 15
        })
      }, {
        id: "colaboradores",
        label: "Colaboradores",
        icon: /*#__PURE__*/React.createElement(Icon, {
          name: "users",
          size: 15
        })
      }, {
        id: "ciclos",
        label: "Cadastro de Ciclo",
        icon: /*#__PURE__*/React.createElement(Icon, {
          name: "calendar-plus",
          size: 15
        })
      }, {
        id: "pdi",
        label: "PDI",
        icon: /*#__PURE__*/React.createElement(Icon, {
          name: "route",
          size: 15
        })
      }, {
        id: "form",
        label: "Form. Gestor",
        icon: /*#__PURE__*/React.createElement(Icon, {
          name: "clipboard-list",
          size: 15
        })
      }],
      right: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
        style: {
          color: "rgba(255,255,255,.72)",
          fontSize: 12,
          marginRight: 4
        }
      }, gestor.nome), /*#__PURE__*/React.createElement("button", {
        onClick: () => setPwOpen(true),
        title: "Alterar senha",
        style: {
          border: "none",
          background: "transparent",
          color: "rgba(255,255,255,.72)",
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          fontSize: 12
        }
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "key-round",
        size: 15
      })), /*#__PURE__*/React.createElement("button", {
        onClick: onLogout,
        title: "Sair",
        style: {
          marginLeft: 8,
          border: "none",
          background: "transparent",
          color: "rgba(255,255,255,.72)",
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          fontSize: 12
        }
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "log-out",
        size: 15
      })))
    }), /*#__PURE__*/React.createElement("main", {
      style: {
        maxWidth: "var(--container-max)",
        margin: "0 auto",
        padding: "24px"
      }
    }, view === "dashboard" && /*#__PURE__*/React.createElement(window.DashboardScreen, {
      colabs: ciclosView,
      funcionarios: funcionarios,
      onOpen: setModalColab
    }), view === "colaboradores" && /*#__PURE__*/React.createElement(window.FuncionariosScreen, {
      funcionarios: funcionarios,
      ciclos: ciclosView,
      onAdd: onAddFuncionario,
      onUpdate: onUpdateFuncionario,
      onDelete: onDeleteFuncionario,
      onToast: toast
    }), view === "ciclos" && /*#__PURE__*/React.createElement(window.CicloCadastroScreen, {
      funcionarios: funcionarios,
      ciclos: ciclosView,
      onAddCiclo: onAddCiclo,
      onDeleteCiclo: onDeleteCiclo,
      onOpen: setModalColab,
      onOpenColabForm: setColabFormFor,
      onPrint: setPrintColab,
      onToast: toast
    }), view === "pdi" && /*#__PURE__*/React.createElement(window.PdiScreen, {
      colabs: ciclosView,
      onUpdateAction: onUpdateAction
    }), view === "form" && /*#__PURE__*/React.createElement(window.FormGestorScreen, {
      colabs: ciclosView,
      onSave: onSaveGestorForm,
      onToast: toast
    })), /*#__PURE__*/React.createElement(window.ComparisonModal, {
      colab: modalColab && findView(modalColab.id),
      open: !!modalColab,
      onClose: () => setModalColab(null),
      onOpenColabForm: c => {
        setModalColab(null);
        setColabFormFor(c);
      },
      onPrint: c => {
        setModalColab(null);
        setPrintColab(c);
      },
      onFinalize: onFinalize
    }), /*#__PURE__*/React.createElement(window.CicloPrintView, {
      colab: printColab,
      onClose: () => setPrintColab(null)
    }), /*#__PURE__*/React.createElement(window.ChangePasswordModal, {
      open: pwOpen,
      onClose: () => setPwOpen(false),
      onToast: toast,
      gestor: gestor,
      onUpdateGestor: onUpdateGestorSelf
    }), toastNode, renderTweaks());
  }
  window.GestorPanel = GestorPanel;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/ciclo/GestorPanel.jsx", error: String((e && e.message) || e) }); }

// ui_kits/ciclo/LoginScreen.jsx
try { (() => {
// Login do gestor (multi-gestor, cadastrado pelo RH) + troca de senha forçada no 1º acesso.
(function () {
  const NS = window.CicloDeDesenvolvimentoDesignSystem_cb4518;
  const {
    Card,
    Field,
    TextField,
    Button,
    Banner
  } = NS;
  const {
    Icon
  } = window.CicloHelpers;
  function Shell({
    logoSrc,
    children,
    subtitle
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        minHeight: "100vh",
        background: "var(--ab-azul-escuro)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: "100%",
        maxWidth: 420
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "center",
        marginBottom: 20
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: logoSrc,
      alt: "Grupo \xC1guia Branca \u2014 Divis\xE3o Com\xE9rcio",
      style: {
        height: 40
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        color: "rgba(255,255,255,.7)",
        fontSize: 13,
        marginTop: 12
      }
    }, "Ciclo de Desenvolvimento e Evolu\xE7\xE3o")), /*#__PURE__*/React.createElement("div", {
      style: {
        background: "#fff",
        borderRadius: "var(--radius-xl)",
        boxShadow: "var(--shadow-lg)",
        padding: 26
      }
    }, children), /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "center",
        color: "rgba(255,255,255,.5)",
        fontSize: 11,
        marginTop: 16
      }
    }, subtitle || "Acesso restrito à gestão")));
  }
  window.CicloShell = Shell;
  const RH_USERNAME = "pessoascultura.gabcomercio";
  const RH_DEFAULT_PASSWORD = "AguiaRH@2026";
  window.CICLO_RH_USERNAME = RH_USERNAME;

  // Login único: reconhece automaticamente se o usuário digitado é o do RH
  // (acesso administrativo) ou o de um gestor cadastrado (acesso escopado).
  // props: gestores, onUpdateGestor(id,patch), onAuthenticatedGestor(gestorId),
  //        rhAuth ({changed,password}|null), onUpdateRhAuth(newAuth), onAuthenticatedRh()
  function LoginScreen({
    logoSrc,
    gestores,
    onUpdateGestor,
    onAuthenticatedGestor,
    rhAuth,
    onUpdateRhAuth,
    onAuthenticatedRh
  }) {
    const [stage, setStage] = React.useState("login"); // login | change-gestor | change-rh
    const [user, setUser] = React.useState("");
    const [pass, setPass] = React.useState("");
    const [err, setErr] = React.useState("");
    const [np1, setNp1] = React.useState("");
    const [np2, setNp2] = React.useState("");
    const [pendingGestor, setPendingGestor] = React.useState(null);
    const submitLogin = e => {
      e && e.preventDefault();
      setErr("");
      const digitado = user.trim().toLowerCase();
      if (digitado === RH_USERNAME) {
        const auth = rhAuth || {
          changed: false,
          password: RH_DEFAULT_PASSWORD
        };
        if (pass !== auth.password && pass !== RH_DEFAULT_PASSWORD) {
          setErr("Senha incorreta.");
          return;
        }
        if (!auth.changed && pass === RH_DEFAULT_PASSWORD) {
          setStage("change-rh");
          return;
        }
        onAuthenticatedRh();
        return;
      }
      const g = (gestores || []).find(x => (x.usuario || "").toLowerCase() === digitado);
      if (!g) {
        setErr("Usuário não encontrado. Confira com o RH.");
        return;
      }
      if (g.desligado) {
        setErr("Este acesso foi desligado. Fale com o RH.");
        return;
      }
      if (pass !== g.senha) {
        setErr("Senha incorreta.");
        return;
      }
      if (!g.senhaAlterada) {
        setPendingGestor(g);
        setStage("change-gestor");
        return;
      }
      onAuthenticatedGestor(g.id);
    };
    const submitChangeGestor = e => {
      e && e.preventDefault();
      setErr("");
      if (np1.length < 6) {
        setErr("A nova senha deve ter ao menos 6 caracteres.");
        return;
      }
      if (np1 !== np2) {
        setErr("As senhas não coincidem.");
        return;
      }
      onUpdateGestor(pendingGestor.id, {
        senha: np1,
        senhaAlterada: true
      });
      onAuthenticatedGestor(pendingGestor.id);
    };
    const submitChangeRh = e => {
      e && e.preventDefault();
      setErr("");
      if (np1.length < 6) {
        setErr("A nova senha deve ter ao menos 6 caracteres.");
        return;
      }
      if (np1 !== np2) {
        setErr("As senhas não coincidem.");
        return;
      }
      onUpdateRhAuth({
        changed: true,
        password: np1
      });
      onAuthenticatedRh();
    };
    if (stage === "change-gestor" || stage === "change-rh") {
      const submit = stage === "change-rh" ? submitChangeRh : submitChangeGestor;
      return /*#__PURE__*/React.createElement(Shell, {
        logoSrc: logoSrc
      }, /*#__PURE__*/React.createElement("h2", {
        style: {
          fontSize: "var(--fs-h2)",
          color: "var(--ab-azul-escuro)",
          marginBottom: 6
        }
      }, "Defina sua nova senha"), /*#__PURE__*/React.createElement("p", {
        style: {
          fontSize: 13,
          color: "var(--text-muted)",
          marginBottom: 18
        }
      }, "Por seguran\xE7a, \xE9 necess\xE1rio trocar a senha padr\xE3o no primeiro acesso."), /*#__PURE__*/React.createElement("form", {
        onSubmit: submit,
        style: {
          display: "flex",
          flexDirection: "column",
          gap: 14
        }
      }, /*#__PURE__*/React.createElement(Field, {
        label: "Nova senha"
      }, /*#__PURE__*/React.createElement(TextField, {
        type: "password",
        value: np1,
        onChange: e => setNp1(e.target.value),
        placeholder: "M\xEDnimo 6 caracteres",
        autoFocus: true
      })), /*#__PURE__*/React.createElement(Field, {
        label: "Confirmar nova senha"
      }, /*#__PURE__*/React.createElement(TextField, {
        type: "password",
        value: np2,
        onChange: e => setNp2(e.target.value),
        placeholder: "Repita a nova senha"
      })), err && /*#__PURE__*/React.createElement(Banner, {
        tone: "neutral",
        icon: /*#__PURE__*/React.createElement(Icon, {
          name: "alert-circle",
          size: 16,
          color: "var(--danger)"
        }),
        style: {
          borderColor: "var(--danger)"
        }
      }, err), /*#__PURE__*/React.createElement(Button, {
        type: "submit",
        variant: "primary",
        full: true,
        iconLeft: /*#__PURE__*/React.createElement(Icon, {
          name: "shield-check",
          size: 16
        })
      }, "Salvar e Entrar")));
    }
    return /*#__PURE__*/React.createElement(Shell, {
      logoSrc: logoSrc
    }, /*#__PURE__*/React.createElement("h2", {
      style: {
        fontSize: "var(--fs-h2)",
        color: "var(--ab-azul-escuro)",
        marginBottom: 6
      }
    }, "Entrar"), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 13,
        color: "var(--text-muted)",
        marginBottom: 18
      }
    }, "Painel de gest\xE3o do Ciclo de Desenvolvimento."), /*#__PURE__*/React.createElement("form", {
      onSubmit: submitLogin,
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 14
      }
    }, /*#__PURE__*/React.createElement(Field, {
      label: "Usu\xE1rio"
    }, /*#__PURE__*/React.createElement(TextField, {
      value: user,
      onChange: e => setUser(e.target.value),
      placeholder: "Recebido do RH",
      autoFocus: true
    })), /*#__PURE__*/React.createElement(Field, {
      label: "Senha"
    }, /*#__PURE__*/React.createElement(TextField, {
      type: "password",
      value: pass,
      onChange: e => setPass(e.target.value),
      placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
    })), err && /*#__PURE__*/React.createElement(Banner, {
      tone: "neutral",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "alert-circle",
        size: 16,
        color: "var(--danger)"
      }),
      style: {
        borderColor: "var(--danger)"
      }
    }, err), /*#__PURE__*/React.createElement(Button, {
      type: "submit",
      variant: "primary",
      full: true,
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        name: "log-in",
        size: 16
      })
    }, "Entrar")), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 16,
        padding: "10px 12px",
        background: "var(--surface-brand-soft)",
        borderRadius: "var(--radius-sm)",
        fontSize: 12,
        color: "var(--ab-azul-escuro)"
      }
    }, "Colaborador de RH ou gestor(a): use o usu\xE1rio e senha recebidos. D\xFAvidas, fale com ", /*#__PURE__*/React.createElement("strong", null, "Pessoas & Cultura"), "."));
  }
  window.LoginScreen = LoginScreen;

  // Modal para o gestor alterar a própria senha a qualquer momento (após login).
  function ChangePasswordModal({
    open,
    onClose,
    onToast,
    gestor,
    onUpdateGestor
  }) {
    const [cur, setCur] = React.useState("");
    const [np1, setNp1] = React.useState("");
    const [np2, setNp2] = React.useState("");
    const [err, setErr] = React.useState("");
    React.useEffect(() => {
      if (open) {
        setCur("");
        setNp1("");
        setNp2("");
        setErr("");
      }
    }, [open]);
    if (!open || !gestor) return null;
    const submit = e => {
      e && e.preventDefault();
      setErr("");
      if (cur !== gestor.senha) {
        setErr("Senha atual incorreta.");
        return;
      }
      if (np1.length < 6) {
        setErr("A nova senha deve ter ao menos 6 caracteres.");
        return;
      }
      if (np1 !== np2) {
        setErr("As senhas não coincidem.");
        return;
      }
      if (np1 === cur) {
        setErr("A nova senha deve ser diferente da atual.");
        return;
      }
      onUpdateGestor(gestor.id, {
        senha: np1,
        senhaAlterada: true
      });
      onToast && onToast("Senha alterada com sucesso!", "success");
      onClose && onClose();
    };
    return /*#__PURE__*/React.createElement("div", {
      onClick: onClose,
      style: {
        position: "fixed",
        inset: 0,
        background: "rgba(15,32,58,.55)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        zIndex: 60
      }
    }, /*#__PURE__*/React.createElement("div", {
      onClick: e => e.stopPropagation(),
      style: {
        background: "#fff",
        borderRadius: "var(--radius-xl)",
        boxShadow: "var(--shadow-lg)",
        padding: 26,
        width: "100%",
        maxWidth: 420
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        marginBottom: 6
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "key-round",
      size: 20,
      color: "var(--ab-azul-escuro)"
    }), /*#__PURE__*/React.createElement("h2", {
      style: {
        fontSize: "var(--fs-h2)",
        color: "var(--ab-azul-escuro)",
        margin: 0
      }
    }, "Alterar senha")), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 13,
        color: "var(--text-muted)",
        marginBottom: 18
      }
    }, "Defina uma nova senha de acesso ao painel de gest\xE3o."), /*#__PURE__*/React.createElement("form", {
      onSubmit: submit,
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 14
      }
    }, /*#__PURE__*/React.createElement(Field, {
      label: "Senha atual"
    }, /*#__PURE__*/React.createElement(TextField, {
      type: "password",
      value: cur,
      onChange: e => setCur(e.target.value),
      placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",
      autoFocus: true
    })), /*#__PURE__*/React.createElement(Field, {
      label: "Nova senha"
    }, /*#__PURE__*/React.createElement(TextField, {
      type: "password",
      value: np1,
      onChange: e => setNp1(e.target.value),
      placeholder: "M\xEDnimo 6 caracteres"
    })), /*#__PURE__*/React.createElement(Field, {
      label: "Confirmar nova senha"
    }, /*#__PURE__*/React.createElement(TextField, {
      type: "password",
      value: np2,
      onChange: e => setNp2(e.target.value),
      placeholder: "Repita a nova senha"
    })), err && /*#__PURE__*/React.createElement(Banner, {
      tone: "neutral",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "alert-circle",
        size: 16,
        color: "var(--danger)"
      }),
      style: {
        borderColor: "var(--danger)"
      }
    }, err), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 10,
        justifyContent: "flex-end",
        marginTop: 4
      }
    }, /*#__PURE__*/React.createElement(Button, {
      type: "button",
      variant: "ghost",
      onClick: onClose
    }, "Cancelar"), /*#__PURE__*/React.createElement(Button, {
      type: "submit",
      variant: "primary",
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        name: "shield-check",
        size: 16
      })
    }, "Salvar nova senha")))));
  }
  window.ChangePasswordModal = ChangePasswordModal;

  // Gate de acesso do colaborador — sem login, apenas senha do link gerado. (Inalterado.)
  function ColabGate({
    colab,
    logoSrc,
    onUnlock
  }) {
    const [pin, setPin] = React.useState("");
    const [err, setErr] = React.useState("");
    const submit = e => {
      e && e.preventDefault();
      if (pin.trim() === String(colab.acesso)) {
        onUnlock();
      } else {
        setErr("Senha de acesso incorreta. Confira com seu gestor.");
      }
    };
    return /*#__PURE__*/React.createElement(Shell, {
      logoSrc: logoSrc
    }, /*#__PURE__*/React.createElement("h2", {
      style: {
        fontSize: "var(--fs-h2)",
        color: "var(--ab-azul-escuro)",
        marginBottom: 6
      }
    }, "Ol\xE1, ", colab.nome.split(" ")[0], "!"), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: 13,
        color: "var(--text-muted)",
        marginBottom: 18
      }
    }, "Para acessar o seu formul\xE1rio do Ciclo de Desenvolvimento e Evolu\xE7\xE3o, informe a ", /*#__PURE__*/React.createElement("strong", null, "senha de acesso"), " enviada junto com o seu link."), /*#__PURE__*/React.createElement("form", {
      onSubmit: submit,
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 14
      }
    }, /*#__PURE__*/React.createElement(Field, {
      label: "Senha de acesso"
    }, /*#__PURE__*/React.createElement(TextField, {
      value: pin,
      onChange: e => {
        setPin(e.target.value);
        setErr("");
      },
      placeholder: "Ex: 4700",
      autoFocus: true
    })), err && /*#__PURE__*/React.createElement(Banner, {
      tone: "neutral",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "alert-circle",
        size: 16,
        color: "var(--danger)"
      }),
      style: {
        borderColor: "var(--danger)"
      }
    }, err), /*#__PURE__*/React.createElement(Button, {
      type: "submit",
      variant: "primary",
      full: true,
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        name: "unlock",
        size: 16
      })
    }, "Acessar meu formul\xE1rio")));
  }
  window.ColabGate = ColabGate;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/ciclo/LoginScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/ciclo/PdiScreen.jsx
try { (() => {
// Aba PDI — acompanhamento do PDI técnico e comportamental por colaborador.
(function () {
  const NS = window.CicloDeDesenvolvimentoDesignSystem_cb4518;
  const {
    Card,
    MetricCard,
    Select,
    Field,
    StatusBadge,
    Avatar,
    Banner,
    DateField
  } = NS;
  const {
    Icon,
    fmtDate,
    prazoFinal,
    pdiStats
  } = window.CicloHelpers;
  function countActions(c) {
    const g = c.gestorForm || {};
    return (g.rowsTec || []).length + (g.rowsComp || []).length;
  }

  // Tabela de acompanhamento: Ação · Data Acordada · Realizada? · Data de Conclusão
  function AcaoTable({
    rows,
    tipo,
    colabId,
    onUpdate,
    locked
  }) {
    if (!rows || !rows.length) {
      return /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 12,
          color: "var(--text-muted)"
        }
      }, "Nenhuma a\xE7\xE3o registrada.");
    }
    const cols = "1fr 118px 96px 150px";
    const head = {
      fontSize: "var(--fs-label)",
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: ".03em",
      color: "var(--ab-azul-escuro)"
    };
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: cols,
        gap: 8,
        marginBottom: 6,
        alignItems: "end"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: head
    }, "A\xE7\xE3o"), /*#__PURE__*/React.createElement("span", {
      style: {
        ...head,
        color: "var(--ab-laranja-600)"
      }
    }, "Data Acordada"), /*#__PURE__*/React.createElement("span", {
      style: {
        ...head,
        textAlign: "center"
      }
    }, "Realizada"), /*#__PURE__*/React.createElement("span", {
      style: head
    }, "Data de Conclus\xE3o")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 8
      }
    }, rows.map((r, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: "grid",
        gridTemplateColumns: cols,
        gap: 8,
        alignItems: "center",
        padding: "8px 10px",
        borderRadius: "var(--radius-sm)",
        background: r.done ? "var(--positive-bg)" : "var(--ab-gray-50)",
        border: "1px solid " + (r.done ? "var(--positive)" : "var(--border-subtle)")
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 13,
        color: "var(--text-strong)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontWeight: 600
      }
    }, r.acao || "—"), r.desdobramento && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11.5,
        color: "var(--text-muted)",
        marginTop: 2
      }
    }, r.desdobramento)), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12.5,
        fontWeight: 700,
        color: "var(--ab-laranja-600)"
      }
    }, fmtDate(r.data)), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "center"
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => !locked && onUpdate(colabId, tipo, i, r.done ? {
        done: false,
        doneDate: ""
      } : {
        done: true,
        doneDate: r.doneDate || new Date().toISOString().slice(0, 10)
      }),
      disabled: locked,
      title: r.done ? "Marcar como não realizada" : "Marcar como realizada",
      style: {
        width: 26,
        height: 26,
        borderRadius: 6,
        cursor: locked ? "default" : "pointer",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1.5px solid " + (r.done ? "var(--positive)" : "var(--border-default)"),
        background: r.done ? "var(--positive)" : "#fff",
        color: "#fff",
        padding: 0
      }
    }, r.done && /*#__PURE__*/React.createElement(Icon, {
      name: "check",
      size: 15,
      color: "#fff"
    }))), /*#__PURE__*/React.createElement("div", null, r.done ? /*#__PURE__*/React.createElement(DateField, {
      value: r.doneDate || "",
      disabled: locked,
      onChange: e => onUpdate(colabId, tipo, i, {
        done: true,
        doneDate: e.target.value
      }),
      style: {
        height: 34
      }
    }) : /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: "var(--text-muted)"
      }
    }, "\u2014"))))));
  }
  window.AcaoTable = AcaoTable;
  function PdiScreen({
    colabs,
    onUpdateAction
  }) {
    const withPdi = colabs.filter(c => countActions(c) > 0);
    const [sel, setSel] = React.useState("todos");
    const list = sel === "todos" ? withPdi : withPdi.filter(c => c.id === sel);
    const s = pdiStats(sel === "todos" ? withPdi : list);
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 16
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 14
      }
    }, /*#__PURE__*/React.createElement(MetricCard, {
      value: s.tecTotal,
      label: "PDIs T\xE9cnicos Cadastrados",
      tone: "default",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "wrench",
        size: 20
      })
    }), /*#__PURE__*/React.createElement(MetricCard, {
      value: s.tecDone,
      label: "A\xE7\xF5es T\xE9cnicas Conclu\xEDdas",
      tone: "completo",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "check-circle-2",
        size: 20
      })
    }), /*#__PURE__*/React.createElement(MetricCard, {
      value: s.compTotal,
      label: "PDIs Comportamentais",
      tone: "default",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "brain",
        size: 20
      })
    }), /*#__PURE__*/React.createElement(MetricCard, {
      value: s.tecPct + "%",
      label: "Conclus\xE3o T\xE9cnica",
      tone: "accent",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "trending-up",
        size: 20
      })
    })), /*#__PURE__*/React.createElement(Card, {
      title: "Acompanhamento de PDI",
      action: /*#__PURE__*/React.createElement(Icon, {
        name: "route",
        size: 18,
        color: "var(--ab-azul-claro)"
      })
    }, /*#__PURE__*/React.createElement(Banner, {
      tone: "info",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "info",
        size: 16
      }),
      style: {
        marginBottom: 14
      }
    }, "Planos de Desenvolvimento Individual acordados no ciclo. O ", /*#__PURE__*/React.createElement("strong", null, "colaborador"), " atualiza cada a\xE7\xE3o como realizada e registra a ", /*#__PURE__*/React.createElement("strong", null, "data de conclus\xE3o"), " pelo link dele; o ", /*#__PURE__*/React.createElement("strong", null, "gestor"), " acompanha o progresso aqui."), /*#__PURE__*/React.createElement(Field, {
      label: "Colaborador"
    }, /*#__PURE__*/React.createElement(Select, {
      value: sel,
      onChange: e => setSel(e.target.value)
    }, /*#__PURE__*/React.createElement("option", {
      value: "todos"
    }, "Todos os colaboradores (", withPdi.length, ")"), withPdi.map(c => /*#__PURE__*/React.createElement("option", {
      key: c.id,
      value: c.id
    }, c.nome, " \u2014 ", c.revenda))))), list.length === 0 && /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "center",
        padding: 30,
        color: "var(--text-muted)"
      }
    }, "Nenhum PDI registrado ainda.")), list.map(c => {
      const g = c.gestorForm || {};
      return /*#__PURE__*/React.createElement(Card, {
        key: c.id
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 4,
          flexWrap: "wrap"
        }
      }, /*#__PURE__*/React.createElement(Avatar, {
        name: c.nome,
        size: 36
      }), /*#__PURE__*/React.createElement("div", {
        style: {
          flex: 1,
          minWidth: 0
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          fontWeight: 700,
          fontSize: 15
        }
      }, c.nome), /*#__PURE__*/React.createElement("div", {
        style: {
          fontSize: 12,
          color: "var(--text-muted)"
        }
      }, c.revenda, " \xB7 ", c.cicloNum, " \xB7 prazo ", fmtDate(prazoFinal(c)))), c.encerrado ? /*#__PURE__*/React.createElement(StatusBadge, {
        status: "completo",
        label: "Ciclo Encerrado"
      }) : /*#__PURE__*/React.createElement(StatusBadge, {
        status: "parcial",
        label: "Em Andamento"
      })), c.alvo && /*#__PURE__*/React.createElement(Banner, {
        tone: "accent",
        icon: /*#__PURE__*/React.createElement(Icon, {
          name: "target",
          size: 15
        }),
        title: "Alvo",
        style: {
          marginTop: 4
        }
      }, c.alvo), /*#__PURE__*/React.createElement("div", {
        style: {
          marginTop: 14
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 7,
          marginBottom: 8,
          fontSize: "var(--fs-label)",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: ".05em",
          color: "var(--ab-azul-escuro)"
        }
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "wrench",
        size: 14,
        color: "var(--ab-azul-claro)"
      }), " PDI T\xE9cnico"), /*#__PURE__*/React.createElement(AcaoTable, {
        rows: g.rowsTec,
        tipo: "tec",
        colabId: c.id,
        onUpdate: onUpdateAction,
        locked: true
      })), /*#__PURE__*/React.createElement("div", {
        style: {
          marginTop: 16
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: 7,
          marginBottom: 8,
          fontSize: "var(--fs-label)",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: ".05em",
          color: "var(--ab-azul-escuro)"
        }
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "brain",
        size: 14,
        color: "var(--ab-laranja)"
      }), " PDI Comportamental"), /*#__PURE__*/React.createElement(AcaoTable, {
        rows: g.rowsComp,
        tipo: "comp",
        colabId: c.id,
        onUpdate: onUpdateAction,
        locked: true
      })));
    }));
  }
  window.PdiScreen = PdiScreen;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/ciclo/PdiScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/ciclo/RhAdminApp.jsx
try { (() => {
// Painel do RH — shell com abas: Dashboard Geral, Gestores, Colaboradores, Histórico.
(function () {
  const NS = window.CicloDeDesenvolvimentoDesignSystem_cb4518;
  const {
    AppHeader,
    Toast,
    Card,
    Avatar
  } = NS;
  const {
    Icon,
    fmtDate
  } = window.CicloHelpers;
  function HistoricoScreen({
    auditLog
  }) {
    const log = auditLog || [];
    return /*#__PURE__*/React.createElement(Card, {
      title: `Histórico de Alterações (${log.length})`
    }, log.length === 0 ? /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "center",
        padding: 30,
        color: "var(--text-muted)",
        fontSize: 13
      }
    }, "Nenhuma a\xE7\xE3o registrada ainda.") : /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 8,
        maxHeight: 640,
        overflowY: "auto"
      }
    }, log.slice(0, 200).map(a => /*#__PURE__*/React.createElement("div", {
      key: a.id,
      style: {
        display: "flex",
        gap: 12,
        alignItems: "flex-start",
        padding: "10px 12px",
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-sm)"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: a.acao === "excluir" ? "trash-2" : a.acao === "criar" ? "plus-circle" : a.acao === "importar" ? "upload" : "pencil",
      size: 16,
      color: "var(--ab-azul-claro)",
      style: {
        marginTop: 2
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        fontSize: 13
      }
    }, /*#__PURE__*/React.createElement("strong", null, a.ator), " ", a.acao === "criar" ? "cadastrou" : a.acao === "editar" ? "editou" : a.acao === "excluir" ? "excluiu" : "importou", " ", a.tipo === "gestor" ? "o gestor" : a.tipo === "funcionario" ? "o colaborador" : "o ciclo", " ", /*#__PURE__*/React.createElement("strong", null, a.alvo), a.detalhe && /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--text-muted)"
      }
    }, " \u2014 ", a.detalhe)), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        color: "var(--text-muted)",
        whiteSpace: "nowrap"
      }
    }, new Date(a.ts).toLocaleString("pt-BR"))))));
  }
  function RhAdminApp({
    logoSrc,
    gestores,
    funcionarios,
    ciclosView,
    auditLog,
    catalogos,
    onAddCatalogoItem,
    onAddGestor,
    onUpdateGestor,
    onDeleteGestor,
    onImportGestoresBulk,
    onAddFuncionario,
    onDeleteFuncionario,
    onImportFuncionariosBulk,
    onChangePassword,
    onLogout,
    rhAuth,
    onUpdateRhAuth
  }) {
    const [view, setView] = React.useState("dashboard");
    const [pwOpen, setPwOpen] = React.useState(false);
    const [toastState, setToastState] = React.useState({
      open: false,
      message: "",
      tone: "default"
    });
    const toastTimer = React.useRef(null);
    const toast = React.useCallback((message, tone = "default") => {
      setToastState({
        open: true,
        message,
        tone
      });
      clearTimeout(toastTimer.current);
      toastTimer.current = setTimeout(() => setToastState(s => ({
        ...s,
        open: false
      })), 3600);
    }, []);
    return /*#__PURE__*/React.createElement("div", {
      style: {
        minHeight: "100vh",
        background: "var(--surface-canvas)"
      }
    }, /*#__PURE__*/React.createElement(AppHeader, {
      logoSrc: logoSrc,
      productName: "Ciclo de Desenvolvimento \u2014 Painel do RH",
      active: view,
      onSelect: setView,
      tabs: [{
        id: "dashboard",
        label: "Visão Geral",
        icon: /*#__PURE__*/React.createElement(Icon, {
          name: "layout-dashboard",
          size: 15
        })
      }, {
        id: "gestores",
        label: "Gestores",
        icon: /*#__PURE__*/React.createElement(Icon, {
          name: "shield",
          size: 15
        })
      }, {
        id: "colaboradores",
        label: "Colaboradores",
        icon: /*#__PURE__*/React.createElement(Icon, {
          name: "users",
          size: 15
        })
      }, {
        id: "historico",
        label: "Histórico",
        icon: /*#__PURE__*/React.createElement(Icon, {
          name: "history",
          size: 15
        })
      }],
      right: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
        onClick: () => setPwOpen(true),
        title: "Alterar senha",
        style: {
          border: "none",
          background: "transparent",
          color: "rgba(255,255,255,.72)",
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          fontSize: 12
        }
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "key-round",
        size: 15
      })), /*#__PURE__*/React.createElement("button", {
        onClick: onLogout,
        title: "Sair",
        style: {
          marginLeft: 8,
          border: "none",
          background: "transparent",
          color: "rgba(255,255,255,.72)",
          cursor: "pointer",
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          fontSize: 12
        }
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "log-out",
        size: 15
      })))
    }), /*#__PURE__*/React.createElement("main", {
      style: {
        maxWidth: "var(--container-max)",
        margin: "0 auto",
        padding: "24px"
      }
    }, view === "dashboard" && /*#__PURE__*/React.createElement(RhDashboardScreen, {
      colabs: ciclosView,
      gestores: gestores,
      funcionarios: funcionarios
    }), view === "gestores" && /*#__PURE__*/React.createElement(window.RhGestoresScreen, {
      gestores: gestores,
      funcionarios: funcionarios,
      catalogos: catalogos,
      onAddCatalogoItem: onAddCatalogoItem,
      onAdd: onAddGestor,
      onUpdate: onUpdateGestor,
      onDelete: onDeleteGestor,
      onImportBulk: onImportGestoresBulk,
      onToast: toast
    }), view === "colaboradores" && /*#__PURE__*/React.createElement(window.RhColaboradoresScreen, {
      funcionarios: funcionarios,
      gestores: gestores,
      ciclos: ciclosView,
      catalogos: catalogos,
      onAddCatalogoItem: onAddCatalogoItem,
      onAdd: onAddFuncionario,
      onDelete: onDeleteFuncionario,
      onImportBulk: onImportFuncionariosBulk,
      onToast: toast
    }), view === "historico" && /*#__PURE__*/React.createElement(HistoricoScreen, {
      auditLog: auditLog
    })), /*#__PURE__*/React.createElement(window.RhChangePasswordModal, {
      open: pwOpen,
      onClose: () => setPwOpen(false),
      onToast: toast,
      rhAuth: rhAuth,
      onUpdateAuth: onUpdateRhAuth
    }), /*#__PURE__*/React.createElement(Toast, {
      open: toastState.open,
      message: toastState.message,
      tone: toastState.tone
    }));
  }
  window.RhAdminApp = RhAdminApp;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/ciclo/RhAdminApp.jsx", error: String((e && e.message) || e) }); }

// ui_kits/ciclo/RhAuth.jsx
try { (() => {
// Troca de senha da administração do RH (login em si acontece pelo LoginScreen unificado).
(function () {
  const NS = window.CicloDeDesenvolvimentoDesignSystem_cb4518;
  const {
    Field,
    TextField,
    Button,
    Banner
  } = NS;
  const {
    Icon
  } = window.CicloHelpers;
  const DEFAULT_PASSWORD = "AguiaRH@2026";
  function RhChangePasswordModal({
    open,
    onClose,
    onToast,
    rhAuth,
    onUpdateAuth
  }) {
    const [cur, setCur] = React.useState("");
    const [np1, setNp1] = React.useState("");
    const [np2, setNp2] = React.useState("");
    const [err, setErr] = React.useState("");
    React.useEffect(() => {
      if (open) {
        setCur("");
        setNp1("");
        setNp2("");
        setErr("");
      }
    }, [open]);
    if (!open) return null;
    const auth = rhAuth || {
      changed: false,
      password: DEFAULT_PASSWORD
    };
    const submit = e => {
      e && e.preventDefault();
      setErr("");
      if (cur !== auth.password) {
        setErr("Senha atual incorreta.");
        return;
      }
      if (np1.length < 6) {
        setErr("A nova senha deve ter ao menos 6 caracteres.");
        return;
      }
      if (np1 !== np2) {
        setErr("As senhas não coincidem.");
        return;
      }
      onUpdateAuth({
        changed: true,
        password: np1
      });
      onToast && onToast("Senha do RH alterada com sucesso!", "success");
      onClose && onClose();
    };
    return /*#__PURE__*/React.createElement("div", {
      onClick: onClose,
      style: {
        position: "fixed",
        inset: 0,
        background: "rgba(15,32,58,.55)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        zIndex: 60
      }
    }, /*#__PURE__*/React.createElement("div", {
      onClick: e => e.stopPropagation(),
      style: {
        background: "#fff",
        borderRadius: "var(--radius-xl)",
        boxShadow: "var(--shadow-lg)",
        padding: 26,
        width: "100%",
        maxWidth: 420
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        marginBottom: 6
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "key-round",
      size: 20,
      color: "var(--ab-azul-escuro)"
    }), /*#__PURE__*/React.createElement("h2", {
      style: {
        fontSize: "var(--fs-h2)",
        color: "var(--ab-azul-escuro)",
        margin: 0
      }
    }, "Alterar senha do RH")), /*#__PURE__*/React.createElement("form", {
      onSubmit: submit,
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 14,
        marginTop: 18
      }
    }, /*#__PURE__*/React.createElement(Field, {
      label: "Senha atual"
    }, /*#__PURE__*/React.createElement(TextField, {
      type: "password",
      value: cur,
      onChange: e => setCur(e.target.value),
      autoFocus: true
    })), /*#__PURE__*/React.createElement(Field, {
      label: "Nova senha"
    }, /*#__PURE__*/React.createElement(TextField, {
      type: "password",
      value: np1,
      onChange: e => setNp1(e.target.value),
      placeholder: "M\xEDnimo 6 caracteres"
    })), /*#__PURE__*/React.createElement(Field, {
      label: "Confirmar nova senha"
    }, /*#__PURE__*/React.createElement(TextField, {
      type: "password",
      value: np2,
      onChange: e => setNp2(e.target.value)
    })), err && /*#__PURE__*/React.createElement(Banner, {
      tone: "neutral",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "alert-circle",
        size: 16,
        color: "var(--danger)"
      }),
      style: {
        borderColor: "var(--danger)"
      }
    }, err), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 10,
        justifyContent: "flex-end",
        marginTop: 4
      }
    }, /*#__PURE__*/React.createElement(Button, {
      type: "button",
      variant: "ghost",
      onClick: onClose
    }, "Cancelar"), /*#__PURE__*/React.createElement(Button, {
      type: "submit",
      variant: "primary",
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        name: "shield-check",
        size: 16
      })
    }, "Salvar nova senha")))));
  }
  window.RhChangePasswordModal = RhChangePasswordModal;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/ciclo/RhAuth.jsx", error: String((e && e.message) || e) }); }

// ui_kits/ciclo/RhColaboradoresScreen.jsx
try { (() => {
// RH — visão geral de todos os colaboradores (de todos os gestores) + cadastro e importação em massa.
(function () {
  const NS = window.CicloDeDesenvolvimentoDesignSystem_cb4518;
  const {
    Card,
    FormGrid,
    Field,
    TextField,
    Select,
    Button,
    Avatar,
    Banner,
    StatusBadge
  } = NS;
  const {
    Icon,
    fmtDate,
    tempoEmpresa,
    EditableSelect,
    parseDataBR
  } = window.CicloHelpers;
  const HEADERS = ["Nome", "Usuário do Gestor", "Cargo", "Departamento", "Diretoria | Negócios", "Setor", "Regional", "Admissão (DD/MM/AAAA)", "WhatsApp"];
  function RhColaboradoresScreen({
    funcionarios,
    gestores,
    ciclos,
    catalogos,
    onAddCatalogoItem,
    onAdd,
    onUpdate,
    onDelete,
    onImportBulk,
    onToast
  }) {
    const cat = catalogos || {
      regionais: [],
      diretorias: [],
      departamentos: [],
      setores: [],
      unidades: []
    };
    const gestoresAtivos = (gestores || []).filter(g => !g.desligado).slice().sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));
    const empty = {
      nome: "",
      gestorId: gestoresAtivos[0] ? gestoresAtivos[0].id : "",
      admissao: "",
      departamento: "",
      cargo: "",
      diretoria: "",
      setor: "",
      regional: "",
      whatsapp: ""
    };
    const [f, setF] = React.useState(empty);
    const set = (k, v) => setF(s => ({
      ...s,
      [k]: v
    }));
    const [q, setQ] = React.useState("");
    const [filtroGestor, setFiltroGestor] = React.useState("");
    const fileRef = React.useRef(null);
    const [importando, setImportando] = React.useState(false);
    const gestorNome = gid => {
      const g = (gestores || []).find(x => x.id === gid);
      return g ? g.nome : "—";
    };
    const ciclosDe = fid => (ciclos || []).filter(c => c.funcionarioId === fid).length;
    const cadastrar = () => {
      if (!f.nome.trim()) {
        onToast("Informe o nome completo do colaborador.", "danger");
        return;
      }
      if (!f.gestorId) {
        onToast("Selecione um gestor.", "danger");
        return;
      }
      if (!f.admissao) {
        onToast("Informe a data de admissão.", "danger");
        return;
      }
      if (!f.cargo.trim()) {
        onToast("Informe o cargo.", "danger");
        return;
      }
      if (!f.departamento.trim()) {
        onToast("Informe o Departamento.", "danger");
        return;
      }
      if (!f.diretoria) {
        onToast("Selecione a Diretoria | Negócios.", "danger");
        return;
      }
      if (!f.setor) {
        onToast("Selecione o Setor.", "danger");
        return;
      }
      if (!f.regional) {
        onToast("Selecione a Regional.", "danger");
        return;
      }
      if (!f.whatsapp.trim()) {
        onToast("Informe o WhatsApp.", "danger");
        return;
      }
      onAdd({
        ...f
      });
      onToast(`${f.nome} cadastrado.`, "success");
      setF({
        ...empty,
        gestorId: f.gestorId
      });
    };
    const list = (funcionarios || []).filter(x => (!filtroGestor || x.gestorId === filtroGestor) && (!q || x.nome.toLowerCase().includes(q.toLowerCase()) || (x.cargo || "").toLowerCase().includes(q.toLowerCase()))).slice().sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));
    const baixarModelo = () => window.CicloBulk.downloadTemplate(HEADERS, "modelo-colaboradores.xlsx", ["Ex: João Silva", gestoresAtivos[0] ? gestoresAtivos[0].usuario : "usuario-do-gestor", "Consultor de Vendas", "Comércio", "Vitoria Motors Byd", "Adm Central De Vendas", "Byd Es", "01/03/2024", "(27) 99999-9999"]);
    const importar = async e => {
      const file = e.target.files[0];
      if (!file) return;
      setImportando(true);
      try {
        const rows = await window.CicloBulk.parseFile(file);
        let ok = 0,
          semGestor = 0,
          semNome = 0,
          dataInvalida = 0;
        rows.forEach(r => {
          const nome = String(r["Nome"] || "").trim();
          if (!nome) {
            semNome++;
            return;
          }
          const usuarioGestor = String(r["Usuário do Gestor"] || "").trim().toLowerCase();
          const gestor = (gestores || []).find(g => (g.usuario || "").toLowerCase() === usuarioGestor);
          if (!gestor) {
            semGestor++;
            return;
          }
          const admissao = parseDataBR(r["Admissão (DD/MM/AAAA)"]);
          if (r["Admissão (DD/MM/AAAA)"] && !admissao) dataInvalida++;
          onAdd({
            nome,
            gestorId: gestor.id,
            cargo: String(r["Cargo"] || ""),
            departamento: String(r["Departamento"] || ""),
            diretoria: String(r["Diretoria | Negócios"] || ""),
            setor: String(r["Setor"] || ""),
            regional: String(r["Regional"] || ""),
            admissao,
            whatsapp: String(r["WhatsApp"] || "")
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
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "16px"
      }
    }, /*#__PURE__*/React.createElement(Card, {
      title: "Cadastrar Colaborador",
      action: /*#__PURE__*/React.createElement(Icon, {
        name: "user-plus",
        size: 18,
        color: "var(--ab-azul-claro)"
      })
    }, gestoresAtivos.length === 0 ? /*#__PURE__*/React.createElement(Banner, {
      tone: "accent",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "alert-circle",
        size: 16
      })
    }, "Cadastre ao menos um gestor antes de adicionar colaboradores.") : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(FormGrid, {
      columns: 3
    }, /*#__PURE__*/React.createElement(Field, {
      label: "Nome Completo",
      required: true
    }, /*#__PURE__*/React.createElement(TextField, {
      placeholder: "Nome completo",
      value: f.nome,
      onChange: e => set("nome", e.target.value)
    })), /*#__PURE__*/React.createElement(Field, {
      label: "Gestor",
      required: true
    }, /*#__PURE__*/React.createElement(Select, {
      value: f.gestorId,
      onChange: e => set("gestorId", e.target.value)
    }, gestoresAtivos.map(g => /*#__PURE__*/React.createElement("option", {
      key: g.id,
      value: g.id
    }, g.nome, g.diretoria ? ` — ${g.diretoria}` : "")))), /*#__PURE__*/React.createElement(Field, {
      label: "Data de Admiss\xE3o",
      required: true
    }, /*#__PURE__*/React.createElement(TextField, {
      type: "date",
      value: f.admissao,
      onChange: e => set("admissao", e.target.value)
    })), /*#__PURE__*/React.createElement(Field, {
      label: "Cargo",
      required: true
    }, /*#__PURE__*/React.createElement(TextField, {
      placeholder: "Ex: Consultor de Vendas",
      value: f.cargo,
      onChange: e => set("cargo", e.target.value)
    })), /*#__PURE__*/React.createElement(Field, {
      label: "Departamento",
      required: true
    }, /*#__PURE__*/React.createElement(TextField, {
      placeholder: "Ex: Com\xE9rcio",
      value: f.departamento,
      onChange: e => set("departamento", e.target.value)
    })), /*#__PURE__*/React.createElement(Field, {
      label: "Diretoria | Neg\xF3cios",
      required: true
    }, /*#__PURE__*/React.createElement(EditableSelect, {
      value: f.diretoria,
      options: cat.diretorias,
      onChange: v => set("diretoria", v),
      onAddOption: v => onAddCatalogoItem("diretorias", v),
      placeholder: "Nova diretoria"
    })), /*#__PURE__*/React.createElement(Field, {
      label: "Setor",
      required: true
    }, /*#__PURE__*/React.createElement(EditableSelect, {
      value: f.setor,
      options: cat.setores,
      onChange: v => set("setor", v),
      onAddOption: v => onAddCatalogoItem("setores", v),
      placeholder: "Novo setor"
    })), /*#__PURE__*/React.createElement(Field, {
      label: "Regional",
      required: true
    }, /*#__PURE__*/React.createElement(EditableSelect, {
      value: f.regional,
      options: cat.regionais,
      onChange: v => set("regional", v),
      onAddOption: v => onAddCatalogoItem("regionais", v),
      placeholder: "Nova regional"
    })), /*#__PURE__*/React.createElement(Field, {
      label: "WhatsApp",
      required: true,
      hint: "Com DDD."
    }, /*#__PURE__*/React.createElement(TextField, {
      placeholder: "(27) 99999-9999",
      value: f.whatsapp,
      onChange: e => set("whatsapp", e.target.value)
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "flex-end",
        marginTop: 18
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "accent",
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        name: "user-check",
        size: 15
      }),
      onClick: cadastrar
    }, "Cadastrar Colaborador")))), /*#__PURE__*/React.createElement(Card, {
      title: "Importa\xE7\xE3o em massa",
      action: /*#__PURE__*/React.createElement(Icon, {
        name: "upload",
        size: 18,
        color: "var(--ab-azul-claro)"
      })
    }, /*#__PURE__*/React.createElement(Banner, {
      tone: "info",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "info",
        size: 16
      }),
      style: {
        marginBottom: 14
      }
    }, "A coluna ", /*#__PURE__*/React.createElement("strong", null, "Usu\xE1rio do Gestor"), " deve corresponder ao login j\xE1 cadastrado do gestor (veja na aba Gestores). A data de admiss\xE3o aceita o formato ", /*#__PURE__*/React.createElement("strong", null, "DD/MM/AAAA"), "."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 10,
        flexWrap: "wrap"
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        name: "file-down",
        size: 15
      }),
      onClick: baixarModelo
    }, "Baixar modelo (Excel)"), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        name: "upload",
        size: 15
      }),
      onClick: () => fileRef.current && fileRef.current.click(),
      disabled: importando
    }, importando ? "Importando..." : "Importar planilha"), /*#__PURE__*/React.createElement("input", {
      ref: fileRef,
      type: "file",
      accept: ".xlsx,.xls,.csv",
      onChange: importar,
      style: {
        display: "none"
      }
    }))), /*#__PURE__*/React.createElement(Card, {
      title: `Todos os Colaboradores (${list.length})`
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 10,
        marginBottom: 16,
        flexWrap: "wrap"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative",
        flex: 2,
        minWidth: 220
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        position: "absolute",
        left: 10,
        top: "50%",
        transform: "translateY(-50%)",
        color: "var(--text-muted)",
        pointerEvents: "none"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "search",
      size: 15
    })), /*#__PURE__*/React.createElement(TextField, {
      placeholder: "Buscar por nome ou cargo...",
      value: q,
      onChange: e => setQ(e.target.value),
      style: {
        paddingLeft: 32
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 180
      }
    }, /*#__PURE__*/React.createElement(Select, {
      value: filtroGestor,
      onChange: e => setFiltroGestor(e.target.value)
    }, /*#__PURE__*/React.createElement("option", {
      value: ""
    }, "Todos os gestores"), gestoresAtivos.map(g => /*#__PURE__*/React.createElement("option", {
      key: g.id,
      value: g.id
    }, g.nome))))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 12
      }
    }, list.length === 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "center",
        padding: 30,
        color: "var(--text-muted)",
        fontSize: 13
      }
    }, "Nenhum colaborador encontrado."), list.map(c => /*#__PURE__*/React.createElement("div", {
      key: c.id,
      style: {
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-lg)",
        padding: "14px 16px",
        display: "flex",
        gap: 14,
        alignItems: "flex-start",
        opacity: c.demitido ? 0.72 : 1
      }
    }, /*#__PURE__*/React.createElement(Avatar, {
      name: c.nome,
      size: 42,
      tone: c.demitido ? "soft" : "brand"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        flexWrap: "wrap"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 700,
        fontSize: 14
      }
    }, c.nome), c.cargo && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: "var(--text-muted)"
      }
    }, "\xB7 ", c.cargo), c.demitido ? /*#__PURE__*/React.createElement(StatusBadge, {
      status: "pendente",
      label: "Desligado"
    }) : /*#__PURE__*/React.createElement(StatusBadge, {
      status: "completo",
      label: "Ativo"
    }), ciclosDe(c.id) > 0 && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        color: "var(--ab-azul-escuro)",
        background: "var(--surface-brand-soft)",
        padding: "2px 8px",
        borderRadius: 999,
        fontWeight: 700
      }
    }, ciclosDe(c.id), " ciclo(s)")), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: "var(--text-muted)",
        marginTop: 4,
        display: "flex",
        gap: 14,
        flexWrap: "wrap"
      }
    }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", null, "Gestor:"), " ", gestorNome(c.gestorId)), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", null, "Depto:"), " ", c.departamento || "—"), c.diretoria && /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", null, "Diretoria | Neg\xF3cios:"), " ", c.diretoria), c.setor && /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", null, "Setor:"), " ", c.setor), c.regional && /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", null, "Regional:"), " ", c.regional), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", null, "Admiss\xE3o:"), " ", fmtDate(c.admissao)), /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--ab-azul-escuro)",
        fontWeight: 700
      }
    }, tempoEmpresa(c.admissao, c.demitido ? c.demissao : null)), c.demitido && /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--danger)",
        fontWeight: 700
      }
    }, /*#__PURE__*/React.createElement("strong", null, "Demiss\xE3o:"), " ", fmtDate(c.demissao))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 10,
        display: "flex",
        alignItems: "center",
        gap: 10,
        flexWrap: "wrap"
      }
    }, /*#__PURE__*/React.createElement("label", {
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 7,
        fontSize: 13,
        cursor: "pointer",
        color: "var(--text-body)"
      }
    }, /*#__PURE__*/React.createElement("input", {
      type: "checkbox",
      checked: !!c.demitido,
      onChange: e => onUpdate(c.id, e.target.checked ? {
        demitido: true,
        demissao: c.demissao || new Date().toISOString().slice(0, 10)
      } : {
        demitido: false,
        demissao: ""
      }),
      style: {
        width: 16,
        height: 16,
        accentColor: "var(--danger)",
        cursor: "pointer"
      }
    }), "Colaborador desligado"), c.demitido && /*#__PURE__*/React.createElement("label", {
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 7,
        fontSize: 12,
        color: "var(--text-muted)"
      }
    }, "Data do desligamento:", /*#__PURE__*/React.createElement(TextField, {
      type: "date",
      value: c.demissao || "",
      onChange: e => onUpdate(c.id, {
        demissao: e.target.value
      }),
      style: {
        width: 160,
        height: 34
      }
    })))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 6
      }
    }, /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "danger",
      onClick: () => {
        if (window.confirm(`Excluir ${c.nome}? Os ciclos vinculados também serão removidos.`)) onDelete(c.id);
      },
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        name: "trash-2",
        size: 14
      })
    }, "Excluir")))))));
  }
  window.RhColaboradoresScreen = RhColaboradoresScreen;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/ciclo/RhColaboradoresScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/ciclo/RhDashboardScreen.jsx
try { (() => {
// RH — Dashboard geral: métricas, filtro por diretoria/gestor, alertas de ciclo vencendo, export Excel.
(function () {
  const NS = window.CicloDeDesenvolvimentoDesignSystem_cb4518;
  const {
    MetricCard,
    Card,
    DataTable,
    FilterBar,
    TextField,
    Select,
    StatusBadge,
    Button,
    Avatar,
    Banner
  } = NS;
  const {
    Icon,
    statusFromForms,
    statusLabel,
    fmtDate,
    prazoFinal,
    diasPara,
    ciclosPrevistos,
    proximoCicloPrevisto
  } = window.CicloHelpers;
  function RhDashboardScreen({
    colabs,
    gestores,
    funcionarios
  }) {
    const [q, setQ] = React.useState("");
    const [status, setStatus] = React.useState("");
    const [diretoria, setDiretoria] = React.useState("");
    const [gestorId, setGestorId] = React.useState("");
    const diretorias = [...new Set((gestores || []).map(g => g.diretoria).filter(Boolean))];
    const gestoresDaDiretoria = (gestores || []).filter(g => !diretoria || g.diretoria === diretoria);
    const gestorNome = gid => {
      const g = (gestores || []).find(x => x.id === gid);
      return g ? g.nome : "—";
    };
    const gestorDiretoria = gid => {
      const g = (gestores || []).find(x => x.id === gid);
      return g ? g.diretoria : "";
    };
    const rows = colabs.filter(c => {
      const mq = !q || c.nome.toLowerCase().includes(q.toLowerCase()) || (c.cargo || "").toLowerCase().includes(q.toLowerCase()) || (c.gestor || "").toLowerCase().includes(q.toLowerCase());
      const ms = !status || statusFromForms(c) === status;
      const md = !diretoria || c.orgDiretoria === diretoria;
      const mg = !gestorId || c.funcionarioGestorId === gestorId;
      return mq && ms && md && mg;
    });
    const total = rows.length;
    const completos = rows.filter(c => statusFromForms(c) === "completo").length;
    const pct = total ? Math.round(completos / total * 100) : 0;
    const gestoresAtivos = (gestores || []).filter(g => !g.desligado).length;

    // Colaboradores ativos (respeitando os filtros de diretoria/gestor da tela).
    const colaboradoresAtivosLista = (funcionarios || []).filter(f => !f.demitido && (!gestorId || f.gestorId === gestorId) && (!diretoria || gestorDiretoria(f.gestorId) === diretoria));
    const colaboradoresAtivos = colaboradoresAtivosLista.length;

    // Ciclos previstos x realizados: cada colaborador ativo "gera" um novo ciclo previsto a
    // cada 6 meses completos desde a admissão. Comparamos com quantos ciclos já foram
    // efetivamente cadastrados para ele (em qualquer status).
    const previsaoPorColaborador = colaboradoresAtivosLista.map(f => {
      const realizados = colabs.filter(c => c.funcionarioId === f.id).length;
      const previstos = ciclosPrevistos(f.admissao);
      const proximo = proximoCicloPrevisto(f.admissao, realizados);
      return {
        f,
        realizados,
        previstos,
        pendente: Math.max(previstos - realizados, 0),
        proximo
      };
    });
    const totalPrevistos = previsaoPorColaborador.reduce((acc, x) => acc + x.previstos, 0);
    const totalRealizados = previsaoPorColaborador.reduce((acc, x) => acc + x.realizados, 0);
    const totalPendentes = previsaoPorColaborador.reduce((acc, x) => acc + x.pendente, 0);

    // Alertas de ciclos JÁ ABERTOS vencendo (prazo de 180 dias do preenchimento).
    const alertasAbertos = rows.filter(c => !c.encerrado).map(c => ({
      ...c,
      dias: diasPara(prazoFinal(c))
    })).filter(c => c.dias !== null && c.dias <= 30).sort((a, b) => a.dias - b.dias);

    // Alertas de NOVOS ciclos previstos (colaborador completou +6 meses e ainda não tem
    // o próximo ciclo cadastrado) — vencendo em até 30 dias ou já atrasados.
    const alertasPrevistos = previsaoPorColaborador.filter(x => x.pendente > 0 && x.proximo && x.proximo.dias <= 30).sort((a, b) => a.proximo.dias - b.proximo.dias);
    const exportar = () => {
      window.CicloBulk.exportRows(rows, [{
        label: "Colaborador",
        key: "nome"
      }, {
        label: "Gestor",
        key: "gestor"
      }, {
        label: "Diretoria",
        key: "orgDiretoria"
      }, {
        label: "Regional",
        key: "orgRegional"
      }, {
        label: "Cargo",
        key: "cargo"
      }, {
        label: "Ciclo",
        key: "cicloNum"
      }, {
        label: "Data de Aplicação",
        value: r => fmtDate(r.data)
      }, {
        label: "Prazo Final",
        value: r => fmtDate(prazoFinal(r))
      }, {
        label: "Status",
        value: r => statusLabel(r)
      }, {
        label: "Encerrado",
        value: r => r.encerrado ? "Sim" : "Não"
      }], "relatorio-ciclos.xlsx", "Ciclos");
    };
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "16px"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "14px"
      }
    }, /*#__PURE__*/React.createElement(MetricCard, {
      value: colaboradoresAtivos,
      label: "Colaboradores Ativos",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "users",
        size: 20
      })
    }), /*#__PURE__*/React.createElement(MetricCard, {
      value: gestoresAtivos,
      label: "Gestores Ativos",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "shield",
        size: 20
      })
    }), /*#__PURE__*/React.createElement(MetricCard, {
      value: pct + "%",
      label: "Taxa de Conclus\xE3o (formul\xE1rios)",
      tone: "accent",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "trending-up",
        size: 20
      })
    }), /*#__PURE__*/React.createElement(MetricCard, {
      value: totalPrevistos,
      label: "Ciclos Previstos (desde a admiss\xE3o)",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "calendar-clock",
        size: 20
      })
    }), /*#__PURE__*/React.createElement(MetricCard, {
      value: totalRealizados,
      label: "Ciclos Realizados",
      tone: "default",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "check-circle-2",
        size: 20
      })
    }), /*#__PURE__*/React.createElement(MetricCard, {
      value: totalPendentes,
      label: "Ciclos Pendentes de Abertura",
      tone: totalPendentes > 0 ? "accent" : "default",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "alarm-clock",
        size: 20
      })
    })), alertasPrevistos.length > 0 && /*#__PURE__*/React.createElement(Card, {
      title: "Alertas \u2014 novos ciclos previstos (a cada 6 meses)",
      action: /*#__PURE__*/React.createElement(Icon, {
        name: "calendar-clock",
        size: 18,
        color: "var(--ab-laranja)"
      })
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 8
      }
    }, alertasPrevistos.slice(0, 8).map(x => /*#__PURE__*/React.createElement(Banner, {
      key: x.f.id,
      tone: x.proximo.dias < 0 ? "neutral" : "accent",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: x.proximo.dias < 0 ? "alert-circle" : "calendar-clock",
        size: 16,
        color: x.proximo.dias < 0 ? "var(--danger)" : "var(--ab-laranja-600)"
      }),
      style: x.proximo.dias < 0 ? {
        borderColor: "var(--danger)"
      } : undefined
    }, /*#__PURE__*/React.createElement("strong", null, x.f.nome), " (", gestorNome(x.f.gestorId), ") \u2014 ", x.proximo.numero, "\xBA ciclo ", x.proximo.dias < 0 ? `atrasado há ${Math.abs(x.proximo.dias)} dia(s)` : x.proximo.dias === 0 ? "previsto para hoje" : `previsto em ${x.proximo.dias} dia(s)`, ", a partir de ", fmtDate(x.proximo.data))), alertasPrevistos.length > 8 && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: "var(--text-muted)"
      }
    }, "+ ", alertasPrevistos.length - 8, " outro(s) colaborador(es) com novo ciclo previsto."))), alertasAbertos.length > 0 && /*#__PURE__*/React.createElement(Card, {
      title: "Alertas \u2014 ciclos abertos chegando para vencer",
      action: /*#__PURE__*/React.createElement(Icon, {
        name: "alarm-clock",
        size: 18,
        color: "var(--ab-laranja)"
      })
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 8
      }
    }, alertasAbertos.slice(0, 8).map(c => /*#__PURE__*/React.createElement(Banner, {
      key: c.id,
      tone: c.dias < 0 ? "neutral" : "accent",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: c.dias < 0 ? "alert-circle" : "alarm-clock",
        size: 16,
        color: c.dias < 0 ? "var(--danger)" : "var(--ab-laranja-600)"
      }),
      style: c.dias < 0 ? {
        borderColor: "var(--danger)"
      } : undefined
    }, /*#__PURE__*/React.createElement("strong", null, c.nome), " (", c.gestor || "—", ") \u2014 ", c.dias < 0 ? `venceu há ${Math.abs(c.dias)} dia(s)` : c.dias === 0 ? "vence hoje" : `vence em ${c.dias} dia(s)`, ", prazo ", fmtDate(prazoFinal(c)))), alertasAbertos.length > 8 && /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: "var(--text-muted)"
      }
    }, "+ ", alertasAbertos.length - 8, " outro(s) ciclo(s) pr\xF3ximos do vencimento."))), /*#__PURE__*/React.createElement(Card, {
      title: "Controle Geral \u2014 Todos os Gestores",
      action: /*#__PURE__*/React.createElement(Button, {
        size: "sm",
        variant: "secondary",
        iconLeft: /*#__PURE__*/React.createElement(Icon, {
          name: "file-down",
          size: 14
        }),
        onClick: exportar
      }, "Exportar (Excel)")
    }, /*#__PURE__*/React.createElement(FilterBar, null, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 2,
        minWidth: 200,
        position: "relative"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        position: "absolute",
        left: 10,
        top: "50%",
        transform: "translateY(-50%)",
        color: "var(--text-muted)",
        pointerEvents: "none"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "search",
      size: 15
    })), /*#__PURE__*/React.createElement(TextField, {
      placeholder: "Buscar colaborador, cargo ou gestor...",
      value: q,
      onChange: e => setQ(e.target.value),
      style: {
        paddingLeft: 32
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 150
      }
    }, /*#__PURE__*/React.createElement(Select, {
      value: diretoria,
      onChange: e => {
        setDiretoria(e.target.value);
        setGestorId("");
      }
    }, /*#__PURE__*/React.createElement("option", {
      value: ""
    }, "Todas as diretorias"), diretorias.map(d => /*#__PURE__*/React.createElement("option", {
      key: d,
      value: d
    }, d)))), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 150
      }
    }, /*#__PURE__*/React.createElement(Select, {
      value: gestorId,
      onChange: e => setGestorId(e.target.value)
    }, /*#__PURE__*/React.createElement("option", {
      value: ""
    }, "Todos os gestores"), gestoresDaDiretoria.map(g => /*#__PURE__*/React.createElement("option", {
      key: g.id,
      value: g.id
    }, g.nome)))), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 150
      }
    }, /*#__PURE__*/React.createElement(Select, {
      value: status,
      onChange: e => setStatus(e.target.value)
    }, /*#__PURE__*/React.createElement("option", {
      value: ""
    }, "Todos os status"), /*#__PURE__*/React.createElement("option", {
      value: "completo"
    }, "Completo"), /*#__PURE__*/React.createElement("option", {
      value: "parcial"
    }, "Em andamento"), /*#__PURE__*/React.createElement("option", {
      value: "pendente"
    }, "Pendente")))), /*#__PURE__*/React.createElement(DataTable, {
      rowKey: r => r.id,
      empty: "Nenhum ciclo encontrado.",
      columns: [{
        key: "nome",
        header: "Colaborador",
        render: r => /*#__PURE__*/React.createElement("div", {
          style: {
            display: "flex",
            alignItems: "center",
            gap: 10
          }
        }, /*#__PURE__*/React.createElement(Avatar, {
          name: r.nome,
          size: 30,
          tone: "soft"
        }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
          style: {
            fontWeight: 700
          }
        }, r.nome), /*#__PURE__*/React.createElement("div", {
          style: {
            fontSize: 11,
            color: "var(--text-muted)"
          }
        }, [r.cargo, r.orgDiretoria, r.cicloNum, `prazo ${fmtDate(prazoFinal(r))}`].filter(Boolean).join(" · "))))
      }, {
        key: "gestor",
        header: "Gestor",
        render: r => /*#__PURE__*/React.createElement("span", {
          style: {
            fontSize: 13
          }
        }, r.gestor || "—")
      }, {
        key: "status",
        header: "Status",
        render: r => /*#__PURE__*/React.createElement(StatusBadge, {
          status: statusFromForms(r),
          label: statusLabel(r)
        })
      }],
      rows: rows
    })));
  }
  window.RhDashboardScreen = RhDashboardScreen;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/ciclo/RhDashboardScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/ciclo/RhGestoresScreen.jsx
try { (() => {
// RH — Cadastro de Gestores (Nome, Diretoria, Setor, Departamento, Unidade, Regional) + login gerado.
(function () {
  const NS = window.CicloDeDesenvolvimentoDesignSystem_cb4518;
  const {
    Card,
    FormGrid,
    Field,
    TextField,
    Button,
    Avatar,
    Banner,
    StatusBadge,
    DataTable
  } = NS;
  const {
    Icon,
    slugUsuario,
    genSenhaInicial,
    EditableSelect
  } = window.CicloHelpers;
  const HEADERS = ["Nome", "Cargo", "Diretoria | Negócios", "Departamento", "Setor", "Unidade", "Regional"];
  function RhGestoresScreen({
    gestores,
    funcionarios,
    catalogos,
    onAddCatalogoItem,
    onAdd,
    onUpdate,
    onDelete,
    onImportBulk,
    onToast
  }) {
    const empty = {
      nome: "",
      cargo: "",
      diretoria: "",
      setor: "",
      departamento: "",
      unidade: "",
      regional: ""
    };
    const cat = catalogos || {
      regionais: [],
      diretorias: [],
      departamentos: [],
      setores: [],
      unidades: []
    };
    const [f, setF] = React.useState(empty);
    const set = (k, v) => setF(s => ({
      ...s,
      [k]: v
    }));
    const [q, setQ] = React.useState("");
    const [editId, setEditId] = React.useState(null);
    const [editForm, setEditForm] = React.useState({});
    const fileRef = React.useRef(null);
    const [importando, setImportando] = React.useState(false);
    const [novoLogin, setNovoLogin] = React.useState(null); // { nome, usuario, senha } — exibido após cadastrar

    const cadastrar = () => {
      if (!f.nome.trim()) {
        onToast("Informe o nome do gestor.", "danger");
        return;
      }
      if (!f.cargo.trim()) {
        onToast("Informe o cargo do gestor.", "danger");
        return;
      }
      if (!f.diretoria) {
        onToast("Selecione a Diretoria | Negócios.", "danger");
        return;
      }
      if (!f.departamento) {
        onToast("Selecione o Departamento.", "danger");
        return;
      }
      if (!f.setor) {
        onToast("Selecione o Setor.", "danger");
        return;
      }
      if (!f.unidade) {
        onToast("Selecione a Unidade.", "danger");
        return;
      }
      if (!f.regional) {
        onToast("Selecione a Regional.", "danger");
        return;
      }
      const usuario = slugUsuario(f.nome, gestores.map(g => g.usuario));
      const senha = genSenhaInicial();
      onAdd({
        ...f,
        usuario,
        senha,
        senhaAlterada: false,
        desligado: false,
        desligamento: ""
      });
      onToast(`Gestor cadastrado! Usuário: ${usuario} · Senha inicial: ${senha}`, "success");
      setF(empty);
      setNovoLogin({
        nome: f.nome,
        usuario,
        senha
      });
    };
    const startEdit = g => {
      setEditId(g.id);
      setEditForm({
        ...g
      });
    };
    const saveEdit = () => {
      if (!String(editForm.nome || "").trim()) {
        onToast("Informe o nome do gestor.", "danger");
        return;
      }
      if (!String(editForm.cargo || "").trim()) {
        onToast("Informe o cargo do gestor.", "danger");
        return;
      }
      if (!editForm.diretoria) {
        onToast("Selecione a Diretoria | Negócios.", "danger");
        return;
      }
      if (!editForm.departamento) {
        onToast("Selecione o Departamento.", "danger");
        return;
      }
      if (!editForm.setor) {
        onToast("Selecione o Setor.", "danger");
        return;
      }
      if (!editForm.unidade) {
        onToast("Selecione a Unidade.", "danger");
        return;
      }
      if (!editForm.regional) {
        onToast("Selecione a Regional.", "danger");
        return;
      }
      const {
        id,
        usuario,
        senha,
        senhaAlterada,
        ...patch
      } = editForm;
      onUpdate(editId, patch);
      onToast("Cadastro atualizado.", "success");
      setEditId(null);
    };
    const resetarSenha = g => {
      if (!window.confirm(`Gerar nova senha inicial para ${g.nome}?`)) return;
      const nova = genSenhaInicial();
      onUpdate(g.id, {
        senha: nova,
        senhaAlterada: false
      });
      onToast(`Nova senha de ${g.nome}: ${nova}`, "success");
      setNovoLogin({
        nome: g.nome,
        usuario: g.usuario,
        senha: nova
      });
    };
    const qtdColabs = gid => (funcionarios || []).filter(x => x.gestorId === gid).length;
    const list = (gestores || []).filter(g => !q || g.nome.toLowerCase().includes(q.toLowerCase()) || (g.diretoria || "").toLowerCase().includes(q.toLowerCase())).slice().sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));
    const baixarModelo = () => window.CicloBulk.downloadTemplate(HEADERS, "modelo-gestores.xlsx", ["Ex: Ana Souza", "Gerente Regional", "Comercial", "Comércio", "Vendas", "Grande Vitória", "Sudeste"]);
    const importar = async e => {
      const file = e.target.files[0];
      if (!file) return;
      setImportando(true);
      try {
        const rows = await window.CicloBulk.parseFile(file);
        let ok = 0,
          ignoradas = 0;
        rows.forEach(r => {
          const nome = String(r["Nome"] || "").trim();
          if (!nome) {
            ignoradas++;
            return;
          }
          const usuario = slugUsuario(nome, gestores.map(g => g.usuario).concat(ok ? [] : []));
          const senha = genSenhaInicial();
          onAdd({
            nome,
            cargo: String(r["Cargo"] || ""),
            diretoria: String(r["Diretoria | Negócios"] || ""),
            departamento: String(r["Departamento"] || ""),
            setor: String(r["Setor"] || ""),
            unidade: String(r["Unidade"] || ""),
            regional: String(r["Regional"] || ""),
            usuario,
            senha,
            senhaAlterada: false,
            desligado: false,
            desligamento: ""
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
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "16px"
      }
    }, novoLogin && /*#__PURE__*/React.createElement(Banner, {
      tone: "accent",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "key-round",
        size: 16
      })
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        flexWrap: "wrap"
      }
    }, /*#__PURE__*/React.createElement("span", null, "Login gerado para ", /*#__PURE__*/React.createElement("strong", null, novoLogin.nome), ": usu\xE1rio ", /*#__PURE__*/React.createElement("strong", null, novoLogin.usuario), " \xB7 senha ", /*#__PURE__*/React.createElement("strong", {
      style: {
        fontFamily: "var(--font-mono)"
      }
    }, novoLogin.senha), " \u2014 repasse ao gestor; ser\xE1 solicitada a troca no 1\xBA acesso."), /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "ghost",
      onClick: () => setNovoLogin(null)
    }, "Fechar"))), /*#__PURE__*/React.createElement(Card, {
      title: "Cadastrar Gestor",
      action: /*#__PURE__*/React.createElement(Icon, {
        name: "user-plus",
        size: 18,
        color: "var(--ab-azul-claro)"
      })
    }, /*#__PURE__*/React.createElement(FormGrid, {
      columns: 3
    }, /*#__PURE__*/React.createElement(Field, {
      label: "Nome Completo",
      required: true
    }, /*#__PURE__*/React.createElement(TextField, {
      placeholder: "Nome do gestor",
      value: f.nome,
      onChange: e => set("nome", e.target.value)
    })), /*#__PURE__*/React.createElement(Field, {
      label: "Cargo",
      required: true
    }, /*#__PURE__*/React.createElement(TextField, {
      placeholder: "Ex: Gerente Regional",
      value: f.cargo,
      onChange: e => set("cargo", e.target.value)
    })), /*#__PURE__*/React.createElement(Field, {
      label: "Diretoria | Neg\xF3cios",
      required: true
    }, /*#__PURE__*/React.createElement(EditableSelect, {
      value: f.diretoria,
      options: cat.diretorias,
      onChange: v => set("diretoria", v),
      onAddOption: v => onAddCatalogoItem("diretorias", v),
      placeholder: "Nova diretoria"
    })), /*#__PURE__*/React.createElement(Field, {
      label: "Departamento",
      required: true
    }, /*#__PURE__*/React.createElement(EditableSelect, {
      value: f.departamento,
      options: cat.departamentos,
      onChange: v => set("departamento", v),
      onAddOption: v => onAddCatalogoItem("departamentos", v),
      placeholder: "Novo departamento"
    })), /*#__PURE__*/React.createElement(Field, {
      label: "Setor",
      required: true
    }, /*#__PURE__*/React.createElement(EditableSelect, {
      value: f.setor,
      options: cat.setores,
      onChange: v => set("setor", v),
      onAddOption: v => onAddCatalogoItem("setores", v),
      placeholder: "Novo setor"
    })), /*#__PURE__*/React.createElement(Field, {
      label: "Unidade",
      required: true
    }, /*#__PURE__*/React.createElement(EditableSelect, {
      value: f.unidade,
      options: cat.unidades,
      onChange: v => set("unidade", v),
      onAddOption: v => onAddCatalogoItem("unidades", v),
      placeholder: "Nova unidade"
    })), /*#__PURE__*/React.createElement(Field, {
      label: "Regional",
      required: true
    }, /*#__PURE__*/React.createElement(EditableSelect, {
      value: f.regional,
      options: cat.regionais,
      onChange: v => set("regional", v),
      onAddOption: v => onAddCatalogoItem("regionais", v),
      placeholder: "Nova regional"
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "flex-end",
        marginTop: 18
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "accent",
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        name: "user-check",
        size: 15
      }),
      onClick: cadastrar
    }, "Cadastrar Gestor e Gerar Login"))), /*#__PURE__*/React.createElement(Card, {
      title: "Importa\xE7\xE3o em massa",
      action: /*#__PURE__*/React.createElement(Icon, {
        name: "upload",
        size: 18,
        color: "var(--ab-azul-claro)"
      })
    }, /*#__PURE__*/React.createElement(Banner, {
      tone: "info",
      icon: /*#__PURE__*/React.createElement(Icon, {
        name: "info",
        size: 16
      }),
      style: {
        marginBottom: 14
      }
    }, "Baixe o modelo, preencha uma linha por gestor e envie de volta. Login e senha inicial s\xE3o gerados automaticamente para cada um."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 10,
        flexWrap: "wrap"
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        name: "file-down",
        size: 15
      }),
      onClick: baixarModelo
    }, "Baixar modelo (Excel)"), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        name: "upload",
        size: 15
      }),
      onClick: () => fileRef.current && fileRef.current.click(),
      disabled: importando
    }, importando ? "Importando..." : "Importar planilha"), /*#__PURE__*/React.createElement("input", {
      ref: fileRef,
      type: "file",
      accept: ".xlsx,.xls,.csv",
      onChange: importar,
      style: {
        display: "none"
      }
    }))), /*#__PURE__*/React.createElement(Card, {
      title: "Gestores Cadastrados"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative",
        marginBottom: 16
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        position: "absolute",
        left: 10,
        top: "50%",
        transform: "translateY(-50%)",
        color: "var(--text-muted)",
        pointerEvents: "none"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "search",
      size: 15
    })), /*#__PURE__*/React.createElement(TextField, {
      placeholder: "Buscar por nome ou diretoria...",
      value: q,
      onChange: e => setQ(e.target.value),
      style: {
        paddingLeft: 32
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 12
      }
    }, list.length === 0 && /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: "center",
        padding: 30,
        color: "var(--text-muted)",
        fontSize: 13
      }
    }, "Nenhum gestor cadastrado ainda."), list.map(g => editId === g.id ? /*#__PURE__*/React.createElement("div", {
      key: g.id,
      style: {
        border: "1.5px solid var(--ab-azul-claro)",
        borderRadius: "var(--radius-lg)",
        padding: 16,
        background: "var(--surface-brand-soft)"
      }
    }, /*#__PURE__*/React.createElement(FormGrid, {
      columns: 3
    }, /*#__PURE__*/React.createElement(Field, {
      label: "Nome Completo",
      required: true
    }, /*#__PURE__*/React.createElement(TextField, {
      value: editForm.nome || "",
      onChange: e => setEditForm(s => ({
        ...s,
        nome: e.target.value
      }))
    })), /*#__PURE__*/React.createElement(Field, {
      label: "Cargo",
      required: true
    }, /*#__PURE__*/React.createElement(TextField, {
      value: editForm.cargo || "",
      onChange: e => setEditForm(s => ({
        ...s,
        cargo: e.target.value
      }))
    })), /*#__PURE__*/React.createElement(Field, {
      label: "Diretoria | Neg\xF3cios",
      required: true
    }, /*#__PURE__*/React.createElement(EditableSelect, {
      value: editForm.diretoria,
      options: cat.diretorias,
      onChange: v => setEditForm(s => ({
        ...s,
        diretoria: v
      })),
      onAddOption: v => onAddCatalogoItem("diretorias", v)
    })), /*#__PURE__*/React.createElement(Field, {
      label: "Departamento",
      required: true
    }, /*#__PURE__*/React.createElement(EditableSelect, {
      value: editForm.departamento,
      options: cat.departamentos,
      onChange: v => setEditForm(s => ({
        ...s,
        departamento: v
      })),
      onAddOption: v => onAddCatalogoItem("departamentos", v)
    })), /*#__PURE__*/React.createElement(Field, {
      label: "Setor",
      required: true
    }, /*#__PURE__*/React.createElement(EditableSelect, {
      value: editForm.setor,
      options: cat.setores,
      onChange: v => setEditForm(s => ({
        ...s,
        setor: v
      })),
      onAddOption: v => onAddCatalogoItem("setores", v)
    })), /*#__PURE__*/React.createElement(Field, {
      label: "Unidade",
      required: true
    }, /*#__PURE__*/React.createElement(EditableSelect, {
      value: editForm.unidade,
      options: cat.unidades,
      onChange: v => setEditForm(s => ({
        ...s,
        unidade: v
      })),
      onAddOption: v => onAddCatalogoItem("unidades", v)
    })), /*#__PURE__*/React.createElement(Field, {
      label: "Regional",
      required: true
    }, /*#__PURE__*/React.createElement(EditableSelect, {
      value: editForm.regional,
      options: cat.regionais,
      onChange: v => setEditForm(s => ({
        ...s,
        regional: v
      })),
      onAddOption: v => onAddCatalogoItem("regionais", v)
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        justifyContent: "flex-end",
        gap: 10,
        marginTop: 16
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      onClick: () => setEditId(null)
    }, "Cancelar"), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        name: "save",
        size: 15
      }),
      onClick: saveEdit
    }, "Salvar Altera\xE7\xF5es"))) : /*#__PURE__*/React.createElement("div", {
      key: g.id,
      style: {
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-lg)",
        padding: "14px 16px",
        display: "flex",
        gap: 14,
        alignItems: "flex-start",
        opacity: g.desligado ? 0.72 : 1
      }
    }, /*#__PURE__*/React.createElement(Avatar, {
      name: g.nome,
      size: 42,
      tone: g.desligado ? "soft" : "brand"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        flexWrap: "wrap"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontWeight: 700,
        fontSize: 14
      }
    }, g.nome), g.desligado ? /*#__PURE__*/React.createElement(StatusBadge, {
      status: "pendente",
      label: "Desligado"
    }) : /*#__PURE__*/React.createElement(StatusBadge, {
      status: "completo",
      label: "Ativo"
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        color: "var(--ab-azul-escuro)",
        background: "var(--surface-brand-soft)",
        padding: "2px 8px",
        borderRadius: 999,
        fontWeight: 700
      }
    }, qtdColabs(g.id), " colaborador(es)")), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 12,
        color: "var(--text-muted)",
        marginTop: 4,
        display: "flex",
        gap: 14,
        flexWrap: "wrap"
      }
    }, g.cargo && /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", null, "Cargo:"), " ", g.cargo), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", null, "Diretoria | Neg\xF3cios:"), " ", g.diretoria || "—"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", null, "Depto:"), " ", g.departamento || "—"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", null, "Setor:"), " ", g.setor || "—"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", null, "Unidade:"), " ", g.unidade || "—"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", null, "Regional:"), " ", g.regional || "—"), g.desligado && /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--danger)",
        fontWeight: 700
      }
    }, /*#__PURE__*/React.createElement("strong", null, "Deslig.:"), " ", g.desligamento ? new Date(g.desligamento + "T00:00:00").toLocaleDateString("pt-BR") : "—")), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 8,
        display: "flex",
        alignItems: "center",
        gap: 8,
        flexWrap: "wrap"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 7,
        padding: "4px 10px",
        background: "var(--surface-sunken)",
        borderRadius: "var(--radius-sm)",
        fontSize: 12,
        fontWeight: 700,
        color: "var(--ab-azul-escuro)"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "user",
      size: 13
    }), " ", g.usuario), !g.senhaAlterada && /*#__PURE__*/React.createElement("div", {
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 7,
        padding: "4px 10px",
        background: "var(--surface-accent-soft)",
        border: "1px solid var(--ab-laranja)",
        borderRadius: "var(--radius-sm)",
        fontSize: 12,
        fontWeight: 700,
        color: "var(--ab-laranja-600)"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "key-round",
      size: 13
    }), " Senha: ", /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-mono)"
      }
    }, g.senha), " \xB7 1\xBA acesso pendente")), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 10,
        display: "flex",
        alignItems: "center",
        gap: 10,
        flexWrap: "wrap"
      }
    }, /*#__PURE__*/React.createElement("label", {
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 7,
        fontSize: 13,
        cursor: "pointer",
        color: "var(--text-body)"
      }
    }, /*#__PURE__*/React.createElement("input", {
      type: "checkbox",
      checked: !!g.desligado,
      onChange: e => onUpdate(g.id, e.target.checked ? {
        desligado: true,
        desligamento: g.desligamento || new Date().toISOString().slice(0, 10)
      } : {
        desligado: false,
        desligamento: ""
      }),
      style: {
        width: 16,
        height: 16,
        accentColor: "var(--danger)",
        cursor: "pointer"
      }
    }), "Gestor desligado"), g.desligado && /*#__PURE__*/React.createElement("label", {
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 7,
        fontSize: 12,
        color: "var(--text-muted)"
      }
    }, "Data do desligamento:", /*#__PURE__*/React.createElement(TextField, {
      type: "date",
      value: g.desligamento || "",
      onChange: e => onUpdate(g.id, {
        desligamento: e.target.value
      }),
      style: {
        width: 160,
        height: 34
      }
    })))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 6
      }
    }, /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "secondary",
      onClick: () => startEdit(g),
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        name: "pencil",
        size: 14
      })
    }, "Editar"), /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "ghost",
      onClick: () => resetarSenha(g),
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        name: "key-round",
        size: 14
      })
    }, "Nova senha"), /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "danger",
      onClick: () => {
        if (window.confirm(`Excluir ${g.nome}? Colaboradores e ciclos vinculados também serão removidos.`)) onDelete(g.id);
      },
      iconLeft: /*#__PURE__*/React.createElement(Icon, {
        name: "trash-2",
        size: 14
      })
    }, "Excluir")))))));
  }
  window.RhGestoresScreen = RhGestoresScreen;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/ciclo/RhGestoresScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/ciclo/bulkImport.js
try { (() => {
// Importação/exportação em massa via planilha (Excel), usando a lib SheetJS (window.XLSX).
(function () {
  // Gera e baixa um arquivo .xlsx só com a linha de cabeçalho (modelo para preenchimento).
  function downloadTemplate(headers, filename, exemplo) {
    if (!window.XLSX) {
      alert("Biblioteca de planilha não carregada.");
      return;
    }
    const rows = exemplo ? [headers, exemplo] : [headers];
    const ws = window.XLSX.utils.aoa_to_sheet(rows);
    const wb = window.XLSX.utils.book_new();
    window.XLSX.utils.book_append_sheet(wb, ws, "Modelo");
    window.XLSX.writeFile(wb, filename);
  }

  // Lê um arquivo .xlsx/.csv escolhido pelo usuário e retorna um array de objetos
  // (uma entrada por linha, chaves = cabeçalho da 1ª linha).
  function parseFile(file) {
    return new Promise((resolve, reject) => {
      if (!window.XLSX) {
        reject(new Error("Biblioteca de planilha não carregada."));
        return;
      }
      const reader = new FileReader();
      reader.onerror = () => reject(new Error("Não foi possível ler o arquivo."));
      reader.onload = e => {
        try {
          const wb = window.XLSX.read(e.target.result, {
            type: "array"
          });
          const ws = wb.Sheets[wb.SheetNames[0]];
          const rows = window.XLSX.utils.sheet_to_json(ws, {
            defval: ""
          });
          resolve(rows);
        } catch (err) {
          reject(err);
        }
      };
      reader.readAsArrayBuffer(file);
    });
  }

  // Exporta uma lista de objetos como planilha .xlsx (relatórios).
  function exportRows(rows, headers, filename, sheetName) {
    if (!window.XLSX) {
      alert("Biblioteca de planilha não carregada.");
      return;
    }
    const aoa = [headers.map(h => h.label)];
    rows.forEach(r => aoa.push(headers.map(h => typeof h.value === "function" ? h.value(r) : r[h.key])));
    const ws = window.XLSX.utils.aoa_to_sheet(aoa);
    const wb = window.XLSX.utils.book_new();
    window.XLSX.utils.book_append_sheet(wb, ws, sheetName || "Relatório");
    window.XLSX.writeFile(wb, filename);
  }
  window.CicloBulk = {
    downloadTemplate,
    parseFile,
    exportRows
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/ciclo/bulkImport.js", error: String((e && e.message) || e) }); }

// ui_kits/ciclo/data.js
try { (() => {
// Base de dados do Ciclo de Desenvolvimento e Evolução — ZERADA.
// Cadastros, sincronizados via Supabase (nuvem) quando configurado, com cache local (localStorage):
//  - gestores: cadastrados pelo RH (Nome, Cargo, Diretoria, Regional, Unidade, Setor, Departamento, login)
//  - funcionarios: quadro de colaboradores, vinculados a um gestor (gestorId)
//  - ciclos: cada ciclo de desenvolvimento vinculado a um funcionário
//  - auditLog: histórico de ações (quem criou/editou/excluiu o quê)
//  - rhAuth: credencial única da administração do RH
//  - catalogos: listas suspensas (Regional, Diretoria, Departamento, Setor, Unidade) — o RH pode
//    cadastrar novos itens direto no formulário, e eles ficam salvos aqui para todos usarem depois.
window.CICLO_DATA = {
  ano: "2026",
  gestores: [],
  funcionarios: [],
  ciclos: [],
  auditLog: [],
  rhAuth: null,
  catalogos: {
    regionais: ["Adm & Finanças", "Azul Agro", "Byd Bsb", "Byd Es", "Byd Go", "Byd Grande Bh", "Byd Leste De Minas", "Byd Norte De Minas", "Byd Sul De Minas", "Byd Triangulo Mg", "Byd Zona Da Mata", "Denza Grande Bh", "Godrive", "Jeep/Ram Es", "Jeep/Ram Mg", "Jeep/Ram Rj", "Mercedes Caminhões Es", "Mercedes Caminhões Sul", "Pneus Caminhões Es", "Pneus Caminhões Sul", "Toyota Bsb", "Toyota Es", "Toyota Grande Bh", "Toyota Leste De Minas", "Toyota Rj", "Toyota Triangulo Mg", "Toyota Zona Da Mata", "Vitoria Motors Mbb"],
    diretorias: ["Adm E Financas", "Aguia Branca Seminovos", "Azul Agro", "Estrategia De Negocios", "Gef", "Godrive", "Inteligencia De Mercado", "Kuruma Osaka Kyoto", "Savana", "Tech", "Venda Direta", "Vitoria Diesel", "Vitoria Motors Byd", "Vitoria Motors Jeep Ram", "Vitoria Motors Mbb"],
    departamentos: ["Administração", "Controladoria", "Diretoria", "Godrive", "Governança E Relações Jurídicas", "Oficina", "Peças E Acessórios", "Pessoas E Cultura", "Pn/Pneus", "Recapagem Michelin", "Veículos Novos", "Veículos Ônibus", "Veículos Sprinter", "Veículos Usados"],
    setores: ["Acessórios", "Adm Central Acessórios", "Adm Central De Vendas", "Adm Central De Vendas Diretas", "Adm Central Pós Venda", "Adm Central Vendas F&i", "Adm Central Vu", "Adm Colatina", "Adm De Truck Center", "Adm Funilaria", "Adm Lead Center", "Adm Oficina Colatina", "Adm Recapagem", "Adm Truck Center Linhares", "Adm Truck Center Serra", "Admc Corretora", "Admc Inteligencia E Cx", "Admc Relacionamento", "Admcv Marketing", "Administr. Oficina", "Administração Pds", "Administrativo Regional", "Assistência Técnica", "Business Partners", "Centro Treinamento", "Comunicação Interna", "Contabilidade", "Contas A Pagar", "Contas A Receber", "Departamento Pessoal", "Desenvolvimento Humano Organizacional", "Diretoria", "Estruturas Fisicas", "Fiscal", "Funil. Pint. Lantern.", "Garantia", "Gef", "Grandes Clientes", "Jurídico, Riscos & Compliance", "Locação Go Drive", "Mecânica", "Mecânica Caminhões", "Pds Carapina", "Peças", "Peças Balcão", "Peças Balcão Grandes Clientes", "Peças Mecânica", "Peças Telemarketing", "People Analytics", "People Experience E Inovação", "Planejamento", "Plm", "Pneus", "Pneus Linhares", "Pneus Serra", "Produção Recapagem", "Recrutamento E Seleção", "Remuneração E Beneficios", "Remuneração E Performance", "Serviços Acessórios", "Sesmt", "Societário", "Suprimentos", "Tech", "Truck Center", "Truck Center Linhares", "Truck Center Serra", "Veículos Caminhões", "Veículos Lexus", "Veículos Novos", "Veículos Ônibus", "Veículos Sprinter", "Veículos Usados", "Venda Direta", "Venda Direta Corporativa", "Vendas F&i", "Vendas On Line"],
    unidades: ["Ab Bh", "Ab Comércio Vitória", "Ab Contagem", "Ab Contagem 2", "Ab Energias Renovaveis", "Ab Lexus", "Ab Pampulha", "Ab Sete Lagoas", "Águia Branca Bh", "Águia Branca Linhares", "Águia Branca Vitória", "Ev Anápolis", "Ev Aparecida De Goiânia", "Ev Aparecida Seminovos", "Ev Asa Norte", "Ev Barão", "Ev Cachoeiro", "Ev Catalão Go", "Ev Denza Bh", "Ev Denza Vitória", "Ev Divinopolis", "Ev Fernando Ferrari", "Ev Goiânia", "Ev Governador Valadares", "Ev Ipatinga", "Ev Itumbiara", "Ev Jatai", "Ev Juiz De Fora", "Ev Linhares", "Ev Montes Claros", "Ev Nova Lima", "Ev Pampulha", "Ev Patos De Minas", "Ev Poços De Caldas", "Ev Pouso Alegre", "Ev Raja", "Ev Rio Verde", "Ev Serra", "Ev Sia", "Ev Uberaba", "Ev Uberlândia", "Ev Varginha", "Ev Vila Velha", "Ev Vitoria", "Kurumá Barbacena", "Kurumá Cachoeiro", "Kurumá Cariacica", "Kurumá Colatina", "Kurumá Diretoria Adm Finanças", "Kurumá Épia", "Kurumá Galpão Sia", "Kurumá Governador Valadares", "Kurumá Guarapari", "Kurumá Ipatinga", "Kurumá Itabira", "Kurumá João Naves", "Kurumá Juiz De Fora", "Kurumá Juiz Fora 2", "Kurumá Lexus Sia", "Kurumá Linhares", "Kurumá Manhuaçu", "Kurumá Muriaé", "Kurumá Patos De Minas", "Kurumá São Mateus", "Kurumá Seminovos Sia", "Kurumá Serra", "Kuruma Serra Pds", "Kurumá Sia", "Kuruma Sia Aeroporto", "Kurumá Taguatinga", "Kurumá Teófilo Otoni", "Kurumá Ubá", "Kurumá Uberaba", "Kurumá Uberlândia", "Kuruma Uberlândia Galpão", "Kurumá Venda Nova", "Kurumá Vila Velha", "Kurumá Vitória", "Savana Campo Largo", "Savana Concórdia", "Savana Curitiba", "Savana Curitiba Vans", "Savana Diretoria Adm Finanças", "Savana Guaramirim", "Savana Jaguariaíva", "Savana Joinville", "Savana Pneus Ponta Grossa", "Savana Pneus São José Dos Pinhais", "Savana Ponta Grossa", "Savana Registro Sp", "Savana São José Dos Pinhais", "Savana Telêmaco Borba", "Savana Xanxerê", "Vd Alto Taquari", "Vd Cachoeiro", "Vd Caiaponia", "Vd Cariacica", "Vd Colatina", "Vd Diretoria Adm Finanças", "Vd Itaberaí", "Vd Jatai", "Vd Linhares", "Vd Mineiros", "Vd Pneus Cachoeiro", "Vd Pneus Cariacica", "Vd Pneus Colatina", "Vd Pneus Linhares", "Vd São Miguel Do Araguaia", "Vd Uruaçu", "Vd Venda Nova", "Vitoria Motors Mbb", "Vm Cachoeiro", "Vm Colatina", "Vm Guarapari", "Vm Juiz De Fora", "Vm Linhares", "Vm Nova Friburgo", "Vm Petrópolis", "Vm Serra", "Vm Serra Galpao", "Vm Vila Velha", "Vm Vitória", "Vm Vitória Ram"]
  }
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/ciclo/data.js", error: String((e && e.message) || e) }); }

// ui_kits/ciclo/helpers.jsx
try { (() => {
// Shared helpers for the Ciclo UI kit.
// Lucide icon wrapper — renders a single icon per instance, refreshed on prop change.
function Icon({
  name,
  size = 16,
  color,
  style
}) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const host = ref.current;
    if (!host || !window.lucide) return;
    host.innerHTML = "";
    const i = document.createElement("i");
    i.setAttribute("data-lucide", name);
    host.appendChild(i);
    try {
      window.lucide.createIcons({
        attrs: {
          width: size,
          height: size,
          "stroke-width": 2
        }
      });
    } catch (e) {}
  }, [name, size]);
  return /*#__PURE__*/React.createElement("span", {
    ref: ref,
    "aria-hidden": true,
    style: {
      display: "inline-flex",
      alignItems: "center",
      color,
      ...style
    }
  });
}
function statusFromForms(c) {
  const g = !!c.gestorForm;
  const co = !!c.colabForm;
  if (g && co) return "completo";
  if (g || co) return "parcial";
  return "pendente";
}
function statusLabel(c) {
  const g = !!c.gestorForm;
  const co = !!c.colabForm;
  if (g && co) return "Completo";
  if (g && !co) return "Aguard. Colaborador";
  if (!g && co) return "Aguard. Gestor";
  return "Pendente";
}
window.CicloHelpers = {
  Icon,
  statusFromForms,
  statusLabel,
  addMonths,
  addDays,
  fmtDate,
  prazoFinal,
  pdiStats,
  tempoEmpresa,
  mergeCiclo,
  genId,
  slugUsuario,
  genSenhaInicial,
  diasPara,
  addAuditEntry,
  EditableSelect,
  titleCase,
  normalizeCatalogos,
  mergeCatalogos,
  parseDataBR,
  ciclosPrevistos,
  proximoCicloPrevisto
};
window.Icon = Icon;

// Quantos ciclos de 6 em 6 meses já se passaram desde a admissão até hoje (ou até "referencia").
function ciclosPrevistos(admissao, referencia) {
  if (!admissao) return 0;
  const ini = new Date(admissao + "T00:00:00");
  const fim = referencia ? new Date(referencia + "T00:00:00") : new Date();
  if (isNaN(ini) || isNaN(fim) || fim < ini) return 0;
  let meses = (fim.getFullYear() - ini.getFullYear()) * 12 + (fim.getMonth() - ini.getMonth());
  if (fim.getDate() < ini.getDate()) meses -= 1;
  return Math.max(0, Math.floor(meses / 6));
}

// Dados do próximo ciclo previsto (o de número "realizados + 1"): data alvo (admissão + 6 meses
// por ciclo) e quantos dias faltam (negativo = já deveria ter sido aberto).
function proximoCicloPrevisto(admissao, realizados) {
  if (!admissao) return null;
  const numero = (realizados || 0) + 1;
  const data = addMonths(admissao, numero * 6);
  return {
    numero,
    data,
    dias: diasPara(data)
  };
}

// Converte uma data vinda de planilha (DD/MM/AAAA, D/M/AAAA, AAAA-MM-DD ou serial do Excel)
// para o formato ISO (AAAA-MM-DD) usado internamente. Retorna "" se não reconhecer.
function parseDataBR(valor) {
  if (valor === null || valor === undefined || valor === "") return "";
  if (valor instanceof Date && !isNaN(valor)) return valor.toISOString().slice(0, 10);
  const s = String(valor).trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s;
  const m = s.match(/^(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{2,4})$/);
  if (m) {
    let [, d, mo, y] = m;
    if (y.length === 2) y = (Number(y) > 50 ? "19" : "20") + y;
    d = d.padStart(2, "0");
    mo = mo.padStart(2, "0");
    return `${y}-${mo}-${d}`;
  }
  // Número serial de data do Excel (contagem de dias desde 1899-12-30).
  if (/^\d+(\.\d+)?$/.test(s)) {
    const serial = Number(s);
    const d = new Date(Date.UTC(1899, 11, 30) + serial * 86400000);
    if (!isNaN(d)) return d.toISOString().slice(0, 10);
  }
  return "";
}

// Primeira letra maiúscula de cada palavra (padroniza itens digitados em CAIXA ALTA ou minúsculas).
function titleCase(str) {
  return String(str || "").toLowerCase().replace(/(^|[\s\/\-])([a-zà-ÿ])/g, (m, sep, ch) => sep + ch.toUpperCase());
}

// Padroniza um catálogo inteiro (Regional/Diretoria/Departamento/Setor/Unidade): capitaliza
// cada item e ordena de A a Z — usado ao carregar dados antigos que ainda estejam em CAIXA ALTA.
function normalizeCatalogos(cat) {
  const out = {};
  Object.keys(cat || {}).forEach(k => {
    const seen = new Set();
    out[k] = (cat[k] || []).map(titleCase).filter(v => {
      const key = v.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    }).sort((a, b) => a.localeCompare(b, "pt-BR"));
  });
  return out;
}

// Une o catálogo salvo na nuvem com os padrões definidos em data.js, por campo (união, não
// substituição total) — assim novas listas ou itens acrescentados no código nunca "somem"
// por causa de um registro antigo já salvo no banco.
function mergeCatalogos(remote, defaults) {
  const keys = new Set([...Object.keys(remote || {}), ...Object.keys(defaults || {})]);
  const merged = {};
  keys.forEach(k => {
    const uniao = [...(remote && remote[k] || []), ...(defaults && defaults[k] || [])];
    merged[k] = uniao;
  });
  return normalizeCatalogos(merged);
}

// Combo "select + cadastrar novo": lista suspensa alimentada por um catálogo compartilhado
// (Regional, Diretoria, Departamento, Setor, Unidade). Ao digitar um item novo, ele é
// adicionado ao catálogo (via onAddOption) e passa a aparecer para todo mundo depois.
function EditableSelect({
  value,
  options,
  onChange,
  onAddOption,
  placeholder
}) {
  const NS = window.CicloDeDesenvolvimentoDesignSystem_cb4518;
  const {
    Select,
    TextField,
    Button
  } = NS;
  const [adding, setAdding] = React.useState(false);
  const [novo, setNovo] = React.useState("");
  const ADD_FLAG = "__novo__";
  if (adding) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 6
      }
    }, /*#__PURE__*/React.createElement(TextField, {
      autoFocus: true,
      placeholder: placeholder || "Digite o novo item",
      value: novo,
      onChange: e => setNovo(e.target.value),
      onKeyDown: e => {
        if (e.key === "Enter") {
          e.preventDefault();
          confirmar();
        }
        if (e.key === "Escape") {
          setAdding(false);
          setNovo("");
        }
      }
    }), /*#__PURE__*/React.createElement(Button, {
      type: "button",
      size: "sm",
      variant: "secondary",
      onClick: () => {
        setAdding(false);
        setNovo("");
      }
    }, "Cancelar"), /*#__PURE__*/React.createElement(Button, {
      type: "button",
      size: "sm",
      variant: "primary",
      onClick: confirmar
    }, "OK"));
  }
  function confirmar() {
    const v = titleCase(novo.trim());
    if (!v) {
      setAdding(false);
      return;
    }
    if (!(options || []).some(o => o.toLowerCase() === v.toLowerCase())) onAddOption(v);
    onChange(v);
    setAdding(false);
    setNovo("");
  }
  return /*#__PURE__*/React.createElement(Select, {
    value: value || "",
    onChange: e => {
      if (e.target.value === ADD_FLAG) {
        setAdding(true);
      } else {
        onChange(e.target.value);
      }
    }
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Selecione..."), (options || []).map(o => /*#__PURE__*/React.createElement("option", {
    key: o,
    value: o
  }, o)), /*#__PURE__*/React.createElement("option", {
    value: ADD_FLAG
  }, "+ Cadastrar novo..."));
}

// ---- Identificadores e credenciais ----
function genId(prefix) {
  return (prefix || "c") + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

// Gera um "usuário" a partir do nome: primeiro nome + primeira letra do primeiro sobrenome
// (ex.: "Juliana Barbosa Lima" -> "julianab"), evitando colisão com existentes.
function slugUsuario(nome, existentes) {
  const base = String(nome || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim().split(/\s+/).filter(Boolean);
  let slug = base.length > 1 ? base[0] + base[1][0] : base[0] || "gestor";
  slug = slug.replace(/[^a-z0-9]/g, "") || "gestor";
  const lista = (existentes || []).map(x => String(x).toLowerCase());
  let candidato = slug,
    i = 1;
  while (lista.includes(candidato)) {
    i += 1;
    candidato = slug + i;
  }
  return candidato;
}

// Senha inicial aleatória e legível (o RH repassa ao gestor; troca é forçada no 1º acesso).
function genSenhaInicial() {
  const letras = "ABCDEFGHJKMNPQRSTUVWXYZ";
  const numeros = "23456789";
  let s = "";
  for (let i = 0; i < 3; i++) s += letras[Math.floor(Math.random() * letras.length)];
  s += "@";
  for (let i = 0; i < 3; i++) s += numeros[Math.floor(Math.random() * numeros.length)];
  return s;
}

// Dias entre hoje e uma data ISO (negativo se já passou).
function diasPara(iso) {
  if (!iso) return null;
  const alvo = new Date(iso + "T00:00:00");
  if (isNaN(alvo)) return null;
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  return Math.round((alvo - hoje) / 86400000);
}

// Adiciona uma entrada ao histórico/auditoria (mais recente primeiro, cap de 500 registros).
function addAuditEntry(setAuditLog, ator, tipo, acao, alvo, detalhe) {
  setAuditLog(log => [{
    id: genId("a"),
    ts: new Date().toISOString(),
    ator,
    tipo,
    acao,
    alvo,
    detalhe: detalhe || ""
  }, ...log].slice(0, 500));
}

// Tempo de empresa a partir da admissão até hoje (ou até a demissão).
function tempoEmpresa(admissao, demissao) {
  if (!admissao) return "—";
  const ini = new Date(admissao + "T00:00:00");
  const fim = demissao ? new Date(demissao + "T00:00:00") : new Date();
  if (isNaN(ini) || isNaN(fim) || fim < ini) return "—";
  let anos = fim.getFullYear() - ini.getFullYear();
  let meses = fim.getMonth() - ini.getMonth();
  if (fim.getDate() < ini.getDate()) meses -= 1;
  if (meses < 0) {
    anos -= 1;
    meses += 12;
  }
  const pa = anos === 1 ? "1 ano" : anos + " anos";
  const pm = meses === 1 ? "1 mês" : meses + " meses";
  if (anos <= 0) return pm;
  if (meses <= 0) return pa;
  return `${pa} e ${pm}`;
}

// Une um ciclo às informações do funcionário (e do gestor dele), produzindo o objeto
// usado pelas telas (Visão Geral, PDI, Form. Gestor, Comparação, PDF, Painel do RH).
function mergeCiclo(ciclo, funcionarios, gestores) {
  const f = (funcionarios || []).find(x => x.id === ciclo.funcionarioId) || {};
  const g = (gestores || []).find(x => x.id === f.gestorId) || null;
  return {
    ...ciclo,
    nome: f.nome || "(funcionário removido)",
    cargo: f.cargo || "",
    departamento: f.departamento || "",
    area: f.area || "",
    admissao: f.admissao || "",
    demitido: !!f.demitido,
    demissao: f.demissao || "",
    funcionarioGestorId: f.gestorId || "",
    // Aliases usados por telas legadas:
    gestor: g && g.nome || f.gestor || "",
    whatsapp: f.whatsapp || "",
    diretoria: f.departamento || "",
    revenda: f.area || "",
    // Hierarquia organizacional (cadastrada pelo RH no gestor):
    orgDiretoria: g && g.diretoria || "",
    orgRegional: g && g.regional || "",
    orgUnidade: g && g.unidade || "",
    orgSetor: g && g.setor || "",
    orgDepartamento: g && g.departamento || ""
  };
}

// Date helpers ----------------------------------------------------
function addMonths(iso, months) {
  if (!iso) return "";
  const d = new Date(iso + "T00:00:00");
  if (isNaN(d)) return "";
  d.setMonth(d.getMonth() + months);
  return d.toISOString().slice(0, 10);
}
function fmtDate(iso) {
  if (!iso) return "—";
  const d = new Date(iso + "T00:00:00");
  if (isNaN(d)) return "—";
  return d.toLocaleDateString("pt-BR");
}
// Prazo final do ciclo = data de aplicação + 180 dias completos.
function prazoFinal(c) {
  return addDays(c.data, 180);
}
function addDays(iso, days) {
  if (!iso) return "";
  const d = new Date(iso + "T00:00:00");
  if (isNaN(d)) return "";
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}
// Estatísticas de PDI (técnico/comportamental) sobre uma lista de colaboradores.
function pdiStats(colabs) {
  const acc = {
    tecTotal: 0,
    tecDone: 0,
    compTotal: 0,
    compDone: 0
  };
  colabs.forEach(c => {
    const g = c.gestorForm || {};
    (g.rowsTec || []).forEach(r => {
      acc.tecTotal++;
      if (r.done) acc.tecDone++;
    });
    (g.rowsComp || []).forEach(r => {
      acc.compTotal++;
      if (r.done) acc.compDone++;
    });
  });
  acc.tecPct = acc.tecTotal ? Math.round(acc.tecDone / acc.tecTotal * 100) : 0;
  acc.compPct = acc.compTotal ? Math.round(acc.compDone / acc.compTotal * 100) : 0;
  return acc;
}
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/ciclo/helpers.jsx", error: String((e && e.message) || e) }); }

// ui_kits/ciclo/logo.js
try { (() => {
// Logos embutidos (data URI) — para funcionar em arquivo único / offline.
window.CICLO_LOGO_BRANCA = "data:image/png;base64,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";
window.CICLO_LOGO_COLORIDA = "data:image/png;base64,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";
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/ciclo/logo.js", error: String((e && e.message) || e) }); }

// ui_kits/ciclo/supabase-config.js
try { (() => {
// Cole aqui a URL e a chave "anon public" do SEU projeto Supabase.
// Onde encontrar: supabase.com → seu projeto → Project Settings → API.
// Esses valores são públicos por design (protegidos pelas regras de RLS do banco),
// por isso podem ficar neste arquivo mesmo publicando o site no GitHub Pages.
window.CICLO_SUPABASE_URL = "https://kkmynsjqhhmvwrqooybr.supabase.co";
window.CICLO_SUPABASE_ANON_KEY = "sb_publishable_G0nBE5aJQnYvpvPewCJN-g__UxMaW_o";
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/ciclo/supabase-config.js", error: String((e && e.message) || e) }); }

// ui_kits/ciclo/supabaseClient.js
try { (() => {
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
      funcionarios: data && data.funcionarios || [],
      ciclos: data && data.ciclos || [],
      gestores: data && data.gestores || [],
      auditLog: data && data.auditLog || [],
      rhAuth: data && data.rhAuth || null,
      catalogos: data && data.catalogos || window.CICLO_DATA && window.CICLO_DATA.catalogos || {
        regionais: [],
        diretorias: [],
        departamentos: [],
        setores: [],
        unidades: []
      }
    };
  }
  async function loadState() {
    const sb = getClient();
    if (!sb) return null;
    const {
      data,
      error
    } = await sb.from(TABLE).select("funcionarios,ciclos,gestores,auditLog,rhAuth,catalogos").eq("id", ROW_ID).maybeSingle();
    if (error) {
      console.error("Supabase (load):", error.message);
      return null;
    }
    if (!data) {
      const fresh = withDefaults(null);
      const {
        error: insErr
      } = await sb.from(TABLE).insert({
        id: ROW_ID,
        ...fresh
      });
      if (insErr) console.error("Supabase (insert inicial):", insErr.message);
      return fresh;
    }
    return withDefaults(data);
  }
  async function saveState(state) {
    const sb = getClient();
    if (!sb) return;
    const {
      error
    } = await sb.from(TABLE).upsert({
      id: ROW_ID,
      funcionarios: state.funcionarios,
      ciclos: state.ciclos,
      gestores: state.gestores || [],
      auditLog: state.auditLog || [],
      rhAuth: state.rhAuth || null,
      catalogos: state.catalogos || {},
      updated_at: new Date().toISOString()
    });
    if (error) console.error("Supabase (save):", error.message);
    return !error;
  }

  // Chama onRemoteChange sempre que OUTRO navegador salvar uma mudança.
  function subscribe(onRemoteChange) {
    const sb = getClient();
    if (!sb) return function () {};
    const channel = sb.channel("ciclo_dados_changes").on("postgres_changes", {
      event: "UPDATE",
      schema: "public",
      table: TABLE,
      filter: "id=eq." + ROW_ID
    }, function (payload) {
      onRemoteChange(withDefaults(payload.new));
    }).subscribe();
    return function () {
      sb.removeChannel(channel);
    };
  }
  window.CicloSupabase = {
    isConfigured,
    loadState,
    saveState,
    subscribe
  };
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/ciclo/supabaseClient.js", error: String((e && e.message) || e) }); }

// ui_kits/ciclo/tweaks-panel.jsx
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)

/* BEGIN USAGE */
// tweaks-panel.jsx
// Reusable Tweaks shell + form-control helpers.
// Exports (to window): useTweaks, TweaksPanel, TweakSection, TweakRow, TweakSlider,
//   TweakToggle, TweakRadio, TweakSelect, TweakText, TweakNumber, TweakColor, TweakButton.
//
// Owns the host protocol (listens for __activate_edit_mode / __deactivate_edit_mode,
// posts __edit_mode_available / __edit_mode_set_keys / __edit_mode_dismissed) so
// individual prototypes don't re-roll it. Ships a consistent set of controls so you
// don't hand-draw <input type="range">, segmented radios, steppers, etc.
//
// Usage (in an HTML file that loads React + Babel):
//
//   const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
//     "primaryColor": "#D97757",
//     "palette": ["#D97757", "#29261b", "#f6f4ef"],
//     "fontSize": 16,
//     "density": "regular",
//     "dark": false
//   }/*EDITMODE-END*/;
//
//   function App() {
//     const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
//     return (
//       <div style={{ fontSize: t.fontSize, color: t.primaryColor }}>
//         Hello
//         <TweaksPanel>
//           <TweakSection label="Typography" />
//           <TweakSlider label="Font size" value={t.fontSize} min={10} max={32} unit="px"
//                        onChange={(v) => setTweak('fontSize', v)} />
//           <TweakRadio  label="Density" value={t.density}
//                        options={['compact', 'regular', 'comfy']}
//                        onChange={(v) => setTweak('density', v)} />
//           <TweakSection label="Theme" />
//           <TweakColor  label="Primary" value={t.primaryColor}
//                        options={['#D97757', '#2A6FDB', '#1F8A5B', '#7A5AE0']}
//                        onChange={(v) => setTweak('primaryColor', v)} />
//           <TweakColor  label="Palette" value={t.palette}
//                        options={[['#D97757', '#29261b', '#f6f4ef'],
//                                  ['#475569', '#0f172a', '#f1f5f9']]}
//                        onChange={(v) => setTweak('palette', v)} />
//           <TweakToggle label="Dark mode" value={t.dark}
//                        onChange={(v) => setTweak('dark', v)} />
//         </TweaksPanel>
//       </div>
//     );
//   }
//
// TweakRadio is the segmented control for 2–3 short options (auto-falls-back to
// TweakSelect past ~16/~10 chars per label); reach for TweakSelect directly when
// options are many or long. For color tweaks always curate 3-4 options rather than
// a free picker; an option can also be a whole 2–5 color palette (the stored value
// is the array). The Tweak* controls are a floor, not a ceiling — build custom
// controls inside the panel if a tweak calls for UI they don't cover.
/* END USAGE */
// ─────────────────────────────────────────────────────────────────────────────

const __TWEAKS_STYLE = `
  .twk-panel{position:fixed;right:16px;bottom:16px;z-index:2147483646;width:280px;
    max-height:calc(100vh - 32px);display:flex;flex-direction:column;
    transform:scale(var(--dc-inv-zoom,1));transform-origin:bottom right;
    background:rgba(250,249,247,.78);color:#29261b;
    -webkit-backdrop-filter:blur(24px) saturate(160%);backdrop-filter:blur(24px) saturate(160%);
    border:.5px solid rgba(255,255,255,.6);border-radius:14px;
    box-shadow:0 1px 0 rgba(255,255,255,.5) inset,0 12px 40px rgba(0,0,0,.18);
    font:11.5px/1.4 ui-sans-serif,system-ui,-apple-system,sans-serif;overflow:hidden}
  .twk-hd{display:flex;align-items:center;justify-content:space-between;
    padding:10px 8px 10px 14px;cursor:move;user-select:none}
  .twk-hd b{font-size:12px;font-weight:600;letter-spacing:.01em}
  .twk-x{appearance:none;border:0;background:transparent;color:rgba(41,38,27,.55);
    width:22px;height:22px;border-radius:6px;cursor:default;font-size:13px;line-height:1}
  .twk-x:hover{background:rgba(0,0,0,.06);color:#29261b}
  .twk-body{padding:2px 14px 14px;display:flex;flex-direction:column;gap:10px;
    overflow-y:auto;overflow-x:hidden;min-height:0;
    scrollbar-width:thin;scrollbar-color:rgba(0,0,0,.15) transparent}
  .twk-body::-webkit-scrollbar{width:8px}
  .twk-body::-webkit-scrollbar-track{background:transparent;margin:2px}
  .twk-body::-webkit-scrollbar-thumb{background:rgba(0,0,0,.15);border-radius:4px;
    border:2px solid transparent;background-clip:content-box}
  .twk-body::-webkit-scrollbar-thumb:hover{background:rgba(0,0,0,.25);
    border:2px solid transparent;background-clip:content-box}
  .twk-row{display:flex;flex-direction:column;gap:5px}
  .twk-row-h{flex-direction:row;align-items:center;justify-content:space-between;gap:10px}
  .twk-lbl{display:flex;justify-content:space-between;align-items:baseline;
    color:rgba(41,38,27,.72)}
  .twk-lbl>span:first-child{font-weight:500}
  .twk-val{color:rgba(41,38,27,.5);font-variant-numeric:tabular-nums}

  .twk-sect{font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;
    color:rgba(41,38,27,.45);padding:10px 0 0}
  .twk-sect:first-child{padding-top:0}

  .twk-field{appearance:none;box-sizing:border-box;width:100%;min-width:0;height:26px;padding:0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;
    background:rgba(255,255,255,.6);color:inherit;font:inherit;outline:none}
  .twk-field:focus{border-color:rgba(0,0,0,.25);background:rgba(255,255,255,.85)}
  select.twk-field{padding-right:22px;
    background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path fill='rgba(0,0,0,.5)' d='M0 0h10L5 6z'/></svg>");
    background-repeat:no-repeat;background-position:right 8px center}

  .twk-slider{appearance:none;-webkit-appearance:none;width:100%;height:4px;margin:6px 0;
    border-radius:999px;background:rgba(0,0,0,.12);outline:none}
  .twk-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;
    width:14px;height:14px;border-radius:50%;background:#fff;
    border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}
  .twk-slider::-moz-range-thumb{width:14px;height:14px;border-radius:50%;
    background:#fff;border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}

  .twk-seg{position:relative;display:flex;padding:2px;border-radius:8px;
    background:rgba(0,0,0,.06);user-select:none}
  .twk-seg-thumb{position:absolute;top:2px;bottom:2px;border-radius:6px;
    background:rgba(255,255,255,.9);box-shadow:0 1px 2px rgba(0,0,0,.12);
    transition:left .15s cubic-bezier(.3,.7,.4,1),width .15s}
  .twk-seg.dragging .twk-seg-thumb{transition:none}
  .twk-seg button{appearance:none;position:relative;z-index:1;flex:1;border:0;
    background:transparent;color:inherit;font:inherit;font-weight:500;min-height:22px;
    border-radius:6px;cursor:default;padding:4px 6px;line-height:1.2;
    overflow-wrap:anywhere}

  .twk-toggle{position:relative;width:32px;height:18px;border:0;border-radius:999px;
    background:rgba(0,0,0,.15);transition:background .15s;cursor:default;padding:0}
  .twk-toggle[data-on="1"]{background:#34c759}
  .twk-toggle i{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;
    background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.25);transition:transform .15s}
  .twk-toggle[data-on="1"] i{transform:translateX(14px)}

  .twk-num{display:flex;align-items:center;box-sizing:border-box;min-width:0;height:26px;padding:0 0 0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;background:rgba(255,255,255,.6)}
  .twk-num-lbl{font-weight:500;color:rgba(41,38,27,.6);cursor:ew-resize;
    user-select:none;padding-right:8px}
  .twk-num input{flex:1;min-width:0;height:100%;border:0;background:transparent;
    font:inherit;font-variant-numeric:tabular-nums;text-align:right;padding:0 8px 0 0;
    outline:none;color:inherit;-moz-appearance:textfield}
  .twk-num input::-webkit-inner-spin-button,.twk-num input::-webkit-outer-spin-button{
    -webkit-appearance:none;margin:0}
  .twk-num-unit{padding-right:8px;color:rgba(41,38,27,.45)}

  .twk-btn{appearance:none;height:26px;padding:0 12px;border:0;border-radius:7px;
    background:rgba(0,0,0,.78);color:#fff;font:inherit;font-weight:500;cursor:default}
  .twk-btn:hover{background:rgba(0,0,0,.88)}
  .twk-btn.secondary{background:rgba(0,0,0,.06);color:inherit}
  .twk-btn.secondary:hover{background:rgba(0,0,0,.1)}

  .twk-swatch{appearance:none;-webkit-appearance:none;width:56px;height:22px;
    border:.5px solid rgba(0,0,0,.1);border-radius:6px;padding:0;cursor:default;
    background:transparent;flex-shrink:0}
  .twk-swatch::-webkit-color-swatch-wrapper{padding:0}
  .twk-swatch::-webkit-color-swatch{border:0;border-radius:5.5px}
  .twk-swatch::-moz-color-swatch{border:0;border-radius:5.5px}

  .twk-chips{display:flex;gap:6px}
  .twk-chip{position:relative;appearance:none;flex:1;min-width:0;height:46px;
    padding:0;border:0;border-radius:6px;overflow:hidden;cursor:default;
    box-shadow:0 0 0 .5px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.06);
    transition:transform .12s cubic-bezier(.3,.7,.4,1),box-shadow .12s}
  .twk-chip:hover{transform:translateY(-1px);
    box-shadow:0 0 0 .5px rgba(0,0,0,.18),0 4px 10px rgba(0,0,0,.12)}
  .twk-chip[data-on="1"]{box-shadow:0 0 0 1.5px rgba(0,0,0,.85),
    0 2px 6px rgba(0,0,0,.15)}
  .twk-chip>span{position:absolute;top:0;bottom:0;right:0;width:34%;
    display:flex;flex-direction:column;box-shadow:-1px 0 0 rgba(0,0,0,.1)}
  .twk-chip>span>i{flex:1;box-shadow:0 -1px 0 rgba(0,0,0,.1)}
  .twk-chip>span>i:first-child{box-shadow:none}
  .twk-chip svg{position:absolute;top:6px;left:6px;width:13px;height:13px;
    filter:drop-shadow(0 1px 1px rgba(0,0,0,.3))}
`;

// ── useTweaks ───────────────────────────────────────────────────────────────
// Single source of truth for tweak values. setTweak persists via the host
// (__edit_mode_set_keys → host rewrites the EDITMODE block on disk).
function useTweaks(defaults) {
  const [values, setValues] = React.useState(defaults);
  // Accepts either setTweak('key', value) or setTweak({ key: value, ... }) so a
  // useState-style call doesn't write a "[object Object]" key into the persisted
  // JSON block.
  const setTweak = React.useCallback((keyOrEdits, val) => {
    const edits = typeof keyOrEdits === 'object' && keyOrEdits !== null ? keyOrEdits : {
      [keyOrEdits]: val
    };
    setValues(prev => ({
      ...prev,
      ...edits
    }));
    window.parent.postMessage({
      type: '__edit_mode_set_keys',
      edits
    }, '*');
    // Same-window signal so in-page listeners (deck-stage rail thumbnails)
    // can react — the parent message only reaches the host, not peers.
    window.dispatchEvent(new CustomEvent('tweakchange', {
      detail: edits
    }));
  }, []);
  return [values, setTweak];
}

// ── TweaksPanel ─────────────────────────────────────────────────────────────
// Floating shell. Registers the protocol listener BEFORE announcing
// availability — if the announce ran first, the host's activate could land
// before our handler exists and the toolbar toggle would silently no-op.
// The close button posts __edit_mode_dismissed so the host's toolbar toggle
// flips off in lockstep; the host echoes __deactivate_edit_mode back which
// is what actually hides the panel.
function TweaksPanel({
  title = 'Tweaks',
  children
}) {
  const [open, setOpen] = React.useState(false);
  const dragRef = React.useRef(null);
  const offsetRef = React.useRef({
    x: 16,
    y: 16
  });
  const PAD = 16;
  const clampToViewport = React.useCallback(() => {
    const panel = dragRef.current;
    if (!panel) return;
    const w = panel.offsetWidth,
      h = panel.offsetHeight;
    const maxRight = Math.max(PAD, window.innerWidth - w - PAD);
    const maxBottom = Math.max(PAD, window.innerHeight - h - PAD);
    offsetRef.current = {
      x: Math.min(maxRight, Math.max(PAD, offsetRef.current.x)),
      y: Math.min(maxBottom, Math.max(PAD, offsetRef.current.y))
    };
    panel.style.right = offsetRef.current.x + 'px';
    panel.style.bottom = offsetRef.current.y + 'px';
  }, []);
  React.useEffect(() => {
    if (!open) return;
    clampToViewport();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', clampToViewport);
      return () => window.removeEventListener('resize', clampToViewport);
    }
    const ro = new ResizeObserver(clampToViewport);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, [open, clampToViewport]);
  React.useEffect(() => {
    const onMsg = e => {
      const t = e?.data?.type;
      if (t === '__activate_edit_mode') setOpen(true);else if (t === '__deactivate_edit_mode') setOpen(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({
      type: '__edit_mode_available'
    }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);
  const dismiss = () => {
    setOpen(false);
    window.parent.postMessage({
      type: '__edit_mode_dismissed'
    }, '*');
  };
  const onDragStart = e => {
    const panel = dragRef.current;
    if (!panel) return;
    const r = panel.getBoundingClientRect();
    const sx = e.clientX,
      sy = e.clientY;
    const startRight = window.innerWidth - r.right;
    const startBottom = window.innerHeight - r.bottom;
    const move = ev => {
      offsetRef.current = {
        x: startRight - (ev.clientX - sx),
        y: startBottom - (ev.clientY - sy)
      };
      clampToViewport();
    };
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };
  if (!open) return null;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, __TWEAKS_STYLE), /*#__PURE__*/React.createElement("div", {
    ref: dragRef,
    className: "twk-panel",
    "data-omelette-chrome": "",
    style: {
      right: offsetRef.current.x,
      bottom: offsetRef.current.y
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-hd",
    onMouseDown: onDragStart
  }, /*#__PURE__*/React.createElement("b", null, title), /*#__PURE__*/React.createElement("button", {
    className: "twk-x",
    "aria-label": "Close tweaks",
    onMouseDown: e => e.stopPropagation(),
    onClick: dismiss
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    className: "twk-body"
  }, children)));
}

// ── Layout helpers ──────────────────────────────────────────────────────────

function TweakSection({
  label,
  children
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "twk-sect"
  }, label), children);
}
function TweakRow({
  label,
  value,
  children,
  inline = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: inline ? 'twk-row twk-row-h' : 'twk-row'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label), value != null && /*#__PURE__*/React.createElement("span", {
    className: "twk-val"
  }, value)), children);
}

// ── Controls ────────────────────────────────────────────────────────────────

function TweakSlider({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  unit = '',
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label,
    value: `${value}${unit}`
  }, /*#__PURE__*/React.createElement("input", {
    type: "range",
    className: "twk-slider",
    min: min,
    max: max,
    step: step,
    value: value,
    onChange: e => onChange(Number(e.target.value))
  }));
}
function TweakToggle({
  label,
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-row twk-row-h"
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "twk-toggle",
    "data-on": value ? '1' : '0',
    role: "switch",
    "aria-checked": !!value,
    onClick: () => onChange(!value)
  }, /*#__PURE__*/React.createElement("i", null)));
}
function TweakRadio({
  label,
  value,
  options,
  onChange
}) {
  const trackRef = React.useRef(null);
  const [dragging, setDragging] = React.useState(false);
  // The active value is read by pointer-move handlers attached for the lifetime
  // of a drag — ref it so a stale closure doesn't fire onChange for every move.
  const valueRef = React.useRef(value);
  valueRef.current = value;

  // Segments wrap mid-word once per-segment width runs out. The track is
  // ~248px (280 panel − 28 body pad − 4 seg pad), each button loses 12px
  // to its own padding, and 11.5px system-ui averages ~6.3px/char — so 2
  // options fit ~16 chars each, 3 fit ~10. Past that (or >3 options), fall
  // back to a dropdown rather than wrap.
  const labelLen = o => String(typeof o === 'object' ? o.label : o).length;
  const maxLen = options.reduce((m, o) => Math.max(m, labelLen(o)), 0);
  const fitsAsSegments = maxLen <= ({
    2: 16,
    3: 10
  }[options.length] ?? 0);
  if (!fitsAsSegments) {
    // <select> emits strings — map back to the original option value so the
    // fallback stays type-preserving (numbers, booleans) like the segment path.
    const resolve = s => {
      const m = options.find(o => String(typeof o === 'object' ? o.value : o) === s);
      return m === undefined ? s : typeof m === 'object' ? m.value : m;
    };
    return /*#__PURE__*/React.createElement(TweakSelect, {
      label: label,
      value: value,
      options: options,
      onChange: s => onChange(resolve(s))
    });
  }
  const opts = options.map(o => typeof o === 'object' ? o : {
    value: o,
    label: o
  });
  const idx = Math.max(0, opts.findIndex(o => o.value === value));
  const n = opts.length;
  const segAt = clientX => {
    const r = trackRef.current.getBoundingClientRect();
    const inner = r.width - 4;
    const i = Math.floor((clientX - r.left - 2) / inner * n);
    return opts[Math.max(0, Math.min(n - 1, i))].value;
  };
  const onPointerDown = e => {
    setDragging(true);
    const v0 = segAt(e.clientX);
    if (v0 !== valueRef.current) onChange(v0);
    const move = ev => {
      if (!trackRef.current) return;
      const v = segAt(ev.clientX);
      if (v !== valueRef.current) onChange(v);
    };
    const up = () => {
      setDragging(false);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    ref: trackRef,
    role: "radiogroup",
    onPointerDown: onPointerDown,
    className: dragging ? 'twk-seg dragging' : 'twk-seg'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-seg-thumb",
    style: {
      left: `calc(2px + ${idx} * (100% - 4px) / ${n})`,
      width: `calc((100% - 4px) / ${n})`
    }
  }), opts.map(o => /*#__PURE__*/React.createElement("button", {
    key: o.value,
    type: "button",
    role: "radio",
    "aria-checked": o.value === value
  }, o.label))));
}
function TweakSelect({
  label,
  value,
  options,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("select", {
    className: "twk-field",
    value: value,
    onChange: e => onChange(e.target.value)
  }, options.map(o => {
    const v = typeof o === 'object' ? o.value : o;
    const l = typeof o === 'object' ? o.label : o;
    return /*#__PURE__*/React.createElement("option", {
      key: v,
      value: v
    }, l);
  })));
}
function TweakText({
  label,
  value,
  placeholder,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("input", {
    className: "twk-field",
    type: "text",
    value: value,
    placeholder: placeholder,
    onChange: e => onChange(e.target.value)
  }));
}
function TweakNumber({
  label,
  value,
  min,
  max,
  step = 1,
  unit = '',
  onChange
}) {
  const clamp = n => {
    if (min != null && n < min) return min;
    if (max != null && n > max) return max;
    return n;
  };
  const startRef = React.useRef({
    x: 0,
    val: 0
  });
  const onScrubStart = e => {
    e.preventDefault();
    startRef.current = {
      x: e.clientX,
      val: value
    };
    const decimals = (String(step).split('.')[1] || '').length;
    const move = ev => {
      const dx = ev.clientX - startRef.current.x;
      const raw = startRef.current.val + dx * step;
      const snapped = Math.round(raw / step) * step;
      onChange(clamp(Number(snapped.toFixed(decimals))));
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-num"
  }, /*#__PURE__*/React.createElement("span", {
    className: "twk-num-lbl",
    onPointerDown: onScrubStart
  }, label), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: value,
    min: min,
    max: max,
    step: step,
    onChange: e => onChange(clamp(Number(e.target.value)))
  }), unit && /*#__PURE__*/React.createElement("span", {
    className: "twk-num-unit"
  }, unit));
}

// Relative-luminance contrast pick — checkmarks drawn over a swatch need to
// read on both #111 and #fafafa without per-option configuration. Hex input
// only (#rgb / #rrggbb); named or rgb()/hsl() colors fall through to "light".
function __twkIsLight(hex) {
  const h = String(hex).replace('#', '');
  const x = h.length === 3 ? h.replace(/./g, c => c + c) : h.padEnd(6, '0');
  const n = parseInt(x.slice(0, 6), 16);
  if (Number.isNaN(n)) return true;
  const r = n >> 16 & 255,
    g = n >> 8 & 255,
    b = n & 255;
  return r * 299 + g * 587 + b * 114 > 148000;
}
const __TwkCheck = ({
  light
}) => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 14 14",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M3 7.2 5.8 10 11 4.2",
  fill: "none",
  strokeWidth: "2.2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  stroke: light ? 'rgba(0,0,0,.78)' : '#fff'
}));

// TweakColor — curated color/palette picker. Each option is either a single
// hex string or an array of 1-5 hex strings; the card adapts — a lone color
// renders solid, a palette renders colors[0] as the hero (left ~2/3) with the
// rest stacked in a sharp column on the right. onChange emits the
// option in the shape it was passed (string stays string, array stays array).
// Without options it falls back to the native color input for back-compat.
function TweakColor({
  label,
  value,
  options,
  onChange
}) {
  if (!options || !options.length) {
    return /*#__PURE__*/React.createElement("div", {
      className: "twk-row twk-row-h"
    }, /*#__PURE__*/React.createElement("div", {
      className: "twk-lbl"
    }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("input", {
      type: "color",
      className: "twk-swatch",
      value: value,
      onChange: e => onChange(e.target.value)
    }));
  }
  // Native <input type=color> emits lowercase hex per the HTML spec, so
  // compare case-insensitively. String() guards JSON.stringify(undefined),
  // which returns the primitive undefined (no .toLowerCase).
  const key = o => String(JSON.stringify(o)).toLowerCase();
  const cur = key(value);
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-chips",
    role: "radiogroup"
  }, options.map((o, i) => {
    const colors = Array.isArray(o) ? o : [o];
    const [hero, ...rest] = colors;
    const sup = rest.slice(0, 4);
    const on = key(o) === cur;
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      type: "button",
      className: "twk-chip",
      role: "radio",
      "aria-checked": on,
      "data-on": on ? '1' : '0',
      "aria-label": colors.join(', '),
      title: colors.join(' · '),
      style: {
        background: hero
      },
      onClick: () => onChange(o)
    }, sup.length > 0 && /*#__PURE__*/React.createElement("span", null, sup.map((c, j) => /*#__PURE__*/React.createElement("i", {
      key: j,
      style: {
        background: c
      }
    }))), on && /*#__PURE__*/React.createElement(__TwkCheck, {
      light: __twkIsLight(hero)
    }));
  })));
}
function TweakButton({
  label,
  onClick,
  secondary = false
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: secondary ? 'twk-btn secondary' : 'twk-btn',
    onClick: onClick
  }, label);
}
Object.assign(window, {
  useTweaks,
  TweaksPanel,
  TweakSection,
  TweakRow,
  TweakSlider,
  TweakToggle,
  TweakRadio,
  TweakSelect,
  TweakText,
  TweakNumber,
  TweakColor,
  TweakButton
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/ciclo/tweaks-panel.jsx", error: String((e && e.message) || e) }); }

__ds_ns.DataTable = __ds_scope.DataTable;

__ds_ns.FilterBar = __ds_scope.FilterBar;

__ds_ns.Pane = __ds_scope.Pane;

__ds_ns.DualPane = __ds_scope.DualPane;

__ds_ns.LinkBox = __ds_scope.LinkBox;

__ds_ns.PdiTable = __ds_scope.PdiTable;

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Banner = __ds_scope.Banner;

__ds_ns.RoleTag = __ds_scope.RoleTag;

__ds_ns.Legend = __ds_scope.Legend;

__ds_ns.MetricCard = __ds_scope.MetricCard;

__ds_ns.ProgressBar = __ds_scope.ProgressBar;

__ds_ns.StatusBadge = __ds_scope.StatusBadge;

__ds_ns.Modal = __ds_scope.Modal;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Field = __ds_scope.Field;

__ds_ns.FormGrid = __ds_scope.FormGrid;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.TextArea = __ds_scope.TextArea;

__ds_ns.TextField = __ds_scope.TextField;

__ds_ns.DateField = __ds_scope.DateField;

__ds_ns.AppHeader = __ds_scope.AppHeader;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.SectionTitle = __ds_scope.SectionTitle;

})();
