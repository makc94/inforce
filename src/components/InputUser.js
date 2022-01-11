function InputUser({ getWords }) {
  const word = (e) => {
    getWords(e.target.value);
  };
  return (
    <div className="search">
      <input
        className="input-user"
        onChange={word}
        type="text"
        placeholder="Search by title"
      ></input>
    </div>
  );
}

export default InputUser;
