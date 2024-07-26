import  {useState}from 'react'
import "./login.css"
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword , signInWithEmailAndPassword} from 'firebase/auth';
import { auth, db  } from "../firebase";
import upload from '../upload';
import { doc, setDoc } from 'firebase/firestore';
function Login() {
  const [loading, setLoading] = useState(false);
    const [avatar, setAvatar] = useState({
        file: null,
        url: ""
      });
    
      const handleAvatar = (e) => {
        if(e.target.files){
            setAvatar({
                file: e.target.files[0],
                url: URL.createObjectURL(e.target.files[0])
              });
        }
      
       };
       const handleRegister = async(e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.target);
      
        const { username, email, password } = Object.fromEntries(formData);
      
        try {
        const res =  await createUserWithEmailAndPassword(auth, email, password);
        const imgUrl = await upload(avatar.file);
          await setDoc(doc(db, "users", res.user.uid), {
            username,
            email,
            avatar: imgUrl,
            id: res.user.uid,
            blocked: []
          });
          await setDoc(doc(db, "userchats", res.user.uid), {
            chats: []
          });
          // window.location.href = "/chatDashBoard";
      toast.success("Account created! You can login now!");
          // Registration logic goes here
        } catch (err) {
          console.log(err);
          toast.error(err.message);
        }finally {
          setLoading(false);
        }
      };
      
       const handleLogin = async(e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.target);
        const { email, password } = Object.fromEntries(formData);
    
        try {
          await signInWithEmailAndPassword(auth, email, password);
          window.location.href = "/chatDashBoard";
          toast.success("Logged in successfully!");
        } catch (err) {
          console.log(err);
          toast.error(err.message);
        } finally {
          setLoading(false);
        }
      };

  return (
    <>
       <div className="login">
       <div className="item">
        <h2>Welcome back,</h2>
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Email" name="email" required />
          <input type="password" placeholder="Password" name="password" required />
          <button type="submit" disabled={loading}>    {loading ? 'Logging in...' : 'Login'}</button>
        </form>
      </div>

<div className="separator"></div>
<div className="item">
<h2>Create an Account</h2>
        <form onSubmit={handleRegister}>
        <label htmlFor="file">
            <img src={avatar.url || "./avatar.png"} alt="Avatar Preview" />
            Upload an image
          </label>
        <input type="file" id="file" name="file" style={{ display: "none" }} onChange={handleAvatar} />
        <input type="text" placeholder="Username" name="username"  required/>
          <input type="email" placeholder="Email" name="email" required />
          <input type="password" placeholder="Password" name="password" required />
          <button type="submit" disabled={loading}>    {loading ? 'Logging in...' : 'Sign Up'}</button>
        </form>
</div>



    </div>
    </>
  )
}

export default Login