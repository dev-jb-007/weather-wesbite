const path=require('path');
const express=require('express');
const hbs=require('hbs');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

//Setting the express application
const app= express();

//Setting the paths
const staticPath=path.join(__dirname,'/static');
const viewsPath=path.join(__dirname,'/Template/views');
const partialsPath=path.join(__dirname,'/Template/partials');

//Serving the static files
app.use(express.static(staticPath));

//Setting the view engines(handlebars) and partials
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

//Setting the response and requests

app.get('/about',(req,res)=>{
    res.render('about');
})
app.get('',(req,res)=>{
    if(!req.query.address)
    {
        return res.render('index')
    }
    geocode(req.query.address, (error, { lat, log, location } = {}) => {
        if (error) {
            res.send({
                error
            });
            answer=undefined;
        }
        else {
            forecast(lat, log, (error, { weather, main }) => {
                if (error) {
                    res.send({
                        error
                    });
                    answer=undefined;
                }
                else {
                    let description = (weather[0].description).toUpperCase();
                    errordata=undefined;
                    res.send({
                        location,
                        forecast:`${description}. It is currently ${main.temp} degrees out.`,
                        img:`${weather[0].main}`
                    })
                    
                }
            })
        }
    });
});

//Handling the 404 page
// app.get('*', (req, res) => {
//     res.send({
//         status:404,
//         error:'Check Your URL'
//     })
// });

//Starting the server
app.listen(3000,()=>{
    console.log("Your server has been started");
})