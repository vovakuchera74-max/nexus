import s from '../styles/loading.module.scss'
import Header from '@/components/Header'
export default function Loading() {
  return (
    <>
      <Header></Header>
      <main className={s.main}>
        <div className={s.content}>
          {/* Sidebar скелетон */}
          <div className={s.sidebarSkeleton}>
            <div className={s.skeletonTitle} />
            {[...Array(25)].map((_, i) => (
              <div key={i} className={s.skeletonLine} />
            ))}
          </div>

          {/* Карточки скелетон */}
          <div className={s.gridSkeleton}>
            {[...Array(6)].map((_, i) => (
              <div key={i} className={s.cardSkeleton}>
                <div className={s.cardImg} />
                <div className={s.cardCategoryRow}>
                  <div className={s.cardBrandTag} />
                  <div className={s.cardCategoryName} />
                </div>
                <div className={s.cardTitle} />
                <div className={s.cardRating} />
                <div className={s.cardBuyRow}>
                  <div className={s.cardPrice} />
                  <div className={s.cardBtn} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}
