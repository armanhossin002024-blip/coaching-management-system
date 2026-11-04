import { Student, Teacher, CourseModule, RoutineSlot, PaymentTransaction, Notice, FreeVideoLecture } from '../types';

export const initialStudents: Student[] = [
  {
    id: 'std_1001',
    name: 'Tanvir Ahmed',
    nameBn: 'তানভীর আহমেদ',
    roll: '1001',
    classGrade: 'Class 10',
    group: 'Science',
    phone: '01711-234567',
    guardianPhone: '01819-876543',
    monthlyFee: 2500,
    dueAmount: 0,
    attendanceRate: 94,
    enrolledSubjects: ['Higher Math', 'Physics', 'Chemistry', 'Biology', 'English', 'ICT']
  },
  {
    id: 'std_1201',
    name: 'Nusrat Jahan',
    nameBn: 'নুসরাত জাহান',
    roll: '1201',
    classGrade: 'Class 12',
    group: 'Science',
    phone: '01912-345678',
    guardianPhone: '01715-987654',
    monthlyFee: 3200,
    dueAmount: 3200,
    attendanceRate: 88,
    enrolledSubjects: ['Physics 1st & 2nd', 'Chemistry', 'Higher Math', 'Biology', 'English', 'ICT']
  },
  {
    id: 'std_0902',
    name: 'Samiul Islam',
    nameBn: 'সামিউল ইসলাম',
    roll: '0902',
    classGrade: 'Class 9',
    group: 'Science',
    phone: '01823-456789',
    guardianPhone: '01611-112233',
    monthlyFee: 2400,
    dueAmount: 1200,
    attendanceRate: 96,
    enrolledSubjects: ['General Math', 'General Science', 'English', 'ICT']
  },
  {
    id: 'std_0805',
    name: 'Mehedi Hasan',
    nameBn: 'মেহেদী হাসান',
    roll: '0805',
    classGrade: 'Class 8',
    group: 'General',
    phone: '01511-998877',
    guardianPhone: '01733-445566',
    monthlyFee: 2000,
    dueAmount: 0,
    attendanceRate: 91,
    enrolledSubjects: ['Mathematics', 'Science', 'English', 'BGS', 'ICT']
  },
  {
    id: 'std_1104',
    name: 'Ayesha Siddika',
    nameBn: 'আয়েশা সিদ্দিকা',
    roll: '1104',
    classGrade: 'Class 11',
    group: 'Science',
    phone: '01677-889900',
    guardianPhone: '01922-334455',
    monthlyFee: 3000,
    dueAmount: 3000,
    attendanceRate: 95,
    enrolledSubjects: ['Physics', 'Chemistry', 'Higher Math', 'Biology']
  },
  {
    id: 'std_0703',
    name: 'Rayhan Kabir',
    nameBn: 'রায়হান কবির',
    roll: '0703',
    classGrade: 'Class 7',
    group: 'General',
    phone: '01799-112244',
    guardianPhone: '01855-667788',
    monthlyFee: 1800,
    dueAmount: 0,
    attendanceRate: 98,
    enrolledSubjects: ['Mathematics', 'Science', 'English']
  },
  {
    id: 'std_0601',
    name: 'Fatima Zohra',
    nameBn: 'ফাতিমা জোহরা',
    roll: '0601',
    classGrade: 'Class 6',
    group: 'General',
    phone: '01311-223344',
    guardianPhone: '01744-556677',
    monthlyFee: 1600,
    dueAmount: 1600,
    attendanceRate: 92,
    enrolledSubjects: ['Mathematics', 'Science', 'English']
  }
];

