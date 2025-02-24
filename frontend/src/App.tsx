
import './App.css'
import {BrowserRouter ,Routes ,  Route} from "react-router";
import {Login} from "./components/Login.tsx";
import {Register} from "./components/Register.tsx";

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>} />
                <Route path='/register' element={<Register/>}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
