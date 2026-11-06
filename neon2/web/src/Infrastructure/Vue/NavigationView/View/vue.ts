import {inject} from "vue";
import {NavigationService} from "../Port/NavigationService";

export const navigationServiceInjectKey = Symbol();

export function useNavigationService(): NavigationService {
  return inject<NavigationService>(navigationServiceInjectKey)!;
}
