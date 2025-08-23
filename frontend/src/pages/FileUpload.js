import React, { useState } from 'react';
import FileList from './FileList';

function FileUpload() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert('Please select a file first!');
      return;
    }
    const formData = new FormData();
    formData.append('file', file);

    const token = localStorage.getItem('jwt_token');

    try {
      const response = await fetch('https://user-registration-1-vx30.onrender.com/api/files/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        alert('File uploaded successfully!');
      } else {
        alert('Upload failed!');
      }
    } catch (error) {
      alert('An error occurred during upload.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Upload a File</h1>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>

      <hr /> 

      <FileList /> {/* <-- 2. ADD IT HERE */}
    </div>
  );
}

export default FileUpload;