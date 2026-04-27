// Pages Part 1: Dashboard, Subjects, Routine
function render_dashboard(){
  var s=session;
  var hour=new Date().getHours();
  var salam=hour<12?"সুপ্রভাত":"সুসন্ধ্যা";
  var greet="আসসালামু আলাইকুম। "+salam+", "+(s.nameBn||s.name)+"!";
  if(lang==="en") greet="Assalamu Alaikum. Good "+(hour<12?"Morning":"Evening")+", "+s.name+"!";

  var h='<div style="display:flex;flex-wrap:wrap;gap:16px;align-items:flex-start;margin-bottom:20px">';
  h+='<div style="flex:1;min-width:280px"><div class="section-header"><div class="section-title">'+greet+'</div>';
  h+='<div class="section-desc">'+(lang==="bn"?"ফরিদপুর পলিটেকনিক ইনস্টিটিউট | ইলেকট্রিক্যাল টেকনোলজি":"Faridpur Polytechnic | Electrical Technology")+'</div></div></div>';
  h+='<div class="card" style="min-width:260px;text-align:center;padding:16px">';
  h+='<div id="liveClock" style="font-size:2rem;font-weight:800;background:linear-gradient(135deg,var(--accent),var(--accent2));-webkit-background-clip:text;-webkit-text-fill-color:transparent"></div>';
  h+='<div id="engDate" style="font-size:0.85rem;margin:4px 0;color:var(--text)"></div>';
  h+='<div id="bnDate" style="font-size:0.8rem;color:var(--accent)"></div>';
  h+='<div id="hjDate" style="font-size:0.8rem;color:var(--accent3)"></div>';
  h+='</div></div>';

  var hadith=getTodayHadith();
  h+='<div class="card" style="margin-bottom:20px;border-left:4px solid var(--accent3)">';
  h+='<div class="card-header"><span class="card-title">'+(lang==="bn"?"📖 আজকের হাদিস":"📖 Daily Hadith")+'</span><span class="badge badge-success">'+hadith.ref+'</span></div>';
  h+='<p style="font-size:1rem;line-height:1.8;color:var(--text)">'+hadith.bn+'</p>';
  h+='<p style="font-size:0.85rem;color:var(--accent2);margin-top:6px;font-style:italic">'+hadith.en+'</p></div>';

  h+='<div class="grid-4">';
  h+='<div class="stat-card animate-in"><div class="stat-value">'+SUBJECTS.length+'</div><div class="stat-label">'+(lang==="bn"?"সাবজেক্ট":"Subjects")+'</div></div>';
  h+='<div class="stat-card animate-in" style="animation-delay:.1s"><div class="stat-value">'+TEACHERS.length+'</div><div class="stat-label">'+(lang==="bn"?"শিক্ষক":"Teachers")+'</div></div>';
  h+='<div class="stat-card animate-in" style="animation-delay:.2s"><div class="stat-value">'+STUDENTS.length+'</div><div class="stat-label">'+(lang==="bn"?"শিক্ষার্থী":"Students")+'</div></div>';
  h+='<div class="stat-card animate-in" style="animation-delay:.3s"><div class="stat-value">৭ম</div><div class="stat-label">'+(lang==="bn"?"সেমিস্টার":"Semester")+'</div></div>';
  h+='</div>';

  var dayIdx=new Date().getDay();
  var dayMap={0:"SUN",1:"MON",2:"TUE",3:"WED",4:"THU"};
  var today=dayMap[dayIdx]||null;
  if(today){
    var todaySchedule=ROUTINE.schedule[today]||[];
    h+='<div class="card" style="margin-top:16px"><div class="card-header"><span class="card-title">'+(lang==="bn"?"📅 আজকের ক্লাস রুটিন":"📅 Today Classes")+' ('+today+')</span></div>';
    h+='<div style="display:flex;gap:8px;flex-wrap:wrap">';
    for(var ti=0;ti<todaySchedule.length;ti++){
      h+='<div class="badge badge-info" style="padding:8px 14px">'+ROUTINE.times[ti]+': '+todaySchedule[ti]+'</div>';
    }
    h+='</div></div>';
  } else {
    h+='<div class="card" style="margin-top:16px"><div class="card-header"><span class="card-title">'+(lang==="bn"?"🎉 আজ ছুটির দিন":"🎉 Holiday Today")+'</span></div><p style="padding:8px;color:var(--text2)">'+(lang==="bn"?"শুক্র/শনিবার ক্লাস নেই।":"No classes on Friday/Saturday.")+'</p></div>';
  }

  var notices=JSON.parse(localStorage.getItem("notices")||"[]");
  if(notices.length){
    h+='<div class="card" style="margin-top:16px"><div class="card-header"><span class="card-title">'+(lang==="bn"?"📢 সাম্প্রতিক নোটিশ":"📢 Recent Notices")+'</span></div>';
    for(var ni=0;ni<Math.min(notices.length,5);ni++){
      h+='<div class="notif-item"><b>'+notices[ni].title+'</b><p style="font-size:0.8rem;color:var(--text2)">'+notices[ni].content+'</p><small style="color:var(--accent)">'+notices[ni].date+'</small></div>';
    }
    h+='</div>';
  }
  return h;
}

