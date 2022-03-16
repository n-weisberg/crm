docker build -t server . 
docker run -d -p 8080:3000 server:latest

docker build -t frontend .
docker run -d -p 4200:80 frontend:latest