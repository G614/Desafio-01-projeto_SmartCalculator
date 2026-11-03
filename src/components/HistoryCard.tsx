import React from 'react';
import { History, Trash2, ArrowUpRight, Clock, AlertTriangle } from 'lucide-react';
import { HistoryItem } from '../types/calculator';

interface HistoryCardProps {
  history: HistoryItem[];
  onReuseValue: (value: number) => void;
  onClearHistory: () => void;
  onSelectHistoryItem: (item: HistoryItem) => void;
}

export const HistoryCard: React.FC<HistoryCardProps> = ({
  history,
  onReuseValue,
  onClearHistory,
  onSelectHistoryItem,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-6 flex flex-col h-full min-h-[460px]">
      {/* Cabeçalho do Card */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <History className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-800">Card de Histórico</h2>
            <p className="text-xs text-slate-500">Registro de resultados e expressões</p>
          </div>
        </div>

        {history.length > 0 && (
          <button
            onClick={onClearHistory}
            className="text-xs text-red-600 hover:text-red-700 hover:bg-red-50 px-2.5 py-1 rounded-md font-medium transition-colors flex items-center gap-1 border border-red-200/60"
            title="Limpar todos os registros"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Limpar</span>
          </button>
        )}
      </div>

      {/* Conteúdo da Lista de Histórico */}
      <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 max-h-[380px] scrollbar-thin">
        {history.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
            <div className="w-12 h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center mb-3 text-slate-300">
              <Clock className="w-6 h-6" />
            </div>
            <p className="text-sm font-semibold text-slate-600">Nenhum cálculo registrado ainda</p>
            <p className="text-xs text-slate-400 max-w-xs mt-1">
              Faça contas na calculadora ao lado para ver o histórico e a lógica Python em ação!
            </p>
          </div>
        ) : (
          history.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectHistoryItem(item)}
              className="group p-3 rounded-xl border border-slate-150 hover:border-emerald-300 bg-slate-50/60 hover:bg-emerald-50/30 transition-all cursor-pointer relative"
            >
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span className="font-mono text-[11px] flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {item.timestamp}
                </span>
                <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-500">
                  {item.operation === '+' && 'Adição'}
                  {item.operation === '-' && 'Subtração'}
                  {item.operation === '*' && 'Multiplicação'}
                  {item.operation === '/' && 'Divisão'}
                </span>
              </div>

              {/* Expressão Matemática */}
              <div className="flex items-baseline justify-between gap-2">
                <div className="font-mono text-sm text-slate-700 truncate">
                  {item.num1} <span className="text-emerald-700 font-bold">{item.operation}</span> {item.num2} =
                </div>

                {item.isError ? (
                  <div className="flex items-center gap-1 text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    <AlertTriangle className="w-3 h-3 shrink-0" />
                    <span>Erro</span>
                  </div>
                ) : (
                  <div className="font-mono text-base font-bold text-emerald-800 tabular-nums">
                    {item.result}
                  </div>
                )}
              </div>

              {/* Botão de reaproveitamento de valor para o visor */}
              {!item.isError && typeof item.result === 'number' && (
                <div className="mt-2 pt-2 border-t border-slate-200/50 flex justify-end">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onReuseValue(item.result as number);
                    }}
                    className="text-[11px] font-medium text-emerald-700 hover:text-emerald-800 hover:bg-emerald-100/70 px-2 py-0.5 rounded flex items-center gap-1 transition-colors"
                    title="Usar este resultado na calculadora"
                  >
                    <span>Usar no visor</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Rodapé informativo */}
      <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-400 flex items-center justify-between">
        <span>Estrutura: <code className="text-slate-600 bg-slate-100 px-1 py-0.5 rounded">list[dict]</code></span>
        <span>{history.length} {history.length === 1 ? 'registro' : 'registros'}</span>
      </div>
    </div>
  );
};
