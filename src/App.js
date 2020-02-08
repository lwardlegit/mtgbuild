import React, {useState, useRef} from 'react';
import './App.css';
import Search from './search';
import Stats from './stats';
import PieChart from 'react-minimal-pie-chart';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import {AiOutlinePlus} from 'react-icons/ai';
import {AiOutlineMinus} from 'react-icons/ai';
import {Button, ButtonToolbar, Tooltip, Overlay} from 'react-bootstrap';

// const [show, setShow] = useState(false);
// const target = useRef(null);
// const { currentDeck } = this.state;
// const colorSum = this.state.blue+ this.state.black+ this.state.white+ this.state.red+ this.state.green

export default class App extends React.Component {
    state = {
        // tooltip:false,
        cardCount: 0,
        currentDeck: [],
        blue: 0,
        black: 0,
        white: 0,
        green: 0,
        red: 0,

        drawability: 3,
        manaGranting: 10,
        defense: 0,
        tokenGeneration: 0,
        controlFactor: 10
    }

    colorCases = (card) => {
        let colorArray = card.colors
        for (let x in colorArray) {
            let color = colorArray[x].toLowerCase()
            console.log("color", color)
            if (color === 'blue') {
                this.setState({blue: this.state.blue + 1})
            }
            if (color === 'red') {
                this.setState({red: this.state.red + 1})
            }
            if (color === 'white') {
                this.setState({white: this.state.white + 1})
            }
            if (color === 'green') {
                this.setState({green: this.state.green + 1})
            }
            if (color === 'black') {
                this.setState({black: this.state.black + 1})
            }
        }
    }

    cardFunctionality = (card) => {

        let text = card.text
        if (text !== undefined) {

            //cards that let you draw
            if (text.toLowerCase().includes('draw')) {
                this.setState({drawability: this.state.drawability + 1})
            }

            //cards that handle tokens
            if (text.toLowerCase().includes('token')) {
                this.setState({tokenGeneration: this.state.tokenGeneration + 1})
            }

            //cards that grant mana
            if (text.toLowerCase().includes('land')) {
                this.setState({manaGranting: this.state.manaGranting + 1})
            }

            //cards with high defense or have defender
            if (text.toLowerCase().includes('defender')) {
                this.setState({defense: this.state.defense + 1})
            }

            //cards that grant control of the field
            if (text.toLowerCase().includes('target player')) {
                this.setState({controlFactor: this.state.controlFactor + 1})
            }
        }
    }

    /*if selection contains a color, we increase by 1, if the color is
     * more than one color, we update states of matching colors by 1
     */
    addToDeck = (selection) => {

        this.colorCases(selection)
        this.cardFunctionality(selection)
        let isUpdated = false;

        const updatedDeck = this.state.currentDeck.map(c => {
            if (c.name === selection.name) {
                // card is already in the deck we add +1 to the count
                isUpdated = true;
                return {...c, count: c.count + 1};
            }
            return c;
        });
        if (!isUpdated) {
            alert('added to Deck!')
            updatedDeck.push({name: selection.name, colors: selection.colors, img: selection.img, count: 1});
        }
        this.setState({currentDeck: updatedDeck})
    }


    /* remove cards as long as the count of that card in the deck is bigger than 0
     * if the card count is equal to zero, remove that object from the currentdeck state
     */
    removeCard = (card) => {
        var deck = this.state.currentDeck
        for (let item in deck) {
            if (card.name === deck[item].name && deck[item].count >= 1) {
                deck[item].count = deck[item].count - 1

                if (card.count === 0) {
                    deck.splice(item, 1)
                }
            }
            this.setState({currentDeck: deck})
        }
    }

    tooltipHandler = () => {
        console.log('running tooltip handler')
        if (this.state.tooltip === false) {
            this.setState({tooltip: true})
        } else {
            this.setState({tooltip: false})
        }
    }

    getTooltip(card) {
        return <Tooltip className="tooltip-inner-custom">
            <img className="img-thumb-large" src={card}/>
        </Tooltip>;
    }

    render() {
        const {currentDeck} = this.state;
        const colorSum = this.state.blue + this.state.black + this.state.white + this.state.red + this.state.green
        return (
            <div className="App">
                <div className="searchdiv">
                    <Search className="search" addToDeck={this.addToDeck}/>
                </div>

                <div className="currentD">
                    <h5>Deck List</h5>

                    <ul>
                        {currentDeck.map((card, index, num, img) => (
                            <li className='cardinDeckList' key={index}>
                                <div style={{position: 'relative'}}>
                                    <strong>{card.name}</strong> <span key={num}>x{card.count}</span>

                                    <AiOutlinePlus className="deckBtns" onClick={() => {
                                        this.addToDeck(card)
                                    }}/>
                                    <AiOutlineMinus className="deckBtns" onClick={() => {
                                        this.removeCard(card)
                                    }}/>


                                    <OverlayTrigger placement="right" overlay={this.getTooltip(card.img)} trigger="click" rootClose={true}>
                                        <img className="img-thumb-sm" src={card.img}/>
                                    </OverlayTrigger>

                                    {/*{<OverlayTrigger placement="right" overlay={this.getTooltip(card.img)}
                                                    trigger="click">
                                        <Button bsStyle="default"><img className="img-thumb-sm" src={card.img}/></Button>
                                            <img className="img-thumb-sm" src={card.img}/>
                                    </OverlayTrigger>}*/}
                                    {/*{
                        this.state.tooltip ?
                        <OverlayTrigger
                          key='right'
                          placement='right'
                          trigger='click'
                          overlay={
                            <Tooltip id={`tooltip-right`}>
                              <img onClick={()=>{}} styles={{width: '20%', height: '25%'}}src={card.img}></img>
                            </Tooltip>}
                          >
                        </OverlayTrigger>:
                        <img key={img} onClick={()=>this.tooltipHandler()} src={card.img} style={{width: '2em', height: '2em'}}/>
                    }*/}

                                </div>
                            </li>
                        ))}
                    </ul>


                </div>

                <div className="colorComp">

                    <PieChart
                        style={{height: '200px'}}
                        animate={true}
                        animationDuration={500}
                        animationEasing="ease-out"
                        totalValue={this.state.cardCount}
                        data={[
                            {title: `Red ${this.state.red / colorSum * 100}%`, value: this.state.red, color: 'red'},
                            {
                                title: `Black ${this.state.black / colorSum * 100}%`,
                                value: this.state.black,
                                color: 'black'
                            },
                            {title: `Blue ${this.state.blue / colorSum * 100}%`, value: this.state.blue, color: 'blue'},
                            {
                                title: `White ${this.state.white / colorSum * 100}%`,
                                value: this.state.white,
                                color: 'white'
                            },
                            {
                                title: `Green ${this.state.green / colorSum * 100}%`,
                                value: this.state.green,
                                color: 'green'
                            },
                        ]}
                    />

                    <div className="stats">
                        <Stats props={this.state}/>
                    </div>
                </div>

                <div className="addSpace">
                    add space
                </div>
            </div>

        );
    }
}


