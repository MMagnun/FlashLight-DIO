import React, {useState, useEffect, useCallback} from 'react';
import {View, StyleSheet, Image, TouchableOpacity, /*Alert*/} from 'react-native';
import Torch from 'react-native-torch';
import RNShake from 'react-native-shake';
 
//import imagex from './assets/icons/eco-eye-off.png'; Essa linnha não é utilizada se a linha 12 estiver ativa
const App = () => {
  const [toggle, setToggle] = useState(false); //falsecion

  const handleChangeToggle = () =>  setToggle(oldToogle => !oldToogle);
  // oldToogle => !oldToogle recebem e alternam as imagens de tela on e off ao toque sobre a tela.
 
  useEffect(() => {
    //Liga o Flash do Celular
    Torch.switchState(toggle);
    /*console.log('Alternou o estado do flash');*/

   //Exibe alerta na tela de modificação de estado true e false.  
    /*return () => *//*Alert.alert('Lanterna ' + toggle)*/
  }, [toggle]);

  useEffect(() => {
    // quando o celular for chacoalhado, o toggle será executado (toggle = alterna true e false).

    const subscription = RNShake.addListener(() => {
      setToggle(oldToogle => !oldToogle)
    });

    //Essa função será chamada quando o "components" for ser desmontado.
    return () => subscription.remove();
  }, []);
  

  //if toggle return light..
  return (
      <View style = {toggle ? style.containerLight : style.container}> 
        <TouchableOpacity  onPress={handleChangeToggle}>
          <Image 
              style = {toggle ? style.lightOn : style.lightOff}    
              source = {
                toggle 
                ? require('./assets/icons/eco-light-on.png') 
                : require('./assets/icons/eco-light-off1.png')
              }
          /> 
          <Image 
              style = {style.dioLogo}    
              source = {
                toggle 
                ? require('./assets/icons/logo-dio.png') 
                : require('./assets/icons/logo-dio-white.png')
              }
          />         
        </TouchableOpacity>
  </View>
  );
};

export default App;

const style = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerLight: {
    flex: 1, 
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lightOn: {
    resizeMode: 'contain',
    alignSelf: 'center',
  //  borderRadius: 1250,
    width: 150,
    height:150,
  },
  lightOff: {
    resizeMode: 'contain',
    alignSelf: 'center',
  //  borderRadius: 125,
    tintColor: 'white',
    width: 150,
    height:150,
  },
  dioLogo: {
    resizeMode: 'contain',
    alignSelf: 'center',
  //  borderRadius: 125,
     width: 250,
    height:250,
  }
});