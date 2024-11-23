import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  ScrollView,
  TextInput,
  Modal
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import AsyncStorage from '@react-native-async-storage/async-storage';


import AppLoading from "expo-app-loading";
import {
  useFonts,
  EBGaramond_400Regular,
  EBGaramond_500Medium,
  EBGaramond_600SemiBold,
  EBGaramond_700Bold,
  EBGaramond_800ExtraBold,
} from "@expo-google-fonts/eb-garamond";

// import {getStatusBarHeight} from "react-native-status-bar-height";

import api from "../services/api/api";

export default function Home() {
  const route = useRoute();
  const navigation = useNavigation();
  // const [id, setId] = useState(route.params?.id);
  const [modalVisible, setModalVisible] = useState(false);
  const [detalhesMeusDados, setDetalhesMeusDados] = useState([]);
  const [nome, setNome] = useState("");
  const [dataNasc, setDataNasc] = useState("");
  const [telefones, setTelefones] = useState("");

  let [fontsLoaded] = useFonts({
    EBGaramond_400Regular,
    EBGaramond_500Medium,
    EBGaramond_600SemiBold,
    EBGaramond_700Bold,
    EBGaramond_800ExtraBold,
  });

  const navegaCadastroFuncionario = () =>{
    navigation.navigate('CadastroFuncionario')
  }

  const navegaCadastroProduto = () =>{
    navigation.navigate('CadastroProdutos')
  }

  

  const navegaCatalagoProdutos = () =>{
    navigation.navigate('CatalagoProdutos')
  }

  const navegaClientes = () =>{
    navigation.navigate('Clientes')
  }

  const navegaConsultaEdicaoFuncionario = () =>{
    navigation.navigate('ConsultaEdicaoFuncionario')
  }

  const navegaCupons = () =>{
    navigation.navigate('Cupons')
  }

  const navegaPedidos = () =>{
    navigation.navigate('Pedidos')
  }

  const navegaPromocoes = () =>{
    navigation.navigate('Promocoes')
  }

  const navegaRelatoriosVendas = () =>{
    navigation.navigate('RelatorioVendas')
  }

  const navegaCategorias = ()=>{
    navigation.navigate('Categorias')
  }

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token !== null) {
        console.log("Token recuperado:", token);
      } else {
        console.log("Nenhum token encontrado");
      }
    } catch (error) {
      console.error("Erro ao recuperar o token", error);
    }
  };


  const logout = async () => {
    try {
      // Remove o token de autenticação
      await AsyncStorage.removeItem('userToken');
      
      // Redireciona o usuário para a tela de login
      // Exemplo usando React Navigation
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  
  useEffect(() => {
    getToken(); // Chama a função para obter o token
    selecionaDetalhesMeusDados();
  }, []); // O array vazio [] garante que o useEffect rode apenas uma vez quando o componente for montado


  const selecionaDetalhesMeusDados = async ()=>{
    try {
      const token = await AsyncStorage.getItem('userToken');
      await api.get(`/SelecionaInfoUsers`,
        {
          headers: {
            'x-access-token': `${token}`,
          }
        }
      )
      .then(response=>{
        setDetalhesMeusDados(response.data);
        console.log(response.data);
      })
      .catch(error=>{
        console.log("erro na seleção dos dados de usuário",error);
      })
    } catch (error) {
      console.log("Erro com a conexão da rota ", error);
    }
  }

  const modificaMeusDados = async ()=>{
    if(!nome || !dataNasc || !telefones === 0){
      alert("Preencha todos os campos");
    }
    try {
      const token = AsyncStorage.getItem("userToken");
      await api.put(`/ModificarPessoaADM/${id}`, {
        Nome: nome,
        Data_Nasc: dataNasc,
        Telefones: telefones
      },{
        headers: {
          'x-access-token': `${token}`
        }
      })
      .then(response=>{
        setNome(response.data);
        setDataNasc(response.data);
        setTelefones(response.data);
        console.log(response.data);
      })
      .catch(error=>{
        console.log("Erro ao modificar dados",error);
      })
    } catch (error) {
      console.log("Erro ao enviar os dado na rota", error);
    }
  }

  if (!fontsLoaded) {
  } else {
    return (
      <SafeAreaView style={styles.androidSafeArea}>
        <View style={styles.container}>
          <Image
            source={require("../../assets/ondas-rosa-header.png")}
            style={styles.imgHeader}
          />
          <View style={{ flex: 1, width: "100%" }}>
            <View style={styles.containerLogoTitle}>
              <TouchableOpacity
                style={styles.btnLogOut}
                onHoverIn={() => {
                  // Add hover effect here, e.g. change the button's background color
                  styles.btnLogOut.backgroundColor = "#ccc";
                }}
                onHoverOut={() => {
                  // Remove hover effect here, e.g. reset the button's background color
                  styles.btnLogOut.backgroundColor = "#fff";
                }}
                onPress={logout}
              >
                <FontAwesome6
                  name="door-open"
                  color="#ae4b67"
                  size={35}
                />
              </TouchableOpacity>
              <Image
                source={require("../../assets/Duane.png")}
                style={styles.logoImg}
              />

              <Text style={styles.textTitle}>Seja Bem-vindo(a)!</Text>

              <Text style={styles.textElement}>O que deseja fazer?</Text>
            </View>

            <ScrollView>
              <View style={styles.containerElements}>
                <TouchableOpacity style={styles.btn} 
                onPress={
                  ()=>{
                    setModalVisible(true);
                    selecionaDetalhesMeusDados();
                  }
                }>
                  <Text style={styles.textBtn}>Meus dados</Text>
                  <FontAwesome6 name="user-gear" color="#ae4b67" size={26} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.btn} onPress={navegaCadastroProduto}>
                  <Text style={styles.textBtn}>Cadastro de Produtos</Text>
                  <FontAwesome6 name="circle-plus" color="#ae4b67" size={26} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.btn} onPress={navegaCatalagoProdutos}>
                  <Text style={styles.textBtn}>Catálago de Produtos</Text>
                  <FontAwesome6 name="dropbox" color="#ae4b67" size={26} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.btn} onPress={navegaCadastroFuncionario}>
                  <Text style={styles.textBtn}>
                    Cadastro de Funcionários
                  </Text>
                  <FontAwesome6 name="user-plus" color="#ae4b67" size={26} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.btn} onPress={navegaConsultaEdicaoFuncionario}>
                  <Text style={styles.textBtn}>Consulta/Edição de Funcionários</Text>
                  <FontAwesome6
                    name="magnifying-glass"
                    color="#ae4b67"
                    size={26}
                  />
                </TouchableOpacity>

                <TouchableOpacity style={styles.btn} onPress={navegaPedidos}>
                  <Text style={styles.textBtn}>Pedidos</Text>
                  <FontAwesome6 name="box-archive" color="#ae4b67" size={26} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.btn} onPress={navegaClientes}>
                  <Text style={styles.textBtn}>Clientes</Text>
                  <FontAwesome6 name="users" color="#ae4b67" size={26} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.btn} onPress={navegaCupons}>
                  <Text style={styles.textBtn}>Cupons</Text>
                  <FontAwesome6 name="gift" color="#ae4b67" size={26} />
                </TouchableOpacity>

                {/* <TouchableOpacity style={styles.btn} onPress={navegaRelatoriosVendas}>
                  <Text style={styles.textBtn}>Relatórios de Vendas</Text>
                  <FontAwesome6 name="coins" color="#ae4b67" size={26} />
                </TouchableOpacity> */}

                {/* <TouchableOpacity style={styles.btn} onPress={navegaPromocoes}>
                  <Text style={styles.textBtn}>Promoções</Text>
                  <FontAwesome6 name="gifts" color="#ae4b67" size={26} />
                </TouchableOpacity> */}

                <TouchableOpacity style={styles.btn} onPress={navegaCategorias}>
                  <Text style={styles.textBtn}>Categorias</Text>
                  <FontAwesome6 name="layer-group" color="#ae4b67" size={26} />
                </TouchableOpacity>
                
              </View>
            </ScrollView>

            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}
            >
              {detalhesMeusDados.map((detalhesMeuDads)=>(
                <View style={styles.modalContainer} key={detalhesMeuDads.id}>

                <View style={styles.modalContent}>
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 20,
                        color: "#ae4b67",
                        fontWeight: "bold",
                      }}
                    >
                      Meus dados
                    </Text>
                    <View style={{width: '100%', justifyContent: 'center', alignItems: 'flex-start'}}>
                      <Text style={{fontSize: 18, fontFamily: 'EBGaramond_800ExtraBold', color: '#E5969C'}}>Nome:</Text>
                      <TextInput
                        style={styles.inputModal}
                        //value={}
                        //onChangeText={}
                        placeholder="Nome"
                        readOnly
                      >{detalhesMeuDads.nome}</TextInput>
                    </View>
                    <View style={{width: '100%', justifyContent: 'center', alignItems: 'flex-start'}}>
                      <Text style={{fontSize: 18, fontFamily: 'EBGaramond_800ExtraBold', color: '#E5969C'}}>Data de Nascimento:</Text>
                      <TextInput
                        style={styles.inputModal}
                        //value={}
                        //onChangeText={}
                        placeholder="data de nascimento"
                        readOnly
                      >
                        {detalhesMeuDads.data_nasc}
                        </TextInput>
                    </View>
                    <View style={{width: '100%', justifyContent: 'center', alignItems: 'flex-start'}}>
                      <Text style={{fontSize: 18, fontFamily: 'EBGaramond_800ExtraBold', color: '#E5969C'}}>CPF:</Text>
                      <TextInput
                        style={styles.inputModal}
                        //value={}
                        //onChangeText={}
                        placeholder="CPF"
                        readOnly
                      >{detalhesMeuDads.cpf}</TextInput>
                    </View>
                    <View style={{width: '100%', justifyContent: 'center', alignItems: 'flex-start'}}>
                      <Text style={{fontSize: 18, fontFamily: 'EBGaramond_800ExtraBold', color: '#E5969C'}}>Genero:</Text>
                      <TextInput
                        style={styles.inputModal}
                        //value={}
                        //onChangeText={}
                        placeholder="Tipo"
                        readOnly
                      >{detalhesMeuDads.tipo}</TextInput>
                    </View>
                    <View style={{width: '100%', justifyContent: 'center', alignItems: 'flex-start'}}>
                      <Text style={{fontSize: 18, fontFamily: 'EBGaramond_800ExtraBold', color: '#E5969C'}}>Usuário:</Text>
                      <TextInput
                        style={styles.inputModal}
                        //value={}
                        //onChangeText={}
                        placeholder="Usuário"
                        readOnly
                      >{detalhesMeuDads.usuario}</TextInput>
                    </View>
                    <View style={{width: '100%', justifyContent: 'center', alignItems: 'flex-start'}}>
                      <Text style={{fontSize: 18, fontFamily: 'EBGaramond_800ExtraBold', color: '#E5969C'}}>Telefones:</Text>
                      <TextInput
                        style={styles.inputModal}
                        //value={}
                        //onChangeText={}
                        placeholder="Telefones"
                        readOnly
                      >
                        {detalhesMeuDads.numeros ? (
                            detalhesMeuDads.numeros
                              .split(",")
                              .map((num) => <Text>{num}</Text>)
                          ) : (
                            <Text>Número não disponível</Text>
                          )}
                      </TextInput>
                    </View>                
                    
                    <View
                      style={{
                        width: "100%",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexDirection: "row",
                        marginBottom: 5,
                      }}
                    >
                      <TouchableOpacity
                        style={styles.btnModal}
                        onPress={() => {
                          // saveProduto();
                          setModalVisible(false);
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: "EBGaramond_800ExtraBold",
                            color: "#FFF",
                            fontSize: 20,
                          }}
                        >
                          Editar
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.btnModal}
                        onPress={() => setModalVisible(false)}
                      >
                        <Text
                          style={{
                            fontFamily: "EBGaramond_800ExtraBold",
                            color: "#FFF",
                            fontSize: 20,
                          }}
                        >
                          Salvar
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
  
                  {/* {detalhesMeusDados.map(detalhesDados =>(
                    
                  ))} */}
  
                </View>
              ))}
            </Modal>
          </View>
          <Image
            source={require("../../assets/ondas-rosa-footer.png")}
            style={styles.imgFooter}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  androidSafeArea: {
    flex: 1,
    height: "100%",
    width: "100%",
    justifyContent: "center",
    position: "relative",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFDEE7",
    width: "100%",
    height: "100%",
  },
  containerElements: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginBottom: 60,
  },
  btn: {
    width: "85%",
    backgroundColor: "#FFFFFF",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    borderRadius: 10,
    borderColor: "#9B5377",
    borderWidth: 1,
    flexDirection: "row",
  },
  textBtn: {
    fontFamily: "EBGaramond_800ExtraBold",
    fontSize: 18,
    color: "#ae4b67",
    opacity: 0.8,
    margin: 10,
    paddingRight: 5,
  },
  imgHeader: {
    width: "100%",
    height: "7%",
    position: "absolute",
    top: 0,
  },
  imgFooter: {
    width: "100%",
    height: "7%",
    position: "absolute",
    bottom: 0,
  },
  textElement: {
    fontFamily: "EBGaramond_400Regular",
    fontSize: 26,
    color: "#AE4B67",
    textAlign: "center",
  },
  textTitle: {
    fontFamily: "EBGaramond_800ExtraBold",
    fontSize: 32,
    color: "#C4914D",
  },
  logoImg: {
    width: 120,
    height: 120,
  },
  containerLogoTitle: {
    alignItems: "center",
    margin: 20,
    paddingTop: 10,
    position: "relative",
  },
  btnLogOut: {
    position: "absolute",
    alignSelf: "flex-start",
    marginTop: 50,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 10,
    width: "95%",
    height: "95%",
    elevation: 5,
    // shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.7,
    shadowRadius: 5,
    justifyContent: "space-evenly",
    alignItems: "center",
    borderWidth: 2,
    borderColor: '#CF90A2'
  },
  inputModal: {
    borderWidth: 2,
    borderColor: "#CF90A2",
    borderRadius: 10,
    padding: 5,
    marginBottom: 20,
    width: "100%",
    backgroundColor: "#FFF6f2",
    color: "#ae4b67",
    fontSize: 16,
    fontWeight: "bold",
    height: 45
  },
  btnModal:{
    width: "45%",
    backgroundColor: "#E5969C",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderColor: "#9B5377",
    borderWidth: 1,
  }
});
