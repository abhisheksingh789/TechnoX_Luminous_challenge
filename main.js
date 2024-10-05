

// 4 button



// last use



document.getElementById("costBenefitButton").addEventListener("click", function() {
    const costBenefitDisplay = document.getElementById("costBenefitDisplay");
    if (costBenefitDisplay.classList.contains("hidden")) {
        costBenefitDisplay.classList.remove("hidden");
        startCostBenefitAnalysis();
    } else {
        costBenefitDisplay.classList.add("hidden");
    }
});

function startCostBenefitAnalysis() {
    const costBenefitChartCanvas = document.getElementById('costBenefitChart');
    if (!costBenefitChartCanvas) {
        console.error("Cost-Benefit chart element not found");
        return;
    }

    const ctx = costBenefitChartCanvas.getContext('2d');

    // Dummy data for potential and actual savings
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const withoutOptimization = [150, 200, 180, 220, 250, 230]; // Costs without optimization
    const withOptimization = [100, 150, 130, 170, 190, 180]; // Costs with optimization

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Cost Without Optimization ($)',
                    data: withoutOptimization,
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.3
                },
                {
                    label: 'Cost With Optimization ($)',
                    data: withOptimization,
                    borderColor: 'rgba(54, 162, 235, 1)',
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.3
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    suggestedMax: 300
                }
            }
        }
    });

    // Generate a cost-benefit analysis report
    generateCostBenefitReport(withoutOptimization, withOptimization);
}

function generateCostBenefitReport(withoutOptimization, withOptimization) {
    const totalWithoutOptimization = withoutOptimization.reduce((acc, val) => acc + val, 0);
    const totalWithOptimization = withOptimization.reduce((acc, val) => acc + val, 0);
    const savings = totalWithoutOptimization - totalWithOptimization;

    const costBenefitText = `
        Total cost without optimization over 6 months: $${totalWithoutOptimization}.
        Total cost with optimization over 6 months: $${totalWithOptimization}.
        Total savings achieved through optimization: $${savings}.
        By implementing optimization strategies, you could save approximately $${savings} over a 6-month period.
    `;

    document.getElementById("costBenefitText").innerText = costBenefitText;
}






document.getElementById("notificationsButton").addEventListener("click", function() {
    sendNotifications();
});

function sendNotifications() {
    // Make an API call to send notifications (emails)
    fetch('http://localhost:3000/send-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            recipients: [
                'manish.kumar21b@iiitg.ac.in',
                'abhishek.kumar21b@iiitg.ac.in',
                'harsh.rajput21b@iiitg.ac.in'
            ],
            subject: 'Tariff Alert and Solar Energy Update',
            message: `
                Tariff Alerts:
                Objective: Inform users about upcoming high-tariff periods.
                Approach: Send timely notifications with suggestions to minimize costs.

                Selling Excess Energy:
                Objective: Notify users when they can profitably sell excess solar energy back to the grid.
                Outcome: Users can make informed decisions to maximize their financial benefits.
            `
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Notifications sent successfully!');
        } else {
            alert('Failed to send notifications.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while sending notifications.');
    });
}





document.getElementById("tariffButton").addEventListener("click", function() {
    const priceDisplay = document.getElementById("priceDisplay");
    if (priceDisplay.classList.contains("hidden")) {
        priceDisplay.classList.remove("hidden");
        startTariffMonitoring();
    } else {
        priceDisplay.classList.add("hidden");
    }
});

document.getElementById("analyticsButton").addEventListener("click", function() {
    const analyticsDisplay = document.getElementById("analyticsDisplay");
    if (analyticsDisplay.classList.contains("hidden")) {
        analyticsDisplay.classList.remove("hidden");
        startEnergyConsumptionAnalytics();
    } else {
        analyticsDisplay.classList.add("hidden");
    }
});

document.getElementById("scheduleButton").addEventListener("click", function() {
    const scheduleDisplay = document.getElementById("scheduleDisplay");
    if (scheduleDisplay.classList.contains("hidden")) {
        scheduleDisplay.classList.remove("hidden");
        startSmartScheduling();
    } else {
        scheduleDisplay.classList.add("hidden");
    }
});



document.getElementById("solarButton").addEventListener("click", function() {
    const solarDisplay = document.getElementById("solarDisplay");
    if (solarDisplay.classList.contains("hidden")) {
        solarDisplay.classList.remove("hidden");
        startSolarEnergyManagement();
    } else {
        solarDisplay.classList.add("hidden");
    }
});


function startTariffMonitoring() {
    const tariffChartCanvas = document.getElementById('tariffChart');
    if (!tariffChartCanvas) {
        console.error("Tariff chart element not found");
        return;
    }
    const ctx = tariffChartCanvas.getContext('2d');
    const priceData = [];
    const labels = [];
    for (let i = 0; i < 5; i++) {
        labels.push(`${i + 1} min`);
        priceData.push(getRandomPrice());
    }
    const tariffChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Electricity Prices',
                data: priceData,
                borderColor: 'rgba(0, 123, 255, 1)',
                backgroundColor: 'rgba(0, 123, 255, 0.2)',
                borderWidth: 2,
                fill: true,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    suggestedMax: 15
                }
            }
        }
    });
    setInterval(function() {
        labels.push(`${labels.length + 1} min`);
        priceData.push(getRandomPrice());
        if (labels.length > 5) {
            labels.shift();
            priceData.shift();
        }
        tariffChart.update();
    }, 60000);
}

