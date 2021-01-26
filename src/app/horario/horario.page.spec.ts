import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HorarioPage } from './horario.page';

describe('HorarioPage', () => {
  let component: HorarioPage;
  let fixture: ComponentFixture<HorarioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorarioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HorarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
