import React, { Component } from 'react'


export default class Stats extends Component {


    render() {
        return (
            <div className="stats">

                <p>Stats are valued 0-10 with 10 being the highest possible score.</p>     

                <div className="statsNames">

                 <div>
                <p>Drawability</p>
                <p>Control Factor</p>
                <p>Mana Cost</p>
                <p>Power</p>
                <p>Land</p>
                <p>tokens</p>
                </div>
              
                    <div className="statsValues">
                    <p>{this.props.props.drawability}</p>
                    <p>{this.props.props.control}</p>
                    <p>{this.props.props.manaCost}</p>
                    <p>{this.props.props.power}</p>
                    <p>{this.props.props.land}</p>
                    <p>{this.props.props.tokens}</p>
                    </div>
                </div>
               

            </div>
               
                  
        )
    }
}
