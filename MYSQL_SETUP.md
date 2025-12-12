# MySQL Installation and Setup Guide

## For Ubuntu/Debian

### 1. Update package index
```bash
sudo apt update
```

### 2. Install MySQL Server
```bash
sudo apt install mysql-server -y
```

### 3. Start MySQL service
```bash
sudo systemctl start mysql
sudo systemctl enable mysql
```

### 4. Check MySQL status
```bash
sudo systemctl status mysql
```

### 5. Secure MySQL installation (Recommended)
```bash
sudo mysql_secure_installation
```

Follow the prompts:
- Set root password: **yes** (choose a strong password)
- Remove anonymous users: **yes**
- Disallow root login remotely: **yes**
- Remove test database: **yes**
- Reload privilege tables: **yes**

### 6. Login to MySQL
```bash
sudo mysql -u root -p
```

### 7. Create database and user for the application

Once logged in to MySQL, run these commands:

```sql
-- Create the database
CREATE DATABASE node_webapp;

-- Create a new user (replace 'your_password' with a secure password)
CREATE USER 'webapp_user'@'localhost' IDENTIFIED BY 'your_password';

-- Grant all privileges on the database to the user
GRANT ALL PRIVILEGES ON node_webapp.* TO 'webapp_user'@'localhost';

-- Flush privileges
FLUSH PRIVILEGES;

-- Exit MySQL
EXIT;
```

### 8. Update your backend .env file

Edit `/home/sangle/Documents/node_webapp/backend/.env`:

```env
DATABASE_URL="mysql://webapp_user:your_password@localhost:3306/node_webapp"
```

Replace `your_password` with the password you set for `webapp_user`.

---

## For Fedora/RHEL/CentOS

### 1. Install MySQL Server
```bash
sudo dnf install mysql-server -y
```

### 2. Start and enable MySQL
```bash
sudo systemctl start mysqld
sudo systemctl enable mysqld
```

### 3. Secure installation
```bash
sudo mysql_secure_installation
```

### 4. Follow steps 6-8 from Ubuntu instructions above

---

## For Arch Linux

### 1. Install MySQL (MariaDB)
```bash
sudo pacman -S mysql
```

### 2. Initialize MySQL
```bash
sudo mysql_install_db --user=mysql --basedir=/usr --datadir=/var/lib/mysql
```

### 3. Start MySQL service
```bash
sudo systemctl start mysqld
sudo systemctl enable mysqld
```

### 4. Secure installation
```bash
sudo mysql_secure_installation
```

### 5. Follow steps 6-8 from Ubuntu instructions above

---

## Alternative: Using Docker (Easiest for Development)

If you have Docker installed, you can run MySQL in a container:

### 1. Pull and run MySQL container
```bash
docker run --name mysql-webapp \
  -e MYSQL_ROOT_PASSWORD=root \
  -e MYSQL_DATABASE=node_webapp \
  -e MYSQL_USER=webapp_user \
  -e MYSQL_PASSWORD=webapp123 \
  -p 3306:3306 \
  -d mysql:8.0
```

### 2. Update backend .env file
```env
DATABASE_URL="mysql://webapp_user:webapp123@localhost:3306/node_webapp"
```

### 3. Start/Stop Docker container
```bash
# Stop
docker stop mysql-webapp

# Start
docker start mysql-webapp

# Remove
docker rm -f mysql-webapp
```

---

## Verify Installation

### 1. Check if MySQL is running
```bash
sudo systemctl status mysql
# or
sudo systemctl status mysqld
```

### 2. Test connection
```bash
mysql -u webapp_user -p
# Enter password when prompted
```

### 3. Show databases
```sql
SHOW DATABASES;
```

You should see `node_webapp` in the list.

---

## Troubleshooting

### Can't connect to MySQL server
```bash
# Check if MySQL is running
sudo systemctl status mysql

# Restart MySQL
sudo systemctl restart mysql
```

### Access denied for user
```bash
# Login as root first
sudo mysql -u root -p

# Recreate the user
DROP USER IF EXISTS 'webapp_user'@'localhost';
CREATE USER 'webapp_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON node_webapp.* TO 'webapp_user'@'localhost';
FLUSH PRIVILEGES;
```

### Port 3306 already in use
```bash
# Check what's using port 3306
sudo lsof -i :3306

# Or check with netstat
sudo netstat -tlnp | grep 3306
```

---

## After MySQL Setup

Once MySQL is installed and configured, proceed with the application setup:

```bash
cd /home/sangle/Documents/node_webapp/backend

# Install dependencies
npm install

# Generate Prisma Client
npm run prisma:generate

# Create database tables
npm run prisma:migrate

# Seed with initial users
npm run prisma:seed

# Start the backend
npm run start:dev
```

Your backend should now connect successfully to MySQL!
