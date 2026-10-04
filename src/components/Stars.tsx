import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'

export default function Stars({ rating,size }: { rating: number , size:number }) {
  return (
    <>
      {[1, 2, 3, 4, 5].map((star) => {
        if (rating >= star) return <FaStar key={star} size={size} />
        if (rating >= star - 0.5) return <FaStarHalfAlt key={star} size={size} />
        return <FaRegStar key={star} size={size} />
      })}
    </>
  )
}
