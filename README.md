### What was asked (from the assignment)

- Use JIRA for project management (Epics, User Stories, Subtasks, Sprints) and provide the JIRA Board URL.
- Create SysML diagrams: Requirements Diagram, Block Definition Diagram (BDD), and Parametric Diagram.
- Backend (Node.js + Express + MongoDB): API-first design; implement CRUD for the chosen real-world features.
- Frontend (React): Build forms for create/update/delete and display data using lists/cards.
- Authentication & Authorization: Use JWT to ensure only authenticated users can perform CRUD.
- GitHub workflow: maintain a stable `main`, use feature branches, meaningful commit messages, and open PRs for review.
- CI/CD: Use GitHub Actions to (optionally) run tests and deploy backend and frontend to AWS EC2; document the workflow in the README.

### What I implemented after cloning the starter repo

- Backend (Node/Express/MongoDB)
  - Added visa domain models: `Application`, `Document`, `Payment`.
  - Implemented controllers and routes for full CRUD and status updates:
    - `applications` CRUD + `PATCH /api/applications/:id/status`.
    - Nested `documents` and `payments` under each application.
  - Reused the existing JWT `protect` middleware to secure all new endpoints.
  - Added a simple health check `GET /api/health` and a sample test `backend/test/app.test.js`.

- Frontend (React)
  - Added pages: `Applications`, `Documents`, `Payments`, and `ApplicationStatus`.
  - Built reusable components: `ApplicationForm`, `ApplicationList`.
  - Updated routing and navbar; axios calls include the JWT from context.

- Version Control (GitHub)
  - Worked on feature branch `feature/visa-backend-frontend` and opened a PR into `main` with conventional commit messages.

- CI/CD and DevOps
  - Added GitHub Actions workflows:
    - `backend-deploy.yml` (deploys backend via SSH/PM2).
    - `frontend-deploy.yml` (builds and uploads React build to EC2).
    - `ci.yml` (runs backend tests on PRs/feature branches).
  - Included `infra/nginx/visa.conf` for serving the frontend and proxying `/api` to the backend.
  - Created `docs/` directory to store SysML diagram sources (to be finalized and exported to PNG for the report).
