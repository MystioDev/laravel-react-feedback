const Feedback = (props) => {
  return (
    <>
      {props.feedback ? (
        <article className="p-5 rounded-xl shadow shadow-gray-200 bg-white mt-5 flex flex-col gap-3 w-full">
          <h2 className="font-bold">
            {props.feedback.riot_id}
            <code className="bg-gray-300 px-1 rounded ml-1">
              #{props.feedback.server_tag}
            </code>
          </h2>
          <div className="relative ml-1 before:block before:h-full before:w-1 before:bg-gray-200 before:absolute before:-left-2 before:top-0">
            {props.feedback.complaint}
          </div>
          <div className="italic text-sm font-light">
            {props.feedback.topic}
          </div>

          <button
            className="transition-all bg-red-500 hover:bg-red-400 p-2 rounded-xl text-white text-lg font-bold font-mono cursor-pointer"
            type="button"
          >
            Törlés
          </button>
        </article>
      ) : null}
    </>
  );
};

export default Feedback;
