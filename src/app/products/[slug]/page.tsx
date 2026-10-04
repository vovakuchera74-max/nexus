import s from "../../../styles/ProductPage.module.scss"
import Header from "@/components/Header"
import { createServerSupabase } from "@/lib/supabase-server"
import { notFound } from 'next/navigation'
import { ArrowLeft,ChevronRight,Star  } from 'lucide-react';
import Link from "next/link";
import Image from "next/image";
import NewOrSale from "@/components/NewOrSale";
import Stars from "@/components/Stars";
import { Truck,Shield,RotateCcw,Zap} from 'lucide-react';
import AddToCartButton from "@/components/AddToCartButton";
import Fav from "@/components/Fav";
export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
const { slug } = await params
  const supabase = await createServerSupabase()

  const { data: product } = await supabase
    .from('products')
    .select('*, categories(name), product_specs(label, value, sort_order)')
    .eq('slug', slug)
    .order('sort_order', { referencedTable: 'product_specs' })
    .single()

  if (!product) notFound()
console.log(product)
    return(
    <>
        <Header></Header>

        <div className={s.ContentALlBlock}>
          <div className={s.ContentBLC}>
            <div className={s.ContentTop}>
                <Link href="/" className={s.btnBack}><ArrowLeft size={16}></ArrowLeft><div className={s.StoreWord}>Store</div></Link>
                <ChevronRight size={14}></ChevronRight>
                <div className={s.CategoriesName}>{product.categories?.name}</div>
                <ChevronRight size={14}></ChevronRight>
                <div className={s.Name1}>{product.name}</div>
            </div>
            <div className={s.ContentMain}>
                <div className={s.PhotoBlock}>
                <NewOrSale isNew={product.is_new} isSele={product.discount_percent}></NewOrSale>
                <Image fill src={product.image_url} alt={product.name} priority={true} sizes="(max-width: 768px) 50vw, 25vw"style={{ objectFit: 'cover' }}/>
              </div>
              
              <div className={s.DatailsBlock}>
                <div className={s.category}>
        <span className={s.brand}>{product.brand}</span>
        <span className={s.categoryName}>{product.categories?.name}</span>
      </div>
                <div className={s.NameForMarc}>{product.name}</div>

                <div className={s.raitingBlock}>
        <div className={s.stars}>
          <Stars size={15} rating={product.rating}></Stars>
        </div>
        <div className={s.ratingNumber}>{product.rating}</div>
        <div className={s.rating}>
           {product.reviews_count.toLocaleString()} reviews
        </div>
      </div>
                <div className={s.priceBlock}>
          <span className={s.price}>${product.price}</span>
          {product.old_price && (
            <span className={s.oldPrice}>${product.old_price}</span>
          )}
          {product.discount_percent && (
            <div className={s.priceSell}>Save ${Math.ceil(product.old_price / 100 *  product.discount_percent).toFixed(2)}</div>
          )}
        </div>
                <div className={s.discriptionsForMarc}>{product.description}</div>
                <div className={s.someblockForMarc}>
                  <div className={s.ThisBlock}>
                    <div className={s.Embl}><Truck size={18}/></div>
                    <div className={s.Text}>Free shipping</div>
                  </div>
                  <div className={s.ThisBlock}>
                    <div className={s.Embl}><Shield size={18}/></div>
                    <div className={s.Text}>2-yr warranty</div>
                  </div>
                  <div className={s.ThisBlock}>
                    <div className={s.Embl}><RotateCcw size={18}/></div>
                    <div className={s.Text}>30-day returns</div>
                  </div>
                </div>
                <div className={s.InStockForMarc}>
                  <div className={s.dot}></div>
                  <div className={s.StockForMarc}>In Stock — ships within 24h</div>
                </div>
                <div className={s.AddOrWish}>
                  <AddToCartButton version={false}  product={product}></AddToCartButton>
                  <Fav version={false} product={product}></Fav>

                </div>
              </div>
              
            </div>
            <div className={s.ContentBottom}>
              <div className={s.Block1}>
                <div className={s.SpecificationsBlock}>
                  <Zap size={18}></Zap>
                  <h2 className={s.SpecificationsName}>SPECIFICATIONS</h2>
                </div>
                {product.product_specs.map((item:any)=>(
                  <div className={s.ItemBlock} key={item.value}>
                    <div className={s.ItemOptions}>{item.label}</div>
                    <div className={s.ItemValue}>{item.value}</div>
                  </div>
                ))}
              </div>
              <div className={s.Block2}>
                <div className={s.ReviewsBlock}>
                  <div className={s.ReviewsWord}>
                    <Star size={18} fill="rgb(245, 158, 11)" color="rgb(245, 158, 11)"/>
                    <span>Reviews</span>
                  </div>
                  <div className={s.ReviewsNumber}>
                    <span className={s.BigNum}>{product.rating}</span>
                    <span className={s.SmalNum}>/ 5</span>
                  </div>
                </div>
                <div className={s.ComentBlock}>
                                  <div className={s.Coment}>
                  <div className={s.Nick}>
                    <div className={s.IconBlock}>
                      <div className={s.avatar}>VI</div>
                      <div className={s.nick}>ViperX99</div>
                    </div>
                    <div className={s.Data}>Aug 2026</div>
                  </div>
                  <div className={s.Rait}>
                    <Star size={11} fill="rgb(245, 158, 11)" color="rgb(245, 158, 11)"/>
                    <Star size={11} fill="rgb(245, 158, 11)" color="rgb(245, 158, 11)"/>
                    <Star size={11} fill="rgb(245, 158, 11)" color="rgb(245, 158, 11)"/>
                    <Star size={11} fill="rgb(245, 158, 11)" color="rgb(245, 158, 11)"/>
                    <Star size={11} fill="rgb(245, 158, 11)" color="rgb(245, 158, 11)"/>
                  </div>
                  <div className={s.Com}>Absolutely worth every penny. The build quality is outstanding and the performance is leagues ahead of anything I have used before.</div>
                </div>
                 <div className={s.Coment}>
                  <div className={s.Nick}>
                    <div className={s.IconBlock}>
                      <div className={s.avatar}>NE</div>
                      <div className={s.nick}>NeonBlaze</div>
                    </div>
                    <div className={s.Data}>Jul 2026</div>
                  </div>
                  <div className={s.Rait}>
                    <Star size={11} fill="rgb(245, 158, 11)" color="rgb(245, 158, 11)"/>
                    <Star size={11} fill="rgb(245, 158, 11)" color="rgb(245, 158, 11)"/>
                    <Star size={11} fill="rgb(245, 158, 11)" color="rgb(245, 158, 11)"/>
                    <Star size={11} fill="rgb(245, 158, 11)" color="rgb(245, 158, 11)"/>
                    <Star size={11} stroke="rgb(61, 58, 96)"/>
                  </div>
                  <div className={s.Com}>Great product overall. Took a few days to get used to but now I cannot imagine going back. Minor gripe with the packaging but the product itself is flawless.</div>
                </div>
                 <div className={s.Coment}>
                  <div className={s.Nick}>
                    <div className={s.IconBlock}>
                      <div className={s.avatar}>ST</div>
                      <div className={s.nick}>StormRider</div>
                    </div>
                    <div className={s.Data}>Jun 2026</div>
                  </div>
                  <div className={s.Rait}>
                    <Star size={11} fill="rgb(245, 158, 11)" color="rgb(245, 158, 11)"/>
                    <Star size={11} fill="rgb(245, 158, 11)" color="rgb(245, 158, 11)"/>
                    <Star size={11} fill="rgb(245, 158, 11)" color="rgb(245, 158, 11)"/>
                    <Star size={11} fill="rgb(245, 158, 11)" color="rgb(245, 158, 11)"/>
                    <Star size={11} fill="rgb(245, 158, 11)" color="rgb(245, 158, 11)"/>
                  </div>
                  <div className={s.Com}>Bought this on a recommendation and I am blown away. Setup was painless and it performs exactly as advertised. Highly recommend.</div>
                </div>
                </div>

              </div>
            </div>
          </div>
        </div>
    </>
)}
