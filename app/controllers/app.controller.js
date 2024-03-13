// const bcrypt = require('bcryptjs');
//  const jwt = require('jsonwebtoken');
const db = require("../models");
const Tutorial = db.tutorials;
const User = db.list.User;
const CatMenu = db.list.CatMenu;
const Cmd = db.list.Cmd;
const Menu = db.list.Menu;
const Order = db.list.Order;
const Table = db.list.Table;
const Restaurant = db.list.Restaurant;
const Role = db.list.Role;
const Review = db.list.Review;


const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Tutorial
  const tutorial = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  };

  // Save Tutorial in the database
  Tutorial.create(tutorial)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Tutorial.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Tutorial.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Tutorial with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id
      });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Tutorial.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Tutorial was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Tutorial.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Tutorial was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Tutorial.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Tutorials were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
};

// find all published Tutorial
exports.findAllPublished = (req, res) => {
  Tutorial.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'Authentication failed' });
    }

    if (password != user.password) {
      return res.status(401).json({ error: 'Authentication failed' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
};

// Create and Save a new User
exports.createUser = async (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a User

  //const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const user = {
    name: req.body.name,
    prenom: req.body.prenom,
    naissance: req.body.naissance,
    telephone: req.body.telephone,
    email: req.body.email,
    password: req.body.password,
    role_id: req.body.role_id
  };

  // Save User in the database
  User.create(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    });
};

// Retrieve all Users from the database.
exports.findAllUsers = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  User.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          "Some error occurred while retrieving Users."
      });
    });
};

// Find a single User with an id
exports.findOneUser = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find User with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id
      });
    });
};

// Update a User by the id in the request
exports.updateUser = (req, res) => {
  const id = req.params.id;

  User.update(req.body, {
    where: { user_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });
};

// Delete a User with the specified id in the request
exports.deleteUser = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { user_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete User with id=" + id
      });
    });
};

// Delete all Users from the database.
exports.deleteAllUsers = (req, res) => {
  User.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Users were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Users."
      });
    });
};

// save a new categoryMenu
exports.createCatMenu = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a categoryMenu
  const catMenu = {
    name: req.body.name
  };

  // Save categoryMenu in the database
  CatMenu.create(catMenu)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the categoryMenu."
      });
    });
};

// Retrieve all categoryMenu from the database.
exports.findAllCatMenu = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  CatMenu.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving categoryMenu."
      });
    });
};

// Find a single categoryMenu with an id
exports.findOneCatMenu = (req, res) => {
  const id = req.params.id;

  CatMenu.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find categoryMenu with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving categoryMenu with id=" + id
      });
    });
};

// Update a categoryMenu by the id in the request
exports.updateCatMenu = (req, res) => {
  const id = req.params.id;

  CatMenu.update(req.body, {
    where: { catMenu_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "categoryMenu was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update categoryMenu with id=${id}. Maybe categoryMenu was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating categoryMenu with id=" + id
      });
    });
};

// Delete a categoryMenu with the specified id in the request
exports.deleteCatMenu = (req, res) => {
  const id = req.params.id;

  CatMenu.destroy({
    where: { catMenu_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "categoryMenu was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete categoryMenu with id=${id}. Maybe categoryMenu was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete categoryMenu with id=" + id
      });
    });
};

// Delete all categoryMenu from the database.
exports.deleteAllCatMenu = (req, res) => {
  CatMenu.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} categoryMenu were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all categoryMenu."
      });
    });
};

// save a new command
exports.createCmd = (req, res) => {
  // Validate request
  if (!req.body.user_id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a command
  const cmd = {
    user_id: req.body.user_id,
    restaurant_id: req.body.restaurant_id,
    date: req.body.date,
    status: req.body.status,
    user_id: req.body.user_id,
    restaurant_id: req.body.restaurant_id
  };

  // Save command in the database
  Cmd.create(cmd)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the command."
      });
    });
};

// Retrieve all command from the database.
exports.findAllCmd = (req, res) => {
  const user_id = req.query.user_id;
  var condition = user_id ? { user_id: { [Op.like]: `%${user_id}%` } } : null;

  Cmd.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving command."
      });
    });
};

