var Tesseract = require('tesseract.js');
var image = "./captcha.jpg";

function tesseract(){
    Tesseract.recognize(image)
        .then(result => console.log(result.text))
}
tesseract();