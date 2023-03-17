import React, { useState, useEffect } from "react";

function ActiveEquipments() {
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

  const thirtyMinutesAgo = new Date();
  thirtyMinutesAgo.setMinutes(thirtyMinutesAgo.getMinutes() - 30);

  const activeEquipments = equipments.filter((equipment) => {
    const lastMessageTimestamp = new Date(equipment.last_power_on);
    return equipment.tag === "poweron" && lastMessageTimestamp > thirtyMinutesAgo;
  });

  return (
    <div>
      <h2>Equipamentos ativos:</h2>
      <ul>
        {activeEquipments.map((equipment) => (
          <li key={equipment.imei}>
            {equipment.imei}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ActiveEquipments;
