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
            cardColor: [],
            cardLegality: [],
            cardType: '',
            cardName: '',
            cardText: '',
            cardSetName: '',
            spinner: false,
            modal: false,
            showModal: false,
            menu: false,
            query: '',
            form: {query: '', colors: '', text: '', legality: '', set: ''},
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
                <div style={{width: '90%', display: 'block', overflow: 'auto'}}>{
                    this.state.result.map((obj, section, index, legality, add) => {
                        return (
                            <div key={section} style={{
                                display: 'block',
                                textAlign: 'center',
                                width: '100%',
                                height: '80%',
                                paddingBottom: '2em'
                            }}>
                                <img src={obj.img} style={{width: '90%', height: '100%'}}></img>

                                <ul key={legality}>{() => {
                                    for (let x in obj.legality) {
                                        return (
                                            <li>{x}</li>
                                        )
                                    }
                                }}</ul>

                                <Button size="block" key={add}
                                        onClick={() => this.props.addToDeck(obj)}><GiCardPlay/></Button>
                            </div>
                        )
                    })
                }</div>
            )
        }

    }

    closeModal = (e) => {
        e.preventDefault();
        this.setState({modal: false});
    }

    toggleMenu = () => {
        this.setState({menu: !this.state.menu})
    }

    updateInput = (e) => {
        this.setState({query: e.target.value});
    }

    handleChange(event) {
        const target = event.target;
        let value = any;
        //check the target and add/remove to the array.
        if (target.type === 'checkbox') {
            ////check the target and add to the array.
            if (event.target.checked) {
                if (target.name === 'cardColor') {
                    value = [...this.state.cardColor, target.value]
                } else if (target.name === 'cardLegality') {
                    value = [...this.state.cardLegality, target.value]
                }
            }
            ////check the target and remove to the array.
            else {
                if (target.name === 'cardColor') {
                    let array = [...this.state.cardColor];
                    let index = array.indexOf(target.value);
                    array.splice(index, 1);
                    value = array;
                } else if (target.name === 'cardLegality') {
                    let array = [...this.state.cardLegality];
                    let index = array.indexOf(target.value);
                    array.splice(index, 1);
                    value = array;
                }
            }
        } else {
            value = target.value;
        }

        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    searchCard = () => {

        let search = this.state.query
        let form = this.state.form

        console.log('search: ' + search);
        console.log('colors: ' + this.state.cardColor);
        console.log('legalities: ' + this.state.cardLegality);
        console.log('cardSetName: ' + this.state.cardSetName);
        console.log('types: ' + this.state.cardType);
        console.log('text: ' + this.state.cardText);
        console.log('CardName: ' + this.state.cardName);

        if (search === undefined || search === null || search === '') {
            return
        } else {
            this.setState({modal: true, spinner: true})

            mtg.card.all({
                name: search,
                colors: form.colors,
                text: form.text,
                legalities: form.legality,
                setName: form.set,
                pageSize: 4
            })
                //* note, when a value is '' it simply isnt searched for but no error is thrown
                .on('data', card => {
                    var searchedCard = {
                        name: card.name,
                        img: card.imageUrl,
                        manaCost: card.manaCost,
                        cmc: card.cmc,
                        colors: card.colors,
                        types: card.types,
                        setName: card.setName,
                        text: card.text,
                        legality: card.legalities
                    }

                    this.setState({result: [...this.state.result, searchedCard], spinner: false})
                })
        }
    }

    render() {

        return (

            <div>
                <Modal
                    style={{height: '70%', marginTop: '5em'}}
                    show={this.state.modal}
                    onHide={() => {
                        this.setState({modal: !this.state.modal})
                    }}
                    onExit={() => {
                        console.log('modal closed')
                    }}
                    size="sm"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered>


                    <Modal.Body style={{height: '100%', width: '100%'}}>
                        {this.loaded()}
                    </Modal.Body>

                    <Modal.Footer>
                        <Button size='block' onClick={this.closeModal}>Close</Button>
                    </Modal.Footer>

                </Modal>


                <Modal show={this.state.menu} onHide={() => this.toggleMenu()}>
                    <Modal.Body className="advancedSearchMenu">

                        <Form onSubmit={(e) => {
                            this.setState({name: e.target.value})
                        }}>
                            <Form.Group controlId="formBasicCardName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control name='cardName' type="text" placeholder="Enter card name"
                                              value={this.state.cardName} onChange={this.handleChange}/>
                            </Form.Group>

                            <Form.Group controlId="formBasicCardText">
                                <Form.Label>Name</Form.Label>
                                <Form.Control name='cardText' type="text" placeholder="Enter card text"
                                              value={this.state.cardText} onChange={this.handleChange}/>
                            </Form.Group>

                            <Form.Group controlId="formBasicCardSet">
                                <Form.Label>Set Name</Form.Label>
                                <Form.Control name='cardSetName' type="text" placeholder="Enter set name"
                                              value={this.state.cardSetName} onChange={this.handleChange}/>
                            </Form.Group>

                            <Form.Label>card colors</Form.Label>
                            <Form.Group controlId="formBasicColors">
                                <div className="formSubsection">
                                    <Form.Check name="cardColor" type="checkbox" label="Blue" value="Blue"
                                                onChange={this.handleChange}/>
                                    <Form.Check name="cardColor" type="checkbox" label="Black" value="Black"
                                                onChange={this.handleChange}/>
                                    <Form.Check name="cardColor" type="checkbox" label="White" value="White"
                                                onChange={this.handleChange}/>
                                    <Form.Check name="cardColor" type="checkbox" label="Green" value="Green"
                                                onChange={this.handleChange}/>
                                    <Form.Check name="cardColor" type="checkbox" label="Red" value="Red"
                                                onChange={this.handleChange}/>
                                </div>
                            </Form.Group>

                            <Form.Label>legality</Form.Label>
                            <Form.Group controlId="formBasicLegality">
                                <div className="formSubsection">
                                    <Form.Check name="cardLegality" type="checkbox" label="Standard" value="Standard"
                                                onChange={this.handleChange}/>
                                    <Form.Check name="cardLegality" type="checkbox" label="Modern" value="Modern"
                                                onChange={this.handleChange}/>
                                    <Form.Check name="cardLegality" type="checkbox" label="Commander" value="Commander"
                                                onChange={this.handleChange}/>
                                    <Form.Check name="cardLegality" type="checkbox" label="Pioneer" value="Pioneer"
                                                onChange={this.handleChange}/>
                                    <Form.Check name="cardLegality" type="checkbox" label="Legacy" value="Legacy"
                                                onChange={this.handleChange}/>
                                    <Form.Check name="cardLegality" type="checkbox" label="Vintage" value="Vintage"
                                                onChange={this.handleChange}/>
                                    <Form.Check name="cardLegality" type="checkbox" label="Pauper" value="Pauper"
                                                onChange={this.handleChange}/>
                                </div>
                            </Form.Group>

                            <Form.Group controlId="formBasicType">
                                <Form.Label>card Type</Form.Label>
                                <div className="formSubsection">
                                    <Form.Check name="cardType" type="radio" label="creature" value="creature"
                                                onChange={this.handleChange}/>
                                    <Form.Check name="cardType" type="radio" label="sorcery" value="sorcery"
                                                onChange={this.handleChange}/>
                                    <Form.Check name="cardType" type="radio" label="artifact" value="artifact"
                                                onChange={this.handleChange}/>
                                    <Form.Check name="cardType" type="radio" label="land" value="land"
                                                onChange={this.handleChange}/>
                                </div>
                            </Form.Group>


                            <Button variant="primary" type="submit" size='block' onClick={(e) => {
                                this.closeModal(e)
                            }}>
                                Close
                            </Button>
                        </Form>

                    </Modal.Body>
                </Modal>


                <div style={{display: 'inline-flex'}}>

                    <InputGroup className="mb-3" onChange={(e) => this.updateInput(e)}>
                        <InputGroup.Append>
                            <button type="submit" onClick={() => this.searchCard()}><FaSearch/></button>
                        </InputGroup.Append>

                        <InputGroup.Prepend>
                            <button type="submit" onClick={() => this.toggleMenu()}><GiHamburgerMenu/></button>
                        </InputGroup.Prepend>

                        <FormControl aria-describedby="basic-addon1"/>
                    </InputGroup>
                </div>
            </div>
        )


    }
}
