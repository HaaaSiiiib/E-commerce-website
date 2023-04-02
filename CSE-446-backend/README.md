# CSE-446
Web project for CSE-446 course

# How to install and run

#### 1. First clone the repository to your computer or download the project as zip file.

`git clone https://github.com/TissuePowder/CSE-446.git`

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

## Swagger testing links for the backend API in publicly accessible web deployment

Bank: https://bank.cse446.ml/swagger

Supplier: https://suppl.cse446.ml/swagger

Ecommerce: https://ecom.cse446.ml/swagger
