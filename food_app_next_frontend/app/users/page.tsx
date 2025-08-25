import Link from "next/link";

export default function Showalluser(){
    return(
        <>
        <Link href="users/1">user 1</Link>
        <br></br>
        <Link href="users/2">user 2</Link>
        <br></br>
        <Link href="users/3">user 3</Link>
        <br></br>
        <Link href="users/4">user 4</Link>
        </>
        
    )
}