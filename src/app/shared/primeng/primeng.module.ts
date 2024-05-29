import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MenubarModule } from "primeng/menubar";
import { SkeletonModule } from "primeng/skeleton";

const module = [MenubarModule, SkeletonModule];

@NgModule({
  declarations: [],
  imports: [CommonModule, ...module],
  exports: [module],
})
export class PrimengModule {}
