import React, { createContext, useState, useEffect } from 'react';

export const PlatformContext = createContext();

// Preloaded TBA active data for the Admin Dashboard
const INITIAL_TBAS_ACTIVE = [
  { name: "Mama Adunola Fatai", lga: "Surulere", clients: 23, deliveries: 6, training: 75, status: "Active" },
  { name: "Mama Chiamaka Eze",  lga: "Mushin",   clients: 31, deliveries: 9, training: 100, status: "Active" },
  { name: "Mama Yetunde Alabi",  lga: "Ikeja",    clients: 18, deliveries: 4, training: 63, status: "Active" },
  { name: "Mama Ngozi Nwosu",    lga: "Kosofe",   clients: 27, deliveries: 7, training: 88, status: "Active" },
  { name: "Mama Fatimah Bello",  lga: "Alimosho", clients: 14, deliveries: 3, training: 38, status: "At Risk" },
  { name: "Mama Grace Okafor",   lga: "Ajeromi",  clients: 9,  deliveries: 2, training: 25, status: "Inactive" },
];

// Preloaded clients (synced between TBA app and Patient app)
const INITIAL_CLIENTS = [
  {
    id: "C001",
    name: "Adunni Kemi Afolabi",
    age: 26,
    ega: "28 wks",
    edd: "12 Aug 2026",
    risk: "NORMAL",
    phone: "0803 456 7890",
    lga: "Surulere",
    lmp: "10 Jan 2026",
    gravida: 1,
    parity: 0,
    conditions: [],
    maritalStatus: "Married",
    education: "Secondary",
    occupation: "Trader",
    address: "12 Balogun Street, Surulere, Lagos",
    tribe: "Yoruba",
    bloodGroup: "O+",
    genotype: "AA",
    tbaName: "Mama Adunola Fatai",
    facilityName: "Surulere PHC",
    visits: [
      { n: 1, date: "18 Feb 2026", ega: "9 wks", bp: "110/72", weight: "64kg", fundal: "—", fhr: "—", oedema: "None", urine: "Negative", treatments: ["Folic acid", "Booking bloods taken"], note: "First contact. All normal. Birth plan started.", flag: "Normal" },
      { n: 2, date: "18 Mar 2026", ega: "13 wks", bp: "114/74", weight: "65.5kg", fundal: "—", fhr: "148 bpm", oedema: "None", urine: "Negative", treatments: ["Iron / folic acid", "TT1 given"], note: "Good progress. FHR heard.", flag: "Normal" },
      { n: 3, date: "14 Apr 2026", ega: "17 wks", bp: "118/76", weight: "67kg", fundal: "17 cm", fhr: "150 bpm", oedema: "None", urine: "Negative", treatments: ["Iron / folic acid", "IPT1 (malaria)"], note: "Normal. Foetal movement felt.", flag: "Normal" },
      { n: 4, date: "12 May 2026", ega: "24 wks", bp: "122/78", weight: "68.5kg", fundal: "24 cm", fhr: "146 bpm", oedema: "None", urine: "Negative", treatments: ["Iron / folic acid", "TT2 given", "IPT2 (malaria)"], note: "Normal. Glucose check normal.", flag: "Normal" },
      { n: 5, date: "15 May 2026", ega: "28 wks", bp: "128/84", weight: "70kg", fundal: "28 cm", fhr: "148 bpm", oedema: "Mild (feet)", urine: "Trace", treatments: ["Iron / folic acid"], note: "Mild ankle swelling and trace protein noted. BP slightly raised — to monitor closely. Advised to report headache, blurred vision or worsening swelling immediately.", flag: "Watch" }
    ],
    dailyCheckIns: [],
    kickCount: 0,
    mood: "",
    birthPlan: {
      facility: "Surulere PHC",
      transport: "Taxify / Uber",
      companion: "Mr. James Afolabi",
      fundsSaved: true,
      emergencyContact: "0807 654 3210"
    }
  },
  {
    id: "C002",
    name: "Bisi Adeyemi",
    age: 31,
    ega: "34 wks",
    edd: "28 Jun 2026",
    risk: "HIGH",
    phone: "0802 234 5678",
    lga: "Surulere",
    lmp: "20 Oct 2025",
    gravida: 3,
    parity: 2,
    conditions: ["Hypertension", "Previous C-Section"],
    maritalStatus: "Married",
    education: "Secondary",
    occupation: "Trader",
    address: "24 Adeyemi Way, Surulere, Lagos",
    tribe: "Yoruba",
    bloodGroup: "A+",
    genotype: "AS",
    tbaName: "Mama Adunola Fatai",
    facilityName: "Surulere PHC",
    visits: [
      { n: 1, date: "15 Dec 2025", ega: "8 wks", bp: "120/80", weight: "72kg", fundal: "—", fhr: "—", oedema: "None", urine: "Negative", treatments: ["Folic acid"], note: "Booking. Elevated baseline risk.", flag: "Normal" },
      { n: 2, date: "12 Jan 2026", ega: "12 wks", bp: "122/82", weight: "73kg", fundal: "—", fhr: "—", oedema: "None", urine: "Negative", treatments: ["Iron / folic acid"], note: "Normal progress.", flag: "Normal" },
      { n: 3, date: "09 Feb 2026", ega: "16 wks", bp: "125/85", weight: "75kg", fundal: "16 cm", fhr: "144 bpm", oedema: "Mild (feet)", urine: "Negative", treatments: ["IPT1"], note: "Monitor BP.", flag: "Watch" }
    ],
    dailyCheckIns: [
      { date: "10 Jun 2026", symptoms: ["Severe headache", "Facial/hand swelling (oedema)"], mood: "Anxious", checked: true }
    ],
    kickCount: 8,
    mood: "Anxious",
    birthPlan: {
      facility: "Gbagada General Hospital",
      transport: "Husband's car",
      companion: "Mr. Adeyemi",
      fundsSaved: true,
      emergencyContact: "0802 999 8888"
    }
  },
  { id: "C003", name: "Titi Ogun", age: 22, ega: "16 wks", edd: "3 Nov 2026", risk: "NORMAL", phone: "0901 123 4567", lga: "Surulere", lmp: "20 Mar 2026", gravida: 1, parity: 0, conditions: [], tbaName: "Mama Adunola Fatai", facilityName: "Surulere PHC", visits: [], dailyCheckIns: [], kickCount: 0, mood: "" },
  { id: "C004", name: "Ngozi Eze", age: 28, ega: "8 wks", edd: "14 Jan 2027", risk: "ELEVATED", phone: "0805 678 9012", lga: "Surulere", lmp: "12 May 2026", gravida: 2, parity: 1, conditions: [], tbaName: "Mama Adunola Fatai", facilityName: "Surulere PHC", visits: [], dailyCheckIns: [], kickCount: 0, mood: "" },
  { id: "C005", name: "Aminat Yusuf", age: 24, ega: "36 wks", edd: "5 Jun 2026", risk: "NORMAL", phone: "0807 890 1234", lga: "Surulere", lmp: "5 Sep 2025", gravida: 2, parity: 1, conditions: [], tbaName: "Mama Adunola Fatai", facilityName: "Surulere PHC", visits: [], dailyCheckIns: [], kickCount: 0, mood: "" },
];

