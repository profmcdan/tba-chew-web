import { useState, useEffect, useRef } from "react";

// ─── DESIGN TOKENS ─────────────────────────────────────────────────────────
const C = {
  coral:        "#E07A5F",
  coralDark:    "#C5624A",
  coralLight:   "#FCF0EC",
  coralMid:     "#F5C4B8",
  teal:         "#3D9B8F",
  tealDark:     "#2C7A70",
  tealLight:    "#E8F7F5",
  tealMid:      "#A8D8D2",
  navy:         "#1A2B4A",
  navyLight:    "#2E4070",
  cream:        "#FDF8F3",
  warmWhite:    "#FFFCF9",
  peach:        "#FFF0E8",
  sage:         "#7BAE9F",
  sageMid:      "#B8D8D1",
  sageLight:    "#EEF7F5",
  lavender:     "#9B8EC4",
  lavLight:     "#F0EDF8",
  amber:        "#F4A623",
  amberLight:   "#FEF6E4",
  green:        "#4CAF7D",
  greenLight:   "#EBF7EF",
  red:          "#E05252",
  redLight:     "#FDECEC",
  grey100:      "#F5F3F0",
  grey200:      "#E8E4E0",
  grey300:      "#CEC9C3",
  grey400:      "#A09890",
  grey600:      "#6B6460",
  grey800:      "#3D3530",
  white:        "#FFFFFF",
};

// ─── GLOBAL STYLES ──────────────────────────────────────────────────────────
const G = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=Fraunces:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap');
  *{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent}
  ::-webkit-scrollbar{width:3px}::-webkit-scrollbar-thumb{background:${C.grey200};border-radius:2px}
  @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
  @keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.06)}}
  @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
  @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
  @keyframes confetti{0%{transform:translateY(0) rotate(0deg);opacity:1}100%{transform:translateY(-120px) rotate(720deg);opacity:0}}
  @keyframes heartbeat{0%,100%{transform:scale(1)}14%{transform:scale(1.15)}28%{transform:scale(1)}42%{transform:scale(1.1)}70%{transform:scale(1)}}
  @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
  @keyframes slideIn{from{transform:translateX(100%)}to{transform:translateX(0)}}
  @keyframes bounceDot{0%,80%,100%{transform:scale(0)}40%{transform:scale(1)}}
