'use client'
import { use } from 'react'

export default function users({params,}: 
    { params:  Promise<{ id: string }> }) {
    const {id} = use(params)
    return(
        <>
            <p>User {id} </p>
        </>
    )

}

