import { CanDeactivateFn } from '@angular/router';
import { CanComponentDeactive } from './unsaved.canDeactive';

export const unsavedChangeGuard: CanDeactivateFn<CanComponentDeactive> = (component, currentRoute, currentState, nextState) => {
  return component.canDeactivate ? component.canDeactivate() : true;
};
