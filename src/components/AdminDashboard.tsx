import React, { useState } from 'react';
import { 
  Student, 
  Teacher, 
  PaymentTransaction, 
  Notice, 
  RoutineSlot, 
  Language, 
  CourseModule 
} from '../types';
import { useTranslation } from '../utils/translations';
import { 
  Users, 
  GraduationCap, 
  Wallet, 
  Clock, 
  Calendar, 
  Bell, 
  Plus, 
  Search, 
  Filter, 
  Printer, 
  CheckCircle2, 
  AlertTriangle, 
  FileText,
  DollarSign
} from 'lucide-react';

interface AdminDashboardProps {
  students: Student[];
  teachers: Teacher[];
  payments: PaymentTransaction[];
  notices: Notice[];
  routine: RoutineSlot[];
  courses: CourseModule[];
  language: Language;
  onViewReceipt: (tx: PaymentTransaction) => void;
  onAddNotice: (notice: Notice) => void;
  onRecordCashPayment: (tx: PaymentTransaction) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  students,
  teachers,
  payments,
  notices,
  routine,
  courses,
  language,
  onViewReceipt,
  onAddNotice,
  onRecordCashPayment
}) => {
  const t = useTranslation(language);
  const [activeAdminTab, setActiveAdminTab] = useState<'payments' | 'students' | 'routine' | 'notices' | 'teachers'>('payments');
  const [paymentFilter, setPaymentFilter] = useState<'all' | 'paid' | 'pending' | 'overdue'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [classFilter, setClassFilter] = useState<string>('all');

  // Manual Payment Recording Modal State
  const [isCashModalOpen, setIsCashModalOpen] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(students[0]?.id || '');
  const [cashMonth, setCashMonth] = useState('November 2026');
  const [cashAmount, setCashAmount] = useState('2500');

  // Notice Creation Modal State
  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeTitleBn, setNoticeTitleBn] = useState('');
  const [noticeDesc, setNoticeDesc] = useState('');
  const [noticeCategory, setNoticeCategory] = useState<'exam' | 'urgent' | 'general' | 'routine'>('exam');
  const [noticeAudience, setNoticeAudience] = useState<'All' | 'Class 6-8' | 'Class 9-10' | 'Class 11-12' | 'Teachers'>('All');

  // Calculated Metrics
  const totalCollected = payments
    .filter((p) => p.status === 'paid')
    .reduce((sum, p) => sum + p.amount, 0);

  const totalDues = students.reduce((sum, s) => sum + s.dueAmount, 0);

  // Filtered Payments
  const filteredPayments = payments.filter((tx) => {
    const matchesStatus = paymentFilter === 'all' || tx.status === paymentFilter;
    const matchesSearch =
      tx.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.studentRoll.includes(searchQuery) ||
      tx.voucherNo.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Filtered Students
  const filteredStudents = students.filter((std) => {
    const matchesClass = classFilter === 'all' || std.classGrade === classFilter;
    const matchesSearch =
      std.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      std.roll.includes(searchQuery);
    return matchesClass && matchesSearch;
  });

  const handleCashPaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const student = students.find((s) => s.id === selectedStudentId);
    if (!student) return;

    const voucherId = `ARA-2026-CSH${Math.floor(1000 + Math.random() * 9000)}`;
    const newTx: PaymentTransaction = {
      id: `tx_${Date.now()}`,
      voucherNo: voucherId,
      studentId: student.id,
      studentName: student.name,
      studentRoll: student.roll,
      classGrade: student.classGrade,
      feeMonth: cashMonth,
      feeType: 'Tuition Fee',
      amount: parseInt(cashAmount, 10) || student.monthlyFee,
      method: 'cash',
      trxId: `CSH-${Date.now().toString().slice(-6)}`,
      date: new Date().toLocaleString(),
      status: 'paid',
      receivedBy: 'Principal Abdur Rohoman (Admin Desk)'
    };

    onRecordCashPayment(newTx);
    setIsCashModalOpen(false);
  };

  const handleNoticeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noticeTitle.trim()) return;

    const newNotice: Notice = {
      id: `ntc_${Date.now()}`,
      title: noticeTitle,
      titleBn: noticeTitleBn || noticeTitle,
      description: noticeDesc,
      descriptionBn: noticeDesc,
      date: new Date().toISOString().split('T')[0],
      category: noticeCategory,
      targetAudience: noticeAudience,
      isImportant: noticeCategory === 'exam' || noticeCategory === 'urgent'
    };

    onAddNotice(newNotice);
    setNoticeTitle('');
    setNoticeTitleBn('');
    setNoticeDesc('');
    setIsNoticeModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-slate-900 text-white rounded-2xl shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider bg-emerald-500 text-slate-950 rounded">
              ADMIN CONTROL PANEL
            </span>
            <span className="text-xs text-slate-400">·</span>
            <span className="text-xs text-slate-300">Abdur Rohoman Academy</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold mt-1 text-white">
            {language === 'bn' ? 'প্রশাসনিক ব্যবস্থাপনা ও অর্থ ট্র্যাকিং' : 'Academy Management & Finance Operations'}
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {language === 'bn' 
              ? '৬ষ্ঠ থেকে ১২শ শ্রেণির শিক্ষার্থী, বেতন হিসাব, রুটিন ও নোটিশ মনিটরিং'
              : 'Managing enrollments, payment tracking, routines, and exams for Class 6-12'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setIsCashModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-xs transition-colors"
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>{t.collectFeeManual}</span>
          </button>
          <button
            onClick={() => setIsNoticeModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-900 bg-white hover:bg-slate-100 rounded-xl shadow-xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5 text-slate-700" />
            <span>{t.postNewNotice}</span>
          </button>
        </div>
      </div>

      {/* KPI Stat Cards (4 columns) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Students */}
        <div className="p-4 bg-white rounded-xl border border-slate-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">{t.totalStudents}</span>
            <GraduationCap className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2 font-mono tabular-nums">
            {students.length}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Class 6 to 12 Roster</div>
        </div>

        {/* Faculty */}
        <div className="p-4 bg-white rounded-xl border border-slate-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">{t.activeTeachers}</span>
            <Users className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="text-2xl font-black text-slate-900 mt-2 font-mono tabular-nums">
            {teachers.length}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Specialist Mentors</div>
        </div>

        {/* Total Collected */}
        <div className="p-4 bg-white rounded-xl border border-slate-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">{t.monthlyCollection}</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
          </div>
          <div className="text-2xl font-black text-emerald-700 mt-2 font-mono tabular-nums">
            ৳ {totalCollected.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">bKash, Nagad & Cash</div>
        </div>

        {/* Outstanding Dues */}
        <div className="p-4 bg-white rounded-xl border border-slate-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">{t.dueFees}</span>
            <AlertTriangle className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-2xl font-black text-rose-600 mt-2 font-mono tabular-nums">
            ৳ {totalDues.toLocaleString()}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Pending Clearance</div>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="border-b border-slate-200 flex items-center gap-2 overflow-x-auto">
        <button
          onClick={() => setActiveAdminTab('payments')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition-colors whitespace-nowrap ${
            activeAdminTab === 'payments'
              ? 'border-emerald-700 text-emerald-800'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Wallet className="w-4 h-4" />
          <span>{t.paymentTracking}</span>
        </button>
        <button
          onClick={() => setActiveAdminTab('students')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition-colors whitespace-nowrap ${
            activeAdminTab === 'students'
              ? 'border-emerald-700 text-emerald-800'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>{t.totalStudents} (Class 6-12)</span>
        </button>
        <button
          onClick={() => setActiveAdminTab('routine')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition-colors whitespace-nowrap ${
            activeAdminTab === 'routine'
              ? 'border-emerald-700 text-emerald-800'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>{t.classRoutine}</span>
        </button>
        <button
          onClick={() => setActiveAdminTab('notices')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition-colors whitespace-nowrap ${
            activeAdminTab === 'notices'
              ? 'border-emerald-700 text-emerald-800'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Bell className="w-4 h-4" />
          <span>{t.notices}</span>
        </button>
        <button
          onClick={() => setActiveAdminTab('teachers')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition-colors whitespace-nowrap ${
            activeAdminTab === 'teachers'
              ? 'border-emerald-700 text-emerald-800'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>{t.activeTeachers}</span>
        </button>
      </div>

      {/* Tab 1: Automated Payment Tracking & Financial Ledger */}
      {activeAdminTab === 'payments' && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="p-4 sm:p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-slate-900">{t.allPayments}</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {language === 'bn' 
                  ? 'সকল শিক্ষার্থীর বিকাশ, নগদ, রকেট ও ক্যাশ পেমেন্ট বিবরণী এবং ডিজিটাল মানি রিসিট'
                  : 'Complete ledger of student tuition transactions with voucher IDs and verification'}
              </p>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.search}
                  className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-600"
                />
              </div>
              <div className="flex items-center bg-slate-100 p-1 rounded-lg text-xs font-medium">
                {(['all', 'paid', 'pending', 'overdue'] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => setPaymentFilter(st)}
                    className={`px-2.5 py-1 rounded-md transition-all capitalize ${
                      paymentFilter === st
                        ? 'bg-white text-slate-900 font-bold shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {st === 'all' ? (language === 'bn' ? 'সবগুলো' : 'All') : st}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-semibold">
                <tr>
                  <th className="py-3 px-4">{t.voucherNo}</th>
                  <th className="py-3 px-4">{language === 'bn' ? 'শিক্ষার্থী ও শ্রেণি' : 'Student & Class'}</th>
                  <th className="py-3 px-4">{t.month}</th>
                  <th className="py-3 px-4">{t.selectMethod}</th>
                  <th className="py-3 px-4">{t.amount}</th>
                  <th className="py-3 px-4">{t.status}</th>
                  <th className="py-3 px-4 text-right">{language === 'bn' ? 'রিসিট অ্যাকশন' : 'Receipt'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredPayments.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-slate-800">{tx.voucherNo}</td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900">{tx.studentName}</div>
                      <div className="text-[11px] text-slate-500">
                        {tx.classGrade} · Roll: {tx.studentRoll}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-600">{tx.feeMonth}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5 uppercase font-medium">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            tx.method === 'bkash'
                              ? 'bg-pink-600'
                              : tx.method === 'nagad'
                              ? 'bg-orange-600'
                              : tx.method === 'rocket'
                              ? 'bg-purple-600'
                              : 'bg-emerald-600'
                          }`}
                        ></span>
                        <span className="font-semibold text-slate-800">{tx.method}</span>
                      </div>
                      {tx.trxId && (
                        <div className="text-[10px] text-slate-400 font-mono">{tx.trxId}</div>
                      )}
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-slate-900 tabular-nums">
                      ৳ {tx.amount.toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold ${
                          tx.status === 'paid'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : tx.status === 'pending'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}
                      >
                        {tx.status === 'paid' ? t.paid : tx.status === 'pending' ? t.pending : t.overdue}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      {tx.status === 'paid' ? (
                        <button
                          onClick={() => onViewReceipt(tx)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100/80 rounded-lg transition-colors"
                        >
                          <Printer className="w-3 h-3" />
                          <span>{t.downloadReceipt}</span>
                        </button>
                      ) : (
                        <span className="text-[11px] text-slate-400 italic">Unpaid</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Students Roster */}
      {activeAdminTab === 'students' && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="p-4 sm:p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-slate-900">{language === 'bn' ? 'শিক্ষার্থী তালিকা (৬ষ্ঠ - ১২শ শ্রেণি)' : 'Student Roster (Class 6-12)'}</h3>
              <p className="text-xs text-slate-500 mt-0.5">Directory of all active coaching pupils</p>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={classFilter}
                onChange={(e) => setClassFilter(e.target.value)}
                className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg"
              >
                <option value="all">{t.allClasses}</option>
                {['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12'].map((cls) => (
                  <option key={cls} value={cls}>{cls}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-semibold">
                <tr>
                  <th className="py-3 px-4">Roll</th>
                  <th className="py-3 px-4">{language === 'bn' ? 'শিক্ষার্থীর নাম' : 'Name'}</th>
                  <th className="py-3 px-4">Class & Group</th>
                  <th className="py-3 px-4">Phone / Guardian</th>
                  <th className="py-3 px-4">Monthly Fee</th>
                  <th className="py-3 px-4">Dues Status</th>
                  <th className="py-3 px-4">Attendance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredStudents.map((std) => (
                  <tr key={std.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4 font-mono font-bold text-slate-800">{std.roll}</td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900">{language === 'bn' ? std.nameBn : std.name}</div>
                      <div className="text-[11px] text-slate-400">{std.id}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-semibold text-slate-800">{std.classGrade}</span>
                      {std.group && <span className="text-slate-400 text-[11px]"> ({std.group})</span>}
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-600">
                      <div>{std.phone}</div>
                      <div className="text-[10px] text-slate-400">G: {std.guardianPhone}</div>
                    </td>
                    <td className="py-3 px-4 font-mono font-bold tabular-nums">
                      ৳ {std.monthlyFee.toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      {std.dueAmount === 0 ? (
                        <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          Cleared
                        </span>
                      ) : (
                        <span className="text-rose-700 font-bold bg-rose-50 px-2 py-0.5 rounded border border-rose-200 font-mono tabular-nums">
                          Due: ৳ {std.dueAmount.toLocaleString()}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 font-mono font-semibold text-slate-700">
                      {std.attendanceRate}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Class Routine Table */}
      {activeAdminTab === 'routine' && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="p-4 sm:p-5 border-b border-slate-200">
            <h3 className="text-base font-bold text-slate-900">{t.classRoutine} (Weekly Schedule)</h3>
            <p className="text-xs text-slate-500 mt-0.5">Saturday to Thursday master coaching schedule</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-semibold">
                <tr>
                  <th className="py-3 px-4">{t.day}</th>
                  <th className="py-3 px-4">{t.time}</th>
                  <th className="py-3 px-4">Class</th>
                  <th className="py-3 px-4">{t.subject}</th>
                  <th className="py-3 px-4">{t.teacher}</th>
                  <th className="py-3 px-4">{t.room}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {routine.map((rt) => (
                  <tr key={rt.id} className="hover:bg-slate-50/80">
                    <td className="py-3 px-4 font-bold text-slate-800">{rt.day}</td>
                    <td className="py-3 px-4 font-mono text-emerald-800 font-medium">{rt.time}</td>
                    <td className="py-3 px-4 font-semibold text-slate-900">{rt.classGrade}</td>
                    <td className="py-3 px-4 font-bold text-slate-800">
                      {language === 'bn' ? rt.subjectBn : rt.subject}
                    </td>
                    <td className="py-3 px-4 text-slate-600">{rt.teacher}</td>
                    <td className="py-3 px-4 font-mono text-slate-500">{rt.room}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 4: Notices Manager */}
      {activeAdminTab === 'notices' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">{t.notices}</h3>
            <button
              onClick={() => setIsNoticeModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{t.postNewNotice}</span>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {notices.map((ntc) => (
              <div key={ntc.id} className="p-4 bg-white rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-emerald-700">{ntc.targetAudience}</span>
                  <span className="text-slate-400 font-mono">{ntc.date}</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900">
                  {language === 'bn' ? ntc.titleBn : ntc.title}
                </h4>
                <p className="text-xs text-slate-600">
                  {language === 'bn' ? ntc.descriptionBn : ntc.description}
                </p>
                <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  Category: {ntc.category}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Teachers Directory */}
      {activeAdminTab === 'teachers' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {teachers.map((tch) => (
            <div key={tch.id} className="p-5 bg-white rounded-xl border border-slate-200 space-y-2">
              <div className="font-bold text-slate-900 text-base">
                {language === 'bn' ? tch.nameBn : tch.name}
              </div>
              <div className="text-xs text-emerald-700 font-semibold">
                {language === 'bn' ? tch.designationBn : tch.designation}
              </div>
              <div className="text-xs text-slate-600">{tch.specialty}</div>
              <div className="pt-2 text-xs text-slate-500 border-t border-slate-100 flex justify-between">
                <span>Classes: {tch.assignedClasses.join(', ')}</span>
                <span className="font-mono">{tch.totalWeeklyClasses} classes/wk</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Manual Cash Fee Modal */}
      {isCashModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-900 mb-3">{t.collectFeeManual}</h3>
            <form onSubmit={handleCashPaymentSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Select Student</label>
                <select
                  value={selectedStudentId}
                  onChange={(e) => setSelectedStudentId(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                >
                  {students.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.roll} - {s.name} ({s.classGrade}) - Due: ৳{s.dueAmount}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">{t.month}</label>
                <input
                  type="text"
                  value={cashMonth}
                  onChange={(e) => setCashMonth(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">{t.amount} (BDT)</label>
                <input
                  type="number"
                  value={cashAmount}
                  onChange={(e) => setCashAmount(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs font-mono"
                />
              </div>
              <div className="pt-3 flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setIsCashModalOpen(false)}
                  className="px-3 py-2 text-slate-600 bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 font-bold text-white bg-emerald-700 rounded-lg"
                >
                  Confirm & Issue Receipt
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Notice Publisher Modal */}
      {isNoticeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-900 mb-3">{t.postNewNotice}</h3>
            <form onSubmit={handleNoticeSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Title (English)</label>
                <input
                  type="text"
                  required
                  value={noticeTitle}
                  onChange={(e) => setNoticeTitle(e.target.value)}
                  placeholder="e.g. Model Test Routine 2026"
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Title (বাংলা)</label>
                <input
                  type="text"
                  value={noticeTitleBn}
                  onChange={(e) => setNoticeTitleBn(e.target.value)}
                  placeholder="যেমন: মডেল টেস্ট রুটিন ২০২৬"
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={noticeDesc}
                  onChange={(e) => setNoticeDesc(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={noticeCategory}
                    onChange={(e) => setNoticeCategory(e.target.value as any)}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                  >
                    <option value="exam">Exam Alert</option>
                    <option value="urgent">Urgent</option>
                    <option value="routine">Routine</option>
                    <option value="general">General</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Audience</label>
                  <select
                    value={noticeAudience}
                    onChange={(e) => setNoticeAudience(e.target.value as any)}
                    className="w-full p-2 bg-slate-50 border border-slate-300 rounded-lg text-xs"
                  >
                    <option value="All">All Students</option>
                    <option value="Class 9-10">Class 9-10</option>
                    <option value="Class 11-12">Class 11-12</option>
                    <option value="Class 6-8">Class 6-8</option>
                  </select>
                </div>
              </div>
              <div className="pt-3 flex gap-2 justify-end">
                <button
                  type="button"
                  onClick={() => setIsNoticeModalOpen(false)}
                  className="px-3 py-2 text-slate-600 bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 font-bold text-white bg-emerald-700 rounded-lg"
                >
                  Publish Notice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
