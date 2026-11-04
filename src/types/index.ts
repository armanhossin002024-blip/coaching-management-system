export type Role = 'admin' | 'teacher' | 'student' | null;

export type Language = 'en' | 'bn';

export type PaymentMethod = 'bkash' | 'nagad' | 'rocket' | 'cash';
export type PaymentStatus = 'paid' | 'pending' | 'overdue';

export interface Student {
  id: string;
  name: string;
  nameBn: string;
  roll: string;
  classGrade: string; // "Class 6" - "Class 12"
  group?: 'Science' | 'Commerce' | 'Arts' | 'General';
  phone: string;
  guardianPhone: string;
  monthlyFee: number;
  dueAmount: number;
  attendanceRate: number; // percentage
  enrolledSubjects: string[];
}

export interface Teacher {
  id: string;
  name: string;
  nameBn: string;
  designation: string;
  designationBn: string;
  specialty: string;
  phone: string;
  email: string;
  assignedClasses: string[];
  totalWeeklyClasses: number;
}

export interface CourseModule {
  id: string;
  classGrade: string;
  subject: string;
  subjectBn: string;
  teacherId: string;
  teacherName: string;
  totalChapters: number;
  completedChapters: number;
  syllabusOverview: string;
  syllabusOverviewBn: string;
  chapters: {
    chapterNo: number;
    title: string;
    titleBn: string;
    status: 'completed' | 'ongoing' | 'upcoming';
    lectureCount: number;
  }[];
}

export interface RoutineSlot {
  id: string;
  day: 'Saturday' | 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
  time: string;
  classGrade: string;
  subject: string;
  subjectBn: string;
  teacher: string;
  room: string;
}

export interface PaymentTransaction {
  id: string;
  voucherNo: string;
  studentId: string;
  studentName: string;
  studentRoll: string;
  classGrade: string;
  feeMonth: string;
  feeType: 'Tuition Fee' | 'Model Test Fee' | 'Admission Fee' | 'Lab Fee';
  amount: number;
  method: PaymentMethod;
  trxId?: string;
  date: string;
  status: PaymentStatus;
  receivedBy: string;
}

export interface Notice {
  id: string;
  title: string;
  titleBn: string;
  description: string;
  descriptionBn: string;
  date: string;
  category: 'exam' | 'urgent' | 'general' | 'routine';
  targetAudience: 'All' | 'Class 6-8' | 'Class 9-10' | 'Class 11-12' | 'Teachers';
  isImportant?: boolean;
}

export interface FreeVideoLecture {
  id: string;
  title: string;
  titleBn: string;
  subject: string;
  subjectBn: string;
  classGrade: string;
  duration: string;
  instructor: string;
  videoUrl: string;
  embedId: string;
  description: string;
  descriptionBn: string;
  views: number;
  noteFileTitle?: string;
}