// Find a single command with an id
exports.findOneCmd = (req, res) => {
  const id = req.params.id;

  Cmd.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find command with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving command with id=" + id
      });
    });
};

// Update a command by the id in the request
exports.updateCmd = (req, res) => {
  const id = req.params.id;

  Cmd.update(req.body, {
    where: { cmd_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "command was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update command with id=${id}. Maybe command was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating command with id=" + id
      });
    });
};

// Delete a command with the specified id in the request
exports.deleteCmd = (req, res) => {
  const id = req.params.id;

  Cmd.destroy({
    where: { cmd_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "command was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete command with id=${id}. Maybe command was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete command with id=" + id
      });
    });
};

// Delete all command from the database.
exports.deleteAllCmd = (req, res) => {
  Cmd.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} command were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all command."
      });
    });
};

// save a new menu
exports.createMenu = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a menu
  const menu = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    catMenu_id: req.body.catMenu_id,
    restaurant_id: req.body.restaurant_id
  };

  // Save menu in the database
  Menu.create(menu)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the menu."
      });
    });
};

// Retrieve all menu from the database.
exports.findAllMenu = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Menu.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving menu."
      });
    });
};

// Find a single menu with an id
exports.findOneMenu = (req, res) => {
  const id = req.params.id;

  Menu.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find menu with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving menu with id=" + id
      });
    });
};

// Update a menu by the id in the request
exports.updateMenu = (req, res) => {
  const id = req.params.id;

  Menu.update(req.body, {
    where: { menu_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "menu was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update menu with id=${id}. Maybe menu was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating menu with id=" + id
      });
    });
};

// Delete a menu with the specified id in the request
exports.deleteMenu = (req, res) => {
  const id = req.params.id;

  Menu.destroy({
    where: { menu_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "menu was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete menu with id=${id}. Maybe menu was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete menu with id=" + id
      });
    });
};

// Delete all menu from the database.
exports.deleteAllMenu = (req, res) => {
  Menu.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} menu were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all menu."
      });
    });
};

// save a new order
exports.createOrder = (req, res) => {
  // Validate request
  if (!req.body.menu_id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a order
  const order = {
    menu_id: req.body.menu_id,
    cmd_id: req.body.cmd_id
  };

  // Save order in the database
  Order.create(order)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the order."
      });
    });
};

// Retrieve all order from the database.
exports.findAllOrder = (req, res) => {
  const menu_id = req.query.menu_id;
  var condition = menu_id ? { menu_id: { [Op.like]: `%${menu_id}%` } } : null;

  Order.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving order."
      });
    });
};

// Find a single order with an id
exports.findOneOrder = (req, res) => {
  const id = req.params.id;

  Order.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find order with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving order with id=" + id
      });
    });
};

// Update a order by the id in the request
exports.updateOrder = (req, res) => {
  const id = req.params.id;

  Order.update(req.body, {
    where: { order_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "order was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update order with id=${id}. Maybe order was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating order with id=" + id
      });
    });
};

// Delete a order with the specified id in the request
exports.deleteOrder = (req, res) => {
  const id = req.params.id;

  Order.destroy({
    where: { order_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "order was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete order with id=${id}. Maybe order was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete order with id=" + id
      });
    });
};

// Delete all order from the database.
exports.deleteAllOrder = (req, res) => {
  Order.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} order were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all order."
      });
    });
};

// save a new table
exports.createTable = (req, res) => {
  // Validate request
  if (!req.body.restaurant_id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a table
  const table = {
    restaurant_id: req.body.restaurant_id,
    number: req.body.number,
    capacite: req.body.capacite
  };

  // Save table in the database
  Table.create(table)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the table."
      });
    });
};

// Retrieve all table from the database.
exports.findAllTable = (req, res) => {
  const number = req.query.number;
  var condition = number ? { number: { [Op.like]: `%${number}%` } } : null;

  Table.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving table."
      });
    });
};

// Find a single table with an id
exports.findOneTable = (req, res) => {
  const id = req.params.id;

  Table.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find table with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving table with id=" + id
      });
    });
};

// Update a table by the id in the request
exports.updateTable = (req, res) => {
  const id = req.params.id;

  Table.update(req.body, {
    where: { place_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "table was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update table with id=${id}. Maybe table was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating table with id=" + id
      });
    });
};

