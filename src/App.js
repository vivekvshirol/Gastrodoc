import { useState, useEffect, useCallback } from "react";
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

const allHealthTips = [
  { tip: "🍽️ Do not lie down for at least 2–3 hours after eating. Staying upright uses gravity to keep stomach acid down where it belongs.", ref: "Stanford Digestive Health Center — Nutrition Guidelines for GERD (2012)" },
  { tip: "🥗 Eat 4–5 small meals spread through the day instead of 2–3 large ones. Large meals fill the stomach and push acid back up into the food pipe.", ref: "Stanford Digestive Health Center — Nutrition Guidelines for GERD (2012)" },
  { tip: "🌙 Stop eating at least 3 hours before going to bed. A full stomach at bedtime is one of the most common triggers for nighttime heartburn.", ref: "Stanford Digestive Health Center — Nutrition Guidelines for GERD (2012)" },
  { tip: "🛏️ Raise the head-end of your bed by 6–8 inches using a foam wedge under the mattress. This uses gravity while you sleep to keep acid in your stomach.", ref: "Stanford Digestive Health Center — Nutrition Guidelines for GERD (2012)" },
  { tip: "☕ Cut down on coffee and tea — even decaffeinated versions. Both relax the valve between your stomach and food pipe, allowing acid to escape upward.", ref: "ASGE Patient Education — Diet and GERD (2014)" },
  { tip: "🥤 Avoid fizzy drinks — sodas, sparkling water, and energy drinks. The gas they produce bloats your stomach and pushes acid up into your food pipe.", ref: "ASGE Patient Education — Diet and GERD (2014)" },
  { tip: "🍫 Avoid or reduce chocolate if you have frequent heartburn. Chocolate contains methylxanthine — similar to caffeine — that weakens the stomach valve.", ref: "ASGE Patient Education — Diet and GERD (2014)" },
  { tip: "🍊 Limit citrus fruits and juices — oranges, lemons, grapefruit, pineapple. These are naturally high in acid and directly irritate the lining of your food pipe.", ref: "ASGE Patient Education — Diet and GERD (2014)" },
  { tip: "🍅 Avoid tomatoes and tomato-based products like pizza sauce, salsa, and pasta sauces. These are highly acidic and a well-known heartburn trigger.", ref: "ASGE Patient Education — Diet and GERD (2014)" },
  { tip: "🧅 Be cautious with peppermint, garlic, and onions. These foods relax the lower esophageal sphincter — the valve that keeps acid in your stomach.", ref: "ASGE Patient Education — Diet and GERD (2014)" },
  { tip: "🍟 Reduce fried, greasy, and fatty foods. These slow stomach emptying AND relax the stomach valve — a double trigger that makes acid reflux significantly worse.", ref: "ASGE Patient Education — Diet and GERD (2014)" },
  { tip: "🍷 Avoid or minimise alcohol. Alcohol relaxes the stomach valve, increases acid production, and irritates the food pipe lining — all at the same time.", ref: "Stanford Digestive Health Center — Nutrition Guidelines for GERD (2012)" },
  { tip: "📔 Maintain a food and symptom diary for 1–2 weeks. This is the most reliable way to identify YOUR personal trigger foods since triggers vary from person to person.", ref: "Stanford Digestive Health Center — Nutrition Guidelines for GERD (2012)" },
  { tip: "⚖️ Losing even 5–10% of your body weight can dramatically reduce acid reflux. Extra fat around the belly puts constant pressure on your stomach and pushes acid upward.", ref: "Stanford Digestive Health Center — Nutrition Guidelines for GERD (2012)" },
  { tip: "🚶 Regular exercise helps with weight management and improves digestion. Avoid intense exercise immediately after meals as it can trigger reflux.", ref: "Stanford Digestive Health Center — Nutrition Guidelines for GERD (2012)" },
  { tip: "🌶️ Spicy foods — chilli, peppers, hot sauces — are a common GERD trigger. Try reducing spice levels and observe if your heartburn improves.", ref: "Stanford Digestive Health Center — Nutrition Guidelines for GERD (2012)" },
  { tip: "👕 Wear loose, comfortable clothing around your waist. Tight belts and waistbands squeeze your stomach and force acid upward — especially after meals.", ref: "Stanford Digestive Health Center — Nutrition Guidelines for GERD (2012)" },
  { tip: "🚭 If you smoke, quitting is one of the most powerful steps for GERD. Smoking weakens the stomach valve, increases acid, and dries out protective saliva.", ref: "Stanford Digestive Health Center — Nutrition Guidelines for GERD (2012)" },
  { tip: "🧂 Reduce your salt intake. High-salt diets are linked to increased GERD severity. Choose fresh home-cooked food over packaged foods with hidden salt.", ref: "Stanford Digestive Health Center — Nutrition Guidelines for GERD (2012)" },
  { tip: "💊 Do not ignore persistent heartburn occurring more than twice a week. Untreated GERD can damage your food pipe — always consult your gastroenterologist.", ref: "ASGE Patient Education — Diet and GERD (2014)" },
  { tip: "🥛 If you feel bloated or get diarrhoea after dairy, you may have lactose malabsorption — found in up to 68% of IBS patients. Try low-lactose options like yogurt or aged cheese.", ref: "Cabré E. — Nutrition in Prevention and Management of IBS. European e-Journal of Clinical Nutrition and Metabolism (2011)" },
  { tip: "🍎 Some IBS patients poorly absorb fructose — the sugar in fruits, honey, and processed foods. Eating fructose-rich foods alone can cause bloating, cramps, and diarrhoea.", ref: "Cabré E. — European e-Journal of Clinical Nutrition and Metabolism (2011)" },
  { tip: "🍬 Sorbitol — an artificial sweetener in sugar-free gums and diet drinks — is poorly absorbed and causes bloating and diarrhoea in IBS patients. Always check product labels.", ref: "Cabré E. — European e-Journal of Clinical Nutrition and Metabolism (2011)" },
  { tip: "🌾 Psyllium husk (Isabgol) is the most evidence-backed fibre supplement for IBS — shown in clinical trials to help both diarrhoea and constipation types. Start with a small dose.", ref: "Ford AC et al. — Effect of Fibre, Antispasmodics, and Peppermint Oil in IBS. BMJ (2008)" },
  { tip: "🌾 Wheat bran has NOT been shown to improve IBS symptoms in clinical trials and may worsen bloating and pain. Psyllium (isabgol) is a far better choice for IBS.", ref: "Cabré E. — European e-Journal (2011); Ford AC et al. — BMJ (2008)" },
  { tip: "🦠 Probiotic supplements containing Bifidobacterium strains or combinations of multiple strains have been shown in randomised trials to reduce bloating, pain, and diarrhoea in IBS.", ref: "Moayyedi P et al. — Efficacy of Probiotics in IBS: A Systematic Review. Gut (2010)" },
  { tip: "🦠 Not all probiotics are equal for IBS. Combinations of strains work better than single strains, and Lactobacillus alone shows limited benefit. Ask your doctor for the right product.", ref: "Moayyedi P et al. — Gut (2010)" },
  { tip: "🚫 Strict food elimination diets are NOT routinely recommended for IBS. Unnecessarily cutting food groups can cause nutritional deficiencies without reliably improving symptoms.", ref: "Cabré E. — European e-Journal of Clinical Nutrition and Metabolism (2011)" },
  { tip: "🥦 FODMAPs — poorly absorbed sugars found in wheat, onions, garlic, apples, dairy — can trigger bloating and diarrhoea in IBS. A low-FODMAP diet for 6–8 weeks can identify your triggers.", ref: "Shepherd SJ, Gibson PR. — Fructose Malabsorption and IBS. J Am Diet Assoc (2006)" },
  { tip: "🧘 Psychological stress directly triggers IBS symptoms through the gut-brain connection. Daily relaxation, yoga, and mindfulness genuinely and measurably reduce IBS flares.", ref: "Cabré E. — European e-Journal of Clinical Nutrition and Metabolism (2011)" },
  { tip: "🍱 Eating regular meals at fixed times helps regulate bowel rhythm in IBS. Skipping meals or eating very irregularly disrupts gut motility and worsens symptoms.", ref: "Cabré E. — European e-Journal of Clinical Nutrition and Metabolism (2011)" },
  { tip: "🔥 Peppermint oil capsules (enteric-coated) have clinical evidence for reducing IBS cramping and abdominal pain by relaxing smooth muscle in the gut wall.", ref: "Ford AC et al. — BMJ Systematic Review and Meta-analysis (2008)" },
  { tip: "🍺 Alcohol is a gut irritant that speeds transit causing diarrhoea and disrupts the gut microbiome. Avoid during symptom flares and limit significantly during stable periods.", ref: "Cabré E. — European e-Journal of Clinical Nutrition and Metabolism (2011)" },
  { tip: "🧪 If you have diarrhoea-predominant IBS, ask your doctor to test for coeliac disease. A significant proportion of patients diagnosed with IBS actually have undetected coeliac disease.", ref: "Sanders DS et al. — Association of Adult Coeliac Disease with IBS. Lancet (2001)" },
  { tip: "🌱 A low-FODMAP diet should only be followed for 6–8 weeks then foods reintroduced one by one. Long-term strict restriction reduces healthy gut bacteria and causes nutritional gaps.", ref: "Cabré E. — European e-Journal of Clinical Nutrition and Metabolism (2011)" },
  { tip: "🥙 IBS patients can and should eat a balanced, varied diet. The goal is to identify specific triggers — not create a highly restricted diet that affects your nutrition and quality of life.", ref: "Cabré E. — European e-Journal of Clinical Nutrition and Metabolism (2011)" },
  { tip: "💧 Drink at least 8 glasses of water daily. Dehydration makes both constipation and bloating worse in IBS patients. Warm water or herbal teas can support gut motility.", ref: "Cabré E. — European e-Journal of Clinical Nutrition and Metabolism (2011)" },
  { tip: "🌿 Reducing onions, garlic, and wheat — all high in fructans (a type of FODMAP) — can significantly reduce bloating in some IBS patients even when other dietary changes haven't helped.", ref: "Shepherd SJ et al. — Dietary Triggers of Abdominal Symptoms in IBS. Clin Gastroenterol Hepatol (2008)" },
  { tip: "🧂 Avoid eating too fast or swallowing large amounts of air. Eating quickly leads to air swallowing (aerophagia), which significantly worsens bloating and distension in IBS.", ref: "Cabré E. — European e-Journal of Clinical Nutrition and Metabolism (2011)" },
  { tip: "🚶 Regular moderate exercise — even 30 minutes of walking daily — reduces IBS symptoms, regulates bowel movements, and lowers stress hormones that trigger gut spasms.", ref: "Cabré E. — European e-Journal of Clinical Nutrition and Metabolism (2011)" },
  { tip: "📋 Keep a detailed symptom diary — recording food, stress levels, sleep, and symptoms — for at least 2 weeks. This is the most practical tool for identifying your personal IBS triggers.", ref: "Cabré E. — European e-Journal of Clinical Nutrition and Metabolism (2011)" },
  { tip: "🍌 Not all IBS patients are sensitive to all FODMAPs. Test each FODMAP category by removing and reintroducing them one at a time to identify your specific personal problem foods.", ref: "Cabré E. — European e-Journal of Clinical Nutrition and Metabolism (2011)" },
  { tip: "🫒 Follow a Mediterranean-style diet as your long-term eating pattern. A clinical study with 142 IBD patients showed lower disease activity, lower inflammation, and better quality of life after 6 months.", ref: "Hashash JG et al. — AGA Clinical Practice Update on Diet in IBD. Gastroenterology 166(3):521–532 (2024)" },
  { tip: "🥤 Avoid all sugar-sweetened beverages — sodas, packaged juices, sweetened teas. These have been directly linked to a more severe and prolonged disease course in IBD patients.", ref: "Hashash JG et al. — AGA Clinical Practice Update. Gastroenterology (2024)" },
  { tip: "🥩 Reduce red meat and processed meats (sausages, salami, hot dogs). A diet low in red and processed meats may help reduce flares in Ulcerative Colitis.", ref: "Hashash JG et al. — AGA Clinical Practice Update. Gastroenterology (2024)" },
  { tip: "🥕 If you have a gut narrowing (stricture), peel and cook your vegetables well, or blend and mash them. This gives you nutrition from vegetables without risking a blockage.", ref: "Hashash JG et al. — AGA Clinical Practice Update. Gastroenterology (2024)" },
  { tip: "🌿 During remission, gradually reintroduce fruits, vegetables, and soluble fibre. Long-term fibre avoidance harms your gut microbiome and does more damage during stable IBD.", ref: "Hashash JG et al. — AGA Clinical Practice Update. Gastroenterology (2024)" },
  { tip: "🚫 Do not avoid gluten unless you have been specifically diagnosed with coeliac disease. There is no clinical evidence that gluten worsens IBD in patients without coeliac disease.", ref: "Hashash JG et al. — AGA Clinical Practice Update. Gastroenterology (2024)" },
  { tip: "🍟 Ultra-processed packaged foods contain additives and emulsifiers that may disrupt the gut lining and immune response in IBD. Choose fresh, home-cooked meals whenever possible.", ref: "Hashash JG et al. — AGA Clinical Practice Update. Gastroenterology (2024)" },
  { tip: "🐟 Eat fish, poultry, eggs, and plant proteins (beans, lentils, dal) as your main protein sources. These are better for gut health than red meat in IBD.", ref: "Hashash JG et al. — AGA Clinical Practice Update. Gastroenterology (2024)" },
  { tip: "🌾 The Mediterranean diet and the Specific Carbohydrate Diet are equally effective for symptom relief in Crohn's disease. The Mediterranean diet is preferred as it is easier to follow long-term.", ref: "Lewis JD et al. — Randomized Trial: SCD vs Mediterranean Diet in Crohn's Disease. Gastroenterology (2021)" },
  { tip: "📏 Watch for unintended weight loss — even small amounts can signal nutritional deficiency or disease activity. Report any unexplained weight loss to your doctor.", ref: "Hashash JG et al. — AGA Clinical Practice Update. Gastroenterology (2024)" },
  { tip: "💊 IBD patients are at high risk of Vitamin D, B12, Iron, and Calcium deficiencies. Ask your gastroenterologist to check your levels regularly and supplement as needed.", ref: "Hashash JG et al. — AGA Clinical Practice Update. Gastroenterology (2024)" },
  { tip: "🥗 A low-FODMAP diet may help IBS-like symptoms during IBD remission but should only be used short-term. Long-term use may reduce beneficial gut bacteria needed to maintain remission.", ref: "Cox SR et al. — Effects of Low FODMAP Diet in IBD. Gastroenterology (2020)" },
  { tip: "🍵 During an active Crohn's disease flare, your doctor may recommend exclusive liquid nutrition (EEN). This has strong clinical evidence for inducing remission and correcting malnutrition.", ref: "Hashash JG et al. — AGA Clinical Practice Update. Gastroenterology (2024)" },
  { tip: "🫐 Brightly coloured fruits and vegetables — berries, leafy greens, carrots — are rich in antioxidants that support gut healing during IBD remission. Eat them cooked and soft for better tolerability.", ref: "Hashash JG et al. — AGA Clinical Practice Update. Gastroenterology (2024)" },
  { tip: "🥛 Low-fat dairy (yogurt, buttermilk, low-fat paneer) is generally acceptable in IBD unless you have documented lactose intolerance. Full-fat dairy in large amounts may worsen gut inflammation.", ref: "Hashash JG et al. — AGA Clinical Practice Update. Gastroenterology (2024)" },
  { tip: "🚶 Moderate exercise during remission is safe and beneficial in IBD. It reduces stress hormones, supports a healthier gut microbiome, and improves overall wellbeing.", ref: "Hashash JG et al. — AGA Clinical Practice Update. Gastroenterology (2024)" },
  { tip: "🧘 Chronic psychological stress can trigger IBD flares. Meditation, breathing exercises, and counselling are evidence-backed additions to IBD management.", ref: "Hashash JG et al. — AGA Clinical Practice Update. Gastroenterology (2024)" },
  { tip: "🥜 Nuts, seeds, and legumes are excellent plant proteins and fibre sources that benefit the gut microbiome. Introduce them slowly and in cooked form to improve tolerance in IBD.", ref: "Hashash JG et al. — AGA Clinical Practice Update. Gastroenterology (2024)" },
  { tip: "🧂 Reduce added salt and sugar daily. Both are major components of ultra-processed foods and have been linked to worsening gut inflammation in IBD.", ref: "Hashash JG et al. — AGA Clinical Practice Update. Gastroenterology (2024)" },
  { tip: "👨‍⚕️ Work with a registered dietitian alongside your gastroenterologist. Dietary needs in IBD change with disease activity, nutritional status, and medications — personalised guidance is essential.", ref: "Hashash JG et al. — AGA Clinical Practice Update. Gastroenterology (2024)" },
  { tip: "⚖️ Losing 7–10% of your total body weight is the most effective treatment for fatty liver. Even 5% weight loss improves liver fat. Aim for a steady 500g–1kg loss per week.", ref: "MNGI Digestive Health — Fatty Liver Diet Guidelines (2019); Montemayor S et al. — Nutrients 2023, 15, 3987" },
  { tip: "🚶 Do at least 20–30 minutes of moderate aerobic exercise daily — brisk walking, cycling, or swimming. Exercise reduces liver fat directly, even without significant weight loss.", ref: "MNGI Digestive Health — Fatty Liver Diet Guidelines (2019)" },
  { tip: "💪 Add strength training 2–3 days per week. Building muscle mass improves insulin sensitivity — a key driver in reversing fatty liver disease.", ref: "MNGI Digestive Health — Fatty Liver Diet Guidelines (2019)" },
  { tip: "🥤 Stop all sugar-sweetened drinks immediately — cold drinks, packaged juices, energy drinks. Fructose in these drinks directly converts to fat in the liver, even in people of normal weight.", ref: "Montemayor S et al. — Nutrients 2023, 15, 3987; EASL–EASD–EASO and APASL Guidelines" },
  { tip: "🍚 Avoid refined carbohydrates — white rice, maida, white bread, and sugary snacks. These are rapidly converted to fat in the liver. Choose whole grain alternatives.", ref: "MNGI Digestive Health — Fatty Liver Diet Guidelines (2019)" },
  { tip: "🚫 Avoid alcohol completely if you have fatty liver disease. Even small amounts worsen liver inflammation and accelerate scarring. Total abstinence is recommended for NASH.", ref: "MNGI Digestive Health — Fatty Liver Diet Guidelines (2019); EASL–EASD–EASO Guidelines" },
  { tip: "🫒 Use extra virgin olive oil as your main cooking fat. It is rich in monounsaturated fatty acids and polyphenols that reduce liver fat and improve insulin sensitivity in NAFLD.", ref: "Montemayor S et al. — Nutrients 2023, 15, 3987 (Mediterranean NAFLD Plate)" },
  { tip: "☕ Drinking 2–3 cups of plain black coffee (no sugar) per day appears to protect the liver. Regular coffee drinkers have lower rates of liver fibrosis and slower NAFLD progression.", ref: "Montemayor S et al. — Nutrients 2023, 15, 3987; APASL Guidelines" },
  { tip: "🐟 Eat fatty fish like salmon, mackerel, or sardines 2–3 times per week. Their omega-3 fatty acids directly reduce liver inflammation and fat accumulation.", ref: "Montemayor S et al. — Nutrients 2023, 15, 3987 (Mediterranean NAFLD Plate)" },
  { tip: "🌈 Eat colourful vegetables and fruits daily — especially orange, red, and purple varieties. Carotenoids and antioxidants reduce oxidative stress and protect liver cells from damage.", ref: "Montemayor S et al. — Nutrients 2023, 15, 3987 (Mediterranean NAFLD Plate)" },
  { tip: "🥜 Include nuts, seeds, and legumes regularly. Walnuts, almonds, flaxseeds, lentils, and chickpeas provide healthy fats, fibre, and plant protein that support liver health.", ref: "Montemayor S et al. — Nutrients 2023, 15, 3987 (Mediterranean NAFLD Plate)" },
  { tip: "🥛 Consume low-fat dairy products daily — especially yogurt with probiotic L. acidophilus. These support the gut microbiome, which plays a direct role in regulating liver fat metabolism.", ref: "Montemayor S et al. — Nutrients 2023, 15, 3987 (Mediterranean NAFLD Plate)" },
  { tip: "🍱 Never go more than 3–4 hours without eating. Prolonged fasting followed by large meals spikes insulin and triggers the liver to store more fat. Eat 3–4 balanced meals spaced evenly.", ref: "MNGI Digestive Health — Fatty Liver Diet Guidelines (2019)" },
  { tip: "🥗 Always combine carbohydrates with protein, healthy fat, and fibre at every meal. Never eat carbohydrate foods alone — this causes insulin spikes that drive fat storage in the liver.", ref: "MNGI Digestive Health — Fatty Liver Diet Guidelines (2019)" },
  { tip: "🥩 Drastically reduce red meat and processed meats. High saturated fat intake from red meat is strongly associated with increased liver fat and worsening NAFLD progression.", ref: "Montemayor S et al. — Nutrients 2023, 15, 3987" },
  { tip: "🍰 Avoid cakes, biscuits, mithai, and packaged sweets. These are loaded with refined sugar, saturated fat, and high-fructose corn syrup — the three biggest dietary drivers of fatty liver.", ref: "Montemayor S et al. — Nutrients 2023, 15, 3987" },
  { tip: "😴 Poor sleep directly worsens fatty liver disease. Research links short sleep duration and poor sleep quality with increased NAFLD severity. Aim for 7–8 hours of quality sleep nightly.", ref: "Montemayor S et al. — Nutrients 2023, 15, 3987; Kim CW et al. — J Hepatol (2013)" },
  { tip: "😮‍💨 If you snore heavily or feel excessively sleepy during the day, get screened for obstructive sleep apnoea. Sleep apnoea is directly associated with worse NAFLD and faster liver scarring.", ref: "Montemayor S et al. — Nutrients 2023, 15, 3987; Musso G et al. — Obes Rev (2013)" },
  { tip: "🌾 Increase dietary fibre intake — whole grain cereals, oats, fruits, and vegetables daily. Dietary fibre positively influences the gut microbiome, which plays a proven role in regulating liver fat.", ref: "Montemayor S et al. — Nutrients 2023, 15, 3987" },
  { tip: "🫒 The Mediterranean diet is officially recommended for NAFLD by EASL, EASD, EASO, ESPEN, and APASL. It reduces liver fat and improves insulin sensitivity even without significant weight loss.", ref: "Montemayor S et al. — Nutrients 2023, 15, 3987; EASL–EASD–EASO Joint Guidelines" },
  { tip: "🧪 Even if you are not overweight (lean NAFLD), fatty liver disease can still be severe. Dietary quality — not just body weight — is what matters most for protecting your liver.", ref: "Montemayor S et al. — Nutrients 2023, 15, 3987" },
  { tip: "📉 A calorie deficit of 500 calories per day is the recommended approach for weight loss in NAFLD. This achieves safe, steady weight loss without nutritional deficiencies or muscle loss.", ref: "MNGI Digestive Health — Fatty Liver Diet Guidelines (2019); EASL–EASD–EASO Guidelines" },
  { tip: "🌾 Gradually increase fibre in your diet — fruits, vegetables, whole grains, and oats. Fibre bulks up stools and speeds transit through the gut. Add it slowly to avoid gas and bloating.", ref: "Cabré E. — Nutrition in Prevention and Management of Constipation. European e-Journal of Clinical Nutrition and Metabolism (2011)" },
  { tip: "🚶 Daily physical activity — even brisk walking for 30 minutes — stimulates natural muscle contractions of your colon. A sedentary lifestyle is one of the most correctable causes of constipation.", ref: "Cabré E. — European e-Journal of Clinical Nutrition and Metabolism (2011)" },
  { tip: "⏰ Train your bowel by sitting on the toilet at the same time every day — preferably 15–20 minutes after breakfast. Never ignore the urge to go. Delaying makes stools harder.", ref: "Cabré E. — European e-Journal of Clinical Nutrition and Metabolism (2011)" },
  { tip: "🌿 Isabgol (Psyllium husk) is the best-studied, safest fibre supplement for chronic constipation. It softens stools and increases frequency. Take it with a large glass of water.", ref: "Cabré E. — European e-Journal of Clinical Nutrition and Metabolism (2011); Ford AC et al. — BMJ (2008)" },
  { tip: "🦠 Probiotics containing Bifidobacterium animalis — found in some yogurts — have been shown in clinical trials to increase stool frequency, improve stool consistency, and reduce straining.", ref: "Cabré E. — European e-Journal of Clinical Nutrition and Metabolism (2011)" },
  { tip: "💧 Stay well hydrated — especially when increasing fibre intake. Fibre without adequate water can actually worsen constipation by forming a hard mass rather than a soft, bulky stool.", ref: "Cabré E. — European e-Journal of Clinical Nutrition and Metabolism (2011)" },
  { tip: "🍑 Prunes (dried plums) and figs are natural, effective remedies for constipation. They contain fibre AND sorbitol — a natural compound that draws water into the bowel and softens stools.", ref: "Cabré E. — European e-Journal of Clinical Nutrition and Metabolism (2011)" },
  { tip: "🥛 Fermented dairy products like yogurt and buttermilk introduce beneficial bacteria that support regular bowel movements and improve overall gut motility.", ref: "Cabré E. — European e-Journal of Clinical Nutrition and Metabolism (2011)" },
  { tip: "⚠️ High fibre intake can actually WORSEN constipation in patients with slow transit colon or pelvic floor dysfunction. If severe constipation is not improving with diet, consult your gastroenterologist.", ref: "Cabré E. — European e-Journal of Clinical Nutrition and Metabolism (2011)" },
  { tip: "🌾 A high-fibre diet is the cornerstone of managing diverticular disease. Low-fibre diets cause hard stools that create high pressure in the colon wall, pushing pouches (diverticula) through weak spots.", ref: "Cabré E. — Nutrition in Prevention of Diverticulosis. European e-Journal of Clinical Nutrition and Metabolism (2011)" },
  { tip: "🥗 Eat plenty of vegetables, fruits, legumes, and whole grains daily. Insoluble fibre from these foods is the most effective type for preventing diverticular disease and its complications.", ref: "Cabré E. — European e-Journal of Clinical Nutrition and Metabolism (2011)" },
  { tip: "🥩 A diet high in red meat combined with low-fibre intake significantly increases diverticular disease risk. Reduce red meat and replace with fish, poultry, and plant proteins.", ref: "Aldoori WH et al. — A Prospective Study of Diet and Symptomatic Diverticular Disease. Am J Clin Nutr (1994)" },
  { tip: "🦠 Probiotics — particularly Lactobacillus casei — have shown promise in preventing recurrence of symptoms in diverticular disease. Ask your gastroenterologist if a probiotic is right for you.", ref: "Cabré E. — European e-Journal of Clinical Nutrition and Metabolism (2011)" },
  { tip: "🚶 Regular physical activity reduces diverticular complications. Exercise improves colon motility, reduces constipation, and lowers intra-colonic pressure.", ref: "Cabré E. — European e-Journal of Clinical Nutrition and Metabolism (2011)" },
  { tip: "💧 Stay well hydrated daily. Adequate fluid intake is essential with a high-fibre diet — without enough water, fibre can harden stools and worsen colon pressure.", ref: "Cabré E. — European e-Journal of Clinical Nutrition and Metabolism (2011)" },
  { tip: "🥗 A Mediterranean diet — rich in vegetables, fruits, whole grains, fish, olive oil, and legumes — is the most evidence-backed dietary pattern for gut health across all gastroenterological conditions.", ref: "Hashash JG et al. — AGA Clinical Practice Update. Gastroenterology (2024); Montemayor S et al. — Nutrients (2023)" },
  { tip: "🦠 Your gut microbiome — trillions of bacteria in your intestine — is central to digestive health. Eat a wide variety of plant foods, include curd and buttermilk, and avoid ultra-processed foods.", ref: "Cabré E. — European e-Journal of Clinical Nutrition and Metabolism (2011); Montemayor S et al. — Nutrients (2023)" },
  { tip: "🚭 Smoking damages the entire digestive tract — it worsens GERD, increases IBD flares, accelerates fatty liver, and raises gut cancer risk. Quitting is the most impactful lifestyle change for gut health.", ref: "Hashash JG et al. — AGA Clinical Practice Update. Gastroenterology (2024)" },
  { tip: "🍱 Eat slowly, chew thoroughly, and sit down for every meal. Rushing food leads to air swallowing, poor digestion, and bloating — all avoidable with good eating habits.", ref: "Hashash JG et al. — AGA Clinical Practice Update. Gastroenterology (2024)" },
  { tip: "📵 Ultra-processed foods — packaged snacks, instant noodles, biscuits, fast food — contain emulsifiers and additives that disrupt the gut lining and microbiome. Cook at home with whole ingredients as much as possible.", ref: "Hashash JG et al. — AGA Clinical Practice Update. Gastroenterology (2024)" },
  { tip: "💊 Never self-medicate with antacids, laxatives, or antibiotics for prolonged periods. Long-term unsupervised use can mask serious disease and harm the gut. Always consult your gastroenterologist.", ref: "ASGE Patient Education — Diet and GERD (2014); Cabré E. — European e-Journal (2011)" },
  { tip: "🌙 Prioritise good sleep — 7–8 hours nightly. Poor sleep quality is linked to worsened GERD, IBS flares, IBD activity, and fatty liver progression. Your gut repairs and resets during deep sleep.", ref: "Montemayor S et al. — Nutrients (2023)" },
  { tip: "😰 Chronic stress is a gut enemy. It worsens GERD, triggers IBS flares, promotes IBD activity, and worsens fatty liver through elevated cortisol. Stress management is a legitimate medical treatment for gut disease.", ref: "Cabré E. — European e-Journal (2011); Hashash JG et al. — AGA (2024)" },
  { tip: "🥗 Eat the rainbow — aim for at least 5 different coloured fruits and vegetables every day. Different colours represent different antioxidants that protect the gut lining, reduce inflammation, and support liver health.", ref: "Montemayor S et al. — Nutrients (2023); Hashash JG et al. — AGA (2024)" },
  { tip: "🩺 Do not ignore persistent gut symptoms — blood in stool, unexplained weight loss, pain that wakes you at night, or worsening symptoms. These always need proper medical evaluation. Early diagnosis saves lives.", ref: "ASGE Patient Education — Diet and GERD (2014); Hashash JG et al. — AGA (2024)" },
];

