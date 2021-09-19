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
               <tr>
                   <th>Item</th>
                   <th>Serviço</th>
                   <th>Valor</th>
               </tr>
               <tr>
                  <td>${itens[0].idIteServ}</td>
                  <td>${itens[0].iteDescricao}</td>
                  <td>R$ ${itens[0].iteVlrServico}</td>
               </tr>
               <tr>
                  <td>${itens[1].idIteServ}</td>
                  <td>${itens[1].iteDescricao}</td>
                  <td>R$ ${itens[1].iteVlrServico}</td>
               </tr>
               <tr>
                  <td>${itens[2].idIteServ}</td>
                  <td>${itens[2].iteDescricao}</td>
                  <td>R$ ${itens[2].iteVlrServico}</td>
               </tr>
               <tr>
                  <td>${itens[3].idIteServ}</td>
                  <td>${itens[3].iteDescricao}</td>
                  <td>R$ ${itens[3].iteVlrServico}</td>
               </tr>
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