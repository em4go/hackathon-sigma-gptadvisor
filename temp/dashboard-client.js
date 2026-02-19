var __create = Object.create;
var __getProtoOf = Object.getPrototypeOf;
var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __toESM = (mod, isNodeMode, target) => {
  target = mod != null ? __create(__getProtoOf(mod)) : {};
  const to = isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target;
  for (let key of __getOwnPropNames(mod))
    if (!__hasOwnProp.call(to, key))
      __defProp(to, key, {
        get: () => mod[key],
        enumerable: true
      });
  return to;
};
var __commonJS = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {
      get: all[name],
      enumerable: true,
      configurable: true,
      set: (newValue) => all[name] = () => newValue
    });
};

// node_modules/react/cjs/react.development.js
var require_react_development = __commonJS((exports, module) => {
  (function() {
    function defineDeprecationWarning(methodName, info) {
      Object.defineProperty(Component.prototype, methodName, {
        get: function() {
          console.warn("%s(...) is deprecated in plain JavaScript React classes. %s", info[0], info[1]);
        }
      });
    }
    function getIteratorFn(maybeIterable) {
      if (maybeIterable === null || typeof maybeIterable !== "object")
        return null;
      maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
      return typeof maybeIterable === "function" ? maybeIterable : null;
    }
    function warnNoop(publicInstance, callerName) {
      publicInstance = (publicInstance = publicInstance.constructor) && (publicInstance.displayName || publicInstance.name) || "ReactClass";
      var warningKey = publicInstance + "." + callerName;
      didWarnStateUpdateForUnmountedComponent[warningKey] || (console.error("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", callerName, publicInstance), didWarnStateUpdateForUnmountedComponent[warningKey] = true);
    }
    function Component(props, context, updater) {
      this.props = props;
      this.context = context;
      this.refs = emptyObject;
      this.updater = updater || ReactNoopUpdateQueue;
    }
    function ComponentDummy() {}
    function PureComponent(props, context, updater) {
      this.props = props;
      this.context = context;
      this.refs = emptyObject;
      this.updater = updater || ReactNoopUpdateQueue;
    }
    function noop() {}
    function testStringCoercion(value) {
      return "" + value;
    }
    function checkKeyStringCoercion(value) {
      try {
        testStringCoercion(value);
        var JSCompiler_inline_result = false;
      } catch (e) {
        JSCompiler_inline_result = true;
      }
      if (JSCompiler_inline_result) {
        JSCompiler_inline_result = console;
        var JSCompiler_temp_const = JSCompiler_inline_result.error;
        var JSCompiler_inline_result$jscomp$0 = typeof Symbol === "function" && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
        JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
        return testStringCoercion(value);
      }
    }
    function getComponentNameFromType(type) {
      if (type == null)
        return null;
      if (typeof type === "function")
        return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
      if (typeof type === "string")
        return type;
      switch (type) {
        case REACT_FRAGMENT_TYPE:
          return "Fragment";
        case REACT_PROFILER_TYPE:
          return "Profiler";
        case REACT_STRICT_MODE_TYPE:
          return "StrictMode";
        case REACT_SUSPENSE_TYPE:
          return "Suspense";
        case REACT_SUSPENSE_LIST_TYPE:
          return "SuspenseList";
        case REACT_ACTIVITY_TYPE:
          return "Activity";
      }
      if (typeof type === "object")
        switch (typeof type.tag === "number" && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof) {
          case REACT_PORTAL_TYPE:
            return "Portal";
          case REACT_CONTEXT_TYPE:
            return type.displayName || "Context";
          case REACT_CONSUMER_TYPE:
            return (type._context.displayName || "Context") + ".Consumer";
          case REACT_FORWARD_REF_TYPE:
            var innerType = type.render;
            type = type.displayName;
            type || (type = innerType.displayName || innerType.name || "", type = type !== "" ? "ForwardRef(" + type + ")" : "ForwardRef");
            return type;
          case REACT_MEMO_TYPE:
            return innerType = type.displayName || null, innerType !== null ? innerType : getComponentNameFromType(type.type) || "Memo";
          case REACT_LAZY_TYPE:
            innerType = type._payload;
            type = type._init;
            try {
              return getComponentNameFromType(type(innerType));
            } catch (x) {}
        }
      return null;
    }
    function getTaskName(type) {
      if (type === REACT_FRAGMENT_TYPE)
        return "<>";
      if (typeof type === "object" && type !== null && type.$$typeof === REACT_LAZY_TYPE)
        return "<...>";
      try {
        var name = getComponentNameFromType(type);
        return name ? "<" + name + ">" : "<...>";
      } catch (x) {
        return "<...>";
      }
    }
    function getOwner() {
      var dispatcher = ReactSharedInternals.A;
      return dispatcher === null ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
      return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
      if (hasOwnProperty.call(config, "key")) {
        var getter = Object.getOwnPropertyDescriptor(config, "key").get;
        if (getter && getter.isReactWarning)
          return false;
      }
      return config.key !== undefined;
    }
    function defineKeyPropWarningGetter(props, displayName) {
      function warnAboutAccessingKey() {
        specialPropKeyWarningShown || (specialPropKeyWarningShown = true, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
      }
      warnAboutAccessingKey.isReactWarning = true;
      Object.defineProperty(props, "key", {
        get: warnAboutAccessingKey,
        configurable: true
      });
    }
    function elementRefGetterWithDeprecationWarning() {
      var componentName = getComponentNameFromType(this.type);
      didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = true, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
      componentName = this.props.ref;
      return componentName !== undefined ? componentName : null;
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
      var refProp = props.ref;
      type = {
        $$typeof: REACT_ELEMENT_TYPE,
        type,
        key,
        props,
        _owner: owner
      };
      (refProp !== undefined ? refProp : null) !== null ? Object.defineProperty(type, "ref", {
        enumerable: false,
        get: elementRefGetterWithDeprecationWarning
      }) : Object.defineProperty(type, "ref", { enumerable: false, value: null });
      type._store = {};
      Object.defineProperty(type._store, "validated", {
        configurable: false,
        enumerable: false,
        writable: true,
        value: 0
      });
      Object.defineProperty(type, "_debugInfo", {
        configurable: false,
        enumerable: false,
        writable: true,
        value: null
      });
      Object.defineProperty(type, "_debugStack", {
        configurable: false,
        enumerable: false,
        writable: true,
        value: debugStack
      });
      Object.defineProperty(type, "_debugTask", {
        configurable: false,
        enumerable: false,
        writable: true,
        value: debugTask
      });
      Object.freeze && (Object.freeze(type.props), Object.freeze(type));
      return type;
    }
    function cloneAndReplaceKey(oldElement, newKey) {
      newKey = ReactElement(oldElement.type, newKey, oldElement.props, oldElement._owner, oldElement._debugStack, oldElement._debugTask);
      oldElement._store && (newKey._store.validated = oldElement._store.validated);
      return newKey;
    }
    function validateChildKeys(node) {
      isValidElement(node) ? node._store && (node._store.validated = 1) : typeof node === "object" && node !== null && node.$$typeof === REACT_LAZY_TYPE && (node._payload.status === "fulfilled" ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
    }
    function isValidElement(object) {
      return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    function escape(key) {
      var escaperLookup = { "=": "=0", ":": "=2" };
      return "$" + key.replace(/[=:]/g, function(match) {
        return escaperLookup[match];
      });
    }
    function getElementKey(element, index) {
      return typeof element === "object" && element !== null && element.key != null ? (checkKeyStringCoercion(element.key), escape("" + element.key)) : index.toString(36);
    }
    function resolveThenable(thenable) {
      switch (thenable.status) {
        case "fulfilled":
          return thenable.value;
        case "rejected":
          throw thenable.reason;
        default:
          switch (typeof thenable.status === "string" ? thenable.then(noop, noop) : (thenable.status = "pending", thenable.then(function(fulfilledValue) {
            thenable.status === "pending" && (thenable.status = "fulfilled", thenable.value = fulfilledValue);
          }, function(error) {
            thenable.status === "pending" && (thenable.status = "rejected", thenable.reason = error);
          })), thenable.status) {
            case "fulfilled":
              return thenable.value;
            case "rejected":
              throw thenable.reason;
          }
      }
      throw thenable;
    }
    function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
      var type = typeof children;
      if (type === "undefined" || type === "boolean")
        children = null;
      var invokeCallback = false;
      if (children === null)
        invokeCallback = true;
      else
        switch (type) {
          case "bigint":
          case "string":
          case "number":
            invokeCallback = true;
            break;
          case "object":
            switch (children.$$typeof) {
              case REACT_ELEMENT_TYPE:
              case REACT_PORTAL_TYPE:
                invokeCallback = true;
                break;
              case REACT_LAZY_TYPE:
                return invokeCallback = children._init, mapIntoArray(invokeCallback(children._payload), array, escapedPrefix, nameSoFar, callback);
            }
        }
      if (invokeCallback) {
        invokeCallback = children;
        callback = callback(invokeCallback);
        var childKey = nameSoFar === "" ? "." + getElementKey(invokeCallback, 0) : nameSoFar;
        isArrayImpl(callback) ? (escapedPrefix = "", childKey != null && (escapedPrefix = childKey.replace(userProvidedKeyEscapeRegex, "$&/") + "/"), mapIntoArray(callback, array, escapedPrefix, "", function(c) {
          return c;
        })) : callback != null && (isValidElement(callback) && (callback.key != null && (invokeCallback && invokeCallback.key === callback.key || checkKeyStringCoercion(callback.key)), escapedPrefix = cloneAndReplaceKey(callback, escapedPrefix + (callback.key == null || invokeCallback && invokeCallback.key === callback.key ? "" : ("" + callback.key).replace(userProvidedKeyEscapeRegex, "$&/") + "/") + childKey), nameSoFar !== "" && invokeCallback != null && isValidElement(invokeCallback) && invokeCallback.key == null && invokeCallback._store && !invokeCallback._store.validated && (escapedPrefix._store.validated = 2), callback = escapedPrefix), array.push(callback));
        return 1;
      }
      invokeCallback = 0;
      childKey = nameSoFar === "" ? "." : nameSoFar + ":";
      if (isArrayImpl(children))
        for (var i = 0;i < children.length; i++)
          nameSoFar = children[i], type = childKey + getElementKey(nameSoFar, i), invokeCallback += mapIntoArray(nameSoFar, array, escapedPrefix, type, callback);
      else if (i = getIteratorFn(children), typeof i === "function")
        for (i === children.entries && (didWarnAboutMaps || console.warn("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), didWarnAboutMaps = true), children = i.call(children), i = 0;!(nameSoFar = children.next()).done; )
          nameSoFar = nameSoFar.value, type = childKey + getElementKey(nameSoFar, i++), invokeCallback += mapIntoArray(nameSoFar, array, escapedPrefix, type, callback);
      else if (type === "object") {
        if (typeof children.then === "function")
          return mapIntoArray(resolveThenable(children), array, escapedPrefix, nameSoFar, callback);
        array = String(children);
        throw Error("Objects are not valid as a React child (found: " + (array === "[object Object]" ? "object with keys {" + Object.keys(children).join(", ") + "}" : array) + "). If you meant to render a collection of children, use an array instead.");
      }
      return invokeCallback;
    }
    function mapChildren(children, func, context) {
      if (children == null)
        return children;
      var result = [], count = 0;
      mapIntoArray(children, result, "", "", function(child) {
        return func.call(context, child, count++);
      });
      return result;
    }
    function lazyInitializer(payload) {
      if (payload._status === -1) {
        var ioInfo = payload._ioInfo;
        ioInfo != null && (ioInfo.start = ioInfo.end = performance.now());
        ioInfo = payload._result;
        var thenable = ioInfo();
        thenable.then(function(moduleObject) {
          if (payload._status === 0 || payload._status === -1) {
            payload._status = 1;
            payload._result = moduleObject;
            var _ioInfo = payload._ioInfo;
            _ioInfo != null && (_ioInfo.end = performance.now());
            thenable.status === undefined && (thenable.status = "fulfilled", thenable.value = moduleObject);
          }
        }, function(error) {
          if (payload._status === 0 || payload._status === -1) {
            payload._status = 2;
            payload._result = error;
            var _ioInfo2 = payload._ioInfo;
            _ioInfo2 != null && (_ioInfo2.end = performance.now());
            thenable.status === undefined && (thenable.status = "rejected", thenable.reason = error);
          }
        });
        ioInfo = payload._ioInfo;
        if (ioInfo != null) {
          ioInfo.value = thenable;
          var displayName = thenable.displayName;
          typeof displayName === "string" && (ioInfo.name = displayName);
        }
        payload._status === -1 && (payload._status = 0, payload._result = thenable);
      }
      if (payload._status === 1)
        return ioInfo = payload._result, ioInfo === undefined && console.error(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))

Did you accidentally put curly braces around the import?`, ioInfo), "default" in ioInfo || console.error(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))`, ioInfo), ioInfo.default;
      throw payload._result;
    }
    function resolveDispatcher() {
      var dispatcher = ReactSharedInternals.H;
      dispatcher === null && console.error(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.`);
      return dispatcher;
    }
    function releaseAsyncTransition() {
      ReactSharedInternals.asyncTransitions--;
    }
    function enqueueTask(task) {
      if (enqueueTaskImpl === null)
        try {
          var requireString = ("require" + Math.random()).slice(0, 7);
          enqueueTaskImpl = (module && module[requireString]).call(module, "timers").setImmediate;
        } catch (_err) {
          enqueueTaskImpl = function(callback) {
            didWarnAboutMessageChannel === false && (didWarnAboutMessageChannel = true, typeof MessageChannel === "undefined" && console.error("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."));
            var channel = new MessageChannel;
            channel.port1.onmessage = callback;
            channel.port2.postMessage(undefined);
          };
        }
      return enqueueTaskImpl(task);
    }
    function aggregateErrors(errors) {
      return 1 < errors.length && typeof AggregateError === "function" ? new AggregateError(errors) : errors[0];
    }
    function popActScope(prevActQueue, prevActScopeDepth) {
      prevActScopeDepth !== actScopeDepth - 1 && console.error("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. ");
      actScopeDepth = prevActScopeDepth;
    }
    function recursivelyFlushAsyncActWork(returnValue, resolve, reject) {
      var queue = ReactSharedInternals.actQueue;
      if (queue !== null)
        if (queue.length !== 0)
          try {
            flushActQueue(queue);
            enqueueTask(function() {
              return recursivelyFlushAsyncActWork(returnValue, resolve, reject);
            });
            return;
          } catch (error) {
            ReactSharedInternals.thrownErrors.push(error);
          }
        else
          ReactSharedInternals.actQueue = null;
      0 < ReactSharedInternals.thrownErrors.length ? (queue = aggregateErrors(ReactSharedInternals.thrownErrors), ReactSharedInternals.thrownErrors.length = 0, reject(queue)) : resolve(returnValue);
    }
    function flushActQueue(queue) {
      if (!isFlushing) {
        isFlushing = true;
        var i = 0;
        try {
          for (;i < queue.length; i++) {
            var callback = queue[i];
            do {
              ReactSharedInternals.didUsePromise = false;
              var continuation = callback(false);
              if (continuation !== null) {
                if (ReactSharedInternals.didUsePromise) {
                  queue[i] = callback;
                  queue.splice(0, i);
                  return;
                }
                callback = continuation;
              } else
                break;
            } while (1);
          }
          queue.length = 0;
        } catch (error) {
          queue.splice(0, i + 1), ReactSharedInternals.thrownErrors.push(error);
        } finally {
          isFlushing = false;
        }
      }
    }
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart === "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
    var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), MAYBE_ITERATOR_SYMBOL = Symbol.iterator, didWarnStateUpdateForUnmountedComponent = {}, ReactNoopUpdateQueue = {
      isMounted: function() {
        return false;
      },
      enqueueForceUpdate: function(publicInstance) {
        warnNoop(publicInstance, "forceUpdate");
      },
      enqueueReplaceState: function(publicInstance) {
        warnNoop(publicInstance, "replaceState");
      },
      enqueueSetState: function(publicInstance) {
        warnNoop(publicInstance, "setState");
      }
    }, assign = Object.assign, emptyObject = {};
    Object.freeze(emptyObject);
    Component.prototype.isReactComponent = {};
    Component.prototype.setState = function(partialState, callback) {
      if (typeof partialState !== "object" && typeof partialState !== "function" && partialState != null)
        throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
      this.updater.enqueueSetState(this, partialState, callback, "setState");
    };
    Component.prototype.forceUpdate = function(callback) {
      this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
    };
    var deprecatedAPIs = {
      isMounted: [
        "isMounted",
        "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."
      ],
      replaceState: [
        "replaceState",
        "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."
      ]
    };
    for (fnName in deprecatedAPIs)
      deprecatedAPIs.hasOwnProperty(fnName) && defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
    ComponentDummy.prototype = Component.prototype;
    deprecatedAPIs = PureComponent.prototype = new ComponentDummy;
    deprecatedAPIs.constructor = PureComponent;
    assign(deprecatedAPIs, Component.prototype);
    deprecatedAPIs.isPureReactComponent = true;
    var isArrayImpl = Array.isArray, REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = {
      H: null,
      A: null,
      T: null,
      S: null,
      actQueue: null,
      asyncTransitions: 0,
      isBatchingLegacy: false,
      didScheduleLegacyUpdate: false,
      didUsePromise: false,
      thrownErrors: [],
      getCurrentStack: null,
      recentlyCreatedOwnerStacks: 0
    }, hasOwnProperty = Object.prototype.hasOwnProperty, createTask = console.createTask ? console.createTask : function() {
      return null;
    };
    deprecatedAPIs = {
      react_stack_bottom_frame: function(callStackForError) {
        return callStackForError();
      }
    };
    var specialPropKeyWarningShown, didWarnAboutOldJSXRuntime;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = deprecatedAPIs.react_stack_bottom_frame.bind(deprecatedAPIs, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutMaps = false, userProvidedKeyEscapeRegex = /\/+/g, reportGlobalError = typeof reportError === "function" ? reportError : function(error) {
      if (typeof window === "object" && typeof window.ErrorEvent === "function") {
        var event = new window.ErrorEvent("error", {
          bubbles: true,
          cancelable: true,
          message: typeof error === "object" && error !== null && typeof error.message === "string" ? String(error.message) : String(error),
          error
        });
        if (!window.dispatchEvent(event))
          return;
      } else if (typeof process === "object" && typeof process.emit === "function") {
        process.emit("uncaughtException", error);
        return;
      }
      console.error(error);
    }, didWarnAboutMessageChannel = false, enqueueTaskImpl = null, actScopeDepth = 0, didWarnNoAwaitAct = false, isFlushing = false, queueSeveralMicrotasks = typeof queueMicrotask === "function" ? function(callback) {
      queueMicrotask(function() {
        return queueMicrotask(callback);
      });
    } : enqueueTask;
    deprecatedAPIs = Object.freeze({
      __proto__: null,
      c: function(size) {
        return resolveDispatcher().useMemoCache(size);
      }
    });
    var fnName = {
      map: mapChildren,
      forEach: function(children, forEachFunc, forEachContext) {
        mapChildren(children, function() {
          forEachFunc.apply(this, arguments);
        }, forEachContext);
      },
      count: function(children) {
        var n = 0;
        mapChildren(children, function() {
          n++;
        });
        return n;
      },
      toArray: function(children) {
        return mapChildren(children, function(child) {
          return child;
        }) || [];
      },
      only: function(children) {
        if (!isValidElement(children))
          throw Error("React.Children.only expected to receive a single React element child.");
        return children;
      }
    };
    exports.Activity = REACT_ACTIVITY_TYPE;
    exports.Children = fnName;
    exports.Component = Component;
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.Profiler = REACT_PROFILER_TYPE;
    exports.PureComponent = PureComponent;
    exports.StrictMode = REACT_STRICT_MODE_TYPE;
    exports.Suspense = REACT_SUSPENSE_TYPE;
    exports.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ReactSharedInternals;
    exports.__COMPILER_RUNTIME = deprecatedAPIs;
    exports.act = function(callback) {
      var prevActQueue = ReactSharedInternals.actQueue, prevActScopeDepth = actScopeDepth;
      actScopeDepth++;
      var queue = ReactSharedInternals.actQueue = prevActQueue !== null ? prevActQueue : [], didAwaitActCall = false;
      try {
        var result = callback();
      } catch (error) {
        ReactSharedInternals.thrownErrors.push(error);
      }
      if (0 < ReactSharedInternals.thrownErrors.length)
        throw popActScope(prevActQueue, prevActScopeDepth), callback = aggregateErrors(ReactSharedInternals.thrownErrors), ReactSharedInternals.thrownErrors.length = 0, callback;
      if (result !== null && typeof result === "object" && typeof result.then === "function") {
        var thenable = result;
        queueSeveralMicrotasks(function() {
          didAwaitActCall || didWarnNoAwaitAct || (didWarnNoAwaitAct = true, console.error("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"));
        });
        return {
          then: function(resolve, reject) {
            didAwaitActCall = true;
            thenable.then(function(returnValue) {
              popActScope(prevActQueue, prevActScopeDepth);
              if (prevActScopeDepth === 0) {
                try {
                  flushActQueue(queue), enqueueTask(function() {
                    return recursivelyFlushAsyncActWork(returnValue, resolve, reject);
                  });
                } catch (error$0) {
                  ReactSharedInternals.thrownErrors.push(error$0);
                }
                if (0 < ReactSharedInternals.thrownErrors.length) {
                  var _thrownError = aggregateErrors(ReactSharedInternals.thrownErrors);
                  ReactSharedInternals.thrownErrors.length = 0;
                  reject(_thrownError);
                }
              } else
                resolve(returnValue);
            }, function(error) {
              popActScope(prevActQueue, prevActScopeDepth);
              0 < ReactSharedInternals.thrownErrors.length ? (error = aggregateErrors(ReactSharedInternals.thrownErrors), ReactSharedInternals.thrownErrors.length = 0, reject(error)) : reject(error);
            });
          }
        };
      }
      var returnValue$jscomp$0 = result;
      popActScope(prevActQueue, prevActScopeDepth);
      prevActScopeDepth === 0 && (flushActQueue(queue), queue.length !== 0 && queueSeveralMicrotasks(function() {
        didAwaitActCall || didWarnNoAwaitAct || (didWarnNoAwaitAct = true, console.error("A component suspended inside an `act` scope, but the `act` call was not awaited. When testing React components that depend on asynchronous data, you must await the result:\n\nawait act(() => ...)"));
      }), ReactSharedInternals.actQueue = null);
      if (0 < ReactSharedInternals.thrownErrors.length)
        throw callback = aggregateErrors(ReactSharedInternals.thrownErrors), ReactSharedInternals.thrownErrors.length = 0, callback;
      return {
        then: function(resolve, reject) {
          didAwaitActCall = true;
          prevActScopeDepth === 0 ? (ReactSharedInternals.actQueue = queue, enqueueTask(function() {
            return recursivelyFlushAsyncActWork(returnValue$jscomp$0, resolve, reject);
          })) : resolve(returnValue$jscomp$0);
        }
      };
    };
    exports.cache = function(fn) {
      return function() {
        return fn.apply(null, arguments);
      };
    };
    exports.cacheSignal = function() {
      return null;
    };
    exports.captureOwnerStack = function() {
      var getCurrentStack = ReactSharedInternals.getCurrentStack;
      return getCurrentStack === null ? null : getCurrentStack();
    };
    exports.cloneElement = function(element, config, children) {
      if (element === null || element === undefined)
        throw Error("The argument must be a React element, but you passed " + element + ".");
      var props = assign({}, element.props), key = element.key, owner = element._owner;
      if (config != null) {
        var JSCompiler_inline_result;
        a: {
          if (hasOwnProperty.call(config, "ref") && (JSCompiler_inline_result = Object.getOwnPropertyDescriptor(config, "ref").get) && JSCompiler_inline_result.isReactWarning) {
            JSCompiler_inline_result = false;
            break a;
          }
          JSCompiler_inline_result = config.ref !== undefined;
        }
        JSCompiler_inline_result && (owner = getOwner());
        hasValidKey(config) && (checkKeyStringCoercion(config.key), key = "" + config.key);
        for (propName in config)
          !hasOwnProperty.call(config, propName) || propName === "key" || propName === "__self" || propName === "__source" || propName === "ref" && config.ref === undefined || (props[propName] = config[propName]);
      }
      var propName = arguments.length - 2;
      if (propName === 1)
        props.children = children;
      else if (1 < propName) {
        JSCompiler_inline_result = Array(propName);
        for (var i = 0;i < propName; i++)
          JSCompiler_inline_result[i] = arguments[i + 2];
        props.children = JSCompiler_inline_result;
      }
      props = ReactElement(element.type, key, props, owner, element._debugStack, element._debugTask);
      for (key = 2;key < arguments.length; key++)
        validateChildKeys(arguments[key]);
      return props;
    };
    exports.createContext = function(defaultValue) {
      defaultValue = {
        $$typeof: REACT_CONTEXT_TYPE,
        _currentValue: defaultValue,
        _currentValue2: defaultValue,
        _threadCount: 0,
        Provider: null,
        Consumer: null
      };
      defaultValue.Provider = defaultValue;
      defaultValue.Consumer = {
        $$typeof: REACT_CONSUMER_TYPE,
        _context: defaultValue
      };
      defaultValue._currentRenderer = null;
      defaultValue._currentRenderer2 = null;
      return defaultValue;
    };
    exports.createElement = function(type, config, children) {
      for (var i = 2;i < arguments.length; i++)
        validateChildKeys(arguments[i]);
      i = {};
      var key = null;
      if (config != null)
        for (propName in didWarnAboutOldJSXRuntime || !("__self" in config) || "key" in config || (didWarnAboutOldJSXRuntime = true, console.warn("Your app (or one of its dependencies) is using an outdated JSX transform. Update to the modern JSX transform for faster performance: https://react.dev/link/new-jsx-transform")), hasValidKey(config) && (checkKeyStringCoercion(config.key), key = "" + config.key), config)
          hasOwnProperty.call(config, propName) && propName !== "key" && propName !== "__self" && propName !== "__source" && (i[propName] = config[propName]);
      var childrenLength = arguments.length - 2;
      if (childrenLength === 1)
        i.children = children;
      else if (1 < childrenLength) {
        for (var childArray = Array(childrenLength), _i = 0;_i < childrenLength; _i++)
          childArray[_i] = arguments[_i + 2];
        Object.freeze && Object.freeze(childArray);
        i.children = childArray;
      }
      if (type && type.defaultProps)
        for (propName in childrenLength = type.defaultProps, childrenLength)
          i[propName] === undefined && (i[propName] = childrenLength[propName]);
      key && defineKeyPropWarningGetter(i, typeof type === "function" ? type.displayName || type.name || "Unknown" : type);
      var propName = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
      return ReactElement(type, key, i, getOwner(), propName ? Error("react-stack-top-frame") : unknownOwnerDebugStack, propName ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
    exports.createRef = function() {
      var refObject = { current: null };
      Object.seal(refObject);
      return refObject;
    };
    exports.forwardRef = function(render) {
      render != null && render.$$typeof === REACT_MEMO_TYPE ? console.error("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).") : typeof render !== "function" ? console.error("forwardRef requires a render function but was given %s.", render === null ? "null" : typeof render) : render.length !== 0 && render.length !== 2 && console.error("forwardRef render functions accept exactly two parameters: props and ref. %s", render.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined.");
      render != null && render.defaultProps != null && console.error("forwardRef render functions do not support defaultProps. Did you accidentally pass a React component?");
      var elementType = { $$typeof: REACT_FORWARD_REF_TYPE, render }, ownName;
      Object.defineProperty(elementType, "displayName", {
        enumerable: false,
        configurable: true,
        get: function() {
          return ownName;
        },
        set: function(name) {
          ownName = name;
          render.name || render.displayName || (Object.defineProperty(render, "name", { value: name }), render.displayName = name);
        }
      });
      return elementType;
    };
    exports.isValidElement = isValidElement;
    exports.lazy = function(ctor) {
      ctor = { _status: -1, _result: ctor };
      var lazyType = {
        $$typeof: REACT_LAZY_TYPE,
        _payload: ctor,
        _init: lazyInitializer
      }, ioInfo = {
        name: "lazy",
        start: -1,
        end: -1,
        value: null,
        owner: null,
        debugStack: Error("react-stack-top-frame"),
        debugTask: console.createTask ? console.createTask("lazy()") : null
      };
      ctor._ioInfo = ioInfo;
      lazyType._debugInfo = [{ awaited: ioInfo }];
      return lazyType;
    };
    exports.memo = function(type, compare) {
      type == null && console.error("memo: The first argument must be a component. Instead received: %s", type === null ? "null" : typeof type);
      compare = {
        $$typeof: REACT_MEMO_TYPE,
        type,
        compare: compare === undefined ? null : compare
      };
      var ownName;
      Object.defineProperty(compare, "displayName", {
        enumerable: false,
        configurable: true,
        get: function() {
          return ownName;
        },
        set: function(name) {
          ownName = name;
          type.name || type.displayName || (Object.defineProperty(type, "name", { value: name }), type.displayName = name);
        }
      });
      return compare;
    };
    exports.startTransition = function(scope) {
      var prevTransition = ReactSharedInternals.T, currentTransition = {};
      currentTransition._updatedFibers = new Set;
      ReactSharedInternals.T = currentTransition;
      try {
        var returnValue = scope(), onStartTransitionFinish = ReactSharedInternals.S;
        onStartTransitionFinish !== null && onStartTransitionFinish(currentTransition, returnValue);
        typeof returnValue === "object" && returnValue !== null && typeof returnValue.then === "function" && (ReactSharedInternals.asyncTransitions++, returnValue.then(releaseAsyncTransition, releaseAsyncTransition), returnValue.then(noop, reportGlobalError));
      } catch (error) {
        reportGlobalError(error);
      } finally {
        prevTransition === null && currentTransition._updatedFibers && (scope = currentTransition._updatedFibers.size, currentTransition._updatedFibers.clear(), 10 < scope && console.warn("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table.")), prevTransition !== null && currentTransition.types !== null && (prevTransition.types !== null && prevTransition.types !== currentTransition.types && console.error("We expected inner Transitions to have transferred the outer types set and that you cannot add to the outer Transition while inside the inner.This is a bug in React."), prevTransition.types = currentTransition.types), ReactSharedInternals.T = prevTransition;
      }
    };
    exports.unstable_useCacheRefresh = function() {
      return resolveDispatcher().useCacheRefresh();
    };
    exports.use = function(usable) {
      return resolveDispatcher().use(usable);
    };
    exports.useActionState = function(action, initialState, permalink) {
      return resolveDispatcher().useActionState(action, initialState, permalink);
    };
    exports.useCallback = function(callback, deps) {
      return resolveDispatcher().useCallback(callback, deps);
    };
    exports.useContext = function(Context) {
      var dispatcher = resolveDispatcher();
      Context.$$typeof === REACT_CONSUMER_TYPE && console.error("Calling useContext(Context.Consumer) is not supported and will cause bugs. Did you mean to call useContext(Context) instead?");
      return dispatcher.useContext(Context);
    };
    exports.useDebugValue = function(value, formatterFn) {
      return resolveDispatcher().useDebugValue(value, formatterFn);
    };
    exports.useDeferredValue = function(value, initialValue) {
      return resolveDispatcher().useDeferredValue(value, initialValue);
    };
    exports.useEffect = function(create, deps) {
      create == null && console.warn("React Hook useEffect requires an effect callback. Did you forget to pass a callback to the hook?");
      return resolveDispatcher().useEffect(create, deps);
    };
    exports.useEffectEvent = function(callback) {
      return resolveDispatcher().useEffectEvent(callback);
    };
    exports.useId = function() {
      return resolveDispatcher().useId();
    };
    exports.useImperativeHandle = function(ref, create, deps) {
      return resolveDispatcher().useImperativeHandle(ref, create, deps);
    };
    exports.useInsertionEffect = function(create, deps) {
      create == null && console.warn("React Hook useInsertionEffect requires an effect callback. Did you forget to pass a callback to the hook?");
      return resolveDispatcher().useInsertionEffect(create, deps);
    };
    exports.useLayoutEffect = function(create, deps) {
      create == null && console.warn("React Hook useLayoutEffect requires an effect callback. Did you forget to pass a callback to the hook?");
      return resolveDispatcher().useLayoutEffect(create, deps);
    };
    exports.useMemo = function(create, deps) {
      return resolveDispatcher().useMemo(create, deps);
    };
    exports.useOptimistic = function(passthrough, reducer) {
      return resolveDispatcher().useOptimistic(passthrough, reducer);
    };
    exports.useReducer = function(reducer, initialArg, init) {
      return resolveDispatcher().useReducer(reducer, initialArg, init);
    };
    exports.useRef = function(initialValue) {
      return resolveDispatcher().useRef(initialValue);
    };
    exports.useState = function(initialState) {
      return resolveDispatcher().useState(initialState);
    };
    exports.useSyncExternalStore = function(subscribe, getSnapshot, getServerSnapshot) {
      return resolveDispatcher().useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
    };
    exports.useTransition = function() {
      return resolveDispatcher().useTransition();
    };
    exports.version = "19.2.3";
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop === "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
  })();
});

// node_modules/react/index.js
var require_react = __commonJS((exports, module) => {
  var react_development = __toESM(require_react_development());
  if (false) {} else {
    module.exports = react_development;
  }
});

// node_modules/react/cjs/react-jsx-dev-runtime.development.js
var require_react_jsx_dev_runtime_development = __commonJS((exports) => {
  var React = __toESM(require_react());
  (function() {
    function getComponentNameFromType(type) {
      if (type == null)
        return null;
      if (typeof type === "function")
        return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
      if (typeof type === "string")
        return type;
      switch (type) {
        case REACT_FRAGMENT_TYPE:
          return "Fragment";
        case REACT_PROFILER_TYPE:
          return "Profiler";
        case REACT_STRICT_MODE_TYPE:
          return "StrictMode";
        case REACT_SUSPENSE_TYPE:
          return "Suspense";
        case REACT_SUSPENSE_LIST_TYPE:
          return "SuspenseList";
        case REACT_ACTIVITY_TYPE:
          return "Activity";
      }
      if (typeof type === "object")
        switch (typeof type.tag === "number" && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof) {
          case REACT_PORTAL_TYPE:
            return "Portal";
          case REACT_CONTEXT_TYPE:
            return type.displayName || "Context";
          case REACT_CONSUMER_TYPE:
            return (type._context.displayName || "Context") + ".Consumer";
          case REACT_FORWARD_REF_TYPE:
            var innerType = type.render;
            type = type.displayName;
            type || (type = innerType.displayName || innerType.name || "", type = type !== "" ? "ForwardRef(" + type + ")" : "ForwardRef");
            return type;
          case REACT_MEMO_TYPE:
            return innerType = type.displayName || null, innerType !== null ? innerType : getComponentNameFromType(type.type) || "Memo";
          case REACT_LAZY_TYPE:
            innerType = type._payload;
            type = type._init;
            try {
              return getComponentNameFromType(type(innerType));
            } catch (x) {}
        }
      return null;
    }
    function testStringCoercion(value) {
      return "" + value;
    }
    function checkKeyStringCoercion(value) {
      try {
        testStringCoercion(value);
        var JSCompiler_inline_result = false;
      } catch (e) {
        JSCompiler_inline_result = true;
      }
      if (JSCompiler_inline_result) {
        JSCompiler_inline_result = console;
        var JSCompiler_temp_const = JSCompiler_inline_result.error;
        var JSCompiler_inline_result$jscomp$0 = typeof Symbol === "function" && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
        JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
        return testStringCoercion(value);
      }
    }
    function getTaskName(type) {
      if (type === REACT_FRAGMENT_TYPE)
        return "<>";
      if (typeof type === "object" && type !== null && type.$$typeof === REACT_LAZY_TYPE)
        return "<...>";
      try {
        var name = getComponentNameFromType(type);
        return name ? "<" + name + ">" : "<...>";
      } catch (x) {
        return "<...>";
      }
    }
    function getOwner() {
      var dispatcher = ReactSharedInternals.A;
      return dispatcher === null ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
      return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
      if (hasOwnProperty.call(config, "key")) {
        var getter = Object.getOwnPropertyDescriptor(config, "key").get;
        if (getter && getter.isReactWarning)
          return false;
      }
      return config.key !== undefined;
    }
    function defineKeyPropWarningGetter(props, displayName) {
      function warnAboutAccessingKey() {
        specialPropKeyWarningShown || (specialPropKeyWarningShown = true, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
      }
      warnAboutAccessingKey.isReactWarning = true;
      Object.defineProperty(props, "key", {
        get: warnAboutAccessingKey,
        configurable: true
      });
    }
    function elementRefGetterWithDeprecationWarning() {
      var componentName = getComponentNameFromType(this.type);
      didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = true, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
      componentName = this.props.ref;
      return componentName !== undefined ? componentName : null;
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
      var refProp = props.ref;
      type = {
        $$typeof: REACT_ELEMENT_TYPE,
        type,
        key,
        props,
        _owner: owner
      };
      (refProp !== undefined ? refProp : null) !== null ? Object.defineProperty(type, "ref", {
        enumerable: false,
        get: elementRefGetterWithDeprecationWarning
      }) : Object.defineProperty(type, "ref", { enumerable: false, value: null });
      type._store = {};
      Object.defineProperty(type._store, "validated", {
        configurable: false,
        enumerable: false,
        writable: true,
        value: 0
      });
      Object.defineProperty(type, "_debugInfo", {
        configurable: false,
        enumerable: false,
        writable: true,
        value: null
      });
      Object.defineProperty(type, "_debugStack", {
        configurable: false,
        enumerable: false,
        writable: true,
        value: debugStack
      });
      Object.defineProperty(type, "_debugTask", {
        configurable: false,
        enumerable: false,
        writable: true,
        value: debugTask
      });
      Object.freeze && (Object.freeze(type.props), Object.freeze(type));
      return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
      var children = config.children;
      if (children !== undefined)
        if (isStaticChildren)
          if (isArrayImpl(children)) {
            for (isStaticChildren = 0;isStaticChildren < children.length; isStaticChildren++)
              validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
          } else
            console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else
          validateChildKeys(children);
      if (hasOwnProperty.call(config, "key")) {
        children = getComponentNameFromType(type);
        var keys = Object.keys(config).filter(function(k) {
          return k !== "key";
        });
        isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
        didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = true);
      }
      children = null;
      maybeKey !== undefined && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
      hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
      if ("key" in config) {
        maybeKey = {};
        for (var propName in config)
          propName !== "key" && (maybeKey[propName] = config[propName]);
      } else
        maybeKey = config;
      children && defineKeyPropWarningGetter(maybeKey, typeof type === "function" ? type.displayName || type.name || "Unknown" : type);
      return ReactElement(type, children, maybeKey, getOwner(), debugStack, debugTask);
    }
    function validateChildKeys(node) {
      isValidElement(node) ? node._store && (node._store.validated = 1) : typeof node === "object" && node !== null && node.$$typeof === REACT_LAZY_TYPE && (node._payload.status === "fulfilled" ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
    }
    function isValidElement(object) {
      return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
      return null;
    };
    React = {
      react_stack_bottom_frame: function(callStackForError) {
        return callStackForError();
      }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(React, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren) {
      var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
      return jsxDEVImpl(type, config, maybeKey, isStaticChildren, trackActualOwner ? Error("react-stack-top-frame") : unknownOwnerDebugStack, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
  })();
});

// node_modules/react/jsx-dev-runtime.js
var require_jsx_dev_runtime = __commonJS((exports, module) => {
  var react_jsx_dev_runtime_development = __toESM(require_react_jsx_dev_runtime_development());
  if (false) {} else {
    module.exports = react_jsx_dev_runtime_development;
  }
});

// node_modules/react-dom/cjs/react-dom.development.js
var require_react_dom_development = __commonJS((exports) => {
  var React = __toESM(require_react());
  (function() {
    function noop() {}
    function testStringCoercion(value) {
      return "" + value;
    }
    function createPortal$1(children, containerInfo, implementation) {
      var key = 3 < arguments.length && arguments[3] !== undefined ? arguments[3] : null;
      try {
        testStringCoercion(key);
        var JSCompiler_inline_result = false;
      } catch (e) {
        JSCompiler_inline_result = true;
      }
      JSCompiler_inline_result && (console.error("The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", typeof Symbol === "function" && Symbol.toStringTag && key[Symbol.toStringTag] || key.constructor.name || "Object"), testStringCoercion(key));
      return {
        $$typeof: REACT_PORTAL_TYPE,
        key: key == null ? null : "" + key,
        children,
        containerInfo,
        implementation
      };
    }
    function getCrossOriginStringAs(as, input) {
      if (as === "font")
        return "";
      if (typeof input === "string")
        return input === "use-credentials" ? input : "";
    }
    function getValueDescriptorExpectingObjectForWarning(thing) {
      return thing === null ? "`null`" : thing === undefined ? "`undefined`" : thing === "" ? "an empty string" : 'something with type "' + typeof thing + '"';
    }
    function getValueDescriptorExpectingEnumForWarning(thing) {
      return thing === null ? "`null`" : thing === undefined ? "`undefined`" : thing === "" ? "an empty string" : typeof thing === "string" ? JSON.stringify(thing) : typeof thing === "number" ? "`" + thing + "`" : 'something with type "' + typeof thing + '"';
    }
    function resolveDispatcher() {
      var dispatcher = ReactSharedInternals.H;
      dispatcher === null && console.error(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.`);
      return dispatcher;
    }
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart === "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
    var Internals = {
      d: {
        f: noop,
        r: function() {
          throw Error("Invalid form element. requestFormReset must be passed a form that was rendered by React.");
        },
        D: noop,
        C: noop,
        L: noop,
        m: noop,
        X: noop,
        S: noop,
        M: noop
      },
      p: 0,
      findDOMNode: null
    }, REACT_PORTAL_TYPE = Symbol.for("react.portal"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
    typeof Map === "function" && Map.prototype != null && typeof Map.prototype.forEach === "function" && typeof Set === "function" && Set.prototype != null && typeof Set.prototype.clear === "function" && typeof Set.prototype.forEach === "function" || console.error("React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills");
    exports.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Internals;
    exports.createPortal = function(children, container) {
      var key = 2 < arguments.length && arguments[2] !== undefined ? arguments[2] : null;
      if (!container || container.nodeType !== 1 && container.nodeType !== 9 && container.nodeType !== 11)
        throw Error("Target container is not a DOM element.");
      return createPortal$1(children, container, null, key);
    };
    exports.flushSync = function(fn) {
      var previousTransition = ReactSharedInternals.T, previousUpdatePriority = Internals.p;
      try {
        if (ReactSharedInternals.T = null, Internals.p = 2, fn)
          return fn();
      } finally {
        ReactSharedInternals.T = previousTransition, Internals.p = previousUpdatePriority, Internals.d.f() && console.error("flushSync was called from inside a lifecycle method. React cannot flush when React is already rendering. Consider moving this call to a scheduler task or micro task.");
      }
    };
    exports.preconnect = function(href, options) {
      typeof href === "string" && href ? options != null && typeof options !== "object" ? console.error("ReactDOM.preconnect(): Expected the `options` argument (second) to be an object but encountered %s instead. The only supported option at this time is `crossOrigin` which accepts a string.", getValueDescriptorExpectingEnumForWarning(options)) : options != null && typeof options.crossOrigin !== "string" && console.error("ReactDOM.preconnect(): Expected the `crossOrigin` option (second argument) to be a string but encountered %s instead. Try removing this option or passing a string value instead.", getValueDescriptorExpectingObjectForWarning(options.crossOrigin)) : console.error("ReactDOM.preconnect(): Expected the `href` argument (first) to be a non-empty string but encountered %s instead.", getValueDescriptorExpectingObjectForWarning(href));
      typeof href === "string" && (options ? (options = options.crossOrigin, options = typeof options === "string" ? options === "use-credentials" ? options : "" : undefined) : options = null, Internals.d.C(href, options));
    };
    exports.prefetchDNS = function(href) {
      if (typeof href !== "string" || !href)
        console.error("ReactDOM.prefetchDNS(): Expected the `href` argument (first) to be a non-empty string but encountered %s instead.", getValueDescriptorExpectingObjectForWarning(href));
      else if (1 < arguments.length) {
        var options = arguments[1];
        typeof options === "object" && options.hasOwnProperty("crossOrigin") ? console.error("ReactDOM.prefetchDNS(): Expected only one argument, `href`, but encountered %s as a second argument instead. This argument is reserved for future options and is currently disallowed. It looks like the you are attempting to set a crossOrigin property for this DNS lookup hint. Browsers do not perform DNS queries using CORS and setting this attribute on the resource hint has no effect. Try calling ReactDOM.prefetchDNS() with just a single string argument, `href`.", getValueDescriptorExpectingEnumForWarning(options)) : console.error("ReactDOM.prefetchDNS(): Expected only one argument, `href`, but encountered %s as a second argument instead. This argument is reserved for future options and is currently disallowed. Try calling ReactDOM.prefetchDNS() with just a single string argument, `href`.", getValueDescriptorExpectingEnumForWarning(options));
      }
      typeof href === "string" && Internals.d.D(href);
    };
    exports.preinit = function(href, options) {
      typeof href === "string" && href ? options == null || typeof options !== "object" ? console.error("ReactDOM.preinit(): Expected the `options` argument (second) to be an object with an `as` property describing the type of resource to be preinitialized but encountered %s instead.", getValueDescriptorExpectingEnumForWarning(options)) : options.as !== "style" && options.as !== "script" && console.error('ReactDOM.preinit(): Expected the `as` property in the `options` argument (second) to contain a valid value describing the type of resource to be preinitialized but encountered %s instead. Valid values for `as` are "style" and "script".', getValueDescriptorExpectingEnumForWarning(options.as)) : console.error("ReactDOM.preinit(): Expected the `href` argument (first) to be a non-empty string but encountered %s instead.", getValueDescriptorExpectingObjectForWarning(href));
      if (typeof href === "string" && options && typeof options.as === "string") {
        var as = options.as, crossOrigin = getCrossOriginStringAs(as, options.crossOrigin), integrity = typeof options.integrity === "string" ? options.integrity : undefined, fetchPriority = typeof options.fetchPriority === "string" ? options.fetchPriority : undefined;
        as === "style" ? Internals.d.S(href, typeof options.precedence === "string" ? options.precedence : undefined, {
          crossOrigin,
          integrity,
          fetchPriority
        }) : as === "script" && Internals.d.X(href, {
          crossOrigin,
          integrity,
          fetchPriority,
          nonce: typeof options.nonce === "string" ? options.nonce : undefined
        });
      }
    };
    exports.preinitModule = function(href, options) {
      var encountered = "";
      typeof href === "string" && href || (encountered += " The `href` argument encountered was " + getValueDescriptorExpectingObjectForWarning(href) + ".");
      options !== undefined && typeof options !== "object" ? encountered += " The `options` argument encountered was " + getValueDescriptorExpectingObjectForWarning(options) + "." : options && ("as" in options) && options.as !== "script" && (encountered += " The `as` option encountered was " + getValueDescriptorExpectingEnumForWarning(options.as) + ".");
      if (encountered)
        console.error("ReactDOM.preinitModule(): Expected up to two arguments, a non-empty `href` string and, optionally, an `options` object with a valid `as` property.%s", encountered);
      else
        switch (encountered = options && typeof options.as === "string" ? options.as : "script", encountered) {
          case "script":
            break;
          default:
            encountered = getValueDescriptorExpectingEnumForWarning(encountered), console.error('ReactDOM.preinitModule(): Currently the only supported "as" type for this function is "script" but received "%s" instead. This warning was generated for `href` "%s". In the future other module types will be supported, aligning with the import-attributes proposal. Learn more here: (https://github.com/tc39/proposal-import-attributes)', encountered, href);
        }
      if (typeof href === "string")
        if (typeof options === "object" && options !== null) {
          if (options.as == null || options.as === "script")
            encountered = getCrossOriginStringAs(options.as, options.crossOrigin), Internals.d.M(href, {
              crossOrigin: encountered,
              integrity: typeof options.integrity === "string" ? options.integrity : undefined,
              nonce: typeof options.nonce === "string" ? options.nonce : undefined
            });
        } else
          options == null && Internals.d.M(href);
    };
    exports.preload = function(href, options) {
      var encountered = "";
      typeof href === "string" && href || (encountered += " The `href` argument encountered was " + getValueDescriptorExpectingObjectForWarning(href) + ".");
      options == null || typeof options !== "object" ? encountered += " The `options` argument encountered was " + getValueDescriptorExpectingObjectForWarning(options) + "." : typeof options.as === "string" && options.as || (encountered += " The `as` option encountered was " + getValueDescriptorExpectingObjectForWarning(options.as) + ".");
      encountered && console.error('ReactDOM.preload(): Expected two arguments, a non-empty `href` string and an `options` object with an `as` property valid for a `<link rel="preload" as="..." />` tag.%s', encountered);
      if (typeof href === "string" && typeof options === "object" && options !== null && typeof options.as === "string") {
        encountered = options.as;
        var crossOrigin = getCrossOriginStringAs(encountered, options.crossOrigin);
        Internals.d.L(href, encountered, {
          crossOrigin,
          integrity: typeof options.integrity === "string" ? options.integrity : undefined,
          nonce: typeof options.nonce === "string" ? options.nonce : undefined,
          type: typeof options.type === "string" ? options.type : undefined,
          fetchPriority: typeof options.fetchPriority === "string" ? options.fetchPriority : undefined,
          referrerPolicy: typeof options.referrerPolicy === "string" ? options.referrerPolicy : undefined,
          imageSrcSet: typeof options.imageSrcSet === "string" ? options.imageSrcSet : undefined,
          imageSizes: typeof options.imageSizes === "string" ? options.imageSizes : undefined,
          media: typeof options.media === "string" ? options.media : undefined
        });
      }
    };
    exports.preloadModule = function(href, options) {
      var encountered = "";
      typeof href === "string" && href || (encountered += " The `href` argument encountered was " + getValueDescriptorExpectingObjectForWarning(href) + ".");
      options !== undefined && typeof options !== "object" ? encountered += " The `options` argument encountered was " + getValueDescriptorExpectingObjectForWarning(options) + "." : options && ("as" in options) && typeof options.as !== "string" && (encountered += " The `as` option encountered was " + getValueDescriptorExpectingObjectForWarning(options.as) + ".");
      encountered && console.error('ReactDOM.preloadModule(): Expected two arguments, a non-empty `href` string and, optionally, an `options` object with an `as` property valid for a `<link rel="modulepreload" as="..." />` tag.%s', encountered);
      typeof href === "string" && (options ? (encountered = getCrossOriginStringAs(options.as, options.crossOrigin), Internals.d.m(href, {
        as: typeof options.as === "string" && options.as !== "script" ? options.as : undefined,
        crossOrigin: encountered,
        integrity: typeof options.integrity === "string" ? options.integrity : undefined
      })) : Internals.d.m(href));
    };
    exports.requestFormReset = function(form) {
      Internals.d.r(form);
    };
    exports.unstable_batchedUpdates = function(fn, a) {
      return fn(a);
    };
    exports.useFormState = function(action, initialState, permalink) {
      return resolveDispatcher().useFormState(action, initialState, permalink);
    };
    exports.useFormStatus = function() {
      return resolveDispatcher().useHostTransitionStatus();
    };
    exports.version = "19.2.3";
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop === "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
  })();
});

// node_modules/react-dom/index.js
var require_react_dom = __commonJS((exports, module) => {
  var react_dom_development = __toESM(require_react_dom_development());
  if (false) {} else {
    module.exports = react_dom_development;
  }
});

// node_modules/react/cjs/react-jsx-runtime.development.js
var require_react_jsx_runtime_development = __commonJS((exports) => {
  var React2 = __toESM(require_react());
  (function() {
    function getComponentNameFromType(type) {
      if (type == null)
        return null;
      if (typeof type === "function")
        return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
      if (typeof type === "string")
        return type;
      switch (type) {
        case REACT_FRAGMENT_TYPE:
          return "Fragment";
        case REACT_PROFILER_TYPE:
          return "Profiler";
        case REACT_STRICT_MODE_TYPE:
          return "StrictMode";
        case REACT_SUSPENSE_TYPE:
          return "Suspense";
        case REACT_SUSPENSE_LIST_TYPE:
          return "SuspenseList";
        case REACT_ACTIVITY_TYPE:
          return "Activity";
      }
      if (typeof type === "object")
        switch (typeof type.tag === "number" && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof) {
          case REACT_PORTAL_TYPE:
            return "Portal";
          case REACT_CONTEXT_TYPE:
            return type.displayName || "Context";
          case REACT_CONSUMER_TYPE:
            return (type._context.displayName || "Context") + ".Consumer";
          case REACT_FORWARD_REF_TYPE:
            var innerType = type.render;
            type = type.displayName;
            type || (type = innerType.displayName || innerType.name || "", type = type !== "" ? "ForwardRef(" + type + ")" : "ForwardRef");
            return type;
          case REACT_MEMO_TYPE:
            return innerType = type.displayName || null, innerType !== null ? innerType : getComponentNameFromType(type.type) || "Memo";
          case REACT_LAZY_TYPE:
            innerType = type._payload;
            type = type._init;
            try {
              return getComponentNameFromType(type(innerType));
            } catch (x) {}
        }
      return null;
    }
    function testStringCoercion(value) {
      return "" + value;
    }
    function checkKeyStringCoercion(value) {
      try {
        testStringCoercion(value);
        var JSCompiler_inline_result = false;
      } catch (e) {
        JSCompiler_inline_result = true;
      }
      if (JSCompiler_inline_result) {
        JSCompiler_inline_result = console;
        var JSCompiler_temp_const = JSCompiler_inline_result.error;
        var JSCompiler_inline_result$jscomp$0 = typeof Symbol === "function" && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
        JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
        return testStringCoercion(value);
      }
    }
    function getTaskName(type) {
      if (type === REACT_FRAGMENT_TYPE)
        return "<>";
      if (typeof type === "object" && type !== null && type.$$typeof === REACT_LAZY_TYPE)
        return "<...>";
      try {
        var name = getComponentNameFromType(type);
        return name ? "<" + name + ">" : "<...>";
      } catch (x) {
        return "<...>";
      }
    }
    function getOwner() {
      var dispatcher = ReactSharedInternals.A;
      return dispatcher === null ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
      return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
      if (hasOwnProperty.call(config, "key")) {
        var getter = Object.getOwnPropertyDescriptor(config, "key").get;
        if (getter && getter.isReactWarning)
          return false;
      }
      return config.key !== undefined;
    }
    function defineKeyPropWarningGetter(props, displayName) {
      function warnAboutAccessingKey() {
        specialPropKeyWarningShown || (specialPropKeyWarningShown = true, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
      }
      warnAboutAccessingKey.isReactWarning = true;
      Object.defineProperty(props, "key", {
        get: warnAboutAccessingKey,
        configurable: true
      });
    }
    function elementRefGetterWithDeprecationWarning() {
      var componentName = getComponentNameFromType(this.type);
      didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = true, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
      componentName = this.props.ref;
      return componentName !== undefined ? componentName : null;
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
      var refProp = props.ref;
      type = {
        $$typeof: REACT_ELEMENT_TYPE,
        type,
        key,
        props,
        _owner: owner
      };
      (refProp !== undefined ? refProp : null) !== null ? Object.defineProperty(type, "ref", {
        enumerable: false,
        get: elementRefGetterWithDeprecationWarning
      }) : Object.defineProperty(type, "ref", { enumerable: false, value: null });
      type._store = {};
      Object.defineProperty(type._store, "validated", {
        configurable: false,
        enumerable: false,
        writable: true,
        value: 0
      });
      Object.defineProperty(type, "_debugInfo", {
        configurable: false,
        enumerable: false,
        writable: true,
        value: null
      });
      Object.defineProperty(type, "_debugStack", {
        configurable: false,
        enumerable: false,
        writable: true,
        value: debugStack
      });
      Object.defineProperty(type, "_debugTask", {
        configurable: false,
        enumerable: false,
        writable: true,
        value: debugTask
      });
      Object.freeze && (Object.freeze(type.props), Object.freeze(type));
      return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
      var children = config.children;
      if (children !== undefined)
        if (isStaticChildren)
          if (isArrayImpl(children)) {
            for (isStaticChildren = 0;isStaticChildren < children.length; isStaticChildren++)
              validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
          } else
            console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else
          validateChildKeys(children);
      if (hasOwnProperty.call(config, "key")) {
        children = getComponentNameFromType(type);
        var keys = Object.keys(config).filter(function(k) {
          return k !== "key";
        });
        isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
        didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = true);
      }
      children = null;
      maybeKey !== undefined && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
      hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
      if ("key" in config) {
        maybeKey = {};
        for (var propName in config)
          propName !== "key" && (maybeKey[propName] = config[propName]);
      } else
        maybeKey = config;
      children && defineKeyPropWarningGetter(maybeKey, typeof type === "function" ? type.displayName || type.name || "Unknown" : type);
      return ReactElement(type, children, maybeKey, getOwner(), debugStack, debugTask);
    }
    function validateChildKeys(node) {
      isValidElement(node) ? node._store && (node._store.validated = 1) : typeof node === "object" && node !== null && node.$$typeof === REACT_LAZY_TYPE && (node._payload.status === "fulfilled" ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
    }
    function isValidElement(object) {
      return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    var REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React2.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
      return null;
    };
    React2 = {
      react_stack_bottom_frame: function(callStackForError) {
        return callStackForError();
      }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React2.react_stack_bottom_frame.bind(React2, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsx = function(type, config, maybeKey) {
      var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
      return jsxDEVImpl(type, config, maybeKey, false, trackActualOwner ? Error("react-stack-top-frame") : unknownOwnerDebugStack, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
    exports.jsxs = function(type, config, maybeKey) {
      var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
      return jsxDEVImpl(type, config, maybeKey, true, trackActualOwner ? Error("react-stack-top-frame") : unknownOwnerDebugStack, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
  })();
});

// node_modules/react/jsx-runtime.js
var require_jsx_runtime = __commonJS((exports, module) => {
  var react_jsx_runtime_development = __toESM(require_react_jsx_runtime_development());
  if (false) {} else {
    module.exports = react_jsx_runtime_development;
  }
});

// node_modules/use-sync-external-store/cjs/use-sync-external-store-shim.development.js
var require_use_sync_external_store_shim_development = __commonJS((exports) => {
  var React7 = __toESM(require_react());
  (function() {
    function is(x, y) {
      return x === y && (x !== 0 || 1 / x === 1 / y) || x !== x && y !== y;
    }
    function useSyncExternalStore$2(subscribe, getSnapshot) {
      didWarnOld18Alpha || React7.startTransition === undefined || (didWarnOld18Alpha = true, console.error("You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release."));
      var value = getSnapshot();
      if (!didWarnUncachedGetSnapshot) {
        var cachedValue = getSnapshot();
        objectIs(value, cachedValue) || (console.error("The result of getSnapshot should be cached to avoid an infinite loop"), didWarnUncachedGetSnapshot = true);
      }
      cachedValue = useState2({
        inst: { value, getSnapshot }
      });
      var inst = cachedValue[0].inst, forceUpdate = cachedValue[1];
      useLayoutEffect4(function() {
        inst.value = value;
        inst.getSnapshot = getSnapshot;
        checkIfSnapshotChanged(inst) && forceUpdate({ inst });
      }, [subscribe, value, getSnapshot]);
      useEffect3(function() {
        checkIfSnapshotChanged(inst) && forceUpdate({ inst });
        return subscribe(function() {
          checkIfSnapshotChanged(inst) && forceUpdate({ inst });
        });
      }, [subscribe]);
      useDebugValue2(value);
      return value;
    }
    function checkIfSnapshotChanged(inst) {
      var latestGetSnapshot = inst.getSnapshot;
      inst = inst.value;
      try {
        var nextValue = latestGetSnapshot();
        return !objectIs(inst, nextValue);
      } catch (error) {
        return true;
      }
    }
    function useSyncExternalStore$1(subscribe, getSnapshot) {
      return getSnapshot();
    }
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart === "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
    var objectIs = typeof Object.is === "function" ? Object.is : is, useState2 = React7.useState, useEffect3 = React7.useEffect, useLayoutEffect4 = React7.useLayoutEffect, useDebugValue2 = React7.useDebugValue, didWarnOld18Alpha = false, didWarnUncachedGetSnapshot = false, shim = typeof window === "undefined" || typeof window.document === "undefined" || typeof window.document.createElement === "undefined" ? useSyncExternalStore$1 : useSyncExternalStore$2;
    exports.useSyncExternalStore = React7.useSyncExternalStore !== undefined ? React7.useSyncExternalStore : shim;
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop === "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
  })();
});

// node_modules/use-sync-external-store/shim/index.js
var require_shim = __commonJS((exports, module) => {
  if (false) {} else {
    module.exports = require_use_sync_external_store_shim_development();
  }
});

// node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs
var require__interop_require_wildcard = __commonJS((exports) => {
  function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function")
      return null;
    var cacheBabelInterop = new WeakMap;
    var cacheNodeInterop = new WeakMap;
    return (_getRequireWildcardCache = function(nodeInterop2) {
      return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
  }
  function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule)
      return obj;
    if (obj === null || typeof obj !== "object" && typeof obj !== "function")
      return { default: obj };
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj))
      return cache.get(obj);
    var newObj = { __proto__: null };
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) {
      if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
        var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
        if (desc && (desc.get || desc.set))
          Object.defineProperty(newObj, key, desc);
        else
          newObj[key] = obj[key];
      }
    }
    newObj.default = obj;
    if (cache)
      cache.set(obj, newObj);
    return newObj;
  }
  exports._ = _interop_require_wildcard;
});

// node_modules/next/dist/shared/lib/router/utils/querystring.js
var require_querystring = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  function _export(target, all) {
    for (var name in all)
      Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
      });
  }
  _export(exports, {
    assign: function() {
      return assign;
    },
    searchParamsToUrlQuery: function() {
      return searchParamsToUrlQuery;
    },
    urlQueryToSearchParams: function() {
      return urlQueryToSearchParams;
    }
  });
  function searchParamsToUrlQuery(searchParams) {
    const query = {};
    for (const [key, value] of searchParams.entries()) {
      const existing = query[key];
      if (typeof existing === "undefined") {
        query[key] = value;
      } else if (Array.isArray(existing)) {
        existing.push(value);
      } else {
        query[key] = [
          existing,
          value
        ];
      }
    }
    return query;
  }
  function stringifyUrlQueryParam(param) {
    if (typeof param === "string") {
      return param;
    }
    if (typeof param === "number" && !isNaN(param) || typeof param === "boolean") {
      return String(param);
    } else {
      return "";
    }
  }
  function urlQueryToSearchParams(query) {
    const searchParams = new URLSearchParams;
    for (const [key, value] of Object.entries(query)) {
      if (Array.isArray(value)) {
        for (const item of value) {
          searchParams.append(key, stringifyUrlQueryParam(item));
        }
      } else {
        searchParams.set(key, stringifyUrlQueryParam(value));
      }
    }
    return searchParams;
  }
  function assign(target, ...searchParamsList) {
    for (const searchParams of searchParamsList) {
      for (const key of searchParams.keys()) {
        target.delete(key);
      }
      for (const [key, value] of searchParams.entries()) {
        target.append(key, value);
      }
    }
    return target;
  }
});

// node_modules/next/dist/shared/lib/router/utils/format-url.js
var require_format_url = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  function _export(target, all) {
    for (var name in all)
      Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
      });
  }
  _export(exports, {
    formatUrl: function() {
      return formatUrl;
    },
    formatWithValidation: function() {
      return formatWithValidation;
    },
    urlObjectKeys: function() {
      return urlObjectKeys;
    }
  });
  var _interop_require_wildcard = require__interop_require_wildcard();
  var _querystring = /* @__PURE__ */ _interop_require_wildcard._(require_querystring());
  var slashedProtocols = /https?|ftp|gopher|file/;
  function formatUrl(urlObj) {
    let { auth, hostname } = urlObj;
    let protocol = urlObj.protocol || "";
    let pathname = urlObj.pathname || "";
    let hash = urlObj.hash || "";
    let query = urlObj.query || "";
    let host = false;
    auth = auth ? encodeURIComponent(auth).replace(/%3A/i, ":") + "@" : "";
    if (urlObj.host) {
      host = auth + urlObj.host;
    } else if (hostname) {
      host = auth + (~hostname.indexOf(":") ? `[${hostname}]` : hostname);
      if (urlObj.port) {
        host += ":" + urlObj.port;
      }
    }
    if (query && typeof query === "object") {
      query = String(_querystring.urlQueryToSearchParams(query));
    }
    let search = urlObj.search || query && `?${query}` || "";
    if (protocol && !protocol.endsWith(":"))
      protocol += ":";
    if (urlObj.slashes || (!protocol || slashedProtocols.test(protocol)) && host !== false) {
      host = "//" + (host || "");
      if (pathname && pathname[0] !== "/")
        pathname = "/" + pathname;
    } else if (!host) {
      host = "";
    }
    if (hash && hash[0] !== "#")
      hash = "#" + hash;
    if (search && search[0] !== "?")
      search = "?" + search;
    pathname = pathname.replace(/[?#]/g, encodeURIComponent);
    search = search.replace("#", "%23");
    return `${protocol}${host}${pathname}${search}${hash}`;
  }
  var urlObjectKeys = [
    "auth",
    "hash",
    "host",
    "hostname",
    "href",
    "path",
    "pathname",
    "port",
    "protocol",
    "query",
    "search",
    "slashes"
  ];
  function formatWithValidation(url) {
    if (true) {
      if (url !== null && typeof url === "object") {
        Object.keys(url).forEach((key) => {
          if (!urlObjectKeys.includes(key)) {
            console.warn(`Unknown key passed via urlObject into url.format: ${key}`);
          }
        });
      }
    }
    return formatUrl(url);
  }
});

// node_modules/next/dist/shared/lib/router/utils/omit.js
var require_omit = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "omit", {
    enumerable: true,
    get: function() {
      return omit;
    }
  });
  function omit(object, keys) {
    const omitted = {};
    Object.keys(object).forEach((key) => {
      if (!keys.includes(key)) {
        omitted[key] = object[key];
      }
    });
    return omitted;
  }
});

// node_modules/next/dist/shared/lib/utils.js
var require_utils = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  function _export(target, all) {
    for (var name in all)
      Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
      });
  }
  _export(exports, {
    DecodeError: function() {
      return DecodeError;
    },
    MiddlewareNotFoundError: function() {
      return MiddlewareNotFoundError;
    },
    MissingStaticPage: function() {
      return MissingStaticPage;
    },
    NormalizeError: function() {
      return NormalizeError;
    },
    PageNotFoundError: function() {
      return PageNotFoundError;
    },
    SP: function() {
      return SP;
    },
    ST: function() {
      return ST;
    },
    WEB_VITALS: function() {
      return WEB_VITALS;
    },
    execOnce: function() {
      return execOnce;
    },
    getDisplayName: function() {
      return getDisplayName;
    },
    getLocationOrigin: function() {
      return getLocationOrigin;
    },
    getURL: function() {
      return getURL;
    },
    isAbsoluteUrl: function() {
      return isAbsoluteUrl;
    },
    isResSent: function() {
      return isResSent;
    },
    loadGetInitialProps: function() {
      return loadGetInitialProps;
    },
    normalizeRepeatedSlashes: function() {
      return normalizeRepeatedSlashes;
    },
    stringifyError: function() {
      return stringifyError;
    }
  });
  var WEB_VITALS = [
    "CLS",
    "FCP",
    "FID",
    "INP",
    "LCP",
    "TTFB"
  ];
  function execOnce(fn) {
    let used = false;
    let result;
    return (...args) => {
      if (!used) {
        used = true;
        result = fn(...args);
      }
      return result;
    };
  }
  var ABSOLUTE_URL_REGEX = /^[a-zA-Z][a-zA-Z\d+\-.]*?:/;
  var isAbsoluteUrl = (url) => ABSOLUTE_URL_REGEX.test(url);
  function getLocationOrigin() {
    const { protocol, hostname, port } = window.location;
    return `${protocol}//${hostname}${port ? ":" + port : ""}`;
  }
  function getURL() {
    const { href } = window.location;
    const origin = getLocationOrigin();
    return href.substring(origin.length);
  }
  function getDisplayName(Component) {
    return typeof Component === "string" ? Component : Component.displayName || Component.name || "Unknown";
  }
  function isResSent(res) {
    return res.finished || res.headersSent;
  }
  function normalizeRepeatedSlashes(url) {
    const urlParts = url.split("?");
    const urlNoQuery = urlParts[0];
    return urlNoQuery.replace(/\\/g, "/").replace(/\/\/+/g, "/") + (urlParts[1] ? `?${urlParts.slice(1).join("?")}` : "");
  }
  async function loadGetInitialProps(App, ctx) {
    if (true) {
      if (App.prototype?.getInitialProps) {
        const message = `"${getDisplayName(App)}.getInitialProps()" is defined as an instance method - visit https://nextjs.org/docs/messages/get-initial-props-as-an-instance-method for more information.`;
        throw Object.defineProperty(new Error(message), "__NEXT_ERROR_CODE", {
          value: "E394",
          enumerable: false,
          configurable: true
        });
      }
    }
    const res = ctx.res || ctx.ctx && ctx.ctx.res;
    if (!App.getInitialProps) {
      if (ctx.ctx && ctx.Component) {
        return {
          pageProps: await loadGetInitialProps(ctx.Component, ctx.ctx)
        };
      }
      return {};
    }
    const props = await App.getInitialProps(ctx);
    if (res && isResSent(res)) {
      return props;
    }
    if (!props) {
      const message = `"${getDisplayName(App)}.getInitialProps()" should resolve to an object. But found "${props}" instead.`;
      throw Object.defineProperty(new Error(message), "__NEXT_ERROR_CODE", {
        value: "E394",
        enumerable: false,
        configurable: true
      });
    }
    if (true) {
      if (Object.keys(props).length === 0 && !ctx.ctx) {
        console.warn(`${getDisplayName(App)} returned an empty object from \`getInitialProps\`. This de-optimizes and prevents automatic static optimization. https://nextjs.org/docs/messages/empty-object-getInitialProps`);
      }
    }
    return props;
  }
  var SP = typeof performance !== "undefined";
  var ST = SP && [
    "mark",
    "measure",
    "getEntriesByName"
  ].every((method) => typeof performance[method] === "function");

  class DecodeError extends Error {
  }

  class NormalizeError extends Error {
  }

  class PageNotFoundError extends Error {
    constructor(page) {
      super();
      this.code = "ENOENT";
      this.name = "PageNotFoundError";
      this.message = `Cannot find module for page: ${page}`;
    }
  }

  class MissingStaticPage extends Error {
    constructor(page, message) {
      super();
      this.message = `Failed to load static file for page: ${page} ${message}`;
    }
  }

  class MiddlewareNotFoundError extends Error {
    constructor() {
      super();
      this.code = "ENOENT";
      this.message = `Cannot find the middleware module`;
    }
  }
  function stringifyError(error) {
    return JSON.stringify({
      message: error.message,
      stack: error.stack
    });
  }
});

// node_modules/next/dist/shared/lib/router/utils/remove-trailing-slash.js
var require_remove_trailing_slash = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "removeTrailingSlash", {
    enumerable: true,
    get: function() {
      return removeTrailingSlash;
    }
  });
  function removeTrailingSlash(route) {
    return route.replace(/\/$/, "") || "/";
  }
});

// node_modules/next/dist/shared/lib/router/utils/parse-path.js
var require_parse_path = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "parsePath", {
    enumerable: true,
    get: function() {
      return parsePath;
    }
  });
  function parsePath(path) {
    const hashIndex = path.indexOf("#");
    const queryIndex = path.indexOf("?");
    const hasQuery = queryIndex > -1 && (hashIndex < 0 || queryIndex < hashIndex);
    if (hasQuery || hashIndex > -1) {
      return {
        pathname: path.substring(0, hasQuery ? queryIndex : hashIndex),
        query: hasQuery ? path.substring(queryIndex, hashIndex > -1 ? hashIndex : undefined) : "",
        hash: hashIndex > -1 ? path.slice(hashIndex) : ""
      };
    }
    return {
      pathname: path,
      query: "",
      hash: ""
    };
  }
});

// node_modules/next/dist/client/normalize-trailing-slash.js
var require_normalize_trailing_slash = __commonJS((exports, module) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "normalizePathTrailingSlash", {
    enumerable: true,
    get: function() {
      return normalizePathTrailingSlash;
    }
  });
  var _removetrailingslash = require_remove_trailing_slash();
  var _parsepath = require_parse_path();
  var normalizePathTrailingSlash = (path) => {
    if (!path.startsWith("/") || process.env.__NEXT_MANUAL_TRAILING_SLASH) {
      return path;
    }
    const { pathname, query, hash } = (0, _parsepath.parsePath)(path);
    if (process.env.__NEXT_TRAILING_SLASH) {
      if (/\.[^/]+\/?$/.test(pathname)) {
        return `${(0, _removetrailingslash.removeTrailingSlash)(pathname)}${query}${hash}`;
      } else if (pathname.endsWith("/")) {
        return `${pathname}${query}${hash}`;
      } else {
        return `${pathname}/${query}${hash}`;
      }
    }
    return `${(0, _removetrailingslash.removeTrailingSlash)(pathname)}${query}${hash}`;
  };
  if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", { value: true });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
  }
});

// node_modules/next/dist/shared/lib/router/utils/path-has-prefix.js
var require_path_has_prefix = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "pathHasPrefix", {
    enumerable: true,
    get: function() {
      return pathHasPrefix;
    }
  });
  var _parsepath = require_parse_path();
  function pathHasPrefix(path, prefix) {
    if (typeof path !== "string") {
      return false;
    }
    const { pathname } = (0, _parsepath.parsePath)(path);
    return pathname === prefix || pathname.startsWith(prefix + "/");
  }
});

// node_modules/next/dist/client/has-base-path.js
var require_has_base_path = __commonJS((exports, module) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "hasBasePath", {
    enumerable: true,
    get: function() {
      return hasBasePath;
    }
  });
  var _pathhasprefix = require_path_has_prefix();
  var basePath = process.env.__NEXT_ROUTER_BASEPATH || "";
  function hasBasePath(path) {
    return (0, _pathhasprefix.pathHasPrefix)(path, basePath);
  }
  if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", { value: true });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
  }
});

// node_modules/next/dist/shared/lib/router/utils/is-local-url.js
var require_is_local_url = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "isLocalURL", {
    enumerable: true,
    get: function() {
      return isLocalURL;
    }
  });
  var _utils = require_utils();
  var _hasbasepath = require_has_base_path();
  function isLocalURL(url) {
    if (!(0, _utils.isAbsoluteUrl)(url))
      return true;
    try {
      const locationOrigin = (0, _utils.getLocationOrigin)();
      const resolved = new URL(url, locationOrigin);
      return resolved.origin === locationOrigin && (0, _hasbasepath.hasBasePath)(resolved.pathname);
    } catch (_) {
      return false;
    }
  }
});

// node_modules/next/dist/shared/lib/router/utils/sorted-routes.js
var require_sorted_routes = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  function _export(target, all) {
    for (var name in all)
      Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
      });
  }
  _export(exports, {
    getSortedRouteObjects: function() {
      return getSortedRouteObjects;
    },
    getSortedRoutes: function() {
      return getSortedRoutes;
    }
  });

  class UrlNode {
    insert(urlPath) {
      this._insert(urlPath.split("/").filter(Boolean), [], false);
    }
    smoosh() {
      return this._smoosh();
    }
    _smoosh(prefix = "/") {
      const childrenPaths = [
        ...this.children.keys()
      ].sort();
      if (this.slugName !== null) {
        childrenPaths.splice(childrenPaths.indexOf("[]"), 1);
      }
      if (this.restSlugName !== null) {
        childrenPaths.splice(childrenPaths.indexOf("[...]"), 1);
      }
      if (this.optionalRestSlugName !== null) {
        childrenPaths.splice(childrenPaths.indexOf("[[...]]"), 1);
      }
      const routes = childrenPaths.map((c) => this.children.get(c)._smoosh(`${prefix}${c}/`)).reduce((prev, curr) => [
        ...prev,
        ...curr
      ], []);
      if (this.slugName !== null) {
        routes.push(...this.children.get("[]")._smoosh(`${prefix}[${this.slugName}]/`));
      }
      if (!this.placeholder) {
        const r2 = prefix === "/" ? "/" : prefix.slice(0, -1);
        if (this.optionalRestSlugName != null) {
          throw Object.defineProperty(new Error(`You cannot define a route with the same specificity as a optional catch-all route ("${r2}" and "${r2}[[...${this.optionalRestSlugName}]]").`), "__NEXT_ERROR_CODE", {
            value: "E458",
            enumerable: false,
            configurable: true
          });
        }
        routes.unshift(r2);
      }
      if (this.restSlugName !== null) {
        routes.push(...this.children.get("[...]")._smoosh(`${prefix}[...${this.restSlugName}]/`));
      }
      if (this.optionalRestSlugName !== null) {
        routes.push(...this.children.get("[[...]]")._smoosh(`${prefix}[[...${this.optionalRestSlugName}]]/`));
      }
      return routes;
    }
    _insert(urlPaths, slugNames, isCatchAll) {
      if (urlPaths.length === 0) {
        this.placeholder = false;
        return;
      }
      if (isCatchAll) {
        throw Object.defineProperty(new Error(`Catch-all must be the last part of the URL.`), "__NEXT_ERROR_CODE", {
          value: "E392",
          enumerable: false,
          configurable: true
        });
      }
      let nextSegment = urlPaths[0];
      if (nextSegment.startsWith("[") && nextSegment.endsWith("]")) {
        let handleSlug = function(previousSlug, nextSlug) {
          if (previousSlug !== null) {
            if (previousSlug !== nextSlug) {
              throw Object.defineProperty(new Error(`You cannot use different slug names for the same dynamic path ('${previousSlug}' !== '${nextSlug}').`), "__NEXT_ERROR_CODE", {
                value: "E337",
                enumerable: false,
                configurable: true
              });
            }
          }
          slugNames.forEach((slug) => {
            if (slug === nextSlug) {
              throw Object.defineProperty(new Error(`You cannot have the same slug name "${nextSlug}" repeat within a single dynamic path`), "__NEXT_ERROR_CODE", {
                value: "E247",
                enumerable: false,
                configurable: true
              });
            }
            if (slug.replace(/\W/g, "") === nextSegment.replace(/\W/g, "")) {
              throw Object.defineProperty(new Error(`You cannot have the slug names "${slug}" and "${nextSlug}" differ only by non-word symbols within a single dynamic path`), "__NEXT_ERROR_CODE", {
                value: "E499",
                enumerable: false,
                configurable: true
              });
            }
          });
          slugNames.push(nextSlug);
        };
        let segmentName = nextSegment.slice(1, -1);
        let isOptional = false;
        if (segmentName.startsWith("[") && segmentName.endsWith("]")) {
          segmentName = segmentName.slice(1, -1);
          isOptional = true;
        }
        if (segmentName.startsWith("…")) {
          throw Object.defineProperty(new Error(`Detected a three-dot character ('…') at ('${segmentName}'). Did you mean ('...')?`), "__NEXT_ERROR_CODE", {
            value: "E147",
            enumerable: false,
            configurable: true
          });
        }
        if (segmentName.startsWith("...")) {
          segmentName = segmentName.substring(3);
          isCatchAll = true;
        }
        if (segmentName.startsWith("[") || segmentName.endsWith("]")) {
          throw Object.defineProperty(new Error(`Segment names may not start or end with extra brackets ('${segmentName}').`), "__NEXT_ERROR_CODE", {
            value: "E421",
            enumerable: false,
            configurable: true
          });
        }
        if (segmentName.startsWith(".")) {
          throw Object.defineProperty(new Error(`Segment names may not start with erroneous periods ('${segmentName}').`), "__NEXT_ERROR_CODE", {
            value: "E288",
            enumerable: false,
            configurable: true
          });
        }
        if (isCatchAll) {
          if (isOptional) {
            if (this.restSlugName != null) {
              throw Object.defineProperty(new Error(`You cannot use both an required and optional catch-all route at the same level ("[...${this.restSlugName}]" and "${urlPaths[0]}" ).`), "__NEXT_ERROR_CODE", {
                value: "E299",
                enumerable: false,
                configurable: true
              });
            }
            handleSlug(this.optionalRestSlugName, segmentName);
            this.optionalRestSlugName = segmentName;
            nextSegment = "[[...]]";
          } else {
            if (this.optionalRestSlugName != null) {
              throw Object.defineProperty(new Error(`You cannot use both an optional and required catch-all route at the same level ("[[...${this.optionalRestSlugName}]]" and "${urlPaths[0]}").`), "__NEXT_ERROR_CODE", {
                value: "E300",
                enumerable: false,
                configurable: true
              });
            }
            handleSlug(this.restSlugName, segmentName);
            this.restSlugName = segmentName;
            nextSegment = "[...]";
          }
        } else {
          if (isOptional) {
            throw Object.defineProperty(new Error(`Optional route parameters are not yet supported ("${urlPaths[0]}").`), "__NEXT_ERROR_CODE", {
              value: "E435",
              enumerable: false,
              configurable: true
            });
          }
          handleSlug(this.slugName, segmentName);
          this.slugName = segmentName;
          nextSegment = "[]";
        }
      }
      if (!this.children.has(nextSegment)) {
        this.children.set(nextSegment, new UrlNode);
      }
      this.children.get(nextSegment)._insert(urlPaths.slice(1), slugNames, isCatchAll);
    }
    constructor() {
      this.placeholder = true;
      this.children = new Map;
      this.slugName = null;
      this.restSlugName = null;
      this.optionalRestSlugName = null;
    }
  }
  function getSortedRoutes(normalizedPages) {
    const root = new UrlNode;
    normalizedPages.forEach((pagePath) => root.insert(pagePath));
    return root.smoosh();
  }
  function getSortedRouteObjects(objects, getter) {
    const indexes = {};
    const pathnames = [];
    for (let i = 0;i < objects.length; i++) {
      const pathname = getter(objects[i]);
      indexes[pathname] = i;
      pathnames[i] = pathname;
    }
    const sorted = getSortedRoutes(pathnames);
    return sorted.map((pathname) => objects[indexes[pathname]]);
  }
});

// node_modules/next/dist/shared/lib/page-path/ensure-leading-slash.js
var require_ensure_leading_slash = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "ensureLeadingSlash", {
    enumerable: true,
    get: function() {
      return ensureLeadingSlash;
    }
  });
  function ensureLeadingSlash(path) {
    return path.startsWith("/") ? path : `/${path}`;
  }
});

// node_modules/next/dist/shared/lib/segment.js
var require_segment = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  function _export(target, all) {
    for (var name in all)
      Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
      });
  }
  _export(exports, {
    DEFAULT_SEGMENT_KEY: function() {
      return DEFAULT_SEGMENT_KEY;
    },
    NOT_FOUND_SEGMENT_KEY: function() {
      return NOT_FOUND_SEGMENT_KEY;
    },
    PAGE_SEGMENT_KEY: function() {
      return PAGE_SEGMENT_KEY;
    },
    addSearchParamsIfPageSegment: function() {
      return addSearchParamsIfPageSegment;
    },
    computeSelectedLayoutSegment: function() {
      return computeSelectedLayoutSegment;
    },
    getSegmentValue: function() {
      return getSegmentValue;
    },
    getSelectedLayoutSegmentPath: function() {
      return getSelectedLayoutSegmentPath;
    },
    isGroupSegment: function() {
      return isGroupSegment;
    },
    isParallelRouteSegment: function() {
      return isParallelRouteSegment;
    }
  });
  function getSegmentValue(segment) {
    return Array.isArray(segment) ? segment[1] : segment;
  }
  function isGroupSegment(segment) {
    return segment[0] === "(" && segment.endsWith(")");
  }
  function isParallelRouteSegment(segment) {
    return segment.startsWith("@") && segment !== "@children";
  }
  function addSearchParamsIfPageSegment(segment, searchParams) {
    const isPageSegment = segment.includes(PAGE_SEGMENT_KEY);
    if (isPageSegment) {
      const stringifiedQuery = JSON.stringify(searchParams);
      return stringifiedQuery !== "{}" ? PAGE_SEGMENT_KEY + "?" + stringifiedQuery : PAGE_SEGMENT_KEY;
    }
    return segment;
  }
  function computeSelectedLayoutSegment(segments, parallelRouteKey) {
    if (!segments || segments.length === 0) {
      return null;
    }
    const rawSegment = parallelRouteKey === "children" ? segments[0] : segments[segments.length - 1];
    return rawSegment === DEFAULT_SEGMENT_KEY ? null : rawSegment;
  }
  function getSelectedLayoutSegmentPath(tree, parallelRouteKey, first = true, segmentPath = []) {
    let node;
    if (first) {
      node = tree[1][parallelRouteKey];
    } else {
      const parallelRoutes = tree[1];
      node = parallelRoutes.children ?? Object.values(parallelRoutes)[0];
    }
    if (!node)
      return segmentPath;
    const segment = node[0];
    let segmentValue = getSegmentValue(segment);
    if (!segmentValue || segmentValue.startsWith(PAGE_SEGMENT_KEY)) {
      return segmentPath;
    }
    segmentPath.push(segmentValue);
    return getSelectedLayoutSegmentPath(node, parallelRouteKey, false, segmentPath);
  }
  var PAGE_SEGMENT_KEY = "__PAGE__";
  var DEFAULT_SEGMENT_KEY = "__DEFAULT__";
  var NOT_FOUND_SEGMENT_KEY = "/_not-found";
});

// node_modules/next/dist/shared/lib/router/utils/app-paths.js
var require_app_paths = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  function _export(target, all) {
    for (var name in all)
      Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
      });
  }
  _export(exports, {
    normalizeAppPath: function() {
      return normalizeAppPath;
    },
    normalizeRscURL: function() {
      return normalizeRscURL;
    }
  });
  var _ensureleadingslash = require_ensure_leading_slash();
  var _segment = require_segment();
  function normalizeAppPath(route) {
    return (0, _ensureleadingslash.ensureLeadingSlash)(route.split("/").reduce((pathname, segment, index, segments) => {
      if (!segment) {
        return pathname;
      }
      if ((0, _segment.isGroupSegment)(segment)) {
        return pathname;
      }
      if (segment[0] === "@") {
        return pathname;
      }
      if ((segment === "page" || segment === "route") && index === segments.length - 1) {
        return pathname;
      }
      return `${pathname}/${segment}`;
    }, ""));
  }
  function normalizeRscURL(url) {
    return url.replace(/\.rsc($|\?)/, "$1");
  }
});

// node_modules/next/dist/shared/lib/router/utils/interception-routes.js
var require_interception_routes = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  function _export(target, all) {
    for (var name in all)
      Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
      });
  }
  _export(exports, {
    INTERCEPTION_ROUTE_MARKERS: function() {
      return INTERCEPTION_ROUTE_MARKERS;
    },
    extractInterceptionRouteInformation: function() {
      return extractInterceptionRouteInformation;
    },
    isInterceptionRouteAppPath: function() {
      return isInterceptionRouteAppPath;
    }
  });
  var _apppaths = require_app_paths();
  var INTERCEPTION_ROUTE_MARKERS = [
    "(..)(..)",
    "(.)",
    "(..)",
    "(...)"
  ];
  function isInterceptionRouteAppPath(path) {
    return path.split("/").find((segment) => INTERCEPTION_ROUTE_MARKERS.find((m) => segment.startsWith(m))) !== undefined;
  }
  function extractInterceptionRouteInformation(path) {
    let interceptingRoute;
    let marker;
    let interceptedRoute;
    for (const segment of path.split("/")) {
      marker = INTERCEPTION_ROUTE_MARKERS.find((m) => segment.startsWith(m));
      if (marker) {
        [interceptingRoute, interceptedRoute] = path.split(marker, 2);
        break;
      }
    }
    if (!interceptingRoute || !marker || !interceptedRoute) {
      throw Object.defineProperty(new Error(`Invalid interception route: ${path}. Must be in the format /<intercepting route>/(..|...|..)(..)/<intercepted route>`), "__NEXT_ERROR_CODE", {
        value: "E269",
        enumerable: false,
        configurable: true
      });
    }
    interceptingRoute = (0, _apppaths.normalizeAppPath)(interceptingRoute);
    switch (marker) {
      case "(.)":
        if (interceptingRoute === "/") {
          interceptedRoute = `/${interceptedRoute}`;
        } else {
          interceptedRoute = interceptingRoute + "/" + interceptedRoute;
        }
        break;
      case "(..)":
        if (interceptingRoute === "/") {
          throw Object.defineProperty(new Error(`Invalid interception route: ${path}. Cannot use (..) marker at the root level, use (.) instead.`), "__NEXT_ERROR_CODE", {
            value: "E207",
            enumerable: false,
            configurable: true
          });
        }
        interceptedRoute = interceptingRoute.split("/").slice(0, -1).concat(interceptedRoute).join("/");
        break;
      case "(...)":
        interceptedRoute = "/" + interceptedRoute;
        break;
      case "(..)(..)":
        const splitInterceptingRoute = interceptingRoute.split("/");
        if (splitInterceptingRoute.length <= 2) {
          throw Object.defineProperty(new Error(`Invalid interception route: ${path}. Cannot use (..)(..) marker at the root level or one level up.`), "__NEXT_ERROR_CODE", {
            value: "E486",
            enumerable: false,
            configurable: true
          });
        }
        interceptedRoute = splitInterceptingRoute.slice(0, -2).concat(interceptedRoute).join("/");
        break;
      default:
        throw Object.defineProperty(new Error("Invariant: unexpected marker"), "__NEXT_ERROR_CODE", {
          value: "E112",
          enumerable: false,
          configurable: true
        });
    }
    return {
      interceptingRoute,
      interceptedRoute
    };
  }
});

// node_modules/next/dist/shared/lib/router/utils/is-dynamic.js
var require_is_dynamic = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "isDynamicRoute", {
    enumerable: true,
    get: function() {
      return isDynamicRoute;
    }
  });
  var _interceptionroutes = require_interception_routes();
  var TEST_ROUTE = /\/[^/]*\[[^/]+\][^/]*(?=\/|$)/;
  var TEST_STRICT_ROUTE = /\/\[[^/]+\](?=\/|$)/;
  function isDynamicRoute(route, strict = true) {
    if ((0, _interceptionroutes.isInterceptionRouteAppPath)(route)) {
      route = (0, _interceptionroutes.extractInterceptionRouteInformation)(route).interceptedRoute;
    }
    if (strict) {
      return TEST_STRICT_ROUTE.test(route);
    }
    return TEST_ROUTE.test(route);
  }
});

// node_modules/next/dist/shared/lib/router/utils/index.js
var require_utils2 = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  function _export(target, all) {
    for (var name in all)
      Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
      });
  }
  _export(exports, {
    getSortedRouteObjects: function() {
      return _sortedroutes.getSortedRouteObjects;
    },
    getSortedRoutes: function() {
      return _sortedroutes.getSortedRoutes;
    },
    isDynamicRoute: function() {
      return _isdynamic.isDynamicRoute;
    }
  });
  var _sortedroutes = require_sorted_routes();
  var _isdynamic = require_is_dynamic();
});

// node_modules/next/dist/compiled/path-to-regexp/index.js
var require_path_to_regexp = __commonJS((exports, module) => {
  var __dirname = "/Users/ernesto/Documents/programacion/hackatones/sigma-gptadvisor/node_modules/next/dist/compiled/path-to-regexp";
  (() => {
    if (typeof __nccwpck_require__ !== "undefined")
      __nccwpck_require__.ab = __dirname + "/";
    var e = {};
    (() => {
      var n = e;
      Object.defineProperty(n, "__esModule", { value: true });
      n.pathToRegexp = n.tokensToRegexp = n.regexpToFunction = n.match = n.tokensToFunction = n.compile = n.parse = undefined;
      function lexer(e2) {
        var n2 = [];
        var r2 = 0;
        while (r2 < e2.length) {
          var t = e2[r2];
          if (t === "*" || t === "+" || t === "?") {
            n2.push({ type: "MODIFIER", index: r2, value: e2[r2++] });
            continue;
          }
          if (t === "\\") {
            n2.push({ type: "ESCAPED_CHAR", index: r2++, value: e2[r2++] });
            continue;
          }
          if (t === "{") {
            n2.push({ type: "OPEN", index: r2, value: e2[r2++] });
            continue;
          }
          if (t === "}") {
            n2.push({ type: "CLOSE", index: r2, value: e2[r2++] });
            continue;
          }
          if (t === ":") {
            var a = "";
            var i = r2 + 1;
            while (i < e2.length) {
              var o = e2.charCodeAt(i);
              if (o >= 48 && o <= 57 || o >= 65 && o <= 90 || o >= 97 && o <= 122 || o === 95) {
                a += e2[i++];
                continue;
              }
              break;
            }
            if (!a)
              throw new TypeError("Missing parameter name at ".concat(r2));
            n2.push({ type: "NAME", index: r2, value: a });
            r2 = i;
            continue;
          }
          if (t === "(") {
            var c = 1;
            var f = "";
            var i = r2 + 1;
            if (e2[i] === "?") {
              throw new TypeError('Pattern cannot start with "?" at '.concat(i));
            }
            while (i < e2.length) {
              if (e2[i] === "\\") {
                f += e2[i++] + e2[i++];
                continue;
              }
              if (e2[i] === ")") {
                c--;
                if (c === 0) {
                  i++;
                  break;
                }
              } else if (e2[i] === "(") {
                c++;
                if (e2[i + 1] !== "?") {
                  throw new TypeError("Capturing groups are not allowed at ".concat(i));
                }
              }
              f += e2[i++];
            }
            if (c)
              throw new TypeError("Unbalanced pattern at ".concat(r2));
            if (!f)
              throw new TypeError("Missing pattern at ".concat(r2));
            n2.push({ type: "PATTERN", index: r2, value: f });
            r2 = i;
            continue;
          }
          n2.push({ type: "CHAR", index: r2, value: e2[r2++] });
        }
        n2.push({ type: "END", index: r2, value: "" });
        return n2;
      }
      function parse(e2, n2) {
        if (n2 === undefined) {
          n2 = {};
        }
        var r2 = lexer(e2);
        var t = n2.prefixes, a = t === undefined ? "./" : t, i = n2.delimiter, o = i === undefined ? "/#?" : i;
        var c = [];
        var f = 0;
        var u = 0;
        var p = "";
        var tryConsume = function(e3) {
          if (u < r2.length && r2[u].type === e3)
            return r2[u++].value;
        };
        var mustConsume = function(e3) {
          var n3 = tryConsume(e3);
          if (n3 !== undefined)
            return n3;
          var t2 = r2[u], a2 = t2.type, i2 = t2.index;
          throw new TypeError("Unexpected ".concat(a2, " at ").concat(i2, ", expected ").concat(e3));
        };
        var consumeText = function() {
          var e3 = "";
          var n3;
          while (n3 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
            e3 += n3;
          }
          return e3;
        };
        var isSafe = function(e3) {
          for (var n3 = 0, r3 = o;n3 < r3.length; n3++) {
            var t2 = r3[n3];
            if (e3.indexOf(t2) > -1)
              return true;
          }
          return false;
        };
        var safePattern = function(e3) {
          var n3 = c[c.length - 1];
          var r3 = e3 || (n3 && typeof n3 === "string" ? n3 : "");
          if (n3 && !r3) {
            throw new TypeError('Must have text between two parameters, missing text after "'.concat(n3.name, '"'));
          }
          if (!r3 || isSafe(r3))
            return "[^".concat(escapeString(o), "]+?");
          return "(?:(?!".concat(escapeString(r3), ")[^").concat(escapeString(o), "])+?");
        };
        while (u < r2.length) {
          var v = tryConsume("CHAR");
          var s = tryConsume("NAME");
          var d = tryConsume("PATTERN");
          if (s || d) {
            var g = v || "";
            if (a.indexOf(g) === -1) {
              p += g;
              g = "";
            }
            if (p) {
              c.push(p);
              p = "";
            }
            c.push({ name: s || f++, prefix: g, suffix: "", pattern: d || safePattern(g), modifier: tryConsume("MODIFIER") || "" });
            continue;
          }
          var x = v || tryConsume("ESCAPED_CHAR");
          if (x) {
            p += x;
            continue;
          }
          if (p) {
            c.push(p);
            p = "";
          }
          var h = tryConsume("OPEN");
          if (h) {
            var g = consumeText();
            var l = tryConsume("NAME") || "";
            var m = tryConsume("PATTERN") || "";
            var T = consumeText();
            mustConsume("CLOSE");
            c.push({ name: l || (m ? f++ : ""), pattern: l && !m ? safePattern(g) : m, prefix: g, suffix: T, modifier: tryConsume("MODIFIER") || "" });
            continue;
          }
          mustConsume("END");
        }
        return c;
      }
      n.parse = parse;
      function compile(e2, n2) {
        return tokensToFunction(parse(e2, n2), n2);
      }
      n.compile = compile;
      function tokensToFunction(e2, n2) {
        if (n2 === undefined) {
          n2 = {};
        }
        var r2 = flags(n2);
        var t = n2.encode, a = t === undefined ? function(e3) {
          return e3;
        } : t, i = n2.validate, o = i === undefined ? true : i;
        var c = e2.map(function(e3) {
          if (typeof e3 === "object") {
            return new RegExp("^(?:".concat(e3.pattern, ")$"), r2);
          }
        });
        return function(n3) {
          var r3 = "";
          for (var t2 = 0;t2 < e2.length; t2++) {
            var i2 = e2[t2];
            if (typeof i2 === "string") {
              r3 += i2;
              continue;
            }
            var f = n3 ? n3[i2.name] : undefined;
            var u = i2.modifier === "?" || i2.modifier === "*";
            var p = i2.modifier === "*" || i2.modifier === "+";
            if (Array.isArray(f)) {
              if (!p) {
                throw new TypeError('Expected "'.concat(i2.name, '" to not repeat, but got an array'));
              }
              if (f.length === 0) {
                if (u)
                  continue;
                throw new TypeError('Expected "'.concat(i2.name, '" to not be empty'));
              }
              for (var v = 0;v < f.length; v++) {
                var s = a(f[v], i2);
                if (o && !c[t2].test(s)) {
                  throw new TypeError('Expected all "'.concat(i2.name, '" to match "').concat(i2.pattern, '", but got "').concat(s, '"'));
                }
                r3 += i2.prefix + s + i2.suffix;
              }
              continue;
            }
            if (typeof f === "string" || typeof f === "number") {
              var s = a(String(f), i2);
              if (o && !c[t2].test(s)) {
                throw new TypeError('Expected "'.concat(i2.name, '" to match "').concat(i2.pattern, '", but got "').concat(s, '"'));
              }
              r3 += i2.prefix + s + i2.suffix;
              continue;
            }
            if (u)
              continue;
            var d = p ? "an array" : "a string";
            throw new TypeError('Expected "'.concat(i2.name, '" to be ').concat(d));
          }
          return r3;
        };
      }
      n.tokensToFunction = tokensToFunction;
      function match(e2, n2) {
        var r2 = [];
        var t = pathToRegexp(e2, r2, n2);
        return regexpToFunction(t, r2, n2);
      }
      n.match = match;
      function regexpToFunction(e2, n2, r2) {
        if (r2 === undefined) {
          r2 = {};
        }
        var t = r2.decode, a = t === undefined ? function(e3) {
          return e3;
        } : t;
        return function(r3) {
          var t2 = e2.exec(r3);
          if (!t2)
            return false;
          var i = t2[0], o = t2.index;
          var c = Object.create(null);
          var _loop_1 = function(e3) {
            if (t2[e3] === undefined)
              return "continue";
            var r4 = n2[e3 - 1];
            if (r4.modifier === "*" || r4.modifier === "+") {
              c[r4.name] = t2[e3].split(r4.prefix + r4.suffix).map(function(e4) {
                return a(e4, r4);
              });
            } else {
              c[r4.name] = a(t2[e3], r4);
            }
          };
          for (var f = 1;f < t2.length; f++) {
            _loop_1(f);
          }
          return { path: i, index: o, params: c };
        };
      }
      n.regexpToFunction = regexpToFunction;
      function escapeString(e2) {
        return e2.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
      }
      function flags(e2) {
        return e2 && e2.sensitive ? "" : "i";
      }
      function regexpToRegexp(e2, n2) {
        if (!n2)
          return e2;
        var r2 = /\((?:\?<(.*?)>)?(?!\?)/g;
        var t = 0;
        var a = r2.exec(e2.source);
        while (a) {
          n2.push({ name: a[1] || t++, prefix: "", suffix: "", modifier: "", pattern: "" });
          a = r2.exec(e2.source);
        }
        return e2;
      }
      function arrayToRegexp(e2, n2, r2) {
        var t = e2.map(function(e3) {
          return pathToRegexp(e3, n2, r2).source;
        });
        return new RegExp("(?:".concat(t.join("|"), ")"), flags(r2));
      }
      function stringToRegexp(e2, n2, r2) {
        return tokensToRegexp(parse(e2, r2), n2, r2);
      }
      function tokensToRegexp(e2, n2, r2) {
        if (r2 === undefined) {
          r2 = {};
        }
        var t = r2.strict, a = t === undefined ? false : t, i = r2.start, o = i === undefined ? true : i, c = r2.end, f = c === undefined ? true : c, u = r2.encode, p = u === undefined ? function(e3) {
          return e3;
        } : u, v = r2.delimiter, s = v === undefined ? "/#?" : v, d = r2.endsWith, g = d === undefined ? "" : d;
        var x = "[".concat(escapeString(g), "]|$");
        var h = "[".concat(escapeString(s), "]");
        var l = o ? "^" : "";
        for (var m = 0, T = e2;m < T.length; m++) {
          var E = T[m];
          if (typeof E === "string") {
            l += escapeString(p(E));
          } else {
            var w = escapeString(p(E.prefix));
            var y = escapeString(p(E.suffix));
            if (E.pattern) {
              if (n2)
                n2.push(E);
              if (w || y) {
                if (E.modifier === "+" || E.modifier === "*") {
                  var R = E.modifier === "*" ? "?" : "";
                  l += "(?:".concat(w, "((?:").concat(E.pattern, ")(?:").concat(y).concat(w, "(?:").concat(E.pattern, "))*)").concat(y, ")").concat(R);
                } else {
                  l += "(?:".concat(w, "(").concat(E.pattern, ")").concat(y, ")").concat(E.modifier);
                }
              } else {
                if (E.modifier === "+" || E.modifier === "*") {
                  throw new TypeError('Can not repeat "'.concat(E.name, '" without a prefix and suffix'));
                }
                l += "(".concat(E.pattern, ")").concat(E.modifier);
              }
            } else {
              l += "(?:".concat(w).concat(y, ")").concat(E.modifier);
            }
          }
        }
        if (f) {
          if (!a)
            l += "".concat(h, "?");
          l += !r2.endsWith ? "$" : "(?=".concat(x, ")");
        } else {
          var A = e2[e2.length - 1];
          var _ = typeof A === "string" ? h.indexOf(A[A.length - 1]) > -1 : A === undefined;
          if (!a) {
            l += "(?:".concat(h, "(?=").concat(x, "))?");
          }
          if (!_) {
            l += "(?=".concat(h, "|").concat(x, ")");
          }
        }
        return new RegExp(l, flags(r2));
      }
      n.tokensToRegexp = tokensToRegexp;
      function pathToRegexp(e2, n2, r2) {
        if (e2 instanceof RegExp)
          return regexpToRegexp(e2, n2);
        if (Array.isArray(e2))
          return arrayToRegexp(e2, n2, r2);
        return stringToRegexp(e2, n2, r2);
      }
      n.pathToRegexp = pathToRegexp;
    })();
    module.exports = e;
  })();
});

// node_modules/next/dist/lib/route-pattern-normalizer.js
var require_route_pattern_normalizer = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  function _export(target, all) {
    for (var name in all)
      Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
      });
  }
  _export(exports, {
    PARAM_SEPARATOR: function() {
      return PARAM_SEPARATOR;
    },
    hasAdjacentParameterIssues: function() {
      return hasAdjacentParameterIssues;
    },
    normalizeAdjacentParameters: function() {
      return normalizeAdjacentParameters;
    },
    normalizeTokensForRegexp: function() {
      return normalizeTokensForRegexp;
    },
    stripNormalizedSeparators: function() {
      return stripNormalizedSeparators;
    },
    stripParameterSeparators: function() {
      return stripParameterSeparators;
    }
  });
  var PARAM_SEPARATOR = "_NEXTSEP_";
  function hasAdjacentParameterIssues(route) {
    if (typeof route !== "string")
      return false;
    if (/\/\(\.{1,3}\):[^/\s]+/.test(route)) {
      return true;
    }
    if (/:[a-zA-Z_][a-zA-Z0-9_]*:[a-zA-Z_][a-zA-Z0-9_]*/.test(route)) {
      return true;
    }
    return false;
  }
  function normalizeAdjacentParameters(route) {
    let normalized = route;
    normalized = normalized.replace(/(\([^)]*\)):([^/\s]+)/g, `$1${PARAM_SEPARATOR}:$2`);
    normalized = normalized.replace(/:([^:/\s)]+)(?=:)/g, `:$1${PARAM_SEPARATOR}`);
    return normalized;
  }
  function normalizeTokensForRegexp(tokens) {
    return tokens.map((token) => {
      if (typeof token === "object" && token !== null && "modifier" in token && (token.modifier === "*" || token.modifier === "+") && "prefix" in token && "suffix" in token && token.prefix === "" && token.suffix === "") {
        return {
          ...token,
          prefix: "/"
        };
      }
      return token;
    });
  }
  function stripNormalizedSeparators(pathname) {
    return pathname.replace(new RegExp(`\\)${PARAM_SEPARATOR}`, "g"), ")");
  }
  function stripParameterSeparators(params) {
    const cleaned = {};
    for (const [key, value] of Object.entries(params)) {
      if (typeof value === "string") {
        cleaned[key] = value.replace(new RegExp(`^${PARAM_SEPARATOR}`), "");
      } else if (Array.isArray(value)) {
        cleaned[key] = value.map((item) => typeof item === "string" ? item.replace(new RegExp(`^${PARAM_SEPARATOR}`), "") : item);
      } else {
        cleaned[key] = value;
      }
    }
    return cleaned;
  }
});

// node_modules/next/dist/shared/lib/router/utils/route-match-utils.js
var require_route_match_utils = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  function _export(target, all) {
    for (var name in all)
      Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
      });
  }
  _export(exports, {
    safeCompile: function() {
      return safeCompile;
    },
    safePathToRegexp: function() {
      return safePathToRegexp;
    },
    safeRegexpToFunction: function() {
      return safeRegexpToFunction;
    },
    safeRouteMatcher: function() {
      return safeRouteMatcher;
    }
  });
  var _pathtoregexp = require_path_to_regexp();
  var _routepatternnormalizer = require_route_pattern_normalizer();
  function safePathToRegexp(route, keys, options) {
    if (typeof route !== "string") {
      return (0, _pathtoregexp.pathToRegexp)(route, keys, options);
    }
    const needsNormalization = (0, _routepatternnormalizer.hasAdjacentParameterIssues)(route);
    const routeToUse = needsNormalization ? (0, _routepatternnormalizer.normalizeAdjacentParameters)(route) : route;
    try {
      return (0, _pathtoregexp.pathToRegexp)(routeToUse, keys, options);
    } catch (error) {
      if (!needsNormalization) {
        try {
          const normalizedRoute = (0, _routepatternnormalizer.normalizeAdjacentParameters)(route);
          return (0, _pathtoregexp.pathToRegexp)(normalizedRoute, keys, options);
        } catch (retryError) {
          throw error;
        }
      }
      throw error;
    }
  }
  function safeCompile(route, options) {
    const needsNormalization = (0, _routepatternnormalizer.hasAdjacentParameterIssues)(route);
    const routeToUse = needsNormalization ? (0, _routepatternnormalizer.normalizeAdjacentParameters)(route) : route;
    try {
      const compiler = (0, _pathtoregexp.compile)(routeToUse, options);
      if (needsNormalization) {
        return (params) => {
          return (0, _routepatternnormalizer.stripNormalizedSeparators)(compiler(params));
        };
      }
      return compiler;
    } catch (error) {
      if (!needsNormalization) {
        try {
          const normalizedRoute = (0, _routepatternnormalizer.normalizeAdjacentParameters)(route);
          const compiler = (0, _pathtoregexp.compile)(normalizedRoute, options);
          return (params) => {
            return (0, _routepatternnormalizer.stripNormalizedSeparators)(compiler(params));
          };
        } catch (retryError) {
          throw error;
        }
      }
      throw error;
    }
  }
  function safeRegexpToFunction(regexp, keys) {
    const originalMatcher = (0, _pathtoregexp.regexpToFunction)(regexp, keys || []);
    return (pathname) => {
      const result = originalMatcher(pathname);
      if (!result)
        return false;
      return {
        ...result,
        params: (0, _routepatternnormalizer.stripParameterSeparators)(result.params)
      };
    };
  }
  function safeRouteMatcher(matcherFn) {
    return (pathname) => {
      const result = matcherFn(pathname);
      if (!result)
        return false;
      return (0, _routepatternnormalizer.stripParameterSeparators)(result);
    };
  }
});

// node_modules/next/dist/shared/lib/router/utils/route-matcher.js
var require_route_matcher = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "getRouteMatcher", {
    enumerable: true,
    get: function() {
      return getRouteMatcher;
    }
  });
  var _utils = require_utils();
  var _routematchutils = require_route_match_utils();
  function getRouteMatcher({ re, groups }) {
    const rawMatcher = (pathname) => {
      const routeMatch = re.exec(pathname);
      if (!routeMatch)
        return false;
      const decode = (param) => {
        try {
          return decodeURIComponent(param);
        } catch {
          throw Object.defineProperty(new _utils.DecodeError("failed to decode param"), "__NEXT_ERROR_CODE", {
            value: "E528",
            enumerable: false,
            configurable: true
          });
        }
      };
      const params = {};
      for (const [key, group] of Object.entries(groups)) {
        const match = routeMatch[group.pos];
        if (match !== undefined) {
          if (group.repeat) {
            params[key] = match.split("/").map((entry) => decode(entry));
          } else {
            params[key] = decode(match);
          }
        }
      }
      return params;
    };
    return (0, _routematchutils.safeRouteMatcher)(rawMatcher);
  }
});

// node_modules/next/dist/lib/constants.js
var require_constants = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  function _export(target, all) {
    for (var name in all)
      Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
      });
  }
  _export(exports, {
    ACTION_SUFFIX: function() {
      return ACTION_SUFFIX;
    },
    APP_DIR_ALIAS: function() {
      return APP_DIR_ALIAS;
    },
    CACHE_ONE_YEAR: function() {
      return CACHE_ONE_YEAR;
    },
    DOT_NEXT_ALIAS: function() {
      return DOT_NEXT_ALIAS;
    },
    ESLINT_DEFAULT_DIRS: function() {
      return ESLINT_DEFAULT_DIRS;
    },
    GSP_NO_RETURNED_VALUE: function() {
      return GSP_NO_RETURNED_VALUE;
    },
    GSSP_COMPONENT_MEMBER_ERROR: function() {
      return GSSP_COMPONENT_MEMBER_ERROR;
    },
    GSSP_NO_RETURNED_VALUE: function() {
      return GSSP_NO_RETURNED_VALUE;
    },
    HTML_CONTENT_TYPE_HEADER: function() {
      return HTML_CONTENT_TYPE_HEADER;
    },
    INFINITE_CACHE: function() {
      return INFINITE_CACHE;
    },
    INSTRUMENTATION_HOOK_FILENAME: function() {
      return INSTRUMENTATION_HOOK_FILENAME;
    },
    JSON_CONTENT_TYPE_HEADER: function() {
      return JSON_CONTENT_TYPE_HEADER;
    },
    MATCHED_PATH_HEADER: function() {
      return MATCHED_PATH_HEADER;
    },
    MIDDLEWARE_FILENAME: function() {
      return MIDDLEWARE_FILENAME;
    },
    MIDDLEWARE_LOCATION_REGEXP: function() {
      return MIDDLEWARE_LOCATION_REGEXP;
    },
    NEXT_BODY_SUFFIX: function() {
      return NEXT_BODY_SUFFIX;
    },
    NEXT_CACHE_IMPLICIT_TAG_ID: function() {
      return NEXT_CACHE_IMPLICIT_TAG_ID;
    },
    NEXT_CACHE_REVALIDATED_TAGS_HEADER: function() {
      return NEXT_CACHE_REVALIDATED_TAGS_HEADER;
    },
    NEXT_CACHE_REVALIDATE_TAG_TOKEN_HEADER: function() {
      return NEXT_CACHE_REVALIDATE_TAG_TOKEN_HEADER;
    },
    NEXT_CACHE_SOFT_TAG_MAX_LENGTH: function() {
      return NEXT_CACHE_SOFT_TAG_MAX_LENGTH;
    },
    NEXT_CACHE_TAGS_HEADER: function() {
      return NEXT_CACHE_TAGS_HEADER;
    },
    NEXT_CACHE_TAG_MAX_ITEMS: function() {
      return NEXT_CACHE_TAG_MAX_ITEMS;
    },
    NEXT_CACHE_TAG_MAX_LENGTH: function() {
      return NEXT_CACHE_TAG_MAX_LENGTH;
    },
    NEXT_DATA_SUFFIX: function() {
      return NEXT_DATA_SUFFIX;
    },
    NEXT_INTERCEPTION_MARKER_PREFIX: function() {
      return NEXT_INTERCEPTION_MARKER_PREFIX;
    },
    NEXT_META_SUFFIX: function() {
      return NEXT_META_SUFFIX;
    },
    NEXT_QUERY_PARAM_PREFIX: function() {
      return NEXT_QUERY_PARAM_PREFIX;
    },
    NEXT_RESUME_HEADER: function() {
      return NEXT_RESUME_HEADER;
    },
    NON_STANDARD_NODE_ENV: function() {
      return NON_STANDARD_NODE_ENV;
    },
    PAGES_DIR_ALIAS: function() {
      return PAGES_DIR_ALIAS;
    },
    PRERENDER_REVALIDATE_HEADER: function() {
      return PRERENDER_REVALIDATE_HEADER;
    },
    PRERENDER_REVALIDATE_ONLY_GENERATED_HEADER: function() {
      return PRERENDER_REVALIDATE_ONLY_GENERATED_HEADER;
    },
    PROXY_FILENAME: function() {
      return PROXY_FILENAME;
    },
    PROXY_LOCATION_REGEXP: function() {
      return PROXY_LOCATION_REGEXP;
    },
    PUBLIC_DIR_MIDDLEWARE_CONFLICT: function() {
      return PUBLIC_DIR_MIDDLEWARE_CONFLICT;
    },
    ROOT_DIR_ALIAS: function() {
      return ROOT_DIR_ALIAS;
    },
    RSC_ACTION_CLIENT_WRAPPER_ALIAS: function() {
      return RSC_ACTION_CLIENT_WRAPPER_ALIAS;
    },
    RSC_ACTION_ENCRYPTION_ALIAS: function() {
      return RSC_ACTION_ENCRYPTION_ALIAS;
    },
    RSC_ACTION_PROXY_ALIAS: function() {
      return RSC_ACTION_PROXY_ALIAS;
    },
    RSC_ACTION_VALIDATE_ALIAS: function() {
      return RSC_ACTION_VALIDATE_ALIAS;
    },
    RSC_CACHE_WRAPPER_ALIAS: function() {
      return RSC_CACHE_WRAPPER_ALIAS;
    },
    RSC_DYNAMIC_IMPORT_WRAPPER_ALIAS: function() {
      return RSC_DYNAMIC_IMPORT_WRAPPER_ALIAS;
    },
    RSC_MOD_REF_PROXY_ALIAS: function() {
      return RSC_MOD_REF_PROXY_ALIAS;
    },
    RSC_SEGMENTS_DIR_SUFFIX: function() {
      return RSC_SEGMENTS_DIR_SUFFIX;
    },
    RSC_SEGMENT_SUFFIX: function() {
      return RSC_SEGMENT_SUFFIX;
    },
    RSC_SUFFIX: function() {
      return RSC_SUFFIX;
    },
    SERVER_PROPS_EXPORT_ERROR: function() {
      return SERVER_PROPS_EXPORT_ERROR;
    },
    SERVER_PROPS_GET_INIT_PROPS_CONFLICT: function() {
      return SERVER_PROPS_GET_INIT_PROPS_CONFLICT;
    },
    SERVER_PROPS_SSG_CONFLICT: function() {
      return SERVER_PROPS_SSG_CONFLICT;
    },
    SERVER_RUNTIME: function() {
      return SERVER_RUNTIME;
    },
    SSG_FALLBACK_EXPORT_ERROR: function() {
      return SSG_FALLBACK_EXPORT_ERROR;
    },
    SSG_GET_INITIAL_PROPS_CONFLICT: function() {
      return SSG_GET_INITIAL_PROPS_CONFLICT;
    },
    STATIC_STATUS_PAGE_GET_INITIAL_PROPS_ERROR: function() {
      return STATIC_STATUS_PAGE_GET_INITIAL_PROPS_ERROR;
    },
    TEXT_PLAIN_CONTENT_TYPE_HEADER: function() {
      return TEXT_PLAIN_CONTENT_TYPE_HEADER;
    },
    UNSTABLE_REVALIDATE_RENAME_ERROR: function() {
      return UNSTABLE_REVALIDATE_RENAME_ERROR;
    },
    WEBPACK_LAYERS: function() {
      return WEBPACK_LAYERS;
    },
    WEBPACK_RESOURCE_QUERIES: function() {
      return WEBPACK_RESOURCE_QUERIES;
    },
    WEB_SOCKET_MAX_RECONNECTIONS: function() {
      return WEB_SOCKET_MAX_RECONNECTIONS;
    }
  });
  var TEXT_PLAIN_CONTENT_TYPE_HEADER = "text/plain";
  var HTML_CONTENT_TYPE_HEADER = "text/html; charset=utf-8";
  var JSON_CONTENT_TYPE_HEADER = "application/json; charset=utf-8";
  var NEXT_QUERY_PARAM_PREFIX = "nxtP";
  var NEXT_INTERCEPTION_MARKER_PREFIX = "nxtI";
  var MATCHED_PATH_HEADER = "x-matched-path";
  var PRERENDER_REVALIDATE_HEADER = "x-prerender-revalidate";
  var PRERENDER_REVALIDATE_ONLY_GENERATED_HEADER = "x-prerender-revalidate-if-generated";
  var RSC_SEGMENTS_DIR_SUFFIX = ".segments";
  var RSC_SEGMENT_SUFFIX = ".segment.rsc";
  var RSC_SUFFIX = ".rsc";
  var ACTION_SUFFIX = ".action";
  var NEXT_DATA_SUFFIX = ".json";
  var NEXT_META_SUFFIX = ".meta";
  var NEXT_BODY_SUFFIX = ".body";
  var NEXT_CACHE_TAGS_HEADER = "x-next-cache-tags";
  var NEXT_CACHE_REVALIDATED_TAGS_HEADER = "x-next-revalidated-tags";
  var NEXT_CACHE_REVALIDATE_TAG_TOKEN_HEADER = "x-next-revalidate-tag-token";
  var NEXT_RESUME_HEADER = "next-resume";
  var NEXT_CACHE_TAG_MAX_ITEMS = 128;
  var NEXT_CACHE_TAG_MAX_LENGTH = 256;
  var NEXT_CACHE_SOFT_TAG_MAX_LENGTH = 1024;
  var NEXT_CACHE_IMPLICIT_TAG_ID = "_N_T_";
  var CACHE_ONE_YEAR = 31536000;
  var INFINITE_CACHE = 4294967294;
  var MIDDLEWARE_FILENAME = "middleware";
  var MIDDLEWARE_LOCATION_REGEXP = `(?:src/)?${MIDDLEWARE_FILENAME}`;
  var PROXY_FILENAME = "proxy";
  var PROXY_LOCATION_REGEXP = `(?:src/)?${PROXY_FILENAME}`;
  var INSTRUMENTATION_HOOK_FILENAME = "instrumentation";
  var PAGES_DIR_ALIAS = "private-next-pages";
  var DOT_NEXT_ALIAS = "private-dot-next";
  var ROOT_DIR_ALIAS = "private-next-root-dir";
  var APP_DIR_ALIAS = "private-next-app-dir";
  var RSC_MOD_REF_PROXY_ALIAS = "private-next-rsc-mod-ref-proxy";
  var RSC_ACTION_VALIDATE_ALIAS = "private-next-rsc-action-validate";
  var RSC_ACTION_PROXY_ALIAS = "private-next-rsc-server-reference";
  var RSC_CACHE_WRAPPER_ALIAS = "private-next-rsc-cache-wrapper";
  var RSC_DYNAMIC_IMPORT_WRAPPER_ALIAS = "private-next-rsc-track-dynamic-import";
  var RSC_ACTION_ENCRYPTION_ALIAS = "private-next-rsc-action-encryption";
  var RSC_ACTION_CLIENT_WRAPPER_ALIAS = "private-next-rsc-action-client-wrapper";
  var PUBLIC_DIR_MIDDLEWARE_CONFLICT = `You can not have a '_next' folder inside of your public folder. This conflicts with the internal '/_next' route. https://nextjs.org/docs/messages/public-next-folder-conflict`;
  var SSG_GET_INITIAL_PROPS_CONFLICT = `You can not use getInitialProps with getStaticProps. To use SSG, please remove your getInitialProps`;
  var SERVER_PROPS_GET_INIT_PROPS_CONFLICT = `You can not use getInitialProps with getServerSideProps. Please remove getInitialProps.`;
  var SERVER_PROPS_SSG_CONFLICT = `You can not use getStaticProps or getStaticPaths with getServerSideProps. To use SSG, please remove getServerSideProps`;
  var STATIC_STATUS_PAGE_GET_INITIAL_PROPS_ERROR = `can not have getInitialProps/getServerSideProps, https://nextjs.org/docs/messages/404-get-initial-props`;
  var SERVER_PROPS_EXPORT_ERROR = `pages with \`getServerSideProps\` can not be exported. See more info here: https://nextjs.org/docs/messages/gssp-export`;
  var GSP_NO_RETURNED_VALUE = "Your `getStaticProps` function did not return an object. Did you forget to add a `return`?";
  var GSSP_NO_RETURNED_VALUE = "Your `getServerSideProps` function did not return an object. Did you forget to add a `return`?";
  var UNSTABLE_REVALIDATE_RENAME_ERROR = "The `unstable_revalidate` property is available for general use.\n" + "Please use `revalidate` instead.";
  var GSSP_COMPONENT_MEMBER_ERROR = `can not be attached to a page's component and must be exported from the page. See more info here: https://nextjs.org/docs/messages/gssp-component-member`;
  var NON_STANDARD_NODE_ENV = `You are using a non-standard "NODE_ENV" value in your environment. This creates inconsistencies in the project and is strongly advised against. Read more: https://nextjs.org/docs/messages/non-standard-node-env`;
  var SSG_FALLBACK_EXPORT_ERROR = `Pages with \`fallback\` enabled in \`getStaticPaths\` can not be exported. See more info here: https://nextjs.org/docs/messages/ssg-fallback-true-export`;
  var ESLINT_DEFAULT_DIRS = [
    "app",
    "pages",
    "components",
    "lib",
    "src"
  ];
  var SERVER_RUNTIME = {
    edge: "edge",
    experimentalEdge: "experimental-edge",
    nodejs: "nodejs"
  };
  var WEB_SOCKET_MAX_RECONNECTIONS = 12;
  var WEBPACK_LAYERS_NAMES = {
    shared: "shared",
    reactServerComponents: "rsc",
    serverSideRendering: "ssr",
    actionBrowser: "action-browser",
    apiNode: "api-node",
    apiEdge: "api-edge",
    middleware: "middleware",
    instrument: "instrument",
    edgeAsset: "edge-asset",
    appPagesBrowser: "app-pages-browser",
    pagesDirBrowser: "pages-dir-browser",
    pagesDirEdge: "pages-dir-edge",
    pagesDirNode: "pages-dir-node"
  };
  var WEBPACK_LAYERS = {
    ...WEBPACK_LAYERS_NAMES,
    GROUP: {
      builtinReact: [
        WEBPACK_LAYERS_NAMES.reactServerComponents,
        WEBPACK_LAYERS_NAMES.actionBrowser
      ],
      serverOnly: [
        WEBPACK_LAYERS_NAMES.reactServerComponents,
        WEBPACK_LAYERS_NAMES.actionBrowser,
        WEBPACK_LAYERS_NAMES.instrument,
        WEBPACK_LAYERS_NAMES.middleware
      ],
      neutralTarget: [
        WEBPACK_LAYERS_NAMES.apiNode,
        WEBPACK_LAYERS_NAMES.apiEdge
      ],
      clientOnly: [
        WEBPACK_LAYERS_NAMES.serverSideRendering,
        WEBPACK_LAYERS_NAMES.appPagesBrowser
      ],
      bundled: [
        WEBPACK_LAYERS_NAMES.reactServerComponents,
        WEBPACK_LAYERS_NAMES.actionBrowser,
        WEBPACK_LAYERS_NAMES.serverSideRendering,
        WEBPACK_LAYERS_NAMES.appPagesBrowser,
        WEBPACK_LAYERS_NAMES.shared,
        WEBPACK_LAYERS_NAMES.instrument,
        WEBPACK_LAYERS_NAMES.middleware
      ],
      appPages: [
        WEBPACK_LAYERS_NAMES.reactServerComponents,
        WEBPACK_LAYERS_NAMES.serverSideRendering,
        WEBPACK_LAYERS_NAMES.appPagesBrowser,
        WEBPACK_LAYERS_NAMES.actionBrowser
      ]
    }
  };
  var WEBPACK_RESOURCE_QUERIES = {
    edgeSSREntry: "__next_edge_ssr_entry__",
    metadata: "__next_metadata__",
    metadataRoute: "__next_metadata_route__",
    metadataImageMeta: "__next_metadata_image_meta__"
  };
});

// node_modules/next/dist/shared/lib/escape-regexp.js
var require_escape_regexp = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "escapeStringRegexp", {
    enumerable: true,
    get: function() {
      return escapeStringRegexp;
    }
  });
  var reHasRegExp = /[|\\{}()[\]^$+*?.-]/;
  var reReplaceRegExp = /[|\\{}()[\]^$+*?.-]/g;
  function escapeStringRegexp(str) {
    if (reHasRegExp.test(str)) {
      return str.replace(reReplaceRegExp, "\\$&");
    }
    return str;
  }
});

// node_modules/next/dist/shared/lib/invariant-error.js
var require_invariant_error = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "InvariantError", {
    enumerable: true,
    get: function() {
      return InvariantError;
    }
  });

  class InvariantError extends Error {
    constructor(message, options) {
      super(`Invariant: ${message.endsWith(".") ? message : message + "."} This is a bug in Next.js.`, options);
      this.name = "InvariantError";
    }
  }
});

// node_modules/next/dist/shared/lib/router/utils/parse-loader-tree.js
var require_parse_loader_tree = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "parseLoaderTree", {
    enumerable: true,
    get: function() {
      return parseLoaderTree;
    }
  });
  var _segment = require_segment();
  function parseLoaderTree(tree) {
    const [segment, parallelRoutes, modules] = tree;
    const { layout, template } = modules;
    let { page } = modules;
    page = segment === _segment.DEFAULT_SEGMENT_KEY ? modules.defaultPage : page;
    const conventionPath = layout?.[1] || template?.[1] || page?.[1];
    return {
      page,
      segment,
      modules,
      conventionPath,
      parallelRoutes
    };
  }
});

// node_modules/next/dist/shared/lib/router/utils/get-segment-param.js
var require_get_segment_param = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  function _export(target, all) {
    for (var name in all)
      Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
      });
  }
  _export(exports, {
    getParamProperties: function() {
      return getParamProperties;
    },
    getSegmentParam: function() {
      return getSegmentParam;
    },
    isCatchAll: function() {
      return isCatchAll;
    }
  });
  var _interceptionroutes = require_interception_routes();
  function getSegmentParam(segment) {
    const interceptionMarker = _interceptionroutes.INTERCEPTION_ROUTE_MARKERS.find((marker) => segment.startsWith(marker));
    if (interceptionMarker) {
      segment = segment.slice(interceptionMarker.length);
    }
    if (segment.startsWith("[[...") && segment.endsWith("]]")) {
      return {
        paramType: "optional-catchall",
        paramName: segment.slice(5, -2)
      };
    }
    if (segment.startsWith("[...") && segment.endsWith("]")) {
      return {
        paramType: interceptionMarker ? `catchall-intercepted-${interceptionMarker}` : "catchall",
        paramName: segment.slice(4, -1)
      };
    }
    if (segment.startsWith("[") && segment.endsWith("]")) {
      return {
        paramType: interceptionMarker ? `dynamic-intercepted-${interceptionMarker}` : "dynamic",
        paramName: segment.slice(1, -1)
      };
    }
    return null;
  }
  function isCatchAll(type) {
    return type === "catchall" || type === "catchall-intercepted-(..)(..)" || type === "catchall-intercepted-(.)" || type === "catchall-intercepted-(..)" || type === "catchall-intercepted-(...)" || type === "optional-catchall";
  }
  function getParamProperties(paramType) {
    let repeat = false;
    let optional = false;
    switch (paramType) {
      case "catchall":
      case "catchall-intercepted-(..)(..)":
      case "catchall-intercepted-(.)":
      case "catchall-intercepted-(..)":
      case "catchall-intercepted-(...)":
        repeat = true;
        break;
      case "optional-catchall":
        repeat = true;
        optional = true;
        break;
      case "dynamic":
      case "dynamic-intercepted-(..)(..)":
      case "dynamic-intercepted-(.)":
      case "dynamic-intercepted-(..)":
      case "dynamic-intercepted-(...)":
        break;
      default:
    }
    return {
      repeat,
      optional
    };
  }
});

// node_modules/next/dist/shared/lib/router/routes/app.js
var require_app = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  function _export(target, all) {
    for (var name in all)
      Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
      });
  }
  _export(exports, {
    isInterceptionAppRoute: function() {
      return isInterceptionAppRoute;
    },
    isNormalizedAppRoute: function() {
      return isNormalizedAppRoute;
    },
    parseAppRoute: function() {
      return parseAppRoute;
    },
    parseAppRouteSegment: function() {
      return parseAppRouteSegment;
    }
  });
  var _invarianterror = require_invariant_error();
  var _getsegmentparam = require_get_segment_param();
  var _interceptionroutes = require_interception_routes();
  function parseAppRouteSegment(segment) {
    if (segment === "") {
      return null;
    }
    const interceptionMarker = _interceptionroutes.INTERCEPTION_ROUTE_MARKERS.find((m) => segment.startsWith(m));
    const param = (0, _getsegmentparam.getSegmentParam)(segment);
    if (param) {
      return {
        type: "dynamic",
        name: segment,
        param,
        interceptionMarker
      };
    } else if (segment.startsWith("(") && segment.endsWith(")")) {
      return {
        type: "route-group",
        name: segment,
        interceptionMarker
      };
    } else if (segment.startsWith("@")) {
      return {
        type: "parallel-route",
        name: segment,
        interceptionMarker
      };
    } else {
      return {
        type: "static",
        name: segment,
        interceptionMarker
      };
    }
  }
  function isNormalizedAppRoute(route) {
    return route.normalized;
  }
  function isInterceptionAppRoute(route) {
    return route.interceptionMarker !== undefined && route.interceptingRoute !== undefined && route.interceptedRoute !== undefined;
  }
  function parseAppRoute(pathname, normalized) {
    const pathnameSegments = pathname.split("/").filter(Boolean);
    const segments = [];
    let interceptionMarker;
    let interceptingRoute;
    let interceptedRoute;
    for (const segment of pathnameSegments) {
      const appSegment = parseAppRouteSegment(segment);
      if (!appSegment) {
        continue;
      }
      if (normalized && (appSegment.type === "route-group" || appSegment.type === "parallel-route")) {
        throw Object.defineProperty(new _invarianterror.InvariantError(`${pathname} is being parsed as a normalized route, but it has a route group or parallel route segment.`), "__NEXT_ERROR_CODE", {
          value: "E923",
          enumerable: false,
          configurable: true
        });
      }
      segments.push(appSegment);
      if (appSegment.interceptionMarker) {
        const parts = pathname.split(appSegment.interceptionMarker);
        if (parts.length !== 2) {
          throw Object.defineProperty(new Error(`Invalid interception route: ${pathname}`), "__NEXT_ERROR_CODE", {
            value: "E924",
            enumerable: false,
            configurable: true
          });
        }
        interceptingRoute = normalized ? parseAppRoute(parts[0], true) : parseAppRoute(parts[0], false);
        interceptedRoute = normalized ? parseAppRoute(parts[1], true) : parseAppRoute(parts[1], false);
        interceptionMarker = appSegment.interceptionMarker;
      }
    }
    const dynamicSegments = segments.filter((segment) => segment.type === "dynamic");
    return {
      normalized,
      pathname,
      segments,
      dynamicSegments,
      interceptionMarker,
      interceptingRoute,
      interceptedRoute
    };
  }
});

// node_modules/next/dist/shared/lib/router/utils/interception-prefix-from-param-type.js
var require_interception_prefix_from_param_type = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "interceptionPrefixFromParamType", {
    enumerable: true,
    get: function() {
      return interceptionPrefixFromParamType;
    }
  });
  function interceptionPrefixFromParamType(paramType) {
    switch (paramType) {
      case "catchall-intercepted-(..)(..)":
      case "dynamic-intercepted-(..)(..)":
        return "(..)(..)";
      case "catchall-intercepted-(.)":
      case "dynamic-intercepted-(.)":
        return "(.)";
      case "catchall-intercepted-(..)":
      case "dynamic-intercepted-(..)":
        return "(..)";
      case "catchall-intercepted-(...)":
      case "dynamic-intercepted-(...)":
        return "(...)";
      case "catchall":
      case "dynamic":
      case "optional-catchall":
      default:
        return null;
    }
  }
});

// node_modules/next/dist/shared/lib/router/utils/resolve-param-value.js
var require_resolve_param_value = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "resolveParamValue", {
    enumerable: true,
    get: function() {
      return resolveParamValue;
    }
  });
  var _invarianterror = require_invariant_error();
  var _interceptionprefixfromparamtype = require_interception_prefix_from_param_type();
  function getParamValueFromSegment(pathSegment, params, paramType) {
    if (pathSegment.type === "dynamic") {
      return params[pathSegment.param.paramName];
    }
    const interceptionPrefix = (0, _interceptionprefixfromparamtype.interceptionPrefixFromParamType)(paramType);
    if (interceptionPrefix === pathSegment.interceptionMarker) {
      return pathSegment.name.replace(pathSegment.interceptionMarker, "");
    }
    return pathSegment.name;
  }
  function resolveParamValue(paramName, paramType, depth, route, params) {
    switch (paramType) {
      case "catchall":
      case "optional-catchall":
      case "catchall-intercepted-(..)(..)":
      case "catchall-intercepted-(.)":
      case "catchall-intercepted-(..)":
      case "catchall-intercepted-(...)":
        const processedSegments = [];
        for (let index = depth;index < route.segments.length; index++) {
          const pathSegment = route.segments[index];
          if (pathSegment.type === "static") {
            let value = pathSegment.name;
            const interceptionPrefix = (0, _interceptionprefixfromparamtype.interceptionPrefixFromParamType)(paramType);
            if (interceptionPrefix && index === depth && interceptionPrefix === pathSegment.interceptionMarker) {
              value = value.replace(pathSegment.interceptionMarker, "");
            }
            processedSegments.push(value);
          } else {
            if (!params.hasOwnProperty(pathSegment.param.paramName)) {
              if (pathSegment.param.paramType === "optional-catchall") {
                break;
              }
              return;
            }
            const paramValue = params[pathSegment.param.paramName];
            if (Array.isArray(paramValue)) {
              processedSegments.push(...paramValue);
            } else {
              processedSegments.push(paramValue);
            }
          }
        }
        if (processedSegments.length > 0) {
          return processedSegments;
        } else if (paramType === "optional-catchall") {
          return;
        } else {
          throw Object.defineProperty(new _invarianterror.InvariantError(`Unexpected empty path segments match for a route "${route.pathname}" with param "${paramName}" of type "${paramType}"`), "__NEXT_ERROR_CODE", {
            value: "E931",
            enumerable: false,
            configurable: true
          });
        }
      case "dynamic":
      case "dynamic-intercepted-(..)(..)":
      case "dynamic-intercepted-(.)":
      case "dynamic-intercepted-(..)":
      case "dynamic-intercepted-(...)":
        if (depth < route.segments.length) {
          const pathSegment = route.segments[depth];
          if (pathSegment.type === "dynamic" && !params.hasOwnProperty(pathSegment.param.paramName)) {
            return;
          }
          return getParamValueFromSegment(pathSegment, params, paramType);
        }
        return;
      default:
    }
  }
});

// node_modules/next/dist/shared/lib/router/utils/get-dynamic-param.js
var require_get_dynamic_param = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  function _export(target, all) {
    for (var name in all)
      Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
      });
  }
  _export(exports, {
    PARAMETER_PATTERN: function() {
      return PARAMETER_PATTERN;
    },
    getDynamicParam: function() {
      return getDynamicParam;
    },
    interpolateParallelRouteParams: function() {
      return interpolateParallelRouteParams;
    },
    parseMatchedParameter: function() {
      return parseMatchedParameter;
    },
    parseParameter: function() {
      return parseParameter;
    }
  });
  var _invarianterror = require_invariant_error();
  var _parseloadertree = require_parse_loader_tree();
  var _app = require_app();
  var _resolveparamvalue = require_resolve_param_value();
  function getParamValue(interpolatedParams, segmentKey, fallbackRouteParams) {
    let value = interpolatedParams[segmentKey];
    if (fallbackRouteParams?.has(segmentKey)) {
      const [searchValue] = fallbackRouteParams.get(segmentKey);
      value = searchValue;
    } else if (Array.isArray(value)) {
      value = value.map((i) => encodeURIComponent(i));
    } else if (typeof value === "string") {
      value = encodeURIComponent(value);
    }
    return value;
  }
  function interpolateParallelRouteParams(loaderTree, params, pagePath, fallbackRouteParams) {
    const interpolated = structuredClone(params);
    const stack = [
      {
        tree: loaderTree,
        depth: 0
      }
    ];
    const route = (0, _app.parseAppRoute)(pagePath, true);
    while (stack.length > 0) {
      const { tree, depth } = stack.pop();
      const { segment, parallelRoutes } = (0, _parseloadertree.parseLoaderTree)(tree);
      const appSegment = (0, _app.parseAppRouteSegment)(segment);
      if (appSegment?.type === "dynamic" && !interpolated.hasOwnProperty(appSegment.param.paramName) && !fallbackRouteParams?.has(appSegment.param.paramName)) {
        const { paramName, paramType } = appSegment.param;
        const paramValue = (0, _resolveparamvalue.resolveParamValue)(paramName, paramType, depth, route, interpolated);
        if (paramValue !== undefined) {
          interpolated[paramName] = paramValue;
        } else if (paramType !== "optional-catchall") {
          throw Object.defineProperty(new _invarianterror.InvariantError(`Could not resolve param value for segment: ${paramName}`), "__NEXT_ERROR_CODE", {
            value: "E932",
            enumerable: false,
            configurable: true
          });
        }
      }
      let nextDepth = depth;
      if (appSegment && appSegment.type !== "route-group" && appSegment.type !== "parallel-route") {
        nextDepth++;
      }
      for (const parallelRoute of Object.values(parallelRoutes)) {
        stack.push({
          tree: parallelRoute,
          depth: nextDepth
        });
      }
    }
    return interpolated;
  }
  function getDynamicParam(interpolatedParams, segmentKey, dynamicParamType, fallbackRouteParams) {
    let value = getParamValue(interpolatedParams, segmentKey, fallbackRouteParams);
    if (!value || value.length === 0) {
      if (dynamicParamType === "oc") {
        return {
          param: segmentKey,
          value: null,
          type: dynamicParamType,
          treeSegment: [
            segmentKey,
            "",
            dynamicParamType
          ]
        };
      }
      throw Object.defineProperty(new _invarianterror.InvariantError(`Missing value for segment key: "${segmentKey}" with dynamic param type: ${dynamicParamType}`), "__NEXT_ERROR_CODE", {
        value: "E864",
        enumerable: false,
        configurable: true
      });
    }
    return {
      param: segmentKey,
      value,
      treeSegment: [
        segmentKey,
        Array.isArray(value) ? value.join("/") : value,
        dynamicParamType
      ],
      type: dynamicParamType
    };
  }
  var PARAMETER_PATTERN = /^([^[]*)\[((?:\[[^\]]*\])|[^\]]+)\](.*)$/;
  function parseParameter(param) {
    const match = param.match(PARAMETER_PATTERN);
    if (!match) {
      return parseMatchedParameter(param);
    }
    return parseMatchedParameter(match[2]);
  }
  function parseMatchedParameter(param) {
    const optional = param.startsWith("[") && param.endsWith("]");
    if (optional) {
      param = param.slice(1, -1);
    }
    const repeat = param.startsWith("...");
    if (repeat) {
      param = param.slice(3);
    }
    return {
      key: param,
      repeat,
      optional
    };
  }
});

// node_modules/next/dist/shared/lib/router/utils/route-regex.js
var require_route_regex = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  function _export(target, all) {
    for (var name in all)
      Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
      });
  }
  _export(exports, {
    getNamedMiddlewareRegex: function() {
      return getNamedMiddlewareRegex;
    },
    getNamedRouteRegex: function() {
      return getNamedRouteRegex;
    },
    getRouteRegex: function() {
      return getRouteRegex;
    }
  });
  var _constants = require_constants();
  var _interceptionroutes = require_interception_routes();
  var _escaperegexp = require_escape_regexp();
  var _removetrailingslash = require_remove_trailing_slash();
  var _getdynamicparam = require_get_dynamic_param();
  function getParametrizedRoute(route, includeSuffix, includePrefix) {
    const groups = {};
    let groupIndex = 1;
    const segments = [];
    for (const segment of (0, _removetrailingslash.removeTrailingSlash)(route).slice(1).split("/")) {
      const markerMatch = _interceptionroutes.INTERCEPTION_ROUTE_MARKERS.find((m) => segment.startsWith(m));
      const paramMatches = segment.match(_getdynamicparam.PARAMETER_PATTERN);
      if (markerMatch && paramMatches && paramMatches[2]) {
        const { key, optional, repeat } = (0, _getdynamicparam.parseMatchedParameter)(paramMatches[2]);
        groups[key] = {
          pos: groupIndex++,
          repeat,
          optional
        };
        segments.push(`/${(0, _escaperegexp.escapeStringRegexp)(markerMatch)}([^/]+?)`);
      } else if (paramMatches && paramMatches[2]) {
        const { key, repeat, optional } = (0, _getdynamicparam.parseMatchedParameter)(paramMatches[2]);
        groups[key] = {
          pos: groupIndex++,
          repeat,
          optional
        };
        if (includePrefix && paramMatches[1]) {
          segments.push(`/${(0, _escaperegexp.escapeStringRegexp)(paramMatches[1])}`);
        }
        let s = repeat ? optional ? "(?:/(.+?))?" : "/(.+?)" : "/([^/]+?)";
        if (includePrefix && paramMatches[1]) {
          s = s.substring(1);
        }
        segments.push(s);
      } else {
        segments.push(`/${(0, _escaperegexp.escapeStringRegexp)(segment)}`);
      }
      if (includeSuffix && paramMatches && paramMatches[3]) {
        segments.push((0, _escaperegexp.escapeStringRegexp)(paramMatches[3]));
      }
    }
    return {
      parameterizedRoute: segments.join(""),
      groups
    };
  }
  function getRouteRegex(normalizedRoute, { includeSuffix = false, includePrefix = false, excludeOptionalTrailingSlash = false } = {}) {
    const { parameterizedRoute, groups } = getParametrizedRoute(normalizedRoute, includeSuffix, includePrefix);
    let re = parameterizedRoute;
    if (!excludeOptionalTrailingSlash) {
      re += "(?:/)?";
    }
    return {
      re: new RegExp(`^${re}$`),
      groups
    };
  }
  function buildGetSafeRouteKey() {
    let i = 0;
    return () => {
      let routeKey = "";
      let j = ++i;
      while (j > 0) {
        routeKey += String.fromCharCode(97 + (j - 1) % 26);
        j = Math.floor((j - 1) / 26);
      }
      return routeKey;
    };
  }
  function getSafeKeyFromSegment({ interceptionMarker, getSafeRouteKey, segment, routeKeys, keyPrefix, backreferenceDuplicateKeys }) {
    const { key, optional, repeat } = (0, _getdynamicparam.parseMatchedParameter)(segment);
    let cleanedKey = key.replace(/\W/g, "");
    if (keyPrefix) {
      cleanedKey = `${keyPrefix}${cleanedKey}`;
    }
    let invalidKey = false;
    if (cleanedKey.length === 0 || cleanedKey.length > 30) {
      invalidKey = true;
    }
    if (!isNaN(parseInt(cleanedKey.slice(0, 1)))) {
      invalidKey = true;
    }
    if (invalidKey) {
      cleanedKey = getSafeRouteKey();
    }
    const duplicateKey = cleanedKey in routeKeys;
    if (keyPrefix) {
      routeKeys[cleanedKey] = `${keyPrefix}${key}`;
    } else {
      routeKeys[cleanedKey] = key;
    }
    const interceptionPrefix = interceptionMarker ? (0, _escaperegexp.escapeStringRegexp)(interceptionMarker) : "";
    let pattern;
    if (duplicateKey && backreferenceDuplicateKeys) {
      pattern = `\\k<${cleanedKey}>`;
    } else if (repeat) {
      pattern = `(?<${cleanedKey}>.+?)`;
    } else {
      pattern = `(?<${cleanedKey}>[^/]+?)`;
    }
    return {
      key,
      pattern: optional ? `(?:/${interceptionPrefix}${pattern})?` : `/${interceptionPrefix}${pattern}`,
      cleanedKey,
      optional,
      repeat
    };
  }
  function getNamedParametrizedRoute(route, prefixRouteKeys, includeSuffix, includePrefix, backreferenceDuplicateKeys, reference = {
    names: {},
    intercepted: {}
  }) {
    const getSafeRouteKey = buildGetSafeRouteKey();
    const routeKeys = {};
    const segments = [];
    const inverseParts = [];
    reference = structuredClone(reference);
    for (const segment of (0, _removetrailingslash.removeTrailingSlash)(route).slice(1).split("/")) {
      const hasInterceptionMarker = _interceptionroutes.INTERCEPTION_ROUTE_MARKERS.some((m) => segment.startsWith(m));
      const paramMatches = segment.match(_getdynamicparam.PARAMETER_PATTERN);
      const interceptionMarker = hasInterceptionMarker ? paramMatches?.[1] : undefined;
      let keyPrefix;
      if (interceptionMarker && paramMatches?.[2]) {
        keyPrefix = prefixRouteKeys ? _constants.NEXT_INTERCEPTION_MARKER_PREFIX : undefined;
        reference.intercepted[paramMatches[2]] = interceptionMarker;
      } else if (paramMatches?.[2] && reference.intercepted[paramMatches[2]]) {
        keyPrefix = prefixRouteKeys ? _constants.NEXT_INTERCEPTION_MARKER_PREFIX : undefined;
      } else {
        keyPrefix = prefixRouteKeys ? _constants.NEXT_QUERY_PARAM_PREFIX : undefined;
      }
      if (interceptionMarker && paramMatches && paramMatches[2]) {
        const { key, pattern, cleanedKey, repeat, optional } = getSafeKeyFromSegment({
          getSafeRouteKey,
          interceptionMarker,
          segment: paramMatches[2],
          routeKeys,
          keyPrefix,
          backreferenceDuplicateKeys
        });
        segments.push(pattern);
        inverseParts.push(`/${paramMatches[1]}:${reference.names[key] ?? cleanedKey}${repeat ? optional ? "*" : "+" : ""}`);
        reference.names[key] ??= cleanedKey;
      } else if (paramMatches && paramMatches[2]) {
        if (includePrefix && paramMatches[1]) {
          segments.push(`/${(0, _escaperegexp.escapeStringRegexp)(paramMatches[1])}`);
          inverseParts.push(`/${paramMatches[1]}`);
        }
        const { key, pattern, cleanedKey, repeat, optional } = getSafeKeyFromSegment({
          getSafeRouteKey,
          segment: paramMatches[2],
          routeKeys,
          keyPrefix,
          backreferenceDuplicateKeys
        });
        let s = pattern;
        if (includePrefix && paramMatches[1]) {
          s = s.substring(1);
        }
        segments.push(s);
        inverseParts.push(`/:${reference.names[key] ?? cleanedKey}${repeat ? optional ? "*" : "+" : ""}`);
        reference.names[key] ??= cleanedKey;
      } else {
        segments.push(`/${(0, _escaperegexp.escapeStringRegexp)(segment)}`);
        inverseParts.push(`/${segment}`);
      }
      if (includeSuffix && paramMatches && paramMatches[3]) {
        segments.push((0, _escaperegexp.escapeStringRegexp)(paramMatches[3]));
        inverseParts.push(paramMatches[3]);
      }
    }
    return {
      namedParameterizedRoute: segments.join(""),
      routeKeys,
      pathToRegexpPattern: inverseParts.join(""),
      reference
    };
  }
  function getNamedRouteRegex(normalizedRoute, options) {
    const result = getNamedParametrizedRoute(normalizedRoute, options.prefixRouteKeys, options.includeSuffix ?? false, options.includePrefix ?? false, options.backreferenceDuplicateKeys ?? false, options.reference);
    let namedRegex = result.namedParameterizedRoute;
    if (!options.excludeOptionalTrailingSlash) {
      namedRegex += "(?:/)?";
    }
    return {
      ...getRouteRegex(normalizedRoute, options),
      namedRegex: `^${namedRegex}$`,
      routeKeys: result.routeKeys,
      pathToRegexpPattern: result.pathToRegexpPattern,
      reference: result.reference
    };
  }
  function getNamedMiddlewareRegex(normalizedRoute, options) {
    const { parameterizedRoute } = getParametrizedRoute(normalizedRoute, false, false);
    const { catchAll = true } = options;
    if (parameterizedRoute === "/") {
      let catchAllRegex = catchAll ? ".*" : "";
      return {
        namedRegex: `^/${catchAllRegex}$`
      };
    }
    const { namedParameterizedRoute } = getNamedParametrizedRoute(normalizedRoute, false, false, false, false, undefined);
    let catchAllGroupedRegex = catchAll ? "(?:(/.*)?)" : "";
    return {
      namedRegex: `^${namedParameterizedRoute}${catchAllGroupedRegex}$`
    };
  }
});

// node_modules/next/dist/shared/lib/router/utils/interpolate-as.js
var require_interpolate_as = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "interpolateAs", {
    enumerable: true,
    get: function() {
      return interpolateAs;
    }
  });
  var _routematcher = require_route_matcher();
  var _routeregex = require_route_regex();
  function interpolateAs(route, asPathname, query) {
    let interpolatedRoute = "";
    const dynamicRegex = (0, _routeregex.getRouteRegex)(route);
    const dynamicGroups = dynamicRegex.groups;
    const dynamicMatches = (asPathname !== route ? (0, _routematcher.getRouteMatcher)(dynamicRegex)(asPathname) : "") || query;
    interpolatedRoute = route;
    const params = Object.keys(dynamicGroups);
    if (!params.every((param) => {
      let value = dynamicMatches[param] || "";
      const { repeat, optional } = dynamicGroups[param];
      let replaced = `[${repeat ? "..." : ""}${param}]`;
      if (optional) {
        replaced = `${!value ? "/" : ""}[${replaced}]`;
      }
      if (repeat && !Array.isArray(value))
        value = [
          value
        ];
      return (optional || (param in dynamicMatches)) && (interpolatedRoute = interpolatedRoute.replace(replaced, repeat ? value.map((segment) => encodeURIComponent(segment)).join("/") : encodeURIComponent(value)) || "/");
    })) {
      interpolatedRoute = "";
    }
    return {
      params,
      result: interpolatedRoute
    };
  }
});

// node_modules/next/dist/client/resolve-href.js
var require_resolve_href = __commonJS((exports, module) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "resolveHref", {
    enumerable: true,
    get: function() {
      return resolveHref;
    }
  });
  var _querystring = require_querystring();
  var _formaturl = require_format_url();
  var _omit = require_omit();
  var _utils = require_utils();
  var _normalizetrailingslash = require_normalize_trailing_slash();
  var _islocalurl = require_is_local_url();
  var _utils1 = require_utils2();
  var _interpolateas = require_interpolate_as();
  var _routeregex = require_route_regex();
  var _routematcher = require_route_matcher();
  function resolveHref(router, href, resolveAs) {
    let base;
    let urlAsString = typeof href === "string" ? href : (0, _formaturl.formatWithValidation)(href);
    const urlProtoMatch = urlAsString.match(/^[a-z][a-z0-9+.-]*:\/\//i);
    const urlAsStringNoProto = urlProtoMatch ? urlAsString.slice(urlProtoMatch[0].length) : urlAsString;
    const urlParts = urlAsStringNoProto.split("?", 1);
    if ((urlParts[0] || "").match(/(\/\/|\\)/)) {
      console.error(`Invalid href '${urlAsString}' passed to next/router in page: '${router.pathname}'. Repeated forward-slashes (//) or backslashes \\ are not valid in the href.`);
      const normalizedUrl = (0, _utils.normalizeRepeatedSlashes)(urlAsStringNoProto);
      urlAsString = (urlProtoMatch ? urlProtoMatch[0] : "") + normalizedUrl;
    }
    if (!(0, _islocalurl.isLocalURL)(urlAsString)) {
      return resolveAs ? [
        urlAsString
      ] : urlAsString;
    }
    try {
      let baseBase = urlAsString.startsWith("#") ? router.asPath : router.pathname;
      if (urlAsString.startsWith("?")) {
        baseBase = router.asPath;
        if ((0, _utils1.isDynamicRoute)(router.pathname)) {
          baseBase = router.pathname;
          const routeRegex = (0, _routeregex.getRouteRegex)(router.pathname);
          const match = (0, _routematcher.getRouteMatcher)(routeRegex)(router.asPath);
          if (!match) {
            baseBase = router.asPath;
          }
        }
      }
      base = new URL(baseBase, "http://n");
    } catch (_) {
      base = new URL("/", "http://n");
    }
    try {
      const finalUrl = new URL(urlAsString, base);
      finalUrl.pathname = (0, _normalizetrailingslash.normalizePathTrailingSlash)(finalUrl.pathname);
      let interpolatedAs = "";
      if ((0, _utils1.isDynamicRoute)(finalUrl.pathname) && finalUrl.searchParams && resolveAs) {
        const query = (0, _querystring.searchParamsToUrlQuery)(finalUrl.searchParams);
        const { result, params } = (0, _interpolateas.interpolateAs)(finalUrl.pathname, finalUrl.pathname, query);
        if (result) {
          interpolatedAs = (0, _formaturl.formatWithValidation)({
            pathname: result,
            hash: finalUrl.hash,
            query: (0, _omit.omit)(query, params)
          });
        }
      }
      const resolvedHref = finalUrl.origin === base.origin ? finalUrl.href.slice(finalUrl.origin.length) : finalUrl.href;
      return resolveAs ? [
        resolvedHref,
        interpolatedAs || resolvedHref
      ] : resolvedHref;
    } catch (_) {
      return resolveAs ? [
        urlAsString
      ] : urlAsString;
    }
  }
  if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", { value: true });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
  }
});

// node_modules/next/dist/shared/lib/router/utils/add-path-prefix.js
var require_add_path_prefix = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "addPathPrefix", {
    enumerable: true,
    get: function() {
      return addPathPrefix;
    }
  });
  var _parsepath = require_parse_path();
  function addPathPrefix(path, prefix) {
    if (!path.startsWith("/") || !prefix) {
      return path;
    }
    const { pathname, query, hash } = (0, _parsepath.parsePath)(path);
    return `${prefix}${pathname}${query}${hash}`;
  }
});

// node_modules/next/dist/shared/lib/router/utils/add-locale.js
var require_add_locale = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "addLocale", {
    enumerable: true,
    get: function() {
      return addLocale;
    }
  });
  var _addpathprefix = require_add_path_prefix();
  var _pathhasprefix = require_path_has_prefix();
  function addLocale(path, locale, defaultLocale, ignorePrefix) {
    if (!locale || locale === defaultLocale)
      return path;
    const lower = path.toLowerCase();
    if (!ignorePrefix) {
      if ((0, _pathhasprefix.pathHasPrefix)(lower, "/api"))
        return path;
      if ((0, _pathhasprefix.pathHasPrefix)(lower, `/${locale.toLowerCase()}`))
        return path;
    }
    return (0, _addpathprefix.addPathPrefix)(path, `/${locale}`);
  }
});

// node_modules/next/dist/client/add-locale.js
var require_add_locale2 = __commonJS((exports, module) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "addLocale", {
    enumerable: true,
    get: function() {
      return addLocale;
    }
  });
  var _normalizetrailingslash = require_normalize_trailing_slash();
  var addLocale = (path, ...args) => {
    if (process.env.__NEXT_I18N_SUPPORT) {
      return (0, _normalizetrailingslash.normalizePathTrailingSlash)(require_add_locale().addLocale(path, ...args));
    }
    return path;
  };
  if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", { value: true });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
  }
});

// node_modules/@swc/helpers/cjs/_interop_require_default.cjs
var require__interop_require_default = __commonJS((exports) => {
  function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  exports._ = _interop_require_default;
});

// node_modules/next/dist/shared/lib/router-context.shared-runtime.js
var require_router_context_shared_runtime = __commonJS((exports) => {
  var react = __toESM(require_react());
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "RouterContext", {
    enumerable: true,
    get: function() {
      return RouterContext;
    }
  });
  var _interop_require_default = require__interop_require_default();
  var _react = /* @__PURE__ */ _interop_require_default._(react);
  var RouterContext = _react.default.createContext(null);
  if (true) {
    RouterContext.displayName = "RouterContext";
  }
});

// node_modules/next/dist/client/request-idle-callback.js
var require_request_idle_callback = __commonJS((exports, module) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  function _export(target, all) {
    for (var name in all)
      Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
      });
  }
  _export(exports, {
    cancelIdleCallback: function() {
      return cancelIdleCallback;
    },
    requestIdleCallback: function() {
      return requestIdleCallback;
    }
  });
  var requestIdleCallback = typeof self !== "undefined" && self.requestIdleCallback && self.requestIdleCallback.bind(window) || function(cb) {
    let start = Date.now();
    return self.setTimeout(function() {
      cb({
        didTimeout: false,
        timeRemaining: function() {
          return Math.max(0, 50 - (Date.now() - start));
        }
      });
    }, 1);
  };
  var cancelIdleCallback = typeof self !== "undefined" && self.cancelIdleCallback && self.cancelIdleCallback.bind(window) || function(id) {
    return clearTimeout(id);
  };
  if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", { value: true });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
  }
});

// node_modules/next/dist/client/use-intersection.js
var require_use_intersection = __commonJS((exports, module) => {
  var _react = __toESM(require_react());
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "useIntersection", {
    enumerable: true,
    get: function() {
      return useIntersection;
    }
  });
  var _requestidlecallback = require_request_idle_callback();
  var hasIntersectionObserver = typeof IntersectionObserver === "function";
  var observers = new Map;
  var idList = [];
  function createObserver(options) {
    const id = {
      root: options.root || null,
      margin: options.rootMargin || ""
    };
    const existing = idList.find((obj) => obj.root === id.root && obj.margin === id.margin);
    let instance;
    if (existing) {
      instance = observers.get(existing);
      if (instance) {
        return instance;
      }
    }
    const elements = new Map;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const callback = elements.get(entry.target);
        const isVisible = entry.isIntersecting || entry.intersectionRatio > 0;
        if (callback && isVisible) {
          callback(isVisible);
        }
      });
    }, options);
    instance = {
      id,
      observer,
      elements
    };
    idList.push(id);
    observers.set(id, instance);
    return instance;
  }
  function observe(element, callback, options) {
    const { id, observer, elements } = createObserver(options);
    elements.set(element, callback);
    observer.observe(element);
    return function unobserve() {
      elements.delete(element);
      observer.unobserve(element);
      if (elements.size === 0) {
        observer.disconnect();
        observers.delete(id);
        const index = idList.findIndex((obj) => obj.root === id.root && obj.margin === id.margin);
        if (index > -1) {
          idList.splice(index, 1);
        }
      }
    };
  }
  function useIntersection({ rootRef, rootMargin, disabled }) {
    const isDisabled = disabled || !hasIntersectionObserver;
    const [visible, setVisible] = (0, _react.useState)(false);
    const elementRef = (0, _react.useRef)(null);
    const setElement = (0, _react.useCallback)((element) => {
      elementRef.current = element;
    }, []);
    (0, _react.useEffect)(() => {
      if (hasIntersectionObserver) {
        if (isDisabled || visible)
          return;
        const element = elementRef.current;
        if (element && element.tagName) {
          const unobserve = observe(element, (isVisible) => isVisible && setVisible(isVisible), {
            root: rootRef?.current,
            rootMargin
          });
          return unobserve;
        }
      } else {
        if (!visible) {
          const idleCallback = (0, _requestidlecallback.requestIdleCallback)(() => setVisible(true));
          return () => (0, _requestidlecallback.cancelIdleCallback)(idleCallback);
        }
      }
    }, [
      isDisabled,
      rootMargin,
      rootRef,
      visible,
      elementRef.current
    ]);
    const resetVisible = (0, _react.useCallback)(() => {
      setVisible(false);
    }, []);
    return [
      setElement,
      visible,
      resetVisible
    ];
  }
  if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", { value: true });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
  }
});

// node_modules/next/dist/shared/lib/i18n/normalize-locale-path.js
var require_normalize_locale_path = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "normalizeLocalePath", {
    enumerable: true,
    get: function() {
      return normalizeLocalePath;
    }
  });
  var cache = new WeakMap;
  function normalizeLocalePath(pathname, locales) {
    if (!locales)
      return {
        pathname
      };
    let lowercasedLocales = cache.get(locales);
    if (!lowercasedLocales) {
      lowercasedLocales = locales.map((locale) => locale.toLowerCase());
      cache.set(locales, lowercasedLocales);
    }
    let detectedLocale;
    const segments = pathname.split("/", 2);
    if (!segments[1])
      return {
        pathname
      };
    const segment = segments[1].toLowerCase();
    const index = lowercasedLocales.indexOf(segment);
    if (index < 0)
      return {
        pathname
      };
    detectedLocale = locales[index];
    pathname = pathname.slice(detectedLocale.length + 1) || "/";
    return {
      pathname,
      detectedLocale
    };
  }
});

// node_modules/next/dist/client/normalize-locale-path.js
var require_normalize_locale_path2 = __commonJS((exports, module) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "normalizeLocalePath", {
    enumerable: true,
    get: function() {
      return normalizeLocalePath;
    }
  });
  var normalizeLocalePath = (pathname, locales) => {
    if (process.env.__NEXT_I18N_SUPPORT) {
      return require_normalize_locale_path().normalizeLocalePath(pathname, locales);
    }
    return {
      pathname,
      detectedLocale: undefined
    };
  };
  if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", { value: true });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
  }
});

// node_modules/next/dist/shared/lib/i18n/detect-domain-locale.js
var require_detect_domain_locale = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "detectDomainLocale", {
    enumerable: true,
    get: function() {
      return detectDomainLocale;
    }
  });
  function detectDomainLocale(domainItems, hostname, detectedLocale) {
    if (!domainItems)
      return;
    if (detectedLocale) {
      detectedLocale = detectedLocale.toLowerCase();
    }
    for (const item of domainItems) {
      const domainHostname = item.domain?.split(":", 1)[0].toLowerCase();
      if (hostname === domainHostname || detectedLocale === item.defaultLocale.toLowerCase() || item.locales?.some((locale) => locale.toLowerCase() === detectedLocale)) {
        return item;
      }
    }
  }
});

// node_modules/next/dist/client/detect-domain-locale.js
var require_detect_domain_locale2 = __commonJS((exports, module) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "detectDomainLocale", {
    enumerable: true,
    get: function() {
      return detectDomainLocale;
    }
  });
  var detectDomainLocale = (...args) => {
    if (process.env.__NEXT_I18N_SUPPORT) {
      return require_detect_domain_locale().detectDomainLocale(...args);
    }
  };
  if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", { value: true });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
  }
});

// node_modules/next/dist/client/get-domain-locale.js
var require_get_domain_locale = __commonJS((exports, module) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "getDomainLocale", {
    enumerable: true,
    get: function() {
      return getDomainLocale;
    }
  });
  var _normalizetrailingslash = require_normalize_trailing_slash();
  var basePath = process.env.__NEXT_ROUTER_BASEPATH || "";
  function getDomainLocale(path, locale, locales, domainLocales) {
    if (process.env.__NEXT_I18N_SUPPORT) {
      const normalizeLocalePath = require_normalize_locale_path2().normalizeLocalePath;
      const detectDomainLocale = require_detect_domain_locale2().detectDomainLocale;
      const target = locale || normalizeLocalePath(path, locales).detectedLocale;
      const domain = detectDomainLocale(domainLocales, undefined, target);
      if (domain) {
        const proto = `http${domain.http ? "" : "s"}://`;
        const finalLocale = target === domain.defaultLocale ? "" : `/${target}`;
        return `${proto}${domain.domain}${(0, _normalizetrailingslash.normalizePathTrailingSlash)(`${basePath}${finalLocale}${path}`)}`;
      }
      return false;
    } else {
      return false;
    }
  }
  if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", { value: true });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
  }
});

// node_modules/next/dist/client/add-base-path.js
var require_add_base_path = __commonJS((exports, module) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "addBasePath", {
    enumerable: true,
    get: function() {
      return addBasePath;
    }
  });
  var _addpathprefix = require_add_path_prefix();
  var _normalizetrailingslash = require_normalize_trailing_slash();
  var basePath = process.env.__NEXT_ROUTER_BASEPATH || "";
  function addBasePath(path, required) {
    return (0, _normalizetrailingslash.normalizePathTrailingSlash)(process.env.__NEXT_MANUAL_CLIENT_BASE_PATH && !required ? path : (0, _addpathprefix.addPathPrefix)(path, basePath));
  }
  if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", { value: true });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
  }
});

// node_modules/next/dist/client/use-merged-ref.js
var require_use_merged_ref = __commonJS((exports, module) => {
  var _react = __toESM(require_react());
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "useMergedRef", {
    enumerable: true,
    get: function() {
      return useMergedRef;
    }
  });
  function useMergedRef(refA, refB) {
    const cleanupA = (0, _react.useRef)(null);
    const cleanupB = (0, _react.useRef)(null);
    return (0, _react.useCallback)((current) => {
      if (current === null) {
        const cleanupFnA = cleanupA.current;
        if (cleanupFnA) {
          cleanupA.current = null;
          cleanupFnA();
        }
        const cleanupFnB = cleanupB.current;
        if (cleanupFnB) {
          cleanupB.current = null;
          cleanupFnB();
        }
      } else {
        if (refA) {
          cleanupA.current = applyRef(refA, current);
        }
        if (refB) {
          cleanupB.current = applyRef(refB, current);
        }
      }
    }, [
      refA,
      refB
    ]);
  }
  function applyRef(refA, current) {
    if (typeof refA === "function") {
      const cleanup = refA(current);
      if (typeof cleanup === "function") {
        return cleanup;
      } else {
        return () => refA(null);
      }
    } else {
      refA.current = current;
      return () => {
        refA.current = null;
      };
    }
  }
  if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", { value: true });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
  }
});

// node_modules/next/dist/shared/lib/utils/error-once.js
var require_error_once = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "errorOnce", {
    enumerable: true,
    get: function() {
      return errorOnce;
    }
  });
  var errorOnce = (_) => {};
  if (true) {
    const errors = new Set;
    errorOnce = (msg) => {
      if (!errors.has(msg)) {
        console.error(msg);
      }
      errors.add(msg);
    };
  }
});

// node_modules/next/dist/client/link.js
var require_link = __commonJS((exports, module) => {
  var _jsxruntime = __toESM(require_jsx_runtime());
  var react = __toESM(require_react());
  "use client";
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  function _export(target, all) {
    for (var name in all)
      Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
      });
  }
  _export(exports, {
    default: function() {
      return _default;
    },
    useLinkStatus: function() {
      return useLinkStatus;
    }
  });
  var _interop_require_wildcard = require__interop_require_wildcard();
  var _react = /* @__PURE__ */ _interop_require_wildcard._(react);
  var _resolvehref = require_resolve_href();
  var _islocalurl = require_is_local_url();
  var _formaturl = require_format_url();
  var _utils = require_utils();
  var _addlocale = require_add_locale2();
  var _routercontextsharedruntime = require_router_context_shared_runtime();
  var _useintersection = require_use_intersection();
  var _getdomainlocale = require_get_domain_locale();
  var _addbasepath = require_add_base_path();
  var _usemergedref = require_use_merged_ref();
  var _erroronce = require_error_once();
  var prefetched = new Set;
  function prefetch(router, href, as, options) {
    if (typeof window === "undefined") {
      return;
    }
    if (!(0, _islocalurl.isLocalURL)(href)) {
      return;
    }
    if (!options.bypassPrefetchedCheck) {
      const locale = typeof options.locale !== "undefined" ? options.locale : ("locale" in router) ? router.locale : undefined;
      const prefetchedKey = href + "%" + as + "%" + locale;
      if (prefetched.has(prefetchedKey)) {
        return;
      }
      prefetched.add(prefetchedKey);
    }
    router.prefetch(href, as, options).catch((err) => {
      if (true) {
        throw err;
      }
    });
  }
  function isModifiedEvent(event) {
    const eventTarget = event.currentTarget;
    const target = eventTarget.getAttribute("target");
    return target && target !== "_self" || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.nativeEvent && event.nativeEvent.which === 2;
  }
  function linkClicked(e, router, href, as, replace, shallow, scroll, locale, onNavigate) {
    const { nodeName } = e.currentTarget;
    const isAnchorNodeName = nodeName.toUpperCase() === "A";
    if (isAnchorNodeName && isModifiedEvent(e) || e.currentTarget.hasAttribute("download")) {
      return;
    }
    if (!(0, _islocalurl.isLocalURL)(href)) {
      if (replace) {
        e.preventDefault();
        location.replace(href);
      }
      return;
    }
    e.preventDefault();
    const navigate = () => {
      if (onNavigate) {
        let isDefaultPrevented = false;
        onNavigate({
          preventDefault: () => {
            isDefaultPrevented = true;
          }
        });
        if (isDefaultPrevented) {
          return;
        }
      }
      const routerScroll = scroll ?? true;
      if ("beforePopState" in router) {
        router[replace ? "replace" : "push"](href, as, {
          shallow,
          locale,
          scroll: routerScroll
        });
      } else {
        router[replace ? "replace" : "push"](as || href, {
          scroll: routerScroll
        });
      }
    };
    navigate();
  }
  function formatStringOrUrl(urlObjOrString) {
    if (typeof urlObjOrString === "string") {
      return urlObjOrString;
    }
    return (0, _formaturl.formatUrl)(urlObjOrString);
  }
  var Link = /* @__PURE__ */ _react.default.forwardRef(function LinkComponent(props, forwardedRef) {
    let children;
    const { href: hrefProp, as: asProp, children: childrenProp, prefetch: prefetchProp = null, passHref, replace, shallow, scroll, locale, onClick, onNavigate, onMouseEnter: onMouseEnterProp, onTouchStart: onTouchStartProp, legacyBehavior = false, ...restProps } = props;
    children = childrenProp;
    if (legacyBehavior && (typeof children === "string" || typeof children === "number")) {
      children = /* @__PURE__ */ (0, _jsxruntime.jsx)("a", {
        children
      });
    }
    const router = _react.default.useContext(_routercontextsharedruntime.RouterContext);
    const prefetchEnabled = prefetchProp !== false;
    if (true) {
      let createPropError = function(args) {
        return Object.defineProperty(new Error(`Failed prop type: The prop \`${args.key}\` expects a ${args.expected} in \`<Link>\`, but got \`${args.actual}\` instead.` + (typeof window !== "undefined" ? `
Open your browser's console to view the Component stack trace.` : "")), "__NEXT_ERROR_CODE", {
          value: "E319",
          enumerable: false,
          configurable: true
        });
      };
      const requiredPropsGuard = {
        href: true
      };
      const requiredProps = Object.keys(requiredPropsGuard);
      requiredProps.forEach((key) => {
        if (key === "href") {
          if (props[key] == null || typeof props[key] !== "string" && typeof props[key] !== "object") {
            throw createPropError({
              key,
              expected: "`string` or `object`",
              actual: props[key] === null ? "null" : typeof props[key]
            });
          }
        } else {
          const _ = key;
        }
      });
      const optionalPropsGuard = {
        as: true,
        replace: true,
        scroll: true,
        shallow: true,
        passHref: true,
        prefetch: true,
        locale: true,
        onClick: true,
        onMouseEnter: true,
        onTouchStart: true,
        legacyBehavior: true,
        onNavigate: true
      };
      const optionalProps = Object.keys(optionalPropsGuard);
      optionalProps.forEach((key) => {
        const valType = typeof props[key];
        if (key === "as") {
          if (props[key] && valType !== "string" && valType !== "object") {
            throw createPropError({
              key,
              expected: "`string` or `object`",
              actual: valType
            });
          }
        } else if (key === "locale") {
          if (props[key] && valType !== "string") {
            throw createPropError({
              key,
              expected: "`string`",
              actual: valType
            });
          }
        } else if (key === "onClick" || key === "onMouseEnter" || key === "onTouchStart" || key === "onNavigate") {
          if (props[key] && valType !== "function") {
            throw createPropError({
              key,
              expected: "`function`",
              actual: valType
            });
          }
        } else if (key === "replace" || key === "scroll" || key === "shallow" || key === "passHref" || key === "legacyBehavior") {
          if (props[key] != null && valType !== "boolean") {
            throw createPropError({
              key,
              expected: "`boolean`",
              actual: valType
            });
          }
        } else if (key === "prefetch") {
          if (props[key] != null && valType !== "boolean" && props[key] !== "auto") {
            throw createPropError({
              key,
              expected: '`boolean | "auto"`',
              actual: valType
            });
          }
        } else {
          const _ = key;
        }
      });
    }
    const { href, as } = _react.default.useMemo(() => {
      if (!router) {
        const resolvedHref2 = formatStringOrUrl(hrefProp);
        return {
          href: resolvedHref2,
          as: asProp ? formatStringOrUrl(asProp) : resolvedHref2
        };
      }
      const [resolvedHref, resolvedAs] = (0, _resolvehref.resolveHref)(router, hrefProp, true);
      return {
        href: resolvedHref,
        as: asProp ? (0, _resolvehref.resolveHref)(router, asProp) : resolvedAs || resolvedHref
      };
    }, [
      router,
      hrefProp,
      asProp
    ]);
    const previousHref = _react.default.useRef(href);
    const previousAs = _react.default.useRef(as);
    let child;
    if (legacyBehavior) {
      if (true) {
        if (onClick) {
          console.warn(`"onClick" was passed to <Link> with \`href\` of \`${hrefProp}\` but "legacyBehavior" was set. The legacy behavior requires onClick be set on the child of next/link`);
        }
        if (onMouseEnterProp) {
          console.warn(`"onMouseEnter" was passed to <Link> with \`href\` of \`${hrefProp}\` but "legacyBehavior" was set. The legacy behavior requires onMouseEnter be set on the child of next/link`);
        }
        try {
          child = _react.default.Children.only(children);
        } catch (err) {
          if (!children) {
            throw Object.defineProperty(new Error(`No children were passed to <Link> with \`href\` of \`${hrefProp}\` but one child is required https://nextjs.org/docs/messages/link-no-children`), "__NEXT_ERROR_CODE", {
              value: "E320",
              enumerable: false,
              configurable: true
            });
          }
          throw Object.defineProperty(new Error(`Multiple children were passed to <Link> with \`href\` of \`${hrefProp}\` but only one child is supported https://nextjs.org/docs/messages/link-multiple-children` + (typeof window !== "undefined" ? ` 
Open your browser's console to view the Component stack trace.` : "")), "__NEXT_ERROR_CODE", {
            value: "E266",
            enumerable: false,
            configurable: true
          });
        }
      } else {}
    } else {
      if (true) {
        if (children?.type === "a") {
          throw Object.defineProperty(new Error(`Invalid <Link> with <a> child. Please remove <a> or use <Link legacyBehavior>.
Learn more: https://nextjs.org/docs/messages/invalid-new-link-with-extra-anchor`), "__NEXT_ERROR_CODE", {
            value: "E209",
            enumerable: false,
            configurable: true
          });
        }
      }
    }
    const childRef = legacyBehavior ? child && typeof child === "object" && child.ref : forwardedRef;
    const [setIntersectionRef, isVisible, resetVisible] = (0, _useintersection.useIntersection)({
      rootMargin: "200px"
    });
    const setIntersectionWithResetRef = _react.default.useCallback((el) => {
      if (previousAs.current !== as || previousHref.current !== href) {
        resetVisible();
        previousAs.current = as;
        previousHref.current = href;
      }
      setIntersectionRef(el);
    }, [
      as,
      href,
      resetVisible,
      setIntersectionRef
    ]);
    const setRef2 = (0, _usemergedref.useMergedRef)(setIntersectionWithResetRef, childRef);
    _react.default.useEffect(() => {
      if (true) {
        return;
      }
      if (!router) {
        return;
      }
      if (!isVisible || !prefetchEnabled) {
        return;
      }
      prefetch(router, href, as, {
        locale
      });
    }, [
      as,
      href,
      isVisible,
      locale,
      prefetchEnabled,
      router?.locale,
      router
    ]);
    const childProps = {
      ref: setRef2,
      onClick(e) {
        if (true) {
          if (!e) {
            throw Object.defineProperty(new Error(`Component rendered inside next/link has to pass click event to "onClick" prop.`), "__NEXT_ERROR_CODE", {
              value: "E312",
              enumerable: false,
              configurable: true
            });
          }
        }
        if (!legacyBehavior && typeof onClick === "function") {
          onClick(e);
        }
        if (legacyBehavior && child.props && typeof child.props.onClick === "function") {
          child.props.onClick(e);
        }
        if (!router) {
          return;
        }
        if (e.defaultPrevented) {
          return;
        }
        linkClicked(e, router, href, as, replace, shallow, scroll, locale, onNavigate);
      },
      onMouseEnter(e) {
        if (!legacyBehavior && typeof onMouseEnterProp === "function") {
          onMouseEnterProp(e);
        }
        if (legacyBehavior && child.props && typeof child.props.onMouseEnter === "function") {
          child.props.onMouseEnter(e);
        }
        if (!router) {
          return;
        }
        prefetch(router, href, as, {
          locale,
          priority: true,
          bypassPrefetchedCheck: true
        });
      },
      onTouchStart: process.env.__NEXT_LINK_NO_TOUCH_START ? undefined : function onTouchStart(e) {
        if (!legacyBehavior && typeof onTouchStartProp === "function") {
          onTouchStartProp(e);
        }
        if (legacyBehavior && child.props && typeof child.props.onTouchStart === "function") {
          child.props.onTouchStart(e);
        }
        if (!router) {
          return;
        }
        prefetch(router, href, as, {
          locale,
          priority: true,
          bypassPrefetchedCheck: true
        });
      }
    };
    if ((0, _utils.isAbsoluteUrl)(as)) {
      childProps.href = as;
    } else if (!legacyBehavior || passHref || child.type === "a" && !("href" in child.props)) {
      const curLocale = typeof locale !== "undefined" ? locale : router?.locale;
      const localeDomain = router?.isLocaleDomain && (0, _getdomainlocale.getDomainLocale)(as, curLocale, router?.locales, router?.domainLocales);
      childProps.href = localeDomain || (0, _addbasepath.addBasePath)((0, _addlocale.addLocale)(as, curLocale, router?.defaultLocale));
    }
    if (legacyBehavior) {
      if (true) {
        (0, _erroronce.errorOnce)("`legacyBehavior` is deprecated and will be removed in a future " + `release. A codemod is available to upgrade your components:

` + `npx @next/codemod@latest new-link .

` + "Learn more: https://nextjs.org/docs/app/building-your-application/upgrading/codemods#remove-a-tags-from-link-components");
      }
      return /* @__PURE__ */ _react.default.cloneElement(child, childProps);
    }
    return /* @__PURE__ */ (0, _jsxruntime.jsx)("a", {
      ...restProps,
      ...childProps,
      children
    });
  });
  var LinkStatusContext = /* @__PURE__ */ (0, _react.createContext)({
    pending: false
  });
  var useLinkStatus = () => {
    return (0, _react.useContext)(LinkStatusContext);
  };
  var _default = Link;
  if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", { value: true });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
  }
});

// node_modules/next/dist/shared/lib/app-router-context.shared-runtime.js
var require_app_router_context_shared_runtime = __commonJS((exports) => {
  var react = __toESM(require_react());
  "use client";
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  function _export(target, all) {
    for (var name in all)
      Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
      });
  }
  _export(exports, {
    AppRouterContext: function() {
      return AppRouterContext;
    },
    GlobalLayoutRouterContext: function() {
      return GlobalLayoutRouterContext;
    },
    LayoutRouterContext: function() {
      return LayoutRouterContext;
    },
    MissingSlotContext: function() {
      return MissingSlotContext;
    },
    TemplateContext: function() {
      return TemplateContext;
    }
  });
  var _interop_require_default = require__interop_require_default();
  var _react = /* @__PURE__ */ _interop_require_default._(react);
  var AppRouterContext = _react.default.createContext(null);
  var LayoutRouterContext = _react.default.createContext(null);
  var GlobalLayoutRouterContext = _react.default.createContext(null);
  var TemplateContext = _react.default.createContext(null);
  if (true) {
    AppRouterContext.displayName = "AppRouterContext";
    LayoutRouterContext.displayName = "LayoutRouterContext";
    GlobalLayoutRouterContext.displayName = "GlobalLayoutRouterContext";
    TemplateContext.displayName = "TemplateContext";
  }
  var MissingSlotContext = _react.default.createContext(new Set);
});

// node_modules/next/dist/client/components/readonly-url-search-params.js
var require_readonly_url_search_params = __commonJS((exports, module) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "ReadonlyURLSearchParams", {
    enumerable: true,
    get: function() {
      return ReadonlyURLSearchParams;
    }
  });

  class ReadonlyURLSearchParamsError extends Error {
    constructor() {
      super("Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams");
    }
  }

  class ReadonlyURLSearchParams extends URLSearchParams {
    append() {
      throw new ReadonlyURLSearchParamsError;
    }
    delete() {
      throw new ReadonlyURLSearchParamsError;
    }
    set() {
      throw new ReadonlyURLSearchParamsError;
    }
    sort() {
      throw new ReadonlyURLSearchParamsError;
    }
  }
  if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", { value: true });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
  }
});

// node_modules/next/dist/shared/lib/hooks-client-context.shared-runtime.js
var require_hooks_client_context_shared_runtime = __commonJS((exports) => {
  var _react = __toESM(require_react());
  "use client";
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  function _export(target, all) {
    for (var name in all)
      Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
      });
  }
  _export(exports, {
    NavigationPromisesContext: function() {
      return NavigationPromisesContext;
    },
    PathParamsContext: function() {
      return PathParamsContext;
    },
    PathnameContext: function() {
      return PathnameContext;
    },
    ReadonlyURLSearchParams: function() {
      return _readonlyurlsearchparams.ReadonlyURLSearchParams;
    },
    SearchParamsContext: function() {
      return SearchParamsContext;
    },
    createDevToolsInstrumentedPromise: function() {
      return createDevToolsInstrumentedPromise;
    }
  });
  var _readonlyurlsearchparams = require_readonly_url_search_params();
  var SearchParamsContext = (0, _react.createContext)(null);
  var PathnameContext = (0, _react.createContext)(null);
  var PathParamsContext = (0, _react.createContext)(null);
  var NavigationPromisesContext = (0, _react.createContext)(null);
  function createDevToolsInstrumentedPromise(displayName, value) {
    const promise = Promise.resolve(value);
    promise.status = "fulfilled";
    promise.value = value;
    promise.displayName = `${displayName} (SSR)`;
    return promise;
  }
  if (true) {
    SearchParamsContext.displayName = "SearchParamsContext";
    PathnameContext.displayName = "PathnameContext";
    PathParamsContext.displayName = "PathParamsContext";
    NavigationPromisesContext.displayName = "NavigationPromisesContext";
  }
});

// node_modules/next/dist/shared/lib/server-inserted-html.shared-runtime.js
var require_server_inserted_html_shared_runtime = __commonJS((exports) => {
  var react = __toESM(require_react());
  "use client";
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  function _export(target, all) {
    for (var name in all)
      Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
      });
  }
  _export(exports, {
    ServerInsertedHTMLContext: function() {
      return ServerInsertedHTMLContext;
    },
    useServerInsertedHTML: function() {
      return useServerInsertedHTML;
    }
  });
  var _interop_require_wildcard = require__interop_require_wildcard();
  var _react = /* @__PURE__ */ _interop_require_wildcard._(react);
  var ServerInsertedHTMLContext = /* @__PURE__ */ _react.default.createContext(null);
  function useServerInsertedHTML(callback) {
    const addInsertedServerHTMLCallback = (0, _react.useContext)(ServerInsertedHTMLContext);
    if (addInsertedServerHTMLCallback) {
      addInsertedServerHTMLCallback(callback);
    }
  }
});

// node_modules/next/dist/client/components/unrecognized-action-error.js
var require_unrecognized_action_error = __commonJS((exports, module) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  function _export(target, all) {
    for (var name in all)
      Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
      });
  }
  _export(exports, {
    UnrecognizedActionError: function() {
      return UnrecognizedActionError;
    },
    unstable_isUnrecognizedActionError: function() {
      return unstable_isUnrecognizedActionError;
    }
  });

  class UnrecognizedActionError extends Error {
    constructor(...args) {
      super(...args);
      this.name = "UnrecognizedActionError";
    }
  }
  function unstable_isUnrecognizedActionError(error) {
    return !!(error && typeof error === "object" && error instanceof UnrecognizedActionError);
  }
  if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", { value: true });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
  }
});

// node_modules/next/dist/client/components/redirect-status-code.js
var require_redirect_status_code = __commonJS((exports, module) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "RedirectStatusCode", {
    enumerable: true,
    get: function() {
      return RedirectStatusCode;
    }
  });
  var RedirectStatusCode = /* @__PURE__ */ function(RedirectStatusCode2) {
    RedirectStatusCode2[RedirectStatusCode2["SeeOther"] = 303] = "SeeOther";
    RedirectStatusCode2[RedirectStatusCode2["TemporaryRedirect"] = 307] = "TemporaryRedirect";
    RedirectStatusCode2[RedirectStatusCode2["PermanentRedirect"] = 308] = "PermanentRedirect";
    return RedirectStatusCode2;
  }({});
  if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", { value: true });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
  }
});

// node_modules/next/dist/client/components/redirect-error.js
var require_redirect_error = __commonJS((exports, module) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  function _export(target, all) {
    for (var name in all)
      Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
      });
  }
  _export(exports, {
    REDIRECT_ERROR_CODE: function() {
      return REDIRECT_ERROR_CODE;
    },
    RedirectType: function() {
      return RedirectType;
    },
    isRedirectError: function() {
      return isRedirectError;
    }
  });
  var _redirectstatuscode = require_redirect_status_code();
  var REDIRECT_ERROR_CODE = "NEXT_REDIRECT";
  var RedirectType = /* @__PURE__ */ function(RedirectType2) {
    RedirectType2["push"] = "push";
    RedirectType2["replace"] = "replace";
    return RedirectType2;
  }({});
  function isRedirectError(error) {
    if (typeof error !== "object" || error === null || !("digest" in error) || typeof error.digest !== "string") {
      return false;
    }
    const digest = error.digest.split(";");
    const [errorCode, type] = digest;
    const destination = digest.slice(2, -2).join(";");
    const status = digest.at(-2);
    const statusCode = Number(status);
    return errorCode === REDIRECT_ERROR_CODE && (type === "replace" || type === "push") && typeof destination === "string" && !isNaN(statusCode) && statusCode in _redirectstatuscode.RedirectStatusCode;
  }
  if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", { value: true });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
  }
});

// node_modules/next/dist/server/app-render/async-local-storage.js
var require_async_local_storage = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  function _export(target, all) {
    for (var name in all)
      Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
      });
  }
  _export(exports, {
    bindSnapshot: function() {
      return bindSnapshot;
    },
    createAsyncLocalStorage: function() {
      return createAsyncLocalStorage;
    },
    createSnapshot: function() {
      return createSnapshot;
    }
  });
  var sharedAsyncLocalStorageNotAvailableError = Object.defineProperty(new Error("Invariant: AsyncLocalStorage accessed in runtime where it is not available"), "__NEXT_ERROR_CODE", {
    value: "E504",
    enumerable: false,
    configurable: true
  });

  class FakeAsyncLocalStorage {
    disable() {
      throw sharedAsyncLocalStorageNotAvailableError;
    }
    getStore() {
      return;
    }
    run() {
      throw sharedAsyncLocalStorageNotAvailableError;
    }
    exit() {
      throw sharedAsyncLocalStorageNotAvailableError;
    }
    enterWith() {
      throw sharedAsyncLocalStorageNotAvailableError;
    }
    static bind(fn) {
      return fn;
    }
  }
  var maybeGlobalAsyncLocalStorage = typeof globalThis !== "undefined" && globalThis.AsyncLocalStorage;
  function createAsyncLocalStorage() {
    if (maybeGlobalAsyncLocalStorage) {
      return new maybeGlobalAsyncLocalStorage;
    }
    return new FakeAsyncLocalStorage;
  }
  function bindSnapshot(fn) {
    if (maybeGlobalAsyncLocalStorage) {
      return maybeGlobalAsyncLocalStorage.bind(fn);
    }
    return FakeAsyncLocalStorage.bind(fn);
  }
  function createSnapshot() {
    if (maybeGlobalAsyncLocalStorage) {
      return maybeGlobalAsyncLocalStorage.snapshot();
    }
    return function(fn, ...args) {
      return fn(...args);
    };
  }
});

// node_modules/next/dist/server/app-render/action-async-storage-instance.js
var require_action_async_storage_instance = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "actionAsyncStorageInstance", {
    enumerable: true,
    get: function() {
      return actionAsyncStorageInstance;
    }
  });
  var _asynclocalstorage = require_async_local_storage();
  var actionAsyncStorageInstance = (0, _asynclocalstorage.createAsyncLocalStorage)();
});

// node_modules/next/dist/server/app-render/action-async-storage.external.js
var require_action_async_storage_external = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "actionAsyncStorage", {
    enumerable: true,
    get: function() {
      return _actionasyncstorageinstance.actionAsyncStorageInstance;
    }
  });
  var _actionasyncstorageinstance = require_action_async_storage_instance();
});

// node_modules/next/dist/client/components/redirect.js
var require_redirect = __commonJS((exports, module) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  function _export(target, all) {
    for (var name in all)
      Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
      });
  }
  _export(exports, {
    getRedirectError: function() {
      return getRedirectError;
    },
    getRedirectStatusCodeFromError: function() {
      return getRedirectStatusCodeFromError;
    },
    getRedirectTypeFromError: function() {
      return getRedirectTypeFromError;
    },
    getURLFromRedirectError: function() {
      return getURLFromRedirectError;
    },
    permanentRedirect: function() {
      return permanentRedirect;
    },
    redirect: function() {
      return redirect;
    }
  });
  var _redirectstatuscode = require_redirect_status_code();
  var _redirecterror = require_redirect_error();
  var actionAsyncStorage = typeof window === "undefined" ? require_action_async_storage_external().actionAsyncStorage : undefined;
  function getRedirectError(url, type, statusCode = _redirectstatuscode.RedirectStatusCode.TemporaryRedirect) {
    const error = Object.defineProperty(new Error(_redirecterror.REDIRECT_ERROR_CODE), "__NEXT_ERROR_CODE", {
      value: "E394",
      enumerable: false,
      configurable: true
    });
    error.digest = `${_redirecterror.REDIRECT_ERROR_CODE};${type};${url};${statusCode};`;
    return error;
  }
  function redirect(url, type) {
    type ??= actionAsyncStorage?.getStore()?.isAction ? _redirecterror.RedirectType.push : _redirecterror.RedirectType.replace;
    throw getRedirectError(url, type, _redirectstatuscode.RedirectStatusCode.TemporaryRedirect);
  }
  function permanentRedirect(url, type = _redirecterror.RedirectType.replace) {
    throw getRedirectError(url, type, _redirectstatuscode.RedirectStatusCode.PermanentRedirect);
  }
  function getURLFromRedirectError(error) {
    if (!(0, _redirecterror.isRedirectError)(error))
      return null;
    return error.digest.split(";").slice(2, -2).join(";");
  }
  function getRedirectTypeFromError(error) {
    if (!(0, _redirecterror.isRedirectError)(error)) {
      throw Object.defineProperty(new Error("Not a redirect error"), "__NEXT_ERROR_CODE", {
        value: "E260",
        enumerable: false,
        configurable: true
      });
    }
    return error.digest.split(";", 2)[1];
  }
  function getRedirectStatusCodeFromError(error) {
    if (!(0, _redirecterror.isRedirectError)(error)) {
      throw Object.defineProperty(new Error("Not a redirect error"), "__NEXT_ERROR_CODE", {
        value: "E260",
        enumerable: false,
        configurable: true
      });
    }
    return Number(error.digest.split(";").at(-2));
  }
  if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", { value: true });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
  }
});

// node_modules/next/dist/client/components/http-access-fallback/http-access-fallback.js
var require_http_access_fallback = __commonJS((exports, module) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  function _export(target, all) {
    for (var name in all)
      Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
      });
  }
  _export(exports, {
    HTTPAccessErrorStatus: function() {
      return HTTPAccessErrorStatus;
    },
    HTTP_ERROR_FALLBACK_ERROR_CODE: function() {
      return HTTP_ERROR_FALLBACK_ERROR_CODE;
    },
    getAccessFallbackErrorTypeByStatus: function() {
      return getAccessFallbackErrorTypeByStatus;
    },
    getAccessFallbackHTTPStatus: function() {
      return getAccessFallbackHTTPStatus;
    },
    isHTTPAccessFallbackError: function() {
      return isHTTPAccessFallbackError;
    }
  });
  var HTTPAccessErrorStatus = {
    NOT_FOUND: 404,
    FORBIDDEN: 403,
    UNAUTHORIZED: 401
  };
  var ALLOWED_CODES = new Set(Object.values(HTTPAccessErrorStatus));
  var HTTP_ERROR_FALLBACK_ERROR_CODE = "NEXT_HTTP_ERROR_FALLBACK";
  function isHTTPAccessFallbackError(error) {
    if (typeof error !== "object" || error === null || !("digest" in error) || typeof error.digest !== "string") {
      return false;
    }
    const [prefix, httpStatus] = error.digest.split(";");
    return prefix === HTTP_ERROR_FALLBACK_ERROR_CODE && ALLOWED_CODES.has(Number(httpStatus));
  }
  function getAccessFallbackHTTPStatus(error) {
    const httpStatus = error.digest.split(";")[1];
    return Number(httpStatus);
  }
  function getAccessFallbackErrorTypeByStatus(status) {
    switch (status) {
      case 401:
        return "unauthorized";
      case 403:
        return "forbidden";
      case 404:
        return "not-found";
      default:
        return;
    }
  }
  if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", { value: true });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
  }
});

// node_modules/next/dist/client/components/not-found.js
var require_not_found = __commonJS((exports, module) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "notFound", {
    enumerable: true,
    get: function() {
      return notFound;
    }
  });
  var _httpaccessfallback = require_http_access_fallback();
  var DIGEST = `${_httpaccessfallback.HTTP_ERROR_FALLBACK_ERROR_CODE};404`;
  function notFound() {
    const error = Object.defineProperty(new Error(DIGEST), "__NEXT_ERROR_CODE", {
      value: "E394",
      enumerable: false,
      configurable: true
    });
    error.digest = DIGEST;
    throw error;
  }
  if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", { value: true });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
  }
});

// node_modules/next/dist/client/components/forbidden.js
var require_forbidden = __commonJS((exports, module) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "forbidden", {
    enumerable: true,
    get: function() {
      return forbidden;
    }
  });
  var _httpaccessfallback = require_http_access_fallback();
  var DIGEST = `${_httpaccessfallback.HTTP_ERROR_FALLBACK_ERROR_CODE};403`;
  function forbidden() {
    if (!process.env.__NEXT_EXPERIMENTAL_AUTH_INTERRUPTS) {
      throw Object.defineProperty(new Error(`\`forbidden()\` is experimental and only allowed to be enabled when \`experimental.authInterrupts\` is enabled.`), "__NEXT_ERROR_CODE", {
        value: "E488",
        enumerable: false,
        configurable: true
      });
    }
    const error = Object.defineProperty(new Error(DIGEST), "__NEXT_ERROR_CODE", {
      value: "E394",
      enumerable: false,
      configurable: true
    });
    error.digest = DIGEST;
    throw error;
  }
  if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", { value: true });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
  }
});

// node_modules/next/dist/client/components/unauthorized.js
var require_unauthorized = __commonJS((exports, module) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "unauthorized", {
    enumerable: true,
    get: function() {
      return unauthorized;
    }
  });
  var _httpaccessfallback = require_http_access_fallback();
  var DIGEST = `${_httpaccessfallback.HTTP_ERROR_FALLBACK_ERROR_CODE};401`;
  function unauthorized() {
    if (!process.env.__NEXT_EXPERIMENTAL_AUTH_INTERRUPTS) {
      throw Object.defineProperty(new Error(`\`unauthorized()\` is experimental and only allowed to be used when \`experimental.authInterrupts\` is enabled.`), "__NEXT_ERROR_CODE", {
        value: "E411",
        enumerable: false,
        configurable: true
      });
    }
    const error = Object.defineProperty(new Error(DIGEST), "__NEXT_ERROR_CODE", {
      value: "E394",
      enumerable: false,
      configurable: true
    });
    error.digest = DIGEST;
    throw error;
  }
  if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", { value: true });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
  }
});

// node_modules/next/dist/server/dynamic-rendering-utils.js
var require_dynamic_rendering_utils = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  function _export(target, all) {
    for (var name in all)
      Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
      });
  }
  _export(exports, {
    isHangingPromiseRejectionError: function() {
      return isHangingPromiseRejectionError;
    },
    makeDevtoolsIOAwarePromise: function() {
      return makeDevtoolsIOAwarePromise;
    },
    makeHangingPromise: function() {
      return makeHangingPromise;
    }
  });
  function isHangingPromiseRejectionError(err) {
    if (typeof err !== "object" || err === null || !("digest" in err)) {
      return false;
    }
    return err.digest === HANGING_PROMISE_REJECTION;
  }
  var HANGING_PROMISE_REJECTION = "HANGING_PROMISE_REJECTION";

  class HangingPromiseRejectionError extends Error {
    constructor(route, expression) {
      super(`During prerendering, ${expression} rejects when the prerender is complete. Typically these errors are handled by React but if you move ${expression} to a different context by using \`setTimeout\`, \`after\`, or similar functions you may observe this error and you should handle it in that context. This occurred at route "${route}".`), this.route = route, this.expression = expression, this.digest = HANGING_PROMISE_REJECTION;
    }
  }
  var abortListenersBySignal = new WeakMap;
  function makeHangingPromise(signal, route, expression) {
    if (signal.aborted) {
      return Promise.reject(new HangingPromiseRejectionError(route, expression));
    } else {
      const hangingPromise = new Promise((_, reject) => {
        const boundRejection = reject.bind(null, new HangingPromiseRejectionError(route, expression));
        let currentListeners = abortListenersBySignal.get(signal);
        if (currentListeners) {
          currentListeners.push(boundRejection);
        } else {
          const listeners = [
            boundRejection
          ];
          abortListenersBySignal.set(signal, listeners);
          signal.addEventListener("abort", () => {
            for (let i = 0;i < listeners.length; i++) {
              listeners[i]();
            }
          }, {
            once: true
          });
        }
      });
      hangingPromise.catch(ignoreReject);
      return hangingPromise;
    }
  }
  function ignoreReject() {}
  function makeDevtoolsIOAwarePromise(underlying, requestStore, stage) {
    if (requestStore.stagedRendering) {
      return requestStore.stagedRendering.delayUntilStage(stage, undefined, underlying);
    }
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(underlying);
      }, 0);
    });
  }
});

// node_modules/next/dist/server/lib/router-utils/is-postpone.js
var require_is_postpone = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "isPostpone", {
    enumerable: true,
    get: function() {
      return isPostpone;
    }
  });
  var REACT_POSTPONE_TYPE = Symbol.for("react.postpone");
  function isPostpone(error) {
    return typeof error === "object" && error !== null && error.$$typeof === REACT_POSTPONE_TYPE;
  }
});

// node_modules/next/dist/shared/lib/lazy-dynamic/bailout-to-csr.js
var require_bailout_to_csr = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  function _export(target, all) {
    for (var name in all)
      Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
      });
  }
  _export(exports, {
    BailoutToCSRError: function() {
      return BailoutToCSRError;
    },
    isBailoutToCSRError: function() {
      return isBailoutToCSRError;
    }
  });
  var BAILOUT_TO_CSR = "BAILOUT_TO_CLIENT_SIDE_RENDERING";

  class BailoutToCSRError extends Error {
    constructor(reason) {
      super(`Bail out to client-side rendering: ${reason}`), this.reason = reason, this.digest = BAILOUT_TO_CSR;
    }
  }
  function isBailoutToCSRError(err) {
    if (typeof err !== "object" || err === null || !("digest" in err)) {
      return false;
    }
    return err.digest === BAILOUT_TO_CSR;
  }
});

// node_modules/next/dist/client/components/is-next-router-error.js
var require_is_next_router_error = __commonJS((exports, module) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "isNextRouterError", {
    enumerable: true,
    get: function() {
      return isNextRouterError;
    }
  });
  var _httpaccessfallback = require_http_access_fallback();
  var _redirecterror = require_redirect_error();
  function isNextRouterError(error) {
    return (0, _redirecterror.isRedirectError)(error) || (0, _httpaccessfallback.isHTTPAccessFallbackError)(error);
  }
  if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", { value: true });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
  }
});

// node_modules/next/dist/client/components/hooks-server-context.js
var require_hooks_server_context = __commonJS((exports, module) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  function _export(target, all) {
    for (var name in all)
      Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
      });
  }
  _export(exports, {
    DynamicServerError: function() {
      return DynamicServerError;
    },
    isDynamicServerError: function() {
      return isDynamicServerError;
    }
  });
  var DYNAMIC_ERROR_CODE = "DYNAMIC_SERVER_USAGE";

  class DynamicServerError extends Error {
    constructor(description) {
      super(`Dynamic server usage: ${description}`), this.description = description, this.digest = DYNAMIC_ERROR_CODE;
    }
  }
  function isDynamicServerError(err) {
    if (typeof err !== "object" || err === null || !("digest" in err) || typeof err.digest !== "string") {
      return false;
    }
    return err.digest === DYNAMIC_ERROR_CODE;
  }
  if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", { value: true });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
  }
});

// node_modules/next/dist/client/components/static-generation-bailout.js
var require_static_generation_bailout = __commonJS((exports, module) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  function _export(target, all) {
    for (var name in all)
      Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
      });
  }
  _export(exports, {
    StaticGenBailoutError: function() {
      return StaticGenBailoutError;
    },
    isStaticGenBailoutError: function() {
      return isStaticGenBailoutError;
    }
  });
  var NEXT_STATIC_GEN_BAILOUT = "NEXT_STATIC_GEN_BAILOUT";

  class StaticGenBailoutError extends Error {
    constructor(...args) {
      super(...args), this.code = NEXT_STATIC_GEN_BAILOUT;
    }
  }
  function isStaticGenBailoutError(error) {
    if (typeof error !== "object" || error === null || !("code" in error)) {
      return false;
    }
    return error.code === NEXT_STATIC_GEN_BAILOUT;
  }
  if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", { value: true });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
  }
});

// node_modules/next/dist/server/app-render/work-unit-async-storage-instance.js
var require_work_unit_async_storage_instance = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "workUnitAsyncStorageInstance", {
    enumerable: true,
    get: function() {
      return workUnitAsyncStorageInstance;
    }
  });
  var _asynclocalstorage = require_async_local_storage();
  var workUnitAsyncStorageInstance = (0, _asynclocalstorage.createAsyncLocalStorage)();
});

// node_modules/next/dist/client/components/app-router-headers.js
var require_app_router_headers = __commonJS((exports, module) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  function _export(target, all) {
    for (var name in all)
      Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
      });
  }
  _export(exports, {
    ACTION_HEADER: function() {
      return ACTION_HEADER;
    },
    FLIGHT_HEADERS: function() {
      return FLIGHT_HEADERS;
    },
    NEXT_ACTION_NOT_FOUND_HEADER: function() {
      return NEXT_ACTION_NOT_FOUND_HEADER;
    },
    NEXT_ACTION_REVALIDATED_HEADER: function() {
      return NEXT_ACTION_REVALIDATED_HEADER;
    },
    NEXT_DID_POSTPONE_HEADER: function() {
      return NEXT_DID_POSTPONE_HEADER;
    },
    NEXT_HMR_REFRESH_HASH_COOKIE: function() {
      return NEXT_HMR_REFRESH_HASH_COOKIE;
    },
    NEXT_HMR_REFRESH_HEADER: function() {
      return NEXT_HMR_REFRESH_HEADER;
    },
    NEXT_HTML_REQUEST_ID_HEADER: function() {
      return NEXT_HTML_REQUEST_ID_HEADER;
    },
    NEXT_IS_PRERENDER_HEADER: function() {
      return NEXT_IS_PRERENDER_HEADER;
    },
    NEXT_REQUEST_ID_HEADER: function() {
      return NEXT_REQUEST_ID_HEADER;
    },
    NEXT_REWRITTEN_PATH_HEADER: function() {
      return NEXT_REWRITTEN_PATH_HEADER;
    },
    NEXT_REWRITTEN_QUERY_HEADER: function() {
      return NEXT_REWRITTEN_QUERY_HEADER;
    },
    NEXT_ROUTER_PREFETCH_HEADER: function() {
      return NEXT_ROUTER_PREFETCH_HEADER;
    },
    NEXT_ROUTER_SEGMENT_PREFETCH_HEADER: function() {
      return NEXT_ROUTER_SEGMENT_PREFETCH_HEADER;
    },
    NEXT_ROUTER_STALE_TIME_HEADER: function() {
      return NEXT_ROUTER_STALE_TIME_HEADER;
    },
    NEXT_ROUTER_STATE_TREE_HEADER: function() {
      return NEXT_ROUTER_STATE_TREE_HEADER;
    },
    NEXT_RSC_UNION_QUERY: function() {
      return NEXT_RSC_UNION_QUERY;
    },
    NEXT_URL: function() {
      return NEXT_URL;
    },
    RSC_CONTENT_TYPE_HEADER: function() {
      return RSC_CONTENT_TYPE_HEADER;
    },
    RSC_HEADER: function() {
      return RSC_HEADER;
    }
  });
  var RSC_HEADER = "rsc";
  var ACTION_HEADER = "next-action";
  var NEXT_ROUTER_STATE_TREE_HEADER = "next-router-state-tree";
  var NEXT_ROUTER_PREFETCH_HEADER = "next-router-prefetch";
  var NEXT_ROUTER_SEGMENT_PREFETCH_HEADER = "next-router-segment-prefetch";
  var NEXT_HMR_REFRESH_HEADER = "next-hmr-refresh";
  var NEXT_HMR_REFRESH_HASH_COOKIE = "__next_hmr_refresh_hash__";
  var NEXT_URL = "next-url";
  var RSC_CONTENT_TYPE_HEADER = "text/x-component";
  var FLIGHT_HEADERS = [
    RSC_HEADER,
    NEXT_ROUTER_STATE_TREE_HEADER,
    NEXT_ROUTER_PREFETCH_HEADER,
    NEXT_HMR_REFRESH_HEADER,
    NEXT_ROUTER_SEGMENT_PREFETCH_HEADER
  ];
  var NEXT_RSC_UNION_QUERY = "_rsc";
  var NEXT_ROUTER_STALE_TIME_HEADER = "x-nextjs-stale-time";
  var NEXT_DID_POSTPONE_HEADER = "x-nextjs-postponed";
  var NEXT_REWRITTEN_PATH_HEADER = "x-nextjs-rewritten-path";
  var NEXT_REWRITTEN_QUERY_HEADER = "x-nextjs-rewritten-query";
  var NEXT_IS_PRERENDER_HEADER = "x-nextjs-prerender";
  var NEXT_ACTION_NOT_FOUND_HEADER = "x-nextjs-action-not-found";
  var NEXT_REQUEST_ID_HEADER = "x-nextjs-request-id";
  var NEXT_HTML_REQUEST_ID_HEADER = "x-nextjs-html-request-id";
  var NEXT_ACTION_REVALIDATED_HEADER = "x-action-revalidated";
  if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", { value: true });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
  }
});

// node_modules/next/dist/server/app-render/work-unit-async-storage.external.js
var require_work_unit_async_storage_external = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  function _export(target, all) {
    for (var name in all)
      Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
      });
  }
  _export(exports, {
    getCacheSignal: function() {
      return getCacheSignal;
    },
    getDraftModeProviderForCacheScope: function() {
      return getDraftModeProviderForCacheScope;
    },
    getHmrRefreshHash: function() {
      return getHmrRefreshHash;
    },
    getPrerenderResumeDataCache: function() {
      return getPrerenderResumeDataCache;
    },
    getRenderResumeDataCache: function() {
      return getRenderResumeDataCache;
    },
    getRuntimeStagePromise: function() {
      return getRuntimeStagePromise;
    },
    getServerComponentsHmrCache: function() {
      return getServerComponentsHmrCache;
    },
    isHmrRefresh: function() {
      return isHmrRefresh;
    },
    throwForMissingRequestStore: function() {
      return throwForMissingRequestStore;
    },
    throwInvariantForMissingStore: function() {
      return throwInvariantForMissingStore;
    },
    workUnitAsyncStorage: function() {
      return _workunitasyncstorageinstance.workUnitAsyncStorageInstance;
    }
  });
  var _workunitasyncstorageinstance = require_work_unit_async_storage_instance();
  var _approuterheaders = require_app_router_headers();
  var _invarianterror = require_invariant_error();
  function throwForMissingRequestStore(callingExpression) {
    throw Object.defineProperty(new Error(`\`${callingExpression}\` was called outside a request scope. Read more: https://nextjs.org/docs/messages/next-dynamic-api-wrong-context`), "__NEXT_ERROR_CODE", {
      value: "E251",
      enumerable: false,
      configurable: true
    });
  }
  function throwInvariantForMissingStore() {
    throw Object.defineProperty(new _invarianterror.InvariantError("Expected workUnitAsyncStorage to have a store."), "__NEXT_ERROR_CODE", {
      value: "E696",
      enumerable: false,
      configurable: true
    });
  }
  function getPrerenderResumeDataCache(workUnitStore) {
    switch (workUnitStore.type) {
      case "prerender":
      case "prerender-runtime":
      case "prerender-ppr":
        return workUnitStore.prerenderResumeDataCache;
      case "prerender-client":
        return workUnitStore.prerenderResumeDataCache;
      case "request": {
        if (workUnitStore.prerenderResumeDataCache) {
          return workUnitStore.prerenderResumeDataCache;
        }
      }
      case "prerender-legacy":
      case "cache":
      case "private-cache":
      case "unstable-cache":
        return null;
      default:
        return workUnitStore;
    }
  }
  function getRenderResumeDataCache(workUnitStore) {
    switch (workUnitStore.type) {
      case "request":
      case "prerender":
      case "prerender-runtime":
      case "prerender-client":
        if (workUnitStore.renderResumeDataCache) {
          return workUnitStore.renderResumeDataCache;
        }
      case "prerender-ppr":
        return workUnitStore.prerenderResumeDataCache ?? null;
      case "cache":
      case "private-cache":
      case "unstable-cache":
      case "prerender-legacy":
        return null;
      default:
        return workUnitStore;
    }
  }
  function getHmrRefreshHash(workStore, workUnitStore) {
    if (workStore.dev) {
      switch (workUnitStore.type) {
        case "cache":
        case "private-cache":
        case "prerender":
        case "prerender-runtime":
          return workUnitStore.hmrRefreshHash;
        case "request":
          var _workUnitStore_cookies_get;
          return (_workUnitStore_cookies_get = workUnitStore.cookies.get(_approuterheaders.NEXT_HMR_REFRESH_HASH_COOKIE)) == null ? undefined : _workUnitStore_cookies_get.value;
        case "prerender-client":
        case "prerender-ppr":
        case "prerender-legacy":
        case "unstable-cache":
          break;
        default:
      }
    }
    return;
  }
  function isHmrRefresh(workStore, workUnitStore) {
    if (workStore.dev) {
      switch (workUnitStore.type) {
        case "cache":
        case "private-cache":
        case "request":
          return workUnitStore.isHmrRefresh ?? false;
        case "prerender":
        case "prerender-client":
        case "prerender-runtime":
        case "prerender-ppr":
        case "prerender-legacy":
        case "unstable-cache":
          break;
        default:
      }
    }
    return false;
  }
  function getServerComponentsHmrCache(workStore, workUnitStore) {
    if (workStore.dev) {
      switch (workUnitStore.type) {
        case "cache":
        case "private-cache":
        case "request":
          return workUnitStore.serverComponentsHmrCache;
        case "prerender":
        case "prerender-client":
        case "prerender-runtime":
        case "prerender-ppr":
        case "prerender-legacy":
        case "unstable-cache":
          break;
        default:
      }
    }
    return;
  }
  function getDraftModeProviderForCacheScope(workStore, workUnitStore) {
    if (workStore.isDraftMode) {
      switch (workUnitStore.type) {
        case "cache":
        case "private-cache":
        case "unstable-cache":
        case "prerender-runtime":
        case "request":
          return workUnitStore.draftMode;
        case "prerender":
        case "prerender-client":
        case "prerender-ppr":
        case "prerender-legacy":
          break;
        default:
      }
    }
    return;
  }
  function getCacheSignal(workUnitStore) {
    switch (workUnitStore.type) {
      case "prerender":
      case "prerender-client":
      case "prerender-runtime":
        return workUnitStore.cacheSignal;
      case "request": {
        if (workUnitStore.cacheSignal) {
          return workUnitStore.cacheSignal;
        }
      }
      case "prerender-ppr":
      case "prerender-legacy":
      case "cache":
      case "private-cache":
      case "unstable-cache":
        return null;
      default:
        return workUnitStore;
    }
  }
  function getRuntimeStagePromise(workUnitStore) {
    switch (workUnitStore.type) {
      case "prerender-runtime":
      case "private-cache":
        return workUnitStore.runtimeStagePromise;
      case "prerender":
      case "prerender-client":
      case "prerender-ppr":
      case "prerender-legacy":
      case "request":
      case "cache":
      case "unstable-cache":
        return null;
      default:
        return workUnitStore;
    }
  }
});

// node_modules/next/dist/server/app-render/work-async-storage-instance.js
var require_work_async_storage_instance = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "workAsyncStorageInstance", {
    enumerable: true,
    get: function() {
      return workAsyncStorageInstance;
    }
  });
  var _asynclocalstorage = require_async_local_storage();
  var workAsyncStorageInstance = (0, _asynclocalstorage.createAsyncLocalStorage)();
});

// node_modules/next/dist/server/app-render/work-async-storage.external.js
var require_work_async_storage_external = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "workAsyncStorage", {
    enumerable: true,
    get: function() {
      return _workasyncstorageinstance.workAsyncStorageInstance;
    }
  });
  var _workasyncstorageinstance = require_work_async_storage_instance();
});

// node_modules/next/dist/lib/framework/boundary-constants.js
var require_boundary_constants = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  function _export(target, all) {
    for (var name in all)
      Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
      });
  }
  _export(exports, {
    METADATA_BOUNDARY_NAME: function() {
      return METADATA_BOUNDARY_NAME;
    },
    OUTLET_BOUNDARY_NAME: function() {
      return OUTLET_BOUNDARY_NAME;
    },
    ROOT_LAYOUT_BOUNDARY_NAME: function() {
      return ROOT_LAYOUT_BOUNDARY_NAME;
    },
    VIEWPORT_BOUNDARY_NAME: function() {
      return VIEWPORT_BOUNDARY_NAME;
    }
  });
  var METADATA_BOUNDARY_NAME = "__next_metadata_boundary__";
  var VIEWPORT_BOUNDARY_NAME = "__next_viewport_boundary__";
  var OUTLET_BOUNDARY_NAME = "__next_outlet_boundary__";
  var ROOT_LAYOUT_BOUNDARY_NAME = "__next_root_layout_boundary__";
});

// node_modules/next/dist/lib/scheduler.js
var require_scheduler = __commonJS((exports) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  function _export(target, all) {
    for (var name in all)
      Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
      });
  }
  _export(exports, {
    atLeastOneTask: function() {
      return atLeastOneTask;
    },
    scheduleImmediate: function() {
      return scheduleImmediate;
    },
    scheduleOnNextTick: function() {
      return scheduleOnNextTick;
    },
    waitAtLeastOneReactRenderTask: function() {
      return waitAtLeastOneReactRenderTask;
    }
  });
  var scheduleOnNextTick = (cb) => {
    Promise.resolve().then(() => {
      if (process.env.NEXT_RUNTIME === "edge") {
        setTimeout(cb, 0);
      } else {
        process.nextTick(cb);
      }
    });
  };
  var scheduleImmediate = (cb) => {
    if (process.env.NEXT_RUNTIME === "edge") {
      setTimeout(cb, 0);
    } else {
      setImmediate(cb);
    }
  };
  function atLeastOneTask() {
    return new Promise((resolve) => scheduleImmediate(resolve));
  }
  function waitAtLeastOneReactRenderTask() {
    if (process.env.NEXT_RUNTIME === "edge") {
      return new Promise((r2) => setTimeout(r2, 0));
    } else {
      return new Promise((r2) => setImmediate(r2));
    }
  }
});

// node_modules/next/dist/server/app-render/dynamic-rendering.js
var require_dynamic_rendering = __commonJS((exports) => {
  var react = __toESM(require_react());
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  function _export(target, all) {
    for (var name in all)
      Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
      });
  }
  _export(exports, {
    Postpone: function() {
      return Postpone;
    },
    PreludeState: function() {
      return PreludeState;
    },
    abortAndThrowOnSynchronousRequestDataAccess: function() {
      return abortAndThrowOnSynchronousRequestDataAccess;
    },
    abortOnSynchronousPlatformIOAccess: function() {
      return abortOnSynchronousPlatformIOAccess;
    },
    accessedDynamicData: function() {
      return accessedDynamicData;
    },
    annotateDynamicAccess: function() {
      return annotateDynamicAccess;
    },
    consumeDynamicAccess: function() {
      return consumeDynamicAccess;
    },
    createDynamicTrackingState: function() {
      return createDynamicTrackingState;
    },
    createDynamicValidationState: function() {
      return createDynamicValidationState;
    },
    createHangingInputAbortSignal: function() {
      return createHangingInputAbortSignal;
    },
    createRenderInBrowserAbortSignal: function() {
      return createRenderInBrowserAbortSignal;
    },
    delayUntilRuntimeStage: function() {
      return delayUntilRuntimeStage;
    },
    formatDynamicAPIAccesses: function() {
      return formatDynamicAPIAccesses;
    },
    getFirstDynamicReason: function() {
      return getFirstDynamicReason;
    },
    getStaticShellDisallowedDynamicReasons: function() {
      return getStaticShellDisallowedDynamicReasons;
    },
    isDynamicPostpone: function() {
      return isDynamicPostpone;
    },
    isPrerenderInterruptedError: function() {
      return isPrerenderInterruptedError;
    },
    logDisallowedDynamicError: function() {
      return logDisallowedDynamicError;
    },
    markCurrentScopeAsDynamic: function() {
      return markCurrentScopeAsDynamic;
    },
    postponeWithTracking: function() {
      return postponeWithTracking;
    },
    throwIfDisallowedDynamic: function() {
      return throwIfDisallowedDynamic;
    },
    throwToInterruptStaticGeneration: function() {
      return throwToInterruptStaticGeneration;
    },
    trackAllowedDynamicAccess: function() {
      return trackAllowedDynamicAccess;
    },
    trackDynamicDataInDynamicRender: function() {
      return trackDynamicDataInDynamicRender;
    },
    trackDynamicHoleInRuntimeShell: function() {
      return trackDynamicHoleInRuntimeShell;
    },
    trackDynamicHoleInStaticShell: function() {
      return trackDynamicHoleInStaticShell;
    },
    useDynamicRouteParams: function() {
      return useDynamicRouteParams;
    },
    useDynamicSearchParams: function() {
      return useDynamicSearchParams;
    }
  });
  var _react = /* @__PURE__ */ _interop_require_default(react);
  var _hooksservercontext = require_hooks_server_context();
  var _staticgenerationbailout = require_static_generation_bailout();
  var _workunitasyncstorageexternal = require_work_unit_async_storage_external();
  var _workasyncstorageexternal = require_work_async_storage_external();
  var _dynamicrenderingutils = require_dynamic_rendering_utils();
  var _boundaryconstants = require_boundary_constants();
  var _scheduler = require_scheduler();
  var _bailouttocsr = require_bailout_to_csr();
  var _invarianterror = require_invariant_error();
  function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  var hasPostpone = typeof _react.default.unstable_postpone === "function";
  function createDynamicTrackingState(isDebugDynamicAccesses) {
    return {
      isDebugDynamicAccesses,
      dynamicAccesses: [],
      syncDynamicErrorWithStack: null
    };
  }
  function createDynamicValidationState() {
    return {
      hasSuspenseAboveBody: false,
      hasDynamicMetadata: false,
      dynamicMetadata: null,
      hasDynamicViewport: false,
      hasAllowedDynamic: false,
      dynamicErrors: []
    };
  }
  function getFirstDynamicReason(trackingState) {
    var _trackingState_dynamicAccesses_;
    return (_trackingState_dynamicAccesses_ = trackingState.dynamicAccesses[0]) == null ? undefined : _trackingState_dynamicAccesses_.expression;
  }
  function markCurrentScopeAsDynamic(store, workUnitStore, expression) {
    if (workUnitStore) {
      switch (workUnitStore.type) {
        case "cache":
        case "unstable-cache":
          return;
        case "private-cache":
          return;
        case "prerender-legacy":
        case "prerender-ppr":
        case "request":
          break;
        default:
      }
    }
    if (store.forceDynamic || store.forceStatic)
      return;
    if (store.dynamicShouldError) {
      throw Object.defineProperty(new _staticgenerationbailout.StaticGenBailoutError(`Route ${store.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`${expression}\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", {
        value: "E553",
        enumerable: false,
        configurable: true
      });
    }
    if (workUnitStore) {
      switch (workUnitStore.type) {
        case "prerender-ppr":
          return postponeWithTracking(store.route, expression, workUnitStore.dynamicTracking);
        case "prerender-legacy":
          workUnitStore.revalidate = 0;
          const err = Object.defineProperty(new _hooksservercontext.DynamicServerError(`Route ${store.route} couldn't be rendered statically because it used ${expression}. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`), "__NEXT_ERROR_CODE", {
            value: "E550",
            enumerable: false,
            configurable: true
          });
          store.dynamicUsageDescription = expression;
          store.dynamicUsageStack = err.stack;
          throw err;
        case "request":
          if (true) {
            workUnitStore.usedDynamic = true;
          }
          break;
        default:
      }
    }
  }
  function throwToInterruptStaticGeneration(expression, store, prerenderStore) {
    const err = Object.defineProperty(new _hooksservercontext.DynamicServerError(`Route ${store.route} couldn't be rendered statically because it used \`${expression}\`. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`), "__NEXT_ERROR_CODE", {
      value: "E558",
      enumerable: false,
      configurable: true
    });
    prerenderStore.revalidate = 0;
    store.dynamicUsageDescription = expression;
    store.dynamicUsageStack = err.stack;
    throw err;
  }
  function trackDynamicDataInDynamicRender(workUnitStore) {
    switch (workUnitStore.type) {
      case "cache":
      case "unstable-cache":
        return;
      case "private-cache":
        return;
      case "prerender":
      case "prerender-runtime":
      case "prerender-legacy":
      case "prerender-ppr":
      case "prerender-client":
        break;
      case "request":
        if (true) {
          workUnitStore.usedDynamic = true;
        }
        break;
      default:
    }
  }
  function abortOnSynchronousDynamicDataAccess(route, expression, prerenderStore) {
    const reason = `Route ${route} needs to bail out of prerendering at this point because it used ${expression}.`;
    const error = createPrerenderInterruptedError(reason);
    prerenderStore.controller.abort(error);
    const dynamicTracking = prerenderStore.dynamicTracking;
    if (dynamicTracking) {
      dynamicTracking.dynamicAccesses.push({
        stack: dynamicTracking.isDebugDynamicAccesses ? new Error().stack : undefined,
        expression
      });
    }
  }
  function abortOnSynchronousPlatformIOAccess(route, expression, errorWithStack, prerenderStore) {
    const dynamicTracking = prerenderStore.dynamicTracking;
    abortOnSynchronousDynamicDataAccess(route, expression, prerenderStore);
    if (dynamicTracking) {
      if (dynamicTracking.syncDynamicErrorWithStack === null) {
        dynamicTracking.syncDynamicErrorWithStack = errorWithStack;
      }
    }
  }
  function abortAndThrowOnSynchronousRequestDataAccess(route, expression, errorWithStack, prerenderStore) {
    const prerenderSignal = prerenderStore.controller.signal;
    if (prerenderSignal.aborted === false) {
      abortOnSynchronousDynamicDataAccess(route, expression, prerenderStore);
      const dynamicTracking = prerenderStore.dynamicTracking;
      if (dynamicTracking) {
        if (dynamicTracking.syncDynamicErrorWithStack === null) {
          dynamicTracking.syncDynamicErrorWithStack = errorWithStack;
        }
      }
    }
    throw createPrerenderInterruptedError(`Route ${route} needs to bail out of prerendering at this point because it used ${expression}.`);
  }
  function Postpone({ reason, route }) {
    const prerenderStore = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
    const dynamicTracking = prerenderStore && prerenderStore.type === "prerender-ppr" ? prerenderStore.dynamicTracking : null;
    postponeWithTracking(route, reason, dynamicTracking);
  }
  function postponeWithTracking(route, expression, dynamicTracking) {
    assertPostpone();
    if (dynamicTracking) {
      dynamicTracking.dynamicAccesses.push({
        stack: dynamicTracking.isDebugDynamicAccesses ? new Error().stack : undefined,
        expression
      });
    }
    _react.default.unstable_postpone(createPostponeReason(route, expression));
  }
  function createPostponeReason(route, expression) {
    return `Route ${route} needs to bail out of prerendering at this point because it used ${expression}. ` + `React throws this special object to indicate where. It should not be caught by ` + `your own try/catch. Learn more: https://nextjs.org/docs/messages/ppr-caught-error`;
  }
  function isDynamicPostpone(err) {
    if (typeof err === "object" && err !== null && typeof err.message === "string") {
      return isDynamicPostponeReason(err.message);
    }
    return false;
  }
  function isDynamicPostponeReason(reason) {
    return reason.includes("needs to bail out of prerendering at this point because it used") && reason.includes("Learn more: https://nextjs.org/docs/messages/ppr-caught-error");
  }
  if (isDynamicPostponeReason(createPostponeReason("%%%", "^^^")) === false) {
    throw Object.defineProperty(new Error("Invariant: isDynamicPostpone misidentified a postpone reason. This is a bug in Next.js"), "__NEXT_ERROR_CODE", {
      value: "E296",
      enumerable: false,
      configurable: true
    });
  }
  var NEXT_PRERENDER_INTERRUPTED = "NEXT_PRERENDER_INTERRUPTED";
  function createPrerenderInterruptedError(message) {
    const error = Object.defineProperty(new Error(message), "__NEXT_ERROR_CODE", {
      value: "E394",
      enumerable: false,
      configurable: true
    });
    error.digest = NEXT_PRERENDER_INTERRUPTED;
    return error;
  }
  function isPrerenderInterruptedError(error) {
    return typeof error === "object" && error !== null && error.digest === NEXT_PRERENDER_INTERRUPTED && "name" in error && "message" in error && error instanceof Error;
  }
  function accessedDynamicData(dynamicAccesses) {
    return dynamicAccesses.length > 0;
  }
  function consumeDynamicAccess(serverDynamic, clientDynamic) {
    serverDynamic.dynamicAccesses.push(...clientDynamic.dynamicAccesses);
    return serverDynamic.dynamicAccesses;
  }
  function formatDynamicAPIAccesses(dynamicAccesses) {
    return dynamicAccesses.filter((access) => typeof access.stack === "string" && access.stack.length > 0).map(({ expression, stack }) => {
      stack = stack.split(`
`).slice(4).filter((line) => {
        if (line.includes("node_modules/next/")) {
          return false;
        }
        if (line.includes(" (<anonymous>)")) {
          return false;
        }
        if (line.includes(" (node:")) {
          return false;
        }
        return true;
      }).join(`
`);
      return `Dynamic API Usage Debug - ${expression}:
${stack}`;
    });
  }
  function assertPostpone() {
    if (!hasPostpone) {
      throw Object.defineProperty(new Error(`Invariant: React.unstable_postpone is not defined. This suggests the wrong version of React was loaded. This is a bug in Next.js`), "__NEXT_ERROR_CODE", {
        value: "E224",
        enumerable: false,
        configurable: true
      });
    }
  }
  function createRenderInBrowserAbortSignal() {
    const controller = new AbortController;
    controller.abort(Object.defineProperty(new _bailouttocsr.BailoutToCSRError("Render in Browser"), "__NEXT_ERROR_CODE", {
      value: "E721",
      enumerable: false,
      configurable: true
    }));
    return controller.signal;
  }
  function createHangingInputAbortSignal(workUnitStore) {
    switch (workUnitStore.type) {
      case "prerender":
      case "prerender-runtime":
        const controller = new AbortController;
        if (workUnitStore.cacheSignal) {
          workUnitStore.cacheSignal.inputReady().then(() => {
            controller.abort();
          });
        } else {
          const runtimeStagePromise = (0, _workunitasyncstorageexternal.getRuntimeStagePromise)(workUnitStore);
          if (runtimeStagePromise) {
            runtimeStagePromise.then(() => (0, _scheduler.scheduleOnNextTick)(() => controller.abort()));
          } else {
            (0, _scheduler.scheduleOnNextTick)(() => controller.abort());
          }
        }
        return controller.signal;
      case "prerender-client":
      case "prerender-ppr":
      case "prerender-legacy":
      case "request":
      case "cache":
      case "private-cache":
      case "unstable-cache":
        return;
      default:
    }
  }
  function annotateDynamicAccess(expression, prerenderStore) {
    const dynamicTracking = prerenderStore.dynamicTracking;
    if (dynamicTracking) {
      dynamicTracking.dynamicAccesses.push({
        stack: dynamicTracking.isDebugDynamicAccesses ? new Error().stack : undefined,
        expression
      });
    }
  }
  function useDynamicRouteParams(expression) {
    const workStore = _workasyncstorageexternal.workAsyncStorage.getStore();
    const workUnitStore = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
    if (workStore && workUnitStore) {
      switch (workUnitStore.type) {
        case "prerender-client":
        case "prerender": {
          const fallbackParams = workUnitStore.fallbackRouteParams;
          if (fallbackParams && fallbackParams.size > 0) {
            _react.default.use((0, _dynamicrenderingutils.makeHangingPromise)(workUnitStore.renderSignal, workStore.route, expression));
          }
          break;
        }
        case "prerender-ppr": {
          const fallbackParams = workUnitStore.fallbackRouteParams;
          if (fallbackParams && fallbackParams.size > 0) {
            return postponeWithTracking(workStore.route, expression, workUnitStore.dynamicTracking);
          }
          break;
        }
        case "prerender-runtime":
          throw Object.defineProperty(new _invarianterror.InvariantError(`\`${expression}\` was called during a runtime prerender. Next.js should be preventing ${expression} from being included in server components statically, but did not in this case.`), "__NEXT_ERROR_CODE", {
            value: "E771",
            enumerable: false,
            configurable: true
          });
        case "cache":
        case "private-cache":
          throw Object.defineProperty(new _invarianterror.InvariantError(`\`${expression}\` was called inside a cache scope. Next.js should be preventing ${expression} from being included in server components statically, but did not in this case.`), "__NEXT_ERROR_CODE", {
            value: "E745",
            enumerable: false,
            configurable: true
          });
        case "prerender-legacy":
        case "request":
        case "unstable-cache":
          break;
        default:
      }
    }
  }
  function useDynamicSearchParams(expression) {
    const workStore = _workasyncstorageexternal.workAsyncStorage.getStore();
    const workUnitStore = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
    if (!workStore) {
      return;
    }
    if (!workUnitStore) {
      (0, _workunitasyncstorageexternal.throwForMissingRequestStore)(expression);
    }
    switch (workUnitStore.type) {
      case "prerender-client": {
        _react.default.use((0, _dynamicrenderingutils.makeHangingPromise)(workUnitStore.renderSignal, workStore.route, expression));
        break;
      }
      case "prerender-legacy":
      case "prerender-ppr": {
        if (workStore.forceStatic) {
          return;
        }
        throw Object.defineProperty(new _bailouttocsr.BailoutToCSRError(expression), "__NEXT_ERROR_CODE", {
          value: "E394",
          enumerable: false,
          configurable: true
        });
      }
      case "prerender":
      case "prerender-runtime":
        throw Object.defineProperty(new _invarianterror.InvariantError(`\`${expression}\` was called from a Server Component. Next.js should be preventing ${expression} from being included in server components statically, but did not in this case.`), "__NEXT_ERROR_CODE", {
          value: "E795",
          enumerable: false,
          configurable: true
        });
      case "cache":
      case "unstable-cache":
      case "private-cache":
        throw Object.defineProperty(new _invarianterror.InvariantError(`\`${expression}\` was called inside a cache scope. Next.js should be preventing ${expression} from being included in server components statically, but did not in this case.`), "__NEXT_ERROR_CODE", {
          value: "E745",
          enumerable: false,
          configurable: true
        });
      case "request":
        return;
      default:
    }
  }
  var hasSuspenseRegex = /\n\s+at Suspense \(<anonymous>\)/;
  var bodyAndImplicitTags = "body|div|main|section|article|aside|header|footer|nav|form|p|span|h1|h2|h3|h4|h5|h6";
  var hasSuspenseBeforeRootLayoutWithoutBodyOrImplicitBodyRegex = new RegExp(`\\n\\s+at Suspense \\(<anonymous>\\)(?:(?!\\n\\s+at (?:${bodyAndImplicitTags}) \\(<anonymous>\\))[\\s\\S])*?\\n\\s+at ${_boundaryconstants.ROOT_LAYOUT_BOUNDARY_NAME} \\([^\\n]*\\)`);
  var hasMetadataRegex = new RegExp(`\\n\\s+at ${_boundaryconstants.METADATA_BOUNDARY_NAME}[\\n\\s]`);
  var hasViewportRegex = new RegExp(`\\n\\s+at ${_boundaryconstants.VIEWPORT_BOUNDARY_NAME}[\\n\\s]`);
  var hasOutletRegex = new RegExp(`\\n\\s+at ${_boundaryconstants.OUTLET_BOUNDARY_NAME}[\\n\\s]`);
  function trackAllowedDynamicAccess(workStore, componentStack, dynamicValidation, clientDynamic) {
    if (hasOutletRegex.test(componentStack)) {
      return;
    } else if (hasMetadataRegex.test(componentStack)) {
      dynamicValidation.hasDynamicMetadata = true;
      return;
    } else if (hasViewportRegex.test(componentStack)) {
      dynamicValidation.hasDynamicViewport = true;
      return;
    } else if (hasSuspenseBeforeRootLayoutWithoutBodyOrImplicitBodyRegex.test(componentStack)) {
      dynamicValidation.hasAllowedDynamic = true;
      dynamicValidation.hasSuspenseAboveBody = true;
      return;
    } else if (hasSuspenseRegex.test(componentStack)) {
      dynamicValidation.hasAllowedDynamic = true;
      return;
    } else if (clientDynamic.syncDynamicErrorWithStack) {
      dynamicValidation.dynamicErrors.push(clientDynamic.syncDynamicErrorWithStack);
      return;
    } else {
      const message = `Route "${workStore.route}": Uncached data was accessed outside of ` + "<Suspense>. This delays the entire page from rendering, resulting in a " + "slow user experience. Learn more: " + "https://nextjs.org/docs/messages/blocking-route";
      const error = createErrorWithComponentOrOwnerStack(message, componentStack);
      dynamicValidation.dynamicErrors.push(error);
      return;
    }
  }
  function trackDynamicHoleInRuntimeShell(workStore, componentStack, dynamicValidation, clientDynamic) {
    if (hasOutletRegex.test(componentStack)) {
      return;
    } else if (hasMetadataRegex.test(componentStack)) {
      const message = `Route "${workStore.route}": Uncached data or \`connection()\` was accessed inside \`generateMetadata\`. Except for this instance, the page would have been entirely prerenderable which may have been the intended behavior. See more info here: https://nextjs.org/docs/messages/next-prerender-dynamic-metadata`;
      const error = createErrorWithComponentOrOwnerStack(message, componentStack);
      dynamicValidation.dynamicMetadata = error;
      return;
    } else if (hasViewportRegex.test(componentStack)) {
      const message = `Route "${workStore.route}": Uncached data or \`connection()\` was accessed inside \`generateViewport\`. This delays the entire page from rendering, resulting in a slow user experience. Learn more: https://nextjs.org/docs/messages/next-prerender-dynamic-viewport`;
      const error = createErrorWithComponentOrOwnerStack(message, componentStack);
      dynamicValidation.dynamicErrors.push(error);
      return;
    } else if (hasSuspenseBeforeRootLayoutWithoutBodyOrImplicitBodyRegex.test(componentStack)) {
      dynamicValidation.hasAllowedDynamic = true;
      dynamicValidation.hasSuspenseAboveBody = true;
      return;
    } else if (hasSuspenseRegex.test(componentStack)) {
      dynamicValidation.hasAllowedDynamic = true;
      return;
    } else if (clientDynamic.syncDynamicErrorWithStack) {
      dynamicValidation.dynamicErrors.push(clientDynamic.syncDynamicErrorWithStack);
      return;
    } else {
      const message = `Route "${workStore.route}": Uncached data or \`connection()\` was accessed outside of \`<Suspense>\`. This delays the entire page from rendering, resulting in a slow user experience. Learn more: https://nextjs.org/docs/messages/blocking-route`;
      const error = createErrorWithComponentOrOwnerStack(message, componentStack);
      dynamicValidation.dynamicErrors.push(error);
      return;
    }
  }
  function trackDynamicHoleInStaticShell(workStore, componentStack, dynamicValidation, clientDynamic) {
    if (hasOutletRegex.test(componentStack)) {
      return;
    } else if (hasMetadataRegex.test(componentStack)) {
      const message = `Route "${workStore.route}": Runtime data such as \`cookies()\`, \`headers()\`, \`params\`, or \`searchParams\` was accessed inside \`generateMetadata\` or you have file-based metadata such as icons that depend on dynamic params segments. Except for this instance, the page would have been entirely prerenderable which may have been the intended behavior. See more info here: https://nextjs.org/docs/messages/next-prerender-dynamic-metadata`;
      const error = createErrorWithComponentOrOwnerStack(message, componentStack);
      dynamicValidation.dynamicMetadata = error;
      return;
    } else if (hasViewportRegex.test(componentStack)) {
      const message = `Route "${workStore.route}": Runtime data such as \`cookies()\`, \`headers()\`, \`params\`, or \`searchParams\` was accessed inside \`generateViewport\`. This delays the entire page from rendering, resulting in a slow user experience. Learn more: https://nextjs.org/docs/messages/next-prerender-dynamic-viewport`;
      const error = createErrorWithComponentOrOwnerStack(message, componentStack);
      dynamicValidation.dynamicErrors.push(error);
      return;
    } else if (hasSuspenseBeforeRootLayoutWithoutBodyOrImplicitBodyRegex.test(componentStack)) {
      dynamicValidation.hasAllowedDynamic = true;
      dynamicValidation.hasSuspenseAboveBody = true;
      return;
    } else if (hasSuspenseRegex.test(componentStack)) {
      dynamicValidation.hasAllowedDynamic = true;
      return;
    } else if (clientDynamic.syncDynamicErrorWithStack) {
      dynamicValidation.dynamicErrors.push(clientDynamic.syncDynamicErrorWithStack);
      return;
    } else {
      const message = `Route "${workStore.route}": Runtime data such as \`cookies()\`, \`headers()\`, \`params\`, or \`searchParams\` was accessed outside of \`<Suspense>\`. This delays the entire page from rendering, resulting in a slow user experience. Learn more: https://nextjs.org/docs/messages/blocking-route`;
      const error = createErrorWithComponentOrOwnerStack(message, componentStack);
      dynamicValidation.dynamicErrors.push(error);
      return;
    }
  }
  function createErrorWithComponentOrOwnerStack(message, componentStack) {
    const ownerStack = _react.default.captureOwnerStack ? _react.default.captureOwnerStack() : null;
    const error = Object.defineProperty(new Error(message), "__NEXT_ERROR_CODE", {
      value: "E394",
      enumerable: false,
      configurable: true
    });
    error.stack = error.name + ": " + message + (ownerStack || componentStack);
    return error;
  }
  var PreludeState = /* @__PURE__ */ function(PreludeState2) {
    PreludeState2[PreludeState2["Full"] = 0] = "Full";
    PreludeState2[PreludeState2["Empty"] = 1] = "Empty";
    PreludeState2[PreludeState2["Errored"] = 2] = "Errored";
    return PreludeState2;
  }({});
  function logDisallowedDynamicError(workStore, error) {
    console.error(error);
    if (!workStore.dev) {
      if (workStore.hasReadableErrorStacks) {
        console.error(`To get a more detailed stack trace and pinpoint the issue, start the app in development mode by running \`next dev\`, then open "${workStore.route}" in your browser to investigate the error.`);
      } else {
        console.error(`To get a more detailed stack trace and pinpoint the issue, try one of the following:
  - Start the app in development mode by running \`next dev\`, then open "${workStore.route}" in your browser to investigate the error.
  - Rerun the production build with \`next build --debug-prerender\` to generate better stack traces.`);
      }
    }
  }
  function throwIfDisallowedDynamic(workStore, prelude, dynamicValidation, serverDynamic) {
    if (serverDynamic.syncDynamicErrorWithStack) {
      logDisallowedDynamicError(workStore, serverDynamic.syncDynamicErrorWithStack);
      throw new _staticgenerationbailout.StaticGenBailoutError;
    }
    if (prelude !== 0) {
      if (dynamicValidation.hasSuspenseAboveBody) {
        return;
      }
      const dynamicErrors = dynamicValidation.dynamicErrors;
      if (dynamicErrors.length > 0) {
        for (let i = 0;i < dynamicErrors.length; i++) {
          logDisallowedDynamicError(workStore, dynamicErrors[i]);
        }
        throw new _staticgenerationbailout.StaticGenBailoutError;
      }
      if (dynamicValidation.hasDynamicViewport) {
        console.error(`Route "${workStore.route}" has a \`generateViewport\` that depends on Request data (\`cookies()\`, etc...) or uncached external data (\`fetch(...)\`, etc...) without explicitly allowing fully dynamic rendering. See more info here: https://nextjs.org/docs/messages/next-prerender-dynamic-viewport`);
        throw new _staticgenerationbailout.StaticGenBailoutError;
      }
      if (prelude === 1) {
        console.error(`Route "${workStore.route}" did not produce a static shell and Next.js was unable to determine a reason. This is a bug in Next.js.`);
        throw new _staticgenerationbailout.StaticGenBailoutError;
      }
    } else {
      if (dynamicValidation.hasAllowedDynamic === false && dynamicValidation.hasDynamicMetadata) {
        console.error(`Route "${workStore.route}" has a \`generateMetadata\` that depends on Request data (\`cookies()\`, etc...) or uncached external data (\`fetch(...)\`, etc...) when the rest of the route does not. See more info here: https://nextjs.org/docs/messages/next-prerender-dynamic-metadata`);
        throw new _staticgenerationbailout.StaticGenBailoutError;
      }
    }
  }
  function getStaticShellDisallowedDynamicReasons(workStore, prelude, dynamicValidation) {
    if (dynamicValidation.hasSuspenseAboveBody) {
      return [];
    }
    if (prelude !== 0) {
      const dynamicErrors = dynamicValidation.dynamicErrors;
      if (dynamicErrors.length > 0) {
        return dynamicErrors;
      }
      if (prelude === 1) {
        return [
          Object.defineProperty(new _invarianterror.InvariantError(`Route "${workStore.route}" did not produce a static shell and Next.js was unable to determine a reason.`), "__NEXT_ERROR_CODE", {
            value: "E936",
            enumerable: false,
            configurable: true
          })
        ];
      }
    } else {
      if (dynamicValidation.hasAllowedDynamic === false && dynamicValidation.dynamicErrors.length === 0 && dynamicValidation.dynamicMetadata) {
        return [
          dynamicValidation.dynamicMetadata
        ];
      }
    }
    return [];
  }
  function delayUntilRuntimeStage(prerenderStore, result) {
    if (prerenderStore.runtimeStagePromise) {
      return prerenderStore.runtimeStagePromise.then(() => result);
    }
    return result;
  }
});

// node_modules/next/dist/client/components/unstable-rethrow.server.js
var require_unstable_rethrow_server = __commonJS((exports, module) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "unstable_rethrow", {
    enumerable: true,
    get: function() {
      return unstable_rethrow;
    }
  });
  var _dynamicrenderingutils = require_dynamic_rendering_utils();
  var _ispostpone = require_is_postpone();
  var _bailouttocsr = require_bailout_to_csr();
  var _isnextroutererror = require_is_next_router_error();
  var _dynamicrendering = require_dynamic_rendering();
  var _hooksservercontext = require_hooks_server_context();
  function unstable_rethrow(error) {
    if ((0, _isnextroutererror.isNextRouterError)(error) || (0, _bailouttocsr.isBailoutToCSRError)(error) || (0, _hooksservercontext.isDynamicServerError)(error) || (0, _dynamicrendering.isDynamicPostpone)(error) || (0, _ispostpone.isPostpone)(error) || (0, _dynamicrenderingutils.isHangingPromiseRejectionError)(error) || (0, _dynamicrendering.isPrerenderInterruptedError)(error)) {
      throw error;
    }
    if (error instanceof Error && "cause" in error) {
      unstable_rethrow(error.cause);
    }
  }
  if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", { value: true });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
  }
});

// node_modules/next/dist/client/components/unstable-rethrow.browser.js
var require_unstable_rethrow_browser = __commonJS((exports, module) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "unstable_rethrow", {
    enumerable: true,
    get: function() {
      return unstable_rethrow;
    }
  });
  var _bailouttocsr = require_bailout_to_csr();
  var _isnextroutererror = require_is_next_router_error();
  function unstable_rethrow(error) {
    if ((0, _isnextroutererror.isNextRouterError)(error) || (0, _bailouttocsr.isBailoutToCSRError)(error)) {
      throw error;
    }
    if (error instanceof Error && "cause" in error) {
      unstable_rethrow(error.cause);
    }
  }
  if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", { value: true });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
  }
});

// node_modules/next/dist/client/components/unstable-rethrow.js
var require_unstable_rethrow = __commonJS((exports, module) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "unstable_rethrow", {
    enumerable: true,
    get: function() {
      return unstable_rethrow;
    }
  });
  var unstable_rethrow = typeof window === "undefined" ? require_unstable_rethrow_server().unstable_rethrow : require_unstable_rethrow_browser().unstable_rethrow;
  if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", { value: true });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
  }
});

// node_modules/next/dist/client/components/navigation.react-server.js
var require_navigation_react_server = __commonJS((exports, module) => {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  function _export(target, all) {
    for (var name in all)
      Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
      });
  }
  _export(exports, {
    ReadonlyURLSearchParams: function() {
      return _readonlyurlsearchparams.ReadonlyURLSearchParams;
    },
    RedirectType: function() {
      return _redirecterror.RedirectType;
    },
    forbidden: function() {
      return _forbidden.forbidden;
    },
    notFound: function() {
      return _notfound.notFound;
    },
    permanentRedirect: function() {
      return _redirect.permanentRedirect;
    },
    redirect: function() {
      return _redirect.redirect;
    },
    unauthorized: function() {
      return _unauthorized.unauthorized;
    },
    unstable_isUnrecognizedActionError: function() {
      return unstable_isUnrecognizedActionError;
    },
    unstable_rethrow: function() {
      return _unstablerethrow.unstable_rethrow;
    }
  });
  var _readonlyurlsearchparams = require_readonly_url_search_params();
  var _redirect = require_redirect();
  var _redirecterror = require_redirect_error();
  var _notfound = require_not_found();
  var _forbidden = require_forbidden();
  var _unauthorized = require_unauthorized();
  var _unstablerethrow = require_unstable_rethrow();
  function unstable_isUnrecognizedActionError() {
    throw Object.defineProperty(new Error("`unstable_isUnrecognizedActionError` can only be used on the client."), "__NEXT_ERROR_CODE", {
      value: "E776",
      enumerable: false,
      configurable: true
    });
  }
  if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", { value: true });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
  }
});

// node_modules/next/dist/client/components/navigation.js
var require_navigation = __commonJS((exports, module) => {
  var react = __toESM(require_react());
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  function _export(target, all) {
    for (var name in all)
      Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
      });
  }
  _export(exports, {
    ReadonlyURLSearchParams: function() {
      return _hooksclientcontextsharedruntime.ReadonlyURLSearchParams;
    },
    RedirectType: function() {
      return _navigationreactserver.RedirectType;
    },
    ServerInsertedHTMLContext: function() {
      return _serverinsertedhtmlsharedruntime.ServerInsertedHTMLContext;
    },
    forbidden: function() {
      return _navigationreactserver.forbidden;
    },
    notFound: function() {
      return _navigationreactserver.notFound;
    },
    permanentRedirect: function() {
      return _navigationreactserver.permanentRedirect;
    },
    redirect: function() {
      return _navigationreactserver.redirect;
    },
    unauthorized: function() {
      return _navigationreactserver.unauthorized;
    },
    unstable_isUnrecognizedActionError: function() {
      return _unrecognizedactionerror.unstable_isUnrecognizedActionError;
    },
    unstable_rethrow: function() {
      return _navigationreactserver.unstable_rethrow;
    },
    useParams: function() {
      return useParams;
    },
    usePathname: function() {
      return usePathname;
    },
    useRouter: function() {
      return useRouter;
    },
    useSearchParams: function() {
      return useSearchParams;
    },
    useSelectedLayoutSegment: function() {
      return useSelectedLayoutSegment;
    },
    useSelectedLayoutSegments: function() {
      return useSelectedLayoutSegments;
    },
    useServerInsertedHTML: function() {
      return _serverinsertedhtmlsharedruntime.useServerInsertedHTML;
    }
  });
  var _interop_require_wildcard = require__interop_require_wildcard();
  var _react = /* @__PURE__ */ _interop_require_wildcard._(react);
  var _approutercontextsharedruntime = require_app_router_context_shared_runtime();
  var _hooksclientcontextsharedruntime = require_hooks_client_context_shared_runtime();
  var _segment = require_segment();
  var _serverinsertedhtmlsharedruntime = require_server_inserted_html_shared_runtime();
  var _unrecognizedactionerror = require_unrecognized_action_error();
  var _navigationreactserver = require_navigation_react_server();
  var useDynamicRouteParams = typeof window === "undefined" ? require_dynamic_rendering().useDynamicRouteParams : undefined;
  var useDynamicSearchParams = typeof window === "undefined" ? require_dynamic_rendering().useDynamicSearchParams : undefined;
  function useSearchParams() {
    useDynamicSearchParams?.("useSearchParams()");
    const searchParams = (0, _react.useContext)(_hooksclientcontextsharedruntime.SearchParamsContext);
    const readonlySearchParams = (0, _react.useMemo)(() => {
      if (!searchParams) {
        return null;
      }
      return new _hooksclientcontextsharedruntime.ReadonlyURLSearchParams(searchParams);
    }, [
      searchParams
    ]);
    if ("use" in _react.default) {
      const navigationPromises = (0, _react.use)(_hooksclientcontextsharedruntime.NavigationPromisesContext);
      if (navigationPromises) {
        return (0, _react.use)(navigationPromises.searchParams);
      }
    }
    return readonlySearchParams;
  }
  function usePathname() {
    useDynamicRouteParams?.("usePathname()");
    const pathname = (0, _react.useContext)(_hooksclientcontextsharedruntime.PathnameContext);
    if ("use" in _react.default) {
      const navigationPromises = (0, _react.use)(_hooksclientcontextsharedruntime.NavigationPromisesContext);
      if (navigationPromises) {
        return (0, _react.use)(navigationPromises.pathname);
      }
    }
    return pathname;
  }
  function useRouter() {
    const router = (0, _react.useContext)(_approutercontextsharedruntime.AppRouterContext);
    if (router === null) {
      throw Object.defineProperty(new Error("invariant expected app router to be mounted"), "__NEXT_ERROR_CODE", {
        value: "E238",
        enumerable: false,
        configurable: true
      });
    }
    return router;
  }
  function useParams() {
    useDynamicRouteParams?.("useParams()");
    const params = (0, _react.useContext)(_hooksclientcontextsharedruntime.PathParamsContext);
    if ("use" in _react.default) {
      const navigationPromises = (0, _react.use)(_hooksclientcontextsharedruntime.NavigationPromisesContext);
      if (navigationPromises) {
        return (0, _react.use)(navigationPromises.params);
      }
    }
    return params;
  }
  function useSelectedLayoutSegments(parallelRouteKey = "children") {
    useDynamicRouteParams?.("useSelectedLayoutSegments()");
    const context = (0, _react.useContext)(_approutercontextsharedruntime.LayoutRouterContext);
    if (!context)
      return null;
    if ("use" in _react.default) {
      const navigationPromises = (0, _react.use)(_hooksclientcontextsharedruntime.NavigationPromisesContext);
      if (navigationPromises) {
        const promise = navigationPromises.selectedLayoutSegmentsPromises?.get(parallelRouteKey);
        if (promise) {
          return (0, _react.use)(promise);
        }
      }
    }
    return (0, _segment.getSelectedLayoutSegmentPath)(context.parentTree, parallelRouteKey);
  }
  function useSelectedLayoutSegment(parallelRouteKey = "children") {
    useDynamicRouteParams?.("useSelectedLayoutSegment()");
    const navigationPromises = (0, _react.useContext)(_hooksclientcontextsharedruntime.NavigationPromisesContext);
    const selectedLayoutSegments = useSelectedLayoutSegments(parallelRouteKey);
    if (navigationPromises && "use" in _react.default) {
      const promise = navigationPromises.selectedLayoutSegmentPromises?.get(parallelRouteKey);
      if (promise) {
        return (0, _react.use)(promise);
      }
    }
    return (0, _segment.computeSelectedLayoutSegment)(selectedLayoutSegments, parallelRouteKey);
  }
  if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
    Object.defineProperty(exports.default, "__esModule", { value: true });
    Object.assign(exports.default, exports);
    module.exports = exports.default;
  }
});

// node_modules/clsx/dist/clsx.mjs
function r(e) {
  var t, f, n = "";
  if (typeof e == "string" || typeof e == "number")
    n += e;
  else if (typeof e == "object")
    if (Array.isArray(e)) {
      var o = e.length;
      for (t = 0;t < o; t++)
        e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
    } else
      for (f in e)
        e[f] && (n && (n += " "), n += f);
  return n;
}
function clsx() {
  for (var e, t, f = 0, n = "", o = arguments.length;f < o; f++)
    (e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
  return n;
}

// node_modules/tailwind-merge/dist/bundle-mjs.mjs
var concatArrays = (array1, array2) => {
  const combinedArray = new Array(array1.length + array2.length);
  for (let i = 0;i < array1.length; i++) {
    combinedArray[i] = array1[i];
  }
  for (let i = 0;i < array2.length; i++) {
    combinedArray[array1.length + i] = array2[i];
  }
  return combinedArray;
};
var createClassValidatorObject = (classGroupId, validator) => ({
  classGroupId,
  validator
});
var createClassPartObject = (nextPart = new Map, validators = null, classGroupId) => ({
  nextPart,
  validators,
  classGroupId
});
var CLASS_PART_SEPARATOR = "-";
var EMPTY_CONFLICTS = [];
var ARBITRARY_PROPERTY_PREFIX = "arbitrary..";
var createClassGroupUtils = (config) => {
  const classMap = createClassMap(config);
  const {
    conflictingClassGroups,
    conflictingClassGroupModifiers
  } = config;
  const getClassGroupId = (className) => {
    if (className.startsWith("[") && className.endsWith("]")) {
      return getGroupIdForArbitraryProperty(className);
    }
    const classParts = className.split(CLASS_PART_SEPARATOR);
    const startIndex = classParts[0] === "" && classParts.length > 1 ? 1 : 0;
    return getGroupRecursive(classParts, startIndex, classMap);
  };
  const getConflictingClassGroupIds = (classGroupId, hasPostfixModifier) => {
    if (hasPostfixModifier) {
      const modifierConflicts = conflictingClassGroupModifiers[classGroupId];
      const baseConflicts = conflictingClassGroups[classGroupId];
      if (modifierConflicts) {
        if (baseConflicts) {
          return concatArrays(baseConflicts, modifierConflicts);
        }
        return modifierConflicts;
      }
      return baseConflicts || EMPTY_CONFLICTS;
    }
    return conflictingClassGroups[classGroupId] || EMPTY_CONFLICTS;
  };
  return {
    getClassGroupId,
    getConflictingClassGroupIds
  };
};
var getGroupRecursive = (classParts, startIndex, classPartObject) => {
  const classPathsLength = classParts.length - startIndex;
  if (classPathsLength === 0) {
    return classPartObject.classGroupId;
  }
  const currentClassPart = classParts[startIndex];
  const nextClassPartObject = classPartObject.nextPart.get(currentClassPart);
  if (nextClassPartObject) {
    const result = getGroupRecursive(classParts, startIndex + 1, nextClassPartObject);
    if (result)
      return result;
  }
  const validators = classPartObject.validators;
  if (validators === null) {
    return;
  }
  const classRest = startIndex === 0 ? classParts.join(CLASS_PART_SEPARATOR) : classParts.slice(startIndex).join(CLASS_PART_SEPARATOR);
  const validatorsLength = validators.length;
  for (let i = 0;i < validatorsLength; i++) {
    const validatorObj = validators[i];
    if (validatorObj.validator(classRest)) {
      return validatorObj.classGroupId;
    }
  }
  return;
};
var getGroupIdForArbitraryProperty = (className) => className.slice(1, -1).indexOf(":") === -1 ? undefined : (() => {
  const content = className.slice(1, -1);
  const colonIndex = content.indexOf(":");
  const property = content.slice(0, colonIndex);
  return property ? ARBITRARY_PROPERTY_PREFIX + property : undefined;
})();
var createClassMap = (config) => {
  const {
    theme,
    classGroups
  } = config;
  return processClassGroups(classGroups, theme);
};
var processClassGroups = (classGroups, theme) => {
  const classMap = createClassPartObject();
  for (const classGroupId in classGroups) {
    const group = classGroups[classGroupId];
    processClassesRecursively(group, classMap, classGroupId, theme);
  }
  return classMap;
};
var processClassesRecursively = (classGroup, classPartObject, classGroupId, theme) => {
  const len = classGroup.length;
  for (let i = 0;i < len; i++) {
    const classDefinition = classGroup[i];
    processClassDefinition(classDefinition, classPartObject, classGroupId, theme);
  }
};
var processClassDefinition = (classDefinition, classPartObject, classGroupId, theme) => {
  if (typeof classDefinition === "string") {
    processStringDefinition(classDefinition, classPartObject, classGroupId);
    return;
  }
  if (typeof classDefinition === "function") {
    processFunctionDefinition(classDefinition, classPartObject, classGroupId, theme);
    return;
  }
  processObjectDefinition(classDefinition, classPartObject, classGroupId, theme);
};
var processStringDefinition = (classDefinition, classPartObject, classGroupId) => {
  const classPartObjectToEdit = classDefinition === "" ? classPartObject : getPart(classPartObject, classDefinition);
  classPartObjectToEdit.classGroupId = classGroupId;
};
var processFunctionDefinition = (classDefinition, classPartObject, classGroupId, theme) => {
  if (isThemeGetter(classDefinition)) {
    processClassesRecursively(classDefinition(theme), classPartObject, classGroupId, theme);
    return;
  }
  if (classPartObject.validators === null) {
    classPartObject.validators = [];
  }
  classPartObject.validators.push(createClassValidatorObject(classGroupId, classDefinition));
};
var processObjectDefinition = (classDefinition, classPartObject, classGroupId, theme) => {
  const entries = Object.entries(classDefinition);
  const len = entries.length;
  for (let i = 0;i < len; i++) {
    const [key, value] = entries[i];
    processClassesRecursively(value, getPart(classPartObject, key), classGroupId, theme);
  }
};
var getPart = (classPartObject, path) => {
  let current = classPartObject;
  const parts = path.split(CLASS_PART_SEPARATOR);
  const len = parts.length;
  for (let i = 0;i < len; i++) {
    const part = parts[i];
    let next = current.nextPart.get(part);
    if (!next) {
      next = createClassPartObject();
      current.nextPart.set(part, next);
    }
    current = next;
  }
  return current;
};
var isThemeGetter = (func) => ("isThemeGetter" in func) && func.isThemeGetter === true;
var createLruCache = (maxCacheSize) => {
  if (maxCacheSize < 1) {
    return {
      get: () => {
        return;
      },
      set: () => {}
    };
  }
  let cacheSize = 0;
  let cache = Object.create(null);
  let previousCache = Object.create(null);
  const update = (key, value) => {
    cache[key] = value;
    cacheSize++;
    if (cacheSize > maxCacheSize) {
      cacheSize = 0;
      previousCache = cache;
      cache = Object.create(null);
    }
  };
  return {
    get(key) {
      let value = cache[key];
      if (value !== undefined) {
        return value;
      }
      if ((value = previousCache[key]) !== undefined) {
        update(key, value);
        return value;
      }
    },
    set(key, value) {
      if (key in cache) {
        cache[key] = value;
      } else {
        update(key, value);
      }
    }
  };
};
var IMPORTANT_MODIFIER = "!";
var MODIFIER_SEPARATOR = ":";
var EMPTY_MODIFIERS = [];
var createResultObject = (modifiers, hasImportantModifier, baseClassName, maybePostfixModifierPosition, isExternal) => ({
  modifiers,
  hasImportantModifier,
  baseClassName,
  maybePostfixModifierPosition,
  isExternal
});
var createParseClassName = (config) => {
  const {
    prefix,
    experimentalParseClassName
  } = config;
  let parseClassName = (className) => {
    const modifiers = [];
    let bracketDepth = 0;
    let parenDepth = 0;
    let modifierStart = 0;
    let postfixModifierPosition;
    const len = className.length;
    for (let index = 0;index < len; index++) {
      const currentCharacter = className[index];
      if (bracketDepth === 0 && parenDepth === 0) {
        if (currentCharacter === MODIFIER_SEPARATOR) {
          modifiers.push(className.slice(modifierStart, index));
          modifierStart = index + 1;
          continue;
        }
        if (currentCharacter === "/") {
          postfixModifierPosition = index;
          continue;
        }
      }
      if (currentCharacter === "[")
        bracketDepth++;
      else if (currentCharacter === "]")
        bracketDepth--;
      else if (currentCharacter === "(")
        parenDepth++;
      else if (currentCharacter === ")")
        parenDepth--;
    }
    const baseClassNameWithImportantModifier = modifiers.length === 0 ? className : className.slice(modifierStart);
    let baseClassName = baseClassNameWithImportantModifier;
    let hasImportantModifier = false;
    if (baseClassNameWithImportantModifier.endsWith(IMPORTANT_MODIFIER)) {
      baseClassName = baseClassNameWithImportantModifier.slice(0, -1);
      hasImportantModifier = true;
    } else if (baseClassNameWithImportantModifier.startsWith(IMPORTANT_MODIFIER)) {
      baseClassName = baseClassNameWithImportantModifier.slice(1);
      hasImportantModifier = true;
    }
    const maybePostfixModifierPosition = postfixModifierPosition && postfixModifierPosition > modifierStart ? postfixModifierPosition - modifierStart : undefined;
    return createResultObject(modifiers, hasImportantModifier, baseClassName, maybePostfixModifierPosition);
  };
  if (prefix) {
    const fullPrefix = prefix + MODIFIER_SEPARATOR;
    const parseClassNameOriginal = parseClassName;
    parseClassName = (className) => className.startsWith(fullPrefix) ? parseClassNameOriginal(className.slice(fullPrefix.length)) : createResultObject(EMPTY_MODIFIERS, false, className, undefined, true);
  }
  if (experimentalParseClassName) {
    const parseClassNameOriginal = parseClassName;
    parseClassName = (className) => experimentalParseClassName({
      className,
      parseClassName: parseClassNameOriginal
    });
  }
  return parseClassName;
};
var createSortModifiers = (config) => {
  const modifierWeights = new Map;
  config.orderSensitiveModifiers.forEach((mod, index) => {
    modifierWeights.set(mod, 1e6 + index);
  });
  return (modifiers) => {
    const result = [];
    let currentSegment = [];
    for (let i = 0;i < modifiers.length; i++) {
      const modifier = modifiers[i];
      const isArbitrary = modifier[0] === "[";
      const isOrderSensitive = modifierWeights.has(modifier);
      if (isArbitrary || isOrderSensitive) {
        if (currentSegment.length > 0) {
          currentSegment.sort();
          result.push(...currentSegment);
          currentSegment = [];
        }
        result.push(modifier);
      } else {
        currentSegment.push(modifier);
      }
    }
    if (currentSegment.length > 0) {
      currentSegment.sort();
      result.push(...currentSegment);
    }
    return result;
  };
};
var createConfigUtils = (config) => ({
  cache: createLruCache(config.cacheSize),
  parseClassName: createParseClassName(config),
  sortModifiers: createSortModifiers(config),
  ...createClassGroupUtils(config)
});
var SPLIT_CLASSES_REGEX = /\s+/;
var mergeClassList = (classList, configUtils) => {
  const {
    parseClassName,
    getClassGroupId,
    getConflictingClassGroupIds,
    sortModifiers
  } = configUtils;
  const classGroupsInConflict = [];
  const classNames = classList.trim().split(SPLIT_CLASSES_REGEX);
  let result = "";
  for (let index = classNames.length - 1;index >= 0; index -= 1) {
    const originalClassName = classNames[index];
    const {
      isExternal,
      modifiers,
      hasImportantModifier,
      baseClassName,
      maybePostfixModifierPosition
    } = parseClassName(originalClassName);
    if (isExternal) {
      result = originalClassName + (result.length > 0 ? " " + result : result);
      continue;
    }
    let hasPostfixModifier = !!maybePostfixModifierPosition;
    let classGroupId = getClassGroupId(hasPostfixModifier ? baseClassName.substring(0, maybePostfixModifierPosition) : baseClassName);
    if (!classGroupId) {
      if (!hasPostfixModifier) {
        result = originalClassName + (result.length > 0 ? " " + result : result);
        continue;
      }
      classGroupId = getClassGroupId(baseClassName);
      if (!classGroupId) {
        result = originalClassName + (result.length > 0 ? " " + result : result);
        continue;
      }
      hasPostfixModifier = false;
    }
    const variantModifier = modifiers.length === 0 ? "" : modifiers.length === 1 ? modifiers[0] : sortModifiers(modifiers).join(":");
    const modifierId = hasImportantModifier ? variantModifier + IMPORTANT_MODIFIER : variantModifier;
    const classId = modifierId + classGroupId;
    if (classGroupsInConflict.indexOf(classId) > -1) {
      continue;
    }
    classGroupsInConflict.push(classId);
    const conflictGroups = getConflictingClassGroupIds(classGroupId, hasPostfixModifier);
    for (let i = 0;i < conflictGroups.length; ++i) {
      const group = conflictGroups[i];
      classGroupsInConflict.push(modifierId + group);
    }
    result = originalClassName + (result.length > 0 ? " " + result : result);
  }
  return result;
};
var twJoin = (...classLists) => {
  let index = 0;
  let argument;
  let resolvedValue;
  let string = "";
  while (index < classLists.length) {
    if (argument = classLists[index++]) {
      if (resolvedValue = toValue(argument)) {
        string && (string += " ");
        string += resolvedValue;
      }
    }
  }
  return string;
};
var toValue = (mix) => {
  if (typeof mix === "string") {
    return mix;
  }
  let resolvedValue;
  let string = "";
  for (let k = 0;k < mix.length; k++) {
    if (mix[k]) {
      if (resolvedValue = toValue(mix[k])) {
        string && (string += " ");
        string += resolvedValue;
      }
    }
  }
  return string;
};
var createTailwindMerge = (createConfigFirst, ...createConfigRest) => {
  let configUtils;
  let cacheGet;
  let cacheSet;
  let functionToCall;
  const initTailwindMerge = (classList) => {
    const config = createConfigRest.reduce((previousConfig, createConfigCurrent) => createConfigCurrent(previousConfig), createConfigFirst());
    configUtils = createConfigUtils(config);
    cacheGet = configUtils.cache.get;
    cacheSet = configUtils.cache.set;
    functionToCall = tailwindMerge;
    return tailwindMerge(classList);
  };
  const tailwindMerge = (classList) => {
    const cachedResult = cacheGet(classList);
    if (cachedResult) {
      return cachedResult;
    }
    const result = mergeClassList(classList, configUtils);
    cacheSet(classList, result);
    return result;
  };
  functionToCall = initTailwindMerge;
  return (...args) => functionToCall(twJoin(...args));
};
var fallbackThemeArr = [];
var fromTheme = (key) => {
  const themeGetter = (theme) => theme[key] || fallbackThemeArr;
  themeGetter.isThemeGetter = true;
  return themeGetter;
};
var arbitraryValueRegex = /^\[(?:(\w[\w-]*):)?(.+)\]$/i;
var arbitraryVariableRegex = /^\((?:(\w[\w-]*):)?(.+)\)$/i;
var fractionRegex = /^\d+(?:\.\d+)?\/\d+(?:\.\d+)?$/;
var tshirtUnitRegex = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/;
var lengthUnitRegex = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/;
var colorFunctionRegex = /^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/;
var shadowRegex = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/;
var imageRegex = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/;
var isFraction = (value) => fractionRegex.test(value);
var isNumber = (value) => !!value && !Number.isNaN(Number(value));
var isInteger = (value) => !!value && Number.isInteger(Number(value));
var isPercent = (value) => value.endsWith("%") && isNumber(value.slice(0, -1));
var isTshirtSize = (value) => tshirtUnitRegex.test(value);
var isAny = () => true;
var isLengthOnly = (value) => lengthUnitRegex.test(value) && !colorFunctionRegex.test(value);
var isNever = () => false;
var isShadow = (value) => shadowRegex.test(value);
var isImage = (value) => imageRegex.test(value);
var isAnyNonArbitrary = (value) => !isArbitraryValue(value) && !isArbitraryVariable(value);
var isArbitrarySize = (value) => getIsArbitraryValue(value, isLabelSize, isNever);
var isArbitraryValue = (value) => arbitraryValueRegex.test(value);
var isArbitraryLength = (value) => getIsArbitraryValue(value, isLabelLength, isLengthOnly);
var isArbitraryNumber = (value) => getIsArbitraryValue(value, isLabelNumber, isNumber);
var isArbitraryWeight = (value) => getIsArbitraryValue(value, isLabelWeight, isAny);
var isArbitraryFamilyName = (value) => getIsArbitraryValue(value, isLabelFamilyName, isNever);
var isArbitraryPosition = (value) => getIsArbitraryValue(value, isLabelPosition, isNever);
var isArbitraryImage = (value) => getIsArbitraryValue(value, isLabelImage, isImage);
var isArbitraryShadow = (value) => getIsArbitraryValue(value, isLabelShadow, isShadow);
var isArbitraryVariable = (value) => arbitraryVariableRegex.test(value);
var isArbitraryVariableLength = (value) => getIsArbitraryVariable(value, isLabelLength);
var isArbitraryVariableFamilyName = (value) => getIsArbitraryVariable(value, isLabelFamilyName);
var isArbitraryVariablePosition = (value) => getIsArbitraryVariable(value, isLabelPosition);
var isArbitraryVariableSize = (value) => getIsArbitraryVariable(value, isLabelSize);
var isArbitraryVariableImage = (value) => getIsArbitraryVariable(value, isLabelImage);
var isArbitraryVariableShadow = (value) => getIsArbitraryVariable(value, isLabelShadow, true);
var isArbitraryVariableWeight = (value) => getIsArbitraryVariable(value, isLabelWeight, true);
var getIsArbitraryValue = (value, testLabel, testValue) => {
  const result = arbitraryValueRegex.exec(value);
  if (result) {
    if (result[1]) {
      return testLabel(result[1]);
    }
    return testValue(result[2]);
  }
  return false;
};
var getIsArbitraryVariable = (value, testLabel, shouldMatchNoLabel = false) => {
  const result = arbitraryVariableRegex.exec(value);
  if (result) {
    if (result[1]) {
      return testLabel(result[1]);
    }
    return shouldMatchNoLabel;
  }
  return false;
};
var isLabelPosition = (label) => label === "position" || label === "percentage";
var isLabelImage = (label) => label === "image" || label === "url";
var isLabelSize = (label) => label === "length" || label === "size" || label === "bg-size";
var isLabelLength = (label) => label === "length";
var isLabelNumber = (label) => label === "number";
var isLabelFamilyName = (label) => label === "family-name";
var isLabelWeight = (label) => label === "number" || label === "weight";
var isLabelShadow = (label) => label === "shadow";
var getDefaultConfig = () => {
  const themeColor = fromTheme("color");
  const themeFont = fromTheme("font");
  const themeText = fromTheme("text");
  const themeFontWeight = fromTheme("font-weight");
  const themeTracking = fromTheme("tracking");
  const themeLeading = fromTheme("leading");
  const themeBreakpoint = fromTheme("breakpoint");
  const themeContainer = fromTheme("container");
  const themeSpacing = fromTheme("spacing");
  const themeRadius = fromTheme("radius");
  const themeShadow = fromTheme("shadow");
  const themeInsetShadow = fromTheme("inset-shadow");
  const themeTextShadow = fromTheme("text-shadow");
  const themeDropShadow = fromTheme("drop-shadow");
  const themeBlur = fromTheme("blur");
  const themePerspective = fromTheme("perspective");
  const themeAspect = fromTheme("aspect");
  const themeEase = fromTheme("ease");
  const themeAnimate = fromTheme("animate");
  const scaleBreak = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"];
  const scalePosition = () => [
    "center",
    "top",
    "bottom",
    "left",
    "right",
    "top-left",
    "left-top",
    "top-right",
    "right-top",
    "bottom-right",
    "right-bottom",
    "bottom-left",
    "left-bottom"
  ];
  const scalePositionWithArbitrary = () => [...scalePosition(), isArbitraryVariable, isArbitraryValue];
  const scaleOverflow = () => ["auto", "hidden", "clip", "visible", "scroll"];
  const scaleOverscroll = () => ["auto", "contain", "none"];
  const scaleUnambiguousSpacing = () => [isArbitraryVariable, isArbitraryValue, themeSpacing];
  const scaleInset = () => [isFraction, "full", "auto", ...scaleUnambiguousSpacing()];
  const scaleGridTemplateColsRows = () => [isInteger, "none", "subgrid", isArbitraryVariable, isArbitraryValue];
  const scaleGridColRowStartAndEnd = () => ["auto", {
    span: ["full", isInteger, isArbitraryVariable, isArbitraryValue]
  }, isInteger, isArbitraryVariable, isArbitraryValue];
  const scaleGridColRowStartOrEnd = () => [isInteger, "auto", isArbitraryVariable, isArbitraryValue];
  const scaleGridAutoColsRows = () => ["auto", "min", "max", "fr", isArbitraryVariable, isArbitraryValue];
  const scaleAlignPrimaryAxis = () => ["start", "end", "center", "between", "around", "evenly", "stretch", "baseline", "center-safe", "end-safe"];
  const scaleAlignSecondaryAxis = () => ["start", "end", "center", "stretch", "center-safe", "end-safe"];
  const scaleMargin = () => ["auto", ...scaleUnambiguousSpacing()];
  const scaleSizing = () => [isFraction, "auto", "full", "dvw", "dvh", "lvw", "lvh", "svw", "svh", "min", "max", "fit", ...scaleUnambiguousSpacing()];
  const scaleSizingInline = () => [isFraction, "screen", "full", "dvw", "lvw", "svw", "min", "max", "fit", ...scaleUnambiguousSpacing()];
  const scaleSizingBlock = () => [isFraction, "screen", "full", "lh", "dvh", "lvh", "svh", "min", "max", "fit", ...scaleUnambiguousSpacing()];
  const scaleColor = () => [themeColor, isArbitraryVariable, isArbitraryValue];
  const scaleBgPosition = () => [...scalePosition(), isArbitraryVariablePosition, isArbitraryPosition, {
    position: [isArbitraryVariable, isArbitraryValue]
  }];
  const scaleBgRepeat = () => ["no-repeat", {
    repeat: ["", "x", "y", "space", "round"]
  }];
  const scaleBgSize = () => ["auto", "cover", "contain", isArbitraryVariableSize, isArbitrarySize, {
    size: [isArbitraryVariable, isArbitraryValue]
  }];
  const scaleGradientStopPosition = () => [isPercent, isArbitraryVariableLength, isArbitraryLength];
  const scaleRadius = () => [
    "",
    "none",
    "full",
    themeRadius,
    isArbitraryVariable,
    isArbitraryValue
  ];
  const scaleBorderWidth = () => ["", isNumber, isArbitraryVariableLength, isArbitraryLength];
  const scaleLineStyle = () => ["solid", "dashed", "dotted", "double"];
  const scaleBlendMode = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"];
  const scaleMaskImagePosition = () => [isNumber, isPercent, isArbitraryVariablePosition, isArbitraryPosition];
  const scaleBlur = () => [
    "",
    "none",
    themeBlur,
    isArbitraryVariable,
    isArbitraryValue
  ];
  const scaleRotate = () => ["none", isNumber, isArbitraryVariable, isArbitraryValue];
  const scaleScale = () => ["none", isNumber, isArbitraryVariable, isArbitraryValue];
  const scaleSkew = () => [isNumber, isArbitraryVariable, isArbitraryValue];
  const scaleTranslate = () => [isFraction, "full", ...scaleUnambiguousSpacing()];
  return {
    cacheSize: 500,
    theme: {
      animate: ["spin", "ping", "pulse", "bounce"],
      aspect: ["video"],
      blur: [isTshirtSize],
      breakpoint: [isTshirtSize],
      color: [isAny],
      container: [isTshirtSize],
      "drop-shadow": [isTshirtSize],
      ease: ["in", "out", "in-out"],
      font: [isAnyNonArbitrary],
      "font-weight": ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black"],
      "inset-shadow": [isTshirtSize],
      leading: ["none", "tight", "snug", "normal", "relaxed", "loose"],
      perspective: ["dramatic", "near", "normal", "midrange", "distant", "none"],
      radius: [isTshirtSize],
      shadow: [isTshirtSize],
      spacing: ["px", isNumber],
      text: [isTshirtSize],
      "text-shadow": [isTshirtSize],
      tracking: ["tighter", "tight", "normal", "wide", "wider", "widest"]
    },
    classGroups: {
      aspect: [{
        aspect: ["auto", "square", isFraction, isArbitraryValue, isArbitraryVariable, themeAspect]
      }],
      container: ["container"],
      columns: [{
        columns: [isNumber, isArbitraryValue, isArbitraryVariable, themeContainer]
      }],
      "break-after": [{
        "break-after": scaleBreak()
      }],
      "break-before": [{
        "break-before": scaleBreak()
      }],
      "break-inside": [{
        "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
      }],
      "box-decoration": [{
        "box-decoration": ["slice", "clone"]
      }],
      box: [{
        box: ["border", "content"]
      }],
      display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
      sr: ["sr-only", "not-sr-only"],
      float: [{
        float: ["right", "left", "none", "start", "end"]
      }],
      clear: [{
        clear: ["left", "right", "both", "none", "start", "end"]
      }],
      isolation: ["isolate", "isolation-auto"],
      "object-fit": [{
        object: ["contain", "cover", "fill", "none", "scale-down"]
      }],
      "object-position": [{
        object: scalePositionWithArbitrary()
      }],
      overflow: [{
        overflow: scaleOverflow()
      }],
      "overflow-x": [{
        "overflow-x": scaleOverflow()
      }],
      "overflow-y": [{
        "overflow-y": scaleOverflow()
      }],
      overscroll: [{
        overscroll: scaleOverscroll()
      }],
      "overscroll-x": [{
        "overscroll-x": scaleOverscroll()
      }],
      "overscroll-y": [{
        "overscroll-y": scaleOverscroll()
      }],
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      inset: [{
        inset: scaleInset()
      }],
      "inset-x": [{
        "inset-x": scaleInset()
      }],
      "inset-y": [{
        "inset-y": scaleInset()
      }],
      start: [{
        "inset-s": scaleInset(),
        start: scaleInset()
      }],
      end: [{
        "inset-e": scaleInset(),
        end: scaleInset()
      }],
      "inset-bs": [{
        "inset-bs": scaleInset()
      }],
      "inset-be": [{
        "inset-be": scaleInset()
      }],
      top: [{
        top: scaleInset()
      }],
      right: [{
        right: scaleInset()
      }],
      bottom: [{
        bottom: scaleInset()
      }],
      left: [{
        left: scaleInset()
      }],
      visibility: ["visible", "invisible", "collapse"],
      z: [{
        z: [isInteger, "auto", isArbitraryVariable, isArbitraryValue]
      }],
      basis: [{
        basis: [isFraction, "full", "auto", themeContainer, ...scaleUnambiguousSpacing()]
      }],
      "flex-direction": [{
        flex: ["row", "row-reverse", "col", "col-reverse"]
      }],
      "flex-wrap": [{
        flex: ["nowrap", "wrap", "wrap-reverse"]
      }],
      flex: [{
        flex: [isNumber, isFraction, "auto", "initial", "none", isArbitraryValue]
      }],
      grow: [{
        grow: ["", isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      shrink: [{
        shrink: ["", isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      order: [{
        order: [isInteger, "first", "last", "none", isArbitraryVariable, isArbitraryValue]
      }],
      "grid-cols": [{
        "grid-cols": scaleGridTemplateColsRows()
      }],
      "col-start-end": [{
        col: scaleGridColRowStartAndEnd()
      }],
      "col-start": [{
        "col-start": scaleGridColRowStartOrEnd()
      }],
      "col-end": [{
        "col-end": scaleGridColRowStartOrEnd()
      }],
      "grid-rows": [{
        "grid-rows": scaleGridTemplateColsRows()
      }],
      "row-start-end": [{
        row: scaleGridColRowStartAndEnd()
      }],
      "row-start": [{
        "row-start": scaleGridColRowStartOrEnd()
      }],
      "row-end": [{
        "row-end": scaleGridColRowStartOrEnd()
      }],
      "grid-flow": [{
        "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
      }],
      "auto-cols": [{
        "auto-cols": scaleGridAutoColsRows()
      }],
      "auto-rows": [{
        "auto-rows": scaleGridAutoColsRows()
      }],
      gap: [{
        gap: scaleUnambiguousSpacing()
      }],
      "gap-x": [{
        "gap-x": scaleUnambiguousSpacing()
      }],
      "gap-y": [{
        "gap-y": scaleUnambiguousSpacing()
      }],
      "justify-content": [{
        justify: [...scaleAlignPrimaryAxis(), "normal"]
      }],
      "justify-items": [{
        "justify-items": [...scaleAlignSecondaryAxis(), "normal"]
      }],
      "justify-self": [{
        "justify-self": ["auto", ...scaleAlignSecondaryAxis()]
      }],
      "align-content": [{
        content: ["normal", ...scaleAlignPrimaryAxis()]
      }],
      "align-items": [{
        items: [...scaleAlignSecondaryAxis(), {
          baseline: ["", "last"]
        }]
      }],
      "align-self": [{
        self: ["auto", ...scaleAlignSecondaryAxis(), {
          baseline: ["", "last"]
        }]
      }],
      "place-content": [{
        "place-content": scaleAlignPrimaryAxis()
      }],
      "place-items": [{
        "place-items": [...scaleAlignSecondaryAxis(), "baseline"]
      }],
      "place-self": [{
        "place-self": ["auto", ...scaleAlignSecondaryAxis()]
      }],
      p: [{
        p: scaleUnambiguousSpacing()
      }],
      px: [{
        px: scaleUnambiguousSpacing()
      }],
      py: [{
        py: scaleUnambiguousSpacing()
      }],
      ps: [{
        ps: scaleUnambiguousSpacing()
      }],
      pe: [{
        pe: scaleUnambiguousSpacing()
      }],
      pbs: [{
        pbs: scaleUnambiguousSpacing()
      }],
      pbe: [{
        pbe: scaleUnambiguousSpacing()
      }],
      pt: [{
        pt: scaleUnambiguousSpacing()
      }],
      pr: [{
        pr: scaleUnambiguousSpacing()
      }],
      pb: [{
        pb: scaleUnambiguousSpacing()
      }],
      pl: [{
        pl: scaleUnambiguousSpacing()
      }],
      m: [{
        m: scaleMargin()
      }],
      mx: [{
        mx: scaleMargin()
      }],
      my: [{
        my: scaleMargin()
      }],
      ms: [{
        ms: scaleMargin()
      }],
      me: [{
        me: scaleMargin()
      }],
      mbs: [{
        mbs: scaleMargin()
      }],
      mbe: [{
        mbe: scaleMargin()
      }],
      mt: [{
        mt: scaleMargin()
      }],
      mr: [{
        mr: scaleMargin()
      }],
      mb: [{
        mb: scaleMargin()
      }],
      ml: [{
        ml: scaleMargin()
      }],
      "space-x": [{
        "space-x": scaleUnambiguousSpacing()
      }],
      "space-x-reverse": ["space-x-reverse"],
      "space-y": [{
        "space-y": scaleUnambiguousSpacing()
      }],
      "space-y-reverse": ["space-y-reverse"],
      size: [{
        size: scaleSizing()
      }],
      "inline-size": [{
        inline: ["auto", ...scaleSizingInline()]
      }],
      "min-inline-size": [{
        "min-inline": ["auto", ...scaleSizingInline()]
      }],
      "max-inline-size": [{
        "max-inline": ["none", ...scaleSizingInline()]
      }],
      "block-size": [{
        block: ["auto", ...scaleSizingBlock()]
      }],
      "min-block-size": [{
        "min-block": ["auto", ...scaleSizingBlock()]
      }],
      "max-block-size": [{
        "max-block": ["none", ...scaleSizingBlock()]
      }],
      w: [{
        w: [themeContainer, "screen", ...scaleSizing()]
      }],
      "min-w": [{
        "min-w": [
          themeContainer,
          "screen",
          "none",
          ...scaleSizing()
        ]
      }],
      "max-w": [{
        "max-w": [
          themeContainer,
          "screen",
          "none",
          "prose",
          {
            screen: [themeBreakpoint]
          },
          ...scaleSizing()
        ]
      }],
      h: [{
        h: ["screen", "lh", ...scaleSizing()]
      }],
      "min-h": [{
        "min-h": ["screen", "lh", "none", ...scaleSizing()]
      }],
      "max-h": [{
        "max-h": ["screen", "lh", ...scaleSizing()]
      }],
      "font-size": [{
        text: ["base", themeText, isArbitraryVariableLength, isArbitraryLength]
      }],
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      "font-style": ["italic", "not-italic"],
      "font-weight": [{
        font: [themeFontWeight, isArbitraryVariableWeight, isArbitraryWeight]
      }],
      "font-stretch": [{
        "font-stretch": ["ultra-condensed", "extra-condensed", "condensed", "semi-condensed", "normal", "semi-expanded", "expanded", "extra-expanded", "ultra-expanded", isPercent, isArbitraryValue]
      }],
      "font-family": [{
        font: [isArbitraryVariableFamilyName, isArbitraryFamilyName, themeFont]
      }],
      "font-features": [{
        "font-features": [isArbitraryValue]
      }],
      "fvn-normal": ["normal-nums"],
      "fvn-ordinal": ["ordinal"],
      "fvn-slashed-zero": ["slashed-zero"],
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
      tracking: [{
        tracking: [themeTracking, isArbitraryVariable, isArbitraryValue]
      }],
      "line-clamp": [{
        "line-clamp": [isNumber, "none", isArbitraryVariable, isArbitraryNumber]
      }],
      leading: [{
        leading: [
          themeLeading,
          ...scaleUnambiguousSpacing()
        ]
      }],
      "list-image": [{
        "list-image": ["none", isArbitraryVariable, isArbitraryValue]
      }],
      "list-style-position": [{
        list: ["inside", "outside"]
      }],
      "list-style-type": [{
        list: ["disc", "decimal", "none", isArbitraryVariable, isArbitraryValue]
      }],
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      "placeholder-color": [{
        placeholder: scaleColor()
      }],
      "text-color": [{
        text: scaleColor()
      }],
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      "text-decoration-style": [{
        decoration: [...scaleLineStyle(), "wavy"]
      }],
      "text-decoration-thickness": [{
        decoration: [isNumber, "from-font", "auto", isArbitraryVariable, isArbitraryLength]
      }],
      "text-decoration-color": [{
        decoration: scaleColor()
      }],
      "underline-offset": [{
        "underline-offset": [isNumber, "auto", isArbitraryVariable, isArbitraryValue]
      }],
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      "text-wrap": [{
        text: ["wrap", "nowrap", "balance", "pretty"]
      }],
      indent: [{
        indent: scaleUnambiguousSpacing()
      }],
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", isArbitraryVariable, isArbitraryValue]
      }],
      whitespace: [{
        whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
      }],
      break: [{
        break: ["normal", "words", "all", "keep"]
      }],
      wrap: [{
        wrap: ["break-word", "anywhere", "normal"]
      }],
      hyphens: [{
        hyphens: ["none", "manual", "auto"]
      }],
      content: [{
        content: ["none", isArbitraryVariable, isArbitraryValue]
      }],
      "bg-attachment": [{
        bg: ["fixed", "local", "scroll"]
      }],
      "bg-clip": [{
        "bg-clip": ["border", "padding", "content", "text"]
      }],
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      "bg-position": [{
        bg: scaleBgPosition()
      }],
      "bg-repeat": [{
        bg: scaleBgRepeat()
      }],
      "bg-size": [{
        bg: scaleBgSize()
      }],
      "bg-image": [{
        bg: ["none", {
          linear: [{
            to: ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
          }, isInteger, isArbitraryVariable, isArbitraryValue],
          radial: ["", isArbitraryVariable, isArbitraryValue],
          conic: [isInteger, isArbitraryVariable, isArbitraryValue]
        }, isArbitraryVariableImage, isArbitraryImage]
      }],
      "bg-color": [{
        bg: scaleColor()
      }],
      "gradient-from-pos": [{
        from: scaleGradientStopPosition()
      }],
      "gradient-via-pos": [{
        via: scaleGradientStopPosition()
      }],
      "gradient-to-pos": [{
        to: scaleGradientStopPosition()
      }],
      "gradient-from": [{
        from: scaleColor()
      }],
      "gradient-via": [{
        via: scaleColor()
      }],
      "gradient-to": [{
        to: scaleColor()
      }],
      rounded: [{
        rounded: scaleRadius()
      }],
      "rounded-s": [{
        "rounded-s": scaleRadius()
      }],
      "rounded-e": [{
        "rounded-e": scaleRadius()
      }],
      "rounded-t": [{
        "rounded-t": scaleRadius()
      }],
      "rounded-r": [{
        "rounded-r": scaleRadius()
      }],
      "rounded-b": [{
        "rounded-b": scaleRadius()
      }],
      "rounded-l": [{
        "rounded-l": scaleRadius()
      }],
      "rounded-ss": [{
        "rounded-ss": scaleRadius()
      }],
      "rounded-se": [{
        "rounded-se": scaleRadius()
      }],
      "rounded-ee": [{
        "rounded-ee": scaleRadius()
      }],
      "rounded-es": [{
        "rounded-es": scaleRadius()
      }],
      "rounded-tl": [{
        "rounded-tl": scaleRadius()
      }],
      "rounded-tr": [{
        "rounded-tr": scaleRadius()
      }],
      "rounded-br": [{
        "rounded-br": scaleRadius()
      }],
      "rounded-bl": [{
        "rounded-bl": scaleRadius()
      }],
      "border-w": [{
        border: scaleBorderWidth()
      }],
      "border-w-x": [{
        "border-x": scaleBorderWidth()
      }],
      "border-w-y": [{
        "border-y": scaleBorderWidth()
      }],
      "border-w-s": [{
        "border-s": scaleBorderWidth()
      }],
      "border-w-e": [{
        "border-e": scaleBorderWidth()
      }],
      "border-w-bs": [{
        "border-bs": scaleBorderWidth()
      }],
      "border-w-be": [{
        "border-be": scaleBorderWidth()
      }],
      "border-w-t": [{
        "border-t": scaleBorderWidth()
      }],
      "border-w-r": [{
        "border-r": scaleBorderWidth()
      }],
      "border-w-b": [{
        "border-b": scaleBorderWidth()
      }],
      "border-w-l": [{
        "border-l": scaleBorderWidth()
      }],
      "divide-x": [{
        "divide-x": scaleBorderWidth()
      }],
      "divide-x-reverse": ["divide-x-reverse"],
      "divide-y": [{
        "divide-y": scaleBorderWidth()
      }],
      "divide-y-reverse": ["divide-y-reverse"],
      "border-style": [{
        border: [...scaleLineStyle(), "hidden", "none"]
      }],
      "divide-style": [{
        divide: [...scaleLineStyle(), "hidden", "none"]
      }],
      "border-color": [{
        border: scaleColor()
      }],
      "border-color-x": [{
        "border-x": scaleColor()
      }],
      "border-color-y": [{
        "border-y": scaleColor()
      }],
      "border-color-s": [{
        "border-s": scaleColor()
      }],
      "border-color-e": [{
        "border-e": scaleColor()
      }],
      "border-color-bs": [{
        "border-bs": scaleColor()
      }],
      "border-color-be": [{
        "border-be": scaleColor()
      }],
      "border-color-t": [{
        "border-t": scaleColor()
      }],
      "border-color-r": [{
        "border-r": scaleColor()
      }],
      "border-color-b": [{
        "border-b": scaleColor()
      }],
      "border-color-l": [{
        "border-l": scaleColor()
      }],
      "divide-color": [{
        divide: scaleColor()
      }],
      "outline-style": [{
        outline: [...scaleLineStyle(), "none", "hidden"]
      }],
      "outline-offset": [{
        "outline-offset": [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      "outline-w": [{
        outline: ["", isNumber, isArbitraryVariableLength, isArbitraryLength]
      }],
      "outline-color": [{
        outline: scaleColor()
      }],
      shadow: [{
        shadow: [
          "",
          "none",
          themeShadow,
          isArbitraryVariableShadow,
          isArbitraryShadow
        ]
      }],
      "shadow-color": [{
        shadow: scaleColor()
      }],
      "inset-shadow": [{
        "inset-shadow": ["none", themeInsetShadow, isArbitraryVariableShadow, isArbitraryShadow]
      }],
      "inset-shadow-color": [{
        "inset-shadow": scaleColor()
      }],
      "ring-w": [{
        ring: scaleBorderWidth()
      }],
      "ring-w-inset": ["ring-inset"],
      "ring-color": [{
        ring: scaleColor()
      }],
      "ring-offset-w": [{
        "ring-offset": [isNumber, isArbitraryLength]
      }],
      "ring-offset-color": [{
        "ring-offset": scaleColor()
      }],
      "inset-ring-w": [{
        "inset-ring": scaleBorderWidth()
      }],
      "inset-ring-color": [{
        "inset-ring": scaleColor()
      }],
      "text-shadow": [{
        "text-shadow": ["none", themeTextShadow, isArbitraryVariableShadow, isArbitraryShadow]
      }],
      "text-shadow-color": [{
        "text-shadow": scaleColor()
      }],
      opacity: [{
        opacity: [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      "mix-blend": [{
        "mix-blend": [...scaleBlendMode(), "plus-darker", "plus-lighter"]
      }],
      "bg-blend": [{
        "bg-blend": scaleBlendMode()
      }],
      "mask-clip": [{
        "mask-clip": ["border", "padding", "content", "fill", "stroke", "view"]
      }, "mask-no-clip"],
      "mask-composite": [{
        mask: ["add", "subtract", "intersect", "exclude"]
      }],
      "mask-image-linear-pos": [{
        "mask-linear": [isNumber]
      }],
      "mask-image-linear-from-pos": [{
        "mask-linear-from": scaleMaskImagePosition()
      }],
      "mask-image-linear-to-pos": [{
        "mask-linear-to": scaleMaskImagePosition()
      }],
      "mask-image-linear-from-color": [{
        "mask-linear-from": scaleColor()
      }],
      "mask-image-linear-to-color": [{
        "mask-linear-to": scaleColor()
      }],
      "mask-image-t-from-pos": [{
        "mask-t-from": scaleMaskImagePosition()
      }],
      "mask-image-t-to-pos": [{
        "mask-t-to": scaleMaskImagePosition()
      }],
      "mask-image-t-from-color": [{
        "mask-t-from": scaleColor()
      }],
      "mask-image-t-to-color": [{
        "mask-t-to": scaleColor()
      }],
      "mask-image-r-from-pos": [{
        "mask-r-from": scaleMaskImagePosition()
      }],
      "mask-image-r-to-pos": [{
        "mask-r-to": scaleMaskImagePosition()
      }],
      "mask-image-r-from-color": [{
        "mask-r-from": scaleColor()
      }],
      "mask-image-r-to-color": [{
        "mask-r-to": scaleColor()
      }],
      "mask-image-b-from-pos": [{
        "mask-b-from": scaleMaskImagePosition()
      }],
      "mask-image-b-to-pos": [{
        "mask-b-to": scaleMaskImagePosition()
      }],
      "mask-image-b-from-color": [{
        "mask-b-from": scaleColor()
      }],
      "mask-image-b-to-color": [{
        "mask-b-to": scaleColor()
      }],
      "mask-image-l-from-pos": [{
        "mask-l-from": scaleMaskImagePosition()
      }],
      "mask-image-l-to-pos": [{
        "mask-l-to": scaleMaskImagePosition()
      }],
      "mask-image-l-from-color": [{
        "mask-l-from": scaleColor()
      }],
      "mask-image-l-to-color": [{
        "mask-l-to": scaleColor()
      }],
      "mask-image-x-from-pos": [{
        "mask-x-from": scaleMaskImagePosition()
      }],
      "mask-image-x-to-pos": [{
        "mask-x-to": scaleMaskImagePosition()
      }],
      "mask-image-x-from-color": [{
        "mask-x-from": scaleColor()
      }],
      "mask-image-x-to-color": [{
        "mask-x-to": scaleColor()
      }],
      "mask-image-y-from-pos": [{
        "mask-y-from": scaleMaskImagePosition()
      }],
      "mask-image-y-to-pos": [{
        "mask-y-to": scaleMaskImagePosition()
      }],
      "mask-image-y-from-color": [{
        "mask-y-from": scaleColor()
      }],
      "mask-image-y-to-color": [{
        "mask-y-to": scaleColor()
      }],
      "mask-image-radial": [{
        "mask-radial": [isArbitraryVariable, isArbitraryValue]
      }],
      "mask-image-radial-from-pos": [{
        "mask-radial-from": scaleMaskImagePosition()
      }],
      "mask-image-radial-to-pos": [{
        "mask-radial-to": scaleMaskImagePosition()
      }],
      "mask-image-radial-from-color": [{
        "mask-radial-from": scaleColor()
      }],
      "mask-image-radial-to-color": [{
        "mask-radial-to": scaleColor()
      }],
      "mask-image-radial-shape": [{
        "mask-radial": ["circle", "ellipse"]
      }],
      "mask-image-radial-size": [{
        "mask-radial": [{
          closest: ["side", "corner"],
          farthest: ["side", "corner"]
        }]
      }],
      "mask-image-radial-pos": [{
        "mask-radial-at": scalePosition()
      }],
      "mask-image-conic-pos": [{
        "mask-conic": [isNumber]
      }],
      "mask-image-conic-from-pos": [{
        "mask-conic-from": scaleMaskImagePosition()
      }],
      "mask-image-conic-to-pos": [{
        "mask-conic-to": scaleMaskImagePosition()
      }],
      "mask-image-conic-from-color": [{
        "mask-conic-from": scaleColor()
      }],
      "mask-image-conic-to-color": [{
        "mask-conic-to": scaleColor()
      }],
      "mask-mode": [{
        mask: ["alpha", "luminance", "match"]
      }],
      "mask-origin": [{
        "mask-origin": ["border", "padding", "content", "fill", "stroke", "view"]
      }],
      "mask-position": [{
        mask: scaleBgPosition()
      }],
      "mask-repeat": [{
        mask: scaleBgRepeat()
      }],
      "mask-size": [{
        mask: scaleBgSize()
      }],
      "mask-type": [{
        "mask-type": ["alpha", "luminance"]
      }],
      "mask-image": [{
        mask: ["none", isArbitraryVariable, isArbitraryValue]
      }],
      filter: [{
        filter: [
          "",
          "none",
          isArbitraryVariable,
          isArbitraryValue
        ]
      }],
      blur: [{
        blur: scaleBlur()
      }],
      brightness: [{
        brightness: [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      contrast: [{
        contrast: [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      "drop-shadow": [{
        "drop-shadow": [
          "",
          "none",
          themeDropShadow,
          isArbitraryVariableShadow,
          isArbitraryShadow
        ]
      }],
      "drop-shadow-color": [{
        "drop-shadow": scaleColor()
      }],
      grayscale: [{
        grayscale: ["", isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      "hue-rotate": [{
        "hue-rotate": [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      invert: [{
        invert: ["", isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      saturate: [{
        saturate: [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      sepia: [{
        sepia: ["", isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      "backdrop-filter": [{
        "backdrop-filter": [
          "",
          "none",
          isArbitraryVariable,
          isArbitraryValue
        ]
      }],
      "backdrop-blur": [{
        "backdrop-blur": scaleBlur()
      }],
      "backdrop-brightness": [{
        "backdrop-brightness": [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      "backdrop-contrast": [{
        "backdrop-contrast": [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      "backdrop-grayscale": [{
        "backdrop-grayscale": ["", isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      "backdrop-invert": [{
        "backdrop-invert": ["", isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      "backdrop-opacity": [{
        "backdrop-opacity": [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      "backdrop-saturate": [{
        "backdrop-saturate": [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      "backdrop-sepia": [{
        "backdrop-sepia": ["", isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      "border-spacing": [{
        "border-spacing": scaleUnambiguousSpacing()
      }],
      "border-spacing-x": [{
        "border-spacing-x": scaleUnambiguousSpacing()
      }],
      "border-spacing-y": [{
        "border-spacing-y": scaleUnambiguousSpacing()
      }],
      "table-layout": [{
        table: ["auto", "fixed"]
      }],
      caption: [{
        caption: ["top", "bottom"]
      }],
      transition: [{
        transition: ["", "all", "colors", "opacity", "shadow", "transform", "none", isArbitraryVariable, isArbitraryValue]
      }],
      "transition-behavior": [{
        transition: ["normal", "discrete"]
      }],
      duration: [{
        duration: [isNumber, "initial", isArbitraryVariable, isArbitraryValue]
      }],
      ease: [{
        ease: ["linear", "initial", themeEase, isArbitraryVariable, isArbitraryValue]
      }],
      delay: [{
        delay: [isNumber, isArbitraryVariable, isArbitraryValue]
      }],
      animate: [{
        animate: ["none", themeAnimate, isArbitraryVariable, isArbitraryValue]
      }],
      backface: [{
        backface: ["hidden", "visible"]
      }],
      perspective: [{
        perspective: [themePerspective, isArbitraryVariable, isArbitraryValue]
      }],
      "perspective-origin": [{
        "perspective-origin": scalePositionWithArbitrary()
      }],
      rotate: [{
        rotate: scaleRotate()
      }],
      "rotate-x": [{
        "rotate-x": scaleRotate()
      }],
      "rotate-y": [{
        "rotate-y": scaleRotate()
      }],
      "rotate-z": [{
        "rotate-z": scaleRotate()
      }],
      scale: [{
        scale: scaleScale()
      }],
      "scale-x": [{
        "scale-x": scaleScale()
      }],
      "scale-y": [{
        "scale-y": scaleScale()
      }],
      "scale-z": [{
        "scale-z": scaleScale()
      }],
      "scale-3d": ["scale-3d"],
      skew: [{
        skew: scaleSkew()
      }],
      "skew-x": [{
        "skew-x": scaleSkew()
      }],
      "skew-y": [{
        "skew-y": scaleSkew()
      }],
      transform: [{
        transform: [isArbitraryVariable, isArbitraryValue, "", "none", "gpu", "cpu"]
      }],
      "transform-origin": [{
        origin: scalePositionWithArbitrary()
      }],
      "transform-style": [{
        transform: ["3d", "flat"]
      }],
      translate: [{
        translate: scaleTranslate()
      }],
      "translate-x": [{
        "translate-x": scaleTranslate()
      }],
      "translate-y": [{
        "translate-y": scaleTranslate()
      }],
      "translate-z": [{
        "translate-z": scaleTranslate()
      }],
      "translate-none": ["translate-none"],
      accent: [{
        accent: scaleColor()
      }],
      appearance: [{
        appearance: ["none", "auto"]
      }],
      "caret-color": [{
        caret: scaleColor()
      }],
      "color-scheme": [{
        scheme: ["normal", "dark", "light", "light-dark", "only-dark", "only-light"]
      }],
      cursor: [{
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", isArbitraryVariable, isArbitraryValue]
      }],
      "field-sizing": [{
        "field-sizing": ["fixed", "content"]
      }],
      "pointer-events": [{
        "pointer-events": ["auto", "none"]
      }],
      resize: [{
        resize: ["none", "", "y", "x"]
      }],
      "scroll-behavior": [{
        scroll: ["auto", "smooth"]
      }],
      "scroll-m": [{
        "scroll-m": scaleUnambiguousSpacing()
      }],
      "scroll-mx": [{
        "scroll-mx": scaleUnambiguousSpacing()
      }],
      "scroll-my": [{
        "scroll-my": scaleUnambiguousSpacing()
      }],
      "scroll-ms": [{
        "scroll-ms": scaleUnambiguousSpacing()
      }],
      "scroll-me": [{
        "scroll-me": scaleUnambiguousSpacing()
      }],
      "scroll-mbs": [{
        "scroll-mbs": scaleUnambiguousSpacing()
      }],
      "scroll-mbe": [{
        "scroll-mbe": scaleUnambiguousSpacing()
      }],
      "scroll-mt": [{
        "scroll-mt": scaleUnambiguousSpacing()
      }],
      "scroll-mr": [{
        "scroll-mr": scaleUnambiguousSpacing()
      }],
      "scroll-mb": [{
        "scroll-mb": scaleUnambiguousSpacing()
      }],
      "scroll-ml": [{
        "scroll-ml": scaleUnambiguousSpacing()
      }],
      "scroll-p": [{
        "scroll-p": scaleUnambiguousSpacing()
      }],
      "scroll-px": [{
        "scroll-px": scaleUnambiguousSpacing()
      }],
      "scroll-py": [{
        "scroll-py": scaleUnambiguousSpacing()
      }],
      "scroll-ps": [{
        "scroll-ps": scaleUnambiguousSpacing()
      }],
      "scroll-pe": [{
        "scroll-pe": scaleUnambiguousSpacing()
      }],
      "scroll-pbs": [{
        "scroll-pbs": scaleUnambiguousSpacing()
      }],
      "scroll-pbe": [{
        "scroll-pbe": scaleUnambiguousSpacing()
      }],
      "scroll-pt": [{
        "scroll-pt": scaleUnambiguousSpacing()
      }],
      "scroll-pr": [{
        "scroll-pr": scaleUnambiguousSpacing()
      }],
      "scroll-pb": [{
        "scroll-pb": scaleUnambiguousSpacing()
      }],
      "scroll-pl": [{
        "scroll-pl": scaleUnambiguousSpacing()
      }],
      "snap-align": [{
        snap: ["start", "end", "center", "align-none"]
      }],
      "snap-stop": [{
        snap: ["normal", "always"]
      }],
      "snap-type": [{
        snap: ["none", "x", "y", "both"]
      }],
      "snap-strictness": [{
        snap: ["mandatory", "proximity"]
      }],
      touch: [{
        touch: ["auto", "none", "manipulation"]
      }],
      "touch-x": [{
        "touch-pan": ["x", "left", "right"]
      }],
      "touch-y": [{
        "touch-pan": ["y", "up", "down"]
      }],
      "touch-pz": ["touch-pinch-zoom"],
      select: [{
        select: ["none", "text", "all", "auto"]
      }],
      "will-change": [{
        "will-change": ["auto", "scroll", "contents", "transform", isArbitraryVariable, isArbitraryValue]
      }],
      fill: [{
        fill: ["none", ...scaleColor()]
      }],
      "stroke-w": [{
        stroke: [isNumber, isArbitraryVariableLength, isArbitraryLength, isArbitraryNumber]
      }],
      stroke: [{
        stroke: ["none", ...scaleColor()]
      }],
      "forced-color-adjust": [{
        "forced-color-adjust": ["auto", "none"]
      }]
    },
    conflictingClassGroups: {
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: ["inset-x", "inset-y", "inset-bs", "inset-be", "start", "end", "top", "right", "bottom", "left"],
      "inset-x": ["right", "left"],
      "inset-y": ["top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "ps", "pe", "pbs", "pbe", "pt", "pr", "pb", "pl"],
      px: ["pr", "pl"],
      py: ["pt", "pb"],
      m: ["mx", "my", "ms", "me", "mbs", "mbe", "mt", "mr", "mb", "ml"],
      mx: ["mr", "ml"],
      my: ["mt", "mb"],
      size: ["w", "h"],
      "font-size": ["leading"],
      "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      "line-clamp": ["display", "overflow"],
      rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
      "rounded-s": ["rounded-ss", "rounded-es"],
      "rounded-e": ["rounded-se", "rounded-ee"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": ["border-w-x", "border-w-y", "border-w-s", "border-w-e", "border-w-bs", "border-w-be", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
      "border-w-x": ["border-w-r", "border-w-l"],
      "border-w-y": ["border-w-t", "border-w-b"],
      "border-color": ["border-color-x", "border-color-y", "border-color-s", "border-color-e", "border-color-bs", "border-color-be", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
      "border-color-x": ["border-color-r", "border-color-l"],
      "border-color-y": ["border-color-t", "border-color-b"],
      translate: ["translate-x", "translate-y", "translate-none"],
      "translate-none": ["translate", "translate-x", "translate-y", "translate-z"],
      "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mbs", "scroll-mbe", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
      "scroll-mx": ["scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mt", "scroll-mb"],
      "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pbs", "scroll-pbe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
      "scroll-px": ["scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pt", "scroll-pb"],
      touch: ["touch-x", "touch-y", "touch-pz"],
      "touch-x": ["touch"],
      "touch-y": ["touch"],
      "touch-pz": ["touch"]
    },
    conflictingClassGroupModifiers: {
      "font-size": ["leading"]
    },
    orderSensitiveModifiers: ["*", "**", "after", "backdrop", "before", "details-content", "file", "first-letter", "first-line", "marker", "placeholder", "selection"]
  };
};
var twMerge = /* @__PURE__ */ createTailwindMerge(getDefaultConfig);

// src/lib/utils.ts
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// src/components/ui/card.tsx
var jsx_dev_runtime = __toESM(require_jsx_dev_runtime(), 1);
function Card({ className, ...props }) {
  return /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
    "data-slot": "card",
    className: cn("bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm", className),
    ...props
  }, undefined, false, undefined, this);
}
function CardHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
    "data-slot": "card-header",
    className: cn("@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6", className),
    ...props
  }, undefined, false, undefined, this);
}
function CardTitle({ className, ...props }) {
  return /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
    "data-slot": "card-title",
    className: cn("leading-none font-semibold", className),
    ...props
  }, undefined, false, undefined, this);
}
function CardContent({ className, ...props }) {
  return /* @__PURE__ */ jsx_dev_runtime.jsxDEV("div", {
    "data-slot": "card-content",
    className: cn("px-6", className),
    ...props
  }, undefined, false, undefined, this);
}

// node_modules/@radix-ui/react-slot/dist/index.mjs
var exports_dist = {};
__export(exports_dist, {
  createSlottable: () => createSlottable,
  createSlot: () => createSlot,
  Slottable: () => Slottable,
  Slot: () => Slot,
  Root: () => Slot
});
var React2 = __toESM(require_react(), 1);

// node_modules/@radix-ui/react-compose-refs/dist/index.mjs
var React = __toESM(require_react(), 1);
function setRef(ref, value) {
  if (typeof ref === "function") {
    return ref(value);
  } else if (ref !== null && ref !== undefined) {
    ref.current = value;
  }
}
function composeRefs(...refs) {
  return (node) => {
    let hasCleanup = false;
    const cleanups = refs.map((ref) => {
      const cleanup = setRef(ref, node);
      if (!hasCleanup && typeof cleanup == "function") {
        hasCleanup = true;
      }
      return cleanup;
    });
    if (hasCleanup) {
      return () => {
        for (let i = 0;i < cleanups.length; i++) {
          const cleanup = cleanups[i];
          if (typeof cleanup == "function") {
            cleanup();
          } else {
            setRef(refs[i], null);
          }
        }
      };
    }
  };
}

// node_modules/@radix-ui/react-slot/dist/index.mjs
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
function createSlot(ownerName) {
  const SlotClone = /* @__PURE__ */ createSlotClone(ownerName);
  const Slot2 = React2.forwardRef((props, forwardedRef) => {
    const { children, ...slotProps } = props;
    const childrenArray = React2.Children.toArray(children);
    const slottable = childrenArray.find(isSlottable);
    if (slottable) {
      const newElement = slottable.props.children;
      const newChildren = childrenArray.map((child) => {
        if (child === slottable) {
          if (React2.Children.count(newElement) > 1)
            return React2.Children.only(null);
          return React2.isValidElement(newElement) ? newElement.props.children : null;
        } else {
          return child;
        }
      });
      return /* @__PURE__ */ import_jsx_runtime.jsx(SlotClone, { ...slotProps, ref: forwardedRef, children: React2.isValidElement(newElement) ? React2.cloneElement(newElement, undefined, newChildren) : null });
    }
    return /* @__PURE__ */ import_jsx_runtime.jsx(SlotClone, { ...slotProps, ref: forwardedRef, children });
  });
  Slot2.displayName = `${ownerName}.Slot`;
  return Slot2;
}
var Slot = /* @__PURE__ */ createSlot("Slot");
function createSlotClone(ownerName) {
  const SlotClone = React2.forwardRef((props, forwardedRef) => {
    const { children, ...slotProps } = props;
    if (React2.isValidElement(children)) {
      const childrenRef = getElementRef(children);
      const props2 = mergeProps(slotProps, children.props);
      if (children.type !== React2.Fragment) {
        props2.ref = forwardedRef ? composeRefs(forwardedRef, childrenRef) : childrenRef;
      }
      return React2.cloneElement(children, props2);
    }
    return React2.Children.count(children) > 1 ? React2.Children.only(null) : null;
  });
  SlotClone.displayName = `${ownerName}.SlotClone`;
  return SlotClone;
}
var SLOTTABLE_IDENTIFIER = Symbol("radix.slottable");
function createSlottable(ownerName) {
  const Slottable2 = ({ children }) => {
    return /* @__PURE__ */ import_jsx_runtime.jsx(import_jsx_runtime.Fragment, { children });
  };
  Slottable2.displayName = `${ownerName}.Slottable`;
  Slottable2.__radixId = SLOTTABLE_IDENTIFIER;
  return Slottable2;
}
var Slottable = /* @__PURE__ */ createSlottable("Slottable");
function isSlottable(child) {
  return React2.isValidElement(child) && typeof child.type === "function" && "__radixId" in child.type && child.type.__radixId === SLOTTABLE_IDENTIFIER;
}
function mergeProps(slotProps, childProps) {
  const overrideProps = { ...childProps };
  for (const propName in childProps) {
    const slotPropValue = slotProps[propName];
    const childPropValue = childProps[propName];
    const isHandler = /^on[A-Z]/.test(propName);
    if (isHandler) {
      if (slotPropValue && childPropValue) {
        overrideProps[propName] = (...args) => {
          const result = childPropValue(...args);
          slotPropValue(...args);
          return result;
        };
      } else if (slotPropValue) {
        overrideProps[propName] = slotPropValue;
      }
    } else if (propName === "style") {
      overrideProps[propName] = { ...slotPropValue, ...childPropValue };
    } else if (propName === "className") {
      overrideProps[propName] = [slotPropValue, childPropValue].filter(Boolean).join(" ");
    }
  }
  return { ...slotProps, ...overrideProps };
}
function getElementRef(element) {
  let getter = Object.getOwnPropertyDescriptor(element.props, "ref")?.get;
  let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.ref;
  }
  getter = Object.getOwnPropertyDescriptor(element, "ref")?.get;
  mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) {
    return element.props.ref;
  }
  return element.props.ref || element.ref;
}

// node_modules/@radix-ui/react-context/dist/index.mjs
var React3 = __toESM(require_react(), 1);
var import_jsx_runtime2 = __toESM(require_jsx_runtime(), 1);
function createContextScope(scopeName, createContextScopeDeps = []) {
  let defaultContexts = [];
  function createContext3(rootComponentName, defaultContext) {
    const BaseContext = React3.createContext(defaultContext);
    const index = defaultContexts.length;
    defaultContexts = [...defaultContexts, defaultContext];
    const Provider = (props) => {
      const { scope, children, ...context } = props;
      const Context = scope?.[scopeName]?.[index] || BaseContext;
      const value = React3.useMemo(() => context, Object.values(context));
      return /* @__PURE__ */ import_jsx_runtime2.jsx(Context.Provider, { value, children });
    };
    Provider.displayName = rootComponentName + "Provider";
    function useContext2(consumerName, scope) {
      const Context = scope?.[scopeName]?.[index] || BaseContext;
      const context = React3.useContext(Context);
      if (context)
        return context;
      if (defaultContext !== undefined)
        return defaultContext;
      throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
    }
    return [Provider, useContext2];
  }
  const createScope = () => {
    const scopeContexts = defaultContexts.map((defaultContext) => {
      return React3.createContext(defaultContext);
    });
    return function useScope(scope) {
      const contexts = scope?.[scopeName] || scopeContexts;
      return React3.useMemo(() => ({ [`__scope${scopeName}`]: { ...scope, [scopeName]: contexts } }), [scope, contexts]);
    };
  };
  createScope.scopeName = scopeName;
  return [createContext3, composeContextScopes(createScope, ...createContextScopeDeps)];
}
function composeContextScopes(...scopes) {
  const baseScope = scopes[0];
  if (scopes.length === 1)
    return baseScope;
  const createScope = () => {
    const scopeHooks = scopes.map((createScope2) => ({
      useScope: createScope2(),
      scopeName: createScope2.scopeName
    }));
    return function useComposedScopes(overrideScopes) {
      const nextScopes = scopeHooks.reduce((nextScopes2, { useScope, scopeName }) => {
        const scopeProps = useScope(overrideScopes);
        const currentScope = scopeProps[`__scope${scopeName}`];
        return { ...nextScopes2, ...currentScope };
      }, {});
      return React3.useMemo(() => ({ [`__scope${baseScope.scopeName}`]: nextScopes }), [nextScopes]);
    };
  };
  createScope.scopeName = baseScope.scopeName;
  return createScope;
}

// node_modules/@radix-ui/react-use-layout-effect/dist/index.mjs
var React4 = __toESM(require_react(), 1);
var useLayoutEffect2 = globalThis?.document ? React4.useLayoutEffect : () => {};

// node_modules/@radix-ui/react-use-callback-ref/dist/index.mjs
var React5 = __toESM(require_react(), 1);
function useCallbackRef(callback) {
  const callbackRef = React5.useRef(callback);
  React5.useEffect(() => {
    callbackRef.current = callback;
  });
  return React5.useMemo(() => (...args) => callbackRef.current?.(...args), []);
}

// node_modules/@radix-ui/react-avatar/dist/index.mjs
var exports_dist2 = {};
__export(exports_dist2, {
  createAvatarScope: () => createAvatarScope,
  Root: () => Root,
  Image: () => Image,
  Fallback: () => Fallback,
  AvatarImage: () => AvatarImage,
  AvatarFallback: () => AvatarFallback,
  Avatar: () => Avatar
});
var React7 = __toESM(require_react(), 1);

// node_modules/@radix-ui/react-avatar/node_modules/@radix-ui/react-primitive/dist/index.mjs
var React6 = __toESM(require_react(), 1);
var ReactDOM = __toESM(require_react_dom(), 1);
var import_jsx_runtime3 = __toESM(require_jsx_runtime(), 1);
var NODES = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "select",
  "span",
  "svg",
  "ul"
];
var Primitive = NODES.reduce((primitive, node) => {
  const Slot2 = createSlot(`Primitive.${node}`);
  const Node = React6.forwardRef((props, forwardedRef) => {
    const { asChild, ...primitiveProps } = props;
    const Comp = asChild ? Slot2 : node;
    if (typeof window !== "undefined") {
      window[Symbol.for("radix-ui")] = true;
    }
    return /* @__PURE__ */ import_jsx_runtime3.jsx(Comp, { ...primitiveProps, ref: forwardedRef });
  });
  Node.displayName = `Primitive.${node}`;
  return { ...primitive, [node]: Node };
}, {});

// node_modules/@radix-ui/react-use-is-hydrated/dist/index.mjs
var import_shim = __toESM(require_shim(), 1);
function useIsHydrated() {
  return import_shim.useSyncExternalStore(subscribe, () => true, () => false);
}
function subscribe() {
  return () => {};
}

// node_modules/@radix-ui/react-avatar/dist/index.mjs
var import_jsx_runtime4 = __toESM(require_jsx_runtime(), 1);
"use client";
var AVATAR_NAME = "Avatar";
var [createAvatarContext, createAvatarScope] = createContextScope(AVATAR_NAME);
var [AvatarProvider, useAvatarContext] = createAvatarContext(AVATAR_NAME);
var Avatar = React7.forwardRef((props, forwardedRef) => {
  const { __scopeAvatar, ...avatarProps } = props;
  const [imageLoadingStatus, setImageLoadingStatus] = React7.useState("idle");
  return /* @__PURE__ */ import_jsx_runtime4.jsx(AvatarProvider, {
    scope: __scopeAvatar,
    imageLoadingStatus,
    onImageLoadingStatusChange: setImageLoadingStatus,
    children: /* @__PURE__ */ import_jsx_runtime4.jsx(Primitive.span, { ...avatarProps, ref: forwardedRef })
  });
});
Avatar.displayName = AVATAR_NAME;
var IMAGE_NAME = "AvatarImage";
var AvatarImage = React7.forwardRef((props, forwardedRef) => {
  const { __scopeAvatar, src, onLoadingStatusChange = () => {}, ...imageProps } = props;
  const context = useAvatarContext(IMAGE_NAME, __scopeAvatar);
  const imageLoadingStatus = useImageLoadingStatus(src, imageProps);
  const handleLoadingStatusChange = useCallbackRef((status) => {
    onLoadingStatusChange(status);
    context.onImageLoadingStatusChange(status);
  });
  useLayoutEffect2(() => {
    if (imageLoadingStatus !== "idle") {
      handleLoadingStatusChange(imageLoadingStatus);
    }
  }, [imageLoadingStatus, handleLoadingStatusChange]);
  return imageLoadingStatus === "loaded" ? /* @__PURE__ */ import_jsx_runtime4.jsx(Primitive.img, { ...imageProps, ref: forwardedRef, src }) : null;
});
AvatarImage.displayName = IMAGE_NAME;
var FALLBACK_NAME = "AvatarFallback";
var AvatarFallback = React7.forwardRef((props, forwardedRef) => {
  const { __scopeAvatar, delayMs, ...fallbackProps } = props;
  const context = useAvatarContext(FALLBACK_NAME, __scopeAvatar);
  const [canRender, setCanRender] = React7.useState(delayMs === undefined);
  React7.useEffect(() => {
    if (delayMs !== undefined) {
      const timerId = window.setTimeout(() => setCanRender(true), delayMs);
      return () => window.clearTimeout(timerId);
    }
  }, [delayMs]);
  return canRender && context.imageLoadingStatus !== "loaded" ? /* @__PURE__ */ import_jsx_runtime4.jsx(Primitive.span, { ...fallbackProps, ref: forwardedRef }) : null;
});
AvatarFallback.displayName = FALLBACK_NAME;
function resolveLoadingStatus(image, src) {
  if (!image) {
    return "idle";
  }
  if (!src) {
    return "error";
  }
  if (image.src !== src) {
    image.src = src;
  }
  return image.complete && image.naturalWidth > 0 ? "loaded" : "loading";
}
function useImageLoadingStatus(src, { referrerPolicy, crossOrigin }) {
  const isHydrated = useIsHydrated();
  const imageRef = React7.useRef(null);
  const image = (() => {
    if (!isHydrated)
      return null;
    if (!imageRef.current) {
      imageRef.current = new window.Image;
    }
    return imageRef.current;
  })();
  const [loadingStatus, setLoadingStatus] = React7.useState(() => resolveLoadingStatus(image, src));
  useLayoutEffect2(() => {
    setLoadingStatus(resolveLoadingStatus(image, src));
  }, [image, src]);
  useLayoutEffect2(() => {
    const updateStatus = (status) => () => {
      setLoadingStatus(status);
    };
    if (!image)
      return;
    const handleLoad = updateStatus("loaded");
    const handleError = updateStatus("error");
    image.addEventListener("load", handleLoad);
    image.addEventListener("error", handleError);
    if (referrerPolicy) {
      image.referrerPolicy = referrerPolicy;
    }
    if (typeof crossOrigin === "string") {
      image.crossOrigin = crossOrigin;
    }
    return () => {
      image.removeEventListener("load", handleLoad);
      image.removeEventListener("error", handleError);
    };
  }, [image, crossOrigin, referrerPolicy]);
  return loadingStatus;
}
var Root = Avatar;
var Image = AvatarImage;
var Fallback = AvatarFallback;

// src/components/ui/avatar.tsx
var jsx_dev_runtime2 = __toESM(require_jsx_dev_runtime(), 1);
"use client";
function Avatar2({
  className,
  size = "default",
  ...props
}) {
  return /* @__PURE__ */ jsx_dev_runtime2.jsxDEV(exports_dist2.Root, {
    "data-slot": "avatar",
    "data-size": size,
    className: cn("group/avatar relative flex size-8 shrink-0 overflow-hidden rounded-full select-none data-[size=lg]:size-10 data-[size=sm]:size-6", className),
    ...props
  }, undefined, false, undefined, this);
}
function AvatarImage2({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx_dev_runtime2.jsxDEV(exports_dist2.Image, {
    "data-slot": "avatar-image",
    className: cn("aspect-square size-full", className),
    ...props
  }, undefined, false, undefined, this);
}
function AvatarFallback2({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx_dev_runtime2.jsxDEV(exports_dist2.Fallback, {
    "data-slot": "avatar-fallback",
    className: cn("bg-muted text-muted-foreground flex size-full items-center justify-center rounded-full text-sm group-data-[size=sm]/avatar:text-xs", className),
    ...props
  }, undefined, false, undefined, this);
}

// node_modules/class-variance-authority/dist/index.mjs
var falsyToString = (value) => typeof value === "boolean" ? `${value}` : value === 0 ? "0" : value;
var cx = clsx;
var cva = (base, config) => (props) => {
  var _config_compoundVariants;
  if ((config === null || config === undefined ? undefined : config.variants) == null)
    return cx(base, props === null || props === undefined ? undefined : props.class, props === null || props === undefined ? undefined : props.className);
  const { variants, defaultVariants } = config;
  const getVariantClassNames = Object.keys(variants).map((variant) => {
    const variantProp = props === null || props === undefined ? undefined : props[variant];
    const defaultVariantProp = defaultVariants === null || defaultVariants === undefined ? undefined : defaultVariants[variant];
    if (variantProp === null)
      return null;
    const variantKey = falsyToString(variantProp) || falsyToString(defaultVariantProp);
    return variants[variant][variantKey];
  });
  const propsWithoutUndefined = props && Object.entries(props).reduce((acc, param) => {
    let [key, value] = param;
    if (value === undefined) {
      return acc;
    }
    acc[key] = value;
    return acc;
  }, {});
  const getCompoundVariantClassNames = config === null || config === undefined ? undefined : (_config_compoundVariants = config.compoundVariants) === null || _config_compoundVariants === undefined ? undefined : _config_compoundVariants.reduce((acc, param) => {
    let { class: cvClass, className: cvClassName, ...compoundVariantOptions } = param;
    return Object.entries(compoundVariantOptions).every((param2) => {
      let [key, value] = param2;
      return Array.isArray(value) ? value.includes({
        ...defaultVariants,
        ...propsWithoutUndefined
      }[key]) : {
        ...defaultVariants,
        ...propsWithoutUndefined
      }[key] === value;
    }) ? [
      ...acc,
      cvClass,
      cvClassName
    ] : acc;
  }, []);
  return cx(base, getVariantClassNames, getCompoundVariantClassNames, props === null || props === undefined ? undefined : props.class, props === null || props === undefined ? undefined : props.className);
};

// src/components/ui/button.tsx
var jsx_dev_runtime3 = __toESM(require_jsx_dev_runtime(), 1);
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", {
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground hover:bg-primary/90",
      destructive: "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
      outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
      link: "text-primary underline-offset-4 hover:underline"
    },
    size: {
      default: "h-9 px-4 py-2 has-[>svg]:px-3",
      xs: "h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
      sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
      lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
      icon: "size-9",
      "icon-xs": "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
      "icon-sm": "size-8",
      "icon-lg": "size-10"
    }
  },
  defaultVariants: {
    variant: "default",
    size: "default"
  }
});
function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}) {
  const Comp = asChild ? exports_dist.Root : "button";
  return /* @__PURE__ */ jsx_dev_runtime3.jsxDEV(Comp, {
    "data-slot": "button",
    "data-variant": variant,
    "data-size": size,
    className: cn(buttonVariants({ variant, size, className })),
    ...props
  }, undefined, false, undefined, this);
}

// src/components/ui/badge.tsx
var jsx_dev_runtime4 = __toESM(require_jsx_dev_runtime(), 1);
var badgeVariants = cva("inline-flex items-center justify-center rounded-full border border-transparent px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden", {
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
      secondary: "bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
      destructive: "bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
      outline: "border-border text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
      ghost: "[a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
      link: "text-primary underline-offset-4 [a&]:hover:underline"
    }
  },
  defaultVariants: {
    variant: "default"
  }
});
function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}) {
  const Comp = asChild ? exports_dist.Root : "span";
  return /* @__PURE__ */ jsx_dev_runtime4.jsxDEV(Comp, {
    "data-slot": "badge",
    "data-variant": variant,
    className: cn(badgeVariants({ variant }), className),
    ...props
  }, undefined, false, undefined, this);
}

// src/components/navigation/bottom-nav.tsx
var import_link = __toESM(require_link(), 1);
var import_navigation = __toESM(require_navigation(), 1);

// node_modules/lucide-react/dist/esm/createLucideIcon.js
var import_react2 = __toESM(require_react(), 1);

// node_modules/lucide-react/dist/esm/shared/src/utils/mergeClasses.js
var mergeClasses = (...classes) => classes.filter((className, index, array) => {
  return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
}).join(" ").trim();

// node_modules/lucide-react/dist/esm/shared/src/utils/toKebabCase.js
var toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();

// node_modules/lucide-react/dist/esm/shared/src/utils/toCamelCase.js
var toCamelCase = (string) => string.replace(/^([A-Z])|[\s-_]+(\w)/g, (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase());

// node_modules/lucide-react/dist/esm/shared/src/utils/toPascalCase.js
var toPascalCase = (string) => {
  const camelCase = toCamelCase(string);
  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
};

// node_modules/lucide-react/dist/esm/Icon.js
var import_react = __toESM(require_react(), 1);

// node_modules/lucide-react/dist/esm/defaultAttributes.js
var defaultAttributes = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};

// node_modules/lucide-react/dist/esm/shared/src/utils/hasA11yProp.js
var hasA11yProp = (props) => {
  for (const prop in props) {
    if (prop.startsWith("aria-") || prop === "role" || prop === "title") {
      return true;
    }
  }
  return false;
};

// node_modules/lucide-react/dist/esm/Icon.js
var Icon = import_react.forwardRef(({
  color = "currentColor",
  size = 24,
  strokeWidth = 2,
  absoluteStrokeWidth,
  className = "",
  children,
  iconNode,
  ...rest
}, ref) => import_react.createElement("svg", {
  ref,
  ...defaultAttributes,
  width: size,
  height: size,
  stroke: color,
  strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
  className: mergeClasses("lucide", className),
  ...!children && !hasA11yProp(rest) && { "aria-hidden": "true" },
  ...rest
}, [
  ...iconNode.map(([tag, attrs]) => import_react.createElement(tag, attrs)),
  ...Array.isArray(children) ? children : [children]
]));

// node_modules/lucide-react/dist/esm/createLucideIcon.js
var createLucideIcon = (iconName, iconNode) => {
  const Component = import_react2.forwardRef(({ className, ...props }, ref) => import_react2.createElement(Icon, {
    ref,
    iconNode,
    className: mergeClasses(`lucide-${toKebabCase(toPascalCase(iconName))}`, `lucide-${iconName}`, className),
    ...props
  }));
  Component.displayName = toPascalCase(iconName);
  return Component;
};

// node_modules/lucide-react/dist/esm/icons/arrow-down-right.js
var __iconNode = [
  ["path", { d: "m7 7 10 10", key: "1fmybs" }],
  ["path", { d: "M17 7v10H7", key: "6fjiku" }]
];
var ArrowDownRight = createLucideIcon("arrow-down-right", __iconNode);

// node_modules/lucide-react/dist/esm/icons/arrow-up-right.js
var __iconNode2 = [
  ["path", { d: "M7 7h10v10", key: "1tivn9" }],
  ["path", { d: "M7 17 17 7", key: "1vkiza" }]
];
var ArrowUpRight = createLucideIcon("arrow-up-right", __iconNode2);

// node_modules/lucide-react/dist/esm/icons/briefcase.js
var __iconNode3 = [
  ["path", { d: "M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16", key: "jecpp" }],
  ["rect", { width: "20", height: "14", x: "2", y: "6", rx: "2", key: "i6l2r4" }]
];
var Briefcase = createLucideIcon("briefcase", __iconNode3);

// node_modules/lucide-react/dist/esm/icons/car.js
var __iconNode4 = [
  [
    "path",
    {
      d: "M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2",
      key: "5owen"
    }
  ],
  ["circle", { cx: "7", cy: "17", r: "2", key: "u2ysq9" }],
  ["path", { d: "M9 17h6", key: "r8uit2" }],
  ["circle", { cx: "17", cy: "17", r: "2", key: "axvx0g" }]
];
var Car = createLucideIcon("car", __iconNode4);

// node_modules/lucide-react/dist/esm/icons/clapperboard.js
var __iconNode5 = [
  ["path", { d: "m12.296 3.464 3.02 3.956", key: "qash78" }],
  [
    "path",
    { d: "M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3z", key: "1h7j8b" }
  ],
  ["path", { d: "M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z", key: "4lm6w1" }],
  ["path", { d: "m6.18 5.276 3.1 3.899", key: "zjj9t3" }]
];
var Clapperboard = createLucideIcon("clapperboard", __iconNode5);

// node_modules/lucide-react/dist/esm/icons/dumbbell.js
var __iconNode6 = [
  [
    "path",
    {
      d: "M17.596 12.768a2 2 0 1 0 2.829-2.829l-1.768-1.767a2 2 0 0 0 2.828-2.829l-2.828-2.828a2 2 0 0 0-2.829 2.828l-1.767-1.768a2 2 0 1 0-2.829 2.829z",
      key: "9m4mmf"
    }
  ],
  ["path", { d: "m2.5 21.5 1.4-1.4", key: "17g3f0" }],
  ["path", { d: "m20.1 3.9 1.4-1.4", key: "1qn309" }],
  [
    "path",
    {
      d: "M5.343 21.485a2 2 0 1 0 2.829-2.828l1.767 1.768a2 2 0 1 0 2.829-2.829l-6.364-6.364a2 2 0 1 0-2.829 2.829l1.768 1.767a2 2 0 0 0-2.828 2.829z",
      key: "1t2c92"
    }
  ],
  ["path", { d: "m9.6 14.4 4.8-4.8", key: "6umqxw" }]
];
var Dumbbell = createLucideIcon("dumbbell", __iconNode6);

// node_modules/lucide-react/dist/esm/icons/eye.js
var __iconNode7 = [
  [
    "path",
    {
      d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
      key: "1nclc0"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
];
var Eye = createLucideIcon("eye", __iconNode7);

// node_modules/lucide-react/dist/esm/icons/eye-off.js
var __iconNode8 = [
  [
    "path",
    {
      d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",
      key: "ct8e1f"
    }
  ],
  ["path", { d: "M14.084 14.158a3 3 0 0 1-4.242-4.242", key: "151rxh" }],
  [
    "path",
    {
      d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",
      key: "13bj9a"
    }
  ],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
];
var EyeOff = createLucideIcon("eye-off", __iconNode8);

// node_modules/lucide-react/dist/esm/icons/gift.js
var __iconNode9 = [
  ["path", { d: "M12 7v14", key: "1akyts" }],
  ["path", { d: "M20 11v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8", key: "1sqzm4" }],
  [
    "path",
    { d: "M7.5 7a1 1 0 0 1 0-5A4.8 8 0 0 1 12 7a4.8 8 0 0 1 4.5-5 1 1 0 0 1 0 5", key: "kc0143" }
  ],
  ["rect", { x: "3", y: "7", width: "18", height: "4", rx: "1", key: "1hberx" }]
];
var Gift = createLucideIcon("gift", __iconNode9);

// node_modules/lucide-react/dist/esm/icons/heart-pulse.js
var __iconNode10 = [
  [
    "path",
    {
      d: "M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5",
      key: "mvr1a0"
    }
  ],
  ["path", { d: "M3.22 13H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27", key: "auskq0" }]
];
var HeartPulse = createLucideIcon("heart-pulse", __iconNode10);

// node_modules/lucide-react/dist/esm/icons/heart.js
var __iconNode11 = [
  [
    "path",
    {
      d: "M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5",
      key: "mvr1a0"
    }
  ]
];
var Heart = createLucideIcon("heart", __iconNode11);

// node_modules/lucide-react/dist/esm/icons/house.js
var __iconNode12 = [
  ["path", { d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8", key: "5wwlr5" }],
  [
    "path",
    {
      d: "M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
      key: "r6nss1"
    }
  ]
];
var House = createLucideIcon("house", __iconNode12);

// node_modules/lucide-react/dist/esm/icons/message-circle.js
var __iconNode13 = [
  [
    "path",
    {
      d: "M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719",
      key: "1sd12s"
    }
  ]
];
var MessageCircle = createLucideIcon("message-circle", __iconNode13);

// node_modules/lucide-react/dist/esm/icons/plane.js
var __iconNode14 = [
  [
    "path",
    {
      d: "M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z",
      key: "1v9wt8"
    }
  ]
];
var Plane = createLucideIcon("plane", __iconNode14);

// node_modules/lucide-react/dist/esm/icons/receipt.js
var __iconNode15 = [
  [
    "path",
    { d: "M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z", key: "q3az6g" }
  ],
  ["path", { d: "M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8", key: "1h4pet" }],
  ["path", { d: "M12 17.5v-11", key: "1jc1ny" }]
];
var Receipt = createLucideIcon("receipt", __iconNode15);

// node_modules/lucide-react/dist/esm/icons/scissors.js
var __iconNode16 = [
  ["circle", { cx: "6", cy: "6", r: "3", key: "1lh9wr" }],
  ["path", { d: "M8.12 8.12 12 12", key: "1alkpv" }],
  ["path", { d: "M20 4 8.12 15.88", key: "xgtan2" }],
  ["circle", { cx: "6", cy: "18", r: "3", key: "fqmcym" }],
  ["path", { d: "M14.8 14.8 20 20", key: "ptml3r" }]
];
var Scissors = createLucideIcon("scissors", __iconNode16);

// node_modules/lucide-react/dist/esm/icons/settings.js
var __iconNode17 = [
  [
    "path",
    {
      d: "M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",
      key: "1i5ecw"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
];
var Settings = createLucideIcon("settings", __iconNode17);

// node_modules/lucide-react/dist/esm/icons/shopping-bag.js
var __iconNode18 = [
  ["path", { d: "M16 10a4 4 0 0 1-8 0", key: "1ltviw" }],
  ["path", { d: "M3.103 6.034h17.794", key: "awc11p" }],
  [
    "path",
    {
      d: "M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z",
      key: "o988cm"
    }
  ]
];
var ShoppingBag = createLucideIcon("shopping-bag", __iconNode18);

// node_modules/lucide-react/dist/esm/icons/shopping-cart.js
var __iconNode19 = [
  ["circle", { cx: "8", cy: "21", r: "1", key: "jimo8o" }],
  ["circle", { cx: "19", cy: "21", r: "1", key: "13723u" }],
  [
    "path",
    {
      d: "M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12",
      key: "9zh506"
    }
  ]
];
var ShoppingCart = createLucideIcon("shopping-cart", __iconNode19);

// node_modules/lucide-react/dist/esm/icons/trending-up.js
var __iconNode20 = [
  ["path", { d: "M16 7h6v6", key: "box55l" }],
  ["path", { d: "m22 7-8.5 8.5-5-5L2 17", key: "1t1m79" }]
];
var TrendingUp = createLucideIcon("trending-up", __iconNode20);

// node_modules/lucide-react/dist/esm/icons/users.js
var __iconNode21 = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["path", { d: "M16 3.128a4 4 0 0 1 0 7.744", key: "16gr8j" }],
  ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }]
];
var Users = createLucideIcon("users", __iconNode21);

// node_modules/lucide-react/dist/esm/icons/utensils.js
var __iconNode22 = [
  ["path", { d: "M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2", key: "cjf0a3" }],
  ["path", { d: "M7 2v20", key: "1473qp" }],
  ["path", { d: "M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7", key: "j28e5" }]
];
var Utensils = createLucideIcon("utensils", __iconNode22);

// node_modules/lucide-react/dist/esm/icons/wallet.js
var __iconNode23 = [
  [
    "path",
    {
      d: "M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1",
      key: "18etb6"
    }
  ],
  ["path", { d: "M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4", key: "xoc0q4" }]
];
var Wallet = createLucideIcon("wallet", __iconNode23);

// node_modules/lucide-react/dist/esm/icons/zap.js
var __iconNode24 = [
  [
    "path",
    {
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
];
var Zap = createLucideIcon("zap", __iconNode24);
// src/components/navigation/bottom-nav.tsx
var jsx_dev_runtime5 = __toESM(require_jsx_dev_runtime(), 1);
"use client";
var navItems = [
  {
    href: "/dashboard",
    label: "Home",
    icon: House
  },
  {
    href: "/chat",
    label: "Chat",
    icon: MessageCircle
  },
  {
    href: "/social",
    label: "Social",
    icon: Users
  },
  {
    href: "/settings",
    label: "Settings",
    icon: Settings
  }
];
function BottomNav() {
  const pathname = import_navigation.usePathname();
  return /* @__PURE__ */ jsx_dev_runtime5.jsxDEV("nav", {
    className: "fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-t border-border/50 safe-area-pb",
    children: /* @__PURE__ */ jsx_dev_runtime5.jsxDEV("div", {
      className: "mx-auto w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl px-4",
      children: /* @__PURE__ */ jsx_dev_runtime5.jsxDEV("div", {
        className: "flex items-center justify-around py-2",
        children: navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon2 = item.icon;
          return /* @__PURE__ */ jsx_dev_runtime5.jsxDEV(import_link.default, {
            href: item.href,
            className: cn("flex flex-col items-center gap-1 px-3 sm:px-4 py-2 rounded-xl transition-all duration-200 min-w-[64px] sm:min-w-[80px]", isActive ? "text-foreground bg-primary/15 shadow-[0_0_12px_rgba(var(--primary),0.15)]" : "text-muted-foreground hover:text-foreground hover:bg-accent"),
            children: [
              /* @__PURE__ */ jsx_dev_runtime5.jsxDEV(Icon2, {
                className: cn("size-5 transition-all duration-200", isActive && "scale-110")
              }, undefined, false, undefined, this),
              /* @__PURE__ */ jsx_dev_runtime5.jsxDEV("span", {
                className: "text-[10px] sm:text-xs font-medium",
                children: item.label
              }, undefined, false, undefined, this)
            ]
          }, item.href, true, undefined, this);
        })
      }, undefined, false, undefined, this)
    }, undefined, false, undefined, this)
  }, undefined, false, undefined, this);
}

// src/app/dashboard/dashboard-client.tsx
var import_react3 = __toESM(require_react(), 1);

// data/history.json
var history_default = [
  {
    id: 1,
    type: "Income",
    name: "Tech Corp - Monthly Salary",
    category: "Salary",
    amount: 3200,
    date: "2026-02-01"
  },
  {
    id: 2,
    type: "Expense",
    name: "Monthly Rent",
    category: "Housing",
    amount: 1200,
    date: "2026-02-01"
  },
  {
    id: 3,
    type: "Expense",
    name: "Starbucks Coffee",
    category: "Food & Dining",
    amount: 4.5,
    date: "2026-02-01"
  },
  {
    id: 4,
    type: "Expense",
    name: "Whole Foods Market",
    category: "Groceries",
    amount: 85.2,
    date: "2026-02-02"
  },
  {
    id: 5,
    type: "Expense",
    name: "Uber Ride",
    category: "Transportation",
    amount: 15.4,
    date: "2026-02-02"
  },
  {
    id: 6,
    type: "Expense",
    name: "Netflix Subscription",
    category: "Entertainment",
    amount: 15.99,
    date: "2026-02-03"
  },
  {
    id: 7,
    type: "Income",
    name: "Freelance Web Design",
    category: "Freelance",
    amount: 450,
    date: "2026-02-03"
  },
  {
    id: 8,
    type: "Expense",
    name: "Shell Gas Station",
    category: "Transportation",
    amount: 45,
    date: "2026-02-03"
  },
  {
    id: 9,
    type: "Expense",
    name: "Pharmacy - Aspirin",
    category: "Health",
    amount: 8.5,
    date: "2026-02-04"
  },
  {
    id: 10,
    type: "Expense",
    name: "Gym Membership",
    category: "Health & Fitness",
    amount: 49.99,
    date: "2026-02-05"
  },
  {
    id: 11,
    type: "Expense",
    name: "Local Bakery",
    category: "Food & Dining",
    amount: 12.3,
    date: "2026-02-05"
  },
  {
    id: 12,
    type: "Expense",
    name: "Internet Bill",
    category: "Utilities",
    amount: 60,
    date: "2026-02-06"
  },
  {
    id: 13,
    type: "Expense",
    name: "Spotify Premium",
    category: "Entertainment",
    amount: 10.99,
    date: "2026-02-06"
  },
  {
    id: 14,
    type: "Income",
    name: "Sold Old Bike on eBay",
    category: "Sales",
    amount: 120,
    date: "2026-02-07"
  },
  {
    id: 15,
    type: "Expense",
    name: "Amazon - Books",
    category: "Shopping",
    amount: 32.5,
    date: "2026-02-07"
  },
  {
    id: 16,
    type: "Expense",
    name: "Pizza Delivery",
    category: "Food & Dining",
    amount: 24,
    date: "2026-02-08"
  },
  {
    id: 17,
    type: "Expense",
    name: "Electricity Bill",
    category: "Utilities",
    amount: 75.4,
    date: "2026-02-09"
  },
  {
    id: 18,
    type: "Expense",
    name: "Trader Joe's",
    category: "Groceries",
    amount: 64.1,
    date: "2026-02-10"
  },
  {
    id: 19,
    type: "Expense",
    name: "Cinema Tickets",
    category: "Entertainment",
    amount: 28,
    date: "2026-02-11"
  },
  {
    id: 20,
    type: "Expense",
    name: "Subway Tickets",
    category: "Transportation",
    amount: 20,
    date: "2026-02-11"
  },
  {
    id: 21,
    type: "Expense",
    name: "Water Bill",
    category: "Utilities",
    amount: 35.2,
    date: "2026-02-12"
  },
  {
    id: 22,
    type: "Expense",
    name: "H&M - T-shirt",
    category: "Shopping",
    amount: 15,
    date: "2026-02-12"
  },
  {
    id: 23,
    type: "Expense",
    name: "Dentist Appointment",
    category: "Health",
    amount: 150,
    date: "2026-02-13"
  },
  {
    id: 24,
    type: "Expense",
    name: "Business Lunch",
    category: "Food & Dining",
    amount: 45.8,
    date: "2026-02-13"
  },
  {
    id: 25,
    type: "Income",
    name: "Stock Dividend",
    category: "Investments",
    amount: 35.5,
    date: "2026-02-14"
  },
  {
    id: 26,
    type: "Expense",
    name: "Car Wash",
    category: "Transportation",
    amount: 12,
    date: "2026-02-14"
  },
  {
    id: 27,
    type: "Expense",
    name: "Valentine's Day Dinner",
    category: "Food & Dining",
    amount: 110,
    date: "2026-02-14"
  },
  {
    id: 28,
    type: "Expense",
    name: "Target - Home Goods",
    category: "Shopping",
    amount: 55.3,
    date: "2026-02-15"
  },
  {
    id: 29,
    type: "Income",
    name: "Tech Corp - Mid-Month Bonus",
    category: "Salary",
    amount: 500,
    date: "2026-02-15"
  },
  {
    id: 30,
    type: "Expense",
    name: "Farmers Market",
    category: "Groceries",
    amount: 38,
    date: "2026-02-15"
  },
  {
    id: 31,
    type: "Expense",
    name: "Mobile Phone Plan",
    category: "Utilities",
    amount: 45,
    date: "2026-02-16"
  },
  {
    id: 32,
    type: "Expense",
    name: "Haircut",
    category: "Personal Care",
    amount: 25,
    date: "2026-02-16"
  },
  {
    id: 33,
    type: "Expense",
    name: "Veterinary Visit",
    category: "Pets",
    amount: 80,
    date: "2026-02-17"
  },
  {
    id: 34,
    type: "Expense",
    name: "Pet Food",
    category: "Pets",
    amount: 42.5,
    date: "2026-02-17"
  },
  {
    id: 35,
    type: "Expense",
    name: "Museum Ticket",
    category: "Entertainment",
    amount: 18,
    date: "2026-02-18"
  },
  {
    id: 36,
    type: "Expense",
    name: "Coffee Beans",
    category: "Groceries",
    amount: 16.5,
    date: "2026-02-18"
  },
  {
    id: 37,
    type: "Expense",
    name: "Uber Eats",
    category: "Food & Dining",
    amount: 32.1,
    date: "2026-02-19"
  },
  {
    id: 38,
    type: "Expense",
    name: "Parking Fee",
    category: "Transportation",
    amount: 8,
    date: "2026-02-19"
  },
  {
    id: 39,
    type: "Expense",
    name: "Vitamins",
    category: "Health",
    amount: 22.9,
    date: "2026-02-20"
  },
  {
    id: 40,
    type: "Income",
    name: "Consulting Session",
    category: "Freelance",
    amount: 150,
    date: "2026-02-20"
  },
  {
    id: 41,
    type: "Expense",
    name: "Concert Ticket",
    category: "Entertainment",
    amount: 95,
    date: "2026-02-21"
  },
  {
    id: 42,
    type: "Expense",
    name: "Sneakers",
    category: "Shopping",
    amount: 120,
    date: "2026-02-21"
  },
  {
    id: 43,
    type: "Expense",
    name: "Laundry Service",
    category: "Personal Care",
    amount: 15.5,
    date: "2026-02-22"
  },
  {
    id: 44,
    type: "Expense",
    name: "Toll Pass Recharge",
    category: "Transportation",
    amount: 30,
    date: "2026-02-22"
  },
  {
    id: 45,
    type: "Expense",
    name: "Office Supplies",
    category: "Shopping",
    amount: 14.2,
    date: "2026-02-23"
  },
  {
    id: 46,
    type: "Income",
    name: "Tax Refund",
    category: "Government",
    amount: 340,
    date: "2026-02-24"
  },
  {
    id: 47,
    type: "Expense",
    name: "Yoga Class",
    category: "Health & Fitness",
    amount: 20,
    date: "2026-02-24"
  },
  {
    id: 48,
    type: "Expense",
    name: "Car Insurance",
    category: "Transportation",
    amount: 115,
    date: "2026-02-25"
  },
  {
    id: 49,
    type: "Expense",
    name: "Flight Ticket",
    category: "Travel",
    amount: 350,
    date: "2026-02-27"
  },
  {
    id: 50,
    type: "Income",
    name: "Friend Repaid Loan",
    category: "Transfer",
    amount: 50,
    date: "2026-02-28"
  }
];

// src/app/dashboard/dashboard-client.tsx
var jsx_dev_runtime6 = __toESM(require_jsx_dev_runtime(), 1);
"use client";
var categoryIcons = {
  "Food & Dining": Utensils,
  Groceries: ShoppingCart,
  Shopping: ShoppingBag,
  Transportation: Car,
  Housing: House,
  Utilities: Zap,
  Salary: Briefcase,
  Freelance: Briefcase,
  Investments: TrendingUp,
  Sales: Gift,
  Entertainment: Clapperboard,
  Health: HeartPulse,
  "Health & Fitness": Dumbbell,
  "Personal Care": Scissors,
  Pets: Heart,
  Travel: Plane,
  Government: Receipt,
  Transfer: ArrowUpRight,
  default: Receipt
};
function DashboardClient({ user }) {
  const [showBalance, setShowBalance] = import_react3.useState(true);
  const userName = user.name || user.email?.split("@")[0] || "User";
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? "Good morning" : currentHour < 18 ? "Good afternoon" : "Good evening";
  const transactions = import_react3.useMemo(() => {
    return history_default.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, []);
  const stats = import_react3.useMemo(() => {
    const income = transactions.filter((t) => t.type === "Income").reduce((sum, t) => sum + t.amount, 0);
    const expenses = transactions.filter((t) => t.type === "Expense").reduce((sum, t) => sum + t.amount, 0);
    return {
      totalBalance: income - expenses,
      monthlyIncome: income,
      monthlyExpenses: expenses,
      remainingBudget: income - expenses
    };
  }, [transactions]);
  const recentTransactions = transactions.slice(0, 10);
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD"
    }).format(amount);
  };
  return /* @__PURE__ */ jsx_dev_runtime6.jsxDEV("div", {
    className: "min-h-screen bg-background pb-24",
    children: [
      /* @__PURE__ */ jsx_dev_runtime6.jsxDEV("div", {
        className: "mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl",
        children: [
          /* @__PURE__ */ jsx_dev_runtime6.jsxDEV("div", {
            className: "flex items-center justify-between mb-6",
            children: /* @__PURE__ */ jsx_dev_runtime6.jsxDEV("div", {
              className: "flex items-center gap-3",
              children: [
                /* @__PURE__ */ jsx_dev_runtime6.jsxDEV(Avatar2, {
                  className: "size-12 border-2 border-primary/20",
                  children: [
                    /* @__PURE__ */ jsx_dev_runtime6.jsxDEV(AvatarImage2, {
                      src: user.image || undefined
                    }, undefined, false, undefined, this),
                    /* @__PURE__ */ jsx_dev_runtime6.jsxDEV(AvatarFallback2, {
                      className: "bg-primary text-primary-foreground text-lg",
                      children: userName[0]?.toUpperCase()
                    }, undefined, false, undefined, this)
                  ]
                }, undefined, true, undefined, this),
                /* @__PURE__ */ jsx_dev_runtime6.jsxDEV("div", {
                  children: [
                    /* @__PURE__ */ jsx_dev_runtime6.jsxDEV("p", {
                      className: "text-sm text-muted-foreground",
                      children: [
                        greeting,
                        ","
                      ]
                    }, undefined, true, undefined, this),
                    /* @__PURE__ */ jsx_dev_runtime6.jsxDEV("h2", {
                      className: "text-xl font-semibold text-foreground capitalize",
                      children: userName
                    }, undefined, false, undefined, this)
                  ]
                }, undefined, true, undefined, this)
              ]
            }, undefined, true, undefined, this)
          }, undefined, false, undefined, this),
          /* @__PURE__ */ jsx_dev_runtime6.jsxDEV(Card, {
            className: "mb-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20",
            children: /* @__PURE__ */ jsx_dev_runtime6.jsxDEV(CardContent, {
              className: "p-6",
              children: [
                /* @__PURE__ */ jsx_dev_runtime6.jsxDEV("div", {
                  className: "flex items-start justify-between mb-4",
                  children: [
                    /* @__PURE__ */ jsx_dev_runtime6.jsxDEV("div", {
                      className: "flex items-center gap-2",
                      children: [
                        /* @__PURE__ */ jsx_dev_runtime6.jsxDEV(Wallet, {
                          className: "size-5 text-primary"
                        }, undefined, false, undefined, this),
                        /* @__PURE__ */ jsx_dev_runtime6.jsxDEV("span", {
                          className: "text-muted-foreground font-medium",
                          children: "Total Balance"
                        }, undefined, false, undefined, this)
                      ]
                    }, undefined, true, undefined, this),
                    /* @__PURE__ */ jsx_dev_runtime6.jsxDEV(Button, {
                      variant: "ghost",
                      size: "icon",
                      className: "size-8",
                      onClick: () => setShowBalance(!showBalance),
                      children: [
                        "n                ",
                        showBalance ? /* @__PURE__ */ jsx_dev_runtime6.jsxDEV(EyeOff, {
                          className: "size-4 text-muted-foreground"
                        }, undefined, false, undefined, this) : /* @__PURE__ */ jsx_dev_runtime6.jsxDEV(Eye, {
                          className: "size-4 text-muted-foreground"
                        }, undefined, false, undefined, this)
                      ]
                    }, undefined, true, undefined, this)
                  ]
                }, undefined, true, undefined, this),
                /* @__PURE__ */ jsx_dev_runtime6.jsxDEV("div", {
                  className: "mb-4",
                  children: /* @__PURE__ */ jsx_dev_runtime6.jsxDEV("span", {
                    className: "text-4xl font-bold text-foreground",
                    children: showBalance ? formatCurrency(stats.totalBalance) : "••••••"
                  }, undefined, false, undefined, this)
                }, undefined, false, undefined, this),
                /* @__PURE__ */ jsx_dev_runtime6.jsxDEV("div", {
                  className: "flex items-center gap-4",
                  children: [
                    /* @__PURE__ */ jsx_dev_runtime6.jsxDEV("div", {
                      className: "flex items-center gap-1.5",
                      children: [
                        /* @__PURE__ */ jsx_dev_runtime6.jsxDEV("div", {
                          className: "flex items-center justify-center size-6 rounded-full bg-emerald-500/20",
                          children: /* @__PURE__ */ jsx_dev_runtime6.jsxDEV(TrendingUp, {
                            className: "size-3.5 text-emerald-500"
                          }, undefined, false, undefined, this)
                        }, undefined, false, undefined, this),
                        /* @__PURE__ */ jsx_dev_runtime6.jsxDEV("span", {
                          className: "text-sm text-emerald-500 font-medium",
                          children: "+12.5%"
                        }, undefined, false, undefined, this)
                      ]
                    }, undefined, true, undefined, this),
                    /* @__PURE__ */ jsx_dev_runtime6.jsxDEV("span", {
                      className: "text-sm text-muted-foreground",
                      children: "vs last month"
                    }, undefined, false, undefined, this)
                  ]
                }, undefined, true, undefined, this)
              ]
            }, undefined, true, undefined, this)
          }, undefined, false, undefined, this),
          /* @__PURE__ */ jsx_dev_runtime6.jsxDEV("div", {
            className: "grid grid-cols-2 md:grid-cols-3 gap-4 mb-6",
            children: [
              /* @__PURE__ */ jsx_dev_runtime6.jsxDEV(Card, {
                className: "bg-card border-border/50",
                children: /* @__PURE__ */ jsx_dev_runtime6.jsxDEV(CardContent, {
                  className: "p-4",
                  children: [
                    /* @__PURE__ */ jsx_dev_runtime6.jsxDEV("div", {
                      className: "flex items-center gap-2 mb-3",
                      children: [
                        /* @__PURE__ */ jsx_dev_runtime6.jsxDEV("div", {
                          className: "flex items-center justify-center size-8 rounded-full bg-emerald-500/20",
                          children: /* @__PURE__ */ jsx_dev_runtime6.jsxDEV(ArrowDownRight, {
                            className: "size-4 text-emerald-500"
                          }, undefined, false, undefined, this)
                        }, undefined, false, undefined, this),
                        /* @__PURE__ */ jsx_dev_runtime6.jsxDEV("span", {
                          className: "text-xs font-medium text-emerald-500 uppercase tracking-wide",
                          children: "Income"
                        }, undefined, false, undefined, this)
                      ]
                    }, undefined, true, undefined, this),
                    /* @__PURE__ */ jsx_dev_runtime6.jsxDEV("div", {
                      className: "text-xl font-bold text-foreground mb-1",
                      children: showBalance ? formatCurrency(stats.monthlyIncome) : "••••"
                    }, undefined, false, undefined, this),
                    /* @__PURE__ */ jsx_dev_runtime6.jsxDEV("p", {
                      className: "text-xs text-muted-foreground",
                      children: "This month"
                    }, undefined, false, undefined, this)
                  ]
                }, undefined, true, undefined, this)
              }, undefined, false, undefined, this),
              /* @__PURE__ */ jsx_dev_runtime6.jsxDEV(Card, {
                className: "bg-card border-border/50",
                children: /* @__PURE__ */ jsx_dev_runtime6.jsxDEV(CardContent, {
                  className: "p-4",
                  children: [
                    /* @__PURE__ */ jsx_dev_runtime6.jsxDEV("div", {
                      className: "flex items-center gap-2 mb-3",
                      children: [
                        /* @__PURE__ */ jsx_dev_runtime6.jsxDEV("div", {
                          className: "flex items-center justify-center size-8 rounded-full bg-red-500/20",
                          children: /* @__PURE__ */ jsx_dev_runtime6.jsxDEV(ArrowUpRight, {
                            className: "size-4 text-red-500"
                          }, undefined, false, undefined, this)
                        }, undefined, false, undefined, this),
                        /* @__PURE__ */ jsx_dev_runtime6.jsxDEV("span", {
                          className: "text-xs font-medium text-red-500 uppercase tracking-wide",
                          children: "Expenses"
                        }, undefined, false, undefined, this)
                      ]
                    }, undefined, true, undefined, this),
                    /* @__PURE__ */ jsx_dev_runtime6.jsxDEV("div", {
                      className: "text-xl font-bold text-foreground mb-1",
                      children: showBalance ? formatCurrency(stats.monthlyExpenses) : "••••"
                    }, undefined, false, undefined, this),
                    /* @__PURE__ */ jsx_dev_runtime6.jsxDEV("p", {
                      className: "text-xs text-muted-foreground",
                      children: "This month"
                    }, undefined, false, undefined, this)
                  ]
                }, undefined, true, undefined, this)
              }, undefined, false, undefined, this),
              /* @__PURE__ */ jsx_dev_runtime6.jsxDEV(Card, {
                className: "bg-card border-border/50 col-span-2 md:col-span-1",
                children: /* @__PURE__ */ jsx_dev_runtime6.jsxDEV(CardContent, {
                  className: "p-4",
                  children: [
                    /* @__PURE__ */ jsx_dev_runtime6.jsxDEV("div", {
                      className: "flex items-center gap-2 mb-3",
                      children: [
                        /* @__PURE__ */ jsx_dev_runtime6.jsxDEV("div", {
                          className: "flex items-center justify-center size-8 rounded-full bg-blue-500/20",
                          children: /* @__PURE__ */ jsx_dev_runtime6.jsxDEV(Receipt, {
                            className: "size-4 text-blue-500"
                          }, undefined, false, undefined, this)
                        }, undefined, false, undefined, this),
                        /* @__PURE__ */ jsx_dev_runtime6.jsxDEV("span", {
                          className: "text-xs font-medium text-blue-500 uppercase tracking-wide",
                          children: "Remaining"
                        }, undefined, false, undefined, this)
                      ]
                    }, undefined, true, undefined, this),
                    /* @__PURE__ */ jsx_dev_runtime6.jsxDEV("div", {
                      className: "text-xl font-bold text-foreground mb-1",
                      children: showBalance ? formatCurrency(stats.remainingBudget) : "••••"
                    }, undefined, false, undefined, this),
                    /* @__PURE__ */ jsx_dev_runtime6.jsxDEV("p", {
                      className: "text-xs text-muted-foreground",
                      children: "Available to spend"
                    }, undefined, false, undefined, this)
                  ]
                }, undefined, true, undefined, this)
              }, undefined, false, undefined, this)
            ]
          }, undefined, true, undefined, this),
          /* @__PURE__ */ jsx_dev_runtime6.jsxDEV(Card, {
            className: "mb-6 bg-card border-border/50",
            children: [
              /* @__PURE__ */ jsx_dev_runtime6.jsxDEV(CardHeader, {
                className: "pb-3",
                children: /* @__PURE__ */ jsx_dev_runtime6.jsxDEV(CardTitle, {
                  className: "text-base font-semibold",
                  children: "Your Financial Situation"
                }, undefined, false, undefined, this)
              }, undefined, false, undefined, this),
              /* @__PURE__ */ jsx_dev_runtime6.jsxDEV(CardContent, {
                className: "pt-0",
                children: /* @__PURE__ */ jsx_dev_runtime6.jsxDEV("div", {
                  className: "space-y-4",
                  children: [
                    /* @__PURE__ */ jsx_dev_runtime6.jsxDEV("div", {
                      children: [
                        /* @__PURE__ */ jsx_dev_runtime6.jsxDEV("div", {
                          className: "flex items-center justify-between mb-2",
                          children: [
                            /* @__PURE__ */ jsx_dev_runtime6.jsxDEV("span", {
                              className: "text-sm text-muted-foreground",
                              children: "Budget Usage"
                            }, undefined, false, undefined, this),
                            /* @__PURE__ */ jsx_dev_runtime6.jsxDEV("span", {
                              className: "text-sm font-medium",
                              children: "60%"
                            }, undefined, false, undefined, this)
                          ]
                        }, undefined, true, undefined, this),
                        /* @__PURE__ */ jsx_dev_runtime6.jsxDEV("div", {
                          className: "h-2 bg-muted rounded-full overflow-hidden",
                          children: /* @__PURE__ */ jsx_dev_runtime6.jsxDEV("div", {
                            className: "h-full bg-primary rounded-full w-[60%]"
                          }, undefined, false, undefined, this)
                        }, undefined, false, undefined, this)
                      ]
                    }, undefined, true, undefined, this),
                    /* @__PURE__ */ jsx_dev_runtime6.jsxDEV("div", {
                      className: "grid grid-cols-2 gap-4 pt-2",
                      children: [
                        /* @__PURE__ */ jsx_dev_runtime6.jsxDEV("div", {
                          className: "text-center p-3 bg-muted/50 rounded-lg",
                          children: [
                            /* @__PURE__ */ jsx_dev_runtime6.jsxDEV("p", {
                              className: "text-xs text-muted-foreground mb-1",
                              children: "Savings Rate"
                            }, undefined, false, undefined, this),
                            /* @__PURE__ */ jsx_dev_runtime6.jsxDEV("p", {
                              className: "text-lg font-semibold text-emerald-500",
                              children: "40%"
                            }, undefined, false, undefined, this)
                          ]
                        }, undefined, true, undefined, this),
                        /* @__PURE__ */ jsx_dev_runtime6.jsxDEV("div", {
                          className: "text-center p-3 bg-muted/50 rounded-lg",
                          children: [
                            /* @__PURE__ */ jsx_dev_runtime6.jsxDEV("p", {
                              className: "text-xs text-muted-foreground mb-1",
                              children: "Daily Budget"
                            }, undefined, false, undefined, this),
                            /* @__PURE__ */ jsx_dev_runtime6.jsxDEV("p", {
                              className: "text-lg font-semibold",
                              children: showBalance ? "$46" : "•••"
                            }, undefined, false, undefined, this)
                          ]
                        }, undefined, true, undefined, this)
                      ]
                    }, undefined, true, undefined, this)
                  ]
                }, undefined, true, undefined, this)
              }, undefined, false, undefined, this)
            ]
          }, undefined, true, undefined, this),
          /* @__PURE__ */ jsx_dev_runtime6.jsxDEV("div", {
            children: [
              /* @__PURE__ */ jsx_dev_runtime6.jsxDEV("div", {
                className: "flex items-center justify-between mb-4",
                children: [
                  /* @__PURE__ */ jsx_dev_runtime6.jsxDEV("h3", {
                    className: "text-lg font-semibold text-foreground",
                    children: "Recent Transactions"
                  }, undefined, false, undefined, this),
                  /* @__PURE__ */ jsx_dev_runtime6.jsxDEV(Button, {
                    variant: "link",
                    size: "sm",
                    className: "text-primary",
                    children: "View All"
                  }, undefined, false, undefined, this)
                ]
              }, undefined, true, undefined, this),
              /* @__PURE__ */ jsx_dev_runtime6.jsxDEV("div", {
                className: "space-y-3",
                children: recentTransactions.map((transaction) => {
                  const Icon2 = categoryIcons[transaction.category] || categoryIcons.default;
                  const isExpense = transaction.type === "Expense";
                  const dateObj = new Date(transaction.date);
                  const today = new Date;
                  const yesterday = new Date(today);
                  yesterday.setDate(yesterday.getDate() - 1);
                  let dateDisplay = transaction.date;
                  if (dateObj.toDateString() === today.toDateString()) {
                    dateDisplay = "Today";
                  } else if (dateObj.toDateString() === yesterday.toDateString()) {
                    dateDisplay = "Yesterday";
                  } else {
                    dateDisplay = dateObj.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric"
                    });
                  }
                  return /* @__PURE__ */ jsx_dev_runtime6.jsxDEV(Card, {
                    className: "bg-card border-border/50 hover:bg-accent/50 transition-colors",
                    children: /* @__PURE__ */ jsx_dev_runtime6.jsxDEV(CardContent, {
                      className: "p-4",
                      children: /* @__PURE__ */ jsx_dev_runtime6.jsxDEV("div", {
                        className: "flex items-center gap-4",
                        children: [
                          /* @__PURE__ */ jsx_dev_runtime6.jsxDEV("div", {
                            className: `flex items-center justify-center size-10 rounded-full shrink-0 ${isExpense ? "bg-red-500/10" : "bg-emerald-500/10"}`,
                            children: /* @__PURE__ */ jsx_dev_runtime6.jsxDEV(Icon2, {
                              className: `size-5 ${isExpense ? "text-red-500" : "text-emerald-500"}`
                            }, undefined, false, undefined, this)
                          }, undefined, false, undefined, this),
                          /* @__PURE__ */ jsx_dev_runtime6.jsxDEV("div", {
                            className: "flex-1 min-w-0",
                            children: [
                              /* @__PURE__ */ jsx_dev_runtime6.jsxDEV("div", {
                                className: "flex items-center justify-between",
                                children: [
                                  /* @__PURE__ */ jsx_dev_runtime6.jsxDEV("h4", {
                                    className: "font-medium text-foreground truncate",
                                    children: transaction.name
                                  }, undefined, false, undefined, this),
                                  /* @__PURE__ */ jsx_dev_runtime6.jsxDEV("span", {
                                    className: `font-semibold shrink-0 ${isExpense ? "text-red-500" : "text-emerald-500"}`,
                                    children: [
                                      isExpense ? "-" : "+",
                                      showBalance ? formatCurrency(transaction.amount) : "••••"
                                    ]
                                  }, undefined, true, undefined, this)
                                ]
                              }, undefined, true, undefined, this),
                              /* @__PURE__ */ jsx_dev_runtime6.jsxDEV("div", {
                                className: "flex items-center gap-2 mt-0.5",
                                children: [
                                  /* @__PURE__ */ jsx_dev_runtime6.jsxDEV(Badge, {
                                    variant: "secondary",
                                    className: "text-xs",
                                    children: transaction.category
                                  }, undefined, false, undefined, this),
                                  /* @__PURE__ */ jsx_dev_runtime6.jsxDEV("span", {
                                    className: "text-xs text-muted-foreground",
                                    children: dateDisplay
                                  }, undefined, false, undefined, this)
                                ]
                              }, undefined, true, undefined, this)
                            ]
                          }, undefined, true, undefined, this)
                        ]
                      }, undefined, true, undefined, this)
                    }, undefined, false, undefined, this)
                  }, transaction.id, false, undefined, this);
                })
              }, undefined, false, undefined, this)
            ]
          }, undefined, true, undefined, this)
        ]
      }, undefined, true, undefined, this),
      /* @__PURE__ */ jsx_dev_runtime6.jsxDEV(BottomNav, {}, undefined, false, undefined, this)
    ]
  }, undefined, true, undefined, this);
}
export {
  DashboardClient
};
