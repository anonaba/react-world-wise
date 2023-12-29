import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from 'react-leaflet'
import { useNavigate } from 'react-router-dom'
import styles from './Map.module.css'

import { useCities } from '../../contexts/CitiesContext'
import useGeolocation from '../../hooks/useGelolocation'

import Button from '../../components/Button'
import useUrlPosition from '../../hooks/useUrlPosition'

function Map() {
  const [mapPosition, setMapPosition] = useState([12.8797, 121.774])
  const { cities } = useCities()
  const [mapLat, mapLng] = useUrlPosition()

  const {
    isLoading: isLoadingPosition,
    position: geoLoationPosition,
    getPosition,
  } = useGeolocation()

  useEffect(() => {
    if (mapLat && mapLng) setMapPosition([mapLat, mapLng])
  }, [mapLat, mapLng])

  useEffect(() => {
    if (geoLoationPosition) {
      // const [lat, lng] = geoLoationPosition
      setMapPosition([geoLoationPosition.lat, geoLoationPosition.lng])
    }
  }, [geoLoationPosition])

  return (
    <div className={styles.mapContainer}>
      {!geoLoationPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? 'Loading...' : 'Use your position'}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />

        {cities.map((city) => (
          <Marker
            key={city.id}
            position={[city.position.lat, city.position.lng]}
          >
            <Popup>
              <span>{city.emoji}</span> <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}

        <ChangeView position={mapPosition} />
        <DetectClick />

        {/* <ChangeView position={[mapLat || 12.8797, mapLng || 121.774]} /> */}

        {/* <Marker position={mapPosition}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker> */}
      </MapContainer>
    </div>
  )
}

function ChangeView({ position }) {
  const map = useMap()
  map.setView(position)
  return null
}

function DetectClick() {
  const navigate = useNavigate()
  useMapEvents({
    click: (e) => {
      const { lat, lng } = { ...e.latlng }
      return navigate(`form?lat=${lat}&lng=${lng}`)
    },
  })
}

ChangeView.propTypes = {
  position: PropTypes.array,
}

export default Map
