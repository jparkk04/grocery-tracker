import { StyleSheet, View, Pressable, Text, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

type Props = {
  label: string;
  theme?: 'primary' | 'add' | 'remove' | 'removeItem' | 'createRecipe' | 'removeAll';
  onPress?: () => void;
};

export default function Button({ label, theme, onPress }: Props) {
  if (theme === 'primary') {
    return (
      <View
        style={[
          styles.buttonContainer,
          { margin: 4 },
        ]}>
        <Pressable
          style={[styles.button, { backgroundColor: '#2196F3' }]} onPress={onPress}>
          <FontAwesome name="picture-o" size={18} color="white" style={styles.buttonIcon} />
          <Text style={[styles.buttonLabel, { color: 'white' }]}>{label}</Text>
        </Pressable>
      </View>
    );
  }
  else if (theme === 'add') {
    return (
      <View
        style={[
          { height: 48, width: 156, },
        ]}>
        <Pressable
          style={[styles.button, { backgroundColor: '#2196F3' }]} onPress={onPress}>
          <FontAwesome name="plus" size={12} color="white" style={styles.buttonIcon} />
          <Text style={[styles.buttonLabel, { color: 'white' }]}>Add Items</Text>
        </Pressable>
      </View>
    );
  }
  else if (theme === 'remove') {
    return (
      <View
        style={[
          { height: 48, width: 156, },
        ]}>
        <Pressable
          style={[styles.button, { backgroundColor: '#2196F3' }]} onPress={onPress}>
          <FontAwesome name="remove" size={12} color="white" style={styles.buttonIcon} />
          <Text style={[styles.buttonLabel, { color: 'white' }]}>Remove Items</Text>
        </Pressable>
      </View>
    );
  }
  else if (theme === 'removeAll') {
    return (
      <View
        style={[
          { height: 48, width: 156, },
        ]}>
        <Pressable
          style={[styles.button, { backgroundColor: 'red' }]} onPress={onPress}>
          <FontAwesome name="remove" size={12} color="white" style={styles.buttonIcon} />
          <Text style={[styles.buttonLabel, { color: 'white' }]}>Remove All</Text>
        </Pressable>
      </View>
    );
  }
  else if (theme === 'removeItem') {
    return (
      <Pressable
        style={[{ backgroundColor: 'red', height:18, width:18, borderRadius:8}]} onPress={onPress}>
        <FontAwesome name="remove" size={12} color="white" style={[{ justifyContent: 'center', left: 4, top: 3}]} />
      </Pressable>
    )
  }
  else if (theme === 'createRecipe') {
    return (
      <View
        style={[
          styles.buttonContainer,
          { margin: 4 },
        ]}>
        <Pressable
          style={[styles.button, { backgroundColor: '#2196F3', alignContent: 'center' }]} onPress={onPress}>
          <FontAwesome name="plus" size={18} color="white" style={styles.buttonIcon} />
          <Text style={[styles.buttonLabel, { color: 'white' }]}>{label}</Text>
        </Pressable>
      </View>
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
