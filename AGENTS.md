# Project Instructions

## Automatic Sites Deployment

- Treat every completed code change in this project as intended for production deployment unless the user explicitly requests a local-only change.
- Before publishing, run the production build and any relevant automated tests.
- Never publish when the build or required tests fail.
- After successful validation, publish the exact validated source state to the Sites project configured in `.openai/hosting.json`.
- Wait for the Sites deployment to reach a terminal state and verify that it succeeded before reporting completion.
- Keep the existing Sites access policy unchanged unless the user explicitly requests an access change.
- Report the production URL after a successful deployment. If deployment fails, report the user-visible cause without claiming that the update is live.
