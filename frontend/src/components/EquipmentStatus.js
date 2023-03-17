import React, { useState, useEffect } from "react";
import Chart from "chart.js";

function EquipmentStatus() {
  const [equipments, setEquipments] = useState([]);

  useEffect(() => {
    const fetchEquipments = async () => {
      try {
        const response = await fetch('/equipment');
        const fetchedEquipments = await response.json();
        setEquipments(fetchedEquipments);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEquipments();
  }, []);

  useEffect(() => {
    const thirtyMinutesAgo = new Date();
    thirtyMinutesAgo.setMinutes(thirtyMinutesAgo.getMinutes() - 30);
  
    const activeEquipments = equipments.filter((equipment) => {
      const lastPowerOnTimestamp = new Date(equipment.last_power_on);
      return lastPowerOnTimestamp > thirtyMinutesAgo && !equipment.last_power_off;
    });
  
    const inactiveEquipments = equipments.filter((equipment) => {
      const lastPowerOnTimestamp = new Date(equipment.last_power_on);
      return (lastPowerOnTimestamp <= thirtyMinutesAgo && !equipment.last_power_off) || equipment.last_power_off;
    });
  
    const activeCount = activeEquipments.length;
    const inactiveCount = inactiveEquipments.length;
  
    const chartData = {
      labels: ["Equipamentos ligados", "Equipamentos desligados"],
      datasets: [
        {
          data: [activeCount, inactiveCount],
          backgroundColor: ["green", "red"],
        },
      ],
    };
  
    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    };
  
    const ctx = document.getElementById("equipment-status-chart").getContext("2d");
    const chart = new Chart(ctx, {
      type: "pie",
      data: chartData,
      options: chartOptions,
    });
  
    return () => {
      chart.destroy();
    };
  }, [equipments]);

  return (
    <div>
      <h2>Status dos equipamentos:</h2>
      <canvas id="equipment-status-chart"></canvas>
    </div>
  );
}

export default EquipmentStatus;