`;

// ─── ICONS ──────────────────────────────────────────────────────────────────
const Ic = ({ n, s = 20, c = "currentColor", fill = "none" }) => {
  const d = {
    home:    "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10",
    record:  "M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2 M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2 M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2 M12 12h.01 M12 16h.01",
    check:   "M9 11l3 3L22 4 M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11",
    learn:   "M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z",
    baby:    "M12 2a5 5 0 1 0 0 10A5 5 0 0 0 12 2z M6 22v-2a6 6 0 0 1 12 0v2",
    heart:   "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z",
    alert:   "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z M12 9v4 M12 17h.01",
    back:    "M15 18l-6-6 6-6",
    plus:    "M12 5v14 M5 12h14",
    phone:   "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 9.7 19.79 19.79 0 0 1 1.62 1.04 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z",
    map:     "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z M12 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
    sun:     "M12 1v2 M12 21v2 M4.22 4.22l1.42 1.42 M18.36 18.36l1.42 1.42 M1 12h2 M21 12h2 M4.22 19.78l1.42-1.42 M18.36 5.64l1.42-1.42 M12 5a7 7 0 1 0 0 14A7 7 0 0 0 12 5z",
    bell:    "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 0 1-3.46 0",
    star:    "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
    syringe: "M18 2l4 4-14 14-4-4 14-14z M2 22l4-4 M14 8l-4 4",
    chart:   "M3 3v18h18 M18 17V9 M13 17V5 M8 17v-3",
    camera:  "M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z M12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
    lock:    "M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2z M7 11V7a5 5 0 0 1 10 0v4",
    settings:"M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z",
    wifi:    "M5 12.55a11 11 0 0 1 14.08 0 M1.42 9a16 16 0 0 1 21.16 0 M8.53 16.11a6 6 0 0 1 6.95 0 M12 20h.01",
    arrow:   "M5 12h14 M12 5l7 7-7 7",
    family:  "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 7a4 4 0 1 0 0 8 4 4 0 0 0 0-8z M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75",
    kick:    "M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z M8 12l3 3 5-6",
    weight:  "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z",
    mood:    "M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z M8 14s1.5 2 4 2 4-2 4-2 M9 9h.01 M15 9h.01",
  };
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill={fill === "solid" ? c : "none"} stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {d[n]?.split(" M ").map((p, i) => <path key={i} d={i === 0 ? p : "M " + p} />)}
    </svg>
  );
};

// ─── REUSABLE COMPONENTS ────────────────────────────────────────────────────

const WarmHeader = ({ title, subtitle, onBack, light, action }) => (
  <div style={{
    background: light ? C.warmWhite : `linear-gradient(135deg, ${C.coral} 0%, ${C.coralDark} 100%)`,
    padding: "16px 20px 20px",
    position: "sticky", top: 0, zIndex: 10,
  }}>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {onBack && (
          <button onClick={onBack} style={{ width: 36, height: 36, borderRadius: 12, background: light ? C.grey100 : "rgba(255,255,255,0.2)", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <Ic n="back" s={18} c={light ? C.grey800 : C.white} />
          </button>
        )}
        <div>
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: 20, fontWeight: 600, color: light ? C.navy : C.white, lineHeight: 1.2 }}>{title}</div>
          {subtitle && <div style={{ fontSize: 12, color: light ? C.grey400 : "rgba(255,255,255,0.75)", marginTop: 2, fontFamily: "'DM Sans', sans-serif" }}>{subtitle}</div>}
        </div>
      </div>
      {action}
    </div>
  </div>
);

const Pad = ({ children, style }) => (
  <div style={{ padding: "16px 20px", ...style }}>{children}</div>
);

const Card = ({ children, style, onClick }) => (
  <div onClick={onClick} style={{ background: C.white, borderRadius: 20, padding: 16, boxShadow: "0 2px 16px rgba(58,35,20,0.07)", cursor: onClick ? "pointer" : "default", ...style }}>
    {children}
  </div>
);

const Pill = ({ children, color = C.coral, bg }) => (
  <span style={{ background: bg || color + "18", color, borderRadius: 20, padding: "4px 12px", fontSize: 11, fontWeight: 700, fontFamily: "'DM Sans', sans-serif", letterSpacing: 0.3, whiteSpace: "nowrap" }}>
    {children}
  </span>
);

const Btn = ({ children, onClick, variant = "coral", full, small, icon, disabled }) => {
  const v = {
    coral:   { bg: C.coral,    c: C.white,  border: "none" },
    teal:    { bg: C.teal,     c: C.white,  border: "none" },
    outline: { bg: "transparent", c: C.coral, border: `1.5px solid ${C.coral}` },
    ghost:   { bg: C.grey100,  c: C.grey600, border: "none" },
    red:     { bg: C.red,      c: C.white,  border: "none" },
    navy:    { bg: C.navy,     c: C.white,  border: "none" },
  }[variant];
  return (
    <button onClick={onClick} disabled={disabled} style={{ background: v.bg, color: v.c, border: v.border, borderRadius: 16, padding: small ? "10px 16px" : "14px 20px", fontSize: small ? 13 : 15, fontWeight: 700, fontFamily: "'DM Sans', sans-serif", cursor: disabled ? "not-allowed" : "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, width: full ? "100%" : "auto", opacity: disabled ? 0.5 : 1, transition: "transform 0.1s", lineHeight: 1 }}>
      {icon && <Ic n={icon} s={16} c={v.c} />}{children}
    </button>
  );
};

const Label = ({ children }) => (
  <div style={{ fontSize: 10, fontWeight: 700, color: C.grey400, textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 8, marginTop: 18, fontFamily: "'DM Sans', sans-serif" }}>
    {children}
  </div>
);

const FieldInput = ({ label, value, placeholder, type = "text", suffix }) => (
  <div style={{ marginBottom: 14 }}>
    {label && <Label>{label}</Label>}
    <div style={{ position: "relative" }}>
      <input type={type} defaultValue={value} placeholder={placeholder} style={{ width: "100%", background: C.cream, border: `1.5px solid ${C.grey200}`, borderRadius: 14, padding: "13px 14px", fontSize: 14, fontFamily: "'DM Sans', sans-serif", color: C.grey800, outline: "none" }} />
      {suffix && <span style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", fontSize: 12, color: C.grey400 }}>{suffix}</span>}
    </div>
  </div>
);

const RadioRow = ({ label, options, value, onChange }) => (
  <div style={{ marginBottom: 14 }}>
    {label && <Label>{label}</Label>}
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {options.map(o => (
        <button key={o} onClick={() => onChange(o)} style={{ padding: "9px 16px", borderRadius: 20, border: `1.5px solid ${value === o ? C.coral : C.grey200}`, background: value === o ? C.coralLight : C.white, color: value === o ? C.coral : C.grey600, fontSize: 13, fontWeight: value === o ? 700 : 400, fontFamily: "'DM Sans', sans-serif", cursor: "pointer" }}>{o}</button>
      ))}
    </div>
  </div>
);

// Pregnancy week illustration
const BumpIllustration = ({ week }) => {
  const fruits = { 4:"🫘", 6:"🫐", 8:"🍓", 10:"🍋", 12:"🍊", 14:"🍎", 16:"🥑", 18:"🥕", 20:"🌽", 22:"🍆", 24:"🌽", 26:"🥬", 28:"🥦", 30:"🥥", 32:"🍍", 34:"🥜", 36:"🫒", 38:"🎃", 40:"🍉" };
  const closest = Object.keys(fruits).reduce((a, b) => Math.abs(b - week) < Math.abs(a - week) ? b : a);
  return (
    <div style={{ textAlign: "center", animation: "float 3s ease-in-out infinite" }}>
      <div style={{ fontSize: 48, marginBottom: 4 }}>{fruits[closest]}</div>
      <div style={{ fontSize: 10, color: C.grey400, fontFamily: "'DM Sans', sans-serif" }}>Baby is about the size of a {["broccoli","coconut","pineapple","melon"][Math.floor(week/10)%4]}</div>
    </div>
  );
};

// Donut ring (for stats)
const Ring = ({ pct, color, size = 52, stroke = 5 }) => {
  const r = (size - stroke * 2) / 2;
  const circ = 2 * Math.PI * r;
  return (
    <svg width={size} height={size}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={C.grey100} strokeWidth={stroke} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke} strokeDasharray={`${circ * pct / 100} ${circ}`} strokeLinecap="round" transform={`rotate(-90 ${size/2} ${size/2})`} />
    </svg>
  );
};

// Bottom nav
const BottomNav = ({ active, nav, phase = "pregnancy" }) => {
  const tabs = phase === "pregnancy"
    ? [{ id: "home", icon: "home", label: "Home" }, { id: "my-record", icon: "record", label: "My Record" }, { id: "track", icon: "check", label: "Track" }, { id: "learn", icon: "learn", label: "Learn" }, { id: "more", icon: "settings", label: "More" }]
    : [{ id: "home", icon: "home", label: "Home" }, { id: "my-record", icon: "record", label: "My Record" }, { id: "baby", icon: "baby", label: "My Baby" }, { id: "learn", icon: "learn", label: "Learn" }, { id: "more", icon: "settings", label: "More" }];
  return (
    <div style={{ position: "sticky", bottom: 0, background: C.white, borderTop: `1px solid ${C.grey100}`, display: "flex", padding: "8px 0 14px" }}>
      {tabs.map(t => (
        <button key={t.id} onClick={() => nav(t.id)} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
          <Ic n={t.icon} s={22} c={active === t.id ? C.coral : C.grey300} />
          <span style={{ fontSize: 10, fontWeight: active === t.id ? 700 : 400, color: active === t.id ? C.coral : C.grey400 }}>{t.label}</span>
        </button>
      ))}
    </div>
  );
};

// Status bar
const StatusBar = ({ dark }) => (
  <div style={{ height: 44, background: dark ? "#2a1810" : C.coral, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", position: "relative" }}>
    <span style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>9:41</span>
    <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", width: 120, height: 26, background: "#000", borderRadius: 13 }} />
    <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
      <Ic n="wifi" s={13} c="#fff" />
      {[1,2,3,4].map(i => <div key={i} style={{ width: 3, height: 3+i*2.5, background: "#fff", borderRadius: 1 }} />)}
    </div>
  </div>
);

// ══════════════════════════════════════════════════════════════════════════════
//  SCREENS
// ══════════════════════════════════════════════════════════════════════════════

// ── SCREEN 1: LANGUAGE SELECTOR ────────────────────────────────────────────
const LanguageScreen = ({ nav }) => (
  <div style={{ minHeight: 800, background: `linear-gradient(160deg, ${C.navy} 0%, ${C.coral} 120%)`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 32 }}>
    <div style={{ animation: "heartbeat 2s infinite", marginBottom: 24 }}>
      <Ic n="heart" s={52} c={C.coralLight} fill="solid" />
    </div>
    <div style={{ fontFamily: "'Fraunces', serif", fontSize: 32, fontWeight: 700, color: C.white, textAlign: "center", marginBottom: 8, lineHeight: 1.2 }}>AHF Mama</div>
    <div style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", textAlign: "center", marginBottom: 48, fontFamily: "'DM Sans', sans-serif" }}>Access Heart Foundation · Your pregnancy companion</div>
    <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 12 }}>
      {[["English", "English", "🇳🇬"], ["Yoruba", "Yorùbá", "🟡"], ["Pidgin", "Nigerian Pidgin", "🟠"], ["Hausa", "Hausa", "🟢"]].map(([id, label, flag]) => (
        <button key={id} onClick={() => nav("welcome")} style={{ background: "rgba(255,255,255,0.12)", border: "1.5px solid rgba(255,255,255,0.25)", borderRadius: 18, padding: "16px 20px", display: "flex", alignItems: "center", gap: 14, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", backdropFilter: "blur(10px)" }}>
          <span style={{ fontSize: 24 }}>{flag}</span>
          <div style={{ textAlign: "left" }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: C.white }}>{label}</div>
            {label !== id && <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>{id}</div>}
          </div>
        </button>
      ))}
    </div>
  </div>
);

// ── SCREEN 2: WELCOME / REGISTRATION ENTRY ─────────────────────────────────
const WelcomeScreen = ({ nav }) => (
  <div style={{ minHeight: 800, background: C.cream, display: "flex", flexDirection: "column" }}>
    <div style={{ flex: 1, padding: "48px 28px 28px" }}>
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <div style={{ fontSize: 56, marginBottom: 16 }}>🤱🏾</div>
        <div style={{ fontFamily: "'Fraunces', serif", fontSize: 28, fontWeight: 700, color: C.navy, lineHeight: 1.3, marginBottom: 12 }}>
          Welcome to<br/>AHF Mama
        </div>
        <div style={{ fontSize: 14, color: C.grey600, lineHeight: 1.6, fontFamily: "'DM Sans', sans-serif" }}>
          Your personal pregnancy companion — built with love by Access Heart Foundation
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <button onClick={() => nav("register-mediated")} style={{ background: `linear-gradient(135deg, ${C.coral}, ${C.coralDark})`, border: "none", borderRadius: 20, padding: "18px 20px", display: "flex", alignItems: "center", gap: 14, cursor: "pointer", boxShadow: `0 8px 24px ${C.coral}40` }}>
          <div style={{ width: 44, height: 44, borderRadius: 14, background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>🏥</div>
          <div style={{ textAlign: "left" }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: C.white, fontFamily: "'DM Sans', sans-serif" }}>A health centre or community link registered me</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.75)", fontFamily: "'DM Sans', sans-serif" }}>Connect to your existing care record</div>
          </div>
        </button>
        <button onClick={() => nav("register-self")} style={{ background: C.white, border: `1.5px solid ${C.grey200}`, borderRadius: 20, padding: "18px 20px", display: "flex", alignItems: "center", gap: 14, cursor: "pointer" }}>
          <div style={{ width: 44, height: 44, borderRadius: 14, background: C.coralLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>📱</div>
          <div style={{ textAlign: "left" }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: C.navy, fontFamily: "'DM Sans', sans-serif" }}>I'm registering myself</div>
            <div style={{ fontSize: 12, color: C.grey400, fontFamily: "'DM Sans', sans-serif" }}>Create a new account</div>
          </div>
        </button>
      </div>
    </div>
    <div style={{ padding: "0 28px 32px", textAlign: "center" }}>
      <div style={{ fontSize: 11, color: C.grey400, fontFamily: "'DM Sans', sans-serif", lineHeight: 1.6 }}>
        By using AHF Mama you agree to our Privacy Policy. Your data is protected under Nigeria's Data Protection Regulation (NDPR).
      </div>
    </div>
  </div>
);

// ── SCREEN 3: MEDIATED REGISTRATION ────────────────────────────────────────
const MediatedRegScreen = ({ nav }) => {
  const [phone, setPhone] = useState("");
  const [matched, setMatched] = useState(false);
  return (
    <div style={{ minHeight: 800, background: C.cream }}>
      <WarmHeader title="Connect Your Record" onBack={() => nav("welcome")} />
      <Pad>
        <div style={{ textAlign: "center", padding: "24px 0 28px" }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>📱</div>
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: 20, fontWeight: 600, color: C.navy, marginBottom: 8 }}>Find your care record</div>
          <div style={{ fontSize: 13, color: C.grey500, lineHeight: 1.6, fontFamily: "'DM Sans', sans-serif" }}>Enter the phone number you gave your health centre or community health link when you were registered.</div>
        </div>
        {!matched ? (
          <>
            <FieldInput label="Your Phone Number" value={phone} placeholder="+234 803 456 7890" />
            <div style={{ background: C.tealLight, border: `1.5px solid ${C.tealMid}`, borderRadius: 14, padding: "12px 14px", marginBottom: 20, fontSize: 13, color: C.teal, fontFamily: "'DM Sans', sans-serif", lineHeight: 1.5 }}>
              🔒 We only use your phone number to find your care record. It is never shared.
            </div>
            <Btn onClick={() => setMatched(true)} full>Find My Record →</Btn>
          </>
        ) : (
          <div style={{ animation: "fadeUp 0.4s ease" }}>
            <div style={{ background: C.greenLight, border: `1.5px solid ${C.green}`, borderRadius: 20, padding: "20px", textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>✅</div>
              <div style={{ fontFamily: "'Fraunces', serif", fontSize: 20, fontWeight: 600, color: C.navy, marginBottom: 8 }}>Welcome, Adunni!</div>
              <div style={{ fontSize: 13, color: C.grey600, marginBottom: 16, fontFamily: "'DM Sans', sans-serif" }}>We found your record</div>
              <div style={{ background: C.white, borderRadius: 14, padding: "14px", display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                <div style={{ fontSize: 28 }}>👩🏾</div>
                <div style={{ textAlign: "left", flex: 1 }}>
                  <div style={{ fontSize: 11, color: C.grey400, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.6, fontFamily: "'DM Sans', sans-serif" }}>Your community health link</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: C.navy, fontFamily: "'DM Sans', sans-serif" }}>Mama Adunola Fatai</div>
                  <div style={{ fontSize: 12, color: C.grey500, fontFamily: "'DM Sans', sans-serif" }}>Surulere · Connects you to care</div>
                </div>
              </div>
              <div style={{ background: C.tealLight, borderRadius: 14, padding: "14px", display: "flex", alignItems: "center", gap: 12, border: `1px solid ${C.tealMid}` }}>
                <div style={{ fontSize: 28 }}>🏥</div>
                <div style={{ textAlign: "left", flex: 1 }}>
                  <div style={{ fontSize: 11, color: C.teal, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.6, fontFamily: "'DM Sans', sans-serif" }}>Your delivery facility</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: C.navy, fontFamily: "'DM Sans', sans-serif" }}>Surulere PHC</div>
                  <div style={{ fontSize: 12, color: C.tealDark, fontFamily: "'DM Sans', sans-serif" }}>Where skilled staff will deliver your baby</div>
                </div>
              </div>
            </div>
            <Btn onClick={() => nav("pin-setup")} full>This is me! Continue →</Btn>
          </div>
        )}
      </Pad>
    </div>
  );
};

// ── SCREEN 4: PIN SETUP ─────────────────────────────────────────────────────
const PinSetupScreen = ({ nav }) => {
  const [pin, setPin] = useState([]);
  return (
    <div style={{ minHeight: 800, background: C.cream, display: "flex", flexDirection: "column" }}>
      <WarmHeader title="Set Your PIN" onBack={() => nav("register-mediated")} />
      <Pad style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontSize: 36, marginBottom: 16 }}>🔐</div>
        <div style={{ fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 600, color: C.navy, marginBottom: 8, textAlign: "center" }}>Protect your account</div>
        <div style={{ fontSize: 13, color: C.grey500, marginBottom: 32, textAlign: "center", fontFamily: "'DM Sans', sans-serif" }}>Choose a 4-digit PIN to keep your information safe</div>
        <div style={{ display: "flex", gap: 16, marginBottom: 40 }}>
          {[0,1,2,3].map(i => (
            <div key={i} style={{ width: 52, height: 52, borderRadius: 16, border: `2px solid ${i < pin.length ? C.coral : C.grey200}`, background: i < pin.length ? C.coral : C.cream, display: "flex", alignItems: "center", justifyContent: "center" }}>
              {i < pin.length && <div style={{ width: 12, height: 12, borderRadius: 6, background: C.white }} />}
            </div>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, width: 220 }}>
          {[1,2,3,4,5,6,7,8,9,"",0,"⌫"].map((d, i) => (
            <button key={i} onClick={() => {
              if (d === "⌫") setPin(p => p.slice(0,-1));
              else if (d !== "" && pin.length < 4) { const np = [...pin, d]; setPin(np); if (np.length === 4) setTimeout(() => nav("consent"), 600); }
            }} style={{ height: 52, borderRadius: 14, background: d === "" ? "transparent" : C.white, border: d === "" ? "none" : `1px solid ${C.grey200}`, fontSize: 18, fontWeight: 600, color: C.grey800, cursor: d === "" ? "default" : "pointer", fontFamily: "'DM Sans', sans-serif", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: d === "" ? "none" : "0 2px 8px rgba(0,0,0,0.06)" }}>
              {d}
            </button>
          ))}
        </div>
        <div style={{ marginTop: 24, fontSize: 13, color: C.teal, fontFamily: "'DM Sans', sans-serif", cursor: "pointer" }}>Use fingerprint or face instead →</div>
      </Pad>
    </div>
  );
};

// ── SCREEN 5: NDPR CONSENT ──────────────────────────────────────────────────
const ConsentScreen = ({ nav }) => {
  const [agreed, setAgreed] = useState(false);
  return (
    <div style={{ minHeight: 800, background: C.cream }}>
      <WarmHeader title="Your Privacy" onBack={() => nav("pin-setup")} />
      <Pad>
        <div style={{ fontSize: 36, textAlign: "center", marginBottom: 16 }}>🛡️</div>
        <div style={{ fontFamily: "'Fraunces', serif", fontSize: 20, fontWeight: 600, color: C.navy, textAlign: "center", marginBottom: 20 }}>How we use your information</div>
        {[
          ["📋","Your care record","Your clinical information (visits, BP, EGA) is recorded by your health worker and is yours to view. It is only shared with your care team, CHEW supervisor, and AHF programme team."],
          ["📊","Your personal tracking","Symptom check-ins, kick counts, mood logs — this is your data. You can delete it at any time."],
          ["🔬","Research use","We may use anonymised, non-identifiable data to improve maternal health in Nigeria. Your name and phone number are never used in research."],
          ["🗑️","Your right to delete","You can delete your account and all your personal data at any time from Settings."],
        ].map(([icon, title, body]) => (
          <div key={title} style={{ background: C.white, borderRadius: 16, padding: "14px 16px", marginBottom: 10, display: "flex", gap: 12 }}>
            <span style={{ fontSize: 22, flexShrink: 0 }}>{icon}</span>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.navy, marginBottom: 4, fontFamily: "'DM Sans', sans-serif" }}>{title}</div>
              <div style={{ fontSize: 12, color: C.grey600, lineHeight: 1.5, fontFamily: "'DM Sans', sans-serif" }}>{body}</div>
            </div>
          </div>
        ))}
        <button onClick={() => setAgreed(!agreed)} style={{ display: "flex", alignItems: "flex-start", gap: 12, background: agreed ? C.greenLight : C.cream, border: `1.5px solid ${agreed ? C.green : C.grey200}`, borderRadius: 14, padding: "14px 16px", cursor: "pointer", marginBottom: 20, width: "100%", textAlign: "left", fontFamily: "'DM Sans', sans-serif" }}>
          <div style={{ width: 22, height: 22, borderRadius: 7, border: `2px solid ${agreed ? C.green : C.grey300}`, background: agreed ? C.green : C.white, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            {agreed && <Ic n="check" s={13} c={C.white} />}
          </div>
          <div style={{ fontSize: 13, color: C.grey700, lineHeight: 1.5 }}>I understand and agree to how AHF Mama uses my information, in line with Nigeria's Data Protection Regulation (NDPR).</div>
        </button>
        <Btn onClick={() => nav("home")} full disabled={!agreed}>Get Started →</Btn>
      </Pad>
    </div>
  );
};

// ── SCREEN 6: HOME (PREGNANCY) ──────────────────────────────────────────────
const HomeScreen = ({ nav, phase }) => {
  const week = 28;
  return (
    <div style={{ background: C.cream }}>
      <div style={{ background: `linear-gradient(160deg, ${C.coral} 0%, ${C.coralDark} 100%)`, padding: "20px 20px 40px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", fontFamily: "'DM Sans', sans-serif" }}>Good morning,</div>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 24, fontWeight: 700, color: C.white, lineHeight: 1.2 }}>Adunni 🌸</div>
          </div>
          <div style={{ position: "relative" }}>
            <button onClick={() => nav("more")} style={{ width: 42, height: 42, borderRadius: 14, background: "rgba(255,255,255,0.2)", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <Ic n="bell" s={20} c={C.white} />
            </button>
            <div style={{ position: "absolute", top: -2, right: -2, width: 14, height: 14, borderRadius: 7, background: C.amber, border: `2px solid ${C.coral}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, fontWeight: 700, color: C.navy }}>2</div>
          </div>
        </div>
        <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: 20, padding: "16px", display: "flex", alignItems: "center", gap: 16 }}>
          <BumpIllustration week={week} />
          <div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", fontFamily: "'DM Sans', sans-serif", textTransform: "uppercase", letterSpacing: 1 }}>Week</div>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 44, fontWeight: 700, color: C.white, lineHeight: 1 }}>{week}</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.8)", fontFamily: "'DM Sans', sans-serif" }}>of your pregnancy</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", marginTop: 4, fontFamily: "'DM Sans', sans-serif" }}>EDD: 12 Aug 2026 · 84 days to go</div>
          </div>
        </div>
      </div>
      <div style={{ margin: "-20px 16px 0", position: "relative", zIndex: 2 }}>
        <button onClick={() => nav("symptom-checkin")} style={{ width: "100%", background: C.white, border: "none", borderRadius: 20, padding: "16px", boxShadow: "0 8px 24px rgba(58,35,20,0.1)", cursor: "pointer", display: "flex", alignItems: "center", gap: 14, fontFamily: "'DM Sans', sans-serif" }}>
          <div style={{ width: 44, height: 44, borderRadius: 14, background: C.coralLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>🩺</div>
          <div style={{ flex: 1, textAlign: "left" }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: C.navy }}>Daily health check-in</div>
            <div style={{ fontSize: 12, color: C.grey400 }}>60 seconds · Not done today</div>
          </div>
          <div style={{ width: 8, height: 8, borderRadius: 4, background: C.amber }} />
        </button>
      </div>
      <Pad style={{ paddingTop: 20 }}>
        <button onClick={() => nav("symptom-report")} style={{ width: "100%", background: `linear-gradient(135deg, ${C.red}, #C0392B)`, border: "none", borderRadius: 20, padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", marginBottom: 16, boxShadow: `0 8px 20px ${C.red}40` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Ic n="alert" s={24} c={C.white} />
            <div style={{ textAlign: "left" }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: C.white, fontFamily: "'DM Sans', sans-serif" }}>I have a symptom</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.75)", fontFamily: "'DM Sans', sans-serif" }}>Tap to report and reach skilled care quickly</div>
            </div>
          </div>
          <Ic n="arrow" s={20} c={C.white} />
        </button>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
          {[
            { icon:"🏥", label:"My Birth Plan", sub:"Plan your facility delivery", screen:"birth-plan" },
            { icon:"📚", label:"Week 28 Guide", sub:"New content available", screen:"learn" },
            { icon:"🦶", label:"Kick Counter", sub:"Count baby's kicks", screen:"kick-counter" },
            { icon:"😊", label:"Mood Today", sub:"How are you feeling?", screen:"mood" },
          ].map(({ icon, label, sub, screen }) => (
            <button key={label} onClick={() => nav(screen)} style={{ background: C.white, borderRadius: 18, padding: "14px 12px", border: "none", cursor: "pointer", textAlign: "left", boxShadow: "0 2px 12px rgba(58,35,20,0.06)", fontFamily: "'DM Sans', sans-serif" }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{icon}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.navy }}>{label}</div>
              <div style={{ fontSize: 11, color: C.grey400, marginTop: 2 }}>{sub}</div>
            </button>
          ))}
        </div>
        <Card style={{ background: C.tealLight, border: `1px solid ${C.tealMid}`, marginBottom: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ fontSize: 28 }}>🏥</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 10, color: C.teal, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.6, fontFamily: "'DM Sans', sans-serif" }}>Your delivery facility</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.tealDark, fontFamily: "'DM Sans', sans-serif" }}>Surulere PHC</div>
              <div style={{ fontSize: 11, color: C.teal, fontFamily: "'DM Sans', sans-serif" }}>Skilled birth attendants · 2.4 km away</div>
            </div>
            <button onClick={() => nav("birth-plan")} style={{ background: C.teal, border: "none", borderRadius: 12, padding: "8px 12px", cursor: "pointer", fontSize: 12, fontWeight: 700, color: C.white, fontFamily: "'DM Sans', sans-serif" }}>Plan</button>
          </div>
        </Card>
        <Card style={{ background: C.white, border: `1px solid ${C.grey200}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ fontSize: 24 }}>👩🏾</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 10, color: C.grey400, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.6, fontFamily: "'DM Sans', sans-serif" }}>Your community health link</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.navy, fontFamily: "'DM Sans', sans-serif" }}>Mama Adunola Fatai</div>
              <div style={{ fontSize: 11, color: C.grey400, fontFamily: "'DM Sans', sans-serif" }}>Connects you to care · Last visit 15 May</div>
            </div>
            <button style={{ background: C.coralLight, border: "none", borderRadius: 12, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <Ic n="phone" s={16} c={C.coral} />
            </button>
          </div>
        </Card>
      </Pad>
      <BottomNav active="home" nav={nav} phase={phase} />
    </div>
  );
};

// ── SCREEN 7: MY RECORD ──────────────────────────────────────────────────────
const MyRecordScreen = ({ nav, phase }) => {
  const [tab, setTab] = useState("visits");
  const [openVisit, setOpenVisit] = useState(4);
  const [trend, setTrend] = useState("BP");

  const visits = [
    { n:1, date:"18 Feb 2026", ega:"9 wks", bp:"110/72", weight:"64kg", fundal:"—", fhr:"—", oedema:"None", urine:"Negative", treatments:["Folic acid", "Booking bloods taken"], note:"First contact. All normal. Birth plan started.", flag:"Normal" },
    { n:2, date:"18 Mar 2026", ega:"13 wks", bp:"114/74", weight:"65.5kg", fundal:"—", fhr:"148 bpm", oedema:"None", urine:"Negative", treatments:["Iron / folic acid", "TT1 given"], note:"Good progress. FHR heard.", flag:"Normal" },
    { n:3, date:"14 Apr 2026", ega:"17 wks", bp:"118/76", weight:"67kg", fundal:"17 cm", fhr:"150 bpm", oedema:"None", urine:"Negative", treatments:["Iron / folic acid", "IPT1 (malaria)"], note:"Normal. Foetal movement felt.", flag:"Normal" },
    { n:4, date:"12 May 2026", ega:"24 wks", bp:"122/78", weight:"68.5kg", fundal:"24 cm", fhr:"146 bpm", oedema:"None", urine:"Negative", treatments:["Iron / folic acid", "TT2 given", "IPT2 (malaria)"], note:"Normal. Glucose check normal.", flag:"Normal" },
    { n:5, date:"15 May 2026", ega:"28 wks", bp:"128/84", weight:"70kg", fundal:"28 cm", fhr:"148 bpm", oedema:"Mild (feet)", urine:"Trace", treatments:["Iron / folic acid"], note:"Mild ankle swelling and trace protein noted. BP slightly raised — to monitor closely. Advised to report headache, blurred vision or worsening swelling immediately.", flag:"Watch" },
  ];

  const charts = {
    BP:     { label:"Blood Pressure (Systolic)", unit:"mmHg", data:[110,114,118,122,128], lo:105, range:30, warn:125 },
    Weight: { label:"Weight", unit:"kg", data:[64,65.5,67,68.5,70], lo:62, range:10, warn:999 },
    Fundal: { label:"Fundal Height", unit:"cm", data:[0,0,17,24,28], lo:0, range:32, warn:999 },
  };
  const ch = charts[trend];

  return (
    <div style={{ background: C.cream }}>
      <WarmHeader title="My Record" subtitle="Your pregnancy care history" />
      <Pad>
        {/* Pregnancy summary */}
        <Card style={{ marginBottom: 12, background: `linear-gradient(135deg, ${C.coralLight}, ${C.peach})`, border: `1px solid ${C.coralMid}` }}>
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Fraunces', serif", fontSize: 36, fontWeight: 700, color: C.coral }}>28</div>
              <div style={{ fontSize: 10, color: C.grey500, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.8, fontFamily: "'DM Sans', sans-serif" }}>Weeks</div>
            </div>
            <div style={{ flex: 1, borderLeft: `1px solid ${C.coralMid}`, paddingLeft: 16 }}>
              {[["EDD","12 Aug 2026"],["LMP","10 Jan 2026"],["Gravida","G1 P0"],["ANC Contact","5 of 8"]].map(([k,v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 11, color: C.grey500, fontFamily: "'DM Sans', sans-serif" }}>{k}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: C.navy, fontFamily: "'DM Sans', sans-serif" }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Risk flag banner */}
        <div style={{ background: C.amberLight, border: `1px solid ${C.amber}`, borderRadius: 14, padding: "12px 14px", marginBottom: 12, display: "flex", gap: 10, alignItems: "flex-start" }}>
          <span style={{ fontSize: 18 }}>⚠️</span>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: C.amber, fontFamily: "'DM Sans', sans-serif" }}>You are being watched a little more closely</div>
            <div style={{ fontSize: 11, color: C.grey600, lineHeight: 1.5, fontFamily: "'DM Sans', sans-serif" }}>At your last visit, your health worker noticed mild swelling and slightly raised blood pressure. This is being monitored. Please do your daily check-in and report any headache or blurred vision straight away.</div>
          </div>
        </div>

        {/* Tab switcher */}
        <div style={{ display: "flex", gap: 6, background: C.grey100, borderRadius: 14, padding: 4, marginBottom: 14 }}>
          {[["visits","Visits"],["trends","Trends"],["care","Care"]].map(([id, label]) => (
            <button key={id} onClick={() => setTab(id)} style={{ flex: 1, padding: "9px 0", borderRadius: 10, border: "none", background: tab === id ? C.white : "transparent", color: tab === id ? C.coral : C.grey500, fontSize: 13, fontWeight: tab === id ? 700 : 500, fontFamily: "'DM Sans', sans-serif", cursor: "pointer", boxShadow: tab === id ? "0 2px 6px rgba(0,0,0,0.08)" : "none" }}>{label}</button>
          ))}
        </div>

        {/* VISITS TAB */}
        {tab === "visits" && (
          <div>
            <Label>ANC Visit Timeline · Tap to expand</Label>
            {visits.map((v) => {
              const open = openVisit === v.n;
              const watch = v.flag === "Watch";
              return (
                <Card key={v.n} onClick={() => setOpenVisit(open ? null : v.n)} style={{ marginBottom: 8, padding: 0, overflow: "hidden", border: open ? `1.5px solid ${watch ? C.amber : C.coralMid}` : `1px solid ${C.grey100}` }}>
                  <div style={{ padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                      <div style={{ width: 32, height: 32, borderRadius: 10, background: watch ? C.amberLight : C.greenLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800, color: watch ? C.amber : C.green, fontFamily: "'DM Sans', sans-serif" }}>{v.n}</div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: C.navy, fontFamily: "'DM Sans', sans-serif" }}>ANC Contact {v.n}</div>
                        <div style={{ fontSize: 11, color: C.grey400, fontFamily: "'DM Sans', sans-serif" }}>{v.date} · {v.ega}</div>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <Pill color={watch ? C.amber : C.green}>{v.flag === "Watch" ? "To monitor" : "Normal"}</Pill>
                      <div style={{ transform: open ? "rotate(90deg)" : "none", transition: "transform 0.2s" }}><Ic n="arrow" s={14} c={C.grey300} /></div>
                    </div>
                  </div>
                  {open && (
                    <div style={{ padding: "0 16px 16px", animation: "fadeUp 0.25s ease" }}>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12, paddingTop: 4 }}>
                        {[["Blood pressure", v.bp],["Weight", v.weight],["Fundal height", v.fundal],["Baby heartbeat", v.fhr],["Swelling", v.oedema],["Urine protein", v.urine]].map(([k, val]) => (
                          <div key={k} style={{ background: C.cream, borderRadius: 10, padding: "8px 10px" }}>
                            <div style={{ fontSize: 9, color: C.grey400, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5, fontFamily: "'DM Sans', sans-serif" }}>{k}</div>
                            <div style={{ fontSize: 13, fontWeight: 700, color: C.navy, fontFamily: "'DM Sans', sans-serif" }}>{val}</div>
                          </div>
                        ))}
                      </div>
                      <div style={{ fontSize: 10, color: C.grey400, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 6, fontFamily: "'DM Sans', sans-serif" }}>Treatments given</div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
                        {v.treatments.map(t => <span key={t} style={{ background: C.tealLight, color: C.tealDark, borderRadius: 8, padding: "4px 10px", fontSize: 11, fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>{t}</span>)}
                      </div>
                      <div style={{ background: watch ? C.amberLight : C.sageLight, borderRadius: 10, padding: "10px 12px" }}>
                        <div style={{ fontSize: 10, color: watch ? C.amber : C.sage, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 3, fontFamily: "'DM Sans', sans-serif" }}>Note from your health worker</div>
                        <div style={{ fontSize: 12, color: C.grey700, lineHeight: 1.5, fontFamily: "'DM Sans', sans-serif" }}>{v.note}</div>
                      </div>
                    </div>
                  )}
                </Card>
              );
            })}
            <div style={{ background: C.tealLight, border: `1px dashed ${C.tealMid}`, borderRadius: 14, padding: "12px 14px", marginTop: 4, display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 18 }}>📅</span>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: C.tealDark, fontFamily: "'DM Sans', sans-serif" }}>Next visit: ANC Contact 6</div>
                <div style={{ fontSize: 11, color: C.teal, fontFamily: "'DM Sans', sans-serif" }}>12 June 2026 · Surulere PHC</div>
              </div>
            </div>
          </div>
        )}

        {/* TRENDS TAB */}
        {tab === "trends" && (
          <div>
            <Label>Vital Trends Over Time</Label>
            <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
              {Object.keys(charts).map(k => (
                <button key={k} onClick={() => setTrend(k)} style={{ flex: 1, padding: "8px 0", borderRadius: 10, border: `1.5px solid ${trend === k ? C.coral : C.grey200}`, background: trend === k ? C.coralLight : C.white, color: trend === k ? C.coral : C.grey500, fontSize: 12, fontWeight: trend === k ? 700 : 500, fontFamily: "'DM Sans', sans-serif", cursor: "pointer" }}>{k}</button>
              ))}
            </div>
            <Card style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.navy, fontFamily: "'DM Sans', sans-serif" }}>{ch.label}</div>
                <span style={{ fontSize: 11, color: C.grey400, fontFamily: "'DM Sans', sans-serif" }}>{ch.unit}</span>
              </div>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 90 }}>
                {ch.data.map((val, i) => (
                  <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                    <div style={{ fontSize: 10, color: C.grey500, fontWeight: 700, fontFamily: "'DM Sans', sans-serif" }}>{val || "–"}</div>
                    <div style={{ width: "100%", height: val ? ((val - ch.lo) / ch.range) * 64 + 6 : 3, background: val > ch.warn ? C.amber : C.coral, borderRadius: "5px 5px 0 0", opacity: val ? 0.85 : 0.2, transition: "height 0.3s" }} />
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 8, justifyContent: "space-around", marginTop: 6, borderTop: `1px solid ${C.grey100}`, paddingTop: 6 }}>
                {["18 Feb","18 Mar","14 Apr","12 May","15 May"].map((m, i) => <span key={i} style={{ fontSize: 9, color: C.grey300, fontFamily: "'DM Sans', sans-serif" }}>{m}</span>)}
              </div>
              {trend === "BP" && (
                <div style={{ background: C.amberLight, borderRadius: 10, padding: "10px 12px", marginTop: 12, fontSize: 11, color: C.grey600, lineHeight: 1.5, fontFamily: "'DM Sans', sans-serif" }}>
                  Your blood pressure rose a little at your last visit. It's being watched. Keep doing your daily check-ins. 💛
                </div>
              )}
            </Card>
          </div>
        )}

        {/* CARE TAB */}
        {tab === "care" && (
          <div>
            <Label>Where You'll Deliver</Label>
            <Card onClick={() => nav("birth-plan")} style={{ marginBottom: 12, background: C.tealLight, border: `1px solid ${C.tealMid}`, display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ fontSize: 28 }}>🏥</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.tealDark, fontFamily: "'DM Sans', sans-serif" }}>Surulere PHC</div>
                <div style={{ fontSize: 11, color: C.teal, fontFamily: "'DM Sans', sans-serif" }}>Skilled birth attendants · View birth plan →</div>
              </div>
            </Card>

            <Label>Conditions & Risk Flags</Label>
            <Card style={{ marginBottom: 12 }}>
              {[
                ["Mild swelling & raised BP", "Being monitored since 15 May", C.amber],
                ["First pregnancy (G1 P0)", "Routine extra attention for first-time mothers", C.sage],
              ].map(([title, sub, col]) => (
                <div key={title} style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "8px 0", borderBottom: title.includes("First") ? "none" : `1px solid ${C.grey100}` }}>
                  <div style={{ width: 8, height: 8, borderRadius: 4, background: col, marginTop: 5, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: C.navy, fontFamily: "'DM Sans', sans-serif" }}>{title}</div>
                    <div style={{ fontSize: 11, color: C.grey400, fontFamily: "'DM Sans', sans-serif" }}>{sub}</div>
                  </div>
                </div>
              ))}
            </Card>

            <Label>Danger Signs You've Reported</Label>
            <Card style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: `1px solid ${C.grey100}` }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: C.navy, fontFamily: "'DM Sans', sans-serif" }}>Mild headache</div>
                  <div style={{ fontSize: 11, color: C.grey400, fontFamily: "'DM Sans', sans-serif" }}>20 May 2026 · Resolved — checked by PHC</div>
                </div>
                <Pill color={C.green}>Resolved</Pill>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, paddingTop: 10, color: C.grey400 }}>
                <Ic n="check" s={14} c={C.green} />
                <span style={{ fontSize: 12, fontFamily: "'DM Sans', sans-serif" }}>No active danger signs right now</span>
              </div>
            </Card>

            <Label>Referrals</Label>
            <Card style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, color: C.grey400 }}>
                <span style={{ fontSize: 16 }}>📄</span>
                <span style={{ fontSize: 12, fontFamily: "'DM Sans', sans-serif" }}>No referrals yet. If you're ever referred, it will show here with its status.</span>
              </div>
            </Card>

            <Label>My Mama Bag</Label>
            <Card style={{ marginBottom: 12, display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ fontSize: 26 }}>👜</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.navy, fontFamily: "'DM Sans', sans-serif" }}>Mama Bag received ✓</div>
                <div style={{ fontSize: 11, color: C.grey400, fontFamily: "'DM Sans', sans-serif" }}>Given 18 Feb 2026 · Clean delivery & newborn supplies</div>
              </div>
            </Card>
          </div>
        )}
      </Pad>
      <BottomNav active="my-record" nav={nav} phase={phase} />
    </div>
  );
};

// ── SCREEN 8: DAILY SYMPTOM CHECK-IN ───────────────────────────────────────
const SymptomCheckinScreen = ({ nav }) => {
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [done, setDone] = useState(false);
  const qs = [
    { q:"Do you have a headache?", opts:["No headache 😊","Mild headache 😐","Severe headache 😣"], icon:"🤕" },
    { q:"Any swelling in your face or hands?", opts:["No swelling 😊","A little swelling 😐","A lot of swelling 😟"], icon:"🖐️" },
    { q:"Any bleeding?", opts:["No bleeding 😊","Small amount 😐","Heavy bleeding 🚨"], icon:"🩸" },
    { q:"Has your baby been moving?", opts:["Moving normally 😊","Less than usual 😐","I can't feel my baby 😰"], icon:"🤰🏾" },
    { q:"Do you have a fever?", opts:["No fever 😊","Feeling warm 😐","High fever 🤒"], icon:"🌡️" },
  ];
  const answer = (opt) => {
    const newAns = { ...answers, [qIndex]: opt };
    setAnswers(newAns);
    if (qIndex < qs.length - 1) setTimeout(() => setQIndex(qIndex + 1), 300);
    else setTimeout(() => setDone(true), 400);
  };
  if (done) return (
    <div style={{ minHeight: 800, background: C.cream, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 32, textAlign: "center" }}>
      <div style={{ fontSize: 64, marginBottom: 20, animation: "float 2s ease-in-out infinite" }}>🌸</div>
      <div style={{ fontFamily: "'Fraunces', serif", fontSize: 26, fontWeight: 700, color: C.navy, marginBottom: 12 }}>All done, Adunni!</div>
      <div style={{ fontSize: 14, color: C.grey600, lineHeight: 1.6, marginBottom: 28, fontFamily: "'DM Sans', sans-serif" }}>Your check-in is complete. Your care team has been informed you are well today. 💚</div>
      <div style={{ background: C.greenLight, border: `1.5px solid ${C.green}`, borderRadius: 20, padding: "16px 20px", marginBottom: 28, width: "100%" }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: C.green, fontFamily: "'DM Sans', sans-serif" }}>✓ No concerns flagged today</div>
        <div style={{ fontSize: 12, color: C.grey500, marginTop: 4, fontFamily: "'DM Sans', sans-serif" }}>Keep up the daily check-ins — you're doing great!</div>
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {[1,2,3,4,5,6,7].map(i => <div key={i} style={{ width: 10, height: 10, borderRadius: 5, background: i <= 5 ? C.coral : C.grey200 }} />)}
      </div>
      <div style={{ fontSize: 12, color: C.grey400, marginBottom: 28, fontFamily: "'DM Sans', sans-serif" }}>5-day streak! 🔥</div>
      <Btn onClick={() => nav("home")} full>Back to Home</Btn>
    </div>
  );
  const q = qs[qIndex];
  return (
    <div style={{ minHeight: 800, background: C.cream }}>
      <WarmHeader title="Daily Check-In" subtitle={`Question ${qIndex + 1} of ${qs.length}`} onBack={() => nav("home")} />
      <div style={{ padding: "0 20px", marginTop: 8 }}>
        <div style={{ display: "flex", gap: 6 }}>
          {qs.map((_, i) => <div key={i} style={{ flex: 1, height: 4, borderRadius: 2, background: i <= qIndex ? C.coral : C.grey200, transition: "background 0.3s" }} />)}
        </div>
      </div>
      <Pad style={{ paddingTop: 32 }}>
        <div style={{ textAlign: "center", marginBottom: 32, animation: "fadeUp 0.35s ease" }}>
          <div style={{ fontSize: 52, marginBottom: 16 }}>{q.icon}</div>
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 600, color: C.navy, lineHeight: 1.4, marginBottom: 8 }}>{q.q}</div>
          <button style={{ background: C.tealLight, border: "none", borderRadius: 20, padding: "6px 14px", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 14 }}>🔊</span><span style={{ fontSize: 12, color: C.teal, fontFamily: "'DM Sans', sans-serif" }}>Listen in Yoruba</span>
          </button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {q.opts.map((opt, i) => (
            <button key={i} onClick={() => answer(opt)} style={{ padding: "18px 20px", background: answers[qIndex] === opt ? C.coralLight : C.white, border: `1.5px solid ${answers[qIndex] === opt ? C.coral : C.grey200}`, borderRadius: 18, fontSize: 15, fontWeight: 500, color: C.grey800, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", textAlign: "left", display: "flex", alignItems: "center", gap: 14, transition: "all 0.2s" }}>
              <div style={{ width: 20, height: 20, borderRadius: 10, border: `2px solid ${answers[qIndex] === opt ? C.coral : C.grey300}`, background: answers[qIndex] === opt ? C.coral : C.white, flexShrink: 0 }} />
              {opt}
            </button>
          ))}
        </div>
      </Pad>
    </div>
  );
};

// ── SCREEN 9: SYMPTOM REPORT (EMERGENCY) ───────────────────────────────────
const SymptomReportScreen = ({ nav }) => {
  const [selected, setSelected] = useState([]);
  const [result, setResult] = useState(null);
  const signs = ["Severe headache or blurred vision","Heavy vaginal bleeding","Severe swelling (face, hands)","Convulsions or fitting","Baby not moving","High fever","Difficulty breathing","Severe stomach pain"];
  const toggle = s => setSelected(p => p.includes(s) ? p.filter(x => x !== s) : [...p, s]);
  const isCritical = selected.some(s => ["Convulsions or fitting","Baby not moving","Heavy vaginal bleeding"].includes(s));
  const isHigh = !isCritical && selected.length >= 2;
  if (result === "red") return (
    <div style={{ minHeight: 800, background: C.red, display: "flex", flexDirection: "column", padding: 28 }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
        <div style={{ fontSize: 56, marginBottom: 20, animation: "pulse 1s infinite" }}>🚨</div>
        <div style={{ fontFamily: "'Fraunces', serif", fontSize: 28, fontWeight: 700, color: C.white, marginBottom: 12, lineHeight: 1.2 }}>GO TO THE FACILITY NOW</div>
        <div style={{ fontSize: 14, color: "rgba(255,255,255,0.9)", lineHeight: 1.6, marginBottom: 24, fontFamily: "'DM Sans', sans-serif" }}>
          Gbe e lo si ile-iwosan ni bayi<br/>
          <span style={{ fontSize: 12, opacity: 0.8 }}>(Carry am go hospital now now)</span>
        </div>
        <Card style={{ width: "100%", marginBottom: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.navy, marginBottom: 4, fontFamily: "'DM Sans', sans-serif" }}>Nearest Facility</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: C.navy, fontFamily: "'DM Sans', sans-serif" }}>Gbagada General Hospital</div>
          <div style={{ fontSize: 12, color: C.grey500, marginBottom: 12, fontFamily: "'DM Sans', sans-serif" }}>2.4 km away</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <Btn variant="coral" full icon="phone">Call Facility Now</Btn>
            <Btn variant="navy" full icon="map">Get Directions</Btn>
          </div>
        </Card>
        <div style={{ background: "rgba(255,255,255,0.2)", borderRadius: 14, padding: "12px 16px", marginBottom: 16, width: "100%" }}>
          <div style={{ fontSize: 12, color: C.white, fontFamily: "'DM Sans', sans-serif', lineHeight: 1.5" }}>
            ✅ <b>Surulere PHC</b> has been alerted you may be coming<br/>
            ✅ <b>CHEW Folake Bello</b> (skilled health worker) has been notified<br/>
            ✅ <b>Mama Adunola</b> (your community link) has been notified to help you get there
          </div>
        </div>
        <Btn variant="outline" full onClick={() => nav("home")}>Return to Home</Btn>
      </div>
    </div>
  );
  if (result === "amber") return (
    <div style={{ minHeight: 800, background: C.cream, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 28, textAlign: "center" }}>
      <div style={{ fontSize: 52, marginBottom: 20 }}>⚠️</div>
      <div style={{ fontFamily: "'Fraunces', serif", fontSize: 24, fontWeight: 700, color: C.navy, marginBottom: 12 }}>Get checked today</div>
      <div style={{ fontSize: 14, color: C.grey600, lineHeight: 1.6, marginBottom: 24, fontFamily: "'DM Sans', sans-serif" }}>These symptoms may need attention. Please visit your facility or call your community link today to be checked by a skilled health worker.</div>
      <Card style={{ width: "100%", marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ fontSize: 28 }}>🏥</div>
          <div style={{ flex: 1, textAlign: "left" }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: C.navy, fontFamily: "'DM Sans', sans-serif" }}>Surulere PHC</div>
            <div style={{ fontSize: 12, color: C.grey500, fontFamily: "'DM Sans', sans-serif" }}>Skilled attendants · 2.4 km</div>
          </div>
          <Btn variant="teal" small icon="phone">Call</Btn>
        </div>
      </Card>
      <Card style={{ width: "100%", marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ fontSize: 28 }}>👩🏾</div>
          <div style={{ flex: 1, textAlign: "left" }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: C.navy, fontFamily: "'DM Sans', sans-serif" }}>Mama Adunola Fatai</div>
            <div style={{ fontSize: 12, color: C.grey500, fontFamily: "'DM Sans', sans-serif" }}>Community link · can help you get there</div>
          </div>
          <Btn variant="outline" small icon="phone">Call</Btn>
        </div>
      </Card>
      <Btn full onClick={() => nav("home")}>Back to Home</Btn>
    </div>
  );
  return (
    <div style={{ background: C.cream }}>
      <WarmHeader title="Report a Symptom" subtitle="Select all that apply" onBack={() => nav("home")} />
      <Pad>
        <div style={{ background: C.amberLight, border: `1px solid ${C.amber}`, borderRadius: 14, padding: "12px 14px", marginBottom: 16, fontSize: 13, color: C.grey700, fontFamily: "'DM Sans', sans-serif' " }}>
          🔊 Tap any symptom to hear it in your language
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {signs.map(s => {
            const checked = selected.includes(s);
            return (
              <button key={s} onClick={() => toggle(s)} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", background: checked ? C.redLight : C.white, border: `1.5px solid ${checked ? C.red : C.grey200}`, borderRadius: 16, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", textAlign: "left", transition: "all 0.2s" }}>
                <div style={{ width: 22, height: 22, borderRadius: 7, border: `2px solid ${checked ? C.red : C.grey300}`, background: checked ? C.red : C.white, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {checked && <Ic n="check" s={12} c={C.white} />}
                </div>
                <span style={{ fontSize: 14, color: checked ? C.red : C.grey700, fontWeight: checked ? 600 : 400 }}>{s}</span>
              </button>
            );
          })}
        </div>
        {selected.length > 0 && (
          <div style={{ marginTop: 20 }}>
            <Btn onClick={() => setResult(isCritical || isHigh ? "red" : "amber")} variant={isCritical || isHigh ? "red" : "coral"} full>
              {isCritical || isHigh ? "🚨 This looks urgent — Continue" : "Submit my symptoms"}
            </Btn>
          </div>
        )}
      </Pad>
    </div>
  );
};

// ── SCREEN 10: KICK COUNTER ──────────────────────────────────────────────────
const KickCounterScreen = ({ nav }) => {
  const [count, setCount] = useState(0);
  const [running, setRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef(null);
  useEffect(() => {
    if (running) timerRef.current = setInterval(() => setSeconds(s => s + 1), 1000);
    else clearInterval(timerRef.current);
    return () => clearInterval(timerRef.current);
  }, [running]);
  const fmt = s => `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;
  return (
    <div style={{ minHeight: 800, background: C.cream }}>
      <WarmHeader title="Kick Counter" subtitle="Count baby's movements" onBack={() => nav("home")} light />
      <Pad style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 32 }}>
        <div style={{ fontSize: 14, color: C.grey500, marginBottom: 8, fontFamily: "'DM Sans', sans-serif" }}>Count 10 kicks within 2 hours</div>
        <div style={{ fontSize: 12, color: C.coral, fontWeight: 600, marginBottom: 32, fontFamily: "'DM Sans', sans-serif" }}>{running ? fmt(seconds) : "Timer ready"}</div>
        <button onClick={() => { if (!running) { setRunning(true); } setCount(c => Math.min(c + 1, 10)); }} style={{ width: 180, height: 180, borderRadius: "50%", background: `radial-gradient(circle at 35% 35%, ${C.coralLight}, ${C.coralMid})`, border: `4px solid ${C.coral}`, cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", boxShadow: `0 12px 40px ${C.coral}35`, transition: "transform 0.1s", fontFamily: "'DM Sans', sans-serif" }}
          onMouseDown={e => e.currentTarget.style.transform = "scale(0.95)"}
          onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
        >
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: 56, fontWeight: 700, color: C.coral, lineHeight: 1 }}>{count}</div>
          <div style={{ fontSize: 13, color: C.coral, fontWeight: 600 }}>kicks</div>
          <div style={{ fontSize: 11, color: C.grey400, marginTop: 4 }}>Tap to count</div>
        </button>
        <div style={{ display: "flex", gap: 8, marginTop: 24, flexWrap: "wrap", justifyContent: "center" }}>
          {Array.from({length:10}).map((_,i) => (
            <div key={i} style={{ width: 28, height: 28, borderRadius: 14, background: i < count ? C.coral : C.grey100, border: `2px solid ${i < count ? C.coralDark : C.grey200}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              {i < count && <span style={{ fontSize: 12 }}>🦶</span>}
            </div>
          ))}
        </div>
        {count === 10 && (
          <div style={{ background: C.greenLight, border: `1.5px solid ${C.green}`, borderRadius: 16, padding: "14px 18px", textAlign: "center", marginTop: 24, animation: "fadeUp 0.4s ease" }}>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 18, color: C.green, fontWeight: 600 }}>10 kicks reached! 🎉</div>
            <div style={{ fontSize: 12, color: C.grey500, marginTop: 4, fontFamily: "'DM Sans', sans-serif" }}>Great! Your baby is active and healthy.</div>
          </div>
        )}
        <div style={{ display: "flex", gap: 10, marginTop: 20, width: "100%" }}>
          <Btn onClick={() => { setCount(0); setRunning(false); setSeconds(0); }} variant="ghost" full small>Reset</Btn>
          {running && <Btn onClick={() => setRunning(false)} variant="coral" full small>Pause</Btn>}
        </div>
      </Pad>
    </div>
  );
};

// ── SCREEN 11: MOOD TRACKER ──────────────────────────────────────────────────
const MoodScreen = ({ nav }) => {
  const [mood, setMood] = useState(null);
  const moods = [["😊","Great"],["🙂","Good"],["😐","Okay"],["😔","Low"],["😢","Struggling"]];
  return (
    <div style={{ minHeight: 800, background: C.cream }}>
      <WarmHeader title="How are you feeling?" onBack={() => nav("home")} light />
      <Pad style={{ textAlign: "center" }}>
        <div style={{ fontFamily: "'Fraunces', serif", fontSize: 18, color: C.navy, marginBottom: 8 }}>Today, {new Date().toLocaleDateString("en-GB",{weekday:"long",day:"numeric",month:"long"})}</div>
        <div style={{ fontSize: 13, color: C.grey500, marginBottom: 32, fontFamily: "'DM Sans', sans-serif" }}>Your emotional wellbeing matters as much as your physical health</div>
        <div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 32 }}>
          {moods.map(([emoji, label]) => (
            <button key={label} onClick={() => setMood(label)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, background: mood === label ? C.coralLight : C.white, border: `1.5px solid ${mood === label ? C.coral : C.grey200}`, borderRadius: 16, padding: "14px 10px", cursor: "pointer", transform: mood === label ? "scale(1.1)" : "scale(1)", transition: "all 0.2s", minWidth: 52 }}>
              <span style={{ fontSize: 28 }}>{emoji}</span>
              <span style={{ fontSize: 10, color: mood === label ? C.coral : C.grey400, fontFamily: "'DM Sans', sans-serif", fontWeight: mood === label ? 700 : 400 }}>{label}</span>
            </button>
          ))}
        </div>
        {mood && (
          <div style={{ animation: "fadeUp 0.35s ease" }}>
            <div style={{ background: C.white, borderRadius: 16, padding: 16, marginBottom: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.navy, marginBottom: 8, fontFamily: "'DM Sans', sans-serif" }}>Add a note (optional)</div>
              <textarea placeholder="How are you feeling today? Any worries you want to remember?" style={{ width: "100%", background: C.cream, border: `1.5px solid ${C.grey200}`, borderRadius: 12, padding: 12, fontSize: 13, fontFamily: "'DM Sans', sans-serif", color: C.grey800, resize: "none", outline: "none", height: 80 }} />
            </div>
            {(mood === "Low" || mood === "Struggling") && (
              <div style={{ background: C.lavLight, border: `1px solid ${C.lavender}`, borderRadius: 14, padding: "12px 14px", marginBottom: 16, fontSize: 13, color: C.lavender, fontFamily: "'DM Sans', sans-serif", lineHeight: 1.5 }}>
                💜 It's okay to feel this way. Consider mentioning how you're feeling to Mama Adunola at your next visit. Emotional wellbeing is just as important as physical health during pregnancy.
              </div>
            )}
            <Btn onClick={() => nav("home")} full>Save Today's Mood</Btn>
          </div>
        )}
      </Pad>
    </div>
  );
};

// ── SCREEN: BIRTH PLAN ───────────────────────────────────────────────────────
const BirthPlanScreen = ({ nav }) => {
  const [transport, setTransport] = useState("Keke / tricycle");
  const [companion, setCompanion] = useState("My husband");
  return (
    <div style={{ minHeight: 800, background: C.cream }}>
      <WarmHeader title="My Birth Plan" subtitle="Planning a safe facility delivery" onBack={() => nav("home")} />
      <Pad>
        <div style={{ background: `linear-gradient(135deg, ${C.tealLight}, ${C.sageLight})`, border: `1px solid ${C.tealMid}`, borderRadius: 18, padding: "16px", marginBottom: 16 }}>
          <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
            <div style={{ fontSize: 26 }}>💙</div>
            <div>
              <div style={{ fontFamily: "'Fraunces', serif", fontSize: 16, fontWeight: 600, color: C.tealDark, marginBottom: 4 }}>Why deliver at a facility?</div>
              <div style={{ fontSize: 12, color: C.grey600, lineHeight: 1.6, fontFamily: "'DM Sans', sans-serif" }}>Skilled birth attendants — nurses, midwives, and doctors — are trained to handle emergencies that can happen suddenly during birth. Planning ahead means you and your baby are safest when the day comes.</div>
            </div>
          </div>
        </div>

        <Label>Your Delivery Facility</Label>
        <Card style={{ marginBottom: 8, border: `1.5px solid ${C.teal}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div style={{ display: "flex", gap: 12 }}>
              <div style={{ fontSize: 28 }}>🏥</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: C.navy, fontFamily: "'DM Sans', sans-serif" }}>Surulere PHC</div>
                <div style={{ fontSize: 12, color: C.grey500, fontFamily: "'DM Sans', sans-serif" }}>23 Adeniran Ogunsanya St · 2.4 km</div>
                <div style={{ fontSize: 11, color: C.teal, marginTop: 4, fontFamily: "'DM Sans', sans-serif" }}>✓ Skilled birth attendants on duty 24/7</div>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            <Btn variant="teal" small icon="phone" full>Call Facility</Btn>
            <Btn variant="outline" small icon="map" full>Directions</Btn>
          </div>
        </Card>
        <button style={{ background: "none", border: "none", color: C.coral, fontSize: 12, fontWeight: 600, fontFamily: "'DM Sans', sans-serif", cursor: "pointer", marginBottom: 8 }}>Choose a different facility →</button>

        <Label>How will you get there?</Label>
        <RadioRow options={["My own car","Keke / tricycle","Okada","Facility ambulance","Taxi / bus"]} value={transport} onChange={setTransport} />

        <Label>Who will go with you?</Label>
        <RadioRow options={["My husband","My mother","A sister / friend","My community link"]} value={companion} onChange={setCompanion} />

        <Label>Emergency Contacts (saved & ready)</Label>
        {[["Surulere PHC","+234 801 234 5678","🏥"],["Mama Adunola (community link)","+234 803 456 7890","👩🏾"],["Emergency transport","+234 700 000 1111","🚗"]].map(([name, phone, icon]) => (
          <Card key={name} style={{ marginBottom: 8, padding: "12px 14px", display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ fontSize: 22 }}>{icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.navy, fontFamily: "'DM Sans', sans-serif" }}>{name}</div>
              <div style={{ fontSize: 12, color: C.grey400, fontFamily: "'DM Sans', sans-serif" }}>{phone}</div>
            </div>
            <button style={{ background: C.tealLight, border: "none", borderRadius: 10, width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <Ic n="phone" s={15} c={C.teal} />
            </button>
          </Card>
        ))}

        <Label>What to Pack — Birth Bag Checklist</Label>
        <Card style={{ marginBottom: 16 }}>
          {["Your AHF Mama card / phone","Wrapper and baby clothes","Sanitary pads","Soap, towel, toiletries","Baby blanket","Snacks and water","Any money saved for delivery"].map((item, i) => (
            <div key={item} style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 0", borderBottom: i < 6 ? `1px solid ${C.grey100}` : "none" }}>
              <div style={{ width: 20, height: 20, borderRadius: 6, border: `2px solid ${i < 3 ? C.green : C.grey300}`, background: i < 3 ? C.green : C.white, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {i < 3 && <Ic n="check" s={11} c={C.white} />}
              </div>
              <span style={{ fontSize: 13, color: C.grey700, fontFamily: "'DM Sans', sans-serif", textDecoration: i < 3 ? "line-through" : "none", opacity: i < 3 ? 0.6 : 1 }}>{item}</span>
            </div>
          ))}
        </Card>

        <div style={{ background: C.amberLight, border: `1px solid ${C.amber}`, borderRadius: 14, padding: "14px", marginBottom: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.amber, marginBottom: 4, fontFamily: "'DM Sans', sans-serif" }}>📋 Know the signs of labour</div>
          <div style={{ fontSize: 12, color: C.grey600, lineHeight: 1.6, fontFamily: "'DM Sans', sans-serif" }}>Regular painful contractions, your water breaking, or a "show" (mucus plug). When labour starts, head to your facility — don't wait. <span style={{ color: C.coral, fontWeight: 600 }}>Read the full guide →</span></div>
        </div>

        <Btn onClick={() => nav("home")} full variant="teal">Save My Birth Plan</Btn>
      </Pad>
      <BottomNav active="home" nav={nav} phase="pregnancy" />
    </div>
  );
};

// ── SCREEN 12: LEARN ─────────────────────────────────────────────────────────
const LearnScreen = ({ nav, phase }) => (
  <div style={{ background: C.cream }}>
    <WarmHeader title="Learn" subtitle="Your pregnancy guide" />
    <Pad>
      <Card style={{ background: `linear-gradient(135deg, ${C.navy}, ${C.navyLight})`, marginBottom: 16 }}>
        <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
          <div style={{ fontSize: 36 }}>🥦</div>
          <div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", fontFamily: "'DM Sans', sans-serif", textTransform: "uppercase", letterSpacing: 1 }}>This week</div>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 18, fontWeight: 600, color: C.white, lineHeight: 1.3 }}>Week 28: Your baby's eyes are opening</div>
            <button style={{ background: C.coral, border: "none", borderRadius: 10, padding: "6px 14px", marginTop: 8, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 12, color: C.white }}>Read Now →</button>
          </div>
        </div>
      </Card>
      <Label>Danger Signs — Know Your Body</Label>
      <div style={{ background: C.redLight, border: `1px solid ${C.coralMid}`, borderRadius: 16, padding: "14px 16px", marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: C.red, fontFamily: "'DM Sans', sans-serif" }}>⚠️ Signs to watch for</div>
          <Ic n="arrow" s={16} c={C.red} />
        </div>
        {["Severe headache or blurred vision","Heavy vaginal bleeding","Facial or hand swelling","No baby movement"].map(s => (
          <div key={s} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0", borderTop: `1px solid ${C.coralMid}` }}>
            <div style={{ width: 6, height: 6, borderRadius: 3, background: C.red, flexShrink: 0 }} />
            <span style={{ fontSize: 13, color: C.grey700, fontFamily: "'DM Sans', sans-serif" }}>{s}</span>
            <button style={{ background: "none", border: "none", cursor: "pointer", marginLeft: "auto" }}><Ic n="bell" s={14} c={C.grey400} /></button>
          </div>
        ))}
      </div>
      <Label>Planning Your Delivery</Label>
      <Card style={{ marginBottom: 16, background: `linear-gradient(135deg, ${C.tealLight}, ${C.sageLight})`, border: `1px solid ${C.tealMid}` }}>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <div style={{ fontSize: 32 }}>🏥</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: C.tealDark, fontFamily: "'DM Sans', sans-serif" }}>Why a skilled birth keeps you safe</div>
            <div style={{ fontSize: 11, color: C.grey600, fontFamily: "'DM Sans', sans-serif" }}>The most important read of your third trimester</div>
          </div>
          <button onClick={() => nav("birth-plan")} style={{ background: C.teal, border: "none", borderRadius: 10, padding: "8px 12px", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 12, color: C.white }}>Read</button>
        </div>
      </Card>
      <Label>Pregnancy Guides</Label>
      {[
        { icon:"🥗", title:"Eating well in the third trimester", sub:"Iron, folic acid, protein", time:"5 min read" },
        { icon:"🏥", title:"Preparing for a facility birth", sub:"Your birth plan, transport, what to pack", time:"8 min read" },
        { icon:"🩺", title:"Signs of labour — when to go", sub:"Don't wait — head to your facility", time:"4 min read" },
        { icon:"🤱🏾", title:"Breastfeeding basics", sub:"Start thinking about it now", time:"6 min read" },
      ].map(({ icon, title, sub, time }) => (
        <Card key={title} style={{ marginBottom: 10, display: "flex", gap: 12, alignItems: "center", padding: "12px 14px" }}>
          <div style={{ width: 44, height: 44, borderRadius: 14, background: C.peach, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>{icon}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.navy, fontFamily: "'DM Sans', sans-serif" }}>{title}</div>
            <div style={{ fontSize: 11, color: C.grey400, fontFamily: "'DM Sans', sans-serif" }}>{sub} · {time}</div>
          </div>
          <Ic n="arrow" s={16} c={C.grey300} />
        </Card>
      ))}
    </Pad>
    <BottomNav active="learn" nav={nav} phase={phase} />
  </div>
);

// ── SCREEN 13: DELIVERY CELEBRATION ──────────────────────────────────────────
const DeliveryCelebScreen = ({ nav }) => {
  const [named, setNamed] = useState(false);
  const [name, setName] = useState("");
  return (
    <div style={{ minHeight: 800, background: `linear-gradient(160deg, ${C.coral} 0%, ${C.lavender} 100%)`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 28, textAlign: "center", position: "relative", overflow: "hidden" }}>
      {["🌸","⭐","💫","🌺","✨","🎀","💕"].map((e, i) => (
        <div key={i} style={{ position: "absolute", top: `${10 + i*12}%`, left: `${5 + i*13}%`, fontSize: 20, animation: `confetti ${2 + i*0.3}s ease-out ${i*0.2}s forwards`, opacity: 0 }}>{e}</div>
      ))}
      <div style={{ fontSize: 72, marginBottom: 24, animation: "float 2s ease-in-out infinite" }}>👶🏾</div>
      <div style={{ fontFamily: "'Fraunces', serif", fontSize: 32, fontWeight: 700, color: C.white, marginBottom: 12, lineHeight: 1.2 }}>
        Welcome to the world!
      </div>
      <div style={{ fontSize: 15, color: "rgba(255,255,255,0.85)", lineHeight: 1.6, marginBottom: 32, fontFamily: "'DM Sans', sans-serif" }}>
        Your delivery was recorded on <b>30 May 2026</b> at <b>Surulere PHC</b>.<br/>Congratulations, Adunni! 💕
      </div>
      {!named ? (
        <Card style={{ width: "100%", marginBottom: 20 }}>
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: 18, color: C.navy, marginBottom: 16 }}>What is your baby's name?</div>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Enter baby's name" style={{ width: "100%", background: C.cream, border: `1.5px solid ${C.grey200}`, borderRadius: 14, padding: "13px 14px", fontSize: 16, fontFamily: "'Fraunces', serif", color: C.navy, outline: "none", marginBottom: 12, textAlign: "center" }} />
          <div style={{ fontSize: 12, color: C.grey400, marginBottom: 16, fontFamily: "'DM Sans', sans-serif" }}>You can add a name later in My Baby</div>
          <Btn onClick={() => setNamed(true)} full variant="teal">{name ? `Continue with "${name}"` : "Name later →"}</Btn>
        </Card>
      ) : (
        <div style={{ animation: "fadeUp 0.4s ease", width: "100%" }}>
          {name && <div style={{ fontFamily: "'Fraunces', serif", fontSize: 22, color: C.white, marginBottom: 20 }}>Hello, {name}! 🌟</div>}
          <Btn onClick={() => nav("home-postnatal")} full variant="teal">Go to My New Home Screen →</Btn>
        </div>
      )}
    </div>
  );
};

// ── SCREEN 14: HOME (POSTNATAL) ──────────────────────────────────────────────
const HomePostnatalScreen = ({ nav }) => (
  <div style={{ background: C.cream }}>
    <div style={{ background: `linear-gradient(160deg, ${C.teal} 0%, ${C.tealDark} 100%)`, padding: "20px 20px 36px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", fontFamily: "'DM Sans', sans-serif" }}>Welcome home,</div>
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: 24, fontWeight: 700, color: C.white }}>Adunni & Daniel 🌿</div>
        </div>
        <div style={{ fontSize: 28 }}>🤱🏾</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: 16, padding: "12px 14px" }}>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.7)", textTransform: "uppercase", letterSpacing: 0.8, fontFamily: "'DM Sans', sans-serif" }}>Baby Daniel</div>
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 700, color: C.white }}>Day 4</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", fontFamily: "'DM Sans', sans-serif" }}>Born 26 May 2026</div>
        </div>
        <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: 16, padding: "12px 14px" }}>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.7)", textTransform: "uppercase", letterSpacing: 0.8, fontFamily: "'DM Sans', sans-serif" }}>Recovery</div>
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 700, color: C.white }}>Week 1</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", fontFamily: "'DM Sans', sans-serif" }}>Postnatal care</div>
        </div>
      </div>
    </div>
    <div style={{ margin: "-16px 16px 0", position: "relative", zIndex: 2 }}>
      <Card style={{ marginBottom: 0 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: C.red, marginBottom: 8, fontFamily: "'DM Sans', sans-serif" }}>⚠️ Postnatal Danger Signs to Watch For</div>
        {["Heavy bleeding (soaking >1 pad/hour)","Fever above 38°C","Severe pain or swelling"].map(s => (
          <div key={s} style={{ fontSize: 12, color: C.grey600, padding: "3px 0", fontFamily: "'DM Sans', sans-serif' " }}>• {s}</div>
        ))}
        <Btn onClick={() => nav("symptom-report")} variant="outline" full small style={{ marginTop: 10 }}>Report a Symptom</Btn>
      </Card>
    </div>
    <Pad style={{ paddingTop: 20 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
        {[
          { icon:"💉", label:"Next Vaccine", sub:"Daniel: BCG due", screen:"baby-imms", color: C.teal },
          { icon:"📊", label:"Growth Chart", sub:"Last weighed: 3.2kg", screen:"baby-growth", color: C.sage },
          { icon:"🤱🏾", label:"Breastfeeding", sub:"Feeding guide", screen:"learn", color: C.coral },
          { icon:"💜", label:"How I'm Feeling", sub:"Postnatal mood check", screen:"mood", color: C.lavender },
        ].map(({ icon, label, sub, screen, color }) => (
          <button key={label} onClick={() => nav(screen)} style={{ background: C.white, borderRadius: 18, padding: "14px 12px", border: "none", cursor: "pointer", textAlign: "left", boxShadow: "0 2px 12px rgba(58,35,20,0.06)", fontFamily: "'DM Sans', sans-serif" }}>
            <div style={{ width: 36, height: 36, borderRadius: 12, background: color + "18", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, marginBottom: 8 }}>{icon}</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.navy }}>{label}</div>
            <div style={{ fontSize: 11, color: C.grey400, marginTop: 2 }}>{sub}</div>
          </button>
        ))}
      </div>
    </Pad>
    <BottomNav active="home" nav={nav} phase="postnatal" />
  </div>
);

