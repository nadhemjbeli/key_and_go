import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Grid, Typography, TextField, Button, Paper, Box } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
// import { config } from '../../../../AuthGuard';
import Navbar from "../../../Navbar";

const KeyComments = () => {
    const config = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    };
    const { vehicleKeyId } = useParams();
    const url1 = `http://localhost:5000/admin/key/${vehicleKeyId}`;

    const [comments, setComments] = useState([]);
    const [vehicle, setVehicle] = useState({
        vehicleInfo: {
            make: '',
            model: '',
        },
        images: [],
    });

    const [newComment, setNewComment] = useState('');
    const [commentAdded, setCommentAdded] = useState(false);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/comment/${vehicleKeyId}`);
                setComments(response.data);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        fetchComments();
    }, [vehicleKeyId, commentAdded]);

    useEffect(() => {
        const fetchVehicle = async () => {
            try {
                const response = await axios.get(url1);
                setVehicle(response.data);
            } catch (error) {
                console.error('Error fetching vehicle:', error);
            }
        };

        fetchVehicle();
    }, [url1]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:5000/comment/${vehicleKeyId}`, { text: newComment }, config);
            setCommentAdded(!commentAdded); // Trigger comment reload
            setNewComment(''); // Clear the comment input field
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    return (
        <>
            <Navbar />
            <Box p={2}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h4" gutterBottom>
                                    {vehicle.vehicleInfo.make}
                                </Typography>
                                <Typography variant="h6" gutterBottom>
                                    {vehicle.vehicleInfo.model}
                                </Typography>
                                <Paper elevation={3}>
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
                                        {vehicle.images.map((image, index) => (
                                            <div key={index}>
                                                <img
                                                    src={`http://localhost:5000/${image}`}
                                                    alt={`Vehicle ${index}`}
                                                    style={{ maxWidth: '100%', maxHeight: '300px', objectFit: 'cover' }}
                                                />
                                            </div>
                                        ))}
                                    </Carousel>
                                </Paper>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                <Box mt={4}>
                    <Typography variant="h5" gutterBottom>
                        Commentaires:
                    </Typography>
                    <ul>
                        {comments.map((comment) => (
                            <li key={comment._id}>
                                <Paper elevation={1} style={{ padding: '10px', marginBottom: '10px' }}>
                                    <Typography variant="subtitle1" gutterBottom>
                                        User: {comment.user.fullname}
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        Comment: {comment.text}
                                    </Typography>
                                </Paper>
                            </li>
                        ))}
                    </ul>
                    <form onSubmit={handleCommentSubmit}>
                        <TextField
                            label="Add a comment"
                            variant="outlined"
                            fullWidth
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            style={{ marginBottom: '10px' }}
                        />
                        <Button variant="contained" color="primary" type="submit">
                            Submit
                        </Button>
                    </form>
                </Box>
            </Box>
        </>
    );
};

export default KeyComments;
