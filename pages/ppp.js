import React from 'react'

import useSWR from 'swr'


const PPP = ({data}) => {
 

  
  if (!data) return <div>loading...</div>
  return <div>hello {console.log(data)}!</div>

  
}

export async function getStaticProps(context) {
  const res = await fetch('http://localhost:3000/api/user')
  const data = await res.json()

  if(!data) {
    return {
      notFound: true
    }
  }

  return {
    props: { data }
  }
}

export default PPP