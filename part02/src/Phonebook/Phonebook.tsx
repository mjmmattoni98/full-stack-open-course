import axios from "axios";
import { useEffect, useState } from "react";
import IPerson from "./types";
import PersonService from "./services/persons";
import "../index.css";

function Title({ title }: { title: string }) {
  return <h2 className="font-bold text-3xl m-2">{title}</h2>;
}

function Button({
  text,
  type,
  onClick,
}: {
  text: string;
  type: "button" | "submit" | "reset";
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <button
      type={type}
      className="m-2 px-4 py-2 bg-blue-500 text-white rounded"
      onClick={onClick}
    >
      {text}
    </button>
  );
}

function Notification({ message, type }: { message: string; type: string }) {
  return (
    <div className={type === "success" ? "success" : "error"}>{message}</div>
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

function Person({
  user,
  onCLick,
}: {
  user: IPerson;
  onCLick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <div>
      <p className="m-2 text-lg">
        {user.name} {user.phone}{" "}
        <Button text="delete" type="button" onClick={onCLick} />
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
  const [persons, setPersons] = useState(Array<IPerson>);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filterPerson, setFilterPerson] = useState("");
  const [filteredPersons, setFilteredPersons] = useState(persons);
  const [notification, setNotification] = useState("");
  const [type, setType] = useState("");

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
    const oldPerson = persons.find((person) => person.name === newName);
    if (oldPerson) {
      updatePerson(oldPerson.id, { ...personObject, id: oldPerson.id });
      return;
    }
    PersonService.create(personObject).then((person) => {
      setPersons([...persons].concat(person));
      setNewName("");
      setNewPhone("");
      setType("success");
      setNotification(`Added ${person.name}`);
      setTimeout(() => {
        setType("");
        setNotification("");
      }, 5000);
    });
  }

  function updatePerson(id: number, person: IPerson) {
    if (
      window.confirm(
        `${person.name} is already added to phonebook, replace the old number with a new one?`
      )
    ) {
      PersonService.update(id, person)
        .then((newPerson) => {
          setPersons(
            persons.map((oldPerson) =>
              oldPerson.id !== id ? oldPerson : newPerson
            )
          );
          setNewName("");
          setNewPhone("");
        })
        .catch((_) => {
          setType("error");
          setNotification(
            `Information of ${person.name} has already been removed from server`
          );
          setPersons(persons.filter((person) => person.id !== id));
          setTimeout(() => {
            setType("");
            setNotification("");
          }, 5000);
        });
    }
  }

  function removePerson(id: number) {
    const person = persons.find((person) => person.id === id);
    if (person) {
      if (window.confirm(`Delete ${person.name} ?`)) {
        PersonService.remove(id).then(() => {
          setPersons(persons.filter((person) => person.id !== id));
        });
      }
    }
  }

  const hook = () => {
    PersonService.getAll().then((response) => {
      setPersons(response);
    });
  };

  useEffect(hook, []);

  useEffect(() => {
    filterPersons(filterPerson);
  }, [persons]);

  return (
    <div>
      <Title title="Phonebook" />
      {notification ? (
        <Notification message={notification} type={type} />
      ) : null}
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
        <Person
          key={person.id}
          user={person}
          onCLick={() => removePerson(person.id)}
        />
      ))}
    </div>
  );
}

export default Phonebook;
