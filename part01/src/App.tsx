import { useState } from "react";

// type IPart = {
//   name: string;
//   exercises: number;
// };

// function Header({ course }: { course: string }) {
//   return <h1 className="ml-2 text-xl font-bold">{course}</h1>;
// }

// function Content({ parts }: { parts: IPart[] }) {
//   return (
//     <div>
//       {parts.map((part) => (
//         <Part key={part.name} part={part} />
//       ))}
//     </div>
//   );
// }

// function Part({ part }: { part: IPart }) {
//   return (
//     <p className="m-2 text-lg">
//       {part.name} {part.exercises}
//     </p>
//   );
// }

// function Total({ parts }: { parts: IPart[] }) {
//   return (
//     <p className="m-2 text-lg">
//       Number of exercises{" "}
//       {parts.reduce((carry, part) => carry + part.exercises, 0)}
//     </p>
//   );
// }

// Make a button component with tailwind css
function Button({ text, onClick }: { text: string; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      {text}
    </button>
  );
}

// Make a title component with tailwind css
function Title({ text }: { text: string }) {
  return <h1 className="m-2 text-2xl font-bold">{text}</h1>;
}

function GiveFeedback({
  incrementGood,
  incrementNeutral,
  incrementBad,
}: {
  incrementGood: () => void;
  incrementNeutral: () => void;
  incrementBad: () => void;
}) {
  return (
    <div className="flex flex-col items-center">
      <Title text="give feedback" />
      <div>
        <Button text="good" onClick={incrementGood} />
        <Button text="neutral" onClick={incrementNeutral} />
        <Button text="bad" onClick={incrementBad} />
      </div>
    </div>
  );
}

function StatisticLine({
  text,
  value,
}: {
  text: string;
  value: number | string;
}) {
  return (
    <p>
      {text} {value}
    </p>
  );
}

function Statistics({
  good,
  neutral,
  bad,
}: {
  good: number;
  neutral: number;
  bad: number;
}) {
  function calculateTotal() {
    return good + neutral + bad;
  }

  function calculateAverage() {
    return (good - bad) / calculateTotal();
  }

  function calculatePositive() {
    return (good / calculateTotal()) * 100;
  }

  return (
    <div className="flex flex-col items-center">
      {calculateTotal() === 0 ? (
        <p>No feedback given</p>
      ) : (
        <>
          <Title text="statistics" />
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={calculateTotal()} />
          <StatisticLine text="average" value={calculateAverage()} />
          <StatisticLine text="positive" value={`${calculatePositive()}%`} />
        </>
      )}
    </div>
  );
}

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const incrementGood = () => setGood(good + 1);
  const incrementNeutral = () => setNeutral(neutral + 1);
  const incrementBad = () => setBad(bad + 1);

  return (
    <div className="bg-cyan-100 flex flex-col items-center w-screen h-screen">
      <GiveFeedback
        incrementGood={incrementGood}
        incrementNeutral={incrementNeutral}
        incrementBad={incrementBad}
      />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
  // const course = {
  //   name: "Half Stack application development",
  //   parts: [
  //     {
  //       name: "Fundamentals of React",
  //       exercises: 10,
  //     },
  //     {
  //       name: "Using props to pass data",
  //       exercises: 7,
  //     },
  //     {
  //       name: "State of a component",
  //       exercises: 14,
  //     },
  //   ],
  // };

  // return (
  //   <div className="bg-cyan-100 flex flex-col items-center justify-center w-screen h-screen">
  //     <Header course={course.name} />
  //     <Content parts={course.parts} />
  //     <Total parts={course.parts} />
  //   </div>
  // );
}

export default App;
