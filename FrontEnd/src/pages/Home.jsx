import { useEffect, useState } from "react"
import { Icon } from "../components/Form.jsx"
import Nav from "../components/Nav.jsx"
import { Link } from "react-router-dom"
import { getPosts } from "../components/UserDate.jsx"

let FILTER_VALUES = ["important","new","all"]



function Post({data}) {
    return <div className="grid shrink-0 grid-cols-[auto_1fr] grid-rows-2 gap-2 h-24 items-center bg-white shadow-[0_0_10px_#0002] rounded-sm overflow-hidden">
        {data.preview && <img src={data.preview} className="row-span-2 h-24" />}
        <div className="flex gap-2 h-fit">
            {data.tags.map((tag,index) =>
                <span className="font-light" key={index}>{tag}</span>
            )}
        </div>
        <div className="flex h-fit pr-2">
            <h1 className="flex-1">{data.title}</h1>
            <div>
                <button><Icon name="pen" /></button>
                <button><Icon name="trash" /></button>
                <button><Icon name="inbox" /></button>
                <button><Icon name="circle-exclamation" /></button>
            </div>
        </div>
    </div>
}

function Table({filter}) {

    let [posts,setPosts] = useState([])

    useEffect(_ => {
        getPosts().then(setPosts)
    },[])


    return <ul className="flex flex-col gap-4 py-2 px-3 h-0 grow overflow-auto">
        {posts.map((post) => 
            <Post key={post.id} data={post} />
        )}
    </ul>
} // TODO: add filter functionality

function Filter({filter,setFilter}) {
    let options = FILTER_VALUES

    return <ul className="flex gap-2">
        {options.map((value,index) => 
            <button onClick={_ => setFilter(value)} key={index} className={`link-btn ${filter == value ? "text-white bg-primary focus-visible:ring-4" : "hover:bg-gray-100"}`}>{value}</button>
        )}
    </ul>
}


export default function Home() {
    let [filter,setFilter] = useState('all')

    return <div className="flex flex-col h-screen">
        <Nav active='home'/>
        <main className="flex flex-col pt-3 gap-3 h-0 grow">
            <div className="flex justify-between px-3">
                <Filter filter={filter} setFilter={setFilter} />
                <Link to="/post" className="link-btn text-white bg-primary focus-visible:ring-4">create new post</Link>
            </div>
            <Table filter={filter} />
        </main>
    </div>
}