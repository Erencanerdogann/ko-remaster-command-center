const STORAGE_KEY = "ko_remaster_command_center_v4_1";
// BURAYA KENDİ REPO ADRESİNİ YAZ: "kullaniciadi/repoadi"
const GITHUB_REPO = ""; 

// ---- LANGUAGE & TEXTS ----
let curLang = localStorage.getItem("ko_lang") || "tr";

const TEXTS = {
  tr: {
    // Topbar
    status_label: "Durum:",
    lbl_active: "Aktif:",
    lbl_done: "Biten:",
    lbl_crit: "Kritik:",
    lbl_last_save: "Son Kayıt:",
    btn_new: "＋ YENİ EKLE",
    btn_save: "💾 Kaydet",
    btn_reset: "🧨 Sıfırla",
    // Panels
    p_private_eren_sub: "Notlar / snippet / günlük",
    p_tasks: "📋 GÖREV YÖNETİMİ",
    p_stats: "📈 BİTME GRAFİĞİ",
    p_stats_sub: "Ortalama ilerleme + dağılım",
    // Sections
    sec_format: "Task Yazma Formatı",
    sec_format_sub: "net & anlaşılır",
    // Kanban
    col_todo: "Yapılacak",
    col_doing: "Sürüyor",
    col_done: "Bitti",
    // Stats
    st_overall: "Genel İlerleme",
    st_active_total: "Aktif / Toplam",
    st_critical: "Kritik",
    st_crit_sub: "Açık CRITICAL task",
    st_velocity: "Hız (Velocity)",
    st_velocity_sub: "Son 7 gün biten",
    st_timeline: "Değişiklik Akışı",
    // Modal
    mod_task: "GÖREV",
    mod_det: "Detay",
    mod_ops: "Operasyon",
    mod_checklist: "CheckList",
    mod_risk: "Risk / Not",
    mod_quick: "Hızlı İlerleme",
    // JS Dynamic
    js_new_task: "Yeni Hata / Görev",
    js_untitled: "Başlıksız",
    js_autosave: "OtoKayıt",
    js_manualsave: "Manuel Kayıt",
    js_offline: "ÇEVRİMDIŞI ❌",
    js_loaded: "Yüklendi",
    js_reset_confirm: "Her şeyi sıfırlayacağım. Emin misin?",
    js_reset_done: "🧨 Sıfırlandı.",
    js_saved: "✅ Kaydedildi.",
    js_del_confirm: "silinsin mi?",
    js_crit_open: "açık CRITICAL var",
    js_crit_none: "CRITICAL yok",
    js_flow_stable: "Akış stabil",
    js_flow_warn: "Önce CRITICAL temizle",
    js_active_total: "aktif · toplam",
    // Placeholders
    ph_search: "id / başlık / subsystem...",
    ph_note_eren: "// Burası senin alanın...",
    ph_note_tayfun: "// Hoca notları...",
    ph_title: "Başlık (kısa + net)",
    ph_prob: "PROBLEM\n- Ne oluyor?",
    ph_hypo: "SEBEP (VARSAYIM)\n- Neden?",
    ph_sol: "ÇÖZÜM\n- Adım adım",
    ph_done: "DONE KRİTERİ\n- Test adımları",
    ph_risk: "Bağımlılık / risk...",
    ph_steps: "- [ ] ...",
  },
  en: {
    status_label: "Status:",
    lbl_active: "Active:",
    lbl_done: "Done:",
    lbl_crit: "Critical:",
    lbl_last_save: "Last Save:",
    btn_new: "＋ NEW TASK",
    btn_save: "💾 Save",
    btn_reset: "🧨 Reset",
    p_private_eren_sub: "Notes / snippets / daily",
    p_tasks: "📋 TASK MANAGEMENT",
    p_stats: "📈 BURNDOWN CHART",
    p_stats_sub: "Avg progress + distribution",
    sec_format: "Task Format",
    sec_format_sub: "clear & concise",
    col_todo: "To Do",
    col_doing: "In Progress",
    col_done: "Done",
    st_overall: "Overall Progress",
    st_active_total: "Active / Total",
    st_critical: "Critical",
    st_crit_sub: "Open CRITICAL tasks",
    st_velocity: "Velocity",
    st_velocity_sub: "Done in last 7d",
    st_timeline: "Change Log",
    mod_task: "TASK",
    mod_det: "Detail",
    mod_ops: "Operations",
    mod_checklist: "CheckList",
    mod_risk: "Risk / Note",
    mod_quick: "Quick Progress",
    js_new_task: "New Bug / Task",
    js_untitled: "Untitled",
    js_autosave: "AutoSave",
    js_manualsave: "Manual Save",
    js_offline: "OFFLINE ❌",
    js_loaded: "Loaded",
    js_reset_confirm: "Hard Reset everything. Are you sure?",
    js_reset_done: "🧨 Reset done.",
    js_saved: "✅ Saved.",
    js_del_confirm: "delete?",
    js_crit_open: "open CRITICAL tasks",
    js_crit_none: "No CRITICAL issues",
    js_flow_stable: "Flow stable",
    js_flow_warn: "Clear CRITICAL first",
    js_active_total: "active · total",
    ph_search: "id / title / subsystem...",
    ph_note_eren: "// Your space...",
    ph_note_tayfun: "// Mentor notes...",
    ph_title: "Title (short + clear)",
    ph_prob: "PROBLEM\n- What is happening?",
    ph_hypo: "CAUSE (HYPOTHESIS)\n- Why?",
    ph_sol: "SOLUTION\n- Step by step",
    ph_done: "DONE CRITERIA\n- Test steps",
    ph_risk: "Dependencies / risks...",
    ph_steps: "- [ ] ...",
  }
};

