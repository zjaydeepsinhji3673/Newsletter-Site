import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Loginu from './components/user/Loginu'
import Register from './components/user/Register'
import Home from './components/user/Home'
import Protected from './components/utils/Protected.config'
import Index from './components/user/Index'
import Createnl from './components/user/Createnl'
import Mynewsletters from './components/user/Mynewsletters'
import Logina from './components/admin/Logina'
import ProAdmin from './components/utils/Protectedadmin.config'
import Dashboard from './components/admin/Dashboard'
import AcceptReject from './components/admin/AcceptReject'
export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Index />}></Route>
                <Route path='/login' element={<Loginu />}></Route>
                <Route path='/register' element={<Register />}></Route>
                <Route path='/home' element={<Protected ><Home /></Protected>}></Route>
                <Route path='/create-newsletter' element={<Protected ><Createnl /></Protected>}></Route>
                <Route path='/my-newsletters' element={<Protected ><Mynewsletters /></Protected>}></Route>


                <Route path='/admin/' element={<Logina />}></Route>
                <Route path='/admin/dashboard' element={<ProAdmin><Dashboard /></ProAdmin>}></Route>
                <Route path='/admin/accept-reject' element={<ProAdmin><AcceptReject /></ProAdmin>}></Route>
            </Routes>
        </BrowserRouter>
    )
}
