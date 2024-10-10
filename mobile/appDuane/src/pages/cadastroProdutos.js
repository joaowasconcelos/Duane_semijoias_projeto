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

              <Text style={styles.textTitle}>Cadastro de Produtos</Text>
              
            </View>

            <View style={styles.containerElements}>
                <View style={{width: '100%', padding: 5}}>
                  <Text style={styles.textElement}>Categoria:</Text>
                  <TouchableOpacity style={{height: 35, backgroundColor: '#FFF6F2', justifyContent: 'center', borderRadius: 5, borderWidth: 1, borderColor: '#9B5377', fontWeight: 'bold'}}>
                    <Picker
                        // selectedValue={}
                        
                        // onValueChange={(itemValue) => setCate(itemValue)}
                    >
                        <Picker.Item label="Selecione a Categoria" value=""/>
                        <Picker.Item label="Brinco" value="Brinco"/>
                        <Picker.Item label="Colar" value="Colar"/>
                        <Picker.Item label="Pulseira" value=""/>
                        <Picker.Item label="Anel" value="Anel"/>
                        <Picker.Item label="Conjunto" value="Conjunto"/>
                    </Picker>
                  </TouchableOpacity>
                  
                </View>
                <View style={{width: '100%', padding: 3}}>
                  <Text style={styles.textElement}>Produto:</Text>
                  <TextInput style={styles.Inputs} onChangeText={()=>{}} placeholder="Insira o nome de um produto"></TextInput>
                </View>
                <View style={{width: '100%', padding: 3}}>
                  <Text style={styles.textElement}>Descrição:</Text>
                  <TextInput style={styles.Inputs} onChangeText={()=>{}} placeholder="Insira a descrição"></TextInput>
                </View>
                <View style={{width: '100%', padding: 3}}>
                  <Text style={styles.textElement}>Preço:</Text>
                  <TextInput style={styles.Inputs} onChangeText={()=>{}} placeholder="Insira o preço"></TextInput>
                </View>
                <View style={{width: '100%', padding: 3}}>
                  <Text style={styles.textElement}>Imagem:</Text>
                  <Text>Obrigatório carregar ao menos 1 foto do produto*</Text>
                  <Text>Adicione no máximo 5 fotos*</Text>
                  <TouchableOpacity onChangeText={()=>{}}>
                    <FontAwesome6 name="file-image" color="#ae4b67" size={46}/>
                  </TouchableOpacity>
                </View>

                <View style={{width: '100%', justifyContent: "space-evenly", alignItems: 'center', flexDirection: 'row', marginBottom: 5}}>
                  <TouchableOpacity style={styles.btn} onChangeText={()=>{}}>
                    <Text style={styles.textBtn}>Cancelar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.btn} onChangeText={()=>{}}>
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
  Inputs:{
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
