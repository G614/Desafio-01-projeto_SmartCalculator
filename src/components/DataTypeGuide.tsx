import React from 'react';
import { Layers, Hash, Type, List, FileJson, ToggleLeft } from 'lucide-react';

export const DataTypeGuide: React.FC = () => {
  const dataTypes = [
    {
      name: 'float',
      label: 'Ponto Flutuante (Números Reais / Decimais)',
      icon: Hash,
      color: 'emerald',
      example: 'numero_a = 15.5',
      explanation: 'Utilizado para todos os valores numéricos da calculadora, permitindo contas com decimais (como 10.5 / 2 = 5.25).',
      whereUsed: 'Nas entradas da calculadora (convertidas com float()) e no resultado dos cálculos.',
    },
    {
      name: 'str',
      label: 'String (Texto e Caracteres)',
      icon: Type,
      color: 'blue',
      example: "operacao = '+'",
      explanation: 'Representa sequências de caracteres cercadas por aspas simples ou duplas. No Python, qualquer valor vindo de input() chega como string.',
      whereUsed: "Nos símbolos das operações ('+', '-', '*', '/') e nas mensagens de erro do sistema.",
    },
    {
      name: 'list',
      label: 'Lista (Coleção Ordenada de Dados)',
      icon: List,
      color: 'purple',
      example: 'historico = []',
      explanation: 'Uma estrutura que armazena múltiplos itens em sequência. Criada com colchetes []. Permite adicionar novos registros com .append().',
      whereUsed: 'No card de histórico, agrupando todos os cálculos efetuados pelo estudante.',
    },
    {
      name: 'dict',
      label: 'Dicionário (Chave-Valor)',
      icon: FileJson,
      color: 'amber',
      example: 'registro = {"num_a": 10, "op": "+", "res": 15}',
      explanation: 'Armazena informações identificadas por etiquetas chamadas chaves. Muito similar a uma ficha cadastral do cálculo.',
      whereUsed: 'Dentro da lista de histórico, guardando cada cálculo com sua data, números e resultado.',
    },
    {
      name: 'bool',
      label: 'Booleano (Verdadeiro ou Falso)',
      icon: ToggleLeft,
      color: 'cyan',
      example: 'divisao_valida = numero_b != 0',
      explanation: 'Possui apenas dois valores possíveis: True (Verdadeiro) ou False (Falso). É a base de todas as decisões lógicas (if).',
      whereUsed: 'No teste condicional if numero_b == 0 para bloquear a divisão proibida.',
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-7 space-y-6">
      {/* Cabeçalho */}
      <div className="pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Separação dos Tipos de Dados em Python
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Em programação, cada pedaço de informação possui uma categoria específica de dado
            </p>
          </div>
        </div>
      </div>

      {/* Grade de Tipos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {dataTypes.map((dt) => {
          const Icon = dt.icon;
          return (
            <div
              key={dt.name}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-emerald-300 transition-all flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-slate-200/70 text-slate-700 flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="font-mono text-sm font-bold text-emerald-800">
                      {dt.name}
                    </span>
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    Python Type
                  </span>
                </div>

                <h3 className="text-xs font-semibold text-slate-800 mb-1">
                  {dt.label}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  {dt.explanation}
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-200/60">
                <div className="bg-slate-900 text-white font-mono text-xs px-2.5 py-1.5 rounded-lg overflow-x-auto">
                  <span className="text-slate-400 text-[10px] block mb-0.5">Exemplo em código:</span>
                  <span className="text-emerald-300 font-medium">{dt.example}</span>
                </div>

                <div className="text-[11px] text-slate-500">
                  <span className="font-semibold text-slate-700">Onde a SmartCalculator usa:</span> {dt.whereUsed}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dica de Ouro para Iniciantes */}
      <div className="bg-amber-50 border border-amber-200/80 rounded-xl p-4 text-xs sm:text-sm text-amber-950">
        <h4 className="font-bold text-amber-900 mb-1 flex items-center gap-1.5">
          <span>💡 Dica de Ouro: Por que converter texto com float()?</span>
        </h4>
        <p className="text-amber-800 leading-relaxed">
          Quando você digita <code className="bg-white/80 px-1 py-0.5 rounded text-amber-950 font-mono">10</code> no terminal, o Python recebe o texto <code className="bg-white/80 px-1 py-0.5 rounded text-amber-950 font-mono">&quot;10&quot;</code> (uma string). Se você tentar somar <code className="bg-white/80 px-1 py-0.5 rounded text-amber-950 font-mono">&quot;10&quot; + &quot;5&quot;</code>, o resultado seria <code className="bg-white/80 px-1 py-0.5 rounded text-amber-950 font-mono">&quot;105&quot;</code> (concatenação de texto)! Ao converter com <code className="bg-white/80 px-1 py-0.5 rounded text-amber-950 font-mono">float(&quot;10&quot;)</code>, o Python transforma em número matemático real, calculando corretamente <code className="bg-white/80 px-1 py-0.5 rounded text-amber-950 font-mono">15.0</code>.
        </p>
      </div>
    </div>
  );
};
