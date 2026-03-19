---
description: Auto-push code to GitHub after implementing a feature
---
When you finish implementing a new feature, fixing a bug, or completing a task for the user, you MUST automatically commit and push the code to the repository without waiting for the user to explicitly ask.

1. Ensure the code works and all tests pass.
2. Formulate a concise and descriptive commit message.
// turbo-all
3. Run the following command in PowerShell to push the changes:
```powershell
git add . ; git commit -m "Your descriptive commit message" ; git push
```
