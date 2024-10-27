// HistoryScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import styles from './styles';

export default function HistoryScreen() {
  const [stepHistory, setStepHistory] = useState([]); // variable for history of steps taken at specific date
  const [avgSteps, setAvgSteps] = useState(0);  //variable for avg-steps taken

  useEffect(() => {
    loadStepHistory();  //loads step history from secureStore
    loadAvgSteps();    //loads avgsteps from secureStore
  }, []);

  const loadStepHistory = async () => {
    try {
      let history = await SecureStore.getItemAsync('step_history');
      if (history) {
        const stepHistory = JSON.parse(history);
        setStepHistory(JSON.parse(history));

        // This function calculates the avg-steps taken based on the historical data
        if (stepHistory.length > 0) {
            const totalSteps = stepHistory.reduce((sum, entry) => sum + entry.steps, 0);
            const average = Math.round(totalSteps / stepHistory.length);
            setAvgSteps(average);

            await SecureStore.setItemAsync('avg_steps', average.toString());
        }
      }
    } catch (error) {
      console.error('Failed to load step history:', error);
    }
  };

  const loadAvgSteps = async () => {
    try {
        const savedAvgSteps = await SecureStore.getItemAsync('avg_steps');
        if (savedAvgSteps !== null) {
            setAvgSteps(parseInt(savedAvgSteps, 10));
        } 
    } catch (error) {
        console.error('Failed to load average steps:', error);
    }
        
    
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.avgBox}>
        <Text style={[styles.label,{color: 'white'}] }>Average steps: {avgSteps}</Text>
        </View>
        <Text style={styles.header}>Historical data:</Text>
        {stepHistory.length > 0 ? (
          stepHistory.map((entry, index) => (
            <Text key={index} style={styles.label}>Date: {entry.date}, Steps: {entry.steps}</Text>
          ))
        ) : (
          <Text style={styles.label}>No history available.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
