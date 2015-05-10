function hasNever(a,b,f,c){var d=a=lpcanonizeUrl(a);0<a.length&&"/"==a.charAt(a.length-1)&&(a=a.substring(0,a.length-1));if(g_neverurls[f]&&0<g_neverurls[f].length){for(var e=!1,g=0;g_neverurls[f]&&g<g_neverurls[f].length;g++){var h=g_neverurls[f][g];if(h==b||h==a){e=!0;break}}if(!e)return!0}for(g=0;g_neverurls[c]&&g<g_neverurls[c].length;g++)if(h=g_neverurls[c][g],h==b||h==a||h==d)return!0;return!1}function hasNeverAutologin(a,b){return hasNever(a,b,"onlyautologins","neverautologins")}
function hasNeverFormFill(a,b){return hasNever(a,b,"onlyformfills","neverformfills")}function hasNeverSave(a,b){return hasNever(a,b,"onlyaccounts","neveraccounts")}function hasNeverShowIcon(a,b){return hasNever(a,b,"onlyshowicons","nevershowicons")}function hasNeverGenerate(a,b){return hasNever(a,b,"onlygenerates","nevergenerates")}var g_accessibility_enabled=-1;
function handleFill(a,b){var f=!1,c=null;if((!lploggedin||null!=grid_getdata("active"))&&!skiplogin()||"undefined"==typeof b||!b)return!1;if("autofillaid"==b.cmd||"autologinaid"==b.cmd){var d=b.aid;g_last_launch[d]=(new Date).getTime();if("undefined"!=typeof g_sites[d]){var f="autologinaid"==b.cmd,e=!0,g=get_record(d);b.no_manualfill_on_saveall&&g.save_all&&(e=!1);b.from_iframe&&!g.save_all&&(e=!0);g=b.from_iframe?!0:!1;fill(a,g_sites[d],null,f,!f,"all",!0,!1,e,null,null,g);return!0}return!1}if("undefined"==
typeof b.url)return!1;var e=b.url,h=lp_gettld_url(e);if(lp_url_is_lastpass(e))return!1;if("undefined"==typeof g_launches[a]||!g_launches[a])null!=g_pending_launch&&(g_launches[a]=g_pending_launch);"undefined"!=typeof g_launches[a]&&g_launches[a]&&(d=g_launches[a],check_ident_aid(d)&&compare_tlds(h,lp_gettld_url(g_sites[d].url))&&"undefined"!=typeof g_sites[d]&&(is_guiless()?fill(a,get_record(d),null,!1,!1,"all",!0,!1,!1,!1):(g=b.from_iframe?!0:!1,fill(a,get_record(d),null,!0,!1,b.docnum,!1,!0,null,
null,null,g),c=d),"undefined"!=typeof b.numpass&&0<b.numpass?g_pending_launch=g_launches[a]=null:setTimeout(function(){g_pending_launch=g_launches[a]=null},1E3)));var k=getsites(h),k=reorderOnURL(k,e,!0);hasNeverAutologin(e,h)&&(k=[]);d=b.topurl!=e?lp_gettld_url(b.topurl):"";""!=d&&hasNeverAutologin(b.topurl,d)&&(k=[]);for(var q in k){try{if(islastpass&&g_ischrome&&1==k[q].basic_auth&&0>=g_accessibility_enabled&&0==lpGetPref("basicauthnever",0))if(g_is_mac&&have_binary_function("accessibility_enabled"))call_binary_function("accessibility_enabled",
function(a){g_accessibility_enabled=a?1:0;0==g_accessibility_enabled&&setTimeout(function(){get_selected_tab(null,function(a){sendCS(gettabid(a),{cmd:"showbasicauthnotification",needbinary:0,text:gs("In order for LastPass to fill into basic authentication dialogs, you need to enable access for assistive devices.")})})},100)});else if((g_is_win||g_is_mac)&&!have_binary())g_accessibility_enabled=0,setTimeout(function(){get_selected_tab(null,function(a){sendCS(gettabid(a),{cmd:"showbasicauthnotification",
needbinary:1,text:gs("In order for LastPass to fill into basic authentication dialogs, you need to install the binary version of LastPass for Chrome.")})})},100)}catch(s){}h=!1;d=k[q].aid;if(check_ident_aid(d)&&"undefined"!=typeof g_sites[d]){g=get_record(d);g.never_autofill&&(h=!0);if(g.pwprotect||g_prompts.login_site_prompt)h=!0;if(!g.genpw&&!(0==g.fields.length&&""==g.username)){0==g.url.indexOf("https://")&&0!=e.indexOf("https://")&&(h=!0);0==parseInt(lpGetPref("automaticallyFill",1))&&0==parseInt(lpGetPref("highlightFields",
1))&&(h=!0);if(!h){if(c&&c!=d){verbose_log("did_launched_aid != aid "+c+"!="+d);continue}if(d=!g.save_all)"undefined"==typeof g_fillfieldsmatches[e]&&(g_fillfieldsmatches[e]=[]),g_fillfieldsmatches[e][g_fillfieldsmatches[e].length]=g,g_fillfieldsmatchescurridx[e]=0;q=parseInt(lpGetPref("automaticallyFill",1));fill(a,g,b.docid,null,d,b.docnum,null,!0,null,q)}0!=lpGetPref("showFillNotificationBar",1)&&(get_selected_tab(null,function(){sendCS(a,{cmd:"showfillnotification",text:gs("LastPass has filled your login information into the form on this page."),
sites:cache_usernames(k),docnum:b.docnum})}),f=!0);break}}}!f&&0==lpGetPref("showNotificationsAfterClick",1)&&checkgenpwfillforms(a,e);return!0}
function checkWeakDuplicateBreached(a,b,f){if(g_showweakdupalerts&&qualifyForWeakCheck(getpasswordfromacct(a))&&(g_ischrome||g_issafari))!1==g_disablepwalerts&&("undefined"==typeof a.noalert||"1"!=a.noalert)&&getWeakAndDuplicateIds(g_username_hash,g_username,function(c){var d=null!=a.sharedfromaid&&""!=a.sharedfromaid&&"0"!=a.sharedfromaid&&"null"!=a.sharedfromaid?1:0,e=issharedfolder(g_shares,a.group),e=!checkreadonly(e,!0),d=!d&&!e&&"1"==a.pwch?1:0;isBreachedSite(a)?(g_notification_type="lpalert",
g_badgedata={cmd:"notification",type:"lpalert"},g_notification_data={cmd:"notification",type:"lpalert",data:{lpa_title:gs("This site was affected by a breach!"),lpa_msg:gs("The account you are logging into was either hacked or was reusing a password a password from a site that was hacked. You should take action now to change this password"),lpa_secondary_msg:gs("Use the Security Challenge to see other affected sites"),lpa_onclicktext:gs("Change Passwords Now"),lpa_onclickurl:base_url+"misc_challenge.php?breachid="+
a.breached}},set_badge(g_notification_data,b),drawIconAtRotation(0)):isDuplicateSite(c[0],a.aid)?(g_notification_type="alert",g_notification_data={cmd:"notification",type:"alert",aid:a.aid,name:a.name,username:getusernamefromacct(a),alerttype:"duplicate",tld:f,tabid:b,pwch:d},set_badge(g_notification_data,b),drawIconAtRotation(0)):isWeakPassword(c[1],a.aid)&&(g_notification_type="alert",g_notification_data={cmd:"notification",type:"alert",aid:a.aid,name:a.name,username:getusernamefromacct(a),alerttype:"weak",
tld:f,tabid:b,pwch:d},set_badge(g_notification_data,b),drawIconAtRotation(0))})}
function checkgenpwfillforms(a,b,f){var c=lp_gettld_url(b),d=1!=lpGetPref("showGenerateNotifications",1)||hasNeverGenerate(b,c),e=1!=lpGetPref("showFormFillNotifications",1)||hasNeverFormFill(b,c),g=[];if(do_experimental_popupfill){for(var h=0;h<g_formfills.length;h++)check_ident_ffid(g_formfills[h].ffid)&&(g[g.length]=g_formfills[h]);0==g.length&&(e=!0);b={cmd:"checkgenpwfillforms",nevergenerate:d,neverformfill:e,sites:cache_usernames(reorderOnURL(getsites(c),b,!0,!0)),formfills:LPJSON.stringify(g),
active:g_popupfill_last_active[a],activefieldid:g_popupfill_last_active_fieldid[a]};f||(b.ff=g_cachedffdat);sendCS(a,b,"all")}else{if(!e){for(h=0;h<g_formfills.length;h++)check_ident_ffid(g_formfills[h].ffid)&&(g[g.length]=g_formfills[h]);0==g.length&&(e=!0)}if(!d||!e)b={cmd:"checkgenpwfillforms",nevergenerate:d,neverformfill:e,sites:cache_usernames(reorderOnURL(getsites(c),b,!0,!0)),formfills:LPJSON.stringify(g)},f||(b.ff=g_cachedffdat),sendCS(a,b,"all")}}
function cache_usernames(a){for(var b in a)a[b].useusername=getusernamefromacct(a[b]);return LPJSON.stringify(a)}
function handleNever(a,b){if("neverautofill"==b.cmd){var f=b.aid;if("undefined"==typeof g_sites[f])return;g_sites[f].never_autofill=!0;g_sites[f].autologin=!1;f="aid="+en(f);lpMakeRequest(base_url+"set_never_autofill.php",f,null,null)}else if("neverdomain"==b.cmd||"neverpage"==b.cmd){var c="neverdomain"==b.cmd?lp_gettld_url(b.url):lpcanonizeUrl(b.url),f="url="+en(AES.url2hex(c));"undefined"!=typeof b.fromsave&&b.fromsave?g_neverurls.neveraccounts.push(c):"undefined"!=typeof b.fromgenerate&&b.fromgenerate?
(f+="&type=1",g_neverurls.nevergenerates.push(c)):"undefined"!=typeof b.fromformfill&&b.fromformfill?(f+="&type=2",g_neverurls.neverformfills.push(c)):"undefined"!=typeof b.fromshowicons&&b.fromshowicons?(f+="&type=6",g_neverurls.nevershowicons.push(c)):"undefined"!=typeof b.neverforall&&b.neverforall?(g_neverurls.neveraccounts.push(c),g_neverurls.nevergenerates.push(c),g_neverurls.neverformfills.push(c),g_neverurls.neverautologins.push(c),g_neverurls.nevershowicons.push(c),f+="&type=7"):(f+="&type=3",
g_neverurls.neverautologins.push(c));lpMakeRequest(base_url+"add_never.php",f,null,null)}g_local_accts_version++;rewritelocalfile()}
function handleSave(a,b){function f(a){if(!a)return!1;var b=["text","email","tel","url"],c;for(c in b)if(b.hasOwnProperty(c)&&a==b[c])return!0;return!1}var c=!1;if(g_cpwbot&&CPWbot_bg&&a==CPWbot_bg.get_pwchangetabid())return L("handleSave(tab:"+a+", state="+CPWbot_bg.g_pwchangestate+")"),console_log("Skipping save because driving a password change"),!1;var d=get_ff_translation("ff_currpass_regexp");if("undefined"==typeof SAVEALLFORMSUBMITS&&(!lploggedin||lp_url_is_lastpass(b.url,!0)||lp_url_is_lastpassext(b.url)))return!1;
for(var e=b.formdata.split("\n"),g=!1,h=!1,k=null,q="",s="",r=[],j=[],n=0,p=0,w=0,l=0,v=0,u=0;u<e.length;u++){var m=e[u].split("\t");if(!(4!=m.length&&5!=m.length)){decodeURIComponent(m[2]);var x=m[3];"password"==x?n++:"hidden"==x?v++:f(x)&&p++;"password"==x&&(5>m.length||5<=m.length&&"seen"==m[4])?w++:f(x)&&(5>m.length||5<=m.length&&"seen"==m[4])&&l++}}for(p=0;p<e.length;p++)if(l=e[p],l=l.split("\t"),!(4!=l.length&&5!=l.length)){m=decodeURIComponent(l[2]);v=l[3];u=!0;g&&(5<=l.length&&"notseen"==
l[4])&&(u=!1);if((!g||!h)&&f(v)&&0<m.length)u&&(q=m,g=!0),!1==h&&"undefined"!=typeof SpecialSites[lpcanonizeUrl(b.url)]&&(h=!0);if(!("password"==v&&5<=l.length&&"notseen"==l[4]&&1<n&&0<w)&&"password"==v&&(u||!1==h))if(u=decodeURIComponent(l[1]),r[j.length]={name:u,value:m},j[j.length]=m,!h&&m.length&&(s=m,h=!0),null==k&&(m=RegExp(d,"i"),u&&(u==b.current_pw_field_name||m.exec(u))))k=j.length-1}if(h){b.username=q;b.password=s;!g&&1<j.length&&(j[0]!=j[1]&&null==k)&&(b.username=j[0],b.password=j[1]);
d=lp_gettld_url(b.url);b.tld=d;l=!1;h="";1<j.length&&j[j.length-1]==j[j.length-2]&&""!=j[j.length-1]&&r[j.length-1].name!=r[j.length-2].name?(l=!0,h=j[j.length-1]):1<j.length&&j[0]==j[1]&&""!=j[0]&&r[0].name!=r[1].name?(l=!0,h=j[0]):1<j.length&&(j[0]!=j[1]&&""!=j[0]&&null!=k)&&(h=0==k&&2==j.length?j[1]:1==k&&2==j.length?j[0]:"");r=l||null!=k&&h;k=[];if(r&&(k=getsites(d,!0),b.createacct=2==j.length||0<array_length(k),b.createacct)){x=w=n=j="";for(p=0;p<e.length&&!(l=e[p],l=l.split("\t"),!(4!=l.length&&
5!=l.length)&&(v=l[3],""==j&&(f(v)&&""!=l[1]&&""!=l[2])&&(u=decodeURIComponent(l[1]),m=get_ff_translation("ff_username_regexp"),""!=m&&(m=RegExp(m,"i"),m.exec(u)&&(j=u,n=decodeURIComponent(l[2])))),""==w&&(f(v)&&""!=l[1]&&""!=l[2])&&(u=decodeURIComponent(l[1]),v=get_ff_translation("ff_email_regexp"),""!=v&&(m=RegExp(v,"i"),m.exec(u)&&(w=u,x=decodeURIComponent(l[2])))),""!=j&&""!=w));p++);""==j&&(j=w,n=x);b.username_field=j;""!=n&&(b.username=n)}if(r&&0<array_length(k)){if(verbose_log("looking for newpw="+
(g_show_pw_in_logs||g_isadmin?h:"REDACTED")+" tld="+d+" in g_didchangepw"),g="undefined"!=typeof g_didchangepw[SHA256(h+d)]&&g_didchangepw[SHA256(h+d)]>(new Date).getTime()-6E5,verbose_log("already processed pw ="+(g_show_pw_in_logs||g_isadmin?h:"REDACTED")+" tld="+d+" is "+g),!g&&(g_notification_type="change",b.newpw=h,g_notification_data=b,sendTS({cmd:"notification",type:"change"}),c=!0,0!=lpGetPref("showChangeNotificationBar",1))){var e=k,t;b.sitecount=array_length(e);if(1==array_length(e))for(p in e){b.singleaid=
p;t=gs("LastPass detected a password change for user:")+" "+getusernamefromacct(g_sites[p]);break}else t=gs("LastPass detected a password change for domain:")+" "+d;sendCS(a,{cmd:"showchangenotification",text:t,notificationdata:b});g_persistent_notifications[a]={cmd:"showchangenotification",text:t,notificationdata:b}}}else{if(hasNeverSave(b.url,d))return!1;var e=getsites(d),y;for(y in e)if(check_ident_aid(y)&&"undefined"!=typeof g_sites[y]&&(t=get_record(y),e=getusernamefromacct(t),p=getpasswordfromacct(t),
(!g||q==lpmdec_acct(t.username,!0,t,g_shares)||0==q.indexOf("****")||q==e)&&(s==lpmdec_acct(t.password,!0,t,g_shares)||s==p)||t.save_all&&isMatch(t,g,q,s)||q==lpmdec_acct(t.username,!0,t,g_shares)&&""==s))return!1;g_notification_type="save";g_notification_data=b;0!=lpGetPref("showSaveSiteNotifications",0)&&(sendTS({cmd:"notification",type:"save"}),c=!0);0!=lpGetPref("showSaveNotificationBar",1)&&lpCheckAddSite(b.username,b.password,d)&&(g_persistent_notifications[a]={cmd:"showaddnotification",text:gs("Should LastPass remember this password?"),
notificationdata:LPJSON.stringify(b)},sendCS(a,{cmd:"showaddnotification",text:gs("Should LastPass remember this password?"),notificationdata:LPJSON.stringify(b)},"streetscape.com"==d?"all":null),c=!0)}}return c}
function lpCheckAddSite(a,b,f){var c=lp_get_gmt_timestamp(),d=[],e;for(e in g_rejectedaddsites){var g=g_rejectedaddsites[e];c>g.rejectedTime+600&&(d[d.length]=e)}for(e=d.length-1;0<=e;e--)g_rejectedaddsites.splice(d[e],1);for(e in g_rejectedaddsites)if(g=g_rejectedaddsites[e],g.username==a&&lpdec(g.encryptedPassword)==b&&compare_tlds(g.tld,f))return!1;return!0}var lastupdatefields="";
function handleUpdateFields(a,b){var f=b.aid,c=g_sites[f],d=issharedfolder(g_shares,c.group);if(checkreadonly(d,!0)){var e=[],g=[],h=updateAndEncryptData(b.formdata,e,g,c),k=SHA256(h);if(k!=lastupdatefields){lastupdatefields=k;update_username_from_fields_if(c,e);for(k=c.fields.length-1;0<=k;k--)!c.fields[k].otherfield&&"1"!=c.fields[k].otherlogin&&c.fields.splice(k,1);for(k=0;k<e.length;k++)c.fields[c.fields.length]=e[k];g_local_accts_version++;rewritelocalfile();f="data="+en(bin2hex(h))+"&ref="+
en(url2hex(b.url))+"&updatefields=1&aid="+en(f);f+=!1==d?"":"&sharedfolderid="+en(d.id);c.postdata=f;c.posturl=base_url+"gm_deliver.php";c.newvalues=g;updateFieldsFromSubmit(f,c)}}}
function handleAddUrid(a,b){var f=b.aid,c=g_sites[f],d=issharedfolder(g_shares,c.group);if(checkreadonly(d,!0)){for(var e=[],g=0;g<c.fields.length;g++)"1"==c.fields[g].otherlogin&&!lp_in_array(c.fields[g].urid,e)&&(e[e.length]=c.fields[g].urid);if(!(10<=e.length)){var h=[],e=[],k=updateAndEncryptData(b.formdata,h,e,c);update_username_from_fields_if(c,h);for(g=0;g<h.length;g++)h[g].otherlogin="1",h[g].url=url2hex(b.url),c.fields[c.fields.length]=h[g];g_local_accts_version++;rewritelocalfile();f="data="+
en(bin2hex(k))+"&ref="+en(url2hex(b.url))+"&addurid=1&aid="+en(f);f+=!1==d?"":"&sharedfolderid="+en(d.id);c.postdata=f;c.posturl=base_url+"gm_deliver.php";c.newvalues=e;updateFieldsFromSubmit(f,c)}}}
function update_username_from_fields_if(a,b){for(var f=get_ff_translation("ff_combineddummy_regexp"),c=RegExp(f,"i"),d=0,f="",e=0;e<b.length;e++)if("text"==b[e].type||"email"==b[e].type||"tel"==b[e].type||"url"==b[e].type)if(!c.exec(b[e].name)&&!c.exec(b[e].id)&&!("answer"==b[e].id||"answer"==b[e].name))if(f=b[e].value,2<=++d)break;if(1==d&&""!=f){for(e=c=0;e<a.fields.length;e++)if(!a.fields[e].otherfield&&("text"==a.fields[e].type||"email"==a.fields[e].type||"tel"==a.fields[e].type||"url"==a.fields[e].type)){c++;
break}0==c&&(a.username=f,a.unencryptedUsername=lpdec_acct(crypto_btoa(a.username),a,g_shares))}}function handleSaveAll(a,b){b.save_all=1;g_site_data=b;openURL(getchromeurl("site.html"))}
function isMatch(a,b,f,c){b=b?!1:!0;for(var d=!1,e=0;e<a.fields.length;e++)if(!("text"!=a.fields[e].type&&"password"!=a.fields[e].type&&"email"!=a.fields[e].type&&"tel"!=a.fields[e].type&&"url"!=a.fields[e].type)){var g=lpmdec_acct(a.fields[e].value,!0,a,g_shares);if(("text"==a.fields[e].type||"email"==a.fields[e].type||"tel"==a.fields[e].type||"url"==a.fields[e].type)&&f==g)b=!0;"password"==a.fields[e].type&&c==g&&(d=!0)}return b&&d?!0:!1}var g_reqindex=0;
function fill(a,b,f,c,d,e,g,h,k,q,s,r){verbose_log("tabid="+a+"\nacct.aid="+b.aid+"\ndocid="+f+"\nsubmit="+c+"\ndoconfirm="+d+"\ndocnum="+e+"\nallowforce="+g+"\nskip_pwprotect="+h+"\nmanualfill="+k+"\nautomaticallyFill="+q+"\nskip_basicauth="+s+"\nfrom_iframe="+r);if("undefined"==typeof q||null==q)q=1;k||(k=!1);var j=!1,n=0;!h&&(b.pwprotect||g_prompts.login_site_prompt)?(console_log("FILL : Showing Security Prompt"),security_prompt(function(){setTimeout(function(){var h=get_record(b.aid);fill(a,h,
f,c,d,e,g,!0,k,null,null,r)},100)},null,null,!0,b.aid,!0)):get_selected_tab(null,function(p){if(!s&&q&&(g||1==b.basic_auth)&&gettabid(p)==a&&g_ischrome&&have_binary_function("fill_basicauth")){p=getusernamefromacct(b);var w=getpasswordfromacct(b);if(""!=p||""!=w){var l=check_autologin(c,b),v=lp_gettld_url(b.url),u=lp_gettld_url(g_basicauth_origurl);compare_tlds(v,u)&&(v=u);call_binary_function("fill_basicauth",p,w,g?!0:!1,v,l?!0:!1,function(j){j?g_basicauth_found=!1:fill(a,b,f,c,d,e,g,h,k,q,!0)});
return}}is_guiless()&&(q=1);v=b.tld;customjs_has_humanize(b.aid)&&(j=!0);p=b.fields;l=p.length?p.length:0;d=1==d?1:0;g=g?1:0;r=r?1:0;w=null!=b.sharedfromaid&&""!=b.sharedfromaid&&"0"!=b.sharedfromaid&&"null"!=b.sharedfromaid?1:0;if(0!=l){for(l=v=0;l<p.length;l++)"password"==p[l].type&&v++;v=!b.save_all&&0==v;u=[];for(l=0;l<p.length;l++)if(b.save_all||!(1==d&&"password"!=p[l].type&&!g&&!v)){var m=p[l],x=m.value;if(!(""!=m.name&&"undefined"!=typeof u[m.name+x+m.type])){u[m.name+x+m.type]=1;var t=m.type;
if(!("undefined"!=typeof b.captcha_id&&""!=b.captcha_id&&b.captcha_id==m.name&&"text"==t)){if("text"==t||"password"==t||"email"==t||"tel"==t||"textarea"==t||"url"==t)x=lpmdec_acct(x,!0,b,g_shares);if(""!=x){verbose_log("Sending FillRequest: "+l+"\ntype="+t+"\nname="+m.name+"\nvalue=<hidden>");var y="undefined"!=typeof g_launches[a]&&g_launches[a]&&g_launches[a]==b.aid&&"undefined"!=typeof g_last_launch&&"undefined"!=typeof g_last_launch[b.aid]&&25E3>=(new Date).getTime()-g_last_launch[b.aid]?!0:!1,
z={from:"fillfield_A",index:g_reqindex,time:(new Date).getTime(),uniqid:Math.floor(1E8*Math.random())};++g_reqindex;j&&n++;fillfieldCS(a,e,b.aid,{reqinfo:z,docid:f,sharedsite:w,automaticallyFill:q,is_launch:y,manualfill:k,name:m.name,value:x,type:t,checked:m.checked,otherfield:m.otherfield,doconfirm:d||b.save_all&&"password"==t?1:2,allowforce:g,sharedsite:w,from_iframe:r,humanize:j,delaysecs:n},c)}}}}}else g&&(console_log("no fields. finding best match "+getusernamefromacct(b)+" and <hidden>"),y=
"undefined"!=typeof g_launches[a]&&g_launches[a]&&g_launches[a]==b.aid&&"undefined"!=typeof g_last_launch&&"undefined"!=typeof g_last_launch[b.aid]&&25E3>=(new Date).getTime()-g_last_launch[b.aid]?!0:!1,console_log("Sending fillbest from A reqindex="+g_reqindex),z={from:"fillbest_A",index:g_reqindex,time:(new Date).getTime(),uniqid:Math.floor(1E8*Math.random())},++g_reqindex,fillbestCS(a,e,b.aid,{reqinfo:z,docid:f,updatefields:1,addurid:0,sharedsite:w,automaticallyFill:q,is_launch:y,humanize:j}));
g&&logLoginAndCheckWeakPassword(a,b);1!=d&&(l=check_autologin(c,b),"undefined"!=typeof AUTOSUBMIT&&(l=!0),"string"==typeof b.custom_js&&""!=b.custom_js&&sendCS(a,{cmd:"run_custom_js",docid:f,custom_js:b.custom_js,username:getusernamefromacct(b),password:lpmdec_acct(b.password,!0,b,g_shares),onlyfill:l?0:1,loc:3},e),("string"!=typeof b.custom_js||-1==b.custom_js.indexOf("lpdontsubmit"))&&l&&submitCS(a,e,b.aid,{docid:f}))})}
function logLoginAndCheckWeakPassword(a,b){get_all_windows({populate:!0},function(f){for(var c=0;c<f.length;c++)for(var d=0;d<get_tabs_length(f[c]);d++){var e=get_tabs(f[c])[d];if(gettabid(e)==a&&(checkWeakDuplicateBreached(b,a,lp_gettld_url(gettaburl(e))),(g_loglogins||LPISLOC)&&"undefined"==typeof g_loggedLogins[b.aid]))g_loggedLogins[b.aid]="1",loglogintab(b.aid,e)}})}function showpageoverlay(a){sendCS(a,{cmd:"showoverlay",urlprefix:getchromeurl("",!0)})}
function check_autologin(a,b){var f=!1;if(a)f=!0;else if(b.autologin){var c=(new Date).getTime(),d=parseInt(lpGetPref("autoautoVal",25));if(isNaN(d)||""==d||0>=d)d=25;d=c-1E3*d;"undefined"==typeof b.last_auto_login||isNaN(b.last_auto_login)||b.last_auto_login<d?(console_log("Launching autologin"),b.last_auto_login=c,f=!0):console_log("last autologin too soon!")}return f}
function fillfieldsconfirm(a){if(!a||!lploggedin)return!1;var b=a.url,f="undefined"!=typeof a.topurl?a.topurl:"",c=lp_gettld_url(b),d=a.result,e=a.aid,g=a.docid,h=a.tabid,k=a.doconfirm,q=a.from_iframe?!0:!1,s=a.manualfill,r=a.allowforce,r=!1,j="undefined"!=typeof a.automaticallyFill?a.automaticallyFill:1,n=get_record(e);if(!n)return!1;if(hasNeverAutologin(b,c)||f&&f!=b&&hasNeverAutologin(f,c))r=!0;if(d&&(logLoginAndCheckWeakPassword(h,n),2==k))return q&&(s&&!r)&&sendCS(h,{cmd:"conditionalforcefill",
reqinfo:w,username:getusernamefromacct(n),password:getpasswordfromacct(n),aid:n.aid,sharedsite:p,automaticallyFill:j,from_iframe:q},a.docnum),!0;if(r)return!1;var p=null!=n.sharedfromaid&&""!=n.sharedfromaid&&"0"!=n.sharedfromaid&&"null"!=n.sharedfromaid?1:0;if(n.save_all){if(!d||s){b="undefined"!=typeof g_launches[h]&&g_launches[h]&&g_launches[h]==n.aid&&"undefined"!=typeof g_last_launch&&"undefined"!=typeof g_last_launch[n.aid]&&25E3>=(new Date).getTime()-g_last_launch[n.aid]?!0:!1;console_log("Sending fillbest from B reqindex="+
g_reqindex);var w={from:"fillbest_B",index:g_reqindex,time:(new Date).getTime(),uniqid:Math.floor(1E8*Math.random())};++g_reqindex;fillbestCS(h,a.docnum,n.aid,{reqinfo:w,docid:g,updatefields:0,addurid:0,sharedsite:p,automaticallyFill:j,is_launch:b,saveall:n.saveall?!0:!1})}}else if(d){n=get_record(e);s=r=null;q&&a.manualfill&&(r=s=!0);var l;fill(h,n,g,null,!1,a.docnum,r,!0,s,j,!1,q);delete g_fillfieldsmatches[b];delete g_fillfieldsmatchescurridx[b]}else if(a.allowforce)b="undefined"!=typeof g_launches[h]&&
g_launches[h]&&g_launches[h]==n.aid&&"undefined"!=typeof g_last_launch&&"undefined"!=typeof g_last_launch[n.aid]&&25E3>=(new Date).getTime()-g_last_launch[n.aid]?!0:!1,console_log("Sending fillbest from C reqindex="+g_reqindex),w={from:"fillbest_C",index:g_reqindex,time:(new Date).getTime(),uniqid:Math.floor(1E8*Math.random())},++g_reqindex,fillbestCS(h,a.docnum,e,{reqinfo:w,docid:g,updatefields:0,addurid:s?1:0,sharedsite:p,automaticallyFill:j,is_launch:b});else{if(e=g_fillfieldsmatches[b]){s=!1;
for(n=0;n<e.length;n++){p=e[n].aid;if(s){(n=g_sites[p])&&(l=!1);fill(h,n,g,null,!0,a.docnum,null,!0,null,j,l,q);return}n==g_fillfieldsmatchescurridx[b]&&(g_fillfieldsmatchescurridx[b]++,s=!0)}}delete g_fillfieldsmatches[b];delete g_fillfieldsmatchescurridx[b]}return!0}
function web2plug(a){"2"==a.rsa?(g_local_key=AES.hex2bin(a.key),g_local_key_hex=a.key,g_local_key_hash=SHA256(g_local_key),rsa_userchangedpassword(),a=opendb(),createDataTable(a),a&&!LPISLOC&&a.transaction(function(a){a.executeSql("DELETE FROM LastPassData WHERE username_hash=? AND type=?",[db_prepend(g_username_hash),"accts"],function(){},function(a,b){console_log(b)})}),lpWriteKeyFile()):""!=g_username&&null!=g_username&&g_username!=a.username?loggedOut(!1,"web2plug"):(g_local_key=AES.hex2bin(a.key),
g_local_key_hex=a.key,g_local_key_hash=SHA256(g_local_key),lpWriteKeyFile())}function recover(a,b,f,c){var d=lpParseUri(b);b=d.directory;d=d.file;b=b.replace(/^\/~[^/]*/,"");""!=b&&"/"!=b&&"/sso/"!=b||"recover.php"==d&&GetOTPHash(null,a,f,c)}
function loginfromwebsite(a){if(""!=a.wxusername&&""!=a.keyhex){var b=opendb();createSavedLoginsTable(b);b&&b.transaction(function(c){1==a.rememberemail?(L("remembering email"),set_default_login_username(a.wxusername)):L("not remembering email");c.executeSql("SELECT * FROM LastPassSavedLogins2 WHERE username = ? AND password != ''",[a.wxusername],function(c,d){if(0<d.rows.length){var f=d.rows.item(0).password,k=function(c){var d=get_key_iterations(a.wxusername);make_lp_key_iterations(a.wxusername,
c,d,function(c){AES.bin2hex(c)!=a.keyhex&&b.transaction(function(b){b.executeSql("UPDATE LastPassSavedLogins2 SET password = '' WHERE username = ?",[a.wxusername],function(){},function(a,b){console_log(b)})})})};1==d.rows.item(0)["protected"]?unprotect_data(f,!1,k):2==d.rows.item(0)["protected"]&&k(lpdec(f,AES.hex2bin(SHA256(a.wxusername))))}},function(){})});var f=AES.hex2bin(a.keyhex),c=null!=g_local_key?AES.bin2hex(g_local_key):"";if(!lploggedin||!(g_username==a.wxusername&&c==a.keyhex))lploggedin&&
g_username==a.wxusername?(g_local_key=f,g_local_key_hex=a.keyhex,g_local_key_hash=SHA256(g_local_key)):(lploggedin&&""!=g_username&&loggedOut(!1,"differentuser"),""!=a.wxsessid&&(lp_phpsessid=a.wxsessid),g_local_key=f,g_local_key_hex=a.keyhex,g_local_key_hash=SHA256(g_local_key),lpWriteKeyFile(),LP.lplogincheck(!0,null,a.wxusername,a.wxhash))}else lploggedin||LP.lplogincheck(!0)}
function reorderOnURL(a,b,f,c){var d=lpParseUri(b),e=lpcanonizeUrl(b,d),g="string"==typeof d.path?d.path.split("/"):[],h=lp_gettld_url(b),k=[],q;for(q in a)if(check_ident_aid(q)&&(a=g_sites[q],!("undefined"==typeof a||"undefined"==typeof a.url)))if(a.save_all||!f||!(""==a.unencryptedUsername&&""==a.password))if(!c||accthaspassword(a)){var s=lpParseUri(a.url);a.realmmatch=(b==g_basicauth_url||b==g_basicauth_origurl)&&(lpmdec_acct(a.realm_data,!0,a,g_shares)==g_basicauth_realm||g_basicauth_found&&""==
g_basicauth_realm&&1==a.basic_auth);a.servermatch=d.host==s.host;a.portmatch=compare_ports(d,s);a.serverportmatch=a.servermatch&&a.portmatch?1:0;a.usernamematch="undefined"!=typeof g_username_vals[b]&&""!=g_username_vals[b]&&g_username_vals[b]==a.unencryptedUsername;a.urlmatch=lpcanonizeUrl(a.url)==e?!0:!1;var s="string"==typeof s.path?s.path.split("/"):[],r;for(r=0;r<g.length&&r<s.length&&s[r]==g[r];r++);a.pathlevelmatch=r;a.fieldmatchcount=0;k.push(a)}k.sort(lp_aids_sort_func);return k=checkurlrules(g_urlrules,
k,h,"string"==typeof d.path?d.path:"",d.host,g_sites,get_port(d))}
function lp_aids_sort_func(a,b){return a.realmmatch!=b.realmmatch?a.realmmatch?-1:1:a.usernamematch!=b.usernamematch?a.usernamematch?-1:1:a.fav!=b.fav?"1"==a.fav?-1:1:a.urlmatch!=b.urlmatch?a.urlmatch?-1:1:a.serverportmatch&&b.serverportmatch&&a.pathlevelmatch!=b.pathlevelmatch?a.pathlevelmatch>b.pathlevelmatch?-1:1:a.serverportmatch!=b.serverportmatch?a.serverportmatch?-1:1:a.servermatch!=b.servermatch?a.servermatch?-1:1:a.fieldmatchcount!=b.fieldmatchcount?a.fieldmatchcount>b.fieldmatchcount?-1:
1:a.last_touch!=b.last_touch?a.last_touch>b.last_touch?-1:1:a.name!=b.name?a.name<b.name?-1:1:0}function lp_sort_case_insensitive_name(a,b){a=a.name.toLowerCase();b=b.name.toLowerCase();return a<b?-1:1}
function launchautologin(a,b){if(check_ident_aid(a)){var f=g_sites[a];f&&(!b&&(f.pwprotect||g_prompts.login_site_prompt)?f.pwprotect&&needs_secure_reprompt(f)?security_prompt(function(){launchautologin(a,!0)},null,null,!0,f.aid,!1):security_prompt(function(){launchautologin(a,!0)}):(g_last_launch[f.aid]=(new Date).getTime(),openURL(f.url,function(a,b){g_launches[gettabid(a)]=b},f.aid)))}}
function is_max_frames_exceeded(a,b){var f=10;if(null==b)return!0;try{var c=g_CS_tops[a],d=g_CS[a][c],e="",e=g_ischrome&&d?lp_gettld_url(d.sender.tab.url):lp_gettld_url(gettaburl(d));"undefined"==typeof c?L("still waiting for topdoc to register for [tab:"+a+"] tld="+e):L("topdoc="+c+" tld="+e);e&&"dailykos.com"==e&&(f=40)}catch(g){console.error("is_max_frames_exceeded: "+g)}debug&&(c=count_cs_for_tabid(a),0<c&&console.warn("is_max_frames_exceeded: CS table count="+c+", global g_CS_count="+g_CS_count[a]),
dumpinfo_for_tabid(a));g_skip_ad_frames&&(f=25);return b[a]>f}
function fillbestCS(a,b,f,c){var d=get_record(f);if("undefined"==typeof a||!d)return!1;c||(c={aid:f});c.cmd="fillbest";"undefined"==typeof c.clearfilledfieldsonlogoff&&(c.clearfilledfieldsonlogoff=lpGetPref("clearfilledfieldsonlogoff",0));"undefined"==typeof c.realurl&&(c.realurl=d.url);"undefined"==typeof c.username&&(c.username=getusernamefromacct(d));"undefined"==typeof c.password&&(c.password=getpasswordfromacct(d));"undefined"==typeof c.custom_js&&(c.custom_js=d.custom_js);"undefined"==typeof c.domains&&
(c.domains=getacceptabletlds(d.url));"undefined"==typeof c.is_launch&&(c.is_launch="undefined"!=typeof g_launches[a]&&g_launches[a]&&g_launches[a]==d.aid&&"undefined"!=typeof g_last_launch&&"undefined"!=typeof g_last_launch[d.aid]&&25E3>=(new Date).getTime()-g_last_launch[d.aid]?!0:!1);"undefined"==typeof c.automaticallyFill&&(c.automaticallyFill=1);"undefined"==typeof c.updatefields&&(c.updatefields=0);"undefined"==typeof c.addurid&&(c.addurid=0);"undefined"==typeof c.aid&&(c.aid=f);"undefined"==
typeof c.sharedsite&&(c.sharedsite=null!=d.sharedfromaid&&""!=d.sharedfromaid&&"0"!=d.sharedfromaid&&"null"!=d.sharedfromaid?1:0);"undefined"==typeof c.dontfillautocompleteoff&&(c.dontfillautocompleteoff=getInt(lpGetPref("dontfillautocompleteoff",0)));"undefined"==typeof c.saveall&&(c.saveall=d.saveall?!0:!1);sendCS(a,c,b);return!0}
function fillfieldCS(a,b,f,c,d){var e=get_record(f);if("undefined"==typeof a||!e)return!1;c||(c={aid:f});c.cmd="fillfield";"undefined"==typeof c.clearfilledfieldsonlogoff&&(c.clearfilledfieldsonlogoff=lpGetPref("clearfilledfieldsonlogoff",0));"undefined"==typeof c.dontfillautocompleteoff&&(c.dontfillautocompleteoff=getInt(lpGetPref("dontfillautocompleteoff",0)));"undefined"==typeof c.realurl&&(c.realurl=e.url);"undefined"==typeof c.aid&&(c.aid=f);"undefined"==typeof c.tabid&&(c.tabid=a);"undefined"==
typeof c.custom_js&&(c.custom_js=e.custom_js);"undefined"==typeof c.domains&&(c.domains=getacceptabletlds(e.url));"undefined"==typeof c.is_launch&&(c.is_launch="undefined"!=typeof g_launches[a]&&g_launches[a]&&g_launches[a]==e.aid&&"undefined"!=typeof g_last_launch&&"undefined"!=typeof g_last_launch[e.aid]&&25E3>=(new Date).getTime()-g_last_launch[e.aid]?!0:!1);"undefined"==typeof c.automaticallyFill&&(c.automaticallyFill=1);"undefined"==typeof c.from_iframe&&(c.from_iframe=0);"undefined"==typeof c.formname&&
(c.formname="");"undefined"==typeof c.type&&(c.type="text");"undefined"==typeof c.doconfirm&&(c.doconfirm=2);if("undefined"==typeof c.delaysecs||!parseInt(c.delaysecs))c.delaysecs=0;""!=e.custom_js&&(c.username=getusernamefromacct(e),c.password=getpasswordfromacct(e),c.onlyfill=d?0:1);if("undefined"==typeof c.name||"undefined"==typeof c.value)return console_error("missing required fields!"),!1;c.humanize&&c.delaysecs?setTimeout(function(){sendCS(a,c,b)},1E3*c.delaysecs):sendCS(a,c,b);return!0}
function submitCS(a,b,f,c){var d=get_record(f);if("undefined"==typeof a||!d)return!1;var e="undefined"!=typeof d.submit_id?d.submit_id:"",g="undefined"!=typeof d.submit_html?d.submit_html:"",h="undefined"!=typeof d.submit_js?d.submit_js:"";c||(c={aid:f});c.cmd="submit";"undefined"==typeof c.aid&&(c.aid=f);"undefined"==typeof c.custom_js&&(c.custom_js=d.custom_js);"undefined"==typeof c.submit_id&&(c.submit_id=e);"undefined"==typeof c.submit_html&&(c.submit_html=g);"undefined"==typeof c.submit_js&&
(c.submit_js=h);if("undefined"==typeof c.delaysecs||!parseInt(c.delaysecs))c.delaysecs=0;is_guiless()&&"bankofamerica.com"==lp_gettld_url(d.url)?pass:c.humanize&&c.delaysecs?setTimeout(function(){sendCS(a,c,b)},1E3*c.delaysecs):sendCS(a,c,b);return!0}function customjs_has_humanize(a){a=get_record(a);return!a?!1:"string"==typeof a.custom_js&&0<=a.custom_js.indexOf("lphumanize")?!0:!1}
function customjs_has_dontsubmit(a){a=get_record(a);return!a?!1:"string"==typeof a.custom_js&&0<=a.custom_js.indexOf("lpdontsubmit")?!0:!1};
