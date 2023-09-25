export const formatCurrency = (valor) => {
  // Converte para número, se possível
  const valorNumerico = typeof valor === 'string' ? parseFloat(valor) : valor;

  // Verifica se o valor é um número
  if (isNaN(valorNumerico)) {
    throw new Error('O valor informado não é um número ou uma string numérica válida.');
  }

  // Formata o valor em reais
  const numeroFormatado = valorNumerico.toFixed(2).replace('.', ',');

  // Adiciona o símbolo "R$" e formata os milhares
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
    // hour: "2-digit",
    // minute: "2-digit",
    // second: "2-digit",
  };

  const dataFormatada = new Intl.DateTimeFormat("pt-BR", opcoesFormato).format(dataObj);

  return formato
    .replace("dd", dataFormatada.substr(0, 2))
    .replace("MM", dataFormatada.substr(3, 2))
    .replace("yyyy", dataFormatada.substr(6, 4))
    // .replace("HH", dataFormatada.substr(11, 2))
    // .replace("mm", dataFormatada.substr(14, 2))
    // .replace("ss", dataFormatada.substr(17, 2));
}

export const formattedNumber = (number) => number.toString().match(/.{1,4}/g)?.join(' ');