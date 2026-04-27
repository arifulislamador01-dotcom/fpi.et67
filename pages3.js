// Pages Part 3: Resources, Assignments, Teachers, Chat, AI, CGPA, Manage
function render_resources(){
  let h=`<div class="section-header"><div class="section-title">📦 ${lang==='bn'?'রিসোর্স':'Resources'}</div></div>`;
  h+=`<div class="tabs"><button class="tab-btn active" onclick="showResTab('notes')">📝 Notes</button><button class="tab-btn" onclick="showResTab('quiz')">🧠 Quiz</button><button class="tab-btn" onclick="showResTab('circuits')">⚡ Circuits</button><button class="tab-btn" onclick="showResTab('links')">🔗 Links</button></div>`;
  // Notes
  h+=`<div id="resNotes"><div class="grid-auto">`;
  SUBJECTS.forEach(s=>{h+=`<div class="card"><div class="subject-code">${s.code}</div><div style="font-weight:600;margin:4px 0">${lang==='bn'?s.nameBn:s.name}</div><p style="font-size:0.8rem;color:var(--text2)">👨‍🏫 ${lang==='bn'?s.teacherBn:s.teacher}</p></div>`;});
  const notes=JSON.parse(localStorage.getItem('subjectNotes')||'[]');
  if(notes.length){notes.forEach(n=>{h+=`<div class="card"><b>${n.title}</b><p style="font-size:0.8rem">${n.content}</p><small>${n.date}</small></div>`;});}
  h+=`</div></div>`;
  // Quiz
  h+=`<div id="resQuiz" style="display:none"><div class="card"><div class="card-title">🧠 Daily Quiz (30 questions)</div><div id="quizArea"></div><button class="btn btn-primary" onclick="startQuiz()">Start Quiz</button></div></div>`;
  // Circuits
  h+='<div id="resCircuits" style="display:none"><div class="grid-auto">';
  var circuits=[
    {name:"Series Circuit",desc:"R1+R2+R3 in series",svg:'<svg viewBox="0 0 220 80" width="200"><line x1="0" y1="40" x2="30" y2="40" stroke="#f59e0b" stroke-width="2"><animate attributeName="stroke-dashoffset" from="20" to="0" dur="1s" repeatCount="indefinite"/></line><rect x="30" y="25" width="40" height="30" fill="none" stroke="#3b82f6" stroke-width="2" rx="3"/><text x="50" y="44" text-anchor="middle" fill="#f59e0b" font-size="10">R1</text><line x1="70" y1="40" x2="90" y2="40" stroke="#f59e0b" stroke-width="2"/><rect x="90" y="25" width="40" height="30" fill="none" stroke="#3b82f6" stroke-width="2" rx="3"/><text x="110" y="44" text-anchor="middle" fill="#f59e0b" font-size="10">R2</text><line x1="130" y1="40" x2="150" y2="40" stroke="#f59e0b" stroke-width="2"/><rect x="150" y="25" width="40" height="30" fill="none" stroke="#3b82f6" stroke-width="2" rx="3"/><text x="170" y="44" text-anchor="middle" fill="#f59e0b" font-size="10">R3</text><line x1="190" y1="40" x2="220" y2="40" stroke="#f59e0b" stroke-width="2"/><circle cx="5" cy="40" r="5" fill="#10b981"><animate attributeName="cx" values="5;215" dur="2s" repeatCount="indefinite"/></circle></svg>'},
    {name:"Parallel Circuit",desc:"R1||R2 parallel connection",svg:'<svg viewBox="0 0 200 100" width="200"><line x1="0" y1="50" x2="40" y2="50" stroke="#f59e0b" stroke-width="2"/><line x1="40" y1="50" x2="40" y2="20" stroke="#f59e0b" stroke-width="2"/><line x1="40" y1="50" x2="40" y2="80" stroke="#f59e0b" stroke-width="2"/><rect x="60" y="10" width="40" height="20" fill="none" stroke="#3b82f6" stroke-width="2" rx="3"/><text x="80" y="24" text-anchor="middle" fill="#f59e0b" font-size="9">R1</text><rect x="60" y="70" width="40" height="20" fill="none" stroke="#3b82f6" stroke-width="2" rx="3"/><text x="80" y="84" text-anchor="middle" fill="#f59e0b" font-size="9">R2</text><line x1="40" y1="20" x2="60" y2="20" stroke="#f59e0b" stroke-width="2"/><line x1="100" y1="20" x2="140" y2="20" stroke="#f59e0b" stroke-width="2"/><line x1="40" y1="80" x2="60" y2="80" stroke="#f59e0b" stroke-width="2"/><line x1="100" y1="80" x2="140" y2="80" stroke="#f59e0b" stroke-width="2"/><line x1="140" y1="20" x2="140" y2="80" stroke="#f59e0b" stroke-width="2"/><line x1="140" y1="50" x2="200" y2="50" stroke="#f59e0b" stroke-width="2"/></svg>'},
    {name:"Star-Delta Starter",desc:"Y-Δ motor starting circuit",svg:'<svg viewBox="0 0 200 120" width="200"><polygon points="100,10 40,100 160,100" fill="none" stroke="#3b82f6" stroke-width="2"/><text x="100" y="60" text-anchor="middle" fill="#f59e0b" font-size="12">Y</text><circle cx="100" cy="10" r="4" fill="#10b981"/><circle cx="40" cy="100" r="4" fill="#10b981"/><circle cx="160" cy="100" r="4" fill="#10b981"/><text x="100" y="118" text-anchor="middle" fill="#94a3b8" font-size="9">Star Connection</text><line x1="100" y1="10" x2="100" y2="0" stroke="#f59e0b" stroke-width="2"><animate attributeName="stroke-opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite"/></line><line x1="40" y1="100" x2="20" y2="110" stroke="#f59e0b" stroke-width="2"/><line x1="160" y1="100" x2="180" y2="110" stroke="#f59e0b" stroke-width="2"/></svg>'},
    {name:"DOL Starter",desc:"Direct On Line motor starter",svg:'<svg viewBox="0 0 200 130" width="200"><rect x="60" y="5" width="80" height="25" fill="none" stroke="#ef4444" stroke-width="2" rx="4"/><text x="100" y="22" text-anchor="middle" fill="#ef4444" font-size="9">MCCB</text><line x1="100" y1="30" x2="100" y2="45" stroke="#f59e0b" stroke-width="2"/><rect x="70" y="45" width="60" height="20" fill="none" stroke="#3b82f6" stroke-width="2" rx="3"/><text x="100" y="59" text-anchor="middle" fill="#3b82f6" font-size="9">Contactor</text><line x1="100" y1="65" x2="100" y2="75" stroke="#f59e0b" stroke-width="2"/><rect x="70" y="75" width="60" height="20" fill="none" stroke="#10b981" stroke-width="2" rx="3"/><text x="100" y="89" text-anchor="middle" fill="#10b981" font-size="9">OLR</text><line x1="100" y1="95" x2="100" y2="105" stroke="#f59e0b" stroke-width="2"/><circle cx="100" cy="115" r="12" fill="none" stroke="#f59e0b" stroke-width="2"><animate attributeName="r" values="12;14;12" dur="1s" repeatCount="indefinite"/></circle><text x="100" y="119" text-anchor="middle" fill="#f59e0b" font-size="9">M</text></svg>'},
    {name:"Half-Wave Rectifier",desc:"Single diode AC to DC",svg:'<svg viewBox="0 0 220 80" width="200"><text x="15" y="15" fill="#94a3b8" font-size="8">AC</text><path d="M0,40 Q15,20 30,40 Q45,60 60,40" fill="none" stroke="#3b82f6" stroke-width="2"><animate attributeName="stroke-dashoffset" from="40" to="0" dur="1s" repeatCount="indefinite"/></path><polygon points="80,25 110,40 80,55" fill="none" stroke="#10b981" stroke-width="2"/><line x1="110" y1="25" x2="110" y2="55" stroke="#10b981" stroke-width="2"/><line x1="60" y1="40" x2="80" y2="40" stroke="#f59e0b" stroke-width="2"/><line x1="110" y1="40" x2="140" y2="40" stroke="#f59e0b" stroke-width="2"/><rect x="140" y="30" width="30" height="20" fill="none" stroke="#ef4444" stroke-width="2" rx="2"/><text x="155" y="44" text-anchor="middle" fill="#ef4444" font-size="8">RL</text><line x1="170" y1="40" x2="200" y2="40" stroke="#f59e0b" stroke-width="2"/><text x="190" y="15" fill="#94a3b8" font-size="8">DC</text></svg>'},
    {name:"Full-Wave Rectifier",desc:"Bridge rectifier 4 diodes",svg:'<svg viewBox="0 0 200 120" width="200"><rect x="50" y="20" width="80" height="80" fill="none" stroke="#3b82f6" stroke-width="1.5" rx="4" transform="rotate(45 90 60)"/><polygon points="75,30 90,45 75,45" fill="#10b981"/><polygon points="105,45 120,60 105,60" fill="#10b981"/><polygon points="75,60 90,75 75,75" fill="#10b981"/><polygon points="60,45 75,60 60,60" fill="#10b981"/><line x1="0" y1="60" x2="35" y2="60" stroke="#f59e0b" stroke-width="2"/><line x1="145" y1="60" x2="200" y2="60" stroke="#f59e0b" stroke-width="2"/><text x="10" y="50" fill="#94a3b8" font-size="8">AC</text><text x="175" y="50" fill="#94a3b8" font-size="8">DC</text><circle cx="20" cy="60" r="3" fill="#f59e0b"><animate attributeName="opacity" values="1;0.3;1" dur="1s" repeatCount="indefinite"/></circle></svg>'},
    {name:"Transformer",desc:"Step-up/Step-down transformer",svg:'<svg viewBox="0 0 200 100" width="200"><path d="M30,20 C40,20 40,35 30,35 C40,35 40,50 30,50 C40,50 40,65 30,65 C40,65 40,80 30,80" fill="none" stroke="#3b82f6" stroke-width="2"/><path d="M80,20 C70,20 70,35 80,35 C70,35 70,50 80,50 C70,50 70,65 80,65 C70,65 70,80 80,80" fill="none" stroke="#ef4444" stroke-width="2"/><line x1="50" y1="15" x2="50" y2="85" stroke="#f59e0b" stroke-width="2"/><line x1="58" y1="15" x2="58" y2="85" stroke="#f59e0b" stroke-width="2"/><line x1="0" y1="20" x2="30" y2="20" stroke="#3b82f6" stroke-width="2"/><line x1="0" y1="80" x2="30" y2="80" stroke="#3b82f6" stroke-width="2"/><line x1="80" y1="20" x2="110" y2="20" stroke="#ef4444" stroke-width="2"/><line x1="80" y1="80" x2="110" y2="80" stroke="#ef4444" stroke-width="2"/><text x="15" y="55" fill="#3b82f6" font-size="8">N1</text><text x="88" y="55" fill="#ef4444" font-size="8">N2</text></svg>'},
    {name:"RC Circuit",desc:"Resistor-Capacitor circuit",svg:'<svg viewBox="0 0 200 90" width="200"><line x1="0" y1="45" x2="30" y2="45" stroke="#f59e0b" stroke-width="2"/><rect x="30" y="30" width="40" height="30" fill="none" stroke="#3b82f6" stroke-width="2" rx="3"/><text x="50" y="49" text-anchor="middle" fill="#3b82f6" font-size="10">R</text><line x1="70" y1="45" x2="100" y2="45" stroke="#f59e0b" stroke-width="2"/><line x1="100" y1="25" x2="100" y2="65" stroke="#10b981" stroke-width="3"/><line x1="110" y1="25" x2="110" y2="65" stroke="#10b981" stroke-width="3"/><line x1="110" y1="45" x2="150" y2="45" stroke="#f59e0b" stroke-width="2"/><text x="105" y="80" text-anchor="middle" fill="#10b981" font-size="9">C</text><circle cx="15" cy="45" r="3" fill="#f59e0b"><animate attributeName="cx" values="5;140" dur="3s" repeatCount="indefinite"/></circle></svg>'},
    {name:"Three Phase System",desc:"3-phase power generation",svg:'<svg viewBox="0 0 200 100" width="200"><line x1="30" y1="20" x2="170" y2="20" stroke="#ef4444" stroke-width="2"/><line x1="30" y1="50" x2="170" y2="50" stroke="#f59e0b" stroke-width="2"/><line x1="30" y1="80" x2="170" y2="80" stroke="#3b82f6" stroke-width="2"/><text x="10" y="24" fill="#ef4444" font-size="9">R</text><text x="10" y="54" fill="#f59e0b" font-size="9">Y</text><text x="10" y="84" fill="#3b82f6" font-size="9">B</text><circle cx="50" cy="20" r="4" fill="#ef4444"><animate attributeName="cx" values="50;160" dur="2s" repeatCount="indefinite"/></circle><circle cx="80" cy="50" r="4" fill="#f59e0b"><animate attributeName="cx" values="80;160" dur="2s" repeatCount="indefinite"/></circle><circle cx="110" cy="80" r="4" fill="#3b82f6"><animate attributeName="cx" values="110;160" dur="2s" repeatCount="indefinite"/></circle><text x="180" y="54" fill="#94a3b8" font-size="8">Load</text></svg>'},
    {name:"PLC Ladder Logic",desc:"Basic PLC ladder diagram",svg:'<svg viewBox="0 0 200 100" width="200"><line x1="20" y1="10" x2="20" y2="90" stroke="#3b82f6" stroke-width="3"/><line x1="180" y1="10" x2="180" y2="90" stroke="#3b82f6" stroke-width="3"/><line x1="20" y1="25" x2="60" y2="25" stroke="#f59e0b" stroke-width="2"/><line x1="60" y1="18" x2="60" y2="32" stroke="#10b981" stroke-width="2"/><line x1="70" y1="18" x2="70" y2="32" stroke="#10b981" stroke-width="2"/><text x="65" y="14" text-anchor="middle" fill="#10b981" font-size="7">I1</text><line x1="70" y1="25" x2="140" y2="25" stroke="#f59e0b" stroke-width="2"/><circle cx="155" cy="25" r="10" fill="none" stroke="#ef4444" stroke-width="2"/><text x="155" y="29" text-anchor="middle" fill="#ef4444" font-size="8">Y1</text><line x1="165" y1="25" x2="180" y2="25" stroke="#f59e0b" stroke-width="2"/><line x1="20" y1="65" x2="60" y2="65" stroke="#f59e0b" stroke-width="2"/><line x1="60" y1="58" x2="60" y2="72" stroke="#10b981" stroke-width="2"/><line x1="70" y1="58" x2="70" y2="72" stroke="#10b981" stroke-width="2"/><text x="65" y="54" text-anchor="middle" fill="#10b981" font-size="7">I2</text><line x1="70" y1="65" x2="100" y2="65" stroke="#f59e0b" stroke-width="2"/><line x1="100" y1="58" x2="100" y2="72" stroke="#10b981" stroke-width="2"/><line x1="110" y1="58" x2="110" y2="72" stroke="#10b981" stroke-width="2"/><text x="105" y="54" text-anchor="middle" fill="#10b981" font-size="7">I3</text><line x1="110" y1="65" x2="140" y2="65" stroke="#f59e0b" stroke-width="2"/><circle cx="155" cy="65" r="10" fill="none" stroke="#ef4444" stroke-width="2"/><text x="155" y="69" text-anchor="middle" fill="#ef4444" font-size="8">Y2</text><line x1="165" y1="65" x2="180" y2="65" stroke="#f59e0b" stroke-width="2"/></svg>'}
  ];
  for(var ci=0;ci<circuits.length;ci++){
    var c=circuits[ci];
    h+='<div class="card circuit-card animate-in" style="animation-delay:'+ci*0.08+'s">';
    h+='<div style="text-align:center;padding:20px;background:rgba(245,158,11,0.05);border-radius:12px 12px 0 0">'+c.svg+'</div>';
    h+='<div style="padding:12px"><div class="circuit-title">'+c.name+'</div><div class="circuit-desc">'+c.desc+'</div></div></div>';
  }
  h+=`</div></div>`;
  // Links
  h+=`<div id="resLinks" style="display:none"><div class="card"><div class="card-title">🔗 Learning Links</div>`;
  const links=JSON.parse(localStorage.getItem('learningLinks')||'[{"title":"Electrical Engineering Basics","url":"https://youtube.com"},{"title":"PLC Programming Tutorial","url":"https://youtube.com"},{"title":"AC Machines Explained","url":"https://youtube.com"}]');
  links.forEach(l=>{h+=`<div class="notif-item"><a href="${l.url}" target="_blank" style="color:var(--accent);text-decoration:none;font-weight:600">▶️ ${l.title}</a></div>`;});
  h+=`</div></div>`;
  return h;
}
window.showResTab=function(t){['notes','quiz','circuits','links'].forEach(x=>{document.getElementById('res'+x.charAt(0).toUpperCase()+x.slice(1)).style.display=x===t?'block':'none';});document.querySelectorAll('#pagesContainer .tab-btn').forEach((b,i)=>b.classList.toggle('active',['notes','quiz','circuits','links'][i]===t));};

