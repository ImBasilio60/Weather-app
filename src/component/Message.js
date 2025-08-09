function Message({ error }) {
  return (
    <div className="alert alert-danger" role="alert">
      {error}
    </div>
  );
}

export default Message;
