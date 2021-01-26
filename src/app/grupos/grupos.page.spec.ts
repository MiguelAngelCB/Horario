import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GruposPage } from './grupos.page';

describe('GruposPage', () => {
  let component: GruposPage;
  let fixture: ComponentFixture<GruposPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GruposPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GruposPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
