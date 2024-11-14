import { useState } from "react"
import { LatLong } from "./useLatLong"

export const SEARCH_RADIUS = '1000'

export function usePlacesAPI() {

  const [restaurants, setRestaurants] = useState(Array<unknown>)
  const [loadingRestaurants, setLoadingRestaurants] = useState(false)
  const [restaurantsError, setRestaurantsError] = useState<string>()

  // TODO: Implement clearRestaurants
  // const clearRestaurants = () => {
  //   setRestaurants([])
  // }

  const fetchRestaurants = async (location: LatLong) => {

    setLoadingRestaurants(true)

    try {
      if (!process.env.EXPO_PUBLIC_GOOGLE_API_KEY) {
        throw new Error('API key is not specified')
      }

      const response = await fetch('https://maps.googleapis.com/maps/api/place/nearbysearch/json?' + new URLSearchParams({
        key: process.env.EXPO_PUBLIC_GOOGLE_API_KEY,
        location: `${location.latitude},${location.longitude}`,
        radius: SEARCH_RADIUS,
        type: 'restaurant'
      }))

      // TODO: Only show highly rated places

      if (!response.ok) {
        throw new Error('Invalid response from Places API')
      }

      const result = await response.json()

      if (!result) {
        throw new Error('Error while parsing Places API response')
      }

      if (!result.results.length) {
        throw new Error('No restaurants found')
      }

      setRestaurants(result.results)
    } catch (error: unknown) {
      setRestaurantsError(`${error}`)
    } finally {
      setLoadingRestaurants(false)
    }
  }

  // return { restaurants, fetchRestaurants, clearRestaurants, loadingRestaurants, restaurantsError }
  return { restaurants, fetchRestaurants, loadingRestaurants, restaurantsError }
}
