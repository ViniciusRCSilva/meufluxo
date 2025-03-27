import { BillRecurrence } from "@prisma/client";

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

export { recurrenceOptions, billRecurrence }