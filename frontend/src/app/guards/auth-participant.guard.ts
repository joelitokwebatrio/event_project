import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AllConstants} from "../constants/all.constants";
import {NgToastService} from "ng-angular-popup";

export const authParticipantGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const toastrService = inject(NgToastService);
  const localStorageParticipantInfos = localStorage.getItem(AllConstants.USER_PROFILE)! ?
    localStorage.getItem(AllConstants.USER_PROFILE) : undefined;

  if (localStorageParticipantInfos == undefined) {
    router.navigateByUrl("/login");
    return false;
  } else if (JSON.parse(localStorageParticipantInfos).role.toLowerCase()
    != AllConstants.PARTICIPANT.toLowerCase()) {
    toastrService.error({
      detail: "Error Message",
      summary: "Seuls les participant peuevent acceder a cette page",
      duration: 5000
    })
    return false;
  } else if (
    JSON.parse(localStorageParticipantInfos).role.toLowerCase() == AllConstants.PARTICIPANT.toLowerCase()) {
    return true;
  } else {
    toastrService.error({
      detail: "Error Message",
      summary: "Seul les participant peuevent acceder a cette page",
      duration: 5000
    })
    return false;
  }
};