export const initialTeachers: Teacher[] = [
  {
    id: 'tch_01',
    name: 'Abdur Rohoman',
    nameBn: 'আব্দুর রহমান',
    designation: 'Founder & Head of Mathematics',
    designationBn: 'প্রতিষ্ঠাতা ও গণিত বিভাগীয় প্রধান',
    specialty: 'Higher Math (Class 9-12), Calculus & Trigonometry',
    phone: '01711-000001',
    email: 'abdur.rohoman@academy.edu.bd',
    assignedClasses: ['Class 9', 'Class 10', 'Class 11', 'Class 12'],
    totalWeeklyClasses: 18
  },
  {
    id: 'tch_02',
    name: 'Md. Kamrul Hasan',
    nameBn: 'মো. কামরুল হাসান',
    designation: 'Senior Faculty, Physics',
    designationBn: 'জ্যেষ্ঠ শিক্ষক, পদার্থবিজ্ঞান',
    specialty: 'Mechanics, Electromagnetism, Modern Physics',
    phone: '01811-000002',
    email: 'kamrul.hasan@academy.edu.bd',
    assignedClasses: ['Class 9', 'Class 10', 'Class 11', 'Class 12'],
    totalWeeklyClasses: 16
  },
  {
    id: 'tch_03',
    name: 'Dr. Shamima Nasrin',
    nameBn: 'ড. শামীমা নাসরিন',
    designation: 'Head of Chemistry',
    designationBn: 'বিভাগীয় প্রধান, রসায়ন',
    specialty: 'Organic Chemistry, Chemical Reactions, Environmental Science',
    phone: '01911-000003',
    email: 'shamima.nasrin@academy.edu.bd',
    assignedClasses: ['Class 9', 'Class 10', 'Class 11', 'Class 12'],
    totalWeeklyClasses: 14
  },
  {
    id: 'tch_04',
    name: 'Rafiqul Islam',
    nameBn: 'রফিকুল ইসলাম',
    designation: 'Senior Lecturer, English',
    designationBn: 'জ্যেষ্ঠ প্রভাষক, ইংরেজি',
    specialty: 'Grammar, Comprehension, Writing Skills',
    phone: '01611-000004',
    email: 'rafiqul.islam@academy.edu.bd',
    assignedClasses: ['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'],
    totalWeeklyClasses: 20
  },
  {
    id: 'tch_05',
    name: 'Engr. Tanzeem Hossain',
    nameBn: 'প্রকৌশলী তানজিম হোসেন',
    designation: 'Faculty Lead, ICT & Programming',
    designationBn: 'প্রভাষক, আইসিটি ও প্রযুক্তি',
    specialty: 'HSC ICT (C Programming, HTML, Database, Logic Gates)',
    phone: '01511-000005',
    email: 'tanzeem.hossain@academy.edu.bd',
    assignedClasses: ['Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12'],
    totalWeeklyClasses: 12
  }
];

