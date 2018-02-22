const DeviceHelper = {
  supportsDisplay: (req) => {
    var hasDisplay =
      req.data &&
      req.data.context &&
      req.data.context.System &&
      req.data.context.System.device &&
      req.data.context.System.device.supportedInterfaces &&
      req.data.context.System.device.supportedInterfaces.Display

    return hasDisplay;
  },
  isSumulator: (req) => {
    const isSimulator = !req.context; //simulator doesn't send context

    return isSimulator;
  }
}

module.exports = DeviceHelper;
