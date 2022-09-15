# build environment
FROM node:14.15.0 as buildstage
ARG NPM_TOKEN
ARG APP_BASENAME_PATH
ARG APP_VERSION
WORKDIR /app
RUN echo "Asia/Jakarta" > /etc/timezone
RUN dpkg-reconfigure -f noninteractive tzdata
COPY . .
COPY ./graphql_configs/graphql-endpoint.json ./src/config/graphql/graphql-endpoint.json
RUN sed -i 's/APP_VERSION/'$APP_VERSION'/' ./src/appInfo.json
RUN echo '//registry.npmjs.org/:_authToken='$NPM_TOKEN > .npmrc
RUN npm install
ENV NODE_ENV=production
ENV UI3_THEME=his
RUN CI="" \
  APP_BASENAME_PATH=${APP_BASENAME_PATH} \
  npm run build
RUN rm -rf .npmrc

# production environment
# Since 1.19 we can substitue config variable
FROM nginx:1.19
ARG APP_BASENAME_PATH
ARG APP_VERSION
COPY --from=buildstage /app/dist /usr/share/nginx/html${APP_BASENAME_PATH}
RUN touch /usr/share/nginx/html${APP_BASENAME_PATH}/${APP_VERSION}
RUN ls /usr/share/nginx/html${APP_BASENAME_PATH}
COPY ./nginx /etc/nginx/
RUN sed -i 's/APP_BASENAME_PATH/web-admin/' /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
