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
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker'; // Importando ImagePicker

import AppLoading from "expo-app-loading";
import {
  useFonts,
  EBGaramond_400Regular,
  EBGaramond_500Medium,
  EBGaramond_600SemiBold,
  EBGaramond_700Bold,
  EBGaramond_800ExtraBold,
} from "@expo-google-fonts/eb-garamond";

import api from "../services/api/api"

export default function Home() {
  const navigation = useNavigation();
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

  const [cate, setCate] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [preco, setPreco] = useState("");
  const [produto, setProduto] = useState("");
  const [descricao, setDescricao] = useState("");
  const [imagens, setImagens] = useState([]); // Estado para armazenar as imagens

  const selecionaCate = async () => {
    try {
      const response = await api.get(`/SelecionaCategoria`);
      setCate(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Erro ao buscar as categorias:", error);
    }
  };

  useEffect(() => {
    getToken();
    selecionaCate();
  }, []);

  const salvar = async () => {
    if (!produto || !selectedCategory || !preco || !descricao || imagens.length === 0) {
      alert("Todos os campos são obrigatórios e deve haver pelo menos uma imagem.");
      return;
    }

    try {
      const token = await AsyncStorage.getItem('userToken');
      const formData = new FormData();
      imagens.forEach((imagem, index) => {
        console.log(`URI da imagem ${index}:`, imagem);
        formData.append("imagem", {
          uri: imagem,
          type: 'image/jpeg',
          name: `imagem.jpg`, 
        });
      });
      formData.append('produto', produto);
      formData.append('categoria', selectedCategory);
      formData.append('preco', preco);
      formData.append('descricao', descricao);
      console.log(formData)
      const response = await api.post('/CreateProduto', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-access-token': `${token}`, // O token JWT
        },        

      });

      if (response.data.error) {
        alert(response.data.error);
      } else {
        alert("Produto criado com sucesso!");
        setProduto("");
        setDescricao("");
        setPreco("");
        setSelectedCategory("");
        setImagens([]); // Limpa as imagens após o sucesso
      }
    } catch (error) {
      console.error("Erro ao criar o produto", error);
      alert("Erro ao criar o produto, tente novamente.");
    }
  }

  const escolherImagens = async () => {
    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [150, 200],
      quality: 1,
      // Limite o número de imagens aqui se necessário
    });

    if (!resultado.canceled) {
      const novasImagens = resultado.assets.map(asset => asset.uri);
      setImagens(prevImagens => [...prevImagens, ...novasImagens]);
    }
  };

  if (!fontsLoaded) {
    return null;
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

              <Text style={styles.textTitle}>Cadastro de Produtos</Text>
            </View>
            <View style={styles.containerElements}>
              <View style={{ width: '100%', padding: 5 }}>
                <Text style={styles.textElement}>Categoria:</Text>
                <TouchableOpacity style={{ height: 35, backgroundColor: '#FFF6F2', justifyContent: 'center', borderRadius: 5, borderWidth: 1, borderColor: '#9B5377', fontWeight: 'bold' }}>
                  <Picker
                    selectedValue={selectedCategory}
                    onValueChange={(itemValue) => setSelectedCategory(itemValue)}
                  >
                    <Picker.Item label="Selecione a Categoria" value="" />
                    {cate.map((category) => (
                      <Picker.Item
                        key={category.id}
                        label={category.tipo}
                        value={category.id}
                      />
                    ))}
                  </Picker>
                </TouchableOpacity>
              </View>
              <View style={{ width: '100%', padding: 3 }}>
                <Text style={styles.textElement}>Produto:</Text>
                <TextInput
                  style={styles.Inputs}
                  placeholder="Insira o nome de um produto"
                  onChangeText={setProduto}
                  value={produto}
                />
              </View>
              <View style={{ width: '100%', padding: 3 }}>
                <Text style={styles.textElement}>Descrição:</Text>
                <TextInput
                  style={styles.Inputs}
                  onChangeText={setDescricao}
                  value={descricao}
                  placeholder="Insira a descrição"
                />
              </View>
              <View style={{ width: '100%', padding: 3 }}>
                <Text style={styles.textElement}>Preço:</Text>
                <TextInput
                  style={styles.Inputs}
                  onChangeText={setPreco}
                  value={preco}
                  placeholder="Insira o preço"
                />
              </View>
              <View style={{ width: '100%', padding: 3 }}>
                <Text style={styles.textElement}>Imagem:</Text>
                <Text>Obrigatório carregar ao menos 1 foto do produto*</Text>
                <Text>Adicione no máximo 5 fotos*</Text>
                <TouchableOpacity onPress={escolherImagens}>
                  <FontAwesome6 name="file-image" color="#ae4b67" size={46} />
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 5}}>
                  {imagens.map((imagem, index) => (
                    <Image
                      key={index}
                      source={{ uri: imagem }}
                      style={{ width: 50, height: 50, margin: 3, borderWidth: 1, borderColor: '#Faaad1', borderRadius: 10 }}
                    />
                  ))}
                </View>
              </View>

              <View style={{ width: '100%', justifyContent: "space-evenly", alignItems: 'center', flexDirection: 'row', marginBottom: 5 }}>
                <TouchableOpacity style={styles.btn} onPress={() => navigation.goBack()}>
                  <Text style={styles.textBtn}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn} onPress={salvar}>
                  <Text style={styles.textBtn}>Salvar</Text>
                </TouchableOpacity>
              </View>
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
    width: "95%",
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#FAADD1',
    borderRadius: 10
  },
  btn: {
    width: "30%",
    backgroundColor: "#E5969C",
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
    fontSize: 18,
    color: "#FFFFFF",
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
    fontSize: 18,
    color: "#AE4B67",
    textAlign: "left",
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
    width: '100%',
    height: 35,
    fontSize: 18,
    fontFamily: 'EBGaramond_400Regular',
    borderRadius: 5,
    backgroundColor: '#FFF6F2',
    padding: 5,
    color: '#000000',
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: '#9B5377',
  },
});
