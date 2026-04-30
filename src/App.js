import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://nmatlgpcvhvgeqiazutu.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5tYXRsZ3Bjdmh2Z2VxaWF6dXR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczNzg2NjUsImV4cCI6MjA5Mjk1NDY2NX0._nEy0wPP_mRcjPUO9v6oBBhdcCRYERwC8sDULwTUjcI"
);

const clinic = {
  doctor: "Dr. Vivek Shirol",
  quals: "MBBS, MD, DM Gastroenterology, SGPGI",
  clinic: "Dr. Vivek's Complete Gastro Care Clinic",
  address: "Belagavi, Karnataka",
  phone: "7760933XXX",
  timings: "Mon–Sat: 5:00 PM – 9:00 PM",
  holiday: "Sunday: Closed",
};

const videos = [
  { title: "Understanding Your Gut Health", platform: "YouTube", link: "https://youtu.be/9gMcC8mCCVs?si=QScpjzeYeV7btk-i", emoji: "▶️", color: "#ef4444" },
  { title: "GI Health Tips & Advice", platform: "YouTube", link: "https://youtu.be/nP8lG26EwdU?si=E8DAMIMFfwTU_haJ", emoji: "▶️", color: "#ef4444" },
  { title: "Follow on Instagram", platform: "Instagram", link: "https://www.instagram.com/vivekshirol_234?igsh=MTloNzNxZ2xsbHp3NA==", emoji: "📱", color: "#e91e63" },
];

const bristolTypes = [
  { type: 1, emoji: "🟤", desc: "Separate hard lumps", tag: "Constipation", color: "#ef4444" },
  { type: 2, emoji: "🟤", desc: "Lumpy sausage shape", tag: "Constipation", color: "#ef4444" },
  { type: 3, emoji: "🟫", desc: "Sausage with cracks", tag: "Normal", color: "#00c9a7" },
  { type: 4, emoji: "🟢", desc: "Smooth soft sausage", tag: "Normal", color: "#00c9a7" },
  { type: 5, emoji: "🟡", desc: "Soft blobs, clear edges", tag: "Lacking Fiber", color: "#f59e0b" },
  { type: 6, emoji: "🟠", desc: "Fluffy, mushy pieces", tag: "Mild Diarrhea", color: "#f97316" },
  { type: 7, emoji: "🔴", desc: "Entirely liquid", tag: "Diarrhea", color: "#ef4444" },
];

const weeklyTips = [
  "Eating smaller, more frequent meals reduces IBS-D flares.",
  "Stay hydrated — aim for 8 glasses of water daily.",
  "Peppermint oil capsules have clinical evidence for reducing IBS cramping.",
  "Stress is a key IBS trigger. 10 minutes of deep breathing daily helps.",
  "A low-FODMAP diet can reduce bloating by up to 75%.",
  "Avoid lying down for 2 hours after meals to reduce acid reflux.",
  "Probiotics help restore gut flora after antibiotic treatment.",
];

