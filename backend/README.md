# Backend Documentation

## Overview
Django project for CredyJobs MVP. Handles job and blog data, exposes REST APIs, and provides admin management.

## Structure
- credyjobs/ (project root)
- jobs/ (job app)
- blog/ (blog app)

## Setup
1. Create virtual environment
2. Install requirements from requirements.txt
3. Run migrations
4. Create superuser for admin access

## API Endpoints (MVP)
- `/api/jobs/` (GET, POST)
- `/api/blogs/` (GET, POST)

## Models
- Job: title, description, location, company, apply_url, posted_at, is_active
- Blog: title, content, image, posted_at, is_published

## Admin
Use Django admin for job/blog CRUD.
