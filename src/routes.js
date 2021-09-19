import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const AppStack = createStackNavigator();

import Home from './pages/Home';
import MenCadastros from './pages/MenCadastros';
import Clientes from './pages/Clientes';
import Carros from './pages/Carros';
import SearchCars from './pages/SearchCars';
import SearchClientes from './pages/SearchClientes';
import PrintPDF from './pages/PrintPDF';
import OrdServices from './pages/OrdServices';
import NewService from './pages/NewService';
import Itens from './pages/Itens';
import NewPhoto from './pages/NewPhoto';
import WritePdf from './pages/WritePdf';

export default function Routes(){
    return (
        <NavigationContainer>
            <AppStack.Navigator>
                <AppStack.Screen name="Home" component={Home} options={{headerShown: false}} />
                <AppStack.Screen name="MenCadastros" component={MenCadastros} options={{headerShown: false}} />                 
                <AppStack.Screen name="Clientes" component={Clientes} options={{headerShown: false}} />
                <AppStack.Screen name="Carros" component={Carros} options={{headerShown: false}} />
                <AppStack.Screen name="SearchCars" component={SearchCars} options={{headerShown: false}} /> 
                <AppStack.Screen name="SearchClientes" component={SearchClientes} options={{headerShown: false}} /> 
                <AppStack.Screen name="PrintPDF" component={PrintPDF} options={{headerShown: false}} /> 
                <AppStack.Screen name="OrdServices" component={OrdServices} options={{headerShown: false}} />
                <AppStack.Screen name="NewService" component={NewService} options={{headerShown: false}} />
                <AppStack.Screen name="Itens" component={Itens} options={{headerShown: false}} />
                <AppStack.Screen name="NewPhoto" component={NewPhoto} options={{headerShown: false}} />
                <AppStack.Screen name="WritePdf" component={WritePdf} options={{headerShown: false}} /> 
            </AppStack.Navigator>
        </NavigationContainer> 
    ); 
}