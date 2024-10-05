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

  const navegaCadastroFuncionario = () =>{
    navigation.navigate('CadastroFuncionario')
  }

  const navegaCadastroNovoCupom = () =>{
    navigation.navigate('CadastroNovoCupom')
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

  const navegaDetalhesCupom = () =>{
    navigation.navigate('DetalhesCupom')
  }

  const navegaDetalhesPromocao = () =>{
    navigation.navigate('DetalhesPromocao')
  }

  const navegaGeraPromocao = () =>{
    navigation.navigate('GeraPromocao')
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
                onPress={()=>{}}
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

                <TouchableOpacity style={styles.btn} onPress={navegaRelatoriosVendas}>
                  <Text style={styles.textBtn}>Relatórios de Vendas</Text>
                  <FontAwesome6 name="coins" color="#ae4b67" size={26} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.btn} onPress={navegaPromocoes}>
                  <Text style={styles.textBtn}>Promoções</Text>
                  <FontAwesome6 name="gifts" color="#ae4b67" size={26} />
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
});
