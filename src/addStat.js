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
            word(s) and measures their frequency on 
            a scale of 1-10
            </Tooltip>;
    }

    handleChange=({ target }) =>{
        this.setState({
          [target.name]: target.value
        });
      }

    render() {
        return (
            <div style={{marginTop: '10%'}}>

                <form onSubmit={(e)=>e.preventDefault()} >
                    <label>
                        Stat Name:
                        <input name='newStat' value={ this.state.newStat } onChange={this.handleChange}/>
                    </label>
                    <button onClick={()=>this.props.addStat(this.state.newStat)} type="button">add</button>
                    
                    <OverlayTrigger placement="right" overlay={this.getTooltip()} trigger="hover" rootClose={true}>
                        <AiFillQuestionCircle/>
                    </OverlayTrigger>
                </form>
            </div>
        )
    }
}
