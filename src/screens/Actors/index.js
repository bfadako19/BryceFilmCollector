import React, { useState, useEffect } from 'react';
import {View, TouchableOpacity, Text, FlatList, NativeModules} from 'react-native';
import List from '../../components/List';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

import { openDatabase } from "react-native-sqlite-storage";

const shopperDB = openDatabase({ name: 'ShopperDB' });
const actorsName = 'names';

const ActorsScreen = props => {

  const navigation = useNavigation();

  const [names, setnames] = useState([]);

  useEffect(() => {
     listener = navigation.addListener('focus', () => {
      let results = [];
      shopperDB.transaction(txn => {
      txn.executeSql(
        `SELECT * FROM ${actorsName}`,
        [],
        (_, res) => {

        let len = res.rows.length;
        console.log('Length of lists ' + len);

        if (len>0){

          for(let i = 0; i < len; i++){

            let actors = res.rows.actors(i);
            results.push({
            id : actors.id,
            firstName: actors.firstName,
            lastName: actors.lastName, 
            });
          }
          
          setname(results);

        } else{
          
          setname([]);
        } 
        },
        error => {
        console.log('Error getting actor' + error.message);  
        },
      )  
      });
    });
    return listener;
  });

  return (
    <View style={styles.container}>
      <View>
        <FlatList
          data={names}
          renderActors={({actors}) => <List post={actors}/>}
          keyExtractor={item => item.id}
        />
        
      </View>
        <View style={styles.bottom}>
            <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.navigate('Add Actor')}
            >
            < Text style={styles.buttonText}>Add Actor</Text>

            </TouchableOpacity>
        </View>
    </View>
  );
};

export default ActorsScreen;