export const initialCourseModules: CourseModule[] = [
  {
    id: 'cm_10_hmath',
    classGrade: 'Class 10',
    subject: 'Higher Mathematics',
    subjectBn: 'উচ্চতর গণিত',
    teacherId: 'tch_01',
    teacherName: 'Abdur Rohoman',
    totalChapters: 14,
    completedChapters: 10,
    syllabusOverview: 'Rigorous conceptual coverage of Vector, Trigonometry, Coordinate Geometry, and Differential Calculus foundations.',
    syllabusOverviewBn: 'ভেক্টর, ত্রিকোণমিতি, স্থানাঙ্ক জ্যামিতি এবং ক্যালকুলাসের ভিত্তি প্রস্তর সংক্রান্ত পূর্ণাঙ্গ সিলেবাস।',
    chapters: [
      { chapterNo: 1, title: 'Set and Functions', titleBn: 'সেট ও ফাংশন', status: 'completed', lectureCount: 6 },
      { chapterNo: 2, title: 'Algebraic Expressions', titleBn: 'বীজগাণিতিক রাশি', status: 'completed', lectureCount: 8 },
      { chapterNo: 3, title: 'Geometry (Apollonius Theorem)', titleBn: 'জ্যামিতি (অ্যাপোলোনিয়াসের উপপাদ্য)', status: 'completed', lectureCount: 7 },
      { chapterNo: 7, title: 'Infinite Series', titleBn: 'অসীম ধারা', status: 'completed', lectureCount: 5 },
      { chapterNo: 8, title: 'Trigonometry & Radians', titleBn: 'ত্রিকোণমিতি ও রেডিয়ান কোণ', status: 'ongoing', lectureCount: 9 },
      { chapterNo: 11, title: 'Coordinate Geometry', titleBn: 'স্থানাঙ্ক জ্যামিতি', status: 'upcoming', lectureCount: 6 },
      { chapterNo: 14, title: 'Probability', titleBn: 'সম্ভাবনা', status: 'upcoming', lectureCount: 4 }
    ]
  },
  {
    id: 'cm_10_phy',
    classGrade: 'Class 10',
    subject: 'Physics',
    subjectBn: 'পদার্থবিজ্ঞান',
    teacherId: 'tch_02',
    teacherName: 'Md. Kamrul Hasan',
    totalChapters: 14,
    completedChapters: 9,
    syllabusOverview: 'Kinematics, Dynamics, Work Energy Power, Waves, and Current Electricity with hands-on mathematical problem sets.',
    syllabusOverviewBn: 'গতি, বল, কাজ শক্তি ও ক্ষমতা, তরঙ্গ ও শব্দ এবং চলবিদ্যুৎ সংক্রান্ত গাণিতিক সমাধান।',
    chapters: [
      { chapterNo: 1, title: 'Physical Quantities & Measurement', titleBn: 'ভৌত রাশি ও পরিমাপ', status: 'completed', lectureCount: 4 },
      { chapterNo: 2, title: 'Motion & Equations', titleBn: 'গতি ও গতি সমীকরণ', status: 'completed', lectureCount: 8 },
      { chapterNo: 3, title: 'Force and Newton Laws', titleBn: 'বল ও নিউটনের সূত্র', status: 'completed', lectureCount: 7 },
      { chapterNo: 4, title: 'Work, Power and Energy', titleBn: 'কাজ, ক্ষমতা ও শক্তি', status: 'completed', lectureCount: 6 },
      { chapterNo: 11, title: 'Current Electricity', titleBn: 'চল তড়িৎ ও বর্তনী', status: 'ongoing', lectureCount: 8 },
      { chapterNo: 12, title: 'Magnetic Effect of Current', titleBn: 'বিদ্যুতের চৌম্বক ক্রিয়া', status: 'upcoming', lectureCount: 5 }
    ]
  },
  {
    id: 'cm_12_chem',
    classGrade: 'Class 12',
    subject: 'Chemistry (Paper 1 & 2)',
    subjectBn: 'রসায়ন (১ম ও ২য় পত্র)',
    teacherId: 'tch_03',
    teacherName: 'Dr. Shamima Nasrin',
    totalChapters: 10,
    completedChapters: 7,
    syllabusOverview: 'Deep dive into Periodic Properties, Chemical Bonding, Organic Chemistry reactions, and Electrochemistry.',
    syllabusOverviewBn: 'পর্যায়বৃত্ত ধর্ম, রাসায়নিক বন্ধন, জৈব রসায়ন বিক্রিয়াক্রম এবং তড়িৎ রসায়ন।',
    chapters: [
      { chapterNo: 2, title: 'Qualitative Chemistry', titleBn: 'গুণগত রসায়ন', status: 'completed', lectureCount: 8 },
      { chapterNo: 3, title: 'Periodic Properties & Bonding', titleBn: 'পর্যায়বৃত্ত ধর্ম ও বন্ধন', status: 'completed', lectureCount: 10 },
      { chapterNo: 22, title: 'Organic Chemistry (Reactions)', titleBn: 'জৈব রসায়ন (বিক্রিয়া মেকানিজম)', status: 'ongoing', lectureCount: 14 },
      { chapterNo: 23, title: 'Quantitative Chemistry', titleBn: 'পরিমাণগত রসায়ন', status: 'upcoming', lectureCount: 9 }
    ]
  },
  {
    id: 'cm_08_math',
    classGrade: 'Class 8',
    subject: 'General Mathematics',
    subjectBn: 'সাধারণ গণিত',
    teacherId: 'tch_01',
    teacherName: 'Abdur Rohoman',
    totalChapters: 11,
    completedChapters: 8,
    syllabusOverview: 'Patterns, Profit-Loss, Algebraic Formulae, Simultaneous Equations, and Circle Theorem proofs.',
    syllabusOverviewBn: 'প্যাটার্ন, মুনাফা, বীজগণিতীয় সূত্রাবলী, সরল সহসমীকরণ ও বৃত্তের উপপাদ্য।',
    chapters: [
      { chapterNo: 1, title: 'Pattern Recognition', titleBn: 'প্যাটার্ন', status: 'completed', lectureCount: 4 },
      { chapterNo: 2, title: 'Simple & Compound Profit', titleBn: 'মুনাফা (সরল ও চক্রবৃদ্ধি)', status: 'completed', lectureCount: 6 },
      { chapterNo: 4, title: 'Algebraic Identities', titleBn: 'বীজগণিতীয় সূত্রাবলী', status: 'ongoing', lectureCount: 7 },
      { chapterNo: 8, title: 'Quadrilaterals & Construction', titleBn: 'চতুর্ভুজ অঙ্কন ও উপপাদ্য', status: 'upcoming', lectureCount: 5 }
    ]
  },
  {
    id: 'cm_11_ict',
    classGrade: 'Class 11',
    subject: 'Information & Comm. Technology',
    subjectBn: 'তথ্য ও যোগাযোগ প্রযুক্তি',
    teacherId: 'tch_05',
    teacherName: 'Engr. Tanzeem Hossain',
    totalChapters: 6,
    completedChapters: 4,
    syllabusOverview: 'Number Systems, Logic Gates, HTML Web Design, C Programming, and Database Management.',
    syllabusOverviewBn: 'সংখ্যা পদ্ধতি, ডিজিটাল ডিভাইস, এইচটিএমএল ওয়েব ডিজাইন এবং সি প্রোগ্রামিং।',
    chapters: [
      { chapterNo: 3, title: 'Number Systems & Boolean Algebra', titleBn: 'সংখ্যা পদ্ধতি ও ডিজিটাল লজিক', status: 'completed', lectureCount: 9 },
      { chapterNo: 4, title: 'HTML & Web Design Basics', titleBn: 'এইচটিএমএল ও ওয়েব ডিজাইন পরিচিতি', status: 'completed', lectureCount: 6 },
      { chapterNo: 5, title: 'Programming in C', titleBn: 'সি প্রোগ্রামিং ভাষা', status: 'ongoing', lectureCount: 12 },
      { chapterNo: 6, title: 'Relational Database (SQL)', titleBn: 'ডাটাবেজ ম্যানেজমেন্ট সিস্টেম', status: 'upcoming', lectureCount: 5 }
    ]
  }
];

