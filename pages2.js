// Pages Part 2: Exams, Syllabus, Attendance
function render_exams(){
  const results=generateResults();
  let h=`<div class="section-header"><div class="section-title">📝 ${lang==='bn'?'এক্সাম ও রেজাল্ট':'Exams & Results'}</div></div>`;
  h+=`<div class="tabs"><button class="tab-btn active" onclick="showExamTab('schedule')">📅 ${lang==='bn'?'পরীক্ষার সময়সূচী':'Exam Schedule'}</button>
  <button class="tab-btn" onclick="showExamTab('results')">📊 ${lang==='bn'?'রেজাল্ট':'Results'}</button></div>`;
  h+=`<div id="examSchedule"><div class="card"><div class="card-title">${lang==='bn'?'পরীক্ষার সময়সূচী':'Exam Schedule'}</div><div class="table-container"><table><thead><tr><th>Type</th><th>Subject</th><th>Date</th><th>Status</th></tr></thead><tbody>`;
  const exams=[
    {type:'Class Test 1',sub:'AC Machines-II',date:'2026-04-15',done:true},
    {type:'Quiz 1',sub:'Switch Gear',date:'2026-04-18',done:true},
    {type:'Class Test 2',sub:'T&D Power-II',date:'2026-04-28',done:false},
    {type:'Mid Exam',sub:'All Subjects',date:'2026-05-10',done:false},
    {type:'Final Exam',sub:'All Subjects',date:'2026-07-15',done:false}
  ];
  exams.forEach(e=>{h+=`<tr><td>${e.type}</td><td>${e.sub}</td><td>${e.date}</td><td><span class="badge ${e.done?'badge-success':'badge-warning'}">${e.done?'✅ Completed':'⏳ Upcoming'}</span></td></tr>`;});
  h+=`</tbody></table></div></div></div>`;
  h+=`<div id="examResults" style="display:none"><div class="card"><div class="card-title">${lang==='bn'?'রেজাল্ট':'Results'}</div>`;
  if(session.type==='student'){
    const r=results[session.roll];
    if(r){
      h+=`<div class="table-container"><table><thead><tr><th>Subject</th><th>CT1/10</th><th>CT2/10</th><th>Quiz1/10</th><th>Quiz2/10</th><th>Mid/40</th></tr></thead><tbody>`;
      SUBJECTS.filter(s=>!s.code.startsWith('COM')).forEach(s=>{
        const d=r[s.code];if(!d)return;
        h+=`<tr><td>${s.code}-${lang==='bn'?s.nameBn:s.name}</td><td>${d.ct1}</td><td>${d.ct2}</td><td>${d.quiz1}</td><td>${d.quiz2}</td><td>${d.mid}</td></tr>`;
      });
      h+=`</tbody></table></div>`;
    }
  } else {
    h+=`<p>${lang==='bn'?'সকল শিক্ষার্থীর রেজাল্ট দেখুন':'View all student results'}</p>`;
    h+=`<div class="table-container" style="max-height:400px;overflow-y:auto"><table><thead><tr><th>Roll</th><th>Name</th><th>CT Avg</th><th>Quiz Avg</th></tr></thead><tbody>`;
    STUDENTS.forEach(st=>{
      const r=results[st.roll];if(!r)return;
      let ctSum=0,qSum=0,cnt=0;
      SUBJECTS.forEach(s=>{const d=r[s.code];if(d){ctSum+=d.ct1+d.ct2;qSum+=d.quiz1+d.quiz2;cnt++;}});
      h+=`<tr><td>${st.roll}</td><td>${st.name}</td><td>${cnt?(ctSum/(cnt*2)).toFixed(1):'-'}</td><td>${cnt?(qSum/(cnt*2)).toFixed(1):'-'}</td></tr>`;
    });
    h+=`</tbody></table></div>`;
  }
  h+=`</div></div>`;
  return h;
}
window.showExamTab=function(tab){
  document.getElementById('examSchedule').style.display=tab==='schedule'?'block':'none';
  document.getElementById('examResults').style.display=tab==='results'?'block':'none';
  document.querySelectorAll('#pagesContainer .tab-btn').forEach((b,i)=>b.classList.toggle('active',(tab==='schedule'&&i===0)||(tab==='results'&&i===1)));
};

