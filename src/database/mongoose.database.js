const mongoose = require("mongoose")

const connectToDatabase = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@taskmanagercluster.nydwj.mongodb.net/?retryWrites=true&w=majority&appName=TaskManagerCluster`
    )
    console.log("Connected to MongoDB")
  } catch (error) {
    console.error("Failed to connect to MongoDB", error)
  }
}

module.exports = connectToDatabase
