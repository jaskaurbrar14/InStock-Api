const knex = require("knex")(require("../knexfile"));

// list all warehouses
const index = async (_req, res) => {
  try {
    const warehouses = await knex("warehouses").select("*");
    res.status(200).json(warehouses);
  } catch (err) {
    console.error("Error fetching warehouses:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const validator = require("validator");

const warehouseRequiredFields = [
  "warehouse_name",
  "address",
  "city",
  "country",
  "contact_name",
  "contact_position",
  "contact_phone",
  "contact_email",
];

const edit = async (_req, res) => {
  const warehouseData = _req.body;

  for (const field of warehouseRequiredFields) {
    if (!(field in warehouseData)) {
      return res.status(400).json({
        status: 400,
        error: `${field} is required in the request body`,
      });
    }
  }

  if (!validator.isEmail(warehouseData.contact_email)) {
    return res.status(400).json({
      status: 400,
      error: "The contact_email is not a valid email format",
    });
  }

  if (!validatePhoneNumber(warehouseData.contact_phone)) {
    return res.status(400).json({
      status: 400,
      error:
        "The contact_phone is not a valid phone number format. Expected format is +1 (XXX) XXX-XXXXX e.g., +1 (646) 123-1234",
    });
  }

  try {
    const { warehouse_id } = _req.params;
    const existingWarehouse = await knex("warehouses")
      .where({ id: warehouse_id })
      .first();

    if (!existingWarehouse) {
      return res.status(404).json({
        status: 404,
        error: `Warehouse ${warehouse_id} not found`,
      });
    } else {
      warehouseData.id = existingWarehouse.id;
      await knex("warehouses")
        .where({ id: warehouse_id })
        .update(warehouseData);

      const updatedWarehouse = await knex("warehouses")
        .where({ id: warehouse_id })
        .first();
      res.status(200).json(updatedWarehouse);
    }
  } catch (err) {
    console.error("Error fetching warehouses:", err);
    res.status(500).json({ err: "Internal server error" });
  }
};

// This function validates that phone number matches +1 (XXX) XXX-XXXX format
function validatePhoneNumber(phoneNumber) {
  const phonePattern = /^\+\d{1,3}\s\(\d{3}\)\s\d{3}-\d{4}$/;
  if (phonePattern.test(phoneNumber)) {
    return true;
  } else {
    return false;
  }
}

// Get Singlewarehouse by ID
const getWarehouseById = async (req, res) => {
  try {
    const warehouse = await knex("warehouses")
      .where({ id: req.params.warehouse_id })
      .first();

    if (!warehouse) {
      return res.status(404).json({
        message: `Warehouse with ID ${req.params.id} not found`,
      });
    }
    res.status(200).json(warehouse);
    } catch (error) {
      console.error("Error fetching warehouse by ID:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
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
        message: `Unable to create new warehouse: ${error}`,
      });
    }
  };
  const remove = async (req, res) => {
    console.log(`Attempting to delete warehouse with ID ${req.params.id}`);
    try {
      const rowsDeleted = await knex("warehouses")
        .where({ id: req.params.id })
        .delete();
  
      if (rowsDeleted === 0) {
        return res
          .status(404)
          .json({ message: `Warehouse with ID ${req.params.id} not found` });
      }
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({
        message: `Unable to delete warehouse: ${error}`,
      });
    }
  };
module.exports = {
  index,
  edit,
  addWarehouse,
  remove,
  getWarehouseById,
};
