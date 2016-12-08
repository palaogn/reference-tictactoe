FROM node
MAINTAINER Pala Ogn <pala15@ru.is>

# Work directory will be called code
WORKDIR /code

# Copies everything from build directory (we are located there) to here
COPY . .

# Installs node modules and exports Node_path to here
RUN npm install --silent
EXPOSE 3000
ENV NODE_PATH .

# Runs a script that migrates the database
CMD ["./bin/runMigratedb.sh"]
