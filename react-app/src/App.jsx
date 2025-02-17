import { useState, useEffect } from "react";
import Feedback from "./components/Feedback";

function App() {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/feedbacks", {
      method: "get",
    })
      .then((res) => res.json())
      .then((res) => {
        setFeedbacks(res);
      });
  }, []);

  return (
    <>
      <div className="flex flex-col justify-center items-center w-screen min-h-screen bg-gray-200">
        <main className="p-5 bg-gray-100 rounded-xl flex gap-5">
          <article className="p-5 bg-gray-50 rounded-xl">
            <h1 className="text-2xl font-bold">Eddigi visszajelzések:</h1>
            <section className="flex justify-center items-center">
              {feedbacks.map((feedback, index) => (
                <Feedback key={index} feedback={feedback}></Feedback>
              ))}
            </section>
          </article>

          <article className="p-5 bg-gray-50 rounded-xl flex flex-col gap-5">
            <h1 className="text-2xl font-bold">Új panasz felvétele</h1>

            <label htmlFor="email">e-mail cím megadása</label>
            <input
              className="border-b-2 focus:outline-0 p-1"
              placeholder="example@email.com"
              type="text"
              name="email"
              id="email"
            />

            <label htmlFor="riot_id">riot id megadása</label>
            <input
              className="border-b-2 focus:outline-0 p-1"
              placeholder="myst1o"
              type="text"
              name="riot_id"
              id="riot_id"
            />

            <label htmlFor="server_tag">server tag megadása</label>
            <input
              className="border-b-2 focus:outline-0 p-1"
              placeholder="EUNE"
              type="text"
              name="server_tag"
              id="server_tag"
            />

            <label htmlFor="topic">téma megadása</label>
            <input
              className="border-b-2 focus:outline-0 p-1"
              placeholder="Fiók probléme"
              type="text"
              name="topic"
              id="topic"
            />

            <label htmlFor="complaint">panasz leírása</label>
            <textarea
              className="border-b-2 focus:outline-0 p-1"
              placeholder="Részletes leírás a fent említett témáról"
              type="text"
              name="complaint"
              id="complaint"
            />

            <button
              className="transition-all bg-green-500 hover:bg-green-400 p-2 rounded-xl text-white text-lg font-bold font-mono cursor-pointer"
              type="button"
            >
              Panasz felvétele
            </button>
          </article>
        </main>
      </div>
    </>
  );
}

export default App;
