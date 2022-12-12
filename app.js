const express = require("express"); //Get or import Express Module
const bodyParser = require("body-parser"); // Get or enable BodyParser module

const https = require("https");
 const app = express(); //Create instance of Express app object to use 
  
 //Add statics files such as images and css from a named folder (assets)
 app.use(express.static("assets"));
 //NB: if your file are actually on live server then use: app.use(express.static("public"))
 
//  Use body-parser
app.use(bodyParser.urlencoded({extended: true}));
 app.get("/", (req, res)=>{
    res.sendFile(__dirname+"/index.html");
 });

app.post("/", (req, res) =>{
   const firstName = req.body.firstname;
   const lastName = req.body.lastname;
   const emailAddress = req.body.email;
   // console.log (firstName,lastName, emailAddress);
   const data = {
      members: [
         {
              email_address: emailAddress,
              status: "subscribed",
              merge_fields: {
                  FNAME: firstName,
                  LNAME: lastName
              }
          }
      ]
   };
  
   // convert data to Json data
  const jsonData = JSON.stringify(data);
  
  const url = "https://us13.api.mailchimp.com/3.0/lists/5f1d2579d3";
  
  const option = {
      method: "POST",
      auth: "henman:0e83ac843f4e5d0da42baa25c855fb1d-us13"
  }
  const request = https.request (url, option, (response)=>{
    if(response.statusCode === 200){
        res.sendFile(__dirname+"/success.html");
    }  
    else {
        res.sendFile(__dirname+"/failure.html");
    }
    // response.on("data", (data)=>{
    //       console.log(JSON.parse(data));
    //   })
  
  })
  
  //forward or json data to the mailchimp server
  request.write (jsonData);
  request.end(); //end the request 
   
});
app. post("/success", (req, res) =>{
    // res.sendFile(__dirname+"/index.html");
    res.redirect("/");

});
app.post("/failure", (req, res) =>{
    res.redirect("/"); //Redirect to home page

});

 app.listen(process.env.PORT || 3005, () =>{  //let your app hosting server assign port dyanmically
    console.log("Listening to Port: 3005");

 });



//  0e83ac843f4e5d0da42baa25c855fb1d-us13
// 5f1d2579d3.
// const mailchimp = require("@mailchimp/mailchimp_marketing");

// mailchimp.setConfig({
//   apiKey: "0e83ac843f4e5d0da42baa25c855fb1d-us13",
//   server: "us13",
// });

// async function run() {
//   const response = await mailchimp.ping.get();
//   console.log(response);
// }

// run();

// const client = require("@mailchimp/mailchimp_marketing");

// client.setConfig({
//   apiKey: "YOUR_API_KEY",
//   server: "YOUR_SERVER_PREFIX",
// });

// const run = async () => {
//   const response = await client.lists.createList({
//     name: "name",
//     permission_reminder: "permission_reminder",
//     email_type_option: true,
//     contact: {
//       company: "company",
//       address1: "address1",
//       city: "city",
//       country: "country",
//     },
//     campaign_defaults: {
//       from_name: "from_name",
//       from_email: "Beulah_Ryan@hotmail.com",
//       subject: "subject",
//       language: "language",
//     },
//   });
//   console.log(response);
// };

// run();
