# Initialize husky
npm pkg set scripts.prepare="husky install"
npm run prepare

# Add pre-commit hook
npx husky init
echo "npx lint-staged" > .husky/pre-commit