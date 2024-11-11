const notFoundError = (res) => {
  return res.status(404).send("Not Found data in database")
}

const objectIdCastError = (res) => {
  return res.status(500).send("Invalid ID")
}

module.exports = { notFoundError, objectIdCastError }
