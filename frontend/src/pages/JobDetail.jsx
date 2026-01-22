import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import JobDetailCard from '../components/JobDetailCard';
import { CircularProgress, Typography } from '@mui/material';
import axios from 'axios';

function JobDetail() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

    useEffect(() => {
      axios.get(`/api/jobs/${id}/`)
      .then(res => {
        setJob(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Job not found.');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <CircularProgress sx={{ mt: 4 }} />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!job) return null;

  return <JobDetailCard job={job} />;
}

export default JobDetail;
