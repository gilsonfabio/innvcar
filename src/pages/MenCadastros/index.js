import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

export default function MenCadastros() {
    const navigation = useNavigation();
    const route = useRoute();
    
    function navigateBack() {
        navigation.goBack()
    }

    function handleCars() {
        navigation.navigate('Clientes'); 
    }

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={{alignSelf: 'center', justifyContent: 'center', marginTop: 20,}} onPress={navigateBack} >
                    <AntDesign name="leftcircleo" size={24} color="white" />         
                </TouchableOpacity>
                <Image 
                    source={require('../../assets/images/logo.png')}
                    style={styles.image}
                />                
            </View>
            <View>
                <Text style={styles.txtPeriodo}>Escolha item a ser cadastrado</Text>
                <TouchableOpacity style={styles.btnSubmit}
                    onPress={handleCars}>  
                    <Image source={require('../../assets/images/cars.png')} style={styles.imgButton} />                      
                    <Text style={styles.SubmitText}>Cadastra Carro</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.btnSubmit}
                    onPress={() => {}}>            
                    <Image source={require('../../assets/images/trucks.png')} style={styles.imgButton} />             
                    <Text style={styles.SubmitText}>Cadastra Caminhão</Text>
                </TouchableOpacity>  

                <TouchableOpacity style={styles.btnSubmit}
                    onPress={() => {}}>                        
                    <Image source={require('../../assets/images/motorbikes.png')} style={styles.imgButton} /> 
                    <Text style={styles.SubmitText}>Cadastra Moto</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnSubmit}
                    onPress={() => {}}>                        
                    <Image source={require('../../assets/images/bus.png')} style={styles.imgButton} /> 
                    <Text style={styles.SubmitText}>Cadastra Ônibus</Text>
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
        backgroundColor: '#003366',
        flexDirection: 'row',       
        alignItems: 'center',
        padding: 10,
    },

    image: {
        width: 220,
        height: 80,
        marginTop: 5,
        marginLeft: 50,
        padding: 10,
    },

    txtPeriodo: {
        fontFamily: 'Roboto_400Regular',
        fontSize: 20,
        marginHorizontal: '1%',
        marginLeft: 15,
        color: '#fff',
    },

    btnSubmit: {
        flexDirection: 'row', 
        backgroundColor: '#006060',
        width: '90%',
        height: 55,
        marginTop: 35,
        marginLeft: 15,
        alignItems: 'center',
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
        fontSize: 20,
        marginLeft: 10,
    },

    imgButton: {
        width: 100,
        height: 50,      
    },
    
});