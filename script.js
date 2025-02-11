function generateTrackingHistory(startDate) {
    let trackingHistory = [];
    
    let locations = [
        "Los Angeles, CA", "Phoenix, AZ", "Dallas, TX",
        "Memphis, TN", "Washington, DC", "Philadelphia, PA",
        "New York, NY", "Newark, NJ", "Customs Check", "USPS Facility"
    ];
    
    let statuses = [
        "Shipment Received", "Dispatched from Facility", "In Transit",
        "Arrived at Sorting Center", "In Transit", "Processing at USPS Facility",
        "Out for Delivery", "Processing Delay", "Held for Inspection", "Package on Hold"
    ];

    let progressValues = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

    let today = new Date();
    
    for (let i = 0; i < locations.length; i++) {
        let newDate = new Date(startDate);
        newDate.setDate(startDate.getDate() + i);

        if (newDate <= today) {
            trackingHistory.push({
                date: newDate.toDateString(),
                location: locations[i],
                status: statuses[i],
                progress: progressValues[i]
            });
        }
    }

    return trackingHistory;
}

function trackPackage() {
    const trackingNumber = document.getElementById("trackingInput").value;
    
    if (!trackingNumber.match(/^\d{13}$/)) {
        alert("Invalid tracking number! Must be 13 digits.");
        return;
    }

    document.getElementById("trackingResult").classList.remove("hidden");

    if (!trackingData[trackingNumber]) {
        trackingData[trackingNumber] = generateTrackingHistory(new Date("2024-02-01")); // Set the start date
    }

    const updates = trackingData[trackingNumber];

    let tableHTML = "<tr><th>Date</th><th>Location</th><th>Status</th></tr>";
    updates.forEach(update => {
        tableHTML += `<tr><td>${update.date}</td><td>${update.location}</td><td>${update.status}</td></tr>`;
    });

    document.getElementById("trackingTable").innerHTML = tableHTML;
    document.getElementById("trackingStatus").innerText = "Current Status: " + updates[updates.length - 1].status;
    document.getElementById("progressBar").style.width = updates[updates.length - 1].progress + "%";
}

let trackingData = {};
