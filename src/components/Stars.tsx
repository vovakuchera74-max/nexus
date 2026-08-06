import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'

export default function Stars({ rating }: { rating: number }) {
  return (
    <>
      {[1, 2, 3, 4, 5].map((star) => {
        if (rating >= star) return <FaStar key={star} size={11} />
        if (rating >= star - 0.5) return <FaStarHalfAlt key={star} size={11} />
        return <FaRegStar key={star} size={11} />
      })}
    </>
  )
}
