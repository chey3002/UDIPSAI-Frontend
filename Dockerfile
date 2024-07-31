FROM node:latest
WORKDIR /app
COPY package.json /app
RUN yarn
COPY . .
RUN yarn build
CMD ["yarn", "start"]