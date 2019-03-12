import React from 'react'
import './About.css'
import Cat from './cat.jpg'
const About = () => (
    <div className="About-container">
        <h1>The Vinyl Place</h1>
        <p>
            A place to check my vinyl collection and tell me what You like and what you don't.
        </p>
<p>The divine mode: create/edit/delete vinyls - admin area. Sory, my place - my rules.</p>
    <p>You can check all vinyls and stats. If you register - you become a reviewer and you can vote.</p>
    <p>It's simple: you can like or dislike a vinyl only once.</p>
        <p>Try not to be a little cunning creature: you can either like a vinyl or dislike it.</p>
        <p>Afterall there is only one Shcodinger cat.</p>
        <img src={Cat} alt="cat"/>        

    </div>
)
export default About