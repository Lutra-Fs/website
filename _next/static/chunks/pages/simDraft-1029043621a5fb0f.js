(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[94],{8416:function(t,e,i){(window.__NEXT_P=window.__NEXT_P||[]).push(["/simDraft",function(){return i(6910)}])},6910:function(t,e,i){"use strict";i.r(e),i.d(e,{default:function(){return m}});var n=i(5893),r=i(9034),o=i.n(r),a=i(5029),s=i(4737),c=i(9477),l=i(5078),h=i(7294),d=i(2698);function u(t){let e=(0,h.useRef)(null);(0,l.A)(t=>{t.camera.setRotationFromAxisAngle(new c.Vector3(1,0,0),-Math.PI/2),e.current.lookAt(0,99,0)});let i={segX:"63.0",segY:"63.0",width:"2.0",height:"2.0",segXInt:"64",segArea:"4096",densityRangeLow:"0.0",densityRangeHigh:"100.0",densityRangeSize:"100.0"},r=new c.ShaderMaterial;r.vertexShader="// VERTEX SHADER\r\nvarying lowp vec4 vColor;\r\n\r\nuniform float density[4096]\r\n\r\nint getIndexFromPoint(vec3 pos)\r\n{\r\n  int ix = int((pos.x + (${width} / 2.0)) * ${segX} / ${width});\r\n  int iy = int((-pos.y + (${height} / 2.0)) * ${segY} / ${height});\r\n  return ix + iy * ${segXInt};\r\n}\r\n\r\nvec4 getColourFromDensity(float density)\r\n{\r\n  density = min(density, ${densityRangeHigh});\r\n  density = max(density, ${densityRangeLow});\r\n  density = density / ${densityRangeSize};\r\n  return vec4(density, 0.0, 1.0 - density, 1.0);\r\n}\r\n\r\nvoid main(void) \r\n{\r\n  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\r\n\r\n  int index = getIndexFromPoint(position);\r\n  vColor = getColourFromDensity(density[index]);\r\n}".replace(/\$\{(\w+?)\}/g,function(t,e){return void 0!==i[e]?i[e]:"1.0"}),r.fragmentShader="// FRAGMENT SHADER\r\nvarying lowp vec4 vColor;\r\n\r\nvoid main(void) {\r\n  gl_FragColor = vColor;\r\n}\r\n",r.uniforms={density:{value:null}};let o="".concat("https://techlauncher-mlai-edge-physics.github.io","/pvf_incomp_44.json");return d.Z.createModelService("../_next/static/chunks/pages/model/bno_small.onnx",[64,64],10).then(t=>{t.bindOutput(a),t.initMatrixFromPath(o).then(()=>{t.startSimulation()})}),(0,n.jsx)("mesh",{...t,ref:e,material:r,children:(0,n.jsx)("planeGeometry",{args:[2,2,9,9]})});function a(t){r.uniforms.density.value=t,r.uniformsNeedUpdate=!0,console.log(t)}}function m(){return(0,n.jsx)("div",{className:o().scene,children:(0,n.jsxs)(a.Xz,{shadows:!0,className:o().canvas,camera:{position:[1,10,1]},children:[(0,n.jsx)("ambientLight",{}),(0,n.jsx)(u,{position:[0,0,0]}),(0,n.jsx)(s.o,{})]})})}},2698:function(t,e,i){"use strict";i.d(e,{Z:function(){return r}});var n=i(8736);class r{static async createModelService(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[64,64],i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1;console.log("createModelService called");let n=new r;return console.log("createModelService constructor called"),await n.init(t,e,i),console.log("createModelService finished"),n}async initMatrixFromPath(t){"/"===t[0]&&(t="".concat("https://techlauncher-mlai-edge-physics.github.io","/").concat(t)),console.log("initMatrixFromPath called with path: ".concat(t));let e=await fetch(t).then(async t=>await t.json());if(null==e)throw Error("The matrix from ".concat(t," is null"));this.initMatrixFromJSON(e)}bindOutput(t){this.outputCallback=t}async startSimulation(){await this.iterate()}pauseSimulation(){this.continueSimulation=!1}async init(t,e,i){console.log("init called"),this.session=await n.InferenceSession.create(t,{executionProviders:["wasm"],graphOptimizationLevel:"all"}),console.log("init session created"),this.gridSize=e,this.batchSize=i,this.tensorShape=[i,e[0],e[1],5],this.tensorSize=i*e[0]*e[1]*5}initMatrixFromJSON(t){if(console.log("initMatrixFromJSON called"),this.matrixArray=new Float32Array(t.flat(1/0)),this.matrixArray.length!==this.tensorSize)throw Error("matrixArray length ".concat(this.matrixArray.length," does not match tensorSize ").concat(this.tensorSize))}async iterate(){if(null==this.session)throw Error("session is null, createModelServices() must be called at first");console.log("iterate called"),console.log("this.matrixArray",this.matrixArray);let t=new n.Tensor("float32",this.matrixArray,this.tensorShape),e={};e[this.session.inputNames[0]]=t;try{let t=await this.session.run(e);t.Output.data instanceof Float32Array&&(this.outputCallback(t.Output.data),this.copyOutputToMatrix(t.Output.data),this.continueSimulation&&this.iterate())}catch(t){console.error("error in session.run",t)}}copyOutputToMatrix(t){if(0===this.matrixArray.length)throw Error("matrixArray is empty");let e=0,i=0,n=0;for(;e<t.length;){if(n>=3&&(n=0,(i+=2)>=this.matrixArray.length))throw Error("toIndex ".concat(i," exceeds matrixArray length ").concat(this.matrixArray.length));this.matrixArray[i]=t[e],e++,i++,n++}if(e!==t.length)throw Error("fromIndex ".concat(e," does not match outputs length ").concat(t.length));if(i+2!==this.matrixArray.length)throw Error("toIndex ".concat(i," does not match matrixArray length ").concat(this.matrixArray.length))}updateForce(t,e){let i=this.getIndex(t);this.matrixArray[i+3]+=e.x,this.matrixArray[i+4]+=e.y}getIndex(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return e*this.gridSize[0]*this.gridSize[1]+t.y*this.gridSize[0]+t.x}constructor(){this.session=null,this.matrixArray=new Float32Array,this.gridSize=[0,0],this.batchSize=0,this.tensorShape=[0,0,0,0],this.tensorSize=0,this.continueSimulation=!0}}},9034:function(t){t.exports={main:"Home_main__nLjiQ",description:"Home_description__41Owk",code:"Home_code__suPER",grid:"Home_grid__GxQ85",card:"Home_card___LpL1",center:"Home_center__4BFgC",logo:"Home_logo__27_tb",thirteen:"Home_thirteen__cMI_k",rotate:"Home_rotate____XsI",content:"Home_content__Zy02X",vercelLogo:"Home_vercelLogo__dtSk9",scene:"Home_scene__X8N8q",canvas:"Home_canvas__x616u",body:"Home_body__XYSzx"}}},function(t){t.O(0,[774,770,737,240,379,888,179],function(){return t(t.s=8416)}),_N_E=t.O()}]);