import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { colors } from '../utils/index'
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons'

const { PRIMARY_COLOR, SECONDARY_COLOR, BORDER_COLOR } = colors

export default function WeatherDetails({ currentWeather, unitsSystem }) {
    const {
        main: { feels_like, humidity, pressure },
        wind: { speed },
    } = currentWeather

    const windSpeed = unitsSystem === 'metric' ? `${Math.round(speed)} m/s` : `${Math.round(speed)} miles/h`

    return (
        <View style={styles.weatherDetails}>


            <View style={styles.weatherDetailsRow}>
                <Text>{feels_like}</Text>
            </View>
           
        </View>
    )
}

const styles = StyleSheet.create({
    weatherDetails: {
        marginTop: 'auto',
        margin: 15,
        borderWidth: 1,
        borderColor: BORDER_COLOR,
        borderRadius: 10,
    },
    weatherDetailsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    weatherDetailsBox: {
        flex: 1,
        padding: 20,
    },
    weatherDetailsItems: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },
    textSecondary: {
        fontSize: 15,
        color: SECONDARY_COLOR,
        fontWeight: '700',
        margin: 7,
    },
})