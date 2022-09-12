import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello word!!</Text>
      <Button title="Send 1"/>
      <Button title="Send 2"/>
      <Button title="Send 3"/>
      <Button title="Send 4"/>
      <Button title="Send 5"/>
      <StatusBar style="auto" backgroundColor='yellow'/>
    </View>
  );
}

interface ButtonProps {
  title: string
}

function Button(props: ButtonProps){
  return (
    <TouchableOpacity>
      <Text style={styles.button}>
        {props.title}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 22
  },
  button: {
    color: '#fff',
    borderStyle: 'dashed',
    borderColor: '#fff'
  }
});