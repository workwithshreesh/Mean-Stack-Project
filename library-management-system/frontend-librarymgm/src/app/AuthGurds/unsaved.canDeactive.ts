import { Observable } from "rxjs";

export interface CanComponentDeactive {
    canDeactivate: () => boolean | Promise<boolean> | Observable<boolean>;
}