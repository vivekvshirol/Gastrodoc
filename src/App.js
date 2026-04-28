import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://nmatlgpcvhvgeqiazutu.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5tYXRsZ3Bjdmh2Z2VxaWF6dXR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczNzg2NjUsImV4cCI6MjA5Mjk1NDY2NX0._nEy0wPP_mRcjPUO9v6oBBhdcCRYERwC8sDULwTUjcI"
);

const bristolTypes = [
  { type: 1, emoji: "🟤", desc: "Separate hard lumps", tag: "Constipation", color: "#ef4444" },
  { type: 2, emoji: "🟤", desc: "Lumpy sausage shape", tag: "Constipation", color: "#ef4444" },
  { type: 3, emoji: "🟫", desc: "Sausage with cracks", tag: "Normal", color: "#00c9a7" },
  { type: 4, emoji: "🟢", desc: "Smooth soft sausage", tag: "Normal", color: "#00c9a7" },
  { type: 5, emoji: "🟡", desc: "Soft blobs, clear edges", tag: "Lacking Fiber", color: "#f59e0b" },
  { type: 6, emoji: "🟠", desc: "Fluffy, mushy pieces", tag: "Mild Diarrhea", color: "#f97316" },
  { type: 7, emoji: "🔴", desc: "Entirely liquid", tag: "Diarrhea", color: "#ef4444" },
];

