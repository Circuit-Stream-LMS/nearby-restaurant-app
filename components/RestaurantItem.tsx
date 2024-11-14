import { StyleSheet, Text, View } from "react-native";

export interface RestaurantData {
    name: string,
    rating: number,
    numberOfRatings: number
}

export function RestaurantItem({ data }: { data: RestaurantData }) {

    const { name, rating, numberOfRatings } = data

    // TODO: Render name, rating and numberOfRatings in a View

    return (<Text>TODO</Text>)
}

const styles = StyleSheet.create({
    // TODO: Implement styles
})
