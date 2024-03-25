import { TestBed } from '@angular/core/testing';

import { WebsocketServiceOld } from './websocket.serviceOld';

describe('WebsocketService', () => {
  let service: WebsocketServiceOld;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebsocketServiceOld);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
