import { Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";

import Button from '@/components/Button';
import ImageViewer from '@/components/ImageViewer';
import * as ImagePicker from 'expo-image-picker';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Index() {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const [output, setOutput] = useState('');
  let i = 1;

  const runScript0 = async () => {
    try {
      const url = 'http://192.168.212.103:5000/' + `food_expiration/receipt${i}.jpg`;
      const response = await axios.get(url);
      setOutput(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const runScript1 = async () => {
    try {
      const url = 'http://192.168.212.103:5000/' + `generate_recipe/${output}`;
      const response = await axios.get(url);
      setOutput(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    runScript0();
  },[]);

  // const runScript0 = async () => {
  //   try {
  //     const url = 'http://10.41.22.170:5000/' + `food_expiration/receipt${i}.jpg`;
  //     const options = {method: 'GET'};
  //     console.log(url);
  //     const response = await fetch(url, options); // Use your Flask server URL
  //     if (!response.ok) {
  //       console.error('An error occured when requesting to confirm a referal');  
  //       return; 
  //     }
  //     console.log(response);
  //     const data = await response.json();
  //     setOutput(data.output);
  //     console.log(data.output);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const takeImageAsync = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
      cameraType: ImagePicker.CameraType.back,
    });

    if (!result.canceled) {
      {setSelectedImage(result.assets[0].uri);
      runScript1();
      console.log(output);}
    }
  };
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      {setSelectedImage(result.assets[0].uri);
      runScript0();
      console.log(output);}
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