function t(key){ return TEXTS[curLang][key] || key; }

function setLang(lang){
  curLang = lang;
  localStorage.setItem("ko_lang", lang);
  document.getElementById("langBtn").innerText = lang.toUpperCase();
  
  // Static HTML update
  document.querySelectorAll("[data-lang]").forEach(el => {
    const k = el.getAttribute("data-lang");
    if(TEXTS[lang][k]) el.innerText = TEXTS[lang][k];
  });

  // Placeholders
  const phMap = {
    "q": "ph_search", "noteErencan": "ph_note_eren", "noteTayfun": "ph_note_tayfun",
    "t_title": "ph_title", "t_problem": "ph_prob", "t_hypothesis": "ph_hypo",
    "t_solution": "ph_sol", "t_done": "ph_done", "t_risk": "ph_risk", "t_steps": "ph_steps"
  };
  for(const [id, k] of Object.entries(phMap)){
    const el = document.getElementById(id);
    if(el) el.placeholder = TEXTS[lang][k];
  }

  renderAll(); // Re-render dynamic parts
}

function toggleLang(){
  setLang(curLang === "tr" ? "en" : "tr");
}

// -- FACTORY PATTERN (Modular & DRY) --
const TaskFactory = {
  create: (overrides = {}) => {
    const now = Date.now();
    const defaults = {
      id: now + Math.floor(Math.random()*9999),
      title: t("js_new_task"),
      subsystem: "General",
      priority: "normal",
      status: "todo",
      progress: 0,
      owner: "Eren",
      problem: "",
      hypothesis: "",
      solution: "",
      doneCriteria: "",
      steps: "",
      risk: "",
      createdAt: now,
      updatedAt: now,
      doneAt: null,
      debugSteps: [false, false, false, false]
    };
    return { ...defaults, ...overrides };
  }
};

function seedTaskExact(line, subsystem, priority, status, progress, owner, noteExtra=""){
  return TaskFactory.create({
    title: line.trim(),
    subsystem,
    priority,
    status,
    progress: clamp(progress,0,100),
    owner,
    problem: line.trim() + (noteExtra ? ("\n\nNOT:\n" + noteExtra) : ""),
    doneAt: status === "done" ? Date.now() : null
  });
}

const DEFAULT_STATE = () => ({
  meta: { createdAt: Date.now(), version: "v4.1", project: "KO Remaster" },
  notes: { eren: "", tayfun: "" },
  tasks: [
    // Kullanıcının yazdığı maddeler (seed):
    seedTaskExact(
      "[Entity] Model ID Mismatch: Warrior Barbarian yerine yanlış model yükleniyor. Tüm moblar (örn: Guard) aynı base entity ID'yi kullanıyor olabilir.",
      "Entity", "blocker", "todo", 0, "Server",
      "Test karakteri ve moblar aynı entity class'ından türediği için ID çakışması yaşanıyor."
    ),
    seedTaskExact(
      "[UI] Alt+F4 Handler: Oyun penceresi kapatılmak istendiğinde direkt kapanmak yerine Exit UI penceresi açılmalı.",
      "UI", "high", "todo", 0, "Client",
      "Windows mesaj döngüsünde WM_CLOSE yakalanıp engellenmeli."
    ),
    seedTaskExact(
      "[Input] Point & Click: Mouse tıklandığında karakter hedef koordinata rotasyon alıp ilerlemeli (Pathfinding).",
      "Input", "high", "todo", 0, "Client",
      "Raycast ile zemin koordinatı alınıp navmesh üzerinde hareket sağlanacak."
    ),
    seedTaskExact(
      "[UI] Alt+F4 Exit Confirmation: Çıkış onayı için ikinci bir kontrol mekanizması (Duplicate Task).",
      "UI", "high", "todo", 0, "Client"
    ),
    seedTaskExact(
      "[Login] UX Flow: Login ekranında 'Enter' tuşu ile giriş işleminin tetiklenmesi.",
      "Login", "normal", "todo", 0, "Client"
    ),
    seedTaskExact(
      "[Entity] Ghost Entity / Cloning: Karakter hareket sonrası arkasında klon bırakıyor. Mob ve Player entity yapıları karışıyor (Testing).",
      "Entity", "blocker", "todo", 0, "Server",
      "Server-side pozisyon güncellemesi ile client-side interpolasyon arasında senkron hatası."
    ),
    seedTaskExact(
      "[Login] Auto-Login & Remember Me: Launcher entegrasyonu ve credential caching.",
      "Login", "normal", "todo", 0, "Client"
    ),
    seedTaskExact(
      "[UI] Cursor State: Tıklama anında mouse imlecinin görsel geri bildirimi (Asset: Drive).",
      "UI", "normal", "todo", 0, "Client"
    ),
    seedTaskExact(
      "[Input] Hold-to-Move: Mouse sol tık basılı tutulduğunda karakterin sürekli imleci takip etmesi (Diablo-style movement).",
      "Input", "high", "todo", 0, "Client",
      "MouseUp eventine kadar hareket vektörü her frame güncellenmeli."
    )
  ],
  events: [{ at: Date.now(), msg: "Sistem kuruldu (v4.1). Kullanıcı task listesi seed edildi." }]
});

