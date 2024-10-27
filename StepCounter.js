import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, Alert, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { Pedometer } from 'expo-sensors';
import styles from './styles';
import * as Progress from 'react-native-progress'; // Library for circle progress

export default function StepCounter({ navigation }) {
  const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking'); // check if the pedometer is available
  const [stepCount, setStepCount] = useState(0); //track steps
  const [dailyGoal, setDailyGoal] = useState(5000); // set daily default goal
  const [newGoal, setNewGoal] = useState(''); // Store new daily goal
  const [isEditingGoal, setIsEditingGoal] = useState(false); // toggle editing for daily goal
  const [quote, setQuote] = useState(''); // store the daily motivational qoutes


  // checks if pedometer is available - activate if available
  useEffect(() => {
    let subscription;
    Pedometer.isAvailableAsync().then(
      (result) => {
        setIsPedometerAvailable(String(result));
        if (result) {
          subscription = Pedometer.watchStepCount((result) => {
            setStepCount(result.steps);
          });
        }
      },
      (error) => {
        Alert.alert('Error', 'Could not access the step counter.');
        console.error('Pedometer error:', error);
      }
    );

    loadDailyGoal();  // loads daily step goal from SecureStore
    fetchQuote();  //fetch quote

    return () => {  //if app is re-installed - remove sub of pedometer
      if (subscription) {
        subscription.remove();
      }
    };
  }, []);

  // Function to load the daily steps from secureStore
  const loadDailyGoal = async () => {
    try {
      const savedGoal = await SecureStore.getItemAsync('daily_goal');
      if (savedGoal !== null) {
        setDailyGoal(parseInt(savedGoal, 10));
      }
    } catch (error) {
      Alert.alert('Error', 'Could not load the daily goal, please try again.');
      console.error('Failed to load daily goal:', error);
    }
  };

  // Function to save the new daily goal
  const saveDailyGoal = async () => {
    try {
      const goal = parseInt(newGoal, 10);
      if (!isNaN(goal) && goal > 0) {
        setDailyGoal(goal);
        await SecureStore.setItemAsync('daily_goal', goal.toString());
        Alert.alert('Success', 'Your daily goal has been updated');
        setNewGoal(''); // Empty the inputfield
        setIsEditingGoal(false); // Cancel the input
      } else {
        Alert.alert('Error', 'The daily target must be greater than 0.');
      }
    } catch (error) {
      Alert.alert('Error', 'Could not save the new goal, please try again.');
      console.error('Failed to save daily goal:', error);
    }
  };

  
  // fetch daily quote
  const fetchQuote = async () => {
    try {
      const response = await fetch('https://quotes-api-self.vercel.app/quote');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setQuote(data.quote);
    } catch (error) {
      Alert.alert('Error', 'Could not load the daily quote, please try again.');
      console.error('Failed to fetch quote:', error);
    }
  };

  // Function to save the daily steps taken, to the history screen
  const saveStepHistory = async () => {
    try {
      const currentDate = new Date().toLocaleDateString();
      let history = await SecureStore.getItemAsync('step_history');
      history = history ? JSON.parse(history) : [];

      // Add todays steps to the history
      history.push({ date: currentDate, steps: stepCount });

      // Save updated history
      await SecureStore.setItemAsync('step_history', JSON.stringify(history));
      Alert.alert('Success', 'Daily steps have been saved to your history');
    } catch (error) {
      Alert.alert('Error', 'Could not save the daily steps, please try again.');
      console.error('Failed to save step history:', error);
    }
  };

  const resetSteps = () => {
    setStepCount(0);
  };

  // Count the "filling-process" of the circle based on steps taken towards your daily goal
  const progress = stepCount / dailyGoal;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>The Step Counter</Text>
        <View style={styles.progressContainer}>
          <Progress.Circle
            size={200} // Size of the circle
            progress={progress > 1 ? 1 : progress} // Stops the circle to go past 100%
            showsText={true}
            color={'#0277bd'}
            borderWidth={5}
            thickness={20} 
            formatText={() => `${Math.min(Math.round(progress * 100), 100)}%`}
            unfilledColor={'#e0f2f1'} // Brighter background color
          />
        </View>

        <Text style={styles.stepCount}>Steps taken today: {stepCount}</Text>
        <Text style={styles.dailyGoal}>Daily goal: {dailyGoal} steps</Text>
        {stepCount >= dailyGoal ? (
          <Text style={styles.successText}>Congratz! You have reached your goal</Text>
        ) : (
          <Text style={styles.remainingSteps}>You have {dailyGoal - stepCount} steps left to reach your goal</Text>
        )}

        {isEditingGoal ? (
          <>
            <TextInput
              style={styles.input}
              placeholder="Submit new daily goal"
              keyboardType="numeric"
              value={newGoal}
              onChangeText={setNewGoal}
            />
            <TouchableOpacity style={styles.button} onPress={saveDailyGoal}>
              <Text style={styles.buttonText}>Update goal</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => setIsEditingGoal(false)}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity style={styles.button} onPress={() => setIsEditingGoal(true)}>
            <Text style={styles.buttonText}>Change daily goal</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.button} onPress={resetSteps}>
          <Text style={styles.buttonText}>Restart steps</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={saveStepHistory}>
          <Text style={styles.buttonText}>Save steps</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('History')}>
          <Text style={styles.buttonText}>Show history</Text>
        </TouchableOpacity>
        <Text style={styles.quote}>{quote ? `Daily quote: "${quote}"` : 'Loading daily quote...'}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}
