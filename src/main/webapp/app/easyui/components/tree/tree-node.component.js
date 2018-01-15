/**
 * EasyUI for Angular 1.0
 * 
 * Copyright (c) 2009-2018 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the freeware license: https://www.jeasyui.com/license_freeware2.php
 * To use it on other terms please contact us: info@jeasyui.com
 *
 */
import{Component,forwardRef,Input,Inject}from"@angular/core";import{TreeComponent}from"./tree.component";var TreeNodeComponent=function(){function TreeNodeComponent(tree){this.tree=tree,this.pnode=null,this.depth=0,this.checkState="unchecked",this.loading=!1}return Object.defineProperty(TreeNodeComponent.prototype,"indentWidth",{get:function(){return this.isLeaf()?16*(this.depth+1):16*this.depth},enumerable:!0,configurable:!0}),Object.defineProperty(TreeNodeComponent.prototype,"checkboxClass",{get:function(){var index=["unchecked","checked","indeterminate"].indexOf(this.node.checkState);return-1==index&&(index=0),"tree-checkbox"+index},enumerable:!0,configurable:!0}),TreeNodeComponent.prototype.ngOnInit=function(){this.node.parent=this.pnode},TreeNodeComponent.prototype.isExpanded=function(){return!this.node.state||"open"==this.node.state},TreeNodeComponent.prototype.isCollapsed=function(){return!(!this.node.state||"closed"!=this.node.state)},TreeNodeComponent.prototype.isLeaf=function(){return"closed"!=this.node.state&&(this.node.children&&this.node.children.length?(this.loading=!1,!1):!this.loading)},TreeNodeComponent.prototype.isSelected=function(node){return node==this.tree.selection},TreeNodeComponent.prototype.toggle=function(event){event.stopPropagation(),this.isExpanded()?(this.node.state="closed",this.tree.nodeCollapse.emit(this.node)):(this.loading=!0,this.node.state="open",this.tree.nodeExpand.emit(this.node))},TreeNodeComponent.prototype.onClickNode=function(event){event.stopPropagation(),this.tree.nodeClick.emit(this.node),this.tree.selectNode(this.node)},TreeNodeComponent.prototype.onCheckNode=function(event){event.stopPropagation(),"checked"==this.node.checkState?this.tree.uncheckNode(this.node):this.tree.checkNode(this.node)},TreeNodeComponent.prototype.onNodeContextMenu=function(event){this.tree.nodeContextMenu.emit({node:this.node,originalEvent:event})},TreeNodeComponent}();export{TreeNodeComponent};TreeNodeComponent.decorators=[{type:Component,args:[{selector:"eui-tree-node",template:'\n\t\t<li>\n\t\t\t<div class="tree-node"\n\t\t\t\t\t[class.tree-node-hover]="tree.highlightNode==node"\n\t\t\t\t\t[class.tree-node-selected]="isSelected(node)"\n\t\t\t\t\t(mouseenter)="tree.highlightNode=node"\n\t\t\t\t\t(mouseleave)="tree.highlightNode=null"\n\t\t\t\t\t(contextmenu)="onNodeContextMenu($event)"\n\t\t\t\t\t(click)="onClickNode($event)">\n\t\t\t\t<span class="tree-indent" [style.width.px]="indentWidth"></span\n\t\t\t\t><span *ngIf="!isLeaf()" class="tree-hit" \n\t\t\t\t\t\t[class.tree-expanded]="isExpanded()" \n\t\t\t\t\t\t[class.tree-collapsed]="isCollapsed()"\n\t\t\t\t\t\t(click)="toggle($event)"></span\n\t\t\t\t><span class="tree-icon tree-folder" \n\t\t\t\t\t\t[ngClass]="node.iconCls"\n\t\t\t\t\t\t[class.tree-folder-open]="isExpanded()"\n\t\t\t\t\t\t[class.tree-file]="isLeaf()"\n\t\t\t\t\t\t[class.tree-loading]="loading"></span\n\t\t\t\t><span *ngIf="tree.checkbox" class="tree-checkbox" [ngClass]="checkboxClass" (click)="onCheckNode($event)"></span\n\t\t\t\t><span *ngIf="!tree.itemTemplate" class="tree-title">{{node.text}}</span\n\t\t\t\t><span *ngIf="tree.itemTemplate" class="tree-title">\n\t\t\t\t\t<ng-template [euiTreeItemTemplate]="tree.itemTemplate.template" [node]="node"></ng-template>\n\t\t\t\t</span>\n\t\t\t</div>\n\t\t\t<ul *ngIf="isExpanded() && node.children && node.children.length">\n\t\t\t\t<ng-container *ngFor="let cnode of node.children">\n\t\t\t\t\t<eui-tree-node *ngIf="!cnode.hidden" [node]="cnode" [pnode]="node" [depth]="depth+1"></eui-tree-node>\n\t\t\t\t</ng-container>\n\t\t\t</ul>\n\t\t</li>\n\t'}]}],TreeNodeComponent.ctorParameters=function(){return[{type:TreeComponent,decorators:[{type:Inject,args:[forwardRef(function(){return TreeComponent})]}]}]},TreeNodeComponent.propDecorators={node:[{type:Input}],pnode:[{type:Input}],depth:[{type:Input}],checkState:[{type:Input}]};