import {createContext, useState, useEffect} from "react";
import axios from "axios"
import { toast } from 'react-toastify';

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const [user, setUser] = useState(null);
    const [showLogin, setShowLogin] = useState(false);
    const [token, setToken] = useState(localStorage.getItem("fusion-token"))
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [credit, setCredit] = useState(false)

    const loadCreditsData = async () => {
        try {
            const {data} = await axios.post(backendUrl + "/api/user/credits", {}, {
                headers: {token}
            })
            console.log(token)
            if (data.success) {
                setCredit(data.credits)
                setUser(data.user)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const logout = () => {
        localStorage.removeItem('fusion-token')
        setToken("")
        setUser(null)
    }

    useEffect(() => {
        if (token) {
            loadCreditsData()
        }
    }, [token])

    const value = {
        user, setUser, showLogin, setShowLogin, backendUrl,
        token, setToken, credit, setCredit, logout, loadCreditsData
    }
    return (
        <AppContext.Provider value = {value}>
            {props.children}
        </AppContext.Provider>
    )
}
export default AppContextProvider;