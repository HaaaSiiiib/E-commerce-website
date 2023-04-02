# E-Commerce Website

This repository consists the web project for CSE-446 course

## Project :
Develop an e-commerce website with inventory, sales functionality with card payment, administrative and client privileges, etc.
A supplier portal  for  inventory and Orders tracking and a bank for all entities to track their balances. 

# Languages 

-  **M**ongoDb - **E**xpress.js - **R**eact.js - **N**ode.js -

# Workflow : 

- 3 different module. created An **E-Commerce(Client+Admin), A Supplier and A Bank** Site with MERN. 
- Built 3 Interconnecting **API endpoints** for the 3 stream.
- **MongoDB** for Database,used 4 Collections for whole project.

- Order Tracking 
- Admin must approve every order manually and forware to 'Supplier'
- Admin can **Add new Product** with  price.
- Every SALES transaction : <br/>

   **==>>** User Checkout using **Online payment**
   **==>>** **Admin Approves** and Gets SUBTOTAL in his account.
   **==>>** Forwards Order to **Suppliers and keeps** 20% Incentive 
   **==>>** Supplier accepts and Order status is 'delivered' 
 
- Every **User/Admin/Suppliers** can check their Bank Balance in **Bank Server**

# How to install and run

#### 1. First clone the repository to your computer or download the project as zip file.

`git clone https://github.com/HaaaSiiiib/E-commerce-website.git`

#### 2.  There are two frontend sites for this project. Both needs to be run separately. Assuming you are in the parent folder, do the following.

```
cd bank
npm install
yarn start

cd ..
cd e-commerce
npm install
yarn start
```

#### 3. By default, the sites will run on the following ports.

Bank: http://127.0.0.1:4004

E-commerce: http://127.0.0.1:4005

#### 4. Publicly accessible web deployment

Bank: https://bank-frontend.cse446.ml

E-commerce: https://ecom-frontend.cse446.ml
