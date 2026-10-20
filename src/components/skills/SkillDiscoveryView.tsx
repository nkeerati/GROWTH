import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ASSESSMENT_QUESTIONS } from '../../data/initialData';
import {
  Compass,
  CheckCircle2,
  RotateCcw,
  ArrowRight,
  TrendingUp,
  Briefcase,
  FolderGit2,
  ShieldAlert,
  ChevronRight,
  Sparkles,
  Heart,
  Star,
} from 'lucide-react';

export const SkillDiscoveryView: React.FC = () => {
  const {
    assessmentResult,
    completeAssessment,
    setCurrentTab,
    setSelectedProjectIdForDetail,
    projects,
  } = useApp();

  const [currentStep, setCurrentStep] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isRetaking, setIsRetaking] = useState<boolean>(!assessmentResult.completed);

  const totalQuestions = ASSESSMENT_QUESTIONS.length;
  const currentQ = ASSESSMENT_QUESTIONS[currentStep];

  const handleSelectOption = (questionId: number, optionIndex: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: optionIndex,
    });
  };

  const handleNext = () => {
    if (currentStep < totalQuestions - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate final scores
      const calculatedScores: Record<string, number> = {
        marketing: 0,
        data: 0,
        design: 0,
        tech: 0,
        business: 0,
        social: 0,
      };

      Object.entries(selectedAnswers).forEach(([qIdStr, optIdx]) => {
        const qId = parseInt(qIdStr);
        const question = ASSESSMENT_QUESTIONS.find((q) => q.id === qId);
        if (question && question.options[optIdx]) {
          const optScore = question.options[optIdx].score;
          Object.entries(optScore).forEach(([cat, val]) => {
            calculatedScores[cat] = (calculatedScores[cat] || 0) + val;
          });
        }
      });

      completeAssessment(calculatedScores);
      setIsRetaking(false);
    }
  };

  const categoriesConfig: Record<string, { label: string; icon: string; color: string; max: number; badgeBg: string }> = {
    marketing: { label: 'การตลาดและสื่อดิจิทัล (Marketing)', icon: '💡', color: 'bg-[#FF9B85]', max: 10, badgeBg: 'bg-[#FFE5D9] text-[#9A3412]' },
    social: { label: 'การพัฒนาสังคมและความยั่งยืน (Social Impact)', icon: '🌱', color: 'bg-[#52B788]', max: 10, badgeBg: 'bg-[#D8F3DC] text-[#1B4332]' },
    business: { label: 'นวัตกรรมธุรกิจและการเป็นผู้ประกอบการ (Business)', icon: '🚀', color: 'bg-[#F4A261]', max: 10, badgeBg: 'bg-[#FEF3C7] text-[#B45309]' },
    data: { label: 'การวิเคราะห์ข้อมูลและสถิติ (Data Analytics)', icon: '📊', color: 'bg-[#4F75FF]', max: 10, badgeBg: 'bg-[#E0F2FE] text-[#0369A1]' },
    design: { label: 'การออกแบบประสบการณ์ผู้ใช้ (UX/UI Design)', icon: '🎨', color: 'bg-[#A78BFA]', max: 10, badgeBg: 'bg-[#EDE9FE] text-[#6D28D9]' },
    tech: { label: 'เทคโนโลยีและการสร้างระบบ (Technology)', icon: '⚡', color: 'bg-[#38BDF8]', max: 10, badgeBg: 'bg-[#E0F2FE] text-[#0284C7]' },
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Top Title Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#EFECE6]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🧭</span>
            <h1 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">
              ค้นหาทักษะและศักยภาพในตัวคุณ (Skill Discovery)
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            สำรวจความถนัด ความสนใจ และรับคำแนะนำเส้นทางอาชีพพร้อมโปรเจกต์ลงมือทำจริง ✨
          </p>
        </div>
        {assessmentResult.completed && !isRetaking && (
          <button
            onClick={() => {
              setIsRetaking(true);
              setCurrentStep(0);
              setSelectedAnswers({});
            }}
            className="flex items-center gap-1.5 px-4 py-2 border border-[#EFECE6] bg-white hover:bg-[#FAF9F6] text-xs font-bold rounded-2xl text-slate-700 transition-all self-start sm:self-auto shadow-2xs"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span>ทำแบบประเมินใหม่อีกครั้ง</span>
          </button>
        )}
      </div>

      {/* Mode 1: Taking Questionnaire */}
      {isRetaking ? (
        <div className="bg-white border border-[#EFECE6] rounded-3xl p-6 sm:p-9 shadow-xs space-y-6">
          {/* Step Progress indicator */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-700 flex items-center gap-1.5">
                <span>🌱</span>
                <span>คำถามข้อที่ {currentStep + 1} จาก {totalQuestions}</span>
              </span>
              <span className="font-mono text-slate-400 font-bold tabular-nums">
                {Math.round(((currentStep + 1) / totalQuestions) * 100)}%
              </span>
            </div>
            <div className="w-full h-2.5 bg-[#FAF9F6] border border-[#EFECE6] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#52B788] rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / totalQuestions) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Text */}
          <div className="pt-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
              {currentQ.question}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              เลือกคำตอบที่ตรงกับความรู้สึกและพฤติกรรมจริงของคุณมากที่สุด 💡
            </p>
          </div>

          {/* Options List */}
          <div className="space-y-3 pt-2">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedAnswers[currentQ.id] === idx;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(currentQ.id, idx)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all text-xs sm:text-sm flex items-start gap-3.5 ${
                    isSelected
                      ? 'border-[#2D6A4F] bg-[#D8F3DC]/40 text-[#1B4332] font-semibold shadow-2xs ring-1 ring-[#2D6A4F]'
                      : 'border-[#EFECE6] hover:border-slate-300 bg-white text-slate-700'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 text-xs transition-colors ${
                      isSelected
                        ? 'border-[#2D6A4F] bg-[#2D6A4F] text-white'
                        : 'border-slate-300 bg-white'
                    }`}
                  >
                    {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                  </div>
                  <span className="leading-relaxed">{opt.text}</span>
                </button>
              );
            })}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-100">
            <button
              onClick={() => currentStep > 0 && setCurrentStep(currentStep - 1)}
              disabled={currentStep === 0}
              className="px-4 py-2 text-xs font-semibold text-slate-400 disabled:opacity-30 disabled:pointer-events-none hover:text-slate-700 rounded-xl"
            >
              ย้อนกลับ
            </button>
            <button
              onClick={handleNext}
              disabled={selectedAnswers[currentQ.id] === undefined}
              className="px-6 py-2.5 bg-[#1B4332] hover:bg-[#2D6A4F] text-white text-xs font-bold rounded-2xl transition-all disabled:opacity-40 flex items-center gap-2 shadow-xs"
            >
              <span>{currentStep === totalQuestions - 1 ? 'ดูผลการประเมิน ✨' : 'ข้อถัดไป'}</span>
              <ArrowRight className="w-4 h-4 text-[#D8F3DC]" />
            </button>
          </div>
        </div>
      ) : (
        /* Mode 2: Results & Recommendations View */
        <div className="space-y-8">
          {/* Summary Card */}
          <div className="bg-white border border-[#EFECE6] rounded-3xl p-6 sm:p-9 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-bold text-[#1B4332] bg-[#D8F3DC] px-3.5 py-1 rounded-full w-fit mb-3 border border-[#B7E4C7]/60">
              <Sparkles className="w-3.5 h-3.5 text-[#E07A5F]" />
              <span>สรุปผลการวิเคราะห์ศักยภาพล่าสุด ({assessmentResult.completedAt})</span>
            </div>

            <h2 className="text-xl font-black text-slate-800">
              จุดเด่นของคุณคือ{' '}
              <span className="text-[#2D6A4F] underline decoration-[#B7E4C7] decoration-4 underline-offset-4">
                {assessmentResult.topCategories[0]}
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed font-normal">
              คุณมีความโดดเด่นในการคิดเชิงกลยุทธ์ การสื่อสารให้ผู้คนเข้าใจ และมีความเข้าอกเข้าใจต่อปัญหาของสังคมรอบข้าง
              นี่คือรากฐานที่ยอดเยี่ยมสำหรับการสร้างผลงานจริงในระดับมืออาชีพ 🌿
            </p>

            {/* Visual Skill Breakdown (Comparative Scaling Bars) */}
            <div className="mt-8 space-y-4">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <span>📊</span>
                <span>แผนภาพสัดส่วนคะแนนความสนใจและความถนัด (Skill Interest Distribution)</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(categoriesConfig).map(([catKey, config]) => {
                  const score = assessmentResult.scores[catKey as keyof typeof assessmentResult.scores] || 0;
                  const pct = Math.min(100, Math.round((score / config.max) * 100));
                  return (
                    <div key={catKey} className="p-4 bg-[#FAF9F6] border border-[#EFECE6] rounded-2xl space-y-2.5 hover:border-slate-300 transition-colors">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-slate-800 flex items-center gap-1.5 truncate pr-2">
                          <span>{config.icon}</span>
                          <span>{config.label.split(' ')[0]}</span>
                        </span>
                        <span className="font-mono tabular-nums font-bold text-slate-700 text-xs">
                          {score}/{config.max}
                        </span>
                      </div>
                      <div className="w-full h-2.5 bg-white border border-[#EFECE6] rounded-full overflow-hidden">
                        <div
                          className={`h-full ${config.color} rounded-full transition-all duration-700`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Disclaimer */}
            <div className="mt-6 p-4 bg-[#FAF9F6] rounded-2xl border border-[#EFECE6] flex items-start gap-2.5 text-xs text-slate-500 leading-relaxed">
              <ShieldAlert className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
              <span>
                <strong>ข้อจำกัดความรับผิดชอบ:</strong>{' '}
                แบบประเมินนี้เป็นเพียงเครื่องมือเพื่อช่วยให้เยาวชนค้นหาความสนใจเบื้องต้น (Self-Discovery Guide)
                ไม่ใช่การทดสอบทางจิตวิทยาคลินิกหรือการรับรองความสามารถอย่างเป็นทางการ
                ทักษะที่แท้จริงจะถูกพิสูจน์จากการลงมือทำโปรเจกต์และมีหลักฐานชิ้นงานจริงเท่านั้น
              </span>
            </div>
          </div>

          {/* Recommended Career Pathways */}
          <div className="bg-white border border-[#EFECE6] rounded-3xl p-6 sm:p-9 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
              <span>🚀</span>
              <span>เส้นทางอาชีพและบทบาทที่สอดคล้องกับคุณ</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {assessmentResult.recommendedCareers.map((career, idx) => (
                <div
                  key={idx}
                  className="p-5 bg-gradient-to-br from-[#FAF9F6] to-white border border-[#EFECE6] rounded-2xl space-y-2 hover:border-[#B7E4C7] transition-all shadow-2xs"
                >
                  <div className="text-[11px] text-[#4F75FF] font-bold">แนะนำอันดับที่ {idx + 1} ✨</div>
                  <div className="text-sm font-bold text-slate-900">{career}</div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    เน้นทักษะการทำงานร่วมกับผู้คน การวิเคราะห์โจทย์ และการสื่อสารคุณค่าของสินค้าหรือโครงการ
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Projects to Start Immediately */}
          <div className="bg-white border border-[#EFECE6] rounded-3xl p-6 sm:p-9 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                <span>🌱</span>
                <span>โปรเจกต์แนะนำเพื่อเริ่มสะสมทักษะ</span>
              </h3>
              <button
                onClick={() => setCurrentTab('projects')}
                className="text-xs font-bold text-[#2D6A4F] hover:underline"
              >
                ดูโปรเจกต์ทั้งหมด →
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {projects.slice(0, 2).map((proj) => (
                <div
                  key={proj.id}
                  className="p-5 border border-[#EFECE6] rounded-2xl hover:border-emerald-200 transition-colors flex flex-col justify-between bg-white shadow-2xs"
                >
                  <div className="space-y-2">
                    <span className="text-[11px] text-slate-400 font-medium">{proj.orgName}</span>
                    <h4 className="text-sm font-bold text-slate-900">{proj.title}</h4>
                    <p className="text-xs text-slate-500 line-clamp-2">{proj.description}</p>
                  </div>
                  <div className="pt-4 flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium">ทักษะ: {proj.skillsGained[0]}</span>
                    <button
                      onClick={() => {
                        setSelectedProjectIdForDetail(proj.id);
                        setCurrentTab('projects');
                      }}
                      className="px-3.5 py-1.5 bg-[#D8F3DC] hover:bg-[#c2ebd1] text-[#1B4332] rounded-xl font-bold transition-colors border border-[#B7E4C7]/60"
                    >
                      ลงมือทำทันที
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
