import React, { useEffect, useState } from 'react';
import JobCard from './JobCard';
import { CircularProgress, Typography, Box, MenuItem, Chip, Fade, Stack, InputAdornment, Paper, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import axios from 'axios';

const EMPLOYMENT_TYPES = [
  { value: '', label: 'All Types' },
  { value: 'full_time', label: 'Full Time' },
  { value: 'part_time', label: 'Part Time' },
  { value: 'contract', label: 'Contract' },
  { value: 'internship', label: 'Internship' },
  { value: 'temporary', label: 'Temporary' },
  { value: 'remote', label: 'Remote' },
  { value: 'other', label: 'Other' },
];

function JobList() {
  const [jobs, setJobs] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [type, setType] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  // Pagination state
  const [page, setPage] = useState(1);
  const jobsPerPage = 8;

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/jobs/?is_active=true&ordering=-posted_at')
      .then(res => {
        setJobs(res.data);
        setLoading(false);
        // Collect unique categories
        const cats = Array.from(new Set(res.data.map(j => j.category).filter(Boolean)));
        setCategories(cats);
      })
      .catch(() => {
        setError('Failed to load jobs.');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let filteredJobs = jobs;
    if (type) filteredJobs = filteredJobs.filter(j => j.employment_type === type);
    if (selectedCategory) filteredJobs = filteredJobs.filter(j => j.category === selectedCategory);
    if (search) {
      const s = search.toLowerCase();
      filteredJobs = filteredJobs.filter(j =>
        j.title.toLowerCase().includes(s) ||
        j.company.toLowerCase().includes(s) ||
        j.location.toLowerCase().includes(s) ||
        (j.description && j.description.toLowerCase().includes(s))
      );
    }
    setFiltered(filteredJobs);
    setPage(1); // Reset to first page on filter/search change
  }, [jobs, type, selectedCategory, search]);

  if (loading) return <CircularProgress sx={{ mt: 4 }} />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ width: '100%', maxWidth: 1300, mx: 'auto' }}>
      <Paper elevation={3} sx={{ p: 2, mb: 3, borderRadius: 3, display: 'flex', alignItems: 'center', gap: 2, bgcolor: '#f8fafc' }}>
        <InputAdornment position="start">
          <SearchIcon color="primary" sx={{ fontSize: 28 }} />
        </InputAdornment>
        <input
          type="text"
          placeholder="Search jobs, companies, locations..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            border: 'none',
            outline: 'none',
            background: 'transparent',
            fontSize: 18,
            flex: 1,
            padding: 8,
          }}
        />
        <IconButton color="primary" sx={{ ml: 1 }}>
          <TuneIcon />
        </IconButton>
        <select
          value={type}
          onChange={e => setType(e.target.value)}
          style={{ minWidth: 120, borderRadius: 8, padding: 6, border: '1px solid #ddd', background: '#fff', fontSize: 16 }}
        >
          {EMPLOYMENT_TYPES.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <Box>
          {categories.map(cat => (
            <Chip
              key={cat}
              label={cat}
              color={selectedCategory === cat ? 'secondary' : 'default'}
              onClick={() => setSelectedCategory(selectedCategory === cat ? '' : cat)}
              sx={{ mr: 1, fontWeight: 600, cursor: 'pointer' }}
              clickable
            />
          ))}
        </Box>
      </Paper>
      {filtered.length === 0 ? (
        <Typography>No jobs found.</Typography>
      ) : (
        <>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: '1fr 1fr',
                md: '1fr 1fr 1fr',
                lg: '1fr 1fr 1fr 1fr'
              },
              gap: 3,
              width: '100%',
              mt: 2,
              justifyContent: 'center',
            }}
          >
            {filtered.slice((page-1)*jobsPerPage, page*jobsPerPage).map(job => (
              <Fade in key={job.id} timeout={500}>
                <div style={{ height: '100%' }}>
                  <JobCard job={job} />
                </div>
              </Fade>
            ))}
          </Box>
          {/* Pagination controls */}
          {filtered.length > jobsPerPage && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                style={{ marginRight: 16, padding: '8px 16px', borderRadius: 6, border: '1px solid #ccc', background: page === 1 ? '#eee' : '#fff', cursor: page === 1 ? 'not-allowed' : 'pointer' }}
              >
                Previous
              </button>
              <span style={{ fontWeight: 600, fontSize: 18, margin: '0 12px' }}>
                Page {page} of {Math.ceil(filtered.length / jobsPerPage)}
              </span>
              <button
                onClick={() => setPage(page + 1)}
                disabled={page === Math.ceil(filtered.length / jobsPerPage)}
                style={{ marginLeft: 16, padding: '8px 16px', borderRadius: 6, border: '1px solid #ccc', background: page === Math.ceil(filtered.length / jobsPerPage) ? '#eee' : '#fff', cursor: page === Math.ceil(filtered.length / jobsPerPage) ? 'not-allowed' : 'pointer' }}
              >
                Next
              </button>
            </Box>
          )}
        </>
      )}
      </Box>
    </Box>
  );
}
export default JobList;

