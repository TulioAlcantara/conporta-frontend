import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { PartialProfile, Profile } from '../../../../shared/models/profile';
import { ProfilesService } from '../../profiles.service';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss'],
})
export class ProfileInfoComponent implements OnInit {
  isLoading: boolean = true;
  selectedProfileId: number = 0;
  selectedProfile: Profile = new Profile()
  profileFormGroup = this.formBuilder.group({
    id: [0, Validators.required],
    name: ['', Validators.required],
    email: ['', Validators.required],
    is_active: [true, Validators.required],
    user: [''],
  });

  get isNewProfile() {
    return !!!this.selectedProfile.id;
  }

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private profilesService: ProfilesService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.selectedProfileId = +params['id'];
      if (this.selectedProfileId != 0) {
        this.loadProfileInfo();
      } else {
        this.isLoading = false;
      }
    });
  }

  loadProfileInfo(): void {
    this.profilesService
    .loadProfile(this.selectedProfileId)
    .subscribe((profile) => {
      this.selectedProfile = profile;
      this.profileFormGroup.patchValue(this.selectedProfile);
      this.isLoading = false;
    });
  }

  saveProfile(): void {
    this.isLoading = true;
    let profile = new PartialProfile(this.profileFormGroup.value);
    
    if (this.isNewProfile) {
      this.profilesService
        .createProfile(profile)
        .subscribe((newOrdinance) => {
          this.snackBar.open('Perfil criado com sucesso!', 'FECHAR', {
            duration: 5000,
          });
          this.selectedProfileId = newOrdinance.id;
          this.isLoading = false;
          return;
        });

    } else {
      this.profilesService
        .updateProfile(profile)
        .subscribe((updatedOrdinance) => {
          this.snackBar.open('Perfil salvo com sucesso!', 'FECHAR', {
            duration: 5000,
          });
          this.selectedProfileId = updatedOrdinance.id;
          this.isLoading = false;
          return;
        });
    }
  }
}