// Simple quiz system
const QUIZ_BANK=[
  {q:"What is Ohm's Law?",a:["V=IR","P=VI","V=I/R","V=R/I"],c:0},
  {q:"Unit of capacitance?",a:["Farad","Henry","Ohm","Watt"],c:0},
  {q:"SI unit of resistance?",a:["Ohm","Volt","Ampere","Watt"],c:0},
  {q:"Transformer works on?",a:["Mutual induction","Self induction","Eddy current","Hysteresis"],c:0},
  {q:"Power factor range?",a:["0 to 1","0 to 10","1 to 10","-1 to 1"],c:0},
  {q:"Star connection line voltage?",a:["√3 × Phase voltage","Phase voltage","2 × Phase voltage","Phase voltage/√3"],c:0},
  {q:"KCL is based on?",a:["Conservation of charge","Conservation of energy","Ohm's law","Faraday's law"],c:0},
  {q:"Full form of PLC?",a:["Programmable Logic Controller","Power Line Carrier","Phase Locked Circuit","Primary Logic Control"],c:0},
  {q:"1 HP = ?",a:["746 Watts","1000 Watts","500 Watts","100 Watts"],c:0},
  {q:"DOL stands for?",a:["Direct On Line","Digital Output Load","Double Open Loop","Direct Output Line"],c:0},
  {q:"Frequency of Bangladesh power grid?",a:["50 Hz","60 Hz","100 Hz","25 Hz"],c:0},
  {q:"Which motor has high starting torque?",a:["Series motor","Shunt motor","Compound motor","Induction motor"],c:0},
  {q:"Diode allows current in?",a:["One direction","Both directions","No direction","Random"],c:0},
  {q:"MCB stands for?",a:["Miniature Circuit Breaker","Main Circuit Board","Motor Control Box","Magnetic Core Breaker"],c:0},
  {q:"Earth wire color?",a:["Green","Red","Blue","Black"],c:0}
];
window.startQuiz=function(){
  const area=document.getElementById('quizArea');
  let qs=QUIZ_BANK.sort(()=>Math.random()-0.5).slice(0,5);
  let score=0,idx=0;
  function showQ(){
    if(idx>=qs.length){area.innerHTML=`<div style="text-align:center;padding:20px"><div class="stat-value">${score}/${qs.length}</div><p style="margin:8px">Quiz Complete!</p><button class="btn btn-primary" onclick="startQuiz()">Try Again</button></div>`;return;}
    const q=qs[idx];
    area.innerHTML=`<div style="margin:16px 0"><p style="font-weight:700;margin-bottom:12px">Q${idx+1}: ${q.q}</p>${q.a.map((a,i)=>`<div class="quiz-option" onclick="checkAns(${i},${q.c},this)">${a}</div>`).join('')}</div>`;
  }
  window.checkAns=function(sel,cor,el){
    document.querySelectorAll('.quiz-option').forEach((o,i)=>{o.style.pointerEvents='none';o.classList.add(i===cor?'correct':'');if(i===sel&&i!==cor)o.classList.add('wrong');});
    if(sel===cor)score++;
    setTimeout(()=>{idx++;showQ();},1000);
  };
  showQ();
};

