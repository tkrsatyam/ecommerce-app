import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { authGuard } from './auth.guard';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { SellerUpdateProductComponent } from './seller-update-product/seller-update-product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { UserAuthComponent } from './user-auth/user-auth.component';

export const routes: Routes = [
    {
        component: HomeComponent,
        path: ''
    },
    {
        component: SellerAuthComponent,
        path: 'seller-auth'
    },
    {
        component: SellerHomeComponent,
        path: 'seller-home',
        canActivate:[authGuard]
    },
    {
        component: SellerAddProductComponent,
        path: 'seller-add-product',
        canActivate:[authGuard]
    },
    {
        component: SellerUpdateProductComponent,
        path: 'seller-update-product/:id',
        canActivate:[authGuard]
    },
    {
        component: ProductDetailsComponent,
        path: 'details/:productId'
    },
    {
        component: UserAuthComponent,
        path: 'user-auth'
    }
];
