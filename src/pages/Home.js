import Typewriter from "typewriter-effect";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left Section */}
      <div className="flex-1 flex justify-center bg-gray-100">
        <div>
        <div className="font-bold text-7xl my-5 text-center bg-gradient-to-r from-pink-400 via-slate-500 to-purple-500 bg-clip-text text-transparent">
            <Typewriter
              options={{
                strings: ["Welcome to TesterAlly"], // Text to type
                autoStart: true, // Automatically starts typing
                loop: false, // Does not repeat typing
                cursor: "", // Remove cursor
                deleteSpeed: Infinity,
              }}
            />
          </div>
          <div className="font-bold text-4xl my-5 text-center bg-gradient-to-r from-pink-300 via-slate-500 to-purple-500 bg-clip-text text-transparent">
            <Typewriter
              options={{
                strings: ["An AI based automation tool"], // Text to type
                autoStart: true, // Automatically starts typing
                loop: false, // Does not repeat typing
                cursor: "", // Remove cursor
                deleteSpeed: Infinity,
              }}
            />
          </div>
          <div className="flex justify-center">
            <div className="w-96 h-96 bg-cover bg-center" style={{ backgroundImage: 'url("homeAi.jpeg")' }}></div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1 flex flex-col items-center justify-center bg-white">
      <h2 className="font-bold text-3xl my-5 text-center bg-gradient-to-r from-pink-300 via-slate-500 to-purple-500 bg-clip-text text-transparent">
          Kindly Signup or Login to continue
        </h2>
        <img src="signup.jpg" alt="" className="w-96 h-96"/>
        
        <div className="flex space-x-8">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md" onClick={()=>navigate('register')}>
            Signup
          </button>
          <button className="px-4 py-2 bg-green-500 text-white rounded-md" onClick={()=>navigate('login')}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
