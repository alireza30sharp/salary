import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { MetaData } from './meta-data';

@Injectable({
  providedIn: 'root',
})
export class NgEventBus {
  /**
   * Main observable to multicast to all observers.
   */
  private eventBus: BehaviorSubject<IEventBusMessage>;

  /**
   * Key message separator.
   */
  private separator = ':';

  /**
   * Constructor for this class: Initializes event bus.
   */
  constructor() {
    this.eventBus = new BehaviorSubject<IEventBusMessage>(null);
  }

  /**
   * Validates key matching.
   *
   * @param  key Key to identify the message/event.
   * @param wildcard Wildcard received from on method.
   *
   * @return true if key matches, false otherwise.
   */
  public keyMatch(key: string, wildcard: string): boolean {
    if (!key) return false;

    const w = '*';
    const ww = '**';

    const partMatch = (wl: string, k: string): boolean => {
      return wl === w || wl === k;
    };

    const sep = this.separator;
    const kArr = key.split(sep);
    const wArr = wildcard.split(sep);

    const kLen = kArr.length;
    const wLen = wArr.length;
    const max = Math.max(kLen, wLen);

    for (let i = 0; i < max; i++) {
      const cK = kArr[i];
      const cW = wArr[i];

      if (cW === ww && typeof cK !== 'undefined') {
        return true;
      }

      if (!partMatch(cW, cK)) {
        return false;
      }
    }

    return true;
  }

  /**
   * Publish a message/event to event bus.
   *
   * @param  key Key to identify the message/event.
   * @param  [data] Optional: Additional data sent with the message/event.
   * @throws {Error} key parameter must be a string and must not be empty.
   */
  public cast<TData = any>(key: string, data?: TData): void {
    if (!key.trim().length) {
      throw new Error('key parameter must be a string and must not be empty');
    }

    const metadata: MetaData = new MetaData(key, data);

    this.eventBus.next({ key, data, metadata });
  }

  /**
   * Returns an observable you can subscribe to listen messages/events.
   *
   * @param key Key to identify the message/event.
   *
   * @return Observable you can subscribe to listen messages/events.
   */
  public on<TData = any>(key: string): Observable<MetaData<TData>> {
    return this.eventBus.asObservable().pipe(
      filter((event: IEventBusMessage) => this.keyMatch(event?.key, key)),
      map((event: IEventBusMessage) => event.metadata)
    );
  }
}

/**
 * Interface of the messages sent through the events bus.
 */
export interface IEventBusMessage {
  key: string;
  data?: any;
  metadata: MetaData;
}
