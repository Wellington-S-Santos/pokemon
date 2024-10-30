import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, ScrollView } from 'react-native';
import { fetchPokemon } from './utils/api';

const App = () => {
  const [pokemon, setPokemon] = useState({});
  const [guess, setGuess] = useState('');
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);
  const [rounds, setRounds] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [guessSubmitted, setGuessSubmitted] = useState(false);
  const maxRounds = 10;

  useEffect(() => {
    if (!gameOver) {
      fetchNewPokemon();
    }
  }, [gameOver]);

  const fetchNewPokemon = async () => {
    try {
      const data = await fetchPokemon();
      setPokemon(data);
      setFeedback('');
      setGuess('');
      setGuessSubmitted(false);
    } catch (error) {
      console.error(error);
    }
  };

  const checkGuess = () => {
    if (guess.toLowerCase() === pokemon.name.toLowerCase()) {
      setFeedback('Correto!');
      setScore(score + 1);
    } else {
      setFeedback(`Incorreto. O Pokémon era ${pokemon.name}.`);
    }
    setRounds(rounds + 1);
    setGuessSubmitted(true);
    if (rounds >= maxRounds - 1) {
      setGameOver(true);
    }
  };

  const nextPokemon = () => {
    fetchNewPokemon();
  };

  const restartGame = () => {
    setScore(0);
    setRounds(0);
    setGameOver(false);
    fetchNewPokemon();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Adivinhe o Pokémon</Text>
      {!gameOver ? (
        <View style={styles.gameContainer}>
          {pokemon.artwork && (
            <Image
              source={{ uri: pokemon.artwork }}
              style={styles.image}
              resizeMode="contain"
            />
          )}
          <TextInput
            style={styles.input}
            value={guess}
            onChangeText={setGuess}
            placeholder="Digite o nome do Pokémon"
            editable={!guessSubmitted}
          />
          <View style={styles.buttonContainer}>
            <Button 
              title="Enviar Palpite" 
              onPress={checkGuess} 
              disabled={guessSubmitted} 
            />
            <Button 
              title="Próximo Pokémon" 
              onPress={nextPokemon} 
              disabled={!guessSubmitted}
            />
          </View>
          <Text style={styles.feedback}>{feedback}</Text>
          <Text style={styles.score}>Pontuação: {score}</Text>
          <Text style={styles.rounds}>Rodadas: {rounds}/{maxRounds}</Text>
        </View>
      ) : (
        <View style={styles.gameOverContainer}>
          <Text style={styles.gameOverText}>Fim do Jogo!</Text>
          <Text style={styles.finalScore}>Pontuação Final: {score}</Text>
          <Button title="Voltar a Jogar" onPress={restartGame} />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  gameContainer: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    width: '90%',
    maxWidth: 400,
  },
  image: {
    width: 300, // Aumentado para melhor visualização
    height: 300, // Aumentado para melhor visualização
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 20,
    width: '100%',
    paddingHorizontal: 12,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  feedback: {
    fontSize: 18,
    marginBottom: 20,
    color: '#d9534f',
  },
  score: {
    fontSize: 18,
    marginBottom: 10,
    color: '#5bc0de',
  },
  rounds: {
    fontSize: 18,
    marginBottom: 20,
    color: '#5bc0de',
  },
  gameOverContainer: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    width: '90%',
    maxWidth: 400,
  },
  gameOverText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#d9534f',
  },
  finalScore: {
    fontSize: 20,
    marginBottom: 20,
    color: '#5bc0de',
  },
});

export default App;
