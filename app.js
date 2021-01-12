const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));



app.get("/", function(req, res){
      res.sendFile(__dirname + "/signup.html");
   // res.send("Request posted");
});

app.post("/", function(req, res){
    // const first = req.body.first;
    // const last = req.body.last;
    // const mail = req.body.mail;

  //  console.log(email);
   
    const data = {
        members:[
            { email_address: req.body.mail,
                status: "subscribed",
                merge_fields: {
                    FNAME: req.body.first,
                    LNAME: req.body.last
              
               }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = "https://us7.api.mailchimp.com/3.0/lists/f5a03a4a32"

    const options = {
        method:"POST",
        auth:"saloni2:f7f96bb5f0788f862db5bc6b3798f943-us7"
    }

   const request = https.request(url, options, function(response){
          
         if(response.statusCode===200){
             res.sendFile(__dirname+ "/success.html");
         }
         else{
            res.sendFile(__dirname+ "/failure.html");
         }

         response.on("data", function(data){
             console.log(JSON.parse(data));
         });
    })

    request.write(jsonData);
    request.end();
 });

 app.post("/failure", function(req, res){
     res.redirect("/");
 })



app.listen(process.env.PORT || 3000, function(){
    console.log("server is running at port 3000");
});

//api id
//f7f96bb5f0788f862db5bc6b3798f943-us7

//list id
//f5a03a4a32