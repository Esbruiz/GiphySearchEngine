import React from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './components/SearchBar';
import GifList from './components/GifList';
import request from 'superagent';
import './styles/app.css';
import GifModal from './components/GifModal';

class App extends React.Component {

    constructor() {
        super();
        this.state = {
            gifs: [],
            selectedGif: null,
            modalIsOpen: false
        };
    }

    openModal(gif) {
        this.setState({
            modalIsOpen: true,
            selectedGif: gif
        });
    }

    closeModal() {
        this.setState({
            modalIsOpen: false,
            selectedGif: null
        });
    }

    handleTermChange = (term) => {
        const apiKey = 'c4069233621f48ff9f473e737f88b04b';
        const url = `http://api.giphy.com/v1/gifs/search?q=${term.replace(/\s/g, '+')}&api_key=${apiKey}`;

        request.get(url).end((err, res) => {
            this.setState({gifs: res.body.data});
        });
    };

    render() {
        return (
            <div className="greeting">
                <SearchBar onTermChange={term => this.handleTermChange(term) } />
                <GifList gifs={this.state.gifs} onGifSelect = { selectedGif => this.openModal(selectedGif) }/>
                <GifModal modalIsOpen={this.state.modalIsOpen}
                          selectedGif={this.state.selectedGif}
                          onRequestClose={ () => this.closeModal() } />
            </div>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));
