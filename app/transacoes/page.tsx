import { DataTableTransactions } from "./_components/data-table-transactions";
import { columns } from "./_columns/transactions";
import { auth } from "@clerk/nextjs/server";
import AddTransactionButton from "./_components/add-transaction-button";
import { redirect } from "next/navigation";
import { getTransactions } from "../_actions/transaction";

const Transacoes = async () => {
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
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold">Transações</h1>
                <AddTransactionButton userId={userId} />
            </div>
            <div>
                <DataTableTransactions columns={columns} data={transactions} />
            </div>
        </div>
    );
};

export default Transacoes;