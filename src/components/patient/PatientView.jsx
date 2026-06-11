import { useState, useContext } from 'react';
import { PlatformContext } from '../../context/PlatformContext';

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
    settings:"M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z",
    wifi:    "M5 12.55a11 11 0 0 1 14.08 0 M1.42 9a16 16 0 0 1 21.16 0 M8.53 16.11a6 6 0 0 1 6.95 0 M12 20h.01",
    arrow:   "M5 12h14 M12 5l7 7-7 7",
    family:  "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 7a4 4 0 1 0 0 8 4 4 0 0 0 0-8z M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75",
    weight:  "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z",
    mood:    "M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z M8 14s1.5 2 4 2 4-2 4-2 M9 9h.01 M15 9h.01",
  };
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill={fill === "solid" ? c : "none"} stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {d[n]?.split(" M ").map((p, i) => <path key={i} d={i === 0 ? p : "M " + p} />)}
    </svg>
  );
};

// ─── REUSABLE PATIENT COMPONENTS ───────────────────────────────────────────
const WarmHeader = ({ title, subtitle, onBack, light, action }) => (
  <div style={{
    background: light ? C.warmWhite : `linear-gradient(135deg, ${C.coral} 0%, ${C.coralDark} 100%)`,
    padding: "16px 20px 20px",
    position: "sticky", top: 0, zIndex: 10,
    borderBottom: light ? `1px solid ${C.grey200}` : 'none'
  }}>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {onBack && (
          <button onClick={onBack} style={{ width: 36, height: 36, borderRadius: 12, background: light ? C.grey100 : "rgba(255,255,255,0.2)", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <Ic n="back" s={18} c={light ? C.grey800 : C.white} />
          </button>
        )}
        <div>
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: 18, fontWeight: 600, color: light ? C.navy : C.white, lineHeight: 1.2 }}>{title}</div>
          {subtitle && <div style={{ fontSize: 11, color: light ? C.grey400 : "rgba(255,255,255,0.75)", marginTop: 2, fontFamily: "'DM Sans', sans-serif" }}>{subtitle}</div>}
        </div>
      </div>
      {action}
    </div>
  </div>
);

const Pad = ({ children, style }) => (
  <div style={{ padding: "16px 16px", ...style }}>{children}</div>
);

const Card = ({ children, style, onClick }) => (
  <div onClick={onClick} style={{ background: C.white, borderRadius: 20, padding: 16, boxShadow: "0 2px 16px rgba(58,35,20,0.05)", cursor: onClick ? "pointer" : "default", ...style }}>
    {children}
  </div>
);

