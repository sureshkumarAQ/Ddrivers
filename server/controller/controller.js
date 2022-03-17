var Dealerdb = require('../model/model.js');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Driverdb = require('../model/drivermodel.js');



//Create and save new Dealer
exports.registerDealer= async(req,res)=>{
    //Validate request
    if(!req.body)
    {
        res.status(400).send({message:"Content can not be empty"});
        return;
    }

    // Store all data in dealer object
    const dealer = await new Dealerdb({
        name:req.body.name,
        email:req.body.email,
        number:req.body.number,
        password:req.body.password,
        material:req.body.material,
        weight:req.body.weight,
        quantity:req.body.quantity,
        city:req.body.city,
        state:req.body.state,
    })

     // zwt create a new tokken
     const token =  jwt.sign({id:dealer._id},process.env.JWT_SECRET);
     //save dealer token
     dealer.token = token;

    // Save dealer in the database
    await dealer.save(dealer).then(data=>{
        // res.status(201).send(data)
        res.redirect('/dealer/login');
    })
    .catch(err=>{
        res.status(500).send({
            message:err.message||"Some error occurred while creating a a new account"
        });
    });
}

// Login dealer
exports.loginDealer = async (req,res)=>{

    //get user data
    try {

        //Validate request
        if(!req.body)
        {
            res.status(400).send({message:"Fill email and password"});
            return;
        }

        const email = req.body.email;
        const password = req.body.password;

        if(!email || !password)
           return res.status(406).send({err:"Not all field have been entered"});

        // Check if user is already exist or not
        const dealer = await Dealerdb.findOne({email});
        if(!dealer)
        {
            return res.status(406).send({err:"No account with this email"});
        }
        // Compare password
        const isMatch = await bcrypt.compare(password,dealer.password);
        if(!isMatch)
           return res.status(406).send({err:"Invalid Credentials"});
 
        // zwt create a new tokken
       const token =  jwt.sign({id:dealer._id},process.env.JWT_SECRET);
       //save dealer token
       dealer.token = token;

       //Store jwt-token in cookie
       res.cookie("jwtoken",token,{
           expires:new Date(Date.now()+10*24*60*60*1000),
           httpOnly:true
       })

        // res.send({token,number:dealer.number,email:dealer.email});
        res.redirect('/drivers');
        
    } catch (err) {
        res.status(500).send("Error while Login")
    }
}



//retrieve and return all dealers/retrive and return a single dealer
exports.find = async(req,res)=>{

    if(req.query.id)
    {
        const id  = req.query.id;

        await Dealerdb.findById(id)
            .then(data=>{
                if(!data){
                    res.status(404).send({message:"Not found user with id "+id})
                }
                else{
                    res.send(data);
                }
            })
            .catch(err=>{
                res.status(500).send({
                    message:err.message||"Some error occurred while creating a create operation"
                });
            });
    }
    else{
       const driverID = req.driver._id;
       if(!driverID)
        {
            res.status(400).send({message:"Please Login"});
            return;
        }
    
        const driver  = await Driverdb.findById(driverID);
        

        if(!driver)
        {
            res.status(400).send({message:"Driver not exist"});
            return;
        }
    
       await Dealerdb.find({bookedDriverEmail:driver.email}).then(dealer=>{
            res.send(dealer)
        })
        .catch(err=>{
            res.status(500).send({
                message:err.message||"Some error occurred while creating a create operation"
            });
        });
    }
}

exports.bookDriver = async(req,res)=>{
    if(!req.body)
    {
        res.status(400).send({message:"Please enter driver Email"});
        return;
    }
    try {

        // Driver Email ID
        const dealerID = req.dealer._id;
        const driverEmail = req.body.driveremail;
        if(!driverEmail)
        {
            res.status(400).send({message:"Please enter driver Email"});
            return;
        }
    
        const driver  = await Driverdb.find({email:driverEmail});
        

        if(!driver)
        {
            res.status(400).send({message:"Driver not exist"});
            return;
        }
    
        await Dealerdb.findByIdAndUpdate(dealerID, {bookedDriverEmail: driverEmail},async (err, dealer) =>{
            if (err){
                console.log(err)
            }
            else{
                console.log("Driver booked Successfully ");
                res.status(200).send(dealer);
            }
        });

        
    } catch (error) {
        res.status(500).send({
                message:err.message||"Some error occurred while creating a create operation"
        });
    }

    

}


exports.dealerLogout = async(req,res)=>{
    
    try {
        res.clearCookie('jwtoken')
        res.redirect('/dealer/login')
    } catch (error) {
        res.status(500).send(error)
    }

}
// Delete DEaler
exports.deleteDealer = async(req,res)=>{

    try {
        

    } catch (err) {
        res.status(500).send({err:error.message||"Error while deleting dealer"})
    }

}