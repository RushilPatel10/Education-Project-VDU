import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="pc-container">
    <div className="pc-content p-6">
      <div className="card">
        <div className="card-body text-center py-12">
          <h1 className="mb-2">404</h1>
          <p className="text-muted mb-4">This page does not exist or you do not have access.</p>
          <Link to="/login" className="btn btn-primary me-2">
            Login
          </Link>
          <Link to="/view-courses" className="btn btn-outline-primary">
            View courses
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default NotFound;
