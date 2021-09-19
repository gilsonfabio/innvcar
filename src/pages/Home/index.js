import React, {useEffect} from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, BackHandler, Alert} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

export default function Home() {
    const navigation = useNavigation();
    const route = useRoute();
    
    function navigateBack() {
        navigation.goBack()
    }

    function handleCadastro() {
        navigation.navigate('SearchCars'); 
    }

    function imprimePDF() {
        navigation.navigate('PrintPDF'); 
    }

    useEffect(() => {     
        BackHandler.addEventListener('hardwareBackPress', backPressed)
        return () => {
            BackHandler.removeEventListener('hardwareBackPress',backPressed)
        }
      }, []);

      const backPressed = () => {
          Alert.alert(
              'Exit InnvCar',
              'Deseja sair do App?',
              [
                {text: 'Yes', onPress: () => BackHandler.exitApp()},
                {text: 'No'}
              ],
              {cancelable: false}
          )
      }

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={{alignSelf: 'center', justifyContent: 'center', marginTop: 20}} onPress={navigateBack} >
                    <AntDesign name="leftcircleo" size={24} color="white" />         
                </TouchableOpacity>
                <Image 
                    source={require('../../assets/images/logo_white.png')}
                    style={styles.image}
                />
                <TouchableOpacity style={{alignSelf: 'center', justifyContent: 'center', marginTop: 20}}>
                    <AntDesign name="user" size={24} color="white" />              
                </TouchableOpacity>
            </View>
            <View>      
                <Text style={styles.txtPeriodo}>Escolha a opção desejada</Text>
                <TouchableOpacity style={styles.btnSubmit}
                    onPress={handleCadastro}>                        
                    <Text style={styles.SubmitText}>Lançar novo Check List</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.btnSubmit}
                    onPress={() => {}}>                        
                    <Text style={styles.SubmitText}>Consultar Check List</Text>
                </TouchableOpacity>  

                <TouchableOpacity style={styles.btnSubmit}
                    onPress={() => {}}>                        
                    <Text style={styles.SubmitText}>Estatisticas Check List</Text>
                </TouchableOpacity>  
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

    txtPeriodo: {
        fontFamily: 'Roboto_400Regular',
        fontSize: 20,
        marginHorizontal: '1%',
        marginTop: 10,
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

});