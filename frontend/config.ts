import Placeholder1 from "@/assets/placeholders/hero-1.png";
import Placeholder2 from "@/assets/placeholders/hero-2.png";
import Placeholder3 from "@/assets/placeholders/hero-3.png";
import Placeholder4 from "@/assets/placeholders/hero-4.png";

export const config: Config = {
  // Removing one or all of these socials will remove them from the page
  socials: {
    twitter: "https://twitter.com/cmuba_th",
    telegram: "https://t.me/+7QsxCb-lVs03MWQ9",
    homepage: "https://cmuba.org",
  },

  defaultCollection: {
    name: "Arcadia Collections",
    description: "A Garden of Your Imaginations -- Arcadia",
    image: Placeholder4,
  },

  ourStory: {
    title: "Arcadia Story",
    subTitle: "Collect Your Creations Your Imaginations",
    description:
      "Chiang Mai is a Ancient City with a Rich History and Culture. Some People was Born with different Talent Skill, They are ArcadiaWarriors with Spring, Summer, Autumn and Winter Talent Skill. They have mission to protect the Chiang Mai City. \nWhat is the Secret of the Arcadia? Play to Get PNTs and Redeem Coupons; Make Your Innovation or Any Words be Valuable. Run Your Own Business On-chain.",
    discordLink: "#bottom",
    images: [Placeholder1, Placeholder2, Placeholder3, Placeholder4],
  },

  ourTeam: {
    title: "Our Team",
    members: [
      {
        name: "Jason Jiao",
        role: "Architect/Developer/Designer/Project Manager",
        img: Placeholder1,
        socials: {
          twitter: "https://twitter.com/jhfnetboy",
        },
      },
      {
        name: "Klay Yang",
        role: "Designer/Product Manager/Developer",
        img: Placeholder2,
      },
      {
        name: "Muhammad",
        role: "Business Development/Marketing/Developer",
        img: Placeholder3,
        socials: {
          twitter: "https://twitter.com",
        },
      },
      {
        name: "Emery",
        role: "Core Developer/Full Stack Engineer/Developer",
        img: Placeholder4,
        socials: {
          twitter: "https://twitter.com",
        },
      },      
    ],
  },

  faqs: {
    title: "F.A.Q.",

    questions: [
      {
        title: "Is this game free?",
        description: "Yeah, it's free. Anyone can get a free HERO NFT.",
      },
      {
        title: "What can I do with my HERO NFT?",
        description:
          "Exploring the game world, fighting monsters, and get PNTs.",
      },
      {
        title: "What is PNTs",
        description:
          "PNTs are the game's native token, you can use them to buy gears and redeem coupons.",
      },
    ],
  },

  nftBanner: [Placeholder1, Placeholder2, Placeholder3],
};

export interface Config {
  socials?: {
    twitter?: string;
    discord?: string;
    telegram?: string;
    homepage?: "https://cmuba.org";
  };

  defaultCollection?: {
    name: string;
    description: string;
    image: string;
  };

  ourTeam?: {
    title: string;
    members: Array<ConfigTeamMember>;
  };

  ourStory?: {
    title: string;
    subTitle: string;
    description: string;
    discordLink: string;
    images?: Array<string>;
  };

  faqs?: {
    title: string;
    questions: Array<{
      title: string;
      description: string;
    }>;
  };

  nftBanner?: Array<string>;
}

export interface ConfigTeamMember {
  name: string;
  role: string;
  img: string;
  socials?: {
    twitter?: string;
    discord?: string;
  };
}
