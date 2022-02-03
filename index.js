import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

//import routes
import dishesRoutes from "./routes/products-routes/dishes-routes";
import dessertsRoutes from "./routes/products-routes/desserts-routes";
import drinksRoutes from "./routes/products-routes/drinks-routes";
import authUserOrderRoutes from "./routes/authUser-order-routes"
import adminUsersRoutes from "./routes/admin-routes/admin-users-routes";
import authRoutes from "./routes/auth-routes";
import adminDishRoutes from "./routes/admin-routes/admin-dish-routes";
import adminDessertsRoutes from "./routes/admin-routes/admin-dessert-routes";
import adminDrinksRoutes from "./routes/admin-routes/admin-drinks-routes";
import authUserRoutes from "./routes/auth-user-routes";
import adminOrdersRoutes from "./routes/admin-routes/admin-order-routes"

//import middlewares
import checkAuth from "./middlewares/check-auth";
import checkIsAdmin from "./middlewares/check-is-admin"
import cors from "./middlewares/cors";

const app = express();
dotenv.config({ path: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env' });

//CONNECTION MongoDB Database
mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => {
    console.log("MongoDB est connecté");
  })
  .catch(err => {
    console.log(err);
  });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors);

//ROUTES FOR ALL
app.use(authRoutes);
app.use(dishesRoutes);
app.use(dessertsRoutes);
app.use(drinksRoutes);


// ROUTES FOR AUTHENTICATED USERS
app.use(checkAuth);
app.use(authUserRoutes);
app.use(authUserOrderRoutes);

// ADMIN ROUTES
app.use(checkIsAdmin);
app.use(adminUsersRoutes);
app.use(adminDishRoutes);
app.use(adminDessertsRoutes);
app.use(adminDrinksRoutes);
app.use(adminOrdersRoutes);

//ERROR HANDLING MIDDLEWARES
app.use(function (req, res) {
  res
    .status(error.code || 404)
    .json({ message: "Malheureusement ressource introuvable" });
});

app.use(function (error, req, res, next) {

  res.status(error.code || 500).json({
    message: error.message || "Malheureusement, quelque chose s'est mal passé sur le server",
  });
});

app.listen(process.env.PORT || 3200, () => {
  console.log(`The server is running on port ${process.env.PORT}`);
});


export default app;