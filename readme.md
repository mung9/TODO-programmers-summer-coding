# TODO
> 프로그래머스 2019 섬머코딩 과제

[![NPM Version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]


프로그래머스 2019 섬머코딩 과제로 제출하는 프로젝트입니다.

<!-- 실행 화면 캡쳐 -->
![](header.png) 

## 기본 요구사항

<!--  웹서버를 리눅스 기준으로 실행하기 위해 필요한 설치
및 빌드 방법 -->
실행을 위해 [Node.js](https://nodejs.org/ko/)와 [MongoDB](https://www.mongodb.com/)가 필요합니다.

### Node.js (10.x)

Node.js를 [여기](https://nodejs.org/ko/)에서 설치할 수 있습니다.
아래의 명령어를 통해 node와 npm이 설치되었음을 확인합니다.
npm은 node를 설치할 때 함께 설치됩니다.

```shell
$ node --version
v0.10.24

$ npm --version
1.3.21
```

#### Linux에서 명령어로 Node.js 설치하기

```shell
sudo apt-get install python-software-properties
sudo add-apt-repository ppa:chris-lea/node.js
sudo apt-get update
sudo apt-get install nodejs
```

### MongoDB (4.x)
MongoDB는 [여기](https://www.mongodb.com/download-center/community)에서 설치할 수 있습니다.
아래의 명령어를 통해 node와 npm이 설치되었음을 확인합니다.
npm은 node를 설치할 때 함께 설치됩니다.
```shell
$ mongod --version
db version v4.0.6
```

---

## 설치

프로젝트를 원하는 디렉토리로 가져옵니다.

```shell
$ git clone https://url.to.repository
```

프로젝트의 루트 디렉토리로 이동하여 아래 명령어를 실행합니다. 
서버 구동에 필요한 패키지들을 자동으로 설치해줍니다.
```shell
$ cd PROJECT
$ npm install
```

### 클라이언트 종속성 설치
이 단계는 React로 작성된 클라이언트 소스코드를 변경하여 실행하고 싶은 경우에만 필요합니다. 해당되지 않을 경우 건너뛰어도 무방합니다.
아래 명령어를 입력하여 React 애플리케이션 빌드에 필요한 패키지를 자동으로 설치합니다.
```shell
$ npm install --prefix client
```


### Configure app

Copy `config.sample.json` to `config.json` then edit it with the url where you have setup:

- backend api
- oauth like endpoint for auth
- development

---
## 서버 시작

### Development Mode

    $ npm start

### Production Mode

    $ npm run build

---

## 언어 & 도구

### HTML

- [Jade](http://jade-lang.com/) for some templating.

### JavaScript

- [JSHint](http://www.jshint.com/docs/) is used to prevent JavaScript error.
- [JSCS](https://npmjs.org/package/jscs) is used to check coding conventions.
- [Browserify](http://browserify.org/) to handle allow us to write our client-side scripts with [es6 syntax](http://es6.github.io/) thanks to [es6ify](https://github.com/thlorenz/es6ify).
- [React](http://facebook.github.io/react) is used for UI.

### CSS

- [cssnext](http://cssnext.putaindecode.io) is used to write futureproof CSS for CSS vendor prefix under the hood).

_Autoprefixer_ is included and use [caniuse.com](http://caniuse.com/) database to avoid outdated prefixes. _You can forget CSS prefixes NOW._

### Static server with Livereload

The app embed for development a static connect server with livereload plugged.
So each time you start the app, you get automatic refresh in the browser whenever you update a file.

<!-- Markdown link & img dfn's -->
[npm-image]: https://img.shields.io/npm/v/datadog-metrics.svg?style=flat-square
[npm-url]: https://npmjs.org/package/datadog-metrics
[npm-downloads]: https://img.shields.io/npm/dm/datadog-metrics.svg?style=flat-square
[travis-image]: https://img.shields.io/travis/dbader/node-datadog-metrics/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/dbader/node-datadog-metrics
[wiki]: https://github.com/yourname/yourproject/wiki
