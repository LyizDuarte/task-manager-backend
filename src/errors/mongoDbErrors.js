const notFoundError = (res) => {
  return res.status(404).send("Not Found data in database")
}

module.exports = { notFoundError }
