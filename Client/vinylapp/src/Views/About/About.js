import React from 'react'
import './About.css'
import Cat from './cat.jpg'
const About = () => (
    <div className="About">
        <h1>The Vinyl Place</h1>
        <p>
            A place to check my vinyl collection and tell me what You like and what you don't.
        </p>
        <p>Create/edit/delete vinyls - admin area. Sory, my place - my rules. I cannot vote though (the admin is only an observer).</p>
        <p>You can see all vinyls and stats. If you register - you become a reviewer and you can vote and see the vinyls' details.</p>
        <p>It's simple: you can like or dislike a vinyl only once.</p>
        <p>Try not to be a little cunning creature: you can either like a vinyl or dislike it...</p>
        <p>...Unless you are not the Schrödinger cat.</p>
        <img src={Cat} alt="cat" />

    </div>
)
export default About