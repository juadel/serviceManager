(this.webpackJsonpservicemanager=this.webpackJsonpservicemanager||[]).push([[0],{118:function(e,t){},133:function(e,t,a){},265:function(e,t,a){e.exports=a(801)},270:function(e,t,a){},801:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(50),o=a.n(l),s=(a(270),a(18)),c=a(19),i=a(21),u=a(20),m=a(22),h=a(86),d={Auth:{region:"ca-central-1",userPoolId:"ca-central-1_y3i0Krt0j",userPoolWebClientId:"7lp0df6po0f0fjj0qs2h8lqpva"}},p=a(79),E=a(85),C=a(32),v=a(809),f=a(805),b=a(33),y=a(13),g=a.n(y),w=a(30),S=a.n(w),k=function(e){function t(){var e;return Object(s.a)(this,t),(e=Object(i.a)(this,Object(u.a)(t).call(this))).state={jwtToken:"",user:""},e.token(),e}return Object(m.a)(t,e),Object(c.a)(t,[{key:"token",value:function(){var e=this;return g.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,g.a.awrap(h.a.currentSession().then((function(t){e.state.jwtToken=t.idToken.jwtToken})).catch((function(e){return console.log(e)})));case 2:return t.next=4,g.a.awrap(h.a.currentAuthenticatedUser().then((function(t){e.state.user=t.username})).catch((function(e){return console.log(e)})));case 4:case"end":return t.stop()}}))}}]),t}(n.Component),N=a(39),j=a(812),P="https://".concat("fy9djecyw1",".execute-api.ca-central-1.amazonaws.com/dev"),x=a(59),I=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(i.a)(this,Object(u.a)(t).call(this,e))).handleChange=function(e){a.handleAuth();var t=a.state.user;console.log(a.state.user);var n=e.target.value;a.setState({newComment:{date:new Date,By:t,text:n}})},a.handleSubmit=function(e){e.preventDefault(),a.addComment(a.props.ServiceID)},a.state={isLoading:!0,newComment:"",user:"",jwtToken:""},a.handleSubmit=a.handleSubmit.bind(Object(N.a)(a)),a.addComment=a.addComment.bind(Object(N.a)(a)),a.handleChange=a.handleChange.bind(Object(N.a)(a)),a.handleAuth=a.handleAuth.bind(Object(N.a)(a)),a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"addComment",value:function(e){return g.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,g.a.awrap(S.a.post(P+"/service/"+e,{Comments:this.state.newComment},{headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(this.state.jwtToken)}}).then((function(e){})).catch((function(e){return console.log(e)})));case 2:console.log(this.state.user),window.location="/results";case 4:case"end":return t.stop()}}),null,this)}},{key:"handleAuth",value:function(){var e;return g.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:return e=new k,t.next=3,g.a.awrap(e.token());case 3:this.setState({user:e.state.user,jwtToken:e.state.jwtToken});case 4:case"end":return t.stop()}}),null,this)}},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(j.a,{onSubmit:this.handleSubmit},r.a.createElement(j.a.Group,null,r.a.createElement(j.a.Label,null,"Add a Comment:"),r.a.createElement(j.a.Control,{as:"textarea",name:"textarea",rows:"5",cols:"80",onChange:this.handleChange})),r.a.createElement(f.a,{variant:"primary",type:"submit"},"Submit")))}}]),t}(n.Component),O=Object(x.f)(I),T=a(808),A=a(817),D=a(806),L=a(229),G=a(231),B=a.n(G),U=a(811),F={borderRadius:"10px",transform:"matrix(-1, 0, 0, 1, 10, 0)"},R=function(e){return r.a.createElement("div",null,r.a.createElement(U.a,{className:"building icon",size:"big",style:F,onClick:e.onClick}))},z={borderRadius:"100px",boxShadow:"3px 3px 1px #888888"},M=function(e){var t=e.text;return r.a.createElement("div",null,r.a.createElement(U.a,{name:"user circle outline",color:"blue",size:"big",style:z}),t)},K=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(i.a)(this,Object(u.a)(t).call(this,e))).state={key:"AIzaSyDM1anm6wLXg3LsLg33sN2-RaK4soOJYRE",center:a.props.Coordinates,lat:a.props.Coordinates.lat,lng:a.props.Coordinates.lng,zoom:15},a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return console.log(this.state.lat,this.state.lng),r.a.createElement("div",{style:{height:"29vh",width:"100%"}},r.a.createElement(B.a,{bootstrapURLKeys:{key:this.state.key},defaultCenter:this.state.center,defaultZoom:this.state.zoom,yesIWantToUseGoogleMapApiInternals:!0},R,r.a.createElement(M,{lat:this.state.lat,lng:this.state.lng})))}}]),t}(n.Component),W=a(145),H=a.n(W),q=a(816),J=a(807),V=a(814),X=a(228);function Y(){var e=Object(C.a)(["\n    \n    overflow-y: scroll;\n    height: 200px;\n    \n    "]);return Y=function(){return e},e}var _=b.a.div(Y()),Z=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(i.a)(this,Object(u.a)(t).call(this,e))).handleFiles=function(e){a.setState({file:e.target.files[0],filename:e.target.files[0].name})},a.handleFileDescription=function(e){a.setState({FileDescription:e.target.value}),console.log(e.target.value)},a.handleFilesSubmit=function(e){null===a.state.FileDescription?alert("Please set a file's description"):a.getSignedUrl(),e.preventDefault()},a.state={file:null,filename:"",UploadUrl:"",FileDescription:null,user:"",jwtToken:"",filesOn:[],DescriptionArray:[],uploadProgress:null},a.handleAuth(),a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"UNSAFE_componentWillReceiveProps",value:function(e){this.setState({filesOn:e.url,DescriptionArray:e.descriptionArray})}},{key:"updateProgressBarValue",value:function(e){if(0!==e)return r.a.createElement(q.a,{now:e})}},{key:"getFiles",value:function(){var e=this,t=this.state.filesOn;return t.map((function(a){return r.a.createElement("tr",null,r.a.createElement("td",null,t.indexOf(a)+1),r.a.createElement("td",null,r.a.createElement("a",{href:a},a.split(".com/")[1])),r.a.createElement("td",null,e.state.DescriptionArray[t.indexOf(a)]))}))}},{key:"getSignedUrl",value:function(){var e=this;return g.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:return console.log(this.state.jwtToken),t.next=3,g.a.awrap(S.a.patch(P+"/item/"+this.props.serviceID+"?item=service&filename="+this.state.filename,{description:this.state.FileDescription},{headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(this.state.jwtToken)}}).then((function(t){e.setState({UploadUrl:t.data.Url}),console.log(e.state.UploadUrl),e.UploadFile()})).catch((function(e){console.log(e)})));case 3:case"end":return t.stop()}}),null,this)}},{key:"UploadFile",value:function(){var e=this;return g.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,g.a.awrap(S.a.put(this.state.UploadUrl,this.state.file,{onUploadProgress:function(t){t.lengthComputable&&(console.log(t.loaded+" "+t.total),null!==t.total&&e.setState({uploadProgress:Math.round(100*t.loaded/t.total)}))}}).then((function(e){console.log("File has been uploaded"),window.location="/results"})).catch((function(e){return console.log(e)})));case 2:case"end":return t.stop()}}),null,this)}},{key:"handleAuth",value:function(){var e;return g.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:return e=new k,t.next=3,g.a.awrap(e.token());case 3:this.setState({user:e.state.user,jwtToken:e.state.jwtToken});case 4:case"end":return t.stop()}}),null,this)}},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(D.a,null,r.a.createElement(L.a,null,r.a.createElement(A.a,{style:{width:"30rem"}},r.a.createElement(A.a.Header,null,"Archives"),r.a.createElement(A.a.Text,null,r.a.createElement(_,null,r.a.createElement(J.a,{striped:!0,bordered:!0,hover:!0},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"#"),r.a.createElement("th",null,"File Name"),r.a.createElement("th",null,"Description"))),r.a.createElement("tbody",null,this.getFiles()))," ")))),r.a.createElement(L.a,null,r.a.createElement(V.a,null,r.a.createElement(A.a,{style:{width:"30rem"}},r.a.createElement(A.a.Header,null,r.a.createElement(V.a.Toggle,{as:f.a,variant:"link",eventKey:"0"},r.a.createElement(f.a,{variant:"primary",type:"submit"},"Add a file")),this.updateProgressBarValue(this.state.uploadProgress)),r.a.createElement(V.a.Collapse,{eventKey:"0"},r.a.createElement(A.a.Body,null,r.a.createElement(j.a,null,r.a.createElement(j.a.Row,null,r.a.createElement(j.a.Group,{as:L.a,controlId:"FileDescr"},r.a.createElement(j.a.Label,null,"Description"),r.a.createElement(X.a,{name:"Description",type:"text",onChange:this.handleFileDescription})),r.a.createElement(j.a.Group,{as:L.a,controlId:"File"},r.a.createElement(j.a.Label,null,"File to Upload"),r.a.createElement(X.a,{name:"files",type:"file",onChange:this.handleFiles})))),r.a.createElement(V.a.Toggle,{as:f.a,variant:"link",eventKey:"1"},r.a.createElement(f.a,{variant:"primary",type:"submit",onClick:this.handleFilesSubmit},"Upload")))))))))}}]),t}(n.Component),$=Object(x.f)(Z),Q=a(110),ee=a(810),te=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(i.a)(this,Object(u.a)(t).call(this,e))).handleImput=function(e){a.handleAuth();var t=e.target,n=t.value,r=t.name;a.setState(Object(Q.a)({},r,n))},a.handleClose=function(){a.setState({show:!1}),window.location="/results"},a.state={CustomerName:a.props.customer.CustomerName,SiteNumber:a.props.customer.SiteNumber,Address:a.props.customer.Address,City:a.props.customer.City,Province:a.props.customer.Province,PostalCode:a.props.customer.PostalCode,ContactName:a.props.customer.ContactName,Phone:a.props.customer.Phone,CustomerID:a.props.customer.CustomerID,jwtToken:"",user:"",show:!0},a.updateCustomer=a.updateCustomer.bind(Object(N.a)(a)),a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"handleAuth",value:function(){var e;return g.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:return e=new k,t.next=3,g.a.awrap(e.token());case 3:this.setState({user:e.state.user,jwtToken:e.state.jwtToken});case 4:case"end":return t.stop()}}),null,this)}},{key:"updateCustomer",value:function(){var e,t=this;return g.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:return console.log(this.state.jwtToken),e={CustomerName:this.state.CustomerName,SiteNumber:this.state.SiteNumber,Address:this.state.Address,City:this.state.City,Province:this.state.Province,Phone:this.state.Phone,PostalCode:this.state.PostalCode,ContactName:this.state.ContactName,CustomerID:this.state.CustomerID},a.next=4,g.a.awrap(S.a.patch(P+"/customer/"+this.state.CustomerID,e,{headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(this.state.jwtToken)}}).then((function(e){t.handleClose()})).catch((function(e){return console.log(e)})));case 4:case"end":return a.stop()}}),null,this)}},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(ee.a,{show:this.state.show,size:"lg","aria-labelledby":"contained-modal-title-vcenter",centered:!0},r.a.createElement(ee.a.Header,null,r.a.createElement(ee.a.Title,{id:"contained-modal-title-vcenter"},"Customer Update")),r.a.createElement(ee.a.Body,null,r.a.createElement(j.a.Row,null,r.a.createElement(j.a.Group,{as:L.a,controlId:"CustomerName"},r.a.createElement(j.a.Label,null,"Customer"),r.a.createElement(j.a.Control,{type:"text",placeholder:this.state.CustomerName,onChange:this.handleImput,name:"CustomerName"})),r.a.createElement(j.a.Group,{as:L.a,controlId:"SiteNumber"},r.a.createElement(j.a.Label,null,"Site Number:"),r.a.createElement(j.a.Control,{type:"Site",placeholder:this.state.SiteNumber,onChange:this.handleImput,name:"SiteNumber"}))),r.a.createElement(j.a.Group,{controlId:"Address"},r.a.createElement(j.a.Label,null,"Address"),r.a.createElement(j.a.Control,{placeholder:this.state.Address,onChange:this.handleImput,name:"Address"})),r.a.createElement(j.a.Row,null,r.a.createElement(j.a.Group,{as:L.a,controlId:"City"},r.a.createElement(j.a.Label,null,"City"),r.a.createElement(j.a.Control,{onChange:this.handleImput,name:"City",placeholder:this.state.City})),r.a.createElement(j.a.Group,{as:L.a,controlId:"Province"},r.a.createElement(j.a.Label,null,"Province"),r.a.createElement(j.a.Control,{as:"select",onChange:this.handleImput,name:"Province",placeholder:this.state.Province},r.a.createElement("option",null,"Choose..."),r.a.createElement("option",null,"Alberta"),r.a.createElement("option",null,"British Columbia"))),r.a.createElement(j.a.Group,{as:L.a,controlId:"PostalCode"},r.a.createElement(j.a.Label,null,"Postal Code"),r.a.createElement(j.a.Control,{onChange:this.handleImput,name:"PostalCode",placeholder:this.state.PostalCode}))),r.a.createElement(j.a.Row,null,r.a.createElement(j.a.Group,{as:L.a,controlId:"ContactName"},r.a.createElement(j.a.Label,null,"Contact Name:"),r.a.createElement(j.a.Control,{placeholder:this.state.ContactName,onChange:this.handleImput,name:"ContactName"})),r.a.createElement(j.a.Group,{as:L.a,controlId:"Phone"},r.a.createElement(j.a.Label,null,"Phone:"),r.a.createElement(j.a.Control,{placeholder:this.state.Phone,onChange:this.handleImput,name:"Phone"})))),r.a.createElement(ee.a.Footer,null,r.a.createElement(f.a,{onClick:this.updateCustomer},"Update"),r.a.createElement(f.a,{onClick:this.handleClose},"Close"))))}}]),t}(n.Component);a(133);function ae(){var e=Object(C.a)(["\n    position: relative;\n    font-size: 14px;\n "]);return ae=function(){return e},e}function ne(){var e=Object(C.a)(["\n    position: relative;\n    height: 300px;\n    text-align: left;\n    top: 20px;\n "]);return ne=function(){return e},e}function re(){var e=Object(C.a)(["\n    overflow: auto;\n    position: relative; \n    height: 300px;\n    \n "]);return re=function(){return e},e}function le(){var e=Object(C.a)(["\n    text-align: left;\n    position: relative;     \n    "]);return le=function(){return e},e}function oe(){var e=Object(C.a)(["\n    text-align: left;\n    position: relative;\n     \n    "]);return oe=function(){return e},e}function se(){var e=Object(C.a)(["\n    font-size: 1em;\n    position: relative;\n    "]);return se=function(){return e},e}function ce(){var e=Object(C.a)(["\n    font-size: 1.2em;\n    position: relative;\n    "]);return ce=function(){return e},e}function ie(){var e=Object(C.a)(["          \n    \n    margin: 16px ;\n    position: relative;                             \n    "]);return ie=function(){return e},e}var ue=b.a.div(ie()),me=b.a.h1(ce()),he=b.a.div(se()),de=b.a.div(oe()),pe=b.a.div(le()),Ee=b.a.div(re()),Ce=b.a.div(ne()),ve=b.a.div(ae()),fe=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(i.a)(this,Object(u.a)(t).call(this,e))).editButton=function(){a.setState({editCustomer:!0})},a.state={isLoading:!0,ticket:[],Comments:[],CustomerId:"",CustomerName:"",SiteNumber:"",Address:"",City:"",Province:"",PostalCode:"",ContactName:"",Phone:"",zoom:8,Addressfull:"",coordinates:null,newSearch:!1,editCustomer:!1,reload:!1},a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"handleSearch",value:function(){var e=this.props.location.state.searchText;this.getItem(e,"service")}},{key:"componentDidMount",value:function(){this.handleSearch()}},{key:"componentDidUpdate",value:function(e){var t=e.location.state.searchText;console.log("Prev Search: ",t);var a=this.props.location.state.searchText;console.log("new Search: ",a),t!==a&&(this.setState({newSearch:!0}),this.handleSearch()),!0===this.state.newSearch&&(console.log("new search is true"),this.handleSearch())}},{key:"handleMaprequest",value:function(){return null!==this.state.coordinates?!0===this.state.newSearch?(console.log("new search, reseting google maps"),this.setState({coordinates:null,newSearch:!1}),r.a.createElement("div",null,r.a.createElement(T.a,{animation:"border",role:"status"},r.a.createElement("span",{className:"sr-only"},"Loading...")))):(console.log("first search, Starting google maps"),r.a.createElement("div",null,r.a.createElement(K,{Coordinates:this.state.coordinates}))):(console.log("No coordinates "),r.a.createElement("div",null,r.a.createElement(T.a,{animation:"border",role:"status"},r.a.createElement("span",{className:"sr-only"},"Loading..."))))}},{key:"handleGeolocation",value:function(){var e=this;this.setState({Addressfull:this.state.Address+" "+this.state.City+" "+this.state.Province+" "+this.state.PostalCode}),H.a.setApiKey("AIzaSyDM1anm6wLXg3LsLg33sN2-RaK4soOJYRE");var t=this.state.Addressfull;H.a.fromAddress(t).then((function(t){var a=t.results[0].geometry.location,n=a.lat,r=a.lng;e.setState({coordinates:{lat:n,lng:r}})})).catch((function(e){console.error(e)}))}},{key:"handleCustomerEdit",value:function(){var e=null;if(this.state.editCustomer)return e={CustomerName:this.state.CustomerName,SiteNumber:this.state.SiteNumber,Address:this.state.Address,City:this.state.City,Province:this.state.Province,Phone:this.state.Phone,PostalCode:this.state.PostalCode,ContactName:this.state.ContactName,CustomerID:this.state.CustomerId},r.a.createElement(te,{customer:e})}},{key:"getItem",value:function(e,t){var a,n=this;return g.a.async((function(r){for(;;)switch(r.prev=r.next){case 0:return a=new k,r.next=3,g.a.awrap(a.token());case 3:return r.next=5,g.a.awrap(S.a.get(P+"/item/"+e+"?item="+t,{headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(a.state.jwtToken)}}).then((function(e){"service"===t?(n.setState({isLoading:!1,ticket:e.data.ticket[0],Comments:e.data.ticket[0].Comments,CustomerId:e.data.ticket[0].CustomerID}),n.getItem(n.state.CustomerId,"customer")):(n.setState({CustomerName:e.data.customer[0].CustomerName,SiteNumber:e.data.customer[0].SiteNumber,Address:e.data.customer[0].Address,City:e.data.customer[0].City,Province:e.data.customer[0].Province,PostalCode:e.data.customer[0].PostalCode,ContactName:e.data.customer[0].ContactName,Phone:e.data.customer[0].Phone}),n.handleGeolocation())})).catch((function(e){console.log(e),alert("No Ticket or Customer has been found"),window.location="/"})));case 5:case"end":return r.stop()}}))}},{key:"render",value:function(){var e=this.handleMaprequest(),t=this.handleCustomerEdit(),a=this.state.Comments,n=a.map((function(e){return r.a.createElement("div",{key:a.indexOf[e]},r.a.createElement(ue,null,r.a.createElement(A.a,{style:{width:"35rem"}},r.a.createElement(A.a.Body,null,r.a.createElement(A.a.Title,null,"Date: ",e.date," "),r.a.createElement(A.a.Subtitle,{className:"mb-2 text-muted"},"By: ",e.By),r.a.createElement(A.a.Text,null,e.text)))))}));return r.a.createElement("div",null,r.a.createElement(v.a,null,r.a.createElement(D.a,null,r.a.createElement(L.a,null,r.a.createElement(me,{className:"hr"}," ",r.a.createElement("hr",null),"Ticket Number: ",this.state.ticket.ServiceID))),r.a.createElement(D.a,null,r.a.createElement(L.a,null,r.a.createElement(de,null,r.a.createElement(A.a,{style:{width:"30rem"}},r.a.createElement(A.a.Body,null,r.a.createElement(A.a.Title,null,this.state.CustomerName," "),r.a.createElement(A.a.Text,null,r.a.createElement("p",null," Site Number: ",this.state.SiteNumber),r.a.createElement("p",null,this.state.Address,"  ",this.state.City,", ",this.state.Province," , ",this.state.PostalCode),r.a.createElement("p",null," Contact: ",this.state.ContactName,",   Phone : ",this.state.Phone)),r.a.createElement(f.a,{variant:"primary",onClick:this.editButton},"edit")))),r.a.createElement(he,null,r.a.createElement(A.a,{style:{width:"30rem"}},r.a.createElement(A.a.Body,null,r.a.createElement(A.a.Title,null," ",this.state.ticket.Title," "),r.a.createElement(A.a.Text,null,r.a.createElement("p",null,"Description:"),this.state.ticket.Description))))),r.a.createElement(L.a,null,r.a.createElement(pe,null,r.a.createElement(A.a,{style:{width:"30rem"}},e)))),r.a.createElement(D.a,null,r.a.createElement(L.a,null,r.a.createElement("div",null," ",r.a.createElement("hr",null)," "))),r.a.createElement(D.a,null,r.a.createElement(L.a,null,r.a.createElement(Ee,null,r.a.createElement(A.a,null,r.a.createElement(A.a.Header,null,"Comments"),n))),r.a.createElement(L.a,null,r.a.createElement(ve,null,r.a.createElement(O,{ServiceID:this.state.ticket.ServiceID})),t)),r.a.createElement(D.a,null,r.a.createElement(L.a,null,r.a.createElement("div",null," ",r.a.createElement("hr",null)," "))),r.a.createElement(Ce,null,r.a.createElement($,{url:this.state.ticket.attachmentUrl,descriptionArray:this.state.ticket.fileDescription,serviceID:this.state.ticket.ServiceID})),r.a.createElement(D.a,null,r.a.createElement(L.a,null,r.a.createElement("div",null," ",r.a.createElement("hr",null)," ")))))}}]),t}(n.Component);function be(){var e=Object(C.a)([" \n    display: block;            \n    \n    \n    margin: 16px ;\n    border: 1px solid #DCDCDC;\n    box-shadow: 0 2px 3px #ccc;\n    padding: 10px;\n    text-align: left;\n    position: relative;\n    word-wrap: break-word;\n    \n    overflow: auto;              \n                  "]);return be=function(){return e},e}var ye=b.a.div(be()),ge=function(e){function t(e){var a;return Object(s.a)(this,t),(a=Object(i.a)(this,Object(u.a)(t).call(this,e))).handleChk=function(){!1===a.state.chkNewCustomer?a.setState({chkNewCustomer:!0}):a.setState({chkNewCustomer:!1})},a.handleCustomerSubmit=function(e){if(a.state.chkNewCustomer){var t={CustomerName:a.state.CustomerName,SiteNumber:a.state.SiteNumber,Address:a.state.Address,City:a.state.City,Province:a.state.Province,Phone:a.state.Phone,PostalCode:a.state.PostalCode,ContactName:a.state.ContactName};a.createItem(t,"customer"),e.preventDefault()}else a.searchCustomer(a.state.CustomerName),e.preventDefault()},a.handleServiceSubmit=function(e){var t={CustomerID:a.state.CustomerID,Title:a.state.Title,Description:a.state.Description,Status:a.state.Status,PriorityLevel:a.state.PriorityLevel,CreatedBy:a.state.user};a.createItem(t,"service"),e.preventDefault()},a.handleImput=function(e){a.handleAuth();var t=e.target,n=t.value,r=t.name;a.setState(Object(Q.a)({},r,n))},a.state={chkNewCustomer:!1,CustomerName:"",SiteNumber:"",Address:"",City:"",Province:"",PostalCode:"",ContactName:"",Phone:"",CustomerID:"",Title:"",Description:"",Status:"",PriorityLevel:"",CreatedBy:"",jwtToken:"",CustomMessage:"",user:"",customerSearchlst:null,modalShow:!1},a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"handleAuth",value:function(){var e;return g.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:return e=new k,t.next=3,g.a.awrap(e.token());case 3:this.setState({user:e.state.user,jwtToken:e.state.jwtToken});case 4:case"end":return t.stop()}}),null,this)}},{key:"createItem",value:function(e,t){var a=this;return g.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:return console.log(e),n.next=3,g.a.awrap(S.a.post(P+"/item?item="+t,e,{headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(this.state.jwtToken)}}).then((function(e){"customer"===t?(a.setState({CustomerID:e.data.item.CustomerID,CustomMessage:"Customer has been Created."}),console.log(e.data.item.CustomerID)):(console.log(e.data.item.ServiceID),a.setState({CustomMessage:"Service has been Created."}),a.props.history.push({pathname:"/results",state:{searchText:e.data.item.ServiceID}}))})).catch((function(e){alert("Customer not created, it might already exists",e),console.log(e)})));case 3:case"end":return n.stop()}}),null,this)}},{key:"searchCustomer",value:function(e){var t=this;return g.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,g.a.awrap(S.a.get(P+"/customername/"+e,{headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(this.state.jwtToken)}}).then((function(e){t.setState({customerSearchlst:e.data.customer,modalShow:!0}),console.log(e.data.customer)})).catch((function(e){return console.log(e)})));case 2:case"end":return a.stop()}}),null,this)}},{key:"showCustomerSearch",value:function(){var e=this,t=this.state.customerSearchlst;return t.map((function(a){return r.a.createElement("tr",{className:"clickable-row",onClick:function(){return e.chooseCustomer(a)}},r.a.createElement("td",null,t.indexOf(a)+1),r.a.createElement("td",null,a.CustomerName),r.a.createElement("td",null,a.SiteNumber),r.a.createElement("td",null,a.City),r.a.createElement("td",null,a.Province),r.a.createElement("td",null,a.ContactName),r.a.createElement("td",null,a.Phone))}))}},{key:"chooseCustomer",value:function(e){this.setState({CustomerName:e.CustomerName,SiteNumber:e.SiteNumber,Address:e.SiteNumber,City:e.City,Province:e.Province,PostalCode:e.PostalCode,ContactName:e.ContactName,Phone:e.Phone,CustomerID:e.CustomerID,modalShow:!1,customerSearchlst:null})}},{key:"ModalList",value:function(){var e=this,t=!1;if(this.state.customerSearchlst&&this.state.modalShow)return t=!0,console.log("dentro del if"),r.a.createElement(ee.a,{show:t,size:"lg","aria-labelledby":"contained-modal-title-vcenter",centered:!0},r.a.createElement(ee.a.Header,null,r.a.createElement(ee.a.Title,{id:"contained-modal-title-vcenter"},"Search Result")),r.a.createElement(ee.a.Body,null,r.a.createElement(J.a,{striped:!0,bordered:!0,hover:!0},r.a.createElement("thead",null,r.a.createElement("tr",null,r.a.createElement("th",null,"#"),r.a.createElement("th",null,"Customer Name"),r.a.createElement("th",null,"Site Number"),r.a.createElement("th",null,"City"),r.a.createElement("th",null,"Province"),r.a.createElement("th",null,"Contact Name"),r.a.createElement("th",null,"Phone"))),r.a.createElement("tbody",null,this.showCustomerSearch()))),r.a.createElement(ee.a.Footer,null,r.a.createElement(f.a,{onClick:function(){t=!1,e.setState({modalShow:!1,customerSearchlst:null})}},"Close")))}},{key:"render",value:function(){var e="",t=null;return this.state.chkNewCustomer?(e="Submit",t=r.a.createElement("div",null,r.a.createElement(j.a.Group,{controlId:"Address"},r.a.createElement(j.a.Label,null,"Address"),r.a.createElement(j.a.Control,{placeholder:this.state.Address,onChange:this.handleImput,name:"Address"})),r.a.createElement(j.a.Row,null,r.a.createElement(j.a.Group,{as:L.a,controlId:"City"},r.a.createElement(j.a.Label,null,"City"),r.a.createElement(j.a.Control,{onChange:this.handleImput,name:"City",placeholder:this.state.City})),r.a.createElement(j.a.Group,{as:L.a,controlId:"Province"},r.a.createElement(j.a.Label,null,"Province"),r.a.createElement(j.a.Control,{as:"select",onChange:this.handleImput,name:"Province",placeholder:this.state.Province},r.a.createElement("option",null,"Choose..."),r.a.createElement("option",null,"Alberta"),r.a.createElement("option",null,"British Columbia"))),r.a.createElement(j.a.Group,{as:L.a,controlId:"PostalCode"},r.a.createElement(j.a.Label,null,"Postal Code"),r.a.createElement(j.a.Control,{onChange:this.handleImput,name:"PostalCode",placeholder:this.state.PostalCode}))),r.a.createElement(j.a.Row,null,r.a.createElement(j.a.Group,{as:L.a,controlId:"ContactName"},r.a.createElement(j.a.Label,null,"Contact Name:"),r.a.createElement(j.a.Control,{placeholder:this.state.ContactName,onChange:this.handleImput,name:"ContactName"})),r.a.createElement(j.a.Group,{as:L.a,controlId:"Phone"},r.a.createElement(j.a.Label,null,"Phone:"),r.a.createElement(j.a.Control,{placeholder:this.state.Phone,onChange:this.handleImput,name:"Phone"}))))):e="Search",r.a.createElement(v.a,null,r.a.createElement(D.a,null,r.a.createElement(L.a,null,r.a.createElement("div",null," ",r.a.createElement("hr",null)," "))),r.a.createElement(D.a,null,r.a.createElement(L.a,null,r.a.createElement(A.a,null,r.a.createElement(A.a.Body,null,r.a.createElement(A.a.Title,null,"Welcome"),r.a.createElement(A.a.Text,null,r.a.createElement("li",null,"Create a customer or search for an existing customer"),r.a.createElement("li",null,"Create a new service ticket")))))),r.a.createElement(ye,null,r.a.createElement(L.a,null,r.a.createElement(j.a,{onSubmit:this.handleCustomerSubmit},r.a.createElement(j.a.Row,null,r.a.createElement(j.a.Group,{as:L.a,controlId:"CustomerName"},r.a.createElement(j.a.Label,null,"Customer"),r.a.createElement(j.a.Control,{type:"text",placeholder:this.state.CustomerName,onChange:this.handleImput,name:"CustomerName"})),r.a.createElement(j.a.Group,{as:L.a,controlId:"SiteNumber"},r.a.createElement(j.a.Label,null,"Site Number:"),r.a.createElement(j.a.Control,{type:"Site",placeholder:this.state.SiteNumber,onChange:this.handleImput,name:"SiteNumber"}))),t,r.a.createElement(j.a.Group,{id:"formGridCheckbox"},r.a.createElement(j.a.Check,{type:"checkbox",label:"New Customer",onClick:this.handleChk})),r.a.createElement(f.a,{variant:"primary",type:"submit"},e),r.a.createElement("div",null," ",this.state.CustomMessage)))),r.a.createElement(ye,null,r.a.createElement(L.a,null,r.a.createElement(j.a,{onSubmit:this.handleServiceSubmit},r.a.createElement(j.a.Row,null,r.a.createElement(j.a.Group,{as:L.a,controlId:"formGridTtitle"},r.a.createElement(j.a.Label,null,"Ticket Title"),r.a.createElement(j.a.Control,{type:"Title",name:"Title",onChange:this.handleImput}))),r.a.createElement(j.a.Row,null,r.a.createElement(j.a.Group,{as:L.a,controlId:"formGridPrioritty"},r.a.createElement(j.a.Label,null,"Priority Level"),r.a.createElement(j.a.Control,{as:"select",name:"PriorityLevel",onChange:this.handleImput},r.a.createElement("option",null,"...Choose"),r.a.createElement("option",null,"Normal (5 days)"),r.a.createElement("option",null,"Level 1 (3 days)"),r.a.createElement("option",null,"Level 2 (next day)"),r.a.createElement("option",null,"Critical Level (5 hours)"))),r.a.createElement(j.a.Group,{as:L.a,controlId:"formGridStatus"},r.a.createElement(j.a.Label,null,"Status"),r.a.createElement(j.a.Control,{as:"select",name:"Status",onChange:this.handleImput},r.a.createElement("option",null,"...Choose"),r.a.createElement("option",null,"Create")))),r.a.createElement(j.a.Group,{controlId:"description"},r.a.createElement(j.a.Label,null,"Description:"),r.a.createElement(j.a.Control,{as:"textarea",rows:"5",placeholder:"Enter a brief description for this ticket",name:"Description",onChange:this.handleImput})),r.a.createElement(f.a,{variant:"primary",type:"submit"},"Create")))),this.ModalList())}}]),t}(n.Component),we=a(815),Se=a(813);function ke(){var e=Object(C.a)(["\n    width: 300px;\n    margin: 10px ;\n   "]);return ke=function(){return e},e}var Ne=b.a.div(ke()),je=function(e){function t(){var e,a;Object(s.a)(this,t);for(var n=arguments.length,r=new Array(n),l=0;l<n;l++)r[l]=arguments[l];return(a=Object(i.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(r)))).state={searchText:""},a.handleRoute=function(e){return function(){a.props.history.push({pathname:e})}},a.handleSearchSubmit=function(e){a.state.searchText?a.props.history.push({pathname:"/results",state:{searchText:a.state.searchText}}):alert("Please enter a Ticket Number")},a.handleSearchInput=function(e){a.setState({searchText:e.target.value}),console.log(e.target.value)},a.handleEnter=function(e){console.log(e.key),"Enter"===e.key&&(e.preventDefault(),a.handleSearchSubmit())},a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return r.a.createElement(D.a,null,r.a.createElement(v.a,null,r.a.createElement(we.a,{bg:"light",variant:"light"},r.a.createElement(we.a.Brand,null,r.a.createElement("a",{href:"https://www.juadel.com"},"SERVICE MANAGER")),r.a.createElement(we.a.Toggle,{"aria-controls":"responsive-navbar-nav"}),r.a.createElement(we.a.Collapse,{id:"responsive-navbar-nav"},r.a.createElement(Se.a,{className:"mr-auto"},r.a.createElement(Se.a.Link,{onClick:this.handleRoute("/service")},"New Service"))),r.a.createElement(j.a,{inline:!0},r.a.createElement(X.a,{type:"text",placeholder:"Ticket Number",className:"mr-sm-2",value:this.state.searchText,onChange:this.handleSearchInput,onKeyPress:this.handleEnter}),r.a.createElement(f.a,{className:"btn-search",variant:"outline-info",onClick:this.handleSearchSubmit},"Search")),r.a.createElement(Ne,null,r.a.createElement(E.a,{hideDefault:"false"},r.a.createElement(E.b,null)))),r.a.createElement(x.c,null,r.a.createElement(x.a,{path:"/service",component:ge}),r.a.createElement(x.a,{path:"/results",component:fe}),r.a.createElement(x.a,{path:"/",component:ge}))))}}]),t}(r.a.Component),Pe=Object(x.f)(je);h.b.configure(d);var xe=function(e){function t(){return Object(s.a)(this,t),Object(i.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(p.a,null,r.a.createElement(Pe,null)))}}]),t}(n.Component),Ie=Object(E.c)(xe,!1);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(Ie,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[265,1,2]]]);
//# sourceMappingURL=main.32dc38d0.chunk.js.map