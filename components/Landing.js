import React from 'react'

const Landing = () => (
  <div id="landing" className="pt-24">
    <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center">
      {/* Left col */}
      <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
        <h1 className="tracking-normal font-semibold">Study</h1>
        <h2 className="tracking-normal text-4xl text-blue">
          Everything a student needs.
        </h2>
        <h2 className="tracking-normal text-4xl text-blue">In one app.</h2>
        <a className="pt-12 cta text-xl">Try now for free</a>
      </div>
      {/* Right col */}
      <div className="w-full md:w-3/5 py-6 text-center">
        <img className="w-full z-50" src="/landing_image.jpg" />
      </div>
    </div>
  </div>
)

export default Landing
