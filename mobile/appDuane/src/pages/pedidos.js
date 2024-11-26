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
import { useNavigation } from "@react-navigation/native";
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

import api from "../services/api/api"

export default function Home() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  let [fontsLoaded] = useFonts({
    EBGaramond_400Regular,
    EBGaramond_500Medium,
    EBGaramond_600SemiBold,
    EBGaramond_700Bold,
    EBGaramond_800ExtraBold,
  });
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
  const [pedidos, setPedidos] = useState([]);
  const selecionaPedid = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      await api.get(`/SelecionaPedido`, {
        headers:{
          'x-access-token': `${token}`,
        }
      })
      .then(response => {
        setPedidos(response.data);
        setPedidoFiltro(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error("Erro ao selecionar o pedido", error);
      });
      
    } catch (error) {
      console.error("Erro ao buscar o pedido:", error);
    }
  };


  useEffect(() => {
    getToken(); // Chama a função para obter o token
    selecionaPedid();
    detalhesDoPedido();
  }, []);

  useEffect(() => {
    console.log(pedidos)
  }, [pedidos]);

  const pressDetails = () =>{
    setModalVisible(true);
  }

  const [detalhesPedido, setDetalhesPedido] = useState([]);
  const detalhesDoPedido = async ()=>{
    try {
      const token = await AsyncStorage.getItem('userToken');
      await api.get(`/MeuPedido/${id}`,{
        headers:{'x-access-token': `${token}`,}
      })
      .then(response => {
        setDetalhesPedido(response.data);
        console.log(response.data);
      })
      .catch(error=>{
        console.error("Erro ao buscar os detalhes do pedido", error);
      })
    } catch (error) {
      console.log("Erro ao acessar a rota", error);
    }
  }

  const [pedidoFiltro, setPedidoFiltro] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      const filtro = pedidos.filter((item) => {
        return (
          item.id.toLowerCase().includes(query.toLowerCase()) ||
          item.status.toLowerCase().includes(query.toLowerCase())
        );
      });
      setPedidoFiltro(filtro);
    } else {
      setPedidoFiltro(pedidos);
    }
  };



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
                onPress={() => navigation.goBack()}
              >
                <FontAwesome6
                  name="circle-arrow-left"
                  color="#ae4b67"
                  size={35}
                />
              </TouchableOpacity>
              <Image
                source={require("../../assets/Duane.png")}
                style={styles.logoImg}
              />

              <Text style={styles.textTitle}>Pedidos</Text>


            </View>


            <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
              <TextInput placeholder='Pesquise pelo código ou status' value={searchQuery} onChangeText={handleSearch} style={styles.Inputs}>
              </TextInput>
            </View>

            <ScrollView>
              <View style={styles.containerElements}>
                {(pedidoFiltro.length > 0 ? pedidoFiltro : pedidos).map(pedid => (
                  <View key={pedid.id} style={styles.btn}>
                    <View style={{ justifyContent: 'space-between', alignItems: 'center', width: '70%' }}>
                      <View style={{ justifyContent: "space-between", alignItems: 'center', flexDirection: 'row', width: '100%' }}>
                        <View>
                          <Text style={styles.textBtn}>Código:</Text>
                          <Text  style={{}}>{pedid.id}</Text>
                        </View>
                        <View style={{}}>
                          <Text style={styles.textBtn}>Data do pedido: </Text>
                          <Text style={styles.textElement}>{pedid.data_formatada}</Text>
                        </View>
                      </View>

                      <View style={{ borderBottomWidth: 2, borderBottomColor: '#FAADD1', width: '100%' }} />

                      <View style={{ justifyContent: "space-between", alignItems: 'center', flexDirection: 'row', width: '100%' }}>
                        <View style={{ justifyContent: 'center' }} >
                          <Text style={styles.textBtn}>Status:</Text>
                          <Text style={{}}>{pedid.status === 1 ? "Ativo" : "Inativo"}
                            </Text>
                        </View>
                       
                      </View>
                    </View>

                    <TouchableOpacity style={{ justifyContent: "flex-start", alignItems: 'center', height: '100%', marginTop: 40 }}
                    onPress={()=>{pressDetails()}}
                    >
                      <Text style={styles.textBtn}>Detalhes:</Text>
                      <FontAwesome6 name="magnifying-glass" color="#ae4b67" size={26} />
                    </TouchableOpacity>

                  </View>
                ))}





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
              {detalhesPedido.map((detalhesPedid)=>(
                <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 20,
                      color: "#ae4b67",
                      fontWeight: "bold",
                    }}
                  >
                    Detalhes do Pedido
                  </Text>
                  <View style={{width: '100%', justifyContent: 'center', alignItems: 'flex-start'}}>
                    <Text style={{fontSize: 18, fontFamily: 'EBGaramond_800ExtraBold', color: '#E5969C'}}>Código:</Text>
                    <TextInput
                      style={styles.inputModal}
                      //value={}
                      //onChangeText={}
                      placeholder="Código"
                      readOnly
                    >{detalhesPedid.nome_cliente}</TextInput>
                  </View>
                  <View style={{width: '100%', justifyContent: 'center', alignItems: 'flex-start'}}>
                    <Text style={{fontSize: 18, fontFamily: 'EBGaramond_800ExtraBold', color: '#E5969C'}}>Data do pedido:</Text>
                    <TextInput
                      style={styles.inputModal}
                      //value={}
                      //onChangeText={}
                      placeholder="Data do pedido"
                      readOnly
                    >{detalhesPedid.data}</TextInput>
                  </View>
                  <View style={{width: '100%', justifyContent: 'center', alignItems: 'flex-start'}}>
                    <Text style={{fontSize: 18, fontFamily: 'EBGaramond_800ExtraBold', color: '#E5969C'}}>Status:</Text>
                    <TextInput
                      style={styles.inputModal}
                      //value={}
                      //onChangeText={}
                      placeholder="Status"
                      readOnly
                    ></TextInput>
                  </View>
                  <View style={{width: '100%', justifyContent: 'center', alignItems: 'flex-start'}}>
                    <Text style={{fontSize: 18, fontFamily: 'EBGaramond_800ExtraBold', color: '#E5969C'}}>Produtos:</Text>
                    <TextInput
                      style={styles.inputModal}
                      //value={}
                      //onChangeText={}
                      placeholder=""
                      readOnly
                    ></TextInput>
                  </View>
                  
                  
                  <View
                    style={{
                      width: "100%",
                      justifyContent: "flex-end",
                      alignItems: "center",
                      flexDirection: "row",
                      marginBottom: 5,
                    }}
                  >
                    
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
                        Fechar
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

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
    width: "95%",
    backgroundColor: "#FFFFFF",
    height: 110,
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: 20,
    borderRadius: 10,
    borderColor: "#FAADD1",
    borderWidth: 2,
    flexDirection: "row",
  },
  textBtn: {
    fontFamily: "EBGaramond_800ExtraBold",
    fontSize: 15,
    color: "#ae4b67",
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
    // fontFamily: "EBGaramond_400Regular",
    fontSize: 14,
    textAlign: "center",
    marginRight: 40
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
  Inputs: {
    width: '80%',
    height: 30,
    fontSize: 18,
    fontFamily: 'EBGaramond_400Regular',
    borderRadius: 5,
    backgroundColor: '#FFF6F2',
    padding: 5,
    color: '#000000',
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: '#CF90A2',
    margin: 5,
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
    height: "65%",
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
