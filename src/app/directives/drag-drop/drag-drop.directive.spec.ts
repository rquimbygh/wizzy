import { TestBed } from '@angular/core/testing';

import { DragDropDirective } from './drag-drop.directive';

describe('DragDropDirective', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DragDropDirective = TestBed.get(DragDropDirective);
    expect(service).toBeTruthy();
  });
});
