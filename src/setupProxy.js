const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function(app){
    app.use(createProxyMiddleware([process.env.REACT_APP_API],{
        target: process.env.REACT_APP_BASE_URL,
        changeOrigin: true,
        // 重写 URL 地址 将 http://api/react/devApi/login/ 替换为 http://api/react/login/ 
        pathRewrite: {
            // 注意写法: `` ， 不是 ''
            [`^${process.env.REACT_APP_API}`]: "",
        },
    }));
};