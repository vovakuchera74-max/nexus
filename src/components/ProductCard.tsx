import { Product } from '@/types/Card'
import s from '../styles/ProductCard.module.scss'
import Stars from './Stars'
import NewOrSale from './NewOrSale'
import AddToCartButton from './AddToCartButton'
import Fav from './Fav'
import Image from 'next/image'


export default function ProductCard({
  product,
  view,
  priority
}: {
  product: Product
  view?: string
  priority:boolean
}) {
  return (
    <div className={`${s.ProductCard} ${view === 'list' ? s.listCard : ''}`}>
      <div className={s.imgBlock}>
        
          <NewOrSale
            isNew={product.is_new}
            isSele={product.discount_percent}
          ></NewOrSale>
          <Fav product={product} />
        
        <Image fill src={product.image_url} alt={product.name} priority={priority} sizes="(max-width: 768px) 50vw, 25vw"
  style={{ objectFit: 'cover' }}/>
      </div>
      <div className={s.category}>
        <span className={s.brand}>{product.brand}</span>
        <span className={s.categoryName}>{product.categories?.name}</span>
      </div>
      <div className={s.ItemName}>{product.name}</div>

      <div className={s.raitingBlock}>
        <div className={s.stars}>
          <Stars rating={product.rating}></Stars>
        </div>
        <div className={s.rating}>
          {product.rating} ({product.reviews_count.toLocaleString()})
        </div>
      </div>

      <div className={s.buyBlock}>
        <div className={s.priceBlock}>
          <span className={s.price}>${product.price}</span>
          {product.old_price && (
            <span className={s.oldPrice}>${product.old_price}</span>
          )}
        </div>
        <div className={s.btnBlock}>
          <AddToCartButton product={product}></AddToCartButton>
        </div>
      </div>
    </div>
  )
}
