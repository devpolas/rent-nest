import { Globe } from "lucide-react";

import {
  FaDiscord,
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaTelegram,
  FaWhatsapp,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";

import { SocialPlatform } from "@/types/enum";

type Props = {
  platform: SocialPlatform;
  className?: string;
};

export default function SocialPlatformIcon({
  platform,
  className = "size-5",
}: Props) {
  switch (platform) {
    case "GITHUB":
      return <FaGithub className={className} />;

    case "LINKEDIN":
      return <FaLinkedin className={className} />;

    case "FACEBOOK":
      return <FaFacebook className={className} />;

    case "TWITTER":
      return <FaXTwitter className={className} />;

    case "INSTAGRAM":
      return <FaInstagram className={className} />;

    case "YOUTUBE":
      return <FaYoutube className={className} />;

    case "DISCORD":
      return <FaDiscord className={className} />;

    case "TELEGRAM":
      return <FaTelegram className={className} />;

    case "WHATSAPP":
      return <FaWhatsapp className={className} />;

    case "WEBSITE":
      return <Globe className={className} />;

    default:
      return <Globe className={className} />;
  }
}
