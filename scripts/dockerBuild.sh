#!/bin/bash

#if the docker image doesn't have a label, than this sets it's value to the current Head commit
if [ -z "$GIT_COMMIT" ]; then
  export GIT_COMMIT=$(git rev-parse HEAD)
  export GIT_URL=$(git config --get remote.origin.url)
fi

# Remove .git from url in order to get https link to repo (assumes https url for GitHub)
export GITHUB_URL=$(echo $GIT_URL | rev | cut -c 5- | rev)

#Builds the app
echo Building app
npm run build

#Checks if the build failed or not
rc=$?
if [[ $rc != 0 ]] ; then
    echo "Npm build failed with exit code " $rc
    exit $rc
fi

#Create .env file that contains the latest git head
cat > ./.env <<_EOF_
GIT_COMMIT=$GIT_COMMIT
_EOF_

#Copying files to build folder
cp ./Dockerfile ./build/
cp ./package.json ./build/
cp -r ./scripts ./build


#build docker image
cd build
echo Building docker image

docker build -t palaogn/tictactoe:$GIT_COMMIT .

#checks if the docker build failed or not
rc=$?
if [[ $rc != 0 ]] ; then
    echo "Docker build failed " $rc
    exit $rc
fi

#pushes the docker image to dockerhub, check if it failed or nor
docker push palaogn/tictactoe:$GIT_COMMIT
rc=$?
if [[ $rc != 0 ]] ; then
    echo "Docker push failed " $rc
    exit $rc
fi

echo "Done"
