// Pages Part 1: Dashboard, Subjects, Routine
function render_dashboard(){
  const s=session;
  const name=s.type==='student'?(lang==='bn'?s.nameBn:s.name):(lang==='bn'?s.nameBn:s.name);
  let h=`<div class="section-header"><div class="section-title">${lang==='bn'?'স্বাগতম':'Welcome'}, ${name}!</div>
  <div class="section-desc">${lang==='bn'?'ফরিদপুর পলিটেকনিক ইনস্টিটিউট | ইলেকট্রিক্যাল টেকনোলজি | ৭ম পর্ব':'Faridpur Polytechnic | Electrical Technology | 7th Semester'}</div></div>`;
  h+=`<div class="grid-4">
    <div class="stat-card animate-in"><div class="stat-value">${SUBJECTS.length}</div><div class="stat-label">${lang==='bn'?'সাবজেক্ট':'Subjects'}</div></div>
    <div class="stat-card animate-in" style="animation-delay:.1s"><div class="stat-value">${TEACHERS.length}</div><div class="stat-label">${lang==='bn'?'শিক্ষক':'Teachers'}</div></div>
    <div class="stat-card animate-in" style="animation-delay:.2s"><div class="stat-value">${STUDENTS.length}</div><div class="stat-label">${lang==='bn'?'শিক্ষার্থী':'Students'}</div></div>
    <div class="stat-card animate-in" style="animation-delay:.3s"><div class="stat-value">৭ম</div><div class="stat-label">${lang==='bn'?'সেমিস্টার':'Semester'}</div></div>
  </div>`;
  // Upcoming notice
  h+=`<div class="card" style="margin-top:20px;border-left:4px solid var(--accent)"><div class="card-header"><span class="card-title">🔔 ${lang==='bn'?'আজকের নোটিফিকেশন':'Today\'s Notification'}</span><span class="badge badge-warning">NEW</span></div>
  <p style="font-size:1.1rem;font-weight:700;color:var(--accent)">⚡ Electrical Fest 2026</p>
  <p style="color:var(--text2);margin-top:4px">📅 আজকে | ⏰ Start: 9:00 AM</p></div>`;
  // Quick routine
  const today=['SUN','MON','TUE','WED','THU'][new Date().getDay()===0?0:new Date().getDay()-1]||'SUN';
  const todaySchedule=ROUTINE.schedule[today]||[];
  h+=`<div class="card" style="margin-top:16px"><div class="card-header"><span class="card-title">📅 ${lang==='bn'?'আজকের ক্লাস রুটিন':'Today\'s Classes'} (${today})</span></div>
  <div style="display:flex;gap:8px;flex-wrap:wrap">${todaySchedule.map((c,i)=>`<div class="badge badge-info" style="padding:8px 14px">${ROUTINE.times[i]}: ${c}</div>`).join('')}</div></div>`;
  // Recent notices
  const notices=JSON.parse(localStorage.getItem('notices')||'[]');
  if(notices.length){
    h+=`<div class="card" style="margin-top:16px"><div class="card-header"><span class="card-title">📢 ${lang==='bn'?'সাম্প্রতিক নোটিশ':'Recent Notices'}</span></div>`;
    notices.slice(0,5).forEach(n=>{h+=`<div class="notif-item"><b>${n.title}</b><p style="font-size:0.8rem;color:var(--text2)">${n.content}</p><small style="color:var(--accent)">${n.date}</small></div>`;});
    h+=`</div>`;
  }
  return h;
}

function render_subjects(){
  let h=`<div class="section-header"><div class="section-title">📚 ${lang==='bn'?'সাবজেক্ট সমূহ':'Subjects'}</div></div><div class="grid-auto">`;
  SUBJECTS.forEach((s,i)=>{
    h+=`<div class="card subject-card animate-in" style="animation-delay:${i*0.08}s;cursor:pointer" onclick="openModal('<h3>${s.code} - ${lang==='bn'?s.nameBn:s.name}</h3><p style=\\'margin:8px 0\\'><b>${lang==='bn'?'শিক্ষক':'Teacher'}:</b> ${lang==='bn'?s.teacherBn:s.teacher}</p><p><b>Credit:</b> ${s.credit}</p><p><b>Type:</b> ${s.type}</p><br><button class=\\'btn btn-secondary\\' onclick=\\'closeModal()\\'>Close</button>')">
      <div class="subject-code">${s.code}</div>
      <div class="subject-name">${lang==='bn'?s.nameBn:s.name}</div>
      <div class="subject-teacher">👨‍🏫 ${lang==='bn'?s.teacherBn:s.teacher}</div>
      <div style="margin-top:8px"><span class="badge badge-info">Credit: ${s.credit}</span> <span class="badge badge-warning">${s.type}</span></div>
    </div>`;
  });
  // Show uploaded PDFs
  const pdfs=JSON.parse(localStorage.getItem('subjectPDFs')||'[]');
  if(pdfs.length){
    h+=`</div><div class="card" style="margin-top:20px"><div class="card-title">📄 ${lang==='bn'?'আপলোড করা পিডিএফ/নোট':'Uploaded PDFs/Notes'}</div>`;
    pdfs.forEach(p=>{h+=`<div class="notif-item" style="margin-top:8px"><b>${p.subject}</b> - ${p.title}<br><small style="color:var(--text2)">${p.date} | By: ${p.teacher}</small></div>`;});
    h+=`</div>`;
  } else h+=`</div>`;
  return h;
}

function render_routine(){
  let h=`<div class="section-header"><div class="section-title">📅 ${lang==='bn'?'ক্লাস রুটিন':'Class Routine'}</div>
  <div class="section-desc">${lang==='bn'?'৭ম পর্ব | ১ম শিফট | ইলেকট্রিক্যাল (৬৭)':'7th Semester | 1st Shift | Electrical (67)'}</div></div>`;
  h+=`<div class="card"><div class="table-container"><table><thead><tr><th>${lang==='bn'?'দিন':'Day'}/সময়</th>`;
  ROUTINE.times.forEach(t=>{h+=`<th>${t}</th>`;});
  h+=`</tr></thead><tbody>`;
  ROUTINE.days.forEach((d,i)=>{
    const isToday=new Date().getDay()===(i===0?0:i+1);
    h+=`<tr style="${isToday?'background:rgba(245,158,11,0.1)':''}"><td style="font-weight:700">${lang==='bn'?ROUTINE.daysBn[i]:d}</td>`;
    ROUTINE.schedule[d].forEach(c=>{
      let cls=c==='X'?'color:var(--text2)':c.includes('LAB')?'color:#10b981;font-weight:600':'';
      h+=`<td style="${cls}">${c}</td>`;
    });
    h+=`</tr>`;
  });
  h+=`</tbody></table></div></div>`;
  return h;
}
