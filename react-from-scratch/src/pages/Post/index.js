import React, { Component, useMemo } from 'react';
import { useParams, useLocation } from 'react-router-dom';

export default class Post extends Component {
    //o construtor só é executado 1 vez e declarar o atributo aqui dentro substitui o useMemo
    constructor(props) {
        super(props);

        const { search } = this.props.location;
        this.queryParams = new URLSearchParams(search);
    }

    handleNavigate = () => {
        this.props.history.push('/posts');
    };

    render() {
        console.log(this.queryParams.get('nomeDoParametro'));
        return (
            <>
                <h1>Post</h1>
                <button type="button" onClick={this.handleNavigate}>
                    Voltar para a lista de posts
                </button>
            </>
        );
    }
}

/* export default function Post() {
    const params = useParams();
    const { search } = useLocation();

    //Para não criar uma instância a cada renderização, utilizamos o useMemo.
    //Assim, uma nova instância só será criada se a variável search mudar
    const queryParams = useMemo(() => new URLSearchParams(search), [search]);

    console.log(queryParams.get('nomeDoParametro'))
    return (
        <h1>Post</h1>
    );
} */