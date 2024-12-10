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
  Modal,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
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

import api from "../services/api/api";

export default function Home() {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const [id, setId] = useState("");
  const [descricao, setDescricao] = useState("");
  const [nomeProduto, setNomeProduto] = useState("");
  const [valor, setValor] = useState("");
  const [status, setStatus] = useState("");
  const [idCate, setIdCate] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [cate, setCate] = useState([]);
  const [statusPreco, setStatusPreco] = useState("");
  const [prodFiltro, setProdFiltro] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [imagens, setImagens] = useState([]);

  const navegaCadastroProduto = () => {
    navigation.navigate("CadastroProdutos");
  };

  const pressBtnDetalhes = () => {
    setModalVisible(true);
  };

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
    selecionaProduto();
    selecionaCate();
  }, []);

  const [prod, setProd] = useState([]);
  const selecionaProduto = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      await api
        .get(`/SelecionaProduto`, {
          headers: {
            "x-access-token": `${token}`,
          },
        })
        .then((response) => {
          setProd(response.data); // Atualiza o estado com os produtos recebidos
          setProdFiltro(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.log("Erro ao selecionar categorias", error);
        });
    } catch (error) {
      console.error("Erro ao buscar os produtos:", error);
    }
  };

  const [detalhesProduto, setDetalhesProduto] = useState([]);
  const buscaId = (id) => {
    const item = prod.find((produto) => produto.id === id);

    if (item) {
      setId(item.id);
      setNomeProduto(item.nome_produto);
      setDescricao(item.descricao);
      setValor(item.preco_normal);
      setSelectedCategory(item.id_categoria); // Ajuste com o campo correto para a categoria
      setDetalhesProduto([item]);
      setModalVisible(true);
    } else {
      alert("Produto não encontrado.");
    }
  };

  useEffect(() => {
    setSelectedCategory(detalhesProduto.tipo);
    // console.log("categoria selecionada", detalhesProduto[0].tipo);
  }, [detalhesProduto]);

  const InativaProduto = async (id) => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      await api
        .put(
          `/InativaProduto/${id}`,
          {
            id: id,
          },
          {
            headers: {
              "x-access-token": `${token}`,
            },
          }
        )
        .then((response) => {
          setId(response.data);
          console.log(response.data);
          alert("Produto inativado com sucesso!");
        })
        .catch((error) => {
          console.error("Erro ao inativar produto", error);
        });
    } catch (error) {
      console.log("Erro ao inativar produto", error);
    }
  };

  const escolherImagens = async () => {
    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [150, 200],
      quality: 1,
      // Limite o número de imagens aqui se necessário
    });

    if (!resultado.canceled) {
      const novasImagens = resultado.assets.map((asset) => asset.uri);
      setImagens((prevImagens) => [...prevImagens, ...novasImagens]);
    }
  };

  const modificaProd = async () => {
    if (!descricao || !nomeProduto || !valor) {
      alert("Preencha todos os campos!");
      return;
    }
    try {
      const token = await AsyncStorage.getItem("userToken");
      await api
        .put(
          `/ModificarProduto/${id}`,
          {
            Descricao: descricao,
            NomeProduto: nomeProduto,
            Valor: valor,
            Status: status,
            ID_Categoria: selectedCategory,
          },
          {
            headers: { "x-access-token": `${token}` },
          }
        )
        .then((response) => {
          console.log("Produto modificado:", response.data);
          alert("Produto alterado com sucesso!");
          setModalVisible(false);
          selecionaProduto(); // Atualiza a lista de produtos
        })
        .catch((error) => {
          console.error("Erro ao modificar produto", error);
          alert("Erro ao alterar o produto. Tente novamente.");
        });
    } catch (error) {
      console.error("Erro ao acessar a rota de modificar produto:", error);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      const filtro = prod.filter((item) => {
        return (
          item.nome_produto.toLowerCase().includes(query.toLowerCase()) ||
          item.tipo.toLowerCase().includes(query.toLowerCase())
        );
      });
      setProdFiltro(filtro);
    } else {
      setProdFiltro(prod);
    }
  };

  const selecionaCate = async () => {
    try {
      await api
        .get(`/SelecionaCategoria`)
        .then((response) => {
          setCate(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.error("Erro ao buscar as categorias:", error);
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

              <Text style={styles.textTitle}>Catálago de Produtos</Text>
            </View>

            <View
              style={{
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
              }}
            >
              <TextInput
                placeholder="Pesquise por produto ou categoria"
                style={styles.Inputs}
                onChangeText={handleSearch}
                value={searchQuery}
              />
              <TouchableOpacity
                style={{ margin: 5 }}
                onPress={navegaCadastroProduto}
              >
                <FontAwesome6 name="circle-plus" color="#ae4b67" size={30} />
              </TouchableOpacity>
            </View>

            <ScrollView>
              <View style={styles.containerElements}>
                {(prodFiltro.length > 0 ? prodFiltro : prod).map((produto) => (
                  <View key={produto.id} style={styles.btn}>
                    <View style={{}}>
                      <Image
                        source={{ uri: produto.imagens[0] }}
                        style={{
                          width: 70,
                          height: 70,
                          borderRadius: 5,
                          margin: 5,
                        }}
                      />
                    </View>

                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        width: "55%",
                      }}
                    >
                      <View
                        style={{
                          justifyContent: "space-between",
                          alignItems: "center",
                          flexDirection: "row",
                          width: "100%",
                        }}
                      >
                        <View>
                          <Text style={styles.textBtn}>Categoria:</Text>
                          <Text style={{}}>{produto.tipo}</Text>
                        </View>
                        <View>
                          <Text style={styles.textBtn}>Preço:</Text>
                          <Text style={styles.textElement}>
                            {produto.preco_normal}
                          </Text>
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
                        style={{ justifyContent: "flex-start", width: "100%" }}
                      >
                        <Text style={styles.textBtn}>Produto:</Text>
                        <Text style={{}}>{produto.nome_produto}</Text>
                      </View>
                    </View>

                    <View
                      style={{
                        width: "20%",
                        height: "50%",
                        justifyContent: "center",
                      }}
                    >
                      <TouchableOpacity
                        style={{
                          justifyContent: "flex-start",
                          alignItems: "center",
                          height: "100%",
                        }}
                        onPress={() => buscaId(produto.id)}
                      >
                        <Text style={styles.textBtn}>Detalhes:</Text>
                        <FontAwesome6
                          name="file-circle-plus"
                          color="#ae4b67"
                          size={20}
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          justifyContent: "flex-start",
                          alignItems: "center",
                          height: "100%",
                        }}
                        onPress={() => {
                          Alert.alert(
                            "Atenção",
                            "Você deseja excluir o produto?",
                            [
                              {
                                text: "Sim",
                                onPress: () => InativaProduto(produto.id),
                              },
                              {
                                text: "Não",
                                onPress: () => {
                                  return;
                                },
                                style: "cancel",
                              },
                            ]
                          );
                        }}
                      >
                        <Text style={styles.textBtn}>Excluir:</Text>
                        <FontAwesome6
                          name="trash-can"
                          color="#ae4b67"
                          size={20}
                        />
                      </TouchableOpacity>
                    </View>
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
              {detalhesProduto.map((detalhesProd) => (
                <View style={styles.modalContainer} key={detalhesProd.id}>
                  <View style={styles.modalContent}>
                    <Text
                      style={{
                        textAlign: "center",
                        fontSize: 20,
                        color: "#ae4b67",
                        fontWeight: "bold",
                      }}
                    >
                      Detalhes do Produto
                    </Text>
                    <View
                      style={{
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "flex-start",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 18,
                          fontFamily: "EBGaramond_800ExtraBold",
                          color: "#E5969C",
                        }}
                      >
                        Categoria:
                      </Text>
                      <TouchableOpacity
                        style={{
                          height: 35,
                          backgroundColor: "#FFF6F2",
                          justifyContent: "center",
                          borderRadius: 5,
                          borderWidth: 1,
                          borderColor: "#9B5377",
                          fontWeight: "bold",
                          width: "100%",
                        }}
                      >
                        <Picker
                          selectedValue={selectedCategory}
                          onValueChange={(itemValue) =>
                            setSelectedCategory(itemValue)
                          }
                        >
                          <Picker.Item label="Selecione a Categoria" value="" />
                          {cate.map((category) => (
                            <Picker.Item
                              key={category.id}
                              label={category.tipo}
                              value={selectedCategory} // Garante que seja o ID da categoria
                            />
                          ))}
                        </Picker>
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "flex-start",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 18,
                          fontFamily: "EBGaramond_800ExtraBold",
                          color: "#E5969C",
                        }}
                      >
                        Produto:
                      </Text>
                      <TextInput
                        style={styles.inputModal}
                        value={nomeProduto}
                        onChangeText={setNomeProduto}
                        placeholder="Produto"
                      ></TextInput>
                    </View>
                    <View
                      style={{
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "flex-start",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 18,
                          fontFamily: "EBGaramond_800ExtraBold",
                          color: "#E5969C",
                        }}
                      >
                        Preço Normal:
                      </Text>
                      <TextInput
                        style={styles.inputModal}
                        value={valor}
                        onChangeText={setValor}
                        placeholder="Valor"
                      ></TextInput>
                    </View>

                    <View
                      style={{
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "flex-start",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 18,
                          fontFamily: "EBGaramond_800ExtraBold",
                          color: "#E5969C",
                        }}
                      >
                        Descrição:
                      </Text>
                      <TextInput
                        style={styles.inputModal}
                        value={descricao}
                        onChangeText={setDescricao}
                        placeholder="Descrição"
                      ></TextInput>
                    </View>
                    <View
                      style={{
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "flex-start",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 18,
                          fontFamily: "EBGaramond_800ExtraBold",
                          color: "#E5969C",
                        }}
                      >
                        Imagens:
                      </Text>
                      <TouchableOpacity onPress={escolherImagens}>
                        <FontAwesome6
                          name="circle-plus"
                          color="#ae4b67"
                          size={36}
                        />
                      </TouchableOpacity>
                      <View
                        style={{
                          flexDirection: "row",
                          flexWrap: "wrap",
                          marginTop: 5,
                        }}
                      >
                        {imagens.map((imagem, index) => (
                          <Image
                            key={index}
                            source={{ uri: imagem }}
                            style={{
                              width: 50,
                              height: 50,
                              margin: 3,
                              borderWidth: 1,
                              borderColor: "#Faaad1",
                              borderRadius: 10,
                            }}
                          />
                        ))}
                      </View>
                      {/* <Image
                        source={{ uri: detalhesProd.imagens[0] }}
                        style={{
                          width: 70,
                          height: 70,
                          borderRadius: 5,
                          margin: 5,
                        }}
                      /> */}
                    </View>
                    <View
                      style={{
                        width: "100%",
                        justifyContent: "space-evenly",
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
                          Cancelar
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.btnModal}
                        onPress={modificaProd}
                      >
                        <Text
                          style={{
                            fontFamily: "EBGaramond_800ExtraBold",
                            color: "#FFF",
                            fontSize: 20,
                          }}
                        >
                          Editar
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
    height: 90,
    justifyContent: "space-between",
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
    height: "90%",
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
    borderColor: "#CF90A2",
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
    height: 45,
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
});