let state = DEFAULT_STATE();
let currentTaskId = null;

document.addEventListener("DOMContentLoaded", () => {
  load();
  bindUI();
  tickClock();
  setInterval(tickClock, 1000);
  renderAll();
  initTheme();
  if(GITHUB_REPO) fetchGitCommits();
  checkNetworkStatus();
  setLang(curLang);
});

function bindUI(){
  const nE = document.getElementById("noteErencan");
  const nT = document.getElementById("noteTayfun");

  nE.addEventListener("input", () => { state.notes.eren = nE.value; autoSave(); });
  nT.addEventListener("input", () => { state.notes.tayfun = nT.value; autoSave(); });

  document.getElementById("q").addEventListener("input", renderBoard);
  document.getElementById("fSubsystem").addEventListener("change", renderBoard);
  document.getElementById("fPriority").addEventListener("change", renderBoard);
  document.getElementById("fOwner").addEventListener("change", renderBoard);
  document.getElementById("fHideDone").addEventListener("change", renderBoard);
  document.getElementById("sortBy").addEventListener("change", renderBoard);

  const imp = document.getElementById("importFile");
  imp.addEventListener("change", async (e) => {
    const file = e.target.files?.[0];
    if(!file) return;
    try{
      const txt = await file.text();
      const data = JSON.parse(txt);
      if(!data || !data.tasks) throw new Error("Geçersiz JSON");
      state = migrate(data);
      logEvent("JSON import alındı");
      save();
      renderAll();
      alert("✅ Import tamam.");
    }catch(err){
      alert("❌ Import hata: " + err.message);
    }finally{
      imp.value = "";
    }
  });

  window.addEventListener('online', () => { checkNetworkStatus(); syncSupabase("Reconnected"); });
  window.addEventListener('offline', checkNetworkStatus);
}

function tickClock(){
  document.getElementById("nowTime").innerText = new Date().toLocaleString();
}

function migrate(data){
  const s = {
    meta: data.meta || { createdAt: Date.now(), version:"v4.1", project:"KO Remaster" },
    notes: data.notes || { eren:"", tayfun:"" },
    tasks: Array.isArray(data.tasks) ? data.tasks.map(t => ({
      id: t.id ?? (Date.now()+Math.floor(Math.random()*9999)),
      title: t.title ?? t.text ?? "Untitled",
      subsystem: t.subsystem ?? "General",
      priority: t.priority ?? "normal",
      status: t.status ?? "todo",
      progress: clamp(Number(t.progress ?? 0),0,100),
      owner: t.owner ?? "Eren",
      problem: t.problem ?? "",
      hypothesis: t.hypothesis ?? "",
      solution: t.solution ?? "",
      doneCriteria: t.doneCriteria ?? "",
      steps: t.steps ?? "",
      risk: t.risk ?? "",
      createdAt: t.createdAt ?? Date.now(),
      updatedAt: t.updatedAt ?? Date.now(),
      doneAt: t.doneAt ?? null,
      debugSteps: Array.isArray(t.debugSteps) ? t.debugSteps : [false,false,false,false]
    })) : [],
    events: Array.isArray(data.events) ? data.events : []
  };
  s.tasks.forEach(t=>{
    if(t.status==="done"){ t.progress = 100; t.doneAt = t.doneAt ?? Date.now(); }
    if(t.progress===100 && t.status!=="done"){ t.status="done"; t.doneAt = t.doneAt ?? Date.now(); }
  });
  return s;
}

function load(){
  const raw = localStorage.getItem(STORAGE_KEY);
  if(raw){
    try{ state = migrate(JSON.parse(raw)); }
    catch{ state = DEFAULT_STATE(); }
  }else{
    state = DEFAULT_STATE();
  }
  document.getElementById("noteErencan").value = state.notes.eren || "";
  document.getElementById("noteTayfun").value = state.notes.tayfun || "";
  updateTopStatus(t("js_loaded"));
}

function save(){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state, null, 2));
}


// ---- AUTOSAVE (local + Supabase) ----
let _supaSyncTimer = null;

async function syncSupabase(reason="Sync"){
  // Supabase.js modülünü kullan
  if(!SupaService.isConnected) return;

  const { error } = await SupaService.syncTasks(state.tasks || []);
  
  if(error){
    console.error("Supabase sync error:", error);
    updateTopStatus("Supabase ❌ (err)");
  }else{
    updateTopStatus(reason + " → Supabase ✅");
  }
  refreshHealth();
}

