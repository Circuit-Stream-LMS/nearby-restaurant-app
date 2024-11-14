import { useEffect, useState } from "react"
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from "react-native"

export function Search({ onSubmit }: { onSubmit: (searchText: string) => Promise<void> }) {

    const [searchText, setSearchText] = useState('')

    // TODO: Render TextInput (which calls setSearchText onChangeText) and button (which calls onSubmit(searchText) onPress)

    return (
        <View>
            <Text>TODO</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    // TODO: Implement styles
})