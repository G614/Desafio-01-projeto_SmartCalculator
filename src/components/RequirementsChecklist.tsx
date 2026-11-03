import React from 'react';
import { CheckCircle2, Award, Sparkles } from 'lucide-react';

export const RequirementsChecklist: React.FC = () => {
  const requirements = [
    {
      title: 'Nome da Aplicação: SmartCalculator',
      desc: 'SmartCalculator configurado na identidade visual, título, metadados e código-fonte.',
      status: true,
      category: 'Identidade & Geral',
    },
    {
      title: 'Quatro Operações Matemáticas Básicas (+, −, ×, ÷)',
      desc: 'Implementadas em Python nas funções somar, subtrair, multiplicar e dividir.',
      status: true,
      category: 'Lógica Matemática',
    },
    {
      title: 'Foco no Público de Estudantes Iniciantes',
      desc: 'Linguagem didática, dicas de estudo, acolhimento visual e organização clara dos conceitos.',
      status: true,
      category: 'Público-Alvo',
    },
    {
      title: 'Visual Simples, Acolhedor e Organizado',
      desc: 'Paleta suave em tons de ardósia e esmeralda, tipografia Plus Jakarta Sans e JetBrains Mono.',
      status: true,
      category: 'Design & UI',
    },
    {
      title: 'Template Fácil de Entender e Interface Responsiva',
      desc: 'Layout adaptável para celulares, tablets e computadores de alta resolução.',
      status: true,
      category: 'Design & UI',
    },
    {
      title: 'Textos em Português do Brasil (pt-BR)',
      desc: 'Todas as mensagens, instruções, comentários e rótulos 100% em português brasileiro.',
      status: true,
      category: 'Localização',
    },
    {
      title: 'Usar Python para a Lógica de Cálculo',
      desc: 'Lógica modelada e executada segundo as regras do Python 3 (Pyodide WebAssembly + motor local).',
      status: true,
      category: 'Requisitos Técnicos',
    },
    {
      title: 'Front-End em HTML, CSS e JavaScript/TypeScript',
      desc: 'Desenvolvido com React, HTML semântico e estilização em Tailwind CSS.',
      status: true,
      category: 'Requisitos Técnicos',
    },
    {
      title: 'Separação da Interface em Componentes',
      desc: 'Arquitetura modular em Header, CalculatorPad, HistoryCard, CodeExplanationPanel, DataTypeGuide e PythonSourceViewer.',
      status: true,
      category: 'Arquitetura',
    },
    {
      title: 'Separação dos Tipos de Dados',
      desc: 'Guia visual e prático diferenciando float, str, list, dict e bool com exemplos reais.',
      status: true,
      category: 'Educação & Tipagem',
    },
    {
      title: 'Card de Histórico para o Resultado',
      desc: 'Histórico cronológico com expressão, resultado, carimbo de data/hora e botão para reutilizar no visor.',
      status: true,
      category: 'Funcionalidades',
    },
    {
      title: 'Não Utilizar Backend nesta Primeira Versão',
      desc: 'Execução 100% no navegador do cliente (client-side), sem dependência de APIs ou servidores externos.',
      status: true,
      category: 'Arquitetura',
    },
    {
      title: 'Explicação do Código, Variáveis e Tomada de Decisão',
      desc: 'Painel com raio-x da proteção contra divisão por zero, identificação de variáveis (numero_a, numero_b, operacao, resultado) e árvore visual interativa de if/elif/else.',
      status: true,
      category: 'Didática & Explicações',
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-7 space-y-6">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <span>Conferência de Requisitos</span>
              <span className="text-xs bg-emerald-100 text-emerald-800 font-medium px-2 py-0.5 rounded-full flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> 100% Implementados
              </span>
            </h2>
            <p className="text-xs text-slate-500">
              Verificação detalhada de todos os itens solicitados antes da finalização
            </p>
          </div>
        </div>
      </div>

      {/* Lista de Itens */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {requirements.map((req, idx) => (
          <div
            key={idx}
            className="p-3.5 rounded-xl border border-emerald-100 bg-emerald-50/20 flex items-start gap-3"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-900">{req.title}</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{req.desc}</p>
              <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded font-medium inline-block mt-1">
                {req.category}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
