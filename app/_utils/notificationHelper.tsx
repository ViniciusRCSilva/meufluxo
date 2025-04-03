import { DollarSign, FileText, Target, Bell } from "lucide-react";

const notificationIcon = (type: string) => {
    switch (type) {
        case "FINANCIAL_GOAL":
            return <div className="p-2 rounded-md bg-primary/10 group-hover:bg-primary/20 transition-colors"><Target className="w-5 h-5 text-link" /></div>;
        case "BILL":
            return <div className="p-2 rounded-md bg-primary/10 group-hover:bg-primary/20 transition-colors"><FileText className="w-5 h-5 text-link" /></div>;
        case "TRANSACTION":
            return <div className="p-2 rounded-md bg-primary/10 group-hover:bg-primary/20 transition-colors"><DollarSign className="w-5 h-5 text-link" /></div>;
        default:
            return <div className="p-2 rounded-md bg-primary/10 group-hover:bg-primary/20 transition-colors"><Bell className="w-5 h-5 text-link" /></div>;
    }
}

export { notificationIcon }