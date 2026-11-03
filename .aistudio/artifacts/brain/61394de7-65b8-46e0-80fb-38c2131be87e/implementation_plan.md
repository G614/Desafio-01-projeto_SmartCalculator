# SmartCalculator: Calculadora Básica com Lógica em Python para Iniciantes

Aplicação interativa chamada **SmartCalculator**, projetada especificamente para estudantes iniciantes de programação. A aplicação realiza as quatro operações matemáticas básicas (adição, subtração, multiplicação e divisão), executando a lógica em Python no front-end (sem necessidade de backend), com interface responsiva, acolhedora e componentizada, acompanhada de histórico de cálculos, tipagem de dados e uma seção didática que disseca as variáveis e a estrutura de tomada de decisão do código.

---

## Decisões do Usuário e Requisitos Incorporados

> [!IMPORTANT]
> **Revisão com base no briefing completo da SmartCalculator**:
> - **Nome da Aplicação**: SmartCalculator.
> - **Público**: Estudantes iniciantes que desejam aprender programação e organizar seus estudos.
> - **Lógica em Python sem Backend**: A lógica das 4 operações matemáticas e gerenciamento de cálculos é modelada e executada diretamente no cliente em Python (via interpretador Python cliente / Pyodide WebAssembly e motor reativo com espelhamento transparente), sem dependência de servidor externo.
> - **Interface Front-End**: Construída com HTML semântico, CSS (Tailwind) e JavaScript/TypeScript em React, totalmente responsiva e com textos em português do Brasil.
> - **Componentização**: Interface estruturada em componentes modulares independentes (`Header`, `CalculatorPad`, `HistoryCard`, `CodeExplanationPanel`, `DataTypeGuide`, `PythonSourceViewer`).
> - **Card de Histórico**: Componente dedicado para registrar e exibir operações anteriores, resultados e carimbos de tempo, permitindo reutilizar valores.
> - **Separação de Tipos de Dados**: Demonstração explícita no código e na interface dos tipos fundamentais (`float`, `str`, `dict`, `list`, `bool`).
> - **Explicação Didática Obrigatória**: Seção interativa com foco na identificação de variáveis (`numero_a`, `numero_b`, `operacao`, `resultado`, etc.) e na demonstração passo a passo de como a aplicação toma decisões usando `if / elif / else`.

---

## 1. Visão Geral e Conceito do Produto

- **O que a SmartCalculator faz**:
  Oferece uma calculadora visual funcional e aconchegante para realizar soma, subtração, multiplicação e divisão, ao mesmo tempo em que serve como um laboratório de aprendizado de Python. Cada cálculo realizado aciona a lógica em Python, atualiza o histórico e reflete instantaneamente o fluxo de execução das variáveis e condições no painel de explicação.
- **Público-Alvo**:
  Estudantes que estão dando os primeiros passos em programação e precisam ver a conexão direta entre a interface visual (botões e display) e o código Python (funções, variáveis e estruturas condicionais).
- **Tom & Atmosfera**:
  Simples, acolhedor, acolhedor e visualmente organizado, com cores calmas, tipografia legível e explicações em linguagem natural, sem jargões desnecessários.

---

## 2. Experiência do Usuário e Design Visual

### Estrutura de Componentes da Interface
1. **`Header` (Barra Superior)**:
   - Identidade `SmartCalculator`.
   - Navegação sutil para alternar entre "Calculadora & Histórico" e "Aprenda o Código".
   - Indicador de status do motor Python no navegador.
2. **`CalculatorPad` (Painel da Calculadora)**:
   - Display com duas linhas: expressão atual e resultado em destaque.
   - Teclado com as 4 operações básicas (`+`, `-`, `*`, `/`), dígitos numéricos (0-9), ponto decimal (`.`), limpar (`C`) e botão de igual (`=`).
   - Tratamento visual preventivo de divisão por zero (mensagem amigável: *"Não é possível dividir por zero"*).
3. **`HistoryCard` (Card de Histórico de Resultados)**:
   - Lista cronológica dos cálculos efetuados (`12 + 4 = 16`, `10 / 2 = 5`).
   - Botão para reutilizar o resultado de um cálculo anterior no display.
   - Botão para limpar histórico com confirmação.
4. **`CodeExplanationPanel` (Explicação Didática & Tomada de Decisão)**:
   - **Identificação de Variáveis**: Tabela interativa destacando cada variável usada no código (`numero_a`, `numero_b`, `operacao`, `resultado`, `historico`).
   - **Fluxo de Decisão (`if / elif / else`)**: Visualizador interativo que acende o caminho condicional percorrido com base na operação selecionada (ex: se o usuário clicou em `+`, destaca o bloco `if operacao == '+':`).
   - **Prevenção de Erros**: Destaque para o teste `elif numero_b == 0:` antes da divisão.
5. **`DataTypeGuide` (Separação de Tipos de Dados)**:
   - Cartões ilustrativos diferenciando:
     - `float`: números decimais (ex: `10.5`).
     - `str`: texto e símbolos de operadores (ex: `'+'`).
     - `list`: coleção ordenada para o histórico de cálculos.
     - `dict`: objeto que armazena a estrutura de cada operação (`expressao`, `resultado`, `data`).
     - `bool`: flags lógicas de validação (ex: `divisao_valida`).
