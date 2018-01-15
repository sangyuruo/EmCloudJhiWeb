/**
 * EasyUI for Angular 1.0
 * 
 * Copyright (c) 2009-2018 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the freeware license: https://www.jeasyui.com/license_freeware2.php
 * To use it on other terms please contact us: info@jeasyui.com
 *
 */
var __extends=this&&this.__extends||function(){var extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b}||function(d,b){for(var p in b)b.hasOwnProperty(p)&&(d[p]=b[p])};return function(d,b){function __(){this.constructor=d}extendStatics(d,b),d.prototype=null===b?Object.create(b):(__.prototype=b.prototype,new __)}}();import{Component,ViewChild,Input,Output,EventEmitter,ElementRef}from"@angular/core";import{PanelComponent}from"../panel/panel.component";import{DraggableDirective}from"../draggable/draggable.directive";import{ResizableDirective}from"../resizable/resizable.directive";import{domHelper}from"../base/domhelper";export var DIALOG_TEMPLATE='\n\t<div #panel *ngIf="!closed" class="panel f-column f-full" [ngClass]="panelCls" [ngStyle]="panelStyle" \n\t\t\teuiDraggable euiResizable>\n\t\t<div #pheader *ngIf="hasHeader"\n\t\t\t\tclass="panel-header f-noshrink"\n\t\t\t\t[class.panel-header-noborder]="!border"\n\t\t\t\t[ngClass]="headerCls"\n\t\t\t\t[ngStyle]="headerStyle">\n\t\t\t<ng-content select="eui-panel-header,eui-dialog-header"></ng-content>\n\t\t\t<div *ngIf="!headers.length" class="panel-title" [class.panel-with-icon]="iconCls">{{title}}</div>\n\t\t\t<div *ngIf="iconCls" class="panel-icon {{iconCls}}"></div>\n\t\t\t<div class="panel-tool" *ngIf="collapsible || closable">\n\t\t\t\t<a *ngIf="collapsible" href="javascript:;" [ngClass]="collapsed?expandIconCls:collapseIconCls" (click)="onClickCollapsibleTool($event)"></a>\n\t\t\t\t<a *ngIf="closable" href="javascript:;" [ngClass]="closeIconCls" (click)="onClickCloseTool($event)"></a>\n\t\t\t</div>\n\t\t</div>\n\t\t<div #pbody *ngIf="!isBodyCollapsed()"\n\t\t\t\tclass="panel-body f-full" \n\t\t\t\t[class.panel-body-noheader]="!hasHeader" \n\t\t\t\t[class.panel-body-nobottom]="footers.length" \n\t\t\t\t[class.panel-body-noborder]="!border" \n\t\t\t\t[ngClass]="bodyCls"\n\t\t\t\t[ngStyle]="bodyStyle">\n\t\t\t<ng-content></ng-content>\n\t\t</div>\n\t\t<div #pfooter *ngIf="hasFooter" \n\t\t\t\tclass="panel-footer" \n\t\t\t\t[class.panel-footer-noborder]="!border"\n\t\t\t\t[ngClass]="footerCls"\n\t\t\t\t[ngStyle]="footerStyle">\n\t\t\t<ng-content select="eui-panel-footer,eui-dialog-footer"></ng-content>\n\t\t</div>\n\t</div>\n';var DialogComponent=function(_super){function DialogComponent(hostRef){var _this=_super.call(this,hostRef)||this;return _this.hostRef=hostRef,_this.title=null,_this.border=!1,_this.borderType="thick",_this.closable=!0,_this.modal=!1,_this.draggable=!1,_this.resizable=!1,_this.draggableOptions={},_this.resizableOptions={},_this.onOpen=new EventEmitter,_this.onClose=new EventEmitter,_this.maskEl=null,_this.initialized=!1,_this._panelCls=null,_this._headerCls=null,_this._bodyCls=null,_this._footerCls=null,_this._closed=!1,_this}return __extends(DialogComponent,_super),Object.defineProperty(DialogComponent.prototype,"panelCls",{get:function(){var cls="window window-shadow";return"none"==this.borderType?cls+=" window-thinborder window-noborder":"thin"==this.borderType&&(cls+=" window-thinborder"),cls+=this._panelCls?" "+this._panelCls:""},set:function(value){this._panelCls=value},enumerable:!0,configurable:!0}),Object.defineProperty(DialogComponent.prototype,"headerCls",{get:function(){var cls="window-header";return cls+=this._headerCls?" "+this._headerCls:""},set:function(value){this._headerCls=value},enumerable:!0,configurable:!0}),Object.defineProperty(DialogComponent.prototype,"bodyCls",{get:function(){var cls="window-body";return this.hasHeader||(cls+=" window-body-noheader"),cls+=this._bodyCls?" "+this._bodyCls:""},set:function(value){this._bodyCls=value},enumerable:!0,configurable:!0}),Object.defineProperty(DialogComponent.prototype,"footerCls",{get:function(){var cls="window-footer";return cls+=this._footerCls?" "+this._footerCls:""},set:function(value){this._footerCls=value},enumerable:!0,configurable:!0}),Object.defineProperty(DialogComponent.prototype,"closed",{get:function(){return this._closed},set:function(value){this._closed!=value&&(this._closed=value,this.initialized&&(this.initDialog(),this._closed?this.onClose.emit():this.onOpen.emit()))},enumerable:!0,configurable:!0}),DialogComponent.prototype.ngAfterViewInit=function(){this.initialized=!0,this.initDialog()},DialogComponent.prototype.ngOnDestroy=function(){this.closeMask(),this.panelRef&&this.hostRef.nativeElement.appendChild(this.panelRef.nativeElement)},DialogComponent.prototype.initDialog=function(){var _this=this;this.closed?this.closeMask():this.panelRef?(document.body.appendChild(this.panelRef.nativeElement),this.openMask(),this.displaying()):setTimeout(function(){_this.panelRef&&(document.body.appendChild(_this.panelRef.nativeElement),_this.openMask(),_this.displaying())})},DialogComponent.prototype.openMask=function(){this.modal&&!this.maskEl&&(this.maskEl=document.createElement("div"),domHelper.addClass(this.maskEl,"window-mask"),document.body.appendChild(this.maskEl))},DialogComponent.prototype.closeMask=function(){this.maskEl&&(document.body.removeChild(this.maskEl),this.maskEl=null)},DialogComponent.prototype.open=function(){this.closed=!1},DialogComponent.prototype.close=function(){this.closed=!0},DialogComponent.prototype.displaying=function(){var _this=this;this.moveToTop(),this.panelStyle?(this.panelStyle.hasOwnProperty("left")||this.hcenter(),this.panelStyle.hasOwnProperty("top")||this.vcenter()):this.center(),this.draggableRef&&(Object.assign(this.draggableRef,{edge:5,disabled:!this.draggable,handle:this.headerRef},this.draggableOptions),this.draggableRef.dragEnd.subscribe(function(state){_this.panelStyle=_this.panelStyle||{},Object.assign(_this.panelStyle,{left:state.left+"px",top:state.top+"px"})})),this.resizableRef&&(Object.assign(this.resizableRef,{edge:5,disabled:!this.resizable},this.resizableOptions),this.resizableRef.resizeStop.subscribe(function(state){_this.panelStyle=_this.panelStyle||{},Object.assign(_this.panelStyle,{width:state.width+"px",height:state.height+"px"})}))},DialogComponent.prototype.moveToTop=function(){this.maskEl&&(this.maskEl.style.zIndex=String(DialogComponent.zIndex++)),this.panelRef&&(this.panelRef.nativeElement.style.zIndex=String(DialogComponent.zIndex++))},DialogComponent.prototype.hcenter=function(){if(this.panelRef){var view=domHelper.getViewport(),width=domHelper.outerWidth(this.panelRef.nativeElement),left=(view.width-width)/2;this.panelStyle=this.panelStyle||{},Object.assign(this.panelStyle,{left:left+"px"})}},DialogComponent.prototype.vcenter=function(){if(this.panelRef){var view=domHelper.getViewport(),height=domHelper.outerHeight(this.panelRef.nativeElement),scrollTop=domHelper.getScrollTop(),top_1=(view.height-height)/2+scrollTop;this.panelStyle=this.panelStyle||{},Object.assign(this.panelStyle,{top:top_1+"px"})}},DialogComponent.prototype.center=function(){this.hcenter(),this.vcenter()},DialogComponent}(PanelComponent);export{DialogComponent};DialogComponent.zIndex=9e3,DialogComponent.decorators=[{type:Component,args:[{selector:"eui-dialog",template:DIALOG_TEMPLATE,host:{class:"f-column"}}]}],DialogComponent.ctorParameters=function(){return[{type:ElementRef}]},DialogComponent.propDecorators={draggableRef:[{type:ViewChild,args:[DraggableDirective]}],resizableRef:[{type:ViewChild,args:[ResizableDirective]}],title:[{type:Input}],border:[{type:Input}],borderType:[{type:Input}],closable:[{type:Input}],modal:[{type:Input}],draggable:[{type:Input}],resizable:[{type:Input}],draggableOptions:[{type:Input}],resizableOptions:[{type:Input}],onOpen:[{type:Output,args:["open"]}],onClose:[{type:Output,args:["close"]}],panelCls:[{type:Input}],headerCls:[{type:Input}],bodyCls:[{type:Input}],footerCls:[{type:Input}],closed:[{type:Input}]};