export default ({isDrawer, currentWord}) => isDrawer ? (
    <h2 className="current-word">{`Current Word: ${currentWord}`}</h2>
  ) : (
    <h2 className="status">You are a guesser</h2>
  )