const INITIAL_ALERTS = [
  { id: "A001", level: "CRITICAL", title: "3 LGAs with <50% training completion", body: "Ajeromi, Kosofe, Alimosho — immediate intervention required. 41 TBAs untrained.", color: "#D32F2F", bg: "#FFEBEE", type: "system" },
  { id: "A002", level: "HIGH", title: "High maternal death rate in Alimosho", body: "4 deaths this period vs programme average of 1.8. CHEW supervisor review needed.", color: "#E65100", bg: "#FFF3E0", type: "system" },
  { id: "A003", level: "MEDIUM", title: "22 Mama Bags due for refresh", body: "Bags due in next 30 days across 6 LGAs. Coordinate with logistics team.", color: "#F9A825", bg: "#FFFDE7", type: "system" },
  { id: "A004", level: "HIGH", title: "Danger symptoms reported: Bisi Adeyemi", body: "Bisi Adeyemi (Surulere LGA) reported severe headache & swelling. Immediate TBA check-in advised.", color: "#E65100", bg: "#FFF3E0", type: "patient", clientId: "C002" },
];

const INITIAL_LGA_DATA = [
  { name: "Surulere",    tbas: 28, clients: 312, deliveries: 47, referrals: 18, deaths: 1, completion: 82, risk: "LOW" },
  { name: "Ikeja",       tbas: 34, clients: 398, deliveries: 61, referrals: 22, deaths: 2, completion: 76, risk: "LOW" },
  { name: "Alimosho",    tbas: 19, clients: 287, deliveries: 38, referrals: 31, deaths: 4, completion: 61, risk: "HIGH" },
  { name: "Eti-Osa",     tbas: 22, clients: 201, deliveries: 29, referrals: 11, deaths: 0, completion: 91, risk: "LOW" },
  { name: "Kosofe",      tbas: 16, clients: 178, deliveries: 24, referrals: 19, deaths: 3, completion: 54, risk: "HIGH" },
  { name: "Mushin",      tbas: 31, clients: 356, deliveries: 52, referrals: 28, deaths: 2, completion: 70, risk: "MEDIUM" },
  { name: "Oshodi-Isolo", tbas: 25, clients: 291, deliveries: 41, referrals: 24, deaths: 2, completion: 67, risk: "MEDIUM" },
  { name: "Agege",       tbas: 18, clients: 209, deliveries: 31, referrals: 16, deaths: 1, completion: 78, risk: "LOW" },
  { name: "Ajeromi",     tbas: 14, clients: 163, deliveries: 22, referrals: 14, deaths: 3, completion: 49, risk: "HIGH" },
  { name: "Lagos Island", tbas: 12, clients: 142, deliveries: 19, referrals: 8,  deaths: 0, completion: 88, risk: "LOW" },
];

