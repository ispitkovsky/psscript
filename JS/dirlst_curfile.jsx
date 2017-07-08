$.level=2;

// use all the files in the Samples folder
//var inputFolder = new Folder("C:/Development/JS/PS/Files/")
//var inputFolder = new Folder("C:/X/")
// see if we have something interesting
logger = File('c://X//список ошибок.txt');
logger.encoding = "UTF8";
logger.open("a", "TEXT");

var doc = app.activeDocument;
var x = checkAndSaveAs(doc);
// use the document name for the layer name in the merged document

logger.close();


function checkAndSaveAs(doc){
	fileName = doc.fullName;
	var sizeStr = fileName.toString().match(/(\d+)([x])(\d+)/);

	var CONST_MARGIN = 1;
	var width = sizeStr[1];
	var height = sizeStr[3];

	//alert('width=' + width + ', height=' + height); 

	if (width == 0 || height == 0) {
		writeError('File: ' + fileName);
		writeError("Incorrect file name: " || fileName);
		return;
	}

	//alert('fileName=' + fileName); 
	var w = doc.width.as('mm');
	var h = doc.height.as('mm');

	//alert ('w:'+w); //2990.088 КЮЗ__1__ткань
	//alert ('h:'+h); //3500.12

	var fn = decodeURI(fileName);
	if ((Math.abs(w - width) > CONST_MARGIN) || (Math.abs(h - height) > CONST_MARGIN)) {
		writeError('File: ' + fn);
		if (Math.abs(w - width) > CONST_MARGIN) {
			writeError('Incorrect Width: ' + w + '!=' + width);
		}

		if (Math.abs(h - height) > CONST_MARGIN) {
			writeError('Incorrect Height: ' + h + '!=' + height);
		}
	} else {
		var ext = calcExtent(w);

		doc.resizeCanvas(UnitValue((w+ext), "mm"), 
			UnitValue((h+ext), "mm"), AnchorPosition.MIDDLECENTER)

		doc.flatten;

		SaveTIFF(fileName + '.tiff', doc);
	}
}


function writeError(message){
	var d = new Date();
 	logger.writeln(Date().toString(), ": ", message);
}


function calcExtent(width){
	if(width < 1500){
		result = 30;
	} else if (width < 2500) {
		result = 35;
	} else if (width < 3500) {
		result = 45;
	} else if (width < 4500) {
		result = 45;
	} else if (width < 5500) {
		result = 50;
	} else {
		result = 55;
	}
	return 2*result;
}

function SaveTIFF(fileName, doc){  
	tiffSaveOptions = new TiffSaveOptions();   
	tiffSaveOptions.embedColorProfile = true;   
	tiffSaveOptions.alphaChannels = true;   
	tiffSaveOptions.layers = false;  
	tiffSaveOptions.imageCompression = TIFFEncoding.JPEG;  
	tiffSaveOptions.jpegQuality=10;  
	doc.saveAs(new File(fileName), tiffSaveOptions, true, Extension.LOWERCASE);   
}  


// Hello Word Script
// Remember current unit settings and then set units to
// the value expected by this script
// var originalUnit = preferences.rulerUnits
// preferences.rulerUnits = Units.INCHES
// // Create a new 2x4 inch document and assign it to a variable
// var docRef = app.documents.add( 2, 4 )
// // Create a new art layer containing text
// var artLayerRef = docRef.artLayers.add()
// artLayerRef.kind = LayerKind.TEXT
// // Set the contents of the text layer.
// var textItemRef = artLayerRef.textItem
// textItemRef.contents = "Hello, World"
// // Release references
// docRef = null
// artLayerRef = null
// textItemRef = null
// // Restore original ruler unit setting
// app.preferences.rulerUnits = originalUnit

