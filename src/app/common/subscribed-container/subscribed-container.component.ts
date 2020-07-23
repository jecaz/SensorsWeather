import {Component, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs/index';

@Component({
  selector: 'app-subscribed-container'
})
export class SubscribedContainerComponent implements OnDestroy {

  subscriptions: Subscription[];

  constructor() {
    this.subscriptions = [];
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub ? sub.unsubscribe() : null);
  }

  public set sub(sub: Subscription) {
    this.subscriptions.push(sub);
  }
}
