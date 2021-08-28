export class ServiceWorkerPlugin {
  filename = '';

  constructor(options) {
    this.filename = options?.filename ?? 'sw.js';
  };

  apply(compiler) {
    compiler.hooks.make.tap('service-worker-plugin', (compilation) => {
      compilation.hooks.afterProcessAssets.tap('service-worker-plugin', () => {
        if (!Object.prototype.hasOwnProperty.call(compilation.assets, this.filename)) {
          return;
        }
        const code = String(compilation.assets[this.filename].source());
        const assets = Object.keys(compilation.assets)
          .filter((asset) =>
            typeof asset === 'string' && asset !== this.filename)
          .map((asset) => `/${ asset.replace('\\', '/') }`);

        const source = compiler.options.mode === 'production'
          ? `self.assets=${ JSON.stringify(assets) };${ code }`
          : `self.assets = ${ JSON.stringify(assets, null, '  ') };\r\n\r\n${ code }`;

        compilation.assets[this.filename] = {
          source: () => source,
          size: () => Buffer.byteLength(source, 'utf8')
        };
      });
    });
  };
};
