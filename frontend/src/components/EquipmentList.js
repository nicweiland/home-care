import React, { useState, useEffect } from "react";

import InactiveEquipmentsStatus from "./InactiveEquipmentsStatus";

function EquipmentList() {
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

  return (
    <div>
      <InactiveEquipmentsStatus equipments={equipments} />
    </div>
  );
}

export default EquipmentList;
