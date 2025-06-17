import React, { useState } from 'react';
import { StyleSheet, View, Pressable, Text } from 'react-native';

import { useDispatch } from 'react-redux';
import { setDiff } from '../store/workoutSlice';

export default function SelectDifficulty({onSelect}) {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState('');

  const options = [
   { label: 'Beginner', color: '#40916c', border: '#009f78' },
   { label: 'Intermediate', color: '#ffa600', border: '#cc8500' },
   { label: 'Advanced', color: '#ff3b3f', border: '#b32025' },
  ];

  return (
    <View style={styles.container}>
      {options.map((option) => {
        const isSelected = selected === option.label;
        return (
          <Pressable
            key={option.label}
            onPress={
              () => {setSelected(option.label);
              onSelect((option.label))
              
            }
            }
            style={[
              styles.option,
              {
                backgroundColor: isSelected ? option.color : '#e0e0e0',
              },
            ]}
          >
            <Text style={[styles.text,
               {color: isSelected ? 'white' : 'grey'}]}
            
         >{option.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
   //  padding: 10,
   //  gap: 10,
   marginTop: 16,
   alignSelf: 'center'
  },
  option: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
});
