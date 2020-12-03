const express = require("express");
const { send } = require("process");

const app = express();
const router = express.Router();
const PORT = 3000;

var movesQue = [];

/*
{
    [
        {
            "Direction" = string,
             "Afstand" = int
        }
    ]
}
*/
app.get('/move', (res, req) => {
    movesQue = res;
})

app.get('/plsSendNext', (res, req) => {
    if(movesQue.length > 0){
        var nextmove = movesQue[0];
        movesQue.shift()
        res,send(nextmove)
    }else{

    }
    
    
})

app.listen(PORT ,()=> {
    console.log(`Listening on port ${PORT}`);
    console.log();
});