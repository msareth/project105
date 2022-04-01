//https://teachablemachine.withgoogle.com/models/ZWTwVOets/

Webcam.set({
  width: 300,
  height: 350,
  image_format: 'png',
  png_quality: 90,
})

camera = document.getElementById('camera')

Webcam.attach('#camera')

function takesnapshot() {
  Webcam.snap(function (data_uri) {
    document.getElementById('results').innerHTML =
      '<img id="captured_img" src="' + data_uri + '"/>'
  })
}

console.log('ml5 version:', ml5.version)

classifier = ml5.imageClassifier(
  'https://teachablemachine.withgoogle.com/models/ZWTwVOets/model.json',
  modelLoaded,
)

function modelLoaded() {
  console.log('Model Loaded')
}

function identifyimage() {
  img = document.getElementById('captured_img')
  classifier.classify(img, gotResult)
}

function gotResult(error, results) {
  if (error) {
    console.error(error)
  } else {
    console.log(results)
    document.getElementById('object_name').innerHTML = results[0].label
    document.getElementById(
      'object_results',
    ).innerHTML = results[0].confidence.toFixed(2)
  }
}
