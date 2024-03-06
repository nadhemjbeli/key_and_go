import React, { useState, useEffect } from 'react';
import { TextField, Button, Grid } from '@mui/material';

const EditUserForm = ({ userData, updateUser }) => {
    const [editedUserData, setEditedUserData] = useState(userData);

    useEffect(() => {
        setEditedUserData(userData);
    }, [userData]);

    const handleInputChange = (e) => {
        setEditedUserData({ ...editedUserData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateUser(editedUserData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        label="Full Name"
                        name="fullname"
                        value={editedUserData.fullname}
                        onChange={handleInputChange}
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        value={editedUserData.email}
                        onChange={handleInputChange}
                        fullWidth
                        required
                    />
                </Grid>
                {/*<Grid item xs={12}>*/}
                {/*    <TextField*/}
                {/*        label="Password"*/}
                {/*        name="password"*/}
                {/*        type="password"*/}
                {/*        value={editedUserData.password}*/}
                {/*        onChange={handleInputChange}*/}
                {/*        fullWidth*/}
                {/*        required*/}
                {/*    />*/}
                {/*</Grid>*/}
                <Grid item xs={12}>
                    <Button variant="contained" type="submit">
                        Update User
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default EditUserForm;
