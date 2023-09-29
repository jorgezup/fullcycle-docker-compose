FROM node:20

# Create app directory
WORKDIR /usr/src/app

# Install dockerize
ENV DOCKERIZE_VERSION v0.7.0
RUN apt-get update \
    && apt-get install -y wget \
    && wget -O - https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz | tar xzf - -C /usr/local/bin \
    && apt-get autoremove -yqq --purge wget && rm -rf /var/lib/apt/lists/*

# Copy package.json and package-lock.json
COPY src/package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY ./src .
