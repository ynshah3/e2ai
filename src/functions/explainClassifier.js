import * as tf from '@tensorflow/tfjs';
import * as tfvis from '@tensorflow/tfjs-vis';
import * as d3 from 'd3';


export async function getExamples(data) {
  const [trainXs, trainYs] = tf.tidy(() => {
    const d = data.nextTrainBatch(500);
    return [
      d.xs.reshape([500, 64, 64, 3]),
      d.labels
    ];
  });

  let yArray = trainYs.arraySync();

  let idx = []
  for (let i = 0; i < 5; i++) {
    idx.push(yArray.indexOf(i));
  }

  let examples = tf.gather(trainXs, idx);

  return examples;
}


export async function confMatrix(clf, data) {
  const [trainXs, trainYs] = tf.tidy(() => {
    const d = data.nextTrainBatch(500);
    return [
      d.xs.reshape([500, 64, 64, 3]),
      d.labels
    ];
  });

  const prediction = clf.predict(trainXs).squeeze();
  let highestIndex = prediction.argMax(1)

  const matrix = await tfvis.metrics.confusionMatrix(trainYs, highestIndex, 5);

  const surface3 = { name: 'Confusion Matrix', tab: 'Confusion Matrix' };
  tfvis.render.confusionMatrix(surface3, {values: matrix, tickLabels: ['church', 'face', 'fish', 'dog', 'parachute']});

  if (!tfvis.visor().isOpen()) {
    tfvis.visor().open();
  }
  tfvis.visor().setActiveTab('Confusion Matrix');
}


export async function clfParams(clf) {
  const surface = { name: 'Model Summary', tab: 'Model Inspection'};
  tfvis.show.modelSummary(surface, clf);

  if (!tfvis.visor().isOpen()) {
    tfvis.visor().open();
  }
  tfvis.visor().setActiveTab('Model Inspection');
}

function getActivation(input, model, layer) {
  const activationModel = tf.model({
    inputs: model.input,
    outputs: layer.output
  });
  return activationModel.predict(input);
}


async function renderImage(container, tensor, imageOpts) {
  const resized = tf.tidy(() => tf.image.resizeNearestNeighbor(tensor, [imageOpts.height, imageOpts.width]).clipByValue(0.0, 1.0));
  const canvas = container.querySelector('canvas') || document.createElement('canvas');
  canvas.width = imageOpts.width;
  canvas.height = imageOpts.height;
  canvas.style = `margin: 4px; width:${imageOpts.width}px; height:${imageOpts.height}px`;
  container.appendChild(canvas);
  await tf.browser.toPixels(resized, canvas);
  resized.dispose();
}


function renderImageTable(container, headerData, data) {
  let table = d3.select(container).select('table');

  if (table.size() === 0) {
    table = d3.select(container).append('table');
    table.append('thead').append('tr');
    table.append('tbody');
  }

  const headers = table.select('thead').select('tr').selectAll('th').data(headerData);
  const headersEnter = headers.enter().append('th');
  headers.merge(headersEnter).each((d, i, group) => {
    const node = group[i];

    if (typeof d == 'string') {
      node.innerHTML = d;
    } else {
      renderImage(node, d, {
        width: 25,
        height: 25
      });
    }
  });
  const rows = table.select('tbody').selectAll('tr').data(data);
  const rowsEnter = rows.enter().append('tr');
  const cells = rows.merge(rowsEnter).selectAll('td').data(d => d);
  const cellsEnter = cells.enter().append('td');
  cells.merge(cellsEnter).each((d, i, group) => {
    const node = group[i];
    renderImage(node, d, {
      width: 40,
      height: 40
    });
  });
  cells.exit().remove();
  rows.exit().remove();
}

function getActivationTable(model, data, layerName) {
  const layer = model.getLayer(layerName); // Get the filters

  let filters = tf.tidy(() => layer.kernel.val.transpose([3, 0, 1, 2]).unstack()); // It is hard to draw high dimensional filters so we just use a string

  if (filters[0].shape[2] > 3) {
    filters = filters.map((d, i) => `Filter ${i + 1}`);
  }

  filters.unshift('Input'); // Get the inputs

  const activations = tf.tidy(() => {
    return getActivation(data, model, layer).unstack();
  });
  const activationImageSize = activations[0].shape[0]; // e.g. 24

  const numFilters = activations[0].shape[2]; // e.g. 8

  const filterActivations = activations.map((activation, i) => {
    // activation has shape [activationImageSize, activationImageSize, i];
    const unpackedActivations = Array(numFilters).fill(0).map((_, i) => activation.slice([0, 0, i], [activationImageSize, activationImageSize, 1])); // prepend the input image

    const inputExample = tf.tidy(() => data.slice([i], [1]).reshape([64, 64, 3]));
    unpackedActivations.unshift(inputExample);
    return unpackedActivations;
  });
  return {
    filters,
    filterActivations
  };
}

export async function conv2d1ActivationTable(clf, examples, layerName) {
  const surface = tfvis.visor().surface({
    name: layerName + ' Activations',
    tab: 'Activations'
  });

  const drawArea = surface.drawArea;
  const {
    filters,
    filterActivations
  } = getActivationTable(clf, examples, layerName);
  renderImageTable(drawArea, filters, filterActivations);

  if (!tfvis.visor().isOpen()) {
    tfvis.visor().open();
  }
  tfvis.visor().setActiveTab('Activations');
}


export async function denseActivationTable(clf, examples, layerName) {
  const surface = tfvis.visor().surface({
    name: layerName + ' Activations',
    tab: 'Activations'
  });
  const drawArea = surface.drawArea;
  drawArea.innerHTML = '';
  const exampleImageSize = 64;

  const denseAct = getActivation(examples, clf, clf.getLayer(layerName));

  for (let i = 0; i < 5; i++) {
    // Get the activation frot this example
    const activation = denseAct.slice([i], [1]); // Get the individual example image

    const imageTensor = examples.slice([i], [1]).reshape([exampleImageSize, exampleImageSize, 3]); // Make a div to render the image and bar chart into

    const container = document.createElement('div');
    container.innerHTML = '<span class="image"></span><span class="chart"></span>';
    surface.drawArea.appendChild(container);
    const imageSurface = container.querySelector('.image');
    const chartSurface = container.querySelector('.chart');
    const barchartData = Array.from(activation.dataSync()).map((d, i) => {
      return {
        index: i,
        value: d
      };
    });
    renderImage(imageSurface, imageTensor, {
      width: 50,
      height: 50
    });
    tfvis.render.barchart(chartSurface, barchartData, {
      width: 375,
      height: 60,
      xLabel: ['church', 'dog', 'face', 'fish', 'parachute']
    });
  }

  if (!tfvis.visor().isOpen()) {
    tfvis.visor().open();
  }
  tfvis.visor().setActiveTab('Activations');
}
