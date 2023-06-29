
function App() {

  return (
    <>
      <div
         className="flex flex-row justify-center items-center p-4"
      >
        <input 
        className="m-2 p-2 border-2 border-gray-300 rounded-lg w-1/4 text-center focus:outline-none 
        focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all duration-500 ease-in-out
         hover:border-green-600 hover:ring-2 hover:ring-green-600 hover:border-transparent 
         h-10 text-lg font-semibold text-gray-600 placeholder-gray-400 focus:w-1/3
         focus:text-gray-700 focus:shadow-md focus:ring-2 focus:ring-offset-2
         focus:ring-opacity-50 focus:h-13
        "
        placeholder="Search for an artist"
        type="search" 
        name="search" 
        id="search" 
        />
      </div>
    </>
  );
}

export default App;
