// Core App Logic
let session, lang='bn', pages;

function init(){
  session=JSON.parse(localStorage.getItem('session'));
  if(!session){window.location.href='index.html';return;}
  lang=localStorage.getItem('lang')||'bn';
  // Load profile pics
  session.profilePic=localStorage.getItem('profilePic_'+(session.roll||session.teacherId))||'';
  buildNav();
  buildNotifications();
  buildProfile();
  navigate('dashboard');
}

const NAV_ITEMS=[
  {id:'dashboard',icon:'🏠',bn:'ড্যাশবোর্ড',en:'Dashboard'},
  {id:'subjects',icon:'📚',bn:'সাবজেক্ট',en:'Subjects'},
  {id:'routine',icon:'📅',bn:'ক্লাস রুটিন',en:'Class Routine'},
  {id:'resources',icon:'📦',bn:'রিসোর্স',en:'Resources'},
  {id:'ai',icon:'🤖',bn:'এআই অ্যাসিস্ট্যান্ট',en:'AI Assistant'},
  {id:'teachers',icon:'👨‍🏫',bn:'টিচার কর্নার',en:'Teacher Corner'},
  {id:'chat',icon:'💬',bn:'চ্যাট',en:'Chat'},
  {id:'cgpa',icon:'🎓',bn:'সিজিপিএ',en:'CGPA Calculator'}
];

function buildNav(){
  const nav=document.getElementById('sidebarNav');
  let items=[...NAV_ITEMS];
  if(session.type==='teacher') items.push({id:'manage',icon:'⚙️',bn:'CMS ম্যানেজ',en:'CMS Manage'});
  nav.innerHTML=items.map(n=>`<div class="nav-item" data-page="${n.id}" onclick="navigate('${n.id}')">`+
    `<span class="nav-icon">${n.icon}</span><span>${lang==='bn'?n.bn:n.en}</span></div>`).join('');
}

