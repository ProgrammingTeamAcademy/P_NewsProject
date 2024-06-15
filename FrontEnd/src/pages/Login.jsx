import { useState } from "react"
import { Input, Icon } from "../components/Form.jsx"
import Logo from '../components/Logo'
import { Link } from 'react-router-dom'

export default function Login() {
    let [data,setData] = useState({
        email: "",
        password: ""
    })

    return <div className='flex flex-col gap-20 justify-center items-center h-[100vh]'>
        <span className='absolute left-3 top-3'>
            <Logo />
        </span>
        <div className="flex flex-col gap-10 w-[400px] h-[400px] justify-between">
            <h1 className='text-4xl font-semibold'>Login</h1>
            <form className="flex flex-col gap-5">
                <Input title="email" type="email" value={data.email} onChange={e => setData(curr => ({...curr,email: e.target.value}))} />
                <Input title="password" type="password" visibilityToggle={true} value={data.password} onChange={e => setData(curr => ({...curr,password: e.target.value}))} />
            </form>
            <div className='flex flex-col gap-2'>
                <button className='px-10 py-1 flex-1 text-lg items-center justify-center rounded-[4px] text-white flex bg-primary'>login</button>
                <p>need account? <Link to="/register" className='text-primary'>create one <Icon name="arrow up right"/></Link></p>
            </div>
        </div>
    </div>
}