# Abdur Rohoman Academy - Coaching Management System (Class 6-12)

A comprehensive, bilingual (English & Bengali) coaching institute management web application designed specifically for **Abdur Rohoman Academy**, serving students from Class 6 to Class 12. The platform provides dedicated, authenticated dashboards for Administrators, Teachers, and Students, complete with syllabus course modules, weekly class routines, automated fee tracking (bKash, Nagad, Rocket, Cash), free video lecture hub, and real-time exam alerts and notifications.

## User Review & Critical Decisions

> [!IMPORTANT]
> The architectural direction and user flows incorporate all preferences confirmed during Phase 1 clarification:
> - **Bilingual Interface**: Seamless instant toggle between English and বাংলা (Bengali) across all portals, buttons, tables, and receipts.
> - **Payment Tracking**: Full support for Bangladeshi Mobile Financial Services (bKash, Nagad, Rocket) with transaction ID verification and printable cash money receipts with voucher IDs.
> - **Authentication Flow**: Dedicated login screens tailored for Admin, Teacher, and Student with quick demo credential fillers so evaluators can inspect every role immediately without typing.

- **Confirmed Decision 1**: Bilingual switchable UI (English / বাংলা) across navigation, dashboard widgets, and notices.
- **Confirmed Decision 2**: Automated payment tracking with bKash / Nagad / Rocket simulated payment modal and instant receipt generator.
- **Confirmed Decision 3**: Dedicated role-based authentication portal with preset demo accounts for Admin (Headmaster), Teacher (Faculty), and Student (Class 6-12).

---

## 1. Overview & Core Concept

- **What It Does**: Centralizes academy operations into three secure, intuitive portals. Administrators oversee enrollments, financial collections, teacher assignments, and announcements. Teachers manage course modules, class schedules, attendance, and study materials. Students and guardians monitor dues, complete fee payments, check routines, watch free video masterclasses, and receive instant exam alerts.
- **Target Audience**: Coaching institute administrators, subject teachers, and secondary/higher secondary students (Class 6 to Class 12) and their parents.
- **Key Value**: Replaces scattered paper receipts, lost schedules, and manual fee calculations with a unified digital campus accessible on desktop and mobile browsers.

---

## 2. User Experience & Visual Design

### Key User Flows
1. **Public Landing & Authentication**:
   - Academy brand header with Class 6-12 badge and language switcher (EN / বাং).
   - Academy stats, featured courses, free video lectures preview, and public noticeboard.
   - Dedicated sign-in selector: **Admin Portal**, **Teacher Portal**, or **Student Portal**, featuring one-click demo auto-fill for instant access.
2. **Admin Management Hub**:
   - Financial ledger: Total collections, pending dues, monthly revenue chart, and recent transaction log with bKash/Nagad/Cash breakdowns.
   - Student & Teacher directory with class filter (Class 6 to 12).
   - Fee invoice generator & receipt printer.
   - Routine editor & notice publisher with high-priority exam alert broadcast.
3. **Teacher Portal**:
   - Today's routine & classroom schedule.
   - Course syllabus tracker (topics completed vs. remaining per class).
   - Student progress and marks entry.
   - Study notes and lecture video uploading/tagging.
4. **Student Portal**:
   - My Academic Overview (enrolled class, roll number, attendance score).
   - Class Routine timetable with live "Next Class" indicator.
   - Fee Tracking & Payment: Outstanding dues breakdown, simulated bKash/Nagad checkout, and downloadable fee slips.
   - Free Class Video Library: Filterable by subject (Math, Physics, Chemistry, Biology, English, ICT) and class level.
   - Noticeboard & Exam Alerts with urgent alerts highlighted.

### Visual Identity & Theme
- **Aesthetic Direction**: Academic authority meets clean, modern SaaS precision. Dignified, trustworthy, and distraction-free.
- **Color Palette (60-30-10 Rule)**:
  - *Canvas (60%)*: Crisp off-white `#F8FAFC` and soft slate `#0F172A` in dark mode.
  - *Structural Panels (30%)*: Pure white `#FFFFFF` cards with hairline slate borders `#E2E8F0` (`#1E293B` in dark).
  - *Focal Accents (10%)*: Deep Royal Emerald `#059669` / `#047857` representing academic prestige, paired with vibrant Crimson `#DC2626` for overdue fee warnings / exam alerts, and bKash Pink `#D12053` / Nagad Orange `#F7941D` badges for payment identification.
- **Typography & Hierarchy**:
  - *Display / Headings*: `Plus Jakarta Sans`, SemiBold/Bold, balanced and high contrast.
  - *Body Text*: `Plus Jakarta Sans`, 14px–16px, high legibility.
  - *Financial & Schedules*: Tabular monospace figures (`tabular-nums font-mono`) for roll numbers, fees in ৳ (BDT), phone numbers, and time slots.
