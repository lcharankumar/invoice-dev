FROM node:16-alpine 

# Declaring env
ENV NODE_ENV development

# Setting up the work directory
WORKDIR /react-app

# Installing dependencies
COPY ./package.json /react-app

RUN npm install

# Copying all the files in our project
COPY . .

EXPOSE 3000

CMD ["npm","start"]

