import React, { useState } from 'react';
import axiosClient from '../../utils/axiosClient';

export default function PieChartSingle() {
  const [file, setFile] = useState(null); 

  const handleFileChange = (event) => {
    setFile(event.target.files[0]); 
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); 

    if (!file) {
      alert('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('image', file); // Append the selected file to the FormData object

    try {
      const response = await axiosClient.post('/uploadPPT/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log(response.data);
      alert('File uploaded successfully!');
    } catch (error) {
      console.error('Error:', error);
      alert('Error uploading file.');
    }
  };

  return (
    <div>
      <h1>Upload File</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*" // Restrict file types to images
          onChange={handleFileChange}
        />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}
