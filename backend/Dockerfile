FROM node:18-alpine

# Installing libvips-dev for sharp Compatibility
RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev nasm bash vips-dev git

# Set environment
ENV NODE_ENV=production

WORKDIR /opt/

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install -g node-gyp
RUN npm config set fetch-retry-maxtimeout 600000 -g && npm install

ENV PATH=/opt/node_modules/.bin:$PATH

WORKDIR /opt/app
COPY . .
RUN chown -R node:node /opt/app
USER node

# Build Strapi admin
RUN ["npm", "run", "build"]

# Expose port and start
EXPOSE 1337
CMD ["npm", "run", "start"]
