# Development
1. Copy .env.development.example to .env.development, change environment variables in order to match your developing environment.
2. Open terminal, to start up the server, type: **npm run start** (or choose your preferred way as described in Feature#1).

# Setup your repository to keep your codebase updated
1. Clone codebase project to `myrepo`
```shell
git clone git@git.digihcs.com:phuonghau/codebase-frontend2021.git myrepo
```
2. Rename the remote repository name from `origin` to `codebase`
```shell
git remote rename origin codebase
```
3. Create your own repo on gitlab, then add url of your recently created repository to remote list
```shell
git remote add origin git@git.digihcs.com:phuonghau/myrepo.git
```
4. Push code from codebase to your own repository (initial step)
```shell
git push origin master
```
5. Everytime you want to update your codebase (assuming you are working on `yourcommitedbranch`)
   1. Commit your code
   2. Fetch updated code from codebase: git fetch codebase master
   3. Checkout updated code: git checkout codebase/master
   4. Merge your code that commited from step `5.1`: git merge origin/`yourcommitedbranch`
   5. Resolve the conflict and commit your changes
   6. Checkout back to your branch at step `5.1`: git checkout `yourcommitedbranch` (origin/`yourcommitedbranch`)
   7. Merge updated and conflict-resolved code at step `5.5`: git merge codebase/master
   8. Push your merged code to your own repository: git push origin `yourcommitedbranch`

# Environment variables
Variables declared in `.env.development` file

- `APP_PORT` (default: `9090`): Define the port to which server binding
- `GRAPHQL_ENDPOINT_URL` (default: `http://localhost:8080/graphqlcodebase`): Define enpoint url of graphql server
- `APP_BASENAME_PATH` (default: `/`): Define prefix of your app. For example, if value set with `/service1`, your app will be accessible at `http://localhost/service1/login`
- `UI3_THEME` (default: `his`): Defines the ui3 theme `his`, `sap` and `fluent`.
# App Routing
There are 3 kinds of routes:
1. Protected routes: Only authenticated users can visit, redirect to `/login` otherwise. Eg: `/dashboard`, `/setting`, `/profile`...
2. Restricted routes: Only un-authenticated users can visit, redirect to `/dashboard` otherwise. Eg: `/login`, `/forgotpassword`
3. Public routes: Routes that all client can visit no matter how their authentication status.

# Docker container build
To build container, you must provide a npm token authenticated to our company private repository
```shell
docker build --build-arg NPM_TOKEN='081e42b4-77ae-49b8-9919-12946474a1d6' --build-arg APP_BASENAME_PATH='/service1' -t docker.acexis.com:5000/codebase-frontend:test .
```
# Run container
To run container, make sure you provide enough environment variables
```shell
docker run --rm -p 8080:80 -e APP_BASENAME_PATH='/service1' docker.acexis.com/codebase-frontend:test
```
