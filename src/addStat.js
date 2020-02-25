import React, { Component } from 'react'
import {AiFillQuestionCircle} from 'react-icons/ai';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import {Button,Tooltip} from 'react-bootstrap';

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
            <div>

                <form className="addStatForm" onSubmit={(e)=>e.preventDefault()} >
                   
                        <input name='newStat' value={ this.state.newStat } onChange={this.handleChange}/>
                    
                    <div className="addStatBtn">
                    <Button variant="outline-light" onClick={ async()=>{
                        this.props.addStat(this.state.newStat) 
                        this.setState({newStat:''})
                        }} type="button">Add Stat</Button>

                                <OverlayTrigger placement="right" overlay={this.getTooltip()} trigger="click" rootClose={true}>
                                <AiFillQuestionCircle style={{marginLeft:'1em'}}/>
                                </OverlayTrigger>
                    </div>
                    
                    
                </form>
            </div>
        )
    }
}
