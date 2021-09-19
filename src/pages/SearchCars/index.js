import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, TextInput, FlatList, Image, TouchableOpacity, Alert} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

import api from '../services/api';

export default function SearchCars() {
    const navigation = useNavigation();
    const route = useRoute();
    
    const [placa, setPlaca] = useState(); 
    
    const [veiculos, setVeiculos] = useState([]);
    const [count, setCount] = useState(0);

    const [searchPlaca, setSearchPlaca] = useState(); 

    function navigateBack() {
        navigation.goBack()
    }

    function navigateNewCar() {
        navigation.navigate('SearchClientes');
    }

    function navigateService(veiculo) {
      //console.log(veiculo);
      navigation.navigate('OrdServices', {veiculo});
    }

    useEffect(() => {     
      api.get(`carros`).then(resp => {                    
       setVeiculos(resp.data);
      
        }).catch(err => {console.log('tot. carros', veiculos.length);
    
      });
    }, []); 

    useEffect(() => {
        api.get(`veiculos/${placa}`).then(resp => {                    
            setVeiculos(resp.data);
          
          }).catch(placaAlert);
    }, [placa]); 

    const placaAlert = () =>
      Alert.alert(
      "Placa invalida!",
      "Tente novamente.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={{alignSelf: 'center', justifyContent: 'center', marginTop: 20,}} onPress={navigateBack} >
                    <AntDesign name="leftcircleo" size={24} color="white" />         
                </TouchableOpacity>
                <Image 
                    source={require('../../assets/images/logo_white.png')}
                    style={styles.image}
                />
                <TouchableOpacity style={{alignSelf: 'center', justifyContent: 'center', marginTop: 20}} onPress={navigateNewCar} >
                <Image 
                    source={require('../../assets/images/iconcar.png')}
                    style={styles.imgCar}
                />             
                </TouchableOpacity>
            </View>
            <View style={styles.containerSearch}>                     
                <TextInput 
                  style={styles.input } 
                  placeholder= "Informe a Placa" 
                  autoCorrect= {false} 
                  value={placa}
                  onChangeText={setPlaca}
                />
                <TouchableOpacity style={{alignSelf: 'center', justifyContent: 'center'}} onPress={() => {}} >
                  <AntDesign name = "search1" size = {24} color = "black" />      
                </TouchableOpacity>
            </View>
            <View style={styles.card}>
                <FlatList 
                    data={veiculos}
                    keyExtractor = {(veiculo, index) => index.toString()} 
                    renderItem={({item: veiculo}) => (
                    <TouchableOpacity onPress={() => navigateService(veiculo)}> 
                    <View style={styles.itensCars}>                
                        <View style={styles.linhaOne}>
                            <Text style={styles.txtLinhaOne}>
                                {veiculo.carPlaca}                            
                            </Text>
                            <Text style={styles.txtLinhaTwo}>
                                {veiculo.carModelo}                           
                            </Text>    
                            <Text style={styles.txtLinhaTwo}>
                                {veiculo.carMarca}
                            </Text>
                        </View>   
                        <View style={styles.linhaTwo}>                            
                            <Text style={styles.txtLinhaTwo}>
                                {veiculo.cliNome}
                            </Text>
                        </View>                                                
                    </View>
                    </TouchableOpacity> 
                    )}
                />            
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      backgroundColor: '#002040',
    },

    header: {
        width: '100%',
        height:120,
        backgroundColor: '#002040',
        flexDirection: 'row',       
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },

    image: {
        width: 100,
        height: 60,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 5,
        padding: 10,
    },

    imgCar: {
      width: 60,
      height: 40,
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 5,
      padding: 10,
  },

    txtPeriodo: {
        fontFamily: 'Roboto_400Regular',
        fontSize: 26,
        marginHorizontal: '1%',
        marginLeft: 15,
        color: '#fff',
    },

    btnSubmit: {
        backgroundColor: '#006060',
        width: '90%',
        height: 55,
        marginTop: 35,
        marginLeft: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7,
        shadowColor: "#000",
        shadowOffset: {
	        width: 0,
	        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 7,
    },

    SubmitText: {
        color: '#FFF',
        fontSize: 18,
    },

    containerSearch: {
      width: '90%',
      height: 40,
      backgroundColor: '#fff',
      marginLeft: 20,
      borderRadius: 7,
      flexDirection: 'row',       
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
    },

    input: {
      color: '#000',
      fontSize: 18,      
    },

    card: {
      flex: 1,
      width: '100%',
      backgroundColor: '#001040',
    },

    itensCars: {
        backgroundColor: '#CCC',
        width: 320,
        height: 70,
        padding: 5,
        marginVertical: 8,
        marginHorizontal: 5,
        marginTop: 10,
        marginLeft: 20,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
      },

      linhaOne: {
        width: '95%',
        display:'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },

      txtLinhaOne: {
        color: 'black',  
        fontSize: 20,
      },

      linhaTwo: {
        width: '95%',        
        display:'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      },

      txtLinhaTwo: {
        color: 'black',
        fontSize: 15,
      },
});