6. **`PythonSourceViewer` (Visualizador de Código)**:
   - Código Python limpo, organizado e ricamente comentado.
   - Botão de copiar código para a área de transferência.
   - Botão para download do arquivo `smart_calculator.py`.

### Identidade Visual & Diretrizes
- **Estilo**: Limpo, acolhedor e focado na legibilidade para estudantes.
- **Cores**:
  - Base: Tons suaves de cinza ardósia (`bg-slate-50` / `bg-slate-900`).
  - Destaques estruturais: Painéis brancos com bordas suaves (`border-slate-200 / border-slate-700`).
  - Acentos de Ação: Esmeralda amigável (`emerald-600`) para o botão de resultado e azul petróleo para operadores.
- **Tipografia**: `Plus Jakarta Sans` para textos de interface e `JetBrains Mono` para variáveis, display da calculadora e código Python.

---

## 3. Decisões Técnicas e Arquitetura sem Backend

- **Lógica em Python no Front-End**:
  - *Abordagem*: O código Python real (`smart_calculator.py`) é executado no navegador através do interpretador Pyodide (WebAssembly), com um motor local espelhado em JavaScript que garante resposta instantânea sem atrasos de rede ou falhas de carregamento.
  - *Sem Backend*: A aplicação não requer nenhum servidor ou banco de dados externo. Todo o estado e histórico residem na memória do cliente e em `localStorage` (para persistência entre recargas).
- **Componentização React**:
  - Estrutura clara e modular em arquivos independentes:
    - `/src/components/Header.tsx`
    - `/src/components/CalculatorPad.tsx`
    - `/src/components/HistoryCard.tsx`
    - `/src/components/CodeExplanationPanel.tsx`
    - `/src/components/DataTypeGuide.tsx`
    - `/src/components/PythonSourceViewer.tsx`
    - `/src/logic/pythonEngine.ts` (executor e integração Python)
    - `/src/logic/smartCalculatorCode.ts` (código-fonte Python puro com documentação)

---

## 4. Diagrama de Arquitetura e Fluxo de Decisão

```
┌────────────────────────────────────────────────────────────────────────┐
│                        SmartCalculator (Header)                        │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
        ┌───────────────────────────┴───────────────────────────┐
        ▼                                                       ▼
┌───────────────────────────────┐       ┌───────────────────────────────┐
│        CalculatorPad          │       │          HistoryCard          │
│ ┌───────────────────────────┐ │       │ ┌───────────────────────────┐ │
│ │ Display: 25.0 * 4.0 = 100 │ │       │ │ 25.0 * 4.0 = 100.0 (14:05)│ │
│ └───────────────────────────┘ │       │ │ 15.0 + 3.0 = 18.0  (14:04)│ │
│ [ 7 ][ 8 ][ 9 ][ / ]          │ ────► │ └───────────────────────────┘ │
│ [ 4 ][ 5 ][ 6 ][ * ]          │ Salva │ [Reutilizar]  [Limpar Histórico]
│ [ 1 ][ 2 ][ 3 ][ - ]          │ Hist. └───────────────────────────────┘
│ [ C ][ 0 ][ . ][ + ][ = ]     │
└───────────────┬───────────────┘
                │ Executa Lógica Python
                ▼
┌───────────────────────────────────────────────────────────────────────┐
│             CodeExplanationPanel (Raio-X do Código Python)            │
│                                                                       │
│ 1. Variáveis em Ação:                                                 │
│    • numero_a: float = 25.0                                           │
│    • numero_b: float = 4.0                                            │
│    • operacao: str = '*'                                              │
│    • resultado: float = 100.0                                         │
│                                                                       │
│ 2. Árvore de Decisão Condicional (como o Python decide):              │
│    ┌─ if operacao == '+':       -> return numero_a + numero_b         │
│    ├─ elif operacao == '-':     -> return numero_a - numero_b         │
│    ├─►elif operacao == '*':     -> return numero_a * numero_b [ATIVO] │
│    ├─ elif operacao == '/':                                           │
│    │     if numero_b == 0:      -> Erro: divisão por zero             │
│    │     else:                  -> return numero_a / numero_b         │
│    └─ else:                     -> Operação inválida                  │
└───────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌───────────────────────────────────────────────────────────────────────┐
│       DataTypeGuide (Tipos de Dados: float, str, list, dict, bool)    │
│       PythonSourceViewer (Código Completo para Copiar e Salvar)       │
└───────────────────────────────────────────────────────────────────────┘
```

---

## 5. Checklist de Verificação dos Requisitos

- [x] Nome **SmartCalculator** presente na interface e título.
- [x] Quatro operações matemáticas básicas (+, -, *, /).
- [x] Público-alvo: estudantes iniciantes (linguagem didática e acolhedora).
- [x] Visual simples, acolhedor e organizado.
- [x] Template fácil de entender com interface responsiva (desktop e mobile).
- [x] Textos 100% em português do Brasil.
- [x] Lógica implementada em Python.
- [x] Interface construída com HTML, CSS e JavaScript/TypeScript.
- [x] Separação em componentes React modulares.
- [x] Separação e explicação explícita dos tipos de dados (`float`, `str`, `list`, `dict`, `bool`).
- [x] Card de histórico para resultados anteriores com opção de reaproveitamento.
- [x] Sem uso de backend nesta versão (execução 100% no cliente).
- [x] Seção com explicação detalhada do código, identificação de variáveis e demonstração de como a aplicação decide qual operação executar.
