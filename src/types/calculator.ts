/**
 * Definições de tipos de dados para a SmartCalculator
 * Demonstra a correspondência entre tipos em Python e TypeScript
 */

export type OperationType = '+' | '-' | '*' | '/';

export interface HistoryItem {
  id: string;
  num1: number;
  num2: number;
  operation: OperationType;
  result: number | string;
  isError: boolean;
  errorMessage?: string;
  timestamp: string;
  rawExpression: string;
}

export interface PythonVariableInfo {
  name: string;
  pythonType: 'float' | 'str' | 'list' | 'dict' | 'bool';
  value: string;
  description: string;
  purpose: string;
}

export interface DecisionBranch {
  operator: OperationType;
  conditionCode: string;
  actionCode: string;
  explanation: string;
  isSpecialCase?: boolean;
}

export interface CalculationResult {
  success: boolean;
  result: number | string;
  error?: string;
  executedBranch: OperationType | 'div_zero' | 'invalid';
  variablesState: {
    numero_a: number;
    numero_b: number;
    operacao: string;
    resultado: number | string;
    divisao_valida?: boolean;
  };
  pythonLog: string[];
}