export const PlatformProvider = ({ children }) => {
  const [clients, setClients] = useState(INITIAL_CLIENTS);
  const [alerts, setAlerts] = useState(INITIAL_ALERTS);
  const [tbaActivity, setTbaActivity] = useState(INITIAL_TBAS_ACTIVE);
  const [lgaData, setLgaData] = useState(INITIAL_LGA_DATA);
  const [referralCount, setReferralCount] = useState(261);
  const [deliveryCount, setDeliveryCount] = useState(364);
  const [maternalDeaths, setMaternalDeaths] = useState(18);

  const [activeReferrals, setActiveReferrals] = useState([
    { id: "R001", clientId: "C002", clientName: "Bisi Adeyemi", facility: "Gbagada General Hospital", urgency: "Emergency", status: "INITIATED", date: "11 Jun 2026" }
  ]);

  // Operations
  const registerClient = (name, phone, age, lga, lmp, conditions) => {
    // Generate id
    const newId = `C0${clients.length + 1}`;
    
    // Automatically determine risk based on conditions
    let risk = "NORMAL";
    if (conditions.includes("Hypertension") || conditions.includes("Diabetes") || conditions.includes("Previous C-Section")) {
      risk = "HIGH";
    } else if (conditions.length > 0 && !conditions.includes("None")) {
      risk = "ELEVATED";
    }

    const eddDate = new Date();
    eddDate.setDate(eddDate.getDate() + 280); // Quick EDD approximation
    const eddStr = eddDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

    const newClient = {
      id: newId,
      name,
      phone,
      age: parseInt(age) || 25,
      lga,
      lmp,
      ega: "12 wks",
      edd: eddStr,
      risk,
      conditions,
      maritalStatus: "Married",
      education: "Secondary",
      occupation: "Trader",
      address: "Lagos community address",
      tribe: "Yoruba",
      bloodGroup: "Unknown",
      genotype: "Unknown",
      tbaName: "Mama Adunola Fatai",
      facilityName: `${lga} Health Centre`,
      visits: [],
      dailyCheckIns: [],
      kickCount: 0,
      mood: "",
      birthPlan: {
        facility: `${lga} Health Centre`,
        transport: "Taxify / Uber",
        companion: "Next of Kin",
        fundsSaved: false,
        emergencyContact: "0803 000 0000"
      }
    };

    setClients(prev => [...prev, newClient]);

    // Update active clients counters
    setTbaActivity(prev => prev.map(tba => {
      if (tba.name === "Mama Adunola Fatai") {
        return { ...tba, clients: tba.clients + 1 };
      }
      return tba;
    }));

    setLgaData(prev => prev.map(l => {
      if (l.name.toLowerCase() === lga.toLowerCase()) {
        return { ...l, clients: l.clients + 1 };
      }
      return l;
    }));

    return newClient;
  };

  const logAncVisit = (clientId, bp, weight, fundal, fhr, oedema, urine, treatments, note) => {
    setClients(prev => prev.map(client => {
      if (client.id === clientId) {
        const visitNumber = client.visits.length + 1;
        const watchFlag = (bp.startsWith("13") || bp.startsWith("14") || urine.toLowerCase().includes("trace") || urine.toLowerCase().includes("positive") || oedema.toLowerCase().includes("mild") || oedema.toLowerCase().includes("severe")) ? "Watch" : "Normal";
        
        // Dynamically shift risk level if client displays signs
        let newRisk = client.risk;
        if (watchFlag === "Watch") {
          newRisk = client.risk === "NORMAL" ? "ELEVATED" : "HIGH";
        }

        const newVisit = {
          n: visitNumber,
          date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
          ega: client.ega,
          bp,
          weight: `${weight}kg`,
          fundal: `${fundal} cm`,
          fhr: `${fhr} bpm`,
          oedema,
          urine,
          treatments,
          note,
          flag: watchFlag
        };

        return {
          ...client,
          risk: newRisk,
          visits: [...client.visits, newVisit]
        };
      }
      return client;
    }));

    // Update total ANC statistics in TBA stats
    setTbaActivity(prev => prev.map(tba => {
      if (tba.name === "Mama Adunola Fatai") {
        return { ...tba, training: Math.min(tba.training + 5, 100) }; // simulating experience gain
      }
      return tba;
    }));
  };

  const initiateReferral = (clientId, urgency, reason, facility) => {
    const client = clients.find(c => c.id === clientId);
    if (!client) return;

    const newRefId = `R0${activeReferrals.length + 1}`;
    const newRef = {
      id: newRefId,
      clientId,
      clientName: client.name,
      facility,
      urgency,
      status: "INITIATED",
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    };

    setActiveReferrals(prev => [newRef, ...prev]);
    setReferralCount(prev => prev + 1);

    // Update LGA statistics
    setLgaData(prev => prev.map(l => {
      if (l.name.toLowerCase() === client.lga.toLowerCase()) {
        return { ...l, referrals: l.referrals + 1 };
      }
      return l;
    }));

    // Add alert to main dashboard
    const newAlert = {
      id: `A0${alerts.length + 1}`,
      level: urgency === "Emergency" ? "CRITICAL" : "HIGH",
      title: `${urgency} Referral Initiated: ${client.name}`,
      body: `${client.name} referred to ${facility} due to: ${reason}. Urgency: ${urgency.toUpperCase()}.`,
      color: urgency === "Emergency" ? "#D32F2F" : "#E65100",
      bg: urgency === "Emergency" ? "#FFEBEE" : "#FFF3E0",
      type: "referral",
      clientId: clientId
    };
    setAlerts(prev => [newAlert, ...prev]);

    // Simulate referral en-route and received after some seconds
    setTimeout(() => {
      setActiveReferrals(curr => curr.map(r => r.id === newRefId ? { ...r, status: "EN ROUTE" } : r));
    }, 5000);

    setTimeout(() => {
      setActiveReferrals(curr => curr.map(r => r.id === newRefId ? { ...r, status: "RECEIVED" } : r));
    }, 12000);
  };

  const recordDelivery = (clientId, outcome, complications) => {
    const client = clients.find(c => c.id === clientId);
    if (!client) return;

    setDeliveryCount(prev => prev + 1);

    // Update LGA statistics
    setLgaData(prev => prev.map(l => {
      if (l.name.toLowerCase() === client.lga.toLowerCase()) {
        let deathsUpdate = l.deaths;
        if (outcome === "Neonatal death" || complications.includes("Severe Maternal Haemorrhage (Death)")) {
          deathsUpdate += 1;
          setMaternalDeaths(d => d + 1);
        }
        return {
          ...l,
          deliveries: l.deliveries + 1,
          deaths: deathsUpdate
        };
      }
      return l;
    }));

    // Remove client from active list or mark delivered
    setClients(prev => prev.filter(c => c.id !== clientId));

    // Update TBA deliveries metrics
    setTbaActivity(prev => prev.map(tba => {
      if (tba.name === "Mama Adunola Fatai") {
        return { ...tba, deliveries: tba.deliveries + 1, clients: Math.max(tba.clients - 1, 0) };
      }
      return tba;
    }));

    // Create an alert on dashboard
    const newAlert = {
      id: `A0${alerts.length + 1}`,
      level: "SUCCESS",
      title: `Successful Delivery Recorded`,
      body: `Client ${client.name} delivered successfully in ${client.lga} LGA. Outcome: ${outcome}.`,
      color: "#2E7D32",
      bg: "#E8F5E9",
      type: "delivery"
    };
    setAlerts(prev => [newAlert, ...prev]);
  };

  const submitPatientCheckIn = (clientId, symptoms, mood, kickCount) => {
    setClients(prev => prev.map(client => {
      if (client.id === clientId) {
        const newCheckIn = {
          date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
          symptoms,
          mood,
          checked: true
        };

        // Determine if risk changes based on symptoms reported
        let newRisk = client.risk;
        if (symptoms.length > 0) {
          if (symptoms.includes("Severe headache / blurred vision") || symptoms.includes("Heavy vaginal bleeding") || symptoms.includes("Convulsions or fitting")) {
            newRisk = "CRITICAL";
          } else {
            newRisk = "HIGH";
          }
        }

        return {
          ...client,
          risk: newRisk,
          mood,
          kickCount: parseInt(kickCount) || client.kickCount,
          dailyCheckIns: [newCheckIn, ...client.dailyCheckIns]
        };
      }
      return client;
    }));

    // If danger signs are reported, trigger alert
    const clientObj = clients.find(c => c.id === clientId);
    if (symptoms.length > 0 && clientObj) {
      const isCritical = symptoms.includes("Severe headache / blurred vision") || symptoms.includes("Heavy vaginal bleeding") || symptoms.includes("Convulsions or fitting");
      
      const newAlert = {
        id: `A0${alerts.length + 1}`,
        level: isCritical ? "CRITICAL" : "HIGH",
        title: `⚠️ Danger symptoms reported: ${clientObj.name}`,
        body: `${clientObj.name} reported symptoms: ${symptoms.join(", ")}. Immediate TBA check-in recommended.`,
        color: isCritical ? "#D32F2F" : "#E65100",
        bg: isCritical ? "#FFEBEE" : "#FFF3E0",
        type: "patient",
        clientId: clientId
      };

      setAlerts(prev => [newAlert, ...prev]);
    }
  };

  const updateBirthPlan = (clientId, birthPlan) => {
    setClients(prev => prev.map(client => {
      if (client.id === clientId) {
        return {
          ...client,
          birthPlan: { ...client.birthPlan, ...birthPlan }
        };
      }
      return client;
    }));
  };

  return (
    <PlatformContext.Provider value={{
      clients,
      alerts,
      tbaActivity,
      lgaData,
      referralCount,
      deliveryCount,
      maternalDeaths,
      activeReferrals,
      registerClient,
      logAncVisit,
      initiateReferral,
      recordDelivery,
      submitPatientCheckIn,
      updateBirthPlan,
      setAlerts
    }}>
      {children}
    </PlatformContext.Provider>
  );
};