export const initialRoutine: RoutineSlot[] = [
  // Saturday
  { id: 'rt_01', day: 'Saturday', time: '07:30 AM - 09:00 AM', classGrade: 'Class 10', subject: 'Higher Math', subjectBn: 'উচ্চতর গণিত', teacher: 'Abdur Rohoman', room: 'Room 201' },
  { id: 'rt_02', day: 'Saturday', time: '09:15 AM - 10:45 AM', classGrade: 'Class 10', subject: 'Physics', subjectBn: 'পদার্থবিজ্ঞান', teacher: 'Md. Kamrul Hasan', room: 'Room 201' },
  { id: 'rt_03', day: 'Saturday', time: '11:00 AM - 12:30 PM', classGrade: 'Class 12', subject: 'Chemistry', subjectBn: 'রসায়ন', teacher: 'Dr. Shamima Nasrin', room: 'Science Lab 1' },
  { id: 'rt_04', day: 'Saturday', time: '03:30 PM - 05:00 PM', classGrade: 'Class 8', subject: 'General Science', subjectBn: 'বিজ্ঞান', teacher: 'Md. Kamrul Hasan', room: 'Room 102' },
  { id: 'rt_05', day: 'Saturday', time: '05:15 PM - 06:45 PM', classGrade: 'Class 9', subject: 'General Math', subjectBn: 'সাধারণ গণিত', teacher: 'Abdur Rohoman', room: 'Room 202' },

  // Sunday
  { id: 'rt_06', day: 'Sunday', time: '07:30 AM - 09:00 AM', classGrade: 'Class 11', subject: 'Physics 1st Paper', subjectBn: 'পদার্থবিজ্ঞান ১ম পত্র', teacher: 'Md. Kamrul Hasan', room: 'Room 301' },
  { id: 'rt_07', day: 'Sunday', time: '09:15 AM - 10:45 AM', classGrade: 'Class 10', subject: 'Chemistry', subjectBn: 'রসায়ন', teacher: 'Dr. Shamima Nasrin', room: 'Room 201' },
  { id: 'rt_08', day: 'Sunday', time: '11:00 AM - 12:30 PM', classGrade: 'Class 9', subject: 'English 1st Paper', subjectBn: 'ইংরেজি ১ম পত্র', teacher: 'Rafiqul Islam', room: 'Room 202' },
  { id: 'rt_09', day: 'Sunday', time: '03:30 PM - 05:00 PM', classGrade: 'Class 6', subject: 'Mathematics', subjectBn: 'গণিত', teacher: 'Abdur Rohoman', room: 'Room 101' },
  { id: 'rt_10', day: 'Sunday', time: '05:15 PM - 06:45 PM', classGrade: 'Class 12', subject: 'Higher Math 2nd', subjectBn: 'উচ্চতর গণিত ২য় পত্র', teacher: 'Abdur Rohoman', room: 'Room 302' },

  // Monday
  { id: 'rt_11', day: 'Monday', time: '07:30 AM - 09:00 AM', classGrade: 'Class 10', subject: 'Biology', subjectBn: 'জীববিজ্ঞান', teacher: 'Dr. Shamima Nasrin', room: 'Room 201' },
  { id: 'rt_12', day: 'Monday', time: '09:15 AM - 10:45 AM', classGrade: 'Class 12', subject: 'Physics 2nd Paper', subjectBn: 'পদার্থবিজ্ঞান ২য় পত্র', teacher: 'Md. Kamrul Hasan', room: 'Room 302' },
  { id: 'rt_13', day: 'Monday', time: '11:00 AM - 12:30 PM', classGrade: 'Class 7', subject: 'Mathematics', subjectBn: 'গণিত', teacher: 'Abdur Rohoman', room: 'Room 102' },
  { id: 'rt_14', day: 'Monday', time: '04:00 PM - 05:30 PM', classGrade: 'Class 11', subject: 'ICT Programming', subjectBn: 'আইসিটি সি প্রোগ্রামিং', teacher: 'Engr. Tanzeem Hossain', room: 'Computer Lab' },

  // Tuesday
  { id: 'rt_15', day: 'Tuesday', time: '07:30 AM - 09:00 AM', classGrade: 'Class 10', subject: 'English 2nd Paper', subjectBn: 'ইংরেজি ২য় পত্র', teacher: 'Rafiqul Islam', room: 'Room 201' },
  { id: 'rt_16', day: 'Tuesday', time: '09:15 AM - 10:45 AM', classGrade: 'Class 9', subject: 'Higher Math', subjectBn: 'উচ্চতর গণিত', teacher: 'Abdur Rohoman', room: 'Room 202' },
  { id: 'rt_17', day: 'Tuesday', time: '11:00 AM - 12:30 PM', classGrade: 'Class 12', subject: 'ICT', subjectBn: 'তথ্য ও যোগাযোগ প্রযুক্তি', teacher: 'Engr. Tanzeem Hossain', room: 'Computer Lab' },
  { id: 'rt_18', day: 'Tuesday', time: '04:00 PM - 05:30 PM', classGrade: 'Class 8', subject: 'Mathematics', subjectBn: 'গণিত', teacher: 'Abdur Rohoman', room: 'Room 102' },

  // Wednesday
  { id: 'rt_19', day: 'Wednesday', time: '07:30 AM - 09:00 AM', classGrade: 'Class 10', subject: 'Higher Math Revision', subjectBn: 'উচ্চতর গণিত প্র্যাকটিস', teacher: 'Abdur Rohoman', room: 'Room 201' },
  { id: 'rt_20', day: 'Wednesday', time: '09:15 AM - 10:45 AM', classGrade: 'Class 11', subject: 'Chemistry', subjectBn: 'রসায়ন', teacher: 'Dr. Shamima Nasrin', room: 'Science Lab 1' },
  { id: 'rt_21', day: 'Wednesday', time: '03:30 PM - 05:00 PM', classGrade: 'Class 9', subject: 'Physics Mechanics', subjectBn: 'পদার্থবিজ্ঞান বলবিদ্যা', teacher: 'Md. Kamrul Hasan', room: 'Room 202' },

  // Thursday
  { id: 'rt_22', day: 'Thursday', time: '08:00 AM - 10:00 AM', classGrade: 'Class 10', subject: 'Weekly Model Test & Evaluation', subjectBn: 'সাপ্তাহিক মডেল টেস্ট ও মূল্যায়ন', teacher: 'Faculty Board', room: 'Auditorium Hall' },
  { id: 'rt_23', day: 'Thursday', time: '10:30 AM - 12:30 PM', classGrade: 'Class 12', subject: 'HSC Board Question Solve', subjectBn: 'বোর্ড প্রশ্ন সমাধান ক্লাস', teacher: 'Abdur Rohoman & Kamrul Hasan', room: 'Room 301' }
];

