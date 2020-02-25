import React, {Component} from 'react';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';

import {FaSearch} from 'react-icons/fa';
import {GiCardPlay} from 'react-icons/gi';
import {GiHamburgerMenu} from 'react-icons/gi';
import {any} from "prop-types";


const mtg = require('mtgsdk');


export default class Search extends Component {

    constructor(props) {
        super(props);
        this.state = {

            //TESTING STATE
            query: '',
            text: '',
            legalities: [],
            colors: [],
            cardType: '',
            subtype: '',
            setName: '',
            pageSize: 4,
    
            spinner: false,
            modal: false,
            showModal: false,
            menu: false,
            result: [],
        };

        this.handleChange = this.handleChange.bind(this);
    }


    loaded = () => {
        if (this.state.spinner === true) {
            return (
                <div>
                    <Spinner animation="border" size="sm"/>
                </div>

            )
        } else {

            return (
                <div>{
                    this.state.result.map((obj, section, index, legality, add) => {
                        return (
                            <div key={section} style={{
                                display: 'block',
                                textAlign: 'center',
                                width: '100%',
                                height: '80%',
                                paddingBottom: '4em',
                            }}>
                                <img alt='a magic card' src={obj.img} style={{width: '90%', height: '100%'}}></img>

                                <div key={legality}>
                                {obj.legalities.map((ob,rule,eachrule)=>{

                                    return(
                                        <div className="formats" key={rule}>
                                    <span key={eachrule}>{ob.format}</span>
                                        </div>
                                        )
                                    })
                                }
                                </div>

                                <div key={add}>
                                <GiCardPlay onClick={() => this.props.addToDeck(obj)}/>
                                </div>
                            </div>
                        )
                    })
                }</div>
            )
        }

    }

    closeModal = () => {
        this.setState({menu: false}); 
    }

