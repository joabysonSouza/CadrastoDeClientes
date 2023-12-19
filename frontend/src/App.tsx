import "./App.css";
import { FiTrash } from "react-icons/fi";
import { useEffect, useState, useRef, FormEvent } from "react";
import { api } from "./services/api";


interface CustomersProps {
  id: string;
  name: string;
  email: string;
  status: boolean;
  created_at: string;
}

function App() {
  const [clients, setClients] = useState<CustomersProps[]>([]);

  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    ListClients();
  }, []);

  const ListClients = async () => {
    const response = await api.get("/customers").then((resp) => resp.data);
    setClients(response);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!nameRef.current?.value || !emailRef.current?.value) {
      return;
    }

    const reponse = await api
      .post("/customer", {
        name: nameRef.current?.value,
        email: emailRef.current?.value,
      })
      .then((resp) => resp.data);

    setClients((allCustomers) => [...allCustomers, reponse]);
    nameRef.current.value = ""
    emailRef.current.value = ""
  };
  const handleDelete = async (id: string) => {
    try {
      await api.delete("/customers", {
        params: {
          id: id,
        },
      });
    const allCustomers = clients.filter((customer)=> customer.id !== id)
    setClients(allCustomers)

    } 
    catch (Erro) {
      console.log(Erro);
    }
  };

  return (
    <>
      <div className="w-full min-h-screen bg-slate-700 flex justify-center px-4">
        <main className="my-10 w-full md:max-w-2xl">
          <h1 className="font-medium text-4xl text-white">Clientes</h1>

          <form className="flex flex-col" onSubmit={handleSubmit}>
            <label className="text-3xl m-4 text-white">Nome:</label>
            <input
              type="text"
              placeholder="Digite seu nome "
              className="max-w-md py-2 rounded-md"
              ref={nameRef}
            />

            <label className="text-3xl m-4  text-white">Email:</label>
            <input
              type="text"
              placeholder="Digite seu Email "
              className="max-w-md py-2 rounded-md"
              ref={emailRef}
            />
            <input
              type="submit"
              placeholder="Digite seu Email "
              className="max-w-md mt-4 py-2 rounded-md bg-green-500 cursor-pointer"
            />
          </form>
          {clients.map((customer) => (
            <section
              className="max-w-md bg-white my-10 rounded-lg relative hover:scale-105 duration-200"
              key={customer.created_at}
            >
              <article className="flex flex-col p-2  ">
                <p>
                  <span>Name:</span>
                  {customer.name}
                </p>
                <p>
                  <span>Email:</span>
                  {customer.email}
                </p>
                <p>
                  <span>Status:</span>
                  {customer.status ? "Ativo" : "Inativo"}
                </p>
              </article>
              <button
                className="bg-red-600 w-7 h-7 flex items-center justify-center right-0 -top-2 absolute"
                onClick={() => handleDelete(customer.id)}
              >
                <FiTrash size={18} color="fff" />
              </button>
            </section>
          ))}
        </main>
      </div>
    </>
  );
}

export default App;
