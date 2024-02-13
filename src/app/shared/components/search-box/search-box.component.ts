import { Component,Input,EventEmitter,Output, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``
})
export class SearchBoxComponent implements OnInit,OnDestroy {

  
  

  private debouncer:Subject<string>=new Subject<string>();
  private debouncerSuscription?:Subscription;


  @Input()
  public placeholder:string=''

  @Output() 
  public onValue:EventEmitter<string>=new EventEmitter<string>()

  @Output()
  public onDebounce=new EventEmitter<string>();

  ngOnInit(): void {
    this.debouncerSuscription= this.debouncer
    .pipe(
      debounceTime(300)
    )
    .subscribe(value=>{
      this.onDebounce.emit(value);
      console.log('debouncer value',value);
      
    })
  }

  ngOnDestroy(): void {
    //this.debouncer.unsubscribe();
    this.debouncerSuscription?.unsubscribe()
    
  }

  emitValue(value:string):void{
    this.onValue.emit(value);
  }

  onKeyPress(searchTerm:string){
    this.debouncer.next(searchTerm);

    
  }


}
