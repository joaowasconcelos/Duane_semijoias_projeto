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

            <View style={{width: '100%', alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
              <TextInput placeholder='Pesquise por produto ou categoria' style={styles.Inputs}>
              </TextInput>
              <TouchableOpacity style={{margin: 5}} >
                <FontAwesome6 name="circle-plus" color="#ae4b67" size={30}/>
              </TouchableOpacity>
            </View>

            <ScrollView>
              <View style={styles.containerElements}>
                <View style={styles.btn}>
                  <View style={{justifyContent: 'center', alignItems: 'center', width: '55%'}}>
                    <View style={{justifyContent: "space-between", alignItems: 'center', flexDirection: 'row', width: '100%'}}>
                      <View>
                        <Text style={styles.textBtn}>Categoria:</Text>
                        <Text style={{}}>Brinco</Text>
                      </View>
                      <View>
                        <Text style={styles.textBtn}>Excluir:</Text>
                        <FontAwesome6 name="trash-can" size={28} color="#AE4B67"/>
                      </View>
                    </View>
                  </View>

                  <TouchableOpacity style={{justifyContent: "flex-start", alignItems: 'center', height: '100%'}}>
                    <Text style={styles.textBtn}>Editar:</Text>
                    <FontAwesome6 name="pen-to-square" color="#ae4b67" size={26} />
                  </TouchableOpacity>
                  
                </View>

                

                

                
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
    width: "40%",
    backgroundColor: "#FFFFFF",
    height: 150,
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
  Inputs:{
    width: '80%',
    height: 30,
    fontSize: 18,
    fontFamily: 'EBGaramond_400Regular',
    borderRadius: 5,
    backgroundColor: '#FFF6F2',
    padding: 5,
    color: '#000000',
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: '#CF90A2',
    margin: 5,
  }
});

