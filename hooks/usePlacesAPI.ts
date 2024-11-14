import { useState } from "react"
import { LatLong } from "./useLatLong"

export const SEARCH_RADIUS = '1000'

export function usePlacesAPI() {

  const [restaurants, setRestaurants] = useState(Array<unknown>)
  const [loadingRestaurants, setLoadingRestaurants] = useState(false)
  const [restaurantsError, setRestaurantsError] = useState<string>()

  const fetchRestaurants = async (location: LatLong) => {

    setLoadingRestaurants(true)

    try {
      // TODO: Find restaurants near location using https://developers.google.com/maps/documentation/places/web-service/search-nearby
      // and store using setRestaurants
    } catch (error: unknown) {
      setRestaurantsError(`${error}`)
    } finally {
      setLoadingRestaurants(false)
    }
  }

  return { restaurants, fetchRestaurants, loadingRestaurants, restaurantsError }
}
