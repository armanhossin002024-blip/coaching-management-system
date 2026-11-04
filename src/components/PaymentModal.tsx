import React, { useState } from 'react';
import { PaymentMethod, PaymentTransaction, Student, Language } from '../types';
import { useTranslation } from '../utils/translations';
import { X, CheckCircle2, ShieldCheck, Smartphone, AlertCircle, ArrowRight, Loader2 } from 'lucide-react';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: Student;
  onPaymentSuccess: (transaction: PaymentTransaction) => void;
  language: Language;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  student,
  onPaymentSuccess,
  language,
}) => {
  const t = useTranslation(language);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('bkash');
  const [accountNumber, setAccountNumber] = useState(student.phone.replace('-', ''));
  const [pinNumber, setPinNumber] = useState('12345');
  const [feeMonth, setFeeMonth] = useState('November 2026');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const payableAmount = student.dueAmount > 0 ? student.dueAmount : student.monthlyFee;

  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!accountNumber || accountNumber.length < 11) {
      setError(language === 'bn' ? 'সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন' : 'Please enter a valid 11-digit mobile number');
      return;
    }

    if (!pinNumber) {
      setError(language === 'bn' ? 'পিন নম্বর দিন' : 'Please enter PIN code');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const randomTrx = (prefix: string) =>
        prefix + Math.random().toString(36).substring(2, 8).toUpperCase() + Math.floor(1000 + Math.random() * 9000);

      const generatedTrx =
        selectedMethod === 'bkash'
          ? randomTrx('BK')
          : selectedMethod === 'nagad'
          ? randomTrx('NG')
          : selectedMethod === 'rocket'
          ? randomTrx('RC')
          : randomTrx('CSH');

      const voucherId = `ARA-2026-${Math.floor(1000 + Math.random() * 9000)}`;

      const newTx: PaymentTransaction = {
        id: `tx_${Date.now()}`,
        voucherNo: voucherId,
        studentId: student.id,
        studentName: student.name,
        studentRoll: student.roll,
        classGrade: student.classGrade,
        feeMonth: feeMonth,
        feeType: 'Tuition Fee',
        amount: payableAmount,
        method: selectedMethod,
        trxId: generatedTrx,
        date: new Date().toLocaleString(),
        status: 'paid',
        receivedBy: selectedMethod === 'cash' ? 'Admin Cash Desk' : 'Automated MFS API'
      };

      onPaymentSuccess(newTx);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
                {language === 'bn' ? 'স্বয়ংক্রিয় ফি ট্র্যাকিং' : 'Automated Fee Gateway'}
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                {language === 'bn' ? 'কোচিং ফি পরিশোধ করুন' : 'Pay Coaching Tuition Fee'}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Student Summary Strip */}
        <div className="bg-slate-100/70 px-6 py-3 border-b border-slate-200/80 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div>
            <span className="text-slate-500">{language === 'bn' ? 'শিক্ষার্থী:' : 'Student:'} </span>
            <span className="font-semibold text-slate-800">{language === 'bn' ? student.nameBn : student.name}</span>
            <span className="text-slate-400 mx-1.5">·</span>
            <span className="text-slate-500">{student.classGrade} (Roll: {student.roll})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500">{language === 'bn' ? 'পরিশোধযোগ্য:' : 'Payable:'}</span>
            <span className="font-bold text-sm text-emerald-700 font-mono tabular-nums">৳ {payableAmount.toLocaleString()} BDT</span>
          </div>
        </div>

        {/* Payment Methods Selection */}
        <form onSubmit={handleProcessPayment} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              {t.selectMethod}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {/* bKash */}
              <button
                type="button"
                onClick={() => setSelectedMethod('bkash')}
                className={`p-3 rounded-xl border text-center transition-all ${
                  selectedMethod === 'bkash'
                    ? 'border-pink-500 bg-pink-50/60 ring-2 ring-pink-500/30'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="w-6 h-6 mx-auto rounded-full bg-pink-600 text-white font-black text-[10px] flex items-center justify-center">
                  b
                </div>
                <div className="text-xs font-bold text-slate-800 mt-1">bKash</div>
                <div className="text-[10px] text-pink-600 font-medium">বিকাশ</div>
              </button>

              {/* Nagad */}
              <button
                type="button"
                onClick={() => setSelectedMethod('nagad')}
                className={`p-3 rounded-xl border text-center transition-all ${
                  selectedMethod === 'nagad'
                    ? 'border-orange-500 bg-orange-50/60 ring-2 ring-orange-500/30'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="w-6 h-6 mx-auto rounded-full bg-orange-600 text-white font-black text-[10px] flex items-center justify-center">
                  ন
                </div>
                <div className="text-xs font-bold text-slate-800 mt-1">Nagad</div>
                <div className="text-[10px] text-orange-600 font-medium">নগদ</div>
              </button>

              {/* Rocket */}
              <button
                type="button"
                onClick={() => setSelectedMethod('rocket')}
                className={`p-3 rounded-xl border text-center transition-all ${
                  selectedMethod === 'rocket'
                    ? 'border-purple-500 bg-purple-50/60 ring-2 ring-purple-500/30'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="w-6 h-6 mx-auto rounded-full bg-purple-600 text-white font-black text-[10px] flex items-center justify-center">
                  R
                </div>
                <div className="text-xs font-bold text-slate-800 mt-1">Rocket</div>
                <div className="text-[10px] text-purple-600 font-medium">রকেট</div>
              </button>

              {/* Cash */}
              <button
                type="button"
                onClick={() => setSelectedMethod('cash')}
                className={`p-3 rounded-xl border text-center transition-all ${
                  selectedMethod === 'cash'
                    ? 'border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-600/30'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="w-6 h-6 mx-auto rounded-full bg-emerald-700 text-white font-black text-[10px] flex items-center justify-center">
                  ৳
                </div>
                <div className="text-xs font-bold text-slate-800 mt-1">Cash</div>
                <div className="text-[10px] text-emerald-700 font-medium">কাউন্টারে ক্যাশ</div>
              </button>
            </div>
          </div>

          {/* Month Selector */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t.month}
              </label>
              <select
                value={feeMonth}
                onChange={(e) => setFeeMonth(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600"
              >
                <option value="November 2026">November 2026 (চলতি মাস)</option>
                <option value="December 2026">December 2026</option>
                <option value="October 2026">October 2026</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t.feeType}
              </label>
              <input
                type="text"
                readOnly
                value="Monthly Coaching Fee"
                className="w-full px-3 py-2 text-xs bg-slate-100 border border-slate-200 text-slate-600 rounded-lg"
              />
            </div>
          </div>

          {/* Inputs for MFS */}
          {selectedMethod !== 'cash' ? (
            <div className="space-y-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <div className="flex items-center gap-1.5 text-xs font-medium text-slate-600">
                <Smartphone className="w-3.5 h-3.5 text-emerald-700" />
                <span>
                  {selectedMethod.toUpperCase()} {language === 'bn' ? 'ওয়ালেট বিস্তারিত' : 'Account Details'}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    {t.mobileNumber}
                  </label>
                  <input
                    type="text"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    placeholder="017XXXXXXXX"
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    {t.pinNumber}
                  </label>
                  <input
                    type="password"
                    value={pinNumber}
                    onChange={(e) => setPinNumber(e.target.value)}
                    placeholder="12345"
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="p-3.5 bg-emerald-50/60 rounded-xl border border-emerald-200 text-xs text-emerald-900">
              <div className="font-semibold">{language === 'bn' ? 'ক্যাশ ডিপোজিট স্লিপ' : 'Direct Cash Collection Voucher'}</div>
              <div className="text-[11px] text-emerald-700 mt-1">
                {language === 'bn'
                  ? 'একাডেমির হিসাব শাখায় ক্যাশ জমা দিয়ে ইনস্ট্যান্ট অটো-জেনারেটেড রিসিট গ্রহণ করুন।'
                  : 'Submit cash directly at the academy cash counter to record payment and issue official receipt.'}
              </div>
            </div>
          )}

          {error && (
            <div className="flex items-center gap-2 p-2.5 bg-rose-50 border border-rose-200 text-rose-700 rounded-lg text-xs">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Action Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isProcessing}
              className={`w-full flex items-center justify-center gap-2 py-3 px-4 text-sm font-bold text-white rounded-xl shadow-md transition-all ${
                selectedMethod === 'bkash'
                  ? 'bg-pink-600 hover:bg-pink-700'
                  : selectedMethod === 'nagad'
                  ? 'bg-orange-600 hover:bg-orange-700'
                  : selectedMethod === 'rocket'
                  ? 'bg-purple-700 hover:bg-purple-800'
                  : 'bg-emerald-700 hover:bg-emerald-800'
              } disabled:opacity-60`}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{language === 'bn' ? 'পেমেন্ট প্রসেসিং হচ্ছে...' : 'Processing Gateway...'}</span>
                </>
              ) : (
                <>
                  <span>
                    {language === 'bn' ? '৳ ' : 'Pay ৳ '}
                    {payableAmount.toLocaleString()} {t.confirmPayment}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Security badge */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
          <span>🔒 256-bit SSL Encrypted Demo Gateway</span>
          <span className="font-medium text-emerald-700">Abdur Rohoman Academy</span>
        </div>
      </div>
    </div>
  );
};
