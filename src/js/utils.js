function formatarTempoViagem(tempo_viagem) {
    if (typeof tempo_viagem === "number" || /^\d+$/.test(tempo_viagem)) {
        const horas = parseInt(tempo_viagem, 10);
        return `${String(horas).padStart(2, '0')}H00`;
    }

    if (typeof tempo_viagem === "string" && tempo_viagem.includes(':')) {
        const [horas, minutos] = tempo_viagem.split(':');
        const horasFormatadas = String(parseInt(horas, 10)).padStart(2, '0');
        const minutosFormatados = String(parseInt(minutos, 10)).padStart(2, '0');
        return `${horasFormatadas}H${minutosFormatados}`;
    }

    return "00H00";
}

function formatDate(dateString) {
    if (!dateString) return null
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${day}/${month}/${year}`;
}

function formatarHora(dataHora) {
    if (typeof dataHora === "string" && dataHora.includes(' ')) {
        const [data, hora] = dataHora.split(' ');
        if (hora) {
            const [horas, minutos] = hora.split(':');
            const horasFormatadas = String(parseInt(horas, 10)).padStart(2, '0');
            const minutosFormatados = String(parseInt(minutos, 10)).padStart(2, '0');
            return `${horasFormatadas}H${minutosFormatados}`;
        }
    }
    return "00H00";
}

function formatMoney(money) {
    return parseFloat(money.replace("R$","").replace(".","").replace(" ","").replace(",","."))
}

function calcularValor(valor, desconto = null, percent = 0) {
    let desc  = desconto ? desconto : 0;
    let valorComDesconto = valor - desc;
    let valorFinal = valorComDesconto - (valorComDesconto * percent);
    return (valorFinal);
}

const formatCurrency = (number) => {
    if(!number){
        return '';
    }
    const formatter = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
    });
    return formatter.format(number);
}

function gerarStringTiposComodos(tiposComodos) {
    if (Array.isArray(tiposComodos)) {
        return [...new Set(tiposComodos.map(comodo => comodo.nome))].join(" | ");
    }
    return "";
}

const pacerls = [
  { value: 1, percent: 0.05 },
  { value: 2, percent: 0.07 },
  { value: 3, percent: 0.08 },
  { value: 4, percent: 0.09 },
  { value: 5, percent: 0.10 },
  { value: 6, percent: 0.11 },
];

export { formatarTempoViagem, formatDate, formatarHora, formatMoney, calcularValor, formatCurrency, pacerls, gerarStringTiposComodos };