function startEnergyConsumptionAnalytics() {
    const consumptionChartCanvas = document.getElementById('consumptionChart');
    if (!consumptionChartCanvas) {
        console.error("Consumption chart element not found");
        return;
    }
    const ctx = consumptionChartCanvas.getContext('2d');
    const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);
    const consumptionData = hours.map(() => getRandomConsumption());
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: hours,
            datasets: [{
                label: 'Total Energy Consumption (kWh)',
                data: consumptionData,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    suggestedMax: 20
                }
            }
        }
    });
    generateEnergyReport(consumptionData);
}

function startSmartScheduling() {
    const tariffData = [7, 6, 9, 5, 8, 10, 6, 5, 7, 9, 11, 6, 5]; // Simulated tariff prices throughout the day
    const lowTariffPeriods = tariffData.reduce((acc, price, index) => {
        if (price <= 6) acc.push(index);
        return acc;
    }, []);

    const appliances = ['Washing Machine', 'Dishwasher', 'EV Charger'];
    const schedule = appliances.map(appliance => {
        return {
            appliance,
            scheduledHour: lowTariffPeriods[Math.floor(Math.random() * lowTariffPeriods.length)]
        };
    });

    let scheduleText = `Automated Scheduling Result:\n\n`;
    schedule.forEach(item => {
        scheduleText += `- ${item.appliance} is scheduled to run at hour ${item.scheduledHour}:00 to take advantage of low tariffs.\n`;
    });
    // scheduleText += `\nObjective: Shift high-energy appliances to low-tariff periods to optimize energy costs.`;

    document.getElementById("scheduleText").innerText = scheduleText;
}








function startSolarEnergyManagement() {
    const solarChartCanvas = document.getElementById('solarChart');
    if (!solarChartCanvas) {
        console.error("Solar chart element not found");
        return;
    }

    const ctx = solarChartCanvas.getContext('2d');
    const timeLabels = [];
    const solarProductionData = [];
    const batteryStorageData = [];
    let currentBatteryLevel = 50; // Initial battery level percentage

    const solarChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: timeLabels,
            datasets: [
                {
                    label: 'Solar Production (kW)',
                    data: solarProductionData,
                    borderColor: 'rgba(255, 206, 86, 1)',
                    backgroundColor: 'rgba(255, 206, 86, 0.2)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.3
                },
                {
                    label: 'Battery Storage Level (%)',
                    data: batteryStorageData,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.3
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    suggestedMax: 100
                }
            }
        }
    });

    setInterval(function() {
        // Simulate solar production between 0 and 10 kW
        const solarProduction = Math.floor(Math.random() * 10) + 1;

        // Update battery level: charge if production > consumption, discharge otherwise
        if (solarProduction > 5) {
            currentBatteryLevel = Math.min(100, currentBatteryLevel + 2); // Charge the battery
        } else {
            currentBatteryLevel = Math.max(0, currentBatteryLevel - 1); // Discharge the battery
        }

        // Update data
        const currentTime = new Date().toLocaleTimeString();
        timeLabels.push(currentTime);
        solarProductionData.push(solarProduction);
        batteryStorageData.push(currentBatteryLevel);

        if (timeLabels.length > 10) {
            timeLabels.shift();
            solarProductionData.shift();
            batteryStorageData.shift();
        }

        solarChart.update();

        // Update the battery storage report
        generateBatteryReport(currentBatteryLevel);
    }, 10000); // Update every 5 seconds
}














function getRandomPrice() {
    return Math.floor(Math.random() * (14 - 7 + 1)) + 7;
}

function getRandomConsumption() {
    return Math.floor(Math.random() * 20) + 1;
}

function generateEnergyReport(data) {
    const totalConsumption = data.reduce((acc, val) => acc + val, 0);
    const avgConsumption = (totalConsumption / data.length).toFixed(2);
    const peakConsumptionHour = data.indexOf(Math.max(...data));

    const reportText = `
        Total energy consumption today: ${totalConsumption} kWh.
        Average hourly consumption: ${avgConsumption} kWh.
        Peak consumption was at hour ${peakConsumptionHour}:00.
        Suggestion: To optimize usage, consider shifting some activities to off-peak hours to reduce costs.
    `;
    document.getElementById("reportText").innerText = reportText;
}




function generateBatteryReport(batteryLevel) {
    const batteryText = `
        Current battery level: ${batteryLevel}%.
        Objective: Optimize the use of stored solar energy.
        Approach: Manage battery charge/discharge cycles to use stored energy during peak tariff periods.
    `;
    document.getElementById("batteryText").innerText = batteryText;
}