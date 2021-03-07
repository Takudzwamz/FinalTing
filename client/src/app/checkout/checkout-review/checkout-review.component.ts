import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { IBasket, IBasketTotals } from 'src/app/shared/models/basket';
import { BasketService } from 'src/app/basket/basket.service';
import { ToastrService } from 'ngx-toastr';
import { CdkStepper } from '@angular/cdk/stepper';
import { PayFastAPI } from '@gettruck/payfast-js';
@Component({
  selector: 'app-checkout-review',
  templateUrl: './checkout-review.component.html',
  styleUrls: ['./checkout-review.component.scss'],
})
export class CheckoutReviewComponent implements OnInit {
  @Input() appStepper: CdkStepper;
  basket$: Observable<IBasket>;
  basketTotals$: Observable<IBasketTotals>;
  total: number;
  payfast: any;
  constructor(
    private basketService: BasketService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.basket$ = this.basketService.basket$;
    this.basketService.basketTotal$.subscribe((t) => {
       this.total = t.total;
     });
    this.payfast = new PayFastAPI({
       merchant_id: '17309722',
       merchant_key: 'sd2wh83wpfttm',
       production: true,
     });
  }

  createPaymentIntent() {
    // return this.basketService.createPaymentIntent().subscribe((response: any) => {
    //   this.appStepper.next();
    // }, error => {
    //   console.log(error);
    // });

    // you can set url if you a have page 
    // this.payfast.returnURL('http://yourwebsite.co.za/success.html');
    // this.payfast.cancelURL('http://yourwebsite.co.za/cancel.html');
    this.payfast.addPaymentDetails({
      amount: this.total,
      item_name: 'Orders',
      // currency:
    });
    let url = this.payfast.generateURL();
    window.open(url, '_blank');
  }
}
