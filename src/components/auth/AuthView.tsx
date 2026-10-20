import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Lock,
  Mail,
  User,
  GraduationCap,
  Award,
  Compass,
  Briefcase,
  AlertCircle,
  Eye,
  EyeOff,
  Heart,
  Star,
  Check,
  Building,
  Wrench,
  Stethoscope,
} from 'lucide-react';

export const AuthView: React.FC = () => {
  const { loginUser, registerUser } = useApp();

  const [authMode, setAuthMode] = useState<'register' | 'login'>('register');
  const [showPassword, setShowPassword] = useState(false);

  // Selected mascot avatar (Cute, vibrant pastel)
  const avatarOptions = [
    { id: 'praewa', label: 'แพรวา', emoji: '👧🏻', desc: 'Creative Marketer', url: '/src/assets/images/praewa_student_avatar_1792488399143.jpg' },
    { id: 'tonkla', label: 'ต้นกล้า', emoji: '🧑🏻‍💻', desc: 'Data & Tech', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80' },
    { id: 'engineer', label: 'นนท์ (วิศวะ)', emoji: '🧑🏻‍🔧', desc: 'Engineering & IoT', url: '/src/assets/images/project_engineering_iot_1792506736159.jpg' },
    { id: 'doctor', label: 'พลอย (แพทย์)', emoji: '👩🏻‍⚕️', desc: 'Healthcare & Medical', url: '/src/assets/images/project_medical_health_1792506754009.jpg' },
    { id: 'meena', label: 'มีนา', emoji: '👩🏻‍🎨', desc: 'UX/UI Designer', url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80' },
    { id: 'baiboon', label: 'ใบบุญ', emoji: '🌱', desc: 'Social Impact', url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80' },
  ];
  const [selectedAvatar, setSelectedAvatar] = useState(avatarOptions[0]);

  // Selected role
  const [userRole, setUserRole] = useState<'student' | 'partner' | 'assessor'>('student');

  // Registration Form State
  const [fullName, setFullName] = useState('แพรวา รัตนวรรณศิลป์');
  const [nickname, setNickname] = useState('แพรวา');
  const [age, setAge] = useState<number>(20);
  const [educationLevel, setEducationLevel] = useState('ระดับปริญญาตรี ชั้นปีที่ 2');
  const [institution, setInstitution] = useState('มหาวิทยาลัยธรรมศาสตร์');
  const [faculty, setFaculty] = useState('คณะพาณิชยศาสตร์และการบัญชี');
  const [email, setEmail] = useState('praewa.r@student.tu.ac.th');
  const [password, setPassword] = useState('growth2026');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    'Digital Marketing',
    'Data Analytics',
    'Social Impact',
  ]);
  const [agreedYouthPolicy, setAgreedYouthPolicy] = useState(true);
  const [regError, setRegError] = useState('');

  // Login Form State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const interestOptions = [
    { id: 'Engineering', label: 'วิศวกรรมและ IoT', icon: '⚙️', bg: 'bg-[#E0F2FE]', border: 'border-[#BAE6FD]', text: 'text-[#0369A1]' },
    { id: 'Medicine & Health', label: 'สุขภาพและการแพทย์', icon: '🩺', bg: 'bg-[#D1FAE5]', border: 'border-[#A7F3D0]', text: 'text-[#065F46]' },
    { id: 'Digital Marketing', label: 'การตลาดดิจิทัล', icon: '💡', bg: 'bg-[#FFE8DF]', border: 'border-[#FFD2C2]', text: 'text-[#C84B29]' },
    { id: 'Data Analytics', label: 'การวิเคราะห์ข้อมูล', icon: '📊', bg: 'bg-[#E3F2FD]', border: 'border-[#BAE6FD]', text: 'text-[#0284C7]' },
    { id: 'UX/UI Design', label: 'การออกแบบ UX/UI', icon: '🎨', bg: 'bg-[#EDE8FF]', border: 'border-[#D8D0FF]', text: 'text-[#6366F1]' },
    { id: 'Social Impact', label: 'นวัตกรรมเพื่อสังคม', icon: '🌱', bg: 'bg-[#E2F5E9]', border: 'border-[#C5ECD2]', text: 'text-[#2D6A4F]' },
    { id: 'Technology', label: 'เทคโนโลยีและโค้ด', icon: '⚡', bg: 'bg-[#E0F2FE]', border: 'border-[#BAE6FD]', text: 'text-[#0369A1]' },
    { id: 'Entrepreneurship', label: 'ธุรกิจและสตาร์ตอัป', icon: '🚀', bg: 'bg-[#FEF7CD]', border: 'border-[#FDE88B]', text: 'text-[#B45309]' },
    { id: 'Creative Content', label: 'ผลิตสื่อสร้างสรรค์', icon: '🌸', bg: 'bg-[#FFE4EC]', border: 'border-[#FBCFE8]', text: 'text-[#BE185D]' },
  ];

  const toggleInterest = (id: string) => {
    if (selectedInterests.includes(id)) {
      setSelectedInterests(selectedInterests.filter((item) => item !== id));
    } else {
      setSelectedInterests([...selectedInterests, id]);
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim()) {
      setRegError('กรุณากรอกชื่อ-นามสกุล และอีเมลให้ครบถ้วน');
      return;
    }
    if (!agreedYouthPolicy) {
      setRegError('กรุณายอมรับนโยบายคุ้มครองความเป็นส่วนตัวของเยาวชนเพื่อดำเนินการต่อ');
      return;
    }

    setRegError('');
    registerUser({
      fullName: fullName.trim(),
      nickname: nickname.trim() || fullName.trim().split(' ')[0],
      age,
      educationLevel,
      institution: institution.trim() || 'สถานศึกษาตัวอย่าง',
      faculty: faculty.trim() || 'สาขาวิชาทั่วไป',
      email: email.trim(),
      careerInterests: selectedInterests,
    });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail.trim()) {
      setLoginError('กรุณากรอกอีเมลเข้าใช้งาน');
      return;
    }
    setLoginError('');
    loginUser(loginEmail.trim());
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col justify-between selection:bg-[#FFE8DF] selection:text-[#173C32]">
      {/* Top Navbar */}
      <header className="w-full bg-white/85 backdrop-blur-md border-b border-[#EAE6DF] px-4 sm:px-10 py-3.5 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo & Platform Name */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#E2F5E9] via-[#FAF8F5] to-[#FFE8DF] flex items-center justify-center font-bold text-xl shadow-xs border border-[#C5ECD2]/60">
              🌱
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-black text-[#173C32] tracking-tight block leading-none">
                  GROWTH
                </span>
                <span className="text-[10px] px-2 py-0.5 bg-[#E2F5E9] text-[#20593B] font-bold rounded-full border border-[#C5ECD2]">
                  Youth Platform ✨
                </span>
              </div>
              <span className="text-[11px] text-slate-400 font-normal mt-0.5 block">
                พื้นที่ให้ทุกศักยภาพได้เติบโต · เปลี่ยนทักษะของคุณให้เป็นโอกาสในอนาคต 🌸
              </span>
            </div>
          </div>

          {/* Clean Switch between Register & Sign in */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setAuthMode(authMode === 'register' ? 'login' : 'register');
                setRegError('');
                setLoginError('');
              }}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#FAF8F5] hover:bg-white text-slate-700 border border-[#EAE6DF] rounded-xl text-xs font-bold transition-all shadow-2xs hover:border-[#52B788]"
            >
              <span>{authMode === 'register' ? '🔑 เข้าสู่ระบบ' : '🌸 ลงทะเบียนเข้าใช้งานใหม่'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8 flex items-center justify-center my-3">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Brand Story & Live Passport Card Preview (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            {/* Cute Pastel Welcome Card */}
            <div className="bg-gradient-to-br from-[#E2F5E9] via-[#FAF8F5] to-[#FFE8DF] text-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs border border-[#D5EAD8] relative overflow-hidden">
              <div className="relative z-10 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/95 text-[#20593B] text-xs font-bold shadow-2xs border border-[#C5ECD2]">
                  <span>✨</span>
                  <span>ยินดีต้อนรับสู่ครอบครัว GROWTH</span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-[#173C32] leading-tight">
                  “เปลี่ยนศักยภาพของเยาวชน ให้เป็นทักษะที่พิสูจน์ได้ และต่อยอดสู่โอกาสจริง”
                </h1>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  ค้นหาความถนัดของตนเอง ลงมือทำโจทย์จริงในสายงานวิศวกรรม การแพทย์ ธุรกิจ และสังคม สะสมพาสปอร์ตทักษะที่มีหลักฐานยืนยัน และยื่นสมัครฝึกงานได้ทันที 🌿
                </p>

                {/* 4 Pastel Growth Steps */}
                <div className="grid grid-cols-2 gap-2.5 pt-2">
                  <div className="p-3 bg-white/85 rounded-2xl border border-white shadow-2xs">
                    <div className="text-lg mb-1">🧭</div>
                    <div className="text-xs font-bold text-slate-800">1. ค้นหาความถนัด</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">แบบสำรวจความสนใจรอบด้าน</div>
                  </div>
                  <div className="p-3 bg-white/85 rounded-2xl border border-white shadow-2xs">
                    <div className="text-lg mb-1">🎨</div>
                    <div className="text-xs font-bold text-slate-800">2. ทำโปรเจกต์จริง</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">วิศวะ แพทย์ ธุรกิจ ชุมชน</div>
                  </div>
                  <div className="p-3 bg-white/85 rounded-2xl border border-white shadow-2xs">
                    <div className="text-lg mb-1">🎯</div>
                    <div className="text-xs font-bold text-slate-800">3. ตรวจรูบริก</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">รับรองโดยผู้ทรงคุณวุฒิ</div>
                  </div>
                  <div className="p-3 bg-white/85 rounded-2xl border border-white shadow-2xs">
                    <div className="text-lg mb-1">🚀</div>
                    <div className="text-xs font-bold text-slate-800">4. สู่โอกาสจริง</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">ฝึกงาน ทุน และงานที่ตรงใจ</div>
                  </div>
                </div>
              </div>

              {/* Decorative Pastel Bubbles */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-[#FFE8DF]/60 blur-xl pointer-events-none" />
              <div className="absolute top-4 right-2 w-28 h-28 rounded-full bg-[#E2F5E9]/70 blur-lg pointer-events-none" />
            </div>

            {/* Real-time Interactive GROWTH ID / Passport Preview Card */}
            <div className="bg-white border border-[#EAE6DF] rounded-3xl p-5 shadow-xs relative overflow-hidden">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <span>🪪</span>
                  <span>ตัวอย่าง GROWTH Passport ID ของคุณ</span>
                </span>
                <span className="text-[10px] font-mono font-bold text-emerald-800 bg-[#E2F5E9] px-2 py-0.5 rounded-full border border-[#C5ECD2]">
                  LIVE PREVIEW ✨
                </span>
              </div>

              <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-[#F4FAF6] via-white to-[#FFF6F2] border border-[#E0EEDF] shadow-2xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-[#173C32] text-white flex items-center justify-center text-xs font-bold">
                      G
                    </div>
                    <span className="text-xs font-black tracking-wider text-[#173C32]">GROWTH PASSPORT</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">ID: {nickname || 'USER'}-2026</span>
                </div>

                <div className="flex items-center gap-3.5 pt-1">
                  <div className="w-14 h-14 rounded-2xl bg-[#E2F5E9] border-2 border-white shadow-xs flex items-center justify-center text-2xl overflow-hidden shrink-0">
                    {selectedAvatar.emoji}
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-black text-slate-900 truncate">
                      {fullName || 'ชื่อของคุณ'}
                    </div>
                    <div className="text-xs text-slate-500 truncate">
                      {nickname ? `(${nickname}) · ` : ''}{educationLevel}
                    </div>
                    <div className="text-[11px] text-[#2D6A4F] font-medium truncate mt-0.5">
                      🏫 {institution || 'สถาบันการศึกษา'}
                    </div>
                  </div>
                </div>

                {/* Selected Interests tags preview */}
                <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-1.5">
                  {selectedInterests.length > 0 ? (
                    selectedInterests.map((interest) => (
                      <span
                        key={interest}
                        className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-[#E2F5E9] text-[#20593B] border border-[#C5ECD2]"
                      >
                        ✓ {interest}
                      </span>
                    ))
                  ) : (
                    <span className="text-[10px] text-slate-400 italic">เลือกทักษะที่สนใจด้านขวาได้เลยค่ะ 🌱</span>
                  )}
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                  <span>🛡️ Youth Privacy Protected</span>
                  <span className="text-[#3B6CFF] font-bold">Verified Ledger Ready ✨</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Registration & Login Form (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-[#EAE6DF] rounded-3xl p-6 sm:p-9 shadow-xs">
            {/* Mode Switcher Tabs (Pastel Minimalist) */}
            <div className="flex items-center justify-between pb-5 border-b border-slate-100 gap-3">
              <div className="flex items-center gap-1.5 bg-[#FAF8F5] p-1.5 rounded-2xl border border-[#EAE6DF]">
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('register');
                    setRegError('');
                  }}
                  className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                    authMode === 'register'
                      ? 'bg-white text-[#173C32] shadow-xs border border-slate-200'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  🌸 ลงทะเบียนเข้าใช้งาน
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('login');
                    setLoginError('');
                  }}
                  className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                    authMode === 'login'
                      ? 'bg-white text-[#173C32] shadow-xs border border-slate-200'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  🔑 เข้าสู่ระบบ
                </button>
              </div>

              <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
                <span>🌱</span>
                <span>GROWTH Platform</span>
              </div>
            </div>

            {/* FORM 1: Registration Form */}
            {authMode === 'register' ? (
              <form onSubmit={handleRegister} className="space-y-4 pt-4">
                {regError && (
                  <div className="p-3 bg-[#FFE8DF] border border-[#FFD2C2] rounded-2xl text-xs text-[#9A3412] flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{regError}</span>
                  </div>
                )}

                {/* 1. Mascot / Avatar Selector */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    เลือกตัวละคร / อวตารของคุณ ✨
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {avatarOptions.map((av) => {
                      const isSelected = selectedAvatar.id === av.id;
                      return (
                        <button
                          key={av.id}
                          type="button"
                          onClick={() => setSelectedAvatar(av)}
                          className={`p-2 rounded-2xl text-center border transition-all flex flex-col items-center gap-1 ${
                            isSelected
                              ? 'bg-[#E2F5E9] border-[#52B788] shadow-xs ring-1 ring-[#52B788]'
                              : 'bg-[#FAF8F5] border-[#EAE6DF] hover:bg-white'
                          }`}
                        >
                          <span className="text-xl">{av.emoji}</span>
                          <span className="text-[10px] font-bold text-slate-700 truncate w-full">{av.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Full Name & Nickname */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      ชื่อ - นามสกุลจริง *
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="เช่น แพรวา รัตนวรรณศิลป์"
                      className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F5] border border-[#EAE6DF] rounded-xl text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#52B788]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      ชื่อเล่น (จะแสดงในพาสปอร์ต) *
                    </label>
                    <input
                      type="text"
                      value={nickname}
                      onChange={(e) => setNickname(e.target.value)}
                      placeholder="เช่น แพรวา"
                      className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F5] border border-[#EAE6DF] rounded-xl text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#52B788]"
                      required
                    />
                  </div>
                </div>

                {/* 3. Age & Education Level */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      อายุ (ปี) *
                    </label>
                    <input
                      type="number"
                      min={12}
                      max={35}
                      value={age}
                      onChange={(e) => setAge(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F5] border border-[#EAE6DF] rounded-xl text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#52B788]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      ระดับการศึกษา *
                    </label>
                    <select
                      value={educationLevel}
                      onChange={(e) => setEducationLevel(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F5] border border-[#EAE6DF] rounded-xl text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#52B788]"
                    >
                      <option value="มัธยมศึกษาตอนต้น">มัธยมศึกษาตอนต้น (ม.1–ม.3)</option>
                      <option value="มัธยมศึกษาตอนปลาย">มัธยมศึกษาตอนปลาย (ม.4–ม.6)</option>
                      <option value="ระดับ ปวช. / อาชีวศึกษา">ระดับ ปวช. / อาชีวศึกษา</option>
                      <option value="ระดับ ปวส.">ระดับ ปวส.</option>
                      <option value="ระดับปริญญาตรี ชั้นปีที่ 1">ระดับปริญญาตรี ชั้นปีที่ 1</option>
                      <option value="ระดับปริญญาตรี ชั้นปีที่ 2">ระดับปริญญาตรี ชั้นปีที่ 2</option>
                      <option value="ระดับปริญญาตรี ชั้นปีที่ 3">ระดับปริญญาตรี ชั้นปีที่ 3</option>
                      <option value="ระดับปริญญาตรี ชั้นปีที่ 4">ระดับปริญญาตรี ชั้นปีที่ 4</option>
                      <option value="สำเร็จการศึกษาแล้ว / ผู้สนใจทั่วไป">สำเร็จการศึกษาแล้ว / ผู้สนใจทั่วไป</option>
                    </select>
                  </div>
                </div>

                {/* 4. Institution & Faculty */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      สถาบันการศึกษา / โรงเรียน *
                    </label>
                    <input
                      type="text"
                      value={institution}
                      onChange={(e) => setInstitution(e.target.value)}
                      placeholder="เช่น จุฬาฯ, มธ., สจล., รร.เตรียมอุดมฯ"
                      className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F5] border border-[#EAE6DF] rounded-xl text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#52B788]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      คณะ / สายการเรียน
                    </label>
                    <input
                      type="text"
                      value={faculty}
                      onChange={(e) => setFaculty(e.target.value)}
                      placeholder="เช่น คณะวิศวกรรมศาสตร์, คณะแพทยศาสตร์"
                      className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F5] border border-[#EAE6DF] rounded-xl text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#52B788]"
                    />
                  </div>
                </div>

                {/* 5. Email & Password */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      อีเมลสำหรับเข้าสู่ระบบ *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="yourname@domain.com"
                        className="w-full pl-9 pr-3 py-2.5 text-xs bg-[#FAF8F5] border border-[#EAE6DF] rounded-xl text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#52B788]"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      ตั้งรหัสผ่าน *
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-9 pr-9 py-2.5 text-xs bg-[#FAF8F5] border border-[#EAE6DF] rounded-xl text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#52B788]"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* 6. Career & Skill Interests */}
                <div className="pt-1">
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    สายงานและทักษะที่คุณสนใจพัฒนา (เลือกได้หลายข้อ) 🌸
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {interestOptions.map((opt) => {
                      const isSelected = selectedInterests.includes(opt.id);
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => toggleInterest(opt.id)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                            isSelected
                              ? `${opt.bg} ${opt.text} ${opt.border} ring-1 ring-current shadow-2xs`
                              : 'bg-[#FAF8F5] text-slate-600 border-[#EAE6DF] hover:bg-white'
                          }`}
                        >
                          <span>{opt.icon}</span>
                          <span>{opt.label}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 7. Youth Privacy Consent */}
                <div className="p-3.5 bg-[#FAF8F5] border border-[#EAE6DF] rounded-2xl flex items-start gap-2.5">
                  <input
                    type="checkbox"
                    id="youthPolicy"
                    checked={agreedYouthPolicy}
                    onChange={(e) => setAgreedYouthPolicy(e.target.checked)}
                    className="mt-0.5 rounded text-[#20593B] focus:ring-0 cursor-pointer"
                  />
                  <label htmlFor="youthPolicy" className="text-[11px] text-slate-600 leading-relaxed cursor-pointer">
                    <strong>การคุ้มครองเยาวชนและความเป็นส่วนตัว:</strong> ฉันรับทราบนโยบายความปลอดภัยของ GROWTH ซึ่งจะปิดบังข้อมูลเบอร์โทรศัพท์และที่อยู่จริงต่อสาธารณะ และจะแสดงเฉพาะหลักฐานทักษะที่ผ่านการตรวจรับรองเท่านั้น 🌿
                  </label>
                </div>

                {/* Submit Register Button */}
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#173C32] hover:bg-[#20593B] text-white text-xs sm:text-sm font-bold rounded-2xl shadow-xs transition-all flex items-center justify-center gap-2 mt-2 hover:scale-101"
                >
                  <span>สร้าง GROWTH Passport และเริ่มต้นใช้งาน ✨</span>
                  <ArrowRight className="w-4 h-4 text-[#E2F5E9]" />
                </button>
              </form>
            ) : (
              /* FORM 2: Sign In Form */
              <form onSubmit={handleLogin} className="space-y-4 pt-4">
                {loginError && (
                  <div className="p-3 bg-[#FFE8DF] border border-[#FFD2C2] rounded-2xl text-xs text-[#9A3412] flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{loginError}</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    อีเมลที่ลงทะเบียนไว้ *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="เช่น your.email@example.com"
                      className="w-full pl-9 pr-3 py-2.5 text-xs bg-[#FAF8F5] border border-[#EAE6DF] rounded-xl text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#52B788]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    รหัสผ่าน *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-9 py-2.5 text-xs bg-[#FAF8F5] border border-[#EAE6DF] rounded-xl text-slate-800 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#52B788]"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded text-[#20593B] focus:ring-0" />
                    <span>จดจำการเข้าสู่ระบบ</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setLoginEmail('praewa.r@student.tu.ac.th');
                      setLoginPassword('growth2026');
                    }}
                    className="text-[#2D6A4F] hover:underline font-semibold text-[11px]"
                  >
                    ลืมรหัสผ่าน?
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#173C32] hover:bg-[#20593B] text-white text-xs sm:text-sm font-bold rounded-2xl shadow-xs transition-all flex items-center justify-center gap-2 mt-4 hover:scale-101"
                >
                  <span>เข้าสู่ระบบ GROWTH 🚀</span>
                  <ArrowRight className="w-4 h-4 text-[#E2F5E9]" />
                </button>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => setAuthMode('register')}
                    className="text-xs text-slate-500 hover:text-[#173C32] font-semibold"
                  >
                    ยังไม่มีบัญชีใช่หรือไม่? <span className="text-[#2D6A4F] font-bold underline">ลงทะเบียนใช้งานใหม่ที่นี่ 🌸</span>
                  </button>
                </div>
              </form>
            )}

            {/* Bottom Footer Note */}
            <div className="pt-6 border-t border-slate-100 text-[11px] text-slate-400 text-center">
              GROWTH · ออกแบบเพื่อเยาวชนไทย ส่งเสริมการเรียนรู้ผ่านการลงมือทำจริง 🌿
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-4 text-center text-xs text-slate-400 border-t border-[#EAE6DF] bg-white/70">
        © 2026 GROWTH Platform · แพลตฟอร์มพาสปอร์ตทักษะและการเรียนรู้สำหรับเยาวชน 🌸
      </footer>
    </div>
  );
};
