import { useState, useContext } from 'react';
import { PlatformContext } from '../../context/PlatformContext';

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const T = {
  teal:       "#007A7C",
  tealDark:   "#005F61",
  tealLight:  "#E6F4F4",
  tealMid:    "#B2DEDE",
  navy:       "#1A2B4A",
  navyLight:  "#243760",
  lime:       "#C6F135",
  limeDark:   "#A8D020",
  white:      "#FFFFFF",
  offWhite:   "#F7F8FA",
  grey50:     "#F5F5F5",
  grey100:    "#EEEEEE",
  grey200:    "#CCCCCC",
  grey400:    "#999999",
  grey500:    "#777777",
  grey600:    "#666666",
  grey800:    "#333333",
  red:        "#D32F2F",
  redLight:   "#FFEBEE",
  orange:     "#E65100",
  orangeLight:"#FFF3E0",
  amber:      "#F9A825",
  amberLight: "#FFFDE7",
  green:      "#2E7D32",
  greenLight: "#E8F5E9",
  purple:     "#6A1B9A",
  purpleLight:"#F3E5F5",
  blue:       "#1565C0",
  blueLight:  "#E3F2FD",
};

// ─── ICONS ───────────────────────────────────────────────────────────────────
const Icon = ({ name, size = 18, color = "currentColor" }) => {
  const icons = {
    users:    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    heart:    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke={color} strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
    alert:    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
    refer:    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>,
    download: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
    filter:   <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>,
    map:      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>,
    chart:    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><line x1="2" y1="20" x2="22" y2="20"/></svg>,
    bell:     <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
    settings: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
    trend_up: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
    trend_dn: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></svg>,
    check:    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
    info:     <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>,
    baby:     <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="3"/><path d="M12 11c-4 0-7 2-7 5v1h14v-1c0-3-3-5-7-5z"/></svg>,
    skull:    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a9 9 0 0 1 9 9c0 3.18-1.65 5.97-4.12 7.6L16 21H8l-.88-2.4A9 9 0 0 1 3 11a9 9 0 0 1 9-9z"/><line x1="9" y1="17" x2="9" y2="21"/><line x1="15" y1="17" x2="15" y2="21"/><line x1="9" y1="13" x2="9.01" y2="13"/><line x1="15" y1="13" x2="15.01" y2="13"/></svg>,
    bag:      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>,
    learn:    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>,
  };
  return icons[name] || null;
};

// ─── REUSABLE COMPONENTS ──────────────────────────────────────────────────────
const Card = ({ children, style }) => (
  <div style={{ background: T.white, borderRadius: 16, padding: 20, boxShadow: "0 2px 16px rgba(0,0,0,0.06)", ...style }}>
    {children}
  </div>
);

const CardHeader = ({ title, subtitle, action, icon, iconColor }) => (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      {icon && (
        <div style={{ width: 32, height: 32, borderRadius: 10, background: (iconColor || T.teal) + "18", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon name={icon} size={16} color={iconColor || T.teal} />
        </div>
      )}
      <div>
        <div style={{ fontSize: 14, fontWeight: 700, color: T.navy }}>{title}</div>
        {subtitle && <div style={{ fontSize: 11, color: T.grey400, marginTop: 1 }}>{subtitle}</div>}
      </div>
    </div>
    {action}
  </div>
);

const Chip = ({ label, value, trend, color }) => (
  <div style={{ background: T.offWhite, borderRadius: 12, padding: "12px 16px", display: "flex", flexDirection: "column", gap: 4 }}>
    <div style={{ fontSize: 11, color: T.grey400, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.8 }}>{label}</div>
    <div style={{ fontSize: 22, fontWeight: 800, color: color || T.navy }}>{value}</div>
    {trend && (
      <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: trend > 0 ? T.green : T.red }}>
        <Icon name={trend > 0 ? "trend_up" : "trend_dn"} size={12} color={trend > 0 ? T.green : T.red} />
        {Math.abs(trend)}% vs last month
      </div>
    )}
  </div>
);

const Badge = ({ text, color, bg }) => (
  <span style={{ background: bg, color: color, borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 700, whiteSpace: "nowrap" }}>
    {text}
  </span>
);

const Btn = ({ children, onClick, variant="primary", small, icon }) => {
  const styles = {
    primary: { background: T.teal,  color: T.white, border: "none" },
    lime:    { background: T.lime,  color: T.navy,  border: "none" },
    outline: { background: "transparent", color: T.teal, border: `1.5px solid ${T.teal}` },
    ghost:   { background: T.grey50, color: T.grey600, border: "none" },
    danger:  { background: T.red, color: T.white, border: "none" },
  };
  const s = styles[variant];
  return (
    <button onClick={onClick} style={{ ...s, borderRadius: 10, padding: small ? "7px 14px" : "10px 18px", fontSize: small ? 12 : 13, fontWeight: 700, fontFamily: "'DM Sans', sans-serif", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}>
      {icon && <Icon name={icon} size={14} color={s.color} />}
      {children}
    </button>
  );
};

// ─── MINI BAR CHART ───────────────────────────────────────────────────────────
const BarChart = ({ data, valueKey, color, height=120 }) => {
  const max = Math.max(...data.map(d => d[valueKey]));
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height }}>
      {data.map((d, i) => (
        <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <div style={{ fontSize: 9, color: T.grey400, fontWeight: 600 }}>{d[valueKey]}</div>
          <div style={{ width: "100%", height: (d[valueKey] / max) * (height - 28), background: color, borderRadius: "4px 4px 0 0", transition: "height 0.4s ease", minHeight: 4 }} />
          <div style={{ fontSize: 9, color: T.grey400, fontWeight: 600, textAlign: "center" }}>{d.month}</div>
        </div>
      ))}
    </div>
  );
};

