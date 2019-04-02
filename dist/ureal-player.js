(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ureal-player"] = factory();
	else
		root["ureal-player"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! exports provided: UrealPlayer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ "./src/player.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UrealPlayer", function() { return _player__WEBPACK_IMPORTED_MODULE_0__["default"]; });





/***/ }),

/***/ "./src/player.ts":
/*!***********************!*\
  !*** ./src/player.ts ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function UnrealWebRTCPlayer(remoteVideo, alias, sid, ipAddress, port, useSecureWebsocket, useSingleWebRTCPort, WebRTCProtocol) {
    var pc = null;
    var ws = null;
    var state = -1;
    var audioCodec = "";
    var videoCodec = "";
    var latestStopTime = 0;
    var connOK = false;
    var showControls = remoteVideo.controls;
    this.Play = function Play() {
        var nowTime = new Date().getTime();
        if ((state == -1) && (nowTime - latestStopTime > 1000)) {
            remoteVideo.srcObject = null;
            state = 0;
            connOK = false;
            remoteVideo.setAttribute('style', 'background: black url(loader.gif) center no-repeat;');
            showControls = remoteVideo.controls;
            remoteVideo.controls = false;
            DoSignaling();
        }
        if (nowTime - latestStopTime <= 1000)
            remoteVideo.pause();
    };
    this.Stop = function Stop() {
        showControls = remoteVideo.controls;
        Terminate();
    };
    remoteVideo.onplay = this.Play;
    remoteVideo.onpause = this.Stop;
    function Terminate() {
        latestStopTime = new Date().getTime();
        state = -1;
        remoteVideo.setAttribute('style', 'background-color:black');
        if (showControls)
            remoteVideo.controls = true;
        if (pc != null) {
            pc.onconnectionstatechange = null;
            pc.close();
            pc = null;
        }
        if (ws != null) {
            ws.onerror = null;
            ws.close();
            ws = null;
        }
        remoteVideo.pause();
    }
    function onCreateSessionDescriptionError(error) {
        Terminate();
        alert("Failed to create session description: " + error.toString());
    }
    function onCreateOfferSuccess(desc) {
        var audioRate = 8000;
        if (audioCodec === "opus")
            audioRate = 48000;
        if (audioCodec != "")
            desc.sdp = setCodec(desc.sdp, "audio", audioCodec, audioRate);
        if (videoCodec != "")
            desc.sdp = setCodec(desc.sdp, "video", videoCodec, 90000);
        //Fix for some browsers and/or adapter incorrect behavior
        desc.sdp = desc.sdp.replace("a=sendrecv", "a=recvonly");
        desc.sdp = desc.sdp.replace("a=sendrecv", "a=recvonly");
        //Signal the SDP to the server
        var msgString = JSON.stringify(desc);
        ws.send(msgString);
        pc.setLocalDescription(desc);
    }
    function onIceCandidate(event) {
        //Do nothing! We only need one endpoint from server; browser is going to connect to it
    }
    function gotRemoteStream(e) {
        remoteVideo.srcObject = e.streams[0];
        if (videoCodec == "")
            remoteVideo.setAttribute('style', 'background-color:black');
        if (showControls)
            remoteVideo.controls = true;
    }
    function onConnStateChange(event) {
        if (pc.connectionState === "failed") {
            Terminate();
            alert("Connection failed; playback stopped");
        }
    }
    function DoSignaling() {
        var centralWebRTCPort = useSingleWebRTCPort ? "singleport/" : "randomport/";
        var URL = useSecureWebsocket ? "wss://" : "ws://";
        URL += ipAddress + ":" + port + "/webrtc_playnow/" + centralWebRTCPort + WebRTCProtocol + "/" + alias;
        if (sid != "")
            URL += "/sid:" + sid;
        try {
            ws = new WebSocket(URL);
        }
        catch (error) {
            Terminate();
            alert("Error creating websocket: " + error);
        }
        ws.onmessage = function (evt) {
            var response = evt.data;
            var strArr = response.split("|-|-|");
            connOK = true;
            if (state == 0) {
                state = 1;
                if (strArr.length == 1) {
                    Terminate();
                    alert(response);
                }
                else {
                    var servers = null;
                    var offerOptions = null;
                    videoCodec = strArr[0];
                    audioCodec = strArr[1];
                    if ((videoCodec != "") && (audioCodec != ""))
                        offerOptions = { offerToReceiveAudio: true, offerToReceiveVideo: false };
                    else if (videoCodec != "")
                        offerOptions = { offerToReceiveAudio: false, offerToReceiveVideo: true };
                    else if (audioCodec != "")
                        offerOptions = { offerToReceiveAudio: true, offerToReceiveVideo: false };
                    pc = new RTCPeerConnection(servers);
                    pc.onicecandidate = onIceCandidate;
                    pc.onconnectionstatechange = onConnStateChange;
                    pc.ontrack = gotRemoteStream;
                    pc.createOffer(offerOptions).then(onCreateOfferSuccess, onCreateSessionDescriptionError);
                }
            }
            else {
                if (strArr.length == 1) {
                    Terminate();
                    alert(response);
                }
                else {
                    var serverSDP = JSON.parse(strArr[0]);
                    var serverEndpoint = JSON.parse(strArr[1]);
                    serverEndpoint.candidate = EnsureValidCandidate(serverEndpoint.candidate);
                    pc.setRemoteDescription(new RTCSessionDescription(serverSDP));
                    var candidate = new RTCIceCandidate({ sdpMLineIndex: serverEndpoint.sdpMLineIndex, candidate: serverEndpoint.candidate });
                    pc.addIceCandidate(candidate);
                    ws.close();
                    ws = null;
                }
            }
        };
        ws.onerror = function (evt) {
            if (!connOK) {
                Terminate();
                alert("Error connecting to Unreal Media Server");
            }
        };
    }
    function EnsureValidCandidate(candidate) {
        if ((candidate.search(ipAddress) !== -1) || !useSingleWebRTCPort || (ipAddress == "127.0.0.1") || !ValidateIPaddress(ipAddress)) {
            return candidate;
        }
        //In case the server is behind the NAT router, replace private IP with public IP in the candidate
        var candLines = candidate.split(" ");
        var ipIndex = 4;
        for (var i = 0; i < candLines.length; i++) {
            if (candLines[i] === "typ") {
                ipIndex = i - 2;
                break;
            }
        }
        candLines[ipIndex] = ipAddress;
        candidate = candLines.join(" ");
        return candidate;
    }
    function ValidateIPaddress(ipaddr) {
        if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddr)) {
            return true;
        }
        return false;
    }
    function setCodec(sdp, type, codec, clockRate) {
        var sdpLines = sdp.split("\r\n");
        for (var i = 0; i < sdpLines.length; i++) {
            if (sdpLines[i].search("m=" + type) !== -1) {
                var mLineIndex = i;
                break;
            }
        }
        if (mLineIndex === null)
            return sdp;
        var codecPayload = null;
        var re = new RegExp(":(\\d+) " + codec + "\/" + clockRate);
        for (var i = mLineIndex; i < sdpLines.length; i++) {
            if (sdpLines[i].search(codec + "/" + clockRate) !== -1) {
                codecPayload = extractPayloadType(sdpLines[i], re);
                if (codecPayload)
                    sdpLines[mLineIndex] = setDefaultCodec(sdpLines[mLineIndex], codecPayload);
                break;
            }
        }
        if (codecPayload === null)
            return sdp;
        var rtmpmap = "a=rtpmap:";
        var rtcp = "a=rtcp-fb:";
        var fmptp = "a=fmtp:";
        var rtmpmapThis = "a=rtpmap:" + codecPayload;
        var rtcpThis = "a=rtcp-fb:" + codecPayload;
        var fmptpThis = "a=fmtp:" + codecPayload;
        var bAddAll = false;
        var resSDPLines = new Array();
        for (var i = 0; i < sdpLines.length; i++) {
            if (i <= mLineIndex) {
                resSDPLines.push(sdpLines[i]);
            }
            else {
                if (sdpLines[i].search("m=") === 0)
                    bAddAll = true;
                var bNotToAdd = ((sdpLines[i].search(rtmpmap) === 0) && (sdpLines[i].search(rtmpmapThis) !== 0)) || ((sdpLines[i].search(rtcp) === 0) && (sdpLines[i].search(rtcpThis) !== 0)) || ((sdpLines[i].search(fmptp) === 0) && (sdpLines[i].search(fmptpThis) !== 0));
                if (bAddAll || !bNotToAdd)
                    resSDPLines.push(sdpLines[i]);
            }
        }
        sdp = resSDPLines.join("\r\n");
        return sdp;
    }
    ;
    function extractPayloadType(sdpLine, pattern) {
        var result = sdpLine.match(pattern);
        return (result && result.length == 2) ? result[1] : null;
    }
    ;
    function setDefaultCodec(mLine, payload) {
        var elements = mLine.split(" ");
        var newLine = new Array();
        var index = 0;
        for (var i = 0; i < elements.length; i++) {
            if (index === 3) {
                newLine[index++] = payload;
                break;
            }
            if (elements[i] !== payload)
                newLine[index++] = elements[i];
        }
        return newLine.join(" ");
    }
    ;
}
;
/* harmony default export */ __webpack_exports__["default"] = (UnrealWebRTCPlayer);


/***/ })

/******/ });
});
//# sourceMappingURL=ureal-player.js.map