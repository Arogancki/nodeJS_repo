
/*
 * Title: WebSync Client for JavaScript
 * Version: 4.9.32
 * Copyright Frozen Mountain Software 2011+
 */

(function(name, dependencies, definition) {
    if (typeof define === 'function' && define.amd) { // AMD/RequireJS
        define(name, dependencies, definition);
    } else if (typeof exports === 'object') { // Node/CommonJS
        for (var i = 0; i < dependencies.length; i++) {
            require('./' + dependencies[i]);
        }
        module.exports = definition();
    } else {
        this[name] = definition();
    }
}('fm.websync', ['fm'], function() {

if (typeof global !== 'undefined' && !global.window) { global.window = global; global.document = { cookie: '' }; }

if (!window.fm) { throw new Error("fm must be loaded before fm.websync."); }

if (!window.fm.websync) { window.fm.websync = {}; }

fm.websync.getVersion = function() {
  return '4.9.32';
};



/*<span id='cls-fm.websync.connectRetryMode'>&nbsp;</span> */

/**
@class fm.websync.connectRetryMode
 <div>
 Various behaviour modes for handling connect retries.
 </div>

@extends fm.enum
 */
fm.websync.connectRetryMode = {

  /*<span id='prop-fm.websync.connectRetryMode-Aggressive'>&nbsp;</span> */

  /**
  	 <div>
  	 Indicates that the client should automatically
  	 retry after a connect failure, even if the failure
  	 originates from a custom server-side event.
  	 </div>
  
  	@field Aggressive
  	@type {fm.websync.connectRetryMode}
   */
  Aggressive: 1,

  /*<span id='prop-fm.websync.connectRetryMode-Intelligent'>&nbsp;</span> */

  /**
  	 <div>
  	 Indicates that the client should automatically
  	 retry after a connect failure, unless the failure
  	 originates from a custom server-side event.
  	 </div>
  
  	@field Intelligent
  	@type {fm.websync.connectRetryMode}
   */
  Intelligent: 2,

  /*<span id='prop-fm.websync.connectRetryMode-None'>&nbsp;</span> */

  /**
  	 <div>
  	 Indicates that the client should not automatically
  	 retry after a connect failure.
  	 </div>
  
  	@field None
  	@type {fm.websync.connectRetryMode}
   */
  None: 3,

  /*<span id='prop-fm.websync.connectRetryMode-Default'>&nbsp;</span> */

  /**
  	 <div>
  	 Same as <see cref="fm.websync.connectRetryMode.Intelligent">fm.websync.connectRetryMode.Intelligent</see>.
  	 </div>
  
  	@field Default
  	@type {fm.websync.connectRetryMode}
   */
  Default: 2
};



/*<span id='cls-fm.websync.concurrencyMode'>&nbsp;</span> */

/**
@class fm.websync.concurrencyMode
 <div>
 Various behaviour modes for the streaming connection.
 </div>

@extends fm.enum
 */
fm.websync.concurrencyMode = {

  /*<span id='prop-fm.websync.concurrencyMode-Low'>&nbsp;</span> */

  /**
  	 <div>
  	 Indicates that the client will not be competing with
  	 many other clients within the same process.
  	 </div>
  
  	@field Low
  	@type {fm.websync.concurrencyMode}
   */
  Low: 1,

  /*<span id='prop-fm.websync.concurrencyMode-High'>&nbsp;</span> */

  /**
  	 <div>
  	 Indicates that the client will have to compete with
  	 hundreds or thousands of other clients within the same
  	 process for processor time.
  	 </div>
  
  	@field High
  	@type {fm.websync.concurrencyMode}
   */
  High: 2,

  /*<span id='prop-fm.websync.concurrencyMode-Default'>&nbsp;</span> */

  /**
  	 <div>
  	 Same as <see cref="fm.websync.concurrencyMode.Low">fm.websync.concurrencyMode.Low</see>.
  	 </div>
  
  	@field Default
  	@type {fm.websync.concurrencyMode}
   */
  Default: 1
};



/*<span id='cls-fm.websync.reconnect'>&nbsp;</span> */

/**
@class fm.websync.reconnect
 <div>
 Allowed reconnect advice values for <see cref="fm.websync.message"> Messages</see>.
 </div>

@extends fm.enum
 */
fm.websync.reconnect = {

  /*<span id='prop-fm.websync.reconnect-Retry'>&nbsp;</span> */

  /**
  	 <div>
  	 Indicates that the client should retry its last request.
  	 </div>
  
  	@field Retry
  	@type {fm.websync.reconnect}
   */
  Retry: 1,

  /*<span id='prop-fm.websync.reconnect-Handshake'>&nbsp;</span> */

  /**
  	 <div>
  	 Indicates that the client should attempt to handshake.
  	 </div>
  
  	@field Handshake
  	@type {fm.websync.reconnect}
   */
  Handshake: 2,

  /*<span id='prop-fm.websync.reconnect-None'>&nbsp;</span> */

  /**
  	 <div>
  	 Indicates that the client should not attempt to reconnect.
  	 </div>
  
  	@field None
  	@type {fm.websync.reconnect}
   */
  None: 3
};



/*<span id='cls-fm.websync.connectionType'>&nbsp;</span> */

/**
@class fm.websync.connectionType
 <div>
 Allowed connection type values for <see cref="fm.websync.message">Messages</see>.
 </div>

@extends fm.enum
 */
fm.websync.connectionType = {

  /*<span id='prop-fm.websync.connectionType-WebSocket'>&nbsp;</span> */

  /**
  	 <div>
  	 Indicates that the WebSocket connection type is supported.
  	 </div>
  
  	@field WebSocket
  	@type {fm.websync.connectionType}
   */
  WebSocket: 1,

  /*<span id='prop-fm.websync.connectionType-LongPolling'>&nbsp;</span> */

  /**
  	 <div>
  	 Indicates that the long-polling connection type is supported.
  	 </div>
  
  	@field LongPolling
  	@type {fm.websync.connectionType}
   */
  LongPolling: 2,

  /*<span id='prop-fm.websync.connectionType-CallbackPolling'>&nbsp;</span> */

  /**
  	 <div>
  	 Indicates that the callback-polling connection type is supported.
  	 </div>
  
  	@field CallbackPolling
  	@type {fm.websync.connectionType}
   */
  CallbackPolling: 3,

  /*<span id='prop-fm.websync.connectionType-IFrame'>&nbsp;</span> */

  /**
  	 <div>
  	 (Unsupported) Indicates that the iframe connection type is supported.
  	 </div>
  
  	@field IFrame
  	@type {fm.websync.connectionType}
   */
  IFrame: 4,

  /*<span id='prop-fm.websync.connectionType-Flash'>&nbsp;</span> */

  /**
  	 <div>
  	 (Unsupported) Indicates that the flash connection type is supported.
  	 </div>
  
  	@field Flash
  	@type {fm.websync.connectionType}
   */
  Flash: 5,

  /*<span id='prop-fm.websync.connectionType-Unknown'>&nbsp;</span> */

  /**
  	 <div>
  	 Indicates that the connection type was not recognized.
  	 </div>
  
  	@field Unknown
  	@type {fm.websync.connectionType}
   */
  Unknown: 99
};



/*<span id='cls-fm.websync.messageType'>&nbsp;</span> */

/**
@class fm.websync.messageType
 <div>
 Possible message types for <see cref="fm.websync.message">Messages</see>.
 </div>

@extends fm.enum
 */
fm.websync.messageType = {

  /*<span id='prop-fm.websync.messageType-Connect'>&nbsp;</span> */

  /**
  	 <div>
  	 Message is a connect request/response.
  	 </div>
  
  	@field Connect
  	@type {fm.websync.messageType}
   */
  Connect: 1,

  /*<span id='prop-fm.websync.messageType-Disconnect'>&nbsp;</span> */

  /**
  	 <div>
  	 Message is a disconnect request/response.
  	 </div>
  
  	@field Disconnect
  	@type {fm.websync.messageType}
   */
  Disconnect: 2,

  /*<span id='prop-fm.websync.messageType-Bind'>&nbsp;</span> */

  /**
  	 <div>
  	 Messages is a bind request/response.
  	 </div>
  
  	@field Bind
  	@type {fm.websync.messageType}
   */
  Bind: 3,

  /*<span id='prop-fm.websync.messageType-Unbind'>&nbsp;</span> */

  /**
  	 <div>
  	 Messages is an unbind request/response.
  	 </div>
  
  	@field Unbind
  	@type {fm.websync.messageType}
   */
  Unbind: 4,

  /*<span id='prop-fm.websync.messageType-Subscribe'>&nbsp;</span> */

  /**
  	 <div>
  	 Message is a subscribe request/response.
  	 </div>
  
  	@field Subscribe
  	@type {fm.websync.messageType}
   */
  Subscribe: 5,

  /*<span id='prop-fm.websync.messageType-Unsubscribe'>&nbsp;</span> */

  /**
  	 <div>
  	 Message is an unsubscribe request/response.
  	 </div>
  
  	@field Unsubscribe
  	@type {fm.websync.messageType}
   */
  Unsubscribe: 6,

  /*<span id='prop-fm.websync.messageType-Publish'>&nbsp;</span> */

  /**
  	 <div>
  	 Message is a publish request/response.
  	 </div>
  
  	@field Publish
  	@type {fm.websync.messageType}
   */
  Publish: 7,

  /*<span id='prop-fm.websync.messageType-Notify'>&nbsp;</span> */

  /**
  	 <div>
  	 Message is a notify request/response.
  	 </div>
  
  	@field Notify
  	@type {fm.websync.messageType}
   */
  Notify: 8,

  /*<span id='prop-fm.websync.messageType-Service'>&nbsp;</span> */

  /**
  	 <div>
  	 Message is a service request/response.
  	 </div>
  
  	@field Service
  	@type {fm.websync.messageType}
   */
  Service: 9,

  /*<span id='prop-fm.websync.messageType-Stream'>&nbsp;</span> */

  /**
  	 <div>
  	 Message is a stream request/response.
  	 </div>
  
  	@field Stream
  	@type {fm.websync.messageType}
   */
  Stream: 10,

  /*<span id='prop-fm.websync.messageType-Unknown'>&nbsp;</span> */

  /**
  	 <div>
  	 Message is an unknown request/response.
  	 </div>
  
  	@field Unknown
  	@type {fm.websync.messageType}
   */
  Unknown: 11
};



/*<span id='cls-fm.websync.backoffArgs'>&nbsp;</span> */

/**
@class fm.websync.backoffArgs
 <div>
 Arguments used for <see cref="fm.websync.connectArgs.retryBackoff">fm.websync.connectArgs.retryBackoff</see></div>

@extends fm.object
 */
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.backoffArgs = (function(superClass) {
  extend(backoffArgs, superClass);

  backoffArgs.prototype._index = 0;

  backoffArgs.prototype._lastTimeout = 0;

  function backoffArgs() {
    this.setLastTimeout = bind(this.setLastTimeout, this);
    this.setIndex = bind(this.setIndex, this);
    this.getLastTimeout = bind(this.getLastTimeout, this);
    this.getIndex = bind(this.getIndex, this);
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = backoffArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = backoffArgs.__super__.constructor.call(this);
    return instance;
  }


  /*<span id='method-fm.websync.backoffArgs-getIndex'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the current backoff index. Starts at <c>0</c> and
  	 increments by <c>1</c> for each backoff attempt.
  	 </div>
  
  	@function getIndex
  	@return {Integer}
   */

  backoffArgs.prototype.getIndex = function() {
    return this._index;
  };


  /*<span id='method-fm.websync.backoffArgs-getLastTimeout'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets last timeout value used.
  	 </div>
  
  	@function getLastTimeout
  	@return {Integer}
   */

  backoffArgs.prototype.getLastTimeout = function() {
    return this._lastTimeout;
  };

  backoffArgs.prototype.setIndex = function() {
    var value;
    value = arguments[0];
    return this._index = value;
  };

  backoffArgs.prototype.setLastTimeout = function() {
    var value;
    value = arguments[0];
    return this._lastTimeout = value;
  };

  return backoffArgs;

})(fm.object);



/*<span id='cls-fm.websync.extensible'>&nbsp;</span> */

/**
@class fm.websync.extensible
 <div>
 <p>
 Base class that defines the properties and methods shared by any class that
 is considered extensible by the Bayeux specification.
 </p>
 <p>
 The Bayeux specification defines the Ext field, which allows custom data to be
 stored with a message using a namespaced key to access the information. This class
 provides methods that store and retrieve JSON data stored in this manner. For example,
 the <see cref="fm.websync.extensible.metaJson">fm.websync.extensible.metaJson</see> property uses the Ext field to store its value
 using "fm.meta" as a key.
 </p>
 <p>
 In addition, classes which inherit from <see cref="fm.websync.extensible">fm.websync.extensible</see> can store
 dynamic property values for local read/write access without the need to serialize
 to JSON. This can aid greatly in the
 development of third-party extensions to WebSync. Custom information can be stored
 with method arguments in the "before" event and read out again for further
 processing in the "after" event.
 </p>
 </div>

@extends fm.dynamic
 */
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.extensible = (function(superClass) {
  extend(extensible, superClass);

  extensible.prototype.__extensions = null;


  /*<span id='prop-fm.websync.extensible-_acknowledgementExtensionName'>&nbsp;</span> */


  /**
  	 <div>
  	 The reserved extension name for acknowledgement of received messages.
  	 </div>
  
  	@field _acknowledgementExtensionName
  	@type {String}
   */

  extensible._acknowledgementExtensionName = "fm.ack";


  /*<span id='prop-fm.websync.extensible-_disableBinaryExtensionName'>&nbsp;</span> */


  /**
  	 <div>
  	 The reserved extension name for disabling the transmission of binary data as binary.
  	 </div>
  
  	@field _disableBinaryExtensionName
  	@type {String}
   */

  extensible._disableBinaryExtensionName = "fm.dbin";


  /*<span id='prop-fm.websync.extensible-_lastClientIdExtensionName'>&nbsp;</span> */


  /**
  	 <div>
  	 The reserved extension name for enhanced cleanup of old client IDs.
  	 </div>
  
  	@field _lastClientIdExtensionName
  	@type {String}
   */

  extensible._lastClientIdExtensionName = "fm.lcid";


  /*<span id='prop-fm.websync.extensible-_lastSessionIdExtensionName'>&nbsp;</span> */


  /**
  	 <div>
  	 The reserved extension name for enhanced cleanup of old session IDs.
  	 </div>
  
  	@field _lastSessionIdExtensionName
  	@type {String}
   */

  extensible._lastSessionIdExtensionName = "fm.lsid";


  /*<span id='prop-fm.websync.extensible-_metaExtensionName'>&nbsp;</span> */


  /**
  	 <div>
  	 The reserved extension name for message/publication meta-data.
  	 </div>
  
  	@field _metaExtensionName
  	@type {String}
   */

  extensible._metaExtensionName = "fm.meta";


  /*<span id='prop-fm.websync.extensible-_notifyClientIdExtensionName'>&nbsp;</span> */


  /**
  	 <div>
  	 The reserved extension name for the client ID targeted by a notification.
  	 </div>
  
  	@field _notifyClientIdExtensionName
  	@type {String}
   */

  extensible._notifyClientIdExtensionName = "fm.notify";


  /*<span id='prop-fm.websync.extensible-_notifyingClientExtensionName'>&nbsp;</span> */


  /**
  	 <div>
  	 The reserved extension name for records bound to notifying clients.
  	 </div>
  
  	@field _notifyingClientExtensionName
  	@type {String}
   */

  extensible._notifyingClientExtensionName = "fm.notifying";


  /*<span id='prop-fm.websync.extensible-_publishingClientExtensionName'>&nbsp;</span> */


  /**
  	 <div>
  	 The reserved extension name for records bound to publishing clients.
  	 </div>
  
  	@field _publishingClientExtensionName
  	@type {String}
   */

  extensible._publishingClientExtensionName = "fm.publishing";


  /*<span id='prop-fm.websync.extensible-_serverActionsExtensionName'>&nbsp;</span> */


  /**
  	 <div>
  	 The reserved extension name for passing back server actions to a client.
  	 </div>
  
  	@field _serverActionsExtensionName
  	@type {String}
   */

  extensible._serverActionsExtensionName = "fm.server";


  /*<span id='prop-fm.websync.extensible-_serverTimeoutExtensionName'>&nbsp;</span> */


  /**
  	 <div>
  	 The reserved extension name for the server-defined timeout interval.
  	 </div>
  
  	@field _serverTimeoutExtensionName
  	@type {String}
   */

  extensible._serverTimeoutExtensionName = "fm.timeout";


  /*<span id='prop-fm.websync.extensible-_sessionIdExtensionName'>&nbsp;</span> */


  /**
  	 <div>
  	 The reserved extension name for the secure session ID.
  	 </div>
  
  	@field _sessionIdExtensionName
  	@type {String}
   */

  extensible._sessionIdExtensionName = "fm.sessionId";


  /*<span id='prop-fm.websync.extensible-_tagExtensionName'>&nbsp;</span> */


  /**
  	 <div>
  	 The reserved extension name for tags.
  	 </div>
  
  	@field _tagExtensionName
  	@type {String}
   */

  extensible._tagExtensionName = "fm.tag";

  function extensible() {
    this.setMeta = bind(this.setMeta, this);
    this.setExtensionValue = bind(this.setExtensionValue, this);
    this.getMeta = bind(this.getMeta, this);
    this.getExtensionValue = bind(this.getExtensionValue, this);
    this.setMetaJson = bind(this.setMetaJson, this);
    this.setExtensionValueJson = bind(this.setExtensionValueJson, this);
    this.setExtensions = bind(this.setExtensions, this);
    this.getMetaJson = bind(this.getMetaJson, this);
    this.getExtensionValueJson = bind(this.getExtensionValueJson, this);
    this.getExtensions = bind(this.getExtensions, this);
    this.getExtensionNames = bind(this.getExtensionNames, this);
    this.getExtensionCount = bind(this.getExtensionCount, this);
    this.copyExtensions = bind(this.copyExtensions, this);
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = extensible.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = extensible.__super__.constructor.call(this);
    return instance;
  }

  extensible.convertKeyToRecord = function() {
    var key;
    key = arguments[0];
    return new fm.websync.record(key);
  };

  extensible.convertRecordToKey = function() {
    var record;
    record = arguments[0];
    return record.getKey();
  };


  /*<span id='method-fm.websync.extensible-sharedGetChannel'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the first channel from an array of channels.
  	 </div>
  	@function sharedGetChannel
  	@param {fm.array} channels The channels to scan.
  	@return {String} The first channel.
   */

  extensible.sharedGetChannel = function() {
    var channels;
    channels = arguments[0];
    if ((fm.global.equals(channels, null)) || (fm.global.equals(channels.length, 0))) {
      return null;
    }
    return channels[0];
  };


  /*<span id='method-fm.websync.extensible-sharedGetChannels'>&nbsp;</span> */


  /**
  	 <div>
  	 Converts an array of channels to itself.
  	 </div>
  	@function sharedGetChannels
  	@param {fm.array} channels The array of channels.
  	@return {fm.array} The array of channels.
   */

  extensible.sharedGetChannels = function() {
    var channels;
    channels = arguments[0];
    return channels;
  };


  /*<span id='method-fm.websync.extensible-sharedGetKey'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the first key from an array of records.
  	 </div>
  	@function sharedGetKey
  	@param {fm.array} records The records to scan.
  	@return {String} The first key.
   */

  extensible.sharedGetKey = function() {
    var record, records;
    records = arguments[0];
    record = fm.websync.extensible.sharedGetRecord(records);
    if (fm.global.equals(record, null)) {
      return null;
    }
    return fm.websync.extensible.convertRecordToKey(record);
  };


  /*<span id='method-fm.websync.extensible-sharedGetKeys'>&nbsp;</span> */


  /**
  	 <div>
  	 Converts an array of records to an array of keys.
  	 </div>
  	@function sharedGetKeys
  	@param {fm.array} records The array of records.
  	@return {fm.array} The array of keys.
   */

  extensible.sharedGetKeys = function() {
    var _var0, i, len, list, record, records;
    records = arguments[0];
    records = fm.websync.extensible.sharedGetRecords(records);
    if (fm.global.equals(records, null)) {
      return null;
    }
    list = [];
    _var0 = records;
    for (i = 0, len = _var0.length; i < len; i++) {
      record = _var0[i];
      fm.arrayExtensions.add(list, fm.websync.extensible.convertRecordToKey(record));
    }
    return fm.arrayExtensions.toArray(list);
  };


  /*<span id='method-fm.websync.extensible-sharedGetRecord'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the first record from an array of records.
  	 </div>
  	@function sharedGetRecord
  	@param {fm.array} records The records to scan.
  	@return {fm.websync.record} The first record.
   */

  extensible.sharedGetRecord = function() {
    var records;
    records = arguments[0];
    if ((fm.global.equals(records, null)) || (fm.global.equals(records.length, 0))) {
      return null;
    }
    return records[0];
  };


  /*<span id='method-fm.websync.extensible-sharedGetRecords'>&nbsp;</span> */


  /**
  	 <div>
  	 Converts an array of records to itself.
  	 </div>
  	@function sharedGetRecords
  	@param {fm.array} records The array of records.
  	@return {fm.array} The array of records.
   */

  extensible.sharedGetRecords = function() {
    var records;
    records = arguments[0];
    return records;
  };


  /*<span id='method-fm.websync.extensible-sharedSetChannel'>&nbsp;</span> */


  /**
  	 <div>
  	 Converts a channel to a validated channel array.
  	 </div>
  	@function sharedSetChannel
  	@param {String} channel The channel to convert.
  	@param {Boolean} validate Whether or not to validate the channel.
  	@return {fm.array} The validated channel array.
   */

  extensible.sharedSetChannel = function() {
    var _var0, _var1, channel, error, validate;
    if (arguments.length === 2) {
      channel = arguments[0];
      validate = arguments[1];
      if (fm.global.equals(channel, null)) {
        return null;
      }
      error = null;
      _var0 = new fm.holder(error);
      _var1 = fm.websync.extensible.validateChannel(channel, _var0);
      error = _var0.getValue();
      if (!(!validate || _var1)) {
        throw new Error(fm.stringExtensions.format("Invalid channel. {0}", error));
      }
      return [channel];
    }
    if (arguments.length === 1) {
      channel = arguments[0];
      return fm.websync.extensible.sharedSetChannel(channel, true);
    }
  };


  /*<span id='method-fm.websync.extensible-sharedSetChannels'>&nbsp;</span> */


  /**
  	 <div>
  	 Converts an array of channels to an array of validated channels.
  	 </div>
  	@function sharedSetChannels
  	@param {fm.array} channels The array of channels.
  	@param {Boolean} validate Whether or not to validate the channels.
  	@return {fm.array} The array of validated channels.
   */

  extensible.sharedSetChannels = function() {
    var _var0, _var1, _var2, channels, error, i, len, str, validate;
    if (arguments.length === 2) {
      channels = arguments[0];
      validate = arguments[1];
      if (!fm.global.equals(channels, null)) {
        _var0 = channels;
        for (i = 0, len = _var0.length; i < len; i++) {
          str = _var0[i];
          error = null;
          _var1 = new fm.holder(error);
          _var2 = fm.websync.extensible.validateChannel(str, _var1);
          error = _var1.getValue();
          if (!(!validate || _var2)) {
            throw new Error(fm.stringExtensions.format("Invalid channel. {0}", error));
          }
        }
      }
      return channels;
    }
    if (arguments.length === 1) {
      channels = arguments[0];
      return fm.websync.extensible.sharedSetChannels(channels, true);
    }
  };


  /*<span id='method-fm.websync.extensible-sharedSetKey'>&nbsp;</span> */


  /**
  	 <div>
  	 Converts a key to a validated record array.
  	 </div>
  	@function sharedSetKey
  	@param {String} key The key to convert.
  	@param {Boolean} validate Whether or not to validate the record.
  	@return {fm.array} The validated record array.
   */

  extensible.sharedSetKey = function() {
    var _var0, _var1, error, key, record, validate;
    if (arguments.length === 2) {
      key = arguments[0];
      validate = arguments[1];
      if (fm.global.equals(key, null)) {
        return null;
      }
      record = fm.websync.extensible.convertKeyToRecord(key);
      error = null;
      _var0 = new fm.holder(error);
      _var1 = fm.websync.extensible.validateRecord(record, _var0);
      error = _var0.getValue();
      if (!(!validate || _var1)) {
        throw new Error(fm.stringExtensions.format("Invalid record. {0}", error));
      }
      return [record];
    }
    if (arguments.length === 1) {
      key = arguments[0];
      return fm.websync.extensible.sharedSetKey(key, true);
    }
  };


  /*<span id='method-fm.websync.extensible-sharedSetKeys'>&nbsp;</span> */


  /**
  	 <div>
  	 Converts an array of keys to an array of validated records.
  	 </div>
  	@function sharedSetKeys
  	@param {fm.array} keys The array of keys.
  	@param {Boolean} validate Whether or not to validate the records.
  	@return {fm.array} The array of records.
   */

  extensible.sharedSetKeys = function() {
    var _var0, _var1, _var2, error, i, keys, len, list, record, str, validate;
    if (arguments.length === 1) {
      keys = arguments[0];
      return fm.websync.extensible.sharedSetKeys(keys, true);
    }
    if (arguments.length === 2) {
      keys = arguments[0];
      validate = arguments[1];
      if (fm.global.equals(keys, null)) {
        return null;
      }
      list = [];
      _var0 = keys;
      for (i = 0, len = _var0.length; i < len; i++) {
        str = _var0[i];
        record = fm.websync.extensible.convertKeyToRecord(str);
        error = null;
        _var1 = new fm.holder(error);
        _var2 = fm.websync.extensible.validateRecord(record, _var1);
        error = _var1.getValue();
        if (!(!validate || _var2)) {
          throw new Error(fm.stringExtensions.format("Invalid record. {0}", error));
        }
        fm.arrayExtensions.add(list, record);
      }
      return fm.arrayExtensions.toArray(list);
    }
  };


  /*<span id='method-fm.websync.extensible-sharedSetRecord'>&nbsp;</span> */


  /**
  	 <div>
  	 Converts a record to a validated record array.
  	 </div>
  	@function sharedSetRecord
  	@param {fm.websync.record} record The record to convert.
  	@param {Boolean} validate Whether or not to validate the record.
  	@return {fm.array} The validated record array.
   */

  extensible.sharedSetRecord = function() {
    var _var0, _var1, error, record, validate;
    if (arguments.length === 2) {
      record = arguments[0];
      validate = arguments[1];
      error = null;
      _var0 = new fm.holder(error);
      _var1 = fm.websync.extensible.validateRecord(record, _var0);
      error = _var0.getValue();
      if (!(!validate || _var1)) {
        throw new Error(fm.stringExtensions.format("Invalid record. {0}", error));
      }
      return [record];
    }
    if (arguments.length === 1) {
      record = arguments[0];
      return fm.websync.extensible.sharedSetRecord(record, true);
    }
  };


  /*<span id='method-fm.websync.extensible-sharedSetRecords'>&nbsp;</span> */


  /**
  	 <div>
  	 Converts an array of records to an array of validated records.
  	 </div>
  	@function sharedSetRecords
  	@param {fm.array} records The array of records.
  	@param {Boolean} validate Whether or not to validate the records.
  	@return {fm.array} The array of validated records.
   */

  extensible.sharedSetRecords = function() {
    var _var0, _var1, _var2, error, i, len, record, records, validate;
    if (arguments.length === 2) {
      records = arguments[0];
      validate = arguments[1];
      if (!fm.global.equals(records, null)) {
        _var0 = records;
        for (i = 0, len = _var0.length; i < len; i++) {
          record = _var0[i];
          error = null;
          _var1 = new fm.holder(error);
          _var2 = fm.websync.extensible.validateRecord(record, _var1);
          error = _var1.getValue();
          if (!(!validate || _var2)) {
            throw new Error(fm.stringExtensions.format("Invalid record. {0}", error));
          }
        }
      }
      return records;
    }
    if (arguments.length === 1) {
      records = arguments[0];
      return fm.websync.extensible.sharedSetRecords(records, true);
    }
  };


  /*<span id='method-fm.websync.extensible-validateChannel'>&nbsp;</span> */


  /**
  	 <div>
  	 Validates a channel.
  	 </div>
  	@function validateChannel
  	@param {String} channel The channel to validate.
  	@param {fm.holder} error The error, if validation failed.
  	@return {Boolean} true if validation succeeded; otherwise false.
   */

  extensible.validateChannel = function() {
    var channel, error;
    channel = arguments[0];
    error = arguments[1];
    if (fm.global.equals(channel, null)) {
      error.setValue("Channel is null.");
      return false;
    }
    if (!fm.stringExtensions.startsWith(channel, "/", fm.stringComparison.Ordinal)) {
      error.setValue("Channel must start with a forward-slash (/).");
      return false;
    }
    if (fm.stringExtensions.indexOf(channel, "*", fm.stringComparison.Ordinal) >= 0) {
      error.setValue("Channel may not contain asterisks (*).");
      return false;
    }
    if (fm.websync.metaChannels.isReservedChannel(channel)) {
      error.setValue("Channel is reserved.");
      return false;
    }
    error.setValue(null);
    return true;
  };


  /*<span id='method-fm.websync.extensible-validateRecord'>&nbsp;</span> */


  /**
  	 <div>
  	 Validates a record.
  	 </div>
  	@function validateRecord
  	@param {fm.websync.record} record The record to validate.
  	@param {fm.holder} error The error, if validation failed.
  	@return {Boolean} true if validation succeeded; otherwise false.
   */

  extensible.validateRecord = function() {
    var error, record;
    record = arguments[0];
    error = arguments[1];
    if (fm.global.equals(record, null)) {
      error.setValue("Record is null.");
      return false;
    }
    if (fm.stringExtensions.isNullOrEmpty(record.getKey())) {
      error.setValue("Key is null or empty.");
      return false;
    }
    error.setValue(null);
    return true;
  };


  /*<span id='method-fm.websync.extensible-copyExtensions'>&nbsp;</span> */


  /**
  	 <div>
  	 Copies extension values from one instance into this instance.
  	 </div>
  	@function copyExtensions
  	@param {fm.websync.extensible} extensible The object with the extensions to copy.
  	@return {void} This instance.
   */

  extensible.prototype.copyExtensions = function() {
    var _var0, extensible, i, len, results, str;
    extensible = arguments[0];
    _var0 = extensible.getExtensionNames();
    results = [];
    for (i = 0, len = _var0.length; i < len; i++) {
      str = _var0[i];
      results.push(this.setExtensionValueJson(str, extensible.getExtensionValueJson(str), false));
    }
    return results;
  };


  /*<span id='method-fm.websync.extensible-getExtensionCount'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the number of extensions stored with this instance.
  	 </div>
  
  	@function getExtensionCount
  	@return {Integer}
   */

  extensible.prototype.getExtensionCount = function() {
    return this.getExtensions().getCount();
  };


  /*<span id='method-fm.websync.extensible-getExtensionNames'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the names of the extensions stored with this instance.
  	 </div>
  
  	@function getExtensionNames
  	@return {Array}
   */

  extensible.prototype.getExtensionNames = function() {
    return this.getExtensions().getNames();
  };


  /*<span id='method-fm.websync.extensible-getExtensions'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the internal extensions collection.
  	 </div>
  
  	@function getExtensions
  	@return {fm.websync.extensions}
   */

  extensible.prototype.getExtensions = function() {
    if (fm.global.equals(this.__extensions, null)) {
      this.__extensions = new fm.websync.extensions();
    }
    return this.__extensions;
  };


  /*<span id='method-fm.websync.extensible-getExtensionValueJson'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets a serialized value stored in the extensions.
  	 </div>
  	@function getExtensionValueJson
  	@param {String} name Fully-qualified extension name.
  	@return {String} The extension value in JSON format.
   */

  extensible.prototype.getExtensionValueJson = function() {
    var name;
    name = arguments[0];
    return this.getExtensions().getValueJson(name);
  };


  /*<span id='method-fm.websync.extensible-getMetaJson'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets meta-data associated with the message/publication.  Must be valid JSON.
  	 </div><div>
  	 Use this property to define meta-data about the request itself, such as
  	 authentication details, etc.
  	 </div>
  
  	@function getMetaJson
  	@return {String}
   */

  extensible.prototype.getMetaJson = function() {
    return this.getExtensionValueJson("fm.meta");
  };


  /*<span id='method-fm.websync.extensible-setExtensions'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the internal extensions collection.
  	 </div>
  
  	@function setExtensions
  	@param {fm.websync.extensions} value
  	@return {void}
   */

  extensible.prototype.setExtensions = function() {
    var value;
    value = arguments[0];
    if (fm.global.equals(value, null)) {
      return this.__extensions = new fm.websync.extensions();
    } else {
      return this.__extensions = value;
    }
  };


  /*<span id='method-fm.websync.extensible-setExtensionValueJson'>&nbsp;</span> */


  /**
  	 <div>
  	 Stores a serialized value in the extensions.  Must be valid JSON.
  	 </div>
  	@function setExtensionValueJson
  	@param {String} name Fully-qualified extension name.
  	@param {String} valueJson The extension value in valid JSON format.
  	@param {Boolean} validate Whether or not to validate the JSON value.
  	@return {void}
   */

  extensible.prototype.setExtensionValueJson = function() {
    var name, validate, valueJson;
    if (arguments.length === 3) {
      name = arguments[0];
      valueJson = arguments[1];
      validate = arguments[2];
      this.getExtensions().setValueJson(name, valueJson, validate);
      this.setIsDirty(true);
      return;
    }
    if (arguments.length === 2) {
      name = arguments[0];
      valueJson = arguments[1];
      this.getExtensions().setValueJson(name, valueJson);
      this.setIsDirty(true);
    }
  };


  /*<span id='method-fm.websync.extensible-setMetaJson'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets meta-data associated with the message/publication.  Must be valid JSON.
  	 </div><div>
  	 Use this property to define meta-data about the request itself, such as
  	 authentication details, etc.
  	 </div>
  
  	@function setMetaJson
  	@param {String} value
  	@return {void}
   */

  extensible.prototype.setMetaJson = function() {
    var value;
    value = arguments[0];
    return this.setExtensionValueJson("fm.meta", value);
  };

  extensible.prototype.getExtensionValue = function() {
    var name;
    name = arguments[0];
    return fm.json.deserialize(this.getExtensionValueJson.apply(this, arguments));
  };

  extensible.prototype.getMeta = function() {
    return fm.json.deserialize(this.getMetaJson.apply(this, arguments));
  };

  extensible.prototype.setExtensionValue = function() {
    var extensionValue, name, valueJson;
    if (arguments.length === 3) {
      name = arguments[0];
      valueJson = arguments[1];
      extensionValue = arguments[2];
      arguments[arguments.length - 1] = fm.json.serialize(arguments[arguments.length - 1]);
      this.setExtensionValueJson.apply(this, arguments);
      return;
    }
    if (arguments.length === 2) {
      name = arguments[0];
      extensionValue = arguments[1];
      arguments[arguments.length - 1] = fm.json.serialize(arguments[arguments.length - 1]);
      this.setExtensionValueJson.apply(this, arguments);
    }
  };

  extensible.prototype.setMeta = function() {
    var meta;
    meta = arguments[0];
    arguments[arguments.length - 1] = fm.json.serialize(arguments[arguments.length - 1]);
    return this.setMetaJson.apply(this, arguments);
  };

  return extensible;

})(fm.dynamic);



/*<span id='cls-fm.websync.baseInputArgs'>&nbsp;</span> */

/**
@class fm.websync.baseInputArgs
 <div>
 Base input arguments for WebSync <see cref="fm.websync.client">fm.websync.client</see> methods.
 </div>

@extends fm.websync.extensible
 */
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.baseInputArgs = (function(superClass) {
  extend(baseInputArgs, superClass);

  baseInputArgs.prototype._isRetry = false;

  baseInputArgs.prototype._requestTimeout = null;

  baseInputArgs.prototype._requestUrl = null;

  baseInputArgs.prototype._synchronous = null;

  function baseInputArgs() {
    this.setSynchronous = bind(this.setSynchronous, this);
    this.setRequestUrl = bind(this.setRequestUrl, this);
    this.setRequestTimeout = bind(this.setRequestTimeout, this);
    this.setIsRetry = bind(this.setIsRetry, this);
    this.getSynchronous = bind(this.getSynchronous, this);
    this.getRequestUrl = bind(this.getRequestUrl, this);
    this.getRequestTimeout = bind(this.getRequestTimeout, this);
    this.getIsRetry = bind(this.getIsRetry, this);
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = baseInputArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = baseInputArgs.__super__.constructor.call(this);
    return instance;
  }


  /*<span id='method-fm.websync.baseInputArgs-getIsRetry'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets whether this method call is a retry following a failure.
  	 </div>
  
  	@function getIsRetry
  	@return {Boolean}
   */

  baseInputArgs.prototype.getIsRetry = function() {
    return this._isRetry;
  };


  /*<span id='method-fm.websync.baseInputArgs-getRequestTimeout'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the number of milliseconds for the request timeout to use
  	 for this request. This will override any client-level request timeout
  	 settings.
  	 </div>
  
  	@function getRequestTimeout
  	@return {fm.nullable}
   */

  baseInputArgs.prototype.getRequestTimeout = function() {
    return this._requestTimeout;
  };


  /*<span id='method-fm.websync.baseInputArgs-getRequestUrl'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the absolute URL of the WebSync request handler, typically
  	 ending with websync.ashx, to use for this request. Overrides the
  	 client-level setting. This request will be sent using the
  	 <see cref="fm.websync.client.StreamRequestTransfer">fm.websync.client.StreamRequestTransfer</see> class (especially relevant if
  	 WebSockets are in use).
  	 </div>
  
  	@function getRequestUrl
  	@return {String}
   */

  baseInputArgs.prototype.getRequestUrl = function() {
    return this._requestUrl;
  };


  /*<span id='method-fm.websync.baseInputArgs-getSynchronous'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets whether the request should be executed asynchronously.
  	 If <c>true</c>, the request will be executed synchronously.
  	 If <c>false</c>, the request will be executed asynchronously.
  	 If <c>null</c>, the request will be executed synchronously or asynchronously,
  	 depending on the value of <see cref="fm.websync.client.synchronous">fm.websync.client.synchronous</see>.
  	 Defaults to <c>null</c>.
  	 </div>
  
  	@function getSynchronous
  	@return {fm.nullable}
   */

  baseInputArgs.prototype.getSynchronous = function() {
    return this._synchronous;
  };


  /*<span id='method-fm.websync.baseInputArgs-setIsRetry'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets whether this method call is a retry following a failure.
  	 </div>
  
  	@function setIsRetry
  	@param {Boolean} value
  	@return {void}
   */

  baseInputArgs.prototype.setIsRetry = function() {
    var value;
    value = arguments[0];
    return this._isRetry = value;
  };


  /*<span id='method-fm.websync.baseInputArgs-setRequestTimeout'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the number of milliseconds for the request timeout to use
  	 for this request. This will override any client-level request timeout
  	 settings.
  	 </div>
  
  	@function setRequestTimeout
  	@param {fm.nullable} value
  	@return {void}
   */

  baseInputArgs.prototype.setRequestTimeout = function() {
    var value;
    value = arguments[0];
    return this._requestTimeout = value;
  };


  /*<span id='method-fm.websync.baseInputArgs-setRequestUrl'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the absolute URL of the WebSync request handler, typically
  	 ending with websync.ashx, to use for this request. Overrides the
  	 client-level setting. This request will be sent using the
  	 <see cref="fm.websync.client.StreamRequestTransfer">fm.websync.client.StreamRequestTransfer</see> class (especially relevant if
  	 WebSockets are in use).
  	 </div>
  
  	@function setRequestUrl
  	@param {String} value
  	@return {void}
   */

  baseInputArgs.prototype.setRequestUrl = function() {
    var value;
    value = arguments[0];
    return this._requestUrl = value;
  };


  /*<span id='method-fm.websync.baseInputArgs-setSynchronous'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets whether the request should be executed asynchronously.
  	 If <c>true</c>, the request will be executed synchronously.
  	 If <c>false</c>, the request will be executed asynchronously.
  	 If <c>null</c>, the request will be executed synchronously or asynchronously,
  	 depending on the value of <see cref="fm.websync.client.synchronous">fm.websync.client.synchronous</see>.
  	 Defaults to <c>null</c>.
  	 </div>
  
  	@function setSynchronous
  	@param {fm.nullable} value
  	@return {void}
   */

  baseInputArgs.prototype.setSynchronous = function() {
    var value;
    value = arguments[0];
    return this._synchronous = value;
  };

  return baseInputArgs;

})(fm.websync.extensible);



/*<span id='cls-fm.websync.baseOutputArgs'>&nbsp;</span> */

/**
@class fm.websync.baseOutputArgs
 <div>
 Base output arguments for WebSync <see cref="fm.websync.baseOutputArgs.client">fm.websync.baseOutputArgs.client</see> methods.
 </div>

@extends fm.websync.extensible
 */
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.baseOutputArgs = (function(superClass) {
  extend(baseOutputArgs, superClass);

  baseOutputArgs.prototype.__timestamp = null;

  baseOutputArgs.prototype._client = null;

  function baseOutputArgs() {
    this.setTimestamp = bind(this.setTimestamp, this);
    this.setClient = bind(this.setClient, this);
    this.getTimestamp = bind(this.getTimestamp, this);
    this.getClient = bind(this.getClient, this);
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = baseOutputArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = baseOutputArgs.__super__.constructor.call(this);
    return instance;
  }


  /*<span id='method-fm.websync.baseOutputArgs-getClient'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the active WebSync <see cref="fm.websync.baseOutputArgs.client">fm.websync.baseOutputArgs.client</see> who made the request.
  	 </div>
  
  	@function getClient
  	@return {fm.websync.client}
   */

  baseOutputArgs.prototype.getClient = function() {
    return this._client;
  };


  /*<span id='method-fm.websync.baseOutputArgs-getTimestamp'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the date/time the message was processed on the server (in UTC/GMT).
  	 </div>
  
  	@function getTimestamp
  	@return {fm.nullable}
   */

  baseOutputArgs.prototype.getTimestamp = function() {
    return this.__timestamp;
  };


  /*<span id='method-fm.websync.baseOutputArgs-setClient'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the active WebSync <see cref="fm.websync.baseOutputArgs.client">fm.websync.baseOutputArgs.client</see> who made the request.
  	 </div>
  
  	@function setClient
  	@param {fm.websync.client} value
  	@return {void}
   */

  baseOutputArgs.prototype.setClient = function() {
    var value;
    value = arguments[0];
    return this._client = value;
  };


  /*<span id='method-fm.websync.baseOutputArgs-setTimestamp'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the date/time the message was processed on the server (in UTC/GMT).
  	 </div>
  
  	@function setTimestamp
  	@param {fm.nullable} value
  	@return {void}
   */

  baseOutputArgs.prototype.setTimestamp = function() {
    var value;
    value = arguments[0];
    if (value !== null) {
      return this.__timestamp = value;
    } else {
      return this.__timestamp = null;
    }
  };

  return baseOutputArgs;

})(fm.websync.extensible);



/*<span id='cls-fm.websync.basePublisherEventArgs'>&nbsp;</span> */

/**
@class fm.websync.basePublisherEventArgs
 <div>
 Base arguments for <see cref="fm.websync.basePublisherEventArgs.publisher">fm.websync.basePublisherEventArgs.publisher</see>-triggered events.
 </div>

@extends fm.object
 */
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.basePublisherEventArgs = (function(superClass) {
  extend(basePublisherEventArgs, superClass);

  basePublisherEventArgs.prototype._publisher = null;

  function basePublisherEventArgs() {
    this.setPublisher = bind(this.setPublisher, this);
    this.getPublisher = bind(this.getPublisher, this);
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = basePublisherEventArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = basePublisherEventArgs.__super__.constructor.call(this);
    return instance;
  }


  /*<span id='method-fm.websync.basePublisherEventArgs-getPublisher'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the <see cref="fm.websync.basePublisherEventArgs.publisher">fm.websync.basePublisherEventArgs.publisher</see> triggering the event.
  	 </div>
  
  	@function getPublisher
  	@return {fm.websync.publisher}
   */

  basePublisherEventArgs.prototype.getPublisher = function() {
    return this._publisher;
  };


  /*<span id='method-fm.websync.basePublisherEventArgs-setPublisher'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the <see cref="fm.websync.basePublisherEventArgs.publisher">fm.websync.basePublisherEventArgs.publisher</see> triggering the event.
  	 </div>
  
  	@function setPublisher
  	@param {fm.websync.publisher} value
  	@return {void}
   */

  basePublisherEventArgs.prototype.setPublisher = function() {
    var value;
    value = arguments[0];
    return this._publisher = value;
  };

  return basePublisherEventArgs;

})(fm.object);



/*<span id='cls-fm.websync.basePublisherResponseEventArgs'>&nbsp;</span> */

/**
@class fm.websync.basePublisherResponseEventArgs
 <div>
 Base arguments for <see cref="fm.websync.publisher">fm.websync.publisher</see> events that occur
 after a response is received.
 </div>

@extends fm.websync.basePublisherEventArgs
 */
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.basePublisherResponseEventArgs = (function(superClass) {
  extend(basePublisherResponseEventArgs, superClass);

  basePublisherResponseEventArgs.prototype._exception = null;

  function basePublisherResponseEventArgs() {
    this.setException = bind(this.setException, this);
    this.getException = bind(this.getException, this);
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = basePublisherResponseEventArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = basePublisherResponseEventArgs.__super__.constructor.call(this);
    return instance;
  }


  /*<span id='method-fm.websync.basePublisherResponseEventArgs-getException'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the exception generated while completing the request, if any.
  	 Will be <c>null</c> if no exception was generated.
  	 </div>
  
  	@function getException
  	@return {Error}
   */

  basePublisherResponseEventArgs.prototype.getException = function() {
    return this._exception;
  };


  /*<span id='method-fm.websync.basePublisherResponseEventArgs-setException'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the exception generated while completing the request, if any.
  	 Will be <c>null</c> if no exception was generated.
  	 </div>
  
  	@function setException
  	@param {Error} value
  	@return {void}
   */

  basePublisherResponseEventArgs.prototype.setException = function() {
    var value;
    value = arguments[0];
    return this._exception = value;
  };

  return basePublisherResponseEventArgs;

})(fm.websync.basePublisherEventArgs);



/*<span id='cls-fm.websync.basePublisherResponseEventArgsGeneric'>&nbsp;</span> */

/**
@class fm.websync.basePublisherResponseEventArgsGeneric
 <div>
 Generic base arguments for <see cref="fm.websync.publisher">fm.websync.publisher</see> events that occur
 after a response is received.
 </div>

@extends fm.websync.basePublisherResponseEventArgs
 */
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.basePublisherResponseEventArgsGeneric = (function(superClass) {
  extend(basePublisherResponseEventArgsGeneric, superClass);

  basePublisherResponseEventArgsGeneric.prototype._requests = null;

  basePublisherResponseEventArgsGeneric.prototype._responses = null;

  function basePublisherResponseEventArgsGeneric() {
    this.setResponses = bind(this.setResponses, this);
    this.setRequests = bind(this.setRequests, this);
    this.getResponses = bind(this.getResponses, this);
    this.getRequests = bind(this.getRequests, this);
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = basePublisherResponseEventArgsGeneric.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = basePublisherResponseEventArgsGeneric.__super__.constructor.call(this);
    return instance;
  }


  /*<span id='method-fm.websync.basePublisherResponseEventArgsGeneric-getRequests'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the requests sent to the server.
  	 </div>
  
  	@function getRequests
  	@return {fm.array}
   */

  basePublisherResponseEventArgsGeneric.prototype.getRequests = function() {
    return this._requests;
  };


  /*<span id='method-fm.websync.basePublisherResponseEventArgsGeneric-getResponses'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the responses received from the server.
  	 </div>
  
  	@function getResponses
  	@return {fm.array}
   */

  basePublisherResponseEventArgsGeneric.prototype.getResponses = function() {
    return this._responses;
  };


  /*<span id='method-fm.websync.basePublisherResponseEventArgsGeneric-setRequests'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the requests sent to the server.
  	 </div>
  
  	@function setRequests
  	@param {fm.array} value
  	@return {void}
   */

  basePublisherResponseEventArgsGeneric.prototype.setRequests = function() {
    var value;
    value = arguments[0];
    return this._requests = value;
  };


  /*<span id='method-fm.websync.basePublisherResponseEventArgsGeneric-setResponses'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the responses received from the server.
  	 </div>
  
  	@function setResponses
  	@param {fm.array} value
  	@return {void}
   */

  basePublisherResponseEventArgsGeneric.prototype.setResponses = function() {
    var value;
    value = arguments[0];
    return this._responses = value;
  };

  return basePublisherResponseEventArgsGeneric;

})(fm.websync.basePublisherResponseEventArgs);



/*<span id='cls-fm.websync.basePublisherRequestEventArgs'>&nbsp;</span> */

/**
@class fm.websync.basePublisherRequestEventArgs
 <div>
 Base arguments for <see cref="fm.websync.publisher">fm.websync.publisher</see> events that occur
 before a request is sent.
 </div>

@extends fm.websync.basePublisherEventArgs
 */
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.basePublisherRequestEventArgs = (function(superClass) {
  extend(basePublisherRequestEventArgs, superClass);

  basePublisherRequestEventArgs.prototype._cancel = false;

  function basePublisherRequestEventArgs() {
    this.setCancel = bind(this.setCancel, this);
    this.getCancel = bind(this.getCancel, this);
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = basePublisherRequestEventArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = basePublisherRequestEventArgs.__super__.constructor.call(this);
    return instance;
  }


  /*<span id='method-fm.websync.basePublisherRequestEventArgs-getCancel'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets whether or not to cancel the request.
  	 If set to <c>true</c>, the request will not be processed.
  	 Defaults to <c>false</c>.
  	 </div>
  
  	@function getCancel
  	@return {Boolean}
   */

  basePublisherRequestEventArgs.prototype.getCancel = function() {
    return this._cancel;
  };


  /*<span id='method-fm.websync.basePublisherRequestEventArgs-setCancel'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets whether or not to cancel the request.
  	 If set to <c>true</c>, the request will not be processed.
  	 Defaults to <c>false</c>.
  	 </div>
  
  	@function setCancel
  	@param {Boolean} value
  	@return {void}
   */

  basePublisherRequestEventArgs.prototype.setCancel = function() {
    var value;
    value = arguments[0];
    return this._cancel = value;
  };

  return basePublisherRequestEventArgs;

})(fm.websync.basePublisherEventArgs);



/*<span id='cls-fm.websync.basePublisherRequestEventArgsGeneric'>&nbsp;</span> */

/**
@class fm.websync.basePublisherRequestEventArgsGeneric
 <div>
 Generic base arguments for <see cref="fm.websync.publisher">fm.websync.publisher</see> events that occur
 before a request is sent.
 </div>

@extends fm.websync.basePublisherRequestEventArgs
 */
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.basePublisherRequestEventArgsGeneric = (function(superClass) {
  extend(basePublisherRequestEventArgsGeneric, superClass);

  basePublisherRequestEventArgsGeneric.prototype._requests = null;

  function basePublisherRequestEventArgsGeneric() {
    this.setRequests = bind(this.setRequests, this);
    this.getRequests = bind(this.getRequests, this);
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = basePublisherRequestEventArgsGeneric.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = basePublisherRequestEventArgsGeneric.__super__.constructor.call(this);
    return instance;
  }


  /*<span id='method-fm.websync.basePublisherRequestEventArgsGeneric-getRequests'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the requests being sent to the server.
  	 </div>
  
  	@function getRequests
  	@return {fm.array}
   */

  basePublisherRequestEventArgsGeneric.prototype.getRequests = function() {
    return this._requests;
  };


  /*<span id='method-fm.websync.basePublisherRequestEventArgsGeneric-setRequests'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the requests being sent to the server.
  	 </div>
  
  	@function setRequests
  	@param {fm.array} value
  	@return {void}
   */

  basePublisherRequestEventArgsGeneric.prototype.setRequests = function() {
    var value;
    value = arguments[0];
    return this._requests = value;
  };

  return basePublisherRequestEventArgsGeneric;

})(fm.websync.basePublisherRequestEventArgs);



/*<span id='cls-fm.websync.baseClientEventArgs'>&nbsp;</span> */

/**
@class fm.websync.baseClientEventArgs
 <div>
 Base arguments for <see cref="fm.websync.baseClientEventArgs.client">fm.websync.baseClientEventArgs.client</see>-triggered events.
 </div>

@extends fm.object
 */
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.baseClientEventArgs = (function(superClass) {
  extend(baseClientEventArgs, superClass);

  baseClientEventArgs.prototype._client = null;

  function baseClientEventArgs() {
    this.setClient = bind(this.setClient, this);
    this.getClient = bind(this.getClient, this);
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = baseClientEventArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = baseClientEventArgs.__super__.constructor.call(this);
    return instance;
  }


  /*<span id='method-fm.websync.baseClientEventArgs-getClient'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the <see cref="fm.websync.baseClientEventArgs.client">fm.websync.baseClientEventArgs.client</see> triggering the event.
  	 </div>
  
  	@function getClient
  	@return {fm.websync.client}
   */

  baseClientEventArgs.prototype.getClient = function() {
    return this._client;
  };


  /*<span id='method-fm.websync.baseClientEventArgs-setClient'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the <see cref="fm.websync.baseClientEventArgs.client">fm.websync.baseClientEventArgs.client</see> triggering the event.
  	 </div>
  
  	@function setClient
  	@param {fm.websync.client} value
  	@return {void}
   */

  baseClientEventArgs.prototype.setClient = function() {
    var value;
    value = arguments[0];
    return this._client = value;
  };

  return baseClientEventArgs;

})(fm.object);



/*<span id='cls-fm.websync.baseClientEndEventArgs'>&nbsp;</span> */

/**
@class fm.websync.baseClientEndEventArgs
 <div>
 Base arguments for <see cref="fm.websync.client">fm.websync.client</see> events that occur
 after a response has been processed.
 </div>

@extends fm.websync.baseClientEventArgs
 */
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.baseClientEndEventArgs = (function(superClass) {
  extend(baseClientEndEventArgs, superClass);

  baseClientEndEventArgs.prototype._exception = null;

  baseClientEndEventArgs.prototype._response = null;

  function baseClientEndEventArgs() {
    this.setResponse = bind(this.setResponse, this);
    this.setException = bind(this.setException, this);
    this.getResponse = bind(this.getResponse, this);
    this.getException = bind(this.getException, this);
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = baseClientEndEventArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = baseClientEndEventArgs.__super__.constructor.call(this);
    return instance;
  }


  /*<span id='method-fm.websync.baseClientEndEventArgs-getException'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the exception generated while completing the request, if any.
  	 Will be <c>null</c> if no exception was generated.
  	 </div>
  
  	@function getException
  	@return {Error}
   */

  baseClientEndEventArgs.prototype.getException = function() {
    return this._exception;
  };


  /*<span id='method-fm.websync.baseClientEndEventArgs-getResponse'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the response received from the server.
  	 </div>
  
  	@function getResponse
  	@return {fm.websync.message}
   */

  baseClientEndEventArgs.prototype.getResponse = function() {
    return this._response;
  };


  /*<span id='method-fm.websync.baseClientEndEventArgs-setException'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the exception generated while completing the request, if any.
  	 Will be <c>null</c> if no exception was generated.
  	 </div>
  
  	@function setException
  	@param {Error} value
  	@return {void}
   */

  baseClientEndEventArgs.prototype.setException = function() {
    var value;
    value = arguments[0];
    return this._exception = value;
  };


  /*<span id='method-fm.websync.baseClientEndEventArgs-setResponse'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the response received from the server.
  	 </div>
  
  	@function setResponse
  	@param {fm.websync.message} value
  	@return {void}
   */

  baseClientEndEventArgs.prototype.setResponse = function() {
    var value;
    value = arguments[0];
    return this._response = value;
  };

  return baseClientEndEventArgs;

})(fm.websync.baseClientEventArgs);



/*<span id='cls-fm.websync.baseClientEndEventArgsGeneric'>&nbsp;</span> */

/**
@class fm.websync.baseClientEndEventArgsGeneric
 <div>
 Generic base arguments for <see cref="fm.websync.client">fm.websync.client</see> events that occur
 after a response has been processed.
 </div>

@extends fm.websync.baseClientEndEventArgs
 */
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.baseClientEndEventArgsGeneric = (function(superClass) {
  extend(baseClientEndEventArgsGeneric, superClass);

  baseClientEndEventArgsGeneric.prototype._methodArgs = null;

  function baseClientEndEventArgsGeneric() {
    this.setMethodArgs = bind(this.setMethodArgs, this);
    this.getMethodArgs = bind(this.getMethodArgs, this);
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = baseClientEndEventArgsGeneric.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = baseClientEndEventArgsGeneric.__super__.constructor.call(this);
    return instance;
  }


  /*<span id='method-fm.websync.baseClientEndEventArgsGeneric-getMethodArgs'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the original arguments passed into the client method.
  	 </div>
  
  	@function getMethodArgs
  	@return {fm.object}
   */

  baseClientEndEventArgsGeneric.prototype.getMethodArgs = function() {
    return this._methodArgs;
  };


  /*<span id='method-fm.websync.baseClientEndEventArgsGeneric-setMethodArgs'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the original arguments passed into the client method.
  	 </div>
  
  	@function setMethodArgs
  	@param {fm.object} value
  	@return {void}
   */

  baseClientEndEventArgsGeneric.prototype.setMethodArgs = function() {
    var value;
    value = arguments[0];
    return this._methodArgs = value;
  };

  return baseClientEndEventArgsGeneric;

})(fm.websync.baseClientEndEventArgs);



/*<span id='cls-fm.websync.baseClientResponseEventArgs'>&nbsp;</span> */

/**
@class fm.websync.baseClientResponseEventArgs
 <div>
 Base arguments for <see cref="fm.websync.client">fm.websync.client</see> events that occur
 after a response is received.
 </div>

@extends fm.websync.baseClientEventArgs
 */
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.baseClientResponseEventArgs = (function(superClass) {
  extend(baseClientResponseEventArgs, superClass);

  baseClientResponseEventArgs.prototype._exception = null;

  baseClientResponseEventArgs.prototype._response = null;

  function baseClientResponseEventArgs() {
    this.setResponse = bind(this.setResponse, this);
    this.setException = bind(this.setException, this);
    this.getResponse = bind(this.getResponse, this);
    this.getException = bind(this.getException, this);
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = baseClientResponseEventArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = baseClientResponseEventArgs.__super__.constructor.call(this);
    return instance;
  }


  /*<span id='method-fm.websync.baseClientResponseEventArgs-getException'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the exception generated while completing the request, if any.
  	 Will be <c>null</c> if no exception was generated.
  	 </div>
  
  	@function getException
  	@return {Error}
   */

  baseClientResponseEventArgs.prototype.getException = function() {
    return this._exception;
  };


  /*<span id='method-fm.websync.baseClientResponseEventArgs-getResponse'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the response received from the server.
  	 </div>
  
  	@function getResponse
  	@return {fm.websync.message}
   */

  baseClientResponseEventArgs.prototype.getResponse = function() {
    return this._response;
  };


  /*<span id='method-fm.websync.baseClientResponseEventArgs-setException'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the exception generated while completing the request, if any.
  	 Will be <c>null</c> if no exception was generated.
  	 </div>
  
  	@function setException
  	@param {Error} value
  	@return {void}
   */

  baseClientResponseEventArgs.prototype.setException = function() {
    var value;
    value = arguments[0];
    return this._exception = value;
  };


  /*<span id='method-fm.websync.baseClientResponseEventArgs-setResponse'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the response received from the server.
  	 </div>
  
  	@function setResponse
  	@param {fm.websync.message} value
  	@return {void}
   */

  baseClientResponseEventArgs.prototype.setResponse = function() {
    var value;
    value = arguments[0];
    return this._response = value;
  };

  return baseClientResponseEventArgs;

})(fm.websync.baseClientEventArgs);



/*<span id='cls-fm.websync.baseClientResponseEventArgsGeneric'>&nbsp;</span> */

/**
@class fm.websync.baseClientResponseEventArgsGeneric
 <div>
 Generic base arguments for <see cref="fm.websync.client">fm.websync.client</see> events that occur
 after a response is received.
 </div>

@extends fm.websync.baseClientResponseEventArgs
 */
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.baseClientResponseEventArgsGeneric = (function(superClass) {
  extend(baseClientResponseEventArgsGeneric, superClass);

  baseClientResponseEventArgsGeneric.prototype._methodArgs = null;

  function baseClientResponseEventArgsGeneric() {
    this.setMethodArgs = bind(this.setMethodArgs, this);
    this.getMethodArgs = bind(this.getMethodArgs, this);
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = baseClientResponseEventArgsGeneric.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = baseClientResponseEventArgsGeneric.__super__.constructor.call(this);
    return instance;
  }


  /*<span id='method-fm.websync.baseClientResponseEventArgsGeneric-getMethodArgs'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the original arguments passed into the client method.
  	 </div>
  
  	@function getMethodArgs
  	@return {fm.object}
   */

  baseClientResponseEventArgsGeneric.prototype.getMethodArgs = function() {
    return this._methodArgs;
  };


  /*<span id='method-fm.websync.baseClientResponseEventArgsGeneric-setMethodArgs'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the original arguments passed into the client method.
  	 </div>
  
  	@function setMethodArgs
  	@param {fm.object} value
  	@return {void}
   */

  baseClientResponseEventArgsGeneric.prototype.setMethodArgs = function() {
    var value;
    value = arguments[0];
    return this._methodArgs = value;
  };

  return baseClientResponseEventArgsGeneric;

})(fm.websync.baseClientResponseEventArgs);



/*<span id='cls-fm.websync.clientNotifyResponseArgs'>&nbsp;</span> */

/**
@class fm.websync.clientNotifyResponseArgs
 <div>
 Arguments for <see cref="fm.websync.client.addOnNotifyResponse">fm.websync.client.addOnNotifyResponse</see>.
 </div>

@extends fm.websync.baseClientResponseEventArgsGeneric
 */
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.clientNotifyResponseArgs = (function(superClass) {
  extend(clientNotifyResponseArgs, superClass);

  function clientNotifyResponseArgs() {
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = clientNotifyResponseArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = clientNotifyResponseArgs.__super__.constructor.call(this);
    return instance;
  }

  return clientNotifyResponseArgs;

})(fm.websync.baseClientResponseEventArgsGeneric);



/*<span id='cls-fm.websync.baseServerArgs'>&nbsp;</span> */

/**
@class fm.websync.baseServerArgs
 <div>
 Base arguments for <see cref="fm.websync.connectArgs">fm.websync.connectArgs</see> "OnServer" callbacks.
 </div>

@extends fm.websync.baseOutputArgs
 */
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.baseServerArgs = (function(superClass) {
  extend(baseServerArgs, superClass);

  function baseServerArgs() {
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = baseServerArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = baseServerArgs.__super__.constructor.call(this);
    return instance;
  }

  return baseServerArgs;

})(fm.websync.baseOutputArgs);



/*<span id='cls-fm.websync.baseSuccessArgs'>&nbsp;</span> */

/**
@class fm.websync.baseSuccessArgs
 <div>
 Base arguments for <see cref="fm.websync.client">fm.websync.client</see> "OnSuccess" callbacks.
 </div>

@extends fm.websync.baseOutputArgs
 */
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.baseSuccessArgs = (function(superClass) {
  extend(baseSuccessArgs, superClass);

  function baseSuccessArgs() {
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = baseSuccessArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = baseSuccessArgs.__super__.constructor.call(this);
    return instance;
  }

  return baseSuccessArgs;

})(fm.websync.baseOutputArgs);



/*<span id='cls-fm.websync.baseReceiveArgs'>&nbsp;</span> */

/**
@class fm.websync.baseReceiveArgs
 <div>
 Arguments for <see cref="fm.websync.subscribeArgs.onReceive">fm.websync.subscribeArgs.onReceive</see>.
 </div>

@extends fm.websync.baseSuccessArgs
 */
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.baseReceiveArgs = (function(superClass) {
  extend(baseReceiveArgs, superClass);

  baseReceiveArgs.prototype.__connectionType = null;

  baseReceiveArgs.prototype.__dataBytes = null;

  baseReceiveArgs.prototype.__dataJson = null;

  baseReceiveArgs.prototype._reconnectAfter = 0;


  /*<span id='method-fm.websync.baseReceiveArgs-fm.websync.baseReceiveArgs'>&nbsp;</span> */


  /**
  	 <div>
  	 Initializes a new instance of the <see cref="fm.websync.baseReceiveArgs">fm.websync.baseReceiveArgs</see> class.
  	 </div>
  	@function fm.websync.baseReceiveArgs
  	@param {String} dataJson The data in JSON format.
  	@param {fm.array} dataBytes The data in binary format.
  	@param {fm.websync.connectionType} connectionType The current connection type.
  	@param {Integer} reconnectAfter The amount of time in milliseconds to pause before reconnecting to the server.
  	@return {}
   */

  function baseReceiveArgs() {
    this.getData = bind(this.getData, this);
    this.setReconnectAfter = bind(this.setReconnectAfter, this);
    this.getTag = bind(this.getTag, this);
    this.getReconnectAfter = bind(this.getReconnectAfter, this);
    this.getIsBinary = bind(this.getIsBinary, this);
    this.getDataJson = bind(this.getDataJson, this);
    this.getDataBytes = bind(this.getDataBytes, this);
    this.getConnectionType = bind(this.getConnectionType, this);
    var connectionType, dataBytes, dataJson, instance, reconnectAfter;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = baseReceiveArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    dataJson = arguments[0];
    dataBytes = arguments[1];
    connectionType = arguments[2];
    reconnectAfter = arguments[3];
    instance = baseReceiveArgs.__super__.constructor.call(this);
    this.__dataJson = dataJson;
    this.__dataBytes = dataBytes;
    this.__connectionType = connectionType;
    this.setReconnectAfter(reconnectAfter);
    return instance;
  }


  /*<span id='method-fm.websync.baseReceiveArgs-getConnectionType'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the current connection type.
  	 </div>
  
  	@function getConnectionType
  	@return {fm.websync.connectionType}
   */

  baseReceiveArgs.prototype.getConnectionType = function() {
    return this.__connectionType;
  };


  /*<span id='method-fm.websync.baseReceiveArgs-getDataBytes'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the data that was sent in binary format.
  	 </div>
  
  	@function getDataBytes
  	@return {fm.array}
   */

  baseReceiveArgs.prototype.getDataBytes = function() {
    var _var0, _var1, decoded, valueJson;
    decoded = this.__dataBytes;
    valueJson = this.__dataJson;
    if (!fm.global.equals(decoded, null)) {
      return decoded;
    }
    if (!fm.global.equals(valueJson, null)) {
      _var0 = new fm.holder(decoded);
      _var1 = fm.crypto.tryBase64Decode(fm.serializer.deserializeString(valueJson), _var0);
      decoded = _var0.getValue();
      if (!_var1) {
        decoded = null;
      }
      this.__dataBytes = decoded;
      return decoded;
    }
    return null;
  };


  /*<span id='method-fm.websync.baseReceiveArgs-getDataJson'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the data that was sent in JSON format.
  	 </div>
  
  	@function getDataJson
  	@return {String}
   */

  baseReceiveArgs.prototype.getDataJson = function() {
    var b, str;
    str = this.__dataJson;
    b = this.__dataBytes;
    if (!fm.global.equals(str, null)) {
      return str;
    }
    if (!fm.global.equals(b, null)) {
      str = fm.serializer.serializeString(fm.crypto.base64Encode(b));
      this.__dataJson = str;
      return str;
    }
    return null;
  };


  /*<span id='method-fm.websync.baseReceiveArgs-getIsBinary'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets whether or not the data is binary.
  	 </div>
  
  	@function getIsBinary
  	@return {Boolean}
   */

  baseReceiveArgs.prototype.getIsBinary = function() {
    return !fm.global.equals(this.getDataBytes(), null);
  };


  /*<span id='method-fm.websync.baseReceiveArgs-getReconnectAfter'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the amount of time in milliseconds to pause
  	 before reconnecting to the server.
  	 </div>
  
  	@function getReconnectAfter
  	@return {Integer}
   */

  baseReceiveArgs.prototype.getReconnectAfter = function() {
    return this._reconnectAfter;
  };


  /*<span id='method-fm.websync.baseReceiveArgs-getTag'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the tag that identifies the contents of the payload.
  	 </div>
  
  	@function getTag
  	@return {String}
   */

  baseReceiveArgs.prototype.getTag = function() {
    return fm.serializer.deserializeString(this.getExtensionValueJson("fm.tag"));
  };


  /*<span id='method-fm.websync.baseReceiveArgs-setReconnectAfter'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the amount of time in milliseconds to pause
  	 before reconnecting to the server.
  	 </div>
  
  	@function setReconnectAfter
  	@param {Integer} value
  	@return {void}
   */

  baseReceiveArgs.prototype.setReconnectAfter = function() {
    var value;
    value = arguments[0];
    return this._reconnectAfter = value;
  };

  baseReceiveArgs.prototype.getData = function() {
    return fm.json.deserialize(this.getDataJson.apply(this, arguments));
  };

  return baseReceiveArgs;

})(fm.websync.baseSuccessArgs);



/*<span id='cls-fm.websync.baseClientRequestEventArgs'>&nbsp;</span> */

/**
@class fm.websync.baseClientRequestEventArgs
 <div>
 Base arguments for <see cref="fm.websync.client">fm.websync.client</see> events that occur
 before a request is sent.
 </div>

@extends fm.websync.baseClientEventArgs
 */
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.baseClientRequestEventArgs = (function(superClass) {
  extend(baseClientRequestEventArgs, superClass);

  baseClientRequestEventArgs.prototype._cancel = false;

  function baseClientRequestEventArgs() {
    this.setCancel = bind(this.setCancel, this);
    this.getCancel = bind(this.getCancel, this);
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = baseClientRequestEventArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = baseClientRequestEventArgs.__super__.constructor.call(this);
    return instance;
  }


  /*<span id='method-fm.websync.baseClientRequestEventArgs-getCancel'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets whether or not to cancel the request.
  	 If set to <c>true</c>, the request will not be processed.
  	 Defaults to <c>false</c>.
  	 </div>
  
  	@function getCancel
  	@return {Boolean}
   */

  baseClientRequestEventArgs.prototype.getCancel = function() {
    return this._cancel;
  };


  /*<span id='method-fm.websync.baseClientRequestEventArgs-setCancel'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets whether or not to cancel the request.
  	 If set to <c>true</c>, the request will not be processed.
  	 Defaults to <c>false</c>.
  	 </div>
  
  	@function setCancel
  	@param {Boolean} value
  	@return {void}
   */

  baseClientRequestEventArgs.prototype.setCancel = function() {
    var value;
    value = arguments[0];
    return this._cancel = value;
  };

  return baseClientRequestEventArgs;

})(fm.websync.baseClientEventArgs);



/*<span id='cls-fm.websync.baseClientRequestEventArgsGeneric'>&nbsp;</span> */

/**
@class fm.websync.baseClientRequestEventArgsGeneric
 <div>
 Generic base arguments for <see cref="fm.websync.client">fm.websync.client</see> events that occur
 before a request is sent.
 </div>

@extends fm.websync.baseClientRequestEventArgs
 */
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.baseClientRequestEventArgsGeneric = (function(superClass) {
  extend(baseClientRequestEventArgsGeneric, superClass);

  baseClientRequestEventArgsGeneric.prototype._methodArgs = null;

  function baseClientRequestEventArgsGeneric() {
    this.setMethodArgs = bind(this.setMethodArgs, this);
    this.getMethodArgs = bind(this.getMethodArgs, this);
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = baseClientRequestEventArgsGeneric.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = baseClientRequestEventArgsGeneric.__super__.constructor.call(this);
    return instance;
  }


  /*<span id='method-fm.websync.baseClientRequestEventArgsGeneric-getMethodArgs'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the original arguments passed into the client method.
  	 </div>
  
  	@function getMethodArgs
  	@return {fm.object}
   */

  baseClientRequestEventArgsGeneric.prototype.getMethodArgs = function() {
    return this._methodArgs;
  };


  /*<span id='method-fm.websync.baseClientRequestEventArgsGeneric-setMethodArgs'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the original arguments passed into the client method.
  	 </div>
  
  	@function setMethodArgs
  	@param {fm.object} value
  	@return {void}
   */

  baseClientRequestEventArgsGeneric.prototype.setMethodArgs = function() {
    var value;
    value = arguments[0];
    return this._methodArgs = value;
  };

  return baseClientRequestEventArgsGeneric;

})(fm.websync.baseClientRequestEventArgs);



/*<span id='cls-fm.websync.clientNotifyRequestArgs'>&nbsp;</span> */

/**
@class fm.websync.clientNotifyRequestArgs
 <div>
 Arguments for <see cref="fm.websync.client.addOnNotifyRequest">fm.websync.client.addOnNotifyRequest</see>.
 </div>

@extends fm.websync.baseClientRequestEventArgsGeneric
 */
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.clientNotifyRequestArgs = (function(superClass) {
  extend(clientNotifyRequestArgs, superClass);

  function clientNotifyRequestArgs() {
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = clientNotifyRequestArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = clientNotifyRequestArgs.__super__.constructor.call(this);
    return instance;
  }

  return clientNotifyRequestArgs;

})(fm.websync.baseClientRequestEventArgsGeneric);



/*<span id='cls-fm.websync.clientSubscribeEndArgs'>&nbsp;</span> */

/**
@class fm.websync.clientSubscribeEndArgs
 <div>
 Arguments for <see cref="fm.websync.client.addOnSubscribeEnd">fm.websync.client.addOnSubscribeEnd</see>.
 </div>

@extends fm.websync.baseClientEndEventArgsGeneric
 */
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.clientSubscribeEndArgs = (function(superClass) {
  extend(clientSubscribeEndArgs, superClass);

  function clientSubscribeEndArgs() {
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = clientSubscribeEndArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = clientSubscribeEndArgs.__super__.constructor.call(this);
    return instance;
  }

  return clientSubscribeEndArgs;

})(fm.websync.baseClientEndEventArgsGeneric);



/*<span id='cls-fm.websync.clientBindEndArgs'>&nbsp;</span> */

/**
@class fm.websync.clientBindEndArgs
 <div>
 Arguments for <see cref="fm.websync.client.addOnBindEnd">fm.websync.client.addOnBindEnd</see>.
 </div>

@extends fm.websync.baseClientEndEventArgsGeneric
 */
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.clientBindEndArgs = (function(superClass) {
  extend(clientBindEndArgs, superClass);

  function clientBindEndArgs() {
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = clientBindEndArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = clientBindEndArgs.__super__.constructor.call(this);
    return instance;
  }

  return clientBindEndArgs;

})(fm.websync.baseClientEndEventArgsGeneric);



/*<span id='cls-fm.websync.clientConnectEndArgs'>&nbsp;</span> */

/**
@class fm.websync.clientConnectEndArgs
 <div>
 Arguments for <see cref="fm.websync.client.addOnConnectEnd">fm.websync.client.addOnConnectEnd</see>.
 </div>

@extends fm.websync.baseClientEndEventArgsGeneric
 */
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.clientConnectEndArgs = (function(superClass) {
  extend(clientConnectEndArgs, superClass);

  function clientConnectEndArgs() {
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = clientConnectEndArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = clientConnectEndArgs.__super__.constructor.call(this);
    return instance;
  }

  return clientConnectEndArgs;

})(fm.websync.baseClientEndEventArgsGeneric);



/*<span id='cls-fm.websync.clientDisconnectEndArgs'>&nbsp;</span> */

/**
@class fm.websync.clientDisconnectEndArgs
 <div>
 Arguments for <see cref="fm.websync.client.addOnDisconnectEnd">fm.websync.client.addOnDisconnectEnd</see>.
 </div>

@extends fm.websync.baseClientEndEventArgsGeneric
 */
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.clientDisconnectEndArgs = (function(superClass) {
  extend(clientDisconnectEndArgs, superClass);

  function clientDisconnectEndArgs() {
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = clientDisconnectEndArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = clientDisconnectEndArgs.__super__.constructor.call(this);
    return instance;
  }

  return clientDisconnectEndArgs;

})(fm.websync.baseClientEndEventArgsGeneric);



/*<span id='cls-fm.websync.clientNotifyEndArgs'>&nbsp;</span> */

/**
@class fm.websync.clientNotifyEndArgs
 <div>
 Arguments for <see cref="fm.websync.client.addOnNotifyEnd">fm.websync.client.addOnNotifyEnd</see>.
 </div>

@extends fm.websync.baseClientEndEventArgsGeneric
 */
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.clientNotifyEndArgs = (function(superClass) {
  extend(clientNotifyEndArgs, superClass);

  function clientNotifyEndArgs() {
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = clientNotifyEndArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = clientNotifyEndArgs.__super__.constructor.call(this);
    return instance;
  }

  return clientNotifyEndArgs;

})(fm.websync.baseClientEndEventArgsGeneric);



/*<span id='cls-fm.websync.clientPublishEndArgs'>&nbsp;</span> */

/**
@class fm.websync.clientPublishEndArgs
 <div>
 Arguments for <see cref="fm.websync.client.addOnPublishEnd">fm.websync.client.addOnPublishEnd</see>.
 </div>

@extends fm.websync.baseClientEndEventArgsGeneric
 */
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.clientPublishEndArgs = (function(superClass) {
  extend(clientPublishEndArgs, superClass);

  function clientPublishEndArgs() {
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = clientPublishEndArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = clientPublishEndArgs.__super__.constructor.call(this);
    return instance;
  }

  return clientPublishEndArgs;

})(fm.websync.baseClientEndEventArgsGeneric);



/*<span id='cls-fm.websync.clientServiceEndArgs'>&nbsp;</span> */

/**
@class fm.websync.clientServiceEndArgs
 <div>
 Arguments for <see cref="fm.websync.client.addOnServiceEnd">fm.websync.client.addOnServiceEnd</see>.
 </div>

@extends fm.websync.baseClientEndEventArgsGeneric
 */
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.clientServiceEndArgs = (function(superClass) {
  extend(clientServiceEndArgs, superClass);

  function clientServiceEndArgs() {
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = clientServiceEndArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = clientServiceEndArgs.__super__.constructor.call(this);
    return instance;
  }

  return clientServiceEndArgs;

})(fm.websync.baseClientEndEventArgsGeneric);



/*<span id='cls-fm.websync.clientUnbindEndArgs'>&nbsp;</span> */

/**
@class fm.websync.clientUnbindEndArgs
 <div>
 Arguments for <see cref="fm.websync.client.addOnUnbindEnd">fm.websync.client.addOnUnbindEnd</see>.
 </div>

@extends fm.websync.baseClientEndEventArgsGeneric
 */
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.clientUnbindEndArgs = (function(superClass) {
  extend(clientUnbindEndArgs, superClass);

  function clientUnbindEndArgs() {
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = clientUnbindEndArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = clientUnbindEndArgs.__super__.constructor.call(this);
    return instance;
  }

  return clientUnbindEndArgs;

})(fm.websync.baseClientEndEventArgsGeneric);



/*<span id='cls-fm.websync.clientUnsubscribeEndArgs'>&nbsp;</span> */

/**
@class fm.websync.clientUnsubscribeEndArgs
 <div>
 Arguments for <see cref="fm.websync.client.addOnUnsubscribeEnd">fm.websync.client.addOnUnsubscribeEnd</see>.
 </div>

@extends fm.websync.baseClientEndEventArgsGeneric
 */
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.clientUnsubscribeEndArgs = (function(superClass) {
  extend(clientUnsubscribeEndArgs, superClass);

  function clientUnsubscribeEndArgs() {
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = clientUnsubscribeEndArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = clientUnsubscribeEndArgs.__super__.constructor.call(this);
    return instance;
  }

  return clientUnsubscribeEndArgs;

})(fm.websync.baseClientEndEventArgsGeneric);



/*<span id='cls-fm.websync.publisherServiceRequestArgs'>&nbsp;</span> */

/**
@class fm.websync.publisherServiceRequestArgs
 <div>
 Arguments for <see cref="fm.websync.publisher.addOnServiceRequest">fm.websync.publisher.addOnServiceRequest</see>.
 </div>

@extends fm.websync.basePublisherRequestEventArgsGeneric
 */
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.publisherServiceRequestArgs = (function(superClass) {
  extend(publisherServiceRequestArgs, superClass);

  function publisherServiceRequestArgs() {
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = publisherServiceRequestArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = publisherServiceRequestArgs.__super__.constructor.call(this);
    return instance;
  }

  return publisherServiceRequestArgs;

})(fm.websync.basePublisherRequestEventArgsGeneric);



/*<span id='cls-fm.websync.publisherServiceResponseArgs'>&nbsp;</span> */

/**
@class fm.websync.publisherServiceResponseArgs
 <div>
 Arguments for <see cref="fm.websync.publisher.addOnServiceResponse">fm.websync.publisher.addOnServiceResponse</see>.
 </div>

@extends fm.websync.basePublisherResponseEventArgsGeneric
 */
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.publisherServiceResponseArgs = (function(superClass) {
  extend(publisherServiceResponseArgs, superClass);

  function publisherServiceResponseArgs() {
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = publisherServiceResponseArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = publisherServiceResponseArgs.__super__.constructor.call(this);
    return instance;
  }

  return publisherServiceResponseArgs;

})(fm.websync.basePublisherResponseEventArgsGeneric);



/*<span id='cls-fm.websync.stateRestoredArgs'>&nbsp;</span> */

/**
@class fm.websync.stateRestoredArgs
 <div>
 Arguments for <see cref="fm.websync.connectArgs.onStateRestored">fm.websync.connectArgs.onStateRestored</see>.
 </div>

@extends fm.websync.baseSuccessArgs
 */
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.stateRestoredArgs = (function(superClass) {
  extend(stateRestoredArgs, superClass);

  function stateRestoredArgs() {
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = stateRestoredArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = stateRestoredArgs.__super__.constructor.call(this);
    return instance;
  }

  return stateRestoredArgs;

})(fm.websync.baseSuccessArgs);



/*<span id='cls-fm.websync.notifyReceiveArgs'>&nbsp;</span> */

/**
@class fm.websync.notifyReceiveArgs
 <div>
 Arguments for <see cref="fm.websync.client.addOnNotify">fm.websync.client.addOnNotify</see>.
 </div>

@extends fm.websync.baseReceiveArgs
 */
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.notifyReceiveArgs = (function(superClass) {
  extend(notifyReceiveArgs, superClass);


  /*<span id='method-fm.websync.notifyReceiveArgs-fm.websync.notifyReceiveArgs'>&nbsp;</span> */


  /**
  	 <div>
  	 Initializes a new instance of the <see cref="fm.websync.notifyReceiveArgs">fm.websync.notifyReceiveArgs</see> class.
  	 </div>
  	@function fm.websync.notifyReceiveArgs
  	@param {String} dataJson The data in JSON format.
  	@param {fm.array} dataBytes The data in binary format.
  	@param {fm.websync.connectionType} connectionType The current connection type.
  	@param {Integer} reconnectAfter The amount of time in milliseconds to pause before reconnecting to the server.
  	@return {}
   */

  function notifyReceiveArgs() {
    this.getWasSentByMe = bind(this.getWasSentByMe, this);
    this.getNotifyingClient = bind(this.getNotifyingClient, this);
    var connectionType, dataBytes, dataJson, instance, reconnectAfter;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = notifyReceiveArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    dataJson = arguments[0];
    dataBytes = arguments[1];
    connectionType = arguments[2];
    reconnectAfter = arguments[3];
    instance = notifyReceiveArgs.__super__.constructor.call(this, dataJson, dataBytes, connectionType, reconnectAfter);
    return instance;
  }


  /*<span id='method-fm.websync.notifyReceiveArgs-getNotifyingClient'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets details about the client sending the notification.
  	 </div>
  
  	@function getNotifyingClient
  	@return {fm.websync.notifyingClient}
   */

  notifyReceiveArgs.prototype.getNotifyingClient = function() {
    return fm.websync.notifyingClient.fromJson(this.getExtensionValueJson("fm.notifying"));
  };


  /*<span id='method-fm.websync.notifyReceiveArgs-getWasSentByMe'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets whether the data was sent by the current client.
  	 </div>
  
  	@function getWasSentByMe
  	@return {Boolean}
   */

  notifyReceiveArgs.prototype.getWasSentByMe = function() {
    return (((!fm.global.equals(this.getNotifyingClient(), null)) && (!fm.global.equals(this.getClient(), null))) && (this.getNotifyingClient().getClientId() !== null)) && (fm.guid.equals(this.getNotifyingClient().getClientId(), this.getClient().getClientId()));
  };

  return notifyReceiveArgs;

})(fm.websync.baseReceiveArgs);



/*<span id='cls-fm.websync.serverSubscribeArgs'>&nbsp;</span> */

/**
@class fm.websync.serverSubscribeArgs
 <div>
 Arguments for <see cref="fm.websync.client.addOnServerSubscribe">fm.websync.client.addOnServerSubscribe</see>.
 </div>

@extends fm.websync.baseSuccessArgs
 */
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.serverSubscribeArgs = (function(superClass) {
  extend(serverSubscribeArgs, superClass);

  serverSubscribeArgs.prototype.__channels = null;

  function serverSubscribeArgs() {
    this.getTag = bind(this.getTag, this);
    this.getChannels = bind(this.getChannels, this);
    this.getChannel = bind(this.getChannel, this);
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = serverSubscribeArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = serverSubscribeArgs.__super__.constructor.call(this);
    return instance;
  }


  /*<span id='method-fm.websync.serverSubscribeArgs-getChannel'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the channel to which the client was subscribed.
  	 Must start with a forward slash (/).
  	 Overrides <see cref="fm.websync.serverSubscribeArgs.channels">fm.websync.serverSubscribeArgs.channels</see>.
  	 </div>
  
  	@function getChannel
  	@return {String}
   */

  serverSubscribeArgs.prototype.getChannel = function() {
    return fm.websync.extensible.sharedGetChannel(this.__channels);
  };


  /*<span id='method-fm.websync.serverSubscribeArgs-getChannels'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the channels to which the client was subscribed.
  	 Each must start with a forward slash (/).
  	 Overrides <see cref="fm.websync.serverSubscribeArgs.channel">fm.websync.serverSubscribeArgs.channel</see>.
  	 </div>
  
  	@function getChannels
  	@return {fm.array}
   */

  serverSubscribeArgs.prototype.getChannels = function() {
    return fm.websync.extensible.sharedGetChannels(this.__channels);
  };


  /*<span id='method-fm.websync.serverSubscribeArgs-getTag'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the tag associated with the subscribe request.
  	 </div>
  
  	@function getTag
  	@return {String}
   */

  serverSubscribeArgs.prototype.getTag = function() {
    var ref;
    return (ref = fm.serializer.deserializeString(this.getExtensionValueJson("fm.tag"))) != null ? ref : fm.stringExtensions.empty;
  };

  return serverSubscribeArgs;

})(fm.websync.baseSuccessArgs);



/*<span id='cls-fm.websync.serverUnsubscribeArgs'>&nbsp;</span> */

/**
@class fm.websync.serverUnsubscribeArgs
 <div>
 Arguments for <see cref="fm.websync.client.addOnServerUnsubscribe">fm.websync.client.addOnServerUnsubscribe</see>.
 </div>

@extends fm.websync.baseSuccessArgs
 */
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.serverUnsubscribeArgs = (function(superClass) {
  extend(serverUnsubscribeArgs, superClass);

  serverUnsubscribeArgs.prototype.__channels = null;

  function serverUnsubscribeArgs() {
    this.getTag = bind(this.getTag, this);
    this.getChannels = bind(this.getChannels, this);
    this.getChannel = bind(this.getChannel, this);
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = serverUnsubscribeArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = serverUnsubscribeArgs.__super__.constructor.call(this);
    return instance;
  }


  /*<span id='method-fm.websync.serverUnsubscribeArgs-getChannel'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the channel from which the client was unsubscribed.
  	 Must start with a forward slash (/).
  	 Overrides <see cref="fm.websync.serverUnsubscribeArgs.channels">fm.websync.serverUnsubscribeArgs.channels</see>.
  	 </div>
  
  	@function getChannel
  	@return {String}
   */

  serverUnsubscribeArgs.prototype.getChannel = function() {
    return fm.websync.extensible.sharedGetChannel(this.__channels);
  };


  /*<span id='method-fm.websync.serverUnsubscribeArgs-getChannels'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the channels from which the client was unsubscribed.
  	 Each must start with a forward slash (/).
  	 Overrides <see cref="fm.websync.serverUnsubscribeArgs.channel">fm.websync.serverUnsubscribeArgs.channel</see>.
  	 </div>
  
  	@function getChannels
  	@return {fm.array}
   */

  serverUnsubscribeArgs.prototype.getChannels = function() {
    return fm.websync.extensible.sharedGetChannels(this.__channels);
  };


  /*<span id='method-fm.websync.serverUnsubscribeArgs-getTag'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the tag associated with the unsubscribe request.
  	 </div>
  
  	@function getTag
  	@return {String}
   */

  serverUnsubscribeArgs.prototype.getTag = function() {
    var ref;
    return (ref = fm.serializer.deserializeString(this.getExtensionValueJson("fm.tag"))) != null ? ref : fm.stringExtensions.empty;
  };

  return serverUnsubscribeArgs;

})(fm.websync.baseSuccessArgs);



/*<span id='cls-fm.websync.serverUnbindArgs'>&nbsp;</span> */

/**
@class fm.websync.serverUnbindArgs
 <div>
 Arguments for <see cref="fm.websync.client.addOnServerUnbind">fm.websync.client.addOnServerUnbind</see>.
 </div>

@extends fm.websync.baseSuccessArgs
 */
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.serverUnbindArgs = (function(superClass) {
  extend(serverUnbindArgs, superClass);

  serverUnbindArgs.prototype.__records = null;

  function serverUnbindArgs() {
    this.getRecords = bind(this.getRecords, this);
    this.getRecord = bind(this.getRecord, this);
    this.getKeys = bind(this.getKeys, this);
    this.getKey = bind(this.getKey, this);
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = serverUnbindArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = serverUnbindArgs.__super__.constructor.call(this);
    return instance;
  }


  /*<span id='method-fm.websync.serverUnbindArgs-getKey'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the record key from which the client was unbound.
  	 Overrides <see cref="fm.websync.serverUnbindArgs.keys">fm.websync.serverUnbindArgs.keys</see>, <see cref="fm.websync.serverUnbindArgs.record">fm.websync.serverUnbindArgs.record</see>, and <see cref="fm.websync.serverUnbindArgs.records">fm.websync.serverUnbindArgs.records</see>.
  	 </div>
  
  	@function getKey
  	@return {String}
   */

  serverUnbindArgs.prototype.getKey = function() {
    return fm.websync.extensible.sharedGetKey(this.__records);
  };


  /*<span id='method-fm.websync.serverUnbindArgs-getKeys'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the record keys from which the client was unbound.
  	 Overrides <see cref="fm.websync.serverUnbindArgs.key">fm.websync.serverUnbindArgs.key</see>, <see cref="fm.websync.serverUnbindArgs.record">fm.websync.serverUnbindArgs.record</see>, and <see cref="fm.websync.serverUnbindArgs.records">fm.websync.serverUnbindArgs.records</see>.
  	 </div>
  
  	@function getKeys
  	@return {fm.array}
   */

  serverUnbindArgs.prototype.getKeys = function() {
    return fm.websync.extensible.sharedGetKeys(this.__records);
  };


  /*<span id='method-fm.websync.serverUnbindArgs-getRecord'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the record from which the client was unbound.
  	 Overrides <see cref="fm.websync.serverUnbindArgs.records">fm.websync.serverUnbindArgs.records</see>, <see cref="fm.websync.serverUnbindArgs.key">fm.websync.serverUnbindArgs.key</see>, and <see cref="fm.websync.serverUnbindArgs.keys">fm.websync.serverUnbindArgs.keys</see>.
  	 </div>
  
  	@function getRecord
  	@return {fm.websync.record}
   */

  serverUnbindArgs.prototype.getRecord = function() {
    return fm.websync.extensible.sharedGetRecord(this.__records);
  };


  /*<span id='method-fm.websync.serverUnbindArgs-getRecords'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the records from which the client was unbound.
  	 Overrides <see cref="fm.websync.serverUnbindArgs.record">fm.websync.serverUnbindArgs.record</see>, <see cref="fm.websync.serverUnbindArgs.key">fm.websync.serverUnbindArgs.key</see>, and <see cref="fm.websync.serverUnbindArgs.keys">fm.websync.serverUnbindArgs.keys</see>.
  	 </div>
  
  	@function getRecords
  	@return {fm.array}
   */

  serverUnbindArgs.prototype.getRecords = function() {
    return fm.websync.extensible.sharedGetRecords(this.__records);
  };

  return serverUnbindArgs;

})(fm.websync.baseSuccessArgs);



/*<span id='cls-fm.websync.serverBindArgs'>&nbsp;</span> */

/**
@class fm.websync.serverBindArgs
 <div>
 Arguments for <see cref="fm.websync.client.addOnServerBind">fm.websync.client.addOnServerBind</see>.
 </div>

@extends fm.websync.baseServerArgs
 */
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.serverBindArgs = (function(superClass) {
  extend(serverBindArgs, superClass);

  serverBindArgs.prototype.__records = null;

  function serverBindArgs() {
    this.getRecords = bind(this.getRecords, this);
    this.getRecord = bind(this.getRecord, this);
    this.getKeys = bind(this.getKeys, this);
    this.getKey = bind(this.getKey, this);
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = serverBindArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = serverBindArgs.__super__.constructor.call(this);
    return instance;
  }


  /*<span id='method-fm.websync.serverBindArgs-getKey'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the record key to which the client was bound.
  	 Overrides <see cref="fm.websync.serverBindArgs.keys">fm.websync.serverBindArgs.keys</see>, <see cref="fm.websync.serverBindArgs.record">fm.websync.serverBindArgs.record</see>, and <see cref="fm.websync.serverBindArgs.records">fm.websync.serverBindArgs.records</see>.
  	 </div>
  
  	@function getKey
  	@return {String}
   */

  serverBindArgs.prototype.getKey = function() {
    return fm.websync.extensible.sharedGetKey(this.__records);
  };


  /*<span id='method-fm.websync.serverBindArgs-getKeys'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the record keys to which the client was bound.
  	 Overrides <see cref="fm.websync.serverBindArgs.key">fm.websync.serverBindArgs.key</see>, <see cref="fm.websync.serverBindArgs.record">fm.websync.serverBindArgs.record</see>, and <see cref="fm.websync.serverBindArgs.records">fm.websync.serverBindArgs.records</see>.
  	 </div>
  
  	@function getKeys
  	@return {fm.array}
   */

  serverBindArgs.prototype.getKeys = function() {
    return fm.websync.extensible.sharedGetKeys(this.__records);
  };


  /*<span id='method-fm.websync.serverBindArgs-getRecord'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the record to which the client was bound.
  	 Overrides <see cref="fm.websync.serverBindArgs.records">fm.websync.serverBindArgs.records</see>, <see cref="fm.websync.serverBindArgs.key">fm.websync.serverBindArgs.key</see>, and <see cref="fm.websync.serverBindArgs.keys">fm.websync.serverBindArgs.keys</see>.
  	 </div>
  
  	@function getRecord
  	@return {fm.websync.record}
   */

  serverBindArgs.prototype.getRecord = function() {
    return fm.websync.extensible.sharedGetRecord(this.__records);
  };


  /*<span id='method-fm.websync.serverBindArgs-getRecords'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the records to which the client was bound.
  	 Overrides <see cref="fm.websync.serverBindArgs.record">fm.websync.serverBindArgs.record</see>, <see cref="fm.websync.serverBindArgs.key">fm.websync.serverBindArgs.key</see>, and <see cref="fm.websync.serverBindArgs.keys">fm.websync.serverBindArgs.keys</see>.
  	 </div>
  
  	@function getRecords
  	@return {fm.array}
   */

  serverBindArgs.prototype.getRecords = function() {
    return fm.websync.extensible.sharedGetRecords(this.__records);
  };

  return serverBindArgs;

})(fm.websync.baseServerArgs);



/*<span id='cls-fm.websync.messageRequestCreatedArgs'>&nbsp;</span> */

/**
@class fm.websync.messageRequestCreatedArgs
 <div>
 Arguments passed into callbacks when a message request is created.
 </div>

@extends fm.object
 */
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.messageRequestCreatedArgs = (function(superClass) {
  extend(messageRequestCreatedArgs, superClass);

  messageRequestCreatedArgs.prototype._requests = null;

  messageRequestCreatedArgs.prototype._sender = null;

  function messageRequestCreatedArgs() {
    this.setSender = bind(this.setSender, this);
    this.setRequests = bind(this.setRequests, this);
    this.getSender = bind(this.getSender, this);
    this.getRequests = bind(this.getRequests, this);
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = messageRequestCreatedArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = messageRequestCreatedArgs.__super__.constructor.call(this);
    return instance;
  }


  /*<span id='method-fm.websync.messageRequestCreatedArgs-getRequests'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the outgoing messages about to be sent to the server.
  	 </div>
  
  	@function getRequests
  	@return {fm.array}
   */

  messageRequestCreatedArgs.prototype.getRequests = function() {
    return this._requests;
  };


  /*<span id='method-fm.websync.messageRequestCreatedArgs-getSender'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the sender of the request, either a client or publisher.
  	 </div>
  
  	@function getSender
  	@return {fm.object}
   */

  messageRequestCreatedArgs.prototype.getSender = function() {
    return this._sender;
  };

  messageRequestCreatedArgs.prototype.setRequests = function() {
    var value;
    value = arguments[0];
    return this._requests = value;
  };

  messageRequestCreatedArgs.prototype.setSender = function() {
    var value;
    value = arguments[0];
    return this._sender = value;
  };

  return messageRequestCreatedArgs;

})(fm.object);



/*<span id='cls-fm.websync.messageResponseReceivedArgs'>&nbsp;</span> */

/**
@class fm.websync.messageResponseReceivedArgs
 <div>
 Arguments passed into callbacks when a message response is created.
 </div>

@extends fm.object
 */
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.messageResponseReceivedArgs = (function(superClass) {
  extend(messageResponseReceivedArgs, superClass);

  messageResponseReceivedArgs.prototype._responses = null;

  messageResponseReceivedArgs.prototype._sender = null;

  function messageResponseReceivedArgs() {
    this.setSender = bind(this.setSender, this);
    this.setResponses = bind(this.setResponses, this);
    this.getSender = bind(this.getSender, this);
    this.getResponses = bind(this.getResponses, this);
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = messageResponseReceivedArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = messageResponseReceivedArgs.__super__.constructor.call(this);
    return instance;
  }


  /*<span id='method-fm.websync.messageResponseReceivedArgs-getResponses'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the incoming messages about to be processed by the client.
  	 </div>
  
  	@function getResponses
  	@return {fm.array}
   */

  messageResponseReceivedArgs.prototype.getResponses = function() {
    return this._responses;
  };


  /*<span id='method-fm.websync.messageResponseReceivedArgs-getSender'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the sender of the request, either a client or publisher.
  	 </div>
  
  	@function getSender
  	@return {fm.object}
   */

  messageResponseReceivedArgs.prototype.getSender = function() {
    return this._sender;
  };

  messageResponseReceivedArgs.prototype.setResponses = function() {
    var value;
    value = arguments[0];
    return this._responses = value;
  };

  messageResponseReceivedArgs.prototype.setSender = function() {
    var value;
    value = arguments[0];
    return this._sender = value;
  };

  return messageResponseReceivedArgs;

})(fm.object);



/*<span id='cls-fm.websync.messageRequestArgs'>&nbsp;</span> */

/**
@class fm.websync.messageRequestArgs
 <div>
 Arguments for sending a message request.
 </div>

@extends fm.dynamic
 */
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.messageRequestArgs = (function(superClass) {
  extend(messageRequestArgs, superClass);

  messageRequestArgs.prototype._headers = null;

  messageRequestArgs.prototype._messages = null;

  messageRequestArgs.prototype._onHttpRequestCreated = null;

  messageRequestArgs.prototype._onHttpResponseReceived = null;

  messageRequestArgs.prototype._onRequestCreated = null;

  messageRequestArgs.prototype._onResponseReceived = null;

  messageRequestArgs.prototype._sender = null;

  messageRequestArgs.prototype._timeout = 0;

  messageRequestArgs.prototype._url = null;


  /*<span id='method-fm.websync.messageRequestArgs-fm.websync.messageRequestArgs'>&nbsp;</span> */


  /**
  	 <div>
  	 Initializes a new instance of the <see cref="fm.websync.messageRequestArgs">fm.websync.messageRequestArgs</see> class
  	 with default values.
  	 </div>
  
  	@function fm.websync.messageRequestArgs
  	@param {fm.nameValueCollection} headers
  	@return {}
   */

  function messageRequestArgs() {
    this.setUrl = bind(this.setUrl, this);
    this.setTimeout = bind(this.setTimeout, this);
    this.setSender = bind(this.setSender, this);
    this.setOnResponseReceived = bind(this.setOnResponseReceived, this);
    this.setOnRequestCreated = bind(this.setOnRequestCreated, this);
    this.setOnHttpResponseReceived = bind(this.setOnHttpResponseReceived, this);
    this.setOnHttpRequestCreated = bind(this.setOnHttpRequestCreated, this);
    this.setMessages = bind(this.setMessages, this);
    this.setHeaders = bind(this.setHeaders, this);
    this.getUrl = bind(this.getUrl, this);
    this.getTimeout = bind(this.getTimeout, this);
    this.getSender = bind(this.getSender, this);
    this.getOnResponseReceived = bind(this.getOnResponseReceived, this);
    this.getOnRequestCreated = bind(this.getOnRequestCreated, this);
    this.getOnHttpResponseReceived = bind(this.getOnHttpResponseReceived, this);
    this.getOnHttpRequestCreated = bind(this.getOnHttpRequestCreated, this);
    this.getMessages = bind(this.getMessages, this);
    this.getIsBinary = bind(this.getIsBinary, this);
    this.getHeaders = bind(this.getHeaders, this);
    var headers, instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = messageRequestArgs.__super__.constructor.call(this);
      this.setTimeout(15000);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    if (arguments.length === 0) {
      instance = messageRequestArgs.__super__.constructor.call(this);
      this.setTimeout(15000);
      return instance;
    }
    if (arguments.length === 1) {
      headers = arguments[0];
      messageRequestArgs.call(this);
      this.setHeaders(headers);
      return instance;
    }
  }


  /*<span id='method-fm.websync.messageRequestArgs-getHeaders'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the headers for the request.
  	 </div>
  
  	@function getHeaders
  	@return {fm.nameValueCollection}
   */

  messageRequestArgs.prototype.getHeaders = function() {
    return this._headers;
  };


  /*<span id='method-fm.websync.messageRequestArgs-getIsBinary'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets whether or not each message in the batch is in binary format and can
  	 be tranferred as such.
  	 </div>
  
  	@function getIsBinary
  	@return {Boolean}
   */

  messageRequestArgs.prototype.getIsBinary = function() {
    var _var0, i, len, message;
    _var0 = this.getMessages();
    for (i = 0, len = _var0.length; i < len; i++) {
      message = _var0[i];
      if (!((!fm.global.equals(message.getDisableBinary(), true)) && message.getIsBinary())) {
        return false;
      }
    }
    return true;
  };


  /*<span id='method-fm.websync.messageRequestArgs-getMessages'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the messages to transfer.
  	 </div>
  
  	@function getMessages
  	@return {fm.array}
   */

  messageRequestArgs.prototype.getMessages = function() {
    return this._messages;
  };


  /*<span id='method-fm.websync.messageRequestArgs-getOnHttpRequestCreated'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the callback to invoke whenever an underlying HTTP request
  	 has been created and is about to be transferred to the server. This is a
  	 good place to add headers/cookies. For WebSocket streams, this will fire
  	 only once for the initial HTTP-based handshake.
  	 </div>
  
  	@function getOnHttpRequestCreated
  	@return {fm.singleAction}
   */

  messageRequestArgs.prototype.getOnHttpRequestCreated = function() {
    return this._onHttpRequestCreated;
  };


  /*<span id='method-fm.websync.messageRequestArgs-getOnHttpResponseReceived'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the callback to invoke whenever an underlying HTTP response
  	 has been received and is about to be processed by the client. This is a
  	 good place to read headers/cookies. For WebSocket streams, this will fire
  	 only once for the initial HTTP-based handshake.
  	 </div>
  
  	@function getOnHttpResponseReceived
  	@return {fm.singleAction}
   */

  messageRequestArgs.prototype.getOnHttpResponseReceived = function() {
    return this._onHttpResponseReceived;
  };


  /*<span id='method-fm.websync.messageRequestArgs-getOnRequestCreated'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the callback to invoke whenever a new request is created
  	 and about to be transferred to the server. This is a good place to read
  	 or modify outgoing messages.
  	 </div>
  
  	@function getOnRequestCreated
  	@return {fm.singleAction}
   */

  messageRequestArgs.prototype.getOnRequestCreated = function() {
    return this._onRequestCreated;
  };


  /*<span id='method-fm.websync.messageRequestArgs-getOnResponseReceived'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the callback to invoke whenever a new response is received
  	 and about to be processed by the client. This is a good place to read
  	 or modify incoming messages.
  	 </div>
  
  	@function getOnResponseReceived
  	@return {fm.singleAction}
   */

  messageRequestArgs.prototype.getOnResponseReceived = function() {
    return this._onResponseReceived;
  };


  /*<span id='method-fm.websync.messageRequestArgs-getSender'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the sender of the content, either a client or publisher.
  	 </div>
  
  	@function getSender
  	@return {fm.object}
   */

  messageRequestArgs.prototype.getSender = function() {
    return this._sender;
  };


  /*<span id='method-fm.websync.messageRequestArgs-getTimeout'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the number of milliseconds to wait before timing out the transfer.
  	 Defaults to 15000 (15 seconds).
  	 </div>
  
  	@function getTimeout
  	@return {Integer}
   */

  messageRequestArgs.prototype.getTimeout = function() {
    return this._timeout;
  };


  /*<span id='method-fm.websync.messageRequestArgs-getUrl'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the target URL for the request.
  	 </div>
  
  	@function getUrl
  	@return {String}
   */

  messageRequestArgs.prototype.getUrl = function() {
    return this._url;
  };


  /*<span id='method-fm.websync.messageRequestArgs-setHeaders'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the headers for the request.
  	 </div>
  
  	@function setHeaders
  	@param {fm.nameValueCollection} value
  	@return {void}
   */

  messageRequestArgs.prototype.setHeaders = function() {
    var value;
    value = arguments[0];
    return this._headers = value;
  };


  /*<span id='method-fm.websync.messageRequestArgs-setMessages'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the messages to transfer.
  	 </div>
  
  	@function setMessages
  	@param {fm.array} value
  	@return {void}
   */

  messageRequestArgs.prototype.setMessages = function() {
    var value;
    value = arguments[0];
    return this._messages = value;
  };


  /*<span id='method-fm.websync.messageRequestArgs-setOnHttpRequestCreated'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the callback to invoke whenever an underlying HTTP request
  	 has been created and is about to be transferred to the server. This is a
  	 good place to add headers/cookies. For WebSocket streams, this will fire
  	 only once for the initial HTTP-based handshake.
  	 </div>
  
  	@function setOnHttpRequestCreated
  	@param {fm.singleAction} value
  	@return {void}
   */

  messageRequestArgs.prototype.setOnHttpRequestCreated = function() {
    var value;
    value = arguments[0];
    return this._onHttpRequestCreated = value;
  };


  /*<span id='method-fm.websync.messageRequestArgs-setOnHttpResponseReceived'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the callback to invoke whenever an underlying HTTP response
  	 has been received and is about to be processed by the client. This is a
  	 good place to read headers/cookies. For WebSocket streams, this will fire
  	 only once for the initial HTTP-based handshake.
  	 </div>
  
  	@function setOnHttpResponseReceived
  	@param {fm.singleAction} value
  	@return {void}
   */

  messageRequestArgs.prototype.setOnHttpResponseReceived = function() {
    var value;
    value = arguments[0];
    return this._onHttpResponseReceived = value;
  };


  /*<span id='method-fm.websync.messageRequestArgs-setOnRequestCreated'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the callback to invoke whenever a new request is created
  	 and about to be transferred to the server. This is a good place to read
  	 or modify outgoing messages.
  	 </div>
  
  	@function setOnRequestCreated
  	@param {fm.singleAction} value
  	@return {void}
   */

  messageRequestArgs.prototype.setOnRequestCreated = function() {
    var value;
    value = arguments[0];
    return this._onRequestCreated = value;
  };


  /*<span id='method-fm.websync.messageRequestArgs-setOnResponseReceived'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the callback to invoke whenever a new response is received
  	 and about to be processed by the client. This is a good place to read
  	 or modify incoming messages.
  	 </div>
  
  	@function setOnResponseReceived
  	@param {fm.singleAction} value
  	@return {void}
   */

  messageRequestArgs.prototype.setOnResponseReceived = function() {
    var value;
    value = arguments[0];
    return this._onResponseReceived = value;
  };


  /*<span id='method-fm.websync.messageRequestArgs-setSender'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the sender of the content, either a client or publisher.
  	 </div>
  
  	@function setSender
  	@param {fm.object} value
  	@return {void}
   */

  messageRequestArgs.prototype.setSender = function() {
    var value;
    value = arguments[0];
    return this._sender = value;
  };


  /*<span id='method-fm.websync.messageRequestArgs-setTimeout'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the number of milliseconds to wait before timing out the transfer.
  	 Defaults to 15000 (15 seconds).
  	 </div>
  
  	@function setTimeout
  	@param {Integer} value
  	@return {void}
   */

  messageRequestArgs.prototype.setTimeout = function() {
    var value;
    value = arguments[0];
    return this._timeout = value;
  };


  /*<span id='method-fm.websync.messageRequestArgs-setUrl'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the target URL for the request.
  	 </div>
  
  	@function setUrl
  	@param {String} value
  	@return {void}
   */

  messageRequestArgs.prototype.setUrl = function() {
    var value;
    value = arguments[0];
    return this._url = value;
  };

  return messageRequestArgs;

})(fm.dynamic);



/*<span id='cls-fm.websync.messageResponseArgs'>&nbsp;</span> */

/**
@class fm.websync.messageResponseArgs
 <div>
 Arguments for receiving a message response.
 </div>

@extends fm.dynamic
 */
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.messageResponseArgs = (function(superClass) {
  extend(messageResponseArgs, superClass);

  messageResponseArgs.prototype._exception = null;

  messageResponseArgs.prototype._headers = null;

  messageResponseArgs.prototype._messages = null;

  messageResponseArgs.prototype._requestArgs = null;


  /*<span id='method-fm.websync.messageResponseArgs-fm.websync.messageResponseArgs'>&nbsp;</span> */


  /**
  	 <div>
  	 Initializes a new instance of the <see cref="fm.websync.messageResponseArgs">fm.websync.messageResponseArgs</see> class.
  	 </div>
  	@function fm.websync.messageResponseArgs
  	@param {fm.websync.messageRequestArgs} requestArgs The request arguments.
  	@return {}
   */

  function messageResponseArgs() {
    this.setRequestArgs = bind(this.setRequestArgs, this);
    this.setMessages = bind(this.setMessages, this);
    this.setHeaders = bind(this.setHeaders, this);
    this.setException = bind(this.setException, this);
    this.getRequestArgs = bind(this.getRequestArgs, this);
    this.getMessages = bind(this.getMessages, this);
    this.getHeaders = bind(this.getHeaders, this);
    this.getException = bind(this.getException, this);
    var instance, requestArgs;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = messageResponseArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    requestArgs = arguments[0];
    instance = messageResponseArgs.__super__.constructor.call(this);
    this.setRequestArgs(requestArgs);
    return instance;
  }


  /*<span id='method-fm.websync.messageResponseArgs-getException'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the exception generated while completing the request.
  	 </div>
  
  	@function getException
  	@return {Error}
   */

  messageResponseArgs.prototype.getException = function() {
    return this._exception;
  };


  /*<span id='method-fm.websync.messageResponseArgs-getHeaders'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the headers for the response.
  	 </div>
  
  	@function getHeaders
  	@return {fm.nameValueCollection}
   */

  messageResponseArgs.prototype.getHeaders = function() {
    return this._headers;
  };


  /*<span id='method-fm.websync.messageResponseArgs-getMessages'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the messages read from the response.
  	 </div>
  
  	@function getMessages
  	@return {fm.array}
   */

  messageResponseArgs.prototype.getMessages = function() {
    return this._messages;
  };


  /*<span id='method-fm.websync.messageResponseArgs-getRequestArgs'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the original <see cref="fm.websync.messageRequestArgs">fm.websync.messageRequestArgs</see>.
  	 </div>
  
  	@function getRequestArgs
  	@return {fm.websync.messageRequestArgs}
   */

  messageResponseArgs.prototype.getRequestArgs = function() {
    return this._requestArgs;
  };


  /*<span id='method-fm.websync.messageResponseArgs-setException'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the exception generated while completing the request.
  	 </div>
  
  	@function setException
  	@param {Error} value
  	@return {void}
   */

  messageResponseArgs.prototype.setException = function() {
    var value;
    value = arguments[0];
    return this._exception = value;
  };


  /*<span id='method-fm.websync.messageResponseArgs-setHeaders'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the headers for the response.
  	 </div>
  
  	@function setHeaders
  	@param {fm.nameValueCollection} value
  	@return {void}
   */

  messageResponseArgs.prototype.setHeaders = function() {
    var value;
    value = arguments[0];
    return this._headers = value;
  };


  /*<span id='method-fm.websync.messageResponseArgs-setMessages'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the messages read from the response.
  	 </div>
  
  	@function setMessages
  	@param {fm.array} value
  	@return {void}
   */

  messageResponseArgs.prototype.setMessages = function() {
    var value;
    value = arguments[0];
    return this._messages = value;
  };


  /*<span id='method-fm.websync.messageResponseArgs-setRequestArgs'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the original <see cref="fm.websync.messageRequestArgs">fm.websync.messageRequestArgs</see>.
  	 </div>
  
  	@function setRequestArgs
  	@param {fm.websync.messageRequestArgs} value
  	@return {void}
   */

  messageResponseArgs.prototype.setRequestArgs = function() {
    var value;
    value = arguments[0];
    return this._requestArgs = value;
  };

  return messageResponseArgs;

})(fm.dynamic);



/*<span id='cls-fm.websync.notifyArgs'>&nbsp;</span> */

/**
@class fm.websync.notifyArgs
 <div>
 Arguments for client notify requests.
 </div>

@extends fm.websync.baseInputArgs
 */
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.notifyArgs = (function(superClass) {
  extend(notifyArgs, superClass);

  notifyArgs.prototype.__dataBytes = null;

  notifyArgs.prototype.__dataJson = null;

  notifyArgs.prototype._onComplete = null;

  notifyArgs.prototype._onFailure = null;

  notifyArgs.prototype._onSuccess = null;


  /*<span id='method-fm.websync.notifyArgs-fm.websync.notifyArgs'>&nbsp;</span> */


  /**
  	 <div>
  	 Initializes a new instance of the <see cref="fm.websync.notifyArgs">fm.websync.notifyArgs</see> class.
  	 </div>
  	@function fm.websync.notifyArgs
  	@param {fm.guid} clientId The client ID to which the data should be sent.
  	@param {String} dataJson The data to send in JSON format.
  	@param {String} tag The tag that identifies the contents of the payload.
  	@return {}
   */

  function notifyArgs() {
    this.setData = bind(this.setData, this);
    this.getData = bind(this.getData, this);
    this.setTag = bind(this.setTag, this);
    this.setOnSuccess = bind(this.setOnSuccess, this);
    this.setOnFailure = bind(this.setOnFailure, this);
    this.setOnComplete = bind(this.setOnComplete, this);
    this.setDataJson = bind(this.setDataJson, this);
    this.setDataBytes = bind(this.setDataBytes, this);
    this.setClientId = bind(this.setClientId, this);
    this.getTag = bind(this.getTag, this);
    this.getOnSuccess = bind(this.getOnSuccess, this);
    this.getOnFailure = bind(this.getOnFailure, this);
    this.getOnComplete = bind(this.getOnComplete, this);
    this.getIsBinary = bind(this.getIsBinary, this);
    this.getDataJson = bind(this.getDataJson, this);
    this.getDataBytes = bind(this.getDataBytes, this);
    this.getClientId = bind(this.getClientId, this);
    var clientId, dataJson, instance, tag;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = notifyArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    if (arguments.length === 3) {
      clientId = arguments[0];
      dataJson = arguments[1];
      tag = arguments[2];
      instance = notifyArgs.__super__.constructor.call(this);
      this.setClientId(clientId);
      this.setDataJson(dataJson);
      this.setTag(tag);
      return instance;
    }
    if (arguments.length === 2) {
      clientId = arguments[0];
      dataJson = arguments[1];
      notifyArgs.call(this, clientId, dataJson, null);
      return instance;
    }
  }


  /*<span id='method-fm.websync.notifyArgs-getClientId'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the client ID to notify.
  	 </div>
  
  	@function getClientId
  	@return {fm.guid}
   */

  notifyArgs.prototype.getClientId = function() {
    var nullable;
    nullable = fm.serializer.deserializeGuid(this.getExtensionValueJson("fm.notify"));
    if (nullable !== null) {
      return nullable;
    }
    return fm.guid.empty;
  };


  /*<span id='method-fm.websync.notifyArgs-getDataBytes'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the data to send in binary format.
  	 (Overrides <see cref="fm.websync.notifyArgs.dataJson">fm.websync.notifyArgs.dataJson</see>.)
  	 </div>
  
  	@function getDataBytes
  	@return {fm.array}
   */

  notifyArgs.prototype.getDataBytes = function() {
    var _var0, _var1, decoded, valueJson;
    decoded = this.__dataBytes;
    valueJson = this.__dataJson;
    if (!fm.global.equals(decoded, null)) {
      return decoded;
    }
    if (!fm.global.equals(valueJson, null)) {
      _var0 = new fm.holder(decoded);
      _var1 = fm.crypto.tryBase64Decode(fm.serializer.deserializeString(valueJson), _var0);
      decoded = _var0.getValue();
      if (!_var1) {
        decoded = null;
      }
      this.__dataBytes = decoded;
      return decoded;
    }
    return null;
  };


  /*<span id='method-fm.websync.notifyArgs-getDataJson'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the data to send in JSON format.
  	 (Overrides <see cref="fm.websync.notifyArgs.dataBytes">fm.websync.notifyArgs.dataBytes</see>.)
  	 </div>
  
  	@function getDataJson
  	@return {String}
   */

  notifyArgs.prototype.getDataJson = function() {
    var b, str;
    str = this.__dataJson;
    b = this.__dataBytes;
    if (!fm.global.equals(str, null)) {
      return str;
    }
    if (!fm.global.equals(b, null)) {
      str = fm.serializer.serializeString(fm.crypto.base64Encode(b));
      this.__dataJson = str;
      return str;
    }
    return null;
  };


  /*<span id='method-fm.websync.notifyArgs-getIsBinary'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets whether or not the data is binary.
  	 </div>
  
  	@function getIsBinary
  	@return {Boolean}
   */

  notifyArgs.prototype.getIsBinary = function() {
    return !fm.global.equals(this.getDataBytes(), null);
  };


  /*<span id='method-fm.websync.notifyArgs-getOnComplete'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the callback to invoke after <see cref="fm.websync.notifyArgs.onSuccess">fm.websync.notifyArgs.onSuccess</see> or <see cref="fm.websync.notifyArgs.onFailure">fm.websync.notifyArgs.onFailure</see>.
  	 </div>
  
  	@function getOnComplete
  	@return {fm.singleAction}
   */

  notifyArgs.prototype.getOnComplete = function() {
    return this._onComplete;
  };


  /*<span id='method-fm.websync.notifyArgs-getOnFailure'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the callback to invoke if the request fails.
  	 </div>
  
  	@function getOnFailure
  	@return {fm.singleAction}
   */

  notifyArgs.prototype.getOnFailure = function() {
    return this._onFailure;
  };


  /*<span id='method-fm.websync.notifyArgs-getOnSuccess'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the callback to invoke if the request succeeds.
  	 </div>
  
  	@function getOnSuccess
  	@return {fm.singleAction}
   */

  notifyArgs.prototype.getOnSuccess = function() {
    return this._onSuccess;
  };


  /*<span id='method-fm.websync.notifyArgs-getTag'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the tag that identifies the contents of the payload.
  	 </div>
  
  	@function getTag
  	@return {String}
   */

  notifyArgs.prototype.getTag = function() {
    return fm.serializer.deserializeString(this.getExtensionValueJson("fm.tag"));
  };


  /*<span id='method-fm.websync.notifyArgs-setClientId'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the client ID to notify.
  	 </div>
  
  	@function setClientId
  	@param {fm.guid} value
  	@return {void}
   */

  notifyArgs.prototype.setClientId = function() {
    var value;
    value = arguments[0];
    return this.setExtensionValueJson("fm.notify", fm.serializer.serializeGuid(value), false);
  };


  /*<span id='method-fm.websync.notifyArgs-setDataBytes'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the data to send in binary format.
  	 (Overrides <see cref="fm.websync.notifyArgs.dataJson">fm.websync.notifyArgs.dataJson</see>.)
  	 </div>
  
  	@function setDataBytes
  	@param {fm.array} value
  	@return {void}
   */

  notifyArgs.prototype.setDataBytes = function() {
    var value;
    value = arguments[0];
    this.__dataJson = null;
    return this.__dataBytes = value;
  };


  /*<span id='method-fm.websync.notifyArgs-setDataJson'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the data to send in JSON format.
  	 (Overrides <see cref="fm.websync.notifyArgs.dataBytes">fm.websync.notifyArgs.dataBytes</see>.)
  	 </div>
  
  	@function setDataJson
  	@param {String} value
  	@return {void}
   */

  notifyArgs.prototype.setDataJson = function() {
    var value;
    value = arguments[0];
    if (!((fm.global.equals(value, null)) || fm.serializer.isValidJson(value))) {
      throw new Error("The value is not valid JSON.");
    }
    this.__dataJson = value;
    return this.__dataBytes = null;
  };


  /*<span id='method-fm.websync.notifyArgs-setOnComplete'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the callback to invoke after <see cref="fm.websync.notifyArgs.onSuccess">fm.websync.notifyArgs.onSuccess</see> or <see cref="fm.websync.notifyArgs.onFailure">fm.websync.notifyArgs.onFailure</see>.
  	 </div>
  
  	@function setOnComplete
  	@param {fm.singleAction} value
  	@return {void}
   */

  notifyArgs.prototype.setOnComplete = function() {
    var value;
    value = arguments[0];
    return this._onComplete = value;
  };


  /*<span id='method-fm.websync.notifyArgs-setOnFailure'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the callback to invoke if the request fails.
  	 </div>
  
  	@function setOnFailure
  	@param {fm.singleAction} value
  	@return {void}
   */

  notifyArgs.prototype.setOnFailure = function() {
    var value;
    value = arguments[0];
    return this._onFailure = value;
  };


  /*<span id='method-fm.websync.notifyArgs-setOnSuccess'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the callback to invoke if the request succeeds.
  	 </div>
  
  	@function setOnSuccess
  	@param {fm.singleAction} value
  	@return {void}
   */

  notifyArgs.prototype.setOnSuccess = function() {
    var value;
    value = arguments[0];
    return this._onSuccess = value;
  };


  /*<span id='method-fm.websync.notifyArgs-setTag'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the tag that identifies the contents of the payload.
  	 </div>
  
  	@function setTag
  	@param {String} value
  	@return {void}
   */

  notifyArgs.prototype.setTag = function() {
    var value;
    value = arguments[0];
    return this.setExtensionValueJson("fm.tag", fm.serializer.serializeString(value), false);
  };

  notifyArgs.prototype.getData = function() {
    return fm.json.deserialize(this.getDataJson.apply(this, arguments));
  };

  notifyArgs.prototype.setData = function() {
    var data;
    data = arguments[0];
    arguments[arguments.length - 1] = fm.json.serialize(arguments[arguments.length - 1]);
    return this.setDataJson.apply(this, arguments);
  };

  return notifyArgs;

})(fm.websync.baseInputArgs);



/*<span id='cls-fm.websync.baseCompleteArgs'>&nbsp;</span> */

/**
@class fm.websync.baseCompleteArgs
 <div>
 Base arguments for <see cref="fm.websync.client">fm.websync.client</see> "OnComplete" callbacks.
 </div>

@extends fm.websync.baseOutputArgs
 */
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.baseCompleteArgs = (function(superClass) {
  extend(baseCompleteArgs, superClass);

  function baseCompleteArgs() {
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = baseCompleteArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = baseCompleteArgs.__super__.constructor.call(this);
    return instance;
  }

  return baseCompleteArgs;

})(fm.websync.baseOutputArgs);



/*<span id='cls-fm.websync.notifyCompleteArgs'>&nbsp;</span> */

/**
@class fm.websync.notifyCompleteArgs
 <div>
 Arguments for notify complete callbacks.
 </div>

@extends fm.websync.baseCompleteArgs
 */
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.notifyCompleteArgs = (function(superClass) {
  extend(notifyCompleteArgs, superClass);

  function notifyCompleteArgs() {
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = notifyCompleteArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = notifyCompleteArgs.__super__.constructor.call(this);
    return instance;
  }

  return notifyCompleteArgs;

})(fm.websync.baseCompleteArgs);



/*<span id='cls-fm.websync.baseFailureArgs'>&nbsp;</span> */

/**
@class fm.websync.baseFailureArgs
 <div>
 Base arguments for <see cref="fm.websync.client">fm.websync.client</see> "OnFailure" callbacks.
 </div>

@extends fm.websync.baseOutputArgs
 */
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.baseFailureArgs = (function(superClass) {
  extend(baseFailureArgs, superClass);

  baseFailureArgs.prototype._exception = null;

  baseFailureArgs.prototype._retry = false;

  function baseFailureArgs() {
    this.setRetry = bind(this.setRetry, this);
    this.setException = bind(this.setException, this);
    this.getRetry = bind(this.getRetry, this);
    this.getException = bind(this.getException, this);
    this.getErrorMessage = bind(this.getErrorMessage, this);
    this.getErrorCode = bind(this.getErrorCode, this);
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = baseFailureArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = baseFailureArgs.__super__.constructor.call(this);
    return instance;
  }

  baseFailureArgs.getErrorCode = function() {
    var _var0, _var1, error, exception, intResult, obj1, s;
    exception = arguments[0];
    intResult = -1;
    try {
      if ((fm.global.equals(exception, null)) || fm.stringExtensions.isNullOrEmpty(exception.message)) {
        return intResult;
      }
      if (fm.stringExtensions.indexOf(exception.message, "::") <= -1) {
        return intResult;
      }
      s = fm.splitter.split(exception.message, "::")[0];
      _var0 = new fm.holder(intResult);
      _var1 = fm.parseAssistant.tryParseIntegerValue(s, _var0);
      intResult = _var0.getValue();
      if (!_var1) {
        intResult = -1;
      }
    } catch (error) {
      obj1 = error;
    } finally {

    }
    return intResult;
  };

  baseFailureArgs.getErrorMessage = function() {
    var error, exception, message, obj1;
    exception = arguments[0];
    message = null;
    try {
      if ((fm.global.equals(exception, null)) || fm.stringExtensions.isNullOrEmpty(exception.message)) {
        return message;
      }
      if (fm.stringExtensions.indexOf(exception.message, "::") > -1) {
        return fm.splitter.split(exception.message, "::")[1];
      }
      message = exception.message;
    } catch (error) {
      obj1 = error;
    } finally {

    }
    return message;
  };


  /*<span id='method-fm.websync.baseFailureArgs-getErrorCode'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the error code value, if the exception was generated by WebSync; otherwise -1.
  	 </div>
  
  	@function getErrorCode
  	@return {Integer}
   */

  baseFailureArgs.prototype.getErrorCode = function() {
    return fm.websync.baseFailureArgs.getErrorCode(this.getException());
  };


  /*<span id='method-fm.websync.baseFailureArgs-getErrorMessage'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the error message value, if the exception was generated by WebSync; otherwise <c>null</c>.
  	 </div>
  
  	@function getErrorMessage
  	@return {String}
   */

  baseFailureArgs.prototype.getErrorMessage = function() {
    return fm.websync.baseFailureArgs.getErrorMessage(this.getException());
  };


  /*<span id='method-fm.websync.baseFailureArgs-getException'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the exception generated while completing the request.
  	 </div>
  
  	@function getException
  	@return {Error}
   */

  baseFailureArgs.prototype.getException = function() {
    return this._exception;
  };


  /*<span id='method-fm.websync.baseFailureArgs-getRetry'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets whether or not to retry automatically after completing this operation.
  	 </div>
  
  	@function getRetry
  	@return {Boolean}
   */

  baseFailureArgs.prototype.getRetry = function() {
    return this._retry;
  };


  /*<span id='method-fm.websync.baseFailureArgs-setException'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the exception generated while completing the request.
  	 </div>
  
  	@function setException
  	@param {Error} value
  	@return {void}
   */

  baseFailureArgs.prototype.setException = function() {
    var value;
    value = arguments[0];
    return this._exception = value;
  };


  /*<span id='method-fm.websync.baseFailureArgs-setRetry'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets whether or not to retry automatically after completing this operation.
  	 </div>
  
  	@function setRetry
  	@param {Boolean} value
  	@return {void}
   */

  baseFailureArgs.prototype.setRetry = function() {
    var value;
    value = arguments[0];
    return this._retry = value;
  };

  return baseFailureArgs;

})(fm.websync.baseOutputArgs);



/*<span id='cls-fm.websync.notifyFailureArgs'>&nbsp;</span> */

/**
@class fm.websync.notifyFailureArgs
 <div>
 Arguments for notify failure callbacks.
 </div>

@extends fm.websync.baseFailureArgs
 */
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.notifyFailureArgs = (function(superClass) {
  extend(notifyFailureArgs, superClass);

  notifyFailureArgs.prototype.__dataBytes = null;

  notifyFailureArgs.prototype.__dataJson = null;

  function notifyFailureArgs() {
    this.getData = bind(this.getData, this);
    this.getTag = bind(this.getTag, this);
    this.getIsBinary = bind(this.getIsBinary, this);
    this.getDataJson = bind(this.getDataJson, this);
    this.getDataBytes = bind(this.getDataBytes, this);
    this.getClientId = bind(this.getClientId, this);
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = notifyFailureArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = notifyFailureArgs.__super__.constructor.call(this);
    return instance;
  }


  /*<span id='method-fm.websync.notifyFailureArgs-getClientId'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the client ID to which the data failed to be sent.
  	 </div>
  
  	@function getClientId
  	@return {fm.guid}
   */

  notifyFailureArgs.prototype.getClientId = function() {
    var nullable;
    nullable = fm.serializer.deserializeGuid(this.getExtensionValueJson("fm.notify"));
    if (nullable !== null) {
      return nullable;
    }
    return fm.guid.empty;
  };


  /*<span id='method-fm.websync.notifyFailureArgs-getDataBytes'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the data that failed to be sent in binary format.
  	 </div>
  
  	@function getDataBytes
  	@return {fm.array}
   */

  notifyFailureArgs.prototype.getDataBytes = function() {
    var _var0, _var1, decoded, valueJson;
    decoded = this.__dataBytes;
    valueJson = this.__dataJson;
    if (!fm.global.equals(decoded, null)) {
      return decoded;
    }
    if (!fm.global.equals(valueJson, null)) {
      _var0 = new fm.holder(decoded);
      _var1 = fm.crypto.tryBase64Decode(fm.serializer.deserializeString(valueJson), _var0);
      decoded = _var0.getValue();
      if (!_var1) {
        decoded = null;
      }
      this.__dataBytes = decoded;
      return decoded;
    }
    return null;
  };


  /*<span id='method-fm.websync.notifyFailureArgs-getDataJson'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the data that failed to be sent in JSON format.
  	 </div>
  
  	@function getDataJson
  	@return {String}
   */

  notifyFailureArgs.prototype.getDataJson = function() {
    var b, str;
    str = this.__dataJson;
    b = this.__dataBytes;
    if (!fm.global.equals(str, null)) {
      return str;
    }
    if (!fm.global.equals(b, null)) {
      str = fm.serializer.serializeString(fm.crypto.base64Encode(b));
      this.__dataJson = str;
      return str;
    }
    return null;
  };


  /*<span id='method-fm.websync.notifyFailureArgs-getIsBinary'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets whether or not the data is binary.
  	 </div>
  
  	@function getIsBinary
  	@return {Boolean}
   */

  notifyFailureArgs.prototype.getIsBinary = function() {
    return !fm.global.equals(this.getDataBytes(), null);
  };


  /*<span id='method-fm.websync.notifyFailureArgs-getTag'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the tag that identifies the contents of the payload.
  	 </div>
  
  	@function getTag
  	@return {String}
   */

  notifyFailureArgs.prototype.getTag = function() {
    return fm.serializer.deserializeString(this.getExtensionValueJson("fm.tag"));
  };

  notifyFailureArgs.prototype.getData = function() {
    return fm.json.deserialize(this.getDataJson.apply(this, arguments));
  };

  return notifyFailureArgs;

})(fm.websync.baseFailureArgs);



/*<span id='cls-fm.websync.notifySuccessArgs'>&nbsp;</span> */

/**
@class fm.websync.notifySuccessArgs
 <div>
 Arguments for notify success callbacks.
 </div>

@extends fm.websync.baseSuccessArgs
 */
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.notifySuccessArgs = (function(superClass) {
  extend(notifySuccessArgs, superClass);

  notifySuccessArgs.prototype.__dataBytes = null;

  notifySuccessArgs.prototype.__dataJson = null;

  function notifySuccessArgs() {
    this.getData = bind(this.getData, this);
    this.getTag = bind(this.getTag, this);
    this.getIsBinary = bind(this.getIsBinary, this);
    this.getDataJson = bind(this.getDataJson, this);
    this.getDataBytes = bind(this.getDataBytes, this);
    this.getClientId = bind(this.getClientId, this);
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = notifySuccessArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = notifySuccessArgs.__super__.constructor.call(this);
    return instance;
  }


  /*<span id='method-fm.websync.notifySuccessArgs-getClientId'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the client ID to which the data was sent.
  	 </div>
  
  	@function getClientId
  	@return {fm.guid}
   */

  notifySuccessArgs.prototype.getClientId = function() {
    var nullable;
    nullable = fm.serializer.deserializeGuid(this.getExtensionValueJson("fm.notify"));
    if (nullable !== null) {
      return nullable;
    }
    return fm.guid.empty;
  };


  /*<span id='method-fm.websync.notifySuccessArgs-getDataBytes'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the data that was sent in binary format.
  	 </div>
  
  	@function getDataBytes
  	@return {fm.array}
   */

  notifySuccessArgs.prototype.getDataBytes = function() {
    var _var0, _var1, decoded, valueJson;
    decoded = this.__dataBytes;
    valueJson = this.__dataJson;
    if (!fm.global.equals(decoded, null)) {
      return decoded;
    }
    if (!fm.global.equals(valueJson, null)) {
      _var0 = new fm.holder(decoded);
      _var1 = fm.crypto.tryBase64Decode(fm.serializer.deserializeString(valueJson), _var0);
      decoded = _var0.getValue();
      if (!_var1) {
        decoded = null;
      }
      this.__dataBytes = decoded;
      return decoded;
    }
    return null;
  };


  /*<span id='method-fm.websync.notifySuccessArgs-getDataJson'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the data that was sent in JSON format.
  	 </div>
  
  	@function getDataJson
  	@return {String}
   */

  notifySuccessArgs.prototype.getDataJson = function() {
    var b, str;
    str = this.__dataJson;
    b = this.__dataBytes;
    if (!fm.global.equals(str, null)) {
      return str;
    }
    if (!fm.global.equals(b, null)) {
      str = fm.serializer.serializeString(fm.crypto.base64Encode(b));
      this.__dataJson = str;
      return str;
    }
    return null;
  };


  /*<span id='method-fm.websync.notifySuccessArgs-getIsBinary'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets whether or not the data is binary.
  	 </div>
  
  	@function getIsBinary
  	@return {Boolean}
   */

  notifySuccessArgs.prototype.getIsBinary = function() {
    return !fm.global.equals(this.getDataBytes(), null);
  };


  /*<span id='method-fm.websync.notifySuccessArgs-getTag'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the tag that identifies the contents of the payload.
  	 </div>
  
  	@function getTag
  	@return {String}
   */

  notifySuccessArgs.prototype.getTag = function() {
    return fm.serializer.deserializeString(this.getExtensionValueJson("fm.tag"));
  };

  notifySuccessArgs.prototype.getData = function() {
    return fm.json.deserialize(this.getDataJson.apply(this, arguments));
  };

  return notifySuccessArgs;

})(fm.websync.baseSuccessArgs);



/*<span id='cls-fm.websync.publisherNotifyResponseArgs'>&nbsp;</span> */

/**
@class fm.websync.publisherNotifyResponseArgs
 <div>
 Arguments for <see cref="fm.websync.publisher.addOnNotifyResponse">fm.websync.publisher.addOnNotifyResponse</see>.
 </div>

@extends fm.websync.basePublisherResponseEventArgsGeneric
 */
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.publisherNotifyResponseArgs = (function(superClass) {
  extend(publisherNotifyResponseArgs, superClass);

  function publisherNotifyResponseArgs() {
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = publisherNotifyResponseArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = publisherNotifyResponseArgs.__super__.constructor.call(this);
    return instance;
  }

  return publisherNotifyResponseArgs;

})(fm.websync.basePublisherResponseEventArgsGeneric);



/*<span id='cls-fm.websync.publisherNotifyRequestArgs'>&nbsp;</span> */

/**
@class fm.websync.publisherNotifyRequestArgs
 <div>
 Arguments for <see cref="fm.websync.publisher.addOnNotifyRequest">fm.websync.publisher.addOnNotifyRequest</see>.
 </div>

@extends fm.websync.basePublisherRequestEventArgsGeneric
 */
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.publisherNotifyRequestArgs = (function(superClass) {
  extend(publisherNotifyRequestArgs, superClass);

  function publisherNotifyRequestArgs() {
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = publisherNotifyRequestArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = publisherNotifyRequestArgs.__super__.constructor.call(this);
    return instance;
  }

  return publisherNotifyRequestArgs;

})(fm.websync.basePublisherRequestEventArgsGeneric);



/*<span id='cls-fm.websync.unhandledExceptionArgs'>&nbsp;</span> */

/**
@class fm.websync.unhandledExceptionArgs
 <div>
 Arguments for an unhandled exception.
 </div>

@extends fm.object
 */
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.unhandledExceptionArgs = (function(superClass) {
  extend(unhandledExceptionArgs, superClass);

  unhandledExceptionArgs.prototype.__exception = null;

  unhandledExceptionArgs.prototype._handled = false;

  function unhandledExceptionArgs() {
    this.setHandled = bind(this.setHandled, this);
    this.getHandled = bind(this.getHandled, this);
    this.getException = bind(this.getException, this);
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = unhandledExceptionArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = unhandledExceptionArgs.__super__.constructor.call(this);
    return instance;
  }


  /*<span id='method-fm.websync.unhandledExceptionArgs-getException'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the unhandled exception.
  	 </div>
  
  	@function getException
  	@return {Error}
   */

  unhandledExceptionArgs.prototype.getException = function() {
    return this.__exception;
  };


  /*<span id='method-fm.websync.unhandledExceptionArgs-getHandled'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets whether the exception has been
  	 appropriately handled. If set to <c>true</c>,
  	 then the exception will not be thrown.
  	 </div>
  
  	@function getHandled
  	@return {Boolean}
   */

  unhandledExceptionArgs.prototype.getHandled = function() {
    return this._handled;
  };


  /*<span id='method-fm.websync.unhandledExceptionArgs-setHandled'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets whether the exception has been
  	 appropriately handled. If set to <c>true</c>,
  	 then the exception will not be thrown.
  	 </div>
  
  	@function setHandled
  	@param {Boolean} value
  	@return {void}
   */

  unhandledExceptionArgs.prototype.setHandled = function() {
    var value;
    value = arguments[0];
    return this._handled = value;
  };

  return unhandledExceptionArgs;

})(fm.object);


var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.clientResponseArgs = (function(superClass) {
  extend(clientResponseArgs, superClass);

  clientResponseArgs.prototype._exception = null;

  clientResponseArgs.prototype._responses = null;

  function clientResponseArgs() {
    this.setResponses = bind(this.setResponses, this);
    this.setResponse = bind(this.setResponse, this);
    this.setException = bind(this.setException, this);
    this.getResponses = bind(this.getResponses, this);
    this.getResponse = bind(this.getResponse, this);
    this.getException = bind(this.getException, this);
    this.getErrorMessage = bind(this.getErrorMessage, this);
    this.getErrorCode = bind(this.getErrorCode, this);
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = clientResponseArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = clientResponseArgs.__super__.constructor.call(this);
    return instance;
  }

  clientResponseArgs.prototype.getErrorCode = function() {
    return fm.websync.baseFailureArgs.getErrorCode(this.getException());
  };

  clientResponseArgs.prototype.getErrorMessage = function() {
    return fm.websync.baseFailureArgs.getErrorMessage(this.getException());
  };

  clientResponseArgs.prototype.getException = function() {
    return this._exception;
  };

  clientResponseArgs.prototype.getResponse = function() {
    if ((fm.global.equals(this.getResponses(), null)) || (fm.global.equals(this.getResponses().length, 0))) {
      return null;
    }
    return this.getResponses()[0];
  };

  clientResponseArgs.prototype.getResponses = function() {
    return this._responses;
  };

  clientResponseArgs.prototype.setException = function() {
    var value;
    value = arguments[0];
    return this._exception = value;
  };

  clientResponseArgs.prototype.setResponse = function() {
    var value;
    value = arguments[0];
    return this.setResponses([value]);
  };

  clientResponseArgs.prototype.setResponses = function() {
    var value;
    value = arguments[0];
    return this._responses = value;
  };

  return clientResponseArgs;

})(fm.dynamic);



/*<span id='cls-fm.websync.connectArgs'>&nbsp;</span> */

/**
@class fm.websync.connectArgs
 <div>
 Arguments for client connect requests.
 </div>

@extends fm.websync.baseInputArgs
 */
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.connectArgs = (function(superClass) {
  extend(connectArgs, superClass);

  connectArgs.prototype._defaultRetryBackoffTimeout = 0;

  connectArgs.prototype._isReconnect = false;

  connectArgs.prototype._lastClientId = null;

  connectArgs.prototype._lastSessionId = null;

  connectArgs.prototype._onComplete = null;

  connectArgs.prototype._onFailure = null;

  connectArgs.prototype._onStateRestored = null;

  connectArgs.prototype._onStreamFailure = null;

  connectArgs.prototype._onSuccess = null;

  connectArgs.prototype._retryBackoff = null;

  connectArgs.prototype._retryMode = null;


  /*<span id='method-fm.websync.connectArgs-fm.websync.connectArgs'>&nbsp;</span> */


  /**
  	 <div>
  	 Creates a new instance of <see cref="fm.websync.connectArgs">fm.websync.connectArgs</see>.
  	 </div>
  
  	@function fm.websync.connectArgs
  	@return {}
   */

  function connectArgs() {
    this.setRetryMode = bind(this.setRetryMode, this);
    this.setRetryBackoff = bind(this.setRetryBackoff, this);
    this.setOnSuccess = bind(this.setOnSuccess, this);
    this.setOnStreamFailure = bind(this.setOnStreamFailure, this);
    this.setOnStateRestored = bind(this.setOnStateRestored, this);
    this.setOnFailure = bind(this.setOnFailure, this);
    this.setOnComplete = bind(this.setOnComplete, this);
    this.setLastSessionId = bind(this.setLastSessionId, this);
    this.setLastClientId = bind(this.setLastClientId, this);
    this.setIsReconnect = bind(this.setIsReconnect, this);
    this.getRetryMode = bind(this.getRetryMode, this);
    this.getRetryBackoff = bind(this.getRetryBackoff, this);
    this.getOnSuccess = bind(this.getOnSuccess, this);
    this.getOnStreamFailure = bind(this.getOnStreamFailure, this);
    this.getOnStateRestored = bind(this.getOnStateRestored, this);
    this.getOnFailure = bind(this.getOnFailure, this);
    this.getOnComplete = bind(this.getOnComplete, this);
    this.getLastSessionId = bind(this.getLastSessionId, this);
    this.getLastClientId = bind(this.getLastClientId, this);
    this.getIsReconnect = bind(this.getIsReconnect, this);
    this.defaultRetryBackoff = bind(this.defaultRetryBackoff, this);
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = connectArgs.__super__.constructor.call(this);
      this._defaultRetryBackoffTimeout = 500;
      this.setRetryMode(fm.websync.connectRetryMode.Intelligent);
      this.setRetryBackoff(this.defaultRetryBackoff);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = connectArgs.__super__.constructor.call(this);
    this._defaultRetryBackoffTimeout = 500;
    this.setRetryMode(fm.websync.connectRetryMode.Intelligent);
    this.setRetryBackoff(this.defaultRetryBackoff);
    return instance;
  }

  connectArgs.prototype.defaultRetryBackoff = function() {
    var e;
    e = arguments[0];
    if (fm.global.equals(e.getIndex(), 0)) {
      return this._defaultRetryBackoffTimeout;
    }
    return e.getLastTimeout() * 2;
  };

  connectArgs.prototype.getIsReconnect = function() {
    return this._isReconnect;
  };

  connectArgs.prototype.getLastClientId = function() {
    return this._lastClientId;
  };

  connectArgs.prototype.getLastSessionId = function() {
    return this._lastSessionId;
  };


  /*<span id='method-fm.websync.connectArgs-getOnComplete'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the callback to invoke after <see cref="fm.websync.connectArgs.onSuccess">fm.websync.connectArgs.onSuccess</see> or <see cref="fm.websync.connectArgs.onFailure">fm.websync.connectArgs.onFailure</see>.
  	 </div>
  
  	@function getOnComplete
  	@return {fm.singleAction}
   */

  connectArgs.prototype.getOnComplete = function() {
    return this._onComplete;
  };


  /*<span id='method-fm.websync.connectArgs-getOnFailure'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the callback to invoke if the request fails.
  	 </div>
  
  	@function getOnFailure
  	@return {fm.singleAction}
   */

  connectArgs.prototype.getOnFailure = function() {
    return this._onFailure;
  };


  /*<span id='method-fm.websync.connectArgs-getOnStateRestored'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the callback to invoke after all bindings and subscriptions
  	 are restored following a reconnect.
  	 See <see cref="fm.websync.stateRestoredArgs">fm.websync.stateRestoredArgs</see> for callback argument details.
  	 </div>
  
  	@function getOnStateRestored
  	@return {fm.singleAction}
   */

  connectArgs.prototype.getOnStateRestored = function() {
    return this._onStateRestored;
  };


  /*<span id='method-fm.websync.connectArgs-getOnStreamFailure'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the callback to invoke if the streaming connection fails.
  	 See <see cref="fm.websync.streamFailureArgs">fm.websync.streamFailureArgs</see> for callback argument details.
  	 </div><div>
  	 <p>
  	 This method will be invoked if the connection was lost or the client
  	 record no longer exists on the server (either due to network loss or
  	 an application pool recycle). In either case, the client will automatically
  	 reconnect after firing this callback. If the reconnect succeeds, the
  	 OnSuccess callback will be invoked with <see cref="fm.websync.connectSuccessArgs.isReconnect">fm.websync.connectSuccessArgs.isReconnect</see>
  	 set to <c>true</c>. If the reconnect succeeds, the OnFailure callback
  	 will be invoked with <see cref="fm.websync.connectFailureArgs.isReconnect">fm.websync.connectFailureArgs.isReconnect</see> set
  	 to <c>true</c>.
  	 </p>
  	 <p>
  	 This is the recommended place to perform any UI updates necessary to
  	 inform the application user that the connection has been temporarily
  	 lost. Any UI components shown by this callback can be hidden in
  	 either OnSuccess or OnFailure.
  	 </p>
  	 </div>
  
  	@function getOnStreamFailure
  	@return {fm.singleAction}
   */

  connectArgs.prototype.getOnStreamFailure = function() {
    return this._onStreamFailure;
  };


  /*<span id='method-fm.websync.connectArgs-getOnSuccess'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the callback to invoke if the request succeeds.
  	 </div>
  
  	@function getOnSuccess
  	@return {fm.singleAction}
   */

  connectArgs.prototype.getOnSuccess = function() {
    return this._onSuccess;
  };


  /*<span id='method-fm.websync.connectArgs-getRetryBackoff'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the backoff algorithm to use when retrying a failed connect handshake.
  	 Used to calculate the sleep timeout before retrying if <see cref="fm.websync.baseFailureArgs.retry">fm.websync.baseFailureArgs.retry</see>
  	 is set to <c>true</c> in <see cref="fm.websync.connectFailureArgs">fm.websync.connectFailureArgs</see>. The function should return
  	 the desired timeout in milliseconds.
  	 </div>
  
  	@function getRetryBackoff
  	@return {fm.websync.retryBackoffCallback}
   */

  connectArgs.prototype.getRetryBackoff = function() {
    return this._retryBackoff;
  };


  /*<span id='method-fm.websync.connectArgs-getRetryMode'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the mode under which the client is expected to operate when
  	 a connect handshake fails. This property controls the default value of
  	 <see cref="fm.websync.baseFailureArgs.retry">fm.websync.baseFailureArgs.retry</see> in <see cref="fm.websync.connectFailureArgs">fm.websync.connectFailureArgs</see>,
  	 which can be overridden.
  	 </div>
  
  	@function getRetryMode
  	@return {fm.websync.connectRetryMode}
   */

  connectArgs.prototype.getRetryMode = function() {
    return this._retryMode;
  };

  connectArgs.prototype.setIsReconnect = function() {
    var value;
    value = arguments[0];
    return this._isReconnect = value;
  };

  connectArgs.prototype.setLastClientId = function() {
    var value;
    value = arguments[0];
    return this._lastClientId = value;
  };

  connectArgs.prototype.setLastSessionId = function() {
    var value;
    value = arguments[0];
    return this._lastSessionId = value;
  };


  /*<span id='method-fm.websync.connectArgs-setOnComplete'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the callback to invoke after <see cref="fm.websync.connectArgs.onSuccess">fm.websync.connectArgs.onSuccess</see> or <see cref="fm.websync.connectArgs.onFailure">fm.websync.connectArgs.onFailure</see>.
  	 </div>
  
  	@function setOnComplete
  	@param {fm.singleAction} value
  	@return {void}
   */

  connectArgs.prototype.setOnComplete = function() {
    var value;
    value = arguments[0];
    return this._onComplete = value;
  };


  /*<span id='method-fm.websync.connectArgs-setOnFailure'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the callback to invoke if the request fails.
  	 </div>
  
  	@function setOnFailure
  	@param {fm.singleAction} value
  	@return {void}
   */

  connectArgs.prototype.setOnFailure = function() {
    var value;
    value = arguments[0];
    return this._onFailure = value;
  };


  /*<span id='method-fm.websync.connectArgs-setOnStateRestored'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the callback to invoke after all bindings and subscriptions
  	 are restored following a reconnect.
  	 See <see cref="fm.websync.stateRestoredArgs">fm.websync.stateRestoredArgs</see> for callback argument details.
  	 </div>
  
  	@function setOnStateRestored
  	@param {fm.singleAction} value
  	@return {void}
   */

  connectArgs.prototype.setOnStateRestored = function() {
    var value;
    value = arguments[0];
    return this._onStateRestored = value;
  };


  /*<span id='method-fm.websync.connectArgs-setOnStreamFailure'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the callback to invoke if the streaming connection fails.
  	 See <see cref="fm.websync.streamFailureArgs">fm.websync.streamFailureArgs</see> for callback argument details.
  	 </div><div>
  	 <p>
  	 This method will be invoked if the connection was lost or the client
  	 record no longer exists on the server (either due to network loss or
  	 an application pool recycle). In either case, the client will automatically
  	 reconnect after firing this callback. If the reconnect succeeds, the
  	 OnSuccess callback will be invoked with <see cref="fm.websync.connectSuccessArgs.isReconnect">fm.websync.connectSuccessArgs.isReconnect</see>
  	 set to <c>true</c>. If the reconnect succeeds, the OnFailure callback
  	 will be invoked with <see cref="fm.websync.connectFailureArgs.isReconnect">fm.websync.connectFailureArgs.isReconnect</see> set
  	 to <c>true</c>.
  	 </p>
  	 <p>
  	 This is the recommended place to perform any UI updates necessary to
  	 inform the application user that the connection has been temporarily
  	 lost. Any UI components shown by this callback can be hidden in
  	 either OnSuccess or OnFailure.
  	 </p>
  	 </div>
  
  	@function setOnStreamFailure
  	@param {fm.singleAction} value
  	@return {void}
   */

  connectArgs.prototype.setOnStreamFailure = function() {
    var value;
    value = arguments[0];
    return this._onStreamFailure = value;
  };


  /*<span id='method-fm.websync.connectArgs-setOnSuccess'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the callback to invoke if the request succeeds.
  	 </div>
  
  	@function setOnSuccess
  	@param {fm.singleAction} value
  	@return {void}
   */

  connectArgs.prototype.setOnSuccess = function() {
    var value;
    value = arguments[0];
    return this._onSuccess = value;
  };


  /*<span id='method-fm.websync.connectArgs-setRetryBackoff'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the backoff algorithm to use when retrying a failed connect handshake.
  	 Used to calculate the sleep timeout before retrying if <see cref="fm.websync.baseFailureArgs.retry">fm.websync.baseFailureArgs.retry</see>
  	 is set to <c>true</c> in <see cref="fm.websync.connectFailureArgs">fm.websync.connectFailureArgs</see>. The function should return
  	 the desired timeout in milliseconds.
  	 </div>
  
  	@function setRetryBackoff
  	@param {fm.websync.retryBackoffCallback} value
  	@return {void}
   */

  connectArgs.prototype.setRetryBackoff = function() {
    var value;
    value = arguments[0];
    return this._retryBackoff = value;
  };


  /*<span id='method-fm.websync.connectArgs-setRetryMode'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the mode under which the client is expected to operate when
  	 a connect handshake fails. This property controls the default value of
  	 <see cref="fm.websync.baseFailureArgs.retry">fm.websync.baseFailureArgs.retry</see> in <see cref="fm.websync.connectFailureArgs">fm.websync.connectFailureArgs</see>,
  	 which can be overridden.
  	 </div>
  
  	@function setRetryMode
  	@param {fm.websync.connectRetryMode} value
  	@return {void}
   */

  connectArgs.prototype.setRetryMode = function() {
    var value;
    value = arguments[0];
    return this._retryMode = value;
  };

  return connectArgs;

})(fm.websync.baseInputArgs);



/*<span id='cls-fm.websync.bindArgs'>&nbsp;</span> */

/**
@class fm.websync.bindArgs
 <div>
 Arguments for client bind requests.
 </div>

@extends fm.websync.baseInputArgs
 */
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.bindArgs = (function(superClass) {
  extend(bindArgs, superClass);

  bindArgs.prototype.__records = null;

  bindArgs.prototype._autoRebind = null;

  bindArgs.prototype._isRebind = false;

  bindArgs.prototype._onComplete = null;

  bindArgs.prototype._onFailure = null;

  bindArgs.prototype._onSuccess = null;


  /*<span id='method-fm.websync.bindArgs-fm.websync.bindArgs'>&nbsp;</span> */


  /**
  	 <div>
  	 Initializes a new instance of the <see cref="fm.websync.bindArgs">fm.websync.bindArgs</see> class.
  	 </div>
  	@function fm.websync.bindArgs
  	@param {fm.array} records The records to bind.
  	@return {}
   */

  function bindArgs() {
    this.setRecords = bind(this.setRecords, this);
    this.setRecord = bind(this.setRecord, this);
    this.setOnSuccess = bind(this.setOnSuccess, this);
    this.setOnFailure = bind(this.setOnFailure, this);
    this.setOnComplete = bind(this.setOnComplete, this);
    this.setIsRebind = bind(this.setIsRebind, this);
    this.setAutoRebind = bind(this.setAutoRebind, this);
    this.getRecords = bind(this.getRecords, this);
    this.getRecord = bind(this.getRecord, this);
    this.getOnSuccess = bind(this.getOnSuccess, this);
    this.getOnFailure = bind(this.getOnFailure, this);
    this.getOnComplete = bind(this.getOnComplete, this);
    this.getIsRebind = bind(this.getIsRebind, this);
    this.getAutoRebind = bind(this.getAutoRebind, this);
    var instance, records;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = bindArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    records = arguments[0];
    instance = bindArgs.__super__.constructor.call(this);
    this.setRecords(records);
    return instance;
  }


  /*<span id='method-fm.websync.bindArgs-getAutoRebind'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets whether to call Bind with these args
  	 immediately after a reconnect following a stream failure.
  	 Generally, this should be <c>null</c>. The client will
  	 analyze the current context and set this flag as needed.
  	 However, it can be overridden for special cases. If set
  	 explicitly to <c>false</c>, then the client will assume
  	 that this call to Bind is being invoked from the
  	 OnSuccess callback of another WebSync method call, and
  	 therefore will be called again implicitly after a
  	 network reconnection. If set to
  	 <c>true</c>, then the client will assume this call to
  	 Bind is being invoked as a part of some external
  	 action and will force a Bind call using these arguments
  	 after a network reconnection. Defaults to <c>null</c>.
  	 </div>
  
  	@function getAutoRebind
  	@return {fm.nullable}
   */

  bindArgs.prototype.getAutoRebind = function() {
    return this._autoRebind;
  };

  bindArgs.prototype.getIsRebind = function() {
    return this._isRebind;
  };


  /*<span id='method-fm.websync.bindArgs-getOnComplete'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the callback to invoke after <see cref="fm.websync.bindArgs.onSuccess">fm.websync.bindArgs.onSuccess</see> or <see cref="fm.websync.bindArgs.onFailure">fm.websync.bindArgs.onFailure</see>.
  	 </div>
  
  	@function getOnComplete
  	@return {fm.singleAction}
   */

  bindArgs.prototype.getOnComplete = function() {
    return this._onComplete;
  };


  /*<span id='method-fm.websync.bindArgs-getOnFailure'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the callback to invoke if the request fails.
  	 </div>
  
  	@function getOnFailure
  	@return {fm.singleAction}
   */

  bindArgs.prototype.getOnFailure = function() {
    return this._onFailure;
  };


  /*<span id='method-fm.websync.bindArgs-getOnSuccess'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the callback to invoke if the request succeeds.
  	 </div>
  
  	@function getOnSuccess
  	@return {fm.singleAction}
   */

  bindArgs.prototype.getOnSuccess = function() {
    return this._onSuccess;
  };


  /*<span id='method-fm.websync.bindArgs-getRecord'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the record to bind.
  	 Overrides <see cref="fm.websync.bindArgs.records">fm.websync.bindArgs.records</see>.
  	 </div>
  
  	@function getRecord
  	@return {fm.websync.record}
   */

  bindArgs.prototype.getRecord = function() {
    return fm.websync.extensible.sharedGetRecord(this.__records);
  };


  /*<span id='method-fm.websync.bindArgs-getRecords'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the records to bind.
  	 Overrides <see cref="fm.websync.bindArgs.record">fm.websync.bindArgs.record</see>.
  	 </div>
  
  	@function getRecords
  	@return {fm.array}
   */

  bindArgs.prototype.getRecords = function() {
    return fm.websync.extensible.sharedGetRecords(this.__records);
  };


  /*<span id='method-fm.websync.bindArgs-setAutoRebind'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets whether to call Bind with these args
  	 immediately after a reconnect following a stream failure.
  	 Generally, this should be <c>null</c>. The client will
  	 analyze the current context and set this flag as needed.
  	 However, it can be overridden for special cases. If set
  	 explicitly to <c>false</c>, then the client will assume
  	 that this call to Bind is being invoked from the
  	 OnSuccess callback of another WebSync method call, and
  	 therefore will be called again implicitly after a
  	 network reconnection. If set to
  	 <c>true</c>, then the client will assume this call to
  	 Bind is being invoked as a part of some external
  	 action and will force a Bind call using these arguments
  	 after a network reconnection. Defaults to <c>null</c>.
  	 </div>
  
  	@function setAutoRebind
  	@param {fm.nullable} value
  	@return {void}
   */

  bindArgs.prototype.setAutoRebind = function() {
    var value;
    value = arguments[0];
    return this._autoRebind = value;
  };

  bindArgs.prototype.setIsRebind = function() {
    var value;
    value = arguments[0];
    return this._isRebind = value;
  };


  /*<span id='method-fm.websync.bindArgs-setOnComplete'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the callback to invoke after <see cref="fm.websync.bindArgs.onSuccess">fm.websync.bindArgs.onSuccess</see> or <see cref="fm.websync.bindArgs.onFailure">fm.websync.bindArgs.onFailure</see>.
  	 </div>
  
  	@function setOnComplete
  	@param {fm.singleAction} value
  	@return {void}
   */

  bindArgs.prototype.setOnComplete = function() {
    var value;
    value = arguments[0];
    return this._onComplete = value;
  };


  /*<span id='method-fm.websync.bindArgs-setOnFailure'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the callback to invoke if the request fails.
  	 </div>
  
  	@function setOnFailure
  	@param {fm.singleAction} value
  	@return {void}
   */

  bindArgs.prototype.setOnFailure = function() {
    var value;
    value = arguments[0];
    return this._onFailure = value;
  };


  /*<span id='method-fm.websync.bindArgs-setOnSuccess'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the callback to invoke if the request succeeds.
  	 </div>
  
  	@function setOnSuccess
  	@param {fm.singleAction} value
  	@return {void}
   */

  bindArgs.prototype.setOnSuccess = function() {
    var value;
    value = arguments[0];
    return this._onSuccess = value;
  };


  /*<span id='method-fm.websync.bindArgs-setRecord'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the record to bind.
  	 Overrides <see cref="fm.websync.bindArgs.records">fm.websync.bindArgs.records</see>.
  	 </div>
  
  	@function setRecord
  	@param {fm.websync.record} value
  	@return {void}
   */

  bindArgs.prototype.setRecord = function() {
    var value;
    value = arguments[0];
    return this.__records = fm.websync.extensible.sharedSetRecord(value);
  };


  /*<span id='method-fm.websync.bindArgs-setRecords'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the records to bind.
  	 Overrides <see cref="fm.websync.bindArgs.record">fm.websync.bindArgs.record</see>.
  	 </div>
  
  	@function setRecords
  	@param {fm.array} value
  	@return {void}
   */

  bindArgs.prototype.setRecords = function() {
    var value;
    value = arguments[0];
    return this.__records = fm.websync.extensible.sharedSetRecords(value);
  };

  return bindArgs;

})(fm.websync.baseInputArgs);



/*<span id='cls-fm.websync.serviceArgs'>&nbsp;</span> */

/**
@class fm.websync.serviceArgs
 <div>
 Arguments for client service requests.
 </div>

@extends fm.websync.baseInputArgs
 */
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.serviceArgs = (function(superClass) {
  extend(serviceArgs, superClass);

  serviceArgs.prototype.__channel = null;

  serviceArgs.prototype.__dataBytes = null;

  serviceArgs.prototype.__dataJson = null;

  serviceArgs.prototype._onComplete = null;

  serviceArgs.prototype._onFailure = null;

  serviceArgs.prototype._onSuccess = null;


  /*<span id='method-fm.websync.serviceArgs-fm.websync.serviceArgs'>&nbsp;</span> */


  /**
  	 <div>
  	 Initializes a new instance of the <see cref="fm.websync.serviceArgs">fm.websync.serviceArgs</see> class.
  	 </div>
  	@function fm.websync.serviceArgs
  	@param {String} channel The channel to which the data should be sent.
  	@param {String} dataJson The data to send in JSON format.
  	@param {String} tag The tag that identifies the contents of the payload.
  	@return {}
   */

  function serviceArgs() {
    this.setData = bind(this.setData, this);
    this.getData = bind(this.getData, this);
    this.setTag = bind(this.setTag, this);
    this.setOnSuccess = bind(this.setOnSuccess, this);
    this.setOnFailure = bind(this.setOnFailure, this);
    this.setOnComplete = bind(this.setOnComplete, this);
    this.setDataJson = bind(this.setDataJson, this);
    this.setDataBytes = bind(this.setDataBytes, this);
    this.setChannel = bind(this.setChannel, this);
    this.getTag = bind(this.getTag, this);
    this.getOnSuccess = bind(this.getOnSuccess, this);
    this.getOnFailure = bind(this.getOnFailure, this);
    this.getOnComplete = bind(this.getOnComplete, this);
    this.getIsBinary = bind(this.getIsBinary, this);
    this.getDataJson = bind(this.getDataJson, this);
    this.getDataBytes = bind(this.getDataBytes, this);
    this.getChannel = bind(this.getChannel, this);
    var channel, dataJson, instance, tag;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = serviceArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    if (arguments.length === 3) {
      channel = arguments[0];
      dataJson = arguments[1];
      tag = arguments[2];
      instance = serviceArgs.__super__.constructor.call(this);
      this.setChannel(channel);
      this.setDataJson(dataJson);
      this.setTag(tag);
      return instance;
    }
    if (arguments.length === 2) {
      channel = arguments[0];
      dataJson = arguments[1];
      serviceArgs.call(this, channel, dataJson, null);
      return instance;
    }
  }


  /*<span id='method-fm.websync.serviceArgs-getChannel'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the channel to which the data should be sent.
  	 Must start with a forward slash (/).
  	 </div>
  
  	@function getChannel
  	@return {String}
   */

  serviceArgs.prototype.getChannel = function() {
    return this.__channel;
  };


  /*<span id='method-fm.websync.serviceArgs-getDataBytes'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the data to send in binary format.
  	 (Overrides <see cref="fm.websync.serviceArgs.dataJson">fm.websync.serviceArgs.dataJson</see>.)
  	 </div>
  
  	@function getDataBytes
  	@return {fm.array}
   */

  serviceArgs.prototype.getDataBytes = function() {
    var _var0, _var1, decoded, valueJson;
    decoded = this.__dataBytes;
    valueJson = this.__dataJson;
    if (!fm.global.equals(decoded, null)) {
      return decoded;
    }
    if (!fm.global.equals(valueJson, null)) {
      _var0 = new fm.holder(decoded);
      _var1 = fm.crypto.tryBase64Decode(fm.serializer.deserializeString(valueJson), _var0);
      decoded = _var0.getValue();
      if (!_var1) {
        decoded = null;
      }
      this.__dataBytes = decoded;
      return decoded;
    }
    return null;
  };


  /*<span id='method-fm.websync.serviceArgs-getDataJson'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the data to send in JSON format.
  	 (Overrides <see cref="fm.websync.serviceArgs.dataBytes">fm.websync.serviceArgs.dataBytes</see>.)
  	 </div>
  
  	@function getDataJson
  	@return {String}
   */

  serviceArgs.prototype.getDataJson = function() {
    var b, str;
    str = this.__dataJson;
    b = this.__dataBytes;
    if (!fm.global.equals(str, null)) {
      return str;
    }
    if (!fm.global.equals(b, null)) {
      str = fm.serializer.serializeString(fm.crypto.base64Encode(b));
      this.__dataJson = str;
      return str;
    }
    return null;
  };


  /*<span id='method-fm.websync.serviceArgs-getIsBinary'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets whether or not the data is binary.
  	 </div>
  
  	@function getIsBinary
  	@return {Boolean}
   */

  serviceArgs.prototype.getIsBinary = function() {
    return !fm.global.equals(this.getDataBytes(), null);
  };


  /*<span id='method-fm.websync.serviceArgs-getOnComplete'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the callback to invoke after <see cref="fm.websync.serviceArgs.onSuccess">fm.websync.serviceArgs.onSuccess</see> or <see cref="fm.websync.serviceArgs.onFailure">fm.websync.serviceArgs.onFailure</see>.
  	 </div>
  
  	@function getOnComplete
  	@return {fm.singleAction}
   */

  serviceArgs.prototype.getOnComplete = function() {
    return this._onComplete;
  };


  /*<span id='method-fm.websync.serviceArgs-getOnFailure'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the callback to invoke if the request fails.
  	 </div>
  
  	@function getOnFailure
  	@return {fm.singleAction}
   */

  serviceArgs.prototype.getOnFailure = function() {
    return this._onFailure;
  };


  /*<span id='method-fm.websync.serviceArgs-getOnSuccess'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the callback to invoke if the request succeeds.
  	 </div>
  
  	@function getOnSuccess
  	@return {fm.singleAction}
   */

  serviceArgs.prototype.getOnSuccess = function() {
    return this._onSuccess;
  };


  /*<span id='method-fm.websync.serviceArgs-getTag'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the tag that identifies the contents of the payload.
  	 </div>
  
  	@function getTag
  	@return {String}
   */

  serviceArgs.prototype.getTag = function() {
    return fm.serializer.deserializeString(this.getExtensionValueJson("fm.tag"));
  };


  /*<span id='method-fm.websync.serviceArgs-setChannel'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the channel to which the data should be sent.
  	 Must start with a forward slash (/).
  	 </div>
  
  	@function setChannel
  	@param {String} value
  	@return {void}
   */

  serviceArgs.prototype.setChannel = function() {
    var _var0, _var1, error, value;
    value = arguments[0];
    error = null;
    _var0 = new fm.holder(error);
    _var1 = fm.websync.extensible.validateChannel(value, _var0);
    error = _var0.getValue();
    if (!_var1) {
      throw new Error(fm.stringExtensions.format("Invalid channel. {0}", error));
    }
    return this.__channel = value;
  };


  /*<span id='method-fm.websync.serviceArgs-setDataBytes'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the data to send in binary format.
  	 (Overrides <see cref="fm.websync.serviceArgs.dataJson">fm.websync.serviceArgs.dataJson</see>.)
  	 </div>
  
  	@function setDataBytes
  	@param {fm.array} value
  	@return {void}
   */

  serviceArgs.prototype.setDataBytes = function() {
    var value;
    value = arguments[0];
    this.__dataJson = null;
    return this.__dataBytes = value;
  };


  /*<span id='method-fm.websync.serviceArgs-setDataJson'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the data to send in JSON format.
  	 (Overrides <see cref="fm.websync.serviceArgs.dataBytes">fm.websync.serviceArgs.dataBytes</see>.)
  	 </div>
  
  	@function setDataJson
  	@param {String} value
  	@return {void}
   */

  serviceArgs.prototype.setDataJson = function() {
    var value;
    value = arguments[0];
    if (!((fm.global.equals(value, null)) || fm.serializer.isValidJson(value))) {
      throw new Error("The value is not valid JSON.");
    }
    this.__dataJson = value;
    return this.__dataBytes = null;
  };


  /*<span id='method-fm.websync.serviceArgs-setOnComplete'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the callback to invoke after <see cref="fm.websync.serviceArgs.onSuccess">fm.websync.serviceArgs.onSuccess</see> or <see cref="fm.websync.serviceArgs.onFailure">fm.websync.serviceArgs.onFailure</see>.
  	 </div>
  
  	@function setOnComplete
  	@param {fm.singleAction} value
  	@return {void}
   */

  serviceArgs.prototype.setOnComplete = function() {
    var value;
    value = arguments[0];
    return this._onComplete = value;
  };


  /*<span id='method-fm.websync.serviceArgs-setOnFailure'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the callback to invoke if the request fails.
  	 </div>
  
  	@function setOnFailure
  	@param {fm.singleAction} value
  	@return {void}
   */

  serviceArgs.prototype.setOnFailure = function() {
    var value;
    value = arguments[0];
    return this._onFailure = value;
  };


  /*<span id='method-fm.websync.serviceArgs-setOnSuccess'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the callback to invoke if the request succeeds.
  	 </div>
  
  	@function setOnSuccess
  	@param {fm.singleAction} value
  	@return {void}
   */

  serviceArgs.prototype.setOnSuccess = function() {
    var value;
    value = arguments[0];
    return this._onSuccess = value;
  };


  /*<span id='method-fm.websync.serviceArgs-setTag'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the tag that identifies the contents of the payload.
  	 </div>
  
  	@function setTag
  	@param {String} value
  	@return {void}
   */

  serviceArgs.prototype.setTag = function() {
    var value;
    value = arguments[0];
    return this.setExtensionValueJson("fm.tag", fm.serializer.serializeString(value), false);
  };

  serviceArgs.prototype.getData = function() {
    return fm.json.deserialize(this.getDataJson.apply(this, arguments));
  };

  serviceArgs.prototype.setData = function() {
    var data;
    data = arguments[0];
    arguments[arguments.length - 1] = fm.json.serialize(arguments[arguments.length - 1]);
    return this.setDataJson.apply(this, arguments);
  };

  return serviceArgs;

})(fm.websync.baseInputArgs);



/*<span id='cls-fm.websync.unbindArgs'>&nbsp;</span> */

/**
@class fm.websync.unbindArgs
 <div>
 Arguments for client unbind requests.
 </div>

@extends fm.websync.baseInputArgs
 */
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.unbindArgs = (function(superClass) {
  extend(unbindArgs, superClass);

  unbindArgs.prototype.__records = null;

  unbindArgs.prototype._onComplete = null;

  unbindArgs.prototype._onFailure = null;

  unbindArgs.prototype._onSuccess = null;


  /*<span id='method-fm.websync.unbindArgs-fm.websync.unbindArgs'>&nbsp;</span> */


  /**
  	 <div>
  	 Initializes a new instance of the <see cref="fm.websync.unbindArgs">fm.websync.unbindArgs</see> class.
  	 </div>
  	@function fm.websync.unbindArgs
  	@param {fm.array} records The records to unbind.
  	@return {}
   */

  function unbindArgs() {
    this.setRecords = bind(this.setRecords, this);
    this.setRecord = bind(this.setRecord, this);
    this.setOnSuccess = bind(this.setOnSuccess, this);
    this.setOnFailure = bind(this.setOnFailure, this);
    this.setOnComplete = bind(this.setOnComplete, this);
    this.setKeys = bind(this.setKeys, this);
    this.setKey = bind(this.setKey, this);
    this.getRecords = bind(this.getRecords, this);
    this.getRecord = bind(this.getRecord, this);
    this.getOnSuccess = bind(this.getOnSuccess, this);
    this.getOnFailure = bind(this.getOnFailure, this);
    this.getOnComplete = bind(this.getOnComplete, this);
    this.getKeys = bind(this.getKeys, this);
    this.getKey = bind(this.getKey, this);
    var instance, records;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = unbindArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    records = arguments[0];
    instance = unbindArgs.__super__.constructor.call(this);
    this.setRecords(records);
    return instance;
  }


  /*<span id='method-fm.websync.unbindArgs-getKey'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the record key to unbind.
  	 Overrides <see cref="fm.websync.unbindArgs.keys">fm.websync.unbindArgs.keys</see>, <see cref="fm.websync.unbindArgs.record">fm.websync.unbindArgs.record</see>, and <see cref="fm.websync.unbindArgs.records">fm.websync.unbindArgs.records</see>.
  	 </div>
  
  	@function getKey
  	@return {String}
   */

  unbindArgs.prototype.getKey = function() {
    return fm.websync.extensible.sharedGetKey(this.__records);
  };


  /*<span id='method-fm.websync.unbindArgs-getKeys'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the record keys to unbind.
  	 Overrides <see cref="fm.websync.unbindArgs.key">fm.websync.unbindArgs.key</see>, <see cref="fm.websync.unbindArgs.record">fm.websync.unbindArgs.record</see>, and <see cref="fm.websync.unbindArgs.records">fm.websync.unbindArgs.records</see>.
  	 </div>
  
  	@function getKeys
  	@return {fm.array}
   */

  unbindArgs.prototype.getKeys = function() {
    return fm.websync.extensible.sharedGetKeys(this.__records);
  };


  /*<span id='method-fm.websync.unbindArgs-getOnComplete'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the callback to invoke after <see cref="fm.websync.unbindArgs.onSuccess">fm.websync.unbindArgs.onSuccess</see> or <see cref="fm.websync.unbindArgs.onFailure">fm.websync.unbindArgs.onFailure</see>.
  	 </div>
  
  	@function getOnComplete
  	@return {fm.singleAction}
   */

  unbindArgs.prototype.getOnComplete = function() {
    return this._onComplete;
  };


  /*<span id='method-fm.websync.unbindArgs-getOnFailure'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the callback to invoke if the request fails.
  	 </div>
  
  	@function getOnFailure
  	@return {fm.singleAction}
   */

  unbindArgs.prototype.getOnFailure = function() {
    return this._onFailure;
  };


  /*<span id='method-fm.websync.unbindArgs-getOnSuccess'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the callback to invoke if the request succeeds.
  	 </div>
  
  	@function getOnSuccess
  	@return {fm.singleAction}
   */

  unbindArgs.prototype.getOnSuccess = function() {
    return this._onSuccess;
  };


  /*<span id='method-fm.websync.unbindArgs-getRecord'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the record to unbind.
  	 Overrides <see cref="fm.websync.unbindArgs.records">fm.websync.unbindArgs.records</see>, <see cref="fm.websync.unbindArgs.key">fm.websync.unbindArgs.key</see>, and <see cref="fm.websync.unbindArgs.keys">fm.websync.unbindArgs.keys</see>.
  	 </div>
  
  	@function getRecord
  	@return {fm.websync.record}
   */

  unbindArgs.prototype.getRecord = function() {
    return fm.websync.extensible.sharedGetRecord(this.__records);
  };


  /*<span id='method-fm.websync.unbindArgs-getRecords'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the records to unbind.
  	 Overrides <see cref="fm.websync.unbindArgs.record">fm.websync.unbindArgs.record</see>, <see cref="fm.websync.unbindArgs.key">fm.websync.unbindArgs.key</see>, and <see cref="fm.websync.unbindArgs.keys">fm.websync.unbindArgs.keys</see>.
  	 </div>
  
  	@function getRecords
  	@return {fm.array}
   */

  unbindArgs.prototype.getRecords = function() {
    return fm.websync.extensible.sharedGetRecords(this.__records);
  };


  /*<span id='method-fm.websync.unbindArgs-setKey'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the record key to unbind.
  	 Overrides <see cref="fm.websync.unbindArgs.keys">fm.websync.unbindArgs.keys</see>, <see cref="fm.websync.unbindArgs.record">fm.websync.unbindArgs.record</see>, and <see cref="fm.websync.unbindArgs.records">fm.websync.unbindArgs.records</see>.
  	 </div>
  
  	@function setKey
  	@param {String} value
  	@return {void}
   */

  unbindArgs.prototype.setKey = function() {
    var value;
    value = arguments[0];
    return this.__records = fm.websync.extensible.sharedSetKey(value);
  };


  /*<span id='method-fm.websync.unbindArgs-setKeys'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the record keys to unbind.
  	 Overrides <see cref="fm.websync.unbindArgs.key">fm.websync.unbindArgs.key</see>, <see cref="fm.websync.unbindArgs.record">fm.websync.unbindArgs.record</see>, and <see cref="fm.websync.unbindArgs.records">fm.websync.unbindArgs.records</see>.
  	 </div>
  
  	@function setKeys
  	@param {fm.array} value
  	@return {void}
   */

  unbindArgs.prototype.setKeys = function() {
    var value;
    value = arguments[0];
    return this.__records = fm.websync.extensible.sharedSetKeys(value);
  };


  /*<span id='method-fm.websync.unbindArgs-setOnComplete'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the callback to invoke after <see cref="fm.websync.unbindArgs.onSuccess">fm.websync.unbindArgs.onSuccess</see> or <see cref="fm.websync.unbindArgs.onFailure">fm.websync.unbindArgs.onFailure</see>.
  	 </div>
  
  	@function setOnComplete
  	@param {fm.singleAction} value
  	@return {void}
   */

  unbindArgs.prototype.setOnComplete = function() {
    var value;
    value = arguments[0];
    return this._onComplete = value;
  };


  /*<span id='method-fm.websync.unbindArgs-setOnFailure'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the callback to invoke if the request fails.
  	 </div>
  
  	@function setOnFailure
  	@param {fm.singleAction} value
  	@return {void}
   */

  unbindArgs.prototype.setOnFailure = function() {
    var value;
    value = arguments[0];
    return this._onFailure = value;
  };


  /*<span id='method-fm.websync.unbindArgs-setOnSuccess'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the callback to invoke if the request succeeds.
  	 </div>
  
  	@function setOnSuccess
  	@param {fm.singleAction} value
  	@return {void}
   */

  unbindArgs.prototype.setOnSuccess = function() {
    var value;
    value = arguments[0];
    return this._onSuccess = value;
  };


  /*<span id='method-fm.websync.unbindArgs-setRecord'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the record to unbind.
  	 Overrides <see cref="fm.websync.unbindArgs.records">fm.websync.unbindArgs.records</see>, <see cref="fm.websync.unbindArgs.key">fm.websync.unbindArgs.key</see>, and <see cref="fm.websync.unbindArgs.keys">fm.websync.unbindArgs.keys</see>.
  	 </div>
  
  	@function setRecord
  	@param {fm.websync.record} value
  	@return {void}
   */

  unbindArgs.prototype.setRecord = function() {
    var value;
    value = arguments[0];
    return this.__records = fm.websync.extensible.sharedSetRecord(value);
  };


  /*<span id='method-fm.websync.unbindArgs-setRecords'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the records to unbind.
  	 Overrides <see cref="fm.websync.unbindArgs.record">fm.websync.unbindArgs.record</see>, <see cref="fm.websync.unbindArgs.key">fm.websync.unbindArgs.key</see>, and <see cref="fm.websync.unbindArgs.keys">fm.websync.unbindArgs.keys</see>.
  	 </div>
  
  	@function setRecords
  	@param {fm.array} value
  	@return {void}
   */

  unbindArgs.prototype.setRecords = function() {
    var value;
    value = arguments[0];
    return this.__records = fm.websync.extensible.sharedSetRecords(value);
  };

  return unbindArgs;

})(fm.websync.baseInputArgs);



/*<span id='cls-fm.websync.disconnectArgs'>&nbsp;</span> */

/**
@class fm.websync.disconnectArgs
 <div>
 Arguments for client disconnect requests.
 </div>

@extends fm.websync.baseInputArgs
 */
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.disconnectArgs = (function(superClass) {
  extend(disconnectArgs, superClass);

  disconnectArgs.prototype._onComplete = null;

  function disconnectArgs() {
    this.setOnComplete = bind(this.setOnComplete, this);
    this.getOnComplete = bind(this.getOnComplete, this);
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = disconnectArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = disconnectArgs.__super__.constructor.call(this);
    return instance;
  }


  /*<span id='method-fm.websync.disconnectArgs-getOnComplete'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the callback to invoke after the disconnection is complete.
  	 </div>
  
  	@function getOnComplete
  	@return {fm.singleAction}
   */

  disconnectArgs.prototype.getOnComplete = function() {
    return this._onComplete;
  };


  /*<span id='method-fm.websync.disconnectArgs-setOnComplete'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the callback to invoke after the disconnection is complete.
  	 </div>
  
  	@function setOnComplete
  	@param {fm.singleAction} value
  	@return {void}
   */

  disconnectArgs.prototype.setOnComplete = function() {
    var value;
    value = arguments[0];
    return this._onComplete = value;
  };

  return disconnectArgs;

})(fm.websync.baseInputArgs);



/*<span id='cls-fm.websync.publishArgs'>&nbsp;</span> */

/**
@class fm.websync.publishArgs
 <div>
 Arguments for client publish requests.
 </div>

@extends fm.websync.baseInputArgs
 */
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.publishArgs = (function(superClass) {
  extend(publishArgs, superClass);

  publishArgs.prototype.__channel = null;

  publishArgs.prototype.__dataBytes = null;

  publishArgs.prototype.__dataJson = null;

  publishArgs.prototype._onComplete = null;

  publishArgs.prototype._onFailure = null;

  publishArgs.prototype._onSuccess = null;


  /*<span id='method-fm.websync.publishArgs-fm.websync.publishArgs'>&nbsp;</span> */


  /**
  	 <div>
  	 Initializes a new instance of the <see cref="fm.websync.publishArgs">fm.websync.publishArgs</see> class.
  	 </div>
  	@function fm.websync.publishArgs
  	@param {String} channel The channel to which the data should be sent.
  	@param {String} dataJson The data to send in JSON format.
  	@param {String} tag The tag that identifies the contents of the payload.
  	@return {}
   */

  function publishArgs() {
    this.setData = bind(this.setData, this);
    this.getData = bind(this.getData, this);
    this.setTag = bind(this.setTag, this);
    this.setOnSuccess = bind(this.setOnSuccess, this);
    this.setOnFailure = bind(this.setOnFailure, this);
    this.setOnComplete = bind(this.setOnComplete, this);
    this.setDataJson = bind(this.setDataJson, this);
    this.setDataBytes = bind(this.setDataBytes, this);
    this.setChannel = bind(this.setChannel, this);
    this.getTag = bind(this.getTag, this);
    this.getOnSuccess = bind(this.getOnSuccess, this);
    this.getOnFailure = bind(this.getOnFailure, this);
    this.getOnComplete = bind(this.getOnComplete, this);
    this.getIsBinary = bind(this.getIsBinary, this);
    this.getDataJson = bind(this.getDataJson, this);
    this.getDataBytes = bind(this.getDataBytes, this);
    this.getChannel = bind(this.getChannel, this);
    var channel, dataJson, instance, tag;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = publishArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    if (arguments.length === 3) {
      channel = arguments[0];
      dataJson = arguments[1];
      tag = arguments[2];
      instance = publishArgs.__super__.constructor.call(this);
      this.setChannel(channel);
      this.setDataJson(dataJson);
      this.setTag(tag);
      return instance;
    }
    if (arguments.length === 2) {
      channel = arguments[0];
      dataJson = arguments[1];
      publishArgs.call(this, channel, dataJson, null);
      return instance;
    }
  }


  /*<span id='method-fm.websync.publishArgs-getChannel'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the channel to which the data should be sent.
  	 Must start with a forward slash (/).
  	 </div>
  
  	@function getChannel
  	@return {String}
   */

  publishArgs.prototype.getChannel = function() {
    return this.__channel;
  };


  /*<span id='method-fm.websync.publishArgs-getDataBytes'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the data to send in binary format.
  	 (Overrides <see cref="fm.websync.publishArgs.dataJson">fm.websync.publishArgs.dataJson</see>.)
  	 </div>
  
  	@function getDataBytes
  	@return {fm.array}
   */

  publishArgs.prototype.getDataBytes = function() {
    var _var0, _var1, decoded, valueJson;
    decoded = this.__dataBytes;
    valueJson = this.__dataJson;
    if (!fm.global.equals(decoded, null)) {
      return decoded;
    }
    if (!fm.global.equals(valueJson, null)) {
      _var0 = new fm.holder(decoded);
      _var1 = fm.crypto.tryBase64Decode(fm.serializer.deserializeString(valueJson), _var0);
      decoded = _var0.getValue();
      if (!_var1) {
        decoded = null;
      }
      this.__dataBytes = decoded;
      return decoded;
    }
    return null;
  };


  /*<span id='method-fm.websync.publishArgs-getDataJson'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the data to send in JSON format.
  	 (Overrides <see cref="fm.websync.publishArgs.dataBytes">fm.websync.publishArgs.dataBytes</see>.)
  	 </div>
  
  	@function getDataJson
  	@return {String}
   */

  publishArgs.prototype.getDataJson = function() {
    var b, str;
    str = this.__dataJson;
    b = this.__dataBytes;
    if (!fm.global.equals(str, null)) {
      return str;
    }
    if (!fm.global.equals(b, null)) {
      str = fm.serializer.serializeString(fm.crypto.base64Encode(b));
      this.__dataJson = str;
      return str;
    }
    return null;
  };


  /*<span id='method-fm.websync.publishArgs-getIsBinary'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets whether or not the data is binary.
  	 </div>
  
  	@function getIsBinary
  	@return {Boolean}
   */

  publishArgs.prototype.getIsBinary = function() {
    return !fm.global.equals(this.getDataBytes(), null);
  };


  /*<span id='method-fm.websync.publishArgs-getOnComplete'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the callback to invoke after <see cref="fm.websync.publishArgs.onSuccess">fm.websync.publishArgs.onSuccess</see> or <see cref="fm.websync.publishArgs.onFailure">fm.websync.publishArgs.onFailure</see>.
  	 </div>
  
  	@function getOnComplete
  	@return {fm.singleAction}
   */

  publishArgs.prototype.getOnComplete = function() {
    return this._onComplete;
  };


  /*<span id='method-fm.websync.publishArgs-getOnFailure'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the callback to invoke if the request fails.
  	 </div>
  
  	@function getOnFailure
  	@return {fm.singleAction}
   */

  publishArgs.prototype.getOnFailure = function() {
    return this._onFailure;
  };


  /*<span id='method-fm.websync.publishArgs-getOnSuccess'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the callback to invoke if the request succeeds.
  	 </div>
  
  	@function getOnSuccess
  	@return {fm.singleAction}
   */

  publishArgs.prototype.getOnSuccess = function() {
    return this._onSuccess;
  };


  /*<span id='method-fm.websync.publishArgs-getTag'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the tag that identifies the contents of the payload.
  	 </div>
  
  	@function getTag
  	@return {String}
   */

  publishArgs.prototype.getTag = function() {
    return fm.serializer.deserializeString(this.getExtensionValueJson("fm.tag"));
  };


  /*<span id='method-fm.websync.publishArgs-setChannel'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the channel to which the data should be sent.
  	 Must start with a forward slash (/).
  	 </div>
  
  	@function setChannel
  	@param {String} value
  	@return {void}
   */

  publishArgs.prototype.setChannel = function() {
    var _var0, _var1, error, value;
    value = arguments[0];
    error = null;
    _var0 = new fm.holder(error);
    _var1 = fm.websync.extensible.validateChannel(value, _var0);
    error = _var0.getValue();
    if (!_var1) {
      throw new Error(fm.stringExtensions.format("Invalid channel. {0}", error));
    }
    return this.__channel = value;
  };


  /*<span id='method-fm.websync.publishArgs-setDataBytes'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the data to send in binary format.
  	 (Overrides <see cref="fm.websync.publishArgs.dataJson">fm.websync.publishArgs.dataJson</see>.)
  	 </div>
  
  	@function setDataBytes
  	@param {fm.array} value
  	@return {void}
   */

  publishArgs.prototype.setDataBytes = function() {
    var value;
    value = arguments[0];
    this.__dataJson = null;
    return this.__dataBytes = value;
  };


  /*<span id='method-fm.websync.publishArgs-setDataJson'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the data to send in JSON format.
  	 (Overrides <see cref="fm.websync.publishArgs.dataBytes">fm.websync.publishArgs.dataBytes</see>.)
  	 </div>
  
  	@function setDataJson
  	@param {String} value
  	@return {void}
   */

  publishArgs.prototype.setDataJson = function() {
    var value;
    value = arguments[0];
    if (!((fm.global.equals(value, null)) || fm.serializer.isValidJson(value))) {
      throw new Error("The value is not valid JSON.");
    }
    this.__dataJson = value;
    return this.__dataBytes = null;
  };


  /*<span id='method-fm.websync.publishArgs-setOnComplete'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the callback to invoke after <see cref="fm.websync.publishArgs.onSuccess">fm.websync.publishArgs.onSuccess</see> or <see cref="fm.websync.publishArgs.onFailure">fm.websync.publishArgs.onFailure</see>.
  	 </div>
  
  	@function setOnComplete
  	@param {fm.singleAction} value
  	@return {void}
   */

  publishArgs.prototype.setOnComplete = function() {
    var value;
    value = arguments[0];
    return this._onComplete = value;
  };


  /*<span id='method-fm.websync.publishArgs-setOnFailure'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the callback to invoke if the request fails.
  	 </div>
  
  	@function setOnFailure
  	@param {fm.singleAction} value
  	@return {void}
   */

  publishArgs.prototype.setOnFailure = function() {
    var value;
    value = arguments[0];
    return this._onFailure = value;
  };


  /*<span id='method-fm.websync.publishArgs-setOnSuccess'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the callback to invoke if the request succeeds.
  	 </div>
  
  	@function setOnSuccess
  	@param {fm.singleAction} value
  	@return {void}
   */

  publishArgs.prototype.setOnSuccess = function() {
    var value;
    value = arguments[0];
    return this._onSuccess = value;
  };


  /*<span id='method-fm.websync.publishArgs-setTag'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the tag that identifies the contents of the payload.
  	 </div>
  
  	@function setTag
  	@param {String} value
  	@return {void}
   */

  publishArgs.prototype.setTag = function() {
    var value;
    value = arguments[0];
    return this.setExtensionValueJson("fm.tag", fm.serializer.serializeString(value), false);
  };

  publishArgs.prototype.getData = function() {
    return fm.json.deserialize(this.getDataJson.apply(this, arguments));
  };

  publishArgs.prototype.setData = function() {
    var data;
    data = arguments[0];
    arguments[arguments.length - 1] = fm.json.serialize(arguments[arguments.length - 1]);
    return this.setDataJson.apply(this, arguments);
  };

  return publishArgs;

})(fm.websync.baseInputArgs);



/*<span id='cls-fm.websync.subscribeArgs'>&nbsp;</span> */

/**
@class fm.websync.subscribeArgs
 <div>
 Arguments for client subscribe requests.
 </div>

@extends fm.websync.baseInputArgs
 */
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.subscribeArgs = (function(superClass) {
  extend(subscribeArgs, superClass);

  subscribeArgs.prototype.__channels = null;

  subscribeArgs.prototype._autoResubscribe = null;

  subscribeArgs.prototype._isResubscribe = false;

  subscribeArgs.prototype._onComplete = null;

  subscribeArgs.prototype._onFailure = null;

  subscribeArgs.prototype._onReceive = null;

  subscribeArgs.prototype._onSuccess = null;


  /*<span id='method-fm.websync.subscribeArgs-fm.websync.subscribeArgs'>&nbsp;</span> */


  /**
  	 <div>
  	 Initializes a new instance of the <see cref="fm.websync.subscribeArgs">fm.websync.subscribeArgs</see> class.
  	 </div>
  	@function fm.websync.subscribeArgs
  	@param {fm.array} channels The channels to subscribe.
  	@param {String} tag The tag identifying the subscription.
  	@return {}
   */

  function subscribeArgs() {
    this.setTag = bind(this.setTag, this);
    this.setOnSuccess = bind(this.setOnSuccess, this);
    this.setOnReceive = bind(this.setOnReceive, this);
    this.setOnFailure = bind(this.setOnFailure, this);
    this.setOnComplete = bind(this.setOnComplete, this);
    this.setIsResubscribe = bind(this.setIsResubscribe, this);
    this.setChannels = bind(this.setChannels, this);
    this.setChannel = bind(this.setChannel, this);
    this.setAutoResubscribe = bind(this.setAutoResubscribe, this);
    this.getTag = bind(this.getTag, this);
    this.getOnSuccess = bind(this.getOnSuccess, this);
    this.getOnReceive = bind(this.getOnReceive, this);
    this.getOnFailure = bind(this.getOnFailure, this);
    this.getOnComplete = bind(this.getOnComplete, this);
    this.getIsResubscribe = bind(this.getIsResubscribe, this);
    this.getChannels = bind(this.getChannels, this);
    this.getChannel = bind(this.getChannel, this);
    this.getAutoResubscribe = bind(this.getAutoResubscribe, this);
    var channels, instance, tag;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = subscribeArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    if (arguments.length === 2) {
      channels = arguments[0];
      tag = arguments[1];
      instance = subscribeArgs.__super__.constructor.call(this);
      this.setChannels(channels);
      this.setTag(tag);
      return instance;
    }
    if (arguments.length === 1) {
      channels = arguments[0];
      instance = subscribeArgs.__super__.constructor.call(this);
      this.setChannels(channels);
      return instance;
    }
  }


  /*<span id='method-fm.websync.subscribeArgs-getAutoResubscribe'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets whether to call Subscribe with these args
  	 immediately after a reconnect following a stream failure.
  	 Generally, this should be <c>null</c>. The client will
  	 analyze the current context and set this flag as needed.
  	 However, it can be overridden for special cases. If set
  	 explicitly to <c>false</c>, then the client will assume
  	 that this call to Subscribe is being invoked from the
  	 OnSuccess callback of another WebSync method call, and
  	 therefore will be called again implicitly after a
  	 network reconnection. If set to
  	 <c>true</c>, then the client will assume this call to
  	 Subscribe is being invoked as a part of some external
  	 action and will force a Subscribe call using these arguments
  	 after a network reconnection. Defaults to <c>null</c>.
  	 </div>
  
  	@function getAutoResubscribe
  	@return {fm.nullable}
   */

  subscribeArgs.prototype.getAutoResubscribe = function() {
    return this._autoResubscribe;
  };


  /*<span id='method-fm.websync.subscribeArgs-getChannel'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the channel to which the client should be subscribed.
  	 Must start with a forward slash (/).
  	 Overrides <see cref="fm.websync.subscribeArgs.channels">fm.websync.subscribeArgs.channels</see>.
  	 </div>
  
  	@function getChannel
  	@return {String}
   */

  subscribeArgs.prototype.getChannel = function() {
    return fm.websync.extensible.sharedGetChannel(this.__channels);
  };


  /*<span id='method-fm.websync.subscribeArgs-getChannels'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the channels to which the client should be subscribed.
  	 Each must start with a forward slash (/).
  	 Overrides <see cref="fm.websync.subscribeArgs.channel">fm.websync.subscribeArgs.channel</see>.
  	 </div>
  
  	@function getChannels
  	@return {fm.array}
   */

  subscribeArgs.prototype.getChannels = function() {
    return fm.websync.extensible.sharedGetChannels(this.__channels);
  };

  subscribeArgs.prototype.getIsResubscribe = function() {
    return this._isResubscribe;
  };


  /*<span id='method-fm.websync.subscribeArgs-getOnComplete'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the callback to invoke after <see cref="fm.websync.subscribeArgs.onSuccess">fm.websync.subscribeArgs.onSuccess</see> or <see cref="fm.websync.subscribeArgs.onFailure">fm.websync.subscribeArgs.onFailure</see>.
  	 </div>
  
  	@function getOnComplete
  	@return {fm.singleAction}
   */

  subscribeArgs.prototype.getOnComplete = function() {
    return this._onComplete;
  };


  /*<span id='method-fm.websync.subscribeArgs-getOnFailure'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the callback to invoke if the request fails.
  	 </div>
  
  	@function getOnFailure
  	@return {fm.singleAction}
   */

  subscribeArgs.prototype.getOnFailure = function() {
    return this._onFailure;
  };


  /*<span id='method-fm.websync.subscribeArgs-getOnReceive'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the callback to invoke when data is received on the channel(s).
  	 See <see cref="fm.websync.subscribeReceiveArgs">fm.websync.subscribeReceiveArgs</see> for callback argument details.
  	 </div>
  
  	@function getOnReceive
  	@return {fm.singleAction}
   */

  subscribeArgs.prototype.getOnReceive = function() {
    return this._onReceive;
  };


  /*<span id='method-fm.websync.subscribeArgs-getOnSuccess'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the callback to invoke if the request succeeds.
  	 </div>
  
  	@function getOnSuccess
  	@return {fm.singleAction}
   */

  subscribeArgs.prototype.getOnSuccess = function() {
    return this._onSuccess;
  };


  /*<span id='method-fm.websync.subscribeArgs-getTag'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets a tag that will uniquely identify this subscription so it
  	 can be unsubscribed later without affecting other subscriptions with the same channel.
  	 </div>
  
  	@function getTag
  	@return {String}
   */

  subscribeArgs.prototype.getTag = function() {
    var ref;
    return (ref = fm.serializer.deserializeString(this.getExtensionValueJson("fm.tag"))) != null ? ref : fm.stringExtensions.empty;
  };


  /*<span id='method-fm.websync.subscribeArgs-setAutoResubscribe'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets whether to call Subscribe with these args
  	 immediately after a reconnect following a stream failure.
  	 Generally, this should be <c>null</c>. The client will
  	 analyze the current context and set this flag as needed.
  	 However, it can be overridden for special cases. If set
  	 explicitly to <c>false</c>, then the client will assume
  	 that this call to Subscribe is being invoked from the
  	 OnSuccess callback of another WebSync method call, and
  	 therefore will be called again implicitly after a
  	 network reconnection. If set to
  	 <c>true</c>, then the client will assume this call to
  	 Subscribe is being invoked as a part of some external
  	 action and will force a Subscribe call using these arguments
  	 after a network reconnection. Defaults to <c>null</c>.
  	 </div>
  
  	@function setAutoResubscribe
  	@param {fm.nullable} value
  	@return {void}
   */

  subscribeArgs.prototype.setAutoResubscribe = function() {
    var value;
    value = arguments[0];
    return this._autoResubscribe = value;
  };


  /*<span id='method-fm.websync.subscribeArgs-setChannel'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the channel to which the client should be subscribed.
  	 Must start with a forward slash (/).
  	 Overrides <see cref="fm.websync.subscribeArgs.channels">fm.websync.subscribeArgs.channels</see>.
  	 </div>
  
  	@function setChannel
  	@param {String} value
  	@return {void}
   */

  subscribeArgs.prototype.setChannel = function() {
    var value;
    value = arguments[0];
    return this.__channels = fm.websync.extensible.sharedSetChannel(value);
  };


  /*<span id='method-fm.websync.subscribeArgs-setChannels'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the channels to which the client should be subscribed.
  	 Each must start with a forward slash (/).
  	 Overrides <see cref="fm.websync.subscribeArgs.channel">fm.websync.subscribeArgs.channel</see>.
  	 </div>
  
  	@function setChannels
  	@param {fm.array} value
  	@return {void}
   */

  subscribeArgs.prototype.setChannels = function() {
    var value;
    value = arguments[0];
    return this.__channels = fm.websync.extensible.sharedSetChannels(value);
  };

  subscribeArgs.prototype.setIsResubscribe = function() {
    var value;
    value = arguments[0];
    return this._isResubscribe = value;
  };


  /*<span id='method-fm.websync.subscribeArgs-setOnComplete'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the callback to invoke after <see cref="fm.websync.subscribeArgs.onSuccess">fm.websync.subscribeArgs.onSuccess</see> or <see cref="fm.websync.subscribeArgs.onFailure">fm.websync.subscribeArgs.onFailure</see>.
  	 </div>
  
  	@function setOnComplete
  	@param {fm.singleAction} value
  	@return {void}
   */

  subscribeArgs.prototype.setOnComplete = function() {
    var value;
    value = arguments[0];
    return this._onComplete = value;
  };


  /*<span id='method-fm.websync.subscribeArgs-setOnFailure'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the callback to invoke if the request fails.
  	 </div>
  
  	@function setOnFailure
  	@param {fm.singleAction} value
  	@return {void}
   */

  subscribeArgs.prototype.setOnFailure = function() {
    var value;
    value = arguments[0];
    return this._onFailure = value;
  };


  /*<span id='method-fm.websync.subscribeArgs-setOnReceive'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the callback to invoke when data is received on the channel(s).
  	 See <see cref="fm.websync.subscribeReceiveArgs">fm.websync.subscribeReceiveArgs</see> for callback argument details.
  	 </div>
  
  	@function setOnReceive
  	@param {fm.singleAction} value
  	@return {void}
   */

  subscribeArgs.prototype.setOnReceive = function() {
    var value;
    value = arguments[0];
    return this._onReceive = value;
  };


  /*<span id='method-fm.websync.subscribeArgs-setOnSuccess'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the callback to invoke if the request succeeds.
  	 </div>
  
  	@function setOnSuccess
  	@param {fm.singleAction} value
  	@return {void}
   */

  subscribeArgs.prototype.setOnSuccess = function() {
    var value;
    value = arguments[0];
    return this._onSuccess = value;
  };


  /*<span id='method-fm.websync.subscribeArgs-setTag'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets a tag that will uniquely identify this subscription so it
  	 can be unsubscribed later without affecting other subscriptions with the same channel.
  	 </div>
  
  	@function setTag
  	@param {String} value
  	@return {void}
   */

  subscribeArgs.prototype.setTag = function() {
    var value;
    value = arguments[0];
    return this.setExtensionValueJson("fm.tag", fm.serializer.serializeString(value != null ? value : fm.stringExtensions.empty), false);
  };

  return subscribeArgs;

})(fm.websync.baseInputArgs);



/*<span id='cls-fm.websync.unsubscribeArgs'>&nbsp;</span> */

/**
@class fm.websync.unsubscribeArgs
 <div>
 Arguments for client unsubscribe requests.
 </div>

@extends fm.websync.baseInputArgs
 */
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.unsubscribeArgs = (function(superClass) {
  extend(unsubscribeArgs, superClass);

  unsubscribeArgs.prototype.__channels = null;

  unsubscribeArgs.prototype._onComplete = null;

  unsubscribeArgs.prototype._onFailure = null;

  unsubscribeArgs.prototype._onSuccess = null;


  /*<span id='method-fm.websync.unsubscribeArgs-fm.websync.unsubscribeArgs'>&nbsp;</span> */


  /**
  	 <div>
  	 Initializes a new instance of the <see cref="fm.websync.unsubscribeArgs">fm.websync.unsubscribeArgs</see> class.
  	 </div>
  	@function fm.websync.unsubscribeArgs
  	@param {fm.array} channels The channels to unsubscribe.
  	@param {String} tag The tag identifying the subscription.
  	@return {}
   */

  function unsubscribeArgs() {
    this.setTag = bind(this.setTag, this);
    this.setOnSuccess = bind(this.setOnSuccess, this);
    this.setOnFailure = bind(this.setOnFailure, this);
    this.setOnComplete = bind(this.setOnComplete, this);
    this.setChannels = bind(this.setChannels, this);
    this.setChannel = bind(this.setChannel, this);
    this.getTag = bind(this.getTag, this);
    this.getOnSuccess = bind(this.getOnSuccess, this);
    this.getOnFailure = bind(this.getOnFailure, this);
    this.getOnComplete = bind(this.getOnComplete, this);
    this.getChannels = bind(this.getChannels, this);
    this.getChannel = bind(this.getChannel, this);
    var channels, instance, tag;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = unsubscribeArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    if (arguments.length === 2) {
      channels = arguments[0];
      tag = arguments[1];
      instance = unsubscribeArgs.__super__.constructor.call(this);
      this.setChannels(channels);
      this.setTag(tag);
      return instance;
    }
    if (arguments.length === 1) {
      channels = arguments[0];
      instance = unsubscribeArgs.__super__.constructor.call(this);
      this.setChannels(channels);
      return instance;
    }
  }


  /*<span id='method-fm.websync.unsubscribeArgs-getChannel'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the channel from which the client should be unsubscribed.
  	 Must start with a forward slash (/).
  	 Overrides <see cref="fm.websync.unsubscribeArgs.channels">fm.websync.unsubscribeArgs.channels</see>.
  	 </div>
  
  	@function getChannel
  	@return {String}
   */

  unsubscribeArgs.prototype.getChannel = function() {
    return fm.websync.extensible.sharedGetChannel(this.__channels);
  };


  /*<span id='method-fm.websync.unsubscribeArgs-getChannels'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the channels from which the client should be unsubscribed.
  	 Each must start with a forward slash (/).
  	 Overrides <see cref="fm.websync.unsubscribeArgs.channel">fm.websync.unsubscribeArgs.channel</see>.
  	 </div>
  
  	@function getChannels
  	@return {fm.array}
   */

  unsubscribeArgs.prototype.getChannels = function() {
    return fm.websync.extensible.sharedGetChannels(this.__channels);
  };


  /*<span id='method-fm.websync.unsubscribeArgs-getOnComplete'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the callback to invoke after <see cref="fm.websync.unsubscribeArgs.onSuccess">fm.websync.unsubscribeArgs.onSuccess</see> or <see cref="fm.websync.unsubscribeArgs.onFailure">fm.websync.unsubscribeArgs.onFailure</see>.
  	 </div>
  
  	@function getOnComplete
  	@return {fm.singleAction}
   */

  unsubscribeArgs.prototype.getOnComplete = function() {
    return this._onComplete;
  };


  /*<span id='method-fm.websync.unsubscribeArgs-getOnFailure'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the callback to invoke if the request fails.
  	 </div>
  
  	@function getOnFailure
  	@return {fm.singleAction}
   */

  unsubscribeArgs.prototype.getOnFailure = function() {
    return this._onFailure;
  };


  /*<span id='method-fm.websync.unsubscribeArgs-getOnSuccess'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the callback to invoke if the request succeeds.
  	 </div>
  
  	@function getOnSuccess
  	@return {fm.singleAction}
   */

  unsubscribeArgs.prototype.getOnSuccess = function() {
    return this._onSuccess;
  };


  /*<span id='method-fm.websync.unsubscribeArgs-getTag'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets a tag that uniquely identifies a subscription so
  	 other subscriptions with the same channel are not affected.
  	 </div>
  
  	@function getTag
  	@return {String}
   */

  unsubscribeArgs.prototype.getTag = function() {
    var ref;
    return (ref = fm.serializer.deserializeString(this.getExtensionValueJson("fm.tag"))) != null ? ref : fm.stringExtensions.empty;
  };


  /*<span id='method-fm.websync.unsubscribeArgs-setChannel'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the channel from which the client should be unsubscribed.
  	 Must start with a forward slash (/).
  	 Overrides <see cref="fm.websync.unsubscribeArgs.channels">fm.websync.unsubscribeArgs.channels</see>.
  	 </div>
  
  	@function setChannel
  	@param {String} value
  	@return {void}
   */

  unsubscribeArgs.prototype.setChannel = function() {
    var value;
    value = arguments[0];
    return this.__channels = fm.websync.extensible.sharedSetChannel(value);
  };


  /*<span id='method-fm.websync.unsubscribeArgs-setChannels'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the channels from which the client should be unsubscribed.
  	 Each must start with a forward slash (/).
  	 Overrides <see cref="fm.websync.unsubscribeArgs.channel">fm.websync.unsubscribeArgs.channel</see>.
  	 </div>
  
  	@function setChannels
  	@param {fm.array} value
  	@return {void}
   */

  unsubscribeArgs.prototype.setChannels = function() {
    var value;
    value = arguments[0];
    return this.__channels = fm.websync.extensible.sharedSetChannels(value);
  };


  /*<span id='method-fm.websync.unsubscribeArgs-setOnComplete'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the callback to invoke after <see cref="fm.websync.unsubscribeArgs.onSuccess">fm.websync.unsubscribeArgs.onSuccess</see> or <see cref="fm.websync.unsubscribeArgs.onFailure">fm.websync.unsubscribeArgs.onFailure</see>.
  	 </div>
  
  	@function setOnComplete
  	@param {fm.singleAction} value
  	@return {void}
   */

  unsubscribeArgs.prototype.setOnComplete = function() {
    var value;
    value = arguments[0];
    return this._onComplete = value;
  };


  /*<span id='method-fm.websync.unsubscribeArgs-setOnFailure'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the callback to invoke if the request fails.
  	 </div>
  
  	@function setOnFailure
  	@param {fm.singleAction} value
  	@return {void}
   */

  unsubscribeArgs.prototype.setOnFailure = function() {
    var value;
    value = arguments[0];
    return this._onFailure = value;
  };


  /*<span id='method-fm.websync.unsubscribeArgs-setOnSuccess'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the callback to invoke if the request succeeds.
  	 </div>
  
  	@function setOnSuccess
  	@param {fm.singleAction} value
  	@return {void}
   */

  unsubscribeArgs.prototype.setOnSuccess = function() {
    var value;
    value = arguments[0];
    return this._onSuccess = value;
  };


  /*<span id='method-fm.websync.unsubscribeArgs-setTag'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets a tag that uniquely identifies a subscription so
  	 other subscriptions with the same channel are not affected.
  	 </div>
  
  	@function setTag
  	@param {String} value
  	@return {void}
   */

  unsubscribeArgs.prototype.setTag = function() {
    var value;
    value = arguments[0];
    return this.setExtensionValueJson("fm.tag", fm.serializer.serializeString(value != null ? value : fm.stringExtensions.empty), false);
  };

  return unsubscribeArgs;

})(fm.websync.baseInputArgs);



/*<span id='cls-fm.websync.connectCompleteArgs'>&nbsp;</span> */

/**
@class fm.websync.connectCompleteArgs
 <div>
 Arguments for connect complete callbacks.
 </div>

@extends fm.websync.baseCompleteArgs
 */
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.connectCompleteArgs = (function(superClass) {
  extend(connectCompleteArgs, superClass);

  connectCompleteArgs.prototype._isReconnect = false;

  function connectCompleteArgs() {
    this.setIsReconnect = bind(this.setIsReconnect, this);
    this.getIsReconnect = bind(this.getIsReconnect, this);
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = connectCompleteArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = connectCompleteArgs.__super__.constructor.call(this);
    return instance;
  }


  /*<span id='method-fm.websync.connectCompleteArgs-getIsReconnect'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets whether the connect call was automatically
  	 invoked following a stream failure.
  	 </div>
  
  	@function getIsReconnect
  	@return {Boolean}
   */

  connectCompleteArgs.prototype.getIsReconnect = function() {
    return this._isReconnect;
  };

  connectCompleteArgs.prototype.setIsReconnect = function() {
    var value;
    value = arguments[0];
    return this._isReconnect = value;
  };

  return connectCompleteArgs;

})(fm.websync.baseCompleteArgs);



/*<span id='cls-fm.websync.bindCompleteArgs'>&nbsp;</span> */

/**
@class fm.websync.bindCompleteArgs
 <div>
 Arguments for bind complete callbacks.
 </div>

@extends fm.websync.baseCompleteArgs
 */
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.bindCompleteArgs = (function(superClass) {
  extend(bindCompleteArgs, superClass);

  bindCompleteArgs.prototype._isRebind = false;

  function bindCompleteArgs() {
    this.setIsRebind = bind(this.setIsRebind, this);
    this.getIsRebind = bind(this.getIsRebind, this);
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = bindCompleteArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = bindCompleteArgs.__super__.constructor.call(this);
    return instance;
  }


  /*<span id='method-fm.websync.bindCompleteArgs-getIsRebind'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets whether the bind call was automatically
  	 invoked following a stream failure.
  	 </div>
  
  	@function getIsRebind
  	@return {Boolean}
   */

  bindCompleteArgs.prototype.getIsRebind = function() {
    return this._isRebind;
  };

  bindCompleteArgs.prototype.setIsRebind = function() {
    var value;
    value = arguments[0];
    return this._isRebind = value;
  };

  return bindCompleteArgs;

})(fm.websync.baseCompleteArgs);



/*<span id='cls-fm.websync.serviceCompleteArgs'>&nbsp;</span> */

/**
@class fm.websync.serviceCompleteArgs
 <div>
 Arguments for service complete callbacks.
 </div>

@extends fm.websync.baseCompleteArgs
 */
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.serviceCompleteArgs = (function(superClass) {
  extend(serviceCompleteArgs, superClass);

  function serviceCompleteArgs() {
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = serviceCompleteArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = serviceCompleteArgs.__super__.constructor.call(this);
    return instance;
  }

  return serviceCompleteArgs;

})(fm.websync.baseCompleteArgs);



/*<span id='cls-fm.websync.unbindCompleteArgs'>&nbsp;</span> */

/**
@class fm.websync.unbindCompleteArgs
 <div>
 Arguments for unbind complete callbacks.
 </div>

@extends fm.websync.baseCompleteArgs
 */
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.unbindCompleteArgs = (function(superClass) {
  extend(unbindCompleteArgs, superClass);

  unbindCompleteArgs.prototype.__forced = false;

  function unbindCompleteArgs() {
    this.getForced = bind(this.getForced, this);
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = unbindCompleteArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = unbindCompleteArgs.__super__.constructor.call(this);
    return instance;
  }


  /*<span id='method-fm.websync.unbindCompleteArgs-getForced'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets whether this unbind was forced due to a disconnect.
  	 </div>
  
  	@function getForced
  	@return {Boolean}
   */

  unbindCompleteArgs.prototype.getForced = function() {
    return this.__forced;
  };

  return unbindCompleteArgs;

})(fm.websync.baseCompleteArgs);



/*<span id='cls-fm.websync.disconnectCompleteArgs'>&nbsp;</span> */

/**
@class fm.websync.disconnectCompleteArgs
 <div>
 Arguments for disconnect complete callbacks.
 </div>

@extends fm.websync.baseCompleteArgs
 */
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.disconnectCompleteArgs = (function(superClass) {
  extend(disconnectCompleteArgs, superClass);

  disconnectCompleteArgs.prototype._exception = null;

  function disconnectCompleteArgs() {
    this.setException = bind(this.setException, this);
    this.getException = bind(this.getException, this);
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = disconnectCompleteArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = disconnectCompleteArgs.__super__.constructor.call(this);
    return instance;
  }


  /*<span id='method-fm.websync.disconnectCompleteArgs-getException'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the exception that was thrown while disconnecting.
  	 Will be <c>null</c> if the disconnect was performed gracefully.
  	 </div>
  
  	@function getException
  	@return {Error}
   */

  disconnectCompleteArgs.prototype.getException = function() {
    return this._exception;
  };

  disconnectCompleteArgs.prototype.setException = function() {
    var value;
    value = arguments[0];
    return this._exception = value;
  };

  return disconnectCompleteArgs;

})(fm.websync.baseCompleteArgs);



/*<span id='cls-fm.websync.publishCompleteArgs'>&nbsp;</span> */

/**
@class fm.websync.publishCompleteArgs
 <div>
 Arguments for publish complete callbacks.
 </div>

@extends fm.websync.baseCompleteArgs
 */
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.publishCompleteArgs = (function(superClass) {
  extend(publishCompleteArgs, superClass);

  function publishCompleteArgs() {
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = publishCompleteArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = publishCompleteArgs.__super__.constructor.call(this);
    return instance;
  }

  return publishCompleteArgs;

})(fm.websync.baseCompleteArgs);



/*<span id='cls-fm.websync.subscribeCompleteArgs'>&nbsp;</span> */

/**
@class fm.websync.subscribeCompleteArgs
 <div>
 Arguments for subscribe complete callbacks.
 </div>

@extends fm.websync.baseCompleteArgs
 */
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.subscribeCompleteArgs = (function(superClass) {
  extend(subscribeCompleteArgs, superClass);

  subscribeCompleteArgs.prototype._isResubscribe = false;

  function subscribeCompleteArgs() {
    this.setIsResubscribe = bind(this.setIsResubscribe, this);
    this.getIsResubscribe = bind(this.getIsResubscribe, this);
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = subscribeCompleteArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = subscribeCompleteArgs.__super__.constructor.call(this);
    return instance;
  }


  /*<span id='method-fm.websync.subscribeCompleteArgs-getIsResubscribe'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets whether the subscribe call was automatically
  	 invoked following a stream failure.
  	 </div>
  
  	@function getIsResubscribe
  	@return {Boolean}
   */

  subscribeCompleteArgs.prototype.getIsResubscribe = function() {
    return this._isResubscribe;
  };

  subscribeCompleteArgs.prototype.setIsResubscribe = function() {
    var value;
    value = arguments[0];
    return this._isResubscribe = value;
  };

  return subscribeCompleteArgs;

})(fm.websync.baseCompleteArgs);



/*<span id='cls-fm.websync.unsubscribeCompleteArgs'>&nbsp;</span> */

/**
@class fm.websync.unsubscribeCompleteArgs
 <div>
 Arguments for unsubscribe complete callbacks.
 </div>

@extends fm.websync.baseCompleteArgs
 */
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.unsubscribeCompleteArgs = (function(superClass) {
  extend(unsubscribeCompleteArgs, superClass);

  unsubscribeCompleteArgs.prototype.__forced = false;

  function unsubscribeCompleteArgs() {
    this.getForced = bind(this.getForced, this);
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = unsubscribeCompleteArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = unsubscribeCompleteArgs.__super__.constructor.call(this);
    return instance;
  }


  /*<span id='method-fm.websync.unsubscribeCompleteArgs-getForced'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets whether this unsubscribe was forced due to a disconnect.
  	 </div>
  
  	@function getForced
  	@return {Boolean}
   */

  unsubscribeCompleteArgs.prototype.getForced = function() {
    return this.__forced;
  };

  return unsubscribeCompleteArgs;

})(fm.websync.baseCompleteArgs);



/*<span id='cls-fm.websync.clientConnectResponseArgs'>&nbsp;</span> */

/**
@class fm.websync.clientConnectResponseArgs
 <div>
 Arguments for <see cref="fm.websync.client.addOnConnectResponse">fm.websync.client.addOnConnectResponse</see>.
 </div>

@extends fm.websync.baseClientResponseEventArgsGeneric
 */
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.clientConnectResponseArgs = (function(superClass) {
  extend(clientConnectResponseArgs, superClass);

  function clientConnectResponseArgs() {
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = clientConnectResponseArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = clientConnectResponseArgs.__super__.constructor.call(this);
    return instance;
  }

  return clientConnectResponseArgs;

})(fm.websync.baseClientResponseEventArgsGeneric);



/*<span id='cls-fm.websync.clientDisconnectResponseArgs'>&nbsp;</span> */

/**
@class fm.websync.clientDisconnectResponseArgs
 <div>
 Arguments for <see cref="fm.websync.client.addOnDisconnectResponse">fm.websync.client.addOnDisconnectResponse</see>.
 </div>

@extends fm.websync.baseClientResponseEventArgsGeneric
 */
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.clientDisconnectResponseArgs = (function(superClass) {
  extend(clientDisconnectResponseArgs, superClass);

  function clientDisconnectResponseArgs() {
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = clientDisconnectResponseArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = clientDisconnectResponseArgs.__super__.constructor.call(this);
    return instance;
  }

  return clientDisconnectResponseArgs;

})(fm.websync.baseClientResponseEventArgsGeneric);



/*<span id='cls-fm.websync.clientPublishResponseArgs'>&nbsp;</span> */

/**
@class fm.websync.clientPublishResponseArgs
 <div>
 Arguments for <see cref="fm.websync.client.addOnPublishResponse">fm.websync.client.addOnPublishResponse</see>.
 </div>

@extends fm.websync.baseClientResponseEventArgsGeneric
 */
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.clientPublishResponseArgs = (function(superClass) {
  extend(clientPublishResponseArgs, superClass);

  function clientPublishResponseArgs() {
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = clientPublishResponseArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = clientPublishResponseArgs.__super__.constructor.call(this);
    return instance;
  }

  return clientPublishResponseArgs;

})(fm.websync.baseClientResponseEventArgsGeneric);



/*<span id='cls-fm.websync.clientSubscribeResponseArgs'>&nbsp;</span> */

/**
@class fm.websync.clientSubscribeResponseArgs
 <div>
 Arguments for <see cref="fm.websync.client.addOnSubscribeResponse">fm.websync.client.addOnSubscribeResponse</see>.
 </div>

@extends fm.websync.baseClientResponseEventArgsGeneric
 */
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.clientSubscribeResponseArgs = (function(superClass) {
  extend(clientSubscribeResponseArgs, superClass);

  function clientSubscribeResponseArgs() {
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = clientSubscribeResponseArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = clientSubscribeResponseArgs.__super__.constructor.call(this);
    return instance;
  }

  return clientSubscribeResponseArgs;

})(fm.websync.baseClientResponseEventArgsGeneric);



/*<span id='cls-fm.websync.clientUnsubscribeResponseArgs'>&nbsp;</span> */

/**
@class fm.websync.clientUnsubscribeResponseArgs
 <div>
 Arguments for <see cref="fm.websync.client.addOnUnsubscribeResponse">fm.websync.client.addOnUnsubscribeResponse</see>.
 </div>

@extends fm.websync.baseClientResponseEventArgsGeneric
 */
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.clientUnsubscribeResponseArgs = (function(superClass) {
  extend(clientUnsubscribeResponseArgs, superClass);

  function clientUnsubscribeResponseArgs() {
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = clientUnsubscribeResponseArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = clientUnsubscribeResponseArgs.__super__.constructor.call(this);
    return instance;
  }

  return clientUnsubscribeResponseArgs;

})(fm.websync.baseClientResponseEventArgsGeneric);



/*<span id='cls-fm.websync.clientBindResponseArgs'>&nbsp;</span> */

/**
@class fm.websync.clientBindResponseArgs
 <div>
 Arguments for <see cref="fm.websync.client.addOnBindResponse">fm.websync.client.addOnBindResponse</see>.
 </div>

@extends fm.websync.baseClientResponseEventArgsGeneric
 */
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.clientBindResponseArgs = (function(superClass) {
  extend(clientBindResponseArgs, superClass);

  function clientBindResponseArgs() {
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = clientBindResponseArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = clientBindResponseArgs.__super__.constructor.call(this);
    return instance;
  }

  return clientBindResponseArgs;

})(fm.websync.baseClientResponseEventArgsGeneric);



/*<span id='cls-fm.websync.clientUnbindResponseArgs'>&nbsp;</span> */

/**
@class fm.websync.clientUnbindResponseArgs
 <div>
 Arguments for <see cref="fm.websync.client.addOnUnbindResponse">fm.websync.client.addOnUnbindResponse</see>.
 </div>

@extends fm.websync.baseClientResponseEventArgsGeneric
 */
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.clientUnbindResponseArgs = (function(superClass) {
  extend(clientUnbindResponseArgs, superClass);

  function clientUnbindResponseArgs() {
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = clientUnbindResponseArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = clientUnbindResponseArgs.__super__.constructor.call(this);
    return instance;
  }

  return clientUnbindResponseArgs;

})(fm.websync.baseClientResponseEventArgsGeneric);



/*<span id='cls-fm.websync.clientServiceResponseArgs'>&nbsp;</span> */

/**
@class fm.websync.clientServiceResponseArgs
 <div>
 Arguments for <see cref="fm.websync.client.addOnServiceResponse">fm.websync.client.addOnServiceResponse</see>.
 </div>

@extends fm.websync.baseClientResponseEventArgsGeneric
 */
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.clientServiceResponseArgs = (function(superClass) {
  extend(clientServiceResponseArgs, superClass);

  function clientServiceResponseArgs() {
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = clientServiceResponseArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = clientServiceResponseArgs.__super__.constructor.call(this);
    return instance;
  }

  return clientServiceResponseArgs;

})(fm.websync.baseClientResponseEventArgsGeneric);



/*<span id='cls-fm.websync.clientConnectRequestArgs'>&nbsp;</span> */

/**
@class fm.websync.clientConnectRequestArgs
 <div>
 Arguments for <see cref="fm.websync.client.addOnConnectRequest">fm.websync.client.addOnConnectRequest</see>.
 </div>

@extends fm.websync.baseClientRequestEventArgsGeneric
 */
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.clientConnectRequestArgs = (function(superClass) {
  extend(clientConnectRequestArgs, superClass);

  function clientConnectRequestArgs() {
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = clientConnectRequestArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = clientConnectRequestArgs.__super__.constructor.call(this);
    return instance;
  }

  return clientConnectRequestArgs;

})(fm.websync.baseClientRequestEventArgsGeneric);



/*<span id='cls-fm.websync.clientDisconnectRequestArgs'>&nbsp;</span> */

/**
@class fm.websync.clientDisconnectRequestArgs
 <div>
 Arguments for <see cref="fm.websync.client.addOnDisconnectRequest">fm.websync.client.addOnDisconnectRequest</see>.
 </div>

@extends fm.websync.baseClientRequestEventArgsGeneric
 */
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.clientDisconnectRequestArgs = (function(superClass) {
  extend(clientDisconnectRequestArgs, superClass);

  function clientDisconnectRequestArgs() {
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = clientDisconnectRequestArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = clientDisconnectRequestArgs.__super__.constructor.call(this);
    return instance;
  }

  return clientDisconnectRequestArgs;

})(fm.websync.baseClientRequestEventArgsGeneric);



/*<span id='cls-fm.websync.clientPublishRequestArgs'>&nbsp;</span> */

/**
@class fm.websync.clientPublishRequestArgs
 <div>
 Arguments for <see cref="fm.websync.client.addOnPublishRequest">fm.websync.client.addOnPublishRequest</see>.
 </div>

@extends fm.websync.baseClientRequestEventArgsGeneric
 */
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.clientPublishRequestArgs = (function(superClass) {
  extend(clientPublishRequestArgs, superClass);

  function clientPublishRequestArgs() {
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = clientPublishRequestArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = clientPublishRequestArgs.__super__.constructor.call(this);
    return instance;
  }

  return clientPublishRequestArgs;

})(fm.websync.baseClientRequestEventArgsGeneric);



/*<span id='cls-fm.websync.clientSubscribeRequestArgs'>&nbsp;</span> */

/**
@class fm.websync.clientSubscribeRequestArgs
 <div>
 Arguments for <see cref="fm.websync.client.addOnSubscribeRequest">fm.websync.client.addOnSubscribeRequest</see>.
 </div>

@extends fm.websync.baseClientRequestEventArgsGeneric
 */
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.clientSubscribeRequestArgs = (function(superClass) {
  extend(clientSubscribeRequestArgs, superClass);

  function clientSubscribeRequestArgs() {
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = clientSubscribeRequestArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = clientSubscribeRequestArgs.__super__.constructor.call(this);
    return instance;
  }

  return clientSubscribeRequestArgs;

})(fm.websync.baseClientRequestEventArgsGeneric);



/*<span id='cls-fm.websync.clientUnsubscribeRequestArgs'>&nbsp;</span> */

/**
@class fm.websync.clientUnsubscribeRequestArgs
 <div>
 Arguments for <see cref="fm.websync.client.addOnUnsubscribeRequest">fm.websync.client.addOnUnsubscribeRequest</see>.
 </div>

@extends fm.websync.baseClientRequestEventArgsGeneric
 */
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.clientUnsubscribeRequestArgs = (function(superClass) {
  extend(clientUnsubscribeRequestArgs, superClass);

  function clientUnsubscribeRequestArgs() {
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = clientUnsubscribeRequestArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = clientUnsubscribeRequestArgs.__super__.constructor.call(this);
    return instance;
  }

  return clientUnsubscribeRequestArgs;

})(fm.websync.baseClientRequestEventArgsGeneric);



/*<span id='cls-fm.websync.clientBindRequestArgs'>&nbsp;</span> */

/**
@class fm.websync.clientBindRequestArgs
 <div>
 Arguments for <see cref="fm.websync.client.addOnBindRequest">fm.websync.client.addOnBindRequest</see>.
 </div>

@extends fm.websync.baseClientRequestEventArgsGeneric
 */
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.clientBindRequestArgs = (function(superClass) {
  extend(clientBindRequestArgs, superClass);

  function clientBindRequestArgs() {
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = clientBindRequestArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = clientBindRequestArgs.__super__.constructor.call(this);
    return instance;
  }

  return clientBindRequestArgs;

})(fm.websync.baseClientRequestEventArgsGeneric);



/*<span id='cls-fm.websync.clientUnbindRequestArgs'>&nbsp;</span> */

/**
@class fm.websync.clientUnbindRequestArgs
 <div>
 Arguments for <see cref="fm.websync.client.addOnUnbindRequest">fm.websync.client.addOnUnbindRequest</see>.
 </div>

@extends fm.websync.baseClientRequestEventArgsGeneric
 */
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.clientUnbindRequestArgs = (function(superClass) {
  extend(clientUnbindRequestArgs, superClass);

  function clientUnbindRequestArgs() {
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = clientUnbindRequestArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = clientUnbindRequestArgs.__super__.constructor.call(this);
    return instance;
  }

  return clientUnbindRequestArgs;

})(fm.websync.baseClientRequestEventArgsGeneric);



/*<span id='cls-fm.websync.clientServiceRequestArgs'>&nbsp;</span> */

/**
@class fm.websync.clientServiceRequestArgs
 <div>
 Arguments for <see cref="fm.websync.client.addOnServiceRequest">fm.websync.client.addOnServiceRequest</see>.
 </div>

@extends fm.websync.baseClientRequestEventArgsGeneric
 */
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.clientServiceRequestArgs = (function(superClass) {
  extend(clientServiceRequestArgs, superClass);

  function clientServiceRequestArgs() {
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = clientServiceRequestArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = clientServiceRequestArgs.__super__.constructor.call(this);
    return instance;
  }

  return clientServiceRequestArgs;

})(fm.websync.baseClientRequestEventArgsGeneric);



/*<span id='cls-fm.websync.connectFailureArgs'>&nbsp;</span> */

/**
@class fm.websync.connectFailureArgs
 <div>
 Arguments for connect failure callbacks.
 </div>

@extends fm.websync.baseFailureArgs
 */
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.connectFailureArgs = (function(superClass) {
  extend(connectFailureArgs, superClass);

  connectFailureArgs.prototype._isReconnect = false;

  function connectFailureArgs() {
    this.setIsReconnect = bind(this.setIsReconnect, this);
    this.getIsReconnect = bind(this.getIsReconnect, this);
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = connectFailureArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = connectFailureArgs.__super__.constructor.call(this);
    return instance;
  }


  /*<span id='method-fm.websync.connectFailureArgs-getIsReconnect'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets whether the connect call was automatically
  	 invoked following a stream failure.
  	 </div>
  
  	@function getIsReconnect
  	@return {Boolean}
   */

  connectFailureArgs.prototype.getIsReconnect = function() {
    return this._isReconnect;
  };

  connectFailureArgs.prototype.setIsReconnect = function() {
    var value;
    value = arguments[0];
    return this._isReconnect = value;
  };

  return connectFailureArgs;

})(fm.websync.baseFailureArgs);



/*<span id='cls-fm.websync.bindFailureArgs'>&nbsp;</span> */

/**
@class fm.websync.bindFailureArgs
 <div>
 Arguments for bind failure callbacks.
 </div>

@extends fm.websync.baseFailureArgs
 */
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.bindFailureArgs = (function(superClass) {
  extend(bindFailureArgs, superClass);

  bindFailureArgs.prototype.__records = null;

  bindFailureArgs.prototype._isRebind = false;

  function bindFailureArgs() {
    this.setIsRebind = bind(this.setIsRebind, this);
    this.getRecords = bind(this.getRecords, this);
    this.getRecord = bind(this.getRecord, this);
    this.getKeys = bind(this.getKeys, this);
    this.getKey = bind(this.getKey, this);
    this.getIsRebind = bind(this.getIsRebind, this);
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = bindFailureArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = bindFailureArgs.__super__.constructor.call(this);
    return instance;
  }


  /*<span id='method-fm.websync.bindFailureArgs-getIsRebind'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets whether the bind call was automatically
  	 invoked following a stream failure.
  	 </div>
  
  	@function getIsRebind
  	@return {Boolean}
   */

  bindFailureArgs.prototype.getIsRebind = function() {
    return this._isRebind;
  };


  /*<span id='method-fm.websync.bindFailureArgs-getKey'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the record key to which the client failed to be bound.
  	 Overrides <see cref="fm.websync.bindFailureArgs.keys">fm.websync.bindFailureArgs.keys</see>, <see cref="fm.websync.bindFailureArgs.record">fm.websync.bindFailureArgs.record</see>, and <see cref="fm.websync.bindFailureArgs.records">fm.websync.bindFailureArgs.records</see>.
  	 </div>
  
  	@function getKey
  	@return {String}
   */

  bindFailureArgs.prototype.getKey = function() {
    return fm.websync.extensible.sharedGetKey(this.__records);
  };


  /*<span id='method-fm.websync.bindFailureArgs-getKeys'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the record keys to which the client failed to be bound.
  	 Overrides <see cref="fm.websync.bindFailureArgs.key">fm.websync.bindFailureArgs.key</see>, <see cref="fm.websync.bindFailureArgs.record">fm.websync.bindFailureArgs.record</see>, and <see cref="fm.websync.bindFailureArgs.records">fm.websync.bindFailureArgs.records</see>.
  	 </div>
  
  	@function getKeys
  	@return {fm.array}
   */

  bindFailureArgs.prototype.getKeys = function() {
    return fm.websync.extensible.sharedGetKeys(this.__records);
  };


  /*<span id='method-fm.websync.bindFailureArgs-getRecord'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the record to which the client failed to be bound.
  	 Overrides <see cref="fm.websync.bindFailureArgs.records">fm.websync.bindFailureArgs.records</see>, <see cref="fm.websync.bindFailureArgs.key">fm.websync.bindFailureArgs.key</see>, and <see cref="fm.websync.bindFailureArgs.keys">fm.websync.bindFailureArgs.keys</see>.
  	 </div>
  
  	@function getRecord
  	@return {fm.websync.record}
   */

  bindFailureArgs.prototype.getRecord = function() {
    return fm.websync.extensible.sharedGetRecord(this.__records);
  };


  /*<span id='method-fm.websync.bindFailureArgs-getRecords'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the records to which the client failed to be bound.
  	 Overrides <see cref="fm.websync.bindFailureArgs.record">fm.websync.bindFailureArgs.record</see>, <see cref="fm.websync.bindFailureArgs.key">fm.websync.bindFailureArgs.key</see>, and <see cref="fm.websync.bindFailureArgs.keys">fm.websync.bindFailureArgs.keys</see>.
  	 </div>
  
  	@function getRecords
  	@return {fm.array}
   */

  bindFailureArgs.prototype.getRecords = function() {
    return fm.websync.extensible.sharedGetRecords(this.__records);
  };

  bindFailureArgs.prototype.setIsRebind = function() {
    var value;
    value = arguments[0];
    return this._isRebind = value;
  };

  return bindFailureArgs;

})(fm.websync.baseFailureArgs);



/*<span id='cls-fm.websync.serviceFailureArgs'>&nbsp;</span> */

/**
@class fm.websync.serviceFailureArgs
 <div>
 Arguments for service failure callbacks.
 </div>

@extends fm.websync.baseFailureArgs
 */
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.serviceFailureArgs = (function(superClass) {
  extend(serviceFailureArgs, superClass);

  serviceFailureArgs.prototype.__channel = null;

  serviceFailureArgs.prototype.__dataBytes = null;

  serviceFailureArgs.prototype.__dataJson = null;

  function serviceFailureArgs() {
    this.getData = bind(this.getData, this);
    this.getTag = bind(this.getTag, this);
    this.getIsBinary = bind(this.getIsBinary, this);
    this.getDataJson = bind(this.getDataJson, this);
    this.getDataBytes = bind(this.getDataBytes, this);
    this.getChannel = bind(this.getChannel, this);
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = serviceFailureArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = serviceFailureArgs.__super__.constructor.call(this);
    return instance;
  }


  /*<span id='method-fm.websync.serviceFailureArgs-getChannel'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the channel to which the data failed to be sent.
  	 </div>
  
  	@function getChannel
  	@return {String}
   */

  serviceFailureArgs.prototype.getChannel = function() {
    return this.__channel;
  };


  /*<span id='method-fm.websync.serviceFailureArgs-getDataBytes'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the data that failed to be sent in binary format.
  	 </div>
  
  	@function getDataBytes
  	@return {fm.array}
   */

  serviceFailureArgs.prototype.getDataBytes = function() {
    var _var0, _var1, decoded, valueJson;
    decoded = this.__dataBytes;
    valueJson = this.__dataJson;
    if (!fm.global.equals(decoded, null)) {
      return decoded;
    }
    if (!fm.global.equals(valueJson, null)) {
      _var0 = new fm.holder(decoded);
      _var1 = fm.crypto.tryBase64Decode(fm.serializer.deserializeString(valueJson), _var0);
      decoded = _var0.getValue();
      if (!_var1) {
        decoded = null;
      }
      this.__dataBytes = decoded;
      return decoded;
    }
    return null;
  };


  /*<span id='method-fm.websync.serviceFailureArgs-getDataJson'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the data that failed to be sent in JSON format.
  	 </div>
  
  	@function getDataJson
  	@return {String}
   */

  serviceFailureArgs.prototype.getDataJson = function() {
    var b, str;
    str = this.__dataJson;
    b = this.__dataBytes;
    if (!fm.global.equals(str, null)) {
      return str;
    }
    if (!fm.global.equals(b, null)) {
      str = fm.serializer.serializeString(fm.crypto.base64Encode(b));
      this.__dataJson = str;
      return str;
    }
    return null;
  };


  /*<span id='method-fm.websync.serviceFailureArgs-getIsBinary'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets whether or not the data is binary.
  	 </div>
  
  	@function getIsBinary
  	@return {Boolean}
   */

  serviceFailureArgs.prototype.getIsBinary = function() {
    return !fm.global.equals(this.getDataBytes(), null);
  };


  /*<span id='method-fm.websync.serviceFailureArgs-getTag'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the tag that identifies the contents of the payload.
  	 </div>
  
  	@function getTag
  	@return {String}
   */

  serviceFailureArgs.prototype.getTag = function() {
    return fm.serializer.deserializeString(this.getExtensionValueJson("fm.tag"));
  };

  serviceFailureArgs.prototype.getData = function() {
    return fm.json.deserialize(this.getDataJson.apply(this, arguments));
  };

  return serviceFailureArgs;

})(fm.websync.baseFailureArgs);



/*<span id='cls-fm.websync.unbindFailureArgs'>&nbsp;</span> */

/**
@class fm.websync.unbindFailureArgs
 <div>
 Arguments for unbind failure callbacks.
 </div>

@extends fm.websync.baseFailureArgs
 */
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.unbindFailureArgs = (function(superClass) {
  extend(unbindFailureArgs, superClass);

  unbindFailureArgs.prototype.__records = null;

  function unbindFailureArgs() {
    this.getRecords = bind(this.getRecords, this);
    this.getRecord = bind(this.getRecord, this);
    this.getKeys = bind(this.getKeys, this);
    this.getKey = bind(this.getKey, this);
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = unbindFailureArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = unbindFailureArgs.__super__.constructor.call(this);
    return instance;
  }


  /*<span id='method-fm.websync.unbindFailureArgs-getKey'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the record key from which the client failed to be unbound.
  	 Overrides <see cref="fm.websync.unbindFailureArgs.keys">fm.websync.unbindFailureArgs.keys</see>, <see cref="fm.websync.unbindFailureArgs.record">fm.websync.unbindFailureArgs.record</see>, and <see cref="fm.websync.unbindFailureArgs.records">fm.websync.unbindFailureArgs.records</see>.
  	 </div>
  
  	@function getKey
  	@return {String}
   */

  unbindFailureArgs.prototype.getKey = function() {
    return fm.websync.extensible.sharedGetKey(this.__records);
  };


  /*<span id='method-fm.websync.unbindFailureArgs-getKeys'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the record keys from which the client failed to be unbound.
  	 Overrides <see cref="fm.websync.unbindFailureArgs.key">fm.websync.unbindFailureArgs.key</see>, <see cref="fm.websync.unbindFailureArgs.record">fm.websync.unbindFailureArgs.record</see>, and <see cref="fm.websync.unbindFailureArgs.records">fm.websync.unbindFailureArgs.records</see>.
  	 </div>
  
  	@function getKeys
  	@return {fm.array}
   */

  unbindFailureArgs.prototype.getKeys = function() {
    return fm.websync.extensible.sharedGetKeys(this.__records);
  };


  /*<span id='method-fm.websync.unbindFailureArgs-getRecord'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the record from which the client failed to be unbound.
  	 Overrides <see cref="fm.websync.unbindFailureArgs.records">fm.websync.unbindFailureArgs.records</see>, <see cref="fm.websync.unbindFailureArgs.key">fm.websync.unbindFailureArgs.key</see>, and <see cref="fm.websync.unbindFailureArgs.keys">fm.websync.unbindFailureArgs.keys</see>.
  	 </div>
  
  	@function getRecord
  	@return {fm.websync.record}
   */

  unbindFailureArgs.prototype.getRecord = function() {
    return fm.websync.extensible.sharedGetRecord(this.__records);
  };


  /*<span id='method-fm.websync.unbindFailureArgs-getRecords'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the records from which the client failed to be unbound.
  	 Overrides <see cref="fm.websync.unbindFailureArgs.record">fm.websync.unbindFailureArgs.record</see>, <see cref="fm.websync.unbindFailureArgs.key">fm.websync.unbindFailureArgs.key</see>, and <see cref="fm.websync.unbindFailureArgs.keys">fm.websync.unbindFailureArgs.keys</see>.
  	 </div>
  
  	@function getRecords
  	@return {fm.array}
   */

  unbindFailureArgs.prototype.getRecords = function() {
    return fm.websync.extensible.sharedGetRecords(this.__records);
  };

  return unbindFailureArgs;

})(fm.websync.baseFailureArgs);



/*<span id='cls-fm.websync.streamFailureArgs'>&nbsp;</span> */

/**
@class fm.websync.streamFailureArgs
 <div>
 Arguments for <see cref="fm.websync.connectArgs.onStreamFailure">fm.websync.connectArgs.onStreamFailure</see>.
 </div>

@extends fm.websync.baseFailureArgs
 */
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.streamFailureArgs = (function(superClass) {
  extend(streamFailureArgs, superClass);

  streamFailureArgs.prototype._connectArgs = null;

  function streamFailureArgs() {
    this.setConnectArgs = bind(this.setConnectArgs, this);
    this.getConnectArgs = bind(this.getConnectArgs, this);
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = streamFailureArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = streamFailureArgs.__super__.constructor.call(this);
    return instance;
  }


  /*<span id='method-fm.websync.streamFailureArgs-getConnectArgs'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the connect arguments to use
  	 for the next connect attempt.
  	 </div>
  
  	@function getConnectArgs
  	@return {fm.websync.connectArgs}
   */

  streamFailureArgs.prototype.getConnectArgs = function() {
    return this._connectArgs;
  };


  /*<span id='method-fm.websync.streamFailureArgs-setConnectArgs'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the connect arguments to use
  	 for the next connect attempt.
  	 </div>
  
  	@function setConnectArgs
  	@param {fm.websync.connectArgs} value
  	@return {void}
   */

  streamFailureArgs.prototype.setConnectArgs = function() {
    var value;
    value = arguments[0];
    return this._connectArgs = value;
  };

  return streamFailureArgs;

})(fm.websync.baseFailureArgs);



/*<span id='cls-fm.websync.publishFailureArgs'>&nbsp;</span> */

/**
@class fm.websync.publishFailureArgs
 <div>
 Arguments for publish failure callbacks.
 </div>

@extends fm.websync.baseFailureArgs
 */
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.publishFailureArgs = (function(superClass) {
  extend(publishFailureArgs, superClass);

  publishFailureArgs.prototype.__channel = null;

  publishFailureArgs.prototype.__dataBytes = null;

  publishFailureArgs.prototype.__dataJson = null;

  function publishFailureArgs() {
    this.getData = bind(this.getData, this);
    this.getTag = bind(this.getTag, this);
    this.getIsBinary = bind(this.getIsBinary, this);
    this.getDataJson = bind(this.getDataJson, this);
    this.getDataBytes = bind(this.getDataBytes, this);
    this.getChannel = bind(this.getChannel, this);
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = publishFailureArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = publishFailureArgs.__super__.constructor.call(this);
    return instance;
  }


  /*<span id='method-fm.websync.publishFailureArgs-getChannel'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the channel to which the data failed to be sent.
  	 </div>
  
  	@function getChannel
  	@return {String}
   */

  publishFailureArgs.prototype.getChannel = function() {
    return this.__channel;
  };


  /*<span id='method-fm.websync.publishFailureArgs-getDataBytes'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the data that failed to be sent in binary format.
  	 </div>
  
  	@function getDataBytes
  	@return {fm.array}
   */

  publishFailureArgs.prototype.getDataBytes = function() {
    var _var0, _var1, decoded, valueJson;
    decoded = this.__dataBytes;
    valueJson = this.__dataJson;
    if (!fm.global.equals(decoded, null)) {
      return decoded;
    }
    if (!fm.global.equals(valueJson, null)) {
      _var0 = new fm.holder(decoded);
      _var1 = fm.crypto.tryBase64Decode(fm.serializer.deserializeString(valueJson), _var0);
      decoded = _var0.getValue();
      if (!_var1) {
        decoded = null;
      }
      this.__dataBytes = decoded;
      return decoded;
    }
    return null;
  };


  /*<span id='method-fm.websync.publishFailureArgs-getDataJson'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the data that failed to be sent in JSON format.
  	 </div>
  
  	@function getDataJson
  	@return {String}
   */

  publishFailureArgs.prototype.getDataJson = function() {
    var b, str;
    str = this.__dataJson;
    b = this.__dataBytes;
    if (!fm.global.equals(str, null)) {
      return str;
    }
    if (!fm.global.equals(b, null)) {
      str = fm.serializer.serializeString(fm.crypto.base64Encode(b));
      this.__dataJson = str;
      return str;
    }
    return null;
  };


  /*<span id='method-fm.websync.publishFailureArgs-getIsBinary'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets whether or not the data is binary.
  	 </div>
  
  	@function getIsBinary
  	@return {Boolean}
   */

  publishFailureArgs.prototype.getIsBinary = function() {
    return !fm.global.equals(this.getDataBytes(), null);
  };


  /*<span id='method-fm.websync.publishFailureArgs-getTag'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the tag that identifies the contents of the payload.
  	 </div>
  
  	@function getTag
  	@return {String}
   */

  publishFailureArgs.prototype.getTag = function() {
    return fm.serializer.deserializeString(this.getExtensionValueJson("fm.tag"));
  };

  publishFailureArgs.prototype.getData = function() {
    return fm.json.deserialize(this.getDataJson.apply(this, arguments));
  };

  return publishFailureArgs;

})(fm.websync.baseFailureArgs);



/*<span id='cls-fm.websync.subscribeFailureArgs'>&nbsp;</span> */

/**
@class fm.websync.subscribeFailureArgs
 <div>
 Arguments for subscribe failure callbacks.
 </div>

@extends fm.websync.baseFailureArgs
 */
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.subscribeFailureArgs = (function(superClass) {
  extend(subscribeFailureArgs, superClass);

  subscribeFailureArgs.prototype.__channels = null;

  subscribeFailureArgs.prototype._isResubscribe = false;

  function subscribeFailureArgs() {
    this.setIsResubscribe = bind(this.setIsResubscribe, this);
    this.getTag = bind(this.getTag, this);
    this.getIsResubscribe = bind(this.getIsResubscribe, this);
    this.getChannels = bind(this.getChannels, this);
    this.getChannel = bind(this.getChannel, this);
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = subscribeFailureArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = subscribeFailureArgs.__super__.constructor.call(this);
    return instance;
  }


  /*<span id='method-fm.websync.subscribeFailureArgs-getChannel'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the channel to which the client failed to be subscribed.
  	 Must start with a forward slash (/).
  	 Overrides <see cref="fm.websync.subscribeFailureArgs.channels">fm.websync.subscribeFailureArgs.channels</see>.
  	 </div>
  
  	@function getChannel
  	@return {String}
   */

  subscribeFailureArgs.prototype.getChannel = function() {
    return fm.websync.extensible.sharedGetChannel(this.__channels);
  };


  /*<span id='method-fm.websync.subscribeFailureArgs-getChannels'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the channels to which the client failed to be subscribed.
  	 Each must start with a forward slash (/).
  	 Overrides <see cref="fm.websync.subscribeFailureArgs.channel">fm.websync.subscribeFailureArgs.channel</see>.
  	 </div>
  
  	@function getChannels
  	@return {fm.array}
   */

  subscribeFailureArgs.prototype.getChannels = function() {
    return fm.websync.extensible.sharedGetChannels(this.__channels);
  };


  /*<span id='method-fm.websync.subscribeFailureArgs-getIsResubscribe'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets whether the subscribe call was automatically
  	 invoked following a stream failure.
  	 </div>
  
  	@function getIsResubscribe
  	@return {Boolean}
   */

  subscribeFailureArgs.prototype.getIsResubscribe = function() {
    return this._isResubscribe;
  };


  /*<span id='method-fm.websync.subscribeFailureArgs-getTag'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the tag associated with the subscribe request.
  	 </div>
  
  	@function getTag
  	@return {String}
   */

  subscribeFailureArgs.prototype.getTag = function() {
    var ref;
    return (ref = fm.serializer.deserializeString(this.getExtensionValueJson("fm.tag"))) != null ? ref : fm.stringExtensions.empty;
  };

  subscribeFailureArgs.prototype.setIsResubscribe = function() {
    var value;
    value = arguments[0];
    return this._isResubscribe = value;
  };

  return subscribeFailureArgs;

})(fm.websync.baseFailureArgs);



/*<span id='cls-fm.websync.unsubscribeFailureArgs'>&nbsp;</span> */

/**
@class fm.websync.unsubscribeFailureArgs
 <div>
 Arguments for unsubscribe failure callbacks.
 </div>

@extends fm.websync.baseFailureArgs
 */
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.unsubscribeFailureArgs = (function(superClass) {
  extend(unsubscribeFailureArgs, superClass);

  unsubscribeFailureArgs.prototype.__channels = null;

  function unsubscribeFailureArgs() {
    this.getTag = bind(this.getTag, this);
    this.getChannels = bind(this.getChannels, this);
    this.getChannel = bind(this.getChannel, this);
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = unsubscribeFailureArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = unsubscribeFailureArgs.__super__.constructor.call(this);
    return instance;
  }


  /*<span id='method-fm.websync.unsubscribeFailureArgs-getChannel'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the channel from which the client failed to be unsubscribed.
  	 Must start with a forward slash (/).
  	 Overrides <see cref="fm.websync.unsubscribeFailureArgs.channels">fm.websync.unsubscribeFailureArgs.channels</see>.
  	 </div>
  
  	@function getChannel
  	@return {String}
   */

  unsubscribeFailureArgs.prototype.getChannel = function() {
    return fm.websync.extensible.sharedGetChannel(this.__channels);
  };


  /*<span id='method-fm.websync.unsubscribeFailureArgs-getChannels'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the channels from which the client failed to be unsubscribed.
  	 Each must start with a forward slash (/).
  	 Overrides <see cref="fm.websync.unsubscribeFailureArgs.channel">fm.websync.unsubscribeFailureArgs.channel</see>.
  	 </div>
  
  	@function getChannels
  	@return {fm.array}
   */

  unsubscribeFailureArgs.prototype.getChannels = function() {
    return fm.websync.extensible.sharedGetChannels(this.__channels);
  };


  /*<span id='method-fm.websync.unsubscribeFailureArgs-getTag'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the tag associated with the subscribe request.
  	 </div>
  
  	@function getTag
  	@return {String}
   */

  unsubscribeFailureArgs.prototype.getTag = function() {
    var ref;
    return (ref = fm.serializer.deserializeString(this.getExtensionValueJson("fm.tag"))) != null ? ref : fm.stringExtensions.empty;
  };

  return unsubscribeFailureArgs;

})(fm.websync.baseFailureArgs);



/*<span id='cls-fm.websync.connectSuccessArgs'>&nbsp;</span> */

/**
@class fm.websync.connectSuccessArgs
 <div>
 Arguments for connect success callbacks.
 </div>

@extends fm.websync.baseSuccessArgs
 */
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.connectSuccessArgs = (function(superClass) {
  extend(connectSuccessArgs, superClass);

  connectSuccessArgs.prototype._connectionType = null;

  connectSuccessArgs.prototype._isReconnect = false;

  function connectSuccessArgs() {
    this.setIsReconnect = bind(this.setIsReconnect, this);
    this.setConnectionType = bind(this.setConnectionType, this);
    this.getIsReconnect = bind(this.getIsReconnect, this);
    this.getConnectionType = bind(this.getConnectionType, this);
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = connectSuccessArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = connectSuccessArgs.__super__.constructor.call(this);
    return instance;
  }


  /*<span id='method-fm.websync.connectSuccessArgs-getConnectionType'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the connection type of the stream.
  	 </div>
  
  	@function getConnectionType
  	@return {fm.websync.connectionType}
   */

  connectSuccessArgs.prototype.getConnectionType = function() {
    return this._connectionType;
  };


  /*<span id='method-fm.websync.connectSuccessArgs-getIsReconnect'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets whether the connect call was automatically
  	 invoked following a stream failure.
  	 </div>
  
  	@function getIsReconnect
  	@return {Boolean}
   */

  connectSuccessArgs.prototype.getIsReconnect = function() {
    return this._isReconnect;
  };

  connectSuccessArgs.prototype.setConnectionType = function() {
    var value;
    value = arguments[0];
    return this._connectionType = value;
  };

  connectSuccessArgs.prototype.setIsReconnect = function() {
    var value;
    value = arguments[0];
    return this._isReconnect = value;
  };

  return connectSuccessArgs;

})(fm.websync.baseSuccessArgs);



/*<span id='cls-fm.websync.bindSuccessArgs'>&nbsp;</span> */

/**
@class fm.websync.bindSuccessArgs
 <div>
 Arguments for bind success callbacks.
 </div>

@extends fm.websync.baseSuccessArgs
 */
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.bindSuccessArgs = (function(superClass) {
  extend(bindSuccessArgs, superClass);

  bindSuccessArgs.prototype.__records = null;

  bindSuccessArgs.prototype._isRebind = false;

  function bindSuccessArgs() {
    this.setIsRebind = bind(this.setIsRebind, this);
    this.getRecords = bind(this.getRecords, this);
    this.getRecord = bind(this.getRecord, this);
    this.getKeys = bind(this.getKeys, this);
    this.getKey = bind(this.getKey, this);
    this.getIsRebind = bind(this.getIsRebind, this);
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = bindSuccessArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = bindSuccessArgs.__super__.constructor.call(this);
    return instance;
  }


  /*<span id='method-fm.websync.bindSuccessArgs-getIsRebind'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets whether the bind call was automatically
  	 invoked following a stream failure.
  	 </div>
  
  	@function getIsRebind
  	@return {Boolean}
   */

  bindSuccessArgs.prototype.getIsRebind = function() {
    return this._isRebind;
  };


  /*<span id='method-fm.websync.bindSuccessArgs-getKey'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the record key to which the client was bound.
  	 Overrides <see cref="fm.websync.bindSuccessArgs.keys">fm.websync.bindSuccessArgs.keys</see>, <see cref="fm.websync.bindSuccessArgs.record">fm.websync.bindSuccessArgs.record</see>, and <see cref="fm.websync.bindSuccessArgs.records">fm.websync.bindSuccessArgs.records</see>.
  	 </div>
  
  	@function getKey
  	@return {String}
   */

  bindSuccessArgs.prototype.getKey = function() {
    return fm.websync.extensible.sharedGetKey(this.__records);
  };


  /*<span id='method-fm.websync.bindSuccessArgs-getKeys'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the record keys to which the client was bound.
  	 Overrides <see cref="fm.websync.bindSuccessArgs.key">fm.websync.bindSuccessArgs.key</see>, <see cref="fm.websync.bindSuccessArgs.record">fm.websync.bindSuccessArgs.record</see>, and <see cref="fm.websync.bindSuccessArgs.records">fm.websync.bindSuccessArgs.records</see>.
  	 </div>
  
  	@function getKeys
  	@return {fm.array}
   */

  bindSuccessArgs.prototype.getKeys = function() {
    return fm.websync.extensible.sharedGetKeys(this.__records);
  };


  /*<span id='method-fm.websync.bindSuccessArgs-getRecord'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the record to which the client was bound.
  	 Overrides <see cref="fm.websync.bindSuccessArgs.records">fm.websync.bindSuccessArgs.records</see>, <see cref="fm.websync.bindSuccessArgs.key">fm.websync.bindSuccessArgs.key</see>, and <see cref="fm.websync.bindSuccessArgs.keys">fm.websync.bindSuccessArgs.keys</see>.
  	 </div>
  
  	@function getRecord
  	@return {fm.websync.record}
   */

  bindSuccessArgs.prototype.getRecord = function() {
    return fm.websync.extensible.sharedGetRecord(this.__records);
  };


  /*<span id='method-fm.websync.bindSuccessArgs-getRecords'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the records to which the client was bound.
  	 Overrides <see cref="fm.websync.bindSuccessArgs.record">fm.websync.bindSuccessArgs.record</see>, <see cref="fm.websync.bindSuccessArgs.key">fm.websync.bindSuccessArgs.key</see>, and <see cref="fm.websync.bindSuccessArgs.keys">fm.websync.bindSuccessArgs.keys</see>.
  	 </div>
  
  	@function getRecords
  	@return {fm.array}
   */

  bindSuccessArgs.prototype.getRecords = function() {
    return fm.websync.extensible.sharedGetRecords(this.__records);
  };

  bindSuccessArgs.prototype.setIsRebind = function() {
    var value;
    value = arguments[0];
    return this._isRebind = value;
  };

  return bindSuccessArgs;

})(fm.websync.baseSuccessArgs);



/*<span id='cls-fm.websync.serviceSuccessArgs'>&nbsp;</span> */

/**
@class fm.websync.serviceSuccessArgs
 <div>
 Arguments for service success callbacks.
 </div>

@extends fm.websync.baseSuccessArgs
 */
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.serviceSuccessArgs = (function(superClass) {
  extend(serviceSuccessArgs, superClass);

  serviceSuccessArgs.prototype.__channel = null;

  serviceSuccessArgs.prototype.__dataBytes = null;

  serviceSuccessArgs.prototype.__dataJson = null;

  function serviceSuccessArgs() {
    this.getData = bind(this.getData, this);
    this.getTag = bind(this.getTag, this);
    this.getIsBinary = bind(this.getIsBinary, this);
    this.getDataJson = bind(this.getDataJson, this);
    this.getDataBytes = bind(this.getDataBytes, this);
    this.getChannel = bind(this.getChannel, this);
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = serviceSuccessArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = serviceSuccessArgs.__super__.constructor.call(this);
    return instance;
  }


  /*<span id='method-fm.websync.serviceSuccessArgs-getChannel'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the channel to which the data was sent.
  	 </div>
  
  	@function getChannel
  	@return {String}
   */

  serviceSuccessArgs.prototype.getChannel = function() {
    return this.__channel;
  };


  /*<span id='method-fm.websync.serviceSuccessArgs-getDataBytes'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the data that was sent in binary format.
  	 </div>
  
  	@function getDataBytes
  	@return {fm.array}
   */

  serviceSuccessArgs.prototype.getDataBytes = function() {
    var _var0, _var1, decoded, valueJson;
    decoded = this.__dataBytes;
    valueJson = this.__dataJson;
    if (!fm.global.equals(decoded, null)) {
      return decoded;
    }
    if (!fm.global.equals(valueJson, null)) {
      _var0 = new fm.holder(decoded);
      _var1 = fm.crypto.tryBase64Decode(fm.serializer.deserializeString(valueJson), _var0);
      decoded = _var0.getValue();
      if (!_var1) {
        decoded = null;
      }
      this.__dataBytes = decoded;
      return decoded;
    }
    return null;
  };


  /*<span id='method-fm.websync.serviceSuccessArgs-getDataJson'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the data that was sent in JSON format.
  	 </div>
  
  	@function getDataJson
  	@return {String}
   */

  serviceSuccessArgs.prototype.getDataJson = function() {
    var b, str;
    str = this.__dataJson;
    b = this.__dataBytes;
    if (!fm.global.equals(str, null)) {
      return str;
    }
    if (!fm.global.equals(b, null)) {
      str = fm.serializer.serializeString(fm.crypto.base64Encode(b));
      this.__dataJson = str;
      return str;
    }
    return null;
  };


  /*<span id='method-fm.websync.serviceSuccessArgs-getIsBinary'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets whether or not the data is binary.
  	 </div>
  
  	@function getIsBinary
  	@return {Boolean}
   */

  serviceSuccessArgs.prototype.getIsBinary = function() {
    return !fm.global.equals(this.getDataBytes(), null);
  };


  /*<span id='method-fm.websync.serviceSuccessArgs-getTag'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the tag that identifies the contents of the payload.
  	 </div>
  
  	@function getTag
  	@return {String}
   */

  serviceSuccessArgs.prototype.getTag = function() {
    return fm.serializer.deserializeString(this.getExtensionValueJson("fm.tag"));
  };

  serviceSuccessArgs.prototype.getData = function() {
    return fm.json.deserialize(this.getDataJson.apply(this, arguments));
  };

  return serviceSuccessArgs;

})(fm.websync.baseSuccessArgs);



/*<span id='cls-fm.websync.unbindSuccessArgs'>&nbsp;</span> */

/**
@class fm.websync.unbindSuccessArgs
 <div>
 Arguments for unbind success callbacks.
 </div>

@extends fm.websync.baseSuccessArgs
 */
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.unbindSuccessArgs = (function(superClass) {
  extend(unbindSuccessArgs, superClass);

  unbindSuccessArgs.prototype.__forced = false;

  unbindSuccessArgs.prototype.__records = null;

  function unbindSuccessArgs() {
    this.getRecords = bind(this.getRecords, this);
    this.getRecord = bind(this.getRecord, this);
    this.getKeys = bind(this.getKeys, this);
    this.getKey = bind(this.getKey, this);
    this.getForced = bind(this.getForced, this);
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = unbindSuccessArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = unbindSuccessArgs.__super__.constructor.call(this);
    return instance;
  }


  /*<span id='method-fm.websync.unbindSuccessArgs-getForced'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets whether this unbind was forced due to a disconnect.
  	 </div>
  
  	@function getForced
  	@return {Boolean}
   */

  unbindSuccessArgs.prototype.getForced = function() {
    return this.__forced;
  };


  /*<span id='method-fm.websync.unbindSuccessArgs-getKey'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the record key from which the client was unbound.
  	 Overrides <see cref="fm.websync.unbindSuccessArgs.keys">fm.websync.unbindSuccessArgs.keys</see>, <see cref="fm.websync.unbindSuccessArgs.record">fm.websync.unbindSuccessArgs.record</see>, and <see cref="fm.websync.unbindSuccessArgs.records">fm.websync.unbindSuccessArgs.records</see>.
  	 </div>
  
  	@function getKey
  	@return {String}
   */

  unbindSuccessArgs.prototype.getKey = function() {
    return fm.websync.extensible.sharedGetKey(this.__records);
  };


  /*<span id='method-fm.websync.unbindSuccessArgs-getKeys'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the record keys from which the client was unbound.
  	 Overrides <see cref="fm.websync.unbindSuccessArgs.key">fm.websync.unbindSuccessArgs.key</see>, <see cref="fm.websync.unbindSuccessArgs.record">fm.websync.unbindSuccessArgs.record</see>, and <see cref="fm.websync.unbindSuccessArgs.records">fm.websync.unbindSuccessArgs.records</see>.
  	 </div>
  
  	@function getKeys
  	@return {fm.array}
   */

  unbindSuccessArgs.prototype.getKeys = function() {
    return fm.websync.extensible.sharedGetKeys(this.__records);
  };


  /*<span id='method-fm.websync.unbindSuccessArgs-getRecord'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the record from which the client was unbound.
  	 Overrides <see cref="fm.websync.unbindSuccessArgs.records">fm.websync.unbindSuccessArgs.records</see>, <see cref="fm.websync.unbindSuccessArgs.key">fm.websync.unbindSuccessArgs.key</see>, and <see cref="fm.websync.unbindSuccessArgs.keys">fm.websync.unbindSuccessArgs.keys</see>.
  	 </div>
  
  	@function getRecord
  	@return {fm.websync.record}
   */

  unbindSuccessArgs.prototype.getRecord = function() {
    return fm.websync.extensible.sharedGetRecord(this.__records);
  };


  /*<span id='method-fm.websync.unbindSuccessArgs-getRecords'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the records from which the client was unbound.
  	 Overrides <see cref="fm.websync.unbindSuccessArgs.record">fm.websync.unbindSuccessArgs.record</see>, <see cref="fm.websync.unbindSuccessArgs.key">fm.websync.unbindSuccessArgs.key</see>, and <see cref="fm.websync.unbindSuccessArgs.keys">fm.websync.unbindSuccessArgs.keys</see>.
  	 </div>
  
  	@function getRecords
  	@return {fm.array}
   */

  unbindSuccessArgs.prototype.getRecords = function() {
    return fm.websync.extensible.sharedGetRecords(this.__records);
  };

  return unbindSuccessArgs;

})(fm.websync.baseSuccessArgs);



/*<span id='cls-fm.websync.publishSuccessArgs'>&nbsp;</span> */

/**
@class fm.websync.publishSuccessArgs
 <div>
 Arguments for publish success callbacks.
 </div>

@extends fm.websync.baseSuccessArgs
 */
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.publishSuccessArgs = (function(superClass) {
  extend(publishSuccessArgs, superClass);

  publishSuccessArgs.prototype.__channel = null;

  publishSuccessArgs.prototype.__dataBytes = null;

  publishSuccessArgs.prototype.__dataJson = null;

  function publishSuccessArgs() {
    this.getData = bind(this.getData, this);
    this.getTag = bind(this.getTag, this);
    this.getIsBinary = bind(this.getIsBinary, this);
    this.getDataJson = bind(this.getDataJson, this);
    this.getDataBytes = bind(this.getDataBytes, this);
    this.getChannel = bind(this.getChannel, this);
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = publishSuccessArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = publishSuccessArgs.__super__.constructor.call(this);
    return instance;
  }


  /*<span id='method-fm.websync.publishSuccessArgs-getChannel'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the channel to which the data was sent.
  	 </div>
  
  	@function getChannel
  	@return {String}
   */

  publishSuccessArgs.prototype.getChannel = function() {
    return this.__channel;
  };


  /*<span id='method-fm.websync.publishSuccessArgs-getDataBytes'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the data that was sent in binary format.
  	 </div>
  
  	@function getDataBytes
  	@return {fm.array}
   */

  publishSuccessArgs.prototype.getDataBytes = function() {
    var _var0, _var1, decoded, valueJson;
    decoded = this.__dataBytes;
    valueJson = this.__dataJson;
    if (!fm.global.equals(decoded, null)) {
      return decoded;
    }
    if (!fm.global.equals(valueJson, null)) {
      _var0 = new fm.holder(decoded);
      _var1 = fm.crypto.tryBase64Decode(fm.serializer.deserializeString(valueJson), _var0);
      decoded = _var0.getValue();
      if (!_var1) {
        decoded = null;
      }
      this.__dataBytes = decoded;
      return decoded;
    }
    return null;
  };


  /*<span id='method-fm.websync.publishSuccessArgs-getDataJson'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the data that was sent in JSON format.
  	 </div>
  
  	@function getDataJson
  	@return {String}
   */

  publishSuccessArgs.prototype.getDataJson = function() {
    var b, str;
    str = this.__dataJson;
    b = this.__dataBytes;
    if (!fm.global.equals(str, null)) {
      return str;
    }
    if (!fm.global.equals(b, null)) {
      str = fm.serializer.serializeString(fm.crypto.base64Encode(b));
      this.__dataJson = str;
      return str;
    }
    return null;
  };


  /*<span id='method-fm.websync.publishSuccessArgs-getIsBinary'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets whether or not the data is binary.
  	 </div>
  
  	@function getIsBinary
  	@return {Boolean}
   */

  publishSuccessArgs.prototype.getIsBinary = function() {
    return !fm.global.equals(this.getDataBytes(), null);
  };


  /*<span id='method-fm.websync.publishSuccessArgs-getTag'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the tag that identifies the contents of the payload.
  	 </div>
  
  	@function getTag
  	@return {String}
   */

  publishSuccessArgs.prototype.getTag = function() {
    return fm.serializer.deserializeString(this.getExtensionValueJson("fm.tag"));
  };

  publishSuccessArgs.prototype.getData = function() {
    return fm.json.deserialize(this.getDataJson.apply(this, arguments));
  };

  return publishSuccessArgs;

})(fm.websync.baseSuccessArgs);



/*<span id='cls-fm.websync.subscribeReceiveArgs'>&nbsp;</span> */

/**
@class fm.websync.subscribeReceiveArgs
 <div>
 Arguments for <see cref="fm.websync.subscribeArgs.onReceive">fm.websync.subscribeArgs.onReceive</see>.
 </div>

@extends fm.websync.baseReceiveArgs
 */
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.subscribeReceiveArgs = (function(superClass) {
  extend(subscribeReceiveArgs, superClass);

  subscribeReceiveArgs.prototype.__channel = null;


  /*<span id='method-fm.websync.subscribeReceiveArgs-fm.websync.subscribeReceiveArgs'>&nbsp;</span> */


  /**
  	 <div>
  	 Initializes a new instance of the <see cref="fm.websync.subscribeReceiveArgs">fm.websync.subscribeReceiveArgs</see> class.
  	 </div>
  	@function fm.websync.subscribeReceiveArgs
  	@param {String} channel The channel over which data was received.
  	@param {String} dataJson The data in JSON format.
  	@param {fm.array} dataBytes The data in binary format.
  	@param {fm.websync.connectionType} connectionType The current connection type.
  	@param {Integer} reconnectAfter The amount of time in milliseconds to pause before reconnecting to the server.
  	@return {}
   */

  function subscribeReceiveArgs() {
    this.getWasSentByMe = bind(this.getWasSentByMe, this);
    this.getPublishingClient = bind(this.getPublishingClient, this);
    this.getChannel = bind(this.getChannel, this);
    var channel, connectionType, dataBytes, dataJson, instance, reconnectAfter;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = subscribeReceiveArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    channel = arguments[0];
    dataJson = arguments[1];
    dataBytes = arguments[2];
    connectionType = arguments[3];
    reconnectAfter = arguments[4];
    instance = subscribeReceiveArgs.__super__.constructor.call(this, dataJson, dataBytes, connectionType, reconnectAfter);
    this.__channel = channel;
    return instance;
  }


  /*<span id='method-fm.websync.subscribeReceiveArgs-getChannel'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the channel over which the data was published.
  	 </div>
  
  	@function getChannel
  	@return {String}
   */

  subscribeReceiveArgs.prototype.getChannel = function() {
    return this.__channel;
  };


  /*<span id='method-fm.websync.subscribeReceiveArgs-getPublishingClient'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets details about the client sending the publication.
  	 </div>
  
  	@function getPublishingClient
  	@return {fm.websync.publishingClient}
   */

  subscribeReceiveArgs.prototype.getPublishingClient = function() {
    return fm.websync.publishingClient.fromJson(this.getExtensionValueJson("fm.publishing"));
  };


  /*<span id='method-fm.websync.subscribeReceiveArgs-getWasSentByMe'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets whether the data was sent by the current client.
  	 </div>
  
  	@function getWasSentByMe
  	@return {Boolean}
   */

  subscribeReceiveArgs.prototype.getWasSentByMe = function() {
    return (((!fm.global.equals(this.getPublishingClient(), null)) && (!fm.global.equals(this.getClient(), null))) && (this.getPublishingClient().getClientId() !== null)) && (fm.guid.equals(this.getPublishingClient().getClientId(), this.getClient().getClientId()));
  };

  return subscribeReceiveArgs;

})(fm.websync.baseReceiveArgs);



/*<span id='cls-fm.websync.subscribeSuccessArgs'>&nbsp;</span> */

/**
@class fm.websync.subscribeSuccessArgs
 <div>
 Arguments for subscribe success callbacks.
 </div>

@extends fm.websync.baseSuccessArgs
 */
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.subscribeSuccessArgs = (function(superClass) {
  extend(subscribeSuccessArgs, superClass);

  subscribeSuccessArgs.prototype.__channels = null;

  subscribeSuccessArgs.prototype._isResubscribe = false;

  function subscribeSuccessArgs() {
    this.setIsResubscribe = bind(this.setIsResubscribe, this);
    this.getTag = bind(this.getTag, this);
    this.getIsResubscribe = bind(this.getIsResubscribe, this);
    this.getChannels = bind(this.getChannels, this);
    this.getChannel = bind(this.getChannel, this);
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = subscribeSuccessArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = subscribeSuccessArgs.__super__.constructor.call(this);
    return instance;
  }


  /*<span id='method-fm.websync.subscribeSuccessArgs-getChannel'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the channel to which the client was subscribed.
  	 Must start with a forward slash (/).
  	 Overrides <see cref="fm.websync.subscribeSuccessArgs.channels">fm.websync.subscribeSuccessArgs.channels</see>.
  	 </div>
  
  	@function getChannel
  	@return {String}
   */

  subscribeSuccessArgs.prototype.getChannel = function() {
    return fm.websync.extensible.sharedGetChannel(this.__channels);
  };


  /*<span id='method-fm.websync.subscribeSuccessArgs-getChannels'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the channels to which the client was subscribed.
  	 Each must start with a forward slash (/).
  	 Overrides <see cref="fm.websync.subscribeSuccessArgs.channel">fm.websync.subscribeSuccessArgs.channel</see>.
  	 </div>
  
  	@function getChannels
  	@return {fm.array}
   */

  subscribeSuccessArgs.prototype.getChannels = function() {
    return fm.websync.extensible.sharedGetChannels(this.__channels);
  };


  /*<span id='method-fm.websync.subscribeSuccessArgs-getIsResubscribe'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets whether the subscribe call was automatically
  	 invoked following a stream failure.
  	 </div>
  
  	@function getIsResubscribe
  	@return {Boolean}
   */

  subscribeSuccessArgs.prototype.getIsResubscribe = function() {
    return this._isResubscribe;
  };


  /*<span id='method-fm.websync.subscribeSuccessArgs-getTag'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the tag associated with the subscribe request.
  	 </div>
  
  	@function getTag
  	@return {String}
   */

  subscribeSuccessArgs.prototype.getTag = function() {
    var ref;
    return (ref = fm.serializer.deserializeString(this.getExtensionValueJson("fm.tag"))) != null ? ref : fm.stringExtensions.empty;
  };

  subscribeSuccessArgs.prototype.setIsResubscribe = function() {
    var value;
    value = arguments[0];
    return this._isResubscribe = value;
  };

  return subscribeSuccessArgs;

})(fm.websync.baseSuccessArgs);



/*<span id='cls-fm.websync.unsubscribeSuccessArgs'>&nbsp;</span> */

/**
@class fm.websync.unsubscribeSuccessArgs
 <div>
 Arguments for unsubscribe success callbacks.
 </div>

@extends fm.websync.baseSuccessArgs
 */
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.unsubscribeSuccessArgs = (function(superClass) {
  extend(unsubscribeSuccessArgs, superClass);

  unsubscribeSuccessArgs.prototype.__channels = null;

  unsubscribeSuccessArgs.prototype.__forced = false;

  function unsubscribeSuccessArgs() {
    this.getTag = bind(this.getTag, this);
    this.getForced = bind(this.getForced, this);
    this.getChannels = bind(this.getChannels, this);
    this.getChannel = bind(this.getChannel, this);
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = unsubscribeSuccessArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = unsubscribeSuccessArgs.__super__.constructor.call(this);
    return instance;
  }


  /*<span id='method-fm.websync.unsubscribeSuccessArgs-getChannel'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the channel from which the client was unsubscribed.
  	 Must start with a forward slash (/).
  	 Overrides <see cref="fm.websync.unsubscribeSuccessArgs.channels">fm.websync.unsubscribeSuccessArgs.channels</see>.
  	 </div>
  
  	@function getChannel
  	@return {String}
   */

  unsubscribeSuccessArgs.prototype.getChannel = function() {
    return fm.websync.extensible.sharedGetChannel(this.__channels);
  };


  /*<span id='method-fm.websync.unsubscribeSuccessArgs-getChannels'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the channels from which the client was unsubscribed.
  	 Each must start with a forward slash (/).
  	 Overrides <see cref="fm.websync.unsubscribeSuccessArgs.channel">fm.websync.unsubscribeSuccessArgs.channel</see>.
  	 </div>
  
  	@function getChannels
  	@return {fm.array}
   */

  unsubscribeSuccessArgs.prototype.getChannels = function() {
    return fm.websync.extensible.sharedGetChannels(this.__channels);
  };


  /*<span id='method-fm.websync.unsubscribeSuccessArgs-getForced'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets whether this unsubscribe was forced due to a disconnect.
  	 </div>
  
  	@function getForced
  	@return {Boolean}
   */

  unsubscribeSuccessArgs.prototype.getForced = function() {
    return this.__forced;
  };


  /*<span id='method-fm.websync.unsubscribeSuccessArgs-getTag'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the tag associated with the subscribe request.
  	 </div>
  
  	@function getTag
  	@return {String}
   */

  unsubscribeSuccessArgs.prototype.getTag = function() {
    var ref;
    return (ref = fm.serializer.deserializeString(this.getExtensionValueJson("fm.tag"))) != null ? ref : fm.stringExtensions.empty;
  };

  return unsubscribeSuccessArgs;

})(fm.websync.baseSuccessArgs);



/*<span id='cls-fm.websync.publisherPublishResponseArgs'>&nbsp;</span> */

/**
@class fm.websync.publisherPublishResponseArgs
 <div>
 Arguments for <see cref="fm.websync.publisher.addOnPublishResponse">fm.websync.publisher.addOnPublishResponse</see>.
 </div>

@extends fm.websync.basePublisherResponseEventArgsGeneric
 */
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.publisherPublishResponseArgs = (function(superClass) {
  extend(publisherPublishResponseArgs, superClass);

  function publisherPublishResponseArgs() {
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = publisherPublishResponseArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = publisherPublishResponseArgs.__super__.constructor.call(this);
    return instance;
  }

  return publisherPublishResponseArgs;

})(fm.websync.basePublisherResponseEventArgsGeneric);



/*<span id='cls-fm.websync.publisherPublishRequestArgs'>&nbsp;</span> */

/**
@class fm.websync.publisherPublishRequestArgs
 <div>
 Arguments for <see cref="fm.websync.publisher.addOnPublishRequest">fm.websync.publisher.addOnPublishRequest</see>.
 </div>

@extends fm.websync.basePublisherRequestEventArgsGeneric
 */
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.publisherPublishRequestArgs = (function(superClass) {
  extend(publisherPublishRequestArgs, superClass);

  function publisherPublishRequestArgs() {
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = publisherPublishRequestArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = publisherPublishRequestArgs.__super__.constructor.call(this);
    return instance;
  }

  return publisherPublishRequestArgs;

})(fm.websync.basePublisherRequestEventArgsGeneric);


var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.deferredRetryConnectState = (function(superClass) {
  extend(deferredRetryConnectState, superClass);

  deferredRetryConnectState.prototype._backoffTimeout = 0;

  deferredRetryConnectState.prototype._connectArgs = null;

  function deferredRetryConnectState() {
    this.setConnectArgs = bind(this.setConnectArgs, this);
    this.setBackoffTimeout = bind(this.setBackoffTimeout, this);
    this.getConnectArgs = bind(this.getConnectArgs, this);
    this.getBackoffTimeout = bind(this.getBackoffTimeout, this);
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = deferredRetryConnectState.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = deferredRetryConnectState.__super__.constructor.call(this);
    return instance;
  }

  deferredRetryConnectState.prototype.getBackoffTimeout = function() {
    return this._backoffTimeout;
  };

  deferredRetryConnectState.prototype.getConnectArgs = function() {
    return this._connectArgs;
  };

  deferredRetryConnectState.prototype.setBackoffTimeout = function() {
    var value;
    value = arguments[0];
    return this._backoffTimeout = value;
  };

  deferredRetryConnectState.prototype.setConnectArgs = function() {
    var value;
    value = arguments[0];
    return this._connectArgs = value;
  };

  return deferredRetryConnectState;

})(fm.object);


var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.deferredStreamState = (function(superClass) {
  extend(deferredStreamState, superClass);

  deferredStreamState.prototype._connectArgs = null;

  deferredStreamState.prototype._receivedMessages = false;

  function deferredStreamState() {
    this.setReceivedMessages = bind(this.setReceivedMessages, this);
    this.setConnectArgs = bind(this.setConnectArgs, this);
    this.getReceivedMessages = bind(this.getReceivedMessages, this);
    this.getConnectArgs = bind(this.getConnectArgs, this);
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = deferredStreamState.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = deferredStreamState.__super__.constructor.call(this);
    return instance;
  }

  deferredStreamState.prototype.getConnectArgs = function() {
    return this._connectArgs;
  };

  deferredStreamState.prototype.getReceivedMessages = function() {
    return this._receivedMessages;
  };

  deferredStreamState.prototype.setConnectArgs = function() {
    var value;
    value = arguments[0];
    return this._connectArgs = value;
  };

  deferredStreamState.prototype.setReceivedMessages = function() {
    var value;
    value = arguments[0];
    return this._receivedMessages = value;
  };

  return deferredStreamState;

})(fm.object);



/*<span id='cls-fm.websync.messageTransferFactory'>&nbsp;</span> */

/**
@class fm.websync.messageTransferFactory
 <div>
 Creates implementations of <see cref="fm.websync.messageTransfer">fm.websync.messageTransfer</see>.
 </div>

@extends fm.object
 */
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.messageTransferFactory = (function(superClass) {
  extend(messageTransferFactory, superClass);

  messageTransferFactory._createHttpMessageTransfer = null;

  messageTransferFactory._createWebSocketMessageTransfer = null;

  function messageTransferFactory() {
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = messageTransferFactory.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = messageTransferFactory.__super__.constructor.call(this);
    return instance;
  }

  messageTransferFactory.defaultCreateHttpMessageTransfer = function() {
    return new fm.websync.httpMessageTransfer();
  };

  messageTransferFactory.defaultCreateWebSocketMessageTransfer = function() {
    var requestUrl;
    requestUrl = arguments[0];
    return new fm.websync.webSocketMessageTransfer(requestUrl);
  };


  /*<span id='method-fm.websync.messageTransferFactory-getCreateHttpMessageTransfer'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the callback that creates an HTTP-based message transfer class.
  	 </div>
  
  	@function getCreateHttpMessageTransfer
  	@return {fm.emptyFunction}
   */

  messageTransferFactory.getCreateHttpMessageTransfer = function() {
    return fm.websync.messageTransferFactory._createHttpMessageTransfer;
  };


  /*<span id='method-fm.websync.messageTransferFactory-getCreateWebSocketMessageTransfer'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the callback that creates a WebSocket-based message transfer class.
  	 </div>
  
  	@function getCreateWebSocketMessageTransfer
  	@return {fm.singleFunction}
   */

  messageTransferFactory.getCreateWebSocketMessageTransfer = function() {
    return fm.websync.messageTransferFactory._createWebSocketMessageTransfer;
  };


  /*<span id='method-fm.websync.messageTransferFactory-getHttpMessageTransfer'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets an instance of the HTTP-based message transfer class.
  	 </div>
  	@function getHttpMessageTransfer
  	@return {fm.websync.messageTransfer}
   */

  messageTransferFactory.getHttpMessageTransfer = function() {
    var transfer;
    if (fm.global.equals(fm.websync.messageTransferFactory.getCreateHttpMessageTransfer(), null)) {
      messageTransferFactory.setCreateHttpMessageTransfer(messageTransferFactory.defaultCreateHttpMessageTransfer);
    }
    transfer = fm.websync.messageTransferFactory.getCreateHttpMessageTransfer()();
    if (fm.global.equals(transfer, null)) {
      transfer = fm.websync.messageTransferFactory.defaultCreateHttpMessageTransfer();
    }
    return transfer;
  };


  /*<span id='method-fm.websync.messageTransferFactory-getWebSocketMessageTransfer'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets an instance of the WebSocket-based message transfer class.
  	 </div>
  	@function getWebSocketMessageTransfer
  	@param {String} requestUrl
  	@return {fm.websync.webSocketMessageTransfer}
   */

  messageTransferFactory.getWebSocketMessageTransfer = function() {
    var requestUrl, transfer;
    requestUrl = arguments[0];
    if (fm.global.equals(fm.websync.messageTransferFactory.getCreateWebSocketMessageTransfer(), null)) {
      messageTransferFactory.setCreateWebSocketMessageTransfer(messageTransferFactory.defaultCreateWebSocketMessageTransfer);
    }
    transfer = fm.websync.messageTransferFactory.getCreateWebSocketMessageTransfer()(requestUrl);
    if (fm.global.equals(transfer, null)) {
      transfer = fm.websync.messageTransferFactory.defaultCreateWebSocketMessageTransfer(requestUrl);
    }
    return transfer;
  };


  /*<span id='method-fm.websync.messageTransferFactory-setCreateHttpMessageTransfer'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the callback that creates an HTTP-based message transfer class.
  	 </div>
  
  	@function setCreateHttpMessageTransfer
  	@param {fm.emptyFunction} value
  	@return {void}
   */

  messageTransferFactory.setCreateHttpMessageTransfer = function() {
    var value;
    value = arguments[0];
    return messageTransferFactory._createHttpMessageTransfer = value;
  };


  /*<span id='method-fm.websync.messageTransferFactory-setCreateWebSocketMessageTransfer'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the callback that creates a WebSocket-based message transfer class.
  	 </div>
  
  	@function setCreateWebSocketMessageTransfer
  	@param {fm.singleFunction} value
  	@return {void}
   */

  messageTransferFactory.setCreateWebSocketMessageTransfer = function() {
    var value;
    value = arguments[0];
    return messageTransferFactory._createWebSocketMessageTransfer = value;
  };

  return messageTransferFactory;

})(fm.object);



/*<span id='cls-fm.websync.messageTransfer'>&nbsp;</span> */

/**
@class fm.websync.messageTransfer
 <div>
 Base class that defines methods for transferring messages over HTTP.
 </div>

@extends fm.object
 */
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.messageTransfer = (function(superClass) {
  extend(messageTransfer, superClass);

  messageTransfer.prototype._messageTransferCallbackKey = null;

  messageTransfer.prototype._requestArgsKey = null;

  function messageTransfer() {
    this.shutdown = bind(this.shutdown, this);
    this.sendMessagesAsync = bind(this.sendMessagesAsync, this);
    this.sendMessages = bind(this.sendMessages, this);
    this.sendAsyncCallback = bind(this.sendAsyncCallback, this);
    this.sendAsync = bind(this.sendAsync, this);
    this.send = bind(this.send, this);
    this.messageRequestArgsToHttpRequestArgs = bind(this.messageRequestArgsToHttpRequestArgs, this);
    this.httpResponseArgsToMessageResponseArgs = bind(this.httpResponseArgsToMessageResponseArgs, this);
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = messageTransfer.__super__.constructor.call(this);
      this._messageTransferCallbackKey = "fm.websync.messageTransfer.callback";
      this._requestArgsKey = "fm.websync.messageTransfer.requestArgs";
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = messageTransfer.__super__.constructor.call(this);
    this._messageTransferCallbackKey = "fm.websync.messageTransfer.callback";
    this._requestArgsKey = "fm.websync.messageTransfer.requestArgs";
    return instance;
  }

  messageTransfer.raiseRequestCreated = function() {
    var p, requestArgs;
    requestArgs = arguments[0];
    if (!fm.global.equals(requestArgs.getOnRequestCreated(), null)) {
      p = new fm.websync.messageRequestCreatedArgs();
      p.setRequests(requestArgs.getMessages());
      p.setSender(requestArgs.getSender());
      return requestArgs.getOnRequestCreated()(p);
    }
  };

  messageTransfer.raiseResponseReceived = function() {
    var p, responseArgs;
    responseArgs = arguments[0];
    if ((fm.global.equals(responseArgs.getException(), null)) && (!fm.global.equals(responseArgs.getRequestArgs().getOnResponseReceived(), null))) {
      p = new fm.websync.messageResponseReceivedArgs();
      p.setResponses(responseArgs.getMessages());
      p.setSender(responseArgs.getRequestArgs().getSender());
      return responseArgs.getRequestArgs().getOnResponseReceived()(p);
    }
  };


  /*<span id='method-fm.websync.messageTransfer-httpResponseArgsToMessageResponseArgs'>&nbsp;</span> */


  /**
  	 <div>
  	 Converts an <see cref="fm.httpResponseArgs">fm.httpResponseArgs</see> to a <see cref="fm.websync.messageRequestArgs">fm.websync.messageRequestArgs</see>.
  	 </div>
  	@function httpResponseArgsToMessageResponseArgs
  	@param {fm.httpResponseArgs} httpResponseArgs The HTTP response arguments.
  	@return {fm.websync.messageResponseArgs}
   */

  messageTransfer.prototype.httpResponseArgsToMessageResponseArgs = function() {
    var args2, args3, dynamicValue, httpResponseArgs;
    httpResponseArgs = arguments[0];
    dynamicValue = httpResponseArgs.getRequestArgs().getDynamicValue(this._requestArgsKey);
    args3 = new fm.websync.messageResponseArgs(dynamicValue);
    args3.setException(httpResponseArgs.getException());
    args3.setHeaders(httpResponseArgs.getHeaders());
    args2 = args3;
    if (!fm.stringExtensions.isNullOrEmpty(httpResponseArgs.getTextContent())) {
      args2.setMessages(fm.websync.message.fromJsonMultiple(httpResponseArgs.getTextContent()));
      return args2;
    }
    if (!fm.global.equals(httpResponseArgs.getBinaryContent(), null)) {
      args2.setMessages(fm.websync.message.fromBinaryMultiple(httpResponseArgs.getBinaryContent()));
    }
    return args2;
  };


  /*<span id='method-fm.websync.messageTransfer-messageRequestArgsToHttpRequestArgs'>&nbsp;</span> */


  /**
  	 <div>
  	 Converts a <see cref="fm.websync.messageRequestArgs">fm.websync.messageRequestArgs</see> to an <see cref="fm.httpRequestArgs">fm.httpRequestArgs</see>.
  	 </div>
  	@function messageRequestArgsToHttpRequestArgs
  	@param {fm.websync.messageRequestArgs} requestArgs The request arguments.
  	@return {fm.httpRequestArgs}
   */

  messageTransfer.prototype.messageRequestArgsToHttpRequestArgs = function() {
    var _var0, args, args2, i, len, requestArgs, str;
    requestArgs = arguments[0];
    args2 = new fm.httpRequestArgs();
    args2.setMethod(fm.httpMethod.Post);
    args2.setOnRequestCreated(requestArgs.getOnHttpRequestCreated());
    args2.setOnResponseReceived(requestArgs.getOnHttpResponseReceived());
    args2.setSender(requestArgs.getSender());
    args2.setTimeout(requestArgs.getTimeout());
    args2.setUrl(requestArgs.getUrl());
    args2.setDynamicProperties(requestArgs.getDynamicProperties());
    args = args2;
    args.setDynamicValue(this._requestArgsKey, requestArgs);
    _var0 = requestArgs.getHeaders().getAllKeys();
    for (i = 0, len = _var0.length; i < len; i++) {
      str = _var0[i];
      args.getHeaders().set(str, requestArgs.getHeaders().get(str));
    }
    args.setTextContent(fm.websync.message.toJsonMultiple(requestArgs.getMessages()));
    args.getHeaders().set("Content-Type", "application/json");
    if (requestArgs.getIsBinary()) {
      args.setBinaryContent(fm.websync.message.toBinaryMultiple(requestArgs.getMessages()));
      args.getHeaders().set("Content-Type", "application/octet-stream");
    }
    return args;
  };


  /*<span id='method-fm.websync.messageTransfer-send'>&nbsp;</span> */


  /**
  	 <div>
  	 Sends messages synchronously.
  	 </div>
  	@function send
  	@param {fm.websync.messageRequestArgs} requestArgs The message parameters.
  	@return {fm.websync.messageResponseArgs} The resulting response.
   */

  messageTransfer.prototype.send = function() {
    var args, args2, error, exception, requestArgs;
    requestArgs = arguments[0];
    fm.websync.messageTransfer.raiseRequestCreated(requestArgs);
    try {
      args = this.sendMessages(requestArgs);
      fm.websync.messageTransfer.raiseResponseReceived(args);
    } catch (error) {
      exception = error;
      args2 = new fm.websync.messageResponseArgs(requestArgs);
      args2.setException(exception);
      args = args2;
    } finally {

    }
    return args;
  };


  /*<span id='method-fm.websync.messageTransfer-sendAsync'>&nbsp;</span> */


  /**
  	 <div>
  	 Sends messages asynchronously.
  	 </div>
  	@function sendAsync
  	@param {fm.websync.messageRequestArgs} requestArgs The message parameters.
  	@param {fm.singleAction} callback The callback to execute with the resulting response.
  	@return {void}
   */

  messageTransfer.prototype.sendAsync = function() {
    var callback, error, exception, p, requestArgs;
    requestArgs = arguments[0];
    callback = arguments[1];
    fm.websync.messageTransfer.raiseRequestCreated(requestArgs);
    requestArgs.setDynamicValue(this._messageTransferCallbackKey, callback);
    try {
      return this.sendMessagesAsync(requestArgs, this.sendAsyncCallback);
    } catch (error) {
      exception = error;
      p = new fm.websync.messageResponseArgs(requestArgs);
      p.setException(exception);
      return callback(p);
    } finally {

    }
  };

  messageTransfer.prototype.sendAsyncCallback = function() {
    var dynamicValue, responseArgs;
    responseArgs = arguments[0];
    dynamicValue = responseArgs.getRequestArgs().getDynamicValue(this._messageTransferCallbackKey);
    responseArgs.getRequestArgs().unsetDynamicValue(this._messageTransferCallbackKey);
    fm.websync.messageTransfer.raiseResponseReceived(responseArgs);
    return dynamicValue(responseArgs);
  };


  /*<span id='method-fm.websync.messageTransfer-sendMessages'>&nbsp;</span> */


  /**
  	 <div>
  	 Sends a request synchronously.
  	 </div>
  	@function sendMessages
  	@param {fm.websync.messageRequestArgs} requestArgs The request parameters.
  	@return {fm.websync.messageResponseArgs} The response parameters.
   */

  messageTransfer.prototype.sendMessages = function() {
    var requestArgs;
    return requestArgs = arguments[0];
  };


  /*<span id='method-fm.websync.messageTransfer-sendMessagesAsync'>&nbsp;</span> */


  /**
  	 <div>
  	 Sends a request asynchronously.
  	 </div>
  	@function sendMessagesAsync
  	@param {fm.websync.messageRequestArgs} requestArgs The request parameters.
  	@param {fm.singleAction} callback The callback to execute with the response parameters.
  	@return {void}
   */

  messageTransfer.prototype.sendMessagesAsync = function() {
    var callback, requestArgs;
    requestArgs = arguments[0];
    return callback = arguments[1];
  };


  /*<span id='method-fm.websync.messageTransfer-shutdown'>&nbsp;</span> */


  /**
  	 <div>
  	 Releases any resources and shuts down.
  	 </div>
  
  	@function shutdown
  	@return {void}
   */

  messageTransfer.prototype.shutdown = function() {};

  return messageTransfer;

})(fm.object);



/*<span id='cls-fm.websync.httpMessageTransfer'>&nbsp;</span> */

/**
@class fm.websync.httpMessageTransfer
 <div>
 Defines methods for transferring messages using an instance of <see cref="fm.httpWebRequestTransfer">fm.httpWebRequestTransfer</see>.
 </div>

@extends fm.websync.messageTransfer
 */
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.httpMessageTransfer = (function(superClass) {
  extend(httpMessageTransfer, superClass);

  httpMessageTransfer.prototype._callbackKey = null;

  httpMessageTransfer.prototype._httpTransfer = null;


  /*<span id='method-fm.websync.httpMessageTransfer-fm.websync.httpMessageTransfer'>&nbsp;</span> */


  /**
  	 <div>
  	 Initializes a new instance of the <see cref="fm.websync.httpMessageTransfer">fm.websync.httpMessageTransfer</see> class.
  	 </div>
  
  	@function fm.websync.httpMessageTransfer
  	@return {}
   */

  function httpMessageTransfer() {
    this.shutdown = bind(this.shutdown, this);
    this.sendMessagesAsyncCallback = bind(this.sendMessagesAsyncCallback, this);
    this.sendMessagesAsync = bind(this.sendMessagesAsync, this);
    this.sendMessages = bind(this.sendMessages, this);
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = httpMessageTransfer.__super__.constructor.call(this);
      this._callbackKey = "fm.websync.httpMessageTransfer.callback";
      this._httpTransfer = fm.httpTransferFactory.getHttpTransfer();
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = httpMessageTransfer.__super__.constructor.call(this);
    this._callbackKey = "fm.websync.httpMessageTransfer.callback";
    this._httpTransfer = fm.httpTransferFactory.getHttpTransfer();
    return instance;
  }


  /*<span id='method-fm.websync.httpMessageTransfer-sendMessages'>&nbsp;</span> */


  /**
  	 <div>
  	 Sends a request synchronously.
  	 </div>
  	@function sendMessages
  	@param {fm.websync.messageRequestArgs} requestArgs The request parameters.
  	@return {fm.websync.messageResponseArgs} The response parameters.
   */

  httpMessageTransfer.prototype.sendMessages = function() {
    var args, httpResponseArgs, requestArgs;
    requestArgs = arguments[0];
    args = this.messageRequestArgsToHttpRequestArgs(requestArgs);
    httpResponseArgs = this._httpTransfer.send(args);
    return this.httpResponseArgsToMessageResponseArgs(httpResponseArgs);
  };


  /*<span id='method-fm.websync.httpMessageTransfer-sendMessagesAsync'>&nbsp;</span> */


  /**
  	 <div>
  	 Sends a request asynchronously.
  	 </div>
  	@function sendMessagesAsync
  	@param {fm.websync.messageRequestArgs} requestArgs The request parameters.
  	@param {fm.singleAction} callback The callback to execute with the resulting response.
  	@return {void}
   */

  httpMessageTransfer.prototype.sendMessagesAsync = function() {
    var args, callback, requestArgs;
    requestArgs = arguments[0];
    callback = arguments[1];
    args = this.messageRequestArgsToHttpRequestArgs(requestArgs);
    args.setDynamicValue(this._callbackKey, callback);
    return this._httpTransfer.sendAsync(args, this.sendMessagesAsyncCallback);
  };

  httpMessageTransfer.prototype.sendMessagesAsyncCallback = function() {
    var dynamicValue, httpResponseArgs;
    httpResponseArgs = arguments[0];
    if (fm.global.equals(httpResponseArgs, null)) {
      return fm.log.debug("Failed to send message async callback because `httpResponseArgs` is null.");
    } else {
      if (fm.global.equals(httpResponseArgs.getRequestArgs(), null)) {
        return fm.log.debug("Failed to send message async callback because `httpResponseArgs.RequestArgs` is null.");
      } else {
        dynamicValue = httpResponseArgs.getRequestArgs().getDynamicValue(this._callbackKey);
        if (!fm.global.equals(dynamicValue, null)) {
          httpResponseArgs.getRequestArgs().unsetDynamicValue(this._callbackKey);
          return dynamicValue(this.httpResponseArgsToMessageResponseArgs(httpResponseArgs));
        } else {
          return fm.log.debug("Failed to send message async callback because `callback` is null.");
        }
      }
    }
  };


  /*<span id='method-fm.websync.httpMessageTransfer-shutdown'>&nbsp;</span> */


  /**
  	 <div>
  	 Releases any resources and shuts down.
  	 </div>
  
  	@function shutdown
  	@return {void}
   */

  httpMessageTransfer.prototype.shutdown = function() {
    var error, exception1;
    try {
      return this._httpTransfer.shutdown();
    } catch (error) {
      exception1 = error;
    } finally {

    }
  };

  return httpMessageTransfer;

})(fm.websync.messageTransfer);



/*<span id='cls-fm.websync.notifyingClient'>&nbsp;</span> */

/**
@class fm.websync.notifyingClient
 <div>
 Details about the client sending the notification data.
 </div>

@extends fm.serializable
 */
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.notifyingClient = (function(superClass) {
  extend(notifyingClient, superClass);

  notifyingClient.prototype._boundRecords = null;

  notifyingClient.prototype._clientId = null;


  /*<span id='method-fm.websync.notifyingClient-fm.websync.notifyingClient'>&nbsp;</span> */


  /**
  	 <div>
  	 Initializes a new instance of the <see cref="fm.websync.notifyingClient">fm.websync.notifyingClient</see> class.
  	 </div>
  	@function fm.websync.notifyingClient
  	@param {fm.nullable} clientId The notifying client's ID.
  	@param {Object} boundRecords The records bound to the client.
  	@return {}
   */

  function notifyingClient() {
    this.getBoundRecordValue = bind(this.getBoundRecordValue, this);
    this.toJson = bind(this.toJson, this);
    this.setClientId = bind(this.setClientId, this);
    this.setBoundRecords = bind(this.setBoundRecords, this);
    this.getClientId = bind(this.getClientId, this);
    this.getBoundRecordValueJson = bind(this.getBoundRecordValueJson, this);
    this.getBoundRecords = bind(this.getBoundRecords, this);
    var boundRecords, clientId, instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = notifyingClient.__super__.constructor.call(this);
      this.setBoundRecords({});
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    if (arguments.length === 2) {
      clientId = arguments[0];
      boundRecords = arguments[1];
      instance = notifyingClient.__super__.constructor.call(this);
      this.setClientId(clientId);
      this.setBoundRecords(boundRecords);
      return instance;
    }
    if (arguments.length === 0) {
      instance = notifyingClient.__super__.constructor.call(this);
      this.setBoundRecords({});
      return instance;
    }
  }


  /*<span id='method-fm.websync.notifyingClient-fromJson'>&nbsp;</span> */


  /**
  	 <div>
  	 Deserializes a JSON-formatted notifying client.
  	 </div>
  	@function fromJson
  	@param {String} notifyingClientJson The JSON-formatted notifying client to deserialize.
  	@return {fm.websync.notifyingClient} The notifying client.
   */

  notifyingClient.fromJson = function() {
    var notifyingClientJson;
    notifyingClientJson = arguments[0];
    return fm.websync.serializer.deserializeNotifyingClient(notifyingClientJson);
  };


  /*<span id='method-fm.websync.notifyingClient-toJson'>&nbsp;</span> */


  /**
  	 <div>
  	 Serializes a notifying client to JSON.
  	 </div>
  	@function toJson
  	@param {fm.websync.notifyingClient} notifyingClient The notifying client to serialize.
  	@return {String} The JSON-formatted notifying client.
   */

  notifyingClient.toJson = function() {
    var notifyingClient;
    notifyingClient = arguments[0];
    return fm.websync.serializer.serializeNotifyingClient(notifyingClient);
  };


  /*<span id='method-fm.websync.notifyingClient-getBoundRecords'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the notifying client's bound records.
  	 </div>
  
  	@function getBoundRecords
  	@return {Object}
   */

  notifyingClient.prototype.getBoundRecords = function() {
    return this._boundRecords;
  };


  /*<span id='method-fm.websync.notifyingClient-getBoundRecordValueJson'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the JSON value of a record bound to the notifying client.
  	 </div>
  	@function getBoundRecordValueJson
  	@param {String} key The record key.
  	@return {String} The JSON value of the record, if it exists, or null.
   */

  notifyingClient.prototype.getBoundRecordValueJson = function() {
    var _var0, _var1, key, record;
    key = arguments[0];
    if (fm.global.equals(this.getBoundRecords(), null)) {
      return null;
    }
    record = null;
    _var0 = new fm.holder(record);
    _var1 = fm.hashExtensions.tryGetValue(this.getBoundRecords(), key, _var0);
    record = _var0.getValue();
    if (!_var1) {
      return null;
    }
    return record.getValueJson();
  };


  /*<span id='method-fm.websync.notifyingClient-getClientId'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the notifying client's ID.
  	 </div>
  
  	@function getClientId
  	@return {fm.nullable}
   */

  notifyingClient.prototype.getClientId = function() {
    return this._clientId;
  };


  /*<span id='method-fm.websync.notifyingClient-setBoundRecords'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the notifying client's bound records.
  	 </div>
  
  	@function setBoundRecords
  	@param {Object} value
  	@return {void}
   */

  notifyingClient.prototype.setBoundRecords = function() {
    var value;
    value = arguments[0];
    return this._boundRecords = value;
  };


  /*<span id='method-fm.websync.notifyingClient-setClientId'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the notifying client's ID.
  	 </div>
  
  	@function setClientId
  	@param {fm.nullable} value
  	@return {void}
   */

  notifyingClient.prototype.setClientId = function() {
    var value;
    value = arguments[0];
    return this._clientId = value;
  };


  /*<span id='method-fm.websync.notifyingClient-toJson'>&nbsp;</span> */


  /**
  	 <div>
  	 Serializes this instance to JSON.
  	 </div>
  	@function toJson
  	@return {String} The JSON-formatted notifying client.
   */

  notifyingClient.prototype.toJson = function() {
    return fm.websync.notifyingClient.toJson(this);
  };

  notifyingClient.prototype.getBoundRecordValue = function() {
    var key;
    key = arguments[0];
    return fm.json.deserialize(this.getBoundRecordValueJson.apply(this, arguments));
  };

  return notifyingClient;

})(fm.serializable);



/*<span id='cls-fm.websync.baseMessage'>&nbsp;</span> */

/**
@class fm.websync.baseMessage
 <div>
 Base class for WebSync client/publisher messages.
 </div>

@extends fm.websync.extensible
 */
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.baseMessage = (function(superClass) {
  extend(baseMessage, superClass);

  baseMessage.prototype.__dataBytes = null;

  baseMessage.prototype.__dataJson = null;

  baseMessage.prototype.__error = null;

  baseMessage.prototype.__successful = false;

  baseMessage.prototype.__timestamp = null;

  baseMessage.prototype._validate = false;


  /*<span id='method-fm.websync.baseMessage-fm.websync.baseMessage'>&nbsp;</span> */


  /**
  	 <div>
  	 Initializes a new instance of the <see cref="fm.websync.baseMessage">fm.websync.baseMessage</see> class.
  	 </div>
  
  	@function fm.websync.baseMessage
  	@return {}
   */

  function baseMessage() {
    this.setData = bind(this.setData, this);
    this.getData = bind(this.getData, this);
    this.setValidate = bind(this.setValidate, this);
    this.setTimestamp = bind(this.setTimestamp, this);
    this.setSuccessful = bind(this.setSuccessful, this);
    this.setError = bind(this.setError, this);
    this.setDataJson = bind(this.setDataJson, this);
    this.setDataBytes = bind(this.setDataBytes, this);
    this.getValidate = bind(this.getValidate, this);
    this.getTimestamp = bind(this.getTimestamp, this);
    this.getSuccessful = bind(this.getSuccessful, this);
    this.getIsBinary = bind(this.getIsBinary, this);
    this.getError = bind(this.getError, this);
    this.getDataJson = bind(this.getDataJson, this);
    this.getDataBytes = bind(this.getDataBytes, this);
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = baseMessage.__super__.constructor.call(this);
      this.setValidate(true);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = baseMessage.__super__.constructor.call(this);
    this.setValidate(true);
    return instance;
  }


  /*<span id='method-fm.websync.baseMessage-getDataBytes'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the data payload
  	 in binary format. (Overrides <see cref="fm.websync.baseMessage.dataJson">fm.websync.baseMessage.dataJson</see>.)
  	 </div>
  
  	@function getDataBytes
  	@return {fm.array}
   */

  baseMessage.prototype.getDataBytes = function() {
    var _var0, _var1, decoded, valueJson;
    decoded = this.__dataBytes;
    valueJson = this.__dataJson;
    if (!fm.global.equals(decoded, null)) {
      return decoded;
    }
    if (!fm.global.equals(valueJson, null)) {
      _var0 = new fm.holder(decoded);
      _var1 = fm.crypto.tryBase64Decode(fm.serializer.deserializeString(valueJson), _var0);
      decoded = _var0.getValue();
      if (!_var1) {
        decoded = null;
      }
      this.__dataBytes = decoded;
      return decoded;
    }
    return null;
  };


  /*<span id='method-fm.websync.baseMessage-getDataJson'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the data payload
  	 in JSON format. (Overrides <see cref="fm.websync.baseMessage.dataBytes">fm.websync.baseMessage.dataBytes</see>.)
  	 </div>
  
  	@function getDataJson
  	@return {String}
   */

  baseMessage.prototype.getDataJson = function() {
    var b, str;
    str = this.__dataJson;
    b = this.__dataBytes;
    if (!fm.global.equals(str, null)) {
      return str;
    }
    if (!fm.global.equals(b, null)) {
      str = fm.serializer.serializeString(fm.crypto.base64Encode(b));
      this.__dataJson = str;
      return str;
    }
    return null;
  };


  /*<span id='method-fm.websync.baseMessage-getError'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the friendly error message if <see cref="fm.websync.baseMessage.successful">fm.websync.baseMessage.successful</see> is
  	 <c>false</c>.
  	 </div>
  
  	@function getError
  	@return {String}
   */

  baseMessage.prototype.getError = function() {
    return this.__error;
  };


  /*<span id='method-fm.websync.baseMessage-getIsBinary'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets whether or not the data is binary.
  	 </div>
  
  	@function getIsBinary
  	@return {Boolean}
   */

  baseMessage.prototype.getIsBinary = function() {
    return !fm.global.equals(this.getDataBytes(), null);
  };


  /*<span id='method-fm.websync.baseMessage-getSuccessful'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the flag that indicates whether the request should be
  	 processed. If the message represents a response, this indicates whether the
  	 processing was successful. If set to <c>false</c>, the <see cref="fm.websync.baseMessage.error">fm.websync.baseMessage.error</see>
  	 property should be set to a friendly error message.
  	 </div>
  
  	@function getSuccessful
  	@return {Boolean}
   */

  baseMessage.prototype.getSuccessful = function() {
    return this.__successful;
  };


  /*<span id='method-fm.websync.baseMessage-getTimestamp'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the date/time the message was processed on the server (in UTC/GMT).
  	 </div>
  
  	@function getTimestamp
  	@return {fm.nullable}
   */

  baseMessage.prototype.getTimestamp = function() {
    return this.__timestamp;
  };


  /*<span id='method-fm.websync.baseMessage-getValidate'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets whether to skip validation while deserializing, used internally.
  	 </div>
  
  	@function getValidate
  	@return {Boolean}
   */

  baseMessage.prototype.getValidate = function() {
    return this._validate;
  };


  /*<span id='method-fm.websync.baseMessage-setDataBytes'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the data payload
  	 in binary format. (Overrides <see cref="fm.websync.baseMessage.dataJson">fm.websync.baseMessage.dataJson</see>.)
  	 </div>
  
  	@function setDataBytes
  	@param {fm.array} value
  	@return {void}
   */

  baseMessage.prototype.setDataBytes = function() {
    var value;
    value = arguments[0];
    this.__dataJson = null;
    this.__dataBytes = value;
    return this.setIsDirty(true);
  };


  /*<span id='method-fm.websync.baseMessage-setDataJson'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the data payload
  	 in JSON format. (Overrides <see cref="fm.websync.baseMessage.dataBytes">fm.websync.baseMessage.dataBytes</see>.)
  	 </div>
  
  	@function setDataJson
  	@param {String} value
  	@return {void}
   */

  baseMessage.prototype.setDataJson = function() {
    var value;
    value = arguments[0];
    if (!((!this.getValidate() || (fm.global.equals(value, null))) || fm.serializer.isValidJson(value))) {
      throw new Error("The value is not valid JSON.");
    }
    this.__dataJson = value;
    this.__dataBytes = null;
    return this.setIsDirty(true);
  };


  /*<span id='method-fm.websync.baseMessage-setError'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the friendly error message if <see cref="fm.websync.baseMessage.successful">fm.websync.baseMessage.successful</see> is
  	 <c>false</c>.
  	 </div>
  
  	@function setError
  	@param {String} value
  	@return {void}
   */

  baseMessage.prototype.setError = function() {
    var value;
    value = arguments[0];
    this.__error = value;
    return this.setIsDirty(true);
  };


  /*<span id='method-fm.websync.baseMessage-setSuccessful'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the flag that indicates whether the request should be
  	 processed. If the message represents a response, this indicates whether the
  	 processing was successful. If set to <c>false</c>, the <see cref="fm.websync.baseMessage.error">fm.websync.baseMessage.error</see>
  	 property should be set to a friendly error message.
  	 </div>
  
  	@function setSuccessful
  	@param {Boolean} value
  	@return {void}
   */

  baseMessage.prototype.setSuccessful = function() {
    var value;
    value = arguments[0];
    this.__successful = value;
    return this.setIsDirty(true);
  };


  /*<span id='method-fm.websync.baseMessage-setTimestamp'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the date/time the message was processed on the server (in UTC/GMT).
  	 </div>
  
  	@function setTimestamp
  	@param {fm.nullable} value
  	@return {void}
   */

  baseMessage.prototype.setTimestamp = function() {
    var value;
    value = arguments[0];
    this.__timestamp = value;
    return this.setIsDirty(true);
  };


  /*<span id='method-fm.websync.baseMessage-setValidate'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets whether to skip validation while deserializing, used internally.
  	 </div>
  
  	@function setValidate
  	@param {Boolean} value
  	@return {void}
   */

  baseMessage.prototype.setValidate = function() {
    var value;
    value = arguments[0];
    return this._validate = value;
  };

  baseMessage.prototype.getData = function() {
    return fm.json.deserialize(this.getDataJson.apply(this, arguments));
  };

  baseMessage.prototype.setData = function() {
    var data;
    data = arguments[0];
    arguments[arguments.length - 1] = fm.json.serialize(arguments[arguments.length - 1]);
    return this.setDataJson.apply(this, arguments);
  };

  return baseMessage;

})(fm.websync.extensible);



/*<span id='cls-fm.websync.notification'>&nbsp;</span> */

/**
@class fm.websync.notification
 <div>
 The WebSync notification used for direct notifying.
 </div>

@extends fm.websync.baseMessage
 */
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.notification = (function(superClass) {
  extend(notification, superClass);


  /*<span id='method-fm.websync.notification-fm.websync.notification'>&nbsp;</span> */


  /**
  	 <div>
  	 Creates a new notification with a client ID and JSON data.
  	 </div>
  	@function fm.websync.notification
  	@param {fm.guid} clientId The client ID to target.
  	@param {String} dataJson The data to send (in JSON format).
  	@param {String} tag The tag that identifies the contents of the payload.
  	@return {}
   */

  function notification() {
    this.toJson = bind(this.toJson, this);
    this.setTag = bind(this.setTag, this);
    this.setClientId = bind(this.setClientId, this);
    this.getTag = bind(this.getTag, this);
    this.getClientId = bind(this.getClientId, this);
    var clientId, dataJson, instance, tag;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = notification.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    if (arguments.length === 2) {
      clientId = arguments[0];
      dataJson = arguments[1];
      notification.call(this, clientId, dataJson, null);
      return instance;
    }
    if (arguments.length === 3) {
      clientId = arguments[0];
      dataJson = arguments[1];
      tag = arguments[2];
      instance = notification.__super__.constructor.call(this);
      this.setClientId(clientId);
      this.setDataJson(dataJson);
      this.setTag(tag);
      return instance;
    }
    if (arguments.length === 0) {
      instance = notification.__super__.constructor.call(this);
      return instance;
    }
    if (arguments.length === 1) {
      clientId = arguments[0];
      instance = notification.__super__.constructor.call(this);
      this.setClientId(clientId);
      return instance;
    }
  }


  /*<span id='method-fm.websync.notification-fromJson'>&nbsp;</span> */


  /**
  	 <div>
  	 Deserializes a notification from JSON.
  	 </div>
  	@function fromJson
  	@param {String} notificationJson A JSON string to deserialize.
  	@return {fm.websync.notification} A deserialized notification.
   */

  notification.fromJson = function() {
    var notificationJson;
    notificationJson = arguments[0];
    return fm.websync.serializer.deserializeNotification(notificationJson);
  };


  /*<span id='method-fm.websync.notification-fromJsonMultiple'>&nbsp;</span> */


  /**
  	 <div>
  	 Deserializes a list of notifications from JSON.
  	 </div>
  	@function fromJsonMultiple
  	@param {String} notificationsJson A JSON string to deserialize.
  	@return {fm.array} A deserialized list of notifications.
   */

  notification.fromJsonMultiple = function() {
    var notificationsJson;
    notificationsJson = arguments[0];
    return fm.websync.serializer.deserializeNotificationArray(notificationsJson);
  };


  /*<span id='method-fm.websync.notification-fromMessage'>&nbsp;</span> */


  /**
  	 <div>
  	 Converts a Notification from its Message format.
  	 </div>
  	@function fromMessage
  	@param {fm.websync.message} message The message.
  	@return {fm.websync.notification} The notification.
   */

  notification.fromMessage = function() {
    var message, notification;
    message = arguments[0];
    if (fm.global.equals(message, null)) {
      return null;
    }
    notification = new fm.websync.notification();
    notification.setClientId(message.getNotifyClientId());
    notification.setSuccessful(message.getSuccessful());
    notification.setError(message.getError());
    notification.setTimestamp(message.getTimestamp());
    notification.setDataJson(message.getDataJson());
    notification.setExtensions(message.getExtensions());
    return notification;
  };


  /*<span id='method-fm.websync.notification-fromMessages'>&nbsp;</span> */


  /**
  	 <div>
  	 Converts a set of Notifications from their Message formats.
  	 </div>
  	@function fromMessages
  	@param {fm.array} messages The messages.
  	@return {fm.array} The notifications.
   */

  notification.fromMessages = function() {
    var i, messages, notificationArray;
    messages = arguments[0];
    if (fm.global.equals(messages, null)) {
      return null;
    }
    notificationArray = new Array(messages.length);
    i = 0;
    while (i < messages.length) {
      try {
        notificationArray[i] = fm.websync.notification.fromMessage(messages[i]);
      } finally {
        i++;
      }
    }
    return notificationArray;
  };


  /*<span id='method-fm.websync.notification-toJson'>&nbsp;</span> */


  /**
  	 <div>
  	 Serializes a notification to JSON.
  	 </div>
  	@function toJson
  	@param {fm.websync.notification} notification A notification to serialize.
  	@return {String} A JSON-serialized notification.
   */

  notification.toJson = function() {
    var notification;
    notification = arguments[0];
    return fm.websync.serializer.serializeNotification(notification);
  };


  /*<span id='method-fm.websync.notification-toJsonMultiple'>&nbsp;</span> */


  /**
  	 <div>
  	 Serializes a list of notifications to JSON.
  	 </div>
  	@function toJsonMultiple
  	@param {fm.array} notifications A list of notifications to serialize.
  	@return {String} A JSON-serialized array of notifications.
   */

  notification.toJsonMultiple = function() {
    var notifications;
    notifications = arguments[0];
    return fm.websync.serializer.serializeNotificationArray(notifications);
  };


  /*<span id='method-fm.websync.notification-toMessage'>&nbsp;</span> */


  /**
  	 <div>
  	 Converts a Notification to its Message format.
  	 </div>
  	@function toMessage
  	@param {fm.websync.notification} notification The notification.
  	@return {fm.websync.message} The message.
   */

  notification.toMessage = function() {
    var message, notification;
    notification = arguments[0];
    if (fm.global.equals(notification, null)) {
      return null;
    }
    message = new fm.websync.message("/meta/notify");
    message.setNotifyClientId(notification.getClientId());
    message.setSuccessful(notification.getSuccessful());
    message.setError(notification.getError());
    message.setTimestamp(notification.getTimestamp());
    message.setDataJson(notification.getDataJson());
    message.setExtensions(notification.getExtensions());
    return message;
  };


  /*<span id='method-fm.websync.notification-toMessages'>&nbsp;</span> */


  /**
  	 <div>
  	 Converts a set of Notifications to their Message formats.
  	 </div>
  	@function toMessages
  	@param {fm.array} notifications The notifications.
  	@return {fm.array} The messages.
   */

  notification.toMessages = function() {
    var i, messageArray, notifications;
    notifications = arguments[0];
    if (fm.global.equals(notifications, null)) {
      return null;
    }
    messageArray = new Array(notifications.length);
    i = 0;
    while (i < notifications.length) {
      try {
        messageArray[i] = fm.websync.notification.toMessage(notifications[i]);
      } finally {
        i++;
      }
    }
    return messageArray;
  };


  /*<span id='method-fm.websync.notification-getClientId'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the client ID the publisher is targeting.
  	 </div>
  
  	@function getClientId
  	@return {fm.guid}
   */

  notification.prototype.getClientId = function() {
    var nullable;
    nullable = fm.serializer.deserializeGuid(this.getExtensionValueJson("fm.notify"));
    if (nullable !== null) {
      return nullable;
    }
    return fm.guid.empty;
  };


  /*<span id='method-fm.websync.notification-getTag'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the tag that identifies the contents of the payload.
  	 </div>
  
  	@function getTag
  	@return {String}
   */

  notification.prototype.getTag = function() {
    return fm.serializer.deserializeString(this.getExtensionValueJson("fm.tag"));
  };


  /*<span id='method-fm.websync.notification-setClientId'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the client ID the publisher is targeting.
  	 </div>
  
  	@function setClientId
  	@param {fm.guid} value
  	@return {void}
   */

  notification.prototype.setClientId = function() {
    var value;
    value = arguments[0];
    this.setExtensionValueJson("fm.notify", fm.serializer.serializeGuid(value), false);
    return this.setIsDirty(true);
  };


  /*<span id='method-fm.websync.notification-setTag'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the tag that identifies the contents of the payload.
  	 </div>
  
  	@function setTag
  	@param {String} value
  	@return {void}
   */

  notification.prototype.setTag = function() {
    var value;
    value = arguments[0];
    this.setExtensionValueJson("fm.tag", fm.serializer.serializeString(value), false);
    return this.setIsDirty(true);
  };


  /*<span id='method-fm.websync.notification-toJson'>&nbsp;</span> */


  /**
  	 <div>
  	 Serializes the notification to JSON.
  	 </div>
  	@function toJson
  	@return {String} The notification in JSON-serialized format.
   */

  notification.prototype.toJson = function() {
    return fm.websync.notification.toJson(this);
  };

  return notification;

})(fm.websync.baseMessage);


var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.publisherResponseArgs = (function(superClass) {
  extend(publisherResponseArgs, superClass);

  publisherResponseArgs.prototype._exception = null;

  publisherResponseArgs.prototype._responses = null;

  function publisherResponseArgs() {
    this.setResponses = bind(this.setResponses, this);
    this.setResponse = bind(this.setResponse, this);
    this.setException = bind(this.setException, this);
    this.getResponses = bind(this.getResponses, this);
    this.getResponse = bind(this.getResponse, this);
    this.getException = bind(this.getException, this);
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = publisherResponseArgs.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = publisherResponseArgs.__super__.constructor.call(this);
    return instance;
  }

  publisherResponseArgs.prototype.getException = function() {
    return this._exception;
  };

  publisherResponseArgs.prototype.getResponse = function() {
    if ((fm.global.equals(this.getResponses(), null)) || (fm.global.equals(this.getResponses().length, 0))) {
      return null;
    }
    return this.getResponses()[0];
  };

  publisherResponseArgs.prototype.getResponses = function() {
    return this._responses;
  };

  publisherResponseArgs.prototype.setException = function() {
    var value;
    value = arguments[0];
    return this._exception = value;
  };

  publisherResponseArgs.prototype.setResponse = function() {
    var value;
    value = arguments[0];
    return this.setResponses([value]);
  };

  publisherResponseArgs.prototype.setResponses = function() {
    var value;
    value = arguments[0];
    return this._responses = value;
  };

  return publisherResponseArgs;

})(fm.object);



/*<span id='cls-fm.websync.baseClient'>&nbsp;</span> */

/**
@class fm.websync.baseClient
 <div>
 Base class for WebSync clients and publishers.
 </div>

@extends fm.dynamic
 */
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.baseClient = (function(superClass) {
  extend(baseClient, superClass);

  baseClient.prototype.__domainName = null;

  baseClient.prototype.__requestUrl = null;

  baseClient.prototype._concurrencyMode = null;

  baseClient.prototype._disableBinary = false;

  baseClient.prototype._domainKey = null;

  baseClient._headers = null;


  /*<span id='prop-fm.websync.baseClient-_invalidResponseMessage'>&nbsp;</span> */


  /**
  	 <div>
  	 The default message for an invalid server response.
  	 </div>
  
  	@field _invalidResponseMessage
  	@type {String}
   */

  baseClient._invalidResponseMessage = "Invalid response received from server.";

  baseClient.prototype._onHttpRequestCreated = null;

  baseClient.prototype._onHttpResponseReceived = null;

  baseClient.prototype._onRequestCreated = null;

  baseClient.prototype._onResponseReceived = null;

  baseClient.prototype._onUnhandledException = null;

  baseClient.prototype._requestTimeout = 0;


  /*<span id='method-fm.websync.baseClient-fm.websync.baseClient'>&nbsp;</span> */


  /**
  	 <div>
  	 Initializes a new instance of the <see cref="fm.websync.baseClient">fm.websync.baseClient</see> class.
  	 </div>
  
  	@function fm.websync.baseClient
  	@return {}
   */

  function baseClient() {
    this.setRequestUrl = bind(this.setRequestUrl, this);
    this.setRequestTimeout = bind(this.setRequestTimeout, this);
    this.setDomainName = bind(this.setDomainName, this);
    this.setDomainKeyString = bind(this.setDomainKeyString, this);
    this.setDomainKey = bind(this.setDomainKey, this);
    this.setDisableBinary = bind(this.setDisableBinary, this);
    this.setConcurrencyMode = bind(this.setConcurrencyMode, this);
    this.removeOnUnhandledException = bind(this.removeOnUnhandledException, this);
    this.removeOnResponseReceived = bind(this.removeOnResponseReceived, this);
    this.removeOnRequestCreated = bind(this.removeOnRequestCreated, this);
    this.removeOnHttpResponseReceived = bind(this.removeOnHttpResponseReceived, this);
    this.removeOnHttpRequestCreated = bind(this.removeOnHttpRequestCreated, this);
    this.raiseUnhandledException = bind(this.raiseUnhandledException, this);
    this.raiseBaseEvent = bind(this.raiseBaseEvent, this);
    this.internalOnResponseReceived = bind(this.internalOnResponseReceived, this);
    this.internalOnRequestCreated = bind(this.internalOnRequestCreated, this);
    this.internalOnHttpResponseReceived = bind(this.internalOnHttpResponseReceived, this);
    this.internalOnHttpRequestCreated = bind(this.internalOnHttpRequestCreated, this);
    this.getRequestUrl = bind(this.getRequestUrl, this);
    this.getRequestTimeout = bind(this.getRequestTimeout, this);
    this.getDomainName = bind(this.getDomainName, this);
    this.getDomainKeyString = bind(this.getDomainKeyString, this);
    this.getDomainKey = bind(this.getDomainKey, this);
    this.getDisableBinary = bind(this.getDisableBinary, this);
    this.getConcurrencyMode = bind(this.getConcurrencyMode, this);
    this.createHeadersNoCache = bind(this.createHeadersNoCache, this);
    this.createHeaders = bind(this.createHeaders, this);
    this.addOnUnhandledException = bind(this.addOnUnhandledException, this);
    this.addOnResponseReceived = bind(this.addOnResponseReceived, this);
    this.addOnRequestCreated = bind(this.addOnRequestCreated, this);
    this.addOnHttpResponseReceived = bind(this.addOnHttpResponseReceived, this);
    this.addOnHttpRequestCreated = bind(this.addOnHttpRequestCreated, this);
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = baseClient.__super__.constructor.call(this);
      this.setRequestTimeout(15000);
      this.setDomainKey(fm.websync.defaults.getDomainKey());
      this.setDomainName(fm.websync.defaults.getDomainName());
      this.setConcurrencyMode(fm.websync.concurrencyMode.Low);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = baseClient.__super__.constructor.call(this);
    this.setRequestTimeout(15000);
    this.setDomainKey(fm.websync.defaults.getDomainKey());
    this.setDomainName(fm.websync.defaults.getDomainName());
    this.setConcurrencyMode(fm.websync.concurrencyMode.Low);
    return instance;
  }

  baseClient.sanitizeDomainName = function() {
    var domainName, index;
    domainName = arguments[0];
    if (fm.stringExtensions.startsWith(domainName, "http://", fm.stringComparison.Ordinal)) {
      domainName = domainName.substring("http://".length);
    } else {
      if (fm.stringExtensions.startsWith(domainName, "https://", fm.stringComparison.Ordinal)) {
        domainName = domainName.substring("https://".length);
      }
    }
    index = fm.stringExtensions.indexOf(domainName, "/");
    if (!fm.global.equals(index, -1)) {
      domainName = fm.stringExtensions.substring(domainName, 0, index);
    }
    return domainName;
  };


  /*<span id='method-fm.websync.baseClient-addOnHttpRequestCreated'>&nbsp;</span> */


  /**
  	 <div>
  	 Adds a handler that is raised whenever an underlying HTTP request
  	 has been created and is about to be transferred to the server. This is a
  	 good place to add headers/cookies. For WebSocket streams, this will fire
  	 only once for the initial HTTP-based handshake.
  	 </div>
  
  	@function addOnHttpRequestCreated
  	@param {fm.singleAction} value
  	@return {void}
   */

  baseClient.prototype.addOnHttpRequestCreated = function() {
    var value;
    value = arguments[0];
    return this._onHttpRequestCreated = fm.delegate.combine(this._onHttpRequestCreated, value);
  };


  /*<span id='method-fm.websync.baseClient-addOnHttpResponseReceived'>&nbsp;</span> */


  /**
  	 <div>
  	 Adds a handler that is raised whenever an underlying HTTP response
  	 has been received and is about to be processed by the client. This is a
  	 good place to read headers/cookies. For WebSocket streams, this will fire
  	 only once for the initial HTTP-based handshake.
  	 </div>
  
  	@function addOnHttpResponseReceived
  	@param {fm.singleAction} value
  	@return {void}
   */

  baseClient.prototype.addOnHttpResponseReceived = function() {
    var value;
    value = arguments[0];
    return this._onHttpResponseReceived = fm.delegate.combine(this._onHttpResponseReceived, value);
  };


  /*<span id='method-fm.websync.baseClient-addOnRequestCreated'>&nbsp;</span> */


  /**
  	 <div>
  	 Adds a handler that is raised whenever a new request is created
  	 and about to be transferred to the server. This is a good place to read
  	 or modify outgoing messages.
  	 </div>
  
  	@function addOnRequestCreated
  	@param {fm.singleAction} value
  	@return {void}
   */

  baseClient.prototype.addOnRequestCreated = function() {
    var value;
    value = arguments[0];
    return this._onRequestCreated = fm.delegate.combine(this._onRequestCreated, value);
  };


  /*<span id='method-fm.websync.baseClient-addOnResponseReceived'>&nbsp;</span> */


  /**
  	 <div>
  	 Adds a handler that is raised whenever a new response is received
  	 and about to be processed by the client. This is a good place to read
  	 or modify incoming messages.
  	 </div>
  
  	@function addOnResponseReceived
  	@param {fm.singleAction} value
  	@return {void}
   */

  baseClient.prototype.addOnResponseReceived = function() {
    var value;
    value = arguments[0];
    return this._onResponseReceived = fm.delegate.combine(this._onResponseReceived, value);
  };


  /*<span id='method-fm.websync.baseClient-addOnUnhandledException'>&nbsp;</span> */


  /**
  	 <div>
  	 Adds a handler that is raised when an exception is thrown in user code and not handled,
  	 typically in a callback or event handler.
  	 </div>
  
  	@function addOnUnhandledException
  	@param {fm.singleAction} value
  	@return {void}
   */

  baseClient.prototype.addOnUnhandledException = function() {
    var value;
    value = arguments[0];
    return this._onUnhandledException = fm.delegate.combine(this._onUnhandledException, value);
  };


  /*<span id='method-fm.websync.baseClient-createHeaders'>&nbsp;</span> */


  /**
  	 <div>
  	 Creates an initial set of headers, including
  	 the domain key and domain name.
  	 </div>
  	@function createHeaders
  	@return {fm.nameValueCollection}
   */

  baseClient.prototype.createHeaders = function() {
    if (fm.global.equals(this.getConcurrencyMode(), fm.websync.concurrencyMode.High)) {
      if (fm.global.equals(fm.websync.baseClient._headers, null)) {
        this._headers = this.createHeadersNoCache();
      }
      return fm.websync.baseClient._headers;
    }
    return this.createHeadersNoCache();
  };

  baseClient.prototype.createHeadersNoCache = function() {
    var values;
    values = new fm.nameValueCollection();
    if (!fm.global.equals(this.getDomainName(), fm.websync.defaults.getDomainName())) {
      values.set("X-FM-DomainName", this.getDomainName());
    }
    if (!fm.guid.equals(this.getDomainKey(), fm.websync.defaults.getDomainKey())) {
      values.set("X-FM-DomainKey", this.getDomainKey().toString());
    }
    return values;
  };


  /*<span id='method-fm.websync.baseClient-getConcurrencyMode'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets a flag indicating the level of concurrency in the current process.
  	 The intended use of this property is to lighten the processor load when hundreds
  	 or thousands of instances are created in a single process for the purposes of
  	 generating load for testing.
  	 </div>
  
  	@function getConcurrencyMode
  	@return {fm.websync.concurrencyMode}
   */

  baseClient.prototype.getConcurrencyMode = function() {
    return this._concurrencyMode;
  };


  /*<span id='method-fm.websync.baseClient-getDisableBinary'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets whether to disable the transmission of binary payloads
  	 as binary on the wire. If set to <c>true</c>, binary payloads will
  	 be sent over the wire as base64-encoded strings.
  	 </div>
  
  	@function getDisableBinary
  	@return {Boolean}
   */

  baseClient.prototype.getDisableBinary = function() {
    return this._disableBinary;
  };


  /*<span id='method-fm.websync.baseClient-getDomainKey'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the domain key for sandboxing connections to the server.
  	 Defaults to "11111111-1111-1111-1111-111111111111". If you are using
  	 WebSync On-Demand, this should be set to the private domain key if you
  	 are attempting to use methods that have been secured in the Portal;
  	 otherwise, use the public domain key.
  	 </div>
  
  	@function getDomainKey
  	@return {fm.guid}
   */

  baseClient.prototype.getDomainKey = function() {
    return this._domainKey;
  };


  /*<span id='method-fm.websync.baseClient-getDomainKeyString'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the <see cref="fm.websync.baseClient.domainKey">fm.websync.baseClient.domainKey</see>
  	 as a string value.
  	 </div>
  
  	@function getDomainKeyString
  	@return {String}
   */

  baseClient.prototype.getDomainKeyString = function() {
    return this.getDomainKey().toString();
  };


  /*<span id='method-fm.websync.baseClient-getDomainName'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the domain name to send as the <tt>Referrer</tt> with each request.
  	 Defaults to "localhost". If you are using WebSync On-Demand, this field is only
  	 necessary if you are using the public domain key, in which case it should be set
  	 to equal the domain name entered in the Portal for the domain key (e.g.
  	 "frozenmountain.com").
  	 </div>
  
  	@function getDomainName
  	@return {String}
   */

  baseClient.prototype.getDomainName = function() {
    return this.__domainName;
  };


  /*<span id='method-fm.websync.baseClient-getRequestTimeout'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the number of milliseconds to wait for a standard request to
  	 return a response before it is aborted and another request is attempted.
  	 Defaults to 15000 (15 seconds).
  	 </div>
  
  	@function getRequestTimeout
  	@return {Integer}
   */

  baseClient.prototype.getRequestTimeout = function() {
    return this._requestTimeout;
  };


  /*<span id='method-fm.websync.baseClient-getRequestUrl'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the absolute URL of the WebSync request handler, typically
  	 ending with websync.ashx.
  	 </div>
  
  	@function getRequestUrl
  	@return {String}
   */

  baseClient.prototype.getRequestUrl = function() {
    return this.__requestUrl;
  };

  baseClient.prototype.internalOnHttpRequestCreated = function() {
    var e;
    e = arguments[0];
    return this.raiseBaseEvent(this._onHttpRequestCreated, e, "OnHttpRequestCreated");
  };

  baseClient.prototype.internalOnHttpResponseReceived = function() {
    var e;
    e = arguments[0];
    return this.raiseBaseEvent(this._onHttpResponseReceived, e, "OnHttpResponseReceived");
  };

  baseClient.prototype.internalOnRequestCreated = function() {
    var e;
    e = arguments[0];
    return this.raiseBaseEvent(this._onRequestCreated, e, "OnRequestCreated");
  };

  baseClient.prototype.internalOnResponseReceived = function() {
    var e;
    e = arguments[0];
    return this.raiseBaseEvent(this._onResponseReceived, e, "OnResponseReceived");
  };

  baseClient.prototype.raiseBaseEvent = function() {
    var args, error, eventMethod, eventName, exception;
    eventMethod = arguments[0];
    args = arguments[1];
    eventName = arguments[2];
    if (!fm.global.equals(eventMethod, null)) {
      try {
        return eventMethod(args);
      } catch (error) {
        exception = error;
        if (!this.raiseUnhandledException(exception)) {
          return fm.asyncException.asyncThrow(exception, fm.stringExtensions.format("BaseClient -> {0}", eventName));
        }
      } finally {

      }
    }
  };


  /*<span id='method-fm.websync.baseClient-raiseUnhandledException'>&nbsp;</span> */


  /**
  	 <div>
  	 Raises an unhandled exception.
  	 </div>
  	@function raiseUnhandledException
  	@param {Error} exception The unhandled exception.
  	@return {Boolean} true if the exception was handled; otherwise, false.
   */

  baseClient.prototype.raiseUnhandledException = function() {
    var args2, error, exception, exception2, onUnhandledException, p;
    exception = arguments[0];
    onUnhandledException = this._onUnhandledException;
    if (!fm.global.equals(onUnhandledException, null)) {
      args2 = new fm.websync.unhandledExceptionArgs();
      args2.__exception = exception;
      p = args2;
      try {
        onUnhandledException(p);
      } catch (error) {
        exception2 = error;
        fm.asyncException.asyncThrow(exception2, "BaseClient -> OnUnhandledException");
      } finally {

      }
      return p.getHandled();
    }
    return false;
  };


  /*<span id='method-fm.websync.baseClient-removeOnHttpRequestCreated'>&nbsp;</span> */


  /**
  	 <div>
  	 Removes a handler that is raised whenever an underlying HTTP request
  	 has been created and is about to be transferred to the server. This is a
  	 good place to add headers/cookies. For WebSocket streams, this will fire
  	 only once for the initial HTTP-based handshake.
  	 </div>
  
  	@function removeOnHttpRequestCreated
  	@param {fm.singleAction} value
  	@return {void}
   */

  baseClient.prototype.removeOnHttpRequestCreated = function() {
    var value;
    value = arguments[0];
    return this._onHttpRequestCreated = fm.delegate.remove(this._onHttpRequestCreated, value);
  };


  /*<span id='method-fm.websync.baseClient-removeOnHttpResponseReceived'>&nbsp;</span> */


  /**
  	 <div>
  	 Removes a handler that is raised whenever an underlying HTTP response
  	 has been received and is about to be processed by the client. This is a
  	 good place to read headers/cookies. For WebSocket streams, this will fire
  	 only once for the initial HTTP-based handshake.
  	 </div>
  
  	@function removeOnHttpResponseReceived
  	@param {fm.singleAction} value
  	@return {void}
   */

  baseClient.prototype.removeOnHttpResponseReceived = function() {
    var value;
    value = arguments[0];
    return this._onHttpResponseReceived = fm.delegate.remove(this._onHttpResponseReceived, value);
  };


  /*<span id='method-fm.websync.baseClient-removeOnRequestCreated'>&nbsp;</span> */


  /**
  	 <div>
  	 Removes a handler that is raised whenever a new request is created
  	 and about to be transferred to the server. This is a good place to read
  	 or modify outgoing messages.
  	 </div>
  
  	@function removeOnRequestCreated
  	@param {fm.singleAction} value
  	@return {void}
   */

  baseClient.prototype.removeOnRequestCreated = function() {
    var value;
    value = arguments[0];
    return this._onRequestCreated = fm.delegate.remove(this._onRequestCreated, value);
  };


  /*<span id='method-fm.websync.baseClient-removeOnResponseReceived'>&nbsp;</span> */


  /**
  	 <div>
  	 Removes a handler that is raised whenever a new response is received
  	 and about to be processed by the client. This is a good place to read
  	 or modify incoming messages.
  	 </div>
  
  	@function removeOnResponseReceived
  	@param {fm.singleAction} value
  	@return {void}
   */

  baseClient.prototype.removeOnResponseReceived = function() {
    var value;
    value = arguments[0];
    return this._onResponseReceived = fm.delegate.remove(this._onResponseReceived, value);
  };


  /*<span id='method-fm.websync.baseClient-removeOnUnhandledException'>&nbsp;</span> */


  /**
  	 <div>
  	 Removes a handler that is raised when an exception is thrown in user code and not handled,
  	 typically in a callback or event handler.
  	 </div>
  
  	@function removeOnUnhandledException
  	@param {fm.singleAction} value
  	@return {void}
   */

  baseClient.prototype.removeOnUnhandledException = function() {
    var value;
    value = arguments[0];
    return this._onUnhandledException = fm.delegate.remove(this._onUnhandledException, value);
  };


  /*<span id='method-fm.websync.baseClient-setConcurrencyMode'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets a flag indicating the level of concurrency in the current process.
  	 The intended use of this property is to lighten the processor load when hundreds
  	 or thousands of instances are created in a single process for the purposes of
  	 generating load for testing.
  	 </div>
  
  	@function setConcurrencyMode
  	@param {fm.websync.concurrencyMode} value
  	@return {void}
   */

  baseClient.prototype.setConcurrencyMode = function() {
    var value;
    value = arguments[0];
    return this._concurrencyMode = value;
  };


  /*<span id='method-fm.websync.baseClient-setDisableBinary'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets whether to disable the transmission of binary payloads
  	 as binary on the wire. If set to <c>true</c>, binary payloads will
  	 be sent over the wire as base64-encoded strings.
  	 </div>
  
  	@function setDisableBinary
  	@param {Boolean} value
  	@return {void}
   */

  baseClient.prototype.setDisableBinary = function() {
    var value;
    value = arguments[0];
    return this._disableBinary = value;
  };


  /*<span id='method-fm.websync.baseClient-setDomainKey'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the domain key for sandboxing connections to the server.
  	 Defaults to "11111111-1111-1111-1111-111111111111". If you are using
  	 WebSync On-Demand, this should be set to the private domain key if you
  	 are attempting to use methods that have been secured in the Portal;
  	 otherwise, use the public domain key.
  	 </div>
  
  	@function setDomainKey
  	@param {fm.guid} value
  	@return {void}
   */

  baseClient.prototype.setDomainKey = function() {
    var value;
    value = arguments[0];
    return this._domainKey = value;
  };


  /*<span id='method-fm.websync.baseClient-setDomainKeyString'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the <see cref="fm.websync.baseClient.domainKey">fm.websync.baseClient.domainKey</see>
  	 as a string value.
  	 </div>
  
  	@function setDomainKeyString
  	@param {String} value
  	@return {void}
   */

  baseClient.prototype.setDomainKeyString = function() {
    var value;
    value = arguments[0];
    return this.setDomainKey(new fm.guid(value));
  };


  /*<span id='method-fm.websync.baseClient-setDomainName'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the domain name to send as the <tt>Referrer</tt> with each request.
  	 Defaults to "localhost". If you are using WebSync On-Demand, this field is only
  	 necessary if you are using the public domain key, in which case it should be set
  	 to equal the domain name entered in the Portal for the domain key (e.g.
  	 "frozenmountain.com").
  	 </div>
  
  	@function setDomainName
  	@param {String} value
  	@return {void}
   */

  baseClient.prototype.setDomainName = function() {
    var value;
    value = arguments[0];
    if (fm.global.equals(value, null)) {
      value = fm.websync.defaults.getDomainName();
    }
    return this.__domainName = fm.websync.baseClient.sanitizeDomainName(value);
  };


  /*<span id='method-fm.websync.baseClient-setRequestTimeout'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the number of milliseconds to wait for a standard request to
  	 return a response before it is aborted and another request is attempted.
  	 Defaults to 15000 (15 seconds).
  	 </div>
  
  	@function setRequestTimeout
  	@param {Integer} value
  	@return {void}
   */

  baseClient.prototype.setRequestTimeout = function() {
    var value;
    value = arguments[0];
    return this._requestTimeout = value;
  };


  /*<span id='method-fm.websync.baseClient-setRequestUrl'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the absolute URL of the WebSync request handler, typically
  	 ending with websync.ashx.
  	 </div>
  
  	@function setRequestUrl
  	@param {String} value
  	@return {void}
   */

  baseClient.prototype.setRequestUrl = function() {
    var value;
    value = arguments[0];
    if (fm.global.equals(value, null)) {
      throw new Error("Request URL cannot be null.");
    }
    return this.__requestUrl = fm.httpTransfer.replaceWildcards(value);
  };

  baseClient._headers = null;

  return baseClient;

})(fm.dynamic);



/*<span id='cls-fm.websync.baseAdvice'>&nbsp;</span> */

/**
@class fm.websync.baseAdvice
 <div>
 Base advice class used in <see cref="fm.websync.message">Messages</see> and for nested advice.
 </div>

@extends fm.serializable
 */
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.baseAdvice = (function(superClass) {
  extend(baseAdvice, superClass);

  baseAdvice.prototype.__hosts = null;

  baseAdvice.prototype.__interval = null;

  baseAdvice.prototype.__reconnect = null;

  function baseAdvice() {
    this.toJson = bind(this.toJson, this);
    this.setReconnect = bind(this.setReconnect, this);
    this.setInterval = bind(this.setInterval, this);
    this.setHosts = bind(this.setHosts, this);
    this.getReconnect = bind(this.getReconnect, this);
    this.getInterval = bind(this.getInterval, this);
    this.getHosts = bind(this.getHosts, this);
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = baseAdvice.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = baseAdvice.__super__.constructor.call(this);
    return instance;
  }


  /*<span id='method-fm.websync.baseAdvice-fromJson'>&nbsp;</span> */


  /**
  	 <div>
  	 Deserializes a single base advice object from JSON.
  	 </div>
  	@function fromJson
  	@param {String} baseAdviceJson The JSON base advice object to deserialize.
  	@return {fm.websync.baseAdvice} The deserialized advice object.
   */

  baseAdvice.fromJson = function() {
    var baseAdviceJson;
    baseAdviceJson = arguments[0];
    return fm.websync.serializer.deserializeBaseAdvice(baseAdviceJson);
  };


  /*<span id='method-fm.websync.baseAdvice-toJson'>&nbsp;</span> */


  /**
  	 <div>
  	 Serializes a single base advice object to JSON.
  	 </div>
  	@function toJson
  	@param {fm.websync.baseAdvice} baseAdvice The base advice object to serialize.
  	@return {String} The serialized advice object.
   */

  baseAdvice.toJson = function() {
    var baseAdvice;
    baseAdvice = arguments[0];
    return fm.websync.serializer.serializeBaseAdvice(baseAdvice);
  };


  /*<span id='method-fm.websync.baseAdvice-getHosts'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the list of host names that may be used as alternate servers.
  	 </div>
  
  	@function getHosts
  	@return {fm.array}
   */

  baseAdvice.prototype.getHosts = function() {
    return this.__hosts;
  };


  /*<span id='method-fm.websync.baseAdvice-getInterval'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the interval to wait before following the reconnect advice.
  	 </div>
  
  	@function getInterval
  	@return {fm.nullable}
   */

  baseAdvice.prototype.getInterval = function() {
    return this.__interval;
  };


  /*<span id='method-fm.websync.baseAdvice-getReconnect'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets how the client should attempt to re-establish a connection with the server.
  	 </div>
  
  	@function getReconnect
  	@return {fm.nullable}
   */

  baseAdvice.prototype.getReconnect = function() {
    return this.__reconnect;
  };


  /*<span id='method-fm.websync.baseAdvice-setHosts'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the list of host names that may be used as alternate servers.
  	 </div>
  
  	@function setHosts
  	@param {fm.array} value
  	@return {void}
   */

  baseAdvice.prototype.setHosts = function() {
    var value;
    value = arguments[0];
    this.__hosts = value;
    return this.setIsDirty(true);
  };


  /*<span id='method-fm.websync.baseAdvice-setInterval'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the interval to wait before following the reconnect advice.
  	 </div>
  
  	@function setInterval
  	@param {fm.nullable} value
  	@return {void}
   */

  baseAdvice.prototype.setInterval = function() {
    var value;
    value = arguments[0];
    this.__interval = value;
    return this.setIsDirty(true);
  };


  /*<span id='method-fm.websync.baseAdvice-setReconnect'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets how the client should attempt to re-establish a connection with the server.
  	 </div>
  
  	@function setReconnect
  	@param {fm.nullable} value
  	@return {void}
   */

  baseAdvice.prototype.setReconnect = function() {
    var value;
    value = arguments[0];
    this.__reconnect = value;
    return this.setIsDirty(true);
  };


  /*<span id='method-fm.websync.baseAdvice-toJson'>&nbsp;</span> */


  /**
  	 <div>
  	 Serializes the base advice object to JSON.
  	 </div>
  	@function toJson
  	@return {String} The serialized advice object.
   */

  baseAdvice.prototype.toJson = function() {
    return fm.websync.baseAdvice.toJson(this);
  };

  return baseAdvice;

})(fm.serializable);



/*<span id='cls-fm.websync.advice'>&nbsp;</span> */

/**
@class fm.websync.advice
 <div>
 Advice class used in <see cref="fm.websync.message">Messages</see>.
 </div>

@extends fm.websync.baseAdvice
 */
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.advice = (function(superClass) {
  extend(advice, superClass);

  advice.prototype._callbackPolling = null;

  advice.prototype._longPolling = null;

  advice.prototype._webSocket = null;

  function advice() {
    this.toJson = bind(this.toJson, this);
    this.setWebSocket = bind(this.setWebSocket, this);
    this.setLongPolling = bind(this.setLongPolling, this);
    this.setCallbackPolling = bind(this.setCallbackPolling, this);
    this.getWebSocket = bind(this.getWebSocket, this);
    this.getLongPolling = bind(this.getLongPolling, this);
    this.getCallbackPolling = bind(this.getCallbackPolling, this);
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = advice.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = advice.__super__.constructor.call(this);
    return instance;
  }


  /*<span id='method-fm.websync.advice-fromJson'>&nbsp;</span> */


  /**
  	 <div>
  	 Deserializes a single advice object from JSON.
  	 </div>
  	@function fromJson
  	@param {String} adviceJson The JSON advice object to deserialize.
  	@return {fm.websync.advice} The deserialized advice object.
   */

  advice.fromJson = function() {
    var adviceJson;
    adviceJson = arguments[0];
    return fm.websync.serializer.deserializeAdvice(adviceJson);
  };


  /*<span id='method-fm.websync.advice-toJson'>&nbsp;</span> */


  /**
  	 <div>
  	 Serializes a single advice object to JSON.
  	 </div>
  	@function toJson
  	@param {fm.websync.advice} advice The advice object to serialize.
  	@return {String} The serialized advice object.
   */

  advice.toJson = function() {
    var advice;
    advice = arguments[0];
    return fm.websync.serializer.serializeAdvice(advice);
  };


  /*<span id='method-fm.websync.advice-getCallbackPolling'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets advice specific to callback-polling clients.
  	 </div>
  
  	@function getCallbackPolling
  	@return {fm.websync.baseAdvice}
   */

  advice.prototype.getCallbackPolling = function() {
    return this._callbackPolling;
  };


  /*<span id='method-fm.websync.advice-getLongPolling'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets advice specific to long-polling clients.
  	 </div>
  
  	@function getLongPolling
  	@return {fm.websync.baseAdvice}
   */

  advice.prototype.getLongPolling = function() {
    return this._longPolling;
  };


  /*<span id='method-fm.websync.advice-getWebSocket'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets advice specific to WebSocket clients.
  	 </div>
  
  	@function getWebSocket
  	@return {fm.websync.baseAdvice}
   */

  advice.prototype.getWebSocket = function() {
    return this._webSocket;
  };


  /*<span id='method-fm.websync.advice-setCallbackPolling'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets advice specific to callback-polling clients.
  	 </div>
  
  	@function setCallbackPolling
  	@param {fm.websync.baseAdvice} value
  	@return {void}
   */

  advice.prototype.setCallbackPolling = function() {
    var value;
    value = arguments[0];
    return this._callbackPolling = value;
  };


  /*<span id='method-fm.websync.advice-setLongPolling'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets advice specific to long-polling clients.
  	 </div>
  
  	@function setLongPolling
  	@param {fm.websync.baseAdvice} value
  	@return {void}
   */

  advice.prototype.setLongPolling = function() {
    var value;
    value = arguments[0];
    return this._longPolling = value;
  };


  /*<span id='method-fm.websync.advice-setWebSocket'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets advice specific to WebSocket clients.
  	 </div>
  
  	@function setWebSocket
  	@param {fm.websync.baseAdvice} value
  	@return {void}
   */

  advice.prototype.setWebSocket = function() {
    var value;
    value = arguments[0];
    return this._webSocket = value;
  };


  /*<span id='method-fm.websync.advice-toJson'>&nbsp;</span> */


  /**
  	 <div>
  	 Serializes the advice object to JSON.
  	 </div>
  	@function toJson
  	@return {String} The serialized advice object.
   */

  advice.prototype.toJson = function() {
    return fm.websync.advice.toJson(this);
  };

  return advice;

})(fm.websync.baseAdvice);



/*<span id='cls-fm.websync.metaChannels'>&nbsp;</span> */

/**
@class fm.websync.metaChannels
 <div>
 Contains the reserved Bayeux meta-channels and methods to assist in detecting them.
 </div>

@extends fm.object
 */
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.metaChannels = (function(superClass) {
  extend(metaChannels, superClass);


  /*<span id='prop-fm.websync.metaChannels-_bind'>&nbsp;</span> */


  /**
  	 <div>
  	 The reserved channel for bind requests/responses.
  	 </div>
  
  	@field _bind
  	@type {String}
   */

  metaChannels._bind = "/meta/bind";


  /*<span id='prop-fm.websync.metaChannels-_connect'>&nbsp;</span> */


  /**
  	 <div>
  	 The reserved channel for connect requests/responses.
  	 </div>
  
  	@field _connect
  	@type {String}
   */

  metaChannels._connect = "/meta/connect";


  /*<span id='prop-fm.websync.metaChannels-_disconnect'>&nbsp;</span> */


  /**
  	 <div>
  	 The reserved channel for disconnect requests/responses.
  	 </div>
  
  	@field _disconnect
  	@type {String}
   */

  metaChannels._disconnect = "/meta/disconnect";


  /*<span id='prop-fm.websync.metaChannels-_handshake'>&nbsp;</span> */


  /**
  	 <div>
  	 The reserved channel for handshake requests/responses.
  	 </div>
  
  	@field _handshake
  	@type {String}
   */

  metaChannels._handshake = "/meta/handshake";


  /*<span id='prop-fm.websync.metaChannels-_metaPrefix'>&nbsp;</span> */


  /**
  	 <div>
  	 The reserved prefix for Bayeux meta-channels.
  	 </div>
  
  	@field _metaPrefix
  	@type {String}
   */

  metaChannels._metaPrefix = "/meta/";


  /*<span id='prop-fm.websync.metaChannels-_notify'>&nbsp;</span> */


  /**
  	 <div>
  	 The reserved channel for notify requests/responses.
  	 </div>
  
  	@field _notify
  	@type {String}
   */

  metaChannels._notify = "/meta/notify";


  /*<span id='prop-fm.websync.metaChannels-_servicePrefix'>&nbsp;</span> */


  /**
  	 <div>
  	 The reserved prefix for Bayeux service-channels.
  	 </div>
  
  	@field _servicePrefix
  	@type {String}
   */

  metaChannels._servicePrefix = "/service/";


  /*<span id='prop-fm.websync.metaChannels-_subscribe'>&nbsp;</span> */


  /**
  	 <div>
  	 The reserved channel for subscribe requests/responses.
  	 </div>
  
  	@field _subscribe
  	@type {String}
   */

  metaChannels._subscribe = "/meta/subscribe";


  /*<span id='prop-fm.websync.metaChannels-_unbind'>&nbsp;</span> */


  /**
  	 <div>
  	 The reserved channel for unbind requests/responses.
  	 </div>
  
  	@field _unbind
  	@type {String}
   */

  metaChannels._unbind = "/meta/unbind";


  /*<span id='prop-fm.websync.metaChannels-_unsubscribe'>&nbsp;</span> */


  /**
  	 <div>
  	 The reserved channel for unsubscribe requests/responses.
  	 </div>
  
  	@field _unsubscribe
  	@type {String}
   */

  metaChannels._unsubscribe = "/meta/unsubscribe";

  function metaChannels() {
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = metaChannels.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
  }


  /*<span id='method-fm.websync.metaChannels-convertChannelFromServiced'>&nbsp;</span> */


  /**
  	 <div>
  	 Converts a serviced channel into its original form.
  	 </div>
  	@function convertChannelFromServiced
  	@param {String} channel The channel to convert.
  	@return {String} The channel without the service prefix.
   */

  metaChannels.convertChannelFromServiced = function() {
    var channel;
    channel = arguments[0];
    if (!fm.websync.metaChannels.isServiceChannel(channel)) {
      return channel;
    }
    return channel.substring("/service/".length - 1);
  };


  /*<span id='method-fm.websync.metaChannels-convertChannelToServiced'>&nbsp;</span> */


  /**
  	 <div>
  	 Converts a channel into its serviced equivalent.
  	 </div>
  	@function convertChannelToServiced
  	@param {String} channel The channel to convert.
  	@return {String} The channel with the service prefix.
   */

  metaChannels.convertChannelToServiced = function() {
    var channel;
    channel = arguments[0];
    if ((fm.global.equals(channel, null)) || (channel.length < 1)) {
      return "/service/";
    }
    return fm.stringExtensions.concat("/service/", channel.substring(1));
  };

  metaChannels.getMessageType = function() {
    var bayeuxChannel;
    bayeuxChannel = arguments[0];
    if (fm.global.equals(bayeuxChannel, "/meta/handshake")) {
      return fm.websync.messageType.Connect;
    }
    if (fm.global.equals(bayeuxChannel, "/meta/connect")) {
      return fm.websync.messageType.Stream;
    }
    if (fm.global.equals(bayeuxChannel, "/meta/disconnect")) {
      return fm.websync.messageType.Disconnect;
    }
    if (fm.global.equals(bayeuxChannel, "/meta/bind")) {
      return fm.websync.messageType.Bind;
    }
    if (fm.global.equals(bayeuxChannel, "/meta/unbind")) {
      return fm.websync.messageType.Unbind;
    }
    if (fm.global.equals(bayeuxChannel, "/meta/subscribe")) {
      return fm.websync.messageType.Subscribe;
    }
    if (fm.global.equals(bayeuxChannel, "/meta/unsubscribe")) {
      return fm.websync.messageType.Unsubscribe;
    }
    if (fm.global.equals(bayeuxChannel, "/meta/notify")) {
      return fm.websync.messageType.Notify;
    }
    if (fm.websync.metaChannels.isServiceChannel(bayeuxChannel)) {
      return fm.websync.messageType.Service;
    }
    if (!fm.websync.metaChannels.isMetaChannel(bayeuxChannel)) {
      return fm.websync.messageType.Publish;
    }
    return fm.websync.messageType.Unknown;
  };


  /*<span id='method-fm.websync.metaChannels-isMetaChannel'>&nbsp;</span> */


  /**
  	 <div>
  	 Determines whether the specified channel name is a reserved Bayeux /meta channel.
  	 </div>
  	@function isMetaChannel
  	@param {String} channel The channel name to check.
  	@return {Boolean} true if the specified channel name is a reserved Bayeux /meta channel; otherwise, false.
   */

  metaChannels.isMetaChannel = function() {
    var channel;
    channel = arguments[0];
    return (!fm.global.equals(channel, null)) && fm.stringExtensions.startsWith(channel, "/meta/", fm.stringComparison.Ordinal);
  };


  /*<span id='method-fm.websync.metaChannels-isReservedChannel'>&nbsp;</span> */


  /**
  	 <div>
  	 Determines whether the specified channel name is a reserved Bayeux channel.
  	 </div>
  	@function isReservedChannel
  	@param {String} channel The channel name to check.
  	@return {Boolean} true if the specified channel name is reserved; otherwise, false.
   */

  metaChannels.isReservedChannel = function() {
    var channel;
    channel = arguments[0];
    return fm.websync.metaChannels.isMetaChannel(channel) || fm.websync.metaChannels.isServiceChannel(channel);
  };


  /*<span id='method-fm.websync.metaChannels-isServiceChannel'>&nbsp;</span> */


  /**
  	 <div>
  	 Determines whether the specified channel name is a reserved Bayeux /service channel.
  	 </div>
  	@function isServiceChannel
  	@param {String} channel The channel name to check.
  	@return {Boolean} true if the specified channel name is a reserved Bayeux /service channel; otherwise, false.
   */

  metaChannels.isServiceChannel = function() {
    var channel;
    channel = arguments[0];
    return (!fm.global.equals(channel, null)) && fm.stringExtensions.startsWith(channel, "/service/", fm.stringComparison.Ordinal);
  };

  return metaChannels;

})(fm.object);



/*<span id='cls-fm.websync.client'>&nbsp;</span> */

/**
@class fm.websync.client
 <div>
 <p>
 The WebSync client, used for subscribing to channels and receiving data, as well as
 publishing data to specific channels.
 </p>
 </div><div>
 <p>
 The WebSync client has 9 primary operations:
 </p>
 <ol>
 <li>
 Connect/Disconnect: Sets up/takes down a streaming connection to the server.
 </li>
 <li>
 Bind/Unbind: Attaches/detaches records to the client (e.g. display name, user ID).
 </li>
 <li>
 Subscribe/Unsubscribe: Opts in/out of receiving data published to a channel.
 </li>
 <li>
 Publish: Broadcasts data to any clients subscribed to the channel.
 </li>
 <li>
 Notify: Pushes data directly to a specific client (no subscription necessary).
 </li>
 <li>
 Service: Sends data to the server for traditional request/response processing.
 </li>
 </ol>
 <p>
 Each method (and the constructor) take a single "args" object. This object defines
 callback functions, configuration settings, and error handling information. It
 allows the client to default to sensible values while allowing easy overrides.
 </p>
 <p>
 The WebSync client is designed to be as robust and fault-tolerant as possible. If
 there are any failures in the streaming connection, the client will automatically
 reconnect and set up a new one.
 </p>
 <p>
 Maintaining a streaming connection lies at the heart of WebSync, and so special care
 is given to ensure that a streaming connection remains active, even in the presence
 of total network failure.
 </p>
 <p>
 Since WebSync clients often subscribe to channels to receive partial updates, it is
 highly recommended to do initial state load in the OnSuccess callback of the call
 to Subscribe. This way, (a) there are no missed
 partial updates between the state load and the subscription, and (b) in the event of
 connection failure and automatic reconnection/resubscription, the state will be
 automatically refreshed.
 </p>
 <p>
 When a connection is lost, <see cref="fm.websync.client.ConnectArgs">fm.websync.client.ConnectArgs</see>.OnStreamFailure will be called.
 This is an excellent time to update the UI to let your user know that the connection
 is temporarily offline and a new one is being established. The client will
 automatically re-attempt a connect.
 </p>
 <p>
 Shortly afterwards, either <see cref="fm.websync.client.ConnectArgs">fm.websync.client.ConnectArgs</see>.OnSuccess or
 <see cref="fm.websync.client.ConnectArgs">fm.websync.client.ConnectArgs</see>.OnFailure will be called, depending on whether or not
 the client could successfully negotiate a new connection with the server.
 If <see cref="fm.websync.client.ConnectArgs">fm.websync.client.ConnectArgs</see>.OnSuccess is called, the connection is officially
 re-established. If <see cref="fm.websync.client.ConnectArgs">fm.websync.client.ConnectArgs</see>.OnFailure is called, you should
 analyze the response, and if appropriate, set <see cref="fm.websync.baseFailureArgs.retry">fm.websync.baseFailureArgs.retry</see>
 to true or false, depending on whether you want to retry the connection. The default
 value of <see cref="fm.websync.baseFailureArgs.retry">fm.websync.baseFailureArgs.retry</see> is governed by <see cref="fm.websync.client.ConnectArgs">fm.websync.client.ConnectArgs</see>.RetryMode.
 Custom backoff algorithms can be defined using <see cref="fm.websync.client.ConnectArgs">fm.websync.client.ConnectArgs</see>.RetryBackoff.
 </p>
 <p>
 By the time <see cref="fm.websync.client.ConnectArgs">fm.websync.client.ConnectArgs</see>.OnSuccess is called, the client has a new
 client ID. Any pre-existing subscriptions or bindings performed outside the
 connect callback chain will be automatically recreated.
 </p>
 <p>
 Within a given OnSuccess or OnFailure callback, a boolean flag is always present to
 indicate whether the callback is being executed as part of an automatic reconnect.
 Refer to <see cref="fm.websync.connectSuccessArgs.isReconnect">fm.websync.connectSuccessArgs.isReconnect</see>,
 <see cref="fm.websync.connectFailureArgs.isReconnect">fm.websync.connectFailureArgs.isReconnect</see>,
 <see cref="fm.websync.subscribeSuccessArgs.isResubscribe">fm.websync.subscribeSuccessArgs.isResubscribe</see>,
 <see cref="fm.websync.subscribeFailureArgs.isResubscribe">fm.websync.subscribeFailureArgs.isResubscribe</see>,
 <see cref="fm.websync.bindSuccessArgs.isRebind">fm.websync.bindSuccessArgs.isRebind</see>, and
 <see cref="fm.websync.bindFailureArgs.isRebind">fm.websync.bindFailureArgs.isRebind</see>.
 </p>
 </div>

@extends fm.websync.baseClient
 */
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.client = (function(superClass) {
  extend(client, superClass);

  client.prototype.__streamRequestUrl = null;

  client._argsKey = null;

  client.prototype._batchCounter = 0;

  client.prototype._batchCounterLock = null;

  client._bayeuxMinimumVersion = null;

  client._bayeuxVersion = null;

  client.prototype._boundRecords = null;

  client.prototype._boundRecordsLock = null;

  client.prototype._clientId = null;

  client.prototype._connectArgs = null;

  client.prototype._connectionType = null;

  client.prototype._counter = 0;

  client.prototype._counterLock = null;

  client.prototype._customOnReceives = null;

  client.prototype._customOnReceivesLock = null;

  client.prototype._disableWebSockets = false;

  client.prototype._disconnectCalled = false;

  client.prototype._instanceId = null;

  client.prototype._isConnected = false;

  client.prototype._isConnecting = false;

  client.prototype._isDisconnecting = false;

  client.prototype._lastBackoffIndex = 0;

  client.prototype._lastBackoffTimeout = 0;

  client.prototype._lastInterval = 0;

  client.prototype._lastReconnect = null;

  client.prototype._onBindComplete = null;

  client._onBindEnd = null;

  client.prototype._onBindFailure = null;

  client._onBindRequest = null;

  client._onBindResponse = null;

  client.prototype._onBindSuccess = null;

  client.prototype._onConnectComplete = null;

  client._onConnectEnd = null;

  client.prototype._onConnectFailure = null;

  client._onConnectRequest = null;

  client._onConnectResponse = null;

  client.prototype._onConnectSuccess = null;

  client.prototype._onDisconnectComplete = null;

  client._onDisconnectEnd = null;

  client._onDisconnectRequest = null;

  client._onDisconnectResponse = null;

  client.prototype._onNotify = null;

  client.prototype._onNotifyComplete = null;

  client._onNotifyEnd = null;

  client.prototype._onNotifyFailure = null;

  client._onNotifyRequest = null;

  client._onNotifyResponse = null;

  client.prototype._onNotifySuccess = null;

  client.prototype._onPublishComplete = null;

  client._onPublishEnd = null;

  client.prototype._onPublishFailure = null;

  client._onPublishRequest = null;

  client._onPublishResponse = null;

  client.prototype._onPublishSuccess = null;

  client.prototype._onServerBind = null;

  client.prototype._onServerSubscribe = null;

  client.prototype._onServerUnbind = null;

  client.prototype._onServerUnsubscribe = null;

  client.prototype._onServiceComplete = null;

  client._onServiceEnd = null;

  client.prototype._onServiceFailure = null;

  client._onServiceRequest = null;

  client._onServiceResponse = null;

  client.prototype._onServiceSuccess = null;

  client.prototype._onStateRestored = null;

  client.prototype._onStreamFailure = null;

  client.prototype._onSubscribeComplete = null;

  client._onSubscribeEnd = null;

  client.prototype._onSubscribeFailure = null;

  client._onSubscribeRequest = null;

  client._onSubscribeResponse = null;

  client.prototype._onSubscribeSuccess = null;

  client.prototype._onUnbindComplete = null;

  client._onUnbindEnd = null;

  client.prototype._onUnbindFailure = null;

  client._onUnbindRequest = null;

  client._onUnbindResponse = null;

  client.prototype._onUnbindSuccess = null;

  client.prototype._onUnsubscribeComplete = null;

  client._onUnsubscribeEnd = null;

  client.prototype._onUnsubscribeFailure = null;

  client._onUnsubscribeRequest = null;

  client._onUnsubscribeResponse = null;

  client.prototype._onUnsubscribeSuccess = null;

  client.prototype._pendingReceives = null;

  client.prototype._pendingRestoreStateCalls = 0;

  client.prototype._pendingRestoreStateCallsLock = null;

  client.prototype._queueActivated = false;

  client.prototype._queueLock = null;

  client.prototype._rebindCache = null;

  client.prototype._reconnectCache = null;

  client.prototype._reconnectCacheLock = null;

  client.prototype._requestQueue = null;

  client.prototype._requestTransfer = null;

  client._requestUrlCache = null;

  client._requestUrlCacheLock = null;

  client.prototype._responseArgs = null;

  client.prototype._resubscribeCache = null;

  client.prototype._serverTimeout = 0;

  client.prototype._sessionId = null;

  client._stateKey = null;

  client.prototype._stateLock = null;

  client.prototype._streamRequestTransfer = null;

  client.prototype._subscribedChannels = null;

  client.prototype._subscribedChannelsLock = null;

  client.prototype._subscribedDynamicProperties = null;

  client.prototype._subscribedOnReceives = null;

  client.prototype._subscribedOnReceivesLock = null;

  client.prototype._supportedConnectionTypes = null;

  client.prototype._synchronous = null;

  client.prototype._threadCounters = null;

  client.prototype._threadCountersLock = null;

  client.prototype._token = null;

  client.prototype._webSocketOpened = false;


  /*<span id='method-fm.websync.client-fm.websync.client'>&nbsp;</span> */


  /**
  	 <div>
  	 Initializes a new instance of the <see cref="fm.websync.client">fm.websync.client</see> class.
  	 </div>
  	@function fm.websync.client
  	@param {String} requestUrl The absolute URL of the WebSync server request handler for non-streaming requests.
  	@param {String} streamRequestUrl The absolute URL of the WebSync server request handler for streaming requests.
  	@return {}
   */

  function client() {
    this.webSocketStreamFailure = bind(this.webSocketStreamFailure, this);
    this.webSocketOpenSuccess = bind(this.webSocketOpenSuccess, this);
    this.webSocketOpenFailure = bind(this.webSocketOpenFailure, this);
    this.unsubscribe = bind(this.unsubscribe, this);
    this.unsetCustomOnReceiveWithTag = bind(this.unsetCustomOnReceiveWithTag, this);
    this.unsetCustomOnReceive = bind(this.unsetCustomOnReceive, this);
    this.unbind = bind(this.unbind, this);
    this.tryWebSocket = bind(this.tryWebSocket, this);
    this.subscribe = bind(this.subscribe, this);
    this.streamDeferred = bind(this.streamDeferred, this);
    this.streamCallback = bind(this.streamCallback, this);
    this.stream = bind(this.stream, this);
    this.startBatch = bind(this.startBatch, this);
    this.setToken = bind(this.setToken, this);
    this.setSynchronous = bind(this.setSynchronous, this);
    this.setStreamRequestUrl = bind(this.setStreamRequestUrl, this);
    this.setSessionId = bind(this.setSessionId, this);
    this.setServerTimeout = bind(this.setServerTimeout, this);
    this.setIsDisconnecting = bind(this.setIsDisconnecting, this);
    this.setIsConnecting = bind(this.setIsConnecting, this);
    this.setIsConnected = bind(this.setIsConnected, this);
    this.setInstanceId = bind(this.setInstanceId, this);
    this.setDisableWebSockets = bind(this.setDisableWebSockets, this);
    this.setCustomOnReceiveWithTag = bind(this.setCustomOnReceiveWithTag, this);
    this.setCustomOnReceive = bind(this.setCustomOnReceive, this);
    this.setClientId = bind(this.setClientId, this);
    this.service = bind(this.service, this);
    this.sendMany = bind(this.sendMany, this);
    this.sendCallback = bind(this.sendCallback, this);
    this.send = bind(this.send, this);
    this.retryConnectDeferred = bind(this.retryConnectDeferred, this);
    this.retryConnect = bind(this.retryConnect, this);
    this.restream = bind(this.restream, this);
    this.removeSubscribedOnReceive = bind(this.removeSubscribedOnReceive, this);
    this.removeSubscribedChannels = bind(this.removeSubscribedChannels, this);
    this.removeOnUnsubscribeSuccess = bind(this.removeOnUnsubscribeSuccess, this);
    this.removeOnUnsubscribeFailure = bind(this.removeOnUnsubscribeFailure, this);
    this.removeOnUnsubscribeComplete = bind(this.removeOnUnsubscribeComplete, this);
    this.removeOnUnbindSuccess = bind(this.removeOnUnbindSuccess, this);
    this.removeOnUnbindFailure = bind(this.removeOnUnbindFailure, this);
    this.removeOnUnbindComplete = bind(this.removeOnUnbindComplete, this);
    this.removeOnSubscribeSuccess = bind(this.removeOnSubscribeSuccess, this);
    this.removeOnSubscribeFailure = bind(this.removeOnSubscribeFailure, this);
    this.removeOnSubscribeComplete = bind(this.removeOnSubscribeComplete, this);
    this.removeOnStreamFailure = bind(this.removeOnStreamFailure, this);
    this.removeOnStateRestored = bind(this.removeOnStateRestored, this);
    this.removeOnServiceSuccess = bind(this.removeOnServiceSuccess, this);
    this.removeOnServiceFailure = bind(this.removeOnServiceFailure, this);
    this.removeOnServiceComplete = bind(this.removeOnServiceComplete, this);
    this.removeOnServerUnsubscribe = bind(this.removeOnServerUnsubscribe, this);
    this.removeOnServerUnbind = bind(this.removeOnServerUnbind, this);
    this.removeOnServerSubscribe = bind(this.removeOnServerSubscribe, this);
    this.removeOnServerBind = bind(this.removeOnServerBind, this);
    this.removeOnPublishSuccess = bind(this.removeOnPublishSuccess, this);
    this.removeOnPublishFailure = bind(this.removeOnPublishFailure, this);
    this.removeOnPublishComplete = bind(this.removeOnPublishComplete, this);
    this.removeOnNotifySuccess = bind(this.removeOnNotifySuccess, this);
    this.removeOnNotifyFailure = bind(this.removeOnNotifyFailure, this);
    this.removeOnNotifyComplete = bind(this.removeOnNotifyComplete, this);
    this.removeOnNotify = bind(this.removeOnNotify, this);
    this.removeOnDisconnectComplete = bind(this.removeOnDisconnectComplete, this);
    this.removeOnConnectSuccess = bind(this.removeOnConnectSuccess, this);
    this.removeOnConnectFailure = bind(this.removeOnConnectFailure, this);
    this.removeOnConnectComplete = bind(this.removeOnConnectComplete, this);
    this.removeOnBindSuccess = bind(this.removeOnBindSuccess, this);
    this.removeOnBindFailure = bind(this.removeOnBindFailure, this);
    this.removeOnBindComplete = bind(this.removeOnBindComplete, this);
    this.removeBoundRecords = bind(this.removeBoundRecords, this);
    this.reconnect = bind(this.reconnect, this);
    this.receiveSink = bind(this.receiveSink, this);
    this.receiveMessage = bind(this.receiveMessage, this);
    this.raiseUnsubscribeSuccess = bind(this.raiseUnsubscribeSuccess, this);
    this.raiseUnsubscribeFailure = bind(this.raiseUnsubscribeFailure, this);
    this.raiseUnsubscribeComplete = bind(this.raiseUnsubscribeComplete, this);
    this.raiseUnbindSuccess = bind(this.raiseUnbindSuccess, this);
    this.raiseUnbindFailure = bind(this.raiseUnbindFailure, this);
    this.raiseUnbindComplete = bind(this.raiseUnbindComplete, this);
    this.raiseSubscribeSuccess = bind(this.raiseSubscribeSuccess, this);
    this.raiseSubscribeFailure = bind(this.raiseSubscribeFailure, this);
    this.raiseSubscribeDelivery = bind(this.raiseSubscribeDelivery, this);
    this.raiseSubscribeComplete = bind(this.raiseSubscribeComplete, this);
    this.raiseStreamFailure = bind(this.raiseStreamFailure, this);
    this.raiseStateRestored = bind(this.raiseStateRestored, this);
    this.raiseServiceSuccess = bind(this.raiseServiceSuccess, this);
    this.raiseServiceFailure = bind(this.raiseServiceFailure, this);
    this.raiseServiceComplete = bind(this.raiseServiceComplete, this);
    this.raiseServerUnsubscribe = bind(this.raiseServerUnsubscribe, this);
    this.raiseServerUnbind = bind(this.raiseServerUnbind, this);
    this.raiseServerSubscribe = bind(this.raiseServerSubscribe, this);
    this.raiseServerBind = bind(this.raiseServerBind, this);
    this.raiseSendException = bind(this.raiseSendException, this);
    this.raiseRetriable = bind(this.raiseRetriable, this);
    this.raiseResponseEvent = bind(this.raiseResponseEvent, this);
    this.raiseRequestEvent = bind(this.raiseRequestEvent, this);
    this.raisePublishSuccess = bind(this.raisePublishSuccess, this);
    this.raisePublishFailure = bind(this.raisePublishFailure, this);
    this.raisePublishComplete = bind(this.raisePublishComplete, this);
    this.raiseNotifySuccess = bind(this.raiseNotifySuccess, this);
    this.raiseNotifyFailure = bind(this.raiseNotifyFailure, this);
    this.raiseNotifyDelivery = bind(this.raiseNotifyDelivery, this);
    this.raiseNotifyComplete = bind(this.raiseNotifyComplete, this);
    this.raiseFunctionManual = bind(this.raiseFunctionManual, this);
    this.raiseFunction = bind(this.raiseFunction, this);
    this.raiseForcedUnsubscribes = bind(this.raiseForcedUnsubscribes, this);
    this.raiseForcedUnbinds = bind(this.raiseForcedUnbinds, this);
    this.raiseEvent = bind(this.raiseEvent, this);
    this.raiseDisconnectComplete = bind(this.raiseDisconnectComplete, this);
    this.raiseConnectSuccess = bind(this.raiseConnectSuccess, this);
    this.raiseConnectFailure = bind(this.raiseConnectFailure, this);
    this.raiseConnectComplete = bind(this.raiseConnectComplete, this);
    this.raiseCompleteEvent = bind(this.raiseCompleteEvent, this);
    this.raiseBindSuccess = bind(this.raiseBindSuccess, this);
    this.raiseBindFailure = bind(this.raiseBindFailure, this);
    this.raiseBindComplete = bind(this.raiseBindComplete, this);
    this.raiseActionManual = bind(this.raiseActionManual, this);
    this.raiseAction = bind(this.raiseAction, this);
    this.publish = bind(this.publish, this);
    this.processServerAction = bind(this.processServerAction, this);
    this.processRequestUrl = bind(this.processRequestUrl, this);
    this.processQueue = bind(this.processQueue, this);
    this.processPendingReceives = bind(this.processPendingReceives, this);
    this.processAdvice = bind(this.processAdvice, this);
    this.preRaise = bind(this.preRaise, this);
    this.postRaise = bind(this.postRaise, this);
    this.performUnsubscribeCallback = bind(this.performUnsubscribeCallback, this);
    this.performUnsubscribe = bind(this.performUnsubscribe, this);
    this.performUnbindCallback = bind(this.performUnbindCallback, this);
    this.performUnbind = bind(this.performUnbind, this);
    this.performSubscribeCallback = bind(this.performSubscribeCallback, this);
    this.performSubscribe = bind(this.performSubscribe, this);
    this.performServiceCallback = bind(this.performServiceCallback, this);
    this.performService = bind(this.performService, this);
    this.performPublishCallback = bind(this.performPublishCallback, this);
    this.performPublish = bind(this.performPublish, this);
    this.performNotifyCallback = bind(this.performNotifyCallback, this);
    this.performNotify = bind(this.performNotify, this);
    this.performDisconnectCallback = bind(this.performDisconnectCallback, this);
    this.performDisconnect = bind(this.performDisconnect, this);
    this.performConnectCallback = bind(this.performConnectCallback, this);
    this.performConnect = bind(this.performConnect, this);
    this.performBindCallback = bind(this.performBindCallback, this);
    this.performBind = bind(this.performBind, this);
    this.notify = bind(this.notify, this);
    this.maybeRaiseStateRestored = bind(this.maybeRaiseStateRestored, this);
    this.inCallback = bind(this.inCallback, this);
    this.inBatch = bind(this.inBatch, this);
    this.getToken = bind(this.getToken, this);
    this.getThreadId = bind(this.getThreadId, this);
    this.getSynchronous = bind(this.getSynchronous, this);
    this.getSubscribedChannels = bind(this.getSubscribedChannels, this);
    this.getStreamRequestUrl = bind(this.getStreamRequestUrl, this);
    this.getStreamRequestTimeout = bind(this.getStreamRequestTimeout, this);
    this.getSessionId = bind(this.getSessionId, this);
    this.getServerTimeout = bind(this.getServerTimeout, this);
    this.getIsDisconnecting = bind(this.getIsDisconnecting, this);
    this.getIsConnecting = bind(this.getIsConnecting, this);
    this.getIsConnected = bind(this.getIsConnected, this);
    this.getInstanceId = bind(this.getInstanceId, this);
    this.getDisableWebSockets = bind(this.getDisableWebSockets, this);
    this.getCustomOnReceiveWithTag = bind(this.getCustomOnReceiveWithTag, this);
    this.getCustomOnReceive = bind(this.getCustomOnReceive, this);
    this.getClientId = bind(this.getClientId, this);
    this.getBoundRecords = bind(this.getBoundRecords, this);
    this.endBatch = bind(this.endBatch, this);
    this.doLongPolling = bind(this.doLongPolling, this);
    this.disconnect = bind(this.disconnect, this);
    this.decrementPendingRestoreStateCalls = bind(this.decrementPendingRestoreStateCalls, this);
    this.connect = bind(this.connect, this);
    this.clearSubscribedChannels = bind(this.clearSubscribedChannels, this);
    this.clearBoundRecords = bind(this.clearBoundRecords, this);
    this.checkSynchronous = bind(this.checkSynchronous, this);
    this.bind = bind(this.bind, this);
    this.addToQueue = bind(this.addToQueue, this);
    this.addSubscribedOnReceive = bind(this.addSubscribedOnReceive, this);
    this.addSubscribedChannels = bind(this.addSubscribedChannels, this);
    this.addOnUnsubscribeSuccess = bind(this.addOnUnsubscribeSuccess, this);
    this.addOnUnsubscribeFailure = bind(this.addOnUnsubscribeFailure, this);
    this.addOnUnsubscribeComplete = bind(this.addOnUnsubscribeComplete, this);
    this.addOnUnbindSuccess = bind(this.addOnUnbindSuccess, this);
    this.addOnUnbindFailure = bind(this.addOnUnbindFailure, this);
    this.addOnUnbindComplete = bind(this.addOnUnbindComplete, this);
    this.addOnSubscribeSuccess = bind(this.addOnSubscribeSuccess, this);
    this.addOnSubscribeFailure = bind(this.addOnSubscribeFailure, this);
    this.addOnSubscribeComplete = bind(this.addOnSubscribeComplete, this);
    this.addOnStreamFailure = bind(this.addOnStreamFailure, this);
    this.addOnStateRestored = bind(this.addOnStateRestored, this);
    this.addOnServiceSuccess = bind(this.addOnServiceSuccess, this);
    this.addOnServiceFailure = bind(this.addOnServiceFailure, this);
    this.addOnServiceComplete = bind(this.addOnServiceComplete, this);
    this.addOnServerUnsubscribe = bind(this.addOnServerUnsubscribe, this);
    this.addOnServerUnbind = bind(this.addOnServerUnbind, this);
    this.addOnServerSubscribe = bind(this.addOnServerSubscribe, this);
    this.addOnServerBind = bind(this.addOnServerBind, this);
    this.addOnPublishSuccess = bind(this.addOnPublishSuccess, this);
    this.addOnPublishFailure = bind(this.addOnPublishFailure, this);
    this.addOnPublishComplete = bind(this.addOnPublishComplete, this);
    this.addOnNotifySuccess = bind(this.addOnNotifySuccess, this);
    this.addOnNotifyFailure = bind(this.addOnNotifyFailure, this);
    this.addOnNotifyComplete = bind(this.addOnNotifyComplete, this);
    this.addOnNotify = bind(this.addOnNotify, this);
    this.addOnDisconnectComplete = bind(this.addOnDisconnectComplete, this);
    this.addOnConnectSuccess = bind(this.addOnConnectSuccess, this);
    this.addOnConnectFailure = bind(this.addOnConnectFailure, this);
    this.addOnConnectComplete = bind(this.addOnConnectComplete, this);
    this.addOnBindSuccess = bind(this.addOnBindSuccess, this);
    this.addOnBindFailure = bind(this.addOnBindFailure, this);
    this.addOnBindComplete = bind(this.addOnBindComplete, this);
    this.addBoundRecords = bind(this.addBoundRecords, this);
    this.activateStream = bind(this.activateStream, this);
    var instance, requestUrl, streamRequestUrl;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = client.__super__.constructor.call(this);
      this._disconnectCalled = false;
      this._counter = 0;
      this._lastBackoffTimeout = 0;
      this._lastBackoffIndex = -1;
      this._threadCounters = {};
      this._threadCountersLock = new fm.object();
      this._lastInterval = 0;
      this._lastReconnect = null;
      this._connectArgs = null;
      this._responseArgs = null;
      this._reconnectCacheLock = new fm.object();
      this._reconnectCache = [];
      this._rebindCache = {};
      this._resubscribeCache = {};
      this._boundRecordsLock = new fm.object();
      this._boundRecords = {};
      this._subscribedChannelsLock = new fm.object();
      this._subscribedChannels = {};
      this._subscribedOnReceivesLock = new fm.object();
      this._subscribedOnReceives = {};
      this._subscribedDynamicProperties = {};
      this._pendingReceives = {};
      this._customOnReceivesLock = new fm.object();
      this._customOnReceives = {};
      this._stateLock = new fm.object();
      this._queueLock = new fm.object();
      this._queueActivated = false;
      this._requestQueue = {};
      this._supportedConnectionTypes = new Array(0);
      this._connectionType = fm.websync.connectionType.LongPolling;
      this._batchCounter = 0;
      this._batchCounterLock = new fm.object();
      this._pendingRestoreStateCalls = 0;
      this._pendingRestoreStateCallsLock = new fm.object();
      this._webSocketOpened = false;
      this._counterLock = new fm.object();
      this.setSynchronous(false);
      this.setToken(fm.websync.client.generateToken());
      this.setInstanceId(fm.guid.newGuid());
      this.setDisableWebSockets(true);
      this._requestTransfer = fm.websync.messageTransferFactory.getHttpMessageTransfer();
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    if (arguments.length === 0) {
      instance = client.__super__.constructor.call(this);
      this._disconnectCalled = false;
      this._counter = 0;
      this._lastBackoffTimeout = 0;
      this._lastBackoffIndex = -1;
      this._threadCounters = {};
      this._threadCountersLock = new fm.object();
      this._lastInterval = 0;
      this._lastReconnect = null;
      this._connectArgs = null;
      this._responseArgs = null;
      this._reconnectCacheLock = new fm.object();
      this._reconnectCache = [];
      this._rebindCache = {};
      this._resubscribeCache = {};
      this._boundRecordsLock = new fm.object();
      this._boundRecords = {};
      this._subscribedChannelsLock = new fm.object();
      this._subscribedChannels = {};
      this._subscribedOnReceivesLock = new fm.object();
      this._subscribedOnReceives = {};
      this._subscribedDynamicProperties = {};
      this._pendingReceives = {};
      this._customOnReceivesLock = new fm.object();
      this._customOnReceives = {};
      this._stateLock = new fm.object();
      this._queueLock = new fm.object();
      this._queueActivated = false;
      this._requestQueue = {};
      this._supportedConnectionTypes = new Array(0);
      this._connectionType = fm.websync.connectionType.LongPolling;
      this._batchCounter = 0;
      this._batchCounterLock = new fm.object();
      this._pendingRestoreStateCalls = 0;
      this._pendingRestoreStateCallsLock = new fm.object();
      this._webSocketOpened = false;
      this._counterLock = new fm.object();
      this.setSynchronous(false);
      this.setToken(fm.websync.client.generateToken());
      this.setInstanceId(fm.guid.newGuid());
      this.setDisableWebSockets(true);
      this._requestTransfer = fm.websync.messageTransferFactory.getHttpMessageTransfer();
      return instance;
    }
    if (arguments.length === 1) {
      requestUrl = arguments[0];
      client.call(this, requestUrl, requestUrl);
      return instance;
    }
    if (arguments.length === 2) {
      requestUrl = arguments[0];
      streamRequestUrl = arguments[1];
      client.call(this);
      this.setRequestUrl(requestUrl);
      this.setStreamRequestUrl(streamRequestUrl);
      return instance;
    }
  }


  /*<span id='method-fm.websync.client-addOnBindEnd'>&nbsp;</span> */


  /**
  	 <div>
  	 Adds a handler that is raised after a <see cref="fm.websync.client">fm.websync.client</see> bind ends. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to the client after processing.
  	 </div>
  	@function addOnBindEnd
  	@param {fm.doubleAction} value
  	@return {void}
   */

  client.addOnBindEnd = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onBindEnd = fm.delegate.combine(fm.websync.client._onBindEnd, value);
  };


  /*<span id='method-fm.websync.client-addOnBindRequest'>&nbsp;</span> */


  /**
  	 <div>
  	 Adds a handler that is raised before a <see cref="fm.websync.client">fm.websync.client</see> bind request begins. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to a request before it is sent to the server.
  	 </div>
  	@function addOnBindRequest
  	@param {fm.doubleAction} value
  	@return {void}
   */

  client.addOnBindRequest = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onBindRequest = fm.delegate.combine(fm.websync.client._onBindRequest, value);
  };


  /*<span id='method-fm.websync.client-addOnBindResponse'>&nbsp;</span> */


  /**
  	 <div>
  	 Adds a handler that is raised after a <see cref="fm.websync.client">fm.websync.client</see> bind response returns. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to a response after it is received from the server.
  	 </div>
  	@function addOnBindResponse
  	@param {fm.doubleAction} value
  	@return {void}
   */

  client.addOnBindResponse = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onBindResponse = fm.delegate.combine(fm.websync.client._onBindResponse, value);
  };


  /*<span id='method-fm.websync.client-addOnConnectEnd'>&nbsp;</span> */


  /**
  	 <div>
  	 Adds a handler that is raised after a <see cref="fm.websync.client">fm.websync.client</see> connect ends. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to the client after processing.
  	 </div>
  	@function addOnConnectEnd
  	@param {fm.doubleAction} value
  	@return {void}
   */

  client.addOnConnectEnd = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onConnectEnd = fm.delegate.combine(fm.websync.client._onConnectEnd, value);
  };


  /*<span id='method-fm.websync.client-addOnConnectRequest'>&nbsp;</span> */


  /**
  	 <div>
  	 Adds a handler that is raised before a <see cref="fm.websync.client">fm.websync.client</see> connect request begins. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to a request before it is sent to the server.
  	 </div>
  	@function addOnConnectRequest
  	@param {fm.doubleAction} value
  	@return {void}
   */

  client.addOnConnectRequest = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onConnectRequest = fm.delegate.combine(fm.websync.client._onConnectRequest, value);
  };


  /*<span id='method-fm.websync.client-addOnConnectResponse'>&nbsp;</span> */


  /**
  	 <div>
  	 Adds a handler that is raised after a <see cref="fm.websync.client">fm.websync.client</see> connect response returns. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to a response after it is received from the server.
  	 </div>
  	@function addOnConnectResponse
  	@param {fm.doubleAction} value
  	@return {void}
   */

  client.addOnConnectResponse = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onConnectResponse = fm.delegate.combine(fm.websync.client._onConnectResponse, value);
  };


  /*<span id='method-fm.websync.client-addOnDisconnectEnd'>&nbsp;</span> */


  /**
  	 <div>
  	 Adds a handler that is raised after a <see cref="fm.websync.client">fm.websync.client</see> disconnect ends. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to the client after processing.
  	 </div>
  	@function addOnDisconnectEnd
  	@param {fm.doubleAction} value
  	@return {void}
   */

  client.addOnDisconnectEnd = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onDisconnectEnd = fm.delegate.combine(fm.websync.client._onDisconnectEnd, value);
  };


  /*<span id='method-fm.websync.client-addOnDisconnectRequest'>&nbsp;</span> */


  /**
  	 <div>
  	 Adds a handler that is raised before a <see cref="fm.websync.client">fm.websync.client</see> disconnect request begins. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to a request before it is sent to the server.
  	 </div>
  	@function addOnDisconnectRequest
  	@param {fm.doubleAction} value
  	@return {void}
   */

  client.addOnDisconnectRequest = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onDisconnectRequest = fm.delegate.combine(fm.websync.client._onDisconnectRequest, value);
  };


  /*<span id='method-fm.websync.client-addOnDisconnectResponse'>&nbsp;</span> */


  /**
  	 <div>
  	 Adds a handler that is raised after a <see cref="fm.websync.client">fm.websync.client</see> disconnect response returns. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to a response after it is received from the server.
  	 </div>
  	@function addOnDisconnectResponse
  	@param {fm.doubleAction} value
  	@return {void}
   */

  client.addOnDisconnectResponse = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onDisconnectResponse = fm.delegate.combine(fm.websync.client._onDisconnectResponse, value);
  };


  /*<span id='method-fm.websync.client-addOnNotifyEnd'>&nbsp;</span> */


  /**
  	 <div>
  	 Adds a handler that is raised after a <see cref="fm.websync.client">fm.websync.client</see> notify ends. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to the client after processing.
  	 </div>
  	@function addOnNotifyEnd
  	@param {fm.doubleAction} value
  	@return {void}
   */

  client.addOnNotifyEnd = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onNotifyEnd = fm.delegate.combine(fm.websync.client._onNotifyEnd, value);
  };


  /*<span id='method-fm.websync.client-addOnNotifyRequest'>&nbsp;</span> */


  /**
  	 <div>
  	 Adds a handler that is raised before a <see cref="fm.websync.client">fm.websync.client</see> notify request begins. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to a request before it is sent to the server.
  	 </div>
  	@function addOnNotifyRequest
  	@param {fm.doubleAction} value
  	@return {void}
   */

  client.addOnNotifyRequest = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onNotifyRequest = fm.delegate.combine(fm.websync.client._onNotifyRequest, value);
  };


  /*<span id='method-fm.websync.client-addOnNotifyResponse'>&nbsp;</span> */


  /**
  	 <div>
  	 Adds a handler that is raised after a <see cref="fm.websync.client">fm.websync.client</see> notify response returns. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to a response after it is received from the server.
  	 </div>
  	@function addOnNotifyResponse
  	@param {fm.doubleAction} value
  	@return {void}
   */

  client.addOnNotifyResponse = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onNotifyResponse = fm.delegate.combine(fm.websync.client._onNotifyResponse, value);
  };


  /*<span id='method-fm.websync.client-addOnPublishEnd'>&nbsp;</span> */


  /**
  	 <div>
  	 Adds a handler that is raised after a <see cref="fm.websync.client">fm.websync.client</see> publish ends. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to the client after processing.
  	 </div>
  	@function addOnPublishEnd
  	@param {fm.doubleAction} value
  	@return {void}
   */

  client.addOnPublishEnd = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onPublishEnd = fm.delegate.combine(fm.websync.client._onPublishEnd, value);
  };


  /*<span id='method-fm.websync.client-addOnPublishRequest'>&nbsp;</span> */


  /**
  	 <div>
  	 Adds a handler that is raised before a <see cref="fm.websync.client">fm.websync.client</see> publish request begins. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to a request before it is sent to the server.
  	 </div>
  	@function addOnPublishRequest
  	@param {fm.doubleAction} value
  	@return {void}
   */

  client.addOnPublishRequest = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onPublishRequest = fm.delegate.combine(fm.websync.client._onPublishRequest, value);
  };


  /*<span id='method-fm.websync.client-addOnPublishResponse'>&nbsp;</span> */


  /**
  	 <div>
  	 Adds a handler that is raised after a <see cref="fm.websync.client">fm.websync.client</see> publish response returns. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to a response after it is received from the server.
  	 </div>
  	@function addOnPublishResponse
  	@param {fm.doubleAction} value
  	@return {void}
   */

  client.addOnPublishResponse = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onPublishResponse = fm.delegate.combine(fm.websync.client._onPublishResponse, value);
  };


  /*<span id='method-fm.websync.client-addOnServiceEnd'>&nbsp;</span> */


  /**
  	 <div>
  	 Adds a handler that is raised after a <see cref="fm.websync.client">fm.websync.client</see> service ends. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to the client after processing.
  	 </div>
  	@function addOnServiceEnd
  	@param {fm.doubleAction} value
  	@return {void}
   */

  client.addOnServiceEnd = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onServiceEnd = fm.delegate.combine(fm.websync.client._onServiceEnd, value);
  };


  /*<span id='method-fm.websync.client-addOnServiceRequest'>&nbsp;</span> */


  /**
  	 <div>
  	 Adds a handler that is raised before a <see cref="fm.websync.client">fm.websync.client</see> service request begins. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to a request before it is sent to the server.
  	 </div>
  	@function addOnServiceRequest
  	@param {fm.doubleAction} value
  	@return {void}
   */

  client.addOnServiceRequest = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onServiceRequest = fm.delegate.combine(fm.websync.client._onServiceRequest, value);
  };


  /*<span id='method-fm.websync.client-addOnServiceResponse'>&nbsp;</span> */


  /**
  	 <div>
  	 Adds a handler that is raised after a <see cref="fm.websync.client">fm.websync.client</see> service response returns. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to a response after it is received from the server.
  	 </div>
  	@function addOnServiceResponse
  	@param {fm.doubleAction} value
  	@return {void}
   */

  client.addOnServiceResponse = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onServiceResponse = fm.delegate.combine(fm.websync.client._onServiceResponse, value);
  };


  /*<span id='method-fm.websync.client-addOnSubscribeEnd'>&nbsp;</span> */


  /**
  	 <div>
  	 Adds a handler that is raised after a <see cref="fm.websync.client">fm.websync.client</see> subscribe ends. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to the client after processing.
  	 </div>
  	@function addOnSubscribeEnd
  	@param {fm.doubleAction} value
  	@return {void}
   */

  client.addOnSubscribeEnd = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onSubscribeEnd = fm.delegate.combine(fm.websync.client._onSubscribeEnd, value);
  };


  /*<span id='method-fm.websync.client-addOnSubscribeRequest'>&nbsp;</span> */


  /**
  	 <div>
  	 Adds a handler that is raised before a <see cref="fm.websync.client">fm.websync.client</see> subscribe request begins. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to a request before it is sent to the server.
  	 </div>
  	@function addOnSubscribeRequest
  	@param {fm.doubleAction} value
  	@return {void}
   */

  client.addOnSubscribeRequest = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onSubscribeRequest = fm.delegate.combine(fm.websync.client._onSubscribeRequest, value);
  };


  /*<span id='method-fm.websync.client-addOnSubscribeResponse'>&nbsp;</span> */


  /**
  	 <div>
  	 Adds a handler that is raised after a <see cref="fm.websync.client">fm.websync.client</see> subscribe response returns. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to a response after it is received from the server.
  	 </div>
  	@function addOnSubscribeResponse
  	@param {fm.doubleAction} value
  	@return {void}
   */

  client.addOnSubscribeResponse = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onSubscribeResponse = fm.delegate.combine(fm.websync.client._onSubscribeResponse, value);
  };


  /*<span id='method-fm.websync.client-addOnUnbindEnd'>&nbsp;</span> */


  /**
  	 <div>
  	 Adds a handler that is raised after a <see cref="fm.websync.client">fm.websync.client</see> unbind ends. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to the client after processing.
  	 </div>
  	@function addOnUnbindEnd
  	@param {fm.doubleAction} value
  	@return {void}
   */

  client.addOnUnbindEnd = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onUnbindEnd = fm.delegate.combine(fm.websync.client._onUnbindEnd, value);
  };


  /*<span id='method-fm.websync.client-addOnUnbindRequest'>&nbsp;</span> */


  /**
  	 <div>
  	 Adds a handler that is raised before a <see cref="fm.websync.client">fm.websync.client</see> unbind request begins. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to a request before it is sent to the server.
  	 </div>
  	@function addOnUnbindRequest
  	@param {fm.doubleAction} value
  	@return {void}
   */

  client.addOnUnbindRequest = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onUnbindRequest = fm.delegate.combine(fm.websync.client._onUnbindRequest, value);
  };


  /*<span id='method-fm.websync.client-addOnUnbindResponse'>&nbsp;</span> */


  /**
  	 <div>
  	 Adds a handler that is raised after a <see cref="fm.websync.client">fm.websync.client</see> unbind response returns. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to a response after it is received from the server.
  	 </div>
  	@function addOnUnbindResponse
  	@param {fm.doubleAction} value
  	@return {void}
   */

  client.addOnUnbindResponse = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onUnbindResponse = fm.delegate.combine(fm.websync.client._onUnbindResponse, value);
  };


  /*<span id='method-fm.websync.client-addOnUnsubscribeEnd'>&nbsp;</span> */


  /**
  	 <div>
  	 Adds a handler that is raised after a <see cref="fm.websync.client">fm.websync.client</see> unsubscribe ends. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to the client after processing.
  	 </div>
  	@function addOnUnsubscribeEnd
  	@param {fm.doubleAction} value
  	@return {void}
   */

  client.addOnUnsubscribeEnd = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onUnsubscribeEnd = fm.delegate.combine(fm.websync.client._onUnsubscribeEnd, value);
  };


  /*<span id='method-fm.websync.client-addOnUnsubscribeRequest'>&nbsp;</span> */


  /**
  	 <div>
  	 Adds a handler that is raised before a <see cref="fm.websync.client">fm.websync.client</see> unsubscribe request begins. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to a request before it is sent to the server.
  	 </div>
  	@function addOnUnsubscribeRequest
  	@param {fm.doubleAction} value
  	@return {void}
   */

  client.addOnUnsubscribeRequest = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onUnsubscribeRequest = fm.delegate.combine(fm.websync.client._onUnsubscribeRequest, value);
  };


  /*<span id='method-fm.websync.client-addOnUnsubscribeResponse'>&nbsp;</span> */


  /**
  	 <div>
  	 Adds a handler that is raised after a <see cref="fm.websync.client">fm.websync.client</see> unsubscribe response returns. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to a response after it is received from the server.
  	 </div>
  	@function addOnUnsubscribeResponse
  	@param {fm.doubleAction} value
  	@return {void}
   */

  client.addOnUnsubscribeResponse = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onUnsubscribeResponse = fm.delegate.combine(fm.websync.client._onUnsubscribeResponse, value);
  };


  /*<span id='method-fm.websync.client-generateToken'>&nbsp;</span> */


  /**
  	 <div>
  	 Generates a new token based on the current date/time.
  	 </div>
  	@function generateToken
  	@return {String} The generated token.
   */

  client.generateToken = function() {
    var str;
    str = fm.intExtensions.toString(fm.dateTime.getUtcNow().getTicks());
    return fm.stringExtensions.substring(str, str.length - 12, 8);
  };

  client.getChannelForPublish = function() {
    var publishArgs, response;
    response = arguments[0];
    publishArgs = arguments[1];
    if (fm.global.equals(response, null)) {
      return publishArgs.__channel;
    }
    if (fm.global.equals(response.getChannel(), null)) {
      return publishArgs.__channel;
    }
    return response.getChannel();
  };

  client.getChannelForService = function() {
    var response, serviceArgs;
    response = arguments[0];
    serviceArgs = arguments[1];
    if (fm.global.equals(response, null)) {
      return serviceArgs.__channel;
    }
    if (fm.global.equals(response.getChannel(), null)) {
      return serviceArgs.__channel;
    }
    return response.getChannel();
  };

  client.getChannelsForSubscribe = function() {
    var response, subscribeArgs;
    response = arguments[0];
    subscribeArgs = arguments[1];
    if (fm.global.equals(response, null)) {
      return subscribeArgs.__channels;
    }
    if (fm.global.equals(response.getChannels(), null)) {
      return subscribeArgs.__channels;
    }
    return response.getChannels();
  };

  client.getChannelsForUnsubscribe = function() {
    var response, unsubscribeArgs;
    response = arguments[0];
    unsubscribeArgs = arguments[1];
    if (fm.global.equals(response, null)) {
      return unsubscribeArgs.__channels;
    }
    if (fm.global.equals(response.getChannels(), null)) {
      return unsubscribeArgs.__channels;
    }
    return response.getChannels();
  };

  client.getDataBytesForNotify = function() {
    var notifyArgs, response;
    response = arguments[0];
    notifyArgs = arguments[1];
    if (fm.global.equals(response, null)) {
      return notifyArgs.__dataBytes;
    }
    if (fm.global.equals(response.getDataBytes(), null)) {
      return notifyArgs.__dataBytes;
    }
    return response.getDataBytes();
  };

  client.getDataBytesForPublish = function() {
    var publishArgs, response;
    response = arguments[0];
    publishArgs = arguments[1];
    if (fm.global.equals(response, null)) {
      return publishArgs.__dataBytes;
    }
    if (fm.global.equals(response.getDataBytes(), null)) {
      return publishArgs.__dataBytes;
    }
    return response.getDataBytes();
  };

  client.getDataBytesForService = function() {
    var response, serviceArgs;
    response = arguments[0];
    serviceArgs = arguments[1];
    if (fm.global.equals(response, null)) {
      return serviceArgs.__dataBytes;
    }
    if (fm.global.equals(response.getDataBytes(), null)) {
      return serviceArgs.__dataBytes;
    }
    return response.getDataBytes();
  };

  client.getDataJsonForNotify = function() {
    var notifyArgs, response;
    response = arguments[0];
    notifyArgs = arguments[1];
    if (fm.global.equals(response, null)) {
      return notifyArgs.__dataJson;
    }
    if (fm.global.equals(response.getDataJson(), null)) {
      return notifyArgs.__dataJson;
    }
    return response.getDataJson();
  };

  client.getDataJsonForPublish = function() {
    var publishArgs, response;
    response = arguments[0];
    publishArgs = arguments[1];
    if (fm.global.equals(response, null)) {
      return publishArgs.__dataJson;
    }
    if (fm.global.equals(response.getDataJson(), null)) {
      return publishArgs.__dataJson;
    }
    return response.getDataJson();
  };

  client.getDataJsonForService = function() {
    var response, serviceArgs;
    response = arguments[0];
    serviceArgs = arguments[1];
    if (fm.global.equals(response, null)) {
      return serviceArgs.__dataJson;
    }
    if (fm.global.equals(response.getDataJson(), null)) {
      return serviceArgs.__dataJson;
    }
    return response.getDataJson();
  };

  client.getExtensions = function() {
    var methodArgs, response;
    response = arguments[0];
    methodArgs = arguments[1];
    if (!fm.global.equals(response, null)) {
      return response.getExtensions();
    }
    return methodArgs.getExtensions();
  };

  client.getRecordsForBind = function() {
    var bindArgs, response;
    response = arguments[0];
    bindArgs = arguments[1];
    if (fm.global.equals(response, null)) {
      return bindArgs.__records;
    }
    if (fm.global.equals(response.getRecords(), null)) {
      return bindArgs.__records;
    }
    return response.getRecords();
  };

  client.getRecordsForUnbind = function() {
    var response, unbindArgs;
    response = arguments[0];
    unbindArgs = arguments[1];
    if (fm.global.equals(response, null)) {
      return unbindArgs.__records;
    }
    if (fm.global.equals(response.getRecords(), null)) {
      return unbindArgs.__records;
    }
    return response.getRecords();
  };

  client.getSubscribeKey = function() {
    var channel, tag;
    channel = arguments[0];
    tag = arguments[1];
    if (fm.global.equals(tag, null)) {
      return fm.stringExtensions.format("-1|{0}", channel);
    }
    return fm.stringExtensions.format("{0}|{1}{2}", fm.intExtensions.toString(tag.length), tag, channel);
  };

  client.getTimestamp = function() {
    var response;
    response = arguments[0];
    if (!fm.global.equals(response, null)) {
      return response.getTimestamp();
    }
    return null;
  };


  /*<span id='method-fm.websync.client-removeOnBindEnd'>&nbsp;</span> */


  /**
  	 <div>
  	 Removes a handler that is raised after a <see cref="fm.websync.client">fm.websync.client</see> bind ends. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to the client after processing.
  	 </div>
  	@function removeOnBindEnd
  	@param {fm.doubleAction} value
  	@return {void}
   */

  client.removeOnBindEnd = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onBindEnd = fm.delegate.remove(fm.websync.client._onBindEnd, value);
  };


  /*<span id='method-fm.websync.client-removeOnBindRequest'>&nbsp;</span> */


  /**
  	 <div>
  	 Removes a handler that is raised before a <see cref="fm.websync.client">fm.websync.client</see> bind request begins. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to a request before it is sent to the server.
  	 </div>
  	@function removeOnBindRequest
  	@param {fm.doubleAction} value
  	@return {void}
   */

  client.removeOnBindRequest = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onBindRequest = fm.delegate.remove(fm.websync.client._onBindRequest, value);
  };


  /*<span id='method-fm.websync.client-removeOnBindResponse'>&nbsp;</span> */


  /**
  	 <div>
  	 Removes a handler that is raised after a <see cref="fm.websync.client">fm.websync.client</see> bind response returns. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to a response after it is received from the server.
  	 </div>
  	@function removeOnBindResponse
  	@param {fm.doubleAction} value
  	@return {void}
   */

  client.removeOnBindResponse = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onBindResponse = fm.delegate.remove(fm.websync.client._onBindResponse, value);
  };


  /*<span id='method-fm.websync.client-removeOnConnectEnd'>&nbsp;</span> */


  /**
  	 <div>
  	 Removes a handler that is raised after a <see cref="fm.websync.client">fm.websync.client</see> connect ends. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to the client after processing.
  	 </div>
  	@function removeOnConnectEnd
  	@param {fm.doubleAction} value
  	@return {void}
   */

  client.removeOnConnectEnd = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onConnectEnd = fm.delegate.remove(fm.websync.client._onConnectEnd, value);
  };


  /*<span id='method-fm.websync.client-removeOnConnectRequest'>&nbsp;</span> */


  /**
  	 <div>
  	 Removes a handler that is raised before a <see cref="fm.websync.client">fm.websync.client</see> connect request begins. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to a request before it is sent to the server.
  	 </div>
  	@function removeOnConnectRequest
  	@param {fm.doubleAction} value
  	@return {void}
   */

  client.removeOnConnectRequest = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onConnectRequest = fm.delegate.remove(fm.websync.client._onConnectRequest, value);
  };


  /*<span id='method-fm.websync.client-removeOnConnectResponse'>&nbsp;</span> */


  /**
  	 <div>
  	 Removes a handler that is raised after a <see cref="fm.websync.client">fm.websync.client</see> connect response returns. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to a response after it is received from the server.
  	 </div>
  	@function removeOnConnectResponse
  	@param {fm.doubleAction} value
  	@return {void}
   */

  client.removeOnConnectResponse = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onConnectResponse = fm.delegate.remove(fm.websync.client._onConnectResponse, value);
  };


  /*<span id='method-fm.websync.client-removeOnDisconnectEnd'>&nbsp;</span> */


  /**
  	 <div>
  	 Removes a handler that is raised after a <see cref="fm.websync.client">fm.websync.client</see> disconnect ends. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to the client after processing.
  	 </div>
  	@function removeOnDisconnectEnd
  	@param {fm.doubleAction} value
  	@return {void}
   */

  client.removeOnDisconnectEnd = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onDisconnectEnd = fm.delegate.remove(fm.websync.client._onDisconnectEnd, value);
  };


  /*<span id='method-fm.websync.client-removeOnDisconnectRequest'>&nbsp;</span> */


  /**
  	 <div>
  	 Removes a handler that is raised before a <see cref="fm.websync.client">fm.websync.client</see> disconnect request begins. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to a request before it is sent to the server.
  	 </div>
  	@function removeOnDisconnectRequest
  	@param {fm.doubleAction} value
  	@return {void}
   */

  client.removeOnDisconnectRequest = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onDisconnectRequest = fm.delegate.remove(fm.websync.client._onDisconnectRequest, value);
  };


  /*<span id='method-fm.websync.client-removeOnDisconnectResponse'>&nbsp;</span> */


  /**
  	 <div>
  	 Removes a handler that is raised after a <see cref="fm.websync.client">fm.websync.client</see> disconnect response returns. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to a response after it is received from the server.
  	 </div>
  	@function removeOnDisconnectResponse
  	@param {fm.doubleAction} value
  	@return {void}
   */

  client.removeOnDisconnectResponse = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onDisconnectResponse = fm.delegate.remove(fm.websync.client._onDisconnectResponse, value);
  };


  /*<span id='method-fm.websync.client-removeOnNotifyEnd'>&nbsp;</span> */


  /**
  	 <div>
  	 Removes a handler that is raised after a <see cref="fm.websync.client">fm.websync.client</see> notify ends. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to the client after processing.
  	 </div>
  	@function removeOnNotifyEnd
  	@param {fm.doubleAction} value
  	@return {void}
   */

  client.removeOnNotifyEnd = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onNotifyEnd = fm.delegate.remove(fm.websync.client._onNotifyEnd, value);
  };


  /*<span id='method-fm.websync.client-removeOnNotifyRequest'>&nbsp;</span> */


  /**
  	 <div>
  	 Removes a handler that is raised before a <see cref="fm.websync.client">fm.websync.client</see> notify request begins. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to a request before it is sent to the server.
  	 </div>
  	@function removeOnNotifyRequest
  	@param {fm.doubleAction} value
  	@return {void}
   */

  client.removeOnNotifyRequest = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onNotifyRequest = fm.delegate.remove(fm.websync.client._onNotifyRequest, value);
  };


  /*<span id='method-fm.websync.client-removeOnNotifyResponse'>&nbsp;</span> */


  /**
  	 <div>
  	 Removes a handler that is raised after a <see cref="fm.websync.client">fm.websync.client</see> notify response returns. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to a response after it is received from the server.
  	 </div>
  	@function removeOnNotifyResponse
  	@param {fm.doubleAction} value
  	@return {void}
   */

  client.removeOnNotifyResponse = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onNotifyResponse = fm.delegate.remove(fm.websync.client._onNotifyResponse, value);
  };


  /*<span id='method-fm.websync.client-removeOnPublishEnd'>&nbsp;</span> */


  /**
  	 <div>
  	 Removes a handler that is raised after a <see cref="fm.websync.client">fm.websync.client</see> publish ends. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to the client after processing.
  	 </div>
  	@function removeOnPublishEnd
  	@param {fm.doubleAction} value
  	@return {void}
   */

  client.removeOnPublishEnd = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onPublishEnd = fm.delegate.remove(fm.websync.client._onPublishEnd, value);
  };


  /*<span id='method-fm.websync.client-removeOnPublishRequest'>&nbsp;</span> */


  /**
  	 <div>
  	 Removes a handler that is raised before a <see cref="fm.websync.client">fm.websync.client</see> publish request begins. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to a request before it is sent to the server.
  	 </div>
  	@function removeOnPublishRequest
  	@param {fm.doubleAction} value
  	@return {void}
   */

  client.removeOnPublishRequest = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onPublishRequest = fm.delegate.remove(fm.websync.client._onPublishRequest, value);
  };


  /*<span id='method-fm.websync.client-removeOnPublishResponse'>&nbsp;</span> */


  /**
  	 <div>
  	 Removes a handler that is raised after a <see cref="fm.websync.client">fm.websync.client</see> publish response returns. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to a response after it is received from the server.
  	 </div>
  	@function removeOnPublishResponse
  	@param {fm.doubleAction} value
  	@return {void}
   */

  client.removeOnPublishResponse = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onPublishResponse = fm.delegate.remove(fm.websync.client._onPublishResponse, value);
  };


  /*<span id='method-fm.websync.client-removeOnServiceEnd'>&nbsp;</span> */


  /**
  	 <div>
  	 Removes a handler that is raised after a <see cref="fm.websync.client">fm.websync.client</see> service ends. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to the client after processing.
  	 </div>
  	@function removeOnServiceEnd
  	@param {fm.doubleAction} value
  	@return {void}
   */

  client.removeOnServiceEnd = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onServiceEnd = fm.delegate.remove(fm.websync.client._onServiceEnd, value);
  };


  /*<span id='method-fm.websync.client-removeOnServiceRequest'>&nbsp;</span> */


  /**
  	 <div>
  	 Removes a handler that is raised before a <see cref="fm.websync.client">fm.websync.client</see> service request begins. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to a request before it is sent to the server.
  	 </div>
  	@function removeOnServiceRequest
  	@param {fm.doubleAction} value
  	@return {void}
   */

  client.removeOnServiceRequest = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onServiceRequest = fm.delegate.remove(fm.websync.client._onServiceRequest, value);
  };


  /*<span id='method-fm.websync.client-removeOnServiceResponse'>&nbsp;</span> */


  /**
  	 <div>
  	 Removes a handler that is raised after a <see cref="fm.websync.client">fm.websync.client</see> service response returns. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to a response after it is received from the server.
  	 </div>
  	@function removeOnServiceResponse
  	@param {fm.doubleAction} value
  	@return {void}
   */

  client.removeOnServiceResponse = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onServiceResponse = fm.delegate.remove(fm.websync.client._onServiceResponse, value);
  };


  /*<span id='method-fm.websync.client-removeOnSubscribeEnd'>&nbsp;</span> */


  /**
  	 <div>
  	 Removes a handler that is raised after a <see cref="fm.websync.client">fm.websync.client</see> subscribe ends. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to the client after processing.
  	 </div>
  	@function removeOnSubscribeEnd
  	@param {fm.doubleAction} value
  	@return {void}
   */

  client.removeOnSubscribeEnd = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onSubscribeEnd = fm.delegate.remove(fm.websync.client._onSubscribeEnd, value);
  };


  /*<span id='method-fm.websync.client-removeOnSubscribeRequest'>&nbsp;</span> */


  /**
  	 <div>
  	 Removes a handler that is raised before a <see cref="fm.websync.client">fm.websync.client</see> subscribe request begins. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to a request before it is sent to the server.
  	 </div>
  	@function removeOnSubscribeRequest
  	@param {fm.doubleAction} value
  	@return {void}
   */

  client.removeOnSubscribeRequest = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onSubscribeRequest = fm.delegate.remove(fm.websync.client._onSubscribeRequest, value);
  };


  /*<span id='method-fm.websync.client-removeOnSubscribeResponse'>&nbsp;</span> */


  /**
  	 <div>
  	 Removes a handler that is raised after a <see cref="fm.websync.client">fm.websync.client</see> subscribe response returns. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to a response after it is received from the server.
  	 </div>
  	@function removeOnSubscribeResponse
  	@param {fm.doubleAction} value
  	@return {void}
   */

  client.removeOnSubscribeResponse = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onSubscribeResponse = fm.delegate.remove(fm.websync.client._onSubscribeResponse, value);
  };


  /*<span id='method-fm.websync.client-removeOnUnbindEnd'>&nbsp;</span> */


  /**
  	 <div>
  	 Removes a handler that is raised after a <see cref="fm.websync.client">fm.websync.client</see> unbind ends. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to the client after processing.
  	 </div>
  	@function removeOnUnbindEnd
  	@param {fm.doubleAction} value
  	@return {void}
   */

  client.removeOnUnbindEnd = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onUnbindEnd = fm.delegate.remove(fm.websync.client._onUnbindEnd, value);
  };


  /*<span id='method-fm.websync.client-removeOnUnbindRequest'>&nbsp;</span> */


  /**
  	 <div>
  	 Removes a handler that is raised before a <see cref="fm.websync.client">fm.websync.client</see> unbind request begins. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to a request before it is sent to the server.
  	 </div>
  	@function removeOnUnbindRequest
  	@param {fm.doubleAction} value
  	@return {void}
   */

  client.removeOnUnbindRequest = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onUnbindRequest = fm.delegate.remove(fm.websync.client._onUnbindRequest, value);
  };


  /*<span id='method-fm.websync.client-removeOnUnbindResponse'>&nbsp;</span> */


  /**
  	 <div>
  	 Removes a handler that is raised after a <see cref="fm.websync.client">fm.websync.client</see> unbind response returns. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to a response after it is received from the server.
  	 </div>
  	@function removeOnUnbindResponse
  	@param {fm.doubleAction} value
  	@return {void}
   */

  client.removeOnUnbindResponse = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onUnbindResponse = fm.delegate.remove(fm.websync.client._onUnbindResponse, value);
  };


  /*<span id='method-fm.websync.client-removeOnUnsubscribeEnd'>&nbsp;</span> */


  /**
  	 <div>
  	 Removes a handler that is raised after a <see cref="fm.websync.client">fm.websync.client</see> unsubscribe ends. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to the client after processing.
  	 </div>
  	@function removeOnUnsubscribeEnd
  	@param {fm.doubleAction} value
  	@return {void}
   */

  client.removeOnUnsubscribeEnd = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onUnsubscribeEnd = fm.delegate.remove(fm.websync.client._onUnsubscribeEnd, value);
  };


  /*<span id='method-fm.websync.client-removeOnUnsubscribeRequest'>&nbsp;</span> */


  /**
  	 <div>
  	 Removes a handler that is raised before a <see cref="fm.websync.client">fm.websync.client</see> unsubscribe request begins. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to a request before it is sent to the server.
  	 </div>
  	@function removeOnUnsubscribeRequest
  	@param {fm.doubleAction} value
  	@return {void}
   */

  client.removeOnUnsubscribeRequest = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onUnsubscribeRequest = fm.delegate.remove(fm.websync.client._onUnsubscribeRequest, value);
  };


  /*<span id='method-fm.websync.client-removeOnUnsubscribeResponse'>&nbsp;</span> */


  /**
  	 <div>
  	 Removes a handler that is raised after a <see cref="fm.websync.client">fm.websync.client</see> unsubscribe response returns. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to a response after it is received from the server.
  	 </div>
  	@function removeOnUnsubscribeResponse
  	@param {fm.doubleAction} value
  	@return {void}
   */

  client.removeOnUnsubscribeResponse = function() {
    var value;
    value = arguments[0];
    return fm.websync.client._onUnsubscribeResponse = fm.delegate.remove(fm.websync.client._onUnsubscribeResponse, value);
  };

  client.prototype.activateStream = function() {
    var args, connectArgs, responseArgs;
    connectArgs = arguments[0];
    responseArgs = arguments[1];
    this.raiseConnectSuccess(this._connectArgs, this._responseArgs);
    this.raiseConnectComplete(this._connectArgs, this._responseArgs);
    args = new fm.websync.clientConnectEndArgs();
    args.setMethodArgs(connectArgs);
    this.raiseCompleteEvent(fm.websync.client._onConnectEnd, args, "OnConnectEnd", responseArgs);
    this.processQueue(true);
    return this.stream(this._connectArgs, false);
  };

  client.prototype.addBoundRecords = function() {
    var _var0, j, len, record, records, results;
    records = arguments[0];
    _var0 = records;
    results = [];
    for (j = 0, len = _var0.length; j < len; j++) {
      record = _var0[j];
      results.push(this._boundRecords[record.getKey()] = record);
    }
    return results;
  };


  /*<span id='method-fm.websync.client-addOnBindComplete'>&nbsp;</span> */


  /**
  	 <div>
  	 Adds a handler that is raised whenever a client completes a bind, successfully or not.
  	 </div>
  
  	@function addOnBindComplete
  	@param {fm.singleAction} value
  	@return {void}
   */

  client.prototype.addOnBindComplete = function() {
    var value;
    value = arguments[0];
    return this._onBindComplete = fm.delegate.combine(this._onBindComplete, value);
  };


  /*<span id='method-fm.websync.client-addOnBindFailure'>&nbsp;</span> */


  /**
  	 <div>
  	 Adds a handler that is raised whenever a client fails to bind.
  	 </div>
  
  	@function addOnBindFailure
  	@param {fm.singleAction} value
  	@return {void}
   */

  client.prototype.addOnBindFailure = function() {
    var value;
    value = arguments[0];
    return this._onBindFailure = fm.delegate.combine(this._onBindFailure, value);
  };


  /*<span id='method-fm.websync.client-addOnBindSuccess'>&nbsp;</span> */


  /**
  	 <div>
  	 Adds a handler that is raised whenever a client successfully binds.
  	 </div>
  
  	@function addOnBindSuccess
  	@param {fm.singleAction} value
  	@return {void}
   */

  client.prototype.addOnBindSuccess = function() {
    var value;
    value = arguments[0];
    return this._onBindSuccess = fm.delegate.combine(this._onBindSuccess, value);
  };


  /*<span id='method-fm.websync.client-addOnConnectComplete'>&nbsp;</span> */


  /**
  	 <div>
  	 Adds a handler that is raised whenever a client completes a connect, successfully or not.
  	 </div>
  
  	@function addOnConnectComplete
  	@param {fm.singleAction} value
  	@return {void}
   */

  client.prototype.addOnConnectComplete = function() {
    var value;
    value = arguments[0];
    return this._onConnectComplete = fm.delegate.combine(this._onConnectComplete, value);
  };


  /*<span id='method-fm.websync.client-addOnConnectFailure'>&nbsp;</span> */


  /**
  	 <div>
  	 Adds a handler that is raised whenever a client fails to connect.
  	 </div>
  
  	@function addOnConnectFailure
  	@param {fm.singleAction} value
  	@return {void}
   */

  client.prototype.addOnConnectFailure = function() {
    var value;
    value = arguments[0];
    return this._onConnectFailure = fm.delegate.combine(this._onConnectFailure, value);
  };


  /*<span id='method-fm.websync.client-addOnConnectSuccess'>&nbsp;</span> */


  /**
  	 <div>
  	 Adds a handler that is raised whenever a client successfully connects.
  	 </div>
  
  	@function addOnConnectSuccess
  	@param {fm.singleAction} value
  	@return {void}
   */

  client.prototype.addOnConnectSuccess = function() {
    var value;
    value = arguments[0];
    return this._onConnectSuccess = fm.delegate.combine(this._onConnectSuccess, value);
  };


  /*<span id='method-fm.websync.client-addOnDisconnectComplete'>&nbsp;</span> */


  /**
  	 <div>
  	 Adds a handler that is raised whenever a client completes a disconnect.
  	 </div>
  
  	@function addOnDisconnectComplete
  	@param {fm.singleAction} value
  	@return {void}
   */

  client.prototype.addOnDisconnectComplete = function() {
    var value;
    value = arguments[0];
    return this._onDisconnectComplete = fm.delegate.combine(this._onDisconnectComplete, value);
  };


  /*<span id='method-fm.websync.client-addOnNotify'>&nbsp;</span> */


  /**
  	 <div>
  	 Adds a handler that is raised whenever a notification is sent to this client.
  	 </div>
  
  	@function addOnNotify
  	@param {fm.singleAction} value
  	@return {void}
   */

  client.prototype.addOnNotify = function() {
    var value;
    value = arguments[0];
    return this._onNotify = fm.delegate.combine(this._onNotify, value);
  };


  /*<span id='method-fm.websync.client-addOnNotifyComplete'>&nbsp;</span> */


  /**
  	 <div>
  	 Adds a handler that is raised whenever a client completes a notify, successfully or not.
  	 </div>
  
  	@function addOnNotifyComplete
  	@param {fm.singleAction} value
  	@return {void}
   */

  client.prototype.addOnNotifyComplete = function() {
    var value;
    value = arguments[0];
    return this._onNotifyComplete = fm.delegate.combine(this._onNotifyComplete, value);
  };


  /*<span id='method-fm.websync.client-addOnNotifyFailure'>&nbsp;</span> */


  /**
  	 <div>
  	 Adds a handler that is raised whenever a client fails to notify.
  	 </div>
  
  	@function addOnNotifyFailure
  	@param {fm.singleAction} value
  	@return {void}
   */

  client.prototype.addOnNotifyFailure = function() {
    var value;
    value = arguments[0];
    return this._onNotifyFailure = fm.delegate.combine(this._onNotifyFailure, value);
  };


  /*<span id='method-fm.websync.client-addOnNotifySuccess'>&nbsp;</span> */


  /**
  	 <div>
  	 Adds a handler that is raised whenever a client successfully notifies.
  	 </div>
  
  	@function addOnNotifySuccess
  	@param {fm.singleAction} value
  	@return {void}
   */

  client.prototype.addOnNotifySuccess = function() {
    var value;
    value = arguments[0];
    return this._onNotifySuccess = fm.delegate.combine(this._onNotifySuccess, value);
  };


  /*<span id='method-fm.websync.client-addOnPublishComplete'>&nbsp;</span> */


  /**
  	 <div>
  	 Adds a handler that is raised whenever a client completes a publish, successfully or not.
  	 </div>
  
  	@function addOnPublishComplete
  	@param {fm.singleAction} value
  	@return {void}
   */

  client.prototype.addOnPublishComplete = function() {
    var value;
    value = arguments[0];
    return this._onPublishComplete = fm.delegate.combine(this._onPublishComplete, value);
  };


  /*<span id='method-fm.websync.client-addOnPublishFailure'>&nbsp;</span> */


  /**
  	 <div>
  	 Adds a handler that is raised whenever a client fails to publish.
  	 </div>
  
  	@function addOnPublishFailure
  	@param {fm.singleAction} value
  	@return {void}
   */

  client.prototype.addOnPublishFailure = function() {
    var value;
    value = arguments[0];
    return this._onPublishFailure = fm.delegate.combine(this._onPublishFailure, value);
  };


  /*<span id='method-fm.websync.client-addOnPublishSuccess'>&nbsp;</span> */


  /**
  	 <div>
  	 Adds a handler that is raised whenever a client successfully publishes.
  	 </div>
  
  	@function addOnPublishSuccess
  	@param {fm.singleAction} value
  	@return {void}
   */

  client.prototype.addOnPublishSuccess = function() {
    var value;
    value = arguments[0];
    return this._onPublishSuccess = fm.delegate.combine(this._onPublishSuccess, value);
  };


  /*<span id='method-fm.websync.client-addOnServerBind'>&nbsp;</span> */


  /**
  	 <div>
  	 Adds a handler that is raised whenever the server binds
  	 the client to a record or set of records.
  	 </div>
  
  	@function addOnServerBind
  	@param {fm.singleAction} value
  	@return {void}
   */

  client.prototype.addOnServerBind = function() {
    var value;
    value = arguments[0];
    return this._onServerBind = fm.delegate.combine(this._onServerBind, value);
  };


  /*<span id='method-fm.websync.client-addOnServerSubscribe'>&nbsp;</span> */


  /**
  	 <div>
  	 Adds a handler that is raised whenever the server subscribes
  	 the client to a channel or set of channels.
  	 </div>
  
  	@function addOnServerSubscribe
  	@param {fm.singleFunction} value
  	@return {void}
   */

  client.prototype.addOnServerSubscribe = function() {
    var value;
    value = arguments[0];
    return this._onServerSubscribe = fm.delegate.combine(this._onServerSubscribe, value);
  };


  /*<span id='method-fm.websync.client-addOnServerUnbind'>&nbsp;</span> */


  /**
  	 <div>
  	 Adds a handler that is raised whenever the server unbinds
  	 the client from a record or set of records.
  	 </div>
  
  	@function addOnServerUnbind
  	@param {fm.singleAction} value
  	@return {void}
   */

  client.prototype.addOnServerUnbind = function() {
    var value;
    value = arguments[0];
    return this._onServerUnbind = fm.delegate.combine(this._onServerUnbind, value);
  };


  /*<span id='method-fm.websync.client-addOnServerUnsubscribe'>&nbsp;</span> */


  /**
  	 <div>
  	 Adds a handler that is raised whenever the server unsubscribes
  	 the client from a channel or set of channels.
  	 </div>
  
  	@function addOnServerUnsubscribe
  	@param {fm.singleAction} value
  	@return {void}
   */

  client.prototype.addOnServerUnsubscribe = function() {
    var value;
    value = arguments[0];
    return this._onServerUnsubscribe = fm.delegate.combine(this._onServerUnsubscribe, value);
  };


  /*<span id='method-fm.websync.client-addOnServiceComplete'>&nbsp;</span> */


  /**
  	 <div>
  	 Adds a handler that is raised whenever a client completes a service, successfully or not.
  	 </div>
  
  	@function addOnServiceComplete
  	@param {fm.singleAction} value
  	@return {void}
   */

  client.prototype.addOnServiceComplete = function() {
    var value;
    value = arguments[0];
    return this._onServiceComplete = fm.delegate.combine(this._onServiceComplete, value);
  };


  /*<span id='method-fm.websync.client-addOnServiceFailure'>&nbsp;</span> */


  /**
  	 <div>
  	 Adds a handler that is raised whenever a client fails to service.
  	 </div>
  
  	@function addOnServiceFailure
  	@param {fm.singleAction} value
  	@return {void}
   */

  client.prototype.addOnServiceFailure = function() {
    var value;
    value = arguments[0];
    return this._onServiceFailure = fm.delegate.combine(this._onServiceFailure, value);
  };


  /*<span id='method-fm.websync.client-addOnServiceSuccess'>&nbsp;</span> */


  /**
  	 <div>
  	 Adds a handler that is raised whenever a client successfully services.
  	 </div>
  
  	@function addOnServiceSuccess
  	@param {fm.singleAction} value
  	@return {void}
   */

  client.prototype.addOnServiceSuccess = function() {
    var value;
    value = arguments[0];
    return this._onServiceSuccess = fm.delegate.combine(this._onServiceSuccess, value);
  };


  /*<span id='method-fm.websync.client-addOnStateRestored'>&nbsp;</span> */


  /**
  	 <div>
  	 Adds a handler that is raised whenever the client's state is restored after a reconnection.
  	 </div>
  
  	@function addOnStateRestored
  	@param {fm.singleAction} value
  	@return {void}
   */

  client.prototype.addOnStateRestored = function() {
    var value;
    value = arguments[0];
    return this._onStateRestored = fm.delegate.combine(this._onStateRestored, value);
  };


  /*<span id='method-fm.websync.client-addOnStreamFailure'>&nbsp;</span> */


  /**
  	 <div>
  	 Adds a handler that is raised whenever the client's streaming connection breaks down.
  	 </div>
  
  	@function addOnStreamFailure
  	@param {fm.singleAction} value
  	@return {void}
   */

  client.prototype.addOnStreamFailure = function() {
    var value;
    value = arguments[0];
    return this._onStreamFailure = fm.delegate.combine(this._onStreamFailure, value);
  };


  /*<span id='method-fm.websync.client-addOnSubscribeComplete'>&nbsp;</span> */


  /**
  	 <div>
  	 Adds a handler that is raised whenever a client completes a subscribe, successfully or not.
  	 </div>
  
  	@function addOnSubscribeComplete
  	@param {fm.singleAction} value
  	@return {void}
   */

  client.prototype.addOnSubscribeComplete = function() {
    var value;
    value = arguments[0];
    return this._onSubscribeComplete = fm.delegate.combine(this._onSubscribeComplete, value);
  };


  /*<span id='method-fm.websync.client-addOnSubscribeFailure'>&nbsp;</span> */


  /**
  	 <div>
  	 Adds a handler that is raised whenever a client fails to subscribe.
  	 </div>
  
  	@function addOnSubscribeFailure
  	@param {fm.singleAction} value
  	@return {void}
   */

  client.prototype.addOnSubscribeFailure = function() {
    var value;
    value = arguments[0];
    return this._onSubscribeFailure = fm.delegate.combine(this._onSubscribeFailure, value);
  };


  /*<span id='method-fm.websync.client-addOnSubscribeSuccess'>&nbsp;</span> */


  /**
  	 <div>
  	 Adds a handler that is raised whenever a client successfully subscribes.
  	 </div>
  
  	@function addOnSubscribeSuccess
  	@param {fm.singleAction} value
  	@return {void}
   */

  client.prototype.addOnSubscribeSuccess = function() {
    var value;
    value = arguments[0];
    return this._onSubscribeSuccess = fm.delegate.combine(this._onSubscribeSuccess, value);
  };


  /*<span id='method-fm.websync.client-addOnUnbindComplete'>&nbsp;</span> */


  /**
  	 <div>
  	 Adds a handler that is raised whenever a client completes an unbind, successfully or not.
  	 </div>
  
  	@function addOnUnbindComplete
  	@param {fm.singleAction} value
  	@return {void}
   */

  client.prototype.addOnUnbindComplete = function() {
    var value;
    value = arguments[0];
    return this._onUnbindComplete = fm.delegate.combine(this._onUnbindComplete, value);
  };


  /*<span id='method-fm.websync.client-addOnUnbindFailure'>&nbsp;</span> */


  /**
  	 <div>
  	 Adds a handler that is raised whenever a client fails to unbind.
  	 </div>
  
  	@function addOnUnbindFailure
  	@param {fm.singleAction} value
  	@return {void}
   */

  client.prototype.addOnUnbindFailure = function() {
    var value;
    value = arguments[0];
    return this._onUnbindFailure = fm.delegate.combine(this._onUnbindFailure, value);
  };


  /*<span id='method-fm.websync.client-addOnUnbindSuccess'>&nbsp;</span> */


  /**
  	 <div>
  	 Adds a handler that is raised whenever a client successfully unbinds.
  	 </div>
  
  	@function addOnUnbindSuccess
  	@param {fm.singleAction} value
  	@return {void}
   */

  client.prototype.addOnUnbindSuccess = function() {
    var value;
    value = arguments[0];
    return this._onUnbindSuccess = fm.delegate.combine(this._onUnbindSuccess, value);
  };


  /*<span id='method-fm.websync.client-addOnUnsubscribeComplete'>&nbsp;</span> */


  /**
  	 <div>
  	 Adds a handler that is raised whenever a client completes an unsubscribe, successfully or not.
  	 </div>
  
  	@function addOnUnsubscribeComplete
  	@param {fm.singleAction} value
  	@return {void}
   */

  client.prototype.addOnUnsubscribeComplete = function() {
    var value;
    value = arguments[0];
    return this._onUnsubscribeComplete = fm.delegate.combine(this._onUnsubscribeComplete, value);
  };


  /*<span id='method-fm.websync.client-addOnUnsubscribeFailure'>&nbsp;</span> */


  /**
  	 <div>
  	 Adds a handler that is raised whenever a client fails to unsubscribe.
  	 </div>
  
  	@function addOnUnsubscribeFailure
  	@param {fm.singleAction} value
  	@return {void}
   */

  client.prototype.addOnUnsubscribeFailure = function() {
    var value;
    value = arguments[0];
    return this._onUnsubscribeFailure = fm.delegate.combine(this._onUnsubscribeFailure, value);
  };


  /*<span id='method-fm.websync.client-addOnUnsubscribeSuccess'>&nbsp;</span> */


  /**
  	 <div>
  	 Adds a handler that is raised whenever a client successfully unsubscribes.
  	 </div>
  
  	@function addOnUnsubscribeSuccess
  	@param {fm.singleAction} value
  	@return {void}
   */

  client.prototype.addOnUnsubscribeSuccess = function() {
    var value;
    value = arguments[0];
    return this._onUnsubscribeSuccess = fm.delegate.combine(this._onUnsubscribeSuccess, value);
  };

  client.prototype.addSubscribedChannels = function() {
    var _var0, _var1, _var2, channels, dictionary, j, len, results, str, tag;
    tag = arguments[0];
    channels = arguments[1];
    dictionary = null;
    _var0 = new fm.holder(dictionary);
    _var1 = fm.hashExtensions.tryGetValue(this._subscribedChannels, tag, _var0);
    dictionary = _var0.getValue();
    if (!_var1) {
      dictionary = {};
      this._subscribedChannels[tag] = dictionary;
    }
    _var2 = channels;
    results = [];
    for (j = 0, len = _var2.length; j < len; j++) {
      str = _var2[j];
      if (!fm.hashExtensions.containsKey(dictionary, str)) {
        results.push(dictionary[str] = new fm.object());
      } else {
        results.push(void 0);
      }
    }
    return results;
  };

  client.prototype.addSubscribedOnReceive = function() {
    var _var0, _var1, _var2, channels, dictionary, dynamicProperties, j, len, onReceive, reconnectAfter, str, tag;
    tag = arguments[0];
    channels = arguments[1];
    onReceive = arguments[2];
    dynamicProperties = arguments[3];
    reconnectAfter = arguments[4];
    dictionary = null;
    _var0 = new fm.holder(dictionary);
    _var1 = fm.hashExtensions.tryGetValue(this._subscribedOnReceives, tag, _var0);
    dictionary = _var0.getValue();
    if (!_var1) {
      dictionary = {};
      this._subscribedOnReceives[tag] = dictionary;
    }
    _var2 = channels;
    for (j = 0, len = _var2.length; j < len; j++) {
      str = _var2[j];
      dictionary[str] = onReceive;
      this._subscribedDynamicProperties[fm.websync.client.getSubscribeKey(str, tag)] = dynamicProperties;
    }
    reconnectAfter = this.processPendingReceives(channels, reconnectAfter);
    return reconnectAfter;
  };

  client.prototype.addToQueue = function() {
    var key, request, synchronous, timeout, url;
    request = arguments[0];
    url = arguments[1];
    synchronous = arguments[2];
    timeout = arguments[3];
    url = url != null ? url : this.getRequestUrl();
    key = fm.stringExtensions.format("{0}|{1}{2}", fm.intExtensions.toString(timeout), (synchronous ? "1" : "0"), url);
    if (!fm.hashExtensions.containsKey(this._requestQueue, key)) {
      this._requestQueue[key] = [];
    }
    return fm.arrayExtensions.add(this._requestQueue[key], request);
  };


  /*<span id='method-fm.websync.client-bind'>&nbsp;</span> */


  /**
  	 <div>
  	 Binds the client to a public or private data record so it is visible to other
  	 clients or just to the server.
  	 </div><div>
  	 <p>
  	 When the bind completes successfully, the OnSuccess callback
  	 will be invoked, passing in the bound record(s),
  	 <b>including any modifications made on the server</b>.
  	 </p>
  	 </div>
  	@function bind
  	@param {fm.websync.bindArgs} bindArgs The bind arguments.
  	 See fm.websync.bindArgs for details.
  	@return {fm.websync.client} The client.
   */

  client.prototype.bind = function() {
    var _var0, bindArgs, j, len, record;
    bindArgs = arguments[0];
    if ((fm.global.equals(bindArgs.getRecords(), null)) || (fm.global.equals(bindArgs.getRecords().length, 0))) {
      throw new Error("records cannot be null.");
    }
    _var0 = bindArgs.getRecords();
    for (j = 0, len = _var0.length; j < len; j++) {
      record = _var0[j];
      if (fm.global.equals(record.getKey(), null)) {
        throw new Error("key cannot be null.");
      }
      if (fm.global.equals(record.getValueJson(), null)) {
        throw new Error("valueJson cannot be null.");
      }
    }
    this.performBind(bindArgs);
    return this;
  };

  client.prototype.checkSynchronous = function() {
    var synchronous;
    synchronous = arguments[0];
    if (synchronous !== null) {
      return synchronous;
    }
    if (this.getSynchronous() !== null) {
      return this.getSynchronous();
    }
    return false;
  };

  client.prototype.clearBoundRecords = function() {
    return fm.hashExtensions.clear(this._boundRecords);
  };

  client.prototype.clearSubscribedChannels = function() {
    fm.hashExtensions.clear(this._subscribedChannels);
    return fm.hashExtensions.clear(this._customOnReceives);
  };


  /*<span id='method-fm.websync.client-connect'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets up and maintains a streaming connection to the server.
  	 </div><div>
  	 <p>
  	 While this method will typically run asychronously, the WebSync client
  	 is designed to be used without (much) consideration for its asynchronous nature.
  	 To that end, any calls to methods that require an active connection, like
  	 bind, subscribe, and publish, will be
  	 queued automatically and executed once this method has completed successfully.
  	 </p>
  	 </div>
  	@function connect
  	@param {fm.websync.connectArgs} connectArgs The connect arguments.
  	 See fm.websync.client.ConnectArgs for details.
  	@return {fm.websync.client} The client.
   */

  client.prototype.connect = function() {
    var connectArgs;
    if (arguments.length === 1) {
      connectArgs = arguments[0];
      this.performConnect(connectArgs);
      return this;
    }
    if (arguments.length === 0) {
      return this.connect(new fm.websync.connectArgs());
    }
  };

  client.prototype.decrementPendingRestoreStateCalls = function() {
    this._pendingRestoreStateCalls--;
    return this._pendingRestoreStateCalls;
  };


  /*<span id='method-fm.websync.client-disconnect'>&nbsp;</span> */


  /**
  	 <div>
  	 Takes down a streaming connection to the server and unsubscribes/unbinds the client.
  	 </div><div>
  	 <p>
  	 After the disconnect completes successfully,
  	 any further calls to methods that require an active connection, like
  	 bind, subscribe, and publish, will be
  	 queued automatically and executed only if/when the client reconnects.
  	 </p>
  	 </div>
  	@function disconnect
  	@param {fm.websync.disconnectArgs} disconnectArgs The disconnect arguments.
  	 See fm.websync.disconnectArgs for details.
  	@return {fm.websync.client} The client.
   */

  client.prototype.disconnect = function() {
    var disconnectArgs;
    if (arguments.length === 0) {
      return this.disconnect(new fm.websync.disconnectArgs());
    }
    if (arguments.length === 1) {
      disconnectArgs = arguments[0];
      this.performDisconnect(disconnectArgs);
      return this;
    }
  };

  client.prototype.doLongPolling = function() {
    this._connectionType = fm.websync.connectionType.LongPolling;
    this._streamRequestTransfer = fm.websync.messageTransferFactory.getHttpMessageTransfer();
    return this.activateStream(this._connectArgs, this._responseArgs);
  };


  /*<span id='method-fm.websync.client-endBatch'>&nbsp;</span> */


  /**
  	 <div>
  	 Flags the end of a batch of requests and starts sending them to the server.
  	 </div><div>
  	 This is used in conjunction with <see cref="fm.websync.client.startBatch">fm.websync.client.startBatch</see>, which must
  	 be called first to flag the start of a batch of requests to be sent together
  	 to the server. Batching is used to optimize round-trips to the server by
  	 reducing the overhead associated with creating multiple HTTP requests.
  	 </div>
  	@function endBatch
  	@return {fm.websync.client} The client.
   */

  client.prototype.endBatch = function() {
    var flag;
    flag = false;
    this._batchCounter--;
    if (this._batchCounter <= 0) {
      this._batchCounter = 0;
      flag = true;
    }
    if (flag) {
      this.processQueue(false);
    }
    return this;
  };


  /*<span id='method-fm.websync.client-getBoundRecords'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets a collection of all the records to which the client is currently bound.
  	 </div>
  	@function getBoundRecords
  	@return {Object} A collection of all the records to which the client is currently bound
   */

  client.prototype.getBoundRecords = function() {
    var _var0, dictionary, j, len, str;
    dictionary = {};
    _var0 = fm.hashExtensions.getKeys(this._boundRecords);
    for (j = 0, len = _var0.length; j < len; j++) {
      str = _var0[j];
      dictionary[str] = this._boundRecords[str].duplicate();
    }
    return dictionary;
  };


  /*<span id='method-fm.websync.client-getClientId'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the server-generated WebSync client ID. This value is only set if the client is
  	 connected, so reference it only after successfully connecting the client.
  	 </div>
  
  	@function getClientId
  	@return {fm.guid}
   */

  client.prototype.getClientId = function() {
    return this._clientId;
  };


  /*<span id='method-fm.websync.client-getCustomOnReceive'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the callback invoked whenever messages are received on the specified
  	 channel.
  	 </div>
  	@function getCustomOnReceive
  	@param {String} channel The channel over which the messages are being received.
  	@return {fm.singleAction} The callback invoked when a message is received, if a callback
  	 is set; otherwise null.
   */

  client.prototype.getCustomOnReceive = function() {
    var channel;
    channel = arguments[0];
    return this.getCustomOnReceiveWithTag(channel, fm.stringExtensions.empty);
  };


  /*<span id='method-fm.websync.client-getCustomOnReceiveWithTag'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the callback invoked whenever messages are received on the specified
  	 channel.  The tag denotes a specific callback.
  	 </div>
  	@function getCustomOnReceiveWithTag
  	@param {String} channel The channel over which the messages are being received.
  	@param {String} tag The identifier for the callback.
  	@return {fm.singleAction} The callback invoked when a message is received, if a callback
  	 is set; otherwise null.
   */

  client.prototype.getCustomOnReceiveWithTag = function() {
    var _var0, _var1, _var2, _var3, action, channel, dictionary, tag;
    channel = arguments[0];
    tag = arguments[1];
    if (fm.global.equals(channel, null)) {
      throw new Error("channel cannot be null.");
    }
    if (fm.global.equals(tag, null)) {
      tag = fm.stringExtensions.empty;
    }
    action = null;
    dictionary = null;
    _var0 = new fm.holder(dictionary);
    _var1 = fm.hashExtensions.tryGetValue(this._customOnReceives, tag, _var0);
    dictionary = _var0.getValue();
    if (!_var1) {
      return action;
    }
    _var2 = new fm.holder(action);
    _var3 = fm.hashExtensions.tryGetValue(dictionary, channel, _var2);
    action = _var2.getValue();
    if (!_var3) {
      action = null;
    }
    return action;
  };


  /*<span id='method-fm.websync.client-getDisableWebSockets'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets whether to disable WebSocket protocol support and use long-polling,
  	 even if the server is capable of accepting WebSocket requests.
  	 </div>
  
  	@function getDisableWebSockets
  	@return {Boolean}
   */

  client.prototype.getDisableWebSockets = function() {
    return this._disableWebSockets;
  };


  /*<span id='method-fm.websync.client-getInstanceId'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets a locally-generated instance ID. This value is set immediately upon construction,
  	 is local-only, and does not change for the duration of this client instance, unless overriden
  	 by application code.
  	 </div>
  
  	@function getInstanceId
  	@return {fm.guid}
   */

  client.prototype.getInstanceId = function() {
    return this._instanceId;
  };


  /*<span id='method-fm.websync.client-getIsConnected'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets whether the client is currently connected.
  	 </div>
  
  	@function getIsConnected
  	@return {Boolean}
   */

  client.prototype.getIsConnected = function() {
    return this._isConnected;
  };


  /*<span id='method-fm.websync.client-getIsConnecting'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets whether the client is currently connecting.
  	 </div>
  
  	@function getIsConnecting
  	@return {Boolean}
   */

  client.prototype.getIsConnecting = function() {
    return this._isConnecting;
  };


  /*<span id='method-fm.websync.client-getIsDisconnecting'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets whether the client is currently disconnecting.
  	 </div>
  
  	@function getIsDisconnecting
  	@return {Boolean}
   */

  client.prototype.getIsDisconnecting = function() {
    return this._isDisconnecting;
  };


  /*<span id='method-fm.websync.client-getServerTimeout'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the number of milliseconds before the server takes action to discover
  	 if this client is idling or still active.
  	 </div>
  
  	@function getServerTimeout
  	@return {Integer}
   */

  client.prototype.getServerTimeout = function() {
    return this._serverTimeout;
  };


  /*<span id='method-fm.websync.client-getSessionId'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the server-generated WebSync session ID. This value is only set if the client is
  	 connected.
  	 </div>
  
  	@function getSessionId
  	@return {fm.guid}
   */

  client.prototype.getSessionId = function() {
    return this._sessionId;
  };


  /*<span id='method-fm.websync.client-getStreamRequestTimeout'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the number of milliseconds to wait for a stream request to
  	 return a response before it is aborted and another stream request is attempted.
  	 </div>
  
  	@function getStreamRequestTimeout
  	@return {Integer}
   */

  client.prototype.getStreamRequestTimeout = function() {
    return this.getRequestTimeout() + this.getServerTimeout();
  };


  /*<span id='method-fm.websync.client-getStreamRequestUrl'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the absolute URL of the WebSync request handler for streaming connections, typically
  	 ending with websync.ashx.
  	 </div>
  
  	@function getStreamRequestUrl
  	@return {String}
   */

  client.prototype.getStreamRequestUrl = function() {
    return this.__streamRequestUrl;
  };


  /*<span id='method-fm.websync.client-getSubscribedChannels'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets a list of all the channels to which the client is currently subscribed.
  	 </div>
  	@function getSubscribedChannels
  	@param {String} tag The subscription tag identifier.
  	@return {fm.array} 
  	 A list of all the channels to which the client is currently subscribed
   */

  client.prototype.getSubscribedChannels = function() {
    var _var0, _var1, _var2, dictionary, j, k, l, len, len1, len2, list, str, str2, tag;
    if (arguments.length === 1) {
      tag = arguments[0];
      list = [];
      dictionary = null;
      _var0 = new fm.holder(dictionary);
      _var1 = fm.hashExtensions.tryGetValue(this._subscribedChannels, tag, _var0);
      dictionary = _var0.getValue();
      if (!_var1) {
        dictionary = null;
      }
      if (!fm.global.equals(dictionary, null)) {
        _var2 = fm.hashExtensions.getKeys(dictionary);
        for (j = 0, len = _var2.length; j < len; j++) {
          str = _var2[j];
          fm.arrayExtensions.add(list, str);
        }
      }
      return fm.arrayExtensions.toArray(list);
    }
    if (arguments.length === 0) {
      list = [];
      _var0 = fm.hashExtensions.getKeys(this._subscribedChannels);
      for (k = 0, len1 = _var0.length; k < len1; k++) {
        str = _var0[k];
        _var1 = fm.hashExtensions.getKeys(this._subscribedChannels[str]);
        for (l = 0, len2 = _var1.length; l < len2; l++) {
          str2 = _var1[l];
          fm.arrayExtensions.add(list, str2);
        }
      }
      return fm.arrayExtensions.toArray(list);
    }
  };


  /*<span id='method-fm.websync.client-getSynchronous'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets whether or not to execute client methods synchronously. This approach is not
  	 recommended for UI threads, as it will block until the request completes.
  	 Defaults to <c>false</c>.
  	 </div>
  
  	@function getSynchronous
  	@return {fm.nullable}
   */

  client.prototype.getSynchronous = function() {
    return this._synchronous;
  };

  client.prototype.getThreadId = function() {
    return fm.managedThread.currentThreadId();
  };


  /*<span id='method-fm.websync.client-getToken'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the token sent with each request for load balancing purposes.
  	 </div>
  
  	@function getToken
  	@return {String}
   */

  client.prototype.getToken = function() {
    return this._token;
  };


  /*<span id='method-fm.websync.client-inBatch'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets whether or not requests are currently being batched.
  	 </div>
  	@function inBatch
  	@return {Boolean} true if requests are being batched; otherwise false.
   */

  client.prototype.inBatch = function() {
    return this._batchCounter > 0;
  };

  client.prototype.inCallback = function() {
    var threadId;
    threadId = this.getThreadId();
    return fm.hashExtensions.containsKey(this._threadCounters, threadId) && (this._threadCounters[threadId] > 0);
  };

  client.prototype.maybeRaiseStateRestored = function() {
    var connectArgs;
    if (fm.global.equals(this.decrementPendingRestoreStateCalls(), 0)) {
      connectArgs = this._connectArgs;
      if (!fm.global.equals(connectArgs, null)) {
        return this.raiseStateRestored(connectArgs);
      }
    }
  };


  /*<span id='method-fm.websync.client-notify'>&nbsp;</span> */


  /**
  	 <div>
  	 Sends data to a specified client ID.
  	 </div><div>
  	 When the notify completes successfully, the OnSuccess callback
  	 will be invoked, passing in the
  	 channel and published data, <b>including any modifications made on the server</b>.
  	 </div>
  	@function notify
  	@param {fm.websync.notifyArgs} notifyArgs The notify arguments.
  	 See fm.websync.notifyArgs for more details.
  	@return {fm.websync.client} The client.
   */

  client.prototype.notify = function() {
    var notifyArgs;
    notifyArgs = arguments[0];
    if (fm.stringExtensions.isNullOrEmpty(notifyArgs.getDataJson())) {
      throw new Error("dataJson cannot be null.");
    }
    this.performNotify(notifyArgs);
    return this;
  };

  client.prototype.performBind = function() {
    var args, bindArgs, message, request, request2, synchronous;
    bindArgs = arguments[0];
    if (!(bindArgs.getAutoRebind() !== null)) {
      bindArgs.setAutoRebind(!this.inCallback());
    }
    args = new fm.websync.clientBindRequestArgs();
    args.setMethodArgs(bindArgs);
    if (this.raiseRequestEvent(fm.websync.client._onBindRequest, args, "OnBindRequest")) {
      synchronous = this.checkSynchronous(bindArgs.getSynchronous());
      request2 = new fm.websync.clientRequest();
      message = new fm.websync.message("/meta/bind");
      message.setValidate(false);
      message.setRecords(bindArgs.getRecords());
      message.setExtensions(bindArgs.getExtensions());
      request2.setMessage(message);
      request2.setCallback(this.performBindCallback);
      request = request2;
      request.setDynamicValue(fm.websync.client._argsKey, bindArgs);
      this.addToQueue(request, bindArgs.getRequestUrl(), synchronous, (bindArgs.getRequestTimeout() !== null ? bindArgs.getRequestTimeout() : 0));
      return this.processQueue(false);
    }
  };

  client.prototype.performBindCallback = function() {
    var _var0, args, args2, args3, dynamicValue, flag, j, len, record, responseArgs;
    responseArgs = arguments[0];
    dynamicValue = responseArgs.getDynamicValue(fm.websync.client._argsKey);
    args = new fm.websync.clientBindResponseArgs();
    args.setMethodArgs(dynamicValue);
    this.raiseResponseEvent(fm.websync.client._onBindResponse, args, "OnBindResponse", responseArgs);
    if (!fm.global.equals(responseArgs.getException(), null)) {
      flag = this.raiseBindFailure(dynamicValue, responseArgs, false);
      this.raiseBindComplete(dynamicValue, responseArgs);
      args2 = new fm.websync.clientBindEndArgs();
      args2.setMethodArgs(dynamicValue);
      this.raiseCompleteEvent(fm.websync.client._onBindEnd, args2, "OnBindEnd", responseArgs);
      if (flag) {
        dynamicValue.setIsRetry(true);
        return this.bind(dynamicValue);
      } else {
        if (dynamicValue.getIsRebind()) {
          return this.maybeRaiseStateRestored();
        }
      }
    } else {
      if (fm.global.equals(dynamicValue.getAutoRebind(), true)) {
        fm.arrayExtensions.add(this._reconnectCache, dynamicValue);
        _var0 = responseArgs.getResponse().getRecords();
        for (j = 0, len = _var0.length; j < len; j++) {
          record = _var0[j];
          this._rebindCache[record.getKey()] = dynamicValue;
        }
      }
      this.addBoundRecords(responseArgs.getResponse().getRecords());
      this.raiseBindSuccess(dynamicValue, responseArgs);
      this.raiseBindComplete(dynamicValue, responseArgs);
      args3 = new fm.websync.clientBindEndArgs();
      args3.setMethodArgs(dynamicValue);
      this.raiseCompleteEvent(fm.websync.client._onBindEnd, args3, "OnBindEnd", responseArgs);
      if (dynamicValue.getIsRebind()) {
        return this.maybeRaiseStateRestored();
      }
    }
  };

  client.prototype.performConnect = function() {
    var args, args2, args4, args5, connectArgs, list, message, message2, request, request2, responseArgs, str, synchronous;
    connectArgs = arguments[0];
    args5 = new fm.websync.clientConnectRequestArgs();
    args5.setMethodArgs(connectArgs);
    if (this.raiseRequestEvent(fm.websync.client._onConnectRequest, args5, "OnConnectRequest")) {
      if (this._disconnectCalled && (connectArgs.getIsRetry() || connectArgs.getIsReconnect())) {
        return;
      }
      this._disconnectCalled = false;
      if (this.getIsConnecting() || this.getIsConnected()) {
        str = (this.getIsConnecting() ? "Client is already connecting." : "Client is already connected.");
        args2 = new fm.websync.clientResponseArgs();
        args2.setDynamicProperties(connectArgs.getDynamicProperties());
        message = new fm.websync.message("/meta/handshake");
        message.setExtensions(connectArgs.getExtensions());
        message.setTimestamp(fm.dateTime.getUtcNow());
        message.setSuccessful(false);
        message.setError(str);
        args2.setResponse(message);
        args2.setException(new Error(str));
        responseArgs = args2;
        args = new fm.websync.clientConnectResponseArgs();
        args.setMethodArgs(connectArgs);
        this.raiseResponseEvent(fm.websync.client._onConnectResponse, args, "OnConnectResponse", responseArgs);
        this.raiseConnectFailure(connectArgs, responseArgs, false);
        this.raiseConnectComplete(connectArgs, responseArgs);
        args4 = new fm.websync.clientConnectEndArgs();
        args4.setMethodArgs(connectArgs);
        this.raiseCompleteEvent(fm.websync.client._onConnectEnd, args4, "OnConnectEnd", responseArgs);
        return;
      }
      this.setIsConnecting(true);
      this._connectArgs = connectArgs;
      list = [];
      if (!this.getDisableWebSockets()) {
        fm.arrayExtensions.add(list, fm.websync.connectionType.WebSocket);
      }
      fm.arrayExtensions.add(list, fm.websync.connectionType.LongPolling);
      this._supportedConnectionTypes = fm.arrayExtensions.toArray(list);
      synchronous = this.checkSynchronous(connectArgs.getSynchronous());
      request2 = new fm.websync.clientRequest();
      message2 = new fm.websync.message("/meta/handshake");
      message2.setVersion(fm.websync.client._bayeuxVersion);
      message2.setMinimumVersion(fm.websync.client._bayeuxMinimumVersion);
      message2.setSupportedConnectionTypes(this._supportedConnectionTypes);
      message2.setExtensions(connectArgs.getExtensions());
      request2.setMessage(message2);
      request2.setCallback(this.performConnectCallback);
      request = request2;
      if ((connectArgs.getLastClientId() !== null) && (connectArgs.getLastSessionId() !== null)) {
        request.getMessage().setLastClientId(connectArgs.getLastClientId());
        request.getMessage().setLastSessionId(connectArgs.getLastSessionId());
      }
      request.setDynamicValue(fm.websync.client._argsKey, connectArgs);
      return this.send(request, connectArgs.getRequestUrl(), synchronous, (connectArgs.getRequestTimeout() !== null ? connectArgs.getRequestTimeout() : 0));
    }
  };

  client.prototype.performConnectCallback = function() {
    var _var0, _var1, args, args2, args3, args6, args7, args8, bindArgs, dynamicValue, extensible, i, index, j, k, len, len1, list, message, responseArgs, retry, serverTimeout, sessionId, state, str, subscribeArgs, timeout, type;
    responseArgs = arguments[0];
    dynamicValue = responseArgs.getDynamicValue(fm.websync.client._argsKey);
    args = new fm.websync.clientConnectResponseArgs();
    args.setMethodArgs(dynamicValue);
    this.raiseResponseEvent(fm.websync.client._onConnectResponse, args, "OnConnectResponse", responseArgs);
    if (fm.global.equals(responseArgs.getException(), null)) {
      this.setClientId(responseArgs.getResponse().getClientId());
      sessionId = responseArgs.getResponse().getSessionId();
      if (sessionId !== null) {
        this.setSessionId(sessionId);
      }
      serverTimeout = responseArgs.getResponse().getServerTimeout();
      if (serverTimeout !== null) {
        this.setServerTimeout(serverTimeout);
      } else {
        this.setServerTimeout(25000);
      }
      index = 2147483647;
      _var0 = responseArgs.getResponse().getSupportedConnectionTypes();
      for (j = 0, len = _var0.length; j < len; j++) {
        type = _var0[j];
        i = 0;
        while (i < this._supportedConnectionTypes.length) {
          try {
            if (fm.global.equals(this._supportedConnectionTypes[i], type)) {
              if (i < index) {
                index = i;
              }
              break;
            }
          } finally {
            i++;
          }
        }
      }
      if ((index < 0) || (index > this._supportedConnectionTypes.length)) {
        responseArgs.setException(new Error("Could not negotiate a connection type with the server."));
      } else {
        this._connectionType = this._supportedConnectionTypes[index];
      }
    }
    if (fm.global.equals(responseArgs.getException(), null)) {
      this._lastBackoffIndex = -1;
      this._lastBackoffTimeout = 0;
      list = [];
      fm.arrayExtensions.addRange(list, this._reconnectCache);
      fm.arrayExtensions.clear(this._reconnectCache);
      fm.hashExtensions.clear(this._rebindCache);
      fm.hashExtensions.clear(this._resubscribeCache);
      this._pendingRestoreStateCalls = fm.arrayExtensions.getCount(list);
      _var1 = list;
      for (k = 0, len1 = _var1.length; k < len1; k++) {
        extensible = _var1[k];
        bindArgs = fm.global.tryCast(extensible, fm.websync.bindArgs);
        if (!fm.global.equals(bindArgs, null)) {
          bindArgs.setIsRetry(false);
          bindArgs.setIsRebind(true);
          this.bind(bindArgs);
        } else {
          subscribeArgs = fm.global.tryCast(extensible, fm.websync.subscribeArgs);
          if (!fm.global.equals(subscribeArgs, null)) {
            subscribeArgs.setIsRetry(false);
            subscribeArgs.setIsResubscribe(true);
            this.subscribe(subscribeArgs);
            continue;
          }
        }
      }
      this.setIsConnecting(false);
      this.setIsConnected(true);
      if (this._disconnectCalled) {
        this.disconnect();
        if (!(dynamicValue.getIsRetry() || dynamicValue.getIsReconnect())) {
          str = "Client was disconnected while connecting.";
          args6 = new fm.websync.clientResponseArgs();
          args6.setDynamicProperties(dynamicValue.getDynamicProperties());
          message = new fm.websync.message("/meta/handshake");
          message.setExtensions(dynamicValue.getExtensions());
          message.setTimestamp(fm.dateTime.getUtcNow());
          message.setSuccessful(false);
          message.setError(str);
          args6.setResponse(message);
          args6.setException(new Error(str));
          responseArgs = args6;
          args7 = new fm.websync.clientConnectResponseArgs();
          args7.setMethodArgs(dynamicValue);
          this.raiseResponseEvent(fm.websync.client._onConnectResponse, args7, "OnConnectResponse", responseArgs);
          this.raiseConnectFailure(dynamicValue, responseArgs, false);
          this.raiseConnectComplete(dynamicValue, responseArgs);
          args8 = new fm.websync.clientConnectEndArgs();
          args8.setMethodArgs(dynamicValue);
          this.raiseCompleteEvent(fm.websync.client._onConnectEnd, args8, "OnConnectEnd", responseArgs);
        }
        return;
      }
      this._responseArgs = responseArgs;
      if ((fm.global.equals(this._connectionType, fm.websync.connectionType.WebSocket)) && !this.getDisableWebSockets()) {
        if (!this.tryWebSocket()) {
          return this.doLongPolling();
        }
      } else {
        return this.doLongPolling();
      }
    } else {
      this.setIsConnecting(false);
      if (this._disconnectCalled && (dynamicValue.getIsRetry() || dynamicValue.getIsReconnect())) {
        return;
      }
      retry = false;
      switch (dynamicValue.getRetryMode()) {
        case fm.websync.connectRetryMode.Aggressive:
          retry = true;
          break;
        case fm.websync.connectRetryMode.Intelligent:
          retry = (responseArgs.getErrorCode() < 800) || (responseArgs.getErrorCode() > 899);
          break;
      }
      retry = this.raiseConnectFailure(dynamicValue, responseArgs, retry);
      this.raiseConnectComplete(dynamicValue, responseArgs);
      args3 = new fm.websync.clientConnectEndArgs();
      args3.setMethodArgs(dynamicValue);
      this.raiseCompleteEvent(fm.websync.client._onConnectEnd, args3, "OnConnectEnd", responseArgs);
      if (retry) {
        timeout = 0;
        if (!fm.global.equals(dynamicValue.getRetryBackoff(), null)) {
          args2 = new fm.websync.backoffArgs();
          args2.setIndex(this._lastBackoffIndex + 1);
          args2.setLastTimeout(this._lastBackoffTimeout);
          timeout = dynamicValue.getRetryBackoff()(args2);
        }
        if (timeout > 0) {
          state = new fm.websync.deferredRetryConnectState();
          state.setConnectArgs(dynamicValue);
          state.setBackoffTimeout(timeout);
          return fm.deferrer.defer(this.retryConnectDeferred, timeout, state);
        } else {
          return this.retryConnect(dynamicValue, timeout);
        }
      }
    }
  };

  client.prototype.performDisconnect = function() {
    var args, args2, args3, args4, args5, args6, args7, args8, disconnectArgs, message, message2, message3, request, request2, str, synchronous;
    disconnectArgs = arguments[0];
    args8 = new fm.websync.clientDisconnectRequestArgs();
    args8.setMethodArgs(disconnectArgs);
    if (this.raiseRequestEvent(fm.websync.client._onDisconnectRequest, args8, "OnDisconnectRequest")) {
      this._disconnectCalled = true;
      if (!(this.getIsConnected() && !this.getIsConnecting())) {
        args2 = new fm.websync.clientResponseArgs();
        args2.setDynamicProperties(disconnectArgs.getDynamicProperties());
        message = new fm.websync.message("/meta/handshake");
        message.setExtensions(disconnectArgs.getExtensions());
        message.setTimestamp(fm.dateTime.getUtcNow());
        message.setSuccessful(true);
        args2.setResponse(message);
        args = args2;
        args3 = new fm.websync.clientDisconnectResponseArgs();
        args3.setMethodArgs(disconnectArgs);
        this.raiseResponseEvent(fm.websync.client._onDisconnectResponse, args3, "OnDisconnectResponse", args);
        this.raiseDisconnectComplete(disconnectArgs, args);
        args4 = new fm.websync.clientDisconnectEndArgs();
        args4.setMethodArgs(disconnectArgs);
        this.raiseCompleteEvent(fm.websync.client._onDisconnectEnd, args4, "OnDisconnectEnd", args);
        return;
      }
      if (this.getIsDisconnecting()) {
        str = "Client is already disconnecting.";
        args5 = new fm.websync.clientResponseArgs();
        args5.setDynamicProperties(disconnectArgs.getDynamicProperties());
        message2 = new fm.websync.message("/meta/handshake");
        message2.setExtensions(disconnectArgs.getExtensions());
        message2.setTimestamp(fm.dateTime.getUtcNow());
        message2.setSuccessful(false);
        message2.setError(str);
        args5.setResponse(message2);
        args5.setException(new Error(str));
        args = args5;
        args6 = new fm.websync.clientDisconnectResponseArgs();
        args6.setMethodArgs(disconnectArgs);
        this.raiseResponseEvent(fm.websync.client._onDisconnectResponse, args6, "OnDisconnectResponse", args);
        this.raiseDisconnectComplete(disconnectArgs, args);
        args7 = new fm.websync.clientDisconnectEndArgs();
        args7.setMethodArgs(disconnectArgs);
        this.raiseCompleteEvent(fm.websync.client._onDisconnectEnd, args7, "OnDisconnectEnd", args);
        return;
      }
      this.setIsDisconnecting(true);
      synchronous = this.checkSynchronous(disconnectArgs.getSynchronous());
      request2 = new fm.websync.clientRequest();
      message3 = new fm.websync.message("/meta/disconnect");
      message3.setExtensions(disconnectArgs.getExtensions());
      request2.setMessage(message3);
      request2.setCallback(this.performDisconnectCallback);
      request = request2;
      request.setDynamicValue(fm.websync.client._argsKey, disconnectArgs);
      this.addToQueue(request, disconnectArgs.getRequestUrl(), synchronous, (disconnectArgs.getRequestTimeout() !== null ? disconnectArgs.getRequestTimeout() : 0));
      return this.processQueue(false);
    }
  };

  client.prototype.performDisconnectCallback = function() {
    var args, args3, dynamicValue, error, exception1, responseArgs;
    responseArgs = arguments[0];
    dynamicValue = responseArgs.getDynamicValue(fm.websync.client._argsKey);
    args = new fm.websync.clientDisconnectResponseArgs();
    args.setMethodArgs(dynamicValue);
    this.raiseResponseEvent(fm.websync.client._onDisconnectResponse, args, "OnDisconnectResponse", responseArgs);
    this.raiseForcedUnsubscribes(dynamicValue, responseArgs);
    this.raiseForcedUnbinds(dynamicValue, responseArgs);
    this.clearBoundRecords();
    this.clearSubscribedChannels();
    this.setIsDisconnecting(false);
    this.setIsConnected(false);
    this._webSocketOpened = false;
    try {
      if (!fm.global.equals(this._requestTransfer, null)) {
        this._requestTransfer.shutdown();
      }
      if (!fm.global.equals(this._streamRequestTransfer, null)) {
        this._streamRequestTransfer.shutdown();
      }
    } catch (error) {
      exception1 = error;
    } finally {

    }
    this.raiseDisconnectComplete(dynamicValue, responseArgs);
    this._queueActivated = false;
    args3 = new fm.websync.clientDisconnectEndArgs();
    args3.setMethodArgs(dynamicValue);
    return this.raiseCompleteEvent(fm.websync.client._onDisconnectEnd, args3, "OnDisconnectEnd", responseArgs);
  };

  client.prototype.performNotify = function() {
    var args, message, notifyArgs, request, request2, synchronous;
    notifyArgs = arguments[0];
    args = new fm.websync.clientNotifyRequestArgs();
    args.setMethodArgs(notifyArgs);
    if (this.raiseRequestEvent(fm.websync.client._onNotifyRequest, args, "OnNotifyRequest")) {
      synchronous = this.checkSynchronous(notifyArgs.getSynchronous());
      request2 = new fm.websync.clientRequest();
      message = new fm.websync.message("/meta/notify");
      message.setValidate(false);
      message.setDataJson(notifyArgs.getDataJson());
      message.setExtensions(notifyArgs.getExtensions());
      request2.setMessage(message);
      request2.setCallback(this.performNotifyCallback);
      request = request2;
      request.setDynamicValue(fm.websync.client._argsKey, notifyArgs);
      this.addToQueue(request, notifyArgs.getRequestUrl(), synchronous, (notifyArgs.getRequestTimeout() !== null ? notifyArgs.getRequestTimeout() : 0));
      return this.processQueue(false);
    }
  };

  client.prototype.performNotifyCallback = function() {
    var args, args2, args3, dynamicValue, flag, responseArgs;
    responseArgs = arguments[0];
    dynamicValue = responseArgs.getDynamicValue(fm.websync.client._argsKey);
    args = new fm.websync.clientNotifyResponseArgs();
    args.setMethodArgs(dynamicValue);
    this.raiseResponseEvent(fm.websync.client._onNotifyResponse, args, "OnNotifyResponse", responseArgs);
    if (!fm.global.equals(responseArgs.getException(), null)) {
      flag = this.raiseNotifyFailure(dynamicValue, responseArgs, false);
      this.raiseNotifyComplete(dynamicValue, responseArgs);
      args2 = new fm.websync.clientNotifyEndArgs();
      args2.setMethodArgs(dynamicValue);
      this.raiseCompleteEvent(fm.websync.client._onNotifyEnd, args2, "OnNotifyEnd", responseArgs);
      if (flag) {
        dynamicValue.setIsRetry(true);
        return this.notify(dynamicValue);
      }
    } else {
      this.raiseNotifySuccess(dynamicValue, responseArgs);
      this.raiseNotifyComplete(dynamicValue, responseArgs);
      args3 = new fm.websync.clientNotifyEndArgs();
      args3.setMethodArgs(dynamicValue);
      return this.raiseCompleteEvent(fm.websync.client._onNotifyEnd, args3, "OnNotifyEnd", responseArgs);
    }
  };

  client.prototype.performPublish = function() {
    var args, message, publishArgs, request, request2, synchronous;
    publishArgs = arguments[0];
    args = new fm.websync.clientPublishRequestArgs();
    args.setMethodArgs(publishArgs);
    if (this.raiseRequestEvent(fm.websync.client._onPublishRequest, args, "OnPublishRequest")) {
      synchronous = this.checkSynchronous(publishArgs.getSynchronous());
      request2 = new fm.websync.clientRequest();
      message = new fm.websync.message(publishArgs.getChannel());
      message.setValidate(false);
      message.setDataJson(publishArgs.getDataJson());
      message.setExtensions(publishArgs.getExtensions());
      request2.setMessage(message);
      request2.setCallback(this.performPublishCallback);
      request = request2;
      request.setDynamicValue(fm.websync.client._argsKey, publishArgs);
      this.addToQueue(request, publishArgs.getRequestUrl(), synchronous, (publishArgs.getRequestTimeout() !== null ? publishArgs.getRequestTimeout() : 0));
      return this.processQueue(false);
    }
  };

  client.prototype.performPublishCallback = function() {
    var args, args2, args3, dynamicValue, flag, responseArgs;
    responseArgs = arguments[0];
    dynamicValue = responseArgs.getDynamicValue(fm.websync.client._argsKey);
    args = new fm.websync.clientPublishResponseArgs();
    args.setMethodArgs(dynamicValue);
    this.raiseResponseEvent(fm.websync.client._onPublishResponse, args, "OnPublishResponse", responseArgs);
    if (!fm.global.equals(responseArgs.getException(), null)) {
      flag = this.raisePublishFailure(dynamicValue, responseArgs, false);
      this.raisePublishComplete(dynamicValue, responseArgs);
      args2 = new fm.websync.clientPublishEndArgs();
      args2.setMethodArgs(dynamicValue);
      this.raiseCompleteEvent(fm.websync.client._onPublishEnd, args2, "OnPublishEnd", responseArgs);
      if (flag) {
        dynamicValue.setIsRetry(true);
        return this.publish(dynamicValue);
      }
    } else {
      this.raisePublishSuccess(dynamicValue, responseArgs);
      this.raisePublishComplete(dynamicValue, responseArgs);
      args3 = new fm.websync.clientPublishEndArgs();
      args3.setMethodArgs(dynamicValue);
      return this.raiseCompleteEvent(fm.websync.client._onPublishEnd, args3, "OnPublishEnd", responseArgs);
    }
  };

  client.prototype.performService = function() {
    var args, message, request, request2, serviceArgs, synchronous;
    serviceArgs = arguments[0];
    args = new fm.websync.clientServiceRequestArgs();
    args.setMethodArgs(serviceArgs);
    if (this.raiseRequestEvent(fm.websync.client._onServiceRequest, args, "OnServiceRequest")) {
      synchronous = this.checkSynchronous(serviceArgs.getSynchronous());
      request2 = new fm.websync.clientRequest();
      message = new fm.websync.message(fm.websync.metaChannels.convertChannelToServiced(serviceArgs.getChannel()));
      message.setValidate(false);
      message.setDataJson(serviceArgs.getDataJson());
      message.setExtensions(serviceArgs.getExtensions());
      request2.setMessage(message);
      request2.setCallback(this.performServiceCallback);
      request = request2;
      request.setDynamicValue(fm.websync.client._argsKey, serviceArgs);
      this.addToQueue(request, serviceArgs.getRequestUrl(), synchronous, (serviceArgs.getRequestTimeout() !== null ? serviceArgs.getRequestTimeout() : 0));
      return this.processQueue(false);
    }
  };

  client.prototype.performServiceCallback = function() {
    var args, args2, args3, dynamicValue, flag, responseArgs;
    responseArgs = arguments[0];
    dynamicValue = responseArgs.getDynamicValue(fm.websync.client._argsKey);
    args = new fm.websync.clientServiceResponseArgs();
    args.setMethodArgs(dynamicValue);
    this.raiseResponseEvent(fm.websync.client._onServiceResponse, args, "OnServiceResponse", responseArgs);
    if (!fm.global.equals(responseArgs.getException(), null)) {
      flag = this.raiseServiceFailure(dynamicValue, responseArgs, false);
      this.raiseServiceComplete(dynamicValue, responseArgs);
      args2 = new fm.websync.clientServiceEndArgs();
      args2.setMethodArgs(dynamicValue);
      this.raiseCompleteEvent(fm.websync.client._onServiceEnd, args2, "OnServiceEnd", responseArgs);
      if (flag) {
        dynamicValue.setIsRetry(true);
        return this.service(dynamicValue);
      }
    } else {
      this.raiseServiceSuccess(dynamicValue, responseArgs);
      this.raiseServiceComplete(dynamicValue, responseArgs);
      args3 = new fm.websync.clientServiceEndArgs();
      args3.setMethodArgs(dynamicValue);
      return this.raiseCompleteEvent(fm.websync.client._onServiceEnd, args3, "OnServiceEnd", responseArgs);
    }
  };

  client.prototype.performSubscribe = function() {
    var args, message, request, request2, subscribeArgs, synchronous;
    subscribeArgs = arguments[0];
    if (!(subscribeArgs.getAutoResubscribe() !== null)) {
      subscribeArgs.setAutoResubscribe(!this.inCallback());
    }
    args = new fm.websync.clientSubscribeRequestArgs();
    args.setMethodArgs(subscribeArgs);
    if (this.raiseRequestEvent(fm.websync.client._onSubscribeRequest, args, "OnSubscribeRequest")) {
      synchronous = this.checkSynchronous(subscribeArgs.getSynchronous());
      request2 = new fm.websync.clientRequest();
      message = new fm.websync.message("/meta/subscribe");
      message.setValidate(false);
      message.setChannels(subscribeArgs.getChannels());
      message.setExtensions(subscribeArgs.getExtensions());
      request2.setMessage(message);
      request2.setCallback(this.performSubscribeCallback);
      request = request2;
      request.setDynamicValue(fm.websync.client._argsKey, subscribeArgs);
      this.addToQueue(request, subscribeArgs.getRequestUrl(), synchronous, (subscribeArgs.getRequestTimeout() !== null ? subscribeArgs.getRequestTimeout() : 0));
      return this.processQueue(false);
    }
  };

  client.prototype.performSubscribeCallback = function() {
    var _var0, _var1, args, args2, args3, dynamicValue, flag, j, k, len, len1, responseArgs, str;
    responseArgs = arguments[0];
    dynamicValue = responseArgs.getDynamicValue(fm.websync.client._argsKey);
    args = new fm.websync.clientSubscribeResponseArgs();
    args.setMethodArgs(dynamicValue);
    this.raiseResponseEvent(fm.websync.client._onSubscribeResponse, args, "OnSubscribeResponse", responseArgs);
    if (!fm.global.equals(responseArgs.getException(), null)) {
      flag = this.raiseSubscribeFailure(dynamicValue, responseArgs, false);
      this.raiseSubscribeComplete(dynamicValue, responseArgs);
      args2 = new fm.websync.clientSubscribeEndArgs();
      args2.setMethodArgs(dynamicValue);
      this.raiseCompleteEvent(fm.websync.client._onSubscribeEnd, args2, "OnSubscribeEnd", responseArgs);
      if (flag) {
        dynamicValue.setIsRetry(true);
        return this.subscribe(dynamicValue);
      } else {
        if (dynamicValue.getIsResubscribe()) {
          return this.maybeRaiseStateRestored();
        }
      }
    } else {
      if (fm.global.equals(dynamicValue.getAutoResubscribe(), true)) {
        fm.arrayExtensions.add(this._reconnectCache, dynamicValue);
        _var0 = responseArgs.getResponse().getChannels();
        for (j = 0, len = _var0.length; j < len; j++) {
          str = _var0[j];
          this._resubscribeCache[fm.websync.client.getSubscribeKey(str, dynamicValue.getTag())] = dynamicValue;
        }
      }
      _var1 = responseArgs.getResponse().getChannels();
      for (k = 0, len1 = _var1.length; k < len1; k++) {
        str = _var1[k];
        this._subscribedDynamicProperties[fm.websync.client.getSubscribeKey(str, dynamicValue.getTag())] = dynamicValue.getDynamicProperties();
      }
      this.addSubscribedChannels(responseArgs.getResponse().getTag(), responseArgs.getResponse().getChannels());
      this.raiseSubscribeSuccess(dynamicValue, responseArgs);
      this.raiseSubscribeComplete(dynamicValue, responseArgs);
      this.addSubscribedOnReceive(responseArgs.getResponse().getTag(), responseArgs.getResponse().getChannels(), dynamicValue.getOnReceive(), dynamicValue.getDynamicProperties(), this._lastInterval);
      args3 = new fm.websync.clientSubscribeEndArgs();
      args3.setMethodArgs(dynamicValue);
      this.raiseCompleteEvent(fm.websync.client._onSubscribeEnd, args3, "OnSubscribeEnd", responseArgs);
      if (dynamicValue.getIsResubscribe()) {
        return this.maybeRaiseStateRestored();
      }
    }
  };

  client.prototype.performUnbind = function() {
    var args, message, request, request2, synchronous, unbindArgs;
    unbindArgs = arguments[0];
    args = new fm.websync.clientUnbindRequestArgs();
    args.setMethodArgs(unbindArgs);
    if (this.raiseRequestEvent(fm.websync.client._onUnbindRequest, args, "OnUnbindRequest")) {
      synchronous = this.checkSynchronous(unbindArgs.getSynchronous());
      request2 = new fm.websync.clientRequest();
      message = new fm.websync.message("/meta/unbind");
      message.setValidate(false);
      message.setRecords(unbindArgs.getRecords());
      message.setExtensions(unbindArgs.getExtensions());
      request2.setMessage(message);
      request2.setCallback(this.performUnbindCallback);
      request = request2;
      request.setDynamicValue(fm.websync.client._argsKey, unbindArgs);
      this.addToQueue(request, unbindArgs.getRequestUrl(), synchronous, (unbindArgs.getRequestTimeout() !== null ? unbindArgs.getRequestTimeout() : 0));
      return this.processQueue(false);
    }
  };

  client.prototype.performUnbindCallback = function() {
    var _var0, _var1, _var2, args, args2, args3, args4, dynamicValue, flag, i, j, len, list, record, responseArgs;
    responseArgs = arguments[0];
    dynamicValue = responseArgs.getDynamicValue(fm.websync.client._argsKey);
    args = new fm.websync.clientUnbindResponseArgs();
    args.setMethodArgs(dynamicValue);
    this.raiseResponseEvent(fm.websync.client._onUnbindResponse, args, "OnUnbindResponse", responseArgs);
    if (!fm.global.equals(responseArgs.getException(), null)) {
      flag = this.raiseUnbindFailure(dynamicValue, responseArgs, false);
      this.raiseUnbindComplete(dynamicValue, responseArgs, false);
      args2 = new fm.websync.clientUnbindEndArgs();
      args2.setMethodArgs(dynamicValue);
      this.raiseCompleteEvent(fm.websync.client._onUnbindEnd, args2, "OnUnbindEnd", responseArgs);
      if (flag) {
        dynamicValue.setIsRetry(true);
        return this.unbind(dynamicValue);
      }
    } else {
      _var0 = responseArgs.getResponse().getRecords();
      for (j = 0, len = _var0.length; j < len; j++) {
        record = _var0[j];
        args3 = null;
        _var1 = new fm.holder(args3);
        _var2 = fm.hashExtensions.tryGetValue(this._rebindCache, record.getKey(), _var1);
        args3 = _var1.getValue();
        if (!_var2) {
          args3 = null;
        }
        if (!fm.global.equals(args3, null)) {
          list = [];
          i = 0;
          while (i < fm.arrayExtensions.getCount(list)) {
            try {
              if (fm.global.equals(list[i].getKey(), record.getKey())) {
                list.removeAt(i);
                i--;
              }
            } finally {
              i++;
            }
          }
          args3.setRecords(fm.arrayExtensions.toArray(list));
          fm.hashExtensions.remove(this._rebindCache, record.getKey());
          if (!fm.hashExtensions.containsValue(this._rebindCache, args3)) {
            fm.arrayExtensions.remove(this._reconnectCache, args3);
          }
        }
      }
      this.removeBoundRecords(responseArgs.getResponse().getRecords());
      this.raiseUnbindSuccess(dynamicValue, responseArgs, false);
      this.raiseUnbindComplete(dynamicValue, responseArgs, false);
      args4 = new fm.websync.clientUnbindEndArgs();
      args4.setMethodArgs(dynamicValue);
      return this.raiseCompleteEvent(fm.websync.client._onUnbindEnd, args4, "OnUnbindEnd", responseArgs);
    }
  };

  client.prototype.performUnsubscribe = function() {
    var args, message, request, request2, synchronous, unsubscribeArgs;
    unsubscribeArgs = arguments[0];
    args = new fm.websync.clientUnsubscribeRequestArgs();
    args.setMethodArgs(unsubscribeArgs);
    if (this.raiseRequestEvent(fm.websync.client._onUnsubscribeRequest, args, "OnUnsubscribeRequest")) {
      synchronous = this.checkSynchronous(unsubscribeArgs.getSynchronous());
      request2 = new fm.websync.clientRequest();
      message = new fm.websync.message("/meta/unsubscribe");
      message.setValidate(false);
      message.setChannels(unsubscribeArgs.getChannels());
      message.setExtensions(unsubscribeArgs.getExtensions());
      request2.setMessage(message);
      request2.setCallback(this.performUnsubscribeCallback);
      request = request2;
      request.setDynamicValue(fm.websync.client._argsKey, unsubscribeArgs);
      this.addToQueue(request, unsubscribeArgs.getRequestUrl(), synchronous, (unsubscribeArgs.getRequestTimeout() !== null ? unsubscribeArgs.getRequestTimeout() : 0));
      return this.processQueue(false);
    }
  };

  client.prototype.performUnsubscribeCallback = function() {
    var _var0, _var1, _var2, args, args2, args3, args4, dynamicValue, flag, j, len, list, responseArgs, str, subscribeKey;
    responseArgs = arguments[0];
    dynamicValue = responseArgs.getDynamicValue(fm.websync.client._argsKey);
    args = new fm.websync.clientUnsubscribeResponseArgs();
    args.setMethodArgs(dynamicValue);
    this.raiseResponseEvent(fm.websync.client._onUnsubscribeResponse, args, "OnUnsubscribeResponse", responseArgs);
    if (!fm.global.equals(responseArgs.getException(), null)) {
      flag = this.raiseUnsubscribeFailure(dynamicValue, responseArgs, false);
      this.raiseUnsubscribeComplete(dynamicValue, responseArgs, false);
      args2 = new fm.websync.clientUnsubscribeEndArgs();
      args2.setMethodArgs(dynamicValue);
      this.raiseCompleteEvent(fm.websync.client._onUnsubscribeEnd, args2, "OnUnsubscribeEnd", responseArgs);
      if (flag) {
        dynamicValue.setIsRetry(true);
        return this.unsubscribe(dynamicValue);
      }
    } else {
      _var0 = responseArgs.getResponse().getChannels();
      for (j = 0, len = _var0.length; j < len; j++) {
        str = _var0[j];
        args3 = null;
        subscribeKey = fm.websync.client.getSubscribeKey(str, dynamicValue.getTag());
        _var1 = new fm.holder(args3);
        _var2 = fm.hashExtensions.tryGetValue(this._resubscribeCache, subscribeKey, _var1);
        args3 = _var1.getValue();
        if (!_var2) {
          args3 = null;
        }
        if (!fm.global.equals(args3, null)) {
          list = [];
          fm.arrayExtensions.remove(list, str);
          args3.setChannels(fm.arrayExtensions.toArray(list));
          fm.hashExtensions.remove(this._resubscribeCache, subscribeKey);
          if (!fm.hashExtensions.containsValue(this._resubscribeCache, args3)) {
            fm.arrayExtensions.remove(this._reconnectCache, args3);
          }
        }
      }
      this.removeSubscribedChannels(responseArgs.getResponse().getTag(), responseArgs.getResponse().getChannels());
      this.removeSubscribedOnReceive(responseArgs.getResponse().getTag(), responseArgs.getResponse().getChannels());
      this.raiseUnsubscribeSuccess(dynamicValue, responseArgs, false);
      this.raiseUnsubscribeComplete(dynamicValue, responseArgs, false);
      args4 = new fm.websync.clientUnsubscribeEndArgs();
      args4.setMethodArgs(dynamicValue);
      return this.raiseCompleteEvent(fm.websync.client._onUnsubscribeEnd, args4, "OnUnsubscribeEnd", responseArgs);
    }
  };

  client.prototype.postRaise = function() {
    var num, threadId;
    threadId = arguments[0];
    if (fm.global.equals(this.getConcurrencyMode(), fm.websync.concurrencyMode.Low)) {
      num = this._threadCounters[threadId];
      if (fm.global.equals(num, 1)) {
        return fm.hashExtensions.remove(this._threadCounters, threadId);
      } else {
        return this._threadCounters[threadId] = num - 1;
      }
    } else {
      num = this._threadCounters[threadId];
      return this._threadCounters[threadId] = num - 1;
    }
  };

  client.prototype.preRaise = function() {
    var num, threadId;
    threadId = arguments[0];
    num = 0;
    if (fm.hashExtensions.containsKey(this._threadCounters, threadId)) {
      num = this._threadCounters[threadId];
    }
    return this._threadCounters[threadId] = num + 1;
  };

  client.prototype.processAdvice = function() {
    var advice;
    advice = arguments[0];
    if (advice.getInterval() !== null) {
      this._lastInterval = advice.getInterval();
    }
    if (advice.getReconnect() !== null) {
      return this._lastReconnect = advice.getReconnect();
    }
  };

  client.prototype.processPendingReceives = function() {
    var _var0, _var1, _var2, _var3, channels, j, k, len, len1, list, message, reconnectAfter, str;
    channels = arguments[0];
    reconnectAfter = arguments[1];
    _var0 = channels;
    for (j = 0, len = _var0.length; j < len; j++) {
      str = _var0[j];
      list = null;
      _var1 = new fm.holder(list);
      _var2 = fm.hashExtensions.tryGetValue(this._pendingReceives, str, _var1);
      list = _var1.getValue();
      if (_var2) {
        fm.hashExtensions.remove(this._pendingReceives, str);
      }
      if (!fm.global.equals(list, null)) {
        _var3 = list;
        for (k = 0, len1 = _var3.length; k < len1; k++) {
          message = _var3[k];
          reconnectAfter = this.receiveMessage(message, reconnectAfter);
        }
      }
    }
    return reconnectAfter;
  };

  client.prototype.processQueue = function() {
    var _var0, activate, index, j, len, requestQueue, requests, results, s, str, str3, synchronous, timeout, url;
    activate = arguments[0];
    if (activate) {
      this._queueActivated = true;
    }
    if (this._queueActivated && !this.inBatch()) {
      requestQueue = this._requestQueue;
      this._requestQueue = {};
      _var0 = fm.hashExtensions.getKeys(requestQueue);
      results = [];
      for (j = 0, len = _var0.length; j < len; j++) {
        str = _var0[j];
        index = fm.stringExtensions.indexOf(str, "|");
        s = fm.stringExtensions.substring(str, 0, index);
        str3 = str.substring(index + 1);
        timeout = fm.parseAssistant.parseIntegerValue(s);
        synchronous = fm.global.equals(fm.stringExtensions.substring(str3, 0, 1), "1");
        url = str3.substring(1);
        requests = fm.arrayExtensions.toArray(requestQueue[str]);
        results.push(this.sendMany(requests, url, synchronous, timeout));
      }
      return results;
    }
  };

  client.prototype.processRequestUrl = function() {
    var _var0, _var1, flag, requestUrl, str;
    requestUrl = arguments[0];
    if (fm.stringExtensions.isNullOrEmpty(requestUrl)) {
      requestUrl = this.getRequestUrl();
    }
    flag = false;
    str = null;
    if (fm.global.equals(this.getConcurrencyMode(), fm.websync.concurrencyMode.High)) {
      _var0 = new fm.holder(str);
      _var1 = fm.hashExtensions.tryGetValue(fm.websync.client._requestUrlCache, requestUrl, _var0);
      str = _var0.getValue();
      flag = _var1;
    }
    if (!flag) {
      str = requestUrl;
      str = fm.httpTransfer.addQueryToUrl(fm.httpTransfer.addQueryToUrl(fm.httpTransfer.addQueryToUrl(str, "token", this.getToken()), "src", fm.httpWebRequestTransfer.getPlatformCode()), "AspxAutoDetectCookieSupport", "1");
      if (!fm.global.equals(this.getConcurrencyMode(), fm.websync.concurrencyMode.High)) {
        return str;
      }
      fm.websync.client._requestUrlCache[requestUrl] = str;
    }
    return str;
  };

  client.prototype.processServerAction = function() {
    var onReceive, reconnectAfter, serverAction;
    serverAction = arguments[0];
    reconnectAfter = arguments[1];
    if (fm.global.equals(serverAction.getBayeuxChannel(), "/meta/bind")) {
      this.addBoundRecords(serverAction.getRecords());
      this.raiseServerBind(serverAction);
      return reconnectAfter;
    }
    if (fm.global.equals(serverAction.getBayeuxChannel(), "/meta/unbind")) {
      this.removeBoundRecords(serverAction.getRecords());
      this.raiseServerUnbind(serverAction);
      return reconnectAfter;
    }
    if (fm.global.equals(serverAction.getBayeuxChannel(), "/meta/subscribe")) {
      this.addSubscribedChannels(serverAction.getTag(), serverAction.getChannels());
      onReceive = this.raiseServerSubscribe(serverAction);
      if (fm.global.equals(onReceive, null)) {
        throw new Error(fm.stringExtensions.format("The server subscribed the client to [{0}], but the client did not supply a callback to handle received messages. A callback must be specified in the client's OnServerSubscribe event.", fm.stringExtensions.join(", ", serverAction.getChannels())));
      }
      reconnectAfter = this.addSubscribedOnReceive(serverAction.getTag(), serverAction.getChannels(), onReceive, serverAction.getDynamicProperties(), reconnectAfter);
      return reconnectAfter;
    }
    if (fm.global.equals(serverAction.getBayeuxChannel(), "/meta/unsubscribe")) {
      this.removeSubscribedChannels(serverAction.getTag(), serverAction.getChannels());
      this.raiseServerUnsubscribe(serverAction);
      this.removeSubscribedOnReceive(serverAction.getTag(), serverAction.getChannels());
    }
    return reconnectAfter;
  };


  /*<span id='method-fm.websync.client-publish'>&nbsp;</span> */


  /**
  	 <div>
  	 Sends data to a specified channel.
  	 </div><div>
  	 When the publish completes successfully, the OnSuccess callback
  	 will be invoked, passing in the
  	 channel and published data, <b>including any modifications made on the server</b>.
  	 </div>
  	@function publish
  	@param {fm.websync.publishArgs} publishArgs The publish arguments.
  	 See fm.websync.publishArgs for more details.
  	@return {fm.websync.client} The client.
   */

  client.prototype.publish = function() {
    var publishArgs;
    publishArgs = arguments[0];
    if (fm.stringExtensions.isNullOrEmpty(publishArgs.getChannel())) {
      throw new Error("channel cannot be null.");
    }
    if (fm.stringExtensions.isNullOrEmpty(publishArgs.getDataJson())) {
      throw new Error("dataJson cannot be null.");
    }
    this.performPublish(publishArgs);
    return this;
  };

  client.prototype.raiseAction = function() {
    var args, callback, source;
    callback = arguments[0];
    args = arguments[1];
    source = arguments[2];
    return this.raiseActionManual(callback, args, source, false);
  };

  client.prototype.raiseActionManual = function() {
    var args, callback, error, error1, exception, exception1, exception2, manualThreadManagement, source, threadId;
    callback = arguments[0];
    args = arguments[1];
    source = arguments[2];
    manualThreadManagement = arguments[3];
    if (manualThreadManagement) {
      try {
        return callback(args);
      } catch (error) {
        exception1 = error;
        exception = exception1;
        if (!this.raiseUnhandledException(exception)) {
          return fm.asyncException.asyncThrow(exception, source);
        }
      } finally {

      }
    } else {
      threadId = this.getThreadId();
      this.preRaise(threadId);
      try {
        return callback(args);
      } catch (error1) {
        exception2 = error1;
        exception = exception2;
        if (!this.raiseUnhandledException(exception)) {
          return fm.asyncException.asyncThrow(exception, source);
        }
      } finally {
        this.postRaise(threadId);
      }
    }
  };

  client.prototype.raiseBindComplete = function() {
    var args, args2, bindArgs, onBindComplete, responseArgs;
    bindArgs = arguments[0];
    responseArgs = arguments[1];
    args2 = new fm.websync.bindCompleteArgs();
    args2.setExtensions(fm.websync.client.getExtensions(responseArgs.getResponse(), bindArgs));
    args2.setIsRebind(bindArgs.getIsRebind());
    args2.setTimestamp(fm.websync.client.getTimestamp(responseArgs.getResponse()));
    args2.setClient(this);
    args2.setDynamicProperties(bindArgs.getDynamicProperties());
    args = args2;
    onBindComplete = this._onBindComplete;
    if (!fm.global.equals(onBindComplete, null)) {
      this.raiseAction(onBindComplete, args, "Client -> OnBindComplete");
    }
    if (!fm.global.equals(bindArgs.getOnComplete(), null)) {
      return this.raiseAction(bindArgs.getOnComplete(), args, "Client -> Bind -> OnComplete");
    }
  };

  client.prototype.raiseBindFailure = function() {
    var args, args2, bindArgs, onBindFailure, responseArgs, retry;
    bindArgs = arguments[0];
    responseArgs = arguments[1];
    retry = arguments[2];
    args2 = new fm.websync.bindFailureArgs();
    args2.__records = fm.websync.client.getRecordsForBind(responseArgs.getResponse(), bindArgs);
    args2.setException(responseArgs.getException());
    args2.setExtensions(fm.websync.client.getExtensions(responseArgs.getResponse(), bindArgs));
    args2.setIsRebind(bindArgs.getIsRebind());
    args2.setTimestamp(fm.websync.client.getTimestamp(responseArgs.getResponse()));
    args2.setClient(this);
    args2.setDynamicProperties(bindArgs.getDynamicProperties());
    args = args2;
    onBindFailure = this._onBindFailure;
    if (!fm.global.equals(onBindFailure, null)) {
      this.raiseAction(onBindFailure, args, "Client -> OnBindFailure");
    }
    if (!fm.global.equals(bindArgs.getOnFailure(), null)) {
      retry = this.raiseRetriable(bindArgs.getOnFailure(), retry, args, "Client -> Bind -> OnFailure");
    }
    return retry;
  };

  client.prototype.raiseBindSuccess = function() {
    var args, args2, bindArgs, onBindSuccess, responseArgs;
    bindArgs = arguments[0];
    responseArgs = arguments[1];
    args2 = new fm.websync.bindSuccessArgs();
    args2.__records = fm.websync.client.getRecordsForBind(responseArgs.getResponse(), bindArgs);
    args2.setExtensions(fm.websync.client.getExtensions(responseArgs.getResponse(), bindArgs));
    args2.setIsRebind(bindArgs.getIsRebind());
    args2.setTimestamp(fm.websync.client.getTimestamp(responseArgs.getResponse()));
    args2.setClient(this);
    args2.setDynamicProperties(bindArgs.getDynamicProperties());
    args = args2;
    onBindSuccess = this._onBindSuccess;
    if (!fm.global.equals(onBindSuccess, null)) {
      this.raiseAction(onBindSuccess, args, "Client -> OnBindSuccess");
    }
    if (!fm.global.equals(bindArgs.getOnSuccess(), null)) {
      return this.raiseAction(bindArgs.getOnSuccess(), args, "Client -> Bind -> OnSuccess");
    }
  };

  client.prototype.raiseCompleteEvent = function() {
    var args, eventMethod, eventName, responseArgs;
    eventMethod = arguments[0];
    args = arguments[1];
    eventName = arguments[2];
    responseArgs = arguments[3];
    args.setException(responseArgs.getException());
    args.setResponse(responseArgs.getResponse());
    return this.raiseEvent(eventMethod, args, eventName);
  };

  client.prototype.raiseConnectComplete = function() {
    var args, args2, connectArgs, onConnectComplete, responseArgs;
    connectArgs = arguments[0];
    responseArgs = arguments[1];
    args2 = new fm.websync.connectCompleteArgs();
    args2.setExtensions(fm.websync.client.getExtensions(responseArgs.getResponse(), connectArgs));
    args2.setIsReconnect(connectArgs.getIsReconnect());
    args2.setTimestamp(fm.websync.client.getTimestamp(responseArgs.getResponse()));
    args2.setClient(this);
    args2.setDynamicProperties(connectArgs.getDynamicProperties());
    args = args2;
    onConnectComplete = this._onConnectComplete;
    if (!fm.global.equals(onConnectComplete, null)) {
      this.raiseAction(onConnectComplete, args, "Client -> OnConnectComplete");
    }
    if (!fm.global.equals(connectArgs.getOnComplete(), null)) {
      return this.raiseAction(connectArgs.getOnComplete(), args, "Client -> Connect -> OnComplete");
    }
  };

  client.prototype.raiseConnectFailure = function() {
    var args, args2, connectArgs, onConnectFailure, responseArgs, retry;
    connectArgs = arguments[0];
    responseArgs = arguments[1];
    retry = arguments[2];
    args2 = new fm.websync.connectFailureArgs();
    args2.setException(responseArgs.getException());
    args2.setExtensions(fm.websync.client.getExtensions(responseArgs.getResponse(), connectArgs));
    args2.setIsReconnect(connectArgs.getIsReconnect());
    args2.setTimestamp(fm.websync.client.getTimestamp(responseArgs.getResponse()));
    args2.setClient(this);
    args2.setDynamicProperties(connectArgs.getDynamicProperties());
    args = args2;
    onConnectFailure = this._onConnectFailure;
    if (!fm.global.equals(onConnectFailure, null)) {
      this.raiseAction(onConnectFailure, args, "Client -> OnConnectFailure");
    }
    if (!fm.global.equals(connectArgs.getOnFailure(), null)) {
      retry = this.raiseRetriable(connectArgs.getOnFailure(), retry, args, "Client -> Connect -> OnFailure");
    }
    return retry;
  };

  client.prototype.raiseConnectSuccess = function() {
    var args, args2, connectArgs, onConnectSuccess, responseArgs;
    connectArgs = arguments[0];
    responseArgs = arguments[1];
    args2 = new fm.websync.connectSuccessArgs();
    args2.setExtensions(fm.websync.client.getExtensions(responseArgs.getResponse(), connectArgs));
    args2.setConnectionType(this._connectionType);
    args2.setIsReconnect(connectArgs.getIsReconnect());
    args2.setTimestamp(fm.websync.client.getTimestamp(responseArgs.getResponse()));
    args2.setClient(this);
    args2.setDynamicProperties(connectArgs.getDynamicProperties());
    args = args2;
    onConnectSuccess = this._onConnectSuccess;
    if (!fm.global.equals(onConnectSuccess, null)) {
      this.raiseAction(onConnectSuccess, args, "Client -> OnConnectSuccess");
    }
    if (!fm.global.equals(connectArgs.getOnSuccess(), null)) {
      return this.raiseAction(connectArgs.getOnSuccess(), args, "Client -> Connect -> OnSuccess");
    }
  };

  client.prototype.raiseDisconnectComplete = function() {
    var args, args2, disconnectArgs, onDisconnectComplete, responseArgs;
    disconnectArgs = arguments[0];
    responseArgs = arguments[1];
    args2 = new fm.websync.disconnectCompleteArgs();
    args2.setException(responseArgs.getException());
    args2.setExtensions(fm.websync.client.getExtensions(responseArgs.getResponse(), disconnectArgs));
    args2.setTimestamp(fm.websync.client.getTimestamp(responseArgs.getResponse()));
    args2.setClient(this);
    args2.setDynamicProperties(disconnectArgs.getDynamicProperties());
    args = args2;
    onDisconnectComplete = this._onDisconnectComplete;
    if (!fm.global.equals(onDisconnectComplete, null)) {
      this.raiseAction(onDisconnectComplete, args, "Client -> OnDisconnectComplete");
    }
    if (!fm.global.equals(disconnectArgs.getOnComplete(), null)) {
      return this.raiseAction(disconnectArgs.getOnComplete(), args, "Client -> Disconnect -> OnComplete");
    }
  };

  client.prototype.raiseEvent = function() {
    var args, error, eventMethod, eventName, exception;
    eventMethod = arguments[0];
    args = arguments[1];
    eventName = arguments[2];
    args.setClient(this);
    if (!fm.global.equals(eventMethod, null)) {
      try {
        return eventMethod(this, args);
      } catch (error) {
        exception = error;
        if (!this.raiseUnhandledException(exception)) {
          return fm.asyncException.asyncThrow(exception, fm.stringExtensions.format("Client -> {0}", eventName));
        }
      } finally {

      }
    }
  };

  client.prototype.raiseForcedUnbinds = function() {
    var _var0, _var1, args2, inputArgs, item, j, k, len, len1, list, responseArgs, results, str;
    inputArgs = arguments[0];
    responseArgs = arguments[1];
    list = [];
    _var0 = fm.hashExtensions.getKeys(this._boundRecords);
    for (j = 0, len = _var0.length; j < len; j++) {
      str = _var0[j];
      item = new fm.websync.unbindArgs([this._boundRecords[str]]);
      item.setRequestUrl(inputArgs.getRequestUrl());
      item.setSynchronous(inputArgs.getSynchronous());
      item.setIsRetry(inputArgs.getIsRetry());
      item.setExtensions(fm.websync.client.getExtensions(responseArgs.getResponse(), inputArgs));
      item.setDynamicProperties(inputArgs.getDynamicProperties());
      fm.arrayExtensions.add(list, item);
    }
    _var1 = list;
    results = [];
    for (k = 0, len1 = _var1.length; k < len1; k++) {
      args2 = _var1[k];
      this.raiseUnbindSuccess(args2, responseArgs, true);
      results.push(this.raiseUnbindComplete(args2, responseArgs, true));
    }
    return results;
  };

  client.prototype.raiseForcedUnsubscribes = function() {
    var _var0, _var1, _var2, args2, inputArgs, item, j, k, l, len, len1, len2, list, responseArgs, results, str, str2;
    inputArgs = arguments[0];
    responseArgs = arguments[1];
    list = [];
    _var0 = fm.hashExtensions.getKeys(this._subscribedChannels);
    for (j = 0, len = _var0.length; j < len; j++) {
      str = _var0[j];
      _var1 = fm.hashExtensions.getKeys(this._subscribedChannels[str]);
      for (k = 0, len1 = _var1.length; k < len1; k++) {
        str2 = _var1[k];
        item = new fm.websync.unsubscribeArgs([str2], str);
        item.setRequestUrl(inputArgs.getRequestUrl());
        item.setSynchronous(inputArgs.getSynchronous());
        item.setIsRetry(inputArgs.getIsRetry());
        item.setExtensions(fm.websync.client.getExtensions(responseArgs.getResponse(), inputArgs));
        item.setDynamicProperties(inputArgs.getDynamicProperties());
        fm.arrayExtensions.add(list, item);
      }
    }
    _var2 = list;
    results = [];
    for (l = 0, len2 = _var2.length; l < len2; l++) {
      args2 = _var2[l];
      this.raiseUnsubscribeSuccess(args2, responseArgs, true);
      results.push(this.raiseUnsubscribeComplete(args2, responseArgs, true));
    }
    return results;
  };

  client.prototype.raiseFunction = function() {
    var args, callback, source;
    callback = arguments[0];
    args = arguments[1];
    source = arguments[2];
    return this.raiseFunctionManual(callback, args, source, false);
  };

  client.prototype.raiseFunctionManual = function() {
    var args, callback, error, error1, exception, exception1, exception2, local, manualThreadManagement, source, threadId;
    callback = arguments[0];
    args = arguments[1];
    source = arguments[2];
    manualThreadManagement = arguments[3];
    if (manualThreadManagement) {
      try {
        return callback(args);
      } catch (error) {
        exception1 = error;
        exception = exception1;
        if (!this.raiseUnhandledException(exception)) {
          fm.asyncException.asyncThrow(exception, source);
        }
        return null;
      } finally {

      }
    }
    threadId = this.getThreadId();
    this.preRaise(threadId);
    try {
      local = callback(args);
    } catch (error1) {
      exception2 = error1;
      exception = exception2;
      if (!this.raiseUnhandledException(exception)) {
        fm.asyncException.asyncThrow(exception, source);
      }
      local = null;
    } finally {
      this.postRaise(threadId);
    }
    return local;
  };

  client.prototype.raiseNotifyComplete = function() {
    var args, args2, notifyArgs, onNotifyComplete, responseArgs;
    notifyArgs = arguments[0];
    responseArgs = arguments[1];
    args2 = new fm.websync.notifyCompleteArgs();
    args2.setExtensions(fm.websync.client.getExtensions(responseArgs.getResponse(), notifyArgs));
    args2.setTimestamp(fm.websync.client.getTimestamp(responseArgs.getResponse()));
    args2.setClient(this);
    args2.setDynamicProperties(notifyArgs.getDynamicProperties());
    args = args2;
    onNotifyComplete = this._onNotifyComplete;
    if (!fm.global.equals(onNotifyComplete, null)) {
      this.raiseAction(onNotifyComplete, args, "Client -> OnNotifyComplete");
    }
    if (!fm.global.equals(notifyArgs.getOnComplete(), null)) {
      return this.raiseAction(notifyArgs.getOnComplete(), args, "Client -> Notify -> OnComplete");
    }
  };

  client.prototype.raiseNotifyDelivery = function() {
    var args, args2, onReceive, reconnectAfter, response;
    onReceive = arguments[0];
    response = arguments[1];
    reconnectAfter = arguments[2];
    args2 = new fm.websync.notifyReceiveArgs(response.__dataJson, response.__dataBytes, this._connectionType, reconnectAfter);
    args2.setExtensions(response.getExtensions());
    args2.setTimestamp(fm.websync.client.getTimestamp(response));
    args2.setClient(this);
    args = args2;
    if (!fm.global.equals(onReceive, null)) {
      this.raiseActionManual(onReceive, args, "Client -> OnNotify", true);
    }
    return args.getReconnectAfter();
  };

  client.prototype.raiseNotifyFailure = function() {
    var args, args2, notifyArgs, onNotifyFailure, responseArgs, retry;
    notifyArgs = arguments[0];
    responseArgs = arguments[1];
    retry = arguments[2];
    args2 = new fm.websync.notifyFailureArgs();
    args2.__dataJson = fm.websync.client.getDataJsonForNotify(responseArgs.getResponse(), notifyArgs);
    args2.__dataBytes = fm.websync.client.getDataBytesForNotify(responseArgs.getResponse(), notifyArgs);
    args2.setException(responseArgs.getException());
    args2.setExtensions(fm.websync.client.getExtensions(responseArgs.getResponse(), notifyArgs));
    args2.setTimestamp(fm.websync.client.getTimestamp(responseArgs.getResponse()));
    args2.setClient(this);
    args2.setDynamicProperties(notifyArgs.getDynamicProperties());
    args = args2;
    onNotifyFailure = this._onNotifyFailure;
    if (!fm.global.equals(onNotifyFailure, null)) {
      this.raiseAction(onNotifyFailure, args, "Client -> OnNotifyFailure");
    }
    if (!fm.global.equals(notifyArgs.getOnFailure(), null)) {
      retry = this.raiseRetriable(notifyArgs.getOnFailure(), retry, args, "Client -> Notify -> OnFailure");
    }
    return retry;
  };

  client.prototype.raiseNotifySuccess = function() {
    var args, args2, notifyArgs, onNotifySuccess, responseArgs;
    notifyArgs = arguments[0];
    responseArgs = arguments[1];
    args2 = new fm.websync.notifySuccessArgs();
    args2.__dataJson = fm.websync.client.getDataJsonForNotify(responseArgs.getResponse(), notifyArgs);
    args2.__dataBytes = fm.websync.client.getDataBytesForNotify(responseArgs.getResponse(), notifyArgs);
    args2.setExtensions(fm.websync.client.getExtensions(responseArgs.getResponse(), notifyArgs));
    args2.setTimestamp(fm.websync.client.getTimestamp(responseArgs.getResponse()));
    args2.setClient(this);
    args2.setDynamicProperties(notifyArgs.getDynamicProperties());
    args = args2;
    onNotifySuccess = this._onNotifySuccess;
    if (!fm.global.equals(onNotifySuccess, null)) {
      this.raiseAction(onNotifySuccess, args, "Client -> OnNotifySuccess");
    }
    if (!fm.global.equals(notifyArgs.getOnSuccess(), null)) {
      return this.raiseAction(notifyArgs.getOnSuccess(), args, "Client -> Notify -> OnSuccess");
    }
  };

  client.prototype.raisePublishComplete = function() {
    var args, args2, onPublishComplete, publishArgs, responseArgs;
    publishArgs = arguments[0];
    responseArgs = arguments[1];
    args2 = new fm.websync.publishCompleteArgs();
    args2.setExtensions(fm.websync.client.getExtensions(responseArgs.getResponse(), publishArgs));
    args2.setTimestamp(fm.websync.client.getTimestamp(responseArgs.getResponse()));
    args2.setClient(this);
    args2.setDynamicProperties(publishArgs.getDynamicProperties());
    args = args2;
    onPublishComplete = this._onPublishComplete;
    if (!fm.global.equals(onPublishComplete, null)) {
      this.raiseAction(onPublishComplete, args, "Client -> OnPublishComplete");
    }
    if (!fm.global.equals(publishArgs.getOnComplete(), null)) {
      return this.raiseAction(publishArgs.getOnComplete(), args, "Client -> Publish -> OnComplete");
    }
  };

  client.prototype.raisePublishFailure = function() {
    var args, args2, onPublishFailure, publishArgs, responseArgs, retry;
    publishArgs = arguments[0];
    responseArgs = arguments[1];
    retry = arguments[2];
    args2 = new fm.websync.publishFailureArgs();
    args2.__channel = fm.websync.client.getChannelForPublish(responseArgs.getResponse(), publishArgs);
    args2.__dataJson = fm.websync.client.getDataJsonForPublish(responseArgs.getResponse(), publishArgs);
    args2.__dataBytes = fm.websync.client.getDataBytesForPublish(responseArgs.getResponse(), publishArgs);
    args2.setException(responseArgs.getException());
    args2.setExtensions(fm.websync.client.getExtensions(responseArgs.getResponse(), publishArgs));
    args2.setTimestamp(fm.websync.client.getTimestamp(responseArgs.getResponse()));
    args2.setClient(this);
    args2.setDynamicProperties(publishArgs.getDynamicProperties());
    args = args2;
    onPublishFailure = this._onPublishFailure;
    if (!fm.global.equals(onPublishFailure, null)) {
      this.raiseAction(onPublishFailure, args, "Client -> OnPublishFailure");
    }
    if (!fm.global.equals(publishArgs.getOnFailure(), null)) {
      retry = this.raiseRetriable(publishArgs.getOnFailure(), retry, args, "Client -> Publish -> OnFailure");
    }
    return retry;
  };

  client.prototype.raisePublishSuccess = function() {
    var args, args2, onPublishSuccess, publishArgs, responseArgs;
    publishArgs = arguments[0];
    responseArgs = arguments[1];
    args2 = new fm.websync.publishSuccessArgs();
    args2.__channel = fm.websync.client.getChannelForPublish(responseArgs.getResponse(), publishArgs);
    args2.__dataJson = fm.websync.client.getDataJsonForPublish(responseArgs.getResponse(), publishArgs);
    args2.__dataBytes = fm.websync.client.getDataBytesForPublish(responseArgs.getResponse(), publishArgs);
    args2.setExtensions(fm.websync.client.getExtensions(responseArgs.getResponse(), publishArgs));
    args2.setTimestamp(fm.websync.client.getTimestamp(responseArgs.getResponse()));
    args2.setClient(this);
    args2.setDynamicProperties(publishArgs.getDynamicProperties());
    args = args2;
    onPublishSuccess = this._onPublishSuccess;
    if (!fm.global.equals(onPublishSuccess, null)) {
      this.raiseAction(onPublishSuccess, args, "Client -> OnPublishSuccess");
    }
    if (!fm.global.equals(publishArgs.getOnSuccess(), null)) {
      return this.raiseAction(publishArgs.getOnSuccess(), args, "Client -> Publish -> OnSuccess");
    }
  };

  client.prototype.raiseRequestEvent = function() {
    var args, eventMethod, eventName;
    eventMethod = arguments[0];
    args = arguments[1];
    eventName = arguments[2];
    this.raiseEvent(eventMethod, args, eventName);
    return !args.getCancel();
  };

  client.prototype.raiseResponseEvent = function() {
    var args, eventMethod, eventName, responseArgs;
    eventMethod = arguments[0];
    args = arguments[1];
    eventName = arguments[2];
    responseArgs = arguments[3];
    args.setException(responseArgs.getException());
    args.setResponse(responseArgs.getResponse());
    return this.raiseEvent(eventMethod, args, eventName);
  };

  client.prototype.raiseRetriable = function() {
    var args, callback, retry, source;
    callback = arguments[0];
    retry = arguments[1];
    args = arguments[2];
    source = arguments[3];
    args.setRetry(retry);
    this.raiseAction(callback, args, source);
    return args.getRetry();
  };

  client.prototype.raiseSendException = function() {
    var _var0, exception, j, len, p, request, results, state;
    state = arguments[0];
    exception = arguments[1];
    _var0 = state.getRequests();
    results = [];
    for (j = 0, len = _var0.length; j < len; j++) {
      request = _var0[j];
      p = new fm.websync.clientResponseArgs();
      p.setDynamicProperties(request.getDynamicProperties());
      p.setException(exception);
      results.push(request.getCallback()(p));
    }
    return results;
  };

  client.prototype.raiseServerBind = function() {
    var args, onServerBind, serverAction;
    serverAction = arguments[0];
    onServerBind = this._onServerBind;
    if (!fm.global.equals(onServerBind, null)) {
      args = new fm.websync.serverBindArgs();
      args.__records = serverAction.getRecords();
      args.setExtensions(serverAction.getExtensions());
      args.setTimestamp(serverAction.getTimestamp());
      args.setClient(this);
      return this.raiseAction(onServerBind, args, "Client -> OnServerBind");
    }
  };

  client.prototype.raiseServerSubscribe = function() {
    var args, onServerSubscribe, serverAction;
    serverAction = arguments[0];
    onServerSubscribe = this._onServerSubscribe;
    if (!fm.global.equals(onServerSubscribe, null)) {
      args = new fm.websync.serverSubscribeArgs();
      args.__channels = serverAction.getChannels();
      args.setExtensions(serverAction.getExtensions());
      args.setTimestamp(serverAction.getTimestamp());
      args.setClient(this);
      return this.raiseFunction(onServerSubscribe, args, "Client -> OnServerSubscribe");
    }
    return null;
  };

  client.prototype.raiseServerUnbind = function() {
    var args, onServerUnbind, serverAction;
    serverAction = arguments[0];
    onServerUnbind = this._onServerUnbind;
    if (!fm.global.equals(onServerUnbind, null)) {
      args = new fm.websync.serverUnbindArgs();
      args.__records = serverAction.getRecords();
      args.setExtensions(serverAction.getExtensions());
      args.setTimestamp(serverAction.getTimestamp());
      args.setClient(this);
      return this.raiseAction(onServerUnbind, args, "Client -> OnServerUnbind");
    }
  };

  client.prototype.raiseServerUnsubscribe = function() {
    var args, onServerUnsubscribe, serverAction;
    serverAction = arguments[0];
    onServerUnsubscribe = this._onServerUnsubscribe;
    if (!fm.global.equals(onServerUnsubscribe, null)) {
      args = new fm.websync.serverUnsubscribeArgs();
      args.__channels = serverAction.getChannels();
      args.setExtensions(serverAction.getExtensions());
      args.setTimestamp(serverAction.getTimestamp());
      args.setClient(this);
      return this.raiseAction(onServerUnsubscribe, args, "Client -> OnServerUnsubscribe");
    }
  };

  client.prototype.raiseServiceComplete = function() {
    var args, args2, onServiceComplete, responseArgs, serviceArgs;
    serviceArgs = arguments[0];
    responseArgs = arguments[1];
    args2 = new fm.websync.serviceCompleteArgs();
    args2.setExtensions(fm.websync.client.getExtensions(responseArgs.getResponse(), serviceArgs));
    args2.setTimestamp(fm.websync.client.getTimestamp(responseArgs.getResponse()));
    args2.setClient(this);
    args2.setDynamicProperties(serviceArgs.getDynamicProperties());
    args = args2;
    onServiceComplete = this._onServiceComplete;
    if (!fm.global.equals(onServiceComplete, null)) {
      this.raiseAction(onServiceComplete, args, "Client -> OnServiceComplete");
    }
    if (!fm.global.equals(serviceArgs.getOnComplete(), null)) {
      return this.raiseAction(serviceArgs.getOnComplete(), args, "Client -> Service -> OnComplete");
    }
  };

  client.prototype.raiseServiceFailure = function() {
    var args, args2, onServiceFailure, responseArgs, retry, serviceArgs;
    serviceArgs = arguments[0];
    responseArgs = arguments[1];
    retry = arguments[2];
    args2 = new fm.websync.serviceFailureArgs();
    args2.__channel = fm.websync.client.getChannelForService(responseArgs.getResponse(), serviceArgs);
    args2.__dataJson = fm.websync.client.getDataJsonForService(responseArgs.getResponse(), serviceArgs);
    args2.__dataBytes = fm.websync.client.getDataBytesForService(responseArgs.getResponse(), serviceArgs);
    args2.setException(responseArgs.getException());
    args2.setExtensions(fm.websync.client.getExtensions(responseArgs.getResponse(), serviceArgs));
    args2.setTimestamp(fm.websync.client.getTimestamp(responseArgs.getResponse()));
    args2.setClient(this);
    args2.setDynamicProperties(serviceArgs.getDynamicProperties());
    args = args2;
    onServiceFailure = this._onServiceFailure;
    if (!fm.global.equals(onServiceFailure, null)) {
      this.raiseAction(onServiceFailure, args, "Client -> OnServiceFailure");
    }
    if (!fm.global.equals(serviceArgs.getOnFailure(), null)) {
      retry = this.raiseRetriable(serviceArgs.getOnFailure(), retry, args, "Client -> Service -> OnFailure");
    }
    return retry;
  };

  client.prototype.raiseServiceSuccess = function() {
    var args, args2, onServiceSuccess, responseArgs, serviceArgs;
    serviceArgs = arguments[0];
    responseArgs = arguments[1];
    args2 = new fm.websync.serviceSuccessArgs();
    args2.__channel = fm.websync.client.getChannelForService(responseArgs.getResponse(), serviceArgs);
    args2.__dataJson = fm.websync.client.getDataJsonForService(responseArgs.getResponse(), serviceArgs);
    args2.__dataBytes = fm.websync.client.getDataBytesForService(responseArgs.getResponse(), serviceArgs);
    args2.setExtensions(fm.websync.client.getExtensions(responseArgs.getResponse(), serviceArgs));
    args2.setTimestamp(fm.websync.client.getTimestamp(responseArgs.getResponse()));
    args2.setClient(this);
    args2.setDynamicProperties(serviceArgs.getDynamicProperties());
    args = args2;
    onServiceSuccess = this._onServiceSuccess;
    if (!fm.global.equals(onServiceSuccess, null)) {
      this.raiseAction(onServiceSuccess, args, "Client -> OnServiceSuccess");
    }
    if (!fm.global.equals(serviceArgs.getOnSuccess(), null)) {
      return this.raiseAction(serviceArgs.getOnSuccess(), args, "Client -> Service -> OnSuccess");
    }
  };

  client.prototype.raiseStateRestored = function() {
    var args, args2, connectArgs, onStateRestored;
    connectArgs = arguments[0];
    args2 = new fm.websync.stateRestoredArgs();
    args2.setExtensions(connectArgs.getExtensions());
    args2.setClient(this);
    args2.setDynamicProperties(connectArgs.getDynamicProperties());
    args = args2;
    onStateRestored = this._onStateRestored;
    if (!fm.global.equals(onStateRestored, null)) {
      this.raiseAction(onStateRestored, args, "Client -> OnStateRestored");
    }
    if (!fm.global.equals(connectArgs.getOnStateRestored(), null)) {
      return this.raiseAction(connectArgs.getOnStateRestored(), args, "Client -> Connect -> OnStateRestored");
    }
  };

  client.prototype.raiseStreamFailure = function() {
    var args, args2, connectArgs, connectArgsOut, onStreamFailure, responseArgs, retry;
    connectArgs = arguments[0];
    responseArgs = arguments[1];
    retry = arguments[2];
    connectArgsOut = arguments[3];
    args2 = new fm.websync.streamFailureArgs();
    args2.setException(responseArgs.getException());
    args2.setExtensions(fm.websync.client.getExtensions(responseArgs.getResponse(), connectArgs));
    args2.setTimestamp(fm.websync.client.getTimestamp(responseArgs.getResponse()));
    args2.setClient(this);
    args2.setConnectArgs(connectArgs);
    args2.setDynamicProperties(connectArgs.getDynamicProperties());
    args = args2;
    onStreamFailure = this._onStreamFailure;
    if (!fm.global.equals(onStreamFailure, null)) {
      this.raiseAction(onStreamFailure, args, "Client -> OnStreamFailure");
    }
    if (!fm.global.equals(connectArgs.getOnStreamFailure(), null)) {
      retry = this.raiseRetriable(connectArgs.getOnStreamFailure(), retry, args, "Client -> Connect -> OnStreamFailure");
    }
    connectArgsOut.setValue(args.getConnectArgs());
    return retry;
  };

  client.prototype.raiseSubscribeComplete = function() {
    var args, args2, onSubscribeComplete, responseArgs, subscribeArgs;
    subscribeArgs = arguments[0];
    responseArgs = arguments[1];
    args2 = new fm.websync.subscribeCompleteArgs();
    args2.setExtensions(fm.websync.client.getExtensions(responseArgs.getResponse(), subscribeArgs));
    args2.setIsResubscribe(subscribeArgs.getIsResubscribe());
    args2.setTimestamp(fm.websync.client.getTimestamp(responseArgs.getResponse()));
    args2.setClient(this);
    args2.setDynamicProperties(subscribeArgs.getDynamicProperties());
    args = args2;
    onSubscribeComplete = this._onSubscribeComplete;
    if (!fm.global.equals(onSubscribeComplete, null)) {
      this.raiseAction(onSubscribeComplete, args, "Client -> OnSubscribeComplete");
    }
    if (!fm.global.equals(subscribeArgs.getOnComplete(), null)) {
      return this.raiseAction(subscribeArgs.getOnComplete(), args, "Client -> Subscribe -> OnComplete");
    }
  };

  client.prototype.raiseSubscribeDelivery = function() {
    var args, args2, dynamicProperties, onReceive, reconnectAfter, response;
    onReceive = arguments[0];
    dynamicProperties = arguments[1];
    response = arguments[2];
    reconnectAfter = arguments[3];
    args2 = new fm.websync.subscribeReceiveArgs(response.getBayeuxChannel(), response.__dataJson, response.__dataBytes, this._connectionType, reconnectAfter);
    args2.setExtensions(response.getExtensions());
    args2.setTimestamp(fm.websync.client.getTimestamp(response));
    args2.setClient(this);
    args2.setDynamicProperties(dynamicProperties);
    args = args2;
    if (!fm.global.equals(onReceive, null)) {
      this.raiseActionManual(onReceive, args, "Client -> Subscribe -> OnReceive", true);
    }
    return args.getReconnectAfter();
  };

  client.prototype.raiseSubscribeFailure = function() {
    var args, args2, onSubscribeFailure, responseArgs, retry, subscribeArgs;
    subscribeArgs = arguments[0];
    responseArgs = arguments[1];
    retry = arguments[2];
    args2 = new fm.websync.subscribeFailureArgs();
    args2.__channels = fm.websync.client.getChannelsForSubscribe(responseArgs.getResponse(), subscribeArgs);
    args2.setException(responseArgs.getException());
    args2.setExtensions(fm.websync.client.getExtensions(responseArgs.getResponse(), subscribeArgs));
    args2.setIsResubscribe(subscribeArgs.getIsResubscribe());
    args2.setTimestamp(fm.websync.client.getTimestamp(responseArgs.getResponse()));
    args2.setClient(this);
    args2.setDynamicProperties(subscribeArgs.getDynamicProperties());
    args = args2;
    onSubscribeFailure = this._onSubscribeFailure;
    if (!fm.global.equals(onSubscribeFailure, null)) {
      this.raiseAction(onSubscribeFailure, args, "Client -> OnSubscribeFailure");
    }
    if (!fm.global.equals(subscribeArgs.getOnFailure(), null)) {
      retry = this.raiseRetriable(subscribeArgs.getOnFailure(), retry, args, "Client -> Subscribe -> OnFailure");
    }
    return retry;
  };

  client.prototype.raiseSubscribeSuccess = function() {
    var args, args2, onSubscribeSuccess, responseArgs, subscribeArgs;
    subscribeArgs = arguments[0];
    responseArgs = arguments[1];
    args2 = new fm.websync.subscribeSuccessArgs();
    args2.__channels = fm.websync.client.getChannelsForSubscribe(responseArgs.getResponse(), subscribeArgs);
    args2.setExtensions(fm.websync.client.getExtensions(responseArgs.getResponse(), subscribeArgs));
    args2.setIsResubscribe(subscribeArgs.getIsResubscribe());
    args2.setTimestamp(fm.websync.client.getTimestamp(responseArgs.getResponse()));
    args2.setClient(this);
    args2.setDynamicProperties(subscribeArgs.getDynamicProperties());
    args = args2;
    onSubscribeSuccess = this._onSubscribeSuccess;
    if (!fm.global.equals(onSubscribeSuccess, null)) {
      this.raiseAction(onSubscribeSuccess, args, "Client -> OnSubscribeSuccess");
    }
    if (!fm.global.equals(subscribeArgs.getOnSuccess(), null)) {
      return this.raiseAction(subscribeArgs.getOnSuccess(), args, "Client -> Subscribe -> OnSuccess");
    }
  };

  client.prototype.raiseUnbindComplete = function() {
    var args, args2, forced, onUnbindComplete, responseArgs, unbindArgs;
    unbindArgs = arguments[0];
    responseArgs = arguments[1];
    forced = arguments[2];
    args2 = new fm.websync.unbindCompleteArgs();
    args2.setExtensions(fm.websync.client.getExtensions(responseArgs.getResponse(), unbindArgs));
    args2.setTimestamp(fm.websync.client.getTimestamp(responseArgs.getResponse()));
    args2.setClient(this);
    args2.setDynamicProperties(unbindArgs.getDynamicProperties());
    args2.__forced = forced;
    args = args2;
    onUnbindComplete = this._onUnbindComplete;
    if (!fm.global.equals(onUnbindComplete, null)) {
      this.raiseAction(onUnbindComplete, args, "Client -> OnUnbindComplete");
    }
    if (!fm.global.equals(unbindArgs.getOnComplete(), null)) {
      return this.raiseAction(unbindArgs.getOnComplete(), args, "Client -> Unbind -> OnComplete");
    }
  };

  client.prototype.raiseUnbindFailure = function() {
    var args, args2, onUnbindFailure, responseArgs, retry, unbindArgs;
    unbindArgs = arguments[0];
    responseArgs = arguments[1];
    retry = arguments[2];
    args2 = new fm.websync.unbindFailureArgs();
    args2.__records = fm.websync.client.getRecordsForUnbind(responseArgs.getResponse(), unbindArgs);
    args2.setException(responseArgs.getException());
    args2.setExtensions(fm.websync.client.getExtensions(responseArgs.getResponse(), unbindArgs));
    args2.setTimestamp(fm.websync.client.getTimestamp(responseArgs.getResponse()));
    args2.setClient(this);
    args2.setDynamicProperties(unbindArgs.getDynamicProperties());
    args = args2;
    onUnbindFailure = this._onUnbindFailure;
    if (!fm.global.equals(onUnbindFailure, null)) {
      this.raiseAction(onUnbindFailure, args, "Client -> OnUnbindFailure");
    }
    if (!fm.global.equals(unbindArgs.getOnFailure(), null)) {
      retry = this.raiseRetriable(unbindArgs.getOnFailure(), retry, args, "Client -> Unbind -> OnFailure");
    }
    return retry;
  };

  client.prototype.raiseUnbindSuccess = function() {
    var args, args2, forced, onUnbindSuccess, responseArgs, unbindArgs;
    unbindArgs = arguments[0];
    responseArgs = arguments[1];
    forced = arguments[2];
    args2 = new fm.websync.unbindSuccessArgs();
    args2.__records = fm.websync.client.getRecordsForUnbind(responseArgs.getResponse(), unbindArgs);
    args2.setExtensions(fm.websync.client.getExtensions(responseArgs.getResponse(), unbindArgs));
    args2.setTimestamp(fm.websync.client.getTimestamp(responseArgs.getResponse()));
    args2.setClient(this);
    args2.setDynamicProperties(unbindArgs.getDynamicProperties());
    args2.__forced = forced;
    args = args2;
    onUnbindSuccess = this._onUnbindSuccess;
    if (!fm.global.equals(onUnbindSuccess, null)) {
      this.raiseAction(onUnbindSuccess, args, "Client -> OnUnbindSuccess");
    }
    if (!fm.global.equals(unbindArgs.getOnSuccess(), null)) {
      return this.raiseAction(unbindArgs.getOnSuccess(), args, "Client -> Unbind -> OnSuccess");
    }
  };

  client.prototype.raiseUnsubscribeComplete = function() {
    var args, args2, forced, onUnsubscribeComplete, responseArgs, unsubscribeArgs;
    unsubscribeArgs = arguments[0];
    responseArgs = arguments[1];
    forced = arguments[2];
    args2 = new fm.websync.unsubscribeCompleteArgs();
    args2.setExtensions(fm.websync.client.getExtensions(responseArgs.getResponse(), unsubscribeArgs));
    args2.setTimestamp(fm.websync.client.getTimestamp(responseArgs.getResponse()));
    args2.setClient(this);
    args2.setDynamicProperties(unsubscribeArgs.getDynamicProperties());
    args2.__forced = forced;
    args = args2;
    onUnsubscribeComplete = this._onUnsubscribeComplete;
    if (!fm.global.equals(onUnsubscribeComplete, null)) {
      this.raiseAction(onUnsubscribeComplete, args, "Client -> OnUnsubscribeComplete");
    }
    if (!fm.global.equals(unsubscribeArgs.getOnComplete(), null)) {
      return this.raiseAction(unsubscribeArgs.getOnComplete(), args, "Client -> Unsubscribe -> OnComplete");
    }
  };

  client.prototype.raiseUnsubscribeFailure = function() {
    var args, args2, onUnsubscribeFailure, responseArgs, retry, unsubscribeArgs;
    unsubscribeArgs = arguments[0];
    responseArgs = arguments[1];
    retry = arguments[2];
    args2 = new fm.websync.unsubscribeFailureArgs();
    args2.__channels = fm.websync.client.getChannelsForUnsubscribe(responseArgs.getResponse(), unsubscribeArgs);
    args2.setException(responseArgs.getException());
    args2.setExtensions(fm.websync.client.getExtensions(responseArgs.getResponse(), unsubscribeArgs));
    args2.setTimestamp(fm.websync.client.getTimestamp(responseArgs.getResponse()));
    args2.setClient(this);
    args2.setDynamicProperties(unsubscribeArgs.getDynamicProperties());
    args = args2;
    onUnsubscribeFailure = this._onUnsubscribeFailure;
    if (!fm.global.equals(onUnsubscribeFailure, null)) {
      this.raiseAction(onUnsubscribeFailure, args, "Client -> OnUnsubscribeFailure");
    }
    if (!fm.global.equals(unsubscribeArgs.getOnFailure(), null)) {
      retry = this.raiseRetriable(unsubscribeArgs.getOnFailure(), retry, args, "Client -> Unsubscribe -> OnFailure");
    }
    return retry;
  };

  client.prototype.raiseUnsubscribeSuccess = function() {
    var args, args2, forced, onUnsubscribeSuccess, responseArgs, unsubscribeArgs;
    unsubscribeArgs = arguments[0];
    responseArgs = arguments[1];
    forced = arguments[2];
    args2 = new fm.websync.unsubscribeSuccessArgs();
    args2.__channels = fm.websync.client.getChannelsForUnsubscribe(responseArgs.getResponse(), unsubscribeArgs);
    args2.setExtensions(fm.websync.client.getExtensions(responseArgs.getResponse(), unsubscribeArgs));
    args2.setTimestamp(fm.websync.client.getTimestamp(responseArgs.getResponse()));
    args2.setClient(this);
    args2.setDynamicProperties(unsubscribeArgs.getDynamicProperties());
    args2.__forced = forced;
    args = args2;
    onUnsubscribeSuccess = this._onUnsubscribeSuccess;
    if (!fm.global.equals(onUnsubscribeSuccess, null)) {
      this.raiseAction(onUnsubscribeSuccess, args, "Client -> OnUnsubscribeSuccess");
    }
    if (!fm.global.equals(unsubscribeArgs.getOnSuccess(), null)) {
      return this.raiseAction(unsubscribeArgs.getOnSuccess(), args, "Client -> Unsubscribe -> OnSuccess");
    }
  };

  client.prototype.receiveMessage = function() {
    var _var0, _var1, _var2, _var3, _var4, _var5, _var6, _var7, dictionary, dictionary2, dictionary3, i, j, k, l, len, len1, len2, len3, list, list2, list3, m, message, onNotify, onReceive, reconnectAfter, serverAction, str, str2;
    message = arguments[0];
    reconnectAfter = arguments[1];
    if (fm.global.equals(message.getBayeuxChannel(), "/meta/notify")) {
      if (fm.global.equals(message.getTag(), "fm.server")) {
        serverAction = fm.websync.message.fromJson(message.getDataJson());
        reconnectAfter = this.processServerAction(serverAction, reconnectAfter);
      } else {
        onNotify = this._onNotify;
        if (!fm.global.equals(onNotify, null)) {
          reconnectAfter = this.raiseNotifyDelivery(onNotify, message, reconnectAfter);
        }
      }
      return reconnectAfter;
    }
    list = [];
    list2 = [];
    _var0 = fm.hashExtensions.getKeys(this._customOnReceives);
    for (j = 0, len = _var0.length; j < len; j++) {
      str = _var0[j];
      dictionary = this._customOnReceives[str];
      _var1 = fm.hashExtensions.getKeys(dictionary);
      for (k = 0, len1 = _var1.length; k < len1; k++) {
        str2 = _var1[k];
        if (fm.global.equals(str2, message.getChannel())) {
          fm.arrayExtensions.add(list, dictionary[str2]);
          fm.arrayExtensions.add(list2, {});
        }
      }
    }
    _var2 = fm.hashExtensions.getKeys(this._subscribedOnReceives);
    for (l = 0, len2 = _var2.length; l < len2; l++) {
      str = _var2[l];
      dictionary2 = this._subscribedOnReceives[str];
      _var3 = fm.hashExtensions.getKeys(dictionary2);
      for (m = 0, len3 = _var3.length; m < len3; m++) {
        str2 = _var3[m];
        if (fm.global.equals(str2, message.getChannel())) {
          fm.arrayExtensions.add(list, dictionary2[str2]);
          dictionary3 = null;
          _var4 = new fm.holder(dictionary3);
          _var5 = fm.hashExtensions.tryGetValue(this._subscribedDynamicProperties, fm.websync.client.getSubscribeKey(str2, str), _var4);
          dictionary3 = _var4.getValue();
          if (!_var5) {
            dictionary3 = {};
          }
          fm.arrayExtensions.add(list2, dictionary3);
        }
      }
    }
    if (fm.global.equals(fm.arrayExtensions.getCount(list), 0)) {
      list3 = null;
      _var6 = new fm.holder(list3);
      _var7 = fm.hashExtensions.tryGetValue(this._pendingReceives, message.getChannel(), _var6);
      list3 = _var6.getValue();
      if (!_var7) {
        list3 = [];
        this._pendingReceives[message.getChannel()] = list3;
      }
      fm.arrayExtensions.add(list3, message);
      return reconnectAfter;
    }
    i = 0;
    while (i < fm.arrayExtensions.getCount(list)) {
      try {
        onReceive = list[i];
        dictionary3 = null;
        if (i < fm.arrayExtensions.getCount(list2)) {
          dictionary3 = list2[i];
        }
        reconnectAfter = this.raiseSubscribeDelivery(onReceive, dictionary3, message, reconnectAfter);
      } finally {
        i++;
      }
    }
    return reconnectAfter;
  };

  client.prototype.receiveSink = function() {
    var e;
    e = arguments[0];
    return fm.log.warn("Received message on channel with no receive handler.");
  };

  client.prototype.reconnect = function() {
    var _var0, _var1, connectArgs, connectArgsOut, flag, responseArgs;
    connectArgs = arguments[0];
    responseArgs = arguments[1];
    connectArgsOut = null;
    _var0 = new fm.holder(connectArgsOut);
    _var1 = this.raiseStreamFailure(connectArgs, responseArgs, true, _var0);
    connectArgsOut = _var0.getValue();
    flag = _var1;
    if (fm.global.equals(connectArgsOut, null)) {
      connectArgsOut = connectArgs;
    }
    this.raiseForcedUnsubscribes(connectArgs, responseArgs);
    this.raiseForcedUnbinds(connectArgs, responseArgs);
    this.clearBoundRecords();
    this.clearSubscribedChannels();
    this.setIsConnected(false);
    this._queueActivated = false;
    if (flag) {
      connectArgs.setIsReconnect(true);
      connectArgs.setLastClientId(this.getClientId());
      connectArgs.setLastSessionId(this.getSessionId());
      return this.connect(connectArgs);
    }
  };

  client.prototype.removeBoundRecords = function() {
    var _var0, j, len, record, records, results;
    records = arguments[0];
    _var0 = records;
    results = [];
    for (j = 0, len = _var0.length; j < len; j++) {
      record = _var0[j];
      results.push(fm.hashExtensions.remove(this._boundRecords, record.getKey()));
    }
    return results;
  };


  /*<span id='method-fm.websync.client-removeOnBindComplete'>&nbsp;</span> */


  /**
  	 <div>
  	 Removes a handler that is raised whenever a client completes a bind, successfully or not.
  	 </div>
  
  	@function removeOnBindComplete
  	@param {fm.singleAction} value
  	@return {void}
   */

  client.prototype.removeOnBindComplete = function() {
    var value;
    value = arguments[0];
    return this._onBindComplete = fm.delegate.remove(this._onBindComplete, value);
  };


  /*<span id='method-fm.websync.client-removeOnBindFailure'>&nbsp;</span> */


  /**
  	 <div>
  	 Removes a handler that is raised whenever a client fails to bind.
  	 </div>
  
  	@function removeOnBindFailure
  	@param {fm.singleAction} value
  	@return {void}
   */

  client.prototype.removeOnBindFailure = function() {
    var value;
    value = arguments[0];
    return this._onBindFailure = fm.delegate.remove(this._onBindFailure, value);
  };


  /*<span id='method-fm.websync.client-removeOnBindSuccess'>&nbsp;</span> */


  /**
  	 <div>
  	 Removes a handler that is raised whenever a client successfully binds.
  	 </div>
  
  	@function removeOnBindSuccess
  	@param {fm.singleAction} value
  	@return {void}
   */

  client.prototype.removeOnBindSuccess = function() {
    var value;
    value = arguments[0];
    return this._onBindSuccess = fm.delegate.remove(this._onBindSuccess, value);
  };


  /*<span id='method-fm.websync.client-removeOnConnectComplete'>&nbsp;</span> */


  /**
  	 <div>
  	 Removes a handler that is raised whenever a client completes a connect, successfully or not.
  	 </div>
  
  	@function removeOnConnectComplete
  	@param {fm.singleAction} value
  	@return {void}
   */

  client.prototype.removeOnConnectComplete = function() {
    var value;
    value = arguments[0];
    return this._onConnectComplete = fm.delegate.remove(this._onConnectComplete, value);
  };


  /*<span id='method-fm.websync.client-removeOnConnectFailure'>&nbsp;</span> */


  /**
  	 <div>
  	 Removes a handler that is raised whenever a client fails to connect.
  	 </div>
  
  	@function removeOnConnectFailure
  	@param {fm.singleAction} value
  	@return {void}
   */

  client.prototype.removeOnConnectFailure = function() {
    var value;
    value = arguments[0];
    return this._onConnectFailure = fm.delegate.remove(this._onConnectFailure, value);
  };


  /*<span id='method-fm.websync.client-removeOnConnectSuccess'>&nbsp;</span> */


  /**
  	 <div>
  	 Removes a handler that is raised whenever a client successfully connects.
  	 </div>
  
  	@function removeOnConnectSuccess
  	@param {fm.singleAction} value
  	@return {void}
   */

  client.prototype.removeOnConnectSuccess = function() {
    var value;
    value = arguments[0];
    return this._onConnectSuccess = fm.delegate.remove(this._onConnectSuccess, value);
  };


  /*<span id='method-fm.websync.client-removeOnDisconnectComplete'>&nbsp;</span> */


  /**
  	 <div>
  	 Removes a handler that is raised whenever a client completes a disconnect.
  	 </div>
  
  	@function removeOnDisconnectComplete
  	@param {fm.singleAction} value
  	@return {void}
   */

  client.prototype.removeOnDisconnectComplete = function() {
    var value;
    value = arguments[0];
    return this._onDisconnectComplete = fm.delegate.remove(this._onDisconnectComplete, value);
  };


  /*<span id='method-fm.websync.client-removeOnNotify'>&nbsp;</span> */


  /**
  	 <div>
  	 Removes a handler that is raised whenever a notification is sent to this client.
  	 </div>
  
  	@function removeOnNotify
  	@param {fm.singleAction} value
  	@return {void}
   */

  client.prototype.removeOnNotify = function() {
    var value;
    value = arguments[0];
    return this._onNotify = fm.delegate.remove(this._onNotify, value);
  };


  /*<span id='method-fm.websync.client-removeOnNotifyComplete'>&nbsp;</span> */


  /**
  	 <div>
  	 Removes a handler that is raised whenever a client completes a notify, successfully or not.
  	 </div>
  
  	@function removeOnNotifyComplete
  	@param {fm.singleAction} value
  	@return {void}
   */

  client.prototype.removeOnNotifyComplete = function() {
    var value;
    value = arguments[0];
    return this._onNotifyComplete = fm.delegate.remove(this._onNotifyComplete, value);
  };


  /*<span id='method-fm.websync.client-removeOnNotifyFailure'>&nbsp;</span> */


  /**
  	 <div>
  	 Removes a handler that is raised whenever a client fails to notify.
  	 </div>
  
  	@function removeOnNotifyFailure
  	@param {fm.singleAction} value
  	@return {void}
   */

  client.prototype.removeOnNotifyFailure = function() {
    var value;
    value = arguments[0];
    return this._onNotifyFailure = fm.delegate.remove(this._onNotifyFailure, value);
  };


  /*<span id='method-fm.websync.client-removeOnNotifySuccess'>&nbsp;</span> */


  /**
  	 <div>
  	 Removes a handler that is raised whenever a client successfully notifies.
  	 </div>
  
  	@function removeOnNotifySuccess
  	@param {fm.singleAction} value
  	@return {void}
   */

  client.prototype.removeOnNotifySuccess = function() {
    var value;
    value = arguments[0];
    return this._onNotifySuccess = fm.delegate.remove(this._onNotifySuccess, value);
  };


  /*<span id='method-fm.websync.client-removeOnPublishComplete'>&nbsp;</span> */


  /**
  	 <div>
  	 Removes a handler that is raised whenever a client completes a publish, successfully or not.
  	 </div>
  
  	@function removeOnPublishComplete
  	@param {fm.singleAction} value
  	@return {void}
   */

  client.prototype.removeOnPublishComplete = function() {
    var value;
    value = arguments[0];
    return this._onPublishComplete = fm.delegate.remove(this._onPublishComplete, value);
  };


  /*<span id='method-fm.websync.client-removeOnPublishFailure'>&nbsp;</span> */


  /**
  	 <div>
  	 Removes a handler that is raised whenever a client fails to publish.
  	 </div>
  
  	@function removeOnPublishFailure
  	@param {fm.singleAction} value
  	@return {void}
   */

  client.prototype.removeOnPublishFailure = function() {
    var value;
    value = arguments[0];
    return this._onPublishFailure = fm.delegate.remove(this._onPublishFailure, value);
  };


  /*<span id='method-fm.websync.client-removeOnPublishSuccess'>&nbsp;</span> */


  /**
  	 <div>
  	 Removes a handler that is raised whenever a client successfully publishes.
  	 </div>
  
  	@function removeOnPublishSuccess
  	@param {fm.singleAction} value
  	@return {void}
   */

  client.prototype.removeOnPublishSuccess = function() {
    var value;
    value = arguments[0];
    return this._onPublishSuccess = fm.delegate.remove(this._onPublishSuccess, value);
  };


  /*<span id='method-fm.websync.client-removeOnServerBind'>&nbsp;</span> */


  /**
  	 <div>
  	 Removes a handler that is raised whenever the server binds
  	 the client to a record or set of records.
  	 </div>
  
  	@function removeOnServerBind
  	@param {fm.singleAction} value
  	@return {void}
   */

  client.prototype.removeOnServerBind = function() {
    var value;
    value = arguments[0];
    return this._onServerBind = fm.delegate.remove(this._onServerBind, value);
  };


  /*<span id='method-fm.websync.client-removeOnServerSubscribe'>&nbsp;</span> */


  /**
  	 <div>
  	 Removes a handler that is raised whenever the server subscribes
  	 the client to a channel or set of channels.
  	 </div>
  
  	@function removeOnServerSubscribe
  	@param {fm.singleFunction} value
  	@return {void}
   */

  client.prototype.removeOnServerSubscribe = function() {
    var value;
    value = arguments[0];
    return this._onServerSubscribe = fm.delegate.remove(this._onServerSubscribe, value);
  };


  /*<span id='method-fm.websync.client-removeOnServerUnbind'>&nbsp;</span> */


  /**
  	 <div>
  	 Removes a handler that is raised whenever the server unbinds
  	 the client from a record or set of records.
  	 </div>
  
  	@function removeOnServerUnbind
  	@param {fm.singleAction} value
  	@return {void}
   */

  client.prototype.removeOnServerUnbind = function() {
    var value;
    value = arguments[0];
    return this._onServerUnbind = fm.delegate.remove(this._onServerUnbind, value);
  };


  /*<span id='method-fm.websync.client-removeOnServerUnsubscribe'>&nbsp;</span> */


  /**
  	 <div>
  	 Removes a handler that is raised whenever the server unsubscribes
  	 the client from a channel or set of channels.
  	 </div>
  
  	@function removeOnServerUnsubscribe
  	@param {fm.singleAction} value
  	@return {void}
   */

  client.prototype.removeOnServerUnsubscribe = function() {
    var value;
    value = arguments[0];
    return this._onServerUnsubscribe = fm.delegate.remove(this._onServerUnsubscribe, value);
  };


  /*<span id='method-fm.websync.client-removeOnServiceComplete'>&nbsp;</span> */


  /**
  	 <div>
  	 Removes a handler that is raised whenever a client completes a service, successfully or not.
  	 </div>
  
  	@function removeOnServiceComplete
  	@param {fm.singleAction} value
  	@return {void}
   */

  client.prototype.removeOnServiceComplete = function() {
    var value;
    value = arguments[0];
    return this._onServiceComplete = fm.delegate.remove(this._onServiceComplete, value);
  };


  /*<span id='method-fm.websync.client-removeOnServiceFailure'>&nbsp;</span> */


  /**
  	 <div>
  	 Removes a handler that is raised whenever a client fails to service.
  	 </div>
  
  	@function removeOnServiceFailure
  	@param {fm.singleAction} value
  	@return {void}
   */

  client.prototype.removeOnServiceFailure = function() {
    var value;
    value = arguments[0];
    return this._onServiceFailure = fm.delegate.remove(this._onServiceFailure, value);
  };


  /*<span id='method-fm.websync.client-removeOnServiceSuccess'>&nbsp;</span> */


  /**
  	 <div>
  	 Removes a handler that is raised whenever a client successfully services.
  	 </div>
  
  	@function removeOnServiceSuccess
  	@param {fm.singleAction} value
  	@return {void}
   */

  client.prototype.removeOnServiceSuccess = function() {
    var value;
    value = arguments[0];
    return this._onServiceSuccess = fm.delegate.remove(this._onServiceSuccess, value);
  };


  /*<span id='method-fm.websync.client-removeOnStateRestored'>&nbsp;</span> */


  /**
  	 <div>
  	 Removes a handler that is raised whenever the client's state is restored after a reconnection.
  	 </div>
  
  	@function removeOnStateRestored
  	@param {fm.singleAction} value
  	@return {void}
   */

  client.prototype.removeOnStateRestored = function() {
    var value;
    value = arguments[0];
    return this._onStateRestored = fm.delegate.remove(this._onStateRestored, value);
  };


  /*<span id='method-fm.websync.client-removeOnStreamFailure'>&nbsp;</span> */


  /**
  	 <div>
  	 Removes a handler that is raised whenever the client's streaming connection breaks down.
  	 </div>
  
  	@function removeOnStreamFailure
  	@param {fm.singleAction} value
  	@return {void}
   */

  client.prototype.removeOnStreamFailure = function() {
    var value;
    value = arguments[0];
    return this._onStreamFailure = fm.delegate.remove(this._onStreamFailure, value);
  };


  /*<span id='method-fm.websync.client-removeOnSubscribeComplete'>&nbsp;</span> */


  /**
  	 <div>
  	 Removes a handler that is raised whenever a client completes a subscribe, successfully or not.
  	 </div>
  
  	@function removeOnSubscribeComplete
  	@param {fm.singleAction} value
  	@return {void}
   */

  client.prototype.removeOnSubscribeComplete = function() {
    var value;
    value = arguments[0];
    return this._onSubscribeComplete = fm.delegate.remove(this._onSubscribeComplete, value);
  };


  /*<span id='method-fm.websync.client-removeOnSubscribeFailure'>&nbsp;</span> */


  /**
  	 <div>
  	 Removes a handler that is raised whenever a client fails to subscribe.
  	 </div>
  
  	@function removeOnSubscribeFailure
  	@param {fm.singleAction} value
  	@return {void}
   */

  client.prototype.removeOnSubscribeFailure = function() {
    var value;
    value = arguments[0];
    return this._onSubscribeFailure = fm.delegate.remove(this._onSubscribeFailure, value);
  };


  /*<span id='method-fm.websync.client-removeOnSubscribeSuccess'>&nbsp;</span> */


  /**
  	 <div>
  	 Removes a handler that is raised whenever a client successfully subscribes.
  	 </div>
  
  	@function removeOnSubscribeSuccess
  	@param {fm.singleAction} value
  	@return {void}
   */

  client.prototype.removeOnSubscribeSuccess = function() {
    var value;
    value = arguments[0];
    return this._onSubscribeSuccess = fm.delegate.remove(this._onSubscribeSuccess, value);
  };


  /*<span id='method-fm.websync.client-removeOnUnbindComplete'>&nbsp;</span> */


  /**
  	 <div>
  	 Removes a handler that is raised whenever a client completes an unbind, successfully or not.
  	 </div>
  
  	@function removeOnUnbindComplete
  	@param {fm.singleAction} value
  	@return {void}
   */

  client.prototype.removeOnUnbindComplete = function() {
    var value;
    value = arguments[0];
    return this._onUnbindComplete = fm.delegate.remove(this._onUnbindComplete, value);
  };


  /*<span id='method-fm.websync.client-removeOnUnbindFailure'>&nbsp;</span> */


  /**
  	 <div>
  	 Removes a handler that is raised whenever a client fails to unbind.
  	 </div>
  
  	@function removeOnUnbindFailure
  	@param {fm.singleAction} value
  	@return {void}
   */

  client.prototype.removeOnUnbindFailure = function() {
    var value;
    value = arguments[0];
    return this._onUnbindFailure = fm.delegate.remove(this._onUnbindFailure, value);
  };


  /*<span id='method-fm.websync.client-removeOnUnbindSuccess'>&nbsp;</span> */


  /**
  	 <div>
  	 Removes a handler that is raised whenever a client successfully unbinds.
  	 </div>
  
  	@function removeOnUnbindSuccess
  	@param {fm.singleAction} value
  	@return {void}
   */

  client.prototype.removeOnUnbindSuccess = function() {
    var value;
    value = arguments[0];
    return this._onUnbindSuccess = fm.delegate.remove(this._onUnbindSuccess, value);
  };


  /*<span id='method-fm.websync.client-removeOnUnsubscribeComplete'>&nbsp;</span> */


  /**
  	 <div>
  	 Removes a handler that is raised whenever a client completes an unsubscribe, successfully or not.
  	 </div>
  
  	@function removeOnUnsubscribeComplete
  	@param {fm.singleAction} value
  	@return {void}
   */

  client.prototype.removeOnUnsubscribeComplete = function() {
    var value;
    value = arguments[0];
    return this._onUnsubscribeComplete = fm.delegate.remove(this._onUnsubscribeComplete, value);
  };


  /*<span id='method-fm.websync.client-removeOnUnsubscribeFailure'>&nbsp;</span> */


  /**
  	 <div>
  	 Removes a handler that is raised whenever a client fails to unsubscribe.
  	 </div>
  
  	@function removeOnUnsubscribeFailure
  	@param {fm.singleAction} value
  	@return {void}
   */

  client.prototype.removeOnUnsubscribeFailure = function() {
    var value;
    value = arguments[0];
    return this._onUnsubscribeFailure = fm.delegate.remove(this._onUnsubscribeFailure, value);
  };


  /*<span id='method-fm.websync.client-removeOnUnsubscribeSuccess'>&nbsp;</span> */


  /**
  	 <div>
  	 Removes a handler that is raised whenever a client successfully unsubscribes.
  	 </div>
  
  	@function removeOnUnsubscribeSuccess
  	@param {fm.singleAction} value
  	@return {void}
   */

  client.prototype.removeOnUnsubscribeSuccess = function() {
    var value;
    value = arguments[0];
    return this._onUnsubscribeSuccess = fm.delegate.remove(this._onUnsubscribeSuccess, value);
  };

  client.prototype.removeSubscribedChannels = function() {
    var _var0, _var1, _var2, channels, dictionary, j, len, str, tag;
    tag = arguments[0];
    channels = arguments[1];
    dictionary = null;
    _var0 = new fm.holder(dictionary);
    _var1 = fm.hashExtensions.tryGetValue(this._subscribedChannels, tag, _var0);
    dictionary = _var0.getValue();
    if (_var1) {
      _var2 = channels;
      for (j = 0, len = _var2.length; j < len; j++) {
        str = _var2[j];
        fm.hashExtensions.remove(dictionary, str);
      }
      if (fm.global.equals(fm.hashExtensions.getCount(dictionary), 0)) {
        return fm.hashExtensions.remove(this._subscribedChannels, tag);
      }
    }
  };

  client.prototype.removeSubscribedOnReceive = function() {
    var _var0, _var1, _var2, channels, dictionary, j, len, str, tag;
    tag = arguments[0];
    channels = arguments[1];
    dictionary = null;
    _var0 = new fm.holder(dictionary);
    _var1 = fm.hashExtensions.tryGetValue(this._subscribedOnReceives, tag, _var0);
    dictionary = _var0.getValue();
    if (_var1) {
      _var2 = channels;
      for (j = 0, len = _var2.length; j < len; j++) {
        str = _var2[j];
        fm.hashExtensions.remove(dictionary, str);
        fm.hashExtensions.remove(this._subscribedDynamicProperties, fm.websync.client.getSubscribeKey(str, tag));
      }
      if (fm.global.equals(fm.hashExtensions.getCount(dictionary), 0)) {
        return fm.hashExtensions.remove(this._subscribedOnReceives, tag);
      }
    }
  };

  client.prototype.restream = function() {
    var connectArgs, receivedMessages, reconnectAfter, state;
    connectArgs = arguments[0];
    receivedMessages = arguments[1];
    reconnectAfter = arguments[2];
    if (reconnectAfter < this._lastInterval) {
      reconnectAfter = this._lastInterval;
    }
    if ((fm.global.equals(this.getConcurrencyMode(), fm.websync.concurrencyMode.Low)) && (reconnectAfter > 0)) {
      state = new fm.websync.deferredStreamState();
      state.setConnectArgs(connectArgs);
      state.setReceivedMessages(receivedMessages);
      return fm.deferrer.defer(this.streamDeferred, reconnectAfter, state);
    } else {
      return this.stream(connectArgs, receivedMessages);
    }
  };

  client.prototype.retryConnect = function() {
    var backoffTimeout, connectArgs;
    connectArgs = arguments[0];
    backoffTimeout = arguments[1];
    this._lastBackoffIndex++;
    this._lastBackoffTimeout = backoffTimeout;
    connectArgs.setIsRetry(true);
    return this.connect(connectArgs);
  };

  client.prototype.retryConnectDeferred = function() {
    var s, state;
    s = arguments[0];
    state = s;
    return this.retryConnect(state.getConnectArgs(), state.getBackoffTimeout());
  };

  client.prototype.send = function() {
    var request, synchronous, timeout, url;
    request = arguments[0];
    url = arguments[1];
    synchronous = arguments[2];
    timeout = arguments[3];
    return this.sendMany([request], url, synchronous, timeout);
  };

  client.prototype.sendCallback = function() {
    var _var0, _var1, _var2, _var3, _var4, advice, args2, dynamicValue, j, k, len, len1, list, message, message2, p, request, responseArgs, results, serverActions;
    responseArgs = arguments[0];
    dynamicValue = responseArgs.getRequestArgs().getDynamicValue(fm.websync.client._stateKey);
    responseArgs.getRequestArgs().unsetDynamicValue(fm.websync.client._stateKey);
    if (!fm.global.equals(responseArgs.getException(), null)) {
      return this.raiseSendException(dynamicValue, responseArgs.getException());
    } else {
      if ((fm.global.equals(responseArgs.getMessages(), null)) || (fm.global.equals(responseArgs.getMessages().length, 0))) {
        return this.raiseSendException(dynamicValue, new Error("Invalid response received from server."));
      } else {
        list = [];
        _var0 = responseArgs.getMessages();
        for (j = 0, len = _var0.length; j < len; j++) {
          message = _var0[j];
          advice = message.getAdvice();
          if (!fm.global.equals(advice, null)) {
            this.processAdvice(advice);
            switch (this._connectionType) {
              case fm.websync.connectionType.WebSocket:
                if (!fm.global.equals(advice.getWebSocket(), null)) {
                  this.processAdvice(advice.getWebSocket());
                }
                break;
              case fm.websync.connectionType.LongPolling:
                if (!fm.global.equals(advice.getLongPolling(), null)) {
                  this.processAdvice(advice.getLongPolling());
                }
                break;
              case fm.websync.connectionType.CallbackPolling:
                if (!fm.global.equals(advice.getCallbackPolling(), null)) {
                  this.processAdvice(advice.getCallbackPolling());
                }
                break;
            }
          }
          if (!dynamicValue.getIsStream() || (fm.global.equals(message.getBayeuxChannel(), "/meta/connect"))) {
            if (fm.stringExtensions.isNullOrEmpty(message.getId())) {
              this.raiseSendException(dynamicValue, new Error(message.getError()));
              return;
            }
            request = null;
            _var1 = new fm.holder(request);
            _var2 = fm.hashExtensions.tryGetValue(dynamicValue.getRequestMapping(), message.getId(), _var1);
            request = _var1.getValue();
            if (!_var2) {
              this.raiseSendException(dynamicValue, new Error(message.getError()));
              return;
            }
            p = new fm.websync.clientResponseArgs();
            p.setDynamicProperties(request.getDynamicProperties());
            p.setResponse(message);
            p.setException((message.getSuccessful() ? null : new Error(message.getError())));
            request.getCallback()(p);
          } else {
            fm.arrayExtensions.add(list, message);
          }
        }
        if (fm.arrayExtensions.getCount(list) > 0) {
          args2 = new fm.websync.clientResponseArgs();
          args2.setDynamicProperties(dynamicValue.getRequests()[0].getDynamicProperties());
          args2.setResponses(fm.arrayExtensions.toArray(list));
          dynamicValue.getRequests()[0].getCallback()(args2);
        }
        _var3 = responseArgs.getMessages();
        results = [];
        for (k = 0, len1 = _var3.length; k < len1; k++) {
          message = _var3[k];
          serverActions = message.getServerActions();
          if (!fm.global.equals(serverActions, null)) {
            _var4 = serverActions;
            results.push((function() {
              var l, len2, results1;
              results1 = [];
              for (l = 0, len2 = _var4.length; l < len2; l++) {
                message2 = _var4[l];
                results1.push(this.processServerAction(message2, this._lastInterval));
              }
              return results1;
            }).call(this));
          } else {
            results.push(void 0);
          }
        }
        return results;
      }
    }
  };

  client.prototype.sendMany = function() {
    var _var0, args3, dictionary, flag, j, len, list, request, requestArgs, requests, responseArgs, state, str, synchronous, timeout, transfer, url;
    requests = arguments[0];
    url = arguments[1];
    synchronous = arguments[2];
    timeout = arguments[3];
    flag = false;
    if (fm.global.equals(requests.length, 1)) {
      flag = fm.global.equals(requests[0].getMessage().getBayeuxChannel(), "/meta/connect");
    }
    dictionary = {};
    list = [];
    _var0 = requests;
    for (j = 0, len = _var0.length; j < len; j++) {
      request = _var0[j];
      if (!(!(!fm.guid.equals(this.getClientId(), fm.guid.empty)) || request.getMessage().isConnect())) {
        request.getMessage().setClientId(this.getClientId());
        request.getMessage().setSessionId(this.getSessionId());
      }
      if (this.getDisableBinary()) {
        request.getMessage().setDisableBinary(this.getDisableBinary());
      }
      this._counter++;
      request.getMessage().setId(fm.intExtensions.toString(this._counter));
      fm.arrayExtensions.add(list, request.getMessage());
      dictionary[request.getMessage().getId()] = request;
    }
    str = this.processRequestUrl(url);
    url = this.processRequestUrl(url);
    if (flag) {
      timeout = this.getStreamRequestTimeout();
    } else {
      if (fm.global.equals(timeout, 0)) {
        timeout = this.getRequestTimeout();
      }
    }
    transfer = (flag ? this._streamRequestTransfer : this._requestTransfer);
    args3 = new fm.websync.messageRequestArgs(this.createHeaders());
    args3.setMessages(fm.arrayExtensions.toArray(list));
    args3.setOnRequestCreated(this.internalOnRequestCreated);
    args3.setOnResponseReceived(this.internalOnResponseReceived);
    args3.setOnHttpRequestCreated(this.internalOnHttpRequestCreated);
    args3.setOnHttpResponseReceived(this.internalOnHttpResponseReceived);
    args3.setSender(this);
    args3.setTimeout(timeout);
    args3.setUrl(url);
    requestArgs = args3;
    requestArgs.setDynamicValue("frameUrl", str);
    state = new fm.websync.clientSendState();
    state.setRequests(requests);
    state.setRequestMapping(dictionary);
    state.setIsStream(flag);
    requestArgs.setDynamicValue(fm.websync.client._stateKey, state);
    if (synchronous) {
      responseArgs = transfer.send(requestArgs);
      return this.sendCallback(responseArgs);
    } else {
      return transfer.sendAsync(requestArgs, this.sendCallback);
    }
  };


  /*<span id='method-fm.websync.client-service'>&nbsp;</span> */


  /**
  	 <div>
  	 Services data to a specified channel.
  	 </div><div>
  	 <p>
  	 Servicing allows the client to send data to the server in a traditional
  	 request/response fashion. Data is not broadcast and the state of the
  	 client remains unchanged after service calls.
  	 </p>
  	 <p>
  	 When the service completes successfully, the OnSuccess callback
  	 will be invoked, passing in the
  	 channel and serviced data, <b>including any modifications made on the server</b>.
  	 </p>
  	 </div>
  	@function service
  	@param {fm.websync.serviceArgs} serviceArgs The service arguments.
  	 See fm.websync.serviceArgs for more details.
  	@return {fm.websync.client} The client.
   */

  client.prototype.service = function() {
    var serviceArgs;
    serviceArgs = arguments[0];
    if (fm.stringExtensions.isNullOrEmpty(serviceArgs.getChannel())) {
      throw new Error("channel cannot be null.");
    }
    this.performService(serviceArgs);
    return this;
  };

  client.prototype.setClientId = function() {
    var value;
    value = arguments[0];
    return this._clientId = value;
  };


  /*<span id='method-fm.websync.client-setCustomOnReceive'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets a callback to be invoked whenever messages are received on the specified
  	 channel.
  	 </div><div>
  	 <p>
  	 This method does <b>not</b> subscribe you to a channel. Rather, it caches a
  	 callback to be executed when messages are received on a particular
  	 channel.
  	 </p>
  	 </div>
  	@function setCustomOnReceive
  	@param {String} channel The channel over which the messages will be received.
  	@param {fm.singleAction} onReceive The callback to invoke when a message is received.
  	@return {void}
   */

  client.prototype.setCustomOnReceive = function() {
    var channel, onReceive;
    channel = arguments[0];
    onReceive = arguments[1];
    return this.setCustomOnReceiveWithTag(channel, fm.stringExtensions.empty, onReceive);
  };


  /*<span id='method-fm.websync.client-setCustomOnReceiveWithTag'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets a callback to be invoked whenever messages are received on the specified
  	 channel. The tag allows multiple callbacks to be registered for
  	 the same channel.
  	 </div><div>
  	 <p>
  	 This method does <b>not</b> subscribe you to a channel. Rather, it caches a
  	 callback to be executed when messages are received on a particular
  	 channel.
  	 </p>
  	 </div>
  	@function setCustomOnReceiveWithTag
  	@param {String} channel The channel over which the messages will be received.
  	@param {String} tag The identifier for this callback.
  	@param {fm.singleAction} onReceive The callback to invoke when a message is received.
  	@return {void}
   */

  client.prototype.setCustomOnReceiveWithTag = function() {
    var _var0, _var1, channel, dictionary, onReceive, tag;
    channel = arguments[0];
    tag = arguments[1];
    onReceive = arguments[2];
    if (fm.global.equals(channel, null)) {
      throw new Error("channel cannot be null.");
    }
    if (fm.global.equals(onReceive, null)) {
      throw new Error("onReceive cannot be null.");
    }
    if (fm.global.equals(tag, null)) {
      tag = fm.stringExtensions.empty;
    }
    dictionary = null;
    _var0 = new fm.holder(dictionary);
    _var1 = fm.hashExtensions.tryGetValue(this._customOnReceives, tag, _var0);
    dictionary = _var0.getValue();
    if (!_var1) {
      dictionary = {};
      this._customOnReceives[tag] = dictionary;
    }
    dictionary[channel] = onReceive;
    return this.processPendingReceives([channel], this._lastInterval);
  };


  /*<span id='method-fm.websync.client-setDisableWebSockets'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets whether to disable WebSocket protocol support and use long-polling,
  	 even if the server is capable of accepting WebSocket requests.
  	 </div>
  
  	@function setDisableWebSockets
  	@param {Boolean} value
  	@return {void}
   */

  client.prototype.setDisableWebSockets = function() {
    var value;
    value = arguments[0];
    return this._disableWebSockets = value;
  };


  /*<span id='method-fm.websync.client-setInstanceId'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets a locally-generated instance ID. This value is set immediately upon construction,
  	 is local-only, and does not change for the duration of this client instance, unless overriden
  	 by application code.
  	 </div>
  
  	@function setInstanceId
  	@param {fm.guid} value
  	@return {void}
   */

  client.prototype.setInstanceId = function() {
    var value;
    value = arguments[0];
    return this._instanceId = value;
  };

  client.prototype.setIsConnected = function() {
    var value;
    value = arguments[0];
    return this._isConnected = value;
  };

  client.prototype.setIsConnecting = function() {
    var value;
    value = arguments[0];
    return this._isConnecting = value;
  };

  client.prototype.setIsDisconnecting = function() {
    var value;
    value = arguments[0];
    return this._isDisconnecting = value;
  };

  client.prototype.setServerTimeout = function() {
    var value;
    value = arguments[0];
    return this._serverTimeout = value;
  };

  client.prototype.setSessionId = function() {
    var value;
    value = arguments[0];
    return this._sessionId = value;
  };


  /*<span id='method-fm.websync.client-setStreamRequestUrl'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the absolute URL of the WebSync request handler for streaming connections, typically
  	 ending with websync.ashx.
  	 </div>
  
  	@function setStreamRequestUrl
  	@param {String} value
  	@return {void}
   */

  client.prototype.setStreamRequestUrl = function() {
    var value;
    value = arguments[0];
    if (fm.global.equals(value, null)) {
      throw new Error("Stream request URL cannot be null.");
    }
    return this.__streamRequestUrl = fm.httpTransfer.replaceWildcards(value);
  };


  /*<span id='method-fm.websync.client-setSynchronous'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets whether or not to execute client methods synchronously. This approach is not
  	 recommended for UI threads, as it will block until the request completes.
  	 Defaults to <c>false</c>.
  	 </div>
  
  	@function setSynchronous
  	@param {fm.nullable} value
  	@return {void}
   */

  client.prototype.setSynchronous = function() {
    var value;
    value = arguments[0];
    return this._synchronous = value;
  };


  /*<span id='method-fm.websync.client-setToken'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the token sent with each request for load balancing purposes.
  	 </div>
  
  	@function setToken
  	@param {String} value
  	@return {void}
   */

  client.prototype.setToken = function() {
    var value;
    value = arguments[0];
    return this._token = value;
  };


  /*<span id='method-fm.websync.client-startBatch'>&nbsp;</span> */


  /**
  	 <div>
  	 Flags the start of a batch of requests to be sent together to the server.
  	 </div><div>
  	 This is used in conjunction with <see cref="fm.websync.client.endBatch">fm.websync.client.endBatch</see>, which flags
  	 the end of a batch of requests and starts sending them to the server. Batching
  	 is used to optimize round-trips to the server by reducing the overhead
  	 associated with creating multiple HTTP requests.
  	 </div>
  	@function startBatch
  	@return {fm.websync.client} The client.
   */

  client.prototype.startBatch = function() {
    this._batchCounter++;
    return this;
  };

  client.prototype.stream = function() {
    var connectArgs, message, receivedMessages, request, request2;
    connectArgs = arguments[0];
    receivedMessages = arguments[1];
    request2 = new fm.websync.clientRequest();
    message = new fm.websync.message("/meta/connect");
    message.setConnectionType(this._connectionType);
    message.setAcknowledgement(receivedMessages);
    request2.setMessage(message);
    request2.setCallback(this.streamCallback);
    request = request2;
    request.setDynamicValue(fm.websync.client._argsKey, connectArgs);
    return this.send(request, this.getStreamRequestUrl(), false, 0);
  };

  client.prototype.streamCallback = function() {
    var _var0, dynamicValue, j, lastInterval, len, message, responseArgs, threadId;
    responseArgs = arguments[0];
    dynamicValue = responseArgs.getDynamicValue(fm.websync.client._argsKey);
    if (((this.getIsConnected() && !this.getIsConnecting()) && !this.getIsDisconnecting()) && !this._disconnectCalled) {
      if (!fm.global.equals(responseArgs.getException(), null)) {
        if (!fm.global.equals(responseArgs.getResponses(), null)) {
          if ((this._lastReconnect !== null) && (fm.global.equals(this._lastReconnect, fm.websync.reconnect.Retry))) {
            return this.restream(dynamicValue, false, this._lastInterval);
          } else {
            return this.reconnect(dynamicValue, responseArgs);
          }
        } else {
          return this.reconnect(dynamicValue, responseArgs);
        }
      } else {
        if ((fm.global.equals(responseArgs.getResponses().length, 1)) && (fm.global.equals(responseArgs.getResponses()[0].getBayeuxChannel(), "/meta/connect"))) {
          return this.restream(dynamicValue, false, this._lastInterval);
        } else {
          lastInterval = this._lastInterval;
          threadId = this.getThreadId();
          this.preRaise(threadId);
          try {
            _var0 = responseArgs.getResponses();
            for (j = 0, len = _var0.length; j < len; j++) {
              message = _var0[j];
              lastInterval = this.receiveMessage(message, lastInterval);
            }
          } finally {
            this.postRaise(threadId);
          }
          return this.restream(dynamicValue, true, lastInterval);
        }
      }
    }
  };

  client.prototype.streamDeferred = function() {
    var s, state;
    s = arguments[0];
    state = s;
    return this.stream(state.getConnectArgs(), state.getReceivedMessages());
  };


  /*<span id='method-fm.websync.client-subscribe'>&nbsp;</span> */


  /**
  	 <div>
  	 Subscribes the client to receive messages on one or more channels.
  	 </div><div>
  	 When the subscribe completes successfully, the OnSuccess callback
  	 will be invoked, passing in the subscribed
  	 channel(s), <b>including any modifications made on the server</b>.
  	 </div>
  	@function subscribe
  	@param {fm.websync.subscribeArgs} subscribeArgs The subscribe arguments.
  	 See fm.websync.subscribeArgs for details.
  	@return {fm.websync.client} The client.
   */

  client.prototype.subscribe = function() {
    var subscribeArgs;
    subscribeArgs = arguments[0];
    if ((fm.global.equals(subscribeArgs.getChannels(), null)) || (fm.global.equals(subscribeArgs.getChannels().length, 0))) {
      throw new Error("channels cannot be null.");
    }
    if (fm.global.equals(subscribeArgs.getOnReceive(), null)) {
      subscribeArgs.setOnReceive(this.receiveSink);
    }
    if (fm.global.equals(subscribeArgs.getTag(), null)) {
      subscribeArgs.setTag(fm.stringExtensions.empty);
    }
    this.performSubscribe(subscribeArgs);
    return this;
  };

  client.prototype.tryWebSocket = function() {
    var error, exception1, webSocketMessageTransfer;
    try {
      webSocketMessageTransfer = fm.websync.messageTransferFactory.getWebSocketMessageTransfer(this.processRequestUrl(this.getStreamRequestUrl()));
      webSocketMessageTransfer.setHandshakeTimeout(this.getRequestTimeout());
      webSocketMessageTransfer.setStreamTimeout(this.getStreamRequestTimeout());
      webSocketMessageTransfer.setOnRequestCreated(this.internalOnHttpRequestCreated);
      webSocketMessageTransfer.setOnResponseReceived(this.internalOnHttpResponseReceived);
      webSocketMessageTransfer.setOnOpenSuccess(this.webSocketOpenSuccess);
      webSocketMessageTransfer.setOnOpenFailure(this.webSocketOpenFailure);
      webSocketMessageTransfer.setOnStreamFailure(this.webSocketStreamFailure);
      webSocketMessageTransfer.setSender(this);
      this._connectionType = fm.websync.connectionType.WebSocket;
      this._streamRequestTransfer = webSocketMessageTransfer;
      webSocketMessageTransfer.open(this.createHeaders());
      return true;
    } catch (error) {
      exception1 = error;
      return false;
    } finally {

    }
  };


  /*<span id='method-fm.websync.client-unbind'>&nbsp;</span> */


  /**
  	 <div>
  	 Unbinds the client from a public or private data record so it is no longer visible
  	 by other clients or the server.
  	 </div><div>
  	 When the unbind completes successfully, the OnSuccess callback
  	 will be invoked, passing in the unbound
  	 record(s), <b>including any modifications made on the server</b>.
  	 </div>
  	@function unbind
  	@param {fm.websync.unbindArgs} unbindArgs The unbind arguments.
  	 See fm.websync.unbindArgs for details.
  	@return {fm.websync.client} The client.
   */

  client.prototype.unbind = function() {
    var _var0, j, len, record, unbindArgs;
    unbindArgs = arguments[0];
    if ((fm.global.equals(unbindArgs.getRecords(), null)) || (fm.global.equals(unbindArgs.getRecords().length, 0))) {
      throw new Error("records cannot be null.");
    }
    _var0 = unbindArgs.getRecords();
    for (j = 0, len = _var0.length; j < len; j++) {
      record = _var0[j];
      if (fm.global.equals(record.getKey(), null)) {
        throw new Error("key cannot be null.");
      }
    }
    this.performUnbind(unbindArgs);
    return this;
  };


  /*<span id='method-fm.websync.client-unsetCustomOnReceive'>&nbsp;</span> */


  /**
  	 <div>
  	 Unsets a callback invoked whenever messages are received on the specified
  	 channel.
  	 </div><div>
  	 <p>
  	 This method does <b>not</b> unsubscribe you from a channel. Rather, it stop the
  	 callback from executing when messages are received on a particular
  	 channel.
  	 </p>
  	 </div>
  	@function unsetCustomOnReceive
  	@param {String} channel The channel over which the messages are being received.
  	@return {Boolean} true if the callback was previously set; otherwise, false.
   */

  client.prototype.unsetCustomOnReceive = function() {
    var channel;
    channel = arguments[0];
    return this.unsetCustomOnReceiveWithTag(channel, fm.stringExtensions.empty);
  };


  /*<span id='method-fm.websync.client-unsetCustomOnReceiveWithTag'>&nbsp;</span> */


  /**
  	 <div>
  	 Unsets a callback invoked whenever messages are received on the specified
  	 channel.  The tag denotes a specific callback.
  	 </div><div>
  	 <p>
  	 This method does <b>not</b> unsubscribe you from a channel. Rather, it stop the
  	 callback from executing when messages are received on a particular
  	 channel.
  	 </p>
  	 </div>
  	@function unsetCustomOnReceiveWithTag
  	@param {String} channel The channel over which the messages are being received.
  	@param {String} tag The identifier for this callback.
  	@return {Boolean} true if the callback was previously set; otherwise, false.
   */

  client.prototype.unsetCustomOnReceiveWithTag = function() {
    var _var0, _var1, channel, dictionary, tag;
    channel = arguments[0];
    tag = arguments[1];
    if (fm.global.equals(channel, null)) {
      throw new Error("channel cannot be null.");
    }
    if (fm.global.equals(tag, null)) {
      tag = fm.stringExtensions.empty;
    }
    dictionary = null;
    _var0 = new fm.holder(dictionary);
    _var1 = fm.hashExtensions.tryGetValue(this._customOnReceives, tag, _var0);
    dictionary = _var0.getValue();
    if (_var1) {
      if (fm.hashExtensions.remove(dictionary, channel)) {
        if (fm.global.equals(fm.hashExtensions.getCount(dictionary), 0)) {
          fm.hashExtensions.remove(this._customOnReceives, tag);
        }
        return true;
      }
      return false;
    }
    return false;
  };


  /*<span id='method-fm.websync.client-unsubscribe'>&nbsp;</span> */


  /**
  	 <div>
  	 Unsubscribes the client from receiving messages on one or more channels.
  	 </div><div>
  	 When the unsubscribe completes successfully, the OnSuccess callback
  	 will be invoked, passing in the
  	 unsubscribed channel(s), <b>including any modifications made on the server</b>.
  	 </div>
  	@function unsubscribe
  	@param {fm.websync.unsubscribeArgs} unsubscribeArgs The unsubscribe arguments.
  	 See fm.websync.unsubscribeArgs for details.
  	@return {fm.websync.client} The client.
   */

  client.prototype.unsubscribe = function() {
    var unsubscribeArgs;
    unsubscribeArgs = arguments[0];
    if ((fm.global.equals(unsubscribeArgs.getChannels(), null)) || (fm.global.equals(unsubscribeArgs.getChannels().length, 0))) {
      throw new Error("channels cannot be null.");
    }
    if (fm.global.equals(unsubscribeArgs.getTag(), null)) {
      unsubscribeArgs.setTag(fm.stringExtensions.empty);
    }
    this.performUnsubscribe(unsubscribeArgs);
    return this;
  };

  client.prototype.webSocketOpenFailure = function() {
    var e;
    e = arguments[0];
    if (this._webSocketOpened) {
      if (!this.tryWebSocket()) {
        return this.doLongPolling();
      }
    } else {
      return this.doLongPolling();
    }
  };

  client.prototype.webSocketOpenSuccess = function() {
    var e;
    e = arguments[0];
    this._webSocketOpened = true;
    return this.activateStream(this._connectArgs, this._responseArgs);
  };

  client.prototype.webSocketStreamFailure = function() {
    var e, responseArgs;
    e = arguments[0];
    responseArgs = new fm.websync.clientResponseArgs();
    responseArgs.setDynamicProperties(this._responseArgs.getDynamicProperties());
    responseArgs.setException(new Error(fm.stringExtensions.format("WebSocket stream error. {0}", e.getException().message)));
    return this.streamCallback(responseArgs);
  };

  client._bayeuxVersion = "1.0";

  client._bayeuxMinimumVersion = "1.0";

  client._argsKey = "fm.args";

  client._stateKey = "fm.state";

  client._requestUrlCache = {};

  client._requestUrlCacheLock = new fm.object();

  return client;

})(fm.websync.baseClient);


var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.clientSendState = (function(superClass) {
  extend(clientSendState, superClass);

  clientSendState.prototype._isStream = false;

  clientSendState.prototype._requestMapping = null;

  clientSendState.prototype._requests = null;

  function clientSendState() {
    this.setRequests = bind(this.setRequests, this);
    this.setRequestMapping = bind(this.setRequestMapping, this);
    this.setIsStream = bind(this.setIsStream, this);
    this.getRequests = bind(this.getRequests, this);
    this.getRequestMapping = bind(this.getRequestMapping, this);
    this.getIsStream = bind(this.getIsStream, this);
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = clientSendState.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = clientSendState.__super__.constructor.call(this);
    return instance;
  }

  clientSendState.prototype.getIsStream = function() {
    return this._isStream;
  };

  clientSendState.prototype.getRequestMapping = function() {
    return this._requestMapping;
  };

  clientSendState.prototype.getRequests = function() {
    return this._requests;
  };

  clientSendState.prototype.setIsStream = function() {
    var value;
    value = arguments[0];
    return this._isStream = value;
  };

  clientSendState.prototype.setRequestMapping = function() {
    var value;
    value = arguments[0];
    return this._requestMapping = value;
  };

  clientSendState.prototype.setRequests = function() {
    var value;
    value = arguments[0];
    return this._requests = value;
  };

  return clientSendState;

})(fm.object);


var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.clientRequest = (function(superClass) {
  extend(clientRequest, superClass);

  clientRequest.prototype._callback = null;

  clientRequest.prototype._message = null;

  function clientRequest() {
    this.setMessage = bind(this.setMessage, this);
    this.setCallback = bind(this.setCallback, this);
    this.getMessage = bind(this.getMessage, this);
    this.getCallback = bind(this.getCallback, this);
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = clientRequest.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = clientRequest.__super__.constructor.call(this);
    return instance;
  }

  clientRequest.prototype.getCallback = function() {
    return this._callback;
  };

  clientRequest.prototype.getMessage = function() {
    return this._message;
  };

  clientRequest.prototype.setCallback = function() {
    var value;
    value = arguments[0];
    return this._callback = value;
  };

  clientRequest.prototype.setMessage = function() {
    var value;
    value = arguments[0];
    return this._message = value;
  };

  return clientRequest;

})(fm.dynamic);



/*<span id='cls-fm.websync.defaults'>&nbsp;</span> */

/**
@class fm.websync.defaults
 <div>
 A collection of read-only default values for WebSync.
 </div>

@extends fm.object
 */
var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.defaults = (function(superClass) {
  extend(defaults, superClass);

  defaults.__domainKey = null;

  defaults.__domainName = null;

  function defaults() {
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = defaults.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = defaults.__super__.constructor.call(this);
    return instance;
  }


  /*<span id='method-fm.websync.defaults-getDomainKey'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the default domain key ("11111111-1111-1111-1111-111111111111").
  	 </div>
  
  	@function getDomainKey
  	@return {fm.guid}
   */

  defaults.getDomainKey = function() {
    return fm.websync.defaults.__domainKey;
  };


  /*<span id='method-fm.websync.defaults-getDomainName'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the default domain name ("localhost").
  	 </div>
  
  	@function getDomainName
  	@return {String}
   */

  defaults.getDomainName = function() {
    return fm.websync.defaults.__domainName;
  };

  defaults.__domainKey = new fm.guid("11111111-1111-1111-1111-111111111111");

  defaults.__domainName = "localhost";

  return defaults;

})(fm.object);



/*<span id='cls-fm.websync.publishingClient'>&nbsp;</span> */

/**
@class fm.websync.publishingClient
 <div>
 Details about the client sending the publication data.
 </div>

@extends fm.serializable
 */
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.publishingClient = (function(superClass) {
  extend(publishingClient, superClass);

  publishingClient.prototype._boundRecords = null;

  publishingClient.prototype._clientId = null;


  /*<span id='method-fm.websync.publishingClient-fm.websync.publishingClient'>&nbsp;</span> */


  /**
  	 <div>
  	 Initializes a new instance of the <see cref="fm.websync.publishingClient">fm.websync.publishingClient</see> class.
  	 </div>
  	@function fm.websync.publishingClient
  	@param {fm.nullable} clientId The publishing client's ID.
  	@param {Object} boundRecords The records bound to the client.
  	@return {}
   */

  function publishingClient() {
    this.getBoundRecordValue = bind(this.getBoundRecordValue, this);
    this.toJson = bind(this.toJson, this);
    this.setClientId = bind(this.setClientId, this);
    this.setBoundRecords = bind(this.setBoundRecords, this);
    this.getClientId = bind(this.getClientId, this);
    this.getBoundRecordValueJson = bind(this.getBoundRecordValueJson, this);
    this.getBoundRecords = bind(this.getBoundRecords, this);
    var boundRecords, clientId, instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = publishingClient.__super__.constructor.call(this);
      this.setBoundRecords({});
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    if (arguments.length === 2) {
      clientId = arguments[0];
      boundRecords = arguments[1];
      instance = publishingClient.__super__.constructor.call(this);
      this.setClientId(clientId);
      this.setBoundRecords(boundRecords);
      return instance;
    }
    if (arguments.length === 0) {
      instance = publishingClient.__super__.constructor.call(this);
      this.setBoundRecords({});
      return instance;
    }
  }


  /*<span id='method-fm.websync.publishingClient-fromJson'>&nbsp;</span> */


  /**
  	 <div>
  	 Deserializes a JSON-formatted publishing client.
  	 </div>
  	@function fromJson
  	@param {String} publishingClientJson The JSON-formatted publishing client to deserialize.
  	@return {fm.websync.publishingClient} The publishing client.
   */

  publishingClient.fromJson = function() {
    var publishingClientJson;
    publishingClientJson = arguments[0];
    return fm.websync.serializer.deserializePublishingClient(publishingClientJson);
  };


  /*<span id='method-fm.websync.publishingClient-toJson'>&nbsp;</span> */


  /**
  	 <div>
  	 Serializes a publishing client to JSON.
  	 </div>
  	@function toJson
  	@param {fm.websync.publishingClient} publishingClient The publishing client to serialize.
  	@return {String} The JSON-formatted publishing client.
   */

  publishingClient.toJson = function() {
    var publishingClient;
    publishingClient = arguments[0];
    return fm.websync.serializer.serializePublishingClient(publishingClient);
  };


  /*<span id='method-fm.websync.publishingClient-getBoundRecords'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the publishing client's bound records.
  	 </div>
  
  	@function getBoundRecords
  	@return {Object}
   */

  publishingClient.prototype.getBoundRecords = function() {
    return this._boundRecords;
  };


  /*<span id='method-fm.websync.publishingClient-getBoundRecordValueJson'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the JSON value of a record bound to the publishing client.
  	 </div>
  	@function getBoundRecordValueJson
  	@param {String} key The record key.
  	@return {String} The JSON value of the record, if it exists, or null.
   */

  publishingClient.prototype.getBoundRecordValueJson = function() {
    var _var0, _var1, key, record;
    key = arguments[0];
    if (fm.global.equals(this.getBoundRecords(), null)) {
      return null;
    }
    record = null;
    _var0 = new fm.holder(record);
    _var1 = fm.hashExtensions.tryGetValue(this.getBoundRecords(), key, _var0);
    record = _var0.getValue();
    if (!_var1) {
      return null;
    }
    return record.getValueJson();
  };


  /*<span id='method-fm.websync.publishingClient-getClientId'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the publishing client's ID.
  	 </div>
  
  	@function getClientId
  	@return {fm.nullable}
   */

  publishingClient.prototype.getClientId = function() {
    return this._clientId;
  };


  /*<span id='method-fm.websync.publishingClient-setBoundRecords'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the publishing client's bound records.
  	 </div>
  
  	@function setBoundRecords
  	@param {Object} value
  	@return {void}
   */

  publishingClient.prototype.setBoundRecords = function() {
    var value;
    value = arguments[0];
    return this._boundRecords = value;
  };


  /*<span id='method-fm.websync.publishingClient-setClientId'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the publishing client's ID.
  	 </div>
  
  	@function setClientId
  	@param {fm.nullable} value
  	@return {void}
   */

  publishingClient.prototype.setClientId = function() {
    var value;
    value = arguments[0];
    return this._clientId = value;
  };


  /*<span id='method-fm.websync.publishingClient-toJson'>&nbsp;</span> */


  /**
  	 <div>
  	 Serializes this instance to JSON.
  	 </div>
  	@function toJson
  	@return {String} The JSON-formatted publishing client.
   */

  publishingClient.prototype.toJson = function() {
    return fm.websync.publishingClient.toJson(this);
  };

  publishingClient.prototype.getBoundRecordValue = function() {
    var key;
    key = arguments[0];
    return fm.json.deserialize(this.getBoundRecordValueJson.apply(this, arguments));
  };

  return publishingClient;

})(fm.serializable);



/*<span id='cls-fm.websync.extensions'>&nbsp;</span> */

/**
@class fm.websync.extensions
 <div>
 The extensions library that wraps the Bayeux Ext field, used with instances of classes
 that derive from <see cref="fm.websync.extensible">fm.websync.extensible</see>.
 </div>

@extends fm.dynamic
 */
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.extensions = (function(superClass) {
  extend(extensions, superClass);

  extensions.prototype._extensionJsons = null;


  /*<span id='method-fm.websync.extensions-fm.websync.extensions'>&nbsp;</span> */


  /**
  	 <div>
  	 Initializes a new instance of the <see cref="fm.websync.extensions">fm.websync.extensions</see> class.
  	 </div>
  
  	@function fm.websync.extensions
  	@return {}
   */

  function extensions() {
    this.setValue = bind(this.setValue, this);
    this.getValue = bind(this.getValue, this);
    this.toJson = bind(this.toJson, this);
    this.setValueJson = bind(this.setValueJson, this);
    this.setExtensionJsons = bind(this.setExtensionJsons, this);
    this.getValueJson = bind(this.getValueJson, this);
    this.getNames = bind(this.getNames, this);
    this.getExtensionJsons = bind(this.getExtensionJsons, this);
    this.getCount = bind(this.getCount, this);
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = extensions.__super__.constructor.call(this);
      this.setExtensionJsons({});
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = extensions.__super__.constructor.call(this);
    this.setExtensionJsons({});
    return instance;
  }


  /*<span id='method-fm.websync.extensions-fromJson'>&nbsp;</span> */


  /**
  	 <div>
  	 Deserializes a single extensions library from JSON.
  	 </div>
  	@function fromJson
  	@param {String} extensionsJson The JSON extensions library to deserialize.
  	@return {fm.websync.extensions} The deserialized extensions library.
   */

  extensions.fromJson = function() {
    var extensionsJson;
    extensionsJson = arguments[0];
    return fm.websync.serializer.deserializeExtensions(extensionsJson);
  };


  /*<span id='method-fm.websync.extensions-toJson'>&nbsp;</span> */


  /**
  	 <div>
  	 Serializes a single extensions library to JSON.
  	 </div>
  	@function toJson
  	@param {fm.websync.extensions} extensions The extensions library to serialize.
  	@return {String} The serialized extensions library.
   */

  extensions.toJson = function() {
    var extensions;
    extensions = arguments[0];
    return fm.websync.serializer.serializeExtensions(extensions);
  };


  /*<span id='method-fm.websync.extensions-getCount'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the number of extensions in the library.
  	 </div>
  
  	@function getCount
  	@return {Integer}
   */

  extensions.prototype.getCount = function() {
    return fm.hashExtensions.getCount(this.getExtensionJsons());
  };

  extensions.prototype.getExtensionJsons = function() {
    return this._extensionJsons;
  };


  /*<span id='method-fm.websync.extensions-getNames'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the names of the extensions in the library.
  	 </div>
  
  	@function getNames
  	@return {Array}
   */

  extensions.prototype.getNames = function() {
    var list;
    list = [];
    fm.arrayExtensions.addRange(list, fm.hashExtensions.getKeys(this.getExtensionJsons()));
    return list;
  };


  /*<span id='method-fm.websync.extensions-getValueJson'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets a serialized value stored in the extensions.
  	 </div>
  	@function getValueJson
  	@param {String} name Fully-qualified extension name.
  	@return {String} The extension value (in JSON format).
   */

  extensions.prototype.getValueJson = function() {
    var name;
    name = arguments[0];
    if (fm.hashExtensions.containsKey(this.getExtensionJsons(), name)) {
      return this.getExtensionJsons()[name];
    }
    return null;
  };

  extensions.prototype.setExtensionJsons = function() {
    var value;
    value = arguments[0];
    return this._extensionJsons = value;
  };


  /*<span id='method-fm.websync.extensions-setValueJson'>&nbsp;</span> */


  /**
  	 <div>
  	 Stores a serialized value in the extensions.  Must be valid JSON.
  	 </div>
  	@function setValueJson
  	@param {String} name Fully-qualified extension name.
  	@param {String} valueJson The extension value in valid JSON format.
  	@param {Boolean} validate Whether or not to validate the JSON.
  	@return {void}
   */

  extensions.prototype.setValueJson = function() {
    var name, validate, valueJson;
    if (arguments.length === 3) {
      name = arguments[0];
      valueJson = arguments[1];
      validate = arguments[2];
      if (fm.global.equals(valueJson, null)) {
        if (fm.hashExtensions.containsKey(this.getExtensionJsons(), name)) {
          fm.hashExtensions.remove(this.getExtensionJsons(), name);
        }
      } else {
        if (!(!validate || fm.serializer.isValidJson(valueJson))) {
          throw new Error("The value is not valid JSON.");
        }
        this.getExtensionJsons()[name] = valueJson;
      }
      this.setIsDirty(true);
      return;
    }
    if (arguments.length === 2) {
      name = arguments[0];
      valueJson = arguments[1];
      this.setValueJson(name, valueJson, true);
    }
  };


  /*<span id='method-fm.websync.extensions-toJson'>&nbsp;</span> */


  /**
  	 <div>
  	 Serializes the extensions library to JSON.
  	 </div>
  	@function toJson
  	@return {String} The serialized extensions library.
   */

  extensions.prototype.toJson = function() {
    return fm.websync.extensions.toJson(this);
  };

  extensions.prototype.getValue = function() {
    var name;
    name = arguments[0];
    return fm.json.deserialize(this.getValueJson.apply(this, arguments));
  };

  extensions.prototype.setValue = function() {
    var name, value, valueJson;
    if (arguments.length === 3) {
      name = arguments[0];
      valueJson = arguments[1];
      value = arguments[2];
      arguments[arguments.length - 1] = fm.json.serialize(arguments[arguments.length - 1]);
      this.setValueJson.apply(this, arguments);
      return;
    }
    if (arguments.length === 2) {
      name = arguments[0];
      value = arguments[1];
      arguments[arguments.length - 1] = fm.json.serialize(arguments[arguments.length - 1]);
      this.setValueJson.apply(this, arguments);
    }
  };

  return extensions;

})(fm.dynamic);



/*<span id='cls-fm.websync.message'>&nbsp;</span> */

/**
@class fm.websync.message
 <div>
 The WebSync message used for all <see cref="fm.websync.client">fm.websync.client</see> requests/responses.
 </div>

@extends fm.websync.baseMessage
 */
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.message = (function(superClass) {
  extend(message, superClass);

  message.prototype.__advice = null;

  message.prototype.__bayeuxChannel = null;

  message.prototype.__channels = null;

  message.prototype.__clientId = null;

  message.prototype.__connectionType = null;

  message.prototype.__id = null;

  message.prototype.__minimumVersion = null;

  message.prototype.__records = null;

  message.prototype.__supportedConnectionTypes = null;

  message.prototype.__version = null;

  message.prototype._toJsonNoDataLock = null;


  /*<span id='method-fm.websync.message-fm.websync.message'>&nbsp;</span> */


  /**
  	 <div>
  	 Initializes a new instance of the <see cref="fm.websync.message">fm.websync.message</see> class.
  	 </div>
  	@function fm.websync.message
  	@param {String} bayeuxChannel The Bayeux channel with which to initialize the message.
  	@return {}
   */

  function message() {
    this.toJsonNoData = bind(this.toJsonNoData, this);
    this.toJson = bind(this.toJson, this);
    this.toBinary = bind(this.toBinary, this);
    this.setVersion = bind(this.setVersion, this);
    this.setTag = bind(this.setTag, this);
    this.setSupportedConnectionTypes = bind(this.setSupportedConnectionTypes, this);
    this.setSessionId = bind(this.setSessionId, this);
    this.setServerTimeout = bind(this.setServerTimeout, this);
    this.setServerActions = bind(this.setServerActions, this);
    this.setRecords = bind(this.setRecords, this);
    this.setRecord = bind(this.setRecord, this);
    this.setPublishingClient = bind(this.setPublishingClient, this);
    this.setNotifyingClient = bind(this.setNotifyingClient, this);
    this.setNotifyClientId = bind(this.setNotifyClientId, this);
    this.setMinimumVersion = bind(this.setMinimumVersion, this);
    this.setLastSessionId = bind(this.setLastSessionId, this);
    this.setLastClientId = bind(this.setLastClientId, this);
    this.setKeys = bind(this.setKeys, this);
    this.setKey = bind(this.setKey, this);
    this.setId = bind(this.setId, this);
    this.setDisableBinary = bind(this.setDisableBinary, this);
    this.setConnectionType = bind(this.setConnectionType, this);
    this.setClientId = bind(this.setClientId, this);
    this.setChannels = bind(this.setChannels, this);
    this.setChannel = bind(this.setChannel, this);
    this.setBayeuxChannel = bind(this.setBayeuxChannel, this);
    this.setAdvice = bind(this.setAdvice, this);
    this.setAcknowledgement = bind(this.setAcknowledgement, this);
    this.isUnsubscribingFrom = bind(this.isUnsubscribingFrom, this);
    this.isUnsubscribe = bind(this.isUnsubscribe, this);
    this.isUnbindingFrom = bind(this.isUnbindingFrom, this);
    this.isUnbind = bind(this.isUnbind, this);
    this.isSubscribingTo = bind(this.isSubscribingTo, this);
    this.isSubscribe = bind(this.isSubscribe, this);
    this.isStream = bind(this.isStream, this);
    this.isService = bind(this.isService, this);
    this.isPublish = bind(this.isPublish, this);
    this.isNotify = bind(this.isNotify, this);
    this.isDisconnect = bind(this.isDisconnect, this);
    this.isConnect = bind(this.isConnect, this);
    this.isBindingTo = bind(this.isBindingTo, this);
    this.isBind = bind(this.isBind, this);
    this.getVersion = bind(this.getVersion, this);
    this.getType = bind(this.getType, this);
    this.getTag = bind(this.getTag, this);
    this.getSupportedConnectionTypes = bind(this.getSupportedConnectionTypes, this);
    this.getSessionId = bind(this.getSessionId, this);
    this.getServerTimeout = bind(this.getServerTimeout, this);
    this.getServerActions = bind(this.getServerActions, this);
    this.getRecords = bind(this.getRecords, this);
    this.getRecord = bind(this.getRecord, this);
    this.getPublishingClient = bind(this.getPublishingClient, this);
    this.getNotifyingClient = bind(this.getNotifyingClient, this);
    this.getNotifyClientId = bind(this.getNotifyClientId, this);
    this.getMinimumVersion = bind(this.getMinimumVersion, this);
    this.getLastSessionId = bind(this.getLastSessionId, this);
    this.getLastClientId = bind(this.getLastClientId, this);
    this.getKeys = bind(this.getKeys, this);
    this.getKey = bind(this.getKey, this);
    this.getId = bind(this.getId, this);
    this.getDisableBinary = bind(this.getDisableBinary, this);
    this.getConnectionType = bind(this.getConnectionType, this);
    this.getClientId = bind(this.getClientId, this);
    this.getChannels = bind(this.getChannels, this);
    this.getChannel = bind(this.getChannel, this);
    this.getBayeuxChannel = bind(this.getBayeuxChannel, this);
    this.getAdvice = bind(this.getAdvice, this);
    this.getAcknowledgement = bind(this.getAcknowledgement, this);
    var bayeuxChannel, instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = message.__super__.constructor.call(this);
      this._toJsonNoDataLock = new fm.object();
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    if (arguments.length === 0) {
      instance = message.__super__.constructor.call(this);
      this._toJsonNoDataLock = new fm.object();
      return instance;
    }
    if (arguments.length === 1) {
      bayeuxChannel = arguments[0];
      instance = message.__super__.constructor.call(this);
      this._toJsonNoDataLock = new fm.object();
      this.setValidate(false);
      this.setBayeuxChannel(bayeuxChannel);
      this.setValidate(true);
      return instance;
    }
  }

  message.bytesToInt = function() {
    var bytes, index;
    bytes = arguments[0];
    index = arguments[1];
    if (bytes.length < (index + 4)) {
      return -1;
    }
    return fm.bitAssistant.toIntegerNetwork(bytes, index);
  };


  /*<span id='method-fm.websync.message-fromBinary'>&nbsp;</span> */


  /**
  	 <div>
  	 Deserializes a message from binary.
  	 </div>
  	@function fromBinary
  	@param {fm.array} bytes A byte array to deserialize.
  	@param {Integer} offset The offset into the array.
  	@return {fm.websync.message} A deserialized message.
   */

  message.fromBinary = function() {
    var buffer, buffer2, bytes, count, message, num2, offset;
    if (arguments.length === 1) {
      bytes = arguments[0];
      return fm.websync.message.fromBinary(bytes, 0);
    }
    if (arguments.length === 2) {
      bytes = arguments[0];
      offset = arguments[1];
      count = fm.websync.message.bytesToInt(bytes, offset);
      if (count < 0) {
        return null;
      }
      offset = offset + 4;
      num2 = fm.websync.message.bytesToInt(bytes, offset);
      if (num2 < 0) {
        return null;
      }
      offset = offset + 4;
      buffer = fm.bitAssistant.subArray(bytes, offset, count);
      offset = offset + count;
      buffer2 = fm.bitAssistant.subArray(bytes, offset, num2);
      offset = offset + num2;
      message = fm.websync.message.fromJson(fm.encoding.getUtf8().getString(buffer, 0, buffer.length));
      message.setDataBytes(buffer2);
      return message;
    }
  };


  /*<span id='method-fm.websync.message-fromBinaryMultiple'>&nbsp;</span> */


  /**
  	 <div>
  	 Deserializes a list of messages from binary.
  	 </div>
  	@function fromBinaryMultiple
  	@param {fm.array} bytes A byte array to deserialize.
  	@return {fm.array} A deserialized list of messages.
   */

  message.fromBinaryMultiple = function() {
    var bytes, i, index, message, messageArray, num2, num4;
    bytes = arguments[0];
    index = 0;
    num2 = fm.websync.message.bytesToInt(bytes, index);
    if (num2 < 0) {
      return new Array(0);
    }
    index = index + 4;
    messageArray = new Array(num2);
    i = 0;
    while (i < num2) {
      try {
        num4 = fm.websync.message.bytesToInt(bytes, index);
        if (num4 < 0) {
          return new Array(0);
        }
        index = index + 4;
        message = fm.websync.message.fromBinary(bytes, index);
        if (fm.global.equals(message, null)) {
          return new Array(0);
        }
        index = index + num4;
        messageArray[i] = message;
      } finally {
        i++;
      }
    }
    return messageArray;
  };


  /*<span id='method-fm.websync.message-fromJson'>&nbsp;</span> */


  /**
  	 <div>
  	 Deserializes a message from JSON.
  	 </div>
  	@function fromJson
  	@param {String} messageJson A JSON string to deserialize.
  	@return {fm.websync.message} A deserialized message.
   */

  message.fromJson = function() {
    var messageJson;
    messageJson = arguments[0];
    return fm.websync.serializer.deserializeMessage(messageJson);
  };


  /*<span id='method-fm.websync.message-fromJsonMultiple'>&nbsp;</span> */


  /**
  	 <div>
  	 Deserializes a list of messages from JSON.
  	 </div>
  	@function fromJsonMultiple
  	@param {String} messagesJson A JSON string to deserialize.
  	@return {fm.array} A deserialized list of messages.
   */

  message.fromJsonMultiple = function() {
    var messagesJson;
    messagesJson = arguments[0];
    return fm.websync.serializer.deserializeMessageArray(messagesJson);
  };

  message.intToBytes = function() {
    var i;
    i = arguments[0];
    return fm.bitAssistant.getIntegerBytesNetwork(i);
  };


  /*<span id='method-fm.websync.message-toBinary'>&nbsp;</span> */


  /**
  	 <div>
  	 Serializes a message to binary.
  	 </div>
  	@function toBinary
  	@param {fm.websync.message} message A message to serialize.
  	@return {fm.array} A binary-serialized message.
   */

  message.toBinary = function() {
    var _var0, _var1, _var2, bytes, dataBytes, dataJson, destination, destinationIndex, message, s;
    message = arguments[0];
    dataBytes = null;
    dataJson = null;
    _var0 = new fm.holder(dataBytes);
    _var1 = new fm.holder(dataJson);
    _var2 = message.toJsonNoData(_var0, _var1);
    dataBytes = _var0.getValue();
    dataJson = _var1.getValue();
    s = _var2;
    if (fm.global.equals(dataBytes, null)) {
      if (fm.global.equals(dataJson, null)) {
        throw new Error("Message data bytes cannot be null.");
      }
      throw new Error(fm.stringExtensions.format("Message data bytes cannot be null (JSON: {0}).", dataJson));
    }
    if (fm.global.equals(s, null)) {
      throw new Error("Message JSON cannot be null.");
    }
    bytes = fm.encoding.getUtf8().getBytes(s);
    destination = new Uint8Array((8 + bytes.length) + dataBytes.length);
    destinationIndex = 0;
    fm.bitAssistant.copy(fm.websync.message.intToBytes(bytes.length), 0, destination, destinationIndex, 4);
    destinationIndex = destinationIndex + 4;
    fm.bitAssistant.copy(fm.websync.message.intToBytes(dataBytes.length), 0, destination, destinationIndex, 4);
    destinationIndex = destinationIndex + 4;
    fm.bitAssistant.copy(bytes, 0, destination, destinationIndex, bytes.length);
    destinationIndex = destinationIndex + bytes.length;
    fm.bitAssistant.copy(dataBytes, 0, destination, destinationIndex, dataBytes.length);
    destinationIndex = destinationIndex + dataBytes.length;
    return destination;
  };


  /*<span id='method-fm.websync.message-toBinaryMultiple'>&nbsp;</span> */


  /**
  	 <div>
  	 Serializes a list of messages to binary.
  	 </div>
  	@function toBinaryMultiple
  	@param {fm.array} messages A list of messages to serialize.
  	@return {fm.array} A binary-serialized array of messages.
   */

  message.toBinaryMultiple = function() {
    var _var0, _var1, buffer, destination, destinationIndex, item, j, k, len, len1, list, message, messages, num;
    messages = arguments[0];
    num = 4;
    list = [];
    _var0 = messages;
    for (j = 0, len = _var0.length; j < len; j++) {
      message = _var0[j];
      item = fm.websync.message.toBinary(message);
      fm.arrayExtensions.add(list, item);
      num = num + (4 + item.length);
    }
    destination = new Uint8Array(num);
    destinationIndex = 0;
    fm.bitAssistant.copy(fm.websync.message.intToBytes(fm.arrayExtensions.getCount(list)), 0, destination, destinationIndex, 4);
    destinationIndex = destinationIndex + 4;
    _var1 = list;
    for (k = 0, len1 = _var1.length; k < len1; k++) {
      buffer = _var1[k];
      fm.bitAssistant.copy(fm.websync.message.intToBytes(buffer.length), 0, destination, destinationIndex, 4);
      destinationIndex = destinationIndex + 4;
      fm.bitAssistant.copy(buffer, 0, destination, destinationIndex, buffer.length);
      destinationIndex = destinationIndex + buffer.length;
    }
    return destination;
  };


  /*<span id='method-fm.websync.message-toJson'>&nbsp;</span> */


  /**
  	 <div>
  	 Serializes a message to JSON.
  	 </div>
  	@function toJson
  	@param {fm.websync.message} message A message to serialize.
  	@return {String} A JSON-serialized message.
   */

  message.toJson = function() {
    var message;
    message = arguments[0];
    return fm.websync.serializer.serializeMessage(message);
  };


  /*<span id='method-fm.websync.message-toJsonMultiple'>&nbsp;</span> */


  /**
  	 <div>
  	 Serializes a list of messages to JSON.
  	 </div>
  	@function toJsonMultiple
  	@param {fm.array} messages A list of messages to serialize.
  	@return {String} A JSON-serialized array of messages.
   */

  message.toJsonMultiple = function() {
    var messages;
    messages = arguments[0];
    return fm.websync.serializer.serializeMessageArray(messages);
  };


  /*<span id='method-fm.websync.message-getAcknowledgement'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the acknowledgement flag, used internally for stream requests following message delivery.
  	 </div>
  
  	@function getAcknowledgement
  	@return {fm.nullable}
   */

  message.prototype.getAcknowledgement = function() {
    return fm.serializer.deserializeBoolean(this.getExtensionValueJson("fm.ack"));
  };


  /*<span id='method-fm.websync.message-getAdvice'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets details on how the client should reconnect, used internally.
  	 </div>
  
  	@function getAdvice
  	@return {fm.websync.advice}
   */

  message.prototype.getAdvice = function() {
    return this.__advice;
  };


  /*<span id='method-fm.websync.message-getBayeuxChannel'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the Bayeux message channel.
  	 </div>
  
  	@function getBayeuxChannel
  	@return {String}
   */

  message.prototype.getBayeuxChannel = function() {
    return this.__bayeuxChannel;
  };


  /*<span id='method-fm.websync.message-getChannel'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the channel to which the current client is publishing, subscribing, or unsubscribing.
  	 Overrides <see cref="fm.websync.message.channels">fm.websync.message.channels</see>.
  	 </div>
  
  	@function getChannel
  	@return {String}
   */

  message.prototype.getChannel = function() {
    return fm.websync.extensible.sharedGetChannel(this.__channels);
  };


  /*<span id='method-fm.websync.message-getChannels'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the channels to which the current client is subscribing or unsubscribing.
  	 Overrides <see cref="fm.websync.message.channel">fm.websync.message.channel</see>.
  	 </div>
  
  	@function getChannels
  	@return {fm.array}
   */

  message.prototype.getChannels = function() {
    return fm.websync.extensible.sharedGetChannels(this.__channels);
  };


  /*<span id='method-fm.websync.message-getClientId'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the unique identifier of the current client associated with the request/response.
  	 </div>
  
  	@function getClientId
  	@return {fm.nullable}
   */

  message.prototype.getClientId = function() {
    return this.__clientId;
  };


  /*<span id='method-fm.websync.message-getConnectionType'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the type of connection the client is using, used internally.
  	 </div>
  
  	@function getConnectionType
  	@return {fm.nullable}
   */

  message.prototype.getConnectionType = function() {
    return this.__connectionType;
  };


  /*<span id='method-fm.websync.message-getDisableBinary'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets whether binary is disabled.
  	 </div>
  
  	@function getDisableBinary
  	@return {fm.nullable}
   */

  message.prototype.getDisableBinary = function() {
    return fm.serializer.deserializeBoolean(this.getExtensionValueJson("fm.dbin"));
  };


  /*<span id='method-fm.websync.message-getId'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the unique message identifier.
  	 </div>
  
  	@function getId
  	@return {String}
   */

  message.prototype.getId = function() {
    return this.__id;
  };


  /*<span id='method-fm.websync.message-getKey'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the record key to which the current client is binding or unbinding.
  	 Overrides <see cref="fm.websync.message.keys">fm.websync.message.keys</see>, <see cref="fm.websync.message.record">fm.websync.message.record</see>, and <see cref="fm.websync.message.records">fm.websync.message.records</see>.
  	 </div>
  
  	@function getKey
  	@return {String}
   */

  message.prototype.getKey = function() {
    return fm.websync.extensible.sharedGetKey(this.__records);
  };


  /*<span id='method-fm.websync.message-getKeys'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the record keys to which the current client is binding or unbinding.
  	 Overrides <see cref="fm.websync.message.key">fm.websync.message.key</see>, <see cref="fm.websync.message.record">fm.websync.message.record</see>, and <see cref="fm.websync.message.records">fm.websync.message.records</see>.
  	 </div>
  
  	@function getKeys
  	@return {fm.array}
   */

  message.prototype.getKeys = function() {
    return fm.websync.extensible.sharedGetKeys(this.__records);
  };


  /*<span id='method-fm.websync.message-getLastClientId'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the last used client ID.
  	 </div>
  
  	@function getLastClientId
  	@return {fm.nullable}
   */

  message.prototype.getLastClientId = function() {
    return fm.serializer.deserializeGuid(this.getExtensionValueJson("fm.lcid"));
  };


  /*<span id='method-fm.websync.message-getLastSessionId'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the last used session ID.
  	 </div>
  
  	@function getLastSessionId
  	@return {fm.nullable}
   */

  message.prototype.getLastSessionId = function() {
    return fm.serializer.deserializeGuid(this.getExtensionValueJson("fm.lsid"));
  };


  /*<span id='method-fm.websync.message-getMinimumVersion'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the minimum supported server version, used internally.
  	 </div>
  
  	@function getMinimumVersion
  	@return {String}
   */

  message.prototype.getMinimumVersion = function() {
    return this.__minimumVersion;
  };


  /*<span id='method-fm.websync.message-getNotifyClientId'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the ID of the client which the current client is notifying.
  	 </div>
  
  	@function getNotifyClientId
  	@return {fm.nullable}
   */

  message.prototype.getNotifyClientId = function() {
    return fm.serializer.deserializeGuid(this.getExtensionValueJson("fm.notify"));
  };


  /*<span id='method-fm.websync.message-getNotifyingClient'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the notifying client details, used internally.
  	 </div>
  
  	@function getNotifyingClient
  	@return {fm.websync.notifyingClient}
   */

  message.prototype.getNotifyingClient = function() {
    return fm.websync.serializer.deserializeNotifyingClient(this.getExtensionValueJson("fm.notifying"));
  };


  /*<span id='method-fm.websync.message-getPublishingClient'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the publishing client details, used internally.
  	 </div>
  
  	@function getPublishingClient
  	@return {fm.websync.publishingClient}
   */

  message.prototype.getPublishingClient = function() {
    return fm.websync.serializer.deserializePublishingClient(this.getExtensionValueJson("fm.publishing"));
  };


  /*<span id='method-fm.websync.message-getRecord'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the record to which the current client is binding or unbinding.
  	 Overrides <see cref="fm.websync.message.records">fm.websync.message.records</see>, <see cref="fm.websync.message.key">fm.websync.message.key</see>, and <see cref="fm.websync.message.keys">fm.websync.message.keys</see>.
  	 </div>
  
  	@function getRecord
  	@return {fm.websync.record}
   */

  message.prototype.getRecord = function() {
    return fm.websync.extensible.sharedGetRecord(this.__records);
  };


  /*<span id='method-fm.websync.message-getRecords'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the records to which the current client is binding or unbinding.
  	 Overrides <see cref="fm.websync.message.record">fm.websync.message.record</see>, <see cref="fm.websync.message.key">fm.websync.message.key</see>, and <see cref="fm.websync.message.keys">fm.websync.message.keys</see>.
  	 </div>
  
  	@function getRecords
  	@return {fm.array}
   */

  message.prototype.getRecords = function() {
    return fm.websync.extensible.sharedGetRecords(this.__records);
  };


  /*<span id='method-fm.websync.message-getServerActions'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the server actions, used internally.
  	 </div>
  
  	@function getServerActions
  	@return {fm.array}
   */

  message.prototype.getServerActions = function() {
    var extensionValueJson, messageArray;
    extensionValueJson = this.getExtensionValueJson("fm.server");
    if (!fm.stringExtensions.isNullOrEmpty(extensionValueJson)) {
      messageArray = fm.websync.message.fromJsonMultiple(extensionValueJson);
      if (!fm.global.equals(messageArray, null)) {
        return messageArray;
      }
    }
    return null;
  };


  /*<span id='method-fm.websync.message-getServerTimeout'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the server timeout, used internally.
  	 </div>
  
  	@function getServerTimeout
  	@return {fm.nullable}
   */

  message.prototype.getServerTimeout = function() {
    return fm.serializer.deserializeInteger(this.getExtensionValueJson("fm.timeout"));
  };


  /*<span id='method-fm.websync.message-getSessionId'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the session ID associated with the message, used internally.
  	 </div>
  
  	@function getSessionId
  	@return {fm.nullable}
   */

  message.prototype.getSessionId = function() {
    return fm.serializer.deserializeGuid(this.getExtensionValueJson("fm.sessionId"));
  };


  /*<span id='method-fm.websync.message-getSupportedConnectionTypes'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the connection types supported by an endpoint, used internally.
  	 </div>
  
  	@function getSupportedConnectionTypes
  	@return {fm.array}
   */

  message.prototype.getSupportedConnectionTypes = function() {
    return this.__supportedConnectionTypes;
  };


  /*<span id='method-fm.websync.message-getTag'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the tag associated with the request.
  	 </div>
  
  	@function getTag
  	@return {String}
   */

  message.prototype.getTag = function() {
    var ref;
    return (ref = fm.serializer.deserializeString(this.getExtensionValueJson("fm.tag"))) != null ? ref : fm.stringExtensions.empty;
  };


  /*<span id='method-fm.websync.message-getType'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the type of the message.
  	 </div>
  
  	@function getType
  	@return {fm.websync.messageType}
   */

  message.prototype.getType = function() {
    return fm.websync.metaChannels.getMessageType(this.getBayeuxChannel());
  };


  /*<span id='method-fm.websync.message-getVersion'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the current server version, used internally.
  	 </div>
  
  	@function getVersion
  	@return {String}
   */

  message.prototype.getVersion = function() {
    return this.__version;
  };


  /*<span id='method-fm.websync.message-isBind'>&nbsp;</span> */


  /**
  	 <div>
  	 Detects whether this is a bind request/response.
  	 </div>
  	@function isBind
  	@return {Boolean}
   */

  message.prototype.isBind = function() {
    return fm.global.equals(this.getType(), fm.websync.messageType.Bind);
  };


  /*<span id='method-fm.websync.message-isBindingTo'>&nbsp;</span> */


  /**
  	 <div>
  	 Determines whether or not the current message represents a bind
  	 request/response for a particular key.
  	 </div>
  	@function isBindingTo
  	@param {String} key The key to test.
  	@return {Boolean} true if the message represents a bind request/response
  	 for the specified key; otherwise false.
   */

  message.prototype.isBindingTo = function() {
    var _var0, j, key, len, record;
    key = arguments[0];
    if (fm.global.equals(this.getType(), fm.websync.messageType.Bind)) {
      if (fm.global.equals(this.getRecords(), null)) {
        return false;
      }
      _var0 = this.getRecords();
      for (j = 0, len = _var0.length; j < len; j++) {
        record = _var0[j];
        if (fm.global.equals(record.getKey(), key)) {
          return true;
        }
      }
    }
    return false;
  };


  /*<span id='method-fm.websync.message-isConnect'>&nbsp;</span> */


  /**
  	 <div>
  	 Detects whether this is a connect request/response.
  	 </div>
  	@function isConnect
  	@return {Boolean}
   */

  message.prototype.isConnect = function() {
    return fm.global.equals(this.getType(), fm.websync.messageType.Connect);
  };


  /*<span id='method-fm.websync.message-isDisconnect'>&nbsp;</span> */


  /**
  	 <div>
  	 Detects whether this is a disconnect request/response.
  	 </div>
  	@function isDisconnect
  	@return {Boolean}
   */

  message.prototype.isDisconnect = function() {
    return fm.global.equals(this.getType(), fm.websync.messageType.Disconnect);
  };


  /*<span id='method-fm.websync.message-isNotify'>&nbsp;</span> */


  /**
  	 <div>
  	 Detects whether this is a notify request/response.
  	 </div>
  	@function isNotify
  	@return {Boolean}
   */

  message.prototype.isNotify = function() {
    return fm.global.equals(this.getType(), fm.websync.messageType.Notify);
  };


  /*<span id='method-fm.websync.message-isPublish'>&nbsp;</span> */


  /**
  	 <div>
  	 Detects whether this is a publish request/response.
  	 </div>
  	@function isPublish
  	@return {Boolean}
   */

  message.prototype.isPublish = function() {
    return fm.global.equals(this.getType(), fm.websync.messageType.Publish);
  };


  /*<span id='method-fm.websync.message-isService'>&nbsp;</span> */


  /**
  	 <div>
  	 Detects whether this is a service request/response.
  	 </div>
  	@function isService
  	@return {Boolean}
   */

  message.prototype.isService = function() {
    return fm.global.equals(this.getType(), fm.websync.messageType.Service);
  };


  /*<span id='method-fm.websync.message-isStream'>&nbsp;</span> */


  /**
  	 <div>
  	 Detects whether this is a stream request/response.
  	 </div>
  	@function isStream
  	@return {Boolean}
   */

  message.prototype.isStream = function() {
    return fm.global.equals(this.getType(), fm.websync.messageType.Stream);
  };


  /*<span id='method-fm.websync.message-isSubscribe'>&nbsp;</span> */


  /**
  	 <div>
  	 Detects whether this is a subscribe request/response.
  	 </div>
  	@function isSubscribe
  	@return {Boolean}
   */

  message.prototype.isSubscribe = function() {
    return fm.global.equals(this.getType(), fm.websync.messageType.Subscribe);
  };


  /*<span id='method-fm.websync.message-isSubscribingTo'>&nbsp;</span> */


  /**
  	 <div>
  	 Determines whether or not the current message represents a subscribe
  	 request/response for a particular channel.
  	 </div>
  	@function isSubscribingTo
  	@param {String} channel The channel to test.
  	@return {Boolean} true if the message represents a subscribe request/response
  	 for the specified channel; otherwise false.
   */

  message.prototype.isSubscribingTo = function() {
    var _var0, channel, j, len, str;
    channel = arguments[0];
    if (fm.global.equals(this.getType(), fm.websync.messageType.Subscribe)) {
      if (fm.global.equals(this.getChannels(), null)) {
        return false;
      }
      _var0 = this.getChannels();
      for (j = 0, len = _var0.length; j < len; j++) {
        str = _var0[j];
        if (fm.global.equals(str, channel)) {
          return true;
        }
      }
    }
    return false;
  };


  /*<span id='method-fm.websync.message-isUnbind'>&nbsp;</span> */


  /**
  	 <div>
  	 Detects whether this is a bind request/response.
  	 </div>
  	@function isUnbind
  	@return {Boolean}
   */

  message.prototype.isUnbind = function() {
    return fm.global.equals(this.getType(), fm.websync.messageType.Unbind);
  };


  /*<span id='method-fm.websync.message-isUnbindingFrom'>&nbsp;</span> */


  /**
  	 <div>
  	 Determines whether or not the current message represents an unbind
  	 request/response for a particular key.
  	 </div>
  	@function isUnbindingFrom
  	@param {String} key The key to test.
  	@return {Boolean} true if the message represents an unbind request/response
  	 for the specified key; otherwise false.
   */

  message.prototype.isUnbindingFrom = function() {
    var _var0, j, key, len, record;
    key = arguments[0];
    if (fm.global.equals(this.getType(), fm.websync.messageType.Unbind)) {
      if (fm.global.equals(this.getRecords(), null)) {
        return false;
      }
      _var0 = this.getRecords();
      for (j = 0, len = _var0.length; j < len; j++) {
        record = _var0[j];
        if (fm.global.equals(record.getKey(), key)) {
          return true;
        }
      }
    }
    return false;
  };


  /*<span id='method-fm.websync.message-isUnsubscribe'>&nbsp;</span> */


  /**
  	 <div>
  	 Detects whether this is an unsubscribe request/response.
  	 </div>
  	@function isUnsubscribe
  	@return {Boolean}
   */

  message.prototype.isUnsubscribe = function() {
    return fm.global.equals(this.getType(), fm.websync.messageType.Unsubscribe);
  };


  /*<span id='method-fm.websync.message-isUnsubscribingFrom'>&nbsp;</span> */


  /**
  	 <div>
  	 Determines whether or not the current message represents an unsubscribe
  	 request/response for a particular channel.
  	 </div>
  	@function isUnsubscribingFrom
  	@param {String} channel The channel to test.
  	@return {Boolean} true if the message represents an unsubscribe request/response
  	 for the specified channel; otherwise false.
   */

  message.prototype.isUnsubscribingFrom = function() {
    var _var0, channel, j, len, str;
    channel = arguments[0];
    if (fm.global.equals(this.getType(), fm.websync.messageType.Unsubscribe)) {
      if (fm.global.equals(this.getChannels(), null)) {
        return false;
      }
      _var0 = this.getChannels();
      for (j = 0, len = _var0.length; j < len; j++) {
        str = _var0[j];
        if (fm.global.equals(str, channel)) {
          return true;
        }
      }
    }
    return false;
  };


  /*<span id='method-fm.websync.message-setAcknowledgement'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the acknowledgement flag, used internally for stream requests following message delivery.
  	 </div>
  
  	@function setAcknowledgement
  	@param {fm.nullable} value
  	@return {void}
   */

  message.prototype.setAcknowledgement = function() {
    var value;
    value = arguments[0];
    this.setExtensionValueJson("fm.ack", fm.serializer.serializeBoolean(value), false);
    return this.setIsDirty(true);
  };


  /*<span id='method-fm.websync.message-setAdvice'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets details on how the client should reconnect, used internally.
  	 </div>
  
  	@function setAdvice
  	@param {fm.websync.advice} value
  	@return {void}
   */

  message.prototype.setAdvice = function() {
    var value;
    value = arguments[0];
    this.__advice = value;
    return this.setIsDirty(true);
  };


  /*<span id='method-fm.websync.message-setBayeuxChannel'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the Bayeux message channel.
  	 </div>
  
  	@function setBayeuxChannel
  	@param {String} value
  	@return {void}
   */

  message.prototype.setBayeuxChannel = function() {
    var value;
    value = arguments[0];
    this.__bayeuxChannel = value;
    if (fm.websync.metaChannels.isServiceChannel(value)) {
      this.setChannel(fm.websync.metaChannels.convertChannelFromServiced(value));
    } else {
      if (!fm.websync.metaChannels.isMetaChannel(value)) {
        this.setChannel(value);
      }
    }
    return this.setIsDirty(true);
  };


  /*<span id='method-fm.websync.message-setChannel'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the channel to which the current client is publishing, subscribing, or unsubscribing.
  	 Overrides <see cref="fm.websync.message.channels">fm.websync.message.channels</see>.
  	 </div>
  
  	@function setChannel
  	@param {String} value
  	@return {void}
   */

  message.prototype.setChannel = function() {
    var value;
    value = arguments[0];
    this.__channels = fm.websync.extensible.sharedSetChannel(value, this.getValidate());
    return this.setIsDirty(true);
  };


  /*<span id='method-fm.websync.message-setChannels'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the channels to which the current client is subscribing or unsubscribing.
  	 Overrides <see cref="fm.websync.message.channel">fm.websync.message.channel</see>.
  	 </div>
  
  	@function setChannels
  	@param {fm.array} value
  	@return {void}
   */

  message.prototype.setChannels = function() {
    var value;
    value = arguments[0];
    this.__channels = fm.websync.extensible.sharedSetChannels(value, this.getValidate());
    return this.setIsDirty(true);
  };


  /*<span id='method-fm.websync.message-setClientId'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the unique identifier of the current client associated with the request/response.
  	 </div>
  
  	@function setClientId
  	@param {fm.nullable} value
  	@return {void}
   */

  message.prototype.setClientId = function() {
    var value;
    value = arguments[0];
    this.__clientId = value;
    return this.setIsDirty(true);
  };


  /*<span id='method-fm.websync.message-setConnectionType'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the type of connection the client is using, used internally.
  	 </div>
  
  	@function setConnectionType
  	@param {fm.nullable} value
  	@return {void}
   */

  message.prototype.setConnectionType = function() {
    var value;
    value = arguments[0];
    this.__connectionType = value;
    return this.setIsDirty(true);
  };


  /*<span id='method-fm.websync.message-setDisableBinary'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets whether binary is disabled.
  	 </div>
  
  	@function setDisableBinary
  	@param {fm.nullable} value
  	@return {void}
   */

  message.prototype.setDisableBinary = function() {
    var value;
    value = arguments[0];
    this.setExtensionValueJson("fm.dbin", fm.serializer.serializeBoolean(value), false);
    return this.setIsDirty(true);
  };


  /*<span id='method-fm.websync.message-setId'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the unique message identifier.
  	 </div>
  
  	@function setId
  	@param {String} value
  	@return {void}
   */

  message.prototype.setId = function() {
    var value;
    value = arguments[0];
    this.__id = value;
    return this.setIsDirty(true);
  };


  /*<span id='method-fm.websync.message-setKey'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the record key to which the current client is binding or unbinding.
  	 Overrides <see cref="fm.websync.message.keys">fm.websync.message.keys</see>, <see cref="fm.websync.message.record">fm.websync.message.record</see>, and <see cref="fm.websync.message.records">fm.websync.message.records</see>.
  	 </div>
  
  	@function setKey
  	@param {String} value
  	@return {void}
   */

  message.prototype.setKey = function() {
    var value;
    value = arguments[0];
    this.__records = fm.websync.extensible.sharedSetKey(value, this.getValidate());
    return this.setIsDirty(true);
  };


  /*<span id='method-fm.websync.message-setKeys'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the record keys to which the current client is binding or unbinding.
  	 Overrides <see cref="fm.websync.message.key">fm.websync.message.key</see>, <see cref="fm.websync.message.record">fm.websync.message.record</see>, and <see cref="fm.websync.message.records">fm.websync.message.records</see>.
  	 </div>
  
  	@function setKeys
  	@param {fm.array} value
  	@return {void}
   */

  message.prototype.setKeys = function() {
    var value;
    value = arguments[0];
    this.__records = fm.websync.extensible.sharedSetKeys(value, this.getValidate());
    return this.setIsDirty(true);
  };


  /*<span id='method-fm.websync.message-setLastClientId'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the last used client ID.
  	 </div>
  
  	@function setLastClientId
  	@param {fm.nullable} value
  	@return {void}
   */

  message.prototype.setLastClientId = function() {
    var value;
    value = arguments[0];
    this.setExtensionValueJson("fm.lcid", fm.serializer.serializeGuid(value), false);
    return this.setIsDirty(true);
  };


  /*<span id='method-fm.websync.message-setLastSessionId'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the last used session ID.
  	 </div>
  
  	@function setLastSessionId
  	@param {fm.nullable} value
  	@return {void}
   */

  message.prototype.setLastSessionId = function() {
    var value;
    value = arguments[0];
    this.setExtensionValueJson("fm.lsid", fm.serializer.serializeGuid(value), false);
    return this.setIsDirty(true);
  };


  /*<span id='method-fm.websync.message-setMinimumVersion'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the minimum supported server version, used internally.
  	 </div>
  
  	@function setMinimumVersion
  	@param {String} value
  	@return {void}
   */

  message.prototype.setMinimumVersion = function() {
    var value;
    value = arguments[0];
    this.__minimumVersion = value;
    return this.setIsDirty(true);
  };


  /*<span id='method-fm.websync.message-setNotifyClientId'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the ID of the client which the current client is notifying.
  	 </div>
  
  	@function setNotifyClientId
  	@param {fm.nullable} value
  	@return {void}
   */

  message.prototype.setNotifyClientId = function() {
    var value;
    value = arguments[0];
    this.setExtensionValueJson("fm.notify", fm.serializer.serializeGuid(value), false);
    return this.setIsDirty(true);
  };


  /*<span id='method-fm.websync.message-setNotifyingClient'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the notifying client details, used internally.
  	 </div>
  
  	@function setNotifyingClient
  	@param {fm.websync.notifyingClient} value
  	@return {void}
   */

  message.prototype.setNotifyingClient = function() {
    var value;
    value = arguments[0];
    this.setExtensionValueJson("fm.notifying", fm.websync.serializer.serializeNotifyingClient(value), false);
    return this.setIsDirty(true);
  };


  /*<span id='method-fm.websync.message-setPublishingClient'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the publishing client details, used internally.
  	 </div>
  
  	@function setPublishingClient
  	@param {fm.websync.publishingClient} value
  	@return {void}
   */

  message.prototype.setPublishingClient = function() {
    var value;
    value = arguments[0];
    this.setExtensionValueJson("fm.publishing", fm.websync.serializer.serializePublishingClient(value), false);
    return this.setIsDirty(true);
  };


  /*<span id='method-fm.websync.message-setRecord'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the record to which the current client is binding or unbinding.
  	 Overrides <see cref="fm.websync.message.records">fm.websync.message.records</see>, <see cref="fm.websync.message.key">fm.websync.message.key</see>, and <see cref="fm.websync.message.keys">fm.websync.message.keys</see>.
  	 </div>
  
  	@function setRecord
  	@param {fm.websync.record} value
  	@return {void}
   */

  message.prototype.setRecord = function() {
    var value;
    value = arguments[0];
    this.__records = fm.websync.extensible.sharedSetRecord(value, this.getValidate());
    return this.setIsDirty(true);
  };


  /*<span id='method-fm.websync.message-setRecords'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the records to which the current client is binding or unbinding.
  	 Overrides <see cref="fm.websync.message.record">fm.websync.message.record</see>, <see cref="fm.websync.message.key">fm.websync.message.key</see>, and <see cref="fm.websync.message.keys">fm.websync.message.keys</see>.
  	 </div>
  
  	@function setRecords
  	@param {fm.array} value
  	@return {void}
   */

  message.prototype.setRecords = function() {
    var value;
    value = arguments[0];
    this.__records = fm.websync.extensible.sharedSetRecords(value, this.getValidate());
    return this.setIsDirty(true);
  };


  /*<span id='method-fm.websync.message-setServerActions'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the server actions, used internally.
  	 </div>
  
  	@function setServerActions
  	@param {fm.array} value
  	@return {void}
   */

  message.prototype.setServerActions = function() {
    var value;
    value = arguments[0];
    this.setExtensionValueJson("fm.server", fm.websync.message.toJsonMultiple(value), false);
    return this.setIsDirty(true);
  };


  /*<span id='method-fm.websync.message-setServerTimeout'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the server timeout, used internally.
  	 </div>
  
  	@function setServerTimeout
  	@param {fm.nullable} value
  	@return {void}
   */

  message.prototype.setServerTimeout = function() {
    var value;
    value = arguments[0];
    this.setExtensionValueJson("fm.timeout", fm.serializer.serializeInteger(value), false);
    return this.setIsDirty(true);
  };


  /*<span id='method-fm.websync.message-setSessionId'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the session ID associated with the message, used internally.
  	 </div>
  
  	@function setSessionId
  	@param {fm.nullable} value
  	@return {void}
   */

  message.prototype.setSessionId = function() {
    var value;
    value = arguments[0];
    this.setExtensionValueJson("fm.sessionId", fm.serializer.serializeGuid(value), false);
    return this.setIsDirty(true);
  };


  /*<span id='method-fm.websync.message-setSupportedConnectionTypes'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the connection types supported by an endpoint, used internally.
  	 </div>
  
  	@function setSupportedConnectionTypes
  	@param {fm.array} value
  	@return {void}
   */

  message.prototype.setSupportedConnectionTypes = function() {
    var value;
    value = arguments[0];
    this.__supportedConnectionTypes = value;
    return this.setIsDirty(true);
  };


  /*<span id='method-fm.websync.message-setTag'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the tag associated with the request.
  	 </div>
  
  	@function setTag
  	@param {String} value
  	@return {void}
   */

  message.prototype.setTag = function() {
    var value;
    value = arguments[0];
    this.setExtensionValueJson("fm.tag", fm.serializer.serializeString(value != null ? value : fm.stringExtensions.empty), false);
    return this.setIsDirty(true);
  };


  /*<span id='method-fm.websync.message-setVersion'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the current server version, used internally.
  	 </div>
  
  	@function setVersion
  	@param {String} value
  	@return {void}
   */

  message.prototype.setVersion = function() {
    var value;
    value = arguments[0];
    this.__version = value;
    return this.setIsDirty(true);
  };


  /*<span id='method-fm.websync.message-toBinary'>&nbsp;</span> */


  /**
  	 <div>
  	 Serializes the message to binary.
  	 </div>
  	@function toBinary
  	@return {fm.array} The message in binary-serialized format.
   */

  message.prototype.toBinary = function() {
    return fm.websync.message.toBinary(this);
  };


  /*<span id='method-fm.websync.message-toJson'>&nbsp;</span> */


  /**
  	 <div>
  	 Serializes the message to JSON.
  	 </div>
  	@function toJson
  	@return {String} The message in JSON-serialized format.
   */

  message.prototype.toJson = function() {
    return fm.websync.message.toJson(this);
  };

  message.prototype.toJsonNoData = function() {
    var dataBytes, dataJson, str;
    dataBytes = arguments[0];
    dataJson = arguments[1];
    if (this.getIsBinary()) {
      dataBytes.setValue(this.getDataBytes());
      dataJson.setValue(null);
      this.setDataBytes(null);
      str = this.toJson();
      this.setDataBytes(dataBytes.getValue());
      return str;
    }
    dataBytes.setValue(null);
    dataJson.setValue(this.getDataJson());
    this.setDataJson(null);
    str = this.toJson();
    this.setDataJson(dataJson.getValue());
    return str;
  };

  return message;

})(fm.websync.baseMessage);



/*<span id='cls-fm.websync.publication'>&nbsp;</span> */

/**
@class fm.websync.publication
 <div>
 The WebSync publication used for direct publishing.
 </div>

@extends fm.websync.baseMessage
 */
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.publication = (function(superClass) {
  extend(publication, superClass);

  publication.prototype.__channel = null;


  /*<span id='method-fm.websync.publication-fm.websync.publication'>&nbsp;</span> */


  /**
  	 <div>
  	 Creates a new publication with a channel and JSON data.
  	 </div>
  	@function fm.websync.publication
  	@param {String} channel The channel to target.
  	@param {String} dataJson The data to send (in JSON format).
  	@param {String} tag The tag that identifies the contents of the payload.
  	@return {}
   */

  function publication() {
    this.toJson = bind(this.toJson, this);
    this.setTag = bind(this.setTag, this);
    this.setChannel = bind(this.setChannel, this);
    this.getTag = bind(this.getTag, this);
    this.getChannel = bind(this.getChannel, this);
    var channel, dataJson, instance, tag;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = publication.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    if (arguments.length === 2) {
      channel = arguments[0];
      dataJson = arguments[1];
      publication.call(this, channel, dataJson, null);
      return instance;
    }
    if (arguments.length === 3) {
      channel = arguments[0];
      dataJson = arguments[1];
      tag = arguments[2];
      instance = publication.__super__.constructor.call(this);
      this.setChannel(channel);
      this.setDataJson(dataJson);
      this.setTag(tag);
      return instance;
    }
    if (arguments.length === 0) {
      instance = publication.__super__.constructor.call(this);
      return instance;
    }
    if (arguments.length === 1) {
      channel = arguments[0];
      instance = publication.__super__.constructor.call(this);
      this.setChannel(channel);
      return instance;
    }
  }


  /*<span id='method-fm.websync.publication-fromJson'>&nbsp;</span> */


  /**
  	 <div>
  	 Deserializes a publication from JSON.
  	 </div>
  	@function fromJson
  	@param {String} publicationJson A JSON string to deserialize.
  	@return {fm.websync.publication} A deserialized publication.
   */

  publication.fromJson = function() {
    var publicationJson;
    publicationJson = arguments[0];
    return fm.websync.serializer.deserializePublication(publicationJson);
  };


  /*<span id='method-fm.websync.publication-fromJsonMultiple'>&nbsp;</span> */


  /**
  	 <div>
  	 Deserializes a list of publications from JSON.
  	 </div>
  	@function fromJsonMultiple
  	@param {String} publicationsJson A JSON string to deserialize.
  	@return {fm.array} A deserialized list of publications.
   */

  publication.fromJsonMultiple = function() {
    var publicationsJson;
    publicationsJson = arguments[0];
    return fm.websync.serializer.deserializePublicationArray(publicationsJson);
  };


  /*<span id='method-fm.websync.publication-fromMessage'>&nbsp;</span> */


  /**
  	 <div>
  	 Converts a Publication from its Message format.
  	 </div>
  	@function fromMessage
  	@param {fm.websync.message} message The message.
  	@return {fm.websync.publication} The publication.
   */

  publication.fromMessage = function() {
    var message, publication;
    message = arguments[0];
    if (fm.global.equals(message, null)) {
      return null;
    }
    publication = new fm.websync.publication();
    publication.setChannel(message.getBayeuxChannel());
    publication.setSuccessful(message.getSuccessful());
    publication.setError(message.getError());
    publication.setTimestamp(message.getTimestamp());
    publication.setDataJson(message.getDataJson());
    publication.setExtensions(message.getExtensions());
    return publication;
  };


  /*<span id='method-fm.websync.publication-fromMessages'>&nbsp;</span> */


  /**
  	 <div>
  	 Converts a set of Publications from their Message formats.
  	 </div>
  	@function fromMessages
  	@param {fm.array} messages The messages.
  	@return {fm.array} The publications.
   */

  publication.fromMessages = function() {
    var i, messages, publicationArray;
    messages = arguments[0];
    if (fm.global.equals(messages, null)) {
      return null;
    }
    publicationArray = new Array(messages.length);
    i = 0;
    while (i < messages.length) {
      try {
        publicationArray[i] = fm.websync.publication.fromMessage(messages[i]);
      } finally {
        i++;
      }
    }
    return publicationArray;
  };


  /*<span id='method-fm.websync.publication-toJson'>&nbsp;</span> */


  /**
  	 <div>
  	 Serializes a publication to JSON.
  	 </div>
  	@function toJson
  	@param {fm.websync.publication} publication A publication to serialize.
  	@return {String} A JSON-serialized publication.
   */

  publication.toJson = function() {
    var publication;
    publication = arguments[0];
    return fm.websync.serializer.serializePublication(publication);
  };


  /*<span id='method-fm.websync.publication-toJsonMultiple'>&nbsp;</span> */


  /**
  	 <div>
  	 Serializes a list of publications to JSON.
  	 </div>
  	@function toJsonMultiple
  	@param {fm.array} publications A list of publications to serialize.
  	@return {String} A JSON-serialized array of publications.
   */

  publication.toJsonMultiple = function() {
    var publications;
    publications = arguments[0];
    return fm.websync.serializer.serializePublicationArray(publications);
  };


  /*<span id='method-fm.websync.publication-toMessage'>&nbsp;</span> */


  /**
  	 <div>
  	 Converts a Publication to its Message format.
  	 </div>
  	@function toMessage
  	@param {fm.websync.publication} publication The publication.
  	@return {fm.websync.message} The message.
   */

  publication.toMessage = function() {
    var message, publication;
    publication = arguments[0];
    if (fm.global.equals(publication, null)) {
      return null;
    }
    message = new fm.websync.message();
    message.setBayeuxChannel(publication.getChannel());
    message.setSuccessful(publication.getSuccessful());
    message.setError(publication.getError());
    message.setTimestamp(publication.getTimestamp());
    message.setDataJson(publication.getDataJson());
    message.setExtensions(publication.getExtensions());
    return message;
  };


  /*<span id='method-fm.websync.publication-toMessages'>&nbsp;</span> */


  /**
  	 <div>
  	 Converts a set of Publications to their Message formats.
  	 </div>
  	@function toMessages
  	@param {fm.array} publications The publications.
  	@return {fm.array} The messages.
   */

  publication.toMessages = function() {
    var i, messageArray, publications;
    publications = arguments[0];
    if (fm.global.equals(publications, null)) {
      return null;
    }
    messageArray = new Array(publications.length);
    i = 0;
    while (i < publications.length) {
      try {
        messageArray[i] = fm.websync.publication.toMessage(publications[i]);
      } finally {
        i++;
      }
    }
    return messageArray;
  };


  /*<span id='method-fm.websync.publication-getChannel'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the channel the publisher is targeting.
  	 </div>
  
  	@function getChannel
  	@return {String}
   */

  publication.prototype.getChannel = function() {
    return this.__channel;
  };


  /*<span id='method-fm.websync.publication-getTag'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the tag that identifies the contents of the payload.
  	 </div>
  
  	@function getTag
  	@return {String}
   */

  publication.prototype.getTag = function() {
    return fm.serializer.deserializeString(this.getExtensionValueJson("fm.tag"));
  };


  /*<span id='method-fm.websync.publication-setChannel'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the channel the publisher is targeting.
  	 </div>
  
  	@function setChannel
  	@param {String} value
  	@return {void}
   */

  publication.prototype.setChannel = function() {
    var _var0, _var1, error, value;
    value = arguments[0];
    if (fm.global.equals(value, null)) {
      this.__channel = value;
      return this.setIsDirty(true);
    } else {
      error = null;
      _var0 = new fm.holder(error);
      _var1 = fm.websync.extensible.validateChannel(value, _var0);
      error = _var0.getValue();
      if (!(!this.getValidate() || _var1)) {
        throw new Error(fm.stringExtensions.format("Invalid channel. {0}", error));
      }
      this.__channel = value;
      return this.setIsDirty(true);
    }
  };


  /*<span id='method-fm.websync.publication-setTag'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the tag that identifies the contents of the payload.
  	 </div>
  
  	@function setTag
  	@param {String} value
  	@return {void}
   */

  publication.prototype.setTag = function() {
    var value;
    value = arguments[0];
    this.setExtensionValueJson("fm.tag", fm.serializer.serializeString(value), false);
    return this.setIsDirty(true);
  };


  /*<span id='method-fm.websync.publication-toJson'>&nbsp;</span> */


  /**
  	 <div>
  	 Serializes the publication to JSON.
  	 </div>
  	@function toJson
  	@return {String} The publication in JSON-serialized format.
   */

  publication.prototype.toJson = function() {
    return fm.websync.publication.toJson(this);
  };

  return publication;

})(fm.websync.baseMessage);



/*<span id='cls-fm.websync.publisher'>&nbsp;</span> */

/**
@class fm.websync.publisher
 <div>
 <p>
 The WebSync publisher, used for publishing data rapidly and efficiently.
 </p>
 </div><div>
 <p>
 When developing real-time applications, it is often most efficient and secure to
 publish data from a server, a web service, or in general, a source that doesn't
 require the ability to subscribe to channels.  The <see cref="fm.websync.publisher">fm.websync.publisher</see> is
 designed to do just that.
 </p>
 <p>
 A common use case for the <see cref="fm.websync.publisher">fm.websync.publisher</see> is to send out data as it
 arrives from a real-time feed (e.g. stock data, sports scores, news articles, etc.).
 Wherever the feed is located, the <see cref="fm.websync.publisher">fm.websync.publisher</see> can be used to send
 out the data rapidly to any subscribed clients.
 </p>
 <p>
 For security reasons, WebSync Server blocks Publisher requests by default. To
 enable direct publication, make sure "allowPublishers" is enabled in web.config.
 </p>
 <p>
 The publisher always runs synchronously.
 </p>
 <p>
 There are multiple overloads for the "Publish" method. For batch
 publications, use the overloads that take a collection of
 <see cref="fm.websync.publication">Publications</see>. They will be automatically batched and
 delivered in a single round-trip.
 </p>
 </div>

@extends fm.websync.baseClient
 */
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.publisher = (function(superClass) {
  extend(publisher, superClass);

  publisher._onNotifyRequest = null;

  publisher._onNotifyResponse = null;

  publisher._onPublishRequest = null;

  publisher._onPublishResponse = null;

  publisher._onServiceRequest = null;

  publisher._onServiceResponse = null;

  publisher._requestUrlCache = null;

  publisher._requestUrlCacheLock = null;


  /*<span id='method-fm.websync.publisher-fm.websync.publisher'>&nbsp;</span> */


  /**
  	 <div>
  	 Initializes a new instance of the <see cref="fm.websync.publisher">fm.websync.publisher</see> class.
  	 </div>
  	@function fm.websync.publisher
  	@param {String} requestUrl The absolute URL of the WebSync server request handler.
  	@return {}
   */

  function publisher() {
    this.serviceMany = bind(this.serviceMany, this);
    this.service = bind(this.service, this);
    this.send = bind(this.send, this);
    this.raiseResponseEvent = bind(this.raiseResponseEvent, this);
    this.raiseRequestEvent = bind(this.raiseRequestEvent, this);
    this.raiseEvent = bind(this.raiseEvent, this);
    this.publishMany = bind(this.publishMany, this);
    this.publish = bind(this.publish, this);
    this.processRequestUrl = bind(this.processRequestUrl, this);
    this.performService = bind(this.performService, this);
    this.performPublish = bind(this.performPublish, this);
    this.performNotify = bind(this.performNotify, this);
    this.notifyMany = bind(this.notifyMany, this);
    this.notify = bind(this.notify, this);
    var instance, requestUrl;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = publisher.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    requestUrl = arguments[0];
    instance = publisher.__super__.constructor.call(this);
    this.setRequestUrl(requestUrl);
    return instance;
  }


  /*<span id='method-fm.websync.publisher-addOnNotifyRequest'>&nbsp;</span> */


  /**
  	 <div>
  	 Adds a handler that is raised before a <see cref="fm.websync.publisher">fm.websync.publisher</see> notify request begins. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to a request before it is sent to the server.
  	 </div>
  	@function addOnNotifyRequest
  	@param {fm.doubleAction} value
  	@return {void}
   */

  publisher.addOnNotifyRequest = function() {
    var value;
    value = arguments[0];
    return fm.websync.publisher._onNotifyRequest = fm.delegate.combine(fm.websync.publisher._onNotifyRequest, value);
  };


  /*<span id='method-fm.websync.publisher-addOnNotifyResponse'>&nbsp;</span> */


  /**
  	 <div>
  	 Adds a handler that is raised after a <see cref="fm.websync.publisher">fm.websync.publisher</see> notify response returns. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to a response after it is received from the server.
  	 </div>
  	@function addOnNotifyResponse
  	@param {fm.doubleAction} value
  	@return {void}
   */

  publisher.addOnNotifyResponse = function() {
    var value;
    value = arguments[0];
    return fm.websync.publisher._onNotifyResponse = fm.delegate.combine(fm.websync.publisher._onNotifyResponse, value);
  };


  /*<span id='method-fm.websync.publisher-addOnPublishRequest'>&nbsp;</span> */


  /**
  	 <div>
  	 Adds a handler that is raised before a <see cref="fm.websync.publisher">fm.websync.publisher</see> publish request begins. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to a request before it is sent to the server.
  	 </div>
  	@function addOnPublishRequest
  	@param {fm.doubleAction} value
  	@return {void}
   */

  publisher.addOnPublishRequest = function() {
    var value;
    value = arguments[0];
    return fm.websync.publisher._onPublishRequest = fm.delegate.combine(fm.websync.publisher._onPublishRequest, value);
  };


  /*<span id='method-fm.websync.publisher-addOnPublishResponse'>&nbsp;</span> */


  /**
  	 <div>
  	 Adds a handler that is raised after a <see cref="fm.websync.publisher">fm.websync.publisher</see> publish response returns. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to a response after it is received from the server.
  	 </div>
  	@function addOnPublishResponse
  	@param {fm.doubleAction} value
  	@return {void}
   */

  publisher.addOnPublishResponse = function() {
    var value;
    value = arguments[0];
    return fm.websync.publisher._onPublishResponse = fm.delegate.combine(fm.websync.publisher._onPublishResponse, value);
  };


  /*<span id='method-fm.websync.publisher-addOnServiceRequest'>&nbsp;</span> */


  /**
  	 <div>
  	 Adds a handler that is raised before a <see cref="fm.websync.publisher">fm.websync.publisher</see> service request begins. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to a request before it is sent to the server.
  	 </div>
  	@function addOnServiceRequest
  	@param {fm.doubleAction} value
  	@return {void}
   */

  publisher.addOnServiceRequest = function() {
    var value;
    value = arguments[0];
    return fm.websync.publisher._onServiceRequest = fm.delegate.combine(fm.websync.publisher._onServiceRequest, value);
  };


  /*<span id='method-fm.websync.publisher-addOnServiceResponse'>&nbsp;</span> */


  /**
  	 <div>
  	 Adds a handler that is raised after a <see cref="fm.websync.publisher">fm.websync.publisher</see> service response returns. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to a response after it is received from the server.
  	 </div>
  	@function addOnServiceResponse
  	@param {fm.doubleAction} value
  	@return {void}
   */

  publisher.addOnServiceResponse = function() {
    var value;
    value = arguments[0];
    return fm.websync.publisher._onServiceResponse = fm.delegate.combine(fm.websync.publisher._onServiceResponse, value);
  };


  /*<span id='method-fm.websync.publisher-removeOnNotifyRequest'>&nbsp;</span> */


  /**
  	 <div>
  	 Removes a handler that is raised before a <see cref="fm.websync.publisher">fm.websync.publisher</see> notify request begins. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to a request before it is sent to the server.
  	 </div>
  	@function removeOnNotifyRequest
  	@param {fm.doubleAction} value
  	@return {void}
   */

  publisher.removeOnNotifyRequest = function() {
    var value;
    value = arguments[0];
    return fm.websync.publisher._onNotifyRequest = fm.delegate.remove(fm.websync.publisher._onNotifyRequest, value);
  };


  /*<span id='method-fm.websync.publisher-removeOnNotifyResponse'>&nbsp;</span> */


  /**
  	 <div>
  	 Removes a handler that is raised after a <see cref="fm.websync.publisher">fm.websync.publisher</see> notify response returns. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to a response after it is received from the server.
  	 </div>
  	@function removeOnNotifyResponse
  	@param {fm.doubleAction} value
  	@return {void}
   */

  publisher.removeOnNotifyResponse = function() {
    var value;
    value = arguments[0];
    return fm.websync.publisher._onNotifyResponse = fm.delegate.remove(fm.websync.publisher._onNotifyResponse, value);
  };


  /*<span id='method-fm.websync.publisher-removeOnPublishRequest'>&nbsp;</span> */


  /**
  	 <div>
  	 Removes a handler that is raised before a <see cref="fm.websync.publisher">fm.websync.publisher</see> publish request begins. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to a request before it is sent to the server.
  	 </div>
  	@function removeOnPublishRequest
  	@param {fm.doubleAction} value
  	@return {void}
   */

  publisher.removeOnPublishRequest = function() {
    var value;
    value = arguments[0];
    return fm.websync.publisher._onPublishRequest = fm.delegate.remove(fm.websync.publisher._onPublishRequest, value);
  };


  /*<span id='method-fm.websync.publisher-removeOnPublishResponse'>&nbsp;</span> */


  /**
  	 <div>
  	 Removes a handler that is raised after a <see cref="fm.websync.publisher">fm.websync.publisher</see> publish response returns. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to a response after it is received from the server.
  	 </div>
  	@function removeOnPublishResponse
  	@param {fm.doubleAction} value
  	@return {void}
   */

  publisher.removeOnPublishResponse = function() {
    var value;
    value = arguments[0];
    return fm.websync.publisher._onPublishResponse = fm.delegate.remove(fm.websync.publisher._onPublishResponse, value);
  };


  /*<span id='method-fm.websync.publisher-removeOnServiceRequest'>&nbsp;</span> */


  /**
  	 <div>
  	 Removes a handler that is raised before a <see cref="fm.websync.publisher">fm.websync.publisher</see> service request begins. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to a request before it is sent to the server.
  	 </div>
  	@function removeOnServiceRequest
  	@param {fm.doubleAction} value
  	@return {void}
   */

  publisher.removeOnServiceRequest = function() {
    var value;
    value = arguments[0];
    return fm.websync.publisher._onServiceRequest = fm.delegate.remove(fm.websync.publisher._onServiceRequest, value);
  };


  /*<span id='method-fm.websync.publisher-removeOnServiceResponse'>&nbsp;</span> */


  /**
  	 <div>
  	 Removes a handler that is raised after a <see cref="fm.websync.publisher">fm.websync.publisher</see> service response returns. This event is
  	 designed to support extensions by allowing modifications to be applied
  	 to a response after it is received from the server.
  	 </div>
  	@function removeOnServiceResponse
  	@param {fm.doubleAction} value
  	@return {void}
   */

  publisher.removeOnServiceResponse = function() {
    var value;
    value = arguments[0];
    return fm.websync.publisher._onServiceResponse = fm.delegate.remove(fm.websync.publisher._onServiceResponse, value);
  };


  /*<span id='method-fm.websync.publisher-notify'>&nbsp;</span> */


  /**
  	 <div>
  	 Sends a notification synchronously over HTTP.
  	 </div><div>
  	 This method always executes synchronously and returns the
  	 <see cref="fm.websync.notification">fm.websync.notification</see> it automatically creates.
  	 </div>
  	@function notify
  	@param {fm.guid} clientId The client to which the data should be sent.
  	@param {String} dataJson The data to deliver (in JSON format).
  	@param {String} tag The tag that identifies the contents of the payload.
  	@return {fm.websync.notification} The generated notification.
   */

  publisher.prototype.notify = function() {
    var clientId, dataJson, notification, notificationArray, tag;
    if (arguments.length === 3) {
      clientId = arguments[0];
      dataJson = arguments[1];
      tag = arguments[2];
      return this.notify(new fm.websync.notification(clientId, dataJson, tag));
    }
    if (arguments.length === 2) {
      clientId = arguments[0];
      dataJson = arguments[1];
      return this.notify(new fm.websync.notification(clientId, dataJson));
    }
    if (arguments.length === 1) {
      notification = arguments[0];
      notificationArray = this.notifyMany([notification]);
      if ((fm.global.equals(notificationArray, null)) || (fm.global.equals(notificationArray.length, 0))) {
        return null;
      }
      return notificationArray[0];
    }
  };


  /*<span id='method-fm.websync.publisher-notifyMany'>&nbsp;</span> */


  /**
  	 <div>
  	 Sends an array of notifications synchronously over HTTP.
  	 </div><div>
  	 This method always executes synchronously and returns the
  	 <see cref="fm.websync.notification">Notifications</see> it sends.
  	 </div>
  	@function notifyMany
  	@param {fm.array} notifications The notifications to send.
  	@return {fm.array} The completed notifications.
   */

  publisher.prototype.notifyMany = function() {
    var notifications;
    notifications = arguments[0];
    if ((fm.global.equals(notifications, null)) || (fm.global.equals(notifications.length, 0))) {
      throw new Error("notifications cannot be null/empty.");
    }
    return this.performNotify(notifications);
  };

  publisher.prototype.performNotify = function() {
    var args, args3, notificationArray, requestMessages, requestNotifications, responseArgs;
    requestNotifications = arguments[0];
    args3 = new fm.websync.publisherNotifyRequestArgs();
    args3.setRequests(requestNotifications);
    if (this.raiseRequestEvent(fm.websync.publisher._onNotifyRequest, args3)) {
      requestMessages = fm.websync.notification.toMessages(requestNotifications);
      responseArgs = this.send(requestMessages, this.getRequestUrl());
      notificationArray = fm.websync.notification.fromMessages(responseArgs.getResponses());
      args = new fm.websync.publisherNotifyResponseArgs();
      args.setRequests(requestNotifications);
      args.setResponses(notificationArray);
      this.raiseResponseEvent(fm.websync.publisher._onNotifyResponse, args, responseArgs);
      if (!fm.global.equals(responseArgs.getException(), null)) {
        throw responseArgs.getException();
      }
      return notificationArray;
    }
    return null;
  };

  publisher.prototype.performPublish = function() {
    var args, args3, publicationArray, requestMessages, requestPublications, responseArgs;
    requestPublications = arguments[0];
    args3 = new fm.websync.publisherPublishRequestArgs();
    args3.setRequests(requestPublications);
    if (this.raiseRequestEvent(fm.websync.publisher._onPublishRequest, args3)) {
      requestMessages = fm.websync.publication.toMessages(requestPublications);
      responseArgs = this.send(requestMessages, this.getRequestUrl());
      publicationArray = fm.websync.publication.fromMessages(responseArgs.getResponses());
      args = new fm.websync.publisherPublishResponseArgs();
      args.setRequests(requestPublications);
      args.setResponses(publicationArray);
      this.raiseResponseEvent(fm.websync.publisher._onPublishResponse, args, responseArgs);
      if (!fm.global.equals(responseArgs.getException(), null)) {
        throw responseArgs.getException();
      }
      return publicationArray;
    }
    return null;
  };

  publisher.prototype.performService = function() {
    var _var0, args, args3, i, len, message, requestMessages, responseArgs, responses;
    requestMessages = arguments[0];
    _var0 = requestMessages;
    for (i = 0, len = _var0.length; i < len; i++) {
      message = _var0[i];
      if (!fm.websync.metaChannels.isServiceChannel(message.getBayeuxChannel())) {
        message.setBayeuxChannel(fm.websync.metaChannels.convertChannelToServiced(message.getBayeuxChannel()));
      }
    }
    args3 = new fm.websync.publisherServiceRequestArgs();
    args3.setRequests(requestMessages);
    if (this.raiseRequestEvent(fm.websync.publisher._onServiceRequest, args3)) {
      responseArgs = this.send(requestMessages, this.getRequestUrl());
      responses = responseArgs.getResponses();
      args = new fm.websync.publisherServiceResponseArgs();
      args.setRequests(requestMessages);
      args.setResponses(responses);
      this.raiseResponseEvent(fm.websync.publisher._onServiceResponse, args, responseArgs);
      if (!fm.global.equals(responseArgs.getException(), null)) {
        throw responseArgs.getException();
      }
      return responses;
    }
    return null;
  };

  publisher.prototype.processRequestUrl = function() {
    var _var0, _var1, flag, requestUrl, str;
    requestUrl = arguments[0];
    if (fm.stringExtensions.isNullOrEmpty(requestUrl)) {
      requestUrl = this.getRequestUrl();
    }
    flag = false;
    str = null;
    if (fm.global.equals(this.getConcurrencyMode(), fm.websync.concurrencyMode.High)) {
      _var0 = new fm.holder(str);
      _var1 = fm.hashExtensions.tryGetValue(fm.websync.publisher._requestUrlCache, requestUrl, _var0);
      str = _var0.getValue();
      flag = _var1;
    }
    if (!flag) {
      str = requestUrl;
      str = fm.httpTransfer.addQueryToUrl(fm.httpTransfer.addQueryToUrl(str, "src", fm.httpWebRequestTransfer.getPlatformCode()), "AspxAutoDetectCookieSupport", "1");
      if (!fm.global.equals(this.getConcurrencyMode(), fm.websync.concurrencyMode.High)) {
        return str;
      }
      fm.websync.publisher._requestUrlCache[requestUrl] = str;
    }
    return str;
  };


  /*<span id='method-fm.websync.publisher-publish'>&nbsp;</span> */


  /**
  	 <div>
  	 Sends a publication synchronously over HTTP.
  	 </div><div>
  	 This method always executes synchronously and returns the
  	 <see cref="fm.websync.publication">fm.websync.publication</see> it automatically creates.
  	 </div>
  	@function publish
  	@param {String} channel The channel to which the data should be sent.
  	@param {String} dataJson The data to send (in JSON format).
  	@param {String} tag The tag that identifies the contents of the payload.
  	@return {fm.websync.publication} The generated publication.
   */

  publisher.prototype.publish = function() {
    var channel, dataJson, publication, publicationArray, tag;
    if (arguments.length === 3) {
      channel = arguments[0];
      dataJson = arguments[1];
      tag = arguments[2];
      return this.publish(new fm.websync.publication(channel, dataJson, tag));
    }
    if (arguments.length === 1) {
      publication = arguments[0];
      publicationArray = this.publishMany([publication]);
      if ((fm.global.equals(publicationArray, null)) || (fm.global.equals(publicationArray.length, 0))) {
        return null;
      }
      return publicationArray[0];
    }
    if (arguments.length === 2) {
      channel = arguments[0];
      dataJson = arguments[1];
      return this.publish(new fm.websync.publication(channel, dataJson));
    }
  };


  /*<span id='method-fm.websync.publisher-publishMany'>&nbsp;</span> */


  /**
  	 <div>
  	 Sends an array of publications synchronously over HTTP.
  	 </div><div>
  	 This method always executes synchronously and returns the
  	 <see cref="fm.websync.publication">Publications</see> it sends.
  	 </div>
  	@function publishMany
  	@param {fm.array} publications The publications to send.
  	@return {fm.array} The completed publications.
   */

  publisher.prototype.publishMany = function() {
    var publications;
    publications = arguments[0];
    if ((fm.global.equals(publications, null)) || (fm.global.equals(publications.length, 0))) {
      throw new Error("publications cannot be null/empty.");
    }
    return this.performPublish(publications);
  };

  publisher.prototype.raiseEvent = function() {
    var args, eventMethod;
    eventMethod = arguments[0];
    args = arguments[1];
    args.setPublisher(this);
    if (!fm.global.equals(eventMethod, null)) {
      return eventMethod(this, args);
    }
  };

  publisher.prototype.raiseRequestEvent = function() {
    var args, eventMethod;
    eventMethod = arguments[0];
    args = arguments[1];
    this.raiseEvent(eventMethod, args);
    return !args.getCancel();
  };

  publisher.prototype.raiseResponseEvent = function() {
    var args, eventMethod, responseArgs;
    eventMethod = arguments[0];
    args = arguments[1];
    responseArgs = arguments[2];
    args.setException(responseArgs.getException());
    return this.raiseEvent(eventMethod, args);
  };

  publisher.prototype.send = function() {
    var _var0, args2, args3, args4, args5, args6, error, exception1, httpMessageTransfer, i, len, message, requestArgs, requestMessages, str, url;
    requestMessages = arguments[0];
    url = arguments[1];
    str = this.processRequestUrl(url);
    url = this.processRequestUrl(url);
    _var0 = requestMessages;
    for (i = 0, len = _var0.length; i < len; i++) {
      message = _var0[i];
      if (this.getDisableBinary()) {
        message.setDisableBinary(this.getDisableBinary());
      }
    }
    args6 = new fm.websync.messageRequestArgs(this.createHeaders());
    args6.setMessages(requestMessages);
    args6.setOnRequestCreated(this.internalOnRequestCreated);
    args6.setOnResponseReceived(this.internalOnResponseReceived);
    args6.setOnHttpRequestCreated(this.internalOnHttpRequestCreated);
    args6.setOnHttpResponseReceived(this.internalOnHttpResponseReceived);
    args6.setSender(this);
    args6.setTimeout(this.getRequestTimeout());
    args6.setUrl(url);
    requestArgs = args6;
    requestArgs.setDynamicValue("frameUrl", str);
    httpMessageTransfer = fm.websync.messageTransferFactory.getHttpMessageTransfer();
    args2 = httpMessageTransfer.send(requestArgs);
    try {
      httpMessageTransfer.shutdown();
    } catch (error) {
      exception1 = error;
    } finally {

    }
    if (!fm.global.equals(args2.getException(), null)) {
      args3 = new fm.websync.publisherResponseArgs();
      args3.setException(args2.getException());
      return args3;
    }
    if ((fm.global.equals(args2.getMessages(), null)) || (fm.global.equals(args2.getMessages().length, 0))) {
      args4 = new fm.websync.publisherResponseArgs();
      args4.setException(new Error("Invalid response received from server."));
      return args4;
    }
    args5 = new fm.websync.publisherResponseArgs();
    args5.setResponses(args2.getMessages());
    return args5;
  };


  /*<span id='method-fm.websync.publisher-service'>&nbsp;</span> */


  /**
  	 <div>
  	 Services a message synchronously over HTTP.
  	 </div><div>
  	 This method always executes synchronously and returns the
  	 <see cref="fm.websync.message">fm.websync.message</see> it automatically creates.
  	 </div>
  	@function service
  	@param {String} channel The channel to which the data should be serviced.
  	@param {String} dataJson The data to send (in JSON format).
  	@param {String} tag The tag that identifies the contents of the payload.
  	@return {fm.websync.message} The generated message.
   */

  publisher.prototype.service = function() {
    var channel, dataJson, message, messageArray, tag;
    if (arguments.length === 2) {
      channel = arguments[0];
      dataJson = arguments[1];
      message = new fm.websync.message(fm.websync.metaChannels.convertChannelToServiced(channel));
      message.setDataJson(dataJson);
      return this.service(message);
    }
    if (arguments.length === 3) {
      channel = arguments[0];
      dataJson = arguments[1];
      tag = arguments[2];
      message = new fm.websync.message(fm.websync.metaChannels.convertChannelToServiced(channel));
      message.setDataJson(dataJson);
      message.setTag(tag);
      return this.service(message);
    }
    if (arguments.length === 1) {
      message = arguments[0];
      messageArray = this.serviceMany([message]);
      if ((fm.global.equals(messageArray, null)) || (fm.global.equals(messageArray.length, 0))) {
        return null;
      }
      return messageArray[0];
    }
  };


  /*<span id='method-fm.websync.publisher-serviceMany'>&nbsp;</span> */


  /**
  	 <div>
  	 Services an array of messages synchronously over HTTP.
  	 </div><div>
  	 This method always executes synchronously and returns the
  	 <see cref="fm.websync.message">Messages</see> it sends.
  	 </div>
  	@function serviceMany
  	@param {fm.array} messages The messages to send.
  	@return {fm.array} The completed messages.
   */

  publisher.prototype.serviceMany = function() {
    var messages;
    messages = arguments[0];
    if ((fm.global.equals(messages, null)) || (fm.global.equals(messages.length, 0))) {
      throw new Error("messages cannot be null/empty.");
    }
    return this.performService(messages);
  };

  publisher._requestUrlCache = {};

  publisher._requestUrlCacheLock = new fm.object();

  return publisher;

})(fm.websync.baseClient);



/*<span id='cls-fm.websync.record'>&nbsp;</span> */

/**
@class fm.websync.record
 <div>
 A key-value record for binding to a client.
 </div>

@extends fm.dynamic
 */
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.record = (function(superClass) {
  extend(record, superClass);

  record.prototype.__key = null;

  record.prototype.__priv = false;

  record.prototype.__valueJson = null;

  record.prototype._validate = false;


  /*<span id='method-fm.websync.record-fm.websync.record'>&nbsp;</span> */


  /**
  	 <div>
  	 Initializes a new instance of the <see cref="fm.websync.record">fm.websync.record</see> class.
  	 </div>
  	@function fm.websync.record
  	@param {String} key The key used to locate the value.
  	@param {String} valueJson The value in JSON format.
  	@param {Boolean} priv Whether the record is (to be) private.
  	@return {}
   */

  function record() {
    this.setValue = bind(this.setValue, this);
    this.getValue = bind(this.getValue, this);
    this.toString = bind(this.toString, this);
    this.toJson = bind(this.toJson, this);
    this.setValueJson = bind(this.setValueJson, this);
    this.setValidate = bind(this.setValidate, this);
    this.setPrivate = bind(this.setPrivate, this);
    this.setKey = bind(this.setKey, this);
    this.getValueJson = bind(this.getValueJson, this);
    this.getValidate = bind(this.getValidate, this);
    this.getPrivate = bind(this.getPrivate, this);
    this.getKey = bind(this.getKey, this);
    this.getHashCode = bind(this.getHashCode, this);
    this.equals = bind(this.equals, this);
    this.duplicate = bind(this.duplicate, this);
    var instance, key, priv, valueJson;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = record.__super__.constructor.call(this);
      this.setValidate(true);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    if (arguments.length === 1) {
      key = arguments[0];
      record.call(this, key, null);
      return instance;
    }
    if (arguments.length === 0) {
      instance = record.__super__.constructor.call(this);
      this.setValidate(true);
      return instance;
    }
    if (arguments.length === 3) {
      key = arguments[0];
      valueJson = arguments[1];
      priv = arguments[2];
      record.call(this);
      this.setKey(key);
      this.setValueJson(valueJson);
      this.setPrivate(priv);
      return instance;
    }
    if (arguments.length === 2) {
      key = arguments[0];
      valueJson = arguments[1];
      record.call(this, key, valueJson, false);
      return instance;
    }
  }


  /*<span id='method-fm.websync.record-fromJson'>&nbsp;</span> */


  /**
  	 <div>
  	 Deserializes a record from JSON.
  	 </div>
  	@function fromJson
  	@param {String} recordJson A JSON string to deserialize.
  	@return {fm.websync.record} A deserialized record.
   */

  record.fromJson = function() {
    var recordJson;
    recordJson = arguments[0];
    return fm.websync.serializer.deserializeRecord(recordJson);
  };


  /*<span id='method-fm.websync.record-fromJsonMultiple'>&nbsp;</span> */


  /**
  	 <div>
  	 Deserializes a list of records from JSON.
  	 </div>
  	@function fromJsonMultiple
  	@param {String} recordsJson A JSON string to deserialize.
  	@return {fm.array} A deserialized list of records.
   */

  record.fromJsonMultiple = function() {
    var recordsJson;
    recordsJson = arguments[0];
    return fm.websync.serializer.deserializeRecordArray(recordsJson);
  };


  /*<span id='method-fm.websync.record-toJson'>&nbsp;</span> */


  /**
  	 <div>
  	 Serializes a record to JSON.
  	 </div>
  	@function toJson
  	@param {fm.websync.record} record A record to serialize.
  	@return {String} A JSON-serialized record.
   */

  record.toJson = function() {
    var record;
    record = arguments[0];
    return fm.websync.serializer.serializeRecord(record);
  };


  /*<span id='method-fm.websync.record-toJsonMultiple'>&nbsp;</span> */


  /**
  	 <div>
  	 Serializes a list of records to JSON.
  	 </div>
  	@function toJsonMultiple
  	@param {fm.array} records A list of records to serialize.
  	@return {String} A JSON-serialized array of records.
   */

  record.toJsonMultiple = function() {
    var records;
    records = arguments[0];
    return fm.websync.serializer.serializeRecordArray(records);
  };


  /*<span id='method-fm.websync.record-duplicate'>&nbsp;</span> */


  /**
  	 <div>
  	 Creates a deep clone of this record.
  	 </div>
  	@function duplicate
  	@return {fm.websync.record} A deep clone of this record.
   */

  record.prototype.duplicate = function() {
    var record;
    record = new fm.websync.record(this.getKey());
    record.setValidate(false);
    record.setValueJson(this.getValueJson());
    record.setPrivate(this.getPrivate());
    record.setValidate(true);
    return record;
  };


  /*<span id='method-fm.websync.record-equals'>&nbsp;</span> */


  /**
  	 <div>
  	 Determines whether the specified object is equal to this instance.
  	 </div>
  	@function equals
  	@param {fm.object} obj The object to compare with this instance.
  	@return {Boolean} true if the specified object is equal to this instance; otherwise, false.
   */

  record.prototype.equals = function() {
    var obj, record;
    obj = arguments[0];
    record = fm.global.tryCast(obj, fm.websync.record);
    return fm.global.equals(record, this);
  };


  /*<span id='method-fm.websync.record-getHashCode'>&nbsp;</span> */


  /**
  	 <div>
  	 Returns a hash code for this instance.
  	 </div>
  	@function getHashCode
  	@return {Integer} 
  	 A hash code for this instance, suitable for use in hashing algorithms and data structures like a hash table.
   */

  record.prototype.getHashCode = function() {
    var num;
    num = 17;
    if (!fm.global.equals(this.getKey(), null)) {
      num = (num * 23) + this.getKey().hashCode();
    }
    if (!fm.global.equals(this.getValueJson(), null)) {
      num = (num * 23) + this.getValueJson().hashCode();
    }
    return (num * 23) + this.getPrivate().hashCode();
  };


  /*<span id='method-fm.websync.record-getKey'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the key used to locate the value.
  	 </div>
  
  	@function getKey
  	@return {String}
   */

  record.prototype.getKey = function() {
    return this.__key;
  };


  /*<span id='method-fm.websync.record-getPrivate'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the flag that indicates whether or not the record is (to be) hidden from other
  	 clients. If <c>true</c>, the record will only be visible to the source client
  	 and the server. If <c>false</c> or <c>null</c>, the record will be publicly
  	 visible to other clients. Defaults to <c>null</c>.
  	 </div>
  
  	@function getPrivate
  	@return {Boolean}
   */

  record.prototype.getPrivate = function() {
    return this.__priv;
  };

  record.prototype.getValidate = function() {
    return this._validate;
  };


  /*<span id='method-fm.websync.record-getValueJson'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the record value.  This must be valid JSON.
  	 </div>
  
  	@function getValueJson
  	@return {String}
   */

  record.prototype.getValueJson = function() {
    return this.__valueJson;
  };


  /*<span id='method-fm.websync.record-setKey'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the key used to locate the value.
  	 </div>
  
  	@function setKey
  	@param {String} value
  	@return {void}
   */

  record.prototype.setKey = function() {
    var value;
    value = arguments[0];
    if (fm.global.equals(value, null)) {
      throw new Error("key cannot be null.");
    }
    this.__key = value;
    return this.setIsDirty(true);
  };


  /*<span id='method-fm.websync.record-setPrivate'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the flag that indicates whether or not the record is (to be) hidden from other
  	 clients. If <c>true</c>, the record will only be visible to the source client
  	 and the server. If <c>false</c> or <c>null</c>, the record will be publicly
  	 visible to other clients. Defaults to <c>null</c>.
  	 </div>
  
  	@function setPrivate
  	@param {Boolean} value
  	@return {void}
   */

  record.prototype.setPrivate = function() {
    var value;
    value = arguments[0];
    this.__priv = value;
    return this.setIsDirty(true);
  };

  record.prototype.setValidate = function() {
    var value;
    value = arguments[0];
    return this._validate = value;
  };


  /*<span id='method-fm.websync.record-setValueJson'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the record value.  This must be valid JSON.
  	 </div>
  
  	@function setValueJson
  	@param {String} value
  	@return {void}
   */

  record.prototype.setValueJson = function() {
    var value;
    value = arguments[0];
    if (!((!this.getValidate() || (fm.global.equals(value, null))) || fm.serializer.isValidJson(value))) {
      throw new Error("value is not valid JSON.");
    }
    this.__valueJson = value;
    return this.setIsDirty(true);
  };


  /*<span id='method-fm.websync.record-toJson'>&nbsp;</span> */


  /**
  	 <div>
  	 Serializes the record to JSON.
  	 </div>
  	@function toJson
  	@return {String} The record in JSON-serialized format.
   */

  record.prototype.toJson = function() {
    return fm.websync.record.toJson(this);
  };


  /*<span id='method-fm.websync.record-toString'>&nbsp;</span> */


  /**
  	 <div>
  	 Returns a string that represents this instance.
  	 </div>
  	@function toString
  	@return {String} 
  	 A string that represents this instance.
   */

  record.prototype.toString = function() {
    return this.toJson();
  };

  record.prototype.getValue = function() {
    return fm.json.deserialize(this.getValueJson.apply(this, arguments));
  };

  record.prototype.setValue = function() {
    var value;
    value = arguments[0];
    arguments[arguments.length - 1] = fm.json.serialize(arguments[arguments.length - 1]);
    return this.setValueJson.apply(this, arguments);
  };

  return record;

})(fm.dynamic);


var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.serializer = (function(superClass) {
  extend(serializer, superClass);

  function serializer() {
    var instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = serializer.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    instance = serializer.__super__.constructor.call(this);
    return instance;
  }

  serializer.createAdvice = function() {
    return new fm.websync.advice();
  };

  serializer.createBaseAdvice = function() {
    return new fm.websync.baseAdvice();
  };

  serializer.createBoundRecords = function() {
    return {};
  };

  serializer.createExtensions = function() {
    return new fm.websync.extensions();
  };

  serializer.createMessage = function() {
    return new fm.websync.message();
  };

  serializer.createNotification = function() {
    return new fm.websync.notification();
  };

  serializer.createNotifyingClient = function() {
    return new fm.websync.notifyingClient();
  };

  serializer.createPublication = function() {
    return new fm.websync.publication();
  };

  serializer.createPublishingClient = function() {
    return new fm.websync.publishingClient();
  };

  serializer.createRecord = function() {
    return new fm.websync.record("key");
  };

  serializer.createSubscribedClient = function() {
    return new fm.websync.subscribedClient();
  };

  serializer.createSubscription = function() {
    return new fm.websync.subscription("/");
  };

  serializer.deserializeAdvice = function() {
    var adviceJson;
    adviceJson = arguments[0];
    return fm.serializer.deserializeObjectFast(adviceJson, serializer.createAdvice, serializer.deserializeAdviceCallback);
  };

  serializer.deserializeAdviceCallback = function() {
    var advice, name, valueJson;
    advice = arguments[0];
    name = arguments[1];
    valueJson = arguments[2];
    switch (name) {
      case "websocket":
        advice.setWebSocket(fm.websync.serializer.deserializeBaseAdvice(valueJson));
        return;
      case "long-polling":
        advice.setLongPolling(fm.websync.serializer.deserializeBaseAdvice(valueJson));
        return;
      case "callback-polling":
        advice.setCallbackPolling(fm.websync.serializer.deserializeBaseAdvice(valueJson));
        return;
    }
    return fm.websync.serializer.deserializeBaseAdviceCallback(advice, name, valueJson);
  };

  serializer.deserializeBaseAdvice = function() {
    var baseAdviceJson;
    baseAdviceJson = arguments[0];
    return fm.serializer.deserializeObjectFast(baseAdviceJson, serializer.createBaseAdvice, serializer.deserializeBaseAdviceCallback);
  };

  serializer.deserializeBaseAdviceCallback = function() {
    var advice, name, str, valueJson;
    advice = arguments[0];
    name = arguments[1];
    valueJson = arguments[2];
    str = name;
    if (!fm.global.equals(str, null)) {
      if (!(fm.global.equals(str, "hosts"))) {
        if (fm.global.equals(str, "interval")) {
          return advice.setInterval(fm.serializer.deserializeInteger(valueJson));
        } else {
          if (fm.global.equals(str, "reconnect")) {
            return advice.setReconnect(fm.websync.serializer.deserializeReconnect(valueJson));
          }
        }
      } else {
        return advice.setHosts(fm.serializer.deserializeStringArray(valueJson));
      }
    }
  };

  serializer.deserializeBoundRecords = function() {
    var boundRecordsJson;
    boundRecordsJson = arguments[0];
    return fm.serializer.deserializeObject(boundRecordsJson, serializer.createBoundRecords, serializer.deserializeBoundRecordsCallback);
  };

  serializer.deserializeBoundRecordsCallback = function() {
    var boundRecords, name, valueJson;
    boundRecords = arguments[0];
    name = arguments[1];
    valueJson = arguments[2];
    return boundRecords[name] = new fm.websync.record(name, fm.serializer.deserializeRaw(valueJson));
  };

  serializer.deserializeConnectionType = function() {
    var connectionTypeJson;
    connectionTypeJson = arguments[0];
    switch (fm.serializer.deserializeString(connectionTypeJson)) {
      case "long-polling":
        return fm.websync.connectionType.LongPolling;
      case "callback-polling":
        return fm.websync.connectionType.CallbackPolling;
      case "websocket":
        return fm.websync.connectionType.WebSocket;
      case "iframe":
        return fm.websync.connectionType.IFrame;
      case "flash":
        return fm.websync.connectionType.Flash;
    }
    return fm.websync.connectionType.Unknown;
  };

  serializer.deserializeConnectionTypeArray = function() {
    var connectionTypesJson, i, strArray, typeArray;
    connectionTypesJson = arguments[0];
    if (((fm.stringExtensions.isNullOrEmpty(connectionTypesJson) || (fm.global.equals(connectionTypesJson, "null"))) || ((connectionTypesJson.length < 2) || (!fm.global.equals(connectionTypesJson.charAt(0), '[')))) || (!fm.global.equals(connectionTypesJson.charAt(connectionTypesJson.length - 1), ']'))) {
      return null;
    }
    connectionTypesJson = fm.stringExtensions.substring(connectionTypesJson, 1, connectionTypesJson.length - 2);
    strArray = fm.stringExtensions.split(connectionTypesJson, [',']);
    typeArray = new Array(strArray.length);
    i = 0;
    while (i < strArray.length) {
      try {
        typeArray[i] = fm.websync.serializer.deserializeConnectionType(strArray[i]);
      } finally {
        i++;
      }
    }
    return typeArray;
  };

  serializer.deserializeExtensions = function() {
    var extensionsJson;
    extensionsJson = arguments[0];
    return fm.serializer.deserializeObjectFast(extensionsJson, serializer.createExtensions, serializer.deserializeExtensionsCallback);
  };

  serializer.deserializeExtensionsCallback = function() {
    var extensions, name, valueJson;
    extensions = arguments[0];
    name = arguments[1];
    valueJson = arguments[2];
    return extensions.setValueJson(name, fm.serializer.deserializeRaw(valueJson), false);
  };

  serializer.deserializeMessage = function() {
    var messageJson;
    messageJson = arguments[0];
    return fm.serializer.deserializeObjectFast(messageJson, serializer.createMessage, serializer.deserializeMessageCallback);
  };

  serializer.deserializeMessageArray = function() {
    var list, messagesJson;
    messagesJson = arguments[0];
    list = fm.serializer.deserializeObjectArrayFast(messagesJson, serializer.createMessage, serializer.deserializeMessageCallback);
    if (fm.global.equals(list, null)) {
      return null;
    }
    return fm.arrayExtensions.toArray(list);
  };

  serializer.deserializeMessageCallback = function() {
    var message, name, nullable, str, valueJson;
    message = arguments[0];
    name = arguments[1];
    valueJson = arguments[2];
    message.setValidate(false);
    switch (name) {
      case "advice":
        message.setAdvice(fm.websync.serializer.deserializeAdvice(valueJson));
        break;
      case "binding":
        message.setRecords(fm.websync.serializer.deserializeRecordArray(valueJson));
        break;
      case "channel":
        message.setBayeuxChannel(fm.serializer.deserializeString(valueJson));
        break;
      case "clientId":
        message.setClientId(fm.serializer.deserializeGuid(valueJson));
        break;
      case "connectionType":
        message.setConnectionType(fm.websync.serializer.deserializeConnectionType(valueJson));
        break;
      case "data":
        message.setDataJson(fm.serializer.deserializeRaw(valueJson));
        break;
      case "error":
        message.setError(fm.serializer.deserializeString(valueJson));
        break;
      case "ext":
        message.setExtensions(fm.websync.serializer.deserializeExtensions(valueJson));
        break;
      case "id":
        message.setId(fm.serializer.deserializeString(valueJson));
        break;
      case "minimumVersion":
        message.setMinimumVersion(fm.serializer.deserializeString(valueJson));
        break;
      case "subscription":
        if (!fm.stringExtensions.startsWith(valueJson, "[")) {
          str = fm.serializer.deserializeString(valueJson);
          if (!fm.stringExtensions.isNullOrEmpty(str)) {
            message.setChannels([str]);
          }
          break;
        }
        message.setChannels(fm.serializer.deserializeStringArray(valueJson));
        break;
      case "successful":
        nullable = fm.serializer.deserializeBoolean(valueJson);
        message.setSuccessful(fm.global.equals(nullable, true));
        break;
      case "supportedConnectionTypes":
        message.setSupportedConnectionTypes(fm.websync.serializer.deserializeConnectionTypeArray(valueJson));
        break;
      case "timestamp":
        message.setTimestamp(fm.websync.serializer.deserializeTimestamp(valueJson));
        break;
      case "version":
        message.setVersion(fm.serializer.deserializeString(valueJson));
        break;
    }
    return message.setValidate(true);
  };

  serializer.deserializeNotification = function() {
    var notificationJson;
    notificationJson = arguments[0];
    return fm.serializer.deserializeObjectFast(notificationJson, serializer.createNotification, serializer.deserializeNotificationCallback);
  };

  serializer.deserializeNotificationArray = function() {
    var list, notificationsJson;
    notificationsJson = arguments[0];
    list = fm.serializer.deserializeObjectArrayFast(notificationsJson, serializer.createNotification, serializer.deserializeNotificationCallback);
    if (fm.global.equals(list, null)) {
      return null;
    }
    return fm.arrayExtensions.toArray(list);
  };

  serializer.deserializeNotificationCallback = function() {
    var name, notification, nullable, str, valueJson;
    notification = arguments[0];
    name = arguments[1];
    valueJson = arguments[2];
    notification.setValidate(false);
    str = name;
    if (!fm.global.equals(str, null)) {
      if (!(fm.global.equals(str, "data"))) {
        if (fm.global.equals(str, "ext")) {
          notification.setExtensions(fm.websync.serializer.deserializeExtensions(valueJson));
        } else {
          if (fm.global.equals(str, "successful")) {
            nullable = fm.serializer.deserializeBoolean(valueJson);
            notification.setSuccessful(fm.global.equals(nullable, true));
          } else {
            if (fm.global.equals(str, "error")) {
              notification.setError(fm.serializer.deserializeString(valueJson));
            } else {
              if (fm.global.equals(str, "timestamp")) {
                notification.setTimestamp(fm.websync.serializer.deserializeTimestamp(valueJson));
              }
            }
          }
        }
      } else {
        notification.setDataJson(fm.serializer.deserializeRaw(valueJson));
      }
    }
    return notification.setValidate(true);
  };

  serializer.deserializeNotifyingClient = function() {
    var notifyingClientJson;
    notifyingClientJson = arguments[0];
    return fm.serializer.deserializeObjectFast(notifyingClientJson, serializer.createNotifyingClient, serializer.deserializeNotifyingClientCallback);
  };

  serializer.deserializeNotifyingClientCallback = function() {
    var name, notifyingClient, str, valueJson;
    notifyingClient = arguments[0];
    name = arguments[1];
    valueJson = arguments[2];
    str = name;
    if (!fm.global.equals(str, null)) {
      if (!(fm.global.equals(str, "clientId"))) {
        if (fm.global.equals(str, "boundRecords")) {
          return notifyingClient.setBoundRecords(fm.websync.serializer.deserializeBoundRecords(valueJson));
        }
      } else {
        return notifyingClient.setClientId(fm.serializer.deserializeGuid(valueJson));
      }
    }
  };

  serializer.deserializePublication = function() {
    var publicationJson;
    publicationJson = arguments[0];
    return fm.serializer.deserializeObjectFast(publicationJson, serializer.createPublication, serializer.deserializePublicationCallback);
  };

  serializer.deserializePublicationArray = function() {
    var list, publicationsJson;
    publicationsJson = arguments[0];
    list = fm.serializer.deserializeObjectArrayFast(publicationsJson, serializer.createPublication, serializer.deserializePublicationCallback);
    if (fm.global.equals(list, null)) {
      return null;
    }
    return fm.arrayExtensions.toArray(list);
  };

  serializer.deserializePublicationCallback = function() {
    var name, nullable, publication, str, valueJson;
    publication = arguments[0];
    name = arguments[1];
    valueJson = arguments[2];
    publication.setValidate(false);
    str = name;
    if (!fm.global.equals(str, null)) {
      if (!(fm.global.equals(str, "channel"))) {
        if (fm.global.equals(str, "data")) {
          publication.setDataJson(fm.serializer.deserializeRaw(valueJson));
        } else {
          if (fm.global.equals(str, "ext")) {
            publication.setExtensions(fm.websync.serializer.deserializeExtensions(valueJson));
          } else {
            if (fm.global.equals(str, "successful")) {
              nullable = fm.serializer.deserializeBoolean(valueJson);
              publication.setSuccessful(fm.global.equals(nullable, true));
            } else {
              if (fm.global.equals(str, "error")) {
                publication.setError(fm.serializer.deserializeString(valueJson));
              } else {
                if (fm.global.equals(str, "timestamp")) {
                  publication.setTimestamp(fm.websync.serializer.deserializeTimestamp(valueJson));
                }
              }
            }
          }
        }
      } else {
        publication.setChannel(fm.serializer.deserializeString(valueJson));
      }
    }
    return publication.setValidate(true);
  };

  serializer.deserializePublishingClient = function() {
    var publishingClientJson;
    publishingClientJson = arguments[0];
    return fm.serializer.deserializeObjectFast(publishingClientJson, serializer.createPublishingClient, serializer.deserializePublishingClientCallback);
  };

  serializer.deserializePublishingClientCallback = function() {
    var name, publishingClient, str, valueJson;
    publishingClient = arguments[0];
    name = arguments[1];
    valueJson = arguments[2];
    str = name;
    if (!fm.global.equals(str, null)) {
      if (!(fm.global.equals(str, "clientId"))) {
        if (fm.global.equals(str, "boundRecords")) {
          return publishingClient.setBoundRecords(fm.websync.serializer.deserializeBoundRecords(valueJson));
        }
      } else {
        return publishingClient.setClientId(fm.serializer.deserializeGuid(valueJson));
      }
    }
  };

  serializer.deserializeReconnect = function() {
    var reconnectJson;
    reconnectJson = arguments[0];
    switch (fm.serializer.deserializeString(reconnectJson)) {
      case "retry":
        return fm.websync.reconnect.Retry;
      case "handshake":
        return fm.websync.reconnect.Handshake;
      case "none":
        return fm.websync.reconnect.None;
    }
    throw new Error("Unknown reconnect advice.");
  };

  serializer.deserializeRecord = function() {
    var recordJson;
    recordJson = arguments[0];
    return fm.serializer.deserializeObjectFast(recordJson, serializer.createRecord, serializer.deserializeRecordCallback);
  };

  serializer.deserializeRecordArray = function() {
    var list, recordsJson;
    recordsJson = arguments[0];
    list = fm.serializer.deserializeObjectArrayFast(recordsJson, serializer.createRecord, serializer.deserializeRecordCallback);
    if (fm.global.equals(list, null)) {
      return null;
    }
    return fm.arrayExtensions.toArray(list);
  };

  serializer.deserializeRecordCallback = function() {
    var name, nullable, record, str, valueJson;
    record = arguments[0];
    name = arguments[1];
    valueJson = arguments[2];
    record.setValidate(false);
    str = name;
    if (!fm.global.equals(str, null)) {
      if (!(fm.global.equals(str, "key"))) {
        if (fm.global.equals(str, "private")) {
          nullable = fm.serializer.deserializeBoolean(valueJson);
          record.setPrivate(fm.global.equals(nullable, true));
        } else {
          if (fm.global.equals(str, "value")) {
            record.setValueJson(fm.serializer.deserializeRaw(valueJson));
          }
        }
      } else {
        record.setKey(fm.serializer.deserializeString(valueJson));
      }
    }
    return record.setValidate(true);
  };

  serializer.deserializeSubscribedClient = function() {
    var subscribedClientJson;
    subscribedClientJson = arguments[0];
    return fm.serializer.deserializeObjectFast(subscribedClientJson, serializer.createSubscribedClient, serializer.deserializeSubscribedClientCallback);
  };

  serializer.deserializeSubscribedClientArray = function() {
    var list, subscribedClientsJson;
    subscribedClientsJson = arguments[0];
    list = fm.serializer.deserializeObjectArrayFast(subscribedClientsJson, serializer.createSubscribedClient, serializer.deserializeSubscribedClientCallback);
    if (fm.global.equals(list, null)) {
      return null;
    }
    return fm.arrayExtensions.toArray(list);
  };

  serializer.deserializeSubscribedClientCallback = function() {
    var name, str, subscribedClient, valueJson;
    subscribedClient = arguments[0];
    name = arguments[1];
    valueJson = arguments[2];
    str = name;
    if (!fm.global.equals(str, null)) {
      if (!(fm.global.equals(str, "clientId"))) {
        if (fm.global.equals(str, "boundRecords")) {
          return subscribedClient.setBoundRecords(fm.websync.serializer.deserializeBoundRecords(valueJson));
        }
      } else {
        return subscribedClient.setClientId(fm.serializer.deserializeGuid(valueJson));
      }
    }
  };

  serializer.deserializeSubscription = function() {
    var subscriptionJson;
    subscriptionJson = arguments[0];
    return fm.serializer.deserializeObjectFast(subscriptionJson, serializer.createSubscription, serializer.deserializeSubscriptionCallback);
  };

  serializer.deserializeSubscriptionArray = function() {
    var list, subscriptionsJson;
    subscriptionsJson = arguments[0];
    list = fm.serializer.deserializeObjectArrayFast(subscriptionsJson, serializer.createSubscription, serializer.deserializeSubscriptionCallback);
    if (fm.global.equals(list, null)) {
      return null;
    }
    return fm.arrayExtensions.toArray(list);
  };

  serializer.deserializeSubscriptionCallback = function() {
    var name, str, subscription, valueJson;
    subscription = arguments[0];
    name = arguments[1];
    valueJson = arguments[2];
    str = name;
    if (!fm.global.equals(str, null)) {
      if (!(fm.global.equals(str, "channel"))) {
        if (fm.global.equals(str, "tag")) {
          return subscription.setTag(fm.serializer.deserializeString(valueJson));
        }
      } else {
        return subscription.setChannel(fm.serializer.deserializeString(valueJson));
      }
    }
  };

  serializer.deserializeTimestamp = function() {
    var _var0, _var1, _var10, _var11, _var2, _var3, _var4, _var5, _var6, _var7, _var8, _var9, intResult, num2, num3, num4, num5, num6, s, str, str10, str2, str3, str5, str6, str7, str8, strArray, timestampJson, utcNow;
    timestampJson = arguments[0];
    str = fm.serializer.deserializeString(timestampJson);
    utcNow = fm.dateTime.getUtcNow();
    if (!fm.stringExtensions.isNullOrEmpty(str)) {
      strArray = fm.stringExtensions.split(str, ['T']);
      if (!fm.global.equals(strArray.length, 2)) {
        return utcNow;
      }
      str2 = strArray[0];
      str3 = strArray[1];
      strArray = fm.stringExtensions.split(str2, ['-']);
      if (!fm.global.equals(strArray.length, 3)) {
        return utcNow;
      }
      s = strArray[0];
      str5 = strArray[1];
      str6 = strArray[2];
      strArray = fm.stringExtensions.split(str3, [':']);
      if (!fm.global.equals(strArray.length, 3)) {
        return utcNow;
      }
      str7 = strArray[0];
      str8 = strArray[1];
      strArray = fm.stringExtensions.split(strArray[2], ['.']);
      if (!fm.global.equals(strArray.length, 2)) {
        return utcNow;
      }
      str10 = strArray[0];
      intResult = 0;
      num2 = 0;
      num3 = 0;
      num4 = 0;
      num5 = 0;
      num6 = 0;
      _var0 = new fm.holder(intResult);
      _var1 = fm.parseAssistant.tryParseIntegerValue(s, _var0);
      intResult = _var0.getValue();
      _var2 = new fm.holder(num2);
      _var3 = fm.parseAssistant.tryParseIntegerValue(str5, _var2);
      num2 = _var2.getValue();
      _var4 = new fm.holder(num3);
      _var5 = fm.parseAssistant.tryParseIntegerValue(str6, _var4);
      num3 = _var4.getValue();
      _var6 = new fm.holder(num4);
      _var7 = fm.parseAssistant.tryParseIntegerValue(str7, _var6);
      num4 = _var6.getValue();
      _var8 = new fm.holder(num5);
      _var9 = fm.parseAssistant.tryParseIntegerValue(str8, _var8);
      num5 = _var8.getValue();
      _var10 = new fm.holder(num6);
      _var11 = fm.parseAssistant.tryParseIntegerValue(str10, _var10);
      num6 = _var10.getValue();
      if ((((_var1 && _var3) && (_var5 && _var7)) && _var9) && _var11) {
        utcNow = new fm.dateTime(intResult, num2, num3, num4, num5, num6);
      }
    }
    return utcNow;
  };

  serializer.serializeAdvice = function() {
    var advice;
    advice = arguments[0];
    return fm.serializer.serializeObjectFast(advice, serializer.serializeAdviceCallback);
  };

  serializer.serializeAdviceCallback = function() {
    var advice, jsonObject;
    advice = arguments[0];
    jsonObject = arguments[1];
    fm.websync.serializer.serializeBaseAdviceCallback(advice, jsonObject);
    if (!fm.global.equals(advice.getWebSocket(), null)) {
      jsonObject["websocket"] = fm.websync.serializer.serializeBaseAdvice(advice.getWebSocket());
    }
    if (!fm.global.equals(advice.getLongPolling(), null)) {
      jsonObject["long-polling"] = fm.websync.serializer.serializeBaseAdvice(advice.getLongPolling());
    }
    if (!fm.global.equals(advice.getCallbackPolling(), null)) {
      return jsonObject["callback-polling"] = fm.websync.serializer.serializeBaseAdvice(advice.getCallbackPolling());
    }
  };

  serializer.serializeBaseAdvice = function() {
    var baseAdvice;
    baseAdvice = arguments[0];
    return fm.serializer.serializeObjectFast(baseAdvice, serializer.serializeBaseAdviceCallback);
  };

  serializer.serializeBaseAdviceCallback = function() {
    var baseAdvice, jsonObject;
    baseAdvice = arguments[0];
    jsonObject = arguments[1];
    if (!fm.global.equals(baseAdvice.getHosts(), null)) {
      jsonObject["hosts"] = fm.serializer.serializeStringArray(baseAdvice.getHosts());
    }
    if (baseAdvice.getInterval() !== null) {
      jsonObject["interval"] = fm.serializer.serializeInteger(baseAdvice.getInterval());
    }
    if (baseAdvice.getReconnect() !== null) {
      return jsonObject["reconnect"] = fm.websync.serializer.serializeReconnect(baseAdvice.getReconnect());
    }
  };

  serializer.serializeBoundRecords = function() {
    var boundRecords;
    boundRecords = arguments[0];
    return fm.serializer.serializeObject(boundRecords, serializer.serializeBoundRecordsCallback);
  };

  serializer.serializeBoundRecordsCallback = function() {
    var _var0, boundRecords, j, jsonObject, len, results, str;
    boundRecords = arguments[0];
    jsonObject = arguments[1];
    _var0 = fm.hashExtensions.getKeys(boundRecords);
    results = [];
    for (j = 0, len = _var0.length; j < len; j++) {
      str = _var0[j];
      results.push(jsonObject[str] = fm.serializer.serializeRaw(boundRecords[str].getValueJson()));
    }
    return results;
  };

  serializer.serializeConnectionType = function() {
    var connectionType, str;
    connectionType = arguments[0];
    str = null;
    switch (connectionType) {
      case fm.websync.connectionType.WebSocket:
        str = "websocket";
        break;
      case fm.websync.connectionType.LongPolling:
        str = "long-polling";
        break;
      case fm.websync.connectionType.CallbackPolling:
        str = "callback-polling";
        break;
      case fm.websync.connectionType.IFrame:
        str = "iframe";
        break;
      case fm.websync.connectionType.Flash:
        str = "flash";
        break;
    }
    return fm.serializer.serializeString(str);
  };

  serializer.serializeConnectionTypeArray = function() {
    var connectionTypes, i, strArray;
    connectionTypes = arguments[0];
    strArray = new Array(connectionTypes.length);
    i = 0;
    while (i < connectionTypes.length) {
      try {
        strArray[i] = fm.websync.serializer.serializeConnectionType(connectionTypes[i]);
      } finally {
        i++;
      }
    }
    return fm.stringExtensions.concat("[", fm.stringExtensions.join(",", strArray), "]");
  };

  serializer.serializeExtensions = function() {
    var extensions;
    extensions = arguments[0];
    return fm.serializer.serializeObjectFast(extensions, serializer.serializeExtensionsCallback);
  };

  serializer.serializeExtensionsCallback = function() {
    var _var0, extensions, j, jsonObject, len, results, str;
    extensions = arguments[0];
    jsonObject = arguments[1];
    _var0 = extensions.getNames();
    results = [];
    for (j = 0, len = _var0.length; j < len; j++) {
      str = _var0[j];
      results.push(jsonObject[str] = fm.serializer.serializeRaw(extensions.getValueJson(str)));
    }
    return results;
  };

  serializer.serializeMessage = function() {
    var message;
    message = arguments[0];
    return fm.serializer.serializeObjectFast(message, serializer.serializeMessageCallback);
  };

  serializer.serializeMessageArray = function() {
    var messages;
    messages = arguments[0];
    return fm.serializer.serializeObjectArrayFast(messages, serializer.serializeMessageCallback);
  };

  serializer.serializeMessageCallback = function() {
    var jsonObject, message;
    message = arguments[0];
    jsonObject = arguments[1];
    if (message.getClientId() !== null) {
      jsonObject["clientId"] = fm.serializer.serializeGuid(message.getClientId());
    }
    if (message.getTimestamp() !== null) {
      jsonObject["timestamp"] = fm.websync.serializer.serializeTimestamp(message.getTimestamp());
    }
    if (!fm.global.equals(message.getAdvice(), null)) {
      jsonObject["advice"] = fm.websync.serializer.serializeAdvice(message.getAdvice());
    }
    if ((!fm.global.equals(message.getRecords(), null)) && ((fm.global.equals(message.getType(), fm.websync.messageType.Bind)) || (fm.global.equals(message.getType(), fm.websync.messageType.Unbind)))) {
      jsonObject["binding"] = fm.websync.serializer.serializeRecordArray(message.getRecords());
    }
    if (!fm.global.equals(message.getBayeuxChannel(), null)) {
      jsonObject["channel"] = fm.serializer.serializeString(message.getBayeuxChannel());
    }
    if (message.getConnectionType() !== null) {
      jsonObject["connectionType"] = fm.websync.serializer.serializeConnectionType(message.getConnectionType());
    }
    if (!fm.global.equals(message.getDataJson(), null)) {
      jsonObject["data"] = fm.serializer.serializeRaw(message.getDataJson());
    }
    if (!fm.global.equals(message.getError(), null)) {
      jsonObject["error"] = fm.serializer.serializeString(message.getError());
    }
    if (message.getExtensions().getCount() > 0) {
      jsonObject["ext"] = fm.websync.serializer.serializeExtensions(message.getExtensions());
    }
    if (!fm.global.equals(message.getId(), null)) {
      jsonObject["id"] = fm.serializer.serializeString(message.getId());
    }
    if (!fm.global.equals(message.getMinimumVersion(), null)) {
      jsonObject["minimumVersion"] = fm.serializer.serializeString(message.getMinimumVersion());
    }
    if ((!fm.global.equals(message.getChannels(), null)) && ((fm.global.equals(message.getType(), fm.websync.messageType.Subscribe)) || (fm.global.equals(message.getType(), fm.websync.messageType.Unsubscribe)))) {
      jsonObject["subscription"] = fm.serializer.serializeStringArray(message.getChannels());
    }
    if (message.getSuccessful()) {
      jsonObject["successful"] = fm.serializer.serializeBoolean(message.getSuccessful());
    }
    if (!fm.global.equals(message.getSupportedConnectionTypes(), null)) {
      jsonObject["supportedConnectionTypes"] = fm.websync.serializer.serializeConnectionTypeArray(message.getSupportedConnectionTypes());
    }
    if (!fm.global.equals(message.getVersion(), null)) {
      return jsonObject["version"] = fm.serializer.serializeString(message.getVersion());
    }
  };

  serializer.serializeNotification = function() {
    var notification;
    notification = arguments[0];
    return fm.serializer.serializeObjectFast(notification, serializer.serializeNotificationCallback);
  };

  serializer.serializeNotificationArray = function() {
    var notifications;
    notifications = arguments[0];
    return fm.serializer.serializeObjectArrayFast(notifications, serializer.serializeNotificationCallback);
  };

  serializer.serializeNotificationCallback = function() {
    var jsonObject, notification;
    notification = arguments[0];
    jsonObject = arguments[1];
    if (!fm.global.equals(notification.getError(), null)) {
      jsonObject["error"] = fm.serializer.serializeString(notification.getError());
    }
    if (notification.getSuccessful()) {
      jsonObject["successful"] = fm.serializer.serializeBoolean(notification.getSuccessful());
    }
    if (notification.getTimestamp() !== null) {
      jsonObject["timestamp"] = fm.websync.serializer.serializeTimestamp(notification.getTimestamp());
    }
    if (notification.getExtensions().getCount() > 0) {
      jsonObject["ext"] = fm.websync.serializer.serializeExtensions(notification.getExtensions());
    }
    if (!fm.global.equals(notification.getDataJson(), null)) {
      return jsonObject["data"] = fm.serializer.serializeRaw(notification.getDataJson());
    }
  };

  serializer.serializeNotifyingClient = function() {
    var notifyingClient;
    notifyingClient = arguments[0];
    return fm.serializer.serializeObjectFast(notifyingClient, serializer.serializeNotifyingClientCallback);
  };

  serializer.serializeNotifyingClientCallback = function() {
    var jsonObject, notifyingClient;
    notifyingClient = arguments[0];
    jsonObject = arguments[1];
    if (notifyingClient.getClientId() !== null) {
      jsonObject["clientId"] = fm.serializer.serializeGuid(notifyingClient.getClientId());
    }
    if (!fm.global.equals(notifyingClient.getBoundRecords(), null)) {
      return jsonObject["boundRecords"] = fm.websync.serializer.serializeBoundRecords(notifyingClient.getBoundRecords());
    }
  };

  serializer.serializePublication = function() {
    var publication;
    publication = arguments[0];
    return fm.serializer.serializeObjectFast(publication, serializer.serializePublicationCallback);
  };

  serializer.serializePublicationArray = function() {
    var publications;
    publications = arguments[0];
    return fm.serializer.serializeObjectArrayFast(publications, serializer.serializePublicationCallback);
  };

  serializer.serializePublicationCallback = function() {
    var jsonObject, publication;
    publication = arguments[0];
    jsonObject = arguments[1];
    if (!fm.global.equals(publication.getChannel(), null)) {
      jsonObject["channel"] = fm.serializer.serializeString(publication.getChannel());
    }
    if (!fm.global.equals(publication.getError(), null)) {
      jsonObject["error"] = fm.serializer.serializeString(publication.getError());
    }
    if (publication.getSuccessful()) {
      jsonObject["successful"] = fm.serializer.serializeBoolean(publication.getSuccessful());
    }
    if (publication.getTimestamp() !== null) {
      jsonObject["timestamp"] = fm.websync.serializer.serializeTimestamp(publication.getTimestamp());
    }
    if (publication.getExtensions().getCount() > 0) {
      jsonObject["ext"] = fm.websync.serializer.serializeExtensions(publication.getExtensions());
    }
    if (!fm.global.equals(publication.getDataJson(), null)) {
      return jsonObject["data"] = fm.serializer.serializeRaw(publication.getDataJson());
    }
  };

  serializer.serializePublishingClient = function() {
    var publishingClient;
    publishingClient = arguments[0];
    return fm.serializer.serializeObjectFast(publishingClient, serializer.serializePublishingClientCallback);
  };

  serializer.serializePublishingClientCallback = function() {
    var jsonObject, publishingClient;
    publishingClient = arguments[0];
    jsonObject = arguments[1];
    if (publishingClient.getClientId() !== null) {
      jsonObject["clientId"] = fm.serializer.serializeGuid(publishingClient.getClientId());
    }
    if (!fm.global.equals(publishingClient.getBoundRecords(), null)) {
      return jsonObject["boundRecords"] = fm.websync.serializer.serializeBoundRecords(publishingClient.getBoundRecords());
    }
  };

  serializer.serializeReconnect = function() {
    var reconnect, str;
    reconnect = arguments[0];
    str = null;
    switch (reconnect) {
      case fm.websync.reconnect.Retry:
        str = "retry";
        break;
      case fm.websync.reconnect.Handshake:
        str = "handshake";
        break;
      case fm.websync.reconnect.None:
        str = "none";
        break;
    }
    return fm.serializer.serializeString(str);
  };

  serializer.serializeRecord = function() {
    var record;
    record = arguments[0];
    return fm.serializer.serializeObjectFast(record, serializer.serializeRecordCallback);
  };

  serializer.serializeRecordArray = function() {
    var records;
    records = arguments[0];
    return fm.serializer.serializeObjectArrayFast(records, serializer.serializeRecordCallback);
  };

  serializer.serializeRecordCallback = function() {
    var jsonObject, record;
    record = arguments[0];
    jsonObject = arguments[1];
    if (!fm.global.equals(record.getKey(), null)) {
      jsonObject["key"] = fm.serializer.serializeString(record.getKey());
    }
    if (record.getPrivate()) {
      jsonObject["private"] = fm.serializer.serializeBoolean(record.getPrivate());
    }
    if (!fm.global.equals(record.getValueJson(), null)) {
      return jsonObject["value"] = fm.serializer.serializeRaw(record.getValueJson());
    }
  };

  serializer.serializeSubscribedClient = function() {
    var subscribedClient;
    subscribedClient = arguments[0];
    return fm.serializer.serializeObjectFast(subscribedClient, serializer.serializeSubscribedClientCallback);
  };

  serializer.serializeSubscribedClientArray = function() {
    var subscribedClients;
    subscribedClients = arguments[0];
    return fm.serializer.serializeObjectArrayFast(subscribedClients, serializer.serializeSubscribedClientCallback);
  };

  serializer.serializeSubscribedClientCallback = function() {
    var jsonObject, subscribedClient;
    subscribedClient = arguments[0];
    jsonObject = arguments[1];
    jsonObject["clientId"] = fm.serializer.serializeGuid(subscribedClient.getClientId());
    if (!fm.global.equals(subscribedClient.getBoundRecords(), null)) {
      return jsonObject["boundRecords"] = fm.websync.serializer.serializeBoundRecords(subscribedClient.getBoundRecords());
    }
  };

  serializer.serializeSubscription = function() {
    var subscription;
    subscription = arguments[0];
    return fm.serializer.serializeObjectFast(subscription, serializer.serializeSubscriptionCallback);
  };

  serializer.serializeSubscriptionArray = function() {
    var subscriptions;
    subscriptions = arguments[0];
    return fm.serializer.serializeObjectArrayFast(subscriptions, serializer.serializeSubscriptionCallback);
  };

  serializer.serializeSubscriptionCallback = function() {
    var jsonObject, subscription;
    subscription = arguments[0];
    jsonObject = arguments[1];
    jsonObject["channel"] = fm.serializer.serializeString(subscription.getChannel());
    if (!fm.global.equals(subscription.getTag(), null)) {
      return jsonObject["tag"] = fm.serializer.serializeString(subscription.getTag());
    }
  };

  serializer.serializeTimestamp = function() {
    var str, str2, str3, str4, str5, str6, str7, timestamp;
    timestamp = arguments[0];
    str = null;
    if (timestamp !== null) {
      str2 = fm.intExtensions.toString(timestamp.getYear());
      str3 = fm.intExtensions.toString(timestamp.getMonth());
      str4 = fm.intExtensions.toString(timestamp.getDay());
      str5 = fm.intExtensions.toString(timestamp.getHour());
      str6 = fm.intExtensions.toString(timestamp.getMinute());
      str7 = fm.intExtensions.toString(timestamp.getSecond());
      while (str2.length < 4) {
        str2 = fm.stringExtensions.concat("0", str2);
      }
      while (str3.length < 2) {
        str3 = fm.stringExtensions.concat("0", str3);
      }
      while (str4.length < 2) {
        str4 = fm.stringExtensions.concat("0", str4);
      }
      while (str5.length < 2) {
        str5 = fm.stringExtensions.concat("0", str5);
      }
      while (str6.length < 2) {
        str6 = fm.stringExtensions.concat("0", str6);
      }
      while (str7.length < 2) {
        str7 = fm.stringExtensions.concat("0", str7);
      }
      str = fm.stringExtensions.format("{0}-{1}-{2}T{3}:{4}:{5}.00", [str2, str3, str4, str5, str6, str7]);
    }
    return fm.serializer.serializeString(str);
  };

  return serializer;

})(fm.object);



/*<span id='cls-fm.websync.webSocketMessageTransfer'>&nbsp;</span> */

/**
@class fm.websync.webSocketMessageTransfer
 <div>
 Base class that defines methods for transferring messages over HTTP.
 </div>

@extends fm.websync.messageTransfer
 */
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.webSocketMessageTransfer = (function(superClass) {
  extend(webSocketMessageTransfer, superClass);

  webSocketMessageTransfer.prototype._callbackKey = null;

  webSocketMessageTransfer.prototype._url = null;

  webSocketMessageTransfer.prototype._webSocketTransfer = null;


  /*<span id='method-fm.websync.webSocketMessageTransfer-fm.websync.webSocketMessageTransfer'>&nbsp;</span> */


  /**
  	 <div>
  	 Initializes a new instance of the <see cref="fm.websync.webSocketMessageTransfer">fm.websync.webSocketMessageTransfer</see> class.
  	 </div>
  	@function fm.websync.webSocketMessageTransfer
  	@param {String} url The URL.
  	@return {}
   */

  function webSocketMessageTransfer() {
    this.shutdown = bind(this.shutdown, this);
    this.setUrl = bind(this.setUrl, this);
    this.setStreamTimeout = bind(this.setStreamTimeout, this);
    this.setSender = bind(this.setSender, this);
    this.setOnStreamFailure = bind(this.setOnStreamFailure, this);
    this.setOnResponseReceived = bind(this.setOnResponseReceived, this);
    this.setOnRequestCreated = bind(this.setOnRequestCreated, this);
    this.setOnOpenSuccess = bind(this.setOnOpenSuccess, this);
    this.setOnOpenFailure = bind(this.setOnOpenFailure, this);
    this.setHandshakeTimeout = bind(this.setHandshakeTimeout, this);
    this.sendMessagesAsyncCallback = bind(this.sendMessagesAsyncCallback, this);
    this.sendMessagesAsync = bind(this.sendMessagesAsync, this);
    this.sendMessages = bind(this.sendMessages, this);
    this.open = bind(this.open, this);
    this.getUrl = bind(this.getUrl, this);
    this.getStreamTimeout = bind(this.getStreamTimeout, this);
    this.getSender = bind(this.getSender, this);
    this.getOnStreamFailure = bind(this.getOnStreamFailure, this);
    this.getOnResponseReceived = bind(this.getOnResponseReceived, this);
    this.getOnRequestCreated = bind(this.getOnRequestCreated, this);
    this.getOnOpenSuccess = bind(this.getOnOpenSuccess, this);
    this.getOnOpenFailure = bind(this.getOnOpenFailure, this);
    this.getHandshakeTimeout = bind(this.getHandshakeTimeout, this);
    var instance, url;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = webSocketMessageTransfer.__super__.constructor.call(this);
      this._callbackKey = "fm.websync.webSocketMessageTransfer.callback";
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    if (arguments.length === 0) {
      instance = webSocketMessageTransfer.__super__.constructor.call(this);
      this._callbackKey = "fm.websync.webSocketMessageTransfer.callback";
      return instance;
    }
    if (arguments.length === 1) {
      url = arguments[0];
      webSocketMessageTransfer.call(this);
      this.setUrl(url);
      this._webSocketTransfer = fm.webSocketTransferFactory.getWebSocketTransfer(this.getUrl());
      return instance;
    }
  }


  /*<span id='method-fm.websync.webSocketMessageTransfer-getHandshakeTimeout'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the timeout for the initial handshake.
  	 </div>
  
  	@function getHandshakeTimeout
  	@return {Integer}
   */

  webSocketMessageTransfer.prototype.getHandshakeTimeout = function() {
    return this._webSocketTransfer.getHandshakeTimeout();
  };


  /*<span id='method-fm.websync.webSocketMessageTransfer-getOnOpenFailure'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the callback to invoke if the handshake fails.
  	 </div>
  
  	@function getOnOpenFailure
  	@return {fm.singleAction}
   */

  webSocketMessageTransfer.prototype.getOnOpenFailure = function() {
    return this._webSocketTransfer.getOnOpenFailure();
  };


  /*<span id='method-fm.websync.webSocketMessageTransfer-getOnOpenSuccess'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the callback to invoke if the handshake succeeds.
  	 </div>
  
  	@function getOnOpenSuccess
  	@return {fm.singleAction}
   */

  webSocketMessageTransfer.prototype.getOnOpenSuccess = function() {
    return this._webSocketTransfer.getOnOpenSuccess();
  };


  /*<span id='method-fm.websync.webSocketMessageTransfer-getOnRequestCreated'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the callback to invoke when the handshake request is created.
  	 </div>
  
  	@function getOnRequestCreated
  	@return {fm.singleAction}
   */

  webSocketMessageTransfer.prototype.getOnRequestCreated = function() {
    return this._webSocketTransfer.getOnRequestCreated();
  };


  /*<span id='method-fm.websync.webSocketMessageTransfer-getOnResponseReceived'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the callback to invoke when the handshake response is received.
  	 </div>
  
  	@function getOnResponseReceived
  	@return {fm.singleAction}
   */

  webSocketMessageTransfer.prototype.getOnResponseReceived = function() {
    return this._webSocketTransfer.getOnResponseReceived();
  };


  /*<span id='method-fm.websync.webSocketMessageTransfer-getOnStreamFailure'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the callback to invoke if the stream errors out.
  	 </div>
  
  	@function getOnStreamFailure
  	@return {fm.singleAction}
   */

  webSocketMessageTransfer.prototype.getOnStreamFailure = function() {
    return this._webSocketTransfer.getOnStreamFailure();
  };


  /*<span id='method-fm.websync.webSocketMessageTransfer-getSender'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the sender of the messages.
  	 </div>
  
  	@function getSender
  	@return {fm.object}
   */

  webSocketMessageTransfer.prototype.getSender = function() {
    return this._webSocketTransfer.getSender();
  };


  /*<span id='method-fm.websync.webSocketMessageTransfer-getStreamTimeout'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the timeout for the stream.
  	 </div>
  
  	@function getStreamTimeout
  	@return {Integer}
   */

  webSocketMessageTransfer.prototype.getStreamTimeout = function() {
    return this._webSocketTransfer.getHandshakeTimeout();
  };


  /*<span id='method-fm.websync.webSocketMessageTransfer-getUrl'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the URL.
  	 </div>
  
  	@function getUrl
  	@return {String}
   */

  webSocketMessageTransfer.prototype.getUrl = function() {
    return this._url;
  };


  /*<span id='method-fm.websync.webSocketMessageTransfer-open'>&nbsp;</span> */


  /**
  	 <div>
  	 Opens the socket.
  	 </div>
  	@function open
  	@param {fm.nameValueCollection} headers The headers to pass in with the initial handshake.
  	@return {void}
   */

  webSocketMessageTransfer.prototype.open = function() {
    var headers;
    headers = arguments[0];
    return this._webSocketTransfer.open(headers);
  };


  /*<span id='method-fm.websync.webSocketMessageTransfer-sendMessages'>&nbsp;</span> */


  /**
  	 <div>
  	 Sends a request synchronously.
  	 </div>
  	@function sendMessages
  	@param {fm.websync.messageRequestArgs} requestArgs The request parameters.
  	@return {fm.websync.messageResponseArgs} 
  	 The response parameters.
   */

  webSocketMessageTransfer.prototype.sendMessages = function() {
    var args, httpResponseArgs, requestArgs;
    requestArgs = arguments[0];
    args = this.messageRequestArgsToHttpRequestArgs(requestArgs);
    httpResponseArgs = this._webSocketTransfer.send(args);
    return this.httpResponseArgsToMessageResponseArgs(httpResponseArgs);
  };


  /*<span id='method-fm.websync.webSocketMessageTransfer-sendMessagesAsync'>&nbsp;</span> */


  /**
  	 <div>
  	 Sends a request asynchronously.
  	 </div>
  	@function sendMessagesAsync
  	@param {fm.websync.messageRequestArgs} requestArgs The request parameters.
  	@param {fm.singleAction} callback The callback to execute with the response parameters.
  	@return {void}
   */

  webSocketMessageTransfer.prototype.sendMessagesAsync = function() {
    var args, callback, requestArgs;
    requestArgs = arguments[0];
    callback = arguments[1];
    args = this.messageRequestArgsToHttpRequestArgs(requestArgs);
    args.setDynamicValue(this._callbackKey, callback);
    return this._webSocketTransfer.sendAsync(args, this.sendMessagesAsyncCallback);
  };

  webSocketMessageTransfer.prototype.sendMessagesAsyncCallback = function() {
    var dynamicValue, httpResponseArgs, requestArgs;
    httpResponseArgs = arguments[0];
    if (!fm.global.equals(httpResponseArgs, null)) {
      requestArgs = httpResponseArgs.getRequestArgs();
      if (!fm.global.equals(requestArgs, null)) {
        dynamicValue = requestArgs.getDynamicValue(this._callbackKey);
        if (!fm.global.equals(dynamicValue, null)) {
          requestArgs.unsetDynamicValue(this._callbackKey);
          return dynamicValue(this.httpResponseArgsToMessageResponseArgs(httpResponseArgs));
        }
      }
    }
  };


  /*<span id='method-fm.websync.webSocketMessageTransfer-setHandshakeTimeout'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the timeout for the initial handshake.
  	 </div>
  
  	@function setHandshakeTimeout
  	@param {Integer} value
  	@return {void}
   */

  webSocketMessageTransfer.prototype.setHandshakeTimeout = function() {
    var value;
    value = arguments[0];
    return this._webSocketTransfer.setHandshakeTimeout(value);
  };


  /*<span id='method-fm.websync.webSocketMessageTransfer-setOnOpenFailure'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the callback to invoke if the handshake fails.
  	 </div>
  
  	@function setOnOpenFailure
  	@param {fm.singleAction} value
  	@return {void}
   */

  webSocketMessageTransfer.prototype.setOnOpenFailure = function() {
    var value;
    value = arguments[0];
    return this._webSocketTransfer.setOnOpenFailure(value);
  };


  /*<span id='method-fm.websync.webSocketMessageTransfer-setOnOpenSuccess'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the callback to invoke if the handshake succeeds.
  	 </div>
  
  	@function setOnOpenSuccess
  	@param {fm.singleAction} value
  	@return {void}
   */

  webSocketMessageTransfer.prototype.setOnOpenSuccess = function() {
    var value;
    value = arguments[0];
    return this._webSocketTransfer.setOnOpenSuccess(value);
  };


  /*<span id='method-fm.websync.webSocketMessageTransfer-setOnRequestCreated'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the callback to invoke when the handshake request is created.
  	 </div>
  
  	@function setOnRequestCreated
  	@param {fm.singleAction} value
  	@return {void}
   */

  webSocketMessageTransfer.prototype.setOnRequestCreated = function() {
    var value;
    value = arguments[0];
    return this._webSocketTransfer.setOnRequestCreated(value);
  };


  /*<span id='method-fm.websync.webSocketMessageTransfer-setOnResponseReceived'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the callback to invoke when the handshake response is received.
  	 </div>
  
  	@function setOnResponseReceived
  	@param {fm.singleAction} value
  	@return {void}
   */

  webSocketMessageTransfer.prototype.setOnResponseReceived = function() {
    var value;
    value = arguments[0];
    return this._webSocketTransfer.setOnResponseReceived(value);
  };


  /*<span id='method-fm.websync.webSocketMessageTransfer-setOnStreamFailure'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the callback to invoke if the stream errors out.
  	 </div>
  
  	@function setOnStreamFailure
  	@param {fm.singleAction} value
  	@return {void}
   */

  webSocketMessageTransfer.prototype.setOnStreamFailure = function() {
    var value;
    value = arguments[0];
    return this._webSocketTransfer.setOnStreamFailure(value);
  };


  /*<span id='method-fm.websync.webSocketMessageTransfer-setSender'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the sender of the messages.
  	 </div>
  
  	@function setSender
  	@param {fm.object} value
  	@return {void}
   */

  webSocketMessageTransfer.prototype.setSender = function() {
    var value;
    value = arguments[0];
    return this._webSocketTransfer.setSender(value);
  };


  /*<span id='method-fm.websync.webSocketMessageTransfer-setStreamTimeout'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the timeout for the stream.
  	 </div>
  
  	@function setStreamTimeout
  	@param {Integer} value
  	@return {void}
   */

  webSocketMessageTransfer.prototype.setStreamTimeout = function() {
    var value;
    value = arguments[0];
    return this._webSocketTransfer.setHandshakeTimeout(value);
  };


  /*<span id='method-fm.websync.webSocketMessageTransfer-setUrl'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the URL.
  	 </div>
  
  	@function setUrl
  	@param {String} value
  	@return {void}
   */

  webSocketMessageTransfer.prototype.setUrl = function() {
    var value;
    value = arguments[0];
    return this._url = value;
  };


  /*<span id='method-fm.websync.webSocketMessageTransfer-shutdown'>&nbsp;</span> */


  /**
  	 <div>
  	 Releases any resources and shuts down.
  	 </div>
  
  	@function shutdown
  	@return {void}
   */

  webSocketMessageTransfer.prototype.shutdown = function() {
    var error, exception1;
    try {
      return this._webSocketTransfer.shutdown();
    } catch (error) {
      exception1 = error;
    } finally {

    }
  };

  return webSocketMessageTransfer;

})(fm.websync.messageTransfer);



/*<span id='cls-fm.websync.subscription'>&nbsp;</span> */

/**
@class fm.websync.subscription
 <div>
 A channel/tag identifier for a client subscription.
 </div>

@extends fm.dynamic
 */
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.subscription = (function(superClass) {
  extend(subscription, superClass);

  subscription.prototype.__channel = null;

  subscription.prototype.__tag = null;


  /*<span id='method-fm.websync.subscription-fm.websync.subscription'>&nbsp;</span> */


  /**
  	 <div>
  	 Initializes a new instance of the <see cref="fm.websync.subscription">fm.websync.subscription</see> class.
  	 </div>
  	@function fm.websync.subscription
  	@param {String} channel The subscription channel.
  	@param {String} tag The identifier for the subscription.
  	@return {}
   */

  function subscription() {
    this.toJson = bind(this.toJson, this);
    this.setTag = bind(this.setTag, this);
    this.setChannel = bind(this.setChannel, this);
    this.getTag = bind(this.getTag, this);
    this.getHashCode = bind(this.getHashCode, this);
    this.getChannel = bind(this.getChannel, this);
    this.equals = bind(this.equals, this);
    this.duplicate = bind(this.duplicate, this);
    var channel, instance, tag;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = subscription.__super__.constructor.call(this);
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    if (arguments.length === 2) {
      channel = arguments[0];
      tag = arguments[1];
      instance = subscription.__super__.constructor.call(this);
      this.setChannel(channel);
      this.setTag(tag);
      return instance;
    }
    if (arguments.length === 1) {
      channel = arguments[0];
      instance = subscription.__super__.constructor.call(this);
      this.setChannel(channel);
      return instance;
    }
  }


  /*<span id='method-fm.websync.subscription-fromJson'>&nbsp;</span> */


  /**
  	 <div>
  	 Deserializes a subscription from JSON.
  	 </div>
  	@function fromJson
  	@param {String} subscriptionJson A JSON string to deserialize.
  	@return {fm.websync.subscription} A deserialized subscription.
   */

  subscription.fromJson = function() {
    var subscriptionJson;
    subscriptionJson = arguments[0];
    return fm.websync.serializer.deserializeSubscription(subscriptionJson);
  };


  /*<span id='method-fm.websync.subscription-fromJsonMultiple'>&nbsp;</span> */


  /**
  	 <div>
  	 Deserializes a list of subscriptions from JSON.
  	 </div>
  	@function fromJsonMultiple
  	@param {String} subscriptionsJson A JSON string to deserialize.
  	@return {fm.array} A deserialized list of subscriptions.
   */

  subscription.fromJsonMultiple = function() {
    var subscriptionsJson;
    subscriptionsJson = arguments[0];
    return fm.websync.serializer.deserializeSubscriptionArray(subscriptionsJson);
  };


  /*<span id='method-fm.websync.subscription-toJson'>&nbsp;</span> */


  /**
  	 <div>
  	 Serializes a subscription to JSON.
  	 </div>
  	@function toJson
  	@param {fm.websync.subscription} subscription A subscription to serialize.
  	@return {String} A JSON-serialized subscription.
   */

  subscription.toJson = function() {
    var subscription;
    subscription = arguments[0];
    return fm.websync.serializer.serializeSubscription(subscription);
  };


  /*<span id='method-fm.websync.subscription-toJsonMultiple'>&nbsp;</span> */


  /**
  	 <div>
  	 Serializes a list of subscriptions to JSON.
  	 </div>
  	@function toJsonMultiple
  	@param {fm.array} subscriptions A list of subscriptions to serialize.
  	@return {String} A JSON-serialized array of subscriptions.
   */

  subscription.toJsonMultiple = function() {
    var subscriptions;
    subscriptions = arguments[0];
    return fm.websync.serializer.serializeSubscriptionArray(subscriptions);
  };


  /*<span id='method-fm.websync.subscription-duplicate'>&nbsp;</span> */


  /**
  	 <div>
  	 Creates a deep clone of this subscription.
  	 </div>
  	@function duplicate
  	@return {fm.websync.subscription} A deep clone of this subscription.
   */

  subscription.prototype.duplicate = function() {
    return new fm.websync.subscription(this.getChannel(), this.getTag());
  };


  /*<span id='method-fm.websync.subscription-equals'>&nbsp;</span> */


  /**
  	 <div>
  	 Determines whether the specified <see cref="fm.websync.subscription">fm.websync.subscription</see> is equal to this instance.
  	 </div>
  	@function equals
  	@param {fm.object} obj The fm.websync.subscription to compare with this instance.
  	@return {Boolean} true if the specified fm.websync.subscription is equal to this instance; otherwise, false.
   */

  subscription.prototype.equals = function() {
    var obj, subscription;
    obj = arguments[0];
    subscription = fm.global.tryCast(obj, fm.websync.subscription);
    return fm.global.equals(subscription, this);
  };


  /*<span id='method-fm.websync.subscription-getChannel'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the subscription channel.
  	 </div>
  
  	@function getChannel
  	@return {String}
   */

  subscription.prototype.getChannel = function() {
    return this.__channel;
  };


  /*<span id='method-fm.websync.subscription-getHashCode'>&nbsp;</span> */


  /**
  	 <div>
  	 Returns a hash code for this instance.
  	 </div>
  	@function getHashCode
  	@return {Integer} 
  	 A hash code for this instance, suitable for use in hashing algorithms and data structures like a hash table.
   */

  subscription.prototype.getHashCode = function() {
    var num;
    num = 17;
    num = (num * 23) + this.getChannel().hashCode();
    if (!fm.global.equals(this.getTag(), null)) {
      num = (num * 23) + this.getTag().hashCode();
    }
    return num;
  };


  /*<span id='method-fm.websync.subscription-getTag'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the identifier for the subscription.
  	 </div>
  
  	@function getTag
  	@return {String}
   */

  subscription.prototype.getTag = function() {
    var ref;
    return (ref = this.__tag) != null ? ref : fm.stringExtensions.empty;
  };


  /*<span id='method-fm.websync.subscription-setChannel'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the subscription channel.
  	 </div>
  
  	@function setChannel
  	@param {String} value
  	@return {void}
   */

  subscription.prototype.setChannel = function() {
    var value;
    value = arguments[0];
    if (fm.global.equals(value, null)) {
      throw new Error("channel cannot be null.");
    }
    this.__channel = value;
    return this.setIsDirty(true);
  };


  /*<span id='method-fm.websync.subscription-setTag'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the identifier for the subscription.
  	 </div>
  
  	@function setTag
  	@param {String} value
  	@return {void}
   */

  subscription.prototype.setTag = function() {
    var value;
    value = arguments[0];
    this.__tag = value != null ? value : fm.stringExtensions.empty;
    return this.setIsDirty(true);
  };


  /*<span id='method-fm.websync.subscription-toJson'>&nbsp;</span> */


  /**
  	 <div>
  	 Serializes the record to JSON.
  	 </div>
  	@function toJson
  	@return {String} The record in JSON-serialized format.
   */

  subscription.prototype.toJson = function() {
    return fm.websync.subscription.toJson(this);
  };

  return subscription;

})(fm.dynamic);



/*<span id='cls-fm.websync.subscribedClient'>&nbsp;</span> */

/**
@class fm.websync.subscribedClient
 <div>
 Details about the subscribed client.
 </div>

@extends fm.serializable
 */
var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

fm.websync.subscribedClient = (function(superClass) {
  extend(subscribedClient, superClass);

  subscribedClient.prototype._boundRecords = null;

  subscribedClient.prototype._clientId = null;


  /*<span id='method-fm.websync.subscribedClient-fm.websync.subscribedClient'>&nbsp;</span> */


  /**
  	 <div>
  	 Initializes a new instance of the <see cref="fm.websync.subscribedClient">fm.websync.subscribedClient</see> class.
  	 </div>
  	@function fm.websync.subscribedClient
  	@param {fm.guid} clientId The subscribed client's ID.
  	@param {Object} boundRecords The records bound to the client.
  	@return {}
   */

  function subscribedClient() {
    this.getBoundRecordValue = bind(this.getBoundRecordValue, this);
    this.toJson = bind(this.toJson, this);
    this.setClientId = bind(this.setClientId, this);
    this.setBoundRecords = bind(this.setBoundRecords, this);
    this.getClientId = bind(this.getClientId, this);
    this.getBoundRecordValueJson = bind(this.getBoundRecordValueJson, this);
    this.getBoundRecords = bind(this.getBoundRecords, this);
    var boundRecords, clientId, instance;
    if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
      instance = subscribedClient.__super__.constructor.call(this);
      this.setBoundRecords({});
      fm.util.attachProperties(this, arguments[0]);
      return instance;
    }
    if (arguments.length === 2) {
      clientId = arguments[0];
      boundRecords = arguments[1];
      instance = subscribedClient.__super__.constructor.call(this);
      this.setClientId(clientId);
      this.setBoundRecords(boundRecords);
      return instance;
    }
    if (arguments.length === 0) {
      instance = subscribedClient.__super__.constructor.call(this);
      this.setBoundRecords({});
      return instance;
    }
  }


  /*<span id='method-fm.websync.subscribedClient-fromJson'>&nbsp;</span> */


  /**
  	 <div>
  	 Deserializes a JSON-formatted subscribed client.
  	 </div>
  	@function fromJson
  	@param {String} subscribedClientJson The JSON-formatted subscribed client to deserialize.
  	@return {fm.websync.subscribedClient} The subscribed client.
   */

  subscribedClient.fromJson = function() {
    var subscribedClientJson;
    subscribedClientJson = arguments[0];
    return fm.websync.serializer.deserializeSubscribedClient(subscribedClientJson);
  };


  /*<span id='method-fm.websync.subscribedClient-fromJsonMultiple'>&nbsp;</span> */


  /**
  	 <div>
  	 Deserializes a JSON-formatted array of subscribed clients.
  	 </div>
  	@function fromJsonMultiple
  	@param {String} subscribedClientsJson The JSON-formatted array of subscribed clients to deserialize.
  	@return {fm.array} The array of subscribed clients.
   */

  subscribedClient.fromJsonMultiple = function() {
    var subscribedClientsJson;
    subscribedClientsJson = arguments[0];
    return fm.websync.serializer.deserializeSubscribedClientArray(subscribedClientsJson);
  };


  /*<span id='method-fm.websync.subscribedClient-toJson'>&nbsp;</span> */


  /**
  	 <div>
  	 Serializes a subscribed client to JSON.
  	 </div>
  	@function toJson
  	@param {fm.websync.subscribedClient} subscribedClient The subscribed client to serialize.
  	@return {String} The JSON-formatted subscribed client.
   */

  subscribedClient.toJson = function() {
    var subscribedClient;
    subscribedClient = arguments[0];
    return fm.websync.serializer.serializeSubscribedClient(subscribedClient);
  };


  /*<span id='method-fm.websync.subscribedClient-toJsonMultiple'>&nbsp;</span> */


  /**
  	 <div>
  	 Serializes an array of subscribed clients to JSON.
  	 </div>
  	@function toJsonMultiple
  	@param {fm.array} subscribedClients The array of subscribed clients to serialize.
  	@return {String} The JSON-formatted array of subscribed clients.
   */

  subscribedClient.toJsonMultiple = function() {
    var subscribedClients;
    subscribedClients = arguments[0];
    return fm.websync.serializer.serializeSubscribedClientArray(subscribedClients);
  };


  /*<span id='method-fm.websync.subscribedClient-getBoundRecords'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the subscribed client's bound records.
  	 </div>
  
  	@function getBoundRecords
  	@return {Object}
   */

  subscribedClient.prototype.getBoundRecords = function() {
    return this._boundRecords;
  };


  /*<span id='method-fm.websync.subscribedClient-getBoundRecordValueJson'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the JSON value of a record bound to the subscribed client.
  	 </div>
  	@function getBoundRecordValueJson
  	@param {String} key The record key.
  	@return {String} The JSON value of the record, if it exists, or null.
   */

  subscribedClient.prototype.getBoundRecordValueJson = function() {
    var _var0, _var1, key, record;
    key = arguments[0];
    if (fm.global.equals(this.getBoundRecords(), null)) {
      return null;
    }
    record = null;
    _var0 = new fm.holder(record);
    _var1 = fm.hashExtensions.tryGetValue(this.getBoundRecords(), key, _var0);
    record = _var0.getValue();
    if (!_var1) {
      return null;
    }
    return record.getValueJson();
  };


  /*<span id='method-fm.websync.subscribedClient-getClientId'>&nbsp;</span> */


  /**
  	 <div>
  	 Gets the subscribed client's ID.
  	 </div>
  
  	@function getClientId
  	@return {fm.guid}
   */

  subscribedClient.prototype.getClientId = function() {
    return this._clientId;
  };


  /*<span id='method-fm.websync.subscribedClient-setBoundRecords'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the subscribed client's bound records.
  	 </div>
  
  	@function setBoundRecords
  	@param {Object} value
  	@return {void}
   */

  subscribedClient.prototype.setBoundRecords = function() {
    var value;
    value = arguments[0];
    return this._boundRecords = value;
  };


  /*<span id='method-fm.websync.subscribedClient-setClientId'>&nbsp;</span> */


  /**
  	 <div>
  	 Sets the subscribed client's ID.
  	 </div>
  
  	@function setClientId
  	@param {fm.guid} value
  	@return {void}
   */

  subscribedClient.prototype.setClientId = function() {
    var value;
    value = arguments[0];
    return this._clientId = value;
  };


  /*<span id='method-fm.websync.subscribedClient-toJson'>&nbsp;</span> */


  /**
  	 <div>
  	 Serializes this instance to JSON.
  	 </div>
  	@function toJson
  	@return {String} The JSON-formatted subscribed client.
   */

  subscribedClient.prototype.toJson = function() {
    return fm.websync.subscribedClient.toJson(this);
  };

  subscribedClient.prototype.getBoundRecordValue = function() {
    var key;
    key = arguments[0];
    return fm.json.deserialize(this.getBoundRecordValueJson.apply(this, arguments));
  };

  return subscribedClient;

})(fm.serializable);


(function() {
  var _activeClients, client, deleteActiveClient, deleteCookie, deleteCookieClient, insertActiveClient, insertCookie, insertCookieClient, selectActiveClients, selectCookieClient, selectCookies;
  client = fm.websync.client;
  client.addOnConnectRequest(function(c, e) {
    var args;
    args = e.getMethodArgs();
    if (!args.getIsReconnect() && !args.getLastClientId() && !args.getLastSessionId()) {
      client = selectCookieClient();
      if (client) {
        args.setLastClientId(client.clientId);
        args.setLastSessionId(client.sessionId);
        if (client.token) {
          c.setToken(client.token);
        }
        deleteCookieClient(client.clientId);
      }
    }
  });
  client.addOnConnectEnd(function(c, e) {
    var args;
    if (!e.getException()) {
      args = e.getMethodArgs();
      if (args.getLastClientId()) {
        deleteActiveClient(args.getLastClientId());
      }
      insertActiveClient({
        clientId: c.getClientId(),
        sessionId: c.getSessionId(),
        token: c.getToken()
      });
    }
  });
  client.addOnDisconnectEnd(function(c, e) {
    if (!e.getException()) {
      deleteActiveClient(c.getClientId());
    }
  });
  fm.util.observe(window, 'beforeunload', function() {
    var activeClient, activeClients, j, len;
    activeClients = selectActiveClients();
    for (j = 0, len = activeClients.length; j < len; j++) {
      activeClient = activeClients[j];
      insertCookieClient(activeClient);
    }
  });
  _activeClients = [];
  selectActiveClients = function() {
    return _activeClients;
  };
  insertActiveClient = function(client) {
    _activeClients.push(client);
  };
  deleteActiveClient = function(clientId) {
    var activeClient, i, j, len;
    for (i = j = 0, len = _activeClients.length; j < len; i = ++j) {
      activeClient = _activeClients[i];
      if (activeClient.clientId.equals(clientId)) {
        _activeClients.splice(i, 1);
        return;
      }
    }
  };
  fm.websync._cookiePrefix = 'fm-websync-';
  fm.websync.getCookiePrefix = function() {
    return fm.websync._cookiePrefix;
  };
  fm.websync.setCookiePrefix = function(value) {
    return fm.websync._cookiePrefix = value;
  };
  selectCookieClient = function() {
    var cookieClient, cookieName, cookieValue, cookies;
    cookies = selectCookies();
    cookieClient = null;
    for (cookieName in cookies) {
      cookieValue = cookies[cookieName];
      if (fm.stringExtensions.startsWith(cookieName, fm.websync._cookiePrefix)) {
        cookieValue = fm.json.deserialize(cookieValue);
        cookieClient = {
          clientId: new fm.guid(cookieValue.clientId),
          sessionId: new fm.guid(cookieValue.sessionId),
          token: cookieValue.token
        };
      }
    }
    return cookieClient;
  };
  insertCookieClient = function(client) {
    var cookieValue;
    cookieValue = {
      clientId: client.clientId.toString(),
      sessionId: client.sessionId.toString(),
      token: client.token
    };
    insertCookie(fm.websync._cookiePrefix + client.clientId.toString(), fm.json.serialize(cookieValue), 60);
  };
  deleteCookieClient = function(clientId) {
    deleteCookie(fm.websync._cookiePrefix + clientId.toString());
  };
  selectCookies = function() {
    var cookie, cookieSplit, cookies, equalsIndex, j, len;
    cookies = {};
    cookieSplit = document.cookie.split(';');
    for (j = 0, len = cookieSplit.length; j < len; j++) {
      cookie = cookieSplit[j];
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1, cookie.length);
      }
      equalsIndex = cookie.indexOf('=');
      if (equalsIndex >= 0) {
        cookies[cookie.substring(0, equalsIndex)] = decodeURIComponent(cookie.substring(equalsIndex + 1, cookie.length));
      }
    }
    return cookies;
  };
  insertCookie = function(name, value, seconds) {
    var date, expires;
    expires = '';
    if (seconds) {
      date = new Date();
      date.setTime(date.getTime() + (seconds * 1000));
      expires = '; expires=' + date.toGMTString();
    }
    document.cookie = name + '=' + encodeURIComponent(value) + expires + '; path=/';
  };
  return deleteCookie = function(name) {
    insertCookie(name, '', -1);
  };
})();


(function() {
  var _created, client, fn, j, len, methodName, oldClient, oldConstructor, oldPrototype, prop, publisher, ref;
  client = fm.websync.client;
  ref = ['connect', 'disconnect', 'subscribe', 'unsubscribe', 'bind', 'unbind', 'publish', 'notify', 'service'];
  fn = function(methodName) {
    var method;
    method = client.prototype[methodName];
    return client.prototype[methodName] = function() {
      var i, k, len1, obj, record, ref1;
      if (arguments.length === 1 && fm.util.isPlainObject(arguments[0])) {
        obj = arguments[0];
        if (obj.record && fm.util.isPlainObject(obj.record)) {
          obj.record = new fm.websync.record(obj.record);
        }
        if (obj.records) {
          ref1 = obj.records;
          for (i = k = 0, len1 = ref1.length; k < len1; i = ++k) {
            record = ref1[i];
            if (fm.util.isPlainObject(obj.records[i])) {
              obj.records[i] = new fm.websync.record(obj.records[i]);
            }
          }
        }
        return method.call(this, new fm.websync[methodName + 'Args'](obj));
      } else {
        return method.apply(this, arguments);
      }
    };
  };
  for (j = 0, len = ref.length; j < len; j++) {
    methodName = ref[j];
    fn(methodName);
  }
  oldConstructor = client.prototype.constructor;
  oldPrototype = client.prototype;
  oldClient = client;
  _created = false;
  fm.websync.client.enableMultiple = false;
  fm.websync.client = function() {
    var c;
    if (_created && !client.enableMultiple) {
      throw Error('To create multiple instances of the JavaScript client, set fm.websync.client.enableMultiple to true.');
    } else {
      _created = true;
      oldConstructor.apply(this, arguments);
      c = this;
      c.setDisableWebSockets(false);
      fm.util.observe(window, 'beforeunload', function() {
        var autoDisconnect, autoDisconnectConfig;
        autoDisconnect = c._autoDisconnect;
        if (autoDisconnect) {
          autoDisconnectConfig = c._autoDisconnectConfig;
          if (autoDisconnectConfig) {
            c.disconnect(autoDisconnectConfig);
          } else {
            c.disconnect();
          }
        }
      });
      return c;
    }
  };
  fm.websync.client.prototype = oldPrototype;
  for (prop in oldClient) {
    fm.websync.client[prop] = oldClient[prop];
  }
  client = fm.websync.client;
  publisher = fm.websync.publisher;
  if (typeof module !== 'undefined' && module.exports) {
    client.prototype.getDisableBinary = function() {
      return true;
    };
    publisher.prototype.getDisableBinary = function() {
      return true;
    };
  }
  client.prototype.setDisableCORS = function(disableCORS) {
    return this._disableCORS = disableCORS;
  };
  client.prototype.getDisableCORS = function() {
    return this._disableCORS || false;
  };
  client.prototype.setDisablePostMessage = function(disablePostMessage) {
    return this._disablePostMessage = disablePostMessage;
  };
  client.prototype.getDisablePostMessage = function() {
    return this._disablePostMessage || false;
  };
  client.prototype.setDisableJSONP = function(disableJSONP) {
    return this._disableJSONP = disableJSONP;
  };
  client.prototype.getDisableJSONP = function() {
    return this._disableJSONP || false;
  };
  client.prototype.setForceJSONP = function(forceJSONP) {
    return this._forceJSONP = forceJSONP;
  };
  client.prototype.getForceJSONP = function() {
    return this._forceJSONP || false;
  };
  publisher.prototype.setDisableCORS = function(disableCORS) {
    return this._disableCORS = disableCORS;
  };
  publisher.prototype.getDisableCORS = function() {
    return this._disableCORS || false;
  };
  publisher.prototype.setDisablePostMessage = function(disablePostMessage) {
    return this._disablePostMessage = disablePostMessage;
  };
  publisher.prototype.getDisablePostMessage = function() {
    return this._disablePostMessage || false;
  };
  publisher.prototype.setDisableJSONP = function(disableJSONP) {
    return this._disableJSONP = disableJSONP;
  };
  publisher.prototype.getDisableJSONP = function() {
    return this._disableJSONP || false;
  };
  publisher.prototype.setForceJSONP = function(forceJSONP) {
    return this._forceJSONP = forceJSONP;
  };
  publisher.prototype.getForceJSONP = function() {
    return this._forceJSONP || false;
  };
  return client.prototype.setAutoDisconnect = function(autoDisconnectConfig) {
    this._autoDisconnect = true;
    return this._autoDisconnectConfig = autoDisconnectConfig;
  };
})();


return fm.websync;
}));