// ─── MULTI-LINE SPARKLINE ─────────────────────────────────────────────────────
const MultiLine = ({ data, keys, colors, height=140 }) => {
  const w = 420, h = height, pad = 24;
  const maxVal = Math.max(...data.flatMap(d => keys.map(k => d[k])));
  const x = i => pad + (i / (data.length - 1)) * (w - pad * 2);
  const y = v => h - pad - (v / maxVal) * (h - pad * 2);
  return (
    <svg width="100%" viewBox={`0 0 ${w} ${h}`} style={{ overflow: "visible" }}>
      {[0,0.25,0.5,0.75,1].map((pct, i) => (
        <line key={i} x1={pad} y1={h - pad - pct * (h - pad * 2)} x2={w - pad} y2={h - pad - pct * (h - pad * 2)} stroke={T.grey100} strokeWidth="1" />
      ))}
      {keys.map((k, ki) => {
        const pts = data.map((d, i) => `${x(i)},${y(d[k])}`).join(" ");
        return (
          <g key={k}>
            <polyline points={pts} fill="none" stroke={colors[ki]} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
            {data.map((d, i) => (
              <circle key={i} cx={x(i)} cy={y(d[k])} r="3.5" fill={T.white} stroke={colors[ki]} strokeWidth="2" />
            ))}
          </g>
        );
      })}
      {data.map((d, i) => (
        <text key={i} x={x(i)} y={h - 4} textAnchor="middle" fontSize="9" fill={T.grey400} fontFamily="DM Sans">{d.month}</text>
      ))}
    </svg>
  );
};

// ─── DONUT CHART ──────────────────────────────────────────────────────────────
const DonutChart = ({ data, size=120 }) => {
  const total = data.reduce((s, d) => s + d.value, 0);
  const r = 40, cx = size/2, cy = size/2;
  const slices = [];
  let currentAngle = -90;
  for (let i = 0; i < data.length; i++) {
    const d = data[i];
    const pct = d.value / (total || 1);
    const startAngle = currentAngle;
    const endAngle = currentAngle + (pct * 360);
    currentAngle = endAngle;
    const start = polarToXY(cx, cy, r, startAngle);
    const end = polarToXY(cx, cy, r, endAngle);
    const large = pct > 0.5 ? 1 : 0;
    slices.push({
      ...d,
      path: `M ${cx} ${cy} L ${start.x} ${start.y} A ${r} ${r} 0 ${large} 1 ${end.x} ${end.y} Z`,
      pct: Math.round(pct * 100)
    });
  }
  return (
    <svg width={size} height={size}>
      {slices.map((s, i) => <path key={i} d={s.path} fill={s.color} />)}
      <circle cx={cx} cy={cy} r={r * 0.55} fill={T.white} />
    </svg>
  );
};

const polarToXY = (cx, cy, r, angle) => ({
  x: cx + r * Math.cos((angle * Math.PI) / 180),
  y: cy + r * Math.sin((angle * Math.PI) / 180),
});

// ─── RISK COLOUR MAP ─────────────────────────────────────────────────────────
const riskStyle = r => ({
  HIGH:   { bg: T.redLight,    color: T.red },
  CRITICAL: { bg: T.redLight,  color: T.red },
  MEDIUM: { bg: T.orangeLight, color: T.orange },
  ELEVATED: { bg: T.orangeLight, color: T.orange },
  LOW:    { bg: T.greenLight,  color: T.green },
  NORMAL: { bg: T.greenLight,  color: T.green }
}[r] || { bg: T.grey50, color: T.grey400 });

// ─── TABS ───────────────────────────────────────────────────────────────────
const TABS = [
  { id:"overview",   label:"State Overview",     icon:"chart" },
  { id:"lga",        label:"LGA Breakdown",       icon:"map" },
  { id:"maternal",   label:"Maternal Health",     icon:"heart" },
  { id:"referrals",  label:"Referrals & Outcomes",icon:"refer" },
  { id:"tbas",       label:"TBA & CHEW Activity", icon:"users" },
  { id:"training",   label:"Training & Academy",  icon:"check" },
  { id:"export",     label:"Data Export",         icon:"download" },
];

