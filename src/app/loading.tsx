import s from "../styles/loading.module.scss"

export default function Loading() {
  return (
    <main className={s.main}>
      <div className={s.content}>
        
        {/* Sidebar скелетон */}
        <div className={s.sidebarSkeleton}>
          <div className={s.skeletonTitle} />
          {[...Array(8)].map((_, i) => (
            <div key={i} className={s.skeletonLine} />
          ))}
        </div>

        {/* Карточки скелетон */}
        <div className={s.gridSkeleton}>
          {[...Array(6)].map((_, i) => (
            <div key={i} className={s.cardSkeleton}>
              <div className={s.cardImg} />
              <div className={s.cardLine} />
              <div className={s.cardLineShort} />
            </div>
          ))}
        </div>

      </div>
    </main>
  )
}