import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import axios from 'axios';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Navbar from "../../Navbar";
import {Link} from "react-router-dom";

const ConsultationKeys = () => {
    const [keys, setKeys] = useState([]);
    const [filteredKeys, setFilteredKeys] = useState([]);
    const [availability, setAvailability] = useState(''); // State for filtering by availability
    const [searchTerm, setSearchTerm] = useState(''); // State for search term

    // Fetch vehicle keys from the API
    const fetchVehicleKeys = async () => {
        try {
            const response = await axios.get('http://localhost:5000/admin/key');
            setKeys(response.data); // Set the fetched keys
            setFilteredKeys(response.data); // Initially set filtered keys to all keys
        } catch (error) {
            console.error('Error fetching vehicle keys:', error);
        }
    };

    // Filter keys based on availability
    useEffect(() => {
        if (availability !== '') {
            const filtered = keys.filter((key) => key.isAvailableForRent === (availability === 'available'));
            setFilteredKeys(filtered);
        } else {
            setFilteredKeys(keys); // Reset filtered keys if the filter is cleared
        }
    }, [availability, keys]);

    // Search keys by make property
    useEffect(() => {
        if (searchTerm !== '') {
            const filtered = keys.filter((key) => key.vehicleInfo.make.toLowerCase().includes(searchTerm.toLowerCase()));
            setFilteredKeys(filtered);
        } else {
            setFilteredKeys(keys); // Reset filtered keys if the search term is cleared
        }
    }, [searchTerm, keys]);

    useEffect(() => {
        fetchVehicleKeys(); // Fetch keys when the component mounts
    }, []);

    return (
        <>
            <Navbar />
            <div style={{ padding: '20px' }}>
                <div style={{ marginBottom: '20px' }}>
                    {/* Filter by availability */}
                    <FormControl style={{ marginRight: '20px', minWidth: '120px' }}>
                        {!availability && <InputLabel>Availability</InputLabel>}
                        <Select value={availability} onChange={(e) => setAvailability(e.target.value)}>
                            <MenuItem value="">All</MenuItem>
                            <MenuItem value="available">Available</MenuItem>
                            <MenuItem value="unavailable">Unavailable</MenuItem>
                        </Select>
                    </FormControl>

                    {/* Search by make property */}
                    <TextField
                        label="Search by Make"
                        variant="outlined"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <Grid container spacing={2}>
                    {filteredKeys.map((key) => (
                        <Grid item xs={12} sm={6} md={4} key={key._id}>
                            <Card style={{ height: '100%' }}>
                                <CardContent>
                                    <Grid className="header" component={Link}
                                          style={{
                                              textDecoration:"none",

                                          }}
                                          to={`/vehicle-key-comments/${key._id}`}>
                                        <Typography variant="h6" style={{ marginBottom: '10px', fontWeight:"bolder" }}>{key.vehicleInfo.make}</Typography>
                                    </Grid>
                                    <Carousel
                                        showThumbs={true}
                                        infiniteLoop={true}
                                        swipeable={true}
                                        emulateTouch={true}
                                        showStatus={false}
                                        autoPlay={false}
                                        interval={3000}
                                        stopOnHover={true}
                                    >
                                        {key.images.map((image, index) => (
                                            <div key={index} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                <img
                                                    src={`http://localhost:5000/${image}`}
                                                    alt={`Vehicle ${index}`}
                                                    style={{ maxWidth: '100%', maxHeight: '250px', width: 'auto', height: 'auto' }}
                                                />
                                            </div>
                                        ))}
                                    </Carousel>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </div>
        </>
    );
};

export default ConsultationKeys;
