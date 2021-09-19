import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Text, FlatList, Image, TouchableOpacity, Alert} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

import api from '../../pages/services/api';
import useColorScheme from 'react-native/Libraries/Utilities/useColorScheme';

export default function NewService(props) {
    var date = new Date();

    const navigation = useNavigation();
    const route = useRoute();

    const [count, setCount] = useState(0);
    const [servicos, setServicos] = useState([]);
    const nroOrdem = props.route.params.idServ;
    const nroPlaca = props.route.params.srvPlaca;
    const emissao = props.route.params.srvEmissao;
    
    const [itens, setIteServ] = useState([]);

    //const [srvPlaca, setSrvPlaca] = useState(carPlaca);
    //const [srvDatEmissao, setSrvDatEmissao] = useState(date); 
    //const [srvDatPrevisao, setSrvDatPrevisao] = useState(date);
    //const [srvDatEntrega, setSrvDatEntrega] = useState(date);
    //const [srvObservacao, setSrvObservacao] = useState('');
    //const [srvStatus, setSrvStatus] = useState('A');
 
    //const { idServ, srvPlaca, srvDatEmissao, srvDatPrevisao, srvDatEntrega, srvObservacao, srvStatus} = props.route.params.ordserv;                                                                                                                      
    
    useEffect(() => {   
        api.get(`iteservico/${nroOrdem}`).then(resp => {                    
            setIteServ(resp.data);
        }).catch(err => console.log('não encontrou itens'));
    
    }, []); 
    
    function navigateBack() {
        navigation.goBack()
    }

    function navigateNewItem(nroOrdem) {
        navigation.navigate('Itens', {nroOrdem});
    }

    function navigateNewPhoto(nroOrdem) {
        navigation.navigate('NewPhoto', {nroOrdem});
    }
    
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
                <TouchableOpacity style={{alignSelf: 'center', justifyContent: 'center', marginTop: 20,}} onPress={() => navigateNewPhoto(nroOrdem)} >
                    <AntDesign name="camera" size={24} color="white" />         
                </TouchableOpacity>
            </View>
            <View style={styles.content}>
                <View style={styles.card}>                
                    <Text style={styles.txtCard}>Ordem de Serviço: {nroOrdem}</Text>
                    <Text style={styles.txtCard}>Data emissão: {Intl.DateTimeFormat('pt-BR', { dateStyle: 'full', timeStyle: 'long' }).format(new Date(emissao))}</Text>
                    <Text style={styles.txtCard}>Placa veiculo: {nroPlaca}</Text>   
                </View>
                <View style={styles.context}>                
                <FlatList 
                    data={itens}
                    keyExtractor = {(item, index) => index.toString()} 
                    renderItem={({item: item}) => (
                    <TouchableOpacity onPress={() => {}}> 
                    <View style={styles.itensCars}>                
                        <View style={styles.linhaOne}>
                            <Text style={styles.txtLinhaOne}>
                                {item.idIteServ}                            
                            </Text>
                            <Text style={styles.txtLinhaOne}>
                                {item.iteDescricao}                           
                            </Text>
                            <Text style={styles.txtLinhaOne}>
                                {Intl.NumberFormat('pt-BR', {style:'currency', currency: 'BRL'}).format(item.iteVlrServico)}                           
                            </Text>
                        </View>             
                    </View>
                    </TouchableOpacity> 
                    )}
                />                          
                </View>
                <View style={styles.footer}>      
                    <TouchableOpacity style={styles.btnSubmit}
                        onPress={() => navigateNewItem(nroOrdem)}>                        
                        <Text style={styles.SubmitText}>Novo Serviço</Text>
                    </TouchableOpacity>  
                    <TouchableOpacity style={styles.btnSubmitEnd}
                        onPress={() => navigateBack()}>                        
                        <Text style={styles.SubmitText}>Finaliza</Text>
                    </TouchableOpacity>  
                </View>
            </View>    
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      backgroundColor: '#FFFFFF',
    },

    header: {
        width: '100%',
        height:120,
        backgroundColor: '#004C66',
        flexDirection: 'row',       
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
    },
    txtHeader: {
        marginTop: 20,
        fontSize: 25,
        color: '#000',
    },

    image: {
        width: 80,
        height: 50,
        padding: 10,
        marginTop: 20,
    },   

    content: {
        backgroundColor: '#FFFFFF',
        width: '100%',
        padding: 2,
        alignItems: 'center',
    },

    card: {
        backgroundColor: '#DDD',
        width: '95%',
        padding: 5,
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

    context: {
        backgroundColor: '#DDD',
        width: '95%',
        height: '53%',
        padding: 5,
        marginTop: 15,
        flexDirection: 'row',
        flexWrap: 'wrap',    
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

    txtCard: {
        marginTop: 2,
        fontSize: 20,
        color: '#000',
    },

    footer: {
        backgroundColor: '#FFFFFF',
        width: '95%',
        height: '10%',
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        flexWrap: 'wrap',     
    },

    btnSubmit: {
        backgroundColor: '#006060',
        width: '40%',
        height: 45,
        marginTop: 2,
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

    btnSubmitEnd: {
        backgroundColor: '#8C0000',
        width: '40%',
        height: 45,
        marginTop: 2,
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

    linhaOne: {
        width: '95%',
        display:'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 2,    
    },

      txtLinhaOne: {
        color: 'black',  
        fontSize: 20,
      },
   
});