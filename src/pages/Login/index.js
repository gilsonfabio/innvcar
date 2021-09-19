import React from 'react';
import { View, StyleSheet, Text} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';


export default function Login() {
    const navigation = useNavigation();
    const route = useRoute();
    
    function navigateBack() {
        navigation.goBack()
    }

    return(
        <View style={styles.container}>
            <Text style={styles.txtLogin}>Login</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#002040',
    },

    txtLogin: {
        color: '#fff',
        fontSize: 25,
    }
});