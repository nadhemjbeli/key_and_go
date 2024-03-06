import React, { useState } from 'react';
import {
    Container,
    Typography,
    TextField,
    Button,
    Card,
    CardContent,
    Grid,
    Alert,
    Snackbar, Divider,
} from '@mui/material';
import {Link} from 'react-router-dom'
import { Google as GoogleIcon, Facebook as FacebookIcon } from '@mui/icons-material';
import axios from "axios";
import "./login.css"
import NavigationBar from "../Pages/Client/pageVitrine/NavigationBar";
import {BASE_URL} from "../../config";
import AppsAuth from "../Pages/Client/pageVitrine/AppsAuth";

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validate form inputs
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            setOpenSnackbar(true);
            return;
        }

        if (formData.password.length < 6) {
            setError('Password should be at least 6 characters long');
            setOpenSnackbar(true);
            return;
        }

        // Handle form submission logic here
        try {
            const response = await axios.post('http://localhost:5000/register', {
                fullname: formData.fullname,
                email: formData.email,
                password: formData.password,
            },
                {withCredentials: true}).then(response=>{
                console.log(response.data)
                if(response.data ==="already exists"){
                    setError('This email was already registered');
                    setOpenSnackbar(true);
                }
                else{
                    setSuccessMessage('Registration successful!');
                    setError("")
                    setFormData({
                        fullname: '',
                        email: '',
                        password: '',
                        confirmPassword: '',
                    })
                    setOpenSnackbar(true);
                }
            });

            // Handle successful response (e.g., redirect, show success message)
            console.log('Registration successful:', response.data);
        } catch (error) {
            // Handle error response (e.g., display error message)
            console.error('Registration error:', error.message);
        }
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    return (
        <>
            <NavigationBar/>
            <Container maxWidth="sm">
                <Card>
                    <CardContent>
                        <Typography variant="h5" gutterBottom>
                            Registration
                        </Typography>
                        {/*{error && <Alert severity="error">{error}</Alert>}*/}
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Name"
                                        name="fullname"
                                        value={formData.fullname}
                                        onChange={handleInputChange}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Password"
                                        name="password"
                                        type="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Confirm Password"
                                        name="confirmPassword"
                                        type="password"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Button variant="contained" type="submit" fullWidth>
                                        Registrer
                                    </Button>
                                </Grid>
                                {/*<Grid item xs={12}>*/}
                                {/*    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>*/}
                                {/*        <Divider style={{ width: "20%", height: 2, backgroundColor: 'black' }} />*/}
                                {/*        <Typography variant="body1" style={{ margin: '0 10px', fontWeight: 'bold' }}>OU</Typography>*/}
                                {/*        <Divider style={{ width: "20%", height: 2, backgroundColor: 'black' }} />*/}
                                {/*    </div>*/}
                                {/*</Grid>*/}
                                {/*<Grid item xs={12}>*/}
                                {/*    <Button*/}
                                {/*        component={Link}*/}
                                {/*        to={BASE_URL+"/auth/google"}*/}
                                {/*        variant="contained"*/}
                                {/*        color="error"*/}
                                {/*        startIcon={<GoogleIcon />}*/}
                                {/*        fullWidth*/}
                                {/*        // onClick={handleGoogleLogin}*/}
                                {/*    >*/}
                                {/*        Continuer avec Google*/}
                                {/*    </Button>*/}
                                {/*</Grid>*/}
                                {/*<Grid item xs={12}>*/}
                                {/*    <Button*/}
                                {/*        component={Link}*/}
                                {/*        to={BASE_URL+"/auth/facebook"}*/}
                                {/*        variant="contained"*/}
                                {/*        color="primary"*/}
                                {/*        startIcon={<FacebookIcon />}*/}
                                {/*        fullWidth*/}
                                {/*    >*/}
                                {/*        Continuer avec Facebook*/}
                                {/*    </Button>*/}
                                {/*</Grid>*/}
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
                        {error || successMessage}
                    </Alert>
                </Snackbar>

            </Container>
        </>
    );
};

export default RegistrationForm;
