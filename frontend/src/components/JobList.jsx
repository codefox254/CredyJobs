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
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
      <Box sx={{ width: '100%', maxWidth: 1300, mx: 'auto' }}>
        {/* Modern Search Bar */}
        <Paper elevation={6} sx={{
          p: 1.5,
          mb: 3,
          borderRadius: 999,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          bgcolor: '#fff',
          boxShadow: '0 4px 24px 0 rgba(30,185,84,0.10)',
          border: '2px solid #1db954',
          position: 'relative',
          minHeight: 56,
          maxWidth: 600,
          mx: 'auto',
        }}>
          <InputAdornment position="start">
            <SearchIcon sx={{ fontSize: 28, color: '#1db954', filter: 'drop-shadow(0 2px 8px #1db95433)' }} />
          </InputAdornment>
          <input
            type="text"
            placeholder="Find your dream job..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              border: 'none',
              outline: 'none',
              background: 'transparent',
              fontSize: 20,
              flex: 1,
              padding: '8px 0',
              color: '#222',
              fontWeight: 600,
              letterSpacing: 0.5,
              borderRadius: 999,
              transition: 'box-shadow 0.2s',
            }}
          />
        </Paper>
        {/* Futuristic Filter Tab */}
        <Paper elevation={2} sx={{
          p: 2, mb: 3, borderRadius: 4, display: 'flex', alignItems: 'center', gap: 2,
          bgcolor: 'linear-gradient(90deg,#ffaf7b 0%,#d76d77 100%)',
          boxShadow: '0 2px 12px 0 rgba(215,109,119,0.12)',
          border: '2px solid #ffaf7b',
          position: 'relative',
        }}>
          <IconButton color="secondary" sx={{ ml: 1, bgcolor: '#fff', boxShadow: '0 2px 8px #ffaf7b', '&:hover': { bgcolor: '#ffe0c1' } }}>
            <TuneIcon sx={{ color: '#d76d77' }} />
          </IconButton>
          <select
            value={type}
            onChange={e => setType(e.target.value)}
            style={{ minWidth: 140, borderRadius: 10, padding: 10, border: '2px solid #fff', background: '#fff', fontSize: 18, fontWeight: 600, color: '#d76d77', marginRight: 16 }}
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
                sx={{ mr: 1, fontWeight: 700, cursor: 'pointer', fontSize: 16, bgcolor: selectedCategory === cat ? '#d76d77' : '#fff', color: selectedCategory === cat ? '#fff' : '#d76d77', border: '1.5px solid #d76d77', boxShadow: selectedCategory === cat ? '0 2px 8px #d76d77' : 'none' }}
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

