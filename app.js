/* Required Modules */
const cors = require("cors");
const express = require("express");
//const http = require("http");
const bodyParser = require("body-parser")
const axios = require("axios");
const app = express();
const PORT = process.env.PORT || 3000;

/* Use Middleware */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

/* Request handled */
app.get('/',function(req,res){
 res.send(`Home Page Of Northbbsr`);
    console.log("Home Page");
}


app.post('/api/sendotp',function(req,response){
    console.log("=========================");
    console.log("send otp post");
    console.log('req : ',req.body);
    let generatedOTP = req.body.otp.trim();
    let mobileNo = req.body.mobileNo.trim();
    console.log("generatedOTP : ",generatedOTP,"  , mobileNo: ",mobileNo);

    
    let sendOtpUrl = "https://control.msg91.com/api/sendotp.php?template=SAM&otp="+generatedOTP+"&otp_length=4&otp_expiry=3&sender=NORTHBBSR&message=Your OTP is "+generatedOTP+"&mobile=+91"+mobileNo+"&authkey=285000A8HDy92z5d296a68";
    
    let request1 = axios.post(sendOtpUrl).then(res => {
        console.log("res.data.type ", res.data.type);
        if (res.data.type == "success") {
            console.log("res : ", res.data);
            response.status(200).json("success");
            generatedOTP="";
            mobileNo="";
        } else
            if (res.data.type == "error") {
                console.log("err");
                response.status(500).json("Error");
            }
    }).catch(err => {
        console.log("error : ", err);
    });

});


app.post('/api/verifyotp',function(req,response){
    console.log("=========================");
    console.log("VerifyOTP req: ",req.body);
    let mobileNo = req.body.mobileNumber;
    let enteredOtp = req.body.enteredOtp;
    console.log("mobileNo : ",mobileNo," , enteredOtp : ",enteredOtp);

    
    let verifyOtpUrl = "https://control.msg91.com/api/verifyRequestOTP.php?authkey=285000A8HDy92z5d296a68&mobile=+91"+mobileNo+"&otp="+enteredOtp;
    
    let request2 = axios.post(verifyOtpUrl).then(res => {
        console.log("res.data.type ", res.data.type);
        if (res.data.type == "success") {
            console.log("res : ", res.data);
            response.status(200).json("success");
            mobileNo="";
            enteredOtp="";

        } else
            if (res.data.type == "error") {
                console.log("err");
                response.status(500).json("Error");
            }
    }).catch(err => {
        console.log("error : ", err);
    });

});

app.post("/api/sendtext",function(req,response){
    console.log("=========================");
    console.log("SendText req :",req.body);
    let complain = "have a complain about my fan";
    let sendTextUrl = "https://api.msg91.com/api/sendhttp.php?mobiles=+919960854833&authkey=285000A8HDy92z5d296a68&route=1&sender=eskolars&message="+complain+"&country=91";
    let sendTextRes = axios.get(sendTextUrl).then(res=>{
        console.log("res.data.type :  ",res.status);
        if(res.status == 200){
            console.log("send text res : ",res.status);
            response.status(200).json("success");
        }else {
            console.log("err");
            response.status(500).json("Error");    
        }
    }).catch(err => {
        console.log("error : ", err);
    });

})

app.listen(PORT,function(){
    console.log("server started on port 3000...");
});

    // var options = {
    // "method": "POST",
    // "hostname": "control.msg91.com",
    // "port": null,
    // "path": "https://control.msg91.com/api/sendotp.php?template=SAM&otp="+generatedOTP+"&otp_length=4&otp_expiry=3&sender=NORTHBBSR&message=Your OTP is"+generatedOTP+"&mobile=+91"+mobileNo+"&authkey=285000A8HDy92z5d296a68",
    // "headers": {}
    // };
    
    // var req = http.request(options, function (res) {
    //     var chunks = [];

    //     res.on("data", function (chunk) {
    //         chunks.push(chunk);
    //     });

    //     res.on("end", function () {
    //         var body = Buffer.concat(chunks);
    //         console.log("BODY.TOSTRING : ",body.toString());
    //     });
    // });

    // req.end();
    // res.send("SUCCESS");
