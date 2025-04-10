import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { toast } from "sonner";

const corrigirOklabNoDOM = () => {
    const elementos = document.querySelectorAll("*");

    elementos.forEach((el) => {
        const elemento = el as HTMLElement;
        const styles = getComputedStyle(elemento);

        if (styles.color.includes("oklab")) elemento.style.color = "#0f172a";
        if (styles.backgroundColor.includes("oklab")) elemento.style.backgroundColor = "#0f172a";
        if (styles.borderColor.includes("oklab")) elemento.style.borderColor = "#94A3B8";
    });
};

export const exportToPDF = async (userName: string, year: string) => {
    const relatorio = document.getElementById("relatorio-financeiro");
    if (!relatorio) return;

    corrigirOklabNoDOM();

    const canvas = await html2canvas(relatorio, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#0f172a",
    });

    const imgData = canvas.toDataURL("image/png");

    // Convertendo pixels para milímetros (1px ≈ 0.264583mm)
    const pdfWidth = canvas.width * 0.264583;
    const pdfHeight = canvas.height * 0.264583;

    const pdf = new jsPDF({
        orientation: canvas.width > canvas.height ? "l" : "p",
        unit: "mm",
        format: [pdfWidth, pdfHeight],
    });

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Relatório-Financeiro_${userName}_${year}.pdf`);

    setTimeout(() => {
        window.location.reload();
    }, 100);

    toast.success("Relatório exportado com sucesso!")
};