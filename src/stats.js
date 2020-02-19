import React, { Component } from 'react'
import {TiDelete} from 'react-icons/ti';


export default class Stats extends Component {


    render() {
        return (
            <div className="stats">    

                 {this.props.props.stats.map((stat,index)=>{
                        return(
                            <div key={index} className="statsNames">
                            <p>{stat.name}</p>
                            <p>{stat.value}</p>
                            <TiDelete type="button" onClick={()=>{this.props.removeStat(stat.id)}}/>
                            </div>
                        )
                    })}
                    
            </div>
               
                  
        )
    }
}
