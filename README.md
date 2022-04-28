# Running three types of tests with GitHub Actions
* Newman (API-tests)
* WDIO (Browser/GUI-test)
* Jest (unit testing)

Note: backend/database/bookshop.db is git-ignored!

# Steps for "going live":
* Make a pull: 
  git pull
* Delete the bookshop.db file:
  rm backend/database/bookshop-template.db
* Copy db-template to db that shall run:
  cp backend/database/bookshop-template.db backend/database/bookshop.db
* Build the project (the backend will then serve the dist folder):
  npm run build
* Restart the app:
  pm2 restart main-app

Note: We name our app/backend main-app when we run it with pm2.