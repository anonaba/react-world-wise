import Message from '../../components/Message'
import Spinner from '../../components/Spinner'
import { useCities } from '../../contexts/CitiesContext'
import CountryItem from '../CountryItem'
import styles from './CountryList.module.css'

import PropTypes from 'prop-types'

function CountryList() {
  const { cities, isLoading } = useCities()

  if (isLoading) return <Spinner />

  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    )

  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country)) {
      return [...arr, { country: city.country, emoji: city.emoji }]
    } else {
      return arr
    }
  }, [])

  return (
    <div className={styles.cityList}>
      {countries?.map((country) => (
        <CountryItem key={`list-${country.country}`} country={country} />
      ))}
    </div>
  )
}

CountryList.propTypes = {
  cities: PropTypes.array,
  isLoading: PropTypes.bool,
}

export default CountryList
