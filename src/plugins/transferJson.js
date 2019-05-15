let createFile = require('./create').createFile

class TransferJson {
  constructor(opt) {
    this.jsonFile = opt.jsonFile;
    this.jsPath = opt.jsPath;
    this.lessPath = opt.lessPath;
  }

  createFile() {
    createFile({
      jsonFile: this.jsonFile,
      jsPath: this.jsPath,
      lessPath: this.lessPath
    });
  }

  apply(compiler) {
    compiler.hooks.afterPlugins.tap('createFile', stats => {
      console.log('\n--------------------------------------');
      console.log('createing js&less file!');
      console.log('--------------------------------------\n');
      this.createFile();
      console.log('\n--------------------------------------');
      console.log('create js&less file success!');
      console.log('--------------------------------------\n');
    });

    compiler.hooks.watchRun.tap('watch', compiler => {
      const changedFiles = compiler.watchFileSystem.watcher.mtimes;

      console.log('99999999999999999999999999999999999999999999999999')
      console.log(changedFiles)
      console.log('99999999999999999999999999999999999999999999999999')
    });

    compiler.hooks.afterCompile.tap('after', (compilation) => {
      compilation.fileDependencies.add(this.jsonFile);
      // this.createFile();
    });
  }
}

module.exports = TransferJson;
