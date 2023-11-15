require ('dotenv').config(); // uso de variables de entorno
const express = require ('express');// traer express
const cors = require('cors');
const dbConnect = require  ('./config/mongo.js');
const app = express();
const morganBody = require ('morgan-body');
const loggerStream= require ('./utils/handleLogger');



app.use(cors());
app.use(express.json());
app.use(express.static("storage"));

morganBody(app,{
    noColors: true,
    stream:loggerStream,
    skip:function (req,res){
        return res.statusCode < 400
    },
});


const port = process.env.PORT || 3000;


// estoy trayendo las rutas
app.use("/api",require("./routes"))

app.listen(port,()=>{
    console.log(`backend escuchado en el http://localhost:${port}`);
});

dbConnect();





