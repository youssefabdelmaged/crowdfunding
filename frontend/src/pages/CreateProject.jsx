import { useState } from 'react';
import axios from 'axios';

const CreateProject = () => {
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
      await axios.post('/api/projects/', formData);
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
    } catch (err) {
      setError(err.response.data);
      setSuccess(false);
    }
  };

  return (
    <div>
      <h1>Create Project</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
        <input type="number" name="target_amount" placeholder="Target Amount" value={formData.target_amount} onChange={handleChange} required />
        <select name="currency" value={formData.currency} onChange={handleChange}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="EGP">EGP</option>
        </select>
        <input type="date" name="start_date" value={formData.start_date} onChange={handleChange} required />
        <input type="date" name="end_date" value={formData.end_date} onChange={handleChange} required />
        <button type="submit">Create Project</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>Project created successfully!</p>}
    </div>
  );
}

export default CreateProject;
