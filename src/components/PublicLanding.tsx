import React, { useState } from 'react';
import { 
  CourseModule, 
  RoutineSlot, 
  FreeVideoLecture, 
  Notice, 
  Language, 
  Role 
} from '../types';
import { useTranslation } from '../utils/translations';
import { 
  GraduationCap, 
  BookOpen, 
  Calendar, 
  PlayCircle, 
  Wallet, 
  Bell, 
  ShieldCheck, 
  UserCheck, 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  Award,
  Sparkles,
  PhoneCall,
  MapPin,
  Mail
} from 'lucide-react';

interface PublicLandingProps {
  courses: CourseModule[];
  routine: RoutineSlot[];
  freeVideos: FreeVideoLecture[];
  notices: Notice[];
  language: Language;
  onOpenAuth: (defaultRole?: Role) => void;
  onWatchVideo: (video: FreeVideoLecture) => void;
  onSelectTab: (tab: string) => void;
}

export const PublicLanding: React.FC<PublicLandingProps> = ({
  courses,
  routine,
  freeVideos,
  notices,
  language,
  onOpenAuth,
  onWatchVideo,
  onSelectTab
}) => {
  const t = useTranslation(language);
  const [selectedClass, setSelectedClass] = useState<string>('Class 10');
  const [selectedRoutineDay, setSelectedRoutineDay] = useState<string>('Saturday');
  const [videoFilterSubject, setVideoFilterSubject] = useState<string>('all');

  const classesList = ['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12'];

  // Filtered courses for selected class
  const filteredCourses = courses.filter((c) => c.classGrade === selectedClass);

  // Filtered routine
  const filteredRoutine = routine.filter((r) => r.day === selectedRoutineDay);

  // Filtered free videos
  const filteredVideos = freeVideos.filter((v) => {
    if (videoFilterSubject === 'all') return true;
    return v.subject.toLowerCase().includes(videoFilterSubject.toLowerCase());
  });

  return (
    <div className="space-y-16 py-6">
      {/* 1. Hero Showcase Section */}
      <section className="relative overflow-hidden rounded-3xl bg-slate-900 text-white p-8 sm:p-12 border border-slate-800 shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 text-xs font-semibold tracking-wide">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'bn' ? '৬ষ্ঠ থেকে ১২শ শ্রেণি · বিশেষায়িত একাডেমিক কোচিং' : 'Class 6 - 12 Specialized Academic Coaching'}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-[1.15] text-white">
            {language === 'bn' ? (
              <>
                <span className="text-emerald-400">আব্দুর রহমান একাডেমি</span> — স্বপ্নপূরণের সঠিক একাডেমিক প্ল্যাটফর্ম
              </>
            ) : (
              <>
                Excellence Begins at <span className="text-emerald-400">Abdur Rohoman Academy</span>
              </>
            )}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
            {language === 'bn'
              ? 'অভিজ্ঞ শিক্ষকমণ্ডলীর তত্ত্বাবধানে ৬ষ্ঠ থেকে ১২শ শ্রেণি (এসএসসি ও এইচএসসি) শিক্ষার্থীদের জন্য সুনির্দিষ্ট সিলেবাস মডিউল, নিয়মিত ক্লাস রুটিন, ফ্রি ভিডিও মাস্টারক্লাস ও স্বয়ংক্রিয় ফি ট্র্যাকিং ব্যবস্থা।'
              : 'Empowering students from Class 6 to 12 with conceptual syllabus mastery, disciplined weekly routines, free video lectures, and seamless automated tuition fee management.'}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-3">
            <button
              onClick={() => onOpenAuth('student')}
              className="flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-lg shadow-emerald-900/30 transition-all hover:scale-[1.02]"
            >
              <GraduationCap className="w-4 h-4" />
              <span>{language === 'bn' ? 'শিক্ষার্থী লগইন' : 'Student Portal'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onOpenAuth('teacher')}
              className="flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-bold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700 transition-colors"
            >
              <UserCheck className="w-4 h-4 text-emerald-400" />
              <span>{language === 'bn' ? 'শিক্ষক পোর্টাল' : 'Teacher Portal'}</span>
            </button>
            <button
              onClick={() => onOpenAuth('admin')}
              className="flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-bold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700 transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{language === 'bn' ? 'এডমিন পোর্টাল' : 'Admin Portal'}</span>
            </button>
          </div>
        </div>

        {/* Floating Academy Trust Stats Strip */}
        <div className="mt-10 pt-6 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
          <div>
            <div className="text-2xl font-black text-white tabular-nums">500+</div>
            <div className="text-slate-400 font-sans mt-0.5">{language === 'bn' ? 'সফল শিক্ষার্থী' : 'Students Enrolled'}</div>
          </div>
          <div>
            <div className="text-2xl font-black text-emerald-400 tabular-nums">100%</div>
            <div className="text-slate-400 font-sans mt-0.5">{language === 'bn' ? 'বোর্ড পরীক্ষায় সাফল্য' : 'Board Exam Success'}</div>
          </div>
          <div>
            <div className="text-2xl font-black text-white tabular-nums">18+</div>
            <div className="text-slate-400 font-sans mt-0.5">{language === 'bn' ? 'বছরের অভিজ্ঞতা' : 'Years Experience'}</div>
          </div>
          <div>
            <div className="text-2xl font-black text-emerald-400 tabular-nums">bKash/Nagad</div>
            <div className="text-slate-400 font-sans mt-0.5">{language === 'bn' ? 'অটো পেমেন্ট গেটওয়ে' : 'Instant Fee Tracking'}</div>
          </div>
        </div>
      </section>

      {/* 2. Urgent Exam Alerts & Announcements Banner */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-rose-600" />
            <h2 className="text-base sm:text-lg font-bold text-slate-900">{t.importantAlerts}</h2>
          </div>
          <span className="text-xs font-semibold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
            {language === 'bn' ? 'সর্বশেষ নোটিশ' : 'Latest Broadcasts'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {notices.slice(0, 2).map((notice) => (
            <div
              key={notice.id}
              className="p-4 bg-white rounded-2xl border border-slate-200 hover:border-slate-300 shadow-xs space-y-2 transition-all"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="px-2 py-0.5 font-bold uppercase rounded text-[10px] bg-rose-100 text-rose-800">
                  {notice.category}
                </span>
                <span className="font-mono text-slate-400 text-[11px]">{notice.date}</span>
              </div>
              <h3 className="font-bold text-slate-900 text-sm">
                {language === 'bn' ? notice.titleBn : notice.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {language === 'bn' ? notice.descriptionBn : notice.description}
              </p>
              <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-100">
                <span>{language === 'bn' ? 'লক্ষ্যমাত্রা:' : 'Target:'} {notice.targetAudience}</span>
                <span className="text-emerald-700 font-semibold cursor-pointer" onClick={() => onSelectTab('notices')}>
                  {language === 'bn' ? 'বিস্তারিত দেখুন →' : 'Read details →'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Three Dedicated Portals Cards */}
      <section className="space-y-4">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            {language === 'bn' ? 'তিনটি সুনির্দিষ্ট ব্যবস্থাপনা পোর্টাল' : 'Three Tailored Portals'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            {language === 'bn'
              ? 'শিক্ষার্থী, শিক্ষক ও এডমিনদের জন্য পৃথক ও সুরক্ষিত ড্যাশবোর্ড'
              : 'Dedicated workspace tailored specifically for students, educators, and academy administration.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Student Card */}
          <div 
            onClick={() => onOpenAuth('student')}
            className="p-6 bg-white hover:bg-slate-50 border border-slate-200 rounded-2xl cursor-pointer transition-all hover:shadow-md space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">{t.studentPortal}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t.studentLoginDesc}
              </p>
              <ul className="text-xs text-slate-500 space-y-1.5 pt-1">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>bKash & Nagad automated fee pay</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Class routine & exam alerts</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Free video lectures & lecture notes</span>
                </li>
              </ul>
            </div>
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700">
              <span>{language === 'bn' ? 'লগইন করুন' : 'Sign in as Student'}</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Teacher Card */}
          <div 
            onClick={() => onOpenAuth('teacher')}
            className="p-6 bg-white hover:bg-slate-50 border border-slate-200 rounded-2xl cursor-pointer transition-all hover:shadow-md space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                <UserCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">{t.teacherPortal}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t.teacherLoginDesc}
              </p>
              <ul className="text-xs text-slate-500 space-y-1.5 pt-1">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                  <span>Weekly timetable & room slots</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                  <span>Syllabus chapter progress tracking</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                  <span>Attendance & performance evaluations</span>
                </li>
              </ul>
            </div>
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-700">
              <span>{language === 'bn' ? 'লগইন করুন' : 'Sign in as Teacher'}</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          {/* Admin Card */}
          <div 
            onClick={() => onOpenAuth('admin')}
            className="p-6 bg-white hover:bg-slate-50 border border-slate-200 rounded-2xl cursor-pointer transition-all hover:shadow-md space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">{t.adminPortal}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {t.adminLoginDesc}
              </p>
              <ul className="text-xs text-slate-500 space-y-1.5 pt-1">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />
                  <span>Full payment ledger & cash receipts</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />
                  <span>Student & faculty directory</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />
                  <span>Broadcast notices & exam routines</span>
                </li>
              </ul>
            </div>
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-purple-700">
              <span>{language === 'bn' ? 'লগইন করুন' : 'Sign in as Admin'}</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Course Modules Explorer (Class 6 - 12) */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-700" />
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">{t.courseModules}</h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {language === 'bn'
                ? '৬ষ্ঠ থেকে ১২শ শ্রেণির পূর্ণাঙ্গ সিলেবাস, অধ্যায় বিন্যাস ও অগ্রগতি'
                : 'Complete national curriculum syllabus coverage from Class 6 to 12'}
            </p>
          </div>

          {/* Class Selectors */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1">
            {classesList.map((cls) => (
              <button
                key={cls}
                onClick={() => setSelectedClass(cls)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
                  selectedClass === cls
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                }`}
              >
                {cls}
              </button>
            ))}
          </div>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredCourses.length === 0 ? (
            <div className="col-span-2 p-8 text-center text-xs text-slate-500 bg-white rounded-2xl border border-slate-200">
              {language === 'bn'
                ? `${selectedClass}-এর কোর্স মডিউল আপডেট করা হচ্ছে। অন্যান্য শ্রেণি দেখতে পারেন।`
                : `Modules for ${selectedClass} are being updated. Check Class 8, 10, 11 or 12 for full active previews.`}
            </div>
          ) : (
            filteredCourses.map((cm) => (
              <div key={cm.id} className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[11px] font-bold text-emerald-700 uppercase">
                      {cm.classGrade}
                    </span>
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

                <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-600 h-full rounded-full"
                    style={{
                      width: `${(cm.completedChapters / cm.totalChapters) * 100}%`
                    }}
                  ></div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>Mentor: {cm.teacherName}</span>
                  <span className="font-mono">{cm.completedChapters}/{cm.totalChapters} Ch.</span>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* 5. Class Routine Weekly Schedule Matrix */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-emerald-700" />
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">{t.classRoutine}</h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {language === 'bn' ? 'শনিবার থেকে বৃহস্পতিবার সাপ্তাহিক ক্লাস রুটিন' : 'Weekly timetable matrix for all active batches'}
            </p>
          </div>

          {/* Days Filter */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1">
            {['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'].map((day) => (
              <button
                key={day}
                onClick={() => setSelectedRoutineDay(day)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-colors ${
                  selectedRoutineDay === day
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        {/* Routine Table */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-semibold">
                <tr>
                  <th className="py-3 px-4">{t.time}</th>
                  <th className="py-3 px-4">Class</th>
                  <th className="py-3 px-4">{t.subject}</th>
                  <th className="py-3 px-4">{t.teacher}</th>
                  <th className="py-3 px-4">{t.room}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredRoutine.map((rt) => (
                  <tr key={rt.id} className="hover:bg-slate-50/80">
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
      </section>

      {/* 6. Free Class Video Masterclasses Hub */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <PlayCircle className="w-5 h-5 text-emerald-700" />
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">{t.watchFreeClass}</h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">{t.freeClassDesc}</p>
          </div>

          {/* Subject Filter */}
          <div className="flex items-center gap-1 overflow-x-auto">
            {['all', 'physics', 'math', 'chemistry', 'science', 'ict'].map((subj) => (
              <button
                key={subj}
                onClick={() => setVideoFilterSubject(subj)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-colors ${
                  videoFilterSubject === subj
                    ? 'bg-emerald-700 text-white'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                }`}
              >
                {subj}
              </button>
            ))}
          </div>
        </div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredVideos.map((vid) => (
            <div
              key={vid.id}
              onClick={() => onWatchVideo(vid)}
              className="group bg-white hover:bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden cursor-pointer transition-all hover:shadow-md flex flex-col justify-between"
            >
              <div className="aspect-video bg-slate-950 relative flex items-center justify-center p-4 text-center">
                <div className="w-12 h-12 rounded-full bg-emerald-600/90 text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-md">
                  <PlayCircle className="w-6 h-6 ml-0.5" />
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
      </section>

      {/* 7. Automated Payment Tracking Feature Highlight */}
      <section className="bg-emerald-900 text-white rounded-3xl p-8 sm:p-10 shadow-lg relative overflow-hidden">
        <div className="max-w-2xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-800 rounded-full text-xs text-emerald-200 font-semibold">
            <Wallet className="w-3.5 h-3.5" />
            <span>Digital Tuition Fee Tracking</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold">
            {language === 'bn'
              ? 'বিকাশ, নগদ ও রকেটের মাধ্যমে স্বয়ংক্রিয় ফি ট্র্যাকিং'
              : 'Effortless Tuition Payments via bKash, Nagad & Cash Receipts'}
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
            {language === 'bn'
              ? 'শিক্ষার্থী বা অভিভাবক যে কোনো স্থান থেকে মাত্র ২ মিনিটে অ্যাকাডেমির টিউশন ও পরীক্ষা ফি পরিশোধ করে তাৎক্ষণিক অফিশিয়াল সিলযুক্ত মানি রিসিট সংগ্রহ ও প্রিন্ট করতে পারবেন।'
              : 'Parents and students can pay monthly tuition, test fees, and admission charges via Bangladeshi MFS gateways with instant digital voucher receipt generation.'}
          </p>
          <div className="pt-2">
            <button
              onClick={() => onOpenAuth('student')}
              className="px-5 py-2.5 text-xs sm:text-sm font-bold text-slate-950 bg-white hover:bg-emerald-50 rounded-xl transition-colors"
            >
              {language === 'bn' ? 'পেমেন্ট ড্যাশবোর্ড দেখুন' : 'View Payment Gateway'}
            </button>
          </div>
        </div>
      </section>

      {/* 8. Academy Contact & Info Footer */}
      <footer className="pt-10 border-t border-slate-200 text-xs text-slate-500">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10">
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center">
                <GraduationCap className="w-4 h-4" />
              </div>
              <span className="font-bold text-slate-900 text-base">
                {language === 'bn' ? 'আব্দুর রহমান একাডেমি' : 'Abdur Rohoman Academy'}
              </span>
            </div>
            <p className="text-xs text-slate-600 max-w-sm">
              {language === 'bn'
                ? '৬ষ্ঠ থেকে ১২শ শ্রেণির বিজ্ঞান, ব্যবসায় শিক্ষা ও সাধারণ শাখার শিক্ষার্থীদের জন্য মানসম্মত কোচিং ও বোর্ড পরীক্ষা বিশেষ ব্যাচ।'
                : 'Premier academic coaching institute for Class 6 to 12. Transforming academic foundation into board exam excellence.'}
            </p>
          </div>

          <div className="space-y-2">
            <div className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">Academic Portals</div>
            <ul className="space-y-1.5">
              <li><button onClick={() => onOpenAuth('student')} className="hover:text-emerald-700">Student Sign In</button></li>
              <li><button onClick={() => onOpenAuth('teacher')} className="hover:text-emerald-700">Teacher Sign In</button></li>
              <li><button onClick={() => onOpenAuth('admin')} className="hover:text-emerald-700">Admin Control Panel</button></li>
            </ul>
          </div>

          <div className="space-y-2">
            <div className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">Campus Contact</div>
            <ul className="space-y-1.5">
              <li className="flex items-center gap-1.5"><PhoneCall className="w-3.5 h-3.5 text-emerald-700" /> +880 1711-000001</li>
              <li className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-emerald-700" /> info@abdurrohomanacademy.edu.bd</li>
              <li className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-emerald-700" /> Dhaka, Bangladesh</li>
            </ul>
          </div>
        </div>

        <div className="py-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            © {new Date().getFullYear()} Abdur Rohoman Academy. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Class 6 - 12 Coaching System</span>
            <span>·</span>
            <span>Automated bKash/Nagad Fee Tracking</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
