import { BillRecurrence, Bill } from "@prisma/client";
import { addNotification } from "../_actions/notifications";

const recurrenceOptions = [
    { value: "NONE", label: "Sem recorrência" },
    { value: "DAILY", label: "Diário" },
    { value: "WEEKLY", label: "Semanal" },
    { value: "MONTHLY", label: "Mensal" },
    { value: "YEARLY", label: "Anual" },
];

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
    if (daysUntilDue <= 7) {
        await addNotification({
            title: "Conta a pagar",
            message: `A conta ${bill.name} está próxima do vencimento (${bill.dueDate.toLocaleDateString("pt-BR")})`,
            isRead: false,
            type: "BILL",
            userId: bill.userId
        })
    }
}

export { recurrenceOptions, billRecurrence, notifyNearbyBill }