FROM node:18
ARG APP_DIR=app
RUN mkdir -p ${APP_DIR}
WORKDIR ${APP_DIR}
COPY package*.json ./
RUN npm install --production
VOLUME "~/erc-data"
EXPOSE 8080
CMD [ "npm", "start" ]