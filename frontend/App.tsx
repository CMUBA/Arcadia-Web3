import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Market } from "@/pages/Market";
import { MyCollections } from "@/pages/MyCollections";
import { CreateCollection } from "@/pages/CreateCollection";
import { Home } from "@/pages/Home";
import { Demo } from "@/pages/Demo";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/market" element={<Market />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/my-collections" element={<MyCollections />} />
        <Route path="/create-collection" element={<CreateCollection />} />
      </Routes>
    </BrowserRouter>
  );
}
