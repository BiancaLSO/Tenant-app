export const getCategoryData = (categoryName: string): string[] => {
  if (categoryName === "Kitchen") {
    return ["Broken sink", "Leaking pipes", "Broken appliances", "Clogged drain", "Water damage", "Faulty faucet"];
  } else if (categoryName === "Bathroom") {
    return [
      "Clogged toilet",
      "Low water pressure",
      "Faulty showerhead",
      "Drainage issues",
      "Broken tiles",
      "Mold or mildew",
      "Toilet running constantly",
      "Faulty bathroom fan",
      "Damaged bathtub or shower",
      "Water damage",
      "Cracked or leaking pipes",
    ];
  } else if (categoryName === "Parasites") {
    return ["Bed bugs", "Ants", "Cockroaches", "Termites", "Mosquitoes", "Mice", "Rats", "Squirrels", "Birds", "Snakes", "Bees or wasps", "Spiders", "Moths", "Dust mites", "Lice"];
  } else if (categoryName === "Heating") {
    return ["No heat", "Uneven heating", "Noisy heating system", "Thermostat issues", "Radiators not working", "Heating system maintenance", "Heating system upgrades"];
  } else if (categoryName === "Keys/Entrance") {
    return ["Broken key", "Lost key", "Key stuck in lock", "Lock not working", "Faulty doorknob", "Lockout situation"];
  } else {
    return [];
  }
};
