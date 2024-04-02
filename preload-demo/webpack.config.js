const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ImageminPlugin = require("imagemin-webpack-plugin").default;
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    index: "./src/index.js",
  },
  output: {
    filename: "js/bundle.js",
    clean: true, // 在生成文件之前清空 output 目录
    path: path.resolve(__dirname, "../dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      filename: "index.html",
      inject: "body",
      minify: {
        removeComments: true,
      },
    }),

    // 方案一压缩效率最高
    // new ImageminPlugin({
    //   // disable: process.env.NODE_ENV !== "production", // Disable during development
    //   disable: false, //测试查看效果写死，正式环境使用上面这一行，注释这一样
    //   pngquant: {
    //     quality: "75",
    //   },
    // }),
  ],
  module: {
    rules: [
      // 方案一使用rules 目前压缩效率比较高
      // {
      //   test: /\.(png|jpg|jpeg|gif)$/i,
      //   type: "asset/resource",
      //   use: [
      //     {
      //       loader: "url-loader",
      //       options: {
      //         limit: 8192,
      //       },
      //     },
      //   ],
      //   type: "javascript/auto",
      // },
      {
        test: /\.svg/,
        type: "asset/inline",
      },
      // 方案二和方案三来使用rules
      {
        test: /\.(png|jpe?g|gif|webp)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 20 * 1024, // 小于20kb的图片会被base64处理
          },
        },
        generator: {
          // 将图片文件输出到 static 目录中
          // 将图片文件命名 [hash:8][ext][query]
          // [hash:8]: hash值取8位
          // [ext]: 使用之前的文件扩展名
          // [query]: 添加之前的query参数
          filename: "static/[hash:8][ext][query]",
        },
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: [
              "@babel/plugin-transform-runtime",
              "@babel/plugin-proposal-class-properties",
            ],
          },
        },
      },
    ],
  },
  optimization: {
    minimizer: [
      // 方案三压缩 压缩效率高于方案二，低于方案一
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.sharpMinify,
          options: {
            encodeOptions: {
              mozjpeg: {
                quality: 75,
              },
              png: {
                quality: 75,
              },
            },
          },
        },
      }),
    ],
    // 方案二压缩 压缩效率比较低，低于方案三
    // 无损压缩压缩操作一般写在optimization里面
    // npm install imagemin-gifsicle imagemin-jpegtran imagemin-optipng imagemin-svgo --save-dev
    // minimizer: [
    //   new ImageMinimizerPlugin({
    //     minimizer: {
    //       implementation: ImageMinimizerPlugin.imageminMinify,
    //       options: {
    //         // Lossless optimization with custom option
    //         // Feel free to experiment with options for better result for you
    //         plugins: [
    //           ["gifsicle", { interlaced: true }],
    //           ["jpegtran", { progressive: true }],
    //           ["optipng", { optimizationLevel: 5 }],
    //           // Svgo configuration here https://github.com/svg/svgo#configuration
    //           [
    //             "svgo",
    //             {
    //               plugins: [
    //                 {
    //                   name: "preset-default",
    //                   params: {
    //                     overrides: {
    //                       removeViewBox: false,
    //                       addAttributesToSVGElement: {
    //                         params: {
    //                           attributes: [
    //                             { xmlns: "http://www.w3.org/2000/svg" },
    //                           ],
    //                         },
    //                       },
    //                     },
    //                   },
    //                 },
    //               ],
    //             },
    //           ],
    //         ],
    //       },
    //     },
    //   }),
    // ],
  },
};
