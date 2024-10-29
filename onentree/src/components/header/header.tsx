"use client";
import { useState } from "react";
import Image from "next/image";
import Logo from "../../../public/logo_branca.svg";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Header() {
     const [isOpen, setIsOpen] = useState(false);

     return (
          <header className="flex flex-row items-center justify-around text-white p-4">
               <div className="flex items-center gap-10" >
                    <Image src={Logo} alt="Logo" className="w-24 h-auto" />
                    <nav
                         className={`${isOpen ? "block" : "hidden"
                              }  md:w-auto md:static md:flex 
                         md:gap-5 md:items-center  md:bg-transparent`}>
                         <ul className="flex flex-col 
                         items-center gap-5 md:flex-row md:gap-5">
                              <li>
                                   <Link href="/">Home</Link>
                              </li>
                              <li>
                                   <Link href="/eventos">Eventos</Link>
                              </li>
                              <li>
                                   <Link href="/locais">Locais</Link>
                              </li>
                         </ul>
                    </nav>
               </div>

               <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)}>
                         {isOpen ? <X className="w-6 h-6" /> :
                              <Menu className="w-6 h-6" />}
                    </button>
               </div>


               <div className="hidden md:flex items-center gap-4">
                    <div className="w-fit py-2 px-3 bg-[#9ED0E6] rounded-full">
                         <p>TA</p>
                    </div>
                    <p className="text-base">Olá, Nome</p>
               </div>
          </header >
     );
}
