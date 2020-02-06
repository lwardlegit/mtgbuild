import React, { Component } from 'react'
import Bars from 'react-bars';


export default class Stats extends Component {
    constructor(props){
        super(props)
        this.state = {
            testData: [
              {label:'Drawability', value:85},
              {label:'Mana', value: 10},
              {label:'Defense', value:props.defense},
              {label:'Tokens', value:props.tokenGeneration},
              {label:'Control', value:props.controlFactor, barColor:'red'},
            ]
          };
    }
    componentDidMount(){
 
}

    render() {
        
        return (
                <div>
                    <Bars data={this.state.testData} suffix={'%'} maxValue={100} showValue={true} makeUppercase={false} className = " bar bar-contain bar-suffix"/>
                </div>
                  
        )
    }
}
