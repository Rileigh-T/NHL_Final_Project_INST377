const express = require('express');
const supabaseClient = require('@supabase/supabase-js');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const app = express()
const cors = require('cors');
app.use(cors());

const port=3000;

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(supabaseUrl, supabaseKey);

app.get('/players', async (req,res) => {
    console.log("attempting to get all customers")

    const {data, error} = await supabase.from('players').select();

    if (error) {
        console.log(`Error: ${error}`);
    }
    res.send(data)
});

app.post('/player', async(req,res) => {
    console.log('Adding Customer')

    console.log(req.body);
    const Player =req.body.Player;
    const G=req.body.G;
    const A=req.body.A;
    const P=req.body.P;

    const {data, error} = await supabase
    .from('players')
    .insert({Player: Player, G: G , A: A, P: P})
    .select()

    res.send()
})

app.listen(port, () => {
    console.log('api is alive' +port);

});