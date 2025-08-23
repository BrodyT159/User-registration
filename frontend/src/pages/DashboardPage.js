import React from 'react';
import FileUpload from './FileUpload';
import FileList from './FileList';

function DashboardPage() {
  return (
    <div>
      <FileUpload />
      <FileList />
    </div>
  );
}

export default DashboardPage;