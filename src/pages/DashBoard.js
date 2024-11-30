import Typewriter from "typewriter-effect";

const PostLogin = () => {

  return (
    <div className="flex flex-col items-center space-y-10 p-5">
      {/* Hero Section */}
      <div className="text-center space-y-5">
        <h1 className="text-5xl font-bold">
          <Typewriter
            options={{
              strings: ["Welcome to TesterAlly"],
              autoStart: true,
              loop: false,
              cursor: "",
              deleteSpeed: Infinity,
            }}
          />
        </h1>
        <p className="text-xl text-gray-600">
          AI-based Test Automation Tool to simplify your testing process. 
          Empower your testing with the power of AI.
        </p>
        {/* <div className="space-x-4">
          <button
            className="px-5 py-2 bg-blue-500 text-white rounded-md"
            onClick={() => navigate("register")}
          >
            Signup
          </button>
          <button
            className="px-5 py-2 bg-green-500 text-white rounded-md"
            onClick={() => navigate("login")}
          >
            Login
          </button>
        </div> */}
      </div>

      {/* Features Section */}
      <div className="w-full max-w-4xl text-center space-y-5">
        <h2 className="text-3xl font-bold">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard
            title="AI-Based Automation"
            description="Automate repetitive testing tasks using AI-driven workflows."
            icon="🤖"
          />
          <FeatureCard
            title="Vision Agent"
            description="Capture coordinates of elements from images for precise operations."
            icon="👁"
          />
          <FeatureCard
            title="Streamlined Testing"
            description="Perform complex testing actions like button clicks and form filling."
            icon="⚡"
          />
        </div>
      </div>

      {/* How It Works Section */}
      <div className="w-full max-w-4xl text-center space-y-5">
        <h2 className="text-3xl font-bold">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StepCard
            step="1"
            title="Upload Image"
            description="Upload an image containing the UI to be tested."
          />
          <StepCard
            step="2"
            title="Process Coordinates"
            description="Let AI analyze the image and extract element coordinates."
          />
          <StepCard
            step="3"
            title="Perform Actions"
            description="Use the extracted data to automate testing operations."
          />
        </div>
      </div>

      {/* Call-to-Action Section */}
      {/* <div className="text-center space-y-3">
        <h3 className="text-2xl font-bold">Ready to Simplify Your Testing?</h3>
        <button
          className="px-6 py-3 bg-blue-500 text-white rounded-md"
          onClick={() => navigate("register")}
        >
          Get Started Now
        </button>
      </div> */}
    </div>
  );
};

const FeatureCard = ({ title, description, icon }) => (
  <div className="p-5 bg-gray-100 rounded-lg shadow-md">
    <div className="text-5xl mb-3">{icon}</div>
    <h3 className="text-xl font-bold">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const StepCard = ({ step, title, description }) => (
  <div className="p-5 bg-gray-100 rounded-lg shadow-md">
    <div className="text-5xl font-bold mb-3 text-blue-500">{step}</div>
    <h4 className="text-lg font-bold">{title}</h4>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default PostLogin;