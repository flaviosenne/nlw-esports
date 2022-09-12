function Button({title}: {title: string}){
  return (
    <button>
      {title}
    </button>
  )
}

function App() {

  return (
    <>
      <h1>Olá mundo</h1>      
      <Button title="Oi" />
      <Button title="Olá" />
      <Button title="Oooi" />
    </>
  )
}

export default App
