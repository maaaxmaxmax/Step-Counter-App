import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f7fa', // Light blue background for a calming effect
  },
  scrollContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0277bd', // Darker blue for contrast
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#01579b', // Medium blue for text labels
    marginVertical: 10,
  },
  stepCount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0288d1', // Another shade of blue for important information
    marginVertical: 10,
  },
  dailyGoal: {
    fontSize: 18,
    color: '#039be5', // Light blue for goal information
    marginVertical: 10,
  },
  successText: {
    color: '#1e88e5', // Bright blue for success messages
    fontWeight: 'bold',
    marginVertical: 10,
  },
  remainingSteps: {
    color: '#64b5f6', // Softer blue for remaining steps
    fontWeight: 'bold',
    marginVertical: 10,
  },
  input: {
    height: 40,
    borderColor: '#0277bd',
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
    width: '80%',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#0288d1', // Blue color for buttons
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  quote: {
    marginTop: 20,
    fontStyle: 'italic',
    textAlign: 'center',
    color: '#01579b', // Blue for quote text
  },

  avgBox: {
    backgroundColor: '#0288d1', 
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginVertical: 20,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avgBoxText: {
    color: '#FFFFFF',  //I also put the white text directly in the textview in Historyscreen because it wouldnt load from styles.css
    fontSize: 18,
    fontWeight: 'bold',
  },

  progressContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  
});
