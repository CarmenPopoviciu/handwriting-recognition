const NeuralNet = require('./node_modules/neural-net/neuralNet');
const fs = require('fs');

fs.readFile(__dirname + '/MNIST/train.csv', (err, data) => {
  if(err) console.log(err);

  let net = new NeuralNet({
    numEpochs: 10,
    learningRate: 3,
    batchSize: 1
  });
  net.initialise([784,30,10]);

  console.log('Converting data...');
  let trainData = convert(data);

  console.log(`Start training...`);
  net.train(trainData);
  console.log(`Finished training`);

  console.log(`Predicted: ${net.predict(trainData[0][0])}`);
  console.log(`Expected: ${trainData[0][1]}`);

  console.log(`Predicted: ${net.predict(trainData[1][0])}`);
  console.log(`Expected: ${trainData[1][1]}`);
});  


function convert(MNISTData) {
  let data = [];
  let lines = MNISTData.toString().split('\n');
  lines.pop(); // 

  lines.forEach(function(line, index) {
    let dataEntry = [];
    let input = line.split(',').map(Number);
    let output = Array.apply(null, Array(10)).map(Number.prototype.valueOf, 0);
    output[input.shift()] = 1;
    dataEntry.push(input, output);
    data.push(dataEntry);
  });

  return data;
}