var PORT = process.env.PORT || 5000;
var express = require('express');
var path = require('path');
var app = express();
const multer = require('multer');
const bodyParser = require('body-parser');
var session = require('express-session');
var flash = require('connect-flash');
app.use(flash());

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.get('/', function(req,res) {
	res.render('index', { message : req.flash('message')});
});

app.use(express.static(__dirname + '/public'));
app.use('/css', express.static(__dirname + 'public/css'));
//app.use(express.static(__dirname + '/uploads'));

var storage = multer.diskStorage({
	destination: function (req,file,cb) {
		cb(null, 'uploads')
	},
	filename: function (req,file,cb) {
		cb(null, file.fieldname + '-' + Date.now())
	}
})

var upload = multer({ storage: storage });

app.post('/uploadfile', upload.single('myFile'), (req, res, next) => {
	const file = req.file
	if (!file) {
		const error = new Error('Please upload a file')
		error.httpStatusCode = 400
		return next(error)
	}
	else{
	//	res.send('you have uploaded this image: <br><img src="$(req.file.path)" /><br><a href="./">upload another image</a>');
		req.flash('message', 'Uploaded successfully...!');
		res.redirect('/');
	}

})




app.listen(PORT, function() {
	console.log("Server is running on port 5000");
});
