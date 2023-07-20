var newImg, showImg, file;

function loadImg(event) {
    file = event.target.files[0];
    showImg = document.getElementById('showImg');

    var reader = new FileReader();
    reader.onload = function(e) {
        showImg.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

function convertToPDF() {
    var doc = new jsPDF();
    var imgWidth = doc.internal.pageSize.getWidth();
    var imgHeight = doc.internal.pageSize.getHeight();

    if (file.type.startsWith('image/')) {
        newImg = new Image();
        newImg.src = showImg.src;

        newImg.onload = function() {
            var originalImgWidth = newImg.width;
            var originalImgHeight = newImg.height;
            var ratio = imgWidth / originalImgWidth;
            var pdfHeight = originalImgHeight * ratio;

            doc.addImage(newImg, 'JPEG', 0, 0, imgWidth, pdfHeight);
            doc.save(file.name.replace(/\.[^/.]+$/, "") + '.pdf');
        };
    } else if (file.type === 'text/plain') {
        var reader = new FileReader();
        reader.onload = function(e) {
            doc.text(e.target.result, 10, 10);
            doc.save(file.name.replace(/\.[^/.]+$/, "") + '.pdf');
        };
        reader.readAsText(file);
    }
}