function after_dashboard(){
  function updateClock(){
    var now=new Date();
    var el=document.getElementById("liveClock");
    if(!el)return;
    el.textContent=now.toLocaleTimeString("bn-BD",{hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:true});
    document.getElementById("engDate").textContent=now.toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"});
    document.getElementById("bnDate").textContent="🇧🇩 "+getBanglaDate(now);
    document.getElementById("hjDate").textContent="☪️ "+getHijriDate(now);
  }
  updateClock();
  window._clockInterval=setInterval(updateClock,1000);
}

function render_subjects(){
  var h='<div class="section-header"><div class="section-title">'+(lang==="bn"?"📚 সাবজেক্ট সমূহ":"📚 Subjects")+'</div>';
  h+='<div class="section-desc">'+(lang==="bn"?"সাবজেক্টে ক্লিক করে বিস্তারিত দেখুন":"Click a subject for details")+'</div></div><div class="grid-auto">';
  for(var i=0;i<SUBJECTS.length;i++){
    var s=SUBJECTS[i];
    h+='<div class="card subject-card animate-in" style="animation-delay:'+i*0.08+'s;cursor:pointer" onclick="openSubjectDetail(\''+s.code+'\')">';
    h+='<div class="subject-code">'+s.code+'</div>';
    h+='<div class="subject-name">'+(lang==="bn"?s.nameBn:s.name)+'</div>';
    h+='<div class="subject-teacher">👨‍🏫 '+(lang==="bn"?s.teacherBn:s.teacher)+'</div>';
    h+='<div style="margin-top:8px"><span class="badge badge-info">Credit: '+s.credit+'</span> <span class="badge badge-warning">'+s.type+'</span></div>';
    h+='</div>';
  }
  h+='</div>';
  return h;
}

window.openSubjectDetail=function(code){
  var sub=null;
  for(var i=0;i<SUBJECTS.length;i++){if(SUBJECTS[i].code===code){sub=SUBJECTS[i];break;}}
  if(!sub)return;
  var tabs=["classtest","quiztest","midexam","attendance","notes","ytlinks","examschedule","results","syllabus","jobreport","assignment"];
  var tabNamesBn=["ক্লাস টেস্ট","কুইজ টেস্ট","মিড পরীক্ষা","অ্যাটেন্ডেন্স","নোট","ইউটিউব লিংক","পরীক্ষার সময়সূচী","রেজাল্ট","সিলেবাস","জব রিপোর্ট","অ্যাসাইনমেন্ট"];
  var tabNamesEn=["Class Test","Quiz Test","Mid Exam","Attendance","Notes","YT Links","Exam Schedule","Results","Syllabus","Job Report","Assignment"];
  var icons=["📝","🧠","📋","✅","📒","▶️","📅","📊","📖","💼","📋"];
  var h='<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px"><h2>'+sub.code+' - '+(lang==="bn"?sub.nameBn:sub.name)+'</h2><button class="btn btn-secondary" onclick="closeModal()">✕</button></div>';
  h+='<p style="margin-bottom:12px">👨‍🏫 '+(lang==="bn"?sub.teacherBn:sub.teacher)+' | Credit: '+sub.credit+' | '+sub.type+'</p>';
  h+='<div class="grid-auto" style="gap:10px">';
  for(var t=0;t<tabs.length;t++){
    h+='<div class="card" style="cursor:pointer;padding:16px;text-align:center" onclick="showSubSection(\''+code+'\',\''+tabs[t]+'\')">';
    h+='<div style="font-size:1.5rem">'+icons[t]+'</div><div style="font-weight:600;margin-top:4px;font-size:0.85rem">'+(lang==="bn"?tabNamesBn[t]:tabNamesEn[t])+'</div></div>';
  }
  h+='</div><div id="subSectionContent" style="margin-top:16px"></div>';
  openModal(h);
};

