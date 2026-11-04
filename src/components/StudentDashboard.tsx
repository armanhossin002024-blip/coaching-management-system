import React from 'react';
import { 
  Student, 
  PaymentTransaction, 
  RoutineSlot, 
  CourseModule, 
  Notice, 
  FreeVideoLecture, 
  Language 
} from '../types';
import { useTranslation } from '../utils/translations';
import { 
  GraduationCap, 
  Wallet, 
  Calendar, 
  BookOpen, 
  PlayCircle, 
  Bell, 
  Printer, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Clock, 
  Download 
} from 'lucide-react';

interface StudentDashboardProps {
  student: Student;
  payments: PaymentTransaction[];
  routine: RoutineSlot[];
  courses: CourseModule[];
  notices: Notice[];
  freeVideos: FreeVideoLecture[];
  language: Language;
  onOpenPaymentModal: () => void;
  onViewReceipt: (tx: PaymentTransaction) => void;
  onWatchVideo: (video: FreeVideoLecture) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  student,
  payments,
  routine,
  courses,
  notices,
  freeVideos,
  language,
  onOpenPaymentModal,
  onViewReceipt,
  onWatchVideo
}) => {
  const t = useTranslation(language);

  // Filter transactions for this student
  const studentPayments = payments.filter((p) => p.studentId === student.id || p.studentRoll === student.roll);
  
  // Filter routine for student's class
  const classRoutine = routine.filter((r) => r.classGrade === student.classGrade);

  // Filter courses for student's class
  const classCourses = courses.filter((c) => c.classGrade === student.classGrade);

  // Relevant videos
  const classVideos = freeVideos.filter((v) => v.classGrade === student.classGrade || v.classGrade === 'Class 10');

  // Relevant notices
  const studentNotices = notices.filter(
    (n) => n.targetAudience === 'All' || n.targetAudience === 'Class 9-10'
  );

  return (
    <div className="space-y-6">
      {/* Student Welcome Banner */}
      <div className="p-6 bg-slate-900 text-white rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-700 text-white flex items-center justify-center font-bold text-xl shadow-xs">
            <GraduationCap className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider bg-emerald-500 text-slate-950 rounded">
                STUDENT PORTAL
              </span>
              <span className="text-xs text-slate-400">·</span>
              <span className="text-xs text-slate-300 font-mono">Roll: {student.roll}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold mt-1 text-white">
              {language === 'bn' ? student.nameBn : student.name}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {student.classGrade} · Group: {student.group || 'Science'} · Attendance: {student.attendanceRate}%
            </p>
          </div>
        </div>

        {/* Action / Dues Pill */}
        <div className="flex items-center gap-3">
          {student.dueAmount > 0 ? (
            <button
              onClick={onOpenPaymentModal}
              className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-md transition-all animate-pulse"
            >
              <Wallet className="w-4 h-4" />
              <span>{language === 'bn' ? 'বকেয়া ফি ৳ ' : 'Pay Due ৳ '}{student.dueAmount.toLocaleString()} ({t.payNow})</span>
            </button>
          ) : (
            <div className="flex items-center gap-2 px-3.5 py-2 bg-emerald-950/80 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{language === 'bn' ? 'সকল বেতন পরিশোধিত' : 'All Fees Cleared'}</span>
            </div>
          )}
        </div>
      </div>

      {/* Automated Payment Tracking System Section */}
      <div className="p-5 sm:p-6 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <Wallet className="w-5 h-5 text-emerald-700" />
              <h3 className="text-base font-bold text-slate-900">
                {language === 'bn' ? 'অটোমেটেড পেমেন্ট ট্র্যাকিং ও মানি রিসিট' : 'Automated Payment Tracking & Receipts'}
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {language === 'bn'
                ? 'বিকাশ, নগদ বা রকেটের মাধ্যমে ফি প্রদান করুন এবং তাৎক্ষণিক মানি রিসিট প্রিন্ট করুন'
                : 'Instant clearance via bKash, Nagad, Rocket with auto-generated money receipt voucher'}
            </p>
          </div>

          <button
            onClick={onOpenPaymentModal}
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl transition-colors shrink-0"
          >
            <Wallet className="w-3.5 h-3.5" />
            <span>{t.payNow} (bKash / Nagad / Cash)</span>
          </button>
        </div>

        {/* Financial Status Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-xs text-slate-500">Monthly Tuition Rate</span>
            <div className="text-xl font-bold font-mono text-slate-900 mt-1 tabular-nums">
              ৳ {student.monthlyFee.toLocaleString()} BDT
            </div>
          </div>
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-xs text-slate-500">Current Dues</span>
            <div className={`text-xl font-bold font-mono mt-1 tabular-nums ${student.dueAmount > 0 ? 'text-rose-600' : 'text-emerald-700'}`}>
              ৳ {student.dueAmount.toLocaleString()} BDT
            </div>
          </div>
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-xs text-slate-500">Total Invoices Logged</span>
            <div className="text-xl font-bold font-mono text-slate-900 mt-1 tabular-nums">
              {studentPayments.length} Transactions
            </div>
          </div>
        </div>

        {/* Payment History List */}
        <div className="space-y-2 pt-2">
          <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            {language === 'bn' ? 'সম্প্রতি পরিশোধিত ভাউচার ও রিসিট' : 'Recent Payment Vouchers & Receipts'}
          </div>
          <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
            {studentPayments.length === 0 ? (
              <div className="p-4 text-xs text-slate-400 text-center">No payment history recorded yet</div>
            ) : (
              studentPayments.map((tx) => (
                <div
                  key={tx.id}
                  className="p-3.5 bg-white hover:bg-slate-50 flex flex-wrap items-center justify-between gap-3 text-xs transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-3 h-3 rounded-full ${
                        tx.method === 'bkash'
                          ? 'bg-pink-600'
                          : tx.method === 'nagad'
                          ? 'bg-orange-600'
                          : tx.method === 'rocket'
                          ? 'bg-purple-600'
                          : 'bg-emerald-600'
                      }`}
                    ></span>
                    <div>
                      <div className="font-bold text-slate-900 font-mono">
                        {tx.voucherNo} · {tx.feeMonth}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {tx.method.toUpperCase()} {tx.trxId && `(Trx: ${tx.trxId})`} · {tx.date}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-emerald-800 text-sm tabular-nums">
                      ৳ {tx.amount.toLocaleString()}
                    </span>
                    <button
                      onClick={() => onViewReceipt(tx)}
                      className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100/80 rounded-lg border border-emerald-200 transition-colors"
                    >
                      <Printer className="w-3 h-3" />
                      <span>{t.downloadReceipt}</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Routine & Exam Alerts Split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Class Routine */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-700" />
              <h3 className="text-sm font-bold text-slate-900">
                {language === 'bn' ? `${student.classGrade} ক্লাস রুটিন` : `${student.classGrade} Schedule`}
              </h3>
            </div>
            <span className="text-[11px] font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
              Active Routine
            </span>
          </div>

          <div className="space-y-2">
            {classRoutine.map((slot) => (
              <div
                key={slot.id}
                className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl text-xs flex justify-between items-center"
              >
                <div>
                  <div className="font-bold text-slate-900">
                    {language === 'bn' ? slot.subjectBn : slot.subject}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Mentor: {slot.teacher} · <span className="font-mono text-emerald-700 font-semibold">{slot.room}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-slate-800">{slot.day}</div>
                  <div className="text-[11px] font-mono text-slate-500">{slot.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notices & Exam Alerts */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-rose-600" />
              <h3 className="text-sm font-bold text-slate-900">{t.importantAlerts}</h3>
            </div>
            <span className="text-[11px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
              High Priority
            </span>
          </div>

          <div className="space-y-3">
            {studentNotices.map((n) => (
              <div
                key={n.id}
                className={`p-3.5 rounded-xl border text-xs space-y-1.5 ${
                  n.isImportant
                    ? 'bg-rose-50/40 border-rose-200'
                    : 'bg-slate-50 border-slate-200/80'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-rose-700 uppercase text-[10px] tracking-wider">
                    {n.category.toUpperCase()}
                  </span>
                  <span className="font-mono text-slate-400 text-[11px]">{n.date}</span>
                </div>
                <div className="font-bold text-slate-900 text-sm">
                  {language === 'bn' ? n.titleBn : n.title}
                </div>
                <p className="text-slate-600 leading-relaxed text-[11px]">
                  {language === 'bn' ? n.descriptionBn : n.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Free Video Masterclasses Recommended for This Student */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <PlayCircle className="w-5 h-5 text-emerald-700" />
              <h3 className="text-base font-bold text-slate-900">{t.watchFreeClass}</h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">{t.freeClassDesc}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {classVideos.map((vid) => (
            <div
              key={vid.id}
              onClick={() => onWatchVideo(vid)}
              className="group bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-xl overflow-hidden cursor-pointer transition-all flex flex-col justify-between"
            >
              <div className="aspect-video bg-slate-900 relative flex items-center justify-center p-4 text-center">
                <div className="w-12 h-12 rounded-full bg-emerald-600/90 text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                  <PlayCircle className="w-6 h-6 ml-0.5" />
                </div>
                <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/70 rounded text-[10px] text-white font-mono">
                  {vid.duration}
                </div>
                <div className="absolute top-2 left-2 px-2 py-0.5 bg-emerald-800/90 rounded text-[10px] text-white font-bold">
                  {vid.classGrade}
                </div>
              </div>

              <div className="p-4 space-y-2">
                <div className="text-xs font-semibold text-emerald-700">
                  {language === 'bn' ? vid.subjectBn : vid.subject}
                </div>
                <h4 className="font-bold text-slate-900 text-xs sm:text-sm line-clamp-2 leading-snug">
                  {language === 'bn' ? vid.titleBn : vid.title}
                </h4>
                <div className="text-[11px] text-slate-500 pt-1 flex items-center justify-between border-t border-slate-200/60">
                  <span>Instructor: {vid.instructor}</span>
                  <span className="text-emerald-700 font-semibold group-hover:underline">Play Now →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
