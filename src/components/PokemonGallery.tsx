import React, { useState, useEffect } from 'react';
import { Card, Button, Grid, GridRow, GridColumn, CardContent, CardHeader, CardMeta, Container } from 'semantic-ui-react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Pokemon {
    id: number;
    name: string;
    sprites: { front_default: string };
    types: Array<{ type: { name: string } }>;
}

const Gallery: React.FC = () => {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);
    const [selectedType, setSelectedType] = useState<string>('All');

    const types = ['All', 'Fire', 'Water', 'Grass', 'Electric', 'Ground', 'Flying', 'Psychic', 'Rock', 'Ice', 'Bug', 'Dragon', 'Ghost', 'Dark', 'Steel', 'Fairy'];

    useEffect(() => {

        const fetchPokemon = async () => {
            const pokemonPromises = [];
            for (let i = 1; i <= 151; i++) {
                pokemonPromises.push(axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`));
            }
            const responses = await Promise.all(pokemonPromises);
            const fetchedPokemons = responses.map((res) => res.data);
            setPokemons(fetchedPokemons);
            setFilteredPokemons(fetchedPokemons);
        };

        fetchPokemon();
    }, []);

    const filterByType = (type: string) => {
        setSelectedType(type);
        if (type === 'All') {
            setFilteredPokemons(pokemons);
        } else {
            const filtered = pokemons.filter((pokemon) => pokemon.types.some((pokemonType) => pokemonType.type.name === type.toLowerCase()));
            setFilteredPokemons(filtered);
        }
    };

    return (
            <Container textAlign="center">
            <Grid>
                <GridRow>
                    <GridColumn>
                        {types.map((type) => (
                            <Button size="tiny" key={type} onClick={() => filterByType(type)} active={selectedType === type}>
                                {type}
                            </Button>
                        ))}
                    </GridColumn>
                </GridRow>
            </Grid>

            <Card.Group itemsPerRow={4}>
                {filteredPokemons.map((pokemon) => (
                    <Card key={pokemon.id} as={Link} to={`/details/${pokemon.id}`}>
                        <CardContent>
                            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                            <CardHeader>{pokemon.name}</CardHeader>
                            <CardMeta>ID: {pokemon.id}</CardMeta>
                        </CardContent>
                    </Card>
                ))}
            </Card.Group>
        </Container>
    );
};

export default Gallery;