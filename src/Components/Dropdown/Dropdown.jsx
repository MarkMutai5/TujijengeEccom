import React from 'react'
import './dropdown.css'
import user from '../../../src/assets/hook.png'

function Dropdown() {
  return (
    <div className="menucontainer" >
        <div className="menutrigger">
            <img src = 'engineer.png' alt = '' />
        </div>
        <div className="dropdownmenu">
            <h3>Tujijenge <br /> <span>Web designer</span></h3>
            <ul>
                <DropdownItem  img = {user} text = {'Profile'}/>
                <DropdownItem  img = {user} text = {'Profile'}/>
                <DropdownItem  img = {user} text = {'Profile'}/>
                <DropdownItem  img = {user} text = {'Profile'}/>
            </ul>
        </div>
    </div>
  )
}

function DropdownItem(props){
    return(
        <>
            <li className = "dropdownitem" >
                <img src= {props.img} alt = "not found" />
                <a>{props.text}</a>
            </li>
        </>
    )
}

export default Dropdown