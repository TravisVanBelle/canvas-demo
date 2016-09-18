# Canvas with Sockets demo

An HTML5 Canvas demo with multiplayer networking. Uses [SocketSync](https://github.com/TravisVanBelle/socket-sync) as a library for Socket.io.

Allows multiple users to move around and shoot bullets in an HTML5 Canvas.

Made with:
* [PhysicsJS](https://github.com/wellcaffeinated/PhysicsJS)
* [Keypress](https://github.com/dmauro/Keypress/)
* [Socket.io](https://github.com/socketio/socket.io)
* Also uses [Ember](https://github.com/emberjs/ember.js/)

## Prerequisites

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation

Install the client:
* Clone the repo: `git clone https://github.com/TravisVanBelle/canvas-demo`
* Change into the new directory.
* `npm install`
* `bower install`

Install the server:
* Change back into the parent directory.
* Clone the repo: `git clone https://github.com/TravisVanBelle/socket-sync`
* Change into the new directory.
* `npm install`


## Running / Development

In the `socket-sync` directory:
* `node index` (or `node --use-strict index` if that fails)

In the `canvas-demo` directory
* `ember server`
* Go to [http://localhost:4200/play](http://localhost:4200/play).
