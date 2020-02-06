import React, { Component } from 'react';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Spinner from 'react-bootstrap/Spinner'

import { FaSearch } from 'react-icons/fa';
import {GiCardPlay} from 'react-icons/gi';

const mtg = require('mtgsdk');


export default class Search extends Component {
    state={
        spinner:false,
        modal:false,
        form: '',
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

  updateInput = (e) =>{
    this.setState({form: e.target.value})
  }


  searchCard = (search) =>{
    
    if (search === undefined || search === null || search === ''){ 
        return 
    }else{
        this.setState({modal:true, spinner:true})

        mtg.card.all({ name: search, pageSize: 4 })
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

            <div style={{display: 'inline-flex'}}>

            <InputGroup className="mb-3" onChange={(e)=>this.updateInput(e)}>
                <InputGroup.Append>
                <button type="submit" onClick = {()=>this.searchCard(this.state.form)}><FaSearch/></button>
                </InputGroup.Append>
                <FormControl aria-describedby="basic-addon1" />
            </InputGroup>

            
                </div>
            </div>
            )
        
        
    }
}
