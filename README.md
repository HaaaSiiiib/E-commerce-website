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


#### 2. Three organizations are three different servers and each one has to be installed and run separately. Assuming you are in the parent (CSE-446) directory or whatever name you cloned the project, do the following.

```
cd bank
npm install
npm start

cd ..
cd supplier
npm install
npm start

cd ..
cd e-commerce
npm install
npm start
```

#### 3. There is a `dotenv.template` file in each directory. User has to create a `.env` file based on the template and set the values of different variables themselves based on their database configuration.

#### 4. This project uses postgres, but it should compatible with most other relational databse dialects that conforms to SQL standard.

Servers will be running on following ports by default.

Bank: http://127.0.0.1:4001

Supplier: http://127.0.0.1:4002

E-commerce: http://127.0.0.1:4003

#### 5. Swagger testing links for the backend API in publicly accessible web deployment

Bank: https://bank.cse446.ml/swagger

Supplier: https://suppl.cse446.ml/swagger

Ecommerce: https://ecom.cse446.ml/swagger


#### 6.  There are two frontend sites for this project. Both needs to be run separately. Assuming you are in the parent folder, do the following.

```
cd bank
npm install
yarn start

cd ..
cd e-commerce
npm install
yarn start
```

#### 7. By default, the sites will run on the following ports.

Bank: http://127.0.0.1:4004

E-commerce: http://127.0.0.1:4005

#### 8. Publicly accessible web deployment (Subject to expiration limit)

Bank: https://bank-frontend.cse446.ml

E-commerce: https://ecom-frontend.cse446.ml





