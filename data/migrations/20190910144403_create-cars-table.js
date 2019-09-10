
exports.up = function (knex) {
  return knex.schema.createTable('cars', tbl => {
    tbl.increments();
    tbl.text('make', 128)
      .notNullable()
    tbl.text('model', 128)
      .notNullable()
    tbl.integer('mileage')
      .notNullable()
    tbl.integer('VIN')
      .notNullable()
    tbl.text('transmission', 128)
      .nullable()
    tbl.text('title status', 128)
      .nullable()
  })
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('cars');
};
