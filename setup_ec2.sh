#!/bash
# Script automatic installation for MyMiniCloud on Ubuntu EC2

echo "--- Updating system ---"
sudo apt update && sudo apt upgrade -y

echo "--- Installing Docker & Dependencies ---"
sudo apt install -y ca-certificates curl gnupg lsb-release
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

echo "--- Adding Docker Repo ---"
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

echo "--- Configuring Permissions ---"
sudo usermod -aG docker $USER

echo "--- Checking Installation ---"
docker --version
docker compose version

echo "DONE! Please Logout and Login again (or run 'newgrp docker') to apply changes."
