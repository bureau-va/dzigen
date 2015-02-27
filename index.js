#!/usr/bin/env node

var path    = require('path');
var fs      = require('fs');
var util    = require('util');
var argv    = require('optimist')
    .usage('Usage: $0 -p [path/to/img]')
    .demand('path')
    .alias('path', 'p')
    .describe('path', 'Path to image')
    .alias('format', 'f')
    .describe('format', 'Format of the tile images: JPG or PNG')
    .alias('tileSize', 's')
    .describe('tileSize', 'Size of the tiles')
    .alias('tileOverlap', 'o')
    .describe('tileOverlap', 'Overlap')
    .argv;
var _ = require('lodash');
var DeepZoomImage = require('deepzoomtools');

var settings = {
  'tileSize': 254,
  'tileOverlap': 1,
  'format': 'jpg'
};

settings = _.chain(argv)
  .omit(['_','$0','p','f','s','o'])
  .merge(settings)
  .value();

if (!fs.existsSync(settings.path)) throw new Error('File does not exists');

var dest = path.join(path.dirname(settings.path),
                     path.basename(settings.path)
                      .replace(path.extname(settings.path), '.dzi')
                    );

DeepZoomImage.create(_, settings.path, dest, settings.tileSize, settings.tileOverlap, settings.format);
