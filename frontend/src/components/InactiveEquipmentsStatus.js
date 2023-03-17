function InactiveEquipmentsStatus({ equipments }) {
  const thirtyMinutesAgo = new Date();
  thirtyMinutesAgo.setMinutes(thirtyMinutesAgo.getMinutes() - 30);

  const inactiveEquipments = equipments.filter((equipment) => {
    const lastMessageTimestamp = equipment.last_power_off
      ? new Date(equipment.last_power_off)
      : new Date(equipment.last_power_on);
    return lastMessageTimestamp && lastMessageTimestamp <= thirtyMinutesAgo;
  });

  const now = new Date();
  const inactiveEquipmentsStatus = equipments.map((equipment) => {
    const lastMessageTimestamp = equipment.last_power_off
      ? new Date(equipment.last_power_off)
      : new Date(equipment.last_power_on);
    const diffInMs = now - lastMessageTimestamp;
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));

    if (diffInMinutes > 30 && !inactiveEquipments.includes(equipment)) {
      return {
        ...equipment,
        status: "Critical",
      };
    }

    if (diffInMinutes > 1440) {
      return {
        ...equipment,
        status: "Critical",
      };
    }

    return {
      ...equipment,
      status: "Warning",
    };
  });

  return (
    <div>
      <h2>Equipamentos inativos:</h2>
      <ul>
      {inactiveEquipmentsStatus.map((equipment) => {
      const lastPowerOnTimestamp = equipment.last_power_on ? new Date(equipment.last_power_on) : null;
      const lastPowerOffTimestamp = equipment.last_power_off ? new Date(equipment.last_power_off) : null;
      const diffInMs = now - (lastPowerOffTimestamp || lastPowerOnTimestamp);

  if (lastPowerOnTimestamp && lastPowerOnTimestamp > thirtyMinutesAgo) {
    return null;
  }

  return (
    <li key={equipment.imei}>
      {equipment.imei} - Última mensagem há{" "}
      {lastPowerOffTimestamp && Math.floor(diffInMs / (1000 * 60 * 60))}
      {lastPowerOnTimestamp && !lastPowerOffTimestamp && Math.floor(diffInMs / (1000 * 60 * 60))}
      {lastPowerOnTimestamp && !lastPowerOffTimestamp && (
        <span>
          {" "}
          horas ({equipment.status})
        </span>
      )}
      {lastPowerOffTimestamp && (
        <span>
          {" "}
          horas ({equipment.status})
        </span>
      )}
    </li>
      );
    })}
      </ul>
      <h2>Sugestões de ações para equipamentos com falhas:</h2>
        <ul>
          {equipments.map((equipment) => {
            if (equipment.errorCode) {
              return (
                <li key={equipment.imei}>
                  {equipment.imei} - {equipment.errorDescription}
                </li>
              );
            } else {
              return null;
            }
          })}
        </ul>
    </div>
  );
}

export default InactiveEquipmentsStatus;
