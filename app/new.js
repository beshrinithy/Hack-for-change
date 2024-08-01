'use client'
import { get, ref } from 'firebase/database';
import { useEffect, useState } from 'react';
import { database } from './firebaseConfig';

export default function Home() {
  const [IRValues, setIRValues] = useState([]);
  const [fillLevel, setFillLevel] = useState(0);

  useEffect(() => {
    const fetchIRValues = async () => {
      try {
        const IRRef = ref(database, 'IR');
        const snapshot = await get(IRRef);
        if (snapshot.exists()) {
          const IRData = snapshot.val();
          const IRArray = Object.entries(IRData).map(([key, value]) => ({
            id: key,
            value: value,
          }));
          setIRValues(IRArray);

          // Calculate fill level based on values
          const fillLevelValue = calculateFillLevel(IRArray);
          setFillLevel(fillLevelValue);
        } else {
          console.log('No data available');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchIRValues();
  }, []);

  // Function to calculate fill level based on values
 // Function to calculate fill level based on values
const calculateFillLevel = (IRArray) => {
  const values = IRArray.map((IRItem) => IRItem.value);
  const [irSensorState1, irSensorState2, irSensorState3, irSensorState4] = values;

  if (irSensorState1 === 0 && irSensorState2 === 1 && irSensorState3 === 1 && irSensorState4 === 1) {
    return 25; // 25% dustbin fill
  } else if (irSensorState1 === 0 && irSensorState2 === 0 && irSensorState3 === 1 && irSensorState4 === 1) {
    return 50; // 50% dustbin fill
  } else if (irSensorState1 === 0 && irSensorState2 === 0 && irSensorState3 === 0 && irSensorState4 === 1) {
    return 75; // 75% dustbin fill
  } else if (irSensorState1 === 0 && irSensorState2 === 0 && irSensorState3 === 0 && irSensorState4 === 0) {
    return 100; // 100% dustbin fill
  } else {
    return 0; // Other cases
  }
};


  return (
    <main>
      <h1>Fetch data from Firebase</h1>
      <div className='grid grid-cols-2 gap-4'>
        {IRValues.map((IRItem) => (
          <div key={IRItem.id}>
            <h2>Key: {IRItem.id}</h2>
            <p>Value: {IRItem.value}</p>
          </div>
        ))}
      </div>
      <div className='mt-4'>
        <h2>Dustbin Fill Level: {fillLevel}%</h2>
      </div>
    </main>
  );
}