function autoSave(){
  state.meta.lastSavedAt = Date.now();
  save(); // localStorage
  updateTopStatus(t("js_autosave"));
  refreshHealth();

  // Supabase'e spam atmamak için debounce
  clearTimeout(_supaSyncTimer);
  _supaSyncTimer = setTimeout(()=>syncSupabase("AutoSave"), 700);
}



async function manualSave(){
  state.meta.lastSavedAt = Date.now();
  save(); // local
  updateTopStatus(t("js_manualsave") + " ✅");

  await syncSupabase("Manual Save");
  alert(t("js_saved"));
}


function updateTopStatus(mode){
  const t = new Date(state.meta.lastSavedAt || Date.now()).toLocaleTimeString();
  document.getElementById("sSave").innerText = (state.meta.lastSavedAt ? t : "—");
  document.getElementById("statusText").innerText = `${mode} · ${new Date().toLocaleTimeString()}`;
}

function downloadBackup(){
  const dataStr = "data:application/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state, null, 2));
  const a = document.createElement("a");
  a.href = dataStr;
  const dateStr = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19);
  a.download = `KO_Remaster_CommandCenter_v4_1_Backup_${dateStr}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  logEvent("JSON yedek indirildi");
}

function triggerImport(){ document.getElementById("importFile").click(); }

function hardReset(){
  if(!confirm(t("js_reset_confirm"))) return;
  localStorage.removeItem(STORAGE_KEY);
  state = DEFAULT_STATE();
  save();
  renderAll();
  alert(t("js_reset_done"));
}

function renderAll(){
  renderFilters();
  renderBoard();
  recalc();
  renderEvents();
  refreshHealth();
}

function renderFilters(){
  const subs = new Set(state.tasks.map(t => (t.subsystem||"General").trim()).filter(Boolean));
  const sel = document.getElementById("fSubsystem");
  const current = sel.value;
  sel.innerHTML = `<option value="">(Hepsi)</option>` + [...subs].sort().map(s => `<option value="${escapeHtml(s)}">${escapeHtml(s)}</option>`).join("");
  sel.value = subs.has(current) ? current : "";
}

function renderBoard(){
  const q = (document.getElementById("q").value || "").toLowerCase().trim();
  const fSub = document.getElementById("fSubsystem").value;
  const fPr = document.getElementById("fPriority").value;
  const fOw = document.getElementById("fOwner").value;
  const fHideDone = document.getElementById("fHideDone").checked;
  const sort = document.getElementById("sortBy").value;

  let tasks = [...state.tasks];

  tasks = tasks.filter(t=>{
    if(fHideDone && t.status === "done") return false;
    if(fSub && t.subsystem !== fSub) return false;
    if(fPr && t.priority !== fPr) return false;
    if(fOw && t.owner !== fOw) return false;
    if(q){
      const blob = [
        t.id, t.title, t.subsystem, t.owner, t.priority, t.status,
        t.problem, t.hypothesis, t.solution, t.doneCriteria, t.steps, t.risk
      ].join(" ").toLowerCase();
      if(!blob.includes(q)) return false;
    }
    return true;
  });

  tasks.sort((a,b)=>{
    if(sort==="updated") return (b.updatedAt||0) - (a.updatedAt||0);
    if(sort==="created") return (b.createdAt||0) - (a.createdAt||0);
    if(sort==="progress") return (b.progress||0) - (a.progress||0);
    return prioScore(b.priority) - prioScore(a.priority);
  });

  const todo = tasks.filter(t=>t.status==="todo");
  const doing = tasks.filter(t=>t.status==="doing");
  const done = tasks.filter(t=>t.status==="done");

  renderCol("todo", todo, t("col_todo"));
  renderCol("doing", doing, t("col_doing"));
  renderCol("done", done, t("col_done"));

  document.getElementById("cTodo").innerText = todo.length;
  document.getElementById("cDoing").innerText = doing.length;
  document.getElementById("cDone").innerText = done.length;

  const active = state.tasks.filter(t=>t.status!=="done").length;
  document.getElementById("activeInfo").innerText = `${active} ${t("js_active_total").split("·")[0]} · ${state.tasks.length} ${t("js_active_total").split("·")[1]}`;

  // TOP STATUS METRICS
  const doneCount = state.tasks.filter(t=>t.status==="done").length;
  const critOpen = state.tasks.filter(t=>t.priority==="blocker" && t.status!=="done").length;

  document.getElementById("sActive").innerText = active;
  document.getElementById("sDone").innerText = doneCount;
  document.getElementById("sCrit").innerText = critOpen;

  document.getElementById("activeCount").innerText = active;
  document.getElementById("totalCount").innerText = state.tasks.length;
}

function renderCol(id, arr, titleOverride){
  const el = document.getElementById(id);
  if(titleOverride) document.querySelector(`#${id}`).parentElement.querySelector(".col-head b").innerText = titleOverride;
  el.innerHTML = "";
  arr.forEach(t=>{
    const badge = t.priority === "blocker" ? "blocker" : (t.priority==="high" ? "high" : "normal");
    const doneTag = (t.status==="done") ? `<span class="tag done">DONE</span>` : "";
    const subs = t.subsystem ? `<span class="tag subsys">${escapeHtml(t.subsystem)}</span>` : "";

    // Avatar Logic
    const owner = t.owner || "?";
    const initial = owner.charAt(0).toUpperCase();
    let avCls = "def";
    if(owner === "Eren") avCls = "eren";
    else if(owner === "Tayfun") avCls = "tayfun";
    else if(owner === "Client") avCls = "client";
    else if(owner === "Server") avCls = "server";

    const card = document.createElement("div");
    card.className = "card";
    card.onclick = () => openTask(t.id);
    // Drag Properties
    card.draggable = true;
    card.ondragstart = (ev) => drag(ev, t.id);
    // Tooltip Events
    card.onmouseenter = (ev) => showTooltip(ev, t.id);
    card.onmousemove = (ev) => moveTooltip(ev);
    card.onmouseleave = hideTooltip;

    card.innerHTML = `
      <div class="card-top">
        <div style="display:flex; flex-direction:column; gap:6px; min-width:0; flex:1;">
          <div class="card-title">${escapeHtml(t.title || t("js_untitled"))}</div>
          <div class="tagrow">
            <span class="tag ${badge}">${t.priority.toUpperCase()}</span>
            ${subs}
            ${doneTag}
            <div class="avatar ${avCls}" title="${escapeHtml(owner)}">${initial}</div>
            <span class="tag" style="border-color:rgba(255,255,255,.18); color:rgba(255,255,255,.78); background:rgba(255,255,255,.06)">#${t.id}</span>
          </div>
        </div>
        <div style="text-align:right; display:flex; flex-direction:column; gap:6px;">
          <div class="mono" style="color:var(--muted); font-size:12px">${(t.progress??0)}%</div>
          <button class="btn" style="padding:6px 8px; border-radius:10px" onclick="event.stopPropagation(); quickBump(${t.id})">＋10</button>
        </div>
      </div>

      <div class="bar"><i style="width:${clamp(t.progress||0,0,100)}%"></i></div>
      <div class="mini">${escapeHtml(shorten(t.problem || "", 140))}</div>
    `;

    el.appendChild(card);
  });
}

