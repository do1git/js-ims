const path = require("path");
const loader = require("sass-loader");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    main: "./src/client/js/main.js",
    functions: "./src/client/js/functions.js",

    button__blueBox: "./src/client/js/components/button__blueBox.js",
    nav: "./src/client/js/components/nav.js",
    planExtra: "./src/client/js/components/planExtra.js",
    container__multiSelection__reverse:
      "./src/client/js/components/container__multiSelection__reverse.js",

    manage: "./src/client/js/screen/root/manage.js",

    planRegister: "./src/client/js/screen/plan/planRegister.js",
    planDoneRegister: "./src/client/js/screen/plan/planDoneRegister.js",
    planEdit: "./src/client/js/screen/plan/planEdit.js",
    planView: "./src/client/js/screen/plan/planView.js",
    planView__editPic: "./src/client/js/screen/plan/planView__editPic.js",
    planView__download: "./src/client/js/screen/plan/planView__download.js",
    goToDetailSearch: "./src/client/js/screen/plan/goToDetailSearch.js",
    searchPlanDetail: "./src/client/js/screen/plan/searchPlanDetail.js",

    pumpView: "./src/client/js/screen/pump/pumpView.js",
    pumpEdit: "./src/client/js/screen/pump/pumpEdit.js",

    userEdit: "./src/client/js/screen/user/userEdit.js",
  },
  watch: true,
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/styles.css",
    }),
  ],
  mode: "development",
  output: {
    filename: "js/[name].js",
    path: path.resolve(__dirname, "assets", "dynamics"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
};
