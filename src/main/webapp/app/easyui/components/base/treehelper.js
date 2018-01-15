/**
 * EasyUI for Angular 1.0
 * 
 * Copyright (c) 2009-2018 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the freeware license: https://www.jeasyui.com/license_freeware2.php
 * To use it on other terms please contact us: info@jeasyui.com
 *
 */
var TreeHelper=function(){function TreeHelper(){this.cascadeCheck=!0}return TreeHelper.prototype.checkNode=function(node,callback){"checked"!=node.checkState&&(node.checkState="checked",this.cascadeCheck&&(this.setChildCheckbox(node,node.checkState),this.setParentCheckbox(node)),callback(node))},TreeHelper.prototype.uncheckNode=function(node,callback){"unchecked"!=node.checkState&&(node.checkState="unchecked",this.cascadeCheck&&(this.setChildCheckbox(node,node.checkState),this.setParentCheckbox(node)),callback(node))},TreeHelper.prototype.uncheckAllNodes=function(nodes,callback){var changed=!1;this.forNodes(nodes,function(node){"unchecked"!=node.checkState&&(node.checkState="unchecked",changed=!0)}),changed&&callback()},TreeHelper.prototype.setParentCheckbox=function(node){var pnode=node.parent;pnode&&(pnode.checkState=this.calcNodeState(pnode),this.setParentCheckbox(pnode))},TreeHelper.prototype.setChildCheckbox=function(node,checkState){if(node.checkState=checkState,node.children)for(var _i=0,_a=node.children;_i<_a.length;_i++){var cnode=_a[_i];this.setChildCheckbox(cnode,checkState)}},TreeHelper.prototype.adjustCheck=function(node){this.cascadeCheck&&("checked"==node.checkState?(this.setChildCheckbox(node,node.checkState),this.setParentCheckbox(node)):"unchecked"==node.checkState?(this.setChildCheckbox(node,node.checkState),this.setParentCheckbox(node)):(node.checkState=this.calcNodeState(node),this.setParentCheckbox(node)))},TreeHelper.prototype.calcNodeState=function(node){var count=node.children?node.children.length:0;if(count){for(var checkedCount=0,uncheckedCount=0,_i=0,_a=node.children;_i<_a.length;_i++){var cnode=_a[_i];cnode.checkState=cnode.checkState||"unchecked","checked"==cnode.checkState?checkedCount++:"unchecked"==cnode.checkState&&uncheckedCount++}return checkedCount==count?"checked":uncheckedCount==count?"unchecked":"indeterminate"}return"unchecked"},TreeHelper.prototype.forNodes=function(fromNodes,callback){fromNodes=fromNodes||[];for(var nodes=[],i=0;i<fromNodes.length;i++)nodes.push(fromNodes[i]);for(;nodes.length;){var node=nodes.shift();if(0==callback(node))return;if(node.children)for(i=node.children.length-1;i>=0;i--)nodes.unshift(node.children[i])}},TreeHelper.prototype.findNode=function(nodes,field,value){var node=null;return this.forNodes(nodes,function(n){if(n[field]==value)return node=n,!1}),node},TreeHelper}();export{TreeHelper};export var treeHelper=new TreeHelper;