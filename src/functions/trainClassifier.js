import * as tf from '@tensorflow/tfjs';
import * as tfvis from '@tensorflow/tfjs-vis';
import { CustomData } from './data';


export async function loadDataset() {
  const data = new CustomData();
  await data.load();
  return data;
}

export async function loadSmall() {
  const model = tf.sequential();
  
  const IMAGE_WIDTH = 64;
  const IMAGE_HEIGHT = 64;
  const IMAGE_CHANNELS = 3;  
  
  model.add(tf.layers.conv2d({
    inputShape: [IMAGE_WIDTH, IMAGE_HEIGHT, IMAGE_CHANNELS],
    kernelSize: 5,
    filters: 8,
    strides: 1,
    activation: 'relu',
    kernelInitializer: 'varianceScaling'
  }));
  model.add(tf.layers.maxPooling2d({poolSize: [3, 3], strides: [3, 3]}));
  model.add(tf.layers.conv2d({
    kernelSize: 3,
    filters: 16,
    strides: 1,
    activation: 'relu',
    kernelInitializer: 'varianceScaling'
  }));
  model.add(tf.layers.maxPooling2d({poolSize: [3, 3], strides: [3, 3]}));
  model.add(tf.layers.flatten());
  model.add(tf.layers.dense({
    units: 5,
    kernelInitializer: 'varianceScaling',
    activation: 'softmax'
  }));

  return model;
}

export async function loadBase() {
  const model = tf.sequential();
  
  const IMAGE_WIDTH = 64;
  const IMAGE_HEIGHT = 64;
  const IMAGE_CHANNELS = 3;  
  
  model.add(tf.layers.conv2d({
    inputShape: [IMAGE_WIDTH, IMAGE_HEIGHT, IMAGE_CHANNELS],
    kernelSize: 5,
    filters: 8,
    strides: 1,
    activation: 'relu',
    kernelInitializer: 'varianceScaling'
  }));
  model.add(tf.layers.maxPooling2d({poolSize: [2, 2], strides: [2, 2]}));
  model.add(tf.layers.conv2d({
    kernelSize: 3,
    filters: 16,
    strides: 1,
    activation: 'relu',
    kernelInitializer: 'varianceScaling'
  }));
  model.add(tf.layers.maxPooling2d({poolSize: [2, 2], strides: [2, 2]}));
  model.add(tf.layers.conv2d({
    kernelSize: 3,
    filters: 16,
    strides: 1,
    activation: 'relu',
    kernelInitializer: 'varianceScaling'
  }));
  model.add(tf.layers.maxPooling2d({poolSize: [2, 2], strides: [2, 2]}));
  model.add(tf.layers.flatten());
  model.add(tf.layers.dense({
    units: 5,
    kernelInitializer: 'varianceScaling',
    activation: 'softmax'
  }));

  return model;
}

export async function loadLeNet() {
  const model = tf.sequential();
  
  const IMAGE_WIDTH = 64;
  const IMAGE_HEIGHT = 64;
  const IMAGE_CHANNELS = 3;  
  
  model.add(tf.layers.conv2d({
    inputShape: [IMAGE_WIDTH, IMAGE_HEIGHT, IMAGE_CHANNELS],
    kernelSize: 5,
    filters: 6,
    strides: 1,
    activation: 'relu',
    kernelInitializer: 'varianceScaling'
  }));
  model.add(tf.layers.maxPooling2d({poolSize: [2, 2], strides: [2, 2]}));
  model.add(tf.layers.conv2d({
    kernelSize: 5,
    filters: 16,
    strides: 1,
    activation: 'relu',
    kernelInitializer: 'varianceScaling'
  }));
  model.add(tf.layers.maxPooling2d({poolSize: [2, 2], strides: [2, 2]}));
  model.add(tf.layers.flatten());
  model.add(tf.layers.dense({
    units: 32,
    kernelInitializer: 'varianceScaling',
    activation: 'relu'
  }));
  model.add(tf.layers.dense({
    units: 8,
    kernelInitializer: 'varianceScaling',
    activation: 'relu'
  }));
  model.add(tf.layers.dense({
    units: 5,
    kernelInitializer: 'varianceScaling',
    activation: 'softmax'
  }));

  return model;
}

export async function loadAlexNet() {
  const model = tf.sequential();
  
  const IMAGE_WIDTH = 64;
  const IMAGE_HEIGHT = 64;
  const IMAGE_CHANNELS = 3;  
  
  model.add(tf.layers.conv2d({
    inputShape: [IMAGE_WIDTH, IMAGE_HEIGHT, IMAGE_CHANNELS],
    kernelSize: 5,
    filters: 6,
    strides: 1,
    activation: 'relu',
    kernelInitializer: 'varianceScaling'
  }));
  model.add(tf.layers.maxPooling2d({poolSize: [2, 2], strides: [2, 2]}));
  model.add(tf.layers.conv2d({
    kernelSize: 3,
    filters: 8,
    strides: 1,
    activation: 'relu',
    kernelInitializer: 'varianceScaling'
  }));
  model.add(tf.layers.maxPooling2d({poolSize: [2, 2], strides: [2, 2]}));
  model.add(tf.layers.conv2d({
    kernelSize: 3,
    filters: 12,
    strides: 1,
    padding: 'same',
    activation: 'relu',
    kernelInitializer: 'varianceScaling'
  }));
  model.add(tf.layers.conv2d({
    kernelSize: 3,
    filters: 16,
    strides: 1,
    padding: 'same',
    activation: 'relu',
    kernelInitializer: 'varianceScaling'
  }));
  model.add(tf.layers.conv2d({
    kernelSize: 3,
    filters: 20,
    strides: 1,
    padding: 'same',
    activation: 'relu',
    kernelInitializer: 'varianceScaling'
  }));
  model.add(tf.layers.maxPooling2d({poolSize: [2, 2], strides: [2, 2]}));
  model.add(tf.layers.flatten());
  model.add(tf.layers.dense({
    units: 32,
    kernelInitializer: 'varianceScaling',
    activation: 'relu'
  }));
  model.add(tf.layers.dropout({ rate: 0.5 }));
  model.add(tf.layers.dense({
    units: 5,
    kernelInitializer: 'varianceScaling',
    activation: 'softmax'
  }));

  return model;
}


export async function train(data, clf, batchSize=32, epochs=15, learningRate=0.001) {
  const element = document.getElementById("tfjs-visor-container");
  if (element) element.remove();
  
  const optimizer = tf.train.adam(learningRate);

  clf.compile({
    optimizer: optimizer,
    loss: 'categoricalCrossentropy',
    metrics: ['accuracy'],
  });
  
  const TRAIN_DATA_SIZE = 500;

  const [trainXs, trainYs] = tf.tidy(() => {
    const d = data.nextTrainBatch(TRAIN_DATA_SIZE);
    return [
      d.xs.reshape([TRAIN_DATA_SIZE, 64, 64, 3]),
      d.labels
    ];
  });

  const trainYsOneHot = tf.oneHot(trainYs, 5);
  if (!tfvis.visor().isOpen()) {
    tfvis.visor().open();
  }

  try {
    await clf.fit(trainXs, trainYsOneHot, {shuffle: true, batchSize: parseInt(batchSize), epochs: parseInt(epochs), validationSplit: 0.2, callbacks: tfvis.show.fitCallbacks({ name: 'Loss and Accuracy Curves', tab: 'Training' }, ['loss', 'acc', 'val_loss', 'val_acc']) });
  } catch(err) {
    console.log(err);
  }

  tfvis.visor().setActiveTab('Training');

  trainYsOneHot.dispose();

  return clf;
}
