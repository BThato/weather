import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View,ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import WeatherInfo from './components/WeatherInfo';
import UnitsPicker  from './components/UnitsPicker';
import {colors} from './utils/index';
import ReloadIcon from './components/ReloadIcon'
import WeatherDetails from './components/WeatherDetails'

const baseUrl ="https://api.openweathermap.org/data/2.5/weather?"
const weather_API_KEY ="1d0477adb49b73bc578c726a674698c6"

export default function App() {

  const [errorMessage,setErrorMessage]= useState(null)
  const [currentWeather,setCurrenttWeather]= useState(null)
  const [unitsSyetem,setunitsSyetem]= useState('metric')
 

  useEffect(() => {
    
    load()

  }, [unitsSyetem])

  async function load(){

    setCurrenttWeather(null);
    setErrorMessage(null)
    try {

      
      let {status}= await Location.requestPermissionsAsync();

      if(status!=='granted'){

        setErrorMessage('Access is needed to run the application ');

        return
      }
      

      const location= await Location.getCurrentPositionAsync();
    
      const {latitude,longitude}= location.coords;

      const weatherUrl=baseUrl+"lat="+latitude+"&"+"lon=" +longitude+"&units="+unitsSyetem+"&appid="+weather_API_KEY;



      const response = await fetch(weatherUrl)

      const reslut= await response.json();

      if(response.ok){
        setCurrenttWeather(reslut)
      }else{

        setErrorMessage(reslut.message)
      }

    } catch (error) {
      
      setErrorMessage(error.message)
    }


  }

if(currentWeather){

  return (
    
    <View style={styles.container}>
<      StatusBar style="auto" />

         <View style={styles.main}>
         <ReloadIcon load={load} />
        
        <UnitsPicker unitsSyetem={unitsSyetem} setunitsSyetem={setunitsSyetem}/>
        <WeatherInfo currentWeather={currentWeather}/>
         </View>
        
         <WeatherDetails currentWeather={currentWeather} setunitsSyetem={setunitsSyetem} />
     </View>

         
  )
} else if(errorMessage){
  {

    return (
      <View style={styles.container}>
        <Text>{errorMessage}</Text>
        <StatusBar style="auto" />
      </View>
    )
  } 
 }else{

  return(

    <View style={styles.container}>
      <ActivityIndicator size="large" colors={colors.PRIMARY_COLOR}/>

    </View>
  )
 }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  main:
  {
    justifyContent:'center',
    flex:1


  }
});
