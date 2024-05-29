import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";
import { ToastService } from "../../services/toast.service";

@Component({
  selector: "ki-file-input",
  templateUrl: "./ki-file-input.component.html",
  styleUrls: ["./ki-file-input.component.scss"],
})
export class KiFileInputComponent implements OnInit, OnChanges {
  @Input() accept: string;
  @Input() uploadedFiles: File[] = [];
  @Input() isEditMode: boolean;
  @Output() fileSelectedCallback: EventEmitter<any> = new EventEmitter();
  @Output() onFileRemovedCallback: EventEmitter<any> = new EventEmitter();
  @Output() currentFileRemovedCallback: EventEmitter<any> = new EventEmitter();

  disableFileInput: boolean = true;
  selectedFiles: File[] = [];
  // private toastService: ToastService
  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.selectedFiles = [];
    this.selectedFiles = (changes as any).uploadedFiles?.currentValue.map(
      (item) => item
    );
  }

  ngOnInit() {}

  onFileSelected(files: File[]) {
    let selectedFiles: File[] = Array.from([]);

    if (this.isEditMode && files.length > 1) {
      files.splice(1, files.length - 1);
    }

    Array.from(files || []).forEach((item) => {
      let splitedFileName = item.name.split(".");
      let fileExtension = `.${
        splitedFileName[splitedFileName.length - 1]
      }`.toLowerCase();
      let allowedFileTypes = this.accept.replace(/ /g, "").split(",");

      if (allowedFileTypes.find((item) => item == fileExtension)) {
        selectedFiles.push(item);
      } else {
        // this.toastService.error('File_type_not_allowed');
      }
    });

    this.selectedFiles = selectedFiles;
    this.fileSelectedCallback.emit(this.selectedFiles);
  }

  removeFile(file: File) {
    this.selectedFiles.splice(this.selectedFiles.indexOf(file), 1);
    this.disableFileInput = false;
    this.onFileRemovedCallback.emit(file);
  }

  pickFileIcon(fileName: string): string {
    let fileExtension: string =
      fileName?.split(".")[fileName?.split(".").length - 1];

    switch (fileExtension) {
      case "png":
      case "jpg":
      case "jpeg":
      case "bmp":
      case "gif":
        return "fa fa-regular fa-file-image";

      case "pdf":
        return "fa fa-regular fa-file-pdf";

      case "docx":
      case "doc":
        return "fa fa-regular fa-file-word";

      case "xls":
      case "xlsx":
        return "fa fa-regular fa-file-excel";

      case "mp3":
      case "ogg":
      case "wav":
        return "fa fa-light fa-file-audio";

      case "mp4":
      case "mov":
        return "fa fa-regular fa-file-video";

      default:
        return "fa fa-light fa-file";
    }
  }
}
