(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{156:function(e,t,a){e.exports=a(348)},161:function(e,t,a){},162:function(e,t,a){},321:function(e,t,a){},347:function(e,t,a){},348:function(e,t,a){"use strict";a.r(t);var n=a(13),i=a(14),r=a(17),s=a(15),u=a(7),o=a(16),c=a(146),l=a(0),m=a.n(l),d=a(10),h=a.n(d),y=a(29),f=a(37);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(161);var g=a(350),p=a(351),k=a(147),b=(a(162),{"Content-Type":"application/json"}),v=[{item:"natural",match:":beer:"},{item:"toilet",match:":toilet:"},{item:"water",match:":droplet:"},{item:"dud:",match:":chocolate_bar:"},{item:"yogurt",match:":custard:"},{item:"spoon",match:":fork_and_knife:"},{item:"fork",match:":fork_and_knife"},{item:"utensil",match:":fork_and_knife:"},{item:"pizza",match:":pizza:"},{item:"seagram",match:":cocktail:"},{item:"chicken",match:":poultry_leg:"},{item:"pasta",match:":spaghetti:"},{item:"juice",match:":tropical_drink:"},{item:"milk",match:":sake:"},{item:"lemonade",match:":lemon:"},{item:"arnold",match:":lemon:"},{item:"bagel",match:":doughnut:"},{item:"potato",match:":sweet_potato:"},{item:"sprite",match:":sparkles:"},{item:"polar",match:":dizzy:"},{item:"toothpaste",match:":grin:"},{item:"tylenol",match:":pill:"},{item:"towel",match:":page_with_curl:"}],E=function(e){function t(e){var a;return Object(n.a)(this,t),(a=Object(r.a)(this,Object(s.a)(t).call(this,e))).PIN=void 0,a.PIN=m.a.createRef(),a.state={redoAuth:a.props.isAuthenticated},a.tryPin=a.tryPin.bind(Object(u.a)(a)),a.tryPinQuick=a.tryPinQuick.bind(Object(u.a)(a)),a}return Object(o.a)(t,e),Object(i.a)(t,[{key:"tryPinQuick",value:function(e){4===e.length&&this.tryPin(e)}},{key:"tryPin",value:function(e){var t=this,a=function(e){t.PIN.current&&(t.PIN.current.value=""),e||t.setState(function(){return{redoAuth:!e}})}.bind(this);this.props.authenticatePin(e,a)}},{key:"render",value:function(){var e=this;return this.props.isAuthenticated?m.a.createElement(y.a,{to:"/main"}):m.a.createElement("div",{className:"Splash"},m.a.createElement("br",null),m.a.createElement(g.a,{className:"Image",src:"./images/grocerymonkey.jpg"}),m.a.createElement("br",null),m.a.createElement("br",null),m.a.createElement("h1",null,"Grocery Monkey"),m.a.createElement("br",null),m.a.createElement("div",{style:{display:"inline-block"}},m.a.createElement(p.a,null,m.a.createElement(k.a,{autoFocus:!0,ref:this.PIN,placeholder:"User PIN","aria-label":"User PIN","aria-describedby":"basic-addon1",onChange:function(){return e.tryPinQuick(e.PIN.current.value)}}),m.a.createElement(p.a.Append,{style:{cursor:"pointer"},onClick:function(){e.tryPin(e.PIN.current.value)}},m.a.createElement(p.a.Text,null,"Login"))),this.state.redoAuth?m.a.createElement(m.a.Fragment,null,m.a.createElement("br",null),m.a.createElement("span",{style:{color:"darkred"}},m.a.createElement("h3",null,"INVALID PIN"))):null))}}]),t}(m.a.Component),I=a(357),S=a(352),O=a(353),j=a(152),w=a(356),C=a(358),D=a(155),N=a(149),A=(a(320),a(321),a(355)),_=function(e){function t(e){var a;return Object(n.a)(this,t),(a=Object(r.a)(this,Object(s.a)(t).call(this,e))).state={monkeyImage:""},a.getMonkeyImage=a.getMonkeyImage.bind(Object(u.a)(a)),a}return Object(o.a)(t,e),Object(i.a)(t,[{key:"getMonkeyImage",value:function(){return"/images/monkey/monkey"+Math.floor(1+1*Math.random()).toString()+".gif"}},{key:"componentDidMount",value:function(){var e=this;this.setState(function(){return{monkeyImage:e.getMonkeyImage()}})}},{key:"render",value:function(){return m.a.createElement("div",{style:{width:"90%",height:"50%"}},m.a.createElement(A.a,{animation:!0,centered:!0,show:this.props.show},m.a.createElement(A.a.Header,null,m.a.createElement(A.a.Title,null,"You are a Grocery Monkey!")),m.a.createElement(A.a.Body,{style:{textAlign:"center"}},m.a.createElement("div",{style:{width:"100%}"}},m.a.createElement(g.a,{fluid:!0,roundedCircle:!0,src:this.state.monkeyImage}))),m.a.createElement(A.a.Footer,null,m.a.createElement(S.a,{variant:"secondary",onClick:this.props.monkeyDanceToggle},"More Monkey Stuff"),m.a.createElement(S.a,{variant:"primary",onClick:this.props.logOff},"No More Monkey"))))}}]),t}(m.a.Component),L=a(143),U=a(144),M=function(e){function t(e){var a;return Object(n.a)(this,t),(a=Object(r.a)(this,Object(s.a)(t).call(this,e))).state={monkeyImage:"./images/monkey/monkey_running.gif"},a.getBananas=a.getBananas.bind(Object(u.a)(a)),a}return Object(o.a)(t,e),Object(i.a)(t,[{key:"getBananas",value:function(e){var t="";if(e){for(var a=1;a<=e;a++)t+=L.emojify(":banana:");return t}return""}},{key:"render",value:function(){var e=this;return m.a.createElement("div",{style:{width:"90%",height:"95%"}},m.a.createElement(A.a,{animation:!0,show:this.props.show},m.a.createElement(A.a.Header,null,m.a.createElement(A.a.Title,null,m.a.createElement(g.a,{fluid:!0,roundedCircle:!0,width:"60",height:"60",src:this.state.monkeyImage}),U(new Date,"mmmm")+" Monkey Race!")),m.a.createElement(A.a.Body,{style:{textAlign:"center"}},m.a.createElement("div",{style:{width:"100%}"}},m.a.createElement(O.a,null,this.props.users.map(function(t,a){return m.a.createElement(j.a,{key:a,style:{display:"flex",alignItems:"center"}},m.a.createElement("div",{style:{width:"20%",textAlign:"center",display:"inline-block"}},m.a.createElement(g.a,{width:"40",height:"40",src:"./images/"+t.name+".jpg",roundedCircle:!0}),m.a.createElement("br",null),t.name),m.a.createElement("div",{style:{width:"80%",textAlign:"left",display:"inline-block"}},"Banana Count: ("+t.banana_count+")  "+e.getBananas(t.banana_count)))})))),m.a.createElement(A.a.Footer,null,m.a.createElement(S.a,{variant:"secondary",onClick:this.props.monkeyRaceToggle},"More Monkey Stuff"),m.a.createElement(S.a,{variant:"primary",onClick:this.props.logOff},"No More Monkey"))))}}]),t}(m.a.Component),P=a(143),T=a(144),x=function(e){var t=e.toLowerCase();"s"===t.substr(t.length-1)&&(t=t.slice(0,-1));for(var a=0;a<v.length;a++)if(t.includes(v[a].item))return v[a].match;var n=P.search(t);return n.length?":"+n[0].key+":":":shopping_trolley:"},R=function(e){function t(e){var a;return Object(n.a)(this,t),(a=Object(r.a)(this,Object(s.a)(t).call(this,e))).newItem=void 0,a.state={isAuthenticated:e.isAuthenticated,user:e.user,monkeyDance:!1,monkeyRace:!1,ui:{updateUser:!1,monkeyChange:!1,monkeyLoaded:!1,itemStatusList:[],distinctItems:[],users:[]},monkeyData:[]},a.newItem=m.a.createRef(),a.monkeyItemAction=a.monkeyItemAction.bind(Object(u.a)(a)),a.lookupStatus=a.lookupStatus.bind(Object(u.a)(a)),a.addMonkeyItem=a.addMonkeyItem.bind(Object(u.a)(a)),a.monkeyDo=a.monkeyDo.bind(Object(u.a)(a)),a.monkeyAll=a.monkeyAll.bind(Object(u.a)(a)),a.monkeyDanceToggle=a.monkeyDanceToggle.bind(Object(u.a)(a)),a.monkeyRaceToggle=a.monkeyRaceToggle.bind(Object(u.a)(a)),a.getBananaCount=a.getBananaCount.bind(Object(u.a)(a)),a}return Object(o.a)(t,e),Object(i.a)(t,[{key:"getBananaCount",value:function(e){var t;return(t=this.state.ui.users.filter(function(t){return t.user_id===e})).length?t[0].banana_count:0}},{key:"lookupStatus",value:function(e){var t;return t=this.state.ui.itemStatusList.filter(function(t){return t.statusID===parseInt(e)}),t.length?{actionType:t[0].action_type,status:t[0].status,status_verb:t[0].status_verb,status_active:t[0].status_active}:{actionType:0,status:0,status_verb:"",status_active:!1}}},{key:"monkeyItemAction",value:function(e,t){var a=this;e.preventDefault();var n=e.target.value,i=t,r=this.state.monkeyData,s=this.lookupStatus(n);r[i].itemActionType=s.actionType,r[i].itemStatus=s.status,r[i].itemStatusID=parseInt(n),r[i].itemStatusVerb=s.status_verb,r[i].itemStatusActive=s.status_active,r[i].itemUserID=this.state.user.user_id,r[i].itemUserName=this.state.user.name,this.setState(function(){return{monkeyData:r,ui:{updateUser:a.state.ui.updateUser,itemStatusList:a.state.ui.itemStatusList,distinctItems:a.state.ui.distinctItems,users:a.state.ui.users,monkeyChange:!0,monkeyLoaded:!0}}})}},{key:"getMonkeyData",value:function(){var e,t=this;this.state.isAuthenticated,e=function(e){for(var a=[],n=0;n<e.groceryListItems.length;n++)a.push({itemNew:!1,itemActionType:0,itemID:e.groceryListItems[n].grocery_list_id,itemDate:e.groceryListItems[n].date,itemName:e.groceryListItems[n].item,itemCount:e.groceryListItems[n].count,itemCode:e.groceryListItems[n].code,itemNotes:e.groceryListItems[n].notes,itemStatusID:e.groceryListItems[n].status_id,itemStatus:e.groceryListItems[n].status,itemStatusVerb:e.groceryListItems[n].status_verb,itemStatusActive:e.groceryListItems[n].status_active,itemUserID:e.groceryListItems[n].user_id,itemUserName:e.groceryListItems[n].username});var i={updateUser:!1,monkeyChange:!1,monkeyLoaded:!0,itemStatusList:e.groceryItemStatus,distinctItems:e.distinctGroceryListItems,users:e.users};t.setState(function(){return{monkeyData:a,ui:i}})}.bind(this),fetch("/getmonkeydata",{method:"POST",headers:b,body:JSON.stringify({})}).then(function(e){return e.json()}).then(function(t){t.success?e(t.data):e({})})}},{key:"addMonkeyItem",value:function(e){var t=this;if(e.length>0){var a,n=e.split(","),i=this.state.monkeyData,r="",s=0,u="";a=(r=n[0].replace(/(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|[\ud83c[\ude50\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g,"")).charAt(0).toUpperCase()+r.slice(1).toLowerCase(),2===n.length?s=n[1].length?parseInt(n[1]):0:3===n.length&&(s=parseInt(n[1]),u=n[2]),i.push({itemNew:!0,itemName:a,itemCount:s,itemNotes:u,itemStatusID:1,itemStatus:"NEW",itemStatusVerb:"NEEDS",itemStatusActive:!0,itemActionType:1,itemUserID:this.state.user.user_id,itemUserName:this.state.user.name,itemCode:x(a),itemDate:T(new Date,"yyyy-mm-dd HH:MM:ss"),itemID:0}),this.newItem.getInstance().clear(),this.setState(function(){return{monkeyData:i,ui:{updateUser:t.state.ui.updateUser,itemStatusList:t.state.ui.itemStatusList,distinctItems:t.state.ui.distinctItems,users:t.state.ui.users,monkeyChange:!0,monkeyLoaded:!0}}})}}},{key:"monkeyDo",value:function(){var e,t,a=this;if(this.state.ui.monkeyChange){var n=this.state.monkeyData;console.log(n),e=n,t=function(e){e?(a.getMonkeyData(),a.setState(function(){return{monkeyDance:!0}})):alert("Error updating database")},fetch("/updatemonkeydata",{method:"PUT",headers:b,body:JSON.stringify(e)}).then(function(e){return e.json()}).then(function(e){e.success?t(!0):t(!1)})}else this.props.logOff()}},{key:"monkeyAll",value:function(){for(var e=this,t=this.state.monkeyData,a=0;a<t.length;a++){var n=this.state.ui.itemStatusList[this.state.ui.itemStatusList.length-1].statusID,i=this.lookupStatus(n.toString());t[a].itemActionType=i.actionType,t[a].itemStatus=i.status,t[a].itemStatusID=n,t[a].itemStatusVerb=i.status_verb,t[a].itemStatusActive=i.status_active,t[a].itemUserID=this.state.user.user_id,t[a].itemUserName=this.state.user.name}this.setState(function(){return{monkeyData:t,ui:{updateUser:e.state.ui.updateUser,itemStatusList:e.state.ui.itemStatusList,distinctItems:e.state.ui.distinctItems,users:e.state.ui.users,monkeyChange:!0,monkeyLoaded:!0}}})}},{key:"monkeyDanceToggle",value:function(){var e=this;this.setState(function(){return{monkeyDance:!e.state.monkeyDance}})}},{key:"monkeyRaceToggle",value:function(){var e=this;this.setState(function(){return{monkeyRace:!e.state.monkeyRace}})}},{key:"componentDidMount",value:function(){this.getMonkeyData()}},{key:"render",value:function(){var e=this;return m.a.createElement("div",{className:"Main"},m.a.createElement(_,{show:this.state.monkeyDance,monkeyDanceToggle:this.monkeyDanceToggle,logOff:this.props.logOff}),m.a.createElement(M,{show:this.state.monkeyRace,users:this.state.ui.users,monkeyRaceToggle:this.monkeyRaceToggle,logOff:this.props.logOff}),m.a.createElement(I.a,{fixed:"top",sticky:"top",bg:"light",expand:"lg",style:{verticalAlign:"middle"}},m.a.createElement(I.a.Brand,null,m.a.createElement(g.a,{src:"/images/favicon.ico",style:{width:"30px",height:"30px",cursor:"pointer"},onClick:function(){return e.props.logOff()}})," Grocery Monkey - "+this.state.user.name),m.a.createElement(I.a.Toggle,{"aria-controls":"basic-navbar-nav"}),m.a.createElement(I.a.Collapse,{id:"basic-navbar-nav"},m.a.createElement("div",{style:{width:"100%",display:"flex",textAlign:"left"}},m.a.createElement(p.a,null,m.a.createElement(N.Typeahead,{id:"groceryTypeahead",selectHintOnEnter:!0,options:this.state.ui.distinctItems.map(function(e,t){return P.emojify(e.code)+e.item}),placeholder:"Item, Quantity, Notes",clearButton:!0,labelKey:"item",emptyLabel:"",ref:function(t){return e.newItem=t}}),m.a.createElement(p.a.Append,null,m.a.createElement(S.a,{variant:"outline-success",onClick:function(){return e.addMonkeyItem(e.newItem.getInstance().getInput().value)}}," Add Item")))))),m.a.createElement("div",null,this.state.monkeyData.length?m.a.createElement(O.a,null,this.state.monkeyData.map(function(t,a){return m.a.createElement(j.a,{key:a,style:{display:"flex",alignItems:"center"}},m.a.createElement("div",{style:{width:"10%",textAlign:"center",display:"inline-block"}},m.a.createElement(g.a,{className:"list_profile_img",src:"./images/"+t.itemUserName+".jpg",roundedCircle:!0}),m.a.createElement("br",null),t.itemUserName),m.a.createElement("div",{style:{width:"60%",textAlign:"center",display:"inline-block"}},P.emojify(t.itemCode)+" "+t.itemName+(t.itemCount?" ("+t.itemCount+")":""),m.a.createElement("br",null),t.itemNotes),m.a.createElement("div",{style:{width:"30",textAlign:"right",display:"inline-block"}},m.a.createElement(w.a,null,m.a.createElement(w.a.Control,{as:"select",value:t.itemStatusID.toString(),onChange:function(t){return e.monkeyItemAction(t,a)}},e.state.ui.itemStatusList.filter(function(a){var n=e.state.user.user_id===t.itemUserID||a.action_sameuser;return t.itemNew?a.action_new&&n:n}).map(function(e,t){return m.a.createElement("option",{key:t,value:e.statusID.toString()}," ",e.status)})))))})):this.state.ui.monkeyLoaded?m.a.createElement("div",{style:{width:"100%",alignContent:"center",textAlign:"center"}},m.a.createElement("br",null),m.a.createElement("br",null),m.a.createElement("br",null),m.a.createElement("br",null),m.a.createElement("br",null),m.a.createElement(g.a,{id:"sad_fridge",src:"./images/sad_fridge.gif"}),m.a.createElement("h4",null,"Ain't nobody need nothin....")):null,m.a.createElement("br",null),m.a.createElement("br",null)),m.a.createElement(I.a,{bg:"dark",variant:"dark",sticky:"bottom",fixed:"bottom"},m.a.createElement(C.a,{style:{textAlign:"left",width:"32%"}},m.a.createElement("div",{style:{width:"100%",verticalAlign:"center"}},m.a.createElement(D.a,{as:f.b,to:"/user"},m.a.createElement(g.a,{alt:"",src:"./images/"+this.state.user.name+".jpg",width:"40",height:"40",className:"profile_Image",roundedCircle:!0})),m.a.createElement("span",{style:{visibility:"hidden"}},"X"),m.a.createElement("span",{style:{color:"white",fontWeight:"bold",cursor:"pointer"},onClick:function(){return e.monkeyRaceToggle()}},P.emojify(":banana:")+"("+this.getBananaCount(this.state.user.user_id)+")"))),m.a.createElement(C.a,{style:{textAlign:"right",width:"68%"}},m.a.createElement("div",{style:{width:"100%",textAlign:"right"}},m.a.createElement(S.a,{variant:"light",onClick:function(){return e.monkeyAll()}},"Monkey All"),m.a.createElement("span",null,"  "),m.a.createElement(S.a,{variant:"light",onClick:function(){return e.monkeyDo()}},this.state.ui.monkeyChange?"Monkey Do":"Logoff")))))}}]),t}(m.a.Component),B=a(359),z=a(354),G=a(153),H=(a(347),function(e){function t(e){var a;return Object(n.a)(this,t),(a=Object(r.a)(this,Object(s.a)(t).call(this,e))).userName=void 0,a.PIN=void 0,a.email=void 0,a.sms=void 0,a.notify=void 0,a.userName=m.a.createRef(),a.PIN=m.a.createRef(),a.email=m.a.createRef(),a.sms=m.a.createRef(),a.notify=m.a.createRef(),a.state={changeUser:!1},a.needSave=a.needSave.bind(Object(u.a)(a)),a.updateUserLocal=a.updateUserLocal.bind(Object(u.a)(a)),a}return Object(o.a)(t,e),Object(i.a)(t,[{key:"needSave",value:function(){this.state.changeUser||this.setState(function(){return{changeUser:!0}})}},{key:"updateUserLocal",value:function(e){var t=this;e.preventDefault();var a={user_id:this.props.user.user_id,name:this.userName.current.value,pin:this.PIN.current.value,email:this.email.current.value,sms:this.sms.current.value,notify:this.notify.current.checked};this.props.updateUser(a,function(){return t.setState(function(){return{changeUser:!1}})})}},{key:"render",value:function(){var e=this;return m.a.createElement("div",{style:{width:"100%",textAlign:"center"}},m.a.createElement("div",{style:{width:"90%",display:"inline-block"}},m.a.createElement("br",null),m.a.createElement(w.a,{onSubmit:this.updateUserLocal},m.a.createElement(B.a,{bg:"light",style:{width:"100%",textAlign:"left"}},m.a.createElement(B.a.Header,null,m.a.createElement("div",{style:{width:"100%",display:"inline-block"}},m.a.createElement("div",{style:{display:"inline-block",textAlign:"left",width:"50%"}},m.a.createElement(g.a,{style:{width:"40px",height:"40px"},src:"./images/"+this.props.user.name+".jpg",roundedCircle:!0}),m.a.createElement("span",{style:{visibility:"hidden"}},"X"),m.a.createElement("span",{style:{fontWeight:"bold"}},this.props.user.name)),m.a.createElement("div",{style:{display:"inline-block",width:"50%",textAlign:"right"}},m.a.createElement(w.a.Group,null,m.a.createElement(f.b,{to:"/main"},m.a.createElement(S.a,null,"Back")),m.a.createElement("span",{style:{visibility:"hidden"}},"  "),m.a.createElement(S.a,{disabled:!this.state.changeUser,type:"submit"},"Save"))))),m.a.createElement(B.a.Body,null,m.a.createElement(w.a.Group,{as:z.a,controlId:"formHorizontalName"},m.a.createElement(w.a.Label,{column:!0,sm:2},"User Name"),m.a.createElement(G.a,{sm:10},m.a.createElement(w.a.Control,{ref:this.userName,onChange:function(){return e.needSave()},placeholder:"User Name",defaultValue:this.props.user.name}))),m.a.createElement(w.a.Group,{as:z.a,controlId:"formHorizontalPIN"},m.a.createElement(w.a.Label,{column:!0,sm:2},"PIN"),m.a.createElement(G.a,{sm:10},m.a.createElement(w.a.Control,{ref:this.PIN,onChange:function(){return e.needSave()},type:"password",placeholder:"PIN",defaultValue:this.props.user.pin}))),m.a.createElement(w.a.Group,{as:z.a,controlId:"formHorizontalEmail"},m.a.createElement(w.a.Label,{column:!0,sm:2},"Email"),m.a.createElement(G.a,{sm:10},m.a.createElement(w.a.Control,{ref:this.email,onChange:function(){return e.needSave()},type:"email",placeholder:"Email",defaultValue:this.props.user.email}))),m.a.createElement(w.a.Group,{as:z.a,type:"email",controlId:"formHorizontalSMS"},m.a.createElement(w.a.Label,{column:!0,sm:2},"SMS"),m.a.createElement(G.a,{sm:10},m.a.createElement(w.a.Control,{ref:this.sms,onChange:function(){return e.needSave()},placeholder:"SMS",defaultValue:this.props.user.sms}))),m.a.createElement(w.a.Group,{as:z.a,controlId:"formHorizontalCheck"},m.a.createElement(G.a,{sm:{span:10,offset:2}},m.a.createElement(w.a.Check,{ref:this.notify,onChange:function(){return e.needSave()},label:"Grocery Monkey Notifications",defaultChecked:this.props.user.notify}))))))))}}]),t}(m.a.Component)),V=function(e){var t=e.component,a=Object(c.a)(e,["component"]);return m.a.createElement(y.b,Object.assign({},a,{render:function(){return!0===e.isAuthenticated?m.a.createElement(t,e):m.a.createElement(y.a,{to:"/"})}}))},F=function(e){function t(e){var a;return Object(n.a)(this,t),(a=Object(r.a)(this,Object(s.a)(t).call(this,e))).state={auth:!1,user:{user_id:0,name:""}},a.authenticatePin=a.authenticatePin.bind(Object(u.a)(a)),a.logOff=a.logOff.bind(Object(u.a)(a)),a.updateUser=a.updateUser.bind(Object(u.a)(a)),a}return Object(o.a)(t,e),Object(i.a)(t,[{key:"logOff",value:function(){this.setState(function(){return{auth:!1}})}},{key:"authenticatePin",value:function(e,t){var a=this;!function(e,t){fetch("/authenticateuser",{method:"POST",headers:b,body:JSON.stringify({pin:e})}).then(function(e){return e.json()}).then(function(e){t(e.success,e.user)})}(e,function(e,n){a.setState(function(){return{auth:e,user:n}}),t(e)}.bind(this))}},{key:"updateUser",value:function(e,t){var a=this;!function(e,t){fetch("/updateuser",{method:"PUT",headers:b,body:JSON.stringify(e)}).then(function(e){return e.json()}).then(function(e){e.success?t(e.user):t({})})}(e,function(e){a.setState(function(){return{user:e}}),t()}.bind(this))}},{key:"render",value:function(){var e=this;return m.a.createElement(f.a,null,m.a.createElement(y.b,{exact:!0,path:"/",render:function(t){return m.a.createElement(E,Object.assign({},t,{isAuthenticated:e.state.auth,authenticatePin:e.authenticatePin}))}}),m.a.createElement(V,{path:"/main",component:R,isAuthenticated:this.state.auth,user:this.state.user,logOff:this.logOff}),m.a.createElement(V,{path:"/user",component:H,isAuthenticated:this.state.auth,user:this.state.user,updateUser:this.updateUser}))}}]),t}(m.a.Component);h.a.render(m.a.createElement(F,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[156,1,2]]]);
//# sourceMappingURL=main.a85e5816.chunk.js.map