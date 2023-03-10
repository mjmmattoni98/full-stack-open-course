type IPart = {
  id: number;
  name: string;
  exercises: number;
};

type ICourse = {
  id: number;
  name: string;
  parts: IPart[];
};

function Header({ course }: { course: string }) {
  return <h1 className="ml-2 text-xl font-bold">{course}</h1>;
}

function Content({ parts }: { parts: IPart[] }) {
  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
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
  const exercises = parts.reduce((carry, part) => carry + part.exercises, 0);
  return (
    <p className="m-2 text-lg font-bold">total of {exercises} exercises</p>
  );
}

function Course({ course }: { course: ICourse }) {
  return (
    <div className="flex flex-col items-center">
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
}

export default Course;