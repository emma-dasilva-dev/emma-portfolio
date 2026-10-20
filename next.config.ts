import type { NextConfig } from "next";

// Linux Node inside WSL gets its own build dir, so its dev lockfile never
// collides with a Windows Node process using ".next" on the shared /mnt/c drive.
const isWsl = process.platform === "linux" && Boolean(process.env.WSL_DISTRO_NAME);

const nextConfig: NextConfig = {
  ...(isWsl ? { distDir: ".next-wsl" } : {}),
};
export default nextConfig;
