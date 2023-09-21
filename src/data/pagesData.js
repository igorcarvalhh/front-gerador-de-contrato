const headersData = {
  projeto: {
    title: "Quantas e quais são as fase do projeto?",
    subtitle: "Informe a quantidade de fases da cadeia de inovação",
  },
  participantes: {
    title: "Quais são as empresas participantes?",
    subtitle: "Selecione as empresas que participarão do contrato.",
  },
  etapas: {
    title: "Quais são as etapas do projeto?",
    subtitle: "Descreva as etapas que compõem cada fase do projeto",
  },
  repasses: {
    title: "Quias são os repasses de cada empresa?",
    subtitle:
      "Para todas as etapas, defina o valor e a empresa que pagará/receberá cada rubrica referente aos custos do projeto",
  },
  gerarContrato: {
    title: "Gerar contrato",
    subtitle: "Preencha as informações a seguir para gerar o contrato",
  },
};

export default function getHeaderData(pageName) {
  return headersData[pageName];
}
