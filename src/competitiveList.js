import React, { Component } from 'react'

export default class competitiveList extends Component {

    state={
        competitiveList:{
            modern:{
                tier1: [],
                tier2: [],
                tier3: [],
            },
            standard:{
                tier1: [],
                tier2: [],
                tier3: [],
                },
            commander:{
                tier1: [],
                tier2: [],
                tier3: [],
            },
        },  
    }
    render() {
        return (
            <div>
                {
                    this.state.competitiveList.map( (deck, index,tier1,tier2,tier3)=>{
                        return(
                            <div key={index}> 
                                <div key={tier1}>{deck.tier1}</div>
                                <div key={tier2}>{deck.tier2}</div>
                                <div key={tier3}>{deck.tier3}</div>
                             </div>
                        )
                    })
                }
            </div>
        )
    }
}