function render_assignments(){
  let h=`<div class="section-header"><div class="section-title">📋 ${lang==='bn'?'জব রিপোর্ট ও অ্যাসাইনমেন্ট':'Job Report & Assignment'}</div></div>`;
  const submissions=JSON.parse(localStorage.getItem('submissions')||'{}');
  const assignments=JSON.parse(localStorage.getItem('assignments')||'[{"sub":"AC Machines-II","due":"2026-05-01","title":"Lab Report 3"},{"sub":"Switch Gear","due":"2026-05-05","title":"Assignment 2"},{"sub":"T&D Power-II","due":"2026-04-30","title":"Job Report 4"}]');
  h+=`<div class="card" style="margin-bottom:16px"><div class="card-title">📌 ${lang==='bn'?'আসন্ন অ্যাসাইনমেন্ট':'Upcoming Assignments'}</div>`;
  assignments.forEach(a=>{h+=`<div class="notif-item" style="border-left:3px solid var(--accent)"><b>${a.sub}</b> - ${a.title}<br><small style="color:var(--danger)">📅 Due: ${a.due}</small></div>`;});
  h+=`</div>`;
  h+=`<div class="card"><div class="card-title">${lang==='bn'?'সাবমিশন স্ট্যাটাস':'Submission Status'}</div><div class="table-container"><table><thead><tr><th>Roll</th><th>Name</th>`;
  SUBJECTS.filter(s=>!s.code.startsWith('COM')).slice(0,5).forEach(s=>{h+=`<th>${s.code}</th>`;});
  h+=`</tr></thead><tbody>`;
  STUDENTS.forEach(st=>{
    h+=`<tr><td>${st.roll}</td><td style="font-size:0.8rem">${st.name}</td>`;
    SUBJECTS.filter(s=>!s.code.startsWith('COM')).slice(0,5).forEach(s=>{
      const key=st.roll+'_'+s.code;
      const done=submissions[key]||Math.random()>0.3;
      h+=`<td><span class="${done?'mark-tick':'mark-cross'}">${done?'✔':'✘'}</span></td>`;
    });
    h+=`</tr>`;
  });
  h+=`</tbody></table></div></div>`;
  return h;
}

