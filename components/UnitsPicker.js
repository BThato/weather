import React from 'react'
import { View, StyleSheet, Platform } from 'react-native'
import { Picker } from '@react-native-community/picker'

export default function UnitsPicker({ unitsSyetem, setunitsSyetem }) {
    return (
        <View style={styles.unitsSyetem}>
            <Picker
                selectedValue={unitsSyetem}
                onValueChange={(item) => setunitsSyetem(item)}
                mode="dropdown"
                itemStyle={{ fontSize: 12 }}
            >
                <Picker.Item label="C°" value="metric" />
                <Picker.Item label="F°" value="imperial" />
            </Picker>
        </View>
    )
}
const styles = StyleSheet.create({
    unitsSyetem: {
        position: 'absolute',
        ...Platform.select({
            ios: {
                top: -40,
            },
            android: {
                top: 40,
            },
        }),

        left: -150,
        height: 50,
        width: 100,
    },
})
