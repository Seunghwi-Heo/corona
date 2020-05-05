var express = require('express')
var router = express.Router()
const redis = require('redis')
const client = redis.createClient(6379, '127.0.0.1')
const app = express()
const ejs = require('ejs');
let testdata = {};

app.set('views', __dirname + '../views');
app.set('view engine', 'ejs');
app.engine('html', ejs.renderFile);
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static(__dirname+'/static'));

(async () => {
    await client.lrange('list', 0, -1, (err, data) => {
        testdata = data;
    });
})();

router.get('/asdf', function(req, res) {
    res.render('test2.ejs', )
});

router.get('/', function(req, res) {
    res.render('home.ejs', {
        infect: testdata
    })
});

router.get('/asdfg', function(req, res) {
    res.render('chart.ejs')
});

router.get('/getChartData', function(req, res) {
    var data;
    var sendData = [];
    for(data of testdata){
        var t = JSON.parse(data);
        if(t.createDt.substring(8,10) % 5 == 0){
            sendData.push(t);
        }        
    }
    
    res.json(Array.from(new Set(sendData)));
});

module.exports = router;


