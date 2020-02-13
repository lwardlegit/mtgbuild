import React, {useState, useRef} from 'react';
import './App.css';
import Search from './search';
import Stats from './stats';
import PieChart from 'react-minimal-pie-chart';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert'
import {AiOutlinePlus} from 'react-icons/ai';
import {AiOutlineMinus} from 'react-icons/ai';
import {Button, ButtonToolbar, Tooltip, Overlay} from 'react-bootstrap';


export default class App extends React.Component {
    state = {
        // tooltip:false,
        cardCount: 0,
        currentDeck: [],
        randomHand:[],
        blue: 0,
        black: 0,
        white: 0,
        green: 0,
        red: 0,

        handModal: false,
        tutorial: false,

        drawability: 'NA',
        manaCost: 'NA',
        power: 'NA',
        control: 'NA',
        land: 'NA',
        tokens: 'NA'
    }

    colorCases = (card) => {
        let colorArray = card.colors
        for (let x in colorArray) {
            let color = colorArray[x].toLowerCase()
    
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


    /*  
     *  generates a random hand of 7 cards and displays them as a modal
     */ 

    makeRandomHand = () =>{
        var fullDeck = this.state.currentDeck
                          
            for (var card in fullDeck){             

                let current = fullDeck[card]        
                if (current.count >= 2){         
                    let countDown = current.count

                    while(countDown >= 1){       
                        fullDeck.push(current) 
                        countDown -= 1
                    }
                }else{
                    fullDeck.push(current)
                }
            }
            //randomly select 7 cards
        if(fullDeck.length >= 8){
            var hand = []
            let i = 0

            while(i <= 6){
                
                let card =  Math.floor(Math.random() * fullDeck.length) 
                hand.push(fullDeck[card])
                fullDeck.splice(card,1)
                i += 1
            }
                    console.log("the hand",hand) //show the cards to the user as a modal later
                    this.setState({randomHand: hand, handModal:true})
               
        }else{
            alert('sorry you need at least 8 cards in your deck to use this feature :(')
        }
        return
            
    }





    tooltipHandler = () => {
       
        if (this.state.tooltip === false) {
            this.setState({tooltip: true})
        } else {
            this.setState({tooltip: false})
        }
    }
    showTutorial = () =>{
        this.setState({tutorial:!this.state.tutorial})
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


                <div className = "randomHandBtn" >
                    <Button className="handBtn" variant="outline-light" onClick={()=>this.makeRandomHand()}>Random Hand</Button>
                    <Button className="handBtn" variant="outline-light" onClick={()=>this.showTutorial()}>Tutorial</Button>
                    <Search className="handBtn" addToDeck={this.addToDeck}/>
                </div>

                <div className="currentD">
                    <p style={{marginLeft: '1.5em'}}>Deck List</p>
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
                        style={{height: '200px', marginTop: '1em'}}
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

                    
                        
                </div>
                    <div className="statsDiv">
                    <Stats props={this.state}/>
                    </div>
                
                

      
                        <Modal show={this.state.handModal} className="handModal">
                            <Modal.Header>
                            <Modal.Title>Your hand</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                   {this.state.randomHand ?
                                   
                                   this.state.randomHand.map((card,index)=>{
                                       return(
                                           <div key = {index} style={{display: 'inline'}}>
                                               <img height="120px" width= "100px" src={card.img} alt={card.name}></img>
                                           </div>
                                       )
                                   })
                                   
                                   :  <div>
                                       <p>We are picking your hand</p>
                                       <Spinner animation="border" size="sm"/>
                                       </div>}
                            </Modal.Body>
                            <Modal.Footer>
                            <Button variant="secondary" onClick={()=>{this.setState({handModal:false})}}>
                                Close
                            </Button>
                            </Modal.Footer>
                        </Modal>




                        <Modal show={this.state.tutorial} className="handModal">
                            
                            <Modal.Body className="tutorialBody">
                                   <p>Welcome to deck builder!</p>
                                   <br></br>
                                   <p className = "tutorialText">Lets get started building your deck</p>

                                   to add cards to your deck you can search for them in the search bar. You can also search for cards using our advanced search
                                       feature, just click the button next to the search icon to edit your desired parameters.
                                   

                                   <p className = "tutorialText">
                                       You can add multiple copies of a card by pressing the <b style={{color:'yellow'}}>+</b> or <b style={{color:'yellow'}}>-</b> buttons next to a card in your deck list. The color pie chart on the right
                                       displays what color composition your deck consists of. Hover over a color to see the percentage of each color.
                                   </p>

                                   <p className = "tutorialText">
                                       If you'd like to see how your deck really performs out of the gate you can press the 'random hand' button which will show you a random hand 
                                       that you could possibly draw on your first turn! You need to have at least 8 cards in your deck to use this feature otherwise, you'd just be drawing 
                                       your whole deck every time you drew a hand... and ...that's just cheating.
                                   </p>

                                   <p className = "tutorialText">
                                       finally beneath your deck you'll be able to see some stats based on what kinds of cards your deck contains. Cards that generate mana will increase your
                                       land stat, while cards that target creatures or players your opponent controls will increase your control factor stat. Understanding the relationships
                                       your cards facilitate both towards you and against your opponent are a strong measure of your deck's available playstyle.

                                       you can even add your own stats that you wish to track, when a stat is added, our algorithm searches your deck and checks for cards matching the title
                                       and description of your stat. Cards matching your stats guidelines will be factored into that stat. Keep in mind, this does not remove those cards from contributing to 
                                       other stats.
                                   </p>

                            </Modal.Body>
                            <Modal.Footer className="tutorialBody" >
                            <Button variant="outline-primary" size="block" onClick={()=>{this.showTutorial()}}>
                                Got it!
                            </Button>
                            </Modal.Footer>
                        </Modal>
                        
            </div>


                       
        );
    }
}


