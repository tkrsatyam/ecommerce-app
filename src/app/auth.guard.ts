import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SellerService } from './services/seller.service';

export const authGuard: CanActivateFn = () => {
  const sellerService = inject(SellerService);
  const router = inject(Router);

  const isLoggedIn = sellerService.isSellerLoggedIn.getValue();

  if (isLoggedIn || (typeof window !== 'undefined' && localStorage.getItem('seller'))) {
    return true;
  }

  router.navigate(['/seller-auth']);
  return false;
};
