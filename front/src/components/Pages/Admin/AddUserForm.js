import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Paper } from '@mui/material';
import Sidebar from "./Sidebar";
import Navbar from "../../Navbar";

const AddUserForm = () => {
    const [userData, setUserData] = useState({
        fullname: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic to send userData to backend for adding a new user
        console.log('New User Data:', userData);
    };

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <main style={{ flexGrow: 1 }}>
                {/* Your user management components go here */}
                <Navbar/>
                <Paper variant="outlined" elevation={3} style={{ padding: '20px' }}>
            <Typography variant="h5" gutterBottom>
                Add New User
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="Full Name"
                            name="fullname"
                            value={userData.fullname}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Email"
                            name="email"
                            type="email"
                            value={userData.email}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Password"
                            name="password"
                            type="password"
                            value={userData.password}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" type="submit">
                            Add User
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
            </main>
        </div>
    );
};

export default AddUserForm;
