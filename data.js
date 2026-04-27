// ===== ফরিদপুর পলিটেকনিক ইনস্টিটিউট - ইলেকট্রিক্যাল টেকনোলজি =====
// Created by: মোঃ আরিফুল ইসলাম | Faridpur Polytechnic Institute | 7th Semester

const SITE_CONFIG = {
    nameBn: 'ইলেকট্রিক্যাল টেকনোলজি',
    nameEn: 'Electrical Technology',
    deptBn: 'ইলেকট্রিক্যাল টেকনোলজি',
    deptEn: 'Electrical Technology',
    semester: '৭ম পর্ব (7th Semester)',
    shift: '১ম শিফট (1st Shift)',
    creatorBn: 'মোঃ আরিফুল ইসলাম',
    creatorEn: 'Md. Ariful Islam',
    creatorInfo: 'ফরিদপুর পলিটেকনিক ইনস্টিটিউট, ৭ম পর্ব, ইলেকট্রিক্যাল টেকনোলজি',
    totalStudents: 36,
    passedStudents: 50
};

const STUDENTS = [
    {id:1, name:"MD. JUBORAJ HOSSEN", nameBn:"মোঃ জুবরাজ হোসেন", roll:747155, reg:"15022711185/2223", gpa:3.42, board:"New", gender:"M", phone:"01700000001"},
    {id:2, name:"TASFIQUR RAHMAN", nameBn:"তাসফিকুর রহমান", roll:747157, reg:"15022711184/2223", gpa:3.11, board:810123, gender:"M", phone:"01700000002"},
    {id:3, name:"MD. RATUL MONDOL", nameBn:"মোঃ রাতুল মন্ডল", roll:747158, reg:"15022711183/2223", gpa:3.32, board:809244, gender:"M", phone:"01700000003"},
    {id:4, name:"MD. SHAKIBUL ISLAM", nameBn:"মোঃ শাকিবুল ইসলাম", roll:747161, reg:"15022711181/2223", gpa:3.03, board:"New", gender:"M", phone:"01700000004"},
    {id:5, name:"SALMAN MRIDHA", nameBn:"সালমান মৃধা", roll:747162, reg:"15022711180/2223", gpa:3.58, board:809915, gender:"M", phone:"01700000005"},
    {id:6, name:"MD. JIHAT SHEIKH", nameBn:"মোঃ জিহাত শেখ", roll:747168, reg:"15022711177/2223", gpa:2.80, board:"New", gender:"M", phone:"01700000006"},
    {id:7, name:"LATIFUL ISLAM", nameBn:"লতিফুল ইসলাম", roll:747173, reg:"15022711176/2223", gpa:2.60, board:"New", gender:"M", phone:"01700000007"},
    {id:8, name:"MD. HASIBUL ISLAM", nameBn:"মোঃ হাসিবুল ইসলাম", roll:747180, reg:"15022711174/2223", gpa:3.31, board:806619, gender:"M", phone:"01700000008"},
    {id:9, name:"MD. MAHFUZUR ROHOMAN NAHIN", nameBn:"মোঃ মাহফুজুর রহমান নাহিন", roll:747189, reg:"15022711171/2223", gpa:3.05, board:811619, gender:"M", phone:"01700000009"},
    {id:10, name:"MD. IBRAHIM ISLAM", nameBn:"মোঃ ইব্রাহিম ইসলাম", roll:747192, reg:"15022711170/2223", gpa:3.82, board:797528, gender:"M", phone:"01700000010"},
    {id:11, name:"MD. TARIKUL ISLAM", nameBn:"মোঃ তারিকুল ইসলাম", roll:747194, reg:"15022711169/2223", gpa:3.81, board:951773, gender:"M", phone:"01700000011"},
    {id:12, name:"DIP KARMOKER", nameBn:"দীপ কর্মকার", roll:747195, reg:"15022711168/2223", gpa:2.64, board:"New", gender:"M", phone:"01700000012"},
    {id:13, name:"MD. ESTIAR HOSEN", nameBn:"মোঃ ইসতিয়ার হোসেন", roll:747201, reg:"15022711166/2223", gpa:3.18, board:"New", gender:"M", phone:"01700000013"},
    {id:14, name:"MD. HAFIZUL ISLAM", nameBn:"মোঃ হাফিজুল ইসলাম", roll:747202, reg:"15022711165/2223", gpa:3.59, board:803580, gender:"M", phone:"01700000014"},
    {id:15, name:"MD. BILLAL HOSSEN", nameBn:"মোঃ বিল্লাল হোসেন", roll:747205, reg:"15022711164/2223", gpa:3.53, board:810224, gender:"M", phone:"01700000015"},
    {id:16, name:"MD. MONJIL KHONDOKAR", nameBn:"মোঃ মনজিল খন্দকার", roll:747213, reg:"15022711163/2223", gpa:2.98, board:"New", gender:"M", phone:"01700000016"},
    {id:17, name:"MD. ENAMUL SHEIKH", nameBn:"মোঃ এনামুল শেখ", roll:747217, reg:"15022711162/2223", gpa:3.19, board:"New", gender:"M", phone:"01700000017"},
    {id:18, name:"MD. MAHI", nameBn:"মোঃ মাহি (ডিআইএস)", roll:747218, reg:"15022711161/2223", gpa:2.73, board:"New", gender:"M", phone:"01700000018"},
    {id:19, name:"RUMIA AKTER", nameBn:"রুমিয়া আক্তার (এফইকিউ)", roll:747226, reg:"15022711157/2223", gpa:3.44, board:798080, gender:"F", phone:"01700000019"},
    {id:20, name:"MD. ARIFUL ISLAM", nameBn:"মোঃ আরিফুল ইসলাম", roll:747228, reg:"15022711156/2223", gpa:3.13, board:"New", gender:"M", phone:"01700000020"},
    {id:21, name:"SOHAN SHEIKH", nameBn:"সোহান শেখ", roll:747229, reg:"15022711155/2223", gpa:3.65, board:"New", gender:"M", phone:"01700000021"},
    {id:22, name:"ABU TALHA", nameBn:"আবু তালহা", roll:747231, reg:"15022711153/2223", gpa:3.17, board:806909, gender:"M", phone:"01700000022"},
    {id:23, name:"BIDHAN SAHA", nameBn:"বিধান সাহা", roll:747235, reg:"15022711150/2223", gpa:3.18, board:"New", gender:"M", phone:"01700000023"},
    {id:24, name:"ASHA KHATUN", nameBn:"আশা খাতুন (এফইকিউ)", roll:747236, reg:"15022711149/2223", gpa:3.73, board:"New", gender:"F", phone:"01700000024"},
    {id:25, name:"MD. EAMIN HOSSAIN", nameBn:"মোঃ ইমিন হোসেন", roll:747237, reg:"15022711148/2223", gpa:3.20, board:"New", gender:"M", phone:"01700000025"},
    {id:26, name:"ROTNA AKTER", nameBn:"রত্না আক্তার (এফইকিউ)", roll:747253, reg:"15022711141/2223", gpa:3.06, board:797234, gender:"F", phone:"01700000026"},
    {id:27, name:"ROBIN HOSSEN", nameBn:"রবিন হোসেন", roll:747257, reg:"15022711140/2223", gpa:3.15, board:"New", gender:"M", phone:"01700000027"},
    {id:28, name:"AHAD BEPARY", nameBn:"আহাদ বেপারী", roll:747258, reg:"15022711139/2223", gpa:3.78, board:412344, gender:"M", phone:"01700000028"},
    {id:29, name:"MD. SIAM MAHMUD", nameBn:"মোঃ সিয়াম মাহমুদ", roll:747266, reg:"15022711134/2223", gpa:2.75, board:"New", gender:"M", phone:"01700000029"},
    {id:30, name:"ARAFIN SIDDIQUE AKASH", nameBn:"আরাফিন সিদ্দিক আকাশ", roll:747267, reg:"15022711133/2223", gpa:3.93, board:796534, gender:"M", phone:"01700000030"},
    {id:31, name:"JAHIDUL ISLAM", nameBn:"জাহিদুল ইসলাম", roll:747270, reg:"15022711131/2223", gpa:3.44, board:811729, gender:"M", phone:"01700000031"},
    {id:32, name:"JISAN ISLAM", nameBn:"জিসান ইসলাম", roll:747277, reg:"15022711128/2223", gpa:2.61, board:"New", gender:"M", phone:"01700000032"},
    {id:33, name:"JAYEDBEEN FAHIM", nameBn:"জায়েদবীন ফাহিম", roll:747286, reg:"15022711126/2223", gpa:2.94, board:"New", gender:"M", phone:"01700000033"},
    {id:34, name:"S.M MANUR HASAN RIFAT", nameBn:"এস.এম মানুর হাসান রিফাত", roll:747288, reg:"15022711125/2223", gpa:2.84, board:797179, gender:"M", phone:"01700000034"},
    {id:35, name:"MD. SHAKIL AHOMAD RIMON", nameBn:"মোঃ শাকিল আহমদ রিমন", roll:747303, reg:"15022711119/2223", gpa:2.65, board:"New", gender:"M", phone:"01700000035"},
    {id:36, name:"MUSTAKIM BILLAH PRANTO", nameBn:"মুস্তাকিম বিল্লাহ প্রান্ত", roll:747306, reg:"15022711117/2223", gpa:3.42, board:807479, gender:"M", phone:"01700000036"}
];

