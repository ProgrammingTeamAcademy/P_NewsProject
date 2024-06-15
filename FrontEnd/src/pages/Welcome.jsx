import { Link } from 'react-router-dom'
import Logo from '../components/Logo'

export default function Welcome() {
    return <div className='flex justify-center items-center h-[100vh]'>
        <span className='absolute left-3 top-3'>
            <Logo />
        </span>
        <div className='flex flex-col min-w-[400px] h-[400px]'>
            <h1 className='text-4xl font-semibold text-nowrap'>Welcome to 
                <span className='text-primary'>[Project Name]</span>
            </h1>
            <h3>description/slogan</h3>
            <div className='flex gap-2 justify-between mt-auto'>
                <Link to="/login" className='px-10 py-1 flex-1 text-lg items-center justify-center rounded-[4px] text-white flex bg-primary'>login</Link>
                <Link to="/register" className='px-10 py-1 flex-1 text-lg items-center justify-center rounded-[4px] text-primary flex border-2 border-primary'>register</Link>
            </div>
        </div>
    </div>
}