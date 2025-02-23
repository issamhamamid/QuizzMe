
import './App.css'
import {BrowserRouter ,Routes ,  Route} from "react-router";
import {Login} from "./components/Login.tsx";

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
