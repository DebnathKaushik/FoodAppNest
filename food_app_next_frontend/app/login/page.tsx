import Link from "next/link";

export default function Login() {
  return (
    <>
      <h1>Login Page</h1>
      <br></br>

      <form>
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" name="username" id="username" placeholder="UserName" />
        </div>
        <br></br>

        <div>
          <label htmlFor="email">Email:</label>
          <input type="text" name="email" id="email" placeholder="Email" />
        </div>
        <br></br>

        <div>
          <button type="submit" >Submit</button>
        </div>
      </form>
      <br></br>

     <Link href="/signup" className="mb-6 ">
        Create an Account
      </Link>

        <br></br>

       <Link href="/users" className="mb-6 ">
        Users 
      </Link>



    </>
  );
}
