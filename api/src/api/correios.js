import { calcularPrecoPrazo } from 'correios-brasil/dist/index.js';


let args = {
    sCepOrigem: '13173418',
    sCepDestino: '13184623',
    nVlPeso: '1',
    nCdFormato: '1',
    nVlComprimento: '4',
    nVlAltura: '12',
    nVlLargura: '4',
    nCdServico: ['04014', '04510'], //Array com os códigos de serviço
    nVlDiametro: '0',
};

calcularPrecoPrazo(args)
  .then(response => {
      console.log(response);
  })
  .catch(error => {
      console.error("Erro ao calcular preço e prazo:", error);
  });
