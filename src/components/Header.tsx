import React from 'react';
import { Terminal, BookOpen, Layers, FileCode, CheckCircle2 } from 'lucide-react';

export type ActiveTab = 'calculator' | 'explanation' | 'datatypes' | 'source' | 'checklist';

interface HeaderProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  historyCount: number;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange, historyCount }) => {
  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur-sm sticky top-0 z-30 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zona 1: Marca da aplicação em uma linha */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold font-mono text-lg shadow-sm">
            Py
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap">
                SmartCalculator
              </span>
              <span className="text-xs px-2 py-0.5 font-medium rounded text-emerald-800 bg-emerald-50 border border-emerald-200/60 hidden sm:inline-block">
                Python 3 Core
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden md:block">
              Calculadora simples com lógica em Python para iniciantes
            </p>
          </div>
        </div>

        {/* Zona 2: Links de navegação e seções didáticas */}
        <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-1 scrollbar-none">
          <button
            onClick={() => onTabChange('calculator')}
            className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 shrink-0 ${
              activeTab === 'calculator'
                ? 'bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200/80 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Terminal className="w-4 h-4 text-emerald-600" />
            <span>Calculadora</span>
            {historyCount > 0 && (
              <span className="text-[11px] bg-slate-200 text-slate-700 px-1.5 py-0.2 rounded-full font-mono">
                {historyCount}
              </span>
            )}
          </button>

          <button
            onClick={() => onTabChange('explanation')}
            className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 shrink-0 ${
              activeTab === 'explanation'
                ? 'bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200/80 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <BookOpen className="w-4 h-4 text-emerald-600" />
            <span>Raio-X do Código</span>
          </button>

          <button
            onClick={() => onTabChange('datatypes')}
            className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 shrink-0 ${
              activeTab === 'datatypes'
                ? 'bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200/80 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Layers className="w-4 h-4 text-emerald-600" />
            <span>Tipos de Dados</span>
          </button>

          <button
            onClick={() => onTabChange('source')}
            className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 shrink-0 ${
              activeTab === 'source'
                ? 'bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200/80 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <FileCode className="w-4 h-4 text-emerald-600" />
            <span>Código Python (.py)</span>
          </button>

          <button
            onClick={() => onTabChange('checklist')}
            className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 shrink-0 ${
              activeTab === 'checklist'
                ? 'bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200/80 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Requisitos</span>
          </button>
        </nav>

        {/* Zona 3: Tag informativa de execução no cliente sem backend */}
        <div className="hidden lg:flex items-center gap-2 shrink-0 text-xs text-slate-500 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>100% Front-End (Sem Backend)</span>
        </div>
      </div>
    </header>
  );
};
