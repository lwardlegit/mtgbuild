import React, { Component } from 'react'

export default class progressBar extends Component {
    constructor(){
        this.state={

        }
    }
    render() {
        const [progress, color, name] = this.props
        return (
            <div style={{ width: {progress}, backgroundColor:{color} }}>
                <h4>{this.props.name}</h4>
            </div>
        )
    }
}