    toggleMenu = () => {
        this.setState({menu: !this.state.menu})
    }

    
    handleChange(event) {
        const target = event.target;
        let value = any;
        //check the target and add/remove to the array.
        if (target.type === 'checkbox') {
            ////check the target and add to the array.
            if (event.target.checked) {
                if (target.name === 'colors') {
                    value = [...this.state.colors, target.value]
                } else if (target.name === 'legalities') {
                    value = [...this.state.legalities, target.value]
                }
            }
            ////check the target and remove to the array.
            else {
                if (target.name === 'colors') {
                    let array = [...this.state.colors];
                    let index = array.indexOf(target.value);
                    array.splice(index, 1);
                    value = array;
                } else if (target.name === 'legalities') {
                    let array = [...this.state.legalities];
                    let index = array.indexOf(target.value);
                    array.splice(index, 1);
                    value = array;
                }
            }
        }
        
        
        else {
            value = target.value;
        }

        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    searchCard = () => {
      
             console.log(this.state.query) 
        if(this.state.menu===true){
            this.setState({menu:false})
        }
            // query works
            // pageSize works
            // colors is not working? maybe because it is an array
            // text works
            // setName works
            this.setState({modal: true, spinner: true})

            mtg.card.all({
                name: this.state.query,
                text: this.state.text, 
                colors: this.state.colors.toString(), 
                setName: this.state.setName,
                types: this.state.cardType,
                subtypes: this.state.subtype,
                gameFormat: this.state.legalities.toString(), 
                pageSize: 4
            })
               
                .on('data', card => {
                    console.log(card.types)
                    var searchedCard = {
                        name: card.name,
                        img: card.imageUrl,
                        manaCost: card.manaCost,
                        cmc: card.cmc,
                        colors: card.colors,
                        types: card.types,
                        setName: card.setName,
                        text: card.text,
                        legalities: card.legalities 
                    }

                    this.setState({result: [...this.state.result, searchedCard], spinner: false})
            })
    }

    render() {
        return (

            <div >
                <Modal
                    style={{height: '70%', marginTop: '5em'}}
                    show={this.state.modal}
                    onHide={ ()=>{this.setState({modal: !this.state.modal})}}
                    size="sm"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered>


                    <Modal.Body style={{height: '100%', width: '100%'}}>
                        {this.loaded()}
                    </Modal.Body>

                    <Modal.Footer>
                        <Button size='block' onClick={()=>this.closeModal()}>Close</Button>
                    </Modal.Footer>

                </Modal>


                <Modal show={this.state.menu} onHide={() => this.toggleMenu()}>
                <Modal.Header onClick={this.closeModal} closeButton>
                    <Modal.Title>Advanced Search</Modal.Title>
                    </Modal.Header>
                    <Modal.Body >

                        {/*preventDefault is called on the event when submitting the form to prevent a browser reload/refresh*/}
                        <Form onSubmit={(e) => {e.preventDefault()}}>
                            <Form.Group controlId="formBasicCardName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control name='query' type="text" placeholder="Enter card name"
                                              value={this.state.cardName} onChange={this.handleChange}/>
                            </Form.Group>

                            <Form.Group controlId="formBasicCardText">
                                <Form.Label>Card Text</Form.Label>
                                <Form.Control name='text' type="text" placeholder="Enter card text"
                                              value={this.state.cardText} onChange={this.handleChange}/>
                            </Form.Group>

                            <Form.Group controlId="formBasicCardtype">
                                <Form.Label>Card subtype</Form.Label>
                                <Form.Control name='subtype' type="text" placeholder="Enter card subtype"
                                              value={this.state.subtype} onChange={this.handleChange}/>
                            </Form.Group>

                            <Form.Group controlId="formBasicCardSet">
                                <Form.Label>Set Name</Form.Label>
                                <Form.Control name='setName' type="text" placeholder="Enter set name"
                                              value={this.state.cardSetName} onChange={this.handleChange}/>
                            </Form.Group>

                            <Form.Label>card colors (check multiple for 2 or more colors in a single card)</Form.Label>
                            <Form.Group controlId="formBasicColors">
                                <div className="formSubsection">
                                    <Form.Check name="colors" type="checkbox" id="formBasicColors1" label="Blue" value="Blue"
                                                onChange={this.handleChange}/>
                                    <Form.Check name="colors" type="checkbox" id="formBasicColors2" label="Black" value="Black"
                                                onChange={this.handleChange}/>
                                    <Form.Check name="colors" type="checkbox" id="formBasicColors3" label="White" value="White"
                                                onChange={this.handleChange}/>
                                    <Form.Check name="colors" type="checkbox" id="formBasicColors4" label="Green" value="Green"
                                                onChange={this.handleChange}/>
                                    <Form.Check name="colors" type="checkbox" id="formBasicColors5" label="Red" value="Red"
                                                onChange={this.handleChange}/>
                                </div>
                            </Form.Group>

                            
                            <Form.Group controlId="formBasicType">
                                <Form.Label>card Type</Form.Label>
                                <div className="formSubsection">
                                    <Form.Check name="cardType" type="radio" id="formBasicType1" label="creature" value="creature"
                                                onChange={this.handleChange}/>
                                    <Form.Check name="cardType" type="radio" id="formBasicType2" label="sorcery" value="sorcery"
                                                onChange={this.handleChange}/>
                                    <Form.Check name="cardType" type="radio" id="formBasicType3" label="artifact" value="artifact"
                                                onChange={this.handleChange}/>
                                    <Form.Check name="cardType" type="radio" id="formBasicType4" label="land" value="land"
                                                onChange={this.handleChange}/>
                                </div>
                            </Form.Group>


                            
                            <Button variant="primary" type="button" size='block' onClick={this.searchCard}>
                                Search
                            </Button>
                        </Form>

                    </Modal.Body>
                </Modal>


              
                    <InputGroup className="mb-3">
                        <InputGroup.Append>
                            <button type="submit" onClick={() => this.searchCard()}><FaSearch/></button>
                        </InputGroup.Append>

                        <InputGroup.Prepend>
                            <button type="submit" onClick={() => this.toggleMenu()}><GiHamburgerMenu/></button>
                        </InputGroup.Prepend>

                        <FormControl name="query" onChange={this.handleChange} aria-describedby="basic-addon1"/>
                    </InputGroup>
                
            </div>
        )


    }
}
