import React, { useState } from 'react';
import { Copy, Check, Download, FileCode, Terminal } from 'lucide-react';
import { PYTHON_CALCULATOR_SOURCE } from '../logic/smartCalculatorCode';

export const PythonSourceViewer: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(PYTHON_CALCULATOR_SOURCE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([PYTHON_CALCULATOR_SOURCE], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = 'smart_calculator.py';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-7 space-y-5">
      {/* Barra de Ações Superior */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <FileCode className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <span>smart_calculator.py</span>
              <span className="text-xs font-mono font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60">
                Python 3.x
              </span>
            </h2>
            <p className="text-xs text-slate-500">
              Código completo, organizado e comentado para você estudar e rodar na sua máquina
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="px-3.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-1.5 transition-all shadow-xs"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-500" />
                <span>Copiar Código</span>
              </>
            )}
          </button>

          <button
            onClick={handleDownload}
            className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Baixar .py</span>
          </button>
        </div>
      </div>

      {/* Instruções de execução no terminal do computador */}
      <div className="bg-slate-100/80 border border-slate-200/80 rounded-xl p-3.5 text-xs text-slate-700 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 font-mono">
          <Terminal className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Como rodar no seu computador:</span>
          <code className="bg-white px-2 py-1 rounded text-slate-900 border border-slate-200 select-all">
            python smart_calculator.py
          </code>
        </div>
        <span className="text-slate-500 text-[11px] hidden md:inline">
          Requer Python 3 instalado
        </span>
      </div>

      {/* Bloco de Código com Sintaxe */}
      <div className="relative rounded-xl overflow-hidden border border-slate-800 bg-slate-950 text-slate-200 shadow-inner">
        <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
          <span>smart_calculator.py</span>
          <span>UTF-8 · 112 linhas</span>
        </div>
        <pre className="p-4 sm:p-5 text-xs sm:text-sm font-mono overflow-x-auto leading-relaxed max-h-[550px] scrollbar-thin text-slate-300">
          <code>{PYTHON_CALCULATOR_SOURCE}</code>
        </pre>
      </div>
    </div>
  );
};
