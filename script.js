document.addEventListener("DOMContentLoaded", function () {    const trackingNumber = "1234567890123";  // Set the tracking number
    const statusUpdates = [        { date: "2024-02-05", status: "Shipment Received – New York, NY" },        { date: "2024-02-06", status: "Dispatched from Facility – Newark, NJ" },        { date: "2024-02-07", status: "In Transit – Philadelphia, PA" },        { date: "2024-02-08", status: "Arrived at Sorting Center – Washington, DC" },        { date: "2024-02-09", status: "Departed Facility – Richmond, VA" },        { date: "2024-02-10", status: "Out for Delivery – Baltimore, MD" },        { date: "2024-02-11", status: "Delivery Attempted – Unable to Deliver" },        { date: "2024-02-12", status: "On Hold – Contact USPS" }    ];
    function getTrackingUpdate() {        const inputTracking = document.getElementById("tracking-number").value;        const resultDiv = document.getElementById("tracking-result");
        if (inputTracking !== trackingNumber) {            resultDiv.innerHTML = `<p style="color: red;"><strong>Tracking Number Not Found</strong></p>`;            return;        }
        const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format        let latestUpdate = "Tracking Number Not Found"; // Default message
        for (let i = 0; i < statusUpdates.length; i++) {            if (statusUpdates[i].date === today) {                latestUpdate = statusUpdates[i].status;                break;            } else if (new Date(statusUpdates[i].date) < new Date(today)) {                latestUpdate = statusUpdates[i].status;            }        }
        resultDiv.innerHTML = `            <p><strong>Status:</strong> ${latestUpdate}</p>            <p><strong>Date:</strong> ${today}</p>        `;    }
    document.getElementById("track-btn").addEventListener("click", function () {        getTrackingUpdate();    });});
