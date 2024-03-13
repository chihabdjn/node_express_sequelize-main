const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("utilisateurs", {
        user_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING
        },
        prenom: {
            type: DataTypes.STRING
        },
        naissance: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        telephone: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                is: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });


    const CatMenu = sequelize.define("categoryMenu", {
        catMenu_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING
        },
    });

    const Cmd = sequelize.define("commandes", {
        cmd_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.INTEGER
        },
        restaurant_id: {
            type: DataTypes.INTEGER
        },
        date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        status: {
            type: DataTypes.BOOLEAN,
        },
    });

    const Menu = sequelize.define("menus", {
        menu_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        price: {
            type: DataTypes.FLOAT,
        },
        catMenu_id: {
            type: DataTypes.INTEGER,
        },
        restaurant_id: {
            type: DataTypes.INTEGER,
        }
    });

    const Order = sequelize.define("orderContent", {
        order_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        cmd_id: {
            type: DataTypes.INTEGER
        },
        menu_id: {
            type: DataTypes.INTEGER
        },
    });

    const Table = sequelize.define("tables", {
        place_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        number: {
            type: DataTypes.INTEGER
        },
        capacite: {
            type: DataTypes.INTEGER,
        },
        restaurant_id: {
            type: DataTypes.INTEGER,
        },
    });

    const Restaurant = sequelize.define("restaurants", {
        restaurant_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING
        },
        adresse: {
            type: DataTypes.STRING
        },
        telephone: {
            type: DataTypes.STRING,
        }
    });

    const Role = sequelize.define("roles", {
        role_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        },
    });

    const Review = sequelize.define("reviews", {
        review_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.INTEGER
        },
        restaurant_id: {
            type: DataTypes.INTEGER
        },
        comment: {
            type: DataTypes.STRING,
        },
    });

    User.hasMany(Cmd, { foreignKey: 'user_id' });
    Cmd.belongsTo(User, { foreignKey: 'user_id' });

    Cmd.hasMany(Order, { foreignKey: 'cmd_id' });
    Order.belongsTo(Cmd, { foreignKey: 'cmd_id' });

    Role.hasMany(User, { foreignKey: 'role_id' });
    User.belongsTo(Role, { foreignKey: 'role_id' });

    User.hasMany(Review, { foreignKey: 'user_id' });
    Review.belongsTo(User, { foreignKey: 'user_id' });

    Restaurant.hasMany(Review, { foreignKey: 'restaurant_id' });
    Review.belongsTo(Restaurant, { foreignKey: 'restaurant_id' });

    Restaurant.hasMany(Table, { foreignKey: 'restaurant_id' });
    Table.belongsTo(Restaurant, { foreignKey: 'restaurant_id' });

    Restaurant.hasMany(Cmd, { foreignKey: 'restaurant_id' });
    Cmd.belongsTo(Restaurant, { foreignKey: 'restaurant_id' });

    Restaurant.hasMany(Menu, { foreignKey: 'restaurant_id' });
    Menu.belongsTo(Restaurant, { foreignKey: 'restaurant_id' });

    CatMenu.hasMany(Menu, { foreignKey: 'catMenu_id' });
    Menu.belongsTo(CatMenu, { foreignKey: 'catMenu_id' });

    
    return {
        User,
        CatMenu,
        Cmd,
        Menu,
        Order,
        Table,
        Restaurant,
        Role,
        Review
    };
};