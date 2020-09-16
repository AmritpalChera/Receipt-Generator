//import dependencies
import express from 'express';
import cors from 'cors';


//app config
const app = express();
const port = 9000;

//middlewares
app.use(express.json());
app.use(cors());

//api routes
app.get('/', (req, res)=>{
    res.status(200).send('hello world')
})

app.post('/api/v1/calculatetip', (req, res)=>{
    const amount = parseInt(req.body.amount);
    const tip = parseInt(req.body.tip);
    const tax = amount*0.13;
    const tipAmount =  (tip / 100) * amount;
    const total = Math.round((amount+tipAmount+tax)*100)/100;
    res.status(200).json({total, tax, tipAmount});
});

//listen
app.listen(port, ()=>{
    console.log(  `listening on localhost: ${port}`);
});

