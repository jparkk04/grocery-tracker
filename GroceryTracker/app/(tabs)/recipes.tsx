import { View, Text, ScrollView, StyleSheet } from 'react-native'
import Button from '@/components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect }from 'react'
import { useFocusEffect} from '@react-navigation/native';
import React from 'react';
import axios from 'axios';

export default function Recipes() {
    let groceryList = []
    const [recipes, setRecipes] = useState([{name: "Spaghetti with meatballs", description: "You need pasta, tomato sauce, and meatballs.", id: 0}, 
    {name: "Cereal and Milk", description: "You need cereal and milk. Put some cereal in the bowl then add milk.", id: 1}]);

    const runScript1 = async () => {
        try {
            if (groceryList.length == 0) {
                alert("please add to grocery list");
                return;
            }
            let z = groceryList.map((item) => item.name);
            let s = '';
            for (let item of z) {
                s += item;
            }
            s = s.replace(/\s+/g, '-')
            console.log(s);
            const url = 'http://192.168.212.103:5000/' + `generate_recipe?s=${s}`;
            const response = await axios.get(url);
            let x = response.data.split("{")[1].split("}")[0];
            console.log(x);
            let y = x.split("',");
            getRecipe(y[0].split("': ")[1], y[1].split("': ")[1]);
        } catch (error) {
          console.error(error);
        }
      };

    const loadList = async () => {
        try {
          const jsonList = await AsyncStorage.getItem('groceryList');
          if (jsonList !== null) {
            const loadedList = JSON.parse(jsonList);
            groceryList = loadedList;
          }
          else {
            groceryList = [];
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
        setRecipes([]);
      }, []);

    let nextId = recipes.length==0 ? 0 : Math.max(...recipes.map((item) => item.id)) + 1;

    const getRecipe = (nam: string, desc: string) => {
        
        
        setRecipes([...recipes, {name: nam, description: desc, id: nextId}]);
        nextId += 1;
    }

    return (
        <ScrollView style={styles.container}>
            <View style={[{paddingLeft: 10, paddingRight: 10}]}>
                <Button theme="createRecipe" label="Create a Recipe" onPress={() => loadList().then(() => runScript1())} />
            </View>
            <View style={styles.list}>
                {recipes.map((item => {
                    return(
                        <View key={item.id} style={styles.listItem}>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.description}>{item.description}</Text>
                        </View>
                    )
                }))}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#25292e',
    },
    list: {
        margin: 12,
    },
    listItem: {
        textAlign: 'left',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        backgroundColor: '#fff',
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 14,
        color: '#555',
    }
});