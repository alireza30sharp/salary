import {
  ActivatedRouteSnapshot,
  DetachedRouteHandle,
  RouteReuseStrategy,
} from "@angular/router";
import { Injectable } from "@angular/core";
@Injectable({
  providedIn: "root",
})
export class CustomReuseStrategy implements RouteReuseStrategy {
  storedRoutes = new Map<string, DetachedRouteHandle>();

  // shouldDetach(route: ActivatedRouteSnapshot): boolean {
  //   return !!route.routeConfig && !route.routeConfig.loadChildren;
  // }
  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    const nonReusableRoutes = [
      "organization-units",
      "System-operation/monthly-performance/add",
    ];
    return !nonReusableRoutes.includes(route.routeConfig?.path || "");
  }

  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    if (route.routeConfig) {
      this.storedRoutes.set(route.routeConfig.path, handle);
    }
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return !!route.routeConfig && this.storedRoutes.has(route.routeConfig.path);
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    if (!route.routeConfig) {
      return null;
    }
    return this.storedRoutes.get(route.routeConfig.path) || null;
  }

  shouldReuseRoute(
    future: ActivatedRouteSnapshot,
    curr: ActivatedRouteSnapshot
  ): boolean {
    // مسیرهایی که نمی‌خواهید دوباره استفاده شوند را مشخص کنید
    if (
      future.routeConfig &&
      future.routeConfig.path === "system-operation/monthly-performance/add"
    ) {
      return false;
    }
    return future.routeConfig === curr.routeConfig;
  }

  removeRoute(route: string): void {
    this.storedRoutes.delete(route);
  }
}
