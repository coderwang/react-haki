"use strict";(self.webpackChunkreact_haki=self.webpackChunkreact_haki||[]).push([[518],{22363:function(O,r,e){var u;e.r(r),e.d(r,{demos:function(){return x}});var I=e(90228),t=e.n(I),P=e(87999),p=e.n(P),m=e(75271),M=e(94880),D=e(92775),x={"src-hooks-use-geolocation-demo-0":{component:m.memo(m.lazy(p()(t()().mark(function _(){var c,a,l,d;return t()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,Promise.resolve().then(e.t.bind(e,75271,19));case 2:return c=n.sent,a=c.default,n.next=6,Promise.resolve().then(e.bind(e,92775));case 6:return l=n.sent,d=l.useGeolocation,n.abrupt("return",{default:function(){var s=d(),i=s.location,v=s.error,E=s.loading,b=s.fetchGeolocation,g=function(){var y=p()(t()().mark(function h(){var f;return t()().wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.prev=0,o.next=3,b();case 3:f=o.sent,console.log("\u83B7\u53D6\u5230\u4F4D\u7F6E\uFF1A",f),o.next=10;break;case 7:o.prev=7,o.t0=o.catch(0),console.error("\u83B7\u53D6\u4F4D\u7F6E\u5931\u8D25\uFF1A",o.t0);case 10:case"end":return o.stop()}},h,null,[[0,7]])}));return function(){return y.apply(this,arguments)}}();return a.createElement("div",null,a.createElement("button",{onClick:g,disabled:E},E?"\u83B7\u53D6\u4F4D\u7F6E\u4E2D...":"\u83B7\u53D6\u4F4D\u7F6E"),v&&a.createElement("div",null,"\u9519\u8BEF: ",v.message),i&&a.createElement("div",null,a.createElement("h2",null,"\u5F53\u524D\u4F4D\u7F6E\uFF1A"),a.createElement("p",null,"\u7EAC\u5EA6: ",i.latitude),a.createElement("p",null,"\u7ECF\u5EA6: ",i.longitude),a.createElement("p",null,"\u7CBE\u786E\u5EA6: ",i.accuracy,"\u7C73")))}});case 9:case"end":return n.stop()}},_)})))),asset:{type:"BLOCK",id:"src-hooks-use-geolocation-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import React from 'react';
import { useGeolocation } from 'react-haki';

export default function App() {
  const { location, error, loading, fetchGeolocation } = useGeolocation();

  const handleGetLocation = async () => {
    try {
      const locationData = await fetchGeolocation();
      console.log('\u83B7\u53D6\u5230\u4F4D\u7F6E\uFF1A', locationData);
    } catch (err) {
      console.error('\u83B7\u53D6\u4F4D\u7F6E\u5931\u8D25\uFF1A', err);
    }
  };

  return (
    <div>
      <button onClick={handleGetLocation} disabled={loading}>
        {loading ? '\u83B7\u53D6\u4F4D\u7F6E\u4E2D...' : '\u83B7\u53D6\u4F4D\u7F6E'}
      </button>

      {error && <div>\u9519\u8BEF: {error.message}</div>}

      {location && (
        <div>
          <h2>\u5F53\u524D\u4F4D\u7F6E\uFF1A</h2>
          <p>\u7EAC\u5EA6: {location.latitude}</p>
          <p>\u7ECF\u5EA6: {location.longitude}</p>
          <p>\u7CBE\u786E\u5EA6: {location.accuracy}\u7C73</p>
        </div>
      )}
    </div>
  );
}`},react:{type:"NPM",value:"18.3.1"},"react-haki":{type:"NPM",value:"0.0.1"}},entry:"index.tsx"},context:{react:u||(u=e.t(m,2)),"react-haki":D},renderOpts:{compile:function(){var _=p()(t()().mark(function a(){var l,d=arguments;return t()().wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.e(708).then(e.bind(e,63708));case 2:return n.abrupt("return",(l=n.sent).default.apply(l,d));case 3:case"end":return n.stop()}},a)}));function c(){return _.apply(this,arguments)}return c}()}}}},79883:function(O,r,e){e.r(r),e.d(r,{texts:function(){return I}});var u=e(94880);const I=[{value:"\u83B7\u53D6\u5730\u7406\u4F4D\u7F6E\u4FE1\u606F",paraId:0,tocIndex:1},{value:`interface PositionOptions {
  enableHighAccuracy?: boolean;
  maximumAge?: number;
  timeout?: number;
}

type LocationData = GeolocationCoordinates & {
  timestamp: number;
};

const enum LocationErrorType {
  PERMISSION_DENIED = 'PERMISSION_DENIED',
  POSITION_UNAVAILABLE = 'POSITION_UNAVAILABLE',
  TIMEOUT = 'TIMEOUT',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
  NOT_SUPPORTED = 'NOT_SUPPORTED',
}

interface LocationError {
  type: LocationErrorType;
  message: string;
}
`,paraId:1,tocIndex:3},{value:`function useGeolocation(options?: PositionOptions): {
  location: LocationData | null;
  error: LocationError | null;
  loading: boolean;
  fetchGeolocation: () => Promise<LocationData>;
};
`,paraId:2,tocIndex:3},{value:"\u53C2\u6570",paraId:3,tocIndex:4},{value:"\u8BF4\u660E",paraId:3,tocIndex:4},{value:"\u7C7B\u578B",paraId:3,tocIndex:4},{value:"\u9ED8\u8BA4\u503C",paraId:3,tocIndex:4},{value:"enableHighAccuracy",paraId:3,tocIndex:4},{value:"\u662F\u5426\u542F\u7528\u9AD8\u7CBE\u5EA6\u5B9A\u4F4D",paraId:3,tocIndex:4},{value:"boolean",paraId:3,tocIndex:4},{value:"false",paraId:3,tocIndex:4},{value:"timeout",paraId:3,tocIndex:4},{value:"\u8D85\u65F6\u65F6\u95F4",paraId:3,tocIndex:4},{value:"number",paraId:3,tocIndex:4},{value:"5000",paraId:3,tocIndex:4},{value:"maximumAge",paraId:3,tocIndex:4},{value:"\u6700\u5927\u7F13\u5B58\u65F6\u95F4",paraId:3,tocIndex:4},{value:"number",paraId:3,tocIndex:4},{value:"0",paraId:3,tocIndex:4},{value:"\u53C2\u6570",paraId:4,tocIndex:5},{value:"\u8BF4\u660E",paraId:4,tocIndex:5},{value:"\u7C7B\u578B",paraId:4,tocIndex:5},{value:"location",paraId:4,tocIndex:5},{value:"\u5730\u7406\u4F4D\u7F6E\u4FE1\u606F",paraId:4,tocIndex:5},{value:"LocationData | null",paraId:4,tocIndex:5},{value:"error",paraId:4,tocIndex:5},{value:"\u9519\u8BEF\u4FE1\u606F",paraId:4,tocIndex:5},{value:"LocationError | null",paraId:4,tocIndex:5},{value:"loading",paraId:4,tocIndex:5},{value:"\u662F\u5426\u6B63\u5728\u83B7\u53D6\u5730\u7406\u4F4D\u7F6E\u4FE1\u606F",paraId:4,tocIndex:5},{value:"boolean",paraId:4,tocIndex:5},{value:"fetchGeolocation",paraId:4,tocIndex:5},{value:"\u83B7\u53D6\u5730\u7406\u4F4D\u7F6E\u4FE1\u606F",paraId:4,tocIndex:5},{value:"() => Promise<LocationData>",paraId:4,tocIndex:5}]}}]);
