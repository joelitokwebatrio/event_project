import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AllConstants} from "../constants/all.constants";
import {NgToastService} from "ng-angular-popup";

export const authOrganizerGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const toastrService = inject(NgToastService);
  const localStorageOrganizerInfos = localStorage.getItem(AllConstants.USER_PROFILE)! ?
    localStorage.getItem(AllConstants.USER_PROFILE) : undefined;

  if (localStorageOrganizerInfos == undefined) {
    router.navigateByUrl("/login");
    return false;
  }

  if (JSON.parse(localStorageOrganizerInfos).role.toLowerCase() == AllConstants.ORGANIZER.toLowerCase()) {
    return true;
  } else {
    toastrService.error({
      detail: "Error Message",
      summary: "Seul les Admins ont peuvent acceder a cette page",
      duration: 5000
    })
    return false;
  }

};
