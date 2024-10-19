import { StyleSheet, View, Pressable, Text, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

type Props = {
  label: string;
  theme?: 'primary' | 'add' | 'remove' | 'removeItem';
  onPress?: () => void;
};

export default function Button({ label, theme, onPress }: Props) {
  if (theme === 'primary') {
    return (
      <View
        style={[
          styles.buttonContainer,
          { borderWidth: 3, borderColor: '#1aac00', borderRadius: 18 },
        ]}>
        <Pressable
          style={[styles.button, { backgroundColor: '#fff' }]} onPress={onPress}>
          <FontAwesome name="picture-o" size={18} color="#25292e" style={styles.buttonIcon} />
          <Text style={[styles.buttonLabel, { color: '#25292e' }]}>{label}</Text>
        </Pressable>
      </View>
    );
  }
  else if (theme === 'add') {
    return (
      <TouchableOpacity style={styles.addButton} onPress={onPress}>
        <View style={styles.addButtonInner}>
          <Text style={styles.addButtonLabel}>+</Text>
        </View>
      </TouchableOpacity>
    );
  }
  else if (theme === 'remove') {
    return (
      <TouchableOpacity style={styles.addButton} onPress={onPress}>
        <View style={styles.addButtonInner}>
          <Text style={styles.addButtonLabel}>-</Text>
        </View>
      </TouchableOpacity>
    );
  }
  else if (theme === 'removeItem') {
    return (
      <TouchableOpacity style={styles.removeItemButton} onPress={onPress}>
        <View style={styles.addButtonInner}>
          <Text style={styles.addButtonLabel}>x</Text>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.buttonContainer}>
      <Pressable style={styles.button} onPress={() => alert('You pressed a button.')}>
        <Text style={styles.buttonLabel}>{label}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 320,
    height: 68,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
  },
  button: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonIcon: {
    paddingRight: 8,
  },
  buttonLabel: {
    color: '#fff',
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#2196F3', // Example color
    borderRadius: 50,
    padding: 10,
    elevation: 2, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    width: 50,   

    shadowRadius: 3.84,
  },
  addButtonInner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonLabel: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  removeItemButton: {
    backgroundColor: 'red', // Example color
    borderRadius: 6,
    padding: 0,
    margin: 0,
    textAlign: 'center',
    elevation: 2, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    width: 18,
    height: 18,

    shadowRadius: 3.84,
  },
});
