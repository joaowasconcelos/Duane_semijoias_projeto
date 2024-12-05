async function dados() {
    try {
        // Fazendo a requisição com axios.get
        responsePed = await axios.get(`${localStorage.getItem("ip")}`);
        console.log(responsePed.data)

        if(responsePed != null || responsePed != undefined){
            criarTabela();
            carregaDadosTabelaPedidos();
        }

    } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
    }
}

dados();


async function Endereco() {
    console.log('opa')
    const token = localStorage.getItem('token');
    console.log(token)
    try {
      const resposta = await axios.get(`${localStorage.getItem("ip")}MeuEnde`, {
        headers: {
          'x-access-token': `${token}`
        }
      });
      console.log(resposta)
      console.log(resposta.data)
  
      const userInfo = resposta.data[0];
      document.querySelector('input[name="Nome"]').value = userInfo.nome
      document.querySelector('input[name="email"]').value = userInfo.usuario;
      document.querySelector('input[name="cpf"]').value = userInfo.cpf;
      document.querySelector('input[name="datNasc"]').value = userInfo.data_nasc;
      document.querySelector('input[name="tel"]').value = userInfo.numeros;
  
  
    } catch (error) {
      console.error('Erro ao verificar o token:', error);
    }
  }
  Endereco()