import React, { useState, useEffect } from "react";
import axios from "axios";
import ActiveEquipments from "./components/ActiveEquipments";
import EquipmentList from './components/EquipmentList'
import EquipmentStatus from "./components/EquipmentStatus";

function App() {
  const [equipments, setEquipments] = useState([]);

  const fetchEquipments = async () => {
    try {
      const response = await axios.get("/equipment");
      const data = response.data;
      console.log('eae', data);
      setEquipments(data);
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(() => {
    fetchEquipments();
  }, []);

  return (
    <div>
      <ActiveEquipments equipments={equipments} />
      <EquipmentList equipments={equipments} />
      <EquipmentStatus equipments={equipments} />
    </div>
  );
}

export default App;
