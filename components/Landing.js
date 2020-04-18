import React from 'react'

const Landing = () => (
  <div id="landing" className="pt-4 md:pt-12">
    <div className="container px-3 md:px-12 mx-auto flex flex-wrap-reverse flex-col md:flex-row items-center">
      {/* Left col */}
      <div className="order-2 md:order-1 flex flex-col w-full md:w-2/5 justify-center items-start text-left">
        <h1 className="font-semibold">Study</h1>
        <h2 className="text-4xl text-blue">Everything a student needs.</h2>
        <h2 className="text-4xl text-blue">In one app.</h2>
        <a className="pt-12 cta text-xl">Try now for free</a>
      </div>
      {/* Right col */}
      <div className="order-1 md:order-2 w-full md:w-3/5 py-6 text-center">
        <img className="w-full z-50" src="/landing_image.jpg" />
      </div>
    </div>
  </div>
)

export default Landing
