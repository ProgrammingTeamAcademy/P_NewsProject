import { Link } from "react-router-dom"

export default function Logo() {
    return <Link to="/"><img src="/src/assets/react.svg" alt="logo" className='w-10 left-[2em] top-[2em]'/></Link>
}