function navigate(page){
  // Clear clock interval if leaving dashboard
  if(window._clockInterval){clearInterval(window._clockInterval);window._clockInterval=null;}
  document.querySelectorAll('.nav-item').forEach(n=>n.classList.toggle('active',n.dataset.page===page));
  const allItems=[...NAV_ITEMS];
  if(session.type==='teacher') allItems.push({id:'manage',icon:'⚙️',bn:'CMS ম্যানেজ',en:'CMS Manage'});
  const item=allItems.find(n=>n.id===page);
  document.getElementById('pageTitle').textContent=item?(lang==='bn'?item.bn:item.en):'';
  const container=document.getElementById('pagesContainer');
  container.innerHTML='<div class="loader"></div>';
  // Close sidebar on mobile after navigation
  document.getElementById('sidebar').classList.remove('mobile-open');
  document.getElementById('sidebarOverlay').classList.remove('active');
  setTimeout(()=>{
    try{
      const fn=window['render_'+page];
      if(fn) container.innerHTML=fn();
      else container.innerHTML=`<div class="card"><p>Coming soon...</p></div>`;
      if(window['after_'+page]) window['after_'+page]();
    }catch(e){container.innerHTML=`<div class="card"><p style="color:var(--danger)">Error: ${e.message}</p></div>`;console.error(e);}
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
function toggleSidebar(){
  const sb=document.getElementById('sidebar');
  const ov=document.getElementById('sidebarOverlay');
  sb.classList.toggle('mobile-open');
  ov.classList.toggle('active',sb.classList.contains('mobile-open'));
}
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
  const custom=JSON.parse(localStorage.getItem('notifications')||'[]');
  const all=[...custom.map(c=>({text:c.text,time:c.date,type:c.type||'info'})),...notifs];
  document.getElementById('notifCount').textContent=all.length;
  document.getElementById('notifList').innerHTML=all.map(n=>`<div class="notif-item"><div style="display:flex;align-items:center;gap:8px"><span class="badge badge-${n.type}">${n.type==='warning'?'⚠️':n.type==='danger'?'🔴':'🔵'}</span><div><p style="font-size:0.85rem">${n.text}</p><p style="font-size:0.7rem;color:var(--text2)">${n.time}</p></div></div></div>`).join('');
}

function buildProfile(){
  const c=document.getElementById('profileContent');
  const picKey='profilePic_'+(session.roll||session.teacherId);
  const pic=localStorage.getItem(picKey)||'';
  if(session.type==='student'){
    const s=session.studentData;
    const bio=JSON.parse(localStorage.getItem('bio_'+s.roll)||'{}');
    c.innerHTML=`<div style="text-align:center">
      <div class="profile-avatar" id="profileAvatar">${pic?`<img src="${pic}" alt="pic">`:(s.gender==='F'?'👩':'👨')}</div>
      <label for="picUpload" style="cursor:pointer;color:var(--accent);font-size:0.8rem">📷 ${lang==='bn'?'ছবি আপলোড':'Upload Photo'}</label>
      <input type="file" id="picUpload" accept="image/*" style="display:none" onchange="uploadProfilePic(this)">
      <h3>${s.nameBn||s.name}</h3><p style="color:var(--text2);font-size:0.8rem">${s.name}</p>
      <div class="badge badge-info" style="margin:8px auto">Roll: ${s.roll}</div>
      <div style="text-align:left;margin-top:16px" class="card">
        <p><b>রেজিস্ট্রেশন:</b> ${s.reg}</p><p><b>সেমিস্টার:</b> ${session.semester}</p>
        <p><b>শিফট:</b> ${session.shift}</p><p><b>GPA:</b> ${s.gpa}</p><p><b>বোর্ড রোল:</b> ${s.board}</p>
      </div>
      <div class="card" style="margin-top:12px;text-align:left">
        <h4 style="margin-bottom:8px">📝 ${lang==='bn'?'বায়োডাটা সম্পাদনা':'Edit Biodata'}</h4>
        <div class="form-group"><label class="form-label">পিতার নাম</label><input class="form-input" id="bioFather" value="${bio.father||''}"></div>
        <div class="form-group"><label class="form-label">মাতার নাম</label><input class="form-input" id="bioMother" value="${bio.mother||''}"></div>
        <div class="form-group"><label class="form-label">ফোন নম্বর</label><input class="form-input" id="bioPhone" value="${bio.phone||''}"></div>
        <div class="form-group"><label class="form-label">ঠিকানা</label><input class="form-input" id="bioAddress" value="${bio.address||''}"></div>
        <button class="btn btn-primary" onclick="saveBio()">💾 সেভ করুন</button>
      </div></div>`;
  } else {
    const t=TEACHERS[session.teacherId-1];
    const bio=JSON.parse(localStorage.getItem('bio_teacher_'+t.id)||'{}');
    c.innerHTML=`<div style="text-align:center">
      <div class="profile-avatar" id="profileAvatar">${pic?`<img src="${pic}" alt="pic">`:'👨‍🏫'}</div>
      <label for="picUpload" style="cursor:pointer;color:var(--accent);font-size:0.8rem">📷 ছবি আপলোড</label>
      <input type="file" id="picUpload" accept="image/*" style="display:none" onchange="uploadProfilePic(this)">
      <h3>${t.nameBn}</h3><p style="color:var(--text2)">${t.name}</p>
      <div class="badge badge-warning" style="margin:8px auto">${t.subject}</div>
      <div class="card" style="margin-top:12px;text-align:left">
        <h4 style="margin-bottom:8px">📝 প্রোফাইল আপডেট</h4>
        <div class="form-group"><label class="form-label">ফোন</label><input class="form-input" id="bioPhone" value="${bio.phone||t.phone}"></div>
        <div class="form-group"><label class="form-label">বিষয়</label><input class="form-input" id="bioSubject" value="${bio.subject||t.subject}"></div>
        <button class="btn btn-primary" onclick="saveTeacherBio()">💾 সেভ</button>
      </div></div>`;
  }
}

window.uploadProfilePic=function(input){
  const file=input.files[0];if(!file)return;
  const reader=new FileReader();
  reader.onload=function(e){
    const key='profilePic_'+(session.roll||session.teacherId);
    localStorage.setItem(key,e.target.result);
    document.getElementById('profileAvatar').innerHTML=`<img src="${e.target.result}" alt="pic">`;
    toast('✅ প্রোফাইল ছবি আপডেট হয়েছে!');
  };
  reader.readAsDataURL(file);
};

window.saveBio=function(){
  const bio={father:document.getElementById('bioFather').value,mother:document.getElementById('bioMother').value,
    phone:document.getElementById('bioPhone').value,address:document.getElementById('bioAddress').value};
  localStorage.setItem('bio_'+session.roll,JSON.stringify(bio));
  toast('✅ বায়োডাটা সেভ হয়েছে!');
};

window.saveTeacherBio=function(){
  const bio={phone:document.getElementById('bioPhone').value,subject:document.getElementById('bioSubject').value};
  localStorage.setItem('bio_teacher_'+session.teacherId,JSON.stringify(bio));
  toast('✅ প্রোফাইল আপডেট হয়েছে!');
};

// Theme from storage
if(localStorage.getItem('theme')) document.documentElement.setAttribute('data-theme',localStorage.getItem('theme'));

window.addEventListener('DOMContentLoaded', init);