const Input = ({ label, value, onChange, placeholder, type="text", suffix }) => (
  <div style={{ marginBottom: 14 }}>
    {label && <div style={{ fontSize: 9, fontWeight: 700, color: C.grey400, textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 8, marginTop: 14, fontFamily: "'DM Sans', sans-serif" }}>{label}</div>}
    <div style={{ position: "relative" }}>
      <input type={type} value={value} onChange={onChange} placeholder={placeholder} style={{ width: "100%", background: C.white, border: `1.5px solid ${C.grey200}`, borderRadius: 12, padding: "12px 14px", fontSize: 14, fontFamily: "'DM Sans', sans-serif", color: C.grey800, outline: "none" }} />
      {suffix && <span style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", fontSize: 12, color: C.grey400 }}>{suffix}</span>}
    </div>
  </div>
);

const Pill = ({ children, color = C.coral, bg }) => (
  <span style={{ background: bg || color + "18", color, borderRadius: 20, padding: "4px 12px", fontSize: 10, fontWeight: 700, fontFamily: "'DM Sans', sans-serif", letterSpacing: 0.3, whiteSpace: "nowrap" }}>
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
    <button onClick={onClick} disabled={disabled} style={{ background: v.bg, color: v.c, border: v.border, borderRadius: 16, padding: small ? "8px 14px" : "12px 18px", fontSize: small ? 12 : 14, fontWeight: 700, fontFamily: "'DM Sans', sans-serif", cursor: disabled ? "not-allowed" : "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, width: full ? "100%" : "auto", opacity: disabled ? 0.5 : 1, transition: "transform 0.1s", lineHeight: 1 }}>
      {icon && <Ic n={icon} s={14} c={v.c} />}{children}
    </button>
  );
};

const Label = ({ children }) => (
  <div style={{ fontSize: 9, fontWeight: 700, color: C.grey400, textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 8, marginTop: 14, fontFamily: "'DM Sans', sans-serif" }}>
    {children}
  </div>
);

// Pregnancy week illustration
const BumpIllustration = ({ week }) => {
  const fruits = { 4:"🫘 Beans", 6:"🫐 Blueberry", 8:"🍓 Strawberry", 10:"🍋 Lemon", 12:"🍊 Lime", 14:"🍎 Apple", 16:"🥑 Avocado", 18:"Carrot 🥕", 20:"Corn 🌽", 22:"Aubergine 🍆", 24:"Papaya 🥭", 26:"Lettuce 🥬", 28:"Broccoli 🥦", 30:"Coconut 🥥", 32:"Pineapple 🍍", 34:"Peanuts 🥜", 36:"Olive 🫒", 38:"Pumpkin 🎃", 40:"Melon 🍉" };
  const closest = Object.keys(fruits).reduce((a, b) => Math.abs(b - week) < Math.abs(a - week) ? b : a);
  return (
    <div style={{ textAlign: "center", animation: "float 3s ease-in-out infinite" }}>
      <div style={{ fontSize: 40, marginBottom: 4 }}>{fruits[closest].split(" ")[0]}</div>
      <div style={{ fontSize: 10, color: C.white, opacity: 0.8, fontFamily: "'DM Sans', sans-serif" }}>Baby size: {fruits[closest].split(" ").slice(1).join(" ")}</div>
    </div>
  );
};

const PhoneShell = ({ children, screen }) => (
  <div style={{ width: 375, background: C.cream, borderRadius: 40, boxShadow: "0 20px 60px rgba(0,0,0,0.3), 0 0 0 10px #111, inset 0 0 0 2px #333", overflow: "hidden", position: "relative", height: 740, display: 'flex', flexDirection: 'column' }}>
    {/* Status bar */}
    <div style={{ height: 44, background: screen === "language" ? "#1A2B4A" : C.coral, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", position: "relative", flexShrink: 0 }}>
      <span style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>9:41 AM</span>
      <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", width: 110, height: 22, background: "#000", borderRadius: 11 }} />
      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
        <Ic n="wifi" s={13} c="#fff" />
        <div style={{ display: "flex", gap: 2 }}>
          {[1,2,3,4].map(i => <div key={i} style={{ width: 2, height: 2 + i * 2, background: "#fff", borderRadius: 0.5 }} />)}
        </div>
      </div>
    </div>
    {/* Content Wrapper */}
    <div style={{ flex: 1, overflowY: "auto", position: "relative", background: C.cream }}>
      {children}
    </div>
  </div>
);

const BottomNav = ({ active, nav }) => {
  const tabs = [
    { id: "home", icon: "home", label: "Home" },
    { id: "my-record", icon: "record", label: "My Record" },
    { id: "learn", icon: "learn", label: "Guides" },
    { id: "more", icon: "settings", label: "Settings" }
  ];
  return (
    <div style={{ position: "sticky", bottom: 0, background: C.white, borderTop: `1px solid ${C.grey200}`, display: "flex", padding: "8px 0 10px", flexShrink: 0, zIndex: 10 }}>
      {tabs.map(t => (
        <button key={t.id} onClick={() => nav(t.id)} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
          <Ic n={t.icon} s={20} c={active === t.id ? C.coral : C.grey300} />
          <span style={{ fontSize: 9, fontWeight: active === t.id ? 700 : 400, color: active === t.id ? C.coral : C.grey400 }}>{t.label}</span>
        </button>
      ))}
    </div>
  );
};

// ─── MAIN PATIENT COMPONENT ──────────────────────────────────────────────────
export default function PatientView() {
  const { clients, registerClient, submitPatientCheckIn, updateBirthPlan } = useContext(PlatformContext);
  
  const [screen, setScreen] = useState("language"); // language | welcome | register-mediated | register-self | pin-setup | consent | home | my-record | learn | more | symptom-checkin | symptom-report | birth-plan | kick-counter | mood
  const [selectedClientId, setSelectedClientId] = useState(null); // connected patient ID

  // mediated record search
  const [searchPhone, setSearchPhone] = useState("");
  const [matchedClient, setMatchedClient] = useState(null);
  
  // self registration details
  const [selfName, setSelfName] = useState("");
  const [selfPhone, setSelfPhone] = useState("");
  const [selfAge, setSelfAge] = useState("");
  const [selfLga, setSelfLga] = useState("Surulere");
  const [selfLmp, setSelfLmp] = useState("10 Jan 2026");

  // check-in logs states
  const [checkSymptoms, setCheckSymptoms] = useState([]);
  const [checkMood, setCheckMood] = useState("Happy");
  const [checkKicks, setCheckKicks] = useState("10");

  // Record Tabs
  const [recordTab, setRecordTab] = useState("visits"); // visits | trends | care
  const [openVisitIndex, setOpenVisitIndex] = useState(null);
  const [trendMetric, setTrendMetric] = useState("BP"); // BP | Weight

  // Birth Plan Setup
  const [bpFacility, setBpFacility] = useState("Surulere PHC");
  const [bpTransport, setBpTransport] = useState("Taxify / Uber");
  const [bpCompanion, setBpCompanion] = useState("Mr. James Afolabi");
  const [bpFunds, setBpFunds] = useState(true);

  // default to Adunni (C001) for mock bypass
  const currentClient = clients.find(c => c.id === selectedClientId) || clients.find(c => c.id === "C001") || clients[0];

  // Helper date parsing to get EGA weeks
  const calculateEgaWeeks = (lmpStr) => {
    const lmpDate = new Date(lmpStr || "10 Jan 2026");
    const diff = new Date(2026, 5, 11) - lmpDate; // lock session date (June 11, 2026)
    const diffDays = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return Math.max(Math.floor(diffDays / 7), 1);
  };

  const handlePhoneSearch = () => {
    const cleanPhone = searchPhone.replace(/\s+/g, '');
    const found = clients.find(c => {
      const dbPhone = c.phone.replace(/\s+/g, '').replace('+234', '0');
      return dbPhone.includes(cleanPhone) || cleanPhone.includes(dbPhone);
    });

    if (found) {
      setMatchedClient(found);
    } else {
      alert("No record matching this number. Try registering yourself!");
    }
  };

  const handleSelfRegisterSubmit = () => {
    const newPatient = registerClient(selfName, selfPhone, selfAge, selfLga, selfLmp, []);
    setSelectedClientId(newPatient.id);
    setScreen("pin-setup");
  };

  const getWeekGestation = () => {
    if (!currentClient) return 28;
    return calculateEgaWeeks(currentClient.lmp);
  };

  return (
    <PhoneShell screen={screen}>
      
      {/* ── SCREEN 1: LANGUAGE ── */}
      {screen === "language" && (
        <div style={{ minHeight: "100%", background: `linear-gradient(160deg, ${C.navy} 0%, ${C.coral} 120%)`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <div style={{ animation: "heartbeat 2s infinite", marginBottom: 20 }}>
            <Ic n="heart" s={48} c={C.coralLight} fill="solid" />
          </div>
          <div style={{ fontFamily: "'Fraunces', serif", fontSize: 28, fontWeight: 700, color: C.white, textAlign: "center", marginBottom: 6 }}>AHF Mama</div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.65)", textAlign: "center", marginBottom: 36 }}>Access Heart Foundation · Your pregnancy companion</div>
          
          <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 10 }}>
            {[["English", "English", "🇳🇬"], ["Yoruba", "Yorùbá", "🟡"], ["Pidgin", "Nigerian Pidgin", "🟠"], ["Hausa", "Hausa", "🟢"]].map(([id, label, flag]) => (
              <button key={id} onClick={() => setScreen("welcome")} style={{ background: "rgba(255,255,255,0.12)", border: "1.5px solid rgba(255,255,255,0.25)", borderRadius: 16, padding: "12px 16px", display: "flex", alignItems: "center", gap: 12, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", backdropFilter: "blur(5px)" }}>
                <span style={{ fontSize: 20 }}>{flag}</span>
                <div style={{ textAlign: "left" }}>
                  <div style={{ fontSize: 15, fontWeight: 700, color: C.white }}>{label}</div>
                  {label !== id && <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)" }}>{id}</div>}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── SCREEN 2: WELCOME ── */}
      {screen === "welcome" && (
        <div style={{ minHeight: "100%", padding: 24, display: "flex", flexDirection: "column", justifyContent: 'space-between' }}>
          <div>
            <div style={{ textAlign: "center", margin: "36px 0" }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>🤱🏾</div>
              <div style={{ fontFamily: "'Fraunces', serif", fontSize: 24, fontWeight: 700, color: C.navy, lineHeight: 1.3, marginBottom: 8 }}>
                Welcome to<br/>AHF Mama
              </div>
              <div style={{ fontSize: 13, color: C.grey600, lineHeight: 1.5 }}>
                Your personal pregnancy companion — built with love by Access Heart Foundation
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <button onClick={() => { setMatchedClient(null); setScreen("register-mediated"); }} style={{ background: `linear-gradient(135deg, ${C.coral}, ${C.coralDark})`, border: "none", borderRadius: 18, padding: "16px 14px", display: "flex", alignItems: "center", gap: 12, cursor: "pointer", boxShadow: `0 6px 16px ${C.coral}30` }}>
                <div style={{ width: 38, height: 38, borderRadius: 12, background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🏥</div>
                <div style={{ textAlign: "left", flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: C.white }}>Linked by health clinic or TBA</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.8)" }}>Find and connect to your care record</div>
                </div>
              </button>

              <button onClick={() => setScreen("register-self")} style={{ background: C.white, border: `1.5px solid ${C.grey200}`, borderRadius: 18, padding: "16px 14px", display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}>
                <div style={{ width: 38, height: 38, borderRadius: 12, background: C.coralLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>📱</div>
                <div style={{ textAlign: "left" }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: C.navy }}>I'm registering myself</div>
                  <div style={{ fontSize: 11, color: C.grey400 }}>Start a new companion diary</div>
                </div>
              </button>
            </div>
          </div>

          <div style={{ textAlign: "center", fontSize: 10, color: C.grey400, marginTop: 32 }}>
            Data protected under Nigeria's Data Protection Regulation (NDPR).
          </div>
        </div>
      )}

      {/* ── SCREEN 3: MEDIATED REGISTRATION SEARCH ── */}
      {screen === "register-mediated" && (
        <div>
          <WarmHeader title="Connect Care Record" onBack={() => setScreen("welcome")} />
          <Pad>
            <div style={{ textAlign: "center", padding: "16px 0" }}>
              <div style={{ fontSize: 40, marginBottom: 8 }}>📱</div>
              <div style={{ fontFamily: "'Fraunces', serif", fontSize: 18, color: C.navy, marginBottom: 4 }}>Find your care card</div>
              <div style={{ fontSize: 12, color: C.grey500, lineHeight: 1.4 }}>Enter the phone number you gave your TBA or health worker when registered.</div>
            </div>

            {!matchedClient ? (
              <>
                <div style={{ marginBottom: 12 }}>
                  <Label>Mobile Phone Number</Label>
                  <input value={searchPhone} onChange={e => setSearchPhone(e.target.value)} placeholder="e.g. 0803 456 7890" style={{ width: "100%", background: C.white, border: `1.5px solid ${C.grey200}`, borderRadius: 12, padding: "12px 14px", fontSize: 14, fontFamily: "'DM Sans', sans-serif" }} />
                </div>
                <div style={{ background: C.tealLight, border: `1px solid ${C.tealMid}`, borderRadius: 12, padding: 10, fontSize: 11, color: C.tealDark, marginBottom: 16, lineHeight: 1.4 }}>
                  🔒 We only use your number to link your clinical card. Secure & confidential.
                </div>
                <Btn onClick={handlePhoneSearch} full>Lookup Care Card →</Btn>
              </>
            ) : (
              <div className="animated-fade-up">
                <div style={{ background: C.greenLight, border: `1.5px solid ${C.green}`, borderRadius: 16, padding: 16, textAlign: "center", marginBottom: 16 }}>
                  <div style={{ fontSize: 28, marginBottom: 6 }}>✅</div>
                  <div style={{ fontFamily: "'Fraunces', serif", fontSize: 18, color: C.navy, marginBottom: 2 }}>Welcome, {matchedClient.name}!</div>
                  <div style={{ fontSize: 12, color: C.grey600, marginBottom: 12 }}>We found your clinic records</div>
                  
                  <div style={{ background: C.white, borderRadius: 12, padding: 10, display: "flex", alignItems: "center", gap: 10, marginBottom: 8, textAlign: 'left' }}>
                    <div style={{ fontSize: 20 }}>👩🏾</div>
                    <div>
                      <div style={{ fontSize: 10, color: C.grey400, fontWeight: 700 }}>YOUR HEALTH LINK (TBA)</div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: C.navy }}>{matchedClient.tbaName || "Mama Adunola Fatai"}</div>
                      <div style={{ fontSize: 11, color: C.grey500 }}>{matchedClient.lga} LGA</div>
                    </div>
                  </div>
                  
                  <div style={{ background: C.tealLight, borderRadius: 12, padding: 10, display: "flex", alignItems: "center", gap: 10, border: `1px solid ${C.tealMid}`, textAlign: 'left' }}>
                    <div style={{ fontSize: 20 }}>🏥</div>
                    <div>
                      <div style={{ fontSize: 10, color: C.teal, fontWeight: 700 }}>YOUR DELIVERY CLINIC</div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: C.navy }}>{matchedClient.facilityName || "Surulere PHC"}</div>
                    </div>
                  </div>
                </div>
                <Btn onClick={() => { setSelectedClientId(matchedClient.id); setScreen("pin-setup"); }} full>Confirm and Proceed →</Btn>
              </div>
            )}
          </Pad>
        </div>
      )}

      {/* ── SCREEN: SELF REGISTER ── */}
      {screen === "register-self" && (
        <div>
          <WarmHeader title="Create Diary" onBack={() => setScreen("welcome")} />
          <Pad>
            <Input label="Your Name" value={selfName} onChange={e => setSelfName(e.target.value)} placeholder="Adunni Kemi" />
            <Input label="Your Phone" value={selfPhone} onChange={e => setSelfPhone(e.target.value)} placeholder="0803 456 7890" />
            <div style={{ display: 'flex', gap: 8 }}>
              <div style={{ flex: 1 }}><Input label="Age" value={selfAge} onChange={e => setSelfAge(e.target.value)} placeholder="26" type="number" /></div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 9, fontWeight: 700, color: C.grey400, textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 8, marginTop: 14 }}>LGA</div>
                <select value={selfLga} onChange={e => setSelfLga(e.target.value)} style={{ width: "100%", background: C.white, border: `1.5px solid ${C.grey200}`, borderRadius: 12, padding: "12px 14px", fontSize: 14, fontFamily: "'DM Sans', sans-serif" }}>
                  <option>Surulere</option><option>Ikeja</option><option>Alimosho</option>
                </select>
              </div>
            </div>
            <Input label="Last Menstrual Period (LMP)" value={selfLmp} onChange={e => setSelfLmp(e.target.value)} placeholder="10 Jan 2026" />
            <Btn onClick={handleSelfRegisterSubmit} full>Register Account →</Btn>
          </Pad>
        </div>
      )}

      {/* ── SCREEN: PIN SETUP ── */}
      {screen === "pin-setup" && (
        <div style={{ minHeight: "100%", display: "flex", flexDirection: "column", justifyHeight: 'space-between' }}>
          <WarmHeader title="Setup PIN" />
          <Pad style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>🔐</div>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 20, color: C.navy, marginBottom: 4 }}>Secure your details</div>
            <div style={{ fontSize: 12, color: C.grey500, marginBottom: 24, textAlign: 'center' }}>Create a 4-digit security PIN to log in safely</div>
            
            <div style={{ display: 'flex', gap: 10, marginBottom: 24 }}>
              {[1,2,3,4].map(i => (
                <div key={i} style={{ width: 44, height: 44, borderRadius: 12, border: `2px solid ${C.coral}`, background: C.white, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: 8, height: 8, borderRadius: 4, background: C.coral }} />
                </div>
              ))}
            </div>
            
            <Btn onClick={() => setScreen("consent")} full>Save PIN & Continue</Btn>
          </Pad>
        </div>
      )}

      {/* ── SCREEN: CONSENT ── */}
      {screen === "consent" && (
        <div>
          <WarmHeader title="Your Privacy" />
          <Pad>
            <div style={{ fontSize: 32, textAlign: "center", marginBottom: 12 }}>🛡️</div>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 18, color: C.navy, textAlign: "center", marginBottom: 16 }}>Privacy Agreement (NDPR)</div>
            
            {[
              ["📋","Care Card Record","Your clinical metrics are stored safely for Surulere Health Center team to coordinate your delivery."],
              ["📊","Self-check Logs","Daily symptoms, kick counts, and mood details are completely private, unless flagged as high-risk."],
              ["🔬","Anonymised Research","We strip details (name, phone) when reporting aggregated health status to MoH."]
            ].map(([ic, t, b]) => (
              <div key={t} style={{ background: C.white, borderRadius: 14, padding: 12, marginBottom: 8, display: 'flex', gap: 10 }}>
                <span style={{ fontSize: 18 }}>{ic}</span>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: C.navy, marginBottom: 2 }}>{t}</div>
                  <div style={{ fontSize: 11, color: C.grey600, lineHeight: 1.4 }}>{b}</div>
                </div>
              </div>
            ))}

            <button onClick={() => setScreen("home")} style={{ background: C.coral, color: C.white, border: 'none', borderRadius: 14, padding: 14, width: '100%', fontSize: 14, fontWeight: 700, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", marginTop: 12 }}>
              I Agree & Consent
            </button>
          </Pad>
        </div>
      )}

      {/* ── SCREEN: HOME ── */}
      {screen === "home" && (
        <div>
          <div style={{ background: `linear-gradient(135deg, ${C.coral} 0%, ${C.coralDark} 100%)`, padding: "16px 16px 32px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
              <div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)" }}>Welcome back,</div>
                <div style={{ fontFamily: "'Fraunces', serif", fontSize: 20, color: C.white }}>{currentClient.name.split(" ")[0]} 🌸</div>
              </div>
              <div style={{ position: "relative" }}>
                <button style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(255,255,255,0.2)", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: 'pointer' }}><Ic n="bell" s={18} c={C.white} /></button>
                <div style={{ position: "absolute", top: -2, right: -2, width: 12, height: 12, borderRadius: 6, background: C.amber, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, fontWeight: 700, color: C.navy }}>1</div>
              </div>
            </div>

            <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: 16, padding: "12px 14px", display: "flex", alignItems: "center", gap: 14 }}>
              <BumpIllustration week={getWeekGestation()} />
              <div style={{ borderLeft: '1px solid rgba(255,255,255,0.2)', paddingLeft: 14 }}>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.7)" }}>PREGNANCY GESTATION</div>
                <div style={{ fontFamily: "'Fraunces', serif", fontSize: 32, fontWeight: 700, color: C.white, lineHeight: 1 }}>Week {getWeekGestation()}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.8)", marginTop: 4 }}>EDD: {currentClient.edd}</div>
              </div>
            </div>
          </div>

          {/* Quick daily task banner */}
          <div style={{ margin: "-16px 12px 0", position: "relative", zIndex: 2 }}>
            <button onClick={() => setScreen("symptom-checkin")} style={{ width: "100%", background: C.white, border: "none", borderRadius: 16, padding: 12, boxShadow: "0 6px 16px rgba(0,0,0,0.08)", cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ fontSize: 18 }}>🩺</div>
              <div style={{ flex: 1, textAlign: "left" }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.navy }}>Daily Health Log</div>
                <div style={{ fontSize: 11, color: C.grey400 }}>60 seconds check-in • Tap to log</div>
              </div>
              <div style={{ width: 8, height: 8, borderRadius: 4, background: C.coral }} />
            </button>
          </div>

          <Pad style={{ paddingTop: 16 }}>
            {/* Urgent Report Button */}
            <button onClick={() => setScreen("symptom-report")} style={{ width: "100%", background: `linear-gradient(135deg, ${C.red}, #C0392B)`, border: "none", borderRadius: 16, padding: 14, display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", marginBottom: 12, boxShadow: `0 6px 12px ${C.red}30` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Ic n="alert" s={20} c={C.white} />
                <div style={{ textAlign: "left" }}>
                  <div style={{ fontSize: 14, fontWeight: 800, color: C.white }}>Report Symptom Alert</div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.75)" }}>Tap to notify your TBA immediately</div>
                </div>
              </div>
              <Ic n="arrow" s={16} c={C.white} />
            </button>

            {/* Quick grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
              {[
                { icon: "🏥", label: "My Birth Plan", sub: "Plan facility delivery", scr: "birth-plan" },
                { icon: "🦶", label: "Kick Counter", sub: "Count baby's kicks", scr: "kick-counter" },
                { icon: "😊", label: "Mood Today", sub: "Mood status checker", scr: "mood" },
                { icon: "📚", label: "Gestation Guides", sub: "Weeks information", scr: "learn" }
              ].map(item => (
                <button key={item.label} onClick={() => setScreen(item.scr)} style={{ background: C.white, borderRadius: 16, padding: 12, border: "none", cursor: "pointer", textAlign: "left", boxShadow: "0 2px 10px rgba(0,0,0,0.03)", fontFamily: "'DM Sans', sans-serif" }}>
                  <div style={{ fontSize: 20, marginBottom: 4 }}>{item.icon}</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: C.navy }}>{item.label}</div>
                  <div style={{ fontSize: 10, color: C.grey400, marginTop: 1 }}>{item.sub}</div>
                </button>
              ))}
            </div>

            {/* Care details card */}
            <Card style={{ background: C.tealLight, border: `1px solid ${C.tealMid}`, marginBottom: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ fontSize: 24 }}>🏥</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 9, color: C.teal, fontWeight: 700 }}>DELIVERY CENTER</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: C.tealDark }}>{currentClient.facilityName || "Surulere PHC"}</div>
                  <div style={{ fontSize: 10, color: C.teal }}>Skilled staff birth facility • 2.4 km</div>
                </div>
                <button onClick={() => setScreen("birth-plan")} style={{ background: C.teal, border: "none", borderRadius: 8, padding: "6px 10px", cursor: "pointer", fontSize: 11, fontWeight: 700, color: C.white, fontFamily: "'DM Sans', sans-serif" }}>Edit</button>
              </div>
            </Card>

            <Card style={{ background: C.white, border: `1px solid ${C.grey200}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ fontSize: 22 }}>👩🏾</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 9, color: C.grey400, fontWeight: 700 }}>TBA HEALTH LINK</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: C.navy }}>{currentClient.tbaName || "Mama Adunola Fatai"}</div>
                  <div style={{ fontSize: 10, color: C.grey400 }}>Surulere LGA Link</div>
                </div>
                <button onClick={() => alert(`Calling TBA: ${currentClient.tbaName || 'Mama Adunola Fatai'}`)} style={{ background: C.coralLight, border: "none", borderRadius: 10, width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                  <Ic n="phone" s={14} c={C.coral} />
                </button>
              </div>
            </Card>

          </Pad>
          <BottomNav active="home" nav={setScreen} />
        </div>
      )}

      {/* ── SCREEN: MY RECORD ── */}
      {screen === "my-record" && (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
          <WarmHeader title="My Record" subtitle="Personal pregnancy progress" />
          <Pad style={{ flex: 1 }}>
            {/* Risk banner for raised BP/swelling */}
            {currentClient.visits?.some(v => v.flag === 'Watch') && (
              <div style={{ background: C.amberLight, border: `1px solid ${C.amber}`, borderRadius: 12, padding: 10, marginBottom: 12, display: "flex", gap: 8 }}>
                <span style={{ fontSize: 14 }}>⚠️</span>
                <div style={{ fontSize: 11, color: C.grey600, lineHeight: 1.4 }}>
                  <b>Observation from last visit:</b> Raise BP/swelling noticed. Monitor signs daily.
                </div>
              </div>
            )}

            {/* Tab Swticher */}
            <div style={{ display: "flex", gap: 4, background: C.grey100, borderRadius: 12, padding: 3, marginBottom: 12 }}>
              {["visits", "trends", "care"].map(t => (
                <button key={t} onClick={() => setRecordTab(t)} style={{ flex: 1, padding: "8px 0", borderRadius: 8, border: "none", background: recordTab === t ? C.white : "transparent", color: recordTab === t ? C.coral : C.grey600, fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
                  {t.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Visits List */}
            {recordTab === "visits" && (
              <div>
                <Label>Clinic Visit Logs (Tap to expand)</Label>
                {currentClient.visits && currentClient.visits.length > 0 ? (
                  currentClient.visits.map((v, idx) => {
                    const expanded = openVisitIndex === idx;
                    return (
                      <Card key={idx} onClick={() => setOpenVisitIndex(expanded ? null : idx)} style={{ marginBottom: 6, padding: 12, border: `1px solid ${v.flag === 'Watch' ? C.amber : C.grey200}` }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            <div style={{ fontSize: 12, fontWeight: 700, color: C.navy }}>ANC Visit {v.n}</div>
                            <div style={{ fontSize: 10, color: C.grey400 }}>{v.date} · EGA {v.ega}</div>
                          </div>
                          <Pill color={v.flag === 'Watch' ? C.amber : C.green}>{v.flag === 'Watch' ? "Watch" : "Normal"}</Pill>
                        </div>
                        {expanded && (
                          <div className="animated-fade-up" style={{ marginTop: 10, borderTop: `1px solid ${C.grey100}`, paddingTop: 8 }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                              {[["BP", v.bp], ["Weight", v.weight], ["Heart Rate", v.fhr], ["Swelling", v.oedema]].map(([lbl, val]) => (
                                <div key={lbl} style={{ background: C.cream, borderRadius: 8, padding: 6 }}>
                                  <span style={{ fontSize: 9, color: C.grey400, fontWeight: 600 }}>{lbl}</span>
                                  <div style={{ fontSize: 12, fontWeight: 700, color: C.navy }}>{val}</div>
                                </div>
                              ))}
                            </div>
                            <div style={{ fontSize: 11, color: C.grey600, marginTop: 8, background: '#FFFDF9', padding: 8, borderRadius: 6 }}>
                              <b>Worker Note:</b> {v.note}
                            </div>
                          </div>
                        )}
                      </Card>
                    );
                  })
                ) : (
                  <div style={{ color: C.grey400, fontSize: 12, textAlign: 'center', padding: 24 }}>No clinics visits synced yet.</div>
                )}
              </div>
            )}

            {/* Trends Tab */}
            {recordTab === "trends" && (
              <div>
                <Label>Gestation Measurements Trends</Label>
                <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
                  {["BP", "Weight"].map(m => (
                    <button key={m} onClick={() => setTrendMetric(m)} style={{ flex: 1, padding: "6px 0", borderRadius: 8, border: `1.5px solid ${trendMetric === m ? C.coral : C.grey200}`, background: trendMetric === m ? C.coralLight : C.white, fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>{m}</button>
                  ))}
                </div>

                <Card>
                  <div style={{ fontSize: 12, fontWeight: 700, color: C.navy, marginBottom: 8 }}>{trendMetric === "BP" ? "BP Systolic (mmHg)" : "Weight Gain Progress (kg)"}</div>
                  {/* Basic custom SVG sparkline representing mock patient weight/BP gain */}
                  <svg width="100%" height="100" viewBox="0 0 100 50" style={{ overflow: 'visible' }}>
                    <path d={trendMetric === "BP" ? "M 10 35 L 30 32 L 50 28 L 70 24 L 90 18" : "M 10 40 L 30 36 L 50 32 L 70 28 L 90 22"} fill="none" stroke={C.coral} strokeWidth="3" strokeLinecap="round" />
                    {[1, 2, 3, 4, 5].map((x, idx) => (
                      <circle key={idx} cx={10 + idx * 20} cy={trendMetric === "BP" ? 35 - idx * 4 : 40 - idx * 4} r="3" fill={C.white} stroke={C.coral} strokeWidth="2" />
                    ))}
                  </svg>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9, color: C.grey400, marginTop: 12 }}>
                    <span>ANC 1</span><span>ANC 2</span><span>ANC 3</span><span>ANC 4</span><span>ANC 5</span>
                  </div>
                </Card>
              </div>
            )}

            {/* Care Guidance Tab */}
            {recordTab === "care" && (
              <div>
                <Label>Prenatal Health Tips</Label>
                {["Take iron/folic supplements daily.", "Attend all scheduled clinic contacts.", "Draft your facility birth plan.", "Rest, stay hydrated, and eat well."].map((tip, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, padding: 10, background: C.white, borderRadius: 10, marginBottom: 6, fontSize: 12, color: C.grey700 }}>
                    <span>💡</span><span>{tip}</span>
                  </div>
                ))}
              </div>
            )}

          </Pad>
          <BottomNav active="my-record" nav={setScreen} />
        </div>
      )}

      {/* ── SCREEN: GUIDE/LEARN ── */}
      {screen === "learn" && (
        <div>
          <WarmHeader title="Gestation Guide" subtitle={`Week ${getWeekGestation()} resources`} />
          <Pad>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                ["🥑", "Week 28: Third Trimester Begins", "You are entering the final stretch. Baby's eyelids are open now, and lungs are mature."],
                ["🍎", "Nutrition: Iron rich meals", "Keep up with green vegetables, fish, beans, and meat. Continue taking your daily iron supplements."],
                ["🤰", "Facility delivery preparation", "Make sure your birth plan is finalized. Confirm who will escort you to Surulere PHC."]
              ].map(([emoji, title, desc]) => (
                <Card key={title}>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 6 }}>
                    <span style={{ fontSize: 24 }}>{emoji}</span>
                    <div style={{ fontSize: 13, fontWeight: 700, color: C.navy }}>{title}</div>
                  </div>
                  <div style={{ fontSize: 11, color: C.grey600, lineHeight: 1.4 }}>{desc}</div>
                </Card>
              ))}
            </div>
          </Pad>
          <BottomNav active="learn" nav={setScreen} />
        </div>
      )}

      {/* ── SCREEN: MORE / SETTINGS ── */}
      {screen === "more" && (
        <div>
          <WarmHeader title="Settings" />
          <Pad>
            <Card style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div style={{ width: 44, height: 44, borderRadius: 22, background: C.coralLight, fontSize: 20, display: "flex", alignItems: "center", justifyContent: "center" }}>🤰</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: C.navy }}>{currentClient.name}</div>
                <div style={{ fontSize: 11, color: C.grey400 }}>{currentClient.phone}</div>
              </div>
            </Card>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                ["⚙️", "Profile details", () => alert("Profile Details")],
                ["🌐", "Language preference", () => setScreen("language")],
                ["📋", "Consents & NDPR Details", () => setScreen("consent")],
                ["🔒", "Security PIN setup", () => setScreen("pin-setup")],
                ["🚪", "Disconnect / Log out", () => setScreen("language")]
              ].map(([ic, label, click]) => (
                <button key={label} onClick={click} style={{ width: '100%', background: C.white, border: 'none', padding: 14, borderRadius: 12, textAlign: 'left', display: 'flex', justifyContent: 'space-between', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
                  <div style={{ display: 'flex', gap: 10, fontSize: 13, color: C.grey800, fontWeight: 600 }}><span>{ic}</span><span>{label}</span></div>
                  <span style={{ color: C.grey300 }}>➔</span>
                </button>
              ))}
            </div>
          </Pad>
          <BottomNav active="more" nav={setScreen} />
        </div>
      )}

      {/* ── SCREEN: DAILY SYMPTOM CHECKIN ── */}
      {screen === "symptom-checkin" && (
        <div>
          <WarmHeader title="Daily Health Log" onBack={() => setScreen("home")} />
          <Pad>
            <div style={{ fontSize: 12, color: C.grey600, marginBottom: 10 }}>Select any symptoms you feel today:</div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 14 }}>
              {["Headache", "Swollen Ankles", "Tiredness", "Nausea", "None"].map(symp => {
                const checked = checkSymptoms.includes(symp);
                return (
                  <button key={symp} onClick={() => setCheckSymptoms(prev => prev.includes(symp) ? prev.filter(x => x !== symp) : [...prev, symp])} style={{ display: 'flex', gap: 10, padding: 10, borderRadius: 10, border: `1.5px solid ${checked ? C.coral : C.grey100}`, background: checked ? C.coralLight : C.white, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", textAlign: 'left' }}>
                    <div style={{ width: 16, height: 16, border: `2px solid ${checked ? C.coral : C.grey300}`, background: checked ? C.coral : C.white, borderRadius: 4 }} />
                    <span style={{ fontSize: 12, color: C.grey800 }}>{symp}</span>
                  </button>
                );
              })}
            </div>

            <div style={{ marginBottom: 14 }}>
              <Label>How are you feeling today?</Label>
              <select value={checkMood} onChange={e => setCheckMood(e.target.value)} style={{ width: '100%', background: C.white, border: `1.5px solid ${C.grey200}`, borderRadius: 12, padding: 10, fontSize: 13, fontFamily: "'DM Sans', sans-serif" }}>
                <option>Happy & energetic</option><option>Tired</option><option>Anxious / Moody</option>
              </select>
            </div>

            <div style={{ marginBottom: 16 }}>
              <Label>Baby Kicks (Last 12 Hours)</Label>
              <input value={checkKicks} onChange={e => setCheckKicks(e.target.value)} type="number" style={{ width: '100%', background: C.white, border: `1.5px solid ${C.grey200}`, borderRadius: 12, padding: 10, fontSize: 13, fontFamily: "'DM Sans', sans-serif" }} />
            </div>

            <Btn onClick={() => {
              submitPatientCheckIn(currentClient.id, checkSymptoms, checkMood, checkKicks);
              setCheckSymptoms([]);
              setScreen("home");
            }} full>Submit Daily Log</Btn>
          </Pad>
        </div>
      )}

      {/* ── SCREEN: CRITICAL SYMPTOM REPORT ── */}
      {screen === "symptom-report" && (
        <div>
          <WarmHeader title="Report Danger Signs" onBack={() => setScreen("home")} />
          <Pad>
            <div style={{ background: C.redLight, border: `1.5px solid ${C.red}`, borderRadius: 12, padding: 10, color: C.red, fontSize: 11, lineHeight: 1.4, marginBottom: 12 }}>
              ⚠️ <b>WARNING:</b> If you check any signs below, your TBA Mama Adunola Fatai and Surulere health center will be alerted immediately!
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
              {["Severe headache / blurred vision", "Heavy vaginal bleeding", "Facial/hand swelling (oedema)", "Convulsions or fitting"].map(symp => {
                const checked = checkSymptoms.includes(symp);
                return (
                  <button key={symp} onClick={() => setCheckSymptoms(prev => prev.includes(symp) ? prev.filter(x => x !== symp) : [...prev, symp])} style={{ display: 'flex', gap: 10, padding: 10, borderRadius: 10, border: `1.5px solid ${checked ? C.red : C.grey100}`, background: checked ? C.redLight : C.white, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", textAlign: 'left' }}>
                    <div style={{ width: 16, height: 16, border: `2px solid ${checked ? C.red : C.grey300}`, background: checked ? C.red : C.white, borderRadius: 4 }} />
                    <span style={{ fontSize: 12, color: C.grey800 }}>{symp}</span>
                  </button>
                );
              })}
            </div>

            <Btn onClick={() => {
              submitPatientCheckIn(currentClient.id, checkSymptoms, "Anxious", currentClient.kickCount);
              setCheckSymptoms([]);
              alert("🚨 DANGER ALERT LOGGED! A referral warning has been sent to your TBA worker and the admin dashboard.");
              setScreen("home");
            }} variant="red" full>ALERT MY TBA WORKER</Btn>
          </Pad>
        </div>
      )}

      {/* ── SCREEN: BIRTH PLAN SETUP ── */}
      {screen === "birth-plan" && (
        <div>
          <WarmHeader title="My Birth Plan" onBack={() => setScreen("home")} />
          <Pad>
            <div style={{ fontSize: 12, color: C.grey600, marginBottom: 12 }}>Configure your delivery choices:</div>
            
            <Input label="Escort Companion Name" value={bpCompanion} onChange={e => setBpCompanion(e.target.value)} placeholder="e.g. Mr. James Afolabi" />
            <Input label="Transportation Mode" value={bpTransport} onChange={e => setBpTransport(e.target.value)} placeholder="e.g. Uber / Taxify / Local taxi" />
            <Input label="Target Birth Facility" value={bpFacility} onChange={e => setBpFacility(e.target.value)} placeholder="e.g. Surulere PHC" />
            
            <button onClick={() => setBpFunds(!bpFunds)} style={{ display: 'flex', gap: 10, padding: 12, borderRadius: 12, border: `1.5px solid ${bpFunds ? C.teal : C.grey200}`, background: bpFunds ? C.tealLight : C.white, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", width: '100%', marginBottom: 20, textAlign: 'left' }}>
              <div style={{ width: 18, height: 18, border: `2px solid ${bpFunds ? C.teal : C.grey300}`, background: bpFunds ? C.teal : C.white, borderRadius: 4 }} />
              <span style={{ fontSize: 12, color: C.grey800 }}>I have saved emergency funds for travel costs</span>
            </button>

            <Btn onClick={() => {
              updateBirthPlan(currentClient.id, { facility: bpFacility, transport: bpTransport, companion: bpCompanion, fundsSaved: bpFunds });
              setScreen("home");
            }} variant="teal" full>Save My Birth Plan</Btn>
          </Pad>
        </div>
      )}

      {/* ── SCREEN: KICK COUNTER ── */}
      {screen === "kick-counter" && (
        <div>
          <WarmHeader title="Kick Counter" onBack={() => setScreen("home")} />
          <Pad style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🦶</div>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 20, color: C.navy, marginBottom: 4 }}>Count baby's kicks</div>
            <div style={{ fontSize: 12, color: C.grey500, marginBottom: 20 }}>
              Track movements. Call TBA if you count fewer than 10 kicks in 2 hours.
            </div>

            <div style={{ background: C.white, borderRadius: 24, padding: 24, boxShadow: '0 4px 16px rgba(0,0,0,0.03)', display: 'inline-block', marginBottom: 20 }}>
              <div style={{ fontSize: 11, color: C.grey400 }}>KICKS RECORDED</div>
              <div style={{ fontSize: 52, fontWeight: 800, color: C.coral, margin: "8px 0" }}>{currentClient.kickCount}</div>
              <button onClick={() => {
                const count = currentClient.kickCount + 1;
                submitPatientCheckIn(currentClient.id, [], currentClient.mood || "Happy", count);
              }} style={{ background: C.coral, border: 'none', width: 64, height: 64, borderRadius: 32, color: C.white, fontSize: 28, cursor: 'pointer', outline: 'none' }}>+</button>
            </div>
            
            <Btn onClick={() => setScreen("home")} full>Complete Count Session</Btn>
          </Pad>
        </div>
      )}

      {/* ── SCREEN: MOOD LOGGER ── */}
      {screen === "mood" && (
        <div>
          <WarmHeader title="Mood Journal" onBack={() => setScreen("home")} />
          <Pad style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>😊</div>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 18, color: C.navy, marginBottom: 12 }}>How are you feeling today?</div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
              {[["😊", "Happy & Energetic"], ["😴", "Tired / Fatigued"], ["😰", "Anxious"], ["😔", "Low / Sad"]].map(([em, lbl]) => (
                <button key={lbl} onClick={() => {
                  submitPatientCheckIn(currentClient.id, [], lbl, currentClient.kickCount);
                  setScreen("home");
                }} style={{ background: C.white, border: `1.5px solid ${currentClient.mood === lbl ? C.coral : C.grey100}`, borderRadius: 16, padding: 16, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>
                  <div style={{ fontSize: 24, marginBottom: 4 }}>{em}</div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: C.navy }}>{lbl}</div>
                </button>
              ))}
            </div>
          </Pad>
        </div>
      )}

    </PhoneShell>
  );
}