function quickBump(id){
  const t = state.tasks.find(x=>x.id===id);
  if(!t) return;
  t.progress = clamp((t.progress||0)+10,0,100);
  if(t.progress===100){ t.status="done"; t.doneAt = Date.now(); }
  t.updatedAt = Date.now();
  logEvent(`Progress: #${id} -> ${t.progress}%`);
  autoSave();
  renderAll();
}

function recalc(){
  const total = state.tasks.length || 1;
  const avg = Math.round(state.tasks.reduce((s,t)=>s+(Number(t.progress)||0),0)/total);
  document.getElementById("overallPct").innerText = avg + "%";

  const done = state.tasks.filter(t=>t.status==="done").length;
  const blockers = state.tasks.filter(t=>t.priority==="blocker" && t.status!=="done").length;
  document.getElementById("critCount").innerText = blockers;

  document.getElementById("blockerHint").innerText =
    blockers ? `${blockers} ${t("js_crit_open")}` : t("js_crit_none");

  document.getElementById("overallHint").innerText =
    blockers ? t("js_flow_warn") : t("js_flow_stable");

  const donePct = Math.round((done/(state.tasks.length||1))*100);
  document.getElementById("donutVal").innerText = donePct + "%";
  const deg = Math.round((donePct/100)*360);
  document.getElementById("donut").style.background =
    `conic-gradient(var(--c-green) ${deg}deg, rgba(255,255,255,.08) 0deg)`;

  document.getElementById("lNormal").innerText = state.tasks.filter(t=>t.priority==="normal").length;
  document.getElementById("lHigh").innerText   = state.tasks.filter(t=>t.priority==="high").length;
  document.getElementById("lCrit").innerText   = state.tasks.filter(t=>t.priority==="blocker").length;
  document.getElementById("lDone").innerText   = done;

  const wrap = document.getElementById("subsysBars");
  const by = {};
  state.tasks.forEach(t=>{
    const k = (t.subsystem||"General").trim();
    if(!by[k]) by[k] = { sum:0, count:0 };
    by[k].sum += Number(t.progress)||0;
    by[k].count++;
  });
  wrap.innerHTML = Object.keys(by).sort().map(k=>{
    const pct = Math.round(by[k].sum / (by[k].count||1));
    return `
      <div style="display:flex; flex-direction:column; gap:6px; margin-bottom:10px">
        <div style="display:flex; align-items:center; justify-content:space-between; gap:10px">
          <div class="mono" style="color:rgba(255,255,255,.85); font-size:12px">${escapeHtml(k)}</div>
          <div class="mono" style="color:var(--txt-muted); font-size:12px">${pct}%</div>
        </div>
        <div class="bar"><i style="width:${pct}%"></i></div>
      </div>
    `;
  }).join("");

  const weekAgo = Date.now() - 7*24*60*60*1000;
  const v = state.tasks.filter(t=>t.doneAt && t.doneAt >= weekAgo).length;
  document.getElementById("velocity").innerText = v + " / 7d";

  refreshHealth();
  renderEvents();
}