- **Anti-Slop Discipline**:
  - Zero pill containers for static metadata; clean unboxed typography with typographic separators (`·` and `/`).
  - Strict Top Bar Contract with 1-line brand wordmark, clear navigation links, and primary action.
  - All interactive controls have responsive hover states and active handlers.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Client-Side State Management with LocalStorage Persistence**
  - *Chosen Approach*: Reactive TypeScript state store with pre-populated realistic demo data (students across Class 6–12, real routine, course modules, video lectures, and fee ledger) with localStorage caching.
  - *Why*: Instant zero-latency responsiveness, safe offline demonstration, and full interactive capabilities without requiring complex backend provisioning.
  - *Alternatives Considered*: Pure static mockups (insufficient interactivity) vs. cloud database (unnecessary latency and failure points for initial evaluation).
- **Decision 2: Automated Bangladeshi Payment Simulation (bKash / Nagad / Rocket / Cash)**
  - *Chosen Approach*: Realistic payment flow modal where students enter mobile number, pin, or TrxID to simulate instant automated fee clearance, generating an authentic branded receipt with voucher number and seal.
  - *Why*: Directly satisfies the coaching center's real-world payment tracking needs in Bangladesh.
- **Decision 3: Integrated Video Lecture Player with Note Attachments**
  - *Chosen Approach*: In-app responsive video viewer modal with video controls, topic timestamps, chapter summaries, and downloadable PDF note triggers.
  - *Why*: Provides students immediate learning utility right inside the academy portal.

---

## 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Abdur Rohoman Academy                           │
│             Top Bar Navigation & Global Language Engine (EN / বাং)     │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
         ┌──────────────────────────┼──────────────────────────┐
         ▼                          ▼                          ▼
┌──────────────────┐      ┌──────────────────┐      ┌──────────────────┐
│   Public Portal  │      │  Role Auth Gate  │      │ Active Dashboard │
│ • Hero Showcase  │      │ • Admin Login    │      │ • Admin View     │
│ • Free Lectures  │      │ • Teacher Login  │      │ • Teacher View   │
│ • Course Modules │      │ • Student Login  │      │ • Student View   │
│ • Notice Board   │      │ • Demo Auto-Fill │      │ • Role Switcher  │
└──────────────────┘      └──────────────────┘      └─────────┬────────┘
                                                              │
         ┌────────────────────────────────────────────────────┴────────┐
         │                                                             │
         ▼                                                             ▼
┌─────────────────────────────────┐           ┌─────────────────────────────────┐
│     Academic Engines            │           │      Financial & Routine        │
│ • Class 6-12 Course Modules     │           │ • Automated Payment Tracking    │
│ • Weekly Routine Matrix         │           │ • bKash/Nagad/Rocket Simulator  │
│ • Video Masterclasses Hub       │           │ • Printable Money Receipts      │
│ • Notification & Exam Alert Bus │           │ • Dues & Revenue Analytics      │
└─────────────────────────────────┘           └─────────────────────────────────┘
```

### Data Model Entities
- **Student**: ID, Name, Roll, Class (6–12), Group (Science/Commerce/Arts for 9-12), Guardian Phone, Enrolled Subjects, Tuition Fee Amount, Due Amount, Payment History.
- **Teacher**: ID, Name, Designation, Subjects, Assigned Classes, Phone, Weekly Schedule.
- **CourseModule**: Class Level, Subject, Chapters/Units, Learning Objectives, Completion Percentage.
- **RoutineItem**: Day of Week, Time Slot, Class, Subject, Teacher, Room Number.
- **PaymentRecord**: Invoice ID, Student ID, Amount (৳ BDT), Method (bKash / Nagad / Rocket / Cash), TrxID, Date, Status (Paid / Pending / Overdue).
- **NoticeItem**: ID, Title, Category (Exam Alert / General / Holiday / Academic), Date, Target Audience, Priority.
- **VideoLecture**: ID, Title, Subject, Class, Duration, Thumbnail, Instructor, VideoUrl, Description.

---

## 5. Implementation Steps

1. **Brand & Entry Configuration**: Configure `index.html` and `metadata.json` with Abdur Rohoman Academy identity and bilingual meta tags.
2. **Domain Data & Localization Store**: Establish structured TypeScript models, comprehensive dummy data for classes 6 to 12, and English/Bengali dictionary.
3. **Core Shell & Top Bar**: Build the top bar adhering to the Top Bar Contract with brand wordmark, language toggle, and navigation.
4. **Authentication Experience**: Construct dedicated login cards for Admin, Teacher, and Student with demo credential auto-fill helpers.
5. **Admin Dashboard**: Implement financial analytics, student/teacher rosters, fee collection ledger, and notice dispatcher.
6. **Teacher Dashboard**: Implement daily timetable, syllabus module tracker, and exam marks recorder.
7. **Student Dashboard**: Implement enrolled courses, live weekly routine, fee payment gateway (bKash/Nagad/Rocket/Cash), and printable receipt generator.
8. **Free Video Library & Noticeboard**: Implement video player modal and priority alert banner system.
9. **Verification**: Run `compile_applet` and verify zero errors and smooth responsiveness.
