# CredyJobs MVP Blueprint

## Purpose
A simple, professional job board and blog platform. Admin posts jobs/blogs; users browse and apply (redirected to external recruiter sites).

## Core Features
- Public job listings with “Apply” (external link)
- Public blog page
- Admin-only job/blog posting (via Django admin)

## User Roles
- Admin: manage jobs/blogs
- Visitor: browse jobs/blogs, apply via external links

## Initial Folder Structure

```
/backend/
  ├── credyjobs/         # Django project root
  ├── jobs/              # Django app for jobs
  ├── blog/              # Django app for blogs
  └── requirements.txt

/frontend/
  ├── src/
  │   ├── components/
  │   │   ├── JobList.jsx
  │   │   ├── JobCard.jsx
  │   │   ├── BlogList.jsx
  │   │   ├── BlogCard.jsx
  │   │   └── Navbar.jsx
  │   ├── pages/
  │   │   ├── Home.jsx
  │   │   ├── Blog.jsx
  │   │   ├── BlogDetail.jsx
  │   │   └── About.jsx
  │   ├── App.jsx
  │   └── index.js
  └── package.json
```

## MVP Milestone To-Do List

- [ ] Document MVP blueprint and structural overview
- [ ] Define initial backend folder structure and setup
- [ ] Define initial frontend folder structure and setup
- [ ] Write detailed technical requirements and models
- [ ] Set up backend Django project and core apps
- [ ] Set up frontend React project and base components
- [ ] Implement job listing API and admin management
- [ ] Implement blog API and admin management
- [ ] Build job listing and job detail pages (frontend)
- [ ] Build blog list and blog detail pages (frontend)
- [ ] Set up deployment and CI/CD basics

## Documentation
- This README (project overview, structure, and milestones)
- `/backend/README.md` (backend-specific setup and API docs)
- `/frontend/README.md` (frontend-specific setup and component docs)
