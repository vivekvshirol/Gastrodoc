import { useState } from "react";

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

  const symptomList = [
    "Abdominal Pain", "Bloating", "Nausea",
    "Diarrhea", "Constipation", "Heartburn / Acidity"
  ];

  const toggleSymptom = (s) => {
    setSymptoms(prev =>
      prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]
    );
  };

  const handleSubmit = () => {
    if (!patientName) {
      setSubmitResult("⚠️ Please enter your name first.");
      return;
    }
    if (symptoms.length === 0) {
      setSubmitResult("✅ " + patientName + ", no symptoms selected. All clear!");
    } else if (symptoms.length <= 2) {
      setSubmitResult("⚠️ " + patientName + ", mild symptoms: " + symptoms.join(", ") + ". Monitor closely.");
    } else {
      setSubmitResult("🚨 " + patientName + " has " + symptoms.length + " symptoms: " + symptoms.join(", ") + ". Please book an appointment with Dr. Vivek!");
    }
  };

  const handleAppointment = () => {
    if (!apptName || !apptPhone || !apptDate) {
      alert("Please fill in all fields.");
      return;
    }
    setAppointmentDone(true);
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
      cursor: "pointer", fontSize: 13,
      padding: "6px 10px", borderRadius: 8
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
      color: active ? "#00c9a7" : "#7fa8c9", fontSize: 11,
      display: "flex", flexDirection: "column",
      alignItems: "center", gap: 3, padding: "4px 8px"
    })
  };

  return (
    <div style={s.app}>

      {/* Navbar */}
      <div style={s.navbar}>
        <span style={s.logo}>🩺 GastroDoc</span>
        <div>
          {["home","symptoms","appointments"].map(sc => (
            <button key={sc} style={s.navBtn(screen===sc)}
              onClick={() => setScreen(sc)}>
              {sc.charAt(0).toUpperCase() + sc.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* ── HOME ── */}
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
        </div>
      )}

      {/* ── SYMPTOMS ── */}
      {screen === "symptoms" && (
        <div style={s.page}>
          <h2 style={s.title}>Symptom Checker</h2>
          <p style={s.subtitle}>Select all symptoms you are experiencing today</p>

          <label style={s.label}>Your Name</label>
          <input style={s.input} placeholder="Enter your full name"
            value={patientName}
            onChange={e => setPatientName(e.target.value)} />

          <p style={{color:"#7fa8c9",fontSize:12,marginBottom:12}}>
            TAP to select symptoms:
          </p>

          {symptomList.map(sym => (
            <div key={sym}
              style={s.symptomCard(symptoms.includes(sym))}
              onClick={() => toggleSymptom(sym)}>
              {symptoms.includes(sym) ? "☑" : "☐"} {sym}
            </div>
          ))}

          <button style={s.btn} onClick={handleSubmit}>
            Submit Symptoms
          </button>

          {submitResult && (
            <div style={s.result}>{submitResult}</div>
          )}
        </div>
      )}

      {/* ── APPOINTMENTS ── */}
      {screen === "appointments" && (
        <div style={s.page}>
          <h2 style={s.title}>Book Appointment</h2>
          <p style={s.subtitle}>Fill in your details below</p>

          {!appointmentDone ? (
            <>
              <label style={s.label}>Full Name</label>
              <input style={s.input} placeholder="Your full name"
                value={apptName}
                onChange={e => setApptName(e.target.value)} />

              <label style={s.label}>Phone Number</label>
              <input style={s.input} placeholder="+91 XXXXX XXXXX"
                value={apptPhone}
                onChange={e => setApptPhone(e.target.value)} />

              <label style={s.label}>Preferred Date</label>
              <input style={s.input} type="date"
                value={apptDate}
                onChange={e => setApptDate(e.target.value)} />

              <label style={s.label}>Visit Type</label>
              <select style={s.input} value={apptType}
                onChange={e => setApptType(e.target.value)}>
                <option>First Consultation</option>
                <option>Follow-up</option>
                <option>Post-Procedure</option>
                <option>Emergency</option>
              </select>

              <button style={s.btn} onClick={handleAppointment}>
                Confirm Appointment
              </button>
            </>
          ) : (
            <div style={s.success}>
              <p style={{fontSize:32,margin:"0 0 12px"}}>✅</p>
              <p style={{color:"#00c9a7",fontWeight:"bold",fontSize:16,margin:"0 0 8px"}}>
                Appointment Requested!
              </p>
              <p style={{color:"#e8f4f8",fontSize:14,margin:"0 0 4px"}}>
                👤 {apptName}
              </p>
              <p style={{color:"#e8f4f8",fontSize:14,margin:"0 0 4px"}}>
                📅 {apptDate} · {apptType}
              </p>
              <p style={{color:"#7fa8c9",fontSize:13,marginTop:12}}>
                Dr. Vivek's clinic will confirm on {apptPhone} shortly.
              </p>
              <button style={{...s.btn, marginTop:16}}
                onClick={() => {
                  setAppointmentDone(false);
                  setApptName(""); setApptPhone("");
                  setApptDate("");
                }}>
                Book Another
              </button>
            </div>
          )}
        </div>
      )}

      {/* Bottom Nav */}
      <div style={s.bottomNav}>
        {[
          {id:"home", icon:"🏠", label:"Home"},
          {id:"symptoms", icon:"📋", label:"Symptoms"},
          {id:"appointments", icon:"📅", label:"Appointments"},
        ].map(n => (
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