const TEACHERS = [
    {id:1, name:"Sohel Mollah", nameBn:"সোহেল মোল্লা", short:"SM", subjects:["Business Communication (25831)"], phone:"01711000001", whatsapp:"01711000001"},
    {id:2, name:"Nahida Akter", nameBn:"নাহিদা আক্তার", short:"NA", subjects:["Innovation & Entrepreneurship (25853)"], phone:"01711000002", whatsapp:"01711000002"},
    {id:3, name:"Md. Mosharof Hosen", nameBn:"মোঃ মোশারফ হোসেন", short:"MH", subjects:["AC Machines-II (26771)"], phone:"01711000003", whatsapp:"01711000003"},
    {id:4, name:"Tawfidur Rahman", nameBn:"তৌফিদুর রহমান", short:"TR", subjects:["T&D Power-II (26772)","Automation & PLC (26875)"], phone:"01711000004", whatsapp:"01711000004"},
    {id:5, name:"Rakibul Islam", nameBn:"রাকিবুল ইসলাম", short:"RI", subjects:["Switch Gear & Protection (26773)"], phone:"01711000005", whatsapp:"01711000005"},
    {id:6, name:"Razaul Karim", nameBn:"রাজাউল করিম", short:"RK", subjects:["Project-II (26774)"], phone:"01711000006", whatsapp:"01711000006"}
];

