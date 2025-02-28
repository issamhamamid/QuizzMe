
import './App.css'
import {BrowserRouter ,Routes ,  Route} from "react-router";
import {Login} from "./components/Login.tsx";
import {Register} from "./components/Register.tsx";
import {Home} from "./components/Home.tsx";
import {MainLayout} from "./layouts/MainLayout.tsx";
import {Room} from "./components/Room.tsx";
import {Question} from "./components/Question.tsx";

import {LeaderboardItem} from "./components/LeaderboardItem.tsx";
import {Results} from "./components/Results.tsx";
import {UserProvider} from "./components/UserProvider.tsx";
import PrivateRouteLayout from "./layouts/PrivateRouteLayout.tsx";

function App() {

    return (
        <UserProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login/>} />
                    <Route path="/leaderboard" element={<LeaderboardItem/>} />

                    <Route path='/results' element={<Results/>}/>
                    <Route path='/question' element={<Question/>}/>
                    <Route path='/register' element={<Register/>}></Route>

                    <Route element={<PrivateRouteLayout />} >
                        <Route path='/app' element={<MainLayout/>}>
                            <Route path='home' element={<Home/>}/>
                            <Route path='room' element={<Room/>}/>
                        </Route>
                    </Route>


                </Routes>
            </BrowserRouter>
        </UserProvider>
    )
}

export default App
