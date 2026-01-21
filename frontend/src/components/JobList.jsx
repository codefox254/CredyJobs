import React, { useEffect, useState } from 'react';
import JobCard from './JobCard';
import { CircularProgress, Typography } from '@mui/material';
import axios from 'axios';

function JobList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/api/jobs/')
      .then(res => {
        setJobs(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load jobs.');
        setLoading(false);
      });
  }, []);

  if (loading) return <CircularProgress sx={{ mt: 4 }} />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (jobs.length === 0) return <Typography>No jobs found.</Typography>;

  return (
    <div>
      {jobs.map(job => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}

export default JobList;
