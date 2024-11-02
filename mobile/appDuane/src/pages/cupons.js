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
  const [id, setId] = useState("");

  const navegaCadastroNovoCupom = () =>{
    navigation.navigate('CadastroNovoCupom')
  }

  const navegaDetalhesCupom = () =>{
    navigation.navigate('DetalhesCupom',{id: id})
  }

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

  const [cupons, setCupons] = useState([]);
  const selecionaCup = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      await api.get(`/selecionaCupons`,
        {
          headers: {
            'x-access-token': `${token}`,
          }
        }
      )
      .then(response =>{
        setCupons(response.data);
        console.log(response.data);
        setId(response.data);

      })
      .catch(error =>{
        console.log(error)
      });
    } catch (error) {
      console.error("Erro ao buscar os cupons:", error);
    }
  };

  useEffect(() => {
    getToken(); // Chama a função para obter o token
    selecionaCup();
  }, []);


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
                height: "55%",
                borderWidth: 1,
                borderRadius: 10,
                borderColor: "#FAADD1",
                width: "95%",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: '#FFF2F6'
              }}
            >
              <ScrollView>
                <View style={styles.containerElements}>
                  <Text
                    style={{ marginTop: 10, fontSize: 18, fontWeight: "bold", color: '#633636' }}
                  >
                    Todos os Cupons:
                  </Text>
                  {cupons.map(cup =>(
                    <View style={styles.btn}>
                    <View
                      style={{
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "70%",
                      }}
                    >
                      <View 
                        // key={cupons.id}
                        style={{
                          justifyContent: "space-between",
                          alignItems: "center",
                          flexDirection: "row",
                          width: "100%",
                        }}
                      >
                        <View style={{ marginBottom: 10, marginLeft: 20 }}>
                          <Text style={styles.textBtn}>Código:</Text>
                        </View>
                        <View style={{ marginBottom: 10 }}>
                          <Text style={styles.textElement}>{cup.codigo}</Text>
                        </View>
                      </View>

                      <View
                        style={{
                          borderBottomWidth: 2,
                          borderBottomColor: "#FAADD1",
                          width: "100%",
                        }}
                      />

                      <View
                        style={{
                          justifyContent: "space-between",
                          alignItems: "center",
                          flexDirection: "row",
                          width: "100%",
                        }}
                      >
                        <View style={{ marginLeft: 20 }}>
                          <Text style={styles.textBtn}>Status:</Text>
                        </View>
                        <View style={{ marginRight: 40 }}>
                          <Text style={{ margin: 10 }}>{cup.status === 1 ? "Ativo" : "Inativo"}</Text>
                        </View>
                      </View>
                    </View>

                    <TouchableOpacity
                      style={{
                        justifyContent: "flex-start",
                        alignItems: "center",
                        height: "100%",
                        marginTop: 40,
                      }}

                      onPress={()=>navegaDetalhesCupom(cup.id)}
                    >
                      <Text style={styles.textBtn}>Detalhes:</Text>
                      <FontAwesome6
                        name="magnifying-glass"
                        color="#ae4b67"
                        size={26}
                      />
                    </TouchableOpacity>
                  </View>
                  ))}
                </View>
              </ScrollView>
            </View>

            <TouchableOpacity
              style={{
                width: "80%",
                backgroundColor: "#FFFFFF",
                justifyContent: "center",
                alignItems: "center",
                height: 50,
                marginTop: 10,
                borderRadius: 10,
                marginBottom: 5,
                fontWeight: "bold",
              }}

              onPress={navegaCadastroNovoCupom}
            >
              <Text
                style={{
                  color: "#FAADD1",
                  fontSize: 18,
                  fontFamily: 'EBGaramond_800ExtraBold'
                }}
              >
                Cadastrar Novo cupom
              </Text>
            </TouchableOpacity>
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
    width: "80%",
    height: 30,
    fontSize: 18,
    fontFamily: "EBGaramond_400Regular",
    borderRadius: 5,
    backgroundColor: "#FFF6F2",
    padding: 5,
    color: "#000000",
    fontWeight: "bold",
    borderWidth: 1,
    borderColor: "#CF90A2",
    margin: 5,
  },
});
