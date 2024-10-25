import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts, EBGaramond_400Regular, EBGaramond_800ExtraBold } from "@expo-google-fonts/eb-garamond";
import api from "../services/api/api";

export default function Home() {
  const [categories, setCategories] = useState([]); // Estado para armazenar categorias
  const navigation = useNavigation();

  let [fontsLoaded] = useFonts({
    EBGaramond_400Regular,
    EBGaramond_800ExtraBold,
  });

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        console.log("Token recuperado:", token);
      } else {
        console.log("Nenhum token encontrado");
      }
    } catch (error) {
      console.error("Erro ao recuperar o token", error);
    }
  };

  useEffect(() => {
    getToken(); 
    selecionaCate();
  }, []);

  const selecionaCate = async () => {
    try {
      const response = await api.get(`http://10.0.3.77:3000/SelecionaCategoria`);
      setCategories(response.data); // Atualiza o estado com as categorias recebidas
    } catch (error) {
      console.error("Erro ao buscar as categorias:", error);
    }
  };

  if (!fontsLoaded) {
    return null; // ou um carregador
  }

  return (
    <SafeAreaView style={styles.androidSafeArea}>
      <View style={styles.container}>
        <Image source={require("../../assets/ondas-rosa-header.png")} style={styles.imgHeader} />
        <View style={{ flex: 1, width: "100%" }}>
          <View style={styles.containerLogoTitle}>
            <TouchableOpacity style={styles.btnLogOut} onPress={() => navigation.goBack()}>
              <FontAwesome6 name="circle-arrow-left" color="#ae4b67" size={35} />
            </TouchableOpacity>
            <Image source={require("../../assets/Duane.png")} style={styles.logoImg} />
            <Text style={styles.textTitle}>Categorias</Text>
          </View>

          <View style={styles.searchContainer}>
            <TextInput placeholder="Pesquise uma categoria" style={styles.Inputs} />
            <TouchableOpacity style={{ margin: 5 }}>
              <FontAwesome6 name="circle-plus" color="#ae4b67" size={30} />
            </TouchableOpacity>
          </View>

          <ScrollView>
            <View style={styles.containerElements}>
              {categories.map(category => (
                <View key={category.id} style={styles.btn}>
                  <View style={{ marginLeft: 10, marginBottom: 7 }}>
                    <Text style={styles.textBtn}>Categoria:</Text>
                    <Text style={{ fontSize: 17, fontWeight: 'bold' }}>{category.tipo}</Text>
                  </View>

                  <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.textBtn}>Excluir:</Text>
                    <FontAwesome6 name="trash-can" size={28} color="#AE4B67" />
                  </TouchableOpacity>

                  <TouchableOpacity style={{ justifyContent: "center", alignItems: "center", height: "100%", marginRight: 10 }}>
                    <Text style={styles.textBtn}>Editar:</Text>
                    <FontAwesome6 name="pen-to-square" color="#ae4b67" size={26} />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
        <Image source={require("../../assets/ondas-rosa-footer.png")} style={styles.imgFooter} />
      </View>
    </SafeAreaView>
  );
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
    width: "80%",
    backgroundColor: "#FFFFFF",
    height: 80,
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
    fontSize: 17,
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
