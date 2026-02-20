import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from './firebaseConfig';
import { sampleStudySpots } from '../data/sampleData';

export const initializeFirestore = async () => {
  try {
    // Check if studySpots collection exists and has data
    const studySpotsRef = collection(db, 'studySpots');
    const snapshot = await getDocs(studySpotsRef);
    
    if (snapshot.empty) {
      // Add sample study spots without the id field
      const addPromises = sampleStudySpots.map(({ id, ...spotData }) => 
        addDoc(studySpotsRef, {
          ...spotData,
          amenities: spotData.amenities || []
        })
      );
      await Promise.all(addPromises);
      console.log('Study spots initialized successfully');
    }
  } catch (error) {
    console.error('Error initializing study spots:', error);
  }
}; 