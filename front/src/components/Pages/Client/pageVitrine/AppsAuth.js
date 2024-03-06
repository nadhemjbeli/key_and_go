import React from 'react';
import {Button, Divider, Grid, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {BASE_URL} from "../../../../config";
import {Facebook as FacebookIcon, Google as GoogleIcon} from "@mui/icons-material";

const AppsAuth = () => {
    return (
        <>
            <Grid item xs={12}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Divider style={{ width: "20%", height: 2, backgroundColor: 'black' }} />
                    <Typography variant="body1" style={{ margin: '0 10px', fontWeight: 'bold' }}>OU</Typography>
                    <Divider style={{ width: "20%", height: 2, backgroundColor: 'black' }} />
                </div>
            </Grid>
            <Grid item xs={12}>
                <Button
                    component={Link}
                    to={BASE_URL+"/auth/google"}
                    variant="contained"
                    color="error"
                    startIcon={<GoogleIcon />}
                    className="gglButton"
                    fullWidth
                    // onClick={handleGoogleLogin}
                >
                    Continuer avec Google
                </Button>
            </Grid>
            <Grid item xs={12}>
                <Button
                    component={Link}
                    to={BASE_URL+"/auth/facebook"}
                    variant="contained"
                    color="primary"
                    className="fbButton"
                    startIcon={<FacebookIcon />}
                    fullWidth
                >
                    Continuer avec Facebook
                </Button>
            </Grid>
        </>
    );
};

export default AppsAuth;