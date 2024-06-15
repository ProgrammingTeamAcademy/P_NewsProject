import { useEffect, useState } from "react"
import { Icon, Input, Textarea, Check } from "../components/Form.jsx"
import Nav from "../components/Nav.jsx"
import { Link, useFetcher, useSearchParams } from "react-router-dom"
import { getPost } from "../components/UserDate.jsx"
import useEventListener from "../hooks/useEventListener.jsx"


function isYoutubeVideo(url) {
    return /youtube\.com\/watch\?v=.{8,}/.test(url) || /youtube\.com\/shorts\/.{8,}/.test(url) 
}

function Preview({data}) {
    let {url,file} = data
    if(url && (isYoutubeVideo(url) || !url.includes('http'))) {
        let urlObj = !url.includes('http') ? null : new URL(url)
        let id = !url.includes('http') ? url : urlObj?.searchParams?.get('v') || urlObj?.pathname?.replace('/shorts/','')

        return <iframe className="w-full h-full object-contain" src={`https://www.youtube.com/embed/${id}`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
    }

    // if(url) {
    //     fetch(url)
    //     .then(x => x.blob())
    //     .then(x => {
    //         file = x
    //     })

    // } // TODO fetch the url by the backside

    if(file?.type?.includes("video")) {
        return <video src={URL.createObjectURL(file)} controls className="w-full h-full object-contain" />
    }
    if(file?.type?.includes("image")) {
        return <img src={URL.createObjectURL(file)} className="w-full h-full object-contain" />
    }
 
    return <span className="bg-primary before:content-['image_/_video'] hover:before:content-['browse'] before:duration-100 duration-100 flex items-center justify-center text-[1.6em] font-semibold text-white w-full h-full rounded-md"></span>
}

function useDragDrop(setData) {
    let [dragOverState,setDragOverState] = useState(false)

    let onDrop = e => {
        e.preventDefault()
        setDragOverState(false)
        setData(e.dataTransfer.files[0])
    }
    let onDragOver = e => {
        e.preventDefault()
        setDragOverState(true)
    }

    let onDragLeave = e => {
        e.preventDefault()
        setDragOverState(false)
    }

    return [dragOverState,{onDrop,onDragOver,onDragLeave}]
}

function useBrowserFiles(accept = "") {
    let start = async _ => {
        let inp =  document.querySelector('input[type=file]') || document.createElement('input')
        inp.type = 'file'
        inp.setAttribute('accept',accept)
        document.body.append(inp)
        inp.click()

        let files = await new Promise(res => {
            inp.addEventListener('change',_ => {
                res(inp.files)
                inp.remove()
            })
        })
    }


    return start
}


export default function Post() {
    let [searchParams, setSearchParams] = useSearchParams();
    let [data,setData] = useState({
        title: "",
        tags: [],
        content: "",
        url: null,
        file: null,
        notification: false
    })

    let [dragover,dragoverFns] = useDragDrop(file => setData(c => ({...c,file,url: ''})))
    let startBrowsing = useBrowserFiles("image/*, video/*")

    useEffect(_ => {
        if(!searchParams.get('id')) return
        getPost({id: searchParams.get('id')}).then(async data => {
            setData({
                title: data.title,
                tags: data.tags,
                content: data.content,
                file: data.image || !isYoutubeVideo(data.video) ? data.video : null,
                url: isYoutubeVideo(data.video) ? data.video : null
            })
        })
    },[]) // get data from previous post

    useEventListener('paste',async event => {
        let data = await navigator.clipboard.read()
        if(!data?.[0]?.types?.[0] || !(data[0].types[0].includes('image') || data[0].types[0].includes('video'))) return
        let blob = await data[0].getType(data[0].types[0])
        setData(c => ({...c,file: blob, url: null}))
    },true)

    return <div className="flex flex-col h-screen">
        <Nav />
        <main className="grid grid-rows-[1fr_auto] grid-cols-[1fr_auto] h-0 grow p-5 gap-5 justify-items-end">
            <div className="w-full h-full pl-16 flex flex-col gap-4">
                <Input title="title" value={data.title} onChange={e => setData(c => ({...c,title: e.target.value}))} />
                <Input title="tags" value={data.tags.join(' ')} onChange={e => setData(c => ({...c,tags: e.target.value ? e.target.value.split(' ') : []}))}/>
                <Textarea title="content" className="w-full h-[600px] min-h-40 max-h-[600px]" value={data.content} onChange={e => setData(c => ({...c,content: e.target.value}))} />
            </div>
            <div className="h-full pl-12 flex flex-col gap-5 w-96">

            <div {...dragoverFns} onMouseDown={startBrowsing} className={`hover:brightness-[115%] cursor-pointer w-full aspect-video rounded-md duration-100  border-slate-700 border-dashed ${dragover ? "border-[5px]" : ""}`} >
                <Preview data={data} />
            </div>
                <Input title="url" value={data.url ?? ""} onChange={e => setData(c => ({...c,url: e.target.value}))} />
                <Check title="send notification" checked={data.notification} onChange={checked => setData(c => ({...c,notification: checked}))}/>
            </div>
            <div className="col-span-2 w-fit h-fit flex gap-5 justify-end">
                <button className='px-10 py-1 flex-1 text-lg items-center justify-center rounded-[4px] text-primary flex border-2 border-primary'>cancel</button>
                <button className='px-10 py-1 flex-1 text-lg items-center justify-center rounded-[4px] text-white flex bg-primary'>publish</button>
            </div>
        </main>
    </div>
}
