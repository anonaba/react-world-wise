import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useCities } from '../../contexts/CitiesContext'
import { convertToEmoji } from '../Form'
import styles from './CityItem.module.css'

const formatDate = (date) =>
  new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date))

function CityItem({ city }) {
  const { currentCity, deleteCity } = useCities()
  const { cityName, emoji, date, id, position } = city

  function handleDeleteCity(e) {
    e.preventDefault()
    deleteCity(id)
  }

  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          currentCity.id === id ? styles['cityItem--active'] : ''
        }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}>{convertToEmoji(emoji)}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button onClick={handleDeleteCity} className={styles.deleteBtn}>
          &times;
        </button>
      </Link>
    </li>
  )
}

CityItem.propTypes = {
  city: PropTypes.object,
}
export default CityItem
