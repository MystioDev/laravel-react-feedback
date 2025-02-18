import { useState, useEffect, useRef } from "react";
import Feedback from "./components/Feedback";

function App() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [shouldRefetch, setShouldRefetch] = useState(true);

  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/feedbacks", {
      method: "get",
    })
      .then((res) => res.json())
      .then((res) => {
        setFeedbacks(res);
      })
      .finally(() => setShouldRefetch(false));
  }, [shouldRefetch]);

  const [emailField, setEmailField] = useState("");
  const [riotIdField, setRiotIdField] = useState("");
  const [serverTagField, setServerTagField] = useState("");
  const [topicField, setTopicField] = useState("");
  const [complaintField, setComplaintField] = useState("");

  const [respondMessage, setRespondMessage] = useState("");

  const handleFeedbackCreate = () => {
    if (!emailField) {
      setErrorMessage("e-mail cím megadása kötelező");
      return;
    }

    if (!riotIdField) {
      setErrorMessage("riot id megadása kötelező");
      return;
    }

    if (!serverTagField) {
      setErrorMessage("szerver tag megadása kötelező");
      return;
    }

    if (!topicField) {
      setErrorMessage("téma megadása kötelező");
      return;
    }

    if (!complaintField) {
      setErrorMessage("panasz megadása kötelező");
      return;
    }

    setErrorMessage(null);

    fetch("http://127.0.0.1:8000/api/feedbacks/create", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: emailField,
        riotId: riotIdField,
        serverTag: serverTagField,
        topic: topicField,
        complaint: complaintField,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setRespondMessage(res.message);

        setShouldRefetch(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center w-screen min-h-screen bg-gray-200">
        <main className="p-5 bg-gray-100 rounded-xl flex flex-wrap gap-5">
          <article className="p-5 bg-gray-50 rounded-xl">
            <h1 className="text-2xl font-bold">Eddigi visszajelzések:</h1>
            <section className="flex flex-col justify-center items-center">
              {feedbacks.map((feedback, index) => (
                <Feedback
                  key={index}
                  feedback={feedback}
                  updater={setShouldRefetch}
                ></Feedback>
              ))}
            </section>
          </article>

          <article className="p-5 bg-gray-50 rounded-xl flex flex-col gap-5">
            <h1 className="text-2xl font-bold">Új panasz felvétele</h1>

            <label htmlFor="email">e-mail cím megadása</label>
            <input
              onChange={(e) => setEmailField(e.currentTarget.value)}
              className="border-b-2 focus:outline-0 p-1"
              placeholder="example@email.com"
              type="text"
              name="email"
              id="email"
            />

            <label htmlFor="riot_id">riot id megadása</label>
            <input
              onChange={(e) => setRiotIdField(e.currentTarget.value)}
              className="border-b-2 focus:outline-0 p-1"
              placeholder="myst1o"
              type="text"
              name="riot_id"
              id="riot_id"
            />

            <label htmlFor="server_tag">server tag megadása</label>
            <input
              onChange={(e) => setServerTagField(e.currentTarget.value)}
              className="border-b-2 focus:outline-0 p-1"
              placeholder="EUNE"
              type="text"
              name="server_tag"
              id="server_tag"
            />

            <label htmlFor="topic">téma megadása</label>
            <input
              onChange={(e) => setTopicField(e.currentTarget.value)}
              className="border-b-2 focus:outline-0 p-1"
              placeholder="Fiók probléme"
              type="text"
              name="topic"
              id="topic"
            />

            <label htmlFor="complaint">panasz leírása</label>
            <textarea
              onChange={(e) => setComplaintField(e.currentTarget.value)}
              className="border-b-2 focus:outline-0 p-1"
              placeholder="Részletes leírás a fent említett témáról"
              type="text"
              name="complaint"
              id="complaint"
            />

            <button
              onClick={handleFeedbackCreate}
              className="transition-all bg-green-500 hover:bg-green-400 p-2 rounded-xl text-white text-lg font-bold font-mono cursor-pointer"
              type="button"
            >
              Panasz felvétele
            </button>

            {errorMessage ? (
              <div className="text-red-500">{errorMessage}</div>
            ) : null}

            {respondMessage ? (
              <div className="text-green-500">{respondMessage}</div>
            ) : null}
          </article>
        </main>
      </div>
    </>
  );
}

export default App;
