import React, {useState} from 'react';
import { View, StyleSheet, Text, TextInput, Image, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform,  } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

import api from '../../pages/services/api';

export default function Clientes() {
    const navigation = useNavigation();
    const route = useRoute();

    const [name, setName] = useState();
    const [address, setAddress] = useState();
    const [cep, setCep] = useState();
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    
    function navigateBack() {
        navigation.goBack()
    }

    function cadastraCli(name, address, cep, email, phone) {        
        api.post(`clicadastro`, {
            name, 
            address,
            cep,
            email,
            phone 
        }).then(resp => {
            alert('Cliente cadastrato com sucesso!')
            navigateBack;
        }).catch(() => {
            alert('Erro no cadastro!');
        })                
    }
    
    return(
        <KeyboardAvoidingView style={styles.container} behavior='padding'>
            <View style={styles.header}>
                <TouchableOpacity style={{alignSelf: 'center', justifyContent: 'center', marginTop: 20,}} onPress={navigateBack} >
                    <AntDesign name="leftcircleo" size={24} color="white" />         
                </TouchableOpacity>
                <Image 
                    source={require('../../assets/images/logo_white.png')}
                    style={styles.image}
                />                
            </View>
            <View>
                <ScrollView>
                    <Text style={styles.txtPeriodo}>Dados do Cliente</Text>
                    <TextInput 
                        style={styles.input } 
                        placeholder= "Nome" 
                        autoCorrect= {false} 
                        value={name}
                        onChangeText={setName}
                    />
                    <TextInput 
                        style={styles.input } 
                        placeholder= "Endereco" 
                        autoCorrect= {false} 
                        value={address}
                        onChangeText={setAddress}
                    />
                    <TextInput 
                        style={styles.input } 
                        placeholder= "CEP" 
                        autoCorrect= {false} 
                        value={cep}
                        onChangeText={setCep}
                    />
                    <TextInput 
                        style={styles.input } 
                        placeholder= "Email" 
                        autoCorrect= {false} 
                        value={email}
                        onChangeText={setEmail}
                    />
                    <TextInput 
                        style={styles.input } 
                        placeholder= "Celular" 
                        autoCorrect= {false} 
                        value={phone}
                        onChangeText={setPhone}
                    />
                </ScrollView>
                <TouchableOpacity style={ styles.btnSubmit}>
                    <Text 
                        style={ styles.SubmitText}
                        onPress={() => cadastraCli(name, address, cep, email, phone)}
                        >Próximo
                    </Text>
                </TouchableOpacity>                
            </View>
        </KeyboardAvoidingView>
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
        height:100,
        backgroundColor: '#003366',
        flexDirection: 'row',       
        alignItems: 'center',
        padding: 10,
    },

    image: {
        width: 100,
        height: 60,
        marginTop: 20,
        marginLeft: 90,
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
        fontSize: 20,
        marginLeft: 10,
    },

    imgButton: {
        width: 100,
        height: 50,      
    },

    input: {
        backgroundColor: '#fff',
        width: '90%',
        marginLeft: 15,
        marginTop: 5,
        marginBottom: 15,
        borderColor: "#000",
        color: "#222",
        fontSize: 17, 
        borderRadius: 7,
        padding: 10,
    },
    
});