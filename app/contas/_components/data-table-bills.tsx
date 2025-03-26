"use client"

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getFilteredRowModel,
    ColumnFiltersState,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/app/_components/ui/table"
import { ScrollArea, ScrollBar } from "@/app/_components/ui/scroll-area"
import { cn } from "@/app/_lib/utils"
import { Input } from "@/app/_components/ui/input"
import { Label } from "@/app/_components/ui/label"
import { useState } from "react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/app/_components/ui/select"
import { categoryOptions, categorySelect, paymentMethodOptions, paymentMethodSelect } from "@/app/_utils/selectHelper"
import { Filter, FilterX } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/app/_components/ui/accordion"
import { Separator } from "@/app/_components/ui/separator"
import { Button } from "@/app/_components/ui/button"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DataTableBills<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnFiltersChange: setColumnFilters,
        state: {
            columnFilters,
        },
    })

    return (
        <div className="space-y-4">
            <Accordion type="single" collapsible className="bg-card-foreground p-6 rounded-md">
                <AccordionItem value="filter">
                    <div className="flex items-center justify-between">
                        <AccordionTrigger className="cursor-pointer max-w-fit items-center">
                            <div className="flex items-center gap-2">
                                <Filter className="h-5 w-5 text-link" />
                                <span className="text-xl">Filtros</span>
                            </div>
                        </AccordionTrigger>
                        {columnFilters.length > 0 && (
                            <Button variant="outline" className="text-destructive hover:text-destructive" onClick={() => setColumnFilters([])}>
                                <FilterX className="h-5 w-5" />
                                Limpar filtros
                            </Button>
                        )}
                    </div>
                    <AccordionContent className="flex flex-col lg:flex-row w-full items-start gap-6 lg:gap-10 pt-6">
                        <div className="w-full lg:w-72 flex flex-col gap-2">
                            <Label htmlFor="description" className="text-font-foreground text-sm">Filtrar por descrição</Label>
                            <Input
                                placeholder="Filtrar por descrição..."
                                className="w-full h-11 bg-input border-border/20 transition-colors hover:bg-input-hover focus:ring-2 focus:ring-primary-ring"
                                value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                                onChange={(event) =>
                                    table.getColumn("name")?.setFilterValue(event.target.value)
                                }
                            />
                        </div>
                        <div className="hidden lg:flex h-20 items-center">
                            <Separator orientation="vertical" className="h-full bg-border/20" decorative />
                        </div>
                        <div className="w-full lg:w-auto flex flex-col gap-2">
                            <Label htmlFor="category" className="text-font-foreground text-sm">Filtrar por categoria</Label>
                            <Select
                                value={(table.getColumn("category")?.getFilterValue() as string) ?? "all"}
                                onValueChange={(value) =>
                                    table.getColumn("category")?.setFilterValue(value === "all" ? "" : value)
                                }
                            >
                                <SelectTrigger className="w-full h-11 bg-input border-border/20 transition-colors hover:bg-input-hover focus:ring-2 focus:ring-primary-ring">
                                    <SelectValue placeholder="Filtrar por categoria" />
                                </SelectTrigger>
                                <SelectContent className="font-[family-name:var(--font-poppins)]">
                                    <SelectItem value="all">Todas as categorias</SelectItem>
                                    {categoryOptions.map((option) => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {categorySelect(option.value)}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="hidden lg:flex h-20 items-center">
                            <Separator orientation="vertical" className="h-full bg-border/20" decorative />
                        </div>
                        <div className="w-full lg:w-auto flex flex-col gap-2">
                            <Label htmlFor="paymentMethod" className="text-font-foreground text-sm">Filtrar por método de pagamento</Label>
                            <Select
                                value={(table.getColumn("paymentMethod")?.getFilterValue() as string) ?? "all"}
                                onValueChange={(value) =>
                                    table.getColumn("paymentMethod")?.setFilterValue(value === "all" ? "" : value)
                                }
                            >
                                <SelectTrigger className="w-full h-11 bg-input border-border/20 transition-colors hover:bg-input-hover focus:ring-2 focus:ring-primary-ring">
                                    <SelectValue placeholder="Filtrar por método de pagamento" />
                                </SelectTrigger>
                                <SelectContent className="font-[family-name:var(--font-poppins)]">
                                    <SelectItem value="all">Todos os métodos</SelectItem>
                                    {paymentMethodOptions.map((option) => (
                                        <SelectItem key={option.value} value={option.value}>
                                            {paymentMethodSelect(option.value)}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
            <div className="border border-border/20 rounded-lg overflow-hidden">
                <ScrollArea className="w-full">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow
                                    key={headerGroup.id}
                                    className="border-b-2 border-border/20 bg-card-foreground hover:bg-card-foreground"
                                >
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <TableHead
                                                key={header.id}
                                                className="h-12 px-4 text-font-foreground font-medium text-base"
                                            >
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                            </TableHead>
                                        )
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        className={cn(
                                            "border-b border-border/20 transition-colors",
                                            "hover:bg-secondary/30"
                                        )}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell
                                                key={cell.id}
                                                className="p-4 text-font"
                                            >
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-24 text-center text-font-muted"
                                    >
                                        Nenhuma conta encontrada.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </div>
        </div >
    )
}
