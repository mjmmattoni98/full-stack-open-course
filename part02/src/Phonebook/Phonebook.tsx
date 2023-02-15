import { useState } from "react";

type User = {
  id: number;
  name: string;
  phone: string;
};

function Title({ title }: { title: string }) {
  return <h2 className="font-bold text-3xl m-2">{title}</h2>;
}

function Button({
  text,
  type,
}: {
  text: string;
  type: "button" | "submit" | "reset";
}) {
  return (
    <button
      type={type}
      className="m-2 px-4 py-2 bg-blue-500 text-white rounded"
    >
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

function Person({ user }: { user: User }) {
  return (
    <div>
      <p className="m-2 text-lg">
        {user.name} {user.phone}
      </p>
    </div>
  );
}

function Phonebook() {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", phone: "040-123456", id: 1 },
    { name: "Ada Lovelace", phone: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", phone: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", phone: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filterPerson, setFilterPerson] = useState("");
  const [filteredPersons, setFilteredPersons] = useState(persons);

  function filterPersons(value: string) {
    setFilterPerson(value);
    const filtered = persons.filter((person) =>
      person.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredPersons(filtered);
  }

  function addPerson(event: React.FormEvent) {
    event.preventDefault();
    const personObject = {
      id: persons.length + 1,
      name: newName,
      phone: newPhone,
    };
    if (newName === "" || newPhone === "") {
      alert("Please fill in the form");
      return;
    }
    if (persons.find((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    const newPersons = [...persons, personObject];
    setPersons(newPersons);
    setNewName("");
    setNewPhone("");
    filterPersons(filterPerson);
  }

  return (
    <div>
      <Title title="Phonebook" />
      <Input
        name="filter shown with"
        value=""
        onChange={(event) => filterPersons(event.target.value)}
      />
      <Title title="Add a new" />
      <form onSubmit={addPerson}>
        <Input
          name="name"
          value={newName}
          onChange={(event) => setNewName(event.target.value)}
        />
        <Input
          name="phone"
          value={newPhone}
          onChange={(event) => setNewPhone(event.target.value)}
        />
        <Button type={"submit"} text="add" />
      </form>
      <Title title="Numbers" />
      {filteredPersons.map((person) => (
        <Person key={person.name} user={person} />
      ))}
    </div>
  );
}

export default Phonebook;
