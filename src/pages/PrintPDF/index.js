import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { WebView } from 'react-native-webview';

// import PdfReader from 'rn-pdf-reader-js';

const PdfReader = ({ url: uri }) => <WebView javaScriptEnabled={true} style={{ flex: 1 }} source={{ uri }} />

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <PdfReader url="https://drive.google.com/file/d/1B42PQ_Jjqfo5_ijwQTJwEslDYzqIbMHC/view?usp=sharing" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
});
