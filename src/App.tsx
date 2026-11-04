/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Role, 
  Language, 
  Student, 
  Teacher, 
  CourseModule, 
  RoutineSlot, 
  PaymentTransaction, 
  Notice, 
  FreeVideoLecture 
} from './types';
import { 
  initialStudents, 
  initialTeachers, 
  initialCourseModules, 
  initialRoutine, 
  initialPayments, 
  initialNotices, 
  initialFreeVideos 
} from './data/mockData';
import { Navbar } from './components/Navbar';
import { AuthModal } from './components/AuthModal';
import { PaymentModal } from './components/PaymentModal';
import { PaymentReceiptModal } from './components/PaymentReceiptModal';
import { VideoPlayerModal } from './components/VideoPlayerModal';
import { AdminDashboard } from './components/AdminDashboard';
import { TeacherDashboard } from './components/TeacherDashboard';
import { StudentDashboard } from './components/StudentDashboard';
import { PublicLanding } from './components/PublicLanding';
import { useTranslation } from './utils/translations';
import { ShieldCheck, UserCheck, GraduationCap, X, ChevronRight } from 'lucide-react';

export default function App() {
  // Global Language state (bilingual English / Bengali)
  const [language, setLanguage] = useState<Language>('bn');

  // Role and Auth state
  const [activeRole, setActiveRole] = useState<Role>(null);
  const [currentUser, setCurrentUser] = useState<{ id: string; name: string; roll?: string; classGrade?: string } | null>(null);

  // Active navigation tab
  const [activeTab, setActiveTab] = useState<string>('home');

  // Modals state
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authDefaultRole, setAuthDefaultRole] = useState<Role>('student');
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [activeReceiptTx, setActiveReceiptTx] = useState<PaymentTransaction | null>(null);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState<FreeVideoLecture | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Core Data Stores with LocalStorage caching
  const [students, setStudents] = useState<Student[]>(() => {
    const saved = localStorage.getItem('ara_students');
    return saved ? JSON.parse(saved) : initialStudents;
  });

  const [teachers] = useState<Teacher[]>(initialTeachers);

  const [payments, setPayments] = useState<PaymentTransaction[]>(() => {
    const saved = localStorage.getItem('ara_payments');
    return saved ? JSON.parse(saved) : initialPayments;
  });

  const [courses, setCourses] = useState<CourseModule[]>(() => {
    const saved = localStorage.getItem('ara_courses');
    return saved ? JSON.parse(saved) : initialCourseModules;
  });

  const [routine] = useState<RoutineSlot[]>(initialRoutine);

  const [notices, setNotices] = useState<Notice[]>(() => {
    const saved = localStorage.getItem('ara_notices');
    return saved ? JSON.parse(saved) : initialNotices;
  });

  const [freeVideos] = useState<FreeVideoLecture[]>(initialFreeVideos);

  // Sync to LocalStorage on updates
  useEffect(() => {
    localStorage.setItem('ara_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('ara_payments', JSON.stringify(payments));
  }, [payments]);

  useEffect(() => {
    localStorage.setItem('ara_courses', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('ara_notices', JSON.stringify(notices));
  }, [notices]);

  const t = useTranslation(language);

  // Active student object (for Student role)
  const currentStudent = students.find((s) => s.id === currentUser?.id || s.roll === currentUser?.roll) || students[0];
  // Active teacher object (for Teacher role)
  const currentTeacher = teachers.find((t) => t.id === currentUser?.id) || teachers[0];

  // Auth Handlers
  const handleOpenAuth = (role: Role = 'student') => {
    setAuthDefaultRole(role);
    setIsAuthModalOpen(true);
  };

  const handleLogin = (role: Role, userMeta: { id: string; name: string; roll?: string; classGrade?: string }) => {
    setActiveRole(role);
    setCurrentUser(userMeta);
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    setActiveRole(null);
    setCurrentUser(null);
    setActiveTab('home');
  };

  // Payment Handlers
  const handlePaymentSuccess = (newTx: PaymentTransaction) => {
    setPayments((prev) => [newTx, ...prev]);

    // Update student's dues to 0
    setStudents((prev) =>
      prev.map((s) => (s.id === newTx.studentId ? { ...s, dueAmount: Math.max(0, s.dueAmount - newTx.amount) } : s))
    );

    setIsPaymentModalOpen(false);
    // Show official money receipt right away
    setActiveReceiptTx(newTx);
    setIsReceiptModalOpen(true);
  };

  const handleViewReceipt = (tx: PaymentTransaction) => {
    setActiveReceiptTx(tx);
    setIsReceiptModalOpen(true);
  };

  // Video Watch Handler
  const handleWatchVideo = (video: FreeVideoLecture) => {
    setActiveVideo(video);
    setIsVideoModalOpen(true);
  };

  // Course Chapter status update
  const handleUpdateChapterStatus = (
    courseId: string,
    chapterNo: number,
    status: 'completed' | 'ongoing' | 'upcoming'
  ) => {
    setCourses((prev) =>
      prev.map((c) => {
        if (c.id === courseId) {
          const updatedChapters = c.chapters.map((ch) =>
            ch.chapterNo === chapterNo ? { ...ch, status } : ch
          );
          const completedCount = updatedChapters.filter((ch) => ch.status === 'completed').length;
          return {
            ...c,
            chapters: updatedChapters,
            completedChapters: completedCount
          };
        }
        return c;
      })
    );
  };

  // Add Notice Handler
  const handleAddNotice = (notice: Notice) => {
    setNotices((prev) => [notice, ...prev]);
  };

  // Record Cash Payment from Admin
  const handleRecordCashPayment = (tx: PaymentTransaction) => {
    setPayments((prev) => [tx, ...prev]);
    setStudents((prev) =>
      prev.map((s) => (s.id === tx.studentId ? { ...s, dueAmount: Math.max(0, s.dueAmount - tx.amount) } : s))
    );
    setActiveReceiptTx(tx);
    setIsReceiptModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Top Navbar adhering to Top Bar Contract */}
      <Navbar
        language={language}
        onLanguageChange={setLanguage}
        activeRole={activeRole}
        activeUserName={currentUser?.name}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
      />

      {/* Quick Role Switcher Banner (Floating helper to easily switch between demo roles) */}
      <aside aria-label="Demo role switcher" className="no-print bg-slate-100 border-b border-slate-200/80 py-1.5 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-slate-500">
            <span className="font-semibold text-emerald-800">
              {language === 'bn' ? 'ডেমো রোল পরিবর্তন:' : 'Switch Role:'}
            </span>
            <span className="text-slate-400">·</span>
            <span>
              {activeRole ? (
                <span className="font-bold text-slate-800 capitalize">
                  {activeRole === 'admin' ? (language === 'bn' ? 'এডমিন ড্যাশবোর্ড' : 'Admin Panel') : 
                   activeRole === 'teacher' ? (language === 'bn' ? 'শিক্ষক পোর্টাল' : 'Teacher Portal') : 
                   (language === 'bn' ? 'শিক্ষার্থী পোর্টাল' : 'Student Portal')}
                </span>
              ) : (
                <span className="text-slate-500 italic">
                  {language === 'bn' ? 'পাবলিক পোর্টাল মোড' : 'Public Visitor Mode'}
                </span>
              )}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => {
                handleLogin('student', { id: 'std_1001', name: 'Tanvir Ahmed', roll: '1001', classGrade: 'Class 10' });
              }}
              className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors ${
                activeRole === 'student' ? 'bg-emerald-700 text-white' : 'bg-white hover:bg-slate-200 text-slate-700'
              }`}
            >
              🎓 Student
            </button>
            <button
              onClick={() => {
                handleLogin('teacher', { id: 'tch_01', name: 'Abdur Rohoman' });
              }}
              className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors ${
                activeRole === 'teacher' ? 'bg-blue-700 text-white' : 'bg-white hover:bg-slate-200 text-slate-700'
              }`}
            >
              👨‍🏫 Teacher
            </button>
            <button
              onClick={() => {
                handleLogin('admin', { id: 'adm_01', name: 'Admin (Headmaster)' });
              }}
              className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors ${
                activeRole === 'admin' ? 'bg-purple-700 text-white' : 'bg-white hover:bg-slate-200 text-slate-700'
              }`}
            >
              🛡️ Admin
            </button>
            {activeRole && (
              <button
                onClick={handleLogout}
                className="px-2 py-0.5 rounded text-[11px] font-semibold bg-rose-50 text-rose-700 hover:bg-rose-100 transition-colors"
              >
                Sign Out
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* Main View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        {/* If Active Tab is Dashboard and Role is set */}
        {activeTab === 'dashboard' && activeRole === 'admin' && (
          <AdminDashboard
            students={students}
            teachers={teachers}
            payments={payments}
            notices={notices}
            routine={routine}
            courses={courses}
            language={language}
            onViewReceipt={handleViewReceipt}
            onAddNotice={handleAddNotice}
            onRecordCashPayment={handleRecordCashPayment}
          />
        )}

        {activeTab === 'dashboard' && activeRole === 'teacher' && (
          <TeacherDashboard
            teacher={currentTeacher}
            courses={courses}
            routine={routine}
            students={students}
            language={language}
            onUpdateChapterStatus={handleUpdateChapterStatus}
          />
        )}

        {activeTab === 'dashboard' && activeRole === 'student' && (
          <StudentDashboard
            student={currentStudent}
            payments={payments}
            routine={routine}
            courses={courses}
            notices={notices}
            freeVideos={freeVideos}
            language={language}
            onOpenPaymentModal={() => setIsPaymentModalOpen(true)}
            onViewReceipt={handleViewReceipt}
            onWatchVideo={handleWatchVideo}
          />
        )}

        {/* If Not in Dashboard or Logged Out, show Public Landing or Specific Section Tab */}
        {(activeTab === 'home' || !activeRole) && (
          <PublicLanding
            courses={courses}
            routine={routine}
            freeVideos={freeVideos}
            notices={notices}
            language={language}
            onOpenAuth={handleOpenAuth}
            onWatchVideo={handleWatchVideo}
            onSelectTab={setActiveTab}
          />
        )}

        {/* Dedicated Section View for Courses tab */}
        {activeTab === 'courses' && activeRole && (
          <div className="space-y-6">
            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs">
              <h2 className="text-xl font-bold text-slate-900">{t.courseModules} (Class 6 - 12)</h2>
              <p className="text-xs text-slate-500 mt-1">
                Detailed syllabus breakdown for all enrolled classes at Abdur Rohoman Academy
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {courses.map((cm) => (
                <div key={cm.id} className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[11px] font-bold text-emerald-700 uppercase">{cm.classGrade}</span>
                      <h3 className="text-base font-bold text-slate-900 mt-0.5">
                        {language === 'bn' ? cm.subjectBn : cm.subject}
                      </h3>
                    </div>
                    <span className="font-mono text-xs font-bold bg-slate-100 px-2 py-1 rounded">
                      {Math.round((cm.completedChapters / cm.totalChapters) * 100)}%
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {language === 'bn' ? cm.syllabusOverviewBn : cm.syllabusOverview}
                  </p>
                  <div className="space-y-1.5 pt-2 border-t border-slate-100">
                    <div className="text-xs font-semibold text-slate-700">Chapters:</div>
                    {cm.chapters.map((ch) => (
                      <div key={ch.chapterNo} className="flex justify-between text-xs text-slate-600 py-1">
                        <span>Ch {ch.chapterNo}: {language === 'bn' ? ch.titleBn : ch.title}</span>
                        <span className="capitalize font-semibold text-emerald-700">{ch.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Dedicated Section View for Routine tab */}
        {activeTab === 'routine' && activeRole && (
          <div className="space-y-6">
            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs">
              <h2 className="text-xl font-bold text-slate-900">{t.classRoutine} (Class 6 - 12)</h2>
              <p className="text-xs text-slate-500 mt-1">Master weekly coaching routine for Saturday through Thursday</p>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
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
                        <td className="py-3 px-4 font-mono font-bold text-emerald-800">{rt.time}</td>
                        <td className="py-3 px-4 font-bold text-slate-900">{rt.classGrade}</td>
                        <td className="py-3 px-4 font-semibold text-slate-800">
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
          </div>
        )}

        {/* Dedicated Section View for Free Videos tab */}
        {activeTab === 'free-videos' && activeRole && (
          <div className="space-y-6">
            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs">
              <h2 className="text-xl font-bold text-slate-900">{t.watchFreeClass}</h2>
              <p className="text-xs text-slate-500 mt-1">{t.freeClassDesc}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {freeVideos.map((vid) => (
                <div
                  key={vid.id}
                  onClick={() => handleWatchVideo(vid)}
                  className="group bg-white hover:bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden cursor-pointer transition-all hover:shadow-md flex flex-col justify-between"
                >
                  <div className="aspect-video bg-slate-950 relative flex items-center justify-center p-4 text-center">
                    <div className="w-12 h-12 rounded-full bg-emerald-600/90 text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                      ▶
                    </div>
                    <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 bg-black/75 rounded text-[10px] text-white font-mono">
                      {vid.duration}
                    </div>
                    <div className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-emerald-700/90 rounded text-[10px] text-white font-bold">
                      {vid.classGrade}
                    </div>
                  </div>

                  <div className="p-4 space-y-2">
                    <div className="text-xs font-semibold text-emerald-700">
                      {language === 'bn' ? vid.subjectBn : vid.subject}
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm line-clamp-2 leading-snug">
                      {language === 'bn' ? vid.titleBn : vid.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2">
                      {language === 'bn' ? vid.descriptionBn : vid.description}
                    </p>
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                      <span>{vid.instructor}</span>
                      <span className="text-emerald-700 font-bold group-hover:underline">Watch Video →</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Dedicated Section View for Notices tab */}
        {activeTab === 'notices' && activeRole && (
          <div className="space-y-6">
            <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-xs">
              <h2 className="text-xl font-bold text-slate-900">{t.notices} & Exam Alerts</h2>
              <p className="text-xs text-slate-500 mt-1">Official circulars, model test schedules, and alerts</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {notices.map((n) => (
                <div key={n.id} className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="px-2 py-0.5 font-bold uppercase rounded text-[10px] bg-rose-100 text-rose-800">
                      {n.category}
                    </span>
                    <span className="font-mono text-slate-400 text-[11px]">{n.date}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm">
                    {language === 'bn' ? n.titleBn : n.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {language === 'bn' ? n.descriptionBn : n.description}
                  </p>
                  <div className="pt-2 text-[11px] text-slate-500 border-t border-slate-100">
                    Target: {n.targetAudience}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Auth Portal Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
        language={language}
        initialRole={authDefaultRole}
      />

      {/* Automated Payment Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        student={currentStudent}
        onPaymentSuccess={handlePaymentSuccess}
        language={language}
      />

      {/* Printable Official Receipt Modal */}
      <PaymentReceiptModal
        isOpen={isReceiptModalOpen}
        onClose={() => setIsReceiptModalOpen(false)}
        transaction={activeReceiptTx}
        language={language}
      />

      {/* Free Video Player Modal */}
      <VideoPlayerModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        video={activeVideo}
        language={language}
      />
    </div>
  );
}
