# compress-upload
##实现图片超出特定值进行压缩上传
##1、main.js起始位置config变量可进行一些参数配置
```java  
var config = {
    maxSize: 100 * 1024,    // 图片大小<maxSize直接上传，反之，压缩后上传
    compressRatio: 0.2,     // 图片压缩比例
    maxUploadSize: 4        // 单次最多可上传图片个数
};
```
##2、Node入口index.js
##3、页面入口index.html
##4、上传的图片存储在tmp目录下，访问http:127.0.0.1:888/show,可预览已上传图片
