import { DataTableTransactions } from "./_components/data-table-transactions";
import { columns } from "./_columns/transactions";
import { auth } from "@clerk/nextjs/server";
import AddTransactionButton from "./_components/add-transaction-button";
import { redirect } from "next/navigation";
import { getTransactions } from "../_actions/transaction";
import { HelpCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../_components/ui/tooltip";

const Transactions = async () => {
    const { userId } = await auth();

    if (!userId) {
        redirect("/login");
    }

    const rawTransactions = await getTransactions(userId);

    const transactions = rawTransactions?.map((transaction) => ({
        date: transaction.createdAt.toLocaleDateString(),
        name: transaction.name,
        category: transaction.category,
        paymentMethod: transaction.paymentMethod,
        value: transaction.value,
        type: transaction.type,
    })) || [];

    return (
        <div className="flex flex-col gap-6 px-4 sm:px-10 pt-28 pb-10 font-[family-name:var(--font-poppins)]">
            <div className="flex flex-col lg:flex-row items-center gap-4 lg:justify-between">
                <div className="flex items-center gap-2">
                    <h1 className="text-xl font-semibold">Transações</h1>
                    <Tooltip>
                        <TooltipTrigger className="cursor-pointer">
                            <HelpCircle className="h-6 w-6 text-font-muted" />
                        </TooltipTrigger>
                        <TooltipContent className="w-64 text-center">
                            <p>Visualize, adicione e edite todas as transações que foram realizadas.</p>
                        </TooltipContent>
                    </Tooltip>
                </div>
                <AddTransactionButton userId={userId} />
            </div>
            <div>
                <DataTableTransactions columns={columns} data={transactions} />
            </div>
        </div>
    );
};

export default Transactions;