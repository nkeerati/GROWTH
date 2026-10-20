import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  CheckCircle,
  AlertCircle,
  Award,
  ExternalLink,
  ShieldCheck,
  Star,
  Sparkles,
} from 'lucide-react';

export const AssessorModal: React.FC = () => {
  const {
    selectedSubmissionForReview,
    setSelectedSubmissionForReview,
    evaluateSubmission,
  } = useApp();

  const [feedback, setFeedback] = useState(
    'ผลงานแสดงให้เห็นถึงการลงมือทำจริง มีการเก็บข้อมูลจากพื้นที่และนำเสนออย่างเป็นระบบ สามารถเป็นหลักฐานทักษะที่พิสูจน์ได้เป็นอย่างดี ✨'
  );
  const [assessorName, setAssessorName] = useState('ดร.วรัญญา สิงหราช (ที่ปรึกษาอาวุโส วิสาหกิจชุมชน)');
  const [scores, setScores] = useState({
    practicalExecution: 5,
    problemSolving: 4,
    reflectionQuality: 5,
  });

  if (!selectedSubmissionForReview) return null;

  const sub = selectedSubmissionForReview;

  const handleApprove = () => {
    evaluateSubmission(sub.id, 'approved', feedback, scores, assessorName);
    setSelectedSubmissionForReview(null);
  };

  const handleRequestRevision = () => {
    evaluateSubmission(sub.id, 'revision_requested', feedback, scores, assessorName);
    setSelectedSubmissionForReview(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-[#EFECE6] overflow-hidden my-8">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#173C32] text-white">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">🎯</span>
            <div>
              <h3 className="text-sm font-bold">แผงประเมินผลงานสำหรับผู้ทรงคุณวุฒิ (Assessor Evaluation)</h3>
              <p className="text-[11px] text-[#D8F3DC]">ระบบตรวจสอบหลักฐานเพื่อยืนยันลงใน GROWTH Passport ✨</p>
            </div>
          </div>
          <button
            onClick={() => setSelectedSubmissionForReview(null)}
            className="p-1 text-[#D8F3DC] hover:text-white rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-7 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Submission Info */}
          <div className="bg-[#FAF9F6] border border-[#EFECE6] rounded-2xl p-4">
            <div className="text-xs text-slate-400 font-medium">โปรเจกต์ต้นทาง</div>
            <div className="text-sm font-bold text-slate-900 mt-0.5">{sub.projectTitle}</div>
            <div className="text-xs text-slate-500 mt-0.5">{sub.orgName}</div>

            <div className="mt-3 pt-3 border-t border-slate-200/60 flex flex-wrap gap-y-2 justify-between items-center text-xs">
              <div>
                <span className="text-slate-400 font-medium">ชื่องานที่ส่ง: </span>
                <span className="font-bold text-slate-800">{sub.deliverableTitle}</span>
              </div>
              <a
                href={sub.deliverableUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-[#4F75FF] hover:underline font-bold"
              >
                <span>เปิดดูหลักฐานชิ้นงาน</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Student Reflection */}
          <div>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <span>💬</span>
              <span>บันทึกการเรียนรู้และการสะท้อนคิดของผู้เรียน (Student Reflection)</span>
            </h4>
            <div className="p-4 bg-[#FEF9C3]/50 border border-[#FDE047]/60 rounded-2xl text-xs text-slate-700 leading-relaxed italic">
              "{sub.reflectionText}"
            </div>
          </div>

          {/* Demonstrated Skills Tagging */}
          <div>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <span>🌱</span>
              <span>ทักษะที่เกี่ยวข้องในการประเมินครั้งนี้</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {sub.skillsDemonstrated.map((sk, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#D8F3DC] border border-[#B7E4C7] rounded-xl text-xs font-bold text-[#1B4332]"
                >
                  <Award className="w-3.5 h-3.5 text-[#2D6A4F]" />
                  <span>{sk}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Rubric Evaluation Matrix */}
          <div>
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <span>⭐</span>
              <span>เกณฑ์การประเมินรูบริก (Rubric Scoring 1 - 5)</span>
            </h4>
            <div className="space-y-3.5 bg-[#FAF9F6] border border-[#EFECE6] rounded-2xl p-4">
              {/* Criteria 1 */}
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-800 mb-1.5">
                  <span>1. การลงมือปฏิบัติจริงและความสมบูรณ์ของชิ้นงาน</span>
                  <span className="font-mono text-[#2D6A4F]">{scores.practicalExecution} / 5 ⭐</span>
                </div>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setScores({ ...scores, practicalExecution: val })}
                      className={`flex-1 py-1.5 text-xs font-bold rounded-xl border transition-all ${
                        scores.practicalExecution >= val
                          ? 'bg-[#1B4332] text-white border-[#1B4332] shadow-2xs'
                          : 'bg-white text-slate-600 border-[#EFECE6] hover:bg-[#F3F1EC]'
                      }`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>

              {/* Criteria 2 */}
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-800 mb-1.5">
                  <span>2. การวิเคราะห์และแก้ปัญหาที่สอดคล้องกับโจทย์</span>
                  <span className="font-mono text-[#2D6A4F]">{scores.problemSolving} / 5 ⭐</span>
                </div>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setScores({ ...scores, problemSolving: val })}
                      className={`flex-1 py-1.5 text-xs font-bold rounded-xl border transition-all ${
                        scores.problemSolving >= val
                          ? 'bg-[#1B4332] text-white border-[#1B4332] shadow-2xs'
                          : 'bg-white text-slate-600 border-[#EFECE6] hover:bg-[#F3F1EC]'
                      }`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>

              {/* Criteria 3 */}
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-800 mb-1.5">
                  <span>3. คุณภาพของการสะท้อนคิดและการต่อยอดทักษะ</span>
                  <span className="font-mono text-[#2D6A4F]">{scores.reflectionQuality} / 5 ⭐</span>
                </div>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setScores({ ...scores, reflectionQuality: val })}
                      className={`flex-1 py-1.5 text-xs font-bold rounded-xl border transition-all ${
                        scores.reflectionQuality >= val
                          ? 'bg-[#1B4332] text-white border-[#1B4332] shadow-2xs'
                          : 'bg-white text-slate-600 border-[#EFECE6] hover:bg-[#F3F1EC]'
                      }`}
                    >
                      {val}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Feedback Input */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              ข้อเสนอแนะเชิงพัฒนาสำหรับผู้เรียน (Constructive Feedback) ✨
            </label>
            <textarea
              rows={3}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full p-3.5 text-xs bg-[#FAF9F6] border border-[#EFECE6] rounded-2xl focus:outline-none focus:ring-1 focus:ring-[#2D6A4F] text-slate-800"
              placeholder="ระบุข้อดีและข้อแนะนำเพิ่มเติมเพื่อการเติบโต..."
            />
          </div>

          {/* Assessor Signature */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1">
              ชื่อและตำแหน่งผู้ประเมิน 🌸
            </label>
            <input
              type="text"
              value={assessorName}
              onChange={(e) => setAssessorName(e.target.value)}
              className="w-full px-3.5 py-2 text-xs bg-[#FAF9F6] border border-[#EFECE6] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#2D6A4F] text-slate-800"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 bg-[#FAF9F6] border-t border-[#EFECE6]">
          <button
            onClick={() => setSelectedSubmissionForReview(null)}
            className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors"
          >
            ยกเลิก
          </button>
          <button
            onClick={handleRequestRevision}
            className="px-4 py-2 text-xs font-bold text-amber-800 bg-[#FEF3C7] hover:bg-[#FDE68A] border border-[#FDE68A] rounded-xl transition-all flex items-center gap-1.5"
          >
            <AlertCircle className="w-4 h-4" />
            <span>ส่งกลับเพื่อปรับปรุง</span>
          </button>
          <button
            onClick={handleApprove}
            className="px-5 py-2.5 text-xs font-bold text-white bg-[#1B4332] hover:bg-[#2D6A4F] rounded-2xl transition-all flex items-center gap-1.5 shadow-2xs"
          >
            <CheckCircle className="w-4 h-4 text-[#D8F3DC]" />
            <span>อนุมัติหลักฐานและยืนยันในพาสปอร์ต ✨</span>
          </button>
        </div>
      </div>
    </div>
  );
};
