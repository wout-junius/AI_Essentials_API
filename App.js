const express = require("express");
const { send } = require("process");
const bodyParser = require("body-parser");

const app = express();
const router = express.Router();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );

var movesQue = [];

/*
{
    moves: [
        {
            "OrderNr" : int //van 1 - x voor volgorde
            "Direction" : string,
             "Afstand" : int
        }
    ]
}
*/

app.get('/', (req, res) => {
    let html = `
    <h1> /sendmoves </h1>
    {
        moves: [
            {
                "OrderNr" : int //van 1 - x voor volgorde
                "Direction" : string,
                 "Afstand" : int
            }
        ]
    }
    <h1> /plsSendNext </h1>
    {
        "OrderNr" : int //van 1 - x voor volgorde
        "Direction" : string,
         "Afstand" : int
    }
    `
    res.send(html)
})

app.post('/sendmoves', (req, res) => {
    for(let move of req.body.moves){
        movesQue.push(move)
    }
     movesQue.sort((a, b) => (a.OrderNr < b.OrderNr) ? a.OrderNr : b.OrderNr);
    res.send({Message: "Success"})
})

app.get('/plsSendNext', (req, res) => {
    if(movesQue.length > 0){
        var nextMove = movesQue[0];
        movesQue.shift()
        res.send(nextMove)
    }else{
        res.send({End: "Done"})
    }    
})

app.listen(PORT ,()=> {
    console.log(`Listening on port ${PORT}`);
    console.log();
});