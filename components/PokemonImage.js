import React from 'react';
import { Image, StyleSheet } from 'react-native';

const PokemonImage = ({ uri }) => {
  return (
    <Image
      source={{ uri }}
      style={styles.image}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 150,
    marginBottom: 16,
  },
});

export default PokemonImage;
