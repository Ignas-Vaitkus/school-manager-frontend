import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <Routes></Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
