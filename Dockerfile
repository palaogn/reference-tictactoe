FROM node
MAINTAINER Pala Ogn <pala15@ru.is>
WORKDIR /code
COPY /build .
RUN npm install --silent
RUN npm install -g create-react-app --silent
RUN npm install -g nodemon --silent
RUN ls
EXPOSE 3000
ENV NODE_PATH .
CMD ["node", "run.js"]
CMD ["./runMigratedb.sh"]
