
import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import {BASE_URL} from "../config";
import {config} from "../AuthGuard";
const AuthContext = createContext();

function AuthContextProvider(props) {
    const [loggedIn, setLoggedIn] = useState(undefined);

    async function getLoggedIn() {
        const loggedInRes = await axios.get(BASE_URL+"/loggedIn")

        if (loggedInRes && loggedInRes.data){
            console.log("loggedInRes.data")
            console.log(loggedInRes.data)
            // const userRes = await axios.get(BASE_URL+"/authenticated", config)
            // console.log(userRes.data)
        }


        // const loggedInRes = await axios.get(
        //     "https://mern-auth-template-tutorial.herokuapp.com/auth/loggedIn"
        // );
        setLoggedIn(loggedInRes.data);
    }

    useEffect(() => {
        getLoggedIn();
    }, []);

    return (
        <AuthContext.Provider value={{ loggedIn, setLoggedIn, getLoggedIn }}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
export { AuthContextProvider };