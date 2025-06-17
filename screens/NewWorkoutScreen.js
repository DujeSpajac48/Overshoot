import { Text, View, StyleSheet, Pressable, Alert, StatusBar } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { Image } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { addWorkout } from "../store/workoutSlice";
import { setAll } from "../store/workoutSlice";
import SelectDificulty from "../components/SelectDificulty";
import WorkoutInfoInput from "../components/WorkoutInfoInput";

export default function NewWorkoutScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    split: '',
    duration: '',
    focus: '',
    diff: '',
  });

  const [image, setImage] = useState(null);

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (!form.split || !form.duration || !form.focus || !form.diff) {
      Alert.alert("Incomplete form", "Please fill out all the fields.");
      return;
    }

    const workout = {
      ...form,
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      img: image, // Including the image URI here
    };

    dispatch(addWorkout(workout));
    navigation.goBack();
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission denied', 'Allow access to media library to upload images.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,

      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      console.log(dispatch(setImage(result.assets[0].uri)));
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer} edges={['top']}>
      <View style={styles.scrollContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>New Workout</Text>
        </View>

        <WorkoutInfoInput
          onChangeText={text => handleChange('split', text)}
          inputGuide="Weekly split"
          inputGuideSugestion="PPL, Upper/Lower, Chest/Back..."
          placeHolderText="Enter split"
        />

        <WorkoutInfoInput
          onChangeText={text => handleChange('duration', text)}
          inputGuide="Duration"
          inputGuideSugestion="5 weeks, 12 weeks..."
          placeHolderText="Enter Duration"
        />

        <WorkoutInfoInput
          onChangeText={text => handleChange('focus', text)}
          inputGuide="Main Focus"
          inputGuideSugestion="Powerlifting, BodyBuilding..."
          placeHolderText="Input"
        />

        <SelectDificulty onSelect={text => handleChange('diff', text)} />

        <Pressable onPress={pickImage}>
          <View style={styles.imageUploadContainer}>
            {image ? (
              <View style={styles.imageBox}>
                <Image
                  source={{ uri: image }}
                  style={styles.previewImage}
                  resizeMode="cover"
                />
              </View>
            ) : (
              <View style={[styles.imageBox, styles.emptyImageBox]}>
                <Text style={styles.emptyImageText}>No image selected</Text>
              </View>
            )}
          </View>
        </Pressable>

        <View style={styles.formButtonContainer}>
          <Pressable
            style={({ pressed }) => [
              styles.cancelButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.confirmButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={handleSave}
          >
            <Text style={[styles.buttonText, styles.confirmButtonText]}>Save</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    paddingBottom: 30,
  },
  headerContainer: {
    paddingVertical: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  imageUploadContainer: {
    alignItems: 'center',
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  imageBox: {
    width: '100%',
    height: 280,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'lightgrey',
    overflow: 'hidden',
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyImageBox: {
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
  },
  emptyImageText: {
    color: '#888',
    fontSize: 16,
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  formButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
  cancelButton: {
    backgroundColor: 'darkred',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 120,
    alignItems: 'center',
  },
  confirmButton: {
    backgroundColor: 'lightblue',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 120,
    alignItems: 'center',
  },
  buttonPressed: {
    transform: [{ scale: 0.96 }],
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  confirmButtonText: {
    color: 'white',
  },
});
