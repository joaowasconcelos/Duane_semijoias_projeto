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

// import api from "../services/api/api"

export default function Home() {
  const navigation = useNavigation();

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
                  <TextInput placeholder="Nome Completo" style={styles.Inputs}></TextInput>
                  <TextInput placeholder="Data de nascimento" style={styles.Inputs}></TextInput>
                  <TextInput placeholder="E-mail" style={styles.Inputs}></TextInput>
                  <TextInput placeholder="C.P.F" style={styles.Inputs}></TextInput>
                  <TextInput placeholder="Gênero" style={styles.Inputs}></TextInput>
                  <TextInput placeholder="CEP" style={styles.Inputs}></TextInput>
                  <TextInput placeholder="Logradouro" style={styles.Inputs}></TextInput>
                  <TextInput placeholder="Bairro" style={styles.Inputs}></TextInput>
                  <TextInput placeholder="Estado" style={styles.Inputs}></TextInput>
                  <TextInput placeholder="Cidade" style={styles.Inputs}></TextInput>
                  <TextInput placeholder="Complemento" style={styles.Inputs}></TextInput>
                  <TextInput placeholder="Telefone 1" style={styles.Inputs}></TextInput>
                  <TextInput placeholder="Telefone 2 (opcional)" style={styles.Inputs}></TextInput>
                  <TouchableOpacity style={styles.btn}>
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
    marginTop: 10,
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
