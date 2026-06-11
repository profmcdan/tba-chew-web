import React, { useState, useContext } from 'react';
import { PlatformContext } from '../../context/PlatformContext';

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

// ─── RISK COLOURS ─────────────────────────────────────────────────────────────
const RISK = {
  NORMAL:   { bg: T.greenLight,  border: T.green,   text: T.green,   label: "NORMAL" },
  ELEVATED: { bg: T.elevLight,   border: T.elevated,text: T.elevated,label: "ELEVATED" },
  HIGH:     { bg: T.orangeLight, border: T.orange,  text: T.orange,  label: "HIGH RISK" },
  CRITICAL: { bg: T.redLight,    border: T.red,     text: T.red,     label: "CRITICAL" },
};

// ─── ICON COMPONENTS ─────────────────────────────────────────────────────────
const Icon = ({ name, size = 20, color = "currentColor" }) => {
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
    heart:    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke={color} strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
    phone:    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 9.7a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
    baby:     <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="3"/><path d="M12 11c-4 0-7 2-7 5v1h14v-1c0-3-3-5-7-5z"/></svg>,
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

const PhoneShell = ({ children, screen }) => (
  <div style={{ width: 375, background: "#fff", borderRadius: 40, boxShadow: "0 20px 60px rgba(0,0,0,0.3), 0 0 0 10px #111, inset 0 0 0 2px #333", overflow: "hidden", position: "relative", height: 740, display: 'flex', flexDirection: 'column' }}>
    {/* Status bar */}
    <div style={{ height: 44, background: screen === "login" ? "#1a2b4a" : T.teal, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", position: "relative", flexShrink: 0 }}>
      <span style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>9:41 AM</span>
      <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", width: 110, height: 22, background: "#000", borderRadius: 11 }} />
      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
        <Icon name="wifi" size={14} color="#fff" />
        <div style={{ display: "flex", gap: 2 }}>
          {[1,2,3,4].map(i => <div key={i} style={{ width: 2, height: 2 + i * 2, background: "#fff", borderRadius: 0.5 }} />)}
        </div>
      </div>
    </div>
    {/* Content Wrapper */}
    <div style={{ flex: 1, overflowY: "auto", position: "relative", background: '#F7F8FA' }}>
      {children}
    </div>
  </div>
);

const BottomNav = ({ active, onNavigate }) => {
  const tabs = [
    { id: "home",    icon: "home",     label: "Home" },
    { id: "clients", icon: "users",    label: "Clients" },
    { id: "refer",   icon: "refer",    label: "Referrals" },
    { id: "learn",   icon: "learn",    label: "Academy" },
  ];
  return (
    <div style={{ position: "sticky", bottom: 0, background: T.white, borderTop: `1px solid ${T.grey100}`, display: "flex", padding: "8px 0 10px", flexShrink: 0, zIndex: 10 }}>
      {tabs.map(t => (
        <button key={t.id} onClick={() => onNavigate(t.id)} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
          <Icon name={t.icon} size={20} color={active === t.id ? T.teal : T.grey300} />
          <span style={{ fontSize: 9, fontWeight: active === t.id ? 700 : 400, color: active === t.id ? T.teal : T.grey400 }}>{t.label}</span>
        </button>
      ))}
    </div>
  );
};

const TealHeader = ({ title, subtitle, onBack, action }) => (
  <div style={{ background: `linear-gradient(135deg, ${T.teal} 0%, ${T.tealDark} 100%)`, padding: "16px 16px 20px", position: "sticky", top: 0, zIndex: 10 }}>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {onBack && <button onClick={onBack} style={{ background: "rgba(255,255,255,0.2)", border: "none", borderRadius: 8, width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><Icon name="back" size={16} color={T.white} /></button>}
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, color: T.white }}>{title}</div>
          {subtitle && <div style={{ fontSize: 11, color: "rgba(255,255,255,0.75)", marginTop: 2 }}>{subtitle}</div>}
        </div>
      </div>
      {action}
    </div>
  </div>
);

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function TbaView() {
  const { clients, activeReferrals, registerClient, logAncVisit, initiateReferral, recordDelivery, submitPatientCheckIn, alerts } = useContext(PlatformContext);
  
  const [screen, setScreen] = useState("login"); // login | home | clients | client-detail | register | anc | danger | referral | delivery | academy
  const [selectedClientId, setSelectedClientId] = useState(null);
  
  // Local Form States
  const [registerStep, setRegisterStep] = useState(1);
  const [regName, setRegName] = useState("");
  const [regAge, setRegAge] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regLga, setRegLga] = useState("Surulere");
  const [regLmp, setRegLmp] = useState("10 Jan 2026");
  const [regConditions, setRegConditions] = useState([]);
  
  const [ancBp, setAncBp] = useState("120/80");
  const [ancWeight, setAncWeight] = useState("70");
  const [ancFundal, setAncFundal] = useState("28");
  const [ancFhr, setAncFhr] = useState("140");
  const [ancOedema, setAncOedema] = useState("None");
  const [ancUrine, setAncUrine] = useState("Negative");
  const [ancTreatments, setAncTreatments] = useState([]);
  const [ancNotes, setAncNotes] = useState("");

  const [dangerSymptoms, setDangerSymptoms] = useState([]);
  
  const [refUrgency, setRefUrgency] = useState("Emergency");
  const [refReason, setRefReason] = useState("");
  const [refFacility, setRefFacility] = useState("Gbagada General Hospital");

  const [delOutcome, setDelOutcome] = useState("Alive & well");
  const [delComplications, setDelComplications] = useState([]);

  // Search/Filters in client list
  const [clientSearch, setClientSearch] = useState("");
  const [clientFilter, setClientFilter] = useState("All");

  const selectedClient = clients.find(c => c.id === selectedClientId) || clients[0];

  const handleNav = (target) => {
    setScreen(target);
  };

  // Helper toggle conditions
  const toggleRegCondition = (cond) => {
    setRegConditions(prev => prev.includes(cond) ? prev.filter(x => x !== cond) : [...prev, cond]);
  };

  // Sync client list alerts to display high-risk patient banner
  const patientDangerAlert = alerts.find(a => a.type === 'patient');

  return (
    <PhoneShell screen={screen}>
      
      {/* ── SCREEN: LOGIN ── */}
      {screen === "login" && (
        <div style={{ minHeight: "100%", background: "linear-gradient(160deg, #1a2b4a 0%, #007A7C 100%)", display: "flex", flexDirection: "column", padding: 24, justifyContent: 'center' }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{ width: 64, height: 64, borderRadius: 20, background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
              <Icon name="heart" size={32} color={T.lime} />
            </div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", fontWeight: 500, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 4 }}>Access Heart Foundation</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: T.white, lineHeight: 1.2 }}>Kairoi Intel<br/>TBA Assistant</div>
          </div>
          
          <div style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(10px)", borderRadius: 20, padding: 20 }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: T.white, marginBottom: 4 }}>Login Screen</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", marginBottom: 16 }}>Enter your mobile number to begin</div>
            
            <div style={{ background: "rgba(255,255,255,0.12)", borderRadius: 12, padding: "12px 14px", display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <Icon name="phone" size={16} color="rgba(255,255,255,0.5)" />
              <input defaultValue="0803 456 7890" style={{ background: "none", border: "none", outline: "none", fontSize: 15, color: T.white, fontFamily: "'DM Sans', sans-serif", flex: 1 }} />
            </div>
            <Btn onClick={() => setScreen("home")} fullWidth>Send & Log in</Btn>
          </div>
        </div>
      )}

      {/* ── SCREEN: HOME ── */}
      {screen === "home" && (
        <div>
          <div style={{ background: `linear-gradient(135deg, ${T.teal} 0%, ${T.tealDark} 100%)`, padding: "16px 16px 24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
              <div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.7)" }}>Good Morning,</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: T.white }}>Mama Adunola Fatai</div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 4, background: "rgba(255,255,255,0.15)", borderRadius: 20, padding: "2px 8px", marginTop: 4 }}>
                  <div style={{ width: 5, height: 5, borderRadius: 2.5, background: T.lime }} />
                  <span style={{ fontSize: 10, color: T.white, fontWeight: 600 }}>Surulere LGA · AHF-0042</span>
                </div>
              </div>
              <div style={{ width: 40, height: 40, borderRadius: 20, background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>👩🏾</div>
            </div>
            <div style={{ background: "rgba(198,241,53,0.15)", borderRadius: 8, padding: "4px 8px", display: "inline-flex", alignItems: "center", gap: 6 }}>
              <Icon name="wifi" size={11} color={T.lime} />
              <span style={{ fontSize: 10, color: T.lime, fontWeight: 600 }}>Local Offline Sync Active</span>
            </div>
          </div>

          <div style={{ margin: "-12px 12px 0", position: "relative", zIndex: 2 }}>
            {patientDangerAlert ? (
              <AlertBanner 
                type="red" 
                title="🚨 Critical Patient Danger Signs" 
                body={patientDangerAlert.body} 
                onTap={() => { setSelectedClientId(patientDangerAlert.clientId); setScreen("client-detail"); }} 
              />
            ) : (
              <AlertBanner type="green" title="✅ Sync status: Synced" body="All patient data uploaded to Kairoi Cloud." />
            )}
          </div>

          <div style={{ padding: "12px 16px" }}>
            <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
              <StatTile value={clients.length} label="My Clients" color={T.teal} />
              <StatTile value="3" label="Visits Today" color={T.amber} />
              <StatTile value={activeReferrals.filter(r => r.status === 'INITIATED').length} label="Pending Ref" color={T.red} />
            </div>

            <SectionLabel>Quick Actions</SectionLabel>
            <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
              <QuickAction icon="plus"  label="Register Client"  color={T.teal}   onClick={() => { setRegisterStep(1); setScreen("register"); }} />
              <QuickAction icon="calendar" label="Log ANC Visit"   color={T.navy}   onClick={() => setScreen("anc")} />
              <QuickAction icon="alert" label="Danger Signs"   color={T.orange} onClick={() => setScreen("danger")} />
            </div>
            <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
              <QuickAction icon="refer"  label="Initiate Referral" color={T.red}    onClick={() => setScreen("referral")} />
              <QuickAction icon="baby"   label="Record Delivery"   color={T.elevated} onClick={() => setScreen("delivery")} />
              <QuickAction icon="learn"  label="TBA Academy"      color={T.teal}   onClick={() => setScreen("academy")} />
            </div>

            <SectionLabel>My Registered Clients (Tap to view)</SectionLabel>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {clients.slice(0, 4).map(c => (
                <Card key={c.id} onClick={() => { setSelectedClientId(c.id); setScreen("client-detail"); }} style={{ display: "flex", alignItems: "center", gap: 10, padding: 12 }}>
                  <div style={{ width: 34, height: 34, borderRadius: 17, background: T.tealLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>👩🏾</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: T.grey800, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.name}</div>
                    <div style={{ fontSize: 11, color: T.grey400 }}>EGA {c.ega}</div>
                  </div>
                  <RiskBadge risk={c.risk} small />
                </Card>
              ))}
            </div>
          </div>
          <BottomNav active="home" onNavigate={handleNav} />
        </div>
      )}

      {/* ── SCREEN: CLIENTS LIST ── */}
      {screen === "clients" && (
        <div>
          <TealHeader title="My Clients" subtitle={`${clients.length} active pregnancies`} action={
            <button onClick={() => { setRegisterStep(1); setScreen("register"); }} style={{ background: T.lime, border: "none", borderRadius: 8, padding: "6px 12px", display: "flex", alignItems: "center", gap: 4, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 12, color: T.navy }}>
              <Icon name="plus" size={12} color={T.navy} />Add
            </button>
          } />
          <div style={{ background: T.white, borderBottom: `1px solid ${T.grey100}`, padding: "10px 16px" }}>
            <div style={{ background: T.grey50, borderRadius: 10, display: "flex", alignItems: "center", gap: 8, padding: "8px 12px", marginBottom: 8 }}>
              <Icon name="search" size={14} color={T.grey400} />
              <input value={clientSearch} onChange={e => setClientSearch(e.target.value)} placeholder="Search clients by name..." style={{ flex: 1, background: "none", border: "none", outline: "none", fontSize: 13, fontFamily: "'DM Sans', sans-serif", color: T.grey800 }} />
            </div>
            <div style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 2 }}>
              {["All", "High Risk", "Critical"].map(f => (
                <button key={f} onClick={() => setClientFilter(f)} style={{ flexShrink: 0, padding: "4px 10px", borderRadius: 15, border: "none", background: clientFilter === f ? T.teal : T.grey100, color: clientFilter === f ? T.white : T.grey600, fontSize: 11, fontWeight: 600, fontFamily: "'DM Sans', sans-serif", cursor: "pointer" }}>{f}</button>
              ))}
            </div>
          </div>

          <div style={{ padding: 12 }}>
            {clients
              .filter(c => c.name.toLowerCase().includes(clientSearch.toLowerCase()))
              .filter(c => {
                if (clientFilter === "High Risk") return c.risk === "HIGH" || c.risk === "CRITICAL";
                if (clientFilter === "Critical") return c.risk === "CRITICAL";
                return true;
              })
              .map(c => (
                <Card key={c.id} onClick={() => { setSelectedClientId(c.id); setScreen("client-detail"); }} style={{ marginBottom: 8, display: "flex", alignItems: "center", gap: 10, padding: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 18, background: T.tealLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>👩🏾</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: T.grey800 }}>{c.name}</div>
                    <div style={{ fontSize: 11, color: T.grey400 }}>Age {c.age} · EGA {c.ega} · EDD {c.edd}</div>
                  </div>
                  <RiskBadge risk={c.risk} small />
                </Card>
              ))}
          </div>
          <BottomNav active="clients" onNavigate={handleNav} />
        </div>
      )}

      {/* ── SCREEN: CLIENT DETAIL ── */}
      {screen === "client-detail" && selectedClient && (
        <div>
          <TealHeader title="Client Profile" onBack={() => setScreen("clients")} />
          <div style={{ padding: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
              <div style={{ width: 56, height: 56, borderRadius: 28, background: T.tealLight, fontSize: 24, display: "flex", alignItems: "center", justifyContent: "center" }}>👩🏾</div>
              <div>
                <div style={{ fontSize: 17, fontWeight: 800, color: T.navy }}>{selectedClient.name}</div>
                <div style={{ fontSize: 11, color: T.grey400 }}>ID: {selectedClient.id} · Age {selectedClient.age} · {selectedClient.phone}</div>
                <div style={{ marginTop: 4 }}><RiskBadge risk={selectedClient.risk} /></div>
              </div>
            </div>

            <Card style={{ marginBottom: 12 }}>
              <SectionLabel>Pregnancy Status</SectionLabel>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {[["LMP", selectedClient.lmp], ["EGA", selectedClient.ega], ["EDD", selectedClient.edd], ["Pregnancies (G/P)", `${selectedClient.gravida} / ${selectedClient.parity}`]].map(([k, v]) => (
                  <div key={k}>
                    <div style={{ fontSize: 10, color: T.grey400, fontWeight: 600 }}>{k}</div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: T.grey800 }}>{v}</div>
                  </div>
                ))}
              </div>
            </Card>

            {selectedClient.conditions && selectedClient.conditions.length > 0 && (
              <Card style={{ marginBottom: 12, background: T.orangeLight, border: `1px solid ${T.orange}30` }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: T.orange }}>⚠️ PRE-EXISTING RISK FACTORS</div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 6 }}>
                  {selectedClient.conditions.map(c => (
                    <span key={c} style={{ background: T.white, padding: '2px 8px', borderRadius: 10, fontSize: 10, fontWeight: 600, color: T.orange }}>{c}</span>
                  ))}
                </div>
              </Card>
            )}

            <Card style={{ marginBottom: 16 }}>
              <SectionLabel>ANC Visited Record</SectionLabel>
              {selectedClient.visits && selectedClient.visits.length > 0 ? (
                selectedClient.visits.map((v, idx) => (
                  <div key={idx} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: idx < selectedClient.visits.length - 1 ? `1px solid ${T.grey100}` : "none" }}>
                    <span style={{ fontSize: 12, color: T.grey700 }}>ANC Contact {v.n} ({v.date})</span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: v.flag === 'Watch' ? T.amber : T.green }}>{v.flag === 'Watch' ? "⚠ Raised BP/Swelling" : "✓ Complete"}</span>
                  </div>
                ))
              ) : (
                <div style={{ padding: "8px 0", color: T.grey400, fontSize: 12, textAlign: 'center' }}>No visits recorded yet.</div>
              )}
            </Card>

            <div style={{ display: "flex", gap: 8 }}>
              <Btn onClick={() => setScreen("anc")} variant="teal" fullWidth icon="calendar">Log ANC</Btn>
              <Btn onClick={() => setScreen("danger")} variant="outline" fullWidth icon="alert">Danger Signs</Btn>
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              <Btn onClick={() => setScreen("referral")} variant="danger" fullWidth icon="refer">Refer</Btn>
              <Btn onClick={() => setScreen("delivery")} variant="ghost" fullWidth icon="baby">Record Birth</Btn>
            </div>
          </div>
          <BottomNav active="clients" onNavigate={handleNav} />
        </div>
      )}

      {/* ── SCREEN: REGISTER CLIENT ── */}
      {screen === "register" && (
        <div>
          <TealHeader title="Register Client" subtitle={`Step ${registerStep} of 3`} onBack={registerStep > 1 ? () => setRegisterStep(registerStep-1) : () => setScreen("home")} />
          <div style={{ display: "flex", padding: "8px 16px", gap: 6 }}>
            {[1,2,3].map(i => <div key={i} style={{ flex: 1, height: 3, borderRadius: 1.5, background: i <= registerStep ? T.teal : T.grey100 }} />)}
          </div>
          <div style={{ padding: 16 }}>
            {registerStep === 1 && (
              <>
                <div style={{ fontSize: 15, fontWeight: 700, color: T.navy, marginBottom: 12 }}>Personal Details</div>
                <Input label="Full Name" value={regName} onChange={setRegName} placeholder="Kemi Afolabi" />
                <div style={{ display: "flex", gap: 8 }}>
                  <div style={{ flex: 1 }}><Input label="Age" value={regAge} onChange={setRegAge} placeholder="26" type="number" /></div>
                  <div style={{ flex: 1 }}><Input label="Phone Number" value={regPhone} onChange={setRegPhone} placeholder="0803 456 7890" /></div>
                </div>
                <div style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: T.grey400, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 6 }}>LGA</div>
                  <select value={regLga} onChange={e => setRegLga(e.target.value)} style={{ width: "100%", background: T.grey50, border: `1.5px solid ${T.grey100}`, borderRadius: 12, padding: "12px 14px", fontSize: 14, fontFamily: "'DM Sans', sans-serif", color: T.grey800, outline: "none" }}>
                    <option>Surulere</option><option>Ikeja</option><option>Alimosho</option><option>Mushin</option>
                  </select>
                </div>
                <Btn onClick={() => setRegisterStep(2)} fullWidth>Next: Pregnancy Details</Btn>
              </>
            )}

            {registerStep === 2 && (
              <>
                <div style={{ fontSize: 15, fontWeight: 700, color: T.navy, marginBottom: 12 }}>Pregnancy Details</div>
                <Input label="Last Menstrual Period (LMP)" value={regLmp} onChange={setRegLmp} placeholder="10 Jan 2026" />
                
                <SectionLabel>Pre-existing Risk Factors</SectionLabel>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
                  {["Hypertension", "Diabetes", "Previous C-Section", "Sickle Cell"].map(cond => {
                    const selected = regConditions.includes(cond);
                    return (
                      <button key={cond} onClick={() => toggleRegCondition(cond)} style={{ padding: "6px 12px", borderRadius: 15, border: `1.5px solid ${selected ? T.teal : T.grey200}`, background: selected ? T.tealLight : T.white, color: selected ? T.teal : T.grey600, fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>{cond}</button>
                    );
                  })}
                </div>
                
                {regConditions.length > 0 && (
                  <AlertBanner type="amber" title="⚠️ High-Risk Tag Applied" body="Based on conditions, the client will automatically be registered as HIGH RISK." />
                )}

                <Btn onClick={() => setRegisterStep(3)} fullWidth>Next: Consent & Submit</Btn>
              </>
            )}

            {registerStep === 3 && (
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>📝</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: T.navy, marginBottom: 8 }}>Informed Consent (NDPR)</div>
                <div style={{ fontSize: 12, color: T.grey600, lineHeight: 1.5, marginBottom: 20 }}>
                  Ensure you explain to the client that her clinical records will be securely recorded in the platform to connect her with Surulere PHC skilled delivery.
                </div>
                <button onClick={() => {
                  const newC = registerClient(regName, regPhone, regAge, regLga, regLmp, regConditions);
                  setSelectedClientId(newC.id);
                  setScreen("client-detail");
                }} style={{ width: '100%', background: T.lime, color: T.navy, border: 'none', borderRadius: 14, padding: 14, fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
                  Confirm Consent & Register
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── SCREEN: LOG ANC VISIT ── */}
      {screen === "anc" && (
        <div>
          <TealHeader title="Log ANC Visit" subtitle={selectedClient ? `For ${selectedClient.name}` : "Select a client"} onBack={() => setScreen("client-detail")} />
          <div style={{ padding: 16 }}>
            {!selectedClient ? (
              <div style={{ color: T.grey400, textAlign: 'center', fontSize: 13 }}>Please select a client from the Client list first.</div>
            ) : (
              <>
                <Input label="Blood Pressure (BP)" value={ancBp} onChange={setAncBp} placeholder="120/80" />
                <div style={{ display: 'flex', gap: 8 }}>
                  <div style={{ flex: 1 }}><Input label="Weight" value={ancWeight} onChange={setAncWeight} placeholder="70" suffix="kg" /></div>
                  <div style={{ flex: 1 }}><Input label="Fundal Height" value={ancFundal} onChange={setAncFundal} placeholder="28" suffix="cm" /></div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <div style={{ flex: 1 }}><Input label="Fetal Heart Rate" value={ancFhr} onChange={setAncFhr} placeholder="140" suffix="bpm" /></div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: T.grey400, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 6 }}>Oedema</div>
                    <select value={ancOedema} onChange={e => setAncOedema(e.target.value)} style={{ width: "100%", background: T.grey50, border: `1.5px solid ${T.grey100}`, borderRadius: 12, padding: "12px 14px", fontSize: 14, fontFamily: "'DM Sans', sans-serif", color: T.grey800, outline: "none" }}>
                      <option>None</option><option>Mild (feet)</option><option>Severe (hands/face)</option>
                    </select>
                  </div>
                </div>
                <div style={{ marginBottom: 14, marginTop: 8 }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: T.grey400, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 6 }}>Urine Protein</div>
                  <select value={ancUrine} onChange={e => setAncUrine(e.target.value)} style={{ width: "100%", background: T.grey50, border: `1.5px solid ${T.grey100}`, borderRadius: 12, padding: "12px 14px", fontSize: 14, fontFamily: "'DM Sans', sans-serif", color: T.grey800, outline: "none" }}>
                    <option>Negative</option><option>Trace</option><option>Positive (1+ or more)</option>
                  </select>
                </div>
                <Input label="Visit Notes" value={ancNotes} onChange={setAncNotes} placeholder="Good progress, counselled on birth plan..." />
                
                <Btn onClick={() => {
                  logAncVisit(selectedClient.id, ancBp, ancWeight, ancFundal, ancFhr, ancOedema, ancUrine, ["Iron / folic acid"], ancNotes);
                  setScreen("client-detail");
                }} fullWidth>Save Visit Log</Btn>
              </>
            )}
          </div>
        </div>
      )}

      {/* ── SCREEN: DANGER SIGNS CHECK ── */}
      {screen === "danger" && (
        <div>
          <TealHeader title="Symptom Check-in" subtitle={selectedClient ? `Danger signs for ${selectedClient.name}` : "Select client"} onBack={() => setScreen("client-detail")} />
          <div style={{ padding: 16 }}>
            {!selectedClient ? (
              <div style={{ color: T.grey400, textAlign: 'center', fontSize: 13 }}>Please select a client first.</div>
            ) : (
              <>
                <div style={{ fontSize: 12, color: T.grey600, marginBottom: 12 }}>Check any matching warning danger symptoms reported:</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
                  {["Severe headache / blurred vision", "Heavy vaginal bleeding", "Facial/hand swelling (oedema)", "Convulsions or fitting", "Reduced foetal movement", "Prolonged labour (>12h)"].map(symp => {
                    const checked = dangerSymptoms.includes(symp);
                    return (
                      <button key={symp} onClick={() => setDangerSymptoms(prev => prev.includes(symp) ? prev.filter(x => x !== symp) : [...prev, symp])} style={{ display: "flex", alignItems: "center", gap: 10, padding: 12, borderRadius: 10, border: `1px solid ${checked ? T.red : T.grey100}`, background: checked ? T.redLight : T.white, textAlign: 'left', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
                        <div style={{ width: 18, height: 18, border: `2px solid ${checked ? T.red : T.grey200}`, background: checked ? T.red : T.white, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 4 }}>
                          {checked && <Icon name="check" size={10} color={T.white} />}
                        </div>
                        <span style={{ fontSize: 13, color: T.grey800, fontWeight: 500 }}>{symp}</span>
                      </button>
                    );
                  })}
                </div>
                <Btn onClick={() => {
                  submitPatientCheckIn(selectedClient.id, dangerSymptoms, selectedClient.mood || "Neutral", selectedClient.kickCount);
                  setDangerSymptoms([]);
                  setScreen("client-detail");
                }} variant={dangerSymptoms.length > 0 ? "danger" : "primary"} fullWidth>Submit Danger Signs</Btn>
              </>
            )}
          </div>
        </div>
      )}

      {/* ── SCREEN: INITIATE REFERRAL ── */}
      {screen === "referral" && (
        <div>
          <TealHeader title="Initiate Referral" subtitle={selectedClient ? `For ${selectedClient.name}` : "Select client"} onBack={() => setScreen("client-detail")} />
          <div style={{ padding: 16 }}>
            {!selectedClient ? (
              <div style={{ color: T.grey400, textAlign: 'center', fontSize: 13 }}>Please select a client first.</div>
            ) : (
              <>
                <div style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: T.grey400, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 6 }}>Referral Urgency</div>
                  <select value={refUrgency} onChange={e => setRefUrgency(e.target.value)} style={{ width: "100%", background: T.grey50, border: `1.5px solid ${T.grey100}`, borderRadius: 12, padding: "12px 14px", fontSize: 14, fontFamily: "'DM Sans', sans-serif", color: T.grey800, outline: "none" }}>
                    <option>Emergency</option><option>Urgent</option><option>Routine</option>
                  </select>
                </div>
                
                <div style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: T.grey400, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 6 }}>Receiving Facility</div>
                  <select value={refFacility} onChange={e => setRefFacility(e.target.value)} style={{ width: "100%", background: T.grey50, border: `1.5px solid ${T.grey100}`, borderRadius: 12, padding: "12px 14px", fontSize: 14, fontFamily: "'DM Sans', sans-serif", color: T.grey800, outline: "none" }}>
                    <option>Gbagada General Hospital</option><option>Lagos Island General</option><option>Surulere Health Centre</option><option>LUTH (emergency only)</option>
                  </select>
                </div>
                
                <Input label="Primary Referral Reason" value={refReason} onChange={setRefReason} placeholder="Severe pre-eclampsia symptoms, high blood pressure..." />
                
                <Btn onClick={() => {
                  initiateReferral(selectedClient.id, refUrgency, refReason, refFacility);
                  setRefReason("");
                  setScreen("client-detail");
                }} variant="danger" fullWidth>Send Emergency Referral</Btn>
              </>
            )}
          </div>
        </div>
      )}

      {/* ── SCREEN: RECORD DELIVERY ── */}
      {screen === "delivery" && (
        <div>
          <TealHeader title="Record Delivery" subtitle={selectedClient ? `Birth log for ${selectedClient.name}` : "Select client"} onBack={() => setScreen("client-detail")} />
          <div style={{ padding: 16 }}>
            {!selectedClient ? (
              <div style={{ color: T.grey400, textAlign: 'center', fontSize: 13 }}>Please select a client first.</div>
            ) : (
              <>
                <div style={{ marginBottom: 14 }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: T.grey400, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 6 }}>Delivery Outcome</div>
                  <select value={delOutcome} onChange={e => setDelOutcome(e.target.value)} style={{ width: "100%", background: T.grey50, border: `1.5px solid ${T.grey100}`, borderRadius: 12, padding: "12px 14px", fontSize: 14, fontFamily: "'DM Sans', sans-serif", color: T.grey800, outline: "none" }}>
                    <option>Alive & well</option>
                    <option>Alive, complications</option>
                    <option>Stillbirth</option>
                    <option>Neonatal death</option>
                  </select>
                </div>

                <SectionLabel>Complications Encountered</SectionLabel>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
                  {["Postpartum Haemorrhage (PPH)", "Severe Maternal Haemorrhage (Death)", "Prolonged Obstructed Labour", "Infection / Sepsis", "None"].map(comp => {
                    const checked = delComplications.includes(comp);
                    return (
                      <button key={comp} onClick={() => setDelComplications(prev => prev.includes(comp) ? prev.filter(x => x !== comp) : [...prev, comp])} style={{ display: "flex", alignItems: "center", gap: 10, padding: 10, borderRadius: 8, border: `1px solid ${checked ? T.teal : T.grey100}`, background: checked ? T.tealLight : T.white, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", textAlign: 'left' }}>
                        <div style={{ width: 16, height: 16, border: `2px solid ${checked ? T.teal : T.grey200}`, background: checked ? T.teal : T.white, borderRadius: 4 }} />
                        <span style={{ fontSize: 12, color: T.grey800 }}>{comp}</span>
                      </button>
                    );
                  })}
                </div>

                <Btn onClick={() => {
                  recordDelivery(selectedClient.id, delOutcome, delComplications);
                  setScreen("home");
                }} variant="primary" fullWidth>File Birth Register Report</Btn>
              </>
            )}
          </div>
        </div>
      )}

      {/* ── SCREEN: TRAINING ACADEMY ── */}
      {screen === "academy" && (
        <div>
          <TealHeader title="Training Academy" subtitle="Mama Certification Modules" onBack={() => setScreen("home")} />
          <div style={{ padding: 16 }}>
            <Card style={{ background: T.teal, color: T.white, marginBottom: 16 }}>
              <div style={{ fontSize: 12, opacity: 0.8 }}>ACADEMY STATUS</div>
              <div style={{ fontSize: 22, fontWeight: 800, margin: "4px 0" }}>Certified TBA (6/8)</div>
              <div style={{ height: 6, background: "rgba(255,255,255,0.25)", borderRadius: 3, marginTop: 8 }}>
                <div style={{ height: "100%", width: "75%", background: T.lime, borderRadius: 3 }} />
              </div>
            </Card>

            <SectionLabel>My Training Modules</SectionLabel>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                ["Maternal Danger Signs", "Complete", T.green],
                ["Safe Delivery Practice", "Complete", T.green],
                ["Emergency Referral Protocol", "Complete", T.green],
                ["ANC Visit Guidelines", "Complete", T.green],
                ["Infection Control", "Complete", T.green],
                ["AMTSL Technique", "Complete", T.green],
                ["Postpartum Haemorrhage (PPH)", "In Progress (60%)", T.amber],
                ["Record Keeping & App logs", "Not Started", T.grey400]
              ].map(([mod, status, col]) => (
                <Card key={mod} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 12 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: T.grey800, maxWidth: 180 }}>{mod}</div>
                  <Badge text={status} color={col} bg={col + "15"} />
                </Card>
              ))}
            </div>
          </div>
          <BottomNav active="home" onNavigate={handleNav} />
        </div>
      )}

    </PhoneShell>
  );
}
