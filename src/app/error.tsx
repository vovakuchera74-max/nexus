'use client'
import s from '../styles/Error.module.scss'
import { RotateCcw } from 'lucide-react'
export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className={s.errorPage}>
      <div className={`${s.corner} ${s.cornerTopLeft}`}></div>
      <div className={`${s.corner} ${s.cornerTopRight}`}></div>
      <div className={`${s.corner} ${s.cornerBottomLeft}`}></div>
      <div className={`${s.corner} ${s.cornerBottomRight}`}></div>
      <div className={s.scanLine}></div>
      <div className={s.BlockError}>
        <h1 className={s.glitch}>500</h1>
        <div className={s.ServerWords}>Oops, The server crashed.</div>
        <div className={s.ReloadWords}>Please reload the page.</div>
        <button className={s.Reloadbtn} onClick={reset}>
          <span className={s.ReloadImg}>
            <RotateCcw size={21}></RotateCcw>
          </span>
          <span className={s.ReloadWord}>Reload</span>
        </button>
      </div>
    </div>
    
  )
}
