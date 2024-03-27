import React from 'react'
import logo from "../../assets/icons/logo.svg";
import "./Header.style.sass"

export default function Header() {
  return (
    <header>
        <div className="logo">
          <img src={logo} alt="logo"></img>
        </div>
        <div className='cart'></div>
      </header>
  )
}
