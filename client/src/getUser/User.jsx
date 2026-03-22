import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./User.css";
import axios from "axios";
import {Link} from "react-router-dom";
import { toast } from 'react-toastify';

const User = () => {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [showEditForm, setShowEditForm] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/users");
                setUsers(response.data);
            } catch (error) {
                console.log("Error while fetching Data", error);
            }
        };
        fetchData();
    }, []);

    const handleEdit = (user) => {
        setEditingUser(user);
        setShowEditForm(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await axios.delete(`http://localhost:8000/api/delete/user/${id}`);
                setUsers(users.filter(user => user._id !== id));
                toast.success('User deleted successfully');
            } catch (error) {
                console.error('Error deleting user:', error);
                toast.error('Failed to delete user');
            }
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:8000/api/update/user/${editingUser._id}`, editingUser);
            setUsers(users.map(user => user._id === editingUser._id ? response.data : user));
            setShowEditForm(false);
            setEditingUser(null);
            toast.success('User updated successfully');
        } catch (error) {
            console.error('Error updating user:', error);
            toast.error('Failed to update user');
        }
    };

    const handleEditChange = (e) => {
        setEditingUser({ ...editingUser, [e.target.name]: e.target.value });
    };


    return (
        <div className="UserTable">
            <Link  to="/add" type="button" className="btn btn-primary">
                Add user <i className="fa-solid fa-user-plus"></i>
            </Link>

            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {users.map((user, index) => {
                        return (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.address}</td>

                                <td className="actionButtons">
                                    <button type="button" className="btn btn-info" onClick={() => handleEdit(user)}>
                                        <i className="fa-solid fa-pen-to-square"></i>
                                    </button>

                                    <button type="button" className="btn btn-danger" onClick={() => handleDelete(user._id)}>
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                </td>
                            </tr>

                        )
                    })}

                </tbody>
            </table>

            {showEditForm && (
                <div className="edit-form">
                    <h3>Edit User</h3>
                    <form onSubmit={handleUpdate}>
                        <div className="form-group">
                            <label>Name:</label>
                            <input
                                type="text"
                                name="name"
                                value={editingUser.name}
                                onChange={handleEditChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Email:</label>
                            <input
                                type="email"
                                name="email"
                                value={editingUser.email}
                                onChange={handleEditChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Address:</label>
                            <textarea
                                name="address"
                                value={editingUser.address}
                                onChange={handleEditChange}
                                required
                            ></textarea>
                        </div>
                        <button type="submit" className="btn btn-success">Update</button>
                        <button type="button" className="btn btn-secondary" onClick={() => setShowEditForm(false)}>Cancel</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default User;