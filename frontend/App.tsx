import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/Home";
import { Mint } from "@/pages/Mint/index";
import { CreateCollection } from "@/pages/CreateCollection";
import { MyCollections } from "@/pages/MyCollections";
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Mint />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/create-collection" element={<CreateCollection />} />
        <Route path="/my-collections" element={<MyCollections />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
