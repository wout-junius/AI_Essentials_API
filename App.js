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
    <script src="https://cdn.jsdelivr.net/gh/google/code-prettify@master/loader/run_prettify.js"></script>
    <h1> /sendmoves </h1>
    <code class="prettyprint" lang-json>
    { </br>
    &nbsp;     moves: [ </br>
    &nbsp;&nbsp;        { </br>
    &nbsp;&nbsp;&nbsp;      "OrderNr" : int //van 1 - x voor volgorde </br>
    &nbsp;&nbsp;&nbsp;      "Direction" : string, </br>
    &nbsp;&nbsp;&nbsp;      "Afstand" : int </br>
    &nbsp;&nbsp;        } </br>
    &nbsp;    ] </br>
    }
    </code>
    <code class="prettyprint" lang-js>
    <h1> /plsSendNext </h1>
    {</br>
        &nbsp;   "OrderNr" : int //van 1 - x voor volgorde </br>
        &nbsp;  "Direction" : string, </br>
        &nbsp;   "Afstand" : int </br>
    }
    </code>
    `
    res.send(html)
})

app.post('/sendmoves', (req, res) => {
    console.log("POST moves");
    movesQue = []
    for(let move of req.body.moves){
        movesQue.push(move)
    }
     movesQue.sort((a, b) => (a.OrderNr < b.OrderNr) ? a.OrderNr : b.OrderNr);
    res.send({Message: "Success"})
})

app.get('/getmoves', (req, res) => {
    console.log("GET MOVES");
    if(movesQue != null) {RouteToMoves();}
    sendQue = (movesQue == null) ? "empty" : movesQue;
    movesQue = null;
    res.send(sendQue);
})



function RouteToMoves(robotDirection){
    lastDirection = ""
    movesQue.forEach(m => {
        lastDirection = m.Direction;
        if(m.OrderNr != 1){
            if(m.Direction == movesQue[m.OrderNr-1].Direction){
                m.Direction = "F";
            }else{
                switch(movesQue[m.OrderNr-1].Direction){
                    case "D":
                        m.Direction = (m.Direction == "L") ? "R" : "L";
                        break;
                    case "U":

                        break;
                    case "R":
                        m.Direction = (m.Direction == "U") ? "L" : "R"
                    break;
                    case "L":
                        m.Direction = (m.Direction == "D") ? "L" : "R"
                    break;
                }
            }
        }
    });
    let newDirection = "";
    switch(lastDirection){
        case "D":
            newDirection = "B"
            break;
        case "U":
            newDirection = "F"
            break;
        case "R":
            newDirection = "L"
        break;
        case "L":
            newDirection = "R"
        break;
    }
    
    movesQue.push({
        "OrderNr" : movesQue.length + 1, //van 1 - x voor volgorde
        "Direction" : newDirection,
         "Afstand" : 1
    })
}

app.listen(PORT ,()=> {
    console.log(`Listening on port ${PORT}`);
    console.log();
});