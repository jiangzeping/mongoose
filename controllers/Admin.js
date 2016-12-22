var modle=require("../models/jzpSchema.js");
var async=require("async")
var Jzp=modle.jzp
var ageStage=modle.ageStage
var formidable=require("formidable")
var fs=require("fs")
var path=require("path")
exports.Index=function(req,res){
    if(Jzp){
        Jzp.find().sort("age").exec(function(err,jzp){
            console.log(jzp);
            res.render("index.jade",{
                title:"jzp",
                jzp:jzp
            })
        })
    }else{
        res.render("index.jade",{
            title:"jzp"
        })
    }
       
}
exports.Add=function(req,res){
    var obj=req.body;
    console.log(obj);
    Jzp.find({name:obj.name,age:obj.age,sex:obj.sex}).exec(function(err,Jzps){
        console.log("***************************************")
        console.log(Jzps)
       if(Jzps.length){
            res.send({code:0,msg:"已有相同的账号"})
       }else{
           Jzp.create(obj,function(err){
                if(err){
                    res.send({code:0,msg:err})
                }else{
                    res.send({code:1})
                }
            })
       }
    })
    
}
exports.head=function(req,res){
   var cacheFolder = path.join(__dirname,'../images/');
   console.log(req.body)
    var userDirPath =cacheFolder
    var form = new formidable.IncomingForm(); //创建上传表单
    form.encoding = 'utf-8'; //设置编辑
    form.uploadDir = userDirPath; //设置上传目录
    form.keepExtensions = true; //保留后缀
    form.type = true;
    form.parse(req, function(err, fields, files) {
        if (err) {
            res.send(err);
            return;
        }
        var extName = ''; //后缀名
        switch (files.upload.type) {
            case 'image/pjpeg':
                extName = 'jpg';
                break;
            case 'image/jpeg':
                extName = 'jpg';
                break;
            case 'image/png':
                extName = 'png';
                break;
            case 'image/x-png':
                extName = 'png';
                break;
        }
        if (extName.length === 0) {
            res.send({
                code: 202,
                msg: '只支持png和jpg格式图片'
            });
            return;
        } else {
            var avatarName =path.join(__dirname,'../images/'+ Date.now() + '.' + extName)
            var newPath =  avatarName;
            fs.renameSync(files.upload.path, newPath); //重命名

            res.send({
                code: 200,
                msg:"成功"
            });
        }
    });
};