window.showSubSection=function(code,tab){
  var sub=null;
  for(var i=0;i<SUBJECTS.length;i++){if(SUBJECTS[i].code===code){sub=SUBJECTS[i];break;}}
  var el=document.getElementById("subSectionContent");
  var results=generateResults();
  var att=generateAttendance();
  var c="";
  if(tab==="classtest"){
    if(session.type==="student"){
      var r=results[session.roll]?results[session.roll][code]:null;
      c='<h3>📝 ক্লাস টেস্ট</h3><table><tr><th>CT1 (10)</th><th>CT2 (10)</th></tr><tr><td>'+(r?r.ct1:"-")+'</td><td>'+(r?r.ct2:"-")+'</td></tr></table>';
    } else c="<p>টিচার CMS থেকে আপডেট করুন</p>";
  } else if(tab==="quiztest"){
    var r2=results[session.roll]?results[session.roll][code]:null;
    c='<h3>🧠 কুইজ টেস্ট</h3><table><tr><th>Quiz1 (10)</th><th>Quiz2 (10)</th></tr><tr><td>'+(r2?r2.quiz1:"-")+'</td><td>'+(r2?r2.quiz2:"-")+'</td></tr></table>';
  } else if(tab==="midexam"){
    var r3=results[session.roll]?results[session.roll][code]:null;
    c='<h3>📋 মিড পরীক্ষা</h3><table><tr><th>Mid (40)</th></tr><tr><td>'+(r3?r3.mid:"-")+'</td></tr></table>';
  } else if(tab==="attendance"){
    if(session.type==="student"){
      var sa=att[session.roll]?att[session.roll][code]:null;
      var pct=sa?Math.round((sa.attended/sa.total)*100):0;
      c='<h3>✅ অ্যাটেন্ডেন্স</h3><p>Present: '+(sa?sa.attended:0)+'/'+(sa?sa.total:0)+' ('+pct+'%)</p><div class="progress-bar"><div class="progress-fill" style="width:'+pct+'%"></div></div>';
    } else c="<p>টিচার CMS থেকে দেখুন</p>";
  } else if(tab==="notes"){
    c="<h3>📒 নোট</h3>";
    var notes=JSON.parse(localStorage.getItem("subjectNotes")||"[]");
    var filtered=[];
    for(var n=0;n<notes.length;n++){if(notes[n].subject&&notes[n].subject.indexOf(code)>=0)filtered.push(notes[n]);}
    if(filtered.length){for(var fn=0;fn<filtered.length;fn++){c+='<div class="notif-item"><b>'+filtered[fn].title+'</b><p>'+(filtered[fn].content||"")+'</p></div>';}}
    else c+="<p>কোনো নোট নেই</p>";
  } else if(tab==="ytlinks"){
    var links=JSON.parse(localStorage.getItem("learningLinks")||"[]");
    c="<h3>▶️ ইউটিউব লিংক</h3>";
    if(links.length){for(var li=0;li<links.length;li++){c+='<a href="'+links[li].url+'" target="_blank" style="display:block;color:var(--accent);margin:4px 0">▶️ '+links[li].title+'</a>';}}
    else c+="<p>কোনো লিংক নেই</p>";
  } else if(tab==="examschedule"){
    c="<h3>📅 পরীক্ষার সময়সূচী</h3><p>CT: TBA | Mid: May 2026 | Final: July 2026</p>";
  } else if(tab==="results"){
    if(session.type==="student"){
      var r4=results[session.roll]?results[session.roll][code]:null;
      c='<h3>📊 সকল রেজাল্ট</h3><table><tr><th>CT1</th><th>CT2</th><th>Quiz1</th><th>Quiz2</th><th>Mid</th></tr>';
      c+='<tr><td>'+(r4?r4.ct1:"-")+'</td><td>'+(r4?r4.ct2:"-")+'</td><td>'+(r4?r4.quiz1:"-")+'</td><td>'+(r4?r4.quiz2:"-")+'</td><td>'+(r4?r4.mid:"-")+'</td></tr></table>';
    }
  } else if(tab==="syllabus"){
    c="<h3>📖 সিলেবাস</h3><p>CT/Quiz: Chapter 1-3 | Mid: Chapter 1-6 | Final: Full Book</p>";
  } else if(tab==="jobreport"){
    c="<h3>💼 জব রিপোর্ট</h3><p>কোনো জব রিপোর্ট নেই</p>";
  } else if(tab==="assignment"){
    c="<h3>📋 অ্যাসাইনমেন্ট</h3><p>কোনো অ্যাসাইনমেন্ট নেই</p>";
  }
  el.innerHTML=c;
};

function render_routine(){
  var h='<div class="section-header"><div class="section-title">'+(lang==="bn"?"📅 ক্লাস রুটিন (A গ্রুপ)":"📅 Class Routine (A Group)")+'</div>';
  h+='<div class="section-desc">'+(lang==="bn"?"৭ম পর্ব | ১ম শিফট | ইলেকট্রিক্যাল (৬৭)":"7th Semester | 1st Shift | Electrical (67)")+'</div></div>';
  h+='<div class="card"><div class="table-container"><table><thead><tr><th>'+(lang==="bn"?"দিন":"Day")+'</th>';
  for(var t=0;t<ROUTINE.times.length;t++){h+='<th>'+ROUTINE.times[t]+'</th>';}
  h+='</tr></thead><tbody>';
  for(var d=0;d<ROUTINE.days.length;d++){
    var isToday=new Date().getDay()===(d===0?0:d+1);
    h+='<tr style="'+(isToday?"background:rgba(245,158,11,0.1)":"")+'"><td style="font-weight:700">'+(lang==="bn"?ROUTINE.daysBn[d]:ROUTINE.days[d])+'</td>';
    var sched=ROUTINE.schedule[ROUTINE.days[d]];
    for(var c=0;c<sched.length;c++){
      var cls=sched[c]==="X"?"color:var(--text2)":(sched[c].indexOf("LAB")>=0?"color:#10b981;font-weight:600":"");
      h+='<td style="'+cls+'">'+sched[c]+'</td>';
    }
    h+='</tr>';
  }
  h+='</tbody></table></div></div>';
  return h;
}
