import React, {useContext, useState} from 'react';
import { useForm } from 'react-hook-form';
import {
    Container,
    Typography,
    TextField,
    Button,
    Card,
    CardContent,
    Grid, Alert, Snackbar, Divider
} from '@mui/material';
// import "./login.css"
import {Link} from 'react-router-dom'
import { Google as GoogleIcon, Facebook as FacebookIcon } from '@mui/icons-material';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import {BASE_URL} from "../../config";
import NavigationBar from "../Pages/Client/pageVitrine/NavigationBar";
import AppsAuth from "../Pages/Client/pageVitrine/AppsAuth"; // Import Axios for HTTP requests

const LoginForm = () => {
    const [error, setError] = useState('');

    const { loggedIn, setLoggedIn } = useContext(AuthContext);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate()

    const [openSnackbar, setOpenSnackbar] = useState(false);

    const onSubmit = async (data) => {
        try {
            // Make an HTTP POST request to your login endpoint (replace 'http://localhost:5000/login' with your endpoint)
            const response = await axios.post('http://localhost:5000/login', data, { withCredentials: true }).then((response=>{
                console.log(response.data)
                if(response.data === "wrong password!" || response.data === "this account doesn't exist!"){
                    setError(response.data);
                    setOpenSnackbar(true);

                }
                else{
                    // localStorage.clear()
                    // localStorage.setItem("token", response.data.token)
                    setLoggedIn(true)
                    navigate("/main")

                }

            }));

            // Handle success or show a message to the user
            // console.log('Login successful:', response.data);
        } catch (error) {
            // Handle errors or display an error message
            console.error('Login failed:', error.message);
        }
    };
    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };
    const handleGoogleLogin = async () => {
        // Handle Google login logic here
        const response = await axios.get('http://localhost:5000/auth/google').then((response=>{
            console.log(response.data)
        }
        ))
    };

    const handleFacebookLogin = () => {
        // Handle Facebook login logic here
    };
    return (
        <>
            <NavigationBar/>
            <Container maxWidth="sm">
                <Card>
                    <CardContent>
                        <Typography variant="h5" gutterBottom>
                            Se Connecter
                        </Typography>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Email"
                                        type="email"
                                        {...register('email', { required: true })}
                                        fullWidth
                                    />
                                    {errors.email && <span>Email is required</span>}
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Password"
                                        type="password"
                                        {...register('password', { required: true })}
                                        fullWidth
                                    />
                                    {errors.password && <span>Mot de passe est requit</span>}
                                </Grid>
                                <Grid item xs={12}>
                                    <Button variant="contained" color="info" type="submit" fullWidth>
                                        Connecter
                                    </Button>
                                </Grid>
                                <AppsAuth />
                            </Grid>
                        </form>
                    </CardContent>
                </Card>
                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={6000}
                    onClose={handleCloseSnackbar}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                >
                    <Alert
                        onClose={handleCloseSnackbar}
                        severity={error ? 'error' : 'success'} // Set severity based on error
                    >
                        {error}
                    </Alert>
                </Snackbar>
            </Container>
        </>
    );
};

export default LoginForm;