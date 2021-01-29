### apt
```
sudo -v
sudo cp /etc/apt/sources.list /etc/apt/sources.list.bak 
echo -e "
deb http://mirrors.aliyun.com/ubuntu/ bionic main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ bionic-security main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ bionic-updates main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ bionic-proposed main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ bionic-backports main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-security main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-updates main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-proposed main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ bionic-backports main restricted universe multiverse
" | sudo tee /etc/apt/sources.list
sudo apt update
```

### docker
```
sudo -v
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
sudo apt install docker-ce -y
sudo service docker start 
sudo usermod -aG docker ${USER}
sudo service docker restart

sudo mkdir -p /etc/docker/ ; sudo touch /etc/docker/daemon.json
echo '{"registry-mirrors": ["https://docker.mirrors.ustc.edu.cn"]}' | sudo tee /etc/docker/daemon.json
```

### node
```
sudo -v
curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt install -y nodejs

echo -e "
echo deb https://mirrors.tuna.tsinghua.edu.cn/nodesource/deb_14.x focal main 
echo deb-src https://mirrors.tuna.tsinghua.edu.cn/nodesource/deb_14.x focal main 
"| tee /etc/apt/sources.list.d/nodesource.list
```

### scala
```
sudo apt-get install openjdk-8-jdk -y
sudo apt install scala -y
```

### ~~ruby~~
```
sudo add-apt-repository ppa:brightbox/ruby-ng
sudo apt-get update
sudo apt-get purge --auto-remove ruby
sudo apt-get install ruby2.7 ruby2.7-dev
```

### pip
```
# change source
mkdir ~/.pip
echo -e " 
[global]
index-url = https://mirrors.aliyun.com/pypi/simple
" > ~/.pip/pip.conf
```

### vim
```
echo -e "
set ts=4
set expandtab
set autoindent
" >> ~/.vimrc
```

#### tmux
```
echo -e "
set -g mode-mouse on
set -g mouse-resize-pane on
set -g mouse-select-pane on
set -g mouse-select-window on
" >> ~/.tmux
```

#### supervisor
```
sudo apt install supervisor 
echo -e "
[Unit]
Description=Process Monitoring and Control Daemon
After=rc-local.service nss-user-lookup.target

[Service]
Type=forking
ExecStart=/usr/bin/supervisord -c /etc/supervisor/supervisord.conf

[Install]
WantedBy=multi-user.target
" | tee /usr/lib/systemd/system/supervisord.service

sudo systemctl enable supervisord
sudo systemctl is-enabled supervisord
```
