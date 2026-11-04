import React from 'react';
import { PaymentTransaction, Language } from '../types';
import { useTranslation } from '../utils/translations';
import { X, Printer, CheckCircle2, GraduationCap } from 'lucide-react';

interface PaymentReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: PaymentTransaction | null;
  language: Language;
}

export const PaymentReceiptModal: React.FC<PaymentReceiptModalProps> = ({
  isOpen,
  onClose,
  transaction,
  language
}) => {
  const t = useTranslation(language);

  if (!isOpen || !transaction) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Action Bar (hidden in print) */}
        <div className="no-print p-4 bg-slate-100 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{language === 'bn' ? 'অফিসিয়াল মানি রিসিট ভাউচার' : 'Official Coaching Fee Voucher'}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-xs transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{t.downloadReceipt}</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Official Receipt Body */}
        <div className="p-6 sm:p-8 bg-white print:p-0">
          {/* Academy Header */}
          <div className="text-center pb-5 border-b-2 border-slate-900">
            <div className="inline-flex items-center justify-center gap-2 mb-1">
              <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {language === 'bn' ? 'আব্দুর রহমান একাডেমি' : 'ABDUR ROHOMAN ACADEMY'}
              </h2>
            </div>
            <p className="text-xs text-slate-600 font-medium">
              {language === 'bn'
                ? '৬ষ্ঠ থেকে ১২শ শ্রেণি একাডেমিক কোচিং ও বোর্ড পরীক্ষা স্পেশাল ব্যাচ'
                : 'Premier Academic Coaching Center for Class 6 to 12'}
            </p>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Dhaka, Bangladesh · Helpline: +880 1711-000001 · www.abdurrohomanacademy.edu.bd
            </p>
            <div className="mt-3 inline-block px-4 py-1 bg-slate-900 text-white text-[11px] font-bold uppercase tracking-widest rounded-full">
              {language === 'bn' ? 'টাকা জমার অফিশিয়াল রশিদ (MONEY RECEIPT)' : 'OFFICIAL MONEY RECEIPT'}
            </div>
          </div>

          {/* Voucher & Date row */}
          <div className="py-4 flex flex-wrap items-center justify-between text-xs border-b border-slate-200 gap-2">
            <div>
              <span className="text-slate-500">{t.voucherNo}: </span>
              <span className="font-mono font-bold text-slate-900">{transaction.voucherNo}</span>
            </div>
            <div>
              <span className="text-slate-500">{t.paidDate}: </span>
              <span className="font-medium text-slate-800">{transaction.date}</span>
            </div>
          </div>

          {/* Student Particulars Grid */}
          <div className="py-4 grid grid-cols-2 gap-y-2.5 gap-x-4 text-xs border-b border-slate-200">
            <div>
              <div className="text-[11px] text-slate-500">{language === 'bn' ? 'শিক্ষার্থীর নাম' : 'Student Name'}</div>
              <div className="font-bold text-slate-900 text-sm">{transaction.studentName}</div>
            </div>
            <div>
              <div className="text-[11px] text-slate-500">{language === 'bn' ? 'শ্রেণি ও রোল' : 'Class & Roll No'}</div>
              <div className="font-bold text-slate-900">{transaction.classGrade} (Roll: {transaction.studentRoll})</div>
            </div>
            <div>
              <div className="text-[11px] text-slate-500">{language === 'bn' ? 'ফির মাস ও ধরন' : 'Fee Month & Category'}</div>
              <div className="font-medium text-slate-800">{transaction.feeMonth} · {transaction.feeType}</div>
            </div>
            <div>
              <div className="text-[11px] text-slate-500">{language === 'bn' ? 'পেমেন্ট মাধ্যম' : 'Payment Method'}</div>
              <div className="font-medium text-slate-800 uppercase flex items-center gap-1.5">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-600"></span>
                <span>{transaction.method}</span>
                {transaction.trxId && (
                  <span className="font-mono text-[11px] text-slate-500 font-semibold">({transaction.trxId})</span>
                )}
              </div>
            </div>
          </div>

          {/* Amount Box */}
          <div className="my-5 p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
            <div>
              <div className="text-xs text-slate-500">{language === 'bn' ? 'পরিশোধিত মোট অর্থ' : 'Total Amount Paid'}</div>
              <div className="text-2xl font-black text-emerald-800 font-mono tabular-nums">
                ৳ {transaction.amount.toLocaleString()} BDT
              </div>
            </div>
            <div className="text-right">
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-lg border border-emerald-300">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {t.paid.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Stamp & Signatures */}
          <div className="pt-6 grid grid-cols-2 gap-8 items-end">
            <div>
              <div className="inline-block p-2.5 border-2 border-dashed border-emerald-700/60 rounded-xl text-center">
                <div className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">
                  Abdur Rohoman Academy
                </div>
                <div className="text-[9px] text-emerald-700 font-medium">ACCOUNTS SECTION · VERIFIED</div>
                <div className="text-[8px] text-slate-500 font-mono mt-0.5">AUTO-SEAL 2026-27</div>
              </div>
            </div>
            <div className="text-right">
              <div className="border-t border-slate-400 pt-1 text-xs font-semibold text-slate-700">
                {language === 'bn' ? 'অনুমোদিত স্বাক্ষর' : 'Authorized Signature'}
              </div>
              <div className="text-[10px] text-slate-400">Head of Accounts & Administration</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
