import { BillRecurrence, Bill } from "@prisma/client";
import { addNotification } from "../_actions/notifications";
import { addBill } from "../_actions/bills";
import { Check, Hourglass } from "lucide-react";

const recurrenceOptions = [
    { value: "NONE", label: "Sem recorrência" },
    { value: "DAILY", label: "Diário" },
    { value: "WEEKLY", label: "Semanal" },
    { value: "MONTHLY", label: "Mensal" },
    { value: "YEARLY", label: "Anual" },
];

const billStatusOptions = [
    { value: true, label: "Pago" },
    { value: false, label: "Pendente" },
]

const billStatusSelect = (status: boolean) => {
    switch (status) {
        case true:
            return (
                <span className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-success" />
                    Pago
                </span>
            );
        case false:
            return (
                <span className="flex items-center gap-2">
                    <Hourglass className="w-4 h-4 text-warning" />
                    Pendente
                </span>
            );
    }
}

const billRecurrence = (recurrence: BillRecurrence) => {
    switch (recurrence) {
        case "NONE":
            return "Sem recorrência";
        case "DAILY":
            return "Diário";
        case "WEEKLY":
            return "Semanal";
        case "MONTHLY":
            return "Mensal";
        case "YEARLY":
            return "Anual";
    }
}

const notifyNearbyBill = async (bill: Bill) => {
    const dueDate = new Date(bill.dueDate);
    const today = new Date();
    const daysUntilDue = Math.floor((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    if (daysUntilDue < 0) {
        await addNotification({
            title: "Conta vencida",
            message: `A conta ${bill.name} venceu no dia ${bill.dueDate.toLocaleDateString("pt-BR")}. Por favor, regularize o pagamento o mais breve possível.`,
            isRead: false,
            type: "BILL",
            userId: bill.userId
        })
    } else if (daysUntilDue <= 7) {
        await addNotification({
            title: "Conta a pagar",
            message: `A conta ${bill.name} está próxima do vencimento (${bill.dueDate.toLocaleDateString("pt-BR")}). Não se esqueça de realizar o pagamento.`,
            isRead: false,
            type: "BILL",
            userId: bill.userId
        })
    }
}

const handleRecurrence = async (bill: Bill) => {
    const lastDateRecurrence = new Date(bill.dueDate);

    switch (bill.recurrence) {
        case "DAILY":
            lastDateRecurrence.setDate(lastDateRecurrence.getDate() + 1);
            break;
        case "WEEKLY":
            lastDateRecurrence.setDate(lastDateRecurrence.getDate() + 7);
            break;
        case "MONTHLY":
            lastDateRecurrence.setMonth(lastDateRecurrence.getMonth() + 1);
            break;
        case "YEARLY":
            lastDateRecurrence.setFullYear(lastDateRecurrence.getFullYear() + 1);
            break;
        case "NONE":
        default:
            return;
    }

    await addBill({
        name: bill.name,
        value: bill.value,
        dueDate: lastDateRecurrence,
        category: bill.category,
        paymentMethod: bill.paymentMethod,
        recurrence: bill.recurrence || "",
        isPaid: false,
        userId: bill.userId
    });

    await addNotification({
        title: "Conta recorrente",
        message: `A conta ${bill.name} foi criada e agendada para ${lastDateRecurrence.toLocaleDateString("pt-BR")}`,
        isRead: false,
        type: "BILL",
        userId: bill.userId
    })
};

export {
    recurrenceOptions,
    billStatusOptions,
    billStatusSelect,
    billRecurrence,
    notifyNearbyBill,
    handleRecurrence
}