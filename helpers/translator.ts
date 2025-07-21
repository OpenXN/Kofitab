// With this script, you can easily translate

const args = process.argv.slice(2);

if (args.length === 0) {
  console.log("Usage: npm run translator --<command> [options]");
  console.log("--language for the whole file");
  console.log("--word for only one word");
  console.log("--author your name");
}
