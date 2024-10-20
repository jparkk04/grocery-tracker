import { Text, View, StyleSheet, TextInput, Pressable, ScrollView } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '@/components/Button';
import { useState, useEffect } from "react";
import { useFocusEffect } from '@react-navigation/native';
import React from 'react'

export default function GroceryList() {
  const [addMode, setAddMode] = useState(false);
  const [removeMode, setRemoveMode] = useState(false);
  const [groceryList, setGroceryList] = useState(
    []
  );

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
  useFocusEffect(
    React.useCallback(() => {
      loadList();
    }, [])
  );
  useEffect(() => {
    saveList();
  }, [groceryList]);
  
  let nextId = groceryList.length==0 ? 0 : Math.max(...groceryList.map((item) => item.id)) + 1;

  const AddToList = (item: string, days: number) => {
    if (item && days) {
      setGroceryList([...groceryList, { name: item, days: days, id: nextId }]);
      nextId += 1;
    }
  }

  const RemoveAll = () => {
    setGroceryList([]);
  }

  const AddItemSection = () => {
    const [item, onChangeItem] = useState('');
    const [days, onChangeDays] = useState('');
    return (
      <View>
        <Text style={styles.addTextStyles}>Item Name</Text>
        <TextInput style={styles.textInput} onChangeText={onChangeItem} />
        <Text style={styles.addTextStyles}>Days Until Expiration</Text>
        <TextInput style={styles.textInput} onChangeText={onChangeDays} keyboardType='numeric'/>
        <Pressable style={styles.addItemButton} onPress={() => AddToList(item, parseInt(days))}>
          <Text>Add Item</Text>
          </Pressable>
      </View>
    )
  }

  const RemoveFromList = (id: number) => {
    const newGroceryList = groceryList.filter((item) => item.id != id);
    setGroceryList(newGroceryList);
  }

    return (
      <ScrollView style={styles.container}>
        <View style={styles.buttonContainer}>
          <Button theme="add" label="Add Item" onPress={() => setAddMode(!addMode)}/>
          <Button theme="remove" label="Add Item" onPress={() => setRemoveMode(!removeMode)}/>
        </View>
        {removeMode ?
          <View style={[{alignItems:'flex-end'}]}>
            <View style={[{marginRight: 12, marginBottom: 12}]}>
              <Button theme="removeAll" label="Remove All" onPress={RemoveAll}/>
            </View>
          </View>
          : null
        }
        <View>
          {addMode ? 
            <AddItemSection /> : null}
        </View>
        <View style={styles.listItem}>
              <Text>Item</Text>
              <Text style={styles.expiration}>Days Until Expiration</Text>
          </View>
        {groceryList.map((item) => {
          return(
            <View style={styles.listItem} key={item.id}>
              <Text>{item.name}</Text>
              <View style={[{position: 'absolute', right: 8, flexDirection: 'row'}]}>
                {removeMode ?
                  <Button theme={'removeItem'} label="RemoveItem" onPress={() => RemoveFromList(item.id)}/> : null
                }
                <Text style={[{marginLeft: 12}]}>{item.days}</Text>
              </View>
            </View>
          )
        }
        )}
      </ScrollView>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#25292e',
    },
    text: {
      color: '#fff',
    },
    listItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
      backgroundColor: '#fff',
    },
    expiration: {
      position: 'absolute',
      right: 16,
    },
    buttonContainer: {
      padding: 12,
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    textInput: {
      backgroundColor: 'white',
      margin: 12,
      height: 24,
    },
    addTextStyles: {
      color: 'white',
      marginLeft: 12,
    },
    addItemButton: {
      backgroundColor: 'white',
      marginBottom: 12,
      marginLeft: 12,
      width: 60
    },
  });