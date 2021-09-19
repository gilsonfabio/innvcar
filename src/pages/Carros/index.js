import React, {useState} from 'react';
import { View, StyleSheet, Text, TextInput, Image, TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

import api from '../services/api';

export default function Carros(props) {
    const navigation = useNavigation();
    const route = useRoute();

    const [carPlaca, setPlaca] = useState();
    const [carModelo, setModelo] = useState();
    const [carMarca, setMarca] = useState();
    const [carCor, setCor] = useState();
    const [carChassi, setChassi] = useState();
    const [carAnoFab, setAnoFab] = useState();
    const [carKmAtual, setKmAtual] = useState();
    const [carNivComb, setNivComb] = useState();
    const [veiculo, setVeiculo] = useState([]);
    const {idClientes, cliNome, cliEndereco, cliNroEndereco, cliBairro, cliCidade, cliCep, cliComplemento, cliEmail, cliTelefone, cliNascimento, cliCpfCnpj, cliStatus } = props.route.params.cliente;
    const carCliente = idClientes;

    function navigateBack() {
        navigation.goBack()
    }

    function cadastraServicos(carPlaca, carModelo, carMarca, carCor, carChassi, carAnoFab, carKmAtual, carNivComb) {
        api.post(`carCadastro`, {
            carPlaca, 
            carModelo,
            carMarca,
            carChassi,
            carAnoFab,
            carCor,
            carKmAtual,
            carNivComb,
            carCliente 
        }).then(() => {
            alert('Veiculo cadastrato com sucesso!')
        }).catch(() => {
            alert('Erro no cadastro!');
        })             
        
        setVeiculo([carPlaca, carModelo, carMarca, carCor, carChassi, carAnoFab, carKmAtual, carNivComb, carCliente]);
        console.log(veiculo);
        navigation.navigate('OrdServices', {veiculo}); 
    }

    return(
        <KeyboardAvoidingView style={styles.container}  behavior='padding'>
            <View style={styles.header}>
                <TouchableOpacity style={{alignSelf: 'center', justifyContent: 'center', marginTop: 20,}} onPress={navigateBack} >
                    <AntDesign name="leftcircleo" size={24} color="white" />         
                </TouchableOpacity>
                <Image 
                    source={require('../../assets/images/logo_white.png')}
                    style={styles.image}
                />                
            </View>
            <Text style={styles.txtPeriodo}>Dados do Veiculo</Text>
                <ScrollView>
                <View>
                    <TextInput 
                        style={styles.input } 
                        placeholder= "Placa" 
                        autoCorrect= {false} 
                        value={carPlaca}
                        onChangeText={setPlaca}
                    />
                    <TextInput 
                        style={styles.input } 
                        placeholder= "Modelo" 
                        autoCorrect= {false} 
                        value={carModelo}
                        onChangeText={setModelo}
                    />
                    <TextInput 
                        style={styles.input } 
                        placeholder= "Marca" 
                        autoCorrect= {false} 
                        value={carMarca}
                        onChangeText={setMarca}
                    />
                    <TextInput 
                        style={styles.input } 
                        placeholder= "Cor" 
                        autoCorrect= {false} 
                        value={carCor}
                        onChangeText={setCor}
                    />                    
                    <TextInput 
                        style={styles.input } 
                        placeholder= "Chassi" 
                        autoCorrect= {false} 
                        value={carChassi}
                        onChangeText={setChassi}
                    />
                    <TextInput 
                        style={styles.input } 
                        placeholder= "Ano/Mod:" 
                        autoCorrect= {false} 
                        value={carAnoFab}
                        onChangeText={setAnoFab}
                    />
                    <TextInput 
                        style={styles.input } 
                        placeholder= "Km:" 
                        autoCorrect= {false} 
                        value={carKmAtual}
                        onChangeText={setKmAtual}
                    />
                    <TextInput 
                        style={styles.input } 
                        placeholder= "Nivel Combustivel" 
                        autoCorrect= {false} 
                        value={carNivComb}
                        onChangeText={setNivComb}
                    />                    
                    <TouchableOpacity style={ styles.btnSubmit}>
                    <Text 
                        style={ styles.SubmitText}
                        onPress={() => cadastraServicos(carPlaca, carModelo, carMarca, carCor, carChassi, carAnoFab, carKmAtual, carNivComb)}
                        >Próximo
                    </Text>
                    </TouchableOpacity>   
                </View>
                </ScrollView>
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
        height: 100,
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