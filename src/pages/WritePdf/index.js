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
  const nroPlaca = props.route.params.srvPlaca;
  const emissao = props.route.params.srvEmissao;
  
  const [itens, setIteServ] = useState([]);
  const [ordem, setOrdServ] = useState([]);
  const [cliente, setCliente] = useState();
  const [modelo, setModelo] = useState();
  const [marca, setMarca] = useState();
  const [placa, setPlaca] = useState();
  const [telefone, setTelefone] = useState();
   
  const [totServ, setTotServ] = useState(0);
  const [atualiza, setAtualiza] = useState(0);

  useEffect(() => {   
     api.get(`busservico/${nroOrdem}`).then(response => {                    
        setOrdServ(response.data);

        setCliente(response.data[0].cliNome);
        setModelo(response.data[0].carModelo);
        setMarca(response.data[0].carMarca);
        setPlaca(response.data[0].srvPlaca);
        setTelefone(response.data[0].cliTelefone);
    }).catch(err => console.log('não encontrou ordem serviço'));
      
    api.get(`iteservico/${nroOrdem}`).then(resp => {  
      setIteServ(resp.data);        
    
    }).catch(err => console.log('não encontrou itens'));

  }, []);

  useEffect(() => {   
    api.get(`iteservico/${nroOrdem}`).then(resp => {  
     setIteServ(resp.data);  
   
    }).catch(err => console.log('não encontrou itens'));       
    
  }, [atualiza]);

  function somaItens(sum) {
    setTotServ(sum)
  }

  async function printToPdf() {
    setAtualiza(atualiza + 1);
    let initialValue = 0;
    let sum = itens.reduce(function (total, currentValue) {
      return total + currentValue.iteVlrServico;
    }, initialValue);

    //console.log('Total dos itens: R$ ', sum)
    somaItens(sum);
    const response = await Print.printToFileAsync({
       html: `
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Pdf Content</title>
        <style>
            body {
                font-size: 16px;
            }

            table {
              border-collapse: collapse;
              width: 50em;
              border: 1px solid #666;
            }
            
            thead {
              background: #ccc ;
              border-top: 1px solid #a5a5a5;
              border-bottom: 1px solid #a5a5a5;
            }
            h1 {
                text-align: center;
            }
            tbody {
              width: 50em;
            }
            .totaliza h2 {
              background: #ccc ;
            }
        </style>
        </head>
        <body>
          <div id="header">
            <h1>Ordem de Serviço Nº ${nroOrdem}</h1><br>
          </div>
          <div id="dadVeiculo"> 
            <h2>Veiculo: ${modelo} - ${marca}</h2>
            <h2>Placa: ${placa}</h2>
            <h2>Cliente: ${cliente}</h2>
            <h2>Celular: ${telefone}</h2>
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
                            <td>${Intl.NumberFormat('pt-BR', {style:'currency', currency: 'BRL'}).format(itens.iteVlrServico)}</td>
                        </tr>
                        `                         
                    })}   
                <tbody>          
           </table>
       </div>      
       <div id="totaliza">
          <hr/>
            <h2>Total dos Serviços.....................${Intl.NumberFormat('pt-BR', {style:'currency', currency: 'BRL'}).format(sum)}</h2>
          <hr/>
       </div>
       <div id="footer">
          <h2>--------------------------------------</h2>
          <h2>         Ass. Cliente</h2>
          <hr/>
       </div>
   </body>`
    })
    //console.log(response.uri)
    //console.log(response);
    Sharing.shareAsync(response.uri)
  }

  return(
      <View style={styles.container}>
        <View style={styles.card}>                
          <Text style={styles.txtCard}>Ordem de Serviço: {nroOrdem}</Text>
          <Text style={styles.txtCard}>Data emissão: {Intl.DateTimeFormat('pt-BR', { dateStyle: 'full', timeStyle: 'long' }).format(new Date(emissao))}</Text>
          <Text style={styles.txtCard}>Placa veiculo: {nroPlaca}</Text>
          <Text style={styles.txtCard}>Nome do Cliente: {cliente}</Text>   
        </View>
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