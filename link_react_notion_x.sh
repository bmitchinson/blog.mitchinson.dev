rm -rf .next
cd ../react-notion-x/packages/react-notion-x
rm "react-notion-x-v6.16.0.tgz"

set -e
yarn build
yarn pack
cd ../../../blog-mitchinson-dev
npm i --save "../react-notion-x/packages/react-notion-x/react-notion-x-v6.16.0.tgz"
clear
npm run dev