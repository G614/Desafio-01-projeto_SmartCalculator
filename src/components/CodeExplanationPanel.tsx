import React, { useState } from 'react';
import { HelpCircle, Code2, GitFork, Variable, ShieldAlert, Check } from 'lucide-react';
import { OperationType, PythonVariableInfo } from '../types/calculator';

interface CodeExplanationPanelProps {
  currentOperation: OperationType | null;
  currentNum1: number | null;
  currentNum2: number | null;
  lastResult: number | string | null;
  lastExecutedBranch: string | null;
}

export const CodeExplanationPanel: React.FC<CodeExplanationPanelProps> = ({
  currentOperation,
  currentNum1,
  currentNum2,
  lastResult,
  lastExecutedBranch,
}) => {
  const [activeTab, setActiveTab] = useState<'decision' | 'variables' | 'deep_dive'>('decision');
  const [previewOp, setPreviewOp] = useState<OperationType | null>(null);

  // Operação sob inspeção (selecionada no preview ou no visor da calculadora)
  const inspectedOp = previewOp || currentOperation || (lastExecutedBranch as OperationType) || '+';

  // Lista detalhada de variáveis utilizadas no código
  const variablesList: PythonVariableInfo[] = [
    {
      name: 'numero_a',
      pythonType: 'float',
      value: currentNum1 !== null ? `${currentNum1}` : '15.0',
      description: 'Armazena o primeiro número informado pelo usuário.',
      purpose: 'Convertido com float() para aceitar tanto números inteiros (10) quanto com vírgula/ponto (10.5).',
    },
    {
      name: 'numero_b',
      pythonType: 'float',
      value: currentNum2 !== null ? `${currentNum2}` : '3.0',
      description: 'Armazena o segundo número que participará da operação matemática.',
      purpose: 'Essencial para a verificação de divisão por zero: se numero_b == 0 e operacao == "/", gera erro.',
    },
    {
      name: 'operacao',
      pythonType: 'str',
      value: `'${inspectedOp}'`,
      description: 'Armazena o símbolo da operação escolhida como texto (string).',
      purpose: 'Utilizada nas condições if/elif para decidir qual função de cálculo chamar (+, -, *, /).',
    },
    {
      name: 'resultado',
      pythonType: 'float',
      value: lastResult !== null ? `${lastResult}` : '18.0',
      description: 'Recebe o valor de retorno gerado pela função matemática correspondente.',
      purpose: 'É o dado final exibido no visor para o usuário e armazenado no registro de histórico.',
    },
    {
      name: 'historico_calculos',
      pythonType: 'list',
      value: '[ { ... }, { ... } ]',
      description: 'Lista em Python que guarda múltiplos dicionários de contas já calculadas.',
      purpose: 'Permite consultar cálculos anteriores, reutilizar números e registrar auditoria.',
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-7 space-y-6">
      {/* Cabeçalho do Painel Didático */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <h2 className="text-lg font-bold text-slate-900">
              Raio-X Didático do Código Python
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Compreenda as variáveis, a tomada de decisão (<code className="font-mono text-emerald-700 bg-emerald-50 px-1 py-0.5 rounded">if/elif/else</code>) e a lógica interna
          </p>
        </div>

        {/* Sub-navegação interna */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('decision')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'decision'
                ? 'bg-white text-emerald-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <GitFork className="w-3.5 h-3.5" />
            <span>Como Decide</span>
          </button>

          <button
            onClick={() => setActiveTab('variables')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'variables'
                ? 'bg-white text-emerald-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Variable className="w-3.5 h-3.5" />
            <span>Variáveis</span>
          </button>

          <button
            onClick={() => setActiveTab('deep_dive')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'deep_dive'
                ? 'bg-white text-emerald-800 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Explicação em Detalhe</span>
          </button>
        </div>
      </div>

      {/* ABA 1: Como a aplicação decide qual operação executar */}
      {activeTab === 'decision' && (
        <div className="space-y-5">
          <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-4 text-xs sm:text-sm text-emerald-950 flex items-start gap-3">
            <HelpCircle className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-emerald-900 mb-1">
                Como o Python toma decisões com estruturas condicionais?
              </p>
              <p className="leading-relaxed text-emerald-800">
                O Python avalia condições de cima para baixo. Ele inicia com <code className="font-mono bg-white/70 px-1 py-0.2 rounded text-emerald-900">if</code>. Se a condição for falsa, testa o próximo <code className="font-mono bg-white/70 px-1 py-0.2 rounded text-emerald-900">elif</code> (abreviação de <em>else if</em> / &quot;senão se&quot;). Assim que uma condição é verdadeira, o Python executa aquele bloco de código e ignora todos os outros!
              </p>
            </div>
          </div>

          {/* Simulador Interativo de Escolha de Operador */}
          <div className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Teste o seletor condicional (clique para iluminar o caminho):
            </span>
            <div className="grid grid-cols-4 gap-2">
              {[
                { op: '+' as OperationType, label: 'Soma (+)', fn: 'somar()' },
                { op: '-' as OperationType, label: 'Subtração (−)', fn: 'subtrair()' },
                { op: '*' as OperationType, label: 'Multiplicação (×)', fn: 'multiplicar()' },
                { op: '/' as OperationType, label: 'Divisão (÷)', fn: 'dividir()' },
              ].map((item) => (
                <button
                  key={item.op}
                  onClick={() => setPreviewOp(item.op)}
                  className={`py-2 px-3 rounded-xl border text-center transition-all ${
                    inspectedOp === item.op
                      ? 'bg-emerald-600 text-white border-emerald-700 shadow-sm ring-2 ring-emerald-200 font-bold'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200 font-medium'
                  }`}
                >
                  <div className="text-base font-mono">{item.op}</div>
                  <div className="text-[11px] truncate opacity-90">{item.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Código com Destaque Visual Dinâmico */}
          <div className="bg-slate-900 rounded-xl p-4 sm:p-5 font-mono text-xs sm:text-sm text-slate-300 border border-slate-800 shadow-inner overflow-x-auto">
            <div className="text-slate-500 mb-2 italic"># Função principal de decisão:</div>
            <div className="text-emerald-400 font-semibold mb-3">
              def calcular_operacao(numero_a: float, numero_b: float, operacao: str):
            </div>

            <div className="space-y-2">
              {/* Ramo Adição */}
              <div
                className={`p-2.5 rounded-lg border transition-all ${
                  inspectedOp === '+'
                    ? 'bg-emerald-950/80 border-emerald-500 text-white shadow-sm ring-1 ring-emerald-500'
                    : 'bg-slate-850 border-slate-800 text-slate-400 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>
                    <span className="text-purple-400 font-bold">if</span> operacao == <span className="text-amber-300">&apos;+&apos;</span>:
                  </span>
                  {inspectedOp === '+' && (
                    <span className="text-[10px] bg-emerald-500 text-slate-950 font-sans font-bold px-2 py-0.5 rounded flex items-center gap-1">
                      <Check className="w-3 h-3" /> Condição Verdadeira
                    </span>
                  )}
                </div>
                <div className="pl-6 text-slate-300 mt-1">
                  <span className="text-purple-400">return</span> somar(numero_a, numero_b) <span className="text-slate-500 text-xs"># Chama função somar</span>
                </div>
              </div>

              {/* Ramo Subtração */}
              <div
                className={`p-2.5 rounded-lg border transition-all ${
                  inspectedOp === '-'
                    ? 'bg-emerald-950/80 border-emerald-500 text-white shadow-sm ring-1 ring-emerald-500'
                    : 'bg-slate-850 border-slate-800 text-slate-400 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>
                    <span className="text-purple-400 font-bold">elif</span> operacao == <span className="text-amber-300">&apos;-&apos;</span>:
                  </span>
                  {inspectedOp === '-' && (
                    <span className="text-[10px] bg-emerald-500 text-slate-950 font-sans font-bold px-2 py-0.5 rounded flex items-center gap-1">
                      <Check className="w-3 h-3" /> Condição Verdadeira
                    </span>
                  )}
                </div>
                <div className="pl-6 text-slate-300 mt-1">
                  <span className="text-purple-400">return</span> subtrair(numero_a, numero_b) <span className="text-slate-500 text-xs"># Chama função subtrair</span>
                </div>
              </div>

              {/* Ramo Multiplicação */}
              <div
                className={`p-2.5 rounded-lg border transition-all ${
                  inspectedOp === '*'
                    ? 'bg-emerald-950/80 border-emerald-500 text-white shadow-sm ring-1 ring-emerald-500'
                    : 'bg-slate-850 border-slate-800 text-slate-400 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>
                    <span className="text-purple-400 font-bold">elif</span> operacao == <span className="text-amber-300">&apos;*&apos;</span>:
                  </span>
                  {inspectedOp === '*' && (
                    <span className="text-[10px] bg-emerald-500 text-slate-950 font-sans font-bold px-2 py-0.5 rounded flex items-center gap-1">
                      <Check className="w-3 h-3" /> Condição Verdadeira
                    </span>
                  )}
                </div>
                <div className="pl-6 text-slate-300 mt-1">
                  <span className="text-purple-400">return</span> multiplicar(numero_a, numero_b) <span className="text-slate-500 text-xs"># Chama função multiplicar</span>
                </div>
              </div>

              {/* Ramo Divisão com Proteção */}
              <div
                className={`p-2.5 rounded-lg border transition-all ${
                  inspectedOp === '/'
                    ? 'bg-emerald-950/80 border-emerald-500 text-white shadow-sm ring-1 ring-emerald-500'
                    : 'bg-slate-850 border-slate-800 text-slate-400 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>
                    <span className="text-purple-400 font-bold">elif</span> operacao == <span className="text-amber-300">&apos;/&apos;</span>:
                  </span>
                  {inspectedOp === '/' && (
                    <span className="text-[10px] bg-emerald-500 text-slate-950 font-sans font-bold px-2 py-0.5 rounded flex items-center gap-1">
                      <Check className="w-3 h-3" /> Condição Verdadeira
                    </span>
                  )}
                </div>
                <div className="pl-6 space-y-1 mt-1 text-xs">
                  <div className="text-amber-300/90 flex items-center gap-1">
                    <ShieldAlert className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span><span className="text-purple-400 font-bold">if</span> numero_b == 0: <span className="text-purple-400">return</span> &quot;Erro: Divisão por zero!&quot;</span>
                  </div>
                  <div className="text-slate-300">
                    <span className="text-purple-400">return</span> dividir(numero_a, numero_b)
                  </div>
                </div>
              </div>

              {/* Ramo Padrão */}
              <div className="p-2 rounded-lg bg-slate-850/50 border border-slate-800/80 text-slate-500 text-xs pl-3">
                <span className="text-purple-400 font-bold">else</span>: <span className="text-purple-400">return</span> &quot;Erro: Operação inválida&quot;
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ABA 2: Identificação de Variáveis */}
      {activeTab === 'variables' && (
        <div className="space-y-4">
          <p className="text-xs sm:text-sm text-slate-600">
            Variáveis funcionam como etiquetas para caixas de memória no computador. Conheça as variáveis que a <strong>SmartCalculator</strong> utiliza:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {variablesList.map((v) => (
              <div
                key={v.name}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-emerald-300 transition-all flex flex-col justify-between space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="font-mono text-sm font-bold text-emerald-800 flex items-center gap-1.5">
                    <span>{v.name}</span>
                  </div>
                  <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                    {v.pythonType}
                  </span>
                </div>

                <div className="text-xs text-slate-600 leading-relaxed">
                  {v.description}
                </div>

                <div className="pt-2 border-t border-slate-200/60 text-[11px] text-slate-500">
                  <span className="font-semibold text-slate-700">Importância:</span> {v.purpose}
                </div>

                <div className="bg-slate-900 text-white text-xs font-mono px-2.5 py-1 rounded-md flex items-center justify-between">
                  <span className="text-slate-400">Valor atual:</span>
                  <span className="text-emerald-300 font-semibold">{v.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ABA 3: Explicação em Detalhe de uma parte do código */}
      {activeTab === 'deep_dive' && (
        <div className="space-y-4">
          <div className="border border-slate-200 rounded-xl p-4 sm:p-5 bg-slate-50/60 space-y-4">
            <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
              <Code2 className="w-5 h-5 text-emerald-600" />
              <span>Explicação em Destaque: A Proteção contra Divisão por Zero</span>
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Vamos analisar em detalhe uma das partes mais importantes do código da calculadora: a função que divide dois números e previne o encerramento abrupto do programa.
            </p>

            {/* Trecho de Código em Destaque */}
            <div className="bg-slate-900 rounded-xl p-4 font-mono text-xs sm:text-sm text-slate-200 shadow-inner">
              <span className="text-purple-400 font-bold">def</span> <span className="text-emerald-400 font-bold">dividir</span>(numero_a: <span className="text-amber-300">float</span>, numero_b: <span className="text-amber-300">float</span>):<br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-slate-500 italic"># 1. Verifica se o divisor é zero antes de tentar a conta</span><br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400 font-bold">if</span> numero_b == <span className="text-cyan-300">0</span>:<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400 font-bold">return</span> <span className="text-amber-300">&quot;Erro: Não é possível dividir por zero!&quot;</span><br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-slate-500 italic"># 2. Se não for zero, realiza a divisão real</span><br />
              &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400 font-bold">return</span> numero_a / numero_b
            </div>

            {/* Pontos Explicados */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-white rounded-lg border border-slate-200">
                <span className="font-bold text-slate-900 block mb-1">1. Parâmetros</span>
                <span className="text-slate-600">
                  <code className="text-emerald-700 bg-emerald-50 px-1">numero_a</code> é o dividendo (número a ser dividido) e <code className="text-emerald-700 bg-emerald-50 px-1">numero_b</code> é o divisor.
                </span>
              </div>

              <div className="p-3 bg-white rounded-lg border border-slate-200">
                <span className="font-bold text-slate-900 block mb-1">2. O Operador &apos;==&apos;</span>
                <span className="text-slate-600">
                  Compara se o valor dentro de <code className="text-emerald-700 bg-emerald-50 px-1">numero_b</code> é exatamente igual a zero.
                </span>
              </div>

              <div className="p-3 bg-white rounded-lg border border-slate-200">
                <span className="font-bold text-slate-900 block mb-1">3. Comando &apos;return&apos;</span>
                <span className="text-slate-600">
                  Interrompe a função imediatamente e devolve a resposta para quem a chamou.
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
