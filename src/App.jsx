
import React, { useState, useEffect } from 'react';

const PokemonCard = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [offset, setOffset] = useState(0);
  const limit = 3; // Number of Pokemon to fetch per API call
  const apiUrl = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setPokemonData(data.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [apiUrl]);

  const handlePrevClick = () => {
    if (offset - limit >= 0) {
      setOffset(offset - limit);
    }
  };

  const handleNextClick = () => {
    setOffset(offset + limit);
  };

  return (
    <div className="flex flex-col items-center py-20 ">
      <h1 className="text-2xl font-bold mb-4 text-white mt-3">Pokemon Cards</h1>
      <div className="flex flex-wrap justify-center">
        {pokemonData.map((pokemon, index) => (
          <div key={index} className="pokemon-card p-4 m-2 rounded bg-gray-800">
            <h2 className="text-lg font-semibold text-white">{pokemon.name}</h2>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + offset + 1}.png`}
              alt={pokemon.name}
              className="mt-2"
            />
          </div>
        ))}
      </div>
      <div className="flex mt-4">
        <button
          onClick={handlePrevClick}
          className="bg-blue-700 text-white px-4 py-2 rounded mr-2"
        >
          Previous
        </button>
        <button
          onClick={handleNextClick}
          className="bg-blue-700 text-white px-3 py-2 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PokemonCard;