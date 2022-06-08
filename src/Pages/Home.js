import { useState } from 'react';

const Home = () => {
    const [pokemonName, setPokemonName] = useState('');
    const [pokemonChosen, setPokemonChosen] = useState(false);
    const [pokemon, setPokemon] = useState(
        {
            // name: pokemonName = pokemonName.toLowerCase(),
            species: '',
            img: '',
            hp: '',
            attack: '',
            defense: '',
            type: '',

        }
    );

    const searchPokemon = (e) => {
        e.preventDefault();


        if (pokemonName?.length === 0 || !pokemonName) {
            return alert('Please enter a proper name')
        } else {
            fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setPokemon(
                        {
                            species: data?.species?.name,
                            img: data?.sprites?.front_default,
                            hp: data?.stats[0]?.base_stat,
                            attack: data?.stats[1]?.base_stat,
                            defense: data?.stats[1]?.base_stat,
                            type: data?.types[0]?.type?.name,

                        });
                    setPokemonChosen(true);
                    e.target.value = '';
                })
        }

    }

    return (
        <div className='my-16'>
            <h1 className="text-center text-4xl font-bold mb-8">
                Pokemon's info
            </h1>
            <form
                onChange={(event) => {
                    setPokemonName(event.target.value)
                }}
                className="flex items-center lg:w-1/2 md:w-2/3 mx-auto w-full">
                <label htmlFor="simple-search" className="sr-only">Search</label>
                <div className="relative w-full">
                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                    </div>
                    <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for Pokemon" required />
                </div>
                <button
                    onClick={searchPokemon}

                    type="submit" className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></button>
            </form>
            <div className='max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 mx-auto text-center p-5 my-8'>
                {!pokemonChosen && pokemon ? (
                    <h2 className='text-3xl font-semibold'>Chose a Pokemon</h2>
                ) : (
                    <>
                        <img className='mx-auto ' src={pokemon?.img} alt="" />
                        <h2 className='mb-2 text-xl font-semibold'>Name: {pokemon?.species.toUpperCase()}</h2>
                        <h3 className='mb-2 text-xl font-semibold'>Species: {pokemon.species}</h3>
                        <h3 className='mb-2 text-xl font-semibold'>Type: {pokemon.type}</h3>
                        <h3 className='mb-2 text-xl font-semibold'>Hp: {pokemon.hp}</h3>
                        <h3 className='mb-2 text-xl font-semibold'>Attack: {pokemon.attack}</h3>
                        <h3 className='mb-2 text-xl font-semibold'>Defense: {pokemon.defense}</h3>
                    </>
                )}
            </div>
        </div>
    );
};

export default Home;