import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  Modal,
  Picker,
  Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  useFonts,
  EBGaramond_400Regular,
  EBGaramond_800ExtraBold,
} from "@expo-google-fonts/eb-garamond";
import api from "../services/api/api";

export default function Home() {
  const [categories, setCategories] = useState([]); // Estado para armazenar categorias
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  let [fontsLoaded] = useFonts({
    EBGaramond_400Regular,
    EBGaramond_800ExtraBold,
  });

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
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
      const response = await api.get(
        `/SelecionaCategoria`
      );
      setCategories(response.data); // Atualiza o estado com as categorias recebidas
    } catch (error) {
      console.error("Erro ao buscar as categorias:", error);
    }
  };

  if (!fontsLoaded) {
    return null; // ou um carregador
  }

  const handleAddCat = () => {
    setCategories();
    setModalVisible(true);
  };

  const saveAddCat = () => {
    setModalVisible(false);
  };

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
            <Text style={styles.textTitle}>Categorias</Text>
          </View>

          <View style={styles.searchContainer}>
            <TextInput
              placeholder="Pesquise uma categoria"
              style={styles.Inputs}
            />
            <TouchableOpacity
              style={{ margin: 5 }}
              onPress={() => handleAddCat()}
            >
              <FontAwesome6 name="circle-plus" color="#ae4b67" size={30} />
            </TouchableOpacity>
          </View>

          <ScrollView>
            <View style={styles.containerElements}>
              {categories.map(category => (
                <View key={category.id} style={styles.contentElements}>
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
                  Cadastre a nova categoria
                </Text>
                <TextInput
                  style={styles.inputModal}
                  placeholder="Insira aqui a nova categoria"
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
                    saveAddCat();
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
        </View>
        <Image
          source={require("../../assets/ondas-rosa-footer.png")}
          style={styles.imgFooter}
        />
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
  contentElements: {
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
  btnModal: {
    width: "45%",
    backgroundColor: "#E5969C",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderColor: "#9B5377",
    borderWidth: 1,
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
    justifyContent: "center",
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
    width: "70%",
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
  searchContainer: {
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
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
});
