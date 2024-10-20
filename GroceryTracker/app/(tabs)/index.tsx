import { Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";

import Button from '@/components/Button';
import ImageViewer from '@/components/ImageViewer';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState, useEffect } from 'react';
import { useFocusEffect} from '@react-navigation/native';
import React from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Index({}) {
  const [selectedImage, setSelectedImage] = useState<String | undefined>(undefined);
  // const [output, setOutput] = useState('');
  // let i = 1;

  const [groceryList, setGroceryList] = useState(
    []
  )

  let nextId = groceryList.length==0 ? 0 : Math.max(...groceryList.map((item) => item.id)) + 1;

  useFocusEffect(
    React.useCallback(() => {
      loadList();
    }, [])
);

  useEffect(() => {
    saveList();
  }, [groceryList]);

  useEffect(() => {
    sendImage().then(() => runScript0());
  }, [selectedImage]);

  // useEffect(() => {
  //   runScript0();
  // }, [selectedImage]);

  const sendImage = async () => {
    if (selectedImage) {
      try {
        
        const base64 = await FileSystem.readAsStringAsync(selectedImage, { encoding: 'base64' });
        const response = await fetch('http://192.168.212.103:5000/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ image: base64 })
        });

        if (response.ok) {
          // Handle successful upload
          console.log('Image uploaded successfully!');
        } else {
          // Handle upload error
          console.error('Image upload failed.');
        }
      } catch (error) {
        console.error('Error sending image:', error);
      }
    }
  }

  const AddToList = (item: string, days: number) => {
    if (item && days) {
      setGroceryList(groceryList => 
        {const newList = [...groceryList, { name: item, days: days, id: nextId }];
        // console.log("newList:" + newList); // Log the new list
        return newList;}
      );
      nextId += 1;
    }
  }

  const runScript0 = async () => {
    if (selectedImage) {
      try {
        const url = 'http://192.168.212.103:5000/' + `food_expiration/image.jpg`;
        const response = await axios.get(url);
        // setOutput(response.data);
        // console.log(response.data);
        let x = response.data.split("{")[1].split("}")[0]
        for (const line of x.split(",")) {
          let y = line.split(":");
          AddToList(y[0].replace(/['"]+/g, ''), parseInt(y[1]));
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  

  const saveList = async () => {
    try {
      const jsonList = JSON.stringify(groceryList);
      await AsyncStorage.setItem('groceryList', jsonList);
    } catch (error) {
      console.error('Error saving list:', error);
    }
  };

  const loadList = async () => {
    try {
      const jsonList = await AsyncStorage.getItem('groceryList');
      if (jsonList !== null) {
        const loadedList = JSON.parse(jsonList);
        setGroceryList(loadedList);
      }
      else {
        setGroceryList([]);
      }
    } catch (error) {
      console.error('Error loading list:', error);
    }
  };
  

  

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

  // const uploadImageAsync = async () => {
  //   let formData = new FormData(); 
  //   //append created photo{} to formdata
  //   formData.append('image', selectedImage);
  //   //use axios to POST
  //   axios({
  //       method: 'POST',
  //       url: api_url +  'customer/upload-avatar',
  //       data: formData,
  //       headers: {
  //           'Authorization': "Bearer  "  +  YOUR_BEARER_TOKEN,
  //           'Accept': 'application/json',
  //           'Content-Type': 'multipart/form-data;'    
  //       }}) .then(function (response) { console.log(response)})
  //       .catch(function (error) { console.log(error.response)
  //   });
  // }

  const takeImageAsync = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
      cameraType: ImagePicker.CameraType.back,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      console.log(selectedImage);
    }
  };
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      console.log(selectedImage);
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