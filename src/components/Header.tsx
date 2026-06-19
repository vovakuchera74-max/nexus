import s from "../styles/Header.module.scss"
import { Gamepad2 } from 'lucide-react';
import Link from "next/link";

import { SearchInput } from "./Search";
import HeaderActions from "./ProfileCart";
export default function Header (){


    return(
        <header className={s.header}>
        <div className={s.headerbox}>
                <Link href={"/"} className={s.logo}>
                <div className={s.log}><Gamepad2 size={22}/></div>
                <div className={`${s.name} ${s.orbitron}`}>NEXUS <span className={s.gg}>GG</span></div>
                </Link>
                <SearchInput></SearchInput>
            <HeaderActions></HeaderActions>

        </div>
        </header>
    )
}