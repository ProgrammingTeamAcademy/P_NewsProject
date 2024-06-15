import { useRef, useState } from "react"

export function Input({type = 'text',title = "",onEnter,visibilityToggle,...props}) {
    let handelKeys = e => {
        if(e.key == "Escape") e.target.blur()
        if(onEnter && e.key == "Enter") onEnter()
    }

    let [visible,setVisible] = useState(type != "password")
    let inputRef = useRef()
    let focus = _ => {
        setTimeout(_ => {
            inputRef.current.focus()
        },0)
    }


    return <div className="flex items-center relative">
        <span className="translate-x-[-100%] left-[-1em] top-0 absolute" onMouseDown={focus}>{title}</span>
        <div className={` ${visibilityToggle ? "right-margin" : ""} w-[100%] flex gap-1 p-1 rounded-md border-gray-100 focus-within:border-primary duration-100 border-2`}>
            <input {...props} ref={inputRef} className={`outline-none flex-1 indent-1 bg-transparent ${props.className}`} type={visibilityToggle && visible ? "text" : type} onKeyDown={handelKeys}/>
            { visibilityToggle &&
                <button className="flex items-center justify-center w-5" type="button" onClick={_ => {setVisible(c=>!c); focus()}}><Icon name={visible ? "eye slash" : "eye"} style="light" /></button>
            }
        </div>
    </div>
}

export function Textarea({title = "",onEnter,...props}) {
    let handelKeys = e => {
        if(e.key == "Escape") e.target.blur()
        if(onEnter && e.key == "Enter") onEnter()
    }

    let inputRef = useRef()
    let focus = _ => {
        setTimeout(_ => {
            inputRef.current.focus()
        },0)
    }


    return <div className="flex items-center relative">
        <span className="translate-x-[-100%] left-[-1em] top-0 absolute" onMouseDown={focus}>{title}</span>
        <textarea {...props} ref={inputRef} className={`w-[100%] flex gap-1 p-1 rounded-md border-gray-100 focus-within:border-primary duration-100 border-2 outline-none flex-1 indent-1 bg-transparent ${props.className}`} onKeyDown={handelKeys}/>
    </div>
}

export function Check({checked,onChange,title = ""}) {
    let ref = useRef()

    let sendChange = checked => {
        onChange(checked)
    }

    return <span className="flex items-center gap-3 justify-between">
        {title && <span onClick={_ => sendChange(!checked)}>{title}</span>}
        <div className={`w-6 h-6 bg-${checked ? "primary" :"white"} rounded-md cursor-pointer duration-100 overflow-hidden relative border-gray-100 border-2 focus-within:ring-4`} onClick={_ => sendChange(!checked)}>
            <input ref={ref} type="checkbox" className="sr-only" onChange={e => sendChange(e.target.checked)} />
            <Icon className={`absolute translate-x-[-50%] translate-y-[-50%]  duration-100 text-white font-bold`} name="check" cssstyle={{left: checked ? 50 + '%' : 150 + '%',top: checked ? 50 + '%' : 150 + '%'}} />
        </div>
    </span>
}


/**
 * return <i/> contains (fontawesome) icon 
 * @param {object} obj component props
 * @param {string} obj.name the icon name in fontawesome library
 * @param {'solid'|'regular'|'light'|'duotone'|'thin'} obj.style the icon type
 * @param {boolean} obj.sharp if the icon is sharp
 * @param {boolean} obj.pro used to toggle between fontawesome pro and normal font
 * @param {*} obj.props used to add properties to the <i/> tag
 */

export function Icon({name = 'font-awesome',style = 'regular',sharp = false,flip = false,pro = true,...props} = {}) {
    return (
        <i
        {...props}
        style={props.cssstyle}
        className={`
            ${pro ? "font-['Font Awesome 6 Pro']" : "font-['FontAwesome']"}
            fa-${name.toLowerCase().replace(/ /g,'-')}
            fa-${style}
            ${flip ? "fa-flip-horizontal" : ""}
            ${sharp ? 'fa-sharp' : ""}
            ${props.className}
        `}></i>
    )
}