var shell = require('shelljs');

function execute(cmd, done, fail) {
  // If user is changing directories
  var split = cmd.split(' ');
  if (split[0] == 'cd') {
    shell.cd(split[1]);
    return done(shell.pwd() + '\n');
  }

  // Otherwise just execute command
  shell.exec(cmd, { silent: true }, function(code, stdout, stderr) {
    if (stdout.length != 0) done(stdout);
    else if (stderr.length != 0) done(stderr, true);
    else done("No output\n", true);
  });
}

module.exports = function(io, client) {
  return {
    execute: function(message, user) {
      execute(message, done);

      function done(data, failed) {
        failed = failed ? failed : false;
        if (failed) return io.fail('terminal.output', data, client);
        io.pass('terminal.output', data, client);
      }
    }
  };
};
