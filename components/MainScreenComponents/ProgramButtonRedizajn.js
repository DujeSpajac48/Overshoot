import React from 'react';
import {
  Text,
  Pressable,
  View,
  StyleSheet,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function ProgramButtonRedizajn({
  title = 'Muscle group',
  difficulty = 'Level',
  duration = 'Duration',
  programType = 'Specificity',
  date = '1.1.2020',
  children = 'Who made it',
  imageSource = require('./legs.png'),
  id,onDelete
}) {
  const navigation = useNavigation();

  // /** Mapiraj težinu na boje */
  const levelColor = (() => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
        return '#55D855';
      case 'intermediate':
        return '#F9CB40';
      case 'advanced':
        return '#FF715B';
      default:
        return '#555'; // sivo za “Level”
    }
  })();

  return (
    <Pressable
      onPress={() => navigation.navigate('Program')}
      onLongPress={() => onDelete(id)}
      style={({ pressed }) => [
        { opacity: pressed ? 0.3 : 3,
         }, 
  ]}
>
      <View style={styles.programBox}>
        {/* ---------------- gornji dio ---------------- */}
        <View style={styles.contentContainer}>
          {/* Slika */}
          <View style={styles.imageContainer}>
            <Image source={imageSource} style={styles.programImage} />
          </View>

          {/* Info */}
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>{title}</Text>
            <Text style={styles.infoText}>{duration}</Text>
            <Text style={styles.infoText}>{programType}</Text>

            {/* Level indikator */}
            <View style={styles.levelContainer}>
              <View
                style={[
                  styles.programLevel,
                  { backgroundColor: levelColor, borderColor: levelColor },
                ]}
              >
                <View
                  style={[
                    styles.levelIndicator,
                    { backgroundColor: '#fff' },
                  ]}
                />
              </View>
              <Text style={styles.levelText}>{difficulty}</Text>
            </View>
          </View>
        </View>

        {/* ---------------- footer ---------------- */}
        <View style={styles.footer}>
          <View>
            <Text style={styles.lightText}>Made by:</Text>
            <Text style={styles.footerText}>{children}</Text>
          </View>
          
          <View>
            <Text style={styles.lightText}>Updated:</Text>
            <Text style={styles.footerText}>{date}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

/* ------------ STILOVI ------------ */
const styles = StyleSheet.create({
  programBox: {
    borderWidth: 0.2,
    borderBottomWidth: 0.25,
    borderBottomLeftRadius: 17,
    borderBottomRightRadius: 17,
    borderColor: '#555555',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.32,
    marginVertical: 8,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  contentContainer: {
    flex: 1,
    position: 'relative',
  },
  imageContainer: {
    position: 'absolute',
    right: 0,
    width: '56%',
    height: '100%',
  },
  programImage: {
    width: '100%',
    height: '100%',
    opacity: 0.82,
    borderTopRightRadius: 17,
  },
  infoContainer: {
    width: '60%',
    height: '100%',
    padding: 18,
    backgroundColor: 'white',
    zIndex: 2,
    borderBottomRightRadius: 46,
    borderTopRightRadius: 46,
  },
  infoText: {
    fontSize: 20,
    fontWeight: 'bold',
    ...Platform.select({
      ios: { marginVertical: 10 },
      android: { marginVertical: 6 },
    }),
  },
  /* Level */
  levelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  programLevel: {
    borderWidth: 1,
    marginRight: 10,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    marginVertical: 6,
  },
  levelIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    alignSelf: 'center',
  },
  levelText: {
    marginVertical: 6,
    fontSize: 16,
  },
  /* Footer */
  footer: {
    height: '25%',
    backgroundColor: '#E6E6E6',
    borderBottomLeftRadius: 17,
    borderBottomRightRadius: 17,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingTop: 10,
    flexDirection: 'row',
  },
  lightText: {
    fontSize: 12,
    color: '#333',
  },
  footerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
