import React, { Component } from 'react'
import Button from 'react-bootstrap/button';
import {AiFillQuestionCircle} from 'react-icons/ai';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

export default class AddStat extends Component {

    state={
        newStat: ''
    }

    getTooltip(card) {
        return <Tooltip className="tooltip-inner-custom">
            the stats feature looks for cards
            in your deck matching your entered
            word(s) and measures their frequency
            (how many of a type exist in your deck)
            </Tooltip>;
    }

    handleChange=({ target }) =>{
        this.setState({
          [target.name]: target.value
        });
      }

    render() {
        return (
            <div style={{marginTop: '1.5em', display:'flex', justifyContent:'space-evenly'}}>

                <form onSubmit={(e)=>e.preventDefault()} >
                   
                        <input  style={{marginLeft: '1em'}}name='newStat' value={ this.state.newStat } onChange={this.handleChange}/>
                    
                    <button onClick={ async()=>{
                        this.props.addStat(this.state.newStat) 
                        this.setState({newStat:''})
                        }} type="button">Add Stat</button>
                    
                    <OverlayTrigger placement="right" overlay={this.getTooltip()} trigger="hover" rootClose={true}>
                        <AiFillQuestionCircle style={{marginLeft:'1em'}}/>
                    </OverlayTrigger>
                </form>
            </div>
        )
    }
}