function refreshHealth(){
  const openBlockers = state.tasks.filter(t=>t.priority==="blocker" && t.status!=="done").length;
  const openDoing = state.tasks.filter(t=>t.status==="doing").length;

  const dot = document.getElementById("healthDot");
  const label = document.getElementById("healthLabel");
  const detail = document.getElementById("healthDetail");

  if(openBlockers){
    dot.className = "dot red";
    label.innerText = "RISK";
    detail.innerText = `· ${openBlockers} CRITICAL açık`;
  }else if(openDoing > 0){
    dot.className = "dot amber";
    label.innerText = "WORKING";
    detail.innerText = `· ${openDoing} task üzerinde çalışılıyor`;
  }else{
    dot.className = "dot";
    label.innerText = "STABLE";
    detail.innerText = "· blokaj yok";
  }
}

function renderEvents(){
  const list = document.getElementById("events");
  list.innerHTML = "";
  const arr = [...(state.events||[])].slice(-40).reverse();
  arr.forEach(e=>{
    const row = document.createElement("div");
    row.className = "ev";
    
    let msg = escapeHtml(e.msg || "");
    let ballColor = "var(--txt-muted)";
    let typeClass = "";

    // 1. Olay Türüne Göre Renk Belirle
    if(/created/i.test(msg)) ballColor = "var(--c-green)";
    else if(/deleted/i.test(msg)) ballColor = "var(--c-red)";
    else if(/Status/i.test(msg)) ballColor = "var(--c-amber)";
    else if(/Progress/i.test(msg)) ballColor = "var(--c-blue)";
    else if(/saved/i.test(msg)) ballColor = "var(--c-violet)";
    if(/created/i.test(msg)) typeClass = "created";
    else if(/deleted/i.test(msg)) typeClass = "deleted";
    else if(/Status/i.test(msg)) typeClass = "status";
    else if(/Progress/i.test(msg)) typeClass = "progress";
    else if(/saved/i.test(msg)) typeClass = "saved";

    // 2. ID Kısaltma (#123456789 -> #..6789)
    msg = msg.replace(/#(\d+)/g, (m, id) => {
      const short = id.length > 4 ? ".." + id.slice(-4) : id;
      return `<span class="mono" title="${id}" style="color:var(--txt-main); background:rgba(255,255,255,.1); padding:0 4px; border-radius:4px; font-size:10px; cursor:help; letter-spacing:-0.5px">#${short}</span>`;
      return `<span class="id-tag" title="${id}">#${short}</span>`;
    });

    row.innerHTML = `
      <div class="ball" style="background:${ballColor}; box-shadow:0 0 6px ${ballColor}; border:none"></div>
      <div class="ball ${typeClass}"></div>
      <div style="display:flex; flex-direction:column; gap:2px">
        <div class="txt" style="font-size:11px">${msg}</div>
        <div class="when" style="opacity:.5; font-size:10px">${new Date(e.at).toLocaleTimeString()}</div>
      </div>
    `;
    list.appendChild(row);
  });
  document.getElementById("logCount").innerText = `${(state.events||[]).length} event`;
}

function logEvent(msg){
  state.events = state.events || [];
  state.events.push({ at: Date.now(), msg });
  if(state.events.length > 300) state.events = state.events.slice(-300);
  autoSave();
}

// ===== MODAL =====
function openTask(id){
  const t = state.tasks.find(x=>x.id===id);
  if(!t) return;
  currentTaskId = id;

  document.getElementById("modalBack").style.display = "flex";
  document.getElementById("modalTitle").innerText = t("mod_task");
  document.getElementById("taskIdMono").innerText = `#${t.id}`;
  document.getElementById("metaMono").innerText = `created: ${new Date(t.createdAt).toLocaleDateString()} · updated: ${new Date(t.updatedAt).toLocaleString()}`;

  setVal("t_title", t.title);
  setVal("t_priority", t.priority);
  setVal("t_status", t.status);
  setVal("t_progress", t.progress);
  setVal("t_subsystem", t.subsystem);
  setVal("t_owner", t.owner);

  setVal("t_problem", t.problem);
  setVal("t_hypothesis", t.hypothesis);
  setVal("t_solution", t.solution);
  setVal("t_done", t.doneCriteria);
  setVal("t_steps", t.steps);
  setVal("t_risk", t.risk);

  // Debug Steps Load
  const d = t.debugSteps || [false,false,false,false];
  for(let i=0; i<4; i++){
    document.getElementById("dbg_"+(i+1)).checked = d[i];
  }
}

function closeModal(ev){
  if(ev && ev.target && ev.target.id !== "modalBack") return;
  document.getElementById("modalBack").style.display = "none";
  currentTaskId = null;
}

function openCreate(){
  // Sadece veri üretimi (Factory kullanımı)
  const t = TaskFactory.create();
  
  state.tasks.unshift(t);
  logEvent(`Task created: #${t.id}`);
  save();
  renderAll();
  openTask(t.id);
}