const s = {
  app: { background: "#0a1628", minHeight: "100vh", color: "#e8f4f8", fontFamily: "Arial, sans-serif", maxWidth: 500, margin: "0 auto", padding: "0 0 80px" },
  navbar: { background: "#0f2040", borderBottom: "2px solid #00c9a7", padding: "12px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" },
  logo: { color: "#00c9a7", fontWeight: "bold", fontSize: 16 },
  navBtn: (active) => ({ background: active ? "#00c9a720" : "none", border: "none", color: active ? "#00c9a7" : "#7fa8c9", cursor: "pointer", fontSize: 11, padding: "5px 7px", borderRadius: 8 }),
  page: { padding: "20px 16px" },
  title: { color: "#00c9a7", fontSize: 20, marginBottom: 4 },
  subtitle: { color: "#7fa8c9", fontSize: 13, marginBottom: 20 },
  card: { background: "#132850", border: "1px solid #1e3a5f", borderRadius: 14, padding: 16, marginBottom: 12 },
  input: { width: "100%", padding: 12, borderRadius: 10, border: "1px solid #1e3a5f", background: "#0f2040", color: "#e8f4f8", fontSize: 15, marginBottom: 14, boxSizing: "border-box", display: "block" },
  label: { color: "#7fa8c9", fontSize: 11, marginBottom: 5, display: "block", textTransform: "uppercase", letterSpacing: 0.5 },
  symptomCard: (sel) => ({ background: sel ? "#00c9a730" : "#132850", borderLeft: sel ? "4px solid #00c9a7" : "4px solid transparent", borderRadius: 10, padding: "13px 14px", marginBottom: 9, cursor: "pointer", fontSize: 15 }),
  bristolCard: (sel) => ({ background: sel ? "#00c9a720" : "#132850", border: sel ? "2px solid #00c9a7" : "2px solid transparent", borderRadius: 14, padding: "13px 14px", marginBottom: 9, cursor: "pointer", display: "flex", alignItems: "center", gap: 12 }),
  btn: { width: "100%", background: "#00c9a7", color: "#0a1628", border: "none", padding: 14, borderRadius: 12, fontSize: 15, fontWeight: "bold", cursor: "pointer", marginTop: 6 },
  btnOutline: { width: "100%", background: "#1e3a5f", color: "#00c9a7", border: "none", padding: 13, borderRadius: 12, fontSize: 15, fontWeight: "bold", cursor: "pointer", marginTop: 8 },
  btnDanger: { width: "100%", background: "#ef444420", color: "#ef4444", border: "1px solid #ef444440", padding: 12, borderRadius: 12, fontSize: 14, fontWeight: "bold", cursor: "pointer", marginTop: 8 },
  btnGoogle: { width: "100%", background: "#ffffff", color: "#444444", border: "1px solid #ddd", padding: 13, borderRadius: 12, fontSize: 15, fontWeight: "bold", cursor: "pointer", marginTop: 8, display: "flex", alignItems: "center", justifyContent: "center", gap: 10 },
  result: { background: "#132850", borderLeft: "4px solid #00c9a7", borderRadius: 12, padding: 14, marginTop: 14, lineHeight: 1.8 },
  success: { background: "#00c9a715", borderLeft: "4px solid #00c9a7", borderRadius: 12, padding: 16, marginTop: 14, lineHeight: 1.8 },
  divider: { display: "flex", alignItems: "center", gap: 10, margin: "16px 0" },
  dividerLine: { flex: 1, height: 1, background: "#1e3a5f" },
  dividerText: { color: "#7fa8c9", fontSize: 12 },
  bottomNav: { position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 500, background: "#0f2040", borderTop: "1px solid #1e3a5f", display: "flex", justifyContent: "space-around", padding: "8px 0" },
  bottomBtn: (active) => ({ background: "none", border: "none", cursor: "pointer", color: active ? "#00c9a7" : "#7fa8c9", fontSize: 9, display: "flex", flexDirection: "column", alignItems: "center", gap: 2, padding: "3px 5px" }),
};