function render_syllabus(){
  let h=`<div class="section-header"><div class="section-title">📖 ${lang==='bn'?'সিলেবাস':'Syllabus'}</div></div>`;
  const syllabi=JSON.parse(localStorage.getItem('syllabi')||'[]');
  const defaults=[
    {sub:'AC Machines-II (26771)',ct:'Chapter 1-3',mid:'Chapter 1-6 (60%)',final:'Full Book'},
    {sub:'T&D Power-II (26772)',ct:'Chapter 1-2',mid:'Chapter 1-5 (50%)',final:'Full Book'},
    {sub:'Switch Gear (26773)',ct:'Chapter 1-3',mid:'Chapter 1-5 (60%)',final:'Full Book'},
    {sub:'Automation & PLC (26875)',ct:'Chapter 1-2',mid:'Chapter 1-4 (50%)',final:'Full Book'},
    {sub:'Business Comm (26803)',ct:'Chapter 1-3',mid:'Chapter 1-5 (60%)',final:'Full Book'}
  ];
  const all=[...syllabi,...defaults];
  h+=`<div class="card"><div class="table-container"><table><thead><tr><th>Subject</th><th>CT/Quiz</th><th>Mid Syllabus</th><th>Final</th></tr></thead><tbody>`;
  all.forEach(s=>{h+=`<tr><td style="font-weight:600">${s.sub}</td><td>${s.ct}</td><td>${s.mid}</td><td>${s.final}</td></tr>`;});
  h+=`</tbody></table></div></div>`;
  return h;
}

function render_attendance(){
  const att=generateAttendance();
  let h=`<div class="section-header"><div class="section-title">✅ ${lang==='bn'?'অ্যাটেন্ডেন্স':'Attendance'}</div>
  <div class="section-desc">${lang==='bn'?'২৮ মার্চ থেকে আজ পর্যন্ত (শুক্র-শনি বাদে)':'March 28 to today (Fri-Sat excluded)'}</div></div>`;
  if(session.type==='student'){
    const sa=att[session.roll];
    if(sa){
      h+=`<div class="grid-auto">`;
      SUBJECTS.filter(s=>!s.code.startsWith('COM')).forEach(s=>{
        const d=sa[s.code];if(!d)return;
        const pct=d.total?Math.round((d.attended/d.total)*100):0;
        let color=pct>=80?'#10b981':pct>=50?'#f59e0b':'#ef4444';
        let label=pct>=80?(lang==='bn'?'✅ ভালো':'✅ Good'):pct>=50?(lang==='bn'?'⚠️ স্বাভাবিক':'⚠️ Normal'):(lang==='bn'?'🔴 সতর্কতা!':'🔴 Warning!');
        h+=`<div class="card animate-in"><div class="subject-code">${s.code}</div><div style="font-weight:600;margin:4px 0">${lang==='bn'?s.nameBn:s.name}</div>
        <div style="display:flex;justify-content:space-between;margin:8px 0"><span>Present: ${d.attended}/${d.total}</span><span style="color:${color};font-weight:700">${pct}%</span></div>
        <div class="progress-bar"><div class="progress-fill" style="width:${pct}%;background:${color}"></div></div>
        <div style="margin-top:6px"><span class="badge" style="background:${color}20;color:${color}">${label}</span></div></div>`;
      });
      h+=`</div>`;
    }
  } else {
    h+=`<div class="card"><p>${lang==='bn'?'সকল শিক্ষার্থীর অ্যাটেন্ডেন্স':'All Student Attendance'}</p>
    <div class="table-container" style="max-height:500px;overflow-y:auto"><table><thead><tr><th>Roll</th><th>Name</th><th>Avg %</th><th>Status</th></tr></thead><tbody>`;
    STUDENTS.forEach(st=>{
      const sa=att[st.roll];let total=0,attended=0,cnt=0;
      if(sa)SUBJECTS.forEach(s=>{const d=sa[s.code];if(d){total+=d.total;attended+=d.attended;cnt++;}});
      const pct=total?Math.round((attended/total)*100):0;
      let badge=pct>=80?'badge-success':pct>=50?'badge-warning':'badge-danger';
      h+=`<tr><td>${st.roll}</td><td>${st.name}</td><td>${pct}%</td><td><span class="badge ${badge}">${pct>=80?'Good':pct>=50?'Normal':'Warning'}</span></td></tr>`;
    });
    h+=`</tbody></table></div></div>`;
  }
  return h;
}
