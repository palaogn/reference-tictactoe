#Final Assessment

## Scripts

- dockerBuild - builds the project and makes a docker container and pushes the docker image to Docker hub. The image has a tag from the git commit.

- cleanDocker - deletes all docker containers and images.

- runMigrateDb - runs migrate db for production


## Testing & logic

I made UnitTests using a event based approach.


## Jenkins

### Deployment pipeline
Each push on master branch on Git triggers a build on Jenkins that builds a docker image and pushes it to docker hub. If the build is successful than Jenkins deploys the image on the AWS machine. Additionally I schedule a build once a week.
