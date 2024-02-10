const knex = require("knex")(require("../knexfile"));
const emailValidator = require("validator");

const addWarehouse = async (req, res) => {
  const {
    warehouse_name,
    address,
    city,
    country,
    contact_name,
    contact_position,
    contact_phone,
    contact_email,
  } = req.body;

  const requiredFields = [
    "warehouse_name",
    "address",
    "city",
    "country",
    "contact_name",
    "contact_position",
    "contact_phone",
    "contact_email",
  ];

  const missingField = requiredFields.filter((field) => !req.body[field]);

  if (missingField.length > 0) {
    return res
      .status(400)
      .send({
          isSuccessful : false,
          message : `can't create new warehouse as the required fields are missing:  ${missingField}`
        });
  }

  const isValidEmail = emailValidator.isEmail(contact_email);

  const phoneRegEx = /^\+?(\d{1,3})?\s*\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

  const isValidPhoneNumber = phoneRegEx.test(contact_phone);

  if (!isValidEmail || !isValidPhoneNumber) {
    return res.status(400).send({
      isSuccessful : false,
      message : `Invalid email or phone number`
    });
  }
  const newWarehouse = {
    warehouse_name,
    address,
    city,
    country,
    contact_name,
    contact_position,
    contact_phone,
    contact_email,
  };
  try {
    const result = await knex("warehouses").insert(newWarehouse);
    const newWarehouseId = result[0];
    const createdWarehouse = await knex("warehouses").where({
      id: newWarehouseId,
    });
    if(createdWarehouse && createdWarehouse!== null){
      return res.send({
        message: `Warehouse  was successfully created`,
        isSuccessful: true,
        data: createdWarehouse,
      });
    }else{
      return res(500).send({
        message: `Something went wrong`,
        isSuccessful: false,
      });
    }
    
  } catch (error) {
    res.status(500).json({
      message: `Unable to create new user: ${error}`,
    });
  }
};

module.exports = {
  addWarehouse,
};
