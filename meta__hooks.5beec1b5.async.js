"use strict";(self.webpackChunkreact_haki=self.webpackChunkreact_haki||[]).push([[518],{78766:function(O,r,e){var c;e.r(r),e.d(r,{demos:function(){return D}});var P=e(17061),t=e.n(P),_=e(17156),I=e.n(_),p=e(67294),x=e(12874),D={"src-hooks-use-geolocation-demo-0":{component:p.memo(p.lazy(I()(t()().mark(function m(){var d,n,l,i;return t()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,Promise.resolve().then(e.t.bind(e,67294,19));case 2:return d=a.sent,n=d.default,a.next=6,Promise.resolve().then(e.bind(e,12874));case 6:return l=a.sent,i=l.useGeolocation,a.abrupt("return",{default:function(){var u=i(),s=u.location,v=u.error,h=u.loading,L=u.fetchGeolocation,y=function(){var R=I()(t()().mark(function E(){var f;return t()().wrap(function(o){for(;;)switch(o.prev=o.next){case 0:return o.prev=0,o.next=3,L();case 3:f=o.sent,console.log("\u83B7\u53D6\u5230\u4F4D\u7F6E\uFF1A",f),o.next=10;break;case 7:o.prev=7,o.t0=o.catch(0),console.error("\u83B7\u53D6\u4F4D\u7F6E\u5931\u8D25\uFF1A",o.t0);case 10:case"end":return o.stop()}},E,null,[[0,7]])}));return function(){return R.apply(this,arguments)}}();return n.createElement("div",null,n.createElement("button",{onClick:y,disabled:h},h?"\u83B7\u53D6\u4F4D\u7F6E\u4E2D...":"\u83B7\u53D6\u4F4D\u7F6E"),v&&n.createElement("div",null,"\u9519\u8BEF: ",v.message),s&&n.createElement("div",null,n.createElement("h2",null,"\u5F53\u524D\u4F4D\u7F6E\uFF1A"),n.createElement("p",null,"\u7EAC\u5EA6: ",s.latitude),n.createElement("p",null,"\u7ECF\u5EA6: ",s.longitude),n.createElement("p",null,"\u7CBE\u786E\u5EA6: ",s.accuracy,"\u7C73")))}});case 9:case"end":return a.stop()}},m)})))),asset:{type:"BLOCK",id:"src-hooks-use-geolocation-demo-0",refAtomIds:[],dependencies:{"index.tsx":{type:"FILE",value:`import React from 'react';
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
}`},react:{type:"NPM",value:"18.3.1"},"react-haki":{type:"NPM",value:"0.0.2"}},entry:"index.tsx"},context:{react:c||(c=e.t(p,2)),"react-haki":x},renderOpts:{compile:function(){var m=I()(t()().mark(function n(){var l,i=arguments;return t()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,e.e(250).then(e.bind(e,90250));case 2:return a.abrupt("return",(l=a.sent).default.apply(l,i));case 3:case"end":return a.stop()}},n)}));function d(){return m.apply(this,arguments)}return d}()}}}},39445:function(O,r,e){e.r(r),e.d(r,{texts:function(){return c}});const c=[{value:"\u83B7\u53D6\u5730\u7406\u4F4D\u7F6E\u4FE1\u606F",paraId:0,tocIndex:1},{value:`interface PositionOptions {
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
