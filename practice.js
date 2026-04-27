// ── 1. VARIABLES ──────────────────────────────
// Like patient details — you store info in named boxes

let patientName = "Riya Sharma";
let age = 34;
let hasIBS = true;

console.log("Patient:", patientName);
console.log("Age:", age);
console.log("Has IBS:", hasIBS);


// ── 2. ARRAYS ─────────────────────────────────
// Like a patient's symptom list — multiple items in one place

let symptoms = ["Bloating", "Nausea", "Abdominal Pain", "Diarrhea"];

console.log("All symptoms:", symptoms);
console.log("First symptom:", symptoms[0]);
console.log("Total symptoms:", symptoms.length);


// ── 3. LOOPS ──────────────────────────────────
// Like going through every patient in your clinic one by one

for (let i = 0; i < symptoms.length; i++) {
  console.log("Symptom " + (i+1) + ": " + symptoms[i]);
}


// ── 4. FUNCTIONS ──────────────────────────────
// Like a medical protocol — a set of steps you run whenever needed

function assessPatient(name, symptomList) {
  if (symptomList.length === 0) {
    return name + " has no symptoms today. All clear!";
  } else if (symptomList.length <= 2) {
    return name + " has mild symptoms: " + symptomList.join(", ");
  } else {
    return name + " needs urgent attention! Symptoms: " + symptomList.join(", ");
  }
}

// Now USE the function:
let result1 = assessPatient("Riya Sharma", ["Bloating", "Nausea", "Pain"]);
let result2 = assessPatient("Arjun Mehta", ["Acidity"]);
let result3 = assessPatient("Priya Singh", []);

console.log(result1);
console.log(result2);
console.log(result3);


// ── 5. OBJECTS ────────────────────────────────
// Like a patient file — all details of ONE patient in one place

let patient = {
  name: "Vivek Shirol",
  age: 32,
  condition: "IBS-D",
  symptoms: ["Bloating", "Diarrhea"],
  nextAppointment: "May 3, 2026"
};

console.log("Doctor's patient:", patient.name);
console.log("Their condition:", patient.condition);
console.log("Next visit:", patient.nextAppointment);