import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, ImageBackground } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export default function HomeScreen() {
  return (
    <ImageBackground
      source={require('../../assets/images/background.png')}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Smart Waste Management System</Text>
        
        <View style={styles.groupContainer}>
          <Text style={styles.subTitle}>Group Members</Text>
          
          <View style={styles.membersContainer}>
            <View style={styles.member}>
              <Image source={require('../../assets/images/membersimage/BALONGCAS.png')} style={styles.memberImage} />
              <Text style={styles.memberName}>BALONGCAS, MELGIE G.</Text>
            </View>
            <View style={styles.member}>
              <Image source={require('../../assets/images/membersimage/BARRANTES.png')} style={styles.memberImage} />
              <Text style={styles.memberName}>BARRANTES, STEVENS C.</Text>
            </View>
            <View style={styles.member}>
              <Image source={require('../../assets/images/membersimage/CABATINO.png')} style={styles.memberImage} />
              <Text style={styles.memberName}>CABATINO, JIAN NHEL L.</Text>
            </View>
            <View style={styles.member}>
              <Image source={require('../../assets/images/membersimage/DELATORRE.png')} style={styles.memberImage} />
              <Text style={styles.memberName}>DELA TORRE, JOANNEL</Text>
            </View>
            <View style={styles.member}>
              <Image source={require('../../assets/images/membersimage/DULLAS.png')} style={styles.memberImage} />
              <Text style={styles.memberName}>DULLAS, JOHN MATTHEW D.</Text>
            </View>
            <View style={styles.member}>
              <Image source={require('../../assets/images/membersimage/HONRADO.png')} style={styles.memberImage} />
              <Text style={styles.memberName}>HONRADO, SHANAI MEG G.</Text>
            </View>
            <View style={styles.member}>
              <Image source={require('../../assets/images/membersimage/MALLARI.png')} style={styles.memberImage} />
              <Text style={styles.memberName}>MALLARI, NELSON JR. D.</Text>
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
    textAlign: 'center',
    textShadowColor: '#000000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
  },
  groupContainer: {
    width: '100%',
    maxWidth: 600,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.6)', // Semi-transparent white background
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
    alignItems: 'center',
  },
  subTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#037c09',
    marginBottom: 15,
  },
  membersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  member: {
    width: (screenWidth - 80) / 3, // Adjust width to fit three members per row
    alignItems: 'center',
    marginBottom: 20,
    padding: 5,
  },
  memberImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 5,
    borderWidth: 2,
    borderColor: '#46B54C', // Border color to match palette
  },
  memberName: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
});
