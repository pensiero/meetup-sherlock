FROM node:8.9

# Labels
LABEL maintainer="oscar.fanelli@gmail.com"

# Environment variables
ENV PROJECT_PATH=/home/node

# Move NPM configs before the project copy, in order to improve docker cache
COPY package.json $PROJECT_PATH/package.json
COPY yarn.lock $PROJECT_PATH/yarn.lock

# NPM install
RUN yarn install

# Copy site into place
COPY . $PROJECT_PATH