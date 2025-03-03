
import './App.css'
import {BrowserRouter ,Routes ,  Route} from "react-router";
import {Login} from "./components/Login.tsx";
import {Register} from "./components/Register.tsx";
import {Home} from "./components/Home.tsx";
import {MainLayout} from "./layouts/MainLayout.tsx";
import {AdminRoom} from "./components/AdminRoom.tsx";
import {Results} from "./components/Results.tsx";
import {UserProvider} from "./context providers/UserProvider.tsx";
import PrivateRouteLayout from "./layouts/PrivateRouteLayout.tsx";
import {UserRoom} from "./components/UserRoom.tsx";

function App() {

    return (
        <UserProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login/>} />

                    <Route path='/results' element={<Results/>}/>
                    <Route path='/register' element={<Register/>}></Route>


                        <Route element={<PrivateRouteLayout />} >
                            <Route path='/app' element={<MainLayout/>}>
                                <Route path='home' element={<Home/>}/>

                            </Route>
                            <Route path='room/admin/:id' element={<AdminRoom/>}/>
                            <Route path='room/:id' element={<UserRoom/>}/>
                        </Route>



                </Routes>
            </BrowserRouter>
        </UserProvider>
    )
}

export default App
