import { Link } from "react-router-dom";

export function IndexPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center"
         style={{
           backgroundImage: 'url(/assets/background.jpg)',
           backgroundSize: 'cover',
           backgroundPosition: 'center',
           backgroundRepeat: 'no-repeat',
         }}>
      {/* 60% 透明度的遮罩层 */}
      <div className="absolute inset-0 bg-black opacity-60"></div>
      
      {/* 内容区域 */}
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-5xl font-bold mb-4">Welcome to Arcadia</h1>
        <p className="text-xl mb-8 max-w-2xl">
          A Garden of Your Imaginations: Discover, Create, and Trade Unique Digital Assets
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            to="/hero"
            className="px-6 py-3 bg-black bg-opacity-70 border-2 border-white rounded-lg hover:bg-opacity-60 transition-colors"
          >
            My Hero
          </Link>
          <Link
            to="/market"
            className="px-6 py-3 bg-black bg-opacity-70 border-2 border-green-400 rounded-lg hover:bg-opacity-60 transition-colors"
          >
            Enter Marketplace
          </Link>
        </div>
      </div>
    </div>
  );
} 