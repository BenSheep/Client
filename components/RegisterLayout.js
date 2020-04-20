import React from 'react'
import Link from 'next/link'

const RegisterLayout = props => (
  <div className="w-full h-screen flex flex-col mx-auto text-center bg-cream">
    <h1 className="text-blue text-4xl mt-2 md:mb-12">
      <Link href="/">
        <a>Study</a>
      </Link>
    </h1>
    <div className="mx-auto w-11/12 md:w-4/5 lg:w-2/5  justify-center items-center mt-12 shadow-2xl bg-white">
      {props.children}
    </div>
  </div>
)

export default RegisterLayout
