import { useState } from 'react';
import api from '../api';
import {  useNavigate } from "react-router-dom";
import { ACCESS_TOKEN } from '../constants';


const CreateProject = () => {

  const token = localStorage.getItem(ACCESS_TOKEN);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    target_amount: '',
    currency: 'EGP',
    start_date: '',
    end_date: ''
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    console.log("Token being sent:", token);
    await api.post('/api/projects/', formData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    setSuccess(true);
    setError(null);
    setFormData({
      title: '',
      description: '',
      target_amount: '',
      currency: 'EGP',
      start_date: '',
      end_date: ''
    });

    navigate('/');
  } catch (err) {
    console.error(err.response?.data || err.message);
    setError(err.response?.data || 'Something went wrong.');
    setSuccess(false);
  }
};



  // const handleHome = () => {
  //   localStorage.clear();
  //   navigate('/');
  // };

  return (
    <>
    {/* <button onClick={handleHome} className='home-button'> Home </button> */}
      <div className='create-form'>
        <h1>Create Project</h1>
        <form onSubmit={handleSubmit}>
          <label>Title</label>
          <br></br>
          <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
          <br></br>
          <label>Description</label>
          <br></br>
          <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
          <br></br>
          <label>Target-Amount</label>
          <br></br>
          <input type="number" name="target_amount" placeholder="Target Amount" value={formData.target_amount} onChange={handleChange} required min="1"/>
          <br></br>
          <label>Currancy</label>
          <select name="currency" value={formData.currency} onChange={handleChange}>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="EGP">EGP</option>
          </select>
          <br></br>
          <label>Start date</label>
          <input type="date" name="start_date" value={formData.start_date} onChange={handleChange} required />
          <label>End date</label>
          <input type="date" name="end_date" value={formData.end_date} onChange={handleChange} required />
          <br></br>
          <button type="submit" >Create Project</button>
        </form>
        {error && (
          <div style={{ color: 'red' }}>
            {typeof error === 'string'
              ? error
              : Object.entries(error).map(([key, val]) => (
                  <p key={key}>{key}: {Array.isArray(val) ? val.join(', ') : val}</p>
                ))}
          </div>
        )}
        {success && <div style={{ color: 'green' }}>Project created successfully!</div>}
      </div>
    </>
  );
}

export default CreateProject;
