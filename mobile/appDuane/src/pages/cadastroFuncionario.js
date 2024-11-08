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
import AppLoading from "expo-app-loading";
import {
  useFonts,
  EBGaramond_400Regular,
  EBGaramond_500Medium,
  EBGaramond_600SemiBold,
  EBGaramond_700Bold,
  EBGaramond_800ExtraBold,
} from "@expo-google-fonts/eb-garamond";
import { Picker } from "@react-native-picker/picker";

// import {getStatusBarHeight} from "react-native-status-bar-height";

import api from "../services/api/api"

export default function Home() {
  const navigation = useNavigation();
  const [nome, setNome] = useState("");
  const [dataNasc, setDataNasc] = useState(null);
  const [usuario, setUsuario] = useState("");
  const [cpf, setCpf] = useState("");
  const [genero, setGenero] = useState("");
  const [telefone1, setTelefone1] = useState("");
  const [telefone2, setTelefone2] = useState("");
  const [perfil, setPerfil] = useState([]);

  
  

  let [fontsLoaded] = useFonts({
    EBGaramond_400Regular,
    EBGaramond_500Medium,
    EBGaramond_600SemiBold,
    EBGaramond_700Bold,
    EBGaramond_800ExtraBold,
  });

  const getToken = async (id) => {
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

  const salvarUser = async ()=>{
    if(!nome || !dataNasc || !usuario || !cpf || !genero ||  !telefone1 === 0){
      alert("Preencha os campos necessários");
      return;
    }
    try {
      const token = await AsyncStorage.getItem('userToken');
      await api.post('/CreateADM',  {
        Nome: nome,
        Data_Nasc: dataNasc,
        Usuario: usuario,
        CPF: cpf,
        Genero: genero,
        Telefones: telefone1,
        perfil: perfil
      }, {
        headers: {
          'x-access-token': `${token}`,
        }
      })
      .then(response=>{
        setNome(response.data);
        setDataNasc(response.data);
        setUsuario(response.data);
        setCpf(response.data);
        setGenero(response.data);
        setPerfil(response.data);
        setTelefone1(response.data);
        console.log(response.data);
      })
      .catch(error=>{
        console.error(error);
      })
      if(response.data.error){
        alert(response.data.error);
      }else{
        alert("Cadastro realizado com sucesso");
      }
    } catch (error) {
      console.error("Erro ao cadastrar  o usuário", error);
      alert("Erro ao cadastrar o usuário, tente novamente.");
    }
  }

  useEffect(()=>{
    getToken()
  },[]);

  if (!fontsLoaded) {
  } else {
    return (
      <SafeAreaView style={styles.androidSafeArea}>
        <View style={styles.container}>
          <Image
            source={require("../../assets/ondas-rosa-header.png")}
            style={styles.imgHeader}
          />
          <View style={{ flex: 1, width: "100%", alignItems: 'center' }}>
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

              <Text style={styles.textTitle}>Cadastro Funcionário</Text>
            </View>

            
            <ScrollView style={{width: '100%', marginBottom: 60}}>
              <View style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                  <TextInput placeholder="Nome Completo" onChangeText={setNome} value={nome} style={styles.Inputs}></TextInput>
                  <TextInput placeholder="Data de nascimento" style={styles.Inputs} onChangeText={setDataNasc} value={dataNasc}></TextInput>
                  <TextInput placeholder="C.P.F" style={styles.Inputs} onChangeText={setCpf} value={cpf}></TextInput>
                  <TextInput placeholder="Gênero" style={styles.Inputs} onChangeText={setGenero} value={genero}></TextInput>
                  <TextInput placeholder="Email" style={styles.Inputs} onChangeText={setUsuario} value={usuario}></TextInput>
                  <TextInput placeholder="Telefone 1" style={styles.Inputs} onChangeText={setTelefone1} value={telefone1}></TextInput>
                  <TextInput placeholder="Telefone 2 (opcional)" style={styles.Inputs} onChangeText={setTelefone2} value={telefone2}></TextInput>
                  <TextInput placeholder="perfil" style={styles.Inputs} onChangeText={setPerfil} value={perfil}></TextInput>
                  {/* <TouchableOpacity style={{ height: 35, backgroundColor: '#FFFF', justifyContent: 'center', borderRadius: 5, borderWidth: 1, borderColor: '#FAADD1', fontWeight: 'bold', width: '85%', textAlign: 'center' }}>
                    <Picker 
                      selectedValue={selectedPerfil}
                      onValueChange={(itemValue) => setSelectedPerfil(itemValue)}
                      style={{textAlign: 'center', width: '100%' }}
                    >
                      <Picker.Item label="Selecione o tipo de Perfil" value="" />
                      {perfil.map((perfils) => (
                        <Picker.Item
                          key={perfils.id}
                          label={perfils.tipo}
                          value={perfils.tipo}
                        />
                      ))}
                    </Picker>
                  </TouchableOpacity> */}
                  
                  
                  <TouchableOpacity style={styles.btn} onPress={salvarUser}>
                    <Text style={styles.textBtn}>Cadastrar/Editar</Text>
                  </TouchableOpacity>
              </View>
              
            </ScrollView>

            

            
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
    width: "70%",
    backgroundColor: "#FFFFFF",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
    borderRadius: 10,
    borderColor: "#9B5377",
    borderWidth: 1,
    flexDirection: "row",
  },
  textBtn: {
    fontFamily: "EBGaramond_800ExtraBold",
    fontSize: 18,
    color: '#633636', 
    opacity: 0.7,
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
  Inputs:{
    width: '85%',
    height: 35,
    fontSize: 18,
    fontFamily: 'EBGaramond_600SemiBold',
    borderRadius: 5,
    backgroundColor: '#FFFF',
    padding: 5,
    margin: 5,
    borderWidth: 1,
    borderColor: '#FAADD1',
    textAlign: 'center'
  }
});
