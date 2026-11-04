import React from 'react';
import { Language, Role } from '../types';
import { useTranslation } from '../utils/translations';
import { GraduationCap, LogIn, LogOut, UserCheck, Globe, Shield, BookOpen } from 'lucide-react';

interface NavbarProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  activeRole: Role;
  activeUserName?: string;
  onOpenAuth: (defaultRole?: Role) => void;
  onLogout: () => void;
  activeTab: string;
  onSelectTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  onLanguageChange,
  activeRole,
  activeUserName,
  onOpenAuth,
  onLogout,
  activeTab,
  onSelectTab,
}) => {
  const t = useTranslation(language);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 py-3.5">
        {/* Zone 1: Brand Wordmark */}
        <div 
          onClick={() => onSelectTab('home')}
          className="flex items-center gap-2.5 cursor-pointer select-none shrink-0"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center shadow-sm">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <div className="text-base sm:text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap leading-tight">
              {language === 'bn' ? 'আব্দুর রহমান একাডেমি' : 'Abdur Rohoman Academy'}
            </div>
            <div className="text-[11px] font-medium text-emerald-700 uppercase tracking-wider">
              {language === 'bn' ? '৬ষ্ঠ - ১২শ শ্রেণি কোচিং' : 'Class 6 - 12 Coaching'}
            </div>
          </div>
        </div>

        {/* Zone 2: Navigation Links (single line, clean unboxed typography) */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
          <button
            onClick={() => onSelectTab('home')}
            className={`transition-colors whitespace-nowrap pb-0.5 ${
              activeTab === 'home'
                ? 'text-emerald-700 font-semibold border-b-2 border-emerald-700'
                : 'hover:text-slate-900'
            }`}
          >
            {t.home}
          </button>
          <button
            onClick={() => onSelectTab('courses')}
            className={`transition-colors whitespace-nowrap pb-0.5 ${
              activeTab === 'courses'
                ? 'text-emerald-700 font-semibold border-b-2 border-emerald-700'
                : 'hover:text-slate-900'
            }`}
          >
            {t.courseModules}
          </button>
          <button
            onClick={() => onSelectTab('routine')}
            className={`transition-colors whitespace-nowrap pb-0.5 ${
              activeTab === 'routine'
                ? 'text-emerald-700 font-semibold border-b-2 border-emerald-700'
                : 'hover:text-slate-900'
            }`}
          >
            {t.classRoutine}
          </button>
          <button
            onClick={() => onSelectTab('free-videos')}
            className={`transition-colors whitespace-nowrap pb-0.5 ${
              activeTab === 'free-videos'
                ? 'text-emerald-700 font-semibold border-b-2 border-emerald-700'
                : 'hover:text-slate-900'
            }`}
          >
            {t.freeLectures}
          </button>
          <button
            onClick={() => onSelectTab('notices')}
            className={`transition-colors whitespace-nowrap pb-0.5 ${
              activeTab === 'notices'
                ? 'text-emerald-700 font-semibold border-b-2 border-emerald-700'
                : 'hover:text-slate-900'
            }`}
          >
            {t.notices}
          </button>
          {activeRole && (
            <button
              onClick={() => onSelectTab('dashboard')}
              className={`transition-colors whitespace-nowrap pb-0.5 ${
                activeTab === 'dashboard'
                  ? 'text-emerald-700 font-semibold border-b-2 border-emerald-700'
                  : 'text-slate-900 font-medium hover:text-emerald-700'
              }`}
            >
              {t.dashboard}
            </button>
          )}
        </nav>

        {/* Zone 3: Language Toggle & User / Auth Actions */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Language Switcher */}
          <button
            onClick={() => onLanguageChange(language === 'en' ? 'bn' : 'en')}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            title="Toggle Language / ভাষা পরিবর্তন করুন"
          >
            <Globe className="w-3.5 h-3.5 text-emerald-700" />
            <span>{language === 'en' ? 'বাংলা' : 'English'}</span>
          </button>

          {activeRole ? (
            <div className="flex items-center gap-2">
              <div 
                onClick={() => onSelectTab('dashboard')}
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200/80 rounded-lg cursor-pointer hover:bg-emerald-100/60 transition-colors"
              >
                <UserCheck className="w-4 h-4 text-emerald-700" />
                <div className="text-left">
                  <div className="text-xs font-semibold text-emerald-950 leading-tight">
                    {activeUserName || activeRole.toUpperCase()}
                  </div>
                  <div className="text-[10px] text-emerald-700 capitalize font-medium">
                    {language === 'bn' 
                      ? (activeRole === 'admin' ? 'এডমিন' : activeRole === 'teacher' ? 'শিক্ষক' : 'শিক্ষার্থী')
                      : activeRole}
                  </div>
                </div>
              </div>
              <button
                onClick={onLogout}
                className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                title={t.logout}
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => onOpenAuth()}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-sm transition-colors whitespace-nowrap"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>{t.login}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