const SUBJECTS = [
    {code:"25831", name:"Business Communication", nameBn:"বিজনেস কমিউনিকেশন", teacher:"Sohel Mollah", teacherBn:"সোহেল মোল্লা", credit:2, type:"Theory"},
    {code:"25853", name:"Innovation & Entrepreneurship", nameBn:"ইনোভেশন এন্ড এন্ট্রাপ্রেনারশিপ", teacher:"Nahida Akter", teacherBn:"নাহিদা আক্তার", credit:2, type:"Theory"},
    {code:"26771", name:"AC Machines-II", nameBn:"এসি মেশিনস-২", teacher:"Md. Mosharof Hosen", teacherBn:"মোঃ মোশারফ হোসেন", credit:4, type:"Theory+Practical"},
    {code:"26772", name:"T&D of Electrical Power-II", nameBn:"ট্রান্সমিশন এন্ড ডিস্ট্রিবিউশন-২", teacher:"Tawfidur Rahman", teacherBn:"তৌফিদুর রহমান", credit:4, type:"Theory+Practical"},
    {code:"26773", name:"Switch Gear & Protection", nameBn:"সুইচ গিয়ার এন্ড প্রটেকশন", teacher:"Rakibul Islam", teacherBn:"রাকিবুল ইসলাম", credit:4, type:"Theory+Practical"},
    {code:"26774", name:"Electrical Engineering Project-II", nameBn:"ইলেকট্রিক্যাল ইঞ্জিনিয়ারিং প্রজেক্ট-২", teacher:"Razaul Karim", teacherBn:"রাজাউল করিম", credit:4, type:"Project"},
    {code:"26875", name:"Automation Engineering & PLC", nameBn:"অটোমেশন ইঞ্জিনিয়ারিং এন্ড পিএলসি", teacher:"Tawfidur Rahman", teacherBn:"তৌফিদুর রহমান", credit:4, type:"Theory+Practical"}
];

