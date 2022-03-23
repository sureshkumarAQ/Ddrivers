var Driverdb = require('../model/drivermodel');
var Dealerdb = require('../model/model');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Create and save new Driver
exports.registerDriver= async(req,res)=>{
    //Validate request
    if(!req.body)
    {
        res.status(400).send({message:"Content can not be empty"});
        return;
    }

    // Store all data in Driver object
    const driver = await new Driverdb({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        number:req.body.number,
        tname:req.body.tname,
        tnumber:req.body.tnumber,
        age:req.body.age,
        experience:req.body.experience,
        capacity:req.body.capacity,
        route:req.body.route
    })

     // zwt create a new tokken
     const token =  await jwt.sign({id:driver._id},process.env.JWT_SECRET);
     //save Driver token
     driver.token = token;

    // Save Driver in the database
    driver.save(driver).then(data=>{
        // res.status(201).send(data)
        res.redirect('/bookedDealers');
    })
    .catch(err=>{
        res.status(500).send({
            message:err.message||"Some error occurred while creating a a new account"
        });
    });
}

// Login Driver
exports.loginDriver = async (req,res)=>{

    //get user data
    try {

        //Validate request
        if(!req.body)
        {
            res.status(400).send({message:"Fill email and password"});
            return;
        }

        const {email,password} = req.body

        if(!email || !password)
           return res.status(406).send({err:"Not all field have been entered"});

        // Check if user is already exist or not
        const driver = await Driverdb.findOne({email});
        if(!driver)
        {
            return res.status(406).send({err:"No account with this email"});
        }
        // Compare password
         const isMatch = await bcrypt.compare(password,driver.password);
        if(!isMatch)
           return res.status(406).send({err:"Invalid Credentials"});


        // zwt create a new tokken
       const token = jwt.sign({id:driver._id},process.env.JWT_SECRET);
       //save Driver token
       driver.token = token;

         //Store jwt-token in cookie
       res.cookie("jwtoken",token,{
        expires:new Date(Date.now()+10*24*60*60*1000),
        httpOnly:true
        })

        res.send({token,number:driver.number,email:driver.email});
        // res.redirect('/bookedDealers');
        
    } catch (err) {
        res.status(500).send({err:error.message||"Error while Login"})
    }
}


exports.driverLogout = async(req,res)=>{
    
    try {
        res.clearCookie('jwtoken')
        res.redirect('/driver/login')
    } catch (error) {
        res.status(500).send(error)
    }

}
//retrieve and return all drivers whose route is same as loged in Dealer
exports.find = async(req,res)=>{

    if(req.query.id)
    {
        const id  = req.query.id;

       await Driverdb.findById(id)
            .then(data=>{
                if(!data){
                    res.status(404).send({message:"Not found user with id "+id})
                }
                else{
                    res.send(data)
                }
            })
            .catch(err=>{
                res.status(500).send({
                    message:err.message||"Some error occurred while creating a create operation"
                });
            });
    }
    else{

        const dealerID = req.dealer._id;//Loged In dealer ID

        if(!dealerID)
        {
            res.status(500).send("Please login")
        }

        const LogedInDealer = await Dealerdb.findById(dealerID);

        // console.log(dealerID)
        // console.log(LogedInDealer)

        const dealerCity = LogedInDealer.city;

        // console.log(dealerCity)




       await Driverdb.find({route:dealerCity}).select('-password -dealers -__v').then(driver=>{
           if(!driver[0])
           {
               res.status(200).send("No driver available in your city")
           }
           else
            res.status(200).send(driver)
        })
        .catch(err=>{
            res.status(500).send({
                message:err.message||"Some error occurred while creating a create operation"
            });
        });
    }
}


// Delete Driver
exports.deleteDriver = async(req,res)=>{

    try {
        

    } catch (err) {
        res.status(500).send({err:error.message||"Error while deleting Driver"})
    }

}