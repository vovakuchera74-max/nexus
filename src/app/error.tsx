"use client"
import s from "../styles/error.module.scss"

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className={s.errorPage}>
      <h1>500</h1>
      <p>Щось пішло не так</p>
      <p>Будь ласка перезавантажте сторінку</p>
      <button onClick={reset}>Спробувати ще раз</button>
    </div>
  );
}