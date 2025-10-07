import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, Image, Grid, Icon, GridColumn, CardHeader, CardMeta, CardContent, CardDescription} from 'semantic-ui-react';
import axios from 'axios';

interface Pokemon {
    id: number;
    name: string;
    sprites: { front_default: string };
    types: Array<{ type: { name: string } }>;
    height: number;
    weight: number;
}


const PokemonDetailPage: React.FC = () => {
    const { pokemonId } = useParams<{ pokemonId: string }>();
    const [pokemon, setPokemon] = useState<Pokemon | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPokemon = async () => {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
            setPokemon(response.data);
        };

        fetchPokemon();
    }, [pokemonId]);

    const navigateToPokemon = (id: number) => {
        if (id >= 1 && id <= 151) {
            navigate(`/details/${id}`);
        }
    };

    const handleNext = () => {
        const nextId = Number(pokemonId) + 1;
        navigateToPokemon(nextId);
    };

    const handlePrev = () => {
        const prevId = Number(pokemonId) - 1;
        navigateToPokemon(prevId);
    };

    if (!pokemon) return null;

    return (
        <Grid centered>
            <GridColumn width={10}>
                <Card fluid>
                    <CardContent>
                        <Grid>
                            <GridColumn width={2}>
                                <Button icon onClick={handlePrev} disabled={Number(pokemonId) === 1}>
                                    <Icon name="arrow left" />
                                </Button>
                            </GridColumn>

                            <GridColumn width={12}>
                                <CardHeader as="h2">
                                    { pokemon.name[0].toUpperCase() + pokemon.name.slice(1) }
                                </CardHeader>
                                <CardMeta>
                                    <span>Rank: {pokemon.id}</span>
                                </CardMeta>
                                <Image src={pokemon.sprites.front_default} alt={pokemon.name} />
                                <CardDescription>
                                    <p><strong>Type:</strong> {pokemon.types.map(type => type.type.name).join(', ')}</p>
                                    <p><strong>Height:</strong> {pokemon.height}</p>
                                    <p><strong>Weight:</strong> {pokemon.weight}</p>
                                </CardDescription>
                            </GridColumn>

                            <GridColumn width={2} textAlign='right'>
                                <Button icon onClick={handleNext} disabled={Number(pokemonId) === 151}>
                                    <Icon name="arrow right" />
                                </Button>
                            </GridColumn>
                        </Grid>
                    </CardContent>
                </Card>
            </GridColumn>
        </Grid>
    );
};

export default PokemonDetailPage;
