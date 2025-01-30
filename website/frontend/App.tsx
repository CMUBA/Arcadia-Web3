import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Market } from "@/pages/Market";
import { MyCollections } from "@/pages/MyCollections";
import { CreateCollection } from "@/pages/CreateCollection";
import { IndexPage } from "@/pages/IndexPage";
import { HeroPage } from "@/pages/HeroPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/hero" element={<HeroPage />} />
        <Route path="/market" element={<Market />} />
        <Route path="/my-collections" element={<MyCollections />} />
        <Route path="/create-collection" element={<CreateCollection />} />
      </Routes>
    </BrowserRouter>
  );
}
