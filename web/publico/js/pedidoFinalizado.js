$(document).ready(function () {
    var url = window.location.href;
    var params = new URLSearchParams(url.split('?')[1]);
    const queryParams = {};

    // Adicionar os parâmetros ao objeto
    queryParams.collection_id = params.get('collection_id');
    queryParams.collection_status = params.get('collection_status');
    queryParams.payment_id = params.get('payment_id');
    queryParams.status = params.get('status');
    queryParams.external_reference = params.get('external_reference');
    queryParams.payment_type = params.get('payment_type');
    queryParams.merchant_order_id = params.get('merchant_order_id');
    queryParams.preference_id = params.get('preference_id');
    queryParams.site_id = params.get('site_id');
    queryParams.processing_mode = params.get('processing_mode');
    queryParams.merchant_account_id = params.get('merchant_account_id');

    // Exibir os parâmetros no console
    console.log(queryParams);
    consultarDetalhesPagamento(queryParams.preference_id)
});


function consultarDetalhesPagamento(preferenceId) {
    const token = localStorage.getItem('token');
    console.log(preferenceId)
    console.log("aqui11")
    console.log(token)
    try {
        axios.get(`${localStorage.getItem("ip")}infoPedidos/${preferenceId}`, {
            headers: {
                'x-access-token': token,
            }
        })
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
    } catch (error) {
        console.log("error",error)
    }
    
}
