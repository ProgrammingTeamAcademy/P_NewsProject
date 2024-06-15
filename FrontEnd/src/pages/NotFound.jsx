import { Link } from 'react-router-dom'
import Logo from '../components/Logo'

export default function Welcome() {
    return <div className='flex justify-center items-center h-[100vh]'>
        <span className='absolute left-3 top-3'>
            <Logo />
        </span>
        <div className='flex flex-col gap-5'>
            <h1 className='text-4xl font-semibold'>404</h1>
            <h2 className='text-2xl font-normal'>can't found this page</h2>
            <Link to="/" className='px-2 py-2 flex-1 items-center justify-center rounded-[4px] text-white flex bg-primary'>go to home</Link>
        </div>
    </div>
}