
ssh -i "palaogn-key-pair-eufrank.pem" ec2-user@ec2-35-156-213-42.eu-central-1.compute.amazonaws.com "ls"

# copy files to aws
scp -o StrictHostKeyChecking=no -i "palaogn-key-pair-eufrank.pem" ./../tictactoe-Jenkins/docker-compose.yaml ec2-user@ec2-35-156-213-42.eu-central-1.compute.amazonaws.com:~/docker-compose.yaml
scp -o StrictHostKeyChecking=no -i "palaogn-key-pair-eufrank.pem" ./../tictactoe-Jenkins/.env ec2-user@ec2-35-156-213-42.eu-central-1.compute.amazonaws.com:~/.env


# docker compose up on aws machine
docker-compose up
