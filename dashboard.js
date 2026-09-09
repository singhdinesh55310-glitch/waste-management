const openComplaint = document.getElementById("openComplaint");
const complaintSection = document.getElementById("complaintSection");

const camera = document.getElementById("camera");
const captureBtn = document.getElementById("captureBtn");
const canvas = document.getElementById("canvas");

const locationStatus = document.getElementById("locationStatus");
const submitComplaint = document.getElementById("submitComplaint");
const complaintMessage = document.getElementById("complaintMessage");

let stream = null;
let latitude = null;
let longitude = null;
let photoData = null;


// ===============================
// OPEN COMPLAINT
// ===============================

openComplaint.addEventListener("click", async () => {

    // Complaint section show
    complaintSection.style.display = "block";

    // ===============================
    // OPEN CAMERA
    // ===============================

    try {

        stream = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: "environment"
            },
            audio: false
        });

        camera.srcObject = stream;

    } catch (error) {

        console.log(error);

        complaintMessage.innerText =
            "Camera permission denied";
    }


    // ===============================
    // GET GPS LOCATION
    // ===============================

    if (navigator.geolocation) {

        locationStatus.innerText =
            "Getting your location...";

        navigator.geolocation.getCurrentPosition(

            function(position) {

                latitude = position.coords.latitude;
                longitude = position.coords.longitude;

                locationStatus.innerText =
                    "Location detected successfully";

                console.log("Latitude:", latitude);
                console.log("Longitude:", longitude);

            },

            function(error) {

                console.log(error);

                locationStatus.innerText =
                    "Location permission denied";
            },

            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }
        );

    } else {

        locationStatus.innerText =
            "GPS not supported by this browser";
    }

});


// ===============================
// CAPTURE PHOTO
// ===============================

captureBtn.addEventListener("click", () => {

    if (!camera.videoWidth) {

        complaintMessage.innerText =
            "Camera is not ready yet";

        return;
    }

    const context = canvas.getContext("2d");

    canvas.width = camera.videoWidth;
    canvas.height = camera.videoHeight;

    context.drawImage(
        camera,
        0,
        0,
        canvas.width,
        canvas.height
    );

    // Convert image to data
    photoData = canvas.toDataURL("image/jpeg");

    complaintMessage.innerText =
        "Photo captured successfully";

});


// ===============================
// SUBMIT COMPLAINT
// ===============================

submitComplaint.addEventListener("click", async () => {

    // Check photo
    if (!photoData) {

        complaintMessage.innerText =
            "Please capture the dustbin photo";

        return;
    }


    // Check GPS
    if (latitude === null || longitude === null) {

        complaintMessage.innerText =
            "Location is not available yet";

        return;
    }


    // Get logged-in citizen ID
    const citizenId = localStorage.getItem("userId");

    if (!citizenId) {

        complaintMessage.innerText =
            "User not logged in";

        return;
    }


    complaintMessage.innerText =
        "Submitting complaint...";


    try {

        const response = await fetch(
            "http://localhost:5000/api/reports",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    citizenId: citizenId,

                    // Temporary dustbin ID
                    dustbinId: "DUSTBIN001",

                    photo: photoData,

                    latitude: latitude,

                    longitude: longitude

                })
            }
        );


        const data = await response.json();


        if (response.ok) {

            complaintMessage.innerText =
                "Complaint registered successfully!";


            // Stop camera
            if (stream) {

                stream.getTracks().forEach(
                    track => track.stop()
                );

            }

        } else {

            complaintMessage.innerText =
                data.message || "Complaint failed";
        }


    } catch (error) {

        console.log(error);

        complaintMessage.innerText =
            "Server connection failed";
    }

});async function findNearestDustbin() {

    try {

        const response = await fetch(
            `http://localhost:5000/api/dustbins/nearest?latitude=${latitude}&longitude=${longitude}`
        );

        const data = await response.json();

        if (response.ok) {

            console.log("Nearest Dustbin:", data);

            return data.dustbinId;

        } else {

            console.log(data.message);
            return null;
        }

    } catch (error) {

        console.log(error);
        return null;
    }
}async function loadTotalComplaints() {
    try {
        const response = await fetch(
            "http://localhost:5000/api/reports/count"
        );

        const data = await response.json();

        document.getElementById("totalComplaints").innerText =
            data.totalComplaints;

    } catch (error) {
        console.log(error);
    }
}

loadTotalComplaints();
const submitWaste = document.getElementById("submitWaste");

submitWaste.addEventListener("click", () => {

    const fileInput = document.getElementById("wastePhoto");
    const wasteType = document.getElementById("wasteType").value;
    const message = document.getElementById("wasteMessage");

    if (!fileInput.files[0]) {
        message.innerText = "Please upload a waste photo";
        return;
    }

    if (!wasteType) {
        message.innerText = "Please select waste type";
        return;
    }

    const citizenId = localStorage.getItem("userId");

    if (!citizenId) {
        message.innerText = "User not logged in";
        return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {

        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const reader = new FileReader();

        reader.onload = async function () {

            try {

                const response = await fetch(
                    "http://localhost:5000/api/waste-reports",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify({
                            citizenId: citizenId,
                            photo: reader.result,
                            wasteType: wasteType,
                            latitude: latitude,
                            longitude: longitude
                        })
                    }
                );

                const data = await response.json();

                if (response.ok) {
                    message.innerText =
                        "Waste report submitted successfully!";
                } else {
                    message.innerText =
                        data.message || "Report failed";
                }

            } catch (error) {

                console.log(error);
                message.innerText = "Server connection failed";

            }

        };

        reader.readAsDataURL(fileInput.files[0]);

    }, () => {

        message.innerText = "Location permission required";

    });

});