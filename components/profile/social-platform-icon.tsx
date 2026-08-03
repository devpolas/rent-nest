import { SocialPlatform } from "@/types/enum";
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

type Props = {
  platform: SocialPlatform;
};

export default function SocialPlatformIcon({ platform }: Props) {
  switch (platform) {
    case "GITHUB":
      return <FaGithub className='size-5' />;
    case "LINKEDIN":
      return <FaLinkedin className='size-5' />;
    case "FACEBOOK":
      return <FaFacebook className='size-5' />;
    case "TWITTER":
      return <FaXTwitter className='size-5' />;
    case "INSTAGRAM":
      return <FaInstagram className='size-5' />;
    case "YOUTUBE":
      return <FaYoutube className='size-5' />;
    case "DISCORD":
      return <FaDiscord className='size-5' />;
    case "TELEGRAM":
      return <FaTelegram className='size-5' />;
    case "WHATSAPP":
      return <FaWhatsapp className='size-5' />;
    case "WEBSITE":
      return <Globe className='size-5' />;
    default:
      return <Globe className='size-5' />;
  }
}
