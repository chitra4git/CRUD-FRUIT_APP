const express = require('express');
const app = express();

const fruits = require('./modles/fruits');

//setup Show.jsx file
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

// const fruits = ['apple', 'banana', 'pear'];

// ===Middleware====

app.use((req, res, next) => {
    console.log('I run for all routes');
    next();
});
app.use(express.urlencoded({extended:false}));

// ====Routes====
//index route
app.get('/fruits', (req, res) => {
    
    res.render('Index',{
        fruits: fruits
    });
});

//week 8 day 1
//https://ps-rtt-sei.herokuapp.com/mod-2/week-8/day-1/slides/
//https://ps-rtt-sei.herokuapp.com/mod-2/week-8/day-2/slides/


//new route
app.get('/fruits/new', (req, res) => {
    res.render('New');
});

//create rout
app.post('/fruits', (req, res) => {
    // console.log(req.body);
    // res.send('data received');
    if(req.body.readyToEat === 'on'){ //if checked, req.body.readyToEat is set to 'on'
        req.body.readyToEat = true; //do some data correction
    } else { //if not checked, req.body.readyToEat is undefined
        req.body.readyToEat = false; //do some data correction
    }
    fruits.push(req.body);
    console.log(fruits);
    res.redirect('/fruits');
});



//show rout
app.get('/fruits/:index', (req, res)=> {
    res.render('Show',{
    //res.send(fruits[req.params.index])
    fruit: fruits[req.params.index] 
});
});

app.listen(3000, () => {
    console.log('listening');
});
