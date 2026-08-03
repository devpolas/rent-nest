import { SocialPlatform } from "@/types/enum";

export function getSocialPlatformLabel(platform: SocialPlatform): string {
  switch (platform) {
    case "GITHUB":
      return "GitHub";
    case "LINKEDIN":
      return "LinkedIn";
    case "FACEBOOK":
      return "Facebook";
    case "TWITTER":
      return "X";
    case "INSTAGRAM":
      return "Instagram";
    case "YOUTUBE":
      return "YouTube";
    case "DISCORD":
      return "Discord";
    case "TELEGRAM":
      return "Telegram";
    case "WHATSAPP":
      return "WhatsApp";
    case "WEBSITE":
      return "Website";
    default:
      return platform;
  }
}

export function getSocialPlatformDescription(platform: SocialPlatform): string {
  switch (platform) {
    case "GITHUB":
      return "Open source projects & repositories";

    case "LINKEDIN":
      return "Professional profile";

    case "FACEBOOK":
      return "Social profile";

    case "TWITTER":
      return "Posts & updates";

    case "INSTAGRAM":
      return "Photos & stories";

    case "YOUTUBE":
      return "Videos & channel";

    case "DISCORD":
      return "Community profile";

    case "TELEGRAM":
      return "Messaging profile";

    case "WHATSAPP":
      return "Contact profile";

    case "WEBSITE":
      return "Personal website";

    default:
      return "Social profile";
  }
}
