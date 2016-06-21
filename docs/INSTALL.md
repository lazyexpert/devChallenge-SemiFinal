## Dependencies
Vagrant is used in this project.
If you dont have it on your machine - follow the official instructions:
```
https://www.vagrantup.com/docs/installation/
```


## Install:
Cd into project folder. Then:
```
vagrant up
```

## SSH into vagrant:
```
vagrant ssh
```

## Install dependencies:
```
cd /vagrant && npm install
```

## Test app:
```
cd /vagrant && npm test
```

## Start server:
```
cd /vagrant && npm start
```

## Access in browser:
```
http://localhost:3000/
```

## VM shutdown:
Usual case:
```
vagrant destroy -f
```

If any errors occurred, you may shutdown vagrant using script (shutdowns all vm) located in the root folder.
Usage:
```
. ./stop_vms.sh
```
