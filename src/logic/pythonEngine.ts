/**
 * Motor de Execução da Lógica Python no Front-End
 * Executa a lógica em Python de forma 100% client-side (sem backend)
 * Integrado ao Pyodide (quando carregado) e com emulador Python puro de alta fidelidade
 */

import { CalculationResult, OperationType } from '../types/calculator';

// Interface global para o Pyodide WebAssembly
declare global {
  interface Window {
    loadPyodide?: () => Promise<any>;
    pyodideInstance?: any;
  }
}

let pyodideReadyPromise: Promise<any> | null = null;

export async function initPyodide(): Promise<any> {
  if (typeof window === 'undefined') return null;

  if (window.pyodideInstance) {
    return window.pyodideInstance;
  }

  if (window.loadPyodide && !pyodideReadyPromise) {
    pyodideReadyPromise = window
      .loadPyodide()
      .then((pyodide: any) => {
        window.pyodideInstance = pyodide;
        return pyodide;
      })
      .catch((err: any) => {
        console.warn('Pyodide CDN não disponível no momento. Utilizando motor emulado Python.', err);
        return null;
      });
  }

  return pyodideReadyPromise;
}

/**
 * Executa a lógica de cálculo estritamente de acordo com as regras do Python:
 * - Variáveis: numero_a, numero_b, operacao, resultado
 * - Tipos: float, str
 * - Estrutura de decisão: if, elif, else
 * - Tratamento de divisão por zero (ZeroDivisionError)
 */
