import { useState } from "react"
import { Input, Icon } from "../components/Form.jsx"
import { Link } from 'react-router-dom'
import Logo from '../components/Logo'

export default function Register() {
    let [data,setData] = useState({
        username: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: ""
    })

    return <div className='flex flex-col gap-20 justify-center items-center h-[100vh]'>
        <span className='absolute left-3 top-3'>
            <Logo />
        </span>
        <div className="flex flex-col gap-10 w-[400px] h-[400px] justify-between">
            <h1 className='text-4xl font-semibold'>Register</h1>
            <form className="flex flex-col gap-5">
                <Input title="username" type="text" value={data.username} onChange={e => setData(curr => ({...curr,username: e.target.value}))} />
                <Input title="phone" type="text" value={data.phone} onChange={e => setData(curr => ({...curr,phone: e.target.value}))} />
                <Input title="email" type="email" value={data.email} onChange={e => setData(curr => ({...curr,email: e.target.value}))} />
                <Input title="password" type="password" visibilityToggle={true} value={data.password} onChange={e => setData(curr => ({...curr,password: e.target.value}))} />
                <Input title="confirm password" type="password" visibilityToggle={true} value={data.confirmPassword} onChange={e => setData(curr => ({...curr,confirmPassword: e.target.value}))} />
            </form>
            <div className='flex flex-col gap-2'>
                <button className='px-10 py-1 flex-1 text-lg items-center justify-center rounded-[4px] text-white flex bg-primary'>Register</button>
                <p>have an account? <Link to="/login" className='text-primary'>login in<Icon name="arrow up right"/></Link></p>
            </div>
        </div>
    </div>
}