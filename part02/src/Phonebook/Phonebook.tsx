import axios from "axios";
import { useEffect, useState } from "react";

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

function AddPersonForm({
  addPerson,
  newName,
  setNewName,
  newPhone,
  setNewPhone,
}: {
  addPerson: (event: React.FormEvent) => void;
  newName: string;
  setNewName: (value: string) => void;
  newPhone: string;
  setNewPhone: (value: string) => void;
}) {
  return (
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
  );
}

function Phonebook() {
  const [persons, setPersons] = useState(Array<User>);
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
    // filterPersons(filterPerson);
  }

  const hook = () => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  };

  useEffect(hook, []);

  useEffect(() => {
    filterPersons(filterPerson);
  }, [persons]);

  return (
    <div>
      <Title title="Phonebook" />
      <Input
        name="filter shown with"
        value={filterPerson}
        onChange={(event) => filterPersons(event.target.value)}
      />
      <Title title="Add a new" />
      <AddPersonForm
        addPerson={addPerson}
        newName={newName}
        setNewName={setNewName}
        newPhone={newPhone}
        setNewPhone={setNewPhone}
      />
      <Title title="Numbers" />
      {filteredPersons.map((person) => (
        <Person key={person.name} user={person} />
      ))}
    </div>
  );
}

export default Phonebook;