const diagnosisList = [
  "GERD / Acid Reflux",
  "IBS (Irritable Bowel Syndrome)",
  "IBD / Crohn's Disease",
  "IBD / Ulcerative Colitis",
  "NAFLD / Fatty Liver",
  "Chronic Constipation",
  "Diverticular Disease",
  "Gastritis",
  "Peptic Ulcer Disease",
  "Celiac Disease",
  "Other / Not Diagnosed Yet",
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
  const [diagnosis, setDiagnosis] = useState("");
  const [selectedDiagnosis, setSelectedDiagnosis] = useState("");
  const [diagnosisSaved, setDiagnosisSaved] = useState(false);
  const [diagnosisLoading, setDiagnosisLoading] = useState(false);
  const [showDiagnosisScreen, setShowDiagnosisScreen] = useState(false);

  const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
  const todaysTip = allHealthTips[dayOfYear % allHealthTips.length];
  const symptomList = ["Abdominal Pain", "Bloating", "Nausea", "Diarrhea", "Constipation", "Heartburn / Acidity"];

  const fetchDiagnosis = useCallback(async (currentUser) => {
    const { data } = await supabase
      .from("patient_profiles")
      .select("diagnosis")
      .eq("user_id", currentUser.id)
      .single();
    if (data?.diagnosis) {
      setDiagnosis(data.diagnosis);
      setSelectedDiagnosis(data.diagnosis);
    }
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) fetchDiagnosis(session.user);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) fetchDiagnosis(session.user);
    });
    return () => subscription.unsubscribe();
  }, [fetchDiagnosis]);

  useEffect(() => {
    if (screen === "appointments" && user) fetchAppointments();
  }, [screen, user]);

  const fetchAppointments = async () => {
    const { data } = await supabase.from("appointments").select("*").order("created_at", { ascending: false });
    if (data) setSavedAppointments(data);
  };

  const handleSaveDiagnosis = async () => {
    if (!selectedDiagnosis) return;
    setDiagnosisLoading(true);
    const { error } = await supabase.from("patient_profiles")
      .upsert({ user_id: user.id, diagnosis: selectedDiagnosis, updated_at: new Date().toISOString() }, { onConflict: "user_id" });
    setDiagnosisLoading(false);
    if (!error) {
      setDiagnosis(selectedDiagnosis);
      setDiagnosisSaved(true);
      setTimeout(() => { setDiagnosisSaved(false); setShowDiagnosisScreen(false); }, 1500);
    }
  };

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({ provider: "google", options: { redirectTo: "https://gastrodoc.vercel.app" } });
  };

  const handleSignUp = async () => {
    if (!authEmail || !authPassword || !authName) { setAuthError("Please fill in all fields."); return; }
    if (authPassword.length < 6) { setAuthError("Password must be at least 6 characters."); return; }
    setAuthLoading(true); setAuthError("");
    const { error } = await supabase.auth.signUp({ email: authEmail, password: authPassword, options: { data: { full_name: authName } } });
    setAuthLoading(false);
    if (error) setAuthError(error.message);
    else setAuthError("✅ Account created! Please check your email to verify, then log in.");
  };

  const handleLogin = async () => {
    if (!authEmail || !authPassword) { setAuthError("Please enter email and password."); return; }
    setAuthLoading(true); setAuthError("");
    const { error } = await supabase.auth.signInWithPassword({ email: authEmail, password: authPassword });
    setAuthLoading(false);
    if (error) setAuthError("❌ " + error.message);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null); setScreen("home"); setDiagnosis(""); setSelectedDiagnosis("");
  };

  const toggleSymptom = (s) => setSymptoms(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);

  const handleSubmit = () => {
    if (!patientName) { setSubmitResult("⚠️ Please enter your name first."); return; }
    if (symptoms.length === 0) setSubmitResult("✅ " + patientName + ", no symptoms. All clear!");
    else if (symptoms.length <= 2) setSubmitResult("⚠️ " + patientName + ", mild symptoms: " + symptoms.join(", ") + ". Monitor closely.");
    else setSubmitResult("🚨 " + patientName + " has " + symptoms.length + " symptoms: " + symptoms.join(", ") + ". Please book an appointment with " + clinic.doctor + "!");
  };

  const handleAppointment = async () => {
    if (!apptName || !apptPhone || !apptDate) { alert("Please fill in all fields."); return; }
    setLoading(true);
    const { error } = await supabase.from("appointments").insert([{ patient_name: apptName, phone: apptPhone, date: apptDate, visit_type: apptType }]);
    setLoading(false);
    if (error) alert("Error: " + error.message); else setAppointmentDone(true);
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
          <div><div style={s.logo}>🩺 GastroDoc</div><div style={{ color: "#7fa8c9", fontSize: 10 }}>{clinic.clinic}</div></div>
        </div>
        <div style={s.page}>
          <div style={{ textAlign: "center", padding: "20px 0 28px" }}>
            <p style={{ fontSize: 48, margin: "0 0 12px" }}>🩺</p>
            <h2 style={{ color: "#00c9a7", fontSize: 22, margin: "0 0 6px" }}>{authMode === "login" ? "Welcome Back!" : "Create Account"}</h2>
            <p style={{ color: "#7fa8c9", fontSize: 13, margin: 0 }}>{authMode === "login" ? "Sign in to access your health portal" : "Join Dr. Vivek's patient portal"}</p>
          </div>
          <button style={s.btnGoogle} onClick={handleGoogleLogin}>
            <svg width="20" height="20" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
            Continue with Google
          </button>
          <div style={s.divider}><div style={s.dividerLine}></div><span style={s.dividerText}>or use email</span><div style={s.dividerLine}></div></div>
          {authMode === "signup" && (<><label style={s.label}>Full Name</label><input style={s.input} placeholder="Your full name" value={authName} onChange={e => setAuthName(e.target.value)} /></>)}
          <label style={s.label}>Email Address</label>
          <input style={s.input} placeholder="your@email.com" type="email" value={authEmail} onChange={e => setAuthEmail(e.target.value)} />
          <label style={s.label}>Password</label>
          <input style={s.input} placeholder="Min 6 characters" type="password" value={authPassword} onChange={e => setAuthPassword(e.target.value)} />
          {authError && (<div style={{ background: authError.startsWith("✅") ? "#00c9a720" : "#ef444420", border: `1px solid ${authError.startsWith("✅") ? "#00c9a7" : "#ef4444"}40`, borderRadius: 10, padding: "10px 14px", marginBottom: 14, fontSize: 13, color: authError.startsWith("✅") ? "#00c9a7" : "#ef4444" }}>{authError}</div>)}
          <button style={s.btn} onClick={authMode === "login" ? handleLogin : handleSignUp} disabled={authLoading}>{authLoading ? "Please wait..." : authMode === "login" ? "Sign In" : "Create Account"}</button>
          <button style={s.btnOutline} onClick={() => { setAuthMode(authMode === "login" ? "signup" : "login"); setAuthError(""); }}>{authMode === "login" ? "New patient? Create Account" : "Already have account? Sign In"}</button>
          <div style={{ ...s.card, marginTop: 20, textAlign: "center" }}>
            <p style={{ color: "#7fa8c9", fontSize: 12, margin: "0 0 4px" }}>🏥 {clinic.clinic}</p>
            <p style={{ color: "#00c9a7", fontSize: 12, margin: 0 }}>📞 {clinic.phone} · {clinic.timings}</p>
          </div>
        </div>
      </div>
    );
  }

  // ── DIAGNOSIS SCREEN ──
  if (showDiagnosisScreen) {
    return (
      <div style={s.app}>
        <div style={s.navbar}>
          <div><div style={s.logo}>🩺 GastroDoc</div><div style={{ color: "#7fa8c9", fontSize: 10 }}>{clinic.clinic}</div></div>
        </div>
        <div style={s.page}>
          <h2 style={s.title}>My Diagnosis 🏥</h2>
          <p style={s.subtitle}>Select your condition so we can personalise your health tips</p>
          {diagnosisList.map(d => (
            <div key={d} onClick={() => setSelectedDiagnosis(d)}
              style={{ background: selectedDiagnosis === d ? "#00c9a720" : "#132850", border: selectedDiagnosis === d ? "2px solid #00c9a7" : "2px solid transparent", borderRadius: 12, padding: "13px 16px", marginBottom: 9, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ color: "#e8f4f8", fontSize: 14 }}>{d}</span>
              {selectedDiagnosis === d && <span style={{ color: "#00c9a7", fontSize: 18 }}>✓</span>}
            </div>
          ))}
          {diagnosisSaved && (<div style={{ ...s.success, textAlign: "center", marginBottom: 10 }}>✅ Diagnosis saved successfully!</div>)}
          <button style={s.btn} onClick={handleSaveDiagnosis} disabled={diagnosisLoading || !selectedDiagnosis}>{diagnosisLoading ? "Saving..." : "Save My Diagnosis"}</button>
          <button style={s.btnOutline} onClick={() => setShowDiagnosisScreen(false)}>← Back to Home</button>
        </div>
      </div>
    );
  }

  // ── MAIN APP ──
  return (
    <div style={s.app}>
      <div style={s.navbar}>
        <div><div style={s.logo}>🩺 GastroDoc</div><div style={{ color: "#7fa8c9", fontSize: 10 }}>{clinic.clinic}</div></div>
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          {navScreens.map(sc => (<button key={sc.id} style={s.navBtn(screen === sc.id)} onClick={() => setScreen(sc.id)}>{sc.icon}</button>))}
        </div>
      </div>

      {/* HOME */}
      {screen === "home" && (
        <div style={s.page}>
          <h2 style={s.title}>Welcome 👋</h2>
          <p style={s.subtitle}>Hello, {user.user_metadata?.full_name || user.email}!</p>

          {/* ── DOCTOR CARD: small rectangle photo + details side by side ── */}
          <div style={{ ...s.card, background: "linear-gradient(135deg,#0d2d50,#0a1f3a)" }}>
            <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
              {/* ── RECTANGULAR PHOTO with teal border ── */}
              <img
                src="/dr-vivek.png.jpg"
                alt="Dr. Vivek Shirol"
                style={{
                  width: 100,
                  height: 130,
                  objectFit: "cover",
                  objectFit: "contain",
                  objectPosition: "center",
                  borderRadius: 10,
                  border: "3px solid #00c9a7",
                  boxShadow: "0 0 12px #00c9a740",
                  flexShrink: 0,
                  background: "#0a1628",
                }}
              />
              {/* ── Doctor details ── */}
              <div style={{ flex: 1 }}>
                <p style={{ color: "#00c9a7", fontWeight: "bold", fontSize: 15, margin: "0 0 3px" }}>👨‍⚕️ {clinic.doctor}</p>
                <p style={{ color: "#e8f4f8", fontSize: 11, margin: "0 0 6px", lineHeight: 1.4 }}>{clinic.quals}</p>
                <span style={{ background: "#00c9a720", color: "#00c9a7", fontSize: 10, padding: "2px 8px", borderRadius: 20, fontWeight: "bold", display: "inline-block", marginBottom: 8 }}>🩺 Gastroenterologist</span>
                <div style={{ height: 1, background: "#1e3a5f", margin: "8px 0" }} />
                <p style={{ color: "#7fa8c9", fontSize: 11, margin: "0 0 2px" }}>🏥 {clinic.clinic}</p>
                <p style={{ color: "#7fa8c9", fontSize: 11, margin: "0 0 2px" }}>📍 {clinic.address}</p>
                <p style={{ color: "#7fa8c9", fontSize: 11, margin: "0 0 2px" }}>📞 {clinic.phone}</p>
                <p style={{ color: "#00c9a7", fontSize: 11, margin: "3px 0 1px", fontWeight: "bold" }}>🕐 {clinic.timings}</p>
                <p style={{ color: "#ef4444", fontSize: 10, margin: 0 }}>🔴 {clinic.holiday}</p>
              </div>
            </div>
          </div>

          {/* DIAGNOSIS CARD */}
          <div style={{ ...s.card, borderLeft: "3px solid #a855f7", cursor: "pointer" }} onClick={() => setShowDiagnosisScreen(true)}>
            <p style={{ color: "#a855f7", fontSize: 11, fontWeight: "bold", marginBottom: 5 }}>🏥 MY DIAGNOSIS</p>
            {diagnosis ? (
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <p style={{ color: "#e8f4f8", fontSize: 14, margin: 0 }}>{diagnosis}</p>
                <span style={{ color: "#a855f7", fontSize: 11 }}>Edit ✏️</span>
              </div>
            ) : (
              <p style={{ color: "#7fa8c9", fontSize: 13, margin: 0 }}>Tap here to enter your diagnosis → Get personalised health tips!</p>
            )}
          </div>

          {/* DAILY HEALTH TIP */}
          <div style={{ ...s.card, borderLeft: "3px solid #3b82f6" }}>
            <p style={{ color: "#3b82f6", fontSize: 11, fontWeight: "bold", marginBottom: 8 }}>💡 DAILY HEALTH TIP</p>
            <p style={{ color: "#e8f4f8", fontSize: 14, lineHeight: 1.7, margin: "0 0 10px" }}>{todaysTip.tip}</p>
            <p style={{ color: "#7fa8c9", fontSize: 10, lineHeight: 1.5, margin: 0, borderTop: "1px solid #1e3a5f", paddingTop: 8 }}>📚 {todaysTip.ref}</p>
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
          <input style={s.input} placeholder="Enter your full name" value={patientName} onChange={e => setPatientName(e.target.value)} />
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
            <div key={b.type} style={s.bristolCard(bristolSelected?.type === b.type)} onClick={() => { setBristolSelected(b); setBristolLogged(false); }}>
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
          {bristolSelected && (<button style={s.btn} onClick={handleBristolLog}>{bristolLogged ? "✅ Logged!" : "Log This Entry"}</button>)}
          {bristolHistory.length > 0 && (
            <div style={{ marginTop: 20 }}>
              <p style={{ color: "#7fa8c9", fontSize: 11, fontWeight: "bold", marginBottom: 10 }}>RECENT LOGS</p>
              {bristolHistory.map((h, i) => (<div key={i} style={s.card}><p style={{ color: "#e8f4f8", fontWeight: "bold", fontSize: 13, margin: "0 0 2px" }}>Type {h.type} — {h.tag}</p><p style={{ color: "#7fa8c9", fontSize: 12, margin: 0 }}>{h.date} at {h.time}</p></div>))}
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
              <label style={s.label}>Full Name</label><input style={s.input} placeholder="Your full name" value={apptName} onChange={e => setApptName(e.target.value)} />
              <label style={s.label}>Phone Number</label><input style={s.input} placeholder="+91 XXXXX XXXXX" value={apptPhone} onChange={e => setApptPhone(e.target.value)} />
              <label style={s.label}>Preferred Date</label><input style={s.input} type="date" value={apptDate} onChange={e => setApptDate(e.target.value)} />
              <label style={s.label}>Visit Type</label>
              <select style={s.input} value={apptType} onChange={e => setApptType(e.target.value)}>
                <option>First Consultation</option><option>Follow-up</option><option>Post-Procedure</option><option>Emergency</option>
              </select>
              <button style={s.btn} onClick={handleAppointment} disabled={loading}>{loading ? "Saving..." : "Confirm Appointment Request"}</button>
            </>
          ) : (
            <div style={s.success}>
              <p style={{ fontSize: 32, margin: "0 0 10px" }}>✅</p>
              <p style={{ color: "#00c9a7", fontWeight: "bold", fontSize: 16, margin: "0 0 8px" }}>Appointment Requested!</p>
              <p style={{ color: "#e8f4f8", fontSize: 14, margin: "0 0 3px" }}>👤 {apptName}</p>
              <p style={{ color: "#e8f4f8", fontSize: 14, margin: "0 0 3px" }}>📅 {apptDate} · {apptType}</p>
              <p style={{ color: "#7fa8c9", fontSize: 13, marginTop: 10 }}>{clinic.clinic} will confirm on {apptPhone} shortly.</p>
              <button style={{ ...s.btn, marginTop: 14 }} onClick={() => { setAppointmentDone(false); setApptName(""); setApptPhone(""); setApptDate(""); fetchAppointments(); }}>Book Another</button>
            </div>
          )}
          {savedAppointments.length > 0 && (
            <div style={{ marginTop: 20 }}>
              <p style={{ color: "#7fa8c9", fontSize: 11, fontWeight: "bold", marginBottom: 10 }}>RECENT BOOKINGS</p>
              {savedAppointments.map((a, i) => (<div key={i} style={s.card}><p style={{ color: "#e8f4f8", fontWeight: "bold", fontSize: 13, margin: "0 0 3px" }}>👤 {a.patient_name}</p><p style={{ color: "#7fa8c9", fontSize: 12, margin: "0 0 2px" }}>📅 {a.date} · {a.visit_type}</p><p style={{ color: "#7fa8c9", fontSize: 12, margin: 0 }}>📞 {a.phone}</p></div>))}
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
                <div style={{ width: 52, height: 52, borderRadius: 12, background: v.color + "25", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, flexShrink: 0 }}>{v.emoji}</div>
                <div style={{ flex: 1 }}>
                  <p style={{ color: "#e8f4f8", fontWeight: "bold", fontSize: 14, margin: "0 0 4px" }}>{v.title}</p>
                  <p style={{ color: "#7fa8c9", fontSize: 12, margin: "0 0 10px" }}>{v.platform}</p>
                  <a href={v.link} target="_blank" rel="noreferrer" style={{ background: v.color, color: "#fff", padding: "6px 16px", borderRadius: 20, fontSize: 12, fontWeight: "bold", textDecoration: "none", display: "inline-block" }}>{v.platform === "YouTube" ? "▶ Watch" : "📱 Follow"}</a>
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
          <a href={"https://wa.me/91" + clinic.phone.replace(/\D/g, "")} target="_blank" rel="noreferrer" style={{ display: "block", background: "#25D366", color: "#fff", textAlign: "center", padding: 14, borderRadius: 12, fontWeight: "bold", fontSize: 15, textDecoration: "none", marginBottom: 10 }}>💬 WhatsApp Us</a>
          <a href={"tel:" + clinic.phone} style={{ display: "block", background: "#1e3a5f", color: "#00c9a7", textAlign: "center", padding: 13, borderRadius: 12, fontWeight: "bold", fontSize: 15, textDecoration: "none", marginBottom: 16 }}>📞 Call Clinic</a>
          {!msgSent ? (
            <>
              <label style={s.label}>Your Name</label><input style={s.input} placeholder="Your full name" value={msgName} onChange={e => setMsgName(e.target.value)} />
              <label style={s.label}>Phone Number</label><input style={s.input} placeholder="+91 XXXXX XXXXX" value={msgPhone} onChange={e => setMsgPhone(e.target.value)} />
              <label style={s.label}>Your Query / Message</label>
              <textarea style={{ ...s.input, height: 100, resize: "none" }} placeholder="Type your question..." value={msgText} onChange={e => setMsgText(e.target.value)} />
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
            <span style={{ fontSize: 16 }}>{n.icon}</span>{n.label}
          </button>
        ))}
      </div>
    </div>
  );
}
