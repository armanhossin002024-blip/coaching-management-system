import React, { useState } from 'react';
import { FreeVideoLecture, Language } from '../types';
import { useTranslation } from '../utils/translations';
import { X, Play, Pause, Download, Clock, User, CheckCircle, FileText, Share2, Volume2, Maximize2 } from 'lucide-react';

interface VideoPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  video: FreeVideoLecture | null;
  language: Language;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  isOpen,
  onClose,
  video,
  language
}) => {
  const t = useTranslation(language);
  const [isPlaying, setIsPlaying] = useState(true);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [activeSpeed, setActiveSpeed] = useState('1.0x');

  if (!isOpen || !video) return null;

  const handleDownloadNotes = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="px-5 py-3.5 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 text-[11px] font-bold bg-emerald-600 rounded text-white">
              {video.classGrade}
            </span>
            <span className="text-xs text-slate-300 font-medium">
              {language === 'bn' ? video.subjectBn : video.subject}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Canvas Stage */}
        <div className="relative bg-slate-950 aspect-video w-full flex items-center justify-center overflow-hidden group">
          {/* Simulated Video Feed Graphic */}
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900 to-emerald-950/40 flex flex-col justify-between p-6">
            <div className="flex justify-between items-start">
              <div className="px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-lg text-xs text-white">
                Abdur Rohoman Academy Masterclass
              </div>
              <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-md border border-emerald-500/20 font-mono">
                <span>HD 1080p</span>
              </div>
            </div>

            <div className="text-center my-auto">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-16 h-16 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg hover:bg-emerald-500 hover:scale-105 transition-all mx-auto cursor-pointer"
              >
                {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
              </button>
              <div className="mt-3 text-white text-sm font-semibold tracking-wide">
                {language === 'bn' ? video.titleBn : video.title}
              </div>
              <div className="text-xs text-slate-400 mt-1">
                {language === 'bn' ? 'প্রভাষক:' : 'Instructor:'} {video.instructor}
              </div>
            </div>

            {/* Video Controls Scrubber Bar */}
            <div className="space-y-2">
              <div className="w-full bg-white/20 h-1.5 rounded-full cursor-pointer relative overflow-hidden">
                <div className="bg-emerald-500 h-full w-2/5 rounded-full"></div>
              </div>
              <div className="flex items-center justify-between text-xs text-white/80">
                <div className="flex items-center gap-3">
                  <button onClick={() => setIsPlaying(!isPlaying)}>
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  <span className="font-mono text-[11px]">14:22 / {video.duration}</span>
                  <Volume2 className="w-4 h-4" />
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex gap-1 text-[11px] font-mono bg-white/10 rounded px-1.5 py-0.5">
                    {['1.0x', '1.25x', '1.5x'].map((spd) => (
                      <button
                        key={spd}
                        onClick={() => setActiveSpeed(spd)}
                        className={`px-1 rounded ${activeSpeed === spd ? 'bg-emerald-600 text-white font-bold' : 'hover:text-white'}`}
                      >
                        {spd}
                      </button>
                    ))}
                  </div>
                  <Maximize2 className="w-4 h-4 cursor-pointer" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Video Information & Lecture Notes Bar */}
        <div className="p-5 sm:p-6 bg-white overflow-y-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                {language === 'bn' ? video.titleBn : video.title}
              </h3>
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1.5">
                <span className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-emerald-700" />
                  {video.instructor}
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {video.duration}
                </span>
                <span>·</span>
                <span className="font-mono">{video.views.toLocaleString()} {language === 'bn' ? 'বার দেখা হয়েছে' : 'views'}</span>
              </div>
            </div>

            {/* Download Notes Action */}
            <div className="shrink-0">
              <button
                onClick={handleDownloadNotes}
                className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-sm transition-colors"
              >
                {downloadSuccess ? (
                  <>
                    <CheckCircle className="w-4 h-4 text-emerald-200" />
                    <span>{language === 'bn' ? 'নোট ডাউনলোড সম্পন্ন!' : 'Downloaded!'}</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>{t.lectureNotes}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Description & Key Concepts */}
          <div className="pt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-2">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                {language === 'bn' ? 'লেকচার পরিচিতি ও সিলেবাস টপিক' : 'Lecture Overview & Key Concepts'}
              </h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                {language === 'bn' ? video.descriptionBn : video.description}
              </p>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600">
                <span className="font-bold text-emerald-800">{language === 'bn' ? 'টিচার্স স্পেশাল টিপস:' : 'Faculty Tip:'} </span>
                {language === 'bn'
                  ? 'বোর্ড পরীক্ষার সৃজনশীল প্রশ্নের (CQ) জন্য এই টপিকের সমীকরণগুলোর প্রমাণ খাতায় অন্তত ৩ বার অনুশীলন করুন।'
                  : 'Practice the derivations of these key equations at least three times on paper for full CQ marks.'}
              </div>
            </div>

            {/* Note Attachment Box */}
            <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-200/80 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-950">
                <FileText className="w-4 h-4 text-emerald-700" />
                <span>{language === 'bn' ? 'সংযুক্ত হ্যান্ডনোট' : 'Attached PDF Notes'}</span>
              </div>
              <div className="text-xs text-emerald-800 font-mono truncate">
                {video.noteFileTitle || 'Academy_Official_Lecture_Notes.pdf'}
              </div>
              <div className="text-[11px] text-slate-500">
                {language === 'bn'
                  ? 'হাতে লেখা সামারি শিট, বিগত বছরের প্রশ্ন ও সমাধান সম্বলিত।'
                  : 'Contains handwritten formula cheatsheet & solved CQ board questions.'}
              </div>
              <button
                onClick={handleDownloadNotes}
                className="w-full py-1.5 px-2.5 text-xs font-semibold text-emerald-800 bg-white border border-emerald-300 rounded-lg hover:bg-emerald-100/60 transition-colors"
              >
                {t.lectureNotes} (PDF)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
