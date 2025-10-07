import React, { useState, useEffect } from 'react';
import { Form, FormField, Card, FormSelect, FormInput, FormRadio, FormGroup, Container, Segment, CardContent, CardHeader, CardMeta } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface Pokemon {
    id: number;
    name: string;
    sprites: { front_default: string };
}

const PokemonList: React.FC = () => {
    const [pokemons, setPokemons] = useState<Pokemon[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [sortOption, setSortOption] = useState<string>('id');
    const [isAscending, setIsAscending] = useState<boolean>(true);

    useEffect(() => {
        const fetchPokemon = async () => {
            const pokemonPromises = [];
            for (let i = 1; i <= 151; i++) {
                pokemonPromises.push(axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`));
            }
            const responses = await Promise.all(pokemonPromises);
            const fetchedPokemons = responses.map((res) => res.data);
            setPokemons(fetchedPokemons);
        };

        fetchPokemon();
    }, []);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const handleSortChange = (e: React.SyntheticEvent, { value }: any) => {
        setSortOption(value);
    };

    const handleOrderChange = (e: React.SyntheticEvent, { value }: any) => {
        setIsAscending(value === 'asc');
    };

    const filteredPokemons = pokemons
        .filter((pokemon) => pokemon.name.toLowerCase().includes(searchTerm))
        .sort((a, b) => {
            if (sortOption === 'id') {
                return isAscending ? a.id - b.id : b.id - a.id;
            } else if (sortOption === 'name') {
                return isAscending ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
            }
            return 0;
        });

    return (
        <Container>
            <Segment padded='very'>
                <Form>
                    <FormField>
                        <FormInput
                            icon="search"
                            placeholder="Search Pokemon..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            fluid
                        />
                    </FormField>

                    <FormField>
                        <label>Sort By:</label>
                        <FormSelect
                            placeholder="Sort by"
                            selection
                            options={[
                                { key: 'id', text: 'ID', value: 'id' },
                                { key: 'name', text: 'Name', value: 'name' },
                            ]}
                            onChange={handleSortChange}
                            value={sortOption}
                            fluid
                        />
                    </FormField>

                    <FormGroup inline>
                        <FormRadio
                            label="Ascending"
                            checked={isAscending}
                            onChange={handleOrderChange}
                            value="asc"
                        />
                        <FormRadio
                            label="Descending"
                            checked={!isAscending}
                            onChange={handleOrderChange}
                            value="des"
                        />
                    </FormGroup>
                </Form>

                {searchTerm.length > 0 && (
                    <Card.Group itemsPerRow={1} stackable>
                    {filteredPokemons.map((pokemon) => (
                        <Card fluid key={pokemon.id} as={Link} to={`/details/${pokemon.id}`} link>
                            <CardContent>
                                <img
                                    src={pokemon.sprites.front_default}
                                    alt={pokemon.name}
                                />
                                <CardHeader>{pokemon.name}</CardHeader>
                                <CardMeta>ID: {pokemon.id}</CardMeta>
                            </CardContent>
                        </Card>
                    ))}
                </Card.Group>
                )}
            </Segment>
        </Container>
    );
};

export default PokemonList;