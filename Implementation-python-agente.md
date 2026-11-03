# GOOGLE AI STUDIO - DESAFIO 1 
## Desafio 1: Criando sua primeira aplicação com IA 

A **SmartCalculator** foi criada com sucesso! A aplicação foi desenvolvida especialmente para estudantes iniciantes na programação, unindo um visual acolhedor e organizado a uma experiência prática com Python.

### 1. Resumo dos Requisitos Implementados

- **Identidade & Nome:** Aplicação chamada SmartCalculator, com interface em português do Brasil e design responsivo (computador, tablet e celular).
 
- **Quatro Operações Matemáticas:** Adição (+), Subtração (−), Multiplicação (×) e Divisão (÷), com tratamento preventivo para divisão por zero.
 
- **Card de Histórico:** Registra cada operação realizada com data/hora, expressão completa e botão para reutilizar qualquer resultado anterior no visor.
 
- **Separação de Componentes:**
  - **Header:** Barra superior limpa com alternador de abas didáticas.
    
  - **CalculatorPad:** Visor e teclado com botões das 4 operações e dígitos.
    
  - **HistoryCard:** Painel dedicado ao histórico de cálculos.
    
  - **CodeExplanationPanel:** Raio-X do código, identificação de variáveis e tomada de decisão.
    
  - **DataTypeGuide:** Guia visual separando os tipos de dados em Python.
    
  - **PythonSourceViewer:** Código Python completo (**smart_calculator.py**) pronto para copiar ou baixar.
    
  - **RequirementsChecklist:** Tela de conferência de todos os requisitos.
    
- **100% Front-End (Sem Backend):** Lógica executada diretamente no navegador.
  
### 2. Explicação Didática do Código Python

**A. Identificação das Variáveis Utilizadas**
  1. **numero_a (float):** Primeiro número informado pelo usuário (convertido de texto para decimal com float()).
   
  2. **numero_b (float):** Segundo número da operação matemática.
     
  3. **operacao (str):** Texto contendo o símbolo da operação ('+', '-', '*', '/').
     
  4. **resultado (float ou str):** Recebe o valor numérico calculado ou uma mensagem explicativa caso ocorra uma divisão por zero.
     
  5. **historico_calculos (list de dict):** Lista contendo registros com as expressões e resultados de cada conta.
     
**B. Como a Aplicação Decide Qual Operação Executar**

O Python utiliza uma **estrutura condicional encadeada (if, elif, else)** para testar o operador de cima para baixo:

```python
def calcular_operacao(numero_a: float, numero_b: float, operacao: str):
    # 1. Testa se o operador é adição:
    if operacao == '+':
        return somar(numero_a, numero_b)

    # 2. Se não for '+', testa se é subtração:
    elif operacao == '-':
        return subtrair(numero_a, numero_b)

    # 3. Se não for '-', testa se é multiplicação:
    elif operacao == '*':
        return multiplicar(numero_a, numero_b)

    # 4. Se for divisão, verifica primeiro se o divisor é zero:
    elif operacao == '/':
        if numero_b == 0:
            return "Erro: Não é possível dividir por zero!"
        return dividir(numero_a, numero_b)

    # 5. Caso não seja nenhum dos operadores conhecidos:
    else:
        return "Erro: Operação inválida!"
```

**Como funciona a decisão:**

  - Quando o Python avalia a condição if operacao == '+', ele compara se o texto digitado é igual a '+'.
    
  - Se a condição for **Verdadeira (True)**, o Python executa imediatamente a função **somar** e ignora todo o resto do bloco.
    
  - Se for **Falsa (False)**, ele avança para o próximo **elif** (abreviação de *else if /* "senão se").

  - Caso nenhuma das 4 opções coincida, o bloco **else** é acionado para avisar que a operação é desconhecida.

**C. Destaque: A Proteção contra Divisão por Zero**

Na matemática e no Python, dividir qualquer número por zero resulta em erro **(ZeroDivisionError)**. Por isso, a função dividir testa primeiro:

```python
if numero_b == 0:
    return "Erro: Não é possível dividir por zero!"
```

Essa checagem simples impede que o programa trave e orienta o usuário de forma amigável.

### 3. Checagem da correção do servidor de desenvolvimento para inicialização 

O servidor de desenvolvimento foi reiniciado com sucesso e a compilação do aplicativo foi validada sem erros. O **SmartCalculator** já está ativo e pronto para uso na porta 3000.

**Correção dos erros no aplicativo**

O problema no **bun install** causado pela resolução transitória do **@tailwindcss/node** foi verificado e corrigido.

  - As dependências foram resolvidas e instaladas com sucesso via Bun (**Checked 180 installs across 289 packages**).

  - O servidor de desenvolvimento foi reiniciado e a compilação do **SmartCalculator** foi validada sem nenhum erro de build ou TypeScript.

  - A aplicação está ativa e funcionando perfeitamente.

**Correção do servidor de desenvolvimento**

O problema foi identificado e corrigido: o diretório de dependências (**node_modules**) estava incompleto, impedindo a localização do binário do Vite.

  1. As dependências foram reinstaladas com sucesso (**install_applet_dependencies**).

  2. O servidor de desenvolvimento foi reiniciado (**restart_dev_server**).

  3. O servidor Vite foi testado e está respondendo com sucesso (**HTTP 200 OK**) na porta 3000.

  4. O build da aplicação foi verificado e aprovado sem erros.


