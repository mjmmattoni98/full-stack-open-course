type IPart = {
  name: string;
  exercises: number;
};

function Header({ course }: { course: string }) {
  return <h1 className="ml-2 text-xl font-bold">{course}</h1>;
}

function Content({ parts }: { parts: IPart[] }) {
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.name} part={part} />
      ))}
    </div>
  );
}

function Part({ part }: { part: IPart }) {
  return (
    <p className="m-2 text-lg">
      {part.name} {part.exercises}
    </p>
  );
}

function Total({ parts }: { parts: IPart[] }) {
  return (
    <p className="m-2 text-lg">
      Number of exercises{" "}
      {parts.reduce((carry, part) => carry + part.exercises, 0)}
    </p>
  );
}

function App() {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  return (
    <div className="bg-cyan-100 flex flex-col items-center justify-center w-screen h-screen">
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
}

export default App;
