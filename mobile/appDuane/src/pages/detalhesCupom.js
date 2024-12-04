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
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';
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
  const route = useRoute();
  const navigation = useNavigation();
  const [id, setId] = useState(route.params?.id);
  const [codigo, setCodigo] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [valor, setValor] = useState("");
  const [descricao, setDescricao] = useState("");
  const [modCupom, setModCupom] = useState("");
  const [cupomId, setCupomId] = useState("");

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

  const [detalhesCupom, setDetalhesCupom] = useState([]);
  const selecionaDetalhesCup = async () => {
    try {      
      const token = await AsyncStorage.getItem('userToken');
      await api.get(`/selecionaCupons/${id}`,{
        headers: {
          'x-access-token': `${token}`,
        }
      })
      .then(response=>{
        setDetalhesCupom(response.data);
        setCodigo(response.data[0].codigo);
        setDescricao(response.data[0].descricao);
        setQuantidade(response.data[0].quantidade);
        setValor(response.data[0].valor);
        setId(response.data.id);
        console.log(response.data);
      })
      .catch((error) => {
          console.error("Erro ao recuperar os detalhes do cupom", error);
        }
      );
    } catch (error) {
      console.error("Erro ao buscar as clientes:", error);
    }
  };

  useEffect(() => {
    getToken(); // Chama a função para obter o token
    selecionaDetalhesCup();
  }, []);

  const modificaCup = async ()=>{
    if(!codigo || !descricao || !quantidade || !valor === 0){
      alert("Preencha todos os campos");
      return;
    }
    try {
      const token = await AsyncStorage.getItem('userToken');
      await api.put(`/ModificaCupom/${id}`,
      {
        Codigo: codigo,
        Descricao: descricao,
        Quantidade: quantidade,
        Valor: valor
      },
      {
        headers: {
          'x-access-token': `${token}`,
        }
      })
      .then(response => {
        setModCupom(id);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Erro ao modificar o cupom", error);
      })
    } catch (error) {
      console.log("Erro do try", error);
    }
  }


  const inativaCupom = async (id)=>{
    try {
      const token = await AsyncStorage.getItem("userToken");
      await api.get(`/DeletaCupom/${id}`,
        {
          id: id,
        },
        {
          headers:{
            'x-access-token': `${token}`
          }
        }
      ).then(response=>{
        setCupomId(response.data);
        console.log(response.data);
        alert("Cupom Inativado com sucesso!")
      }).catch(error=>{
        console.error("Erro ao inativar o cupom", error); 
      })
    } catch (error) {
      console.log("Erro do try", error);
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
          <View style={{ flex: 1, width: "100%", alignItems: "center" }}>
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

              <Text style={styles.textTitle}>Cupons</Text>
            </View>

            <View
              style={{
                height: "60%",
                borderWidth: 1,
                borderRadius: 10,
                borderColor: "#FAADD1",
                width: "97%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ScrollView style={{ width: "100%" }}>
                <View style={styles.containerElements}>
                  <Text
                    style={{
                      marginTop: 10,
                      fontSize: 18,
                      fontWeight: "bold",
                      color: "#633636",
                    }}
                  >
                    Detalhes do Cupom:
                  </Text>

                  {detalhesCupom.map(detalhesCup => (
                    <View 
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                    }}
                    key={detalhesCup.id}
                  >
                    <View
                      style={{ width: "90%", justifyContent: "flex-start", marginTop: 10 }}
                    >
                      <Text style={styles.textBtn}>Código:</Text>
                      <TextInput style={styles.Inputs} onChangeText={setCodigo} value={codigo}></TextInput>
                    </View>

                    <View
                      style={{ width: "90%", justifyContent: "flex-start" }}
                    >
                      <Text style={styles.textBtn}>Quantidade:</Text>
                      <TextInput style={styles.Inputs} onChangeText={setQuantidade} value={quantidade}></TextInput>
                    </View>

                    <View
                      style={{ width: "90%", justifyContent: "flex-start" }}
                    >
                      <Text style={styles.textBtn}>Descrição:</Text>
                      <TextInput style={styles.Inputs} onChangeText={setDescricao} value={descricao}></TextInput>
                    </View>

                    

                    <View
                      style={{ width: "90%", justifyContent: "flex-start" }}
                    >
                      <Text style={styles.textBtn}>
                        Valor/Porcentagem do desconto:
                      </Text>
                      <TextInput style={styles.Inputs} onChangeText={setValor} value={valor}></TextInput>
                    </View>

                    <View
                      style={{
                        width: "100%",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                        flexDirection: "row",
                        margin: 10,
                      }}
                    >
                      <TouchableOpacity
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        onChangeText={modificaCup}
                      >
                        <FontAwesome6 name="pen" size={40} color="#ae4b67" />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        onChangeText={() => {
                          Alert.alert(
                            "Atenção",
                            "Você deseja excluir a cupom?",
                            [
                              {
                                text: "Sim",
                                onPress: () => inativaCupom(detalhesCup.id),

                              },
                              {
                                text: "Não",
                                onPress: ()=>{return},
                                style: 'cancel',
                              }
                            ]
                          )
                        }}
                      >
                        <FontAwesome6
                          name="trash-can"
                          size={40}
                          color="#ae4b67"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  ))}
                </View>
              </ScrollView>
            </View>
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
  },
  btn: {
    width: "35%",
    backgroundColor: "#E5969C",
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    borderRadius: 10,
    borderColor: "#9B5377",
    borderWidth: 1,
  },
  textBtn: {
    fontFamily: "EBGaramond_800ExtraBold",
    fontSize: 19,
    color: "#ae4b67",
    marginLeft: 8,
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
    marginRight: 40,
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
    width: "100%",
  },
  btnLogOut: {
    position: "absolute",
    marginTop: 50,
    left: 50,
  },
  Inputs: {
    width: "100%",
    height: 35,
    fontSize: 18,
    fontFamily: "EBGaramond_400Regular",
    borderRadius: 10,
    backgroundColor: "#FFF6F2",
    padding: 5,
    color: "#000000",
    fontWeight: "bold",
    borderWidth: 1,
    borderColor: "#CF90A2",
    margin: 5,
  },
  textButton: {
    fontFamily: "EBGaramond_800ExtraBold",
    fontSize: 19,
    color: "#FFFFFF",
    padding: 5,
    textAlign: "center",
  },
});
