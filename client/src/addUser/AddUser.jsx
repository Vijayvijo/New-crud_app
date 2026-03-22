import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddUser.css';
import { toast } from 'react-toastify';

const AddUser = () => { 
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: ''
    });
 
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validate = () => {
        let tempErrors = {};
        if (!formData.name.trim()) tempErrors.name = 'Name is required';
        if (!formData.email.trim()) tempErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = 'Email is invalid';
        if (!formData.address.trim()) tempErrors.address = 'Address is required';
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                const response = await fetch('http://localhost:8000/api/user', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                if (response.ok) {
                    const result = await response.json();
                    console.log('User added:', result);
                    setFormData({ name: '', email: '', address: '' });
                    setErrors({});
                    toast.success('User added successfully!');
                } else {
                    const errorData = await response.json();
                    toast.error('Error adding user: ' + errorData.message);
                }
            } catch (error) {
                console.error('Error:', error);
                toast.error('Failed to add user. Please try again.');
            }
        }
    };

    return (
        <div className="add-user-container">
                <button type="button" className="back-btn" onClick={() => navigate('/')}>Back to Main</button>

            <h2>Add New User</h2>
            
            <form onSubmit={handleSubmit} className="add-user-form">
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={errors.name ? 'error' : ''}
                        placeholder="Enter your name"
                    />
                    {errors.name && <span className="error-message">{errors.name}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={errors.email ? 'error' : ''}
                        placeholder="Enter your email"
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className={errors.address ? 'error' : ''}
                        placeholder="Enter your address"
                        rows="4"
                    ></textarea>
                    {errors.address && <span className="error-message">{errors.address}</span>}
                </div>

                <button type="submit" className="submit-btn">Add User</button>
            </form>
        </div>
    );
};

export default AddUser;