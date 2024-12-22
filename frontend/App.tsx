import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Mint } from "@/pages/Mint";
import { MyCollections } from "@/pages/MyCollections";
import { CreateCollection } from "@/pages/CreateCollection";
import { Home } from "@/pages/Home";
import { Town } from "@/pages/Town";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mint" element={<Mint />} />
        <Route path="/my-collections" element={<MyCollections />} />
        <Route path="/create-collection" element={<CreateCollection />} />
        <Route path="/town" element={<Town />} />
      </Routes>
    </BrowserRouter>
  );
}