function render_teachers(){
  let h='<div class="section-header"><div class="section-title">'+(lang==='bn'?'👨‍🏫 টিচার কর্নার':'👨‍🏫 Teacher Corner')+'</div></div><div class="grid-auto">';
  TEACHERS.forEach(function(t,i){
    var subList=t.subjects?t.subjects.join(', '):(t.subject||'');
    h+='<div class="card animate-in" style="animation-delay:'+i*0.1+'s;text-align:center">';
    h+='<div class="profile-avatar" style="width:80px;height:80px;margin:0 auto 12px;font-size:2rem">👨‍🏫</div>';
    h+='<h3 style="font-size:1rem">'+(lang==='bn'?t.nameBn:t.name)+'</h3>';
    h+='<p style="color:var(--text2);font-size:0.8rem;margin:4px 0">'+subList+'</p>';
    h+='<div style="display:flex;gap:8px;justify-content:center;margin-top:12px">';
    h+='<a href="tel:'+t.phone+'" class="btn btn-sm btn-primary" style="text-decoration:none">📞 Call</a>';
    h+='<a href="https://wa.me/88'+t.whatsapp+'" target="_blank" class="btn btn-sm btn-secondary" style="text-decoration:none;color:var(--text)">💬 WhatsApp</a>';
    h+='</div></div>';
  });
  h+=`</div>`;
  if(session.type==='teacher'){
    const phones=JSON.parse(localStorage.getItem('studentPhones')||'{}');
    h+=`<div class="card" style="margin-top:16px"><div class="card-title">📱 ${lang==='bn'?'শিক্ষার্থীদের ফোন নম্বর':'Student Phone Numbers'}</div><div class="table-container"><table><thead><tr><th>Roll</th><th>Name</th><th>Phone</th><th>Action</th></tr></thead><tbody>`;
    STUDENTS.forEach(st=>{
      const ph=phones[st.roll]||st.phone;
      h+=`<tr><td>${st.roll}</td><td>${st.name}</td><td>${ph}</td><td><a href="tel:${ph}" class="btn btn-sm btn-primary" style="text-decoration:none;padding:4px 10px">📞</a></td></tr>`;
    });
    h+=`</tbody></table></div></div>`;
  }
  return h;
}

