
import './App.css'
import {BrowserRouter ,Routes ,  Route} from "react-router";
import {Login} from "./components/Login.tsx";
import {Register} from "./components/Register.tsx";
import {SideBar} from "./components/SideBar.tsx";

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>} />
                <Route path='/register' element={<Register/>}></Route>
                <Route path = '/sidebar' element={<SideBar/>}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