export const initialPayments: PaymentTransaction[] = [
  {
    id: 'pay_01',
    voucherNo: 'ARA-2026-0891',
    studentId: 'std_1001',
    studentName: 'Tanvir Ahmed',
    studentRoll: '1001',
    classGrade: 'Class 10',
    feeMonth: 'October 2026',
    feeType: 'Tuition Fee',
    amount: 2500,
    method: 'bkash',
    trxId: 'BK9X89L74Q',
    date: '2026-10-04 10:25 AM',
    status: 'paid',
    receivedBy: 'Automated MFS Gateway'
  },
  {
    id: 'pay_02',
    voucherNo: 'ARA-2026-0892',
    studentId: 'std_1001',
    studentName: 'Tanvir Ahmed',
    studentRoll: '1001',
    classGrade: 'Class 10',
    feeMonth: 'November 2026',
    feeType: 'Tuition Fee',
    amount: 2500,
    method: 'nagad',
    trxId: 'NG7761A9P',
    date: '2026-11-02 02:45 PM',
    status: 'paid',
    receivedBy: 'Automated MFS Gateway'
  },
  {
    id: 'pay_03',
    voucherNo: 'ARA-2026-0885',
    studentId: 'std_0805',
    studentName: 'Mehedi Hasan',
    studentRoll: '0805',
    classGrade: 'Class 8',
    feeMonth: 'November 2026',
    feeType: 'Tuition Fee',
    amount: 2000,
    method: 'cash',
    trxId: 'CSH-REC-4412',
    date: '2026-11-01 11:15 AM',
    status: 'paid',
    receivedBy: 'Accountant (Mr. Mokhlesur)'
  },
  {
    id: 'pay_04',
    voucherNo: 'ARA-2026-0870',
    studentId: 'std_0703',
    studentName: 'Rayhan Kabir',
    studentRoll: '0703',
    classGrade: 'Class 7',
    feeMonth: 'November 2026',
    feeType: 'Tuition Fee',
    amount: 1800,
    method: 'rocket',
    trxId: 'ROC-9938210',
    date: '2026-11-03 04:10 PM',
    status: 'paid',
    receivedBy: 'Automated MFS Gateway'
  },
  {
    id: 'pay_05',
    voucherNo: 'ARA-2026-PEND-01',
    studentId: 'std_1201',
    studentName: 'Nusrat Jahan',
    studentRoll: '1201',
    classGrade: 'Class 12',
    feeMonth: 'November 2026',
    feeType: 'Tuition Fee',
    amount: 3200,
    method: 'bkash',
    date: '2026-11-01',
    status: 'pending',
    receivedBy: 'Pending Verification'
  },
  {
    id: 'pay_06',
    voucherNo: 'ARA-2026-PEND-02',
    studentId: 'std_1104',
    studentName: 'Ayesha Siddika',
    studentRoll: '1104',
    classGrade: 'Class 11',
    feeMonth: 'November 2026',
    feeType: 'Tuition Fee',
    amount: 3000,
    method: 'nagad',
    date: '2026-11-01',
    status: 'overdue',
    receivedBy: 'Payment Overdue Notice Sent'
  }
];

