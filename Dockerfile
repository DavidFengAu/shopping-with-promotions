FROM node:14-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn --frozen-lockfile

# Bundle app source
COPY src ./src
COPY tsconfig.json ./
RUN yarn build
RUN npm prune --production

EXPOSE 8000
CMD ["node", "dist/app.js" ]
