import { appIcon } from "@/features/seo/og/image";

export const size = { width: 180, height: 180 };

export const contentType = "image/png";

// Home screen icon for iOS
const AppleIcon = () => appIcon(size.width);

export default AppleIcon;