const ROUTINE = {
    days: ['SUN','MON','TUE','WED','THU'],
    daysBn: ['রবিবার','সোমবার','মঙ্গলবার','বুধবার','বৃহস্পতিবার'],
    times: ['8:00-8:45','8:45-9:30','9:30-10:15','10:15-11:00','11:00-11:45','11:45-12:30','12:30-1:15'],
    schedule: {
        SUN: ['26774/RK','25831/SM','26875/TR','26771/MH','COM405','COM405','X'],
        MON: ['26875/TR','26771/MH','25831/SM','26773/RI','COM405','26772/TR','EMS'],
        TUE: ['26771/MH','PLC LAB/TR','PLC LAB/TR','26772/TR','26772/TR','26772/TR','EMS'],
        WED: ['26773/RI','25853/NA','25853/NA','26772/TR','26875/TR','COM405','COM405'],
        THU: ['26774/RK','X','26772/TR','25831/SM','26773/RI','26771/MH','26771/MH']
    }
};

// Teacher Login: ID=T001, Reg=REG001, Short=SM (example)
const TEACHER_CREDENTIALS = {
    "T001": {reg:"REG001", teacherId:1},
    "T002": {reg:"REG002", teacherId:2},
    "T003": {reg:"REG003", teacherId:3},
    "T004": {reg:"REG004", teacherId:4},
    "T005": {reg:"REG005", teacherId:5},
    "T006": {reg:"REG006", teacherId:6}
};

