/**
 * Código Python estruturado da SmartCalculator
 * Disponibilizado para estudo, download e execução interativa
 */

export const PYTHON_CALCULATOR_SOURCE = `# ==============================================================================
# SMARTCALCULATOR - CALCULADORA DIDÁTICA EM PYTHON
# Feita especialmente para estudantes iniciantes na programação!
# Realiza as quatro operações matemáticas básicas: +, -, *, /
# ==============================================================================

# ------------------------------------------------------------------------------
# 1. DEFINIÇÃO DAS FUNÇÕES MATEMÁTICAS (Componentes da Lógica)
# Cada função recebe dois parâmetros e retorna o resultado numérico correspondente.
# ------------------------------------------------------------------------------

def somar(numero_a: float, numero_b: float) -> float:
    """Retorna a soma de dois números reais."""
    return numero_a + numero_b


def subtrair(numero_a: float, numero_b: float) -> float:
    """Retorna a diferença entre dois números reais."""
    return numero_a - numero_b


def multiplicar(numero_a: float, numero_b: float) -> float:
    """Retorna o produto de dois números reais."""
    return numero_a * numero_b


def dividir(numero_a: float, numero_b: float):
    """
    Retorna a divisão do primeiro número pelo segundo.
    ATENÇÃO: Em matemática, não é possível dividir qualquer número por zero!
    """
    if numero_b == 0:
        return "Erro: Não é possível dividir por zero!"
    return numero_a / numero_b


# ------------------------------------------------------------------------------
# 2. ESTRUTURA DE DECISÃO: Como a aplicação decide qual operação executar
# ------------------------------------------------------------------------------

def calcular_operacao(numero_a: float, numero_b: float, operacao: str):
    """
    Esta função avalia a variável 'operacao' usando estruturas condicionais
    (if, elif, else) para direcionar o cálculo para a função correta.
    """
    # Verificação 1: O usuário escolheu soma?
    if operacao == '+':
        resultado = somar(numero_a, numero_b)

    # Verificação 2: Se não foi soma, foi subtração?
    elif operacao == '-':
        resultado = subtrair(numero_a, numero_b)

    # Verificação 3: Se não foi subtração, foi multiplicação?
    elif operacao == '*':
        resultado = multiplicar(numero_a, numero_b)

    # Verificação 4: Se não foi multiplicação, foi divisão?
    elif operacao == '/':
        resultado = dividir(numero_a, numero_b)

    # Caso padrão: Nenhuma das opções válidas foi selecionada
    else:
        resultado = "Erro: Operação inválida!"

    return resultado


# ------------------------------------------------------------------------------
# 3. HISTÓRICO DE CÁLCULOS (Lista de Dicionários)
# Demonstra os tipos de dados compostos 'list' e 'dict'.
# ------------------------------------------------------------------------------

historico_calculos: list = []


def salvar_no_historico(num_a: float, num_b: float, op: str, res):
    """Armazena um registro estruturado da operação realizada."""
    registro = {
        "numero_a": num_a,
        "numero_b": num_b,
        "operacao": op,
        "expressao": f"{num_a} {op} {num_b}",
        "resultado": res
    }
    historico_calculos.append(registro)
    return registro


# ------------------------------------------------------------------------------
# 4. PROGRAMA PRINCIPAL (Fluxo de Entrada e Laço de Repetição)
# ------------------------------------------------------------------------------

def executar_smart_calculator():
    print("=" * 45)
    print("      BEM-VINDO À SMARTCALCULATOR (PYTHON)    ")
    print("=" * 45)

    while True:
        try:
            print("\\nOperações disponíveis: [+] [-] [*] [/] ou [S] para sair")
            operacao: str = input("Escolha a operação: ").strip()

            if operacao.lower() == 's':
                print("\\nEncerrando a SmartCalculator. Bons estudos!")
                break

            if operacao not in ['+', '-', '*', '/']:
                print("Operação não reconhecida! Tente novamente.")
                continue

            # Conversão explícita de tipos: de string (texto) para float (decimal)
            numero_a: float = float(input("Digite o primeiro número: "))
            numero_b: float = float(input("Digite o segundo número: "))

            # Executa a tomada de decisão
            resultado = calcular_operacao(numero_a, numero_b, operacao)

            # Exibe o resultado formatado
            print("-" * 35)
            print(f"Resultado: {numero_a} {operacao} {numero_b} = {resultado}")
            print("-" * 35)

            # Salva no histórico
            salvar_no_historico(numero_a, numero_b, operacao, resultado)

        except ValueError:
            print("Erro de digitação: Por favor, informe apenas números válidos!")

# Descomente a linha abaixo para executar no terminal local Python:
# if __name__ == "__main__":
#     executar_smart_calculator()
`;

export const CODE_SNIPPET_DECISION = `def calcular_operacao(numero_a: float, numero_b: float, operacao: str):
    # O Python avalia a condição passo a passo:
    if operacao == '+':
        return numero_a + numero_b
    elif operacao == '-':
        return numero_a - numero_b
    elif operacao == '*':
        return numero_a * numero_b
    elif operacao == '/':
        if numero_b == 0:
            return "Erro: Divisão por zero!"
        return numero_a / numero_b
    else:
        return "Erro: Operação inválida!"`;

export const CODE_SNIPPET_VARIABLES = `# Identificação das variáveis principais:
numero_a: float    # Primeiro operando (número decimal ou inteiro convertido)
numero_b: float    # Segundo operando
operacao: str      # Símbolo do operador matemático ('+', '-', '*', '/')
resultado: float   # Valor numérico resultante da operação matemática
historico: list    # Lista de dicionários guardando cálculos anteriores`;
