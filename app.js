 var bucket = new AWS.S3({
   accessKeyId: "AKIAUAVMX5NTLHLGE6U5",
   secretAccessKey: "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",
   region: 'us-east-1'
 });

 uploadfile = function(fileName, file, folderName) {
   const params = {
     Bucket: "fileuploadprocess",
     Key: folderName + fileName,
     Body: file,
     ContentType: file.type
   };
   return this.bucket.upload(params, function(err, data) {

     if (err) {
       console.log('There was an error uploading your file: ', err);
       return false;
     }
     console.log('Successfully uploaded file.', data);
     return true;
   });
 }

 uploadSampleFile = function() {
   var progressDiv = document.getElementById("myProgress");
   progressDiv.style.display="block";
   var progressBar = document.getElementById("myBar");
   file = document.getElementById("myFile").files[0];
   folderName = "Document/";
   uniqueFileName = 'SampleFile'; 
   let fileUpload = {
     id: "",
     name: file.name,
     nameUpload: uniqueFileName,
     size: file.size,
     type: "",
     timeReference: 'Unknown',
     progressStatus: 0,
     displayName: file.name,
     status: 'Uploading..',
   }
   uploadfile(uniqueFileName, file, folderName)
     .on('httpUploadProgress', function(progress) {
       let progressPercentage = Math.round(progress.loaded / progress.total * 100);
       console.log(progressPercentage);
       progressBar.style.width = progressPercentage + "%";
       if (progressPercentage < 100) {
         fileUpload.progressStatus = progressPercentage;

       } else if (progressPercentage == 100) {
         fileUpload.progressStatus = progressPercentage;

         fileUpload.status = "Uploaded";
       }
     })
 }
