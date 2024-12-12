import { MercadoPagoConfig, Preference } from 'mercadopago';

import Pessoa from '../model/Pessoa.js';
import Endereco from '../model/Endereco.js';

const Pagamento = {
    PagamentoMP: async (req, res) => {
        const idEndereco = req.body.idEndereço
        const id = req.id
        const infoEndereco = await Endereco.SelecionaEnderecoId(idEndereco)
        const infoPessoa = await Pessoa.SelecionaUserId(id)
        // const totalComDesconto = req.body.totalComDesconto

        const infoPessoaAtual = infoPessoa.map(item => ({
            id: item.id,
            nome: item.nome,
            cpf: item.cpf,
            email: item.usuario,
            number: item.numero.substring(2),
            area_code: item.numero.substring(0, 2)
        }))

        let cartString = req.body.cart;
        let cart = JSON.parse(cartString);

        const cartAtual = cart.map(item => ({
            id: item.id,
            category_id: null,
            currency_id: 'BRL',
            description: null,
            picture_url: item.img,
            title: item.nome_produto,
            unit_price: parseFloat(item.preco_normal),
            quantity: item.quantity
        }));

        // const totalOriginal = cartAtual.reduce((total, item) => total + item.unit_price * item.quantity, 0);
        // console.log("Total Original:", totalOriginal);

        // // Garantindo que o valor do total com desconto seja válido
        // const totalComDescontoAplicado = totalComDesconto || totalOriginal;
        // console.log("Total com Desconto Aplicado:", totalComDescontoAplicado);


        try {
            const client = new MercadoPagoConfig({ accessToken: 'TEST-7981712700966503-110517-76cca7be1211cfd770080acca36b1571-1948077339' });
            const preference = new Preference(client);

            preference.create({
                body: {
                    payment_methods: {
                        excluded_payment_methods: [
                            {
                                id: "amex"
                            }
                        ],
                        excluded_payment_types: [],
                        installments: 12
                    },
                    items: cartAtual,
                    payer: {
                        phone: { area_code: infoPessoaAtual[0].area_code, number: infoPessoaAtual[0].number },
                        address: { zip_code: infoEndereco[0].cep, street_name: infoEndereco[0].logradouro, street_number: null },
                        email: infoPessoaAtual[0].email,
                        identification: { number: infoPessoaAtual[0].cpf, type: 'CPF' },
                        name: infoPessoaAtual[0].nome,
                        surname: '',
                        date_created: null,
                        last_purchase: null
                    },
                    back_urls: { failure: '', pending: '', success: 'http://127.0.0.1:5501/publico/html/pedidoFinalizado.html' },
                    shipments: {
                        default_shipping_method: null,
                        receiver_address: {
                            zip_code: infoEndereco[0].cep,
                            street_name: infoEndereco[0].logradouro,
                            street_number: infoEndereco[0].numero_endereco,
                            floor: 1,
                            apartment: infoEndereco[0].complemento,
                            city_name: infoEndereco[0].cidade,
                            state_name: infoEndereco[0].estado,
                            country_name: "Brasil"
                        }
                    }

                }
            }).then(response => {
                console.log(response)
                const id = response.id
                return res.json({ id })
            }).catch(error => {
                console.log(error)
            });


        } catch (error) {
            console.log(error)
        }
    },
    // Preference:async(req,res)=>{
    //     const client = new MercadoPagoConfig({ accessToken: 'TEST-7981712700966503-110517-76cca7be1211cfd770080acca36b1571-1948077339' });
    //     const preference = new Preference(client);

    //     const preferenceId = req.params.id
    //     console.log(preference)
    //     console.log(preferenceId)

    //     preference.get({preferenceId})
    //         .then(response => {
    //             // const items = response.items;
    //             // console.log('Itens do pedido:', items);

    //             // // Processa e insere no banco de dados ou exibe os itens
    //             // items.forEach(item => {
    //             //     console.log(`Item: ${item.title}, Quantidade: ${item.quantity}, Preço: ${item.unit_price}`);
    //             // });
    //         }).catch(error => {
    //             console.log(error)
    //         })
    // }
}
export default Pagamento
