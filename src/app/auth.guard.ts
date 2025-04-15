import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SellerService } from './services/seller.service';

export const authGuard: CanActivateFn = (route, state) => {
  const sellerService = inject(SellerService)
  const router = inject(Router);
  const isLoggedIn = sellerService.isSellerLoggedIn.getValue();

  if (!isLoggedIn) {
    router.navigate(['/seller-auth']);
    return false;
  }
  if(localStorage.getItem('seller')) {
    return true;
  }
  return sellerService.isSellerLoggedIn;
};