function render_chat(){
  let h=`<div class="card chat-container"><div class="card-title">💬 ${lang==='bn'?'চ্যাট রুম':'Chat Room'}</div>
  <div class="chat-messages" id="chatMsgs"></div>
  <div class="chat-input-area"><input class="chat-input" id="chatInput" placeholder="${lang==='bn'?'মেসেজ লিখুন...':'Type message...'}" onkeypress="if(event.key==='Enter')sendChat()"><button class="btn btn-primary" onclick="sendChat()">📤</button></div></div>`;
  return h;
}
function after_chat(){
  const msgs=JSON.parse(localStorage.getItem('chatMessages')||'[]');
  const el=document.getElementById('chatMsgs');
  msgs.forEach(m=>{el.innerHTML+=`<div class="chat-bubble ${m.sender===session.name?'sent':'received'}"><b style="font-size:0.7rem">${m.sender}</b><p>${m.text}</p><small style="font-size:0.6rem;opacity:0.7">${m.time}</small></div>`;});
  el.scrollTop=el.scrollHeight;
}
window.sendChat=function(){
  const inp=document.getElementById('chatInput');
  if(!inp.value.trim())return;
  const msgs=JSON.parse(localStorage.getItem('chatMessages')||'[]');
  msgs.push({sender:session.name||session.nameBn,text:inp.value,time:new Date().toLocaleString()});
  localStorage.setItem('chatMessages',JSON.stringify(msgs));
  inp.value='';
  after_chat();
};

