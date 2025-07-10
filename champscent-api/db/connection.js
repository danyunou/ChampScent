const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/perfumeShop', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
