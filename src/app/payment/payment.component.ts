import { Component, OnInit, AfterViewInit } from '@angular/core';
declare var paypal: any;
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit, AfterViewInit {

  CLIENT_ID: string =
    'AZmIjv0B6Q-Da8h3me44kWRX6x3W7hYPpJ0msgc4hXACqU9xlW9JS9K0LT1_DqYer0SKm3-QHsOpYs-R';
  PAYPAL_SECRET: string = 'ECM2u2nouXmTn8vnJ9zS6gj6RFaS7PIXNisVlM5DPy4WRsykCG4o0Qeoo4OMIoC-T1PAUoBGemeyXLhT';
  loadAPI: Promise<any>;

  constructor() {
  }
  ngOnInit() {
  }
  ngAfterViewInit() {
    paypal.Buttons({
      createOrder: (data, actions) => {
        // Set up the transaction
        console.log('clickedc paypal');
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: '0.01'
            }
          }]
        });
      },
      onApprove: (data, actions) => {
        console.log('approved');
        // Capture the funds from the transaction
        return actions.order.capture().then(details => {
          // Show a success message to your buyer
          alert('Transaction completed by ' + details.payer.name.given_name);
        });
      }
    }).render('#paypal-button-container');
  }
}
