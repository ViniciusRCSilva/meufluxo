import { auth } from "@clerk/nextjs/server";
import AddBillButton from "./_components/add-bill-button";
import { redirect } from "next/navigation";
import { HelpCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../_components/ui/tooltip";
import { getBills } from "../_actions/bills";
import { columns } from "./_columns/bills";
import { DataTableBills } from "./_components/data-table-bills";

const Bills = async () => {
    const { userId } = await auth();

    if (!userId) {
        redirect("/login");
    }

    const rawBills = await getBills(userId);

    const bills = rawBills?.map((bill) => ({
        date: bill.createdAt.toLocaleDateString(),
        name: bill.name,
        category: bill.category,
        paymentMethod: bill.paymentMethod,
        value: bill.value,
        recurrence: bill.recurrence || "",
        isPaid: bill.isPaid,
        dueDate: bill.dueDate.toLocaleDateString()
    })) || [];

    return (
        <div className="flex flex-col gap-6 px-4 sm:px-10 pt-28 pb-10 font-[family-name:var(--font-poppins)]">
            <div className="flex flex-col lg:flex-row items-center gap-4 lg:justify-between">
                <div className="flex items-center gap-2">
                    <h1 className="text-xl font-semibold">Contas</h1>
                    <Tooltip>
                        <TooltipTrigger className="cursor-pointer">
                            <HelpCircle className="h-6 w-6 text-font-muted" />
                        </TooltipTrigger>
                        <TooltipContent className="w-64 text-center">
                            <p>Visualize, adicione e edite todas as contas que foram feitas na sua conta.</p>
                        </TooltipContent>
                    </Tooltip>
                </div>
                <AddBillButton userId={userId} />
            </div>
            <div>
                <DataTableBills columns={columns} data={bills} />
            </div>
        </div>
    );
};

export default Bills;