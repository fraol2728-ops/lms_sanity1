import { execSync } from "node:child_process";

const searchPattern = "@/public/";

try {
  const output = execSync(
    `rg "${searchPattern}" -n app components lib --glob '!**/*.md'`,
    { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] },
  ).trim();

  if (output.length > 0) {
    console.error(
      "Found unsupported image imports/paths that reference '@/public/*'. Replace with '/<asset>' paths:",
    );
    console.error(output);
    process.exit(1);
  }
} catch (error) {
  const stderr = String(error.stderr ?? "").trim();

  // rg exits with status 1 when there are no matches.
  if (error.status === 1 && !stderr) {
    console.log("No '@/public/*' image imports or paths found.");
    process.exit(0);
  }

  console.error("Unable to validate '@/public/*' imports.");
  if (stderr) {
    console.error(stderr);
  }
  process.exit(2);
}

console.log("No '@/public/*' image imports or paths found.");
