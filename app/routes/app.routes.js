module.exports = app => {
  const tutorials = require("../controllers/app.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/tuts", tutorials.create);

  // Retrieve all Tutorials
  router.get("/tuts", tutorials.findAll);

  // Retrieve all published Tutorials
  router.get("tuts/published", tutorials.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("tuts/:id", tutorials.findOne);

  // Update a Tutorial with id
  router.put("tuts/:id", tutorials.update);

  // Delete a Tutorial with id
  router.delete("tuts/:id", tutorials.delete);

  // Delete all Tutorials
  router.delete("tuts/", tutorials.deleteAll);

  // Create a new User
  router.post("/user", tutorials.createUser);

  // Retrieve all Users
  router.get("/user", tutorials.findAllUsers);

  // Retrieve a single User with id
  router.get("/user/:id", tutorials.findOneUser);

  // Update a User with id
  router.put("/user/:id", tutorials.updateUser);

  // Delete a User with id
  router.delete("/user/:id", tutorials.deleteUser);

  // Delete all Users
  router.delete("/user", tutorials.deleteAllUsers);

  // Create a new CategoryMenu
  router.post("/catMenu", tutorials.createCatMenu);

  // Retrieve all CategoryMenu
  router.get("/catMenu", tutorials.findAllCatMenu);
  
  // Retrieve a single CategoryMenu with id
  router.get("/catMenu/:id", tutorials.findOneCatMenu);

  // Update a CategoryMenu with id
  router.put("/catMenu/:id", tutorials.updateCatMenu);

  // Delete a CategoryMenu with id
  router.delete("/catMenu/:id", tutorials.deleteCatMenu);

  // Delete all CategoryMenu
  router.delete("/catMenu", tutorials.deleteAllCatMenu);

  // Create a new Commande
  router.post("/cmd", tutorials.createCmd);

  // Retrieve all Commande
  router.get("/cmd", tutorials.findAllCmd);

  // Retrieve a single Commande with id
  router.get("/cmd/:id", tutorials.findOneCmd);

  // Update a Commande with id
  router.put("/cmd/:id", tutorials.updateCmd);

  // Delete a Commande with id
  router.delete("/cmd/:id", tutorials.deleteCmd);

  // Delete all Commande
  router.delete("/cmd", tutorials.deleteAllCmd);

  // Create a new Menu
  router.post("/menu", tutorials.createMenu);

  // Retrieve all Menu
  router.get("/menu", tutorials.findAllMenu);

  // Retrieve a single Menu with id
  router.get("/menu/:id", tutorials.findOneMenu);

  // Update a Menu with id
  router.put("/menu/:id", tutorials.updateMenu);

  // Delete a Menu with id
  router.delete("/menu/:id", tutorials.deleteMenu);

  // Delete all Menu
  router.delete("/menu", tutorials.deleteAllMenu);

  // Create a new Order
  router.post("/order", tutorials.createOrder);

  // Retrieve all Order
  router.get("/order", tutorials.findAllOrder);

  // Retrieve a single Order with id
  router.get("/order/:id", tutorials.findOneOrder);

  // Update a Order with id
  router.put("/order/:id", tutorials.updateOrder);

  // Delete a Order with id
  router.delete("/order/:id", tutorials.deleteOrder);

  // Delete all Order
  router.delete("/order", tutorials.deleteAllOrder);

  // Create a new Table
  router.post("/table", tutorials.createTable);

  // Retrieve all Table
  router.get("/table", tutorials.findAllTable);

  // Retrieve a single Table with id
  router.get("/table/:id", tutorials.findOneTable);

  // Update a Table with id
  router.put("/table/:id", tutorials.updateTable);

  // Delete a Table with id
  router.delete("/table/:id", tutorials.deleteTable);

  // Delete all Table
  router.delete("/table", tutorials.deleteAllTable);

  // Create a new Restaurant
  router.post("/restaurant", tutorials.createRestaurant);

  // Retrieve all Restaurant
  router.get("/restaurant", tutorials.findAllRestaurant);

  // Retrieve a single Restaurant with id
  router.get("/restaurant/:id", tutorials.findOneRestaurant);

  // Update a Restaurant with id
  router.put("/restaurant/:id", tutorials.updateRestaurant);

  // Delete a Restaurant with id
  router.delete("/restaurant/:id", tutorials.deleteRestaurant);

  // Delete all Restaurant
  router.delete("/restaurant", tutorials.deleteAllRestaurant);

  // Create a new role
  router.post("/role", tutorials.createRole);

  // Retrieve all role
  router.get("/role", tutorials.findAllRole);

  // Retrieve a single role with id
  router.get("/role/:id", tutorials.findOneRole);

  // Update a role with id
  router.put("/role/:id", tutorials.updateRole);

  // Delete a role with id
  router.delete("/role/:id", tutorials.deleteRole);

  // Delete all role
  router.delete("/role", tutorials.deleteAllRole);

  // Create a new review
  router.post("/review", tutorials.createReview);

  // Retrieve all review
  router.get("/review", tutorials.findAllReview);

  // Retrieve a single review with id
  router.get("/review/:id", tutorials.findOneReview);

  // Update a review with id
  router.put("/review/:id", tutorials.updateReview);

  // Delete a review with id
  router.delete("r/eview/:id", tutorials.deleteReview);

  // Delete all review
  router.delete("/review", tutorials.deleteAllReview);

  app.use('/api/', router);
};
