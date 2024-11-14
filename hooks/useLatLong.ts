import { useState } from "react"
import * as Location from 'expo-location'

export interface LatLong {
    latitude: number,
    longitude: number
}

export function useLatLong() {

    const [latLong, setLatLong] = useState<LatLong>()
    const [loadingLatLong, setLoadingLatLong] = useState(false)
    const [latLongError, setLatLongError] = useState<string>()

    const fetchDeviceLatLong = async () => {
        setLoadingLatLong(true)

        const { status } = await Location.requestForegroundPermissionsAsync()
        if (status !== 'granted') {
            setLatLongError('Permission to access location was denied')
        }

        // TODO: Change this to use getLastKnownPositionAsync
        const location = await Location.getCurrentPositionAsync({})

        setLatLong({ latitude: location.coords.latitude, longitude: location.coords.longitude })
        setLoadingLatLong(false)
    }

    const searchLatLong = async (searchText: string) => {
        setLoadingLatLong(true)

        try {
            if (!process.env.EXPO_PUBLIC_GOOGLE_API_KEY) {
                throw new Error('API key is not specified')
            }

            const response = await fetch('https://maps.googleapis.com/maps/api/geocode/json?' + new URLSearchParams({
                key: process.env.EXPO_PUBLIC_GOOGLE_API_KEY,
                address: searchText
            }))

            if (!response.ok) {
                throw new Error('Invalid response from Geocoding API')
            }

            const result = await response.json()

            if (!result) {
                throw new Error('Error while parsing Geocoding API response')
            }

            if (!result.results.length) {
                throw new Error(`No results found for ${searchText}`)
            }

            setLatLong({
                latitude: result.results[0].geometry.location.lat,
                longitude: result.results[0].geometry.location.lng
            })
        } catch (error: unknown) {
            setLatLongError(`${error}`)
        } finally {
            setLoadingLatLong(false)
        }
    }

    return { latLong, fetchDeviceLatLong, searchLatLong, loadingLatLong, latLongError }
}