export const initialNotices: Notice[] = [
  {
    id: 'ntc_01',
    title: 'SSC 2027 Pre-Test Model Exam Schedule Published',
    titleBn: 'এসএসসি ২০২৭ প্রি-টেস্ট মডেল টেস্ট পরীক্ষার চূড়ান্ত সময়সূচি প্রকাশ',
    description: 'Special model tests for Class 10 will begin from November 15. Admit cards will be issued from the office desk only upon fee dues clearance.',
    descriptionBn: '১০ম শ্রেণির শিক্ষার্থীদের জন্য ১৫ই নভেম্বর থেকে বিশেষ মডেল টেস্ট শুরু হবে। প্রবেশপত্র সংগ্রহের পূর্বে সকল বকেয়া ফি পরিশোধ নিশ্চিত করতে অনুরোধ করা হলো।',
    date: '2026-11-03',
    category: 'exam',
    targetAudience: 'Class 9-10',
    isImportant: true
  },
  {
    id: 'ntc_02',
    title: 'HSC Weekly Physics-Chemistry Combined Evaluation Test',
    titleBn: 'এইচএসসি সাপ্তাহিক পদার্থ ও রসায়ন সম্মিলিত মূল্যায়ন পরীক্ষা',
    description: 'Mandatory 50-mark written and CQ test for Class 11 and 12 this coming Friday at 9:00 AM sharp. Bring standard scientific calculator and geometry box.',
    descriptionBn: 'আগামী শুক্রবার সকাল ৯টায় ১১শ ও১২শ শ্রেণির ৫০ নম্বরের লিখিত ও সিইউ সৃজনশীল পরীক্ষা অনুষ্ঠিত হবে। সায়েন্টিফিক ক্যালকুলেটর সঙ্গে রাখা বাধ্যতামূলক।',
    date: '2026-11-02',
    category: 'exam',
    targetAudience: 'Class 11-12',
    isImportant: true
  },
  {
    id: 'ntc_03',
    title: 'Class 6-8 Friday Problem Solving & Math Olympiad Foundation',
    titleBn: '৬ষ্ঠ-৮ম শ্রেণির জন্য বিশেষ গণিত সমস্যা সমাধান ও অলিম্পিয়াড প্রস্তুতি কর্মশালা',
    description: 'Special free conceptual workshop conducted by Founder Abdur Rohoman sir to strengthen fundamental arithmetic and algebra logic.',
    descriptionBn: 'পাটিগণিত ও বীজগণিতের মৌলিক ভিত্তি মজবুত করার জন্য প্রতিষ্ঠাতা আব্দুর রহমান স্যারের পরিচালনায় বিশেষ কর্মশালা অনুষ্ঠিত হবে।',
    date: '2026-10-30',
    category: 'general',
    targetAudience: 'Class 6-8',
    isImportant: false
  },
  {
    id: 'ntc_04',
    title: 'Automated bKash & Nagad Online Fee Portal Now Fully Active',
    titleBn: 'বিকাশ ও নগদ ডিজিটাল ফি ট্র্যাকিং পোর্টাল এখন স্বয়ংক্রিয়ভাবে চালু',
    description: 'Students and guardians can now pay monthly tuition and exam fees securely via bKash, Nagad, and Rocket with instant digital money receipt generation.',
    descriptionBn: 'শিক্ষার্থী ও অভিভাবকগণ এখন ঘরে বসেই বিকাশ, নগদ ও রকেটের মাধ্যমে ফি পরিশোধ করে ডিজিটাল মানি রিসিট ডাউনলোড ও প্রিন্ট করতে পারবেন।',
    date: '2026-10-25',
    category: 'urgent',
    targetAudience: 'All',
    isImportant: true
  }
];

