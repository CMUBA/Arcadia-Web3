import { FC } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import { TownSection } from '@/components/Landing/TownSection';
import { SpaceMapSection } from '@/components/Landing/SpaceMapSection';
import { BeginnerGuide } from '@/components/Landing/BeginnerGuide';

const LandingPage: FC = () => {
  const router = useRouter();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <BeginnerGuide />
        
        <div className="grid md:grid-cols-2 gap-8 mt-8">
          <TownSection 
            onMarketClick={() => router.push('/market')}
            onShopClick={() => router.push('/shop')}
            onRedeemClick={() => router.push('/redeem')}
          />
          
          <SpaceMapSection 
            onEnterGame={() => router.push('/game')}
          />
        </div>
      </div>
    </Layout>
  );
};

export default LandingPage; 