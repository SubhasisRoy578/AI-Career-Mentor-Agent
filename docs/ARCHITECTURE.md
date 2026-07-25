# Architecture Notes

The system is intentionally split into deployable frontend and backend apps. The backend remains stateless and uses PostgreSQL for durable data, which keeps it suitable for Render's limited local storage. AI integrations should be added later behind service interfaces in the `ai` module.
