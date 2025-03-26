import { BillRecurrence } from "@prisma/client";

const recurrenceLabel = (recurrence: BillRecurrence) => {
    switch (recurrence) {
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

export { recurrenceLabel }