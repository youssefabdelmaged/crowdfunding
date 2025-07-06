import { useState, useEffect } from 'react';
import {  useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import api from '../api';
import { ACCESS_TOKEN } from '../constants';  


export default function UpdateProject() {
    const [project, setProject] = useState();
    const navigate = useNavigate();
    const { id } = useParams();
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem(ACCESS_TOKEN);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const response = await api.get(`/api/projects/${id}/`);
                setProject(response.data);
                
            } catch (err) {
                setError('Failed to fetch project details');
            } finally {
                setLoading(false);
            }
        };
        fetchProject();
    }, [id]);


    const handleHome = () => {
        localStorage.clear();
        navigate('/');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProject({ ...project, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(token)
            await api.put(`/api/projects/${project.id}/update/`, project, {
            headers: {Authorization: `Bearer ${token}`}
            });
            setSuccess(true);
            setError(false);
            navigate(`/projects/${project.id}`);
        } catch (err) {
            console.log(err)
            setError(err.response?.data || 'Something went wrong.');
            setSuccess(false);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: 'red' }}>{error}</p>;
    if (!project) return <p>No project found.</p>;

    return(
        <>
            <button onClick={handleHome} className='home-button'> Home </button>
            <div className='create-form'>
                <h1>Update Project</h1>
                <form onSubmit={handleSubmit}>
                    <label>Title</label>
                    <br></br>
                    <input type="text" name="title" placeholder="Title" value={project.title} onChange={handleChange} required />
                    <br></br>
                    <label>Description</label>
                    <br></br>
                    <textarea name="description" placeholder="Description" value={project.description} onChange={handleChange} required />
                    <br></br>
                    <label>Target-Amount</label>
                    <br></br>
                    <input type="number" name="target_amount" placeholder="Target Amount" value={project.target_amount} onChange={handleChange} required />
                    <br></br>
                    <label>Currency</label>
                    <select name="currency" value={project.currency} onChange={handleChange}>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="EGP">EGP</option>
                    </select>
                    <br></br>
                    <label>Start date</label>
                    <input type="date" name="start_date" value={project.start_date} onChange={handleChange} required />
                    <label>End date</label>
                    <input type="date" name="end_date" value={project.end_date} onChange={handleChange} required />
                    <br></br>
                    <button type="submit" >Update Project</button>
                </form>
            </div>
            {error && (
                <div style={{ color: 'red' }}>
                {typeof error === 'string'
                ? error
                : Object.entries(error).map(([key, val]) => (
                <p key={key}>{key}: {Array.isArray(val) ? val.join(', ') : val}</p>
                ))}
                </div>
            )}
            {success && <div style={{ color: 'green' }}>Project updated successfully!</div>}
        </>
    );
}