function saveModal(){
  if(!currentTaskId) return;
  const t = state.tasks.find(x=>x.id===currentTaskId);
  if(!t) return;

  const oldStatus = t.status;
  const oldProgress = t.progress;

  t.title = getVal("t_title").trim() || "Untitled";
  t.priority = getVal("t_priority");
  t.status = getVal("t_status");
  t.progress = clamp(Number(getVal("t_progress") || 0), 0, 100);
  t.subsystem = getVal("t_subsystem").trim() || "General";
  t.owner = getVal("t_owner");

  t.problem = getVal("t_problem");
  t.hypothesis = getVal("t_hypothesis");
  t.solution = getVal("t_solution");
  t.doneCriteria = getVal("t_done");
  t.steps = getVal("t_steps");
  t.risk = getVal("t_risk");

  // Debug Steps Save
  t.debugSteps = [
    document.getElementById("dbg_1").checked,
    document.getElementById("dbg_2").checked,
    document.getElementById("dbg_3").checked,
    document.getElementById("dbg_4").checked
  ];

  // Tutarlılık Kontrolü (Consistency Check)
  if(t.status === "done"){ 
    t.progress = 100; 
    t.doneAt = t.doneAt || Date.now(); 
  } else {
    // Eğer durum Done değilse ama progress 100 ise (veya kullanıcı unuttuysa) düzelt
    if(t.progress === 100) t.progress = (t.status==="doing" ? 50 : 0);
    t.doneAt = null;
  }

  t.updatedAt = Date.now();

  if(t.status !== oldStatus){
    logEvent(`Status: #${t.id} -> ${t.status}`);
  } else if (t.progress !== oldProgress){
    logEvent(`Progress: #${t.id} -> ${t.progress}%`);
  } else {
    logEvent(`Task saved: #${t.id}`);
  }
  
  autoSave();
  renderAll();
  closeModal(); // Alert yerine pencereyi kapat
}

function deleteCurrent(){
  if(!currentTaskId) return;
  const t = state.tasks.find(x=>x.id===currentTaskId);
  if(!t) return;
  if(!confirm(`#${t.id} silinsin mi?`)) return;

  state.tasks = state.tasks.filter(x=>x.id!==currentTaskId);
  logEvent(`Task deleted: #${t.id}`);
  autoSave();
  closeModal();
  renderAll();
}

function quickMove(status){
  if(!currentTaskId) return;
  const t = state.tasks.find(x=>x.id===currentTaskId);
  if(!t) return;
  t.status = status;
  
  if(status==="done"){ 
    t.progress = 100; 
    t.doneAt = t.doneAt || Date.now(); 
  } else {
    // Done'dan geri dönüyorsa veya progress 100 kalmışsa düzelt
    if(t.progress === 100) t.progress = (status==="doing" ? 50 : 0);
    if(status === "todo") t.progress = 0;
    t.doneAt = null;
  }

  t.updatedAt = Date.now();
  logEvent(`Status: #${t.id} -> ${status}`);
  autoSave();
  renderAll();
  closeModal();
}

function setProgress(p){
  document.getElementById("t_progress").value = clamp(p,0,100);
  if(p===100) document.getElementById("t_status").value = "done";
}

function setVal(id, v){ document.getElementById(id).value = (v ?? ""); }
function getVal(id){ return document.getElementById(id).value ?? ""; }

function clamp(n, a, b){ return Math.max(a, Math.min(b, n)); }
function prioScore(p){ return p==="blocker" ? 3 : (p==="high" ? 2 : 1); }

function shorten(s, n){
  s = (s||"").replace(/\s+/g," ").trim();
  if(s.length<=n) return s;
  return s.slice(0, n-1) + "…";
}
function escapeHtml(str){
  return String(str ?? "")
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}

