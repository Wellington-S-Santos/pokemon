// utils/api.js
export const fetchPokemon = async () => {
    try {
      const id = Math.floor(Math.random() * 1000) + 1; // ID do Pokémon aleatório
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const pokemonData = await response.json();
  
      // Retorna o melhor sprite disponível
      return {
        ...pokemonData,
        artwork: pokemonData.sprites.other['official-artwork']?.front_default || pokemonData.sprites.front_default
      };
    } catch (error) {
      console.error('Erro ao buscar Pokémon:', error);
      return {};
    }
  };
  