import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppMaterialModule } from './app-material.module';
import { AppComponent } from './app.component';
import { HttpService } from './services/http.service';
import { StorageService } from './services/storage.service';

import { LoginComponent } from './component/login/login.component'
import { ContentComponent } from './component/content/content.component';
import { MenuComponent } from './component/menu/menu.component';
import { MenuItemComponent } from './component/menu-item/menu-item.component';
import { DialogConfirmComponent } from './component/dialog-confirm/dialog-confirm.component';
import { MenuItemCardComponent } from './component/menu-item-card/menu-item-card.component';
import { MenuCardComponent } from './component/menu-card/menu-card.component';
import { DialogMenuAddComponent } from './component/dialog-menu-add/dialog-menu-add.component';
import { DialogMenuItemAddComponent } from './component/dialog-menu-item-add/dialog-menu-item-add.component';

import { MenuService } from './services/menu.service';
import { MenuItemService } from './services/menu-item.service';
import { AuthService } from './services/auth.service';
import { RequestInterceptor } from './shared/request.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ContentComponent,
    MenuComponent,
    MenuItemComponent,
    DialogConfirmComponent,
    MenuItemCardComponent,
    MenuCardComponent,
    DialogMenuAddComponent,
    DialogMenuItemAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppMaterialModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    HttpService, 
    StorageService,
    AuthService,
    StorageService,
    MenuService,
    MenuItemService,
    { provide: APP_BASE_HREF, useValue: '/' },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