export async function executePythonCalculation(
  numero_a: number,
  numero_b: number,
  operacao: OperationType
): Promise<CalculationResult> {
  const pyLogs: string[] = [];
  pyLogs.push(`[Python Runtime] Recebendo argumentos: numero_a=${numero_a} (float), numero_b=${numero_b} (float), operacao='${operacao}' (str)`);

  // Tenta executar via Pyodide real se já estiver inicializado
  if (window.pyodideInstance) {
    try {
      const pyScript = `
def somar(a, b): return a + b
def subtrair(a, b): return a - b
def multiplicar(a, b): return a * b
def dividir(a, b):
    if b == 0:
        return "ZERO_DIVISION_ERROR"
    return a / b

num_a = float(${numero_a})
num_b = float(${numero_b})
op = '${operacao}'

if op == '+':
    res = somar(num_a, num_b)
    branch = '+'
elif op == '-':
    res = subtrair(num_a, num_b)
    branch = '-'
elif op == '*':
    res = multiplicar(num_a, num_b)
    branch = '*'
elif op == '/':
    if num_b == 0:
        res = "ZERO_DIVISION_ERROR"
        branch = 'div_zero'
    else:
        res = dividir(num_a, num_b)
        branch = '/'
else:
    res = "INVALID_OPERATION"
    branch = 'invalid'

import json
json.dumps({"result": res, "branch": branch})
`;
      const outputJsonStr = await window.pyodideInstance.runPythonAsync(pyScript);
      const parsed = JSON.parse(outputJsonStr);

      if (parsed.result === 'ZERO_DIVISION_ERROR' || parsed.branch === 'div_zero') {
        pyLogs.push(`[Python Runtime] Avaliação: operacao == '/' detectada.`);
        pyLogs.push(`[Python Runtime] Teste condicional: if numero_b == 0 avaliou como True!`);
        pyLogs.push(`[Python Runtime] Disparado tratamento amigável de ZeroDivisionError.`);
        return {
          success: false,
          result: 'Não é possível dividir por zero',
          error: 'ZeroDivisionError: divisão por zero não é permitida.',
          executedBranch: 'div_zero',
          variablesState: {
            numero_a,
            numero_b,
            operacao,
            resultado: 'Erro: Divisão por Zero',
            divisao_valida: false,
          },
          pythonLog: pyLogs,
        };
      }

      pyLogs.push(`[Python Runtime] Condição correspondente acionada: branch '${parsed.branch}'`);
      pyLogs.push(`[Python Runtime] Variável 'resultado' calculada com sucesso: ${parsed.result}`);

      return {
        success: true,
        result: parsed.result,
        executedBranch: parsed.branch as OperationType,
        variablesState: {
          numero_a,
          numero_b,
          operacao,
          resultado: parsed.result,
          divisao_valida: true,
        },
        pythonLog: pyLogs,
      };
    } catch (e) {
      pyLogs.push(`[Python Runtime] Fallback para motor Python nativo: ${String(e)}`);
    }
  }

  // Motor Python integrado (fiel às regras da especificação Python):
  pyLogs.push(`[Python Runtime] Avaliando estruturas condicionais:`);
  
  if (operacao === '+') {
    pyLogs.push(`[Python Runtime] Avaliação 'if operacao == "+":' -> True!`);
    const resultado = numero_a + numero_b;
    pyLogs.push(`[Python Runtime] Chamada: somar(numero_a=${numero_a}, numero_b=${numero_b})`);
    pyLogs.push(`[Python Runtime] Atribuição: resultado = ${resultado}`);
    return {
      success: true,
      result: resultado,
      executedBranch: '+',
      variablesState: {
        numero_a,
        numero_b,
        operacao,
        resultado,
      },
      pythonLog: pyLogs,
    };
  }

  if (operacao === '-') {
    pyLogs.push(`[Python Runtime] Avaliação 'if operacao == "+":' -> False.`);
    pyLogs.push(`[Python Runtime] Avaliação 'elif operacao == "-":' -> True!`);
    const resultado = numero_a - numero_b;
    pyLogs.push(`[Python Runtime] Chamada: subtrair(numero_a=${numero_a}, numero_b=${numero_b})`);
    pyLogs.push(`[Python Runtime] Atribuição: resultado = ${resultado}`);
    return {
      success: true,
      result: resultado,
      executedBranch: '-',
      variablesState: {
        numero_a,
        numero_b,
        operacao,
        resultado,
      },
      pythonLog: pyLogs,
    };
  }

  if (operacao === '*') {
    pyLogs.push(`[Python Runtime] Avaliação 'if operacao == "+":' -> False.`);
    pyLogs.push(`[Python Runtime] Avaliação 'elif operacao == "-":' -> False.`);
    pyLogs.push(`[Python Runtime] Avaliação 'elif operacao == "*":' -> True!`);
    const resultado = numero_a * numero_b;
    pyLogs.push(`[Python Runtime] Chamada: multiplicar(numero_a=${numero_a}, numero_b=${numero_b})`);
    pyLogs.push(`[Python Runtime] Atribuição: resultado = ${resultado}`);
    return {
      success: true,
      result: resultado,
      executedBranch: '*',
      variablesState: {
        numero_a,
        numero_b,
        operacao,
        resultado,
      },
      pythonLog: pyLogs,
    };
  }

  if (operacao === '/') {
    pyLogs.push(`[Python Runtime] Avaliação 'elif operacao == "/":' -> True!`);
    pyLogs.push(`[Python Runtime] Verificação de segurança: if numero_b == 0:`);
    
    if (numero_b === 0) {
      pyLogs.push(`[Python Runtime] Condição 'numero_b == 0' é Verdadeira!`);
      pyLogs.push(`[Python Runtime] Proteção ativada contra ZeroDivisionError.`);
      return {
        success: false,
        result: 'Não é possível dividir por zero',
        error: 'ZeroDivisionError: divisão por zero não é permitida na matemática.',
        executedBranch: 'div_zero',
        variablesState: {
          numero_a,
          numero_b,
          operacao,
          resultado: 'Erro: Divisão por Zero',
          divisao_valida: false,
        },
        pythonLog: pyLogs,
      };
    }

    const resultado = numero_a / numero_b;
    pyLogs.push(`[Python Runtime] Chamada: dividir(numero_a=${numero_a}, numero_b=${numero_b})`);
    pyLogs.push(`[Python Runtime] Atribuição: resultado = ${resultado}`);
    return {
      success: true,
      result: resultado,
      executedBranch: '/',
      variablesState: {
        numero_a,
        numero_b,
        operacao,
        resultado,
        divisao_valida: true,
      },
      pythonLog: pyLogs,
    };
  }

  pyLogs.push(`[Python Runtime] Bloco 'else:' executado -> Operação não reconhecida.`);
  return {
    success: false,
    result: 'Operação inválida',
    error: 'Operação não reconhecida',
    executedBranch: 'invalid',
    variablesState: {
      numero_a,
      numero_b,
      operacao,
      resultado: 'Erro',
    },
    pythonLog: pyLogs,
  };
}
