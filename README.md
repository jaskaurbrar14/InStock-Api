# Running the InStock-API
To run the backend, make sure that you have MySQL installed and do the following 

1. Make sure you have the latest from `develop`
2. Run the `npm install` to download all the libraries
3. Update the .env file to change the DB_PASSWORD value to the password of your local MySQL database
4. Make sure that you have created the empty database in MySQL e.g., `instock`
5. Next run the migrations `npm run db:migrate` and you should see `Batch 1 run: 2 migrations`, one for warehouse and one for inventory. Confirm in the database that you have `inventories` and `warehouses` tables created
6. Now we can populate these tables with seed data by running `npm run db:seed` and you shoudl see `Ran 2 seed files` and when checking the `inventories` and `warehouses` database tables, you should see the seed data 
7. Now your database is setup and you can run the InStock-API server to access the endpoints you could do `npm run devStart` or `npm start`