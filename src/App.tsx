/**
 * SmartCalculator - Aplicação Principal
 * Calculadora simples em Python para estudantes iniciantes
 */

import React, { useState, useEffect } from 'react';
import { Header, ActiveTab } from './components/Header';
import { CalculatorPad } from './components/CalculatorPad';
import { HistoryCard } from './components/HistoryCard';
import { CodeExplanationPanel } from './components/CodeExplanationPanel';
import { DataTypeGuide } from './components/DataTypeGuide';
import { PythonSourceViewer } from './components/PythonSourceViewer';
import { RequirementsChecklist } from './components/RequirementsChecklist';
import { HistoryItem, OperationType } from './types/calculator';
import { executePythonCalculation, initPyodide } from './logic/pythonEngine';
import { BookOpen, Sparkles, Terminal } from 'lucide-react';

const INITIAL_HISTORY: HistoryItem[] = [
  {
    id: 'init-1',
    num1: 15.0,
    num2: 3.0,
    operation: '+',
    result: 18.0,
    isError: false,
    timestamp: '14:00:15',
    rawExpression: '15.0 + 3.0',
  },
  {
    id: 'init-2',
    num1: 50.0,
    num2: 2.0,
    operation: '*',
    result: 100.0,
    isError: false,
    timestamp: '14:02:40',
    rawExpression: '50.0 * 2.0',
  },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('calculator');
  const [currentInput, setCurrentInput] = useState<string>('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [selectedOperation, setSelectedOperation] = useState<OperationType | null>(null);
  const [displayExpression, setDisplayExpression] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [lastResult, setLastResult] = useState<number | string | null>(18.0);
  const [lastExecutedBranch, setLastExecutedBranch] = useState<string | null>('+');

  // Histórico persistido em localStorage
  const [history, setHistory] = useState<HistoryItem[]>(() => {
    try {
      const saved = localStorage.getItem('smart_calc_history');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Erro ao ler localStorage', e);
    }
    return INITIAL_HISTORY;
  });

  // Inicializa o Pyodide em segundo plano se disponível
  useEffect(() => {
    initPyodide();
  }, []);

  // Salva histórico no localStorage
  useEffect(() => {
    try {
      localStorage.setItem('smart_calc_history', JSON.stringify(history));
    } catch (e) {
      console.warn('Erro ao salvar no localStorage', e);
    }
  }, [history]);

  // Manipulador de clique em dígitos e ponto decimal
  const handleDigitClick = (digit: string) => {
    setErrorMessage(null);

    // Evita múltiplos zeros no início
    if (currentInput === '0' && digit !== '.') {
      setCurrentInput(digit === '00' ? '0' : digit);
      return;
    }

    // Evita múltiplos pontos decimais
    if (digit === '.' && currentInput.includes('.')) {
      return;
    }

    // Limite de 14 caracteres no visor para evitar overflow
    if (currentInput.length >= 14) return;

    setCurrentInput((prev) => prev + digit);
  };

  // Manipulador de clique em operadores (+, -, *, /)
  const handleOperationClick = (op: OperationType) => {
    setErrorMessage(null);
    const parsedVal = parseFloat(currentInput);

    if (isNaN(parsedVal)) return;

    // Se já havia uma operação pendente e o usuário digitou outro número, calcula primeiro
    if (previousValue !== null && selectedOperation !== null && currentInput !== '') {
      handleEqualsClick();
      return;
    }

    setPreviousValue(parsedVal);
    setSelectedOperation(op);
    setDisplayExpression(`${parsedVal} ${op}`);
    setCurrentInput('');
  };

  // Executa o cálculo da operação em Python
  const handleEqualsClick = async () => {
    if (previousValue === null || selectedOperation === null) {
      return;
    }

    const currentVal = parseFloat(currentInput || '0');
    if (isNaN(currentVal)) {
      setErrorMessage('Digite um número válido');
      return;
    }

    setIsCalculating(true);
    setErrorMessage(null);

    const now = new Date();
    const timeStr = now.toLocaleTimeString('pt-BR', { hour12: false });

    // Chama o motor de execução em Python
    const calc = await executePythonCalculation(previousValue, currentVal, selectedOperation);

    setIsCalculating(false);
    setLastResult(calc.result);
    setLastExecutedBranch(calc.executedBranch);

    if (!calc.success) {
      setErrorMessage(calc.result as string);
      setDisplayExpression(`${previousValue} ${selectedOperation} ${currentVal}`);

      // Registra o erro no histórico como cálculo informativo
      const errorItem: HistoryItem = {
        id: `calc-${Date.now()}`,
        num1: previousValue,
        num2: currentVal,
        operation: selectedOperation,
        result: calc.result,
        isError: true,
        errorMessage: calc.error,
        timestamp: timeStr,
        rawExpression: `${previousValue} ${selectedOperation} ${currentVal}`,
      };
      setHistory((prev) => [errorItem, ...prev]);
      return;
    }

    // Sucesso: atualiza visor e histórico
    const resValue = typeof calc.result === 'number' ? Number(calc.result.toFixed(6)) : calc.result;
    setDisplayExpression(`${previousValue} ${selectedOperation} ${currentVal} =`);
    setCurrentInput(String(resValue));

    const newItem: HistoryItem = {
      id: `calc-${Date.now()}`,
      num1: previousValue,
      num2: currentVal,
      operation: selectedOperation,
      result: resValue,
      isError: false,
      timestamp: timeStr,
      rawExpression: `${previousValue} ${selectedOperation} ${currentVal}`,
    };

    setHistory((prev) => [newItem, ...prev]);
    setPreviousValue(null);
    setSelectedOperation(null);
  };

  // Limpa o estado da calculadora (botão C)
  const handleClearClick = () => {
    setCurrentInput('0');
    setPreviousValue(null);
    setSelectedOperation(null);
    setDisplayExpression('');
    setErrorMessage(null);
  };

  // Apaga o último caractere digitado
  const handleBackspaceClick = () => {
    if (errorMessage) {
      setErrorMessage(null);
      setCurrentInput('0');
      return;
    }

    if (currentInput.length <= 1 || currentInput === '0') {
      setCurrentInput('0');
    } else {
      setCurrentInput((prev) => prev.slice(0, -1));
    }
  };

  // Reutiliza um valor do histórico no visor da calculadora
  const handleReuseValue = (val: number) => {
    setCurrentInput(String(val));
    setErrorMessage(null);
    setActiveTab('calculator');
  };

  // Limpa o histórico de cálculos
  const handleClearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem('smart_calc_history');
    } catch (e) {
      console.warn(e);
    }
  };

  // Seleciona item do histórico para inspecionar no raio-x
  const handleSelectHistoryItem = (item: HistoryItem) => {
    setLastResult(item.result);
    setLastExecutedBranch(item.operation);
    setActiveTab('explanation');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900">
      {/* Barra de Navegação Superior */}
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
        historyCount={history.length}
      />

      {/* Conteúdo Principal */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        {/* Banner de Boas-Vindas Didático */}
        <div className="bg-gradient-to-r from-emerald-900 via-slate-900 to-slate-950 text-white rounded-2xl p-5 sm:p-6 shadow-sm border border-emerald-900/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-mono tracking-wider text-emerald-400 font-semibold">
                Ambiente de Aprendizado
              </span>
              <span className="text-slate-500">·</span>
              <span className="text-xs text-slate-300">Iniciantes em Python</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              SmartCalculator: A Lógica por Trás dos Cálculos
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Explore as quatro operações matemáticas básicas (+, −, ×, ÷), veja como o Python armazena variáveis e entenda como a linguagem toma decisões usando <code className="text-emerald-300 font-mono">if</code>, <code className="text-emerald-300 font-mono">elif</code> e <code className="text-emerald-300 font-mono">else</code>.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setActiveTab('explanation')}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-xs sm:text-sm font-bold rounded-xl transition-all shadow-sm flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>Ver Decisão Python</span>
            </button>
            <button
              onClick={() => setActiveTab('source')}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs sm:text-sm font-semibold rounded-xl transition-all border border-slate-700 flex items-center gap-1.5"
            >
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span>Código .py</span>
            </button>
          </div>
        </div>

        {/* Visualização de Abas Dinâmicas */}
        {activeTab === 'calculator' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Coluna da Calculadora (7 colunas) */}
            <div className="lg:col-span-7 space-y-6">
              <CalculatorPad
                currentInput={currentInput}
                previousValue={previousValue}
                selectedOperation={selectedOperation}
                displayExpression={displayExpression}
                errorMessage={errorMessage}
                isCalculating={isCalculating}
                onDigitClick={handleDigitClick}
                onOperationClick={handleOperationClick}
                onEqualsClick={handleEqualsClick}
                onClearClick={handleClearClick}
                onBackspaceClick={handleBackspaceClick}
                onExplainClick={() => setActiveTab('explanation')}
              />

              {/* Mini-Card de Visão Rápida da Lógica Atual */}
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 sm:p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      O que está acontecendo na memória?
                    </span>
                  </div>
                  <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-mono font-medium">
                    Estado das Variáveis
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <span className="text-slate-400 block text-[10px]">numero_a: float</span>
                    <span className="text-slate-900 font-bold text-sm">
                      {previousValue !== null ? previousValue : '---'}
                    </span>
                  </div>

                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <span className="text-slate-400 block text-[10px]">operacao: str</span>
                    <span className="text-emerald-700 font-bold text-sm">
                      {selectedOperation ? `'${selectedOperation}'` : '---'}
                    </span>
                  </div>

                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <span className="text-slate-400 block text-[10px]">numero_b: float</span>
                    <span className="text-slate-900 font-bold text-sm">
                      {currentInput || '---'}
                    </span>
                  </div>

                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <span className="text-slate-400 block text-[10px]">resultado: float</span>
                    <span className="text-emerald-700 font-bold text-sm">
                      {lastResult !== null ? lastResult : '---'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Coluna do Card de Histórico (5 colunas) */}
            <div className="lg:col-span-5">
              <HistoryCard
                history={history}
                onReuseValue={handleReuseValue}
                onClearHistory={handleClearHistory}
                onSelectHistoryItem={handleSelectHistoryItem}
              />
            </div>
          </div>
        )}

        {activeTab === 'explanation' && (
          <CodeExplanationPanel
            currentOperation={selectedOperation}
            currentNum1={previousValue}
            currentNum2={parseFloat(currentInput) || null}
            lastResult={lastResult}
            lastExecutedBranch={lastExecutedBranch}
          />
        )}

        {activeTab === 'datatypes' && <DataTypeGuide />}

        {activeTab === 'source' && <PythonSourceViewer />}

        {activeTab === 'checklist' && <RequirementsChecklist />}
      </main>

      {/* Rodapé Acolhedor */}
      <footer className="border-t border-slate-200 bg-white py-4 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700">SmartCalculator</span>
            <span>·</span>
            <span>Ambiente educativo de programação em Python</span>
          </div>

          <div className="flex items-center gap-4 text-slate-500">
            <span>Operações: + − × ÷</span>
            <span>·</span>
            <span className="font-medium text-emerald-700">100% Front-End</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
