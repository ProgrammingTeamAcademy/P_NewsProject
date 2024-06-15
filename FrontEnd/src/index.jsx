import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Welcome from "./pages/Welcome.jsx"
import Home from "./pages/Home.jsx"
import Login from "./pages/Login.jsx"
import Register from "./pages/Register.jsx"
import Post from "./pages/Post.jsx"
import NotFound from "./pages/NotFound.jsx"
import React from 'react';
import "./style.css"

function App() {
    const userLogin = false

    return (<Router>
        <Routes>
            <Route index element={userLogin ? <Home /> : <Welcome />}/>
            <Route path="login" element={<Login />} />
            <Route path="post" element={<Post />} />
            <Route path="register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    </Router>);
}


createRoot(document.querySelector('#root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)