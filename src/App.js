import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

// --- SUPABASE CONFIG ---
const supabase = createClient(
  "https://nmatlgpcvhvgeqiazutu.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5tYXRsZ3Bjdmh2Z2VxaWF6dXR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczNzg2NjUsImV4cCI6MjA5Mjk1NDY2NX0._nEy0wPP_mRcjPUO9v6oBBhdcCRYERwC8sDULwTUjcI"
);

// --- CLINIC & CONTENT DATA ---
const clinic = {
  doctor: "Dr. Vivek Shirol",
  photo: "/dr-vivek.png", // Matches the filename you just created
  quals: "MBBS, MD, DM Gastroenterology, SGPGI",
  address: "Belagavi, Karnataka",
  timings: "Mon–Sat: 5:00 PM – 9:00 PM",
};

const healthTips = [
  { text: "Eating smaller, more frequent meals can help manage symptoms of IBS-D.", ref: "Source: Stanford Health Care" },
  { text: "Walking for 15-20 minutes after a meal helps significantly with digestion.", ref: "Source: MNGI Digestive Health" },
  { text: "Hydration is key: Aim for 2-3 liters of water daily for bowel regularity.", ref: "Source: ESPEN Guidelines" },
];

const diagnosisTips = {
  "GERD": "Avoid lying down for 3 hours after dinner to prevent acid reflux tonight. (Source: AGA)",
  "IBS": "Track your triggers this week; stress management is as vital as diet. (Source: Stanford)",
  "Fatty Liver": "Avoid sugary drinks and aim for 30 mins of brisk walking today. (Source: AASLD)",
  "Constipation": "Focus on high-fiber foods like oats and legumes this week. (Source: ACG)",
  "IBD": "Ensure you are taking your maintenance meds even if you feel fine today. (Source: ECCO)"
};

const bristolTypes = [
  { type: 1, img: "https://upload.wikimedia.org/wikipedia/commons/b/b4/Bristol_Stool_Chart.png", desc: "Separate hard lumps", tag: "Constipation", color: "#ef4444" },
  { type: 4, img: "https://upload.wikimedia.org/wikipedia/commons/b/b4/Bristol_Stool_Chart.png", desc: "Smooth soft sausage", tag: "Normal", color: "#00c9a7" },
  { type: 7, img: "https://upload.wikimedia.org/wikipedia/commons/b/b4/Bristol_Stool_Chart.png", desc: "Entirely liquid", tag: "Diarrhea", color: "#ef4444" },
];

// --- STYLES ---
const s = {
  app: { background: "#0a1628", minHeight: "100vh", color: "#e8f4f8", fontFamily: "Arial, sans-serif", maxWidth: 500, margin: "0 auto", padding: "0 0 80px" },
  navbar: { background: "#0f2040", borderBottom: "2px solid #00c9a7", padding: "12px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" },
  logo: { color: "#00c9a7", fontWeight: "bold", fontSize: 16 },
  page: { padding: "20px 16px" },
  title: { color: "#00c9a7", fontSize: 20, marginBottom: 15 },
  card: { background: "#132850", border: "1px solid #1e3a5f", borderRadius: 14, padding: 16, marginBottom: 12 },
  profileImg: { width: 90, height: 90, borderRadius: "50%", border: "2px solid #00c9a7", objectFit: "cover", marginRight: 15 },
  tipCard: { background: "#132850", borderLeft: "4px solid #3b82f6", borderRadius: 14, padding: 16, marginBottom: 20 },
  input: { width: "100%", padding: 12, borderRadius: 10, border: "1px solid #1e3a5f", background: "#0f2040", color: "#e8f4f8", fontSize: 15, marginBottom: 14, boxSizing: "border-box" },
  btn: { width: "100%", background: "#00c9a7", color: "#0a1628", border: "none", padding: 14, borderRadius: 12, fontSize: 15, fontWeight: "bold", cursor: "pointer", marginTop: 6 },
  bottomNav: { position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 500, background: "#0f2040", borderTop: "1px solid #1e3a5f", display: "flex", justifyContent: "space-around", padding: "10px 0" },
  bristolImg: { width: 60, height: 40, objectFit: "contain", background: "#fff", borderRadius: 4, padding: 2 }
};

