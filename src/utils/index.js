export const timeout = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const calculateTextareaRows = (value) => {
  return Math.floor((value !== null ? value.length : 60) / 50) + 3;
};

export const formatQuantidadeEntregaveis = (quantidade) => {
  const str_quantidade = quantidade.toString();
  const size = str_quantidade.length;
  if (size === 1) {
    return "0" + str_quantidade;
  }
  return str_quantidade;
};
