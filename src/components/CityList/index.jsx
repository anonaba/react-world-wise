import Spinner from '../../components/Spinner'
import CityItem from '../CityItem'
import styles from './CityList.module.css'

import PropTypes from 'prop-types'
import Message from '../../components/Message'
import { useCities } from '../../contexts/CitiesContext'
function CityList() {
  const { cities, isLoading } = useCities()

  if (isLoading) return <Spinner />

  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    )

  return (
    <div className={styles.cityList}>
      {cities?.map((city) => (
        <CityItem key={`list-${city.id}`} city={city} />
      ))}
    </div>
  )
}

CityList.propTypes = {
  cities: PropTypes.array,
  isLoading: PropTypes.bool,
}

export default CityList
