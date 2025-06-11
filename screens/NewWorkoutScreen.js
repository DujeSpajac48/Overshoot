import { Text, View, StyleSheet, Pressable, Alert, Platform,StatusBar } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { Image } from 'react-native';
import SelectDificulty from "../components/SelectDificulty";
import WorkoutInfoInput from "../components/WorkoutInfoInput";
import { useNavigation } from "@react-navigation/native";
export default function NewWorkoutScreen() {
  const [image, setImage] = useState(null);
  const navigation = useNavigation();
  
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
      setImage(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer} edges={['top']}>
         <StatusBar 
         backgroundColor='white'
         barStyle='dark-content'
            />
      <View contentContainerStyle={styles.scrollContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}> New Workout</Text>
        </View>

        <WorkoutInfoInput
          inputGuide="Weekly split"
          inputGuideSugestion="PPL, Upper/Lower, Chest/Back..."
          placeHolderText="Enter split"
        />
        
        <WorkoutInfoInput
          inputGuide="Duration"
          inputGuideSugestion="5 weeks, 12 weeks..."
          placeHolderText="Enter Duration"
        />
        
        <WorkoutInfoInput
          inputGuide="Main Focus"
          inputGuideSugestion="Powerlifting, BodyBuilding..."
          placeHolderText="Input"
        />

    

        <SelectDificulty/>

       
          
          <Pressable 
            onPress={pickImage} 
            
          >
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
              pressed && styles.buttonPressed
            ]}
            onPress={()=>navigation.goBack()}
          >
            <Text style={styles.buttonText}
            >Cancel</Text>
          </Pressable>
          
          <Pressable
            style={({ pressed }) => [
              styles.confirmButton,
              pressed && styles.buttonPressed
            ]}
            
          >
            <Text style={[styles.buttonText, styles.confirmButtonText]}>Confirm</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  )
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

  uploadButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  formButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
   //  marginTop: Platform.OS === 'ios'? 0 : 0,
  },
  cancelButton: {
    backgroundColor: '#dc3545',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 120,
    alignItems: 'center',

  },
  confirmButton: {
    backgroundColor: '#28a745',
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



// import { Text, View, StyleSheet, Pressable, Alert, Platform } from "react-native";
// import { SafeAreaView } from 'react-native-safe-area-context';
// import * as ImagePicker from 'expo-image-picker';
// import { useState } from 'react';
// import { Image } from 'react-native';
// import SelectDificulty from "../components/SelectDificulty";
// import WorkoutInfoInput from "../components/WorkoutInfoInput";
// import { useNavigation } from "@react-navigation/native";
// export default function NewWorkoutScreen() {
//   const [image, setImage] = useState(null);
//   const navigation = useNavigation();
  
//   const pickImage = async () => {
//     const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (status !== 'granted') {
//       Alert.alert('Permission denied', 'Allow access to media library to upload images.');
//       return;
//     }
  
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images, 
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 0.8,
//     });
  
//     if (!result.canceled) {
//       setImage(result.assets[0].uri);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.mainContainer} edges={['top']}>
//       <View contentContainerStyle={styles.scrollContainer}>
//         <View style={styles.headerContainer}>
//           <Text style={styles.headerText}> New Workout</Text>
//         </View>

//         <WorkoutInfoInput
//           inputGuide="Weekly split"
//           inputGuideSugestion="PPL, Upper/Lower, Chest/Back..."
//           placeHolderText="Enter split"
//         />
        
//         <WorkoutInfoInput
//           inputGuide="Duration"
//           inputGuideSugestion="5 weeks, 12 weeks..."
//           placeHolderText="Enter Duration"
//         />
        
//         <WorkoutInfoInput
//           inputGuide="Main Focus"
//           inputGuideSugestion="Powerlifting, BodyBuilding..."
//           placeHolderText="Input"
//         />

//         <SelectDificulty/>

//         <View style={styles.imageUploadContainer}>
//           {image ? (
//             <View style={styles.imageBox}>
//               <Image 
//                 source={{ uri: image }} 
//                 style={styles.previewImage}
//                 resizeMode="cover"
//               />
//             </View>
//           ) : (
//             <View style={[styles.imageBox, styles.emptyImageBox]}>
//               <Text style={styles.emptyImageText}>No image selected</Text>
//             </View>
//           )}
          
//           <Pressable 
//             onPress={pickImage} 
//             style={({ pressed }) => [
//               styles.uploadButton,
//               pressed && styles.uploadButtonPressed
//             ]}
//           >
//             <Text style={styles.uploadButtonText}>
//               {image ? 'Change Image' : 'Upload Image'}
//             </Text>
//           </Pressable>
//         </View>

//         <View style={styles.formButtonContainer}>
//           <Pressable
//             style={({ pressed }) => [
//               styles.cancelButton,
//               pressed && styles.buttonPressed
//             ]}
//             onPress={()=>navigation.goBack()}
//           >
//             <Text style={styles.buttonText}
//             >Cancel</Text>
//           </Pressable>
          
//           <Pressable
//             style={({ pressed }) => [
//               styles.confirmButton,
//               pressed && styles.buttonPressed
//             ]}
//           >
//             <Text style={[styles.buttonText, styles.confirmButtonText]}>Confirm</Text>
//           </Pressable>
//         </View>
//       </View>
//     </SafeAreaView>
//   )
// }

// const styles = StyleSheet.create({
//   mainContainer: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   scrollContainer: {
//     paddingBottom: 30,
//   },
//   headerContainer: {
//     paddingVertical: 20,
//     alignItems: 'center',
//     borderBottomWidth: 1,
//     borderBottomColor: '#e0e0e0',
//   },
//   headerText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   imageUploadContainer: {
//     alignItems: 'center',
//     marginVertical: 20,
//     paddingHorizontal: 20,
//   },
//   imageBox: {
//     width: '100%',
//     height: 250,
//     borderRadius: 12,
//     borderWidth: 2,
//     borderColor: 'lightgrey',
//     overflow: 'hidden',
//     marginBottom: 15,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   emptyImageBox: {
//     backgroundColor: '#f5f5f5',
//     justifyContent: 'center',
//   },
//   emptyImageText: {
//     color: '#888',
//     fontSize: 16,
//   },
//   previewImage: {
//     width: '100%',
//     height: '100%',
//   },
//   uploadButton: {
//     backgroundColor: '#1e90ff',
//     paddingHorizontal: 24,
//     paddingVertical: 12,
//     borderRadius: 8,
//     width: '100%',
//     alignItems: 'center',
//     marginTop: Platform.OS === 'ios' ? 6 : 0,
//   },
//   uploadButtonPressed: {
//     opacity: 0.8,
//   },
//   uploadButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
//   formButtonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     paddingHorizontal: 20,
//     marginTop: Platform.OS === 'ios'? 12 : 0,
//   },
//   cancelButton: {
//     backgroundColor: '#dc3545',
//     paddingHorizontal: 24,
//     paddingVertical: 12,
//     borderRadius: 8,
//     minWidth: 120,
//     alignItems: 'center',

//   },
//   confirmButton: {
//     backgroundColor: '#28a745',
//     paddingHorizontal: 24,
//     paddingVertical: 12,
//     borderRadius: 8,
//     minWidth: 120,
//     alignItems: 'center',
//   },
//   buttonPressed: {
//     transform: [{ scale: 0.96 }],
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: '500',
//   },
//   confirmButtonText: {
//     color: 'white',
//   },
// });