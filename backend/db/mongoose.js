const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://pandu:Test123@test.5amuktm.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
}).then(() => {
    console.log('Connected to MongoDB Atlas');
}).catch((err) => {
    console.log('Error: ', err.message);
});