// ── SCREEN 15: BABY — IMMUNISATION ───────────────────────────────────────────
const BabyImmsScreen = ({ nav }) => {
  const imms = [
    { age:"At Birth",     vaccines:["BCG","OPV 0","Hep B"],    status:"complete", date:"26 May 2026" },
    { age:"6 Weeks",      vaccines:["Penta 1","OPV 1","PCV 1","Rota 1"], status:"due", date:"7 Jul 2026" },
    { age:"10 Weeks",     vaccines:["Penta 2","OPV 2","PCV 2","Rota 2"], status:"upcoming", date:"4 Aug 2026" },
    { age:"14 Weeks",     vaccines:["Penta 3","OPV 3","PCV 3","IPV"], status:"upcoming", date:"1 Sep 2026" },
    { age:"6 Months",     vaccines:["Vit A","Measles (early)"], status:"upcoming", date:"26 Nov 2026" },
    { age:"9 Months",     vaccines:["Yellow Fever","Measles 1","Meningitis A"], status:"upcoming", date:"26 Feb 2027" },
  ];
  return (
    <div style={{ background: C.cream }}>
      <WarmHeader title="Daniel's Vaccines" subtitle="Nigerian Routine Immunisation Schedule" onBack={() => nav("home-postnatal")} />
      <Pad>
        <Card style={{ background: C.tealLight, border: `1px solid ${C.tealMid}`, marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontFamily: "'Fraunces', serif", fontSize: 18, color: C.tealDark }}>Next Vaccine Due</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.navy, marginTop: 4, fontFamily: "'DM Sans', sans-serif" }}>Pentavalent 1, OPV 1, PCV 1, Rotavirus 1</div>
              <div style={{ fontSize: 12, color: C.grey500, fontFamily: "'DM Sans', sans-serif' " }}>7 July 2026 · 38 days away</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <Ring pct={17} color={C.teal} size={56} stroke={5} />
              <div style={{ fontSize: 9, color: C.grey400, marginTop: 4, fontFamily: "'DM Sans', sans-serif" }}>of schedule done</div>
            </div>
          </div>
        </Card>
        {imms.map((item, i) => (
          <div key={i} style={{ display: "flex", gap: 14, marginBottom: 12 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
              <div style={{ width: 32, height: 32, borderRadius: 16, background: item.status === "complete" ? C.green : item.status === "due" ? C.amber : C.grey100, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {item.status === "complete" ? <Ic n="check" s={16} c={C.white} /> : item.status === "due" ? <span style={{ fontSize: 14 }}>⏰</span> : <span style={{ fontSize: 12, fontWeight: 700, color: C.grey400, fontFamily: "'DM Sans', sans-serif" }}>{i+1}</span>}
              </div>
              {i < imms.length - 1 && <div style={{ width: 2, height: 24, background: item.status === "complete" ? C.green : C.grey200, marginTop: 4 }} />}
            </div>
            <div style={{ flex: 1, background: item.status === "complete" ? C.greenLight : item.status === "due" ? C.amberLight : C.white, borderRadius: 14, padding: "12px 14px", border: `1px solid ${item.status === "complete" ? C.green + "40" : item.status === "due" ? C.amber + "60" : C.grey200}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.navy, fontFamily: "'DM Sans', sans-serif" }}>{item.age}</div>
                <Pill color={item.status === "complete" ? C.green : item.status === "due" ? C.amber : C.grey400}>
                  {item.status === "complete" ? "Done ✓" : item.status === "due" ? "Due Soon" : "Upcoming"}
                </Pill>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                {item.vaccines.map(v => <span key={v} style={{ background: "rgba(0,0,0,0.05)", borderRadius: 6, padding: "2px 8px", fontSize: 11, color: C.grey600, fontFamily: "'DM Sans', sans-serif" }}>{v}</span>)}
              </div>
              <div style={{ fontSize: 11, color: C.grey400, marginTop: 6, fontFamily: "'DM Sans', sans-serif" }}>{item.date}</div>
            </div>
          </div>
        ))}
      </Pad>
      <BottomNav active="baby" nav={nav} phase="postnatal" />
    </div>
  );
};

// ── SCREEN 16: BABY GROWTH ───────────────────────────────────────────────────
const BabyGrowthScreen = ({ nav }) => (
  <div style={{ background: C.cream }}>
    <WarmHeader title="Daniel's Growth" subtitle="WHO Growth Chart" onBack={() => nav("home-postnatal")} />
    <Pad>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 16 }}>
        {[["3.2 kg","Weight","WHO 50th%ile"],["51 cm","Length","WHO 50th%ile"],["35 cm","Head circ.","WHO 50th%ile"]].map(([v,l,s]) => (
          <Card key={l} style={{ textAlign: "center", padding: 12 }}>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 700, color: C.teal }}>{v}</div>
            <div style={{ fontSize: 10, fontWeight: 700, color: C.grey400, textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif" }}>{l}</div>
            <div style={{ fontSize: 9, color: C.grey300, marginTop: 2, fontFamily: "'DM Sans', sans-serif" }}>{s}</div>
          </Card>
        ))}
      </div>
      <Card style={{ marginBottom: 16 }}>
        <div style={{ fontFamily: "'Fraunces', serif", fontSize: 16, color: C.navy, marginBottom: 12 }}>Weight-for-Age Chart</div>
        <div style={{ height: 120, background: C.sageLight, borderRadius: 12, position: "relative", overflow: "hidden", display: "flex", alignItems: "flex-end", padding: "8px 8px 24px" }}>
          <svg width="100%" height="100%" viewBox="0 0 300 90" style={{ position: "absolute", inset: 0 }}>
            <polyline points="0,70 60,65 120,55 180,42 240,35 300,28" fill="none" stroke={C.tealMid} strokeWidth="1" strokeDasharray="4,3" />
            <polyline points="0,55 60,50 120,40 180,27 240,20 300,13" fill="none" stroke={C.sageMid} strokeWidth="1" strokeDasharray="4,3" />
            <polyline points="0,78 60,72 120,62 180,52 240,44 300,38" fill="none" stroke={C.tealMid} strokeWidth="1" strokeDasharray="4,3" />
            <circle cx="20" cy="68" r="4" fill={C.coral} />
          </svg>
          <div style={{ display: "flex", justifyContent: "space-around", width: "100%", position: "absolute", bottom: 4 }}>
            {["Birth","2w","4w","6w","8w","10w"].map(l => <span key={l} style={{ fontSize: 8, color: C.grey400, fontFamily: "'DM Sans', sans-serif" }}>{l}</span>)}
          </div>
        </div>
        <div style={{ display: "flex", gap: 12, marginTop: 10, fontSize: 10, color: C.grey400, fontFamily: "'DM Sans', sans-serif" }}>
          <span>— 75th %ile</span><span>— 50th %ile</span><span>— 25th %ile</span><span style={{ color: C.coral }}>● Daniel</span>
        </div>
      </Card>
      <Label>Milestones — 0–2 Months</Label>
      {[["Follows objects with eyes","Complete ✓",true],["Smiles at caregiver","Not yet",false],["Makes cooing sounds","Complete ✓",true],["Lifts head when on tummy","In progress",false]].map(([m,s,done]) => (
        <Card key={m} style={{ marginBottom: 8, padding: "12px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <div style={{ width: 24, height: 24, borderRadius: 8, background: done ? C.greenLight : C.grey100, display: "flex", alignItems: "center", justifyContent: "center" }}>
              {done && <Ic n="check" s={14} c={C.green} />}
            </div>
            <span style={{ fontSize: 13, color: C.grey800, fontFamily: "'DM Sans', sans-serif" }}>{m}</span>
          </div>
          <Pill color={done ? C.green : C.grey400}>{s}</Pill>
        </Card>
      ))}
    </Pad>
    <BottomNav active="baby" nav={nav} phase="postnatal" />
  </div>
);

// ── SCREEN 17: SELF REGISTRATION ─────────────────────────────────────────────
const SelfRegScreen = ({ nav }) => (
  <div style={{ background: C.cream }}>
    <WarmHeader title="Create Your Account" onBack={() => nav("welcome")} />
    <Pad>
      <div style={{ fontSize: 13, color: C.grey500, marginBottom: 20, fontFamily: "'DM Sans', sans-serif', lineHeight: 1.6" }}>We'll create your pregnancy record and help connect you with a health centre or community health link near you.</div>
      <FieldInput label="Your Full Name" placeholder="Adunni Afolabi" />
      <FieldInput label="Phone Number" placeholder="+234 803 456 7890" />
      <FieldInput label="Date of Birth" placeholder="DD / MM / YYYY" />
      <FieldInput label="Last Menstrual Period (LMP)" placeholder="DD MMM YYYY" />
      <div style={{ background: C.tealLight, border: `1px solid ${C.tealMid}`, borderRadius: 14, padding: "12px 14px", marginBottom: 14 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: C.tealDark, marginBottom: 4, fontFamily: "'DM Sans', sans-serif' " }}>EGA and EDD will be calculated automatically from your LMP</div>
      </div>
      <Label>State</Label>
      <select style={{ width: "100%", background: C.cream, border: `1.5px solid ${C.grey200}`, borderRadius: 14, padding: "13px 14px", fontSize: 14, fontFamily: "'DM Sans', sans-serif", color: C.grey800, outline: "none", marginBottom: 14 }}>
        <option>Lagos</option><option>Kano</option><option>Abuja</option><option>Rivers</option>
      </select>
      <div style={{ background: C.peach, border: `1px solid ${C.coralMid}`, borderRadius: 14, padding: "12px 14px", marginBottom: 20 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: C.coral, marginBottom: 4, fontFamily: "'DM Sans', sans-serif' " }}>💡 Where will you deliver your baby?</div>
        <div style={{ fontSize: 12, color: C.grey600, fontFamily: "'DM Sans', sans-serif" }}>We'll help you connect with a health centre near you with skilled birth attendants, and a community health link who can support you to get there safely.</div>
      </div>
      <Btn onClick={() => nav("pin-setup")} full>Create Account →</Btn>
    </Pad>
  </div>
);

// ── SCREEN 18: SETTINGS / MORE ────────────────────────────────────────────────
const MoreScreen = ({ nav, phase }) => (
  <div style={{ background: C.cream }}>
    <WarmHeader title="More" light />
    <Pad>
      <div style={{ display: "flex", alignItems: "center", gap: 14, background: C.white, borderRadius: 20, padding: 16, marginBottom: 20 }}>
        <div style={{ fontSize: 36 }}>👩🏾</div>
        <div>
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: 18, fontWeight: 600, color: C.navy }}>Adunni Afolabi</div>
          <div style={{ fontSize: 12, color: C.grey500, fontFamily: "'DM Sans', sans-serif" }}>Community link: Mama Adunola · PHC: Surulere</div>
        </div>
      </div>
      {[
        { section:"Care Settings", items:[["Family Access","Share your record with family","family"],["Notifications","Manage reminders","bell"],["Language","Currently: English","learn"]] },
        { section:"My Data", items:[["My Pregnancy Archive","View past pregnancy","record"],["Export My Data","Download your records","check"],["Delete Account","Remove all your data","alert"]] },
        { section:"About", items:[["About AHF Mama","Version 1.0.0","heart"],["Privacy Policy","NDPR compliance","lock"],["Help & Support","Contact AHF team","phone"]] },
      ].map(({ section, items }) => (
        <div key={section}>
          <Label>{section}</Label>
          <Card style={{ marginBottom: 12, padding: 0, overflow: "hidden" }}>
            {items.map(([title, sub, icon], i) => (
              <button key={title} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", background: "none", border: "none", borderBottom: i < items.length-1 ? `1px solid ${C.grey100}` : "none", width: "100%", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", textAlign: "left" }}>
                <div style={{ width: 36, height: 36, borderRadius: 12, background: C.coralLight, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Ic n={icon} s={18} c={C.coral} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: C.navy }}>{title}</div>
                  <div style={{ fontSize: 11, color: C.grey400 }}>{sub}</div>
                </div>
                <Ic n="arrow" s={16} c={C.grey300} />
              </button>
            ))}
          </Card>
        </div>
      ))}
    </Pad>
    <BottomNav active="more" nav={nav} phase={phase} />
  </div>
);

// ══════════════════════════════════════════════════════════════════════════════
//  SCREEN MAP
// ══════════════════════════════════════════════════════════════════════════════
const SCREENS = [
  { id:"language",       label:"Language Select",     group:"Onboarding" },
  { id:"welcome",        label:"Welcome / Entry",     group:"Onboarding" },
  { id:"register-mediated", label:"Mediated Registration", group:"Onboarding" },
  { id:"register-self",  label:"Self Registration",   group:"Onboarding" },
  { id:"pin-setup",      label:"PIN / Biometric",     group:"Onboarding" },
  { id:"consent",        label:"NDPR Consent",        group:"Onboarding" },
  { id:"home",           label:"Home (Pregnancy)",    group:"Pregnancy" },
  { id:"my-record",      label:"My Record",           group:"Pregnancy" },
  { id:"birth-plan",     label:"My Birth Plan",       group:"Pregnancy" },
  { id:"symptom-checkin",label:"Daily Check-In",      group:"Pregnancy" },
  { id:"symptom-report", label:"I Have a Symptom",    group:"Pregnancy" },
  { id:"kick-counter",   label:"Kick Counter",        group:"Pregnancy" },
  { id:"mood",           label:"Mood Tracker",        group:"Pregnancy" },
  { id:"learn",          label:"Learn",               group:"Pregnancy" },
  { id:"more",           label:"Settings / More",     group:"Pregnancy" },
  { id:"delivery-celeb", label:"Delivery Celebration",group:"Transition" },
  { id:"home-postnatal", label:"Home (Postnatal)",    group:"Postnatal & Baby" },
  { id:"baby-imms",      label:"Baby Immunisation",   group:"Postnatal & Baby" },
  { id:"baby-growth",    label:"Baby Growth & Milestones", group:"Postnatal & Baby" },
];

// ══════════════════════════════════════════════════════════════════════════════
//  PHONE SHELL
// ══════════════════════════════════════════════════════════════════════════════
const PhoneShell = ({ children, screen }) => {
  const isDark = ["language"].includes(screen);
  return (
    <div style={{ width: 390, background: C.warmWhite, borderRadius: 52, boxShadow: "0 48px 128px rgba(0,0,0,0.55), 0 0 0 12px #1a0e08, inset 0 0 0 2px #2d1a14", overflow: "hidden", minHeight: 844 }}>
      <StatusBar dark={isDark} />
      <div style={{ height: 800, overflowY: "auto", background: C.cream }}>
        {children}
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
//  APP
// ══════════════════════════════════════════════════════════════════════════════
export default function App() {
  const [screen, setScreen] = useState("language");
  const nav = id => setScreen(id);
  const groups = [...new Set(SCREENS.map(s => s.group))];

  const getPhase = () => ["home-postnatal","baby-imms","baby-growth"].includes(screen) ? "postnatal" : "pregnancy";

  const render = () => {
    const phase = getPhase();
    switch(screen) {
      case "language":        return <LanguageScreen nav={nav} />;
      case "welcome":         return <WelcomeScreen nav={nav} />;
      case "register-mediated": return <MediatedRegScreen nav={nav} />;
      case "register-self":   return <SelfRegScreen nav={nav} />;
      case "pin-setup":       return <PinSetupScreen nav={nav} />;
      case "consent":         return <ConsentScreen nav={nav} />;
      case "home":            return <HomeScreen nav={nav} phase={phase} />;
      case "my-record":       return <MyRecordScreen nav={nav} phase={phase} />;
      case "birth-plan":      return <BirthPlanScreen nav={nav} />;
      case "symptom-checkin": return <SymptomCheckinScreen nav={nav} />;
      case "symptom-report":  return <SymptomReportScreen nav={nav} />;
      case "kick-counter":    return <KickCounterScreen nav={nav} />;
      case "mood":            return <MoodScreen nav={nav} />;
      case "learn":           return <LearnScreen nav={nav} phase={phase} />;
      case "more":            return <MoreScreen nav={nav} phase={phase} />;
      case "delivery-celeb":  return <DeliveryCelebScreen nav={nav} />;
      case "home-postnatal":  return <HomePostnatalScreen nav={nav} />;
      case "baby-imms":       return <BabyImmsScreen nav={nav} />;
      case "baby-growth":     return <BabyGrowthScreen nav={nav} />;
      default:                return <HomeScreen nav={nav} phase={phase} />;
    }
  };

  return (
    <>
      <style>{G}</style>
      <div style={{ display: "flex", gap: 32, alignItems: "flex-start", width: "100%", maxWidth: 1380, margin: "0 auto", padding: "24px 0", fontFamily: "'DM Sans', sans-serif" }}>
        {/* Navigator */}
        <div style={{ width: 230, flexShrink: 0, position: "sticky", top: 24 }}>
          <div style={{ background: "rgba(255,255,255,0.07)", backdropFilter: "blur(12px)", borderRadius: 22, padding: 20, border: "1px solid rgba(255,255,255,0.1)", marginBottom: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.35)", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 16 }}>Screen Navigator</div>
            {groups.map(g => (
              <div key={g} style={{ marginBottom: 18 }}>
                <div style={{ fontSize: 9, fontWeight: 700, color: C.coral, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 8 }}>{g}</div>
                {SCREENS.filter(s => s.group === g).map(s => (
                  <button key={s.id} onClick={() => nav(s.id)} style={{ display: "block", width: "100%", textAlign: "left", padding: "8px 12px", borderRadius: 10, border: "none", background: screen === s.id ? "rgba(224,122,95,0.25)" : "transparent", color: screen === s.id ? "#FCF0EC" : "rgba(255,255,255,0.5)", fontSize: 12, fontWeight: screen === s.id ? 700 : 400, fontFamily: "'DM Sans', sans-serif", cursor: "pointer", marginBottom: 1, borderLeft: screen === s.id ? `3px solid ${C.coral}` : "3px solid transparent", transition: "all 0.15s" }}>
                    {s.label}
                  </button>
                ))}
              </div>
            ))}
          </div>
          <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 14, padding: "12px 16px", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", lineHeight: 1.7 }}>
              <div style={{ color: C.coral, fontWeight: 700, marginBottom: 4 }}>Tip</div>
              Navigate using the list above or tap through buttons within each screen. The Delivery Celebration screen leads into the postnatal phase.
            </div>
          </div>
        </div>

        {/* Phone + title */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ marginBottom: 24, textAlign: "center" }}>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 26, fontWeight: 700, color: "#fff", marginBottom: 4 }}>AHF Mama — Patient Companion App</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>Interactive Wireframe Prototype · v1.0 · Access Heart Foundation · May 2026</div>
            <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 10 }}>
              <span style={{ background: "rgba(224,122,95,0.2)", color: C.coral, borderRadius: 12, padding: "4px 12px", fontSize: 11, fontWeight: 700 }}>18 Screens</span>
              <span style={{ background: "rgba(61,155,143,0.2)", color: C.teal, borderRadius: 12, padding: "4px 12px", fontSize: 11, fontWeight: 700 }}>Full Lifecycle</span>
              <span style={{ background: "rgba(155,142,196,0.2)", color: C.lavender, borderRadius: 12, padding: "4px 12px", fontSize: 11, fontWeight: 700 }}>Pregnancy → Baby</span>
            </div>
          </div>
          <PhoneShell screen={screen}>
            {render()}
          </PhoneShell>
        </div>
      </div>
    </>
  );
}