function render_ai(){
  return `<div class="card"><div class="card-title">🤖 ${lang==='bn'?'এআই স্যার - যেকোনো প্রশ্ন করুন':'AI Sir - Ask Any Question'}</div>
  <div id="aiChat" style="min-height:350px;max-height:500px;overflow-y:auto;padding:12px;margin-bottom:12px">
  <div class="chat-bubble received"><b style="font-size:0.7rem">🤖 AI Sir</b><p>${lang==='bn'?'আসসালামু আলাইকুম! আমি আপনার AI শিক্ষক। ইলেকট্রিক্যাল, ফিজিক্স, ম্যাথ, কেমিস্ট্রি, কম্পিউটার — যেকোনো প্রশ্ন করুন!':'Assalamu Alaikum! I am your AI teacher. Ask me anything about Electrical, Physics, Math, Chemistry, Computer!'}</p></div></div>
  <div class="chat-input-area"><input class="chat-input" id="aiInput" placeholder="${lang==='bn'?'যেকোনো প্রশ্ন লিখুন...':'Ask any question...'}" onkeypress="if(event.key==='Enter')askAI()"><button class="btn btn-primary" onclick="askAI()">🤖</button></div></div>`;
}
window.askAI=function(){
  const inp=document.getElementById('aiInput');
  const q=inp.value.trim();if(!q)return;
  const chat=document.getElementById('aiChat');
  chat.innerHTML+=`<div class="chat-bubble sent"><p>${q}</p></div>`;
  inp.value='';
  const ql=q.toLowerCase();
  const kb=[
    {k:["ohm","v=ir","voltage","current","resistance"],a:"⚡ Ohm's Law: V = IR\n\nV = Voltage (Volts)\nI = Current (Amperes)\nR = Resistance (Ohms)\n\nExample: If R=10Ω and I=2A, then V = 10×2 = 20V"},
    {k:["kirchhoff","kcl","kvl"],a:"⚡ Kirchhoff's Laws:\n\n1. KCL (Current Law): ΣI(in) = ΣI(out) at any junction\n2. KVL (Voltage Law): ΣV = 0 around any closed loop\n\nBased on conservation of charge and energy."},
    {k:["transformer"],a:"🔌 Transformer:\n\nWorks on mutual electromagnetic induction.\nV1/V2 = N1/N2 = I2/I1\n\nTypes: Step-up, Step-down, Auto, Isolation\nEfficiency = (Output/Input) × 100%\nLosses: Core loss (hysteresis + eddy current) + Copper loss (I²R)"},
    {k:["plc","programmable"],a:"🖥️ PLC (Programmable Logic Controller):\n\nDigital computer for industrial automation.\nComponents: CPU, I/O modules, Power Supply, Programming Device\nLanguages: Ladder Diagram, FBD, SFC, IL, ST\nAdvantages: Reliable, flexible, easy to program"},
    {k:["motor","induction"],a:"⚙️ Electric Motors:\n\nAC Motors: Induction (squirrel cage/wound rotor), Synchronous\nDC Motors: Series, Shunt, Compound\n\nInduction Motor: Ns = 120f/P\nSlip = (Ns-Nr)/Ns × 100%\nStarting methods: DOL, Star-Delta, Auto-transformer"},
    {k:["power","watt","kw"],a:"💡 Power:\n\nP = VI = I²R = V²/R\nAC Power: P = VIcosφ (Active), Q = VIsinφ (Reactive), S = VI (Apparent)\nPower Triangle: S² = P² + Q²\n1 HP = 746W, 1 kW = 1000W"},
    {k:["capacitor","farad"],a:"🔋 Capacitor:\n\nStores energy in electric field.\nC = Q/V (Farads)\nEnergy = ½CV²\nSeries: 1/Ct = 1/C1 + 1/C2\nParallel: Ct = C1 + C2\nXc = 1/(2πfC)"},
    {k:["inductor","henry","inductance"],a:"🧲 Inductor:\n\nStores energy in magnetic field.\nV = L(di/dt)\nEnergy = ½LI²\nSeries: Lt = L1 + L2\nParallel: 1/Lt = 1/L1 + 1/L2\nXL = 2πfL"},
    {k:["diode","rectifier"],a:"🔌 Diode & Rectifier:\n\nDiode: Allows current in one direction\nForward bias: 0.7V (Si), 0.3V (Ge)\n\nHalf-wave: Vdc = Vm/π\nFull-wave: Vdc = 2Vm/π\nBridge: 4 diodes, most efficient"},
    {k:["three phase","3 phase","star","delta"],a:"⚡ Three Phase System:\n\nStar (Y): VL = √3 × Vph, IL = Iph\nDelta (Δ): VL = Vph, IL = √3 × Iph\nPower = √3 × VL × IL × cosφ\n\nAdvantages: Constant power, less conductor material"},
    {k:["circuit breaker","mcb","mccb","switchgear"],a:"🔧 Circuit Breakers:\n\nMCB: Up to 100A, thermal/magnetic trip\nMCCB: 100-1000A, adjustable\nACB: Air Circuit Breaker, high capacity\nVCB: Vacuum Circuit Breaker\nSF6: Uses SF6 gas for arc quenching"},
    {k:["protection","relay","overcurrent"],a:"🛡️ Protection:\n\nRelay types: Overcurrent, Earth fault, Differential, Distance\nProtection zones: Generator, Transformer, Bus, Line\nFuse: Simplest protection device\nCT ratio: Ip/Is, PT ratio: Vp/Vs"},
    {k:["transmission","distribution","line"],a:"🏗️ T&D System:\n\nGeneration → Transmission (132-765kV) → Distribution (11-33kV) → Consumer (220/440V)\nLosses: I²R loss, corona loss\nSag = WL²/(8T)\nABCD parameters for long lines"},
    {k:["earthing","grounding","earth"],a:"⚡ Earthing:\n\nTypes: Plate earthing, Pipe earthing, Rod earthing\nEarth resistance < 5Ω (power system), < 1Ω (substation)\nPurpose: Safety, fault current path, lightning protection"},
    {k:["battery","cell"],a:"🔋 Battery:\n\nPrimary: Non-rechargeable (Zinc-Carbon, Alkaline)\nSecondary: Rechargeable (Lead-acid, Li-ion, NiMH)\nLead-acid: 2V/cell, fully charged 2.1V\nCapacity in Ah (Ampere-hours)"},
    {k:["newton","force","acceleration"],a:"📐 Newton's Laws:\n\n1st: Object stays at rest/motion unless external force\n2nd: F = ma (Force = mass × acceleration)\n3rd: Every action has equal opposite reaction\nWeight = mg (g = 9.8 m/s²)"},
    {k:["frequency","hertz","hz","bangladesh"],a:"⚡ Bangladesh Power Grid:\n\nFrequency: 50 Hz\nVoltage: 220V (single phase), 440V (three phase)\nBPDB manages generation and distribution\nGrid capacity: ~25,000 MW"},
    {k:["solar","renewable","energy"],a:"☀️ Solar Energy:\n\nPhotovoltaic effect converts sunlight to electricity\nSolar cell: 0.5-0.6V each\nEfficiency: 15-22% (commercial)\nComponents: Panel, Charge controller, Battery, Inverter"},
    {k:["led","light"],a:"💡 LED:\n\nLight Emitting Diode\nForward voltage: 1.8-3.3V depending on color\nVery efficient: 80-150 lumens/watt\nLong life: 25,000-50,000 hours\nTypes: SMD, COB, High-power"},
    {k:["formula","equation"],a:"📝 Key Formulas:\n\nV=IR, P=VI, P=I²R\nXL=2πfL, Xc=1/(2πfC)\nZ=√(R²+(XL-Xc)²)\nNs=120f/P\nη=(Output/Input)×100%\nPF=cosφ=P/S"},
    {k:["python","programming","code","computer"],a:"💻 Programming:\n\nPython: print('Hello'), variables, loops, functions\nC: #include<stdio.h>, main(), printf()\nHTML: Webpage structure\nArduino: digitalWrite(), analogRead()\nPLC: Ladder diagram programming"},
    {k:["math","calculus","integral","derivative"],a:"📐 Math Basics:\n\nDerivative: d/dx(xⁿ) = nxⁿ⁻¹\nIntegral: ∫xⁿdx = xⁿ⁺¹/(n+1) + C\nTrigonometry: sin²θ+cos²θ=1\nQuadratic: x=(-b±√(b²-4ac))/2a"},
    {k:["islam","quran","namaz","prayer","dua"],a:"🕌 Islamic Knowledge:\n\nFive pillars: Shahada, Salah, Zakat, Sawm, Hajj\n5 daily prayers: Fajr, Zuhr, Asr, Maghrib, Isha\nQuran: 114 Surahs, 30 Paras\nKalimah: La ilaha illallahu Muhammadur Rasulullah"},
    {k:["job","career","engineer"],a:"💼 Career Guidance:\n\nDiploma Engineer opportunities:\n1. BPDB, DESCO, DPDC\n2. Private companies\n3. Freelancing (AutoCAD, PLC)\n4. Higher studies (BSc Engineering)\n5. Government jobs (PSC)\n6. Self-employment (Electrical contractor)"},
    {k:["hello","hi","hey","assalamu","salam"],a:"আসসালামু আলাইকুম! 😊 আমি আপনার AI শিক্ষক। ইলেকট্রিক্যাল, ফিজিক্স, ম্যাথ, কম্পিউটার — যেকোনো বিষয়ে প্রশ্ন করুন!"},
    {k:["thank","ধন্যবাদ","thanks"],a:"আপনাকেও ধন্যবাদ! 😊 আরো কোনো প্রশ্ন থাকলে জিজ্ঞেস করুন।"},
    {k:["কে তুমি","who are","your name","তোমার নাম"],a:"আমি AI Sir 🤖 — Electrical Technology বিভাগের AI শিক্ষক। মোঃ আরিফুল ইসলাম আমাকে তৈরি করেছেন। আমি যেকোনো পড়াশোনা সম্পর্কিত প্রশ্নের উত্তর দিতে পারি!"}
  ];
  let ans=null;
  for(const item of kb){if(item.k.some(k=>ql.includes(k))){ans=item.a;break;}}
  if(ans){
    setTimeout(()=>{chat.innerHTML+='<div class="chat-bubble received"><b style="font-size:0.7rem">🤖 AI Sir</b><pre style="white-space:pre-wrap;font-family:inherit;margin:4px 0">'+ans+'</pre></div>';chat.scrollTop=chat.scrollHeight;},400);
  } else {
    // Gemini API fallback
    chat.innerHTML+='<div class="chat-bubble received" id="aiTyping"><b style="font-size:0.7rem">🤖 AI Sir</b><p>⏳ চিন্তা করছি...</p></div>';
    chat.scrollTop=chat.scrollHeight;
    fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyA5m8ob5DFjGEblfKMOzVGM1F4pPF2Sifs",{
      method:"POST",headers:{"Content-Type":"application/json"},
      body:JSON.stringify({contents:[{parts:[{text:"You are an AI teacher for Electrical Technology diploma students in Bangladesh. Answer in Bangla with technical English terms. Be helpful and concise. Question: "+q}]}]})
    }).then(r=>r.json()).then(data=>{
      var typing=document.getElementById("aiTyping");
      if(typing)typing.remove();
      var reply="দুঃখিত, এই মুহূর্তে উত্তর দিতে পারছি না। পরে আবার চেষ্টা করুন।";
      try{reply=data.candidates[0].content.parts[0].text;}catch(e){}
      chat.innerHTML+='<div class="chat-bubble received"><b style="font-size:0.7rem">🤖 AI Sir (Gemini)</b><pre style="white-space:pre-wrap;font-family:inherit;margin:4px 0">'+reply+'</pre></div>';
      chat.scrollTop=chat.scrollHeight;
    }).catch(function(){
      var typing=document.getElementById("aiTyping");
      if(typing)typing.remove();
      chat.innerHTML+='<div class="chat-bubble received"><b style="font-size:0.7rem">🤖 AI Sir</b><p>ইন্টারনেট সংযোগ নেই। অনুগ্রহ করে পরে চেষ্টা করুন।</p></div>';
      chat.scrollTop=chat.scrollHeight;
    });
  }
};

