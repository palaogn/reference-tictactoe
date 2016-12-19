#Final Assessment

## Scripts

Outline what script files you created and the purpose of each file. Each file should be commented. This could be

- dockerBuild - builds the project and makes a docker container and pushes the docker image to Docker hub. The image has a tag from the git commit.

- cleanDocker - deletes all docker containers and images.

- runMigrateDb - runs migrate db for production



## Testing & logic

I made UnitTests using a event based approach.



## Data migration

Did you create a data migration.

- Migration up and down



## Jenkins
Each push on master branch on Git triggers a build on Jenkins that builds a docker image and pushes it to docker hub. If the build is successful than Jenkins deploys the image on the AWS machine.



## Other

Anything else you did to improve you deployment pipeline of the project itself?
