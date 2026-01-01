import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import * as CartActions from './cart.actions';
import * as CartSelectors from './cart.selectors';
import { LocalStorage } from '@/common';
import { StorageKeys } from '@/common';

@Injectable()
export class CartEffects {
  private actions$ = inject(Actions);
  private store = inject(Store);

  loadCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.loadCart),
      map(() => {
        const items = LocalStorage.get<any>(StorageKeys.Cart) || [];
        return CartActions.loadCartSuccess({ items });
      })
    )
  );

  saveCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        CartActions.addToCart, 
        CartActions.removeFromCart,
        CartActions.decrementQuantity,
      ),
      withLatestFrom(this.store.select(CartSelectors.selectCartItems)),
      switchMap(([action, items]) => {
        LocalStorage.set(StorageKeys.Cart, items);
        return of(CartActions.saveCartSuccess());
      })
    )
  );
}