function render_cgpa(){
  let h=`<div class="section-header"><div class="section-title">🎓 ${lang==='bn'?'সিজিপিএ ক্যালকুলেটর (৮ সেমিস্টার)':'CGPA Calculator (8 Semesters)'}</div>
  <div class="section-desc">${lang==='bn'?'প্রতিটি সেমিস্টারের GPA বসিয়ে Calculate করুন':'Enter GPA for each semester and Calculate'}</div></div>`;
  h+=`<div class="card"><div class="card-title">📊 ${lang==='bn'?'সেমিস্টার GPA ইনপুট':'Semester GPA Input'}</div>
  <div class="grid-4" style="margin-bottom:16px">`;
  for(let i=1;i<=8;i++){
    h+=`<div class="form-group"><label class="form-label" style="text-align:center;display:block">
    ${lang==='bn'?'সেমিস্টার '+i:'Semester '+i}</label>
    <input type="number" class="form-input" id="gpa${i}" step="0.01" min="0" max="4" placeholder="GPA"
    style="text-align:center;font-size:1.1rem;font-weight:700"></div>`;
  }
  h+=`</div><div style="text-align:center"><button class="btn btn-primary" onclick="calcCGPA()" style="padding:14px 40px;font-size:1rem">
  🎓 ${lang==='bn'?'CGPA হিসাব করুন':'Calculate CGPA'}</button></div>
  <div id="cgpaResult" style="margin-top:20px"></div></div>`;
  if(session.type==='teacher'){
    const gpas=generateSemesterGPAs();
    h+=`<div class="card" style="margin-top:16px"><div class="card-title">${lang==='bn'?'সকল শিক্ষার্থীর CGPA':'All Students CGPA'}</div>
    <div class="table-container"><table><thead><tr><th>Roll</th><th>Name</th><th>CGPA</th></tr></thead><tbody>`;
    STUDENTS.forEach(st=>{
      const sg=gpas[st.roll]||[];
      const cgpa=sg.length?(sg.reduce((a,b)=>a+b,0)/sg.length).toFixed(2):'-';
      h+=`<tr><td>${st.roll}</td><td>${st.name}</td><td style="font-weight:700;color:var(--accent)">${cgpa}</td></tr>`;
    });
    h+=`</tbody></table></div></div>`;
  }
  return h;
}
window.calcCGPA=function(){
  let total=0,count=0;
  for(let i=1;i<=8;i++){
    const v=parseFloat(document.getElementById('gpa'+i).value);
    if(v&&v>0){total+=v;count++;}
  }
  if(count===0){document.getElementById('cgpaResult').innerHTML=`<div class="card" style="text-align:center;border:2px solid var(--danger)"><p style="color:var(--danger)">⚠️ ${lang==='bn'?'অন্তত একটি সেমিস্টারের GPA দিন!':'Enter at least one semester GPA!'}</p></div>`;return;}
  const cgpa=(total/count).toFixed(2);
  let grade='',color='';
  if(cgpa>=3.75){grade='A+';color='#10b981';}else if(cgpa>=3.5){grade='A';color='#10b981';}
  else if(cgpa>=3.25){grade='A-';color='#3b82f6';}else if(cgpa>=3.0){grade='B+';color='#3b82f6';}
  else if(cgpa>=2.75){grade='B';color='#f59e0b';}else if(cgpa>=2.5){grade='B-';color='#f59e0b';}
  else{grade='C/D';color='#ef4444';}
  document.getElementById('cgpaResult').innerHTML=`
  <div class="card" style="text-align:center;border:2px solid ${color}">
    <div style="font-size:0.9rem;color:var(--text2);margin-bottom:8px">${lang==='bn'?count+' টি সেমিস্টারের উপর ভিত্তি করে':count+' Semesters calculated'}</div>
    <div class="stat-value" style="font-size:3rem">${cgpa}</div>
    <div style="margin-top:8px"><span class="badge" style="background:${color}20;color:${color};font-size:1rem;padding:8px 24px">Grade: ${grade}</span></div>
    <div style="margin-top:12px;font-size:0.85rem;color:var(--text2)">${lang==='bn'?'মোট GPA: '+total.toFixed(2)+' ÷ '+count+' সেমিস্টার = '+cgpa:'Total GPA: '+total.toFixed(2)+' ÷ '+count+' Semesters = '+cgpa}</div>
  </div>`;
};

