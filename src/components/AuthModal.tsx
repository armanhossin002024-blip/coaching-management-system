import React, { useState } from 'react';
import { Role, Language } from '../types';
import { useTranslation } from '../utils/translations';
import { X, ShieldCheck, UserCheck, GraduationCap, ArrowRight, Sparkles } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (role: Role, userMetadata: { id: string; name: string; roll?: string; classGrade?: string }) => void;
  language: Language;
  initialRole?: Role;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLogin,
  language,
  initialRole = 'student'
}) => {
  const t = useTranslation(language);
  const [selectedRole, setSelectedRole] = useState<'admin' | 'teacher' | 'student'>(
    initialRole === 'admin' || initialRole === 'teacher' ? initialRole : 'student'
  );

  // Form states
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleRoleSelect = (role: 'admin' | 'teacher' | 'student') => {
    setSelectedRole(role);
    setErrorMessage('');
    setIdentifier('');
    setPassword('');
  };

  const handleQuickDemoFill = (role: 'admin' | 'teacher' | 'student') => {
    setErrorMessage('');
    if (role === 'admin') {
      setIdentifier('admin@rohomanacademy.edu.bd');
      setPassword('admin123');
    } else if (role === 'teacher') {
      setIdentifier('tch_01 (Abdur Rohoman)');
      setPassword('teacher123');
    } else {
      setIdentifier('1001 (Tanvir Ahmed)');
      setPassword('std1001');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!identifier.trim()) {
      setErrorMessage(language === 'bn' ? 'অনুগ্রহ করে আইডি বা রোল নম্বর প্রদান করুন' : 'Please enter ID or Roll number');
      return;
    }

    if (selectedRole === 'admin') {
      onLogin('admin', {
        id: 'adm_01',
        name: language === 'bn' ? 'আব্দুর রহমান (অধ্যক্ষ)' : 'Abdur Rohoman (Principal)'
      });
      onClose();
    } else if (selectedRole === 'teacher') {
      onLogin('teacher', {
        id: 'tch_01',
        name: language === 'bn' ? 'আব্দুর রহমান (গণিত বিভাগ)' : 'Abdur Rohoman (Math Dept)'
      });
      onClose();
    } else {
      // Default demo student Tanvir Ahmed
      onLogin('student', {
        id: 'std_1001',
        name: language === 'bn' ? 'তানভীর আহমেদ' : 'Tanvir Ahmed',
        roll: '1001',
        classGrade: 'Class 10'
      });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
              {language === 'bn' ? 'নিরাপদ পোর্টাল সাইন-ইন' : 'Secure Portal Sign In'}
            </div>
            <h3 className="text-lg font-bold text-slate-900 mt-0.5">
              {language === 'bn' ? 'আব্দুর রহমান একাডেমি' : 'Abdur Rohoman Academy'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dedicated Separate Portal Selection Tabs */}
        <div className="p-2 bg-slate-100/80 mx-5 sm:mx-6 mt-5 rounded-xl grid grid-cols-3 gap-1">
          <button
            type="button"
            onClick={() => handleRoleSelect('student')}
            className={`flex flex-col items-center py-2 px-1 rounded-lg text-xs font-semibold transition-all ${
              selectedRole === 'student'
                ? 'bg-white text-emerald-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <GraduationCap className="w-4 h-4 mb-1" />
            <span>{t.studentPortal}</span>
          </button>
          <button
            type="button"
            onClick={() => handleRoleSelect('teacher')}
            className={`flex flex-col items-center py-2 px-1 rounded-lg text-xs font-semibold transition-all ${
              selectedRole === 'teacher'
                ? 'bg-white text-emerald-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <UserCheck className="w-4 h-4 mb-1" />
            <span>{t.teacherPortal}</span>
          </button>
          <button
            type="button"
            onClick={() => handleRoleSelect('admin')}
            className={`flex flex-col items-center py-2 px-1 rounded-lg text-xs font-semibold transition-all ${
              selectedRole === 'admin'
                ? 'bg-white text-emerald-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-4 h-4 mb-1" />
            <span>{t.adminPortal}</span>
          </button>
        </div>

        {/* Portal Information Banner */}
        <div className="px-6 pt-4 text-xs text-slate-500">
          {selectedRole === 'admin' && t.adminLoginDesc}
          {selectedRole === 'teacher' && t.teacherLoginDesc}
          {selectedRole === 'student' && t.studentLoginDesc}
        </div>

        {/* Quick Demo Fill Helper */}
        <div className="px-6 pt-3">
          <button
            type="button"
            onClick={() => handleQuickDemoFill(selectedRole)}
            className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 text-xs font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100/70 border border-emerald-200/60 rounded-lg transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.quickDemoFill} ({selectedRole.toUpperCase()})</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 pt-4 space-y-4">
          {errorMessage && (
            <div className="p-2.5 text-xs text-rose-700 bg-rose-50 border border-rose-200 rounded-lg">
              {errorMessage}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              {selectedRole === 'student' 
                ? (language === 'bn' ? 'শিক্ষার্থী রোল নং / মোবাইল' : 'Student Roll / Mobile')
                : selectedRole === 'teacher'
                ? (language === 'bn' ? 'শিক্ষক আইডি / ইমেইল' : 'Teacher ID / Email')
                : (language === 'bn' ? 'এডমিন ইউজারনেম / ইমেইল' : 'Admin Email')}
            </label>
            <input
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder={
                selectedRole === 'student'
                  ? 'e.g. 1001 or 01711234567'
                  : selectedRole === 'teacher'
                  ? 'e.g. tch_01'
                  : 'admin@academy.edu.bd'
              }
              className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              {t.password}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-sm transition-colors"
            >
              <span>{t.signIn}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        {/* Footer Guidance */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 text-center text-xs text-slate-500">
          {language === 'bn' 
            ? 'সহজ পরীক্ষার জন্য উপরে "ডেমো লগইন তথ্য ভরুন" বাটনে ক্লিক করুন।'
            : 'Click "Quick Demo Fill" above to instantly test with valid credentials.'}
        </div>
      </div>
    </div>
  );
};
