import Countries from "./Countries/Countries";
import Courses from "./Courses/Courses";
import Phonebook from "./Phonebook/Phonebook";

function App() {
  return (
    <div className="bg-cyan-100 flex flex-col justify-center items-center w-screen h-screen">
      {/* <Courses /> */}
      <Phonebook />
      {/* <Countries /> */}
    </div>
  );
}

export default App;
