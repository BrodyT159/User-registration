import React, { useState, useEffect } from 'react';

function FileList() {
  const [files, setFiles] = useState([]);

  const fetchFiles = async () => {
    const token = localStorage.getItem('jwt_token');
    try {
      const response = await fetch('https://user-registration-1-vx30.onrender.com/api/files', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setFiles(data);
      } else {
        console.error('Failed to fetch files');
      }
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleDownload = (fileId, fileName) => {
    const token = localStorage.getItem('jwt_token');
    fetch(`https://user-registration-1-vx30.onrender.com/api/files/${fileId}`, {
      headers: { 'Authorization': `Bearer ${token}` },
    })
    .then(response => response.blob())
    .then(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
    });
  };

  const handleDelete = async (fileId) => {
    if (!window.confirm('Are you sure you want to delete this file?')) {
      return;
    }
    const token = localStorage.getItem('jwt_token');
    try {
      const response = await fetch(`https://user-registration-1-vx30.onrender.com/api/files/${fileId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (response.ok) {
        alert('File deleted successfully!');
        fetchFiles(); // Refresh the file list
      } else {
        alert('Failed to delete file.');
      }
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  return (
    <div className="file-list-container">
      <h2>Your Files</h2>
      <ul className="file-list">
        {files.length > 0 ? files.map(file => (
          <li className="file-item" key={file.id}>
            <div className="file-info">
              <span className="file-name">{file.fileName}</span>
              <span className="file-size">{(file.size / 1024).toFixed(2)} KB</span>
            </div>
            <div className="file-actions">
              <button onClick={() => handleDownload(file.id, file.fileName)}>Download</button>
              <button className="delete-button" onClick={() => handleDelete(file.id)}>Delete</button>
            </div>
          </li>
        )) : <p>You have no files uploaded.</p>}
      </ul>
    </div>
  );
}

export default FileList;