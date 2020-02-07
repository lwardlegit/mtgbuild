import React, { Component } from 'react';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';

import { FaSearch } from 'react-icons/fa';
import { GiCardPlay } from 'react-icons/gi';
import { GiHamburgerMenu } from 'react-icons/gi';



const mtg = require('mtgsdk');


export default class Search extends Component {
    state={
        spinner:false,
        modal:false,
        menu: false,
        query: '',
        form: {query: '', colors: '', text: '', legality: '', set: '' }, 
        result: [
            
        ],
    }

    loaded  = () =>{
        if(this.state.spinner===true){
            return(
                <div>
                    <Spinner animation="border" size="sm" />
                </div>
                
            )
        }else{
            
            return(
                <div style={{width: '90%', display: 'block', overflow: 'auto'}}>{
                    this.state.result.map((obj,section,index,legality,add)=>{
                        return(
                            <div key={section} style={{display: 'block', textAlign:'center', width: '100%', height: '80%', paddingBottom: '2em'}}> 
                            <img src={obj.img} style={{width:'90%', height: '100%'}}></img>
                             
                                <ul key={legality}>{()=>{
                                    for(let x in obj.legality){
                                        return(
                                            <li>{x}</li>
                                        )
                                    }
                                }}</ul>
                            
                            <Button size="block" key={add} onClick={()=>this.props.addToDeck(obj)} ><GiCardPlay/></Button>
                            </div>
                        )
                    })
            }</div>
            )
        }

    }

  closeModal = () =>{
        this.setState({modal:false})
    }

  toggleMenu = () =>{
      this.setState({menu:!this.state.menu})
  }

  updateInput = (e) =>{
    this.setState({query: e.target.value})
  }


  searchCard = () =>{

    let search = this.state.query 
    let form = this.state.form

    console.log(search)
    if (search === undefined || search === null || search === ''){ 
        return 
    }else{
        this.setState({modal:true, spinner:true})

        mtg.card.all({ name: search, colors: form.colors, text: form.text, legalities: form.legality, setName: form.set, pageSize: 4 }) 
        //* note, when a value is '' it simply isnt searched for but no error is thrown
            .on('data', card => {
                var searchedCard = {
                    name:card.name,
                    img: card.imageUrl,
                    manaCost: card.manaCost,
                    cmc: card.cmc,
                    colors: card.colors,
                    types: card.types,
                    setName: card.setName,
                    text: card.text,
                    legality: card.legalities
                }
                
            this.setState({result: [...this.state.result, searchedCard], spinner:false })
        })
    } 
  }

    render() {
        
        return (
            
            <div>
                <Modal
                    style={{height: '70%', marginTop: '5em'}}
                    show={this.state.modal}
                    onHide={()=>{this.setState({modal:!this.state.modal})}}
                    onExit ={()=>console.log('modal closed')}
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



                <Modal show={this.state.menu} onHide = {()=>this.toggleMenu()} >
                    <Modal.Body className = "advancedSearchMenu" >
                
                    <Form onSubmit={(e)=>{this.setState({name: e.target.value})}}>
                        <Form.Group controlId="formBasicCardName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control name='name' type="text" placeholder="Enter card name" />
                        </Form.Group>

                        <Form.Group controlId="formBasicCardText">
                            <Form.Label>Name</Form.Label>
                            <Form.Control name='text' type="text" placeholder="Enter card text" />
                        </Form.Group>

                        <Form.Group controlId="formBasicCardSet">
                            <Form.Label>Set Name</Form.Label>
                            <Form.Control name='set' type="text" placeholder="Enter set name" />
                        </Form.Group>

                        <Form.Label>card colors</Form.Label>
                        <Form.Group controlId="formBasicColors">
                            <div className="formSubsection">
                                <Form.Check type="checkbox" label="Blue" />
                                <Form.Check type="checkbox" label="Black" />
                                <Form.Check type="checkbox" label="White" />
                                <Form.Check type="checkbox" label="Green" />
                                <Form.Check type="checkbox" label="Red" />
                            </div>
                        </Form.Group>

                        <Form.Label>legality</Form.Label>
                        <Form.Group controlId="formBasicLegality">
                        <div className="formSubsection">
                                <Form.Check type="checkbox" label="Standard" />
                                <Form.Check type="checkbox" label="Modern" />
                                <Form.Check type="checkbox" label="Commander" />
                                <Form.Check type="checkbox" label="Pioneer" />
                                <Form.Check type="checkbox" label="Legacy" />
                                <Form.Check type="checkbox" label="Vintage" />
                                <Form.Check type="checkbox" label="Pauper" />
                        </div>
                        </Form.Group>

                        <Form.Group controlId="formBasicType">
                            <Form.Label>card Type</Form.Label>
                            <div className="formSubsection">
                                <Form.Check type="radio" label="creature" />
                                <Form.Check type="radio" label="sorcery" />
                                <Form.Check type="radio" label="artifact" />
                                <Form.Check type="radio" label="land" />
                            </div>
                        </Form.Group>

                        
                        <Button variant="primary" type="submit" size = 'block'>
                            Close
                        </Button>
                    </Form>
         
                    </Modal.Body>
                </Modal>


            <div style={{display: 'inline-flex'}}>

            <InputGroup className="mb-3" onChange={(e)=>this.updateInput(e)}>
                <InputGroup.Append>
                <button type="submit" onClick = {()=>this.searchCard()}><FaSearch/></button>
                </InputGroup.Append>
                
                <InputGroup.Prepend>
                <button type="submit" onClick = {()=>this.toggleMenu()}><GiHamburgerMenu/></button>
                </InputGroup.Prepend>
                
                <FormControl aria-describedby="basic-addon1" />
            </InputGroup>

            

            
                </div>
            </div>
            )
        
        
    }
}
