(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{154:function(e,t,a){e.exports=a(347)},159:function(e,t,a){},160:function(e,t,a){},319:function(e,t,a){},346:function(e,t,a){},347:function(e,t,a){"use strict";a.r(t);var n=a(20),i=a(21),r=a(24),s=a(22),o=a(7),c=a(23),l=a(144),u=a(0),m=a.n(u),h=a(10),d=a.n(h),y=a(29),f=a(37);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(159);var p=a(349),g=a(350),v=a(145),b=(a(160),{"Content-Type":"application/json"}),k=function(e){function t(e){var a;return Object(n.a)(this,t),(a=Object(r.a)(this,Object(s.a)(t).call(this,e))).PIN=void 0,a.PIN=m.a.createRef(),a.state={redoAuth:a.props.isAuthenticated},a.tryPin=a.tryPin.bind(Object(o.a)(a)),a.tryPinQuick=a.tryPinQuick.bind(Object(o.a)(a)),a}return Object(c.a)(t,e),Object(i.a)(t,[{key:"tryPinQuick",value:function(e){4===e.length&&this.tryPin(e)}},{key:"tryPin",value:function(e){var t=this,a=function(e){t.PIN.current&&(t.PIN.current.value=""),e||t.setState(function(){return{redoAuth:!e}})}.bind(this);this.props.authenticatePin(e,a)}},{key:"render",value:function(){var e=this;return this.props.isAuthenticated?m.a.createElement(y.a,{to:"/main"}):m.a.createElement("div",{className:"Splash"},m.a.createElement("br",null),m.a.createElement(p.a,{className:"Image",src:"./images/grocerymonkey.jpg"}),m.a.createElement("br",null),m.a.createElement("br",null),m.a.createElement("h1",null,"Grocery Monkey"),m.a.createElement("br",null),m.a.createElement("div",{style:{display:"inline-block"}},m.a.createElement(g.a,null,m.a.createElement(v.a,{autoFocus:!0,ref:this.PIN,placeholder:"User PIN","aria-label":"User PIN","aria-describedby":"basic-addon1",onChange:function(){return e.tryPinQuick(e.PIN.current.value)}}),m.a.createElement(g.a.Append,{style:{cursor:"pointer"},onClick:function(){e.tryPin(e.PIN.current.value)}},m.a.createElement(g.a.Text,null,"Login"))),this.state.redoAuth?m.a.createElement(m.a.Fragment,null,m.a.createElement("br",null),m.a.createElement("span",{style:{color:"darkred"}},m.a.createElement("h3",null,"INVALID PIN"))):null))}}]),t}(m.a.Component),E=a(356),I=a(351),S=a(352),O=a(355),D=a(357),N=a(153),j=a(147),C=(a(318),a(319),a(354)),w=function(e){function t(e){var a;return Object(n.a)(this,t),(a=Object(r.a)(this,Object(s.a)(t).call(this,e))).state={monkeyImage:""},a.getMonkeyImage=a.getMonkeyImage.bind(Object(o.a)(a)),a}return Object(c.a)(t,e),Object(i.a)(t,[{key:"getMonkeyImage",value:function(){return"/images/monkey/monkey"+Math.floor(1+1*Math.random()).toString()+".gif"}},{key:"componentDidMount",value:function(){var e=this;this.setState(function(){return{monkeyImage:e.getMonkeyImage()}})}},{key:"render",value:function(){return m.a.createElement("div",{style:{width:"90%",height:"50%"}},m.a.createElement(C.a,{animation:!0,centered:!0,show:this.props.show},m.a.createElement(C.a.Header,null,m.a.createElement(C.a.Title,null,"You are a Grocery Monkey!")),m.a.createElement(C.a.Body,{style:{textAlign:"center"}},m.a.createElement("div",{style:{width:"100%}"}},m.a.createElement(p.a,{fluid:!0,roundedCircle:!0,src:this.state.monkeyImage}))),m.a.createElement(C.a.Footer,null,m.a.createElement(I.a,{variant:"secondary",onClick:this.props.monkeyDanceToggle},"More Monkey Stuff"),m.a.createElement(I.a,{variant:"primary",onClick:this.props.logOff},"No More Monkey"))))}}]),t}(m.a.Component),A=a(150),L=a(337),U=function(e){var t=e.toLowerCase();"s"===t.substr(t.length-1)&&(t=e.slice(0,-1));var a=L.search(t.toLowerCase());return a.length?":"+a[0].key+":":t.includes("natural")?":beer:":":shopping_trolley:"},P=function(e){function t(e){var a;return Object(n.a)(this,t),(a=Object(r.a)(this,Object(s.a)(t).call(this,e))).newItem=void 0,a.state={isAuthenticated:e.isAuthenticated,user:e.user,monkeyDance:!1,ui:{updateUser:!1,monkeyChange:!1,itemStatusList:[],distinctItems:[]},monkeyData:[]},a.newItem=m.a.createRef(),a.monkeyItemAction=a.monkeyItemAction.bind(Object(o.a)(a)),a.lookupStatus=a.lookupStatus.bind(Object(o.a)(a)),a.addMonkeyItem=a.addMonkeyItem.bind(Object(o.a)(a)),a.monkeyDo=a.monkeyDo.bind(Object(o.a)(a)),a.monkeyAll=a.monkeyAll.bind(Object(o.a)(a)),a.monkeyDanceToggle=a.monkeyDanceToggle.bind(Object(o.a)(a)),a}return Object(c.a)(t,e),Object(i.a)(t,[{key:"lookupStatus",value:function(e){var t;return t=this.state.ui.itemStatusList.filter(function(t){return t.statusID===parseInt(e)}),t.length?{actionType:t[0].action_type,status:t[0].status,status_verb:t[0].status_verb,status_active:t[0].status_active}:{actionType:0,status:0,status_verb:"",status_active:!1}}},{key:"monkeyItemAction",value:function(e,t){var a=this;e.preventDefault();var n=e.target.value,i=t,r=this.state.monkeyData,s=this.lookupStatus(n);r[i].itemActionType=s.actionType,r[i].itemStatus=s.status,r[i].itemStatusID=parseInt(n),r[i].itemStatusVerb=s.status_verb,r[i].itemStatusActive=s.status_active,r[i].itemUserID=this.state.user.user_id,r[i].itemUserName=this.state.user.name,this.setState(function(){return{monkeyData:r,ui:{updateUser:a.state.ui.updateUser,itemStatusList:a.state.ui.itemStatusList,distinctItems:a.state.ui.distinctItems,monkeyChange:!0}}})}},{key:"getMonkeyData",value:function(){var e,t=this;this.state.isAuthenticated,e=function(e){for(var a=[],n=0;n<e.groceryListItems.length;n++)a.push({itemNew:!1,itemActionType:0,itemID:e.groceryListItems[n].grocery_list_id,itemDate:e.groceryListItems[n].date,itemName:e.groceryListItems[n].item,itemCount:e.groceryListItems[n].count,itemCode:e.groceryListItems[n].code,itemNotes:e.groceryListItems[n].notes,itemStatusID:e.groceryListItems[n].status_id,itemStatus:e.groceryListItems[n].status,itemStatusVerb:e.groceryListItems[n].status_verb,itemStatusActive:e.groceryListItems[n].status_active,itemUserID:e.groceryListItems[n].user_id,itemUserName:e.groceryListItems[n].username});var i={updateUser:!1,monkeyChange:!1,itemStatusList:e.groceryItemStatus,distinctItems:e.distinctGroceryListItems};t.setState(function(){return{monkeyData:a,ui:i}})}.bind(this),fetch("/getmonkeydata",{method:"POST",headers:b,body:JSON.stringify({})}).then(function(e){return e.json()}).then(function(t){t.success?e(t.data):e({})})}},{key:"addMonkeyItem",value:function(e){var t=this;if(e.length>0){var a,n=e.split(","),i=this.state.monkeyData,r=0,s="";a=n[0].charAt(0).toUpperCase()+n[0].slice(1).toLowerCase(),2===n.length?r=parseInt(n[1]):3===n.length&&(r=parseInt(n[1]),s=n[2]),i.push({itemNew:!0,itemName:a,itemCount:r,itemNotes:s,itemStatusID:1,itemStatus:"NEW",itemStatusVerb:"NEEDS",itemStatusActive:!0,itemActionType:1,itemUserID:this.state.user.user_id,itemUserName:this.state.user.name,itemCode:U(a),itemDate:(new Date).toString(),itemID:0}),this.newItem.getInstance().clear(),this.setState(function(){return{monkeyData:i,ui:{updateUser:t.state.ui.updateUser,itemStatusList:t.state.ui.itemStatusList,distinctItems:t.state.ui.distinctItems,monkeyChange:!0}}})}}},{key:"monkeyDo",value:function(){var e,t,a=this;if(this.state.ui.monkeyChange){var n=this.state.monkeyData;console.log(n),e=n,t=function(e){e?(a.getMonkeyData(),a.setState(function(){return{monkeyDance:!0}})):alert("Error updating database")},fetch("/updatemonkeydata",{method:"PUT",headers:b,body:JSON.stringify(e)}).then(function(e){return e.json()}).then(function(e){e.success?t(!0):t(!1)})}else this.props.logOff()}},{key:"monkeyAll",value:function(){for(var e=this,t=this.state.monkeyData,a=0;a<t.length;a++){var n=this.state.ui.itemStatusList[this.state.ui.itemStatusList.length-1].statusID,i=this.lookupStatus(n.toString());t[a].itemActionType=i.actionType,t[a].itemStatus=i.status,t[a].itemStatusID=n,t[a].itemStatusVerb=i.status_verb,t[a].itemStatusActive=i.status_active,t[a].itemUserID=this.state.user.user_id,t[a].itemUserName=this.state.user.name}this.setState(function(){return{monkeyData:t,ui:{updateUser:e.state.ui.updateUser,itemStatusList:e.state.ui.itemStatusList,distinctItems:e.state.ui.distinctItems,monkeyChange:!0}}})}},{key:"monkeyDanceToggle",value:function(){var e=this;this.setState(function(){return{monkeyDance:!e.state.monkeyDance}})}},{key:"componentDidMount",value:function(){this.getMonkeyData()}},{key:"render",value:function(){var e=this;return m.a.createElement("div",{className:"Main"},m.a.createElement(w,{show:this.state.monkeyDance,monkeyDanceToggle:this.monkeyDanceToggle,logOff:this.props.logOff}),m.a.createElement(E.a,{fixed:"top",sticky:"top",bg:"light",expand:"lg"},m.a.createElement(E.a.Brand,{href:"#home"},"Grocery Monkey"),m.a.createElement(E.a.Toggle,{"aria-controls":"basic-navbar-nav"}),m.a.createElement(E.a.Collapse,{id:"basic-navbar-nav"},m.a.createElement("div",{style:{width:"100%",display:"flex",textAlign:"left"}},m.a.createElement(g.a,null,m.a.createElement(j.Typeahead,{id:"groceryTypeahead",selectHintOnEnter:!0,options:this.state.ui.distinctItems,placeholder:"Item, Quantity, Notes",clearButton:!0,labelKey:"item",emptyLabel:"",ref:function(t){return e.newItem=t}}),m.a.createElement(g.a.Append,null,m.a.createElement(I.a,{variant:"outline-success",onClick:function(){return e.addMonkeyItem(e.newItem.getInstance().getInput().value)}}," Add Item")))))),m.a.createElement("div",null,this.state.monkeyData.length?m.a.createElement(S.a,null,this.state.monkeyData.map(function(t,a){return m.a.createElement(A.a,{key:a,style:{display:"flex",alignItems:"center"}},m.a.createElement("div",{style:{width:"10%",textAlign:"center",display:"inline-block"}},m.a.createElement(p.a,{className:"list_profile_img",src:"./images/"+t.itemUserName+".jpg",roundedCircle:!0}),m.a.createElement("br",null),t.itemUserName),m.a.createElement("div",{style:{width:"60%",textAlign:"center",display:"inline-block"}},L.emojify(t.itemCode)+" "+t.itemName+(t.itemCount?" ("+t.itemCount+")":""),m.a.createElement("br",null),t.itemNotes),m.a.createElement("div",{style:{width:"30",textAlign:"right",display:"inline-block"}},m.a.createElement(O.a,null,m.a.createElement(O.a.Control,{as:"select",value:t.itemStatusID.toString(),onChange:function(t){return e.monkeyItemAction(t,a)}},e.state.ui.itemStatusList.filter(function(a){var n=e.state.user.user_id===t.itemUserID||a.action_sameuser;return t.itemNew?a.action_new&&n:n}).map(function(e,t){return m.a.createElement("option",{key:t,value:e.statusID.toString()}," ",e.status)})))))})):m.a.createElement("div",{style:{width:"100%",alignContent:"center",textAlign:"center"}},m.a.createElement("br",null),m.a.createElement("br",null),m.a.createElement("br",null),m.a.createElement(p.a,{id:"sad_fridge",src:"./images/sad_fridge.gif"}),m.a.createElement("h4",null,"Ain't nobody need nothin....")),m.a.createElement("br",null),m.a.createElement("br",null)),m.a.createElement(E.a,{bg:"dark",variant:"dark",sticky:"bottom",fixed:"bottom"},m.a.createElement(D.a,{style:{textAlign:"left",width:"30%"}},m.a.createElement("div",{style:{width:"100%",verticalAlign:"center"}},m.a.createElement(N.a,{as:f.b,to:"/user"},m.a.createElement(p.a,{alt:"",src:"./images/"+this.state.user.name+".jpg",width:"40",height:"40",className:"profile_Image",roundedCircle:!0})),m.a.createElement("span",{style:{visibility:"hidden"}},"X"),m.a.createElement("span",{style:{color:"white",fontWeight:"bold"}},this.state.user.name))),m.a.createElement(D.a,{style:{textAlign:"right",width:"70%"}},m.a.createElement("div",{style:{width:"100%",textAlign:"right"}},m.a.createElement(I.a,{variant:"light",onClick:function(){return e.monkeyAll()}},"Monkey All"),m.a.createElement("span",null,"  "),m.a.createElement(I.a,{variant:"light",onClick:function(){return e.monkeyDo()}},this.state.ui.monkeyChange?"Monkey Do":"Logoff")))))}}]),t}(m.a.Component),_=a(358),M=a(353),T=a(151),x=(a(346),function(e){function t(e){var a;return Object(n.a)(this,t),(a=Object(r.a)(this,Object(s.a)(t).call(this,e))).userName=void 0,a.PIN=void 0,a.email=void 0,a.sms=void 0,a.notify=void 0,a.userName=m.a.createRef(),a.PIN=m.a.createRef(),a.email=m.a.createRef(),a.sms=m.a.createRef(),a.notify=m.a.createRef(),a.state={changeUser:!1},a.needSave=a.needSave.bind(Object(o.a)(a)),a.updateUserLocal=a.updateUserLocal.bind(Object(o.a)(a)),a}return Object(c.a)(t,e),Object(i.a)(t,[{key:"needSave",value:function(){this.state.changeUser||this.setState(function(){return{changeUser:!0}})}},{key:"updateUserLocal",value:function(e){var t=this;e.preventDefault();var a={user_id:this.props.user.user_id,name:this.userName.current.value,pin:this.PIN.current.value,email:this.email.current.value,sms:this.sms.current.value,notify:this.notify.current.checked};this.props.updateUser(a,function(){return t.setState(function(){return{changeUser:!1}})})}},{key:"render",value:function(){var e=this;return m.a.createElement("div",{style:{width:"100%",textAlign:"center"}},m.a.createElement("div",{style:{width:"90%",display:"inline-block"}},m.a.createElement("br",null),m.a.createElement(O.a,{onSubmit:this.updateUserLocal},m.a.createElement(_.a,{bg:"light",style:{width:"100%",textAlign:"left"}},m.a.createElement(_.a.Header,null,m.a.createElement("div",{style:{width:"100%",display:"inline-block"}},m.a.createElement("div",{style:{display:"inline-block",textAlign:"left",width:"50%"}},m.a.createElement(p.a,{style:{width:"40px",height:"40px"},src:"./images/"+this.props.user.name+".jpg",roundedCircle:!0}),m.a.createElement("span",{style:{visibility:"hidden"}},"X"),m.a.createElement("span",{style:{fontWeight:"bold"}},this.props.user.name)),m.a.createElement("div",{style:{display:"inline-block",width:"50%",textAlign:"right"}},m.a.createElement(O.a.Group,null,m.a.createElement(f.b,{to:"/main"},m.a.createElement(I.a,null,"Back")),m.a.createElement("span",{style:{visibility:"hidden"}},"  "),m.a.createElement(I.a,{disabled:!this.state.changeUser,type:"submit"},"Save"))))),m.a.createElement(_.a.Body,null,m.a.createElement(O.a.Group,{as:M.a,controlId:"formHorizontalName"},m.a.createElement(O.a.Label,{column:!0,sm:2},"User Name"),m.a.createElement(T.a,{sm:10},m.a.createElement(O.a.Control,{ref:this.userName,onChange:function(){return e.needSave()},placeholder:"User Name",defaultValue:this.props.user.name}))),m.a.createElement(O.a.Group,{as:M.a,controlId:"formHorizontalPIN"},m.a.createElement(O.a.Label,{column:!0,sm:2},"PIN"),m.a.createElement(T.a,{sm:10},m.a.createElement(O.a.Control,{ref:this.PIN,onChange:function(){return e.needSave()},type:"password",placeholder:"PIN",defaultValue:this.props.user.pin}))),m.a.createElement(O.a.Group,{as:M.a,controlId:"formHorizontalEmail"},m.a.createElement(O.a.Label,{column:!0,sm:2},"Email"),m.a.createElement(T.a,{sm:10},m.a.createElement(O.a.Control,{ref:this.email,onChange:function(){return e.needSave()},type:"email",placeholder:"Email",defaultValue:this.props.user.email}))),m.a.createElement(O.a.Group,{as:M.a,type:"email",controlId:"formHorizontalSMS"},m.a.createElement(O.a.Label,{column:!0,sm:2},"SMS"),m.a.createElement(T.a,{sm:10},m.a.createElement(O.a.Control,{ref:this.sms,onChange:function(){return e.needSave()},placeholder:"SMS",defaultValue:this.props.user.sms}))),m.a.createElement(O.a.Group,{as:M.a,controlId:"formHorizontalCheck"},m.a.createElement(T.a,{sm:{span:10,offset:2}},m.a.createElement(O.a.Check,{ref:this.notify,onChange:function(){return e.needSave()},label:"Grocery Monkey Notifications",defaultChecked:this.props.user.notify}))))))))}}]),t}(m.a.Component)),G=function(e){var t=e.component,a=Object(l.a)(e,["component"]);return m.a.createElement(y.b,Object.assign({},a,{render:function(){return!0===e.isAuthenticated?m.a.createElement(t,e):m.a.createElement(y.a,{to:"/"})}}))},V=function(e){function t(e){var a;return Object(n.a)(this,t),(a=Object(r.a)(this,Object(s.a)(t).call(this,e))).state={auth:!1,user:{user_id:0,name:""}},a.authenticatePin=a.authenticatePin.bind(Object(o.a)(a)),a.logOff=a.logOff.bind(Object(o.a)(a)),a.updateUser=a.updateUser.bind(Object(o.a)(a)),a}return Object(c.a)(t,e),Object(i.a)(t,[{key:"logOff",value:function(){this.setState(function(){return{auth:!1}})}},{key:"authenticatePin",value:function(e,t){var a=this;!function(e,t){fetch("/authenticateuser",{method:"POST",headers:b,body:JSON.stringify({pin:e})}).then(function(e){return e.json()}).then(function(e){t(e.success,e.user)})}(e,function(e,n){a.setState(function(){return{auth:e,user:n}}),t(e)}.bind(this))}},{key:"updateUser",value:function(e,t){var a=this;!function(e,t){fetch("/updateuser",{method:"PUT",headers:b,body:JSON.stringify(e)}).then(function(e){return e.json()}).then(function(e){e.success?t(e.user):t({})})}(e,function(e){a.setState(function(){return{user:e}}),t()}.bind(this))}},{key:"render",value:function(){var e=this;return m.a.createElement(f.a,null,m.a.createElement(y.b,{exact:!0,path:"/",render:function(t){return m.a.createElement(k,Object.assign({},t,{isAuthenticated:e.state.auth,authenticatePin:e.authenticatePin}))}}),m.a.createElement(G,{path:"/main",component:P,isAuthenticated:this.state.auth,user:this.state.user,logOff:this.logOff}),m.a.createElement(G,{path:"/user",component:x,isAuthenticated:this.state.auth,user:this.state.user,updateUser:this.updateUser}))}}]),t}(m.a.Component);d.a.render(m.a.createElement(V,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[154,1,2]]]);
//# sourceMappingURL=main.ac78c5ed.chunk.js.map