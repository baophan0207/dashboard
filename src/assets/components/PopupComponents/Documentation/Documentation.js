import React from 'react'
import './Documentation.css'

const Documentation = ({ documentation }) => {
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

export default Documentation
