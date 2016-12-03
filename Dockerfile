FROM node
MAINTAINER Pala Ogn <pala15@ru.is>
WORKDIR /code
COPY . .
RUN npm install --silent
RUN ls
EXPOSE 3000
ENV NODE_PATH .
