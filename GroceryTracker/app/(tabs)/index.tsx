import { Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";

import Button from '@/components/Button';
import ImageViewer from '@/components/ImageViewer';
import * as ImagePicker from 'expo-image-picker';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function Index() {
  const takeImageAsync = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
      cameraType: ImagePicker.CameraType.back,
    });

    if (!result.canceled) {
      console.log(result);
    }
  };
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result);
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.footerContainer}>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Scan your receipt!</ThemedText>
      </ThemedView>
        <Button theme="primary" label="Take a photo" onPress={takeImageAsync} />
        <Button theme="primary" label="Choose a photo" onPress={pickImageAsync} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    backgroundColor: '#25292e',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
    marginTop: 10,
  },
  text: {
    color: '#fff',
    fontSize: 30,
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: "#fff",
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
});