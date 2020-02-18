import React, { Component } from 'react'


export default class Stats extends Component {


    render() {
        return (
            <div className="stats">    

                 {this.props.props.stats.map((stat,index)=>{
                        return(
                            <div className="statsNames">
                            <p>{stat.name}</p>
                            <p>{stat.value}</p>
                            </div>
                        )
                    })}
                    
            </div>
               
                  
        )
    }
}
