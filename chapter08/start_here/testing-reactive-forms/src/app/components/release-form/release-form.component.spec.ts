import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleaseFormComponent } from './release-form.component';
import { ReleaseLog } from 'src/app/classes/release-log';

describe('ReleaseFormComponent', () => {
  let component: ReleaseFormComponent;
  let fixture: ComponentFixture<ReleaseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReleaseFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleaseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit a new release log with the correct input values', () => {
    const app = component.apps[2];
    const version = '2.2.2';
    const expectedReleaseLog = new ReleaseLog(app, version);

    spyOn(component.newReleaseLog, 'emit');
    component.releaseForm.setValue({ app, version });
    component.formSubmit(component.releaseForm);

    expect(component.newReleaseLog.emit).toHaveBeenCalledWith(
      expectedReleaseLog
    );
  });

  it('should throw an error for a new release log with the incorrect version values', () => {
    const submitButton = fixture.nativeElement.querySelector(
      'button[type="submit"]'
    );
    const app = component.apps[2];
    const version = 'x.x.x';
    const expectedError =
      'Invalid version provided. Please provide a valid version as (major.minor.patch)';

    spyOn(component.newReleaseLog, 'emit');

    expect(() => component.formSubmit(component.releaseForm)).toThrowError(
      expectedError
    );
    expect(submitButton.hasAttribute('disabled')).toBe(true);
    expect(component.newReleaseLog.emit).not.toHaveBeenCalled();
  });

  it("should disable the submit button when we don't have an app selected", () => {
    const submitButton = fixture.nativeElement.querySelector(
      'button[type="submit"]'
    );
    const app = '';
    const version = '2.2.2';

    spyOn(component.newReleaseLog, 'emit');
    component.releaseForm.setValue({ app, version });
    submitButton.click();
    fixture.detectChanges();

    expect(submitButton.hasAttribute('disabled')).toBe(true);
    expect(component.newReleaseLog.emit).not.toHaveBeenCalled();
  });
});