// ---- GITHUB FETCH ----
async function fetchGitCommits(){
  const list = document.getElementById("gitList");
  const label = document.getElementById("repoLabel");
  const led = document.getElementById("gitLed");
  const timeLabel = document.getElementById("gitLastTime");
  
  if(!GITHUB_REPO){
    list.innerHTML = `<div class="mini" style="color:var(--amber)">⚠️ Kodda <b>GITHUB_REPO</b> değişkenini doldurmalısın.<br/>Örn: "erencan/ko-remaster"</div>`;
    return;
  }

  label.innerText = GITHUB_REPO;
  list.innerHTML = `<div class="mini">Yükleniyor...</div>`;
  timeLabel.innerText = "";
  
  // LED: Sarı (İşlem sürüyor)
  led.style.background = "var(--c-amber)";
  led.style.boxShadow = "0 0 10px var(--c-amber)";

  try{
    const res = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/commits?per_page=5`);
    if(!res.ok) throw new Error("Repo bulunamadı veya gizli.");
    const data = await res.json();
    
    list.innerHTML = data.map(c => {
      const msg = c.commit.message.split("\n")[0];
      const date = new Date(c.commit.author.date).toLocaleDateString();
      const author = c.commit.author.name;
      return `
        <a href="${escapeHtml(c.html_url)}" target="_blank" style="text-decoration:none; display:flex; flex-direction:column; gap:2px; border-bottom:1px solid rgba(255,255,255,.05); padding-bottom:6px; cursor:pointer">
          <div class="mini" style="color:var(--txt); font-weight:600">${escapeHtml(msg)}</div>
          <div class="mono" style="font-size:10px; color:var(--muted)">${escapeHtml(author)} · ${date}</div>
        </a>
      `;
    }).join("");

    // LED: Yeşil (Başarılı)
    led.style.background = "var(--c-green)";
    led.style.boxShadow = "0 0 10px var(--c-green)";

    if(data.length > 0){
      const lastDate = new Date(data[0].commit.author.date);
      timeLabel.innerText = timeAgo(lastDate);
    }

  }catch(e){
    list.innerHTML = `<div class="mini" style="color:var(--red)">Hata: ${e.message}</div>`;
    // LED: Kırmızı (Hata)
    led.style.background = "var(--c-red)";
    led.style.boxShadow = "0 0 10px var(--c-red)";
  }
}

function timeAgo(date) {
  const seconds = Math.floor((new Date() - date) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + "y ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + "mo ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + "d ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + "h ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + "m ago";
  return Math.floor(seconds) + "s ago";
}

// ---- THEME TOGGLE ----
function toggleTheme(){
  document.body.classList.toggle("light-mode");
  const isLight = document.body.classList.contains("light-mode");
  localStorage.setItem("ko_theme", isLight ? "light" : "dark");
  document.getElementById("themeBtn").innerText = isLight ? "☾" : "☀";
}
function initTheme(){
  if(localStorage.getItem("ko_theme")==="light"){
    document.body.classList.add("light-mode");
    document.getElementById("themeBtn").innerText = "☾";
  }
}

// ---- DRAG AND DROP LOGIC ----
function drag(ev, id){
  // Sürüklenen task ID'sini taşı
  ev.dataTransfer.setData("text/plain", id);
  ev.dataTransfer.effectAllowed = "move";
}

function allowDrop(ev){
  ev.preventDefault(); // Drop'a izin ver
  ev.dataTransfer.dropEffect = "move";
}

function dragEnter(ev){
  ev.preventDefault();
  ev.currentTarget.classList.add("drag-over");
}

function dragLeave(ev){
  ev.currentTarget.classList.remove("drag-over");
}

function drop(ev, newStatus){
  ev.preventDefault();
  ev.currentTarget.classList.remove("drag-over");
  
  const id = Number(ev.dataTransfer.getData("text/plain"));
  if(!id) return;

  // Taskı bul ve güncelle (quickMove mantığıyla aynı)
  currentTaskId = id; // quickMove global id kullanıyor
  quickMove(newStatus);
  currentTaskId = null; // Temizlik
}

// ---- TOOLTIP LOGIC ----
const tooltipEl = document.getElementById("tooltip");

function showTooltip(ev, id){
  const t = state.tasks.find(x=>x.id===id);
  if(!t) return;

  const dSteps = t.debugSteps || [false,false,false,false];
  const debugHtml = dSteps.map(s => 
    `<span style="width:8px; height:8px; border-radius:2px; background:${s?'var(--c-amber)':'rgba(255,255,255,.1)'}; border:1px solid ${s?'var(--c-amber)':'rgba(255,255,255,.2)'}; display:inline-block;"></span>`
  ).join("");

  tooltipEl.innerHTML = `
    <strong>${escapeHtml(t.title)}</strong>
    <span>${escapeHtml(shorten(t.problem || "Açıklama yok.", 150))}</span>
    <div style="display:flex; gap:4px; margin-top:6px; align-items:center"><span class="mono" style="font-size:10px; color:var(--txt-muted)">DBG:</span>${debugHtml}</div>
    <div class="meta">
      <span style="color:${t.priority==='blocker'?'var(--c-red)':'var(--c-blue)'}">${t.priority.toUpperCase()}</span>
      <span>Owner: ${escapeHtml(t.owner)}</span>
      <span>Sub: ${escapeHtml(t.subsystem)}</span>
    </div>
  `;
  tooltipEl.style.display = "block";
  moveTooltip(ev);
}

function moveTooltip(ev){
  // Ekranın sağına taşarsa sola kaydır
  const x = (ev.clientX + 320 > window.innerWidth) ? ev.clientX - 310 : ev.clientX + 15;
  const y = (ev.clientY + 150 > window.innerHeight) ? ev.clientY - 100 : ev.clientY + 15;
  tooltipEl.style.left = x + "px";
  tooltipEl.style.top = y + "px";
}

function hideTooltip(){ tooltipEl.style.display = "none"; }

// ---- NETWORK STATUS ----
function checkNetworkStatus(){
  const badge = document.getElementById("offlineBadge");
  if(!navigator.onLine){
    badge.style.display = "block";
    updateTopStatus(t("js_offline"));
  } else {
    badge.style.display = "none";
  }
}

// INIT SUPABASE
(function(){
  // Supabase.js üzerinden başlat
  SupaService.init(async () => {
    updateTopStatus("Supabase ✅ Connected");
    
    // İlk bağlantıda veri çekme (Opsiyonel)
    // Eğer local boşsa sunucudan çek
    if(!state.tasks || state.tasks.length === 0) {
      const { data, error } = await SupaService.fetchTasks();
      if(!error && data && data.length > 0) {
        state.tasks = data.map(SupaService.mapRowToTask);
        save();
        renderAll();
        console.log("📥 Supabase'den veri çekildi.");
      }
    }
  });
})();