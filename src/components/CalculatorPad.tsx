import React from 'react';
import { Delete, RotateCcw, Sparkles } from 'lucide-react';
import { OperationType } from '../types/calculator';

interface CalculatorPadProps {
  currentInput: string;
  previousValue: number | null;
  selectedOperation: OperationType | null;
  displayExpression: string;
  errorMessage: string | null;
  isCalculating: boolean;
  onDigitClick: (digit: string) => void;
  onOperationClick: (op: OperationType) => void;
  onEqualsClick: () => void;
  onClearClick: () => void;
  onBackspaceClick: () => void;
  onExplainClick: () => void;
}

export const CalculatorPad: React.FC<CalculatorPadProps> = ({
  currentInput,
  previousValue,
  selectedOperation,
  displayExpression,
  errorMessage,
  isCalculating,
  onDigitClick,
  onOperationClick,
  onEqualsClick,
  onClearClick,
  onBackspaceClick,
  onExplainClick,
}) => {
  const operations: { label: string; op: OperationType; symbol: string; desc: string }[] = [
    { label: 'dividir', op: '/', symbol: '÷', desc: 'Divisão' },
    { label: 'multiplicar', op: '*', symbol: '×', desc: 'Multiplicação' },
    { label: 'subtrair', op: '-', symbol: '−', desc: 'Subtração' },
    { label: 'somar', op: '+', symbol: '+', desc: 'Adição' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-6 flex flex-col justify-between">
      {/* Topo do Card: Título e Ação Rápida */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
        <div>
          <h2 className="text-base font-bold text-slate-800">Painel da Calculadora</h2>
          <p className="text-xs text-slate-500">Operações básicas processadas com Python</p>
        </div>
        <button
          onClick={onExplainClick}
          className="text-xs text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-2.5 py-1 rounded-md font-medium transition-colors flex items-center gap-1.5"
          title="Ver como o Python processa esta operação"
        >
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Ver Lógica Python</span>
        </button>
      </div>

      {/* Visor / Display Acolhedor */}
      <div className="bg-slate-900 text-white rounded-xl p-4 sm:p-5 mb-5 shadow-inner flex flex-col justify-end min-h-[110px] relative overflow-hidden">
        {/* Expressão anterior ou pendente */}
        <div className="text-xs sm:text-sm text-slate-400 font-mono tracking-wide flex items-center justify-between mb-1 min-h-[20px]">
          <span className="truncate">
            {displayExpression || (previousValue !== null && selectedOperation ? `${previousValue} ${selectedOperation}` : 'Python 3.x Engine')}
          </span>
          {selectedOperation && (
            <span className="text-emerald-400 font-semibold px-2 py-0.5 rounded bg-slate-800 text-xs">
              op = &apos;{selectedOperation}&apos;
            </span>
          )}
        </div>

        {/* Valor atual ou mensagem de erro */}
        <div className="flex items-baseline justify-end">
          {errorMessage ? (
            <div className="text-amber-300 font-medium text-right text-sm sm:text-base leading-tight">
              {errorMessage}
            </div>
          ) : (
            <div className="text-3xl sm:text-4xl font-bold font-mono tracking-tight text-white truncate tabular-nums">
              {currentInput || '0'}
            </div>
          )}
        </div>

        {isCalculating && (
          <div className="absolute top-2 right-2 flex items-center gap-1 text-[10px] text-emerald-400 font-mono bg-slate-800/90 px-2 py-0.5 rounded">
            <span className="animate-pulse">●</span> Processando Python...
          </div>
        )}
      </div>

      {/* Grade de Botões */}
      <div className="grid grid-cols-4 gap-2.5 sm:gap-3">
        {/* Linha 1: Utilitários e Divisão */}
        <button
          onClick={onClearClick}
          className="py-3 px-2 rounded-xl text-sm font-semibold bg-red-50 text-red-700 hover:bg-red-100 border border-red-100 transition-colors flex items-center justify-center gap-1"
          title="Limpar cálculo (C)"
        >
          <RotateCcw className="w-4 h-4" />
          <span>C</span>
        </button>

        <button
          onClick={onBackspaceClick}
          className="py-3 px-2 rounded-xl text-sm font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200/60 transition-colors flex items-center justify-center"
          title="Apagar último dígito"
        >
          <Delete className="w-4 h-4" />
        </button>

        <button
          onClick={() => {
            // Atalho de exemplo para testar divisão por zero
            onDigitClick('0');
          }}
          className="py-3 px-2 rounded-xl text-xs font-mono font-medium bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200/60 transition-colors"
          title="Inserir zero"
        >
          0
        </button>

        <button
          onClick={() => onOperationClick('/')}
          className={`py-3 px-2 rounded-xl text-lg font-bold transition-all border ${
            selectedOperation === '/'
              ? 'bg-emerald-600 text-white border-emerald-700 shadow-md ring-2 ring-emerald-200'
              : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-emerald-200/70'
          }`}
          title="Divisão ( / )"
        >
          ÷
        </button>

        {/* Linha 2: 7, 8, 9 e Multiplicação */}
        {['7', '8', '9'].map((digit) => (
          <button
            key={digit}
            onClick={() => onDigitClick(digit)}
            className="py-3.5 px-3 rounded-xl text-lg font-bold font-mono text-slate-800 bg-white hover:bg-slate-50 border border-slate-200 shadow-xs active:scale-[0.98] transition-all"
          >
            {digit}
          </button>
        ))}
        <button
          onClick={() => onOperationClick('*')}
          className={`py-3 px-2 rounded-xl text-lg font-bold transition-all border ${
            selectedOperation === '*'
              ? 'bg-emerald-600 text-white border-emerald-700 shadow-md ring-2 ring-emerald-200'
              : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-emerald-200/70'
          }`}
          title="Multiplicação ( * )"
        >
          ×
        </button>

        {/* Linha 3: 4, 5, 6 e Subtração */}
        {['4', '5', '6'].map((digit) => (
          <button
            key={digit}
            onClick={() => onDigitClick(digit)}
            className="py-3.5 px-3 rounded-xl text-lg font-bold font-mono text-slate-800 bg-white hover:bg-slate-50 border border-slate-200 shadow-xs active:scale-[0.98] transition-all"
          >
            {digit}
          </button>
        ))}
        <button
          onClick={() => onOperationClick('-')}
          className={`py-3 px-2 rounded-xl text-lg font-bold transition-all border ${
            selectedOperation === '-'
              ? 'bg-emerald-600 text-white border-emerald-700 shadow-md ring-2 ring-emerald-200'
              : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-emerald-200/70'
          }`}
          title="Subtração ( - )"
        >
          −
        </button>

        {/* Linha 4: 1, 2, 3 e Adição */}
        {['1', '2', '3'].map((digit) => (
          <button
            key={digit}
            onClick={() => onDigitClick(digit)}
            className="py-3.5 px-3 rounded-xl text-lg font-bold font-mono text-slate-800 bg-white hover:bg-slate-50 border border-slate-200 shadow-xs active:scale-[0.98] transition-all"
          >
            {digit}
          </button>
        ))}
        <button
          onClick={() => onOperationClick('+')}
          className={`py-3 px-2 rounded-xl text-lg font-bold transition-all border ${
            selectedOperation === '+'
              ? 'bg-emerald-600 text-white border-emerald-700 shadow-md ring-2 ring-emerald-200'
              : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-emerald-200/70'
          }`}
          title="Adição ( + )"
        >
          +
        </button>

        {/* Linha 5: 00, Ponto Decimal e Igual */}
        <button
          onClick={() => onDigitClick('00')}
          className="py-3 px-2 rounded-xl text-sm font-bold font-mono text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors"
        >
          00
        </button>

        <button
          onClick={() => onDigitClick('.')}
          className="py-3 px-2 rounded-xl text-lg font-bold font-mono text-slate-800 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-colors"
          title="Ponto decimal (float)"
        >
          .
        </button>

        <button
          onClick={onEqualsClick}
          className="col-span-2 py-3 px-4 rounded-xl text-base font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 active:scale-[0.99]"
          title="Executar cálculo em Python (=)"
        >
          <span>=</span>
          <span className="text-xs uppercase font-sans tracking-wider opacity-90">Calcular</span>
        </button>
      </div>

      {/* Nota explicativa de rodapé do teclado */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span>Tipo de entrada: <code className="text-emerald-700 bg-emerald-50 px-1 py-0.5 rounded">float</code></span>
        <span>Operadores: <code className="text-slate-700 font-mono">+ − × ÷</code></span>
      </div>
    </div>
  );
};
