(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{165:function(e,t,a){e.exports=a(357)},170:function(e,t,a){},171:function(e,t,a){},329:function(e,t,a){},355:function(e,t,a){},357:function(e,t,a){"use strict";a.r(t);var n=a(12),i=a(13),r=a(15),o=a(14),s=a(7),c=a(16),l=a(155),u=a(0),m=a.n(u),h=a(11),d=a.n(h),y=a(30),f=a(38);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(170);var g=a(359),p=a(360),k=a(156),b=(a(171),{"Content-Type":"application/json"}),v=[{item:"natural",match:":beer:"},{item:"toilet",match:":toilet:"},{item:"water",match:":droplet:"},{item:"dud:",match:":chocolate_bar:"},{item:"yogurt",match:":custard:"},{item:"pudding",match:":custard:"},{item:"spoon",match:":fork_and_knife:"},{item:"fork",match:":fork_and_knife"},{item:"utensil",match:":fork_and_knife:"},{item:"pizza",match:":pizza:"},{item:"seagram",match:":cocktail:"},{item:"chicken",match:":poultry_leg:"},{item:"pasta",match:":spaghetti:"},{item:"juice",match:":tropical_drink:"},{item:"milk",match:":sake:"},{item:"lemonade",match:":lemon:"},{item:"arnold",match:":lemon:"},{item:"bagel",match:":doughnut:"},{item:"potato",match:":sweet_potato:"},{item:"sprite",match:":sparkles:"},{item:"polar",match:":dizzy:"},{item:"toothpaste",match:":grin:"},{item:"tylenol",match:":pill:"},{item:"towel",match:":page_with_curl:"},{item:"trash",match:":pouch:"},{item:"egg",match:":egg:"},{item:"ketchup",match:":tomato:"},{item:"salsa",match:":tomato:"},{item:"ham",match:":pig2:"},{item:"mac",match:":ramen:"},{item:"gum",match:":seedling:"},{item:"tea",match:":coffee:"},{item:"photo",match:":camera:"}],E=function(e){function t(e){var a;return Object(n.a)(this,t),(a=Object(r.a)(this,Object(o.a)(t).call(this,e))).PIN=void 0,a.PIN=m.a.createRef(),a.state={redoAuth:a.props.isAuthenticated},a.tryPin=a.tryPin.bind(Object(s.a)(a)),a.tryPinQuick=a.tryPinQuick.bind(Object(s.a)(a)),a}return Object(c.a)(t,e),Object(i.a)(t,[{key:"tryPinQuick",value:function(e){4===e.length&&this.tryPin(e)}},{key:"tryPin",value:function(e){var t=this,a=function(e){t.PIN.current&&(t.PIN.current.value=""),e||t.setState(function(){return{redoAuth:!e}})}.bind(this);this.props.authenticatePin(e,a)}},{key:"render",value:function(){var e=this;return this.props.isAuthenticated?m.a.createElement(y.a,{to:"/main"}):m.a.createElement("div",{className:"Splash"},m.a.createElement("br",null),m.a.createElement(g.a,{className:"Image",src:"./images/grocerymonkey.jpg"}),m.a.createElement("br",null),m.a.createElement("br",null),m.a.createElement("h1",null,"Grocery Monkey"),m.a.createElement("br",null),m.a.createElement("div",{style:{display:"inline-block"}},m.a.createElement(p.a,null,m.a.createElement(k.a,{autoFocus:!0,ref:this.PIN,placeholder:"User PIN","aria-label":"User PIN","aria-describedby":"basic-addon1",onChange:function(){return e.tryPinQuick(e.PIN.current.value)},style:{textAlign:"center",width:"100px"}}),m.a.createElement(p.a.Append,{style:{cursor:"pointer"},onClick:function(){e.tryPin(e.PIN.current.value)}},m.a.createElement(p.a.Text,null,"Login"))),this.state.redoAuth?m.a.createElement(m.a.Fragment,null,m.a.createElement("br",null),m.a.createElement("span",{style:{color:"darkred"}},m.a.createElement("h3",null,"INVALID PIN"))):null))}}]),t}(m.a.Component),I=a(367),S=a(361),w=a(363),C=a(163),j=a(366),O=a(160),P=a(68),T=a(158),D=(a(328),a(329),a(365)),N=function(e){function t(e){var a;return Object(n.a)(this,t),(a=Object(r.a)(this,Object(o.a)(t).call(this,e))).state={monkeyImage:""},a.getMonkeyImage=a.getMonkeyImage.bind(Object(s.a)(a)),a}return Object(c.a)(t,e),Object(i.a)(t,[{key:"getMonkeyImage",value:function(){return"/images/monkey/monkey"+Math.floor(1+1*Math.random()).toString()+".gif"}},{key:"componentDidMount",value:function(){var e=this;this.setState(function(){return{monkeyImage:e.getMonkeyImage()}})}},{key:"render",value:function(){return m.a.createElement("div",{style:{width:"90%",height:"50%"}},m.a.createElement(D.a,{animation:!0,centered:!0,show:this.props.show},m.a.createElement(D.a.Header,null,m.a.createElement(D.a.Title,null,"You are a Grocery Monkey!")),m.a.createElement(D.a.Body,{style:{textAlign:"center"}},m.a.createElement("div",{style:{width:"100%}"}},m.a.createElement(g.a,{fluid:!0,roundedCircle:!0,src:this.state.monkeyImage}))),m.a.createElement(D.a.Footer,null,m.a.createElement(S.a,{variant:"secondary",onClick:this.props.monkeyDanceToggle},"More Monkey Stuff"),m.a.createElement(S.a,{variant:"primary",onClick:this.props.logOff},"No More Monkey"))))}}]),t}(m.a.Component),A=a(369),_=a(362),L=a(152),U=a(153),M=function(e){function t(e){var a;return Object(n.a)(this,t),(a=Object(r.a)(this,Object(o.a)(t).call(this,e))).state={monkeyImage:"./images/monkey/monkey_running.gif",monkeyMonth:U(new Date,"mmmm"),bananaHistory:[]},a.getBananas=a.getBananas.bind(Object(s.a)(a)),a.getBananaHistory=a.getBananaHistory.bind(Object(s.a)(a)),a}return Object(c.a)(t,e),Object(i.a)(t,[{key:"getBananas",value:function(e){var t="";if(e){for(var a=1;a<=e;a++)t+=L.emojify(":banana:");return t}return""}},{key:"getBananaHistory",value:function(e){var t=this,a=function(e){t.setState(function(){return{bananaHistory:e}})};"monkeys"===e?function(e){fetch("/getbananawinnerhistory",{method:"POST",headers:b,body:""}).then(function(e){return e.json()}).then(function(t){console.log(t),t.success?e(t.data):e({})})}(a.bind(this)):"mooches"===e?function(e){fetch("/getbananamoochhistory",{method:"POST",headers:b,body:""}).then(function(e){return e.json()}).then(function(t){console.log(t),t.success?e(t.data):e({})})}(a.bind(this)):this.setState(function(){return{monkeyMonth:U(new Date,"mmmm")}})}},{key:"render",value:function(){var e=this;return m.a.createElement("div",{style:{width:"90%",height:"95%"}},m.a.createElement(D.a,{animation:!0,centered:!0,show:this.props.show},m.a.createElement(D.a.Header,null,m.a.createElement(D.a.Title,null,m.a.createElement(g.a,{fluid:!0,roundedCircle:!0,width:"60",height:"60",src:this.state.monkeyImage}),"The Monkey Race!")),m.a.createElement(D.a.Body,{style:{textAlign:"center"}},m.a.createElement(A.a,{defaultActiveKey:"current",id:"main_tab",onSelect:function(t){e.getBananaHistory(t)}},m.a.createElement(_.a,{eventKey:"current",title:this.state.monkeyMonth},m.a.createElement("div",{style:{width:"100%}"}},m.a.createElement(w.a,null,this.props.users.map(function(t,a){return m.a.createElement(C.a,{key:a,style:{display:"flex",alignItems:"center"}},m.a.createElement("div",{style:{width:"20%",textAlign:"center",display:"inline-block"}},m.a.createElement(g.a,{width:"40",height:"40",src:"./images/users/"+t.name+".jpg",roundedCircle:!0}),m.a.createElement("br",null),t.name),m.a.createElement("div",{style:{width:"80%",textAlign:"left",display:"inline-block"}},"Banana Count: ("+t.banana_count+")  "+e.getBananas(t.banana_count)))})))),m.a.createElement(_.a,{eventKey:"monkeys",title:"Monkeys"},m.a.createElement(x,{label:"Bananas",emoji:":banana:",gif_image:"./images/star.gif",data:this.state.bananaHistory})),m.a.createElement(_.a,{eventKey:"mooches",title:"Mooches"},m.a.createElement(x,{label:"Requests",emoji:":speak_no_evil:",gif_image:"./images/question.gif",data:this.state.bananaHistory})))),m.a.createElement(D.a.Footer,null,m.a.createElement(S.a,{variant:"secondary",onClick:this.props.monkeyRaceToggle},"More Monkey Stuff"),m.a.createElement(S.a,{variant:"primary",onClick:this.props.logOff},"No More Monkey"))))}}]),t}(m.a.Component),x=function(e){function t(){return Object(n.a)(this,t),Object(r.a)(this,Object(o.a)(t).apply(this,arguments))}return Object(c.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this;return m.a.createElement("div",{style:{width:"100%"}},m.a.createElement(w.a,null,this.props.data.map(function(t,a){return m.a.createElement(C.a,{key:a,style:{display:"flex",alignItems:"center"}},m.a.createElement("div",{style:{width:"22%",textAlign:"center",display:"inline-block"}},m.a.createElement(g.a,{width:"50",height:"50",src:e.props.gif_image}),m.a.createElement("br",null),U(new Date(t.banMonth),"mmmm")),m.a.createElement("div",{style:{width:"32%",textAlign:"center",display:"inline-block",cursor:"pointer"}},m.a.createElement(g.a,{width:"40",height:"40",src:"./images/users/"+t.banUserName+".jpg",roundedCircle:!0}),m.a.createElement("br",null),t.banUserName),m.a.createElement("div",{style:{width:"46%",textAlign:"center",display:"inline-block"}},e.props.label+": "+L.emojify(e.props.emoji)+"("+t.banCount+")"))})))}}]),t}(m.a.Component),R=M,B=function(e){function t(){return Object(n.a)(this,t),Object(r.a)(this,Object(o.a)(t).apply(this,arguments))}return Object(c.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this;return m.a.createElement("div",{style:{width:"90%",height:"50%"}},m.a.createElement(D.a,{animation:!0,centered:!0,show:this.props.itemPhotoLocation,size:"xl",onHide:function(){e.props.showItemToggle()}},m.a.createElement(D.a.Body,{style:{textAlign:"center"}},m.a.createElement("div",{style:{width:"100%}"}},m.a.createElement(g.a,{fluid:!0,style:{width:"100%",height:"100%"},src:this.props.itemPhotoLocation,onClick:function(){e.props.showItemToggle()}})))))}}]),t}(m.a.Component),H=a(40),G=a.n(H),z=a(152),V=a(153),F=function(e){var t=e.toLowerCase();"s"===t.substr(t.length-1)&&(t=t.slice(0,-1));for(var a=0;a<v.length;a++)if(t.includes(v[a].item))return v[a].match;var n=z.search(t);return n.length?":"+n[0].key+":":":shopping_trolley:"},J=function(e){function t(e){var a;return Object(n.a)(this,t),(a=Object(r.a)(this,Object(o.a)(t).call(this,e))).newItem=void 0,a.addItem=void 0,a.state={isAuthenticated:e.isAuthenticated,user:e.user,monkeyDance:!1,monkeyRace:!1,monkeyItemPhoto:null,ui:{updateUser:!1,monkeyChange:!1,monkeyLoaded:!1,showCamera:!1,photoTaken:!1,itemPhoto:null,itemStatusList:[],distinctItems:[],users:[]},monkeyData:[]},a.newItem=m.a.createRef(),a.addItem=m.a.createRef(),a.monkeyItemAction=a.monkeyItemAction.bind(Object(s.a)(a)),a.monkeyItemAction_Do=a.monkeyItemAction_Do.bind(Object(s.a)(a)),a.lookupStatus=a.lookupStatus.bind(Object(s.a)(a)),a.addMonkeyItem=a.addMonkeyItem.bind(Object(s.a)(a)),a.monkeyDo=a.monkeyDo.bind(Object(s.a)(a)),a.monkeyAll=a.monkeyAll.bind(Object(s.a)(a)),a.monkeyDanceToggle=a.monkeyDanceToggle.bind(Object(s.a)(a)),a.monkeyRaceToggle=a.monkeyRaceToggle.bind(Object(s.a)(a)),a.getBananaCount=a.getBananaCount.bind(Object(s.a)(a)),a.onTakePhoto=a.onTakePhoto.bind(Object(s.a)(a)),a.toggleCamera=a.toggleCamera.bind(Object(s.a)(a)),a}return Object(c.a)(t,e),Object(i.a)(t,[{key:"onTakePhoto",value:function(e){var t=this.state.ui;t.photoTaken=!0,t.itemPhoto=e,t.showCamera=!1,this.setState(function(){return{ui:t}})}},{key:"getBananaCount",value:function(e){var t;return(t=this.state.ui.users.filter(function(t){return t.user_id===e})).length?t[0].banana_count:0}},{key:"lookupStatus",value:function(e){var t;return t=this.state.ui.itemStatusList.filter(function(t){return t.statusID===parseInt(e)}),t.length?{actionType:t[0].action_type,status:t[0].status,status_verb:t[0].status_verb,status_active:t[0].status_active}:{actionType:0,status:0,status_verb:"",status_active:!1}}},{key:"monkeyItemAction",value:function(e,t){e.preventDefault(),this.monkeyItemAction_Do(e.target.value,t)}},{key:"monkeyItemAction_Do",value:function(e,t){var a=this,n=t,i=this.state.monkeyData,r=this.lookupStatus(e);i[n].itemActionType=r.actionType,i[n].itemStatus=r.status,i[n].itemStatusID=parseInt(e),i[n].itemStatusVerb=r.status_verb,i[n].itemStatusActive=r.status_active,i[n].itemUserID=this.state.user.user_id,i[n].itemUserName=this.state.user.name,i[n].itemChanged=!0,this.setState(function(){return{monkeyData:i,ui:{updateUser:a.state.ui.updateUser,itemStatusList:a.state.ui.itemStatusList,distinctItems:a.state.ui.distinctItems,users:a.state.ui.users,monkeyChange:!0,monkeyLoaded:!0,showCamera:!1,photoTaken:!1,itemPhoto:null}}})}},{key:"getMonkeyData",value:function(){var e,t=this;this.state.isAuthenticated,e=function(e){for(var a=[],n=0;n<e.groceryListItems.length;n++)a.push({itemNew:!1,itemActionType:0,itemID:e.groceryListItems[n].grocery_list_id,itemDate:e.groceryListItems[n].date,itemName:e.groceryListItems[n].item,itemCount:e.groceryListItems[n].count,itemCode:e.groceryListItems[n].code,itemNotes:e.groceryListItems[n].notes,itemStatusID:e.groceryListItems[n].status_id,itemStatus:e.groceryListItems[n].status,itemStatusVerb:e.groceryListItems[n].status_verb,itemStatusActive:e.groceryListItems[n].status_active,itemUserID:e.groceryListItems[n].user_id,itemUserName:e.groceryListItems[n].username,itemChanged:!1,itemPhoto:e.groceryListItems[n].photo,itemPhotoURI:e.groceryListItems[n].photo_location});var i={updateUser:!1,monkeyChange:!1,monkeyLoaded:!0,showCamera:!1,photoTaken:!1,itemPhoto:null,itemStatusList:e.groceryItemStatus,distinctItems:e.distinctGroceryListItems,users:e.users};t.setState(function(){return{monkeyData:a,ui:i}})}.bind(this),fetch("/getmonkeydata",{method:"POST",headers:b,body:JSON.stringify({})}).then(function(e){return e.json()}).then(function(t){t.success?e(t.data):e({})})}},{key:"addMonkeyItem",value:function(e){var t=this;if(e.length>0||this.state.ui.photoTaken){var a,n=(e.length?e:"Photo Only").split(","),i=this.state.monkeyData,r="",o=0,s="";a=(r=n[0].replace(/(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|[\ud83c[\ude50\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g,"")).charAt(0).toUpperCase()+r.slice(1).toLowerCase(),2===n.length?o=n[1].length?parseInt(n[1]):0:3===n.length&&(o=parseInt(n[1]),s=n[2]),i.push({itemNew:!0,itemName:a,itemCount:o,itemNotes:s,itemStatusID:1,itemStatus:"NEW",itemStatusVerb:"NEEDS",itemStatusActive:!0,itemActionType:1,itemUserID:this.state.user.user_id,itemUserName:this.state.user.name,itemCode:F(a),itemDate:V(new Date,"yyyy-mm-dd HH:MM:ss"),itemID:0,itemChanged:!1,itemPhoto:this.state.ui.photoTaken,itemPhotoURI:this.state.ui.photoTaken?this.state.ui.itemPhoto:null}),this.newItem.getInstance().clear(),this.setState(function(){return{monkeyData:i,ui:{updateUser:t.state.ui.updateUser,itemStatusList:t.state.ui.itemStatusList,distinctItems:t.state.ui.distinctItems,users:t.state.ui.users,monkeyChange:!0,monkeyLoaded:!0,showCamera:!1,photoTaken:!1,itemPhoto:null}}})}}},{key:"monkeyDo",value:function(){var e,t,a=this;if(this.state.ui.monkeyChange){var n=this.state.monkeyData;console.log(n),e=n,t=function(e){e?(a.getMonkeyData(),a.setState(function(){return{monkeyDance:!0}})):alert("Error updating database")},fetch("/updatemonkeydata",{method:"PUT",headers:b,body:JSON.stringify(e)}).then(function(e){return e.json()}).then(function(e){e.success?t(!0):t(!1)})}else this.props.logOff()}},{key:"monkeyAll",value:function(){for(var e=this,t=this.state.monkeyData,a=0;a<t.length;a++){var n=this.state.ui.itemStatusList[this.state.ui.itemStatusList.length-1].statusID,i=this.lookupStatus(n.toString());t[a].itemActionType=i.actionType,t[a].itemStatus=i.status,t[a].itemStatusID=n,t[a].itemStatusVerb=i.status_verb,t[a].itemStatusActive=i.status_active,t[a].itemUserID=this.state.user.user_id,t[a].itemUserName=this.state.user.name,t[a].itemChanged=!0}this.setState(function(){return{monkeyData:t,ui:{updateUser:e.state.ui.updateUser,itemStatusList:e.state.ui.itemStatusList,distinctItems:e.state.ui.distinctItems,users:e.state.ui.users,monkeyChange:!0,monkeyLoaded:!0,showCamera:!1,photoTaken:!1,itemPhoto:null}}})}},{key:"toggleCamera",value:function(e){var t=this.state.ui;t.showCamera=e,t.photoTaken=!1,t.itemPhoto=null,this.setState(function(){return{ui:t}})}},{key:"monkeyDanceToggle",value:function(){var e=this;this.setState(function(){return{monkeyDance:!e.state.monkeyDance}})}},{key:"monkeyRaceToggle",value:function(){var e=this;this.setState(function(){return{monkeyRace:!e.state.monkeyRace}})}},{key:"componentDidMount",value:function(){this.getMonkeyData()}},{key:"render",value:function(){var e=this;return m.a.createElement("div",{className:"Main",style:{display:"inline-block"}},m.a.createElement(N,{show:this.state.monkeyDance,monkeyDanceToggle:this.monkeyDanceToggle,logOff:this.props.logOff}),m.a.createElement(R,{show:this.state.monkeyRace,users:this.state.ui.users,monkeyRaceToggle:this.monkeyRaceToggle,logOff:this.props.logOff}),m.a.createElement(B,{itemPhotoLocation:this.state.monkeyItemPhoto,showItemToggle:function(){e.setState(function(){return{monkeyItemPhoto:null}})}}),m.a.createElement(I.a,{fixed:"top",sticky:"top",bg:"light",expand:"xl",style:{textAlign:"left",verticalAlign:"middle",flexDirection:"row"},onToggle:function(){e.toggleCamera(!1)}},m.a.createElement(I.a.Brand,null,m.a.createElement(g.a,{src:"/images/favicon.ico",style:{width:"30px",height:"30px",cursor:"pointer"},onClick:function(){return e.props.logOff()}})),m.a.createElement("div",{style:{textAlign:"left",width:"50%"}}," Grocery Monkey - "+this.state.user.name),m.a.createElement(I.a.Toggle,{"aria-controls":"basic-navbar-nav"}),m.a.createElement(I.a.Collapse,{id:"basic-navbar-nav",style:{width:"100%"}},m.a.createElement("div",{style:{width:"100%",display:"flex",textAlign:"left",float:"left",clear:"left"}},m.a.createElement(p.a,{style:{width:"100%"}},m.a.createElement(p.a.Prepend,null,m.a.createElement(S.a,{variant:this.state.ui.photoTaken?"primary":"outline-primary",onClick:function(){e.toggleCamera(!e.state.ui.showCamera)}},m.a.createElement(g.a,{roundedCircle:!0,src:"/images/camera.png",style:{width:"20px",height:"20px",cursor:"pointer"}}))),m.a.createElement(T.Typeahead,{id:"groceryTypeahead",selectHintOnEnter:!0,options:this.state.ui.distinctItems.map(function(e,t){return z.emojify(e.code)+e.item}),placeholder:"Item, Quantity, Notes",clearButton:!0,labelKey:"item",emptyLabel:"",ref:function(t){return e.newItem=t}}),m.a.createElement(p.a.Append,null,m.a.createElement(S.a,{variant:"outline-success",ref:this.addItem,onClick:function(){return e.addMonkeyItem(e.newItem.getInstance().getInput().value)}},"Add")))))),m.a.createElement("div",null,this.state.ui.showCamera?m.a.createElement("div",{style:{width:"100%",height:"25%"}},m.a.createElement(G.a,{onTakePhoto:function(t){e.onTakePhoto(t)},imageType:H.IMAGE_TYPES.JPG,imageCompression:.97,isMaxResolution:!1,idealFacingMode:H.FACING_MODES.ENVIRONMENT,isDisplayStartCameraError:!0,isImageMirror:!1}),m.a.createElement("br",null)):null,this.state.monkeyData.length?m.a.createElement(w.a,null,this.state.monkeyData.map(function(t,a){return m.a.createElement(C.a,{key:a,style:{display:"flex",alignItems:"center",backgroundColor:e.state.monkeyData[a].itemChanged?"Gainsboro":"Transparent"}},m.a.createElement("div",{style:{width:"10%",textAlign:"center",display:"inline-block",backgroundColor:"Transparent",cursor:t.itemPhoto?"pointer":"default"}},m.a.createElement(g.a,{className:"list_profile_img",src:t.itemPhoto?t.itemNew?t.itemPhotoURI:"./images/items/"+t.itemPhotoURI+".jpg":"./images/users/"+t.itemUserName+".jpg#"+(new Date).getTime(),roundedCircle:!0,onClick:function(){e.setState(function(){return{monkeyItemPhoto:t.itemPhoto?t.itemNew?t.itemPhotoURI:"./images/items/"+t.itemPhotoURI+".jpg":"./images/users/"+t.itemUserName+".jpg#"+(new Date).getTime()}})}}),m.a.createElement("br",null),t.itemUserName),m.a.createElement("div",{style:{width:"60%",textAlign:"center",display:"inline-block"}},m.a.createElement("label",{style:{cursor:"pointer"},onClick:e.state.monkeyData[a].itemNew?function(){}:function(){e.monkeyItemAction_Do(e.state.ui.itemStatusList.length.toString(),a)}},z.emojify(t.itemCode)+" "+t.itemName+(t.itemCount?" ("+t.itemCount+")":""),m.a.createElement("br",null),t.itemNotes)),m.a.createElement("div",{style:{width:"30",textAlign:"right",display:"inline-block"}},m.a.createElement(j.a,null,m.a.createElement(j.a.Control,{as:"select",value:t.itemStatusID.toString(),onChange:function(t){return e.monkeyItemAction(t,a)}},e.state.ui.itemStatusList.filter(function(a){var n=e.state.user.user_id===t.itemUserID||a.action_sameuser;return t.itemNew?a.action_new&&n:n}).map(function(e,t){return m.a.createElement("option",{key:t,value:e.statusID.toString()}," ",e.status)})))))})):this.state.ui.monkeyLoaded&&!this.state.ui.showCamera?m.a.createElement("div",{style:{width:"100%",alignContent:"center",textAlign:"center"}},m.a.createElement("br",null),m.a.createElement("br",null),m.a.createElement(g.a,{id:"sad_fridge",src:"./images/sad_fridge.gif"}),m.a.createElement("h4",null,"Ain't nobody need nothin....")):null,m.a.createElement("br",null),m.a.createElement("br",null)),m.a.createElement(I.a,{bg:"dark",variant:"dark",sticky:"bottom",fixed:"bottom"},m.a.createElement(O.a,{style:{textAlign:"left",width:"32%"}},m.a.createElement("div",{style:{width:"100%",verticalAlign:"center"}},m.a.createElement(P.a,{as:f.b,to:"/user"},m.a.createElement(g.a,{alt:"",src:"./images/users/"+this.state.user.name+".jpg#"+(new Date).getTime(),width:"40",height:"40",className:"profile_Image",roundedCircle:!0})),m.a.createElement("span",{style:{visibility:"hidden"}},"X"),m.a.createElement("span",{style:{color:"white",fontWeight:"bold",cursor:"pointer"},onClick:function(){return e.monkeyRaceToggle()}},z.emojify(":banana:")+"("+this.getBananaCount(this.state.user.user_id)+")"))),m.a.createElement(O.a,{style:{textAlign:"right",width:"68%"}},m.a.createElement("div",{style:{width:"100%",textAlign:"right"}},m.a.createElement(S.a,{variant:"light",onClick:function(){return e.monkeyAll()}},"Monkey All"),m.a.createElement("span",null,"  "),m.a.createElement(S.a,{variant:"light",onClick:function(){return e.monkeyDo()}},this.state.ui.monkeyChange?"Monkey Do":"Logoff")))))}}]),t}(m.a.Component),K=a(368),Q=a(364),W=a(164),X=(a(355),a(356),function(e){function t(e){var a;return Object(n.a)(this,t),(a=Object(r.a)(this,Object(o.a)(t).call(this,e))).userSelfieSubmit=void 0,a.userName=void 0,a.PIN=void 0,a.email=void 0,a.sms=void 0,a.notify=void 0,a.userSelfieSubmit=m.a.createRef(),a.userName=m.a.createRef(),a.PIN=m.a.createRef(),a.email=m.a.createRef(),a.sms=m.a.createRef(),a.notify=m.a.createRef(),a.state={changeUser:!1,newSelfie:!1,userSelfie:"./images/users/"+e.user.name+".jpg#"+(new Date).getTime(),selfieChange:!1},a.needSave=a.needSave.bind(Object(s.a)(a)),a.updateUserLocal=a.updateUserLocal.bind(Object(s.a)(a)),a.toggleSelfie=a.toggleSelfie.bind(Object(s.a)(a)),a.onTakePhoto=a.onTakePhoto.bind(Object(s.a)(a)),a}return Object(c.a)(t,e),Object(i.a)(t,[{key:"needSave",value:function(){this.state.changeUser||this.setState(function(){return{changeUser:!0}})}},{key:"updateUserLocal",value:function(e){var t=this;e.preventDefault();var a={user_id:this.props.user.user_id,name:this.userName.current.value,pin:this.PIN.current.value,email:this.email.current.value,sms:this.sms.current.value,notify:this.notify.current.checked};this.state.selfieChange&&function(e,t,a){var n={production:!"".length,userName:e,dataURI:t};fetch("/updateuserselfie",{method:"POST",headers:b,body:JSON.stringify(n)}).then(function(e){return e.json()}).then(function(e){console.log(e),a(e.success)})}(this.props.user.name,this.state.userSelfie,function(e){console.log("File uploaded: "+e)}),this.props.updateUser(a,function(){return t.setState(function(){return{changeUser:!1,selfieChange:!1}})})}},{key:"onTakePhoto",value:function(e){this.setState(function(){return{userSelfie:e,newSelfie:!1,changeUser:!0,selfieChange:!0}})}},{key:"toggleSelfie",value:function(){var e=this;this.setState(function(){return{newSelfie:!e.state.newSelfie}})}},{key:"render",value:function(){var e=this;return m.a.createElement("div",{style:{width:"100%",textAlign:"center"}},m.a.createElement("div",{style:{width:"90%",display:"inline-block"}},m.a.createElement(Y,{show:this.state.newSelfie,userName:this.props.user.name,onTakePhoto:this.onTakePhoto,toggleSelfie:this.toggleSelfie}),m.a.createElement("br",null),m.a.createElement(j.a,{onSubmit:this.updateUserLocal},m.a.createElement(K.a,{bg:"light",style:{width:"100%",textAlign:"left"}},m.a.createElement(K.a.Header,null,m.a.createElement("div",{style:{width:"100%",display:"inline-block"}},m.a.createElement("div",{style:{display:"inline-block",textAlign:"left",width:"50%"}},m.a.createElement(g.a,{roundedCircle:!0,style:{width:"40px",height:"40px",cursor:"pointer"},src:this.state.userSelfie,onClick:function(){e.toggleSelfie()}}),m.a.createElement("span",{style:{visibility:"hidden"}},"X"),m.a.createElement("span",{style:{fontWeight:"bold"}},this.props.user.name)),m.a.createElement("div",{style:{display:"inline-block",width:"50%",textAlign:"right"}},m.a.createElement(j.a.Group,null,m.a.createElement(f.b,{to:"/main"},m.a.createElement(S.a,null,"Back")),m.a.createElement("span",{style:{visibility:"hidden"}},"  "),m.a.createElement(S.a,{disabled:!this.state.changeUser,type:"submit"},"Save"))))),m.a.createElement(K.a.Body,null,m.a.createElement(j.a.Group,{as:Q.a,controlId:"formHorizontalName"},m.a.createElement(j.a.Label,{column:!0,sm:2},"User Name"),m.a.createElement(W.a,{sm:10},m.a.createElement(j.a.Control,{ref:this.userName,onChange:function(){return e.needSave()},placeholder:"User Name",defaultValue:this.props.user.name}))),m.a.createElement(j.a.Group,{as:Q.a,controlId:"formHorizontalPIN"},m.a.createElement(j.a.Label,{column:!0,sm:2},"PIN"),m.a.createElement(W.a,{sm:10},m.a.createElement(j.a.Control,{ref:this.PIN,onChange:function(){return e.needSave()},type:"password",placeholder:"PIN",defaultValue:this.props.user.pin}))),m.a.createElement(j.a.Group,{as:Q.a,controlId:"formHorizontalEmail"},m.a.createElement(j.a.Label,{column:!0,sm:2},"Email"),m.a.createElement(W.a,{sm:10},m.a.createElement(j.a.Control,{ref:this.email,onChange:function(){return e.needSave()},type:"email",placeholder:"Email",defaultValue:this.props.user.email}))),m.a.createElement(j.a.Group,{as:Q.a,type:"email",controlId:"formHorizontalSMS"},m.a.createElement(j.a.Label,{column:!0,sm:2},"SMS"),m.a.createElement(W.a,{sm:10},m.a.createElement(j.a.Control,{ref:this.sms,onChange:function(){return e.needSave()},placeholder:"SMS",defaultValue:this.props.user.sms}))),m.a.createElement(j.a.Group,{as:Q.a,controlId:"formHorizontalCheck"},m.a.createElement(W.a,{sm:{span:10,offset:2}},m.a.createElement(j.a.Check,{ref:this.notify,onChange:function(){return e.needSave()},label:"Grocery Monkey Notifications",defaultChecked:this.props.user.notify}))))))))}}]),t}(m.a.Component)),Y=function(e){function t(){return Object(n.a)(this,t),Object(r.a)(this,Object(o.a)(t).apply(this,arguments))}return Object(c.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){var e=this;return m.a.createElement("div",{style:{width:"90%",height:"60%"}},m.a.createElement(D.a,{size:"lg",show:this.props.show,animation:!0,centered:!0,onHide:function(){e.props.toggleSelfie()}},m.a.createElement(D.a.Header,{closeButton:!0},m.a.createElement(g.a,{fluid:!0,roundedCircle:!0,style:{width:"40px",height:"40px"},src:"./images/"+this.props.userName+".jpg"}),m.a.createElement("span",{style:{visibility:"hidden"}},"X"),m.a.createElement(D.a.Title,null,this.props.userName+"'s new selfie"," ")),m.a.createElement(D.a.Body,null,m.a.createElement(G.a,{onTakePhoto:function(t){e.props.onTakePhoto(t)},imageType:H.IMAGE_TYPES.JPG,imageCompression:.97,isMaxResolution:!1}))))}}]),t}(m.a.Component),q=X,$=function(e){var t=e.component,a=Object(l.a)(e,["component"]);return m.a.createElement(y.b,Object.assign({},a,{render:function(){return!0===e.isAuthenticated?m.a.createElement(t,e):m.a.createElement(y.a,{to:"/"})}}))},Z=function(e){function t(e){var a;return Object(n.a)(this,t),(a=Object(r.a)(this,Object(o.a)(t).call(this,e))).state={auth:!1,user:{user_id:0,name:""}},a.authenticatePin=a.authenticatePin.bind(Object(s.a)(a)),a.logOff=a.logOff.bind(Object(s.a)(a)),a.updateUser=a.updateUser.bind(Object(s.a)(a)),a}return Object(c.a)(t,e),Object(i.a)(t,[{key:"logOff",value:function(){this.setState(function(){return{auth:!1}})}},{key:"authenticatePin",value:function(e,t){var a=this;!function(e,t){fetch("/authenticateuser",{method:"POST",headers:b,body:JSON.stringify({pin:e})}).then(function(e){return e.json()}).then(function(e){t(e.success,e.user)})}(e,function(e,n){a.setState(function(){return{auth:e,user:n}}),t(e)}.bind(this))}},{key:"updateUser",value:function(e,t){var a=this;!function(e,t){fetch("/updateuser",{method:"PUT",headers:b,body:JSON.stringify(e)}).then(function(e){return e.json()}).then(function(e){e.success?t(e.user):t({})})}(e,function(e){a.setState(function(){return{user:e}}),t()}.bind(this))}},{key:"render",value:function(){var e=this;return m.a.createElement(f.a,null,m.a.createElement(y.b,{exact:!0,path:"/",render:function(t){return m.a.createElement(E,Object.assign({},t,{isAuthenticated:e.state.auth,authenticatePin:e.authenticatePin}))}}),m.a.createElement($,{path:"/main",component:J,isAuthenticated:this.state.auth,user:this.state.user,logOff:this.logOff}),m.a.createElement($,{path:"/user",component:q,isAuthenticated:this.state.auth,user:this.state.user,updateUser:this.updateUser}))}}]),t}(m.a.Component);d.a.render(m.a.createElement(Z,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[165,1,2]]]);
//# sourceMappingURL=main.7eb05f79.chunk.js.map