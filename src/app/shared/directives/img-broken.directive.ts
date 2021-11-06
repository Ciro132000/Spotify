import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'img[appImgBroken]'
})
export class ImgBrokenDirective {

  @Input() customImg:string='';
  @HostListener('error') handleError():void{
    const elNative = this.elHost.nativeElement
    console.log('Esta imagen fallo', this.elHost)
    //elNative.src="https://previews.123rf.com/images/freshwater/freshwater1706/freshwater170600002/81698847-p%C3%A1gina-de-error-404-p%C3%A1gina-no-encontrada-.jpg";
    elNative.src=this.customImg;
  }

  constructor(private elHost:ElementRef) {
    
   }

}
