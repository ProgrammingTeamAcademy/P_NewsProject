import { Link } from 'react-router-dom'
import Logo from './Logo'
import { getUserData } from "./UserDate.jsx"
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Icon } from './Form.jsx'
import { Clamp } from '../hooks/handValues.jsx'
import useEventListener from '../hooks/useEventListener.jsx'

let NAV_LINKS = {
    "notifications": "/notifications",
    "archive": "/archive",
    "home": "/"
}

function NavLinks({active}) {
    const array = NAV_LINKS

    return <ul className="flex gap-2">
        {Object.entries(array).map(([text,path],index) => 
            <Link to={path} key={index} className={`link-btn ${active == text ? "text-white bg-primary focus-visible:ring-4" : "hover:bg-gray-100"}`}>{text}</Link>
        )}
    </ul>
}

function ProfileDropMenu({hookTo,state,topMargin = 0}) {
    let [position,setPosition] = useState({x: 0,y: 0})
    let [eventActive,setEventActive] = useState(false)
    let ref = useRef()
    const padding = 10 // the x,y value for the popup

    useEffect(_ => {
        if(!state[0]) return setEventActive(false)
        let {x,y} = hookTo.current.getBoundingClientRect()

        x = Clamp({value: Math.floor(x),min: padding,max: document.body.scrollWidth - ref.current?.scrollWidth - padding})
        y = Clamp({value: topMargin + Math.floor(y),min: padding,max: document.body.scrollHeight - ref.current?.scrollHeight - padding})

        setPosition({x,y})
        setEventActive(true)
    },[state])

    useEventListener('mousedown',e => { 
        if(ref.current == e.target || ref.current?.contains(e.target)) return
        state[1](false)
    },eventActive)

    return state[0] && createPortal(
        <ul ref={ref} className='rounded-md fixed flex flex-col bg-white shadow-md py-3 text-lg' style={{left: position.x, top: position.y}}>
            <button className='px-3 py-1 box-content flex justify-between items-center min-w-36 hover:bg-gray-100'>sign out <Icon name="left to bracket" pro={false} flip /></button>
            <button className='px-3 py-1 box-content flex justify-between items-center min-w-36 hover:bg-gray-100'>button <Icon /></button>
            <button className='px-3 py-1 box-content flex justify-between items-center min-w-36 hover:bg-gray-100'>button <Icon /></button>
            <button className='px-3 py-1 box-content flex justify-between items-center min-w-36 hover:bg-gray-100'>button <Icon /></button>
        </ul>,
        document.querySelector('#root')
    )
}

function UserProfile() {
    let [userData,setUserData] = useState({})
    let MenuState = useState(false)
    let ref = useRef()

    useEffect(_ => {
        getUserData().then(setUserData)
    },[])

    return <>
        <button ref={ref} className='hover:bg-gray-100' onMouseDown={_ => MenuState[1](true)}>
            {userData?.username}
        </button>
        <ProfileDropMenu hookTo={ref} state={MenuState} topMargin={55} />
    </>
}

export default function Nav({active}) {
    return <div className="flex p-3 shadow-md items-center justify-between">
        <Logo />
        <NavLinks active={active} />
        <UserProfile />
    </div>
}