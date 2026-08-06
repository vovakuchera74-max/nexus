import s from '../styles/NewOrSale.module.scss'
import { Trash2 } from 'lucide-react'

export default function NewOrSale({
  isNew,
  isSele,
}: {
  isNew: boolean
  isSele: number | null
}) {
  return (
    <div className={s.Block}>
      {isNew && <div className={s.New}>NEW</div>}
      {isSele && <div className={s.Sale}>-{isSele}%</div>}
    </div>
  )
}
