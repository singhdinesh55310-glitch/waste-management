const bcrypt= require("bcrypt");
const express = require("express");
const cors=require("cors");
const mongoose=require("mongoose");
const User=require("./models/user");
const Report=require("./models/report")
const Dustbin=require("./models/dustbin");
const WasteReport=require("./models/wastereport");
const app=express();
app.use(cors());
app.use(express.json());
app.get("/",(req,res)=>{
    res.send("Backend is working!");
});
// CITIZEN REGISTRATION API
app.post("/api/auth/register",async (req,res)=>{try{
        const{name,email,phone,password,confirmPassword}=req.body;
    if(!name||!email||!phone||!password||!confirmPassword){
        return res.status(400).json({
            message: "All fiels are mendatory"
    });}
    if(password!==confirmPassword){
        return res.status(400).json({
            message:"Password and confirm password do not match"});}
     const existingEmail=await User.findOne({email});
    if(existingEmail){
        return res.status(400).json({
            message:"Email already exists"
        });}
        const existingPhone=await User.findOne({phone});
    if(existingPhone){
        return res.status(400).json({
            message:"Phone number already exists"
        });}
        const hashedPassword=await
        bcrypt.hash(password,10);
        const user=new User({name,email,
            phone,password:hashedPassword, role:"citizen"});
        await user.save();
        res.status(201).json({
            message:"Citizen registerd succesfully"
        });
    } catch (error){
        res.status(500).json
({
    message:"Server error", error:error.meassage
});   } });
app.post("/api/auth/login",async (req,res)=>{
    try{
        const{email,password}=req.body;
        if(!email||!password){
            return res.status(400).json({
                message:"Email and password are required"
            });
        }
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({
                message:"Invalid email or password"
            });
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({
                message:"Invalid email or password"
            });
        }
        res.status(200).json({
            message:"Login successful"
        });
    } catch (error){
        res.status(500).json({
            message:"Server error", error:error.message
        });
    }
});
app.get("/api/dustbins/nearest", async (req, res) => {
    try {
        const { latitude, longitude } = req.query;

        if (latitude === undefined || longitude === undefined) {
            return res.status(400).json({
                message: "Latitude and longitude are required"
            });
        }

        const userLat = Number(latitude);
        const userLng = Number(longitude);

        const dustbins = await Dustbin.find();

        if (dustbins.length === 0) {
            return res.status(404).json({
                message: "No dustbins found"
            });
        }

        let nearestDustbin = null;
        let shortestDistance = Infinity;

        dustbins.forEach((dustbin) => {

            const latDifference =
                userLat - dustbin.latitude;

            const lngDifference =
                userLng - dustbin.longitude;

            const distance =
                Math.sqrt(
                    latDifference * latDifference +
                    lngDifference * lngDifference
                );

            if (distance < shortestDistance) {
                shortestDistance = distance;
                nearestDustbin = dustbin;
            }
        });

        res.json({
            dustbinId: nearestDustbin.dustbinId,
            area: nearestDustbin.area,
            latitude: nearestDustbin.latitude,
            longitude: nearestDustbin.longitude
        });

    } catch (error) {

        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
});
app.post("/api/dustbins", async (req, res) => {
    try {
        const {
            dustbinId,
            area,
            latitude,
            longitude
        } = req.body;

        if (!dustbinId || !area || latitude === undefined || longitude === undefined) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const existingDustbin = await Dustbin.findOne({ dustbinId });

        if (existingDustbin) {
            return res.status(400).json({
                message: "Dustbin ID already exists"
            });
        }

        const dustbin = new Dustbin({
            dustbinId,
            area,
            latitude,
            longitude
        });

        await dustbin.save();

        res.status(201).json({
            message: "Dustbin added successfully",
            dustbin
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
});
app.post("/api/reports", async (req, res) => {
    try {
        const {
            citizenId,
            dustbinId,
            photo,
            latitude,
            longitude
        } = req.body;

        if (
            !citizenId ||
            !dustbinId ||
            !photo ||
            latitude === undefined || 
            longitude === undefined
        ) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const report = new Report({
            citizenId,
            dustbinId,
            photo,
            latitude,
            longitude
        });

        await report.save();

        res.status(201).json({
            message: "Report submitted successfully",
            report
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
});
app.post("/api/waste-reports", async (req, res) => {

    try {

        const {
            citizenId,
            photo,
            wasteType,
            latitude,
            longitude
        } = req.body;

        if (
            !citizenId ||
            !photo ||
            !wasteType ||
            latitude === undefined ||
            longitude === undefined
        ) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const report = new WasteReport({
            citizenId,
            photo,
            wasteType,
            latitude,
            longitude
        });

        await report.save();

        res.status(201).json({
            message: "Waste report submitted successfully",
            report
        });

    } catch (error) {

        res.status(500).json({
            message: "Server error",
            error: error.message
        });

    }

});

mongoose.connect("mongodb://127.0.0.1:27017/waste_management")
.then(()=>{
    console.log("Connected to MongoDB successfully!");})
.catch((err)=>{
    console.log("Error connecting to MongoDB:",error);
});
const PORT=5000;
app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`);
});