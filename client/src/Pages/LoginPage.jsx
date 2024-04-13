import { Link , Navigate} from "react-router-dom";
import {useState , useContext} from 'react';
import axios from 'axios';
import { UserContext } from "../UserContext";
import toast from 'react-hot-toast'
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect , setRedirect] = useState(false);
  const {setUser} = useContext(UserContext);

  async function handleLoginSubmit(ev){
    ev.preventDefault();
    
    try{
        const response = await axios.post('/login' , {email, password});
        if(response.data.error){
          throw new Error(response.data.error)
        }else{
          setUser(response.data);
          toast.success("Login Successful");
          setRedirect(true);
        }
        
      } catch(err){
        toast.error(err.message)
      }
        
    
  }


  if(redirect) {
    return <Navigate to={'/'} />
  }



  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="primary">Login</button>
          <div className="text-center py-2 text-gray-500">
            Don't have an account yet?{" "}
            <Link className="underline text-black" to={"/register"}>
              Register now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
