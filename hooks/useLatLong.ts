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

        // TODO: Fetch device location using Location.getLastKnownPositionAsync and store using setLatLong

        setLoadingLatLong(false)
    }

    const searchLatLong = async (searchText: string) => {
        setLoadingLatLong(true)

        try {
            // TODO: Lookup co-ordinates based on searchText using https://developers.google.com/maps/documentation/geocoding/requests-geocoding
            // store using setLatLong
        } catch (error: unknown) {
            setLatLongError(`${error}`)
        } finally {
            setLoadingLatLong(false)
        }
    }

    return { latLong, fetchDeviceLatLong, searchLatLong, loadingLatLong, latLongError }
}