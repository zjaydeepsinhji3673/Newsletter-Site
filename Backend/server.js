require('dotenv').config();

const express = require("express"); //express module
let app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
let cors = require('cors')

app.use(cors({
    origin: 'http://localhost:3000'
}))

app.get('/newslatters/:fileName', function(req,res){
    res.sendFile(__dirname+'/uploads/newslatters/'+req.params.fileName)
})

var admin = require("./module/v1/admin/route");
var user = require('./module/v1/user/route');

app.use('/', require('./middleware/validate').validateApiKey);
app.use('/', require('./middleware/validate').validateHeaderToken);

app.use("/api/v1/admin",admin);
app.use('/api/v1/user',user);

// Connection Creations
try {
    app.listen(process.env.PORT);
    console.log("server started: "+ process.env.PORT);
}
 catch(error)
{
    console.log(error);
}