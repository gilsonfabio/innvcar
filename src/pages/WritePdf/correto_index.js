import React, { useState ,useEffect } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

import * as Print from 'expo-print'
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";
import api from '../services/api';

export default function WritePdf(props) {
  const nroOrdem = props.route.params.idServ;
  const cliente = 'GILSON FABIO SILVA MODANEZ';
  const [itens, setIteServ] = useState([]);
  const produtos = [
      {id:'0', nome:'produto-01', valor:'1,00'},
      {id:'1', nome:'produto-02', valor:'2,00'},
      {id:'2', nome:'produto-03', valor:'3,00'},
  ];

  useEffect(() => {   
    api.get(`iteservico/${nroOrdem}`).then(resp => {                    
        setIteServ(resp.data);
    }).catch(err => console.log('não encontrou itens'));

  }, []);

  async function printToPdf() {
    const response = await Print.printToFileAsync({
       html: `<h1>Ordem de Serviço Nº </h1><br></br><body>
       <div id="dadVeiculo"> 
          <h2>Veiculo: PARATI - VOLKSWAGEN</h2>
          <h2>Placa: NFD-5990</h2>
          <h2>Cliente: ${cliente}</h2>
          <h2>Celular: (62)98289-7455</h2>
          <hr/>
       </div>
       <div id="tabela">
           <table> 
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Serviço</th>
                        <th>Valor</th>
                    </tr>
                </thead>
                <tbody>
                    ${itens.map(itens => {
                        return `
                        <tr>
                            <td>${itens.idIteServ}</td>
                            <td>${itens.iteDescricao}</td>
                            <td>${itens.iteVlrServico}</td>
                        </tr>
                        `
                    })}   
                <tbody>          
           </table>
       </div>      
       <div id="totaliza">
          <hr/>
          <h2>Total dos Serviços.....................R$ 1535,00</h2>
          <h2>Desconto...............................R$    0,00</h2>
          <h2>Valor da Ordem de Serviço..............R$ 1535,00</h2>
          <hr/>
       </div>
       <div id="footer">
          <h2>--------------------------------------</h2>
          <h2>         Ass. Cliente</h2>
          <hr/>
       </div>
   </body>`
    })
    console.log(response.uri)
    console.log(response);
    Sharing.shareAsync(response.uri)
  }

  return(
      <View style={styles.container}>
        <TouchableOpacity onPress={() => {printToPdf()}} style={styles.btnSubmit}>
          <Text style={styles.txtSubmit}>Create PDF</Text>
        </TouchableOpacity>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
   
  txtSubmit: {
    color: '#FFF',
    fontSize: 18,
  },
    
});