#!/usr/bin/env bash
# Update packages
printf "Starting package list update ... "
sudo apt-get update &> /dev/null
printf "Done\n"


# Git
if [ $(dpkg-query -W -f='${Status}' git 2>/dev/null | grep -c "ok installed") -eq 0 ];
then
  printf "Installing git"
  sudo apt-get install -y git &> /dev/null
fi

# Build tools
if [ $(dpkg-query -W -f='${Status}' build-essential 2>/dev/null | grep -c "ok installed") -eq 0 ];
then
  printf "Installing build-esential"
  sudo apt-get install -y build-essential &> /dev/null
fi

# Curl
if [ $(dpkg-query -W -f='${Status}' curl 2>/dev/null | grep -c "ok installed") -eq 0 ];
then
  printf "Installing curl"
  sudo apt-get install -y curl &> /dev/null
fi

# Node.js v 5.x
if [ $(dpkg-query -W -f='${Status}' nodejs 2>/dev/null | grep -c "ok installed") -eq 0 ];
then
  printf "Installing node.js & npm & mocha -g & gulp -g"
  curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash - &> /dev/null
  sudo apt-get install -y nodejs &> /dev/null
  sudo npm install -g mocha &> /dev/null
  sudo npm install -g gulp &> /dev/null
fi


# Mongo
if [ $(dpkg-query -W -f='${Status}' mongodb-org 2>/dev/null | grep -c "ok installed") -eq 0 ];
then
  printf "Installing mongo"
  sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10 &> /dev/null
  echo "deb http://repo.mongodb.org/apt/ubuntu "$(lsb_release -sc)"/mongodb-org/3.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.0.list &> /dev/null
  sudo apt-get update &> /dev/null
  sudo apt-get install -y mongodb-org &> /dev/null
  service mongod status &> /dev/null
fi

printf "You may now ssh into your vagrant machine using: \"vagrant ssh\"\n"
