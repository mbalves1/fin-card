export const formatCurrency = (valor) => {
  const valorNumerico = typeof valor === 'string' ? parseFloat(valor) : valor;

  if (isNaN(valorNumerico)) {
    throw new Error('O valor informado não é um número ou uma string numérica válida.');
  }

  const numeroFormatado = valorNumerico.toFixed(2).replace('.', ',');

  return `R$ ${numeroFormatado.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
};

export const inOut = (valor) => {
  return valor === 'Saída' ? 'red' : 'green'
}

export const formatDate = (dataUTC, formato = "dd/MM/yyyy") => {
  const dataObj = new Date(dataUTC);
  const opcoesFormato = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };

  const dataFormatada = new Intl.DateTimeFormat("pt-BR", opcoesFormato).format(dataObj);

  return formato
    .replace("dd", dataFormatada.substr(0, 2))
    .replace("MM", dataFormatada.substr(3, 2))
    .replace("yyyy", dataFormatada.substr(6, 4))
}

export const formattedNumber = (number) => number.toString().match(/.{1,4}/g)?.join(' ');

export const useMonths = () => {
  const months = ref([
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho',
    'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ]);

  return months;
};

export const useMonthsRef = () => {
  const monthMap = ref({
    "Janeiro": 0, "Fevereiro": 1, "Março": 2, "Abril": 3, "Maio": 4, "Junho": 5,
    "Julho": 6, "Agosto": 7, "Setembro": 8, "Outubro": 9, "Novembro": 10, "Dezembro": 11
  });
  return monthMap
}

export const paymentMethod = (payment) => {
  if (!payment) return
  const methods = {
    0: "Cartão",
    1: "Dinheiro",
    2: "Pix",
  }
  return methods[payment]
}

export const formatCategory = (category) => {
  const categoryName = category.map(({categoryname}) => {
    return categoryname
  })

  return categoryName[0]
}