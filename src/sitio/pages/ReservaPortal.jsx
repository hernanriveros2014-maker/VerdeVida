import { useParams } from 'react-router-dom'
import { FichaVip } from '../components/FichaVip'

export function ReservaPortal() {
  const { id } = useParams()
  return <FichaVip id={id} />
}
