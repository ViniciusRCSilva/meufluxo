import { Tooltip, TooltipContent, TooltipTrigger } from "../_components/ui/tooltip";
import { HelpCircle } from "lucide-react";
import GoalCard from "./_components/goal-card";
import { getFinancialGoals } from "../_actions/financial-goals";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import AddGoalButton from "./_components/add-goal-button";
import { getBalance } from "../_actions/balance";

const FinancialGoals = async () => {
    const { userId } = await auth();

    if (!userId) {
        redirect("/login");
    }

    const goals = await getFinancialGoals(userId);
    const balance = await getBalance(userId);

    return (
        <div className="flex flex-col gap-6 px-4 sm:px-10 pt-28 pb-10 font-[family-name:var(--font-poppins)]">
            <div className="flex flex-col lg:flex-row items-center gap-4 lg:justify-between">
                <div className="flex items-center gap-2">
                    <h1 className="text-xl font-semibold">Metas financeiras</h1>
                    <Tooltip>
                        <TooltipTrigger className="cursor-pointer">
                            <HelpCircle className="h-6 w-6 text-font-muted" />
                        </TooltipTrigger>
                        <TooltipContent className="w-64 text-center">
                            <p>Visualize, adicione, edite e exclua todas as metas financeiras que foram estabelecidas.</p>
                        </TooltipContent>
                    </Tooltip>
                </div>
                <AddGoalButton userId={userId} balance={balance?.amount || 0} />
            </div>
            {(!goals || goals.length === 0) ? (
                <div className="flex items-center justify-center">
                    <p className="text-font-muted border border-border/20 p-4 rounded-md">Nenhuma meta financeira cadastrada</p>
                </div>
            ) : (
                goals?.map((goal, index) => (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" key={index}>
                        <GoalCard {...goal} />
                    </div>
                ))
            )}
        </div>
    )
}

export default FinancialGoals