export default function App() {
  const [screen, setScreen] = useState("home");
  const [user, setUser] = useState(null);
  const [diagnosis, setDiagnosis] = useState("");
  
  const dailyTip = healthTips[new Date().getDate() % healthTips.length];

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setUser(session.user);
        setDiagnosis(session.user.user_metadata?.diagnosis || "");
      }
    });
  }, []);

  const updateDiagnosis = async (value) => {
    const { error } = await supabase.auth.updateUser({
      data: { diagnosis: value }
    });
    if (!error) setDiagnosis(value);
  };

  if (!user) {
    return (
      <div style={s.app}>
        <div style={s.navbar}><div style={s.logo}>🩺 GastroDoc</div></div>
        <div style={s.page}>
          <button style={s.btn} onClick={() => supabase.auth.signInWithOAuth({ provider: "google" })}>Login with Google</button>
        </div>
      </div>
    );
  }

  return (
    <div style={s.app}>
      <div style={s.navbar}>
        <div style={s.logo}>🩺 GastroDoc</div>
        <div style={{ color: "#00c9a7", fontSize: 12 }}>Hi, {user.user_metadata?.full_name?.split(' ')[0]}</div>
      </div>

      {screen === "home" && (
        <div style={s.page}>
          {/* DR PROFILE SECTION */}
          <div style={{ display: "flex", alignItems: "center", marginBottom: 20 }}>
            <img src={clinic.photo} alt={clinic.doctor} style={s.profileImg} />
            <div>
              <p style={{ color: "#00c9a7", fontWeight: "bold", margin: 0, fontSize: 18 }}>{clinic.doctor}</p>
              <p style={{ color: "#7fa8c9", fontSize: 11, margin: "4px 0" }}>{clinic.quals}</p>
              <p style={{ color: "#e8f4f8", fontSize: 12 }}>📍 {clinic.address}</p>
            </div>
          </div>

          {/* DIAGNOSIS SECTION */}
          <div style={s.card}>
            <p style={{ color: "#7fa8c9", fontSize: 11, fontWeight: "bold", marginBottom: 8 }}>MY DIAGNOSIS</p>
            <select style={s.input} value={diagnosis} onChange={(e) => updateDiagnosis(e.target.value)}>
              <option value="">Select Diagnosis...</option>
              <option value="GERD">GERD (Acid Reflux)</option>
              <option value="IBS">IBS (Irritable Bowel)</option>
              <option value="Fatty Liver">Fatty Liver (NAFLD)</option>
              <option value="Constipation">Chronic Constipation</option>
              <option value="IBD">IBD (Crohn's/Colitis)</option>
            </select>
            {diagnosis && (
              <div style={{ background: "#00c9a715", borderLeft: '3px solid #00c9a7', padding: 12, borderRadius: 8 }}>
                <p style={{ color: "#00c9a7", fontSize: 11, fontWeight: "bold", margin: "0 0 5px" }}>WEEKLY CARE TIP</p>
                <p style={{ fontSize: 13, margin: 0 }}>{diagnosisTips[diagnosis]}</p>
              </div>
            )}
          </div>

          <div style={s.tipCard}>
            <p style={{ color: "#3b82f6", fontSize: 11, fontWeight: "bold", marginBottom: 6 }}>💡 DAILY HEALTH TIP</p>
            <p style={{ color: "#e8f4f8", fontSize: 14 }}>{dailyTip.text}</p>
            <p style={{ color: "#7fa8c9", fontSize: 10, marginTop: 5 }}>{dailyTip.ref}</p>
          </div>
        </div>
      )}

      {screen === "bristol" && (
        <div style={s.page}>
          <h2 style={s.title}>Bristol Stool Tracker</h2>
          {bristolTypes.map(b => (
            <div key={b.type} style={s.card}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
                <img src={b.img} style={s.bristolImg} alt="Bristol Type" />
                <div>
                  <div style={{ fontWeight: 'bold', fontSize: 14 }}>Type {b.type}</div>
                  <div style={{ fontSize: 11, color: '#7fa8c9' }}>{b.desc}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={s.bottomNav}>
        <button style={{ background: "none", border: "none", color: screen === "home" ? "#00c9a7" : "#7fa8c9" }} onClick={() => setScreen("home")}>🏠<br/>Home</button>
        <button style={{ background: "none", border: "none", color: screen === "bristol" ? "#00c9a7" : "#7fa8c9" }} onClick={() => setScreen("bristol")}>💧<br/>Bristol</button>
      </div>
    </div>
  );
}