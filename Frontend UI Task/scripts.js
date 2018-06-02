<script>

function refreshImages(){
  $(document).ready(function(){

  var imgContainer = document.getElementById("imgs");
  while(imgContainer.firstChild){
    imgContainer.removeChild(imgContainer.firstChild);

  }
  console.log("removed existing");

  let imgRecords = getImgRecords();
  imgRecords.forEach(function(record){
    let imgFrame = document.createElement('div');
    imgFrame.className='card col-xs-3 col-sm-3 col-md-3 col-lg-3 no-gutters';
    imgFrame.innerHTML= `<img src=\"${record.url}\" class=\"card-img-top\" alt=\"Cinque Terre\">
    <div class=\"card-body\">
      <p class=\"card-text\">${record.desc}</p>
      <a href=\"${record.url}\" class=\"btn btn-primary\">Original Picture</a>
      <button name="imgDeleteButton" class=\"btn btn-danger deleteImg\" data-img-url="${record.url}" onClick="deleteImage('${record.url}')">Delete</button>
    </div>`
    imgContainer.appendChild(imgFrame);
  })



  })
}



function getImgRecords(){
  let imgRecords;
  if ( localStorage.getItem("imgRecords")!==null)
  {
    imgRecords = JSON.parse(localStorage.getItem("imgRecords"));

  }
  else {
    imgRecords = []
  }

  return imgRecords;
}



//function to add new Image

$(document).ready(function(){
  document.getElementById("addImageButton").addEventListener("click", function(){
    console.log(document.getElementById("imgUrl").value);
    let upUrl = document.getElementById("imgUrl").value;
    let description = document.getElementById("imgDesc").value;

    if(upUrl.length!==0 && description.length!==0){

      let imgRecords = getImgRecords();




      let record = {
        url: upUrl,
        desc: description
      }

      let filteredRecords = imgRecords.filter((record) => upUrl === record.url);

      if (filteredRecords.length === 0)
      {
        imgRecords.push(record);
        localStorage.setItem("imgRecords", JSON.stringify(imgRecords));
        refreshImages();
      }
      else {
        alert("duplicate image");
      }



      }else {
        alert("Please enter Image URL and Description");
      }
  })
})






// delete image function

$(document).ready(function(){
  refreshImages();
})




function deleteImage(imgUrl) {
console.log(imgUrl);
var imgRecords = getImgRecords();
var filteredRecords = imgRecords.filter((record) => record.url !==imgUrl);
localStorage.setItem('imgRecords',JSON.stringify(filteredRecords));
refreshImages();

}
