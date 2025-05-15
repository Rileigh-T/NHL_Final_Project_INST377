const express = require('express');
const supabaseClient = require('@supabase/supabase-js');

const app = express()
const port=3000;

app.use(express.static(__dirname + '/public'));
const supabaseUrl = 'https://zfamqkjizyejuprxjwli.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpmYW1xa2ppenllanVwcnhqd2xpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcyNTE3MDYsImV4cCI6MjA2MjgyNzcwNn0.9edBAMIpMoPhCiSv7IDzEcFy-GxE6jTdv1etTVkBNN0';
const supabase = supabaseClient.createClient(supabaseUrl, supabaseKey);

app.get('/players', async (req,res) => {
    console.log("attempting to get all customers")

    const {data, error} = await supabase.from('players').select();

    if (error) {
        console.log('Error: ${error}');
    }
    res.send(data)
});

app.listen(port, () => {
    console.log('api is alive' +port);

});