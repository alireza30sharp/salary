export class LoadingStateFrom {
  isLoadingForm: boolean = false;
  finalize(): void {
    this.isLoadingForm = false;
  }
  startLoading(): void {
    this.isLoadingForm = true;
  }
}
