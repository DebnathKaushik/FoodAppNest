import Link from "next/link";

export default function Login() {
  return (
    <>
      <h1>Signup Here</h1>
      <br></br>

     <form>
        <div >
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
          <label htmlFor="Password">Password:</label>
          <input type="password" name="password" id="password" placeholder="Password" />
        </div>
        <br></br>

        <div>
          <label htmlFor="Phone">Phone:</label>
          <input type="text" name="phone" id="phone" placeholder="Phone" />
        </div>
        <br></br>



        <div>
          <button type="submit" >Submit</button>
        </div>
      </form>
      <br></br>

     <Link href="/login" className="mb-6 ">
        Already have Account
      </Link>

    </>
  );
}
