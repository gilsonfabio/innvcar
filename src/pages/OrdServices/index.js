import React, {useState} from 'react';
import { View, StyleSheet, Text, TextInput, Image, TouchableOpacity, ScrollView, Alert} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

import api from '../../pages/services/api';

export default function OrdServices(props) {
    const navigation = useNavigation();
    const route = useRoute();
    
    var date = new Date();

    const {idCarros, carPlaca, carModelo, carMarca, carChassi, carAnoFab, carCor, carKmAtual, carNivComb, carCliente } = props.route.params.veiculo;   
 
    const [ordserv, setOrdServ] = useState([]);

    const [srvPlaca, setSrvPlaca] = useState(carPlaca);
    const [srvDatEmissao, setSrvDatEmissao] = useState(date); 
    const [srvDatPrevisao, setSrvDatPrevisao] = useState(date);
    const [srvDatEntrega, setSrvDatEntrega] = useState(date);
    const [srvObservacao, setSrvObservacao] = useState('');
    const [srvStatus, setSrvStatus] = useState('A');
   
    function AlertOrdServ() {
        Alert.alert(
            "Não existe OS aberta para este veiculo.",
            "Deseja abrir uma nova OS?",
            [
                {
                    text: "Cancel",
                    onPress: () => {navigateBack()},
                    style: "cancel"                    
                },
                { text: "OK", onPress: () => {lancaItem(carPlaca)} }
            ],
            { cancelable: false }
        );
    }

    function lancaItem(carPlaca) {                      
        
        api.post(`ordServico`, {
            srvPlaca, 
            srvDatEmissao, 
            srvDatPrevisao, 
            srvDatEntrega, 
            srvObservacao, 
            srvStatus
        }).then(resp => {
            alert('Ordem cadastrada com sucesso!')
            navigateBack;
        }).catch(() => {
            alert('Erro no cadastro!');
        })                
        
        navigation.navigate('Itens', {carPlaca});
    }

    function navigateNewService(carPlaca) {
        api.get(`servico/${carPlaca}`).then(resp => {                    
            setOrdServ(resp.data)
            //console.log(resp.data);
            const idServ = resp.data[0].idServ;
            const srvPlaca = resp.data[0].srvPlaca;
            const srvEmissao = resp.data[0].srvDatEmissao;
            navigation.navigate('NewService', {idServ, srvPlaca, srvEmissao});
            
        }).catch(err => {
            console.log('erro de OS')
            AlertOrdServ()
        });
    }

    function navigateNewPhoto(carPlaca) {
        navigation.navigate('NewPhoto', {carPlaca});
    }

    function navigateWritePDF(carPlaca) {
        api.get(`servico/${carPlaca}`).then(resp => {                    
            setOrdServ(resp.data)
            //console.log(resp.data);
            const idServ = resp.data[0].idServ;
            const srvPlaca = resp.data[0].srvPlaca;
            const srvEmissao = resp.data[0].srvDatEmissao;
            navigation.navigate('WritePdf', {idServ, srvPlaca, srvEmissao});
        }).catch(err => {
            console.log('erro de OS');
        });
    }

    function navigateBack() {
        navigation.goBack()
    }

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={{alignSelf: 'center', justifyContent: 'center', marginTop: 20,}} onPress={navigateBack} >
                    <AntDesign name="leftcircleo" size={24} color="white" />         
                </TouchableOpacity>
                <Text style={styles.txtHeader}>{carPlaca}</Text>
                <Image 
                    source={require('../../assets/images/logo_white.png')}
                    style={styles.image}
                />                
            </View>
            <View style={styles.card}>                
                <View style={styles.box}>
                    <View style={styles.inner}>
                        <TouchableOpacity style={styles.btnBox} onPress={() => navigateNewService(carPlaca)} >
                            <Image source={require('../../assets/images/box1.png')} style={styles.imgBox} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.box}>
                    <View style={styles.inner}>
                        <TouchableOpacity style={styles.btnBox} onPress={() => {}} >
                            <Image source={require('../../assets/images/box2.png')} style={styles.imgBox} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.box}>
                    <View style={styles.inner}>
                        <TouchableOpacity style={styles.btnBox} onPress={() => navigateWritePDF(carPlaca)} >
                            <Image source={require('../../assets/images/box3.png')} style={styles.imgBox} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.box}>
                    <View style={styles.inner}>
                        <TouchableOpacity style={styles.btnBox} onPress={() => navigateBack} >
                            <Image source={require('../../assets/images/box4.png')} style={styles.imgBox} />
                        </TouchableOpacity>
                    </View>
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
        color: '#00FFFF',
    },

    image: {
        width: 80,
        height: 50,
        padding: 10,
        marginTop: 20,
    },   

    card: {
        width: '100%',
        height: '80%',
        padding: 5,
        flexDirection: 'row',
        flexWrap: 'wrap',        
    },
    box: {
        width: '50%',
        height: '50%',
        padding: 5,
    },
    inner: {
        flex: 1,
        backgroundColor: '#eee',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
	        width: 0,
	        height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
    },

    btnBox: {
        width: '100%',
        height: '100%',
        alignSelf: 'center', 
        justifyContent: 'center',
    },

    imgBox: {
        width: '100%',
        height: '100%',
        padding: 5,
        marginTop: 5,
    },
});