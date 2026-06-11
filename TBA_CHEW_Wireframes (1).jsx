import { useState, useEffect, useRef } from "react";

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const T = {
  teal:       "#007A7C",
  tealDark:   "#005F61",
  tealLight:  "#E6F4F4",
  tealMid:    "#B2DEDE",
  navy:       "#1A2B4A",
  lime:       "#C6F135",
  limeDark:   "#A8D020",
  white:      "#FFFFFF",
  offWhite:   "#F7F8FA",
  grey50:     "#F5F5F5",
  grey100:    "#EEEEEE",
  grey200:    "#CCCCCC",
  grey400:    "#999999",
  grey600:    "#666666",
  grey800:    "#333333",
  red:        "#D32F2F",
  redLight:   "#FFEBEE",
  redMid:     "#EF9A9A",
  orange:     "#E65100",
  orangeLight:"#FFF3E0",
  amber:      "#F9A825",
  amberLight: "#FFFDE7",
  green:      "#2E7D32",
  greenLight: "#E8F5E9",
  elevated:   "#7B1FA2",
  elevLight:  "#F3E5F5",
};

// ─── GLOBAL STYLES ────────────────────────────────────────────────────────────
const globalStyle = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }
  body { font-family: 'DM Sans', sans-serif; background: #1a1a2e; display: flex; justify-content: center; align-items: flex-start; min-height: 100vh; padding: 24px; }
  ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-thumb { background: ${T.grey200}; border-radius: 2px; }
`;

// ─── RISK COLOURS ─────────────────────────────────────────────────────────────
const RISK = {
  NORMAL:   { bg: T.greenLight,  border: T.green,   text: T.green,   label: "NORMAL" },
  ELEVATED: { bg: T.elevLight,   border: T.elevated,text: T.elevated,label: "ELEVATED" },
  HIGH:     { bg: T.orangeLight, border: T.orange,  text: T.orange,  label: "HIGH RISK" },
  CRITICAL: { bg: T.redLight,    border: T.red,     text: T.red,     label: "CRITICAL" },
};

// ─── SAMPLE DATA ──────────────────────────────────────────────────────────────
const CLIENTS = [
  { id:"C001", name:"Kemi Afolabi",    age:26, ega:"28 wks", edd:"12 Aug 2026", risk:"NORMAL",   phone:"0803 456 7890", lga:"Surulere", lmp:"10 Jan 2026", gravida:1, parity:0 },
  { id:"C002", name:"Bisi Adeyemi",    age:31, ega:"34 wks", edd:"28 Jun 2026", risk:"HIGH",     phone:"0802 234 5678", lga:"Surulere", lmp:"20 Oct 2025", gravida:3, parity:2 },
  { id:"C003", name:"Titi Ogun",       age:22, ega:"16 wks", edd:"3 Nov 2026",  risk:"NORMAL",   phone:"0901 123 4567", lga:"Surulere", lmp:"20 Mar 2026", gravida:1, parity:0 },
  { id:"C004", name:"Ngozi Eze",       age:28, ega:"8 wks",  edd:"14 Jan 2027", risk:"ELEVATED", phone:"0805 678 9012", lga:"Surulere", lmp:"12 May 2026", gravida:2, parity:1 },
  { id:"C005", name:"Aminat Yusuf",    age:24, ega:"36 wks", edd:"5 Jun 2026",  risk:"NORMAL",   phone:"0807 890 1234", lga:"Surulere", lmp:"5 Sep 2025",  gravida:2, parity:1 },
];

const TBAS = [
  { name:"Mama Adunola Fatai", clients:23, ancVisits:6, deliveries:1, training:"6/8" },
  { name:"Mama Chiamaka Eze",  clients:18, ancVisits:4, deliveries:0, training:"8/8" },
  { name:"Mama Yetunde Alabi", clients:31, ancVisits:9, deliveries:2, training:"5/8" },
  { name:"Mama Ngozi Nwosu",   clients:14, ancVisits:3, deliveries:1, training:"7/8" },
];

// ─── ICON COMPONENTS ─────────────────────────────────────────────────────────
const Icon = ({ name, size=20, color="currentColor" }) => {
  const icons = {
    home:     <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    users:    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    calendar: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
    refer:    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>,
    learn:    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>,
    alert:    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
    plus:     <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
    arrow:    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
    back:     <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>,
    check:    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
    wifi:     <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>,
    bell:     <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
    search:   <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
    bag:      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>,
    heart:    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke={color} strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
    phone:    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 9.7a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
    play:     <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke={color} strokeWidth="2"><polygon points="5 3 19 12 5 21 5 3"/></svg>,
    star:     <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke={color} strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
    eye:      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
    lock:     <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
    baby:     <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="3"/><path d="M12 11c-4 0-7 2-7 5v1h14v-1c0-3-3-5-7-5z"/></svg>,
    truck:    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>,
    settings: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  };
  return icons[name] || null;
};

// ─── REUSABLE UI ──────────────────────────────────────────────────────────────
const RiskBadge = ({ risk, small }) => {
  const r = RISK[risk] || RISK.NORMAL;
  return (
    <span style={{ background: r.bg, color: r.text, border: `1px solid ${r.border}`, borderRadius: 20, padding: small ? "2px 8px" : "4px 12px", fontSize: small ? 10 : 11, fontWeight: 700, letterSpacing: 0.5, whiteSpace: "nowrap" }}>
      {r.label}
    </span>
  );
};

const Btn = ({ children, onClick, variant="primary", fullWidth, small, icon, disabled }) => {
  const styles = {
    primary:   { background: T.lime,    color: T.navy,    border: "none" },
    danger:    { background: T.red,     color: T.white,   border: "none" },
    teal:      { background: T.teal,    color: T.white,   border: "none" },
    outline:   { background: "transparent", color: T.teal, border: `1.5px solid ${T.teal}` },
    ghost:     { background: T.grey50,  color: T.grey800, border: "none" },
    amber:     { background: T.amber,   color: T.navy,    border: "none" },
  };
  const s = styles[variant] || styles.primary;
  return (
    <button onClick={onClick} disabled={disabled} style={{ ...s, borderRadius: 14, padding: small ? "10px 16px" : "14px 20px", fontSize: small ? 13 : 15, fontWeight: 700, fontFamily: "'DM Sans', sans-serif", cursor: disabled ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, width: fullWidth ? "100%" : "auto", opacity: disabled ? 0.5 : 1, transition: "all 0.15s", letterSpacing: 0.2 }}>
      {icon && <Icon name={icon} size={16} color={s.color} />}
      {children}
    </button>
  );
};

const Input = ({ label, value, onChange, placeholder, type="text", suffix }) => (
  <div style={{ marginBottom: 14 }}>
    {label && <div style={{ fontSize: 11, fontWeight: 600, color: T.grey400, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 6 }}>{label}</div>}
    <div style={{ position: "relative" }}>
      <input type={type} value={value} onChange={e => onChange && onChange(e.target.value)} placeholder={placeholder} style={{ width: "100%", background: T.grey50, border: `1.5px solid ${T.grey100}`, borderRadius: 12, padding: "12px 14px", fontSize: 14, fontFamily: "'DM Sans', sans-serif", color: T.grey800, outline: "none" }} />
      {suffix && <span style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", fontSize: 12, color: T.grey400 }}>{suffix}</span>}
    </div>
  </div>
);

const RadioGroup = ({ label, options, value, onChange }) => (
  <div style={{ marginBottom: 14 }}>
    {label && <div style={{ fontSize: 11, fontWeight: 600, color: T.grey400, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 8 }}>{label}</div>}
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {options.map(opt => (
        <button key={opt} onClick={() => onChange(opt)} style={{ padding: "8px 14px", borderRadius: 20, border: `1.5px solid ${value === opt ? T.teal : T.grey200}`, background: value === opt ? T.tealLight : T.white, color: value === opt ? T.teal : T.grey600, fontSize: 13, fontWeight: value === opt ? 600 : 400, fontFamily: "'DM Sans', sans-serif", cursor: "pointer" }}>
          {opt}
        </button>
      ))}
    </div>
  </div>
);

const CheckGroup = ({ label, options, values, onChange }) => (
  <div style={{ marginBottom: 14 }}>
    {label && <div style={{ fontSize: 11, fontWeight: 600, color: T.grey400, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 8 }}>{label}</div>}
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {options.map(opt => {
        const checked = values.includes(opt);
        return (
          <button key={opt} onClick={() => onChange(opt)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderRadius: 12, border: `1.5px solid ${checked ? T.teal : T.grey100}`, background: checked ? T.tealLight : T.white, textAlign: "left", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
            <div style={{ width: 20, height: 20, borderRadius: 6, border: `2px solid ${checked ? T.teal : T.grey200}`, background: checked ? T.teal : T.white, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              {checked && <Icon name="check" size={12} color={T.white} />}
            </div>
            <span style={{ fontSize: 14, color: T.grey800 }}>{opt}</span>
          </button>
        );
      })}
    </div>
  </div>
);

const SectionLabel = ({ children }) => (
  <div style={{ fontSize: 11, fontWeight: 700, color: T.grey400, textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 12, marginTop: 20 }}>{children}</div>
);

const Card = ({ children, style, onClick }) => (
  <div onClick={onClick} style={{ background: T.white, borderRadius: 16, padding: 16, boxShadow: "0 2px 12px rgba(0,0,0,0.06)", cursor: onClick ? "pointer" : "default", ...style }}>
    {children}
  </div>
);

const AlertBanner = ({ type, title, body, onTap }) => {
  const colours = { red: [T.redLight, T.red], orange: [T.orangeLight, T.orange], amber: [T.amberLight, T.amber], green: [T.greenLight, T.green] };
  const [bg, border] = colours[type] || colours.amber;
  return (
    <div onClick={onTap} style={{ background: bg, border: `1.5px solid ${border}`, borderRadius: 14, padding: "12px 14px", cursor: onTap ? "pointer" : "default", marginBottom: 12 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: border, marginBottom: 2 }}>{title}</div>
      {body && <div style={{ fontSize: 12, color: T.grey600 }}>{body}</div>}
    </div>
  );
};

const StatTile = ({ value, label, color }) => (
  <div style={{ background: T.white, borderRadius: 14, padding: "12px 8px", textAlign: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.05)", flex: 1 }}>
    <div style={{ fontSize: 26, fontWeight: 800, color: color || T.teal, lineHeight: 1 }}>{value}</div>
    <div style={{ fontSize: 10, color: T.grey400, marginTop: 4, fontWeight: 500, lineHeight: 1.3 }}>{label}</div>
  </div>
);

const QuickAction = ({ icon, label, color, onClick }) => (
  <button onClick={onClick} style={{ background: T.white, borderRadius: 14, padding: "14px 10px", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, boxShadow: "0 2px 8px rgba(0,0,0,0.05)", border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", flex: 1 }}>
    <div style={{ width: 40, height: 40, borderRadius: 12, background: color + "18", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Icon name={icon} size={20} color={color} />
    </div>
    <div style={{ fontSize: 11, fontWeight: 600, color: T.grey700, textAlign: "center", lineHeight: 1.3 }}>{label}</div>
  </button>
);

// ─── PHONE SHELL ──────────────────────────────────────────────────────────────
const PhoneShell = ({ children, screen }) => (
  <div style={{ width: 390, background: "#fff", borderRadius: 48, boxShadow: "0 40px 120px rgba(0,0,0,0.6), 0 0 0 12px #111, inset 0 0 0 2px #333", overflow: "hidden", position: "relative", minHeight: 844 }}>
    {/* Status bar */}
    <div style={{ height: 44, background: screen === "login" ? "#2a2a2a" : T.teal, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", position: "relative" }}>
      <span style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>9:41 AM</span>
      <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", width: 120, height: 26, background: "#000", borderRadius: 13 }} />
      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
        <Icon name="wifi" size={14} color="#fff" />
        <div style={{ display: "flex", gap: 2 }}>
          {[1,2,3,4].map(i => <div key={i} style={{ width: 3, height: 3 + i * 2.5, background: "#fff", borderRadius: 1 }} />)}
        </div>
      </div>
    </div>
    {/* Content */}
    <div style={{ height: 800, overflowY: "auto", position: "relative" }}>
      {children}
    </div>
  </div>
);

// ─── BOTTOM NAV ───────────────────────────────────────────────────────────────
const BottomNav = ({ active, onNavigate }) => {
  const tabs = [
    { id: "home",    icon: "home",     label: "Home" },
    { id: "clients", icon: "users",    label: "Clients" },
    { id: "visits",  icon: "calendar", label: "Visits" },
    { id: "refer",   icon: "refer",    label: "Refer" },
    { id: "learn",   icon: "learn",    label: "Learn" },
  ];
  return (
    <div style={{ position: "sticky", bottom: 0, background: T.white, borderTop: `1px solid ${T.grey100}`, display: "flex", padding: "8px 0 12px" }}>
      {tabs.map(t => (
        <button key={t.id} onClick={() => onNavigate(t.id)} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
          <Icon name={t.icon} size={22} color={active === t.id ? T.teal : T.grey300} />
          <span style={{ fontSize: 10, fontWeight: active === t.id ? 700 : 400, color: active === t.id ? T.teal : T.grey400 }}>{t.label}</span>
        </button>
      ))}
    </div>
  );
};

// ─── TEAL HEADER ─────────────────────────────────────────────────────────────
const TealHeader = ({ title, subtitle, onBack, action }) => (
  <div style={{ background: `linear-gradient(135deg, ${T.teal} 0%, ${T.tealDark} 100%)`, padding: "16px 20px 20px", position: "sticky", top: 0, zIndex: 10 }}>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: subtitle ? 4 : 0 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {onBack && <button onClick={onBack} style={{ background: "rgba(255,255,255,0.2)", border: "none", borderRadius: 10, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><Icon name="back" size={18} color={T.white} /></button>}
        <div>
          <div style={{ fontSize: 18, fontWeight: 700, color: T.white }}>{title}</div>
          {subtitle && <div style={{ fontSize: 12, color: "rgba(255,255,255,0.75)", marginTop: 2 }}>{subtitle}</div>}
        </div>
      </div>
      {action}
    </div>
  </div>
);

const ScrollContent = ({ children, style }) => (
  <div style={{ padding: "16px 20px", ...style }}>{children}</div>
);

// ══════════════════════════════════════════════════════════════════════════════
//  SCREENS
// ══════════════════════════════════════════════════════════════════════════════

// ── LOGIN ─────────────────────────────────────────────────────────────────────
const LoginScreen = ({ nav }) => {
  const [phone, setPhone] = useState("");
  const [step, setStep] = useState("phone"); // phone | otp | face
  const [otp, setOtp] = useState(["","","","","",""]);
  return (
    <div style={{ minHeight: 800, background: "linear-gradient(160deg, #1a2b4a 0%, #007A7C 100%)", display: "flex", flexDirection: "column" }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "40px 32px" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ width: 72, height: 72, borderRadius: 24, background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
            <Icon name="heart" size={36} color={T.lime} />
          </div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", fontWeight: 500, letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>Access Heart Foundation</div>
          <div style={{ fontSize: 28, fontWeight: 800, color: T.white, lineHeight: 1.2 }}>Kairoi Intel<br/>TBA Tool</div>
        </div>
        {step === "phone" && (
          <div style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(10px)", borderRadius: 24, padding: 28 }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: T.white, marginBottom: 6 }}>Welcome</div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginBottom: 24 }}>Enter your phone number to continue</div>
            <div style={{ background: "rgba(255,255,255,0.12)", borderRadius: 14, padding: "14px 16px", display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <Icon name="phone" size={18} color="rgba(255,255,255,0.5)" />
              <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="0803 456 7890" style={{ background: "none", border: "none", outline: "none", fontSize: 16, color: T.white, fontFamily: "'DM Sans', sans-serif", flex: 1 }} />
            </div>
            <Btn onClick={() => setStep("otp")} fullWidth>Send OTP</Btn>
            <button onClick={() => setStep("face")} style={{ width: "100%", marginTop: 12, background: "none", border: "1.5px solid rgba(255,255,255,0.25)", borderRadius: 14, padding: 14, color: "rgba(255,255,255,0.8)", fontSize: 14, fontWeight: 600, fontFamily: "'DM Sans', sans-serif", cursor: "pointer" }}>
              Use Face Scan Instead
            </button>
          </div>
        )}
        {step === "otp" && (
          <div style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(10px)", borderRadius: 24, padding: 28 }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: T.white, marginBottom: 6 }}>OTP Verification</div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginBottom: 24 }}>Enter the 6-digit code sent to {phone || "your phone"}</div>
            <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 24 }}>
              {otp.map((v, i) => (
                <div key={i} style={{ width: 44, height: 54, background: "rgba(255,255,255,0.15)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 700, color: T.white, border: `2px solid ${v ? T.lime : "transparent"}` }}>
                  {v || ""}
                </div>
              ))}
            </div>
            <Btn onClick={() => nav("home")} fullWidth>Continue</Btn>
            <div style={{ textAlign: "center", marginTop: 16, fontSize: 13, color: "rgba(255,255,255,0.5)", cursor: "pointer" }} onClick={() => setStep("phone")}>← Back</div>
          </div>
        )}
        {step === "face" && (
          <div style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(10px)", borderRadius: 24, padding: 28, textAlign: "center" }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: T.white, marginBottom: 6 }}>Face Scan</div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginBottom: 24 }}>Look at the camera to log in</div>
            <div style={{ width: 160, height: 200, background: "rgba(0,0,0,0.4)", borderRadius: 80, margin: "0 auto 24px", display: "flex", alignItems: "center", justifyContent: "center", border: `3px solid ${T.lime}`, position: "relative" }}>
              <div style={{ fontSize: 64 }}>👩🏾</div>
              <div style={{ position: "absolute", inset: -8, borderRadius: 88, border: `2px dashed ${T.lime}`, animation: "spin 3s linear infinite" }} />
            </div>
            <div style={{ fontSize: 13, color: T.lime, marginBottom: 20 }}>Scanning... 80%</div>
            <Btn onClick={() => nav("home")} fullWidth>Confirm & Login</Btn>
            <div style={{ textAlign: "center", marginTop: 16, fontSize: 13, color: "rgba(255,255,255,0.5)", cursor: "pointer" }} onClick={() => setStep("phone")}>Use OTP instead</div>
          </div>
        )}
      </div>
    </div>
  );
};

// ── HOME ──────────────────────────────────────────────────────────────────────
const HomeScreen = ({ nav }) => (
  <div>
    <div style={{ background: `linear-gradient(135deg, ${T.teal} 0%, ${T.tealDark} 100%)`, padding: "20px 20px 32px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", fontWeight: 500 }}>Good Morning,</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: T.white, lineHeight: 1.2 }}>Mama Adunola Fatai</div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.15)", borderRadius: 20, padding: "4px 10px", marginTop: 6 }}>
            <div style={{ width: 6, height: 6, borderRadius: 3, background: T.lime }} />
            <span style={{ fontSize: 11, color: T.white, fontWeight: 600 }}>Surulere LGA · AHF-0042</span>
          </div>
        </div>
        <div style={{ width: 48, height: 48, borderRadius: 24, background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>👩🏾</div>
      </div>
      {/* Offline indicator */}
      <div style={{ background: "rgba(198,241,53,0.2)", borderRadius: 10, padding: "6px 12px", display: "inline-flex", alignItems: "center", gap: 6 }}>
        <Icon name="wifi" size={12} color={T.lime} />
        <span style={{ fontSize: 11, color: T.lime, fontWeight: 600 }}>Synced 2 mins ago</span>
      </div>
    </div>
    <div style={{ margin: "-16px 16px 0", position: "relative", zIndex: 2 }}>
      <AlertBanner type="red" title="🚨 High-Risk Client Alert" body="Bisi Adeyemi — severe headache & swelling reported. Tap to review." onTap={() => nav("danger-result")} />
    </div>
    <ScrollContent>
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        <StatTile value="23" label="Active Clients" color={T.teal} />
        <StatTile value="3" label="Visits Today" color={T.amber} />
        <StatTile value="1" label="Referrals Pending" color={T.red} />
        <StatTile value="47" label="Days to Bag Refresh" color={T.navy} />
      </div>
      <SectionLabel>Quick Actions</SectionLabel>
      <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
        <QuickAction icon="plus"  label="Register New Client"  color={T.teal}   onClick={() => nav("register")} />
        <QuickAction icon="calendar" label="Log ANC Visit"     color={T.navy}   onClick={() => nav("anc")} />
        <QuickAction icon="alert" label="Check Danger Signs"   color={T.orange} onClick={() => nav("danger")} />
      </div>
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <QuickAction icon="refer"  label="Initiate Referral"   color={T.red}    onClick={() => nav("referral")} />
        <QuickAction icon="baby"   label="Record Delivery"     color={T.elevated} onClick={() => nav("delivery")} />
        <QuickAction icon="learn"  label="Training Academy"    color={T.teal}   onClick={() => nav("academy")} />
      </div>
      <SectionLabel>Today's Visits</SectionLabel>
      {CLIENTS.slice(0,3).map(c => (
        <Card key={c.id} onClick={() => nav("client-detail")} style={{ marginBottom: 10, display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: 20, background: T.tealLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>👩🏾</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: T.grey800 }}>{c.name}</div>
            <div style={{ fontSize: 12, color: T.grey400 }}>EGA {c.ega}</div>
          </div>
          <RiskBadge risk={c.risk} small />
        </Card>
      ))}
    </ScrollContent>
    <BottomNav active="home" onNavigate={nav} />
  </div>
);

// ── CLIENT LIST ───────────────────────────────────────────────────────────────
const ClientListScreen = ({ nav }) => {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const filters = ["All", "High Risk", "Due Soon", "Overdue ANC"];
  const filtered = CLIENTS.filter(c => {
    if (search && !c.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (filter === "High Risk" && c.risk === "NORMAL") return false;
    return true;
  });
  return (
    <div>
      <TealHeader title="My Clients" subtitle={`${CLIENTS.length} active pregnancies`} action={
        <button onClick={() => nav("register")} style={{ background: T.lime, border: "none", borderRadius: 12, padding: "8px 14px", display: "flex", alignItems: "center", gap: 6, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 13, color: T.navy }}>
          <Icon name="plus" size={14} color={T.navy} />Register
        </button>
      } />
      <div style={{ background: T.white, borderBottom: `1px solid ${T.grey100}`, padding: "12px 16px" }}>
        <div style={{ background: T.grey50, borderRadius: 12, display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", marginBottom: 12 }}>
          <Icon name="search" size={16} color={T.grey400} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search clients..." style={{ flex: 1, background: "none", border: "none", outline: "none", fontSize: 14, fontFamily: "'DM Sans', sans-serif", color: T.grey800 }} />
        </div>
        <div style={{ display: "flex", gap: 8, overflowX: "auto" }}>
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{ flexShrink: 0, padding: "6px 14px", borderRadius: 20, border: "none", background: filter === f ? T.teal : T.grey100, color: filter === f ? T.white : T.grey600, fontSize: 12, fontWeight: 600, fontFamily: "'DM Sans', sans-serif", cursor: "pointer" }}>{f}</button>
          ))}
        </div>
      </div>
      <div style={{ padding: "12px 16px" }}>
        {filtered.map(c => (
          <Card key={c.id} onClick={() => nav("client-detail")} style={{ marginBottom: 10, display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: 22, background: T.tealLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>👩🏾</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: T.grey800 }}>{c.name}</div>
              <div style={{ fontSize: 12, color: T.grey400 }}>Age {c.age} · EGA {c.ega} · EDD {c.edd}</div>
            </div>
            <RiskBadge risk={c.risk} small />
          </Card>
        ))}
      </div>
      <BottomNav active="clients" onNavigate={nav} />
    </div>
  );
};

// ── CLIENT DETAIL ─────────────────────────────────────────────────────────────
const ClientDetailScreen = ({ nav }) => {
  const c = CLIENTS[0];
  return (
    <div>
      <TealHeader title="Client Record" onBack={() => nav("clients")} />
      <ScrollContent>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
          <div style={{ width: 64, height: 64, borderRadius: 32, background: T.tealLight, fontSize: 30, display: "flex", alignItems: "center", justifyContent: "center" }}>👩🏾</div>
          <div>
            <div style={{ fontSize: 20, fontWeight: 800, color: T.navy }}>{c.name}</div>
            <div style={{ fontSize: 12, color: T.grey400 }}>ID: {c.id} · Age {c.age}</div>
            <div style={{ marginTop: 6 }}><RiskBadge risk={c.risk} /></div>
          </div>
        </div>
        <Card style={{ marginBottom: 14 }}>
          <SectionLabel>Pregnancy Details</SectionLabel>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {[["LMP", c.lmp], ["EGA", c.ega], ["EDD", c.edd], ["Gravida / Parity", `${c.gravida} / ${c.parity}`]].map(([k, v]) => (
              <div key={k}><div style={{ fontSize: 11, color: T.grey400, fontWeight: 600 }}>{k}</div><div style={{ fontSize: 14, fontWeight: 600, color: T.grey800 }}>{v}</div></div>
            ))}
          </div>
        </Card>
        <Card style={{ marginBottom: 14 }}>
          <SectionLabel>Contact</SectionLabel>
          <div style={{ fontSize: 14, color: T.grey800, marginBottom: 4 }}><b>Phone:</b> {c.phone}</div>
          <div style={{ fontSize: 14, color: T.grey800, marginBottom: 4 }}><b>LGA:</b> {c.lga}</div>
          <div style={{ fontSize: 14, color: T.grey800 }}><b>Next of Kin:</b> Mr. Afolabi James — 0807 654 3210</div>
        </Card>
        <Card style={{ marginBottom: 14 }}>
          <SectionLabel>ANC History</SectionLabel>
          {[1,2,3,4,5].map(i => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: i < 5 ? `1px solid ${T.grey100}` : "none" }}>
              <span style={{ fontSize: 13, color: T.grey600 }}>ANC Contact {i}</span>
              <span style={{ fontSize: 11, fontWeight: 600, color: i <= 4 ? T.green : T.grey300 }}>{i <= 4 ? "✓ Complete" : "Upcoming"}</span>
            </div>
          ))}
        </Card>
        <div style={{ display: "flex", gap: 10 }}>
          <Btn onClick={() => nav("anc")} variant="teal" fullWidth icon="calendar">Log ANC Visit</Btn>
          <Btn onClick={() => nav("danger")} variant="outline" fullWidth icon="alert">Danger Signs</Btn>
        </div>
      </ScrollContent>
      <BottomNav active="clients" onNavigate={nav} />
    </div>
  );
};

// ── REGISTER CLIENT ───────────────────────────────────────────────────────────
const RegisterScreen = ({ nav }) => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [lmp, setLmp] = useState("10 Jan 2026");
  const [conditions, setConditions] = useState([]);
  const [consent, setConsent] = useState(false);
  const toggleCond = c => setConditions(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]);
  return (
    <div>
      <TealHeader title={`Register New Client`} subtitle={`Step ${step} of 3`} onBack={step > 1 ? () => setStep(step-1) : () => nav("clients")} />
      {/* Step indicator */}
      <div style={{ display: "flex", padding: "12px 20px", gap: 8 }}>
        {[1,2,3].map(i => <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i <= step ? T.teal : T.grey100 }} />)}
      </div>
      <ScrollContent>
        {step === 1 && (
          <>
            <div style={{ fontSize: 17, fontWeight: 700, color: T.navy, marginBottom: 4 }}>Personal Details</div>
            <div style={{ fontSize: 13, color: T.grey400, marginBottom: 20 }}>Enter the client's basic information</div>
            <Input label="Full Name" value={name} onChange={setName} placeholder="Client's full name" />
            <div style={{ display: "flex", gap: 10 }}>
              <div style={{ flex: 1 }}><Input label="Age" value={age} onChange={setAge} placeholder="26" type="number" /></div>
              <div style={{ flex: 1 }}><Input label="Phone Number" value={phone} onChange={setPhone} placeholder="0803 456 7890" /></div>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: T.grey400, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 6 }}>Marital Status</div>
                <select style={{ width: "100%", background: T.grey50, border: `1.5px solid ${T.grey100}`, borderRadius: 12, padding: "12px 14px", fontSize: 14, fontFamily: "'DM Sans', sans-serif", color: T.grey800, outline: "none" }}>
                  <option>Married</option><option>Single</option><option>Widowed</option>
                </select>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: T.grey400, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 6 }}>LGA</div>
                <select style={{ width: "100%", background: T.grey50, border: `1.5px solid ${T.grey100}`, borderRadius: 12, padding: "12px 14px", fontSize: 14, fontFamily: "'DM Sans', sans-serif", color: T.grey800, outline: "none" }}>
                  <option>Surulere</option><option>Ikeja</option><option>Eti-Osa</option><option>Alimosho</option>
                </select>
              </div>
            </div>
            <Input label="Address" value="" placeholder="House no, street, community" />
            <div style={{ display: "flex", gap: 10 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: T.grey400, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 6 }}>Tribe / Ethnicity</div>
                <select style={{ width: "100%", background: T.grey50, border: `1.5px solid ${T.grey100}`, borderRadius: 12, padding: "12px 14px", fontSize: 14, fontFamily: "'DM Sans', sans-serif", color: T.grey800, outline: "none" }}>
                  <option>Yoruba</option><option>Igbo</option><option>Hausa</option><option>Other</option>
                </select>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: T.grey400, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 6 }}>Education Level</div>
                <select style={{ width: "100%", background: T.grey50, border: `1.5px solid ${T.grey100}`, borderRadius: 12, padding: "12px 14px", fontSize: 14, fontFamily: "'DM Sans', sans-serif", color: T.grey800, outline: "none" }}>
                  <option>Secondary</option><option>Primary</option><option>None</option><option>Tertiary</option>
                </select>
              </div>
            </div>
            <Input label="Occupation" value="" placeholder="Trader, Housewife, etc." />
            <Btn onClick={() => setStep(2)} fullWidth icon="arrow">Next: Pregnancy Details</Btn>
          </>
        )}
        {step === 2 && (
          <>
            <div style={{ fontSize: 17, fontWeight: 700, color: T.navy, marginBottom: 4 }}>Pregnancy Details</div>
            <div style={{ fontSize: 13, color: T.grey400, marginBottom: 20 }}>EGA and EDD are calculated automatically from LMP</div>
            <Input label="Last Menstrual Period (LMP)" value={lmp} onChange={setLmp} placeholder="DD MMM YYYY" />
            <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
              <div style={{ flex: 1, background: T.tealLight, borderRadius: 12, padding: "12px 14px" }}>
                <div style={{ fontSize: 11, color: T.teal, fontWeight: 600 }}>EGA (AUTO-CALCULATED)</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: T.teal }}>18 wks, 3 days</div>
              </div>
              <div style={{ flex: 1, background: T.tealLight, borderRadius: 12, padding: "12px 14px" }}>
                <div style={{ fontSize: 11, color: T.teal, fontWeight: 600 }}>EDD (AUTO-CALCULATED)</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: T.teal }}>17 Oct 2026</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <div style={{ flex: 1 }}><Input label="Gravida (prev. pregnancies)" value="2" placeholder="0" type="number" /></div>
              <div style={{ flex: 1 }}><Input label="Parity (prev. births)" value="1" placeholder="0" type="number" /></div>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: T.grey400, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 6 }}>Blood Group</div>
                <select style={{ width: "100%", background: T.grey50, border: `1.5px solid ${T.grey100}`, borderRadius: 12, padding: "12px 14px", fontSize: 14, fontFamily: "'DM Sans', sans-serif", color: T.grey800, outline: "none" }}>
                  <option>O+</option><option>A+</option><option>B+</option><option>AB+</option><option>Unknown</option>
                </select>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: T.grey400, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 6 }}>Genotype</div>
                <select style={{ width: "100%", background: T.grey50, border: `1.5px solid ${T.grey100}`, borderRadius: 12, padding: "12px 14px", fontSize: 14, fontFamily: "'DM Sans', sans-serif", color: T.grey800, outline: "none" }}>
                  <option>AA</option><option>AS</option><option>SS</option><option>Unknown</option>
                </select>
              </div>
            </div>
            <SectionLabel>Known Conditions (select all that apply)</SectionLabel>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
              {["Hypertension", "Diabetes", "Sickle Cell", "Previous C-Section", "Multiple Pregnancy", "None"].map(opt => (
                <button key={opt} onClick={() => toggleCond(opt)} style={{ padding: "8px 14px", borderRadius: 20, border: `1.5px solid ${conditions.includes(opt) ? T.teal : T.grey200}`, background: conditions.includes(opt) ? T.tealLight : T.white, color: conditions.includes(opt) ? T.teal : T.grey600, fontSize: 13, fontWeight: conditions.includes(opt) ? 600 : 400, fontFamily: "'DM Sans', sans-serif", cursor: "pointer" }}>
                  {opt}
                </button>
              ))}
            </div>
            {conditions.length > 0 && conditions[0] !== "None" && (
              <AlertBanner type="amber" title="⚠️ High-Risk Flag Applied" body="Client will be automatically flagged as HIGH RISK due to selected conditions." />
            )}
            <Btn onClick={() => setStep(3)} fullWidth icon="arrow">Next: Next of Kin & Consent</Btn>
          </>
        )}
        {step === 3 && (
          <>
            <div style={{ fontSize: 17, fontWeight: 700, color: T.navy, marginBottom: 4 }}>Next of Kin & Consent</div>
            <div style={{ fontSize: 13, color: T.grey400, marginBottom: 20 }}>Complete registration and obtain consent</div>
            <Input label="Next of Kin Name" value="Mr. Afolabi James" placeholder="Full name" />
            <Input label="Next of Kin Phone" value="+234 807 654 3210" placeholder="+234..." />
            <div style={{ background: T.tealLight, border: `1.5px solid ${T.tealMid}`, borderRadius: 14, padding: "14px 16px", marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <button onClick={() => setConsent(!consent)} style={{ width: 24, height: 24, borderRadius: 8, border: `2px solid ${consent ? T.teal : T.grey200}`, background: consent ? T.teal : T.white, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0, marginTop: 2 }}>
                  {consent && <Icon name="check" size={14} color={T.white} />}
                </button>
                <div style={{ fontSize: 13, color: T.navy, lineHeight: 1.5 }}>
                  Client consents to the processing of her data in accordance with the Nigeria Data Protection Regulation (NDPR). This consent was obtained verbally and the client has been informed of her rights.
                </div>
              </div>
            </div>
            <Btn onClick={() => nav("home")} fullWidth disabled={!consent} variant="teal">Register Client →</Btn>
            <div style={{ marginTop: 10 }}><Btn onClick={() => nav("home")} fullWidth variant="ghost">Save as Draft</Btn></div>
          </>
        )}
      </ScrollContent>
      <BottomNav active="clients" onNavigate={nav} />
    </div>
  );
};

// ── ANC VISIT ─────────────────────────────────────────────────────────────────
const ANCScreen = ({ nav }) => {
  const [oedema, setOedema] = useState("None");
  const [urine, setUrine] = useState("Negative");
  const [foetal, setFoetal] = useState("Normal");
  const [treatments, setTreatments] = useState(["TT Vaccine Given", "IPT Dose Given", "Iron / Folic Acid Given"]);
  const toggleTx = t => setTreatments(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);
  return (
    <div>
      <TealHeader title="Log ANC Visit" onBack={() => nav("clients")} />
      <div style={{ background: T.tealLight, borderLeft: `4px solid ${T.teal}`, margin: "12px 16px", borderRadius: "0 12px 12px 0", padding: "12px 14px" }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: T.teal }}>Kemi Afolabi</div>
        <div style={{ fontSize: 12, color: T.grey600 }}>EGA 28 wks 4 days · EDD 12 Aug 2026 · ANC Contact 5 of 8</div>
      </div>
      <ScrollContent>
        <SectionLabel>Maternal Vitals</SectionLabel>
        <div style={{ display: "flex", gap: 10 }}>
          <div style={{ flex: 1 }}><Input label="Blood Pressure (Systolic)" value="128 mmHg" /></div>
          <div style={{ flex: 1 }}><Input label="Blood Pressure (Diastolic)" value="84 mmHg" /></div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <div style={{ flex: 1 }}><Input label="Weight (kg)" value="72 kg" /></div>
          <div style={{ flex: 1 }}><Input label="Fundal Height (cm)" value="28 cm" /></div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <div style={{ flex: 1 }}><Input label="Foetal Heart Rate (bpm)" value="148 bpm" /></div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: T.grey400, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 6 }}>Foetal Presentation</div>
            <select style={{ width: "100%", background: T.grey50, border: `1.5px solid ${T.grey100}`, borderRadius: 12, padding: "12px 14px", fontSize: 14, fontFamily: "'DM Sans', sans-serif", color: T.grey800, outline: "none" }}>
              <option>Cephalic (head down)</option><option>Breech</option><option>Transverse</option>
            </select>
          </div>
        </div>
        <RadioGroup label="Oedema" options={["None","Mild","Severe"]} value={oedema} onChange={setOedema} />
        <RadioGroup label="Urine Protein" options={["Negative","Trace","+1","+2","+3"]} value={urine} onChange={setUrine} />
        <RadioGroup label="Foetal Movement" options={["Normal","Reduced","Absent"]} value={foetal} onChange={setFoetal} />
        <SectionLabel>Treatments Given</SectionLabel>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
          {["TT Vaccine Given","IPT Dose Given","Iron / Folic Acid Given"].map(t => (
            <button key={t} onClick={() => toggleTx(t)} style={{ padding: "10px 14px", borderRadius: 12, border: `1.5px solid ${treatments.includes(t) ? T.teal : T.grey200}`, background: treatments.includes(t) ? T.tealLight : T.white, color: treatments.includes(t) ? T.teal : T.grey600, fontSize: 12, fontWeight: treatments.includes(t) ? 700 : 400, fontFamily: "'DM Sans', sans-serif", cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
              {treatments.includes(t) && <Icon name="check" size={12} color={T.teal} />}{t}
            </button>
          ))}
        </div>
        <SectionLabel>Danger Signs Noted</SectionLabel>
        <div style={{ background: T.greenLight, border: `1.5px solid ${T.green}`, borderRadius: 12, padding: "12px 14px", display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
          <Icon name="check" size={16} color={T.green} />
          <span style={{ fontSize: 13, color: T.green, fontWeight: 600 }}>No danger signs reported</span>
        </div>
        <div style={{ background: T.greenLight, border: `1.5px solid ${T.green}`, borderRadius: 12, padding: "12px 14px", marginBottom: 20 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: T.green }}>✓ LOW RISK — Continue routine care</div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <Btn onClick={() => nav("home")} variant="ghost" fullWidth>Save Draft</Btn>
          <Btn onClick={() => nav("home")} variant="primary" fullWidth>Save ANC Visit →</Btn>
        </div>
      </ScrollContent>
      <BottomNav active="visits" onNavigate={nav} />
    </div>
  );
};

// ── DANGER SIGNS ──────────────────────────────────────────────────────────────
const DangerScreen = ({ nav }) => {
  const [selected, setSelected] = useState(["Severe headache or blurred vision"]);
  const signs = [
    "Severe headache or blurred vision",
    "Facial or hand swelling (oedema)",
    "Epigastric pain (pain in upper abdomen)",
    "Convulsions or fitting",
    "Heavy vaginal bleeding",
    "Prolonged labour (>12 hours active phase)",
    "Reduced or absent foetal movement",
    "Fever (temperature >38°C)",
    "Difficulty breathing",
    "Unconsciousness",
  ];
  const toggle = s => setSelected(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  const isHigh = selected.length >= 2 || selected.includes("Convulsions or fitting") || selected.includes("Unconsciousness") || selected.includes("Heavy vaginal bleeding");
  const isOrange = selected.length === 1 && !isHigh;
  return (
    <div>
      <TealHeader title="Danger Signs Check" subtitle="Bisi Adeyemi · EGA 34 weeks" onBack={() => nav("clients")} />
      <div style={{ margin: "12px 16px" }}>
        <AlertBanner type="amber" title="⚡ Select all danger signs that are present" body="The system will determine the risk level and next steps." />
      </div>
      <ScrollContent>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {signs.map(s => {
            const checked = selected.includes(s);
            return (
              <button key={s} onClick={() => toggle(s)} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", borderRadius: 14, border: `1.5px solid ${checked ? T.red : T.grey100}`, background: checked ? T.redLight : T.white, textAlign: "left", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", transition: "all 0.15s" }}>
                <div style={{ width: 22, height: 22, borderRadius: 7, border: `2px solid ${checked ? T.red : T.grey200}`, background: checked ? T.red : T.white, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {checked && <Icon name="check" size={12} color={T.white} />}
                </div>
                <span style={{ fontSize: 14, color: checked ? T.red : T.grey800, fontWeight: checked ? 600 : 400 }}>{s}</span>
              </button>
            );
          })}
        </div>
        {selected.length > 0 && (
          <div style={{ marginTop: 20 }}>
            <SectionLabel>Risk Assessment</SectionLabel>
            {isHigh ? (
              <>
                <div style={{ background: T.redLight, border: `2px solid ${T.red}`, borderRadius: 14, padding: "14px 16px", marginBottom: 10 }}>
                  <div style={{ fontSize: 16, fontWeight: 800, color: T.red }}>🚨 RED — REFER NOW</div>
                  <div style={{ fontSize: 13, color: T.red, marginTop: 4 }}>Emergency referral required immediately. Do not leave client alone.</div>
                  <div style={{ marginTop: 8, padding: "8px 10px", background: "rgba(211,47,47,0.1)", borderRadius: 8 }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: T.red, marginBottom: 4 }}>YORUBA · PIDGIN · HAUSA</div>
                    <div style={{ fontSize: 12, color: T.grey600 }}>Yara gbe e lo si ile-iwosan / Carry am go hospital now now / Kai ta asibiti yanzu</div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <Btn onClick={() => nav("home")} variant="ghost" fullWidth small>Save Record</Btn>
                  <Btn onClick={() => nav("referral")} variant="danger" fullWidth icon="refer">Initiate Referral →</Btn>
                </div>
              </>
            ) : (
              <>
                <div style={{ background: T.orangeLight, border: `2px solid ${T.orange}`, borderRadius: 14, padding: "14px 16px", marginBottom: 10 }}>
                  <div style={{ fontSize: 16, fontWeight: 800, color: T.orange }}>⚡ ORANGE — HIGH RISK</div>
                  <div style={{ fontSize: 13, color: T.orange, marginTop: 4 }}>Contact your CHEW supervisor immediately. Monitor client closely.</div>
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <Btn onClick={() => nav("home")} variant="ghost" fullWidth small>Save Record</Btn>
                  <Btn onClick={() => nav("referral")} variant="amber" fullWidth>Notify CHEW →</Btn>
                </div>
              </>
            )}
          </div>
        )}
      </ScrollContent>
      <BottomNav active="clients" onNavigate={nav} />
    </div>
  );
};

// ── REFERRAL ──────────────────────────────────────────────────────────────────
const ReferralScreen = ({ nav }) => {
  const [urgency, setUrgency] = useState("Emergency");
  const [transport, setTransport] = useState("Yes — Car");
  const [submitted, setSubmitted] = useState(false);
  if (submitted) return (
    <div style={{ minHeight: 800, background: T.offWhite, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 32, textAlign: "center" }}>
      <div style={{ width: 80, height: 80, borderRadius: 40, background: T.redLight, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, fontSize: 36 }}>🚑</div>
      <div style={{ fontSize: 22, fontWeight: 800, color: T.navy, marginBottom: 8 }}>Referral Confirmed</div>
      <div style={{ fontSize: 14, color: T.grey600, marginBottom: 24 }}>CHEW Folake Bello and Programme Manager have been notified by SMS and push notification.</div>
      <Card style={{ width: "100%", marginBottom: 20 }}>
        <div style={{ fontSize: 13, color: T.grey400, marginBottom: 4 }}>Referral ID</div>
        <div style={{ fontSize: 16, fontWeight: 700, color: T.navy, fontFamily: "'DM Mono', monospace" }}>REF-2026-0847</div>
        <div style={{ fontSize: 13, color: T.grey400, marginTop: 10, marginBottom: 4 }}>Status</div>
        <span style={{ background: T.orangeLight, color: T.orange, borderRadius: 20, padding: "4px 12px", fontSize: 12, fontWeight: 700 }}>INITIATED</span>
      </Card>
      <Btn onClick={() => nav("home")} variant="teal" fullWidth>Return to Home</Btn>
    </div>
  );
  return (
    <div>
      <TealHeader title="Initiate Referral" onBack={() => nav("danger")} />
      <div style={{ margin: "12px 16px" }}>
        <div style={{ background: T.redLight, border: `1.5px solid ${T.red}`, borderRadius: 14, padding: "12px 16px" }}>
          <div style={{ fontSize: 14, fontWeight: 800, color: T.red }}>🚨 EMERGENCY REFERRAL</div>
          <div style={{ fontSize: 12, color: T.grey600, marginTop: 2 }}>Bisi Adeyemi · EGA 34 wks</div>
        </div>
      </div>
      <ScrollContent>
        <SectionLabel>Danger Signs Triggering Referral</SectionLabel>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
          {["Severe headache / blurred vision", "Facial swelling (oedema)"].map(s => (
            <span key={s} style={{ background: T.redLight, color: T.red, border: `1px solid ${T.redMid}`, borderRadius: 20, padding: "4px 12px", fontSize: 12, fontWeight: 600 }}>{s}</span>
          ))}
        </div>
        <SectionLabel>Urgency Level</SectionLabel>
        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          {["Routine","Urgent","Emergency"].map(u => (
            <button key={u} onClick={() => setUrgency(u)} style={{ flex: 1, padding: "12px 8px", borderRadius: 12, border: `1.5px solid ${urgency === u ? (u === "Emergency" ? T.red : T.teal) : T.grey100}`, background: urgency === u ? (u === "Emergency" ? T.red : T.teal) : T.white, color: urgency === u ? T.white : T.grey600, fontSize: 13, fontWeight: urgency === u ? 700 : 400, fontFamily: "'DM Sans', sans-serif", cursor: "pointer" }}>
              {u}
            </button>
          ))}
        </div>
        <SectionLabel>Receiving Facility</SectionLabel>
        <select style={{ width: "100%", background: T.grey50, border: `1.5px solid ${T.grey100}`, borderRadius: 12, padding: "12px 14px", fontSize: 14, fontFamily: "'DM Sans', sans-serif", color: T.grey800, outline: "none", marginBottom: 14 }}>
          <option>Gbagada General Hospital</option><option>Lagos Island General Hospital</option><option>Surulere PHC</option>
        </select>
        <Input label="Contact at Facility" value="+234 801 234 5678" />
        <SectionLabel>Transport Arranged?</SectionLabel>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 14 }}>
          {["Yes — Ambulance","Yes — Car","Yes — Okada","No transport yet"].map(t => (
            <button key={t} onClick={() => setTransport(t)} style={{ padding: "8px 12px", borderRadius: 20, border: `1.5px solid ${transport === t ? T.teal : T.grey200}`, background: transport === t ? T.tealLight : T.white, color: transport === t ? T.teal : T.grey600, fontSize: 12, fontWeight: transport === t ? 700 : 400, fontFamily: "'DM Sans', sans-serif", cursor: "pointer" }}>
              {t}
            </button>
          ))}
        </div>
        <Input label="Name of Person Accompanying Client" value="Husband — Mr. Adeyemi" />
        <div style={{ background: T.tealLight, border: `1.5px solid ${T.tealMid}`, borderRadius: 12, padding: "12px 14px", marginBottom: 20, fontSize: 13, color: T.navy }}>
          📱 On submit, your CHEW supervisor and programme manager will be notified by SMS and push notification.
        </div>
        <Btn onClick={() => setSubmitted(true)} variant="danger" fullWidth>🚨 CONFIRM REFERRAL →</Btn>
      </ScrollContent>
      <BottomNav active="refer" onNavigate={nav} />
    </div>
  );
};

// ── DELIVERY RECORD ───────────────────────────────────────────────────────────
const DeliveryScreen = ({ nav }) => {
  const [location, setLocation] = useState("Home");
  const [type, setType] = useState("Normal vaginal");
  const [comps, setComps] = useState(["None"]);
  const [babyOut, setBabyOut] = useState("Alive and well");
  const [mumOut, setMumOut] = useState("Well");
  const toggleComp = c => setComps(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]);
  return (
    <div>
      <TealHeader title="Record Delivery" onBack={() => nav("home")} />
      <ScrollContent>
        <SectionLabel>Location</SectionLabel>
        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          {["Home","TBA Facility","Other"].map(l => (
            <button key={l} onClick={() => setLocation(l)} style={{ flex: 1, padding: "12px 8px", borderRadius: 12, border: `1.5px solid ${location === l ? T.teal : T.grey100}`, background: location === l ? T.teal : T.white, color: location === l ? T.white : T.grey600, fontSize: 13, fontWeight: location === l ? 700 : 400, fontFamily: "'DM Sans', sans-serif", cursor: "pointer" }}>
              {l}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <div style={{ flex: 1 }}><Input label="Gestational Age at Delivery" value="38 weeks" /></div>
          <div style={{ flex: 1 }}><Input label="Duration of Labour (hours)" value="6 hours" /></div>
        </div>
        <SectionLabel>Delivery Type</SectionLabel>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 16 }}>
          {["Normal vaginal","Complicated vaginal","Referred before delivery","Delivered en route"].map(t => (
            <button key={t} onClick={() => setType(t)} style={{ padding: "12px 10px", borderRadius: 12, border: `1.5px solid ${type === t ? T.teal : T.grey100}`, background: type === t ? T.teal : T.white, color: type === t ? T.white : T.grey600, fontSize: 12, fontWeight: type === t ? 700 : 400, fontFamily: "'DM Sans', sans-serif", cursor: "pointer", textAlign: "center" }}>
              {t}
            </button>
          ))}
        </div>
        <CheckGroup label="Complications (select all that apply)" options={["Postpartum haemorrhage (PPH)","Perineal tear","Cord prolapse","Shoulder dystocia","Retained placenta","None"]} values={comps} onChange={toggleComp} />
        <SectionLabel>Outcomes</SectionLabel>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: T.grey400, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 8 }}>Baby Outcome</div>
            {["Alive and well","Alive with complications","Stillbirth","Neonatal death"].map(o => (
              <button key={o} onClick={() => setBabyOut(o)} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
                <div style={{ width: 16, height: 16, borderRadius: 8, border: `2px solid ${babyOut === o ? T.teal : T.grey300}`, background: babyOut === o ? T.teal : T.white, flexShrink: 0 }} />
                <span style={{ fontSize: 13, color: T.grey700 }}>{o}</span>
              </button>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: T.grey400, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 8 }}>Mother Outcome</div>
            {["Well","Complications","Referred post-delivery","Death"].map(o => (
              <button key={o} onClick={() => setMumOut(o)} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
                <div style={{ width: 16, height: 16, borderRadius: 8, border: `2px solid ${mumOut === o ? T.teal : T.grey300}`, background: mumOut === o ? T.teal : T.white, flexShrink: 0 }} />
                <span style={{ fontSize: 13, color: T.grey700 }}>{o}</span>
              </button>
            ))}
          </div>
        </div>
        <Input label="Birth Weight (optional)" value="3.2 kg" suffix="kg" />
        <Btn onClick={() => nav("home")} variant="primary" fullWidth>Save Delivery Record →</Btn>
      </ScrollContent>
      <BottomNav active="home" onNavigate={nav} />
    </div>
  );
};

// ── TBA PROFILE ───────────────────────────────────────────────────────────────
const TBAProfileScreen = ({ nav }) => (
  <div>
    <TealHeader title="My Profile" onBack={() => nav("home")} />
    <ScrollContent>
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
        <div style={{ width: 72, height: 72, borderRadius: 36, background: T.tealLight, fontSize: 36, display: "flex", alignItems: "center", justifyContent: "center" }}>👩🏾</div>
        <div>
          <div style={{ fontSize: 20, fontWeight: 800, color: T.navy }}>Mama Adunola Fatai</div>
          <div style={{ fontSize: 12, color: T.grey400 }}>TBA ID: AHF-0042 · Cohort 1, 2025</div>
          <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
            <span style={{ background: T.tealLight, color: T.teal, borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 700, border: `1px solid ${T.tealMid}` }}>AHF CERTIFIED</span>
            <span style={{ background: T.greenLight, color: T.green, borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 700, border: `1px solid ${T.green}` }}>LSTMB REGISTERED</span>
          </div>
        </div>
      </div>
      <Card style={{ marginBottom: 14 }}>
        <SectionLabel>Practice Details</SectionLabel>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {[["Phone","+234 803 456 7890"],["LGA","Surulere, Lagos"],["Community","Ojuelegba"],["Years of Practice","14 years"],["Literacy Level","Functional"],["LSTMB Reg. No.","LSTMB-2024-0887"]].map(([k, v]) => (
            <div key={k}><div style={{ fontSize: 11, color: T.grey400, fontWeight: 600 }}>{k}</div><div style={{ fontSize: 13, fontWeight: 600, color: T.grey800 }}>{v}</div></div>
          ))}
        </div>
      </Card>
      <Card style={{ marginBottom: 14 }}>
        <SectionLabel>Programme Status</SectionLabel>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {[["Certification Date","15 March 2025"],["Assigned CHEW","CHEW Folake Bello"],["CHEW Phone","+234 802 111 2222"],["Training Progress","6 / 8 modules"]].map(([k, v]) => (
            <div key={k} style={{ background: T.offWhite, borderRadius: 10, padding: "10px 12px" }}>
              <div style={{ fontSize: 10, color: T.grey400, fontWeight: 600 }}>{k}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: T.navy, marginTop: 2 }}>{v}</div>
            </div>
          ))}
        </div>
      </Card>
      <Card>
        <SectionLabel>Mama Bag Distribution</SectionLabel>
        {[["Bag #001","1 Mar 2025","1 Sept 2025","Refreshed"],["Bag #001","1 Sept 2025","1 Mar 2026","Refreshed"],["Bag #001","1 Mar 2026","1 Sept 2026","Active"]].map(([bag, dist, next, status], i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: i < 2 ? `1px solid ${T.grey100}` : "none" }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: T.navy }}>{bag}</div>
              <div style={{ fontSize: 11, color: T.grey400 }}>Dist {dist} · Next {next}</div>
            </div>
            <span style={{ background: status === "Active" ? T.greenLight : T.grey100, color: status === "Active" ? T.green : T.grey500, borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 700 }}>{status}</span>
          </div>
        ))}
      </Card>
    </ScrollContent>
    <BottomNav active="home" onNavigate={nav} />
  </div>
);

// ── ACADEMY ───────────────────────────────────────────────────────────────────
const AcademyScreen = ({ nav }) => {
  const courses = [
    { title:"Maternal Danger Signs", desc:"Identify the 10 obstetric danger signs", duration:"18 min", progress:100, img:"🩺" },
    { title:"Safe Delivery Practice", desc:"Step-by-step clean delivery techniques", duration:"32 min", progress:60, img:"👶" },
    { title:"Emergency Referral Protocol", desc:"When and how to refer a client", duration:"12 min", progress:0, img:"🚑" },
    { title:"ANC Visit Checklist", desc:"Complete guide to antenatal contacts", duration:"24 min", progress:0, img:"📋" },
  ];
  return (
    <div>
      <TealHeader title="Training Academy" subtitle="TBA Track — 6 of 8 modules complete" />
      <ScrollContent>
        <div style={{ background: T.navy, borderRadius: 16, padding: "16px", marginBottom: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: T.white }}>Overall Progress</div>
            <div style={{ fontSize: 14, fontWeight: 800, color: T.lime }}>75%</div>
          </div>
          <div style={{ height: 8, background: "rgba(255,255,255,0.15)", borderRadius: 4 }}>
            <div style={{ width: "75%", height: "100%", background: T.lime, borderRadius: 4 }} />
          </div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginTop: 8 }}>6 of 8 mandatory modules complete</div>
        </div>
        <SectionLabel>All Courses</SectionLabel>
        {courses.map((c, i) => (
          <Card key={i} style={{ marginBottom: 12, display: "flex", gap: 14, alignItems: "center" }}>
            <div style={{ width: 52, height: 52, borderRadius: 14, background: T.tealLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 }}>{c.img}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: T.navy }}>{c.title}</div>
              <div style={{ fontSize: 12, color: T.grey400, marginBottom: 8 }}>{c.desc} · {c.duration}</div>
              <div style={{ height: 4, background: T.grey100, borderRadius: 2 }}>
                <div style={{ width: `${c.progress}%`, height: "100%", background: c.progress === 100 ? T.green : T.teal, borderRadius: 2 }} />
              </div>
            </div>
            <div style={{ fontSize: 11, fontWeight: 700, color: c.progress === 100 ? T.green : T.teal, flexShrink: 0 }}>
              {c.progress === 100 ? "✓ Done" : c.progress > 0 ? `${c.progress}%` : "Start"}
            </div>
          </Card>
        ))}
      </ScrollContent>
      <BottomNav active="learn" onNavigate={nav} />
    </div>
  );
};

// ── CHEW DASHBOARD ─────────────────────────────────────────────────────────────
const CHEWDashboard = ({ nav }) => (
  <div style={{ background: T.offWhite, minHeight: 800 }}>
    {/* Web header */}
    <div style={{ background: T.navy, padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase" }}>Kairoi Intel · AHF</div>
        <div style={{ fontSize: 18, fontWeight: 800, color: T.white }}>CHEW Supervisor Dashboard</div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ position: "relative" }}>
          <Icon name="bell" size={22} color="rgba(255,255,255,0.7)" />
          <div style={{ position: "absolute", top: -4, right: -4, width: 16, height: 16, borderRadius: 8, background: T.red, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, color: T.white }}>3</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 34, height: 34, borderRadius: 17, background: T.teal, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>👩🏾</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: T.white }}>CHEW Folake Bello</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>Surulere LGA · 8 TBAs</div>
          </div>
        </div>
      </div>
    </div>
    <div style={{ padding: "20px 24px" }}>
      {/* Stat tiles */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
        {[["8","Active TBAs",T.teal],["187","Total Clients",T.navy],["4","High-Risk Clients",T.red],["2","Pending Referrals",T.orange]].map(([v, l, c]) => (
          <div key={l} style={{ background: T.white, borderRadius: 14, padding: "16px 14px", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
            <div style={{ fontSize: 32, fontWeight: 800, color: c }}>{v}</div>
            <div style={{ fontSize: 12, color: T.grey400, marginTop: 4 }}>{l}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        {/* High risk clients */}
        <div style={{ background: T.white, borderRadius: 16, padding: 16, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
            <div style={{ width: 8, height: 8, borderRadius: 4, background: T.red }} />
            <div style={{ fontSize: 13, fontWeight: 700, color: T.navy, textTransform: "uppercase", letterSpacing: 0.8 }}>High-Risk Clients</div>
          </div>
          {[
            { name:"Bisi Adeyemi", tba:"Mama Adunola Fatai", signs:"Severe headache + swelling", level:"RED" },
            { name:"Amaka Obi",    tba:"Mama Chiamaka Eze",  signs:"BP 160/110, no referral yet", level:"HIGH" },
          ].map((c, i) => (
            <div key={i} style={{ background: c.level === "RED" ? T.redLight : T.orangeLight, border: `1px solid ${c.level === "RED" ? T.red : T.orange}`, borderRadius: 12, padding: "10px 12px", marginBottom: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: T.grey800 }}>{c.name}</div>
                <RiskBadge risk={c.level === "RED" ? "CRITICAL" : "HIGH"} small />
              </div>
              <div style={{ fontSize: 11, color: T.grey500 }}>TBA: {c.tba}</div>
              <div style={{ fontSize: 11, color: c.level === "RED" ? T.red : T.orange, fontWeight: 600, marginTop: 4 }}>⚠ {c.signs}</div>
            </div>
          ))}
        </div>
        {/* TBA Activity */}
        <div style={{ background: T.white, borderRadius: 16, padding: 16, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: T.navy, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 14 }}>TBA Activity This Week</div>
          {TBAS.map((t, i) => (
            <div key={i} style={{ borderBottom: i < TBAS.length - 1 ? `1px solid ${T.grey100}` : "none", paddingBottom: i < TBAS.length - 1 ? 12 : 0, marginBottom: i < TBAS.length - 1 ? 12 : 0 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: T.navy, marginBottom: 8 }}>{t.name}</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6 }}>
                {[["Clients", t.clients, T.teal], ["ANC Visits", t.ancVisits, T.navy], ["Deliveries", t.deliveries, T.elevated], ["Training", t.training, T.green]].map(([l, v, c]) => (
                  <div key={l} style={{ background: T.offWhite, borderRadius: 8, padding: "6px 8px", textAlign: "center" }}>
                    <div style={{ fontSize: 15, fontWeight: 800, color: c }}>{v}</div>
                    <div style={{ fontSize: 9, color: T.grey400, fontWeight: 600 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Mama bag alert */}
      <div style={{ background: T.white, borderRadius: 16, padding: 16, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
          <Icon name="bag" size={16} color={T.amber} />
          <div style={{ fontSize: 13, fontWeight: 700, color: T.navy, textTransform: "uppercase", letterSpacing: 0.8 }}>Mama Bag Refresh Due</div>
        </div>
        <div style={{ background: T.amberLight, border: `1px solid ${T.amber}`, borderRadius: 12, padding: "12px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: T.navy }}>Mama Yetunde Alabi</div>
            <div style={{ fontSize: 12, color: T.grey500 }}>Bag refresh due: 1 June 2026 · 15 days remaining</div>
          </div>
          <Btn variant="amber" small>Arrange</Btn>
        </div>
      </div>
      <div style={{ marginTop: 16, textAlign: "center" }}>
        <button onClick={() => nav("home")} style={{ background: "none", border: `1.5px solid ${T.teal}`, borderRadius: 12, padding: "10px 24px", color: T.teal, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
          ← Switch to TBA Field App View
        </button>
      </div>
    </div>
  </div>
);

// ══════════════════════════════════════════════════════════════════════════════
//  SCREEN MAP + NAV
// ══════════════════════════════════════════════════════════════════════════════

const SCREENS_CONFIG = [
  { id:"login",        label:"Login / Auth",         group:"Auth" },
  { id:"home",         label:"TBA Home",             group:"Field App" },
  { id:"clients",      label:"Client List",          group:"Field App" },
  { id:"client-detail",label:"Client Detail",        group:"Field App" },
  { id:"register",     label:"Register Client",      group:"Field App" },
  { id:"anc",          label:"ANC Visit",            group:"Field App" },
  { id:"danger",       label:"Danger Signs",         group:"Field App" },
  { id:"referral",     label:"Referral",             group:"Field App" },
  { id:"delivery",     label:"Delivery Record",      group:"Field App" },
  { id:"tba-profile",  label:"TBA Profile",          group:"Field App" },
  { id:"academy",      label:"Academy",              group:"Field App" },
  { id:"chew-dashboard",label:"CHEW Dashboard",      group:"Dashboard" },
];

export default function App() {
  const [screen, setScreen] = useState("login");
  const nav = id => setScreen(id);
  const groups = [...new Set(SCREENS_CONFIG.map(s => s.group))];

  const renderScreen = () => {
    switch(screen) {
      case "login":          return <LoginScreen nav={nav} />;
      case "home":           return <HomeScreen nav={nav} />;
      case "clients":        return <ClientListScreen nav={nav} />;
      case "client-detail":  return <ClientDetailScreen nav={nav} />;
      case "register":       return <RegisterScreen nav={nav} />;
      case "anc":            return <ANCScreen nav={nav} />;
      case "danger":         return <DangerScreen nav={nav} />;
      case "danger-result":  return <DangerScreen nav={nav} />;
      case "referral":       return <ReferralScreen nav={nav} />;
      case "delivery":       return <DeliveryScreen nav={nav} />;
      case "tba-profile":    return <TBAProfileScreen nav={nav} />;
      case "academy":        return <AcademyScreen nav={nav} />;
      case "chew-dashboard": return <CHEWDashboard nav={nav} />;
      default:               return <HomeScreen nav={nav} />;
    }
  };

  const isCHEW = screen === "chew-dashboard";

  return (
    <>
      <style>{globalStyle}</style>
      <div style={{ display: "flex", gap: 32, alignItems: "flex-start", width: "100%", maxWidth: 1400, margin: "0 auto" }}>
        {/* Left nav panel */}
        <div style={{ width: 240, flexShrink: 0, position: "sticky", top: 24 }}>
          <div style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(10px)", borderRadius: 20, padding: 20, border: "1px solid rgba(255,255,255,0.08)" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.4)", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 16 }}>Screen Navigator</div>
            {groups.map(g => (
              <div key={g} style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: T.teal, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 8 }}>{g}</div>
                {SCREENS_CONFIG.filter(s => s.group === g).map(s => (
                  <button key={s.id} onClick={() => nav(s.id)} style={{ display: "block", width: "100%", textAlign: "left", padding: "8px 12px", borderRadius: 10, border: "none", background: screen === s.id ? "rgba(0,122,124,0.3)" : "transparent", color: screen === s.id ? T.lime : "rgba(255,255,255,0.6)", fontSize: 13, fontWeight: screen === s.id ? 700 : 400, fontFamily: "'DM Sans', sans-serif", cursor: "pointer", marginBottom: 2, borderLeft: screen === s.id ? `3px solid ${T.lime}` : "3px solid transparent", transition: "all 0.15s" }}>
                    {s.label}
                  </button>
                ))}
              </div>
            ))}
          </div>
          <div style={{ marginTop: 12, background: "rgba(255,255,255,0.05)", borderRadius: 14, padding: "12px 16px", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", lineHeight: 1.6 }}>
              <div style={{ color: T.lime, fontWeight: 700, marginBottom: 4 }}>Navigation tip</div>
              Use the screen list above or tap buttons within the prototype to navigate between screens.
            </div>
          </div>
        </div>
        {/* Phone or dashboard */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ marginBottom: 20, textAlign: "center" }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: T.white }}>AHF Kairoi Intel — TBA & CHEW Tool</div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>Interactive Wireframe Prototype · v2.0 · Access Heart Foundation · May 2026</div>
          </div>
          {isCHEW ? (
            <div style={{ width: "100%", maxWidth: 900, background: "#fff", borderRadius: 20, overflow: "hidden", boxShadow: "0 40px 120px rgba(0,0,0,0.6)" }}>
              <CHEWDashboard nav={nav} />
            </div>
          ) : (
            <PhoneShell screen={screen}>
              {renderScreen()}
            </PhoneShell>
          )}
        </div>
      </div>
    </>
  );
}
