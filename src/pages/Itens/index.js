import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Text, TextInput, FlatList, Image, TouchableOpacity, ScrollView, Alert} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

import api from '../../pages/services/api';
import useColorScheme from 'react-native/Libraries/Utilities/useColorScheme';

export default function Itens(props) {
    const navigation = useNavigation();
    const route = useRoute();

    const ordService = props.route.params.nroOrdem;

    const [iteNroServ, setNroServ] = useState(ordService);
    const [iteDesc, setIteDesc] = useState();
    const [iteVlrPecas, setVlrPecas] = useState();
    const [iteVlrMObra, setVlrMObra] = useState();
    const [iteVlrDesc, setVlrDesc] = useState();
    const [iteStatus, setIteStatus] = useState("A");

    function navigateBack() {
        navigation.goBack()
    }

    function cadastraItem(iteDesc, iteVlrPecas, iteVlrMObra, iteVlrDesc) {                      
        api.post(`iteServico`, {
            iteNroServ,
            iteDesc, 
            iteVlrPecas, 
            iteVlrMObra, 
            iteVlrDesc, 
            iteStatus, 
        }).then(resp => {
            alert('Ordem cadastrada com sucesso!')
        }).catch(() => {
            alert('Erro no cadastro!');
        })                
        navigateBack();
    }

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={{alignSelf: 'center', justifyContent: 'center', marginTop: 20,}} onPress={navigateBack} >
                    <AntDesign name="leftcircleo" size={24} color="white" />         
                </TouchableOpacity>
                <Text style={styles.txtHeader}>OS: {ordService}</Text>
                <Image 
                    source={require('../../assets/images/logo_white.png')}
                    style={styles.image}
                />                
            </View>
            <View style={styles.card}>                
                <Text style={styles.txtPeriodo}>Dados do Serviço</Text>
                <ScrollView>
                <View>
                    <TextInput 
                        style={styles.input } 
                        placeholder= "Descrição do serviço" 
                        autoCorrect= {false} 
                        value={iteDesc}
                        onChangeText={setIteDesc}
                    />
                    <TextInput 
                        style={styles.input } 
                        placeholder= "Valor das Peças" 
                        autoCorrect= {false} 
                        value={iteVlrPecas}
                        onChangeText={setVlrPecas}
                    />
                    <TextInput 
                        style={styles.input } 
                        placeholder= "Vlr. Mão de Obra" 
                        autoCorrect= {false} 
                        value={iteVlrMObra}
                        onChangeText={setVlrMObra}
                    />
                    <TextInput 
                        style={styles.input } 
                        placeholder= "Valor Desconto" 
                        autoCorrect= {false} 
                        value={iteVlrDesc}
                        onChangeText={setVlrDesc}
                    />                    
                    <TouchableOpacity style={ styles.btnSubmit}>
                    <Text 
                        style={ styles.SubmitText}
                        onPress={() => cadastraItem(iteDesc, iteVlrPecas, iteVlrMObra, iteVlrDesc)}
                        >Salvar
                    </Text>
                    </TouchableOpacity>   
                </View>
                </ScrollView>
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
        justifyContent: 'space-between',
        padding: 10,
    },

    txtHeader: {
        marginTop: 20,
        fontSize: 25,
        color: '#00FFFF',
    },

    image: {
        width: 80,
        height: 50,
        padding: 10,
        marginTop: 20,
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