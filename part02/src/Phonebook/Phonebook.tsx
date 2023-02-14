import { useState } from "react";

function Title({ title }: { title: string }) {
  return <h2 className="font-bold text-3xl m-2">{title}</h2>;
}

function Button({ text }: { text: string }) {
  return (
    <button className="m-2 px-4 py-2 bg-blue-500 text-white rounded">
      {text}
    </button>
  );
}

function Input({
  name,
  value,
  onChange,
}: {
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <label htmlFor={name}>{name}:</label>
      <input
        id={name}
        className="m-2 px-4 py-2 rounded"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

function Person({ name }: { name: string }) {
  return <p className="m-2 text-lg">{name}</p>;
}

function Phonebook() {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  function addPerson(event: React.FormEvent) {
    event.preventDefault();
    const personObject = {
      name: newName,
    };
    if (persons.find((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    const newPersons = [...persons, personObject];
    setPersons(newPersons);
    setNewName("");
  }

  return (
    <div>
      <Title title="Phonebook" />
      <form onSubmit={addPerson}>
        <Input
          name="name"
          value={newName}
          onChange={(event) => setNewName(event.target.value)}
        />
        <Button text="add" />
      </form>
      <Title title="Numbers" />
      {persons.map((person) => (
        <Person key={person.name} name={person.name} />
      ))}
    </div>
  );
}

export default Phonebook;