const Sidebar = ({ active, onNav, role }) => (
  <div style={{ width: 220, background: T.navy, minHeight: "100%", display: "flex", flexDirection: "column", flexShrink: 0 }}>
    <div style={{ padding: "24px 20px 20px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
        <div style={{ width: 36, height: 36, borderRadius: 12, background: T.teal, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon name="heart" size={18} color={T.white} />
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 800, color: T.white }}>AHF</div>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" }}>AHF Platform</div>
        </div>
      </div>
      <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: 12, padding: "10px 12px", marginBottom: 24 }}>
        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>Signed in as</div>
        <div style={{ fontSize: 13, fontWeight: 700, color: T.white }}>{role === "ministry" ? "Dir. Amara Okonkwo" : "Lola Mariam Alli"}</div>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>{role === "ministry" ? "Lagos State MoH" : "AHF Programme Manager"}</div>
        <div style={{ marginTop: 6, display: "inline-flex", alignItems: "center", gap: 4, background: role === "ministry" ? "rgba(198,241,53,0.15)" : "rgba(0,122,124,0.3)", borderRadius: 8, padding: "3px 8px" }}>
          <div style={{ width: 5, height: 5, borderRadius: 2.5, background: role === "ministry" ? T.lime : T.tealMid }} />
          <span style={{ fontSize: 10, color: role === "ministry" ? T.lime : T.tealMid, fontWeight: 700 }}>{role === "ministry" ? "MINISTRY VIEW" : "PROGRAMME MANAGER"}</span>
        </div>
      </div>
    </div>
    <div style={{ flex: 1, padding: "0 12px" }}>
      {TABS.map(t => (
        <button key={t.id} onClick={() => onNav(t.id)} style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "11px 12px", borderRadius: 10, border: "none", background: active === t.id ? "rgba(0,122,124,0.35)" : "transparent", color: active === t.id ? T.lime : "rgba(255,255,255,0.55)", fontSize: 13, fontWeight: active === t.id ? 700 : 400, fontFamily: "'DM Sans', sans-serif", cursor: "pointer", marginBottom: 2, borderLeft: active === t.id ? `3px solid ${T.lime}` : "3px solid transparent", textAlign: "left", transition: "all 0.15s" }}>
          <Icon name={t.icon} size={16} color={active === t.id ? T.lime : "rgba(255,255,255,0.45)"} />
          {t.label}
        </button>
      ))}
    </div>
    <div style={{ padding: 16, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
      <div style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", textAlign: "center" }}>Lagos State · 10 LGAs Active<br/>Data current as of 11 Jun 2026</div>
    </div>
  </div>
);

const TopBar = ({ title, subtitle, role, onRoleSwitch }) => (
  <div style={{ background: T.white, borderBottom: `1px solid ${T.grey100}`, padding: "14px 28px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 100 }}>
    <div>
      <div style={{ fontSize: 18, fontWeight: 800, color: T.navy }}>{title}</div>
      {subtitle && <div style={{ fontSize: 12, color: T.grey400 }}>{subtitle}</div>}
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
      <div style={{ display: "flex", background: T.grey50, borderRadius: 10, padding: 3, gap: 2 }}>
        <button onClick={() => onRoleSwitch("ahf")} style={{ padding: "6px 14px", borderRadius: 8, border: "none", background: role === "ahf" ? T.teal : "transparent", color: role === "ahf" ? T.white : T.grey500, fontSize: 12, fontWeight: 700, fontFamily: "'DM Sans', sans-serif", cursor: "pointer" }}>AHF Manager</button>
        <button onClick={() => onRoleSwitch("ministry")} style={{ padding: "6px 14px", borderRadius: 8, border: "none", background: role === "ministry" ? T.navy : "transparent", color: role === "ministry" ? T.white : T.grey500, fontSize: 12, fontWeight: 700, fontFamily: "'DM Sans', sans-serif", cursor: "pointer" }}>Ministry View</button>
      </div>
      <div style={{ display: "flex", background: T.grey50, borderRadius: 10, padding: 3, gap: 2 }}>
        {["7d","30d","3m","All"].map(p => (
          <button key={p} style={{ padding: "6px 12px", borderRadius: 8, border: "none", background: p === "30d" ? T.white : "transparent", color: p === "30d" ? T.navy : T.grey400, fontSize: 12, fontWeight: p === "30d" ? 700 : 400, fontFamily: "'DM Sans', sans-serif", cursor: "pointer", boxShadow: p === "30d" ? "0 1px 4px rgba(0,0,0,0.1)" : "none" }}>{p}</button>
        ))}
      </div>
      <div style={{ position: "relative" }}>
        <Icon name="bell" size={20} color={T.grey400} />
        <div style={{ position: "absolute", top: -3, right: -3, width: 14, height: 14, borderRadius: 7, background: T.red, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, fontWeight: 700, color: T.white }}>4</div>
      </div>
      <Icon name="settings" size={20} color={T.grey400} />
    </div>
  </div>
);

// ── STATE OVERVIEW ────────────────────────────────────────────────────────────
const StateOverview = ({ role }) => {
  const { clients, alerts, referralCount, deliveryCount, maternalDeaths, setAlerts } = useContext(PlatformContext);
  const isMinistry = role === "ministry";

  // Dynamic calculations relative to original wireframe state
  const registeredClientsCount = 2537 + (clients.length - 5);
  const activeTbasCount = 219;
  
  // Static MONTHLY_DATA from wireframe updated for May/June
  const MONTHLY_DATA = [
    { month: "Nov", clients: 187, deliveries: 28, referrals: 31, deaths: 5 },
    { month: "Dec", clients: 203, deliveries: 32, referrals: 28, deaths: 4 },
    { month: "Jan", clients: 241, deliveries: 38, referrals: 35, deaths: 3 },
    { month: "Feb", clients: 268, deliveries: 41, referrals: 29, deaths: 3 },
    { month: "Mar", clients: 312, deliveries: 49, referrals: 42, deaths: 2 },
    { month: "Apr", clients: 356, deliveries: 58, referrals: 38, deaths: 2 },
    { month: "May", clients: 419 + (clients.length - 5), deliveries: 64 + (deliveryCount - 364), referrals: 45 + (referralCount - 261), deaths: maternalDeaths - 16 },
  ];

  const REFERRAL_OUTCOMES = [
    { label: "Admitted & Treated", value: 68, color: T.green },
    { label: "Discharged Well",    value: 18, color: T.teal },
    { label: "Outcome Unknown",    value: 9,  color: T.grey400 },
    { label: "Deceased",           value: 5,  color: T.red },
  ];

  return (
    <div style={{ padding: 28 }}>
      {isMinistry && (
        <div style={{ background: T.navy, borderRadius: 14, padding: "14px 18px", marginBottom: 20, display: "flex", alignItems: "center", gap: 12 }}>
          <Icon name="info" size={18} color={T.lime} />
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.8)" }}>
            <b style={{ color: T.lime }}>Ministry View:</b> All individual client data is anonymised. You are viewing aggregate programme statistics only.
          </div>
        </div>
      )}

      {/* Hero KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 12, marginBottom: 24 }}>
        {[
          { label: "TBAs Active",        value: activeTbasCount,   trend: +12, icon: "users",  color: T.teal },
          { label: "Clients Registered", value: registeredClientsCount.toLocaleString(), trend: +18, icon: "heart",  color: T.navy },
          { label: "Deliveries Recorded", value: deliveryCount,   trend: +22, icon: "baby",   color: T.purple },
          { label: "Referrals This Month", value: referralCount,  trend: +8,  icon: "refer",  color: T.blue },
          { label: "Referral Completion", value: "91%",  trend: +3,  icon: "check",  color: T.green },
          { label: "Maternal Deaths",     value: maternalDeaths,   trend: -24, icon: "skull",  color: T.red },
        ].map((k, i) => (
          <Card key={i} style={{ padding: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: k.color + "15", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name={k.icon} size={18} color={k.color} />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 10, fontWeight: 700, color: k.trend > 0 ? T.green : T.red }}>
                <Icon name={k.trend > 0 ? "trend_up" : "trend_dn"} size={10} color={k.trend > 0 ? T.green : T.red} />
                {Math.abs(k.trend)}%
              </div>
            </div>
            <div style={{ fontSize: 26, fontWeight: 800, color: k.color, lineHeight: 1 }}>{k.value}</div>
            <div style={{ fontSize: 11, color: T.grey400, marginTop: 6, fontWeight: 500 }}>{k.label}</div>
          </Card>
        ))}
      </div>

      {/* Charts row */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16, marginBottom: 16 }}>
        <Card>
          <CardHeader title="Programme Growth — Last 7 Months" subtitle="Clients registered, deliveries recorded, referrals initiated" icon="trend_up" iconColor={T.teal}
            action={<Btn variant="ghost" small icon="download">Export</Btn>} />
          <div style={{ marginBottom: 12 }}>
            <div style={{ display: "flex", gap: 16, marginBottom: 12 }}>
              {[["Clients", T.teal], ["Deliveries", T.purple], ["Referrals", T.blue]].map(([l, c]) => (
                <div key={l} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 10, height: 10, borderRadius: 2, background: c }} />
                  <span style={{ fontSize: 11, color: T.grey500, fontWeight: 600 }}>{l}</span>
                </div>
              ))}
            </div>
            <MultiLine data={MONTHLY_DATA} keys={["clients","deliveries","referrals"]} colors={[T.teal, T.purple, T.blue]} height={160} />
          </div>
        </Card>
        <Card>
          <CardHeader title="Referral Outcomes" subtitle="All referrals to date" icon="refer" iconColor={T.blue} />
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
            <DonutChart data={REFERRAL_OUTCOMES} size={140} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {REFERRAL_OUTCOMES.map((r, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 8, height: 8, borderRadius: 2, background: r.color }} />
                  <span style={{ fontSize: 12, color: T.grey600 }}>{r.label}</span>
                </div>
                <span style={{ fontSize: 13, fontWeight: 700, color: T.grey800 }}>{r.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Alerts */}
      <Card>
        <CardHeader title="Actionable Alerts" subtitle="Items requiring programme-level attention (Live check-ins sync here)" icon="alert" iconColor={T.red} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
          {alerts.slice(0, 3).map((a, i) => (
            <div key={a.id || i} style={{ background: a.bg, border: `1.5px solid ${a.color}30`, borderRadius: 12, padding: "14px 16px", display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <Badge text={a.level} color={a.color} bg={a.color + "20"} />
                <div style={{ fontSize: 13, fontWeight: 700, color: T.grey800, margin: "8px 0 4px" }}>{a.title}</div>
                <div style={{ fontSize: 12, color: T.grey500, lineHeight: 1.5 }}>{a.body}</div>
              </div>
              <button 
                onClick={() => setAlerts(prev => prev.filter(al => al.id !== a.id))}
                style={{ marginTop: 10, alignSelf: 'flex-start', background: "none", border: `1px solid ${a.color}`, borderRadius: 8, padding: "5px 12px", fontSize: 11, fontWeight: 700, color: a.color, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}
              >
                Resolve Alert
              </button>
            </div>
          ))}
          {alerts.length === 0 && (
            <div style={{ gridColumn: 'span 3', padding: '24px', textAlign: 'center', color: T.grey400, fontSize: 14 }}>
              ✅ All alerts resolved. Excellent work!
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

// ── LGA BREAKDOWN ─────────────────────────────────────────────────────────────
const LGABreakdown = () => {
  const { lgaData } = useContext(PlatformContext);
  const [sortKey, setSortKey] = useState("clients");
  const sorted = [...lgaData].sort((a, b) => b[sortKey] - a[sortKey]);
  const max = v => Math.max(...lgaData.map(d => d[v]));

  return (
    <div style={{ padding: 28 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
        {/* LGA heatmap / bar chart */}
        <Card>
          <CardHeader title="TBAs Active by LGA" icon="users" iconColor={T.teal} />
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {lgaData.map((l, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 80, fontSize: 11, fontWeight: 600, color: T.grey600, textAlign: "right" }}>{l.name}</div>
                <div style={{ flex: 1, height: 20, background: T.grey50, borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${(l.tbas / max("tbas")) * 100}%`, background: T.teal, borderRadius: 4, display: "flex", alignItems: "center", paddingLeft: 8 }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: T.white }}>{l.tbas}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
        {/* Risk map */}
        <Card>
          <CardHeader title="LGA Risk Status" subtitle="Based on mortality rate, training completion, and referral rate" icon="map" iconColor={T.orange} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {lgaData.map((l, i) => {
              const rs = riskStyle(l.risk);
              return (
                <div key={i} style={{ background: rs.bg, border: `1px solid ${rs.color}30`, borderRadius: 10, padding: "10px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: T.grey800 }}>{l.name}</div>
                  <Badge text={l.risk} color={rs.color} bg={rs.color + "25"} />
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Full LGA table */}
      <Card>
        <CardHeader title="LGA Performance Table" subtitle="Click column headers to sort" icon="chart" iconColor={T.navy}
          action={<Btn variant="outline" small icon="download">Export CSV</Btn>} />
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: `2px solid ${T.grey100}` }}>
                {[["name","LGA"],["tbas","TBAs"],["clients","Clients"],["deliveries","Deliveries"],["referrals","Referrals"],["deaths","Deaths"],["completion","Training %"],["risk","Risk"]].map(([k, h]) => (
                  <th key={k} onClick={() => k !== "name" && k !== "risk" && setSortKey(k)} style={{ padding: "10px 12px", textAlign: "left", fontSize: 11, fontWeight: 700, color: sortKey === k ? T.teal : T.grey400, textTransform: "uppercase", letterSpacing: 0.8, cursor: k !== "name" && k !== "risk" ? "pointer" : "default", userSelect: "none" }}>
                    {h} {sortKey === k && "↓"}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sorted.map((l, i) => {
                const rs = riskStyle(l.risk);
                return (
                  <tr key={i} style={{ borderBottom: `1px solid ${T.grey50}`, background: i % 2 === 0 ? T.white : T.offWhite }}>
                    <td style={{ padding: "11px 12px", fontSize: 13, fontWeight: 700, color: T.navy }}>{l.name}</td>
                    <td style={{ padding: "11px 12px", fontSize: 13, color: T.grey800 }}>{l.tbas}</td>
                    <td style={{ padding: "11px 12px", fontSize: 13, color: T.grey800 }}>{l.clients}</td>
                    <td style={{ padding: "11px 12px", fontSize: 13, color: T.grey800 }}>{l.deliveries}</td>
                    <td style={{ padding: "11px 12px", fontSize: 13, color: T.grey800 }}>{l.referrals}</td>
                    <td style={{ padding: "11px 12px" }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: l.deaths >= 3 ? T.red : T.grey800 }}>{l.deaths}</span>
                    </td>
                    <td style={{ padding: "11px 12px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ flex: 1, height: 6, background: T.grey100, borderRadius: 3, minWidth: 60 }}>
                          <div style={{ height: "100%", width: `${l.completion}%`, background: l.completion < 60 ? T.red : l.completion < 80 ? T.amber : T.green, borderRadius: 3 }} />
                        </div>
                        <span style={{ fontSize: 12, fontWeight: 700, color: l.completion < 60 ? T.red : l.completion < 80 ? T.amber : T.green }}>{l.completion}%</span>
                      </div>
                    </td>
                    <td style={{ padding: "11px 12px" }}>
                      <Badge text={l.risk} color={rs.color} bg={rs.bg} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

// ── MATERNAL HEALTH ───────────────────────────────────────────────────────────
const MaternalHealth = () => {
  const { clients, maternalDeaths } = useContext(PlatformContext);

  // Dynamic conditions calculation from active client list
  const countCondition = (cond) => clients.filter(c => c.conditions?.includes(cond)).length;
  
  const HIGH_RISK_CLIENTS = [
    { label: "Pre-eclampsia / hypertension", value: 48 + countCondition("Hypertension"), color: T.red },
    { label: "Anaemia (severe)",           value: 31 + countCondition("Anaemia"), color: T.orange },
    { label: "Previous C-section",          value: 67 + countCondition("Previous C-Section"), color: T.amber },
    { label: "Sickle cell",                 value: 24 + countCondition("Sickle Cell"), color: T.purple },
    { label: "Multiple pregnancy",          value: 13 + countCondition("Multiple Pregnancy"), color: T.blue }
  ];

  const MONTHLY_DATA = [
    { month: "Nov", deaths: 5 },
    { month: "Dec", deaths: 4 },
    { month: "Jan", deaths: 3 },
    { month: "Feb", deaths: 3 },
    { month: "Mar", deaths: 2 },
    { month: "Apr", deaths: 2 },
    { month: "May", deaths: Math.max(maternalDeaths - 16, 0) },
  ];

  const DANGER_SIGNS = [
    { sign: "Severe headache / blurred vision", count: 142 + clients.filter(c => c.dailyCheckIns?.some(ci => ci.symptoms.includes("Severe headache / blurred vision"))).length, pct: 34 },
    { sign: "Heavy vaginal bleeding",           count: 98 + clients.filter(c => c.dailyCheckIns?.some(ci => ci.symptoms.includes("Heavy vaginal bleeding"))).length,  pct: 23 },
    { sign: "Facial/hand swelling (oedema)",    count: 87 + clients.filter(c => c.dailyCheckIns?.some(ci => ci.symptoms.includes("Facial/hand swelling (oedema)"))).length,  pct: 21 },
    { sign: "Convulsions or fitting",           count: 41,  pct: 10 },
    { sign: "Reduced foetal movement",          count: 32,  pct: 8 },
    { sign: "Prolonged labour (>12h)",          count: 19,  pct: 5 },
  ];

  return (
    <div style={{ padding: 28 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
        <Chip label="Maternal Deaths (This Period)" value={maternalDeaths} trend={-24} color={T.red} />
        <Chip label="Maternal Mortality Ratio (est.)" value="1,041" trend={-18} color={T.orange} />
        <Chip label="ANC Coverage (≥4 ANC)" value="67%" trend={+11} color={T.teal} />
        <Chip label="Skilled Birth Attendance" value="52%" trend={+8} color={T.navy} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <Card>
          <CardHeader title="Danger Signs Frequency" subtitle="Top 6 reported this period" icon="alert" iconColor={T.red} />
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {DANGER_SIGNS.map((d, i) => (
              <div key={i}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 12, color: T.grey700, fontWeight: 500 }}>{d.sign}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: T.grey800 }}>{d.count}</span>
                </div>
                <div style={{ height: 6, background: T.grey100, borderRadius: 3 }}>
                  <div style={{ height: "100%", width: `${d.pct}%`, background: i === 0 ? T.red : i === 1 ? T.orange : T.amber, borderRadius: 3 }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader title="Maternal Deaths — Trend" icon="skull" iconColor={T.red} />
          <BarChart data={MONTHLY_DATA} valueKey="deaths" color={T.red} height={160} />
          <div style={{ marginTop: 16, background: T.greenLight, border: `1px solid ${T.green}`, borderRadius: 10, padding: "10px 14px" }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: T.green }}>↓ 24% reduction vs same period last year</div>
            <div style={{ fontSize: 11, color: T.grey500, marginTop: 2 }}>Attributed to improved danger sign detection and faster referral initiation.</div>
          </div>
        </Card>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
        <Card>
          <CardHeader title="Delivery Outcomes" icon="baby" iconColor={T.purple} />
          {[["Alive & well", 331, T.green],["Alive, complications", 18, T.amber],["Stillbirth", 11, T.orange],["Neonatal death", 4, T.red]].map(([l, v, c]) => (
            <div key={l} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: `1px solid ${T.grey50}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: 2, background: c }} />
                <span style={{ fontSize: 12, color: T.grey600 }}>{l}</span>
              </div>
              <span style={{ fontSize: 14, fontWeight: 700, color: c }}>{v}</span>
            </div>
          ))}
        </Card>

        <Card>
          <CardHeader title="High-Risk Clients" icon="alert" iconColor={T.orange} />
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {HIGH_RISK_CLIENTS.map(({ label, value, color }) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 12, color: T.grey600 }}>{label}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: color }}>{value}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader title="ANC Contact Completion" subtitle="WHO minimum 8 contacts" icon="check" iconColor={T.teal} />
          {[["Contact 1–2","89%",T.green],["Contact 3–4","74%",T.teal],["Contact 5–6","61%",T.amber],["Contact 7–8","38%",T.red]].map(([l,v,c]) => (
            <div key={l} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 12, color: T.grey600 }}>{l}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: c }}>{v}</span>
              </div>
              <div style={{ height: 6, background: T.grey100, borderRadius: 3 }}>
                <div style={{ height: "100%", width: v, background: c, borderRadius: 3 }} />
              </div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
};

// ── REFERRALS & OUTCOMES ──────────────────────────────────────────────────────
const ReferralsOutcomes = () => {
  const { referralCount, activeReferrals } = useContext(PlatformContext);

  const MONTHLY_DATA = [
    { month: "Nov", referrals: 31 },
    { month: "Dec", referrals: 28 },
    { month: "Jan", referrals: 35 },
    { month: "Feb", referrals: 29 },
    { month: "Mar", referrals: 42 },
    { month: "Apr", referrals: 38 },
    { month: "May", referrals: 45 + (referralCount - 261) },
  ];

  // Dynamic counts based on live activeReferrals status
  const getStatusCount = (status) => activeReferrals.filter(r => r.status === status).length;

  const countInitiated = getStatusCount("INITIATED");
  const countEnRoute = getStatusCount("EN ROUTE");
  const countReceived = getStatusCount("RECEIVED");

  return (
    <div style={{ padding: 28 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
        <Chip label="Total Referrals (This Period)" value={referralCount} trend={+8} color={T.blue} />
        <Chip label="Emergency Referrals" value={41 + activeReferrals.filter(r => r.urgency === "Emergency").length - 1} trend={-12} color={T.red} />
        <Chip label="Referral Completion Rate" value="91%" trend={+3} color={T.green} />
        <Chip label="Avg. Time to Facility (min)" value="38" trend={-6} color={T.teal} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16, marginBottom: 16 }}>
        <Card>
          <CardHeader title="Referrals by Month" icon="refer" iconColor={T.blue} />
          <BarChart data={MONTHLY_DATA} valueKey="referrals" color={T.blue} height={160} />
        </Card>
        <Card>
          <CardHeader title="Referral Urgency Split" icon="alert" iconColor={T.orange} />
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 14 }}>
            <DonutChart data={[{value:41,color:T.red},{value:112,color:T.orange},{value:108,color:T.teal}]} size={130} />
          </div>
          {[["Emergency","41",T.red],["Urgent","112",T.orange],["Routine","108",T.teal]].map(([l,v,c]) => (
            <div key={l} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: 2, background: c }} />
                <span style={{ fontSize: 12, color: T.grey600 }}>{l}</span>
              </div>
              <span style={{ fontSize: 13, fontWeight: 700, color: c }}>{v}</span>
            </div>
          ))}
        </Card>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Card>
          <CardHeader title="Referral Status — Live" subtitle="Updated in real time (TBA referral updates here)" icon="info" iconColor={T.teal}
            action={<div style={{ display: "flex", alignItems: "center", gap: 6 }}><div style={{ width: 8, height: 8, borderRadius: 4, background: T.green, className: 'animated-pulse' }} /><span style={{ fontSize: 11, color: T.green, fontWeight: 700 }}>LIVE</span></div>} />
          {[
            ["INITIATED", countInitiated, T.orange],
            ["EN ROUTE", countEnRoute, T.blue],
            ["RECEIVED", countReceived, T.teal],
            ["OUTCOME RECORDED", 247, T.green]
          ].map(([l,v,c]) => (
            <div key={l} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", background: c + "12", borderRadius: 10, marginBottom: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 8, height: 8, borderRadius: 4, background: c }} />
                <span style={{ fontSize: 13, fontWeight: 600, color: T.grey700 }}>{l}</span>
              </div>
              <span style={{ fontSize: 18, fontWeight: 800, color: c }}>{v}</span>
            </div>
          ))}
        </Card>

        <Card>
          <CardHeader title="Top Receiving Facilities" subtitle="By referral volume" icon="map" iconColor={T.navy} />
          {[["Gbagada General Hospital","48",T.teal],["Lagos Island General","41",T.navy],["Surulere Health Centre","38",T.blue],["Ikeja General Hospital","32",T.purple],["LUTH (emergency only)","18",T.red]].map(([l,v,c],i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: `1px solid ${T.grey50}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 24, height: 24, borderRadius: 8, background: c + "18", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: c }}>{i+1}</div>
                <span style={{ fontSize: 12, color: T.grey700 }}>{l}</span>
              </div>
              <span style={{ fontSize: 14, fontWeight: 700, color: T.grey800 }}>{v}</span>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
};

// ── TBA & CHEW ACTIVITY ───────────────────────────────────────────────────────
const TBAActivity = () => {
  const { tbaActivity } = useContext(PlatformContext);

  return (
    <div style={{ padding: 28 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
        <Chip label="Total TBAs Registered" value="219" trend={+12} color={T.teal} />
        <Chip label="Active This Month" value="194" trend={+8} color={T.green} />
        <Chip label="Inactive (30+ days)" value="25" trend={+2} color={T.orange} />
        <Chip label="LSTMB Registered" value="187" trend={+14} color={T.navy} />
      </div>

      <Card style={{ marginBottom: 16 }}>
        <CardHeader title="TBA Activity Table" subtitle="All TBAs across 10 LGAs (Adunola Fatai data updates live)" icon="users" iconColor={T.teal}
          action={<Btn variant="outline" small icon="download">Export</Btn>} />
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: `2px solid ${T.grey100}` }}>
              {["TBA Name","LGA","Clients","Deliveries","Training","Status"].map(h => (
                <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontSize: 11, fontWeight: 700, color: T.grey400, textTransform: "uppercase", letterSpacing: 0.8 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tbaActivity.map((t, i) => (
              <tr key={i} style={{ borderBottom: `1px solid ${T.grey50}`, background: i % 2 === 0 ? T.white : T.offWhite }}>
                <td style={{ padding: "12px 14px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 16, background: T.tealLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>👩🏾</div>
                    <span style={{ fontSize: 13, fontWeight: 700, color: T.navy }}>{t.name}</span>
                  </div>
                </td>
                <td style={{ padding: "12px 14px", fontSize: 13, color: T.grey600 }}>{t.lga}</td>
                <td style={{ padding: "12px 14px", fontSize: 14, fontWeight: 700, color: T.teal }}>{t.clients}</td>
                <td style={{ padding: "12px 14px", fontSize: 14, fontWeight: 700, color: T.purple }}>{t.deliveries}</td>
                <td style={{ padding: "12px 14px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ flex: 1, height: 6, background: T.grey100, borderRadius: 3, minWidth: 60 }}>
                      <div style={{ height: "100%", width: `${t.training}%`, background: t.training < 50 ? T.red : t.training < 80 ? T.amber : T.green, borderRadius: 3 }} />
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 700, color: t.training < 50 ? T.red : t.training < 80 ? T.amber : T.green }}>{t.training}%</span>
                  </div>
                </td>
                <td style={{ padding: "12px 14px" }}>
                  <Badge text={t.status} color={t.status === "Active" ? T.green : t.status === "At Risk" ? T.orange : T.grey400} bg={t.status === "Active" ? T.greenLight : t.status === "At Risk" ? T.orangeLight : T.grey100} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Card>
          <CardHeader title="Mama Bag Status" icon="bag" iconColor={T.amber} />
          {[["Active & refreshed","187",T.green],["Due for refresh (30 days)","22",T.amber],["Overdue for refresh","10",T.red],["Not yet distributed","0",T.grey400]].map(([l,v,c]) => (
            <div key={l} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 0", borderBottom: `1px solid ${T.grey50}` }}>
              <span style={{ fontSize: 12, color: T.grey600 }}>{l}</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: c }}>{v}</span>
            </div>
          ))}
        </Card>
        <Card>
          <CardHeader title="LSTMB Registration Status" icon="check" iconColor={T.teal} />
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 14 }}>
            <DonutChart data={[{value:187,color:T.teal},{value:24,color:T.amber},{value:8,color:T.grey200}]} size={120} />
          </div>
          {[["LSTMB Registered","187",T.teal],["Registration Pending","24",T.amber],["Not Registered","8",T.grey400]].map(([l,v,c]) => (
            <div key={l} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: 2, background: c }} />
                <span style={{ fontSize: 12, color: T.grey600 }}>{l}</span>
              </div>
              <span style={{ fontSize: 13, fontWeight: 700, color: c }}>{v}</span>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
};

// ── TRAINING DASHBOARD ────────────────────────────────────────────────────────
const TrainingDashboard = () => {
  const { lgaData } = useContext(PlatformContext);

  return (
    <div style={{ padding: 28 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
        <Chip label="Overall Completion Rate" value="71%" trend={+9} color={T.teal} />
        <Chip label="All Modules Complete" value="94" trend={+18} color={T.green} />
        <Chip label="In Progress" value="100" trend={+6} color={T.amber} />
        <Chip label="Not Started" value="25" trend={-8} color={T.red} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16, marginBottom: 16 }}>
        <Card>
          <CardHeader title="Module Completion by LGA" icon="check" iconColor={T.teal} action={<Btn variant="ghost" small icon="download">Export</Btn>} />
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {lgaData.map((l, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 100, fontSize: 12, fontWeight: 600, color: T.grey600 }}>{l.name}</div>
                <div style={{ flex: 1, height: 8, background: T.grey100, borderRadius: 4 }}>
                  <div style={{ height: "100%", width: `${l.completion}%`, background: l.completion < 60 ? T.red : l.completion < 80 ? T.amber : T.green, borderRadius: 4, transition: "width 0.4s" }} />
                </div>
                <div style={{ width: 36, fontSize: 12, fontWeight: 700, color: l.completion < 60 ? T.red : l.completion < 80 ? T.amber : T.green, textAlign: "right" }}>{l.completion}%</div>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <CardHeader title="Mandatory Module Status" subtitle="8 required modules" icon="learn" iconColor={T.navy} />
          {[
            ["Maternal Danger Signs","219","100%",T.green],
            ["Safe Delivery Practice","198","90%",T.green],
            ["Emergency Referral","184","84%",T.teal],
            ["ANC Visit Protocol","171","78%",T.teal],
            ["Infection Control","148","68%",T.amber],
            ["AMTSL Technique","121","55%",T.amber],
            ["PPH Management","98","45%",T.orange],
            ["Record Keeping","79","36%",T.red],
          ].map(([mod, n, pct, c], i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0", borderBottom: i < 7 ? `1px solid ${T.grey50}` : "none" }}>
              <span style={{ fontSize: 11, color: T.grey600, maxWidth: 140 }}>{mod}</span>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 11, color: T.grey400 }}>{n} TBAs</span>
                <Badge text={pct} color={c} bg={c + "18"} />
              </div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
};

// ── DATA EXPORT ───────────────────────────────────────────────────────────────
const DataExport = () => {
  const [exporting, setExporting] = useState(null);
  const handleExport = (id) => { setExporting(id); setTimeout(() => setExporting(null), 2000); };
  return (
    <div style={{ padding: 28 }}>
      <div style={{ background: T.navy, borderRadius: 16, padding: "20px 24px", marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 18, fontWeight: 800, color: T.white, marginBottom: 6 }}>Data Export & DHIS2 Integration</div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>All exports are anonymised. Individual client identifiers are stripped before export.</div>
        </div>
        <div style={{ background: "rgba(198,241,53,0.15)", borderRadius: 12, padding: "10px 16px", textAlign: "center" }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: T.lime }}>DHIS2</div>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", fontWeight: 600 }}>COMPATIBLE FORMAT</div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {[
          { id:"state-summary", title:"State-Level Summary", desc:"Aggregate counts across all LGAs: TBAs active, clients registered, deliveries, referrals, maternal deaths. Ministry-grade format.", format:"CSV + DHIS2 JSON", size:"~4KB", time:"Last: 11 Jun 2026" },
          { id:"lga-breakdown", title:"LGA Breakdown Report", desc:"Same metrics broken down by all 10 active LGAs. Includes risk status, training completion, Mama Bag status.", format:"CSV", size:"~22KB", time:"Last: 11 Jun 2026" },
          { id:"maternal-outcomes", title:"Maternal Outcomes Dataset", desc:"Delivery outcomes, danger sign frequency, referral outcomes, maternal mortality trend. Quarterly format compatible with HMIS.", format:"CSV + PDF Summary", size:"~38KB", time:"Last: 1 Jun 2026" },
          { id:"tba-register", title:"TBA Programme Register", desc:"All registered TBAs with LSTMB status, certification date, training completion, and LGA. No client data included.", format:"CSV", size:"~14KB", time:"Last: 11 Jun 2026" },
          { id:"dhis2-push", title:"DHIS2 Direct Push", desc:"Push current period's anonymised data directly to the Lagos State DHIS2 instance via API. Requires MoH API credentials.", format:"DHIS2 API", size:"Auto", time:"Last push: 1 Jun 2026" },
          { id:"custom", title:"Custom Export Builder", desc:"Select specific metrics, LGAs, date ranges, and format. Generate a bespoke dataset for a specific reporting need.", format:"CSV / JSON / PDF", size:"Variable", time:"On demand" },
        ].map((ex, i) => (
          <Card key={i}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: T.navy }}>{ex.title}</div>
              <Badge text={ex.format} color={T.teal} bg={T.tealLight} />
            </div>
            <div style={{ fontSize: 13, color: T.grey500, lineHeight: 1.6, marginBottom: 14 }}>{ex.desc}</div>
            <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
              <div style={{ fontSize: 11, color: T.grey400 }}>📦 {ex.size}</div>
              <div style={{ fontSize: 11, color: T.grey400 }}>🕐 {ex.time}</div>
            </div>
            <Btn onClick={() => handleExport(ex.id)} variant={ex.id === "dhis2-push" ? "lime" : "primary"} icon="download" small>
              {exporting === ex.id ? "Generating..." : ex.id === "dhis2-push" ? "Push to DHIS2" : "Download"}
            </Btn>
          </Card>
        ))}
      </div>
    </div>
  );
};

// ─── MAIN APP VIEW ───────────────────────────────────────────────────────────
export default function DashboardView() {
  const [tab, setTab] = useState("overview");
  const [role, setRole] = useState("ahf");

  const TITLES = {
    overview:  ["State Overview", "Lagos State · All 10 LGAs · Active Program"],
    lga:       ["LGA Breakdown", "Performance metrics by Local Government Area"],
    maternal:  ["Maternal Health", "Outcomes, danger signs, and mortality data"],
    referrals: ["Referrals & Outcomes", "Referral tracking across all TBAs and LGAs"],
    tbas:      ["TBA & CHEW Activity", "Field worker performance and Mama Bag status"],
    training:  ["Training & Academy", "Module completion across all TBAs"],
    export:    ["Data Export", "Anonymised exports and DHIS2 integration"],
  };

  const renderContent = () => {
    switch(tab) {
      case "overview":  return <StateOverview role={role} />;
      case "lga":       return <LGABreakdown />;
      case "maternal":  return <MaternalHealth />;
      case "referrals": return <ReferralsOutcomes />;
      case "tbas":      return <TBAActivity />;
      case "training":  return <TrainingDashboard />;
      case "export":    return <DataExport role={role} />;
      default:          return <StateOverview role={role} />;
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100%", fontFamily: "'DM Sans', sans-serif" }}>
      <Sidebar active={tab} onNav={setTab} role={role} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "auto" }}>
        <TopBar title={TITLES[tab][0]} subtitle={TITLES[tab][1]} role={role} onRoleSwitch={setRole} />
        <div style={{ flex: 1 }}>
          {renderContent()}
        </div>
        <div style={{ padding: "12px 28px", background: T.white, borderTop: `1px solid ${T.grey100}`, display: "flex", justifyContent: "space-between", fontSize: 11, color: T.grey400 }}>
          <span>Access Heart Foundation · AHF · Programme Manager & Ministry Dashboard · v2.0 · June 2026</span>
          <span>CONFIDENTIAL — Internal use only</span>
        </div>
      </div>
    </div>
  );
}
