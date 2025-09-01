'use client'
import { use } from 'react'

export default function users({params,}: 
    { params:  Promise<{ id: string }> }) {
    const {id} = use(params)
    return(
        <>
            <p>This is User {id} Details </p>
            <h2>Name: Kaushik Debnath</h2>
            <h2>Email: kaushik123@gmail.com</h2>
        </>
    )

}