function render_manage(){
  if(session.type!=='teacher')return '<div class="card"><p>Teacher access only.</p></div>';
  return `<div class="section-header"><div class="section-title">⚙️ ${lang==='bn'?'কন্টেন্ট ম্যানেজমেন্ট':'Content Management'}</div></div>
  <div class="grid-2">
    <div class="card"><div class="card-title">📢 ${lang==='bn'?'নোটিশ প্রকাশ':'Post Notice'}</div>
    <div class="form-group"><label class="form-label">Title</label><input class="form-input" id="noticeTitle"></div>
    <div class="form-group"><label class="form-label">Content</label><textarea class="form-input" id="noticeContent"></textarea></div>
    <button class="btn btn-primary" onclick="postNotice()">📤 Publish</button></div>

    <div class="card"><div class="card-title">📄 ${lang==='bn'?'PDF/নোট আপলোড':'Upload PDF/Note'}</div>
    <div class="form-group"><label class="form-label">Subject</label><select class="form-select" id="pdfSubject">${SUBJECTS.map(s=>`<option>${s.code}-${s.name}</option>`).join('')}</select></div>
    <div class="form-group"><label class="form-label">Title</label><input class="form-input" id="pdfTitle"></div>
    <div class="form-group"><label class="form-label">Content/Description</label><textarea class="form-input" id="pdfContent"></textarea></div>
    <button class="btn btn-primary" onclick="uploadPDF()">📤 Upload</button></div>

    <div class="card"><div class="card-title">📖 ${lang==='bn'?'সিলেবাস আপডেট':'Update Syllabus'}</div>
    <div class="form-group"><label class="form-label">Subject</label><input class="form-input" id="sylSub"></div>
    <div class="form-group"><label class="form-label">CT/Quiz Syllabus</label><input class="form-input" id="sylCT"></div>
    <div class="form-group"><label class="form-label">Mid Syllabus</label><input class="form-input" id="sylMid"></div>
    <div class="form-group"><label class="form-label">Final Syllabus</label><input class="form-input" id="sylFinal"></div>
    <button class="btn btn-primary" onclick="updateSyllabus()">📤 Update</button></div>

    <div class="card"><div class="card-title">📋 ${lang==='bn'?'সাবমিশন আপডেট':'Update Submissions'}</div>
    <div class="form-group"><label class="form-label">Student Roll</label><input class="form-input" id="subRoll"></div>
    <div class="form-group"><label class="form-label">Subject Code</label><input class="form-input" id="subCode"></div>
    <div class="form-group"><label class="form-label">Status</label><select class="form-select" id="subStatus"><option value="1">✔ Submitted</option><option value="0">✘ Not Submitted</option></select></div>
    <button class="btn btn-primary" onclick="updateSubmission()">📤 Update</button></div>

    <div class="card"><div class="card-title">🔔 ${lang==='bn'?'নোটিফিকেশন পাঠান':'Send Notification'}</div>
    <div class="form-group"><label class="form-label">Message</label><textarea class="form-input" id="notifMsg"></textarea></div>
    <button class="btn btn-primary" onclick="sendNotif()">📤 Send</button></div>

    <div class="card"><div class="card-title">🔗 ${lang==='bn'?'লার্নিং লিংক যোগ':'Add Learning Link'}</div>
    <div class="form-group"><label class="form-label">Title</label><input class="form-input" id="linkTitle"></div>
    <div class="form-group"><label class="form-label">YouTube URL</label><input class="form-input" id="linkURL"></div>
    <button class="btn btn-primary" onclick="addLink()">📤 Add</button></div>
  </div>`;
}
window.postNotice=function(){
  const t=document.getElementById('noticeTitle').value,c=document.getElementById('noticeContent').value;if(!t)return;
  const notices=JSON.parse(localStorage.getItem('notices')||'[]');
  notices.unshift({title:t,content:c,date:new Date().toLocaleDateString()});
  localStorage.setItem('notices',JSON.stringify(notices));toast('✅ Notice published!');
};
window.uploadPDF=function(){
  const sub=document.getElementById('pdfSubject').value,t=document.getElementById('pdfTitle').value,c=document.getElementById('pdfContent').value;if(!t)return;
  const pdfs=JSON.parse(localStorage.getItem('subjectPDFs')||'[]');
  pdfs.unshift({subject:sub,title:t,content:c,teacher:session.name,date:new Date().toLocaleDateString()});
  localStorage.setItem('subjectPDFs',JSON.stringify(pdfs));
  const notes=JSON.parse(localStorage.getItem('subjectNotes')||'[]');
  notes.unshift({title:t,content:c,date:new Date().toLocaleDateString()});
  localStorage.setItem('subjectNotes',JSON.stringify(notes));toast('✅ Uploaded!');
};
window.updateSyllabus=function(){
  const s=document.getElementById('sylSub').value;if(!s)return;
  const syllabi=JSON.parse(localStorage.getItem('syllabi')||'[]');
  syllabi.unshift({sub:s,ct:document.getElementById('sylCT').value,mid:document.getElementById('sylMid').value,final:document.getElementById('sylFinal').value});
  localStorage.setItem('syllabi',JSON.stringify(syllabi));toast('✅ Syllabus updated!');
};
window.updateSubmission=function(){
  const r=document.getElementById('subRoll').value,c=document.getElementById('subCode').value,s=document.getElementById('subStatus').value;if(!r||!c)return;
  const subs=JSON.parse(localStorage.getItem('submissions')||'{}');
  subs[r+'_'+c]=s==='1';
  localStorage.setItem('submissions',JSON.stringify(subs));toast('✅ Updated!');
};
window.sendNotif=function(){
  const msg=document.getElementById('notifMsg').value;if(!msg)return;
  const notifs=JSON.parse(localStorage.getItem('notifications')||'[]');
  notifs.unshift({text:msg,date:new Date().toLocaleDateString(),type:'info'});
  localStorage.setItem('notifications',JSON.stringify(notifs));toast('✅ Notification sent!');buildNotifications();
};
window.addLink=function(){
  const t=document.getElementById('linkTitle').value,u=document.getElementById('linkURL').value;if(!t||!u)return;
  const links=JSON.parse(localStorage.getItem('learningLinks')||'[]');
  links.push({title:t,url:u});localStorage.setItem('learningLinks',JSON.stringify(links));toast('✅ Link added!');
};
