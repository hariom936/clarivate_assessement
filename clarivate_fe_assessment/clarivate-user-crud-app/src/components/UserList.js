import React, { useEffect, useState } from 'react';
import {
    Container, Typography, TextField, Button,
    Table, TableHead, TableRow, TableCell, TableBody, Box
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getUsers, deleteUser, updateUser } from '../services/api';

export default function UserList() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [editUser, setEditUser] = useState(null);
    const navigate = useNavigate(); // ✅ ADD THIS

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            const res = await getUsers();
            // FIXED: Access correct nested data path
            const fetchedUsers = Array.isArray(res.data.data?.users) ? res.data.data.users : [];
            setUsers(fetchedUsers);
        } catch (err) {
            console.error("Failed to load users:", err);
            setUsers([]);
        }
    };

    const handleDelete = async (id) => {
        await deleteUser(id);
        loadUsers();
    };

    const handleUpdate = async () => {
        const { id, first_name, last_name, email, phone } = editUser;
    
        const payload = {
            first_name,
            last_name,
            email,
            phone
        };
    
        try {
            await updateUser(id, payload);
            setEditUser(null);
            loadUsers();
        } catch (err) {
            console.error("Update failed:", err);
        }
    };
    const handleLogout = () => {
        localStorage.removeItem("isLoggedIn");
        navigate('/login');
    };

    const filteredUsers = users.filter(user =>
        user.first_name?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Container>
             <Box display="flex" justifyContent="space-between" alignItems="center" mt={4}>
                <Typography variant="h5">User List</Typography>
                <Button color="error" variant="outlined" onClick={handleLogout}>
                    Logout
                </Button>
            </Box>
            <TextField
                label="Search"
                fullWidth
                margin="normal"
                value={search}
                onChange={e => setSearch(e.target.value)}
            />
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>First Name</TableCell>
                        <TableCell>Last Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Phone</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredUsers.map(user => (
                        <TableRow key={user.id}>
                            <TableCell>
                                {editUser?.id === user.id ? (
                                    <TextField
                                        value={editUser.first_name}
                                        onChange={e => setEditUser({ ...editUser, first_name: e.target.value })}
                                    />
                                ) : (
                                    user.first_name
                                )}
                            </TableCell>
                            <TableCell>{user.last_name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.phone}</TableCell>
                            <TableCell>
                                {editUser?.id === user.id ? (
                                    <Button onClick={handleUpdate}>Save</Button>
                                ) : (
                                    <Button onClick={() => setEditUser(user)}>Edit</Button>
                                )}
                                <Button color="error" onClick={() => handleDelete(user.id)}>Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Container>
    );
}
