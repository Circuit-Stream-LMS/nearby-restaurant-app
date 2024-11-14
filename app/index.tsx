import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text, Alert, View, ActivityIndicator, ScrollView } from "react-native"
import { Search } from "@/components/Search";
import { useState, useEffect } from "react";
import { SEARCH_RADIUS, usePlacesAPI } from "@/hooks/usePlacesAPI";
import { RestaurantData, RestaurantItem } from "@/components/RestaurantItem";
import { LatLong, useLatLong } from "@/hooks/useLatLong";

export default function Home() {

    const { restaurants, fetchRestaurants, loadingRestaurants, restaurantsError } = usePlacesAPI()
    // const { restaurants, fetchRestaurants, clearRestaurants, loadingRestaurants, restaurantsError } = usePlacesAPI()
    const { latLong, fetchDeviceLatLong, searchLatLong, loadingLatLong, latLongError } = useLatLong()

    useEffect(() => {
        if (latLong) {
            fetchRestaurants(latLong)
        }
    }, [latLong])

    useEffect(() => {
        fetchDeviceLatLong()
    }, [])

    useEffect(() => {
        if (latLongError) {
            Alert.alert(latLongError)
        } else if (restaurantsError) {
            Alert.alert(restaurantsError)
        }
    }, [restaurantsError, latLongError])

    // TODO: Use device location if searchText is empty
    // const handleSearch = async (searchText: string) => {
    //     clearRestaurants()
    //     if (searchText) {
    //         await searchLatLong(searchText)
    //     } else {
    //         fetchDeviceLatLong()
    //     }
    // }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Search restaurants</Text>
            <Search onSubmit={searchLatLong} />
            {!(loadingRestaurants || loadingLatLong) && <Text style={styles.subtitle}>Found {restaurants.length >= 20 ? 'over 20' : restaurants.length} {restaurants.length === 1 ? 'restaurant' : 'restaurants'} within {Number(SEARCH_RADIUS) / 1000}km</Text>}
            <ScrollView style={styles.results}>
                {/* TODO: Implement loading indicator */}
                {/* {(loadingRestaurants || loadingLatLong) && <ActivityIndicator color='#241c1b' style={{ padding: 16 }} />} */}
                {!(loadingRestaurants || loadingLatLong) && restaurants.map(r => <RestaurantItem key={(r as any).place_id} data={{
                    name: (r as any).name,
                    rating: (r as any).rating,
                    numberOfRatings: (r as any).user_ratings_total
                }} />)}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#d6ad90',
        padding: 16
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 8
    },
    subtitle: {
        marginVertical: 8
    },
    results: {
        marginTop: 8
    }
})

