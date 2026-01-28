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

## Python 3.14, spaCy, and Pydantic Compatibility
If you encounter errors related to Pydantic v1 and spaCy when running on Python 3.14 (such as `unable to infer type for attribute "REGEX"`), this is due to incompatibility between spaCy's use of Pydantic v1 and Python 3.14.

### Solution
- All spaCy imports and model loading have been moved inside functions (lazy import) instead of at the module level.
- This prevents initialization errors and allows the project to run on Python 3.14.

See `nlp_utils.py` and `scrapy_crawlers/nlp_extractor.py` for examples of lazy imports.
