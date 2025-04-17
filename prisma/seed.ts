import { PrismaClient, TransactionType, TransactionCategory, TransactionPaymentMethod, BillRecurrence, NotificationType } from '@prisma/client'
const prisma = new PrismaClient()

const USER_ID = 'user_2vblyn3wxdSSceSgwE9eazCWceW'

// Função auxiliar para criar datas passadas
function getDateXMonthsAgo(months: number): Date {
    const date = new Date()
    date.setMonth(date.getMonth() - months)
    return date
}

// Função auxiliar para criar datas futuras
function getDateXMonthsAhead(months: number): Date {
    const date = new Date()
    date.setMonth(date.getMonth() + months)
    return date
}

async function main() {
    // Criar saldo inicial
    await prisma.balance.create({
        data: {
            amount: 12500.0,
            userId: USER_ID,
        },
    })

    // Criar transações dos últimos 6 meses
    const transactions = [
        // Mês atual
        {
            name: 'Salário',
            value: 5000.0,
            category: TransactionCategory.SALARY,
            type: TransactionType.DEPOSIT,
            paymentMethod: TransactionPaymentMethod.BANK_TRANSFER,
            createdAt: new Date(),
            userId: USER_ID,
        },
        {
            name: 'Aluguel',
            value: 1500.0,
            category: TransactionCategory.HOUSING,
            type: TransactionType.EXPENSE,
            paymentMethod: TransactionPaymentMethod.PIX,
            createdAt: new Date(),
            userId: USER_ID,
        },
        // 1 mês atrás
        {
            name: 'Salário',
            value: 5000.0,
            category: TransactionCategory.SALARY,
            type: TransactionType.DEPOSIT,
            paymentMethod: TransactionPaymentMethod.BANK_TRANSFER,
            createdAt: getDateXMonthsAgo(1),
            userId: USER_ID,
        },
        {
            name: 'Supermercado',
            value: 850.0,
            category: TransactionCategory.FOOD,
            type: TransactionType.EXPENSE,
            paymentMethod: TransactionPaymentMethod.CREDIT_CARD,
            createdAt: getDateXMonthsAgo(1),
            userId: USER_ID,
        },
        {
            name: 'Cinema',
            value: 120.0,
            category: TransactionCategory.ENTERTAINMENT,
            type: TransactionType.EXPENSE,
            paymentMethod: TransactionPaymentMethod.CREDIT_CARD,
            createdAt: getDateXMonthsAgo(1),
            userId: USER_ID,
        },
        // 2 meses atrás
        {
            name: 'Salário',
            value: 5000.0,
            category: TransactionCategory.SALARY,
            type: TransactionType.DEPOSIT,
            paymentMethod: TransactionPaymentMethod.BANK_TRANSFER,
            createdAt: getDateXMonthsAgo(2),
            userId: USER_ID,
        },
        {
            name: 'Consulta Médica',
            value: 200.0,
            category: TransactionCategory.HEALTH,
            type: TransactionType.EXPENSE,
            paymentMethod: TransactionPaymentMethod.PIX,
            createdAt: getDateXMonthsAgo(2),
            userId: USER_ID,
        },
        // 3 meses atrás
        {
            name: 'Salário',
            value: 5000.0,
            category: TransactionCategory.SALARY,
            type: TransactionType.DEPOSIT,
            paymentMethod: TransactionPaymentMethod.BANK_TRANSFER,
            createdAt: getDateXMonthsAgo(3),
            userId: USER_ID,
        },
        {
            name: 'Material Escolar',
            value: 450.0,
            category: TransactionCategory.EDUCATION,
            type: TransactionType.EXPENSE,
            paymentMethod: TransactionPaymentMethod.CREDIT_CARD,
            createdAt: getDateXMonthsAgo(3),
            userId: USER_ID,
        },
        {
            name: 'Investimento CDB',
            value: 1000.0,
            category: TransactionCategory.OTHER,
            type: TransactionType.INVESTMENT,
            paymentMethod: TransactionPaymentMethod.BANK_TRANSFER,
            createdAt: getDateXMonthsAgo(3),
            userId: USER_ID,
        },
        // 4 meses atrás
        {
            name: 'Salário',
            value: 5000.0,
            category: TransactionCategory.SALARY,
            type: TransactionType.DEPOSIT,
            paymentMethod: TransactionPaymentMethod.BANK_TRANSFER,
            createdAt: getDateXMonthsAgo(4),
            userId: USER_ID,
        },
        {
            name: 'Manutenção Carro',
            value: 800.0,
            category: TransactionCategory.TRANSPORTATION,
            type: TransactionType.EXPENSE,
            paymentMethod: TransactionPaymentMethod.DEBIT_CARD,
            createdAt: getDateXMonthsAgo(4),
            userId: USER_ID,
        },
        // 5 meses atrás
        {
            name: 'Salário',
            value: 5000.0,
            category: TransactionCategory.SALARY,
            type: TransactionType.DEPOSIT,
            paymentMethod: TransactionPaymentMethod.BANK_TRANSFER,
            createdAt: getDateXMonthsAgo(5),
            userId: USER_ID,
        },
        {
            name: 'Conta de Luz',
            value: 180.0,
            category: TransactionCategory.UTILITY,
            type: TransactionType.EXPENSE,
            paymentMethod: TransactionPaymentMethod.BANK_SLIP,
            createdAt: getDateXMonthsAgo(5),
            userId: USER_ID,
        },
        {
            name: 'Conta de Água',
            value: 90.0,
            category: TransactionCategory.UTILITY,
            type: TransactionType.EXPENSE,
            paymentMethod: TransactionPaymentMethod.BANK_SLIP,
            createdAt: getDateXMonthsAgo(5),
            userId: USER_ID,
        },
    ]

    await prisma.transaction.createMany({
        data: transactions,
    })

    // Criar contas a pagar com diferentes recorrências
    const bills = [
        {
            name: 'Netflix',
            value: 39.90,
            dueDate: getDateXMonthsAhead(1),
            category: TransactionCategory.ENTERTAINMENT,
            paymentMethod: TransactionPaymentMethod.CREDIT_CARD,
            recurrence: BillRecurrence.MONTHLY,
            userId: USER_ID,
        },
        {
            name: 'Academia',
            value: 99.90,
            dueDate: getDateXMonthsAhead(1),
            category: TransactionCategory.HEALTH,
            paymentMethod: TransactionPaymentMethod.CREDIT_CARD,
            recurrence: BillRecurrence.MONTHLY,
            userId: USER_ID,
        },
        {
            name: 'Aluguel',
            value: 1500.0,
            dueDate: getDateXMonthsAhead(1),
            category: TransactionCategory.HOUSING,
            paymentMethod: TransactionPaymentMethod.PIX,
            recurrence: BillRecurrence.MONTHLY,
            userId: USER_ID,
        },
        {
            name: 'IPTU',
            value: 800.0,
            dueDate: getDateXMonthsAhead(2),
            category: TransactionCategory.HOUSING,
            paymentMethod: TransactionPaymentMethod.BANK_SLIP,
            recurrence: BillRecurrence.YEARLY,
            userId: USER_ID,
        },
        {
            name: 'Seguro Carro',
            value: 200.0,
            dueDate: getDateXMonthsAhead(1),
            category: TransactionCategory.TRANSPORTATION,
            paymentMethod: TransactionPaymentMethod.CREDIT_CARD,
            recurrence: BillRecurrence.MONTHLY,
            userId: USER_ID,
        },
        {
            name: 'Curso de Inglês',
            value: 400.0,
            dueDate: getDateXMonthsAhead(1),
            category: TransactionCategory.EDUCATION,
            paymentMethod: TransactionPaymentMethod.CREDIT_CARD,
            recurrence: BillRecurrence.MONTHLY,
            userId: USER_ID,
        },
    ]

    await prisma.bill.createMany({
        data: bills,
    })

    // Criar metas financeiras em diferentes estágios
    const goals = [
        {
            name: 'Reserva de emergência',
            currentAmount: 5000.0,
            goalAmount: 20000.0,
            createdAt: getDateXMonthsAgo(6),
            userId: USER_ID,
        },
        {
            name: 'Viagem férias',
            currentAmount: 2000.0,
            goalAmount: 8000.0,
            createdAt: getDateXMonthsAgo(4),
            userId: USER_ID,
        },
        {
            name: 'Novo Notebook',
            currentAmount: 3500.0,
            goalAmount: 5000.0,
            createdAt: getDateXMonthsAgo(3),
            userId: USER_ID,
        },
        {
            name: 'Entrada Apartamento',
            currentAmount: 15000.0,
            goalAmount: 50000.0,
            createdAt: getDateXMonthsAgo(12),
            userId: USER_ID,
        },
    ]

    await prisma.financialGoal.createMany({
        data: goals,
    })

    // Criar notificações
    const notifications = [
        {
            title: 'Conta próxima do vencimento',
            message: 'A conta Netflix vence em 3 dias',
            type: NotificationType.BILL,
            userId: USER_ID,
        },
        {
            title: 'Meta quase alcançada!',
            message: 'Você está a 70% da sua meta do Notebook',
            type: NotificationType.FINANCIAL_GOAL,
            userId: USER_ID,
        },
        {
            title: 'Nova transação registrada',
            message: 'Pagamento do Aluguel registrado com sucesso',
            type: NotificationType.TRANSACTION,
            userId: USER_ID,
        },
        {
            title: 'Alerta de orçamento',
            message: 'Você já gastou 80% do orçamento mensal em Alimentação',
            type: NotificationType.TRANSACTION,
            userId: USER_ID,
        },
    ]

    await prisma.notification.createMany({
        data: notifications,
    })
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })