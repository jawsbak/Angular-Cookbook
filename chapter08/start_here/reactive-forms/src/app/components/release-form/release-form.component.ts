import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Apps } from 'src/app/constants/apps';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { REGEXES } from 'src/app/constants/regexes';
import { ReleaseLog } from 'src/app/classes/release-log';

@Component({
  selector: 'app-release-form',
  templateUrl: './release-form.component.html',
  styleUrls: ['./release-form.component.scss'],
})
export class ReleaseFormComponent implements OnInit {
  @Output() newReleaseLog = new EventEmitter<ReleaseLog>();
  apps = Object.values(Apps);
  versionInputRegex = REGEXES.SEMANTIC_VERSION;

  releaseForm = new FormGroup({
    app: new FormControl('', [Validators.required]),
    version: new FormControl('', [
      Validators.required,
      Validators.pattern(this.versionInputRegex),
    ]),
  });

  constructor() {}

  ngOnInit(): void {}

  formSubmit(form: FormGroup): void {
    const { app, version } = form.value;
    console.log({ app, version });
    const newLog: ReleaseLog = new ReleaseLog(app, version);
    this.newReleaseLog.emit(newLog);
  }
}
