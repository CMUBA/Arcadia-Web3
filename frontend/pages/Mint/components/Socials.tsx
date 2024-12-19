import { FC } from "react";
// Internal components
import { buttonVariants } from "@/components/ui/button";
import { Image } from "@/components/ui/image";
// Internal config
import { config } from "@/config";
// Internal assets
import Twitter from "@/assets/icons/twitter.svg";
import Link from "@/assets/icons/link.svg";
import Discord from "@/assets/icons/discord.svg";
import GitHub from "@/assets/icons/github.svg";
import Notion from "@/assets/icons/notion.svg";
import Telegram from "@/assets/icons/telegram.svg";
import Line from "@/assets/icons/line.svg";

export const Socials: FC = () => {
  if (!config.socials) return null;

  return (
    <ul className="flex gap-4">
      {config.socials.twitter && (
        <li>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={config.socials.twitter}
            className={buttonVariants({ variant: "icon", size: "icon" })}
          >
            <Image src={Twitter} className="dark:invert" />
          </a>
        </li>
      )}
      {config.socials.discord && (
        <li>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={config.socials.discord}
            className={buttonVariants({ variant: "icon", size: "icon" })}
          >
            <Image src={Discord} className="dark:invert" />
          </a>
        </li>
      )}
      {config.socials.homepage && (
        <li>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={config.socials.homepage}
            className={buttonVariants({ variant: "icon", size: "icon" })}
          >
            <Image src={Link} className="dark:invert" />
          </a>
        </li>
      )}
      <li>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/CMUBA"
          className={buttonVariants({ variant: "icon", size: "icon" })}
        >
          <Image src={GitHub} className="dark:invert" />
        </a>
      </li>
      <li>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://cmuba.notion.site/"
          className={buttonVariants({ variant: "icon", size: "icon" })}
        >
          <Image src={Notion} className="dark:invert" />
        </a>
      </li>
      <li>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://t.me/+7QsxCb-lVs03MWQ9"
          className={buttonVariants({ variant: "icon", size: "icon" })}
        >
          <Image src={Telegram} className="dark:invert" />
        </a>
      </li>
      <li>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://line.me/R/ti/g/HoVVwwSLE6"
          className={buttonVariants({ variant: "icon", size: "icon" })}
        >
          <Image src={Line} className="dark:invert" />
        </a>
      </li>
    </ul>
  );
};
