import { StyleSheet, Text, View } from "react-native";

export interface RestaurantData {
    name: string,
    rating: number,
    numberOfRatings: number
}

export function RestaurantItem({ data }: { data: RestaurantData }) {

    const { name, rating, numberOfRatings } = data

    // TODO: Show full restaurant information when tapping on the item (using detail.tsx)

    return (<View style={styles.item}>
        <Text style={styles.title}>{name}</Text>
        <View style={styles.text}>
            <Text style={styles.bold}>{rating} stars</Text>
            <Text>{numberOfRatings} ratings</Text>
        </View>
    </View>)
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#edc6a8',
        fontSize: 20,
        padding: 16,
        marginBottom: 16
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 4
    },
    text: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    bold: {
        fontWeight: 'bold',
        color: '#7a5030'
    }
})
