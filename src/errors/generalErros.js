const notAllowedFieldsToUpdateError = (res) => {
  return res.status(500).send("Not allowed fields to update")
}

module.exports = {
  notAllowedFieldsToUpdateError,
}