// 30 Hadith - one per day of month
const HADITH_LIST = [
    {bn:"যে ব্যক্তি আল্লাহ ও পরকালে বিশ্বাস রাখে, সে যেন ভালো কথা বলে অথবা চুপ থাকে।", en:"Whoever believes in Allah and the Last Day, let him speak good or remain silent.", ref:"সহীহ বুখারী ৬০১৮"},
    {bn:"তোমাদের মধ্যে সেই উত্তম যে কুরআন শিখে এবং শেখায়।", en:"The best among you are those who learn the Quran and teach it.", ref:"সহীহ বুখারী ৫০২৭"},
    {bn:"ইলম অর্জন করা প্রত্যেক মুসলিমের উপর ফরজ।", en:"Seeking knowledge is an obligation upon every Muslim.", ref:"সুনানে ইবনে মাজাহ ২২৪"},
    {bn:"দুনিয়া মুমিনের জন্য কারাগার এবং কাফিরের জন্য জান্নাত।", en:"This world is a prison for the believer and a paradise for the disbeliever.", ref:"সহীহ মুসলিম ২৯৫৬"},
    {bn:"যে ব্যক্তি মানুষের কৃতজ্ঞতা প্রকাশ করে না, সে আল্লাহরও শুকরিয়া আদায় করে না।", en:"He who does not thank people, does not thank Allah.", ref:"সুনানে আবু দাউদ ৪৮১১"},
    {bn:"প্রত্যেক কাজ নিয়তের উপর নির্ভরশীল।", en:"Actions are judged by intentions.", ref:"সহীহ বুখারী ১"},
    {bn:"মুসলিম সেই ব্যক্তি যার হাত ও জিহ্বা থেকে অন্য মুসলমান নিরাপদ।", en:"A Muslim is one from whose tongue and hand other Muslims are safe.", ref:"সহীহ বুখারী ১০"},
    {bn:"তোমরা রাগ করো না। (তিনবার বললেন)", en:"Do not get angry. (He repeated it three times)", ref:"সহীহ বুখারী ৬১১৬"},
    {bn:"নিশ্চয়ই আল্লাহ তোমাদের চেহারা ও সম্পদ দেখেন না, বরং তোমাদের অন্তর ও আমল দেখেন।", en:"Allah does not look at your appearance or wealth, but looks at your hearts and deeds.", ref:"সহীহ মুসলিম ২৫৬৪"},
    {bn:"যে ব্যক্তি জ্ঞান অর্জনের জন্য পথ চলে, আল্লাহ তার জন্য জান্নাতের পথ সহজ করে দেন।", en:"Whoever takes a path seeking knowledge, Allah will make easy for him a path to Paradise.", ref:"সহীহ মুসলিম ২৬৯৯"},
    {bn:"তোমরা পরস্পর হিংসা করো না, ঘৃণা করো না এবং পরস্পরের বিরুদ্ধাচরণ করো না।", en:"Do not envy one another, do not hate one another, and do not turn away from one another.", ref:"সহীহ মুসলিম ২৫৫৯"},
    {bn:"জান্নাতে একটি গাছ আছে যার ছায়ায় একজন আরোহী একশ বছর চললেও তা শেষ হবে না।", en:"In Paradise there is a tree under whose shade a rider could travel for a hundred years.", ref:"সহীহ বুখারী ৩২৫২"},
    {bn:"যে ব্যক্তি কোনো মুসলিমের দোষ গোপন রাখে, আল্লাহ কিয়ামতের দিন তার দোষ গোপন রাখবেন।", en:"Whoever conceals the fault of a Muslim, Allah will conceal his faults on the Day of Judgment.", ref:"সহীহ মুসলিম ২৫৮০"},
    {bn:"হাসিমুখে তোমার ভাইয়ের সাথে সাক্ষাৎ করাও সদকা।", en:"Meeting your brother with a cheerful face is an act of charity.", ref:"জামে তিরমিযী ১৯৫৬"},
    {bn:"শক্তিশালী সেই ব্যক্তি নয় যে কুস্তিতে জেতে, বরং শক্তিশালী সেই যে রাগের সময় নিজেকে নিয়ন্ত্রণ করে।", en:"The strong man is not the one who wrestles, but the one who controls himself in anger.", ref:"সহীহ বুখারী ৬১১৪"},
    {bn:"তোমাদের কেউ ততক্ষণ মুমিন হতে পারবে না, যতক্ষণ না সে তার ভাইয়ের জন্য তাই পছন্দ করে যা নিজের জন্য পছন্দ করে।", en:"None of you truly believes until he loves for his brother what he loves for himself.", ref:"সহীহ বুখারী ১৩"},
    {bn:"আল্লাহর কাছে সবচেয়ে প্রিয় আমল হলো যা নিয়মিত করা হয়, যদিও তা অল্প হোক।", en:"The most beloved deed to Allah is the one done regularly, even if small.", ref:"সহীহ বুখারী ৬৪৬৪"},
    {bn:"যে ব্যক্তি সকাল ও সন্ধ্যায় ১০ বার দুরূদ পাঠ করে, কিয়ামতের দিন সে আমার শাফায়াত পাবে।", en:"Whoever sends blessings upon me ten times in the morning and evening will receive my intercession.", ref:"আত-তাবারানী"},
    {bn:"সবচেয়ে উত্তম সদকা হলো জ্ঞান শিক্ষা দেওয়া।", en:"The best charity is to teach knowledge.", ref:"সুনানে ইবনে মাজাহ"},
    {bn:"পরিষ্কার-পরিচ্ছন্নতা ঈমানের অঙ্গ।", en:"Cleanliness is half of faith.", ref:"সহীহ মুসলিম ২২৩"},
    {bn:"তোমরা সহজ করো, কঠিন করো না; সুসংবাদ দাও, ভয় দেখাও না।", en:"Make things easy, not difficult; give glad tidings, do not scare people away.", ref:"সহীহ বুখারী ৬৯"},
    {bn:"জান্নাত মায়ের পায়ের নিচে।", en:"Paradise lies beneath the feet of mothers.", ref:"সুনানে নাসাঈ ৩১০৪"},
    {bn:"যে ব্যক্তি আমানতদার নয়, তার ঈমান নেই।", en:"There is no faith for the one who has no trustworthiness.", ref:"মুসনাদে আহমাদ ১২৩৮৩"},
    {bn:"তোমরা বেশি বেশি মৃত্যুকে স্মরণ করো।", en:"Remember frequently the destroyer of pleasures - death.", ref:"জামে তিরমিযী ২৩০৭"},
    {bn:"প্রতিবেশীর সাথে ভালো ব্যবহার করো।", en:"Be kind to your neighbor.", ref:"সহীহ বুখারী ৬০১৫"},
    {bn:"যে ব্যক্তি এতিমের দেখাশোনা করে, সে ও আমি জান্নাতে এভাবে থাকব।", en:"I and the guardian of an orphan will be in Paradise like this.", ref:"সহীহ বুখারী ৫৩০৪"},
    {bn:"আল্লাহর রহমত থেকে নিরাশ হয়ো না।", en:"Do not despair of the mercy of Allah.", ref:"সূরা আয-যুমার ৩৯:৫৩"},
    {bn:"যে ব্যক্তি ফজরের নামাজ পড়ে সে আল্লাহর জিম্মায় থাকে।", en:"Whoever prays Fajr is under the protection of Allah.", ref:"সহীহ মুসলিম ৬৫৭"},
    {bn:"তোমরা অধিক পরিমাণে ইস্তেগফার করো।", en:"Seek forgiveness from Allah abundantly.", ref:"সুনানে ইবনে মাজাহ ৩৮১৯"},
    {bn:"দোয়া হলো ইবাদতের মূল।", en:"Supplication (Dua) is the essence of worship.", ref:"জামে তিরমিযী ৩৩৭১"}
];

