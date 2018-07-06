const config = require('../../config');
const { handler: errorHandler } = require('../middlewares/error');
const { listDirectory, faceObjectFiles } = require('../utils/S3Client');

exports.list = async (req, res, next) => {
  try {
    const s3Params = {
      Bucket: config.s3.bucket,
      MaxKeys: 20,
      Delimiter: '/',
      Prefix: 'fuel3d_demo_data/'
    };
    const data = await listDirectory(s3Params);
    const result = data.CommonPrefixes.map(item => {
      const name = item.Prefix.replace(data.Prefix, '').replace(/\/$/, '');
      const faceObj = faceObjectFiles(name);
      const url = faceObj.path + faceObj.thumbnail;
      return { name, url };
    });
    return res.json(result);
  } catch (error) {
    return next(error);
  }
};

exports.show = (req, res, next) => {
  const { faceId } = req.params;
  return res.json(faceObjectFiles(faceId));
};
