function List({ data }) {
  return (
    <div className="App">
      {data.map((post) => (
        <div className="post" key={post.id}>
          <strong>
            {post.id}. {post.title}
          </strong>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
}

export default List;
