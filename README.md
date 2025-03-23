# 🚀 NestJS + Prisma + PostgreSQL Dockerized Setup

This project is a **NestJS API** that uses **Prisma ORM** and **PostgreSQL**, running inside **Docker** using `docker-compose`.

---

## 📌 **Getting Started**

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/irinaAbramova-dev/test_sugar.git
```

### **2️⃣ Setup Environment Variables**
Copy the example `.env.dist` files and rename them to `.env`:
```sh
cp .env.dist .env
cp ./api/.env.dist ./api/.env
```
Make sure to update the database URL in `./api/.env` if needed.

### **3️⃣ Build and Start the Containers**
```sh
docker-compose up --build
```
This will:  
✅ Build the NestJS API  
✅ Start a PostgreSQL database  
✅ Apply Prisma migrations  
✅ Seed test users

---

## 🎯 **Backend API**
The **NestJS API** will be available at:  
🔗 **http://0.0.0.0:3000**

---

## 🔑 **Test Accounts**
Use the following test accounts to log in:

| Email             | Password  |
|------------------|----------|
| user_1@test.com | testpass |
| user_2@test.com | testpass |
| user_3@test.com | testpass |
| user_4@test.com | testpass |
| user_5@test.com | testpass |

---

## 🛠 **Useful Commands**

### **Stop and Remove Containers**
```sh
docker-compose down
```

### **Rebuild Containers (if changes were made)**
```sh
docker-compose up --build
```

### **View Logs**
```sh
docker-compose logs -f
```

### **Run Prisma Migrations Manually**
```sh
docker-compose exec api npx prisma migrate deploy
```
