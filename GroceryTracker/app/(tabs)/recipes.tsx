import { View, Text, ScrollView, StyleSheet } from 'react-native'
import Button from '@/components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState }from 'react'

export default function Recipes() {
    let groceryList = []
    const [recipes, setRecipes] = useState([{name: "Spaghetti with meatballs", description: "You need pasta, tomato sauce, and meatballs.", id: 0}, 
    {name: "Cereal and Milk", description: "You cereal and milk. Put some cereal in the bowl then add milk.", id: 1}]);

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

    loadList();
    let nextId = recipes.length==0 ? 0 : Math.max(...recipes.map((item) => item.id)) + 1;

    const getRecipe = () => {
        if (groceryList.length == 0) {
            alert("please add to grocery list");
            return;
        }
        setRecipes([...recipes, {name: "New Recipe", description: "description", id: nextId}]);
        nextId += 1;
    }

    return (
        <ScrollView style={styles.container}>
            <Button theme="createRecipe" label="Create a Recipe" onPress={getRecipe} />
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