// Delete a table with the specified id in the request
exports.deleteTable = (req, res) => {
  const id = req.params.id;

  Table.destroy({
    where: { place_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "table was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete table with id=${id}. Maybe table was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete table with id=" + id
      });
    });
};

// Delete all table from the database.
exports.deleteAllTable = (req, res) => {
  Table.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} table were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all table."
      });
    });
};

// save a new restaurant
exports.createRestaurant = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a restaurant
  const restaurant = {
    name: req.body.name,
    adresse: req.body.adresse,
    telephone: req.body.telephone
  };

  // Save restaurant in the database
  Restaurant.create(restaurant)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the restaurant."
      });
    });
};

// Retrieve all restaurant from the database.
exports.findAllRestaurant = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Restaurant.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving restaurant."
      });
    });
};

// Find a single restaurant with an id
exports.findOneRestaurant = (req, res) => {
  const id = req.params.id;

  Restaurant.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find restaurant with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving restaurant with id=" + id
      });
    });
};

// Update a restaurant by the id in the request
exports.updateRestaurant = (req, res) => {
  const id = req.params.id;

  Restaurant.update(req.body, {
    where: { restaurant_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "restaurant was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update restaurant with id=${id}. Maybe restaurant was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating restaurant with id=" + id
      });
    });
};

// Delete a restaurant with the specified id in the request
exports.deleteRestaurant = (req, res) => {
  const id = req.params.id;

  Restaurant.destroy({
    where: { restaurant_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "restaurant was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete restaurant with id=${id}. Maybe restaurant was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete restaurant with id=" + id
      });
    });
};

// Delete all restaurant from the database.
exports.deleteAllRestaurant = (req, res) => {
  Restaurant.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} restaurant were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all restaurant."
      });
    });
};

// save a new role
exports.createRole = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a role
  const role = {
    name: req.body.name
  };

  // Save role in the database
  Role.create(role)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the role."
      });
    });
};

// Retrieve all role from the database.
exports.findAllRole = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Role.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving role."
      });
    });
};

// Find a single role with an id
exports.findOneRole = (req, res) => {
  const id = req.params.id;

  Role.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find role with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving role with id=" + id
      });
    });
};

// Update a role by the id in the request
exports.updateRole = (req, res) => {
  const id = req.params.id;

  Role.update(req.body, {
    where: { role_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "role was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update role with id=${id}. Maybe role was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating role with id=" + id
      });
    });
};

// Delete a role with the specified id in the request
exports.deleteRole = (req, res) => {
  const id = req.params.id;

  Role.destroy({
    where: { role_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "role was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete role with id=${id}. Maybe role was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete role with id=" + id
      });
    });
};

// Delete all role from the database.
exports.deleteAllRole = (req, res) => {
  Role.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} role were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all role."
      });
    });
};

// save a new review
exports.createReview = (req, res) => {
  // Validate request
  if (!req.body.user_id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a review
  const review = {
    user_id: req.body.user_id,
    restaurant_id: req.body.restaurant_id,
    comment: req.body.comment
  };

  // Save review in the database
  Review.create(review)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the review."
      });
    });
};

// Retrieve all review from the database.
exports.findAllReview = (req, res) => {
  const user_id = req.query.user_id;
  var condition = user_id ? { user_id: { [Op.like]: `%${user_id}%` } } : null;

  Review.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving review."
      });
    });
};

// Find a single review with an id
exports.findOneReview = (req, res) => {
  const id = req.params.id;

  Review.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find review with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving review with id=" + id
      });
    });
};

// Update a review by the id in the request
exports.updateReview = (req, res) => {
  const id = req.params.id;

  Review.update(req.body, {
    where: { review_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "review was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update review with id=${id}. Maybe review was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating review with id=" + id
      });
    });
};

// Delete a review with the specified id in the request
exports.deleteReview = (req, res) => {
  const id = req.params.id;

  Review.destroy({
    where: { review_id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "review was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete review with id=${id}. Maybe review was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete review with id=" + id
      });
    });
};

// Delete all review from the database.
exports.deleteAllReview = (req, res) => {
  Review.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} review were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all review."
      });
    });
};