function getTodayHadith(){
    const day = new Date().getDate() - 1;
    return HADITH_LIST[day % 30];
}

function getBanglaDate(d){
    const bMonths=['বৈশাখ','জ্যৈষ্ঠ','আষাঢ়','শ্রাবণ','ভাদ্র','আশ্বিন','কার্তিক','অগ্রহায়ণ','পৌষ','মাঘ','ফাল্গুন','চৈত্র'];
    const m=d.getMonth(),dy=d.getDate();
    let bi=m>=3?m-3:m+9;
    let bd=dy>=14?dy-13:dy+17;
    if(bd>30){bd-=30;bi=(bi+1)%12;}
    const bn=['০','১','২','৩','৪','৫','৬','৭','৮','৯'];
    const bds=String(bd).split('').map(c=>bn[c]).join('');
    return bds+' '+bMonths[bi]+', ১৪৩৩';
}

function getHijriDate(d){
    const hMonths=['মুহাররম','সফর','রবিউল আউয়াল','রবিউস সানি','জুমাদাল উলা','জুমাদাস সানি','রজব','শাবান','রমজান','শাওয়াল','জিলকদ','জিলহজ'];
    const jd=Math.floor(d.getTime()/86400000)+2440588;
    const l=jd-1948440+10632;
    const n=Math.floor((l-1)/10631);
    const lr=l-10631*n+354;
    const j=(Math.floor((10985-lr)/5316))*(Math.floor((50*lr)/17719))+(Math.floor(lr/5670))*(Math.floor((43*lr)/15238));
    const lr2=lr-(Math.floor((30-j)/15))*(Math.floor((17719*j)/50))-(Math.floor(j/16))*(Math.floor((15238*j)/43))+29;
    const hm=Math.floor((24*lr2)/709);
    const hd=lr2-Math.floor((709*hm)/24);
    const hy=30*n+j-30;
    const bn=['০','১','২','৩','৪','৫','৬','৭','৮','৯'];
    const hds=String(hd).split('').map(c=>bn[c]).join('');
    const hys=String(hy).split('').map(c=>bn[c]).join('');
    return hds+' '+hMonths[hm-1]+', '+hys+' হিজরী';
}

// Generate semester GPAs (1-8 semesters)
function generateSemesterGPAs() {
    const saved = localStorage.getItem('semesterGPAs_v2');
    if (saved) return JSON.parse(saved);
    const data = {};
    STUDENTS.forEach(s => {
        data[s.roll] = [];
        for (let i = 0; i < 8; i++) {
            data[s.roll].push(+(3.0 + Math.random()).toFixed(2));
        }
    });
    localStorage.setItem('semesterGPAs_v2', JSON.stringify(data));
    return data;
}

// Generate random attendance - more varied
function generateAttendance() {
    const saved = localStorage.getItem('attendanceData_v2');
    if (saved) return JSON.parse(saved);
    const data = {};
    STUDENTS.forEach(s => {
        data[s.roll] = {};
        const studentRate = 0.3 + Math.random() * 0.6; // 30%-90% range per student
        SUBJECTS.forEach(sub => {
            const total = 25 + Math.floor(Math.random() * 15); // 25-40 classes
            const rate = Math.max(0.2, Math.min(0.95, studentRate + (Math.random() - 0.5) * 0.3));
            const attended = Math.floor(total * rate);
            data[s.roll][sub.code] = { total, attended };
        });
    });
    localStorage.setItem('attendanceData_v2', JSON.stringify(data));
    return data;
}

// Generate random exam results
function generateResults() {
    const saved = localStorage.getItem('examResults');
    if (saved) return JSON.parse(saved);
    const data = {};
    STUDENTS.forEach(s => {
        data[s.roll] = {};
        SUBJECTS.forEach(sub => {
            data[s.roll][sub.code] = {
                ct1: Math.floor(Math.random() * 5) + 6,
                ct2: Math.floor(Math.random() * 5) + 6,
                quiz1: Math.floor(Math.random() * 5) + 6,
                quiz2: Math.floor(Math.random() * 5) + 6,
                mid: Math.floor(Math.random() * 21) + 20
            };
        });
    });
    localStorage.setItem('examResults', JSON.stringify(data));
    return data;
}

