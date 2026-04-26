// Core App Logic
let session, lang='bn', pages;

function init(){
  session=JSON.parse(localStorage.getItem('session'));
  if(!session){window.location.href='index.html';return;}
  lang=localStorage.getItem('lang')||'bn';
  buildNav();
  buildNotifications();
  buildProfile();
  navigate('dashboard');
}

const NAV_ITEMS=[
  {id:'dashboard',icon:'🏠',bn:'ড্যাশবোর্ড',en:'Dashboard'},
  {id:'subjects',icon:'📚',bn:'সাবজেক্ট',en:'Subjects'},
  {id:'routine',icon:'📅',bn:'ক্লাস রুটিন',en:'Class Routine'},
  {id:'exams',icon:'📝',bn:'এক্সাম ও রেজাল্ট',en:'Exams & Results'},
  {id:'syllabus',icon:'📖',bn:'সিলেবাস',en:'Syllabus'},
  {id:'attendance',icon:'✅',bn:'অ্যাটেন্ডেন্স',en:'Attendance'},
  {id:'resources',icon:'📦',bn:'রিসোর্স',en:'Resources'},
  {id:'assignments',icon:'📋',bn:'জব রিপোর্ট',en:'Job Report'},
  {id:'ai',icon:'🤖',bn:'এআই স্যার',en:'AI Sir'},
  {id:'teachers',icon:'👨‍🏫',bn:'টিচার কর্নার',en:'Teacher Corner'},
  {id:'chat',icon:'💬',bn:'চ্যাট',en:'Chat'},
  {id:'cgpa',icon:'🎓',bn:'সিজিপিএ',en:'CGPA Calculator'}
];

function buildNav(){
  const nav=document.getElementById('sidebarNav');
  let isTeacher=session.type==='teacher';
  if(isTeacher) NAV_ITEMS.push({id:'manage',icon:'⚙️',bn:'ম্যানেজ',en:'Manage Content'});
  nav.innerHTML=NAV_ITEMS.map(n=>`<div class="nav-item" data-page="${n.id}" onclick="navigate('${n.id}')"><span class="nav-icon">${n.icon}</span><span>${lang==='bn'?n.bn:n.en}</span></div>`).join('');
}

function navigate(page){
  document.querySelectorAll('.nav-item').forEach(n=>n.classList.toggle('active',n.dataset.page===page));
  const item=NAV_ITEMS.find(n=>n.id===page);
  document.getElementById('pageTitle').textContent=item?(lang==='bn'?item.bn:item.en):'';
  const container=document.getElementById('pagesContainer');
  container.innerHTML='<div class="loader"></div>';
  setTimeout(()=>{
    const fn=window['render_'+page];
    if(fn) container.innerHTML=fn();
    else container.innerHTML=`<div class="card"><p>Coming soon...</p></div>`;
    if(window['after_'+page]) window['after_'+page]();
  },200);
}

function toggleTheme(){
  const t=document.documentElement.getAttribute('data-theme')==='dark'?'light':'dark';
  document.documentElement.setAttribute('data-theme',t);
  localStorage.setItem('theme',t);
}
function switchLang(){
  lang=lang==='bn'?'en':'bn';
  localStorage.setItem('lang',lang);
  document.getElementById('langBtn').textContent=lang==='bn'?'EN':'বাং';
  buildNav();
  navigate(document.querySelector('.nav-item.active')?.dataset.page||'dashboard');
}
function toggleSidebar(){document.getElementById('sidebar').classList.toggle('mobile-open');}
function toggleNotif(){document.getElementById('notifPanel').classList.toggle('open');document.getElementById('overlay').style.display=document.getElementById('notifPanel').classList.contains('open')?'block':'none';}
function toggleProfile(){document.getElementById('profilePanel').classList.toggle('open');document.getElementById('overlay').style.display=document.getElementById('profilePanel').classList.contains('open')?'block':'none';}
function closeAllPanels(){document.getElementById('notifPanel').classList.remove('open');document.getElementById('profilePanel').classList.remove('open');document.getElementById('overlay').style.display='none';}
function logout(){localStorage.removeItem('session');window.location.href='index.html';}
function toast(msg){const d=document.createElement('div');d.className='toast';d.textContent=msg;document.getElementById('toastContainer').appendChild(d);setTimeout(()=>d.remove(),3000);}
function openModal(html){document.getElementById('modalContent').innerHTML=html;document.getElementById('modalOverlay').classList.add('active');}
function closeModal(){document.getElementById('modalOverlay').classList.remove('active');}

function buildNotifications(){
  const notifs=[
    {text:'আগামীকাল AC Machines-II ক্লাস টেস্ট',time:'১ ঘন্টা আগে',type:'warning'},
    {text:'Switch Gear & Protection অ্যাসাইনমেন্ট জমা দিন',time:'৩ ঘন্টা আগে',type:'danger'},
    {text:'নতুন নোট আপলোড হয়েছে - PLC',time:'৫ ঘন্টা আগে',type:'info'},
    {text:'মিড পরীক্ষার সিলেবাস প্রকাশিত',time:'১ দিন আগে',type:'info'},
    {text:'অ্যাটেন্ডেন্স ৫০% এর নিচে - সতর্কতা!',time:'২ দিন আগে',type:'danger'}
  ];
  // Add teacher-submitted notifications
  const custom=JSON.parse(localStorage.getItem('notifications')||'[]');
  const all=[...custom.map(c=>({text:c.text,time:c.date,type:c.type||'info'})),...notifs];
  document.getElementById('notifCount').textContent=all.length;
  document.getElementById('notifList').innerHTML=all.map(n=>`<div class="notif-item"><div style="display:flex;align-items:center;gap:8px"><span class="badge badge-${n.type}">${n.type==='warning'?'⚠️':n.type==='danger'?'🔴':'🔵'}</span><div><p style="font-size:0.85rem">${n.text}</p><p style="font-size:0.7rem;color:var(--text2)">${n.time}</p></div></div></div>`).join('');
}

function buildProfile(){
  const c=document.getElementById('profileContent');
  if(session.type==='student'){
    const s=session.studentData;
    c.innerHTML=`<div style="text-align:center"><div class="profile-avatar">${s.gender==='F'?'👩':'👨'}</div><h3>${s.nameBn||s.name}</h3><p style="color:var(--text2);font-size:0.8rem">${s.name}</p><div class="badge badge-info" style="margin:8px auto">Roll: ${s.roll}</div><div style="text-align:left;margin-top:20px" class="card"><p><b>রেজিস্ট্রেশন:</b> ${s.reg}</p><p><b>সেমিস্টার:</b> ${session.semester}</p><p><b>শিফট:</b> ${session.shift}</p><p><b>GPA (2nd Sem):</b> ${s.gpa}</p><p><b>বোর্ড রোল:</b> ${s.board}</p><p><b>ফোন:</b> ${session.phone}</p></div></div>`;
  } else {
    const t=TEACHERS[session.teacherId-1];
    c.innerHTML=`<div style="text-align:center"><div class="profile-avatar">👨‍🏫</div><h3>${t.nameBn}</h3><p style="color:var(--text2)">${t.name}</p><div class="badge badge-warning" style="margin:8px auto">${t.subject}</div></div>`;
  }
}

// Theme from storage
if(localStorage.getItem('theme')) document.documentElement.setAttribute('data-theme',localStorage.getItem('theme'));

window.addEventListener('DOMContentLoaded', init);
