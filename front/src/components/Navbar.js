import React, {useContext, useEffect, useState} from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import {isLoggedIn} from "../AuthGuard"; // If using React Router
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import {BASE_URL} from "../config";
import AuthContext from "../context/AuthContext";
// import "../assets/css/style.css"

const Navbar = () => {
    const { loggedIn, setLoggedIn } = useContext(AuthContext);
    // const [ auth, setAuth ] = useState(loggedIn)
    // isLoggedIn is a boolean flag to determine user authentication status
    const navigate = useNavigate();

    const handleLogout = async () => {
        // Handle logout logic here
        // console.log(localStorage.getItem("token"))
        // console.log(isLoggedIn())
        await axios.get(BASE_URL+"/logout").then(resp =>{
            setLoggedIn(false)
            navigate("/login")
            // window.location="/login"
        })
    };

    return (
        <AppBar position="static" className="navbar" >
            <Toolbar>
                <Typography
                    variant="h6"
                    component={Link}
                    to="/"
                    sx={{
                        flexGrow: 1,
                        color:'#2c4466',
                        textDecoration: 'none',
                        cursor: 'pointer',
                        '&:hover': {
                            textDecoration: 'none', // Remove underline on hover
                        },
                    }}
                >
                    Key and Go
                </Typography>
                <div>
                    {loggedIn ? (
                        <>
                            <Button color="inherit" component={Link} to="/account">
                                Account
                            </Button>
                            <Button color="inherit" onClick={handleLogout}>
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button color="inherit" component={Link} to="/register">
                                Register
                            </Button>
                            <Button color="inherit" component={Link} to="/login">
                                Login
                            </Button>
                        </>
                    )}
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