export default function App() {
  const [screen, setScreen] = useState("home");
  const [user, setUser] = useState(null);
  const [authMode, setAuthMode] = useState("login");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authName, setAuthName] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
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
  const [msgName, setMsgName] = useState("");
  const [msgPhone, setMsgPhone] = useState("");
  const [msgText, setMsgText] = useState("");
  const [msgSent, setMsgSent] = useState(false);

  const tip = weeklyTips[new Date().getDay() % weeklyTips.length];
  const symptomList = ["Abdominal Pain", "Bloating", "Nausea", "Diarrhea", "Constipation", "Heartburn / Acidity"];

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (screen === "appointments" && user) fetchAppointments();
  }, [screen, user]);

  const fetchAppointments = async () => {
    const { data } = await supabase
      .from("appointments")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setSavedAppointments(data);
  };

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: "https://gastrodoc.vercel.app" },
    });
  };

  const handleSignUp = async () => {
    if (!authEmail || !authPassword || !authName) { setAuthError("Please fill in all fields."); return; }
    if (authPassword.length < 6) { setAuthError("Password must be at least 6 characters."); return; }
    setAuthLoading(true); setAuthError("");
    const { error } = await supabase.auth.signUp({
      email: authEmail,
      password: authPassword,
      options: { data: { full_name: authName } }
    });
    setAuthLoading(false);
    if (error) setAuthError(error.message);
    else setAuthError("✅ Account created! Please check your email to verify, then log in.");
  };

  const handleLogin = async () => {
    if (!authEmail || !authPassword) { setAuthError("Please enter email and password."); return; }
    setAuthLoading(true); setAuthError("");
    const { error } = await supabase.auth.signInWithPassword({
      email: authEmail, password: authPassword
    });
    setAuthLoading(false);
    if (error) setAuthError("❌ " + error.message);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setScreen("home");
  };

  const toggleSymptom = (s) => {
    setSymptoms(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  };

  const handleSubmit = () => {
    if (!patientName) { setSubmitResult("⚠️ Please enter your name first."); return; }
    if (symptoms.length === 0) {
      setSubmitResult("✅ " + patientName + ", no symptoms. All clear!");
    } else if (symptoms.length <= 2) {
      setSubmitResult("⚠️ " + patientName + ", mild symptoms: " + symptoms.join(", ") + ". Monitor closely.");
    } else {
      setSubmitResult("🚨 " + patientName + " has " + symptoms.length + " symptoms: " + symptoms.join(", ") + ". Please book an appointment with " + clinic.doctor + "!");
    }
  };

  const handleAppointment = async () => {
    if (!apptName || !apptPhone || !apptDate) { alert("Please fill in all fields."); return; }
    setLoading(true);
    const { error } = await supabase.from("appointments").insert([{
      patient_name: apptName, phone: apptPhone, date: apptDate, visit_type: apptType,
    }]);
    setLoading(false);
    if (error) alert("Error: " + error.message);
    else setAppointmentDone(true);
  };

  const handleBristolLog = () => {
    if (!bristolSelected) return;
    setBristolHistory(prev => [{ type: bristolSelected.type, tag: bristolSelected.tag, time: new Date().toLocaleTimeString(), date: new Date().toLocaleDateString() }, ...prev]);
    setBristolLogged(true);
    setTimeout(() => { setBristolLogged(false); setBristolSelected(null); }, 2000);
  };

  const handleMessage = () => {
    if (!msgName || !msgPhone || !msgText) { alert("Please fill in all fields."); return; }
    setMsgSent(true);
  };

  const navScreens = [
    { id: "home", icon: "🏠", label: "Home" },
    { id: "symptoms", icon: "📋", label: "Symptoms" },
    { id: "bristol", icon: "💧", label: "Bristol" },
    { id: "appointments", icon: "📅", label: "Appts" },
    { id: "videos", icon: "▶️", label: "Videos" },
    { id: "contact", icon: "💬", label: "Contact" },
  ];

  // ── AUTH SCREEN ──
  if (!user) {
    return (
      <div style={s.app}>
        <div style={s.navbar}>
          <div>
            <div style={s.logo}>🩺 GastroDoc</div>
            <div style={{ color: "#7fa8c9", fontSize: 10 }}>{clinic.clinic}</div>
          </div>
        </div>
        <div style={s.page}>
          <div style={{ textAlign: "center", padding: "20px 0 28px" }}>
            <p style={{ fontSize: 48, margin: "0 0 12px" }}>🩺</p>
            <h2 style={{ color: "#00c9a7", fontSize: 22, margin: "0 0 6px" }}>
              {authMode === "login" ? "Welcome Back!" : "Create Account"}
            </h2>
            <p style={{ color: "#7fa8c9", fontSize: 13, margin: 0 }}>
              {authMode === "login" ? "Sign in to access your health portal" : "Join Dr. Vivek's patient portal"}
            </p>
          </div>

          {/* ── GOOGLE LOGIN BUTTON ── */}
          <button style={s.btnGoogle} onClick={handleGoogleLogin}>
            <svg width="20" height="20" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
            Continue with Google
          </button>

          {/* ── DIVIDER ── */}
          <div style={s.divider}>
            <div style={s.dividerLine}></div>
            <span style={s.dividerText}>or use email</span>
            <div style={s.dividerLine}></div>
          </div>

          {authMode === "signup" && (
            <>
              <label style={s.label}>Full Name</label>
              <input style={s.input} placeholder="Your full name"
                value={authName} onChange={e => setAuthName(e.target.value)} />
            </>
          )}

          <label style={s.label}>Email Address</label>
          <input style={s.input} placeholder="your@email.com" type="email"
            value={authEmail} onChange={e => setAuthEmail(e.target.value)} />

          <label style={s.label}>Password</label>
          <input style={s.input} placeholder="Min 6 characters" type="password"
            value={authPassword} onChange={e => setAuthPassword(e.target.value)} />

          {authError && (
            <div style={{ background: authError.startsWith("✅") ? "#00c9a720" : "#ef444420", border: `1px solid ${authError.startsWith("✅") ? "#00c9a7" : "#ef4444"}40`, borderRadius: 10, padding: "10px 14px", marginBottom: 14, fontSize: 13, color: authError.startsWith("✅") ? "#00c9a7" : "#ef4444" }}>
              {authError}
            </div>
          )}

          <button style={s.btn} onClick={authMode === "login" ? handleLogin : handleSignUp} disabled={authLoading}>
            {authLoading ? "Please wait..." : authMode === "login" ? "Sign In" : "Create Account"}
          </button>

          <button style={s.btnOutline} onClick={() => { setAuthMode(authMode === "login" ? "signup" : "login"); setAuthError(""); }}>
            {authMode === "login" ? "New patient? Create Account" : "Already have account? Sign In"}
          </button>

          <div style={{ ...s.card, marginTop: 20, textAlign: "center" }}>
            <p style={{ color: "#7fa8c9", fontSize: 12, margin: "0 0 4px" }}>🏥 {clinic.clinic}</p>
            <p style={{ color: "#00c9a7", fontSize: 12, margin: 0 }}>📞 {clinic.phone} · {clinic.timings}</p>
          </div>
        </div>
      </div>
    );
  }

  // ── MAIN APP (logged in) ──
  return (
    <div style={s.app}>
      <div style={s.navbar}>
        <div>
          <div style={s.logo}>🩺 GastroDoc</div>
          <div style={{ color: "#7fa8c9", fontSize: 10 }}>{clinic.clinic}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          {navScreens.map(sc => (
            <button key={sc.id} style={s.navBtn(screen === sc.id)} onClick={() => setScreen(sc.id)}>
              {sc.icon}
            </button>
          ))}
        </div>
      </div>

      {/* HOME */}
      {screen === "home" && (
        <div style={s.page}>
          <h2 style={s.title}>Welcome 👋</h2>
          <p style={s.subtitle}>Hello, {user.user_metadata?.full_name || user.email}!</p>

          <div style={{ ...s.card, background: "linear-gradient(135deg,#0d2d50,#0a1f3a)" }}>
            <p style={{ color: "#00c9a7", fontWeight: "bold", fontSize: 16, margin: "0 0 4px" }}>👨‍⚕️ {clinic.doctor}</p>
            <p style={{ color: "#e8f4f8", fontSize: 13, margin: "0 0 2px" }}>{clinic.quals}</p>
            <p style={{ color: "#7fa8c9", fontSize: 13, margin: "0 0 2px" }}>🏥 {clinic.clinic}</p>
            <p style={{ color: "#7fa8c9", fontSize: 13, margin: "0 0 2px" }}>📍 {clinic.address}</p>
            <p style={{ color: "#7fa8c9", fontSize: 13, margin: "0 0 2px" }}>📞 {clinic.phone}</p>
            <p style={{ color: "#00c9a7", fontSize: 13, margin: "6px 0 0", fontWeight: "bold" }}>🕐 {clinic.timings}</p>
            <p style={{ color: "#ef4444", fontSize: 12, margin: "2px 0 0" }}>🔴 {clinic.holiday}</p>
          </div>

          <div style={{ ...s.card, borderLeft: "3px solid #3b82f6" }}>
            <p style={{ color: "#3b82f6", fontSize: 11, fontWeight: "bold", marginBottom: 5 }}>💡 WEEKLY HEALTH TIP</p>
            <p style={{ color: "#e8f4f8", fontSize: 13, lineHeight: 1.6, margin: 0 }}>{tip}</p>
          </div>

          <button style={s.btn} onClick={() => setScreen("symptoms")}>📋 Check My Symptoms</button>
          <button style={s.btnOutline} onClick={() => setScreen("appointments")}>📅 Book Appointment</button>
          <button style={{ ...s.btnOutline, marginTop: 8 }} onClick={() => setScreen("bristol")}>💧 Bristol Stool Tracker</button>
          <button style={{ ...s.btnOutline, marginTop: 8 }} onClick={() => setScreen("videos")}>▶️ Watch Health Videos</button>
          <button style={{ ...s.btnOutline, marginTop: 8 }} onClick={() => setScreen("contact")}>💬 Contact / Message Us</button>
          <button style={s.btnDanger} onClick={handleLogout}>🚪 Sign Out</button>
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
            <div key={sym} style={s.symptomCard(symptoms.includes(sym))} onClick={() => toggleSymptom(sym)}>
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
            <div key={b.type} style={s.bristolCard(bristolSelected?.type === b.type)}
              onClick={() => { setBristolSelected(b); setBristolLogged(false); }}>
              <span style={{ fontSize: 26 }}>{b.emoji}</span>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                  <span style={{ color: "#e8f4f8", fontWeight: "bold", fontSize: 14 }}>Type {b.type}</span>
                  <span style={{ background: b.color + "30", color: b.color, fontSize: 10, padding: "2px 8px", borderRadius: 20 }}>{b.tag}</span>
                </div>
                <p style={{ color: "#7fa8c9", fontSize: 12, margin: 0 }}>{b.desc}</p>
              </div>
              {bristolSelected?.type === b.type && <span style={{ color: "#00c9a7", fontSize: 18 }}>✓</span>}
            </div>
          ))}
          {bristolSelected && (
            <button style={s.btn} onClick={handleBristolLog}>
              {bristolLogged ? "✅ Logged!" : "Log This Entry"}
            </button>
          )}
          {bristolHistory.length > 0 && (
            <div style={{ marginTop: 20 }}>
              <p style={{ color: "#7fa8c9", fontSize: 11, fontWeight: "bold", marginBottom: 10 }}>RECENT LOGS</p>
              {bristolHistory.map((h, i) => (
                <div key={i} style={s.card}>
                  <p style={{ color: "#e8f4f8", fontWeight: "bold", fontSize: 13, margin: "0 0 2px" }}>Type {h.type} — {h.tag}</p>
                  <p style={{ color: "#7fa8c9", fontSize: 12, margin: 0 }}>{h.date} at {h.time}</p>
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
          <p style={s.subtitle}>🕐 {clinic.timings} · 🔴 {clinic.holiday}</p>
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
              <select style={s.input} value={apptType} onChange={e => setApptType(e.target.value)}>
                <option>First Consultation</option>
                <option>Follow-up</option>
                <option>Post-Procedure</option>
                <option>Emergency</option>
              </select>
              <button style={s.btn} onClick={handleAppointment} disabled={loading}>
                {loading ? "Saving..." : "Confirm Appointment Request"}
              </button>
            </>
          ) : (
            <div style={s.success}>
              <p style={{ fontSize: 32, margin: "0 0 10px" }}>✅</p>
              <p style={{ color: "#00c9a7", fontWeight: "bold", fontSize: 16, margin: "0 0 8px" }}>Appointment Requested!</p>
              <p style={{ color: "#e8f4f8", fontSize: 14, margin: "0 0 3px" }}>👤 {apptName}</p>
              <p style={{ color: "#e8f4f8", fontSize: 14, margin: "0 0 3px" }}>📅 {apptDate} · {apptType}</p>
              <p style={{ color: "#7fa8c9", fontSize: 13, marginTop: 10 }}>{clinic.clinic} will confirm on {apptPhone} shortly.</p>
              <button style={{ ...s.btn, marginTop: 14 }}
                onClick={() => { setAppointmentDone(false); setApptName(""); setApptPhone(""); setApptDate(""); fetchAppointments(); }}>
                Book Another
              </button>
            </div>
          )}
          {savedAppointments.length > 0 && (
            <div style={{ marginTop: 20 }}>
              <p style={{ color: "#7fa8c9", fontSize: 11, fontWeight: "bold", marginBottom: 10 }}>RECENT BOOKINGS</p>
              {savedAppointments.map((a, i) => (
                <div key={i} style={s.card}>
                  <p style={{ color: "#e8f4f8", fontWeight: "bold", fontSize: 13, margin: "0 0 3px" }}>👤 {a.patient_name}</p>
                  <p style={{ color: "#7fa8c9", fontSize: 12, margin: "0 0 2px" }}>📅 {a.date} · {a.visit_type}</p>
                  <p style={{ color: "#7fa8c9", fontSize: 12, margin: 0 }}>📞 {a.phone}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* VIDEOS */}
      {screen === "videos" && (
        <div style={s.page}>
          <h2 style={s.title}>Health Videos ▶️</h2>
          <p style={s.subtitle}>Educational content by {clinic.doctor}</p>
          {videos.map((v, i) => (
            <div key={i} style={s.card}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 52, height: 52, borderRadius: 12, background: v.color + "25", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, flexShrink: 0 }}>
                  {v.emoji}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ color: "#e8f4f8", fontWeight: "bold", fontSize: 14, margin: "0 0 4px" }}>{v.title}</p>
                  <p style={{ color: "#7fa8c9", fontSize: 12, margin: "0 0 10px" }}>{v.platform}</p>
                  <a href={v.link} target="_blank" rel="noreferrer"
                    style={{ background: v.color, color: "#fff", padding: "6px 16px", borderRadius: 20, fontSize: 12, fontWeight: "bold", textDecoration: "none", display: "inline-block" }}>
                    {v.platform === "YouTube" ? "▶ Watch" : "📱 Follow"}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CONTACT */}
      {screen === "contact" && (
        <div style={s.page}>
          <h2 style={s.title}>Contact Us 💬</h2>
          <p style={s.subtitle}>Send us a message or query</p>
          <div style={s.card}>
            <p style={{ color: "#00c9a7", fontWeight: "bold", fontSize: 14, margin: "0 0 10px" }}>🏥 {clinic.clinic}</p>
            <p style={{ color: "#7fa8c9", fontSize: 13, margin: "0 0 5px" }}>📍 {clinic.address}</p>
            <p style={{ color: "#7fa8c9", fontSize: 13, margin: "0 0 5px" }}>📞 {clinic.phone}</p>
            <p style={{ color: "#00c9a7", fontSize: 13, margin: "0 0 3px", fontWeight: "bold" }}>🕐 {clinic.timings}</p>
            <p style={{ color: "#ef4444", fontSize: 12, margin: 0 }}>🔴 {clinic.holiday}</p>
          </div>
          <a href={"https://wa.me/91" + clinic.phone.replace(/\D/g, "")} target="_blank" rel="noreferrer"
            style={{ display: "block", background: "#25D366", color: "#fff", textAlign: "center", padding: 14, borderRadius: 12, fontWeight: "bold", fontSize: 15, textDecoration: "none", marginBottom: 10 }}>
            💬 WhatsApp Us
          </a>
          <a href={"tel:" + clinic.phone}
            style={{ display: "block", background: "#1e3a5f", color: "#00c9a7", textAlign: "center", padding: 13, borderRadius: 12, fontWeight: "bold", fontSize: 15, textDecoration: "none", marginBottom: 16 }}>
            📞 Call Clinic
          </a>
          {!msgSent ? (
            <>
              <label style={s.label}>Your Name</label>
              <input style={s.input} placeholder="Your full name" value={msgName} onChange={e => setMsgName(e.target.value)} />
              <label style={s.label}>Phone Number</label>
              <input style={s.input} placeholder="+91 XXXXX XXXXX" value={msgPhone} onChange={e => setMsgPhone(e.target.value)} />
              <label style={s.label}>Your Query / Message</label>
              <textarea style={{ ...s.input, height: 100, resize: "none" }} placeholder="Type your question..."
                value={msgText} onChange={e => setMsgText(e.target.value)} />
              <button style={s.btn} onClick={handleMessage}>Send Message</button>
            </>
          ) : (
            <div style={s.success}>
              <p style={{ fontSize: 32, margin: "0 0 8px" }}>✅</p>
              <p style={{ color: "#00c9a7", fontWeight: "bold", fontSize: 16, margin: "0 0 6px" }}>Message Received!</p>
              <p style={{ color: "#7fa8c9", fontSize: 13, margin: 0 }}>{clinic.doctor}'s team will contact you on {msgPhone} shortly.</p>
              <button style={{ ...s.btn, marginTop: 14 }} onClick={() => { setMsgSent(false); setMsgName(""); setMsgPhone(""); setMsgText(""); }}>Send Another</button>
            </div>
          )}
        </div>
      )}

      {/* Bottom Nav */}
      <div style={s.bottomNav}>
        {navScreens.map(n => (
          <button key={n.id} style={s.bottomBtn(screen === n.id)} onClick={() => setScreen(n.id)}>
            <span style={{ fontSize: 16 }}>{n.icon}</span>
            {n.label}
          </button>
        ))}
      </div>
    </div>
  );
}

