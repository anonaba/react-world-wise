import { useSearchParams } from 'react-router-dom'

function useUrlPosition() {
  const [searhParams] = useSearchParams()

  const lat = searhParams.get('lat')
  const lng = searhParams.get('lng')

  return [lat, lng]
}
export default useUrlPosition
