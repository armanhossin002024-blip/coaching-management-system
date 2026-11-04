import React, { useState } from 'react';
import { Teacher, CourseModule, RoutineSlot, Student, Language } from '../types';
import { useTranslation } from '../utils/translations';
import { 
  UserCheck, 
  Calendar, 
  BookOpen, 
  CheckCircle, 
  Clock, 
  CheckCircle2, 
  Award, 
  Plus, 
  FileText 
} from 'lucide-react';

interface TeacherDashboardProps {
  teacher: Teacher;
  courses: CourseModule[];
  routine: RoutineSlot[];
  students: Student[];
  language: Language;
  onUpdateChapterStatus: (courseId: string, chapterNo: number, status: 'completed' | 'ongoing' | 'upcoming') => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  teacher,
  courses,
  routine,
  students,
  language,
  onUpdateChapterStatus
}) => {
  const t = useTranslation(language);
  const [selectedCourseId, setSelectedCourseId] = useState(courses[0]?.id || '');
  const [attendanceDate, setAttendanceDate] = useState('2026-11-04');
  const [markedAttendance, setMarkedAttendance] = useState<Record<string, boolean>>({
    std_1001: true,
    std_1201: true,
    std_0902: true,
    std_0805: false
  });

  const selectedCourse = courses.find((c) => c.id === selectedCourseId) || courses[0];

  // Teacher's routine slots
  const teacherRoutine = routine.filter(
    (r) => r.teacher.toLowerCase().includes(teacher.name.toLowerCase()) || r.teacher.includes('Abdur Rohoman')
  );

  const toggleAttendance = (stdId: string) => {
    setMarkedAttendance((prev) => ({
      ...prev,
      [stdId]: !prev[stdId]
    }));
  };

  return (
    <div className="space-y-6">
      {/* Teacher Profile Banner */}
      <div className="p-6 bg-slate-900 text-white rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xl shadow-xs">
            {teacher.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider bg-emerald-500 text-slate-950 rounded">
                FACULTY PORTAL
              </span>
              <span className="text-xs text-slate-400">·</span>
              <span className="text-xs text-slate-300">{teacher.email}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold mt-1 text-white">
              {language === 'bn' ? teacher.nameBn : teacher.name}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {language === 'bn' ? teacher.designationBn : teacher.designation} · {teacher.specialty}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono bg-slate-800/80 p-3 rounded-xl border border-slate-700/60">
          <div>
            <div className="text-slate-400">Assigned Classes</div>
            <div className="font-bold text-white text-sm">{teacher.assignedClasses.join(', ')}</div>
          </div>
          <div className="border-l border-slate-700 pl-4">
            <div className="text-slate-400">Weekly Classes</div>
            <div className="font-bold text-emerald-400 text-sm">{teacher.totalWeeklyClasses} Lectures</div>
          </div>
        </div>
      </div>

      {/* Routine & Today's Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Schedule */}
        <div className="lg:col-span-1 bg-white p-5 rounded-2xl border border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-700" />
              <h3 className="text-sm font-bold text-slate-900">
                {language === 'bn' ? 'আমার সাপ্তাহিক ক্লাস রুটিন' : 'My Weekly Routine'}
              </h3>
            </div>
            <span className="text-xs font-mono text-slate-400">{teacherRoutine.length} slots</span>
          </div>

          <div className="space-y-2.5">
            {teacherRoutine.slice(0, 6).map((slot) => (
              <div
                key={slot.id}
                className="p-3 bg-slate-50 hover:bg-slate-100/70 border border-slate-200/80 rounded-xl transition-colors text-xs"
              >
                <div className="flex justify-between items-center text-slate-500 font-semibold mb-1">
                  <span className="text-emerald-700 font-bold">{slot.day}</span>
                  <span className="font-mono text-[11px]">{slot.room}</span>
                </div>
                <div className="font-bold text-slate-900">
                  {language === 'bn' ? slot.subjectBn : slot.subject} ({slot.classGrade})
                </div>
                <div className="text-[11px] text-slate-500 font-mono mt-0.5">{slot.time}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Course Module & Syllabus Progression */}
        <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-slate-200 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-700" />
                <h3 className="text-sm font-bold text-slate-900">{t.courseModules}</h3>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {language === 'bn' 
                  ? 'সিলেবাস ট্র্যাকার: অধ্যায়ের অবস্থা পরিবর্তন করতে বাটনে ক্লিক করুন'
                  : 'Syllabus Tracker: Click status button to toggle completion'}
              </p>
            </div>

            {/* Course Selector Dropdown */}
            <select
              value={selectedCourseId}
              onChange={(e) => setSelectedCourseId(e.target.value)}
              className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg font-semibold text-slate-800"
            >
              {courses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.classGrade} - {c.subject}
                </option>
              ))}
            </select>
          </div>

          {selectedCourse && (
            <div className="space-y-4">
              {/* Progress Summary Card */}
              <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-200/80">
                <div className="flex justify-between items-center text-xs">
                  <div>
                    <span className="font-bold text-emerald-950 text-sm">
                      {language === 'bn' ? selectedCourse.subjectBn : selectedCourse.subject}
                    </span>
                    <span className="text-emerald-700 ml-2 font-medium">({selectedCourse.classGrade})</span>
                  </div>
                  <div className="font-mono font-bold text-emerald-800 text-sm">
                    {Math.round((selectedCourse.completedChapters / selectedCourse.totalChapters) * 100)}%
                  </div>
                </div>
                <div className="w-full bg-emerald-200/60 h-2 rounded-full mt-2.5 overflow-hidden">
                  <div
                    className="bg-emerald-600 h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${(selectedCourse.completedChapters / selectedCourse.totalChapters) * 100}%`
                    }}
                  ></div>
                </div>
                <div className="flex justify-between items-center text-[11px] text-emerald-800 mt-2">
                  <span>
                    {selectedCourse.completedChapters} of {selectedCourse.totalChapters} chapters completed
                  </span>
                  <span>Mentor: {selectedCourse.teacherName}</span>
                </div>
              </div>

              {/* Chapter Units Checklist */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Chapters & Lecture Breakdown
                </div>
                <div className="space-y-1.5">
                  {selectedCourse.chapters.map((ch) => (
                    <div
                      key={ch.chapterNo}
                      className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-bold text-slate-500 w-6">Ch {ch.chapterNo}</span>
                        <div>
                          <div className="font-semibold text-slate-900">
                            {language === 'bn' ? ch.titleBn : ch.title}
                          </div>
                          <div className="text-[11px] text-slate-400">{ch.lectureCount} scheduled lectures</div>
                        </div>
                      </div>

                      {/* Interactive Status Switcher */}
                      <button
                        onClick={() => {
                          const nextStatus =
                            ch.status === 'completed'
                              ? 'ongoing'
                              : ch.status === 'ongoing'
                              ? 'upcoming'
                              : 'completed';
                          onUpdateChapterStatus(selectedCourse.id, ch.chapterNo, nextStatus);
                        }}
                        className={`px-3 py-1 rounded-lg font-bold text-[11px] transition-all cursor-pointer ${
                          ch.status === 'completed'
                            ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                            : ch.status === 'ongoing'
                            ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                            : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                        }`}
                        title="Click to cycle status"
                      >
                        {ch.status === 'completed' ? '✓ Completed' : ch.status === 'ongoing' ? '● Ongoing' : 'Upcoming'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Student Attendance & Evaluation Quick Sheet */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Class Attendance & Student Log</h3>
            <p className="text-xs text-slate-500 mt-0.5">Quick mark attendance for today's batch</p>
          </div>
          <input
            type="date"
            value={attendanceDate}
            onChange={(e) => setAttendanceDate(e.target.value)}
            className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg font-mono"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {students.slice(0, 4).map((std) => {
            const isPresent = markedAttendance[std.id] ?? true;
            return (
              <div
                key={std.id}
                onClick={() => toggleAttendance(std.id)}
                className={`p-3.5 rounded-xl border cursor-pointer select-none transition-all ${
                  isPresent
                    ? 'border-emerald-300 bg-emerald-50/50 text-emerald-950'
                    : 'border-rose-200 bg-rose-50/50 text-rose-950'
                }`}
              >
                <div className="flex justify-between items-center text-xs">
                  <span className="font-mono font-bold">Roll: {std.roll}</span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      isPresent ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                    }`}
                  >
                    {isPresent ? 'PRESENT' : 'ABSENT'}
                  </span>
                </div>
                <div className="font-bold text-sm mt-1">{language === 'bn' ? std.nameBn : std.name}</div>
                <div className="text-[11px] opacity-75">{std.classGrade}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
