import s from "../styles/CartCard.module.scss"
import { Trash2 } from 'lucide-react';

export default function CardCart (A:any){


    return(
        <div className={s.Card}>
            <div className={s.Cartimg}><img src="https://24tv.ua/resources/photos/news/202410/2665882.jpg?v=1729257793000" alt="" /> </div>
            <div className={s.InfoBlock}>
                <div className={s.Brend}>Rezer</div>
                <div className={s.title}>Razer DeathAdder V3 HyperSpeed Gaming Mouse</div>
                <div className={s.info}>
                    <div className={s.QtyCost}>
                        <span className={s.qty}>Qty: 10 ×</span>
                        <span className={s.cost}>$123</span>
                    </div>
                    <button className={s.basket}><Trash2 size={13}/></button>
                </div>
            </div>
        </div>
    )
}