export const initialFreeVideos: FreeVideoLecture[] = [
  {
    id: 'vid_01',
    title: 'SSC Physics: Motion & Equations of Kinetics (গতি ও গতির সমীকরণ)',
    titleBn: 'এসএসসি পদার্থবিজ্ঞান: গতি ও গতির ৪টি মৌলিক সমীকরণের সহজ প্রতিপাদন',
    subject: 'Physics',
    subjectBn: 'পদার্থবিজ্ঞান',
    classGrade: 'Class 10',
    duration: '38:45',
    instructor: 'Md. Kamrul Hasan',
    videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    embedId: 'physics_kinematics_masterclass',
    description: 'Clear graphical derivation of v = u + at, s = ut + 0.5at^2, and v^2 = u^2 + 2as with 5 board exam CQ problem solves.',
    descriptionBn: 'গতির সমীকরণগুলোর প্রমাণ, গ্রাফ বিশ্লেষণ এবং বিগত ৫ বছরের বোর্ড পরীক্ষার সৃজনশীল প্রশ্নের সমাধান।',
    views: 4820,
    noteFileTitle: 'Class10_Physics_Ch2_Equations_Notes.pdf'
  },
  {
    id: 'vid_02',
    title: 'Class 10 Higher Math: Coordinate Geometry & Area of Polygon',
    titleBn: '১০ম শ্রেণি উচ্চতর গণিত: স্থানাঙ্ক জ্যামিতি ও বহুভুজের ক্ষেত্রফল নির্ণয়',
    subject: 'Higher Math',
    subjectBn: 'উচ্চতর গণিত',
    classGrade: 'Class 10',
    duration: '45:10',
    instructor: 'Abdur Rohoman',
    videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    embedId: 'hmath_coord_geom',
    description: 'Master distance formula, slope calculation, collinearity test, and anti-clockwise polygon area calculation with shortcut tricks.',
    descriptionBn: 'দূরত্ব নির্ণয়, ঢাল, সমরেখতা পরীক্ষা এবং ঘড়ির কাঁটার বিপরীতক্রমে বহুভুজের ক্ষেত্রফল নির্ণয়ের সুপার শর্টকাট।',
    views: 6150,
    noteFileTitle: 'HigherMath_Coordinate_Geometry_CheatSheet.pdf'
  },
  {
    id: 'vid_03',
    title: 'HSC Chemistry: Periodic Table Trends & Hybridization (sp, sp2, sp3)',
    titleBn: 'এইচএসসি রসায়ন: পর্যায়বৃত্ত ধর্মের ট্রেন্ড এবং অরবিটাল সংকরায়ন ম্যাজিক রুল',
    subject: 'Chemistry',
    subjectBn: 'রসায়ন',
    classGrade: 'Class 12',
    duration: '52:20',
    instructor: 'Dr. Shamima Nasrin',
    videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    embedId: 'chem_hybridization',
    description: 'Steric number rule to determine hybridization within 10 seconds. Bond angle anomaly explanation in H2O and NH3.',
    descriptionBn: 'স্টেরিক নাম্বার নিয়মে ১০ সেকেন্ডে সংকরায়ন নির্ণয়। H2O ও NH3 এর বন্ধন কোণের পরিবর্তন সংক্রান্ত ব্যাখ্যা।',
    views: 8940,
    noteFileTitle: 'HSC_Chemistry_Hybridization_Summary.pdf'
  },
  {
    id: 'vid_04',
    title: 'Class 8 Science: Force, Pressure and Pascal’s Principle',
    titleBn: '৮ম শ্রেণি বিজ্ঞান: বল ও চাপ, আর্কিমিডিসের নীতি এবং প্যাসকেলের সূত্র',
    subject: 'General Science',
    subjectBn: 'সাধারণ বিজ্ঞান',
    classGrade: 'Class 8',
    duration: '32:15',
    instructor: 'Md. Kamrul Hasan',
    videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    embedId: 'science_pressure',
    description: 'Buoyancy, density calculation, hydraulic lift mechanism explained with practical real-life animations.',
    descriptionBn: 'প্লবতা, ঘনত্বের ধারণা ও হাইড্রলিক লিফটের কার্যপদ্ধতি সহজ উদাহরণের মাধ্যমে উপস্থাপন।',
    views: 3410,
    noteFileTitle: 'Class8_Science_Ch8_Pressure_Summary.pdf'
  },
  {
    id: 'vid_05',
    title: 'HSC ICT: Number System Conversions (Binary, Decimal, Octal, Hex)',
    titleBn: 'এইচএসসি আইসিটি: সংখ্যা পদ্ধতির রূপান্তর (বাইনারি, অক্টাল, ডেসিমাল ও হেক্সাডেসিমাল)',
    subject: 'ICT',
    subjectBn: 'আইসিটি',
    classGrade: 'Class 11',
    duration: '41:00',
    instructor: 'Engr. Tanzeem Hossain',
    videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    embedId: 'ict_number_systems',
    description: 'Learn rapid 8421 and 421 code methods for base conversions and two’s complement subtraction with zero errors.',
    descriptionBn: '৮৪২১ এবং ৪২১ কোড পদ্ধতিতে নিমেষেই সংখ্যা রূপান্তর এবং ২ এর পরিপূরক বিয়োগের শতভাগ নির্ভুল নিয়ম।',
    views: 7320,
    noteFileTitle: 'HSC_ICT_Number_Systems_Guide.pdf'
  },
  {
    id: 'vid_06',
    title: 'Class 9 English 2nd Paper: Right Form of Verbs & Modifiers',
    titleBn: '৯ম শ্রেণি ইংরেজি ২য় পত্র: রাইট ফর্ম অফ ভার্বসের ১৫টি গোল্ডেন রুল',
    subject: 'English',
    subjectBn: 'ইংরেজি ২য় পত্র',
    classGrade: 'Class 9',
    duration: '35:50',
    instructor: 'Rafiqul Islam',
    videoUrl: 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ',
    embedId: 'eng_right_form_verbs',
    description: 'Eliminate confusion around subject-verb agreement, conditional sentences, and past participle usage in board exams.',
    descriptionBn: 'সাবজেক্ট-ভার্ব এগ্রিমেন্ট, কন্ডিশনাল ও প্রিপজিশনাল রুলসের সহজ কৌশল এবং বোর্ড প্রশ্ন সমাধান।',
    views: 4290,
    noteFileTitle: 'English_Right_Form_Of_Verbs_Golden_Rules.pdf'
  }
];
