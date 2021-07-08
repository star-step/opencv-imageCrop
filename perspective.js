const utils = new Utils('errorMessage');
const applyButton = document.getElementById('apply')
function setUpApplyButton () { 
    console.log(cv)
    
    let pointsArray = []
    const children = document.querySelectorAll('#window_g .handle')
    console.log(children)
    children.forEach(e =>{
        const pos = e.getAttribute('transform');
        console.dir(pos)
        const point = pos.replace('translate(','').replace(')','').split(',')
        pointsArray.push(point[0])
        pointsArray.push(point[1])
    })
    console.log(pointsArray)
    setTimeout(()=>{
    let src = cv.imread('canvasInput');
    const imageHeight = parseInt(document.getElementById('height').value)
    const imageWidth = (imageHeight*3)/4
    const svgCropHeight =  document.querySelector('#background svg').getAttribute('height') - 80
    const svgCropWidth =  document.querySelector('#background svg').getAttribute('width') - 80
    console.log('h : ',svgCropHeight,' w : ',svgCropWidth)
    const scaleFactor = parseInt(imageWidth / svgCropWidth)
    debugger
    pointsArray = pointsArray.map( e => {
        const num = parseInt((parseInt(e) + 40)/scaleFactor)
        return num
    })
    let dst = new cv.Mat();
    let dsize = new cv.Size(imageWidth, imageHeight);
    let srcTri = cv.matFromArray(4, 1, cv.CV_32FC2, pointsArray);
    let dstTri = cv.matFromArray(4, 1, cv.CV_32FC2, [0, 0, imageHeight, 0, imageHeight, imageWidth, 0, imageWidth]);
    let M = cv.getPerspectiveTransform(srcTri, dstTri);
    cv.warpPerspective(src, dst, M, dsize, cv.INTER_LINEAR, cv.BORDER_CONSTANT, new cv.Scalar());
    cv.imshow('imageResult', dst);
    src.delete(); dst.delete(); M.delete(); srcTri.delete(); dstTri.delete();
    },500)
    
        
}
applyButton.setAttribute('disabled','true')
utils.loadOpenCv(() => {
    setTimeout(function () { 
        applyButton.removeAttribute('disabled');
    },500)
});

function output(){
    let src = cv.imread('imageInit');
    let dst = new cv.Mat();
    let dsize = new cv.Size(400, 400);
    cv.resize(src, dst, dsize, 0, 0, cv.INTER_AREA);
    cv.imshow('canvasInput', dst);
    src.delete(); dst.delete();
  }