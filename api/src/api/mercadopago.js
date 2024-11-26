import { MercadoPagoConfig, Preference } from 'mercadopago';

const Pagamento = {
    PagamentoMP: async (req, res) => {
        console.log("aqwertryuoip")
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
                    items: [
                        {
                            title: 'My product',
                            quantity: 1,
                            unit_price: 2000
                        }
                    ],
                }
            }).then(response => {
                console.log(response)
            }).catch(error => {
                console.log(error)
            });

            
        } catch (error) {
            console.log(error)
        }
    }
}
export default Pagamento