export default function App() {
  const [screen, setScreen] = useState("home");
  const [patientName, setPatientName] = useState("");
  const [symptoms, setSymptoms] = useState([]);
  const [submitResult, setSubmitResult] = useState("");
  const [appointmentDone, setAppointmentDone] = useState(false);
  const [apptName, setApptName] = useState("");
  const [apptPhone, setApptPhone] = useState("");
  const [apptDate, setApptDate] = useState("");
  const [apptType, setApptType] = useState("First Consultation");
  const [bristolSelected, setBristolSelected] = useState(null);
  const [bristolLogged, setBristolLogged] = useState(false);
  const [bristolHistory, setBristolHistory] = useState([]);
  const [savedAppointments, setSavedAppointments] = useState([]);
  const [loading, setLoading] = useState(false);

  const symptomList = [
    "Abdominal Pain","Bloating","Nausea",
    "Diarrhea","Constipation","Heartburn / Acidity"
  ];

  useEffect(() => {
    if (screen === "appointments") fetchAppointments();
  }, [screen]);

  const fetchAppointments = async () => {
    const { data } = await supabase
      .from("appointments")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setSavedAppointments(data);
  };

  const toggleSymptom = (s) => {
    setSymptoms(prev =>
      prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]
    );
  };

  const handleSubmit = () => {
    if (!patientName) { setSubmitResult("⚠️ Please enter your name first."); return; }
    if (symptoms.length === 0) {
      setSubmitResult("✅ " + patientName + ", no symptoms. All clear!");
    } else if (symptoms.length <= 2) {
      setSubmitResult("⚠️ " + patientName + ", mild symptoms: " + symptoms.join(", ") + ". Monitor closely.");
    } else {
      setSubmitResult("🚨 " + patientName + " has " + symptoms.length + " symptoms: " + symptoms.join(", ") + ". Please book an appointment with Dr. Vivek!");
    }
  };

  const handleAppointment = async () => {
    if (!apptName || !apptPhone || !apptDate) {
      alert("Please fill in all fields."); return;
    }
    setLoading(true);
    const { error } = await supabase.from("appointments").insert([{
      patient_name: apptName,
      phone: apptPhone,
      date: apptDate,
      visit_type: apptType,
    }]);
    setLoading(false);
    if (error) {
      alert("Error: " + error.message);
    } else {
      setAppointmentDone(true);
    }
  };

  const handleBristolLog = () => {
    if (!bristolSelected) return;
    const entry = {
      type: bristolSelected.type,
      tag: bristolSelected.tag,
      time: new Date().toLocaleTimeString(),
      date: new Date().toLocaleDateString(),
    };
    setBristolHistory(prev => [entry, ...prev]);
    setBristolLogged(true);
    setTimeout(() => { setBristolLogged(false); setBristolSelected(null); }, 2000);
  };

  const s = {
    app: {
      background: "#0a1628", minHeight: "100vh",
      color: "#e8f4f8", fontFamily: "Arial, sans-serif",
      maxWidth: 500, margin: "0 auto", padding: "0 0 80px",
    },
    navbar: {
      background: "#0f2040", borderBottom: "2px solid #00c9a7",
      padding: "14px 20px", display: "flex",
      justifyContent: "space-between", alignItems: "center",
    },
    logo: { color: "#00c9a7", fontWeight: "bold", fontSize: 18 },
    navBtn: (active) => ({
      background: active ? "#00c9a720" : "none",
      border: "none", color: active ? "#00c9a7" : "#7fa8c9",
      cursor: "pointer", fontSize: 12,
      padding: "6px 8px", borderRadius: 8
    }),
    page: { padding: "24px 20px" },
    title: { color: "#00c9a7", fontSize: 22, marginBottom: 6 },
    subtitle: { color: "#7fa8c9", fontSize: 13, marginBottom: 24 },
    card: {
      background: "#132850", border: "1px solid #1e3a5f",
      borderRadius: 14, padding: 16, marginBottom: 12
    },
    input: {
      width: "100%", padding: 12, borderRadius: 10,
      border: "1px solid #1e3a5f", background: "#0f2040",
      color: "#e8f4f8", fontSize: 15, marginBottom: 16,
      boxSizing: "border-box", display: "block"
    },
    label: {
      color: "#7fa8c9", fontSize: 12, marginBottom: 6,
      display: "block", textTransform: "uppercase"
    },
    symptomCard: (selected) => ({
      background: selected ? "#00c9a730" : "#132850",
      borderLeft: selected ? "4px solid #00c9a7" : "4px solid transparent",
      borderRadius: 10, padding: "14px 16px", marginBottom: 10,
      cursor: "pointer", fontSize: 15, transition: "all 0.2s"
    }),
    bristolCard: (selected) => ({
      background: selected ? "#00c9a720" : "#132850",
      border: selected ? "2px solid #00c9a7" : "2px solid transparent",
      borderRadius: 14, padding: "14px 16px", marginBottom: 10,
      cursor: "pointer", display: "flex", alignItems: "center",
      gap: 14, transition: "all 0.2s"
    }),
    btn: {
      width: "100%", background: "#00c9a7", color: "#0a1628",
      border: "none", padding: 14, borderRadius: 12,
      fontSize: 16, fontWeight: "bold", cursor: "pointer", marginTop: 8
    },
    btnOutline: {
      width: "100%", background: "#1e3a5f", color: "#00c9a7",
      border: "none", padding: 14, borderRadius: 12,
      fontSize: 16, fontWeight: "bold", cursor: "pointer", marginTop: 10
    },
    result: {
      background: "#132850", borderLeft: "4px solid #00c9a7",
      borderRadius: 12, padding: 16, marginTop: 16, lineHeight: 1.8
    },
    success: {
      background: "#00c9a715", borderLeft: "4px solid #00c9a7",
      borderRadius: 12, padding: 16, marginTop: 16, lineHeight: 1.8
    },
    bottomNav: {
      position: "fixed", bottom: 0, left: "50%",
      transform: "translateX(-50%)", width: "100%", maxWidth: 500,
      background: "#0f2040", borderTop: "1px solid #1e3a5f",
      display: "flex", justifyContent: "space-around", padding: "10px 0"
    },
    bottomBtn: (active) => ({
      background: "none", border: "none", cursor: "pointer",
      color: active ? "#00c9a7" : "#7fa8c9", fontSize: 10,
      display: "flex", flexDirection: "column",
      alignItems: "center", gap: 3, padding: "4px 6px"
    })
  };

  const navScreens = [
    {id:"home", icon:"🏠", label:"Home"},
    {id:"symptoms", icon:"📋", label:"Symptoms"},
    {id:"bristol", icon:"💧", label:"Bristol"},
    {id:"appointments", icon:"📅", label:"Appts"},
  ];

  return (
    <div style={s.app}>
      <div style={s.navbar}>
        <span style={s.logo}>🩺 GastroDoc</span>
        <div>
          {navScreens.map(sc => (
            <button key={sc.id} style={s.navBtn(screen===sc.id)}
              onClick={() => setScreen(sc.id)}>
              {sc.icon}
            </button>
          ))}
        </div>
      </div>

      {/* HOME */}
      {screen === "home" && (
        <div style={s.page}>
          <h2 style={s.title}>Welcome 👋</h2>
          <p style={s.subtitle}>Your personal GI health companion</p>
          <div style={s.card}>
            <p style={{color:"#00c9a7",fontWeight:"bold",marginBottom:8}}>
              👨‍⚕️ Dr. Vivek Shirol
            </p>
            <p style={{color:"#7fa8c9",fontSize:13}}>Gastroenterologist</p>
            <p style={{color:"#7fa8c9",fontSize:13}}>📍 Your Clinic Name</p>
          </div>
          <div style={{...s.card, borderLeft:"3px solid #00c9a7"}}>
            <p style={{color:"#00c9a7",fontSize:12,fontWeight:"bold",marginBottom:6}}>
              💡 Weekly Tip
            </p>
            <p style={{color:"#e8f4f8",fontSize:14,lineHeight:1.6}}>
              Eating smaller, more frequent meals reduces IBS-D flares.
              Large meals stimulate bowel contractions.
            </p>
          </div>
          <button style={s.btn} onClick={() => setScreen("symptoms")}>
            Check My Symptoms
          </button>
          <button style={s.btnOutline} onClick={() => setScreen("appointments")}>
            Book Appointment
          </button>
          <button style={{...s.btnOutline, marginTop:10}}
            onClick={() => setScreen("bristol")}>
            Bristol Stool Tracker 💧
          </button>
        </div>
      )}

      {/* SYMPTOMS */}
      {screen === "symptoms" && (
        <div style={s.page}>
          <h2 style={s.title}>Symptom Checker</h2>
          <p style={s.subtitle}>Select all symptoms you are experiencing today</p>
          <label style={s.label}>Your Name</label>
          <input style={s.input} placeholder="Enter your full name"
            value={patientName} onChange={e => setPatientName(e.target.value)} />
          {symptomList.map(sym => (
            <div key={sym} style={s.symptomCard(symptoms.includes(sym))}
              onClick={() => toggleSymptom(sym)}>
              {symptoms.includes(sym) ? "☑" : "☐"} {sym}
            </div>
          ))}
          <button style={s.btn} onClick={handleSubmit}>Submit Symptoms</button>
          {submitResult && <div style={s.result}>{submitResult}</div>}
        </div>
      )}

      {/* BRISTOL */}
      {screen === "bristol" && (
        <div style={s.page}>
          <h2 style={s.title}>Bristol Stool Chart</h2>
          <p style={s.subtitle}>Tap your stool type to log it</p>
          {bristolTypes.map(b => (
            <div key={b.type}
              style={s.bristolCard(bristolSelected?.type === b.type)}
              onClick={() => { setBristolSelected(b); setBristolLogged(false); }}>
              <span style={{fontSize:28}}>{b.emoji}</span>
              <div style={{flex:1}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:3}}>
                  <span style={{color:"#e8f4f8",fontWeight:"bold",fontSize:14}}>
                    Type {b.type}
                  </span>
                  <span style={{
                    background: b.color+"30", color: b.color,
                    fontSize:11, padding:"2px 8px", borderRadius:20
                  }}>{b.tag}</span>
                </div>
                <p style={{color:"#7fa8c9",fontSize:12,margin:0}}>{b.desc}</p>
              </div>
              {bristolSelected?.type === b.type &&
                <span style={{color:"#00c9a7",fontSize:20}}>✓</span>}
            </div>
          ))}
          {bristolSelected && (
            <button style={s.btn} onClick={handleBristolLog}>
              {bristolLogged ? "✅ Logged!" : "Log This Entry"}
            </button>
          )}
          {bristolHistory.length > 0 && (
            <div style={{marginTop:24}}>
              <p style={{color:"#7fa8c9",fontSize:12,fontWeight:"bold",marginBottom:12}}>
                RECENT LOGS
              </p>
              {bristolHistory.map((h,i) => (
                <div key={i} style={s.card}>
                  <p style={{color:"#e8f4f8",fontWeight:"bold",fontSize:14,margin:"0 0 3px"}}>
                    Type {h.type} — {h.tag}
                  </p>
                  <p style={{color:"#7fa8c9",fontSize:12,margin:0}}>
                    {h.date} at {h.time}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* APPOINTMENTS */}
      {screen === "appointments" && (
        <div style={s.page}>
          <h2 style={s.title}>Book Appointment</h2>
          <p style={s.subtitle}>Fill in your details below</p>
          {!appointmentDone ? (
            <>
              <label style={s.label}>Full Name</label>
              <input style={s.input} placeholder="Your full name"
                value={apptName} onChange={e => setApptName(e.target.value)} />
              <label style={s.label}>Phone Number</label>
              <input style={s.input} placeholder="+91 XXXXX XXXXX"
                value={apptPhone} onChange={e => setApptPhone(e.target.value)} />
              <label style={s.label}>Preferred Date</label>
              <input style={s.input} type="date"
                value={apptDate} onChange={e => setApptDate(e.target.value)} />
              <label style={s.label}>Visit Type</label>
              <select style={s.input} value={apptType}
                onChange={e => setApptType(e.target.value)}>
                <option>First Consultation</option>
                <option>Follow-up</option>
                <option>Post-Procedure</option>
                <option>Emergency</option>
              </select>
              <button style={s.btn} onClick={handleAppointment} disabled={loading}>
                {loading ? "Saving..." : "Confirm Appointment"}
              </button>
            </>
          ) : (
            <div style={s.success}>
              <p style={{fontSize:32,margin:"0 0 12px"}}>✅</p>
              <p style={{color:"#00c9a7",fontWeight:"bold",fontSize:16,margin:"0 0 8px"}}>
                Appointment Saved!
              </p>
              <p style={{color:"#e8f4f8",fontSize:14,margin:"0 0 4px"}}>👤 {apptName}</p>
              <p style={{color:"#e8f4f8",fontSize:14,margin:"0 0 4px"}}>📅 {apptDate} · {apptType}</p>
              <p style={{color:"#7fa8c9",fontSize:13,marginTop:12}}>
                Dr. Vivek's clinic will confirm on {apptPhone} shortly.
              </p>
              <button style={{...s.btn,marginTop:16}}
                onClick={() => {
                  setAppointmentDone(false);
                  setApptName(""); setApptPhone(""); setApptDate("");
                  fetchAppointments();
                }}>
                Book Another
              </button>
            </div>
          )}

          {savedAppointments.length > 0 && (
            <div style={{marginTop:24}}>
              <p style={{color:"#7fa8c9",fontSize:12,fontWeight:"bold",marginBottom:12}}>
                RECENT BOOKINGS
              </p>
              {savedAppointments.map((a,i) => (
                <div key={i} style={s.card}>
                  <p style={{color:"#e8f4f8",fontWeight:"bold",fontSize:14,margin:"0 0 4px"}}>
                    👤 {a.patient_name}
                  </p>
                  <p style={{color:"#7fa8c9",fontSize:13,margin:"0 0 2px"}}>
                    📅 {a.date} · {a.visit_type}
                  </p>
                  <p style={{color:"#7fa8c9",fontSize:13,margin:0}}>
                    📞 {a.phone}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Bottom Nav */}
      <div style={s.bottomNav}>
        {navScreens.map(n => (
          <button key={n.id} style={s.bottomBtn(screen===n.id)}
            onClick={() => setScreen(n.id)}>
            <span style={{fontSize:20}}>{n.icon}</span>
            {n.label}
          </button>
        ))}
      </div>
    </div>
  );
}