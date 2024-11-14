import { useEffect, useState } from "react"
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from "react-native"

export function Search({ onSubmit }: { onSubmit: (searchText: string) => Promise<void> }) {

    const [searchText, setSearchText] = useState('')

    return (
        <View>
            <TextInput
                style={styles.input}
                value={searchText}
                placeholder={'Enter a location'}
                onChangeText={setSearchText}
                inputMode='search'
                // TODO: Ensure keyboard goes away when pressing Go
                onSubmitEditing={() => onSubmit(searchText)}
            />
            <TouchableOpacity
                onPress={() => onSubmit(searchText)}
                activeOpacity={0.7}
            >
                <Text style={styles.button}>Search</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        padding: 16,
        marginVertical: 8,
        backgroundColor: '#e8dfd8'
    },
    button: {
        backgroundColor: '#7a5030',
        textAlign: 'center',
        color: '#e8dfd8',
        fontSize: 20,
        padding: 8,
        fontWeight: 'bold'
    }
})