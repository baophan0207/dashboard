import React, { Component } from 'react'
import './Documentation.css'

class Documentation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            documentation: null,
        }
    }

    componentDidMount() {
        this.setState({ documentation: this.props.documentation })
    }

    render() {
        const { documentation } = this.state
        return (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                {documentation && (
                    <>
                        <h5 className="heading">{documentation.heading}</h5>
                        {documentation.steps.map((step, index) => (
                            <div key={index} className="instruction-container">
                                <div>
                                    <p className="title">{index + 1}.</p>
                                </div>
                                <div className="instruction-content">
                                    <p className="title">{step.title}</p>
                                    <p className="description">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </div>
        )
    }
}

export default Documentation
