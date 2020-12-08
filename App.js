const express = require("express");
const { send } = require("process");
const bodyParser = require("body-parser");

const app = express();
const router = express.Router();
const PORT = 3000;

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
            "OrderNr" = Int //van 1 - x voor volgorde
            "Direction" = string,
             "Afstand" = int
        }
    ]
}
*/
app.post('/move', (req, res) => {
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