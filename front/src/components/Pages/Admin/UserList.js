import React, { useState, useEffect } from 'react';
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Button, DialogContent, DialogTitle, Dialog,
} from '@mui/material';
import Sidebar from "./Sidebar";
import Navbar from "../../Navbar";
import {Link} from "react-router-dom";
import EditUserForm from "./EditUserForm";
import axios from "axios";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const handleEditUser = (user) => {
        setSelectedUser(user);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const updateUser = (updatedUserData) => {
        // Logic to update user data using API
        console.log('Updated user data:', updatedUserData);
        axios.put('http://localhost:5000/admin/user/'+updatedUserData._id, updatedUserData)
        fetchUserData()
        handleClose();
    };
    const fetchUserData=()=>{
        fetch('http://localhost:5000/admin/user/all')
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setUsers(data); // Assuming data is an array of user objects
            })
            .catch((error) => {
                console.error('Error fetching users:', error);
            });
    }
    useEffect(() => {
        // Fetch users from the backend
        // Example using fetch
        fetchUserData()
    }, []);

    const handleDeleteUser = (userId) => {
        // Logic to delete user by userId
        // Example using fetch
        fetch(`http://localhost:5000/admin/user/${userId}`, {
            method: 'DELETE',
        })
            .then((response) => response.json())
            .then((data) => {
                // Update users after deletion
                setUsers(users.filter((user) => user.id !== userId));
            })
            .catch((error) => {
                console.error('Error deleting user:', error);
            });
    };

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <main style={{ flexGrow: 1 }}>
                {/* Your user management components go here */}
                <Navbar/>
                <Button variant="outlined"
                        style={{margin:"10px", float:"right"}}
                        component={Link} to="/adminUser/add" >
                    Add
                </Button>
                <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Full Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user._id}>
                            <TableCell>{user.fullname}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                                <Button onClick={() => handleEditUser(user)}>Edit</Button>
                                <Button
                                    // variant="outlined"
                                    color="error"
                                    onClick={() => handleDeleteUser(user.id)}
                                >
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            </main>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit User</DialogTitle>
                <DialogContent style={{padding:"15px"}}>
                    {selectedUser && (
                        <EditUserForm
                            userData={selectedUser}
                            updateUser={updateUser}
                        />
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default UserList;