import { calcularPrecoPrazo } from 'correios-brasil/dist/index.js';

const Correio = {
    calculaFrete: async (req, res) => {
        const { cep } = req.params


        const url = 'https://stg.api.loggi.com/oauth2/token';
        const options = {
            method: 'POST',
            headers: { accept: 'application/json', 'content-type': 'application/json' },
            body: JSON.stringify({ client_id: 'loggi_cliente_xpto', client_secret: 'PaSsWoRd!St@ong&R' })
        };

        fetch(url, options)
            .then(res => res.json())
            .then(json => console.log(json))
            .catch(err => console.error(err));

        // let args = {
        //     sCepOrigem: '13173418',
        //     sCepDestino: cep,
        //     nVlPeso: '1',
        //     nCdFormato: '1',
        //     nVlComprimento: '4',
        //     nVlAltura: '12',
        //     nVlLargura: '4',
        //     nCdServico: ['04014', '04510'], //Array com os códigos de serviço
        //     nVlDiametro: '0',
        // };
        // calcularPrecoPrazo(args)
        // .then(response => {
        //   console.log("Resposta dos Correios:", response);
        // })
        // .catch(error => {
        //   console.error("Erro ao calcular preço e prazo:", error.message);
        //   if (error.response) {
        //     console.log("Resposta de erro:", error.response);
        //   }
        //   if (error.request) {
        //     console.log("Erro de requisição:", error.request);
        //   }
        //   res.status(500).send({ error: error.message });
        // });

    }
}
export default Correio



