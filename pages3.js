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
  h+=`<div id="resCircuits" style="display:none"><div class="grid-auto">`;
  const circuits=['Series Circuit','Parallel Circuit','Star-Delta','DOL Starter','Forward-Reverse Motor','Transformer','Half-Wave Rectifier','Full-Wave Rectifier','RC Circuit','RL Circuit','RLC Series','Voltage Divider','Current Divider','Wheatstone Bridge','Three-Phase System','Capacitor Bank','Auto Transformer','CT & PT','Earth Fault Relay','Overload Protection','PLC Ladder Logic','Timer Circuit','Counter Circuit','Motor Speed Control','Power Factor Correction'];
  circuits.forEach((c,i)=>{h+=`<div class="card circuit-card animate-in" style="animation-delay:${i*0.05}s"><div style="text-align:center;padding:20px;background:rgba(245,158,11,0.05)"><svg width="80" height="60" viewBox="0 0 80 60"><line x1="0" y1="30" x2="25" y2="30" stroke="var(--accent)" stroke-width="2"><animate attributeName="stroke-opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite"/></line><rect x="25" y="15" width="30" height="30" fill="none" stroke="var(--accent2)" stroke-width="2" rx="4"/><text x="40" y="35" text-anchor="middle" fill="var(--text)" font-size="8">${i+1}</text><line x1="55" y1="30" x2="80" y2="30" stroke="var(--accent)" stroke-width="2"><animate attributeName="stroke-opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite"/></line></svg></div><div style="padding:12px"><div class="circuit-title">${c}</div><div class="circuit-desc">Electrical circuit diagram with animation</div></div></div>`;});
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
  let h=`<div class="section-header"><div class="section-title">👨‍🏫 ${lang==='bn'?'টিচার কর্নার':'Teacher Corner'}</div></div><div class="grid-auto">`;
  const unique=TEACHERS.filter((t,i,a)=>a.findIndex(x=>x.name===t.name)===i);
  unique.forEach((t,i)=>{
    h+=`<div class="card animate-in" style="animation-delay:${i*0.1}s;text-align:center">
    <div class="profile-avatar" style="width:80px;height:80px;margin:0 auto 12px;font-size:2rem">👨‍🏫</div>
    <h3 style="font-size:1rem">${lang==='bn'?t.nameBn:t.name}</h3>
    <p style="color:var(--text2);font-size:0.8rem;margin:4px 0">${t.subject}</p>
    <div style="display:flex;gap:8px;justify-content:center;margin-top:12px">
      <a href="tel:${t.phone}" class="btn btn-sm btn-primary" style="text-decoration:none">📞 Call</a>
      <a href="https://wa.me/88${t.whatsapp}" target="_blank" class="btn btn-sm btn-secondary" style="text-decoration:none;color:var(--text)">💬 WhatsApp</a>
    </div></div>`;
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
  return `<div class="card"><div class="card-title">🤖 ${lang==='bn'?'এআই স্যার - প্রশ্ন করুন':'AI Sir - Ask Questions'}</div>
  <div id="aiChat" style="min-height:300px;max-height:500px;overflow-y:auto;padding:12px;margin-bottom:12px"></div>
  <div class="chat-input-area"><input class="chat-input" id="aiInput" placeholder="${lang==='bn'?'আপনার প্রশ্ন লিখুন...':'Type your question...'}" onkeypress="if(event.key==='Enter')askAI()"><button class="btn btn-primary" onclick="askAI()">🤖 Ask</button></div>
  <p style="font-size:0.7rem;color:var(--text2);margin-top:8px">Note: AI responses are generated locally for demo purposes.</p></div>`;
}
window.askAI=function(){
  const inp=document.getElementById('aiInput');
  const q=inp.value.trim();if(!q)return;
  const chat=document.getElementById('aiChat');
  chat.innerHTML+=`<div class="chat-bubble sent"><p>${q}</p></div>`;
  inp.value='';
  const answers={"ohm":"Ohm's Law: V = IR, where V=Voltage, I=Current, R=Resistance","transformer":"Transformer works on the principle of mutual electromagnetic induction. It transfers electrical energy between circuits.","plc":"PLC (Programmable Logic Controller) is a digital computer used for automation of industrial processes.","motor":"Electric motors convert electrical energy to mechanical energy using electromagnetic principles.","power":"Power (P) = Voltage × Current = VI. Unit is Watt (W)."};
  let ans="I'm an AI assistant for Electrical Technology. ";
  const ql=q.toLowerCase();
  Object.keys(answers).forEach(k=>{if(ql.includes(k))ans=answers[k];});
  if(ans.startsWith("I'm"))ans+=`For your question "${q}", please refer to your textbooks or ask your teachers for detailed explanation.`;
  setTimeout(()=>{chat.innerHTML+=`<div class="chat-bubble received"><b style="font-size:0.7rem">🤖 AI Sir</b><p>${ans}</p></div>`;chat.scrollTop=chat.scrollHeight;},500);
};

function render_cgpa(){
  const gpas=generateSemesterGPAs();
  let h=`<div class="section-header"><div class="section-title">🎓 ${lang==='bn'?'সিজিপিএ ক্যালকুলেটর':'CGPA Calculator'}</div></div>`;
  if(session.type==='student'){
    const sg=gpas[session.roll]||[];
    h+=`<div class="card"><div class="card-title">${lang==='bn'?'সেমিস্টার অনুযায়ী GPA':'Semester-wise GPA'}</div><div class="grid-3">`;
    sg.forEach((g,i)=>{h+=`<div class="stat-card"><div class="stat-label">Semester ${i+1}</div><div class="stat-value">${g.toFixed(2)}</div></div>`;});
    h+=`</div><div style="margin-top:16px;padding:20px;background:rgba(245,158,11,0.1);border-radius:12px;text-align:center"><div class="stat-label">Cumulative CGPA (1-6)</div><div class="stat-value" style="font-size:2.5rem">${(sg.reduce((a,b)=>a+b,0)/sg.length).toFixed(2)}</div></div></div>`;
    h+=`<div class="card" style="margin-top:16px"><div class="card-title">${lang==='bn'?'ম্যানুয়াল CGPA ক্যালকুলেটর':'Manual CGPA Calculator'}</div>
    <div class="grid-2"><div class="form-group"><label class="form-label">Semester 1 GPA</label><input type="number" class="form-input" id="gpa1" step="0.01" min="2" max="4" value="${sg[0]?.toFixed(2)||''}"></div>
    <div class="form-group"><label class="form-label">Semester 2 GPA</label><input type="number" class="form-input" id="gpa2" step="0.01" min="2" max="4" value="${sg[1]?.toFixed(2)||''}"></div></div>
    <button class="btn btn-primary" onclick="calcCGPA()">Calculate CGPA</button><div id="cgpaResult" style="margin-top:12px"></div></div>`;
  } else {
    h+=`<div class="card"><div class="table-container"><table><thead><tr><th>Roll</th><th>Name</th><th>Sem1-6 GPA</th><th>CGPA</th></tr></thead><tbody>`;
    STUDENTS.forEach(st=>{
      const sg=gpas[st.roll]||[];
      const cgpa=sg.length?(sg.reduce((a,b)=>a+b,0)/sg.length).toFixed(2):'-';
      h+=`<tr><td>${st.roll}</td><td>${st.name}</td><td style="font-size:0.75rem">${sg.map(g=>g.toFixed(2)).join(', ')}</td><td style="font-weight:700;color:var(--accent)">${cgpa}</td></tr>`;
    });
    h+=`</tbody></table></div></div>`;
  }
  return h;
}
window.calcCGPA=function(){
  const g1=parseFloat(document.getElementById('gpa1').value)||0;
  const g2=parseFloat(document.getElementById('gpa2').value)||0;
  document.getElementById('cgpaResult').innerHTML=`<div class="stat-card"><div class="stat-label">Your CGPA</div><div class="stat-value">${((g1+g2)/2).toFixed(2)}</div></div>`;
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
