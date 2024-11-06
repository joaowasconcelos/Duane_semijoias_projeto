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

export default function Login() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const redefinirSenha = ()=>{
    setModalVisible(true)
  }

  const navigateHome = () => {
    navigation.navigate("Home");
  };

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [token, setToken] = useState("");
  

  const decodeJWT = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error("Erro ao decodificar o token", e);
      return null;
    }
  };
  

  const verificaUser = async () => {
    if (email.length <= 150 && email !== "" && senha.length <= 100 && senha !== "") {
      try {
        const response = await api.get(`/VerificaLogin?login=${email}&senha=${senha}`);
         
        if (response.data && response.data.token) {
          const token = response.data.token;
          setToken(token);
          await AsyncStorage.setItem('userToken',(token));
          console.log(token);
          const decodedToken = decodeJWT(token);
          console.log(decodedToken);
        if (decodedToken.perfil === 1) {
            navigateHome(); // Navega para a home somente se o login der certo
        } else  {
          console.log('Usuário não autorizado!');
          alert('Usuário não autorizado!');
        }
        } else {
          alert(response.data.message || "Email ou senha inválidos!");
        }
      } catch (error) {
        if (error.response) {
          alert(error.response.data.message || "Erro ao tentar conectar à API.");
        } else {
          alert("Erro ao tentar conectar à API.");
        }
        console.error("Erro ao fazer o login", error);
      }
    } else {
      alert("Por favor, preencha os campos corretamente.");
    }
  };
  
  
  
  
  

  let [fontsLoaded] = useFonts({
    EBGaramond_400Regular,
    EBGaramond_500Medium,
    EBGaramond_600SemiBold,
    EBGaramond_700Bold,
    EBGaramond_800ExtraBold,
  });

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
              <Image
                source={require("../../assets/Duane.png")}
                style={styles.logoImg}
              />
              <Text style={styles.textTitle}>Seja Bem-vindo(a)!</Text>
            </View>

            <View style={styles.containerElements}>
              <Text style={styles.textElement}>
                Realize o login com as suas credencias
              </Text>
              <View style={styles.containerInputs}>
                <View style={{ width: "80%" }}>
                  <Text style={styles.textInputs}>Email:</Text>
                </View>
                <TextInput
                  style={styles.Inputs}
                  onChangeText={setEmail}
                  value={email}
                ></TextInput>
              </View>
              <View style={styles.containerInputs}>
                <View style={{ width: "80%" }}>
                  <Text style={styles.textInputs}>Senha:</Text>
                </View>
                <TextInput
                  secureTextEntry={true}
                  style={styles.Inputs}
                  onChangeText={setSenha}
                  value={senha}
                ></TextInput>
                <TouchableOpacity onPress={() => {redefinirSenha()}}>
                  <Text style={styles.textForgotPass}>Esqueceu sua senha?</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.btn} onPress={verificaUser}>
                <Text style={styles.textBtn}>Entrar</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 24,

                    color: "#E5969C",
                    fontWeight: "bold",
                  }}
                >
                  Insira um email de recuperação
                </Text>
                <TextInput
                  style={styles.inputModal}
                  placeholder="Email"
                />
                <View
                  style={{
                    width: "100%",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexDirection: "row",
                    marginBottom: 5,
                  }}
                >
                  <TouchableOpacity style={styles.btnModal} onPress={()=> {
                    setModalVisible(false);
                  }}>
                    <Text style={{fontFamily: 'EBGaramond_800ExtraBold', color: '#FFF', fontSize: 20}}>Cancelar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.btnModal} onPress={()=>setModalVisible(false)}>
                    <Text style={{fontFamily: 'EBGaramond_800ExtraBold', color: '#FFF', fontSize: 20}}>Salvar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
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
  },
  containerElements: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  Inputs: {
    width: "80%",
    height: 40,
    fontSize: 22,
    fontFamily: "EBGaramond_400Regular",
    borderRadius: 5,
    backgroundColor: "#FFFF",
    padding: 5,
  },
  btn: {
    width: "60%",
    backgroundColor: "#FFFFFF",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    borderRadius: 10,
    borderColor: "#9B5377",
    borderWidth: 1,
  },
  textBtn: {
    fontFamily: "EBGaramond_800ExtraBold",
    fontSize: 24,
    color: "#633636",
    opacity: 0.7,
  },
  textForgotPass: {
    textAlign: "center",
    fontFamily: "EBGaramond_400Regular",
    fontSize: 19,
    textDecorationLine: "underline",
    color: "opacity: 0.7",
    color: "#C4914D",
    marginTop: 20,
  },
  imgHeader: {
    width: "100%",
    height: "7%",
    position: "absolute",
    top: 0,
  },
  imgFooter: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    height: "7%",
  },
  textElement: {
    fontFamily: "EBGaramond_800ExtraBold",
    fontSize: 26,
    color: "#765555",
    opacity: 0.7,
    textAlign: "center",
  },
  textTitle: {
    fontFamily: "EBGaramond_800ExtraBold",
    fontSize: 34,
    color: "#C4914D",
  },
  logoImg: {
    width: 120,
    height: 120,
  },
  containerLogoTitle: {
    alignItems: "center",
    margin: 50,
  },
  containerInputs: {
    width: "100%",
    marginTop: 10,
    alignItems: "center",
  },
  textInputs: {
    fontSize: 19,
    color: "#AE4B67",
    opacity: 0.5,
    textAlign: "left",
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
    height: "40%",
    elevation: 5,
    shadowColor: '#000',
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
    padding: 15,
    marginBottom: 20,
    width: "100%",
    backgroundColor: "#FFF6f2",
    color: "#E5969C",
    fontSize: 18,
    fontWeight: "bold",
  },
  btnModal: {
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
