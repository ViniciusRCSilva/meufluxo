"use client"

import { Button } from "@/app/_components/ui/button";
import { Plus } from "lucide-react";

interface AddBillButtonProps {
    userId: string;
}

const AddBillButton = ({ userId }: AddBillButtonProps) => {
    return (
        <Button onClick={() => { console.log(userId) }}>
            <Plus className="h-4 w-4" />
            Adicionar conta
        </Button>
    )
}

export default AddBillButton