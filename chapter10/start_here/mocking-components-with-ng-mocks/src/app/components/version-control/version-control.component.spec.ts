import {
  MockBuilder,
  MockedComponentFixture,
  MockRender,
  ngMocks,
} from 'ng-mocks';
import { ReleaseFormComponent } from '../release-form/release-form.component';
import { ReleaseLogsComponent } from '../release-logs/release-logs.component';
import { VersionControlComponent } from './version-control.component';
import { Apps } from 'src/app/constants/apps';

describe('VersionControlComponent', () => {
  let component: VersionControlComponent;
  let fixture: MockedComponentFixture<VersionControlComponent>;

  beforeEach(() => {
    return MockBuilder(VersionControlComponent)
      .mock(ReleaseFormComponent)
      .mock(ReleaseLogsComponent);
  });

  beforeEach(() => {
    fixture = MockRender(VersionControlComponent);
    component = fixture.point.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the [logs] @Input for the ReleaseLogsComponent', () => {
    const releaseLogsComponent =
      ngMocks.find<ReleaseLogsComponent>('app-release-logs').componentInstance;
    const logsStub = [{ app: Apps.DRIVE, version: '2.2.2', message: '' }];
    component.releaseLogs = [...logsStub];
    fixture.detectChanges();
    expect(releaseLogsComponent.logs.length).toBe(1);
    expect(releaseLogsComponent.logs).toEqual([...logsStub]);
  });

  it('should add the new log when it is created via ReleaseFormComponent', () => {
    const releaseFormComponent =
      ngMocks.find<ReleaseFormComponent>('app-release-form').componentInstance;
    const releaseLogsComponent =
      ngMocks.find<ReleaseLogsComponent>('app-release-logs').componentInstance;
    const newLogsStub = { app: Apps.DRIVE, version: '2.2.2', message: '' };
    component.releaseLogs = [];
    releaseFormComponent.newReleaseLog.emit(newLogsStub);
    fixture.detectChanges();
    expect(component.releaseLogs).toEqual([newLogsStub]);
    expect(releaseLogsComponent.logs).toEqual([newLogsStub]);
  });
});
